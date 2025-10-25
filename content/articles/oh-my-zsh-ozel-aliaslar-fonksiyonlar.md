Title: Oh My Zsh Özel Alias'lar ve Fonksiyonlar
Date: 2020-02-05 12:00
Modified: 2024-01-01
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, alias
Slug: oh-my-zsh-ozel-aliaslar-fonksiyonlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 3
Summary: Oh My Zsh'de özel alias'lar ve fonksiyonlar oluşturmayı ve kullanmayı öğreniyoruz.
Translation: false
Status: published
Template: article
Image: images/zsh-alias-xl.webp

Merhaba! 😊

Bu makale, **Oh My Zsh** serisinin üçüncü bölümüdür. Bu bölümde Oh My Zsh'de özel alias'lar ve fonksiyonlar oluşturmayı öğreneceğiz.

## Alias Nedir?

Alias, uzun komutları kısa isimlerle çağırmamızı sağlayan bir özelliktir. Örneğin `ls -la` komutunu `ll` olarak kısaltabiliriz.

## Temel Alias'lar

### .zshrc Dosyasına Ekleme

```bash
# Dosyayı düzenlemek için
nano ~/.zshrc
```

### Faydalı Alias'lar

```bash
# Dosya işlemleri
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Git alias'ları
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# Sistem alias'ları
alias df='df -h'
alias du='du -h'
alias free='free -h'
alias ps='ps aux'
alias top='htop'

# Editör alias'ları
alias v='vim'
alias n='nano'
alias c='code'
```

## Özel Fonksiyonlar

### 1. Dizin Oluşturma ve Gitme

```bash
# .zshrc dosyasına ekleyin
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

Kullanım:
```bash
mkcd yeni-klasor
```

### 2. Dosya Arama ve Düzenleme

```bash
# Dosya bulup düzenleme
findedit() {
    find . -name "*$1*" -type f | head -1 | xargs vim
}
```

Kullanım:
```bash
findedit config
```

### 3. Git Commit Mesajı ile Dosya Ekleme

```bash
# Git add ve commit
gac() {
    git add .
    git commit -m "$1"
}
```

Kullanım:
```bash
gac "Yeni özellik eklendi"
```

### 4. Sistem Bilgileri

```bash
# Sistem bilgilerini gösterme
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

## Oh My Zsh Eklentileri ile Alias'lar

### Git Eklentisi Alias'ları

Git eklentisi aktifken kullanabileceğiniz alias'lar:

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

## Özel Tema ile Alias Gösterimi

### Powerlevel10k ile Alias Gösterimi

```bash
# .zshrc dosyasına ekleyin
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=3
```

## Alias Yönetimi

### Mevcut Alias'ları Görme

```bash
# Tüm alias'ları listele
alias

# Belirli bir alias'ı kontrol et
alias ll
```

### Alias'ı Geçici Olarak Kaldırma

```bash
# Geçici olarak kaldır
unalias ll

# Yeniden tanımla
alias ll='ls -la'
```

### Alias'ı Kalıcı Olarak Kaldırma

```bash
# .zshrc dosyasından kaldır
nano ~/.zshrc
# İlgili satırı sil veya yorum satırı yap
```

## İleri Seviye Teknikler

### 1. Koşullu Alias'lar

```bash
# Sadece belirli koşullarda çalışan alias
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    alias open='xdg-open'
elif [[ "$OSTYPE" == "darwin"* ]]; then
    alias open='open'
fi
```

### 2. Parametreli Alias'lar

```bash
# Parametreli fonksiyon
mkfile() {
    mkdir -p "$(dirname "$1")" && touch "$1"
}
```

### 3. Alias Zincirleme

```bash
# Birden fazla komutu zincirleme
alias llp='ll | grep -E "\.(py|js|html|css)$"'
```

## Performans İpuçları

### 1. Lazy Loading

```bash
# Sadece gerektiğinde yükle
alias nvm='unalias nvm && source /usr/share/nvm/nvm.sh && nvm'
```

### 2. Fonksiyon vs Alias

```bash
# Alias (basit)
alias ll='ls -la'

# Fonksiyon (karmaşık)
ll() {
    if [[ $# -eq 0 ]]; then
        ls -la
    else
        ls -la "$@"
    fi
}
```

## Sonraki Adımlar

Bu makaleyi tamamladıktan sonra:
- Kendi alias'larınızı oluşturabilirsiniz
- Oh My Zsh eklentilerini keşfedebilirsiniz
- Terminal deneyiminizi özelleştirebilirsiniz

## Seri İçindekileri

1. [Oh My Zsh Kurulumu ve Temel Ayarlar](/oh-my-zsh-kurulumu-temel-ayarlar/)
2. [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/)
3. **Oh My Zsh Özel Alias'lar ve Fonksiyonlar** (Bu makale)

## Kaynaklar

- [Oh My Zsh Alias Dokümantasyonu](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet)
- [Zsh Fonksiyon Dokümantasyonu](https://zsh.sourceforge.io/Doc/Release/Functions.html)
- [Git Alias'ları](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)

---

Bu makale **Oh My Zsh** serisinin üçüncü bölümüdür. Serinin diğer makalelerini de okuyarak Oh My Zsh'i tam olarak öğrenebilirsiniz.
