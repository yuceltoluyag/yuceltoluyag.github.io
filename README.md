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
- VideoObject şeması (YouTube videoları için otomatik)
- Arama özelliği
- İstatistik özellikleri
- Resim optimizasyonu
- Minify desteği
- PWA desteği
- Çoklu dil desteği
- Öne çıkan makale desteği
- RSS ve Atom feed desteği
- WCAG erişilebilirlik standartlarına uygunluk

## Blog İyileştirmeleri - 2024

Bu güncellemede bloğun çeşitli yönlerini iyileştirmek için aşağıdaki özellikler eklenmiştir:

### 1. Koyu/Açık Tema Geçişi İyileştirmesi
- Animasyonlu tema değişimi
- Özelleştirilmiş tema geçiş butonu
- Kullanıcı tercihi hatırlama

### 2. Tipografi ve Görsel İyileştirmeler
- Özel başlık fontları ve stilleri
- Vurgu efektleri
- Blockquote, liste ve diğer içerik öğeleri için geliştirilmiş stiller

### 3. SEO Optimizasyonu
- Otomatik meta açıklamaları ve anahtar kelimeler oluşturma
- Türkçe içerik analizi ve anahtar kelime çıkarma
- Stop-word filtreleme

### 4. İç Bağlantı Yapısı
- Zenginleştirilmiş iç bağlantı görünümü
- Geçiş animasyonları
- Ziyaret edilmiş bağlantı izleme
- Bağlantı başlık öznitelikleri otomatik ekleme

### 5. E-posta Aboneliği
- Özelleştirilmiş haber bülteni kayıt formu
- Buttondown entegrasyonu
- Abone olduktan sonra teşekkür bildirimi

### 6. İçindekiler Tablosu İyileştirmeleri
- Otomatik aktif bölüm vurgulama
- Animasyonlu kaydırma
- Görsel olarak geliştirilmiş içindekiler tablosu
- Mobil cihazlar için optimize edilmiş görünüm

### 7. Performans İyileştirmeleri
- Lazy loading
- Kritik olmayan JS erteleme
- Core Web Vitals izleme ve raporlama
- Önbelleğe alma stratejileri

## Kurulum

1. Tema dosyalarını Pelican projenizin `themes/Minel` dizinine kopyalayın
2. Kaynak dosyalarınızı **_assets** klasörüne atın (css, js, images). Node.js betiği dosyaları işlemden geçirdikten sonra gerekli yerlere otomatik olarak çıkartacaktır.
3. `pelicanconf.py` dosyanızda temayı etkinleştirin:

```python
THEME = 'themes/Minel'
```

4. Gerekli npm paketlerini yükleyin:

```bash
npm install
```

5. Gerekli Python paketlerini yükleyin:

```bash
pip install -r requirements.txt
```

## Eklentiler

### Video Şema Eklentisi

Bu tema, YouTube videolarını içeren makaleleriniz için otomatik olarak VideoObject şeması ekleyen bir eklenti içerir. Bu, Google Search Console'da videolarınızın daha iyi indekslenmesini sağlar.

`pelicanconf.py` dosyasını inceleyin.

Bu eklenti, makalelerinizde bulunan YouTube iframe'lerini otomatik olarak tespit eder ve uygun VideoObject şemasını ekler.

## Geliştirme

Bu temayı kodladığımda Tailwind köklü bir değişikliğe giderek 4.0 sürümünü çıkardı. Henüz yeni sürümle uyumlu değildir.

### Geliştirme Modu

Dosyaları izlemek ve değişiklikleri otomatik derlemek için:

```bash
npm run dev
```

veya

```bash
duty watch
```

### Üretim için Derleme

Tüm dosyaları optimize edilmiş şekilde derlemek için:

```bash
npm run build # dev
npm run publish # production
# Üretimden sonra
duty livereload # dev
```

veya

```bash
duty build
```

Bu komut aşağıdaki işlemleri yapar:
- CSS dosyalarını minimize eder
- JavaScript dosyalarını minimize eder
- Resimleri optimize eder
- WebP formatına dönüştürür
- Service Worker dosyasını oluşturur
- Manifest dosyasını oluşturur
- Kaynak dosyaları _assets klasöründe derlenir

### Temizleme

Derlenen dosyaları temizlemek için:

```bash
npm run clean
```

veya

```bash
duty clean
```

### Paketleri Güncelleme

Paketleri güncellemek için:

```bash
duty update
```
## Yeni Makale Oluşturma

Yeni bir makale oluşturmak için:

```bash
# Yeni bir makale oluştur
duty new "Makale Başlığı"
```


## Lisans

MIT Lisansı altında dağıtılmaktadır. Detaylar için LICENSE dosyasına bakınız.