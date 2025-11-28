Title: Installing Terminator, Git, Curl and Fish (Customizing the Terminal)
Date: 2018-12-01 14:00 10:00
Modified: 2025-08-11 22:59
Category: Terminal
Tags: terminal, linux, fish, git, curl
Slug: terminator-git-curl-fish-kurulumu
Authors: yuceltoluyag
Summary: Guide to installing and customizing Terminator, Git, Curl and Fish to make your Linux terminal more functional and aesthetic.
Status: published
Template: article
Image: images/terminator-git-curl-fish-kurulumu-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114982841774461789
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqog6hfyc2i


Hello! One of the areas we spend the most time on in Linux is the terminal. So how can we make our terminal more functional and aesthetic? This guide is perfect for you! 💪🚀

To make the terminal more efficient and enjoyable, we will use the **Terminator** and **Fish Shell** combination. This way:

- You can split your terminal horizontally and vertically.
- You can have advanced features like code coloring and auto-completion.
- You can view previously used commands more easily.
- You can give your terminal a whole new atmosphere with themes and plugins. 🎨

---

## 🛠 Installation Steps

First, let's install the necessary tools using the commands below:

### Installing Terminator

```bash
sudo apt-get install terminator
```

**Terminator** allows you to use multiple terminal windows on the same screen. It provides great convenience especially for developers.

### Installing Fish Shell

```bash
sudo apt-get install fish
fish
```

When you switch to Fish, you can see that the icon has changed. To set Fish as the default shell:

```bash
chsh -s /usr/bin/fish
```

After this process, when you log out and log back in, Fish will be used as the default shell. 🐟

---

## 🎨 Terminal Themes

If you care about visuals, you can change your terminal theme by following the steps below.

1. From the **iTerm2 Color Schemes** site, [choose a theme you like](http://iterm2colorschemes.com/){: target="\_blank" rel="noopener noreferrer"}.
2. To access the Terminator configuration file, run the following command:

```bash
sudo gedit ~/.config/terminator/config
```

3. Paste the theme codes you selected under the **profile** section.
4. Restart Terminator.

---

## 🎩 Advanced Customization with Oh My Fish

To customize Fish even more, you can use **Oh My Fish**:

```bash
curl -L https://get.oh-my.fish | fish
```

### 🎭 Theme Selection

[Check out Oh My Fish themes](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md){: target="\_blank" rel="noopener noreferrer"} and install a theme you like. For example:

```bash
omf install bobthefish
```

### 🛠 Plugin Installation

Oh My Fish offers various plugins. To install a plugin you like:

```bash
omf install plugin-name
```

[You can check out plugins here](https://github.com/oh-my-fish){: target="\_blank" rel="noopener noreferrer"}. 🤩

---

## 📺 Video Explanation

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="h78f3V4p09E"></lite-youtube>

[responsive_img src="/images/terminator-git-curl-fish-kurulumu-xl.webp" alt="terminator-git-curl-fish-installation" /]
