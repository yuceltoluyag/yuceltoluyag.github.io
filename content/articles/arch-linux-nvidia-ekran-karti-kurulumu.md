Title: Arch Linux’ta Nvidia Ekran Kartı Kurulumu (Optimus, Prime, Bumblebee Rehberi)
Date: 2020-04-18 10:00
Modified: 2025-10-29 10:41
Category: Donanım
Tags: linux, nvidia, laptop
Slug: arch-linux-nvidia-ekran-karti-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux'ta Nvidia ekran kartı kurulumu, sürücü seçimi, optimus-manager ve performans ayarlarını adım adım açıklıyorum. 💻  
Template: article
Image: images/nvidia-linux-performans-ayari-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114984688481336401
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvripfzduk2y



## 👋 Merhaba

Merhaba! Uzun zamandır yazmak istediğim konulardan biri de **Nvidia ekran kartlarının kurulumu**. 😊
Linux dünyasında **Nvidia sürücüleri** çoğu zaman karmaşık görünebilir. Hatalı kurulumlar, eski sürücüler veya yanlış yapılandırmalar yüzünden kullanıcılar sık sık “**Linux’ta Nvidia tam verimli çalışmıyor**” yorumlarını yapıyor.

Aslında çoğu zaman sorun **sürücü seçimi ve yapılandırma farklarından** kaynaklanıyor.
Bu rehberde adım adım **Arch Linux üzerinde Nvidia sürücülerini nasıl kurabileceğini**, hangi sürümün senin kartına uygun olduğunu ve **maksimum performans** için nelere dikkat etmen gerektiğini anlatacağım. 🚀

---

## 🧩 Kart Modelini Öğrenmek

İlk adımda, sisteminde hangi GPU’ların bulunduğunu öğrenelim:

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

Benim cihazımda örnek çıktı şöyleydi (Lenovo, Nvidia Quadro 2000M):

```bash
00:02.0 VGA compatible controller: Intel Corporation Integrated Graphics Controller
Kernel driver in use: i915
--
01:00.0 VGA compatible controller: NVIDIA Corporation GF106GLM [Quadro 2000M]
Kernel driver in use: nvidia
```

Buradaki **GF106GLM** kısmı kartının “kod adı”dır.
Bu adı kullanarak kartının hangi nesle ait olduğunu [Nvidia CodeNames](https://nouveau.freedesktop.org/wiki/CodeNames/){:target="\_blank" rel="noopener noreferrer"} sayfasından kontrol edebilirsin.
Benim kartım “**Fermi**” ailesine aitmiş.

---

## 🧠 Kartın Desteklendiği Sürümleri Öğrenmek

Bazı eski kartlar artık en yeni sürücüleri desteklemez.
Kartının hangi sürücü serisine kadar desteklendiğini görmek için:

👉 [Nvidia Legacy GPU Listesi](https://www.nvidia.com/en-us/drivers/unix/legacy-gpu/){:target="\_blank" rel="noopener noreferrer"}

Eğer kartın bu listede varsa, örneğin **340xx** veya **390xx** sürümüne kadar destekleniyorsa, daha yeni sürücüleri kurmak sorun çıkarabilir.

!!! warning "Sık Yapılan Hata ⚠️ Kullanıcıların çoğu, kartı sadece 390xx sürümüne kadar desteklediği hâlde `nvidia` paketini kuruyor. Bu durum sistemde siyah ekran, kernel mod hataları veya düşük FPS gibi sorunlara yol açabiliyor."

Kartına uygun sürümü [Nvidia Driver Search](https://www.nvidia.com/Download/index.aspx){:target="\_blank" rel="noopener noreferrer"} sayfasında arayabilir ve çıkan sonuca göre Arch Linux AUR’daki `nvidia-390xx` veya `nvidia-340xx` paketini tercih edebilirsin.

📖 Ek kaynak: [Arch Linux Nvidia Belgesi](https://wiki.archlinux.org/index.php/NVIDIA#Installation){:target="\_blank" rel="noopener noreferrer"}

---

## ⚙️ Nouveau, Optimus, Prime, Bumblebee Nedir?

!!! note "Genel Bilgi 💡 Eğer dizüstü bilgisayar kullanıyorsan, büyük ihtimalle hem Intel hem de Nvidia GPU’ya sahipsin. Bu teknolojiye **Optimus** denir."

### 🟢 Nouveau

Açık kaynak sürücüdür. Oyun veya GPU yoğun işler yapmıyorsan işini görebilir: Daha iyi anlamak için videoyu izleyebilirsin.

```bash
yay -Syyu xf86-video-intel mesa xf86-video-nouveau opengl-man-pages lib32-mesa-vdpau lib32-libva-mesa-driver
```

### 🔵 Optimus (Tavsiyem laptoplar için)

Intel + Nvidia geçişli sistemler içindir.
Performans ve pil dengesini sağlar. Kullanımı için genellikle **Optimus Manager** tavsiye edilir:

```bash
yay -Syyu nvidia-390xx-dkms nvidia-390xx-utils opencl-nvidia-390xx nvidia-390xx-settings lib32-opencl-nvidia-390xx lib32-nvidia-390xx-utils
yay -S optimus-manager optimus-manager-qt
sudo systemctl enable optimus-manager.service
```

Geçiş yapmak için:

```bash
optimus-manager --switch intel   # Dahili GPU
optimus-manager --switch nvidia  # Harici GPU
optimus-manager --switch hybrid  # Hibrit mod
```

- Wiki sayfası: [Optimus Manager](https://github.com/Askannz/optimus-manager/wiki){:target="\_blank" rel="noopener noreferrer"} takip edebilirsin.

### 🔴 Prime (Tavsiyem)

Yüksek performans isteyen oyun, render, OBS gibi uygulamalarda tam performans sunar.
Optimus Manager ile uyumlu çalışır.

### 🟣 Bumblebee

Eskiden popülerdi ama artık güncel değil.
2025 itibarıyla **Bumblebee projesi 2013’ten beri aktif geliştirme almıyor** ([GitHub](https://github.com/Bumblebee-Project/Bumblebee)).
Performans açısından **Windows’un yarısı kadar** sonuç verdiği için önerilmez.

- Yinede performansını görmek istersen:

* Dahili GPU

[responsive_img src="/images/optirun-dahili-gpu-xl.webp" alt="Dahili Gpu Performansı" /]

- Harici Gpu Performansı

## [responsive_img src="/images/optirun-performansi-xl.webp" alt="Harici Gpu Performansı" /]

## 🧹 Temiz Kurulumun Önemi

!!! danger "Çakışmalara Dikkat Daha önce farklı yöntemler (Bumblebee,nvidia-xrunvb.) denediysen,yeni kurulumdan önce bu yapılandırmaları silmelisin.Aksi hâlde `optimus-manager` düzgün çalışmaz.Özellikle **`/etc/X11/xorg.conf.d/`** altındaki eski dosyalar veya **nvdock** benzeri servisler geçişleri bozabilir."

---

## 🎮 Performans Ayarları

Nvidia kartına geçtiğinde ekran yırtılması (screen tearing) veya OBS sorunları yaşıyorsan,
öncelikle compositörleri kapat:

```bash
killall picom compton xcompmgr
```

Daha sonra **NVIDIA Settings** uygulamasını açıp:

- “PowerMizer” sekmesinde `Prefer Maximum Performance` seçeneğini işaretle,
- “Sync to VBlank” ve “Allow Flipping” tiklerini kaldır.
- Burada görüleceği üzere 877 FPS alıyorum.

* Performans ayarları sonrası ekran yırtılması ve OBS sorunları çözülmüş olur.

  [responsive_img src="/images/nvidia-linux-performans-ayari-xl.webp" alt="Nvidia Performans Ayarı" /]

* PowerMizer ayarları ile maksimum performans modu seçili.

  [responsive_img src="/images/nvidia-grafik-ayari-maximum-performans-xl.webp" alt="Nvidia Grafik Ayarları" /]

* OBS’de Nvidia GPU kullanımı ve yüksek FPS.

[responsive_img src="/images/primeperformansi-xl.webp" alt="Nvidia Prime Performansı" /]

## 📊 Bumblebee Performans Karşılaştırması

| Test             | Bumblebee            | Prime             |
| ---------------- | -------------------- | ----------------- |
| GPUTest          | 215 FPS              | 877 FPS           |
| OBS Yayını       | Yüksek CPU kullanımı | Stabil            |
| Render (Blender) | 2× daha yavaş        | Tam GPU kullanımı |

---

## 🎥 Videolu Anlatım

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="DhCUPntoKSg"></lite-youtube>

---

## 🔗 İlgili Yazılar

- [Waydroid Kurulumu ve Android Uygulamaları](/arch-linux-waydroid-kurulumu)
- [Oh My ZSH Kurulumu (Tema ve Eklentiler Dahil)](/oh-my-zsh-kurulumu-temel-ayarlar/)
- [Arch Linux’ta NTFS Disk Yapılandırması](/arch-linux-ntfs-yapilandirma)
- [Arch Linux'ta linux-firmware Güncellemesinde NVIDIA Hatası ve Çözümü)](/arch-linux-linux-firmware-nvidia-hatasi-cozumu/)

---



