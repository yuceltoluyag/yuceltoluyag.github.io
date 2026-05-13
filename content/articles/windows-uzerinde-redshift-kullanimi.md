Title: Windows Üzerinde Redshift Kullanımı
Date: 2019-12-04 12:00 10:00
Modified: 2025-08-11 22:59
Category: Windows
Tags: windows10, redshift, gece_modu
Slug: windows-uzerinde-redshift-kullanimi
Authors: yuceltoluyag
Summary: Windows işletim sisteminde Redshift programını nasıl kullanacağınızı adım adım anlatıyoruz. Göz sağlığınızı korumak için en iyi ayarları keşfedin! 👀
Lang: tr
Translation: false
Status: published
Template: article
Image: images/redshift_windows-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984403055247067
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvren7oujs2e

## 🌙 Redshift Nedir?

Redshift, özellikle gece saatlerinde bilgisayar kullananlar için harika bir araçtır. Program, gün doğumu ve gün batımına göre ekranınızın renk sıcaklığını ve gamma ayarlarını otomatik olarak değiştirir. Böylece göz yorgunluğunu azaltır ve daha konforlu bir deneyim sunar. 😌

## 🚀 Alternatif Programlar

Redshift kullanmadan önce birkaç alternatif program denedim:

- **Windows Gece Işığı (Night Mode)**: Windows'un yerleşik özelliği olsa da esneklik açısından yetersiz.
- **Flux**: İlk sürümleri başarılıydı, ancak zamanla bazı eksiklikler ortaya çıktı.
- **Redshift**: Linux'ta uzun süredir sorunsuz kullandığım için Windows'ta da denemeye karar verdim. Açık kaynaklı ve çapraz platform desteği sayesinde Windows'ta da çalıştırmak mümkün. 💡

## 🔧 Redshift Nasıl Kurulur?

1. [Redshift'in en son sürümünü](https://github.com/jonls/redshift/releases){: target="\_blank" rel="noopener noreferrer"} indirin.
2. **C:\Program Files (x86)** içine **Redshift** adında bir klasör oluşturun.
3. İndirdiğiniz dosyaları bu klasörün içine çıkarın.
4. Gamma sınırlarını kaldırmak için gerekli kayıt defteri (reg) dosyalarına ihtiyacınız var. [Buradan](http://www.mediafire.com/file/ylw89legwkyp04t/redshift.7z/file){: target="\_blank" rel="noopener noreferrer"} indirebilirsiniz.

📂 **Klasör düzeni şu şekilde olmalı:**

```powershell
C:\Program Files (x86)\Redshift
 ├── redshift.exe
 ├── redshift.conf
 ├── diğer dosyalar...
```

## ⚙️ Redshift Ayarları

Redshift'i başlatmadan önce bazı yapılandırmalar yapmanız gerekiyor:

1. **Windows + R** tuşlarına basarak çalıştır penceresini açın.
2. \*\*%USERPROFILE%\AppData\Local\*\* dizinine gidin.
3. **redshift.conf** adında yeni bir dosya oluşturun.
4. [LatLong.net](https://www.latlong.net/){: target="\_blank" rel="noopener noreferrer"} sitesine giderek bulunduğunuz konumun enlem (latitude) ve boylam (longitude) bilgilerini alın.
5. **redshift.conf** dosyanızı aşağıdaki gibi düzenleyin:

```conf
[redshift]
; Gün ve gece ekran sıcaklıklarını belirleyin
temp-day=6500
temp-night=5500
transition=1
brightness-day=1
brightness-night=0.7
gamma-day=0.8:0.7:0.8
gamma-night=0.8
location-provider=manual
adjustment-method=wingdi

[manual]
lat=xx
lon=yy
```

📌 **Not:** `lat=xx` ve `lon=yy` kısımlarına kendi konum bilgilerinizi eklemeyi unutmayın!

## ▶️ Redshift'i Başlatma

1. **Redshift.exe** dosyasını çalıştırın.
2. Ekran renk sıcaklığının yavaşça değiştiğini gözlemleyin.
3. Eğer herhangi bir hata alırsanız, **redshift.conf** dosyanızın doğru yapılandırıldığını kontrol edin.

---

Redshift, ekranınızı göz dostu hale getirerek gece çalışmalarınızı daha konforlu hale getirecektir. 🌟 Özellikle programcılar, yazarlar ve uzun süre bilgisayar başında vakit geçiren herkes için oldukça faydalıdır. 🖥️💙

Sorularınızı veya deneyimlerinizi yorumlarda paylaşabilirsiniz! 🎤

[responsive_img src="/images/redshift_windows-xl.webp" alt="Redshift Windows" /]



