Title: Diskleri Çöpe Atın: Raspberry Pi Zero ile Tamamen RAM Üstünde Site Barındırmak
Date: 2026-05-11 00:05
Category: Linux
Tags: raspberry pi, pi zero, alpine linux, ram, diskless, self-hosting
Slug: raspberry-pi-zero-ram-diskless-web-server
Authors: yuceltoluyag
Summary: 512MB RAM'li bir Pi Zero'yu tamamen diskless bir Alpine Linux sunucusuna çevirip, üzerinde nasıl web sitesi barındıracağınızı anlatan çılgın bir rehber.
Image: images/raspberry-pi-zero-ram-diskless-web-server-xl.webp
Lang: tr
Status: published

Elinizde bir Raspberry Pi Zero (v1.3 veya W) varsa, aslında elinizde dünyanın en dayanıklı mikro sunucusu var demektir. Tabii eğer SD kartı sadece "açılış" için kullanıp, sistemin geri kalanını tamamen RAM üzerinde koşturursanız. Bugün, diskless (disksiz) çalışan ve sadece 512MB RAM'in içine sığan Alpine Linux tabanlı bir web sunucusu kuruyoruz.

SD kartlar ölür, yazma limitleri biter ama RAM (eğer elektrik varsa) asla yorulmaz. Hadi bu çılgınlığın detaylarına Arch Linux terminalimizden dalalım.

## 💾 Adım 1: SD Kartı Arch Linux Üzerinde Hazırlamak

Kaynaklarda genelde macOS anlatılır ama biz işimizi Arch terminalinde, `fdisk` ile cerrah titizliğinde halledeceğiz. SD kartınızın `/dev/sdX` olduğunu varsayıyorum (aman dikkat, yanlış diski uçurmayın!).

```bash
yuceltoluyag@archlinux:~$ sudo fdisk /dev/sdX
# 'o' ile yeni partition table, 'n' ile yeni partition (FAT32 için) oluşturun.
# Tipini 'b' (W95 FAT32) yapmayı unutmayın.

yuceltoluyag@archlinux:~$ sudo mkfs.vfat -F 32 -n ALPINE /dev/sdX1
yuceltoluyag@archlinux:~$ sudo mount /dev/sdX1 /mnt
yuceltoluyag@archlinux:~$ sudo tar xzf alpine-rpi-*.tar.gz -C /mnt
yuceltoluyag@archlinux:~$ sudo umount /mnt
```

Kartı Pi Zero'ya takın, klavye ve monitörü bağlayıp gücü verin. `root` ile şifresiz giriş yapın.

## 🧠 Adım 2: Alpine Linux Diskless Modu ve lbu

Pi açıldığında her şey RAM'dedir ama yaptığınız değişikliklerin kalıcı olması için Alpine'in `lbu` (Local Backup) aracını kurmamız şart.

```bash
Friday13-Zero:~# setup-lbu mmcblk0p1
Friday13-Zero:~# mkdir -p /media/mmcblk0p1/cache
Friday13-Zero:~# setup-apkcache /media/mmcblk0p1/cache
```

Şimdi asıl sihirli komutu veriyoruz: `setup-alpine`. 

!!! danger "Kritik Seçim!"
    Kurulum sırasında **"Disk"** seçimi geldiğinde mutlaka **"none"** demeniz gerekiyor. Bu, işletim sisteminin SD karta kurulmasını engeller ve sistemi tamamen RAM'e (tmpfs) yükler. SSH olarak `dropbear` seçin, çünkü kısıtlı RAM'imizde OpenSSH lüks kaçar.

## 🌐 Adım 3: Sunucu Kurulumu ve Otomasyon

Web sunucusu olarak `darkhttpd` kullanacağız. Hafiftir, hızlıdır ve tam da Pi Zero'ya göredir.

```bash
Friday13-Zero:~# apk add darkhttpd
Friday13-Zero:~# mkdir -p /var/www/localhost/htdocs
```

Sistemin her açılışta sunucuyu başlatması için `/etc/init.d/darkhttpd` dosyasını şu içerikle oluşturun:

```bash
#!/sbin/openrc-run
description="darkhttpd static web server"
command="/usr/bin/darkhttpd"
command_args="/var/www/localhost/htdocs --port 80 --maxconn 20"
command_background=true
pidfile="/run/darkhttpd.pid"

depend() {
    need net
}
```

Script'i yetkilendirin ve başlangıca ekleyin:
```bash
Friday13-Zero:~# chmod +x /etc/init.d/darkhttpd
Friday13-Zero:~# rc-update add darkhttpd default
Friday13-Zero:~# rc-service darkhttpd start
```

## 💾 Adım 4: Kalıcılığı Sağlamak (lbu commit)

Şu an her şey çalışıyor ama elektrik giderse her şey silinir. Yeni oluşturduğumuz script'i ve web klasörünü Alpine'in yedekleme listesine eklemeliyiz:

```bash
Friday13-Zero:~# lbu include /etc/init.d/darkhttpd
Friday13-Zero:~# lbu include /var/www
Friday13-Zero:~# lbu commit -d
```

`lbu commit -d` komutu, o an RAM'de olan bu değişiklikleri paketleyip SD karttaki o küçük FAT32 bölümüne `apkovl` dosyası olarak yazar.

---

## 🛠️ Sorun Giderme ve Kritik Kontroller

Yazıyı bitirmeden önce, sistemin çalışması için şu "olmazsa olmazları" kontrol edin:

1.  **Dış Dünya Erişimi:** VPS üzerindeki `socat` tüneli çalışıyor mu? (Örn: `socat TCP-LISTEN:80,fork,reuseaddr TCP:EV_IP:80 &`)
2.  **RAM Kullanımı:** `df -h` komutunu verdiğinizde `/` (root) dizininin `tmpfs` olarak göründüğünden emin olun.
3.  **Persistence Testi:** Bir kez `reboot` atın. Eğer `darkhttpd` servisi kendiliğinden kalkmıyorsa veya `/var/www` içindeki dosyalarınız yoksa `lbu include` adımını yanlış yapmışsınız demektir.

Sistemi yedeklemek isterseniz, Pi açıkken Arch makinenizden şu komutu verin:
```bash
yuceltoluyag@archlinux:~$ ssh root@pi-ip "dd if=/dev/mmcblk0 bs=4M" > zero-full-backup.img
```

İşte bu kadar! 512MB RAM içinde koca bir dünya. [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/) yazımda bahsettiğim o "verimlilik" felsefesinin donanım bulmuş hali tam olarak budur kardaş.

Hadi kalın sağlıcakla, RAM'iniz bol olsun!

---

## 🔗 İlgili Yazılar
- [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)
- [Arch Linux'tan MikroTik'e WireGuard: DNS Belası ve Temiz Kurulum](/arch-linux-mikrotik-wireguard-kurulumu/)
- [PNG Dosyalarıyla İmtihanım: Mogrify ve Chunk Hataları](/png-mogrify-chunk-hatalari-cozumu/)



