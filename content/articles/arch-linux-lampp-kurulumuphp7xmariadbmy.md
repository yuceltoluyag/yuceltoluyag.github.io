Title: Arch Linux Lampp Kurulumu (PHP7x + MariaDB + MySQL + PhpMyAdmin)
Date: 2018-11-18 12:00 10:00
Modified: 2025-03-08 12:00
Category: linux
Tags: linux, apache
Series: ArchLampp
Series_index: 1
Slug: arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin
Authors: yuceltoluyag
Summary: Bu rehberde, Arch Linux üzerinde Apache, PHP, MariaDB, MySQL ve PhpMyAdmin kurulumlarını adım adım öğreneceksiniz.
Translation: false
Status: published
Template: article


Merhaba! Çok uzun bir süre önce  Arch Linux'a geçiş yaptım. Ancak notlarımı bir türlü bloguma aktarma fırsatım olmadı. Bundan sonraki yazılarım, Arch Linux üzerine olacaktır. Sorular gelirse Ubuntu, Linux Mint gibi dağıtımlar için de ara ara yazılar paylaşacağım.

# Apache Kurulumu

Apache kurulumu için aşağıdaki komutları kullanabilirsiniz:

```shell
sudo pacman -S apache
sudo nano /etc/httpd/conf/httpd.conf
```

- Burada, `LoadModule unique_id_module modules/mod_unique_id.so` satırının başına `#` işareti koyuyoruz. Ardından kaydedip çıkıyoruz.
-  Nano kullanıyorsanız, F3 ile kaydedip, F2 ile çıkabilirsiniz. Nano yerine gedit, Sublime veya mousepad gibi diğer metin editörlerini de kullanabilirsiniz.

# MySQL & MariaDB Kurulumu

MySQL ve MariaDB kurulumu için şu adımları takip edin:

```shell
sudo systemctl enable httpd
sudo systemctl restart httpd
sudo pacman -S mysql
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable mysqld
sudo systemctl start mysqld
mysql_secure_installation
```

- `mysql_secure_installation` komutunu çalıştırdıktan sonra, "change the root password" seçeneğine `y` tuşuna basarak şifrenizi belirleyin. Şifreyi unutmayacağınız bir şekilde girmeniz önemlidir. Diğer tüm seçeneklere `Y` diyebilirsiniz. Sistem diliniz Türkçe ise `E` tuşuna basarak devam edebilirsiniz. Eğer "Thanks for using MariaDB" yazısını görürseniz, kurulum tamamlanmıştır.

## PHP Kurulumu

PHP kurulumu için şu komutları kullanabilirsiniz:

```shell
sudo pacman -S php php-apache
sudo nano /etc/httpd/conf/httpd.conf
```

- Burada, `LoadModule mpm_event_module modules/mod_mpm_event.so` satırının başına `#` işareti koyuyoruz.
- Sayfanın en altına aşağıdaki kodları ekliyoruz.

### Apache Konfigurasyonu

```shell
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
LoadModule php7_module modules/libphp7.so
AddHandler php7-script php
Include conf/extra/php7_module.conf

# phpMyAdmin configuration
Include conf/extra/phpmyadmin.conf
```

# PHPMyAdmin Kurulumu

PHPMyAdmin kurulumu için şu adımları takip edin:

- F3 ardından F2'ye basarak kaydediyoruz.
  
```shell
sudo pacman -S phpmyadmin
sudo nano /etc/php/php.ini
```

### PHP.ini Konfigurasyonu

- `php.ini` dosyasının içerisinde şu satırları aktif hale getirin:

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
```

Başındaki `;` işaretlerini kaldırıyoruz. Ekstra olarak aktif etmek istediğiniz başka bir eklenti varsa aynı işlemi yapabilirsiniz. Ayrıca, PHP hata mesajlarını görmek için şu ayarı yapmamız gerekiyor:

### Hataları Gösterme

```shell
display_errors = On
```

Bu ayar normalde `Off` durumundadır. `On` yaparak, yerel geliştirme sırasında hata mesajlarını görebilirsiniz.

#### PHPMyAdmin Konfigurasyonu

```shell
sudo nano /etc/httpd/conf/extra/phpmyadmin.conf
```

- Bu dosyaya şu satırları ekleyin:

```shell
Alias /phpmyadmin "/usr/share/webapps/phpMyAdmin"
<Directory "/usr/share/webapps/phpMyAdmin">
DirectoryIndex index.php
AllowOverride All
Options FollowSymlinks
Require all granted
</Directory>
```

Ardından Apache'yi yeniden başlatın:

```shell
sudo systemctl restart httpd
```

# Ekstra Eklentiler

PHP ile düzgün çalışması için bazı ek eklentileri yüklememiz gerekecek:

```shell
sudo pacman -S php-dblib
sudo pacman -S php-pgsql php-sqlite php-gd php-odbc
sudo pacman -Syu
```

PHP sürümünü kontrol etmek için şu komutu kullanabilirsiniz:

```shell
php -v
```

Eğer `error` ifadesini görmüyorsanız, kurulumunuz başarıyla tamamlanmıştır.

```shell
PHP 7.2.2 (cli) (built: Jan 30 2018 19:18:38) ( NTS )
```

## Ekstra Bilgiler

Projelerinizi kaydedeceğiniz dizin: **/srv/http/**

Dosya yazma izinleriyle ilgili sorun yaşamamak için şu komutları kullanabilirsiniz:

```shell
sudo chmod o+w /srv/http/ # veya
sudo chown -R friday13:friday13 /srv/http/
```

Bu iki yöntemle genelde dosya erişim sorunları çözülür. Ancak bazen, yüklenen dosyanın gideceği klasörle ilgili bir sorun yaşanabilir. Bu durumda ilk yöntemi uygulayarak klasöre yazma izni verebilirsiniz.

<iframe width="560" height="315" src="https://www.youtube.com/embed/SElIrg0owl8?si=8WwEPayhcUK7RFWZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>