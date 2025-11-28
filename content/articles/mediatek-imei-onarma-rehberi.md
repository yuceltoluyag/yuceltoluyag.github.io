Title: MediaTek IMEI Onarma Rehberi  
Date: 2025-08-11 10:30  
Modified: 2025-08-11 22:59
Category: Sorun Giderme  
Tags: MediaTek IMEI onarma, MTK IMEI fix, TWRP IMEI repair, MediaTek imei patch, Arch Linux  
Slug: mediatek-imei-onarma-rehberi  
Authors: yuceltoluyag  
Lang: tr
Translation: false
Status: published  
Summary: MediaTek işlemcili telefonlarda IMEI onarma adımlarını, Arch Linux ortamında mtk_imei aracıyla nasıl yapacağınızı detaylı olarak öğrenin.  
Template: article
Series: Android Rehberleri
Series_index: 1
Image: images/crDroid-95-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115011891140145918
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lw5vf4k4wk2t

## MediaTek IMEI Yedek Alma - Onarma Rehberi 📱

!!! danger "⚠️ <strong>Dikkat!</strong> Bu işlemler risklidir ve cihazınızda geri dönüşü olmayan sorunlara yol açabilir.Bu rehberde anlatılan adımları uygulamak tamamen <strong>kendi sorumluluğunuzdadır</strong>.Herhangi bir sorun yaşanması durumunda içerik sahibi sorumlu tutulamaz."

!!! warning "📱 İşlem sırasında telefonunuzdaki önemli veriler (uygulamalar, ayarlar, dosyalar vb.) kaybolabilir.Mutlaka işlem öncesi yedeklerinizi alın ve önemli dosyalarınızı yedekleyin."

!!! note "💡 Bu yazılım ve yöntem sadece aşağıdaki MediaTek cihazlarda test edilmiştir ve desteklenmektedir:"

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
4. **mtk_imei** aracı (GitHub: [timjosten/mtk_imei](https://github.com/timjosten/mtk_imei){: target="\_blank" rel="noopener noreferrer"}))
5. TWRP Recovery yüklü MediaTek cihaz
6. USB kablo

!!! note "Arch Linux kullanıyorsan, terminalde aşağıdaki komutlarla gerekli paketleri yükleyebilirsin:"

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

!!! tip "Henüz scripti çalıştırmayın, önce config dosyasını hazırlamamız gerekiyor."

### 2️⃣ Adım: Chip ID ve Config Dosyasını Hazırlama

Cihazınızın chip ID'sini alın:

```bash
adb shell getprop ro.boot.chipid
```

!!! note "💡 chip_id değeri 0x + 32 hexadecimal karakterden oluşmalıdır (toplam 34 karakter)."

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

!!! note "config.txt dosyası JSON formatında olmalıdır. wifi_mac ve bt_mac alanları boş bırakılamaz; 12 haneli hexadecimal değer olmalıdır."

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

!!! warning "Yanlış işlem sonrası geri dönüş için mutlaka yedek alın."

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

!!! warning "IMEI Görünmüyor mu ? Eğer IMEI görünmüyorsa, <code>config.txt</code> içindeki <code>"imei_1"</code> değerini <code>"000000000000000"</code> yapıp sadece gerçek IMEI'yi <code>"imei_2"</code> alanına yazmayı deneyin."

!!! warning "Bootloader Uyarısı Bu işlemden sonra <strong>bootloader kilidini tekrar kapatmak mümkün olmayabilir.</strong>"

!!! note "Geri Yükleme, Sorun yaşarsanız, yedeklediğiniz NVRAM ve NVDATA'yı TWRP üzerinden geri yükleyebilirsiniz."

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

- **MTK IMEI Aracı**: [GitHub'da mtk_imei](https://github.com/timjosten/mtk_imei){: target="\_blank" rel="noopener noreferrer"}
- **TWRP Kurulumu**: Cihazınız için uygun TWRP sürümünü : ROM'un resmi telegram kanalından veya XDA Developers forumundan bulabilirsiniz. [ROM UNOFFICIAL begonia 13 crDroidAndroid
  ](https://xdaforums.com/t/rom-unofficial-begonia-13-crdroidandroid.4558845/){: target="\_blank" rel="noopener noreferrer"}
- **ADB/Fastboot Kurulumu**: [Android Geliştirici Sitesi](https://developer.android.com/studio/command-line/adb){: target="\_blank" rel="noopener noreferrer"}
- **Diğer Sorun Giderme Rehberleri**: [Sorun Giderme Kategorimiz](/kategori/sorun-giderme)

### 📞 Sen de Deneyimlerini Paylaş!

Bu rehber işine yaradıysa veya takıldığın noktalar olduysa, yorumlarda sorularını ve görüşlerini paylaşabilirsin. Başka MediaTek sorunları için [forumumuz](https://www.reddit.com/r/Kanunsuzlar/){: target="\_blank" rel="noopener noreferrer"} da destek alabilirsin. 🙌

---

[responsive_img src="/images/crDroid-95-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]

[responsive_img src="/images/crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]
