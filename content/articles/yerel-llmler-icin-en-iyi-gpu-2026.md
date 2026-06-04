Title: Yerel LLM'ler İçin En İyi Ekran Kartları (2026): 2.700 TL'lik Pi'den 135.000 TL'lik Canavara
Date: 2026-06-04 20:30
Category: Donanım
Tags: yapay-zeka, llm, gpu, ekran-karti, donanim, homelab
Slug: yerel-llmler-icin-en-iyi-gpu-2026
Authors: yuceltoluyag
Status: published
Summary: 2026 yılında kendi sisteminizde Llama 4 veya Qwen 3.5 gibi modelleri çalıştırmak için en mantıklı donanım seçeneklerini ele alıyoruz. Bütçe dostu kurulumlardan canavar iş istasyonlarına uzanan bir rehber.
Template: article
Lang: tr
Translation: false

Dün gece çocuklar uyuduktan sonra, evin o tatlı sessizliğinde çalışma masamın başına geçtim. 💻 Çayımı tazeleyip bulut servislerinin faturalarını kontrol ederken canım sıkıldı. Sırf basit otomasyonlar, testler ve günlük asistanlık işleri için OpenAI ve Anthropic API'lerine ödediğim para çığ gibi büyüyordu. Kendi kendime sordum: "Yücel, biz bu işin mutfağındayız, neden tüm bu yükü kendi yerel donanımımıza yıkmıyoruz?"

Tabii ki gerçekçi olalım: Masamızın altındaki bilgisayar, buluttaki devasa veri merkezleriyle, yüz milyarlarca parametreli canavar modellerle aşık atamaz dostum. 🧠 Bulutun gücü her zaman apayrı bir seviyede kalacak. Ama bizim amacımız da ChatGPT üretmek değil; işimizi görecek, kod yazarken elimiz ayağımız olacak tatmin edici bir yerel yapay zeka asistanı ayağa kaldırmak. 

Bunun için öyle çuvalla para dökmeye de gerek yok aslında. 2026 itibarıyla bir Raspberry Pi'den başlayıp profesyonel iş istasyonlarına kadar hangi donanım seçeneklerimiz var, VRAM ve bellek bant genişliği dünyasında neler dönüyor, gelin birlikte bakalım.

---

## Bant Genişliği ve VRAM: İşin Matematik Kısmı 🛠️

Yerelde yapay zeka koşturmanın ilk kuralı: İşlemcinin saf gücünü falan bir kenara bırakın. Burada her şey ekran kartının bellek miktarı (VRAM) ve o belleğin ne kadar hızlı çalıştığı (bant genişliği) etrafında dönüyor.

1. **VRAM Kapasitesi:** Seçtiğiniz modelin bilgisayarınızda hiç açılıp açılmayacağını belirleyen ana sınır kapısıdır.
2. **Bellek Bant Genişliği:** Modelin size ne kadar hızlı cevap yazacağını, saniyede kaç kelime üreteceğini belirler.

Yetersiz VRAM ile büyük model çalıştırmaya kalkmak, okyanusu çay kaşığıyla boşaltmaya çalışmak gibidir. Kartın belleği yetmediğinde sistem yükü bilgisayarın ana RAM'ine yıkar ve hız o saniyeden sonra yerlerde sürünür.[^1] Ekran kartlarındaki yeni GDDR7 bellek teknolojisi veya Apple'ın M serisindeki birleşik bellek mimarisi, bu darboğazı aşmak için elimizdeki en güçlü kozlar.

Tabii bu sırada işlemci ve sistem RAM'i de boş boş oturmuyor. Hızlı bir CPU, girdiğiniz prompt'u (komutu) ilk işleme aşamasında GPU'ya yardım ederken, sistem belleği de modelin hafıza kısmını (KV cache) sırtlar. Bu yüzden GPU odaklı bir sistem kursanız bile, yanına en az 32 GB hızlı RAM ve modern bir işlemci (Ryzen 7000 veya Intel 13. nesil ve üzeri) eklemek şart. Eğer bu donanım bileşenlerini adım adım nasıl kurup yapılandıracağınızı merak ediyorsanız [Kendi Sunucunda Yapay Zeka (2026)](/yerel-llm-kurulum-rehberi-2026/) başlıklı detaylı kılavuzuma göz atabilirsiniz.

---

## Donanım Seviyeleri ve Cebe Uyan Çözümler 💰

2026 yılında bütçenize göre kurabileceğiniz sistem seviyelerine ve yerel fiyatlara yakından bakalım.

### Cebe Zarar Vermeyecek Başlangıç Seviyesi (2.700 TL – 13.800 TL / $60–$300)

Yapay zekanın mantığını kavramak, 3B-8B (milyar parametre) arası ufak tefek modellerle oynamak veya arka planda basit otomasyonlar çalıştırmak istiyorsanız öyle büyük paralar dökmenize hiç gerek yok. Llama 4 Scout veya Qwen 3.5'in küçük modelleri, şaşırtıcı derecede mütevazı donanımlarda bile tıkır tıkır çalışıyor. Hangi modeli seçeceğiniz konusunda kararsız kaldıysanız [En İyi Yerel LLM Modelleri (2026)](/en-iyi-yerel-llm-modelleri-2026/) incelemem size yol gösterecektir.

*   **Raspberry Pi 5 (4GB/8GB):** Fiyatı bizim buralarda 5.600 TL ile 6.300 TL arasında geziniyor (kağıt üstünde 60$ ama malum vergiler ve ithalat maliyetleri). Sistemi kurcalamak, öğrenmek için eğlenceli bir hobi aracı ama saniyede ancak 1-2 kelime üretebiliyor. Yani sabırlı olmanız lazım. Arka planda sürekli açık kalacak küçük otomasyonlar için ideal.
*   **Intel Arc B580:** Akakçe'de 12.000 TL civarında bulabileceğiniz bu kart, 12 GB VRAM sunarak büyük bir sürpriz yapıyor. Intel'in oneAPI desteği sayesinde 7B'lik modelleri şaşırtıcı derecede akıcı çalıştırabiliyorsunuz.[^2]
*   **NVIDIA RTX 4060 (8GB):** 13.700 TL dolaylarında satılıyor. Belleği 8 GB olduğu için biraz sınırda ama NVIDIA'nın CUDA ekosistemi o kadar geniş ve sorunsuz ki, yapay zekaya adım atarken başınızın en az ağrıyacağı seçenek budur.

### Orta Segment: Fiyat/Performans Canavarları (23.000 TL – 55.000 TL / $500–$1.200)

Yazılımcıların ve bu işi günlük iş akışına dahil etmek isteyenlerin bakması gereken yer tam olarak burası. Modelleri çok fazla sıkıştırmadan, kafanız rahat şekilde çalıştıracak VRAM ve sohbet hızını sıkıntıya sokmayacak bellek bant genişliği bu segmentte başlıyor.

*   **AMD RX 9070 XT (16GB):** RDNA4 mimarisi ve AMD'nin nihayet toparlayan ROCm desteğiyle bu kart, yaklaşık 30.000 - 35.000 TL bandında bulunabiliyor. 13B veya 14B seviyesindeki modeller için biçilmiş kaftan.
*   **Mac Mini M4 (32GB Birleşik Bellek):** Çalışma masasında sıfır ses ve düşük elektrik faturası isteyenler için şu an daha iyisi yok. Apple'ın birleşik bellek mimarisi sayesinde 14B ve hatta 32B modelleri şaşırtıcı bir kararlılıkla koşturuyor. Türkiye'de baz (16GB) modeli 35.000 TL civarından başlasa da, yapay zeka için 32GB sürümünü seçmek şart. Onun da fiyatı yaklaşık 53.000 TL civarına çıkıyor.
*   **Masamdaki Gizli Formül: İkinci El RTX 3090 + Hızlı DDR5 Bellekler:** Doğrudan sıfır ve en pahalı parçalara koşmak yerine akıllıca bir hibrit sistem kurmak benim bu konudaki favori yöntemim. Kendi çalışma odamda kurduğum test sisteminde, ikinci elden temiz bir RTX 3090 ekran kartını yüksek hızlı DDR5-8000 belleklerle eşleştirdim. `llama.cpp` üzerinden modelin katmanlarının bir kısmını ekran kartı belleğine (VRAM), sığmayan kalan kısmını ise hızlı sistem belleğine (RAM) yükleyecek şekilde ayarladım. Bu sayede 130.000 TL'lik bir iş istasyonu maliyetine girmeden, neredeyse yarı fiyatına 70B'lik devasa modelleri gayet makul bir hızda koşturabiliyorum.

### Profesyonel Lig: Paraya Kıyıp Canavar Arayanlar (73.000 TL – 135.000 TL+ / $1.600–$3.000+)

Hedefiniz 70B ve üzeri devasa modelleri çalıştırmak, karmaşık mantık yürütme (reasoning) adımlarını yerelde halletmek ve tamamen size özel yerel ajanlar koşturmaksa, yüksek VRAM ve yüksek bellek bant genişliğine parayı basmak zorundasınız.

*   **Yeni Nesil Amiral Gemisi (RTX 5090 / 5080):** NVIDIA'nın Blackwell mimarisi ve ultra hızlı GDDR7 bellekleri bu işin zirvesi. RTX 5090'ın sunduğu 32 GB VRAM, büyük modellerin dilini çözüyor. Ülkemizde fiyatı vergilerle falan can yaksa da en tepe performansın adresi burası.
*   **Çift RTX 3090 Kurulumu:** Kasa toplamaktan, donanımla uğraşmaktan korkmayanlar için gizli bir cennet. İkinci elden bulacağınız iki adet RTX 3090 size toplamda 48 GB VRAM sunuyor. 70B'lik modelleri tamamen ekran kartı belleğinde, saniyede 15-20 kelime gibi muazzam bir hızla çalıştırmanın en hesaplı yolu hâlâ bu.
*   **Mac Studio M4 Ultra (64GB+ Birleşik Bellek):** "Ben bilgisayarın içini açmakla, sürücülerle, çift kartın ısısıyla uğraşamam, fişe takıp çalışsın" diyen profesyoneller için nihai çözüm. Tek sıkıntısı cüzdanda bırakacağı o derin yara.

---

## Hangi Seviye Sana Uygun? (Karşılaştırma Tablosu)

| Seviye | Yaklaşık Bütçe | En İyi F/P Cihazı | Model Kapasitesi | İdeal Kullanım Amacı |
| :--- | :--- | :--- | :--- | :--- |
| Giriş Seviyesi | 2.700 TL – 13.800 TL | Intel Arc B580 | 3B – 8B | Öğrenme ve Küçük Ajanlar |
| Orta Segment | 23.000 TL – 55.000 TL | RX 9070 XT / M4 | 13B – 34B | Kodlama ve Günlük Yardımcı |
| 70B Hibrit | ~50.000 TL | 2. El 3090 + DDR5 | 70B (Sıkıştırılmış) | Özel Mantık Yürütme |
| Profesyonel | 73.000 TL+ | RTX 5090 / Çift 3090 | 70B+ (Tam Hız) | Profesyonel İş Akışları |

---

## Bellek Boyutu ve Sıkıştırma (Quantization) Oranları 📊

| Model Boyutu | FP16 (Sıkıştırılmamış) | Q8 (8-bit Sıkıştırma) | Q4 (4-bit Sıkıştırma) | Minimum Ekran Kartı |
| :--- | :--- | :--- | :--- | :--- |
| 7B | 14-16 GB | 8-10 GB | 4-6 GB | RTX 4060 (8GB) |
| 13B | 26-30 GB | 15-18 GB | 10-14 GB | RX 9070 (16GB) |
| 34B | 68-75 GB | 38-45 GB | 20-25 GB | RTX 3090/4090 (24GB) |
| 70B | 140-160 GB | 75-85 GB | 35-45 GB | 2x RTX 3090 / RTX 5090 |

---

## Yazılım Tarafı: Bu Donanımı Nasıl Koşturacağız? ⚙️

Elinizde donanım ne kadar güçlü olursa olsun, doğru yazılımlarla beslemediğiniz sürece o kartlar kasada yatan pahalı birer oyuncaktan öteye gitmez. 2026 itibarıyla yerel yapay zeka dünyasında elimiz ayağımız olan üç ana araç var:

*   **[Ollama](https://ollama.com/){: target="_blank" rel="noopener noreferrer"}:** Geliştiriciler için can simidi. Kurulumu o kadar kolay ki, ekran kartı sürücüleriyle veya model dosyalarıyla uğraşmayı tamamen unutturuyor.
*   **[LM Studio](https://lmstudio.ai/){: target="_blank" rel="noopener noreferrer"}:** Görsel arayüz sevenler için en iyi seçenek. Model Bağlam Protokolü (MCP) desteği sayesinde, yereldeki modellerin kendi yerel dosyalarımızla güvenli şekilde konuşmasını sağlıyor. VS Code ve LM Studio entegrasyonuyla kendi kod asistanınızı sıfırdan kurmak isterseniz [Yerel AI Kurulum Rehberi (LM Studio & VS Code)](/yerel-ai-kurulum-rehberi-lm-studio-vs-code/) yazıma göz atabilirsiniz.
*   **[llama.cpp](https://github.com/ggerganov/llama.cpp){: target="_blank" rel="noopener noreferrer"}:** Neredeyse tüm yerel sistemlerin arkasındaki motor budur. Kendi hibrit sisteminizi kuracaksanız, ekran kartı belleği ile sistem belleği arasındaki dengeyi yönetmek için bu aracı kullanacaksınız.

Ekran kartı üzerinde modeli ayağa kaldırmak için terminalde şu komutu koşturmanız yeterlidir:

```bash
$ ollama run llama4
```

---

## Performansın Dibine Vurmak İçin Küçük Hileler 💡

1.  **Sıkıştırmayı (Quantization) Es Geçmeyin:** Modelleri sıkıştırılmamış (FP16) haliyle çalıştırmaya zorlamayın. Q4_K_M veya Q5_K_M gibi sıkıştırma formatlarında kaybolan kaliteyi fark etmek neredeyse imkansızken, hız ve bellek tasarrufu inanılmaz seviyelere ulaşıyor.
2.  **Kasa İçi Serinlik:** Çift ekran kartlı veya yüksek yük altında çalışan sistemlerde en büyük düşmanınız sıcaklıktır. Kartlar ısındıkça frekans kısar ve performansınız düşer. O yüzden bol fanlı, hava akışı ferah bir kasa seçin.
3.  **Hızlı Sistem Belleği Seçin:** Eğer bütçeniz kısıtlıysa ve modelin bir kısmını sistem RAM'ine aktarıyorsanız, DDR4 yerine yüksek hızlı **DDR5-8000** bellek tercih etmek saniyede üretilen kelime hızını ciddi oranda artırır.

---

## Peki Günün Sonunda Bu Macera Parasına Değer mi?

Gelin ufak bir hesap yapalım.

*   **Bulut Servisleri (GPT-4o/Claude 3.5)**: Bireysel kullanımda aylık API faturaları kolayca 2.000 TL ile 4.000 TL arasına ulaşabiliyor.
*   **Yerel Sistem**: 45.000 TL'lik bir orta seviye kurulum, kendini yaklaşık 12-18 ay içinde amorti eder. Üstelik elektrik faturası da eklense bile uzun vadede tamamen kârlıdır.

Daha da önemlisi, buluta bağımlı olmamanın getirdiği kafa rahatlığıdır. 2026 yılı Nisan ayındaki Anthropic kesintisinde gördüğümüz gibi, tüm iş akışını buluta bağlamak büyük bir risk. Uzun lafın kısası, yerelde çalışmak bulutun devasa işlem gücünü yakalamak anlamına gelmiyor. Ancak masanızın altında çalışan, internete bağımlı olmayan, verinizi dışarı sızdırmayan ve API faturası kesmeyen bir sistem kurmak inanılmaz derecede tatmin edicidir dostum. 🚀

Hadi kalın sağlıcakla!

---

[^1]: Büyük dil modellerinde her kelime üretildiğinde tüm model ağırlıkları bellekten işlemci çekirdeklerine aktarılır. Bu yüzden saniyede üretilen kelime hızını doğrudan bellek hızı belirler.
[^2]: Intel Arc serisi kartları yapay zekada kullanmak için Linux üzerinde Intel'in kendi oneAPI sürücülerini kurmanız gerekir. Kurulum adımları NVIDIA CUDA'ya göre biraz daha uğraştırıcıdır.
