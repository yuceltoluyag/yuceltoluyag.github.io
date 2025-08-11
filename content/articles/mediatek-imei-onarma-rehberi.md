Title: MediaTek IMEI Onarma Rehberi  
Date: 2025-08-11 10:30  
Modified: 2025-08-11 22:48
Category: Sorun Giderme  
Tags: MediaTek IMEI onarma, MTK IMEI fix, TWRP IMEI repair, MediaTek imei patch, Arch Linux  
Slug: mediatek-imei-onarma-rehberi  
Authors: yuceltoluyag  
Status: published  
Summary: MediaTek işlemcili telefonlarda IMEI onarma adımlarını, Arch Linux ortamında mtk_imei aracıyla nasıl yapacağınızı detaylı olarak öğrenin.  
Template: article
Series: Android Rehberleri
Series_index: 1
Image: images/crDroid-95-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/115011891140145918



# MediaTek IMEI Yedek Alma - Onarma Rehberi 📱

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

<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Bilgi</div>
        <p>💡 Bu yazılım ve yöntem sadece aşağıdaki MediaTek cihazlarda test edilmiştir ve desteklenmektedir:</p>
        <ul>
          <li>Redmi Note 8 Pro</li>
          <li>Redmi Note 10S / Redmi Note 11 SE / POCO M5s</li>
          <li>Redmi Note 12S</li>
          <li>Redmi 10 / Redmi 10 2022 / Redmi 10 Prime / Redmi 10 Prime 2022 / Redmi Note 11 4G</li>
          <li>Redmi 12C / POCO C55</li>
          <li>Redmi 12</li>
          <li>Redmi 9</li>
        </ul>
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

## 🎯 Giriş Bölümü

MediaTek (MTK) tabanlı Android cihazlarda **IMEI sorunları**, özellikle ROM yükleme veya yazılım güncellemeleri sonrası sıkça karşılaşılan bir problemdir. IMEI, telefonunuzun benzersiz kimlik numarasıdır ve **silindiğinde veya bozulduğunda** cihazınızın şebekeye bağlanması engellenir. Yanlış ROM kurulumu, yazılım hataları veya NVRAM problemleri nedeniyle bu sorun ortaya çıkabilir.

Bu rehberde, **MediaTek IMEI onarma** işlemini Arch Linux tabanlı sisteminizde, `mtk_imei` aracı kullanarak nasıl kolayca yapacağınızı öğreneceksiniz. Rehberimizde şu konuları ele alacağız: IMEI sorunlarının nedenleri, gerekli araçların kurulumu, chip ID'nin nasıl alınacağı, config dosyasının hazırlanması, flashable zip oluşturma, NVRAM yedekleme, flashlama işlemi ve doğrulama adımları. Ayrıca olası sorunlar için çözüm önerileri sunacağız.

---

## 🔍 Neden IMEI Onarma Gerekir?

IMEI, telefonunuzun benzersiz kimlik numarasıdır ve **silindiğinde veya bozulduğunda** cihazınızın şebekeye bağlanması engellenir. Yanlış ROM kurulumu, yazılım hataları veya NVRAM problemleri nedeniyle bu sorun ortaya çıkabilir. Bu durumda:
- Telefonunuz şebekeye bağlanamaz
- Arama yapamazsınız
- SMS gönderemezsiniz
- Mobil veri kullanamazsınız

Bu rehberle bu sorunu teknik olarak nasıl çözeceğinizi öğreneceksiniz.

---

## 📦 Gereksinimler ve Hazırlıklar

İşleme başlamadan önce aşağıdaki gereksinimleri sağladığınızdan emin olun:

1. **Linux, Windows, Mac** tabanlı bir sistem (Arch Linux kullanıyoruz)
2. `adb` ve `fastboot` araçları kurulu olmalı
3. `php` kurulumu (mtk_imei aracı PHP ile çalışır)
4. **mtk_imei** aracı (GitHub: [timjosten/mtk_imei](https://github.com/timjosten/mtk_imei))
5. TWRP Recovery yüklü MediaTek cihaz
6. USB kablo

<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Bilgi</div>
        <p>Arch Linux kullanıyorsan, terminalde aşağıdaki komutlarla gerekli paketleri yükleyebilirsin:</p>
        <pre><code>sudo pacman -Syu android-tools php git</code></pre>
    </div>
</div>

- android-udev Paketi Kurulumu (Kritik Adım)
<div class="info-box important">
<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<div>
<div class="alert-title">Önemli</div>
<p>android-udev paketi olmadan ADB/Fastboot ile cihaz tanıma sorunları yaşanır. Bu paket Android cihazların Linux'ta düzgün tanınmasını sağlar.</p>
</div>
</div>

Kurulum ve kontrol için:

```bash
sudo pacman -S android-udev
pacman -Qi android-udev
Name            : android-udev
Version         : 20250525-1
Description     : Udev rules to connect Android devices to your linux box
Architecture    : any
URL             : https://github.com/M0Rf30/android-udev-rules
Licenses        : GPL-3.0-only

sudo udevadm control --reload-rules
sudo udevadm trigger
```


---

## 🛠️ Adım Adım IMEI Onarma Süreci

### 1️⃣ Adım: Gerekli Araçların Kurulumu

İlk olarak mtk_imei aracını GitHub'dan indirin:

```bash
git clone https://github.com/timjosten/mtk_imei.git
cd mtk_imei
```

<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>Henüz scripti çalıştırmayın, önce config dosyasını hazırlamamız gerekiyor.</p>
    </div>
</div>

### 2️⃣ Adım: Chip ID ve Config Dosyasını Hazırlama

Cihazınızın chip ID'sini alın:

```bash
adb shell getprop ro.boot.chipid
```

<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>💡 chip_id değeri 0x + 32 hexadecimal karakterden oluşmalıdır (toplam 34 karakter).</p>
    </div>
</div>

Örnek çıktı:
```
0x1234abcd5678ef90123456789abcdef0
```

`config.txt` dosyasını `mtk_imei` klasöründe **JSON formatında** oluşturun:

```json
{
  "patch_cert": 0,
  "device": "begonia",
  "kernel": "4.14.186",
  "chip_id": "0x1234abcd5678ef90123456789abcdef0",
  "imei_1": "123456789012345",
  "imei_2": "543210987654321",
  "wifi_mac": "001122334455",
  "bt_mac": "66778899aabb"
}
```

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Önemli</div>
        <p>config.txt dosyası JSON formatında olmalıdır. wifi_mac ve bt_mac alanları boş bırakılamaz; 12 haneli hexadecimal değer olmalıdır.</p>
    </div>
</div>

Wi-Fi ve Bluetooth MAC adreslerini almak için:
```bash
adb shell cat /sys/class/net/wlan0/address
adb shell cat /sys/class/bluetooth/hci0/address
```

Dosya formatını kontrol edin:
```bash
file config.txt
```

CRLF varsa düzeltin:
```bash
sed -i 's/\r$//' config.txt
```

### 3️⃣ Adım: IMEI Onarma Paketini Oluşturma

`mtk_imei.sh` scriptini çalıştırarak flashable `.zip` dosyasını oluşturun:

```bash
./mtk_imei.sh
```

Başarılı olduğunda şu çıktıyı alacaksınız:
```
MTK IMEI patcher by timjosten
Success!
```

`out/` klasöründe `imei_repair-<device>-<kernel>.zip` dosyası oluşacaktır.

### 4️⃣ Adım: NVRAM ve NVDATA Yedeği Alma

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Yedek Alma</div>
        <p>Yanlış işlem sonrası geri dönüş için mutlaka yedek alın.</p>
    </div>
</div>

Telefonu **TWRP Recovery** modunda açın:
1. **Backup** menüsüne girin
2. **NVRAM** ve **NVDATA** bölümlerini seçin
3. Yedeği SD karta veya bilgisayara kaydedin

### 5️⃣ Adım: IMEI Onarma Zip Dosyasını Flashlama

IMEI onarma dosyasını telefona gönderin:
```bash
adb push out/imei_repair-begonia-4.14.186.zip /sdcard/
```

Telefonu TWRP modunda açın:
1. **Install** menüsüne gidin
2. `imei_repair-*.zip` dosyasını seçin
3. **Swipe to confirm flash** yaparak yükleyin
4. İşlem bitince **Reboot > Recovery** ile yeniden başlatın

### 6️⃣ Adım: IMEI'nin Doğrulanması

Telefon açıldıktan sonra:
- **Ayarlar > Telefon Hakkında > IMEI** kısmından kontrol edin
- Ya da telefon tuşlayıcısında `*#06#` kodunu girin

IMEI numaralarının doğru göründüğünden emin olun.

---

## ⚠️ Sorun Giderme İpuçları

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">IMEI Görünmüyor mu?</div>
        <p>Eğer IMEI görünmüyorsa, <code>config.txt</code> içindeki <code>"imei_1"</code> değerini <code>"000000000000000"</code> yapıp sadece gerçek IMEI'yi <code>"imei_2"</code> alanına yazmayı deneyin.</p>
    </div>
</div>

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Bootloader Uyarısı</div>
        <p>Bu işlemden sonra <strong>bootloader kilidini tekrar kapatmak mümkün olmayabilir.</strong></p>
    </div>
</div>

<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Geri Yükleme</div>
        <p>Sorun yaşarsanız, yedeklediğiniz NVRAM ve NVDATA'yı TWRP üzerinden geri yükleyebilirsiniz.</p>
    </div>
</div>

---

## 🎯 Sonuç ve Özet

Bu rehberle MediaTek işlemcili cihazlarda **Arch Linux** ortamında IMEI onarma işlemini kolayca yapabilirsiniz. Özetle:
1. Gerekli araçları kurduk
2. Chip ID ve config dosyasını hazırladık
3. Flashable zip oluşturduk
4. NVRAM yedeği aldık
5. Flashlama işlemini gerçekleştirdik
6. IMEI'yi doğruladık

Her zaman işlem öncesi yedek almayı unutmayın ve adımları dikkatlice takip edin. Bu işlemle cihazınızın şebekeye bağlanma sorununu çözebilirsiniz.

### 🔗 İlgili Kaynaklar ve Sonraki Adımlar
- **MTK IMEI Aracı**: [GitHub'da mtk_imei](https://github.com/timjosten/mtk_imei)
- **TWRP Kurulumu**: Cihazınız için uygun TWRP sürümünü : ROM'un resmi telegram kanalından veya XDA Developers forumundan bulabilirsiniz. [ROM UNOFFICIAL begonia 13 crDroidAndroid
](https://xdaforums.com/t/rom-unofficial-begonia-13-crdroidandroid.4558845/)
- **ADB/Fastboot Kurulumu**: [Android Geliştirici Sitesi](https://developer.android.com/studio/command-line/adb)
- **Diğer Sorun Giderme Rehberleri**: [Sorun Giderme Kategorimiz](/kategori/sorun-giderme)

### 📞 Sen de Deneyimlerini Paylaş!
Bu rehber işine yaradıysa veya takıldığın noktalar olduysa, yorumlarda sorularını ve görüşlerini paylaşabilirsin. Başka MediaTek sorunları için [forumumuz](https://www.reddit.com/r/Kanunsuzlar/)da destek alabilirsin. 🙌

---

[responsive_img src="/images/crDroid-95-lg.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]

[responsive_img src="/images/crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro-lg.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]
