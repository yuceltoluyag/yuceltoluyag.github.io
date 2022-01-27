---
layout: post
title: PDO Sum Fonksiyonu kullanımı(morris.js içerir)
description: PDO Sum Fonksiyonu kullanımı(morris.js içerir)
image: "/assets/images/php_morris.webp"
category: kutuphane
tags: [php, pdo]
comments: false
edit_url: true
---

Merhaba mysql (phpmyadmin) deki tablodaki satırları toplamak için keşfettiğim basit ve harika fonksiyonun kullanımı göreceğiz. Chart olarak en sevdiğim eklentilerden birisi olan [morris.js](http://morrisjs.github.io/morris.js/){:target="\_blank"}{:rel="noopener noreferrer"} PDO içerisinde kullanımınında görmüş olacağız.

<!-- excerpt separator -->

![php_morris_js](/assets/images/php_morris.webp)

resimde ki gibi ben burada **hesap_toplam** ve **hesap_odenen** hücrelerinin toplamını alıp **morris.js** deki grafiğe dönüştürmek istiyorum.

```php
Morris.Donut({ element: 'morris-donut-chart', data: [ $kac_tane = $db->query("SELECT sum(hesap_toplam) AS toplagel FROM  hesaplar")->fetch();  $kac_bane = $db->query("SELECT sum(hesap_odenen) AS bulgel FROM hesaplar")->fetch();  $toplam = $kac_tane[0];  $cik    = $kac_bane[0];  echo ' {label: "Toplam Borçlar",   value:'.$toplam.'},'; echo ' {label: "Toplam Ödemeler", value:'.$cik.'}'; ?> ]});

```

umarım anlaşılmıştır anlaşılmayan bir nokta olursa sorularınızı yorumlayabilirsiniz :)

![php_morrisjs_graphical](/assets/images/php_morris_grafik.webp)
