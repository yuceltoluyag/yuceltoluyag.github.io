Title: Arch Linux'ta ntsync Nasıl Aktif Edilir?
Date: 2025-11-30 09:45
Category: Linux
Tags: arch linux, ntsync, gaming, zen kernel, wine, proton
Slug: arch-linux-ntsync-aktif-etme-zen-kernel-rehberi
Authors: yuceltoluyag
Summary: Oyun performansını artırmak için ntsync destekli Wine ve Proton kurdum ama unuttuğum bir şey vardı: Kernel! İşte ntsync hatası ve çözümü.
Image: images/arch-linux-ntsync-aktif-etme-zen-kernel-rehberi-xl.webp
Lang: tr
Translation: false
Status: published

Her şey masum bir performans sevdasıyla başladı. Linux'ta oyun oynarken o "micro-stuttering" denilen takılmaları bilirsiniz, adamı deli eder. Ben de "Şu meşhur `ntsync` olayını bir deneyeyim, Windows NT senkronizasyonunu kernel seviyesinde yapıyormuş, FPS uçar gider" dedim.

Hemen AUR'a daldım ve işin "kaymak" tabakası olan şu iki paketi sisteme çektim:

1.  [**wine-tkg-staging-ntsync-bin**](https://aur.archlinux.org/packages/wine-tkg-staging-ntsync-bin){: target="_blank" rel="noopener noreferrer"}
2.  [**proton-xiv-bin**](https://aur.archlinux.org/packages/proton-xiv-bin){: target="_blank" rel="noopener noreferrer"}

Paketler indi, kuruldu. "Tamamdır bu iş, artık uçuyoruz" diyerek sistemi yeniden başlattım. Ama unuttuğum, daha doğrusu atladığım ufak(!) bir detay varmış.

Logları kontrol edeyim dediğimde sistemin bana sitem ettiğini gördüm...

## Hata: "Ben Bu Modülü Tanımıyorum!"

Açılış loglarına (`journalctl -b -p err`) bir baktım, sistem bas bas bağırıyor:

```bash
Kas 28 01:41:10 baba systemd-modules-load[445]: Failed to find module 'ntsync'
```

Kafamdan aşağı kaynar sular döküldü desem yeridir. Ben yazılımı (Wine/Proton) kurdum ama meğersem altındaki zemini hazırlamamışım. Kullandığım kernel sürümüne baktım:

```bash
λ friday13 [~] → uname -r
6.6.63-1-lts
```

Sorun kabak gibi ortadaydı. Ben LTS (Uzun Dönem Destek) kernel kullanıyordum ama `ntsync` gibi deneysel ve yeni özellikler 6.6 sürümünde yoktu. Yani Ferrari motorunu Şahin kasasına takmaya çalışmışım. Bu özellik Kernel 6.14 ve sonrasında, özellikle de **Zen Kernel** gibi özelleştirilmiş çekirdeklerde varsayılan olarak geliyordu.[^1]

Neyse, hatayı anladık. Çözüm basit: Kernel değişecek!

## Adım 1: Zen Kernel Kurulumu

Arch Linux'ta kernel değiştirmek gözünüzü korkutmasın, aslında bir paket yüklemekten farksız. Hemen terminali açıp `linux-zen` ve başlık dosyalarını (headers) indirdim.

```bash
λ friday13 [~] → sudo pacman -S linux-zen linux-zen-headers
```

!!! tip "Headers Paketini Unutma ⚡ Eğer Nvidia kullanıyorsan veya dkms ile derlenen başka modüllerin varsa (VirtualBox vs.), `linux-zen-headers` paketini kurmazsan sistem açıldığında ekran kartın çalışmayabilir. Aman dikkat."

- [Arch Linux NVIDIA Ekran Kartı Kurulumu](/arch-linux-nvidia-ekran-karti-kurulumu/)
- [Arch Linux Linux Firmware NVIDIA Hatası Çözümü](/arch-linux-linux-firmware-nvidia-hatasi-cozumu/)
- [Linux ve Steamos Grafik Surucusu Yüklemesi ve Güncelleme Rehberi](/linux-gpu-driver-rehberi/)

## Adım 2: Bootloader Ayarı (Systemd-boot)

Paketi kurmak yetmiyor, sistemi "Bak kardeşim, artık bu yeni kernel ile açılacaksın" diye uyarmamız lazım. Ben `systemd-boot` kullanıyorum, ayarları da şöyle yaptım.

Önce mevcut ayarımı kopyaladım (ne olur ne olmaz, yedek candır):

```bash
λ friday13 [~] → sudo cp /boot/loader/entries/arch.conf /boot/loader/entries/arch-zen.conf
```

Sonra yeni dosyayı (`arch-zen.conf`) açıp içindeki `-lts` ibarelerini `-zen` ile değiştirdim:

```conf
title   Arch Linux Zen
linux   /vmlinuz-linux-zen
initrd  /initramfs-linux-zen.img
options root=PARTUUID=xxxx-xxxx-xxxx-xxxx rw quiet
```

## Adım 3: Modülü Kalıcı Olarak Aktif Etme

Kerneli kurup yapılandırmayı yaptık ama işi şansa bırakmayalım. Bu modülün her açılışta otomatik yüklenmesi için ufak bir ayar dosyası oluşturmamız şart. Yoksa her seferinde `modprobe` ile uğraşırız.

Bunun için `/etc/modules-load.d/` altına gidiyoruz:

```bash
λ friday13 [~] → sudo nano /etc/modules-load.d/ntsync.conf
```

Dosyanın içine sadece modülün adını yazıp kaydediyoruz:

```
ntsync
```

Bu işlemden sonra değişikliklerin geçerli olması için sistemi yeniden başlatıyoruz:

```bash
λ friday13 [~] → sudo reboot
```

## Büyük Final: ntsync Aktif mi?

Bilgisayar açıldı, hemen terminale koştum. Önce kernel sürümünü teyit ettim: `6.17.9-zen1-1-zen`. Harika.

Peki ya o kurduğum Wine ve Proton paketlerinin ihtiyaç duyduğu `ntsync` modülü?

```bash
λ friday13 [~] → modinfo ntsync
```

Çıktı tam istediğim gibiydi:

```bash
filename:       /lib/modules/6.17.9-zen1-1-zen/kernel/drivers/misc/ntsync.ko.zst
license:        GPL
description:    Kernel driver for NT synchronization primitives
...
```

Artık modül yüklüydü ve hata mesajları tarihe karışmıştı. Yani kurduğum o `wine-tkg` ve `proton-xiv` paketleri artık gerçekten işini yapabilirdi.

Kısacası, eğer siz de benim gibi "Oyunlarda performans artsın" diye özel Wine sürümleri kurup sonra "Neden çalışmıyor bu?" diye saçınızı başınızı yoluyorsanız, kernel sürümünüze bir bakın derim. Bazen çözüm, sadece daha "Zen" bir kernele geçmekte yatıyor. 😎



[^1]:
    LTS kernel, kararlılık için eski teknolojileri barındırır. Oyun ve yeni donanım özellikleri için genellikle Mainline veya Zen kernel tercih edilir.