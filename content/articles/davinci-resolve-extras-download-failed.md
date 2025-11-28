Title: DaVinci Resolve Extras Download Failed Sorunu ve Çözümü
Date: 2025-11-09 18:00
Category: Linux
Tags: DaVinci Resolve, AI Voice Training, Extras, Arch Linux, Hata Çözümü
Slug: davinci-resolve-extras-download-failed
Authors: yuceltoluyag
Summary: Arch Linux üzerinde DaVinci Resolve Extras in the Download Manager ve AI Voice Training indirme sorunlarının çözümü için adım adım rehber.
Image: images/davinci-resolve-extras-ai-voice-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115520935226400842
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57njhe4vk2g


## AI Voice Training ve Extras İndirme Sorunu 🎤

- “Extras in the Download Manager” menüsündeki içerikleri (AI Voice Training, diğer ekstralar) indiremiyordunuz.
- AI Voice Training modülü indirilmeye çalışıldığında şöyle bir hata alınıyordu: `'download failed'`
- Neden: TLS/SSL bağlantı sorunları ve bazı paketlerin eksik veya yanlış konumda olması.

> Bu modüller özellikle İngilizce dışındaki videolara altyazı eklemek ve kendi sesinizi eğitmek ya da klonlamak için gerekli.

### Çözüm Adımları

1. **TLS/SSL bağlantı sorununu çözün:**

```bash
sudo mkdir -p /etc/pki/tls/certs
sudo cp /etc/ssl/certs/ca-certificates.crt /etc/pki/tls/certs/ca-bundle.crt
sudo pacman -Syu ca-certificates
```

2. **Ortam değişkenleri ile Resolve’u çalıştırın:**

```bash
CURL_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt /opt/resolve/bin/resolve
# veya
SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt /opt/resolve/bin/resolve
```

3. **Kütüphane çakışmalarını kontrol edin:**

```bash
cd /opt/resolve/libs
sudo mkdir disabled-libraries
sudo mv libglib* libgio* libgmodule* disabled-libraries/
```

4. **Resolve’u yeniden başlatın ve Download Manager’den AI Voice Training veya diğer extras içerikleri indirin.**

---

## TLS/SSL Bağlantı Sorunu 🔒

- DaVinci Resolve internet üzerinden paket yüklerken TLS handshake hatası veriyordu (`ERROR code 77`).
- Neden: CA sertifika dosyası uygulama tarafından beklenen yolda bulunamıyordu.
- Çözüm: Yukarıdaki TLS/SSL adımları zaten bu hatayı da çözüyor.

---

## `libpango` ile `symbol lookup error` ⚠️

- Hata:

```
./resolve: symbol lookup error: /usr/lib/libpango-1.0.so.0: undefined symbol: g_once_init_leave_pointer
```

- Neden: DaVinci Resolve paketindeki bazı kütüphaneler (`libglib*`, `libgio*`, `libgmodule*`) sistem kütüphaneleriyle çakışıyor olabilir.

- Çözüm: Yukarıdaki “Kütüphane çakışmalarını kontrol et” adımlarıyla bu hata giderilebilir.

---

## Sonuç ✅

- TLS/SSL sorunları ve kütüphane çakışmaları çözüldü.
- “Extras in the Download Manager” menüsünden AI Voice Training ve diğer ekstralar sorunsuz indirilebildi.
- Artık İngilizce dışı videolar için altyazı eklemek ve kendi sesinizi eğitmek mümkün.

---

## Notlarım 📝

- AI Voice Training veya diğer extras indirme sorunları çoğunlukla TLS ve sertifika eksikliği kaynaklıdır.
- Ortam değişkenleri ve kütüphane yönetimi hızlı ve güvenli çözümler sunar.
- Resolve kendi kütüphanelerini içerdiğinden bazen sistem kütüphaneleriyle çakışmalar yaşanabilir.
- Çakışan kütüphaneleri geçici olarak devre dışı bırakmak indirme ve çalışma sorunlarını çözer.
- Bu adımlar Arch Linux ve benzeri dağıtımlarda test edilmiştir; diğer dağıtımlarda da benzer çözümler uygulanabilir.
- Eğer Davinci Resolve Açılmıyorsa bu yazımızıda okuyabilirsiniz.[Linux’ta DaVinci Resolve 20.1 Açılmıyor Hatası ve Çözümü](/davinci-resolve-20-1-linux-hatasi-cozumu/)

[responsive_img src="/images/davinci-resolve-extras-ai-voice-xl.webp" alt="DaVinci Resolve Extras İndirme Sorunu Çözümü" /]
