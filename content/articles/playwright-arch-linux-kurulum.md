Title: Arch Linux Üzerinde Playwright Kurulumu: Adım Adım Rehber 🐧
Date: 2025-08-16 17:00
Category: Linux
Tags: playwright, arch linux, e2e test, web test otomasyonu, playwright kurulumu, aur
Slug: playwright-arch-linux-kurulum
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Playwright kurulumu için gerekli adımlar, bağımlılıklar ve olası sorunların çözümlerini adım adım anlatıyoruz. Bu rehber ile E2E test ortamınızı kolayca hazırlayabilirsiniz.
Template: article
Image: images/playwright-report-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/115039808506283062

Web uygulamalarını uçtan uca (E2E) test etmek için **Playwright** son yıllarda oldukça popüler hale geldi. Chromium, Firefox ve WebKit gibi farklı tarayıcıları tek bir API ile test edebilmek büyük kolaylık sağlıyor. Ancak iş **Arch Linux** üzerinde Playwright kurmaya gelince işler her zaman pürüzsüz ilerlemeyebiliyor. Çeşitli bağımlılıklar, eksik kütüphaneler ve AUR üzerinde sık sık yaşanan paket değişiklikleri kurulum sürecini uzatabiliyor.

Bu yazıda, kendi yaşadığım deneyimlerden ve topluluk çözümlerinden yola çıkarak Arch Linux üzerinde Playwright kurulumunu adım adım anlatacağım. 🎯

---

## 1. Playwright Nedir ve Neden Kullanılır?

Öncelikle kısa bir özetle başlayalım. **Playwright**, Microsoft tarafından geliştirilen açık kaynaklı bir test otomasyon aracıdır. Sunduğu başlıca özellikler:

* 🌐 Chromium, Firefox ve WebKit desteği
* 🖥️ Headless (görünmez) ve headed (görünür) mod desteği
* 📱 Mobil cihaz simülasyonu
* ⚡ Hızlı ve güvenilir test otomasyonu

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

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Önemli</div>
        <p>Bu paketlerin çoğu tarayıcıların GUI ile ilgili ihtiyaçlarını karşılar. Özellikle headless modda bile çalışmak için bu bağımlılıklar gereklidir.</p>
    </div>
</div>

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

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Uyarı</div>
        <p>AUR’daki <code>flite1</code> paketi eksik kütüphanelerle geldiği için genellikle elle derlemek daha sağlıklıdır.</p>
    </div>
</div>

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

<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>Playwright sürüm notlarını takip edin. Import yolları sık sık değişebiliyor.</p>
    </div>
</div>

---

## 7. Sonuç

Arch Linux üzerinde Playwright kurulumu, diğer dağıtımlara göre biraz daha zahmetli olsa da doğru bağımlılıkları yükledikten sonra sorunsuz şekilde çalışıyor. Bu rehberde paylaştığım adımlar ile:

* Gerekli bağımlılıkları kurdunuz ✅
* AUR üzerinden Playwright yüklediniz ✅
* Eksik kütüphaneleri giderdiniz ✅
* Yaygın hatalara çözümler buldunuz ✅

Artık web uygulamalarınızı gönül rahatlığıyla Playwright kullanarak test edebilirsiniz. 🚀

Peki siz Arch Linux üzerinde Playwright kurarken hangi sorunlarla karşılaştınız? Yorumlarda paylaşmayı unutmayın! 😊

<div class="video-container">
  <video autoplay loop muted playsinline>
    <source src="/images/crm.webm" type="video/webm" />
  </video>
</div>

[responsive_img src="/images/playwright-report-xl.webp" alt="Playwright Aktif" /]