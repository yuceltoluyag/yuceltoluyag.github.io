Title: Arch Linux Üzerinde RetroArch Kurulumu ve Yapılandırılması
Date: 2025-03-01 10:00 10:00
Modified: 2025-03-01 12:00
Category: linux
Tags: archlinux, retroarch, emulator, oyun, yazılım
Slug: arch-linux-uzerinde-retroarch-kurulumu
Authors: yuceltoluyag
Summary: Arch Linux üzerinde RetroArch kurulumu ve yapılandırmasını adım adım anlatan rehber.
Translation: false
Status: published
Template: article
Image: images/retroarch.webp

![RetroArch](/images/retroarch.webp)


## RetroArch Kurulumu ve Yapılandırılması 🎮

Arch Linux üzerinde RetroArch'ı kurmak ve yapılandırmak isteyenler için kapsamlı bir rehber hazırladık. RetroArch, geniş platform desteği ve esnek yapısıyla oyun severlere benzersiz bir deneyim sunuyor. İşte öne çıkan özellikleri:

- Çoklu geçişli shader desteği 🎨
- Gerçek zamanlı geri sarma ⏪
- FFmpeg ile video kaydı 🎥
- Oyun kumandasıyla kontrol edilebilen kullanıcı dostu arayüz 🎮

---

## 1️⃣ RetroArch Kurulumu

RetroArch'ı Arch Linux üzerinde kurmak için aşağıdaki komutu çalıştırın:

```bash
sudo pacman -S retroarch retroarch-assets-xmb libretro-core-info libretro-overlays libretro-shaders
```

### Paket Açıklamaları:
- **retroarch-assets-xmb**: RetroArch için grafik ve arayüz dosyaları.
- **retroarch-assets-ozone**: Masaüstü dostu bir RetroArch arayüzü.
- **libretro-core-info**: Emülatör çekirdekleri hakkında bilgi dosyaları.
- **libretro-overlays**: Retro oyunlar için kaplamalar.
- **libretro-shaders**: Grafik efektleri (gölgelendiriciler).

---

## 2️⃣ RetroArch'ı İlk Kez Çalıştırma

Kurulum tamamlandıktan sonra RetroArch'ı başlatmak için şu komutu kullanabilirsiniz:

```bash
retroarch
```

Başlatma ekranında temel ayarları yapılandırarak ihtiyacınıza göre özelleştirebilirsiniz.

---

## 3️⃣ Temel Yapılandırma ⚙️

### Konfigürasyon Dosyası
RetroArch’ın tüm ayarları şu dosyada bulunur:

```bash
~/.config/retroarch/retroarch.cfg
```

Bu dosyada yapabileceğiniz bazı temel ayarlar:
- **Video Ayarları**: Oyun içindeki çözünürlük ve ekran modu.
- **Ses Ayarları**: ALSA veya PulseAudio gibi ses sürücülerini seçme.
- **Girdi (Input) Ayarları**: Klavye ve joystick kontrollerini yapılandırma.

#### Örnek Yapılandırmalar
Eğer RetroArch bileşenlerini kullanıcı dizininde kullanıyorsanız:

```bash
libretro_directory = "~/.config/retroarch/cores"
libretro_info_path = "~/.config/retroarch/cores/info"
```

Sistem genelinde kullanıyorsanız:

```bash
assets_directory = "/usr/share/retroarch/assets"
libretro_info_path = "/usr/share/libretro/info"
libretro_directory = "/usr/lib/libretro"
```

---

## 4️⃣ Çekirdek (Core) Yükleme 🛠️

RetroArch, oyunları çalıştırmak için emülatör çekirdekleri kullanır. Çekirdek yüklemek için aşağıdaki yöntemleri kullanabilirsiniz:

### Online Updater ile Çekirdek Yükleme
1. RetroArch'ı açın.
2. **Main Menu > Online Updater > Core Updater** adımlarını takip edin.
3. İstediğiniz çekirdeği seçip indirin.

### Manuel Çekirdek Yükleme
Çekirdekleri AUR üzerinden yüklemek için:

```bash
yay -S libretro-core-info
```

Belli bir çekirdek ve oyunla çalıştırmak için:

```bash
retroarch --libretro /path/to/some_core_libretro.so /path/to/rom
```

---

## 5️⃣ Grafik Gölgelendiriciler ve Kaplamalar 🎨

Oyun deneyiminizi geliştirmek için shader ve overlay kullanabilirsiniz:
- **Shaders**: CRT ve scanline gibi efektler ekler.
- **Overlays**: Retro konsolların çerçeve tasarımlarını taklit eder.

Bu ayarları **Settings > Video > Output** menüsünden yapılandırabilirsiniz.

---

## 6️⃣ Girdi ve Kontrol Ayarları 🎮

Klavye ve joystick kontrolleri **Settings > Input** menüsünden ayarlanabilir. Çoğu joystick cihazı otomatik olarak algılanır, ancak manuel yapılandırma da mümkündür:

```bash
~/.config/retroarch/autoconfig/<joystick_adı>.cfg
```

---

## 7️⃣ Sistem Performansını Artırma 🚀

RetroArch performansını optimize etmek için şu ayarları deneyebilirsiniz:
- Shader kullanımını azaltın.
- OpenGL gibi hafif bir video sürücüsü kullanın.
- **Audio Latency** ayarlarını optimize edin (**Settings > Audio > Latency**).
- **Video Threading** özelliğini açın:

```bash
video_threaded = true
```

---

## 8️⃣ Sık Karşılaşılan Sorunlar ve Çözümleri 🛠️

### Çekirdek Bulunamıyor

Eğer RetroArch çekirdeklerini bulamıyorsa şu ayarı yapın:

```bash
libretro_directory = "/usr/lib/libretro"
```

### Girdi Cihazları Çalışmıyor

Girdi cihazları algılanmıyorsa, kullanıcınızı **input** grubuna ekleyin veya şu udev kuralını ekleyin:

```bash
/etc/udev/rules.d/99-evdev.rules
KERNEL=="event*", NAME="input/%k", MODE="666"
```

### Video Performansı Kötü

**Settings > Video > Threaded Video** seçeneğini etkinleştirin veya çözünürlüğü düşürün.

### ALSA ile Ses Sorunları

Ses çıkış oranını şu şekilde ayarlayın:

```bash
audio_out_rate = 48000
```

---

Bu rehber, Arch Linux üzerinde RetroArch'ı kurup optimize etmek isteyenler için kapsamlı bir kaynak sunuyor. Daha fazla bilgi için [Arch Wiki: RetroArch](https://wiki.archlinux.org/title/RetroArch){: target="_blank" rel="noopener noreferrer"} sayfasına göz atabilirsiniz. 📖

Keyifli oyunlar! 🎮
