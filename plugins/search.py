"""
# --*-- coding: utf-8 --*--
# Plugin to create a local search index for Pelican sites
"""

import json
import logging
import os
from pelican import signals

logger = logging.getLogger(__name__)


def create_search_index(generator, writer):
    """
    Create a local search index in JSON format
    """
    logger.info("Creating search index...")

    # Get settings
    output_path = generator.settings.get("OUTPUT_PATH")

    # Create search index
    search_index = []

    # Add articles to search index
    for article in generator.articles:
        logger.debug(f"Indexing article: {article.url}")

        # Create article record
        record = {
            "title": article.title,
            "url": article.url,
            "date": article.date.isoformat(),
            "summary": getattr(article, "summary", ""),
            "category": (
                getattr(article.category, "name", "")
                if article.category
                else ""
            ),
            "tags": [tag.name for tag in getattr(article, "tags", [])],
            "content": getattr(article, "content", ""),
        }

        search_index.append(record)

    # Add pages to search index if available
    if hasattr(generator, "pages") and generator.pages:
        for page in generator.pages:
            # Skip hidden pages (like 404)
            if getattr(page, "status", "") == "hidden":
                continue

            logger.debug(f"Indexing page: {page.url}")

            # Create page record
            record = {
                "title": page.title,
                "url": page.url,
                "date": page.date.isoformat(),
                "summary": getattr(page, "summary", ""),
                "tags": [],
                "content": getattr(page, "content", ""),
            }

            search_index.append(record)

    # Write search index to file
    search_index_path = os.path.join(output_path, "search.json")
    with open(search_index_path, "w", encoding="utf-8") as f:
        json.dump(search_index, f, ensure_ascii=False, indent=2)

    logger.info(f"Search index created with {len(search_index)} items")


def register():
    """
    Register the plugin to Pelican
    """
    signals.article_writer_finalized.connect(create_search_index)
