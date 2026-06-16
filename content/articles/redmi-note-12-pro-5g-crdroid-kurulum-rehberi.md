Title: Redmi Note 12 Pro 5G (ruby) için crDroid Kurulum Rehberi
Date: 2026-06-14 00:22
Category: Mobil
Tags: Android, Custom ROM, crDroid, Xiaomi, Root, Redmi Note 12 Pro
Slug: redmi-note-12-pro-5g-crdroid-kurulum-rehberi
Authors: yuceltoluyag
Status: published
Summary: Redmi Note 12 Pro 5G (ruby/rubyx) cihazınıza OrangeFox Recovery kullanarak adım adım crDroid Custom ROM yükleme rehberi.
Template: article
Lang: tr
Translation: false

Daha önce kendim için [Redmi Note 8 Pro Custom ROM Kurulumu](/redmi-note-8-pro-custom-rom-kurulumu/)[^4] rehberi hazırlamıştım. Yılların emektarı Redmi Note 8'imde severek kullandığım crDroid dünyasına öyle alışmıştım ki, sıradaki maceranın bu kadar "ıslak" olacağını tahmin etmezdim. 

Olay aynen şöyle gelişti dostum: Eşim evde temizlik yaparken, bizim ufaklık YouTube Kids'deki bir videoya sinirleniyor. Hırsını alamayıp elindeki Redmi Note 12 Pro 5G'yi vileda kovasının içine birkaç kez güzelce batırıp çıkartarak kendi çapında deneysel bir "suya dayanıklılık testi" gerçekleştiriyor ve ardından telefonu annesine teslim ediyor. Tabii telefon anında nakavt. Eşime yeni telefon aldıktan sonra bu canım emektarı tamir ettirdim ve telefon bana kaldı. 

Ancak cihazı açtığımda o abuk subuk reklamlar, kaldırılamayan çöp uygulamalar ve güncelleme almayan o hantal arayüz (HyperOS) canımı öyle sıktı ki, "emektar Note 8'deki crDroid keyfini buna da taşımanın vakti geldi" dedim. İşte bugün, o meşhur ruby[^1] kod adlı cihazımıza crDroid sürümünü sıfırdan nasıl kuracağımızı adım adım, kendi uyguladığım yöntemle anlatıyorum.

MediaTek işlemcili cihazlarda custom ROM yükleme konusu hep biraz korkutucu görünür ancak doğru adımları izlediğinde süreç aslında oldukça basittir. Bu rehberi sonuna kadar takip edersen, cihazını HyperOS hantallığından kurtarıp yağ gibi akan bir crDroid deneyimine kavuşturacaksın.

!!! danger "Veri Kaybı Uyarısı"
    Bu işlemler sırasında cihazındaki tüm veriler tamamen silinecektir. Fotoğraflarını, yedeklerini ve önemli dosyalarını bilgisayarına aktardığından emin ol. Ayrıca bu işlemler cihazını garanti dışı bırakabilir. Sorumluluk tamamen sana aittir.

!!! warning "Yurt Dışı (İşlemli) Cihazlar ve EFS / NVRAM Uyarısı"
    Sanal A/B bölüm tablosuna sahip MediaTek cihazlarda temiz kurulum (Format Data) esnasında veya ROM geçişlerinde, cihazın şebeke kalibrasyon ve donanım kimlik dosyalarını barındıran **EFS, NVRAM ve NVDATA** bölümleri sıfırlanabilir. Bu nedenle:

    *   **Yedekleme:** İşlemlere başlamadan önce cihazınızda **TWRP veya OrangeFox** gibi gelişmiş bir recovery üzerinden bu bölümlerin yedeğini (Backup) alıp bilgisayarınıza kaydetmeniz önerilir. crDroid Recovery yedek almayı desteklemez.
    *   **Yurt Dışı Cihazlar:** Eğer elindeki cihaz yurt dışı versiyonuysa ve yazılımsal yollarla şebeke aktivasyonu (IMEI işlemi) yapılmışsa, Format Data veya ROM yükleme adımları bu yazılımsal yamayı sıfırlayacak ve cihazı fabrikasyon ayarlarına geri döndürecektir. Kurulumu başarıyla tamamlasanız ve bootloader spoofing yapsanız dahi şebekenizin tekrar aktif olması için mutlaka bir telefoncuya gidip yama işlemini yeniletmeniz gerekecektir, aksi takdirde şebeke çalışmayacaktır. Bu sürecin en sorunsuz yolu resmi, BTK onaylı Türkiye lisanslı cihazlarda uygulanmasıdır. Eğer yurt dışı cihazda bu rehberi uygulayacaksanız, harici olarak böyle bir teknik servis masrafının çıkacağını en baştan bilmeniz gerekir.

---

## 🛠️ Kurulum Öncesi Hazırlıklar

İşlemlere başlamadan önce bilgisayarımızda ve telefonumuzda bazı araçların hazır olması gerekiyor:

1.  **Unlocked Bootloader:** Cihazının bootloader kilidi açık olmalıdır. Kilit açık değilse custom ROM yükleyemezsin.
2.  **Platform Tools:** Bilgisayarında ADB ve Fastboot komutlarının çalışabilmesi için sürücülerin kurulu olması gerekir.
3.  **Dosyalar:** Aşağıdaki dosyaları bilgisayarına indirip hazırlamalısın:
    *   Redmi Note 12 Pro 5G uyumlu **crDroid ROM zip** dosyası. Dosyaları resmi [crDroid.net/rubyx](https://crdroid.net/rubyx){: target="_blank" rel="noopener noreferrer"} sayfasından indirebilirsin (İndirirken`rubyx` ortak kod adını taşıyan dosyayı seçtiğinden emin ol).
    *   Cihazına uyumlu **crDroid Recovery (`boot.img`)** dosyası. (Sanal A/B yapısı nedeniyle recovery doğrudan önyükleme bölümündedir).
    *   Google servislerini kullanmak istiyorsan ROM sürümüne uygun **GApps** paketi[^2].
    *   (İsteğe bağlı) Root yetkisi istiyorsan **Magisk zip** dosyası[^3].
    *   Şebeke ve Anabant (Baseband) aktivasyonu için **Bootloader Spoofing dosyaları**:`ruby-lk-kaeru.bin.signed.img` ve`preloader_raw.img` (veya`preloader_ruby.bin`)[^5]. Bunları [Google Drive](https://drive.google.com/drive/folders/1kSbwkNFpNVxVgadq-oOEmCSmMPY_GBID?usp=sharing){: target="_blank" rel="noopener noreferrer"} klasöründen temin edebilirsin.

---

## 🏗️ Adım Adım Kurulum Aşamaları

### Cihaz Modelini ve Bağlantıyı Doğrulamak (Opsiyonel)

İşlemlere başlamadan önce telefonunun açık olduğundan, USB Hata Ayıklama seçeneğinin aktif olduğundan emin ol ve bilgisayarından şu komutlarla doğrulamayı yap:

```bash
$ adb devices
List of devices attached
79orfygmgecmw84t        device

$ adb shell getprop ro.product.device
ruby

$ adb shell getprop ro.product.model
22101316G
```

Yukarıdaki gibi cihaz kimliğini ve`ruby` kod adını görüyorsan, elindeki cihaz tam olarak bu rehbere uygundur.

### Adım 1: Cihazı Fastboot Moduna Almak

İlk olarak telefonumuzu bilgisayara komut gönderebileceğimiz Fastboot moduna alıyoruz.

*   **Önerilen Yöntem (Komut Satırı):** Telefonun açık ve bilgisayara bağlı durumdaysa uçbirimden şu komutu girerek doğrudan Fastboot moduna geçebilirsin:

```bash
$ adb reboot bootloader
```
*   **Alternatif Yöntem (Tuş Kombinasyonu):** Telefon kapalıyken **Güç (Power)** ve **Ses Kısma (Volume Down)** tuşlarına aynı anda basılı tut. Ekranda "FASTBOOT" yazısını veya ikonunu gördüğünde tuşları bırak ve USB kablosuyla bilgisayara bağla.

### Adım 2: Cihaz Kod Adını Teyit Etmek

İndirdiğimiz ROM dosyasının elindeki cihazla eşleştiğinden emin olmak için Platform Tools klasörünün içinde bir uçbirim (cmd veya powershell) aç ve şu komutu gir:

```bash
$ fastboot getvar product
```

Bu komutu çalıştırdığında uçbirimde`product: ruby` veya`product: rubyx` çıktısını almalısın. Eğer başka bir cihaz kodu görürsen işlemleri derhal durdur.

!!! tip "Cihaz Tanıma Sorunu"
    Eğer komut çalışmasına rağmen alt satır boş kalıyorsa bilgisayarında Xiaomi Fastboot sürücüleri eksik demektir. Bu durumda manuel yükleme yapmak yerine, sürücü kurulumunu otomatikleştiren şu pratik batch scriptini bir metin belgesine yapıştırıp`.bat` uzantısıyla (örneğin`surucu-yukle.bat`) kaydederek yönetici olarak çalıştırabilirsin:

    Alternatif olarak, masaüstüne çıkarttığın [Xiaomi USB Sürücüsü](http://bigota.d.miui.com/tools/xiaomi_usb_driver.rar){: target="_blank" rel="noopener noreferrer"} dosyasını Aygıt Yöneticisi üzerinden manuel olarak güncelleyebilirsin. Detaylı adımlar yazının sonundaki hatalar kısmında yer alıyor.

```batch
    @echo off
    echo Sürücü kurulumu başlatılıyor, lütfen bekleyin...
    net session >nul 2>&1
    if NOT %errorLevel% == 0 (
        powershell -executionpolicy bypass start -verb runas '%0' am_admin & exit /b
    )
    cd %~dp0
    PowerShell -executionpolicy bypass -Command "(New-Object Net.WebClient).DownloadFile('https://cdn.jsdelivr.net/gh/fawazahmed0/Latest-adb-fastboot-installer-for-windows@master/Latest-ADB-Installerbat', 'adbinstaller.bat')"
    cls
    call adbinstaller.bat
    del /f adbinstaller.bat > nul 2>&1
```

### Adım 3: Custom Recovery Flaşlamak

Telefonumuzu kurtarma moduna almak için indirdiğimiz recovery kalıbını yüklüyoruz. Redmi Note 12 Pro 5G gibi yeni nesil sanal A/B bölüm tablosuna sahip cihazlarda ayrı bir recovery bölümü bulunmaz; recovery doğrudan önyükleme (`boot`) bölümünün içine yazılır. Bu yüzden indirdiğin dosya **`boot.img`** adındadır:

```bash
$ fastboot flash boot boot.img
Sending 'boot_a' (131072 KB)                       OKAY [  3.117s]
Writing 'boot_a'                                   OKAY [  0.339s]
Finished. Total time: 3.470s
```

Flaşlama işlemi bittikten sonra cihazı doğrudan kurtarma modunda yeniden başlatıyoruz:

```bash
$ fastboot reboot recovery
Rebooting into recovery                            OKAY [  0.001s]
Finished. Total time: 0.002s
```

Cihaz kapanıp ekranda mor/siyah renkli resmi crDroid Recovery arayüzüyle açılacaktır.

### Adım 4: Verileri Formatlamak (Format Data / Factory Reset)

Bu adım şifrelemeyi çözmek ve temiz bir kurulum yapmak için hayati önem taşır.

1.  Açılan kurtarma (recovery) ekranında ses tuşlarını kullanarak **Factory reset** seçeneğine gel ve güç tuşuyla seç.
2.  Ardından **Format data/factory reset** seçeneğine gir.
3.  Gelen onay ekranında **Format data** seçeneğini seçerek işlemi başlat.
4.  Ekranın altında "Data wipe complete" yazısı belirdiğinde geri tuşuyla ana menüye dön.

### Adım 5: ROM Dosyasını Flaşlamak (ADB Sideload)

Dinamik bölümlü yeni nesil cihazlarda, bilgisayardan dosya kopyalamakla uğraşmak yerine en kararlı yöntem olan **ADB Sideload** köprüsünü kullanıyoruz. Telefonun hâlâ bilgisayara bağlı olduğundan emin ol:

1.  Telefon ekranında ana menüden **Apply update** seçeneğine gir.
2.  Ardından **Apply from ADB** seçeneğini seç. Telefon artık bilgisayardan dosya transferi beklemeye başlayacaktır.
3.  Bilgisayarında,`platform-tools` klasörünün içindeki terminalde şu komutu çalıştır (ROM dosyasının adını yaz veya sürükle-bırak):

```bash
$ adb sideload crDroidAndroid-16.0-20260606-rubyx-v12.10.zip
```

4.  Flaşlama işleminin bitmesini bekle. Terminalde`Total xfer: 1.00x` veya telefonda`%100` yazacaktır.
5.  Flaşlama bittiğinde telefon ekranında şu soru belirecektir:
    *"Install additional packages? You need to reboot recovery first. Do you want to reboot to recovery now?"*
    (Ek paket yüklemek istiyor musun? Önce recovery'yi yeniden başlatmalısın. Şimdi yeniden başlatılsın mı?)
6.  Burada kesinlikle **YES** seçeneğini seç. Telefon otomatik olarak yeni kurulan slot üzerinden recovery modunda yeniden başlayacaktır.

### Adım 6: Google Servislerini Yüklemek (GApps - Kritik Aşama)

!!! warning "Doğrudan Flaşlamayın!"
    ROM sideload bittikten hemen sonra GApps paketini flaşlamaya çalışırsan imza ve slot hataları alırsın. Bu yüzden yukarıdaki adımda recovery'yi yeniden başlatma sorusuna mutlaka **YES** demelisin.

1.  Cihaz recovery modunda tekrar açıldığında sırasıyla **Apply update -> Apply from ADB** seçeneklerine gir.
2.  Bilgisayardaki uçbirimden indirdiğin GApps dosyasını (GApps için [NikGApps crDroid Official](https://nikgapps.com/crdroid-official){: target="_blank" rel="noopener noreferrer"} paketini kullanabilirsin) gönder:

```bash
$ adb sideload NikGapps-crdroid-official-arm64-16-signed.zip
```

### Adım 7: İsteğe Bağlı Root (Magisk) Yüklemesi

Telefonunu rootlamak istiyorsan, GApps kurulumundan sonra şu adımları takip et:

1.  Geri tuşuyla ana menüye dön.
2.  **Advanced -> Reboot to recovery** seçeneğiyle recovery'yi bir kez daha yeniden başlat.
3.  Açılışta tekrar **Apply update -> Apply from ADB** yolunu izle.
4.  Bilgisayardan şu komutla Magisk zip dosyasını gönder:

```bash
$ adb sideload Magisk.zip
```

### Adım 8: Şebeke ve Anabant Aktivasyonu (Bootloader Spoofing - Kritik Aşama)

MediaTek tabanlı ruby platformunda custom ROM yüklediğinde, bootloader kilidi açık olduğu için modem güvenlik protokolüne takılır ve şebeke vermez (anabant sürümü "Bilinmiyor" olarak görünür). Bu kilidi aşmak için bootloader durumunu kilitli (spoof) olarak göstermeliyiz:

1.  Cihazın açık durumdaysa uçbirimden`$ adb reboot bootloader` komutuyla, kapalıysa **Güç + Ses Kısma** tuşlarıyla tekrar Fastboot moduna al ve bilgisayara bağla.
2.  Hazırladığın`ruby-lk-kaeru.bin.signed.img` ve`preloader_raw.img` (veya`preloader_ruby.bin`) dosyalarının bulunduğu klasörde terminal açarak şu komutları sırayla çalıştır:

```bash
$ fastboot flash lk_a ruby-lk-kaeru.bin.signed.img
$ fastboot flash lk_b ruby-lk-kaeru.bin.signed.img
$ fastboot flash preloader_a preloader_raw.img
$ fastboot flash preloader_b preloader_raw.img
```
3.  Flaşlama bittiğinde bootloader'ı şu komutla yeniden başlat:

```bash
$ fastboot reboot bootloader
```
4.  Fastboot ekranı tekrar geldiğinde şu komutla kilidi gizleme özelliğini aktif et:

```bash
$ fastboot oem bldr_spoof on
```
 
    *(Uçbirimde`(bootloader) Bootloader spoofing enabled.` onayını gördüğünden emin ol).*

### Adım 9: Sistemi Yeniden Başlatmak

Tüm işlemler tamamlandığına göre sistemi başlatabiliriz:

1.  Terminalden cihazı yeniden başlatmak için şu komutu gir:

```bash
$ fastboot reboot
```

İlk açılış crDroid animasyonu ile gerçekleşecek ve normalden biraz uzun sürebilir. Cihaz açıldığında kurulum ekranını tamamlayıp sim kartını taktığında şebekenin yağ gibi aktığını göreceksin.

---

## 🚫 Olası Hatalar ve Çözümleri (Edge Cases)

*   **Cihaz Sürekli Recovery'e Geri Dönüyor (Bootloop):**
    Adım 4'te anlatılan **Format Data** işlemini yapmamış veya`yes` yazarak onaylamamış olabilirsin. Recovery'e girip Format Data işlemini tekrarlarsan cihazın sorunsuz açılacaktır.
*   **GApps Yüklenirken Hata Veriyor (Error 1):**
    Adım 6'daki kuralı atlayıp, ROM flaşlandıktan hemen sonra recovery'i yeniden başlatmadan GApps flaşlamaya çalışmışsın demektir. Cihazı recovery modunda yeniden başlatıp GApps zip dosyasını tekrar flaşlamayı dene.
*   **Sideload Sırasında "/metadata/ota no such file or directory" Uyarısı:**
    Bu uyarı tamamen zararsızdır ve panik yapmaya gerek yoktur. Format Data işleminden sonra metadata bölümündeki OTA klasörü silindiği için recovery bu uyarıyı gösterir. Bilgisayar ekranında`serving: ...` yüzdesi ilerlediği sürece yükleme sorunsuz devam ediyor demektir, kabloyu kesinlikle sökme.
*   **Fastboot Modunda Cihazın Görünmemesi (Waiting for Device):**
   `fastboot devices` komutu boş dönüyor veya`< waiting for any device >` hatasında kalıyorsa, bu durum Windows Fastboot sürücülerinin eksikliğinden veya USB 3.0/Ryzen uyumsuzluğundan kaynaklanır. Sürücüleri güncellemek için Aygıt Yöneticisi'ne girip sarı ünlemli cihazına sağ tıklayarak **Sürücüyü Güncelleştir -> Sürücü yazılımı için bilgisayarımı tara -> Bilgisayarımdaki kullanılabilir sürücüler listesinden seçmeme izin ver** adımlarını izle. Oradan **Android Bootloader Interface** sürücüsünü el ile göstererek yükleyebilirsin. Ayrıca mavi renkli USB 3.0 portları yerine varsa USB 2.0 portlarını oradaki pratik batch scriptini veya arada bir USB Hub kullanmayı dene.
*   **SIM Kart Takılı Olmasına Rağmen "Mobil Ağ Kullanılamıyor" ve Anabant "Bilinmiyor" Hatası:**
    MediaTek işlemcili bu cihazda bootloader kilidi açık olduğunda modem güvenlik protokolü nedeniyle kendini devre dışı bırakır. Adım 8'deki **Bootloader Spoofing** adımlarını uyguladığından ve terminalde`Bootloader spoofing enabled.` çıktısını aldığından emin ol.

Gözün aydın dostum, artık Redmi Note 12 Pro 5G cihazında en güncel ve hafif crDroid arayüzünü deneyimlemeye hazırsın. Kurulum sırasında takıldığın bir yer olursa sormaktan çekinme.

[^1]: Ruby, Redmi Note 12 Pro 5G modelinin kod adıdır; rubyx ise custom ROM dünyasında Note 12 Pro 5G, Pro+ 5G ve Discovery modellerini birleştiren ortak ağaç adıdır.
[^2]: GApps (Google Apps), Google Play Store ve ilişkili servisleri barındıran paketlerdir.
[^3]: Magisk, sistem dosyalarını kalıcı olarak bozmadan cihazı rootlamaya yarayan açık kaynaklı bir araçtır.
[^4]: Yücel Toluyag'ın daha önce kaleme aldığı [Redmi Note 8 Pro Custom ROM Kurulumu](/redmi-note-8-pro-custom-rom-kurulumu/) rehberi.
[^5]: Bootloader durumunu kilitli göstererek modem/baseband kilidini aşmayı sağlayan Roger Ortiz imzalı özel yama dosyalarıdır.
