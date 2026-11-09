Title: Arch Linux'ta Docker Kurulumu – Adım Adım Rehber
Date: 2025-08-06 04:30 10:00
Modified: 2026-11-09 19:27
Category: Sunucu
Tags: arch linux, docker, container, kurulum, linux
Slug: arch-linux-docker-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Docker Engine, Docker Compose ve Buildx kurulumu. Docker 29'un containerd depolama yapısını ayrı bir diske taşıma, servis yapılandırması ve temel kullanım adımları.
Template: article
Series: Docker
Series_index: 1
Lang: tr
Translation: false
Image: images/arch-linux-docker-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114989772931815244
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtqxwlfyk2p

Docker'ı yeniden kurmam gerektiğinde bu kez yalnızca paketleri yükleyip servisi başlatmak istemedim. Daha önce kullandığım gibi Docker imajlarını, container verilerini ve projelerimi sistem SSD'sinden ayrı bir diskte tutmayı tercih ettim. Böylece oyunlar ve geliştirme araçları için kullandığım sistem diskini Docker verileriyle doldurmamış olacağım.

Bu rehberde Arch Linux üzerinde Docker Engine, Docker Compose ve Buildx kurulumunu gerçekleştireceğiz. Ardından Docker 29 ile gelen containerd tabanlı imaj depolama yapısını inceleyip Docker verilerini ayrı bir diske taşıyacağız.

Burada önemli bir ayrıntı var: Docker'ın bütün verilerini tek bir ayarla başka bir diske taşıyamıyoruz. Yeni kurulumlarda imaj ve container snapshot verileri containerd tarafından yönetilirken diğer kalıcı veriler Docker'ın kendi veri dizininde tutuluyor. Bu nedenle iki ayrı yapılandırma yapmamız gerekiyor.

Kurulumu kendi Arch Linux sistemimde gerçekleştirdim. Aşağıdaki sürümler, 9 Kasım 2026 tarihinde pacman üzerinden yaptığım kurulum ve sonrasında aldığım terminal çıktılarından alınmıştır.

| Bileşen | Kurulu sürüm |
|---|---|
| Docker Engine | 29.9.3 |
| containerd | 2.4.2 |
| Docker Compose | 5.7.0 |
| Docker Buildx | 0.38.2 |
| Dosya sistemi | ext4 |

## 1. Docker Nedir?

Docker, uygulamaları ve ihtiyaç duydukları bağımlılıkları container adı verilen izole ortamlarda çalıştırmamızı sağlayan bir platformdur.

Sanal makinelerden farklı olarak container'lar ana sistemin Linux çekirdeğini paylaşır. Böylece her uygulama için ayrı bir işletim sistemi çalıştırmaya gerek kalmadan izole çalışma ortamları oluşturabiliriz.

Docker'ın sağladığı başlıca avantajlar şunlardır:

- **İzolasyon:** Uygulamaları birbirinden bağımsız ortamlarda çalıştırabilirsiniz.
- **Taşınabilirlik:** Aynı imajı farklı Docker ortamlarında kullanabilirsiniz.
- **Bağımlılık yönetimi:** Uygulamanın ihtiyaç duyduğu paketleri ve bağımlılıkları imaj içerisinde tutabilirsiniz.
- **Kolay dağıtım:** Docker Compose ile birden fazla servisi tek bir yapılandırma üzerinden yönetebilirsiniz.

Özellikle yazılım geliştirme, test ortamları, veritabanları ve kendi sunucu hizmetlerini çalıştırmak isteyenler için Docker oldukça kullanışlıdır.

## 2. Arch Linux'ta Docker Kurulumu

Arch Linux'un resmi depolarında Docker ve ihtiyacımız olan yardımcı paketler bulunuyor. Bu nedenle AUR üzerinden paket oluşturmamıza gerek yok.

### 2.1. Sistemi Güncelleme

Öncelikle sistem paketlerini güncelleyelim:

```bash
sudo pacman -Syu
```

Arch Linux rolling release modelini kullandığından yeni paketleri kurmadan önce sistemi güncel tutmak önemlidir.

### 2.2. Docker Paketlerini Yükleme

Docker Engine ile birlikte Docker Compose ve Buildx paketlerini yükleyelim:

```bash
sudo pacman -S docker docker-compose docker-buildx
```

Yüklediğimiz paketlerin görevleri:

| Paket | Görevi |
|---|---|
| `docker` | Docker Engine ve komut satırı istemcisi |
| `docker-compose` | Compose yapılandırmalarını yönetir |
| `docker-buildx` | BuildKit tabanlı imaj oluşturma araçlarını sağlar |

Bu işlem sırasında `containerd` ve `runc` gibi Docker'ın ihtiyaç duyduğu bağımlılıklar da paket yöneticisi tarafından yüklenir.

Kurulum tamamlandığında Docker servisini henüz başlatmayacağız. Önce verilerin hangi diskte tutulacağını belirleyeceğiz.

## 3. Docker Verilerini Ayrı Bir Diske Taşıma

Benim sistemimde işletim sisteminin kurulu olduğu NVMe SSD'nin yanında yaklaşık 1 TB kapasiteli ikinci bir disk bulunuyor.

Docker imajları, container'lar ve volume'ler zamanla ciddi miktarda depolama alanı kullanabildiğinden bunları sistem diskinde tutmak istemedim. Bunun yerine daha önce kullandığım dizin yapısını korudum.

Kullanacağımız dizin yapısı şöyle:

```text
/mnt/steam_depo/Docker/
├── containerd/
├── docker/
└── projects/
```

Dizinlerin görevleri:

- `containerd/`: İmaj içerikleri ve container snapshot verileri.
- `docker/`: Docker tarafından yönetilen diğer kalıcı veriler ve volume'ler.
- `projects/`: Kendi projelerimiz ve Docker Compose dosyaları.

### 3.1. Docker 29 ve Containerd Image Store

Önce önemli bir ayrımı açıklayalım.

Docker Engine 29 ve sonraki sürümlerde yeni kurulumların varsayılan depolama altyapısı containerd image store olarak belirlenmiştir. Bu yapıda containerd, klasik Docker storage driver'ları yerine snapshotter mekanizmasını kullanır.[^1]

Docker'ın varsayılan dizinleri bu durumda şöyle ayrılır:

| Veri | Varsayılan dizin |
|---|---|
| İmaj içerikleri | `/var/lib/containerd/` |
| Container snapshot'ları | `/var/lib/containerd/` |
| Diğer Docker verileri ve volume'ler | `/var/lib/docker/` |

Buradaki önemli nokta, Docker daemon yapılandırmasındaki `data-root` seçeneğinin containerd tarafından yönetilen imaj depolama alanını değiştirmemesidir.

Dolayısıyla yalnızca `/etc/docker/daemon.json` içerisinde `data-root` tanımlarsanız imajlarınız varsayılan olarak sistem diskindeki containerd dizininde kalmaya devam eder.

İki depolama alanını da taşımak için hem Docker daemon hem de containerd yapılandırmasını düzenlemeliyiz.

### 3.2. Diskin Bağlı Olduğunu Kontrol Etme

Öncelikle hedef diskimizin gerçekten bağlandığından emin olalım:

```bash
findmnt -T /mnt/steam_depo -o TARGET,SOURCE,FSTYPE,OPTIONS
```

Disk kapasitesini kontrol etmek için:

```bash
df -hT /mnt/steam_depo
```

Benim sistemimde ikinci disk `/dev/sda1` üzerinde ext4 dosya sistemiyle `/mnt/steam_depo` konumuna bağlanmış durumda.

Diskin otomatik bağlanması için `/etc/fstab` içerisinde aşağıdaki kayıt bulunuyor:

```fstab
LABEL=steam_depo /mnt/steam_depo ext4 defaults,nofail 0 2
```

Burada `nofail` seçeneği, disk bağlanamadığında sistemin açılışını sürdürmesine izin verir. Ancak Docker verilerini bu diske taşıdığımız için servislerin disk bağlanmadan çalışmasını istemiyoruz.

!!! warning "Dikkat! Disk bağlanmadan Docker'ı başlatmayın."
    Bağlama noktası hazır değilken Docker'ın çalışması, verilerin yanlışlıkla sistem SSD'sine yazılmasına neden olabilir. Bu nedenle birazdan systemd üzerinden disk bağımlılığı tanımlayacağız.

### 3.3. Depolama Dizinlerini Oluşturma

Docker için gerekli dizinleri oluşturalım:

```bash
sudo install -d -o root -g root -m 0711 \
    /mnt/steam_depo/Docker/containerd \
    /mnt/steam_depo/Docker/docker

mkdir -p /mnt/steam_depo/Docker/projects
```

Burada Docker tarafından yönetilen iki dizini `root` kullanıcısına bırakıyoruz. Projeler dizini ise normal kullanıcı hesabımıza ait olacak.

Bu sayede Docker'ın kendi dosyaları ile üzerinde çalıştığımız projeleri birbirinden ayırmış oluyoruz.

### 3.4. Docker Daemon Yapılandırması

Docker daemon ayarları `/etc/docker/daemon.json` dosyasında tutulur.

Önce gerekli yapılandırma dizinini oluşturalım:

```bash
sudo install -d /etc/docker /etc/containerd
```

Ardından Docker'ın veri dizinini belirleyelim:

```bash
sudo tee /etc/docker/daemon.json <<'EOF'
{
  "data-root": "/mnt/steam_depo/Docker/docker"
}
EOF
```

Bu ayar Docker daemon tarafından yönetilen kalıcı verileri belirlediğimiz dizine yönlendirir.

Ancak containerd image store kullandığımız için imajların ve snapshot'ların konumunu ayrıca değiştirmeliyiz.

!!! note "Not: Mevcut bir Docker kurulumunuz varsa"
    Bu rehber temiz kurulum üzerinden ilerliyor. Daha önce Docker kullandıysanız mevcut `daemon.json` veya containerd yapılandırmanızı doğrudan silmeyin. Önce yedek alın ve mevcut ayarları koruyarak değişiklik yapın. Eski depolama dizinlerindeki verileri de yalnızca servisler durdurulduktan ve yedeklendikten sonra taşıyın.

### 3.5. Containerd Veri Dizinini Yapılandırma

Containerd yapılandırma dosyasını oluşturalım:

```bash
sudo tee /etc/containerd/config.toml <<'EOF'
version = 4
root = "/mnt/steam_depo/Docker/containerd"
EOF
```

Buradaki `root` değeri containerd tarafından yönetilen kalıcı verilerin konumunu belirler.

`version = 4` ise containerd yapılandırma biçimini belirtir. Containerd 2.4.2 sürümünde desteklenen en güncel yapılandırma biçimi budur.[^2]

Bu örnek, yeni ve temiz kurulum için kullandığım minimal yapılandırmadır. Mevcut bir `config.toml` dosyası bulunuyorsa üzerine yazmak yerine mevcut ayarları koruyarak düzenlemek gerekir.

### 3.6. Systemd Üzerinden Disk Bağımlılığı Tanımlama

Depolama dizinlerini değiştirdik ancak önemli bir ayrıntı henüz var: Bilgisayar açıldığında ikinci disk bağlanmadan Docker servislerinin çalışmasını engellemeliyiz.

Bunun için systemd'nin `RequiresMountsFor` özelliğini kullanacağız. Bu seçenek, belirtilen dizine erişmek için gereken mount birimleriyle servis arasında gerekli bağımlılıkları ve başlatma sırasını oluşturur.[^3]

Öncelikle servis yapılandırma dizinlerini oluşturalım:

```bash
sudo install -d \
    /etc/systemd/system/containerd.service.d \
    /etc/systemd/system/docker.service.d
```

Containerd için bir override dosyası oluşturalım:

```bash
sudo tee /etc/systemd/system/containerd.service.d/storage.conf <<'EOF'
[Unit]
RequiresMountsFor=/mnt/steam_depo/Docker/containerd
EOF
```

Docker servisi için de aynı işlemi gerçekleştirelim:

```bash
sudo tee /etc/systemd/system/docker.service.d/storage.conf <<'EOF'
[Unit]
RequiresMountsFor=/mnt/steam_depo/Docker/docker
EOF
```

Böylece containerd ve Docker, kendi veri dizinlerinin bulunduğu dosya sistemi bağlanmadan başlatılmayacak.

## 4. Docker Servisini Başlatma

Yapılandırmalarımız tamamlandı. Önce systemd yapılandırmasını yeniden yükleyelim:

```bash
sudo systemctl daemon-reload
```

Ardından Docker servisini etkinleştirip başlatalım:

```bash
sudo systemctl enable --now docker.service
```

Docker servisinin birim dosyasında containerd servisi bağımlılık olarak tanımlandığı için ayrıca containerd servisini etkinleştirmemize gerek yok.

Servislerin durumunu kontrol edelim:

```bash
systemctl is-active docker.service
systemctl is-active containerd.service
```

Her iki komutun da `active` çıktısını vermesi gerekiyor.

## 5. Sudo Kullanmadan Docker Çalıştırma

Varsayılan yapılandırmada Docker daemon root yetkileriyle çalışır ve Docker soketine erişim root kullanıcısıyla sınırlandırılmıştır.

Her Docker komutunda `sudo` kullanmamak için kullanıcı hesabımızı `docker` grubuna ekleyebiliriz:

```bash
sudo usermod -aG docker "$USER"
```

Değişikliğin aktif olması için masaüstü oturumundan tamamen çıkıp yeniden giriş yapın.

Alternatif olarak yeni bir grup oturumu başlatmak için:

```bash
newgrp docker
```

Grup üyeliğini kontrol edelim:

```bash
groups
```

Çıktıda `docker` grubunun bulunması gerekir.

Artık aşağıdaki gibi Docker komutlarını `sudo` kullanmadan çalıştırabiliriz:

```bash
docker ps
```

!!! warning "Dikkat! Docker grubunun güvenlik etkisi ⚠️"
    `docker` grubuna üyelik, kullanıcıya pratikte root seviyesinde yetki verir. Bu gruptaki bir kullanıcı ayrıcalıklı container çalıştırarak ana sistem üzerinde geniş yetkilere erişebilir. Bu nedenle gruba yalnızca güvendiğiniz kullanıcıları ekleyin.

## 6. Docker Kurulumunu Doğrulama

Kurulumun başarılı olduğunu yalnızca servis durumuna bakarak değerlendirmeyelim. Docker'ın doğru depolama dizinlerini kullandığını ve container çalıştırabildiğini de kontrol edelim.

### 6.1. Docker Veri Dizinini Kontrol Etme

Önce Docker'ın hangi dizini kullandığına bakalım:

```bash
docker info --format 'Docker Root Dir: {{.DockerRootDir}}'
```

Beklediğimiz çıktı:

```text
Docker Root Dir: /mnt/steam_depo/Docker/docker
```

Şimdi kullanılan imaj depolama altyapısını kontrol edelim:

```bash
docker info --format '{{.DriverStatus}}'
```

Containerd image store kullanıldığında aşağıdaki çıktıyı görmeliyiz:

```text
[[driver-type io.containerd.snapshotter.v1]]
```

Bu çıktı, Docker'ın klasik `overlay2` storage driver yerine containerd snapshotter altyapısını kullandığını gösterir.

Containerd yapılandırmasını da inceleyelim:

```bash
sudo containerd config dump | grep -E '^(version|root|state) = '
```

Benim sistemimde çıktılar şu şekildeydi:

```text
version = 4
root = '/mnt/steam_depo/Docker/containerd'
state = '/run/containerd'
```

`state` dizininin `/run/containerd` altında kalması normaldir. Bu dizin geçici çalışma verileri için kullanılır. Kalıcı depolama alanımız olan `root` diziniyle karıştırılmamalıdır.

Son olarak systemd bağımlılıklarını kontrol edelim:

```bash
systemctl cat containerd.service docker.service | grep -E 'storage.conf|RequiresMountsFor'
```

Her iki servis için de oluşturduğumuz `RequiresMountsFor` satırlarını görmeliyiz.

### 6.2. Hello World Testi

Şimdi Docker'ın resmi test imajını çalıştıralım:

```bash
docker run --rm hello-world
```

Docker önce imajı yerel sistemde arar. Bulamazsa Docker Hub üzerinden indirir ve container içerisinde çalıştırır.

Başarılı bir kurulumda aşağıdaki mesajı görürüz:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

Bu mesaj, Docker istemcisinin daemon ile iletişim kurabildiğini, imaj indirebildiğini ve container çalıştırabildiğini gösterir.

`--rm` parametresi test tamamlandıktan sonra container'ın otomatik olarak silinmesini sağlar. İndirilen imaj ise yerel depoda kalır.

Benim kurulumumda test başarıyla tamamlandı ve `Hello from Docker!` mesajını aldım.

### 6.3. Compose ve Buildx Kontrolü

Kurulumla birlikte yüklediğimiz eklentilerin sürümlerini de kontrol edelim:

```bash
docker compose version
docker buildx version
```

Benim sistemimde alınan çıktılar:

```text
Docker Compose version 5.7.0
github.com/docker/buildx 0.38.2
```

Bu kontrollerle Docker Engine, Compose ve Buildx araçlarının çalıştığını doğrulamış oluyoruz.

### 6.4. Disk Kullanımını Kontrol Etme

Son olarak Docker verilerinin gerçekten ikinci diske yazıldığını kontrol edelim.

Docker'ın kendi disk kullanım raporunu görüntülemek için:

```bash
docker system df
```

İmajların, container'ların, volume'lerin ve build cache'in kullandığı alanı görebiliriz.

Dosya sistemindeki dizinlerin kullanımını incelemek için:

```bash
sudo du -sh \
    /mnt/steam_depo/Docker/containerd \
    /mnt/steam_depo/Docker/docker
```

Benim `hello-world` testinden sonra aldığım sonuçlar:

```text
332K    /mnt/steam_depo/Docker/containerd
236K    /mnt/steam_depo/Docker/docker
```

Bu çıktılar, containerd ve Docker'ın kalıcı veri dizinlerinin belirlediğimiz ikinci diskte oluşturulduğunu doğruladı.

`docker system df` ile `du` çıktılarının birebir aynı olması gerekmez. İki komut farklı hesaplama yöntemleri ve kapsamlar kullanır. Bu nedenle disk kullanımını incelerken ikisini birlikte değerlendirmek daha anlamlıdır.

## 7. Temel Docker Komutları

Docker'ı kullanırken en sık ihtiyaç duyacağımız komutları aşağıda topladım.

| Komut | Açıklama |
|---|---|
| `docker ps` | Çalışan container'ları listeler. |
| `docker ps -a` | Tüm container'ları listeler. |
| `docker image ls` | Yerel imajları listeler. |
| `docker pull nginx` | Nginx imajını indirir. |
| `docker run --rm hello-world` | Test container'ı çalıştırır ve siler. |
| `docker stop CONTAINER` | Çalışan container'ı durdurur. |
| `docker rm CONTAINER` | Container'ı siler. |
| `docker image rm IMAGE` | İmajı siler. |
| `docker system df` | Docker disk kullanımını gösterir. |
| `docker compose up -d` | Compose servislerini arka planda başlatır. |
| `docker compose down` | Compose container'larını ve ağlarını kaldırır. |

Kullanılmayan imajları temizlemek için:

```bash
docker image prune
```

Bu komut kullanılmayan dangling imajları temizler. Daha kapsamlı temizlik yapmadan önce hangi verilerin silineceğini kontrol etmekte fayda var.

!!! tip "İpucu: Docker disk kullanımını takip edin"
    İmajlar ve container verileri zamanla ciddi miktarda yer kaplayabilir. Özellikle birden fazla proje üzerinde çalışıyorsanız ara sıra `docker system df` komutuyla kullanım durumunu kontrol edin.

## 8. Yaygın Sorunlar ve Çözümleri

### 8.1. Permission Denied Hatası

Docker komutlarını çalıştırırken aşağıdaki hatayla karşılaşabilirsiniz:

```text
permission denied while trying to connect to the Docker daemon socket
```

Öncelikle kullanıcı hesabınızın `docker` grubunda olup olmadığını kontrol edin:

```bash
groups
```

Grup listesinde bulunmuyorsa:

```bash
sudo usermod -aG docker "$USER"
```

Ardından masaüstü oturumundan tamamen çıkıp yeniden giriş yapın.

### 8.2. Docker Servisinin Başlamaması

Docker servisi başlatılamıyorsa önce durumunu inceleyin:

```bash
systemctl status docker.service
```

Docker ve containerd günlüklerini birlikte görüntülemek için:

```bash
journalctl -u docker.service -u containerd.service -b --no-pager
```

Özellikle ayrı disk kullanıyorsanız dosya sisteminin bağlı olup olmadığını kontrol edin:

```bash
findmnt -T /mnt/steam_depo
```

Ayrıca yapılandırma dosyalarının doğru olduğunu kontrol etmek için:

```bash
sudo dockerd --validate --config-file=/etc/docker/daemon.json
```

Containerd yapılandırmasını görüntülemek için:

```bash
sudo containerd config dump
```

Hatanın kaynağını görmeden rastgele izin değişiklikleri yapmak veya Docker veri dizinlerini silmek yerine önce günlükleri incelemek daha doğru bir yaklaşımdır.

## 9. Sonuç

Bu rehberde Arch Linux üzerinde Docker Engine, Docker Compose ve Buildx kurulumunu gerçekleştirdik.

Kurulumu varsayılan ayarlarla bırakmak yerine kendi sistemimin depolama ihtiyaçlarına göre düzenledim. Sistem SSD'sinin kapasitesini korumak için Docker'ın kalıcı verilerini ikinci diskime taşıdım.

Docker 29 ile gelen containerd image store yapısı nedeniyle bu işlemde iki ayrı depolama alanını yapılandırmamız gerekti. Docker'ın `data-root` ayarını ve containerd'nin `root` dizinini ayrı ayrı belirledik. Ayrıca `RequiresMountsFor` kullanarak disk bağlanma bağımlılığını systemd üzerinden tanımladık.

Sonuç olarak Docker imajları, container snapshot'ları ve diğer kalıcı veriler sistem SSD'sinden bağımsız olarak `/mnt/steam_depo/Docker/` altında tutuluyor.

Kurulumun ardından `hello-world` testiyle Docker'ın düzgün çalıştığını, Compose ve Buildx sürüm kontrolleriyle de yardımcı araçların kullanılabilir durumda olduğunu doğruladım.

Benim tercihim, Docker tarafından yönetilen verilerle kendi projelerimi ayrı dizinlerde tutmak. Böylece hem disk kullanımını takip etmek hem de farklı projeleri yönetmek daha kolay hale geliyor.

## Kaynaklar

- [ArchWiki – Docker](https://wiki.archlinux.org/title/Docker){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – containerd image store](https://docs.docker.com/engine/storage/containerd/){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – Docker daemon configuration](https://docs.docker.com/engine/daemon/){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – Linux post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/){: target="_blank" rel="noopener noreferrer"}
- [containerd 2.4 – Configuration reference](https://containerd.org/docs/2.4/man/containerd-config.toml.5/){: target="_blank" rel="noopener noreferrer"}
- [systemd.unit – RequiresMountsFor](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html){: target="_blank" rel="noopener noreferrer"}

[^1]: Docker Engine 29 ve sonraki sürümlerde containerd image store yeni kurulumlarda varsayılan olarak kullanılır. Önceki sürümlerden yükseltilen kurulumlarda ise mevcut klasik storage driver kullanılmaya devam edebilir. Ayrıca `userns-remap` yapılandırması containerd image store için ayrı bir kısıtlamadır. Bu nedenle farklı bir sistemde aynı depolama yapısının kullanıldığını varsaymadan önce `docker info --format '{{.DriverStatus}}'` komutuyla mevcut altyapıyı kontrol edin.

[^2]: containerd 2.4 yapılandırma belgesinde sürüm 4 en güncel yapılandırma biçimi olarak belirtilir. Eski yapılandırma sürümleri de geriye dönük uyumluluk kapsamında otomatik olarak dönüştürülebilir.

[^3]: `RequiresMountsFor` belirtilen yola erişmek için gerekli mount birimleriyle servis arasında `Requires` ve `After` bağımlılıkları oluşturur. Böylece yalnızca servis başlatma sırasını değil, ilgili dosya sisteminin gerekliliğini de tanımlamış oluruz.