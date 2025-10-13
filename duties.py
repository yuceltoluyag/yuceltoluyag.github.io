"""Duty tasks for the project."""

import os
import re
import shutil
import sys
import uuid
from datetime import datetime
from pathlib import Path

import pytz
from duty import duty, tools
from duty.context import Context
from pelican import main as pelican_main
from pelican.server import ComplexHTTPRequestHandler, RootedHTTPServer
from pelican.settings import DEFAULT_CONFIG, get_settings_from_file

CI = os.environ.get("CI", "0") in {"1", "true", "yes", ""}

OPEN_BROWSER_ON_SERVE = True
SETTINGS = {}
SETTINGS_FILE_BASE = "pelicanconf.py"
SETTINGS_FILE_PUBLISH = "publishconf.py"
SETTINGS.update(DEFAULT_CONFIG)
LOCAL_SETTINGS = get_settings_from_file(SETTINGS_FILE_BASE)
SETTINGS.update(LOCAL_SETTINGS)
PY_SRC_PATHS = (
    Path(_)
    for _ in ("src/", "tests/", "duties.py", "scripts/")
    if Path(_).exists()
)
PY_SRC_LIST = tuple(str(_) for _ in PY_SRC_PATHS)
HOST = "localhost"
PORT = 8080
run_pelican = tools.lazy(pelican_main, name="pelican.main")
POST_PATH = Path(f"{SETTINGS['PATH']}/{SETTINGS['ARTICLE_PATHS'][0]}").resolve()
POST_TEMPLATE = """\
---
title: {title}
slug: {slug}
date: {timestamp}
modified: {timestamp}
summary:
tags:
    -
---

"""


def strip_ansi(text: str) -> str:
    """Remove ANSI escape sequences from a string.

    Args:
        text (str): String to remove ANSI escape sequences from.

    Returns:
        str: String without ANSI escape sequences.
    """
    ansi_chars = re.compile(r"(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]")

    # Replace [ with \[ so rich doesn't interpret output as style tags
    return ansi_chars.sub("", text).replace("[", r"\[")


def pyprefix(title: str) -> str:
    """Add a prefix to the title if CI is true.

    Returns:
        str: Title with prefix if CI is true.
    """
    if CI:
        prefix = f"(python{sys.version_info.major}.{sys.version_info.minor})"
        return f"{prefix:14}{title}"
    return title


def slugify(s):
    s = s.lower().strip()
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[\s_-]+", "-", s)
    s = re.sub(r"^-+|-+$", "", s)
    return s


@duty
def cache_bust(ctx: Context) -> None:
    """Cache bust links to CSS files within the HEAD by appending a unique ID to the URL."""
    site_dir = Path(SETTINGS["OUTPUT_PATH"]).resolve()
    unique_id = str(uuid.uuid4())[:8]

    i = 0
    for file in site_dir.glob("**/*.html"):
        with open(file, "r") as f:
            content = f.read()

        if re.search(
            r'<link href="?/static/css/[a-zA-Z0-9\.-_]+\.css', content
        ):
            i += 1
            content = re.sub(
                r'(<link href="?/static/css/[a-zA-Z0-9\.-_]+\.css)',
                rf"\1?v={unique_id}",
                content,
            )

        with open(file, "w") as f:
            f.write(content)

    print(f"Cache busted CSS files in {i} files")


@duty(silent=True)
def clean(ctx: Context) -> None:
    """Clean the project."""
    for path in (
        ".coverage*",
        ".mypy_cache",
        ".pytest_cache",
        ".reports",
        ".ruff_cache",
        SETTINGS["OUTPUT_PATH"],
    ):
        if Path(path).is_dir():
            shutil.rmtree(path)
        elif Path(path).is_file():
            Path(path).unlink()

    ctx.run("find . -type d -name __pycache__ | xargs rm -rf")
    ctx.run("find . -name '.DS_Store' -delete")
    os.makedirs(SETTINGS["OUTPUT_PATH"])


@duty(post=[cache_bust])
def build(ctx: Context) -> None:
    """Build the project."""
    ctx.run(run_pelican(["-s", SETTINGS_FILE_BASE]))


@duty(post=[cache_bust])
def rebuild(ctx: Context) -> None:
    """Rebuild the project."""
    ctx.run(run_pelican(["-d", "-s", SETTINGS_FILE_BASE]))


@duty
def regenerate(ctx: Context) -> None:
    """Regenerate the project."""
    ctx.run(run_pelican(["-r", "-s", SETTINGS_FILE_BASE]))


@duty
def serve(ctx: Context) -> None:
    """Serve the project."""

    class AddressReuseTCPServer(RootedHTTPServer):
        allow_reuse_address = True

    server = AddressReuseTCPServer(
        SETTINGS["OUTPUT_PATH"],
        (HOST, PORT),
        ComplexHTTPRequestHandler,
    )

    if OPEN_BROWSER_ON_SERVE:
        # Open site in default browser
        import webbrowser

        webbrowser.open(f"http://{HOST}:{PORT}")

    sys.stderr.write(f"Serving at {HOST}:{PORT} ...\n")
    server.serve_forever()


@duty
def reserve(ctx: Context) -> None:
    """Re-serve the project."""
    build(ctx)
    serve(ctx)


@duty(post=[cache_bust])
def publish(ctx: Context) -> None:
    """Publish the project."""
    ctx.run(run_pelican(["-s", SETTINGS_FILE_PUBLISH]))


@duty
def livereload(ctx: Context):
    """Automatically reload browser tab upon file modification."""
    from livereload import Server

    def cached_build():
        ctx.run(
            run_pelican(
                [
                    "-s",
                    SETTINGS_FILE_BASE,
                    "-e",
                    "CACHE_CONTENT=true",
                    "LOAD_CONTENT_CACHE=true",
                ]
            )
        )

    theme_path = SETTINGS["THEME"]
    watched_globs = [
        SETTINGS_FILE_BASE,
        f"{theme_path}/templates/**/*.html",
    ]

    cached_build()
    server = Server()

    content_file_extensions = [".md", ".rst"]
    for extension in content_file_extensions:
        content_glob = f"{SETTINGS['PATH']}/**/*{extension}"
        watched_globs.append(content_glob)

    static_file_extensions = [".css", ".js"]
    for extension in static_file_extensions:
        static_file_glob = f"{theme_path}/static/**/*{extension}"
        watched_globs.append(static_file_glob)

    for glob in watched_globs:
        server.watch(glob, cached_build)

    if OPEN_BROWSER_ON_SERVE:
        # Open site in default browser
        import webbrowser

        webbrowser.open(f"http://{HOST}:{PORT}")

    server.serve(host=HOST, port=PORT, root=SETTINGS["OUTPUT_PATH"])


@duty
def new(ctx: Context, title: str) -> None:
    """Create a new post."""

    newYorkTz = pytz.timezone("Europe/Istanbul")
    now = datetime.now(newYorkTz)

    new_post_path = POST_PATH.joinpath(
        f"{now.strftime('%Y-%m-%d')}-{slugify(title)}.md"
    )
    new_post_path.touch()
    with open(new_post_path, "w") as f:
        f.write(
            POST_TEMPLATE.format(
                title=title,
                slug=slugify(title),
                timestamp=now.strftime("%Y-%m-%d %H:%M"),
            )
        )

    print(f"Created new post at {new_post_path.relative_to(Path.cwd())}")


@duty(capture=CI)
def update(ctx: Context) -> None:
    """Update the project."""
    ctx.run(
        ["uv", "lock", "--upgrade"],
        title="update uv lock",
        command="uv lock --upgrade",
    )
    ctx.run(
        ["pre-commit", "autoupdate"],
        title="pre-commit autoupdate",
        command="pre-commit autoupdate",
    )
    ctx.run(
        [
            "uv",
            "-q",
            "pip",
            "compile",
            "pyproject.toml",
            "-o",
            "requirements.txt",
        ],
        title="update requirements.txt",
        command="uv -q pip compile pyproject.toml -o requirements.txt",
    )


@duty(capture=CI)
def lint(ctx: Context) -> None:
    """Run all linting duties."""
    ctx.run(
        ["typos", "--config", ".typos.toml"],
        title=pyprefix("typos check"),
        command="typos --config .typos.toml",
    )

    ctx.run(
        "djlint --configuration pyproject.toml theme",
        title=pyprefix("djlint check"),
        command="djlint --configuration pyproject.toml theme",
    )

    ctx.run(
        "SKIP=typos,djlint pre-commit run --all-files",
        title=pyprefix("pre-commit hooks"),
        command="SKIP=typos,djlint pre-commit run --all-files",
    )


@duty
def mastodon_toot(ctx: Context, slug: str, toot_url: str = None) -> None:
    """Bir makale için Mastodon toot bağlantısı oluştur veya güncelle.

    Args:
        slug: Makale slug'ı
        toot_url: Mastodon toot URL'si (opsiyonel). Örn: https://mastodon.social/@yuceltoluyag/123456789
    """
    import glob
    from datetime import datetime
    import re

    # Slug'a göre makaleyi bul
    article_files = glob.glob(
        f"{SETTINGS['PATH']}/{SETTINGS['ARTICLE_PATHS'][0]}/*.md"
    )
    article_file = None

    for file in article_files:
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()
            if re.search(r"slug:\s*" + slug, content, re.IGNORECASE):
                article_file = file
                break

    if not article_file:
        print(f"Hata: '{slug}' slug'ına sahip makale bulunamadı!")
        return

    # Makale içeriğini al
    with open(article_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Mastodon_Link zaten var mı kontrol et
    if re.search(r"Mastodon_Link:", content):
        if toot_url:
            # Mevcut Mastodon_Link'i güncelle
            content = re.sub(
                r"Mastodon_Link:.*", f"Mastodon_Link: {toot_url}", content
            )
            print(f"Makale için Mastodon bağlantısı güncellendi: {toot_url}")
        else:
            match = re.search(r"Mastodon_Link:\s*(.*)", content)
            current_url = match.group(1).strip() if match else "Tanımlanmamış"
            print(f"Mevcut Mastodon bağlantısı: {current_url}")
            print(
                f"Güncellemek için: duty mastodon_toot --slug={slug} --toot_url=YENI_URL"
            )
            return
    else:
        if toot_url:
            # Mastodon_Link ekle (Tags satırından sonra)
            content = re.sub(
                r"(Tags:.*?)(\n+)", rf"\1\nMastodon_Link: {toot_url}\2", content
            )
            print(f"Makaleye Mastodon bağlantısı eklendi: {toot_url}")
        else:
            print(f"Mastodon bağlantısı tanımlı değil. Eklemek için:")
            print(f"duty mastodon_toot --slug={slug} --toot_url=MASTODON_URL")
            return

    # Dosyayı güncelle
    with open(article_file, "w", encoding="utf-8") as f:
        f.write(content)
