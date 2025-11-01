Title: Arch Linux’ta Disk Alanı Eksik Görünüyor mu? İşte Adım Adım Çözüm Rehberi 🧹💾
Date: 2025-07-26 09:00
Modified: 2025-08-11 22:59
Category: Disk Yönetimi
Tags: arch-linux, disk, boş-alan, ext4, linux-disk-sorunları, df, lsblk, disk-temizliği
Slug: arch-linux-disk-alani-gorunmuyor-cozum
Authors: yuceltoluyag
Status: published
Summary: Arch Linux’ta disk alanınız az mı görünüyor? Gerçekte boş yer olmasına rağmen sistem neden farklı gösteriyor? Bu kapsamlı rehberde, root rezerve alanı, silinmiş ama hâlâ kullanılan dosyalar, yeniden başlatma gibi tüm olasılıkları adım adım inceliyoruz.
Template: article
Image: images/arch-linux-disk-alani-gorunmuyor-cozum-xl.webp
Lang: tr
Translation: false

## 🎯 Giriş

Arch Linux kullanıcısıysanız, sisteminizde yüzlerce gigabayt boş alan olmasına rağmen neden yalnızca belirli bir miktar görünür olduğunu merak etmişsinizdir. Örneğin: Diskinizde 300 GB boş yer olduğunu biliyorsunuz, ama `df -h` size yalnızca 173 GB gösteriyor. Peki neden?

Bu rehberde, bu kafa karıştırıcı problemi adım adım analiz edecek ve çözeceğiz. Hedefimiz, **Arch Linux sisteminde eksik görünen disk alanının nerelere “kaybolduğunu"** anlamak ve etkili şekilde geri kazanmaktır. 🤓

---

## 👤 Hedef Kitle

Bu yazı, **orta ve ileri seviye Linux kullanıcıları** için yazılmıştır. Özellikle Arch Linux, Manjaro, Artix gibi sistemlerde disk yönetimini kendi başına yapmak isteyenler için uygundur. Terminal kullanımı, disk bölümleri, `ext4` dosya sistemi gibi konulara aşina olan kullanıcılar için optimize edilmiştir.

---

## 🧠 Hızlı Bakış: Sorun Neden Olur?

En yaygın sebepler:

- `ext4` dosya sisteminin root için rezerve ettiği bloklar
- Silinmiş ama hâlâ çalışan işlemlerce tutulan dosyalar
- Steam gibi uygulamaların devasa önbellekleri
- Hatalı veya eksik bölümleme
- Kullanıcının yanlış yorumladığı boş alan hesapları
- Sistemin yeniden başlatılmaması nedeniyle kalıcı olmayan dosya kullanımı

Bu yazı, tüm bu senaryoları kapsayan bir çözüm haritası sunar.

---

## 📋 Adım Adım Sorun Tespiti ve Çözüm

### ✅ Adım 1: Disk Yapısını Doğru Anlayın

Komut:

```bash
lsblk -f
```

🔎 Açıklama: Bu komut, disk bölümlerinin hangi dosya sistemlerini kullandığını ve nereye bağlandığını gösterir.

---

### ✅ Adım 2: Disk Kullanım Oranlarını Görüntüleyin

Komut:

```bash
df -h
```

🔎 Açıklama: Dosya sistemlerinin toplam, kullanılan ve boş alanlarını listeler.

Örnek çıktı:

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       916G  697G  173G  81% /mnt/steam_depo
```

---

### ✅ Adım 3: Root Rezerve Alanını Kontrol Edin

Linux’ta `ext4` dosya sisteminde, diskin yaklaşık %5’i root kullanıcı için ayrılır. Bu alan kullanıcılar tarafından görünmez.

Komut:

```bash
sudo tune2fs -l /dev/sda1 | grep 'Reserved block count'
```

Alternatif:

```bash
sudo dumpe2fs /dev/sda1 | grep Reserved
```

🔧 Çözüm:
Rezerve alan miktarını sıfırlamak (isteğe bağlı):

```bash
sudo tune2fs -m 0 /dev/sda1
```

⚠️ Uyarı: Sunucu sistemlerde %0 yapmak önerilmez; sadece masaüstü kullanıcıları için.

---

### ✅ Adım 4: Silinmiş Ama Kullanılan Dosyaları Bulun

Silinen dosyalar, süreçler tarafından tutuluyorsa hâlâ disk alanı kaplayabilir.

Komut:

```bash
sudo lsof | grep deleted
```

🔧 Çözüm:
Bu dosyaları tutan işlemi sonlandırın veya `kill` komutuyla durdurun.

---

### ✅ Adım 5: Büyük Klasörleri ve Dosyaları Tespit Edin

Hangi klasörlerin en çok yer kapladığını öğrenmek için:

Komut:

```bash
sudo du -h --max-depth=1 /mnt/steam_depo | sort -hr | head -n 20
```

Örnek çıktı:

```
606G    /mnt/steam_depo/BaBaGames
72G     /mnt/steam_depo/SteamLibrary
20G     /mnt/steam_depo/Age of Empires II Definitive Edition
```

---

### ✅ Adım 6: Gereksiz Dosyaları Temizleyin 🧹

**Silinebilir yer kaplayıcılar:**

- 🎮 Eski oyun dosyaları
- 🧱 Steam indirme önbelleği
- 🗑️ `.Trash-*` klasörleri
- 🐳 Docker kullanılmayan imajlar:

```bash
  docker system prune -a
```

---

### ✅ Adım 7: Sistemi Yeniden Başlatın 🔁

Bazı durumlarda, her şeyi doğru yapsanız bile boş alan olması gerektiği hâlde görünmeyebilir. Bu tür durumlarda **sistemi yeniden başlatmak**, işlemde tutulan dosyaları gerçekten serbest bırakır.

🔎 Neden işe yarar?

- Bellekte kalan silinmiş dosyalar temizlenir
- Disk önbelleği diske yazılır
- Steam gibi kapatılmamış uygulamalar bırakılan alanı serbest bırakır

🔧 Çözüm:

```bash
sudo reboot
```

---

### ✅ Adım 8: Dış Ortamlara Yedekleme Yapın ☁️

Boş alan yaratmak için büyük dosyaları taşıyabileceğiniz yerler:

- Harici HDD/SSD
- Google Drive, Dropbox, Mega gibi bulut çözümleri
- NAS sunucular

---

## 📦 Sonuç: Alan Açmanın Anahtarı Doğru Analiz

Diskinizde neden az boş alan göründüğünü anlamak için aşağıdaki noktaları kontrol ettiğinizden emin olun:

✅ `df` ve `lsblk` ile disk görünürlüğü
✅ Root rezerve alanı
✅ Silinmiş ama açık dosyalar
✅ Dev klasörler ve oyunlar
✅ Çöp kutuları ve önbellek dosyaları
✅ Sistem yeniden başlatma adımı

Bu adımlar sayesinde, Arch Linux sisteminizde disk alanı yönetimini ustalıkla yapabilirsiniz. 🧠

---

[responsive_img src="/images/arch-linux-disk-alani-gorunmuyor-cozum-xl.webp" alt="Linux’ta Disk Alanı Eksik Görünüyor mu" /]
