Title: Arch Linux'tan MikroTik'e WireGuard: DNS Belası ve Temiz Kurulum
Date: 2026-05-10 23:05
Category: Linux
Tags: arch linux, mikrotik, wireguard, vpn, dns
Slug: arch-linux-mikrotik-wireguard-kurulumu
Authors: yuceltoluyag
Summary: Arch Linux üzerinde WireGuard kurup MikroTik'e bağlanırken karşınıza çıkacak o meşhur DNS 'signature mismatch' hatasını ve en doğru çözüm yolunu anlatıyorum.
Image: /images/arch-linux-mikrotik-wireguard-kurulumu.webp
Lang: tr
Status: published

Arch Linux kullanıyorsanız, bir şeyi "sadece kurmak" yetmez; o şeyin sistemin geri kalanıyla (özellikle NetworkManager ve DNS ile) nasıl kavga ettiğini de bilmeniz gerekir. Bugün, MikroTik'i VPN Hub yaparak Arch Linux peer'ını bağlamayı anlatıyorum. 

Ben de her seferinde kendi eski notlarımda ve sağda solda konfigürasyon aramaktan yorulduğum için, tüm süreci ve o sinir bozucu DNS hatasının çözümünü buraya tek parça halinde bırakıyorum.

## 📦 Adım 1: Araç gereçleri kuşanalım

Öncelikle ihtiyacımız olan paket `wireguard-tools`. Bu paket hem gerekli yardımcı araçları hem de bağlantıyı yönetecek systemd unit'lerini getiriyor.

```bash
yuceltoluyag@archlinux:~$ sudo pacman -S wireguard-tools
```

## 🔑 Adım 2: Anahtar Üretimi ve Yetkiler

WireGuard anahtarları `/etc/wireguard/` altında durur. Klasörü oluşturup anahtarları tek satırda üretelim (ben genelde böyle yaparım, daha hızlı):

```bash
yuceltoluyag@archlinux:~$ sudo -i
root@archlinux:~# mkdir -p /etc/wireguard/ && cd /etc/wireguard/
root@archlinux:/etc/wireguard# wg genkey | tee privatekey | wg pubkey > publickey
root@archlinux:/etc/wireguard# chmod 600 privatekey
```

Burada `privatekey` dosyasını sadece root'un okuyabildiğinden emin olun; yoksa sistem size "güvenlik" diye bağırmaya başlar.

## ⚙️ Adım 3: Konfigürasyon (wg0.conf)

Şimdi asıl meseleye geliyoruz. `/etc/wireguard/wg0.conf` dosyasını oluşturalım. Burada kendi nickname'inizi veya özel bir notunuzu eklemek, konfigürasyonu takip etmeyi kolaylaştırır.

```ini
[Interface]
# Friday13 VPN Peer Configuration
PrivateKey = <SENIN_PRIVATE_KEYIN>
Address = 10.100.0.10/32
DNS = 192.168.0.1, 10.100.0.1

[Peer]
# MikroTik Office Gateway
PublicKey = <MIKROTIK_PUBLIC_KEYI>
Endpoint = 178.xxx.xxx.184:51820
AllowedIPs = 10.100.0.0/24, 192.168.0.0/24
PersistentKeepalive = 25
```

Bu noktada MikroTik tarafında da yeni bir Peer ekleyip, Arch makinenizin `publickey` içeriğini oraya girmeniz gerekiyor.

---

## ⚡ Sorun Giderme: "resolvconf: signature mismatch" Hatası

Bağlantıyı başlatmaya çalıştığınızda muhtemelen şu hatayla toslayacaksınız:
`resolvconf: signature mismatch: /etc/resolv.conf`

**Neden oluyor?** 
Arch Linux'ta NetworkManager varsayılan olarak `/etc/resolv.conf` dosyasına direkt dalar ve üzerine yazar. Ancak `openresolv` (ve dolayısıyla `wg-quick`), bu dosyanın imzasını kontrol eder. NetworkManager dosyayı değiştirince imza bozulur ve WireGuard DNS ayarlarını işleyemez.

### Çözüm: "Doğru Yol" (systemd-resolved)

"Dirty hack" denilen yöntemlerle uğraşmak yerine (PreUp gibi), NetworkManager'ı `systemd-resolved` kullanacak şekilde ayarlamak en temizidir.

1.  NetworkManager ayarını güncelleyin:
    `/etc/NetworkManager/NetworkManager.conf` dosyasına şunu ekleyin:
    ```ini
    [main]
    dns=systemd-resolved
    ```

2.  Servisleri tetikleyin:
    ```bash
    yuceltoluyag@archlinux:~$ sudo systemctl enable --now systemd-resolved
    yuceltoluyag@archlinux:~$ sudo systemctl restart NetworkManager
    ```

Artık `/etc/resolv.conf` dosyanız `127.0.0.53` adresine (yani yerel systemd-resolved'a) bakacak ve WireGuard DNS ayarlarını sorunsuzca bu servise iletebilecek.

---

## 🚀 Bağlantıyı Ateşleme

Her şey hazırsa tüneli açalım:

```bash
yuceltoluyag@archlinux:~$ sudo systemctl start wg-quick@wg0
yuceltoluyag@archlinux:~$ sudo systemctl enable wg-quick@wg0
```

Durumu kontrol etmek için efsane `wg` komutunu kullanın:

```bash
yuceltoluyag@archlinux:~$ sudo wg show
interface: wg0
  public key: 0Cl***9F4=
  private key: (hidden)
  listening port: 47047

peer: hxz***50o=
  endpoint: 178.xxx.xxx.184:51820
  allowed ips: 10.100.0.0/24, 192.168.0.0/24
  latest handshake: 20 seconds ago
  transfer: 12.06 KiB received, 8.13 KiB sent
```

`latest handshake` kısmında süreyi görüyorsanız, tebrikler; MikroTik ile el sıkıştınız demektir. 

Artık MikroTik arkasındaki sunuculara SSH ile bağlanabilirsiniz. Eğer hala disk alanı veya performansla ilgili sorunlar yaşıyorsanız, [Arch Linux Disk Alanı Görünmuyor Çözümü](/arch-linux-disk-alani-gorunmuyor-cozum/) veya [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/) yazılarıma da bir göz atın derim.

Hadi eyvallah, bir sonraki teknik krizde görüşmek üzere!

---

## 🔗 İlgili Yazılar
- [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)
- [Arch Linux Disk Alanı Görünmuyor Çözümü](/arch-linux-disk-alani-gorunmuyor-cozum/)
- [PNG Dosyalarıyla İmtihanım: Mogrify ve Chunk Hataları](/png-mogrify-chunk-hatalari-cozumu/)



