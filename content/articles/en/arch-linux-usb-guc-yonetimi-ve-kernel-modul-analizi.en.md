Title: USB Power Management and Kernel Module Analysis on Arch Linux
Date: 2025-07-30 21:15
Modified: 2025-08-11 22:59
Category: Donanım
Tags: usb, güç yönetimi, kernel modülleri, linux, arch linux, aygıt analizi, bash
Slug: arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi
Authors: yuceltoluyag
Status: published
Summary: In this guide, we explain step by step how to analyze USB device power management settings and active kernel module parameters on your Linux system using a Bash script.
Template: article
Image: images/arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114989692214124173
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtovhjtec25


## 🖥️ USB Power Management and Kernel Module Analysis Guide on Arch Linux

**USB power management** and **kernel module settings** are quite important for efficiently using hardware resources on Linux systems, reducing power consumption, and fixing compatibility issues. In this guide, you will learn how to examine the state of USB devices and module parameters on your system using a Bash script. 🚀
[responsive_img src="/images/arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi-xl.webp" alt="arch-linux-usb-power-management-and-kernel-module-analysis-xl" /]

---

## 🧠 Who Is This Guide For?

- ⚙️ Linux users with technical knowledge
- 🐧 Users of Arch Linux or similar minimalist distributions
- 🧪 Users experiencing sleep/wake problems with USB devices
- 🔋 Users who want to save power on their laptops
- 🎧 Users who want to examine management of hardware like sound devices, wireless adapters, keyboard/mouse

---

## 🔍 What Does This Script Do?

The script performs two main operations:

1. **Reads and lists power management settings of all USB devices.**
2. **Shows kernel modules used actively on the system and their parameters.**

---

## 🛠️ Step-by-Step Examination of the Script

### 1. Script Content

```bash
#!/bin/bash

for i in $(find /sys/devices -name "bMaxPower")
do
	busdir=${i%/*}
	busnum=$(<$busdir/busnum)
	devnum=$(<$busdir/devnum)
	title=$(lsusb -s $busnum:$devnum)

	printf "\n\n+++ %s\n  -%s\n" "$title" "$busdir"

	for ff in $(find $busdir/power -type f ! -empty 2>/dev/null)
	do
		v=$(cat $ff 2>/dev/null|tr -d "\n")
		[[ ${#v} -gt 0 ]] && echo -e " ${ff##*/}=$v";
	done | sort -g;
done;

printf "\n\n\n+++ %s\n" "Kernel Modules"
for mod in $(lspci -k | sed -n '/in use:/s,^.*: ,,p' | sort -u)
do
	echo "+ $mod";
	systool -v -m $mod 2> /dev/null | sed -n "/Parameters:/,/^$/p";
done
```

---

## 🧪 Practical Usage and Sample Output

### 2. Run the Command

```bash
chmod +x usb-kernel-analyzer.sh
./usb-kernel-analyzer.sh
```

When you run it, you will get an output like the following:

```
+++ Bus 001 Device 005: ID 10c4:8108 Silicon Labs USB OPTICAL MOUSE
 -/sys/devices/.../usb1/1-9
 autosuspend=2
 autosuspend_delay_ms=2000
 control=on
 runtime_status=active
 wakeup=disabled
```

---

## 📊 Key Fields in the Output

| Field                  | Meaning                                           |
| ---------------------- | ------------------------------------------------- |
| `autosuspend`          | If 2, the device can go to sleep.                 |
| `autosuspend_delay_ms` | Waiting time before going to sleep.               |
| `control`              | `auto`: system manages, `on`: user determines.    |
| `runtime_status`       | `active`: running, `suspended`: in sleep mode.    |
| `wakeup`               | Can the device wake up the system while sleeping. |

---

## 🔎 3. Prominent Device Analyses

### 🖱️ USB Mouse (Silicon Labs)

- **Status:** Active, didn't sleep even though `autosuspend=2`.
- **Power Consumption:** Continuing.
- **Wakeup:** Disabled, so the system may not wake up with mouse while sleeping.

### ⌨️ USB Keyboard (CASUE)

- **Wakeup:** On. This device may trigger wake-up while the system is sleeping.
- **runtime_status=active** so didn't sleep.

### 📶 Wireless Network Adapter (Realtek RTL8188RU)

- **Sleep supported** but **runtime_status=active** → not sleeping.
- **wakeup=disabled** → Cannot trigger wake-up from network.

---

## 🧩 4. Kernel Module Parameters

Example module in the output:

```
+++ Kernel Modules
+ nvme
  Parameters:
    io_queue_depth = 1024
    use_threaded_interrupts = 0
```

### 🎯 Why Is This Important?

These parameters directly affect system performance, power management, and hardware compatibility.

| Module          | Critical Parameters                 |
| --------------- | ----------------------------------- |
| `snd_hda_intel` | power_save, enable_msi, jackpoll_ms |
| `nvme`          | io_queue_depth, use_cmb_sqes        |
| `xhci_hcd`      | quirks, link_quirk                  |

---

## 🧰 5. Finding Devices That Don't Sleep

You can also use the following commands outside the script:

### 🔍 List devices that don't go to sleep

```bash
grep . /sys/bus/usb/devices/*/power/runtime_status | grep -v suspended
```

### 🔋 Find devices that can sleep but are active

```bash
find /sys/bus/usb/devices/*/power -name runtime_status -exec grep -H active {} \;
```

---

## ✅ 6. Improvement Suggestions

- For devices with `autosuspend=2` but always in **`active`** state, `control=auto` can be set.
- For devices like keyboard with `wakeup=disabled`:

```bash
echo enabled | sudo tee /sys/bus/usb/devices/1-3/power/wakeup
```

- To make driver parameters permanent, you can add `.conf` files under `/etc/modprobe.d`.

---

## 📌 Conclusion: Why Is This Script Useful?

✅ You can see USB power management at system level.
✅ You can detect sleep/wake problems.
✅ You can improve performance or compatibility by analyzing kernel module parameters.

---
