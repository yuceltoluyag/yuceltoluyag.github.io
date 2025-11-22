"""Bluesky post metadata extractor

Processes a 'Bluesky' property from a post's metadata to link to a Bluesky thread.
"""

import logging
from dataclasses import dataclass
from pathlib import Path
from typing import Callable
from urllib.parse import urlparse

from pelican import signals
from pelican.contents import Content

log = logging.getLogger("bluesky_metadata")


@dataclass
class BlueskyPost:
    """Represents a Bluesky post with its necessary identifiers."""
    did: str
    post_cid: str


@dataclass
class MetadataProcessor:
    """A simple dataclass to hold the metadata processing function."""
    enrich_content: Callable[[str, str, Content], None]


def parse_linked_metadata(content: Content):
    """
    Parses metadata from content and calls the appropriate processor.
    Connected to the content_object_init signal.
    """
    for metadata_key, metadata_processor in SUPPORTED_METADATA.items():
        if metadata_key in content.metadata:
            metadata_value = content.metadata[metadata_key]
            metadata_processor.enrich_content(
                metadata_key, metadata_value, content
            )


def add_bluesky_to_content(_, bsky_url: str, content: Content):
    """
    Parses a Bluesky URL and attaches a BlueskyPost object to the content.
    Handles URLs like: https://bsky.app/profile/{did}/post/{post_cid}
    """
    try:
        parsed = urlparse(bsky_url)
        if parsed.scheme != "https" or parsed.netloc != "bsky.app":
            log.warning(
                f"Invalid Bluesky URL scheme/host in content {content}: {bsky_url}"
            )
            return

        path_parts = Path(parsed.path).parts
        # Expected path: ('/', 'profile', did, 'post', post_cid)
        if len(path_parts) == 5 and path_parts[1] == 'profile' and path_parts[3] == 'post':
            did = path_parts[2]
            post_cid = path_parts[4]

            content.bluesky = BlueskyPost(
                did=did,
                post_cid=post_cid,
            )
            log.debug(f"Added Bluesky metadata {content.bluesky} to {content}")
            if not hasattr(content, 'has_feedback'):
                content.has_feedback = True
        else:
            log.warning(
                f"Unrecognized Bluesky URL format in content {content}: {bsky_url}"
            )

    except (ValueError, IndexError) as e:
        log.warning(
            f"Could not parse Bluesky URL for content {content}: {bsky_url}. Error: {e}"
        )
        if hasattr(content, 'bluesky'):
            del content.bluesky
        return


def register():
    """Register the plugin signals."""
    signals.content_object_init.connect(parse_linked_metadata)


SUPPORTED_METADATA = {
    "bluesky": MetadataProcessor(enrich_content=add_bluesky_to_content),
}
