import re
from bs4 import BeautifulSoup
import json
from pelican import signals


def add_video_schemas(article_generator):
    """Sayfa jeneratörü tarafından oluşturulan içeriklere video şemaları ekler"""
    if article_generator.settings.get("VIDEO_SCHEMA_ENABLED", True):
        try:
            for article in getattr(article_generator, "articles", []):
                soup = BeautifulSoup(article._content, "html.parser")
                video_ids = []

                # YouTube iframe'lerini içerikte ara
                iframes = soup.find_all(
                    "iframe",
                    src=lambda s: s
                    and (
                        "youtube.com/embed/" in s
                        or "youtube-nocookie.com/embed/" in s
                    ),
                )
                for iframe in iframes:
                    src = iframe.get("src", "")
                    match = re.search(r"embed/([^/?]+)", src)
                    if match:
                        video_ids.append(match.group(1))

                # lite-youtube öğelerini ara
                lite_youtubes = soup.find_all("lite-youtube")
                for lite_yt in lite_youtubes:
                    video_id = lite_yt.get("videoid")
                    if video_id:
                        video_ids.append(video_id)

                if video_ids:
                    # Benzersiz video ID'leri üzerinden yinelenir
                    unique_video_ids = set(video_ids)
                    print(
                        f"Makalede {len(unique_video_ids)} YouTube videosu bulundu: {article.title}"
                    )
                    schema_html = ""
                    for video_id in unique_video_ids:
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
                        article._content = schema_html + article._content
        except Exception as e:
            print(f"Video şema eklentisi hata verdi: {e}")


def register():
    """Pelican sinyallerini kaydet"""
    signals.article_generator_finalized.connect(add_video_schemas)
