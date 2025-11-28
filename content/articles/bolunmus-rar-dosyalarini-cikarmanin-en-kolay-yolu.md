Title: Bölünmüş RAR Dosyalarını Çıkarmanın En Kolay Yolu
Date: 2025-11-12 16:00
Category: Linux
Tags: rar, linux, unrar, 7zip, arşiv
Slug: bolunmus-rar-dosyalarini-cikarmanin-en-kolay-yolu
Authors: yuceltoluyag
Summary: Linux sistemlerde .part1.rar, .part2.rar gibi bölünmüş RAR arşivlerini unrar ve 7-Zip araçlarıyla hızlı ve güvenli şekilde açmanın güncel yöntemi.
Image: images/bolunmus-rar-dosyalarini-cikarma-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115537092347551990
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m5gsv6cjgs2d

## Giriş

Linux ortamında sık karşılaşılan bir durum: bir arşiv “dosya.part1.rar”, “dosya.part2.rar” gibi parçalara bölünmüş. Bu durumda doğru aracı seçmek ve tüm parçaların aynı dizinde olduğundan emin olmak işi ciddi ölçüde kolaylaştırır. Aşağıda, 2025 yılı itibarıyla geçerli yöntemlerle bu tür **bölünmüş RAR dosyalarının** nasıl çıkarılacağını anlatıyorum.

---

## RAR Biçiminin Özellikleri

RAR arşiv biçimi, Eugene Roshal tarafından geliştirilmiş ve RARLab firmasına ait özel bir formattır.
Bu özel lisanslı yapı nedeniyle birçok Linux dağıtımında “destek paketi” olarak sunulur; açık kaynaklı `.zip`, `.tar.gz`, `.tar.zst` gibi biçimlerle kıyaslandığında ek adımlar gerektirir.

---

## 1️⃣ `unrar` ile Çıkarma

Resmî komut satırı aracı `unrar`, bölünmüş RAR arşivlerini doğrudan işleyebilir. Ayrıca 2025 itibarıyla pek çok dağıtımda aktif duruma geçmiştir.

### Kurulum

- **Debian/Ubuntu**:

```bash
sudo apt update
sudo apt install unrar
```

- **Fedora/RHEL**:

```bash
sudo dnf install unrar
```

- **Arch Linux**:

```bash
sudo pacman -S unrar
```

### Kullanım

Tüm parça dosyalarının aynı klasörde olduğundan emin olun ve ilk parçayı şu şekilde açın:

```bash
unrar x dosya.part1.rar
```

Komut, `part1` sonrası gelen tüm parçaları otomatik tanır ve çıktıları işler.

!!! note "Eğer arşiv Türkçe karakter içeriyorsa ve çıktıda bozulma görüyorsanız terminal kod sayfasını `LC_ALL=C` olarak çalıştırmayı deneyin."

---

## 2️⃣ `7-Zip` veya `7zz` ile Alternatif Yöntem

7‑Zip Linux versiyonları (`7zz`, `p7zip-full` gibi) bölünmüş RAR arşivlerini destekler. Özellikle RAR5 biçimiyle uyumluluğu artmıştır.

### Kurulum

```bash
sudo apt install p7zip-full
```

- Arch Linux kullanıcıları için:

```bash
sudo pacman -S p7zip
#veya Aur'dan:
yay -S  p7zip-full-bin
```

### Kullanım

```bash
7zz x dosya.part1.rar
```

Bu komut da, uygun paket içeriyorsa, parçaları algılar ve çıkarma işlemini tamamlar.

!!! tip "Bazı dağıtımlarda `p7zip-full` paketinde RAR desteği eksik olabilir – bu durumda `unrar` tercih edilmelidir."

---

## 3️⃣ Grafik Arayüzle Çıkarma

Masaüstü kullanıcıysanız, arşiv yöneticinizin sağ tıklama seçeneğiyle çıkarma işlemi yeterli olabilir. Örneğin:

- File Roller (GNOME)
- Ark (KDE)
- Xarchiver (XFCE)

Bu araçlar çoğu zaman `.part1.rar` dosyasına sağ tıklayıp “Çıkar” dediğinizde diğer parçaları da algılar.

!!! warning "Parçalardan biri eksik veya farklı dizindeyse çıkarma işlemi hata verir ya da eksik veri bırakabilir."

---

## Alternatif Formatları Düşünmek

Eğer kendi arşivlerinizi oluşturuyorsanız, `.zip`, `.tar.gz`, `.tar.xz` veya `.tar.zst` gibi açık biçimleri tercih etmeniz faydalı olabilir. Bunlar lisans kısıtı içermez ve tüm Linux dağıtımlarında doğrudan desteklenebilir.

---

## Sonuç

Bölünmüş RAR dosyaları artık Linux’ta bir engel değil. `unrar` ya da `7zz` gibi araçlarla birkaç komutla açabilirsiniz. Arşiv oluştururken ise açık sıkıştırma biçimlerini tercih etmek hem taşınabilirliği hem sorunsuz uyumluluğu artırır.

[responsive_img src="/images/bolunmus-rar-dosyalarini-cikarma-xl.webp" alt="Bölünmüş RAR Dosyalarını Çıkarmanın En Kolay Yolu" /]
