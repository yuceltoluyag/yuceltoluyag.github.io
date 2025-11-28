Title: How to Install Linux Themes (Gnome Shell and Extensions)
Date: 2018-09-21 12:30 10:00
Modified: 2025-08-11 22:59
Category: Masaüstü Ortamları
Tags: linux, unixporn
Slug: linux-tema-nasil-yuklenir
authors: yuceltoluyag
Summary: Installing themes on Linux is quite easy. In this guide, we explain step by step how to customize with Gnome Shell and extensions.
Status: published
Template: article
Image: images/linux-tema-nasil-yuklenir-gnome-shell-ve-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114982081917153180
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqdfn5qbk2f

Hello, I hadn't written anything to the blog for a long time. I had recorded a video while using Unity before, but time passed quickly with my hard disk breaking down and the hot weather. 😃 Installing themes on Linux is quite easy. Regardless of which distribution or desktop environment you use, the process is usually similar. For example, while `unity-tweak-tool` is used for Unity, `gnome-tweak-tool` is preferred for Gnome. During my XFCE period, we could make customizations directly (I may be wrong 🤔).

## 🌄 Sites I Use for Background (Wallpaper)

1. [Alpha](https://alpha.wallhaven.cc/latest){: target="\_blank" rel="noopener noreferrer"}
2. [InterfaceLIFT](https://interfacelift.com/wallpaper/downloads/date/any/){: target="\_blank" rel="noopener noreferrer"}
3. [DeviantArt (Rarely Used)](https://www.deviantart.com/customization/wallpaper/popular-24-hours/){: target="\_blank" rel="noopener noreferrer"}

---

## 🎨 Sources for Theme, Icons, Cursor and Shell

1. [DeviantArt](https://www.deviantart.com/customization/skins/linuxutil/desktopenv/gnome/gtk3/newest/?offset=0){: target="\_blank" rel="noopener noreferrer"}
2. [Gnome-Look](https://www.gnome-look.org/){: target="\_blank" rel="noopener noreferrer"}
3. [For XFCE Desktop](https://www.xfce-look.org/){: target="\_blank" rel="noopener noreferrer"}

Especially on DeviantArt, you can easily reach the content you want by making correct searches or using menus. The sites I mentioned above are generally up-to-date and organized sources.

I started using Gnome 3.x from Ubuntu 17.10 beta version. Therefore, my explanation will be for Gnome 3.x, but you can apply with the same logic on other desktop environments. 💡

---

## 🔌 Gnome Extensions

Gnome has an extension system. From [Gnome Extensions](https://extensions.gnome.org/){: target="\_blank" rel="noopener noreferrer"} site, you can learn how to add and manage extensions.

### 📌 Notes About Installation

- Instead of `Dash to Dock`, you can use `Plank`, but I don't recommend it.
- Not every theme is installed with `install.sh` script. The theme developer specifies the installation method in the comment lines.
- Fine-tuning tools become unnecessary after learning Linux file structure. In the video, I intentionally open the files to show where they are installed.
- **File Locations:**
  - **Fonts:** `~/.fonts`
  - **Icons & Cursor:** `~/.icons`
  - **Themes:** `~/.themes`
  - **Check where the files you downloaded before installation go!** 😏

```bash
cat /etc/*release  # To get version information
gnome-shell --version  # To learn Gnome version
```

- **If a window doesn't open when you click after minimizing**, run the following command in terminal:

```bash
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
```

😞 I miss my old Unity theme...
!!! note "Missing Images The topic is valid, but images related to the topic were deleted from my previous blog, so distribution images where I made customizations were also deleted."

🚀 With this guide, you can easily complete the theme installation process on Linux!

[responsive_img src="/images/linux-tema-nasil-yuklenir-gnome-shell-ve-xl.webp" alt="linux-tema-nasil-yuklenir-gnome-shell-ve" /]
