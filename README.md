# Minel - Minimal Pelican Theme

Minel, Pelican blog motoru için Tailwind CSS ile geliştirilmiş minimal bir temadır.

## Özellikler

- Tailwind CSS ile modern tasarım
- Karanlık/Aydınlık mod desteği
- Mobil uyumlu (responsive) tasarım
- İçindekiler tablosu
- Kod vurgulama (syntax highlighting)
- SEO optimizasyonu
- Yapısal veri (Schema.org) desteği
- Arama özelliği

## Kurulum

1. Tema dosyalarını Pelican projenizin `themes/Minel` dizinine kopyalayın
2. `pelicanconf.py` dosyanızda temayı etkinleştirin:

```python
THEME = 'themes/Minel'
```

## Geliştirme

### Bağımlılıkları Yükleme

```bash
cd themes/Minel
npm install
```

### CSS Geliştirme

CSS dosyalarını geliştirme modunda derlemek için:

```bash
npm run watch
```

### CSS Derleme

CSS dosyalarını normal boyutta derlemek için:

```bash
npm run build
```

### CSS Minimize Etme (Üretim için)

CSS dosyalarını sıkıştırılmış ve optimize edilmiş şekilde derlemek için:

```bash
npm run build:prod
```

Bu komut, CSS dosyasını minimize eder, gereksiz boşlukları ve yorumları kaldırır, böylece dosya boyutu küçülür ve site daha hızlı yüklenir.

## Yapılandırma

Tema için `pelicanconf.py` dosyanızda aşağıdaki ayarları kullanabilirsiniz:

```python
# Temel Ayarlar
SITENAME = 'Site Adınız'
SITEURL = 'https://example.com'
DESCRIPTION = 'Site açıklamanız'
AUTHOR = 'Adınız'

# Sosyal Medya Bağlantıları
SOCIAL = {
    'github': 'kullanıcı-adınız',
    'instagram': 'kullanıcı-adınız',
    'youtube': 'kullanıcı-adınız',
    'twitch': 'kullanıcı-adınız',
    'discord': 'kullanıcı-adınız',
    'mastodon': 'kullanıcı-adınız',
    'matrix': 'kullanıcı-adınız',
    'kick': 'kullanıcı-adınız'
}

# Navbar Linkleri
NAVBAR_LINKS = [
    {'name': 'Ana Sayfa', 'url': '/'},
    {'name': 'Hakkımda', 'url': '/pages/about.html'},
    {'name': 'Kategoriler', 'url': '/categories.html'},
    {'name': 'Etiketler', 'url': '/tags.html'},
    {'name': 'Bağış', 'url': '/pages/donate.html'}
]
```

## Lisans

MIT
