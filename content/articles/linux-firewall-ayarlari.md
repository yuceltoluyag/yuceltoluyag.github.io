Title: Arch Linux Güvenlik Duvarı Ayarları
Date: 2025-10-24 03:00
Category: Linux
Tags: arch linux, firewall, nftables, ufw, güvenlik
Slug: linux-firewall-ayarlari
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Arch Linux’ta firewall yapılandırmasını adım adım öğren. nftables ve ufw ile güvenliğinizi artırın! ⚡
Template: article
toot: https://mastodon.social/@yuceltoluyag/115487284825769650
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57k3m47mk2v

## Rehber: Arch Linux Güvenlik Duvarı Ayarları

### Giriş

Arch Linux kullanıcıları için güvenlik, sistem yönetiminin kritik bir parçasıdır. ⚡ Bu rehberde **Arch Linux güvenlik duvarı ayarları** konusunu detaylı şekilde öğrenecek, iptables, nftables ve ufw araçlarıyla adım adım yapılandırma yapacaksınız. Hedefimiz hem yeni başlayanların hem de deneyimli kullanıcıların kolayca uygulayabileceği güvenli ve esnek bir firewall kurulumu sunmaktır.

---

## Arch Linux'ta Güvenlik Duvarı Nedir?

Güvenlik duvarı, sisteminize gelen ve giden ağ trafiğini kontrol ederek yetkisiz erişimleri engeller. Arch Linux’ta firewall yapılandırması, ağ saldırılarını önlemek, servislerin dışa açık olup olmadığını yönetmek ve genel güvenliği artırmak için kritik öneme sahiptir.

### Terim Açıklamaları

**iptables nedir?**

- iptables, Linux çekirdeği için paket filtreleme aracıdır. Ağ paketlerini kurallar seti ile kontrol eder ve sisteminize gelen/giden trafiği yönetir.

**nftables nedir?**

- nftables, iptables’ın modern ve esnek bir alternatifi olarak geliştirilmiştir. Daha performanslıdır ve karmaşık kuralları daha basit bir şekilde yönetmenizi sağlar. Kernel seviyesinde bağlantı takibi ve paket filtreleme sağlar.

**ufw nedir?**

- UFW (Uncomplicated Firewall), iptables veya nftables üzerinde çalışan kullanıcı dostu bir firewall yönetim aracıdır. Basit komutlarla firewall kuralları eklemenize olanak tanır.

---

## Adım 1: iptables ile Temel Firewall Kurulumu

Arch Linux üzerinde iptables kurulumu ve temel ayarlar:

```bash
sudo pacman -S iptables
sudo systemctl enable --now iptables
```

Temel kural ekleme:

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -j DROP
```

!!! tip "SSH portunu değiştirerek veya yalnızca belirli IP’lere izin vererek güvenliği artırabilirsiniz ⚡"

---

## Adım 2: nftables ile Modern Firewall Yapılandırması

nftables, Arch Linux’ta iptables’ın yerine geçebilecek modern bir firewall çözümüdür. Kurulum:

```bash
sudo pacman -S nftables
sudo systemctl enable --now nftables
```

Basit bir kural seti:

```bash
sudo nft add table inet filter
sudo nft add chain inet filter input { type filter hook input priority 0 \; }
sudo nft add rule inet filter input tcp dport 22 accept
sudo nft add rule inet filter input drop
```

!!! note "nftables ile kuralları yedekleyebilir ve karmaşık NAT veya port yönlendirme yapılandırmaları oluşturabilirsiniz 💡"

---

## Adım 3: nftables ile Gelişmiş Kurallar

### Farklı Arayüzler için Kurallar

```bash
sudo nft add chain inet filter input_eth0 { type filter hook input priority 0 \; }
sudo nft add rule inet filter input_eth0 iifname "eth0" tcp dport 80 accept
```

### NAT ve Masquerading

```bash
sudo nft add chain inet nat postrouting { type nat hook postrouting priority 100 \; }
sudo nft add rule inet nat postrouting oifname "eth0" masquerade
```

!!! tip "Masquerading, birden fazla cihazın tek bir IP üzerinden internete çıkması için kullanışlıdır 💡"

---

## Adım 4: ufw ile Basit Firewall Yönetimi

```bash
sudo pacman -S ufw
sudo systemctl enable --now ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
```

!!! warning "Yanlış kurallar sisteminize erişimi engelleyebilir — komutları uygulamadan önce bağlantınızı yedekleyin veya konsol erişimi sağlayın ⚠️"

---

## Adım 5: Firewall Yönetim İpuçları

- Kuralları yedekleyin: `sudo nft list ruleset > backup.nft`
- Durum kontrolü: `sudo nft list ruleset`
- Brute-force saldırılarını önlemek için rate-limit kullanın

!!! tip "nftables ile rate-limit ve logging kuralları ekleyerek brute-force saldırılarını hafifletebilirsiniz ⚡"

---

## Sonuç

Arch Linux’ta güvenlik duvarı yapılandırması, sisteminizi dış tehditlere karşı korumak için kritik bir adımdır. Bu rehberde **iptables, nftables ve ufw** kullanarak temel ve güvenli firewall kurulumunu öğrendiniz. ⚡

!!! note "Firewall kurallarınızı düzenli olarak gözden geçirin ve sistem ihtiyaçlarınıza göre özelleştirin 💡"

Arch Linux ile güvenliğinizi artırabilir ve ağ yönetimini daha kontrollü hâle getirebilirsiniz. 🚀



