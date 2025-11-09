Title: How to Set Up Raspberry Pi
Date: 2025-04-24 12:00
Modified: 2025-08-11 22:59
Category: Donanım
Tags: raspberry pi, raspberry pi kurulumu, microSD kart, ssh ayarları, statik ip
Slug: raspberry-pi-nasil-kurulur
Authors: yuceltoluyag
Status: published
Summary: How to set up Raspberry Pi step by step? You can find all the details from preparing the microSD card to remote connection via SSH in this guide.
Template: article
Image: images/raspberry-pi-nasil-kurulur-xl.webp
Lang: en

## How to Set Up Raspberry Pi? 🛠️

Being a powerful, cheap and flexible mini computer, **Raspberry Pi** can be used in many areas from hobby projects to professional applications. So, how do you set up this device when you first get it? 🤔

In this guide, **Raspberry Pi setup** is explained step by step. You will find everything you need from preparing the microSD card to remote connection via SSH.

---

## 📦 Required Hardware

You will need the following hardware to set up Raspberry Pi:

- Raspberry Pi (Pi 3 Model B was used in this guide)
- microSD card (at least 8GB, preferably Class 10)
- microSD card reader (adapter may be needed if not on your computer)
- Computer (to prepare microSD card)
- HDMI cable, monitor, keyboard
- Ethernet cable (or Wi-Fi)
- microUSB power cable (standard Android charger)

If all this hardware is ready, let's start. 👇

---

## 💾 Preparing the microSD Card

Great, now I'm continuing with **Step 1: Flash Your microSD Card** section:

---

## Step 1: Flash Your microSD Card

1. Insert your microSD card into your computer.
2. Download and install the [Etcher](https://www.balena.io/etcher/){: target="_blank" rel="noopener noreferrer"} application.
3. Download the [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest){: target="_blank" rel="noopener noreferrer"} version and extract the zip file. This version is a very lightweight Raspbian version that runs only with the command line and has no desktop interface. The file size is approximately 351MB (November 2018 version), so it will download quickly.
4. Open Etcher, select the `.img` file of the Raspbian operating system you extracted, and show your microSD card as the target. Then click the **Flash** button and wait for the process to complete. If you are using Windows, some Explorer windows may open during the process, you can ignore them.
5. After the process is complete, **eject** your microSD card and disconnect it from your computer.
6. **Make sure your Raspberry Pi is off.** Insert the flashed microSD card into your Pi.
7. Connect your keyboard, monitor (via HDMI port) and Ethernet cable to your Raspberry Pi. Finally, plug in the power cable. Raspberry Pi will automatically turn on.

---

## Step 2: Configuring Raspberry Pi

1. When you see the `raspberrypi login:` message and a blinking cursor at the bottom of the screen, type the following as your username:

```bash
pi
```

Press Enter. Then enter the default password:

```bash
raspberry
```

We will change this password shortly.

2. Now type the following command for system updates:

```bash
sudo apt update
```

This command renews where Raspbian gets its updates from. `apt` is a package manager. `sudo` means "super-user do"; that is, you are running this command with administrator privileges.  
You may have seen `apt-get` before, but `apt` is a newer and more user-friendly version. Wait for the command to complete.

3. When you see the `pi@raspberrypi:~ $` output on the screen again, the update process is complete. Now enter the following command:

```bash
sudo apt full-upgrade
```

When asked

```bash
y
```

type and press Enter. This process may take a while, but you can watch the progress bar at the bottom of the screen.

4. After the updates are complete, run the following cleanup commands:

```bash
sudo apt autoremove && sudo apt clean
```

These commands remove unnecessary packages and free up memory. The `&&` sign allows you to combine multiple commands in a single line.

5. Now type the following command to open the configuration screen:

```bash
sudo raspi-config
```

A blue graphical screen will open. You can navigate the menu with the arrow keys and make selections with the Enter key. Select the `8 Update` option and press Enter to update the configuration tool.

6. After waiting a few seconds, scroll down to the `4. Localisation Options` option and press Enter. Then press Enter again to change the locale settings.  
   Scroll down to find the `en_GB.UTF-8 UTF-8` option, if it is selected, deselect it with the spacebar.  
   Continue and find the `en_US.UTF-8 UTF-8` option and mark it with the spacebar. Then press Enter to complete the process. Press Enter again to make the `en_US.UTF-8` option the default. Then you will be returned to the `raspi-config` screen.

7. Enter the `4. Localisation Options` menu again. This time select the `I2 Change Timezone` option.  
   First select your continent, then your city. For example, I choose `America/Toronto`. If you are in the USA, you can select your region from under `US`.

8. Enter the `Localisation Options` menu again and this time select the `I3 Change Keyboard Layout` option to set the keyboard layout.  
   I am using a `Dell USB Multimedia Keyboard`. Select your own keyboard. If you are in England, you can select the default layout. If not, go to `Other` and select your keyboard language.  
   Then select the version of the keyboard layout. If you are not sure, prefer the first option. Also skip the Alt-Gr key and Compose Key options with Enter - you won't need them right now.

9. Finally, enter the `Localisation Options` menu again and select the `I4 Change Wi-fi Country` option.  
   This is **very important**, because using wireless settings that are not appropriate for the country you are in can cause legal problems. Select your country and press Enter. Press Enter again when the `<Ok>` message appears.

10. Now scroll down to the `7. Advanced Options` menu and select the `A1 Expand Filesystem` option.  
    This process allows Raspberry Pi to use the entire SD card.

11. To change the user password, enter the `1 Change User Password` option. Follow the instructions on the screen to set your new password.  
    Finally, press the right arrow key twice to go to the `<Finish>` option and press Enter.

12. Now go to the `2 Network Options` menu and select the `N1 Hostname` option. Give your Raspberry Pi a name. After making the settings, the system will restart. Wait for the restart process to complete.

---

## Step 3: Customizing Raspberry Pi

1. When your Raspberry Pi restarts, log in again:

```bash
pi
```

Then type the password you just set and press Enter.

2. To remove the rainbow screen that appears at startup, enter the following command:

```bash
sudo nano /boot/config.txt
```

Nano is an easy-to-use text editor in Linux. Scroll to the bottom with the arrow keys and add the following line:

```bash
disable_splash=1
```

Press Ctrl+X to exit, then press `y` to save the changes.

3. Restart your Raspberry Pi. Now the rainbow effect will not appear on the startup screen.  
   If you want to see it again in the future, you can go back to the `/boot/config.txt` file and delete this line.

4. You just edited a file with `nano`. Now we will edit the `/etc/motd` file. This file determines the "message of the day" that appears on the screen when you log in:

```bash
sudo nano /etc/motd
```

If you just type `nano`, you cannot edit the file, `sudo` is required.  
When the cursor is at the beginning of the file, press `Ctrl+^`, scroll to the bottom with the arrow keys. This selects all the text. Then delete the selection with `Ctrl+K`.  
When the file is empty, write the message you want to see at login. To save and exit, press `Ctrl+X` then `y`.

5. Now press `Ctrl+D` to log out of the session.  
   When you log in again, you will see the message you just wrote.

6. Finally, set a password for the root user:

```bash
sudo passwd
```

---

## Step 4: SSH Installation

SSH allows you to connect to Raspberry Pi remotely via terminal (command line) from another device. First, you need to assign a static IP address to Pi.

1. Learn Raspberry Pi's local IP address:

```bash
ip -4 a | grep global
```

You may get an output like this:

```bash
inet 192.168.2.10/24 brd 10.1.1.255 scope global eth0
```

Here `192.168.2.10` is Pi's local IP address. `/24` shows the size of the network, it is 24 for most home networks. Note down the IP address.

2. Learn the modem's (router) local IP address:

```bash
ip route | grep default
```

You will see something like this:

```bash
default via 192.168.2.1 dev eth0 src 192.168.2.10 metric 202
```

In my example `192.168.2.1` is the modem IP. Yours may be different, note it down too.

3. Find the DNS server address:

```bash
cat /etc/resolv.conf
```

Sample output:

```bash
# Generated by resolvconf
domain home
nameserver 192.168.2.1
nameserver XXX.XXX.XXX.XXX
```

The address on the first `nameserver` line is usually the same as the router IP. If it is different, note it down too.

4. Edit the `dhcpcd.conf` file to fix the IP address:

```bash
sudo nano /etc/dhcpcd.conf
```

In the opened file, go to the `# Example static IP configuration` line and edit as follows:

```bash
interface eth0
static ip_address=192.168.2.10/24
static routers=192.168.2.1
static domain_name_servers=192.168.2.1
```

Update these addresses according to your network information.  
Ctrl+X → `y` → Enter to save and exit, then restart Raspberry Pi.

5. Enable the SSH service:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```

Now restart again:

```bash
sudo reboot
```

6. To connect to Raspberry Pi from another computer, open terminal on that computer:  
   (Terminal on Linux/Mac, `cmd` on Windows)

7. Establish SSH connection with the following command:

```bash
ssh pi@192.168.2.10
```

Here `192.168.2.10` is your Pi's IP address. At the first connection, type `yes` to continue.

8. Write Pi's password and press Enter.  
   If successful, the login message (MOTD) will appear and now you can control Raspberry Pi from your own computer via command line.  
   From now on, you can remove the screen and keyboard from Raspberry Pi and manage it remotely!

---

## 📌 Conclusion and Summary

- microSD card preparation
- Raspberry Pi initial configuration
- Localization and user settings
- Establishing remote connection via SSH

In this article, we covered all the steps you need for **Raspberry Pi setup** in detail:
💡

[responsive_img src="/images/raspberry-pi-nasil-kurulur-xl.webp" alt="how-to-set-up-raspberry-pi" /]