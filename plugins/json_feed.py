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
    
    # Farklı diller için ayrı JSON feed oluşturmak için mevcut dili al
    # Burada, eklenti çalışırken geçerli dil ortamını belirlemek için generator.settings kullanacağız
    current_lang = getattr(generator, 'lang', generator.settings.get("DEFAULT_LANG", "tr"))
    
    base_site_url = generator.settings.get("SITEURL", "")
    
    # Dil bazlı SITEURL belirleme
    if current_lang == 'en':
        # İngilizce içerikler için, generator'daki ayarlara göre SITEURL zaten doğru olmalı
        # Ama eğer gerekirse manuel olarak /en ekleyebiliriz
        siteurl = base_site_url
        if not base_site_url.endswith('/en'):
            siteurl = base_site_url.rstrip('/') + '/en'
    else:
        siteurl = base_site_url
    
    # Dil bazlı URL düzeltmesi için özel bir fonksiyon tanımlayalım
    def normalize_url(url, site_url, current_lang):
        """
        URL'yi normalize eder - birden fazla kez tekrar eden SITEURL'leri kaldırır
        """
        if not site_url:
            return url
            
        # Potansiyel tekrar eden siteurl'leri temizle (örneğin: http://localhost:8080/http://localhost:8080/)
        # URL'nin başlangıcında birden fazla kez siteurl geçiyorsa temizle
        site_url_pattern = site_url.rstrip('/')
        if url.startswith(site_url_pattern + site_url_pattern):
            # siteurl'nin birden fazla geçtiği durumları düzelt
            # Bu durumda, sadece ilk geçişi koru
            # Örneğin: http://localhost:8080/http://localhost:8080/en/... -> http://localhost:8080/en/...
            parts = url.split(site_url_pattern)
            # İlk parçayı koru, diğerlerinden sadece bir '/' karakteri al
            normalized = site_url_pattern + ''.join([p.lstrip('/') for p in parts[1:]])
            return normalized
        elif url.startswith(site_url_pattern) and url[len(site_url_pattern):].startswith(site_url_pattern):
            # Başka bir senaryo: http://localhost:8080/http://localhost:8080 gibi
            # Bu durumda sadece ilk geçişi koruyoruz
            suffix = url[len(site_url_pattern):]
            if suffix.startswith(site_url_pattern):
                normalized = site_url_pattern + suffix[len(site_url_pattern):]
                return normalized
        return url

    feed = {
        "version": "https://jsonfeed.org/version/1",
        "title": generator.settings.get("SITENAME", ""),
        "home_page_url": siteurl,
        "feed_url": f"{siteurl}/feed.{current_lang}.json", # Dile özel feed URL'si
        "description": generator.settings.get("DESCRIPTION", ""),
        "author": {
            "name": generator.settings.get("AUTHOR", ""),
            "url": siteurl,
        },
        "items": [],
    }

    # Makaleleri ekle
    for article in generator.articles:
        # Makalenin dilini al
        article_lang = getattr(article, 'lang', 'tr')
        
        # Yalnızca bu dil için makaleleri ekle
        if article_lang != current_lang:
            continue
            
        # Makalenin kategori bilgisini al
        category = (
            getattr(article.category, "name", "") if article.category else ""
        )

        # Makalenin etiketlerini al
        tags = [tag.name for tag in getattr(article, "tags", [])]

        # article.url muhtemelen zaten doğru formatta
        if article.url.startswith('http'):
            # Zaten tam URL ise olduğu gibi kullan
            final_url = article.url
        elif current_lang == 'en':
            # İngilizce için, article.url zaten "en/some-slug" formatında olabilir
            if article.url.startswith('en/'):
                final_url = base_site_url.rstrip('/') + '/' + article.url
            else:
                # Aksi halde "en/" prefix'iyle birleştir
                final_url = base_site_url.rstrip('/') + '/en/' + article.url.lstrip('/')
        else:
            # Türkçe için sadece base_site_url ile birleştir
            final_url = base_site_url.rstrip('/') + '/' + article.url.lstrip('/')

        # URL'yi normalize et (tekrar eden URL'leri temizle)
        final_url = normalize_url(final_url, base_site_url + '/en' if current_lang == 'en' else base_site_url, current_lang)
        
        item = {
            "id": final_url,
            "url": final_url,
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
                
            # Sayfanın dilini al
            page_lang = getattr(page, 'lang', 'tr')
            
            # Yalnızca bu dil için sayfaları ekle
            if page_lang != current_lang:
                continue

            # page.url muhtemelen zaten doğru formatta
            if page.url.startswith('http'):
                # Zaten tam URL ise olduğu gibi kullan
                final_url = page.url
            elif current_lang == 'en':
                # İngilizce için, page.url zaten "en/some-slug" formatında olabilir
                if page.url.startswith('en/'):
                    final_url = base_site_url.rstrip('/') + '/' + page.url
                else:
                    # Aksi halde "en/" prefix'iyle birleştir
                    final_url = base_site_url.rstrip('/') + '/en/' + page.url.lstrip('/')
            else:
                # Türkçe için sadece base_site_url ile birleştir
                final_url = base_site_url.rstrip('/') + '/' + page.url.lstrip('/')

            # URL'yi normalize et (tekrar eden URL'leri temizle)
            final_url = normalize_url(final_url, base_site_url + '/en' if current_lang == 'en' else base_site_url, current_lang)
            
            item = {
                "id": final_url,
                "url": final_url,
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
    json_path = os.path.join(output_path, f"feed.{current_lang}.json") # Dile özel dosya adı
    
    # output_path dizininin varlığını kontrol et, yoksa oluştur
    os.makedirs(output_path, exist_ok=True)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(feed, f, ensure_ascii=False, indent=2)

    logger.info(
        f"JSON feed oluşturuldu: {json_path} ({len(feed['items'])} öğe)"
    )


def register():
    """Eklentiyi kaydet"""
    signals.article_writer_finalized.connect(generate_json_feed)
