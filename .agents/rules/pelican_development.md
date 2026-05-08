---
trigger: 
  - filenames: ["pelicanconf.py", "publishconf.py", "tasks.py"]
  - keywords: ["pelican", "static site", "ssg"]
  - file_extensions: [".md", ".rst"]
description: Pelican SSG ve Python 3.12+ tabanlı geliştirme standartları.
---

# Pelican Geliştirme Kuralları

Bu kural, Pelican tabanlı statik site geliştirme süreçlerinde asistanın davranışlarını belirler.

## Bilgi Kaynakları ve Araştırma
- **Resmi Dökümantasyon:** Her zaman [getpelican.com](https://getpelican.com) adresini referans al.
- **Sürüm Takibi:** Değişiklikler için [getpelican.com/changelog.html](https://getpelican.com/changelog.html) adresini kontrol et.
- **Kaynak Kod:** Karmaşık mantıklar için [github.com/getpelican/pelican](https://github.com/getpelican/pelican) deposunu incele.
- **Eksik Bilgi:** Eğer dökümantasyon yetersizse veya çelişkili bilgi varsa, `context7` MCP aracını kullanarak derinlemesine araştırma yap.

## Teknik Standartlar
- **Sürümler:** Kod örneklerinde Pelican 4.12+ ve modern Python (3.12+) yapılarını (f-strings, type hinting vb.) kullan.
- **İçerik:** Markdown ve ReStructuredText (.rst) dosyalarında Pelican'ın desteklediği meta-etiket standartlarına sadık kal.
- **Eklenti Uyumluluğu:** `i18n_subsites` ve `sitemap` gibi yaygın eklentilerin güncel konfigürasyon yapılarını kullan.

## Projeye Özel Notlar
- **KRİTİK UYARI:** `pelicanconf.py` dosyasındaki yapısal değişkenler (bel kemiği) korunmalıdır. Tema geliştirme sürecinde bu dosyadaki mantıksal ayarlar değiştirilmemelidir.
- **TEMA SINIRI:** Yeni temalar ve tema değişiklikleri sadece `@themes` klasörü altında gerçekleştirilmelidir.
- Mevcut projede **LightningCSS** kullanıldığını ve CSS varlıklarının `themes/baba/static/css/` altında toplandığını unutma.
- Çeviriler için `find_missing_translations.py` gibi yerel araçları göz önünde bulundur.
