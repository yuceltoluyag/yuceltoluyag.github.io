Title: Full-Spectrum Paranoia on Linux: A-Z Security with ClamAV
Date: 2025-11-14 02:30
Category: Linux
Tags: clamav, güvenlik, linux, on-access, clamd, freshclam, milter, sorun giderme, tech-sohbetçi
Slug: linux-guvenlik-clamav-tam-kapsamli-rehber
Authors: yuceltoluyag
Summary: Forget the previous guide. This time, we're NOT just installing a daemon; we're unleashing ClamAV's full potential, from notifications and VirusEvent to email scanning with milter, multi-core tricks, and all possible debugging.
Image: images/linux-clamav-xl.webp
Lang: en
Status: published
toot: https://mastodon.social/@yuceltoluyag/115553349825156285
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6prd6b42227

## Introduction: Why Are We Still Dealing With This?

Let's put aside the myth that "Linux doesn't get viruses." This complacency has become our biggest security vulnerability. Our market share may be low compared to Windows, which is why big companies don't bother releasing specialized "Endpoint Security" packages for us. Existing tools often lack the advanced features of their Windows counterparts.

But the world has changed. Linux servers, IoT devices... The attack surface grows every day, and the number of Linux-based malware is also increasing.

In this environment, one of the most robust, open-source, and actively developed strongholds we have is **Clam AntiVirus (ClamAV)**.

ClamAV is an antivirus toolkit for UNIX systems. Since it's typically used on file/mail servers, it focuses on detecting malware with its built-in signatures; it's not a traditional "endpoint security" package. We will configure it like a server.

---

### Step 1: Installation and Toolkit

As always, we're going with Arch (or its derivatives):

```bash
sudo pacman -S clamav
```

This command doesn't just install `clamav`; it gives us a Swiss Army knife:

- **`clamd`**: Our main target. The background service (daemon).
- **`clamonacc`**: Real-time protection (On-Access) service. Communicates with `clamd`.
- **`clamdscan`**: A fast client that scans via the `clamd` daemon.
- **`clamdtop`**: An interface to monitor `clamd`'s resource usage (like the `top` command).
- **`freshclam`**: Virus signature database update tool.
- **`clamconf`**: Tool for creating and checking configuration files.

All these tools communicate with `clamd` via a **socket**. By default, this is done via a "LocalSocket" (a local Unix socket).

#### ⚠️ TCP Socket Warning (For Professionals)

ClamAV also allows remote communication by opening a network socket named "TCPSocket".

!!! danger "Absolutely Read: Security Warning If you choose to use `TCPSocket` in your `clamd.conf` file, be aware that this port has **no authentication or protection whatsoever**. Generally, use the local Unix socket (`LocalSocket`). If you must expose it to the network, you must _very_ strictly protect this port with firewall rules."

For more information, you can refer to these resources:

- [Detailed Information (Official Blog)](https://blog.clamav.net/2016/06/regarding-use-of-clamav-daemons-tcp.html){: target="\_blank" rel="noopener noreferrer"}
- Detailed Information (Manual): [TCP Socket Configuration](https://docs.clamav.net/manual/Usage/Scanning.html#clamd-v0101){: target="\_blank" rel="noopener noreferrer"}

Also, remember that when using `LocalSocket`, `clamd` must run under a user (usually `clamav` user) who has read access to the files you plan to scan.

---

### Step 2: Creating Configuration Files

The package should come with default `.conf` files. If not, or if you want to create them from scratch, `clamconf` is for that:

```bash
# If necessary (usually not needed)
# sudo clamconf -g freshclam.conf > /etc/clamav/freshclam.conf
# sudo clamconf -g clamd.conf > /etc/clamav/clamd.conf
# sudo clamconf -g clamav-milter.conf > /etc/clamav/clamav-milter.conf
```

Our main configuration files are:

- **`freshclam`**: `/etc/clamav/freshclam.conf` (For updates)
- **`clamd`**: `/etc/clamav/clamd.conf` (The daemon's brain)
- **`clamd milter`**: `/etc/clamav/clamav-milter.conf` (For email filter)

When you're done, you can check your settings by running the `clamconf` command. The default installation already sets up the `clamav` user, group, and necessary `clamd` settings to a "reasonable" level.

But we won't settle for "reasonable."

---

### Step 3: `clamd.conf` – The Brain of the Beast (Full Version)

Open the file with `sudo nano /etc/clamav/clamd.conf` and find the following settings, uncomment or add them. This is my recommended "paranoid but performant" settings list:

```ini
# /etc/clamav/clamd.conf

# Add a timestamp to every message. Saves lives when debugging.
# Default: no
LogTime yes

# Provide ADDITIONAL information like file size, hash when a virus is found.
ExtendedDetectionInfo yes

# REQUIRED for security. Run the daemon as 'clamav' user.
# (clamd needs to be started as root to make this change)
# Default: drop privileges
User clamav

# How deep will it go into directories?
# Default: 15
MaxDirectoryRecursion 20

# Detect Potentially Unwanted Applications (PUA).
# 'Tools' downloaded from torrents are usually considered PUA. Definitely 'yes'.
DetectPUA yes

# Enable Heuristic scanning. Catches unknown but suspicious-looking items.
HeuristicAlerts yes

# === Scan Targets (Enable all) ===
ScanPE yes
ScanELF yes
ScanOLE2 yes
ScanPDF yes
ScanSWF yes
ScanXMLDOCS yes
ScanHWP3 yes
ScanOneNote yes
ScanMail yes
ScanHTML yes
ScanArchive yes
Bytecode yes

# === Alerts (Enable these too) ===
AlertBrokenExecutables yes
AlertBrokenMedia yes
AlertEncrypted yes
AlertEncryptedArchive yes
AlertEncryptedDoc yes
AlertOLE2Macros yes
AlertPartitionIntersection yes
```

---

### Step 4: Updating the Database (`freshclam`)

We need the database before starting the daemon.

```bash
# Update manually (required for first run)
sudo freshclam
```

If you are behind a proxy, edit the `HTTPProxyServer`, `HTTPProxyPort`, etc. settings in `/etc/clamav/freshclam.conf`.

Database files (`daily.cvd`, `main.cvd`, `bytecode.cvd`) are saved in `/var/lib/clamav/`.

#### Automatic Updates: Service vs. Timer

You have **two** options for automatic updates. Do not run both.

1.  **`clamav-freshclam.service` (Daemon Mode):**

    - This runs `freshclam` as a daemon and checks for updates 12 times a day (every 2 hours) by default.
    - **Note:** This service also checks on every start. If you check more than once an hour, you will be **banned** from the ClamAV CDN for 24 hours.

2.  **`clamav-freshclam-once.timer` (Timer Mode):**

    - This is a systemd timer that runs `freshclam` once a day.
    - **Note:** This timer adheres to your set schedule regardless of reboots or service stoppages.

I generally prefer the `.service` option.

```bash
# Let's create the necessary log file (permissions are important)
sudo touch /var/log/clamav/freshclam.log
sudo chmod 600 /var/log/clamav/freshclam.log
sudo chown clamav /var/log/clamav/freshclam.log

# Option 1: Start the Service (Recommended)
sudo systemctl start clamav-freshclam.service
sudo systemctl enable clamav-freshclam.service

# Option 2: Start the Timer (Alternative)
# sudo systemctl start clamav-freshclam-once.timer
# sudo systemctl enable clamav-freshclam-once.timer
```

---

### Step 5: Real-time Protection (OnAccessScan)

This is the most enjoyable part. Scanning a file downloaded from a torrent as soon as it's downloaded.

#### A. Basic Configuration

Go back to `sudo nano /etc/clamav/clamd.conf` and add/edit these lines:

```ini
# /etc/clamav/clamd.conf (SECTION TO ADD)

# Exclude the scanner's own user (clamav) from the scan loop.
OnAccessExcludeUname clamav

# Mount point to monitor. '/' monitors the entire system.
OnAccessMountPath /

# Alternatively, you can monitor only specific directories:
# OnAccessIncludePath /home

# Scan NEWLY CREATED, MOVED, or RENAMED files.
OnAccessExtraScanning yes

# Optional: Exclude processes owned by the root user
# OnAccessExcludeRootUID true
```

!!! danger "Blocking (Prevention) Setting: VERY CRITICAL **ALWAYS leave `OnAccessPrevention no` as `no`**."

!!! note "Blocking with `OnAccessMountPath` (`yes`) does not work anyway. It works with `OnAccessIncludePath`, but if you set it to `yes` while monitoring system directories like `/usr`, `/etc`, or `/var`, as the Arch Wiki warns, **you can slow down your package installations by 1000 times.** Our goal is not to 'block' but to 'detect and be notified'."

#### B. Overcoming Permission Issues with `fdpass` (Advanced)

By default, `clamonacc` (running as root) only sends the accessed _filenames_ to `clamd` (running as clamav). If the `clamav` user does not have read permission for that file, the scan will fail.

Solution: Make `clamonacc` pass the file descriptor (`fdpass`) to `clamd`.

For this, we need to edit the `clamav-clamonacc.service` service:

```bash
# To edit the systemd service file
sudo systemctl edit clamav-clamonacc.service
```

Paste the following into the empty file that opens:

```ini
[Service]
ExecStart=
ExecStart=/usr/sbin/clamonacc -F --fdpass --log=/var/log/clamav/clamonacc.log
```

This deletes the existing `ExecStart` command and adds a new one with the `--fdpass` flag.

---

### Step 6: Setting Up Desktop Notifications

So far, ClamAV only silently writes to the log file when it finds a virus. We want to see an alert on our desktop.

**1. Edit `clamd.conf`**

Add this line to `sudo nano /etc/clamav/clamd.conf`:

```ini
VirusEvent /etc/clamav/virus-event.bash
```

This tells `clamd` to "run this script when a virus is found."

**2. Grant `sudoers` Permission**

We need to allow the `clamav` user to run the `notify-send` command on behalf of other users.

```bash
sudo visudo -f /etc/sudoers.d/clamav
```

Add this line to the empty file that opens:

```
clamav ALL = (ALL) NOPASSWD: SETENV: /usr/bin/notify-send
```

**3. Create the `virus-event.bash` Script**

Now let's create that script:

```bash
sudo nano /etc/clamav/virus-event.bash
```

Paste this inside:

```bash
#!/bin/bash
PATH=/usr/bin
ALERT="ClamAV Signature Detection: $CLAM_VIRUSEVENT_VIRUSNAME -> $CLAM_VIRUSEVENT_FILENAME"

# Send notification to all active graphical users
for ADDRESS in /run/user/*; do
    USERID=${ADDRESS#/run/user/}
    /usr/bin/sudo -u "#$USERID" DBUS_SESSION_BUS_ADDRESS="unix:path=$ADDRESS/bus" PATH=${PATH} \
        /usr/bin/notify-send -u critical -i dialog-warning "VIRUS FOUND!" "$ALERT"
done
```

**4. Make the Script Executable**

```bash
sudo chmod +x /etc/clamav/virus-event.bash
```

Now, when `clamd`'s OnAccess scan finds something, you'll see a critical notification on your desktop.

---

### Step 7: Starting Services (Igniting the Engine)

Everything is ready. First, make sure you've updated the database (Step 4).

!!! warning "RAM Warning Starting the daemon loads all virus signatures into RAM. As of February 2024, this requires **at least 1.6 GB of free RAM**. At the time of update, this need can temporarily double. On low-RAM systems (if `clamd` doesn't start), you may need to create swap space."

```bash
# Start the main daemon
sudo systemctl start clamav-daemon.service
sudo systemctl enable clamav-daemon.service

# Start the real-time protection daemon
sudo systemctl start clamav-clamonacc.service
sudo systemctl enable clamav-clamonacc.service
```

If `AppArmor` (common on Ubuntu/Debian) gives errors about `clamd`, put the profile in complain mode: `sudo aa-complain clamd`

---

### Step 8: Test Drive (EICAR)

Is our system working? Let's check with a harmless test file called `EICAR`.

**Test 1: Manual Scan (with Daemon)**

```bash
curl https://secure.eicar.org/eicar.com.txt | clamdscan -
```

You should see `stdin: Win.Test.EICAR_HDB-1 FOUND` in the output. Note that we are using `clamdscan`, not `clamscan`.

**Test 2: Real-time Protection**

Try downloading the EICAR file to a monitored directory (e.g., Downloads):

```bash
cd ~/Downloads/
wget https://secure.eicar.org/eicar.com.txt
```

As soon as the file downloads (or when you try to read it with `cat eicar.com.txt`), the desktop notification you set up in Step 6 should pop up.

---

### Step 9: More Eyes (Additional Databases)

ClamAV's official signatures are good, but we can enhance its power with additional community-maintained databases (MalwarePatrol, SecuriteInfo, Yara, LMD signatures, etc.).

For this, you can install one of two tools from AUR:

1.  **`python-fangfrisch` (AUR)**: Designed as a more secure, flexible, and modern replacement for `clamav-unofficial-sigs`. **This is recommended.**
2.  **`clamav-unofficial-sigs` (AUR)**: The older and more common tool.

#### Option 1: Fangfrisch Installation (Recommended)

Install with `yay -S python-fangfrisch` (or your AUR helper).

```bash
# Its configuration is very simple (/etc/fangfrisch/fangfrisch.conf)
# Its biggest advantage is that it never requires root permissions.

# Initialize the database structure as 'clamav' user
sudo -u clamav /usr/bin/fangfrisch --conf /etc/fangfrisch/fangfrisch.conf initdb

# Enable the timer
sudo systemctl enable fangfrisch.timer
```

#### Option 2: clamav-unofficial-sigs Installation (Alternative)

Install with `yay -S clamav-unofficial-sigs`.

```bash
# Enable the timer
sudo systemctl enable clamav-unofficial-sigs.timer

# To run manually
# sudo clamav-unofficial-sigs.sh

# Configuration file: /etc/clamav-unofficial-sigs/user.conf
```

**Adding MalwarePatrol Database (Optional):**
If you want to use MalwarePatrol (they have free/paid plans), register at [Malware Block List](https://malwareblocklist.org/){: target="\_blank" rel="noopener noreferrer"}. Then (if you are using `clamav-unofficial-sigs`), edit the `/etc/clamav/clamav-unofficial-sigs/user.conf` file:

```ini
malwarepatrol_receipt_code="YOUR_INVOICE_NUMBER_HERE"
malwarepatrol_product_code="8" # 8 for free account, 15 for Premium
malwarepatrol_list="clamav_basic" # basic or ext
malwarepatrol_free="yes" # yes for free, no for Premium
```

---

### Step 10: Manual Scan Options

You might want to perform manual scans even when the daemon is running.

1.  **`clamscan` (Standard/Old Method):**

    - This **does not** use the daemon. It reloads the entire database into RAM every time.
    - It's slow. Only use it if `clamd` is not running.
    - `clamscan --recursive --infected /home/user`
    - `--remove`: Deletes the found file (Dangerous).
    - `--move=/safe/directory`: Moves to quarantine (Safer).
    - `--max-filesize=4000M --max-scansize=4000M`: Scans files larger than default.
    - `-l /path/to/logfile.log`: Writes results to a file.

2.  **`clamdscan` (Daemon/Fast Method):**

    - This passes the job to `clamd` running in the background. **It's super fast.**
    - It reads most settings (`--max-filesize`, etc.) from `clamd.conf`.
    - `clamdscan /home/user`

---

### Step 11: Tips and Tricks (Pro Level)

#### Multi-Core Usage

1.  **With `clamscan` (BAD METHOD):**
    `clamscan` runs on a single core. You can parallelize it with `xargs`:
    `find /home/user -type f -print0 | xargs -0 -P $(nproc) clamscan`
    **DO NOT DO THIS:** This starts as many `clamscan` processes as CPU cores, and each loads the database into RAM. If you have 16 cores, it would require 1.6GB \* 16 = ~25GB RAM. It will crash your system.

2.  **With `clamdscan` (CORRECT METHOD):**
    `clamd` is already designed for multi-core.
    `clamdscan --multiscan --fdpass /home/user`

    - `--multiscan`: Scans the directory in parallel using as many threads as `MaxThreads` (default 10) in `clamd.conf`.
    - `--fdpass`: Passes permissions (file descriptor) so `clamd` (clamav user) can read your files (user).

#### Properly Enabling TCPSocket

Remember the warning in Step 1? If you enable TCPSocket (e.g., `127.0.0.1:3310`) in `clamd.conf`, you also need to edit the `systemd` socket file, otherwise they will conflict:

`sudo systemctl edit clamav-daemon.socket`

Add this to the opened file (to listen on both local and TCP sockets):

```ini
[Socket]
ListenStream=
ListenStream=/run/clamav/clamd.ctl
ListenStream=127.0.0.1:3310
```

Then run `sudo systemctl restart clamav-daemon.socket`. You can see the port being listened to with `ss -tulpn | grep clamd`.

---

### Step 12: Email Protection (Milter)

If you are running an email server like `Sendmail` or `Postfix` on your system, you can connect ClamAV as a "milter" (mail filter) to scan incoming emails.

**1. `clamav-milter.conf` Settings**
Edit the `/etc/clamav/clamav-milter.conf` file:

```ini
MilterSocket /tmp/clamav-milter.socket
MilterSocketMode 660
FixStaleSocket yes
User clamav
MilterSocketGroup clamav
PidFile /run/clamav/clamav-milter.pid
TemporaryDirectory /tmp
ClamdSocket unix:/run/clamav/clamd.ctl
LogSyslog yes
LogInfected Basic
```

**2. Creating systemd Service**
`sudo nano /etc/systemd/system/clamav-milter.service`

```ini
[Unit]
Description='ClamAV Milter'
After=clamav-daemon.service

[Service]
Type=forking
ExecStart=/usr/bin/clamav-milter --config-file /etc/clamav/clamav-milter.conf
Restart=Always

[Install]
WantedBy=multi-user.target
```

**3. Postfix Setting (Example)**
If you are using Postfix, add this to `/etc/postfix/main.cf`:

```ini
smtpd_milters = unix:/tmp/clamav-milter.socket
milter_default_action = tempfail
```

**4. Starting**
`sudo systemctl enable --now clamav-milter.service`
Check logs with `journalctl`. If Postfix does not have access to the socket, add the `postfix` user to the `clamav` group: `sudo gpasswd -a postfix clamav`.

---

### Step 13: Troubleshooting (Headaches)

- **Error: `Clamd was NOT notified` (after freshclam)**

  - **Problem:** `freshclam` cannot notify `clamd` because the socket file (`clamd.ctl`) is missing or in the wrong place.
  - **Solution:** Open `clamd.conf` and uncomment and activate the line `LocalSocket /run/clamav/clamd.ctl`. Restart `clamav-daemon.service`.

- **Error: `No supported database files found` (when clamd starts)**

  - **Problem:** The `DatabaseDirectory` settings in `freshclam.conf` and `clamd.conf` do not match. One might say `/var/lib/clamav` while the other says `/usr/share/clamav`.
  - **Solution:** Check both files and ensure that the `DatabaseDirectory` paths are **the same** (usually `/var/lib/clamav`).

- **Error: `Can't create temporary directory`**

  - **Problem:** Permission error. Logs usually show a UID/GID number.
  - **Solution:** Correct the ownership of the `/var/lib/clamav` directory.
    `sudo chown -R clamav:clamav /var/lib/clamav`
    `sudo chmod 755 /var/lib/clamav`

---

### Conclusion: Now You're Truly Paranoid

This guide contains every detail from the source. You are no longer just someone running `clamscan`. You have a ClamAV beast running in the background, ready in RAM, scanning with multiple cores, catching new files instantly, sending you desktop notifications, filtering your emails, and empowered with extra databases.

Still, remember: The best antivirus is you, reading the comments on that torrent.
