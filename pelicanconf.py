import os
import json
from datetime import date
from blinker import signal

# =============================================================================
# SITE SETTINGS
# =============================================================================
PUBLISH = os.environ.get("PUBLISH")
SITEURL = (
    "https://yuceltoluyag.github.io/" if PUBLISH else "http://localhost:8080"
)
CANONICAL_URL = "https://yuceltoluyag.github.io/"
AUTHOR = "yuceltoluyag"
SITENAME = "Ortaya Karışık"
SITETAGLINE = ">| Linux gamer, Python lover, and technology enthusiast |<"
KEYWORDS = "linux, python, web geliştirme, programlama, açık kaynak, teknoloji, yazılım geliştirme, django, flask, pelican, git, github, terminal komutları, sistem yönetimi, web tasarım, backend development"
DESCRIPTION = "Yücel Toluyag'ın kişisel blogu. Linux, Python, web geliştirme, programlama, açık kaynak ve teknoloji konularında rehberler, ipuçları ve güncel bilgiler bulabilirsiniz."
DEFAULT_DATE_FORMAT = "%d %B %Y"
COPYRIGHT_YEAR = 1989


with open("authors.json") as f:
    AUTHORS_INFO = json.load(f)

JINJA_GLOBALS = {"AUTHORS_INFO": AUTHORS_INFO}


# =============================================================================
# PATH SETTINGS
# =============================================================================
PATH = "content"
ARTICLE_PATHS = ["articles"]
PAGE_PATHS = ["pages"]
OUTPUT_PATH = "output"
STATIC_PATHS = [
    "images",
    "extra",
    "files",
]
EXTRA_PATH_METADATA = {
    "extra/robots.txt": {"path": "robots.txt", "template": True},
    "extra/humans.txt": {"path": "humans.txt", "template": True},
    "extra/ads.txt": {"path": "ads.txt"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/favicon.webp": {"path": "favicon.webp"},
    "extra/sitemap.xml": {"path": "sitemap.xml"},
    "extra/manifest.json": {"path": "manifest.json"},
    "extra/site.webmanifest": {"path": "site.webmanifest"},
    "extra/BingSiteAuth.xml": {"path": "BingSiteAuth.xml"},
    "extra/acf21962677a48049a6a234640504902.txt": {
        "path": "acf21962677a48049a6a234640504902.txt"
    },
    "extra/CNAME": {"path": "CNAME"},
    "extra/.well-known/webfinger": {
        "path": ".well-known/webfinger",
    },
    "extra/.well-known/host-meta": {
        "path": ".well-known/host-meta",
    },
}

# =============================================================================
# INTERNATIONALIZATION (I18N) SETTINGS
# =============================================================================
DEFAULT_LANG = "tr"
TIMEZONE = "Europe/Istanbul"
LOCALE = (
    "tr_TR.UTF-8",
    "en_US.UTF-8",
)
I18N_UNTRANSLATED_ARTICLES_LANG = "tr"
I18N_SUBSITES = {
    "en": {
        "SITENAME": "Baba Tech Blog",
        "AUTHOR": "yuceltoluyag",
        "LOCALE": "en_US.UTF-8",
        "STATIC_PATHS": ["images", "extra", "files"],
        "OUTPUT_PATH": "output/en",
        "CATEGORIES_URL": "categories/",
        "CATEGORIES_SAVE_AS": "categories/index.html",
        "TAGS_URL": "tags/",
        "TAGS_SAVE_AS": "tags/index.html",
        "ARCHIVES_URL": "archive/",
        "ARCHIVES_SAVE_AS": "archive/index.html",
    },
}

# =============================================================================
# URL & SAVE AS SETTINGS
# =============================================================================
ARTICLE_URL = "{slug}/"
ARTICLE_SAVE_AS = "{slug}/index.html"
PAGE_URL = "{slug}/"
PAGE_SAVE_AS = "{slug}/index.html"
CATEGORY_URL = "kategori/{slug}/"
CATEGORY_SAVE_AS = "kategori/{slug}/index.html"
TAG_URL = "etiket/{slug}/"
TAG_SAVE_AS = "etiket/{slug}/index.html"
AUTHOR_URL = "yazar/{slug}/"
AUTHOR_SAVE_AS = "yazar/{slug}/index.html"
ARCHIVES_URL = "arsiv/"
ARCHIVES_SAVE_AS = "arsiv/index.html"
TAGS_URL = "etiketler/"
TAGS_SAVE_AS = "etiketler/index.html"
AUTHORS_URL = "yazarlar/"
AUTHORS_SAVE_AS = "yazarlar/index.html"
CATEGORIES_URL = "kategoriler/"
CATEGORIES_SAVE_AS = "kategoriler/index.html"
ARTICLE_LANG_URL = "{slug}-{lang}/"
ARTICLE_LANG_SAVE_AS = "{slug}-{lang}/index.html"
PAGE_LANG_URL = "{slug}-{lang}/"
PAGE_LANG_SAVE_AS = "{slug}-{lang}/index.html"
DRAFT_URL = "drafts/{slug}/"
DRAFT_SAVE_AS = "drafts/{slug}/index.html"
DRAFT_LANG_URL = "drafts/{slug}-{lang}.html"
DRAFT_LANG_SAVE_AS = "drafts/{slug}-{lang}.html"
DRAFT_PAGE_LANG_URL = "drafts/pages/{slug}-{lang}.html"
DRAFT_PAGE_LANG_SAVE_AS = "drafts/pages/{slug}-{lang}.html"
REDIRECT_URL = "{slug}/"
REDIRECT_SAVE_AS = "{slug}/index.html"

# =============================================================================
# PAGINATION SETTINGS
# =============================================================================
DEFAULT_PAGINATION = 10
PAGINATION_PATTERNS = (
    (1, "{base_name}/", "{base_name}/index.html"),
    (2, "{base_name}/page/{number}/", "{base_name}/page/{number}/index.html"),
)
PAGINATED_TEMPLATES = {
    "index": None,
    "tag": None,
    "category": None,
    "author": None,
}

# =============================================================================
# FEED SETTINGS
# =============================================================================
FEED_DOMAIN = SITEURL
FEED_ALL_ATOM = "feeds/all.atom.xml"
FEED_ALL_RSS = "feeds/all.rss.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"
CATEGORY_FEED_RSS = "feeds/{slug}.rss.xml"
AUTHOR_FEED_ATOM = "feeds/{slug}.atom.xml"
AUTHOR_FEED_RSS = "feeds/{slug}.rss.xml"
TRANSLATION_FEED_ATOM = "feeds/all-{lang}.atom.xml"
FEED_JSON = "feed.json"
FEED_SAVE_AS = "feed.json"

# =============================================================================
# THEME SETTINGS
# =============================================================================
THEME = "themes/baba"
THEME_STATIC_PATHS = ["static"]
TEMPLATE_EXTENSIONS = [".html.j2", ".html"]
BROWSER_COLOR = "#333333"
PYGMENTS_STYLE = "dracula"
PYGMENTS_RST_OPTIONS = {
    "linenos": "table",
    "anchorlinenos": True,
    "cssclass": "highlight",
    "wrapcode": True,
}
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = True
WIDGETS = [
    "category.html",
    "recent_posts.html",
    "search.html",
    "tag.html",
    "tagcloud.html",
]
NAVBAR_LINKS = [
    {
        "name": "Ana Sayfa",
        "url": "/",
        "target": "_self",
        "icon": "fa-solid fa-house",
    },
    {
        "name": "Hakkımda",
        "url": "/hakkimda",
        "target": "_self",
        "icon": "fa-solid fa-user",
    },
    {
        "name": "Bağış",
        "url": "/bagis",
        "target": "_self",
        "icon": "fa-solid fa-hand-holding-heart",
    },
]
CC_LICENSE = {
    "name": "Creative Commons Attribution-ShareAlike 4.0 International License",
    "version": "4.0",
    "slug": "by-sa",
    "icon": True,
    "language": "en_US",
}
FEATURED_ARTICLE = {
    "title": "Önemli Değişiklikler",
    "slug": "onemli-degisiklikler",
    "category": "duyurular",
    "summary": "Minel temasının tüm özelliklerini ve  Site hakkında önemli gelişmeleri ve yenilikleri bu sayfadan takip edebilirsiniz.",
    "date": "2024-03-20",
}
MENUITEMS = [
    ("Ana Sayfa", "/"),
    ("Kategoriler", "/kategoriler/"),
    ("Etiketler", "/etiketler/"),
    ("Arşiv", ARCHIVES_URL),
    ("Yazarlar", "/yazarlar/"),
]

# =============================================================================
# PLUGIN SETTINGS
# =============================================================================
PLUGIN_PATHS = ["plugins"]
common_plugins = [
    "plugins.i18n_subsites",
    "pelican.plugins.sitemap",
    "pelican.plugins.neighbors",
    "plugins.series",
    "plugins.fix_sitemap",
    "plugins.json_feed",
    "plugins.responsive_image_shortcode",
    "plugins.search",
    "plugins.pelican_redirect",
    "plugins.video_schema",
    "plugins.comments",
    "plugins.pelican-toc",
    "plugins.related_posts",
    "plugins.baba_stats",
    "plugins.extract_linked_metadata",
    "plugins.bluesky_metadata",
    "plugins.embed_tweet",
]
dev_plugins = common_plugins.copy()
prod_extra_plugins = ["pelican.plugins.seo"]
prod_plugins = common_plugins + prod_extra_plugins
PLUGINS = prod_plugins if PUBLISH else dev_plugins

# Series plugin settings
SERIES_DEFAULT_INDEXING = "date"
SERIES_PAGE_INDEXING = "title"

# Search plugin settings
SEARCH_MODE = "output"
SEARCH_HTML_SELECTOR = "main"
SEARCH_LIMIT = 10
FORMATTED_FIELDS = ["summary", "content"]

# =============================================================================
# MARKDOWN & TOC SETTINGS
# =============================================================================
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.fenced_code": {},
        "markdown.extensions.tables": {},
        "markdown.extensions.toc": {
            "permalink": "#",
        },
        "markdown.extensions.admonition": {},
        "markdown.extensions.attr_list": {},
        "markdown.extensions.footnotes": {},
    },
    "output_format": "html5",
}
TOC = {
    "TOC_HEADERS": "^h[1-3]",
    "TOC_RUN": "true",
    "TOC_INCLUDE_TITLE": "false",
}

# =============================================================================
# SEO & ANALYTICS SETTINGS
# =============================================================================
SEO_REPORT = True
SEO_ENHANCER = False
SEO_ENHANCER_OPEN_GRAPH = False
SEO_ENHANCER_TWITTER_CARDS = False
SEO_ARTICLES_LIMIT = 10
SEO_PAGES_LIMIT = 10
GOOGLE_ANALYTICS = "G-JLZ9JH5GKD"
GTM_ID = "GTM-KPLBQPPJ"
GOOGLE_ADSENSE = "ca-pub-6089943780218266"
SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.7,
        "indexes": 0.5,
        "pages": 0.5,
    },
    "changefreqs": {
        "articles": "monthly",
        "indexes": "daily",
        "pages": "monthly",
    },
    "exclude": [
        "^noindex/",
        "^tag/",
        r"\.json$",
        r"\.txt$",
        "_redirects",
        "404.html",
    ],
}
ROBOTS = "index, follow"

# =============================================================================
# SOCIAL & EXTERNAL SERVICES
# =============================================================================
DISQUS_SITENAME = "yuceltoluyag"
SOCIAL = {
    "discord": "188034964879573003",
    "github": "yuceltoluyag",
    "instagram": "yuceltoluyag",
    "youtube": "yuceltoluyag",
    "twitch": "yuceltoluyag",
    "kick": "babapy",
    "bynogame": "https://donate.bynogame.com/yuceltoluyag",
    "github_sponsor": "yuceltoluyag",
    "bluesky": "yuceltoluyag.bsky.social",
    "reddit": "dolorisback",
    "x": "yuceltoluyag",
}
MASTODON = {
    "username": "yuceltoluyag",
    "instance": "mastodon.social",
}
WEBMENTION_IO_TOKEN = "Ap4Pb-YQo7Ne68a7rpJ0qA"
LINKS = {
    "Pelican": "https://getpelican.com/",
    "Python.org": "https://www.python.org/",
}

# =============================================================================
# DEVELOPMENT & MISC SETTINGS
# =============================================================================
DEVELOPMENT_MODE = False
DELETE_OUTPUT_DIRECTORY = True
CACHE_CONTENT = False
CHECK_MODIFIED_METHOD = "sha1"
LOAD_CONTENT_CACHE = False
GZIP_CACHE = False
JINJA_ENVIRONMENT = {"extensions": ["jinja2.ext.i18n"]}
tmpsig = signal("tmpsig")
I18N_FILTER_SIGNALS = [tmpsig]
WITH_FUTURE_DATES = True
USE_FOLDER_AS_CATEGORY = True
WEBASSETS_DEBUG = False
MAIN_MENU = True
RELATED_POSTS_MAX = 4
SUMMARY_MAX_LENGTH = 160
DEFAULT_CATEGORY = "duyurular"
ARTICLE_EDIT_LINK = (
    "https://github.com/yuceltoluyag/yuceltoluyag.github.io/edit/main/content/articles/"
    "%(slug)s.md"
)
COMMENTS_ENABLED = True
ENHANCE_META = True
ADMIN_TOOLS = False
VERSION = "1.0.0"
THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
THEME_COLOR_ENABLE_USER_OVERRIDE = True
USE_LESS = True
JINJA_GLOBALS = {"current_year": date.today().year}
IGNORE_FILES = ["404.html", ".#&", "flycheck_*", "flymake_*"]
DEFAULT_PAGESCHEMA = "article"
HOME_HIDE_TAGS = True

# =============================================================================
# REDIRECTS
# =============================================================================
REDIRECTS = {
    "/tags/facebook.html": "/etiket/facebook/",
    "/tags/facebook": "/etiket/facebook/",
    "/tags/github.html": "/etiket/github/",
    "/tags/github": "/etiket/github/",
    "/tags/mp3.html": "/etiket/mp3/",
    "/tags/mp3": "/etiket/mp3/",
    "/tags/ntfs.html": "/etiket/ntfs/",
    "/tags/film/": "/etiket/film/",
    "/tags/linux.html": "/etiket/linux/",
    "/tags/zsh.html": "/etiket/zsh/",
    "/tags/terminal/": "/etiket/terminal/",
    "/tags/sweetalert.html": "/etiket/sweetalert/",
    "/category/tanitim.html": "/kategori/haberler/",
    "/categories/facebook": "/kategori/sosyal-medya/",
    "/category/tan%C4%B1t%C4%B1m.html": "/kategori/haberler/",
    "/category/tan%C4%B1t%C4%B1m": "/kategori/haberler/",
    "/series/phpstorm.html": "/etiket/phpstorm/",
    "/yazar/": "/yazarlar/",
    "/linuxta-uefi-windows-10-format-usb_14": "/linux-uefi-windows10-usb/",
    "/linuxta-uefi-windows-10-format-usb": "/linux-uefi-windows10-usb/",
    "/guncel-ucretsiz-steam-gog-epic-oyunlari-Kopya": "/guncel-ucretsiz-oyunlar/",
    "/guncel-ucretsiz-steam-gog-epic-oyunlari": "/guncel-ucretsiz-oyunlar/",
    "/felix-coin-guvenlimidir": "/onemli-degisiklikler/",
    "/vlsub-ile-altyaz-aramaya-son-resimli": "/vlsub-ile-altyazi-aramaya-son/",
    "/terminatorgitcurlfish-yukleme": "/terminator-git-curl-fish-kurulumu",
    "/linux-tema-nasl-yuklenir-gnome-shell-ve": "/linux-tema-nasil-yuklenir",
    "/facebook-toplu-grup-2021": "/facebook-gruba-toplu-arkadas-ekleme",
    "/linux-ekran-karti-kurulumu": "/arch-linux-nvidia-ekran-karti-kurulumu",
    "/wsl-archlinux-kurulumu": "/wsl-uzerinde-arch-linux-kurulumu/",
    "/elektronik-sigara-zararlimi-faydalimi": "/e-sigara-tecrubelerim",
    "/git-ssh-key-olusturma-windows": "/git-ssh-key-olusturma/",
    "/modern-mutt-kurulumu": "/modern-bir-mutt-kurulumu-1-bolum",
    "/openvpn-nasil-kurulur": "/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi",
    "/linux-ozellestirebilir-mp3-oynatcs": "/linux-ozellestirilebilir-mp3-oynaticisi-audacious/",
    "/vagrant-virtualbox-61-ile-uyumlu-hale": "/vagrant-virtualbox-6-1-uyumluluk",
    "/virtualbox-vagrant-laravel-arch-linux": "/archlinux-virtualbox-vagrant-laravel-phpmyadmin-kurulumu",
    "arch-linux-apachelampp-sanal-sunucu": "/arch-linux-apache-lampp-sanal-sunucu-kurulumu",
    "/archlinux-ntfs-nasil-yapilandirilir": "/arch-linux-ntfs-yapilandirma",
    "/earncom-nedir-nasl-kullanlr": "/earn-com-nedir-nasil-kullanilir",
    "/linux-httrack-kullanm": "/linux-ta-httrack-kullanimi/",
    "/newsboat-kullanimi": "/newsboat-rss-feeds-kullanimi",
    "/kullandgm-enfes-sublime-text-eklentileri": "/sublime-text-eklentileri",
    "/facebook-otomatik-arkadas-ekleme-sureli": "/facebook-otomatik-arkadas-ekleme-sureli-secimli",
    "/windows-terminal-ozellestirme": "/windows-terminalimi-nasil-ozellestiriyorum",
    "/xampp-kullanarak-localhosta-ozel-alan": "/xampp-ozel-alan-adi/",
    "/about": "/hakkimda",
    "/jekyll-google-superproxy": "/jekyll-google-analytics-sayfa-goruntuleme",
    "/phpstorm-icerisinde-phpcsfixer": "/phpstorm-icinde-cs-fixer-kullanmak",
    "/zsh-icerisine-shopt-kullanmak": "/zsh-icerisinde-shopt-kullanmak",
    "/windows-uzerinde-redshift-kullanm": "/windows-uzerinde-redshift-kullanimi",
    "/phpstorm-icerisinde-cmder-kullanmak": "/phpstorm-icinde-cmder-kullanmak",
    "/pdo-sum-fonksiyonu-kullanmmorrisjs": "/pdo-sum-fonksiyonu-kullanimi-morris-js",
    "/facebook-toplu-arkadas-eklemegruba": "/facebook-gruba-toplu-arkadas-ekleme",
    "/facebook-5000-arkadas-ekleme-sureli-v2": "/facebook-5000-arkadas-ekleme-sureli",
    "/linux-uzerinde-apache2-mysql-phpmyadmin": "/linux-apache2-mysql-phpmyadmin-kurulumu",
    "/her-turk-gencinin-izlemesi-gereken": "/her-turk-gencinin-izlemesi-gereken-belgeseller-1",
    "/linux-codeigniter-son-surum-nasl": "/linux-ta-codeigniter-nasil-kurulur",
    "/sweet-alert-snf-kullanm-detayl-anlatm": "/sweet-alert-kullanimi",
    "/archlinux-valet-kurulumu": "/arch-linux-laravel-valet-kurulumu",
    "/arch-linux-lampp-kurulumuphp7xmariadbmy": "/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin",
    "/jekyll-staticman-eklentisi": "/jekyll-staticman-eklentisi-kurulumu",
    "/imap-openssl-terminalde-kullanimi": "/imap-sunucusuna-openssl-kullanarak-terminal-ile-erisin/",
    "/imap-openssl-terminalde-kullanim": "/imap-sunucusuna-openssl-kullanarak-terminal-ile-erisin/",
}
