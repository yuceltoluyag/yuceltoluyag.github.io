Title: PDO Sum Fonksiyonu Kullanımı (morris.js İçerir)
Date: 2018-12-07 14:00 10:00
Modified: 2025-08-11 22:59
Category: PHP
Tags: php, pdo
Slug: pdo-sum-fonksiyonu-kullanimi-morris-js
Authors: yuceltoluyag
Summary: PDO kullanarak MySQL veritabanındaki verileri toplama işlemi ve bu verileri morris.js ile grafik halinde görselleştirme.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/php_morris-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114983987991038402
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvr6ofrqf22y

Merhaba! MySQL (phpMyAdmin) üzerinde bir tablodaki belirli sütunların toplamını almak için keşfettiğim basit ve etkili bir fonksiyonun kullanımını ele alacağız. Ayrıca, en sevdiğim grafik kütüphanelerinden biri olan [morris.js](http://morrisjs.github.io/morris.js/){: target="\_blank" rel="noopener noreferrer"} ile bu verileri görselleştireceğiz. 🎨📊

## Veri Toplama

Aşağıdaki kod, **hesap_toplam** ve **hesap_odenen** sütunlarının toplamını alarak bir grafik oluşturacaktır.

### Örnek Görselleştirme

[responsive_img src="/images/php_morris-xl.webp" alt="PDO ve Morris.js ile Grafik" /]

## Kod

```php
Morris.Donut({
    element: 'morris-donut-chart',
    data: [
        <?php
        $kac_tane = $db->query("SELECT SUM(hesap_toplam) AS toplagel FROM hesaplar")->fetch();
        $kac_bane = $db->query("SELECT SUM(hesap_odenen) AS bulgel FROM hesaplar")->fetch();

        $toplam = $kac_tane['toplagel'];
        $cik    = $kac_bane['bulgel'];

        echo '{label: "Toplam Borçlar", value: '.$toplam.'},';
        echo '{label: "Toplam Ödemeler", value: '.$cik.'}';
        ?>
    ]
});
```

## Açıklamalar

- **SUM()** fonksiyonu, belirli bir sütundaki tüm değerleri toplar.
- **fetch()** metodu, sorgunun sonucunu alır ve değişkenlere atar.
- **Morris.js Donut** grafiği, alınan verileri grafik olarak görselleştirmek için kullanılır.

### Sonuç

Kodun çalıştırılmasıyla birlikte aşağıdaki gibi bir grafik elde edeceksiniz:

[responsive_img src="/images/php_morris_grafik-xl.webp" alt="Morris.js Grafik Örneği" /]

Eğer herhangi bir sorunuz olursa yorum bırakabilirsiniz! 💬😊



