title: Secure DNS Setup with dnsmasq and dnscrypt-proxy on Arch Linux
date: 2025-10-13 18:00
modified: 2026-11-09
category: Linux
tags: dnsmasq,dnscrypt-proxy,Arch Linux,DNS güvenliği,systemd-resolved,DoH,DNSSEC,NetworkManager
slug: arch-linux-dnsmasq-dnscrypt-proxy
authors: yuceltoluyag
summary: Learn how to set up a local DNS cache with dnsmasq and use Cloudflare DoH through dnscrypt-proxy on Arch Linux, configure NetworkManager, and verify DNSSEC using steps tested on my own system.
image: images/arch-linux-guvenli-dns-kurulum-xl.webp
template: article
Lang: en
Status: published
toot: https://mastodon.social/@yuceltoluyag/115364056455751216
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m2zxtdzots2l

DNS settings rarely come to mind as long as the internet connection works. We get DNS from the modem, use the settings provided by DHCP, and often do not keep track of where our queries are going.

I wanted to have a little more control over this on Arch Linux. To do that, I brought two tools together: **dnsmasq and dnscrypt-proxy.**

dnsmasq acts as a local DNS server and cache. dnscrypt-proxy forwards DNS queries to Cloudflare's DNS-over-HTTPS (DoH) service. This way, applications communicate with a local DNS server while regular DNS queries sent outside the system are encrypted over HTTPS.

The DNS management in NetworkManager also needs to be configured during setup. Having both NetworkManager and a separate DNS service try to manage the same configuration can lead to unnecessary problems.

Rather than a theoretical setup, this guide describes the configuration I applied and tested on my own Arch Linux system.

## 1. The DNS architecture we'll use

First, let's look at how the setup works:

```text
Arch Linux applications
        |
        v
dnsmasq
127.0.0.1:53
        |
        v
dnscrypt-proxy
127.0.0.1:5300
        |
        v
Cloudflare DNS (DoH)
        |
        v
Internet
```

It's important to distinguish the roles of the two services:

- **dnsmasq:** Runs as a local DNS server and caches queries.
- **dnscrypt-proxy:** Sends DNS queries to the external resolver we choose over an encrypted connection.

The ports I use:

| Service | Address | Role |
|---|---|---|
| dnsmasq | 127.0.0.1:53 | Local DNS and cache |
| dnscrypt-proxy | 127.0.0.1:5300 | Encrypted DNS connection |

I chose port 5300 deliberately. You may see different ports, such as 54 or 53000, in other examples. The important thing is that the two services do not use the same address and port.

### System I tested

The package versions on the Arch Linux system where I verified the setup were:

| Package | Version |
|---|---|
| dnsmasq | 2.93-1 |
| dnscrypt-proxy | 2.1.20-1 |
| NetworkManager | 1.58.1-3 |
| systemd | 262.1-1 |
| dig (bind-tools) | 9.20.30 |

These versions came from my system on November 9, 2026. Package versions may differ after future Arch Linux updates.

## 2. Check the ports before installation

First, let's check whether any other services are using the ports we'll need for DNS.

```bash
sudo ss -lntup | grep -E '127\.0\.0\.1:(53|5300)([[:space:]]|$)'
```

This command specifically checks ports 53 and 5300 on the 127.0.0.1 address.

I don't use a broad search such as `grep :53` here. It could also match Multicast DNS (mDNS) traffic on port 5353.

In my initial checks, I saw that Chrome and KDE Connect were using port 5353. Those entries did not indicate a conflict with dnsmasq or dnscrypt-proxy.

### Do you need systemd-resolved?

In my previous setup, I had completely disabled and masked the `systemd-resolved` service. After looking into it in more detail, however, I found that this is not necessary for every Arch Linux user.

To check the service status:

```bash
systemctl status systemd-resolved
```

With the default systemd-resolved configuration, the local DNS address is usually `127.0.0.53:53`. Our dnsmasq configuration uses `127.0.0.1:53`.

Because these are different local addresses, we cannot conclude that there is a conflict just because the port numbers are the same. First, we need to see which service is listening on which address.

On my system, `systemd-resolved` is disabled and not running. However, I do not recommend that everyone mask the service in this guide.

!!! warning "Warning: Don't mask systemd-resolved unnecessarily"
    `systemctl mask` completely prevents a service from starting. Do not apply it automatically for DNS configuration. First, check the current listening addresses and how DNS is managed on your system.

## 3. Install the required packages

We can install both services from the official Arch Linux repositories:

```bash
sudo pacman -S dnsmasq dnscrypt-proxy
```

To check:

```bash
pacman -Q dnsmasq dnscrypt-proxy
```

At this point, we are not changing `/etc/resolv.conf` yet. First, we'll make sure the DNSCrypt service is running.

## 4. Configure dnscrypt-proxy

Now let's set up the service that will send DNS queries outside the system over an encrypted connection.

Configuration file:

```bash
sudoedit /etc/dnscrypt-proxy/dnscrypt-proxy.toml
```

Do not delete the entire existing file. Find the corresponding options below and apply them to your configuration:

```toml
server_names = ['cloudflare']

listen_addresses = ['127.0.0.1:5300']

require_dnssec = true
require_nolog = true
require_nofilter = true

cache = true
```

What the settings do:

| Setting | Description |
|---|---|
| server_names | Specifies which resolver to use. |
| listen_addresses | Specifies the local IP address and port on which the service listens. |
| require_dnssec | Defines a filter related to DNSSEC support when selecting a resolver. |
| require_nolog | Defines a filter related to the resolver list's no-logging claim. |
| require_nofilter | Defines a filter related to the resolver list's no-filtering feature. |
| cache | Enables the dnscrypt-proxy cache. |

!!! note "Important: server_names and require_* options"
    When we explicitly select a resolver with `server_names = ['cloudflare']`, dnscrypt-proxy's `require_*` filters are not applied to that selection. These options are used during automatic resolver selection. Therefore, do not interpret a setting such as `require_nolog=true` as a guarantee that Cloudflare does not keep logs. This behavior is also noted in dnscrypt-proxy's own configuration comments.

### DoH or DNSCrypt?

There's an important detail here: despite the program's name, dnscrypt-proxy is not limited to using the DNSCrypt protocol.

In my configuration, the Cloudflare resolver uses DNS-over-HTTPS (DoH).

I'm not inferring this from the configuration file alone. When I checked the service logs on my system, I saw this line:

```text
[cloudflare] OK (DoH) - rtt: 426ms, live servers: 1
```

This entry shows that the Cloudflare resolver is available over DoH.

Cloudflare DoH carries DNS queries inside HTTPS requests, aiming to prevent DNS traffic on the network from being read in plain text or easily modified.

### Enable the service

For this setup, I'm using the regular dnscrypt-proxy systemd service method:

```bash
sudo systemctl enable --now dnscrypt-proxy.service
```

I'm not enabling the `dnscrypt-proxy.socket` service separately. ArchWiki describes two different operating methods: the regular service method and the socket activation method. This guide uses the regular service method.

Let's check the service status:

```bash
systemctl is-active dnscrypt-proxy
```

Expected output:

```text
active
```

To see the resolver connection in the logs:

```bash
journalctl -u dnscrypt-proxy -b --no-pager
```

If the network is not ready during startup, dnscrypt-proxy may wait for a while. On my system, the initial logs also indicated that the network connection was not ready yet. A few seconds later, the connection was established and the Cloudflare resolver became available.

## 5. Configure dnsmasq

Now let's move on to dnsmasq, which will provide the local DNS cache.

Make sure the service is installed:

```bash
sudo pacman -S dnsmasq
```

Open the configuration file:

```bash
sudoedit /etc/dnsmasq.conf
```

For this setup, I'm using the main configuration file directly instead of creating a separate `/etc/dnsmasq.d/` directory.

The relevant settings in the file are:

```ini
no-resolv
listen-address=127.0.0.1
server=127.0.0.1#5300
cache-size=1000

conf-file=/usr/share/dnsmasq/trust-anchors.conf
dnssec
```

Let's look at why these options are needed.

**no-resolv**

Prevents dnsmasq from reading `/etc/resolv.conf` to learn about other DNS servers.

Our `/etc/resolv.conf` will already contain `127.0.0.1`. dnsmasq does not need to try to use itself as a DNS server again. Instead, we want it to explicitly send all regular DNS queries to dnscrypt-proxy on port 5300.

**listen-address=127.0.0.1**

Makes dnsmasq listen only on the local machine's IPv4 loopback address. This means we are not using this configuration to provide DNS service to other computers on the network.

**server=127.0.0.1#5300**

One of the most important lines. It tells dnsmasq to forward incoming queries to dnscrypt-proxy.

**cache-size=1000**

Sets the capacity of dnsmasq's DNS cache.

**conf-file and dnssec**

These two settings are used for DNSSEC validation.

The `conf-file` option tells dnsmasq to read the file containing the DNSSEC trust anchors. The `dnssec` option enables DNSSEC validation.

### What is the trust-anchors.conf file?

This was one of the things that confused me during my initial setup, too.

We do not create the `/usr/share/dnsmasq/trust-anchors.conf` file manually. It is already provided on the system by the Arch Linux package.

To check its contents:

```bash
cat /usr/share/dnsmasq/trust-anchors.conf
```

On my system, the file contains two DS records:

- Key Tag 20326
- Key Tag 38696

The second key is especially important. The DNS root zone began being signed with the new key known as KSK-2024 on October 11, 2026. This key has a Key Tag value of 38696.

The fact that the comment in the file mentions 2024 does not mean that all the records in it are outdated. What we need to check is the active `trust-anchor` records.

!!! note "DNSSEC root key rollover"
    According to IANA's announcement dated October 11, 2026, the new KSK-2024 key (38696) began signing the DNS root zone. On my system, the DS record for this key was already present in `trust-anchors.conf`. Therefore, I did not need to add a key manually or delete any existing records.

    It is important to check that this file and the DNSSEC trust anchors remain up to date in the future.

### Test the dnsmasq configuration

Let's check the syntax before restarting the service:

```bash
sudo dnsmasq --test
```

On success:

```text
dnsmasq: syntax check OK.
```

Now let's enable the service:

```bash
sudo systemctl enable --now dnsmasq.service
```

To restart the service after configuration changes:

```bash
sudo systemctl restart dnsmasq
```

Let's check its status:

```bash
systemctl is-active dnsmasq
```

Expected output:

```text
active
```

## 6. Configure NetworkManager and /etc/resolv.conf

Now we'll make sure the system sends regular DNS queries to the local dnsmasq service.

NetworkManager may receive DNS server information from the modem over DHCP. For this configuration, however, we do not want NetworkManager to manage the DNS file.

First, open the configuration file:

```bash
sudoedit /etc/NetworkManager/NetworkManager.conf
```

Make sure the following settings are present in the `[main]` section:

```ini
[main]
dns=none
systemd-resolved=false
```

Add them to the existing `[main]` section. If they are already present in the file, do not add them again.

What these settings do:

- `dns=none`: Prevents NetworkManager from changing the `/etc/resolv.conf` file.
- `systemd-resolved=false`: Prevents NetworkManager from sending the DNS configuration to the systemd-resolved service.

Let's reload the NetworkManager configuration:

```bash
sudo nmcli general reload
```

At this point, DNS management by NetworkManager is disabled for our purposes. We'll set the contents of the DNS file ourselves.

### Edit the /etc/resolv.conf file

First, check the current state of the file:

```bash
ls -l /etc/resolv.conf
readlink /etc/resolv.conf
```

If the file is a symbolic link, make sure to inspect where it points. Do not delete it without knowing which service manages it.

On my system, `/etc/resolv.conf` is a regular file.

To edit it:

```bash
sudoedit /etc/resolv.conf
```

Relevant file content:

```ini
nameserver 127.0.0.1
```

The system's regular DNS resolution requests will now be directed to the local dnsmasq service.

!!! warning "Don't mix up your DNS settings"
    When using `dns=none`, it is normal for DNS addresses NetworkManager received over DHCP to remain visible in the `nmcli device show` output. What matters is that the `/etc/resolv.conf` file used by the system shows the correct DNS address.

## 7. Verify the setup

We've configured everything. Now let's check whether the DNS chain is actually working as intended.

### 7.1 Check the ports

```bash
sudo ss -lntup | grep -E '127\.0\.0\.1:(53|5300)([[:space:]]|$)'
```

The setup I saw on my system:

```text
udp UNCONN 0 0 127.0.0.1:53   0.0.0.0:* users:(("dnsmasq",pid=805,fd=4))
udp UNCONN 0 0 127.0.0.1:5300 0.0.0.0:* users:(("dnscrypt-proxy",pid=723,fd=6))
tcp LISTEN 0 32   127.0.0.1:53   0.0.0.0:* users:(("dnsmasq",pid=805,fd=5))
tcp LISTEN 0 4096 127.0.0.1:5300 0.0.0.0:* users:(("dnscrypt-proxy",pid=723,fd=7))
```

PIDs and file descriptors will differ on every system, so they do not need to match exactly.

What matters:

- dnsmasq is on port 53.
- dnscrypt-proxy is on port 5300.
- Both services are listening over UDP and TCP.

### 7.2 Test the DNSCrypt connection directly

First, let's send a query directly to dnscrypt-proxy without disabling dnsmasq:

```bash
dig @127.0.0.1 -p 5300 cloudflare-dns.com A
```

On my system, this query succeeded with a `NOERROR` result.

This test shows that dnscrypt-proxy accepts and returns queries over the local connection. To verify the encrypted external connection as well, we also check the service log for the Cloudflare resolver's `OK (DoH)` status.

### 7.3 Test DNS resolution through dnsmasq

Now let's send a query through the local dnsmasq service:

```bash
dig @127.0.0.1 archlinux.org +short
```

If an IP address is returned, dnsmasq is resolving the query.

Let's also check the normal system DNS path:

```bash
getent ahosts archlinux.org
```

This command checks that the system name resolution mechanism used by applications is working, too.

### 7.4 Test a valid DNSSEC signature

It is not enough for DNSSEC to merely appear enabled in the configuration file. We need to check that validation is actually taking place.

To do this, let's query a test domain with a valid DNSSEC signature:

```bash
dig @127.0.0.1 test.dnscheck.tools A +dnssec
```

The important output I got on my system:

```text
status: NOERROR
flags: qr rd ra ad
```

The `ad` flag indicates that the DNS response has been validated.

### 7.5 Test an invalid DNSSEC signature

Now let's try the opposite. We'll query a domain with an intentionally invalid DNSSEC signature:

```bash
dig @127.0.0.1 badsig.test.dnscheck.tools A +dnssec
```

Expected result:

```text
status: SERVFAIL
```

My system returned exactly this result, too.

This verifies not only that valid signatures are accepted, but also that invalid signatures are rejected.

### 7.6 Check the service logs

We can view the logs of both services together:

```bash
journalctl -u dnsmasq -u dnscrypt-proxy --since "10 minutes ago"
```

To see only DNSCrypt entries:

```bash
journalctl -u dnscrypt-proxy -b --no-pager
```

For dnsmasq:

```bash
journalctl -u dnsmasq -b --no-pager
```

I'm specifically looking for this line on the dnscrypt-proxy side:

```text
[cloudflare] OK (DoH)
```

This entry shows that the selected Cloudflare resolver is available and working over DoH.

## 8. What you should know about privacy

The purpose of this configuration is to encrypt DNS queries and benefit from a local DNS cache. However, using secure DNS does not mean you are completely anonymous on the internet.

There are a few points to keep in mind:

**DoH connection:** Regular DNS queries are sent to Cloudflare over HTTPS by dnscrypt-proxy. This prevents other devices on the local network or the internet service provider from directly seeing DNS queries in plain text.

**DNS provider:** Queries still reach Cloudflare. Therefore, the DNS provider's privacy policy matters. The `require_nolog=true` setting alone is not proof that no logs are kept.

**Bootstrap queries:** When dnscrypt-proxy starts for the first time, it may use a bootstrap resolver to resolve resolver sources or server addresses. In my service logs, I saw `download.dnscrypt.info` and `raw.githubusercontent.com` being resolved over UDP through a bootstrap resolver. These one-time address lookups during startup are different from regular user DNS queries. According to the project's configuration notes, bootstrap resolvers are not used to carry regular user queries.

**DNSSEC:** DNSSEC helps verify the authenticity and origin of DNS records. It does not encrypt DNS queries. DoH provides the encryption.

**Browser DNS settings:** Some browsers may use their own DoH configuration. In that case, they may bypass the system's `/etc/resolv.conf` settings. You should also check the DNS preferences of the applications you use.

In short, this configuration does not make us invisible. The goal is to protect DNS queries in transit and validate DNS responses.

## 9. Conclusion

We've combined a local DNS cache and an encrypted DNS connection on Arch Linux using dnsmasq and dnscrypt-proxy.

At the end of the setup, our system works like this:

```text
Applications
    |
    v
dnsmasq
127.0.0.1:53
    |
    v
dnscrypt-proxy
127.0.0.1:5300
    |
    v
Cloudflare DoH
    |
    v
Internet
```

In the checks I ran on my own system, dnsmasq was listening on port 53 and dnscrypt-proxy on port 5300. Direct DNSCrypt queries succeeded, and the service logs confirmed that the Cloudflare resolver was available over DoH.

I also ran two separate DNSSEC tests. The domain with a valid signature responded with `NOERROR` and the `AD` flag, while the domain with an invalid signature returned `SERVFAIL`.

What mattered most to me was not simply being able to connect to the internet, but being able to check which service DNS queries pass through, which protocol sends them outside the system, and whether DNS responses are validated.

## Resources

- [Dnsmasq - ArchWiki](https://wiki.archlinux.org/title/Dnsmasq){: target="_blank" rel="noopener noreferrer"}
- [Dnscrypt-proxy - ArchWiki](https://wiki.archlinux.org/title/Dnscrypt-proxy){: target="_blank" rel="noopener noreferrer"}
- [NetworkManager - ArchWiki](https://wiki.archlinux.org/title/NetworkManager){: target="_blank" rel="noopener noreferrer"}
- [NetworkManager.conf - Arch Linux Manual Pages](https://man.archlinux.org/man/NetworkManager.conf.5){: target="_blank" rel="noopener noreferrer"}
- [dnscrypt-proxy official configuration example](https://github.com/DNSCrypt/dnscrypt-proxy/blob/master/dnscrypt-proxy/example-dnscrypt-proxy.toml){: target="_blank" rel="noopener noreferrer"}
- [Cloudflare DNS-over-HTTPS documentation](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/){: target="_blank" rel="noopener noreferrer"}
- [IANA - DNSSEC Trust Anchors and Rollovers](https://www.iana.org/dnssec/files){: target="_blank" rel="noopener noreferrer"}
- [IANA - DNS Root Zone Begins Using New Key Signing Key](https://www.iana.org/news/2026/root-zone-begins-using-new-ksk-2026){: target="_blank" rel="noopener noreferrer"}

---
