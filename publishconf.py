# -*- coding: utf-8 -*- #
import os
import sys
from datetime import timezone

# Doğrudan Pelican tarafından kullanılacak değişkenleri kesin olarak tanımlıyoruz
# DİKKAT: Bu değerler her şekilde geçerli olacaktır
TIMEZONE = "Europe/Istanbul"
LOCALE = ("tr_TR.UTF-8", "tr_TR")

# pelicanconf.py'den diğer ayarları içe aktarıyoruz
sys.path.append(os.curdir)
from pelicanconf import *

# Kritik değişkenleri pelicanconf.py'den aldıktan sonra tekrar açıkça tanımlıyoruz
# (Bu, Pelican'ın TIMEZONE ve SITEURL ayarlarını doğru algılamasını garantiler)
TIMEZONE = "Europe/Istanbul"
SITEURL = "https://yuceltoluyag.github.io"
RELATIVE_URLS = False

# Environment değişkenleri aracılığıyla ayarları zorlamak
os.environ["PELICAN_SITEURL"] = SITEURL
os.environ["PELICAN_TIMEZONE"] = TIMEZONE

# Feed ayarlarını açıkça belirtelim
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"

# SEO eklentisini geçici olarak kaldırdım (hata veriyordu)
PLUGINS = [p for p in PLUGINS if "seo" not in p]

# Leave the cache alone when publishing
CACHE_CONTENT = False
LOAD_CONTENT_CACHE = False

DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing
STORK_INPUT_OPTIONS = {
    "url_prefix": SITEURL,
    "html_selector": "main",
    "base_directory": "output",
}

# DISQUS_SITENAME = ""
MICROSOFT_CLARITY = True


# SEO ayarları geçici olarak devre dışı bırakıldı
# https://github.com/pelican-plugins/seo#usage
SEO_REPORT = False  # SEO report is disabled
SEO_ENHANCER = False  # SEO enhancer is disabled
SEO_ENHANCER_OPEN_GRAPH = False  # Subfeature of SEO enhancer
SEO_ENHANCER_TWITTER_CARDS = False  # Subfeature of SEO enhancer

# Google AdSense
GOOGLE_ADSENSE = "ca-pub-6089943780218266"
SITEMAP = {
    "format": "xml",
    "priorities": {
        "articles": 0.7,
        "indexes": 0.5,
        "pages": 0.5,
    },
    "changefreqs": {
        "articles": "daily",
        "indexes": "weekly",
        "pages": "monthly",
    },
    "exclude": [
        "^noindex/",  # starts with "/noindex/"
        "^tag/",  # contains "/tag/"
        r"\.json$",  # ends with ".json"
        r"\.txt$",  # ends with ".txt"
        "_redirects",
        "404.html",
        "^category/",  # we use tags, not categories
        "^author/",  # we don't use author pages
    ],
}
