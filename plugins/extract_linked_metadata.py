"""Link a Fediverse toot from a post

Setting a `Toot` property on the post, with `domain`, `username`, and `id` properties
can be turned into a toot reference, which can be used in themes.
"""

import logging
from dataclasses import dataclass
from pathlib import Path
from typing import Callable
from urllib.parse import urlparse

from pelican import signals
from pelican.contents import Content

log = logging.getLogger("link_toot")


@dataclass
class Toot:
    domain: str
    username: str
    id: str


@dataclass
class MetadataProcessor:
    enrich_content: Callable[[str, str, Content], None]


def parse_linked_metadata(content: Content):
    for metadata_key, metadata_processor in SUPPORTED_METADATA.items():
        if metadata_key in content.metadata:
            metadata_value = content.metadata[metadata_key]

            metadata_processor.enrich_content(
                metadata_key, metadata_value, content
            )


def add_toot_to_content(_, toot_url, content: Content):
    try:
        toot_parts = [p.strip() for p in toot_url.split(",")]
        toot_keys = {
            k.strip(): v.strip() for k, v in [p.split("=") for p in toot_parts]
        }
    except ValueError:
        # maybe the toot was a URL?
        parsed = urlparse(toot_url)
        if parsed.scheme != "https":
            # not a valid URL
            log.warning(
                f"Invalid toot property on content {content}: {toot_url}"
            )
            del content.metadata["toot"]
            del content.toot
            return

        toot_path = Path(parsed.path)
        toot_keys = {
            "domain": parsed.netloc,
            "username": toot_path.parts[1],
            "id": toot_path.stem,
        }

    try:
        content.toot = Toot(
            domain=toot_keys["domain"],
            username=toot_keys["username"],
            id=toot_keys["id"],
        )
        log.debug(f"Added toot metadata {content.toot} to {content}")
        content.has_feedback = True

    except KeyError:
        log.warning(
            f"Incomplete toot property on content {content}: {toot_url}"
        )
        del content.metadata["toot"]
        del content.toot
        return


def add_lobsters_to_content(_, url, content: Content):
    content.lobsters_url = url
    content.has_feedback = True


def register():
    signals.content_object_init.connect(parse_linked_metadata)


SUPPORTED_METADATA = {
    "toot": MetadataProcessor(enrich_content=add_toot_to_content),
    "lobsters": MetadataProcessor(enrich_content=add_lobsters_to_content),
}
