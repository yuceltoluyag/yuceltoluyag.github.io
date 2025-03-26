"""Duty tasks for the project."""

import os
import re
import shutil
import sys
import uuid
from datetime import datetime
from pathlib import Path

import minify_html
import pytz
from duty import duty, tools
from duty.context import Context
from pelican import main as pelican_main
from pelican.server import ComplexHTTPRequestHandler, RootedHTTPServer
from pelican.settings import DEFAULT_CONFIG, get_settings_from_file
from rcssmin import cssmin

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
PORT = 8000
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


@duty
def minify(ctx: Context):
    """Minify all HTML and CSS files after Pelican has built the site."""
    site_dir = Path(SETTINGS["OUTPUT_PATH"]).resolve()

    for file in site_dir.glob("**/*.html"):
        with open(file, "r") as f:
            content = f.read()
        minified = minify_html.minify(
            content,
            do_not_minify_doctype=True,
            keep_closing_tags=True,
            keep_html_and_head_opening_tags=True,
            minify_css=True,
            minify_js=True,
            preserve_brace_template_syntax=True,
            remove_processing_instructions=True,
        )
        with open(file, "w") as f:
            f.write(minified)

    print("Minified all HTML files")

    for file in site_dir.glob("**/*.css"):
        with open(file, "r") as f:
            content = f.read()
        minified = cssmin(content)
        with open(file, "w") as f:
            f.write(minified)

    print("Minified all CSS files")


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


@duty(post=[cache_bust, minify])
def build(ctx: Context) -> None:
    """Build the project."""
    ctx.run(run_pelican(["-s", SETTINGS_FILE_BASE]))


@duty(post=[cache_bust, minify])
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


@duty(post=[cache_bust, minify])
def publish(ctx: Context) -> None:
    """Publish the project."""
    # PUBLISH ortam değişkenini ayarla
    os.environ["PUBLISH"] = "1"
    print("PUBLISH ortam değişkeni ayarlandı: 1")

    # Önce temiz bir build yapalım
    clean(ctx)

    # Gulp build işlemini çalıştır
    print("Gulp build işlemi başlatılıyor...")
    try:
        ctx.run("npm run prod", capture=False)
        print("Gulp build işlemi tamamlandı.")
    except Exception as e:
        print(f"HATA: Gulp build işlemi başarısız oldu! Hata: {e}")

    # publishconf.py ile build işlemi
    print("publishconf.py ile build işlemi başlatılıyor...")
    try:
        # Debug modunda çalıştır
        ctx.run(
            run_pelican(["-s", SETTINGS_FILE_PUBLISH, "--debug"]), capture=False
        )
        print("Build işlemi başarıyla tamamlandı.")

        # Çıktı klasörünü kontrol edelim
        output_path = SETTINGS["OUTPUT_PATH"]
        if os.path.exists(output_path):
            print(f"Çıktı klasörü ({output_path}) başarıyla oluşturuldu.")

            # .nojekyll dosyasını oluşturalım
            nojekyll_path = os.path.join(output_path, ".nojekyll")
            if not os.path.exists(nojekyll_path):
                with open(nojekyll_path, "w") as f:
                    pass
                print(".nojekyll dosyası oluşturuldu.")
        else:
            print(f"HATA: Çıktı klasörü ({output_path}) oluşturulamadı!")
    except Exception as e:
        try:
            error_message = str(e)
        except Exception:
            error_message = (
                "Hata mesajı alınamadı (istisna nesnesi yazdırılamadı)"
            )

        print(f"HATA: Build işlemi başarısız oldu! Hata: {error_message}")
        print("Detaylı hata ayıklaması için console çıktısını kontrol edin.")


@duty
def livereload(ctx: Context):
    """Automatically reload browser tab upon file modification."""
    try:
        from livereload import Server
        import os

        print("LiveReload başlatılıyor...")

        def cached_build():
            try:
                print("Değişiklik algılandı, site yeniden oluşturuluyor...")
                # Daha basit bir build komutu deneyelim
                cmd = ["-s", SETTINGS_FILE_BASE]
                print(f"Çalıştırılan komut: pelican {' '.join(cmd)}")
                # capture=False ekleyerek çıktıyı görelim
                ctx.run(run_pelican(cmd), capture=False)
                print("Site yeniden oluşturuldu!")
                return True
            except Exception as e:
                print(f"Site oluşturulurken hata: {e}")
                return False

        theme_path = SETTINGS["THEME"]
        output_path = SETTINGS["OUTPUT_PATH"]

        # Çıktı klasörünün varlığını kontrol et
        if not os.path.exists(output_path):
            print(
                f"UYARI: Çıktı klasörü ({output_path}) bulunamadı. Önce bir build işlemi gerçekleştiriliyor."
            )
            try:
                print("İlk build işlemi başlatılıyor...")
                ctx.run(run_pelican(["-s", SETTINGS_FILE_BASE]), capture=False)
                print("İlk build işlemi tamamlandı.")

                if not os.path.exists(output_path):
                    print(
                        f"HATA: Build işlemi tamamlandı ancak çıktı klasörü ({output_path}) hala bulunamadı."
                    )
                    print("Pelican yapılandırmanızı kontrol edin.")
                    return
            except Exception as e:
                print(f"İlk build işlemi sırasında hata: {e}")
                print("LiveReload başlatılamıyor.")
                return

        # İzlenecek dosya ve klasörleri tanımla
        watched_globs = [
            SETTINGS_FILE_BASE,
            f"{theme_path}/templates/**/*.html",
        ]

        content_file_extensions = [".md", ".rst"]
        for extension in content_file_extensions:
            content_glob = f"{SETTINGS['PATH']}/**/*{extension}"
            watched_globs.append(content_glob)

        static_file_extensions = [".css", ".js"]
        for extension in static_file_extensions:
            static_file_glob = f"{theme_path}/static/**/*{extension}"
            watched_globs.append(static_file_glob)

        # İzlenen dosyaları göster
        print("İzlenen dosya ve klasörler:")
        for glob in watched_globs:
            print(f" - {glob}")

        # İlk build işlemini gerçekleştir
        print("İlk site oluşturma işlemi başlatılıyor...")
        if not cached_build():
            print("İlk build başarısız oldu, ancak devam ediyoruz...")

        # Server'ı oluştur
        server = Server()

        # İzleme işlemlerini ekle
        for glob in watched_globs:
            server.watch(glob, cached_build)

        # Tarayıcıyı aç
        if OPEN_BROWSER_ON_SERVE:
            import webbrowser

            site_url = f"http://{HOST}:{PORT}"
            print(f"Tarayıcı açılıyor: {site_url}")
            webbrowser.open(site_url)

        # Sunucuyu başlat
        print(f"LiveReload sunucusu başlatıldı: http://{HOST}:{PORT}")
        print("Çıkmak için Ctrl+C tuşlarına basın.")
        try:
            print(
                f"Sunucu başlatılıyor: {output_path} klasöründen servis ediliyor"
            )
            # Alternatif olarak daha basit bir sunucu kullanmayı deneyelim
            try:
                server.serve(host=HOST, port=PORT, root=output_path)
            except Exception as server_error:
                print(f"LiveReload sunucusu başlatılamadı: {server_error}")
                print("Alternatif bir sunucu başlatılıyor...")

                # Basit bir HTTP sunucusu başlat
                import http.server
                import socketserver

                os.chdir(output_path)
                handler = http.server.SimpleHTTPRequestHandler

                with socketserver.TCPServer((HOST, PORT), handler) as httpd:
                    print(
                        f"Basit HTTP sunucusu başlatıldı: http://{HOST}:{PORT}"
                    )
                    httpd.serve_forever()

        except KeyboardInterrupt:
            print("Kullanıcı tarafından durduruldu.")
        except Exception as e:
            print(f"Sunucu başlatılırken hata: {e}")

    except ImportError:
        print("HATA: 'livereload' paketi bulunamadı.")
        print("Lütfen şu komutu çalıştırın: pip install livereload")
    except Exception as e:
        print(f"LiveReload başlatılırken bir hata oluştu: {e}")


@duty
def new(ctx: Context, title: str) -> None:
    """Create a new post."""

    newYorkTz = pytz.timezone("America/New_York")
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
