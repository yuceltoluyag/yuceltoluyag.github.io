Title: Linux GPU Sürücü Rehberi: AMD, Intel ve Nvidia İçin Stabil ve Temiz Kurulum
Date: 2025-11-30 11:15
Category: Donanım
Tags: linux, gpu driver, nvidia, amd, intel, mesa, steamos, oyun, debian
Slug: linux-gpu-driver-rehberi
Authors: yuceltoluyag
Summary: Linux'ta sürücü kurmak Windows'taki gibi değil. Mesa 25.1 güncellemesi, Nvidia DKMS modülleri ve Debian inatçıları için özel rehber burada.
Image: images/linux-ve-steamos-grafik-surucusu-yukleme-guncelleme-rehberi-xl.webp
Lang: tr
Translation: false
Status: published


Windows'tan Linux'a geçen herkesin yaşadığı o ilk şok anını bilirim. Tarayıcıyı açarsın, Nvidia veya AMD'nin sitesine girip "Download Driver" butonunu ararsın... Ama dur! Linux dünyasında işler böyle yürümüyor. Burada kurallar farklı, bazen kafa karıştırıcı ama alıştığında çok daha mantıklı.

Bugün, sisteminizin kalbi olan grafik sürücülerini nasıl kontrol edeceğinizi, güncelleyeceğinizi ve o siyah ekranı görmeden bu işten nasıl sıyrılacağınızı anlatacağım. Kahvenizi alın, terminali açın. Başlıyoruz.

## Önemli Uyarılar (Hemen Atlamayın!)

**SteamOS Kullananlar:** Eğer Steam Deck veya SteamOS kullanıyorsanız, elinizi klavyeden çekin. Valve, sistem güncellemeleriyle sürücüleri (Mesa) zaten size gönderiyor. Ekstra bir şey yapmanıza gerek yok, bozarsınız. Bu rehber diğer Linux dağıtımları için.

**Genel Kural:** Sürücü işlerine girişmeden önce sisteminizi tamamen güncelleyin ve yeniden başlatın. "Ya bir şey olmaz" demeyin, oluyor. Tecrübeyle sabit.

-----

## AMD ve Intel Cephesi: Mesa Nedir?

AMD ve Intel kullanıcıları, Linux dünyasının "şanslı" kesimi. Çünkü bu kartlar **Mesa** kullanır. Mesa dediğimiz şey tek bir sürücü değil, açık kaynaklı sürücülerin toplandığı devasa bir koleksiyon.

Duyacağınız terimler şunlar:

  * **RADV:** Mesa'nın AMD Vulkan sürücüsü (Topluluk ve Valve destekli, genelde en iyisi bu).
  * **ANV:** Mesa'nın Intel Vulkan sürücüsü.
  * **AMDVLK:** AMD'nin kendi resmi açık kaynak sürücüsü.

Benim tavsiyem (ve çoğu oyuncunun hemfikir olduğu konu): **RADV'den şaşmayın.** AMDVLK bazen uyumluluk sorunları çıkarabiliyor, RADV ise kaya gibi sağlam.[^1]

### Hangi Mesa Sürümünü Kullanıyorum?

Bunu öğrenmek için terminale küçük bir fısıltı göndermemiz lazım.

```bash
glxinfo | grep "Mesa"
```

Eğer terminal size "Komut bulunamadı" diye bağırırsa (ki genelde bağırır), şu paketleri kurmanız gerek:

!!! tip "glxinfo Kurulumu ⚡"
* **Ubuntu/Mint/Debian:** `sudo apt install mesa-utils`
* **Arch Linux:** `sudo pacman -S mesa-utils`
* **Fedora:** `sudo dnf install glx-utils`

Komutu çalıştırdığınızda şöyle bir çıktı alacaksınız:

```
OpenGL core profile version string: 4.6 (Core Profile) Mesa 25.0.3-1ubuntu2
```

O **Mesa 25.0.3** yazan yer var ya, işte o sizin sürümünüz.

### Mesa Nasıl Güncellenir? (Ubuntu Kullanıcıları İçin Kritik Güncelleme!)

Burası biraz karıştı ama toparlayalım.

**Ubuntu ve Türevleri (Mint vb.):**
Eskiden her sürüm için Kisak PPA kullanırdık ama işler değişti. Kisak, depolama limitleri yüzünden **eski sürümleri (18.04 Bionic, 20.04 Focal, 22.04 Jammy) emekliye ayırdı.** Yani eski bir sisteminiz varsa bu kapı size kapandı.

Ama iyi haber şu: Eğer **Ubuntu 25.04 (Plucky)** veya **24.10 (Oracular)** kullanıyorsanız, artık en güncel **Mesa 25.1** sürümüne (özellikle 25.1.5 bug-fix sürümüne) Kisak PPA ile kolayca geçebiliyorsunuz. Neden önemli? Çünkü yeni **DXVK** güncellemeleri artık Mesa 25.1 öneriyor. Proton ile oyun oynarken performans kaybı yaşamamak için bu şart.

Kısacası, güncel Ubuntu kullanıyorsanız şu komutlarla sistemi uçurun:

```bash
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt upgrade
```

**Arch, Fedora, Manjaro, EndeavourOS:**
Siz yine kralsınız. Sisteminiz yuvarlanan (rolling) yapıda olduğu için normal güncellemelerle Mesa'nın en son sürümü zaten size gelir. Ekstra maceraya gerek yok.

-----

## NVIDIA Cephesi: Nazlı Gelin

Geldik işin en civcivli kısmına. Nvidia, Linux dünyasında kapalı kaynak kodlu (proprietary) sürücüleriyle bilinir ve bazen bizi kanser eder. Ama performans için o sürücüleri kurmak zorundayız.

### Ubuntu / Mint / Kubuntu

En kolayı bu. Menüden **"Yazılım ve Güncellemeler"** (Software & Updates) uygulamasını açın, **"Ek Sürücüler"** (Additional Drivers) sekmesine gelin. Orada Nvidia sürücülerini göreceksiniz. Tavsiye edilen sürümü seçip "Uygula" deyin.

Ha, "Ben terminalciyim" derseniz:

```bash
sudo ubuntu-drivers list
sudo ubuntu-drivers install nvidia:560
```

*(560 yerine listede çıkan en güncel sürümü yazın tabii.)*

### Pop!_OS

System76 ekibi bu işi çözmüş. **Pop!_Shop**'a girin, Nvidia sürücüsünü seçin ve kurun. Zaten ISO dosyasını indirirken Nvidia versiyonunu indirdiyseniz, sürücüler kurulu geliyor. Rahatlık seviyesi: %100.

### Fedora (Biraz Uğraştırır)

Fedora, özgür yazılım felsefesi gereği Nvidia sürücülerini varsayılan olarak sunmaz. Önce **RPM Fusion** deposunu eklemeniz lazım.

1.  **RPM Fusion Kurulumu:**

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

2.  **Sürücü Kurulumu:**
Modern kartlar için:

```bash
sudo dnf install akmod-nvidia
```

CUDA desteği için:

```bash
sudo dnf install xorg-x11-drv-nvidia-cuda
```

!!! danger "Secure Boot Belası! 🛡️ Eğer BIOS'ta Secure Boot açıksa sürücüyü imzalamanız (sign) gerekir. Bu işlem tam bir baş ağrısıdır (`kmodgenca`, `mokutil` vs.). Eğer kurumsal bir zorunluluğunuz yoksa, BIOS'tan Secure Boot'u kapatmak en kısa yol."


### Arch Linux (DKMS Detayı!)

Arch Wiki bu konuda bir derya deniz ama özet geçeyim. Hangi kartı kullandığınız çok önemli.

  * **Turing (RTX 20 serisi) ve sonrası:** Artık açık kaynaklı kernel modülleri öneriliyor: `nvidia-open`.
  * **LTS Kernel Kullananlar:** `nvidia-open-lts`.
  * **"Ben Uğraşamam" Diyenler İçin Joker:** `nvidia-open-dkms`. Bu paket, hangi kerneli kullanırsanız kullanın (Zen, LTS, Mainline) modülleri otomatik derler. Kafanız rahat olur.

Ve en önemlisi, **32-bit desteği!** Steam oyunlarının çoğu hala 32-bit kütüphanelere ihtiyaç duyar.
`/etc/pacman.conf` dosyasını açın ve `[multilib]` satırının başındaki `#` işaretini kaldırın.

Sonra şu komutla hem sistemi güncelleyin hem de sürücüleri kurun:

```bash
sudo pacman -Syu nvidia-open-dkms lib32-nvidia-utils
```

*(Eski kart kullanıyorsanız `nvidia-open` kısımlarını `nvidia` yapın).*

### Manjaro ve EndeavourOS

Bu dağıtımlar işi kolaylaştırıyor.

  * **Manjaro:** `sudo mhwd -a pci nonfree 0300` komutuyla otomatik kurulum yapar.
  * **EndeavourOS:** `nvidia-inst` aracı var. `nvidia-inst --32` diyerek hem sürücüyü hem 32-bit desteğini kurabilirsiniz.

### Debian (İnatçılar İçin Özel Bölüm)

Dürüst olayım, oyun için **Debian Stable** kullanmak, Formula 1 pistine traktörle girmek gibidir. Sürücüler çok eski kalır. Ama "Ben Debian'dan vazgeçmem, kararlılık benim göbek adım" diyorsanız, saygı duyarım.

Sırf sizin için, sabırsız Debian savaşçılarına özel "Hızlı Kurulum Reçetesi"ni şuraya bırakıyorum. Bu komutlar `non-free` depoları açar, 32-bit mimariyi ekler ve Steam ile Nvidia sürücüsünü kurar.

Terminale `su -` yazıp root olduktan sonra sırasıyla:

```bash
# 32-bit mimariyi ekle
dpkg --add-architecture i386

# Sources listesini düzenle (Manuel yapman gerekebilir)
# /etc/apt/sources.list dosyasındaki her satırın sonuna
# "non-free contrib" ekle. (Örn: main non-free contrib)

# Ve final vuruşu:
apt update
apt install steam nvidia-driver
reboot
```

Bunu yaptıktan sonra sistem yeniden başlar ve teorik olarak oyun oynamaya hazırsınızdır. İyi şanslar (ihtiyacınız olacak)!

-----

Yani durum bu. Linux'ta sürücü işi ilk başta korkutucu görünse de, bir kez mantığını kavrayınca "Ne gerek varmış Windows'ta site site gezmeye" diyorsunuz. Neyse, ben kaçtım, güncellemem gereken bir Arch sistemi beni bekliyor (Umarım patlamaz 😅).

- [Arch Linux NVIDIA Ekran Kartı Kurulumu](/arch-linux-nvidia-ekran-karti-kurulumu/)
- [Arch Linux Linux Firmware NVIDIA Hatası Çözümü](/arch-linux-linux-firmware-nvidia-hatasi-cozumu/)
- [Arch Linux NTSync Aktif Etme Zen Kernel Rehberi](/arch-linux-ntsync-aktif-etme-zen-kernel-rehberi/)

[^1]:
RADV sürücüsü, Valve mühendisleri tarafından Steam Deck ve Linux oyunculuğu için sürekli optimize ediliyor. AMDVLK ise daha kurumsal odaklı kalabiliyor.