Title: Arch Linux'ta linux-firmware Güncellemesinde NVIDIA Hatası ve Çözümü
Date: 2025-07-31 10:00
Modified: 2025-08-05 22:38
Category: Donanım
Tags: arch linux, linux-firmware, nvidia, pacman, sistem güncelleme, firmware hatası
Slug: arch-linux-linux-firmware-nvidia-hatasi-cozumu
Authors: yuceltoluyag
Status: published
Summary: linux-firmware paketinin 20250613.12fe085f-5 sürümüne yapılan güncelleme sonrası yaşanan NVIDIA firmware çakışma hatası ve adım adım çözüm rehberi.
Template: article
Image: images/arch-linux-linux-firmware-nvidia-hatasi-cozumu-lg.webp



Arch Linux kullanıyorsanız ve son güncellemeleri yaparken `linux-firmware` paketine dair can sıkıcı bir hata mesajıyla karşılaştıysanız, yalnız değilsiniz. Özellikle NVIDIA donanımına sahip sistemlerde, `linux-firmware-nvidia` ile ilgili dosya çakışmaları (`exists in filesystem`) birçok kullanıcının sistemini yükseltmesini engelliyor. Bu makalede, bu sorunun nedenini ve kalıcı çözümünü adım adım açıklıyoruz. ✅

[responsive_img src="/images/arch-linux-linux-firmware-nvidia-hatasi-cozumu-lg.webp" alt="arch-linux-linux-firmware-nvidia-hatasi-cozumu-lg.webp" /]

## linux-firmware Paketindeki Değişiklik Ne?

2025-06-13 tarihinde yayımlanan `linux-firmware` paketi, 20250613.12fe085f-5 sürümüyle önemli bir yapısal değişikliğe gitti. Artık tüm firmware bileşenleri, donanım üreticisine özel paketlere bölünmüş durumda.

Örneğin:

* `linux-firmware-nvidia`
* `linux-firmware-intel`
* `linux-firmware-amd`

Bu ayrıştırma sayesinde sistemde yalnızca ihtiyaç duyulan firmware'ler kurulabiliyor. Ana paket olan `linux-firmware` artık sadece bu alt paketlere bağımlı olan boş (metapackage) bir yapıya sahip.

> Ancak bu yeniden yapılanma, NVIDIA sürücülerine ait sembolik bağlantıların (symlink) upstream tarafından yeniden düzenlenmesiyle aynı zamana denk geldi ve beklenmedik bir dosya çakışmasına neden oldu.

## Karşılaşılan Hata Mesajı

Güncelleme sırasında Pacman şu hataları verebilir:

```
linux-firmware-nvidia: /usr/lib/firmware/nvidia/ad103 exists in filesystem
linux-firmware-nvidia: /usr/lib/firmware/nvidia/ad104 exists in filesystem
linux-firmware-nvidia: /usr/lib/firmware/nvidia/ad106 exists in filesystem
linux-firmware-nvidia: /usr/lib/firmware/nvidia/ad107 exists in filesystem
```

Bu hata mesajları, `linux-firmware` paketinin önceki sürümlerinde NVIDIA firmware dosyalarının doğrudan sistemde yer aldığını, yeni sistemde ise bunların artık `linux-firmware-nvidia` paketi tarafından yönetilmeye çalışıldığını gösteriyor.

## Sorunun Nedeni Nedir?

Pacman, varsayılan olarak dosya çakışmalarını tolere etmez. Aynı dosyanın iki farklı paket tarafından sahiplenilmesi durumunda işlemi durdurur. Bu özel durumda, sistemde zaten var olan NVIDIA firmware dosyaları, yeni `linux-firmware-nvidia` paketinin kurulmasını engelliyor.

Bu durumun ortaya çıkmasının iki ana nedeni var:

1. **Yukarı akış (upstream) tarafından yapılan sembolik bağlantı düzenlemeleri**
2. **`linux-firmware` paketinin mimarisindeki radikal değişiklik**

## Bu Sorun Kimleri Etkiler?

Bu problem, aşağıdaki koşulları sağlayan kullanıcıları etkiler:

* `linux-firmware` sürümü 20250508.788aadc8-2 veya daha eski bir sürüm kullanılıyor
* Sistem güncellenmek isteniyor (`pacman -Syu`)
* Sistemde NVIDIA donanımı mevcut (ya da `linux-firmware-nvidia` otomatik olarak yükleniyor)

## Çözüm: linux-firmware Paketini Manuel Olarak Kaldırıp Yeniden Yükleyin

Sistemi başarıyla güncellemek için aşağıdaki adımları sırasıyla uygulayın:

### 1. linux-firmware Paketini Zorla Kaldırın

```bash
sudo pacman -Rdd linux-firmware
```

Bu komut, bağımlılık kontrolü yapmadan `linux-firmware` paketini kaldırır. Normalde tavsiye edilmez, ancak bu özel durumda güvenlidir çünkü hemen ardından yeniden kurulacaktır.

### 2. Sistem Güncellemesini Tamamlayın

```bash
sudo pacman -Syu
```

Bu işlem sırasında yeni `linux-firmware` ve onun bağımlı olduğu `linux-firmware-nvidia` gibi alt paketler kurulacaktır. Dosya çakışması artık yaşanmaz.

> **Not:** Eğer `-Syu` sırasında başka hatalarla karşılaşırsanız, Pacman’ın çıktısını dikkatle kontrol edin. Spesifik bir paketin sorun çıkardığını görürseniz ona özel müdahale gerekebilir.

## Alternatif Yöntem: Belirli NVIDIA Firmware Dosyalarını Manuel Silmek

Eğer `linux-firmware` paketini kaldırmak istemiyorsanız, ilgili dosyaları tek tek silebilirsiniz:

```bash
sudo rm -rf /usr/lib/firmware/nvidia/ad103
sudo rm -rf /usr/lib/firmware/nvidia/ad104
sudo rm -rf /usr/lib/firmware/nvidia/ad106
sudo rm -rf /usr/lib/firmware/nvidia/ad107
```

Sonrasında tekrar `sudo pacman -Syu` komutunu çalıştırarak sisteminizi güncelleyebilirsiniz. Ancak bu yöntem daha fazla risk içerir ve dikkatli kullanılmalıdır.

## Özet: Sorun Neden Oldu, Nasıl Çözülür?

* `linux-firmware` artık boş bir paket ve firmware'ler ayrı ayrı paketlendi.
* NVIDIA firmware dosyalarının upstream’de yeniden düzenlenmesi, Pacman’ın dosya çakışması uyarısı vermesine yol açtı.
* Sorunu çözmek için:

  1. `linux-firmware` paketini kaldırın (`pacman -Rdd`)
  2. Sistem güncellemesini çalıştırın (`pacman -Syu`)

Bu adımlarla sisteminizi sorunsuz şekilde en güncel hale getirebilirsiniz. 🎉

---

## Sıkça Sorulan Sorular (SSS)

### Bu işlem güvenli mi?

Evet, bu belirli durumda `-Rdd` kullanmak güvenlidir çünkü `linux-firmware` hemen ardından yeniden kurulacaktır.

### Hangi sürümde bu sorun ortadan kalktı?

Sorun, `linux-firmware` 20250613.12fe085f-5 sürümüne geçişle birlikte başladı. Bu sürümden sonrakilerde yeniden yapılanma tamamlandığı için benzer sorunlar beklenmiyor.

### Otomatik bir çözüm gelir mi?

Gelecekte `pacman` veya `linux-firmware` paketleri tarafından otomatik dosya taşıma/silme desteği eklenebilir. Ancak şu an için manuel müdahale şart.

---

## Sen de Bu Sorunu Yaşadın mı?

Eğer bu rehber işine yaradıysa yorumlarda belirtmeyi unutma 💬
Ayrıca arkadaşların da benzer bir sorun yaşıyorsa paylaşarak onlara da yardımcı olabilirsin!

---

> 📌 **İpucu:** Sistem güncellemelerinden önce mutlaka `pacman.log` dosyasını yedeklemeyi unutma. Böylece neler değiştiğini kolayca takip edebilirsin.

---

**Kaynak:**

* [Arch Linux News – linux-firmware >= 20250613.12fe085f-5 upgrade requires manual intervention](https://archlinux.org/news/linux-firmware-2025061312fe085f-5-upgrade-requires-manual-intervention/)



---

