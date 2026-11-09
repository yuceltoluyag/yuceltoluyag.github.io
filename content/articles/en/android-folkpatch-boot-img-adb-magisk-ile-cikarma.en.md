Title: Extracting boot.img on Android for FolkPatch with ADB and Magisk
Date: 2026-11-07 04:26
Modified: 2026-11-07 04:26
Category: Sorun Giderme
Tags: android, folkpatch, boot.img, adb, magisk, root, android boot imajı, A/B partition, boot_a, boot_b, dd, permission denied, kernelpatch
Slug: android-folkpatch-boot-img-adb-magisk-ile-cikarma
Authors: yuceltoluyag
Lang: en
Translation: false
Status: published
Summary: We explain how to transfer the original boot.img file from an Android device to a computer using ADB and Magisk root for a FolkPatch installation. The steps for identifying the active slot in an A/B partition layout, resolving the Permission denied error, extracting the boot image with the dd command, and backing up the original file are explained with real terminal output.
Template: article
Series: 12 Pro 5G
Series_index: 2

If you want to install FolkPatch on your Android device, one of the first files you need is the original `boot.img` image. You can obtain this file from the manufacturer's official firmware package or transfer it directly from your phone's boot partition to your computer.

FolkPatch's official guide shows how to extract a boot image over ADB. However, there is a small problem: the standard `adb pull` command may not be sufficient on every device. In particular, when root permission is required to read the boot partition, a different method is needed.

In this article, I explain how to extract the `boot.img` file from an Android device connected over ADB, how to identify the active slot in an A/B partition layout, and how to transfer the file to a computer using root access.

## Required tools and prerequisites

Before starting, make sure you have the following:

- ADB and Fastboot tools.
- An Android phone with USB debugging enabled.
- A working ADB connection on the computer.
- Root access that can read the boot partition, or an official firmware package suitable for the device.
- Enough free space on the computer to store the original boot image.

**Important:** Root access, an unlocked bootloader, and FolkPatch compatibility are separate matters. Before using FolkPatch, you should also check your device's KernelPatch compatibility.

## 1\. Checking the Android device with ADB

First, let's check that the phone is properly connected to the computer.

Open a terminal and run this command:



```bash
adb devices
```

When the connection is successful, you will see output similar to this:



```bash
List of devices attached
79orfygmgecmw84t        device
```

The appearance of `device` here indicates that the ADB connection has been established.

If you see `unauthorized`, you need to approve the USB debugging permission request on your phone's screen.

## 2\. Finding out the boot partition layout

Some modern Android phones use an A/B partition system. In this system, there may be two separate copies of the boot image:

- `boot_a`
- `boot_b`

First, let's list the boot partitions on our device:



```bash
adb shell ls -l /dev/block/by-name/ | grep boot
```

The actual terminal output we got during the process:



```bash
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_a -> /dev/block/sdc32
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_b -> /dev/block/sdc56
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 boot_para -> /dev/block/sdc42
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 vendor_boot_a -> /dev/block/sdc34
lrwxrwxrwx 1 root root 16 2026-11-05 16:55 vendor_boot_b -> /dev/block/sdc58
```

According to this output, the device has boot partitions for both the A and B slots.

There is an important detail here: the `vendor_boot` and `boot_para` partitions are also listed. However, the file we need for FolkPatch is `boot.img`. We should not use `vendor_boot` or `init_boot` in its place.

## 3\. Identifying the active slot

To find out which boot partition we should use, run this command:



```bash
adb shell getprop ro.boot.slot_suffix
```

Terminal output:



```text
_a
```

This result shows that Android is using slot A in the current session.

Therefore, the partition we will extract is:



```bash
/dev/block/by-name/boot_a
```

Remember that slots in an A/B system may contain different images. Therefore, choosing a boot partition at random without checking the active slot is not recommended.

## 4\. Trying to extract boot.img using the standard ADB method

FolkPatch's official guide recommends this command to obtain the boot image:



```bash
adb pull /dev/block/by-name/boot ./boot.img
```

However, when we used this method directly on our device, we encountered a permission error.

First, we tried to pull the active slot's partition:



```bash
adb pull /dev/block/by-name/boot_a ~/boot.img
```

The error we got:



```bash
adb: error: failed to stat remote object
'/dev/block/by-name/boot_a': Permission denied
```

The problem here is not the ADB connection. Although the device is connected, the regular ADB shell does not have permission to read the boot partition.

In this case, if we have root access, we can use another method.

## 5\. Checking root access

Since our phone has Magisk, we check root access:



```bash
adb shell su -c "id"
```

The output we got:



```bash
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

The `uid=0(root)` part shows that we can run commands with root privileges.

We can now read the boot partition and copy it to the phone's storage.

**Note:** This method is for devices with `su` access through Magisk or another root solution. This command will not work on phones without root access.

## 6\. Extracting the boot.img file with root access

Now we'll read the `boot_a` partition, which is the active slot.

The command we'll use:



```bash
adb shell su -c "dd if=/dev/block/by-name/boot_a of=/sdcard/boot.img"
```

Let's explain what the command does:

- `adb shell`: Accesses the phone's command line.
- `su -c`: Runs the command with root privileges.
- `dd`: Reads raw data from a source and writes it to a destination.
- `if=`: Specifies the source partition to read.
- `of=`: Specifies the location of the file to be created.

In our case, the source is `boot_a`, and the destination is `/sdcard/boot.img` on the phone's internal storage.

The output from our successful operation:



```bash
262144+0 records in
262144+0 records out
134217728 bytes (128 M) copied, 0.566 s, 226 M/s
```

This output shows that 134,217,728 bytes of data were read and written to the destination file.

In other words, a 128 MiB boot image was created.

## 7\. Transferring the boot.img file to the computer

The boot image is now in the phone's storage.

Now we'll transfer it to our computer using ADB:



```bash
adb pull /sdcard/boot.img ~/boot.img
```

The actual output of the successful transfer:



```bash
/sdcard/boot.img: 1 file pulled, 0 skipped.
42.2 MB/s (134217728 bytes in 3.032s)
```

The process is complete. The original boot image is now in our Linux home directory.

File location:


```bash
~/boot.img
```

## 8\. Backing up the original boot.img file

I recommend that you do not skip this step.

The boot image is an important system file used during the device's startup process. Using an incorrect or incompatible image can prevent the device from booting.

First, check that the file exists on the computer:



```bash
ls -lh ~/boot.img
```

Then create a second copy of the original file:



```bash
cp ~/boot.img ~/boot_original_backup.img
```

You can also save the SHA-256 value so that you can check the file's integrity later:



```bash
sha256sum ~/boot.img
```

At this point, we will have two separate files:



```bash
~/boot.img
~/boot_original_backup.img
```

It is safer to perform the patching on the working copy rather than on the original backup.

## 9\. Preparing boot.img for FolkPatch

The boot image is now on our computer. Next, we'll patch it using FolkPatch Manager.

The basic sequence of steps in FolkPatch's official guide is as follows:

1. Install the FolkPatch Manager app on your phone.
2. Open the app.
3. Go to the patch option in the upper-right corner.
4. Choose the `Select a boot image and patch` option.
5. Select the `boot.img` file you prepared.
6. Wait for the patching process to finish.

After patching is complete, do not overwrite the original file with the resulting file. Save it under a separate name.

**Important:** FolkPatch patches the `boot` partition. Selecting an `init_boot` or `vendor_boot` image is not the right thing to do. The official guide also gives a clear warning about this.

## Common issues

### Permission denied error



```bash
adb: error: failed to stat remote object
Permission denied
```

**Cause:** The regular ADB shell does not have permission to read the boot partition.

**Solution:** If you have root access, you can use the `dd` method with `su -c`. If you do not have root, you can extract the boot image from the official firmware package for your device.

### ADB does not detect the device



```text
List of devices attached
```

If the device list is empty, check the USB connection, the USB debugging setting, and the ADB installation on the computer.

### Selecting the wrong slot

If your device has `boot_a` and `boot_b`, run this command to find out the active slot:



```bash
adb shell getprop ro.boot.slot_suffix
```

Select the appropriate partition according to the result. Do not assume that the other slot's image is identical or up to date.

## Conclusion

In this process, we examined the Android device's A/B partition layout, identified the active slot, and got around the `Permission denied` error encountered when transferring with standard ADB by using `dd` with root access.

As a result, we transferred the original 128 MiB `boot_a` image to our computer.

Keeping the original boot image before installing FolkPatch is important so you have a way to recover in case of potential boot issues. Rather than rushing through root operations, make sure that the correct partition has been selected and that the backup file is intact.

---

## Sources

- [FolkPatch – Install / Use: Get Necessary Files](<https://fp.mysqil.com/en/guide/get-started/>)
- Android Open Source Project – A/B System Updates
- Android Open Source Project – Implement A/B Updates
