Title: Oh My Zsh Kurulumu (Tema ve Eklentiler Dahil)
Date: 2018-12-07 12:00
Modified: 2025-10-26 03:00
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, shell
Slug: oh-my-zsh-kurulumu-tema-ve-eklentiler
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: Oh My Zsh kurulumu, tema ve eklenti ayarları hakkında detaylı ve güncel bir rehber.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/oh-my-zsh-setup-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984008847657548
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvr6z465u22w

Merhaba! 👋

Uzun süredir **Fish Shell** kullanıyordum, ancak terminal deneyimimi daha fazla özelleştirmek için **Oh My Zsh**’yi denemek istedim.  
Kurulum sürecinde bazı hatalarla karşılaştım ve yeterince güncel Türkçe kaynak bulamayınca, kendi deneyimlerimi bu rehberde topladım. 🚀

---

## 🔧 Kurulum

Öncelikle **Zsh** kabuğunu yükleyelim:

```bash
sudo apt install zsh          # Debian/Ubuntu
sudo dnf install zsh          # Fedora
sudo pacman -S zsh            # Arch Linux
```

### Oh My Zsh’yi Yükleme

Oh My Zsh, Zsh için bir yapılandırma framework’üdür.
Kurulumu oldukça basittir — `curl` veya `wget` yöntemlerinden biriyle gerçekleştirebilirsiniz:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

veya

```bash
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

Kurulum tamamlandığında kabuğunuzu **Zsh** olarak değiştirin:

```bash
chsh -s $(which zsh)
```

🧠 **Not:** Değişikliklerin etkili olması için oturumu kapatıp yeniden açın veya sistemi yeniden başlatın.

---

## ⚙️ Kabuk Değiştirme Sorunu

Bazı sistemlerde varsayılan kabuk değişimi anında gerçekleşmeyebilir.
Böyle bir durumda `/etc/passwd` dosyasını manuel olarak düzenleyebilirsiniz:

```bash
sudo nano /etc/passwd
```

Kendi kullanıcı satırınızın sonunda `/bin/zsh` olduğundan emin olun.
Değişiklikleri kaydedip terminali yeniden başlatın.

> ⚠️ **Uyarı:** Kullandığınız eski shell’i (örneğin Bash veya Fish) kaldırmadan önce kabuğunuzu değiştirdiğinizden emin olun.

---

## 🎨 Tema Kurulumu

Kurulumdan sonra `.zshrc` dosyasını düzenleyelim:

```bash
nano ~/.zshrc
```

`ZSH_THEME` satırını bulun ve beğendiğiniz temayı seçin:

```bash
ZSH_THEME="agnoster"
```

Popüler temalardan bazıları:

- `agnoster` — minimal ve sade
- `powerlevel10k` — gelişmiş, özelleştirilebilir prompt
- `ys` — klasik ve hızlı

🔗 [Zsh Temaları Listesi (Resmi Wiki)](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes){: target="\_blank" rel="noopener noreferrer"}

💡 **Powerlevel10k Teması (Önerilir)**
Daha gelişmiş bir görünüm için aşağıdaki komutla Powerlevel10k’yi yükleyebilirsiniz:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Ardından `.zshrc` dosyasında:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

---

## 🔌 Eklenti (Plugin) Kurulumu

Oh My Zsh, yüzlerce eklentiyle terminal verimliliğini artırır.
Eklentileri etkinleştirmek için `.zshrc` dosyasını tekrar düzenleyin:

```bash
nano ~/.zshrc
```

`plugins` satırını bulun:

```bash
plugins=(git)
```

Ve yeni eklentileri ekleyin, örneğin:

```bash
plugins=(git extract z)
```

💡 Önerilen eklentiler:

- `git` → Git kısayolları
- `z` → Sık kullanılan dizinlere hızlı geçiş
- `extract` → Arşiv dosyalarını otomatik açma
- `colored-man` → Renkli man sayfaları
- `history-substring-search` → Geçmişte arama

Değişiklikleri etkinleştirmek için:

```bash
source ~/.zshrc
```

---

## 🚀 Bonus: Powerlevel10k Yapılandırması

İlk çalıştırmada Powerlevel10k otomatik olarak bir yapılandırma sihirbazı başlatır.
Görsel tercihlerinizi seçerek terminalinizi tamamen kişiselleştirebilirsiniz.

İstediğiniz zaman tekrar başlatmak için:

```bash
p10k configure
```

---

## 🧩 Sorun Giderme

- **Zsh başlatılmıyor:**
  → `chsh -s $(which zsh)` komutunu tekrar çalıştırın.
- **Tema bozuk görünüyor:**
  → Uyumlu bir font (örneğin “MesloLGS NF”) kullanın.
- **Eklenti yüklenmiyor:**
  → `.zshrc` dosyasında eklenti adlarının doğru yazıldığından emin olun.

---

## ✅ Sonuç

Artık sisteminizde **Oh My Zsh** kurulu, tema ve eklentiler etkin!
Terminaliniz hem daha güçlü hem de çok daha estetik bir hale geldi. ✨

Bir sonraki adımda, [özel alias’lar ve fonksiyonlar](/oh-my-zsh-ozel-aliaslar-fonksiyonlar/) ekleyerek Zsh deneyiminizi geliştirebilirsiniz.

---

## 🔗 Kaynaklar

- [Oh My Zsh Resmi Sitesi](https://ohmyz.sh){: target="\_blank" rel="noopener noreferrer"}
- [Oh My Zsh GitHub](https://github.com/ohmyzsh/ohmyzsh){: target="\_blank" rel="noopener noreferrer"}
- [Powerlevel10k Tema Rehberi](https://github.com/romkatv/powerlevel10k){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Plugin Listesi](https://github.com/unixorn/awesome-zsh-plugins){: target="\_blank" rel="noopener noreferrer"}

---

Bu makale **Oh My Zsh Serisi**’nin ilk bölümüdür:

1. **Oh My Zsh Kurulumu (Tema ve Eklentiler Dahil)** ✅
2. [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/)
3. [Oh My Zsh Özel Alias’lar ve Fonksiyonlar](/oh-my-zsh-ozel-aliaslar-fonksiyonlar/)

---
