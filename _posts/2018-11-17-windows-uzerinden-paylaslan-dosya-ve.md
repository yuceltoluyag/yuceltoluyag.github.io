---
layout: post
title: Windows üzerinden paylaşılan dosya ve yazıcılara erişim sağlamak(samba kullanımı)
description: Windows üzerinden paylaşılan dosya ve yazıcılara erişim sağlamak(samba kullanımı)
image: "/assets/images/linux_samba.webp"
category: linux
tags: [linux, windows10]
comments: false
edit_url: true
toc: true
---

Merhaba , windows üzerinden paylaşılan dosya,yazıcı vb gibi uygulamara linux üzerinden nasıl erişebileceğimiz hakkında rehber hazırladım. Aslında bu soru bana yaklaşık 2–3 ay önce gelmişti, yoğunluk sebebiyle konuya cevap verememiştim. Config Dosyalarını ve tüm ayarları tek konuda yapacağım, bu sebeble gözünüz korkmasın atla deve değil..

<!-- excerpt separator -->

# Samba Kurulumu

```shell
sudo pacman -S samba // kurulumu yapıyoruz.

```

## Ayar Dosyası

```shell

sudo nano /etc/samba/smb.conf

```

dosyası oluşturup içerisine şunları yapıştırıyoruz.

```shell
[global]
usershare path = /mnt/virtual/
usershare max shares = 100
usershare allow guests = yes
usershare owner only = yes
workgroup = WORKGROUP
writable = yes
browsable = yes
security = user
map to guest = Bad User
guest account = nobody
guest ok = no

[Public]

path = /mnt/virtual/public
guest ok = yes
guest only = yes

```

```shell
sudo mkdir /mnt/virtual

```

F3 Enter ve ardından F2 basıp çıkıyoruz. Yukarıda ki kısımları daha sonra videolu anlatımda anlatacağım, neyin ne işe yaradığı gibi..

### Kullanıcı Ekleme

```shell
sudo useradd paylas

```

diyerek bir kullanıcı oluşturuyorum.

#### Yetki Verme

```shell
sudo pdbedit -a -u paylas

```

kullanıcıya yetki ve şifre atayacağız. Bu şifreyi boş geçmeyin muhakkak bir şifre koyun, %100 olmasada problemlerle karşılaşıldığı oluyor. Bu şifreyi unutursanız

#### Şifre Oluşturma

```shell
sudo smbpasswd paylas

```

diyerek ileride değiştirirsiniz.

```shell
sudo systemctl restart smb.service nmb.service
sudo systemctl start smb.service nmb.service
sudo systemctl enable smb.service nmb.service

```

diyerek servisi önce yeniden başlattık sonra start verdik daha sonra sistem açılışında çalışması için aktif ettik.

# Dikkat Edilmesi Gerekenler

**Windows** üzerinde paylaşım yaparken, **muhakkak** gelişmiş paylaşım ayarlarından **şifreli** **paylaşımı** **kapatın**. Dosya paylaşımı yaparken **everyone** ve **guestide** ekleyin. İsterseniz eklemeyin siz bilirsiniz :D **smb://192.168.1.150** yazdığınızda bağlantı sağlayacaktır. İp adresi **örnektir**. Paylaştığınız windowsun ipsini öğrenmek istiyorsanız Komut satırına ip config yazarak **IPV4** karşısında ki ip sizin paylaşım ip nizdir.

```shell
sudo mount -t cifs //ipadresi/paylasilanklasor /mnt/virtual -o username=olusturulankullaniciadi,password=olusturulansifre,workgroup=workgroup,iocharset=utf8,uid=olusturulankullaniciadi,gid=root

```

ta ta ta taaaaaaa
![linux_samba_worked](/assets/images/linux_samba.webp)

Not: Bu isteğe bağlı bir özelliktir. İhtiyacınız yoksa bu bölümü atlayın.

## İsteğe Bağlı Özellikler

“**Usershares**”, **root** olmayan kullanıcılara kendi **paylaşım** tanımlarını **ekleme**, **değiştirme** ve **silme** yeteneği sağlayan bir özelliktir.**Thunar** dosya yöneticisi kullananlar(xfce) aurdan [thunar-shares-plugin](https://aur.archlinux.org/packages/thunar-shares-plugin/){:target="\_blank"}{:rel="noopener noreferrer"} paketini yükleyin.

```shell
sudo mkdir -p /var/lib/samba/usershares
sudo groupadd -r sambashare
sudo chown root:sambashare /var/lib/samba/usershares
sudo chmod 1770 /var/lib/samba/usershares

```

smb.conf dosyamızın en üstüne şunu ekleyelim

```shell
usershare path = /var/lib/samba/usershares usershare max shares = 100 usershare allow guests = yes
usershare owner only = yes

```

Daha sonra sambashare grubuna ekleme yapalım

```shell
sudo gpasswd sambashare -a paylas
sudo systemctl restart smb.service nmb.service

```

Örnek bir smb.conf

```shell
[global]
;inherit owner = unix only ;
;inherit permissions = yes ;
create mask = 0664
directory mask = 2755
force create mode = 0644
force directory mode = 2755
…
[media]
comment = Medya Paylaşımı
path = /mnt/media
valid users = greg @pcusers
force group = +pcusers
public = no
writable = yes
create mask = 0664
directory mask = 2775
force create mode = 0664
force directory mode = 2775

[public]
comment = Public isimli paylaşım dosyalarım
path = /mnt/public
public = yes read
only = yes write
list = archie printable = no

[guests]
comment = yazma erişimi olan genel paylaşım
path = /mnt/guests
public = yes
only guest = yes
writable = yes
printable = no

```

Bu konu hakkında videolu anlatım yapacağım. Bu birinci bölüm olsun : )
