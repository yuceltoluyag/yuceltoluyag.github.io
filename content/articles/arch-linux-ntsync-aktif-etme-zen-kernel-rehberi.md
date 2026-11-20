Title: Arch Linux'ta ntsync Nasıl Aktif Edilir?
Date: 2025-11-30 09:45
Modified: 2026-11-20 00:50
Category: Linux
Tags: arch linux, ntsync, gaming, zen kernel, wine, proton
Slug: arch-linux-ntsync-aktif-etme-zen-kernel-rehberi
Authors: yuceltoluyag
Summary: Arch Linux'ta Wine ve Proton için ntsync desteğini nasıl etkinleştireceğinizi anlattım. Kernel gereksinimlerinden modül yüklemeye ve çalışan oyunlarda doğrulamaya kadar ihtiyacınız olan adımlar burada.
Image: images/arch-linux-ntsync-aktif-etme-zen-kernel-rehberi-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/116590713894345292
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm2qvmacis23

Her şey masum bir performans sevdasıyla başladı. Linux'ta oyun oynarken o meşhur micro-stuttering, yani anlık takılmaları bilirsiniz. Bazen FPS değeriniz gayet iyidir ama oyun yine de akıcı hissettirmez.

Ben de Wine ve Proton tarafında kullanılan **ntsync** teknolojisini araştırmaya başladım. Windows NT senkronizasyon mekanizmalarını Linux kernel tarafında uygulamayı amaçlayan bu sürücü, özellikle Windows oyunlarının Linux üzerindeki çalışma biçimini iyileştirmek için geliştirildi.

2025 yılında AUR'a girdim ve NTSync desteğiyle hazırlanan şu iki paketi kurdum:

1. `wine-tkg-staging-ntsync-bin`
2. `proton-xiv-bin`

Paketler indi, kuruldu. Artık işin tamamlandığını düşünüyordum. Fakat unuttuğum, daha doğrusu gözden kaçırdığım önemli bir ayrıntı vardı:

**Wine ve Proton tarafında destek bulunması yeterli değildi. Kullandığım Linux kernel'in de NTSync desteğine sahip olması gerekiyordu.**

## Hata: Ben Bu Modülü Tanımıyorum!

Açılış günlüklerini kontrol etmek için terminali açtım:

```bash
journalctl -b -p err
```

Karşıma şu hata çıktı:

```text
Failed to find module 'ntsync'
```

Sorunun kaynağını anlamak için kullandığım kernel sürümüne baktım:

```bash
uname -r
```

Çıktı:

```text
6.6.63-1-lts
```

Sorun burada ortaya çıktı. Wine ve Proton tarafında NTSync desteği bulunan paketleri kurmuştum ancak kullandığım 6.6 LTS kernel sürümünde bu sürücü bulunmuyordu.

Linux 6.14 ve sonrasındaki kernel sürümlerinde NTSync desteği kullanılabilir hale geldi. Dolayısıyla 6.6.63 gibi eski bir kernel sürümünde modülü bulamamam normaldi.

O dönemde Reddit'te karşıma çıkan bir öneri üzerine Zen Kernel'e geçmeye karar verdim. Kernel'i değiştirdikten sonra NTSync modülünü kontrol ettiğimde sorunun çözüldüğünü gördüm.

Ancak bu makaleyi güncellerken önemli bir ayrıntıyı düzeltmek istiyorum:

**NTSync kullanmak için Zen Kernel kurmak zorunda değilsiniz.**

O dönemde Zen Kernel'e geçmem sorunu çözdü ama bu, özelliğin yalnızca Zen Kernel'e ait olduğu anlamına gelmiyor. NTSync desteği bulunan uygun bir Linux kernel kullanmanız yeterli.

## NTSync Nedir, Ne İşe Yarar?

NTSync, Windows NT çekirdeğinde bulunan senkronizasyon mekanizmalarının Linux üzerinde kullanılabilmesini sağlayan bir kernel sürücüsüdür.

Windows uygulamaları ve oyunları; mutex, semaphore ve event gibi senkronizasyon nesnelerini yoğun biçimde kullanabilir. Wine bu davranışları Linux üzerinde taklit ederken geleneksel olarak kullanıcı alanında çalışan `wineserver` mekanizmasından yararlanıyordu.

NTSync ise bu işlemlerin kernel tarafında gerçekleştirilmesine yardımcı oluyor.

Linux kernel dokümantasyonuna göre sürücü üç temel senkronizasyon nesnesini destekliyor:

- **Semaphore:** Sayaç tabanlı senkronizasyon mekanizması.
- **Mutex:** Aynı anda yalnızca bir iş parçacığının sahip olabildiği kilitleme mekanizması.
- **Event:** Bir olayın gerçekleştiğini bildirmek için kullanılan senkronizasyon nesnesi.

Bu mekanizmalar Wine gibi kullanıcı alanında çalışan Windows uyumluluk katmanlarının ihtiyaç duyduğu davranışları Linux tarafında daha uygun şekilde gerçekleştirmesine yardımcı oluyor.

Daha teknik bilgi için [Linux Kernel – NT synchronization primitive driver dokümantasyonuna](https://docs.kernel.org/userspace-api/ntsync.html){: target="_blank" rel="noopener noreferrer"} göz atabilirsiniz.

## Zen Kernel Gerekli mi?

Hayır. NTSync konusunda en çok karıştırılan noktalardan biri bu.

Zen Kernel, Linux kernel'in performans ve masaüstü kullanımına yönelik çeşitli yamalar içeren bir türevidir. Ancak NTSync yalnızca Zen Kernel'e özgü bir özellik değildir.

Arch Linux'un resmi olarak desteklenen kernel paketleri NTSync modülünü içerir. Önemli olan kullandığınız kernel'in uygun sürümde olması ve modülün kernel yapılandırmasında etkinleştirilmiş olmasıdır.

ArchWiki'deki güncel bilgilere göre NTSync desteği Linux 6.14 ve sonrasındaki kernel sürümlerinde bulunuyor. Resmî kernel paketlerinde modül hazır geliyor ancak varsayılan olarak yüklenmiş olmayabiliyor.

Yani aşağıdaki kernel seçeneklerinden birini kullanmanız tek başına NTSync açısından avantaj veya dezavantaj oluşturmaz. Asıl belirleyici, çalışan kernel'in NTSync desteğidir.

- `linux`
- `linux-lts`
- `linux-zen`

LTS kernel kullanıyorsanız da yalnızca LTS olduğu için NTSync'ten vazgeçmeniz gerekmiyor. Kullandığınız LTS sürümünün 6.14 veya üzerinde olması ve gerekli desteği içermesi önemli.

Ayrıca Wayland veya X11 kullanmanız NTSync'in çalışması için belirleyici değil. NTSync grafik sunucusuyla değil, Linux kernel ile Wine/Proton arasındaki senkronizasyon mekanizmalarıyla ilgili.

## Adım 1: Kernel Sürümünü Kontrol Etme

Öncelikle sistemimizde hangi Linux kernel sürümünün çalıştığını öğrenelim:

```bash
uname -r
```

NTSync için pratik alt sınır Linux 6.14 sürümüdür.

Ancak yalnızca sürüm numarasına bakmak yeterli değil. Özellikle özel olarak derlenmiş kernel kullanıyorsanız NTSync modülünün gerçekten mevcut olup olmadığını da kontrol etmelisiniz.

## Adım 2: NTSync Modülünün Mevcut Olup Olmadığını Kontrol Etme

Şimdi modülün sistemimizde bulunup bulunmadığını kontrol edelim:

```bash
modinfo ntsync
```

Modül mevcutsa buna benzer bir çıktı görürsünüz:

```text
filename:       /lib/modules/6.x.x/kernel/drivers/misc/ntsync.ko.zst
license:        GPL
description:    Kernel driver for NT synchronization primitives
```

Buradaki `filename` satırı, modülün kullanılan kernel için mevcut olduğunu gösterir.

Şu hatayla karşılaşırsanız:

```text
modinfo: ERROR: Module ntsync not found.
```

Kullandığınız kernel için NTSync modülü bulunmuyor olabilir.

Bu durumda önce kernel sürümünü ve kullandığınız kernel paketinin NTSync desteğini kontrol edin. Sırf bu hatayı gördüğünüz için doğrudan Zen Kernel kurmaya yönelmeyin.

## Adım 3: NTSync Modülünü Etkinleştirme

Modül sistemde mevcutsa yüklemek oldukça basit.

Terminalden şu komutu çalıştırın:

```bash
sudo modprobe ntsync
```

Komut başarılı olduğunda genellikle herhangi bir çıktı vermez.

Şimdi modülün gerçekten yüklendiğini kontrol edelim:

```bash
lsmod | grep ntsync
```

Buna benzer bir sonuç görmelisiniz:

```text
ntsync                  24576  0
```

Bu çıktı, `ntsync` modülünün kernel tarafından yüklendiğini gösterir.

Ancak bir kontrolümüz daha var. NTSync sürücüsü yüklendiğinde `/dev/ntsync` isimli karakter aygıtı oluşturulmalıdır.

Bunu kontrol etmek için:

```bash
ls -l /dev/ntsync
```

Beklenen çıktı şu şekildedir:

```text
crw-rw-rw- 1 root root 10, 261 /dev/ntsync
```

Bu aygıt dosyası, Wine ve Proton gibi kullanıcı alanı uygulamalarının NTSync sürücüsüne erişmesini sağlar.

Böylece kernel tarafındaki hazırlığımız tamamlandı.

## Adım 4: NTSync Modülünü Her Açılışta Otomatik Yükleme

`sudo modprobe ntsync` komutu modülü mevcut oturumda yükler. Bilgisayar yeniden başladığında da otomatik olarak yüklenmesini istiyorsanız systemd'nin modül yükleme yapılandırmasını kullanabilirsiniz.

Bunun için şu dosyayı oluşturun:

```bash
sudo nano /etc/modules-load.d/ntsync.conf
```

Dosyanın içerisine yalnızca şu satırı yazın:

```text
ntsync
```

Kaydedip çıkın.

Bu yapılandırma, sistem açılırken `systemd-modules-load` servisinin NTSync modülünü yüklemesini sağlar.

Bu adım her Arch Linux kullanıcısı için zorunlu değil. Güncel ArchWiki'ye göre resmi Arch Linux `wine` ve `wine-staging` paketleri 11.14-2 sürümünden itibaren, çalışan kernel destekliyorsa NTSync modülünü otomatik yükleyebiliyor.

Bununla birlikte Steam üzerinden kullanılan Proton sürümlerinde ve özel Wine/Proton türevlerinde otomatik yükleme davranışı farklı olabilir. Bu nedenle kendi kullandığınız sürümün desteğini kontrol etmeniz önemli.

## Adım 5: Wine ve Proton NTSync Desteğine Sahip mi?

Kernel tarafında NTSync'i etkinleştirdik. Peki kullandığımız Wine ve Proton sürümleri bu özelliği destekliyor mu?

Bu noktada 2025 yılında kullandığımız özel paketlerle bugünkü yazılım ekosistemi arasında önemli farklar var.

### Wine

Wine 10.16 geliştirme sürümüyle NTSync tabanlı hızlı senkronizasyon desteği duyuruldu. Wine 11.0 kararlı sürümünün öne çıkan yenilikleri arasında da NTSync desteği bulunuyor.

Dolayısıyla yalnızca NTSync yamaları uygulanmış özel Wine sürümlerine ihtiyaç duyduğumuz dönem geride kaldı.

Arch Linux'un resmi Wine paketleri de güncel sürümlerinde bu desteği kullanabiliyor.

### Proton

Valve'ın resmi Proton sürümü de NTSync desteğine sahip.

ArchWiki'deki güncel bilgilere göre aşağıdaki sürümler, kernel modülü yüklüyse NTSync'i varsayılan olarak kullanıyor:

| Proton sürümü | NTSync desteği |
|---|---|
| Valve Proton 11.0-1 | Var |
| Proton-GE GE-Proton10-10 ve sonrası | Var |

Özel Proton türevlerinde ise durum farklı olabilir. Geliştiricinin NTSync desteğini uygulamış olması ve ilgili özelliği etkinleştirmesi gerekiyor.

Özellikle Proton-XIV gibi özel sürümleri kullanıyorsanız kendi sürümünüzün dokümantasyonunu kontrol edin.

### Gerektiğinde NTSync'i Devre Dışı Bırakma

Sorun giderme amacıyla Valve Proton'da NTSync'i devre dışı bırakmak da mümkün.

Steam'de oyunun özelliklerine girerek Başlatma Seçenekleri alanına şu komutu ekleyebilirsiniz:

```bash
PROTON_NO_NTSYNC=1 %command%
```

Bu ayar NTSync'i etkinleştirmez, tam tersine devre dışı bırakır. Yalnızca uyumluluk sorunlarını araştırırken veya karşılaştırma yaparken kullanın.

Normal kullanımda bu değişkeni eklemenize gerek yoktur.

## Adım 6: NTSync Gerçekten Kullanılıyor mu?

Kernel modülünün yüklü olması tek başına yeterli değil. Kullandığımız Wine/Proton ortamının gerçekten NTSync aygıtını açtığını da kontrol etmeliyiz.

Bunun için `lsof` aracından yararlanabiliriz.

Öncelikle NTSync kullandığını düşündüğünüz oyunu veya Windows uygulamasını açın. Uygulama çalışırken başka bir terminal açıp şu komutu girin:

```bash
lsof /dev/ntsync
```

NTSync kullanan Wine/Proton çalışma ortamına ait süreçlerin bu aygıtı açtığını gösteren kayıtlar görmelisiniz.

Örneğin:

```text
COMMAND   PID    USER      FD   TYPE DEVICE  SIZE/OFF NODE NAME
steam.exe 17584  friday13   14r  CHR  10,261  0t0      497  /dev/ntsync
wineserve 17586  friday13   14r  CHR  10,261  0t0      497  /dev/ntsync
```

Burada `steam.exe` ve `wineserver` gibi süreçlerin `/dev/ntsync` aygıtını açtığını görüyoruz.

ArchWiki de çalışan bir uygulama sırasında `lsof /dev/ntsync` komutunun kullanılmasını NTSync'in çalışıp çalışmadığını kontrol etme yöntemi olarak öneriyor.

Hiçbir sonuç alamazsanız şu ihtimalleri değerlendirin:

- Kullandığınız Wine veya Proton sürümü NTSync desteğine sahip olmayabilir.
- Kernel modülü yüklenmemiş olabilir.
- Kullandığınız özel Wine/Proton sürümü NTSync'i otomatik olarak etkinleştirmiyor olabilir.

## Kendi Sistemimde NTSync ve Call of Duty 4 Testi

Bu makaleyi güncellerken kendi sistemimde de kontrolleri yeniden yaptım.

İlk yazıyı hazırladığım dönemde 6.6 LTS kernel kullanıyordum. Daha sonra Zen Kernel'e geçtim ve bugün sistemimi varsayılan olarak bu kernel ile kullanıyorum.

Mevcut kernel sürümüm:

```bash
uname -r
```

```text
7.3.5-zen1-1-zen
```

Öncelikle NTSync modülünün sistemde bulunduğunu kontrol ettim:

```bash
modinfo ntsync
```

Çıktıdan ilgili satırlar:

```text
filename: /lib/modules/7.3.5-zen1-1-zen/kernel/drivers/misc/ntsync.ko.zst
license: GPL
description: Kernel driver for NT synchronization primitives
```

Ardından modülü yükledim:

```bash
sudo modprobe ntsync
```

Yüklendiğini kontrol ettiğimde:

```bash
lsmod | grep ntsync
```

şu sonucu aldım:

```text
ntsync  24576  0
```

Son olarak aygıt dosyasını kontrol ettim:

```bash
ls -l /dev/ntsync
```

```text
crw-rw-rw- 1 root root 10, 261 /dev/ntsync
```

Buraya kadar kernel tarafındaki hazırlık tamamlanmıştı.

Ancak yalnızca modülün yüklendiğini göstermek istemedim. Daha önce Linux üzerinde kurduğum [Call of Duty 4: Modern Warfare](/arch-linux-call-of-duty-4-multiplayer-cod4x-ge-proton-kurulumu/) ve [cod4x.ovh](/arch-linux-call-of-duty-4-multiplayer-cod4x-ge-proton-kurulumu/) oturumunu da çalıştırarak Wine/Proton tarafını kontrol ettim.

Oyun açıkken başka bir terminalde şu komutu çalıştırdım:

```bash
lsof /dev/ntsync
```

Karşıma şu kayıtlar çıktı:

```text
COMMAND    PID    USER      FD   TYPE DEVICE SIZE/OFF NODE NAME
steam.exe  17584  friday13  14r  CHR  10,261 0t0      497  /dev/ntsync
wineserve  17586  friday13  14r  CHR  10,261 0t0      497  /dev/ntsync
services.  17590  friday13  12r  CHR  10,261 0t0      497  /dev/ntsync
winedevic  17594  friday13  12r  CHR  10,261 0t0      497  /dev/ntsync
svchost.e  17603  friday13  12r  CHR  10,261 0t0      497  /dev/ntsync
explorer.  17635  friday13   7r  CHR  10,261 0t0      497  /dev/ntsync
```

Özellikle `steam.exe` ve `wineserver` süreçlerinin `/dev/ntsync` aygıtını açtığını görmek önemliydi.

Bu sonuç, COD4x oturumu açıkken Steam/Wine çalışma ortamının NTSync aygıtını kullandığını doğruladı. Yani artık yalnızca kernel modülünün mevcut olduğunu değil, çalışan oyun oturumunda Wine/Proton süreçlerinin de bu aygıta eriştiğini görebiliyoruz.

`lsof` çıktısında Docker'ın overlayfs ve network namespace dosya sistemleriyle ilgili bazı uyarılar da vardı. Bunlar NTSync hatası değil; Docker'ın dosya sistemlerini incelerken karşılaşılan uyarılardı. Buna rağmen aradığımız `/dev/ntsync` kayıtları başarıyla listelendi.

Burada önemli bir ayrımı da belirtelim: Bu test NTSync'in oyun oturumu sırasında kullanıldığını doğruluyor. Ancak tek başına FPS artışını veya daha düşük frametime değerlerini kanıtlamıyor. Bunun için ayrıca performans ölçümü yapmak gerekiyor.

## NTSync Oyunlarda FPS Artırır mı?

Gelelim en çok merak edilen konuya.

NTSync'in amacı yalnızca FPS değerini yükseltmek değil. Windows uygulamalarının kullandığı senkronizasyon mekanizmalarını Linux üzerinde daha uygun şekilde gerçekleştirmek.

Bazı oyunlarda işlemci tarafındaki senkronizasyon işlemleri önemli bir darboğaz oluşturabilir. Bu tür senaryolarda NTSync'in daha verimli bir çalışma ortamı sağlaması mümkün.

Ancak her oyunda aynı sonucu beklememek gerekiyor.

Örneğin ekran kartının tamamen dolu çalıştığı, yani GPU darboğazının bulunduğu bir oyunda NTSync kullanmak doğrudan FPS artışı sağlamayabilir.

Dolayısıyla şu ayrımı yapmak önemli:

- **FPS:** Her oyunda artış garantisi yok.
- **Frametime:** Bazı oyunlarda daha tutarlı kare sürelerine katkı sağlayabilir.
- **Micro-stuttering:** Senkronizasyon kaynaklı bazı takılmaların azaltılmasına yardımcı olabilir.
- **Uyumluluk:** Wine'ın Windows senkronizasyon mekanizmalarını daha doğru biçimde uygulamasını sağlar.

Ben kendi sistemimde NTSync'in COD4x oturumu sırasında kullanıldığını doğruladım. Ancak NTSync öncesi ve sonrası karşılaştırmalı FPS veya frametime ölçümü yapmadığım için belirli bir performans kazanımı iddia etmiyorum.

## Sonuç: NTSync İçin Zen Kernel Şart mı?

Hayır. Bugün geriye dönüp baktığımda makalenin en önemli düzeltmesi bu.

2025 yılında 6.6 LTS kernel kullanırken karşılaştığım hata gerçekti. Reddit'te aldığım öneri üzerine Zen Kernel'e geçmem de o dönem sorunumu çözdü. Fakat bu deneyim, NTSync kullanmak için herkesin Zen Kernel kurması gerektiği anlamına gelmiyor.

Linux 6.14 ve üzeri, NTSync desteği etkin bir kernel kullanmanız yeterli. Arch Linux'un resmi kernel paketleri de bu desteği sunuyor.

Benim tavsiyem, çalışan sisteminizi sırf NTSync kullanabilmek için değiştirmeden önce mevcut kernel'inizi kontrol etmeniz.

Önce `modinfo ntsync` ile modülün mevcut olup olmadığını öğrenin. Ardından `sudo modprobe ntsync` ile yükleyin. Son olarak `/dev/ntsync` aygıtının oluştuğunu ve kullandığınız Wine/Proton sürümünün bu aygıta gerçekten eriştiğini doğrulayın.

Bazen çözüm yeni bir kernel kurmak değil, zaten sisteminizde bulunan bir özelliği doğru şekilde etkinleştirmektir.

---

## Kaynaklar

- [Linux Kernel Documentation – NT synchronization primitive driver](https://docs.kernel.org/userspace-api/ntsync.html){: target="_blank" rel="noopener noreferrer"}
- [ArchWiki – Wine ve NTSync](https://wiki.archlinux.org/title/Wine){: target="_blank" rel="noopener noreferrer"}
- [ArchWiki – Kernel Modules](https://wiki.archlinux.org/title/Kernel_module){: target="_blank" rel="noopener noreferrer"}
- [WineHQ – Wine 10.16 Released](https://www.winehq.org/news/2025100301){: target="_blank" rel="noopener noreferrer"}
- [WineHQ – Wine 11.0 Released](https://www.winehq.org/news/22){: target="_blank" rel="noopener noreferrer"}
- [ValveSoftware – Proton 11.0 Documentation](https://github.com/ValveSoftware/Proton/blob/proton_11.0/README.md){: target="_blank" rel="noopener noreferrer"}