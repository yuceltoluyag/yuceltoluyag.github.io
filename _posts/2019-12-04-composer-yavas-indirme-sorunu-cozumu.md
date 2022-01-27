---
layout: post
title: composer yavaş indirme sorunu çözümü
description: composer yavaş indirme sorunu çözümü
image: "/assets/images/composer.webp"
category: program
tags: [composer]
comments: false
edit_url: true
---

![Composer Slow Download Fixed Solution](/assets/images/composer.webp)

<!-- excerpt separator -->

```shell

composer diagnose
Checking platform settings: OK
Checking git settings: OK
Checking http connectivity to packagist: OK
Checking https connectivity to packagist: OK
Checking github.com rate limit: 1 OK
Checking disk free space: OK
Checking pubkeys: FAIL Missing pubkey for tags verification
Missing pubkey for dev verification
Run composer self-update --update-keys to set them up Checking composer version: OK
Composer version: 1.9.1 PHP version: 7.4.0 PHP binary path: /usr/bin/php

```

Yukarıda ki gibi hata alıyorsanız [Composer PUBLIC KEY](https://composer.github.io/pubkeys.html){:target="\_blank"}{:rel="noopener noreferrer"} adresine gidip güncel keyleri almanız gerekmektedir. Bu keyleri iki yöntemle oluşturabilirsiniz.

- Terminal yöntemi ile
  ```shell
  composer self-update --update-keys
  ```

komutunu çalıştırdak sonra pubkeys linkinde ki keyleri sırasıyla yapıştırın. (Yapıştırırken, elinizi korkak alıştırmayın tümü seçip yapıştırabilirsiniz :)

Diğer yöntem ise Composer ayarlarınızın bulunduğu klasöre giderek (**/home/kullaniciadiniz/.config/composer/)** bu dizine iki tane dosya oluşturuyoruz.

1.  keys.dev.pub
2.  keys.tags.pub

Bu dosyaların içerisine sırasıyla pubkeys linkinde ki keyleri yapıştırıyoruz. Terminaliniz açıksa kapatın ve yeniden açın

```shell
composer diagnose
Checking platform settings: OK
Checking git settings: OK
Checking http connectivity to packagist: OK
Checking https connectivity to packagist: OK
Checking github.com rate limit: 1 OK
Checking disk free space: OK
Checking pubkeys: Tags Public Key Fingerprint: 57815BA2 7E54DC31 7ECC7CC5 573090D0 87719BA6 8F3BB723 4E5D42D0 84A14642 Dev Public Key Fingerprint: 4AC45767 E5EC2265 2F0C1167 CBBB8A2B 0C708369 153E328C AD90147D AFE50952 OK
Checking composer version: OK
Composer version: 1.9.1 PHP version: 7.4.0 PHP binary path: /usr/bin/php

```

Şunu belirtmeliyim ki yapılan işlemlere composer tarafında bazen **anlık tepki** alamıyorsunuz. Yani bu configin tanınması bir kaç dakika alabiliyor. O yüzden yaptım hala aynı diye düşünmeyin.. Ortalama **5 dakika** geçtikten sonra halen devam ediyorsa alternatif olarak şu yöntemleride deneyebilirsiniz.

**Alternatif 1**
vvv komutunu kullanabilirsiniz örneğin

```shell
composer -vvv require phpunit/phpunit
```

**Alternatif 2**
Bildiğiniz üzere paketler genel olarak packagist üzerinden yüklenir. Packagist composer ayar dosyamıza ekleyebiliriz.

```shell
composer config --global repo.packagist composer https://packagist.org

```

**Alternatif 3**
Aslında bunu en başta mı versem diye düşündüm. Özellikle sunucu tarafında composer kullanıyorsanız IPV6 üzerinde timeout hatası alıyorsanız şu komutu çalıştırmalısınız

```shell
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' &gt;&gt; /etc/gai.conf"

```

Detaylı bilgi için [https://getcomposer.org/doc/articles/troubleshooting.md#operation-timed-out-ipv6-issues-](https://getcomposer.org/doc/articles/troubleshooting.md#operation-timed-out-ipv6-issues-){:target="\_blank"}{:rel="noopener noreferrer"}

**Alternatif 4**

Yapılacak herşeyi yaptınız, son çare olarak parelel composer reposunu deneyebilirsiniz.Detaylı bilgi ve kurulum için [https://github.com/hirak/prestissimo](https://github.com/hirak/prestissimo){:target="\_blank"}{:rel="noopener noreferrer"} göz atabilirsiniz.

**Tekrar belirtiyorum** yapılan işlemlerden sonra ortalama **BEŞ(5)** dakika bekleyin. İşleme tekrar başlamadan önce composer clear-cache ve composer dump-autoload komutlarını kullandıktan sonra başlayın.
