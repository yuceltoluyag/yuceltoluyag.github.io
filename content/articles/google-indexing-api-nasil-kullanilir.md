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

Yeni bir blog yazısı yazdın, heyecanla yayına aldın ama Google günlerdir sitene uğramıyor mu? 😤 İşte tam bu noktada Google Indexing API imdada yetişiyor. Bu API, içerik güncellemelerini, yeni sayfaları veya silinen linkleri Google botlarına anında fısıldamanı sağlar. 

Düşün ki fırından taze simit çıkmış ama kokusu henüz sokağa yayılmamış. Google botlarının kendi kendine gelip siteni keşfetmesini beklemek, sabah ayazında okul formasıyla Space Cadet Pinball oynamak kadar sabır gerektirir. İşte Indexing API, o sıcak simitin kokusunu sokağa (yani Google dizinine) saniyeler içinde yayan gizli güçtür.

!!! note "Not: API Sınırları ve Resmi Destek"
    Google bu API'yi resmi olarak sadece `JobPosting` (İş İlanı) ve `BroadcastEvent` (Canlı Yayın) yapısal veri türleri için desteklediğini iddia ediyor. Fakat aramızda kalsın; blog sitelerinde, haber portallarında da tıkır tıkır çalışıyor ve sayfaları ışık hızında dizine ekletiyor.

✍️ Kişisel Deneyimim

Geçmişte blog sistemimi kaç kez değiştirdiğimi ben bile unuttum. Bazen Jekyll kullandım, bazen Pelican'a geçtim, bir ara WordPress'e bile bulaştım. Her sistem ve domain değişikliğinde link yapılarım çorba oldu. Sonuç? 😩 Bir zamanlar Google'da ilk sayfada yer alan canım makalelerim, sanki internette hiç var olmamış gibi silindi gitti. Emeğimin boşa gitmesinden deli gibi korktum. İşte bu paronaya ve hayal kırıklığıyla yaptığım araştırmalar beni Google Indexing API ile tanıştırdı. AI teknolojilerinin her şeyi ele geçirdiği, insanların blog okuma alışkanlıklarının azaldığı bu dönemde bile, "az ama öz" kitleye ulaşmak benim için paha biçilemez. Bu yüzden bu sistem benim can simidim oldu.

---

## 🧩 Gerekli hazırlıklar

Google Indexing API'yi kullanmaya başlamadan önce, Google'ın kapısını çalabilmek için bazı anahtarları cebimize koymamız gerekiyor.

### 1. Google Cloud Projesi Oluştur

İlk iş olarak bir Google Cloud projesine ihtiyacımız var:
- [Google Cloud Console](https://console.cloud.google.com/){: target="\_blank" rel="noopener noreferrer"} adresine git, yeni bir proje oluştur.
- Sol menüden ya da arama çubuğundan "**Web Search Indexing API**" servisini bul ve projende etkinleştir.

[responsive_img src="/images/google-indexing-api-nasil-kullanilir-xl.webp" alt="Google Indexing API Python ile nasıl kullanılır rehberi" /]

### 2. Service Account (Hizmet Hesabı) Tanımla

API'yi kodumuzla çağırabilmek için sanal bir kimlik oluşturmalıyız:
- Cloud Console > "APIs & Services" > "Credentials" (Kimlik Bilgileri) menüsüne gir.
- "Create credentials" > "Service account" seçeneğine tıkla.

[responsive_img src="/images/google-indexing-api-service-account-xl.webp" alt="Google Indexing API Credentials oluşturma" /]

- Hesaba aklında kalacak, düzgün bir isim ver ve "Create and continue" de. Sonraki adımları direkt boş geçerek tamamlayabilirsin.
- Bu işlem bittiğinde ekranında `indexer@proje-id.iam.gserviceaccount.com` formatında bir e-posta adresi göreceksiniz. Bu e-postayı bir kenara kopyala, Search Console yetkilendirmesinde lazım olacak.

[responsive_img src="/images/google-indexing-api-add-key-xl.webp" alt="Google Indexing API Key oluşturma" /]

- Oluşturduğun hizmet hesabının detayına gir, "Keys" (Anahtarlar) sekmesinden "Add Key" > "Create new key" seçeneğine tıkla.
- Format olarak **JSON** seçip bilgisayarına indir. İnen bu dosyaya `service-account.json` adını ver. Bu dosya senin gizli anahtarındır, kimseyle paylaşma.

### 3. Google Search Console Yetkisi Ver

Google'ın "Dur bakalım, başkasının sitesini dizine ekletmeye çalışmıyorsun ya?" dememesi için hizmet hesabını yetkilendirmeliyiz:
- Google [Search Console](https://search.google.com/search-console/users){: target="\_blank" rel="noopener noreferrer"} ekranına git.
- Ayarlar > Kullanıcılar ve İzinler > Kullanıcı Ekle yolunu izle.
- E-posta kısmına az önce kopyaladığın hizmet hesabı e-postasını yaz ve yetkiyi kesinlikle **Sahibi (Owner)** olarak seç. Yetkiyi eksik verirsen kod hata verir, benden söylemesi.

!!! warning "Dikkat! Arama Konsolu API Yetkisi"
    Sadece Indexing API'yi açmak yetmez! Geliştirdiğimiz akıllı aracın URL durumlarını denetleyebilmesi için [Google Search Console API](https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview){: target="\_blank" rel="noopener noreferrer"} servisini de aynı Cloud projesinde etkinleştirmen gerekir.

---

## 💻 Python ile Google Indexing API Kullanımı

Eğer her şeyi sıfırdan ve ham kodla denemek istersen, aşağıdaki basit Python betiği bir CSV dosyasındaki linkleri sırayla okuyup Google'a bildirir.

```python
from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
import csv

SERVICE_ACCOUNT_FILE = 'service-account.json'
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

!!! tip "İpucu ⚡ Hızlı çözümler veya kısa yollar için."
    Kod içerisindeki `URL_UPDATED` parametresi sayfanın eklendiğini veya güncellendiğini belirtir. Eğer sitenden uçurduğun bir içeriği Google dizininden de silmek istersen `URL_DELETED` parametresini göndermen gerekir.

---

## 🔧 Çoklu Projeler İçin Modern Çözüm: Google & Bing Indexing Tool

Yukarıdaki gibi ham kodlarla uğraşmak, her gün elle betik çalıştırmak tam bir makarna-yoğurt öğrenci yemeği çözümü olurdu. Profesyonel çalışıyorsak, işi daha temiz halletmeliyiz.

Kendi projelerimde yaşadığım dizin sorunlarını tek elden çözmek için geliştirdiğim açık kaynaklı [Google Indexing Tool](https://github.com/yuceltoluyag/google-indexing-tool){: target="\_blank" rel="noopener noreferrer"} projesi, tüm bu süreci otomatik ve akıllı hale getiriyor. Üstelik sadece Google ile sınırlı kalmayıp Bing IndexNow entegrasyonu da sunuyor.

En tatlı tarafı ne biliyor musun? Bu aracı sistemine **global** olarak kurup, bilgisayarındaki tüm farklı blog projelerinde tek bir komutla çalıştırabiliyorsun.

### 📦 Global Kurulum ve Hazırlık

Terminale geçip şu komutla aracı doğrudan GitHub üzerinden sistemine kurabilirsin:

```bash
pip install git+https://github.com/yuceltoluyag/google-indexing-tool.git
```

Bu komut sistemine `google-indexer` adında global bir CLI komutu tanımlar. Artık hangi blog klasöründe olursan ol, bu komutla dizin yönetimini yapabilirsin.

Blog projenin ana dizininde bir adet `config.ini` dosyası oluştur ve içeriğini sitene göre doldur:

```ini
[PELICAN]
ARTICLES_PATH = content/articles
SITE_URL = https://yuceltoluyag.github.io/

[DEFAULT]
CSV_FILE = article_links.csv
SERVICE_ACCOUNT_FILE = service-account.json
LOG_FILE = indexing.log

[API]
URL = https://indexing.googleapis.com/v3/urlNotifications:publish
REQUEST_DELAY_SECONDS = 10
COOLDOWN_DAYS = 3

[BING]
API_KEY = senin_bing_indexnow_api_anahtarin
KEY_LOCATION = https://yuceltoluyag.github.io/senin_bing_indexnow_api_anahtarin.txt
```

!!! note "Not: Cooldown ve İstek Gecikmeleri"
    `COOLDOWN_DAYS = 3` ayarı sayesinde, Google'ın henüz dizine eklemediği ama bizim bildirim gönderdiğimiz sayfalar 3 gün boyunca korumaya alınır. Bu sayede her gün boş yere aynı linki gönderip Google'dan spam damgası yemeyiz. `REQUEST_DELAY_SECONDS = 10` ise API istekleri arasına es vererek hız limitlerine takılmanı önler.

---

### ⚙️ Adım Adım Akıllı Çalışma Düzeni

Her şey hazırsa, terminalde projenin dizinine geçip şu komutları sırasıyla koşturmaya başla:

#### Adım 1: Pelican Yazılarını Veritabanına Aktar

Blogundaki tüm güncel makaleleri tarayıp takip listesine (`article_links.csv`) ekler:
```bash
google-indexer export
```

#### Adım 2: Bing IndexNow ile Toplu Gönderim Yap

Bing, tek tek uğraşmak yerine tüm yeni linkleri tek bir paket halinde kabul eder. Bu yüzden oldukça pratiktir:
```bash
# Önce simülasyon yapıp ne gideceğine bak:
google-indexer bing --dry-run

# Canlı olarak Bing'e gönder:
google-indexer bing
```

#### Adım 3: Akıllı Google Denetimi ve Gönderimi (Smart Mod)

Bakın burası can yakar, en hayati adımdır. Bu komut, takip listesindeki henüz doğrulanmamış URL'lerin durumunu Google Arama Konsolu API'si[^1] üzerinden tek tek denetler. Eğer sayfa zaten dizine eklenmişse durumunu `PASS` yapar. Hâlâ eklenmemişse ve cooldown süresi geçmişse Google Indexing API'ye gönderip 3 günlük bekleme sayacını başlatır.

```bash
# Zararsız bir deneme turu atalım:
google-indexer smart --dry-run --limit 10

# Canlı denetim ve gönderimi başlat:
google-indexer smart --limit 50
```

Eğer sadece belirli bir URL'nin durumunu merak ediyorsan, API limitlerini harcamadan direkt şu komutla sorgulama yapabilirsin:
```bash
google-indexer inspect --url https://yuceltoluyag.github.io/yazi-linki/
```

---

## ⏳ SEO Perspektifi ve Limit Politikaları

Arama motorlarının API'lerini kullanırken asgari ücretle geçinmeye çalışan bir işçinin bütçe planlaması kadar titiz olmalıyız. Sınırlar nettir:
- **Google Indexing API:** Günlük limit **200 URL** ile sınırlıdır. Bu yüzden smart komutunda limit parametresini 50 veya 100 bandında tutmak akıllıca bir plan olur.
- **Bing IndexNow API:** Tek seferde **10.000 URL**'ye kadar toplu gönderime izin verir.
- **Spam Koruması:** Durmadan aynı linkleri göndermek sitenin arama motorları gözündeki itibarını sıfırlar. Araçtaki cooldown mekanizmasını asla devre dışı bırakma.

---

## 📋 Neler Öğrendik?

- Google Indexing API ile yeni içeriklerimizi günlerce beklemeden anında botlara duyurabiliyoruz.
- Google Cloud üzerinden hizmet hesabı oluşturup Search Console'da "Sahibi" olarak yetkilendirmek işin temel şartıdır.
- Geliştirdiğimiz `google-indexer` aracı sayesinde tüm süreci yerel bir CSV veritabanı üzerinden akıllıca yönetip spama düşmeyi engelliyoruz.
- Bing IndexNow entegrasyonu ile tek komutta Bing dizinlerini de güncel tutabiliyoruz.

---

## 🎯 Son Söz

Lafın kısası, Google botlarının sitene uğramasını pasif şekilde beklemek yerine kontrolü eline alabilirsin. Bu sistemi sunucunda ya da bilgisayarında günlük bir görev zamanlayıcıya bağlayarak arkana yaslanabilirsin.

**Bunları da İncele:**
- [Git sparse-checkout rehberi](/github-sadece-bir-klasor-indirme/)
- [Bing IndexNow kullanımı rehberi](/otomatik-bing-indexnow-kullanimi)

---

[^1]: Google Search Console API, web sitenizin güncel dizin durumunu ve kapsama hatalarını doğrudan kod üzerinden sorgulamanızı sağlayan resmi API arayüzüdür.
