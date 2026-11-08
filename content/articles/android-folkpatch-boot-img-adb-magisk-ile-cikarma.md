Title: Android'de FolkPatch İçin Boot.img Dosyasını ADB ve Magisk ile Çıkarma
Date: 2026-11-07 04:26
Modified: 2026-11-07 04:26
Category: Sorun Giderme
Tags: android, folkpatch, boot.img, adb, magisk, root, android boot imajı, A/B partition, boot_a, boot_b, dd, permission denied, kernelpatch
Slug: android-folkpatch-boot-img-adb-magisk-ile-cikarma
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: FolkPatch kurulumu için Android cihazdan orijinal boot.img dosyasını ADB ve Magisk root kullanarak bilgisayara aktarmayı anlatıyoruz. A/B partition yapısında aktif slotu belirleme, Permission denied hatasını çözme, dd komutuyla boot imajını çıkarma ve orijinal dosyayı yedekleme adımları gerçek terminal çıktılarıyla açıklanıyor.
Template: article
Series: 12 Pro 5G
Series_index: 2

Android cihazınıza FolkPatch kurmak istiyorsanız ilk ihtiyacınız olan dosyalardan biri orijinal `boot.img` imajıdır. Bu dosyayı üreticinin resmî firmware paketinden elde edebilir veya doğrudan telefonunuzun boot bölümünden bilgisayarınıza aktarabilirsiniz.

FolkPatch'in resmî rehberinde ADB üzerinden boot imajı çıkarma yöntemi gösteriliyor. Ancak burada küçük bir sorun var: Her cihazda standart `adb pull` komutu yeterli olmayabiliyor. Özellikle boot bölümünü okumak için root izni gerektiğinde farklı bir yöntem kullanmak gerekiyor.

Bu yazıda ADB ile bağlı bir Android cihazın `boot.img` dosyasını nasıl çıkarabileceğimizi, A/B partition yapısında aktif slotu nasıl belirleyeceğimizi ve root erişimi kullanarak dosyayı bilgisayara nasıl aktarabileceğimizi anlatıyorum.

## Gerekli araçlar ve ön koşullar

İşleme başlamadan önce aşağıdakilerin hazır olması gerekiyor:

- ADB ve Fastboot araçları.
- USB hata ayıklaması etkin bir Android telefon.
- Bilgisayarda çalışan ADB bağlantısı.
- Boot bölümünü okuyabilecek root erişimi veya cihaza uygun resmî firmware paketi.
- Orijinal boot imajını saklamak için bilgisayarda yeterli boş alan.

**Önemli:** Root erişimi, bootloader kilidinin açık olması ve FolkPatch uyumluluğu birbirinden farklı konulardır. FolkPatch kullanmadan önce cihazınızın KernelPatch uyumluluğunu da kontrol etmelisiniz.

## 1\. Android cihazı ADB ile kontrol etme

İlk olarak telefonun bilgisayara doğru şekilde bağlandığını kontrol edelim.

Terminali açıp şu komutu çalıştırın:



```bash
adb devices
```

Bağlantı başarılı olduğunda benzer bir çıktı görürsünüz:



```bash
List of devices attached
79orfygmgecmw84t        device
```

Burada `device` ifadesinin görünmesi, ADB bağlantısının kurulduğunu gösterir.

Eğer `unauthorized` görüyorsanız telefon ekranındaki USB hata ayıklama izin isteğini onaylamanız gerekir.

## 2\. Boot partition yapısını öğrenme

Modern Android telefonların bir kısmında A/B partition sistemi kullanılır. Bu sistemde boot imajının iki ayrı kopyası bulunabilir:

- `boot_a`
- `boot_b`

Öncelikle cihazımızdaki boot bölümlerini listeleyelim:



```bash
adb shell ls -l /dev/block/by-name/ | grep boot
```

İşlem sırasında aldığımız gerçek terminal çıktısı:



```bash
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_a -> /dev/block/sdc32
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_b -> /dev/block/sdc56
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_para -> /dev/block/sdc42
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 vendor_boot_a -> /dev/block/sdc34
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 vendor_boot_b -> /dev/block/sdc58
```

Bu çıktıya göre cihazda hem A hem de B slotuna ait boot bölümleri bulunuyor.

Burada önemli bir ayrıntı var: `vendor_boot` ve `boot_para` bölümleri de listeleniyor. Ancak FolkPatch için ihtiyacımız olan dosya `boot.img` dosyasıdır. `vendor_boot` veya `init_boot` dosyasını bunun yerine kullanmamalıyız.

## 3\. Aktif slotu belirleme

Hangi boot bölümünü kullanmamız gerektiğini öğrenmek için şu komutu çalıştırıyoruz:



```bash
adb shell getprop ro.boot.slot_suffix
```

Terminal çıktısı:



```text
_a
```

Bu sonuç, Android'in mevcut oturumda A slotunu kullandığını gösteriyor.

Dolayısıyla çıkaracağımız bölüm:



```bash
/dev/block/by-name/boot_a
```

A/B sisteminde slotların farklı imajlar barındırabileceğini unutmayın. Bu nedenle aktif slotu kontrol etmeden rastgele bir boot bölümü seçmek doğru değildir.

## 4\. Standart ADB yöntemiyle boot.img çıkarmayı deneme

FolkPatch'in resmî rehberinde boot imajını almak için şu komut öneriliyor:



```bash
adb pull /dev/block/by-name/boot ./boot.img
```

Ancak bizim cihazımızda doğrudan bu yöntemi kullandığımızda izin hatasıyla karşılaştık.

Önce aktif slotun bölümünü çekmeyi denedik:



```bash
adb pull /dev/block/by-name/boot_a ~/boot.img
```

Aldığımız hata:



```bash
adb: error: failed to stat remote object
'/dev/block/by-name/boot_a': Permission denied
```

Buradaki sorun ADB bağlantısı değil. Cihaz bağlı olmasına rağmen normal ADB kabuğunun boot bölümünü okuma izni bulunmuyor.

Bu durumda root erişimimiz varsa başka bir yöntem kullanabiliriz.

## 5\. Root erişimini kontrol etme

Telefonumuzda Magisk bulunduğu için root erişimini kontrol ediyoruz:



```bash
adb shell su -c "id"
```

Aldığımız çıktı:



```bash
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

Burada `uid=0(root)` ifadesi root yetkisiyle komut çalıştırabildiğimizi gösteriyor.

Artık boot bölümünü okuyup telefonun depolama alanına kopyalayabiliriz.

**Not:** Bu yöntem Magisk veya başka bir root çözümü üzerinden `su` erişimi bulunan cihazlar içindir. Root erişimi olmayan telefonlarda bu komut çalışmaz.

## 6\. Root üzerinden boot.img dosyasını çıkarma

Şimdi aktif slot olan `boot_a` bölümünü okuyacağız.

Kullanacağımız komut:



```bash
adb shell su -c "dd if=/dev/block/by-name/boot_a of=/sdcard/boot.img"
```

Komutun ne yaptığını açıklayalım:

- `adb shell`: Telefonun komut satırına erişir.
- `su -c`: Komutu root yetkisiyle çalıştırır.
- `dd`: Bir kaynaktan ham veri okuyup hedefe yazar.
- `if=`: Okunacak kaynak bölümü belirtir.
- `of=`: Oluşturulacak dosyanın konumunu belirtir.

Bizim işlemimizde kaynak `boot_a`, hedef ise telefonun dahili depolamasındaki `/sdcard/boot.img` dosyasıdır.

Başarılı işlemden aldığımız çıktı:



```bash
262144+0 records in
262144+0 records out
134217728 bytes (128 M) copied, 0.566 s, 226 M/s
```

Bu çıktı, 134.217.728 bayt verinin okunduğunu ve hedef dosyaya yazıldığını gösteriyor.

Başka bir ifadeyle 128 MiB büyüklüğünde bir boot imajı oluşturuldu.

## 7\. Boot.img dosyasını bilgisayara aktarma

Boot imajı artık telefonun depolama alanında bulunuyor.

Şimdi ADB kullanarak bilgisayarımıza aktarıyoruz:



```bash
adb pull /sdcard/boot.img ~/boot.img
```

Başarılı aktarımın gerçek çıktısı:



```bash
/sdcard/boot.img: 1 file pulled, 0 skipped.
42.2 MB/s (134217728 bytes in 3.032s)
```

İşlem tamamlandı. Artık orijinal boot imajımız Linux kullanıcı dizininde bulunuyor.

Dosyanın konumu:


```bash
~/boot.img
```

## 8\. Orijinal boot.img dosyasını yedekleme

Bu aşamayı atlamamanızı öneririm.

Boot imajı, cihazın açılış sürecinde kullanılan önemli sistem dosyalarından biridir. Yanlış veya uyumsuz bir imaj kullanılması cihazın açılmamasına neden olabilir.

Öncelikle bilgisayardaki dosyanın mevcut olduğunu kontrol edin:



```bash
ls -lh ~/boot.img
```

Ardından orijinal dosyanın ikinci bir kopyasını oluşturun:



```bash
cp ~/boot.img ~/boot_original_backup.img
```

Dosyanın bütünlüğünü daha sonra kontrol edebilmek için SHA-256 değerini de kaydedebilirsiniz:



```bash
sha256sum ~/boot.img
```

Bu aşamada iki ayrı dosyamız olacak:



```bash
~/boot.img
~/boot_original_backup.img
```

Patch işlemini orijinal yedek üzerinde değil, çalışma kopyası üzerinde gerçekleştirmek daha güvenlidir.

## 9\. FolkPatch için boot.img hazırlama

Boot imajı artık bilgisayarımızda. Sırada FolkPatch Manager üzerinden patch işlemi var.

FolkPatch'in resmî rehberindeki temel işlem sırası şöyledir:

1. FolkPatch Manager uygulamasını telefona yükleyin.
2. Uygulamayı açın.
3. Sağ üst köşedeki patch seçeneğine girin.
4. `Select a boot image and patch` seçeneğini kullanın.
5. Hazırladığınız `boot.img` dosyasını seçin.
6. Patch işleminin tamamlanmasını bekleyin.

Patch işlemi tamamlandıktan sonra oluşan dosyayı orijinal dosyanın üzerine yazmayın. Ayrı bir isimle saklayın.

**Önemli:** FolkPatch, `boot` bölümünü patch eder. `init_boot` veya `vendor_boot` imajını seçmek doğru işlem değildir. Resmî rehber de bu konuda açık bir uyarı yapıyor.

## Sık karşılaşılan sorunlar

### Permission denied hatası



```bash
adb: error: failed to stat remote object
Permission denied
```

**Nedeni:** Normal ADB kabuğunun boot bölümünü okuma izni bulunmuyor.

**Çözüm:** Root erişiminiz varsa `su -c` ile `dd` yöntemini kullanabilirsiniz. Root yoksa cihazınıza uygun resmî firmware paketinden boot imajını çıkarabilirsiniz.

### ADB cihazı görmüyor



```text
List of devices attached
```

Cihaz listesi boşsa USB bağlantısını, USB hata ayıklama ayarını ve bilgisayardaki ADB kurulumunu kontrol edin.

### Yanlış slotun seçilmesi

Cihazınızda `boot_a` ve `boot_b` varsa aktif slotu öğrenmek için:



```bash
adb shell getprop ro.boot.slot_suffix
```

Sonuca göre uygun bölümü seçin. Diğer slotun imajının aynı veya güncel olduğunu varsaymayın.

## Sonuç

Bu işlemde Android cihazın A/B partition yapısını inceledik, aktif slotu belirledik ve standart ADB aktarımında karşılaştığımız `Permission denied` hatasını root üzerinden `dd` kullanarak aştık.

Sonuç olarak 128 MiB büyüklüğündeki orijinal `boot_a` imajını bilgisayarımıza aktardık.

FolkPatch kurulumu öncesinde orijinal boot imajını saklamak, olası açılış sorunlarında geri dönüş imkânı açısından önemlidir. Root işlemlerinde acele etmek yerine doğru bölümün seçildiğinden ve yedek dosyanın sağlam olduğundan emin olmak gerekir.

---

## Kaynaklar

- [FolkPatch – Install / Use: Get Necessary Files](<https://fp.mysqil.com/en/guide/get-started/>)
- Android Open Source Project – A/B System Updates
- Android Open Source Project – Implement A/B Updates