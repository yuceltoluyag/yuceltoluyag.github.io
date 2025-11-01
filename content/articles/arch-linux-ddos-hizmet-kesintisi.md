Title: Arch Linux'ta Süren DDoS Saldırısı ve Hızlı Çözüm Yolları  
Date: 2025-08-28 10:00  
Category: Haberler  
Tags: Arch Linux, DDoS, AUR, hizmet kesintisi, yansılar, Arch Haberleri  
Slug: arch-linux-ddos-hizmet-kesintisi  
Authors: yuceltoluyag  
Status: published  
Summary: Arch Linux, 12 Ağustos’tan bu yana devam eden bir DDoS saldırısıyla boğuşuyor. Ana site, AUR ve forumlara erişimde sorunlar yaşanıyor. Kullanıcılar için alternatif erişim yolları ve yansılar bu yazıda.  
Template: article  
Image: images/arch-linux-ddos-hizmet-kesintisi-xl.webp
Lang: tr
Translation: false

---

### 1. Giriş Bölümü

Arch Linux, 12 Ağustos 2025 tarihinden itibaren devam eden bir **Dağıtılmış Hizmet Engelleme (DDoS)** saldırısıyla karşı karşıya. Bu saldırı sonucunda Arch Linux’un ana web sitesi, Arch User Repository (AUR) ve forumlarında ciddi erişim problemleri yaşanıyor.

Bu blog yazısı, Türk Arch kullanıcılarına hem durumu özetlemeyi hem de kesintiye karşı alternatif çözümler sunmayı amaçlıyor.

<blockquote class="reddit-embed-bq" style="height:316px" data-embed-theme="dark" data-embed-height="240"><a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mo1rws/arch_linux_depolar%c4%b1na_t%c3%bcrkiye_saatiyle_sabah_800/">Arch linux depolarına Türkiye saatiyle sabah 8:00 dan itibaren ulaşılamıyor. Endişe etmeyin düzelicektir.</a><br> by<a href="https://www.reddit.com/user/dolorisback/">u/dolorisback</a> in<a href="https://www.reddit.com/r/Kanunsuzlar/">Kanunsuzlar</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

---

### 2. Ana İçerik

#### 2.1 Saldırının Kapsamı ve Proje Ekibi Ne Yapıyor?

- **Saldırı Detayı**: 12 Ağustos’tan beri devam eden DDoS saldırısı, Arch Linux’un ana web sitesi, AUR ve forumlarına ciddi şekilde zarar veriyor. ([SecurityWeek][1], [Tom's Hardware][2], [Arch Linux][3])
- **Yanıt ve Strateji**: Geliştiriciler, barındırma sağlayıcısıyla yakın çalışma içerisindeler. Ayrıca uzun vadeli çözümler için DDoS koruması sağlayabilecek hizmetleri değerlendiriyorlar.
- **Güncelleme Kaynağı**: Proje, düzenli bilgi paylaşımı için hizmet durumu sayfasını aktif tutmaya başladı.

---

#### 2.2 Kullanıcılar İçin Alternatif Erişim Yöntemleri

- **Web Sitesi Erişimi**:

  - `reflector` gibi araçların kullandığı mirror list endpoint'ine erişim kesildiyse, `pacman-mirrorlist` paketinde yer alan yansılar kullanılmalı.
  - Reflector kullanmanızı tavsiye etmiyorum. Bunun yerine [Ghost Mirror Kullanın](/ghostmirror-arch-linux-kullanimi/)

  <blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="548"><a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mxfde9/comment/na8fh8q/">Comment</a><br> by<a href="https://www.reddit.com/user/dolorisback/">u/dolorisback</a> from discussion<a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mxfde9/son_hizmet_kesintileri_aur_arch_linux/"></a><br> in<a href="https://www.reddit.com/r/Kanunsuzlar/">Kanunsuzlar</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

  - Kurulum ISO’ları alternatif yansılardan indirilebilir. İndirmeden önce bütünlük ve imza doğrulaması yapılması önemlidir (örn. `0x54449A5C`).

- **AUR Erişimi**:

  - AUR paketlerine erişim mümkün olmadığında, GitHub’daki resmi AUR yansı deposundan paketler manuel olarak klonlanabilir:

```bash
    git clone --branch <package_name> --single-branch https://github.com/archlinux/aur.git <package_name>
```

[responsive_img src="/images/arch-linux-ddos-hizmet-kesintisi-xl.webp" alt="Arch Linux DDoS" /]

- Paketleri klonladıktan sonra `makepkg -si` komutuyla kurulumu gerçekleştirebilirsiniz.

- **Wiki Erişimi**:

  - Wiki sayfalarına ulaşamayanlar için `arch-wiki-docs` ve `arch-wiki-lite` gibi yansılar kullanılabilir.

---

#### 2.3 Teknik Detaylar ve Gizlilik Politikası

- İlk bağlantı talepleri sırasında TCP SYN kimlik doğrulaması nedeniyle bağlantılar ilk başta reddediliyor olabilir; ancak denemeye devam etmek genellikle işe yarıyor.
- Saldırının teknik ayrıntıları ve kaynağıyla ilgili bilgiler, saldırı devam ettiği sürece gizli tutuluyor.

---

### 3. Sonuç ve Özet

Arch Linux kullanıcıları olarak şu anda karşılaşılan durum can sıkıcı olsa da, geliştirici ekibin aktif müdahalesi ve sunulan geçici çözümler sayesinde temel ihtiyaçlarınızı karşılayabilirsiniz.

AUR erişimi için GitHub klonları, ISO ve paketler için yansılar hâlâ erişilebilir durumda. Ayrıca bütün işlemler sırasında güvenlik imzası doğrulamasını ihmal etmeyin.

- Archlinux sunucu durumlarını [buradan](https://status.archlinux.org/){: target="\_blank" rel="noopener noreferrer"} takip edebilirsiniz.

---

[1]: https://www.securityweek.com/arch-linux-project-responding-to-week-long-ddos-attack/?utm_source=yuceltoluyag.github.io "Arch Linux Project Responding to Week-Long DDoS Attack"
[2]: https://www.tomshardware.com/software/linux/arch-linux-continues-to-feel-the-force-of-a-ddos-attack-after-two-brutal-weeks-attackers-yet-to-be-identified-as-project-struggles-to-restore-full-service?utm_source=yuceltoluyag.github.io "Arch Linux continues to feel the force of a DDoS attack after two brutal weeks - attackers yet to be identified as project struggles to restore full service"
[3]: https://archlinux.org/news/recent-services-outages/?utm_source=yuceltoluyag.github.io "News: Recent service outages - Arch Linux"
