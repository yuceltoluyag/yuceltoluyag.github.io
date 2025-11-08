"""
# --*-- coding: utf-8 --*--
# Plugin to strip ".html" from sitemap.
# This is specific for clean URLs in Firebase hosting
"""

import logging
import os
from pelican import signals

logger = logging.getLogger(__name__)


def main(generators):
    """
    Corrects the sitemap.xml file.
    """
    logger.info("--- Running fix_sitemap plugin ---")
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        logger.warning("BeautifulSoup4 is not installed, skipping sitemap correction.")
        return

    sitemap_path = os.path.join(generators.output_path, "sitemap.xml")

    if not os.path.exists(sitemap_path):
        logger.info(f"Sitemap file not found: {sitemap_path}")
        return

    with open(sitemap_path, "r", encoding="utf-8") as f:
        content = f.read()

    logger.info("--- Original sitemap content ---")
    logger.info(content)

    # Replace localhost with SITEURL
    siteurl = generators.settings.get("SITEURL", "")
    logger.info(f"SITEURL: {siteurl}")
    content = content.replace("http://localhost:8080", siteurl)

    # Replace  ref= with  href=
    content = content.replace(' ref=', ' href=')

    # Add xsi:schemaLocation to the <urlset> element
    content = content.replace(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd">'
    )

    logger.info("--- Content after replacements ---")
    logger.info(content)

    # Remove duplicate URLs
    try:
        soup = BeautifulSoup(content, "lxml-xml")
    except Exception:
        soup = BeautifulSoup(content, "xml")

    urls = {}
    for url_element in soup.find_all("url"):
        loc = url_element.find("loc").text
        if loc not in urls:
            urls[loc] = {"element": url_element, "xhtml_links": []}
        for xhtml_link in url_element.find_all("xhtml:link"):
            href = xhtml_link.get("href")
            if href:
                xhtml_link["href"] = href.replace("../", "")
            urls[loc]["xhtml_links"].append(xhtml_link)
            xhtml_link.extract()

    # Create a new soup to hold the corrected sitemap
    new_soup = BeautifulSoup(
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"></urlset>',
        "xml",
    )

    # Add the corrected urls to the new soup
    for loc, data in urls.items():
        url_element = data["element"]
        # Remove all existing xhtml:link elements from the original url_element
        for xhtml_link in url_element.find_all("xhtml:link"):
            xhtml_link.extract()
        # Add the new xhtml:link elements
        for xhtml_link in data["xhtml_links"]:
            url_element.append(xhtml_link)
        new_soup.urlset.append(url_element)

    corrected_content = str(new_soup)
    logger.info("--- Corrected sitemap content ---")
    logger.info(corrected_content)

    # Write the corrected sitemap
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(corrected_content)


def register():
    """
    Run after everything is complete
    """
    signals.finalized.connect(main)