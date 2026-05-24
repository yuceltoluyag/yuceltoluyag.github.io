Title: The DNS Mystery on Arch Linux: VPN, systemd-resolved, and Unbound
Date: 2026-05-23 07:50
Modified: 2026-05-23 20:45
Category: Linux
Tags: arch-linux, dns, vpn, systemd-resolved, unbound, wireguard, openvpn, mikrotik
Slug: arch-linux-dns-vpn-systemd-resolved-unbound
Authors: yuceltoluyag
Status: published
Summary: We solve DNS conflicts on Arch Linux when multiple VPNs are active by configuring local Unbound for split-DNS and disabling systemd-resolved.
Template: article
Image: images/arch-linux-dns-vpn-systemd-resolved-unbound-xl.webp
Lang: en

In my spare time, I absolutely love playing around with my own systems, building things on my homelab, and experimenting with new technologies. The other night, while working on a new configuration in my homelab, I opened the terminal to check pod statuses on my AWS EKS (Elastic Kubernetes Service) cluster. I ran the usual `kubectl get pod` command. I wait... I wait... And bam:

```bash
$ kk get pod
[...] Get "https://F07***D78.gr7.us-east-1.eks.amazonaws.com/api?timeout=32s": dial tcp 10.0.64.9:443: i/o timeout
```

"What did I break now?" I thought, and ran the command again. This time, the pod list printed out without any issues. I ran it a third time—timeout again! The terminal was literally playing coin toss with me.

Since I had my home internet connection, my OpenVPN connection to access AWS resources, and my own WireGuard tunnel to connect to my other home servers all active at the same time, I rolled up my sleeves with typical Arch Linux user paranoia and decided to dive into the maze of DNS and IP routing.

In my previous [How to Install OpenVPN on AWS EC2 and Fix DNS Leaks](/en/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/) post, we looked at DNS leaks and basic routing over VPNs. This time, the problem is a much more complex DNS race condition and routing knot.

## AWS VPC DNS and VPN Traffic Conflict

In my case, the EKS cluster has both Public and Private endpoints enabled, so [Split-Horizon DNS](https://en.wikipedia.org/wiki/Split-horizon_DNS){: target="\_blank" rel="noopener noreferrer"} is in play:

*   If we make a query from the public internet, AWS returns EKS’s **public IP** address.
*   If we query from inside the AWS VPC (or over the VPN), it returns EKS’s **private IP** address (e.g., `10.0.64.9`).

I had multiple DNS servers configured at the same time, and `/etc/resolv.conf` looked something like this:

```
nameserver 1.1.1.1      # Cloudflare (returns EKS Public IP)
nameserver 10.100.0.1   # Home MikroTik (returns EKS Public IP)
nameserver 10.0.0.2     # AWS VPC DNS - via OpenVPN (returns EKS Private IP)
```

To see who was handling DNS in the system, I checked `/etc/nsswitch.conf` and found the hosts line:

```
hosts: mymachines resolve [!UNAVAIL=return] files myhostname dns
```

The `resolve` parameter here means the system uses `systemd-resolved`[^1] via D-Bus instead of the classic glibc DNS resolver.

## The "Race Condition" in systemd-resolved Domain Name Resolution

Let’s look at how `systemd-resolved` resolves DNS queries. To see this clearly, let's enable debug logging for `systemd-resolved`:

```bash
sudo resolvectl log-level debug
```

Then, monitoring the logs while running the `kubectl` command showed this:

```
varlink-28-28: Received message: {"method":"io.systemd.Resolve.ResolveHostname","parameters":{"name":"F07***D78.gr7.us-east-1.eks.amazonaws.com","flags":0,"ifindex":0}}
```

`systemd-resolved` sends the DNS query to **all** active network interfaces (home internet, OpenVPN tunnel `tun0`, and WireGuard tunnel `wg0`) **simultaneously**!

Here is the critical part: `systemd-resolved` essentially holds a race between DNS servers. Whichever DNS server on whichever interface responds first, its answer is cached and returned to us.

*   If my home internet (`wlan0` / `1.1.1.1`) wins the race, we get EKS’s **public IP** address, and the connection goes through fine.
*   If the OpenVPN tunnel (`tun0` / `10.0.0.2`) wins, we get EKS’s **private IP** address (`10.0.64.9`).

But why does getting the private IP cause a timeout? Checking the routing table, there is no specific route set up for the `10.0.64.9` IP block to go through the VPN tunnel (`tun0`). So, the system tries to reach this private IP via the default gateway (my home router), and the packets get lost in the public internet.

Let's set the log level back to info:
```bash
sudo resolvectl log-level info
```

## Solution Options

We have a few choices to resolve this issue:

1.  **Add Static Route (Quick Fix):** Manually route EKS private IP subnets through OpenVPN. (This is just a temporary patch for that IP and doesn't solve split-DNS).
2.  **Split-DNS via systemd-resolved:** Set up complex domain-based routing rules in `systemd-resolved`. (It's tedious and quite unstable).
3.  **Local Unbound Setup (Permanent and Stable Fix):** Disabling `systemd-resolved` completely and setting up a local Unbound DNS server to route queries to the correct DNS servers based on domains.

We will go with the cleanest and most stable path: **Unbound**. We previously solved a similar port conflict using `dnsmasq` in my [dnsmasq and dnscrypt-proxy Installation Guide on Arch Linux](/en/arch-linux-dnsmasq-dnscrypt-proxy/) post. Since we also need to route VPN DNS queries this time, we will configure split-DNS with Unbound.

## Installing and Configuring Unbound on Arch Linux

First, install the package:

```bash
sudo pacman -S unbound
```

We want to define these routing rules:
*   Queries for `compute.internal` and `ops.example.com` (AWS internal domains) should go to the AWS VPC DNS server (`10.0.0.2`) over OpenVPN.
*   Queries for `setevoy` (my local homelab domain) should go to the MikroTik DNS server (`10.100.0.1`) over WireGuard.
*   All other general internet queries should go to Cloudflare (`1.1.1.1`) and Google (`8.8.8.8`).

Configure `/etc/unbound/unbound.conf` as follows:

```ini
server:
    interface: 127.0.0.1
    access-control: 127.0.0.0/8 allow
    do-ip6: no
    hide-identity: yes
    hide-version: yes
    prefetch: yes

# My homelab network (WireGuard / MikroTik)
forward-zone:
    name: "setevoy."
    forward-addr: 10.100.0.1
    forward-addr: 192.168.0.1

# AWS Internal Resources
forward-zone:
    name: "compute.internal."
    forward-addr: 10.0.0.2

forward-zone:
    name: "ops.example.com."
    forward-addr: 10.0.0.2

# Public Internet Queries
forward-zone:
    name: "."
    forward-addr: 1.1.1.1
    forward-addr: 8.8.8.8
```

Check the configuration for syntax errors:

```bash
sudo unbound-checkconf
```

If you see `unbound-checkconf: no errors in /etc/unbound/unbound.conf`, we are good to go.

## Disabling systemd-resolved

To let Unbound listen on port 53 without issues, we must turn off `systemd-resolved` completely.

!!! warning "Warning! 🚨 Disabling is not enough!"
    As soon as you stop this service, you won't have a local DNS resolver, and your domain resolution will temporarily drop until you start Unbound.

If your `/etc/NetworkManager/NetworkManager.conf` has a `dns=systemd-resolved` line, change it to `dns=none`:

```ini
[main]
dns=none
```

Now, stop and mask `systemd-resolved`:

```bash
sudo systemctl disable --now systemd-resolved systemd-resolved-monitor.socket systemd-resolved-varlink.socket
sudo systemctl mask systemd-resolved
```

Restart NetworkManager:

```bash
sudo systemctl restart NetworkManager
```

If you want to verify that port 53 is clear, run:

```bash
sudo ss -tulpn | grep ':53'
```

If the port is free, enable and start Unbound:

```bash
sudo systemctl enable --now unbound
```

Now, edit `/etc/resolv.conf` to point to our local resolver. Clear the file and add only this line:

```
nameserver 127.0.0.1
```

If you use WireGuard, update the DNS parameter in your `/etc/wireguard/wg0.conf` to `127.0.0.1` as well:

```ini
[Interface]
...
DNS = 127.0.0.1
```

After these changes, restart your WireGuard tunnel:

```bash
sudo wg-quick down wg0 && sudo wg-quick up wg0
```

## Testing and Verification

Let's test if our local DNS server is routing queries properly using `dig`:

1.  **General Internet Test:**
    ```bash
    dig google.com +short
    # Output: 216.58.207.14 (Resolved correctly via Cloudflare/Google)
    ```
2.  **AWS EKS Endpoint Test (Should return Public IP):**
    ```bash
    dig F07***D78.gr7.us-east-1.eks.amazonaws.com +short
    # Output: EKS public IPs (since query went to public DNS)
    ```
3.  **AWS RDS Test (Should return Private IP):**
    ```bash
    dig prod.db.kraken.ops.example.com +short
    # Output: 10.0.66.14 (Resolved correctly via AWS DNS)
    ```

To wrap things up: in complex developer environments with multiple active VPN tunnels, relying on `systemd-resolved`'s unpredictable race-condition DNS resolution can be painful. Setting up a local **Unbound** DNS server gives you total control, keeping your network traffic predictable and stable.

[responsive_img src="/images/arch-linux-dns-vpn-systemd-resolved-unbound-xl.webp" alt="Arch Linux DNS VPN systemd-resolved and Unbound Solution" /]

[^1]: For more details, check out the [Domain Name Resolution](https://wiki.archlinux.org/title/Domain_name_resolution){: target="\_blank" rel="noopener noreferrer"} guide on the Arch Wiki.
