---
layout: post
title: XAMPP Kullanarak localhost'a Özel Alan Adı Oluşturma
description: XAMPP Kullanarak localhost'a Özel Alan Adı Oluşturma
image: "/assets/images/hosts.webp"
category: program
tags: [windows10, apache]
comments: false
edit_url: true
---

Linux Tarafında Kullanmak isteyenleri böyle alalım. => [Dıkla](https://yuceltoluyag.github.io/arch-linux-apachelampp-sanal-sunucu/)

Aşağıdaki dosya dizinine gidin not defteri veya herhangi bir editörle açın

<!-- excerpt separator -->

1.  C:\Windows\System32\Drivers\etc\hosts
2.  Açılan dosyanın en altına 127.0.0.1 siteadresi.uzantı şeklinde ekleme yapın Örneğin

    ```conf
    127.0.0.1 eticaret.test

    ```

![Host Dosyası Edit](/assets/images/hosts.webp)

3.  XAMPP dizini gidin editorunuzle açın
    C:\xampp\apache\conf\extra\httpd-vhosts.conf

    ```apache
    ServerAdmin webmaster@dummy-host.example.com
    DocumentRoot "C:/xampp/htdocs/eticaret/"
    ServerName eticaret.test
    ServerAlias www.eticaret.test
    ErrorLog "logs/eticaret.test-error.log"
    CustomLog "logs/eticaret.test-access.log
    ```

Kendi ayarlarınıza göre düzenledikten sonra Xampp ı yeniden başlatın
