Title: Linux Tema Nasıl Yüklenir (Gnome Shell ve Eklentileri)
Date: 2018-09-21 12:30 10:00
Modified: 2025-08-11 22:59
Category: Masaüstü Ortamları
Tags: linux, unixporn
Slug: linux-tema-nasil-yuklenir
authors: yuceltoluyag
Summary: Linux'ta tema yükleme işlemi oldukça basittir. Gnome Shell ve eklentileri kullanarak nasıl özelleştirme yapabileceğinizi bu rehberde adım adım anlatıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/linux-tema-nasil-yuklenir-gnome-shell-ve-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982081917153180
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqdfn5qbk2f

Merhaba, uzun süredir bloga bir şeyler yazmıyordum. Daha önce Unity kullanırken video çekmiştim, ancak sabit diskimin bozulması ve sıcak hava derken günler hızla geçti. 😃 Linux'ta tema yükleme işlemi oldukça kolaydır. Hangi dağıtımı veya masaüstü ortamını kullanıyor olursanız olun, süreç genellikle benzerdir. Örneğin, Unity için `unity-tweak-tool` kullanılırken, Gnome için `gnome-tweak-tool` tercih edilmektedir. XFCE kullandığım dönemde, özelleştirmeleri doğrudan yapabiliyorduk (yanılıyor olabilirim 🤔).

## 🌄 Arka Plan (Wallpaper) için Kullandığım Siteler

1. [Alpha](https://alpha.wallhaven.cc/latest){: target="\_blank" rel="noopener noreferrer"}
2. [InterfaceLIFT](https://interfacelift.com/wallpaper/downloads/date/any/){: target="\_blank" rel="noopener noreferrer"}
3. [DeviantArt (Sık Kullanılmıyor)](https://www.deviantart.com/customization/wallpaper/popular-24-hours/){: target="\_blank" rel="noopener noreferrer"}

---

## 🎨 Tema, İkon, İmleç ve Shell İçin Kaynaklar

1. [DeviantArt](https://www.deviantart.com/customization/skins/linuxutil/desktopenv/gnome/gtk3/newest/?offset=0){: target="\_blank" rel="noopener noreferrer"}
2. [Gnome-Look](https://www.gnome-look.org/){: target="\_blank" rel="noopener noreferrer"}
3. [XFCE Masaüstü İçin](https://www.xfce-look.org/){: target="\_blank" rel="noopener noreferrer"}

Özellikle DeviantArt'ta doğru aramalar yaparak veya menüleri kullanarak istediğiniz içeriğe kolayca ulaşabilirsiniz. Yukarıda belirttiğim siteler genellikle güncel ve organize edilmiş kaynaklardır.

Ubuntu 17.10 beta sürümünden itibaren Gnome 3.x kullanmaya başladım. Bu nedenle anlatımım Gnome 3.x için olacak, ancak aynı mantıkla diğer masaüstü ortamlarında da uygulayabilirsiniz. 💡

---

## 🔌 Gnome Eklentileri

Gnome'un bir eklenti sistemi bulunmaktadır. [Gnome Eklentileri](https://extensions.gnome.org/){: target="\_blank" rel="noopener noreferrer"} sitesinden nasıl eklenti ekleyebileceğinizi ve yönetebileceğinizi öğrenebilirsiniz.

### 📌 Kurulumla İlgili Notlar

- `Dash to Dock` yerine `Plank` kullanabilirsiniz, ancak tavsiye etmiyorum.
- Her tema `install.sh` komut dosyasıyla yüklenmez. Tema geliştiricisi yükleme yöntemini açıklama satırlarında belirtir.
- İnce ayar araçları, Linux dosya yapısını öğrendikten sonra gereksiz hale gelir. Videoda bilinçli olarak dosyaları açarak nereye yüklendiklerini gösteriyorum.
- **Dosya Konumları:**
  - **Fontlar:** `~/.fonts`
  - **İkon & İmleç:** `~/.icons`
  - **Temalar:** `~/.themes`
  - **Kurulum öncesi indirdiğiniz dosyaların nereye gittiğini kontrol edin!** 😏

```bash
cat /etc/*release  # Sürüm bilgisi almak için
gnome-shell --version  # Gnome sürümünü öğrenmek için
```

- **Bir pencere küçültüldüğünde tekrar tıkladığınızda açılmıyorsa**, aşağıdaki komutu terminalde çalıştırın:

```bash
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
```

😞 Eski Unity temamı özlüyorum...
!!! note "Eksik Görseller Konu geçerli olup, konuya ait görseller önceki blogumdan silindiği için, özelleştirme yaptığım dağıtım resimleri de silindi."

🚀 Bu rehber ile Linux'ta tema yükleme sürecini rahatça tamamlayabilirsiniz!

[responsive_img src="/images/linux-tema-nasil-yuklenir-gnome-shell-ve-xl.webp" alt="linux-tema-nasil-yuklenir-gnome-shell-ve" /]



