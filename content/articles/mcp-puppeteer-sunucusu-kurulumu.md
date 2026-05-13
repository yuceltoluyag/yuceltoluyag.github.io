Title: MCP ile Tarayıcı Otomasyonunu Kolayca Başlatın: Puppeteer Sunucusu Kurulumu
Date: 2025-04-17 14:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: mcp, puppeteer, npx, browser automation, nodejs, tarayıcı otomasyonu, yapay zeka, mcp kurulumu
Slug: mcp-puppeteer-sunucusu-kurulumu
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: MCP (Model Context Protocol) kullanarak tarayıcı otomasyonuna başlamak artık çok kolay! Bu rehberde, tek bir npx komutuyla Puppeteer destekli bir MCP sunucusunun nasıl çalıştırılacağını adım adım öğrenin.
Template: article
Image: images/mcp-puppeteer-sunucusu-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114987857795740048
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvsvqk5rnk2n

**MCP (Model Context Protocol)** kullanarak _tarayıcı otomasyonuna_ başlamak mı istiyorsun? Kafa karıştırıcı kurulum adımlarını unut! Bu rehberde, sadece tek bir `npx` komutuyla **Puppeteer destekli bir MCP sunucusunun nasıl çalıştırılacağını** adım adım göstereceğim. Üstelik tüm işlemler Windows ortamında! 💻

Makaleyi sonuna kadar okuduğunda, sen de LLM’lerin (Large Language Models) gerçek bir tarayıcı üzerinden nasıl işlem yaptığını anlayacak, kendi geliştirme ortamına kolayca entegre edebileceksin.

---

## MCP Nedir ve Neden Önemlidir?

**Model Context Protocol (MCP)**, yapay zeka modellerinin çeşitli bağlam sağlayıcılarla (kod editörü, terminal, tarayıcı vb.) iletişim kurmasını kolaylaştıran bir protokoldür.

Peki neden bu kadar önemli?

- 🤖 LLM'lerin tarayıcıda gezinmesini sağlar.
- 🧠 Gelişmiş kod tamamlama ve dokümantasyon yetenekleri sunar.
- 🔧 Uçtan uca entegrasyonla üretkenliği artırır.

---

## Puppeteer Nedir?

[Puppeteer](https://pptr.dev/){: target="\_blank" rel="noopener noreferrer"} bir Node.js kütüphanesidir ve Chrome/Chromium tarayıcısını programatik olarak kontrol etmene olanak tanır.

Puppeteer ile:

- Web sayfalarında gezinebilir,
- Ekran görüntüleri alabilir,
- Formlar doldurabilir,
- Sayfa içeriğini tarayabilirsin.

Ve MCP sayesinde, bunu LLM'lere devretmek mümkün!

---

## Problem: Hızlı Kurulumun Eksikliği

Tarayıcı otomasyonunu başlatmak için genellikle karmaşık yapılandırmalar gerekir. Yeni başlayanlar için bu, caydırıcı olabilir.

Ayrıca yanlış `npx` komutu, `entrypoint not found` gibi hatalarla seni uğraştırabilir. Bu rehberin amacı, bu sorunu **basit ve çalışır bir çözümle** ortadan kaldırmak.

---

## Çözüm: Tek Komutla Puppeteer Sunucusunu Başlatmak ✅

### 1. Ön Koşullar

Aşağıdaki yazılımların sistemine kurulu olduğundan emin ol:

- **Node.js** (en az v18+)
- `npx` komutu (Node ile birlikte gelir)

Kontrol etmek için terminale şunu yaz:

```bash
node -v
npx -v
```

---

### 2. `npx` ile Sunucuyu Başlatmak

Komut çok basit. Windows ortamında terminali aç ve aşağıdakini yaz:

```bash
npx -y @modelcontextprotocol/server-puppeteer
```

🚀 Bu komut, gerekli paketi indirir ve tarayıcı destekli MCP sunucusunu başlatır. Doğru çalıştığında terminalde şuna benzer bir çıktı görürsün:

```text
[MCP] Puppeteer server listening on port 4455...
```

Tarayıcı da otomatik olarak açılır (headless değil).

---

### 3. YAML ile Konfigürasyon (İsteğe Bağlı)

Gelişmiş kullanım için `mcpServers` bloklarına bu sunucuyu ekleyebilirsin:

```yaml
mcpServers:
  - name: puppeteer
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@modelcontextprotocol/server-puppeteer"
```

Continue eklentisinde şu şekilde kullanıyorum,ollama ile birlikte

```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: deekseek-r1
    provider: ollama
    model: deepseek-r1
  - name: Qwen 2.5 Coder 7b
    provider: ollama
    model: qwen2.5-coder:7b
    roles:
      - autocomplete
context:
  - provider: code
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
docs:
  - name: Pelican
    faviconUrl: ""
    startUrl: https://docs.getpelican.com/en/latest/quickstart.html

mcpServers:
  - name: browser-tools
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@agentdeskai/browser-tools-mcp@1.2.0"
  - name: puppeteer
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@modelcontextprotocol/server-puppeteer"
```

Bu sayede config tabanlı başlatmalar mümkün olur. 🔧

---

## Sık Karşılaşılan Hatalar ve Çözümleri 🧯

### `mcp-server-puppeteer is not recognized...`

Bu hata genellikle `npx` paketinin yanlış çağrılmasıyla oluşur. Tek çözüm:

✅ `@modelcontextprotocol/server-puppeteer` paketini `npx` ile doğrudan çalıştır.

---

## Gerçek Hayatta Kullanım Senaryoları

- 📄 Belge tarayıcı ile dinamik içerik çekmek
- 🛠️ Web uygulama testlerini LLM tabanlı hale getirmek
- 💬 Chatbot'ların canlı sayfalardan bilgi çekmesi

MCP sayesinde tüm bu işlemler **sıfır ek kod yazmadan** yapılabilir!

---

## Sonuç ve Çağrı 🎯

**MCP ile Puppeteer sunucusunu başlatmak hiç bu kadar kolay olmamıştı.**

Tek bir komutla güçlü bir tarayıcı destekli LLM ortamı kurabilirsin. Bu yazıyı uygulayarak sen de kod tabanlı projelerinde bir adım öne geçebilirsin.

📣 Eğer bu rehber işine yaradıysa, yorum bırakmayı ve blogu takip etmeyi unutma! Yeni makalelerde daha fazla LLM entegrasyonu anlatacağım.

---

Hazırsan, şimdi terminalini aç ve komutu çalıştır:

```bash
npx -y @modelcontextprotocol/server-puppeteer
```

Keyifli kodlamalar! 🚀

---

[responsive_img src="/images/mcp-puppeteer-sunucusu-kurulumu-xl.webp" alt="Puppeteer Sunucusu Kurulumu" /]



