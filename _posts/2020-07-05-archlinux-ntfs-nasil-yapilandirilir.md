---
layout: post
title: Arch Linux'ta NTFS Nasıl Yapılandırılır
description: How To configure NTFS in Arch Linux
image: "/assets/images/ntfs_yetki_hatasi.webp"
category: linux
tags: [linux, ntfs]
comments: false
edit_url: true
toc: true
---

![Laravel İde Helper](/assets/images/ntfs_yetki_hatasi.webp)

# Sorun nedir ?

Linux'un dosya formatı ext(ext1,ext2,ext3,ext4) olduğundan, yeni kurulan sistemlerde farklı bir birimde ki disk türüne bağlandığımızda **failed to mount diskadiniz -> not authorized to perform operation** gibi bir hatası ile karşılaşıyoruz. Daha modern bir dosya yöneticisi kullanıyorsanız, diske bağlanmak istediğinizde sizden **parola** isteyebilir. Aslında diğer birimleri linux tanıyor ancak işlem yapabilmek için,yetki istiyor. (Bağlanma,kopyalama,yapıştırma,silme,geri getirme vs gibi)

<!-- excerpt separator -->

## Çözüm : 1. Yöntem ?

Terminali açıp şu uygulamaları kuruyoruz.

```shell
sudo pacman -S gvfs ntfs-3g dosfstools

```

Daha sonra

```shell
su
cd /usr/share/polkit-1/rules.d
touch 10-drives.rules
vim 10-drives.rules # siz düzenlemek istediğiniz başka bir editörle açabilirsiniz nano,sublime vs
```

bu dosyanın içerisine şunları yapıştırıyorsunuz.

```shell

polkit.addRule(function(action, subject) {
if (action.id.indexOf("org.freedesktop.udisks2.") == 0){
return polkit.Result.YES;
}
}
);

```

yapılan ayarların yeniden okutulması için (bazen bugda kalıyor yapmadabilirsiniz,eğer sorun yaşarsanız yaparsınız)

```shell
sudo pacman -S gvfs ntfs-3g dosfstools
```

Şimdi kullanıcımızı disk grubuna ekleyelim.

```shell
sudo gpasswd -a $USER disk

```

Bilgisayarınızı yeniden başlatın,sorun çözülmüş olacaktır.

## Ekstra Bilgiler 2.Yöntem

Takılı HDD/SDD/NVM lerin listelerini ve id(uuid)lerini görmek isterseniz şu komutu kullanabilirsiniz

```shell
sudo blkid
```

İstediğiniz bir klasöre,bağlamak istediğiniz depolayıcıyı(hardiskinizde ki verileri) aktarabilirsiniz.

Örneğin :

```shell
sudo mkdir /burayabagla

```

```shell
sudo mount -t ntfs-3g /dev/sdXX /burayabagla
```

**sdXX** kısmına yukarıda verdiğim **blkid** komutuyla aldığınız disk adını yazacaksınız.(sda1 sda2 sdb vs vs) Artık bağlamak istediğim hardiskimde ki verileri ana dizine oluşturmuş olduğum **burayabagla** klasöründe görebileceğim.

Diski geri çıkarmak istersem

```shell
sudo umount /burayabagla

```

Başlangıçta otomatik olarak,takılı şekilde gelmesini istersem

fstab dosyasını düzenlememiz gerekiyor

```shell
sudo vim /etc/fstab # siz düzenlemek istediğiniz başka bir editörle açabilirsiniz nano,sublime vs
```

bu dosyanın en altına

```shell
/dev/sdXX /mirror ntfs-3g uid=kullaniciadiniz,gid=users,umask=0022 0 0

```

ekleyiniz. Daha sonra sistemi yeniden başlattıığınızda,diskin takılı olarak geldiğini görebilirsiniz. Bu işlemler ekstrem durumlarda yapılabilir. Birinci yöntemi uyguladıktan sonra ,taktığınız her hdd otomatik olarak algılanacaktır. Eğer algınlanmazsa 2 yöntem ile bu sorunuda aşabilirsiniz.

[Daha Fazla Bilgi için](https://wiki.archlinux.org/index.php/NTFS-3G){:target="\_blank"}{:rel="noopener noreferrer"} Arch linux belgelerinden yararlanabilirsiniz.
