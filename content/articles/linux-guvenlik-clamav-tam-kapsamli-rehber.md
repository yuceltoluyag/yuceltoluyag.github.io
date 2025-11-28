Title: Linux'ta Tam Kapsamlı Paranoya: ClamAV ile A'dan Z'ye Güvenlik
Date: 2025-11-14 02:30
Category: Linux
Tags: clamav, güvenlik, linux, on-access, clamd, freshclam, milter, sorun giderme, tech-sohbetçi
Slug: linux-guvenlik-clamav-tam-kapsamli-rehber
Authors: yuceltoluyag
Summary: Önceki rehberi unutun. Bu sefer SADECE daemon kurmuyoruz; bildirim almaktan VirusEvent, e-posta taramaya milter, çoklu çekirdek hilelerine ve tüm olası hata ayıklamalarına kadar ClamAV'nin tüm potansiyelini masaya yatırıyoruz.
Image: images/linux-clamav-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115553349825156285
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6prd6b42227

## Giriş: Neden Hâlâ Bunlarla Uğraşıyoruz?

"Linux'a virüs bulaşmaz" efsanesini bir kenara bırakalım. Bu rahatlık, en büyük güvenlik açığımız haline geldi. Windows'a kıyasla pazar payımız düşük olabilir, bu yüzden büyük şirketler bize özel "Endpoint Security" paketleri çıkarmakla uğraşmıyor. Var olan araçlar da genelde Windows'taki kuzenlerinin gelişmiş özelliklerinden yoksun.

Ama dünya değişti. Linux sunucuları, IoT cihazları... Saldırı yüzeyi her gün büyüyor ve Linux tabanlı zararlı yazılımların sayısı da artıyor.

Bu ortamda, elimizdeki en sağlam, açık kaynaklı ve aktif olarak geliştirilen kalelerden biri **Clam AntiVirus (ClamAV)**.

ClamAV, UNIX sistemler için bir antivirüs araç takımıdır. Genellikle dosya/posta sunucularında kullanıldığı için, yerleşik imzalarıyla zararlı yazılımları tespit etmeye odaklanır; yani geleneksel bir "endpoint security" paketi değildir. Biz de onu bir sunucu gibi yapılandıracağız.

---

### Adım 1: Kurulum ve Araç Kutusu

Her zamanki gibi, Arch (veya türevleri) üzerinden gidiyoruz:

```bash
sudo pacman -S clamav
```

Bu komut sadece `clamav` kurmaz, bize bir İsviçre çakısı verir:

- **`clamd`**: Bizim asıl hedefimiz. Arka plan hizmeti (daemon).
- **`clamonacc`**: Gerçek zamanlı koruma (On-Access) hizmeti. `clamd` ile konuşur.
- **`clamdscan`**: `clamd` daemon'u üzerinden tarama yapan hızlı istemci.
- **`clamdtop`**: `clamd`'nin kaynak kullanımını izlemek için bir arayüz (`top` komutu gibi).
- **`freshclam`**: Virüs imza veritabanı güncelleme aracı.
- **`clamconf`**: Yapılandırma dosyalarını oluşturma ve kontrol etme aracı.

Tüm bu araçlar, `clamd` ile bir **soket (socket)** üzerinden iletişim kurar. Varsayılan olarak bu, "LocalSocket" (yerel bir unix soketi) üzerinden yapılır.

#### ⚠️ TCP Soketi Uyarısı (Profesyoneller İçin)

ClamAV, "TCPSocket" adıyla bir ağ soketi açarak uzaktan iletişime de izin verir.

!!! danger "Kesinlikle Okuyun: Güvenlik Uyarısı Eğer `clamd.conf` dosyanızda `TCPSocket` kullanmayı seçerseniz, bu portun **herhangi bir kimlik doğrulaması veya koruması olmadığını** bilin. Genellikle yerel unix soketini (`LocalSocket`) kullanın. Eğer ağa açmak zorundaysanız, güvenlik duvarı kurallarıyla bu portu _çok_ sıkı korumalısınız."

Daha fazla bilgi için şu kaynaklara bakabilirsiniz:

- [Detaylı Bilgi (Resmi Blog)](https://blog.clamav.net/2016/06/regarding-use-of-clamav-daemons-tcp.html){: target="\_blank" rel="noopener noreferrer"}
- Detaylı Bilgi (Manuel): [TCP Socket Configuration](https://docs.clamav.net/manual/Usage/Scanning.html#clamd-v0101){: target="\_blank" rel="noopener noreferrer"}

Ayrıca, `LocalSocket` kullanırken `clamd`'nin, taramayı planladığınız dosyalara erişim izni olan bir kullanıcı (genellikle `clamav` kullanıcısı) altında çalışması gerektiğini unutmayın.

---

### Adım 2: Yapılandırma Dosyalarını Oluşturma

Paketi kurunca varsayılan `.conf` dosyaları gelmeli. Eğer gelmezse veya sıfırdan oluşturmak isterseniz, `clamconf` bunun için var:

```bash
# Gerekirse (genellikle gerekmez)
# sudo clamconf -g freshclam.conf > /etc/clamav/freshclam.conf
# sudo clamconf -g clamd.conf > /etc/clamav/clamd.conf
# sudo clamconf -g clamav-milter.conf > /etc/clamav/clamav-milter.conf
```

Ana yapılandırma dosyalarımız şunlar:

- **`freshclam`**: `/etc/clamav/freshclam.conf` (Güncellemeler için)
- **`clamd`**: `/etc/clamav/clamd.conf` (Daemon'un beyni)
- **`clamd milter`**: `/etc/clamav/clamav-milter.conf` (E-posta filtresi için)

İşiniz bittiğinde `clamconf` komutunu çalıştırarak ayarlarınızı kontrol edebilirsiniz. Varsayılan kurulum zaten `clamav` kullanıcısını, grubunu ve gerekli `clamd` ayarlarını "makul" bir seviyede yapar.

Ama biz "makul" ile yetinmeyeceğiz.

---

### Adım 3: `clamd.conf` – Canavarın Beyni (Tam Sürüm)

`sudo nano /etc/clamav/clamd.conf` ile dosyayı açın ve aşağıdaki ayarları bulun, `#` işaretini kaldırın veya ekleyin. Bu, benim önerdiğim "paranoyak ama performanslı" ayar listesidir:

```ini
# /etc/clamav/clamd.conf

# Her mesaja zaman damgası ekle. Hata ayıklarken hayat kurtarır.
# Varsayılan: no
LogTime yes

# Virüs bulunduğunda dosya boyutu, hash gibi EK bilgiler ver.
ExtendedDetectionInfo yes

# Güvenlik için ŞART. Daemon'u 'clamav' kullanıcısı olarak çalıştır.
# (clamd'nin root olarak başlatılması gerekir ki bu değişikliği yapabilsin)
# Varsayılan: ayrıcalıkları düşürme
User clamav

# Dizinlerin ne kadar derinine inecek?
# Varsayılan: 15
MaxDirectoryRecursion 20

# Potansiyel Olarak İstenmeyen Uygulamaları (PUA) algıla.
# Torrent'ten inen 'tool'lar genelde PUA sayılır. Kesinlikle 'yes'.
DetectPUA yes

# Sezgisel (Heuristic) taramayı aç. Bilinmeyen ama şüpheli görünenleri yakalar.
HeuristicAlerts yes

# === Tarama Hedefleri (Hepsini açıyoruz) ===
ScanPE yes
ScanELF yes
ScanOLE2 yes
ScanPDF yes
ScanSWF yes
ScanXMLDOCS yes
ScanHWP3 yes
ScanOneNote yes
ScanMail yes
ScanHTML yes
ScanArchive yes
Bytecode yes

# === Uyarılar (Bunlar da açılsın) ===
AlertBrokenExecutables yes
AlertBrokenMedia yes
AlertEncrypted yes
AlertEncryptedArchive yes
AlertEncryptedDoc yes
AlertOLE2Macros yes
AlertPartitionIntersection yes
```

---

### Adım 4: Veritabanını Güncelleme (`freshclam`)

Daemon'u çalıştırmadan önce veritabanına ihtiyacımız var.

```bash
# Manuel olarak güncelle (ilk çalıştırma için şart)
sudo freshclam
```

Eğer bir proxy arkasındaysanız, `/etc/clamav/freshclam.conf` dosyasındaki `HTTPProxyServer`, `HTTPProxyPort` vb. ayarları düzenleyin.

Veritabanı dosyaları (`daily.cvd`, `main.cvd`, `bytecode.cvd`) `/var/lib/clamav/` içine kaydedilir.

#### Otomatik Güncellemeler: Service vs. Timer

Otomatik güncelleme için **iki** seçeneğiniz var. İkisini birden çalıştırmayın

1.  **`clamav-freshclam.service` (Daemon Modu):**

    - Bu, `freshclam`'i bir daemon olarak çalıştırır ve varsayılan olarak günde 12 kez (2 saatte bir) güncelleme kontrolü yapar.
    - **Not:** Bu servis her başladığında da kontrol yapar. Saatte 1'den fazla kontrol yaparsanız ClamAV CDN'inden 24 saatliğine **yasaklanırsınız**.

2.  **`clamav-freshclam-once.timer` (Timer Modu):**

    - Bu, `freshclam`'i günde bir kez çalıştıran bir systemd zamanlayıcısıdır.
    - **Not:** Bu zamanlayıcı, yeniden başlatmalardan veya servis durmalarından bağımsız olarak belirlediğiniz programa uyar.

Ben genellikle `.service` olanı tercih ediyorum.

```bash
# Gerekli log dosyasını oluşturalım (izinler önemli)
sudo touch /var/log/clamav/freshclam.log
sudo chmod 600 /var/log/clamav/freshclam.log
sudo chown clamav /var/log/clamav/freshclam.log

# Seçenek 1: Service'i başlat (Tavsiye edilen)
sudo systemctl start clamav-freshclam.service
sudo systemctl enable clamav-freshclam.service

# Seçenek 2: Timer'ı başlat (Alternatif)
# sudo systemctl start clamav-freshclam-once.timer
# sudo systemctl enable clamav-freshclam-once.timer
```

---

### Adım 5: Gerçek Zamanlı Koruma (OnAccessScan)

Burası işin en zevkli kısmı. Torrent'ten inen dosyanın daha iner inmez taranması.

#### A. Temel Yapılandırma

`sudo nano /etc/clamav/clamd.conf` dosyasına geri dönün ve şu satırları ekleyin/düzenleyin:

```ini
# /etc/clamav/clamd.conf (EKLENECEK KISIM)

# Tarayıcının kendi kullanıcısını (clamav) tarama döngüsünden çıkar.
OnAccessExcludeUname clamav

# İzlenecek bağlama noktası (mount point). '/' tüm sistemi izler.
OnAccessMountPath /

# Alternatif olarak sadece belirli dizinleri de izleyebilirsiniz:
# OnAccessIncludePath /home

# YENİ OLUŞTURULAN, TAŞINAN veya YENİDEN ADLANDIRILAN dosyaları tara.
OnAccessExtraScanning yes

# Opsiyonel: Root kullanıcısına ait işlemleri dışarıda bırak
# OnAccessExcludeRootUID true
```

!!! danger "Engelleme (Prevention) Ayarı: ÇOK KRİTİK `OnAccessPrevention no` ayarını **MUTLAKA `no`** olarak bırakın."

!!! note "`OnAccessMountPath` ile engelleme (`yes`) zaten çalışmaz. `OnAccessIncludePath` ile çalışır ama `/usr`, `/etc` veya `/var` gibi sistem dizinlerini izlerken bunu `yes` yaparsanız, Arch Wiki'nin de uyardığı gibi, **paket kurulumlarınızı 1000 kat yavaşlatabilirsiniz.** Bizim amacımız "engellemek" değil, "tespit edip haberdar olmak""

#### B. `fdpass` ile İzin Sorununu Aşmak (İleri Seviye)

Varsayılan olarak `clamonacc` (root olarak çalışır), `clamd`'ye (clamav olarak çalışır) sadece erişilen _dosya adlarını_ yollar. Eğer `clamav` kullanıcısının o dosyaya okuma izni yoksa, tarama başarısız olur.

Çözüm: `clamonacc`'nin `clamd`'ye dosya tanımlayıcısını (file descriptor) geçmesini sağlamak (`fdpass`).

Bunun için `clamav-clamonacc.service` servisini düzenlememiz gerek:

```bash
# systemd servis dosyasını düzenlemek için
sudo systemctl edit clamav-clamonacc.service
```

Açılan boş dosyaya şunları yapıştırın:

```ini
[Service]
ExecStart=
ExecStart=/usr/sbin/clamonacc -F --fdpass --log=/var/log/clamav/clamonacc.log
```

Bu, mevcut `ExecStart` komutunu siler ve yerine `--fdpass` bayrağıyla yenisini ekler.

---

### Adım 6: Masaüstü Bildirimlerini Ayarlama

Şu ana kadar ClamAV, bir virüs bulduğunda bunu sadece log dosyasına sessizce yazar. Biz ise masaüstümüzde bir uyarı görmek istiyoruz.

**1. `clamd.conf`'u Düzenle**

`sudo nano /etc/clamav/clamd.conf` içine şu satırı ekleyin:

```ini
VirusEvent /etc/clamav/virus-event.bash
```

Bu, `clamd`'ye "virüs bulduğunda bu betiği çalıştır" der.

**2. `sudoers` İzni Ver**

`clamav` kullanıcısının, diğer kullanıcılar adına `notify-send` komutunu çalıştırmasına izin vermeliyiz.

```bash
sudo visudo -f /etc/sudoers.d/clamav
```

Açılan boş dosyaya şu satırı ekleyin:

```
clamav ALL = (ALL) NOPASSWD: SETENV: /usr/bin/notify-send
```

**3. `virus-event.bash` Betiğini Oluştur**

Şimdi o betiği oluşturalım:

```bash
sudo nano /etc/clamav/virus-event.bash
```

İçine şunu yapıştırın:

```bash
#!/bin/bash
PATH=/usr/bin
ALERT="ClamAV İmza Tespiti: $CLAM_VIRUSEVENT_VIRUSNAME -> $CLAM_VIRUSEVENT_FILENAME"

# Tüm aktif grafiksel kullanıcılara bildirim gönder
for ADDRESS in /run/user/*; do
    USERID=${ADDRESS#/run/user/}
    /usr/bin/sudo -u "#$USERID" DBUS_SESSION_BUS_ADDRESS="unix:path=$ADDRESS/bus" PATH=${PATH} \
        /usr/bin/notify-send -u critical -i dialog-warning "VİRÜS BULUNDU!" "$ALERT"
done
```

**4. Betiği Çalıştırılabilir Yap**

```bash
sudo chmod +x /etc/clamav/virus-event.bash
```

Artık `clamd`'nin OnAccess taraması bir şey bulduğunda masaüstünüzde kritik bir bildirim göreceksiniz.

---

### Adım 7: Servisleri Başlatma (Motoru Ateşleme)

Artık her şey hazır. Önce veritabanını güncellediğinizden emin olun (Adım 4).

!!! warning "RAM Uyarısı Daemon'u başlatmak tüm virüs imzalarını RAM'e yükler. Şubat 2024 itibarıyla bu, **en az 1.6 GB boş RAM** gerektirir. Güncelleme anında bu ihtiyaç anlık olarak iki katına çıkabilir. Düşük RAM'li sistemlerde (`clamd` başlamazsa) swap alanı oluşturmanız gerekebilir."

```bash
# Ana daemon'u başlat
sudo systemctl start clamav-daemon.service
sudo systemctl enable clamav-daemon.service

# Gerçek zamanlı koruma daemon'unu başlat
sudo systemctl start clamav-clamonacc.service
sudo systemctl enable clamav-clamonacc.service
```

Eğer `AppArmor` (Ubuntu/Debian'da yaygındır) `clamd` hakkında hata verirse, profili şikayet moduna alın: `sudo aa-complain clamd`

---

### Adım 8: Test Sürüşü (EICAR)

Sistemimiz çalışıyor mu? `EICAR` adı verilen zararsız bir test dosyasıyla kontrol edelim.

**Test 1: Manuel Tarama (Daemon ile)**

```bash
curl https://secure.eicar.org/eicar.com.txt | clamdscan -
```

Çıktıda `stdin: Win.Test.EICAR_HDB-1 FOUND` görmelisiniz. `clamscan` değil, `clamdscan` kullandığımıza dikkat edin.

**Test 2: Gerçek Zamanlı Koruma**

İzlediğiniz bir dizine (örn: İndirilenler) EICAR dosyasını indirmeyi deneyin:

```bash
cd ~/İndirilenler/
wget https://secure.eicar.org/eicar.com.txt
```

Dosya iner inmez (veya `cat eicar.com.txt` ile okumaya çalıştığınızda) Adım 6'da ayarladığınız masaüstü bildiriminin patlaması gerekir

---

### Adım 9: Daha Fazla Göz (Ekstra Veritabanları)

ClamAV'nin resmi imzaları iyidir, ancak topluluk tarafından yönetilen ek veritabanlarıyla (MalwarePatrol, SecuriteInfo, Yara, LMD imzaları vb.) gücüne güç katabiliriz.

Bunun için AUR'dan iki araçtan birini kurabilirsiniz:

1.  **`python-fangfrisch` (AUR)**: `clamav-unofficial-sigs`'in yerine geçen, daha güvenli, esnek ve modern bir araç olarak tasarlanmıştır. **Tavsiye edilen budur.**
2.  **`clamav-unofficial-sigs` (AUR)**: Eski ve yaygın olan araç.

#### Seçenek 1: Fangfrisch Kurulumu (Tavsiye edilen)

`yay -S python-fangfrisch` (veya kullandığınız AUR yardımcısı) ile kurun.

```bash
# Yapılandırması çok basittir (/etc/fangfrisch/fangfrisch.conf)
# Asla root izni gerektirmemesi en büyük avantajıdır.

# Veritabanı yapısını 'clamav' kullanıcısı olarak başlat
sudo -u clamav /usr/bin/fangfrisch --conf /etc/fangfrisch/fangfrisch.conf initdb

# Zamanlayıcıyı etkinleştir
sudo systemctl enable fangfrisch.timer
```

#### Seçenek 2: clamav-unofficial-sigs Kurulumu (Alternatif)

`yay -S clamav-unofficial-sigs` ile kurun.

```bash
# Zamanlayıcıyı etkinleştir
sudo systemctl enable clamav-unofficial-sigs.timer

# Manuel çalıştırmak için
# sudo clamav-unofficial-sigs.sh

# Ayar dosyası: /etc/clamav-unofficial-sigs/user.conf
```

**MalwarePatrol Veritabanını Eklemek (İsteğe bağlı):**
Eğer MalwarePatrol kullanmak isterseniz (ücretli/ücretsiz planları var), [Malware Block List](https://malwareblocklist.org/){: target="\_blank" rel="noopener noreferrer"} adresinden kaydolun. Sonra (`clamav-unofficial-sigs` kullanıyorsanız) `/etc/clamav-unofficial-sigs/user.conf` dosyasını düzenleyin:

```ini
malwarepatrol_receipt_code="BURAYA_FATURA_NUMARANIZ"
malwarepatrol_product_code="8" # Ücretsiz hesap için 8, Premium için 15
malwarepatrol_list="clamav_basic" # basic veya ext
malwarepatrol_free="yes" # Ücretsizse yes, Premium ise no
```

---

### Adım 10: Manuel Tarama Seçenekleri

Daemon çalışırken bile manuel tarama yapmak isteyebilirsiniz.

1.  **`clamscan` (Standart/Eski Yöntem):**

    - Bu, daemon'u **kullanmaz**. Her seferinde tüm veritabanını RAM'e yeniden yükler.
    - Yavaştır. Sadece `clamd` çalışmıyorsa kullanın.
    - `clamscan --recursive --infected /home/kullanici`
    - `--remove`: Bulunan dosyayı siler (Tehlikeli).
    - `--move=/guvenli/dizin`: Karantinaya taşır (Daha güvenli).
    - `--max-filesize=4000M --max-scansize=4000M`: Varsayılandan büyük dosyaları tarar.
    - `-l /path/to/logfile.log`: Sonuçları dosyaya yazar.

2.  **`clamdscan` (Daemon/Hızlı Yöntem):**

    - Bu, arka planda çalışan `clamd`'ye işi paslar. **Süper hızlıdır.**
    - Çoğu ayarı (`--max-filesize` vb.) `clamd.conf`'tan okur.
    - `clamdscan /home/kullanici`

---

### Adım 11: İpuçları ve Hileler (Pro Seviye)

#### Çoklu Çekirdek Kullanımı

1.  **`clamscan` ile (KÖTÜ YÖNTEM):**
    `clamscan` tek çekirdekte çalışır. `xargs` ile paralelleştirebilirsiniz:
    `find /home/kullanici -type f -print0 | xargs -0 -P $(nproc) clamscan`
    **YAPMAYIN:** Bu, işlemci sayısı kadar `clamscan` işlemi başlatır ve her biri veritabanını RAM'e yükler. 16 çekirdeğiniz varsa 1.6GB \* 16 = \~25GB RAM'e ihtiyaç duyar. Sisteminizi kilitler.

2.  **`clamdscan` ile (DOĞRU YÖNTEM):**
    `clamd` zaten çoklu çekirdek için tasarlanmıştır.
    `clamdscan --multiscan --fdpass /home/kullanici`

    - `--multiscan`: `clamd.conf`'taki `MaxThreads` (varsayılan 10) ayarı kadar iş parçacığı kullanarak dizini paralel tarar.
    - `--fdpass`: `clamd`'nin (clamav kullanıcısı) sizin dosyalarınızı (kullanici) okuyabilmesi için izinleri (file descriptor) devreder.

#### TCPSocket'i Düzgün Etkinleştirme

Adım 1'deki uyarıyı hatırladınız mı? Eğer TCPSocket'i (örn: `127.0.0.1:3310`) `clamd.conf`'ta açarsanız, `systemd`'nin soket dosyasını da düzenlemeniz gerekir, yoksa çakışırlar:

`sudo systemctl edit clamav-daemon.socket`

Açılan dosyaya şunu ekleyin (hem yerel hem TCP soketini dinlemek için):

```ini
[Socket]
ListenStream=
ListenStream=/run/clamav/clamd.ctl
ListenStream=127.0.0.1:3310
```

Sonra `sudo systemctl restart clamav-daemon.socket` yapın. `ss -tulpn | grep clamd` komutuyla portun dinlendiğini görebilirsiniz.

---

### Adım 12: E-Posta Koruması (Milter)

Eğer sisteminizde `Sendmail` veya `Postfix` gibi bir e-posta sunucusu çalışıyorsa, ClamAV'yi gelen e-postaları taraması için bir "milter" (mail filter) olarak bağlayabilirsiniz.

**1. `clamav-milter.conf` Ayarları**
`/etc/clamav/clamav-milter.conf` dosyasını düzenleyin:

```ini
MilterSocket /tmp/clamav-milter.socket
MilterSocketMode 660
FixStaleSocket yes
User clamav
MilterSocketGroup clamav
PidFile /run/clamav/clamav-milter.pid
TemporaryDirectory /tmp
ClamdSocket unix:/run/clamav/clamd.ctl
LogSyslog yes
LogInfected Basic
```

**2. systemd Servisi Oluşturma**
`sudo nano /etc/systemd/system/clamav-milter.service`

```ini
[Unit]
Description='ClamAV Milter'
After=clamav-daemon.service

[Service]
Type=forking
ExecStart=/usr/bin/clamav-milter --config-file /etc/clamav/clamav-milter.conf
Restart=Always

[Install]
WantedBy=multi-user.target
```

**3. Postfix Ayarı (Örnek)**
Eğer Postfix kullanıyorsanız, `/etc/postfix/main.cf` içine ekleyin:

```ini
smtpd_milters = unix:/tmp/clamav-milter.socket
milter_default_action = tempfail
```

**4. Başlatma**
`sudo systemctl enable --now clamav-milter.service`
`journalctl` ile logları kontrol edin. Postfix'in sokete erişim izni yoksa, `postfix` kullanıcısını `clamav` grubuna ekleyin: `sudo gpasswd -a postfix clamav`.

---

### Adım 13: Sorun Giderme (Baş Ağrıları)

- **Hata: `Clamd was NOT notified` (freshclam sonrası)**

  - **Sorun:** `freshclam`, güncellemeyi `clamd`'ye bildiremiyor çünkü soket dosyası (`clamd.ctl`) yok veya yanlış yerde.
  - **Çözüm:** `clamd.conf` dosyasını açın ve `LocalSocket /run/clamav/clamd.ctl` satırının yorumunu kaldırıp aktif hale getirin. `clamav-daemon.service`'i yeniden başlatın.

- **Hata: `No supported database files found` (clamd başlarken)**

  - **Sorun:** `freshclam.conf` ve `clamd.conf` dosyalarındaki `DatabaseDirectory` ayarları birbiriyle eşleşmiyor. Biri `/var/lib/clamav` derken diğeri `/usr/share/clamav` diyor olabilir.
  - **Çözüm:** İki dosyayı da kontrol edin ve `DatabaseDirectory` yollarının **aynı** (genellikle `/var/lib/clamav`) olduğundan emin olun.

- **Hata: `Can't create temporary directory`**

  - **Sorun:** İzin hatası. Loglarda genellikle bir UID/GID numarası yazar.
  - **Çözüm:** `/var/lib/clamav` dizininin sahipliğini düzeltin.
    `sudo chown -R clamav:clamav /var/lib/clamav`
    `sudo chmod 755 /var/lib/clamav`

---

### Sonuç: Artık Gerçekten Paranoyaksınız

Bu rehber, kaynaktaki her bir detayı içeriyor. Artık sadece `clamscan` çalıştıran biri değilsiniz. Arka planda çalışan, RAM'de hazır bekleyen, çoklu çekirdekle tarama yapan, yeni dosyaları anında yakalayan, size masaüstü bildirimi atan, e-postalarınızı filtreleyen ve ekstra veritabanlarıyla güçlendirilmiş bir ClamAV canavarınız var.

Yine de unutmayın: En iyi antivirüs, o torrent'in yorumlarını okuyan sizsiniz.
