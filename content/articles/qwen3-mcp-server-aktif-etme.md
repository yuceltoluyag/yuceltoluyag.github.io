Title: Qwen 3 ve Qwen3-Coder-Plus Üzerinde MCP Server’ları Aktif Etme 🚀
Date: 2025-08-16 17:30
Category: Geliştirme Araçları
Tags: qwen3, qwen3-coder-plus, qwen3++, mcp server, model context protocol, qwen ayarları, yapay-zeka
Slug: qwen3-mcp-server-aktif-etme
Authors: yuceltoluyag
Status: published
Summary: Qwen 3 ve Qwen3-Coder-Plus üzerinde MCP server’ları nasıl aktif edeceğinizi adım adım anlatıyoruz. Ayar dosyası düzenleme, CLI kullanımı ve test etme sürecini bu rehberde bulabilirsiniz.
Template: article
Image: images/qwen-active-mcp-xl.webp


Yapay zekâ destekli geliştirme araçlarının yükselişiyle birlikte **Model Context Protocol (MCP)** server’ları da hayatımıza girdi. Bu protokol sayesinde farklı servisleri Qwen gibi büyük dil modellerine kolayca entegre edebiliyor, tarayıcı otomasyonu, bağlamsal analizler ve hatta sihirli API bağlantıları kurabiliyoruz.

Bu rehberde, **Qwen 3, Qwen 3++ ve Qwen3-Coder-Plus** kullanıcıları için MCP server’ların nasıl aktif edileceğini adım adım göstereceğim. 🙂

---

## 1. MCP Nedir ve Neden Önemlidir?

MCP (Model Context Protocol), dil modellerinin harici servislerle güvenli ve standart bir yöntemle iletişim kurmasını sağlar. Örneğin:

* 🌐 **Puppeteer** ile tarayıcı otomasyonu yapabilirsiniz.
* 🧠 **Sequential Thinking** ile daha planlı akıl yürütme sağlayabilirsiniz.
* 📊 **Context7** gibi servislerle ek bağlam ve hafıza katabilirsiniz.
* ✨ **Magic** gibi özel eklentilerle API tabanlı çözümler üretebilirsiniz.

> Eğer daha önce okumadıysanız, ilgili yazımıza da göz atın: [MCP ile Tarayıcı Otomasyonunu Kolayca Başlatın: Puppeteer Sunucusu Kurulumu](/mcp-puppeteer-sunucusu-kurulumu/)

---

## 2. `.qwen/settings.json` Dosyasını Düzenleme

MCP server’larını aktif etmenin ilk adımı, Qwen’in ayar dosyasını düzenlemektir. Terminal üzerinden:

```bash
vim .qwen/settings.json
```

Açılan dosyaya aşağıdaki ayarları ekleyin:

```json
{
  "selectedAuthType": "qwen-oauth",
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "@21st-dev/magic": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest", "API_KEY=\"your-api-key\""]
    }
  }
}
```

<div class="info-box warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
        <div class="alert-title">Uyarı</div>
        <p><code>selectedAuthType</code> alanı sizde farklı olabilir. Örneğin GitHub veya başka bir OAuth yöntemi seçmiş olabilirsiniz. Buradaki örnek yalnızca referans içindir.</p>
    </div>
</div>

---

## 3. Qwen CLI Başlatma ve MCP Server’ları Test Etme

Ayarları yaptıktan sonra CLI’yi başlatabilirsiniz. Terminale şunu yazın:

```bash
qwen
```

CLI açıldığında, aktif MCP server’larınızı görmek için `/mcp` komutunu kullanabilirsiniz:

```bash
/mcp
```

Eğer her şey doğru yapılandırıldıysa, biraz önce eklediğiniz server’lar (örneğin **puppeteer**, **sequential-thinking**, **context7**, **magic**) listelenecektir. 🎉

\[responsive\_img src="/images/qwen-active-mcp-xl.webp" alt="Qwen MCP Server Aktif" /]

<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>Eğer CLI’de MCP server görünmüyorsa, önce <code>npx</code> ve ilgili paketlerin kurulu olduğundan emin olun. Ardından ayarlar dosyasındaki JSON formatını kontrol edin.</p>
    </div>
</div>

---

## 4. Sonuç

Artık **Qwen 3, Qwen 3++ ve Qwen3-Coder-Plus** üzerinde MCP server’ları nasıl aktif edeceğinizi biliyorsunuz. 🎯

* `.qwen/settings.json` dosyasını düzenlediniz ✅
* Qwen CLI’yi başlattınız ✅
* `/mcp` ile server’ların çalıştığını test ettiniz ✅

Bundan sonrası sizin hayal gücünüze kalmış. MCP sayesinde Qwen’i yalnızca bir dil modeli olmaktan çıkarıp, güçlü bir geliştirme yardımcısına dönüştürebilirsiniz. 🚀
