Title: WireGuard from Arch Linux to MikroTik: DNS Trouble and Clean Setup
Date: 2026-05-10 23:05
Category: Linux
Tags: arch linux, mikrotik, wireguard, vpn, dns
Slug: arch-linux-mikrotik-wireguard-kurulumu
Authors: yuceltoluyag
Summary: I explain how to set up WireGuard on Arch Linux to connect to MikroTik, and the most accurate way to solve the famous DNS 'signature mismatch' error that you will encounter.
Image: images/arch-linux-mikrotik-wireguard-kurulumu-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/116592382464909661
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3he735ds2p
Status: published

If you are using Arch Linux, just "installing" something is not enough; you also need to know how that thing fights with the rest of the system (especially NetworkManager and DNS). Today, I will explain how to set up a MikroTik as a VPN Hub and connect an Arch Linux peer to it.

Since I also get tired of looking for configurations in my old notes and all over the place every single time, I am leaving the entire process and the solution to that annoying DNS error right here in one piece.

## 📦 Step 1: Arming Ourselves with Tools

First of all, the package we need is `wireguard-tools`. This package brings both the necessary helper tools and the systemd units that will manage the connection.

```bash
yuceltoluyag@archlinux:~$ sudo pacman -S wireguard-tools
```

## 🔑 Step 2: Key Generation and Permissions

WireGuard keys are kept under `/etc/wireguard/`. Let's create the folder and generate the keys in a single line (I usually do this, it's faster):

```bash
yuceltoluyag@archlinux:~$ sudo -i
# Create the directory and enter it
root@archlinux:~# mkdir -p /etc/wireguard/ && cd /etc/wireguard/
# Generate keys and set permissions
root@archlinux:/etc/wireguard# wg genkey | tee privatekey | wg pubkey > publickey
root@archlinux:/etc/wireguard# chmod 600 privatekey
```

Make sure that only root can read the `privatekey` file here; otherwise, the system will start screaming at you about "security".

## ⚙️ Step 3: Configuration (wg0.conf)

Now we get to the real business. Let's create the `/etc/wireguard/wg0.conf` file. Adding your own nickname or a custom note here makes it easier to track the configuration.

```ini
[Interface]
# Friday13 VPN Peer Configuration
PrivateKey = <YOUR_PRIVATE_KEY>
Address = 10.100.0.10/32
DNS = 192.168.0.1, 10.100.0.1

[Peer]
# MikroTik Office Gateway
PublicKey = <MIKROTIK_PUBLIC_KEY>
Endpoint = 178.xxx.xxx.184:51820
AllowedIPs = 10.100.0.0/24, 192.168.0.0/24
PersistentKeepalive = 25
```

At this point, you also need to add a new Peer on the MikroTik side and enter your Arch machine's `publickey` content there.

---

## ⚡ Troubleshooting: "resolvconf: signature mismatch" Error

When you try to start the connection, you will probably run into this error:
`resolvconf: signature mismatch: /etc/resolv.conf`

**Why does it happen?**
In Arch Linux, NetworkManager, by default, dives straight into the `/etc/resolv.conf` file and overwrites it. However, `openresolv` (and therefore `wg-quick`) checks the signature of this file. When NetworkManager changes the file, the signature is broken, and WireGuard cannot apply the DNS settings.

### Solution: The "Right Way" (systemd-resolved)

Instead of dealing with methods called "dirty hacks" (like PreUp), configuring NetworkManager to use `systemd-resolved` is the cleanest way.

1. Update the NetworkManager setting:
   Add the following to the `/etc/NetworkManager/NetworkManager.conf` file:
   ```ini
   [main]
   dns=systemd-resolved
   ```

2. Trigger the services:
   ```bash
   yuceltoluyag@archlinux:~$ sudo systemctl enable --now systemd-resolved
   yuceltoluyag@archlinux:~$ sudo systemctl restart NetworkManager
   ```

Now your `/etc/resolv.conf` file will point to the `127.0.0.53` address (i.e. local systemd-resolved) and will be able to pass WireGuard DNS settings to this service without any issues.

---

## 🚀 Firing Up the Connection

If everything is ready, let's open the tunnel:

```bash
yuceltoluyag@archlinux:~$ sudo systemctl start wg-quick@wg0
yuceltoluyag@archlinux:~$ sudo systemctl enable wg-quick@wg0
```

Use the legendary `wg` command to check the status:

```bash
yuceltoluyag@archlinux:~$ sudo wg show
interface: wg0
  public key: 0Cl***9F4=
  private key: (hidden)
  listening port: 47047

peer: hxz***50o=
  endpoint: 178.xxx.xxx.184:51820
  allowed ips: 10.100.0.0/24, 192.168.0.0/24
  latest handshake: 20 seconds ago
  transfer: 12.06 KiB received, 8.13 KiB sent
```

If you see a duration in the `latest handshake` section, congratulations; you have shaken hands with MikroTik.

Now you can connect to the servers behind MikroTik via SSH. If you are still experiencing issues related to disk space or performance, I suggest you take a look at my articles on [Arch Linux Disk Space Not Visible Solution](/en/arch-linux-disk-alani-gorunmuyor-cozum/) or [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/).

Alright then, see you at the next technical crisis!

---

## 🔗 Related Posts
- [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/)
- [Arch Linux Disk Space Not Visible Solution](/en/arch-linux-disk-alani-gorunmuyor-cozum/)
- [My Test with PNG Files: Mogrify and Chunk Errors](/en/png-mogrify-chunk-hatalari-cozumu/)
