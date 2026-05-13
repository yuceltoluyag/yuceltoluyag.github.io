Title: Steam Oyun Açılmıyor: Wrong ELF Class ve Libgamemodeauto Hatası Çözümü
Date: 2025-09-03 03:45
Category: Sorun Giderme
Tags: steam,debian,linux,oyun,wrong elf class,libgamemodeauto,gamemode,fmod
Slug: steam-debian-oyun-acilmiyor-wrong-elf-class-libgamemodeauto-hatasi-cozumu
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Debian'da Steam oyunları açılmıyor mu? Wrong ELF Class, libgamemodeauto preload ve FMOD hatalarını çözmek için iki farklı yöntemi öğrenin.
Template: article
Image: images/linux-girl-steam-debian-elf-class-gamemode-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115141057835929402
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lxwxi6wcj22i

Linux kullanıcıları için Steam, oyun dünyasının vazgeçilmez kapısıdır. Ancak Debian üzerinde oyun açmaya çalışırken **“wrong ELF class: ELFCLASS32/64"**, **“libgamemodeauto.so preload cannot be preloaded"** veya **FMOD preload hataları** ile karşılaşabilirsiniz.

[responsive_img src="/images/steam-debian-wrong-elf-class-gamemode-hatasi-xl.webp" alt="Steam Debian Wrong ELF Class ve Gamemode Hatası Çözümü" /]

Bu sorunlar genellikle **eksik 32-bit kütüphaneler**, **GameMode paket uyumsuzluğu** veya **Steam Overlay preload sorunları** ile ilgilidir.

Bu yazıda Debian’da Steam oyunlarının açılmama sorununu çözmek için **iki farklı yöntem** ele alacağız:

1. Depo üzerinden eksik paketlerin kurulması
2. Manuel `.deb` paket indirerek GameMode kurulumu
3. Ek olarak FMOD ve LD_PRELOAD hataları için alternatif çözümler

Hazırsanız adım adım çözümlere geçelim. 🚀

---

## 🔍 Sorunun Belirtileri

- Steam normal açılır, oyun başlatılır ancak **anında kapanır**.
- Terminal çıktısında şu hatalar görülür:

```bash

  ERROR: ld.so: object '/home/user/.local/share/Steam/ubuntu12_32/gameoverlayrenderer.so'
  from LD_PRELOAD cannot be preloaded (wrong ELF class: ELFCLASS32): ignored.

  ERROR: ld.so: object 'libgamemodeauto.so.0' from LD_PRELOAD cannot be preloaded: ignored.

```

- Bazı oyunlarda FMOD hataları:

```bash
  ERROR: ld.so: object '.../libfmodstudio.so' from LD_PRELOAD cannot be preloaded: ignored.
```

!!! note "Bu hatalar genellikle oyun çalıştırmayı engeller. Ancak çözüm basit: eksik kütüphaneleri ve doğru GameMode paketlerini kurmak."

---

## 🛠️ Yöntem 1: Depo Üzerinden Eksik Paketlerin Kurulması

Debian üzerinde eksik 32-bit kütüphaneler sorunun en yaygın nedenidir.

### 1. 32-bit mimariyi etkinleştirin

```bash
sudo dpkg --add-architecture i386
sudo apt update
```

### 2. Mesa ve Vulkan kütüphanelerini yükleyin

```bash
sudo apt install mesa-vulkan-drivers mesa-vulkan-drivers:i386 \
                 libgl1-mesa-dri libgl1-mesa-dri:i386 \
                 libgl1-mesa-glx libgl1-mesa-glx:i386
```

### 3. GameMode paketini yükleyin

```bash
sudo apt install gamemode libgamemode0:i386
```

---

### 🔧 Sorun Devam Ederse: LD_PRELOAD Test Yöntemi

Eğer yukarıdaki adımlardan sonra hâlâ oyun açılmıyorsa terminalde şu komutla test edin:

```bash
export LD_PRELOAD="/usr/lib/i386-linux-gnu/libgamemode.so.0"
steam
```

Bu şekilde Steam’i terminalden başlatın ve oyunu deneyin. Çalışırsa bu satırı **Steam başlatıcı ayarlarına** veya `~/.bashrc` dosyasına ekleyebilirsiniz.

!!! tip "Bu yöntem yalnızca test amaçlıdır. Kalıcı çözüm için manuel GameMode kurulumu (Yöntem 2) daha sağlıklıdır."

---

## 🛠️ Yöntem 2: Manuel `.deb` Paketleriyle GameMode Kurulumu

Bazı durumlarda Debian depolarındaki GameMode paketleri uyumsuz olabilir. Bu durumda **Debian Sid** deposundan güncel `.deb` dosyalarını indirip manuel kurulum yapabilirsiniz.

### 1. Mevcut GameMode paketini kaldırın

```bash
sudo apt remove gamemode --autoremove
```

### 2. Gerekli `.deb` dosyalarını indirin

- [gamemode (amd64)](https://packages.debian.org/sid/amd64/gamemode/download)
- [gamemode-daemon (amd64)](https://packages.debian.org/sid/amd64/gamemode-daemon/download)
- [libgamemode0 (amd64)](https://packages.debian.org/sid/amd64/libgamemode0/download)
- [libgamemodeauto0 (amd64)](https://packages.debian.org/sid/amd64/libgamemodeauto0/download)
- [libgamemode0 (i386)](https://packages.debian.org/sid/i386/libgamemode0/download)
- [libgamemodeauto0 (i386)](https://packages.debian.org/sid/i386/libgamemodeauto0/download)

### 3. İndirilen paketleri kurun

```bash
sudo apt install -f ./gamemode.deb ./gamemode-daemon.deb \
./libgamemode0.deb ./libgamemodeauto0.deb \
./libgamemode0_i386.deb ./libgamemodeauto0_i386.deb
```

---

## 💡 Ek İpuçları

### 🎵 FMOD Hatası (libfmodstudio.so preload)

Bazı oyunlarda şu hata çıkabilir:

```
ERROR: ld.so: object '.../libfmodstudio.so' from LD_PRELOAD cannot be preloaded: ignored.
```

Bu genellikle **kritik değildir**. Steam Overlay veya FMOD kütüphaneleri yanlış mimaride preload edilmeye çalışıldığı için olur.

Emin olmak için oyun dizininde FMOD kütüphanelerini kontrol edin:

```bash
cd ~/.local/share/Steam/steamapps/common/WW1GameSeries/Tannenberg/Tannenberg_Data/Plugins/
ls -lh libfmod*
```

### Proton Kullanımı

Steam’de oyuna sağ tık → Özellikler → Uyumluk → Proton 9.0-2 seçerek deneme yapın.

### Tema Sorunlarını Test Etme

GTK temaları bazen hataya neden olabilir. Adwaita temasıyla test edin:

```bash
sudo apt install adwaita-gtk2-theme adwaita-icon-theme
```

---

## ✅ Sonuç ve Özet

Debian’da Steam oyunlarının açılmamasına sebep olan **wrong ELF class**, **libgamemodeauto preload** ve **FMOD preload** hataları büyük ölçüde eksik kütüphanelerden kaynaklanır.

Bu rehberde üç aşamalı çözüm öğrendik:

1. Depodan eksik 32-bit paketleri ve GameMode’u kurmak
2. LD_PRELOAD yöntemiyle test yapmak
3. Manuel `.deb` paketleri indirip GameMode’u güncel sürümle yeniden kurmak

Her iki yöntem de problemi çözer, ancak **birincisi daha pratik**, ikincisi ise **daha güncel** bir alternatif sunar.

Artık Debian üzerinde Steam oyunlarını sorunsuzca çalıştırabilirsiniz. 🎮🐧

👉 Oyun çalışıyor fakat ses gelmiyorsa, Linux için hazırladığımız Steam ses hatası çözüm rehberine
bakabilirsiniz.: [Steam Linux Ses Hatası Çözümü](/arch-linux-steam-ses-hatasi-cozumu)

---

[responsive_img src="/images/linux-girl-steam-debian-elf-class-gamemode-xl.webp" alt="Linux Kızı ile Steam Debian Wrong ELF Class ve Gamemode Hatası Çözümü
" /]

Bana verilen çıktı bu şekildeydi. Bu çıktılara bakarak sorunu çözdük.

```bash
Galip Dede, [3.09.2025 00:18]
steam.sh[3186]: Running Steam on debian 13 64-bit

steam.sh[3186]: STEAM_RUNTIME is enabled automatically

setup.sh[3275]: Steam runtime environment up-to-date!

steam.sh[3186]: Log already open

steam.sh[3186]: Steam client's requirements are satisfied

CProcessEnvironmentManager is ready, 6 preallocated environment variables.

[2025-09-03 00:01:36] Startup - updater built Jun 28 2025 01:05:05

[2025-09-03 00:01:36] Startup - Steam Client launched with: '/home/galip/.local/share/Steam/ubuntu12_32/steam' '-srt-logger-opened'

CProcessEnvironmentManager is ready, 6 preallocated environment variables.

[2025-09-03 00:01:36] Process started with command-line: '/home/galip/.local/share/Steam/ubuntu12_32/steam' '-child-update-ui' '-child-update-ui-socket' '8' '-srt-logger-opened'

09/03 00:01:36 minidumps folder is set to /tmp/dumps

[2025-09-03 00:01:36] Using update UI: console

09/03 00:01:36 Init: Installing breakpad exception handler for appid(steam)/version(0)/tid(3340)

[2025-09-03 00:01:36] Create window

[2025-09-03 00:01:36] Loading cached metrics from disk (/home/galip/.local/share/Steam/package/steam_client_metrics.bin)

[2025-09-03 00:01:36] Using the following download hosts for Public, Realm steamglobal

[2025-09-03 00:01:36] 1. https://client-update.akamai.steamstatic.com, /, Realm 'steamglobal', weight was 400, source = 'update_hosts_cached.vdf'

[2025-09-03 00:01:36] 2. https://client-update.fastly.steamstatic.com, /, Realm 'steamglobal', weight was 900, source = 'update_hosts_cached.vdf'

[2025-09-03 00:01:36] 3. https://client-update.steamstatic.com, /, Realm 'steamglobal', weight was 1, source = 'baked in'

09/03 00:01:36 minidumps folder is set to /tmp/dumps

[2025-09-03 00:01:36] Yükleme doğrulanıyor...

[2025-09-03 00:01:36] Verifying file sizes only

[2025-09-03 00:01:36] Set percent complete: 0

[2025-09-03 00:01:36] Set percent complete: -1

[2025-09-03 00:01:36] Set status message: Yükleme doğrulanıyor...

[----] Yükleme doğrulanıyor...

[2025-09-03 00:01:36] Verification complete

UpdateUI: skip show logo

[2025-09-03 00:01:36] Destroy window


Steam logging initialized: directory: /home/galip/.local/share/Steam/logs


[2025-09-03 00:01:36] ProcessNextMessage: socket disconnected

[2025-09-03 00:01:36] No more messages are expected - exiting

XRRGetOutputInfo Workaround: initialized with override: 0 real: 0xf62af6b0

XRRGetCrtcInfo Workaround: initialized with override: 0 real: 0xf62adf80

09/03 00:01:37 minidumps folder is set to /tmp/dumps

09/03 00:01:37 Init: Installing breakpad exception handler for appid(steamsysinfo)/version(1751405894)/tid(3358)

Running query: 1 - GpuTopology

Response: gpu_topology {

  gpus {

    id: 1

    name: "AMD Radeon RX 550 / 550 Series (RADV POLARIS12)"

    vram_size_bytes: 4294967296

    driver_id: k_EGpuDriverId_MesaRadv

    driver_version_major: 25

    driver_version_minor: 0

    driver_version_patch: 7

  }

  default_gpu_id: 1

}


Exit code: 0

Saving response to: /tmp/steamcJalPC - 71 bytes

steamwebhelper.sh[3374]: Starting steamwebhelper under bootstrap steamrt steam runtime via: /home/galip/.local/share/Steam/steamrt64/steam-runtime-steamrt/_v2-entry-point

steamwebhelper.sh[3374]: Starting steamwebhelper with steamrt steam runtime at /home/galip/.local/share/Steam/steamrt64/steam-runtime-steamrt/_v2-entry-point

Steam Runtime Launch Service: starting steam-runtime-launcher-service

Steam Runtime Launch Service: steam-runtime-launcher-service is running pid 3477

bus_name=com.steampowered.PressureVessel.LaunchAlongsideSteam

Galip Dede, [3.09.2025 00:18]
exec ./steamwebhelper -nocrashdialog -lang=tr_TR -cachedir=/home/galip/.local/share/Steam/config/htmlcache -steampid=3338 -buildid=1751405894 -steamid=0 -logdir=/home/galip/.local/share/Steam/logs -uimode=7 -startcount=0 -steamuniverse=Public -realm=Global -clientui=/home/galip/.local/share/Steam/clientui -steampath=/home/galip/.local/share/Steam/ubuntu12_32/steam -launcher=0 --valve-enable-site-isolation --enable-smooth-scrolling --password-store=basic --log-file=/home/galip/.local/share/Steam/logs/cef_log.txt --disable-quick-menu --disable-component-update --enable-features=PlatformHEVCDecoderSupport --disable-features=SpareRendererForSitePerProcess,DcheckIsFatal,BlockPromptsIfIgnoredOften,ValveFFmpegAllowLowDelayHEVC

/home/galip/.themes/Dracula/gtk-2.0/main.rc:727: error: unexpected identifier 'direction', expected character '}'

/home/galip/.themes/Dracula/gtk-2.0/apps/chrome.rc:50: error: invalid string constant "button", expected valid string constant

/home/galip/.themes/Dracula/gtk-2.0/apps/xfce.rc:77: error: invalid string constant "entry", expected valid string constant

Desktop state changed: desktop: { pos:    0,   0 size: 1920,1080 } primary: { pos:    0,   0 size: 1920,1080 }

Caching cursor image for , size 10x16, serial 113, cache size = 0

reaping pid: 3339 -- sh

chdir "/home/galip/.local/share/Steam/steamapps/common/WW1GameSeries"

ERROR: ld.so: object '/home/galip/.local/share/Steam/ubuntu12_32/gameoverlayrenderer.so' from LD_PRELOAD cannot be preloaded (wrong ELF class: ELFCLASS32): ignored.

Game Recording - would start recording game 633460, but recording for this game is disabled

Adding process 3913 for gameID 633460

gamemodeauto:

ERROR: ld.so: object '/home/galip/.local/share/Steam/steamapps/common/WW1GameSeries/Tannenberg/Tannenberg_Data/Plugins/libfmodstudio.so' from LD_PRELOAD cannot be preloaded (wrong ELF class: ELFCLASS64): ignored.

ERROR: ld.so: object '/home/galip/.local/share/Steam/steamapps/common/WW1GameSeries/Tannenberg/Tannenberg_Data/Plugins/libfmodstudioL.so' from LD_PRELOAD cannot be preloaded (wrong ELF class: ELFCLASS64): ignored.

gamemodeauto:

ERROR: ld.so: object 'libgamemodeauto.so.0' from LD_PRELOAD cannot be preloaded (cannot open shared object file): ignored.

ERROR: ld.so: object 'libgamemodeauto.so.0' from LD_PRELOAD cannot be preloaded (cannot open shared object file): ignored.

ERROR: ld.so: object 'libgamemodeauto.so.0' from LD_PRELOAD cannot be preloaded (cannot open shared object file): ignored.

ERROR: ld.so: object 'libgamemodeauto.so.0' from LD_PRELOAD cannot be preloaded (cannot open shared object file): ignored.

Found path: /home/galip/.local/share/Steam/steamapps/common/WW1GameSeries/Tannenberg/Tannenberg

Game Recording - game stopped [gameid=633460]

Removing process 3913 for gameID 633460

[2025-09-03 00:03:38] Background update loop checking for update. . .

[2025-09-03 00:03:38] Güncellemeler denetleniyor...

[2025-09-03 00:03:38] Downloading manifest: https://client-update.akamai.steamstatic.com/steam_client_ubuntu12

[2025-09-03 00:03:38] Manifest download: send request

[2025-09-03 00:03:38] Manifest download: waiting for download to finish

[2025-09-03 00:03:39] Manifest download: finished

[2025-09-03 00:03:39] Download skipped: /steam_client_ubuntu12 version 1751405894, installed version 1751405894, existing pending version 0

[2025-09-03 00:03:39] Nothing to do
```



