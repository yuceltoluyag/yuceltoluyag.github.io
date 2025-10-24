#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
JSON Feed Generator
==================

Pelican eklentisi: Arama için kullanılacak JSON feed oluşturur.
"""

import os
import json
import logging
from datetime import datetime
from pelican import signals

logger = logging.getLogger(__name__)


def format_date(date):
    """Tarihi ISO formatına dönüştürür"""
    if isinstance(date, datetime):
        return date.isoformat()
    return date


def generate_json_feed(generator, writer):
    """JSON feed dosyasını oluşturur"""
    logger.info("JSON feed oluşturuluyor...")

    output_path = generator.settings.get("OUTPUT_PATH")
    siteurl = generator.settings.get("SITEURL", "")

    feed = {
        "version": "https://jsonfeed.org/version/1",
        "title": generator.settings.get("SITENAME", ""),
        "home_page_url": siteurl,
        "feed_url": f"{siteurl}/feed.json",
        "description": generator.settings.get("DESCRIPTION", ""),
        "author": {
            "name": generator.settings.get("AUTHOR", ""),
            "url": siteurl,
        },
        "items": [],
    }

    # Makaleleri ekle
    for article in generator.articles:
        # Makalenin kategori bilgisini al
        category = (
            getattr(article.category, "name", "") if article.category else ""
        )

        # Makalenin etiketlerini al
        tags = [tag.name for tag in getattr(article, "tags", [])]

        # Makale öğesi oluştur
        item = {
            "id": f"{siteurl}/{article.url}",
            "url": f"{siteurl}/{article.url}",
            "title": article.title,
            "content_html": article.content,
            "summary": getattr(article, "summary", ""),
            "date_published": format_date(article.date),
            "category": category,
            "tags": tags,
        }

        # Değiştirme tarihi varsa ekle
        if hasattr(article, "modified") and article.modified:
            item["date_modified"] = format_date(article.modified)

        # Feed'e ekle
        feed["items"].append(item)

    # Sayfaları ekle
    if hasattr(generator, "pages"):
        for page in generator.pages:
            # Gizli sayfaları atla
            if getattr(page, "status", "") == "hidden":
                continue

            # Sayfa öğesi oluştur
            item = {
                "id": f"{siteurl}/{page.url}",
                "url": f"{siteurl}/{page.url}",
                "title": page.title,
                "content_html": page.content,
                "summary": getattr(page, "summary", ""),
                "date_published": (
                    format_date(page.date)
                    if hasattr(page, "date")
                    else datetime.now().isoformat()
                ),
                "category": "page",
                "tags": [],
            }

            # Değiştirme tarihi varsa ekle
            if hasattr(page, "modified") and page.modified:
                item["date_modified"] = format_date(page.modified)

            # Feed'e ekle
            feed["items"].append(item)

    # Tarihe göre sırala (yeniden eskiye)
    feed["items"].sort(key=lambda x: x.get("date_published", ""), reverse=True)

    # JSON dosyasına yaz
    json_path = os.path.join(output_path, "feed.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(feed, f, ensure_ascii=False, indent=2)

    logger.info(
        f"JSON feed oluşturuldu: {json_path} ({len(feed['items'])} öğe)"
    )


def register():
    """Eklentiyi kaydet"""
    signals.article_writer_finalized.connect(generate_json_feed)
