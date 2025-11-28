Title: Playwright Installation on Arch Linux: Step-by-Step Guide 🐧
Date: 2025-08-16 17:00
Category: Linux
Tags: playwright, arch linux, e2e test, web test automation, playwright installation, aur
Slug: playwright-arch-linux-kurulum
Authors: yuceltoluyag
Status: published
Summary: We explain step by step the necessary steps, dependencies and solutions to possible problems for Playwright installation on Arch Linux. With this guide, you can easily prepare your E2E test environment.
Template: article
Image: images/playwright-report-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/115039808506283062
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lwjxyjgoss2t

**Playwright** has become very popular in recent years for end-to-end (E2E) testing of web applications. Being able to test different browsers such as Chromium, Firefox and WebKit with a single API provides great convenience. However, when it comes to installing Playwright on **Arch Linux**, things may not always go smoothly. Various dependencies, missing libraries and frequent package changes on AUR can prolong the installation process.

In this article, I will explain step by step how to install Playwright on Arch Linux based on my own experiences and community solutions. 🎯

---

## 1. What is Playwright and Why is it Used?

Let's start with a brief summary. **Playwright** is an open source test automation tool developed by Microsoft. Its main features:

- 🌐 Chromium, Firefox and WebKit support
- 🖥️ Headless (invisible) and headed (visible) mode support
- 📱 Mobile device simulation
- ⚡ Fast and reliable test automation

If you are a web developer or want to automate your CI/CD processes, Playwright will be very useful to you.

---

## 2. First Step: Installing Required Dependencies

If you try to install Playwright directly on Arch Linux, you will most likely encounter error messages about missing libraries. Therefore, we need to install the following dependencies first:

```bash
sudo pacman -S --needed core/nss core/nspr extra/at-spi2-core extra/libcups extra/libdrm \
  core/dbus extra/libxcb extra/libxkbcommon extra/libx11 extra/libxcomposite \
  extra/libxdamage extra/libxext extra/libxfixes extra/libxrandr extra/mesa \
  extra/pango extra/cairo extra/alsa-lib extra/xorg-server-xvfb
```

!!! note "Important These packages mostly meet the GUI-related needs of browsers. These dependencies are required even in headless mode."

---

## 3. Installing Playwright via AUR

After installing the basic dependencies, it's time to install Playwright. The most practical way for Arch Linux users is to install via AUR:

```bash
yay -S playwright
```

After the installation is complete, you will be able to use Playwright. However, real world experience shows that some libraries may still be missing. 😅

---

## 4. Missing Libraries and Solutions

I have collected the most common errors you may encounter after installation and their solutions below.

### 🔹 `libffi.so.7` and `libpcre.so.3` Errors

```bash
yay -S libffi7
sudo ln -s /usr/lib/libpcre.so /usr/lib/libpcre.so.3
```

### 🔹 `icu66` and `enchant`

```bash
yay -S icu66 enchant libffi7
sudo pacman -S woff2 hyphen
```

### 🔹 Missing `libwebp.so.6`

The old libwebp version is no longer available in AUR. There are two solutions:

1. **Compiling from Source**

```bash
git clone https://chromium.googlesource.com/webm/libwebp
cd libwebp
git checkout v0.5.2-rc2
./autogen.sh
./configure
make
sudo make install
sudo cp src/.libs/libwebp.so.6.0.2 /usr/lib/libwebp.so.6
```

2. **Using New libwebp Package**

```bash
yay -S libwebp
sudo ln -s /usr/lib/libwebp.so.7 /usr/lib/libwebp.so.6
```

### 🔹 `flite` Dependency

```bash
git clone https://github.com/festvox/flite.git
cd flite
./configure --enable-shared
make
make get_voices

sudo cp build/x86_64-linux-gnu/lib/*.so* /usr/lib
```

!!! warning "Warning The <code>flite1</code> package in AUR usually comes with missing libraries, so compiling manually is healthier."

### 🔹 `libxml2` Connection Issues

```bash
yay -S libxml2
cd /usr/lib
sudo ln -s libxml2.so.16.0.5 libxml2.so.2
```

---

## 5. For Those Who Want to Install Playwright with Pip 👩‍💻

If you don't want to bother with AUR, you can also install Playwright via `pip`:

```bash
pip install playwright
python -m playwright install
```

However, you may encounter dependency problems with this method as well. The commands given for Debian/Ubuntu are not valid for Arch. Still, you can complete the missing libraries with the steps above.

---

## 6. ImportError: `sync_playwright` Error

Another common problem is an import error like the following:

```python
from playwright import sync_playwright
```

This method is now obsolete. The correct way should be:

```python
from playwright.sync_api import sync_playwright
```

!!! tip "Hint Follow Playwright version notes. Import paths can change frequently."

---

## 7. Conclusion

Although Playwright installation on Arch Linux is a bit more troublesome compared to other distributions, it works smoothly after installing the correct dependencies. With the steps I shared in this guide:

- You installed the required dependencies ✅
- You installed Playwright via AUR ✅
- You fixed missing libraries ✅
- You found solutions to common errors ✅

Now you can test your web applications with Playwright with peace of mind. 🚀

What problems did you encounter while installing Playwright on Arch Linux? Don't forget to share in the comments! 😊

<div class="video-container">
  <video autoplay loop muted playsinline>
    <source src="/images/crm.webm" type="video/webm" />
  </video>
</div>

[responsive_img src="/images/playwright-report-xl.webp" alt="Playwright Active" /]