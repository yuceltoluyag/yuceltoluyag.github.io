Title: Arch Linux LAMPP Installation (PHP7x + MariaDB + MySQL + PhpMyAdmin)
Date: 2018-11-18 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: linux, apache
Series: ArchLampp
Series_index: 1
Slug: arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin
Authors: yuceltoluyag
Summary: In this guide, you will learn step-by-step how to install Apache, PHP, MariaDB, MySQL, and PhpMyAdmin on Arch Linux.
Status: published
Template: article
Image: images/archlinuxlampp-xl.webp
Lang: en

---

Hello! A long time ago, I switched to Arch Linux. However, I never had the opportunity to transfer my notes to my blog. My future articles will be about Arch Linux. If there are questions, I will occasionally share articles for distributions like Ubuntu and Linux Mint.

## Apache Installation

You can use the following commands for Apache installation:

```bash
sudo pacman -S apache
sudo nano /etc/httpd/conf/httpd.conf
```

- Here, we put a `#` sign at the beginning of the line `LoadModule unique_id_module modules/mod_unique_id.so`. Then we save and exit.
- If you are using Nano, you can save with F3 and exit with F2. You can also use other text editors like gedit, Sublime, or mousepad instead of Nano.

## MySQL & MariaDB Installation

Follow these steps for MySQL and MariaDB installation:

```bash
sudo systemctl enable httpd
sudo systemctl restart httpd
sudo pacman -S mysql
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
sudo systemctl enable mysqld
sudo systemctl start mysqld
mysql_secure_installation
```

- After running the `mysql_secure_installation` command, press `y` to "change the root password" and set your password. It is important to enter a password you will not forget. You can say `Y` to all other options. If your system language is Turkish, you can press `E` to continue. If you see "Thanks for using MariaDB", the installation is complete.

## PHP Installation

You can use the following commands for PHP installation:

```bash
sudo pacman -S php php-apache
sudo nano /etc/httpd/conf/httpd.conf
```

- Here, we put a `#` sign at the beginning of the line `LoadModule mpm_event_module modules/mod_mpm_event.so`.
- We add the following lines to the end of the file.

## Apache Configuration

```bash
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
LoadModule php7_module modules/libphp7.so
AddHandler php7-script php
Include conf/extra/php7_module.conf

# phpMyAdmin configuration
Include conf/extra/phpmyadmin.conf
```

## PHPMyAdmin Installation

Follow these steps for PHPMyAdmin installation:

- We save by pressing F3 then F2.

```bash
sudo pacman -S phpmyadmin
sudo nano /etc/php/php.ini
```

## PHP.ini Configuration

- In the `php.ini` file, activate the following lines:

```bash
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

We remove the `;` at the beginning. If you want to activate another extension, you can do the same. Also, to see PHP error messages, we need to make the following setting:

## Displaying Errors

```bash
display_errors = On
```

This setting is normally `Off`. By setting it to `On`, you can see error messages during local development.

## PHPMyAdmin Configuration

```bash
sudo nano /etc/httpd/conf/extra/phpmyadmin.conf
```

- Add the following lines to this file:

```bash
Alias /phpmyadmin "/usr/share/webapps/phpMyAdmin"
<Directory "/usr/share/webapps/phpMyAdmin">
DirectoryIndex index.php
AllowOverride All
Options FollowSymlinks
Require all granted
</Directory>
```

Then restart Apache:

```bash
sudo systemctl restart httpd
```

## Extra Extensions

We will need to install some additional extensions for PHP to work properly:

```bash
sudo pacman -S php-dblib
sudo pacman -S php-pgsql php-sqlite php-gd php-odbc
sudo pacman -Syu
```

You can use the following command to check the PHP version:

```bash
php -v
```

If you do not see an `error` message, your installation is complete.

```bash
PHP 7.2.2 (cli) (built: Jan 30 2018 19:18:38) ( NTS )
```

## Additional Information

The directory where you will save your projects: **/srv/http/**

You can use the following commands to avoid problems with file write permissions:

```bash
sudo chmod o+w /srv/http/ # or
sudo chown -R friday13:friday13 /srv/http/
```

These two methods generally solve file access problems. However, sometimes a problem may occur with the folder where the uploaded file will go. In this case, you can grant write permission to the folder by applying the first method.

## Video Narration

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="SElIrg0owl8"></lite-youtube>

[responsive_img src="/images/archlinuxlampp.webp" alt="arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin" /]
