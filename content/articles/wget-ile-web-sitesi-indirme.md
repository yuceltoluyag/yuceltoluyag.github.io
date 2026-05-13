Title: Wget ile Bir Web Sitesini Doğru Yöntemle İndirme
Date: 2025-11-14 11:59
Category: Linux
Tags: wget, komut satırı, linux, sorun giderme
Slug: wget-ile-web-sitesi-indirme
Authors: yuceltoluyag
Summary: Wget ile site indirmek bir sanattır. Yanlış komutla site çöplüğe döner. Kırık linkler olmadan, offline gezmek için doğru parametreleri gösteriyorum.
Image: images/wget-ile-web-sitesi-indirme-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115553477990222016
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6ps6v5lt22d

Linux'ta bir siteyi indirmek... aklıma direkt `wget` geliyor. Herkes tavsiye eder, biliyorsun. Ama o komut, yanlış parametrelerle kullanılınca indirdiğin şey resmen bir çöplüğe döner. Kırık linkler, boş resimler... geçenlerde başıma geldi, sinir oldum. 😤 İşte o yüzden buradayım, o sihirli kombinasyonu anlatmak için.

Amacımız basit: İndirdiğimiz siteyi bilgisayarda da sorunsuz gezebilelim, sunucuyu yormayalım ve dosyaları üst üste yazdırmayalım.

Genelde iki yol var. Biri "recursive traversal", yani siteyi dallanıp budaklanarak indirmek. Diğeri ise sitenin `sitemap.xml` dosyasındaki adresleri tek tek çekmek. İkisi de işe yarar, ama farklı durumlar için.

## O Meşhur "Dal Budak" İndirme İşlemi

Tabii ki `wget` kullanacağız. GNU Wget, Web'den dosyaları etkileşimsiz olarak indirmek için ücretsiz bir yardımcı programdır...

...Böyle demek çok resmi geliyor bana. Dur, şöyle düzelteyim: `wget`, Linux'un en eski, en sağlam askerlerinden biridir. Çoğu dağıtımda hazır zaten.

Peki, bu askeri doğru kullanalım?

### Sihirli Sözcükler ve Anlamları

Teknik makaleler gibi her parametreyi tek tek anlatmak istemiyorum. Aşırı sıkıcı olur. Bunun yerine, bu komutun hangi parçasının ne işe yaradığını, hani bir arabanın parçaları gibi düşünelim.

**Önce "Kibar Olma" Kısmı:**
Ben genellikle `--wait=2` ile başlarım. Neden mi? Bir keresinde hızlı indirmiştim de site sahibi beni banlamıştı. O günden sonra "ne kadar nazik olursan o kadar iyi" prensibiyle hareket ediyorum. Bu komut, wget'e her dosya indirmeden önce 2 saniye mola vermesini söylüyor. Hatta bazen 3 saniyeye çıkarıyorum, kendime gelme fırsatı buluyorum o sırada.

Aklıma geldi, acaba o site sahibi hala beni engelliyor mudur? Neyse, konuya döneyim.

Buna benzer bir şekilde `--limit-rate=20K` de var. Bu, indirme hızını saniyede 20 kilobaytle sınırlıyor. Yani wget'e "hırs yapma, yavaş ve istikrarlı ol" demiş oluyorsun. Yoksa hem sunucunun bandını tüketirsin hem de kendi internetin kitlenir. Bu komut, özellikle büyük siteler indirirken hayat kurtarıcı oluyor.

**Şimdi "İşi Doğru Yapma" Kısmı:**
`--recursive` komutu, işin sihrinin başladığı yer. Bu, sitenin bir dalından diğerine atlayarak tüm sayfaları indirmesini sağlıyor. Tavşan deliğine inmek gibi bir şey. 🐇 Varsayılan olarak 5 derine iniyor, eğer site daha derinse `--level=inf` diyerek sonsuza kadar indirebilirsin (ama dikkatli ol, çok uzun sürebilir\!). Emin değilim ama sanırım `--level=0` da sonsuz için geçerli olabilir, kontrol etmekte fayda var.

Peki ya sayfanın resimleri, CSS'leri? İşte `--page-requisites` burada devreye giriyor. Bu komut, sayfanın "gerekli olan her şeyini" - resim, css, javascript gibi - beraberinde getirmesini sağlıyor. Bunu yapmazsan, indirdiğin site sanki eşyasız, boş bir ev gibi olur, hiçbir şey düzgün görünmez. 👻

**Son Dokunuşlar:**
İndirme bittikten sonra linkler bozulursa? İşte `--convert-links` tam da bunun için. Bu komut, indirdiğin sitenin kendi bilgisayarında çalışmasını sağlıyor. Linkleri yerel dosyalara yönlendiriyor. Yoksa tıkladığın link boşuna açılır.

`--adjust-extension` de çok faydalı. Eğer indirilen sayfanın uzantısı `.html` değilse, wget onun sonuna `.html` ekliyor. Bu, yerel gezinme için çok önemli.

`--no-clobber` ise kopyaları engelliyor. Yani bir dosyayı indirdin, sonra tekrar çalıştırırsın, wget eskinin üzerine yazmaz, "bu var" deyip geçer. Bazen işe yarar.

!!! note "İpucu ⚡ Hemen şurada küçük bir not bırakayım: `-e robots=off` parametresi, sitenin `robots.txt` dosyasını umursamasını engeller. Yani "ben bir botum ama kurallarına uymayacağım" demiş olursun. Bunu dikkatli kullan, bazı siteler bunu sevmeyebilir."

### Peki, Bu Komutun Son Hali Nasıl Olmalı?

İşte tüm bu tecrübelerimden sonra bir araya getirdiğim o sihirli komut. Buna "süper indirme büyüsü" diyebiliriz:

```bash
wget --wait=2 \
     --level=inf \
     --limit-rate=20K \
     --recursive \
     --page-requisites \
     --user-agent=Mozilla \
     --no-parent \
     --convert-links \
     --adjust-extension \
     --no-clobber \
     -e robots=off \
     https://example.com
```

### Örnek Deneme

Hadi `https://example.com` sitesini indirelim ve `wget`'in ne kadar "gürültücü" olduğunu görelim.

```bash
$ wget --wait=2 --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber https://example.com
--2017-06-30 19:48:46--  https://example.com/
example.com (example.com) çözümleniyor... 93.184.216.34
example.com (example.com)[93.184.216.34]:443 bağlanılıyor... bağlandı.
HTTP isteği gönderildi, yanıt bekleniyor... 200 OK
Uzunluk: 1270 (1,2K) [text/html]
‘example.com/index.html’ olarak kaydediliyor.

example.com/index.html            100%[===========================================================>]   1,24K  --.-KB/s    in 0,003s

2017-06-30 19:48:46 (371 KB/s) - ‘example.com/index.html’ kaydedildi [1270/1270]

BİTTİ --2017-06-30 19:48:46--
Toplam harcanan süre: 0,6s
İndirilen: 1 dosya, 1,2K in 0,003s (371 KB/s)
example.com/index.html içindeki linkler dönüştürülüyor... yapılacak bir şey yok.
1 dosyadaki linkler 0 saniye içinde dönüştürüldü.
$ tree example.com/
example.com/
└── index.html

0 directories, 1 file
```

Bakın ne kadar detaylı rapor veriyor, her adımı söylüyor. Bu, hata ayıklamak için çok güzel.

!!! tip "Kısa Yol: Wget Mirror Şimdi diyeceksiniz ki "Ay bunları hepsini yazmak çok uzun, kısa yolu yok mu?". Var tabii `wget` zaten kullanışlı bir `--mirror` parametresiyle gelir. Bu parametre, `-r -l inf -N` kullanmakla aynı anlama gelir. Yani recursive, sonsuz derinlikte ve zaman damgalı indirme yapar."

## 2. Yöntem: Daha Zeki Olmak (Sitemap Kullanımı)

Başka bir yaklaşım ise sitenin recursive traversal yapmaktan kaçınmak ve sitenin `sitemap.xml` dosyasındaki tüm URL'leri indirmektir. Bu, özellikle sadece belirli sayfaları istediğinizde çok daha temiz bir yöntemdir.

### Sitemap'tan URL'leri Filtreleme

Bir sitemap dosyası genellikle şu şekildedir:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://yuceltoluyag.github.io/</loc>
<lastmod>2014-09-15T00:00:00-03:00</lastmod>
</url>
<url>
<loc>https://yuceltoluyag.github.io/en</loc>
<lastmod>2014-09-15T00:00:00-03:00</lastmod>
</url>
</urlset>
```

Burada `sitemap.xml` içindeki tüm URL'leri almalıyız. Bunun için `grep` kullanabiliriz: `grep "<loc>" sitemap.xml`.

### Loc Etiketlerini Kaldırma

Şimdi gereksiz etiketleri temizleyelim: `sed -e 's/<[^>]*>//g'`

### Hep Bir Arada

Önceki iki komuttan sonra elimizde bir URL listesi oldu ve bu liste, `wget -i` komutunun okuduğu parametredir.

```bash
wget -i $(grep "<loc>" sitemap.xml | sed -e 's/<[^>]*>//g')
```

Ve `wget` bunları sırayla indirmeye başlayacaktır. Bu yöntem, sadece ihtiyacımız olan sayfaları indirmek için çok daha verimli olabilir.[^1]

## İşin Özü...

Yani, işin özü, wget gerçekten bir hazine. Başka bir GUI aracı kullanmanıza gerek kalmayacak, komut satırında aklınıza gelebilecek her şeyi yapabilirsiniz. Sadece doğru parametreler için manual'ına bir göz atmanız yeterli.

Yukarıdaki parametre kombinasyonu sayesinde, elinizde tamamen gezinebilir, yerel bir kopya olur.

!!! warning "Dikkat ⚠️ Bir uyarı yapayım, `.html` uzantıları her işe yaramayabilir. Bazen wget'in Content Type'a göre uzantı üretmesini isteyebilirsiniz, bazen de "pretty URL"ler (güzel URL'ler) kullandığınızda wget'in uzantı üretmesini önlemeniz gerekebilir. Bu duruma göre ayarlamanız gerekir."

Umarım bu yazı işinize yarar, bol indirmeler

[^1]: Aslında bu yöntemi ilk keşfettiğimde çok sevinmiştim. Çünkü çok büyük bir sitede sadece belirli bir kategorideki sayfaları indirmem gerekiyordu ve bu beni saatlerce sürebilecek bir işten kurtardı.

- Daha fazla bilgi için [Linux’ta HTTrack kullanımı rehberine](/linux-ta-httrack-kullanimi) göz atabilirsiniz.



