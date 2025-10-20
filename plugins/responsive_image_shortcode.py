#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import re
from pelican import signals


def responsive_image_shortcode(content):
    """
    [responsive_img src="/images/ornek.webp" alt="Örnek Görsel" /]

    şeklindeki shortcode'u responsive image ile değiştirir.

    Örneğin:
    [responsive_img src="/images/ornek-xl.webp" alt="Örnek Görsel" /]

    Şuna dönüştürülür:
    <img class="responsive-img"
        src="/images/ornek-xl.webp"
        srcset="/images/ornek-sm.webp 300w,
                /images/ornek-md.webp 500w,
                /images/ornek-xl.webp 800w,
                /images/ornek-xl.webp 1200w"
        sizes="(max-width: 576px) 100vw,
               (max-width: 992px) 80vw,
               (max-width: 1400px) 70vw,
               60vw"
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
        ext = src.split(".")[-1]

        # Boyut suffixlerini temizle (-sm, -md, -xl, -xl)
        base_path = re.sub(r"-(sm|md|lg|xl)$", "", src.rsplit(".", 1)[0])

        # Boyut varyantlarını oluştur
        sm_src = f"{base_path}-sm.{ext}"
        md_src = f"{base_path}-md.{ext}"
        lg_src = f"{base_path}-lg.{ext}"
        xl_src = f"{base_path}-xl.{ext}"

        return f"""<img class="responsive-img" 
     src="{xl_src}" 
     srcset="{sm_src} 300w, {md_src} 500w, {lg_src} 800w, {xl_src} 1200w" 
     sizes="(max-width: 576px) 100vw, (max-width: 992px) 80vw, (max-width: 1400px) 70vw, 60vw"
     loading="lazy"
     alt="{alt}">"""

    content._content = re.sub(pattern, replace_shortcode, content._content)


def register():
    signals.content_object_init.connect(responsive_image_shortcode)
