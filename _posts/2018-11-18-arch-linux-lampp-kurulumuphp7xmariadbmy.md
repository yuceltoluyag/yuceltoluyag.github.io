---
layout: post
title: Arch Linux Lampp Kurulumu(PHP7x+MariaDB+Mysql+Phpmyadmin)
description: Arch Linux Lampp Kurulumu(PHP7x+MariaDB+Mysql+Phpmyadmin)
category: linux
tags: [linux, apache]
series: "archlampp"
comments: false
edit_url: true
toc: true
---

Merhaba, çok uzun bir süre önce Saf Arch Linux'a geçiş yaptım. Notlarımı bir türlü bloguma aktarma fırsatım olmadı. Bundan sonra ki yazılarım Arch Linux üzerine olacaktır. Soru gelirse Ubuntu, Linux Mint vb dağıtımlarada ara ara yer vereceğim.

<!-- excerpt separator -->

{% include series.html %}

# Apache Kurulumu

```shell
sudo pacman -S apache
sudo nano /etc/httpd/conf/httpd.conf

```

- Burada LoadModule unique_id_module modules/mod_unique_id.sobaşına diez(#) işareti koyuyoruz. Kaydedip çıkıyoruz. Nano kullanımda F3 ardından F2 ye basarsanız hızlı kaydet işlevi görür. Nano yerine gedit subl veya mousepad artık sisteminizde ne yüklüyse onuda kullanabilirsiniz.

# Mysql & MariaDB Kurulumu

```shell
sudo systemctl enable httpd
sudo systemctl restart httpd
sudo pacman -S mysql
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable mysqld
sudo systemctl start mysqld
mysql_secure_installation
```

- mysql_secure_installation dan sonra change the root password seçeniğine y ye basıp şifre unutmayacağınız bir şifre girin. Diğer tüm seçeneklere Y diyebilirsiniz. Sistem diliniz Türkçe ise E harfine basmanız yeterlidir. Thanks for using MariaDB yazısını gördüyseniz tamamdır.

## PHP Kurulumu

```shell
sudo pacman -S php php-apache
sudo nano /etc/httpd/conf/httpd.conf

```

- Burada LoadModule mpm_event_module modules/mod_mpm_event.so başına diez(#) işareti koyuyoruz.
- Sayfanın en altınada Şu kodları ekleyin.

### Apache Konfigurasyonu

```shell
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
LoadModule php7_module modules/libphp7.so
AddHandler php7-script php
Include conf/extra/php7_module.conf

#phpMyAdmin configuration
Include conf/extra/phpmyadmin.conf
```

# PHPMyadmin Kurulumu

- F3 ardından F2 ye basıyoruz.
  ```shell
  sudo pacman -S phpmyadmin
  sudo nano /etc/php/php.ini
  ```

````
### PHPini Konfigurasyonu
- php.ini dosyasının içerisinde
  ```shell
  extension=mysqli.so
  extension=curl
  extension=mysqli
  extension=pdo_dblib
  extension=pdo_mysql
  extension=pdo_odbc
  extension=pdo_pgsql
  extension=pdo_sqlite
  extension=zip
````

İsimlerinin başında bulunan ; işaretlerini kaldırıyoruz. Burada eksta aktif etmek isteidğiniz bir eklenti varsa aynı işlemi yapabilirsiniz. PHP ini içerisinde yapmamız gereken bir diğer ayar ise :

### Hataları Gösterme

```shell
; [http://php.net/display-errors](http://php.net/display-errors)
display_errors = On

```

Burası normalde **Off** dur. **On** yaparak local üzerinde beyaz sayfa,sayfa görüntülenemiyor gibi ekranlar yerine yaptığımız hatanın çıktısını görebilirsiniz. Bölümü rahat bulabilmeniz için üstünde ki veriyide ekledim.

#### PHPMyadmin Konfigurasyonu

```shell
sudo nano /etc/httpd/conf/extra/phpmyadmin.conf
```

- Dosyanın içerisine şunları yapıştırın.

```shell
Alias /phpmyadmin "/usr/share/webapps/phpMyAdmin"
<Directory "/usr/share/webapps/phpMyAdmin">
DirectoryIndex index.php
AllowOverride All
Options FollowSymlinks
Require all granted
</Directory>

```

Ardından

```shell
sudo systemctl restart httpd
```

diyerek işlemlerimizi tamamlamış oluyoruz.

Yukarıda bazı eklentileri aktif ettik,bunları sisteme yüklemez isek lamp düzgün çalışmayacaktır.

```shell
sudo pacman -S php-dblib
sudo pacman -S php-pgsql php-sqlite php-gd php-odbc
sudo pacman -Syu

```

```shell
php -v #yazdığınızda eğer error ifadesini görmüyorsanız işlemleriniz tamamdır.
```

```shell
PHP 7.2.2 (cli) (built: Jan 30 2018 19:18:38) ( NTS )
Copyright © 1997–2018 The PHP Group
Zend Engine v3.2.0, Copyright © 1998–2018 Zend Technologies

```

## Ekstra Bilgiler

Projelerinizi atacağınız dosyalar **/srv/http/**

Yetki vermediğiniz durumlarda kopyala vb işlemler yapamazsınız

```shell
sudo chmod o+w /srv/http/ #veya
sudo chown -R friday13:friday13 /srv/http/
```

Genelde 2 yöntemi kullanıyorum. Ancak projelerde yükleme işlemleri yapıldığı zaman resmin veya dosyanın gideceği klasör bugdamı kalıyor nedir işlem başarılı olsa dahi yazmıyor. Bu gibi durumlarda ilk yöntemle klasöre yazma izni veriyorum. Belki benim bilgisayarıma özel bir durumdur tam olarak bilemiyorum ama başınıza gelirse uygularsınız.

{% include youtubePlayer.html id="SElIrg0owl8" title="Arch Linux Lampp Kurulumu(PHP7x+MariaDB+Mysql+Phpmyadmin)" %}
