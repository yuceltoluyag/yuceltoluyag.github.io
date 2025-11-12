Title: Guide to Booting ISO from a USB Stick
Date: 2025-11-11 17:00
Category: Linux
Tags: iso, usb, önyükleme, el-torito, rehber, windows10, windows11, format, uefi
Slug: usb-bellekten-iso-onyukleme-rehberi
Summary: If you want to make an ISO file bootable by correctly writing it to a USB drive, this guide will walk you through it step by step.
Image: images/usb-bellekten-iso-onyukleme-rehberi-xl.webp
Lang: en
Status: published

Creating a bootable USB drive is a fundamental skill for both IT professionals and tech enthusiasts.
In this article, you will learn step-by-step how to create a **Windows bootable USB drive** on Linux using only terminal commands.
Whether you are setting up a new system, repairing an existing one, or just need a reliable portable installer—this guide is for you.

We will cover each step individually: from preparing your USB drive and partitioning it, to writing the Windows ISO file to the USB, all done directly with terminal commands.

## The Difference Between Linux ISOHybrid and Windows ISO

When creating a bootable USB drive, it is crucial to understand the differences between **Linux ISOHybrid images** and **Windows ISO images**.
Although both serve as installation media, their design, functionality, and use cases differ. These differences affect how the images interact with USB drives and how tools like `dd` or specialized utilities should be used.

This distinction becomes particularly important when **creating a Windows bootable USB in a Linux environment**, as this process often requires more steps than working with a Linux ISOHybrid.
Let's now delve into the details to better understand these formats and their impact on the process of creating a bootable USB.

This context will help you understand the specific challenges and solutions encountered when working with a Windows ISO on Linux.

### What is a Hybrid ISO?

A Hybrid ISO is a special type of ISO that can function both as a classic optical disc (CD/DVD) image and as a **bootable image** on devices like USB drives.
Traditionally, ISO files are designed to be written to a CD or DVD. Hybrid ISOs extend this functionality; the same file can be written directly to a USB drive **without any additional modifications** and become bootable.

This dual functionality is possible because it includes both the ISO9660 file system for CD/DVD compatibility and an **MBR (Master Boot Record)** structure that provides USB boot support.

### How to Tell if an ISO is Hybrid

You can use the following methods to determine if an ISO is hybrid:

1. **Check with the `file` Command**

The `file` command provides information about the structure of the ISO:

```bash
file path/to/image.iso
```

For a hybrid ISO, the output usually includes the phrase "(DOS/MBR boot sector)".

2. **Examine the MBR with `fdisk`**

Hybrid ISOs contain an MBR to support booting from USB. You can check this with `fdisk`:

```bash
fdisk -l path/to/image.iso
```

If you see bootable partition information (e.g., a single partition), the ISO is likely hybrid.
For a non-hybrid ISO, partition details will not be displayed.

3. **Check the El Torito Boot Record**

Hybrid ISOs use the **El Torito**[^El-Torito] standard. You can verify this with the `xorriso` tool:

```bash
xorriso -indev path/to/image.iso
```

If the output under the `Boot record` section contains information about the bootloader and partition table, the ISO is bootable.

---

## Requirements

Before starting the process, make sure you have the following ready:

1. **Windows ISO file:**
   Download the official ISO file from the [Microsoft website](https://www.microsoft.com/en-us/windows/?r=1){: target="\_blank" rel="noopener noreferrer"}.

2. **USB drive:**
   It should have at least 8 GB of free space. Back up any important data as all content will be erased.

3. **Linux terminal access:**
   All commands will be run through the terminal.

---

## Step 1: Identify Your USB Drive

Plug in your USB drive and open the terminal. Run the following command to determine the device name:

```bash
lsblk
```

In the output, you will typically see a name like `/dev/sdX`.
The letter `X` represents the drive letter—carefully note the correct drive.

---

## Step 2: Partition the USB Drive

Before formatting, you need to create the necessary partitions on the USB drive. Use the `fdisk` tool for this.

!!! tip "To avoid errors during partitioning and formatting, unmount any existing partitions on the USB beforehand:"

```bash
sudo umount /dev/sdX*
```

- Replace `/dev/sdX*` with the appropriate partitions of your USB drive.

1. Start the `fdisk` tool:

```bash
sudo fdisk /dev/sdX
```

2. Follow these steps within `fdisk`:

- Press `g` to create a new **GPT** partition table.
- Press `n` to add a new partition.
- Press `p` to create a primary partition.
- Create the first partition, leaving a small amount of space for the boot partition (about 1 MB is sufficient).
- Allocate the remaining space for the second partition.

!!! note "In a Windows environment, the operating system on removable drives typically recognizes **only the first primary partition**. Therefore, the data partition that will be accessible by Windows should be the **first**, and the boot partition containing system files should be the **second**."

3. Set the file system type to `Microsoft basic data`:

- Press `t` and select type number `11` for both partitions.

4. Set the bootable flag:

- Press `x`.
- Press `A` to select the partition to be made bootable.

5. Save changes and exit:

- Press `r` to exit expert mode.
- Press `w`.

---

## Step 3: Format the USB Drive

Use **NTFS** for the data partition and **FAT32** for the boot partition.

**For NTFS:**

```bash
sudo mkfs.ntfs -f /dev/sdX1
```

**For FAT32:**

```bash
sudo mkfs.vfat -F 32 /dev/sdX2
```

Replace `/dev/sdX1` and `/dev/sdX2` with the correct partitions.

---

## Step 4: Copy Windows ISO Files to the USB

Mount the ISO file and the USB drive, then copy the contents:

1. **Create mount points:**

```bash
sudo mkdir /mnt/iso
sudo mkdir /mnt/drive
```

2. **Mount the ISO:**

```bash
sudo mount -o loop /path/to/your.iso /mnt/iso
sudo mount /dev/sdX1 /mnt/drive
```

3. **Copy the files:**

```bash
sudo cp -r /mnt/iso/* /mnt/drive
```

!!! note "This process can take up to 10 minutes depending on your USB speed."

4. **Unmount the ISO:**

```bash
sudo umount /mnt/iso
sudo rmdir /mnt/iso
```

---

## Step 5: Write the Rufus Boot Image

First, download the boot image from the Rufus[^Rufus] repository:

```bash
wget https://github.com/pbatard/rufus/raw/master/res/uefi/uefi-ntfs.img
```

Use the `dd` command to write the downloaded `uefi-ntfs.img` file to the USB:

```bash
sudo dd if=/path/to/uefi-ntfs.img of=/dev/sdX2 bs=1M status=progress
```

!!! danger "Critical Warning; Replace `/dev/sdX2` with the correct drive name. If you enter the wrong device name, important data, including your system disk, could be erased!"

---

## Step 6: Install the Bootloader

We will use `grub` to install the bootloader. The command may vary depending on your distribution.

!!! note "Note for Debian/Ubuntu Users"
If the `grub2-install` command is not found, your system might be using `grub-install`. Also, the `grub-pc` package may need to be installed for the `i386-pc` target.
To install: `sudo apt-get install grub-pc`

Install the bootloader using the `grub2-install` (or `grub-install`) command:

```bash
sudo grub2-install --target=i386-pc --boot-directory=/mnt/drive --force /dev/sdX
```

- `--boot-directory=/mnt/drive`: The mount point of the USB's Windows data partition (see Step 4).
- `/dev/sdX`: The USB device itself.

!!! warning "Attention! Double-check the drive name before running the command."

---

## Step 7: Test the Bootable USB

Plug the USB into the target system and set **USB as the priority boot device** in the BIOS/UEFI settings.
If necessary, disable the **Secure Boot** option.

---

## Common Issues and Solutions

- **Bootloader Errors:**
  If the USB does not boot, the ISO may require additional configuration.

- **Permission Errors:**
  Always run commands with `sudo`.

- **Corrupt ISO File:**
  To verify the integrity of the ISO, use this command:

```bash
sha256sum /path/to/windows.iso
```

Compare the output with the official SHA256 value.

---

## Conclusion

By following these steps, you can easily create a **Windows bootable USB** on Linux using only terminal commands.
This method should always be at your fingertips for new installations, system repairs, or emergencies.

Happy booting! 💻

---

## Resources

[^El-Torito]: [https://en.wikipedia.org/wiki/ISO_9660#El_Torito](https://en.wikipedia.org/wiki/ISO_9660#El_Torito){: target="\_blank" rel="noopener noreferrer"}
[^Rufus]: [https://rufus.ie/en/](https://rufus.ie/en/){: target="\_blank" rel="noopener noreferrer"}

- For more information, you can check out the [guide on creating a UEFI-supported Windows 10 USB on Linux](/linux-uefi-windows10-usb/).

[responsive_img src="/images/usb-bellekten-iso-onyukleme-rehberi-xl.webp" alt="Guide to Booting ISO from a USB Stick" /]
