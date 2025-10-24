#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import os
import re
from pelican import signals
from bs4 import BeautifulSoup


def clean_html(html_string):
    """HTML etiketlerini ve fazla boşlukları temizler"""
    if not html_string:
        return ""

    # BeautifulSoup kullanarak HTML etiketlerini temizle
    soup = BeautifulSoup(html_string, "html.parser")
    text = soup.get_text(separator=" ", strip=True)

    # Fazla boşlukları temizle
    text = re.sub(r"\s+", " ", text).strip()
    return text


def generate_keywords(content):
    """İçerikten anahtar kelimeler oluşturur"""
    if not content:
        return []

    # Stop words - Türkçe yaygın stop word'ler
    stop_words = set(
        [
            "acaba",
            "altı",
            "ama",
            "ancak",
            "aslında",
            "ayrıca",
            "bana",
            "bazı",
            "belki",
            "ben",
            "benim",
            "beri",
            "beş",
            "bile",
            "bir",
            "birçok",
            "biri",
            "birkaç",
            "biz",
            "bu",
            "çok",
            "çünkü",
            "da",
            "daha",
            "de",
            "değil",
            "diğer",
            "diye",
            "dokuz",
            "dolayı",
            "dört",
            "elbette",
            "en",
            "gibi",
            "halen",
            "hangi",
            "hatta",
            "hem",
            "hep",
            "hepsi",
            "her",
            "hiç",
            "için",
            "ile",
            "ise",
            "işte",
            "kadar",
            "kendi",
            "ki",
            "kim",
            "mı",
            "mi",
            "mu",
            "mü",
            "nasıl",
            "ne",
            "neden",
            "nerde",
            "nerede",
            "nereye",
            "niçin",
            "niye",
            "o",
            "olan",
            "olarak",
            "oldu",
            "olduğu",
            "olsa",
            "olur",
            "on",
            "ona",
            "onlar",
            "onların",
            "onu",
            "onun",
            "öyle",
            "oysa",
            "sanki",
            "sekiz",
            "sen",
            "senden",
            "seni",
            "senin",
            "siz",
            "sizden",
            "size",
            "sizin",
            "son",
            "şey",
            "şöyle",
            "şu",
            "şuna",
            "şunları",
            "şunu",
            "tabi",
            "tamam",
            "tüm",
            "üç",
            "ve",
            "veya",
            "ya",
            "yani",
            "yedi",
            "yerine",
            "yine",
            "yoksa",
            "zaten",
        ]
    )

    # İçeriği temizle ve küçük harfe çevir
    cleaned_text = clean_html(content).lower()

    # Kelime tokenları oluştur
    words = re.findall(r"\b\w+\b", cleaned_text)

    # Stop word'leri kaldır ve minimum 3 harfli kelimeleri filtrele
    filtered_words = [
        word for word in words if word not in stop_words and len(word) >= 3
    ]

    # Kelime sayıları
    word_counts = {}
    for word in filtered_words:
        if word in word_counts:
            word_counts[word] += 1
        else:
            word_counts[word] = 1

    # En yaygın kelimeleri seç (en fazla 10 kelime)
    sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
    top_keywords = [word for word, count in sorted_words[:15]]

    return top_keywords


def enhance_article_metadata(content):
    """Makale meta verilerini geliştirir"""
    if not hasattr(content, "settings"):
        return

    if (
        content.settings.get("ENHANCE_META", True)
        and hasattr(content, "type")
        and content.type == "article"
    ):
        # Meta özeti kontrol et veya oluştur
        if not hasattr(content, "description") or not content.description:
            if hasattr(content, "summary"):
                # Özeti HTML'den temizle
                clean_summary = clean_html(content.summary)
                # Maksimum 160 karakter (Google için ideal)
                if len(clean_summary) > 160:
                    clean_summary = clean_summary[:157] + "..."
                content.description = clean_summary
            elif hasattr(content, "content"):
                # İçeriğin ilk 160 karakterini al
                clean_content = clean_html(content.content)
                if len(clean_content) > 160:
                    clean_content = clean_content[:157] + "..."
                content.description = clean_content

        # Anahtar kelimeleri kontrol et veya oluştur
        if not hasattr(content, "keywords") or not content.keywords:
            keywords = []

            # Etiketleri ekle
            if hasattr(content, "tags") and content.tags:
                keywords.extend([tag.name for tag in content.tags])

            # Kategoriyi ekle
            if hasattr(content, "category") and content.category:
                keywords.append(content.category.name)

            # İçerikten anahtar kelimeler çıkar
            if hasattr(content, "content"):
                content_keywords = generate_keywords(content.content)
                # Mevcut anahtar kelimelerde olmayanları ekle
                for keyword in content_keywords:
                    if keyword.lower() not in [k.lower() for k in keywords]:
                        keywords.append(keyword)

            # Anahtar kelimeleri sınırla (en fazla 10)
            if keywords:
                content.keywords = ", ".join(keywords[:10])


def enhance_page_metadata(content):
    """Sayfa meta verilerini geliştirir"""
    if not hasattr(content, "settings"):
        return

    if (
        content.settings.get("ENHANCE_META", True)
        and hasattr(content, "type")
        and content.type == "page"
    ):
        # Meta özeti kontrol et veya oluştur
        if not hasattr(content, "description") or not content.description:
            if hasattr(content, "summary"):
                clean_summary = clean_html(content.summary)
                if len(clean_summary) > 160:
                    clean_summary = clean_summary[:157] + "..."
                content.description = clean_summary
            elif hasattr(content, "content"):
                clean_content = clean_html(content.content)
                if len(clean_content) > 160:
                    clean_content = clean_content[:157] + "..."
                content.description = clean_content

        # Anahtar kelimeleri kontrol et veya oluştur
        if not hasattr(content, "keywords") or not content.keywords:
            # Sayfa içeriğinden anahtar kelimeler oluştur
            if hasattr(content, "content"):
                content_keywords = generate_keywords(content.content)
                if content_keywords:
                    content.keywords = ", ".join(content_keywords[:10])


def register():
    """Eklentiyi Pelican'a kaydeder"""
    signals.content_object_init.connect(enhance_article_metadata)
    signals.content_object_init.connect(enhance_page_metadata)
