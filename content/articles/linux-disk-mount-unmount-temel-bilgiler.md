Title: Linux’ta Disklerin Mount ve Unmount İşlemleri: Temel Bilgiler ve Uygulamalar  
Date: 2025-08-05 12:30  
Modified: 2025-08-11 22:59
Category: Disk Yönetimi  
Tags: linux, mount, unmount, disk, dosya-sistemi, sistem-yonetimi  
Slug: linux-disk-mount-unmount-temel-bilgiler  
Authors: yuceltoluyag  
Status: published  
Summary: Linux’ta disklerin mount edilmesi ve unmount edilmesi işlemlerini temel kavramlar, komutlar ve örneklerle anlatıyoruz.
Series: Linux-disk
Series_index: 2
Template: article  

# 💽 Linux’ta Disklerin Mount Edilmesi ve Unmount Edilmesi: Temel Bilgiler

Linux ve Unix benzeri sistemlerde diskler doğrudan değil, **mount** işlemi ile dosya sistemi ağacına bağlanır. Bu sayede disk üzerindeki verilere belirli klasörler aracılığıyla erişilir. İşlemi tamamlanan disklerin bağlantısının kesilmesi ise **unmount** olarak adlandırılır.  

Peki, Linux’ta diskler nasıl mount ve unmount edilir? Hangi komutlar kullanılır? Bu makalede, bu temel konuları detaylı ve anlaşılır şekilde öğreneceksiniz. 🚀

---

## 🧐 Mount Nedir?

Mount, fiziksel ya da sanal disk aygıtını, dosya sistemini Linux dizin ağacına bağlama işlemidir. Böylece disk içeriği o dizin (mount point) altında görünür ve erişilebilir olur.  

Örneğin bir USB belleği taktığınızda, sistem onu otomatik ya da manuel olarak `/mnt/usb` veya `/run/media/kullanici/usb` gibi dizinlere bağlar.

---

## 📂 Mount Point (Bağlama Noktası) Nedir?

Mount point, disk veya dosya sistemi bağlandığında içeriğin erişileceği klasördür.  

Mount işlemi yapılmadan önce bu dizinin var olması gerekir:

```bash
mkdir -p /mnt/mydisk
```

---

## 🛠️ Mount Komutunun Temel Kullanımı

Disk veya dosya sistemini mount etmek için şu yapıyı kullanırız:

```bash
sudo mount <aygıt> <mount_point>
```

Örnek:

```bash
sudo mount /dev/sdb1 /mnt/mydisk
```

Bu komut, `/dev/sdb1` aygıtındaki dosya sistemini `/mnt/mydisk` klasörüne bağlar.

---

## 📀 Loop Mount: ISO ve Disk İmajları

ISO gibi dosya imajlarını mount etmek için `-o loop` seçeneği gerekir:

```bash
sudo mount -o loop dosya.iso /mnt/iso
```

Bu sayede ISO dosyasının içeriği `/mnt/iso` üzerinden erişilebilir olur.

---

## 📴 Unmount Komutu ile Bağlantıyı Kaldırma

Mount edilmiş disk veya dosya sistemini sistemden çıkarmak için `umount` komutu kullanılır:

```bash
sudo umount <mount_point> veya <aygıt>
```

Örnek:

```bash
sudo umount /mnt/mydisk
```

Unmount yapmadan önce diskin kullanımda olmaması gerekir; aksi takdirde hata alınır.

---

## ⚠️ Mount ve Unmount İşlemlerinin Önemi

* **Veri Güvenliği:** Disk kullanımdayken çıkarılırsa veri kaybı olabilir, bu yüzden önce unmount yapılmalı.
* **Sistem Düzeni:** Dosya sistemlerinin düzgün bağlanması ve ayrılması sistemi kararlı tutar.
* **Erişim Kontrolü:** Dosyalara erişim mount point üzerinden sağlanır.
* **Çoklu Dosya Sistemleri:** Linux ext4, ntfs, iso9660 gibi farklı dosya sistemlerini aynı anda yönetebilir.

---

## 🔄 Otomatik Mount ve `udisksctl` Komutları

GNOME, KDE gibi masaüstü ortamları USB ve ISO dosyalarını otomatik olarak mount eder. Arkasında `udisks` servisleri vardır.

Manuel loop mount işlemi için:

```bash
udisksctl loop-setup -f dosya.iso
udisksctl mount -b /dev/loopX
```

Manuel unmount ve loop aygıtını kaldırmak için:

```bash
udisksctl unmount -b /dev/loopX
udisksctl loop-delete -b /dev/loopX
```

---

## 🔍 Mount Edilen Dosya Sistemlerini Görüntüleme

* `mount` — Tüm bağlı dosya sistemlerini listeler.
* `df -h` — Disk kullanım özetini gösterir.
* `lsblk` — Blok aygıtları ve mount noktalarını gösterir.

---

## 🎯 Pratik Örnek: ISO Dosyasını Mount Edip Kullanmak

1. Mount noktası oluşturun:

```bash
mkdir ~/iso
```

2. ISO dosyasını mount edin:

```bash
sudo mount -o loop oyun.iso ~/iso
```

3. Dosyalara erişin, işiniz bitince unmount yapın:

```bash
sudo umount ~/iso
```

---

## 📝 Sonuç

Linux’ta disklerin mount ve unmount edilmesi, verilerin güvenli ve düzenli yönetimi için kritik işlemlerdir. Doğru yapılan mount/unmount işlemleri, veri kaybını önler ve sistemin stabil çalışmasını sağlar.

Yeni başlayanlar için bu temel bilgileri anlamak, Linux sistem yönetimi yolculuğunda sağlam bir adım olacaktır. Siz de deneyimlerinizi ve sorularınızı yorumlarda paylaşabilirsiniz! 👨‍💻✨

---


