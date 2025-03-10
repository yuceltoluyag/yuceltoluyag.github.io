Title: PDO Sum Fonksiyonu Kullanımı (morris.js İçerir)
Date: 2018-12-07 14:00 10:00
Modified: 2025-03-08 12:00
Category: kutuphane
Tags: php, pdo
Slug: pdo-sum-fonksiyonu-kullanimi-morris-js
Authors: yuceltoluyag
Summary: PDO kullanarak MySQL veritabanındaki verileri toplama işlemi ve bu verileri morris.js ile grafik halinde görselleştirme.
Translation: false
Status: published
Template: article
Image: images/php_morris.png


Merhaba! MySQL (phpMyAdmin) üzerinde bir tablodaki belirli sütunların toplamını almak için keşfettiğim basit ve etkili bir fonksiyonun kullanımını ele alacağız. Ayrıca, en sevdiğim grafik kütüphanelerinden biri olan [morris.js](http://morrisjs.github.io/morris.js/) ile bu verileri görselleştireceğiz. 🎨📊

## Veri Toplama

Aşağıdaki kod, **hesap_toplam** ve **hesap_odenen** sütunlarının toplamını alarak bir grafik oluşturacaktır.

### Örnek Görselleştirme

![PDO ve Morris.js ile Grafik](/images/php_morris.png)

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

![Morris.js Grafik Örneği](/images/php_morris_grafik.png)

Eğer herhangi bir sorunuz olursa yorum bırakabilirsiniz! 💬😊

