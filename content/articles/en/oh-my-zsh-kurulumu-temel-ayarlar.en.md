Title: Oh My Zsh Installation and Basic Settings
Date: 2020-01-20 12:00
Modified: 2024-01-01
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh
Slug: oh-my-zsh-kurulumu-temel-ayarlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: We explain step by step how to install Oh My Zsh and configure basic settings.
Status: published
Template: article
Image: images/oh-my-zsh-setup-xl.webp
Lang: en

Hello! 😊

This article is the first part of the **Oh My Zsh** series. In this series, we will learn how to install and configure the Zsh shell and Oh My Zsh framework.

## What is Oh My Zsh?

Oh My Zsh is an open-source framework developed for the Zsh shell. It enhances your terminal experience by using Zsh's powerful features.

### Features:

- 🎨 **Themes**: 200+ ready-made themes
- 🔌 **Plugins**: 500+ plugins
- ⚡ **Fast**: Auto-completion and suggestions
- 🛠️ **Customizable**: Easy configuration

## Installation

### 1. Installing Zsh

First, make sure Zsh is installed on your system:

```bash
# Ubuntu/Debian
sudo apt install zsh

# Arch Linux
sudo pacman -S zsh

# Fedora
sudo dnf install zsh
```

### 2. Installing Oh My Zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 3. Setting as Default Shell

```bash
chsh -s $(which zsh)
```

## Basic Settings

### .zshrc File

After Oh My Zsh installation is complete, the `~/.zshrc` file is created. This file is the configuration file for Zsh.

```bash
# To edit the file
nano ~/.zshrc
```

### Basic Configuration

```bash
# Theme setting
ZSH_THEME="robbyrussell"

# Plugins
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# Automatically check for Oh My Zsh updates
DISABLE_AUTO_UPDATE="false"
```

## Popular Themes

### 1. Robbyrussell (Default)

```bash
ZSH_THEME="robbyrussell"
```

### 2. Powerlevel10k

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

### 3. Agnoster

```bash
ZSH_THEME="agnoster"
```

## Useful Plugins

### 1. Git Plugin

```bash
plugins=(git)
```

- Git status display
- Git aliases
- Branch information

### 2. Zsh Autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 3. Zsh Syntax Highlighting

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Next Steps

After this installation is complete:

- You can read the article [Using Shopt in Zsh](/zsh-icerisinde-shopt-kullanmak/)
- You can add your custom aliases
- You can customize themes and plugins

## Troubleshooting

### Common Issues:

1. **Theme not visible**: Check if your terminal supports Unicode
2. **Plugins not working**: Reload the `.zshrc` file: `source ~/.zshrc`
3. **Colors not visible**: Make sure your terminal supports 256 colors

## Resources

- [Oh My Zsh Official Site](https://ohmyz.sh/){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Documentation](https://zsh.sourceforge.io/Doc/){: target="\_blank" rel="noopener noreferrer"}
- [Oh My Zsh GitHub](https://github.com/ohmyzsh/ohmyzsh){: target="\_blank" rel="noopener noreferrer"}

---

This article is the first part of the **Oh My Zsh** series. You can follow other articles for the continuation of the series.
