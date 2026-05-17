Title: Pelican Statik Sitenizi Playwright ile Test Edin: Hatalara Elveda
Date: 2026-05-11 01:48
Category: Geliştirme Araçları
Tags: playwright, python, pelican, testing, static-site, uv
Slug: pelican-statik-site-playwright-test
Authors: yuceltoluyag
Summary: Pelican ile ürettiğiniz statik sitenizi yayına almadan önce Playwright ve Python kullanarak nasıl otomatik testlerden geçireceğinizi anlatıyorum.
Image: images/pelican-playwright-test-xl.webp
Lang: tr
Status: published

Daha önce [Playwright Arch Linux Kurulum](/playwright-arch-linux-kurulum/) yazımda bu canavarı sistemimize nasıl kuracağımızı anlatmıştım. Şimdi o gücü, kendi blogumuzdaki (Pelican) hataları ayıklamak için sahaya sürme vakti. 

Statik site kurmak kolay, ama karmaşık temalar ve JavaScript eklentileri arttıkça "bir yerler kırıldı mı?" korkusu başlar. Gelin, `uv` ve `playwright` ikilisiyle Pelican sitemizi nasıl otomatize test ederiz, yakından bakalım.

## 🛠️ Neden Playwright? (Pelican Perspektifi)

Pelican sitenizi `pelican content -o output` ile derlediğinizde elinizde bir sürü HTML kalır. Ancak:
1.  JavaScript ile çalışan "Dark Mode" butonun çalışıyor mu?
2.  Konsolda gizli bir `404` veya `Uncaught TypeError` var mı?
3.  Sayfalar arası geçişlerde o çok sevdiğin animasyon patlıyor mu?

Bunları sadece bir tarayıcıyı programlayarak (headless browser) anlayabiliriz.

## 📦 uv ile Test Ortamını Hazırlamak

Hala standart `pip` kullanmıyorsunuz değil mi? `uv` ile saniyeler içinde test ortamını kuralım:

```bash
yuceltoluyag@archlinux:~$ uv add --dev pytest playwright
yuceltoluyag@archlinux:~$ uv run playwright install webkit
```

## 🧠 Sinsi Hataları Yakalayan Fixture

İşin uzmanlık (expert) kısmı burası. Sadece sayfa açıldı mı diye bakmıyoruz; arka planda konsola düşen her hatayı yakalayan "katı" (strict) bir test fixture'ı kuruyoruz. `tests/conftest.py` içine şunu gömelim:

```python
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        browser = p.webkit.launch()
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    
    # Konsol hatalarını biriktirelim
    errors = []
    page.on("pageerror", lambda exc: errors.append(exc))
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    
    yield page
    
    # Test bittiğinde hata varsa patlat!
    assert not errors, f"Sayfada JavaScript hataları bulundu: {errors}"
    context.close()
```

## 🧪 Temel ve İleri Seviye Test Senaryoları

Pelican'ın ürettiği `output` klasöründeki dosyaları doğrudan `file:///` protokolü ile test edeceğiz. İşte birkaç "hayat kurtaran" test örneği:

### 1. Sayfa Yüklenmesi ve Başlık Kontrolü
```python
from pathlib import Path
from urllib.request import pathname2url
from playwright.sync_api import expect

def test_home_page_loads(page):
    index_path = Path("output/index.html").absolute()
    page.goto(f"file://{pathname2url(str(index_path))}")
    expect(page).to_have_title("Yücel Toluyag")
```

### 2. JavaScript Devre Dışıyken Test Etme (Expert Tip)
Siteniz JS kapalıyken de okunabilir olmalı. Playwright ile bunu test etmek çok kolay:
```python
def test_no_js_fallback(browser):
    # Yeni bir context aç, JS'i kapat
    context = browser.new_context(java_script_enabled=False)
    page = context.new_page()
    
    page.goto(f"file://{pathname2url(str(Path('output/index.html').absolute()))}")
    
    # Eğer <noscript> içinde bir hata mesajı gösteriyorsanız onu kontrol edin
    # Veya kritik içeriğin hala orada olduğunu doğrulayın
    expect(page.get_by_text("Yücel Toluyag")).to_be_visible()
    context.close()
```

### 3. Redirect ve Link Kontrolü
Eski bir sayfanızı yeni bir URL'e yönlendirdiyseniz, bunun doğru çalışıp çalışmadığını status code üzerinden doğrulayabilirsiniz:
```python
def test_internal_redirect(page):
    response = page.goto("https://yuceltoluyag.com/eski-yazi/")
    assert response.status == 200
    assert response.url == "https://yuceltoluyag.com/yeni-yazi/"
```

### 4. XPath ile İlişkisel DOM Kontrolleri
Bazen CSS selector'ları yetmez. Örneğin, belirli bir başlığın hemen yanındaki veya altındaki butonu seçmek için XPath kullanabilirsiniz:
```python
def test_article_sibling_button(page):
    # 'Makaleler' başlığının hemen ardından gelen 'Devamını oku' butonunu bul
    button = page.locator("xpath=//h2[contains(text(), 'Makaleler')]/following-sibling::a[1]")
    expect(button).to_have_attribute("href", "/makaleler/")
```

## 🚀 Testleri Çalıştırma

Terminalden şu komutu verdiğinizde Playwright gizlice tarayıcıyı açar, Pelican'ın ürettiği siteyi tarar ve eğer bir JS hatası veya kırık yapı varsa size raporlar:

```bash
yuceltoluyag@archlinux:~$ uv run pytest tests/
```

### Neden Bu Zahmete Giriyoruz?

Çünkü statik siteler "basit" değildir. Özellikle kendi temanızı yazıyorsanız veya karmaşık CSS/JS yapıları kullanıyorsanız, bir makaleyi güncellerken tüm site yapısını bozma riskiniz her zaman vardır. Playwright ile bu riski sıfıra indiriyoruz.

Unutmayın; test yazmak zaman kaybı değil, gelecekteki uykusuz gecelerden çalınmış bir sigortadır. [Playwright Arch Linux Kurulum](/playwright-arch-linux-kurulum/) rehberimle başladığınız bu yolda, artık siteniz gerçek bir mühendislik ürünü gibi sağlam duruyor kardaş.

Hadi eyvallah!

---

## 🔗 İlgili Yazılar
- [Playwright Arch Linux Kurulum](/playwright-arch-linux-kurulum/)
- [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)
- [Diskleri Çöpe Atın: Raspberry Pi Zero ile RAM Üstünde Site Barındırmak](/raspberry-pi-zero-ram-diskless-web-server/)



