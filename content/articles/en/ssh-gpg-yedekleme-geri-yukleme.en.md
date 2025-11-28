Title: Backing Up and Restoring SSH and GPG Keys
Date: 2025-03-04 10:00 10:00
Modified: 2025-08-11 22:59
Category: Git
Tags: ssh, gpg, key management, backup, security
Slug: ssh-gpg-yedekleme-geri-yukleme
Authors: yuceltoluyag
Series: Git
Series_index: 3
Summary: Learn how to securely backup and restore SSH and GPG keys.
Status: published
Template: article
Image: images/ssh-gpg-yedekleme-geri-yukleme-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114985374923504182
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrshibzbk27

## Backing Up and Restoring SSH and GPG Keys 🔑

SSH and GPG keys are critical for authentication and data security. **In this article, you will learn how to backup and restore SSH and GPG keys.** 💾

## 1️⃣ Backup

First, backup your **SSH private and public keys** to a safe location.

**Copy id_rsa and id_rsa.pub files to USB drive:**

```bash
cp ~/.ssh/id_rsa ~/.ssh/id_rsa.pub /mnt/usb/
```

Run the following command to identify your GPG key:

```bash
gpg --list-secret-keys --keyid-format LONG
```

The output will look like this:

```plaintext
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
```

**The characters after the slash (/) are the ID of your private key.** Use this ID to export your private key:

```bash
gpg --export-secret-keys 3AA5C34371567BD2 > my-private-key.asc
```

Now copy the **my-private-key.asc** file to USB drive:

```bash
cp my-private-key.asc /mnt/usb/
```

## 2️⃣ Restore 🛠️

If you need to transfer your SSH and GPG keys to a new system, follow the steps below.

### 🔹 Restoring SSH Keys

Copy the **id_rsa** and **id_rsa.pub** files from USB drive to **~/.ssh/** directory:

```bash
cp /mnt/usb/id_rsa /mnt/usb/id_rsa.pub ~/.ssh/
```

**Set file permissions and ownership:**

```bash
chown user:user ~/.ssh/id_rsa*
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

**Start SSH Agent:**

```bash
exec ssh-agent bash
```

**Add your SSH private key to SSH Agent:**

```bash
ssh-add ~/.ssh/id_rsa
```

### 🔹 Restoring GPG Keys

Import your GPG private key:

```bash
gpg --import my-private-key.asc
```

## 🎯 Conclusion

By following these steps, you can **securely backup and restore your SSH and GPG keys when needed**. 🔒 Make sure to store your backups in a **secure environment** and prevent unauthorized access! 🚀
[responsive_img src="/images/ssh-gpg-yedekleme-geri-yukleme-xl.webp" alt="ssh-gpg-backup-restore" /]
