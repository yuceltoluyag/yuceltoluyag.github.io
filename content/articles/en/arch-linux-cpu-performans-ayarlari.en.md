Title: CPU Power Management and Performance Settings on Arch Linux
Date: 2025-07-28 09:30
Modified: 2025-08-11 22:59
Category: Donanım
Tags: arch linux, cpupower, intel_pstate, cpu frekansı, güç yönetimi, i3wm, performans ayarı
Series: ArchLinuxCPU
Series_index: 1
Slug: arch-linux-cpu-performans-ayarlari
Authors: yuceltoluyag
Status: published
Summary: How to control CPU frequency and optimize power management with modern Intel processors on Arch Linux? Step-by-step configuration guide with cpupower and intel_pstate.
Template: article
Lang: en
Image: images/arch-linux-cpu-performans-ayarlari-xl.webp

## CPU Power Management and Performance Settings on Arch Linux

If you're using Arch Linux and especially staying away from desktop environments like GNOME or KDE and preferring lightweight solutions like i3wm, system performance control is entirely in your hands! 💪

In this article, I'm sharing in detail how I configured CPU power management on a system using **Intel i5-13400F processor, RTX 4060 Ti graphics card and i3wm**. Our goals are:
👉 Maximum performance
👉 Low power consumption
👉 Real-time frequency monitoring
👉 Desktop environment independent full control

---

## 🔍 Why CPU Power Management Matters?

Modern CPUs have extraordinary power, but using this power uncontrollably causes both heat increase and unnecessary energy consumption. That's why;

- System fans get louder 😤
- Battery life decreases (on laptops) 🔋
- Unnecessary heating occurs 🔥
- Performance drops due to throttling 🐌

Especially on Intel processor systems, the behavior of the `intel_pstate` driver, if not configured correctly, either keeps the processor at maximum speed constantly or responds very slowly.

[responsive_img src="/images/arch-linux-cpu-performans-ayarlari-xl.webp" alt="linux-cpu-performance-settings" /]

---

## 🧰 1. My System Hardware

The components of the system where I performed the configuration are as follows:

- 💻 **Intel i5-13400F** (10 cores: 6P+4E)
- 🎮 **Palit GeForce RTX 4060 Ti JetStream 16GB**
- 🧠 **16GB DDR5 6000MHz Team T-Force Vulcan RAM**
- 🔌 **Asus PRIME H610M-K DDR5 Motherboard**
- ❄️ **Thermalright Peerless Assassin 120 SE**
- 🖥️ **MSI G244PF E2 165Hz Monitor**

With this hardware, I wanted to achieve high performance while preventing unnecessary power consumption.

---

## 🛑 2. Status of `power-profiles-daemon` Service

In some Arch Linux installations (especially with GNOME or KDE), `power-profiles-daemon` is enabled by default. This service automatically manages the system's energy profiles.

To check its status:

```bash
systemctl status power-profiles-daemon.service
```

If this service is running and you're using a lightweight window manager (such as i3wm), it might be unnecessary. To disable it:

```bash
sudo systemctl disable --now power-profiles-daemon.service
```

---

## ⚙️ 3. Installing and Configuring `cpupower`

Now we need to install the `cpupower` tool that will allow us to manually manage CPU frequencies.

### Installation:

```bash
sudo pacman -S cpupower
```

### Configuration:

```bash
sudo nano /etc/default/cpupower
```

Remove the `#` sign at the beginning of the following lines in the file and edit the values as follows:

```bash
governor='performance'
min_freq="800MHz"
max_freq="3.3GHz"
```

> 💡 **Note:** Frequency limits can vary depending on your system. You can check with the `cpupower frequency-info` command.

### Enable the service:

```bash
sudo systemctl enable --now cpupower
sudo systemctl restart cpupower
```

---

## 📊 4. Frequency Information and Real-time Monitoring

To verify that the configuration is working:

```bash
cpupower frequency-info
```

Sample output:

```
driver: intel_pstate
available cpufreq governors: performance powersave
current policy: frequency should be within 800 MHz and 3.30 GHz.
```

To see core speeds every 10 seconds:

```bash
watch -n 10 "grep 'cpu MHz' /proc/cpuinfo"
```

🧠 **What is this for?**
You see some cores running at low frequencies and some at high frequencies. This is due to the dynamic power management of the `intel_pstate` driver.

---

## 🔍 5. Understanding the `intel_pstate` Driver

Modern Intel processors typically use `intel_pstate` as the default driver. With this driver;

- The processor can adjust its frequency instantly 🔄
- Even in "performance" mode, cores can drop when needed
- Boost frequencies are supported ⚡

### Alternative Drivers?

Some users may want to switch to the `acpi-cpufreq` driver to use managers like `schedutil`, `ondemand`, `conservative`. However, for 12th generation and newer processors, **`intel_pstate` is the best choice.**

---

## 🧱 6. Additional Tips for i3wm Users

If you're using i3wm instead of a desktop environment, you need to configure startup processes manually. To run the `cpupower` command automatically at every boot:

### Add to `.xprofile` File:

```bash
echo 'cpupower frequency-set -g performance' >> ~/.xprofile
```

or

### Create Systemd user service:

```ini
~/.config/systemd/user/cpupower.service
```

```ini
[Unit]
Description=Set cpupower governor
After=graphical.target

[Service]
Type=oneshot
ExecStart=/usr/bin/cpupower frequency-set -g performance

[Install]
WantedBy=default.target
```

Enable:

```bash
systemctl --user enable --now cpupower.service
```

---

## 🚀 7. Advanced Fine Tuning and Analysis Tools

### 7.1 Boost Frequency Status and Control

To check if the boost feature is on or off:

```bash
cat /sys/devices/system/cpu/cpufreq/boost
```

- `1` means boost is on
- `0` means boost is off

To turn it off if needed:

```bash
echo 0 | sudo tee /sys/devices/system/cpu/cpufreq/boost
```

> ⚠️ Boost should remain on for gaming or heavy workloads, otherwise performance may decrease.

---

### 7.2 Detailed Monitoring with `turbostat`

`Turbostat` shows CPU core frequencies, temperatures, and power states in real time.

Installation:

```bash
sudo pacman -S linux-tools
```

Running:

```bash
sudo turbostat
```

---

### 7.3 Power Consumption Analysis: `powertop` and `powerstat`

- `powertop` identifies the components consuming the most energy in the system and offers optimization suggestions.

```bash
sudo pacman -S powertop
sudo powertop
```

- `powerstat` is used to measure instantaneous watt consumption, especially useful for laptop users.

---

### 7.4 Dynamic Power Management: `auto-cpufreq`

Automatically sets the CPU governor based on load and battery status.

Installation (using AUR or yay):

```bash
yay -S auto-cpufreq
sudo auto-cpufreq --install
```

---

### 7.5 Forcing `intel_pstate` Driver with Grub Settings

If the `intel_pstate` driver is not active on the system, you can enable it by following these steps:

```bash
sudo nano /etc/default/grub
```

Add the following parameter to the `GRUB_CMDLINE_LINUX_DEFAULT` line:

```
intel_pstate=active
```

After saving the changes:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo reboot
```

---

### 7.6 Governor Mode Comparison

| Governor    | Description                | Use Case                            |
| ----------- | -------------------------- | ----------------------------------- |
| performance | Constant high frequency    | Gaming, rendering, high performance |
| powersave   | Constant low frequency     | Battery saving                      |
| schedutil   | Linked to kernel scheduler | Balanced, modern                    |
| ondemand    | Frequency increase by load | Older systems                       |

> With the `intel_pstate` driver, usually only `performance` and `powersave` modes are active.

---

### 7.7 Power Saving with TLP for Laptops

For laptop users, `tlp` optimizes the power consumption of components such as WiFi, USB, and disk.

Installation and startup:

```bash
sudo pacman -S tlp
sudo systemctl enable --now tlp
```

---

## 🔗 8. For Those Who Want to Continue

- **`turbostat`**: Real-time monitoring of CPU core frequencies, temperatures, power status, etc. Useful for detecting performance issues or heating problems.

- **`powertop`**: Shows which components consume how much energy throughout the system and offers suggestions for power saving.

- **`auto-cpufreq`**: Automatically adjusts the CPU frequency manager according to load and battery status, providing energy efficiency.

---

If you want, we can also add a screenshot or sample command output from turbostat. Adding visual support to the article increases the user experience.
If you have any other editing or addition requests, I'm happy to help!

## 📌 9. Common Issues and Solutions

| Issue                                                  | Solution                                                        |              |
| ------------------------------------------------------ | --------------------------------------------------------------- | ------------ | --- |
| `cpupower: command not found`                          | Install with `sudo pacman -S cpupower`                          |              |
| Another driver is being used instead of `intel_pstate` | Check driver with `dmesg                                        | grep pstate` |     |
| Frequencies seem unchanged                             | Monitor in real-time with `watch -n 1 "grep MHz /proc/cpuinfo"` |              |
| Battery drains quickly for laptop users                | Change to `governor='powersave'`                                |              |

---

## ✅ Conclusion

In this guide, I showed step by step how to configure effective CPU power management without using a desktop environment, just with the terminal and `cpupower` tool. On a modern system:

- Managing performance manually 🎯
- Monitoring frequencies in real-time 🔬
- Properly using the `intel_pstate` driver 🛠️
  such steps will make your system work more efficiently.
