Title: Mounting and Unmounting Disks in Linux: Basic Information and Applications
Date: 2025-08-05 12:30
Modified: 2025-08-11 22:59
Category: Disk Yönetimi
Tags: linux, mount, unmount, disk, dosya-sistemi, sistem-yonetimi
Slug: linux-disk-mount-unmount-temel-bilgiler
Authors: yuceltoluyag
Status: published
Summary: We explain mounting and unmounting disks in Linux with basic concepts, commands and examples.
Series: Linux-disk
Series_index: 2
Template: article
Lang: en

## 💽 Mounting and Unmounting Disks in Linux: Basic Information

In Linux and Unix-like systems, disks are not accessed directly, but are connected to the file system tree through the **mount** operation. This allows access to data on the disk through specific folders. Disconnecting a disk after the operation is completed is called **unmount**.

So, how are disks mounted and unmounted in Linux? Which commands are used? In this article, you will learn these fundamental topics in detail and in an understandable way. 🚀

---

## 🧐 What is Mount?

Mount is the process of attaching a physical or virtual disk device, and the file system to the Linux directory tree. This makes the disk content visible and accessible under that directory (mount point).

For example, when you plug in a USB drive, the system connects it automatically or manually to directories like `/mnt/usb` or `/run/media/user/usb`.

---

## 📂 What is Mount Point?

Mount point is the folder where the content of the disk or file system will be accessed after mounting.

This directory must exist before the mount operation:

```bash
mkdir -p /mnt/mydisk
```

---

## 🛠️ Basic Usage of Mount Command

To mount a disk or file system, we use the following structure:

```bash
sudo mount <device> <mount_point>
```

Example:

```bash
sudo mount /dev/sdb1 /mnt/mydisk
```

This command mounts the file system on `/dev/sdb1` device to the `/mnt/mydisk` folder.

---

## 📀 Loop Mount: ISO and Disk Images

To mount file images like ISO, the `-o loop` option is required:

```bash
sudo mount -o loop file.iso /mnt/iso
```

This way, the content of the ISO file becomes accessible via `/mnt/iso`.

---

## 📴 Unmount Command to Disconnect

To remove a mounted disk or file system from the system, the `umount` command is used:

```bash
sudo umount <mount_point> or <device>
```

Example:

```bash
sudo umount /mnt/mydisk
```

Before unmounting, the disk should not be in use; otherwise, an error occurs.

---

## ⚠️ Importance of Mount and Unmount Operations

* **Data Security:** Removing a disk while in use can cause data loss, so unmount should be done first.
* **System Order:** Proper mounting and unmounting of file systems keeps the system stable.
* **Access Control:** File access is provided through mount point.
* **Multiple File Systems:** Linux can manage different file systems like ext4, ntfs, iso9660 simultaneously.

---

## 🔄 Automatic Mount and `udisksctl` Commands

Desktop environments like GNOME, KDE automatically mount USB and ISO files. Behind this, `udisks` services work.

For manual loop mount operation:

```bash
udisksctl loop-setup -f file.iso
udisksctl mount -b /dev/loopX
```

For manual unmount and removing loop device:

```bash
udisksctl unmount -b /dev/loopX
udisksctl loop-delete -b /dev/loopX
```

---

## 🔍 Viewing Mounted File Systems

* `mount` — Lists all connected file systems.
* `df -h` — Shows disk usage summary.
* `lsblk` — Shows block devices and mount points.

---

## 🎯 Practical Example: Mounting and Using ISO File

1. Create mount point:

```bash
mkdir ~/iso
```

2. Mount ISO file:

```bash
sudo mount -o loop game.iso ~/iso
```

3. Access files, unmount when done:

```bash
sudo umount ~/iso
```

---

## 📝 Conclusion

Mounting and unmounting disks in Linux are critical operations for safe and organized data management. Proper mount/unmount operations prevent data loss and ensure stable system operation.

Understanding these basic information for beginners will be a solid step in the Linux system administration journey. You can also share your experiences and questions in the comments! 👨‍💻✨

---