Title: Pelican Redirect Eklentisi: Eski URL'leri Sorunsuz Yönlendirin 🔄
Date: 2025-03-26 08:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: pelican, python, seo, redirect, yönlendirme, statik site
Slug: pelican-redirect-eklentisi
Authors: yuceltoluyag
Summary: Pelican ile oluşturulmuş statik sitelerinizde eski URL'leri korumak ve ziyaretçileri yeni sayfalara sorunsuz bir şekilde yönlendirmek için geliştirilmiş özel eklenti
Lang: tr
Translation: false
Status: published
Template: article
Image: images/pelican-redirect-eklentisi-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985388328975051
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrsnkpo2c2r

Statik site oluşturucuları kullanırken karşılaşılan en büyük sorunlardan biri, site yapısı veya URL'lerde yapılan değişikliklerden sonra eski bağlantıların çalışmaması problemidir. 🤔 Bu durum SEO açısından oldukça zararlı olabilir ve ziyaretçilerinizi kaybetmenize neden olabilir. Özellikle Google gibi arama motorlarında üst sıralarda yer alan içeriklerinize yapılan dış bağlantılar, URL değişiklikleri sonrasında "404 Sayfa Bulunamadı" hatasına düşecektir.

[responsive_img src="/images/pelican-redirect-eklentisi-xl.webp" alt="pelican-redirect-eklentisi" /]

Bu sorunu çözmek için Pelican için özel bir yönlendirme (redirect) eklentisi geliştirdik. Bu eklenti sayesinde eski URL'lerinizi koruyabilir ve ziyaretçilerinizi yeni sayfalara sorunsuz bir şekilde yönlendirebilirsiniz. 🚀

## Eklenti Nasıl Çalışır? 🛠️

Pelican Redirect eklentisi, iki temel yönlendirme mekanizması sunar:

1. **.302 uzantılı** dosyalar aracılığıyla yönlendirme
2. **REDIRECTS** yapılandırma değişkeni ile yönlendirme
3. İşte örnek kaynak dosyalar: [pelican_redirect.py](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/plugins/pelican_redirect.py){: target="\_blank" rel="noopener noreferrer"} + [redirect.html](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/themes/Minel/templates/redirect.html){: target="\_blank" rel="noopener noreferrer"}
   Her iki yöntem de HTML meta-refresh ve JavaScript location yönlendirmelerini kullanarak ziyaretçileri belirttiğiniz yeni URL'lere yönlendirir.

## Kurulum 💻

Eklentiyi projenize eklemek için aşağıdaki adımları takip edebilirsiniz:

1. `plugins` dizini içerisine `pelican_redirect.py` dosyasını yerleştirin.
2. `pelicanconf.py` dosyanızda eklentiyi etkinleştirin:

```python
PLUGINS = [
    # ... diğer eklentiler ...
    'pelican_redirect',
]
```

3. Redirect şablonunu temanızın `templates` dizini içerisine yerleştirin:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <link rel="canonical" href="{{ page.location }}" />
    <script>
      location = "{{ page.location }}";
    </script>
    <meta
      http-equiv="refresh"
      content="{{ page.delay }}; url={{ page.location }}"
    />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <h1>Redirecting...</h1>
    <a href="{{ page.location }}">Click here if you are not redirected.</a>
  </body>
</html>
```

## Kullanım 🚀

### 1. .302 Uzantılı Dosyalar ile Yönlendirme

İçerik dizininizde `.302` uzantılı dosyalar oluşturarak yönlendirme yapabilirsiniz. Bu dosyaların içeriği şu şekilde olmalıdır:

```
location: /yeni-sayfa-yolu/
title: Yönlendirme Başlığı
delay: 0

İsteğe bağlı içerik metni buraya gelebilir.
```

### 2. REDIRECTS Değişkeni ile Yönlendirme

`pelicanconf.py` dosyanızda `REDIRECTS` sözlüğünü tanımlayarak yönlendirmeleri yapılandırabilirsiniz:

```python
REDIRECTS = {
    # "/eski-yol": "/yeni-yol"
    "/eski-makale-yolu": "/yeni-makale-yolu/",
    "/tags/eski-etiket.html": "/etiket/yeni-etiket/",
    "/category/eski-kategori.html": "/kategori/yeni-kategori/",
}
```

## Uzantısız URL'ler ve Klasör Yapısı 📁

Eklentimizin en güçlü özelliklerinden biri, uzantısız URL'leri doğru şekilde yönlendirebilmesidir. Örneğin, `/eski-makale-yolu` şeklindeki bir URL'yi `/yeni-makale-yolu/` adresine sorunsuz bir şekilde yönlendirebilirsiniz.

Uzantısız URL'ler için eklentimiz otomatik olarak bir klasör yapısı oluşturur ve içine bir `index.html` dosyası yerleştirir. Bu sayede tarayıcılar yönlendirmeyi doğru şekilde işleyebilir ve dosya indirme sorunu oluşmaz.

## Türkçe Karakterler ve URL Kodlama 🔤

Türkçe karakterler içeren URL'lerde bazen sorunlar yaşanabilir. Eklentimiz, hem URL kodlanmış hem de kodlanmamış versiyonları destekler. Örneğin:

```python
REDIRECTS = {
    "/category/tanitim.html": "/etiket/tanitim/",
    "/category/tan%C4%B1t%C4%B1m.html": "/etiket/tanitim/",
}
```

Bu örnekte, hem "tanitim" hem de kodlanmış "tanıtım" URL'leri aynı hedefe yönlendirilecektir.

## SEO Avantajları 📈

Bu eklentiyi kullanmanın SEO açısından pek çok avantajı vardır:

1. **Bağlantı Değeri Korunur**: Eski URL'lere yapılan bağlantıların değeri yeni sayfalara aktarılır.
2. **Kullanıcı Deneyimi İyileşir**: Ziyaretçiler, eski bağlantılara tıkladıklarında kayıp sayfa hatası yerine doğrudan içeriğe ulaşırlar.
3. **Arama Motoru İndeksleri Güncellenir**: Arama motorları, 301/302 yönlendirmeleri takip ederek indekslerini günceller.
4. **Sosyal Medya Paylaşımları Korunur**: Sosyal medyada paylaşılan eski bağlantılar çalışmaya devam eder.

## Sorun Giderme 🛠️

Eğer yönlendirmeleriniz beklendiği gibi çalışmıyorsa, şu adımları kontrol edin:

1. Şablon dosyasının (`redirect.html`) doğru dizinde olduğunu ve doğru değişkenleri kullandığını kontrol edin.
2. URL'lerin başında `/` karakterinin bulunduğundan emin olun.
3. Uzantısız URL'lerin sonunda `/` karakteri olup olmadığına dikkat edin.
4. Pelican'ı yeniden çalıştırın ve çıktı dizininde oluşturulan dosyaları kontrol edin.

## Sonuç 🎯

Pelican Redirect eklentisi, statik sitenizde URL yapısını değiştirmeniz gerektiğinde eski bağlantıları korumak için mükemmel bir çözümdür. SEO değerinizi korur, kullanıcı deneyimini iyileştirir ve site bakımını kolaylaştırır.

Eklentiyi kendi projenizde kullanarak geri bildirimde bulunmaktan çekinmeyin. Açık kaynak topluluğuna katkıda bulunmak ve projelerinizi geliştirmek için her zaman yeni özellikler ve iyileştirmeler üzerinde çalışıyoruz. 💪

**Not**: Bu eklenti, Pelican 4.x ve üzeri sürümlerle test edilmiştir. Daha eski sürümlerde bazı uyumluluk sorunları yaşanabilir.



