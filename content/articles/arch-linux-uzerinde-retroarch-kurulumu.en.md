Title: RetroArch Installation and Configuration on Arch Linux
Date: 2025-03-01 10:00 10:00
Modified: 2025-08-11 22:59
Category:Oyun
Tags: archlinux, retroarch, emulator, oyun, yazılım
Slug: arch-linux-uzerinde-retroarch-kurulumu
Authors: yuceltoluyag
Summary: A guide explaining step-by-step RetroArch installation and configuration on Arch Linux.
Status: published
Template: article
Image: images/retroarch-xl.webp
Lang: en

## RetroArch Installation and Configuration 🎮

We prepared a comprehensive guide for those who want to install and configure RetroArch on Arch Linux. RetroArch offers a unique experience to gamers with its wide platform support and flexible structure. Here are its standout features:

- Multi-pass shader support 🎨
- Real-time rewind ⏪
- Video recording with FFmpeg 🎥
- User-friendly interface controllable with gamepad 🎮

---

## 1️⃣ Installing RetroArch

To install RetroArch on Arch Linux, run the following command:

```bash
sudo pacman -S retroarch retroarch-assets-xmb libretro-core-info libretro-overlays libretro-shaders
```

### Package Descriptions:

- **retroarch-assets-xmb**: Graphics and interface files for RetroArch.
- **retroarch-assets-ozone**: A desktop-friendly RetroArch interface.
- **libretro-core-info**: Information files about emulator cores.
- **libretro-overlays**: Overlays for retro games.
- **libretro-shaders**: Graphic effects (shaders).

---

## 2️⃣ Running RetroArch for the First Time

After the installation is complete, you can use the following command to start RetroArch:

```bash
retroarch
```

In the startup screen, you can configure basic settings and customize them according to your needs.

---

## 3️⃣ Basic Configuration ⚙️

### Configuration File

All settings of RetroArch are located in the following file:

```bash
~/.config/retroarch/retroarch.cfg
```

Some basic settings you can make in this file:

- **Video Settings**: In-game resolution and screen mode.
- **Audio Settings**: Selecting audio drivers like ALSA or PulseAudio.
- **Input Settings**: Configuring keyboard and joystick controls.

#### Example Configurations

If you are using RetroArch components in the user directory:

```bash
libretro_directory = "~/.config/retroarch/cores"
libretro_info_path = "~/.config/retroarch/cores/info"
```

If you are using system-wide:

```bash
assets_directory = "/usr/share/retroarch/assets"
libretro_info_path = "/usr/share/libretro/info"
libretro_directory = "/usr/lib/libretro"
```

---

## 4️⃣ Installing Cores 🛠️

RetroArch uses emulator cores to run games. You can use the following methods to install cores:

### Installing Cores with Online Updater

1. Open RetroArch.
2. Follow the steps **Main Menu > Online Updater > Core Updater**.
3. Select and download the core you want.

### Manual Core Installation

To install cores from AUR:

```bash
yay -S libretro-core-info
```

To run with a specific core and game:

```bash
retroarch --libretro /path/to/some_core_libretro.so /path/to/rom
```

---

## 5️⃣ Graphic Shaders and Overlays 🎨

You can use shaders and overlays to enhance your gaming experience:

- **Shaders**: Add effects like CRT and scanline.
- **Overlays**: Imitate retro console frame designs.

You can configure these settings from **Settings > Video > Output** menu.

---

## 6️⃣ Input and Control Settings 🎮

Keyboard and joystick controls can be set from the **Settings > Input** menu. Most joystick devices are automatically detected, but manual configuration is also possible:

```bash
~/.config/retroarch/autoconfig/<joystick_name>.cfg
```

---

## 7️⃣ Improving System Performance 🚀

To optimize RetroArch performance, you can try the following settings:

- Reduce shader usage.
- Use a lightweight video driver like OpenGL.
- Optimize **Audio Latency** settings (**Settings > Audio > Latency**).
- Enable **Video Threading**:

```bash
video_threaded = true
```

---

## 8️⃣ Common Problems and Solutions 🛠️

### Core Not Found

If RetroArch can't find cores, make the following setting:

```bash
libretro_directory = "/usr/lib/libretro"
```

### Input Devices Not Working

If input devices are not detected, add your user to the **input** group or add the following udev rule:

```bash
/etc/udev/rules.d/99-evdev.rules
KERNEL=="event*", NAME="input/%k", MODE="666"
```

### Poor Video Performance

Enable the **Settings > Video > Threaded Video** option or lower the resolution.

### Audio Problems with ALSA

Set the audio output rate as follows:

```bash
audio_out_rate = 48000
```

---

This guide provides a comprehensive source for those who want to install and optimize RetroArch on Arch Linux. For more information, you can check the [Arch Wiki: RetroArch](https://wiki.archlinux.org/title/RetroArch){: target="\_blank" rel="noopener noreferrer"} page. 📖

Have fun gaming! 🎮
[responsive_img src="/images/retroarch-xl.webp" alt="RetroArch user interface" /]
