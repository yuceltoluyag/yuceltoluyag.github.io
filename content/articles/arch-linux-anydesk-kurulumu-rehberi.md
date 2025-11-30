Title: Arch Linux'ta AnyDesk Kurulumu: Neden RustDesk Değil de Bu?
Date: 2025-11-30 11:45
Category: Araçlar
Tags: arch linux, anydesk, aur, yay, rustdesk, uzak masaüstü
Slug: arch-linux-anydesk-kurulumu-rehberi
Authors: yuceltoluyag
Summary: Gönül RustDesk ister ama şirketler ve akrabalar AnyDesk der. Toplumsal baskıya boyun eğip Arch Linux'ta AnyDesk'i en sorunsuz nasıl kurarız?
Image: images/arch-linux-anydesk-kurulumu-rehberi-xl.webp
Lang: tr
Translation: false
Status: published


Biliyorum, şimdi yorumlarda (ya da içinizden) soracaksınız: *"Yahu hocam, mis gibi açık kaynak, kendi sunucunu kurabildiğin (self-hosted) **RustDesk** varken neden kapalı kaynaklı AnyDesk?"*

Cevap çok basit ve acı: **Mahalle Baskısı.**

Şirketteki IT departmanı, uzaktaki kuzen, muhasebeci... Sanki hepsine vahiy inmiş gibi AnyDesk kullanıyor. TeamViewer "Ticari kullanım tespit ettim, seni atıyorum" diyerek hepimizi bezdirdiğinde, herkes RustDesk'e geçmek yerine topluca AnyDesk'e göç etti. Sen istediğin kadar "Bakın bu özgür yazılım" de, kurumlar ve son kullanıcılar alışkanlıklarını değiştirmiyor.

Ben de Arch Linux kullanan biri olarak, "Biz RustDesk kullanıyoruz" diyemediğim senaryolarda (yani %99'unda) mecburen AnyDesk kurmak zorunda kalıyorum.

Peki Arch Linux'ta, Flatpak sürümü ölmüşken (EOL), bunu en temiz, en güncel ve en sorunsuz nasıl kurarız? Gelin şu "mecburiyet" aracını kuralım.

## Adım 1: AUR'un Gücü ve YAY (Yet Another Yogurt)

AnyDesk resmi depolarda yok. Flatpak sürümü de bakımsız. Elimizde tek ve en güçlü kale kalıyor: **AUR (Arch User Repository).**

AUR'u kullanmak için `yay` gibi bir yardımcıya ihtiyacımız var. Eğer sisteminizde zaten varsa bu adımı atlayın. Yoksa, terminali açıp şu komutlarla kurun:

```bash
sudo pacman -S --needed git base-devel
# Root olmadan çalıştırın:
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Adım 2: AnyDesk'i İndirip Kuralım

Kaynak koddan derlemekle uğraşmayacağız, hazır derlenmiş binary paketi (`anydesk-bin`) kuracağız ki hızlı olsun.

```bash
yay -S anydesk-bin
```

Kurulum sırasında sorular sorarsa `Enter` tuşuna basıp geçebilirsiniz. Hızlı ve temiz.

## Adım 3: Wayland Çıkmazı (Bağlanamıyorum Sorunu!)

İşte işin teknik ve can sıkıcı kısmı burası. Modern Linux dağıtımları (Gnome, KDE vb.) artık varsayılan olarak **Wayland** kullanıyor. Ancak AnyDesk, Wayland ile hala tam randımanlı çalışamıyor.

Özellikle karşı tarafa "Abi sen hiçbir şeye dokunma, ben bağlanıp halledeceğim" diyorsanız (Unattended Access), Wayland size kabus yaşatır. Ekran gelmez, mouse çalışmaz, izin pencereleri çıkar...

Bu yüzden, eğer sorunsuz bir bağlantı istiyorsanız, **X11 (Xorg)** kullanmak zorundasınız.

### Gnome Kullanıcıları İçin Çözüm:

GDM ayar dosyasını düzenleyip Wayland'i devre dışı bırakacağız:

```bash
sudo nano /etc/gdm/custom.conf
```

`[daemon]` başlığı altındaki şu satırın başındaki `#` işaretini kaldırın:

```ini
[daemon]
WaylandEnable = false
```

### KDE ve Diğerleri İçin:

Bilgisayarı açarken şifre ekranında, oturum türü olarak **"Plasma (X11)"** veya kullandığınız masaüstü ortamının X11 versiyonunu seçtiğinizden emin olun.

## Adım 4: Servisi Başlat ve Unut

AnyDesk'i kurduk ama servis çalışmazsa ID alamazsınız veya "Ağa bağlanılıyor" hatası alırsınız. Servisi başlatıp, her açılışta otomatik çalışmasını sağlayalım:

```bash
sudo systemctl enable --now anydesk
```

İşlem tamam! Temiz bir başlangıç için `reboot` atın.

```bash
sudo reboot
```

## Sonuç

Evet, gönlümüz RustDesk'ten yana olsa da, hayatın gerçekleri bazen bizi AnyDesk kurmaya zorluyor. Artık Arch Linux sisteminiz, şirketteki Windows makinelerle veya akrabalarınızın bilgisayarlarıyla "onların dilinden" konuşmaya hazır.

Bir gün herkesin özgür yazılımın kıymetini anlaması dileğiyle... O güne kadar ID numaranızı kimseyle paylaşmayın! 😎