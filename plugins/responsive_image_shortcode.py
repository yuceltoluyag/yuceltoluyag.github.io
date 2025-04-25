#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import re
from pelican import signals
from bs4 import BeautifulSoup


def responsive_image_shortcode(content):
    """
    [responsive_img src="/images/ornek.webp" alt="Örnek Görsel" /]

    şeklindeki shortcode'u responsive image ile değiştirir.

    Örneğin:
    [responsive_img src="/images/ornek-lg.webp" alt="Örnek Görsel" /]

    Şuna dönüştürülür:
    <img class="responsive-img"
        src="/images/ornek-lg.webp"
        srcset="/images/ornek-sm.webp 300w, /images/ornek-md.webp 500w, /images/ornek-lg.webp 800w"
        sizes="(max-width: 576px) 100vw, (max-width: 992px) 80vw, 60vw"
        loading="lazy"
        alt="Örnek Görsel">
    """
    if not content._content:
        return

    pattern = r'\[responsive_img\s+src="([^"]+)"\s+alt="([^"]*)"\s*/?\]'

    def replace_shortcode(match):
        src = match.group(1)
        alt = match.group(2)

        # Dosya adını ve uzantıyı ayır
        base_path = (
            src.rsplit("-lg.", 1)[0] if "-lg." in src else src.rsplit(".", 1)[0]
        )
        ext = src.split(".")[-1]

        # Boyut varyantlarını oluştur
        sm_src = f"{base_path}-sm.{ext}"
        md_src = f"{base_path}-md.{ext}"
        lg_src = f"{base_path}-lg.{ext}" if "-lg." not in src else src

        return f"""<img class="responsive-img" 
     src="{lg_src}" 
     srcset="{sm_src} 300w, {md_src} 500w, {lg_src} 800w" 
     sizes="(max-width: 576px) 100vw, (max-width: 992px) 80vw, 60vw"
     loading="lazy"
     alt="{alt}">"""

    content._content = re.sub(pattern, replace_shortcode, content._content)


def register():
    signals.content_object_init.connect(responsive_image_shortcode)
