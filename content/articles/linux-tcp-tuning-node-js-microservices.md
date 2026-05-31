Title: Node.js Mikroservisleri İçin Linux TCP Tuning ve Kernel Ayarları
Date: 2026-05-29 04:20
Category: Linux
Tags: linux, tcp tuning, sysctl, nodejs, mikroservis, devops, sorun-giderme
Slug: linux-tcp-tuning-node-js-microservices
Authors: yuceltoluyag
Status: published
Summary: Yüksek yük altında Node.js sunucularında yaşanan gizemli bağlantı kopmalarını ve zaman aşımlarını engellemek için yapılması gereken kritik Linux kernel sysctl ayarlarını anlatıyorum.
Template: article
Lang: tr
Translation: false
Image: images/linux-tcp-tuning-nodejs.png

Kendi local labımda koşturduğum mikroservislerin yük testlerini yaparken garip bir duruma denk geldim hacı. Yük jeneratörü saniyede 2000 isteği vuruyor, Node.js sunucusunun CPU kullanımı ise %30'u bile geçmiyor. Event loop canavar gibi, çöp toplayıcı (GC) sessiz sakin, hata logu sıfır. Ama gelin görün ki, yük testi raporunda %3'lük bir bağlantı zaman aşımı (connection timeout) görünüyor. Üstelik diğer servislerden de ara sıra gelen o meşhur "socket hang up" hataları can sıkmaya başladı.

Uygulama loglarına bakıyorsun, yaprak kıpırdamıyor. Metrik ekranları yemyeşil. İnsan kendini bir hayaletle savaşıyor gibi hissediyor. Ta ki sunucuda `ss -s` komutunu çalıştırıp `TIME_WAIT` durumunda bekleyen kırk bin adet soket görene ya da `dmesg` loglarında `TCP: request_sock_TCP: Possible SYN flooding on port 3000` uyarısını yakalayana kadar... Çekirdek (kernel) sizin trafiğinizle gizli bir savaşa girmiş ve maalesef kazanmış.

Bu tarz hataları uygulama seviyesinde profil çıkararak (profiling) asla göremezsiniz. Çünkü Linux çekirdeği, varsayılan olarak hâlâ 2005 yılındaki bir masaüstü bilgisayara göre yapılandırılmış ayarlarla geliyor. Oysa biz 2026 yılında, bir yük dengeleyici (load balancer) arkasında koşan Node.js konteynerlerinden bahsediyoruz. Bu yazıda, bu gizli tıkanıklığı aşmak için el atılması gereken 4 temel sysctl ailesini ve çoğu ekibin atladığı o kritik Node.js ayarını masaya yatırıyoruz.

## 1. Bağlantı Kuyrukları: SYN Backlog ve Accept Queue

Bir istemci Node.js sunucunuza TCP bağlantısı açtığında, uygulama seviyesindeki `server.on('connection', ...)` olayı tetiklenmeden önce çekirdekte üç aşamalı bir el sıkışma gerçekleşir:

1. İstemci bir `SYN` paketi gönderir.
2. Çekirdek, SYN backlog kuyruğunda yer ayırır, `SYN-ACK` ile yanıt döner ve istemciden gelecek son `ACK` paketini bekler.
3. El sıkışma tamamlandığında soket `accept` kuyruğuna (accept queue) taşınır. Node.js, event loop'un bir sonraki döngüsünde `accept()` çağrısını yapar ve bağlantı event'ini tetirler.

Eğer bu kuyruklardan biri dolarsa, çekirdek gelen paketleri bodoslama çöpe atar. İstemci zaman aşımına uğrayıp tekrar dener. Uygulamanız ise bağlantı sunucuya hiç ulaşmadığı için hiçbir hata loglayamaz. Bu durum dışarıdan bakıldığında istikrarsız bir ağ sorunu gibi görünür ama aslında çekirdeğin kapasite limitidir.

Varsayılan olarak Linux dağıtımlarında `net.core.somaxconn` değeri 128 veya 4096'dır. Kulağa büyük gelebilir ama yük dengeleyici arkasındaki konteynerler yeniden başladığında veya bir "connection storm" (bağlantı fırtınası) yaşandığında bu kuyruklar saniyeler içinde patlar.

### Çekirdeği İkna Etmek ve Node.js'teki O Gizli Parametre

İnce ayarımızı çekelim:

```ini
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
```

Ancak çekirdek seviyesinde bu ayarı değiştirmek savaşı tek başına kazandırmaz hacı. Node.js, HTTP sunucusunu ayağa kaldırırken varsayılan olarak `511` sınırıyla (backlog) dinleme yapar. Eğer sunucuyu başlatırken `listen` fonksiyonuna bu backlog sınırını vermezseniz, çekirdeğin kuyruk limitini 65535 yapsanız bile Node.js yine 511 sınırına takılır!

```javascript
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('ok');
});

// backlog değerini çekirdek ayarımızla eşitleyip 65535 yapıyoruz
server.listen(3000, '0.0.0.0', 65535, () => {
  console.log('backlog 65535 ile dinleniyor...');
});
```

Ayarın tutup tutmadığını canlıda görmek için şu komutu çalıştırabilirsiniz:

```bash
yuceltoluyag@archlinux:~$ ss -lnt | grep 3000
```

Eğer `Send-Q` (kuyruk kapasitesi) sütunu hâlâ `511` gösteriyorsa, ya Node.js uygulamasını yeniden başlatmayı unuttunuz ya da koddaki `listen` çağrısına bu değeri vermediniz demektir.

## 2. İstemci Tarafında Port Tükenmesi (Ephemeral Port Exhaustion)

Bizim Node.js servisimiz sadece istek karşılamıyor; yeri geliyor veri tabanına bağlanıyor, yeri geliyor diğer mikroservislere veya dış API'lere istek atıyor. Her dış TCP bağlantısı, varsayılan olarak `32768-60999` aralığından (yani yaklaşık 28.000 porttan) geçici bir port (ephemeral port) rezerve eder.

Özellikle kısa ömürlü (short-lived) isteklerin tavan yaptığı yoğun anlarda, bağlantı kapansa bile portlar 2 dakika boyunca (`tcp_fin_timeout` süresince) `TIME_WAIT` durumunda asılı kalır. Port havuzu tükendiğinde, uygulamanız dışarıya istek atamaz ve terminale `EADDRNOTAVAIL` hatası düşer. Karşı servis çökmüş gibi görünür ama aslında kendi çekirdeğiniz nefessiz kalmıştır.

Bunu aşmak için port aralığını genişletip portların güvenli şekilde yeniden kullanımını aktif ediyoruz:

```ini
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
```

`tcp_tw_reuse` sayesinde çekirdek, zaman damgalarını kullanarak `TIME_WAIT` durumundaki soketleri güvenli bir şekilde yeni giden bağlantılar için tekrar kullanabilir.

!!! danger "Kritik Uyarı: tcp_tw_recycle Ayarına Dokunmayın!"
    İnternetteki 10 yıllık eski blog yazılarına aldanıp sakın `tcp_tw_recycle` parametresini açmayın hacı. Bu ayar NAT (Network Address Translation) arkasından gelen istemcilerde bağlantıların rastgele düşmesine neden olduğu için Linux 4.12 sürümünde çekirdekten tamamen sökülüp atıldı.

Port durumunu anlık izlemek için şu tek satırlık komutu kullanabilirsiniz:

```bash
yuceltoluyag@archlinux:~$ ss -tan | awk '{print $4}' | cut -d: -f2 | sort | uniq -c | sort -rn | head
```

## 3. Daha Yüksek Veri Akışı İçin Bellek Tamponları (TCP Buffers)

Node.js üzerindeki akışların (streams) yüksek bant genişliğinde tıkanmadan çalışabilmesi için çekirdeğin bellek tamponlarında yeterli alan olmalıdır. Eğer `rmem_max` ve `wmem_max` değerleri düşük kalırsa, çekirdek daha küçük bir TCP penceresi (TCP window) anons eder ve yüksek hızlı bağlantılar bile hak ettiği performansı veremez. Konteyner ortamlarındaki sanal ağ köprüleri (veth bridge) bu duruma ekstra yük bindirir.

```ini
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.core.netdev_max_backlog = 65535
```

Buradaki üçlü değerler sırasıyla minimum, varsayılan ve maksimum tampon boyutlarını (byte cinsinden) belirler. Çekirdek, ağ gecikmesine ve veri akışına göre tamponu dinamik olarak ölçeklendirir. 16 MiB'lık tavan sınırı, boşta bekleyen bağlantıların belleği sömürmesini engellerken yoğun veri akışında can simidi olur.

`netdev_max_backlog` ise ağ kartı (NIC) seviyesindeki paket kuyruğunu kontrol eder. Eğer ağ kartına gelen paketler çekirdeğin bunları kullanıcı alanına (userspace) teslim etme hızından daha hızlı yığılıyorsa, paketler doğrudan ağ kartında çöpe gider. Bunu `ethtool -S eth0 | grep rx_missed_errors` veya `ifconfig` çıktısındaki RX errors alanından takip edebilirsiniz.

## 4. Atıl Soketlerin Hızlıca Temizlenmesi (TCP Keepalive)

Rolling update (kesintisiz güncelleme) esnasında veya NAT ağ geçidindeki kesintilerde, istemci veya sunucu tarafları bağlantının koptuğunu anlayamayabilir. Bu durumda soketler "yarı açık" (half-open) şekilde asılı kalır. Linux'un varsayılan Keepalive süresi tam 2 saattir hacı. Ölü bir soketin 2 saat boyunca bağlantı havuzunuzu meşgul etmesi sunucu kaynaklarının boş yere tükenmesi demektir.

Süreyi daha insani sınırlara çekiyoruz:

```ini
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 10
net.ipv4.tcp_keepalive_probes = 6
```

Bu ayarla birlikte, 60 saniye boyunca hiç veri geçmeyen sokete 10 saniye aralıklarla 6 kez kontrol paketi (probe) gönderilir. Eğer karşı taraftan ses çıkmazsa, yaklaşık 2 dakika içinde bağlantının öldüğü anlaşılır ve havuzdan temizlenir. Tabii bu ayarın çalışması için Node.js tarafında da HTTP Agent kullanırken `keepAlive: true` ayarının açık olması gerekir[^1].

## Hangi Limana Çarptığını Teşhis Etmek (Hızlı Kontrol Listesi)

Yaşadığınız ağ sorununun hangi çekirdek limitine çarptığını anlamak için hazırladığım şu haritaya göz atabilirsiniz:

* **Belirti:** Yüksek yük altında CPU sakin ama bağlantılar zaman aşımına (timeout) uğruyor.
  * **Olası Limit:** `somaxconn` veya Node.js tarafındaki listen backlog sınırı.
  * **Teşhis Komutu:** `ss -lnt` ile `Send-Q` ve `Recv-Q` değerlerini karşılaştırın.
* **Belirti:** `dmesg` loglarında `SYN flooding` uyarısı çıkıyor.
  * **Olası Limit:** `tcp_max_syn_backlog` kuyruğu dolmuş.
  * **Teşhis Komutu:** `dmesg | grep SYN`
* **Belirti:** Dış servislere atılan isteklerde `EADDRNOTAVAIL` hatası.
  * **Olası Limit:** Ephemeral (geçici) port tükenmesi.
  * **Teşhis Komutu:** `ss -tan | grep TIME_WAIT | wc -l` değerini local port aralığıyla karşılaştırın.
* **Belirti:** Yüksek hızlı hatlarda bant genişliği 1 Gbps barajını aşamıyor.
  * **Olası Limit:** TCP bellek tamponları (buffer) yetersiz.
  * **Teşhis Komutu:** `cat /proc/sys/net/core/rmem_max`
* **Belirti:** Ani trafik dalgalanmalarında düzensiz gecikme (latency) sıçramaları.
  * **Olası Limit:** Ağ kartı kuyruk limiti (`netdev_max_backlog`).
  * **Teşhis Komutu:** `ethtool -S eth0 | grep rx_missed_errors` veya `ifconfig` çıktısındaki `RX errors` alanına bakın.
* **Belirti:** Karşı servis çöktükten sonra bağlantı havuzundaki ölü soketler dakikalarca temizlenmiyor.
  * **Olası Limit:** Keepalive süreleri çok yavaş.
  * **Teşhis Komutu:** `cat /proc/sys/net/ipv4/tcp_keepalive_time`

## Tüm Ayarları Tek Dosyada Toplamak

Aşağıdaki yapılandırmayı Ansible, Terraform veya doğrudan manuel olarak sunucularınıza dağıtabilirsiniz. Güvenli sınırlarda kalınmış, TCP standartlarını bozmayan temiz bir settir:

```ini
# /etc/sysctl.d/99-nodejs-microservices.conf

# Gelen bağlantı kapasitesi
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# Giden bağlantı kapasitesi ve port yönetimi
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 30

# Veri akışı için bellek tamponları (Byte cinsinden)
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.core.netdev_max_backlog = 65535

# Ölü bağlantılerin hızlıca elenmesi
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 10
net.ipv4.tcp_keepalive_probes = 6

# TCP yığını için bellek güvenlik sınırı (Sayfa sayısı cinsinden, byte değil!)
net.ipv4.tcp_mem = 786432 1048576 26777216
```

Bu ayarları sunucuya uygulamak için:

```bash
yuceltoluyag@archlinux:~$ sudo sysctl --system
```

!!! warning "Dikkat! tcp_mem Parametresi Tehlikelidir"
    `tcp_mem` satırı, çekirdeğin TCP soketleri için ayırabileceği toplam bellek miktarını kontrol eder. Buradaki değerler byte değil, **bellek sayfası (page)** cinsindendir (genelde x86_64 mimarisinde sayfa başına 4 KiB). Eğer bu sınırı sunucunuzun toplam RAM kapasitesine göre çok düşük ayarlarsanız, çekirdek paketleri bodoslama çöpe atmaya başlar. Yukarıdaki değerleri başlangıç noktası olarak alıp, yük altında `free` ve `slabtop` çıktılarına göre ayarlayabilirsiniz.

## Altyapı Ayarları Kötü Kodu Kurtarmaz

Çekirdeğe ince ayar çekmek sunucuya nefes aldırır ama kötü yazılmış kodu kurtarmaz hacı. Eğer sizin Node.js uygulamanızdaki event loop, senkron bir `JSON.parse` veya ağır bir döngü yüzünden 200 ms boyunca kilitleniyorsa, `somaxconn` limitini bir milyona da çıkarsanız o kuyruk eninde sonunda patlar. Çünkü uygulama çekirdekten bağlantıları kabul (`accept`) edemiyordur.

Aynı şekilde, her istekte yeni bir veri tabanı bağlantısı açıp bunu kapatmayı unutuyorsanız, ephemeral port tükenmesiyle er ya da geç yüzleşirsiniz. Çekirdek ayarları size sadece kaçış rampası sağlar, sızıntıyı çözmek sizin işinizdir.

## Konteyner Dünyasındaki Tuzaklar (Docker & Kubernetes)

Docker veya Kubernetes kullanıyorsanız, `sysctl` ayarlarının çekirdekteki yerine dikkat etmeniz gerekir:

1. **Konteyner içinde güvenli olanlar:** `tcp_tw_reuse` ve `tcp_rmem` gibi ağ isim alanına (network namespace) dahil ayarları konteyner içerisinden de değiştirebilirsiniz.
2. **Sadece host üzerinde çalışanlar:** `somaxconn`, `rmem_max`, `wmem_max` ve `netdev_max_backlog` gibi ayarlar ağ isim alanına dahil değildir. Bunları konteyner içinden set etmeye çalışırsanız yetki hatası alırsınız veya ayar hiçbir işe yaramaz. Bunları doğrudan sunucu makinesinde (host) ayarlamanız şarttır.
3. **Kubernetes için en temiz yol:** K8s ortamlarında bu ayarları pod seviyesinde veya runtime sidecar'larıyla çözmek yerine, node provisioning (düğüm hazırlama) aşamasında, yani Terraform cloud-init veya özel makine imajları (AMI) aracılığıyla doğrudan host seviyesine gömmek en temiz yaklaşımdır.

Tüm bu ayarları altyapı otomasyonunuza dahil edin, sessiz sedasız can sıkan o ağ sorunlarını tarihe gömün.

Hadi kalın sağlıcakla!

---

### 🔗 Laboratuvardan Diğer Notlar

Sistemleri kurcalarken, ağ trafiğini yönetirken ve performansı artırırken işinize yarayacak diğer yazılarım da şurada:

* [Arch Linux'ta DNS Gizemi: VPN, systemd-resolved ve Unbound](/arch-linux-dns-vpn-systemd-resolved-unbound/)
* [Arch Linux'ta dnsmasq ve dnscrypt-proxy Kurulum Rehberi](/arch-linux-dnsmasq-dnscrypt-proxy/)
* [AWS EC2'de OpenVPN Nasıl Kurulur ve DNS Leak Nasıl Düzeltilir](/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/)
* [Şişko Docker İmajlarına Diyet: 1.2 GB'tan 78 MB'a Yolculuk](/docker-imaj-boyutu-kucultme-rehberi/)
* [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)

[^1]: Node.js tarafındaki keepAlive ayarı sadece uygulamanın bağlantıyı açık tutmasını sağlar, çekirdek seviyesindeki TCP keepalive süresi değiştirilmediğinde ise ölü bağlantılar işletim sistemi düzeyinde yine 2 saat asılı kalmaya devam eder.
