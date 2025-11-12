title: Secure DNS Setup with dnsmasq and dnscrypt-proxy on Arch Linux
date: 2025-10-13 18:00
category: Linux
tags: dnsmasq,dnscrypt-proxy,Arch Linux,DNS güvenliği,DNS önbellekleme
slug: arch-linux-dnsmasq-dnscrypt-proxy
authors: yuceltoluyag
status: published
summary: Set up dnsmasq and dnscrypt-proxy on Arch Linux, check for port conflicts, and test DNS resolution.
template: article
Lang: en
Status: published

---

## Secure DNS Setup with dnsmasq and dnscrypt-proxy on Arch Linux

DNS is one of the cornerstones of your internet performance.
In this article, you will learn how to set up a fast and secure DNS infrastructure using **dnsmasq and dnscrypt-proxy on Arch Linux**, and how to **check for conflicts, logs, and test DNS resolution**.

💡 What you will find in this article:

- dnsmasq installation and configuration
- dnscrypt-proxy installation and secure DNS settings
- Port conflict detection
- DNS resolution test
- Service log control

---

## 1. What is dnsmasq and How to Install It 🛠️

**dnsmasq** is a lightweight and flexible DNS, DHCP, and TFTP server.
It provides local DNS caching and DHCP services.

### 1.1 Installation

```bash
sudo pacman -S dnsmasq
```

### 1.2 Configuration

Open the `/etc/dnsmasq.conf` file and enter your example settings:

```ini
listen-address=127.0.0.1,::1,192.168.1.1
interface=enp3s0
```

Start the service and enable it to run automatically:

```bash
sudo systemctl start dnsmasq
sudo systemctl enable dnsmasq
```

!!! tip "You can effectively use dnsmasq's DNS caching to gain speed in your local network."

---

## 2. Encrypting DNS Queries with dnscrypt-proxy 🔐

**dnscrypt-proxy** supports DNS over HTTPS (DoH) and DNSCrypt protocols.
It increases your privacy by encrypting your DNS queries.

### 2.1 Installation

```bash
sudo pacman -S dnscrypt-proxy
```

### 2.2 Configuration

Open the `/etc/dnscrypt-proxy/dnscrypt-proxy.toml` file:

```toml
server_names = ['cloudflare', 'cloudflare-ipv6']
listen_addresses = ['127.0.0.1:5300', '[::1]:5300']
require_dnssec = true
require_nolog = true
require_nofilter = true
```

Start the service:

```bash
sudo systemctl start dnscrypt-proxy
sudo systemctl enable dnscrypt-proxy
```

!!! note "listen_addresses must be on a different port (e.g., 5300) to avoid conflicts with dnsmasq."

---

## 3. Using dnsmasq and dnscrypt-proxy Together 🔄

The dnsmasq → dnscrypt-proxy chain provides both speed and security.

1. Configure dnsmasq to listen on local interfaces.
2. Set up dnscrypt-proxy to encrypt queries coming from dnsmasq.
3. Start both services and enable them to run automatically.

!!! warning "To prevent port conflicts, dnscrypt-proxy should listen on a different port (e.g., 5300)."

---

## 4. Checking for Port Conflicts ⚡

To verify that your services are running on the correct ports:

```bash
sudo ss -tulpn | grep dns
```

Expected output example:

```text
udp   127.0.0.1:5300 → dnscrypt-proxy
udp   127.0.0.1:53   → dnsmasq
tcp   127.0.0.1:5300 → dnscrypt-proxy
tcp   127.0.0.1:53   → dnsmasq
```

✅ If the ports are separated this way, there is no conflict.

---

## 5. DNS Resolution Test 🧪

Test if the dnsmasq + dnscrypt-proxy chain is working:

```bash
dig @127.0.0.1 archlinux.org
```

In the expected output:

- **Status: NOERROR**
- An IP address should be returned (e.g., 95.217.163.246)
- Query time should be reasonable

!!! note "This step quickly verifies if the DNS chain is working correctly."

---

## 6. Checking Service Logs 📄

To see errors or warnings:

```bash
journalctl -u dnsmasq -u dnscrypt-proxy --since "10 minutes ago"
```

- If **No entries** appear, everything is running smoothly.

!!! tip "Regularly checking logs helps you catch potential problems, especially after network changes."

---

## 7. Conclusion 🌟

- Secure and fast DNS resolution has been set up with dnsmasq + dnscrypt-proxy.
- Port conflicts have been checked, and DNS queries are being routed correctly.
- System stability has been verified with log and test steps.

💡 Tip: If you want your LAN devices to also use secure DNS, you can configure dnsmasq to listen on the relevant network interfaces.

---

## Resources 📚

- [Dnsmasq - ArchWiki](https://wiki.archlinux.org/title/Dnsmasq){: target="\_blank" rel="noopener noreferrer"}
- [Dnscrypt-proxy - ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy){: target="\_blank" rel="noopener noreferrer"}

---
