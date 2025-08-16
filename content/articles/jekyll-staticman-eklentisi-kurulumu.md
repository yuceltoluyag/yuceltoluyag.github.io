Title: Jekyll Staticman Eklentisi Kurulumu
Date: 2022-01-29 00:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: staticman, jekyll
Slug: jekyll-staticman-eklentisi-kurulumu
Authors: yuceltoluyag
Summary: Jekyll blog sitesinde yorumlar için Staticman eklentisini kurma sürecini anlatan detaylı bir rehber.
Translation: false
Status: published
Template: article
Image: images/staticman-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114985225233044622

**Merhaba** 😄

Blogumda daha önce **Disqus** yorum eklentisini kullanıyordum. Fakat uzun zamandır görmek istediğim ancak bir türlü deneme fırsatım olmayan **Staticman** ile tanışmış oldum. Bu yazımda, Staticman kurulumu ve kullanımı hakkında sizlere detaylı bilgi vereceğim. Kurulum süreci biraz zorlu olsa da, adım adım anlatacağım ve bu süreçten fayda sağlayacağınızı umuyorum. 😌

# Staticman Nedir?

**Staticman**, tamamen sizin kontrolünüzde olan ve **statik** siteler için geliştirilmiş harika bir kütüphanedir. **Yorum alanı**, **ziyaretçi defteri** ya da **iletişim formu** gibi çeşitli işlevlerde kullanılabilir. 🐒 Ancak, repodaki belgeler eski sürümlere göre güncellenmediği için, o belgelere bakarak işlem yaparsanız zorluk yaşayabilirsiniz. Merak etmeyin, ben burada sizlerin duvara çarpmasını engellemek için varım! 🥰

## Gerekli Malzemeler 🥗

İlk başta bize şu araçlar gerekecek:

- Heroku Üyeliği
- Github Uygulaması Oluşturma
- Github Token'ları
- İkinci Bir Github Hesabı

## İlk Adım: Farklı Bir Github Hesabı Oluşturun

Yeni bir Github hesabı oluşturun. Bu hesabı, örneğin `benimşekillinickim-bot` gibi bir isimle oluşturabilirsiniz. [Babanın Botu](https://github.com/babayorum-bot){: target="_blank" rel="noopener noreferrer"}

## Heroku Üzerinde Deploy

1. [Heroku](https://herokuapp.com/){: target="_blank" rel="noopener noreferrer"} sitesine gidip bir üyelik oluşturun.
2. Ardından, [Staticman Repo](https://github.com/eduardoboucas/staticman/tree/dev){: target="_blank" rel="noopener noreferrer"}'ya gidin ve burada **dev** branch'ini seçin. Çünkü ana dalda bazı güncellemeler henüz merge edilmemiş durumda. Bu kısımda alt kısımda bulunan **Deploy Heroku** butonuna tıklayın.


[responsive_img src="/images/staticman8-xl.webp" alt="heroku-kurulumu]" /]

3. İlgili ayarları yaparak uygulamanızı deploy edin.


[responsive_img src="/images/staticman9-xl.webp" alt="heroku-kurulumu]" /]

Şimdilik işlem bu kadar, ilerleyen adımlarda ayarları detaylıca düzenleyeceğiz.

# Github Uygulamaları

1. İlk önce [Github Apps](https://github.com/settings/apps){: target="_blank" rel="noopener noreferrer"}'dan bir uygulama oluşturun. Uygulama ismini, açıklamasını ve Heroku adresinizi kendinize göre düzenlemeyi unutmayın.

[responsive_img src="/images/staticman-xl.webp" alt="heroku-kurulumu]" /]
[responsive_img src="/images/staticman2-xl.webp" alt="heroku-kurulumu]" /]

## Private Keys (Özel Anahtarlar)

Private keys kısmından **Generate a private key** butonuna tıklayın ve oluşan dosyayı kaydedin. Bu dosyadaki bilgileri Heroku ortam değişkenlerinde kullanacağız.

[responsive_img src="/images/staticman11-xl.webp" alt="heroku-kurulumu]" /]

## Github Token'ları

1. [Github Tokens](https://github.com/settings/tokens/){: target="_blank" rel="noopener noreferrer"} sayfasına giderek yeni bir token oluşturun. Token'ınıza şu yetkileri verin:


[responsive_img src="/images/staticman3-xl.webp" alt="staticman-kurulumu]" /]
[responsive_img src="/images/staticman4-xl.webp" alt="staticman-kurulumu]" /]

Oluşturduktan sonra size bir kod verilecektir. Bu kodu kaydedin çünkü ilerleyen aşamalarda kullanacağız. Daha sonra oluşturduğunuz uygulamaya tıklayın ve **Install App** kısmından **Install**'a basın.

[responsive_img src="/images/staticman5-xl.webp" alt="staticman-kurulumu]" /]

Bu adımda, token'ı tüm repolarınızda mı yoksa sadece belirli bir repoda mı kullanmak istediğinizi seçebilirsiniz. Ben sadece tek bir repoda kullanmayı tercih ediyorum.

[responsive_img src="/images/staticman6-xl.webp" alt="staticman-kurulumu]" /]

Sonrasında **Install** butonuna tıklayın.

## Github Bot

Yeni oluşturduğumuz Github hesabını, repomuza davet edeceğiz. Repomuza gidin, **Settings** sekmesine tıklayın. Ardından **Collaborators** kısmından **add people** diyerek oluşturduğunuz bot hesabını ekleyin. Diğer hesabınızla giriş yaparak daveti kabul edin.

[responsive_img src="/images/staticman7-xl.webp" alt="staticman-kurulumu]" /]

Github ayarlarımız burada tamamlandı! 🤯

# Heroku Ayarları

Heroku paneline gidin ve oluşturduğunuz uygulamaya tıklayın. **Settings** kısmından **Config Vars** bölümüne gelin ve **Reveal Config Vars**'ı tıklayın.

## Ortam Değişkenleri

Burada şu değişkenleri oluşturmalısınız:

- GITHUB_APP_ID
- GITHUB_PRIVATE_KEY
- GITHUB_TOKEN
- RSA_PRIVATE_KEY

Bu değerleri, daha önce oluşturduğumuz token ve private key'lerle doldurun.

## RSA Key Oluşturma

```bash
ssh-keygen -m PEM -t rsa -b 4096 -C "burayabiseyyazin" -f ~/.ssh/staticman_key
```

Daha sonra oluşturduğunuz anahtarı görmek için:

```bash
head -2 ~/.ssh/staticman_key
```

Çıktı şu şekilde olmalıdır:

```bash
-----BEGIN RSA PRIVATE KEY-----
MIDIGOMEDAGLARIBLA12930219312
```

Alternatif olarak **openssl** kullanarak da RSA key oluşturabilirsiniz:

```bash
openssl genrsa -out key.pem
```

Eğer terminal kullanamıyorsanız, çevrimiçi RSA anahtar üreticilerini kullanabilirsiniz. [Online RSA Key Generator](https://travistidwell.com/jsencrypt/demo/){: target="_blank" rel="noopener noreferrer"} sitesini ziyaret ederek anahtarınızı oluşturabilirsiniz.

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">RSA Key Hakkında</div>
        <p>Github'dan aldığımız <code>GITHUB_PRIVATE_KEY</code> ile <code>RSA Key</code>'imiz aynı olabilir. Bu yüzden RSA Key oluşturma adımını atlayabilirsiniz.</p>
    </div>
</div>


# Staticman Ayarları

Staticman ayarları YAML formatında saklanır. `staticman.yml` dosyasının içeriği şu şekilde olmalıdır:

```yaml
comments:
  allowedFields: ["isim", "eposta", "website", "mesaj", "yanit_id"]
  allowedOrigins: ["localhost", "www.yuceltoluyag.github.io"]
  branch: "master"
  commitMessage: "Comment from {fields.name} on {options.slug}"
  filename: "entry-{@timestamp}"
  format: "yaml"
  generatedFields:
    date:
      type: "date"
      options:
        format: "timestamp-seconds"
  moderation: true
  name: "Yücel Toluyağ"
  notifications:
    enabled: false
  path: "_data/comments/{options.slug}"
  requiredFields: ["isim", "eposta", "mesaj"]
  transforms:
    email: md5
  reCaptcha:
    enabled: false
    siteKey: "12321321"
    secret: "123213213213"
```

## Staticman Form Elemanları

Form verilerinizi göndermek için **value** kısımlarında `fields` etiketini kullanabilirsiniz. Örnek bir form elemanı şu şekilde olur:

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

## Staticman Şifreleme

Statik sitelerde güvenliği sağlamak için şifreleme kullanmak oldukça önemlidir. Şifreleme için şu şekilde bir yapı kullanabilirsiniz:

```html
https://{HEROKU_ADRESİNİZ}/v3/encrypt/şifrelenecekşey
```

## Staticman Postman Testleri

Postman üzerinden testler yapmak için doğru ayarları yapmanız gerekecek. Form elemanları kısmındaki `field` ve `options` ayarlarını doğru şekilde yapılandırmalısınız.


[responsive_img src="/images/staticman-postman-xl.webp" alt="staticman-kurulumu]" /]

[Canlı Test](https://github.com/Baba-Project/jekyll-staticman/pull/1){: target="_blank" rel="noopener noreferrer"}


## Staticman Örnek Kodlar

Bu dosyaları inceleyin arkadaşlar, kafanızda ışıkların patlayacağından eminim 🎃

- [comments.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comments.html){: target="_blank" rel="noopener noreferrer"}
- [comment.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comment.html){: target="_blank" rel="noopener noreferrer"}
- [comment_form.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comment_form.html){: target="_blank" rel="noopener noreferrer"}
- [main.js](https://github.com/Baba-Project/jekyll-staticman/blob/main/assets/js/main.js){: target="_blank" rel="noopener noreferrer"}
- [\_comment.scss](https://github.com/Baba-Project/jekyll-staticman/blob/main/css/main.scss#L305){: target="_blank" rel="noopener noreferrer"}

* Canlı Test => [Yorum Yap](https://baba-project.github.io/jekyll-staticman/){: target="_blank" rel="noopener noreferrer"}
* Kaynak Dosyaları => [Beleş İndir](https://github.com/Baba-Project/jekyll-staticman){: target="_blank" rel="noopener noreferrer"}


# Sonuç

Artık Disqus kullanmak zorunda değilsiniz! Staticman, eksiklikleri olsa da oldukça kullanışlı ve özelleştirilebilir bir sistem. Geliştirilmesi gereken alanlar olsa da, şimdilik statik sitelerinizde yorumları rahatça yönetebilirsiniz. ✨

[Kaynak Dosyalar](https://github.com/yuceltoluyag/jekyll-staticman){: target="_blank" rel="noopener noreferrer"}
