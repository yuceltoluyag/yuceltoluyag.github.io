Title: Rehber: Google Indexing API kullanımı
Date: 2025-11-05 20:45
Category: Web Geliştirme
Tags: google indexing api, seo, python, google search console, url indexleme
Slug: google-indexing-api-nasil-kullanilir
Authors: yuceltoluyag
Status: published
Summary: Google Indexing API ile yeni veya silinen sayfaları hızlıca Google’a bildir. SEO sürecini hızlandırmak için örnek Python koduyla adım adım anlatım.
Template: article
Image: images/google-indexing-api-python-kullanim-rehberi-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115520725904142412
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57kcm5ses2g


## 🚀 Google Indexing API nedir?

Yeni bir blog yazısı ekledin ama Google hâlâ dizine almadı mı? 😤 İşte tam burada Google Indexing API devreye giriyor.Bu API, özellikle içerik değişikliklerini anında Google’a bildirmeni sağlar.
Yani bir sayfa eklediğinde, güncellediğinde ya da sildiğinde artık “crawl bekleme” dönemi biter.

!!! note "Indexing API aslında Google’ın JobPosting ve BroadcastEvent türleri için resmi olarak desteklenir"

Ancak birçok geliştirici blog ve haber sitelerinde de başarılı sonuçlar alıyor.

✍️ Kişisel Deneyimim

Birden fazla kez blog sistemimi değiştirdim — bazen Jekyll, bazen Pelican, hatta WordPress’e bile geçtim.Domain değiştirdikçe, link yapılarım da değişti.Sonuç? 😩 Bazı eski yazılarım Google tarafından hiç indexlenmemiş, bazıları ise tamamen silinmiş durumda. Bir zamanlar ilk sayfada yer alan makalelerim, artık “hiç var olmamış” gibi görünüyordu. Bu yüzden araştırmaya başladım ve sonunda Google Indexing API’yi keşfettim. Umarım bu yöntemle yazılarım tekrar index alır ve emeklerim boşa gitmez. Günümüzde AI teknolojileri her şeyi dönüştürüyor, blog okuyan insan sayısı da azaldı.Ama ben hâlâ inanıyorum: Az olsun, öz olsun. ✨

---

## 🧩 Gerekli hazırlıklar

Google Indexing API’yi kullanmadan önce birkaç adımı tamamlaman gerekiyor:

### 1. Google Cloud projesi oluştur

- [Google Cloud Console](https://console.cloud.google.com/){: target="\_blank" rel="noopener noreferrer"} adresine git, yeni bir proje oluştur ve “**Web Search Indexing API**” servisini etkinleştir.

[responsive_img src="/images/google-indexing-api-nasil-kullanilir-xl.webp" alt="Google Indexing API Python ile nasıl kullanılır rehberi" /]

### 2. Service Account oluştur

API’yi çağırmak için bir **service account** gerekiyor.

- Cloud Console > “APIs & Services” > “Credentials” menüsüne gir.

[responsive_img src="/images/google-indexing-api-service-account-xl.webp" alt="Google Indexing API Credentials oluşturma" /]

- Bu adımda: Service account u seçip yeni bir tane oluştur.Çıkan menüde aklınızda kalan bir isim verin ve “Create and continue” deyin. Diğer adımları boş geçebilirsiniz.Daha sonra resimde gösterilen ekranda(2 numara) size bir eposta verecek. Bu eposta adresini not edin çünkü daha sonra Search Console’da bu adresi kullanıcı olarak eklemeniz gerekecek.

- “Create credentials” > “Service account” seç.

  [responsive_img src="/images/google-indexing-api-add-key-xl.webp" alt="Google Indexing API Key oluşturma" /]

- Bu adımda önünüze çıkan ekranda “Add Key” butonuna tıklayın ve “Create new key” seçeneğini seçin.

- Sonra bu hesabın “JSON” anahtar dosyasını indir (örnek: `indexing-key.json`). Bu dosyayı güvenli bir yerde sakla çünkü API çağrılarında buna ihtiyacın olacak.

### 3. Yetkiyi doğrula

İlgili web sitenin **Search Console** mülküne bu service account e-posta adresini (örnek: `indexer@project-id.iam.gserviceaccount.com`) **kullanıcı olarak ekle.**

- Bu adımı şöyle yapabilirsin: Search Console > Ayarlar > Kullanıcı ve izinler > Yeni kullanıcı ekle.Bu adımda bu eposta adresini gir ve “Sahibi” yetkisi ver.İngilizce arayüzde owner olarak geçiyor. Eğer bu adımı atladıysan API çağrıları başarısız olur.

---

## 💻 Python ile Google Indexing API kullanımı

Aşağıdaki örnek kod, bir CSV dosyasındaki tüm linkleri Google’a **“indexlendi”** veya **“silindi”** olarak bildirmeyi sağlar:

```python
from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
import csv

SERVICE_ACCOUNT_FILE = 'indexing-key.json'
SCOPES = ['https://www.googleapis.com/auth/indexing']
API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
session = AuthorizedSession(credentials)

with open('urls.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        url = row[0]
        body = {'url': url, 'type': 'URL_UPDATED'}
        response = session.post(API_URL, json=body)
        print(f"{url} -> {response.status_code}")
```

!!! tip "İpucu ⚡ `URL_UPDATED` parametresi “sayfa eklendi veya güncellendi” anlamına gelir. Eğer sayfayı silmek istiyorsan `URL_DELETED` kullan."

---

## 🔍 Indexleme durumunu nasıl kontrol edebilirsin?

Google şu anda API üzerinden doğrudan “indexlendi mi?” sorgusuna izin vermiyor.
Ancak iki alternatif yol var:

1. **Search Console API** ile URL Inspection endpoint’ini kullan.
2. Ya da hızlıca `site:senindomain.com/yazi-url` şeklinde Google’da arama yap.

Eğer birkaç dakika sonra sonuçlar görünüyorsa — API görevini başarıyla yapmıştır. 🚀 Bazen gecikebilir lütfen tekrar tekrar gönderip sitenizi spama düşürmeyin. Google api üzerinde sert önlemler almıştır. Sabırlı olunuz.

---

## 🔧 Pelican kullanıcıları için: Google Indexing Tool

Eğer siteni **Pelican** ile oluşturuyorsan, bu işlemleri manuel yapmak zorunda değilsin.
Benim geliştirdiğim **[Google Indexing Tool](https://github.com/yuceltoluyag/google-indexing-tool)** sayesinde, yeni veya güncellenmiş yazılarını otomatik olarak **Google’a bildirebilirsin.**

Bu araç, Pelican blog sisteminden makale bağlantılarını alır ve doğrudan Google Indexing API’ye gönderir.
Yani her içerik güncellendiğinde “tek tıkla” dizine ekleme işlemi yapılabilir. 🚀

---

### 🧩 Kurulum

1. Depoyu klonla:

```bash
   git clone https://github.com/yuceltoluyag/google-indexing-tool.git
   cd google-indexing-tool
```

2. Sanal ortam oluştur:

```bash
   python -m venv .venv
   source .venv/bin/activate
```

3. Gerekli bağımlılıkları yükle:

```bash
   pip install -r requirements.txt
```

4. `config.ini` dosyasını düzenle:

```ini
   [DEFAULT]
   SERVICE_ACCOUNT_FILE = service-account.json
   CSV_FILE = article_links.csv
   LOG_FILE = indexing.log

   [PELICAN]
   ARTICLES_PATH = ../content
   SITE_URL = https://yuceltoluyag.github.io
```

---

### ⚙️ Kullanım

Pelican kullanıcıları için özel olarak hazırlanmış `export_article_links.py` dosyası, içerik klasöründeki yazı bağlantılarını otomatik çıkarır:

```bash
python export_article_links.py
```

Bu işlem sonucunda `article_links.csv` dosyası oluşur.
Ardından şu komutla tüm linkleri Google’a bildirebilirsin:

```bash
python google_indexing_api_tool.py PUBLISH
```

Bir sayfayı kaldırdıysan:

```bash
python google_indexing_api_tool.py DELETED
```

İşlemler konsolda ve `indexing.log` dosyasında kayıt altına alınır.

---

### ⏳ Limitler ve öneriler

Google Indexing API’nin günlük limiti **200 URL**’dir.
Bu yüzden aracı **günlük cron job** olarak ayarlayıp sadece yeni yazıları göndermek idealdir.

---

### 📎 Uyumlu sistemler

Bu araç sadece Pelican değil, **Hugo**, **Jekyll** veya benzeri statik site üreticileriyle de kullanılabilir.
Tek yapman gereken kendi `article_links.csv` dosyanı oluşturmak.

---

## 📋 Özet

- Google Indexing API, yeni içerikleri hızlıca dizine aldırmanın en etkili yoludur.
- Service account ile kimlik doğrulaması yapılır.
- Python veya başka bir dil üzerinden API çağrıları yapılabilir.
- Pelican kullanıcıları için bu süreç otomatikleştirilebilir.
- Search Console’da yetkilendirme yapılmazsa API çalışmaz.

---

## 🎯 Sonuç

Artık sen de yeni yazılarını **dakikalar içinde Google’a bildirip** SEO sürecini hızlandırabilirsin.
Bu yöntemi bir **otomatik cron scripti**yle birleştirerek blog güncellemelerini anında duyurabilirsin.

---

**Bunu Biliyor musunuz ?** [Git sparse-checkout rehberi](/github-sadece-bir-klasor-indirme/)

- [Bing IndexNow kullanımı rehberi](/otomatik-bing-indexnow-kullanimi)

---



