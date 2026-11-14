Title: WSL 2 Üzerinde Arch Linux Kurulumu ve Yapılandırması
Date: 2022-06-26 12:00
Modified: 2026-11-14 19:25
Category: Windows
Tags: Windows, WSL, WSL 2, Arch Linux, Pacman, AUR
Slug: wsl-uzerinde-arch-linux-kurulumu
Authors: yuceltoluyag
Summary: Windows Subsystem for Linux (WSL 2) üzerinde Arch Linux'un resmî imajını kurun. Kullanıcı oluşturma, Pacman, AUR, Windows ile dosya paylaşımı ve RAM/CPU yapılandırmasını adım adım öğrenin.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/wls-archlinux-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985269244740877
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrqxpp7tk2m

## WSL 2 Üzerinde Arch Linux Kurulumu

Windows üzerinde Linux araçlarını kullanmak istediğim dönemlerde en çok tercih ettiğim çözümlerden biri Windows Subsystem for Linux (WSL) oldu. Özellikle Arch Linux gibi sürekli güncellenen ve paket yönetimini kullanıcısına bırakan bir dağıtımı Windows içerisinde çalıştırabilmek oldukça kullanışlı.

Bu rehberi ilk hazırladığım 2022 yılında Arch Linux'un resmî bir WSL imajı bulunmuyordu. Bu nedenle kurulumu topluluk tarafından geliştirilen ArchWSL projesi üzerinden gerçekleştiriyordum. ZIP dosyalarını indiriyor, rootfs arşivini elle yerleştiriyor ve dağıtımı özel bir başlatıcı üzerinden yapılandırıyordum.

Ancak artık bu işlemlere gerek yok. Arch Linux'un kendi resmî WSL imajı bulunuyor ve kurulum doğrudan WSL komutlarıyla gerçekleştirilebiliyor.

Bu yazıda WSL 2'yi hazırlayacak, resmî Arch Linux imajını kuracak, kullanıcı hesabımızı oluşturacak ve dağıtımı günlük kullanım için yapılandıracağız. Ayrıca Windows ile Linux dosyalarına erişim, grafik uygulamalarını çalıştırma ve WSL'nin RAM/CPU kullanımını sınırlandırma gibi konulara da değineceğiz.

> **Not:** Bu rehberde Arch Linux'un resmî WSL imajı kullanılmaktadır. Önceki sürümde anlattığım ArchWSL kurulumu artık ana yöntem değildir. Eski kurulum yönteminin neden değiştiğini de yazının ilgili bölümünde açıklıyorum.

## WSL Nedir? WSL 1 ve WSL 2 Arasındaki Farklar

Windows Subsystem for Linux, Windows üzerinde bir Linux ortamı çalıştırmamızı sağlayan Microsoft teknolojisidir. Ayrı bir Linux kurulumu yapmak veya geleneksel bir sanal makine programıyla uğraşmak zorunda kalmadan Linux komutlarını ve uygulamalarını Windows ile birlikte kullanabiliriz.

WSL'nin iki farklı mimarisi bulunuyor: WSL 1 ve WSL 2.

### WSL 1

WSL 1, Linux sistem çağrılarını Windows üzerinde karşılayan bir uyumluluk katmanı kullanır. Geleneksel anlamda bir Linux çekirdeği çalıştırmaz.

Özellikle Windows dosya sistemiyle yoğun çalışan bazı iş yüklerinde avantaj sağlayabilir. Ancak Linux çekirdeği gerektiren uygulamalar ve bazı sistem araçları açısından sınırlamaları vardır.

### WSL 2

WSL 2 ise hafif bir sanal makine üzerinde gerçek bir Linux çekirdeği kullanır. Bu sayede Linux sistem çağrılarıyla uyumluluk önemli ölçüde artar.

Arch Linux'un resmî WSL imajı da WSL 2 gerektirir. WSL 1 üzerinde bu imajı çalıştıramazsınız.

| Özellik | WSL 1 | WSL 2 |
|---|---|---|
| Linux çekirdeği | Yok | Gerçek Linux çekirdeği |
| Sistem çağrısı uyumluluğu | Sınırlı | Daha geniş |
| Linux dosya sistemi performansı | Daha sınırlı | Daha iyi |
| Windows dosya sistemi entegrasyonu | Var | Var |
| WSLg grafik uygulamaları | Desteklenmez | Desteklenir |
| Arch Linux resmî WSL imajı | Desteklenmez | Desteklenir |

Dosya sistemi performansında önemli bir ayrıntı var: Linux araçlarıyla çalışıyorsanız dosyalarınızı WSL'nin kendi Linux dosya sistemi içerisinde tutmanız daha iyi sonuç verir. Windows dosyalarıyla yoğun çalışan işlemlerde ise dosyaların Windows tarafında tutulması daha mantıklıdır.

Microsoft'un [WSL 1 ve WSL 2 karşılaştırma belgesi](https://learn.microsoft.com/en-us/windows/wsl/compare-versions){: target="_blank" rel="noopener noreferrer"} iki mimari arasındaki farklılıkları daha ayrıntılı açıklıyor.

## WSL 2 Kurulumu

Öncelikle bilgisayarımızda WSL 2 altyapısının bulunması gerekiyor.

Güncel kurulum komutlarını kullanabilmek için Windows 11 veya Windows 10'un uygun bir sürümüne ihtiyacınız var. Microsoft'un `wsl --install` komutu Windows 10 2004 (Derleme 19041) ve üzeri ile Windows 11 üzerinde kullanılabiliyor.

Ayrıca BIOS/UEFI üzerinden donanımsal sanallaştırmanın etkin olması gerekiyor.

### WSL daha önce kurulmadıysa

PowerShell'i **Yönetici olarak** açın ve şu komutu çalıştırın:

```powershell
wsl --install --no-distribution
```

Bu komut WSL altyapısını ve gerekli Windows bileşenlerini yükler ancak varsayılan Ubuntu dağıtımını kurmaz.

Kurulum tamamlandıktan sonra bilgisayarınızı yeniden başlatın.

Ardından WSL'yi güncelleyin:

```powershell
wsl --update
```

Yeni kurulacak dağıtımların varsayılan olarak WSL 2 kullanmasını sağlayın:

```powershell
wsl --set-default-version 2
```

### WSL zaten kuruluysa

Bilgisayarınızda daha önce Ubuntu veya başka bir Linux dağıtımını WSL üzerinden kullandıysanız ilk kurulum adımlarını tekrarlamanız gerekmez.

PowerShell'i yönetici olarak açıp güncelleme yapmanız yeterli:

```powershell
wsl --update
```

WSL sürümünü ve kurulum durumunu kontrol etmek için:

```powershell
wsl --version

wsl --status
```

Dağıtımların hangi WSL sürümünü kullandığını görmek için:

```powershell
wsl --list --verbose
```

Bu komut, yüklü dağıtımların durumunu ve WSL 1 veya WSL 2 üzerinde çalışıp çalışmadıklarını gösterir.

Microsoft'un [WSL kurulum rehberi](https://learn.microsoft.com/en-us/windows/wsl/install){: target="_blank" rel="noopener noreferrer"} ve [WSL temel komutları](https://learn.microsoft.com/en-us/windows/wsl/basic-commands){: target="_blank" rel="noopener noreferrer"} sayfalarında diğer kurulum seçeneklerini bulabilirsiniz.

## Arch Linux'un Resmî WSL İmajını Kurma

Gelelim asıl konumuza.

Önceki makalede ArchWSL projesinden ZIP dosyası indiriyor, `Arch.exe` ve `rootfs.tar.gz` dosyalarını kendimiz yerleştiriyorduk. Artık buna ihtiyacımız yok.

Arch Linux'un resmî WSL imajını kurmak için PowerShell'i açın ve şu komutu çalıştırın:

```powershell
wsl --install archlinux
```

Bu komut Arch Linux dağıtımını WSL üzerine kuracaktır.

Yükleme işlemi tamamlandığında Başlat menüsünden Arch Linux'u açabilir veya PowerShell üzerinden şu komutu kullanabilirsiniz:

```powershell
wsl -d archlinux
```

Kurulum sonrasında dağıtımın WSL 2 üzerinde çalıştığını tekrar kontrol edelim:

```powershell
wsl --list --verbose
```

Listede Arch Linux'un `VERSION` sütununda `2` değerini görmelisiniz.

Artık Windows üzerinde resmî Arch Linux WSL ortamımız hazır.

### Resmî imaj ile eski ArchWSL arasındaki fark

Burada küçük bir tarihçe vermek istiyorum.

2022 yılında bu makaleyi hazırlarken kullandığım yöntem, [yuk7/ArchWSL](https://github.com/yuk7/ArchWSL){: target="_blank" rel="noopener noreferrer"} topluluk projesine dayanıyordu. O dönemde Arch Linux'un kendi resmî WSL imajı henüz bulunmadığından manuel kurulum gerekiyordu.

Günümüzde ise Arch Linux'un resmî WSL imajı Arch Linux projesinin kendi altyapısı üzerinden hazırlanıyor ve düzenli olarak güncelleniyor.

İmaj WSL 2 gerektiriyor. Kurulum ve yapılandırma ayrıntıları için [ArchWiki – Install Arch Linux on WSL](https://wiki.archlinux.org/title/Install_Arch_Linux_on_WSL){: target="_blank" rel="noopener noreferrer"} sayfasını inceleyebilirsiniz.

## Arch Linux İlk Yapılandırması

Arch Linux'u ilk açtığımızda varsayılan kullanıcı `root` olacaktır. Ubuntu gibi dağıtımlarda kurulum sırasında kullanıcı adı ve parola oluşturma ekranı görmeye alışkınsanız burada farklı bir başlangıçla karşılaşabilirsiniz.

Önce sistemi güncelleyelim.

Arch Linux terminalinde:

```bash
pacman -Syu
```

`pacman -Syu`, paket veritabanlarını yeniler ve sistemdeki paketleri birlikte günceller.

Arch Linux sürekli güncellenen bir dağıtım olduğu için kısmi yükseltmeler desteklenmez. Örneğin yalnızca `pacman -Sy paket_adı` kullanarak paket yüklemek, sistemde uyumsuzluklara neden olabilir. Güncelleme işlemlerini tam sistem yükseltmesiyle gerçekleştirin.

Daha fazla bilgi için [ArchWiki – System maintenance](https://wiki.archlinux.org/title/System_maintenance){: target="_blank" rel="noopener noreferrer"} sayfasını inceleyebilirsiniz.

### Normal kullanıcı oluşturma

Günlük kullanımda sürekli root hesabıyla çalışmak yerine kendimize ayrı bir kullanıcı oluşturmalıyız.

Örnek olarak kullanıcı adını `kullanici` belirleyelim. Siz kendi istediğiniz kullanıcı adını kullanabilirsiniz.

```bash
useradd -m -G wheel -s /bin/bash kullanici
```

Komuttaki seçenekler:

- `-m`: Kullanıcı için ev dizini oluşturur.
- `-G wheel`: Kullanıcıyı wheel grubuna ekler.
- `-s /bin/bash`: Varsayılan kabuk olarak Bash kullanır.

Şimdi kullanıcı parolasını belirleyelim:

```bash
passwd kullanici
```

Komut sizden yeni parolayı girmenizi ve tekrar etmenizi isteyecektir.

### Sudo yapılandırması

Oluşturduğumuz kullanıcının yönetici yetkisi gerektiren işlemleri `sudo` üzerinden gerçekleştirmesi için sudo paketini yükleyelim:

```bash
pacman -S --needed sudo nano
```

Ardından sudo yapılandırma dosyasını güvenli şekilde düzenlemek için:

```bash
EDITOR=nano visudo
```

Açılan dosyada aşağıdaki satırı bulun:

```text
# %wheel ALL=(ALL:ALL) ALL
```

Başındaki `#` işaretini kaldırın:

```text
%wheel ALL=(ALL:ALL) ALL
```

Dosyayı kaydedip çıkın.

Bu ayar, wheel grubundaki kullanıcıların sudo üzerinden yönetici yetkisi kullanmasına izin verir. Her komut için parola istenir; günlük kullanımda gereksiz yere parolasız sudo erişimi vermeye gerek yoktur.

### Varsayılan kullanıcıyı değiştirme

Yeni oluşturduğumuz kullanıcının her Arch Linux açılışında otomatik olarak kullanılmasını sağlayalım.

Arch Linux terminalinde:

```bash
nano /etc/wsl.conf
```

Dosyaya şu bölümü ekleyin:

```ini
[user]
default=kullanici
```

Dosyada zaten başka yapılandırma bölümleri bulunuyorsa onları silmeyin. Sadece mevcut içeriğe uygun şekilde `[user]` bölümünü ekleyin.

Şimdi Arch Linux oturumundan çıkın:

```bash
exit
```

Bu işlemin ardından PowerShell veya Komut İstemi üzerinden dağıtımı durdurun:

```powershell
wsl --terminate archlinux
```

Yeniden başlatın:

```powershell
wsl -d archlinux
```

Artık belirlediğiniz kullanıcıyla oturum açılması gerekir.

Kontrol etmek için:

```bash
whoami
```

Burada kendi kullanıcı adınızı görmelisiniz.

**Alternatif yöntem:** WSL 2.4.10 veya daha yeni bir sürüm kullanıyorsanız varsayılan kullanıcıyı şu Windows komutuyla da değiştirebilirsiniz:

```powershell
wsl --manage archlinux --set-default-user kullanici
```

Ancak `/etc/wsl.conf` yöntemi de kullanılabilir ve ArchWiki tarafından belgelenmiştir.

## Arch Linux Paket Yönetimi ve Temel Araçlar

Kullanıcı hesabımız hazır. Şimdi günlük kullanımda ihtiyaç duyacağımız birkaç temel paketi yükleyelim.

Önceki yapılandırmamda Git, OpenSSH, Neovim, wget, htop ve benzeri araçlar kullanıyordum. Bunların hepsini kurmak zorunda değiliz; ihtiyacımıza göre seçim yapabiliriz.

Başlangıç için:

```bash
sudo pacman -S --needed base-devel git openssh wget htop neovim
```

Burada `base-devel`, özellikle AUR paketlerini derlerken ihtiyaç duyacağımız temel geliştirme araçlarını içerir.

Yeni bir paket kuracağımız zaman:

```bash
sudo pacman -S paket_adı
```

Sistemi güncellemek için:

```bash
sudo pacman -Syu
```

Kurulu paketleri listelemek için:

```bash
pacman -Q
```

Kurulu bir paketin ayrıntılarını görmek için:

```bash
pacman -Qi paket_adı
```

Arch Linux'ta paket yönetiminin temelini Pacman oluşturur. Paket veritabanını yenileme ve yükseltme işlemlerinde kısmi güncelleme yapmamaya dikkat edin.

## AUR ve Yay Kurulumu

Arch Linux'un en sevdiğim taraflarından biri de Arch User Repository (AUR).

AUR, kullanıcıların paket yapılandırmalarını paylaştığı topluluk odaklı bir depodur. Resmî Arch depolarının dışında kalan birçok yazılımı burada bulabilirsiniz.

Ancak AUR paketleri resmî depolardaki paketlerle aynı şekilde denetlenmez. Bu nedenle yüklemeden önce `PKGBUILD` dosyasını ve paket tarafından çalıştırılacak komutları incelemenizi öneririm.

Paket arama ve kurulum işlemlerini kolaylaştırmak için Yay kullanabiliriz.

Öncelikle daha önce yüklemediyseniz gerekli araçları kurun:

```bash
sudo pacman -S --needed base-devel git
```

Ardından **root olarak değil, oluşturduğumuz normal kullanıcıyla** AUR deposunu klonlayın:

```bash
git clone https://aur.archlinux.org/yay.git
```

İndirdiğimiz dizine geçelim:

```bash
cd yay
```

Paketi derleyip yükleyelim:

```bash
makepkg -si
```

İşlem tamamlandığında çalışma dizininden çıkabilirsiniz:

```bash
cd ~
```

Artık Yay üzerinden paket arayabilirsiniz:

```bash
yay paket_adı
```

Tüm sistemi güncellemek için:

```bash
yay -Syu
```

**Önemli:** `makepkg` komutunu root hesabıyla çalıştırmayın. AUR paketleri topluluk tarafından sağlandığından kurulum betiklerini incelemeden çalıştırmak güvenli değildir.

AUR hakkında daha fazla bilgi için [ArchWiki – Arch User Repository](https://wiki.archlinux.org/title/Arch_User_Repository){: target="_blank" rel="noopener noreferrer"} sayfasını inceleyebilirsiniz.

## Windows ve Linux Dosyalarına Erişim

WSL kullanmanın en güzel taraflarından biri Windows ve Linux dosyalarını aynı çalışma ortamında kullanabilmemiz.

Windows diskleri WSL içerisinde varsayılan olarak `/mnt` altında bağlanır.

Örneğin C sürücüsüne erişmek için:

```bash
cd /mnt/c
```

Kullanıcınızın Belgeler klasörüne erişmek için:

```bash
cd /mnt/c/Users/KullaniciAdi/Documents
```

Buradaki `KullaniciAdi` bölümünü Windows kullanıcı adınızla değiştirmelisiniz.

### Linux dosyalarını Windows üzerinden açma

Linux tarafındaki dosyaları Windows Dosya Gezgini üzerinden görüntülemek de oldukça kolay.

Arch Linux terminalinde istediğiniz dizine gidin ve:

```bash
explorer.exe .
```

komutunu çalıştırın.

Dosya Gezgini, bulunduğunuz Linux dizinini açacaktır.

Alternatif olarak Windows Dosya Gezgini'nin adres çubuğuna şu yolu yazabilirsiniz:

```text
\\wsl.localhost\archlinux\home\kullanici
```

Eski `\\wsl$` yolu da kullanılabilir.

### Proje dosyalarını nerede tutmalıyız?

Burada performans açısından önemli bir ayrıntı var.

Linux araçlarını WSL içerisinde kullanıyorsanız proje dosyalarını Linux dosya sisteminde, örneğin `/home/kullanici/Projects` altında tutmanız daha doğru olacaktır.

Windows dosya sistemi `/mnt/c` üzerinden Linux'a bağlandığında bazı dosya işlemleri yerel Linux dosya sistemine kıyasla daha yavaş gerçekleşebilir.

Bu nedenle:

- Linux araçlarıyla geliştirme yapıyorsanız dosyaları `/home/kullanici/Projects` altında tutun.
- Windows uygulamalarıyla çalışıyorsanız dosyaları Windows dosya sisteminde saklayın.
- İki sistem arasında sürekli ve yoğun dosya alışverişi yapmaktan kaçının.

Microsoft da WSL performansı için bu yaklaşımı öneriyor. Ayrıntılar için [Windows ve Linux dosya sistemlerinde çalışma](https://learn.microsoft.com/tr-tr/windows/wsl/filesystems){: target="_blank" rel="noopener noreferrer"} belgesini inceleyebilirsiniz.

## WSLg ile Linux Grafik Uygulamalarını Çalıştırma

WSL'nin eski sürümlerinde grafik uygulamaları çalıştırmak için ayrıca bir X sunucusu kurmak ve çeşitli ayarlar yapmak gerekiyordu.

Günümüzde WSLg sayesinde Linux grafik uygulamaları Windows ile bütünleşik olarak çalıştırılabiliyor.

WSLg, X11 ve Wayland tabanlı Linux grafik uygulamalarını Windows masaüstünde açmamızı sağlar.

Bunun için:

1. Güncel WSL sürümünü kullanın.
2. WSL 2 üzerinde çalıştığınızdan emin olun.
3. Gerekli grafik sürücülerinin güncel olduğundan emin olun.
4. Arch Linux içerisinden çalıştırmak istediğiniz grafik uygulamasını kurun.
5. Uygulamayı Linux terminalinden başlatın.

Örneğin bir grafik uygulamasını Pacman üzerinden kurduktan sonra kendi çalıştırılabilir komutuyla başlatabilirsiniz. Uygulama Windows masaüstünde ayrı bir pencere olarak görüntülenir.

Burada önemli bir ayrım var: WSLg, tek tek Linux grafik uygulamalarını çalıştırmak için tasarlanmıştır. Tam bir GNOME veya KDE masaüstü oturumunun Windows içerisinde yerel Linux masaüstü gibi çalıştığı anlamına gelmez.

Microsoft'un [WSL üzerinde Linux grafik uygulamaları çalıştırma](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps){: target="_blank" rel="noopener noreferrer"} rehberinde desteklenen özellikler ve gereksinimler açıklanıyor.

## WSL Üzerinde RAM ve CPU Kullanımını Sınırlama

WSL 2, Linux dağıtımlarını hafif bir sanal makine içerisinde çalıştırdığı için sistem kaynaklarının kullanımını yapılandırabiliriz.

Örneğin bilgisayarınızda birden fazla WSL dağıtımı bulunuyorsa veya Windows uygulamalarıyla birlikte yoğun Linux işlemleri yürütüyorsanız WSL'nin kullanabileceği RAM ve işlemci sayısını sınırlandırmak isteyebilirsiniz.

Bunun için Windows kullanıcı dizininde `.wslconfig` dosyasını oluşturacağız.

Windows kullanıcı dizininiz genellikle şu konumdadır:

```text
C:\Users\KullaniciAdi
```

PowerShell üzerinden dosyayı açabilirsiniz:

```powershell
notepad "$env:USERPROFILE\.wslconfig"
```

Dosyanın içine şu örnek yapılandırmayı ekleyin:

```ini
[wsl2]

# WSL 2 için azami bellek sınırı
memory=8GB

# Kullanılacak sanal işlemci sayısı
processors=4

# Takas alanı
swap=4GB
```

Buradaki değerler örnektir. Bilgisayarınızın donanımına ve aynı anda çalıştırdığınız uygulamalara göre değiştirebilirsiniz.

Örneğin `memory=8GB`, WSL 2 sanal makinesinin kullanabileceği azami belleği 8 GB ile sınırlar. Bu miktar sürekli kullanılacağı anlamına gelmez.

### Varsayılan değerler

Microsoft'un WSL yapılandırma belgelerinde belirtilen varsayılan değerler şöyledir:

| Ayar | Varsayılan davranış |
|---|---|
| RAM | Windows toplam belleğinin %50'si |
| CPU | Windows sistemindeki mantıksal işlemci sayısı |
| Swap | Belleğin yaklaşık %25'i |

Bu ayarların tamamı yalnızca Arch Linux için geçerli değildir. `.wslconfig`, WSL 2 üzerinde çalışan bütün Linux dağıtımlarının sanal makine kaynaklarını etkiler.

Dolayısıyla bilgisayarınızda Ubuntu, Debian veya başka bir WSL dağıtımı da varsa aynı kaynak sınırlarını paylaşacaklarını unutmayın.

### Değişiklikleri uygulama

`.wslconfig` dosyasını kaydettikten sonra PowerShell üzerinden WSL'yi kapatın:

```powershell
wsl --shutdown
```

Daha sonra Arch Linux'u yeniden başlatın:

```powershell
wsl -d archlinux
```

Yeni kaynak sınırları oturum açıldığında uygulanacaktır.

Ayrıntılı yapılandırma seçenekleri için [Microsoft WSL gelişmiş ayarlar belgesini](https://learn.microsoft.com/en-us/windows/wsl/wsl-config){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

## Eski ArchWSL Kurulumu Hakkında

Bu makaleyi ilk hazırladığımda Arch Linux'u WSL üzerinde çalıştırmak bugünkü kadar kolay değildi.

O dönem kullandığım ArchWSL projesi sayesinde Arch Linux rootfs dosyasını indirip dağıtımı elle kurabiliyordum. Özel `Arch.exe` başlatıcısı üzerinden kullanıcı yapılandırması ve varsayılan dağıtım ayarları da yapılabiliyordu.

Eski rehberin önemli bir kısmını bu nedenle manuel kurulum adımlarına ayırmıştım.

Ancak bugün resmî Arch Linux WSL imajı bulunduğundan yeni kurulumlarda eski yöntemi takip etmenize gerek yok.

Eski yöntemi kullanmak isteyenler [ArchWSL GitHub deposuna](https://github.com/yuk7/ArchWSL){: target="_blank" rel="noopener noreferrer"} göz atabilir. Güncel kurulum içinse Arch Linux'un kendi WSL imajını tercih etmenizi öneriyorum.

## Sonuç

Windows Subsystem for Linux, Windows üzerinde Linux araçlarını kullanmak isteyenler için oldukça kullanışlı bir çözüm.

Arch Linux'un resmî WSL imajıyla birlikte daha önce elle gerçekleştirdiğimiz birçok kurulum adımı da ortadan kalktı. Artık birkaç komutla Arch Linux'u WSL 2 üzerinde çalıştırabiliyor, kullanıcı hesabımızı oluşturabiliyor ve dağıtımı kendi ihtiyaçlarımıza göre yapılandırabiliyoruz.

Bu rehberde yalnızca kuruluma değil, sonrasında ihtiyaç duyabileceğimiz paket yönetimi, AUR, Windows/Linux dosya erişimi, grafik uygulamaları ve sistem kaynaklarının yönetimi gibi konulara da değindik.

WSL, tam bir fiziksel Linux kurulumu veya masaüstü sanal makinesi değildir. Ancak Windows ile Linux araçlarını birlikte kullanmak isteyenler için oldukça işlevsel bir geliştirme ve çalışma ortamı sunar.

Benim eski kurulum yöntemimden geriye kalan en önemli şey ise aynı: Arch Linux'u kendi ihtiyaçlarımıza göre yapılandırmak ve kullandığımız araçların kontrolünü elimizde tutmak.