Title: Aylık Aboneliklere Elveda: Kendi Bilgisayarınızda Bedava ve Özel AI Rehberi
Date: 2026-05-14 22:50
Category: Geliştirme Araçları
Tags: yerel ai, lm studio, vs code, continue, llm, vram, gpu, yapay zeka
Slug: yerel-ai-kurulum-rehberi-lm-studio-vs-code
Authors: yuceltoluyag
Summary: ChatGPT ve Claude'a her ay dolarla para bayılmaktan bıktınız mı? Kendi donanımınızda, tamamen gizli ve bedava çalışan bir AI ekosistemi kuruyoruz. (Masterclass Rehber)
Image: images/yerel-ai-kurulum-rehberi-lm-studio-vs-code-lg.webp
Lang: tr
toot: https://mastodon.social/@yuceltoluyag/116592522870749506
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3jfw7xd22f
Status: published

Hadi dürüst olalım; AI abonelik fiyatları artık şirazesinden çıktı. Her ay 20-30 doları ChatGPT'ye, Claude'a veya API ücretlerine bayılmak, özellikle bizim gibi kur farkıyla boğuşan memleket insanı için resmen bir baş ağrısı dostum. 🤯 Üstelik verilerinizin o uzak sunucularda ne yapıldığı da tam bir muamma.

Geçenlerde "Ben neden bu işi kendi mutfağımda yapmıyorum?" diyerek bir tavşan deliğine daldım. Sonuç: Bilgisayarımda tamamen gizli, internete ihtiyaç duymayan ve en önemlisi **bedava** çalışan bir AI asistanı. Sadece chat de değil; VS Code içinde otomatik tamamlama (autocomplete) ve tam teşekküllü ajan moduyla birlikte.

Bugün size bu işin "Masterclass" kıvamında detaylarını anlatacağım. Donanımınız ne olursa olsun, bu işin mantığını kavradığınızda her sistemde akıcı bir AI çalıştırabilirsiniz. Eğer sadece masaüstü uygulamalarıyla sınırlı kalmayıp kendi sunucunuzu kurmak ve terminalden ilerlemek isterseniz, [Kendi Sunucunda Yapay Zeka (2026)](/yerel-llm-kurulum-rehberi-2026/) başlıklı detaylı rehberime de göz atabilirsiniz.

## 🧠 Bölüm 1: Yerel AI Nasıl Çalışır? (VRAM Meselesi)

Bir modelin performansını belirleyen iki ana unsur vardır: **Parametre sayısı** (beyin büyüklüğü) ve **Context Size** (hafıza kapasitesi). 862 milyar parametrelik bir canavarı evdeki bilgisayarda koşturamazsınız, ama donanımınıza uygun şekilde yapılandırılmış modellerle harikalar yaratabilirsiniz.

İşin sırrı ekran kartınızdaki (GPU) **VRAM** miktarında yatıyor. Sisteminiz için en doğru kartı seçmek isterseniz, [Yerel LLM'ler İçin En İyi Ekran Kartları (2026)](/yerel-llmler-icin-en-iyi-gpu-2026/) yazımda tüm seçenekleri detaylıca inceledim. ⚡

!!! tip "İpucu: VRAM vs. Sistem RAM"
    Modeli çalıştırdığınızda, tüm parametreler ekran kartınızın VRAM'ine doluşur. Eğer 16 GB VRAM'iniz varsa ve model 17 GB istiyorsa, kalan 1 GB normal bilgisayar RAM'ine taşar. [^2] Bu taşma olduğunda hızınız 120 km/h'den, kağnı hızına (20-30 tokens/sec) düşer. Yani ana kural: Modeli VRAM'e sığdır!

Eğer Mac kullanıyorsanız (M1/M2/M3), işiniz daha kolay çünkü Apple "Unified Memory" (birleşik bellek) kullanıyor. Yani sistemdeki 32 GB RAM'in büyük kısmını AI doğrudan "VRAM gibi" kullanabiliyor.

## 🛠️ Bölüm 2: LM Studio ile İlk Adım

En hızlı ve temiz başlangıç için **LM Studio**'yu öneririm. Kullanıcı arayüzü o kadar başarılı ki, hangi modelin sisteminizde ne kadar yer kaplayacağını (GPU offload) size açıkça gösteriyor.

1.  **LM Studio İndir:** [LM Studio Resmi Sitesi](https://lmstudio.ai/){: target="\_blank" rel="noopener noreferrer"}
2.  **Model Ara:** Arama kısmına `Qwen` veya `Llama` yazın. Hangi modeli seçeceğinizden emin değilseniz, en güncel kıyaslamalar için [En İyi Yerel LLM Modelleri (2026)](/en-iyi-yerel-llm-modelleri-2026/) rehberime göz atabilirsiniz. 
3.  **Quantization (Sıkıştırma) Seç:** İşte burası can alıcı nokta. Modelleri "ham" haliyle (FP16) indirmeyin. **Q4** veya **Q6** gibi sıkıştırılmış versiyonları seçin. [^1]

!!! note "Not: Quantization Nedir?"
    Büyük bir modeli, performansından çok az ödün vererek boyutunu yarı yarıya küçültme işlemidir. Q4 (4-bit) genelde "tatlı noktadır"; hem akıllı kalır hem de orta halli bir ekran kartına sığar.

## 💻 Bölüm 3: VS Code Entegrasyonu (Continue Extension)

Chat yapmak güzel ama asıl verim, kod yazarken o AI'nın parmaklarınızın ucunda olmasıyla geliyor. Bunun için VS Code'da **Continue** eklentisini kullanıyoruz.

- **Autocomplete için:** Çok küçük modeller seçin (örneğin 1.5B parametrelik Qwen-Coder). Çünkü tamamlama işleminin anlık olması lazım.
- **Agent/Chat için:** Daha büyük modeller (9B veya 14B) kullanabilirsiniz.

### Yapılandırma (config.json)
Continue ayarlarında `provider` olarak `lm-studio` seçip, LM Studio'nun sunduğu yerel sunucu adresini (`http://localhost:1234/v1`) girmeniz yeterli. Artık VS Code içinde kendi "GitHub Copilot" alternatifinizi bedavaya kullanıyorsunuz. 😎

## 📊 Yerel vs. Bulut: Hangisi Daha Akıllı?

Birçok kişi "Yerel modeller Claude kadar zeki mi?" diye soruyor. Kendi yaptığım **Sudoku Uygulaması** testinde şunu gördüm:
- **Claude Sonnet 3.5:** 9 dakikada sıfır hatayla uygulamayı yazdı.
- **Yerel Qwen 2.5 (32B):** Yine yaklaşık 9-10 dakikada benzer kalitede bir çıktı verdi.

Hız farkı var mı? Evet, bulut modelleri devasa sunucu parkurlarında daha hızlı cevap veriyor ama yerel AI da hata ayıklama (debug) ve genel kodlama işlerinde artık "yeterince iyi" seviyesini çoktan geçti.

## 🏁 Sadede Gelirsek

Aylık abonelikleri iptal edip, o parayı biriktirerek 2-3 ay içinde kendinize sağlam bir ekran kartı (örneğin 16GB VRAM'li bir RTX 4060 Ti veya 4070) alabilirsiniz. Bu kart size ömür boyu **bedava ve sınırsız** AI kullanımının kapısını açar.

Verileriniz bilgisayarınızda kalsın, cüzdanınızdaki para da cebinizde. Kendi yerel AI kurulumunu başlatmak için bugünden daha iyi bir zaman yok dostum.

[^1]: Konuyla ilgili daha fazla teknik detay için [HuggingFace](https://huggingface.co/){: target="\_blank" rel="noopener noreferrer"} üzerindeki model kartlarını inceleyebilirsiniz.
[^2]: Yerel AI kurarken karşılaştığınız "out of memory" hataları için sisteminizdeki diğer GPU kullanan programları (tarayıcı vb.) kapatmayı deneyin.
