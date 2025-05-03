# Minel - Minimal Pelican Teması

Minel, [Pelican](https://getpelican.com) blog motoru için [Tailwind CSS](https://tailwindcss.com) ve [DaisyUI](https://daisyui.com) ile geliştirilmiş minimal bir temadır.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=1e6a19574e1e&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

## 🚀 Özellikler

- **Modern Tasarım**: Tailwind CSS v4 ve DaisyUI ile geliştirilmiş modern arayüz
- **Karanlık/Aydınlık Mod**: Otomatik ve manuel tema değiştirme desteği
- **Mobil Uyumlu**: Tüm cihazlarda kusursuz deneyim
- **Gelişmiş İçerik Özellikleri**:
  - Otomatik içindekiler tablosu (TOC)
  - Kod vurgulama (syntax highlighting)
  - Öne çıkan makale desteği
- **SEO Optimizasyonu**:
  - Yapısal veri (Schema.org) desteği
  - VideoObject şeması (YouTube videoları için otomatik)
  - Meta açıklamaları ve anahtar kelimeler
- **Performans**:
  - Resim optimizasyonu ve WebP dönüşümü
  - CSS/JS minify desteği
  - Lazy loading ve kaynak önceliklendirme
- **Erişilebilirlik**: WCAG erişilebilirlik standartlarına uygunluk
- **İnteraktif Özellikler**:
  - Site içi arama
  - PWA desteği
- **Entegrasyonlar**:
  - Webmention.io desteği
  - RSS ve Atom feed desteği
  - E-posta aboneliği (Buttondown)
  - Çoklu dil desteği

## 📥 Kurulum

1. Tema dosyalarını Pelican projenizin `themes/Minel` dizinine kopyalayın:

```bash
git clone https://github.com/yuceltoluyag/Minel themes/Minel
```

2. Gerekli bağımlılıkları yükleyin:

```bash
# NPM paketleri
cd themes/Minel
npm install

# Python paketleri
pip install -r requirements.txt
```

3. `pelicanconf.py` dosyanızda temayı etkinleştirin:

```python
THEME = 'themes/Minel'
```

## 🛠️ Geliştirme

### Geliştirme Modu

Dosyaları izlemek ve değişiklikleri otomatik derlemek için:

```bash
npm run dev
# veya
duty watch
```

### CSS/JS Geliştirme

Kaynak dosyalarınızı **_assets** klasörüne yerleştirin:
- CSS: `themes/Minel/_assets/css/`
- JS: `themes/Minel/_assets/js/`
- Görseller: `themes/Minel/_assets/images/`

Node.js betiği, bu dosyaları işleyerek gerekli dizinlere otomatik olarak çıkartır.

### Üretim için Derleme

Optimize edilmiş üretim derlemesi için:

```bash
npm run build      # Geliştirme modunda derleme
npm run publish    # Üretim için optimize edilmiş derleme

# Üretimden sonra canlı yenileme
duty livereload
```

### Temizleme

Derlenen dosyaları temizlemek için:

```bash
npm run clean
# veya
duty clean
```

## 📝 İçerik Oluşturma

Yeni bir makale oluşturmak için:

```bash
duty new "Makale Başlığı"
```

## 🧩 Eklenti Entegrasyonları

### Video Şema Eklentisi

YouTube videolarınız için otomatik VideoObject şeması ekler:

- Makalelerinizde YouTube iframe'leri otomatik tespit edilir
- Google arama sonuçlarında video içeriğiniz daha iyi görüntülenir

### Webmention Entegrasyonu

1. [Webmention.io](https://webmention.io/)'da hesap oluşturun
2. API token'ını `_assets/js/webmention.js` dosyasındaki `apiToken` değişkenine atayın
3. Geliştirme modunda test etmek için:

```python
# pelicanconf.py
DEVELOPMENT_MODE = True  # Geliştirme için
# DEVELOPMENT_MODE = False  # Üretim için
```

## 📜 Değişiklik Geçmişi

Detaylı değişiklik geçmişi için [CHANGELOG.md](CHANGELOG.md) dosyasına bakınız.

## 📄 Lisans

MIT Lisansı altında dağıtılmaktadır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.