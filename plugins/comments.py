#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Comments Plugin for Pelican
===========================

Bu eklenti, Pelican şablonlarında yorumları görüntülemek için gereken
araçları sağlar.
"""

import os
import glob
import yaml
import hashlib
from datetime import datetime, timedelta
from jinja2 import pass_eval_context
from markupsafe import Markup
from pathlib import Path
from markdown import markdown


def get_files(path, context):
    """Belirtilen dizindeki dosyaları döner"""
    content_path = context["CONTENT_DIR"]
    full_path = os.path.join(content_path, path)

    if not os.path.exists(full_path):
        return []

    return [
        os.path.basename(f) for f in glob.glob(os.path.join(full_path, "*"))
    ]


def read_yml_file(path, context):
    """YAML dosyasını okur ve içeriğini döner"""
    site_path = context["CONTENT_BASE_URL"]
    full_path = os.path.join(site_path, path)

    if not os.path.exists(full_path):
        return None

    try:
        with open(full_path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            return data
    except (yaml.YAMLError, IOError, UnicodeDecodeError) as e:
        print(f"Hata: {full_path} dosyası okunamadı: {e}")
        return None


def format_date(value, format_str="%d %B %Y, %H:%M"):
    """Tarih formatını düzenler"""
    if isinstance(value, str):
        try:
            value = datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return value

    try:
        return value.strftime(format_str)
    except (AttributeError, ValueError):
        return value


def md5_hash(email_str):
    """
    E-posta adresini MD5 formatında hash'ler (Gravatar için)
    """
    if not email_str:
        return "00000000000000000000000000000000"

    email_str = email_str.lower().strip()
    return hashlib.md5(email_str.encode("utf-8")).hexdigest()


@pass_eval_context
def md_to_html(eval_ctx, markdown_text):
    """Markdowndan HTML'e çevirir."""
    if not markdown_text:
        return ""
    html = markdown(markdown_text)
    if eval_ctx.autoescape:
        html = Markup(html)
    return html


def get_article_comments(slug):
    """
    Belirli bir makale için yorumları alır
    """
    comments_path = f"content/comments/{slug}"
    comments = []

    # Eğer klasör varsa, YAML dosyalarını oku
    if os.path.exists(comments_path):
        for comment_file in glob.glob(os.path.join(comments_path, "*.yml")):
            try:
                with open(comment_file, "r", encoding="utf-8") as f:
                    comment_data = yaml.safe_load(f)

                    # Dosya adından ID oluştur
                    comment_id = os.path.basename(comment_file).split(".")[0]
                    comment_data["id"] = comment_id

                    # parent_id kontrolü
                    if "parent_id" not in comment_data:
                        comment_data["parent_id"] = None

                    comments.append(comment_data)
            except Exception as e:
                print(f"Yorum dosyası '{comment_file}' okunamadı: {e}")

    # Test amaçlı yorumlar (geliştirme aşamasında)
    if not comments:
        comments = []

    # Yanıtları düzenle
    comment_map = {comment["id"]: comment for comment in comments}
    root_comments = []

    for comment in comments:
        # Eğer bir yanıt ise
        if comment["parent_id"] and comment["parent_id"] in comment_map:
            parent = comment_map[comment["parent_id"]]
            if "replies" not in parent:
                parent["replies"] = []
            parent["replies"].append(comment)
        # Ana yorum ise
        elif not comment["parent_id"]:
            root_comments.append(comment)

    # Yorumları tarihe göre sırala (en yeni en üstte)
    root_comments.sort(key=lambda x: x["date"], reverse=True)

    return root_comments


def add_comment_filters(pelican):
    pelican.env.filters.update(
        {
            "md_to_html": md_to_html,
            "format_date": format_date,
            "md5_hash": md5_hash,
        }
    )
    pelican.env.globals.update(
        {
            "get_article_comments": get_article_comments,
        }
    )


def add_comments_utils(generator):
    """Jinja şablonlarına yorum araçlarını ekler."""
    generator.env.globals.update(
        {
            "get_files": lambda path: get_files(path, generator.context),
            "read_yml_file": lambda path: read_yml_file(
                path, generator.context
            ),
        }
    )

    # Tarih formatı filtresi
    generator.env.filters.update(
        {
            "strftime": format_date,
            "md5_hash": md5_hash,
        }
    )


def register():
    """Eklentiyi Pelican'a kaydeder."""
    from pelican import signals

    signals.generator_init.connect(add_comments_utils)
    signals.generator_init.connect(add_comment_filters)
