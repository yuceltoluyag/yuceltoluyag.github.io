Title: Linux TCP Tuning and Kernel Settings for Node.js Microservices
Date: 2026-05-29 04:20
Category: Linux
Tags: linux, tcp tuning, sysctl, nodejs, microservice, devops, troubleshooting
Slug: linux-tcp-tuning-node-js-microservices
Authors: yuceltoluyag
Status: published
Summary: I'm explaining the critical Linux kernel sysctl settings required to prevent mysterious connection drops and timeouts on Node.js servers under heavy load.
Template: article
Lang: en
Image: images/linux-tcp-tuning-nodejs.png

While load testing the microservices running in my local lab, I encountered a strange issue, man. The load generator was hitting 2000 requests per second, and the Node.js server's CPU usage wasn't even breaking 30%. The event loop was a beast, garbage collection (GC) was quiet, and there were zero error logs. Yet, the load test report showed a 3% connection timeout. On top of that, those infamous "socket hang up" errors from other services started to become a nuisance.

You look at the application logs, and nothing's out of place. The metric dashboards are all green. You start feeling like you're fighting a ghost. That is, until you run `ss -s` on the server and see forty thousand sockets waiting in `TIME_WAIT` state, or catch the `TCP: request_sock_TCP: Possible SYN flooding on port 3000` warning in the `dmesg` logs... The kernel has entered a secret war with your traffic, and unfortunately, it has won.

You'll never catch these kinds of errors by profiling at the application level. That's because, by default, the Linux kernel still comes with settings configured for a desktop computer from 2005. Yet, here we are in 2026, talking about Node.js containers running behind a load balancer. In this article, we're diving into 4 essential sysctl families and that critical Node.js setting that most teams overlook, to overcome this hidden bottleneck.

## 1. Connection Queues: SYN Backlog and Accept Queue

When a client establishes a TCP connection to your Node.js server, a three-way handshake occurs in the kernel before the application-level `server.on('connection', ...)` event is triggered:

1. The client sends a `SYN` packet.
2. The kernel allocates space in the SYN backlog queue, responds with `SYN-ACK`, and waits for the final `ACK` packet from the client.
3. Once the handshake is complete, the socket is moved to the accept queue. Node.js then makes the `accept()` call in the next event loop iteration and triggers the connection event.

If either of these queues fills up, the kernel will simply discard incoming packets. The client will time out and try again. Your application, on the other hand, won't log any errors because the connection never even reached the server. From the outside, this looks like an intermittent network issue, but it's actually the kernel's capacity limit.

By default, Linux distributions have `net.core.somaxconn` set to either 128 or 4096. These numbers might sound large, but when containers behind a load balancer restart or a "connection storm" occurs, these queues can burst within seconds.

### Persuading the Kernel and That Secret Parameter in Node.js

Let's fine-tune:

```ini
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
```

However, changing this setting at the kernel level alone won't win the war, man. When Node.js starts its HTTP server, it defaults to listening with a `backlog` limit of `511`. If you don't provide this backlog limit to the `listen` function when starting the server, Node.js will still be capped at 511, even if you set the kernel's queue limit to 65535!

```javascript
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.end('ok');
});

// We're matching the backlog value to our kernel setting, making it 65535
server.listen(3000, '0.0.0.0', 65535, () => {
  console.log('Listening with backlog 65535...');
});
```

To see if the setting is taking effect live, you can run this command:

```bash
yuceltoluyag@archlinux:~$ ss -lnt | grep 3000
```

If the `Send-Q` (queue capacity) column still shows `511`, it means you either forgot to restart the Node.js application or you didn't provide this value in the `listen` call in your code.

## 2. Ephemeral Port Exhaustion on the Client Side

Our Node.js service doesn't just handle incoming requests; it also connects to databases, makes requests to other microservices, or calls external APIs. Every external TCP connection, by default, reserves a temporary port (ephemeral port) from the range `32768-60999` (about 28,000 ports).

Especially during peak times with a high volume of short-lived requests, even after a connection closes, the ports remain stuck in the `TIME_WAIT` state for 2 minutes (during `tcp_fin_timeout`). When the port pool is exhausted, your application can't make outgoing requests, and you'll see an `EADDRNOTAVAIL` error in your terminal. The receiving service might seem like it's crashed, but in reality, your own kernel is gasping for air.

To overcome this, we'll expand the port range and enable the safe reuse of ports:

```ini
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
```

With `tcp_tw_reuse`, the kernel can safely reuse sockets in the `TIME_WAIT` state for new outgoing connections by using timestamps.

!!! danger "Critical Warning: Do Not Touch tcp_tw_recycle!"
    Don't fall for 10-year-old blog posts on the internet and enable the `tcp_tw_recycle` parameter, man. This setting causes random disconnections for clients coming from behind NAT (Network Address Translation), which is why it was completely removed from the kernel in Linux version 4.12.

You can use this single-line command to monitor port status in real-time:

```bash
yuceltoluyag@archlinux:~$ ss -tan | awk '{print $4}' | cut -d: -f2 | sort | uniq -c | sort -rn | head
```

## 3. Memory Buffers for Higher Throughput (TCP Buffers)

For streams on Node.js to operate without bottlenecks at high bandwidth, the kernel's memory buffers must have sufficient space. If `rmem_max` and `wmem_max` values remain low, the kernel will announce a smaller TCP window, and even high-speed connections won't deliver their full potential performance. Virtual network bridges in containerized environments add extra load to this situation.

```ini
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.core.netdev_max_backlog = 65535
```

The triple values here specify the minimum, default, and maximum buffer sizes (in bytes), respectively. The kernel dynamically scales the buffer based on network latency and data flow. The 16 MiB ceiling prevents idle connections from hogging memory while serving as a lifeline during heavy data transfer.

`netdev_max_backlog` controls the packet queue at the network interface card (NIC) level. If packets arriving at the NIC pile up faster than the kernel can deliver them to userspace, packets are dropped directly at the NIC. You can monitor this using `ethtool -S eth0 | grep rx_missed_errors` or the RX errors field in the `ifconfig` output.

## 4. Rapid Cleanup of Idle Sockets (TCP Keepalive)

During rolling updates or network interruptions at NAT gateways, clients or servers might not detect that a connection has dropped. In such cases, sockets remain stuck in a "half-open" state. Linux's default Keepalive time is a whopping 2 hours, man. A dead socket occupying your connection pool for 2 hours means wasted server resources.

We're bringing the timeout down to more humane limits:

```ini
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 10
net.ipv4.tcp_keepalive_probes = 6
```

With these settings, after 60 seconds of no data transfer, 6 probe packets are sent at 10-second intervals. If there's no response from the other side, the connection is considered dead and cleaned up from the pool in about 2 minutes. Of course, for this to work, the `keepAlive: true` setting must also be enabled on the Node.js side when using the HTTP Agent[^1].

## Diagnosing Which Limit You've Hit (Quick Checklist)

To understand which kernel limit your network issue is hitting, you can refer to this map I've prepared:

*   **Symptom:** Under heavy load, CPU is quiet, but connections are timing out.
    *   **Possible Limit:** `somaxconn` or the listen backlog limit on the Node.js side.
    *   **Diagnosis Command:** Compare `Send-Q` and `Recv-Q` values using `ss -lnt`.
*   **Symptom:** `SYN flooding` warning in `dmesg` logs.
    *   **Possible Limit:** `tcp_max_syn_backlog` queue is full.
    *   **Diagnosis Command:** `dmesg | grep SYN`
*   **Symptom:** `EADDRNOTAVAIL` error when making requests to external services.
    *   **Possible Limit:** Ephemeral (temporary) port exhaustion.
    *   **Diagnosis Command:** Compare the `ss -tan | grep TIME_WAIT | wc -l` value with your local port range.
*   **Symptom:** Bandwidth unable to exceed 1 Gbps on high-speed lines.
    *   **Possible Limit:** Insufficient TCP memory buffers.
    *   **Diagnosis Command:** `cat /proc/sys/net/core/rmem_max`
*   **Symptom:** Irregular latency spikes during sudden traffic fluctuations.
    *   **Possible Limit:** Network card queue limit (`netdev_max_backlog`).
    *   **Diagnosis Command:** Check `ethtool -S eth0 | grep rx_missed_errors` or the `RX errors` field in the `ifconfig` output.
*   **Symptom:** Dead sockets in the connection pool are not cleaned up for minutes after the other service crashes.
    *   **Possible Limit:** Keepalive timers are too slow.
    *   **Diagnosis Command:** `cat /proc/sys/net/ipv4/tcp_keepalive_time`

## Consolidating All Settings in a Single File

You can deploy the following configuration to your servers using Ansible, Terraform, or directly manually. It's a clean set that stays within safe limits and doesn't break TCP standards:

```ini
# /etc/sysctl.d/99-nodejs-microservices.conf

# Incoming connection capacity
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535

# Outgoing connection capacity and port management
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_fin_timeout = 30

# Memory buffers for data flow (in Bytes)
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.core.netdev_max_backlog = 65535

# Quick elimination of dead connections
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 10
net.ipv4.tcp_keepalive_probes = 6

# Memory safety limit for the TCP stack (in Page count, not Bytes!)
net.ipv4.tcp_mem = 786432 1048576 26777216
```

To apply these settings to your server:

```bash
yuceltoluyag@archlinux:~$ sudo sysctl --system
```

!!! warning "Caution! The tcp_mem Parameter is Dangerous"
    The `tcp_mem` line controls the total amount of memory the kernel can allocate for TCP sockets. The values here are in **memory pages** (usually 4 KiB per page on x86_64 architecture), not bytes! If you set this limit too low relative to your server's total RAM capacity, the kernel will start dropping packets wholesale. Use the above values as a starting point and adjust them based on `free` and `slabtop` outputs under load.

## Infrastructure Settings Won't Save Bad Code

Fine-tuning the kernel gives your server breathing room, but it won't fix poorly written code, man. If your Node.js application's event loop is blocked for 200 ms due to a synchronous `JSON.parse` or a heavy loop, even setting `somaxconn` to a million won't prevent that queue from eventually bursting. That's because the application can't accept connections from the kernel.

Similarly, if you open a new database connection on every request and forget to close it, you'll eventually face ephemeral port exhaustion. Kernel settings only provide an escape ramp; fixing the leak is your job.

## Pitfalls in the Container World (Docker & Kubernetes)

If you're using Docker or Kubernetes, you need to pay attention to where `sysctl` settings reside:

1.  **Safe within Containers:** Settings that are part of the network namespace, like `tcp_tw_reuse` and `tcp_rmem`, can be changed from within the container.
2.  **Run Only on the Host:** Settings like `somaxconn`, `rmem_max`, `wmem_max`, and `netdev_max_backlog` are not part of the network namespace. If you try to set them from within a container, you'll get a permission error, or the setting will have no effect. These must be set directly on the server machine (host).
3.  **The Cleanest Path for Kubernetes:** In K8s environments, instead of solving these settings at the pod level or with runtime sidecars, embedding them directly at the host level during the node provisioning phase, i.e., via Terraform cloud-init or custom machine images (AMIs), is the cleanest approach.

Incorporate all these settings into your infrastructure automation and bury those silently annoying network issues in the past.

Stay well!

---

### 🔗 More Notes from the Lab

Here are some other articles that might be useful when tinkering with systems, managing network traffic, and improving performance:

*   [DNS Mystery on Arch Linux: VPN, systemd-resolved, and Unbound](/en/arch-linux-dns-vpn-systemd-resolved-unbound/)
*   [Guide to Installing dnsmasq and dnscrypt-proxy on Arch Linux](/en/arch-linux-dnsmasq-dnscrypt-proxy/)
*   [How to Install OpenVPN on AWS EC2 and Fix DNS Leaks](/en/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/)
*   [Dieting for Bloated Docker Images: A Journey from 1.2 GB to 78 MB](/en/docker-imaj-boyutu-kucultme-rehberi/)
*   [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/)

[^1]: The `keepAlive` setting on the Node.js side only ensures the application keeps the connection open. If the kernel-level TCP keepalive time is not changed, dead connections will still remain stuck at the operating system level for 2 hours.