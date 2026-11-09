Title: Arch Linux'ta dnsmasq ve dnscrypt-proxy Kurulum Rehberi
Date: 2025-10-13 18:00
Modified: 2026-11-09
Category: Linux
Tags: dnsmasq,dnscrypt-proxy,Arch Linux,DNS güvenliği,systemd-resolved,DoH,DNSSEC,NetworkManager
Slug: arch-linux-dnsmasq-dnscrypt-proxy
authors: yuceltoluyag
Summary: Arch Linux'ta dnsmasq ile yerel DNS önbelleği oluşturup dnscrypt-proxy üzerinden Cloudflare DoH kullanmayı, NetworkManager yapılandırmasını ve DNSSEC doğrulamasını kendi sistemimde test ettiğim adımlarla anlatıyorum.
Image: images/arch-linux-guvenli-dns-kurulum-xl.webp
Template: article
Lang: tr
Status: published
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115364056455751216
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m2zxtdzots2l

DNS ayarları genellikle bilgisayarda internet bağlantısı çalıştığı sürece pek akla gelmiyor. Modemden DNS almak, DHCP'nin verdiği ayarları kullanmak derken çoğu zaman sorgularımızın nereye gittiğini de takip etmiyoruz.

Ben Arch Linux üzerinde bu işi biraz daha kontrollü hâle getirmek istedim. Bunun için iki aracı bir araya getirdim: **dnsmasq ve dnscrypt-proxy.**

dnsmasq yerel DNS sunucusu ve önbellek görevi görüyor. dnscrypt-proxy ise DNS sorgularını Cloudflare'ın DNS-over-HTTPS (DoH) hizmetine iletiyor. Böylece uygulamalar yerel DNS sunucusuyla konuşurken dışarıya gönderilen normal DNS sorguları HTTPS üzerinden şifreleniyor.

Kurulumu yaparken NetworkManager'ın DNS yönetimini de düzenlemek gerekiyor. Çünkü hem NetworkManager'ın hem de ayrı bir DNS servisinin aynı yapılandırmayı yönetmeye çalışması gereksiz sorunlara yol açabiliyor.

Bu rehberde teorik bir kurulumdan ziyade kendi Arch Linux sistemimde uyguladığım ve test ettiğim yapılandırmayı anlatıyorum.

## 1. Kullanacağımız DNS mimarisi

Önce kuracağımız yapının nasıl çalıştığına bakalım:

```text
Arch Linux uygulamaları
        |
        v
dnsmasq
127.0.0.1:53
        |
        v
dnscrypt-proxy
127.0.0.1:5300
        |
        v
Cloudflare DNS (DoH)
        |
        v
İnternet
```

Burada iki servisin görevini birbirinden ayırmak önemli:

- **dnsmasq:** Yerel DNS sunucusu olarak çalışır ve sorguları önbelleğe alır.
- **dnscrypt-proxy:** DNS sorgularını seçtiğimiz haricî resolver'a şifreli bağlantıyla gönderir.

Kullandığım portlar:

| Servis | Adres | Görev |
|---|---|---|
| dnsmasq | 127.0.0.1:53 | Yerel DNS ve önbellek |
| dnscrypt-proxy | 127.0.0.1:5300 | Şifreli DNS bağlantısı |

Burada 5300 portunu özellikle seçtim. Başka örneklerde 54 veya 53000 gibi farklı portlar görebilirsiniz. Önemli olan iki servisin aynı adres ve portu kullanmaması.

### Test ettiğim sistem

Kurulumu doğruladığım Arch Linux sistemimdeki paket sürümleri şöyleydi:

| Paket | Sürüm |
|---|---|
| dnsmasq | 2.93-1 |
| dnscrypt-proxy | 2.1.20-1 |
| NetworkManager | 1.58.1-3 |
| systemd | 262.1-1 |
| dig (bind-tools) | 9.20.30 |

Bu sürümler 9 Kasım 2026 tarihinde sistemimden alınan çıktılardır. Daha sonraki Arch Linux güncellemelerinde paket sürümleri farklı olabilir.

## 2. Kurulum öncesinde portları kontrol edelim

Öncelikle DNS için kullanacağımız portları başka servislerin kullanıp kullanmadığını kontrol edelim.

```bash
sudo ss -lntup | grep -E '127\.0\.0\.1:(53|5300)([[:space:]]|$)'
```

Bu komut özellikle 127.0.0.1 adresindeki 53 ve 5300 portlarını kontrol eder.

Burada `grep :53` şeklinde genel bir arama kullanmıyorum. Çünkü 5353 portundaki Multicast DNS (mDNS) trafiği de bu aramaya takılabilir.

Benim ilk kontrollerimde Chrome ve KDE Connect uygulamalarının 5353 portunu kullandığını gördüm. Bu kayıtlar dnsmasq veya dnscrypt-proxy ile çakışma yaşandığını göstermiyordu.

### systemd-resolved gerekli mi?

Eski kurulumumda `systemd-resolved` servisini tamamen devre dışı bırakıp maskelemiştim. Ancak biraz daha ayrıntılı inceleyince bunun her Arch Linux kullanıcısı için zorunlu bir işlem olmadığını gördüm.

Servisin durumunu kontrol etmek için:

```bash
systemctl status systemd-resolved
```

Varsayılan systemd-resolved yapılandırmasında yerel DNS adresi genellikle `127.0.0.53:53` olur. Bizim dnsmasq yapılandırmamız ise `127.0.0.1:53` adresini kullanıyor.

Bunlar farklı yerel adresler olduğu için yalnızca port numaralarının aynı olmasına bakarak çakışma olduğunu söyleyemeyiz. Önce hangi servisin hangi adreste dinlediğini görmek gerekiyor.

Benim sistemimde `systemd-resolved` servisi devre dışı ve çalışmıyor. Bununla birlikte bu rehberde herkese servisi maskelemesini önermiyorum.

!!! warning "Dikkat: systemd-resolved servisini gereksiz yere maskelemeyin"
    `systemctl mask` bir servisin başlatılmasını tamamen engeller. DNS yapılandırması için bunu otomatik olarak uygulamayın. Önce mevcut dinleme adreslerini ve sisteminizdeki DNS yönetimini kontrol edin.

## 3. Gerekli paketleri yükleyelim

İki servisi de resmî Arch Linux depolarından kurabiliriz:

```bash
sudo pacman -S dnsmasq dnscrypt-proxy
```

Kontrol etmek için:

```bash
pacman -Q dnsmasq dnscrypt-proxy
```

Bu aşamada henüz `/etc/resolv.conf` dosyasını değiştirmiyoruz. Önce DNSCrypt servisinin çalıştığından emin olacağız.

## 4. dnscrypt-proxy yapılandırması

Şimdi DNS sorgularını şifreli bağlantıyla dışarıya gönderecek servisi hazırlayalım.

Yapılandırma dosyası:

```bash
sudoedit /etc/dnscrypt-proxy/dnscrypt-proxy.toml
```

Mevcut dosyanın tamamını silmeyin. Aşağıdaki seçeneklerin karşılıklarını bulun ve kendi yapılandırmanıza uygulayın:

```toml
server_names = ['cloudflare']

listen_addresses = ['127.0.0.1:5300']

require_dnssec = true
require_nolog = true
require_nofilter = true

cache = true
```

Ayarların görevleri:

| Ayar | Açıklama |
|---|---|
| server_names | Kullanılacak resolver'ı belirler. |
| listen_addresses | Servisin yerel olarak hangi IP ve portta dinleyeceğini belirler. |
| require_dnssec | Resolver seçiminde DNSSEC desteğiyle ilgili filtreyi tanımlar. |
| require_nolog | Resolver listesindeki kayıt tutmama beyanıyla ilgili filtreyi tanımlar. |
| require_nofilter | Resolver listesindeki filtreleme yapmama özelliğiyle ilgili filtreyi tanımlar. |
| cache | dnscrypt-proxy önbelleğini etkinleştirir. |

!!! note "Önemli: server_names ve require_* seçenekleri"
    `server_names = ['cloudflare']` ile bir resolver'ı açıkça seçtiğimizde dnscrypt-proxy'nin `require_*` filtreleri bu seçim üzerinde uygulanmaz. Bu seçenekler otomatik resolver seçimi sırasında kullanılır. Dolayısıyla `require_nolog=true` gibi bir ayarı Cloudflare'ın kayıt tutmadığının garantisi olarak yorumlamayın. Bu davranış, dnscrypt-proxy'nin kendi yapılandırma açıklamasında da belirtilir.

### DoH mu, DNSCrypt mi?

Burada önemli bir ayrıntı var: Programın adı dnscrypt-proxy olsa da yalnızca DNSCrypt protokolünü kullanmak zorunda değil.

Benim yapılandırmamda Cloudflare resolver'ı DNS-over-HTTPS (DoH) kullanıyor.

Bunu yalnızca yapılandırma dosyasından tahmin etmiyorum. Kendi sistemimde servis günlüklerini kontrol ettiğimde şu satırı gördüm:

```text
[cloudflare] OK (DoH) - rtt: 426ms, live servers: 1
```

Bu kayıt, Cloudflare resolver'ının DoH üzerinden kullanılabilir durumda olduğunu gösteriyor.

Cloudflare DoH, DNS sorgularını HTTPS istekleri içinde taşıyarak ağ üzerindeki DNS trafiğinin düz metin olarak okunmasını ve kolayca değiştirilmesini önlemeyi amaçlar.

### Servisi etkinleştirme

Bu kurulumda dnscrypt-proxy'nin normal systemd servis yöntemini kullanıyorum:

```bash
sudo systemctl enable --now dnscrypt-proxy.service
```

Burada `dnscrypt-proxy.socket` servisini ayrıca etkinleştirmiyorum. Çünkü ArchWiki iki farklı çalışma yöntemi sunuyor: normal servis yöntemi ve socket activation yöntemi. Bu rehberde normal servis yöntemini kullanıyoruz.

Servisin durumunu kontrol edelim:

```bash
systemctl is-active dnscrypt-proxy
```

Beklenen çıktı:

```text
active
```

Resolver bağlantısını loglardan görmek için:

```bash
journalctl -u dnscrypt-proxy -b --no-pager
```

Başlangıç sırasında ağ henüz hazır değilse dnscrypt-proxy bir süre bekleyebilir. Benim sistemimde de ilk loglarda ağ bağlantısının henüz hazır olmadığı belirtilmiş, birkaç saniye sonra bağlantı kurulmuş ve Cloudflare resolver'ı kullanılabilir duruma gelmişti.

## 5. dnsmasq yapılandırması

Şimdi yerel DNS önbelleğini oluşturacak dnsmasq servisine geçelim.

Önce servisi kurduğumuzdan emin olalım:

```bash
sudo pacman -S dnsmasq
```

Yapılandırma dosyasını açalım:

```bash
sudoedit /etc/dnsmasq.conf
```

Ben bu kurulumda ayrı bir `/etc/dnsmasq.d/` dizini oluşturmak yerine doğrudan ana yapılandırma dosyasını kullanıyorum.

Dosyanın ilgili ayarları şöyle:

```ini
no-resolv
listen-address=127.0.0.1
server=127.0.0.1#5300
cache-size=1000

conf-file=/usr/share/dnsmasq/trust-anchors.conf
dnssec
```

Şimdi bu seçeneklerin neden gerekli olduğuna bakalım.

**no-resolv**

dnsmasq'ın `/etc/resolv.conf` dosyasını okuyarak başka DNS sunucuları öğrenmesini engeller.

Bizim `/etc/resolv.conf` dosyamızda zaten `127.0.0.1` bulunacak. dnsmasq'ın kendisini yeniden DNS sunucusu olarak kullanmaya çalışmasına gerek yok. Bunun yerine bütün normal DNS sorgularını açıkça 5300 portundaki dnscrypt-proxy'ye göndermesini istiyoruz.

**listen-address=127.0.0.1**

dnsmasq'ın yalnızca yerel makinenin IPv4 loopback adresinde dinlemesini sağlar. Böylece bu yapılandırmayı ağdaki diğer bilgisayarlara DNS hizmeti vermek için kullanmıyoruz.

**server=127.0.0.1#5300**

En önemli satırlardan biri. dnsmasq'a gelen sorguların dnscrypt-proxy'ye gönderilmesini sağlar.

**cache-size=1000**

dnsmasq'ın DNS önbelleğinin kapasitesini belirler.

**conf-file ve dnssec**

Bu iki ayar DNSSEC doğrulaması için kullanılır.

`conf-file` seçeneği, dnsmasq'ın DNSSEC güven köklerini içeren dosyayı okumasını sağlar. `dnssec` seçeneği ise DNSSEC doğrulamasını etkinleştirir.

### trust-anchors.conf dosyası nedir?

İlk kurulum sırasında benim de kafamı karıştıran noktalardan biri burasıydı.

`/usr/share/dnsmasq/trust-anchors.conf` dosyasını elle oluşturmuyoruz. Arch Linux paketinin sağladığı bu dosya sistemde zaten bulunuyor.

İçeriğini kontrol etmek için:

```bash
cat /usr/share/dnsmasq/trust-anchors.conf
```

Benim sistemimde dosyada iki DS kaydı bulunuyor:

- Key Tag 20326
- Key Tag 38696

İkinci anahtar özellikle önemli. DNS kök bölgesi 11 Ekim 2026 tarihinde KSK-2024 olarak bilinen yeni anahtarla imzalanmaya başladı. Bu anahtarın Key Tag değeri 38696.

Dosyanın yorum satırında 2024 tarihinin yazması, içerikteki bütün kayıtların eski olduğu anlamına gelmiyor. Asıl kontrol etmemiz gereken şey etkin `trust-anchor` kayıtlarıdır.

!!! note "DNSSEC kök anahtarı geçişi"
    IANA'nın 11 Ekim 2026 tarihli duyurusuna göre yeni KSK-2024 anahtarı (38696) DNS kök bölgesini imzalamaya başladı. Benim sistemimde bu anahtarın DS kaydı zaten `trust-anchors.conf` içerisinde bulunuyor. Bu nedenle dosyaya elle anahtar eklemeye veya mevcut kayıtları silmeye gerek duymadım.

    Gelecekte bu dosyanın ve DNSSEC güven köklerinin güncelliğini kontrol etmek önemlidir.

### dnsmasq yapılandırmasını test etme

Servisi yeniden başlatmadan önce sözdizimini kontrol edelim:

```bash
sudo dnsmasq --test
```

Başarılı olduğunda:

```text
dnsmasq: syntax check OK.
```

Şimdi servisi etkinleştirelim:

```bash
sudo systemctl enable --now dnsmasq.service
```

Yapılandırma değişikliklerinden sonra servisi yeniden başlatmak için:

```bash
sudo systemctl restart dnsmasq
```

Durumunu kontrol edelim:

```bash
systemctl is-active dnsmasq
```

Beklenen çıktı:

```text
active
```

## 6. NetworkManager ve /etc/resolv.conf yapılandırması

Şimdi sistemin normal DNS sorgularını yerel dnsmasq servisine göndermesini sağlayacağız.

NetworkManager, DHCP üzerinden modemden DNS sunucusu bilgisi alabilir. Ancak bu yapılandırmada DNS dosyasını NetworkManager'ın yönetmesini istemiyoruz.

Önce yapılandırma dosyasını açalım:

```bash
sudoedit /etc/NetworkManager/NetworkManager.conf
```

`[main]` bölümünde aşağıdaki ayarların bulunduğundan emin olun:

```ini
[main]
dns=none
systemd-resolved=false
```

Mevcut `[main]` bölümüne ekleyin. Dosyada zaten bulunuyorlarsa tekrar yazmayın.

Bu ayarların görevleri:

- `dns=none`: NetworkManager'ın `/etc/resolv.conf` dosyasını değiştirmesini engeller.
- `systemd-resolved=false`: NetworkManager'ın DNS yapılandırmasını systemd-resolved servisine göndermesini engeller.

NetworkManager yapılandırmasını yeniden yükleyelim:

```bash
sudo nmcli general reload
```

Bu noktada NetworkManager'ın DNS yönetimi bizim için devre dışı kalmış oluyor. DNS dosyasının içeriğini kendimiz belirleyeceğiz.

### /etc/resolv.conf dosyasını düzenleme

Önce dosyanın mevcut durumunu kontrol edelim:

```bash
ls -l /etc/resolv.conf
readlink /etc/resolv.conf
```

Dosya sembolik bağlantıysa nereye yönlendirildiğini mutlaka inceleyin. Hangi servis tarafından yönetildiğini bilmeden silmeyin.

Benim sistemimde `/etc/resolv.conf` normal bir dosya olarak bulunuyor.

Düzenlemek için:

```bash
sudoedit /etc/resolv.conf
```

Dosyanın ilgili içeriği:

```ini
nameserver 127.0.0.1
```

Artık sistemin normal DNS çözümleme istekleri yerel dnsmasq servisine yönlendirilecek.

!!! warning "DNS ayarlarını karıştırmayın"
    `dns=none` kullanırken NetworkManager'ın DHCP üzerinden aldığı DNS adreslerinin `nmcli device show` çıktısında görünmeye devam etmesi normaldir. Önemli olan sistemin kullandığı `/etc/resolv.conf` dosyasının doğru DNS adresini göstermesidir.

## 7. Kurulumun doğrulanması

Her şeyi yapılandırdık. Şimdi gerçekten istediğimiz DNS zincirini kullanıp kullanmadığımızı kontrol edelim.

### 7.1 Port kontrolü

```bash
sudo ss -lntup | grep -E '127\.0\.0\.1:(53|5300)([[:space:]]|$)'
```

Benim sistemimde gördüğüm çalışma düzeni:

```text
udp UNCONN 0 0 127.0.0.1:53   0.0.0.0:* users:(("dnsmasq",pid=805,fd=4))
udp UNCONN 0 0 127.0.0.1:5300 0.0.0.0:* users:(("dnscrypt-proxy",pid=723,fd=6))
tcp LISTEN 0 32   127.0.0.1:53   0.0.0.0:* users:(("dnsmasq",pid=805,fd=5))
tcp LISTEN 0 4096 127.0.0.1:5300 0.0.0.0:* users:(("dnscrypt-proxy",pid=723,fd=7))
```

PID ve dosya tanıtıcıları her sistemde farklı olacağı için bunların birebir aynı olması gerekmiyor.

Önemli olan:

- 53 portunda dnsmasq.
- 5300 portunda dnscrypt-proxy.
- Her iki servisin de UDP ve TCP üzerinden dinlemesi.

### 7.2 DNSCrypt bağlantısını doğrudan test etme

Önce dnsmasq'ı devre dışı bırakmadan, doğrudan dnscrypt-proxy'ye sorgu gönderelim:

```bash
dig @127.0.0.1 -p 5300 cloudflare-dns.com A
```

Benim sistemimde bu sorgu `NOERROR` sonucu ile başarılı oldu.

Bu test, dnscrypt-proxy'nin yerel bağlantı üzerinden sorgu kabul edip yanıt döndürdüğünü gösterir. Şifreli dış bağlantının doğrulanması için ayrıca servis logunda Cloudflare resolver'ının `OK (DoH)` durumunu kontrol ediyoruz.

### 7.3 dnsmasq üzerinden DNS çözümleme testi

Şimdi sorguyu yerel dnsmasq üzerinden gönderelim:

```bash
dig @127.0.0.1 archlinux.org +short
```

IP adresi dönerse dnsmasq sorguyu çözüyor demektir.

Ayrıca normal sistem DNS yolunu kontrol edelim:

```bash
getent ahosts archlinux.org
```

Bu komut, uygulamaların kullandığı sistem isim çözümleme mekanizmasının da çalıştığını kontrol eder.

### 7.4 Geçerli DNSSEC imzasını test etme

DNSSEC'in yalnızca yapılandırma dosyasında etkin görünmesi yeterli değil. Gerçekten doğrulama yapıldığını kontrol etmeliyiz.

Bunun için geçerli DNSSEC imzası bulunan test alan adını sorgulayalım:

```bash
dig @127.0.0.1 test.dnscheck.tools A +dnssec
```

Benim sistemimde aldığım önemli çıktı:

```text
status: NOERROR
flags: qr rd ra ad
```

Buradaki `ad` bayrağı, DNS yanıtının doğrulanmış olduğunu gösterir.

### 7.5 Hatalı DNSSEC imzasını test etme

Şimdi tersini deneyelim. Bilerek hatalı DNSSEC imzasına sahip alan adını sorgulayacağız:

```bash
dig @127.0.0.1 badsig.test.dnscheck.tools A +dnssec
```

Beklenen sonuç:

```text
status: SERVFAIL
```

Benim sistemimde de tam olarak bu sonucu aldım.

Böylece yalnızca geçerli imzaların kabul edildiğini değil, hatalı imzaların da reddedildiğini kontrol etmiş olduk.

### 7.6 Servis loglarını kontrol etme

Her iki servisin günlüklerini birlikte görüntüleyebiliriz:

```bash
journalctl -u dnsmasq -u dnscrypt-proxy --since "10 minutes ago"
```

Yalnızca DNSCrypt kayıtlarını görmek için:

```bash
journalctl -u dnscrypt-proxy -b --no-pager
```

dnsmasq için:

```bash
journalctl -u dnsmasq -b --no-pager
```

Özellikle dnscrypt-proxy tarafında şu satırı arıyorum:

```text
[cloudflare] OK (DoH)
```

Bu kayıt, seçilen Cloudflare resolver'ının kullanılabilir olduğunu ve DoH üzerinden çalıştığını gösteriyor.

## 8. Gizlilik konusunda bilmemiz gerekenler

Bu yapılandırmanın amacı DNS sorgularını şifrelemek ve yerel DNS önbelleğinden yararlanmak. Ancak güvenli DNS kullanmak internette tamamen anonim olmak anlamına gelmiyor.

Dikkat edilmesi gereken birkaç nokta var:

**DoH bağlantısı:** Normal DNS sorguları dnscrypt-proxy tarafından Cloudflare'a HTTPS üzerinden gönderilir. Böylece yerel ağdaki diğer cihazların veya internet sağlayıcısının DNS sorgularını doğrudan düz metin olarak görmesi engellenir.

**DNS sağlayıcısı:** Sorgular yine Cloudflare'a ulaşır. Dolayısıyla DNS sağlayıcısının gizlilik politikası önemlidir. `require_nolog=true` ayarı tek başına kayıt tutulmadığının kanıtı değildir.

**Bootstrap sorguları:** dnscrypt-proxy ilk açılışta resolver kaynaklarını veya sunucu adreslerini çözmek için bootstrap resolver kullanabilir. Benim servis günlüklerimde `download.dnscrypt.info` ve `raw.githubusercontent.com` adreslerinin bootstrap resolver üzerinden UDP ile çözümlendiğini gördüm. Bu başlangıç aşamasındaki tek seferlik adres çözümlemeleri, normal kullanıcı DNS sorgularından farklıdır. Projenin yapılandırma açıklamasına göre bootstrap resolver'lar normal kullanıcı sorgularını taşımak için kullanılmaz.

**DNSSEC:** DNSSEC, DNS kayıtlarının doğruluğunu ve kaynağını kontrol etmeye yardımcı olur. DNS sorgularını şifrelemez. Şifreleme görevini DoH üstlenir.

**Tarayıcı DNS ayarları:** Bazı tarayıcılar kendi DoH yapılandırmalarını kullanabilir. Bu durumda sistemin `/etc/resolv.conf` ayarını atlayabilirler. Kullanılan uygulamaların DNS tercihlerini ayrıca kontrol etmek gerekir.

Kısacası bu yapılandırma bizi görünmez yapmıyor. Amacımız DNS sorgularının aktarımını korumak ve DNS yanıtlarını doğrulamaktır.

## 9. Sonuç

Arch Linux üzerinde dnsmasq ve dnscrypt-proxy kullanarak yerel DNS önbelleği ile şifreli DNS bağlantısını bir araya getirdik.

Kurulumun sonunda sistemimiz şu şekilde çalışıyor:

```text
Uygulamalar
    |
    v
dnsmasq
127.0.0.1:53
    |
    v
dnscrypt-proxy
127.0.0.1:5300
    |
    v
Cloudflare DoH
    |
    v
İnternet
```

Kendi sistemimde yaptığım kontrollerde dnsmasq'ın 53, dnscrypt-proxy'nin 5300 portunda dinlediğini gördüm. DNSCrypt doğrudan sorguları başarılı oldu ve servis günlüklerinde Cloudflare resolver'ının DoH üzerinden kullanılabilir olduğu doğrulandı.

DNSSEC tarafında da iki ayrı test yaptım. Geçerli imzalı alan adı `NOERROR` ve `AD` bayrağıyla yanıt verirken hatalı imzalı alan adı `SERVFAIL` sonucu döndürdü.

Benim için asıl önemli nokta, yalnızca internete bağlanabilmek değil; DNS sorgularının hangi servisten geçtiğini, dışarıya hangi protokolle gönderildiğini ve DNS yanıtlarının doğrulanıp doğrulanmadığını kontrol edebilmek oldu.

## Kaynaklar

- [Dnsmasq - ArchWiki](https://wiki.archlinux.org/title/Dnsmasq){: target="_blank" rel="noopener noreferrer"}
- [Dnscrypt-proxy - ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy){: target="_blank" rel="noopener noreferrer"}
- [NetworkManager - ArchWiki](https://wiki.archlinux.org/title/NetworkManager){: target="_blank" rel="noopener noreferrer"}
- [NetworkManager.conf - Arch Linux Manual Pages](https://man.archlinux.org/man/NetworkManager.conf.5){: target="_blank" rel="noopener noreferrer"}
- [dnscrypt-proxy resmi yapılandırma örneği](https://github.com/DNSCrypt/dnscrypt-proxy/blob/master/dnscrypt-proxy/example-dnscrypt-proxy.toml){: target="_blank" rel="noopener noreferrer"}
- [Cloudflare DNS-over-HTTPS dokümantasyonu](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/){: target="_blank" rel="noopener noreferrer"}
- [IANA - DNSSEC Trust Anchors and Rollovers](https://www.iana.org/dnssec/files){: target="_blank" rel="noopener noreferrer"}
- [IANA - DNS Root Zone Begins Using New Key Signing Key](https://www.iana.org/news/2026/root-zone-begins-using-new-ksk-2026){: target="_blank" rel="noopener noreferrer"}

---

[responsive_img src="/images/arch-linux-guvenli-dns-kurulum2-xl.webp" alt="Arch Linux üzerinde dnsmasq ve dnscrypt-proxy ile güvenli DNS yapılandırması" /]