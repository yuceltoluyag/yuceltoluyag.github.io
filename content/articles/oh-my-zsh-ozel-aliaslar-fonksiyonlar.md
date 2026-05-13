Title: Oh My Zsh Özel Alias'lar ve Fonksiyonlar
Date: 2020-02-05 12:00
Modified: 2025-10-26
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, alias, customization
Slug: oh-my-zsh-ozel-aliaslar-fonksiyonlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 3
Summary: Oh My Zsh'de özel alias'lar ve fonksiyonlar oluşturarak terminalinizi özelleştirin ve günlük işlerinizi hızlandırın.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/zsh-alias-xl.webp

Merhaba! 😊

Bu makale, **Oh My Zsh** serisinin üçüncü bölümüdür.  
Bu yazıda Oh My Zsh’de **özel alias’lar (kısayollar)** ve **fonksiyonlar (komut grupları)** oluşturarak terminal deneyiminizi nasıl hızlandırabileceğinizi öğreneceğiz.

---

## 🔹 Alias Nedir?

Alias, uzun komutları kısa isimlerle çağırmamızı sağlayan bir özelliktir.  
Örneğin `ls -la` komutunu `ll` olarak kısaltabiliriz.

Alias’lar sayesinde zamandan tasarruf eder, hata olasılığını azaltırsınız.

---

## 🧩 Alias ve Fonksiyon Arasındaki Fark

Alias genellikle **tek satırlık kısayollar** içindir.  
Fonksiyonlar ise **birden fazla komut** veya **koşullu işlem** içerir.

| Kullanım                                   | Önerilen Yapı |
| ------------------------------------------ | ------------- |
| Basit tekrar eden komutlar                 | `alias`       |
| Parametre alan veya mantık içeren işlemler | `function`    |

---

## ⚙️ Temel Alias'lar

### .zshrc Dosyasına Ekleme

```bash
# 🧭 Dosyayı düzenlemek için
nano ~/.zshrc
```

### Faydalı Alias'lar

```bash
# 📁 Dosya işlemleri
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# 🧩 Git alias'ları
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# ⚙️ Sistem alias'ları
alias df='df -h'
alias du='du -h'
alias free='free -h'
alias ps='ps aux'
alias top='htop'

# 📝 Editör alias'ları
alias v='vim'
alias n='nano'
alias c='code'
```

---

## 🧠 Özel Fonksiyonlar

### 1. Dizin Oluşturma ve Gitme

```bash
# 📂 Dizin oluşturup içine gir
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

Kullanım:

```bash
mkcd yeni-klasor
```

---

### 2. Dosya Arama ve Düzenleme

```bash
# 🔍 Dosya bulup düzenleme
findedit() {
    find . -name "*$1*" -type f | head -1 | xargs vim
}
```

Kullanım:

```bash
findedit config
```

---

### 3. Git Commit Mesajı ile Dosya Ekleme

```bash
# 💬 Git add ve commit
gac() {
    git add .
    git commit -m "$1"
}
```

Kullanım:

```bash
gac "Yeni özellik eklendi"
```

---

### 4. Sistem Bilgileri

```bash
# 🖥️ Sistem bilgilerini göster
sysinfo() {
    echo "=== Sistem Bilgileri ==="
    echo "İşletim Sistemi: $(uname -s)"
    echo "Çekirdek: $(uname -r)"
    echo "Mimari: $(uname -m)"
    echo "Hostname: $(hostname)"
    echo "Kullanıcı: $(whoami)"
    echo "Shell: $SHELL"
    echo "Zsh Versiyonu: $ZSH_VERSION"
}
```

---

## 🔌 Oh My Zsh Eklentileri ile Alias'lar

### Git Eklentisi Alias'ları

```bash
# Git alias'ları
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

### Docker Eklentisi Alias'ları

```bash
# Docker alias'ları
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

## 🎨 Özel Tema ile Alias Gösterimi (Powerlevel10k)

```bash
# .zshrc dosyasına ekleyin
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=3
```

Bu ayarlar uzun dizin yollarını kısaltır ve terminali daha temiz gösterir.

---

## 🧰 Alias Yönetimi

### Mevcut Alias'ları Görme

```bash
alias       # Tüm alias'ları listele
alias ll    # Belirli bir alias'ı kontrol et
```

### Alias'ı Kaldırma

```bash
unalias ll  # Geçici olarak kaldır
alias ll='ls -la'  # Yeniden tanımla
```

### Kalıcı Olarak Silme

`.zshrc` dosyasını açıp ilgili satırı silmeniz yeterli.

---

## 🧪 İleri Seviye Teknikler

### 1. Koşullu Alias'lar

```bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    alias open='xdg-open'
elif [[ "$OSTYPE" == "darwin"* ]]; then
    alias open='open'
fi
```

### 2. Parametreli Alias'lar

```bash
mkfile() {
    mkdir -p "$(dirname "$1")" && touch "$1"
}
```

### 3. Alias Zincirleme

```bash
alias llp='ll | grep -E "\.(py|js|html|css)$"'
```

---

## 🚀 Performans İpuçları

### 1. Lazy Loading

```bash
alias nvm='unalias nvm && source /usr/share/nvm/nvm.sh && nvm'
```

### 2. Fonksiyon vs Alias

```bash
alias ll='ls -la'  # Basit

ll() {              # Karmaşık
    if [[ $# -eq 0 ]]; then
        ls -la
    else
        ls -la "$@"
    fi
}
```

### 3. Zsh Profiler ile Başlangıç Süresi Ölçme

```bash
# Zsh başlatma süresini analiz et
zmodload zsh/zprof
zprof
```

---

## 🎯 Sonraki Adımlar

Bu makaleyi tamamladıktan sonra:

- Kendi alias ve fonksiyonlarınızı oluşturabilirsiniz
- Oh My Zsh eklentilerini keşfedebilirsiniz
- Terminalinizi kişisel bir araç haline getirebilirsiniz

👉 Sıradaki yazı: _“Oh My Zsh ile Plugin Yönetimi ve Tema Özelleştirme”_

---

## 📚 Seri İçindekiler

1. [Oh My Zsh Kurulumu ve Temel Ayarlar](/oh-my-zsh-kurulumu-temel-ayarlar/)
2. [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/)
3. **Oh My Zsh Özel Alias'lar ve Fonksiyonlar** (Bu makale)

---

## 🔗 Kaynaklar

- [Oh My Zsh Alias Dokümantasyonu](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Fonksiyon Dokümantasyonu](https://zsh.sourceforge.io/Doc/Release/Functions.html){: target="\_blank" rel="noopener noreferrer"}
- [Git Alias'ları](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases){: target="\_blank" rel="noopener noreferrer"}

---

Bu makale **Oh My Zsh** serisinin üçüncü bölümüdür.
Serinin diğer makalelerini de okuyarak Zsh’i profesyonel seviyede kullanmayı öğrenebilirsiniz.



