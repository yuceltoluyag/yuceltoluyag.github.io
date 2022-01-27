---
layout: post
title: Linux'ta Codeigniter nasıl kurulur ?
description: Linux'ta Codeigniter Nasıl Yüklenir ?
category: kutuphane
tags: [codeigniter]
comments: false
edit_url: true
---

Gökhan Kandemir’in [codeigniter kitabı](http://kablosuzkedi.com/index.php/2017/10/24/codeigniter-3-kitabi-cikti/){:target="\_blank"}{:rel="noopener noreferrer"} aldıktan,çalışma yapabilmek için codeigniteri kurmam gerekliydi. Kurulum gayet basit,localde çalışabilmek için farklı bir ayara gerek kalmıyor ancak sunucu tarafında bir kaç ayar daha yapmanız gereklidir.Dileyen olursa o ayarlarıda paylaşırım.

<!-- excerpt separator -->

1.  [Apache Kurmalısınız](https://yuceltoluyag.github.io/linux-uzerinde-apache2-mysql-phpmyadmin_14/) [Arch linux için Tıklayın](https://yuceltoluyag.github.io/arch-linux-lampp-kurulumuphp7xmariadbmy/)
2.  [Codeigniter](https://codeigniter.com/download){:target="\_blank"}{:rel="noopener noreferrer"} sayfasından indirme bağlantımızı kopyalıyoruz. Şu an ki versiyon 3.1.9

```shell
wget https://github.com/bcit-ci/CodeIgniter/archive/3.1.9.zip
unzip 3.1.6.zip
mv CodeIgniter-3.1.6 codeigniter
sudo chown -R sistemkullaniciadiniz:sistemkullanıcıadınız /var/www/html/
cp -R codeigniter /var/www/html/codeigniter
service apache2 restart

```

[http://localhost/codeigniter](http://localhost/codeigniter){:target="\_blank"}{:rel="noopener noreferrer"} adresinden CI ‘ ya ulaşabilirsiniz.

3. [Video Link](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){:target="\_blank"}{:rel="noopener noreferrer"}
