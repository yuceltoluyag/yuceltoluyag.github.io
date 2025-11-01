Title: Rehber: MangoHud Kullanımı ile Oyun Performansınızı İzleyin
Date: 2025-05-06 15:00
Modified: 2025-08-11 22:59
Category: Oyun
Tags: mangohud, linux oyunları, arch linux, fps göstergesi, oyun performansı
Slug: mangohud-ile-oyun-performansi-izleme
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: MangoHud ile oyunlarınızda FPS, sıcaklık, kullanım gibi sistem performansı bilgilerini anlık olarak izleyin. Arch Linux üzerinde kurulum ve yapılandırma rehberi.
Template: article
Image: images/mangohud_linux-xl.webp

## Rehber: MangoHud Kullanımı ile Oyun Performansınızı İzleyin 🎮

Linux'ta oyun oynarken _oyun performansını gerçek zamanlı_ izlemek ister misiniz? Peki ya ekranın bir köşesinde FPS, CPU sıcaklığı, GPU kullanımı gibi bilgileri görmek? İşte tam da bu noktada **MangoHud** devreye giriyor. Bu rehberde, MangoHud'un Arch Linux üzerinde nasıl kurulacağı, yapılandırılacağı ve oyunlarla nasıl kullanılacağı hakkında adım adım bilgi vereceğim.

---

## MangoHud Nedir?

**MangoHud**, Vulkan ve OpenGL tabanlı oyunlarda sistem performansını ekran üstü katman (overlay) olarak gösteren açık kaynaklı bir araçtır. FPS, GPU/CPU sıcaklığı, bellek kullanımı gibi birçok metrikle birlikte gelir. Ayrıca, oyun benchmark'ları yaparken performans verilerini kaydetmek için de kullanılabilir.

---

## MangoHud Kurulumu (Arch Linux)

Arch Linux kullanıyorsanız MangoHud kurulumu oldukça kolaydır. Aşağıdaki komutla MangoHud'u kurabilirsiniz:

```bash
sudo pacman -S mangohud
```

Eğer 32-bit oyunlar oynuyorsanız, şu paketi de yüklemeniz gerekebilir:

```bash
sudo pacman -S lib32-mangohud
```

---

## MangoHud Yapılandırması 📁

MangoHud yapılandırması için birkaç dosya yolu kullanılabilir. MangoHud bu dosyaları sırasıyla tarar:

- `$XDG_CONFIG_HOME/MangoHud/MangoHud.conf`
- `$XDG_CONFIG_HOME/MangoHud/APPLICATION-NAME.conf` (büyük/küçük harf duyarlıdır)
- `$XDG_CONFIG_HOME/MangoHud/wine-APPLICATION-NAME.conf` (Wine uygulamaları için, `.exe` uzantısı olmadan)
- `./MangoHud.conf`
- `$MANGOHUD_CONFIGFILE` (ortam değişkeni ile belirtilirse)

📝 _İpucu:_ Örnek bir yapılandırma dosyası MangoHud'un GitHub sayfasında bulunabilir.

### MangoHud.conf İçin Örnek İçerik

```ini
fps_limit=144
cpu_temp=1
gpu_temp=1
ram=1
frame_timing=1
```

## [responsive_img src="/images/mangohud_linux-xl.webp" alt="MangoHud" /]

## MangoHud GUI Aracı: GOverlay 🖥️

Terminal ile uğraşmak istemeyen kullanıcılar için **GOverlay** adında grafik arayüze sahip bir konfigürasyon aracı da mevcut. AUR üzerinden kolayca kurulabilir:

```bash
yay -S goverlay
```

GOverlay ile tüm MangoHud ayarlarını GUI üzerinden düzenleyebilir, önizleme alabilirsiniz.

---

## MangoHud Kullanımı 🚀

### Genel Kullanım

Bir uygulamayı MangoHud ile başlatmak için terminalde aşağıdaki komutu kullanabilirsiniz:

```bash
mangohud uygulama_adı
```

Örnek:

```bash
mangohud glxgears
```

### Klavye Kısayolları

- `Sağ Shift + F12` – Overlay'i aç/kapat
- `Sağ Shift + F11` – Overlay konumunu değiştir
- `Sağ Shift + F10` – Overlay profilini değiştir
- `Sol Shift + F2` – Loglama aç/kapat
- `Sol Shift + F4` – Yapılandırmayı yeniden yükle

### Steam Oyunlarıyla MangoHud Kullanımı

Steam'deki oyunlara MangoHud'u dahil etmek için:

1. Steam kütüphanenizde oyuna sağ tıklayın → Özellikler…
2. Açılan pencerede _Başlatma Seçenekleri_ kısmına şunu girin:

```bash
mangohud %command%
```

Alternatif olarak, tüm oyunlar için Steam’i MangoHud ile başlatabilirsiniz:

```bash
mangohud steam-runtime
```

### GameMode ile Birlikte Kullanım

Performansı artırmak için MangoHud’u **GameMode** ile birlikte şu şekilde çalıştırabilirsiniz:

```bash
mangohud gamemoderun oyun_adı
```

---

## Ekstra İpuçları 🧠

- MangoHud sadece Vulkan/OpenGL oyunlarda çalışır. DXVK veya VKD3D gibi çeviri katmanlarıyla DirectX oyunları da desteklenir.
- MangoHud’un otomatik çalışması için şu ortam değişkenini kullanabilirsiniz:

```bash
export MANGOHUD=1
```

- `--dlsym` parametresi bazı oyunlarda gerekli olabilir:

```bash
mangohud --dlsym oyun_adı
```

### Debian/Ubuntu için Kurulum Notu

Bu rehber Arch Linux içindir. Debian/Ubuntu sistemlerinde `apt install mangohud` komutu kullanılabilir. Ancak yapılandırma ve kullanım adımları büyük oranda aynıdır.

---

## Sonuç: Oyunlarda Performansı Takip Etmenin En İyi Yolu

**MangoHud**, Linux'ta oyun oynayanlar için vazgeçilmez bir performans izleme aracıdır. Gerek kolay kurulumu, gerekse esnek yapılandırması ile hem oyuncular hem de geliştiriciler için büyük kolaylık sağlar. Bu rehberde, MangoHud’un Arch Linux üzerinde nasıl kurulup kullanılacağını detaylıca ele aldık.

🎯 MangoHud’u denediniz mi? Yapılandırma dosyanızda hangi ayarları tercih ediyorsunuz? Yorumlarda paylaşın!

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="foUosbS6p_A"></lite-youtube>

---
