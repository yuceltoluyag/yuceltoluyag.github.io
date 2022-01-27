---
layout: post
title: Linux Üzerinde Apache2 MySQL PhpMyAdmin Kurulumu debian ve türevleri
description: Linux Üzerinde Apache2 MySQL PhpMyAdmin Kurulumu debian ve türevleri
image: "/assets/images/configure_lampp.webp"
comments: false
edit_url: true
toc: true
category: linux
tags: [linux, apache]
---

Merhaba, windows ve linuxta uyumlu çalışan xampp kullanmaktaydım.Her nedense xamppın yerine apache kurmak ilgimi çekti :) Kurulumu son derece basit. 🙌

<!-- excerpt separator -->

# Apache Kurulumu

Her koddan sonra entere basmayı unutmayın 👀

```shell
sudo apt-get updatesudo apt-get install apache2

```

bu komuttan sonra localhost yada ip adresinizi tarayıcınıza yazın apachenin çalıştığını göreceksiniz.

# Mysql Kurulumu

```shell
sudo apt-get install mysql-server mysql-client
```

Önünüze şifre sorma ekranı gelecek oraya iki defa şifrenizi yazın.

![configure_lampp](/assets/images/configure_lampp.webp)

```shell
sudo systemctl status mysql

```

bu kodun çıktısı şu şekilde olacak

```shell
mysql.service - MySQL Community Server
Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: en
Active: active (running) since Cts 2017-06-17 23:30:16 +03; 38min ago
Main PID: 18866 (mysqld)
CGroup: /system.slice/mysql.service
└─18866 /usr/sbin/mysqld
Haz 17 23:30:15 friday13-MS-7817 systemd[1]: Starting MySQL Community Server...
Haz 17 23:30:16 friday13-MS-7817 systemd[1]: Started MySQL Community Server.
```

# MariaDB Kurulumu

MariaDB yüklemek isteyenler yorum bıraksın yardımcı olurum, ben yüklemek istemediğim için kurmadım.

```shell
mysql_secure_installation

```

bu komutu yazdıktan sonra şifre ekranına yukarıda yazdığınız şifrenin aynısını yazın.Gelen seçenek için entere basın Remove anonoymus userkısmı için Y yazın entere basın. Disallow Root kısmı için Y basın Reload privegille kısmı için Y basın ALL DONE ! dediyse tamamdır :)

# PHP Kurulumu

```shell
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt search php7
sudo apt install php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0 libapache2-mod-php7.0
```

Kurulum bittikten sonra php -v yazarak versiyonu görebilirsiniz.

```shell
sudo systemctl restart apache2

```

# PHPMyadmin Kurulumu

apache mizi yeniden başlatıyoruz..

```shell
sudo apt-get install phpmyadmin
```

karşımıza gelen ekrana apache2 yi seçip sonraki işlemde yukarıda yazdığımız şifrenin aynısını iki kere yazıp gelen seçeneğe evet diyoruz.

```shell
sudo systemctl restart apache2

```

apache mizi yeniden başlatıyoruz..localhost/phpmyadmin yazıyoruz. root ve oluşturduğumuz şifreyi yazarak işlemi tamamlamış oluyoruz :)Eğer ki phpmyadmin kısmında 404 hatası veriyor ise

```shell
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin.conf
sudo service apache2 reload
```

tekrar localhost/phpmyadmin giriyoruz olmuş :D
bu kısımda The mbstring extension is missing. Please check your PHP configuration. Hatası ile karşılaştıysanız.

```shell
sudo apt-get install libapache2-mod-php7.0
sudo apt-get install php7.0-mbstring
sudo service apache2 restart

```

kurulumda hata alır iseniz yorum bırakın çözelim, iyi çalışmalar.
