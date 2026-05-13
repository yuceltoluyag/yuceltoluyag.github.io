Title: Yunohost'ta robots.txt Dosyası Oluşturmak
Date: 2025-04-14 10:00
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: yunohost, robots.txt, nginx, seo, listeleme engelleme
Slug: yunohost-robots-txt-olusturmak
Authors: yuceltoluyag
Status: published
Image: images/yunohost-robotstxt-xl.webp
Summary: Yunohost'ta arama motorlarının web sitenizi nasıl taradığını kontrol etmek için robots.txt dosyasının nasıl oluşturulacağını adım adım öğrenin.
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114987831204439588
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvsve4rjq22f


🚀 **Web sitenizin arama motorları tarafından nasıl tarandığını kontrol etmek ister misiniz?** Yunohost üzerinde barındırdığınız uygulamalara özel `robots.txt` dosyası oluşturarak bu kontrolü tamamen elinize alabilirsiniz.

Bu yazıda, özellikle **Yunohost'ta robots.txt dosyası oluşturmak** konusunda adım adım bir rehber sunacağım. Ayrıca SEO uyumlu yapılandırma tekniklerini de öğreneceksiniz. Hedefimiz, Google gibi arama motorlarının sitenizi **istenmeyen şekilde dizine eklemesini engellemek**.

---

## 🤖 Robots.txt Nedir ve Neden Önemlidir?

`robots.txt`, bir sitenin kök dizininde yer alan ve arama motorlarına hangi sayfaları **tarayabileceklerini veya tarayamayacaklarını** bildiren düz metin dosyasıdır.

### Ne İşe Yarar?

- Arama motorlarının özel alanlara erişimini sınırlar.
- Sunucu yükünü azaltır.
- Gizli içeriklerin yanlışlıkla dizine alınmasını önler.
- SEO stratejinizin bir parçası olarak önemli rol oynar.

---

## ⚙️ Yunohost’ta Robots.txt Dosyası Oluşturmak

Yunohost, yapılandırmaları daha farklı bir şekilde ele alır. Robots.txt eklemek için aşağıdaki adımları izleyin:

### 1. Dosyayı Oluştur

Öncelikle `robots.txt` dosyasını uygulamanızın dizininde oluşturun:

```bash
sudo nano /var/www/listmonk/robots.txt
```

Aşağıdaki içeriği örnek olarak ekleyebilirsiniz:

```txt
User-agent: *
Disallow: /private/
Allow: /
```

> _Bu örnekte `/private/` dizini hariç tüm içerik taramaya açık._

---

## 🔐 Google'ın Sitene Erişimini Engellemek

Eğer Google botlarının sitenizi hiç dizine almamasını istiyorsanız:

```txt
User-agent: Googlebot
Disallow: /
```

Bu komut, yalnızca Googlebot'u engeller. Tüm botları engellemek için:

```txt
User-agent: *
Disallow: /
```

> ❗ Not: Bu sadece **dizinlemeyi** engeller, sayfaların taranmasını değil. Tam koruma için HTTP authentication veya `noindex` meta etiketleri de kullanılabilir.

---

## 🔧 Nginx Üzerinden robots.txt Sunmak

Dosyayı oluşturduktan sonra Nginx sunucusuna bu dosyayı düzgün bir şekilde tanıtmak gerekiyor.

### 1. Gerekli Nginx Konfigürasyonunu Bul

```bash
sudo find / -type f -name 'listmonk'
```

Gelen sonuçlardan ilgili Nginx config dosyasını seçin:

```bash
sudo nano /etc/nginx/conf.d/listmonk.minel.yuceltoluyag.github.io.d/listmonk.conf
```

### 2. Aşağıdaki `location` bloğunu ekleyin

```nginx
location = /robots.txt {
    alias /var/www/listmonk/robots.txt;
}
```

### 3. Nginx’i Yeniden Başlat

```bash
sudo systemctl restart nginx
```

---

## ✅ Doğrulama: Dosya Doğru Çalışıyor mu?

Tarayıcınızdan şu URL'yi ziyaret edin:

```
https://listmonk.minel.yuceltoluyag.github.io/robots.txt
```

Dosya düzgün görüntüleniyorsa, yapılandırmanız başarıyla tamamlanmış demektir.

---

[responsive_img src="/images/yunohost-robotstxt-xl.webp" alt="yunohost üzerinde oluşturulmuş örnek robots.txt dosyası" /]

---

## 🎓 İpuçları & Dikkat Edilmesi Gerekenler

- `robots.txt` yalnızca **kibar botlar** içindir. Kötü niyetli botlar bu dosyayı yok sayabilir.
- Dosyayı değiştirdikten sonra Google Search Console üzerinden test edin.
- Siteye özgü içerikler için ayrı kurallar yazabilirsiniz.
- Eğer uygulamanızda bir **public** dizini varsa, **robots.txt** dosyasını direkt oraya koyun—**%90** ihtimalle sorunsuz çalışır.Burada anlattığım yöntem ise public dizini olmadan, doğrudan nginx üzerinden robots.txt tanımlama yöntemi.

---

## ✍️ Sonuç

Yunohost'ta `robots.txt` dosyası oluşturmak oldukça kolay bir işlemdir ama doğru yapılandırıldığında sitenizin SEO stratejisini ciddi şekilde etkileyebilir. Özellikle belirli dizinleri gizlemek veya sadece belirli botlara izin vermek isteyenler için vazgeçilmezdir.



