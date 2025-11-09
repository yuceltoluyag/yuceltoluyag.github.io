Title: MediaTek IMEI Repair Guide
Date: 2025-08-11 10:30
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: MediaTek IMEI onarma, MTK IMEI fix, TWRP IMEI repair, MediaTek imei patch, Arch Linux
Slug: mediatek-imei-onarma-rehberi
Authors: yuceltoluyag
Status: published
Summary: Learn in detail how to perform IMEI repair on MediaTek processor phones using the mtk_imei tool in Arch Linux environment.
Template: article
Series: Android Rehberleri
Series_index: 1
Image: images/crDroid-95-xl.webp
Lang: en

## MediaTek IMEI Backup - Repair Guide 📱

!!! danger "⚠️ <strong>Warning!</strong> These operations are risky and may cause irreversible problems on your device. Applying the steps described in this guide is entirely <strong>at your own risk</strong>. In case of any problems, the content owner cannot be held responsible."

!!! warning "📱 Important data on your phone (applications, settings, files, etc.) may be lost during the process. Be sure to take backups before the operation and back up your important files."

!!! note "💡 This software and method has only been tested and supported on the following MediaTek devices:"

## 🎯 Introduction Section

**IMEI problems** on MediaTek (MTK) based Android devices are a frequently encountered problem, especially after ROM installation or software updates. IMEI is the unique identity number of your phone and when it is **deleted or corrupted**, your device's connection to the network is blocked. This problem may occur due to incorrect ROM installation, software errors or NVRAM problems.

In this guide, you will learn how to easily perform **MediaTek IMEI repair** on your Arch Linux based system using the `mtk_imei` tool. In our guide, we will cover the following topics: causes of IMEI problems, installation of required tools, how to get chip ID, preparing config file, creating flashable zip, NVRAM backup, flashing process and verification steps. We will also provide solution suggestions for possible problems.

---

## 🔍 Why IMEI Repair is Necessary?

IMEI is the unique identity number of your phone and when it is **deleted or corrupted**, your device's connection to the network is blocked. This problem may occur due to incorrect ROM installation, software errors or NVRAM problems. In this case:

- Your phone cannot connect to the network
- You cannot make calls
- You cannot send SMS
- You cannot use mobile data

In this guide, you will learn how to solve this problem technically.

---

## 📦 Requirements and Preparations

Before starting the process, make sure you have the following requirements:

1. **Linux, Windows, Mac** based system (we are using Arch Linux)
2. `adb` and `fastboot` tools must be installed
3. `php` installation (mtk_imei tool works with PHP)
4. **mtk_imei** tool (GitHub: [timjosten/mtk_imei](https://github.com/timjosten/mtk_imei){: target="\_blank" rel="noopener noreferrer"}))
5. TWRP Recovery installed MediaTek device
6. USB cable

!!! note "If you are using Arch Linux, you can install the required packages with the following commands in terminal:"

For installation and check:

```bash
sudo pacman -S android-udev
pacman -Qi android-udev
Name            : android-udev
Version         : 20250525-1
Description     : Udev rules to connect Android devices to your linux box
Architecture    : any
URL             : https://github.com/M0Rf30/android-udev-rules
Licenses        : GPL-3.0-only

sudo udevadm control --reload-rules
sudo udevadm trigger
```

---

## 🛠️ Step by Step IMEI Repair Process

### 1️⃣ Step: Installing Required Tools

First, download the mtk_imei tool from GitHub:

```bash
git clone https://github.com/timjosten/mtk_imei.git
cd mtk_imei
```

!!! tip "Don't run the script yet, we need to prepare the config file first."

### 2️⃣ Step: Preparing Chip ID and Config File

Get your device's chip ID:

```bash
adb shell getprop ro.boot.chipid
```

!!! note "💡 chip_id value should consist of 0x + 32 hexadecimal characters (total 34 characters)."

Sample output:

```
0x1234abcd5678ef90123456789abcdef0
```

Create `config.txt` file in `mtk_imei` folder **in JSON format**:

```json
{
  "patch_cert": 0,
  "device": "begonia",
  "kernel": "4.14.186",
  "chip_id": "0x1234abcd5678ef90123456789abcdef0",
  "imei_1": "123456789012345",
  "imei_2": "543210987654321",
  "wifi_mac": "001122334455",
  "bt_mac": "66778899aabb"
}
```

!!! note "The config.txt file must be in JSON format. wifi_mac and bt_mac fields cannot be left blank; they must be 12-digit hexadecimal values."

To get Wi-Fi and Bluetooth MAC addresses:

```bash
adb shell cat /sys/class/net/wlan0/address
adb shell cat /sys/class/bluetooth/hci0/address
```

Check file format:

```bash
file config.txt
```

If CRLF exists, correct it:

```bash
sed -i 's/\r$//' config.txt
```

### 3️⃣ Step: Creating IMEI Repair Package

Create the flashable `.zip` file by running the `mtk_imei.sh` script:

```bash
./mtk_imei.sh
```

When successful, you will get the following output:

```
MTK IMEI patcher by timjosten
Success!
```

The `imei_repair-<device>-<kernel>.zip` file will be created in the `out/` folder.

### 4️⃣ Step: Taking NVRAM and NVDATA Backup

!!! warning "Always take a backup for recovery after incorrect operation."

Turn on your phone in **TWRP Recovery** mode:

1. Go to **Backup** menu
2. Select **NVRAM** and **NVDATA** partitions
3. Save the backup to SD card or computer

### 5️⃣ Step: Flashing IMEI Repair Zip File

Send the IMEI repair file to the phone:

```bash
adb push out/imei_repair-begonia-4.14.186.zip /sdcard/
```

Turn on the phone in TWRP mode:

1. Go to **Install** menu
2. Select `imei_repair-*.zip` file
3. Load by **Swipe to confirm flash**
4. After the process is complete, restart with **Reboot > Recovery**

### 6️⃣ Step: Verifying IMEI

After the phone is turned on:

- Check from **Settings > About Phone > IMEI**
- Or enter `*#06#` code on phone keypad

Make sure the IMEI numbers are displayed correctly.

---

## ⚠️ Troubleshooting Tips

!!! warning "IMEI Not Visible? If IMEI is not visible, try setting the <code>"imei_1"</code> value in <code>config.txt</code> to <code>"000000000000000"</code> and writing only the real IMEI to the <code>"imei_2"</code> field."

!!! warning "Bootloader Warning <strong>It may not be possible to re-lock the bootloader</strong> after this operation."

!!! note "Restoration, If you encounter problems, you can restore your backed up NVRAM and NVDATA via TWRP."

---

## 🎯 Conclusion and Summary

With this guide, you can easily perform IMEI repair on MediaTek processor devices in **Arch Linux** environment. In short:

1. We installed the required tools
2. We prepared Chip ID and config file
3. We created flashable zip
4. We took NVRAM backup
5. We performed flashing process
6. We verified IMEI

Always remember to take backups before the process and follow the steps carefully. With this process, you can solve your device's network connection problem.

### 🔗 Related Resources and Next Steps

- **MTK IMEI Tool**: [mtk_imei on GitHub](https://github.com/timjosten/mtk_imei){: target="\_blank" rel="noopener noreferrer"}
- **TWRP Installation**: You can find the appropriate TWRP version for your device from your ROM's official telegram channel or XDA Developers forum. [ROM UNOFFICIAL begonia 13 crDroidAndroid
  ](https://xdaforums.com/t/rom-unofficial-begonia-13-crdroidandroid.4558845/){: target="\_blank" rel="noopener noreferrer"}
- **ADB/Fastboot Installation**: [Android Developer Site](https://developer.android.com/studio/command-line/adb){: target="\_blank" rel="noopener noreferrer"}
- **Other Troubleshooting Guides**: [Our Troubleshooting Category](/kategori/sorun-giderme)

### 📞 Share Your Experiences Too!

If this guide helped you or if you got stuck at some points, you can share your questions and opinions in the comments. For other MediaTek problems, you can also get support from [our forum](https://www.reddit.com/r/Kanunsuzlar/){: target="\_blank" rel="noopener noreferrer"}. 🙌

---

[responsive_img src="/images/crDroid-95-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]

[responsive_img src="/images/crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro-xl.webp" alt="crDroiAndroid-13-for-the-Xiaomi-Redmi-Note-8-Pro" /]
