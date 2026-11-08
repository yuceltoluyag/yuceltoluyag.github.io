Title: Redmi Note 12 Pro 5G Root İşlemi: MTKClient ve FolkTool
Date: 2026-11-08
Category: Sorun Giderme
Tags: Android, Root, Xiaomi, Redmi Note 12 Pro 5G, MTKClient, FolkTool, Fastboot, crDroid
Slug: redmi-note-12-pro-5g-mtkclient-folktool-root
Authors: yuceltoluyag
Status: published
Summary: Xiaomi Redmi Note 12 Pro 5G (ruby) cihazımda MTKClient ile orijinal boot bölümlerini yedekledim. Ardından FolkTool 1.7.1 ile boot imajını patch edip Fastboot üzerinden yükledim. ADB ile slot bilgisini kontrol ettiğim ve root erişimini doğruladığım gerçek işlem adımlarını anlatıyorum.
Template: article
Lang: tr
Translation: false
Series: 12 Pro 5G
Series_index: 3


Redmi Note 12 Pro 5G cihazımda crDroid kullanırken root erişimini de kendi kontrolümde tutmak istedim. Bunun için MTKClient ile cihazın orijinal boot bölümlerini yedekledim, ardından FolkTool kullanarak boot imajını patch edip Fastboot üzerinden telefona yükledim.

Bu işlemde özellikle A/B bölüm yapısına dikkat ettim. Çünkü cihazda `boot_a` ve `boot_b` olmak üzere iki ayrı boot bölümü bulunuyor. Yanlış imajla veya yanlış slotta işlem yapmak istemediğim için önce bölüm tablosunu inceledim, sonra iki imajı da ayrı ayrı yedekledim.

Daha önce cihazıma crDroid kurarken izlediğim adımları [Redmi Note 12 Pro 5G crDroid kurulum rehberinde](/redmi-note-12-pro-5g-crdroid-kurulum-rehberi/) anlatmıştım. Bu yazıda ise ROM kurulumundan sonraki root işlemini ele alacağım.

## Kullandığım cihaz ve araçlar

İşlemi Xiaomi Redmi Note 12 Pro 5G (`ruby`) üzerinde gerçekleştirdim.

| Bileşen | Kullanılan araç / bilgi |
|---|---|
| Cihaz | Redmi Note 12 Pro 5G |
| Kod adı | `ruby` |
| Boot bölüm yapısı | A/B |
| Bölüm yedekleme | MTKClient |
| Boot patch | FolkTool 1.7.1 |
| Cihazla iletişim | ADB ve Fastboot |
| Bilgisayar tarafı | Windows ve Linux terminali |

Kullandığım projelerin bağlantıları:

- [MTKClient GitHub deposu](https://github.com/bkerler/mtkclient){: target="_blank" rel="noopener noreferrer"}
- [FolkTool GitHub deposu](https://github.com/LyraVoid/FolkTool){: target="_blank" rel="noopener noreferrer"}
- [FolkTool 1.7.1 sürüm sayfası](https://github.com/LyraVoid/FolkTool/releases/tag/1.7.1){: target="_blank" rel="noopener noreferrer"}

FolkTool 1.7.1 sürüm notunda KernelPatch 0.13.3 uyarlamasından ve FolkPatch/APatch üzerinden root elde etme sürecinden bahsediliyor. Ben de bu sürümü kullanarak boot imajını işledim.

!!! warning "Dikkat! Boot imajına müdahale etmek risklidir."
    Yanlış veya cihazla uyumsuz bir boot imajı telefonun açılmamasına neden olabilir. İşleme başlamadan önce orijinal imajları yedekleyin. Cihaza özgü bölümlerin yedeklerini de herkese açık platformlarda paylaşmayın.

## 1. MTKClient ile bölüm tablosunu görüntüleme

İlk olarak MTKClient üzerinden cihazın bölüm tablosunu görüntüledim:

```bash
python mtk.py printgpt
```

Komut sonucunda cihazdaki bölümler listelendi. Burada dikkatimi çeken nokta, tek bir `boot` bölümü yerine `boot_a` ve `boot_b` bölümlerinin bulunmasıydı. Ayrıca `vendor_boot_a` ve `vendor_boot_b` bölümleri de listede yer alıyordu.

Bu yapı, cihazın A/B bölüm düzenini kullandığını gösteriyordu. Dolayısıyla yalnızca bir boot imajını yedeklemek yerine iki slotu da ayrı dosyalar halinde saklamaya karar verdim.

## 2. Orijinal bölümlerin yedeğini alma

Patch işleminden önce orijinal dosyaları bilgisayarıma aldım. Yedekleri `IMEI_Yedek` isimli klasörde topladım.

Aldığım yedekler şunlardı:

| Bölüm | Yedek dosyası |
|---|---|
| `misc` | `misc_backup.bin` |
| `nvcfg` | `nvcfg_backup.bin` |
| `nvdata` | `nvdata_backup.bin` |
| `nvram` | `nvram_backup.bin` |
| `proinfo` | `proinfo_backup.bin` |
| `protect1` | `protect1_backup.bin` |
| `protect2` | `protect2_backup.bin` |
| `preloader` | `preloader_ruby.bin` |
| `boot_a` | `boot_a.img` |
| `boot_b` | `boot_b.img` |

Boot bölümlerini yedeklemek için kullandığım komut:

```bash
python mtk.py r boot_a,boot_b .\IMEI_Yedek\boot_a.img,.\IMEI_Yedek\boot_b.img
```

İşlem başarıyla tamamlandı. Her iki boot imajının boyutu da 128 MiB idi.

Preloader yedeğini ise şu komutla aldım:

```bash
python mtk.py dumppreloader
```

Bu aşamada MTKClient ile herhangi bir bölüme yazma veya silme işlemi yapmadım. Yaptığım işlemler bölüm tablosunu görüntülemek ve yedek almaktan ibaretti.

!!! warning "Cihaza özgü yedekleri koruyun."
    `nvram`, `nvdata`, `nvcfg` ve benzeri bölümler cihazınıza özel hassas veriler içerebilir. Bu dosyaları GitHub gibi herkese açık depolara yüklemeyin. Yedekleri güvenli bir yerde saklayın.

MTKClient'ın komutları ve diğer kullanım örnekleri için [projenin kullanım belgesine](https://github.com/bkerler/mtkclient/blob/main/README-USAGE.md){: target="_blank" rel="noopener noreferrer"} göz atabilirsiniz.

## 3. Aktif boot slotunu kontrol etme

Yedekleme tamamlandıktan sonra cihazın hangi slot üzerinden açıldığını ADB ile kontrol ettim:

```bash
adb shell getprop ro.boot.slot_suffix
```

Çıktı:

```text
_a
```

Yani cihaz A slotu üzerinden çalışıyordu.

Bu bilgi önemliydi. Çünkü patch işlemi için seçtiğim dosya `boot_a.img` olacaktı. Önce doğru imajı yedeklediğimden emin oldum, ardından FolkTool'a bu dosyayı verdim.

## 4. FolkTool 1.7.1 ile boot imajını patch etme

FolkTool'u açtıktan sonra giriş dosyası olarak MTKClient ile yedeklediğim `boot_a.img` dosyasını seçtim.

İşlem kaydında kullanılan kaynak dosya şu konumda görünüyordu:

```text
C:\Users\baba\Desktop\Work\mtkclient\IMEI_Yedek\boot_a.img
```

FolkTool kernel bölümünü açtı, GZIP biçimindeki kernel'i tespit etti ve patch işlemini gerçekleştirdi. Ardından imajı yeniden paketledi.

Log içerisinde şu mesajlar yer alıyordu:

```text
Kernel patched successfully
Patch complete
```

Oluşturulan dosya:

```text
C:\Users\baba\Documents\FolkTool\patched\boot_patched_2026-10-24 21-46-46.img
```

FolkTool loguna göre oluşturulan imajın boyutu 128 MiB idi.

Burada önemli nokta, patch işleminin kaynağının cihazdan doğrudan aldığım orijinal `boot_a.img` olmasıydı. Böylece başka bir firmware paketinden alınmış, cihazdaki mevcut yazılımla eşleşip eşleşmediği belirsiz bir imaj kullanmamış oldum.

## 5. Patch edilmiş imajı Fastboot ile yükleme

Patch işlemi tamamlandıktan sonra FolkTool cihazı Fastboot moduna aldı ve oluşturduğu imajı telefona yazdı.

Logda kullanılan komut şu şekildeydi:

```bash
fastboot flash boot "C:\Users\baba\Documents\FolkTool\patched\boot_patched_2026-10-24 21-46-46.img"
```

Araç, flash işleminin tamamlandığını bildirdi:

```text
Flash completed successfully
Flash successful
fastboot reboot
Device rebooted successfully
One-click flash completed!
```

Telefon yeniden başladı ve Android normal şekilde açıldı.

Ancak burada işlemin hangi slota yazıldığını da doğrulamak istedim. Çünkü komutta açıkça `boot_a` değil, `boot` yazıyordu.

### Fastboot hedef slotunu doğrulama

Telefon açıldıktan sonra ADB üzerinden cihazı yeniden Fastboot moduna aldım:

```bash
adb reboot bootloader
```

Ardından şu komutları çalıştırdım:

```bash
fastboot getvar current-slot
fastboot getvar has-slot:boot
```

Çıktılar:

```text
current-slot: a
Finished. Total time: 0.000s

has-slot:boot: yes
Finished. Total time: 0.000s
```

Bu sonuçlar, aktif slotun A olduğunu ve `boot` bölümünün slot desteklediğini doğruladı.

Android'in A/B sisteminde Fastboot, açıkça başka bir slot belirtilmediğinde mevcut aktif slotu hedefler. Dolayısıyla işlem günlüğündeki `fastboot flash boot` komutu, cihazın A slotu bilgisiyle birlikte değerlendirildiğinde `boot_a` bölümünü hedeflemiş oldu.

Bu davranışın ayrıntıları için [Android Open Source Project A/B sistem dokümantasyonuna](https://source.android.com/docs/core/ota/ab/ab_implement){: target="_blank" rel="noopener noreferrer"} göz atabilirsiniz.

Kontrolün ardından cihazı yeniden başlattım:

```bash
fastboot reboot
```

Telefon normal şekilde Android'e döndü.

## 6. ADB üzerinden root erişimini doğrulama

Telefon açıldıktan sonra root erişimini kontrol etmek istedim.

Önce ADB kabuğuna bağlandım:

```bash
adb shell
```

Ardından:

```sh
su
```

İlk denememde beklediğim sonucu alamadım ve şu hatayı gördüm:

```text
/system/bin/sh: su: inaccessible or not found
```

Daha sonraki kontrolde `su` komutu çalıştı ve terminal istemi root kabuğuna geçti:

```text
ruby:/ $
ruby:/ #
```

Yine de yalnızca istemin değişmesine bakmak yerine root kimliğini doğrudan sorguladım. Bunun için bilgisayar terminalinde şu komutu çalıştırdım:

```bash
adb shell su -c id
```

Çıktı:

```text
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

Buradaki `uid=0(root)` değeri, komutun root yetkisiyle çalıştığını açıkça gösteriyor. Böylece yalnızca FolkTool'un flash işlemini başarılı bildirmesiyle yetinmedim; root erişimini doğrudan cihaz üzerinde doğrulamış oldum.

!!! tip "İpucu: ADB kabuğu ile root kabuğunu karıştırmayın."
    `adb shell id` komutu normal ADB oturumunun kimliğini gösterir. Bende bu komut `uid=2000(shell)` döndürdü. Root kontrolü için `adb shell su -c id` kullanmak daha doğrudan bir doğrulama sağlıyor. Başarılı sonuçta `uid=0(root)` görmelisiniz.

İlk `su` denemesinin neden hata verdiğini eldeki çıktılardan kesin olarak belirleyemiyorum. Bu nedenle o hataya bir neden atfetmek yerine, sonraki başarılı kontrolü esas alıyorum.

## Sonuç

Xiaomi Redmi Note 12 Pro 5G (`ruby`) üzerinde MTKClient ve FolkTool 1.7.1 kullanarak root işlemini tamamladım.

Önce MTKClient ile bölüm tablosunu görüntüledim ve `boot_a` ile `boot_b` imajlarını yedekledim. Ardından `boot_a.img` dosyasını FolkTool ile patch ettim ve oluşturulan imajı Fastboot üzerinden cihaza yükledim.

İşlem sonrasında telefon normal şekilde açıldı. Fastboot kontrolleri A slotunun aktif olduğunu ve boot bölümünün slot desteklediğini gösterdi. Son olarak `adb shell su -c id` komutuyla `uid=0(root)` çıktısını aldım.

Benim için bu süreçte en önemli nokta, işlem öncesinde orijinal imajları yedeklemek ve işlem sonrasında sonucu doğrudan cihaz üzerinde doğrulamak oldu. Çünkü bir aracın "Flash successful" mesajı vermesi, tek başına root erişiminin çalıştığını kanıtlamıyor.

Redmi Note 12 Pro 5G üzerinde crDroid kullanırken karşılaştığım başka bir sorunu da ayrıca ele almıştım. e-Devlet uygulamasının NFC erişimi ve MIUI izin kontrolüyle ilgili deneyimimi [crDroid'de e-Devlet NFC sorunu üzerine yazdığım makalede](/crdroid-e-devlet-nfc-miui-izin-sorunu/) anlattım.

Benzer bir işlem yapmayı düşünüyorsanız yedekleme adımını atlamayın. Özellikle A/B bölüm düzenine sahip cihazlarda doğru imajı kullanmak, hedef slotu kontrol etmek ve root erişimini gerçekten doğrulamak gerekiyor.

## Kaynaklar

- [MTKClient GitHub deposu](https://github.com/bkerler/mtkclient){: target="_blank" rel="noopener noreferrer"}
- [MTKClient kullanım belgesi](https://github.com/bkerler/mtkclient/blob/main/README-USAGE.md){: target="_blank" rel="noopener noreferrer"}
- [FolkTool GitHub deposu](https://github.com/LyraVoid/FolkTool){: target="_blank" rel="noopener noreferrer"}
- [FolkTool 1.7.1 sürümü ve değişiklik notları](https://github.com/LyraVoid/FolkTool/releases/tag/1.7.1){: target="_blank" rel="noopener noreferrer"}
- [Android A/B Sistem Güncellemeleri – Android Open Source Project](https://source.android.com/docs/core/ota/ab/ab_implement){: target="_blank" rel="noopener noreferrer"}