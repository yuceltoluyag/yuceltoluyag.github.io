import re
from bs4 import BeautifulSoup
import json
from pelican import signals


def add_video_schemas(article_generator):
    """Sayfa jeneratörü tarafından oluşturulan içeriklere video şemaları ekler"""
    if article_generator.settings.get("VIDEO_SCHEMA_ENABLED", True):
        try:
            for article in getattr(article_generator, "articles", []):
                # Debug mesajları
                print(f"Makale inceleniyor: {article.title}")

                # YouTube iframe'lerini içerikte ara
                soup = BeautifulSoup(article._content, "html.parser")
                iframes = soup.find_all(
                    "iframe",
                    src=lambda s: s
                    and (
                        "youtube.com/embed/" in s
                        or "youtube-nocookie.com/embed/" in s
                    ),
                )

                if iframes:
                    print(
                        f"Makalede {len(iframes)} YouTube iframe'i bulundu: {article.title}"
                    )
                    schema_html = ""
                    for iframe in iframes:
                        src = iframe.get("src", "")
                        print(f"YouTube URL: {src}")
                        match = re.search(r"embed/([^/?]+)", src)
                        if match:
                            video_id = match.group(1)
                            print(f"Video ID: {video_id}")

                            # Video şeması oluştur
                            schema = {
                                "@context": "https://schema.org",
                                "@type": "VideoObject",
                                "name": article.title,
                                "description": (
                                    article.summary
                                    if hasattr(article, "summary")
                                    else article.title
                                ),
                                "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                                "uploadDate": article.date.isoformat(),
                                "embedUrl": f"https://www.youtube.com/embed/{video_id}",
                            }

                            # JSON-LD olarak ekle
                            schema_html += f'<script type="application/ld+json">{json.dumps(schema, ensure_ascii=False)}</script>\n'

                    # Şemaları makale içeriğine ekle
                    if schema_html:
                        print(f"Video şeması ekleniyor: {article.title}")
                        article._content = schema_html + article._content
                else:
                    print(
                        f"Makalede YouTube iframe'i bulunamadı: {article.title}"
                    )
        except Exception as e:
            print(f"Video şema eklentisi hata verdi: {e}")


def register():
    """Pelican sinyallerini kaydet"""
    signals.article_generator_finalized.connect(add_video_schemas)
