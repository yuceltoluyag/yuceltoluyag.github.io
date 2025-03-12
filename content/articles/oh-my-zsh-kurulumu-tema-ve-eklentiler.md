Title: Oh My ZSH Kurulumu (Tema ve Eklentiler Dahil)
Date: 2018-12-07 12:00 10:00
Modified: 2025-03-08 12:00
Category: Linux
Tags: linux, terminal, zsh
Slug: oh-my-zsh-kurulumu-tema-ve-eklentiler
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: Oh My ZSH kurulumu, tema ve eklenti ayarları hakkında detaylı rehber.
Translation: false
Status: published
Template: article
Image: images/oh_my_zsh.png



Merhaba! Uzun süredir **fish shell** kullanıyordum ancak **Oh My ZSH**'yi denemek istedim. Kurulum ve kullanım sırasında bazı hatalarla karşılaştım ve maalesef yeterince açıklayıcı Türkçe kaynak bulamadım. Resmi kaynaklardan edindiğim bilgilerle temiz bir kurulum gerçekleştirdim ve bu rehberi hazırladım. 🚀



## Kurulum

```bash
sudo apt-get install zsh # Debian tabanlı sistemler için
sudo pacman -S zsh # Arch tabanlı sistemler için
```

Şimdi, resmi sitede yer alan **curl** veya **wget** yöntemlerinden birini kullanarak yüklemeyi gerçekleştirebiliriz. Ben **curl** kullandım:

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s /usr/bin/zsh
```

## Bilgilendirme ℹ️

Bu işlem varsayılan kabuğunuzu **ZSH** olarak değiştirecektir. Kurulumdan sonra şifrenizi girin ve **bilgisayarı yeniden başlatın**.

Eğer kabuk değişmiyorsa, aşağıdaki adımları izleyin:

1. Önceden **fish** veya başka bir terminal eklentisi kurduysanız, bu durum soruna neden olabilir.
2. Aşağıdaki komut ile `/etc/passwd` dosyasını düzenleyerek varsayılan kabuğu değiştirebilirsiniz:

```bash
sudo nano /etc/passwd
```

Burada kullanıcı satırınızın sonunda `/bin/zsh` yazdığından emin olun. Değişiklikleri kaydedip çıkın. 📌

⚠️ **Uyarı:** Geçiş yaparken eski kabuğunuzu direkt silmeyin! Öncelikle aşağıdaki komutla varsayılan kabuğunuzu değiştirin, ardından eski kabuğunuzu kaldırabilirsiniz:

```bash
chsh -s /bin/bash
```
![oh-my-zsh](/images/oh_my_zsh.png)
## Oh My ZSH Tema Kurulumu 🎨

```bash
nano ~/.zshrc
```

Dosyanın içinde **ZSH_THEME="robbyrussell"** satırını bulun ve **beğendiğiniz temanın adını** girin. Örneğin:

```bash
ZSH_THEME="agnoster"
```

[ZSH Temaları](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes){: target="_blank" rel="noopener noreferrer"} arasından seçim yapabilirsiniz.

## Oh My ZSH Eklenti Kurulumu 🔌

Eklenti yüklemek için yine `~/.zshrc` dosyasını düzenleyin:

```bash
nano ~/.zshrc
```

Varsayılan olarak **plugins=(git)** şeklinde gelen satırı eklentilerle güncelleyin. Örneğin:

```bash
plugins=(git extract)
```

Burada `extract` eklentisini eklemiş olduk. Kaydedip çıktıktan sonra aşağıdaki komutu çalıştırarak değişiklikleri etkinleştirin:

```bash
source ~/.zshrc
```

🎯 Alternatif olarak terminali kapatıp açabilirsiniz.

## Sonuç ✅

Oh My ZSH'nin kurulumu, tema ve eklenti ayarlarını başarılı bir şekilde tamamladık. Aklınıza takılan sorular için yorum bırakabilirsiniz. Keyifli kullanımlar! 🤗

