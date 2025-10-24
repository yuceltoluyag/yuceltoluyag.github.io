Title: Oh My Zsh Kurulumu ve Temel Ayarlar
Date: 2020-01-20 12:00
Modified: 2024-01-01
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh
Slug: oh-my-zsh-kurulumu-temel-ayarlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: Oh My Zsh'in kurulumu ve temel ayarlarının nasıl yapılacağını adım adım açıklıyoruz.
Translation: false
Status: published
Template: article
Image: images/oh-my-zsh-xl.webp

Merhaba! 😊

Bu makale, **Oh My Zsh** serisinin ilk bölümüdür. Bu seride Zsh shell'i ve Oh My Zsh framework'ünü nasıl kuracağımızı ve yapılandıracağımızı öğreneceğiz.

## Oh My Zsh Nedir?

Oh My Zsh, Zsh shell'i için geliştirilmiş açık kaynaklı bir framework'tür. Zsh'in güçlü özelliklerini kullanarak terminal deneyiminizi geliştirir.

### Özellikler:
- 🎨 **Temalar**: 200+ hazır tema
- 🔌 **Eklentiler**: 500+ eklenti
- ⚡ **Hızlı**: Otomatik tamamlama ve öneriler
- 🛠️ **Özelleştirilebilir**: Kolay konfigürasyon

## Kurulum

### 1. Zsh Kurulumu

Önce sisteminizde Zsh'in kurulu olduğundan emin olun:

```bash
# Ubuntu/Debian
sudo apt install zsh

# Arch Linux
sudo pacman -S zsh

# Fedora
sudo dnf install zsh
```

### 2. Oh My Zsh Kurulumu

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 3. Varsayılan Shell Olarak Ayarlama

```bash
chsh -s $(which zsh)
```

## Temel Ayarlar

### .zshrc Dosyası

Oh My Zsh kurulumu tamamlandıktan sonra `~/.zshrc` dosyası oluşturulur. Bu dosya Zsh'in yapılandırma dosyasıdır.

```bash
# Dosyayı düzenlemek için
nano ~/.zshrc
```

### Temel Konfigürasyon

```bash
# Tema ayarı
ZSH_THEME="robbyrussell"

# Eklentiler
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# Oh My Zsh güncellemelerini otomatik kontrol et
DISABLE_AUTO_UPDATE="false"
```

## Popüler Temalar

### 1. Robbyrussell (Varsayılan)
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

## Faydalı Eklentiler

### 1. Git Eklentisi
```bash
plugins=(git)
```
- Git durumu gösterimi
- Git alias'ları
- Branch bilgisi

### 2. Zsh Autosuggestions
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 3. Zsh Syntax Highlighting
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Sonraki Adımlar

Bu kurulum tamamlandıktan sonra:
- [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/) makalesini okuyabilirsiniz
- Özel alias'larınızı ekleyebilirsiniz
- Tema ve eklentileri özelleştirebilirsiniz

## Sorun Giderme

### Yaygın Sorunlar:

1. **Tema görünmüyor**: Terminal'inizde Unicode desteği olup olmadığını kontrol edin
2. **Eklentiler çalışmıyor**: `.zshrc` dosyasını yeniden yükleyin: `source ~/.zshrc`
3. **Renkler görünmüyor**: Terminal'inizde 256 renk desteği olduğundan emin olun

## Kaynaklar

- [Oh My Zsh Resmi Sitesi](https://ohmyz.sh/)
- [Zsh Dokümantasyonu](https://zsh.sourceforge.io/Doc/)
- [Oh My Zsh GitHub](https://github.com/ohmyzsh/ohmyzsh)

---

Bu makale **Oh My Zsh** serisinin ilk bölümüdür. Serinin devamı için diğer makaleleri takip edebilirsiniz.
