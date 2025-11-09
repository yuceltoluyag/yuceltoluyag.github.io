Title: Oh My Zsh Installation (Including Themes and Plugins)
Date: 2018-12-07 12:00
Modified: 2025-10-26 03:00
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, shell
Slug: oh-my-zsh-kurulumu-tema-ve-eklentiler
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: A detailed and up-to-date guide on Oh My Zsh installation, theme and plugin settings.
Status: published
Template: article
Image: images/oh-my-zsh-setup-xl.webp
Lang: en

Hello! 👋

I had been using **Fish Shell** for a long time, but I wanted to try **Oh My Zsh** to further customize my terminal experience.  
I encountered some errors during the installation process and couldn't find enough up-to-date Turkish resources, so I compiled my own experiences in this guide. 🚀

---

## 🔧 Installation

First, let's install the **Zsh** shell:

```bash
sudo apt install zsh          # Debian/Ubuntu
sudo dnf install zsh          # Fedora
sudo pacman -S zsh            # Arch Linux
```

### Installing Oh My Zsh

Oh My Zsh is a configuration framework for Zsh.
Installation is quite simple — you can perform it with either `curl` or `wget` methods:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

or

```bash
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

After installation is complete, change your shell to **Zsh**:

```bash
chsh -s $(which zsh)
```

🧠 **Note:** Log out and log back in or restart the system for changes to take effect.

---

## ⚙️ Shell Change Problem

On some systems, the default shell change may not take effect immediately.
In such cases, you can manually edit the `/etc/passwd` file:

```bash
sudo nano /etc/passwd
```

Make sure the end of your user line ends with `/bin/zsh`.
Save the changes and restart the terminal.

> ⚠️ **Warning:** Make sure you change your shell before removing your old shell (such as Bash or Fish).

---

## 🎨 Theme Installation

After installation, let's edit the `.zshrc` file:

```bash
nano ~/.zshrc
```

Find the `ZSH_THEME` line and select a theme you like:

```bash
ZSH_THEME="agnoster"
```

Some popular themes:

- `agnoster` — minimal and clean
- `powerlevel10k` — advanced, customizable prompt
- `ys` — classic and fast

🔗 [Zsh Themes List (Official Wiki)](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes){: target="\_blank" rel="noopener noreferrer"}

💡 **Powerlevel10k Theme (Recommended)**
For a more advanced look, you can install Powerlevel10k with the following command:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Then in the `.zshrc` file:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

---

## 🔌 Plugin Installation

Oh My Zsh increases terminal efficiency with hundreds of plugins.
To enable plugins, edit the `.zshrc` file again:

```bash
nano ~/.zshrc
```

Find the `plugins` line:

```bash
plugins=(git)
```

And add new plugins, for example:

```bash
plugins=(git extract z)
```

💡 Recommended plugins:

- `git` → Git shortcuts
- `z` → Quick navigation to frequently used directories
- `extract` → Automatic archive extraction
- `colored-man` → Colored man pages
- `history-substring-search` → Search in history

To activate changes:

```bash
source ~/.zshrc
```

---

## 🚀 Bonus: Powerlevel10k Configuration

Upon first run, Powerlevel10k automatically launches a configuration wizard.
You can fully personalize your terminal by selecting your visual preferences.

To restart it anytime:

```bash
p10k configure
```

---

## 🧩 Troubleshooting

- **Zsh not starting:**
  → Run `chsh -s $(which zsh)` command again.
- **Theme appears broken:**
  → Use a compatible font (e.g. "MesloLGS NF").
- **Plugin not loading:**
  → Make sure plugin names are correctly written in the `.zshrc` file.

---

## ✅ Conclusion

Now you have **Oh My Zsh** installed on your system, with themes and plugins enabled!
Your terminal has become both more powerful and much more aesthetic. ✨

In the next step, you can enhance your Zsh experience by adding [custom aliases and functions](/oh-my-zsh-ozel-aliaslar-fonksiyonlar/).

---

## 🔗 Resources

- [Oh My Zsh Official Site](https://ohmyz.sh){: target="\_blank" rel="noopener noreferrer"}
- [Oh My Zsh GitHub](https://github.com/ohmyzsh/ohmyzsh){: target="\_blank" rel="noopener noreferrer"}
- [Powerlevel10k Theme Guide](https://github.com/romkatv/powerlevel10k){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Plugin List](https://github.com/unixorn/awesome-zsh-plugins){: target="\_blank" rel="noopener noreferrer"}

---

This article is the first part of the **Oh My Zsh Series**:

1. **Oh My Zsh Installation (Including Themes and Plugins)** ✅
2. [Using Shopt in Zsh](/zsh-icerisinde-shopt-kullanmak/)
3. [Oh My Zsh Custom Aliases and Functions](/oh-my-zsh-ozel-aliaslar-fonksiyonlar/)

---
