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
toot: https://mastodon.social/@yuceltoluyag/115537037823483801
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m5gs4pjj3c2q

Selamlar güzel insanlar ve komut satırından ödün vermeyen yoldaşlar! ⚡

Eğer bir gün yolunuz Linux ortamında Windows kurulum USB'si hazırlamaya düştüyse, o meşhur 'Rufus' veya benzeri görsel araçların Linux sürümü olmadığını görüp hafif bir panik yaşamış olabilirsiniz. Hele ki benim gibi Arch Linux kullanan ve terminalin o siyah ekranından çıkmayı reddeden bir paronoyaksanız, eliniz hemen klavyeye gider. Ama durun! Linux ISO'ları ile Windows ISO'ları arasında o gıcık önyükleme farkı yüzünden düz bir `dd` komutu atmak Windows USB'lerinde işe yaramaz. 

Bu yazıda, hiçbir üçüncü parti arayüze ihtiyaç duymadan, **sadece ve sadece terminal komutlarını kullanarak** Linux üzerinde aslanlar gibi çalışan **Windows önyüklenebilir USB sürücüsü** nasıl hazırlanır bizzat tecrübe ettiğim, acı çekerek öğrendiğim en temiz yöntemle anlatıyorum. Kendinize makarna-yoğurt yapın veya çayınızı tazeleyin; disk bölmekten Rufus önyükleme imajı gömmeye kadar bu işi terminalin efendisi gibi hallediyoruz! 💻

---

## 🧠 Linux’un ISOHybrid ve Windows ISO Farkı

Önyüklenebilir bir USB sürücü oluştururken, **Linux ISOHybrid görüntüleri** ile **Windows ISO görüntüleri** arasındaki farkları anlamak hayati önem taşır. Yoksa saatlerce `dd` komutunun bitmesini bekleyip, sonrasında hiçbir şey boot etmeyen o cansız USB'ye bakarak bilgisayarı yumruklayabilirsiniz. 

Bu ayrım özellikle **Linux ortamında Windows önyüklenebilir USB oluştururken** kansere dönen bir sürece yol açar, çünkü bu işlem genellikle bir Linux ISOHybrid ile çalışmaktan çok daha fazla el emeği ve adım gerektirir. Şimdi bu formatları ve neden düz kopyalamanın yetmediğini anlamak için detaylara bakalım.

### Hybrid ISO Nedir?

Hybrid ISO, hem klasik bir optik disk (CD/DVD) görüntüsü hem de USB sürücüler gibi cihazlarda **önyüklenebilir bir imaj** olarak çalışabilen özel bir ISO türüdür. Geleneksel olarak ISO dosyaları, CD veya DVD'ye yazılmak üzere tasarlanmıştır. Hybrid ISO’lar ise bu işlevselliği genişletir; aynı dosya, **hiçbir ek düzenleme yapmadan** doğrudan `dd` ile bir USB sürücüye yazılabilir ve önyüklenebilir hale gelir.

Bu çift işlevsellik, hem CD/DVD uyumluluğu için ISO9660 dosya sistemini hem de USB önyükleme desteği sağlayan **MBR (Master Boot Record)** yapısını içermesi sayesinde mümkündür.

### Bir ISO’nun Hybrid Olduğu Nasıl Anlaşılır?

Bir ISO’nun hybrid olup olmadığını anlamak için şu terminal komutlarını koşturabilirsiniz:

#### 1. `file` Komutu ile Kontrol
`file` komutu, ISO’nun yapısı hakkında bilgi verir:

```bash
file path/to/image.iso
```

Hybrid bir ISO’da çıktı genellikle “(DOS/MBR boot sector)” ifadesini içerir.

#### 2. `fdisk` ile MBR’yi İnceleme
Hybrid ISO’lar, USB üzerinden önyüklemeyi desteklemek için bir MBR içerir. Bunu `fdisk` ile kontrol edebilirsiniz:

```bash
fdisk -l path/to/image.iso
```

Eğer bir önyüklenebilir bölüm bilgisi (örneğin tek bir bölüm) görüyorsanız, bu ISO muhtemelen hybrid’dir. Hibrit olmayan düz ISO’da bölüm detayları görüntülenmez.

#### 3. El Torito Önyükleme Kaydını Kontrol Etme
Hybrid ISO’lar, **El Torito**[^El-Torito] standardını kullanır. `xorriso` aracı ile doğrulama yapabilirsiniz:

```bash
xorriso -indev path/to/image.iso
```

Çıktıda `Boot record` kısmında önyükleyici ve bölüm tablosu bilgileri yer alırsa, ISO önyüklenebilirdir.

---

## 🛠️ Gerekli Olanlar

İşleme başlamadan önce aşağıdaki malzemelerin hazır olduğundan emin olun:

1. **Windows ISO dosyası:** Resmî ISO dosyasını [Microsoft web sitesinden](https://www.microsoft.com/en-us/windows/?r=1){: target="\_blank" rel="noopener noreferrer"} indirin.
2. **USB sürücü:** En az 8 GB boş alanı olmalı. Tüm içerik silineceğinden önemli verilerinizi yedekleyin.
3. **Terminal Erişimi:** Tüm işlemlerimiz sadece komut satırından geçecek!

---

## 👣 Adım 1: USB Sürücünüzü Belirleyin

USB sürücünüzü bilgisayara takın ve terminali açın. Aygıt adını belirlemek için şu komutu çalıştırın:

```bash
lsblk
```

Çıktıda genellikle `/dev/sdX` şeklinde bir ad göreceksiniz. `X` harfi sürücü harfini temsil eder — doğru sürücüyü dikkatlice not edin. Yanlış diski seçerseniz sisteminizi sıfırlayabilirsiniz, aman dikkat!

---

## 👣 Adım 2: USB Sürücüsünü Bölümleme

Formatlamadan önce USB sürücüsünde gerekli bölümleri oluşturmalısınız. Bunun için `fdisk` aracını kullanacağız.

!!! warning "Dikkat! Bölümleme ve formatlama sırasında hatalardan kaçınmak için, USB üzerindeki mevcut bölümleri önceden ayırın (unmount edin):"

```bash
sudo umount /dev/sdX*
```

- `/dev/sdX*` kısmını kendi USB sürücünüzün uygun bölümleriyle değiştirin.

1. `fdisk` aracını başlatın:

```bash
sudo fdisk /dev/sdX
```

2. `fdisk` arayüzünde aşağıdaki adımları sırayla uygulayın:

*   `g` tuşuna basarak yeni bir **GPT** bölüm tablosu oluşturun.
*   `n` tuşuna basarak yeni bir bölüm ekleyin.
*   `p` ile birincil (primary) bölüm oluşturun.
*   İlk bölümü oluşturun, önyükleme bölümü için az miktarda alan bırakın (yaklaşık 1 MB yeterlidir).
*   Kalan alanı ikinci bölüm için ayırın.

!!! note "Not: Windows ortamında, çıkarılabilir sürücülerde işletim sistemi genellikle **yalnızca ilk birincil bölümü** tanır. Bu nedenle, Windows tarafından erişilebilir olacak veri bölümü **birinci**, sistem dosyalarını içeren önyükleme bölümü ise **ikinci** olmalıdır."

3. Dosya sistemi türünü `Microsoft basic data` olarak ayarlayın:

*   `t` tuşuna basın ve her iki bölüm için de tür numarası olarak `11` seçin.

4. Önyüklenebilir (bootable) bayrağını ayarlayın:

*   `x` tuşuna basarak uzman moduna geçin.
*   `A` ile önyükleme yapılacak bölümü seçin.

5. Değişiklikleri kaydedip çıkın:

*   `r` tuşuna basarak uzman modundan çıkın.
*   `w` tuşuna basarak değişiklikleri diske yazın.

---

## 👣 Adım 3: USB Sürücüsünü Biçimlendirme

Büyük Windows dosyalarını taşıyabilmesi için veri bölümü için **NTFS**, önyükleme bölümü için ise **FAT32** dosya sistemi kullanacağız.

**NTFS için (Veri Bölümü):**

```bash
sudo mkfs.ntfs -f /dev/sdX1
```

**FAT32 için (Önyükleme Bölümü):**

```bash
sudo mkfs.vfat -F 32 /dev/sdX2
```

!!! warning "Dikkat! `/dev/sdX1` ve `/dev/sdX2` kısımlarını kendi USB sürücünüze göre doğru yazdığınızdan mutlaka emin olun."

---

## 👣 Adım 4: Windows ISO Dosyalarını USB’ye Kopyalama

ISO dosyasını ve USB sürücüsünü sisteme bağlayıp, içerikleri kopyalıyoruz:

1. **Bağlama noktaları (mount points) oluşturun:**

```bash
sudo mkdir /mnt/iso
sudo mkdir /mnt/drive
```

2. **ISO ve USB diskini bağlayın:**

```bash
sudo mount -o loop /path/to/your.iso /mnt/iso
sudo mount /dev/sdX1 /mnt/drive
```

3. **Dosyaları kopyalayın:**

```bash
sudo cp -r /mnt/iso/* /mnt/drive
```

!!! note "Not: Bu işlem USB hızınıza bağlı olarak 10-15 dakika kadar sürebilir. Sakin olun, bir çay daha koyun."

4. **ISO’yu ayırın:**

```bash
sudo umount /mnt/iso
sudo rmdir /mnt/iso
```

---

## 👣 Adım 5: Rufus Önyükleme Görüntüsünü Yazma

Öncelikle Rufus[^Rufus] resmi deposundan önyükleme imajını çekiyoruz:

```bash
wget https://github.com/pbatard/rufus/raw/master/res/uefi/uefi-ntfs.img
```

İndirdiğiniz `uefi-ntfs.img` dosyasını USB’nin ikinci bölümüne yazmak için `dd` komutunu koşturuyoruz:

```bash
sudo dd if=/path/to/uefi-ntfs.img of=/dev/sdX2 bs=1M status=progress
```

!!! danger "Kritik Uyarı! `/dev/sdX2` kısmını doğru sürücü adıyla değiştirin. Yanlış bir aygıt adı girerseniz sistem diskiniz dahil önemli verileriniz anında uçup gidebilir! Bizzat dikkat edin!"

---

## 👣 Adım 6: Önyükleyici (Bootloader) Kurulumu

Önyükleyiciyi kurmak için `grub` kullanacağız. Kullandığınız dağıtıma göre komutlar küçük farklılıklar gösterebilir.

!!! note "Not: Debian/Ubuntu Kullanıcıları İçin"
    Eğer `grub2-install` komutu bulunamazsa, sisteminiz `grub-install` kullanıyor olabilir. Ayrıca, `i386-pc` hedefi için `grub-pc` paketinin kurulu olması gerekebilir. Kurmak için: `sudo apt-get install grub-pc`

`grub2-install` (veya `grub-install`) komutunu kullanarak önyükleyiciyi diske gömüyoruz:

```bash
sudo grub2-install --target=i386-pc --boot-directory=/mnt/drive --force /dev/sdX
```

- `--boot-directory=/mnt/drive`: USB’nin Windows veri bölümünün bağlandığı yer.
- `/dev/sdX`: USB aygıtının kendisi (bölüm numarası olmadan).

---

## 👣 Adım 7: Önyüklenebilir USB’yi Test Etme

Her şey bitti! USB'yi güvenli bir şekilde ayırın (`sudo umount /mnt/drive`), hedef sisteme takın ve BIOS/UEFI ayarlarından **USB öncelikli önyükleme** yapın. Eğer UEFI sistemlerde sorun yaşarsanız **Secure Boot** seçeneğini geçici olarak devre dışı bırakmayı unutmayın.

---

## 🛠️ Yaygın Sorunlar ve Çözümleri

*   **Önyükleyici Hataları (Boot Etmiyor):**
    USB önyükleme yapmıyorsa, sisteminizde UEFI yerine Legacy BIOS desteğinin aktif olup olmadığını veya ISO bütünlüğünü kontrol edin.
*   **İzin Hataları (Permission Denied):**
    Disk işlemleri doğrudan sisteme etki ettiği için tüm bu komutları mutlaka `sudo` yetkisiyle çalıştırmalısınız.
*   **Bozuk ISO Dosyası:**
    İndirdiğiniz ISO dosyasının bozuk olup olmadığını anlamak için SHA256 kontrolünü yapın:

```bash
sha256sum /path/to/windows.iso
```

---

## 🎯 Sonuç

Bu adımları takip ederek hiçbir harici grafiksel yazılıma ihtiyaç duymadan, tamamen terminal üzerinden aslanlar gibi çalışan **Windows kurulum USB'si** hazırlayabilirsiniz. Linux'ta çözüm tükenmez! 

Kafanıza takılan veya takıldığınız bir adım olursa yorumlarda buluşalım, sistemi beraber ayağa kaldırırız! 😉

---

## 🔗 Kaynaklar

[^El-Torito]: [https://en.wikipedia.org/wiki/ISO_9660#El_Torito](https://en.wikipedia.org/wiki/ISO_9660#El_Torito){: target="\_blank" rel="noopener noreferrer"}
[^Rufus]: [https://rufus.ie/en/](https://rufus.ie/en/){: target="\_blank" rel="noopener noreferrer"}

- Daha fazla bilgi için [Linux’ta UEFI destekli Windows 10 USB oluşturma rehberine](/linux-uefi-windows10-usb/) göz atabilirsiniz.

[responsive_img src="/images/usb-bellekten-iso-onyukleme-rehberi-xl.webp" alt="USB Bellekten ISO Önyükleme Rehberi" /]




