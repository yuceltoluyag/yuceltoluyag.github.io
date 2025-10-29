Title: Creating a Custom Domain Name for Localhost Using XAMPP
Date: 2019-03-06 12:00 10:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: windows10, apache
Slug: xampp-ozel-alan-adi
Authors: yuceltoluyag
Summary: How to create a custom domain name in localhost environment using XAMPP? Step by step guide.
Translation: true
Status: published
Template: article
Image: images/hosts-xl.webp
Lang: en


Let's take those who want to use it on the Linux side like this: [Arch Linux](/arch-linux-apache-lampp-sanal-sunucu-kurulumu/){: target="_blank" rel="noopener noreferrer"} + [Debian](/linux-apache2-mysql-phpmyadmin-kurulumu/){: target="_blank" rel="noopener noreferrer"}

## Step 1: Editing the Hosts File

Go to the following directory and open the `hosts` file with Notepad or any text editor:

**File Location:**
```powershell
C:\Windows\System32\Drivers\etc\hosts
```

Add the following format to the last line of the opened file:
```conf
127.0.0.1 eticaret.test
```


[responsive_img src="/images/hosts-xl.webp" alt="Editing Hosts File" /]
## Step 2: Apache Virtual Hosts Configuration

Go to the XAMPP directory and open the `httpd-vhosts.conf` file with an editor:

**File Location:**
```powershell
C:\xampp\apache\conf\extra\httpd-vhosts.conf
```

Edit the following settings according to your needs and add them to the end of the file:
```apache
<VirtualHost *:80>
    ServerAdmin webmaster@eticaret.test
    DocumentRoot "C:/xampp/htdocs/eticaret/"
    ServerName eticaret.test
    ServerAlias www.eticaret.test
    ErrorLog "logs/eticaret.test-error.log"
    CustomLog "logs/eticaret.test-access.log" common
</VirtualHost>
```

## Step 3: Restarting XAMPP

Restart XAMPP for your changes to take effect:

1. Open the XAMPP Control Panel.
2. Stop and restart the Apache service.
3. Go to `http://eticaret.test` in your browser to test your settings.

Now you can run your projects with your own local domain name! 🚀