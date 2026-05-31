Title: Devasa MoE Modellerine Kafa Tutan Cüce: Yerelde Qwen3.6-27B Kurulumu
Date: 2026-05-29 04:25
Category: Geliştirme Araçları
Tags: qwen, local llm, sglang, vllm, apple silicon, rtx 3090, rtx 5090, openclaw, yapay zeka
Slug: qwen-3-6-27b-yerel-kod-modeli-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Yapay zeka dünyasının en yeni gözdelerinden Qwen3.6-27B modelini yerel donanımlarda (RTX 3090/5090, Apple Silicon, AMD Strix Halo) nasıl çalıştıracağımızı ve kodlama ajanlarına nasıl bağlayacağımızı anlatıyorum.
Template: article
Lang: tr
Translation: false
Image: images/qwen36-27b-local.png

Yapay zeka dünyasında uzun süredir bize şu masal anlatılıyor hacı: Eğer yerel bilgisayarında veya sunucunda üst seviye (flagship) kodlama performansı istiyorsan, yüzlerce milyarlık devasa Mixture of Experts (MoE) modellerini kurmak zorundasın. Tabii bunun getirdiği karmaşık yönlendirme (routing) mantığı, sürücü (driver) kabusları ve küçük bir mahalleyi ısıtacak kadar çok GPU ihtiyacı da cabası. 🥵

Alibaba'nın 22 Nisan 2026'da çıkardığı **Qwen3.6-27B** modeli bu ezberi tamamen bozdu. Bu canavar, sadece 27 milyar parametreli yoğun (dense) bir mimari olmasına rağmen, 397 milyar parametrelik önceki nesil MoE bayrak gemisini (Qwen3.5-397B-A17B) kodlama ve yazılım ajanı benchmarklarında resmen ezdi geçti. Üstelik hiçbir karmaşık routing tablosu veya uzman yükleme derdi olmadan, evimizdeki emektar donanımlarda çalışabiliyor. 😎

Bu yazıda, bu ufak ama dişli modelin devasa MoE modellerine nasıl kafa tuttuğunu, hangi donanımlarda hangi kantizasyon (quantization) seviyesinde çalıştırabileceğimizi ve yerel kodlama ajanlarımıza (OpenClaw, Qwen Code, Claude Code) nasıl entegre edeceğimizi adım adım anlatıyorum.

## Devasa Bir MoE Modeli vs 27B Yoğun Mimari

Rakamlar gerçekten şaşırtıcı kardaş. Qwen3.6-27B, abisini sadece ufak bir farkla geçmekle kalmıyor; gerçek dünya geliştirici araçları için kritik olan tüm benchmarklarda ezici bir zafer kazanıyor.

Gerçek GitHub sorunlarını çözme yeteneğini ölçen **SWE-bench Verified** testinde Qwen3.6-27B, 397 milyarlık devasa MoE modelinin %76.2'lik skoruna karşılık **%77.2** alıyor. Model boyutları arasındaki 15 katlık farkı düşünürsek bu muazzam bir başarı. 🤯

Fark, uçbirim/terminal görevlerini test eden **Terminal-Bench 2.0** testinde daha da açılıyor: Qwen3.6-27B %59.3 alırken, MoE model %52.5'te kalıyor. Pratik yazılım mühendisliği görevlerini içeren **SkillsBench** testinde ise en büyük makas açılıyor: %48.2'ye karşılık %30.0. Kısacası, bu küçük model yazılımcıların günlük hayatta karşılaştığı karmaşık, kirli ve değişken kodlama işlerinde çok daha başarılı.

Peki bu nasıl oluyor? Yoğun (dense) mimariler, MoE modelleri gibi "uzman yönlendirme" döngüleriyle veya seyrek ağırlıkları belleğe yüklemekle vakit kaybetmez. ⚡ Her ileri geçişte (forward pass) tüm parametreler aktiftir. 27 milyar parametre sınırı, karmaşık mantık yürütme kalıplarını kodlamak için yeterince büyük, sıra dışı donanımlara ihtiyaç duymadan verimli çalışmak için ise yeterince küçüktür.

## Qwen3.6-27B Bize Neler Sunuyor?

Qwen3.6-27B sadece kod yazan bir model değil. Oldukça yetenekli ve çok yönlü bir özellik setine sahip:

* **Ajanlık Kodlama Yeteneği 🛠️:** Araç kullanımı (tool use), uzun vadeli planlama ve çoklu dosya düzenleme konularında çok başarılı. Claw-Eval testinde %72.4 alarak karmaşık geliştirici iş akışlarında gerçek bir yardımcı olabileceğini kanıtlıyor.
* **Görsel ve Multimodal Zeka 👁️:** Resim, video ve metinleri tek bir checkpoint üzerinden işleyebiliyor. Ekstra bir vizyon modeli yüklemenize gerek kalmıyor. Dokümantasyon şemaları veya ekran görüntüleri üzerinde rahatça analiz yapabiliyor.
* **Devasa Bağlam Penceresi 📄:** Yerel olarak 262.144 (262K) token desteği sunuyor. YaRN RoPE ölçeklendirmesiyle bu sınırı 1 milyon token seviyelerine kadar esnetmek mümkün.
* **Düşünme Modları (Thinking Mode) 🧠:** Akıl yürütme adımlarını `<think>...</think>` blokları içinde üreterek karmaşık sorgularda daha tutarlı cevaplar veriyor. Basit işlerde gecikmeyi (latency) düşürmek için bu modu kapatabilirsiniz.

## Yerel Donanım Seçenekleri ve Kurulum Adımları

Yoğun mimarisi sayesinde Qwen3.6-27B'yi bütçenize ve elinizdeki donanıma göre farklı şekillerde koşturabilirsiniz.

### 1. Bütçe Dostu Tek GPU (RTX 4090 / 24GB VRAM) 💰

Eğer elinizde tek bir RTX 4090 varsa, modeli INT4 veya GPTQ kantizasyonuyla çalıştırabilirsiniz. Model ağırlıkları bellekte yaklaşık 15-17 GB yer kaplar ve KV cache için bolca alan kalır.

vLLM ile çalıştırmak için:

```bash
vllm serve Qwen/Qwen3.6-27B-GPTQ-Int4 \
  --port 8000 \
  --max-model-len 131072 \
  --reasoning-parser qwen3
```

*Beklenen hız: Kısa bağlamlarda saniyede 15-30 token. Yerel kodlama asistanı olarak kullanmak için gayet yeterli.*

### 2. Orta Seviye Çift GPU (48GB VRAM) 🖥️

İki adet RTX 4090 veya benzer kapasitede bir donanımla modelin FP8 varyantını veya BF16 sürümünü rahatça çalıştırabilirsiniz. FP8, modelin akıl yürütme kalitesini bozmadan bellek ayak izini yarı yarıya düşürür.

SGLang ile çalıştırmak için:

```bash
python -m sglang.launch_server \
  --model-path Qwen/Qwen3.6-27B-FP8 \
  --port 8000 \
  --tp-size 2 \
  --mem-fraction-static 0.85 \
  --context-length 131072 \
  --reasoning-parser qwen3
```

*Beklenen hız: Saniyede 40-70 token. Bireysel geliştiriciler ve küçük ekipler için en ideal kurulum budur.*

### 3. Tek Kartın Gücü: RTX 5090 (32GB VRAM) 🚀

RTX 5090 (Blackwell mimarisi), Qwen3.6-27B çalıştırmak için tek kartlık en iyi seçenektir hacı. 32 GB VRAM sayesinde Q4_K_M GGUF modelini (yaklaşık 16.8 GB) belleğe yükledikten sonra bile KV cache için devasa bir alan kalır.

!!! warning "Dikkat! ⚠️ Blackwell sm_120 ve FP8 Uyumluluk Sorunları"
    Blackwell mimarisindeki bazı FP8 uyumsuzlukları nedeniyle SGLang üzerinde sorun yaşarsanız, geçici bir çözüm olarak radix cache özelliğini kapatmanız ve FP8 yerine BF16 KV cache kullanmanız gerekebilir[^1]. En temiz ve kararlı yol şimdilik llama-server üzerinden GGUF kullanmaktır:

```bash
llama-server \
  -hf unsloth/Qwen3.6-27B-GGUF:Q4_K_M \
  --no-mmproj \
  --fit on \
  -ngl 99 \
  -c 65536 \
  --flash-attn on \
  --cache-type-k q8_0 \
  --cache-type-v q8_0 \
  --jinja \
  --temp 0.6 \
  --top-p 0.95 \
  --top-k 20 \
  --reasoning on \
  --chat-template-kwargs '{"preserve_thinking": true}'
```

*Beklenen hız: Saniyede 25-30 token üretim, 50-70 token girdi işleme.*

### 4. İkinci Elin Kralı: RTX 3090 (24GB VRAM) 👑

RTX 3090, yerel yapay zeka geliştiricileri için hâlâ en mantıklı fiyat/performans seçeneğidir. 24 GB VRAM kapasitesi 4090 ile aynıdır. Q4_K_M kantizasyonunu 16.8 GB bellek kullanımıyla yükleyip, kalan 7 GB alanı 32K-64K bağlam penceresi için kullanabilirsiniz.

Ollama ile en hızlı çalıştırma yolu:

```bash
ollama pull qwen3.5:27b-q4_K_M
ollama run qwen3.5:27b-q4_K_M
```

*Not: Ollama için resmi Qwen3.6 desteği dağıtılmaya başlandı. Eğer 3.6 etiketini bulamazsanız, performans kıyaslaması yapmak için 3.5-27B sürümünü de deneyebilirsiniz.*

### 5. macOS Dünyası: Apple Silicon (MLX) 🍎

Mac kullanıyorsanız en temiz yol Apple'ın Metal altyapısıyla doğrudan konuşan MLX kütüphanesini kullanmaktır[^2]. Unsloth tarafından hazırlanan dinamik 4-bit MLX kantizasyonunu kullanabilirsiniz.

Donanım sınırı burada kritiktir: 24GB bellekli M3 Max modeli ucu ucuna kurtarır ancak hantal kalabilir. 🐌 Akıcı bir deneyim için en az 36GB M3 Max, 48GB M4 Pro veya daha üstü (64GB/128GB) modelleri tercih etmelisiniz.

```bash
pip install mlx-lm

# Düşünme modu açık şekilde çalıştırmak için:
python -m mlx_vlm.chat \
  --model unsloth/Qwen3.6-27B-UD-MLX-4bit \
  --chat-template-kwargs '{"enable_thinking":true}'
```

### 6. AMD Strix Halo APU 🎮

AMD'nin Strix Halo (Ryzen AI Max+ 395) platformu, 128 GB'a kadar birleşik (unified) LPDDR5X belleği paylaşan 16 Zen 5 çekirdeği ve 40-CU RDNA 3.5 grafik işlemcisiyle yerel AI için harika bir alternatif sunuyor. PCIe darboğazı veya VRAM sınırı olmadan, belleğin 64-96 GB'lık kısmını tamamen GPU'ya atayabilirsiniz.

ROCm altyapısını kullanarak llama.cpp derlemesi ve çalıştırma adımları:

```bash
# gfx1151 mimarisi için derleme yapıyoruz
cmake .. -DGGML_HIPBLAS=ON -DCMAKE_HIP_ARCHITECTURES="gfx1151"
make -j$(nproc)

# Sunucuyu başlatıyoruz
./llama-server \
  -m Qwen3.6-27B-Q4_K_M.gguf \
  -ngl 99 \
  -c 32768 \
  --flash-attn on \
  --host 0.0.0.0 \
  --port 8080
```

*Beklenen hız: Düşünme modu açıkken saniyede 10-12 token, kapalıyken 35-45 token.*

## Framework Versiyonları Çok Kritik!

Qwen3.6-27B modelini sorunsuz ve doğru çalıştırmak için kullandığınız kütüphanelerin güncel olması gerekir hacı. Sürüm uyuşmazlıkları hatalı çıktılara sebep olabilir:

* **SGLang**: >= 0.5.10
* **vLLM**: >= 0.19.0
* **Transformers**: >= 4.51.0 veya en güncel main branch

## Milyon Token Sınırını Zorlamak: YaRN Ayarı

Eğer 262K bağlam penceresinden daha fazlasına ihtiyacınız varsa, model klasöründeki `config.json` dosyasını açıp RoPE parametrelerini şu şekilde güncelleyebilirsiniz:

```json
{
  "mrope_interleaved": true,
  "mrope_section": [11, 11, 10],
  "rope_type": "yarn",
  "rope_theta": 10000000,
  "partial_rotary_factor": 0.25,
  "factor": 4.0,
  "original_max_position_embeddings": 262144
}
```

Aynı ayarı vLLM üzerinde doğrudan başlatma parametresi olarak da geçebilirsiniz:

```bash
VLLM_ALLOW_LONG_MAX_MODEL_LEN=1 vllm serve Qwen/Qwen3.6-27B \
  --tensor-parallel-size 8 \
  --max-model-len 1010000 \
  --hf-overrides '{"text_config": {"rope_parameters": {"mrope_interleaved": true, "mrope_section": [11, 11, 10], "rope_type": "yarn", "rope_theta": 10000000, "partial_rotary_factor": 0.25, "factor": 4.0, "original_max_position_embeddings": 262144}}}'
```

!!! warning "Dikkat! ⚡ YaRN Kısa Sorgularda Performansı Düşürebilir"
    YaRN ölçeklendirmesi sabit bir katsayı kullandığı için kısa metinlerde model kalitesini hafifçe etkileyebilir. Bu ayarı sadece gerçekten devasa kod tabanlarını analiz edeceğiniz zaman açmanızı öneririm.

## Yerel Kodlama Ajanlarına Bağlamak

Modeli ayağa kaldırdıktan sonra OpenAI veya Anthropic uyumlu API protokolleri üzerinden popüler ajanlara kolayca bağlayabiliriz.

### OpenClaw Entegrasyonu 🔌

Kendi sunucunuzda barındırabileceğiniz açık kaynaklı kodlama ajanı OpenClaw için `~/.openclaw/openclaw.json` ayar dosyasını şu şekilde güncelleyin:

```json
{
  "models": {
    "mode": "merge",
    "providers": {
      "local": {
        "baseUrl": "http://localhost:8000/v1",
        "apiKey": "EMPTY",
        "api": "openai-completions",
        "models": [
          {
            "id": "qwen3.6-27b",
            "name": "qwen3.6-27b",
            "reasoning": true,
            "input": ["text", "image"],
            "contextWindow": 131072,
            "maxTokens": 32768
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "local/qwen3.6-27b"
      }
    }
  }
}
```

### Qwen Code Kurulumu 💻

Alibaba'nın Qwen modelleri için özel olarak tasarladığı terminal ajanı Qwen Code'u kurup hemen kullanmaya başlayabilirsiniz:

```bash
npm install -g @qwen-code/qwen-code@latest
qwen
# Terminal arayüzünde: /auth komutuyla yerel endpoint adresinizi girin
```

### Claude Code ile Yerel Model Kullanmak 📡

Eğer Claude Code kullanmayı tercih ediyorsanız, ortam değişkenlerini yerel API sunucunuza yönlendirerek Qwen3.6-27B'yi Claude gibi davranmaya ikna edebilirsiniz:

```bash
export ANTHROPIC_MODEL="qwen3.6-27b"
export ANTHROPIC_SMALL_FAST_MODEL="qwen3.6-27b"
export ANTHROPIC_BASE_URL="http://localhost:8000/v1"
export ANTHROPIC_AUTH_TOKEN="EMPTY"
claude
```

## Modelin Gerçekçi Sınırları ve Eksi Yönleri

Tabii ki her şey güllük gülistanlık değil hacı. Bu modeli kurmadan önce şu detayları da bilmeniz gerekiyor:

* **Güç Tüketimi 🌡️:** Yoğun (dense) mimariler her ileri geçişte tüm parametreleri çalıştırdığı için, aktif parametre sayısı az olan MoE modellerine göre sunucuda çok daha fazla elektrik tüketir ve kartları daha çok ısıtır.
* **Donanım Sınırı:** Her ne kadar küçük desek de kantize edilmiş hali bile en az 24 GB VRAM kapasiteli bir ekran kartı gerektirir. Giriş seviyesi bilgisayarlarda veya düşük donanımlı dizüstü bilgisayarlarda akıcı çalıştırmak zordur.
* **Ekosistem Olgunluğu:** Model çok yeni olduğu için topluluk tarafından üretilen ince ayarlar (fine-tunes) ve araç entegrasyonları henüz yolun başında.

Yerel donanımınızda tam veri gizliliğiyle, bulut servislerine bağımlı kalmadan ve API faturası ödemeden çalışmak istiyorsanız Qwen3.6-27B şu an piyasadaki en dişli yerel seçeneklerden biridir.

Hadi kalın sağlıcakla! 👋

---

### 🔗 Laboratuvardan Diğer Notlar

Yapay zeka modellerini yerelde koştururken ve terminal araçlarını kurcalarken işinize yarayacak diğer tecrübelerim de şurada:

* [Qwen 3 ve Qwen3-Coder-Plus Üzerinde MCP Server’ları Aktif Etme](/qwen3-mcp-server-aktif-etme/)
* [Aylık Aboneliklere Elveda: Kendi Bilgisayarınızda Bedava ve Özel AI Rehberi](/yerel-ai-kurulum-rehberi-lm-studio-vs-code/)
* [Arch Linux'ta Ollama ve WebUI Kurulumu (Docker ile)](/arch-linux-ollama-webui-kurulumu-docker/)
* [MCP Puppeteer Sunucusu Kurulumu](/mcp-puppeteer-sunucusu-kurulumu/)
* [Şişko Docker İmajlarına Diyet: 1.2 GB'tan 78 MB'a Yolculuk](/docker-imaj-boyutu-kucultme-rehberi/)

[^1]: CloudRift ekibinin Blackwell (sm_120) donanımlarında yaptığı testlerde ortaya koyduğu SGLang geçici çözümlerine göre, FP8 yerine BF16 KV cache kullanılması ve radix cache özelliğinin devre dışı bırakılması kararlılık sorunlarını çözmektedir.
[^2]: Apple Silicon üzerinde MLX, Metal API'sine doğrudan eriştiği için klasik llama.cpp / GGUF derlemelerine göre daha düşük gecikme süresi ve daha yüksek verim sunar.
