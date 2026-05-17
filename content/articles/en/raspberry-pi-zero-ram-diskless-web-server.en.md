Title: Throw Away the Disks: Hosting a Website Entirely on RAM with Raspberry Pi Zero
Date: 2026-05-11 00:05
Category: Linux
Tags: raspberry pi, pi zero, alpine linux, ram, diskless, self-hosting
Slug: raspberry-pi-zero-ram-diskless-web-server
Authors: yuceltoluyag
Summary: A crazy guide on how to turn a Pi Zero with 512MB RAM into a completely diskless Alpine Linux server and host a website on it.
Image: images/raspberry-pi-zero-ram-diskless-web-server-xl.webp
Lang: en
Status: published

If you have a Raspberry Pi Zero (v1.3 or W) in your hand, you actually have the most durable micro server in the world. Of course, only if you use the SD card just for "booting" and run the rest of the system entirely on RAM. Today, we are setting up an Alpine Linux-based static web server that runs diskless and fits inside only 512MB of RAM.

SD cards die, write limits end, but RAM (if there is electricity) never gets tired. Let's dive into the details of this madness from our Arch Linux terminal.

## 💾 Step 1: Preparing the SD Card on Arch Linux

Sources usually explain this on macOS, but we will handle our work in the Arch terminal with `fdisk` with surgical precision. I assume your SD card is `/dev/sdX` (be careful not to blow up the wrong disk!).

```bash
yuceltoluyag@archlinux:~$ sudo fdisk /dev/sdX
# Create a new partition table with 'o', and a new partition with 'n' (for FAT32).
# Don't forget to make its type 'b' (W95 FAT32).

yuceltoluyag@archlinux:~$ sudo mkfs.vfat -F 32 -n ALPINE /dev/sdX1
yuceltoluyag@archlinux:~$ sudo mount /dev/sdX1 /mnt
yuceltoluyag@archlinux:~$ sudo tar xzf alpine-rpi-*.tar.gz -C /mnt
yuceltoluyag@archlinux:~$ sudo umount /mnt
```

Insert the card into the Pi Zero, connect the keyboard and monitor, and power it up. Log in as `root` without a password.

## 🧠 Step 2: Alpine Linux Diskless Mode and lbu

When the Pi boots, everything is in RAM, but in order for your changes to be persistent, we must set up Alpine's `lbu` (Local Backup) tool.

```bash
Friday13-Zero:~# setup-lbu mmcblk0p1
Friday13-Zero:~# mkdir -p /media/mmcblk0p1/cache
Friday13-Zero:~# setup-apkcache /media/mmcblk0p1/cache
```

Now we give the real magic command: `setup-alpine`.

!!! danger "Critical Choice!"
    During the installation, when the **"Disk"** selection comes, you must absolutely say **"none"**. This prevents the operating system from being installed on the SD card and loads the system entirely into the RAM (tmpfs). Choose `dropbear` as SSH because OpenSSH would be a luxury in our limited RAM.

## 🌐 Step 3: Server Installation and Automation

We will use `darkhttpd` as the web server. It is lightweight, fast, and exactly suited for the Pi Zero.

```bash
Friday13-Zero:~# apk add darkhttpd
Friday13-Zero:~# mkdir -p /var/www/localhost/htdocs
```

To have the system start the server on every boot, create the `/etc/init.d/darkhttpd` file with the following content:

```bash
#!/sbin/openrc-run
description="darkhttpd static web server"
command="/usr/bin/darkhttpd"
command_args="/var/www/localhost/htdocs --port 80 --maxconn 20"
command_background=true
pidfile="/run/darkhttpd.pid"

depend() {
    need net
}
```

Authorize the script and add it to the startup:
```bash
Friday13-Zero:~# chmod +x /etc/init.d/darkhttpd
Friday13-Zero:~# rc-update add darkhttpd default
Friday13-Zero:~# rc-service darkhttpd start
```

## 💾 Step 4: Ensuring Persistence (lbu commit)

Everything is working right now, but if the electricity goes out, everything will be deleted. We must add the script and web folder we just created to Alpine's backup list:

```bash
Friday13-Zero:~# lbu include /etc/init.d/darkhttpd
Friday13-Zero:~# lbu include /var/www
Friday13-Zero:~# lbu commit -d
```

The `lbu commit -d` command packages these changes currently in RAM and writes them as an `apkovl` file to that small FAT32 partition on the SD card.

---

## 🛠️ Troubleshooting and Critical Checks

Before finishing the post, check these "must-haves" for the system to work:

1.  **Outer World Access:** Is the `socat` tunnel on the VPS working? (e.g., `socat TCP-LISTEN:80,fork,reuseaddr TCP:HOME_IP:80 &`)
2.  **RAM Usage:** Make sure that the `/` (root) directory appears as `tmpfs` when you run the `df -h` command.
3.  **Persistence Test:** Perform a `reboot` once. If the `darkhttpd` service does not start automatically or your files inside `/var/www` are missing, it means you have done the `lbu include` step wrong.

If you want to backup the system, run this command from your Arch machine while the Pi is on:
```bash
yuceltoluyag@archlinux:~$ ssh root@pi-ip "dd if=/dev/mmcblk0 bs=4M" > zero-full-backup.img
```

That's it! A whole world inside 512MB RAM. This is exactly the physical embodiment of the "efficiency" philosophy I mentioned in my [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/) article, kardaş.

Farewell, may your RAM be plentiful!

---

## 🔗 Related Posts
- [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/)
- [WireGuard from Arch Linux to MikroTik: DNS Trouble and Clean Setup](/en/arch-linux-mikrotik-wireguard-kurulumu/)
- [My Trial with PNG Files: Mogrify and Those Annoying Chunk Errors](/en/png-mogrify-chunk-hatalari-cozumu/)
