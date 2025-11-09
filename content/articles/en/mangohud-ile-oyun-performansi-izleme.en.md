Title: Guide: Monitor Your Game Performance with MangoHud
Date: 2025-05-06 15:00
Modified: 2025-08-11 22:59
Category: Oyun
Tags: mangohud, linux oyunları, arch linux, fps göstergesi, oyun performansı
Slug: mangohud-ile-oyun-performansi-izleme
Authors: yuceltoluyag
Status: published
Summary: Monitor system performance information like FPS, temperature, usage in real time with MangoHud. Installation and configuration guide on Arch Linux.
Template: article
Image: images/mangohud_linux-xl.webp
Lang: en

## Guide: Monitor Your Game Performance with MangoHud 🎮

Do you want to *monitor game performance in real time* while playing games on Linux? What about seeing information like FPS, CPU temperature, GPU usage in one corner of the screen? This is exactly where **MangoHud** comes into play. In this guide, I'll provide step-by-step information about how to install, configure and use MangoHud with games on Arch Linux.

---

## What is MangoHud?

**MangoHud** is an open-source tool that displays system performance as an overlay in Vulkan and OpenGL-based games. It comes with many metrics including FPS, GPU/CPU temperature, memory usage. Additionally, it can also be used to record performance data during game benchmarks.

---

## Installing MangoHud (Arch Linux)

If you're using Arch Linux, installing MangoHud is quite easy. You can install MangoHud with the following command:


```bash
sudo pacman -S mangohud
```

If you're playing 32-bit games, you may also need to install:

```bash
sudo pacman -S lib32-mangohud
```

---

## Configuring MangoHud 📁

Several file paths can be used for MangoHud configuration. MangoHud scans these files in order:

* `$XDG_CONFIG_HOME/MangoHud/MangoHud.conf`
* `$XDG_CONFIG_HOME/MangoHud/APPLICATION-NAME.conf` (case sensitive)
* `$XDG_CONFIG_HOME/MangoHud/wine-APPLICATION-NAME.conf` (for Wine applications, without `.exe` extension)
* `./MangoHud.conf`
* `$MANGOHUD_CONFIGFILE` (if specified with environment variable)

📝 *Tip:* An example configuration file can be found on MangoHud's GitHub page.

### Example Content for MangoHud.conf

```ini
fps_limit=144
cpu_temp=1
gpu_temp=1
ram=1
frame_timing=1
```

[responsive_img src="/images/mangohud_linux-xl.webp" alt="MangoHud" /]
---

## MangoHud GUI Tool: GOverlay 🖥️

For users who don't want to deal with terminal, there's also a configuration tool with graphical interface called **GOverlay**. It can be easily installed via AUR:

```bash
yay -S goverlay
```

With GOverlay, you can edit all MangoHud settings through GUI and get previews.

---

## Using MangoHud 🚀

### General Usage

To start an application with MangoHud, you can use the following command in terminal:

```bash
mangohud application_name
```

Example:

```bash
mangohud glxgears
```

### Keyboard Shortcuts

* `Right Shift + F12` – Toggle overlay on/off
* `Right Shift + F11` – Change overlay position
* `Right Shift + F10` – Change overlay profile
* `Left Shift + F2` – Toggle logging on/off
* `Left Shift + F4` – Reload configuration

### Using MangoHud with Steam Games

To include MangoHud in Steam games:

1. Right click the game in your Steam library → Properties…
2. In the opened window, enter the following in *Launch Options* section:

```bash
mangohud %command%
```

Alternatively, you can start Steam with MangoHud for all games:

```bash
mangohud steam-runtime
```

### Using with GameMode

To increase performance, you can run MangoHud together with **GameMode** as follows:

```bash
mangohud gamemoderun game_name
```

---

## Extra Tips 🧠

* MangoHud only works in Vulkan/OpenGL games. DirectX games are also supported via translation layers like DXVK or VKD3D.
* You can use the following environment variable for MangoHud to run automatically:

```bash
export MANGOHUD=1
```

* `--dlsym` parameter may be required in some games:

```bash
mangohud --dlsym game_name
```

### Installation Note for Debian/Ubuntu

This guide is for Arch Linux. In Debian/Ubuntu systems, `apt install mangohud` command can be used. However, configuration and usage steps are largely the same.

---

## Conclusion: The Best Way to Monitor Performance in Games

**MangoHud** is an indispensable performance monitoring tool for those playing games on Linux. With both its easy installation and flexible configuration, it provides great convenience for both gamers and developers. In this guide, we detailed how to install and use MangoHud on Arch Linux.

🎯 Have you tried MangoHud? Which settings do you prefer in your configuration file? Share in the comments!

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="foUosbS6p_A"></lite-youtube>

---