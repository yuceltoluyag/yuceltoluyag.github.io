# -*- coding: utf-8 -*-
# Author: Yucel Toluyag
# Contact: yucel.toluyag@gmail.com
# Revision: $Revision: 1.0 $
# Date: $Date: 2025-11-02 12:00:00 +0300 (Sun, 02 Nov 2025) $
# Copyright: This module has been placed in the public domain.

"""
Turkish language mappings for language-dependent features of Docutils.
"""

__docformat__ = 'reStructuredText'

labels = {
    # fixed: language-dependent
    'author': 'Yazar',
    'authors': 'Yazarlar',
    'organization': 'Organizasyon',
    'address': 'Adres',
    'contact': 'İletişim',
    'version': 'Sürüm',
    'revision': 'Revizyon',
    'status': 'Durum',
    'date': 'Tarih',
    'copyright': 'Telif Hakkı',
    'dedication': 'İthaf',
    'abstract': 'Özet',
    'attention': 'Dikkat!',
    'caution': 'İhtiyat!',
    'danger': 'TEHLİKE!',
    'error': 'Hata',
    'hint': 'İpucu',
    'important': 'Önemli',
    'note': 'Not',
    'tip': 'Tüyo',
    'warning': 'Uyarı',
    'substitution-definition': 'İkame Tanımı',
    'citations': 'Alıntılar',
    'footnotes': 'Dipnotlar',
    'contents': 'İçindekiler'}
"""Mapping of node class name to label text."""

bibliographic_fields = {
    # language-dependent: fixed
    'yazar': 'author',
    'yazarlar': 'authors',
    'organizasyon': 'organization',
    'adres': 'address',
    'iletişim': 'contact',
    'sürüm': 'version',
    'revizyon': 'revision',
    'durum': 'status',
    'tarih': 'date',
    'telif hakkı': 'copyright',
    'ithaf': 'dedication',
    'özet': 'abstract'}
"""Turkish (lowcased) to canonical name mapping for bibliographic fields."""

author_separators = [';', ',']
"""List of separator strings for the 'Authors' bibliographic field."""
