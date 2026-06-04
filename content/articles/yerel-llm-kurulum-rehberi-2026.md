Title: Kendi Sunucunda Yapay Zeka (2026): Gizlilik ve Tasarruf İçin Yerel LLM Rehberi
Date: 2026-06-04 22:45
Category: Geliştirme Araçları
Tags: yapay-zeka, yerel-llm, ollama, llama-cpp, vllm, rehber
Slug: yerel-llm-kurulum-rehberi-2026
Authors: yuceltoluyag
Status: published
Summary: 2026 yılında kendi sisteminizde yapay zeka modellerini çalıştırmanın yollarını, donanım gereksinimlerini ve en verimli yazılımları (Ollama, llama.cpp, vLLM) inceliyoruz.
Template: article
Lang: tr
Translation: false

Dün akşam bizim ufaklıkları uyuttuktan sonra, masanın üzerindeki çayımdan bir yudum alıp yerel yapay zeka kurulumlarımı kurcalamaya başladım. 💻 Bulut servislerine giden verilerin gizliliği ve her ay kabaran API faturaları bir süredir kafamı kurcalıyordu. Kendi kendime, "Neden tüm bu asistanlık işlerini kendi yerel sunucumuzda halletmiyoruz?" dedim.

Bu rehber; verilerinin dışarı çıkmasını istemeyen, gizliliğe önem veren geliştiricileri, API faturalarından kurtulmak isteyenleri ve kendi donanımının sınırlarını zorlamaktan keyif alan herkesi ilgilendiriyor. Yazının sonunda, 2026 itibarıyla yerel yapay zeka dünyasının ne durumda olduğunu, Ollama, llama.cpp ve vLLM gibi popüler araçları nasıl kullanacağımızı ve donanım gereksinimlerini net bir şekilde göreceksiniz dostum. 🚀

---

## Neden 2026'da Kendi Sunucumuz? 💰

Yerel yapay zeka dünyasında dengeler tamamen değişti. Bulut servislerinin (GPT-4 ve Claude gibi) yoğun kullanımda aylık API faturaları kolayca 500 doları (yaklaşık 23.000 TL) aşabiliyor.[^1] İlk etapta donanım yatırımı yüksek gibi görünse de, düzenli kullanımda sistem kendini çok hızlı amorti ediyor. Bu kurulumlar için bütçenize en uygun ekran kartını seçmek kritik önem taşıyor; ekran kartı modelleri ve bütçe segmentleri hakkında detaylı incelemem için [Yerel LLM'ler İçin En İyi Ekran Kartları (2026)](/yerel-llmler-icin-en-iyi-gpu-2026/) yazıma göz atabilirsiniz.

En önemlisi de gizlilik artık lüks değil, bir zorunluluk. Yazdığınız kodların, şirket belgelerinizin veya kişisel sohbetlerinizin büyük teknoloji şirketlerinin modellerini eğitmek için kullanılmasını kim ister?

Modeller de inanılmaz gelişti. Sıkıştırma (quantization) teknikleri sayesinde yerelde koşan 13B (milyar parametreli) bir model, çoğu günlük iş akışında eski GPT-3.5 seviyesini rahatlıkla geride bırakıyor. Çoğu zaman dünyanın en büyük modeline değil, işinizi tıkır tıkır halledecek doğru modele ihtiyacınız var.

---

## Yerel Yapay Zekanın Üç Büyük Aracı ⚙️

### 1. Ollama — Kolaylık Arayanlar İçin (Tek Komutla Kurulum)

[Ollama](https://ollama.com/){: target="_blank" rel="noopener noreferrer"} yerel dünyayı tamamen değiştirdi. Kurulumu tek satır, çalıştırması tek satır. Modeli arka planda indirmeyi, ekran kartı (GPU) belleğine yerleştirmeyi ve yerel bir sunucu gibi ayağa kaldırmayı tamamen kendi hallediyor.

```bash
# Kurulum (Linux ve macOS)
$ curl -fsSL https://ollama.com/install.sh | sh

# Modeli çalıştırma
$ ollama run llama3.2

# Yüklü modelleri listeleme
$ ollama list
```

Ollama; Windows, macOS ve Linux üzerinde ekran kartı ivmelendirmesini otomatik olarak algılayıp kullanıyor. Kütüphanesinde kullanıma hazır yüzlerce model barındırıyor.

*   **En İyi Kullanım Yeri:** Hızlıca ayağa kalkmak ve karmaşık ayarlarla uğraşmadan hemen kodlamaya başlamak isteyenler.

### 2. llama.cpp — Maksimum Performans ve İnce Ayar

[llama.cpp](https://github.com/ggerganov/llama.cpp){: target="_blank" rel="noopener noreferrer"} yerel yapay zeka ekosisteminin en temel motorudur. C++ ile tamamen sıfırdan yazılmış, tüketici donanımlarında maksimum verim elde etmek için tasarlanmış bir yapıdır.

```bash
# Depoyu klonlayıp derleme
$ git clone https://github.com/ggerganov/llama.cpp
$ cd llama.cpp
$ make

# Sıkıştırılmış GGUF modelini çalıştırma
$ ./llama-cli -m models/llama-7b-q4_k_m.gguf -n 256
```

llama.cpp çok daha fazla sıkıştırma formatını destekliyor ve kaynak tüketimi konusunda inanılmaz derecede cimri davranıyor.

*   **En İyi Kullanım Yeri:** Sınırlı donanımda en yüksek hızı elde etmek ve bellek paylaşımını milimetrik ayarlamak isteyen profesyoneller.

### 3. vLLM — Üretim Odaklı ve Çok Kullanıcılı Sistemler

[vLLM](https://vllm.ai/){: target="_blank" rel="noopener noreferrer"} işi büyütmek isteyenler için biçilmiş kaftan. "PagedAttention" teknolojisi sayesinde aynı anda birden fazla kullanıcının isteklerini çok daha yüksek kelime üretim hızıyla yanıtlayabiliyor.

```bash
# Hugging Face üzerindeki modeli vLLM ile sunma
$ python3 -m vllm.entrypoints.openai.api_server \
    --model meta-llama/Llama-3.1-8B-Instruct \
    --dtype half \
    --tensor-parallel-size 2
```

*   **En İyi Kullanım Yeri:** Birden fazla kullanıcının bağlanacağı sunucular ve yüksek trafikli üretim sistemleri.

---

## Donanım Gereksinimleri Neler? 📊

Yerelde model çalıştırmanın en kritik noktası ekran kartınızın belleğidir (VRAM).

| Model Boyutu | Gereken VRAM | Ekran Kartı Örnekleri | İdeal Kullanım Amacı |
| :--- | :--- | :--- | :--- |
| **7B** | 6 - 8 GB | RTX 3060, RTX 4070 | Kişisel asistanlık, basit kodlama yardımı |
| **13B / 14B** | 10 - 16 GB | RTX 4080, RTX 3090 | Günlük yazılım işleri, daha iyi mantık yürütme |
| **32B / 34B** | 24 - 32 GB | RTX 4090, A6000 | Karmaşık kodlama ve yüksek kaliteli analizler |
| **70B** | 80 GB+ | A100, H100 (veya 2x RTX 3090) | Derin araştırma, kurumsal seviye çözümler |

**Model Sıkıştırma (Quantization):**
Modelleri yerel sistemlere sığdırmanın formülü sıkıştırmadır. Q4 (4-bit) sıkıştırma, model kalitesinden neredeyse ödün vermeden dosya boyutunu %75 oranında küçültür. Q5 sıkıştırma ise hız ve zeka dengesi için en ideal noktadır. Q8 sıkıştırma ise orijinal modele en yakın kaliteyi sunar ama bellek gereksinimi iki katına çıkar.

### 2026 İçin GPU Tavsiyeleri

*   **Bütçe Dostu:** NVIDIA RTX 3060 12GB. Türkiye piyasasında yaklaşık 17.400 TL bandında bulunabiliyor. 7B modelleri çok rahat, 13B modelleri ise sıkıştırılmış olarak çalıştırır.
*   **Fiyat/Performans Zirvesi:** NVIDIA RTX 4090 24GB. Yaklaşık 130.000 TL fiyatı olsa da, 32B-34B sıkıştırılmış modelleri yüksek hızda koşturmanın en profesyonel yoludur.
*   **İleri Seviye (Pro):** NVIDIA RTX 6000 Ada 48GB. Yaklaşık 310.000 TL. 70B sıkıştırılmış modelleri tek başına sırtlar.
*   **Sunucu Sınıfı:** NVIDIA A100 80GB veya H100. Tamamen kurumsal ve üretim odaklı projeler için.

---

## Ollama Kurulumu (En Kolay Yol) 🛠️

Yerel yapay zekaya en hızlı yoldan adım atmak istiyorsanız buradan başlayın.

```bash
# 1. Ollama'yı indirin ve kurun
$ curl -fsSL https://ollama.com/install.sh | sh

# 2. Model dosyasını çekin
$ ollama pull llama3.2

# 3. Modeli terminalde çalıştırın
$ ollama run llama3.2

# 4. Sunucu modunda arka planda başlatmak için
$ ollama serve
```

Artık yerel yapay zekanız hazır.

### Python İle Yerel Modelimizi Konuşturmak

```python
import ollama

response = ollama.chat(
    model='llama3.2',
    messages=[
        {'role': 'user', 'content': 'Faktöriyel hesaplayan bir Python fonksiyonu yazar mısın?'}
    ]
)

print(response['message']['content'])
```

### OpenAI SDK Uyumluluğu

Ollama arkada OpenAI API standartlarına uyumlu bir uç nokta sunar. Böylece mevcut projelerinizde sadece adresi değiştirerek yerel modele geçebilirsiniz:

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Sahte bir anahtar yeterlidir
)

response = client.chat.completions.create(
    model="llama3.2",
    messages=[{"role": "user", "content": "Selam!"}]
)
```

---

## llama.cpp Kurulumu (Maksimum Denetim) ⚙️

Daha fazla kontrol ve performans istiyorsanız, doğrudan llama.cpp üzerinden devam edin.

```bash
# 1. Projeyi klonlayın ve derleyin
$ git clone https://github.com/ggerganov/llama.cpp
$ cd llama.cpp
$ make

# 2. Hugging Face üzerinden indirdiğiniz GGUF modelini models/ klasörüne yerleştirin.

# 3. Belirli sıkıştırma ve hafıza ayarlarıyla çalıştırın
$ ./llama-cli \
  -m models/llama-7b-q4_k_m.gguf \
  -n 512 \
  -c 4096 \
  --temp 0.7
```

### GGUF Model Dosyalarını Nerede Buluruz?

Hugging Face üzerinde "GGUF" araması yapıp model boyutuna göre filtreleyebilirsiniz. Popüler seçenekler:

*   **Qwen 2.5:** Son dönemin en yetenekli modellerinden, farklı boyutları mevcut. (Yerelde Qwen tabanlı bir modeli kod asistanı olarak ayağa kaldırmak isterseniz [Qwen 3.6 Yerel Kod Modeli Kurulumu](/qwen-3-6-27b-yerel-kod-modeli-kurulumu/) rehberim size yardımcı olacaktır).
*   **Llama 3.2:** Meta'nın resmi olarak sunduğu hafif ve hızlı modeller.
*   **Phi-3:** Microsoft'un küçük ama işlevi büyük modelleri.
*   **Mistral:** Boyutuna göre sunduğu zeka dengesiyle meşhur.

2026 yılında yerel olarak koşturabileceğiniz en başarılı açık kaynaklı modellerin detaylı zeka ve performans karşılaştırmaları için [En İyi Yerel LLM Modelleri (2026)](/en-iyi-yerel-llm-modelleri-2026/) incelememe bakabilirsiniz.

---

## Kurulumu Uçuracak Performans İpuçları 💡

*   **Ekran Kartı (GPU) Desteğini Aktif Etmek:**
    Yapay zekayı ekran kartı (GPU) yerine sadece işlemciyle (CPU) çalıştırmaya zorlamak, spor arabayı el freni çekik şekilde yokuş yukarı sürmeye çalışmak gibidir.[^2] llama.cpp kullanıyorsanız, derleme yaparken CUDA desteğini mutlaka açın:
    ```bash
    $ make LLAMA_CUDA=1
    ```
*   **Hafıza ve Bağlam Genişliği (Context Length):**
    Modeller varsayılan olarak 4K (4096 token) hafıza limitiyle açılır. Çoğu ekran kartında bunu 8K veya 16K'ya çekebilirsiniz. Ancak 32K ve üzerine çıkmak ciddi oranda VRAM tüketecektir.
    ```bash
    # Ollama üzerinde bağlamı 8K yapmak için:
    $ ollama run llama3.2 -c 8192
    ```
*   **Bir Seferde İşlenen Veri Adeti (Batch Size):**
    Modelin girdi prompt'unu işleme hızını artırmak için bu değeri yükseltebilirsiniz. Eğer ekran kartınızda yer varsa varsayılanı 512'ye çıkarabilirsiniz.
    ```bash
    $ ./llama-cli -b 512 -m model.gguf
    ```

---

## Bulut API Servisleri vs. Yerel Kurulum

| Faktör | Bulut API Servisleri | Yerelde Barındırma |
| :--- | :--- | :--- |
| **Kurulum Süresi** | Birkaç dakika | Birkaç saat |
| **Düşük Kullanımda Maliyet** | Kullandığın kadar öde | Donanım yatırımı gerektirir |
| **Yoğun Kullanımda Maliyet** | Yüksek aylık faturalar (yaklaşık 23.000 TL+) | Yalnızca elektrik faturası (aylık yaklaşık 500 - 1.500 TL)[^3] |
| **Veri Gizliliği** | Verileriniz buluttaki sunuculara gider | %100 yerel ve gizli |
| **Özelleştirme Esnekliği** | Sadece sunulan modellerle sınırlı | İstediğiniz model, istediğiniz ince ayar |
| **Bakım & İşletim** | Bakım gerektirmez | Güncellemeler ve donanım bakımı gerekir |
| **Saf Zeka Seviyesi** | En son çıkan dev modeller | Donanımınızın gücüyle sınırlı |

---

## Popüler Kurulum Reçeteleri 💡

*   **Bütçe Dostu Kodlama Asistanı:** RTX 3060 + Ollama + Llama 3.2 7B. Arka planda sıfır gürültüyle çalışır, kodlama sorularınızı yanıtlar ve kodları gözden geçirir.
*   **Orta Segment Geliştirici Makinesi:** RTX 4090 + Ollama + Karma modeller. Zor işler için 13B/14B, hızlı sohbetler için 7B. Yanında Stable Diffusion ile görsel üretimi de yapabilirsiniz.
*   **Ev Sunucusu (Meraklısına):** Threadripper İşlemci + Çoklu RTX 4090 + vLLM. Tüm ailenin veya küçük bir yazılım ekibinin aynı anda kullanabileceği yerel yapay zeka sunucusu. Kendi yerel dökümanlarınızla eğitebilirsiniz.

---

## Yerel Kuruluma Ne Zaman Gerek Yok?

Eğer her zaman dünyanın en zeki ve en güncel modellerini (GPT-4, Claude 3.5 Opus vb.) kullanmak zorundaysanız bulut servislerinden şaşmayın. Ayda yılda bir kez yapay zekaya soru soran biriyseniz yine API kullanmak daha hesaplıdır. Teknik işlerle uğraşmaktan hoşlanmıyorsanız kurulum süreçleri size yorucu gelebilir.

---

## Güvenlik Önlemleri 🔒

Yerelde çalışmak verinizi dışarıya kapatır ama güvenliği elden bırakmamak lazım:
1.  Kaynağını bilmediğiniz, Hugging Face üzerinde kimin paylaştığı belirsiz model dosyalarını sisteminize indirmeyin.
2.  Çalıştırdığınız arayüz yazılımlarını düzenli güncelleyin.
3.  Mümkünse yapay zeka sunucusunu evdeki diğer kritik ağlardan ve hassas sistemlerden izole edin.

---

## Sadede Gelirsek

2026 yılı itibarıyla yerel yapay zeka çalıştırmak artık sadece bir hobi değil, gizlilik ve bütçe yönetimi için çok mantıklı bir adım haline geldi. Ollama ile başlayıp sisteminizin sınırlarını görmek en mantıklı yol olacaktır dostum. 🚀

Günün sonunda yerel modeller bulutun devasa işlem gücünü tamamen yakalayamasa da, kendi kontrolünüzde olan, internet kesilse bile tıkır tıkır çalışan bir yapay zekaya sahip olmak paha biçilemez.

Hadi kalın sağlıcakla!

---

[^1]: Yoğun kullanım senaryolarında, bulut sağlayıcılara ödenen para zamanla kendi donanımınızı kurma maliyetini geride bırakır.
[^2]: Yapay zekayı ekran kartı (GPU) yerine sadece işlemciyle (CPU) çalıştırmaya zorlamak, spor arabayı el freni çekik şekilde yokuş yukarı sürmeye çalışmak gibidir.
[^3]: Türkiye'de ev tipi (mesken) elektrik fiyatları kademelidir. EPDK'nın 2026 tarifelerine göre, vergiler dahil 1 kWh elektrik maliyeti ortalama 3,24 TL ile 5,46 TL arasında değişmektedir. Günde ortalama 8 saat tam yükte çalışan tek GPU'lu bir geliştirici iş istasyonu aylık yaklaşık 120-150 kWh arası tüketim yapar ve faturaya yansıması bu aralığa denk gelir.
