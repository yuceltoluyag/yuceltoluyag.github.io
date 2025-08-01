#!/usr/bin/env python
# -*- coding: utf-8 -*- #
import os
from pymdownx import emoji

# --- Environmental Variables ---
PUBLISH = os.environ.get("PUBLISH")
SITEURL = "https://yuceltoluyag.github.io/" if PUBLISH else "http://localhost:8000"
CANONICAL_URL = "https://yuceltoluyag.github.io/"  # Her zaman production URL'i kullan
AUTHOR = "yuceltoluyag"
SITENAME = "Ortaya Karışık"
KEYWORDS = "linux, python, web geliştirme, programlama, açık kaynak, teknoloji, yazılım geliştirme, django, flask, pelican, git, github, terminal komutları, sistem yönetimi, web tasarım, backend development"
DESCRIPTION = "Linux, Python ve Web Geliştirme Rehberleri"
ARTICLE_PATHS = ["articles"]
PAGE_PATHS = ["pages"]
PATH = "content"
CONTENT_DIR = PATH
CONTENT_BASE_URL = os.path.abspath(os.path.dirname(__file__))
OUTPUT_PATH = "output"
TIMEZONE = "Europe/Istanbul"

# Webmention Testi için
DEVELOPMENT_MODE = False
WEBMENTION_TEST_MODE = False  # Webmention test modu

DEFAULT_LANG = "tr"


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
HOME_HIDE_TAGS = True


DEFAULT_PAGINATION = 10
DEFAULT_PAGESCHEMA = "article"
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
# URLs temizleme
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
# URL sonlarındaki .html'i kaldır
ARTICLE_LANG_URL = "{slug}-{lang}/"
ARTICLE_LANG_SAVE_AS = "{slug}-{lang}/index.html"
PAGE_LANG_URL = "{slug}-{lang}/"
PAGE_LANG_SAVE_AS = "{slug}-{lang}/index.html"
# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# Theme ayarları
THEME = "themes/Minel"
THEME_STATIC_DIR = "assets"
WITH_FUTURE_DATES = True
USE_FOLDER_AS_CATEGORY = True
WEBASSETS_DEBUG = False
MAIN_MENU = True
RELATED_POSTS_MAX = 4
DRAFT_SAVE_AS = DRAFT_PAGE_SAVE_AS = "drafts/{slug}/index.html"
DRAFT_URL = DRAFT_PAGE_URL = "drafts/{slug}/"
DIRECT_TEMPLATES = ["index", "tags", "categories", "archives", "authors"]
# Do we want to wipe the /output folder every build,
# or just accumulate new stuff?
DELETE_OUTPUT_DIRECTORY = True
DISABLE_URL_HASH = True
BROWSER_COLOR = "#333333"
PYGMENTS_STYLE = "dracula"
PYGMENTS_RST_OPTIONS = {
    "linenos": "table",  # Satır numaralarını tablo olarak göster
    "anchorlinenos": True,  # Satır numaralarına bağlantı ekle
    "cssclass": "highlight",  # Kullanılacak CSS sınıfı
    "wrapcode": True,  # Kod uzunsa wrap yap
}
ROBOTS = "index, follow"
# Extra Settings for the theme
DISPLAY_PAGES_ON_MENU = True
DISPLAY_CATEGORIES_ON_MENU = True
COPYRIGHT_YEAR = 1989
# İstatistik ayarları
STATISTICS_CATEGORIES = True  # Kategori istatistikleri
STATISTICS_AUTHORS = True  # Yazar istatistikleri
READING_SPEED_WPM = 200  # Dakikada ortalama kelime sayısı (varsayılan: 250)

# --- SEO Settings ---
SEO_REPORT = True  # SEO report is enabled by default
SEO_ENHANCER = False  # SEO enhancer is disabled by default
SEO_ENHANCER_OPEN_GRAPH = False  # Subfeature of SEO enhancer
SEO_ENHANCER_TWITTER_CARDS = False  # Subfeature of SEO enhancer
SEO_ARTICLES_LIMIT = 10
SEO_PAGES_LIMIT = 10

# Statik dosyalar
STATIC_PATHS = ["images", "extra", "files"]
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
    "extra/CNAME": {"path": "CNAME"},
}

# Plugin ayarları
# --- Plugin Settings ---
PLUGIN_PATHS = ["plugins"]

common_plugins = [
    "pelican.plugins.sitemap",
    "pelican.plugins.related_posts",
    "pelican.plugins.neighbors",
    "pelican.plugins.statistics",
    "pelican.plugins.series",
    "plugins.fix_sitemap",
    "plugins.json_feed",
    "responsive_image_shortcode",  # Responsive Image Shortcode
    "plugins.search",
    "plugins.pelican_redirect",
    "plugins.video_schema",
    "plugins.comments",
    "plugins.pelican-toc",  # İçindekiler tablosu eklentisi
]

dev_plugins = common_plugins.copy()

prod_extra_plugins = ["pelican.plugins.seo"]

prod_plugins = common_plugins + prod_extra_plugins

PLUGINS = prod_plugins if PUBLISH else dev_plugins

# SEO Ayarları (sadece yayınlama sırasında kullanılır)
if PUBLISH:
    SEO_REPORT = True  # SEO raporu oluşturmayı etkinleştir
    SEO_ENHANCER = False  # SEO geliştirici özellikleri devre dışı
    SEO_ENHANCER_OPEN_GRAPH = False  # Open Graph meta taglerini devre dışı
    SEO_ENHANCER_TWITTER_CARDS = (
        False  # Twitter Cards meta taglerini devre dışı
    )

# Extra ayarlar
SUMMARY_MAX_LENGTH = 50
DEFAULT_CATEGORY = "duyurular"

# Arama eklentisi ayarları
SEARCH_MODE = "output"
SEARCH_HTML_SELECTOR = "main"
SEARCH_LIMIT = 10
FORMATTED_FIELDS = ["summary", "content"]

# feed.json şablonunun çıktı yolu
FEED_JSON = "feed.json"
FEED_SAVE_AS = "feed.json"

ARTICLE_EDIT_LINK = (
    "https://github.com/yuceltoluyag/yuceltoluyag.github.io/edit/main/content/articles/"
    "%(slug)s.md"
)

# Comments
COMMENTS_ENABLED = True
# SEO ayarları
ENHANCE_META = True  # Meta geliştiricisini etkinleştir
# --- Google Analytics ---
GOOGLE_ANALYTICS = (
    "G-JLZ9JH5GKD"  # Google Analytics Ölçüm Kimliğinizi buraya yazın
)
# --- Google Tag Manager ---
GTM_ID = "GTM-KPLBQPPJ"  # Google Tag Manager ID'nizi buraya yazın
GOOGLE_ADSENSE = "ca-pub-6089943780218266"

# Sitemap ayarları
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
        "^noindex/",  # starts with "/noindex/"
        "^tag/",  # eski tag URL'leri
        r"\.json$",  # ends with ".json"
        r"\.txt$",  # ends with ".txt"
        "_redirects",
        "404.html",
        # Kategori sayfalarını dışlamayı kaldırıyoruz çünkü kullanıyoruz
        # "^category/",  # eski kategori URL'leri
        # "^author/",  # kullanılmıyorsa dışlanabilir
    ],
}

# --- Menu Items ---
MENUITEMS = [
    ("Ana Sayfa", "/"),
    ("Kategoriler", "/kategoriler/"),
    ("Etiketler", "/etiketler/"),
    ("Arşiv", "/arsiv/"),
    ("Yazarlar", "/yazarlar/"),
]

# Blogroll - Değişken olarak sözlük kullanıyoruz
LINKS = {
    "Pelican": "https://getpelican.com/",
    "Python.org": "https://www.python.org/",
}


# --- Social Media ---
SOCIAL = {
    "mastodon": "yuceltoluyag",
    "matrix": "fatpip",
    "discord": "188034964879573003",
    "github": "yuceltoluyag",
    "instagram": "yuceltoluyag",
    "youtube": "yuceltoluyag",
    "twitch": "yuceltoluyag",
    "kick": "babapy",
    "papara": "yuceltoluyag",
    "github_sponsor": "yuceltoluyag",
    "bluesky": "yuceltoluyag.bsky.social",
}

# Mastodon yorumları için yapılandırma
MASTODON_CONFIG = {
    "host": "mastodon.social",
    "user": "yuceltoluyag",
    "default_enabled": True,  # Varsayılan olarak yorumları etkinleştir
}

# Admin araçları ayarları
ADMIN_TOOLS = False  # Sadece geliştirme sırasında True yapılmalı

NAVBAR_LINKS = [
    {"name": "Ana Sayfa", "url": "/", "target": "_self"},
    {"name": "Hakkımda", "url": "/hakkimda", "target": "_self"},
    {"name": "Bağış", "url": "/bagis", "target": "_self"},
]

# --- License ---
CC_LICENSE = {
    "name": "Creative Commons Attribution-ShareAlike 4.0 International License",
    "version": "4.0",
    "slug": "by-sa",
    "icon": True,
    "language": "en_US",
}

WIDGETS = [
    "category.html",
    "recent_posts.html",
    "search.html",
    "tag.html",
    "tagcloud.html",
]

# 404.html dosyasını içerik işleme sürecinden çıkar
IGNORE_FILES = ["404.html"]

# --- Markdown Extensions ---
MARKDOWN = {
    "extensions": [
        "pymdownx.mark",
        "pymdownx.smartsymbols",
        "pymdownx.tilde",
        "pymdownx.saneheaders",
        "pymdownx.keys",
        "pymdownx.inlinehilite",
        "pymdownx.emoji",
        "pymdownx.extra",
        "markdown.extensions.attr_list",
        "pymdownx.highlight",
        "pymdownx.superfences",
    ],
    "extension_configs": {
        "pymdownx.emoji": {"emoji_generator": emoji.to_png_sprite},
        "pymdownx.highlight": {
            "use_pygments": True,
            "auto_title": True,
            "linenums_style": "pymdownx-inline",
        },
        "pymdownx.superfences": {"custom_fences": []},
    },
}

# Özel sayfa şablonları
PAGE_TEMPLATES = {
    "hakkimda": "about.html",
    "bagis": "donate.html",
    "privacy-policy": "legal.html",
    "terms": "legal.html",
}

# Öne çıkarılan makale için
FEATURED_ARTICLE = {
    "title": "Önemli Değişiklikler",
    "slug": "onemli-degisiklikler",
    "category": "duyurular",
    "summary": "Minel temasının tüm özelliklerini ve  Site hakkında önemli gelişmeleri ve yenilikleri bu sayfadan takip edebilirsiniz.",
    "date": "2024-03-20",
}


REDIRECTS = {
    # "/source_url": "/destination_url"
    # Etiket ve kategori yönlendirmeleri - Sadece benzersiz yollar belirtiyoruz
    "/tags/facebook.html": "/etiket/facebook/",
    "/tags/facebook": "/etiket/facebook/",  # Sonda / olmayan versiyonu koru
    "/tags/github.html": "/etiket/github/",
    "/tags/github": "/etiket/github/",  # Sonda / olmayan versiyonu koru
    "/tags/mp3.html": "/etiket/mp3/",
    "/tags/mp3": "/etiket/mp3/",  # Sonda / olmayan versiyonu koru
    "/tags/ntfs.html": "/etiket/ntfs/",
    "/tags/film/": "/etiket/film/",
    "/tags/linux.html": "/etiket/linux/",
    "/tags/zsh.html": "/etiket/zsh/",
    "/tags/sweetalert.html": "/etiket/sweetalert/",
    "/category/tanitim.html": "/kategori/tanitim/",
    "/categories/facebook": "/kategori/facebook/",  # Sonda / olmayan versiyonu koru
    "/category/tan%C4%B1t%C4%B1m.html": "/kategori/tanitim/",
    "/category/tan%C4%B1t%C4%B1m": "/kategori/tanitim/",  # Sonda / olmayan versiyonu koru
    "/series/phpstorm.html": "/etiket/phpstorm/",
    # Yazarlar yönlendirmesi
    "/yazar/": "/yazarlar/",  # yazar/ dizinini yazarlar/ dizinine yönlendir
    # Makale yönlendirmeleri - uzantısız olarak tanımlayarak dizin olarak oluşturulacak
    "/linuxta-uefi-windows-10-format-usb_14": "/linux-uefi-windows10-usb/",
    "/linuxta-uefi-windows-10-format-usb": "/linux-uefi-windows10-usb/",
    "/guncel-ucretsiz-steam-gog-epic-oyunlari-Kopya": "/guncel-ucretsiz-oyunlar/",
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
    "/linux-uzerinde-apache2-mysql-phpmyadmin": "/linux-apache2-mysql-phpmyadmin-kurulumu",
    "/her-turk-gencinin-izlemesi-gereken": "/her-turk-gencinin-izlemesi-gereken-belgeseller-1",
    "/linux-codeigniter-son-surum-nasl": "/linux-ta-codeigniter-nasil-kurulur",
    "/sweet-alert-snf-kullanm-detayl-anlatm": "/sweet-alert-kullanimi",
    "/archlinux-valet-kurulumu": "/arch-linux-laravel-valet-kurulumu",
    "/arch-linux-lampp-kurulumuphp7xmariadbmy": "/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin",
    "/jekyll-staticman-eklentisi": "/jekyll-staticman-eklentisi-kurulumu",
}

# Cache Settings
CACHE_CONTENT = True
CHECK_MODIFIED_METHOD = "sha1"
LOAD_CONTENT_CACHE = True
GZIP_CACHE = False
VERSION = "1.0.0"
THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
THEME_COLOR_ENABLE_USER_OVERRIDE = True
USE_LESS = True

# TOC (İçindekiler Tablosu) Ayarları

TOC = {
    "TOC_HEADERS": "^h[1-3]",
    "TOC_RUN": "true",
    "TOC_INCLUDE_TITLE": "false",
}
