Title: Windows Üzerinden Paylaşılan Dosya ve Yazıcılara Erişim Sağlamak (Samba Kullanımı)
Date: 2018-11-17 10:00 10:00
Modified: 2025-08-11 22:59
Category: Ağ ve İnternet
Tags: linux, windows10
Slug: windows-uzerinden-paylasilan-dosya-ve-yazicilara-erisim-saglamak
Authors: yuceltoluyag
Summary: Bu rehberde, Windows üzerinden paylaşılan dosya ve yazıcılara Linux ile nasıl erişileceği anlatılmaktadır. Samba kullanımı ve ayarları detaylı bir şekilde açıklanmıştır.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/linux_samba-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982722753677108
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqmq6nzak2x

Merhaba! Windows üzerinden paylaşılan dosya, yazıcı gibi kaynaklara Linux üzerinden nasıl erişebileceğinizi anlatan bir rehber hazırladım. Bu konu bana yaklaşık 2-3 ay önce sorulmuştu, ancak yoğunluk nedeniyle henüz yanıtlayamamıştım. Şimdi, konuyu baştan sona ele alacağım ve tüm ayarları tek bir yazıda toplayacağım. Korkmanıza gerek yok, her şey adım adım açıklanacak!

## Samba Kurulumu

Samba kurulumunu gerçekleştirmek için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo pacman -S samba
```

## Ayar Dosyasını Düzenleme

Samba'nın yapılandırma dosyasını düzenlemek için aşağıdaki komutla açabilirsiniz:

```bash
sudo nano /etc/samba/smb.conf
```

Dosyayı oluşturup içerisine şu ayarları yapıştırıyoruz:

```bash
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

Şimdi sanal bir dizin oluşturalım:

```bash
sudo mkdir /mnt/virtual
```

F3 tuşuna basarak dosyayı kaydedip, ardından F2 tuşuyla çıkıyoruz. Bu ayarların her birinin ne işe yaradığını, detaylı videolu anlatımda açıklayacağım.

### Kullanıcı Ekleme

Samba'ya erişim sağlayacak yeni bir kullanıcı oluşturmak için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo useradd paylas
```

#### Yetki Verme

Yeni oluşturduğumuz kullanıcıya yetki ve şifre vermek için şu komutu kullanın:

```bash
sudo pdbedit -a -u paylas
```

Şifreyi mutlaka belirleyin, aksi takdirde bazı problemlerle karşılaşabilirsiniz. Eğer şifreyi unuttuysanız, şu komutla şifreyi değiştirebilirsiniz:

```bash
sudo smbpasswd paylas
```

Son olarak, Samba servisini yeniden başlatıp aktif hale getirelim:

```bash
sudo systemctl restart smb.service nmb.service
sudo systemctl start smb.service nmb.service
sudo systemctl enable smb.service nmb.service
```

## Dikkat Edilmesi Gerekenler

Windows üzerinde dosya paylaşımı yaparken, mutlaka gelişmiş paylaşım ayarlarından şifreli paylaşımı kapatın. Ayrıca, dosya paylaşımı sırasında "everyone" ve "guest" kullanıcılarını eklemeyi unutmayın. İsterseniz eklemeyebilirsiniz, tercih sizin! 😄 Paylaşıma bağlanmak için şu formatı kullanabilirsiniz: `smb://192.168.1.150`. Bu IP adresi sadece örnektir, kendi Windows makinenizin IP adresini öğrenmek için "ipconfig" komutunu kullanabilirsiniz.

Aşağıdaki komutla paylaşımı bağlayabilirsiniz:

```bash
sudo mount -t cifs //ipadresi/paylasilanklasor /mnt/virtual -o username=olusturulankullaniciadi,password=olusturulansifre,workgroup=workgroup,iocharset=utf8,uid=olusturulankullaniciadi,gid=root
```

[responsive_img src="/images/linux_samba-xl.webp" alt="linux_samba_worked" /]

## İsteğe Bağlı Özellikler

"**Usershares**" özelliği, root olmayan kullanıcılara kendi paylaşım ayarlarını ekleme, değiştirme ve silme yeteneği tanır. Eğer Thunar dosya yöneticisini kullanıyorsanız (XFCE masaüstü ortamında), aşağıdaki komutla gerekli paketi yükleyebilirsiniz:

```bash
sudo pacman -S thunar-shares-plugin
```

Sonrasında şu adımları takip edelim:

```bash
sudo mkdir -p /var/lib/samba/usershares
sudo groupadd -r sambashare
sudo chown root:sambashare /var/lib/samba/usershares
sudo chmod 1770 /var/lib/samba/usershares
```

Samba yapılandırma dosyasının en üst kısmına şu satırı ekleyelim:

```bash
usershare path = /var/lib/samba/usershares
usershare max shares = 100
usershare allow guests = yes
usershare owner only = yes
```

Son olarak, kullanıcıyı "sambashare" grubuna ekleyelim:

```bash
sudo gpasswd sambashare -a paylas
sudo systemctl restart smb.service nmb.service
```

İşte bu kadar! Artık Windows paylaşımlarına Linux üzerinden erişim sağlayabilirsiniz. Detaylı videolu anlatım yakında geliyor! 😊



