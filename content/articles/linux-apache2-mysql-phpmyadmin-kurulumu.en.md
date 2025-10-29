Title: Installing Apache2, MySQL and PhpMyAdmin on Linux (Debian and Derivatives)
Date: 2018-09-14 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: linux, apache, mysql, phpmyadmin
Slug: linux-apache2-mysql-phpmyadmin-kurulumu
Authors: yuceltoluyag
Summary: We explain step by step how to install Apache2, MySQL and PhpMyAdmin on Debian and its derivatives.
Status: published
Template: article
Image: images/linux-apache2-mysql-phpmyadmin-kurulumu-xl.webp
Lang: en


We explain step by step how to install Apache2, MySQL and PhpMyAdmin on Debian and its derivatives. It serves as a guide for those who want to install Apache directly instead of using XAMPP.

---

## Installing Apache

Don't forget to press `Enter` after each command.

```bash
sudo apt-get update
sudo apt-get install apache2
```

After running these commands, type `localhost` or your IP address in your browser's address bar. If Apache is working properly, you can see the default Apache page.

## Installing MySQL

```bash
sudo apt-get install mysql-server mysql-client
```

During installation, you will be asked to enter a password. Set your password and confirm it.

```bash
sudo systemctl status mysql
```

When you run this command, you should get an output indicating that MySQL is running.

## Installing MariaDB (Optional)

Those who want to install MariaDB can use the following command:

```bash
sudo apt-get install mariadb-server mariadb-client
```

Run the following command to make security settings:

```bash
sudo mysql_secure_installation
```

Enter your root password on the incoming screen and complete the security configurations.

## Installing PHP

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0 libapache2-mod-php7.0
```

To verify the installation:

```bash
php -v
```

You can check your PHP version by running this command.

Restart Apache:

```bash
sudo systemctl restart apache2
```

## Installing PhpMyAdmin

```bash
sudo apt-get install phpmyadmin
```

During installation, select Apache2 and enter your root password for database management.

If you get a `404 Not Found` error when accessing phpMyAdmin, run the following commands:

```bash
sudo ln -s /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
sudo a2enconf phpmyadmin.conf
sudo service apache2 reload
```

You can access phpMyAdmin by typing `localhost/phpmyadmin` in your browser. If you get "The mbstring extension is missing" error, run the following commands:

```bash
sudo apt-get install libapache2-mod-php7.0
sudo apt-get install php7.0-mbstring
sudo service apache2 restart
```

If you encounter any errors during installation, you can leave a comment. Good work!

[responsive_img src="/images/linux-apache2-mysql-phpmyadmin-kurulumu-xl.webp" alt="linux-apache2-mysql-phpmyadmin-kurulumu" /]