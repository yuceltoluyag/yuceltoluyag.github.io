Title: XAMPP PHP 7 Installation [Linux]
Date: 2017-01-21
Category: Linux
Author: yuceltoluyag
Slug: xampp-php7-kurulumu-linux
Summary: Learn step-by-step the steps for PHP 7 installation and execution using XAMPP (LAMPP) on Linux systems.
Tags: xampp, lampp, php7, linux, ubuntu, apache
Lang: en
Translation: false
Image: images/php7-ubuntu-xampp-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601098200369463
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6dajyy66k2c

## XAMPP PHP 7 Installation [Linux]

Hello, although it is known as **XAMPP** on Windows, it operates under the name **LAMPP** on the Linux side.  
AppServ had served me well in the past, but the delay in its development and the frequently encountered errors in recent versions cooled me off from AppServ.  
XAMPP was my indispensable local server program on the Windows side. After switching to Linux, one cannot easily give up some habits. 😊

Anyway, let's move on to the installation without further ado.

## Downloading XAMPP

First, we download the latest version of PHP from the [Apache Friends Download](https://www.apachefriends.org/download.html){: target="\_blank" rel="noopener noreferrer"} address.  
Don't let the fact that the file has a **`.run`** extension intimidate you.  
You can follow the steps below on Ubuntu and its derivatives.

```bash
cd Downloads
```

!!! tip "Tip ⚡ If you downloaded to a different directory, adjust the `cd` command accordingly."

## Giving Permission to the Installation File

We give the necessary execution permission to our file.
You can give `777` if you want, but it is **not recommended for security reasons**.
In the following example, `755` permission is given.

```bash
chmod 755 xampp-linux-x64-7.0.9-2-installer.run
```

!!! warning "Caution! The `chmod 777` command gives full authorization to all users and may pose a security risk."

## Starting the Installation

Now we run our file:

```bash
sudo ./xampp-linux-*-installer.run
```

After the installation is complete, you can use the following command to start XAMPP:

```bash
sudo /opt/lampp/lampp start
```

This command starts XAMPP **without an interface**.

!!! note "Note: Running without an interface is a faster method, especially on terminal-oriented systems."

## Running with the Interface

If you want to control it by opening the interface, use this command:

```bash
sudo ./manager-linux.run
```

or according to your system:

```bash
sudo ./manager-linux-x64.run
```

!!! tip "Tip ⚡ Instead of typing the whole command, if you type the letter `m` and press the TAB key, the terminal will autocomplete it."

Now your XAMPP (LAMPP) installation with PHP 7 support on Linux is ready! 🎉

[responsive_img src="/images/php7-ubuntu-xampp-xl.webp" alt="XAMPP PHP 7 Installation Linux" /]
