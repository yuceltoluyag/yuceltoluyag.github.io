Title: PNG Dosyalarıyla İmtihanım: Mogrify ve O Sinir Bozucu Chunk Hataları
Date: 2026-05-10 21:40
Category: Linux
Tags: imagemagick, mogrify, png, linux, terminal
Slug: png-mogrify-chunk-hatalari-cozumu
Authors: yuceltoluyag
Summary: Mogrify ile PNG işlerken karşınıza çıkan 'sBIT: bad length' hatalarının gerçek nedenini ve bu chunk belasından kurtulmanın en hızlı yolunu paylaşıyorum.
Image: /images/png-mogrify-chunk-hatalari-cozumu.webp
Lang: tr
Status: published

Dün gece yine o meşhur sabahlardan biriydi; uykusuzluktan gözler kan çanağı, kahve buz gibi... Sırf 500 tane ekran görüntüsünü hızlıca küçültüp siteye atmak için terminalin başına geçtim. "İki satır `mogrify` yazar, uyurum" diyordum. Ama terminal o kırmızı yazılarla bana bağırmaya başlayınca işin rengi değişti: `libpng warning: sBIT: bad length`. 

Özellikle Windows'un ekran alıntısı aracıyla alınan PNG'lerde bu chunk (veri bloğu) hatası tam bir baş belası. Eğer siz de benim gibi terminal üzerinden bir boks maçına çıkmış hissediyorsanız, gelin bu ImageMagick canavarını nasıl dizginleyeceğimize bakalım.

## 🛠️ Mogrify vs. Convert: "Üzerine Yazma" Kumarı

Önce şu temel meseleyi aradan çıkaralım: `convert` orijinal dosyanızı korur, `mogrify` ise gözünün yaşına bakmadan üzerine dalar. 

```bash
yuceltoluyag@archlinux:~/screenshots$ cp -r images/ images_yedek/ # ÖNCE YEDEK AL!
```

Eğer elinizde milyonlarca dosya yoksa, hızıyla bilinen ama hantal kalabilen ImageMagick yerine [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/) yazımda bahsettiğim gibi işlemciyi verimli kullanmak önemli. Ancak `mogrify` toplu işlemde hala kral. Ama yedeksiz çalışmak, terminalde intihar etmektir kardaş.

## 🧹 PNG Chunk Belasından Kurtulmak

PNG dosyaları sadece piksellerden oluşmuyor. İçinde NASA dökümanı gibi IHDR, IDAT ve bizim baş düşmanımız `sBIT` gibi chunk'lar var. Bu `sBIT` bloğu aslında renk derinliği bilgisi tutuyor ama bazen boyu (length) hatalı geliyor ve `libpng` bunu görünce hata fırlatıyor.

### 1. sBIT Hatasını Kökten Çözmek

Hataları susturmanın en temiz yolu, dosyayı işlerken o sorunlu bloğu dışarıda bırakmaktır:

```bash
yuceltoluyag@archlinux:~/screenshots$ mogrify -define png:exclude-chunks=sBIT *.png
```

Bu komutla "Senin sBIT zıkkımınla uğraşamam, at bunu çöpe" diyoruz. Kalite bozuluyor mu? Yo, ben bir nane fark etmedim. Dosya ferahlıyor, hatalar kesiliyor.

### 2. Tam Temizlik: -strip ve Ötesi

"Dosyamda metadata, tarih, kamera bilgisi istemiyorum, sadece görsel kalsın" diyorsanız:

```bash
yuceltoluyag@archlinux:~/screenshots$ mogrify -strip -quality 95 *.png
```

`-strip` komutu tüm EXIF ve ICC profil verilerini kazır atar. Ancak dikkat; renk profilleri gidince bazı ekranlarda renkler hafif soluk görünebilir. Eğer profesyonel fotoğrafçılık yapmıyorsanız (ki blog görselleri için yapmıyorsunuzdur) bu durum dosya boyutunu düşürmek için harika bir takas.

---

## 📐 Toplu Boyutlandırma ve o Kritik ">" İşareti

En büyük hatalardan biri `1200x1200` yazıp bırakmak. Eğer o sona `>` işaretini koymazsanız, ImageMagick zaten küçük olan görsellerinizi de zorla 1200 piksele büyütür ve karşınıza çamur gibi bir sonuç çıkar.

```bash
# Sadece 1200px'den büyük olanları küçült, küçükleri elleme!
yuceltoluyag@archlinux:~/screenshots$ mogrify -resize "1200x1200>" *.png
```

Bu işaret terminalin gizli kahramanıdır. GUI programlarında bu titizliği zor bulursunuz hacı.

---

## 🥊 ImageMagick vs. GraphicsMagick (GM)

Burada bir "geek" bilgisi bırakayım: 2002'de bir isyanla ImageMagick'ten ayrılan GraphicsMagick (gm) bazen daha stabil ve az RAM tüketen bir alternatif olabilir. Eğer binlerce dosyanız varsa şunu deneyin:

```bash
yuceltoluyag@archlinux:~/screenshots$ gm mogrify -strip -resize 800x800 *.png
```

Ama bizim gibi blogcular için ImageMagick hala tahtında oturuyor. Sadece `/etc/ImageMagick-7/policy.xml` dosyasındaki o kısıtlayıcı "Resource Limit" tokatlarına dikkat etmek lazım. `cache resources exhausted` hatası alıyorsanız, o dosyanın ciğerini söküp limitleri artırmanız gerekir.

## 🔍 Doğrulama: "Oldu mu?"

İşlemi bitirdikten sonra röntgen çekmek isterseniz `identify` komutu imdadımıza yetişiyor:

```bash
yuceltoluyag@archlinux:~/screenshots$ identify -verbose resim.png | grep -i "png\|chunk"
```

Eğer çıktı temizse, `Friday13` gibi bir terminal kurdu olarak işinizi bitirmişsiniz demektir. 

Unutmayın; terminal sabır işidir. Hata aldığınızda klavyeye kafa atmak yerine parametrelerinize bir daha bakın. [Arch Linux Disk Alanı Görünmuyor Çözümü](/arch-linux-disk-alani-gorunmuyor-cozum/) yazımda da dediğim gibi, bazen en büyük sorunlar en basit ayarlarda gizlidir.

Kalın sağlıcakla, ben artık uyumaya gidiyorum kardaş!

---

## 🔗 İlgili Yazılar
- [Arch Linux Disk Alanı Görünmuyor Çözümü](/arch-linux-disk-alani-gorunmuyor-cozum/)
- [Linux Güvenlik: ClamAV ile Tam Kapsamlı Rehber](/linux-guvenlik-clamav-tam-kapsamli-rehber/)
- [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)
- [Arch Linux'ta Nvidia Ekran Kartı Kurulumu](/arch-linux-nvidia-ekran-karti-kurulumu/)

[^1]: `mogrify` dosyaların üzerine yazar. Yedek almayan yolda kalır hacı. Ayrıca ImageMagick v7 ile komutların başına `magick` eklemeniz gerekebilir; sisteminizde `magick mogrify` şeklinde deneyin.
 uykuya ihtiyacım var, gözlerim kapanıyor kardaş. Hadi kalın sağlıcakla! [Arch Linux Disk Alanı Görünmuyor Çözümü](/arch-linux-disk-alani-gorunmuyor-cozum/) yazıma da bi' bakın bi' ara, o da dertlidir. Hadi eyvallah kardaş!


