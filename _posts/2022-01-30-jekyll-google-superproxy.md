---
layout: post
title: Jekyll Google Analytics ile Sayfa Görüntüleme Sayısı
description: Jekyll Pageviews with Google Analytics
image: "/assets/images/superproxy.webp"
category: kutuphane
tags: [superproxy, jekyll]
comments: false
edit_url: true
toc: true
---

**Merhaba**

Statik websitelerinde sayfa görüntülenmesi nasıl gösterebilirim diye araştırken,**Google Analytics** üzerinden **Super Proxy** kütüphanesi kullanılarak verileri dışarıya açabildiğimizi öğrendim. Konu ile alakalı Google ekibinin çok eski bir videosu var [Google Analytics superProxy](https://developers.google.com/analytics/solutions/google-analytics-super-proxy){:target="\_blank"}{:rel="noopener noreferrer"}. O video üzerinden yola çıkarak mutlu sona ulaştım. 🥰

# Malzemeler 🥗

- Google Analytics Hesabı
- Google Console Hesabı

# İlk Yapılacak

GA hesabınızı açtıkten sonra sitenizi eklerken şu ayarı yapmayı unutmayın. Create a Universal Analytics property Kısmını açıp resimdeki gibi işaretleyeceksiniz.

![GA-superproxy-kurulumu](/assets/images/superproxy.webp)

# Google App Engine

- [Appengine](https://console.cloud.google.com/appengine){:target="\_blank"}{:rel="noopener noreferrer"} Siteye gidin.

* Proje Oluştur'a tıklayın
* Projenize bir isim verin ve devam edin.
* Dil olarak Python, ortam olarak standartı seçin.
* Faturalandırma hesabını etkinleştirin. Evet, kredi kartınızı bağlamanız gerekiyor. Ancak ücretsiz kotanızı aşmadığınız sürece faturalandırılmazsınız. Basit bir blog için ücretsiz kota fazlasıyla yeterli.
* Sol Menüden **API ve Hizmetler**'i seçin ardından **API'leri ve Hizmetleri Etkinleştir**i tıklayın

![GA-superproxy-kurulumu](/assets/images/superproxy2.webp)

- `Google Analytics API` seçin ve api yi aktif edin.
- `APIs & Services` menüsü altında ki `OAuth consent Screen` e tıklayın, gelen `Configure Consent Screen` kısmını kabul edip devam edin. Önüze gelen menüde **Harici(External)** yi seçip devam edin.

![GA-superproxy-kurulumu](/assets/images/superproxy3.webp)

{% include info.html content="Projenizi oluştururken logo eklemeyin,onay sürecine girersiniz. Zaten logoluk bir durumda yok :)" title="DipBot" icon="tip" fai="icon-diamonds" %}

- Projeyi **yayınlayın**.

* `Credentials` kısmından `OAuth 2.0 Client IDs` aktif edin.

![GA-superproxy-kurulumu](/assets/images/superproxy4.webp)

- `Client ID` ve `Client Secret` adında oluşan kodları not edin.

* Oluşan clientid isminizin üzerine tekrar tıklayın şu alanları doldurun. `Authorized JavaScript origins` kısmına projenizi oluşturduktan sonra verilen urlyi girin. `Authorized redirect URIs`
  kısmına ise sadece **`/admin/auth`** uzantısını dahil edin.

![GA-superproxy-kurulumu](/assets/images/superproxy5.webp)

## Cloud SDK

- İlk Önce [Google Cloud CLI](https://cloud.google.com/sdk/docs/quickstart){:target="\_blank"}{:rel="noopener noreferrer"} adresine gidip **işletim sisteminize** uygun yazılımı indiyorsunuz.

* Daha sonra **terminalizi** açıp şu komutu giriyorsunuz.

```bash
gcloud init
```

Tarayıcınız açılıyor,onaylama işlemini yaptıktan sonra başarıyla giriş yapmış oluyorsunuz. Daha sonra şu komutu çalıştırabilirsiniz.

```bash
gcloud info
```

Seçtiğiniz **proje** bilgileriniz burada **görüntülenmelidir**.

- Daha sonra [google-analytics-super-proxy](https://github.com/googleanalytics/google-analytics-super-proxy){:target="\_blank"}{:rel="noopener noreferrer"} reposuna gidip,dosyaları indirin.
- **`src/app.yaml`** dosyasını editörünüzle açın. İlk başta bulunan şu iki satırı silin.

```yaml
application: your-application-id
version: 1
```

Daha sonra dosyayı **kaydedin**.

- **`src/config.py`** dosyasını açın. `OAUTH_CLIENT_ID` `OAUTH_CLIENT_SECRET` kısımlarını doldurun(Yukarıda oluşturmuştuk,hani not alın dediğim .) Şöyle görünmelidir.

![GA-superproxy-kurulumu](/assets/images/superproxy6.webp)

- `XSRF_KEY` kısmına şöyle çorbamı çorba karışıkmı karışık bir şifre yazın.

* **src** klasörünün içindeyken terminali açın ve şu kodu yazın

```bash
gcloud app deploy
```

İşlem tamamlandıktan sonra şu komutla log ları takip edebilirsiniz

```bash
gcloud app logs tail -s default
```

Projenizi tarayıcınızda açmak içinse

```bash
gcloud app browse
```

Açılan linkin sonuna `/admin` ekleyin. Daha sonra bağlı olduğunuz Analistik hesabına giriş yapın.Herşey yolunda gittiyse şöyle bir ekranla karşılaşırsınız;

![GA-superproxy-kurulumu](/assets/images/superproxy7.webp)

## Google Analytics Sorgusu

- `Create Query` e basın. Orada bekleyin :)

* [UA Query Explorer](https://ga-dev-tools.web.app/query-explorer/){:target="\_blank"}{:rel="noopener noreferrer"} i açın. Reklam engelleyici eklentileri kullanıyorsanız,bu sitede çalışırken kapatın,aksi takdirde hata alırsınız.

* **Start Date** => En eski yazınızın tarihini giriniz.
* **End Date** => Today seçin.
* **Metrics** => Pageviews i seçin
* **Dimensions** => PagePath ı seçin
* **Filters** => `ga:pagePath=~^.\*/$;ga:pagePath!@=` böyle doldurun

![GA-superproxy-kurulumu](/assets/images/superproxy8.webp)

- `Run Query` tıklayın oluşan urlyi not alın.
- Daha sonra `Creta Query` kısmını şöyle doldurun

![GA-superproxy-kurulumu](/assets/images/superproxy9.webp)

- Daha sonra oluşturduğunuz proje kısmından manage basın `Enable Endpoint` ve `Start Scheduling` basın,işlem tamam :)
- Tüm bu süreç bittikten sonra görünüm şöyle olmalıdır

![GA-superproxy-kurulumu](/assets/images/superproxy10.webp)

- \_config.yml dosyanızı açın ve şunları ekleyin.

```config
google_analytics:
  id: 'G-V6XXXXXXX'   # Google Analytics Kimliğinizi girin
  pv:
    proxy_endpoint: 'https://PROJE_IDNIZ.appspot.com/query?id=<SUPER PROXY IDNIZ>'
    cache_path:       # Bölgesel olduğu için boş bırakabilirsiniz.
```

## Filtereleme

[Core Reporting API Filters](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters){:target="\_blank"}{:rel="noopener noreferrer"} Buradan filtreme değişkenlerine bakabilirsiniz.

## Örnek Dosyalar

- [\_Config.yml Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_config.yml#L37){:target="\_blank"}{:rel="noopener noreferrer"}
- [Script.html Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_includes/script.html#L35){:target="\_blank"}{:rel="noopener noreferrer"}

* [Post.html Dosyam](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/main/_layouts/post.html#L46){:target="\_blank"}{:rel="noopener noreferrer"}

# Sonuç

Blogumda kullanıyorum. **Google Console** servisi,**Amazon** gibi ücretsiz deyipte ay sonunda kartınızdan para çekmeye **çalışmıyor**,**Yedi ay**dır kullanıyorum,herhangi bir sorun **yaşamadım**. Yinede ne olur ne olmaz diyorsanız, ödeme alarmı kurabilirsiniz. Ödemeler kısmından alarmlara tıklayın **1 TL** yi aşınca beni uyar diyin :)

![GA-superproxy-kurulumu](/assets/images/superproxy11.webp)
