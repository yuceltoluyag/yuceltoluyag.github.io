Title: Jekyll ile Google Analytics Sayfa Görüntüleme Sayısı Takibi
Date: 2022-01-30 09:00 10:00
Modified: 2025-03-08 12:00
Category: kutuphane
Tags: superproxy, jekyll, google analytics
Slug: jekyll-google-analytics-sayfa-goruntuleme
Authors: yuceltoluyag
Summary: Jekyll sitenizde Google Analytics ile sayfa görüntüleme sayısını nasıl takip edebileceğinizi anlatan bir rehber.
Translation: false
Status: published
Template: article
Image: images/superproxy.webp

**Merhaba!** 🌟

Statik web sitelerinizde sayfa görüntülenmesini nasıl gösterebileceğinizi araştırırken, **Google Analytics** üzerinden **Super Proxy** kütüphanesini kullanarak verileri dışarıya açabileceğimizi öğrendim. Konuyla ilgili, Google ekibinin eski bir videosunu buldum: [Google Analytics Super Proxy](https://developers.google.com/analytics/solutions/google-analytics-super-proxy){: target="_blank" rel="noopener noreferrer"}. Bu video üzerinden ilerleyerek çözümümü buldum. 🥰

# Malzemeler 🥗

- Google Analytics Hesabı
- Google Console Hesabı

# İlk Adım

Google Analytics hesabınızı açtıktan sonra, sitenizi eklerken şu ayarı yapmayı unutmayın: "Create a Universal Analytics property" kısmını açıp, resimdeki gibi işaretleyin.

![GA-superproxy-kurulumu](/images/superproxy.webp)

# Google App Engine Kurulumu

1. [Appengine](https://console.cloud.google.com/appengine){: target="_blank" rel="noopener noreferrer"} sitesine gidin.
2. "Proje Oluştur" seçeneğine tıklayın.
3. Projenize bir isim verin ve devam edin.
4. Dil olarak Python, ortam olarak ise "standart"ı seçin.
5. Faturalandırma hesabınızı etkinleştirin. Kredi kartınızı bağlamanız gerekecek, ancak ücretsiz kotayı aşmadığınız sürece ücretlendirilmezsiniz. Basit bir blog için bu kota fazlasıyla yeterlidir.
6. Sol menüden **API ve Hizmetler** kısmını seçin ve ardından **API'leri ve Hizmetleri Etkinleştir**i tıklayın.

![GA-superproxy-kurulumu](/images/superproxy2.webp)

- `Google Analytics API`'yi seçin ve API'yi aktif edin.
- `APIs & Services` menüsünde, `OAuth consent Screen`e tıklayın ve gelen pencerede **Harici (External)** seçeneğini işaretleyerek devam edin.

![GA-superproxy-kurulumu](/images/superproxy3.webp)



<div class="info-box note">
Projenizi oluştururken logo eklemeyin, aksi takdirde onay sürecine girersiniz. Zaten logoluk bir durum yok :)</div>

- Projeyi **yayınlayın**.

* `Credentials` kısmından `OAuth 2.0 Client IDs` kısmını aktif edin.

![GA-superproxy-kurulumu](/images/superproxy4.webp)

- `Client ID` ve `Client Secret` adında oluşan kodları not edin.
- `Client ID` üzerine tekrar tıklayın ve şu alanları doldurun:
  - `Authorized JavaScript origins` kısmına projenizi oluşturduktan sonra verilen URL'yi girin.
  - `Authorized redirect URIs` kısmına ise sadece **`/admin/auth`** uzantısını dahil edin.

![GA-superproxy-kurulumu](/images/superproxy5.webp)

## Cloud SDK

1. İlk olarak [Google Cloud CLI](https://cloud.google.com/sdk/docs/quickstart){: target="_blank" rel="noopener noreferrer"} adresine gidin ve işletim sisteminize uygun yazılımı indirin.
2. Daha sonra terminali açın ve şu komutu girin:

```bash
gcloud init
```

Tarayıcınız açılacak, onaylama işlemini yaptıktan sonra başarıyla giriş yapmış olacaksınız. Ardından şu komutu çalıştırarak proje bilgilerinizi kontrol edebilirsiniz:

```bash
gcloud info
```

Seçtiğiniz proje bilgileri burada görüntülenmelidir.

3. Şimdi [google-analytics-super-proxy](https://github.com/googleanalytics/google-analytics-super-proxy){: target="_blank" rel="noopener noreferrer"} reposuna gidin ve dosyaları indirin.
4. **`src/app.yaml`** dosyasını editörle açın ve ilk başta bulunan şu iki satırı silin:

```yaml
application: your-application-id
version: 1
```

Dosyayı kaydedin.

5. **`src/config.py`** dosyasını açın. `OAUTH_CLIENT_ID` ve `OAUTH_CLIENT_SECRET` kısımlarını yukarıda oluşturduğunuz Client ID ve Secret ile doldurun.

![GA-superproxy-kurulumu](/images/superproxy6.webp)

6. `XSRF_KEY` kısmına rastgele güçlü bir şifre yazın.
7. **src** klasöründe terminali açın ve şu komutu çalıştırın:

```bash
gcloud app deploy
```

İşlem tamamlandıktan sonra şu komutla logları takip edebilirsiniz:

```bash
gcloud app logs tail -s default
```

Projenizi tarayıcınızda açmak için:

```bash
gcloud app browse
```

Açılan linkin sonuna `/admin` ekleyin ve bağlı olduğunuz Analytics hesabınıza giriş yapın. Her şey yolunda gitmişse, şu ekranla karşılaşmalısınız:

![GA-superproxy-kurulumu](/images/superproxy7.webp)

## Google Analytics Sorgusu

1. `Create Query` butonuna tıklayın ve orada bekleyin.
2. [UA Query Explorer](https://ga-dev-tools.web.app/query-explorer/){: target="_blank" rel="noopener noreferrer"}'ı açın. Reklam engelleyici eklentileri kullanıyorsanız, bu sitede çalışırken kapatmayı unutmayın.
3. **Start Date** => En eski yazınızın tarihini girin.
4. **End Date** => "Today" seçeneğini seçin.
5. **Metrics** => "Pageviews" seçin.
6. **Dimensions** => "PagePath" seçin.
7. **Filters** => `ga:pagePath=~^.\*/$;ga:pagePath!@=` olarak doldurun.

![GA-superproxy-kurulumu](/images/superproxy8.webp)

8. `Run Query` butonuna tıklayın ve oluşan URL'yi not alın.
9. `Create Query` kısmını aşağıdaki gibi doldurun.

![GA-superproxy-kurulumu](/images/superproxy9.webp)

10. Ardından proje kısmından `Manage` seçeneğine tıklayın, `Enable Endpoint` ve `Start Scheduling` butonlarına basın. İşlem tamam! 🎉

11. Son olarak, tüm bu süreç bittikten sonra görünüm şu şekilde olmalıdır:

![GA-superproxy-kurulumu](/images/superproxy10.webp)

12. `_config.yml` dosyanızı açın ve şu kodları ekleyin:

```yaml
google_analytics:
  id: 'G-V6XXXXXXX'   # Google Analytics Kimliğinizi girin
  pv:
    proxy_endpoint: 'https://PROJE_IDNIZ.appspot.com/query?id=<SUPER PROXY IDNIZ>'
    cache_path:       # Bölgesel olduğu için boş bırakabilirsiniz.
```

## Filtreleme

[Core Reporting API Filters](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters){: target="_blank" rel="noopener noreferrer"} sayfasından filtreleme değişkenlerini inceleyebilirsiniz.

## Örnek Dosyalar

- [\_Config.yml Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_config.yml#L37){: target="_blank" rel="noopener noreferrer"}
- [Script.html Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_includes/script.html#L35){: target="_blank" rel="noopener noreferrer"}
- [Post.html Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_layouts/post.html#L46){: target="_blank" rel="noopener noreferrer"}

# Sonuç

Bu çözümü blogumda kullanıyorum. **Google Console** servisi, **Amazon** gibi ücretsiz deyip de ay sonunda kartınızdan para çekmeye **çalışmıyor**, **yedi aydır** sorunsuz kullanıyorum. Yine de, tedbir amaçlı ödeme alarmı kurabilirsiniz. Ödemeler kısmından alarmlara tıklayıp **1 TL**'yi aşınca beni uyar diye ayarlayabilirsiniz. 😉

![GA-superproxy-kurulumu](/images/superproxy11.webp)
