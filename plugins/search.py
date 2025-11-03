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
    Create a local search index in JSON format for each language
    """
    logger.info("Creating search index...")

    # Get settings
    output_path = generator.settings.get("OUTPUT_PATH")
    current_lang = getattr(generator, 'lang', generator.settings.get("DEFAULT_LANG", "tr")) # Mevcut dili al
    base_site_url = generator.settings.get("SITEURL", "")
    
    # Dil bazlı SITEURL belirleme
    if current_lang == 'en':
        # İngilizce içerikler için, generator'daki ayarlara göre SITEURL zaten doğru olmalı
        # Ama eğer gerekirse manuel olarak /en ekleyebiliriz
        site_url = base_site_url
        if not base_site_url.endswith('/en'):
            site_url = base_site_url.rstrip('/') + '/en'
    else:
        site_url = base_site_url
    
    # URL normalize etme fonksiyonu
    def normalize_url(url, site_url, current_lang):
        """
        URL'yi normalize eder - birden fazla kez tekrar eden SITEURL'leri kaldırır
        """
        if not site_url:
            return url
            
        # Potansiyel tekrar eden siteurl'leri temizle (örneğin: http://localhost:8080/http://localhost:8080/)
        site_url_pattern = site_url.rstrip('/')
        if url.startswith(site_url_pattern + site_url_pattern):
            # siteurl'nin birden fazla geçtiği durumları düzelt
            # Sadece ilk geçişi koru
            parts = url.split(site_url_pattern)
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

    logger.debug(f"Search index output path: {output_path}")
    logger.debug(f"Search index current language: {current_lang}")
    logger.debug(f"Site URL: {site_url}")

    # Create search index
    search_index = []

    # Add articles to search index
    for article in generator.articles:
        # Article dilini al
        article_lang = getattr(article, 'lang', 'tr')
        
        # Sadece mevcut dile ait makaleleri indeksle
        if article_lang != current_lang:
            continue
            
        logger.debug(f"Indexing article: {article.url} ({article_lang})")

        # article.url muhtemelen zaten doğru formatta
        # Örneğin tr için: arch-linux-waydroid-kurulumu/ 
        # Örneğin en için: en/arch-linux-waydroid-kurulumu/
        # Bu durumda, sadece base_site_url ile birleştirmemiz yeterli
        
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
        
        record = {
            "id": final_url,
            "url": final_url,
            "title": article.title,
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
            
            # Sayfanın dilini al
            page_lang = getattr(page, 'lang', 'tr')
            
            # Sadece mevcut dile ait sayfaları indeksle
            if page_lang != current_lang:
                continue
                
            logger.debug(f"Indexing page: {page.url} ({page_lang})")

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
            
            record = {
                "id": final_url,
                "url": final_url,
                "title": page.title,
                "date": page.date.isoformat(),
                "summary": getattr(page, "summary", ""),
                "tags": [],
                "content": getattr(page, "content", ""),
            }

            search_index.append(record)

    # Write search index to file
    # Her dil için ayrı bir search.json dosyası oluştur
    search_index_filename = f"search.{current_lang}.json"
    
    # output_path dizininin varlığını kontrol et, yoksa oluştur
    os.makedirs(output_path, exist_ok=True) # Bu satırı ekleyelim

    search_index_path = os.path.join(output_path, search_index_filename)
    with open(search_index_path, "w", encoding="utf-8") as f:
        json.dump(search_index, f, ensure_ascii=False, indent=2)

    logger.info(f"Search index created for {current_lang} with {len(search_index)} items")


def register():
    """
    Register the plugin to Pelican
    """
    signals.article_writer_finalized.connect(create_search_index)
