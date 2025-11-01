Title: Arch Linux'ta NTFS Nasıl Yapılandırılır
Date: 2020-07-05 12:00
Modified: 2025-08-11 22:59
Category: Disk Yönetimi
Tags: linux, ntfs
Slug: arch-linux-ntfs-yapilandirma
Authors: yuceltoluyag
Summary: Arch Linux'ta NTFS dosya sistemine sahip disklerin nasıl bağlanacağı ve yetki sorunlarının nasıl çözüleceği açıklanmaktadır.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/ntfs_yetki_hatasi-xl.webp
Series: Linux-disk
Series_index: 1

## Sorun Nedir? ⚠️

Linux'un varsayılan dosya sistemi **ext** (ext1, ext2, ext3, ext4) olduğundan, yeni bir sistem kurulduğunda NTFS formatındaki diskleri bağlamaya çalışırken **"failed to mount diskadı -> not authorized to perform operation"** hatasıyla karşılaşabilirsiniz. Daha modern bir dosya yöneticisi kullanıyorsanız, bağlanmak istediğinizde **parola** istemesi de olasıdır. Linux, diğer dosya sistemlerini tanır ancak işlem yapabilmek için yetkilendirme gerektirir.
[responsive_img src="/images/ntfs_yetki_hatasi-xl.webp" alt="NTFS Yetki Hatası" /]

---

## Çözüm 1️⃣: Yetkilendirme Ayarları

Terminali açarak aşağıdaki paketleri yükleyin:

```bash
sudo pacman -S gvfs ntfs-3g dosfstools
```

Ardından, aşağıdaki adımları uygulayın:

```bash
su
cd /usr/share/polkit-1/rules.d
touch 10-drives.rules
vim 10-drives.rules  # Nano veya başka bir editör de kullanabilirsiniz.
```

Açılan dosyanın içine aşağıdaki kodu ekleyin:

```bash
polkit.addRule(function(action, subject) {
    if (action.id.indexOf("org.freedesktop.udisks2.") == 0){
        return polkit.Result.YES;
    }
});
```

Eğer sisteminizde bu ayarlar etkinleşmezse, tekrar aşağıdaki komutu çalıştırarak güncellemeyi deneyebilirsiniz:

```bash
sudo pacman -S gvfs ntfs-3g dosfstools
```

Son olarak, kullanıcıyı **disk** grubuna ekleyin:

```bash
sudo gpasswd -a $USER disk
```

Bilgisayarınızı yeniden başlattığınızda, sorun çözülmüş olacaktır. 🚀

---

## Alternatif Çözüm 2️⃣: Manuel Bağlama

Takılı disklerin listesini ve UUID bilgilerini görmek için şu komutu çalıştırabilirsiniz:

```bash
sudo blkid
```

Bir NTFS diskini belirli bir klasöre bağlamak için:

```bash
sudo mkdir /mnt/ntfsdisk
```

```bash
sudo mount -t ntfs-3g /dev/sdXX /mnt/ntfsdisk
```

!!! tip "Disk Adı <b>sdXX</b> kısmına, `blkid` komutuyla bulduğunuz disk adını yazın (örneğin: sda1, sdb2 vb.)."

Bağlı diskten çıkmak isterseniz:

```bash
sudo umount /mnt/ntfsdisk
```

---

## Diskin Otomatik Bağlanması 🔄

Başlangıçta otomatik bağlanmasını istiyorsanız **fstab** dosyanızı düzenlemelisiniz:

```bash
sudo vim /etc/fstab  # Nano veya başka bir editör de kullanabilirsiniz.
```

Dosyanın en altına şu satırı ekleyin:

```bash
/dev/sdXX /mnt/ntfsdisk ntfs-3g uid=kullaniciadiniz,gid=users,umask=0022 0 0
```

Bilgisayarınızı yeniden başlattığınızda, disk otomatik olarak bağlanacaktır. 🚀

---

## Daha Fazla Bilgi 📚

Daha detaylı bilgi için [Arch Linux NTFS-3G Wiki](https://wiki.archlinux.org/index.php/NTFS-3G){: target="\_blank" rel="noopener noreferrer"} sayfasına göz atabilirsiniz. 💡
