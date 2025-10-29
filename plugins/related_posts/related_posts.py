"""
Related posts plugin for Pelican
================================

Adds related_posts variable to article's context
"""

from collections import Counter
from itertools import chain

from pelican import signals


def add_related_posts(generator):
    # get the max number of entries from settings
    # or fall back to default (5)
    numentries = generator.settings.get("RELATED_POSTS_MAX", 5)
    # Skip all posts in the same category as the article
    skipcategory = generator.settings.get("RELATED_POSTS_SKIP_SAME_CATEGORY", False)
    
    # Create language-specific tag mappings to avoid cross-language matching
    # In Pelican, articles use 'lang' attribute, but if not set, we fall back to checking translation relationships
    lang_tags = {}
    
    # Include both articles and their translations to properly separate by language
    all_articles = list(generator.articles)
    for article in generator.articles:
        all_articles.extend(article.translations)
    
    for article in chain(all_articles, generator.drafts):
        # Get language from article's lang attribute, or default to generator's default
        lang = getattr(article, 'lang', generator.settings.get('DEFAULT_LANG', 'en'))
        if lang not in lang_tags:
            lang_tags[lang] = {}
        
        for tag in getattr(article, 'tags', []):
            if tag not in lang_tags[lang]:
                lang_tags[lang][tag] = []
            lang_tags[lang][tag].append(article)

    for article in chain(all_articles, generator.drafts):
        # set priority in case of forced related posts
        if hasattr(article, "related_posts"):
            # split slugs
            related_posts = article.related_posts.split(",")
            posts = []
            # get related articles
            for slug in related_posts:
                i = 0
                slug = slug.strip()
                for a in generator.articles:
                    if i >= numentries:  # break in case there are max related psots
                        break
                    if a.slug == slug:
                        posts.append(a)
                        i += 1

            article.related_posts = posts
        else:
            # no tag, no relation
            if not hasattr(article, "tags"):
                continue

            # Get the language of the current article
            article_lang = getattr(article, 'lang', generator.settings.get('DEFAULT_LANG', 'en'))
            
            # score = number of common tags, but only for articles in the same language
            related = chain(*(lang_tags[article_lang].get(tag, []) for tag in article.tags))
            if skipcategory:
                related = (
                    other for other in related if other.category != article.category
                )
            scores = Counter(related)

            # remove itself
            scores.pop(article, None)

            article.related_posts = [
                other for other, count in scores.most_common(numentries)
            ]


def register():
    signals.article_generator_finalized.connect(add_related_posts)
