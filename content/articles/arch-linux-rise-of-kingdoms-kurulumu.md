Title: Arch Linux Üzerinde Rise of Kingdoms Kurulumu (Lutris ile)
Date: 2025-05-10 21:00
Modified: 2025-08-11 22:59
Category: Oyun
Tags: arch linux, rise of kingdoms, lutris, linux oyun, wine, çözümler, grafik hatası, çözünürlük
Slug: arch-linux-rise-of-kingdoms-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux'ta Rise of Kingdoms oynamak mümkün! Bu rehberde Lutris ile nasıl kurulum yapacağınızı ve yaşanan grafik sorunlarını nasıl çözeceğinizi adım adım anlatıyoruz.
Template: article
Image: images/rok-lutris-fps-test-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114989018351105207
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtg6okjdc27

## 🧐 Giriş: Neden Rise of Kingdoms'u Linux'ta Oynamalısınız?

Rise of Kingdoms, mobil çıkışlı ama Windows üzerinden PC'de de oynanabilen popüler bir strateji oyunu. Ancak Linux kullanıcıları için native bir destek sunulmuyor. Bu rehberde Arch Linux üzerinde **Lutris** kullanarak Rise of Kingdoms'u nasıl kuracağınızı, grafik sorunlarını nasıl çözeceğinizi ve sorunsuz bir deneyim için hangi ayarları yapmanız gerektiğini göstereceğiz.

## 🔧 1. Gerekli Bağımlılıkların Kurulumu

```bash
sudo pacman -S lutris wine winetricks
```

Tavsiye edilen:

```bash
yay -S wine-ge lutris winetricks
```

**Notlar:**

- `wine-ge` sürümü, oyunlarda daha stabil olabilir.
- Lutris sisteminizde yoksa AUR üzerinden kurabilirsiniz.

## 📀 2. Lutris Üzerinden Setup.exe Kurulumu

[responsive_img src="/images/rok-lutris-add-game-xl.webp" alt="lutris-add-game-local" /]

1. Lutris’i açın.
2. Sol alt köşeden “+" tuşuna tıklayın, ardından "Add a new game".
3. Wine runner seçin.
4. "Executable" kısmına `setup.exe` dosyasını gösterin.
5. Kurulum sihirbazını takip edin.

## ⚙️ 3. Wine Ayarlarının Optimize Edilmesi

### Yapılacak Ayarlar:

- Windows versiyonunu “Windows 10" yapın.
- DLL overrides kısmına `d3dcompiler_47` ve `vcrun2019` ekleyin.
- Gerekirse `winetricks` üzerinden:

```bash
winetricks corefonts vcrun2019 d3dcompiler_47
```

!!! note "<strong>Bu ayarları Lutris sizin için yapıyor. Olurda başka oyunlarda bir hatayla karşılaşırsanız, bu ayarları kendiniz yapabilirsiniz.</strong>"

## 🗅️ 4. Grafik Glitch ve Titreme Sorunlarının Giderilmesi

### Sorun:

- Siyah ekranlar
- Mouse ghosting
- Ekran titremesi

### Çözüm:

- Lutris runner seçeneklerinden DXVK’yi etkinleştirin.
- Lutris runner seçeneklerinden dgvoodoo2’yi etkinleştirin.
- Ayarlarınız resimdeki gibi olmalı.

[responsive_img src="/images/rok-lutris-enable-dxvk-xl.webp" alt="lutris-winecfg" /]

- Eğer yukarıdaki çözüm ile sorun devam ederse, aşağıdaki adımları izleyin.

* `DXVK_HUD=0` yaparak overlay’i kapatın.
* Oyunun çalıştırıldığı Wine prefix içinde şu dosyayı oluşturun veya düzenleyin:

```bash
nano ~/.config/lutris/runners/wine/default/user_settings.cfg
```

Ve içine şunu ekleyin:

```ini
[DXVK]
dxgi.customDeviceDesc = NVIDIA GeForce GTX 1050
dxgi.numBackBuffers = 2
```

## 🗄️ 5. Çözünürlük Problemlerine Özel Ayarlar

[responsive_img src="/images/rok-lutris-glitch-problem-xl.webp" alt="lutris-enable-Glitch-problem" /]

Oyunu `dgvoodoo2` **olmadan** çalıştırdığında ekranda kırılmalar,titreme,çözünürlük değiştirememe gibi sorunları yaşanabilir. `dgvoodoo2` etkinleştirdiğinizden emin olun. Etkinleştirdiğiniz halde sorun çözülmediyse, sorunu çözmek için aşağıdaki adımları izleyin.

### Adımlar:

- Lutris oyun ayarlarında "Run in a virtual desktop" kutusunu işaretleyin.
- Çözünürlüğü masaüstü çözünürlüğünüzle eşleştirin.
- `winecfg > Graphics` kısmından DPI değerini 100 olarak ayarlayın.

## 🥺 6. Test ve Stabilite Kontrolü

[responsive_img src="/images/rok-lutris-fps-test-xl.webp" alt="lutris-fps-overlay" /] Artık Oyun tıpkı Windows'ta gibi çalışıyor. Bütün herşeyi canlı yayında test ettik.

---

Eğer sorun çözülmediyse, aşağıdaki adımları izleyin.

- Oyun başladıktan sonra birkaç dakika oynayın.
- Ses, görüntü ve kontrolleri test edin.
- Lutris loglarını kontrol edin (`Right Click > Show Logs`).

## 💡 Ekstra İpuçları ve Öneriler

- MangoHud ile FPS ve sıcaklık takibi yapabilirsiniz.
- Proton GE sürümlerini test etmek isterseniz Lutris içinde runner’ı değiştirin.
- Oyunu harici bir klasöre kurarak yedekleme kolaylığı sağlayabilirsiniz.

## 📌 Sonuç

Linux kullanıcıları için Lutris büyük bir nimet. Rise of Kingdoms gibi native olmayan bir oyunu çalıştırmak ilk başta karmaşık gibi görünse de, bu adımları izlediğinizde kısa sürede sorunsuz bir oyun deneyimine ulaşabilirsiniz. Her şeyden önemlisi, bu süreç Linux'un gücünü ve esnekliğini tekrar tekrar gösteriyor.

## 📣 Sık Sorulan Sorular

- **Oyun açılmıyor, ne yapmalıyım?**
  Lutris loglarını kontrol edin, eksik DLL ya da DXVK sorunu olabilir.

- **Ses gelmiyor?**
  PulseAudio ya da PipeWire kurulumunu kontrol edin. `winecfg` üzerinden test edin.

- **FPS düşük?**
  DXVK, Vulkan driverlarınızın güncelliğini kontrol edin. NVIDIA kullanıcıları `nvidia-dkms` kullanmalı.

## Videolu rehber için:

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="u-_21BAuPlc"></lite-youtube>

-- Canlı yayında test ettik.

-- 1080p çözünürlükte çalışıyor.

-- 60 FPS veya daha üzerinde sorunsuz şekilde çalışıyor.

-- [/rise-of-kingdom-bot ](/veda-rise-of-kingdom-bot)

Canlı Yayın Tekrarı : [Canlı Yayın tekrarını izlemek için dıkla](https://kick.com/babapy/videos/2063d6f8-eba5-44af-8877-2ba34dd2d9c9){: target="\_blank" rel="noopener noreferrer"}
