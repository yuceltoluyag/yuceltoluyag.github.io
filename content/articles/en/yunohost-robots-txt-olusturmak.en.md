Title: Creating robots.txt File on Yunohost
Date: 2025-04-14 10:00
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: yunohost, robots.txt, nginx, seo, listeleme engelleme
Slug: yunohost-robots-txt-olusturmak
Authors: yuceltoluyag
Status: published
Image: images/yunohost-robotstxt-xl.webp
Lang: en
Summary: Learn step by step how to create a robots.txt file on Yunohost to control how search engines crawl your website.
Template: article
toot: https://mastodon.social/@yuceltoluyag/114987831204439588
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvsve4rjq22f

🚀 **Do you want to control how search engines crawl your website?** By creating a custom `robots.txt` file for applications hosted on Yunohost, you can take complete control of this process.

In this article, I'll provide a step-by-step guide on **creating a robots.txt file on Yunohost**. You'll also learn SEO-compliant configuration techniques. Our goal is to prevent search engines like Google from **indexing your site in unwanted ways**.

---

## 🤖 What is Robots.txt and Why is it Important?

`robots.txt` is a plain text file located in the root directory of a site that tells search engines which pages they **can or cannot crawl**.

### What Does it Do?

- Limits search engines' access to specific areas.
- Reduces server load.
- Prevents private content from being accidentally indexed.
- Plays an important role as part of your SEO strategy.

---

## ⚙️ Creating Robots.txt File on Yunohost

Yunohost handles configurations differently. Follow these steps to add robots.txt:

### 1. Create the File

First, create the `robots.txt` file in your application's directory:

```bash
sudo nano /var/www/listmonk/robots.txt
```

You can add the following content as an example:

```txt
User-agent: *
Disallow: /private/
Allow: /
```

> _In this example, all content except the `/private/` directory is open to crawling._

---

## 🔐 Blocking Google's Access to Your Site

If you want Google bots to never index your site:

```txt
User-agent: Googlebot
Disallow: /
```

This command only blocks Googlebot. To block all bots:

```txt
User-agent: *
Disallow: /
```

> ❗ Note: This only prevents **indexing**, not scanning of pages. For complete protection, HTTP authentication or `noindex` meta tags can also be used.

---

## 🔧 Serving robots.txt via Nginx

After creating the file, you need to properly introduce this file to the Nginx server.

### 1. Find the Required Nginx Configuration

```bash
sudo find / -type f -name 'listmonk'
```

Select the relevant Nginx config file from the results:

```bash
sudo nano /etc/nginx/conf.d/listmonk.minel.yuceltoluyag.github.io.d/listmonk.conf
```

### 2. Add the Following `location` Block

```nginx
location = /robots.txt {
    alias /var/www/listmonk/robots.txt;
}
```

### 3. Restart Nginx

```bash
sudo systemctl restart nginx
```

---

## ✅ Verification: Is the File Working Correctly?

Visit the following URL from your browser:

```
https://listmonk.minel.yuceltoluyag.github.io/robots.txt
```

If the file displays properly, your configuration has been successfully completed.

---

[responsive_img src="/images/yunohost-robotstxt-xl.webp" alt="Sample robots.txt file created on yunohost" /]

---

## 🎓 Tips & Things to Pay Attention To

- `robots.txt` is only for **polite bots**. Malicious bots may ignore this file.
- Test on Google Search Console after modifying the file.
- You can write separate rules for site-specific content.
- If your application has a **public** directory, put the **robots.txt** file directly there—it will most likely work without problems. The method I described here is for defining robots.txt directly via nginx without a public directory.

---

## ✍️ Conclusion

Creating a `robots.txt` file on Yunohost is quite easy, but when configured correctly, it can seriously affect your site's SEO strategy. It's essential especially for those who want to hide specific directories or only allow specific bots.
