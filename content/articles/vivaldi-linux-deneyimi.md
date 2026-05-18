Title: Vivaldi'yi Neden Seviyorum
Date: 2025-11-18 22:55
Category: Linux
Tags: vivaldi, linux, tarayıcı, gizlilik, kde, performans
Slug: vivaldi-linux-deneyimi
Authors: yuceltoluyag
Summary: Internet Explorer kahrını çekmiş biri olarak Chrome'un hakkını veririm. Ama KDE'ye geçişimle birlikte eski dostum Vivaldi'ye neden döndüğümü ve FOSS takıntılarını neden umursamadığımı anlatıyorum.
Image: images/vivaldi-linux-deneyim-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115629467635264628
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6ptnywkmk26

## Linux'ta Neden Vivaldi? Olayı Ne?

Hadi dürüst olalım, Linux'ta tarayıcı deyince akla genelde iki isim gelir: Firefox ve... Chromium (veya türevleri). Firefox, FOSS (Özgür ve Açık Kaynak) dünyasının kalesi. Chromium ise Google'ın standartı.

Peki Vivaldi bu resimde nerede duruyor?

Ben Vivaldi'yi ilk kurduğumda, bunun bir tarayıcıdan çok, bir "uçak kokpiti" olduğunu düşünmüştüm. Olayı basitlik değil, tam tersi: **Kontrol**. Vivaldi, tarayıcısını "yönetmek" isteyen, her köşesini kendine göre ayarlamayı seven "power user" (güçlü kullanıcı) için yapılmış. (Hatta tarayıcınızı daha güvenli hale getirmek istiyorsanız [Vivaldi'de DoH Ayarı Nasıl Yapılır](/vivaldi-doh-dns-over-https-ayari/) rehberime de mutlaka göz atın).

- **Sekme Yönetimi:** Sekmeleri gruplama (stacking), bölünmüş ekranda iki sekmeyi aynı anda görme (tiling)... bunlar harika özellikler. Özellikle 20+ sekme açınca hayat kurtarıyor.
- **Yan Panel (Sidebar):** Bu, Vivaldi'nin imzası gibi bir şey. İndirilenler, notlar, yer imleri, hatta WhatsApp Web gibi siteleri o panele sabitleyebiliyorsun.
- **Dahili Oyuncaklar:** İçinde not alma aracı var, RSS okuyucusu var, ekran görüntüsü alma aracı var. Başka bir eklentiye ihtiyaç duymadan resmen bir "İsviçre Çakısı" 🇨🇭 gibi.

Kısacası, Vivaldi sana diyor ki: "Bu tarayıcı senin, al, istediğin gibi kır, dök, yeniden şekillendir."

## O Zaman Neden Herkes Kullanmıyor? (İtiraz Noktaları)

Bu kadar övdük, peki neden tüm Linux dağıtımları Vivaldi ile gelmiyor? Neden FOSS topluluklarında adı geçtiğinde insanlar biraz geriliyor?

İşte zurnanın zırt dediği yer.

### 1. Kapalı Kaynak Günahı

Bu, Linux dünyasındaki en büyük "günahı". Evet, Vivaldi'nin temeli (Chromium) açık kaynak, ama arayüzü (UI), yani o sevdiğimiz tüm özellikleri sunan katman, **kapalı kaynak** (proprietary).[^1]

!!! warning "Dikkat! ⚠️ Tam FOSS Değil! Linux kullanıcılarının çoğu için 'özgür yazılım' bir felsefedir. Bir yazılımın kodunu göremiyorsan, içinde ne yaptığını tam olarak bilemezsin. İşte Vivaldi, bu felsefeye tam uymadığı için birçok 'eski toprak' Linux kullanıcısının kırmızı çizgisini geçiyor."

### 2. "Biraz Hantal" mı? (Efsaneler ve Gerçekler)

Gelelim performans konusuna. Eskiden Vivaldi için "ağır" denirdi, ben de buna katılırdım.

Eski **ThinkPad W520** laptopumda kullandığım zamanları hatırlıyorum; makine resmen inlerdi. Üstelik o zamanlar **Sync (Senkronizasyon)** özelliği de yoktu, format atınca her şey giderdi, tam bir eziyetti.

Ama yıl 2025 ve durum çok değişti. Şu an **i5-13400F** işlemcili, **16GB DDR5 RAM**'li güncel bir sistemde Vivaldi kullanıyorum ve sonuç şaşırtıcı.

Şu an **18 sekme** açık, **10 aktif eklenti** çalışıyor ve RAM tüketimi sadece **1.9 GB** civarında. Vivaldi'nin **Sekme Uyutma (Hibernation)** özelliği sayesinde, kullanmadığınız sekmeler arka planda sistemi yormuyor. Yani modern donanımlarda "Vivaldi hantal" lafı artık geçerli değil; gayet verimli ve seri çalışıyor. 🚀

### 3. Özellik Fazlalığı (Paradoks)

Kulağa tuhaf geliyor ama evet. Bazı kullanıcılar sadece tarayıcılarının _hızlıca_ web sitelerini açmasını ister. Vivaldi'yi açtıklarında karşılarına çıkan ayar menüsü, not paneli, RSS okuyucu falan... bu onları boğuyor. "Ben sadece Google'a girecektim" diyen adam için Vivaldi tam bir baş ağrısı.

## Geçmişi Kirli mi? Skandalı Var mı?

İnsanlar kapalı kaynak bir şey duyunca hemen "Kesin verilerimi satıyordur!" diye düşünüyor. Haklılar da.

Peki Vivaldi'nin durumu ne? Hemen söyleyeyim: Hayır. Öyle "Milyonlarca kullanıcının verisi sızdı" veya "Ayarlarınızı Çin'e sattı" gibi büyük bir vukuatı yok. Şirketin (Avrupa kökenli olmasının da etkisiyle) veri gizliliği konusunda "Biz verinizi satmayız" diyen net bir duruşu var.

Ama... (evet, bir 'ama' var):

- **Varsayılan Ayarlar:** Bazı gizlilik testlerinde ([Avoid the Hack](https://avoidthehack.com){: target="\_blank" rel="noopener noreferrer"} gibi sitelerin yaptığı) Vivaldi'nin varsayılan ayarlarının "en güvenli" olmadığı görülmüş. Yani kurar kurmaz biraz kurcalaman gerekiyor.
- **Google Kavgası:** Yıllar önce kurucusu (Opera'nın da eski CEO'su) Google ile bir atışma yaşadı. Google'ın, Vivaldi'nin AdWords reklamlarını "haklı bir sebep olmadan" durdurduğunu iddia ettiler. Rekabet işte, pek de şaşırtıcı değil.

!!! tip "İpucu ⚡ Kurar Kurmaz Şunu Yapın: Vivaldi'yi kurduktan sonra hemen `Ayarlar > Gizlilik ve Güvenlik > İzleyici ve Reklam Engelleme` yoluna gidin. Varsayılan olarak 'Engelleme Yok' veya 'İzleyicileri Engelle' seçili gelir. Bunu **'İzleyicileri ve Reklamları Engelle'** olarak değiştirin. Dünyanız değişecek."

## Bir Dinozorun İtirafları: IE, Chrome ve Eve Dönüş

Şimdi biraz teknik detayları bırakıp gerçek hayata dönelim.

Ben internet tarayıcılarının o emekleme dönemlerini, büyümesini canlı canlı gözlerimle görmüş birisiyim. Internet Explorer denen o yaratığın kahrını çekenler beni çok iyi anlar. 🦖 O günlerden sonra Google Chrome bizim için sadece bir tarayıcı değil, resmen bir nimetti, koca bir evrendi.

Tıpkı Linux dağıtımlarında "distro-hopper" (sürekli dağıtım değiştiren) olmadığım gibi, tarayıcı konusunda da maymun iştahlı olmadım. Yıllarca Chrome kullandım. Evet, bazen saçma sapan, kullanıcı deneyimini baltalayan kararlar aldılar ama yine de "o kahrı çeken bilir" diyerek yoluma devam ettim. Nadiren Firefox'a şans verdim ama o kadar.

Peki şimdi ne oldu da Vivaldi tekrar masama geldi?

Geçenlerde, sizlere daha iyi görsellik sunabilmek adına (her ne kadar yayın açamasam da 😅) **KDE** masaüstü ortamına geçiş yaptım. KDE'ye geçmemle birlikte eski dostum Vivaldi'ye de geri döndüm.

Chrome olmasaydı kesinlikle birinci tarayıcım bu olurdu. Neden mi? Çünkü her şeyini özelleştirebiliyorum. Minimum 15-20 sekme açık şekilde kullanıyorum ve Vivaldi bana mısın demiyor. Diğer alternatif tarayıcılardan çok daha fazla seviyorum bu aleti.

## "Ama Kapalı Kaynak!" Diyenlere Sitemim

Gelelim şu malum konuya...

Açıkçası, bu kadar güçlü ve özelleştirilebilir bir tarayıcının sırf bir kısmı kapalı kaynak diye kullanılmamasını, tu kaka ilan edilmesini anlamıyorum. Anlam veremiyorum. 🤷‍♂️

Burada biraz gerçekçi olalım:

1.  En azından diğer tarayıcılar gibi size "privacy" (gizlilik) hikayesi satıp, arkada verilerinizi nefret ettiğiniz firmalara gizli gizli satmıyorlar.
2.  O en sevdiğiniz, yere göğe sığdırılamayan Firefox'un bile geçmişte neler karıştırdığını gördük. Bu "FOSS'cu abilere" daha önce de söyledik ama dinletemedik.
3.  **Bir şeyin açık kaynak olması, kontrolün tamamen sizde olduğu anlamına gelmez.**

Benim için Vivaldi; dürüstlüğü, özelleştirilebilirliği ve KDE ile olan uyumuyla şu anlık kazanan tarafta. 😎

[^1]: Bu, FOSS (Özgür ve Açık Kaynak Kodlu Yazılım) topluluğunda en çok tartışılan konu. Chromium temeli açık kaynak, ama o güzel arayüz... değil.



