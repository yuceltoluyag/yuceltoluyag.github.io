Title: Arch Linux Firewall Settings
Date: 2025-10-24 03:00
Category: Linux
Tags: arch linux, firewall, nftables, ufw, güvenlik
Slug: linux-firewall-ayarlari
Authors: yuceltoluyag
Status: published
Summary: Learn firewall configuration on Arch Linux step by step. Increase your security with nftables and ufw! ⚡
Template: article
Lang: en

## Guide: Arch Linux Firewall Settings

### Introduction

Security is a critical part of system administration for Arch Linux users. ⚡ In this guide, you'll learn **Arch Linux firewall settings** in detail, and configure step by step with iptables, nftables and ufw tools. Our goal is to provide a secure and flexible firewall setup that both beginners and experienced users can easily implement.

---

## What is Firewall in Arch Linux?

A firewall prevents unauthorized access by controlling incoming and outgoing network traffic to your system. Firewall configuration in Arch Linux is critical for preventing network attacks, managing whether services are open to outside access, and increasing overall security.

### Term Explanations

**What is iptables?**

- iptables is a packet filtering tool for the Linux kernel. It controls network packets with rule sets and manages incoming/outgoing traffic to your system.

**What is nftables?**

- nftables is developed as a modern and flexible alternative to iptables. It is more performant and allows you to manage complex rules in a simpler way. It provides connection tracking and packet filtering at kernel level.

**What is ufw?**

- UFW (Uncomplicated Firewall) is a user-friendly firewall management tool that works on top of iptables or nftables. It allows you to add firewall rules with simple commands.

---

## Step 1: Basic Firewall Setup with iptables

iptables installation and basic settings on Arch Linux:

```bash
sudo pacman -S iptables
sudo systemctl enable --now iptables
```

Adding basic rules:

```bash
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -j DROP
```

!!! tip "You can increase security by changing SSH port or allowing access only to specific IPs ⚡"

---

## Step 2: Modern Firewall Configuration with nftables

nftables is a modern firewall solution that can replace iptables in Arch Linux. Installation:

```bash
sudo pacman -S nftables
sudo systemctl enable --now nftables
```

Simple rule set:

```bash
sudo nft add table inet filter
sudo nft add chain inet filter input { type filter hook input priority 0 \; }
sudo nft add rule inet filter input tcp dport 22 accept
sudo nft add rule inet filter input drop
```

!!! note "With nftables you can backup rules and create complex NAT or port forwarding configurations 💡"

---

## Step 3: Advanced Rules with nftables

### Rules for Different Interfaces

```bash
sudo nft add chain inet filter input_eth0 { type filter hook input priority 0 \; }
sudo nft add rule inet filter input_eth0 iifname "eth0" tcp dport 80 accept
```

### NAT and Masquerading

```bash
sudo nft add chain inet nat postrouting { type nat hook postrouting priority 100 \; }
sudo nft add rule inet nat postrouting oifname "eth0" masquerade
```

!!! tip "Masquerading is useful for multiple devices to access internet through a single IP 💡"

---

## Step 4: Simple Firewall Management with ufw

```bash
sudo pacman -S ufw
sudo systemctl enable --now ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable
```

!!! warning "Incorrect rules can block access to your system — backup your connection or provide console access before applying commands ⚠️"

---

## Step 5: Firewall Management Tips

- Backup rules: `sudo nft list ruleset > backup.nft`
- Status check: `sudo nft list ruleset`
- Use rate-limit to prevent brute-force attacks

!!! tip "You can mitigate brute-force attacks by adding rate-limit and logging rules with nftables ⚡"

---

## Conclusion

Firewall configuration in Arch Linux is a critical step to protect your system against external threats. In this guide, you learned basic and secure firewall setup using **iptables, nftables and ufw**. ⚡

!!! note "Regularly review your firewall rules and customize according to your system needs 💡"

You can increase your security with Arch Linux and make network management more controlled. 🚀