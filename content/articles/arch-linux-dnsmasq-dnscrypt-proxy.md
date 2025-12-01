Title: Arch Linux'ta dnsmasq ve dnscrypt-proxy Kurulum Rehberi
Date: 2025-10-13 18:00
Modified: 2025-11-30 17:56
Category: Linux
Tags: dnsmasq,dnscrypt-proxy,Arch Linux,DNS güvenliği,systemd-resolved
Slug: arch-linux-dnsmasq-dnscrypt-proxy
authors: yuceltoluyag
Summary: Yaşadığım port çakışması sorununu adım adım anlattığım, systemd-resolved'u maskeleyip dnsmasq ve dnscrypt-proxy'yi nihayet çalıştırdığımız o efsanevi rehber.
Image: images/arch-linux-guvenli-dns-kurulum-xl.webp
Template: article
Lang: tr
Status: published
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115364056455751216
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m2zxtdzots2l

İnternet performansınızın temel taşlarından biri DNS’tir, ama bence asıl temel taş **gizlilik**! Biz de tam olarak bunu yapacağız.

Bu makalede **Arch Linux üzerinde dnsmasq ve dnscrypt-proxy** kullanarak hem hızlı hem güvenli bir DNS altyapısı kuracak, **systemd-resolved port çakışmalarını çözecek** (ki bu tam bir baş belasıydı 🤯) ve sistemi NetworkManager ile kalıcı hale getireceğiz.

💡 Bu makalede bulacaklarınız:

- systemd-resolved çakışmasının giderilmesi (Kritik Adım)
- dnscrypt-proxy ile şifreli DNS (DoH)
- dnsmasq ile önbellekleme ve yönlendirme
- NetworkManager ile kalıcı DNS ayarları
- Test ve doğrulama

---

## 1. Hazırlık: Port 53 Çakışmasını Çözmek Şart ⚠️

Şimdi gelelim o meşhur **port 53** sorununa[^2]. Çoğu modern Linux dağıtımında, özellikle de Arch'ta, bu 53. portu (DNS'in varsayılan kapısı) `systemd-resolved` denen bir arkadaş kapıyor. E sen de `dnsmasq`'ı oraya kurmaya kalkınca ne oluyor? Tabii ki `exit-code 2` ve o sinir bozucu **"Address already in use"** hatası. Yani, bunu halletmeden yola devam edemeyiz.

### Systemd-resolved'u Susturma Operasyonu

Önce servisi durdurup kalıcı olarak maskeliyoruz [^1]. Maskelemek önemli, çünkü "disable" yapsan bile bir güncelleme veya beklenmedik bir durum onu tekrar uyandırabilir. O yüzden tamamen kilitliyoruz.

```bash
sudo systemctl disable --now systemd-resolved
sudo systemctl mask systemd-resolved
```

!!! warning "Dikkat! 🚨 Sadece 'disable' yetmiyor!"
Servisi `disable --now` ile durdursanız bile bazen soketleri (o minik dinleme kapıları) aktif kalabiliyor. En sağlamı, yukarıdaki gibi maskeleyip sonraki adıma geçmek. 

Ardından, sistemin yerel DNS sorgularını `systemd-resolved`'a değil, bizim kuracağımız `dnsmasq`'a yönlendirmesi için `/etc/resolv.conf` dosyasını düzeltmemiz gerekiyor:

```bash
sudo rm /etc/resolv.conf
echo "nameserver 127.0.0.1" | sudo tee /etc/resolv.conf
```

Artık sistem DNS için direkt localhost'a bakacak, harika!

---

## 2. dnscrypt-proxy Kurulumu ve Yapılandırması 🔐

Şimdi şifreli DNS'i kuracağız. Bu, DNS sorgularınızı (hangi sitelere girdiğinizi) ISP'nizden ve diğer meraklı gözlerden gizler. İşte bu yüzden **dnscrypt-proxy** kullanıyoruz.

### 2.1 Kurulum

```bash
sudo pacman -S dnscrypt-proxy
```

### 2.2 Yapılandırma

Bunun, `dnsmasq`'ın göndereceği sorguları alması için onu standart DNS portu olan 53'ten uzak, **53000** portunda dinleteceğiz. `dnscrypt-proxy.toml` dosyasını açıp (ki bu dosya `dnscrypt-proxy`'nin beyni sayılır) şu ayarları yapın:

```toml
server_names = ['cloudflare', 'cloudflare-ipv6']
listen_addresses = ['127.0.0.1:53000', '[::1]:53000']
require_dnssec = true
require_nolog = true
require_nofilter = true
```

Servisi hemen aktif edip başlatıyoruz:

```bash
sudo systemctl enable --now dnscrypt-proxy
```

---

## 3. dnsmasq Kurulumu ve Zinciri Kurma 🛠️

Şimdi asıl yerel önbellekleme görevini yapacak olan `dnsmasq`'ı kurup, tüm sorguları `dnscrypt-proxy`'ye yönlendirmesini söyleyeceğiz. İşte bu, hem hız hem gizlilik demek.

### 3.1 Kurulum

```bash
sudo pacman -S dnsmasq
```

### 3.2 Yapılandırma

`dnsmasq`'ın varsayılan konfigürasyon dosyasını (bayağı karmaşık oluyor genelde) ellemiyoruz. Onun yerine temiz iş yapıp, sadece ihtiyacımız olan ayarları içeren **99-dnscrypt.conf** adında minik bir dosya oluşturuyoruz `/etc/dnsmasq.d/` içine. Bu, daha profesyonel bir yaklaşım.

`/etc/dnsmasq.d/99-dnscrypt.conf` dosyasının içeriği:

```ini
listen-address=127.0.0.1
bind-interfaces
no-resolv
server=127.0.0.1#53000
cache-size=1000
```

*Not: **`server=127.0.0.1#53000`** komutuna dikkat et. Tüm DNS sorgularını yerel 53000 portuna, yani `dnscrypt-proxy`'ye gönder diyor. Burası kritik!*

Servisi başlatıyoruz. Hadi inşallah!

```bash
sudo systemctl enable --now dnsmasq
```

---

## 4. NetworkManager ile Ayarları Çimentolama 🌐

Her şey çalıştı, harika. Ama şimdi bilgisayarı yeniden başlattığında NetworkManager zekice davranıp DHCP'den aldığı DNS'i kullanmaya çalışırsa ne yapacağız? Her şey boşa gider. O yüzden bağlantımızı kalıcı olarak **127.0.0.1**'e sabitliyoruz.

Önce aktif bağlantının adını bul:

```bash
nmcli connection show
```

Şimdi o bağlantıya (örneğin "Wired connection 1" ya da "MyWifiSSID") DNS'i zorla:

```bash
sudo nmcli connection modify "Wired connection 1" ipv4.dns "127.0.0.1" ipv4.ignore-auto-dns yes
sudo nmcli connection up "Wired connection 1"
```

İşlem tamam. Artık NetworkManager kafasına göre takılamaz, DNS hep localhost'ta kalır.

---

## 5. Kontrol ve Test Aşaması 🧪

Kurulumu yaptık, şimdi emin olalım.

### 5.1 Port Kontrolü

**ss** komutu ile 53. ve 53000. portlarda doğru servislerin oturup oturmadığını kontrol edelim:

```bash
sudo ss -tulpn | grep :53
```

**Beklenen Başarılı Çıktı (İstediğimiz Durum):**

```text
udp    UNCONN 0           0 127.0.0.1:53         0.0.0.0:*   users:(("dnsmasq",pid=1234,fd=6))
udp    UNCONN 0           0 127.0.0.1:53000      0.0.0.0:*   users:(("dnscrypt-proxy",pid=5678,fd=7))
tcp    LISTEN 0          128 127.0.0.1:53         0.0.0.0:*   users:(("dnsmasq",pid=1234,fd=8))
tcp    LISTEN 0          128 127.0.0.1:53000      0.0.0.0:*   users:(("dnscrypt-proxy",pid=5678,fd=9))
```

**Hata Örneği (systemd-resolved hala aktif):**

```text
udp    UNCONN 0           0 127.0.0.53:53         0.0.0.0:*   users:(("systemd-resolved",pid=999,fd=12))
```

Eğer böyle bir satır görüyorsan, **Adım 1**'i tam uygulamamışsın demektir. Hemen geri dön ve `systemctl mask` komutunu tekrar dene!

### 5.2 Çözümleme Testi

Zincirimiz çalışıyor mu?

```bash
dig @127.0.0.1 archlinux.org +short
```

IP adresi çat diye geliyorsa (ör. 95.217.163.246), `dnsmasq`'ın sorguyu `dnscrypt-proxy`'ye atıp şifreli şekilde çözdüğü anlamına gelir. Süper!

---

## 5.3 Gelişmiş Tanılama: dnscrypt-proxy Doğrudan Testi (Opsiyonel) 🔬

Hadi bir de `dnsmasq` olmadan, direkt **dnscrypt-proxy**'ye "çöz şu adresi" diyelim. Bazen sorun `dnsmasq`'ta değil, `dnscrypt-proxy`'nin kendisinde olabilir. Bu komutla direkt olarak ona sesleniyoruz.

**Kullanım:**

```bash
sudo dnscrypt-proxy -config /etc/dnscrypt-proxy/dnscrypt-proxy.toml -resolve example.com
```

**Örnek Çıktı:**

```text
Resolving [example.com] using 127.0.0.1 port 53000

Resolver      : 172.31.255.42 
Lying         : no
DNSSEC        : yes, the resolver supports DNSSEC
ECS           : ignored or selective

Canonical name: example.com.
... (diğer DNS bilgileri) ...
```

!!! note "Önemli Bilgi: Eğer bu test başarılı ise, şifreli DNS çözümlemenizin kendisi (dnscrypt-proxy) bağımsız olarak çalışıyor demektir. Sorun sadece **53. port**'u kapma kavgasıydı, ki onu da çözdük." 

---

## 6. Servis Loglarını Kontrol Etme 📄

Hataları veya uyarıları görmek, ya da `dnsmasq`'ın gerçekten sorgu alıp `dnscrypt-proxy`'ye yolladığını görmek için loglara bakmak gibisi yoktur:

```bash
journalctl -u dnsmasq -u dnscrypt-proxy --since "10 minutes ago"
```

---

## 7. Sonuç 🌟

Tebrikler! Hem hız, hem yerel önbellekleme hem de şifreli DNS zincirini kurduk.

Sisteminiz artık şu zinciri kullanıyor, ki bence çok havalı:
**Siz** → **dnsmasq (Port 53)** → **dnscrypt-proxy (Port 53000)** → **Şifreli İnternet (DoH)**

`systemd-resolved` olayı ve NetworkManager ayarları sayesinde, yeniden başlatmalardan sonra bile bu yapılandırma sağlam kalacaktır. İşte bu işi bitirdik! 🥳
[responsive_img src="/images/arch-linux-guvenli-dns-kurulum2-xl.webp" alt="Arch Linux güvenli DNS kurulumu" /]
---

## Kaynaklar 📚

  - [Dnsmasq - ArchWiki](https://wiki.archlinux.org/title/Dnsmasq){: target="_blank" rel="noopener noreferrer"}
  - [Dnscrypt-proxy - ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy){: target="_blank" rel="noopener noreferrer"}

---

[^1]: 
  **Maskeleme Ne Demek?** Bir `systemd` servisini **maskelemek**, onu sadece durdurmaktan veya devre dışı bırakmaktan daha kalıcı bir eylemdir. Maskelenen bir servis, ne manuel olarak ne de başka bir servisin bağımlılığı nedeniyle başlatılamaz. `systemd` bu servisi tamamen yok sayar. Port çakışması gibi kritik durumlarda, sistemin bir daha bu servisi (örneğin `systemd-resolved`'ı) asla açmamasını sağlamanın en güvenli yoludur.

[^2]: 
  **Port Çakışması Ne?** Port çakışması, bir makinede aynı port numarasını birden fazla servis tarafından kullanmaya çalıştığında ortaya çıkan bir durumdur. Genellikle bir port sadece bir servis tarafından kullanılabilmeli. Port çakışması sorunları genellikle ağ bağlantısını bozabilir, hatta sistemi kapatmasına neden olabilir.

---

