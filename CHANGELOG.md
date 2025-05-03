# Proje Değişiklikleri Özeti

Bu doküman, projede yapılan önemli değişiklikleri maddeler halinde özetlemektedir.

## 1. Mastodon Yorumları Entegrasyonu

### Yeni Eklenen Özellikler

- Makalelere Mastodon toot bağlantıları ekleme desteği
- Makale meta verilerinden Mastodon toot ID'lerini veya bağlantılarını otomatik çıkarma
- Sadece Mastodon bağlantısı olan makalelerde yorum bölümü gösterme
- Gelişmiş hata işleme ve kullanıcı deneyimi iyileştirmeleri
- Yönetim araçları eklentisi

### Değiştirilen Dosyalar

- `themes/Minel/templates/article.html`: Mastodon yorumları gösterim kontrolü eklendi
- `themes/Minel/templates/base.html`: Gerekli JavaScript dosyaları dahil edildi
- `pelicanconf.py`: Mastodon yapılandırması ve admin araçları ayarları eklendi
- `duties.py`: Mastodon toot ID yönetimi için yeni görev eklendi

### Yeni Eklenen Dosyalar

- `content/mastodon_comments.json`: Mastodon ID'lerini makale slug'larıyla eşleştirme dosyası
- `themes/Minel/static/js/mastodon-comments.js`: Mastodon yorumlarını görüntüleyen Web bileşeni
- `themes/Minel/static/js/mastodon-id-finder.js`: Mastodon URL'lerinden ID çıkarma aracı
- `themes/Minel/templates/includes/admin-panel.html`: Makale yönetim araçları paneli

## 2. CSS Yapısı Yenileme

### Önemli Değişiklikler

- Eski CSS dosya yapısı kaldırıldı, daha modüler ve bakımı kolay bir yapıya geçildi
- TailwindCSS v4 uyumluluğu için güncelleme yapıldı
- CSS derleme ve optimizasyon araçları güncellendi

### Kaldırılan Dosyalar

- `_assets/css/` altındaki tüm dosyalar (base, components, layouts, pages, utils vb.)
- `themes/Minel/static/css/main.min.css`
- `gulpfile.js`, `package.json` ve `package-lock.json`

### Yeni Eklenen Dosyalar

- `themes/Minel/_assets/`: Yeni CSS/JS kaynak dosyaları 
- `themes/Minel/static/css/style.css`: Yeni birleştirilmiş CSS
- `themes/Minel/.babelrc`, `themes/Minel/postcss.config.mjs`: Derleme yapılandırmaları
- `themes/Minel/package.json`: Tema seviyesinde bağımlılıklar

## 3. JavaScript Geliştirmeleri

### Yeni Eklenen Dosyalar

- `themes/Minel/static/js/code-copy.js`: Kod bloklarını kopyalama işlevselliği
- `themes/Minel/static/js/main.js`: Ana JavaScript işlevleri
- `themes/Minel/static/js/toc.js` ve `themes/Minel/static/js/toc-enhancements.js`: İçindekiler tablosu iyileştirmeleri
- `themes/Minel/static/js/unified-toc.js`: Birleştirilmiş içindekiler tablosu özellikleri
- `themes/Minel/static/js/webmention.js` ve `themes/Minel/static/js/webmention-test.js`: Webmention entegrasyonu

### Değiştirilen JavaScript Dosyaları

- JavaScript dosyaları artık minify edilmemiş halde bulunuyor (daha kolay geliştirme için)
- Eski `.min.js` dosyaları kaldırıldı

## 4. Şablon Güncellemeleri

- `themes/Minel/templates/about.html`, `donate.html`, `legal.html` ve diğer şablonlar yeni yapıya uygun güncellendi
- `themes/Minel/templates/includes/head.html` kaldırıldı, içeriği `base.html` içine taşındı
- `themes/Minel/templates/includes/header.html` ve `footer.html` güncel tasarıma uyarlandı
- Arama modalı, navigasyon ve diğer bileşenler güncel tasarım dilini yansıtacak şekilde güncellendi

## 5. Proje Yapılandırma Değişiklikleri

- `.gitignore`: Yeni dosya yapısına uygun güncellendi
- `.pre-commit-config.yaml`: Güncel kontroller eklendi
- `pyproject.toml` ve `requirements.txt`: Bağımlılıklar güncellendi
- `uv.lock`: Güncel paket kilitleme dosyası eklendi
- `poetry.lock`: Poetry ile bağımlılık yönetimi için eklendi

## 6. İçerik Güncellemeleri

- `content/articles/onemli-degisiklikler.md`: Önemli değişiklikler belgesi güncellendi
- `content/articles/dreame-d10-plus-gen-2-inceleme.md` ve `raspberry-pi-nasil-kurulur.md`: İçerik güncellemeleri

## Kullanım Bilgileri

### Mastodon Yorumları Kullanımı

Makalenizin başlangıcına aşağıdaki formatlardan birini ekleyin:

1. **Tam Mastodon bağlantısı ile:**
   - `Mastodon_Link: https://mastodon.social/@yuceltoluyag/123456789`

2. **Sadece ID kullanarak:**
   - `Mastodon_ID: 123456789`

### Admin Araçları Kullanımı

1. `pelicanconf.py` dosyasında `ADMIN_TOOLS = True` yapın
2. Makale sayfasına gidin ve sayfanın altında admin panelini göreceksiniz
3. "Mastodon ID Bulucu" aracını kullanarak Mastodon URL'sini girin
4. "ID Çıkar" butonuna tıklayın
5. "Kopyala" butonuyla meta veriyi kopyalayıp makalenize ekleyin

## Önbellek Temizleme

Eğer değişiklikler sitenizde görünmüyorsa:

1. Tarayıcı önbelleğini temizleyin
2. Pelican'ı `--delete-output-directory` parametresiyle çalıştırın

## Ek Notlar

- Bu yorumlar sistemi, Fediverse ağındaki tüm yorumları gösterir (sadece Mastodon ile sınırlı değil)
- Mastodon API hız sınırlamalarına dikkat edin
- Yorum gösterilmeyen makalelerde "Yorumlar yüklenirken hata oluştu" mesajı artık gösterilmeyecek
- Responsive tasarım ile mobil ve masaüstü cihazlarda sorunsuz çalışır
- Sadece gerekli olduğunda JavaScript kodları yüklenir (performans optimizasyonu)
