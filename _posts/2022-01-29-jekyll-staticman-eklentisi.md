---
layout: post
title: Jekyll Staticman Eklentisi Kurulumu
description: Jekyll Adding Staticman Comments
image: "/assets/images/staticman-postman.webp"
category: kutuphane
tags: [staticman, jekyll]
comments: false
edit_url: true
toc: true
---

**Merhaba**

Blogumda daha önce **Disqus** yorum eklentisini kullanıyordum. Sırf aşağısında **"Do not Sell Data"** yazıyor diye uzun zaman önce gördüğüm ama bir türlü deneyimlemeyediğim **Staticman** ile tanışmış olduk.😌 Kurulum süreci biraz sancılı oldu.😅

# Staticman Nedir ?

**Staticman** tamamen sizin tarafınızdan kontrol edilen,**statik** siteler için oluşturulmuş harika bir kütüphanedir. İster **yorum** alanı ister **ziyaretçi** defteri istersenizde **iletişim formu** gibi kullanın 🐒 Repoda ki belgeler **eski** güncel versiyonla alakası yok, oraya bakarak birşeyler yapmaya çalışırsanız duvara toslarsınız. İşte **ben** siz duvara toslamayın diye varım 🥰

## Malzemeler 🥗

Efenim ilk başta bize gerekli olacak ;

- Heroku Üyeliği
- Github Uygulaması Oluşturma
- Github Tokens
- İkinci Bir Github Hesabı

# İlk Yapılacak

**Farklı** bir github hesabı açın. İsmini `benimşekillinickim-bot` benzeri birşey yapabilirsiniz. [Babanın Botu](https://github.com/babayorum-bot){:target="\_blank"}{:rel="noopener noreferrer"}

## Heroku Deploy

- [herokuapp](https://herokuapp.com/){:target="\_blank"}{:rel="noopener noreferrer"} Siteye gidip bir üyelik oluşturun

* Daha sonra bu repoya gidin [Staticman](https://github.com/eduardoboucas/staticman/tree/dev){:target="\_blank"}{:rel="noopener noreferrer"}.

- Ben dev branchını kullandım. Çünkü ana dalda bazı yenilikler merge edilmemiş.. Dilerseniz ana dalıda kullanabilirsinz. Onuda test ettim çalışıyor :) Bu kısımda alta bulunan `deploy heroku` butonuna tıklıyoruz.

![heroku-kurulumu](/assets/images/staticman8.webp)

Daha sonra ilgili ayarları düzenleyerek uygulamamızı deploy ediyoruz.

![heroku-kurulumu](/assets/images/staticman9.webp)

Şimdilik işlem bu kadar daha sonra ayarları düzenleyeceğiz.

# Github Apps

- İlk Önce [Github Apps](https://github.com/settings/apps){:target="\_blank"}{:rel="noopener noreferrer"} Bir uygulama oluşturuyorsunuz. Uygulamayı oluştururken kısımları şöyle dolduruyorsunuz .İsim,açıklama ve heroku adresinizi kendinize göre düzenlemeyi unutmayın :)

![staticman-kurulumu](/assets/images/staticman.webp)
![staticman-kurulumu](/assets/images/staticman2.webp)

## Private Keys

Private keys kısmından `Generate a private key` basın, oluşan dosyayı kaydedin. Bu kısım önemli, bu dosyada yazanları heroku ortam değişkenlerinde kullanacağız.

![heroku-kurulumu](/assets/images/staticman11.webp)

## Github Tokens

- [Github Tokens](https://github.com/settings/tokens/){:target="\_blank"}{:rel="noopener noreferrer"} adresinden token oluşturuyoruz. Vereceğiniz yetkiler ise şöyle olacak

![staticman-kurulumu](/assets/images/staticman3.webp)
![staticman-kurulumu](/assets/images/staticman4.webp)

Oluşturduktan sonra size kod verecek. O kodu saklayın ileride lazım olacak :) Daha sonra oluşturduğunuz uygulamaya tıklayın `Install App` kısmından `Install` a basıyoruz.

![staticman-kurulumu](/assets/images/staticman5.webp)

Açılan menüde isterseniz tüm repolarınızda yada tek bir repoda kullanabilirsiniz. Ben tek bir repoda kullanacağım o yüzden seçimimi şu şekilde yapıyorum.

![staticman-kurulumu](/assets/images/staticman6.webp)

Sonrasında `install`'a basıyoruz.

## Github Bot

Oluşturduğumuz farklı github adresini repomuza davet edeceğiz. Repomuza gidip `Settings` e basıyoruz. `Collaborators` kısmından `add people` basıp, oluşturduğumuz diğer github hesabının adını yazıp davet ediyoruz. Diğer hesabımızla giriş yapıp daveti kabul ediyoruz 🧠

![staticman-kurulumu](/assets/images/staticman7.webp)

Github ayarları burada bitmiştir 🤯

# Heroku Ayarları

Heroku panelimize gidiyoruz. Oluşturduğumuz uygulamaya tıklıyoruz. `Settings` kısmından `Config Vars` bölümüne gelip `Reveal Config Vars` tıklayın.

## Ortam Değişkenleri

- GITHUB_APP_ID
- GITHUB_PRIVATE_KEY
- GITHUB_TOKEN
- RSA_PRIVATE_KEY

isimlerinde dört anahtar ve değişken oluşturmalıyız. `GITHUB_APP_ID`,`GITHUB_TOKEN` kısmına yukarıda ki adımlarda oluşturulan anahtarlar yazılmalıdır. `GITHUB_PRIVATE_KEY` kısmını yukarıda oluşturmuştuk,içerisindekileri yapıştırı 😶‍🌫️ verin . `RSA_PRIVATE_KEY` kısmı şöyle dolduracağız ;D

## RSA KEY

```shell
ssh-keygen -m PEM -t rsa -b 4096 -C "burayabiseyyazin" -f ~/.ssh/staticman_key
```

Daha sonra oluşturduğunuz anahtarı görmek için

```shell
head -2 ~/.ssh/staticman_key
```

Yaptığınız işlem doğruysa şöyle bir çıktısı olur

```shell
-----BEGIN RSA PRIVATE KEY-----
MIDIGOMEDAGLARIBLA12930219312 #karman çurman birşey gelecek 😊
```

Bazı durumlarda ssh-keygen çalışmayabiliyor,alternatif olarak `openssl` kullanabilirsiniz.

```shell
openssl genrsa -out key.pem
```

Terminal olmadan yapmak istiyorsanız 😱, `online rsa key` oluşturucu sitelerini deneyebilirsiniz. [Online RSA Key Generator](https://travistidwell.com/jsencrypt/demo/){:target="\_blank"}{:rel="noopener noreferrer"} sitesine gidin `Key Size` kısmını **4096** yapın, **private** ve **public** key kısımlarını bir yerde saklayın 😜

{% include info.html content="Sevgili arkadaşlar Github'dan aldığımız `GITHUB_PRIVATE_KEY` ile `RSA Key`'imiz aynı olabilir. İsterseniz RSA Key oluşturma işlemini atlayabilirsiniz " title="Bilgi" icon="tip" fai="icon-diamonds" %}

# Staticman Ayarları

Staticman Ayarları YAML formatında saklanır. `staticman.yml` dosyasının içeriği şöyledir ;

```yaml
comments:
  # (*) Oluşturulacak Alanlar
  # Burada yorum formunda isim,eposta,websitesi,mesajı gibi alanların olmasını istedim
  # Yanıt id'si, yanıtlama sistemi kullanacağım için yazdım. Restine rest ;)
  allowedFields: ["isim", "eposta", "website", "mesaj", "yanit_id"]

  # Bu kısımda hangi alan adlarından formumuza istek atılabilmesi kısmını ayarlıyoruz.
  # Bu sayede belirlediğimiz alan adları dışında formumuza istek atılmasını önlüyoruz.
  # Geliştirme yaparken localhost adresinide kullanıyoruz. Projenizi canlıya çıkardığınızda localhost kısmını kaldırmanızı öneririm.
  allowedOrigins: ["localhost", "www.yuceltoluyag.github.io"]

  # Burada reponuzda ki branch i seçiyorsunuz. İstek yapan branch adları eşleşmez ise hata alabilirsiniz. Genelde master'dir
  branch: "master"

  # Burası ise yorum yapıldıktan sonra gelen Pull Requst mesajını özelleştireceğiniz alandır.

  commitMessage: "Comment from {fields.name} on {options.slug}"

  # Oluşturulacak Data dosyalarının adının biçimidir. Burada entry-tarih biçiminde oluşturulmuştur.
  filename: "entry-{@timestamp}"

  # Dosya biçimleri hangi formatta olsun. "json", "yaml"
  # yada "frontmatter" da kullanabilirsiniz.
  format: "yaml"

  # Staticman tarafından otomatik olarak doldurulacak ve dahil edilecek alanların listesi
  generatedFields:
    date:
      type: "date"
      options:
        format: "timestamp-seconds"

  # Burası moderasyon kısmı
  # "true" olarak ayarlanırsa, onayınız için bir çekme talebi oluşturulur.
  # "false" yorumlar otomatik olarak ana şubeye gönderilecek,onaylanmadan yayınlanacak(tavsiye etmiyorum).
  moderation: true

  # Akismet Kullanıyorsanız bu ayarları açabilirsiniz Ama reCaptcha daha etkili bir yöntem(Kişisel görüşüm).
  # akismet:
  #   enabled: true
  #   author: "name"
  #   authorEmail: "email"
  #   authorUrl: "url"
  #   content: "message"
  #   type: "comment"

  # Site Adı
  name: "Yücel Toluyağ"

  # Bildirim Sistemi. Eğer bırakılan yoruma cevap verildiğinde üye eposta almak istiyorsa bu kısmı aktif edebilirsiniz. E-mail marketin apiniz olsa iyi olur :)  Mailgun,Twilio,mailchimp vb servisleri kullanabilirsiniz.
  notifications:
    # Bildirimler Devre Dışı
    enabled: false

  # Burada gelen yorumları hangi dizinde saklayacağımızı belirtiyoruz.
  path: "_data/comments/{options.slug}"

  # Zorunlu alanlar, eğer formu dolduran kişi bu kısımları boş bırakmışşa bir hatayla karşılaşır.
  requiredFields: ["isim", "eposta", "mesaj"]

  # Burada kullanıcılarımızın eposta adreslerini dümdüz kaydetmek yerine şifreleyerek kaydediyoruz. Şifreleme formatı md5
  transforms:
    email: md5

  # reCaptcha Ayarları
  # Bu kısa keylerinizi dimdirek yazmayın,nasıl şifreleneceği konusunda blog yazımı okumaya devam edin.
  reCaptcha:
    enabled: false
    siteKey: "12321321"
    secret: "123213213213"
```

Bütün açıklamarı kodların üstünde yaptım.

## Staticman Form Elemanları

Size oturum form nedir,nasıl veri gönderilir oturup anlatacak olsam bu yazı çok daha uzun olacak 😔 O yüzden interneti bir pandikleyiverin 🤖 Verilerinizi gönderirken value kısımlarıda `fields` tagını kullanıyorsunuz. Staticman.yml dosyamızdaki alanımızla eşletirmek için örneğin

```html
<input
  class="textfield__input"
  name="fields[isim]"
  type="text"
  id="comment-form-name"
  placeholder="Adınız"
  required
/>
```

Diğer extrem alanlara ulaşmak içinse `options` tagını kullanıyoruz. Örneğin

```html
<input
  type="hidden"
  name="options[origin]"
  value="{{ page.url | absolute_url }}"
/>
```

Hatırlayın `origins` neydi ?🧐 Hangi alan adlarından sitemize istek atabileceğimiz kısımdı 😏

## Staticman Şifreleme

Statik sitelerde dosyalar açıkca görüldüğünden, her türlü hassas bilgiyi (anahtarlar ve parolalar gibi) şifreleme kullanarak korumak önemlidir.

Şöyle yapıyoruz ;

```html
https://{HEROKU_ADRESİNİZ}/v3/encrypt/şifrelenecekşey
```

Çıkan sonucu yapılandırma dosyanıza ekleyebilirsiniz. (Dilerseniz postman da kullabilirsiniz.)

Ardından sonucu yapılandırma dosyasına ekleyin. Örneğin ;

```config
    reCaptcha:
      secret: SofS3tlOOQ9k/4x4v/rA3vKjb8rfm9a2fTUdPHgbkCA9M3QDWf4Z452+OWJ5u1EWGY9BlLEk2suoRTv1usYUfPH8LP2VBnPD/r5pQtJwoR3brQtqO1/AVvG6VRISpGGiK6/dyPGY8RvxfQqV6n45b57SnnPVfQpRYFvH9j+jYE8=
```

## Staticman Postman

Postman üzerinden testler yapmak istiyorsanız. Resimde ki gibi ayarlamaları yapmanız gereklidir. Field ve options ayarlarını form elamanları kısmından biliyorsunuz :)

{% include info.html content=" `options[redirect]` kısmı işlem başarılıysa yönlendirilecek adres kısmı içindir" title="Bilgi" icon="tip" fai="icon-diamonds" %}

![staticman-kurulumu](/assets/images/staticman-postman.webp)

[Gönderdiğimiz Verinin Canlısı](https://github.com/yuceltoluyag/jekyll-staticman/pull/1){:target="\_blank"}{:rel="noopener noreferrer"}

## Staticman WYSIWYG

Formu oluşturduk ama hiç modern değil. Kullanıcılarımıza gidip

> "Markdown öğrenin kardeşim"

diyecek halimizde yok 🤭 İlk başlarda [Simple MDE Editor](https://github.com/sparksuite/simplemde-markdown-editor){:target="\_blank"}{:rel="noopener noreferrer"} u denedim. Repo yıllardır güncelleme almamış. Simple MDE den doğan [Easy Markdonw Editor](https://github.com/Ionaru/easy-markdown-editor){:target="\_blank"}{:rel="noopener noreferrer"} e baktım, geliştiriliyor ama çok ağır ilerliyor. Bende daha farklı birşey aramaya başladım. Sonunda [Tui Editor](https://github.com/nhn/tui.editor){:target="\_blank"}{:rel="noopener noreferrer"} u kullanmaya karar verdim. Kullanımı gayet basit,kullanışlı hemde modern daha ne olsun 🤗 Tui Editor ünde kendi içerisinde çözülmesi gereken bazı problemler var ama olsun. Onuda nasıl çözdüğümüde kodlarımın arasında göreceksiniz.😁

## Staticman Örnek Kodlar

Bu dosyaları inceleyin arkadaşlar,kafanızda ışıkların patlayacağından eminim 🎃

- [comments.html](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/_includes/comments.html){:target="\_blank"}
- [comment.html](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/_includes/comment.html){:target="\_blank"}
- [comment_form.html](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/_includes/comment_form.html){:target="\_blank"}
- [main.js](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/assets/js/main.js){:target="\_blank"}
- [\_comment.scss](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/css/main.scss#L305){:target="\_blank"}

* Canlı Test => [Yorum Yap](https://yuceltoluyag.github.io/jekyll-staticman/){:target="\_blank"}
* Kaynak Dosyaları => [Beleş İndir](https://github.com/yuceltoluyag/jekyll-staticman){:target="\_blank"}

# Sonuç

Disqus kullanmak zorunda değilsiniz artık :) Staticman reposunun elden geçirilmesi gerekli,eksik ve günümüze uyarlanması gereken bir çok şey var. Mesala e-posta şifrelerken md5 yerine başka bir şifreleme algoritması kullanılabilir. Yorum yaparken kütüphanenin kendi içerisinde önceden oluşturulmuş güvenlik önlemleri yok(XSS ve türevleri için). Burada kendiniz önlemler alıyorsunuz [Önlem Örneği](https://github.com/yuceltoluyag/jekyll-staticman/blob/main/_includes/comment.html#L40){:target="\_blank"} Yetersiz gelirse [Liquid Filters](https://jekyllrb.com/docs/liquid/filters/){:target="\_blank"} adresinden bazı filtreleme methodlarına bakabilirsiniz. (strip_html vb)
