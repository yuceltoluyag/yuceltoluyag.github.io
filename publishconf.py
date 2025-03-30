#!/usr/bin/env python
# -*- coding: utf-8 -*- #
import os
import sys
import locale
from datetime import timezone

# Zaman dilimi ve locale ayarlarını zorla
os.environ["TZ"] = "Europe/Istanbul"
os.environ["LANG"] = "tr_TR.UTF-8"
os.environ["LC_ALL"] = "tr_TR.UTF-8"
os.environ["LC_TIME"] = "tr_TR.UTF-8"
# PUBLISH değişkenini ayarla, bu değişken pelicanconf.py'de kontrol edilebilir
os.environ["PUBLISH"] = "1"

# Python içinde locale ayarla
try:
    locale.setlocale(locale.LC_ALL, "tr_TR.UTF-8")
    print(f"Locale ayarı başarılı: {locale.getlocale()}")
except Exception as e:
    print(f"Locale ayarı hatası: {e}")

# pelicanconf.py'den diğer ayarları içe aktarıyoruz
sys.path.append(os.curdir)

# Önemli ayarlar önce tanımlanıyor (pelicanconf'tan önce)
_TIMEZONE = "Europe/Istanbul"
_SITEURL = "https://yuceltoluyag.github.io"
_LOCALE = ("tr_TR.UTF-8", "tr_TR")
_DEFAULT_LANG = "tr"

# Şimdi pelicanconf'u içe aktar
from pelicanconf import *

# Önemli değişkenleri yeniden tanımla (pelicanconf değerleri ezebilir)
# DİKKAT: Bu değerler yayın modunda her şekilde geçerli olacaktır

# Temel site bilgileri
SITEURL = "https://yuceltoluyag.github.io"  # Kesinlikle yayın URL'si olmalı
RELATIVE_URLS = False  # Yayın modunda bağıl URL'ler kapatılır

# Dil ve zaman dilimi ayarları
TIMEZONE = "Europe/Istanbul"
DEFAULT_LANG = "tr"
I18N_TEMPLATES_LANG = "en"  # Docutils için İngilizce kullan
DATE_FORMATS = {
    "tr": "%-d %B %Y",  # Gün (sıfırsız), Ay adı, Yıl
}
LOCALE = ("tr_TR.UTF-8", "tr_TR")

# Google servisleri
GOOGLE_ANALYTICS = "G-9KL9GYLPS5"
GOOGLE_TAGMANAGER = "GTM-PHW52JF"
GOOGLE_ADSENSE = "ca-pub-6089943780218266"

# Feed ayarları
FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"

# SEO eklentisini geçici olarak kaldırdık (hata veriyordu)
PLUGINS = [p for p in PLUGINS if "seo" not in p]

# Cache ayarları
CACHE_CONTENT = False
LOAD_CONTENT_CACHE = False
DELETE_OUTPUT_DIRECTORY = True

# Stork arama ayarları
STORK_INPUT_OPTIONS = {
    "url_prefix": SITEURL,
    "html_selector": "main",
    "base_directory": "output",
}

# Microsoft Clarity
MICROSOFT_CLARITY = True

# SEO ayarları geçici olarak devre dışı bırakıldı
SEO_REPORT = False
SEO_ENHANCER = False
SEO_ENHANCER_OPEN_GRAPH = False
SEO_ENHANCER_TWITTER_CARDS = False

# Debug için ayarları yazdır
print(f"DEBUG - TIMEZONE: {TIMEZONE}")
print(f"DEBUG - SITEURL: {SITEURL}")
print(f"DEBUG - DEFAULT_LANG: {DEFAULT_LANG}")
print(f"DEBUG - LOCALE: {LOCALE}")

# Sitemap ayarları
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
    ],
}
