Title: Pelican Redirect Plugin: Seamlessly Redirect Old URLs 🔄
Date: 2025-03-26 08:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: pelican, python, seo, redirect, yönlendirme, statik site
Slug: pelican-redirect-eklentisi
Authors: yuceltoluyag
Summary: Custom plugin developed to protect old URLs and seamlessly redirect visitors to new pages on static sites built with Pelican
Status: published
Template: article
Image: images/pelican-redirect-eklentisi-xl.webp
Lang: en

One of the biggest problems encountered when using static site generators is that old links stop working after changes to site structure or URLs. 🤔 This can be very harmful for SEO and can cause you to lose your visitors. Especially external links to your content that ranks high on search engines like Google will result in "404 Page Not Found" errors after URL changes.

[responsive_img src="/images/pelican-redirect-eklentisi-xl.webp" alt="pelican-redirect-plugin" /]

To solve this problem, we have developed a custom redirection plugin for Pelican. With this plugin, you can protect your old URLs and seamlessly redirect your visitors to new pages. 🚀

## How Does the Plugin Work? 🛠️

The Pelican Redirect plugin offers two basic redirection mechanisms:

1. Redirection via **.302 extension** files
2. Redirection via **REDIRECTS** configuration variable
3. Here are sample source files: [pelican_redirect.py](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/plugins/pelican_redirect.py){: target="\_blank" rel="noopener noreferrer"} + [redirect.html](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/themes/Minel/templates/redirect.html){: target="\_blank" rel="noopener noreferrer"}
   Both methods use HTML meta-refresh and JavaScript location redirections to redirect visitors to the new URLs you specify.

## Installation 💻

You can follow these steps to add the plugin to your project:

1. Place the `pelican_redirect.py` file in the `plugins` directory.
2. Enable the plugin in your `pelicanconf.py` file:

```python
PLUGINS = [
    # ... other plugins ...
    'pelican_redirect',
]
```

3. Place the redirect template in the `templates` directory of your theme:

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <link rel="canonical" href="{{ page.location }}" />
    <script>
      location = "{{ page.location }}";
    </script>
    <meta
      http-equiv="refresh"
      content="{{ page.delay }}; url={{ page.location }}"
    />
    <meta name="robots" content="noindex" />
  </head>
  <body>
    <h1>Redirecting...</h1>
    <a href="{{ page.location }}">Click here if you are not redirected.</a>
  </body>
</html>
```

## Usage 🚀

### 1. Redirection with .302 Extension Files

You can create redirection by creating files with `.302` extension in your content directory. The content of these files should be as follows:

```
location: /new-page-path/
title: Redirect Title
delay: 0

Optional content text can come here.
```

### 2. Redirection with REDIRECTS Variable

You can configure redirections by defining the `REDIRECTS` dictionary in your `pelicanconf.py` file:

```python
REDIRECTS = {
    # "/old-path": "/new-path"
    "/old-article-path": "/new-article-path/",
    "/tags/old-tag.html": "/tag/new-tag/",
    "/category/old-category.html": "/category/new-category/",
}
```

## Extensionless URLs and Folder Structure 📁

One of the most powerful features of our plugin is that it can correctly redirect extensionless URLs. For example, you can seamlessly redirect a URL like `/old-article-path` to `/new-article-path/`.

For extensionless URLs, our plugin automatically creates a folder structure and places an `index.html` file inside it. This way, browsers can correctly process the redirection and no file download problem occurs.

## Turkish Characters and URL Encoding 🔤

Sometimes problems may occur with URLs containing Turkish characters. Our plugin supports both URL encoded and non-encoded versions. For example:

```python
REDIRECTS = {
    "/category/introduction.html": "/tag/introduction/",
    "/category/tan%C4%B1t%C4%B1m.html": "/tag/introduction/",
}
```

In this example, both "introduction" and encoded "tanıtım" URLs will be redirected to the same target.

## SEO Advantages 📈

There are many advantages to using this plugin for SEO:

1. **Link Value Preserved**: The value of links to old URLs is transferred to new pages.
2. **User Experience Improved**: Visitors reach the content directly instead of encountering a lost page error when clicking on old links.
3. **Search Engine Indexes Updated**: Search engines update their indexes by following 301/302 redirects.
4. **Social Media Shares Preserved**: Old links shared on social media continue to work.

## Troubleshooting 🛠️

If your redirects are not working as expected, check the following steps:

1. Check that the template file (`redirect.html`) is in the correct directory and uses the correct variables.
2. Make sure there is a `/` character at the beginning of URLs.
3. Pay attention to whether there is a `/` character at the end of extensionless URLs.
4. Restart Pelican and check the files created in the output directory.

## Conclusion 🎯

The Pelican Redirect plugin is a perfect solution to protect old links when you need to change the URL structure of your static site. It preserves your SEO value, improves user experience, and makes site maintenance easier.

Feel free to use the plugin in your own project and provide feedback. We are always working on new features and improvements to contribute to the open source community and develop your projects. 💪

**Note**: This plugin has been tested with Pelican 4.x and later versions. Some compatibility issues may occur with older versions.
