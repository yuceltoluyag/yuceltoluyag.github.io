Title: Linux'ta UEFI Windows 10 Format USB Oluşturma - Resimli Anlatım
Date: 2018-09-14 12:45 10:00
Modified: 2025-03-08 12:00
Category: linux
Tags: linux, windows10, usb, format, uefi
Slug: linux-uefi-windows10-usb
Authors: yuceltoluyag
Summary: Linux kullanarak UEFI destekli Windows 10 format USB'si nasıl oluşturulur? WoeUSB aracıyla adım adım resimli anlatımı bu makalede bulabilirsiniz.
Translation: false
Status: published
Template: article

# Linux'ta UEFI Windows 10 Format USB Oluşturma

Windows'tan Linux'a geçiş yaparken, Rufus gibi programlar ile USB'den format oluşturmak oldukça kolaydır. Ancak, Linux üzerinde Wine kullanılsa bile Rufus'un düzgün çalışmadığı sıkça görülmektedir. Neyse ki, Linux tarafında kullanılabilecek çeşitli uygulamalar mevcuttur. Bunlardan biri de **WoeUSB**'dir. Bu rehberde, WoeUSB ile nasıl UEFI destekli bir Windows 10 format USB'si oluşturabileceğinizi anlatacağız.

---

## 1. Hazırlık

Öncelikle, aşağıdaki gereksinimlere sahip olmalısınız:

- **Windows 10 ISO dosyası:** Eğer elinizde yoksa, [resmi Microsoft sitesinden](https://www.microsoft.com/tr-tr/software-download/windows10){: target="_blank" rel="noopener noreferrer"} indirebilirsiniz.
- **WoeUSB programı:** Aşağıdaki komutlarla WoeUSB'yi kurabilirsiniz:

```bash
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install woeusb
```

## 2. USB Diskini Formatlama

USB diskimizi hazırlamak için şu adımları takip edelim:

1. **USB diskinizi biçimlendirin.**
2. **Format olarak NTFS seçin.** (FAT32 kullanırsanız büyük dosyalarda hata alabilirsiniz.)

![USB Formatlama](/images/linux_windows10_uefi_format.webp)

Eğer USB'yi yanlış formatta biçimlendirirseniz aşağıdaki gibi bir hata ile karşılaşabilirsiniz:

![Format Hatası](/images/linux_windows10_uefi_format_error.webp)

## 3. WoeUSB Kullanımı

WoeUSB'yi açın ve şu adımları takip edin:

1. **ISO dosyanızı seçin.**
2. **USB diskinizi seçin.**
3. **Başlat düğmesine basarak işlemi başlatın.**

![WoeUSB Arayüzü](/images/linux_windows10_uefi_disk.webp)

## 4. USB'den Boot Etme

İşlem tamamlandıktan sonra bilgisayarınızı yeniden başlatın ve **BIOS/UEFI ayarlarından USB disk ile boot edin.**

![Boot Ekranı](/images/linux_windows10_uefi_boot.webp)

## 5. Sonuç

Gördüğünüz gibi, Linux üzerinden UEFI destekli Windows 10 format USB'si oluşturduk. Eğer Linux'a yeni başladıysanız, aniden tam geçiş yapmak yerine çift işletim sistemi kullanarak aşamalı bir geçiş yapmanız daha iyi olabilir. **Daha fazla bilgi için şu makaleyi okuyabilirsiniz:** [Yeni Başlayanlar İçin Linux](/yeni-baslayanlar-linux-surumu/){: target="_blank" rel="noopener noreferrer"}

Eğer sorularınız veya kurulum sırasında aldığınız hatalar varsa yorum bırakabilirsiniz. İyi çalışmalar!

