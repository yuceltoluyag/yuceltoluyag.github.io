Title: Linux Üzerinde Apache2, MySQL ve PhpMyAdmin Kurulumu (Debian ve Türevleri)
Date: 2018-09-14 12:00 10:00
Modified: 2025-08-07 06:45
Category: Sunucu
Tags: linux, apache, mysql, phpmyadmin
Slug: linux-apache2-mysql-phpmyadmin-kurulumu
Authors: yuceltoluyag
Summary: Debian ve türevlerinde Apache2, MySQL ve PhpMyAdmin kurulumunu adım adım nasıl gerçekleştirebileceğinizi anlatıyoruz.
Status: published
Template: article
Image: images/linux-apache2-mysql-phpmyadmin-kurulumu-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114982042077615978


Debian ve türevlerinde Apache2, MySQL ve PhpMyAdmin kurulumunu adım adım nasıl gerçekleştirebileceğinizi anlatıyoruz. XAMPP kullanmak yerine doğrudan Apache kurmak isteyenler için rehber niteliğindedir.

---

## Apache Kurulumu

Her komuttan sonra `Enter` tuşuna basmayı unutmayın.

```bash
sudo apt-get update
sudo apt-get install apache2
```

Bu komutları çalıştırdıktan sonra tarayıcınızın adres çubuğuna `localhost` veya IP adresinizi yazın. Eğer Apache düzgün çalışıyorsa varsayılan Apache sayfasını görebilirsiniz.

## MySQL Kurulumu

```bash
sudo apt-get install mysql-server mysql-client
```

Kurulum sırasında sizden bir parola girmeniz istenecektir. Parolanızı belirleyip onaylayın.

```bash
sudo systemctl status mysql
```

Bu komutu çalıştırdığınızda MySQL'in çalıştığını belirten bir çıktı almanız gerekir.

## MariaDB Kurulumu (İsteğe Bağlı)

MariaDB yüklemek isteyenler aşağıdaki komutu kullanabilir:

```bash
sudo apt-get install mariadb-server mariadb-client
```

Güvenlik ayarlarını yapmak için şu komutu çalıştırın:

```bash
sudo mysql_secure_installation
```

Gelen ekranda root parolanızı girin ve güvenlik yapılandırmalarını tamamlayın.

## PHP Kurulumu

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0 libapache2-mod-php7.0
```

Kurulumu doğrulamak için:

```bash
php -v
```

Komutunu çalıştırarak PHP sürümünüzü kontrol edebilirsiniz.

Apache'yi yeniden başlatın:

```bash
sudo systemctl restart apache2
```

## PhpMyAdmin Kurulumu

```bash
sudo apt-get install phpmyadmin
```

Kurulum sırasında Apache2'yi seçin ve veritabanı yönetimi için root parolanızı girin.

Eğer phpMyAdmin'e erişirken `404 Not Found` hatası alırsanız aşağıdaki komutları çalıştırın:

```bash
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin.conf
sudo service apache2 reload
```

Tarayıcınıza `localhost/phpmyadmin` yazarak phpMyAdmin'e erişebilirsiniz. Eğer "The mbstring extension is missing" hatası alırsanız şu komutları çalıştırın:

```bash
sudo apt-get install libapache2-mod-php7.0
sudo apt-get install php7.0-mbstring
sudo service apache2 restart
```

Kurulum sırasında herhangi bir hata alırsanız yorum bırakabilirsiniz. İyi çalışmalar!

[responsive_img src="/images/linux-apache2-mysql-phpmyadmin-kurulumu-lg.webp" alt="linux-apache2-mysql-phpmyadmin-kurulumu" /]