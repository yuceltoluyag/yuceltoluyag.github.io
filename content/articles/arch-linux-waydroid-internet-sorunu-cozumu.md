Title: Arch Linux'ta Waydroid İnternet Sorunu Çözümü
Date: 2025-10-17 14:30
Category: Sorun Giderme
Tags: waydroid, arch linux, android, linux, iptables, konteyner, ağ yapılandırması
Slug: arch-linux-waydroid-internet-sorunu-cozumu
Authors: yuceltoluyag
Status: published
Summary: Waydroid Android logosunda takılıyor mu? İnternet yok mu? Iptables-nft uyumsuzluğunu çöz ve Arch Linux'ta Waydroid'i çalıştır. Adım adım rehber başlayan içeriyle.
Template: article
Series: Waydroid
Series_index: 2

# Arch Linux'ta Waydroid İnternet ve Boot Sorununun Çözümü

Waydroid'i Arch Linux'a kurmaya çalıştığında Android logosunda takılıp kalıyor mu? Veya içinde internet bağlantısı olmuyor mu? Bu sorunlar, Linux ve Android arasındaki ağ yapılandırmasında yaşanan uyumsuzluklardan kaynaklanıyor. Bu makalede, Waydroid nedir, neden bu sorunlar oluşur ve adım adım nasıl çözeceğiniz anlatacağım. Makaleyi bitirdiğinde sisteminiz tam olarak çalışacak ve internet bağlantısı sorunsuz olacak.

## Waydroid Nedir ve Neden Kullanmalıyız?

**Waydroid nedir?** Waydroid, Android işletim sistemini Linux üzerinde doğal olarak çalıştıran bir platformdur. Basitçe söylemek gerekirse, Linux makinenizde bir Android sistemi kurup doğrudan Android uygulamalarını çalıştırabiliyorsunuz. Sanal makine teknolojisinin aksine, Waydroid çok daha hafif ve hızlıdır çünkü LXC (Linux Container) teknolojisini kullanır.

Neden Waydroid kullanmalıyız? Eğer Linux kullanan biri iseniz ve Android uygulamalarına ihtiyaç duyuyorsanız, Waydroid tam çözümdür. Telefon emulatörü gibi ağır değildir ve doğrudan konteyner teknolojisi sayesinde oldukça performanslıdır. Arch Linux kullanıcıları ise özellikle bu teknolojinin minimalist yapısını sevmektedir.

## Sorunun Belirtileri Nelerdir?

Waydroid kurulum sonrası veya kullanım sırasında bazı göstergeler varsa sorunla karşı karşıya olabilirsiniz. Aşağıdaki komutlardan birini çalıştırdığınızda problemin varlığını anlayabilirsiniz:

```bash
sudo systemctl status waydroid-container
```

Bu komut şu çıktıyı gösterebilir:

```
[Errno 2] No such file or directory: '/var/lib/waydroid/waydroid.log'
Session: STOPPED
Vendor type: MAINLINE
```

Diğer durumlarda ise:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh start
```

komutu şu hataları üretebilir:

```
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: No chain/target/match by that name.
```

Bu hata mesajlarını aldıktan sonra Waydroid açılıyor ancak Android başlangıç logosunda takılı kalıyor ve içinde internet bağlantısı olmuyor. Başka bir işarete bakacak olursak, Waydroid shell komutlarında ping'in çalışmadığını veya WiFi ayarlarından hiçbir ağı göremediğinizi fark edebilirsiniz.

## İşin Içinde Neler Var? Teknik Açıklama

Bu sorunun temelinde iki ana faktör yatıyor. İlki, Arch Linux'un varsayılan olarak `iptables-nft` arka uygulamasını kullanmasıdır. İkincisi ise Waydroid'in ağ yapılandırma betiğinin eski `iptables-legacy` kurallarıyla yazılmış olmasıdır.

Kısaca ne oluyor? Waydroid, ağ kurulum betiğini çalıştırırken Linux firewall kurallarını düzenlemeye çalışıyor. Ancak nft backend ile legacy kuralları eşleştirmiyor ve bu nedenle gerekli NAT (Network Address Translation) kuralları oluşturamıyor. NAT kurulmazsa, konteyner içindeki Android sistem internete erişemiyor. Bu yüzden açılırken çalışmaya devam ediyor ancak ağ başlatılamadığından boot aşamasında takılıyor.

!!! note "<strong>NAT Nedir?</strong> Network Address Translation (NAT), bir özel ağdaki cihazları (bu durumda Waydroid konteyneri) ana sisteme bağlayan ve onları internete çıkmasını sağlayan bir ağ tekniğidir. Konteyner içindeki Android'in kendi IP adresi vardır ama bu IP'yi internet'e doğrudan gösteremez. NAT kuralları sayesinde konteyner dışarıya çıkabiliyor."

## Çözüm Adımları: Waydroid'i Çalıştırmak

Sorunun çözümü oldukça sistematiktir. Aşağıdaki adımları sırasıyla uygulayarak Waydroid'i tam çalışır duruma getirebilirsiniz.

### Adım 1: Mevcut Yapılandırmayı Temizle

İlk olarak aktif olan Waydroid işlemlerini ve ağ arayüzlerini temizlemeniz gerekir. Bu adım önceki başarısız denemelerden kalan kuralları kaldırır:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh stop
sudo pkill -f waydroid
sudo umount /var/lib/waydroid/rootfs 2>/dev/null
```

Bu komutlar sırasıyla; Waydroid ağ betiğini durdurur, tüm Waydroid işlemlerini kapatır ve konteynerin montajını kaldırır. Hata alırsanız endişelenmeyin, bu tamamen normaldir.

### Adım 2: nft Backend'inin Durumunu Kontrol Et

Sisteminizin hangi iptables backend'ini kullandığını kontrol etmeniz gerekir:

```bash
sudo iptables -V
```

Eğer çıktıda `iptables v1.8.x (nf_tables)` yazıyorsa, nft backend'i zaten aktif durumdadır ve bu adımı atlayabilirsiniz. Ancak çıktıda "legacy" yazıyorsa, nft'ye geçiş yapmanız gerekmektedir:

```bash
sudo pacman -S iptables-nft
sudo ln -sf /usr/bin/iptables-nft /usr/bin/iptables
sudo ln -sf /usr/bin/ip6tables-nft /usr/bin/ip6tables
```

Bu komutlar iptables-nft paketini kurar ve sistem komutlarını legacy yerine nft versiyonlarıyla bağlantılandırır.

!!! warning "Eğer sistemde başka containerlar çalışıyorsa (Docker, Podman vb.), bu adımı yapmadan önce onları da kontrol etmeniz önerilir çünkü iptables değişiklikleri onları etkileyebilir."

### Adım 3: Eski ve Bozuk Kuralları Temizle

Önceki Waydroid kurulumlarından veya başarısız denemelerden kalan kuralları temizlemelisiniz:

```bash
sudo iptables -F
sudo iptables -t nat -F
sudo iptables -X
sudo iptables -t nat -X
```

Bu komutlar firewall kurallarını sıfırlarlar. `-F` seçeneği kuralları siler, `-X` seçeneği ise özel zincir kurallarını kaldırır. `nat` tablosu internet yönlendirmesiyle ilgili kurallarıdır.

### Adım 4: Waydroid Ağ Betiğini Başlatmayı Dene

Şimdi Waydroid ağ betiğini çalıştırabilirsiniz:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh start
```

Eğer bu komut hatasız çalışırsa, bir sonraki adıma geçebilirsiniz. Ancak hâlâ "Bad rule" hatası alıyorsanız, manuel NAT kurulumu yapmanız gerekecektir. [Docker ve konteyner teknolojisi hakkında daha fazla bilgi almak için yazımızı okuyabilirsiniz](/arch-linux-docker-kurulumu/).

### Adım 5: Manuel NAT Kuralları Ekle (Çalışan Çözüm)

Bu adım, iptables uyumsuzluğunu çözmek için en etkili ve kalıcı yöntemdir. Aşağıdaki komutları sırasıyla çalıştırın:

```bash
sudo iptables -t nat -A POSTROUTING -s 192.168.240.0/24 -o enp3s0 -j MASQUERADE
sudo iptables -A FORWARD -i waydroid0 -j ACCEPT
sudo iptables -A FORWARD -o waydroid0 -m state --state RELATED,ESTABLISHED -j ACCEPT
```

Bu komutları açıklamak gerekirse:

İlk komut, Waydroid konteynerinin özel ağ aralığından (192.168.240.0/24) gelen trafiği ana sistemin ağ arayüzüne (enp3s0) yönlendirir ve masquerading yaparak internete çıkmasını sağlar. İkinci komut, waydroid0 arayüzünden gelen tüm trafiği kabul eder. Üçüncü komut ise dış ağdan gelen cevapları konteyner içine geri yönlendirir.

**Önemli Not:** `enp3s0` değerini kendi aktif ağ arayüzünüzle değiştirmelisiniz. Hangi arayüzü kullandığınızı öğrenmek için şu komutu çalıştırın:

```bash
ip a
```

Çıktıda internet bağlantınız olan arayüzü bulun. Genellikle `eth0`, `en0`, `wlan0` veya `wlp` ile başlayan isimler olabilir. Bu adımı doğru yapmazsanız Waydroid yine internete çıkamayacaktır.

!!! tip "<strong>Ağ arayüzünü bulma:</strong> Eğer WiFi kullanıyorsanız genellikle "wlan" ile başlayan isim vardır. Kablolu ağ kullanıyorsanız "eth" veya "enp" ile başlayan isim ararsınız. Her durumda `ip a` komutu size tüm arayüzleri gösterecektir."

### Adım 6: IP Yönlendirmesini Etkinleştir

Linux sistemin paket yönlendirmesini (IP forwarding) aktifleştirmeniz gerekmektedir. Bu, bir ağdan gelen paketleri başka bir ağa göndermek için gereklidir:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

Ancak bu ayar sistem yeniden başlatıldığında sıfırlanacaktır. Kalıcı hale getirmek için şu komutu da çalıştırın:

```bash
sudo bash -c 'echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/99-waydroid.conf'
```

Bu komut, sistemin her başlatılışında IP yönlendirmesini otomatik olarak aktifleştirecek bir yapılandırma dosyası oluşturur. Böylece Waydroid sistem yeniden başlatıldıktan sonra da düzgün çalışmaya devam edecektir.

### Adım 7: Waydroid Konteynerini Yeniden Başlat

Tüm ayarlamalardan sonra Waydroid konteynerini yeniden başlatmanız gerekir:

```bash
sudo systemctl restart waydroid-container
sudo waydroid status
```

İkinci komut konteyner durumunu gösterecektir. Eğer başarılıysa şu çıktıyı göreceksiniz:

```
Session: RUNNING
Vendor type: MAINLINE
```

### Adım 8: İnternet Bağlantısını Test Et

Artık Waydroid içinde internet bağlantısının çalışıp çalışmadığını test edebilirsiniz. Ping komutlarıyla bağlantıyı kontrol edin:

```bash
waydroid shell ping -c 3 8.8.8.8
```

Alternatif olarak bir alan adı ile de test edebilirsiniz:

```bash
waydroid shell ping -c 3 google.com
```

Eğer ping cevap alıyorsa (3 satır çıktı görüyorsa), Waydroid içinde internet bağlantısı başarılı demektir. Şimdi Android arayüzü açılacak ve sistem başarıyla boot olacaktır. Logolar geçecek, sistem açılacak ve uygulamaları kullanabileceksiniz.

## Ekstra Bilgiler ve İpuçları

Kurulum sırasında veya sonrasında başka sorunlarla karşılaşabilirsiniz. Bunların çözümlerini burada bulabilirsiniz.

**Waydroid init hatası alıyorsanız:**

Eğer `sudo waydroid init` sırasında hatalarla karşılaşırsanız, detaylı çıktı görmek faydalı olacaktır:

```bash
sudo waydroid --details-to-stdout init
```

Bu komut, başlatma sırasında neler olduğunu adım adım gösterecek ve hatanın neresinde olduğunu anlayabilmenizi sağlayacaktır.

**NAT kuralları kalıcı hale getirmek:**

Kurduğunuz NAT kuralları sistem yeniden başlatıldığında kaybolabilir. Kalıcı hale getirmek için `iptables-save` komutunu kullanabilirsiniz. Daha detaylı bilgi için [Linux firewall yapılandırması makalemizi](/linux-firewall-ayarlari) okumanız önerilir.

```bash
sudo iptables-save > /etc/iptables/iptables.rules
sudo systemctl enable iptables
sudo systemctl start iptables
```

Bu komutlar firewall kurallarını kaydeder ve sistem başlangıcında otomatik olarak yüklemesini sağlar.

## Sorunlar Özet Tablosu

Yaygın sorunlar ve hızlı çözümleri şöyledir: Android logosunda takılma, genellikle NAT kurulumunun gerçekleşmemesinden kaynaklanır. Bu durumda dördüncü adıma dönerek iptables-nft NAT kurallarını manuel olarak eklemeyi deneyin. "Bad rule" hatası alıyorsanız, nft backend'inin eski scriptlerle uyumsuz olduğu anlamına gelir ve elle NAT oluşturmak önerilen çözümdür. Waydroid.log dosyası eksikse veya bulunamıyorsa, `sudo waydroid init` komutuyla dizinleri yeniden oluşturmayı deneyin. IP forwarding açılmamışsa, konteyner internete erişemez ve altıncı adımı kontrol edin.

## Sonuç ve Sonraki Adımlar

Bu makalede öğrendiğiniz çözümler sayesinde Waydroid'de internetin çalışmasını ve Android sisteminin düzgün açılmasını sağlayabileceksiniz. Arch Linux'ta Waydroid sorunları neredeyse her zaman bu adımlarla çözülebilir. Sistem yeniden başlatıldığında kurallar kaybolmaması için IP forwarding ayarını ve NAT kurallarını kalıcı hale getirdiğinizden emin olun.

Waydroid tam olarak çalıştıktan sonra, sisteminizi optimize etmek isteyebilirsiniz. Herhangi bir sorunda bu makalenin adımlarını tekrar gözden geçirin ve kontrol listesini kullanarak doğru yaptığınızı teyit edin.

Başarılar dilerim! Waydroid'in tam olarak çalışmaya başlamışsa, Linux üzerinizde Android uygulamalarını sorunsuz şekilde kullanabileceksiniz.

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="HVQBmWN5ZaU"></lite-youtube>
