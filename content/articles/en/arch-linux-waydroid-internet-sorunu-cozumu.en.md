Title: Waydroid Internet Issue Solution on Arch Linux
Date: 2025-10-17 14:30
Category: Sorun Giderme
Tags: waydroid, arch linux, android, linux, iptables, konteyner, ağ yapılandırması
Slug: arch-linux-waydroid-internet-sorunu-cozumu
Authors: yuceltoluyag
Status: published
Summary: Is Waydroid stuck on the Android logo? No internet? Solve iptables-nft incompatibility and run Waydroid on Arch Linux. Step-by-step guide starts with the content.
Template: article
Series: Waydroid
Series_index: 2
Lang: en
toot: https://mastodon.social/@yuceltoluyag/115487280919204708
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57k2ofbwk2f

## Waydroid Internet and Boot Problem Solution on Arch Linux

When trying to install Waydroid on Arch Linux, does it get stuck on the Android logo? Or is there no internet connection inside? These problems arise from incompatibilities in network configuration between Linux and Android. In this article, I will explain what Waydroid is, why these problems occur, and how to solve them step by step. When you finish this article, your system will be fully functional and internet connection will be smooth.

## What is Waydroid and Why Should We Use It?

**What is Waydroid?** Waydroid is a platform that runs the Android operating system natively on Linux. Simply put, you can install an Android system on your Linux machine and run Android applications directly. Unlike virtual machine technology, Waydroid is much lighter and faster because it uses LXC (Linux Container) technology.

Why should we use Waydroid? If you are a Linux user and need Android applications, then Waydroid is the perfect solution. It is not heavy like a phone emulator and is quite performant thanks to container technology. Arch Linux users especially love this technology's minimalist structure.

## What Are the Symptoms of the Problem?

After Waydroid installation or during usage, if you see certain indicators, you may be facing problems. You can understand the presence of the problem when you run one of the following commands:

```bash
sudo systemctl status waydroid-container
```

This command can show the following output:

```
[Errno 2] No such file or directory: '/var/lib/waydroid/waydroid.log'
Session: STOPPED
Vendor type: MAINLINE
```

In other cases:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh start
```

command may produce the following errors:

```
iptables: Bad rule (does a matching rule exist in that chain?).
iptables: No chain/target/match by that name.
```

After receiving these error messages, Waydroid opens but gets stuck on the Android startup logo and there is no internet connection inside. As another indicator, you might notice that ping does not work in Waydroid shell commands or that you cannot see any networks from WiFi settings.

## What's Inside? Technical Explanation

At the core of this problem lie two main factors. The first is that Arch Linux uses `iptables-nft` as the default backend application. The second is that Waydroid's network configuration script is written with old `iptables-legacy` rules.

In short, what happens? When Waydroid runs the network setup script, it tries to manage Linux firewall rules. However, since nft backend does not match legacy rules, the required NAT (Network Address Translation) rules cannot be created. If NAT is not established, the Android system inside the container cannot access the internet. Therefore, it continues to work when opening but gets stuck at boot stage since the network cannot be started.

!!! note "<strong>What is NAT?</strong> Network Address Translation (NAT) is a network technique that connects devices in a private network (in this case, Waydroid container) to the main system and enables them to access the internet. The Android inside the container has its own IP address but this IP cannot be shown directly to the internet. Thanks to NAT rules, the container can go outside."

## Solution Steps: Running Waydroid

The solution to the problem is quite systematic. By applying the following steps in order, you can get Waydroid to fully working condition.

### Step 1: Clean Up Current Configuration

First, you need to clean up active Waydroid processes and network interfaces. This step removes rules left from previous failed attempts:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh stop
sudo pkill -f waydroid
sudo umount /var/lib/waydroid/rootfs 2>/dev/null
```

These commands respectively; stop the Waydroid network script, close all Waydroid processes, and unmount the container. Don't worry if you get errors, this is completely normal.

### Step 2: Check Status of nft Backend

You need to check which iptables backend your system is using:

```bash
sudo iptables -V
```

If the output shows `iptables v1.8.x (nf_tables)`, then nft backend is already active and you can skip this step. However, if the output shows "legacy", you need to switch to nft:

```bash
sudo pacman -S iptables-nft
sudo ln -sf /usr/bin/iptables-nft /usr/bin/iptables
sudo ln -sf /usr/bin/ip6tables-nft /usr/bin/ip6tables
```

These commands install the iptables-nft package and link system commands to nft versions instead of legacy versions.

!!! warning "If you have other containers running on your system (Docker, Podman, etc.), it's recommended to check them before doing this step because iptables changes can affect them."

### Step 3: Clean Up Old and Broken Rules

You should clean up rules left from previous Waydroid installations or failed attempts:

```bash
sudo iptables -F
sudo iptables -t nat -F
sudo iptables -X
sudo iptables -t nat -X
```

These commands reset firewall rules. The `-F` option deletes rules, the `-X` option removes custom chain rules. The `nat` table contains rules related to internet forwarding.

### Step 4: Try Starting Waydroid Network Script

Now you can run the Waydroid network script:

```bash
sudo /usr/lib/waydroid/data/scripts/waydroid-net.sh start
```

If this command runs without errors, you can proceed to the next step. However, if you still get "Bad rule" error, you will need to perform manual NAT installation.

### Step 5: Add Manual NAT Rules (Working Solution)

This step is the most effective and permanent method to solve iptables incompatibility. Run the following commands in order:

```bash
sudo iptables -t nat -A POSTROUTING -s 192.168.240.0/24 -o enp3s0 -j MASQUERADE
sudo iptables -A FORWARD -i waydroid0 -j ACCEPT
sudo iptables -A FORWARD -o waydroid0 -m state --state RELATED,ESTABLISHED -j ACCEPT
```

To explain these commands:

The first command redirects traffic coming from Waydroid container's private network range (192.168.240.0/24) to the main system's network interface (enp3s0) and enables internet access by masquerading. The second command accepts all traffic coming from the waydroid0 interface. The third command redirects responses from the external network back into the container.

**Important Note:** You should replace the `enp3s0` value with your own active network interface. To learn which interface you use, run the following command:

```bash
ip a
```

Find the interface that has your internet connection in the output. Generally, these names start with `eth0`, `en0`, `wlan0` or `wlp`. If you don't do this step correctly, Waydroid will still not be able to access the internet.

!!! tip "<strong>Finding network interface:</strong> If you use WiFi, there is generally an interface name starting with 'wlan'. If you use wired network, you look for names starting with 'eth' or 'enp'. In any case, the `ip a` command will show you all interfaces."

### Step 6: Enable IP Forwarding

Your Linux system needs to activate packet forwarding (IP forwarding). This is required to send packets from one network to another:

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

However, this setting will reset after system restart. To make it permanent, also run the following command:

```bash
sudo bash -c 'echo "net.ipv4.ip_forward=1" > /etc/sysctl.d/99-waydroid.conf'
```

This command creates a configuration file that will automatically activate IP forwarding every time the system starts. This way, Waydroid will continue working properly even after system restart.

### Step 7: Restart Waydroid Container

After all adjustments, you need to restart the Waydroid container:

```bash
sudo systemctl restart waydroid-container
sudo waydroid status
```

The second command will show the container status. If successful, you will see the following output:

```
Session: RUNNING
Vendor type: MAINLINE
```

### Step 8: Test Internet Connection

Now you can test whether internet connection is working inside Waydroid. Check connection with ping commands:

```bash
waydroid shell ping -c 3 8.8.8.8
```

Alternatively, you can also test with a domain name:

```bash
waydroid shell ping -c 3 google.com
```

If ping is receiving responses (you see 3 lines of output), then internet connection inside Waydroid is successful. Now the Android interface will open and the system will boot successfully. The logos will pass, the system will open, and you will be able to use applications.

## Extra Information and Tips

You may encounter other problems during or after installation. You can find solutions to these here.

**If you get Waydroid init error:**

If you encounter errors during `sudo waydroid init`, seeing detailed output will be helpful:

```bash
sudo waydroid --details-to-stdout init
```

This command will show you step by step what happens during startup and allow you to understand where the error is.

**Making NAT rules permanent:**

The NAT rules you establish may disappear after system restart. To make them permanent, you can use the `iptables-save` command. For more detailed information, it's recommended to read our [Linux firewall configuration article](/linux-firewall-ayarlari).

```bash
sudo iptables-save > /etc/iptables/iptables.rules
sudo systemctl enable iptables
sudo systemctl start iptables
```

These commands save firewall rules and make them load automatically at system startup.

## Problem Summary Table

Common problems and quick solutions are as follows: Getting stuck on the Android logo is generally due to the NAT setup not happening. In this case, go back to the fourth step and try adding iptables-nft NAT rules manually. If you get "Bad rule" error, it means nft backend is incompatible with old scripts and the recommended solution is to create NAT manually. If Waydroid.log file is missing or cannot be found, try recreating directories with `sudo waydroid init` command. If IP forwarding is not turned on, the container cannot access the internet, and check the sixth step.

## Conclusion and Next Steps

Thanks to the solutions you learned in this article, you can make internet work in Waydroid and ensure the Android system opens properly. Waydroid problems on Arch Linux can almost always be solved with these steps. Make sure to make IP forwarding settings and NAT rules permanent so that the rules don't disappear after system restart.

After Waydroid is fully working, you may want to optimize your system. In case of any problems, review the steps of this article again and use the checklist to confirm you did it correctly.

Best of luck! If Waydroid has started working properly, you will be able to use Android applications on your Linux system smoothly.

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="HVQBmWN5ZaU"></lite-youtube>
