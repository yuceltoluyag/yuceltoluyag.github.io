Title: Linux GPU Driver Guide: Stable and Clean Installation for AMD, Intel, and Nvidia
Date: 2025-11-30 11:15
Category: Donanım
Tags: linux, gpu driver, nvidia, amd, intel, mesa, steamos, oyun, debian
Slug: linux-gpu-driver-rehberi
Authors: yuceltoluyag
Summary: Installing drivers on Linux isn't like on Windows. The Mesa 25.1 update, Nvidia DKMS modules, and a special guide for stubborn Debian users are all here.
Image: images/linux-ve-steamos-grafik-surucusu-yukleme-guncelleme-rehberi-xl.webp
Lang: en
Status: published


I know that first moment of shock for everyone moving from Windows to Linux. You open the browser, go to the Nvidia or AMD website, and look for the "Download Driver" button... But wait! That's not how things work in the Linux world. Here, the rules are different, sometimes confusing, but much more logical once you get used to them.

Today, I'll explain how to check and update your graphics drivers—the heart of your system—and how to get through it without seeing that dreaded black screen. Grab your coffee, open the terminal. We're starting.

## Important Warnings (Don't Skip!)

**SteamOS Users:** If you're using a Steam Deck or SteamOS, take your hands off the keyboard. Valve already sends you the drivers (Mesa) with system updates. You don't need to do anything extra; you might break it. This guide is for other Linux distributions.

**General Rule:** Before diving into driver tasks, completely update your system and restart. Don't say, "Oh, nothing will happen"—it does. Trust me, I've been there.

-----

## AMD and Intel Side: What is Mesa?

AMD and Intel users are the "lucky" ones in the Linux world because these cards use **Mesa**. Mesa isn't just a single driver; it's a massive collection where open-source drivers are gathered.

Terms you'll hear include:

  * **RADV:** Mesa's AMD Vulkan driver (supported by the community and Valve, usually the best one).
  * **ANV:** Mesa's Intel Vulkan driver.
  * **AMDVLK:** AMD's own official open-source driver.

My advice (and what most gamers agree on): **Stick with RADV.** AMDVLK can sometimes cause compatibility issues, while RADV is rock solid.[^1]

### Which Mesa Version am I Using?

To find out, we need to send a little whisper to the terminal.

```bash
glxinfo | grep "Mesa"
```

If the terminal shouts "Command not found" at you (which it usually does), you need to install these packages:

!!! tip "Installing glxinfo ⚡"
* **Ubuntu/Mint/Debian:** `sudo apt install mesa-utils`
* **Arch Linux:** `sudo pacman -S mesa-utils`
* **Fedora:** `sudo dnf install glx-utils`

When you run the command, you'll get an output like this:

```
OpenGL core profile version string: 4.6 (Core Profile) Mesa 25.0.3-1ubuntu2
```

That **Mesa 25.0.3** part right there is your version.

### How to Update Mesa? (Critical Update for Ubuntu Users!)

This part got a bit confusing, but let's clear it up.

**Ubuntu and Derivatives (Mint, etc.):**
We used to use the Kisak PPA for every version, but things have changed. Due to storage limits, Kisak has **retired older versions (18.04 Bionic, 20.04 Focal, 22.04 Jammy).** So, if you have an older system, this door is closed to you.

But the good news is: If you're using **Ubuntu 25.04 (Plucky)** or **24.10 (Oracular)**, you can now easily switch to the latest **Mesa 25.1** version (specifically the 25.1.5 bug-fix release) via the Kisak PPA. Why is this important? Because new **DXVK** updates now recommend Mesa 25.1. This is a must to avoid performance loss while playing games with Proton.

In short, if you're using a current version of Ubuntu, boost your system with these commands:

```bash
sudo add-apt-repository ppa:kisak/kisak-mesa
sudo apt update
sudo apt upgrade
```

**Arch, Fedora, Manjaro, EndeavourOS:**
You guys are still kings. Since your system is rolling-release, the latest version of Mesa already comes to you through normal updates. No need for extra adventures.

-----

## NVIDIA Side: The Temperamental Bride

Now we come to the most interesting part. Nvidia is known in the Linux world for its closed-source (proprietary) drivers and sometimes makes us miserable. But we have to install those drivers for performance.

### Ubuntu / Mint / Kubuntu

This is the easiest. Open the **"Software & Updates"** app from the menu, and go to the **"Additional Drivers"** tab. You'll see the Nvidia drivers there. Select the recommended version and click "Apply."

Or, if you're a terminal person:

```bash
sudo ubuntu-drivers list
sudo ubuntu-drivers install nvidia:560
```

*(Of course, replace 560 with the latest version shown in the list.)*

### Pop!_OS

The System76 team has solved this. Go into the **Pop!_Shop**, select the Nvidia driver, and install it. If you downloaded the Nvidia version of the ISO file anyway, the drivers come pre-installed. Comfort level: 100%.

### Fedora (Requires a Bit of Effort)

By its free software philosophy, Fedora does not offer Nvidia drivers by default. You first need to add the **RPM Fusion** repository.

1.  **RPM Fusion Installation:**

```bash
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

2.  **Driver Installation:**
For modern cards:

```bash
sudo dnf install akmod-nvidia
```

For CUDA support:

```bash
sudo dnf install xorg-x11-drv-nvidia-cuda
```

!!! danger "Secure Boot Trouble! 🛡️ If Secure Boot is enabled in the BIOS, you need to sign the driver. This process is a total headache (`kmodgenca`, `mokutil`, etc.). If you don't have a corporate requirement, disabling Secure Boot in the BIOS is the shortest path."

### Arch Linux (The DKMS Detail!)

The Arch Wiki is a vast ocean on this topic, but let me summarize. It's very important which card you use.

  * **Turing (RTX 20 series) and later:** Open-source kernel modules are now recommended: `nvidia-open`.
  * **LTS Kernel Users:** `nvidia-open-lts`.
  * **For Those Who "Can't Be Bothered":** `nvidia-open-dkms`. This package automatically compiles the modules regardless of which kernel you use (Zen, LTS, Mainline). Peace of mind.

And most importantly, **32-bit support!** Most Steam games still need 32-bit libraries.
Open the `/etc/pacman.conf` file and uncomment the `[multilib]` line by removing the `#`.

Then, update the system and install the drivers with this command:

```bash
sudo pacman -Syu nvidia-open-dkms lib32-nvidia-utils
```

*(If you're using an older card, replace `nvidia-open` parts with `nvidia`).*

### Manjaro and EndeavourOS

These distributions make it easy.

  * **Manjaro:** `sudo mhwd -a pci nonfree 0300` command performs automatic installation.
  * **EndeavourOS:** There's the `nvidia-inst` tool. You can install both the driver and 32-bit support by saying `nvidia-inst --32`.

### Debian (Special Section for the Stubborn)

To be honest, using **Debian Stable** for gaming is like entering a Formula 1 track with a tractor. The drivers remain very old. But if you say, "I won't give up on Debian; stability is my middle name," I respect that.

Just for you, I'm leaving the "Quick Installation Recipe" here for impatient Debian warriors. These commands open the `non-free` repositories, add the 32-bit architecture, and install Steam and the Nvidia driver.

After becoming root by typing `su -` in the terminal, in order:

```bash
# Add 32-bit architecture
dpkg --add-architecture i386

# Edit sources list (You might need to do this manually)
# Add "non-free contrib" to the end of each line in /etc/apt/sources.list.
# (E.g., main non-free contrib)

# And the final blow:
apt update
apt install steam nvidia-driver
reboot
```

After doing this, the system restarts, and theoretically, you're ready to play games. Good luck (you'll need it)!

-----

So that's the situation. Although driver business on Linux might look scary at first, once you grasp the logic, you say, "Why did I bother going from site to site on Windows?" Anyway, I'm off; an Arch system that needs updating is waiting for me (I hope it doesn't break 😅).

- [Arch Linux NVIDIA Graphics Card Installation](/en/arch-linux-nvidia-ekran-karti-kurulumu/)
- [Arch Linux Linux Firmware NVIDIA Error Solution](/en/arch-linux-linux-firmware-nvidia-hatasi-cozumu/)
- [Arch Linux NTSync Active Zen Kernel Guide](/en/arch-linux-ntsync-aktif-etme-zen-kernel-rehberi/)

[^1]:
The RADV driver is constantly optimized by Valve engineers for the Steam Deck and Linux gaming. AMDVLK can remain more corporate-focused.
