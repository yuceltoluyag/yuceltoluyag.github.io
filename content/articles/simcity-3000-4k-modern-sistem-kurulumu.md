Title: Eski Dost SimCity 3000'i Modern Sistemlerde ve 4K Çözünürlükte Oynatmak
Date: 2026-05-29 03:52
Category: Oyun
Tags: simcity 3000, retro gaming, 4k gaming, windows 10, windows 11, d3d wrapper, sorun giderme, gog, nostalji
Slug: simcity-3000-4k-modern-sistem-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Efsane oyun SimCity 3000'i modern Windows 10 ve Windows 11 sistemlerde, 4K çözünürlük desteği, pürüzsüz mouse ivmesi ve eksiksiz müzikleriyle nasıl çalıştıracağımızı adım adım anlatıyorum.
Template: article
Lang: tr
Translation: false

Bana göre gelmiş geçmiş en iyi şehir kurma oyunu SimCity 3000'dir hacı. SimCity 2000 motorunun makyajlanıp canavar gibi yapılmış bir versiyonudur o. Piksel piksel işlenmiş izometrik çizimleri, insanı boğmayan ama çocuk yerine de koymayan o mükemmel oynanış dengesi ve tabii ki o şahane caz/new-age tarzındaki müzikleri...

Geçenlerde arşivimi karıştırırken elime ilkokuldaki kitap fuarından (hani şu yıkılan eski ilkokulumuzun spor salonunda kurulan o fuarlar olurdu ya) aldığım Scholastic Edition CD'si geçti. CD tozlanmış ama sapasağlam duruyor. Ulan dedim, GOG'a ya da Steam'e gidip aynı oyuna neden bir daha para bayılayım? Hemen çektim bizim Ryzen 5 3600'lü, RX 7600'lü Windows 10 LTSC test sistemini, taktım CD'yi. Kurulum tıkır tıkır bitti ama oyunu açınca resmen 1999 yılından kalma bir tokat yedim:

* Geniş ekran (widescreen) desteği hak getire, 800x600 çözünürlükte piksel sayıyoruz.
* Haritada gezinirken (scrolling) oyun deli gibi kasıyor ya da fare adeta ışık hızına ulaşıp ekranın dışına kaçıyor.
* Şehir yüklendikten sonra o canım müzikler çalmıyor.
* CD olmadan müzikler çalmıyor, çalanlar da eksik.
* Haritada gezerken de bazı kareler birkaç saniye gri kutu olarak kalıp sonradan yükleniyor.

Eski günlerin hatırına kolları sıvadım. Eğer siz de benim gibi bu efsaneyi modern 4K monitörünüzde akıcı bir şekilde oynamak istiyorsanız, uygulayacağınız adımları kendi test ettiğim sırayla şuraya bırakıyorum.

![SimCity 3000 4K Çözünürlükte](/images/simcity-3k-4k.png)

Görünüşe baksana hacı, 4K çözünürlükte SimCity 3000 adeta parlıyor! Hastane veya itfaiye kurmadan doğrudan gökdelen diktim; kadere meydan okumayı severiz.

## CD Derdinden ve Kare Ekran Prangalarından Kurtulmak (GOG Yaması)

Orijinal CD ile çalıştırma devri çoktan kapandı hacı. Hem CD'yi tak-çıkar yapmamak hem de oyuna geniş ekran (widescreen) yeteneği kazandırmak için ilk işimiz GOG ekibinin hazırladığı yama dosyasını çekmek olacak.

* **Dosyalar elimizin altında:** Yamayı [GOG Resmi Destek Sayfası](https://support.gog.com/hc/en-us/articles/360018687573-Simcity-3000-Unlimited-widescreen-support?product=gog){: target="\_blank" rel="noopener noreferrer"} üzerinden veya doğrudan [Alternatif Catbox Aynası](https://files.catbox.moe/25e7rj.zip){: target="\_blank" rel="noopener noreferrer"} linkinden indirebilirsiniz. (Dosya doğrulaması için MD5 kodu: `638eb5b3e7de9ada9b61a1ea40d276a4`)

İndirdiğiniz arşivdeki çalıştırılabilir dosyayı (EXE), oyunun kurulu olduğu klasördeki orijinal dosyanın üzerine yazın. Bu işlem hem CD kontrolünü ortadan kaldırıyor hem de geniş ekran çözünürlüklerinin önünü açıyor. Yalnız uyarayım; çözünürlüğü artırınca fare hassasiyeti sapıtacaktır, onu da hemen bir alt adımda çözeceğiz.

## Çıldıran Fareyi Dizginlemek (Mouse Hassasiyeti Ayarı)

Yüksek çözünürlüğe geçince oyundaki fare ivmesi (acceleration) o kadar artıyor ki, haritada iki santim kaydırmak isterken kendinizi haritanın en ucunda buluyorsunuz. Bunun çözümü oyunun ayar dosyasında gizli.

Oyunun kurulu olduğu dizine gidip `SC3U.ini` dosyasını bulun. Dosyayı favori metin editörünüzle açıp `[Navigation]` başlığı altındaki değeri şu şekilde güncelleyin:

```ini
[Navigation]
ScrollMarginFactor = 0.005787
```

Eğer Steam'den indirdiyseniz bu dosya klasörde olmayabilir[^1]. Telaşa gerek yok; kendiniz boş bir metin dosyası oluşturup adını `SC3U.ini` yapın ve yukarıdaki satırları içine yapıştırıp kaydedin.

## 4K Monitörde Ekran Kartını İkna Etmek (D3D Wrapper Çözümü)

Monitörüm native 3840x2160 çözünürlükte çalıştığı için oyunu bu çözünürlüğe çekince grafikler darmadağın oldu. Modern ekran kartları (DirectX 11 ve üzeri) bu eski Direct3D kodlarını düzgün yorumlayamıyor. Görüntüdeki o yamukluğu gidermek ve ekran kartıyla oyunu barıştırmak için araya bir Direct3D sarmalayıcısı (D3D wrapper) sokmamız şart.

* **İndirilecek paket:** [PC Gaming Wiki](https://community.pcgamingwiki.com/files/file/3171-simcity-3000-compatibility-fixes-dxwrapper-alternative/){: target="\_blank" rel="noopener noreferrer"} veya [Alternatif Catbox Aynası](https://files.catbox.moe/y7xs3y.zip){: target="\_blank" rel="noopener noreferrer"} (MD5: `e97d0989cab120608800f2e3395581a7`)

Bu paketi indirip içindeki tüm dosyaları oyunun `Apps` klasörüne ayıklayın.

!!! warning "Dikkat! Windows Görev Çubuğu Oyun Keyfinizi Bölmesin"

Bu sarmalayıcı varsayılan olarak oyunu kenarlıksız pencere (borderless) modunda açmaya çalışır. Haliyle Windows'un görev çubuğu oyunu ekranın altına doğru itip hizalamayı bozuyor. Bunun önüne geçmek için `Apps` klasöründeki `dxwrapper.ini` dosyasını açın ve şu ayarları yapın:

```ini
    [d3d9]
    EnableWindowMode = 0
    ...
    [FullScreen]
    FullScreen = 1
```

Böylece oyun gerçek tam ekran modunda başlar ve görev çubuğuyla uğraşmazsınız.

## Haritadaki Gri Boşlukları Yok Etmek (4GB Yaması)

Haritada gezinirken bazı karelerin önce gri/soluk bir kutu olarak görünüp birkaç saniye sonra yüklenmesi can sıkıcıdır hacı. Oyun 32-bit mimariyle yazıldığı için modern sistemlerdeki devasa RAM'leri verimli kullanamıyor. Oyuna biraz nefes aldırmak için 4GB yamasını uygulayacağız.

* **Yamayı Edinin:** [NTCore 4GB Patch](https://ntcore.com/4gb-patch/){: target="\_blank" rel="noopener noreferrer"}

Aracı indirip çalıştırın, ardından değiştirdiğimiz `SC3K.exe` (veya `SC3U.exe`)[^2] dosyasını seçip yamalayın. Bilimsel olarak test etmedim ama haritayı hızlıca kaydırırken grafiklerin gecikmeli gelme sorununu bıçak gibi kestiğini söyleyebilirim.

## Girişteki O Bitmek Bilmeyen Bekleme Sorunu

Oyunu ilk başlattığınızda ekranın dakikalarca donup kalması veya aşırı yavaş çalışması tamamen EA/Maxis'in o dönemki güncelleme sunucularıyla alakalı. Oyun açılırken artık mezarlıkta olan o güncelleme sunucusuna bağlanmaya çalışıyor ve yanıt alamadıkça bekliyor. Bu saçmalığı kapatmak için sahte bir ayar dosyası kullanacağız.

* **Ayarı İndirin:** [Simtropolis](https://community.simtropolis.com/omnibus/other-games/simcity-3000-unlimited-performance-problems-maxis-r329/){: target="\_blank" rel="noopener noreferrer"} veya [Alternatif Catbox Aynası](https://files.catbox.moe/cewlvf.zip){: target="\_blank" rel="noopener noreferrer"} (MD5: `e01ec9e7568560f493ff4cbbebb0e3d4`)

İndirdiğiniz zipten çıkan dosyanın adını `UpdateSettings.ini` yapın. Sonra oyunun klasöründeki `Apps/Updater` dizinine gidip mevcut dosyanın üzerine yazın. Oyunu açtığınızda o dakikalar süren donmanın tarih olduğunu göreceksiniz.

## CD Olmadan Nostaljik Caz Melodilerini Dinlemek

SimCity 3000'in o muazzam müzikleri olmadan oyunun tadı tuzu çıkmaz. Unlimited sürümünde bazı müziklerin `.ini` dosyasında adı geçmediği için dosyalar klasörde olsa bile oyunda çalmaz.

* **Müzik Listesi Yaması:** [PC Gaming Wiki](https://community.pcgamingwiki.com/files/file/2415-simcity-3000-unlimited-re-composed/){: target="\_blank" rel="noopener noreferrer"} veya [Alternatif Catbox Aynası](https://files.catbox.moe/msx1jh.7z){: target="\_blank" rel="noopener noreferrer"} (MD5: `5877e363565850306131e564e364481c`)

Bu paketi doğrudan oyunun ana dizinine ayıklayın.

!!! tip "İpucu ⚡ CD'deki Müzik Dosyalarını HDD'ye Taşımak"
    Eğer oyunu benim gibi fiziksel CD'den kurduysanız, kurulum sihirbazı müzikleri bilgisayarınıza kopyalamaz. CD'nin içerisindeki `APPS/RES/SOUND/MUSIC` klasörüne girip oradaki tüm `.xa` uzantılı dosyaları bilgisayarınızda oyunun kurulu olduğu aynı klasöre kopyalayın. Böylece CD sürücünüzü gürültüyle döndürmeden müzikleri tıkır tıkır dinleyebilirsiniz.

## Peki Windows 11 Kullananlar Ne Yapacak?

Ben bu ayarları Windows 10 LTSC 2021 kurulu test bilgisayarımda denedim ve canavar gibi sonuç aldım. Windows 11'i evdeki sistemlerime yaklaştırmadığımı sıkı takipçilerim bilir. Fakat aldığım geri bildirimlere göre bu adımları Windows 11'de uygulayanlar da sorunsuz bir şekilde şehir yönetmeye başlamışlar. Özellikle ultra geniş (ultrawide) ekran kullananlar (5120x2160 gibi) wrapper yardımıyla oyunu devasa ekranlarda bile tam uyumlu çalıştırmışlar.

Kendi ellerinizle kurduğunuz, bütçesini kuruşu kuruşuna hesapladığınız o şehrin dumanı tüten fabrikalarını izlerken bana bir teşekkür edersiniz artık.

Hadi kalın sağlıcakla!

---

### 🔗 Laboratuvardan Diğer Notlar

Sistemleri kurcalarken ve oyunların dibine vururken işinize yarayacak diğer yazılarım da şurada:

* [Linux'ta Nostalji Rüzgarı: Space Cadet Pinball ve O Gizli Sabahlar](/linux-space-cadet-pinball-kurulumu/)
* [Forza Horizon 6'yı Emektar RX 480 İle Oynamak (FH201 Hatası Kesin Çözüm)](/forza-horizon-6-fh201-hatasi-cozumu/)
* [Lutris'in impact.ttf İnadı ve O Gıcık Return Code 256 Hatasının Çözümü](/lutris-installed-file-impact-ttf-not-found-cozumu/)
* [Linux Oyunlara Türkçe Yama Kurulumu](/linux-oyunlara-turkce-yama-kurulumu/)

[^1]: Steam kurulumunda varsayılan olarak SC3U.ini bulunmayabiliyor. Bu durumda oyunun ana klasöründe (Apps dizininde) yeni bir metin belgesi oluşturup adını `SC3U.ini` yapmanız ve içine bu satırları girmeniz yeterli.
[^2]: NTCore tarafından geliştirilen bu 4GB yaması, 32-bitlik uygulamaların 64-bit işletim sistemlerinde 2GB yerine 4GB sanal bellek adreslemesini sağlar. Bu sayede bellek taşmasından kaynaklı çökmelerin de önüne geçilmiş olur.
