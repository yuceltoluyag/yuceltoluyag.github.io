Title: Activating .htaccess on XAMPP (Illustrated Guide)
Date: 2017-01-19
Category: Web Geliştirme
Author: yuceltoluyag
Slug: xampp-htaccess-aktif-etmek
Summary: Learn step-by-step (with images) how to activate the .htaccess file for settings like SEO, redirection, or custom error pages while using XAMPP.
Tags: xampp, apache, htaccess, seo, localhost
Lang: en
Translation: false
Image: images/xampp-config-httpconf-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115600621290151146
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6czu4n3tc26

## Activating .htaccess on XAMPP (Illustrated Guide)

While working on localhost, the `.htaccess` file provides great convenience in many matters such as **SEO settings**, **hotlink prevention**, **custom error pages**, and **traffic control**.  
In this post, I will show you step-by-step how to activate the `.htaccess` file using XAMPP.

---

## 1️⃣ Enabling the Apache Mod Rewrite Module

1. Open the XAMPP Control Panel.
2. Click the **Config** button located to the right of the **Apache** line.
3. Select the **httpd.conf** file from the opening menu.
   [responsive_img src="/images/xampp-config-httpconf-xl.webp" alt="Xampp Httpconf" /]

   🧩 Then find the following line:

```apache
#LoadModule rewrite_module modules/mod_rewrite.so
```

> Remove the `#` (hash) sign at the beginning:

```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

This process allows **URL redirection** and **rewriting** operations to work.

---

[responsive_img src="/images/xampp-load-module-rewrite-xl.webp" alt="Xampp Httpconf Config" /]

## 2️⃣ Changing the AllowOverride Setting

Find the following lines in the same file:

```apache
AllowOverride None
```

and change them as follows:

```apache
AllowOverride All
```

> This change allows the `.htaccess` file to **work actively**.

---

## 3️⃣ Restart Apache and MySQL Services

For the changes you made to take effect:
Return to the XAMPP panel and restart **Apache** and **MySQL** services by clicking **Stop → Start**.

---

## 4️⃣ Sample .htaccess File

Now your `.htaccess` file is active!
To try it, create a `.htaccess` file in the root directory and add the following code:

```apache
# Activates redirections
RewriteEngine On

# Example: redirect non-www to www
RewriteCond %{HTTP_HOST} ^example\.com [NC]
RewriteRule ^(.*)$ http://www.example.com/$1 [L,R=301]
```

---

## 🧠 Additional Information

- The `.htaccess` file works on **Apache servers**.
- The filename must start with a dot (.) and **must not have a file extension**.
- After editing the file, **don't forget to clear the browser cache.**

---

Good luck 😉
Now your `.htaccess` file is working **with full functionality** on XAMPP.
