Title: Arch Linux Apache (LAMPP) Sanal Sunucu Kurulumu
Date: 2018-11-18 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: linux, apache
Series: ArchLampp
Series_index: 2
Slug: arch-linux-apache-lampp-sanal-sunucu-kurulumu
Authors: yuceltoluyag
Summary: Bu yazıda, Arch Linux üzerinde Apache (LAMPP) sanal sunucu kurulumu adımlarını öğreneceksiniz.
Translation: false
Status: published
Template: article
Image: images/babatest-xl.webp

Merhaba! Bloguma uzun bir aradan sonra yazı yazarken, proje oluştururken sıkça kullandığım bir yöntemin **Türkçe Dökümantasyonu**nu yazmak istedim. Bu yöntemin adı **Virtual Host** olarak bilinir. Her projeye bir domain atayarak, kodlama ve proje isimlerinin akılda kalmasını sağlar. Bu yöntem, CSS, JS gibi dosyaların entegrasyonu sırasında rahatlık da sağlar.

1. [Arch Linux XAMPP/LAMPP Kurulumu](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin){: target="_blank" rel="noopener noreferrer"} yapılmalıdır.

**baba.test** adında bir domain oluşturacağız.

# Domain Oluşturma

Domaini oluşturmak için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo mkdir /srv/http/baba.test
```

Bu domainin içerisine bir test dosyası atın. Örneğin:

## Dosya Oluşturma

```bash
sudo nano /srv/http/baba.test/index.html
```

İçerisine şu kodları yapıştırın:

## Dosya Düzenleme

```html
<html>
  <head>
    <title>baba.test</title>
  </head>
  <body>
    <h1>
      Youtube Kanalıma Abone Olmayı Unutmayın: Virtual Host İşlemi Başarılı
    </h1>
  </body>
</html>
```

## Dosya Kaydetme

F3 ardından F2'ye basarak kaydedip çıkıyoruz.

# HTTPD Konfigurasyonu

HTTPD yapılandırmasını düzenlemek için şu komutu kullanın:

```bash
sudo nano /etc/httpd/conf/httpd.conf
```

## HTTPD Düzenleme

Dosyanın en altına şu satırı ekliyoruz:

```bash
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
```

## Yeni Vhost Dosyası

F3 ve ardından F2 tuşlarına basarak dosyayı kaydediyoruz. Sonrasında şu komutu kullanarak yeni bir dosya oluşturuyoruz:

```bash
sudo nano /etc/httpd/conf/extra/httpd-vhosts.conf
```

## VHOST Düzenleme

Bu dosyanın en altına şu satırları ekliyoruz:

```bash
ServerAdmin webmaster@baba.test
DocumentRoot "/srv/http/baba.test"
ServerName baba.test
ServerAlias www.baba.test
ErrorLog "/var/log/httpd/baba.test-error_log"
CustomLog "/var/log/httpd/baba.test-access_log" common
```

Bu, standart kullanım şeklidir. Ancak yalnızca `DocumentRoot` ve `ServerName` kısımlarını kullanabilirsiniz. Diğerlerini kullanmak istemiyorsanız, başlarına `#` işareti koyarak pasif hale getirebilirsiniz.

# Apache Konfigürasyon Testi

Yapılandırmanızı test etmek için şu komutu kullanabilirsiniz:

```bash
apachectl configtest
```

Ancak son bir işlem kaldı. Şimdi, **hosts** dosyasını düzenleyip, bu URL'yi tanımlayacağız.

## Hosts Dosyasını Düzenleme

```bash
sudo nano /etc/hosts
```

Dosyanın en altına şu satırı ekliyoruz:

## Domain Tanıtımı

```bash
127.0.0.1 baba.test
```

Son olarak kaydedip çıkıyoruz ve Apache sunucusunu yeniden başlatıyoruz:

```bash
sudo systemctl restart httpd
```

## Sonuç ;)

[responsive_img src="/images/babatest-xl.webp" alt="arch-linux-apache-lampp-sanal-sunucu-kurulumu" /]
