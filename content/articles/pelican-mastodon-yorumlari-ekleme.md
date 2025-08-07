Title: Pelican Bloguna Mastodon Yorumları Ekleme
Date: 2025-05-01 14:00
Modified: 2025-08-06 16:05
Category: Web Geliştirme
Tags: pelican, mastodon, yorumlar, webcomponent, blog
Slug: pelican-bloguna-mastodon-yorumlari-ekleme
Author: yuceltoluyag
Translation: false
Status: published
Summary: Pelican statik blog sistemine Mastodon yorumlarını nasıl ekleyeceğinizi adım adım öğrenin.
Image: images/pelican-bloguna-mastodon-yorumlari-ekleme-lg.webp
Template: article

Statik bloglar için yorum sistemi bulmak her zaman zor olmuştur. Disqus gibi üçüncü taraf hizmetler gizlilik endişeleri oluşturabilir, kendi kendine barındırılan çözümler ise bakımı zor olabilir. Neyse ki Fediverse ve özellikle Mastodon, bloglarımıza entegre edebileceğimiz harika bir yorum sistemi sunuyor.

Bu yazıda, Pelican tabanlı statik blog sitenize Mastodon yorumlarını nasıl ekleyeceğinizi adım adım anlatacağım.

## Mastodon Yorumları Nedir?

Mastodon, merkeziyetsiz bir sosyal ağdır ve her gönderi benzersiz bir URL'ye sahiptir. Bu URL'yi kullanarak, gönderiye yapılan yanıtları blogunuza entegre edebilirsiniz. Böylece okuyucularınız, Mastodon hesaplarını kullanarak yazılarınıza yorum yapabilirler.

Bu yöntemin avantajları:
- Üçüncü taraf tracker ve reklam içermez
- Kullanıcılar kendi Mastodon hesaplarıyla yorum yapabilir
- Merkezi olmayan bir yapı kullanır
- Kurulumu ve bakımı kolaydır

## Gereksinimler

- Pelican blog sistemi
- Mastodon hesabı
- Blog yazılarınızı paylaşabileceğiniz bir Mastodon gönderisi

## Kurulum Adımları

### 1. Mastodon Comments Webcomponent'i İndirme

İlk adım, Mastodon yorumları için gerekli JavaScript dosyasını indirmektir. Bu dosya, Daniel Pecos tarafından geliştirilen bir web bileşenidir.

```bash
curl -s https://raw.githubusercontent.com/dpecos/mastodon-comments/master/mastodon-comments.js -o themes/TEMA_ADINIZ/static/js/mastodon-comments.js
```

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

### 3. JavaScript Dosyasını Eklemek

Şimdi, şablonun script bölümüne JavaScript dosyasını ekleyelim:

```html
{% block scripts %}
<!-- Diğer scriptler... -->
<script src="{{ SITEURL }}/{{ THEME_STATIC_DIR }}/js/mastodon-comments.js" defer></script>
{% endblock %}
```

### 4. Mastodon-Comments.js Dosyasını Özelleştirme

Bazı durumlarda, orijinal mastodon-comments.js dosyasında sorunlar yaşayabilirsiniz. Aşağıdaki değişiklikleri yaparak, yorumların doğru görüntülenmesini sağlayabilirsiniz:

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
        // İlk seviye - filtreleme olmadan tüm yorumları göster
        var tootsToRender = toots;
        console.log(`MastodonComments: İlk seviye yorumlar - toplam: ${tootsToRender.length}`);
    } else {
        // Alt seviyeler - sadece belirli yoruma yanıt olanları göster
        var tootsToRender = toots.filter((toot) => toot.in_reply_to_id === in_reply_to);
        console.log(`MastodonComments: Alt seviye yorumlar - in_reply_to: ${in_reply_to}, bulunan: ${tootsToRender.length}`);
    }
    
    // Yorumları sırala (tarih sıralaması)
    tootsToRender = tootsToRender.sort((a, b) => a.created_at.localeCompare(b.created_at));
    
    // Her bir yorum için render işlemi yap
    tootsToRender.forEach((toot) => {
        // Bu yorum daha önce render edilmiş mi?
        if (toot._rendered) {
            console.log(`MastodonComments: Toot zaten render edilmiş, atlanıyor - id: ${toot.id}`);
            return;
        }
        
        // Bu yorumu render edildi olarak işaretle
        toot._rendered = true;
        
        this.render_toot(toots, toot, depth);
    });
}
```

#### b) Emoji Desteği Ekleme

`render_toot` fonksiyonuna emoji desteği ekleyin:

```javascript
render_toot(toots, toot, depth) {
    // İsim içindeki emojileri işle
    toot.account.display_name = this.escapeHtml(toot.account.display_name);
    toot.account.emojis.forEach((emoji) => {
        toot.account.display_name = toot.account.display_name.replace(
            `:${emoji.shortcode}:`,
            `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                emoji.shortcode
            }" height="20" width="20" />`
        );
    });
    
    // İçerik içindeki emojileri işle
    let processedContent = toot.content;
    if (toot.emojis && toot.emojis.length > 0) {
        toot.emojis.forEach((emoji) => {
            const emojiCode = `:${emoji.shortcode}:`;
            const emojiImg = `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                emoji.shortcode
            }" height="20" width="20" />`;
            
            // Emoji kodunu, emoji resmiyle değiştir (tüm eşleşmeleri bul)
            processedContent = processedContent.split(emojiCode).join(emojiImg);
        });
    }

    // Mastodon yorumunu oluştur
    const mastodonComment = `<div class="mastodon-comment" style="margin-left: calc(var(--comment-indent) * ${depth})">
        <!-- Yorum içeriği -->
        <div class="author">
            <!-- Yazar bilgileri -->
        </div>
        <div class="content">${processedContent}</div>
        <!-- Diğer içerikler -->
    </div>`;
    
    // ...devamı...
}
```

### 5. Mastodon Gönderisi Oluşturma

Yorumların görüntülenebilmesi için, her blog yazınız için bir Mastodon gönderisi oluşturmanız gerekiyor. Bu gönderiyi şu şekilde oluşturabilirsiniz:

1. Mastodon hesabınıza giriş yapın
2. Yeni bir gönderi oluşturun
3. Blog yazınızın başlığını ve URL'sini paylaşın
4. Gönderiyi yayınlayın
5. Gönderi URL'sinden `tootId` parametresini alın (örn: `https://mastodon.social/@kullanici/123456789012345678` -> tootId: `123456789012345678`)

### 6. Her Yazı İçin Mastodon Yorumlarını Yapılandırma

Her yazı için farklı bir Mastodon gönderisi kullanacaksanız, tootId'yi yazı meta verilerinde tanımlayabilirsiniz:

```markdown
Title: Yazı Başlığı
Date: 2025-05-01
Category: Kategori
Tags: etiket1, etiket2
Mastodon_TootId: 123456789012345678
```

Sonra, şablonunuzda bunu şu şekilde kullanabilirsiniz:

```html
<mastodon-comments
    host="mastodon.social"
    user="kullanici_adi"
    tootId="{{ article.mastodon_tootid|default('DEFAULT_TOOT_ID') }}"
    style="width: 100%; max-width: 800px; margin: 0 auto;"></mastodon-comments>
```

## Sorun Giderme

### Yorumlar Görünmüyor

Yorumların görünmemesinin birkaç nedeni olabilir:

1. **DOMPurify Sorunu**: DOMPurify kütüphanesinin doğru yüklendiğinden emin olun. Tarayıcı konsolunda hata mesajlarını kontrol edin.

2. **Mastodon API Kısıtlamaları**: Bazı durumlarda, Mastodon API'si "private" veya "unlisted" görünürlüğüne sahip yanıtları göstermeyebilir. 

3. **CORS Sorunları**: Tarayıcınızın geliştirici araçlarında CORS hatası olup olmadığını kontrol edin.

4. **JavaScript Hataları**: Console'da JavaScript hatalarını kontrol edin ve gerektiğinde debug bilgileri ekleyin.

### Stack Overflow Hatası

Sonsuz bir döngü oluşuyorsa, `render_toots` ve `render_toot` fonksiyonları arasında döngüsel bir çağrı olabilir. Bu durumu önlemek için her toot'u yalnızca bir kez render etmek için `_rendered` bayrağı kullanılır.

## Sonuç

Mastodon yorumları, statik bloglar için mükemmel bir yorum sistemi sağlar. Merkezi olmayan yapısı, kullanım kolaylığı ve gizliliğe saygısı ile hem blog sahipleri hem de okuyucular için harika bir deneyim sunar.

Bu entegrasyonu kullanarak, okuyucularınıza Mastodon üzerinden yorumlarını paylaşma imkanı sunabilir ve blog içeriğinizi Fediverse'e bağlayabilirsiniz.

Herhangi bir sorunla karşılaşırsanız, aşağıdaki kaynaklara göz atabilirsiniz:

- [GitHub - dpecos/mastodon-comments](https://github.com/dpecos/mastodon-comments){: target="_blank" rel="noopener noreferrer"}
- [Daniel Pecos Martinez'in blog yazısı](https://danielpecos.com/2022/12/25/mastodon-as-comment-system-for-your-static-blog/){: target="_blank" rel="noopener noreferrer"}
- Javascriptin değiştirilmiş versiyonuna buradan ulaşabilirsiniz [mastodon-comments.js](/files/mastodon-comments.js) 


[responsive_img src="/images/pelican-bloguna-mastodon-yorumlari-ekleme-lg.webp" alt="pelican-bloguna-mastodon-yorumlari-ekleme" /]