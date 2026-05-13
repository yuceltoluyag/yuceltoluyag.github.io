Title: Arch Linux Üzerinde Playwright Kurulumu: Adım Adım Rehber 🐧
Date: 2025-08-16 17:00
Category: Linux
Tags: playwright, arch linux, e2e test, web test otomasyonu, playwright kurulumu, aur
Slug: playwright-arch-linux-kurulum
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Arch Linux üzerinde Playwright kurulumu için gerekli adımlar, bağımlılıklar ve olası sorunların çözümlerini adım adım anlatıyoruz. Bu rehber ile E2E test ortamınızı kolayca hazırlayabilirsiniz.
Template: article
Image: images/playwright-report-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115039808506283062
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lwjxyjgoss2t

Web uygulamalarını uçtan uca (E2E) test etmek için **Playwright** son yıllarda oldukça popüler hale geldi. Chromium, Firefox ve WebKit gibi farklı tarayıcıları tek bir API ile test edebilmek büyük kolaylık sağlıyor. Ancak iş **Arch Linux** üzerinde Playwright kurmaya gelince işler her zaman pürüzsüz ilerlemeyebiliyor. Çeşitli bağımlılıklar, eksik kütüphaneler ve AUR üzerinde sık sık yaşanan paket değişiklikleri kurulum sürecini uzatabiliyor.

Bu yazıda, kendi yaşadığım deneyimlerden ve topluluk çözümlerinden yola çıkarak Arch Linux üzerinde Playwright kurulumunu adım adım anlatacağım. 🎯

---

## 1. Playwright Nedir ve Neden Kullanılır?

Öncelikle kısa bir özetle başlayalım. **Playwright**, Microsoft tarafından geliştirilen açık kaynaklı bir test otomasyon aracıdır. Sunduğu başlıca özellikler:

- 🌐 Chromium, Firefox ve WebKit desteği
- 🖥️ Headless (görünmez) ve headed (görünür) mod desteği
- 📱 Mobil cihaz simülasyonu
- ⚡ Hızlı ve güvenilir test otomasyonu

Eğer bir web geliştiriciyseniz veya CI/CD süreçlerinizi otomatize etmek istiyorsanız Playwright oldukça işinize yarayacaktır.

---

## 2. İlk Adım: Gerekli Bağımlılıkların Kurulumu

Arch Linux üzerinde Playwright’ı doğrudan kurmaya kalkarsanız büyük ihtimalle bazı kütüphanelerin eksik olduğuna dair hata mesajlarıyla karşılaşacaksınız. Bu yüzden önce şu bağımlılıkları kurmamız gerekiyor:

```bash
sudo pacman -S --needed core/nss core/nspr extra/at-spi2-core extra/libcups extra/libdrm \
  core/dbus extra/libxcb extra/libxkbcommon extra/libx11 extra/libxcomposite \
  extra/libxdamage extra/libxext extra/libxfixes extra/libxrandr extra/mesa \
  extra/pango extra/cairo extra/alsa-lib extra/xorg-server-xvfb
```

!!! note "Önemli Bu paketlerin çoğu tarayıcıların GUI ile ilgili ihtiyaçlarını karşılar. Özellikle headless modda bile çalışmak için bu bağımlılıklar gereklidir."

---

## 3. AUR Üzerinden Playwright Kurulumu

Temel bağımlılıkları yükledikten sonra sıra Playwright’ı kurmaya geliyor. Arch Linux kullanıcıları için en pratik yol AUR üzerinden kurulum yapmak:

```bash
yay -S playwright
```

Kurulum tamamlandığında Playwright’ı kullanabilir hale geleceksiniz. Ancak gerçek dünya tecrübesi gösteriyor ki, çoğu zaman hâlâ bazı kütüphaneler eksik kalabiliyor. 😅

---

## 4. Eksik Kütüphaneler ve Çözümleri

Kurulumdan sonra karşılaşabileceğiniz en yaygın hataları ve çözümlerini aşağıda topladım.

### 🔹 `libffi.so.7` ve `libpcre.so.3` Hataları

```bash
yay -S libffi7
sudo ln -s /usr/lib/libpcre.so /usr/lib/libpcre.so.3
```

### 🔹 `icu66` ve `enchant`

```bash
yay -S icu66 enchant libffi7
sudo pacman -S woff2 hyphen
```

### 🔹 `libwebp.so.6` Eksikliği

Eski libwebp sürümü artık AUR’da mevcut değil. İki çözüm var:

1. **Kaynağından Derlemek**

```bash
git clone https://chromium.googlesource.com/webm/libwebp
cd libwebp
git checkout v0.5.2-rc2
./autogen.sh
./configure
make
sudo make install
sudo cp src/.libs/libwebp.so.6.0.2 /usr/lib/libwebp.so.6
```

2. **Yeni libwebp Paketini Kullanmak**

```bash
yay -S libwebp
sudo ln -s /usr/lib/libwebp.so.7 /usr/lib/libwebp.so.6
```

### 🔹 `flite` Bağımlılığı

```bash
git clone https://github.com/festvox/flite.git
cd flite
./configure --enable-shared
make
make get_voices

sudo cp build/x86_64-linux-gnu/lib/*.so* /usr/lib
```

!!! warning "Uyarı AUR’daki <code>flite1</code> paketi eksik kütüphanelerle geldiği için genellikle elle derlemek daha sağlıklıdır."

### 🔹 `libxml2` Bağlantı Sorunları

```bash
yay -S libxml2
cd /usr/lib
sudo ln -s libxml2.so.16.0.5 libxml2.so.2
```

---

## 5. Playwright’ı Pip ile Kurmak İsteyenlere 👩‍💻

Eğer AUR ile uğraşmak istemezseniz Playwright’ı `pip` üzerinden de kurabilirsiniz:

```bash
pip install playwright
python -m playwright install
```

Ancak bu yöntemle de bağımlılık sorunlarıyla karşılaşabilirsiniz. Debian/Ubuntu için verilen komutlar Arch’ta geçerli değildir. Yine de eksik kütüphaneleri yukarıdaki adımlar ile tamamlayabilirsiniz.

---

## 6. ImportError: `sync_playwright` Hatası

Bir başka yaygın sorun, aşağıdaki gibi bir import hatası:

```python
from playwright import sync_playwright
```

Bu yöntem artık eskidi. Doğrusu şu şekilde olmalı:

```python
from playwright.sync_api import sync_playwright
```

!!! tip "İpucu Playwright sürüm notlarını takip edin. Import yolları sık sık değişebiliyor."

---

## 7. Sonuç

Arch Linux üzerinde Playwright kurulumu, diğer dağıtımlara göre biraz daha zahmetli olsa da doğru bağımlılıkları yükledikten sonra sorunsuz şekilde çalışıyor. Bu rehberde paylaştığım adımlar ile:

- Gerekli bağımlılıkları kurdunuz ✅
- AUR üzerinden Playwright yüklediniz ✅
- Eksik kütüphaneleri giderdiniz ✅
- Yaygın hatalara çözümler buldunuz ✅

Artık web uygulamalarınızı gönül rahatlığıyla Playwright kullanarak test edebilirsiniz. 🚀

Peki siz Arch Linux üzerinde Playwright kurarken hangi sorunlarla karşılaştınız? Yorumlarda paylaşmayı unutmayın! 😊

<div class="video-container">
  <video autoplay loop muted playsinline>
    <source src="/images/crm.webm" type="video/webm" />
  </video>
</div>

[responsive_img src="/images/playwright-report-xl.webp" alt="Playwright Aktif" /]



