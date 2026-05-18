Title: Pelican Bloguna Mastodon Yorumları Ekleme
Date: 2025-05-01 14:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: pelican, mastodon, yorumlar, webcomponent, blog
Slug: pelican-bloguna-mastodon-yorumlari-ekleme
Author: yuceltoluyag
Lang: tr
Status: published
Summary: Pelican statik blog sistemine Mastodon yorumlarını nasıl ekleyeceğinizi adım adım öğrenin.
Image: images/pelican-bloguna-mastodon-yorumlari-ekleme-xl.webp
Template: article
toot: https://mastodon.social/@yuceltoluyag/114987917469252302
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvswl6omxc24

Selamlar yoldaşlar, özgür web'in ve Fediverse'ün yılmaz savunucuları! 🚀

Statik bir blog (özellikle Pelican) kullanmanın en güzel yanı, sitenin jet gibi hızlı açılması ve arkada veritabanı belasıyla uğraşmamaktır. Ancak iş okuyucularla etkileşime gelip bir yorum sistemi kurmaya dayandığında, o meşhur statik duvarına toslarız. Yıllarca bu iş için Disqus gibi hazır araçlar kullanıldı. Ama Disqus demek; sitenize giren her okuyucuyu adım adım izleyen, reklam fırlatan sinsi bir tracker ordusunu sitenize buyur etmek demektir. Benim gibi gizlilik paronoyağı ve özgür yazılım aşığı bir adama bunu kabul ettiremezsiniz! 

Kendi sunucumuzda barındırdığımız yorum sistemleri (Commento, Schnack vb.) ise arkada sürekli bakım ve güncelleme ister. 

Neyse ki Fediverse imdadımıza yetişti! Mastodon, merkeziyetsiz yapısıyla bloglarımıza entegre edebileceğimiz harika bir yorum altyapısı sunuyor. Bu yazıda, Pelican tabanlı statik blog sitenize Mastodon yorumlarını bizzat kendi siteme kurup günlerce hata ayıkladığım o meşhur maceralı yöntemle nasıl ekleyeceğinizi adım adım anlatıyorum. 

Çayınızı koyun, terminalinizi açın; blogumuzu Fediverse yollarına bağlayalım! 🖥️

---

## 🧠 Mastodon Yorumları Nasıl Çalışır?

Mastodon'da paylaştığınız her gönderinin benzersiz bir kimliği (toot ID) vardır. Bizim yapacağımız iş ise çok basit: Blog yazımızı Mastodon'da paylaşıyoruz, ardından o paylaşımın altına gelen yanıtları cımbızla çekip blog yazımızın altına sanki klasik bir yorum alanındaymış gibi şık bir tasarımla diziyoruz.

### Bu Yöntemin Güzellikleri:

*   **Sıfır Reklam, Sıfır İzleyici:** Okuyucularınızın verileri üçüncü parti şirketlere satılmaz.
*   **Doğal Spam Koruması:** Mastodon'un kendi spam filtreleri sayesinde bot yorumlarından kurtulursunuz.
*   **Fediverse Etkileşimi:** Yazılarınıza yapılan her yorum aynı zamanda Mastodon üzerinde yayılır, sitenizin etkileşimi tavan yapar!

---

## 🛠️ Kurulum Adımları

Adım adım gidelim hacı, aceleye gerek yok. Sistemi çökertmeden yavaş yavaş inşa edelim.

### 1. Mastodon Comments Webcomponent'i İndirme

İlk adım, Mastodon yorumları için gerekli JavaScript dosyasını indirmektir. Bu dosya, Daniel Pecos tarafından geliştirilen bir web bileşenidir.

```bash
curl -s https://raw.githubusercontent.com/dpecos/mastodon-comments/master/mastodon-comments.js -o themes/TEMA_ADINIZ/static/js/mastodon-comments.js
```

---

### 2. HTML Şablonunu Düzenleme

Şimdi, `article.html` şablonunu düzenleyerek Mastodon yorumlarını gösterecek bölümü ekleyelim. Webmentions bölümünden sonra aşağıdaki kodu ekleyin:

```html
<!-- Mastodon Comments -->
<div class="mastodon-comments-container">
    <h2 class="mastodon-comments-title">Mastodon Yorumları</h2>
    <p>Bu yazıyı Mastodon üzerinden tartışmak için <a href="https://MASTODON_SUNUCU/@KULLANICI_ADI/GONDERI_ID" target="_blank">Mastodon gönderisine</a> yanıt verebilirsiniz.</p>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <mastodon-comments
        host="MASTODON_SUNUCU"
        user="KULLANICI_ADI"
        tootId="GONDERI_ID"
        style="width: 100%; max-width: 800px; margin: 0 auto;"></mastodon-comments>
    <style>
        .mastodon-comments-title {
            margin-top: 2rem;
            margin-bottom: 1rem;
            font-size: 1.8rem;
            border-bottom: 2px solid #eee;
            padding-bottom: 0.5rem;
        }
        .mastodon-comments-container p {
            margin-bottom: 1.5rem;
            color: #666;
        }
        .mastodon-comments-container p a {
            color: #3182ce;
            text-decoration: none;
        }
        .mastodon-comments-container p a:hover {
            text-decoration: underline;
        }
        #mastodon-comments-list {
            margin-top: 1.5rem;
        }
        .mastodon-comment {
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem !important;
            transition: transform 0.2s;
        }
        .mastodon-comment:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
    </style>
</div>
```

---

### 3. JavaScript Dosyasını Eklemek

Şimdi, şablonun script bölümüne JavaScript dosyasını ekleyelim:

```html
{% block scripts %}
<!-- Diğer scriptler... -->
<script src="{{ SITEURL }}/{{ THEME_STATIC_DIR }}/js/mastodon-comments.js" defer></script>
{% endblock %}
```

---

### 4. Mastodon-Comments.js Dosyasını Özelleştirme

Orijinal script dosyasında bazı sinir bozucu hatalar ve eksikler vardı. Ben bizzat gecelerce uğraşarak bunları çözdüm ve stabil hale getirdim. İndirdiğiniz `mastodon-comments.js` dosyasını açıp şu güncellemeleri yapın yoldaşlar:

#### a) Yorumları Filtreleme Sorununu Çözme

`render_toots` fonksiyonunu şu şekilde değiştirin:

```javascript
render_toots(toots, in_reply_to, depth) {
    console.log(`MastodonComments: render_toots başladı - in_reply_to: ${in_reply_to}, depth: ${depth}`);

    // Derinlik kontrolü ekleyelim, çok derin recursion'ları önleyelim
    if (depth > 10) {
        console.log(`MastodonComments: Maksimum derinliğe ulaşıldı (${depth}), render işlemi durduruldu`);
        return;
    }

    // Sadece kök yorumları göster, diğerlerini rekürsif olarak işle
    if (depth === 0) {
        var tootsToRender = toots;
        console.log(`MastodonComments: İlk seviye yorumlar - toplam: ${tootsToRender.length}`);
    } else {
        var tootsToRender = toots.filter((toot) => toot.in_reply_to_id === in_reply_to);
        console.log(`MastodonComments: Alt seviye yorumlar - in_reply_to: ${in_reply_to}, bulunan: ${tootsToRender.length}`);
    }

    // Yorumları sırala (tarih sıralaması)
    tootsToRender = tootsToRender.sort((a, b) => a.created_at.localeCompare(b.created_at));

    // Her bir yorum için render işlemi yap
    tootsToRender.forEach((toot) => {
        if (toot._rendered) {
            console.log(`MastodonComments: Toot zaten render edilmiş, atlanıyor - id: ${toot.id}`);
            return;
        }

        toot._rendered = true;

        this.render_toot(toots, toot, depth);
    });
}
```

#### b) Emoji Desteği Ekleme

`render_toot` fonksiyonuna emoji desteği ekleyin:

```javascript
render_toot(toots, toot, depth) {
    toot.account.display_name = this.escapeHtml(toot.account.display_name);
    toot.account.emojis.forEach((emoji) => {
        toot.account.display_name = toot.account.display_name.replace(
            `:${emoji.shortcode}:`,
            `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                emoji.shortcode
            }" height="20" width="20" />`
        );
    });

    let processedContent = toot.content;
    if (toot.emojis && toot.emojis.length > 0) {
        toot.emojis.forEach((emoji) => {
            const emojiCode = `:${emoji.shortcode}:`;
            const emojiImg = `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                emoji.shortcode
            }" height="20" width="20" />`;

            processedContent = processedContent.split(emojiCode).join(emojiImg);
        });
    }

    const mastodonComment = `<div class="mastodon-comment" style="margin-left: calc(var(--comment-indent) * ${depth})">
        <!-- Yorum içeriği -->
        <div class="author">
            <!-- Yazar bilgileri -->
        </div>
        <div class="content">${processedContent}</div>
    </div>`;
}
```

---

### 5. Mastodon Gönderisi Oluşturma

Yorumların görüntülenebilmesi için, her blog yazınız için bir Mastodon gönderisi oluşturmanız gerekiyor. Bu gönderiyi şu şekilde oluşturabilirsiniz:

1. Mastodon hesabınıza giriş yapın
2. Yeni bir gönderi oluşturun
3. Blog yazınızın başlığını ve URL'sini paylaşın
4. Gönderiyi yayınlayın
5. Gönderi URL'sinden `tootId` parametresini alın (örn: `https://mastodon.social/@kullanici/123456789012345678` -> tootId: `123456789012345678`)

---

### 6. Her Yazı İçin Mastodon Yorumlarını Yapılandırma

Her yazı için farklı bir Mastodon gönderisi kullanacaksanız, tootId'yi yazı meta verilerinde tanımlayabilirsiniz:

```markdown
Title: Harika Bir Arch Linux Yazısı
Date: 2025-05-01
Category: Linux
Tags: arch, linux, terminal
Mastodon_TootId: 114987917469252302
```

Şablonunuzda (`article.html`) ise bu değeri dynamic olarak çağırıyoruz:

```html
<mastodon-comments
    host="mastodon.social"
    user="yuceltoluyag"
    tootId="{{ article.mastodon_tootid|default('DEFAULT_TOOT_ID') }}"
    style="width: 100%; max-width: 800px; margin: 0 auto;"></mastodon-comments>
```

---

## 🛠️ Sorun Giderme Paronoyası

Yorumlar görünmüyorsa sakin olun yoldaşlar:

1. **DOMPurify Eksikliği**: DOMPurify kütüphanesinin doğru yüklendiğinden emin olun. Tarayıcı konsolunda hata mesajlarını kontrol edin.
2. **Mastodon API Kısıtlamaları**: Bazı durumlarda, Mastodon API'si "private" veya "unlisted" görünürlüğüne sahip yanıtları göstermeyebilir.
3. **CORS Sorunları**: Tarayıcınızın geliştirici araçlarında CORS hatası olup olmadığını kontrol edin.
4. **JavaScript Hataları**: Console'da JavaScript hatalarını kontrol edin ve gerektiğinde debug bilgileri ekleyin.

---

## 🎯 Sonuç ve O Meşhur Hata

Fediverse yorumları statik sitelerin geleceğidir hacı! Hem özgür hem reklamsız hem de tamamen kontrol senin elinde. 

!!! warning "Benim O Meşhur Sakarlığım 🤣"
    Bu entegrasyonu kodlarken, git deposuna yanlışlıkla boş bir commit gönderip bazı makale dosyalarımı silmiştim! Neyse ki Git'in gücüyle hepsini kurtardım. Merak edenler ve benim bu tatlı hatamdan ders çıkarmak isteyenler [Silinen Dosyaları Kurtardığım Commit Detayı](https://github.com/yuceltoluyag/yuceltoluyag.github.io/commit/000d8f82224ee41cb8376a32cffb1c226a93b4a7#diff-ed9fd3788490d83eb73b87a062eaa272fed26103d850ad1828440137e3267540){: target="_blank" rel="noopener noreferrer"} linkinden yaptığım o çılgınlığı inceleyebilir. Ayrıca yazdığım Javascript dosyasının tam modifiye haline de [mastodon-comments.js](/files/mastodon-comments.js) dosyasından ulaşabilirsiniz.

Kafanıza takılan bir yer olursa Mastodon üzerinden bana yazın yoldaşlar, sistemi beraber ayağa kaldırırız! 😉

[responsive_img src="/images/pelican-bloguna-mastodon-yorumlari-ekleme-xl.webp" alt="pelican-bloguna-mastodon-yorumlari-ekleme" /]
