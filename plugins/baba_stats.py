# -*- coding: utf-8 -*-
import logging
import re
import collections
import bs4
import nltk.tokenize
from pelican import signals

logger = logging.getLogger(__name__)

DEFAULT_WPM = {'en': 200, 'tr': 180}

TextStats = collections.namedtuple("TextStats", ['stcs', 'words', 'syllables'])

def pelican_init(pelican_object):
    """Pelican başlatıldığında ayarları al"""
    global DEFAULT_WPM
    # opsiyonel: pelicanconf.py üzerinden override edilebilir
    wpm_settings = pelican_object.settings.get('WORDCOUNT_WPM', {})
    DEFAULT_WPM.update(wpm_settings)

def getWordCounter(raw_text):
    """Kelime sayacı"""
    entities = r'\&\#?.+? அரி'
    raw_text = re.sub(entities, '', raw_text.replace('&nbsp;', ' '))
    drop = r'.,?!@#$%^&*()_+-=\|/[]{}`~:;\'"‘’—…“”'
    cleaned_text = raw_text.translate(dict((ord(c), u'') for c in drop))
    words = nltk.tokenize.RegexpTokenizer(r'\w+').tokenize(cleaned_text)
    return collections.Counter(words)

def roundCounterToCount(counter):
    count = sum(counter.values())
    return int(round(count, -1))

def getRawText(instance):
    """Blockquote ve normal metni ayır"""
    soup = bs4.BeautifulSoup(instance._content, 'html.parser')
    bq_text = []
    for bq in soup.find_all("blockquote"):
        if not bq.find("blockquote"):
            bq_text.append(bq.getText())
            bq.extract()
    return " ".join(bq_text), soup.getText()

def countSyllablesEn(word):
    if len(word) <= 3:
        return 1
    word = re.sub(r"(es|ed|(?<!l)e)$", "", word)
    return len(re.findall(r"[aeiouy]+", word.lower()))

def countSyllablesTr(word):
    """Basit Türkçe hece sayımı: her ünlüyü bir hece say"""
    return len(re.findall(r"[aeiouıöüaeiouAEIOUİÖÜ]", word))

def normalizeText(text):
    terminators = ".!?:;"
    term = re.escape(terminators)
    text = re.sub(r"[^%s\sA-Za-zığüşöçĞÜŞİÖÇ]+" % term, "", text)
    text = re.sub(r"\s*([%s]+\s*)+" % term, ". ", text)
    return re.sub(r"\s+", " ", text)

def text_stats(text, lang='en'):
    text = normalizeText(text)
    stcs = [s.split(" ") for s in text.split(". ")]
    stcs = [s for s in stcs if len(s) >= 2]
    words = sum(len(s) for s in stcs)
    if lang == 'en':
        sbls = sum(countSyllablesEn(w) for s in stcs for w in s)
    else:
        sbls = sum(countSyllablesTr(w) for s in stcs for w in s)
    return TextStats(len(stcs), words, sbls)

def flesch_index(stats):
    if stats.stcs == 0 or stats.words == 0:
        return 0
    return 206.835 - 1.015 * (stats.words / stats.stcs) - 84.6 * (stats.syllables / stats.words)

def flesch_kincaid_level(stats):
    if stats.stcs == 0 or stats.words == 0:
        return 0
    return 0.39 * (stats.words / stats.stcs) + 11.8 * (stats.syllables / stats.words) - 15.59

def turkish_readability(stats):
    """Basit Türkçe okunabilirlik: kelime/cümle ve hece uzunluğu bazlı"""
    if stats.stcs == 0 or stats.words == 0:
        return 0
    return 180 - (stats.words / stats.stcs) - (stats.syllables / stats.words)

def turkish_readability_level(stats):
    """Türkçe için basit seviye"""
    score = turkish_readability(stats)
    if score > 120: return 1
    elif score > 100: return 2
    elif score > 80: return 3
    else: return 4

def content_object_init(instance):
    """Pelican her yazıyı işlerken çağrılır"""
    if not getattr(instance, '_content', None):
        return

    lang = getattr(instance, 'lang', 'en')  # veya article.metadata.get('lang','en')
    wpm = DEFAULT_WPM.get(lang, 200)

    bq_text, nbq_text = getRawText(instance)
    stats = {}

    # Kelime sayısı ve okuma süresi
    wc_bq = roundCounterToCount(getWordCounter(bq_text))
    wc_nbq = roundCounterToCount(getWordCounter(nbq_text))
    stats['wc'] = wc_bq + wc_nbq
    stats['read_mins'] = stats['wc'] // wpm

    # Readability
    text_for_stats = bq_text + " " + nbq_text
    ts = text_stats(text_for_stats, lang=lang)
    if lang == 'en':
        stats['fi'] = f"{flesch_index(ts):.2f}"
        stats['fk'] = f"{flesch_kincaid_level(ts):.2f}"
    else:
        stats['fi'] = f"{turkish_readability(ts):.2f}"
        stats['fk'] = f"{turkish_readability_level(ts)}"

    instance.stats = stats

def register():
    signals.initialized.connect(pelican_init)
    signals.content_object_init.connect(content_object_init)