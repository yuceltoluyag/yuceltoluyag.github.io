---
layout: post
title: Linuxta UEFI windows 10 format usb oluşturma resimli anlatım
description: Linuxta UEFI windows 10 format usb oluşturma resimli anlatım
image: "/assets/images/linux_windows10_uefi.webp"
tags: [linux, windows10]
category: linux
comments: false
edit_url: true
toc: true
---

Windowsan linuxa geçerken rufus benzeri programlar ile programlar ile kurulumu sorunsuz yapabilmekteyiz. Ancak linux tarafında wine kullanılsa dahi rufus programının düzgün çalıştığı söylenemez. Linux tarafında çok çeşitli uygulamalar mevcut fakat yeni kullanıcılar kullanmakta zorluklar çekmektedir.

<!-- excerpt separator -->

# Hazırlık

1.  [Windows10.iso](https://www.microsoft.com/tr-tr/software-download/windows10){:target="\_blank"}{:rel="noopener noreferrer"} dosyanız yoksa edinin.
2.  [WoeUSB programını yüklüyoruz.](https://github.com/slacka/WoeUSB){:target="\_blank"}{:rel="noopener noreferrer"}

```shell
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install woeusb
```

# USB Formatlama

USB diskimizi formatlıyoruz.
![linux_windows10_uefi](/assets/images/linux_windows10_uefi.webp)

![linux_windows10_uefi_format](/assets/images/linux_windows10_uefi_format.webp)

Burada dikkat etmemiz gereken nokta **USB diskimizi muhakkak NTFS formatında biçimlendirmeliyiz.Aksi halde ekranda ki gibi hata alacaksınız.**

![linux_windows10_uefi_format_error](/assets/images/linux_windows10_uefi_format_error.webp)

**Woeusb** programını artık açabiliriz.İlk yere iso dosyasımızı seçiyoruz. Altaki ekranda hazırladığımız usb diskimiz seçili olmalıdır.![linux_windows10_uefi_disk](/assets/images/linux_windows10_uefi_disk.webp)

İşlem tamamlandıktan sonra bilgisayarınızı yeniden başlatın ve boot edin.![linux_windows10_uefi_boot](/assets/images/linux_windows10_uefi_boot.webp)

![linux_windows10_uefi_boot_2](/assets/images/linux_windows10_uefi_boot_2.webp)

# Sonuç

Gördüğünüz gibi linuxta windows 10 format usbsi hazırlamış olduk,hemde uefi :) Kişisel görüşüm, linuxa yeni başladıysanız birden bire geçmeyin ,afallayabilirsiniz. Şu yazımı okumadıysanız okumanızı tavsiye ederim => [Yeni Başlayanlar için Linux](https://yuceltoluyag.github.io/yeni-baslayanlar-hangi-linux-surumunu/){:target="\_blank"}{:rel="noopener noreferrer"}
