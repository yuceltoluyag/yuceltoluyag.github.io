Title: AnyDesk Installation on Arch Linux: Why This Instead of RustDesk?
Date: 2025-11-30 11:45
Category: Geliştirme Araçları
Tags: arch linux, anydesk, aur, yay, rustdesk, uzak masaüstü
Slug: arch-linux-anydesk-kurulumu-rehberi
Authors: yuceltoluyag
Summary: The heart wants RustDesk, but companies and relatives say AnyDesk. How do we bow to social pressure and install AnyDesk on Arch Linux as smoothly as possible?
Image: images/arch-linux-anydesk-kurulumu-rehberi-xl.webp
toot: https://mastodon.social/@yuceltoluyag/116592056165025421
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3mm3cr6cfts2k
Lang: en
Status: published


I know, you're going to ask in the comments (or to yourself): *"Hey, why closed-source AnyDesk when there's **RustDesk**, which is beautifully open-source and self-hostable?"*

The answer is simple and painful: **Peer Pressure.**

The IT department at work, the distant cousin, the accountant... It's as if they've all received a revelation to use AnyDesk. When TeamViewer frustrated us all by saying "Commercial use detected, I'm kicking you out," everyone migrated to AnyDesk collectively instead of switching to RustDesk. No matter how much you say, "Look, this is free software," institutions and end-users don't change their habits.

So, as someone who uses Arch Linux, I find myself forced to install AnyDesk in scenarios where I can't say "We use RustDesk" (which is 99% of the time).

So, how do we install this "necessity" tool in the cleanest, most up-to-date, and trouble-free way on Arch Linux, now that the Flatpak version is dead (EOL)? Let's install this mandatory tool.

## Step 1: The Power of AUR and YAY (Yet Another Yogurt)

AnyDesk is not in the official repositories. The Flatpak version is also unmaintained. We have one and the most powerful fortress left: **AUR (Arch User Repository).**

To use AUR, we need a helper like `yay`. If you already have it on your system, skip this step. If not, open the terminal and install it with these commands:

```bash
sudo pacman -S --needed git base-devel
# Run without root:
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si
```

## Step 2: Download and Install AnyDesk

We won't bother compiling from source; we'll install the pre-compiled binary package (`anydesk-bin`) for speed.

```bash
yay -S anydesk-bin
```

If it asks questions during installation, you can just press `Enter`. Fast and clean.

## Step 3: The Wayland Deadlock (Connection Issue!)

Here is the technical and annoying part. Modern Linux distributions (Gnome, KDE, etc.) now use **Wayland** by default. However, AnyDesk still doesn't work at full efficiency with Wayland.

Especially if you're telling the other party, "Don't touch anything, I'll connect and handle it" (Unattended Access), Wayland will give you a nightmare. The screen won't appear, the mouse won't work, permission windows will pop up...

Therefore, if you want a trouble-free connection, you have to use **X11 (Xorg)**.

### Solution for Gnome Users:

We will edit the GDM configuration file and disable Wayland:

```bash
sudo nano /etc/gdm/custom.conf
```

Uncomment the following line under the `[daemon]` heading by removing the `#` at the beginning:

```ini
[daemon]
WaylandEnable = false
```

### For KDE and Others:

When turning on the computer, make sure to select **"Plasma (X11)"** or the X11 version of the desktop environment you use as the session type on the password screen.

## Step 4: Start the Service and Forget

We installed AnyDesk, but if the service isn't running, you won't get an ID or you'll get a "Connecting to network" error. Let's start the service and make it run automatically at every boot:

```bash
sudo systemctl enable --now anydesk
```

The process is complete! For a clean start, perform a `reboot`.

```bash
sudo reboot
```

## Conclusion

Yes, even though our hearts are with RustDesk, the realities of life sometimes force us to install AnyDesk. Now your Arch Linux system is ready to talk "their language" with Windows machines at work or your relatives' computers.

I hope one day everyone understands the value of free software... Until then, don't share your ID number with anyone! 😎
