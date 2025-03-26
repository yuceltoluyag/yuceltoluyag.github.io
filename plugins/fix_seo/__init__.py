"""Pelican SEO eklentisini düzeltmek için monkey patch."""

import logging
from functools import wraps
from pelican import signals

logger = logging.getLogger(__name__)


def patch_seo_plugin():
    """SEO eklentisinin hatalarını düzeltir."""
    try:
        # ArticleSchemaCreator'ı düzelt
        from pelican.plugins.seo.seo_enhancer.html_enhancer.article_schema_creator import (
            ArticleSchemaCreator,
        )

        # Orijinal __init__ metodunu sakla
        original_init = ArticleSchemaCreator.__init__

        # Yeni __init__ metodu ile wrap yap
        @wraps(original_init)
        def safe_init(
            self, author, title, category, date, logo, image, siteurl, **kwargs
        ):
            """NoneType kontrolü yapan ArticleSchemaCreator.__init__."""
            # Yazar kontrolü
            if author is None:
                author_name = "Anonim"
                logger.warning(
                    "SEO: Yazar bilgisi bulunamadı. 'Anonim' olarak ayarlandı."
                )
            else:
                author_name = getattr(author, "name", "Anonim")

            # Kategori kontrolü
            if category is None:
                category_name = "Genel"
                logger.warning(
                    "SEO: Kategori bilgisi bulunamadı. 'Genel' olarak ayarlandı."
                )
            else:
                category_name = getattr(category, "name", "Genel")

            # Özellikleri ayarla
            self._author = author_name
            self._title = title
            self._category = category_name
            self._publication_date = date
            self._logo = logo
            self._image = image
            self._siteurl = siteurl

        # Orijinal metodu değiştir
        ArticleSchemaCreator.__init__ = safe_init
        logger.info(
            "SEO eklentisi ArticleSchemaCreator.__init__ metodu monkey patch ile düzeltildi."
        )

    except ImportError:
        logger.warning("SEO eklentisi bulunamadı. Patch atlanamadı.")
    except Exception as e:
        logger.error(f"SEO eklentisi patch işlemi sırasında hata: {e}")


def register():
    """Patch'i uygula."""
    signals.initialized.connect(patch_seo_plugin)
