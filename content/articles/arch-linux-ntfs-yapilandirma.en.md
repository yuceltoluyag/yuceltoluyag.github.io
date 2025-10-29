Title: How to Configure NTFS in Arch Linux
Date: 2020-07-05 12:00
Modified: 2025-08-11 22:59
Category: Disk Yönetimi
Tags: linux, ntfs
Slug: arch-linux-ntfs-yapilandirma
Authors: yuceltoluyag
Summary: Explains how to mount disks with NTFS file system in Arch Linux and how to resolve permission issues.
Translation: true
Status: published
Template: article
Image: images/ntfs_yetki_hatasi-xl.webp
Lang: en
Series: Linux-disk
Series_index: 1

## What is the Problem? ⚠️

Since Linux's default file system is **ext** (ext1, ext2, ext3, ext4), when setting up a new system, you may encounter the error **"failed to mount diskadı -> not authorized to perform operation"** when trying to mount NTFS formatted disks. If you're using a more modern file manager, it might also ask for a **password** when you try to connect. Linux recognizes other file systems but requires authorization to perform operations.

[responsive_img src="/images/ntfs_yetki_hatasi-xl.webp" alt="NTFS Permission Error" /]

---

## Solution 1️⃣: Authorization Settings

Open the terminal and install the following packages:

```bash
sudo pacman -S gvfs ntfs-3g dosfstools
```

Then, follow these steps:

```bash
su
cd /usr/share/polkit-1/rules.d
touch 10-drives.rules
vim 10-drives.rules  # You can also use Nano or another editor
```

Add the following code to the opened file:

```javascript
polkit.addRule(function (action, subject) {
  if (action.id.indexOf("org.freedesktop.udisks2.") == 0) {
    return polkit.Result.YES;
  }
});
```

If these settings don't take effect on your system, you can try running the update again with the following command:

```bash
sudo pacman -S gvfs ntfs-3g dosfstools
```

Finally, add the user to the **disk** group:

```bash
sudo gpasswd -a $USER disk
```

After restarting your computer, the problem will be solved. 🚀

---

## Alternative Solution 2️⃣: Manual Mounting

To see the list of connected disks and their UUID information, you can run the following command:

```bash
sudo blkid
```

To mount an NTFS disk to a specific folder:

```bash
sudo mkdir /mnt/ntfsdisk
```

```bash
sudo mount -t ntfs-3g /dev/sdXX /mnt/ntfsdisk
```

!!! tip "For the <b>sdXX</b> disk name, write the disk name you found with the `blkid` command (for example: sda1, sdb2, etc.)."

If you want to unmount the disk:

```bash
sudo umount /mnt/ntfsdisk
```

---

## Automatic Mounting of Disk 🔄

If you want the disk to be automatically mounted at startup, you need to edit your **fstab** file:

```bash
sudo vim /etc/fstab  # You can also use Nano or another editor
```

Add the following line at the bottom of the file:

```
/dev/sdXX /mnt/ntfsdisk ntfs-3g uid=username,gid=users,umask=0022 0 0
```

When you restart your computer, the disk will be automatically mounted. 🚀

---

## More Information 📚

For more detailed information, you can check the [Arch Linux NTFS-3G Wiki](https://wiki.archlinux.org/index.php/NTFS-3G){: target="\_blank" rel="noopener noreferrer"} page. 💡
