Title: Putting Idle VRAM to Work: Using Nvidia VRAM as Swap in Linux (nbd-vram)
Date: 2026-06-26 03:32
Category: Donanım
Tags: Nvidia, VRAM, Swap, Linux, Donanım, Cuda, NBD
Slug: nvidia-vram-swap-alani-nbd-vram
Authors: yuceltoluyag
Status: published
Summary: We explore how to configure the idle VRAM of your Nvidia graphics card as high-priority swap space on Linux using NBD (Network Block Device) and CUDA.
Template: article
Lang: en

The other day, around midnight at my desk, I was analyzing the resource usage of our old hybrid graphics laptop (AMD CPU + Nvidia GPU). Since the AMD card drives the display, that sweet Nvidia GPU just sat there completely idle, VRAM totally empty. Since the RAM is soldered to the motherboard, I have no way of upgrading it. While thinking, "Man, it would be awesome if we could use this idle GPU memory as a swap space," a fresh project fell right onto my screen from the dark corners of GitHub: **nbd-vram**.

!!! warning "Critical Warning: All Responsibility is Yours! ⚠️"
    Let me warn you in bold letters right from the start, my friend: this project is very new and completely experimental. Before installing and trying it on your system, make sure to back up your critical data. The responsibility is entirely yours! I just discovered this crazy repo and poked around to see how it works.

Using idle graphics card memory as swap space is like turning that fancy, unused guest room in your house into a pantry to relieve the clutter in the main rooms. If you are ready for such an experimental adventure, my friend, let's take a close look at the clever engineering details behind this system and how to set it up.

---

## 🛠️ How Does NBD-VRAM Work?

To open Nvidia graphics card memory directly for CPU usage, normally the Nvidia P2P API (mapping physical memory pages via ioremap) is tried. However, Nvidia restricts this API at the driver level for consumer GeForce cards. The solution only works on professional Quadro or datacenter cards.

Here is how `nbd-vram` bypasses this barrier in a very clever way:

1. A small service (daemon) running in the background allocates a space on VRAM using the standard CUDA driver API (which works on every card without CUDA restrictions).
2. This service serves the allocated VRAM space as a virtual disk over a local Unix socket using the NBD (Network Block Device)[^1] protocol.
3. The `nbd` module, already present in the Linux kernel, connects to this socket and presents it to the OS as a regular disk named `/dev/nbd0`.
4. All that is left is to activate this disk as swap space using the standard `mkswap` and `swapon` commands.

Throughout this process, no special kernel modules need to be written. Even if the kernel gets updated, the code does not need to be recompiled.

---

## 🏗️ Step-by-Step Installation

Let me remind you once more; this process is experimental. If you want to try it, after installing the necessary packages (Nvidia driver, `nbd-client`, `gcc`, and `make`), you can run the following commands:

```bash
$ git clone https://github.com/c0dejedi/nbd-vram
$ cd nbd-vram
$ sudo ./install.sh
```

The installation script (`install.sh`) will automatically configure the service files and connection threads based on your CPU core count. To start the service:

```bash
$ sudo systemctl start vram-swap-nbd
```

To verify the installation is successful, you can query active swap spaces:

```bash
$ swapon --show
```

If you see a swap space named `/dev/nbd0` with your designated size in the output, you're good to go.

---

## 🔒 Security and Deadlock Protection

When running a system entirely on swap space, if the RAM drops to zero, the OS trying to page the background NBD service to disk creates a complete deadlock loop.

`nbd-vram` uses two important Linux security and memory mechanisms to prevent this:

* **mlockall:[^2]** The service locks its own memory in physical RAM via the `mlockall` call. This prevents the kernel from ever trying to page the service's own code to the swap space on disk.
* **PR_SET_IO_FLUSHER:** The service registers itself to the kernel as an "IO Flusher." This prevents system lockups even when RAM is completely exhausted.
* **OOMScoreAdjust=-1000:** The priority of the service is set to the highest level to prevent the kernel from terminating the service when running out of RAM (OOM Killer).

---

## ⚡ Power Management and What Happens When Gaming?

During installation, the service asks whether to automatically disable the swap space when disconnected from AC power (battery mode). Activating this makes sense for battery savings.

When you want to use your graphics card for gaming or running AI models, you have two options: either reduce `VRAM_SETUP_SIZE_MB` in `/etc/systemd/system/vram-swap-nbd.service` to leave headroom for the GPU, or stop the service manually before starting heavy workloads:

```bash
$ sudo systemctl stop vram-swap-nbd
```

When the service is stopped, the data inside the VRAM is safely moved back to regular RAM or disk.

## 🔗 Related Posts
- [Best Graphics Cards for Local LLMs (2026)](/en/yerel-llmler-icin-en-iyi-gpu-2026/)
- [Running Node.js Containers Without Root in Docker](/en/docker-node-js-root-olmadan-calistirmak/)

[^1]: Network Block Device; a Linux kernel protocol that exposes a storage space as a block device over network or local Unix sockets.
[^2]: A Linux system call that locks physical memory pages in RAM, preventing the kernel from paging those pages to the swap space.
