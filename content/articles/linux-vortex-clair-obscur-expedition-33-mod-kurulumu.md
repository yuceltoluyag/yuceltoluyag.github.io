Title: Linux’ta Vortex ile Clair Obscur: Expedition 33 Mod Kurulumu Rehberi
Date: 2025-10-14 19:00
Category: Oyun
Tags: linux, vortex, nexusmods, clairobscur, proton, wine, modlama
Slug: linux-vortex-clair-obscur-expedition-33-mod-kurulumu
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Linux'ta Vortex ve Proton kullanarak Clair Obscur: Expedition 33 modlarını güvenli ve sorunsuz bir şekilde kurmanın adım adım rehberi. ENOTDIR hatalarını çözün, oyun dosyalarını taşıyın ve konsol sorunlarını giderin.
Template: article
Image: images/linux-vortex-clair-obscur-expedition-33-mod-kurulumu-lg.webp
toot: https://mastodon.social/@yuceltoluyag/115364084679074024
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m2zyajubwc2h

Linux oyuncuları için modlama çoğu zaman Windows kullanıcılarına göre daha zorlu bir süreçtir. Özellikle Proton veya Wine üzerinden çalışan oyunlarda dosya yollarının farklılığı, Vortex gibi mod yöneticilerinin **ENOTDIR** gibi hatalar vermesine yol açabilir.
Bu rehberde, **Clair Obscur: Expedition 33** oyunu için Vortex ve Nexus Mods kullanarak mod kurulumunu **Linux ortamında sorunsuz** şekilde nasıl yapabileceğinizi adım adım göstereceğiz.

---

## 1️⃣ Sorunun Kaynağı: ENOTDIR ve Dosya Yolu Uyuşmazlıkları

Vortex, Windows dosya sistemi mantığına göre tasarlanmıştır. Normalde şu yolu kullanır:

```bash
C:\users\steamuser\AppData\Local\Sandfall
```

Ancak Linux’ta Proton veya Wine ortamında bu yolun karşılığı şöyledir:

```bash
/home/kullanici/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/users/steamuser/AppData/Local/Sandfall
```

💥 Eğer bu klasör yerine yanlışlıkla bir **dosya** varsa, şu hatayı alırsınız:

```bash
ENOTDIR: not a directory
```

!!! note "Bu hata, Vortex’in beklediği klasör yapısının bir dosya ile çakıştığını gösterir. Genellikle yanlış bağlama (symlink) veya eksik dizin yapısından kaynaklanır."

Bu durumda **symlink (sembolik bağlantı)** veya **bind mount** kullanabilirsiniz. Ancak bazı modlar IO-Store üzerinden fiziksel dosya kontrolü yaptığı için **dosyaları gerçekten taşımak** daha güvenli bir çözümdür.

---

## 2️⃣ Güvenli Adım: Oyunun Yedeğini Almak

Modlama işlemi öncesi mutlaka oyun dosyalarınızı ve kayıtlarınızı yedekleyin:

```bash
cp -r "/mnt/steam_depo/BaBaGames/Clair Obscur Expedition 33" "/home/friday13/backup/Clair Obscur Expedition 33"
```

!!! danger "Yedek almadan yapılan değişiklikler geri alınamaz hale gelebilir. Özellikle `.sav` uzantılı kayıt dosyaları kritik öneme sahiptir."

---

## 3️⃣ Oyunu Vortex’in PFX “C Drive" Klasörüne Taşımak

Linux’ta Vortex, oyunları kendi Proton/Wine pfx ortamında yönetir. Bu klasör genellikle şu yerdedir:

```bash
~/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/
```

Oyunu buraya taşıyarak Vortex’in doğru şekilde algılamasını sağlayabilirsiniz:

```bash
mv "/mnt/steam_depo/BaBaGames/Clair Obscur Expedition 33" \
   "/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/"
```

!!! tip "Eğer dosya izinleriyle ilgili hata alırsanız, komutun başına <code>sudo</code> ekleyebilirsiniz. Ancak mümkünse kullanıcı izinlerini değiştirmek yerine kendi hesabınızla işlem yapın."

---

## 4️⃣ Vortex’e Oyunun Yolunu Elle Tanıtmak

Oyunu taşıdıktan sonra Vortex’te oyun yolunu güncelleyin:

**Windows görünümü:**

```bash
C:\Games\Clair Obscur Expedition 33\game\game.exe
```

**Linux karşılığı:**

```bash
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Clair Obscur Expedition 33/game/game.exe
```

---

## 5️⃣ Modları Doğru Konuma Yerleştirmek

Vortex, modları “staging folder" denilen geçici bir klasörde depolar. Doğru dizin yapısı şu şekilde olmalıdır:

**Windows’ta:**

```bash
C:\Games\Vortex Mods\clairobscurexpedition33
```

**Linux’ta:**

```bash
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Vortex Mods/clairobscurexpedition33
```

> Symlink kullanarak bu klasörü Vortex’in beklediği yere bağlayabilirsiniz. Ancak güvenli bir kurulum istiyorsanız modları doğrudan bu dizine kopyalamanız önerilir.

---

## 6️⃣ Son Kontroller ve Test

1. Vortex’i yeniden başlatın.
2. Oyunu “Modlu" olarak başlatın.
3. “ENOTDIR" hatası görünmüyorsa kurulum başarılı demektir.

!!! note "Modlar yüklenmiyorsa staging folder ve oyun dizinlerini kontrol edin. Yanlış dosya izinleri veya eksik dizinler sorun çıkarabilir."

---

## 🧩 Sandfall Dosyası Bulunamadı Hatası

Bazı durumlarda Vortex “Sandfall" klasörünü bulamayabilir. Bunu düzeltmek için sembolik bağlantı oluşturun:

```bash
ln -sf /home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Clair\ Obscur\ Expedition\ 33/game/prefix/drive_c/users/steamuser/Local\ Settings/Application\ Data/Sandfall/ \
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/users/steamuser/AppData/Local
```

---

## 🧰 Konsol (Dev Console) Açılmıyor Sorunu

Bazı modlar veya Unreal Engine oyunları konsolu `~` (tilde) tuşuna atar.
Linux’ta bu tuşun keycode karşılığı genellikle **35**’tir.

```bash
setxkbmap -query
```

Çıktıda `layout: tr` görüyorsanız, `keycode 35` muhtemelen `asciitilde` tuşudur.
Bunu tanıtmak için şu komutu girin:

```bash
xmodmap -e "keycode 35 = grave asciitilde"
```

Bu değişiklik kalıcı olsun istiyorsanız `~/.profile` dosyanıza ekleyin:

```bash
# Kalıcı Tilde Fix
xmodmap -e "keycode 35 = grave asciitilde"
```

Artık oyun konsolunu `AltGr + ö` veya doğrudan `~` ile açabilirsiniz. ✅

---

## 🔚 Sonuç

- **ENOTDIR** hatası genellikle dosya yolu karışıklığından kaynaklanır.
- Oyun dosyalarını Vortex’in **pfx ortamına taşıyın.**
- Mod klasörlerini doğru staging dizinine yerleştirin.
- Gerekirse `xmodmap` ile konsol tuşunu tanımlayın.

Bu adımları uyguladığınızda **Clair Obscur: Expedition 33** oyununda Linux üzerinde sorunsuz bir mod deneyimi yaşayabilirsiniz. 🧠🎮

---

## 📎 Faydalı Makaleler

- [Linux’ta Oyunlara Türkçe Yama Nasıl Kurulur?](/linux-oyunlara-turkce-yama-kurulumu/)
- [Cyberpunk 2077 Linux'ta Mod Kurulum Rehberi](/cyberpunk-2077-linux-mod-kurulum-rehberi)
- [WinePrefix Nedir ve Nasıl Kullanılır?](/wineprefix-nedir-nasil-kullanilir)

---

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="23E4RxRsG_o"></lite-youtube>

---

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="9-V718wNWXU"></lite-youtube>



