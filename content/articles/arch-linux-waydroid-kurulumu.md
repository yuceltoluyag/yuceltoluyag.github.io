Title: Arch Linux'ta Waydroid Kurulumu: Binder Modülleri ve Gelişmiş Ayarlar
Date: 2025-10-26 03:00
Category: Linux
Tags: linux, waydroid, arch-linux, lxc, oyun, gamepad
Slug: arch-linux-waydroid-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Waydroid kurulumu ve gelişmiş ayarlarla Android uygulamalarını masaüstünde çalıştırın. Binder modüllerini etkinleştirin ve oyun deneyiminizi geliştirin.
Template: article
Series: Waydroid
Series_index: 1
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115487290533303352
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57k522v5c2s

## Giriş

Eğer **Arch Linux üzerinde Waydroid kurulumu** yapmak istiyorsan, doğru yerdesin. Bu rehberde Waydroid’in ne olduğunu, hangi paketlerin gerekli olduğunu, sistem modüllerinin nasıl yükleneceğini ve Waydroid’in ilk kez nasıl çalıştırılacağını adım adım göstereceğiz.

Waydroid, Linux üzerinde Android uygulamalarını **container (kapsayıcı)** içinde çalıştırmanı sağlayan bir projedir. Android ortamını, sistemine sanal makine kurmadan doğrudan **LXC (Linux Containers)** üzerinden çalıştırır. Bu sayede çok daha hızlı, entegre ve kaynak dostu bir Android deneyimi elde edersin ⚡

Bu rehberin sonunda:

- Arch Linux’ta Waydroid’i sıfırdan kurabileceksin,
- Binder modüllerini etkinleştirmeyi öğreneceksin,
- Waydroid sistem servislerini yöneteceksin,
- Android uygulamalarını masaüstünde sorunsuz şekilde başlatabileceksin,
- Gelişmiş özellikler ile oyun deneyimini optimize edebileceksin.

---

## Waydroid Nedir?

**Waydroid**, Linux sistemlerde Android uygulamalarını çalıştırmak için tasarlanmış açık kaynaklı bir araçtır.
Basitçe açıklamak gerekirse:

> Android işletim sistemini, sistem kaynaklarını sanal makineye kapatmadan doğrudan Linux çekirdeği üzerinde izole bir ortamda çalıştırır.

Waydroid, **LXC** tabanlı konteyner teknolojisini kullanır. Bu sayede:

- Performans, sanal makinelere göre çok daha yüksektir,
- Donanım hızlandırması kullanılabilir,
- Sistem kaynakları verimli şekilde paylaşılır.

### Temel Bileşenler

| Bileşen                | Açıklama                                   |
| ---------------------- | ------------------------------------------ |
| **waydroid**           | Ana komut satırı aracıdır                  |
| **binder_linux**       | Android binder arabirimini sağlar          |
| **ashmem_linux**       | Android shared memory modülüdür            |
| **systemd servisleri** | Waydroid’in konteynerini otomatik başlatır |

---

## Adım 1: Gerekli Paketleri Yükleme

İlk olarak Waydroid ve gerekli modülleri sistemine yükleyelim.
Arch Linux kullanıcıları için `pacman` ve `yay` kullanımı en kolay yöntemdir.

```bash
sudo pacman -Syu lxc python-gbinder
yay -S waydroid
```

!!! tip "Eğer `yay` kurulu değilse 💡"
`yay` yardımcı aracını yüklemek için:

```bash
sudo pacman -S base-devel git
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

---

## Adım 2: Binder ve Ashmem Modüllerini Etkinleştirme

Waydroid’in Android bileşenleriyle haberleşebilmesi için **binder** ve **ashmem** modüllerinin aktif olması gerekir.

```bash
lsmod | grep binder
lsmod | grep ashmem
```

Eğer çıktıda sonuç yoksa:

```bash
sudo modprobe binder_linux
sudo modprobe ashmem_linux
```

!!! note "Kalıcı yapmak için ⚡ Modülleri her yeniden başlatmada otomatik yüklemek istiyorsan:"

```bash
echo -e "binder_linux\nashmem_linux" | sudo tee /etc/modules-load.d/waydroid.conf
```

---

## Adım 3: Waydroid Servislerini Etkinleştirme

Waydroid sistemde iki ana servis kullanır:

- `waydroid-container.service`
- `waydroid-session.service`

Servisleri etkinleştirmek için:

```bash
sudo systemctl enable --now waydroid-container.service
```

Durumu kontrol et:

```bash
systemctl status waydroid-container.service
```

!!! tip "Binder modülü aktif değilse servis başlatılamaz ⚡ `dmesg | grep binder` ile kontrol edebilirsin."

---

## Adım 4: Waydroid Ortamını Başlatma

Waydroid konteynerini başlat:

```bash
sudo waydroid init
```

İlk kurulum birkaç dakika sürebilir.
Kurulum tamamlandıktan sonra:

```bash
waydroid session start
waydroid show-full-ui
```

!!! tip "Wayland veya GNOME Shell kullanıyorsan 💡 `waydroid show-full-ui` komutu masaüstü üzerinde Android arayüzünü açar."

---

## Adım 5: Uygulama Yönetimi

### Uygulama Listesi

```bash
waydroid app list
```

### Uygulama Başlatma

```bash
waydroid app launch com.android.settings
```

### Uygulama Kurma

```bash
waydroid app install ~/Downloads/uygulama.apk
```

!!! note "Bazı APK'lar çalışmayabilir ⚡ Google servisleri gerektiren uygulamalar GApps olmadan çalışmaz."

---

## Adım 6: Waydroid’i Durdurmak

```bash
waydroid session stop
sudo systemctl stop waydroid-container.service
```

---

## Adım 7: Sorun Giderme

### Waydroid Logları

```bash
waydroid log
```

### Binder Modülü Yüklenmemişse

```bash
sudo modprobe binder_linux
sudo systemctl restart waydroid-container.service
```

!!! warning "No binder devices found hatası alırsan ⚠️ Gerekirse özel çekirdek yükle."

---

## Adım 8: Gelişmiş Ayarlar ve Oyun Deneyimi ⚙️

### 8.1 Sahte Wi-Fi

```bash
waydroid prop set persist.waydroid.fake_wifi "com.lilithgame.roc.gp"
```

!!! tip "Belirli uygulamalar için sahte Wi-Fi sağlar 💡"

### 8.2 Udev ve Uevent

```bash
waydroid prop set persist.waydroid.udev true
waydroid prop set persist.waydroid.uevent true
```

!!! note "Linux donanım olaylarını Android tarafına iletir ⚡"

### 8.3 Gamepad Desteği 🎮

Kontrol cihazını bağladıktan sonra Android tarafından otomatik tanınır.
Sorun varsa `/dev/input` dizinini kontrol et.

### 8.4 XTR KeyMapper

```bash
sh /sdcard/Android/data/xtr.keymapper/files/xtMapper.sh
```

veya

```bash
/system/bin/app_process -Djava.library.path=$(echo /data/app/*/xtr.keymapper*/lib/x86_64) \
-Djava.class.path=$(echo /data/app/*/xtr.keymapper*/base.apk) / xtr.keymapper.server.RemoteServiceShell
```

!!! tip "Tuș atamalarını manuel başlatır 💡"

### 8.5 Bellek Yönetimi

```bash
sudo systemctl stop waydroid-container
```

!!! warning "Konteyneri durdurur ve belleği boşaltır ⚠️"

### 8.6 İlk Başlatma

```bash
sudo systemctl start waydroid-container
```

Sonraki oturumlarda:

```bash
waydroid session start
```

---

## Sonuç 🎯

Artık **Arch Linux’ta Waydroid kurulumu ve gelişmiş ayarlar** tamam!
Android oyunları, gamepad, sahte Wi-Fi ve tuş eşlemeleri ile optimize bir deneyim elde edebilirsin.

!!! tip "Gelişmiş ayar 💡 `waydroid prop set persist.waydroid.debug_shell true` ile canlı Android shell hatalarını görebilirsin."

---

## Kaynaklar

- [Waydroid - Arch Linux Wiki](https://wiki.archlinux.org/title/Waydroid){: target="\_blank" rel="noopener noreferrer"}
- [Waydroid GitHub](https://github.com/waydroid/waydroid){: target="\_blank" rel="noopener noreferrer"}
- [LXC Containers Documentation](https://linuxcontainers.org/lxc/introduction/){: target="\_blank" rel="noopener noreferrer"}
- [XTR KeyMapper Projesi](https://github.com/Xtr126/XtMapper){: target="\_blank" rel="noopener noreferrer"}

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="HVQBmWN5ZaU"></lite-youtube>



