Title: Arch Linux Nvidia Graphics Card Installation (Optimus, Prime, Bumblebee Guide)
Date: 2020-04-18 10:00
Modified: 2025-10-29 10:41
Category: Donanım
Tags: linux, nvidia, laptop
Slug: arch-linux-nvidia-ekran-karti-kurulumu
Authors: yuceltoluyag
Status: published
Summary: I explain step by step the installation of Nvidia graphics card in Arch Linux, driver selection, optimus-manager and performance settings for maximum performance.
Translation: true
Template: article
Image: images/nvidia-linux-performans-ayari-xl.webp
Lang: en

## 👋 Hello

Hello! One of the topics I've wanted to write about for a long time is the **installation of Nvidia graphics cards**. 😊
Linux can sometimes seem complex with **Nvidia drivers**. Due to incorrect installations, old drivers, or wrong configurations, users often make comments like "**Nvidia doesn't work efficiently in Linux**".

Actually, the problem is often due to **driver selection and configuration differences**.
In this guide, I'll explain step by step how to **install Nvidia drivers on Arch Linux**, which version is suitable for your card, and what to pay attention to for **maximum performance**. 🚀

---

## 🧩 Learning Your Card Model

First, let's find out which GPUs are present in your system:

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

Here's my sample output (Lenovo, Nvidia Quadro 2000M):

```bash
00:02.0 VGA compatible controller: Intel Corporation Integrated Graphics Controller
Kernel driver in use: i915
--
01:00.0 VGA compatible controller: NVIDIA Corporation GF106GLM [Quadro 2000M]
Kernel driver in use: nvidia
```

The **GF106GLM** part is your card's "code name".
You can use this name to check which generation your card belongs to on the [Nvidia CodeNames](https://nouveau.freedesktop.org/wiki/CodeNames/){:target="_blank" rel="noopener noreferrer"} page.
My card belongs to the "**Fermi**" family.

---

## 🧠 Learning the Supported Versions of Your Card

Some older cards no longer support the newest drivers.
To see up to which driver version your card is supported:

👉 [Nvidia Legacy GPU List](https://www.nvidia.com/en-us/drivers/unix/legacy-gpu/){:target="_blank" rel="noopener noreferrer"}

If your card is in this list, for example, it's supported up to version **340xx** or **390xx**, installing newer drivers may cause problems.

!!! warning "Common Mistake ⚠️ Most users install the `nvidia` package even though their card is only supported up to the 390xx series. This situation can cause problems such as black screen, kernel module errors or low FPS on your system."

You can search for your appropriate version on the [Nvidia Driver Search](https://www.nvidia.com/Download/index.aspx){:target="_blank" rel="noopener noreferrer"} page, and according to the result, you can choose the `nvidia-390xx` or `nvidia-340xx` package in Arch Linux AUR.

📖 Additional resource: [Arch Linux Nvidia Document](https://wiki.archlinux.org/index.php/NVIDIA#Installation){:target="_blank" rel="noopener noreferrer"}

---

## ⚙️ What is Nouveau, Optimus, Prime, Bumblebee?

!!! note "General Information 💡 If you're using a laptop, you most likely have both Intel and Nvidia GPUs. This technology is called **Optimus**."

### 🟢 Nouveau

These are open source drivers. If you don't do gaming or GPU-intensive tasks, this might be enough for you: You can watch the video to understand better.

```bash
yay -Syyu xf86-video-intel mesa xf86-video-nouveau opengl-man-pages lib32-mesa-vdpau lib32-libva-mesa-driver
```

### 🔵 Optimus (My recommendation for laptops)

For systems with Intel + Nvidia switching.
Balances performance and battery life. Usually **Optimus Manager** is recommended for usage:

```bash
yay -Syyu nvidia-390xx-dkms nvidia-390xx-utils opencl-nvidia-390xx nvidia-390xx-settings lib32-opencl-nvidia-390xx lib32-nvidia-390xx-utils
yay -S optimus-manager optimus-manager-qt
sudo systemctl enable optimus-manager.service
```

To switch:

```bash
optimus-manager --switch intel   # Integrated GPU
optimus-manager --switch nvidia  # Dedicated GPU
optimus-manager --switch hybrid  # Hybrid mode
```

- You can follow the [Optimus Manager](https://github.com/Askannz/optimus-manager/wiki){:target="_blank" rel="noopener noreferrer"} wiki page.

### 🔴 Prime (My recommendation)

Provides full performance for gaming, rendering, OBS and other GPU-intensive tasks.
Compatible with Optimus Manager.

### 🟣 Bumblebee

Was popular in the past but is no longer up to date.
As of 2025, the **Bumblebee project has not been actively developed since 2013** ([GitHub](https://github.com/Bumblebee-Project/Bumblebee)).
Performance-wise, it gives results that are **half of Windows**, so it's not recommended.

- If you still want to see its performance:

* Integrated GPU

[responsive_img src="/images/optirun-dahili-gpu-xl.webp" alt="Integrated Gpu Performance" /]

* Dedicated Gpu Performance

[responsive_img src="/images/optirun-performansi-xl.webp" alt="Dedicated Gpu Performance" /]

## 🧹 Importance of Clean Installation

!!! danger "Watch Out for Conflicts If you tried different methods (Bumblebee, nvidia-xrun, etc.) before, you should delete these configurations before the new installation. Otherwise, `optimus-manager` won't work properly. Especially old files under **`/etc/X11/xorg.conf.d/`** or services like **nvdock** can disrupt switching."

---

## 🎮 Performance Settings

If you experience screen tearing or OBS problems when switching to the Nvidia graphics card,
first turn off compositors:

```bash
killall picom compton xcompmgr
```

Then open the **NVIDIA Settings** application:

- Check "PowerMizer" tab and select `Prefer Maximum Performance`,
- Uncheck "Sync to VBlank" and "Allow Flipping".
- As seen here, I'm getting 877 FPS.

* Screen tearing and OBS problems will be solved after performance settings.

  [responsive_img src="/images/nvidia-linux-performans-ayari-xl.webp" alt="Nvidia Performance Settings" /]

* Maximum performance mode selected with PowerMizer settings.

  [responsive_img src="/images/nvidia-grafik-ayari-maximum-performans-xl.webp" alt="Nvidia Graphics Settings" /]

* OBS using Nvidia GPU and high FPS.

[responsive_img src="/images/primeperformansi-xl.webp" alt="Nvidia Prime Performance" /]

## 📊 Bumblebee Performance Comparison

| Test             | Bumblebee            | Prime             |
| ---------------- | -------------------- | ----------------- |
| GPUTest          | 215 FPS              | 877 FPS           |
| OBS Broadcast    | High CPU usage       | Stable            |
| Render (Blender) | 2× slower            | Full GPU usage    |

---

## 🎥 Video Explanation

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="DhCUPntoKSg"></lite-youtube>

---

## 🔗 Related Articles

- [Waydroid Installation and Android Apps](/arch-linux-waydroid-kurulumu)
- [Oh My ZSH Installation (Themes and Plugins Included)](/oh-my-zsh-kurulumu-temel-ayarlar/)
- [Arch Linux NTFS Disk Configuration](/arch-linux-ntfs-yapilandirma)
- [NVIDIA Error and Solution in Arch Linux linux-firmware Update](/arch-linux-linux-firmware-nvidia-hatasi-cozumu/)
