Title: Creating UEFI Windows 10 Format USB on Linux - Illustrated Guide
Date: 2018-09-14 12:45 10:00
Modified: 2025-08-11 22:59
Category: Linux
Tags: linux, windows10, usb, format, uefi
Slug: linux-uefi-windows10-usb
Authors: yuceltoluyag
Summary: How to create a UEFI supported Windows 10 format USB on Linux? You can find the step by step illustrated explanation with WoeUSB tool in this article.
Status: published
Template: article
Image: images/linux_windows10_uefi_format-xl.webp
Lang: en

## Creating UEFI Windows 10 Format USB on Linux

While transitioning from Windows to Linux, creating a format USB with programs like Rufus is quite easy. However, Rufus often doesn't work properly on Linux even when using Wine. Fortunately, there are various applications available on Linux side. One of them is **WoeUSB**. In this guide, we'll explain how to create a UEFI supported Windows 10 format USB with WoeUSB.

---

## 1. Preparation

Firstly, you should have the following requirements:

- **Windows 10 ISO file:** If you don't have it, you can download it from [the official Microsoft site](https://www.microsoft.com/tr-tr/software-download/windows10){: target="\_blank" rel="noopener noreferrer"}.
- **WoeUSB program:** You can install WoeUSB with the following commands:

```bash
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install woeusb
```

## 2. Formatting the USB Disk

To prepare our USB disk, let's follow these steps:

1. **Format your USB disk.**
2. **Select NTFS as format.** (If you use FAT32, you may get errors with large files.)

[responsive_img src="/images/linux_windows10_uefi_format-xl.webp" alt="USB Formatting" /]

If you format the USB with wrong format, you may encounter an error like below:

[responsive_img src="/images/linux_windows10_uefi_format_error-xl.webp" alt="Format Error" /]

## 3. Using WoeUSB

Open WoeUSB and follow these steps:

1. **Select your ISO file.**
2. **Select your USB disk.**
3. **Start the process by pressing the Start button.**

[responsive_img src="/images/linux_windows10_uefi_disk-xl.webp" alt="WoeUSB Interface" /]

## 4. Booting from USB

After the process is complete, restart your computer and **boot with USB disk from BIOS/UEFI settings.**

[responsive_img src="/images/linux_windows10_uefi_boot-xl.webp" alt="Boot Screen" /]

## 5. Conclusion

As you can see, we created a UEFI supported Windows 10 format USB through Linux. If you're new to Linux, instead of making a sudden complete transition, using a dual operating system for a gradual transition may be better. **For more information, you can read this article:** [Linux for Beginners](/yeni-baslayanlar-linux-surumu/){: target="\_blank" rel="noopener noreferrer"}

If you have questions or errors you received during installation, you can leave a comment. Good work!
