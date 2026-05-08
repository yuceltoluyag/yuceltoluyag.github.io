Title: Installation of Home Assistant (HAOS) on Proxmox + ZFS
Date: 2025-11-30 14:15
Category: Server
Tags: proxmox, home assistant, haos, zfs, tteck, vm, linux, disk
Slug: proxmox-zfs-home-assistant
Authors: yuceltoluyag
Lang: en
Status: published
Summary: A manual Home Assistant installation guide on Proxmox with ZFS and SSD optimizations (q35, ssd=1), without hiding behind ready-made scripts.
Image: images/proxmox-zfs-home-assistant-xl.webp

Sometimes I ask myself, "Why do you choose the hard way when there's an easy one?" The internet is full of "install Home Assistant with a single line of code" scripts. Tteck's scripts, for example, are legendary, no doubt about it. But that control freak inside me won't stay quiet. I can't sleep thinking, "What if this script mounts my disk to the wrong place?" or "What is it actually doing in the background?"

The other day, while updating the server (and partially out of fear of spilling coffee on my keyboard), I said to myself; let's do the most optimized, cleanest installation manually, without using scripts, but by "borrowing" those fine performance settings (Q35, SSD flags, etc.) that the scripts use.

If you are like me and say "I need to know what's under the hood," you're in the right place. We're going to make Proxmox 9 and ZFS dance with Home Assistant.

## 1. Capturing the Image (Which one was the latest?)

First, let's SSH into the Proxmox server. You could use the web console, but when copying and pasting, that console window sometimes acts up, letters get displaced... No need for that.

```bash
ssh root@vhost01
```

Now, there's no need to wander around the Home Assistant site wondering "what was the latest version?" This set of commands goes to GitHub and says "Give me the latest stable version, brother" and downloads it.

```bash
# Automatically find and download the version
ha_version=$(curl -s https://raw.githubusercontent.com/home-assistant/version/master/stable.json | grep "ova" | cut -d '"' -f 4)

wget -q --show-progress https://github.com/home-assistant/operating-system/releases/download/${ha_version}/haos_ova-${ha_version}.qcow2.xz
```

Did it download? Great. Now let's extract the package.

```bash
unxz haos_ova-${ha_version}.qcow2.xz
```

By the way, don't bother copying the filename, it completes it when you press the `tab` key anyway. (Everyone knows this, but it just came to mind).

## 2. Creating the VM (But not just plain)

Look, this part is very important. We used to use `i440fx`, and it worked. But times have changed. If you're going to plug a Zigbee USB into this Home Assistant or do GPU passthrough tomorrow, the **Q35** chipset is a must. Scripts make this default, so why shouldn't we?

I chose `206` as the VM ID; 106 or 300 would work too, it's up to you.

```bash
qm create 206 \
  --name hass01 \
  --pool PROD \
  --tags prod \
  --ostype l26 \
  --machine q35 \
  --agent 1 \
  --bios ovmf \
  --cpu host,flags=+aes \
  --cores 4 \
  --memory 4096 \
  --numa 0 \
  --scsihw virtio-scsi-pci \
  --net0 virtio=AA:BB:CC:DD:E2:06,bridge=vmbr00,firewall=1,tag=50
```

!!! warning "Be Careful When Copy-Pasting! 💣"
The command above has settings specific to my own server; it will fail if you paste it directly:
* `--pool PROD`: If you don't have a pool named "PROD," delete this line.
* `--net0 ...`: I use `vmbr00` and `tag=50` (VLAN). You probably have `vmbr0` and no VLAN. Adjust it for yourself!

!!! note "Q35 Detail"
The `--machine q35` parameter is critical for modern PCIe hardware. We also set the CPU to `host` mode so it doesn't waste time in the virtualization layer and uses all the features of the host machine.

## 3. Throwing the Disk into the ZFS Pool

You know the name of your storage area, right? I use `pve_vdisks`, but in 90% of cases, it says `local-zfs` for you.

```bash
pvesm status
```

Let's throw the image we downloaded into the pool:

```bash
qm importdisk 206 haos_ova-${ha_version}.qcow2 pve_vdisks
```

This process might take a while depending on the disk speed. In the meantime, go drink some water, get up from the chair. A herniated disk is no joke.

## 4. Where It All Happens: Disk Settings

This is where the "magic" of the tteck script lies. If you mount the disk plainly, will it work? Yes. But Home Assistant will think it's an old-style spinning hard drive. We'll tell it, "Hey, you're on an SSD, relax" (`ssd=1`).

Also, we need to specially configure the EFI disk for Proxmox 9 and Secure Boot compatibility.

```bash
# First, a tiny EFI disk
pvesm alloc pve_vdisks 206 vm-206-disk-0 4M

# Now we explode the real bomb
qm set 206 
  --efidisk0 pve_vdisks:vm-206-disk-0,efitype=4m \
  --scsi0 pve_vdisks:vm-206-disk-1,ssd=1,discard=on,iothread=1 \
  --boot order=scsi0
```

The `discard=on` command here is vital for ZFS. Without TRIM support, that disk will bloat and bloat, and then you'll deal with "Disk full" warnings. I know this from experience.[^1]

Also, let's enlarge the disk a bit; 32GB is standard, if you think it won't be enough, make it 64.

```bash
qm resize 206 scsi0 32G
```

## 5. Verification (Paranoia is Good)

We've done everything, but let's see if the disks are actually there.

```bash
pvesm list pve_vdisks --vmid 206
```

The output should look something like this (One 4MB, the other 32GB):

```
Volid                    Format  Type             Size VMID
pve_vdisks:vm-206-disk-0 raw     images        4194304 206
pve_vdisks:vm-206-disk-1 raw     images    34359738368 206
```

If you also want to see the ZFS datasets:

```bash
zfs list | grep 206
```

## 6. Bismillah: We're Starting

If everything is in place, we can start the engine.

```bash
qm start 206
```

After the VM starts, find its IP address (from the router or console), and type `http://IP_ADDRESS:8123` into your browser. If you see that famous "Home Assistant is preparing" screen, the process is complete.

I mean, using scripts isn't bad, but installing it manually doesn't exactly make you feel like "Mr. Robot." Plus, now you've tightened every screw in the system yourself; if a problem arises, you know where to look. Enjoy using it! 👋

[^1]:
    A VM where I once forgot to turn on discard occupied 500GB on ZFS, even though it didn't have 100GB of data. Cleaning it up was a total torture.
