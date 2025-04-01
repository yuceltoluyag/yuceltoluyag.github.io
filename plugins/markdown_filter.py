"""
Markdown Filter
------------

Bu eklenti, Jinja2 şablonlarınızda Markdown içeriğini HTML'e dönüştürmek için
bir 'markdown' filtresi ekler.
"""

from markdown import markdown as md
from pelican import signals


def add_filter(pelican):
    """Markdown filtresini Jinja2 ortamına ekler."""
    pelican.env.filters.update({"markdown": parse_md})


def parse_md(text):
    """Markdown metni HTML'e dönüştürür."""
    if text:
        return md(
            text,
            extensions=[
                "markdown.extensions.fenced_code",
                "markdown.extensions.codehilite",
                "markdown.extensions.tables",
                "markdown.extensions.nl2br",
                "markdown.extensions.extra",
            ],
        )
    return ""


def register():
    """Plugin'i Pelican'a kaydet."""
    signals.generator_init.connect(add_filter)
