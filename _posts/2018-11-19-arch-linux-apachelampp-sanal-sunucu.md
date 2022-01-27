---
layout: post
title: Arch Linux Apache(lampp) Sanal Sunucu Kurulumu
description: Arch Linux Apache(lampp) Sanal Sunucu Kurulumu
image: "/assets/images/baba.test.webp"
category: linux
tags: [linux, apache]
series: "archlampp"
comments: false
edit_url: true
toc: true
---

Merhaba, bloga uzun süre aradan sonra yazılar ateşlemişken, proje oluştururken sıkça kullandığım bir yöntemin **Türkçe Dökümantasyonu** olsun istedim. Bu yöntemin adı **Virtual Host** olarak bilinmektedir. Her projeye bir domainmiş gibi isim atayarak kodlama ve proje isimlerinin akılda kalması hususunda bana yardımcı oluyor. (Kodlama olarak şu şekilde projeye define bir url atarsınız css js vb gibi dosyaları entegre ederken rahatlık sağlar gibi gibi)

<!-- excerpt separator -->

{% include series.html %}

1.  [Arch Linux Xampp Lampp Kurulumu](https://yuceltoluyag.github.io/arch-linux-lampp-kurulumuphp7xmariadbmy/) yapılmalıdır

**baba test** adında domain oluşturdum.

# Domain Oluşturma

```shell
sudo mkdir /srv/http/baba.test

```

Bu domainin içerisine test olarak bir dosya atın örnek olarak :

## Dosya Oluşturma

```shell
sudo nano /srv/http/baba.test/index.html
```

içerisine şu kodları yapıştırın

## Dosya Düzenleme

```html
<html>
  <head>
    <title>baba.test</title>
  </head>
  <body>
    <h1>
      Youtube Kanalıma Abone Olmayı unutmayın : Virtual Host işlemi başarılı
    </h1>
  </body>
</html>
```

## Dosya Kaydetme

F3 ardından F2 basarak çıkıyoruz.

# HTTPD Konfigurasyonu

```shell
sudo nano /etc/httpd/conf/httpd.conf

```

## HTTPD Düzenleme

dosyasının en altına şu kodu yapıştırıyoruz.

```shell

# Virtual hostsInclude conf/extra/httpd-vhosts.conf

```

## Yeni Vhost Dosyası

F3 enter F2 yaptıktan sonra bu dosyayı oluşturuyoruz.

```shell
sudo nano /etc/httpd/conf/extra/httpd-vhosts.conf

```

## VHOST Düzenleme

bu dosyanın en altına yapıştırıyoruz.

```shell
ServerAdmin webmaster@baba.test
DocumentRoot "/srv/http/baba.test"
ServerName baba.test ServerAlias www.baba.test
ErrorLog "/var/log/httpd/baba.test-error_log"
CustomLog "/var/log/httpd/baba.test-access_log" common

```

standart kullanım bu şekilde ancak ben sadece documentroot ve servername kısmını kullanıyorum. İsterseniz kullanmak istemediklerinizin başına # işareti koyarsınız. Yada silebilirsiniz : )

# Apache Konfig Testi

```shell
apachectl configtest

```

komutunu çalıştırıp işlemleri test edebilirisniz. Ancak son bir işlem kaldı host dosyamıza bu urlmizi tanımlayacağız.

## Hosts Dosyası Düzenleme

```shell
sudo nano /etc/hosts

```

bu dosyanın en altına

## Domain Tanıtımı

```shell
127.0.0.1 baba.test

```

yazıp kaydediyorum, apache sunucumu yeniden başlatıyorum.

```shell
sudo systemctl restart httpd

```

## Sonuç ;)

![its work](/assets/images/baba.test.webp)
