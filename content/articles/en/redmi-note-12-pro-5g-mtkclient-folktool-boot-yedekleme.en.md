Title: Redmi Note 12 Pro 5G Rooting: MTKClient and FolkTool
Date: 2026-11-08
Category: Sorun Giderme
Tags: Android, Root, Xiaomi, Redmi Note 12 Pro 5G, MTKClient, FolkTool, Fastboot, crDroid
Slug: redmi-note-12-pro-5g-mtkclient-folktool-root
Authors: yuceltoluyag
Status: published
Summary: I backed up the original boot partitions on my Xiaomi Redmi Note 12 Pro 5G (ruby) with MTKClient. Then I patched the boot image with FolkTool 1.7.1 and flashed it through Fastboot. This guide covers the actual steps I took, including checking the slot with ADB and verifying root access.
Template: article
Lang: en
Translation: false
Series: 12 Pro 5G
Series_index: 3

While using crDroid on my Redmi Note 12 Pro 5G, I wanted to keep root access under my own control as well. To do that, I backed up the device's original boot partitions with MTKClient, then patched the boot image with FolkTool and flashed it to the phone through Fastboot.

I paid particular attention to the A/B partition layout during this process because the device has two separate boot partitions, `boot_a` and `boot_b`. To avoid using the wrong image or working on the wrong slot, I first inspected the partition table, then backed up both images separately.

I previously described the steps I followed to install crDroid on my device in the [Redmi Note 12 Pro 5G crDroid installation guide](/en/redmi-note-12-pro-5g-crdroid-kurulum-rehberi/). This article covers rooting after installing the ROM.

## Device and tools I used

I performed this procedure on a Xiaomi Redmi Note 12 Pro 5G (`ruby`).

| Component | Tool / information used |
|---|---|
| Device | Redmi Note 12 Pro 5G |
| Codename | `ruby` |
| Boot partition layout | A/B |
| Partition backup | MTKClient |
| Boot patching | FolkTool 1.7.1 |
| Device communication | ADB and Fastboot |
| Computer side | Windows and Linux terminal |

Links to the projects I used:

- [MTKClient GitHub repository](https://github.com/bkerler/mtkclient){: target="_blank" rel="noopener noreferrer"}
- [FolkTool GitHub repository](https://github.com/LyraVoid/FolkTool){: target="_blank" rel="noopener noreferrer"}
- [FolkTool 1.7.1 release page](https://github.com/LyraVoid/FolkTool/releases/tag/1.7.1){: target="_blank" rel="noopener noreferrer"}

The FolkTool 1.7.1 release notes mention the KernelPatch 0.13.3 adaptation and the process of obtaining root through FolkPatch/APatch. I used this version to patch the boot image.

!!! warning "Warning! Modifying the boot image is risky."
    A wrong or incompatible boot image can prevent the phone from starting. Back up the original images before you begin. Do not share device-specific partition backups on public platforms.

## 1. Viewing the partition table with MTKClient

First, I viewed the device's partition table through MTKClient:

```bash
python mtk.py printgpt
```

The command listed the partitions on the device. What stood out was that there were two partitions, `boot_a` and `boot_b`, instead of a single `boot` partition. The `vendor_boot_a` and `vendor_boot_b` partitions were also listed.

This layout showed that the device used an A/B partition scheme. So, rather than backing up just one boot image, I decided to save both slots as separate files.

## 2. Backing up the original partitions

Before patching, I copied the original files to my computer. I gathered the backups in a folder named `IMEI_Yedek`.

These are the backups I made:

| Partition | Backup file |
|---|---|
| `misc` | `misc_backup.bin` |
| `nvcfg` | `nvcfg_backup.bin` |
| `nvdata` | `nvdata_backup.bin` |
| `nvram` | `nvram_backup.bin` |
| `proinfo` | `proinfo_backup.bin` |
| `protect1` | `protect1_backup.bin` |
| `protect2` | `protect2_backup.bin` |
| `preloader` | `preloader_ruby.bin` |
| `boot_a` | `boot_a.img` |
| `boot_b` | `boot_b.img` |

The command I used to back up the boot partitions:

```bash
python mtk.py r boot_a,boot_b .\IMEI_Yedek\boot_a.img,.\IMEI_Yedek\boot_b.img
```

The operation completed successfully. Both boot images were 128 MiB.

I backed up the preloader with this command:

```bash
python mtk.py dumppreloader
```

At this stage, I did not write to or erase any partition with MTKClient. I only viewed the partition table and made backups.

!!! warning "Keep device-specific backups safe."
    Partitions such as `nvram`, `nvdata`, and `nvcfg` may contain sensitive data specific to your device. Do not upload these files to public repositories such as GitHub. Keep the backups somewhere secure.

For MTKClient commands and other usage examples, see the [project's usage documentation](https://github.com/bkerler/mtkclient/blob/main/README-USAGE.md){: target="_blank" rel="noopener noreferrer"}.

## 3. Checking the active boot slot

After completing the backups, I checked with ADB which slot the device was booted from:

```bash
adb shell getprop ro.boot.slot_suffix
```

Output:

```text
_a
```

That meant the device was running from slot A.

This was important because the file I selected for patching would be `boot_a.img`. I first made sure I had backed up the correct image, then gave that file to FolkTool.

## 4. Patching the boot image with FolkTool 1.7.1

After opening FolkTool, I selected the `boot_a.img` file backed up with MTKClient as the input file.

The source file used in the operation log appeared at this location:

```text
C:\Users\baba\Desktop\Work\mtkclient\IMEI_Yedek\boot_a.img
```

FolkTool unpacked the kernel, detected the GZIP-format kernel, and patched it. It then repackaged the image.

The log included these messages:

```text
Kernel patched successfully
Patch complete
```

The file it created:

```text
C:\Users\baba\Documents\FolkTool\patched\boot_patched_2026-10-24 21-46-46.img
```

According to the FolkTool log, the created image was 128 MiB.

The important point here is that the source for the patch was the original `boot_a.img` I had taken directly from the device. This meant I did not use an image taken from another firmware package whose compatibility with the software currently on the device was uncertain.

## 5. Flashing the patched image with Fastboot

After patching was complete, FolkTool put the device into Fastboot mode and flashed the image it had created to the phone.

The command used in the log was:

```bash
fastboot flash boot "C:\Users\baba\Documents\FolkTool\patched\boot_patched_2026-10-24 21-46-46.img"
```

The tool reported that the flash operation had completed:

```text
Flash completed successfully
Flash successful
fastboot reboot
Device rebooted successfully
One-click flash completed!
```

The phone restarted and Android booted normally.

However, I also wanted to verify which slot the operation had written to, because the command explicitly said `boot`, not `boot_a`.

### Verifying the Fastboot target slot

After the phone started, I used ADB to put the device back into Fastboot mode:

```bash
adb reboot bootloader
```

Then I ran these commands:

```bash
fastboot getvar current-slot
fastboot getvar has-slot:boot
```

Outputs:

```text
current-slot: a
Finished. Total time: 0.000s

has-slot:boot: yes
Finished. Total time: 0.000s
```

These results confirmed that slot A was active and that the `boot` partition supported slots.

In Android's A/B system, Fastboot targets the currently active slot unless another slot is explicitly specified. Therefore, considering the device's slot information, the `fastboot flash boot` command in the operation log targeted the `boot_a` partition.

For details about this behavior, see the [Android Open Source Project A/B system documentation](https://source.android.com/docs/core/ota/ab/ab_implement){: target="_blank" rel="noopener noreferrer"}.

After checking, I restarted the device:

```bash
fastboot reboot
```

The phone returned to Android normally.

## 6. Verifying root access through ADB

After the phone started, I wanted to check root access.

First, I connected to the ADB shell:

```bash
adb shell
```

Then:

```sh
su
```

On my first attempt, I did not get the result I expected and saw this error:

```text
/system/bin/sh: su: inaccessible or not found
```

On a later check, the `su` command worked and the terminal prompt switched to a root shell:

```text
ruby:/ $
ruby:/ #
```

Still, rather than relying only on the changed prompt, I queried the root identity directly. For that, I ran this command in the computer's terminal:

```bash
adb shell su -c id
```

Output:

```text
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

The `uid=0(root)` value clearly shows that the command ran with root privileges. This way, I did not rely only on FolkTool reporting a successful flash; I verified root access directly on the device.

!!! tip "Tip: Don't confuse the ADB shell with the root shell."
    The `adb shell id` command shows the identity of a regular ADB session. For me, that command returned `uid=2000(shell)`. Using `adb shell su -c id` provides a more direct root check. A successful result should show `uid=0(root)`.

I cannot determine from the available output exactly why the first `su` attempt failed. So rather than attribute a cause to that error, I rely on the later successful check.

## Conclusion

I completed the rooting process on my Xiaomi Redmi Note 12 Pro 5G (`ruby`) using MTKClient and FolkTool 1.7.1.

First, I viewed the partition table with MTKClient and backed up the `boot_a` and `boot_b` images. Then I patched `boot_a.img` with FolkTool and flashed the resulting image to the device through Fastboot.

After the operation, the phone booted normally. Fastboot checks showed that slot A was active and that the boot partition supported slots. Finally, the `adb shell su -c id` command returned `uid=0(root)`.

The most important things for me in this process were backing up the original images before the operation and verifying the result directly on the device afterward. A tool reporting "Flash successful" does not, by itself, prove that root access is working.

I also covered another issue I encountered while using crDroid on the Redmi Note 12 Pro 5G. I described my experience with the e-Devlet app's NFC access and MIUI permission controls in my article about the [e-Devlet NFC issue and MIUI permission problem on crDroid](/en/crdroid-e-devlet-nfc-miui-izin-sorunu/).

If you're considering a similar procedure, don't skip the backup step. Especially on devices with an A/B partition layout, you need to use the correct image, check the target slot, and actually verify root access.

## Sources

- [MTKClient GitHub repository](https://github.com/bkerler/mtkclient){: target="_blank" rel="noopener noreferrer"}
- [MTKClient usage documentation](https://github.com/bkerler/mtkclient/blob/main/README-USAGE.md){: target="_blank" rel="noopener noreferrer"}
- [FolkTool GitHub repository](https://github.com/LyraVoid/FolkTool){: target="_blank" rel="noopener noreferrer"}
- [FolkTool 1.7.1 release and change notes](https://github.com/LyraVoid/FolkTool/releases/tag/1.7.1){: target="_blank" rel="noopener noreferrer"}
