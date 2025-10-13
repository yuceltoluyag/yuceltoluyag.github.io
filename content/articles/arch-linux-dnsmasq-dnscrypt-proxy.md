title: Arch Linux'ta dnsmasq ve dnscrypt-proxy ile Güvenli DNS Kurulumu
date: 2025-10-13 18:00
category: Linux
tags: dnsmasq,dnscrypt-proxy,Arch Linux,DNS güvenliği,DNS önbellekleme
slug: arch-linux-dnsmasq-dnscrypt-proxy
authors: yuceltoluyag
status: published
summary: Arch Linux üzerinde dnsmasq ve dnscrypt-proxy kurulumunu yapın, port çakışmasını kontrol edin ve DNS çözümlemeyi test edin.
template: article


İnternet performansınızın temel taşlarından biri DNS’tir.  
Bu makalede **Arch Linux üzerinde dnsmasq ve dnscrypt-proxy** kullanarak hem hızlı hem güvenli bir DNS altyapısı kuracak ve **çakışmaları, logları ve DNS çözümlemeyi test etmeyi** öğreneceksiniz.  

💡 Bu makalede bulacaklarınız:  
- dnsmasq kurulumu ve yapılandırması  
- dnscrypt-proxy kurulumu ve güvenli DNS ayarları  
- Port çakışması tespiti  
- DNS çözümleme testi  
- Servis log kontrolü

---

## 1. dnsmasq Nedir ve Kurulumu 🛠️

**dnsmasq**, hafif ve esnek bir DNS, DHCP ve TFTP sunucusudur.  
Yerel DNS önbellekleme ve DHCP hizmetleri sağlar.

### 1.1 Kurulum
```bash
sudo pacman -S dnsmasq
```

### 1.2 Yapılandırma

`/etc/dnsmasq.conf` dosyasını açın ve örnek ayarlarınızı girin:

```ini
listen-address=127.0.0.1,::1,192.168.1.1
interface=enp3s0
```

Servisi başlatın ve otomatik açılmasını sağlayın:

```bash
sudo systemctl start dnsmasq
sudo systemctl enable dnsmasq
```

<div class="info-box tip">
  <div class="alert-title">İpucu</div>
  Yerel ağınızda hız kazanmak için dnsmasq'ın DNS önbelleklemesini etkin kullanabilirsiniz.
</div>

---

## 2. dnscrypt-proxy ile DNS Sorgularını Şifreleme 🔐

**dnscrypt-proxy**, DNS over HTTPS (DoH) ve DNSCrypt protokollerini destekler.
DNS sorgularınızı şifreleyerek gizliliğinizi artırır.

### 2.1 Kurulum

```bash
sudo pacman -S dnscrypt-proxy
```

### 2.2 Yapılandırma

`/etc/dnscrypt-proxy/dnscrypt-proxy.toml` dosyasını açın:

```toml
server_names = ['cloudflare', 'cloudflare-ipv6']
listen_addresses = ['127.0.0.1:5300', '[::1]:5300']
require_dnssec = true
require_nolog = true
require_nofilter = true
```

Servisi başlatın:

```bash
sudo systemctl start dnscrypt-proxy
sudo systemctl enable dnscrypt-proxy
```

<div class="info-box important">
  <div class="alert-title">Önemli</div>
  listen_addresses farklı portta olmalı (ör. 5300), böylece dnsmasq ile çakışma olmaz.
</div>

---

## 3. dnsmasq ve dnscrypt-proxy Birlikte Kullanımı 🔄

dnsmasq → dnscrypt-proxy zinciri ile hem hız hem güvenlik sağlar.

1. dnsmasq'ı yerel arayüzlerde dinleyecek şekilde yapılandırın.
2. dnscrypt-proxy’yi dnsmasq’a gelen sorguları şifreleyecek şekilde ayarlayın.
3. Her iki servisi başlatın ve otomatik açılmalarını sağlayın.

<div class="info-box warning">
  <div class="alert-title">Uyarı</div>
  Port çakışmalarını önlemek için dnscrypt-proxy farklı bir portta dinlemeli (ör. 5300).
</div>

---

## 4. Port Çakışmasını Kontrol Etme ⚡

Servislerinizin doğru portlarda çalıştığını doğrulamak için:

```bash
sudo ss -tulpn | grep dns
```

Beklenen çıktı örneği:

```text
udp   127.0.0.1:5300 → dnscrypt-proxy
udp   127.0.0.1:53   → dnsmasq
tcp   127.0.0.1:5300 → dnscrypt-proxy
tcp   127.0.0.1:53   → dnsmasq
```

✅ Eğer portlar bu şekilde ayrılmışsa çakışma yok demektir.

---

## 5. DNS Çözümleme Testi 🧪

dnsmasq + dnscrypt-proxy zincirinin çalıştığını test edin:

```bash
dig @127.0.0.1 archlinux.org
```

Beklenen çıktıda:

* **Status: NOERROR**
* IP adresi dönmeli (ör. 95.217.163.246)
* Query time makul olmalı

<div class="info-box note">
  <div class="alert-title">Bilgi</div>
  Bu adım DNS zincirinin doğru çalışıp çalışmadığını hızlıca doğrular.
</div>

---

## 6. Servis Loglarını Kontrol Etme 📄

Hataları veya uyarıları görmek için:

```bash
journalctl -u dnsmasq -u dnscrypt-proxy --since "10 minutes ago"
```

* Eğer **No entries** görünüyorsa her şey sorunsuz çalışıyor demektir.

<div class="info-box tip">
  <div class="alert-title">İpucu</div>
  Logları düzenli kontrol etmek, özellikle ağ değişikliklerinden sonra olası problemleri yakalamanıza yardımcı olur.
</div>

---

## 7. Sonuç 🌟

* dnsmasq + dnscrypt-proxy ile güvenli ve hızlı DNS çözümleme kuruldu.
* Port çakışması kontrol edildi, DNS sorguları doğru şekilde yönlendiriliyor.
* Log ve test adımları ile sistem stabilitesi doğrulandı.

💡 Öneri: LAN cihazlarınızın da güvenli DNS kullanmasını istiyorsanız, dnsmasq’ı ilgili ağ arayüzlerinde dinleyecek şekilde yapılandırabilirsiniz.

---

## Kaynaklar 📚

* [Dnsmasq - ArchWiki](https://wiki.archlinux.org/title/Dnsmasq)
* [Dnscrypt-proxy - ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy)



---


