# -*- coding: utf-8 -*-
# Author: Yucel Toluyag
# Contact: yucel.toluyag@gmail.com
# Revision: $Revision: 1.0 $
# Date: $Date: 2025-11-02 12:00:00 +0300 (Sun, 02 Nov 2025) $
# Copyright: This module has been placed in the public domain.

"""
Turkish-language mappings for language-dependent features of
reStructuredText.
"""

__docformat__ = 'reStructuredText'


directives = {
    # language-dependent: fixed
    'dikkat': 'attention',
    'ihtiyat': 'caution',
    'kod': 'code',
    'tehlike': 'danger',
    'hata': 'error',
    'ipucu': 'hint',
    'önemli': 'important',
    'not': 'note',
    'tüyo': 'tip',
    'uyarı': 'warning',
    'öğüt': 'admonition',
    'kenar çubuğu': 'sidebar',
    'konu': 'topic',
    'çizgi bloğu': 'line-block',
    'ayrıştırılmış değişmez': 'parsed-literal',
    'rubrik': 'rubric',
    'özdeyiş': 'epigraph',
    'vurgular': 'highlights',
    'kenara çek': 'pull-quote',
    'bileşik': 'compound',
    'kapsayıcı': 'container',
    #'sorular': 'questions',
    'tablo': 'table',
    'csv-tablosu': 'csv-table',
    'liste-tablosu': 'list-table',
    'matematik': 'math',
    'meta': 'meta',
    'resim': 'image',
    'şekil': 'figure',
    'dahil et': 'include',
    'ham': 'raw',
    'değiştir': 'replace',
    'unicode': 'unicode',
    'tarih': 'date',
    'sınıf': 'class',
    'rol': 'role',
    'varsayılan-rol': 'default-role',
    'başlık': 'title',
    'içindekiler': 'contents',
    'bölümnum': 'sectnum',
    'hedef-notlar': 'target-notes',
    'başlık': 'header',
    'altbilgi': 'footer',
    #'dipnotlar': 'footnotes',
    #'alıntılar': 'citations',
}
"""Turkish name to registered (in directives/__init__.py) directive name
mapping."""

roles = {
    # language-dependent: fixed
    'kısaltma': 'abbreviation',
    'kıs': 'abbreviation',
    'akronim': 'acronym',
    'akr': 'acronym',
    'kod': 'code',
    'dizin': 'index',
    'i': 'index',
    'alt simge': 'subscript',
    'alt': 'subscript',
    'üst simge': 'superscript',
    'üst': 'superscript',
    'başlık-referansı': 'title-reference',
    'başlık': 'title-reference',
    't': 'title-reference',
    'pep-referansı': 'pep-reference',
    'pep': 'pep-reference',
    'rfc-referansı': 'rfc-reference',
    'rfc': 'rfc-reference',
    'vurgu': 'emphasis',
    'güçlü': 'strong',
    'değişmez': 'literal',
    'matematik': 'math',
    'adlandırılmış-referans': 'named-reference',
    'anonim-referans': 'anonymous-reference',
    'dipnot-referansı': 'footnote-reference',
    'alıntı-referansı': 'citation-reference',
    'ikame-referansı': 'substitution-reference',
    'hedef': 'target',
    'uri-referansı': 'uri-reference',
    'uri': 'uri-reference',
    'url': 'uri-reference',
    'ham': 'raw',
}
"""Mapping of Turkish role names to canonical role names for interpreted text.
""" 
