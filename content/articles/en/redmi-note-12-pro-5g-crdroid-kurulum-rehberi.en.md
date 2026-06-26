Title: crDroid Installation Guide for Redmi Note 12 Pro 5G (ruby)
Date: 2026-06-14 00:22
Category: Sorun Giderme
Tags: Android, Custom ROM, crDroid, Xiaomi, Root, Redmi Note 12 Pro
Slug: redmi-note-12-pro-5g-crdroid-kurulum-rehberi
Authors: yuceltoluyag
Status: published
Summary: Step-by-step guide to installing crDroid Custom ROM on your Redmi Note 12 Pro 5G (ruby/rubyx) using OrangeFox Recovery.
Template: article
Lang: en

I had previously written a [Redmi Note 8 Pro Custom ROM Installation](/en/redmi-note-8-pro-custom-rom-kurulumu/)[^4] guide for myself. I had grown so used to the crDroid world that I loved using on my old Redmi Note 8 that I didn't expect the next adventure to be this "wet".

Here is exactly how it went down, my friend: while my wife was cleaning the house, our toddler got mad at a video on YouTube Kids. Unable to control their anger, they dunked the Redmi Note 12 Pro 5G into the mop bucket a few times, performing an experimental "water resistance test" of their own, and then handed the phone to their mom. Of course, the phone was knocked out instantly. After buying a new phone for my wife, I had this old workhorse repaired, and it ended up with me.

But when I turned the device on, those ridiculous ads, unremovable bloatware, and that bloated interface that doesn't get updates (HyperOS) annoyed me so much that I said, "It's time to bring the crDroid joy of the old Note 8 to this one." So today, I'll explain step-by-step how to install crDroid on our famous device code-named ruby[^1] from scratch, using the method I applied myself.

Installing custom ROMs on MediaTek processors always seems a bit scary, but when you follow the right steps, the process is actually quite simple. If you follow this guide to the end, you will rescue your device from the sluggishness of HyperOS and enjoy a buttery-smooth crDroid experience.

!!! danger "Data Loss Warning"
    During these operations, all data on your device will be completely wiped. Make sure you transfer your photos, backups, and important files to your computer. Also, these operations might void your device's warranty. The responsibility is entirely yours.

!!! warning "Imported (Repaired) Devices and EFS / NVRAM Warning"
    On MediaTek devices with a virtual A/B partition table, during a clean install (Format Data) or ROM migrations, the **EFS, NVRAM, and NVDATA** partitions that house the device's network calibration and hardware identity files might be wiped. Therefore:

    * **Backup:** Before starting the process, it is recommended to back up these partitions via an advanced recovery tool like **TWRP or OrangeFox** on your device and save it to your computer. The crDroid Recovery does not support backups.
    * **Imported Devices:** If you have an imported device and its network activation (IMEI process) was done via software modifications, the Format Data or ROM installation steps will wipe this software patch and return the device to its factory settings. Even if you complete the setup successfully and do bootloader spoofing, you will definitely need to visit a technician to renew the patching process to get your network working again. The most trouble-free way for this process is to apply it on official, BTK-approved Turkish licensed devices. If you are going to apply this guide on an imported device, you should know from the start that such an external technical service expense will arise.

---

## 🛠️ Pre-Installation Preparations

Before starting the operations, some tools need to be ready on our computer and phone:

1. **Unlocked Bootloader:** Your device's bootloader must be unlocked. You cannot install a custom ROM if the bootloader is locked.
2. **Platform Tools:** Drivers must be installed for ADB and Fastboot commands to run on your computer.
3. **Files:** You need to download and prepare the following files on your computer:
    * The **crDroid ROM zip** file compatible with Redmi Note 12 Pro 5G. You can download the files from the official [crDroid.net/rubyx](https://crdroid.net/rubyx){: target="_blank" rel="noopener noreferrer"} page (make sure to choose the file carrying the common code-name `rubyx` when downloading).
    * The **crDroid Recovery (`boot.img`)** file compatible with your device. (Due to the virtual A/B structure, the recovery is directly inside the boot partition).
    * The **GApps** package compatible with your ROM version if you want to use Google services[^2].
    * (Optional) **Magisk zip** file if you want root privileges[^3].
    * **Bootloader Spoofing files** for network and baseband activation: `ruby-lk-kaeru.bin.signed.img` and `preloader_raw.img` (or `preloader_ruby.bin`)[^5]. You can obtain these from the [Google Drive](https://drive.google.com/drive/folders/1kSbwkNFpNVxVgadq-oOEmCSmMPY_GBID?usp=sharing){: target="_blank" rel="noopener noreferrer"} folder.

---

## 🏗️ Step-by-Step Installation Stages

### Verifying Device Model and Connection (Optional)

Before starting the process, make sure your phone is turned on, USB Debugging is active, and verify with these commands from your computer:

```bash
$ adb devices
List of devices attached
79orfygmgecmw84t        device

$ adb shell getprop ro.product.device
ruby

$ adb shell getprop ro.product.model
22101316G
```

If you see the device identity and `ruby` code-name as above, your device is perfectly suited for this guide.

### Step 1: Putting the Device into Fastboot Mode

First, we put our phone into Fastboot mode so we can send commands from the computer.

* **Recommended Method (Command Line):** If your phone is turned on and connected to the computer, you can switch directly to Fastboot mode by entering this command in the terminal:
  ```bash
  $ adb reboot bootloader
  ```
* **Alternative Method (Key Combination):** When the phone is turned off, press and hold the **Power** and **Volume Down** keys at the same time. Release the keys when you see the "FASTBOOT" text or icon on the screen, and connect it to the computer via USB cable.

### Step 2: Confirming the Device Code-Name

To make sure the ROM file we downloaded matches your device, open a terminal (cmd or powershell) inside the Platform Tools folder and run:

```bash
$ fastboot getvar product
```

When you run this command, you should get `product: ruby` or `product: rubyx` in the terminal. If you see another device code, stop the operations immediately.

!!! tip "Device Detection Issue"
    If the command runs but the line underneath remains empty, it means the Xiaomi Fastboot drivers are missing on your computer. In this case, instead of doing a manual install, you can copy this practical batch script to a text document, save it with a `.bat` extension (e.g., `install-drivers.bat`), and run it as an administrator:

    Alternatively, you can manually update the [Xiaomi USB Driver](http://bigota.d.miui.com/tools/xiaomi_usb_driver.rar){: target="_blank" rel="noopener noreferrer"} file you extracted to your desktop via Device Manager. Detailed steps are in the troubleshooting section at the end of the post.

```batch
    @echo off
    echo Starting driver installation, please wait...
    net session >nul 2>&1
    if NOT %errorLevel% == 0 (
        powershell -executionpolicy bypass start -verb runas '%0' am_admin & exit /b
    )
    cd %~dp0
    PowerShell -executionpolicy bypass -Command "(New-Object Net.WebClient).DownloadFile('https://cdn.jsdelivr.net/gh/fawazahmed0/Latest-adb-fastboot-installer-for-windows@master/Latest-ADB-Installerbat', 'adbinstaller.bat')"
    cls
    call adbinstaller.bat
    del /f adbinstaller.bat > nul 2>&1
```

### Step 3: Flashing Custom Recovery

We install the recovery image to put our phone into recovery mode. On devices with a new-generation virtual A/B partition table like the Redmi Note 12 Pro 5G, there is no separate recovery partition; recovery is written directly inside the boot (`boot`) partition. This is why the downloaded file is named **`boot.img`**:

```bash
$ fastboot flash boot boot.img
Sending 'boot_a' (131072 KB)                       OKAY [  3.117s]
Writing 'boot_a'                                   OKAY [  0.339s]
Finished. Total time: 3.470s
```

After the flashing process is complete, we reboot the device directly into recovery mode:

```bash
$ fastboot reboot recovery
Rebooting into recovery                            OKAY [  0.001s]
Finished. Total time: 0.002s
```

The device will turn off and turn back on with the purple/black official crDroid Recovery interface.

### Step 4: Formatting Data (Format Data / Factory Reset)

This step is vital to decrypt the partition and perform a clean install.

1. On the recovery screen that opens, use the volume keys to navigate to **Factory reset** and select it with the power button.
2. Next, enter **Format data/factory reset**.
3. Select **Format data** on the confirmation screen to start the process.
4. When "Data wipe complete" appears at the bottom of the screen, return to the main menu using the back button.

### Step 5: Flashing the ROM File (ADB Sideload)

On new generation devices with dynamic partitions, instead of dealing with copying files from the computer, we use the most stable method: the **ADB Sideload** bridge. Make sure your phone is still connected to the computer:

1. In the main menu on the phone screen, enter **Apply update**.
2. Then select **Apply from ADB**. The phone will now wait for a file transfer from the computer.
3. On your computer, run this command in the terminal inside the `platform-tools` folder (type the name of the ROM file or drag-and-drop it):
  ```bash
  $ adb sideload crDroidAndroid-16.0-20260606-rubyx-v12.10.zip
  ```
4. Wait for the flashing process to complete. It will show `Total xfer: 1.00x` in the terminal or `%100` on the phone.
5. When flashing is complete, the following question will appear on the phone screen:
   *"Install additional packages? You need to reboot recovery first. Do you want to reboot to recovery now?"*
6. Definitely choose **YES** here. The phone will automatically restart in recovery mode using the newly installed slot.

### Step 6: Installing Google Services (GApps - Critical Stage)

!!! warning "Do Not Flash Directly!"
    If you try to flash the GApps package right after the ROM sideload finishes, you'll get signature and slot errors. This is why you must select **YES** to the reboot recovery question in the previous step.

1. When the device opens in recovery mode again, enter **Apply update -> Apply from ADB**.
2. Send the downloaded GApps file from the terminal on your computer (you can use the [NikGApps crDroid Official](https://nikgapps.com/crdroid-official){: target="_blank" rel="noopener noreferrer"} package for GApps):
  ```bash
  $ adb sideload NikGapps-crdroid-official-arm64-16-signed.zip
  ```

### Step 7: Optional Root (Magisk) Installation

If you want to root your phone, follow these steps after the GApps installation:

1. Go back to the main menu with the back button.
2. Restart the recovery one more time with **Advanced -> Reboot to recovery**.
3. Follow the **Apply update -> Apply from ADB** path again upon startup.
4. Send the Magisk zip file from the computer with this command:
  ```bash
  $ adb sideload Magisk.zip
  ```

### Step 8: Network and Baseband Activation (Bootloader Spoofing - Critical Stage)

When you install a custom ROM on the MediaTek-based ruby platform, because the bootloader lock is open, the modem gets caught in the security protocol and does not provide network (baseband version appears as "Unknown"). To bypass this lock, we must spoof the bootloader state as locked:

1. Put the device back into Fastboot mode either via `$ adb reboot bootloader` if the device is on, or by holding **Power + Volume Down** if it is off, and connect it to the computer.
2. Open a terminal in the folder containing the `ruby-lk-kaeru.bin.signed.img` and `preloader_raw.img` (or `preloader_ruby.bin`) files you prepared, and run these commands in order:
  ```bash
  $ fastboot flash lk_a ruby-lk-kaeru.bin.signed.img
  $ fastboot flash lk_b ruby-lk-kaeru.bin.signed.img
  $ fastboot flash preloader_a preloader_raw.img
  $ fastboot flash preloader_b preloader_raw.img
  ```
3. When flashing finishes, restart the bootloader with:
  ```bash
  $ fastboot reboot bootloader
  ```
4. Once the Fastboot screen returns, activate the bootloader spoofing feature with:
  ```bash
  $ fastboot oem bldr_spoof on
  ```
  *(Make sure you see the `(bootloader) Bootloader spoofing enabled.` confirmation in the terminal).*

### Step 9: Restarting the System

Since all operations are complete, we can start the system:

1. Enter this command to restart the device from the terminal:
  ```bash
  $ fastboot reboot
  ```

The first boot will happen with the crDroid animation and might take a bit longer than usual. When the device opens, complete the setup screen, insert your SIM card, and you'll see the network works like a charm.

---

## 🚫 Possible Errors and Solutions (Edge Cases)

* **Device Continuously Reboots to Recovery (Bootloop):**
  You might have skipped the **Format Data** process explained in Step 4 or didn't confirm it by typing `yes`. If you go into recovery and repeat the Format Data process, your device will boot up without issues.
* **GApps Throws an Error During Installation (Error 1):**
  This means you skipped the rule in Step 6 and tried to flash GApps immediately after the ROM flashed without restarting the recovery. Try rebooting the device into recovery mode and flashing the GApps zip file again.
* **"/metadata/ota no such file or directory" Warning During Sideload:**
  This warning is completely harmless, and there's no need to panic. The OTA folder in the metadata partition gets deleted after the Format Data process, which is why recovery shows this warning. As long as the `serving: ...` percentage is progressing on the computer screen, the installation is continuing smoothly; do not unplug the cable.
* **Device Not Appearing in Fastboot Mode (Waiting for Device):**
  If the `fastboot devices` command returns empty or gets stuck in the `< waiting for any device >` error, this is caused by missing Windows Fastboot drivers or USB 3.0/Ryzen incompatibility. To update the drivers, enter Device Manager, right-click your device showing a yellow exclamation mark, and select **Update Driver -> Browse my computer for drivers -> Let me pick from a list of available drivers on my computer**. From there, you can manually select and install the **Android Bootloader Interface** driver. Also, try using USB 2.0 ports if available instead of blue USB 3.0 ports, or use a USB Hub in between.
* **SIM Card Inserted but "Mobile Network Unavailable" and "Unknown" Baseband Error:**
  On this MediaTek processor device, when the bootloader lock is open, the modem disables itself due to the security protocol. Make sure you applied the **Bootloader Spoofing** steps in Step 8 and received the `Bootloader spoofing enabled.` output in the terminal.

Good news, my friend! You are now ready to experience the latest and lightweight crDroid interface on your Redmi Note 12 Pro 5G. If you get stuck anywhere during the installation, feel free to ask.

[^1]: Ruby is the code-name for the Redmi Note 12 Pro 5G model; rubyx is the common tree name in the custom ROM world that merges the Note 12 Pro 5G, Pro+ 5G, and Discovery models.
[^2]: GApps (Google Apps) are packages containing the Google Play Store and associated services.
[^3]: Magisk is an open-source tool used to root devices without permanently altering system files.
[^4]: The [Redmi Note 8 Pro Custom ROM Installation](/en/redmi-note-8-pro-custom-rom-kurulumu/) guide previously written by Yücel Toluyag.
[^5]: Special patch files signed by Roger Ortiz that spoof the bootloader status as locked to bypass the modem/baseband lock.
