#!/usr/bin/env python
# -*- coding: utf-8 -*- #
import os
import sys
from datetime import timezone

# pelicanconf.py'den diğer ayarları içe aktarıyoruz
sys.path.append(os.curdir)
from pelicanconf import *

# Doğrudan Pelican tarafından kullanılacak değişkenleri kesin olarak tanımlıyoruz
# DİKKAT: Bu değerler her şekilde geçerli olacaktır
TIMEZONE = "Europe/Istanbul"
SITEURL = "https://yuceltoluyag.github.io"
RELATIVE_URLS = False
# Google Analytics - Yayın modunda gerçek ID'yi kullanın
GOOGLE_ANALYTICS = (
    "G-9KL9GYLPS5"  # Gerçek Google Analytics ID'nizi buraya yazın
)
# Google Tag Manager
GOOGLE_TAGMANAGER = (
    "GTM-PHW52JF"  # Gerçek Google Tag Manager ID'nizi buraya yazın
)
# Google AdSense
GOOGLE_ADSENSE = "ca-pub-6089943780218266"
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
        "^noindex/",  # noindex ile başlayan URL'ler
        "^tags/",  # Eski tags URL'leri - şimdi etiket/ kullanıyoruz
        "^tag/",  # Eski tag URL'leri
        r"\.json$",  # .json ile biten dosyalar
        r"\.txt$",  # .txt ile biten dosyalar
        "_redirects",
        "404.html",
        "^categories/",  # Eski kategori URL'leri - şimdi kategori/ kullanıyoruz
        "^category/",  # Eski kategori URL'leri
        # "^author/",  # yazar sayfaları kullanılmıyorsa bunu dışlayabilirsiniz
    ],
}
