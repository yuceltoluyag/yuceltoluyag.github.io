Title: Linux'ta Disk Nasıl Sıfırlanır? Herhangi Bir Diski Güvenli Şekilde Silme Rehberi
Date: 2025-04-18 12:00
Modified: 2025-08-11 22:59
Category: Disk Yönetimi
Tags: linux, disk silme, dd komutu, shred komutu, wipefs, veri temizleme, disk sıfırlama
Slug: linux-disk-sifirlama-rehberi
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Linux sistemlerde diskleri güvenli ve kalıcı bir şekilde nasıl sıfırlayacağınızı öğrenin. `dd`, `shred` ve `wipefs` komutlarıyla verilerinizi koruyun ve disklerinizi yeni kullanıma hazırlayın. Adım adım rehber.
Template: article
Image: images/Linux-uzerinde-disk-sifirlama-xl.webp
Series: Linux-disk
Series_index: 3
toot: https://mastodon.social/@yuceltoluyag/114987873115464671
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvsvx53tm223

💣 **Linux'ta disk sıfırlama** işlemi, sistem yöneticileri ve teknik kullanıcılar için zaman zaman kaçınılmazdır. Yeni bir kurulum öncesi, eski verileri silerken veya diskleri geri dönüşü olmayacak şekilde temizlerken, doğru yöntemlerle ilerlemek çok önemlidir.

Bu rehberde, `/dev/sdX` formatındaki **herhangi bir diski güvenli ve etkili şekilde nasıl sıfırlayabileceğinizi** detaylıca anlatacağım. Ayrıca hangi yöntemin ne zaman uygun olduğunu örneklerle açıklayacağım.

---

## 🧠 Neden Disk Sıfırlama Gerekir?

Aşağıdaki durumlarda disk sıfırlama ihtiyacı doğabilir:

- Yeni işletim sistemi kurulumu öncesi temiz başlangıç yapmak
- Verilerin geri döndürülemeyecek şekilde silinmesi
- Diskteki hatalı partition yapılarından kurtulmak
- Disk formatı değişikliği veya sıfırdan bölümleme işlemi için hazırlık

> ⚠️ **UYARI:** Yanlış diskin sıfırlanması sistemin tamamen kullanılmaz hale gelmesine neden olabilir. **Disk adlarını dikkatli kontrol edin.**

---

## 🛠️ Diskleri Listeleyin ve Kontrol Edin

Disklerinizi ve bağlı bölümleri görmek için:

```bash
sudo fdisk -l
```

Alternatif olarak:

```bash
lsblk
```

Çıktıda `/dev/sda`, `/dev/sdb`, `/dev/sdc` gibi disk adlarını göreceksiniz. Sıfırlamak istediğiniz diski net şekilde tanımladıktan sonra işleme geçin.

---

## ⚡ Yöntem 1: `dd` ile Disk Sıfırlama

`dd`, diski sıfırlarla (0) doldurarak siler. Basit ama güçlü bir araçtır.

```bash
# Örnek: /dev/sdX diski sıfırlanıyor
sudo dd if=/dev/zero of=/dev/sdX bs=1M status=progress
```

Açıklamalar:

- `if=/dev/zero`: Girdi kaynağı sıfır bayt üretir
- `of=/dev/sdX`: Hedef disk
- `bs=1M`: 1 MB blok boyutu ile daha hızlı işlem
- `status=progress`: Anlık ilerleme durumu

> 🕒 Bu işlem, disk boyutuna göre uzun sürebilir (örneğin 500 GB için 10–30 dk).

---

## 🔐 Yöntem 2: `shred` ile Güvenli Silme

Verilerin kurtarılamayacak şekilde silinmesi gerekiyorsa `shred` kullanılır.

```bash
sudo shred -v -n 3 /dev/sdX
```

Açıklamalar:

- `-v`: Ayrıntılı çıktı
- `-n 3`: 3 kez üzerine rastgele veri yaz
- `-z`: (opsiyonel) Son geçişte sıfırlarla yaz

> 🔐 Bu yöntem özellikle kişisel veriler veya hassas dosyalar için uygundur.

---

## 🧼 Yöntem 3: `wipefs` ile Dosya Sistemi İzlerini Temizleme

Sadece partition ve dosya sistemi imzalarını silmek için hızlı bir yöntemdir:

```bash
sudo wipefs -a /dev/sdX
```

- `-a`: Tüm dosya sistemi imzalarını temizler

> ⚡ Hızlıdır, ancak fiziksel veri diskte kalabilir.

---

## 🔍 Temizlik Sonrası Disk Durumunu Kontrol Et

Silme işlemi tamamlandıktan sonra şu komutlarla kontrol yapabilirsiniz:

```bash
lsblk
sudo fdisk -l
```

Partition görünmüyorsa, disk başarıyla temizlenmiş demektir.

---

## 🧾 Hangi Yöntemi Ne Zaman Kullanmalıyım?

| Yöntem   | Açıklama                                     | Hız       | Güvenlik |
| -------- | -------------------------------------------- | --------- | -------- |
| `dd`     | Diski sıfırlarla doldurur                    | Orta      | Orta     |
| `shred`  | Rastgele veriyle veri yok eder               | Yavaş     | Yüksek   |
| `wipefs` | Partition tablolarını ve FS imzalarını siler | Çok Hızlı | Düşük    |

**Kritik veri varsa** `shred` en iyi tercihtir. **Sadece kurulum öncesi sıfırlama gerekiyorsa** `dd` veya `wipefs` yeterlidir.

---

## 🚀 Bonus: Sıfırlama Sonrası Disk Bölümleme ve Formatlama

Yeni bir dosya sistemi oluşturmak için:

```bash
sudo parted /dev/sdX mklabel gpt
sudo parted /dev/sdX mkpart primary ext4 0% 100%
sudo mkfs.ext4 /dev/sdX1
```

> `ext4` yerine `xfs`, `btrfs` gibi diğer dosya sistemleri de kullanılabilir.

---

## 📣 Sonuç: Güvenli ve Bilinçli Disk Temizliği Şart

Linux'ta diskleri sıfırlamak, hem sistem güvenliği hem de stabilitesi açısından oldukça önemlidir. Hangi diski sildiğinizden **%100 emin olmadan** hiçbir işlem yapmayın. Özellikle sunucularda veya çoklu disk bulunan sistemlerde ekstra dikkat gereklidir.

---

Eğer bu rehber işine yaradıysa paylaşabilir, aşağıya yorum bırakabilir veya blogumu takip edebilirsin. Daha fazla Linux ipucu ve sistem yönetimi rehberi için buradayım! 🐧

---

Senin de kullandığın başka yöntemler varsa yorumlarda paylaş, birlikte büyüyelim! 🙌

[responsive_img src="/images/Linux-uzerinde-disk-sifirlama-xl.webp" alt="Linux üzerinde disk sıfırlama" /]
