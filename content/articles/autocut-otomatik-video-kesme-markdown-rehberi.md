Title: Autocut ile Otomatik Video Kesme Rehberi
Date: 2025-09-08 14:00
Modified: 2026-11-09 21:42
Category: Medya
Tags: Autocut, Whisper, MoviePy, Python video kesme, FFmpeg, SRT, Markdown, otomatik video düzenleme
Slug: autocut-otomatik-video-kesme-markdown-rehberi
Authors: yuceltoluyag
Status: published
Summary: Whisper ile videolarınızı yazıya dökün, SRT ve Markdown dosyaları üzerinden tutmak istediğiniz cümleleri seçin ve videonuzu otomatik kesin. Açık kaynaklı AutoCut kurulumunu ve gerçek kullanım deneyimimi anlatıyorum.
Template: article
Image: images/autocut-otomatik-video-kesme-markdown-rehberi-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115175811703255586
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6nxfmq3fk2x



YouTube için video hazırlarken kayıt işlemi işin yalnızca bir kısmı. Özellikle eğitim videoları ve uzun anlatımlarda asıl zaman alan işlerden biri, kayıttan sonra yapılan düzenleme.

Bir cümleyi birkaç defa tekrar etmek, konuşurken sürekli "eee", "ıı" demek, gereksiz yere duraksamak veya uzun sessizlikleri temizlemek... Bunların hepsini elle yapmak gerçekten yorucu. Üstelik ses düzenleme tarafında da ayrı bir uğraş başlıyor. Normalizasyon, limiter, ses seviyesi ve diğer ayarlarla uğraşırken bazen hazırladığınız videoya harcadığınız zamandan daha fazlasını düzenlemeye harcıyorsunuz.

Ben de bu sorunları yaşadığım için farklı otomatik video düzenleme araçlarını araştırmaya başladım. Hatta bu konuyu YouTube canlı yayınımda uygulamalı olarak anlattım.

Karşıma çıkan çözümlerden biri de OpenAI Whisper altyapısını kullanan açık kaynaklı [AutoCut projesi](https://github.com/mli/autocut){: target="_blank" rel="noopener noreferrer"} oldu.

Bu aracın yaklaşımı oldukça farklı: Önce videodaki konuşmaları yazıya döküyor, ardından hangi cümlelerin kalacağını Markdown dosyası üzerinden sizin seçmenizi sağlıyor. Son aşamada da seçtiğiniz bölümleri birleştirerek yeni bir video oluşturuyor.

Yani sürekli video düzenleme yazılımının zaman çizelgesinde kesim yapmak yerine, bir metin dosyasını düzenleyerek video kesebiliyorsunuz.



## 1. Hangi AutoCut projesinden bahsediyoruz?

Burada küçük ama önemli bir isim karışıklığı var. AutoCut adıyla karşılaşabileceğiniz birden fazla araç bulunuyor. Canlı yayında bahsettiğim araçlarla bu rehberde kuracağımız yazılım aynı şey değil.

Araştırma sırasında karşılaştırdığım araçlar şunlardı:

| Araç | Çalışma şekli | Temel yaklaşım |
|---|---|---|
| [FireCut](https://firecut.ai/){: target="_blank" rel="noopener noreferrer"} | Premiere Pro ve DaVinci Resolve eklentisi | Sessizlik, dolgu kelimeleri ve tekrarlar gibi düzenleme işlemleri |
| [AutoCut](https://www.autocut.com/){: target="_blank" rel="noopener noreferrer"} | Premiere Pro ve DaVinci Resolve eklentisi | Otomatik video düzenleme ve kurgu özellikleri |
| [Auto-Editor](https://github.com/WyattBlue/auto-editor){: target="_blank" rel="noopener noreferrer"} | Açık kaynaklı komut satırı aracı | Ses seviyesi ve görüntü hareketi gibi ölçütlerle otomatik kesim |
| [AutoCut (mli/autocut)](https://github.com/mli/autocut){: target="_blank" rel="noopener noreferrer"} | Açık kaynaklı Python uygulaması | Whisper transkripsiyonu ve Markdown üzerinden manuel seçim |

Burada FireCut ve autocut.com ücretli çözümler olarak incelediğim ticari alternatifler. Auto-Editor ise ayrıca değerlendirebileceğiniz açık kaynaklı bir araç.

Bu yazıda kullanacağımız proje son satırdaki [mli/autocut](https://github.com/mli/autocut){: target="_blank" rel="noopener noreferrer"} deposudur.

Özellikle diğer araçlardan ayrıldığı nokta şu: Programın hangi bölümleri keseceğine tamamen kendisi karar vermiyor. Önce konuşmaları metne dönüştürüyor, ardından kontrolü size bırakıyor.

Benim aradığım çözüm de tam olarak buydu. Çünkü otomatik kesim güzel ama bazen konuştuğunuz bir kelimeyi de sessizlik veya anlaşılmayan bir bölüm olarak algılayabiliyor. Son kararı kendiniz verebilmeniz bu yüzden önemli.

## 2. AutoCut nasıl çalışıyor?

AutoCut'ın çalışma mantığını üç aşamada düşünebiliriz:

1. Video, Whisper kullanılarak yazıya dökülür.
2. Oluşturulan SRT ve Markdown dosyaları üzerinden hangi cümlelerin korunacağı seçilir.
3. Seçilen bölümler birleştirilerek yeni video oluşturulur.

Burada iki dosyanın görevi farklıdır:

- **SRT:** Konuşmaların zaman bilgilerini ve altyazı metinlerini tutar.
- **Markdown:** Hangi konuşma bölümlerinin kalacağını işaretlemenizi sağlar.

Proje, transkripsiyondan önce ses etkinliği algılama (VAD) işlemi de gerçekleştirir. Bunun için Silero VAD kullanılır. Böylece konuşma olmayan bölümler belirlenerek transkripsiyon süreci daha verimli hâle getirilir.

Whisper tarafından oluşturulan altyazılarda uzun konuşma araları `< No Speech >` şeklinde de gösterilebilir.

Bu sayede bir video düzenleyicinin zaman çizelgesinde tek tek kesim yapmak yerine, metin üzerinden çalışabiliyorsunuz.

## 3. Kurulum ve hazırlık

AutoCut Python ile geliştirildiği için öncelikle Python ortamını hazırlamamız gerekiyor.

Benim özellikle dikkat ettiğim konu, Python paketlerini sistemin geneline kurmamak. Farklı projeler farklı kütüphane sürümlerine ihtiyaç duyabiliyor. Bir projenin bağımlılıkları diğerini bozmasın diye sanal ortam kullanmak çok daha mantıklı.

### Gerekli bağımlılık: FFmpeg

Öncelikle sisteminizde FFmpeg bulunmalı.

Arch Linux kullanıyorsanız:

```bash
sudo pacman -S ffmpeg
```

Kurulumu kontrol etmek için:

```bash
which ffmpeg
ffmpeg -version
```

FFmpeg, ses ve video dosyalarının okunması ve dışa aktarılması aşamalarında kullanılıyor.

### Python sanal ortamını oluşturma

Video dosyalarınızı çalıştığınız dizine koyduğunuzu varsayalım:

```bash
mkdir autocut-work
cd autocut-work
```

Sanal ortamı oluşturalım:

```bash
python -m venv .venv
```

Linux üzerinde etkinleştirmek için:

```bash
source .venv/bin/activate
```

Terminalinizde sanal ortamın etkin olduğunu görebilirsiniz. Bundan sonra yükleyeceğiniz Python paketleri bu ortama kurulacaktır.

### PyTorch ve GPU hazırlığı

AutoCut, yerel Whisper kullanımında PyTorch altyapısından yararlanır. NVIDIA ekran kartınız varsa CUDA destekli uygun PyTorch sürümünü kullanmanız gerekir.

PyTorch'un kurulum komutları işletim sistemine ve CUDA uyumluluğuna göre değişebildiğinden [resmî PyTorch kurulum sayfasından](https://pytorch.org/get-started/locally/){: target="_blank" rel="noopener noreferrer"} sisteminize uygun seçeneği belirleyin.

GPU kullanacaksanız uygun PyTorch paketini AutoCut kurulumundan önce oluşturduğunuz sanal ortama yükleyin.

CPU ile çalışmak isteyenlerin ayrıca CUDA hazırlığı yapmasına gerek yok.

### AutoCut kurulumu

Projenin GitHub deposunda verilen kurulum yöntemi:

```bash
python -m pip install git+https://github.com/mli/autocut.git
```

Ancak burada önemli bir MoviePy uyumluluk meselesi var.

Projenin ana dalındaki kesim kodu eski MoviePy API'sini kullanıyor. MoviePy 2.x sürümünde bazı import ve metot isimleri değiştirildi. Bu nedenle güncel MoviePy sürümüyle doğrudan çalıştırmaya kalkarsanız uyumluluk hatasıyla karşılaşabilirsiniz.

Projenin mevcut ana dalındaki eski API ile uyumlu bir bağımlılık kurmak için AutoCut kurulumunun ardından MoviePy sürümünü sabitleyin:

```bash
python -m pip install "moviepy<2"
```

Kurulumların ardından bağımlılıkları kontrol edin:

```bash
python -m pip check
```

Ardından komut satırı aracının kullanılabilir olduğunu doğrulayın:

```bash
autocut --help
```

!!! warning "MoviePy sürümüne dikkat!"
    AutoCut'ın ana dalındaki `setup.py` dosyasında MoviePy için bir üst sürüm sınırı tanımlanmamış. Dolayısıyla bağımlılık kurulumu en yeni MoviePy sürümünü getirebilir. Yukarıdaki ikinci komut bu nedenle özellikle önemlidir. Bu sürüm sabitlemesi, mevcut ana daldaki eski API kullanımı için bir uyumluluk önlemidir; bütün Python sürümlerinde test edilmiş garantili bir kurulum anlamına gelmez.

Projenin MoviePy 2 uyumluluğu için açılmış [PR #139](https://github.com/mli/autocut/pull/139){: target="_blank" rel="noopener noreferrer"} henüz ana dala birleştirilmemiş durumda. Bu nedenle güncel kurulumlarda bu ayrıntıyı göz ardı etmeyin.

## 4. GPU kontrolü ve Whisper modeli

AutoCut'ın transkripsiyon tarafında OpenAI Whisper kullanılıyor.

Farklı model seçenekleri bulunuyor:

- `tiny`
- `base`
- `small`
- `medium`
- `large`
- `large-v2`
- `large-v3`
- `large-v3-turbo`

Varsayılan model `small`. Daha büyük modeller transkripsiyon kalitesini artırabilir ancak donanıma göre daha fazla bellek ve işlem gücü isteyebilir.

NVIDIA ekran kartınız varsa PyTorch'un CUDA desteğini kontrol edebilirsiniz:

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

Sonuç `True` ise PyTorch CUDA aygıtını görebiliyor demektir.

GPU kullanımı için uygun PyTorch sürümünün kurulu olması gerekir. Ekran kartınız desteklenmiyorsa veya CUDA tarafında sorun yaşıyorsanız CPU üzerinden de çalıştırabilirsiniz.

AutoCut'ın komut satırında `--device` seçeneği `cuda` ve `cpu` değerlerini kabul eder. Projenin mevcut CLI sürümünde AMD için ayrıca tanımlanmış bir aygıt seçeneği bulunmuyor.

!!! tip "Model seçimi"
    Küçük modeller daha az kaynak tüketirken büyük modeller daha fazla işlem gücü ve bellek isteyebilir. Donanımınıza göre seçim yapın. Özellikle uzun videolarda model seçiminin işlem süresine etkisini hesaba katın.

## 5. Video transkripsiyonu ve Markdown oluşturma

Şimdi asıl işleme geçebiliriz.

Örnek video dosyamızın adı `video.mp4` olsun.

Transkripsiyon işlemini başlatmak için:

```bash
autocut -t video.mp4 --lang Turkish --device cuda
```

Burada:

- `-t`: Video veya ses dosyasını transkribe eder.
- `--lang Turkish`: Konuşma dilini Türkçe olarak belirtir.
- `--device cuda`: Transkripsiyonda CUDA kullanmaya zorlar.

CUDA kullanmayacaksanız `--device cpu` seçebilirsiniz. Ayrıca `--device` parametresini hiç belirtmezseniz program uygun aygıtı otomatik seçmeye çalışır.

Bu işlem sonucunda iki dosya oluşturulur:

```text
video.srt
video.md
```

SRT dosyası konuşmaların zaman bilgilerini içerirken Markdown dosyası bu konuşmaları düzenleyebilmeniz için hazırlanır.

Burada önemli bir ayrıntı var: `-t` seçeneği SRT ve Markdown dosyalarını zaten oluşturuyor. Bu nedenle transkripsiyon komutuna ayrıca `-c` ve `-m` eklemeniz gerekmiyor.

Eğer daha sonra yalnızca elinizdeki SRT dosyasından Markdown oluşturmak isterseniz `-m` seçeneğini kullanabilirsiniz:

```bash
autocut -m video.srt video.mp4
```

Bu seçenek video kesme işlemi değildir; SRT dosyasını düzenlenebilir Markdown biçimine dönüştürür.

## 6. Markdown dosyasını düzenleme

Bence AutoCut'ın en güzel tarafı burada başlıyor.

Oluşturulan `video.md` dosyasını herhangi bir Markdown editörüyle açabilirsiniz. VS Code, Typora veya başka bir metin editörü kullanmanız yeterli.

Dosyanın içerisindeki satırlar onay kutuları şeklinde hazırlanır.

Örnek:

```markdown
- [ ] <-- Mark if you are done editing.

- [ ] [1,00:00] Bugün sizlerle yeni bir yazılımdan bahsedeceğim.
- [ ] [2,00:08] Öncelikle programın nasıl çalıştığını inceleyelim.
- [ ] [3,00:15] Gereksiz yere uzun bir sessizlik oluşuyor.
- [ ] [4,00:24] Şimdi kurulum aşamasına geçelim.
```

Burada iki farklı işaretleme bulunuyor:

- `[x]`: İlgili cümle veya bölüm videoda kalacak.
- `[ ]`: İlgili bölüm kesilecek.

Örneğin ilk, ikinci ve son cümle kalsın; üçüncü cümle silinsin istiyorsak:

```markdown
- [ ] <-- Mark if you are done editing.

- [x] [1,00:00] Bugün sizlerle yeni bir yazılımdan bahsedeceğim.
- [x] [2,00:08] Öncelikle programın nasıl çalıştığını inceleyelim.
- [ ] [3,00:15] Gereksiz yere uzun bir sessizlik oluşuyor.
- [x] [4,00:24] Şimdi kurulum aşamasına geçelim.
```

### Düzenleme tamamlandı işaretini unutmayın

Dosyanın en üstündeki şu satır özellikle önemli:

```markdown
- [ ] <-- Mark if you are done editing.
```

Düzenlemeniz bittiğinde bunu da işaretlemelisiniz:

```markdown
- [x] <-- Mark if you are done editing.
```

Bu işaret, AutoCut'a Markdown düzenlemesinin tamamlandığını bildiriyor. İşaretlenmediği takdirde kesim işlemi başlamaz.

Bir diğer önemli nokta da satırların başındaki numaralardır. Bunlar SRT dosyasındaki altyazı indekslerine karşılık gelir. Bu numaraları kendinize göre yeniden sıralamayın veya değiştirmeyin. Yalnızca onay kutularını düzenleyin.

!!! tip "İşinizi kolaylaştıracak bir yöntem"
    Önce bütün dosyayı hızlıca tarayın. Kesinlikle kalmasını istediğiniz cümleleri işaretleyin. Ardından sesin yanlış algılandığı, konuşmanın kesildiği veya gereksiz bölümlerin bulunduğu yerleri tekrar kontrol edin. Her satırı tek tek dinlemek zorunda kalmadan daha hızlı ilerleyebilirsiniz.

## 7. Videoyu kesme ve çıktı alma

Markdown düzenlemesini tamamladıktan sonra artık videoyu oluşturabiliriz.

Örneğimizde üç dosyamız var:

```text
video.mp4
video.srt
video.md
```

Kesim komutu:

```bash
autocut -c video.mp4 video.srt video.md
```

Burada:

- `-c`: Altyazı ve Markdown işaretlemelerine göre video kesimini gerçekleştirir.
- `video.mp4`: Orijinal video dosyasıdır.
- `video.srt`: Konuşmaların zaman bilgilerini içerir.
- `video.md`: Hangi bölümlerin korunacağını belirtir.

İşlem tamamlandığında yeni video dosyası oluşturulur:

```text
video_cut.mp4
```

Orijinal videonuz değiştirilmez. Kesilmiş video ayrı bir dosyaya kaydedilir.

Proje, seçilen bölümleri birleştirirken MoviePy kullanır ve video çıktısını FFmpeg altyapısıyla oluşturur. Ayrıca çıktı aşamasında ses normalizasyonu uygulanır.

## 8. Gerçek testim: Beş dakikalık video üç dakikaya indi

Canlı yayında gösterdiğim örnek videolardan biri yaklaşık beş dakikalık bir kayıttı.

İçerisinde tekrarlar, duraksamalar, dolgu kelimeleri ve gereksiz konuşma araları bulunuyordu. Bunları elle temizlemek yerine AutoCut'ın oluşturduğu SRT ve Markdown dosyalarını kullandım.

Kendi testimde elde ettiğim sonuç:

| İşlem | Süre |
|---|---:|
| Orijinal video | 317,8 saniye |
| Kesilmiş video | 181 saniye |
| Kazanılan süre | 136,8 saniye |

**Yaklaşık %43 daha kısa bir video.**

Elbette burada önemli bir ayrıntı var: Programın yaptığı her kesim doğru olmayabiliyor.

Örneğin mikrofon seviyesinin düşük olduğu veya arka planda farklı seslerin bulunduğu bazı bölümlerde, aslında konuştuğum hâlde kesilmesi gereken bir bölüm olarak algılanan yerler oldu.

Bu nedenle oluşturulan videoyu mutlaka son kez kontrol etmenizi öneriyorum. Özellikle eğitim videosu hazırlıyorsanız bir kelimenin veya cümlenin ortadan kaybolması anlatımın bütünlüğünü bozabilir.

## 9. AutoCut neleri yapmıyor?

Burada yanlış beklenti oluşturmamak gerekiyor.

AutoCut bir ses restorasyon veya gürültü engelleme yazılımı değil. Mikrofonunuzdaki dip sesi ortadan kaldırmak, patlayan sesleri onarmak, EQ uygulamak ya da kapsamlı bir limiter işlemi yapmak için tasarlanmamış.

Projenin kesim kodunda ses normalizasyonu bulunuyor. Ancak bu, gürültü giderme veya profesyonel ses işleme ile aynı şey değil.

Aracın asıl gücü, konuşmayı metne dönüştürüp istemediğiniz bölümleri seçerek videodan çıkarmanızı sağlaması.

Dolayısıyla kötü bir mikrofon kaydını tek başına kusursuz hâle getirmesini beklemeyin. Kayıt kalitesini mümkün olduğunca baştan düzgün ayarlamak hâlâ önemli.

## 10. Sonuç: Ücretli eklentilere alternatif olabilir mi?

Video düzenleme sırasında yalnızca sessizlikleri, gereksiz konuşmaları ve tekrarları temizlemek isteyenler için AutoCut oldukça ilginç bir alternatif.

FireCut ve autocut.com gibi ticari eklentiler daha kapsamlı düzenleme özelliklerini doğrudan video editörlerinin içerisine getiriyor. Auto-Editor ise farklı ölçütlerle otomatik kesim yapabilen ayrı bir komut satırı aracı.

Bizim kullandığımız `mli/autocut` ise farklı bir yaklaşım sunuyor: Whisper ile konuşmayı yazıya döküyor, son kararı Markdown dosyası üzerinden size bırakıyor.

Benim hoşuma giden tarafı da bu oldu. İhtiyacım olmayan bir sürü efekt veya otomatik kurgu özelliği yerine, yalnızca konuşmamı düzenleyebileceğim ve gereksiz bölümleri çıkarabileceğim bir iş akışı sunuyor.

Python sanal ortamında çalıştırabilmeniz, açık kaynaklı olması ve metin üzerinden düzenleme yapabilmeniz de güzel avantajları.

Ancak MoviePy sürüm uyumluluğuna dikkat etmeniz ve otomatik kesimden sonra mutlaka son kontrol yapmanız gerekiyor.

Projeyi incelemek veya kurmak isterseniz:

[AutoCut GitHub deposu](https://github.com/mli/autocut){: target="_blank" rel="noopener noreferrer"}

[MoviePy 2 geçiş belgeleri](https://zulko.github.io/moviepy/getting_started/updating_to_v2.html){: target="_blank" rel="noopener noreferrer"}

[OpenAI Whisper](https://github.com/openai/whisper){: target="_blank" rel="noopener noreferrer"}

[Auto-Editor GitHub deposu](https://github.com/WyattBlue/auto-editor){: target="_blank" rel="noopener noreferrer"}


<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

## Canlı yayında anlattığım kurulum ve kullanım

<lite-youtube videoid="tS3Iw2WhCJI"></lite-youtube>