Title: Guide: Using GhostMirror on Arch Linux
Date: 2025-08-13 09:30
Category: Linux
Tags: Arch Linux, mirror management, package synchronization, Python aracı, sistem optimizasyonu
Slug: ghostmirror-arch-linux-kullanimi
Authors: yuceltoluyag
Status: published
Summary: GhostMirror is an intelligent mirror repository management tool developed for Arch Linux users. It analyzes mirrors without manual intervention, detects errors, and creates optimal mirror lists.
Translation: true
Status: published
Template: article
Image: images/ghostmirror-arch-linux-kullanimi-xl.webp
Lang: en

## 1. Introduction 📌

As Arch Linux users, it's very important to keep our systems updated with fast and reliable package mirrors. However, sometimes package updates become invisible and we may encounter errors like "package not found" during updates. One of the most common reasons for this situation is that our local `mirrorlist` file contains outdated or unsynchronized mirrors.

This is where **GhostMirror** comes into play. GhostMirror is a powerful tool that allows Arch Linux users to automatically manage their mirror lists and easily find updated and fast mirrors. It also detects faulty or outdated mirrors and provides detailed analysis.

In this guide, you'll learn step by step what GhostMirror is, how to install and use it, and how it provides automatic mirror optimization on your system. This way, you can make your Arch Linux experience much smoother and faster.

[responsive_img src="/images/ghostmirror-arch-linux-kullanimi-xl.webp" alt="Using GhostMirror on Linux" /]

---

## 2. What is GhostMirror?

GhostMirror is a mirror control and management tool developed for Arch Linux users. Its main task is to analyze the mirrors in your system's `mirrorlist` file, detect outdated or faulty ones, and provide you with detailed reports.

Its main features:

- Shows whether mirrors are current by comparing their package databases with the local database.
- Lists in detail which mirrors are not synchronized, which packages are missing or outdated.
- Can sort mirrors based on criteria such as speed, ping and freshness.
- Can automatically update the mirror list with systemd service, eliminating the need for manual intervention.
- Can investigate and report the reasons for faulty mirrors (investigation mode).

💡 **Tip:** GhostMirror is an excellent helper for preventing mirror problems, especially in rapidly changing distributions like Arch Linux.

---

## 3. Installation

The easiest way to install GhostMirror on your Arch Linux system is to use AUR (Arch User Repository). If you have an AUR helper like yay, you can quickly install it with the following command:

```bash
yay -S ghostmirror
```

Alternatively, you can download the package file and compile it manually:

```bash
git clone https://aur.archlinux.org/ghostmirror.git
cd ghostmirror
makepkg -sirc
```

**Required dependencies:**

- libcurl
- zlib or zlib-ng
- systemd-libs

These dependencies usually come installed with Arch Linux, but if missing, you can install them with pacman.

---

## 4. Usage Modes

You can use GhostMirror in three different ways: **Manual**, **Automatic** and **Investigation**.

---

### 4.1 Manual Usage

In manual mode, you control and execute all steps yourself.

**Step 1:** Create a large and diverse mirror list:

```bash
ghostmirror -PoclLS Italy,Germany,France ./mirrorlist.new 30 state,outofdate,morerecent,ping
```

Here:

- `-P` provides progress and colorful output,
- `-o` provides table format output,
- `-c` selects countries,
- `-l` specifies output file,
- `-L` limits maximum mirror count,
- `-S` specifies sorting mode (faulty mirrors are removed, outdated mirrors are prioritized, ping-based prioritization is done).

**Step 2:** Test and optimize your created list in more detail:

```bash
ghostmirror -PmuolsS ./mirrorlist.new ./mirrorlist.new light state,outofdate,morerecent,extimated,speed
```

Here:

- `-m` uses local list,
- `-u` uses only active (non-commented) mirrors,
- `-s` performs speed test,
- `-S` changes sorting.

**Step 3:** Backup your old mirrorlist file and replace with the new one:

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
sudo cp ./mirrorlist.new /etc/pacman.d/mirrorlist
```

⚠️ **Warning:** Always backup the mirrorlist file before changing it!

---

### 4.2 Automatic Usage

You can use GhostMirror in automatic mode to keep your mirror list continuously updated with systemd timer.

**Preparation:**

First create the configuration directory:

```bash
mkdir -p ~/.config/ghostmirror
```

Then open the `/etc/pacman.conf` file and change the location of the mirror list as follows (with your username):

```
[core]
Include = /home/<username>/.config/ghostmirror/mirrorlist
[extra]
Include = /home/<username>/.config/ghostmirror/mirrorlist
```

**Creating first mirror list:**

```bash
ghostmirror -PoclLS Italy,Germany,France ~/.config/ghostmirror/mirrorlist 30 state,outofdate,morerecent,ping
```

**Enabling automatic update service:**

```bash
ghostmirror -PoDumlsS ~/.config/ghostmirror/mirrorlist ~/.config/ghostmirror/mirrorlist light state,outofdate,morerecent,extimated,speed
```

The `-D` option enables systemd timer and makes loginctl linger setting.

**Timer control:**

```bash
systemctl --user list-timers
```

**Manually starting service:**

```bash
systemctl --user start ghostmirror.service
```

Now GhostMirror will handle mirrorlist updates automatically.

---

### 4.3 Investigation Mode

To quickly detect if there are any problems with mirrors, you can use the following command:

```bash
ghostmirror -i error,outofdate
```

This mode lists faulty mirrors and explains possible reasons for the problem.

---

## 5. Important Parameters and Options

- `-c --country`: Performs country-based mirror selection.
- `-m --mirrorfile`: Uses local mirrorlist file.
- `-u --uncommented`: Uses only active (non-commented) mirrors.
- `-S --sort`: Determines mirror sorting modes. Example: `state,outofdate,ping`
- `-s --speed`: Selects speed test type. `light` (small package), `normal`, `heavy` (large package).
- `-l --list`: Specifies location where new mirrorlist file will be saved.
- `-D --systemd`: Activates automatic systemd timer mode.

💡 **Tip:** You can easily select the most suitable mirrors by combining speed test and ping results.

---

## 6. Tips and Best Practices

- Regularly check your mirrors with GhostMirror, especially before major updates.
- Make your work easier by running mirrorlist updates automatically in the background with automatic mode.
- You can create a wider and faster mirror pool by selecting multiple countries.
- You can automatically check at certain hours every day thanks to systemd timer.

---

## 7. Version History (Changelog)

GhostMirror has been regularly updated to improve performance and stability. Some important version notes:

- v0.13.1: Version error fixed.
- v0.12.1: Automatic version update improvements.
- v0.10.0: First mirror requirement removed, alternative mirror search added.
- v0.9.21: PKGBUILD and documentation updated.
- v0.8.0: Stability and speed improvements.

More detailed version notes and changes are available in the package.

---

## 8. Conclusion

Managing an updated and synchronized mirror list on Arch Linux is critically important for system stability and speed. GhostMirror is a powerful tool that automates this process, detects faulty mirrors, and increases performance.

Thanks to its manual and automatic modes, you can easily adapt it to your needs, thereby solving mirror problems encountered in package management from the root.

Now you can install and use GhostMirror to take your Arch Linux experience to the next level!

Don't forget to share your experiences and contribute to the community.

---

!!! tip "Tip: You can easily handle automatic mirror update operations with GhostMirror using systemd timer. This way, you'll be freed from manual operations."

## Example Outputs

```bash
[friday13@baba ~]$ ghostmirror -PoclLS Turkey,Albania,Bulgaria,Moldova,Serbia,Ukraine,Azerbaijan,Georgia,Germany,Greece,Romania,Russia ~/.config/ghostmirror/mirrorlist 30 state,outofdate,morerecent,ping
[100.0%] mirrors updates
┌──────────┬─────────────────────────────────────────────────────┬─────┬─────────┬─────────┬─────────┬──────────┬───────┬────────────┬─────────┬─────────┐
│ country  │                       mirror                        │proxy│  state  │outofdate│uptodate │morerecent│ retry │   speed    │  ping   │extimated│
├──────────┼─────────────────────────────────────────────────────┼─────┼─────────┼─────────┼─────────┼──────────┼───────┼────────────┼─────────┼─────────┤
│Russia    │https://ru.mirrors.cicku.me/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  21.9ms │   1gg   │
│Russia    │http://ru.mirrors.cicku.me/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  24.3ms │   1gg   │
│Germany   │https://de.mirrors.cicku.me/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  27.3ms │   1gg   │
│Germany   │http://de.mirrors.cicku.me/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  28.0ms │   1gg   │
│Bulgaria  │https://mirror.telepoint.bg/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  34.8ms │   1gg   │
│Bulgaria  │https://mirrors.uni-plovdiv.net/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  36.9ms │   1gg   │
│Romania   │https://mirrors.pidginhost.com/arch                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  37.5ms │   1gg   │
│Romania   │http://mirrors.pidginhost.com/arch                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  42.5ms │   1gg   │
│Bulgaria  │http://mirror.telepoint.bg/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  45.7ms │   1gg   │
│Bulgaria  │http://mirrors.uni-plovdiv.net/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  46.0ms │   1gg   │
│Turkey    │https://tr.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  53.0ms │   1gg   │
│Germany   │https://de.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  53.3ms │   1gg   │
│Germany   │http://mirror.23m.com/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  56.7ms │   1gg   │
│Germany   │http://de.arch.niranjan.co                           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  57.3ms │   1gg   │
│Germany   │https://mirror.23m.com/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  57.6ms │   1gg   │
│Germany   │http://ftp.fau.de/archlinux                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.0ms │   1gg   │
│Germany   │https://ftp.fau.de/archlinux                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.0ms │   1gg   │
│Germany   │https://mirrors.xtom.de/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.4ms │   1gg   │
│Germany   │http://mirrors.xtom.de/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.5ms │   1gg   │
│Azerbaijan│https://mirror.ourhost.az/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.9ms │   1gg   │
│Romania   │http://mirror.ro.cdn-perfprod.com/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  63.1ms │   1gg   │
│Germany   │http://arch.jensgutermuth.de                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.4ms │   1gg   │
│Germany   │http://mirror.fra10.de.leaseweb.net/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.5ms │   1gg   │
│Germany   │https://arch.jensgutermuth.de                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.7ms │   1gg   │
│Germany   │http://mirror.selfnet.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  70.1ms │   1gg   │
│Germany   │https://mirror.selfnet.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  70.3ms │   1gg   │
│Germany   │http://mirror.lcarilla.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  71.3ms │   1gg   │
│Germany   │https://mirror.moson.org/arch                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  73.3ms │   1gg   │
│Germany   │https://mirrors.n-ix.net/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  74.5ms │   1gg   │
│Germany   │https://ftp.halifax.rwth-aachen.de/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.2ms │   1gg   │
│Germany   │https://de.repo.c48.uk/arch                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.4ms │   1gg   │
│Germany   │http://ftp.halifax.rwth-aachen.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.6ms │   1gg   │
│Germany   │https://mirror.dogado.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  77.5ms │   1gg   │
│Germany   │https://mirror.metalgamer.eu/archlinux               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.3ms │   1gg   │
│Germany   │https://de.arch.mirror.kescher.at                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.6ms │   1gg   │
│Germany   │https://mirror.lcarilla.de/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.8ms │   1gg   │
│Moldova   │https://mirror.hosthink.net/arch                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.2ms │   1gg   │
│Germany   │https://mirrors.niyawe.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.9ms │   1gg   │
│Romania   │https://ro.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.9ms │   1gg   │
│Germany   │https://mirror.fra10.de.leaseweb.net/archlinux       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.0ms │   1gg   │
│Russia    │http://mirrors.powernet.com.ru/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.0ms │   1gg   │
│Romania   │http://ro.mirror.flokinet.net/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.2ms │   1gg   │
│Romania   │http://ro.arch.niranjan.co                           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.3ms │   1gg   │
│Germany   │http://mirror.moson.org/arch                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.3ms │   1gg   │
│Germany   │http://mirror.hugo-betrugo.de/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.4ms │   1gg   │
│Azerbaijan│http://mirror.ourhost.az/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.8ms │   1gg   │
│Russia    │https://web.sketserv.ru/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.9ms │   1gg   │
│Germany   │https://berlin.mirror.pkgbuild.com                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.3ms │   1gg   │
│Germany   │http://mirror.sunred.org/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.4ms │   1gg   │
│Russia    │http://web.sketserv.ru/archlinux                     │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │http://mirror.metalgamer.eu/archlinux                │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.8ms │   1gg   │
│Germany   │https://mirror.sunred.org/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.8ms │   1gg   │
│Germany   │https://mirror.hugo-betrugo.de/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.0ms │   1gg   │
│Germany   │http://mirrors.niyawe.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.0ms │   1gg   │
│Germany   │https://mirror.pseudoform.org                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.4ms │   1gg   │
│Germany   │https://archlinux.thaller.ws                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.8ms │   1gg   │
│Romania   │http://archlinux.mirrors.linux.ro                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.9ms │   1gg   │
│Germany   │https://dist-mirror.fem.tu-ilmenau.de/archlinux      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.2ms │   1gg   │
│Germany   │https://mirror.cmt.de/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.6ms │   1gg   │
│Germany   │https://de-nue.soulharsh007.dev/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.6ms │   1gg   │
│Romania   │https://mirror.ro.cdn-perfprod.com/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.7ms │   1gg   │
│Romania   │https://ro.mirror.flokinet.net/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  87.2ms │   1gg   │
│Germany   │https://files.hadiko.de/pub/dists/arch               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.0ms │   1gg   │
│Germany   │http://mirror.ubrco.de/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.2ms │   1gg   │
│Germany   │https://mirror.ubrco.de/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.5ms │   1gg   │
│Romania   │http://mirrors.hosterion.ro/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.1ms │   1gg   │
│Russia    │https://mirror3.sl-chat.ru/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.8ms │   1gg   │
│Germany   │http://mirror.cmt.de/archlinux                       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.9ms │   1gg   │
│Romania   │https://mirrors.hosterion.ro/archlinux               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.0ms │   1gg   │
│Russia    │https://mirror2.sl-chat.ru/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.1ms │   1gg   │
│Germany   │https://packages.oth-regensburg.de/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.7ms │   1gg   │
│Germany   │http://packages.oth-regensburg.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.9ms │   1gg   │
│Germany   │https://arch.unixpeople.org                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  91.2ms │   1gg   │
│Germany   │https://arch.kurdy.org                               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  95.0ms │   1gg   │
│Germany   │http://mirrors.purring.online/arch                   │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  96.4ms │   1gg   │
│Germany   │https://pkg.fef.moe/archlinux                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.2ms │   1gg   │
│Russia    │http://mirror.nw-sys.ru/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.5ms │   1gg   │
│Moldova   │https://md.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.8ms │   1gg   │
│Russia    │https://mirror.nw-sys.ru/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  99.1ms │   1gg   │
│Germany   │http://archlinux.thaller.ws                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 103.0ms │   1gg   │
│Germany   │https://mirrors.purring.online/arch                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 107.0ms │   1gg   │
│Moldova   │http://mirror.hosthink.net/arch                      │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Ukraine   │http://repo.hyron.dev/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 113.0ms │   1gg   │
│Ukraine   │https://mirror.hostiko.network/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 115.0ms │   1gg   │
│Ukraine   │https://repo.hyron.dev/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Moldova   │http://mirror.ihost.md/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Russia    │http://repository.su/archlinux                       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Russia    │https://repository.su/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Moldova   │https://mirror.ihost.md/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 123.0ms │   1gg   │
│Ukraine   │http://mirror.hostiko.network/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 124.0ms │   1gg   │
│Germany   │http://mirror.informatik.tu-freiberg.de/arch         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://mirror.informatik.tu-freiberg.de/arch        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://archlinux.mirror.iphh.net                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://mirrors.n-ix.net/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://arch.phinau.de                                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://arch.phinau.de                               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Turkey    │http://mirror.nucc.tr/arch                           │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  27.9ms │   1gg   │
│Turkey    │https://mirror.timtal.com.tr/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  29.4ms │   1gg   │
│Turkey    │http://mirror.timtal.com.tr/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  30.3ms │   1gg   │
│Romania   │https://mirrors.nxthost.com/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  36.0ms │   1gg   │
│Turkey    │https://mirror.nucc.tr/arch                          │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  36.5ms │   1gg   │
│Romania   │http://mirrors.nxthost.com/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  37.0ms │   1gg   │
│Romania   │http://mirrors.chroot.ro/archlinux                   │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  49.3ms │   1gg   │
│Germany   │https://mirror.netcologne.de/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  60.4ms │   1gg   │
│Germany   │http://mirror.as20647.net/archlinux                  │true │success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  66.4ms │   1gg   │
│Germany   │https://mirror.ipb.de/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  66.8ms │   1gg   │
│Germany   │http://mirror.ipb.de/archlinux                       │true │success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  67.1ms │   1gg   │
│Germany   │https://mirror.as20647.net/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  67.2ms │   1gg   │
│Romania   │https://mirrors.chroot.ro/archlinux                  │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  68.6ms │   1gg   │
│Germany   │http://ftp.spline.inf.fu-berlin.de/mirrors/archlinux │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  75.5ms │   1gg   │
│Germany   │https://ftp.spline.inf.fu-berlin.de/mirrors/archlinux│false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  75.6ms │   1gg   │
│Romania   │http://mirrors.nav.ro/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  77.1ms │   1gg   │
│Ukraine   │http://distrohub.kyiv.ua/archlinux                   │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  77.9ms │   1gg   │
│Ukraine   │https://distrohub.kyiv.ua/archlinux                  │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  79.3ms │   1gg   │
│Germany   │https://archlinux.richard-neumann.de                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.4ms │   1gg   │
│Germany   │http://linux.rz.rub.de/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │http://mirrors.aminvakil.com/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.7ms │   1gg   │
│Germany   │http://mirror.pagenotfound.de/archlinux              │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  86.4ms │   1gg   │
│Germany   │http://mirror.netcologne.de/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  87.7ms │   1gg   │
│Germany   │https://mirrors.aminvakil.com/archlinux              │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  90.9ms │   1gg   │
│Romania   │http://mirror.efect.ro/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  94.4ms │   1gg   │
│Germany   │http://ftp.gwdg.de/pub/linux/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  95.6ms │   1gg   │
│Romania   │https://mirror.efect.ro/archlinux                    │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  95.7ms │   1gg   │
│Germany   │https://mirror.bethselamin.de                        │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  99.0ms │   1gg   │
│Germany   │https://mirror.pagenotfound.de/archlinux             │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 103.0ms │   1gg   │
│Greece    │http://ftp.otenet.gr/linux/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 106.0ms │   1gg   │
│Russia    │http://archlinux.gay/archlinux                       │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 109.0ms │   1gg   │
│Ukraine   │http://mirror.mirohost.net/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Azerbaijan│http://mirror.yer.az/archlinux                       │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Azerbaijan│https://mirror.yer.az/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Russia    │https://archlinux.gay/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 111.0ms │   1gg   │
│Ukraine   │https://mirror.mirohost.net/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 132.0ms │   1gg   │
│Georgia   │http://archlinux.grena.ge                            │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Georgia   │https://archlinux.grena.ge                           │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Greece    │http://ftp.cc.uoc.gr/mirrors/linux/archlinux         │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Russia    │http://mirror.kpfu.ru/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Russia    │https://mirror.kpfu.ru/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://mirror.wtnet.de/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  69.2ms │   1gg   │
│Germany   │https://mirror.wtnet.de/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  69.8ms │   1gg   │
│Germany   │http://ftp.hosteurope.de/mirror/ftp.archlinux.org    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  77.2ms │   1gg   │
│Serbia    │https://mirror1.sox.rs/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  82.2ms │   1gg   │
│Serbia    │http://mirror1.sox.rs/archlinux                      │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  83.5ms │   1gg   │
│Ukraine   │http://archlinux.ip-connect.vn.ua                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  95.5ms │   1gg   │
│Ukraine   │https://archlinux.ip-connect.vn.ua                   │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  95.6ms │   1gg   │
│Russia    │http://mirror.yandex.ru/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Russia    │https://mirror.yandex.ru/archlinux                   │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Moldova   │https://mirror.mangohost.net/archlinux               │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 126.0ms │   1gg   │
│Moldova   │http://mirror.mangohost.net/archlinux                │true │success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 130.0ms │   1gg   │
│Russia    │https://mirror.truenetwork.ru/archlinux              │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 131.0ms │   1gg   │
│Russia    │http://mirror.truenetwork.ru/archlinux               │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 132.0ms │   1gg   │
│Russia    │http://mirror.kamtv.ru/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 224.0ms │   1gg   │
│Russia    │https://mirror.kamtv.ru/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 225.0ms │   1gg   │
│Turkey    │http://ftp.linux.org.tr/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://arch.owochle.app                              │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://arch.owochle.app                             │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://ftp.uni-hannover.de/archlinux                 │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Greece    │https://repo.greeklug.gr/data/pub/linux/archlinux    │false│success  │   0.05% │  99.95% │   0.00%  │   0   │   0.0MiB/s │ 104.0ms │   1gg   │
│Germany   │http://ftp-stud.hs-esslingen.de/pub/Mirrors/archlinux│false│success  │   0.07% │  99.93% │   0.00%  │   0   │   0.0MiB/s │  69.2ms │   1gg   │
│Serbia    │http://mirror.pmf.kg.ac.rs/archlinux                 │false│success  │   0.07% │  99.93% │   0.00%  │   0   │   0.0MiB/s │  76.8ms │   1gg   │
│Germany   │http://ftp.agdsn.de/pub/mirrors/archlinux            │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  68.3ms │   1gg   │
│Bulgaria  │http://mirror.host.ag/archlinux                      │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  74.7ms │   1gg   │
│Germany   │https://ftp.agdsn.de/pub/mirrors/archlinux           │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  89.4ms │   1gg   │
│Romania   │https://mirrors.hostico.ro/archlinux                 │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │ 115.0ms │   1gg   │
│Romania   │http://mirrors.hostico.ro/archlinux                  │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │ 118.0ms │   1gg   │
│Germany   │http://ftp.uni-bayreuth.de/linux/archlinux           │false│success  │   0.19% │  99.81% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://mirrors.janbruckner.de/archlinux             │false│success  │   6.69% │  93.31% │   0.00%  │   0   │   0.0MiB/s │  83.8ms │   1gg   │
│Germany   │http://mirrors.janbruckner.de/archlinux              │false│success  │   6.69% │  93.31% │   0.00%  │   0   │   0.0MiB/s │  90.4ms │   1gg   │
│Germany   │http://ftp.uni-kl.de/pub/linux/archlinux             │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │  95.9ms │   1gg   │
│Germany   │http://mirror.clientvps.com/archlinux                │true │success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │ 106.0ms │   1gg   │
│Germany   │https://mirror.clientvps.com/archlinux               │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │ 117.0ms │   1gg   │
│Germany   │http://ftp.tu-chemnitz.de/pub/linux/archlinux        │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://artfiles.org/archlinux.org                    │false│success  │   6.82% │  93.18% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │https://mirror.kumi.systems/archlinux                │false│success  │  29.57% │  70.28% │   0.00%  │   0   │   0.0MiB/s │  80.8ms │   1gg   │
│Germany   │http://mirror.kumi.systems/archlinux                 │false│success  │  29.57% │  70.28% │   0.00%  │   0   │   0.0MiB/s │  81.2ms │   1gg   │
│Germany   │http://os.codefionn.eu/archlinux                     │false│success  │  43.02% │  56.60% │   0.00%  │   0   │   0.0MiB/s │  72.2ms │   1gg   │
│Germany   │https://os.codefionn.eu/archlinux                    │false│success  │  43.02% │  56.60% │   0.00%  │   0   │   0.0MiB/s │  73.5ms │   1gg   │
│Germany   │https://archlinux.homeinfo.de                        │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  76.7ms │   1gg   │
│Albania   │http://al.arch.niranjan.co                           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  77.1ms │   1gg   │
│Albania   │https://al.arch.niranjan.co                          │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 101.0ms │   1gg   │
│Moldova   │http://md.mirrors.hacktegic.com/archlinux            │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 111.0ms │   1gg   │
│Moldova   │https://md.mirrors.hacktegic.com/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 139.0ms │   1gg   │
│Ukraine   │http://mirrors.nix.org.ua/linux/archlinux            │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │https://mirrors.nix.org.ua/linux/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │http://mirrors.reitarovskyi.tech/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │https://mirrors.reitarovskyi.tech/archlinux          │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
└──────────┴─────────────────────────────────────────────────────┴─────┴─────────┴─────────┴─────────┴──────────┴───────┴────────────┴─────────┴─────────┘
```

- Speed,Update,DB comparison

```bash
[friday13@baba ~]$ ghostmirror -PoDumlsS  ~/.config/ghostmirror/mirrorlist ~/.config/ghostmirror/mirrorlist light state,outofdate,morerecent,extimated,speed
[100.0%] mirrors updates
[100.0%] mirrors speed
┌──────────┬─────────────────────────────────────────────┬─────┬─────────┬─────────┬─────────┬──────────┬───────┬────────────┬─────────┬─────────┐
│ country  │                   mirror                    │proxy│  state  │outofdate│uptodate │morerecent│ retry │   speed    │  ping   │extimated│
├──────────┼─────────────────────────────────────────────┼─────┼─────────┼─────────┼─────────┼──────────┼───────┼────────────┼─────────┼─────────┤
│Germany   │https://ftp.halifax.rwth-aachen.de/archlinux │false│success  │   0.00% │  99.99% │   0.01%  │   0   │   2.1MiB/s │  75.4ms │   1gg   │
│Germany   │https://de.mirrors.cicku.me/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  24.4ms │  10gg   │
│Germany   │http://de.arch.niranjan.co                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  53.4ms │  10gg   │
│Germany   │http://mirrors.xtom.de/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  62.4ms │  10gg   │
│Germany   │http://mirror.23m.com/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  56.6ms │  10gg   │
│Germany   │https://de.arch.niranjan.co                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  69.4ms │  10gg   │
│Germany   │http://mirror.lcarilla.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  79.8ms │  10gg   │
│Germany   │https://mirrors.xtom.de/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  90.6ms │  10gg   │
│Russia    │http://ru.mirrors.cicku.me/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  21.6ms │  10gg   │
│Turkey    │https://tr.arch.niranjan.co                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  53.9ms │  10gg   │
│Germany   │http://ftp.fau.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  62.0ms │  10gg   │
│Germany   │https://mirror.23m.com/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  56.3ms │  10gg   │
│Azerbaijan│https://mirror.ourhost.az/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  63.0ms │  10gg   │
│Romania   │http://mirrors.pidginhost.com/arch           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  37.1ms │  10gg   │
│Germany   │https://ftp.fau.de/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  62.0ms │  10gg   │
│Germany   │https://mirror.selfnet.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  70.3ms │  10gg   │
│Germany   │http://arch.jensgutermuth.de                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  68.9ms │  10gg   │
│Germany   │https://mirror.moson.org/arch                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  74.1ms │  10gg   │
│Germany   │https://arch.jensgutermuth.de                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  69.2ms │  10gg   │
│Russia    │https://ru.mirrors.cicku.me/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.2MiB/s │  21.9ms │  10gg   │
│Germany   │http://mirror.selfnet.de/archlinux           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.2MiB/s │  94.7ms │  10gg   │
│Germany   │https://mirrors.n-ix.net/archlinux           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.1MiB/s │  75.2ms │  10gg   │
│Bulgaria  │http://mirror.telepoint.bg/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.6MiB/s │  34.4ms │   9gg   │
│Bulgaria  │http://mirrors.uni-plovdiv.net/archlinux     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.6MiB/s │  41.5ms │   9gg   │
│Germany   │http://de.mirrors.cicku.me/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  26.0ms │   9gg   │
│Bulgaria  │https://mirrors.uni-plovdiv.net/archlinux    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  45.2ms │   9gg   │
│Bulgaria  │https://mirror.telepoint.bg/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  34.7ms │   9gg   │
│Romania   │http://mirror.ro.cdn-perfprod.com/archlinux  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.1MiB/s │  73.9ms │   9gg   │
│Germany   │http://mirror.fra10.de.leaseweb.net/archlinux│false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   1.7MiB/s │  68.2ms │   5gg   │
│Romania   │https://mirrors.pidginhost.com/arch          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   1.7MiB/s │  42.9ms │   5gg   │
└──────────┴─────────────────────────────────────────────┴─────┴─────────┴─────────┴─────────┴──────────┴───────┴────────────┴─────────┴─────────┘
```

- Systemd Timer

```bash
[friday13@baba ~]$ systemctl --user list-timers
NEXT LEFT LAST                         PASSED UNiT              ACTiVATES
-       - Wed 2025-08-13 01:41:07 +03 32s ago ghostmirror.timer ghostmirror.service

1 timers listed.
Pass --all to see loaded but inactive timers, too.
```