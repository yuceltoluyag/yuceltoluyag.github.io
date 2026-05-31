Title: Arch Linux'ta DNS Gizemi: VPN, systemd-resolved ve Unbound
Date: 2026-05-24 07:50
Modified: 2026-05-24 20:45
Category: Linux
Tags: arch-linux, dns, vpn, systemd-resolved, unbound, wireguard, openvpn, mikrotik
Slug: arch-linux-dns-vpn-systemd-resolved-unbound
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde birden fazla VPN aktifken yaşanan DNS çakışmalarını, systemd-resolved'un garip önbellekleme mantığını ve local Unbound ile split-DNS kurulumunu çözüyoruz.
Template: article
Image: images/arch-linux-dns-vpn-systemd-resolved-unbound-lg.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/116668690407931263
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mn5dsne63k2w

Boş zamanlarımda kendi sistemlerimi kurcalamayı, yerel sunucumda (homelab) bir şeyler inşa edip yeni teknolojiler denemeyi acayip seviyorum. Geçen akşam yine evde kendi lab ortamımda yeni bir yapılandırma üzerinde çalışırken, AWS EKS (Elastic Kubernetes Service) kümesindeki pod durumlarını kontrol etmek için terminali açtım. Rutin bir şekilde `kubectl get pod` komutunu yapıştırdım. Bekliyorum... Bekliyorum... Ve bam:

```bash
$ kk get pod
[...] Get "https://F07***D78.gr7.us-east-1.eks.amazonaws.com/api?timeout=32s": dial tcp 10.0.64.9:443: i/o timeout
```

"Ulan yine neyi bozdum?" diyerek komutu tekrar çalıştırdım. Bu sefer sorunsuz bir şekilde pod listesi döküldü. Üçüncü kez çalıştırdım, yine timeout! Resmen terminal benimle yazı-tura oynuyordu. 

İşin içinde hem ev internetim, hem AWS kaynaklarına erişmek için kurduğum OpenVPN bağlantısı, hem de evdeki diğer sunucularıma bağlanmak için kullandığım kendi WireGuard tünelim olunca, klasik bir Arch Linux kullanıcısı paranoyasıyla kolları sıvayıp DNS ve IP rotaları (routing) labirentine dalmaya karar verdim.

Daha önce yazdığım [AWS EC2'de OpenVPN Nasıl Kurulur ve DNS Leak Nasıl Düzeltilir](/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/) makalesinde VPN üzerindeki DNS sızıntılarını ve temel yönlendirmeleri incelemiştik. Bu sefer sorun çok daha karmaşık bir DNS yarışması ve rota düğümünden ibaret.

## AWS VPC DNS ve VPN Trafiği Çakışması

Benim senaryomda AWS EKS hem Public hem de Private endpoint'lere sahip. Dolayısıyla DNS tarafında [Split-Horizon DNS](https://en.wikipedia.org/wiki/Split-horizon_DNS){: target="\_blank" rel="noopener noreferrer"} mekanizması devrede:

*   Eğer dış ağdan (yani genel internetten) sorgu atarsak, AWS bize EKS'nin **public IP** adresini döner.
*   Eğer AWS VPC içerisinden (veya VPN üzerinden) sorgu atarsak, bize VPC içindeki **private IP** adresini (Örn: `10.0.64.9`) döner.

Sistemimde aynı anda birden fazla DNS sunucusu tanımlıydı ve `/etc/resolv.conf` içeriği yaklaşık olarak şöyle görünüyordu:

```
nameserver 1.1.1.1      # Cloudflare (EKS için Public IP döner)
nameserver 10.100.0.1   # Evdeki MikroTik (EKS için Public IP döner)
nameserver 10.0.0.2     # AWS VPC DNS - OpenVPN üzerinden (EKS için Private IP döner)
```

Sistemde DNS çözümlemesinin kimde olduğunu anlamak için `/etc/nsswitch.conf` dosyasını incelediğimizde hosts satırı şu şekildeydi:

```
hosts: mymachines resolve [!UNAVAIL=return] files myhostname dns
```

Buradaki `resolve` parametresi, sistemin klasik glibc DNS çözücüsü yerine D-Bus üzerinden `systemd-resolved`[^1] servisini kullandığını gösterir.

## systemd-resolved'un "At Yarışı" Çözümleme Mantığı

Gelelim `systemd-resolved`'un DNS sorgularını nasıl ele aldığına. Durumu daha net görebilmek için `systemd-resolved` debug loglarını açalım:

```bash
sudo resolvectl log-level debug
```

Ardından logları izlemeye alıp `kubectl` sorgusunu çalıştırdığımızda karşımıza çıkan manzara şuydu:

```
varlink-28-28: Received message: {"method":"io.systemd.Resolve.ResolveHostname","parameters":{"name":"F07***D78.gr7.us-east-1.eks.amazonaws.com","flags":0,"ifindex":0}}
```

`systemd-resolved`, elindeki tüm aktif ağ arayüzlerine (ev ağım, OpenVPN tüneli `tun0`, WireGuard tüneli `wg0`) **aynı anda** DNS sorgusu gönderiyor!

Hacı bura çok kritik: `systemd-resolved` resmen arkada DNS sunucularını yarıştırıyor. Hangi arayüzdeki DNS sunucusu ilk önce cevap verirse, o cevabı kabul edip önbelleğe (cache) alıyor.

*   Eğer yarışı kendi ev internetim (`wlan0` / `1.1.1.1`) kazanırsa, bize EKS'nin **public IP** adresi dönüyor ve bağlantı sorunsuz kuruluyor.
*   Eğer yarışı OpenVPN tüneli (`tun0` / `10.0.0.2`) kazanırsa, bize EKS'nin **private IP** adresi (`10.0.64.9`) döner.

Peki private IP dönünce neden timeout alıyoruz? Çünkü rotalarımızı (routing table) kontrol ettiğimizde, `10.0.64.9` IP adresi için VPN tüneline (`tun0`) yönlendirilmiş özel bir rota tanımlı değil. Dolayısıyla sistem bu private IP'ye gitmek için varsayılan ağ geçidini (evdeki router'ım) kullanmaya çalışıyor ve paketlerimiz normal internete çıkıp kayboluyor.

Log seviyesini tekrar normale döndürelim:
```bash
sudo resolvectl log-level info
```

## Çözüm Yolları

Bu sorunu çözmek için önümüzde birkaç seçenek var:

1.  **Rota Ekleme (Geçici Çözüm):** EKS özel IP bloklarını OpenVPN rotalarına manuel olarak eklemek. (Sadece o IP için geçici çözümdür, split-DNS sağlamaz.)
2.  **systemd-resolved ile Split-DNS:** `systemd-resolved` üzerinde karmaşık arayüz bazlı alan adı kuralları yazmak. (Oldukça zahmetli ve kararsızdır.)
3.  **Local Unbound Kurulumu (Kalıcı ve Kararlı Çözüm):** `systemd-resolved` servisini tamamen emekli edip, sorguları alan adlarına göre doğru DNS sunucularına dağıtacak bir local Unbound DNS sunucusu kurmak.

Biz en temiz ve kararlı yol olan **Unbound** kurulumunu seçeceğiz. Daha önce benzer bir port çakışmasını [Arch Linux'ta dnsmasq ve dnscrypt-proxy Kurulum Rehberi](/arch-linux-dnsmasq-dnscrypt-proxy/) yazımda `dnsmasq` ile çözmüştük. Bu sefer işin içine VPN DNS'leri de girdiği için Unbound ile split-DNS yapacağız.

## Arch Linux Üzerinde Unbound Kurulumu ve Yapılandırması

Öncelikle gerekli paketi kuralım:

```bash
sudo pacman -S unbound
```

Hedefimiz şu yönlendirme kurallarını tanımlamak:
*   `compute.internal` ve `ops.example.com` (AWS iç ağ alan adları) sorguları OpenVPN tünelindeki AWS VPC DNS sunucusuna (`10.0.0.2`) gitsin.
*   `setevoy` (kendi homelab ağım) sorguları WireGuard tünelindeki MikroTik DNS sunucusuna (`10.100.0.1`) gitsin.
*   Geri kalan tüm genel internet sorguları ise Cloudflare (`1.1.1.1`) ve Google (`8.8.8.8`) sunucularına yönlendirilsin.

`/etc/unbound/unbound.conf` dosyasını şu şekilde düzenliyoruz:

```ini
server:
    interface: 127.0.0.1
    access-control: 127.0.0.0/8 allow
    do-ip6: no
    hide-identity: yes
    hide-version: yes
    prefetch: yes

# Kendi homelab ağım (WireGuard / MikroTik)
forward-zone:
    name: "setevoy."
    forward-addr: 10.100.0.1
    forward-addr: 192.168.0.1

# AWS Dahili Kaynakları
forward-zone:
    name: "compute.internal."
    forward-addr: 10.0.0.2

forward-zone:
    name: "ops.example.com."
    forward-addr: 10.0.0.2

# Genel İnternet Sorguları
forward-zone:
    name: "."
    forward-addr: 1.1.1.1
    forward-addr: 8.8.8.8
```

Konfigürasyonda yazım hatası olup olmadığını kontrol edelim:

```bash
sudo unbound-checkconf
```

`unbound-checkconf: no errors in /etc/unbound/unbound.conf` çıktısını gördüysek yolumuz açık demektir.

## systemd-resolved Servisini Devre Dışı Bırakmak

Unbound'un port 53'ü sorunsuz dinleyebilmesi için `systemd-resolved` servisini tamamen kapatmamız gerekiyor.

!!! warning "Dikkat! 🚨 Sadece 'disable' yetmiyor!"
    Bu servisi kapattığınız anda local DNS çözümleyiciniz kalmayacağı için Unbound'u çalıştırana kadar internet erişiminiz (alan adı bazlı) geçici olarak kesilecektir.

Eğer `/etc/NetworkManager/NetworkManager.conf` dosyanızda `dns=systemd-resolved` gibi bir satır varsa bunu `dns=none` olarak güncelleyin:

```ini
[main]
dns=none
```

Şimdi `systemd-resolved` servisini durduralım ve başlangıçta çalışmasını engelleyelim:

```bash
sudo systemctl disable --now systemd-resolved systemd-resolved-monitor.socket systemd-resolved-varlink.socket
sudo systemctl mask systemd-resolved
```

NetworkManager servisini yeniden başlatalım:

```bash
sudo systemctl restart NetworkManager
```

Eğer port 53'ün tamamen boşaldığından emin olmak isterseniz şu komutla kontrol edebilirsiniz:

```bash
sudo ss -tulpn | grep ':53'
```

Port boştaysa Unbound servisini aktif edip başlatalım:

```bash
sudo systemctl enable --now unbound
```

Artık `/etc/resolv.conf` dosyamızı kendi local DNS sunucumuza yönlendirebiliriz. Dosyayı açıp sadece şu satırı bırakın:

```
nameserver 127.0.0.1
```

Eğer WireGuard tüneli kullanıyorsanız, `/etc/wireguard/wg0.conf` dosyanızdaki DNS parametresini de `127.0.0.1` olarak güncellemeyi unutmayın:

```ini
[Interface]
...
DNS = 127.0.0.1
```

Değişikliklerin ardından WireGuard tünelini yeniden başlatabilirsiniz:

```bash
sudo wg-quick down wg0 && sudo wg-quick up wg0
```

## Sonuçların Test Edilmesi

Local DNS sunucumuzun kurallara uyup uymadığını `dig` komutuyla test edelim:

1.  **Genel İnternet Testi:**
    ```bash
    dig google.com +short
    # Çıktı: 216.58.207.14 (Cloudflare/Google üzerinden sorunsuz çözüldü)
    ```
2.  **AWS EKS Endpoint Testi (Public IP dönmeli):**
    ```bash
    dig F07***D78.gr7.us-east-1.eks.amazonaws.com +short
    # Çıktı: EKS'nin public IP adresleri dönmeli (çünkü sorgu genel internete yönlendi)
    ```
3.  **AWS RDS Testi (Private IP dönmeli):**
    ```bash
    dig prod.db.kraken.ops.example.com +short
    # Çıktı: 10.0.66.14 (AWS DNS'i üzerinden özel IP başarıyla çözüldü)
    ```

Sözün özü; birden fazla VPN ağının aktif olduğu geliştirme ortamlarında `systemd-resolved`'un kontrolsüz yarışmacı DNS yapısı yerine, local bir **Unbound** DNS sunucusu kurmak ağ trafiğinizi çok daha tahmin edilebilir ve kararlı kılacaktır. 



[^1]: Ayrıntılı bilgi için Arch Wiki üzerindeki [Domain Name Resolution](https://wiki.archlinux.org/title/Domain_name_resolution){: target="\_blank" rel="noopener noreferrer"} başlığına göz atabilirsiniz.
