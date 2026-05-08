from pelican import signals
import re

def embed_tweet(instance):
    if not instance._content:
        return

    content = instance._content
    
    # Replace @user/status/id with tweet embed
    content = re.sub(
        r"(^|[^@\w])@(\w{1,15})/status/(\d+)\b",
        '\\1<blockquote class="twitter-tweet" data-dnt="true" align="center"><a href="https://twitter.com/\\2/status/\\3">Tweet of \\2/\\3</a></blockquote>',
        content,
    )
    
    # Replace @user with profile link
    content = re.sub(
        r"(^|[^@\w])@(\w{1,15})(\b[^/])",
        '\\1<a href="https://twitter.com/\\2">@\\2</a>\\3',
        content,
    )

    # Only add the script if a tweet block is present
    if 'class="twitter-tweet"' in content:
        content += '<script async src="https://platform.twitter.com/widgets.js" charset="utf-8" data-dnt="true"></script>'

    instance._content = content


def register():
    signals.content_object_init.connect(embed_tweet)
