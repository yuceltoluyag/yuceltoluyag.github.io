Title: Site İstatistikleri
Date: 2024-01-01
Modified: 2024-01-01
Category: duyurular
Slug: istatistikler
Status: published
Summary: Site genelinde istatistikler ve analizler

# Site İstatistikleri

Bu sayfa sitenin genel istatistiklerini göstermektedir.

## Genel İstatistikler

{% if statistics %}

<div class="grid">
  <div class="card">
    <h3>Toplam Makale Sayısı</h3>
    <p style="font-size: 2em; font-weight: bold; color: var(--pico-primary);">
      {{ statistics.articles_count }}
    </p>
  </div>
  
  <div class="card">
    <h3>Toplam Sayfa Sayısı</h3>
    <p style="font-size: 2em; font-weight: bold; color: var(--pico-primary);">
      {{ statistics.pages_count }}
    </p>
  </div>
  
  <div class="card">
    <h3>Toplam Kelime Sayısı</h3>
    <p style="font-size: 2em; font-weight: bold; color: var(--pico-primary);">
      {{ statistics.words_count }}
    </p>
  </div>
  
  <div class="card">
    <h3>Ortalama Okuma Süresi</h3>
    <p style="font-size: 2em; font-weight: bold; color: var(--pico-primary);">
      {{ statistics.reading_time }} dk
    </p>
  </div>
</div>

## Kategori İstatistikleri

{% if statistics.categories %}

<div class="card" style="margin-top: 2em;">
  <h3>En Popüler Kategoriler</h3>
  <ul>
    {% for category, count in statistics.categories.items() %}
    <li>
      <a href="{{SITEURL}}/kategori/{{ category.slug }}/">{{ category.name }}</a>
      <span style="float: right; color: var(--pico-muted-color);">{{ count }} makale</span>
    </li>
    {% endfor %}
  </ul>
</div>
{% endif %}

## Yazar İstatistikleri

{% if statistics.authors %}

<div class="card" style="margin-top: 2em;">
  <h3>Yazarlar</h3>
  <ul>
    {% for author, count in statistics.authors.items() %}
    <li>
      <a href="{{SITEURL}}/yazar/{{ author.slug }}/">{{ author.name }}</a>
      <span style="float: right; color: var(--pico-muted-color);">{{ count }} makale</span>
    </li>
    {% endfor %}
  </ul>
</div>
{% endif %}

## En Uzun Makaleler

{% if statistics.longest_articles %}

<div class="card" style="margin-top: 2em;">
  <h3>En Uzun Makaleler</h3>
  <ol>
    {% for article in statistics.longest_articles %}
    <li>
      <a href="{{SITEURL}}/{{ article.url }}">{{ article.title }}</a>
      <span style="float: right; color: var(--pico-muted-color);">{{ article.word_count }} kelime</span>
    </li>
    {% endfor %}
  </ol>
</div>
{% endif %}

{% else %}

<p>İstatistikler henüz yüklenemedi.</p>
{% endif %}
