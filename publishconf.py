import os
import sys

sys.path.append(os.curdir)
from pelicanconf import *

# Uyarıları gidermek için TIMEZONE ve LOCALE ayarlarını tekrar belirtelim
TIMEZONE = "Asia/Istanbul"
LOCALE = ("tr_TR.UTF-8", "tr_TR")

PLUGINS += [
    "seo",
]
# If your site is available via HTTPS, make sure SITEURL begins with https://
SITEURL = "https://yuceltoluyag.github.io"
RELATIVE_URLS = False

FEED_ALL_ATOM = "feeds/all.atom.xml"
CATEGORY_FEED_ATOM = "feeds/{slug}.atom.xml"

DELETE_OUTPUT_DIRECTORY = True

# Following items are often useful when publishing
STORK_INPUT_OPTIONS = {
    "url_prefix": SITEURL,
    "html_selector": "main",
    "base_directory": "output",
}

# DISQUS_SITENAME = ""
MICROSOFT_CLARITY = True


# https://github.com/pelican-plugins/seo#usage
SEO_REPORT = True  # SEO report is enabled by default
SEO_ENHANCER = True  # SEO enhancer is disabled by default
SEO_ENHANCER_OPEN_GRAPH = True  # Subfeature of SEO enhancer
SEO_ENHANCER_TWITTER_CARDS = True  # Subfeature of SEO enhancer

# Google AdSense
GOOGLE_ADSENSE = "ca-pub-6089943780218266"
