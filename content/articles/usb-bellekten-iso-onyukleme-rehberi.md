Title: USB Bellekten ISO Önyükleme Rehberi
Date: 2025-11-11 17:00
Category: Linux
Tags: iso, usb, önyükleme, el-torito, rehber, windows10, windows11, format, uefi
Slug: usb-bellekten-iso-onyukleme-rehberi
Summary: ISO dosyasını USB belleğe doğru şekilde yazarak önyüklenebilir hale getirmek istiyorsanız, bu rehber adım adım size yol gösterecek.
Image: images/usb-bellekten-iso-onyukleme-rehberi-xl.webp
Lang: tr
Translation: false
Status: published

Önyüklenebilir bir USB sürücü oluşturmak, hem BT uzmanları hem de meraklı kullanıcılar için temel bir beceridir.  
Bu yazıda, yalnızca terminal komutlarını kullanarak Linux üzerinde **Windows önyüklenebilir USB sürücüsü** nasıl oluşturulur adım adım öğreneceksiniz.  
Yeni bir sistem kuruyor, mevcut bir sistemi onarıyor veya yanında taşınabilir güvenilir bir yükleyiciye ihtiyaç duyuyor olun — bu rehber tam size göre.

Her adımı tek tek ele alacağız: USB sürücünüzü hazırlamaktan bölümlendirmeye, Windows ISO dosyasını USB’ye yazmaya kadar, tüm işlemleri doğrudan terminal komutlarıyla yapacağız.

## Linux’un ISOHybrid ve Windows ISO Farkı

Önyüklenebilir bir USB sürücü oluştururken, **Linux ISOHybrid görüntüleri** ile **Windows ISO görüntüleri** arasındaki farkları anlamak oldukça önemlidir.  
Her ikisi de kurulum ortamı olarak hizmet etse de, tasarımları, işlevleri ve kullanım alanları farklıdır. Bu farklar, görüntülerin USB sürücülerle nasıl etkileşime girdiğini ve `dd` gibi araçların veya özel yardımcı programların nasıl kullanılacağını etkiler.

Bu ayrım özellikle **Linux ortamında Windows önyüklenebilir USB oluştururken** önemli hale gelir, çünkü bu işlem genellikle bir Linux ISOHybrid ile çalışmaktan daha fazla adım gerektirir.  
Şimdi bu formatları ve önyüklenebilir USB oluşturma sürecine etkilerini daha iyi anlamak için detaylara bakalım.

Bu bağlam, Linux üzerinde bir Windows ISO ile çalışırken karşılaşılan belirli zorlukları ve çözümleri anlamanızı sağlar.

### Hybrid ISO Nedir?

Hybrid ISO, hem klasik bir optik disk (CD/DVD) görüntüsü hem de USB sürücüler gibi cihazlarda **önyüklenebilir bir imaj** olarak çalışabilen özel bir ISO türüdür.  
Geleneksel olarak ISO dosyaları, CD veya DVD'ye yazılmak üzere tasarlanmıştır. Hybrid ISO’lar ise bu işlevselliği genişletir; aynı dosya, **hiçbir ek düzenleme yapmadan** doğrudan bir USB sürücüye yazılabilir ve önyüklenebilir hale gelir.

Bu çift işlevsellik, hem CD/DVD uyumluluğu için ISO9660 dosya sistemini hem de USB önyükleme desteği sağlayan **MBR (Master Boot Record)** yapısını içermesi sayesinde mümkündür.

### Bir ISO’nun Hybrid Olduğu Nasıl Anlaşılır

Bir ISO’nun hybrid olup olmadığını anlamak için şu yöntemleri kullanabilirsiniz:

1. **`file` Komutu ile Kontrol**

`file` komutu, ISO’nun yapısı hakkında bilgi verir:

```bash
file path/to/image.iso
```

Hybrid bir ISO’da çıktı genellikle “(DOS/MBR boot sector)” ifadesini içerir.

2. **`fdisk` ile MBR’yi İnceleme**

Hybrid ISO’lar, USB üzerinden önyüklemeyi desteklemek için bir MBR içerir. Bunu `fdisk` ile kontrol edebilirsiniz:

```bash
fdisk -l path/to/image.iso
```

Eğer bir önyüklenebilir bölüm bilgisi (örneğin tek bir bölüm) görüyorsanız, bu ISO muhtemelen hybrid’dir.
Hybrid olmayan bir ISO’da ise bölüm detayları görüntülenmez.

3. **El Torito Önyükleme Kaydını Kontrol Etme**

Hybrid ISO’lar, **El Torito**[^El-Torito] standardını kullanır. `xorriso` aracı ile doğrulama yapabilirsiniz:

```bash
xorriso -indev path/to/image.iso
```

Çıktıda `Boot record` kısmında önyükleyici ve bölüm tablosu bilgileri yer alırsa, ISO önyüklenebilirdir.

---

## Gerekli Olanlar

İşleme başlamadan önce aşağıdaki gereksinimlerin hazır olduğundan emin olun:

1. **Windows ISO dosyası:**
   Resmî ISO dosyasını [Microsoft web sitesinden](https://www.microsoft.com/en-us/windows/?r=1){: target="\_blank" rel="noopener noreferrer"} indirin.

2. **USB sürücü:**
   En az 8 GB boş alanı olmalı. Tüm içerik silineceğinden önemli verilerinizi yedekleyin.

3. **Linux terminal erişimi:**
   Tüm komutlar terminal üzerinden çalıştırılacaktır.

---

## Adım 1: USB Sürücünüzü Belirleyin

USB sürücünüzü takın ve terminali açın. Aygıt adını belirlemek için şu komutu çalıştırın:

```bash
lsblk
```

Çıktıda genellikle `/dev/sdX` şeklinde bir ad göreceksiniz.
`X` harfi sürücü harfini temsil eder — doğru sürücüyü dikkatlice not edin.

---

## Adım 2: USB Sürücüsünü Bölümleme

Formatlamadan önce USB sürücüsünde gerekli bölümleri oluşturmalısınız. Bunun için `fdisk` aracını kullanın.

!!! tip "Bölümleme ve formatlama sırasında hatalardan kaçınmak için, USB üzerindeki mevcut bölümleri önceden ayırın:"

```bash
sudo umount /dev/sdX*
```

- `/dev/sdX*` kısmını USB sürücünüzün uygun bölümleriyle değiştirin.

1. `fdisk` aracını başlatın:

```bash
sudo fdisk /dev/sdX
```

2. `fdisk` içinde aşağıdaki adımları uygulayın:

- `g` tuşuna basarak yeni bir **GPT** bölüm tablosu oluşturun.
- `n` tuşuna basarak yeni bir bölüm ekleyin.
- `p` ile birincil (primary) bölüm oluşturun.
- İlk bölümü oluşturun, önyükleme bölümü için az miktarda alan bırakın (yaklaşık 1 MB yeterlidir).
- Kalan alanı ikinci bölüm için ayırın.

!!! note "Windows ortamında, çıkarılabilir sürücülerde işletim sistemi genellikle **yalnızca ilk birincil bölümü** tanır.Bu nedenle, Windows tarafından erişilebilir olacak veri bölümü **birinci**, sistem dosyalarını içeren önyükleme bölümü ise **ikinci** olmalıdır."

3. Dosya sistemi türünü `Microsoft basic data` olarak ayarlayın:

- `t` tuşuna basın ve her iki bölüm için de tür numarası olarak `11` seçin.

4. Önyüklenebilir (bootable) bayrağını ayarlayın:

- `x` tuşuna basın.
- `A` ile önyükleme yapılacak bölümü seçin.

5. Değişiklikleri kaydedip çıkın:

- `r` tuşuna basarak uzman modundan çıkın.
- `w` tuşuna basın.

---

## Adım 3: USB Sürücüsünü Biçimlendirme

Veri bölümü için **NTFS**, önyükleme bölümü için **FAT32** dosya sistemi kullanın.

**NTFS için:**

```bash
sudo mkfs.ntfs -f /dev/sdX1
```

**FAT32 için:**

```bash
sudo mkfs.vfat -F 32 /dev/sdX2
```

`/dev/sdX1` ve `/dev/sdX2` bölümlerini doğru şekilde değiştirin.

---

## Adım 4: Windows ISO Dosyalarını USB’ye Kopyalama

ISO dosyasını ve USB sürücüsünü bağlayın, ardından içerikleri kopyalayın:

1. **Bağlama noktaları oluşturun:**

```bash
sudo mkdir /mnt/iso
sudo mkdir /mnt/drive
```

2. **ISO’yu bağlayın:**

```bash
sudo mount -o loop /path/to/your.iso /mnt/iso
sudo mount /dev/sdX1 /mnt/drive
```

3. **Dosyaları kopyalayın:**

```bash
sudo cp -r /mnt/iso/* /mnt/drive
```

!!! note "Bu işlem USB hızınıza bağlı olarak 10 dakika kadar sürebilir."

4. **ISO’yu ayırın:**

```bash
sudo umount /mnt/iso
sudo rmdir /mnt/iso
```

---

## Adım 5: Rufus Önyükleme Görüntüsünü Yazma

Öncelikle Rufus[^Rufus] deposundan önyükleme imajını indirin:

```bash
wget https://github.com/pbatard/rufus/raw/master/res/uefi/uefi-ntfs.img
```

İndirdiğiniz `uefi-ntfs.img` dosyasını USB’ye yazmak için `dd` komutunu kullanın:

```bash
sudo dd if=/path/to/uefi-ntfs.img of=/dev/sdX2 bs=1M status=progress
```

!!! danger "Kritik Uyarı ; `/dev/sdX2` kısmını doğru sürücü adıyla değiştirin.Yanlış bir aygıt adı girerseniz sistem diskiniz dahil önemli veriler silinebilir!"

---

## Adım 6: Önyükleyici (Bootloader) Kurulumu

Önyükleyiciyi kurmak için `grub` kullanacağız. Kullandığınız dağıtıma göre komut farklılık gösterebilir.

!!! note "Debian/Ubuntu Kullanıcıları İçin Not"
Eğer `grub2-install` komutu bulunamazsa, sisteminiz `grub-install` kullanıyor olabilir. Ayrıca, `i386-pc` hedefi için `grub-pc` paketinin kurulu olması gerekebilir.
Kurmak için: `sudo apt-get install grub-pc`

`grub2-install` (veya `grub-install`) komutunu kullanarak önyükleyiciyi kurun:

```bash
sudo grub2-install --target=i386-pc --boot-directory=/mnt/drive --force /dev/sdX
```

- `--boot-directory=/mnt/drive`: USB’nin Windows veri bölümünün bağlandığı yer (bkz. Adım 4).
- `/dev/sdX`: USB aygıtının kendisi.

!!! warning "Dikkat! Komutu çalıştırmadan önce sürücü adını mutlaka iki kez kontrol edin."

---

## Adım 7: Önyüklenebilir USB’yi Test Etme

USB’yi hedef sisteme takın ve BIOS/UEFI ayarlarından **USB öncelikli önyükleme** yapın.
Gerekirse **Secure Boot** seçeneğini devre dışı bırakın.

---

## Yaygın Sorunlar ve Çözümleri

- **Önyükleyici Hataları:**
  USB önyüklemiyorsa, ISO ek yapılandırma gerektirebilir.

- **İzin Hataları:**
  Komutları her zaman `sudo` ile çalıştırın.

- **Bozuk ISO Dosyası:**
  ISO bütünlüğünü doğrulamak için şu komutu kullanın:

```bash
sha256sum /path/to/windows.iso
```

Çıktıyı resmi SHA256 değeriyle karşılaştırın.

---

## Sonuç

Bu adımları izleyerek yalnızca terminal komutlarıyla Linux üzerinden kolayca **Windows önyüklenebilir USB** oluşturabilirsiniz.
Yeni kurulumlar, sistem onarımları veya acil durumlar için bu yöntem her zaman elinizin altında olmalı.

İyi önyüklemeler! 💻

---

## Kaynaklar

[^El-Torito]: [https://en.wikipedia.org/wiki/ISO_9660#El_Torito](https://en.wikipedia.org/wiki/ISO_9660#El_Torito){: target="\_blank" rel="noopener noreferrer"}
[^Rufus]: [https://rufus.ie/en/](https://rufus.ie/en/){: target="\_blank" rel="noopener noreferrer"}

- Daha fazla bilgi için [Linux’ta UEFI destekli Windows 10 USB oluşturma rehberine](/linux-uefi-windows10-usb/) göz atabilirsiniz.

[responsive_img src="/images/usb-bellekten-iso-onyukleme-rehberi-xl.webp" alt="USB Bellekten ISO Önyükleme Rehberi" /]
