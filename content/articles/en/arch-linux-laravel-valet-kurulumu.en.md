Title: Arch Linux Laravel Valet Installation
Date: 2020-06-15 14:00 10:00
Modified: 2025-08-11 22:59
Category: Laravel Geliştirme
Tags: linux, laravel
Slug: arch-linux-laravel-valet-kurulumu
Authors: yuceltoluyag
Series: ArchLampp
Series_index: 4
Summary: Valet Linux is an ideal Laravel development environment for those who love a minimalist development setup. You can easily share your sites using local tunnels without needing to configure Vagrant or /etc/hosts.
Status: published
Template: article
Image: images/laravel-valet-kurulumu-linux-xl.webp
Lang: en

---

## Hello 👋

Valet Linux is a Laravel development environment for those who prefer a minimalist development setup. There is no need to configure [Vagrant](/archlinux-virtualbox-vagrant-laravel-phpmyadmin-kurulumu){: target="\_blank" rel="noopener noreferrer"} or `/etc/hosts`. You can easily share your sites publicly using local tunnels (Ngrok, etc.). 🚀

Valet configures your system to run **Nginx in the background** when the machine starts. Then, it directs your `*.test` domains to the relevant directories using **DnsMasq**. **It offers a fast and lightweight Laravel development environment that runs using only 7MB of RAM.** 🎯

!!! warning "Previous Installations If you have previously performed installations like <a href="https://yuceltoluyag.github.io/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/" rel="noopener noreferrer" target="_blank">Arch Linux Lampp Installation (PHP7x + MariaDB + MySQL + PhpMyAdmin)</a> or similar, you should disable or uninstall them. Otherwise, conflicts may occur."

## 🛠 Installation

Open the terminal and run the following commands sequentially:

```bash
pacman -S nss jq xsel networkmanager
```

Make sure PHP is installed and its version is higher than 5.6:

```bash
pacman -S php # For checking after installation: php -v
```

Install necessary additional PHP packages:

```bash
yay -S php71-mcrypt
```

Optional packages:

```bash
yay -S php php-dblib php-fpm php-gd php-odbc php-pgsql php-sqlite
```

Install Composer:

```bash
yay -S composer
```

Then add the following line to `.bashrc`:

```bash
PATH="$HOME/.config/composer/vendor/bin:$PATH"
```

Prepare Composer and install Valet Linux:

```bash
composer global require cpriego/valet-linux
```

## 🎉 Working with Valet

Go to your home directory and create a folder named `Sites`:

```bash
mkdir ~/Sites
```

Each subfolder within this folder will act like a domain name. For example, let's create a Laravel project named `blog` and park it:

```bash
cd ~/Sites
php valet park
laravel new blog
```

You can view your project by going to **http://blog.test** in your browser! 🎊

## 🌍 Valet Link Command

You can create a special link for a specific project:

```bash
valet link projectname
```

To list links:

```bash
valet links
```

[responsive_img src="/images/laravel-valet-link-archlinux-xl.webp" alt="Laravel Valet Link Arch Linux" /]

## 🔧 Changing the Domain Extension

If you want to change the default `.test` extension:

```bash
valet domain .app
```

To learn the current domain extension:

```bash
valet domain
```

To change the port used by Valet:

```bash
valet port xxxx # Replace xxxx with the new port number
```

## 🔒 Resolving SSL Errors

You may encounter SSL errors, especially when using extensions like `.app` or `.dev`. To prevent this:

```bash
valet secure projectname
```

To disable SSL:

```bash
valet unsecure projectname
```

## 📺 Video Narration

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="-Qdxa0XjkgQ"></lite-youtube>

## 📚 Resources

- [Valet Linux Official Documentation](https://cpriego.github.io/valet-linux/index#installation){: target="\_blank" rel="noopener noreferrer"}
- [Valet Linux Requirements](https://cpriego.github.io/valet-linux/requirements.html#arch){: target="\_blank" rel="noopener noreferrer"}

🎯 Now you can quickly develop your Laravel projects with Valet and optimize your local environment! 🚀

[responsive_img src="/images/laravel-valet-kurulumu-linux-xl.webp" alt="Laravel Valet Installation" /]
