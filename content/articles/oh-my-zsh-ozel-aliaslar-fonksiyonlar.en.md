Title: Oh My Zsh Custom Aliases and Functions
Date: 2020-02-05 12:00
Modified: 2025-10-26
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, alias, customization
Slug: oh-my-zsh-ozel-aliaslar-fonksiyonlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 3
Summary: Customize your terminal with custom aliases and functions in Oh My Zsh and speed up your daily tasks.
Translation: true
Status: published
Template: article
Image: images/zsh-alias-xl.webp
Lang: en

Hello! 😊

This article is the third part of the **Oh My Zsh** series.  
In this article, we'll learn how to speed up your terminal experience by creating **custom aliases (shortcuts)** and **functions (command groups)** in Oh My Zsh.

---

## 🔹 What is an Alias?

An alias is a feature that allows us to call long commands with short names.  
For example, we can shorten the `ls -la` command to `ll`.

With aliases, you save time and reduce the possibility of errors.

---

## 🧩 Difference Between Alias and Function

Alias is generally for **single-line shortcuts**.  
Functions, on the other hand, contain **multiple commands** or **conditional operations**.

| Usage                                   | Recommended Structure |
| ------------------------------------------ | ------------- |
| Simple repetitive commands                 | `alias`       |
| Operations that take parameters or contain logic | `function`    |

---

## ⚙️ Basic Aliases

### Adding to .zshrc File

```bash
# 🧭 To edit the file
nano ~/.zshrc
```

### Useful Aliases

```bash
# 📁 File operations
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# 🧩 Git aliases
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# ⚙️ System aliases
alias df='df -h'
alias du='du -h'
alias free='free -h'
alias ps='ps aux'
alias top='htop'

# 📝 Editor aliases
alias v='vim'
alias n='nano'
alias c='code'
```

---

## 🧠 Custom Functions

### 1. Creating Directory and Going Inside

```bash
# 📂 Create directory and enter
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

Usage:

```bash
mkcd new-folder
```

---

### 2. Finding and Editing Files

```bash
# 🔍 Find and edit file
findedit() {
    find . -name "*$1*" -type f | head -1 | xargs vim
}
```

Usage:

```bash
findedit config
```

---

### 3. Git Commit Message with File Addition

```bash
# 💬 Git add and commit
gac() {
    git add .
    git commit -m "$1"
}
```

Usage:

```bash
gac "New feature added"
```

---

### 4. System Information

```bash
# 🖥️ Show system information
sysinfo() {
    echo "=== System Information ==="
    echo "Operating System: $(uname -s)"
    echo "Kernel: $(uname -r)"
    echo "Architecture: $(uname -m)"
    echo "Hostname: $(hostname)"
    echo "User: $(whoami)"
    echo "Shell: $SHELL"
    echo "Zsh Version: $ZSH_VERSION"
}
```

---

## 🔌 Oh My Zsh Plugin Aliases

### Git Plugin Aliases

```bash
# Git aliases
g=git
gaa=git add --all
gcmsg=git commit -m
gco=git checkout
gcb=git checkout -b
gcm=git checkout main
gcp=git cherry-pick
gd=git diff
gfa=git fetch --all --prune
gl=git pull
glg=git log --oneline --decorate --graph
glgg=git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
gp=git push
gst=git status
```

### Docker Plugin Aliases

```bash
# Docker aliases
d=docker
dbl=docker build
dc=docker-compose
dco=docker-compose
dcb=docker-compose build
dce=docker-compose exec
dcps=docker-compose ps
dcr=docker-compose run
dcu=docker-compose up
dcud=docker-compose up -d
```

---

## 🎨 Custom Theme Alias Display (Powerlevel10k)

```bash
# Add to .zshrc file
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=3
```

These settings shorten long directory paths and make the terminal cleaner.

---

## 🧰 Alias Management

### Viewing Existing Aliases

```bash
alias       # List all aliases
alias ll    # Check a specific alias
```

### Removing Alias

```bash
unalias ll  # Remove temporarily
alias ll='ls -la'  # Redefine
```

### Deleting Permanently

Simply open the `.zshrc` file and delete the relevant line.

---

## 🧪 Advanced Techniques

### 1. Conditional Aliases

```bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    alias open='xdg-open'
elif [[ "$OSTYPE" == "darwin"* ]]; then
    alias open='open'
fi
```

### 2. Parameterized Aliases

```bash
mkfile() {
    mkdir -p "$(dirname "$1")" && touch "$1"
}
```

### 3. Alias Chaining

```bash
alias llp='ll | grep -E "\.(py|js|html|css)$"'
```

---

## 🚀 Performance Tips

### 1. Lazy Loading

```bash
alias nvm='unalias nvm && source /usr/share/nvm/nvm.sh && nvm'
```

### 2. Function vs Alias

```bash
alias ll='ls -la'  # Simple

ll() {              # Complex
    if [[ $# -eq 0 ]]; then
        ls -la
    else
        ls -la "$@"
    fi
}
```

### 3. Measuring Startup Time with Zsh Profiler

```bash
# Analyze zsh startup time
zmodload zsh/zprof
zprof
```

---

## 🎯 Next Steps

After completing this article:

- You can create your own aliases and functions
- You can explore Oh My Zsh plugins
- You can turn your terminal into a personal tool

👉 Next article: _"Oh My Zsh Plugin Management and Theme Customization"_

---

## 📚 Series Contents

1. [Oh My Zsh Installation and Basic Settings](/oh-my-zsh-kurulumu-temel-ayarlar/)
2. [Using Shopt in Zsh](/zsh-icerisinde-shopt-kullanmak/)
3. **Oh My Zsh Custom Aliases and Functions** (This article)

---

## 🔗 Resources

- [Oh My Zsh Alias Documentation](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet){: target="_blank" rel="noopener noreferrer"}
- [Zsh Function Documentation](https://zsh.sourceforge.io/Doc/Release/Functions.html){: target="_blank" rel="noopener noreferrer"}
- [Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases){: target="_blank" rel="noopener noreferrer"}

---

This article is the third part of the **Oh My Zsh** series.
You can read other articles in the series to learn how to use Zsh at a professional level.