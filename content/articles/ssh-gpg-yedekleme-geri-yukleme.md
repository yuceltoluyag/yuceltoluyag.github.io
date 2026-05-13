Title: SSH ve GPG Anahtarlarını Yedekleme ve Geri Yükleme  
Date: 2025-03-04 10:00 10:00
Modified: 2025-08-11 22:59
Category: Git  
Tags: ssh, gpg, anahtar yönetimi, yedekleme, güvenlik  
Slug: ssh-gpg-yedekleme-geri-yukleme  
Authors: yuceltoluyag  
Series: Git
Series_index: 3
Summary: SSH ve GPG anahtarlarınızı güvenli bir şekilde yedekleme ve geri yükleme adımlarını öğrenin. Kimlik doğrulama ve veri güvenliği için kritik olan bu anahtarları nasıl koruyacağınızı keşfedin.
Lang: tr
Translation: false
Status: published  
Template: article  
Image: images/ssh-gpg-yedekleme-geri-yukleme-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985374923504182
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrshibzbk27

## SSH ve GPG Anahtarlarını Yedekleme ve Geri Yükleme 🔑

SSH ve GPG anahtarları, kimlik doğrulama ve veri güvenliği açısından kritik öneme sahiptir. **Bu makalede, SSH ve GPG anahtarlarını nasıl yedekleyip geri yükleyebileceğinizi öğreneceksiniz.** 💾

## 1️⃣ Yedekleme

Öncelikle, **SSH özel ve genel anahtarlarınızı** güvenli bir yere yedekleyin.

**id_rsa ve id_rsa.pub dosyalarını USB belleğe kopyalayın:**

```bash
cp ~/.ssh/id_rsa ~/.ssh/id_rsa.pub /mnt/usb/
```

GPG anahtarınızı tanımlamak için aşağıdaki komutu çalıştırın:

```bash
gpg --list-secret-keys --keyid-format LONG
```

Çıktı şu şekilde görünecektir:

```plaintext
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
```

**Slash (/) işaretinden sonraki karakterler, özel anahtarınızın kimliğidir.** Bu ID'yi kullanarak özel anahtarınızı dışa aktarın:

```bash
gpg --export-secret-keys 3AA5C34371567BD2 > my-private-key.asc
```

Şimdi **my-private-key.asc** dosyasını USB belleğe kopyalayın:

```bash
cp my-private-key.asc /mnt/usb/
```

## 2️⃣ Geri Yükleme 🛠️

Eğer SSH ve GPG anahtarlarınızı yeni bir sisteme taşımanız gerekiyorsa, aşağıdaki adımları takip edin.

### 🔹 SSH Anahtarlarını Geri Yükleme

USB bellekte bulunan **id_rsa** ve **id_rsa.pub** dosyalarını **~/.ssh/** dizinine geri kopyalayın:

```bash
cp /mnt/usb/id_rsa /mnt/usb/id_rsa.pub ~/.ssh/
```

**Dosya izinlerini ve sahipliğini ayarlayın:**

```bash
chown user:user ~/.ssh/id_rsa*
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

**SSH Agent'ı başlatın:**

```bash
exec ssh-agent bash
```

**SSH özel anahtarınızı SSH Agent’a ekleyin:**

```bash
ssh-add ~/.ssh/id_rsa
```

### 🔹 GPG Anahtarlarını Geri Yükleme

GPG özel anahtarınızı içe aktarın:

```bash
gpg --import my-private-key.asc
```

## 🎯 Sonuç

Bu adımları takip ederek **SSH ve GPG anahtarlarınızı güvenli bir şekilde yedekleyebilir ve gerektiğinde geri yükleyebilirsiniz**. 🔒 Yedeklerinizi **güvenli bir ortamda** sakladığınızdan emin olun ve yetkisiz kişilerin erişimini engelleyin! 🚀
[responsive_img src="/images/ssh-gpg-yedekleme-geri-yukleme-xl.webp" alt="ssh-gpg-yedekleme-geri-yukleme" /]



