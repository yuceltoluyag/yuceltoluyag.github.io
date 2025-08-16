Title: Redmi Note 8 Pro Custom ROM Yükleme Rehberi
Date: 2025-08-12 14:30
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: Android, custom ROM, TWRP, IMEI onarma, Redmi Note 8 Pro, Arch Linux
Slug: redmi-note-8-pro-custom-rom-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Redmi Note 8 Pro'ya custom ROM yükleme süreci. ADB, TWRP kurulumu, IMEI yedekleme ve sorun çözümleriyle eksiksiz rehber.
Template: article
Series: Android Rehberleri
Series_index: 2
Image: images/crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/115011896140683306

# 📱 Redmi Note 8 Pro'ya Custom ROM Yükleme: Arch Linux'ta Adım Adım Kılavuz

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Önemli</div>
        <p>⚠️ <strong>Dikkat!</strong> Bu işlemler risklidir ve cihazınızda geri dönüşü olmayan sorunlara yol açabilir.  
        Bu rehberde anlatılan adımları uygulamak tamamen <strong>kendi sorumluluğunuzdadır</strong>.  
        Herhangi bir sorun yaşanması durumunda içerik sahibi sorumlu tutulamaz.</p>
    </div>
</div>

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Uyarı</div>
        <p>📱 İşlem sırasında telefonunuzdaki önemli veriler (uygulamalar, ayarlar, dosyalar vb.) kaybolabilir.  
        Mutlaka işlem öncesi yedeklerinizi alın ve önemli dosyalarınızı yedekleyin.</p>
    </div>
</div>

<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>🔧 Ben <strong>Redmi Note 8 Pro</strong> kullanıcısıyım ve bu rehberi kendi cihazımda uyguladım.</p>
    </div>
</div>

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Kritik Uyarı</div>
        <p><a href="/mediatek-imei-onarma-rehberi/" style="color: #dc2626; font-weight: bold;">/mediatek-imei-onarma-rehberi/</a> adresindeki adımları eksiksiz tamamlamadan bu işleme geçmeyin! IMEI yedekleme/onarma işlemleri ROM kurulumundan önce mutlaka yapılmalıdır.</p>
    </div>
</div>

## 🔍 Giriş

Android cihazlarınıza custom ROM yüklemek, hem performans artışı sağlamak hem de üretici yazılım kısıtlamalarından kurtulmak için popüler bir yöntemdir. Özellikle Redmi Note 8 Pro gibi MediaTek tabanlı cihazlarda bu süreç bazı özel adımlar gerektirir. Bu kılavuzda, Arch Linux ortamında Redmi Note 8 Pro'ya nasıl custom ROM yükleyeceğinizi, IMEI bilgilerinizi nasıl koruyacağınızı ve karşılaşabileceğiniz sorunların çözümlerini adım adım anlatacağız. ⚠️ Unutmayın, bu işlemler cihazınızda veri kaybına neden olabilir, bu yüzden tüm önemli verilerinizi yedeklediğinizden emin olun!

## 🛠️ Ön Hazırlıklar

### ADB ve Fastboot Kurulumu
İlk olarak, cihazınızla iletişim kurmak için gerekli araçları kurmanız gerekiyor. Arch Linux'ta terminal açın ve şu komutu çalıştırın:

```bash
sudo pacman -S android-tools
```

### USB Hata Ayıklama Aktif Etme
Cihazınızda **Ayarlar > Geliştirici Seçenekleri > USB hata ayıklama** seçeneğinin aktif olduğundan emin olun. Geliştirici seçeneklerini görmek için **Ayarlar > Telefon Hakkında > Yapım Numarası** üzerine 7 kez dokunmanız gerekebilir.

### Cihaz Bağlantısını Kontrol Etme
Cihazınızı USB ile bilgisayarınıza bağlayın ve terminalde şu komutu çalıştırın:

```bash
adb devices
```

Eğer cihazınız listede görünüyorsa, bağlantı başarılı demektir. 🟢

## 💾 IMEI Yedeği Alma

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Önemli</div>
        <p>IMEI yedeği almak kritik öneme sahiptir! ROM yüklerken IMEI kaybolursa, cihazınız şebeke bulamaz.</p>
    </div>
</div>

### IMEI Bilgilerini Öğrenme
Terminalde şu komutları çalıştırarak IMEI numaranızı öğrenebilirsiniz: [MediaTek IMEI Onarma Rehberi](/mediatek-imei-onarma-rehberi/) burada detaylı anlatılmıştır.Otamatik olarak yedekler,ancak manuel olarak da yedek alabilirsiniz. İleride lazım olabilir.

```bash
adb shell
service call iphonesubinfo 1
exit
```

Alternatif olarak:

```bash
adb shell dumpsys iphonesubinfo
```

Veya:

```bash
adb shell getprop | grep imei
```

Örnek çıktı:
```
[ro.ril.miui.imei0]: [xxxxxxxxxx]
[ro.ril.miui.imei1]: [xxxxxxxxxxx]
```
> Bu sadece IMEI numaralarını gösterir. Eğer cihazınızda çift SIM kart varsa, her iki kartın IMEI numarasını da not alın. Bu yöntem patch işlemi uygulamaz. Lütfen 1. yöntemi kullanın.


### NVRAM Yedeği Alma (Root Gerekli)
NVRAM yedeği almak genellikle root erişimi gerektirir. Root erişiminiz yoksa, IMEI numaralarınızı not alarak yedekleme yapabilirsiniz. Makaleyi [MediaTek IMEI Onarma Rehberi](/mediatek-imei-onarma-rehberi/) adresinden inceleyebilirsiniz.

## 🔓 Bootloader Kilidini Açma

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Uyarı</div>
        <p>Bu işlem cihazınızdaki tüm verileri silecektir! Önemli verilerinizi yedeklediğinizden emin olun.</p>
    </div>
</div>

### Bootloader Moduna Geçme
Cihazınızı bootloader moduna almak için:

```bash
adb reboot bootloader
```
örnek çıktı:

```bash
[friday13@baba ~]$ adb reboot bootloader
[friday13@baba ~]$ fastboot devices
kvqcxo4xkr59oflf      fastboot
```

### Bootloader Kilidini Kontrol Etme
Kilidin durumunu kontrol etmek için:

```bash
fastboot getvar unlocked
```

Çıktı `unlocked: yes` ise kilidiniz zaten açıktır. `unlocked: no` ise açmanız gerekir.

örnek çıktı:

```bash
[friday13@baba ~]$ fastboot getvar unlocked
unlocked: yes
Finished. Total time: 0.000s
```

### Bootloader Kilidini Açma
Xiaomi cihazlar için:

```bash
fastboot flashing unlock
```

Veya:

```bash
fastboot oem unlock
```

Cihazınızda onaylama istendiğinde, ses tuşlarıyla onaylayın.

## 🔄 Custom Recovery (TWRP) Yükleme

Cihazınıza uygun TWRP recovery imajını indirin. Redmi Note 8 Pro için genellikle `twrp.img` dosyası kullanılır.

### Recovery İmajını Flashlama
İndirdiğiniz imajı flashlamak için:

```bash
fastboot flash recovery twrp.img
```

örnek çıktı:

```bash
fastboot flash recovery Downloads/recovery.img
Sending 'recovery' (65536 KB)                      OKAY [  1.513s]
Writing 'recovery'                                 OKAY [  0.396s]
Finished. Total time: 1.910s
```

### Recovery Moduna Başlatma
Flash işleminden sonra cihazı recovery modunda başlatın:

```bash
fastboot reboot recovery
```

Alternatif olarak:

```bash
adb reboot recovery
```

## 📦 Custom ROM Yükleme

### Tam Temizlik Yapma

TWRP menüsünden:

1. **Wipe** seçeneğine girin
2. **Advanced Wipe**'ı seçin
3. Şunları işaretleyin:
   - System
   - Data
   - Cache
   - Dalvik/ART Cache
4. **Swipe to Wipe** ile onaylayın

### ROM Yükleme Yöntemleri

#### Yöntem 1: ADB Sideload Kullanımı
<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>Sideload, dosya transferi sorunları yaşadığınızda en güvenilir yöntemdir.</p>
    </div>
</div>

TWRP'de:
1. **Advanced** > **ADB Sideload** seçeneğine girin
2. **Swipe to Start Sideload** ile onaylayın
3. PC'de şu komutu çalıştırın:

```bash
adb sideload "/path/to/rom.zip"
```

#### Yöntem 2: Manuel Yükleme

- ROM dosyasını cihaza kopyalayın:

```bash
adb push "/path/to/rom.zip" /sdcard/
```

2. TWRP'de **Install** seçeneğine girin
3. ROM dosyasını seçin
4. **Swipe to Confirm Flash** ile kurulumu başlatın

### Format Data İşlemi

ROM kurulumundan sonra:

1. **Wipe** > **Format Data** seçeneğine girin
2. `yes` yazıp onaylayın
3. **Reboot System** ile cihazı yeniden başlatın

## ⚠️ Karşılaşılan Sorunlar ve Çözümleri

### "Failed to Mount Metadata" Hatası
Bu hata Android 10+ sürümlerde metadata bölümünün mount edilememesinden kaynaklanır.

**Çözüm:**

1. TWRP'de **Advanced** > **Partition Manager** seçeneğine girin
2. Metadata bölümünü seçin
3. **Repair** veya **Format** seçeneğini kullanın
4. İşlem tamamlandığında **Reboot Recovery** ile recovery'yi yeniden başlatın

### "Required Key Not Available" Hatası

Bu hata, Android 11+ sürümlerde dosya yazma kısıtlamalarından kaynaklanır. Özellikle ROM dosyalarını `/sdcard/` dizinine kopyalamaya çalışırken karşılaşabilirsiniz.

```bash
[friday13@baba ~]$ adb push /home/friday13/Downloads/Telegram\ Desktop/crDroid.zip  /sdcard/
adb: error: failed to copy '/home/friday13/Downloads/Telegram Desktop/crDroid.zip' to '/sdcard/crDroid.zip': remote couldn't create file: Required key not available
/home/friday13/Downloads/Telegram Desktop/crDroid.zip: 1 file pushed, 0 skipped. 36.9 MB/s (1636720497 bytes in 42.274s)
```

Android 11+ sürümlerde dosya yazma kısıtlamalarından kaynaklanır.

**Çözüm:**
1. `/data/media/0/` dizinine kopyalamayı deneyin:

```bash
adb push "/path/to/rom.zip" /data/media/0/
```

2. Veya sideload yöntemini kullanın (önerilir)

### "Corrupted NVRAM" Hatası
<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Bilgi</div>
        <p>Bu hata özellikle MediaTek cihazlarda NVRAM bölümünün bozulmasından kaynaklanır.</p>
    </div>
</div>

**Çözüm:**

1. Öncelikle ROM kurulumunu tamamlayın
2. IMEI onarma için özel bir zip dosyası indirin (mtk_imei script)  [MediaTek IMEI Onarma Rehberi](/mediatek-imei-onarma-rehberi/)
3. TWRP'den bu zip dosyasını flashlayın
4. Cihazı yeniden başlatın ve IMEI numaralarınızı kontrol edin

## 📋 Özet Tablo

| İşlem | Komut / Yöntem | Notlar |
|-------|----------------|--------|
| ADB Kontrol | `adb devices` | Cihazın bağlı olduğunu doğrulayın |
| IMEI Öğrenme | `adb shell getprop \| grep imei` | IMEI numaralarını not alın |
| Bootloader Kilidi Açma | `fastboot flashing unlock` | Tüm verileri siler! |
| TWRP Flashlama | `fastboot flash recovery twrp.img` | Cihaza uygun imaj kullanın |
| ROM Yükleme | `adb sideload rom.zip` | En güvenilir yöntem |
| Veri Temizleme | TWRP > Advanced Wipe | System, Data, Cache seçin |
| NVRAM Onarma | mtk_imei script flashlama | ROM kurulumundan sonra yapın |

## 🎯 Sonuç

Redmi Note 8 Pro'ya custom ROM yükleme süreci, teknik olarak birkaç kritik adım içerir. Özellikle IMEI yedekleme ve bootloader kilidi açma işlemlerine dikkat etmek, cihazınızın kullanılabilirliği için hayati önem taşır. Arch Linux ortamında bu işlemleri başarıyla tamamladıktan sonra, istediğiniz custom ROM'u yükleyebilir ve cihazınızın performansını artırabilirsiniz. Unutmayın, bu tür işlemler her zaman risk içerir, bu yüzden tüm adımları dikkatlice takip edin ve olası sorunlar için hazırlıklı olun. 🚀

Başarıyla ROM kurulumu yaptıktan sonra, cihazınızın yeni özelliklerini keşfetmeye başlayabilirsiniz. Herhangi bir sorunla karşılaşırsanız, yorumlar bölümünde bizimle paylaşmaktan çekinmeyin!

```bash
# USB cihazlarını listeleme
[friday13@baba ~]$ lsusb
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 2a7a:8a47  CASUE USB KB
Bus 001 Device 003: ID 292b:f115 USB 2.0 USB Audio Device
Bus 001 Device 004: ID 10c4:8108 Silicon Labs USB OPTICAL MOUSE
Bus 001 Device 021: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device (charging + debug)
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

Bus 001 Device 021: ID 18d1:4ee7 Google Inc. Nexus/Pixel Device (charging + debug)
Vendor ID burada 18d1 (Google Inc.) olarak gözüküyor

[responsive_img src="/images/crDroid-95-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]

[responsive_img src="/images/crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]