Title: Pelican ile Statik Yorum Sistemi: comment-worker Kurulumu
Date: 2025-04-12 15:30
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: pelican, staticman, comment-worker, cloudflare, github
Slug: pelican-ile-staticman-alternatifi-comment-worker-kurulumu
Authors: yuceltoluyag
Summary: Pelican tabanlı statik blogunuza yorum sistemi entegre etmek istiyorsanız, Staticman alternatifi olan comment-worker kurulumu ve Cloudflare Workers ile nasıl kullanılacağını adım adım anlatıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/comment-worker-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114987818064535152
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvsv5xredc2e

## Pelican ile Statik Yorum Sistemi: comment-worker Kurulumu ✨

Statik blog altyapısı kullanan geliştiriciler için dinamik yorum sistemleri her zaman bir sorun olmuştur. Bu yazıda, **Pelican** tabanlı bir bloga, **Staticman** alternatifi olarak geliştirilen **comment-worker** aracı ile nasıl yorum sistemi entegre edeceğinizi detaylı olarak anlatacağız. ✨

## comment-worker Nedir? 🧵

`comment-worker`, Cloudflare Workers üzerinde çalışan, kullanıcı yorumlarını GitHub ya da GitLab gibi platformlara JSON dosyası olarak pushlayan modern bir yorum altyapısı çözümüdür. Statik sitelere dinamik içerik eklemenin güvenli ve sürdürülebilir bir yoludur.

[responsive_img src="/images/comment-worker-kurulumu-xl.webp" alt="comment-worker-cloudflare-settings" /]

### Öne Çıkan Özellikleri

- ✨ **Staticman API uyumluluğu** sayesinde mevcut formlar kolayca uyarlanabilir.
- ⚡ **Cloudflare Workers** altyapısı ile hızlı ve global erişim.
- 📦 **GitHub/GitLab** entegrasyonu sayesinde yorumları versiyon kontrollü ve şeffaf bir şekilde saklama.
- 🔒 Yeni güvenlik geliştirmeleri ile güvenli veri alışverişi.
- 🧠 Modern mimarisi ile kolay konfigürasyon ve esneklik.

## Neden Staticman Yerine comment-worker? 🤔

- Staticman uzun süredir güncelleme almıyor (3+ yıl).
- Heroku'nun ücretsiz planı kaldırıldığı için hosting maliyetli hale geldi.
- comment-worker, ücretsiz platformlar olan Cloudflare Worker veya Google App Script ile kolayca dağıtılabilir.
- Kod yeniden yazıldı ve `staticman.yml` dosyası ile uyumlu hale getirildi.

### Yapılan Teknik Geliştirmeler 🛠️

- `application/json` ve `application/x-www-form-urlencoded` içerik türlerini destekleyen hem form hem API talepleri uyumlu hale getirildi.
- WebCrypto kullanılarak SHA1, SHA256, SHA384, SHA512 gibi algoritmalarla dönüşüm desteği eklendi.
- `allowedOrigins`, artık `staticman.yml` içinde değil, Worker ortam değişkeni olarak tanımlanıyor (CW_ALLOWED_ORIGINS).
- Daha sade bir endpoint yapısı: organizasyon, repo ve branch bilgisi artık URL'de yer almıyor.
- `pullRequestBody`, çok satırlı metinleri düzgün işler ve placeholder desteği içerir.
- Kimlikler artık `cuid2` ile oluşturuluyor.
- Giriş doğrulama ve veri dönüşümleri için Zod kullanılıyor.

!!! note "Eksik Özellikler ⚠️ Henüz mevcut olmayan özellikler: dokümantasyon, testler, JSON/frontmatter desteği, GitHub token auth, bildirim, anti-spam, auth, generatedFields ve OneDev/GitLab desteği. Yorumlara artık `date` alanı otomatik olarak ekleniyor."

## Kurulum Aşamaları 📆

### 1. Cloudflare Worker Oluşturulması

Cloudflare hesabınıza giriş yaparak yeni bir Worker oluşturun ve `comment-worker` kodlarını deploy edin:

👉 [Cloudflare'a Hemen Deploy Et](https://deploy.workers.cloudflare.com/?url=https://github.com/smooshy/comment-worker){: target="\_blank" rel="noopener noreferrer"}

!!! warning "Hata Durumunda ⚠️ Eğer hata alırsanız, oluşturulan reponuzdan src, package.json ve wrangler.toml dosyalarını ana projeden kopyalayarak tekrar deploy edebilirsiniz."

Lokalde test etmek için:

```bash
wrangler dev
```

Ayrıca kendi örnek projemi de inceleyebilirsiniz: [comment-worker örneği](https://github.com/yuceltoluyag/comment-worker){: target="\_blank" rel="noopener noreferrer"}

### 2. GitHub Uygulaması Kurulumu

- [GitHub Apps](https://github.com/settings/apps){: target="\_blank" rel="noopener noreferrer"} sayfasından yeni bir uygulama oluşturun
- Aşağıdaki izinleri tanımlayın:
  - **Contents**: read & write
  - **Pull requests**: read & write

[responsive_img src="/images/comment-worker-staticman-app-xl.webp" alt="GHA Permissions" /]

### 3. Ortam Değişkenlerini Ayarlama

Cloudflare Workers Settings kısmından aşağıdaki bilgileri ekleyin:

| key                      | örnek                                                    | açıklama                     |
| ------------------------ | -------------------------------------------------------- | ---------------------------- |
| GITHUB_APP_ID            | 123456                                                   | GitHub Uygulamasının Kimliği |
| GITHUB_APP_PRIVATE_KEY   | -----BEGIN PRIVATE KEY-----...                           | GitHub Özel Anahtarı         |
| GITHUB_ORGANIZATION_SLUG | github kullanıcı adı                                     | Kuruluş veya kullanıcı adı   |
| GITHUB_REPOSITORY_SLUG   | yuceltoluyag.github.io                                   | Yorumların pushlanacağı repo |
| GITHUB_REPOSITORY_BRANCH | main                                                     | Hedef dal (branch)           |
| CW_ALLOWED_ORIGINS       | https://example.com, https://www.example.com             | CORS whitelist               |
| CW_DEBUG                 | true / false                                             | Hata ayıklama modu           |
| TURNSTILE_SECRET_KEY     | https://developers.cloudflare.com/turnstile/get-started/ | Im Not Human : )             |

!!! note "Debug Modu CW_DEBUG başlangıçta true olarak ayarlanmalıdır. Böylece sorunları kolayca görebilirsiniz."

[responsive_img src="/images/comment-worker-staticman-xl.webp" alt="comment-worker-cloudflare-settings" /]

Build ayarlarında da aynı env değişkenlerini tanımlamayı unutmayın:

[responsive_img src="/images/comment-worker-staticman-pelican-xl.webp" alt="comment-worker-cloudflare-settings" /]

#### Özel Anahtarı PKCS8 Formatına Çevirme 🔐

```bash
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private-key.pem -out private-key-pkcs8.key
```

### 4. staticman.yml Dosyası Ekleme 📄

Depo kök dizinine aşağıdaki gibi bir `staticman.yml` dosyası ekleyin:

```yaml
comments:
  allowedFields: [name, email, message]
  branch: main
  filename: "comment-:year:month:day-:slug"
  format: "yaml"
  moderation: true
  path: "data/comments/{options.slug}"
```

### 5. Pelican Temanıza Yorum Formu Ekleyin ✏️

```html
<form
  submit="https://your-worker-subdomain.workers.dev/api/handle/form"
  method="POST"
>
  <div>
    <label for="fields[name]">Name</label>
    <input type="text" name="fields[name]" value="John Doe" required>
  </div>
  <div>
    <label for="fields[email]">Email</label>
    <input type="email" name="fields[email]" value="" required>
  </div>
  <div>
    <label for="options[url]">Website</label>
    <input type="url" name="options[url]" placeholder="https://example.com">
  <div>
    <label for="fields[message]">Message</label>
    <textarea name="fields[message]" required>Hello world!</textarea>
  </div>
  <div style="display: none">
    <label for="fields[slug]">Slug</label>
    <input type="text" name="fields[slug]" value="your/page/slug" readonly>
  </div>

  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

### 6. API İsteklerinde İçerik Türü Belirtme

API'ye veri gönderirken dikkat etmeniz gereken bir nokta var. Sistem iki farklı format kabul ediyor:

- **Form verisi formatı** (`application/x-www-form-urlencoded`)
- HTML formlarından alışık olduğunuz format
- Veriler `isim=değer&diğer=başkadeğer` şeklinde gönderilir
- Örnek: `kullaniciadi=ahmet&sifre=123456`
- **JSON formatı** (`application/json`)
- Veri nesne olarak gönderilir
- Örnek: `{"kullaniciadi": "ahmet", "sifre": "123456"}`

**Önemli**: Hangi formatı kullanırsanız kullanın, bunu isteğinizin `Content-Type` başlığında belirtmeniz gerekiyor. API, veri formatını otomatik tespit etmiyor. Kullandığınız formatı açıkça belirtmek zorundasınız.

### Örnek İstek

```json
POST /api/endpoint HTTP/1.1
Content-Type: application/json

{"kullaniciadi": "ahmet", "sifre": "123456"}
```

Ya da diğer formatla:

```json
POST /api/endpoint HTTP/1.1
Content-Type: application/x-www-form-urlencoded

kullaniciadi=ahmet&sifre=123456
```

İsteğinizi gönderirken bu kurala dikkat etmezseniz, API büyük ihtimalle hatalar verecektir.

```json
{
  "fields": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "message": "Hello world!",
    "slug": "your/page/slug"
  },
  "options": {
    "url": "https://example.com"
  }
}
```

## Sonuç 🌟

comment-worker ile Pelican blogunuza dinamik yorum sistemi entegre etmek artık hem kolay hem de modern bir çözüm sunuyor. Cloudflare Workers sayesinde dünya genelinde hızlı, ölçeklenebilir ve ücretsiz bir yapı elde edebilirsiniz.

Okuyucularınızdan gelen yorumlarla blogunuzu daha interaktif hale getirin ve topluluğunuzu büyütün! 🚀💬



