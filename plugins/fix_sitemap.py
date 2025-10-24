"""
# --*-- coding: utf-8 --*--
# Plugin to strip ".html" from sitemap.
# This is specific for clean URLs in Firebase hosting
"""

import logging
import os
from pelican import signals

logger = logging.getLogger(__name__)


# This function called when all_generators_finalized signal sent
def main(generators):
    """
    Remove .html from sitemap
    """
    sitemap_path = "output/sitemap.xml"
    
    # Check if sitemap exists
    if not os.path.exists(sitemap_path):
        logger.info(f"Sitemap file not found: {sitemap_path} - This is normal if sitemap plugin is not generating it")
        return
    
    corrected = None
    
    try:
        with open(sitemap_path, "r", encoding="utf-8") as file:
            original = file.read()
            corrected = original.replace(".html", "")
    except Exception as error:
        logger.critical(f"Opening sitemap failed with error: {error}")
        return

    if corrected is not None:
        try:
            with open(sitemap_path, "w", encoding="utf-8") as file:
                file.write(corrected)
            logger.info("Sitemap successfully updated (removed .html extensions)")
        except Exception as error:
            logger.critical(f"Saving sitemap failed with error: {error}")


def register():
    """
    Run after everything is complete
    """
    signals.finalized.connect(main)