Title: EA SPORTS FC 27 on Arch Linux: Turkish Commentary and DragonRise Gamepad Guide
Date: 2026-11-05 01:15
Modified: 2026-11-05 01:21
Category: Oyun
Tags: arch linux, linux oyunları, EA SPORTS FC 27, Türkçe spiker, Türkçe anlatım, dragonrise gamepad, 0079:0006, steam input, xbox 360 controller, evdev, uinput, python-evdev, steam, proton
Slug: arch-linux-dragonrise-gamepad-xbox-360-kontrolcu-sorunu
Authors: yuceltoluyag
Lang: en
Translation: false
Status: published
Summary: My experience transferring Turkish commentary from the Windows Demo files to the full game on Linux for EA SPORTS FC 27, and turning a DragonRise 0079:0006 gamepad into a virtual Xbox 360 controller with uinput on Arch Linux. The file transfer, Python-evdev, calibration, and systemd setup are explained step by step.
Template: article


This guide brings together two separate issues I encountered while playing EA SPORTS FC 27 on Arch Linux with Steam and Proton, along with the solutions I applied.

The first section explains how I made Turkish commentary work by transferring the Turkish commentary and localization files from the Windows version to the game installation on Linux. In the second section, I introduce a DragonRise USB gamepad that Linux recognized but the game could not use as a virtual Xbox 360 controller through `uinput`.

I have preserved not only the final steps, but also the omissions I encountered in my first attempts, the checks I performed, and the output I received during setup. This makes clear what each step verifies and which points still need to be tested separately.

- **Platform:** Arch Linux, Steam, and Proton
- **Game:** EA SPORTS FC 27
- **Controller:** DragonRise USB PC Twin Shock / PS2-style dual-analog gamepad
- **Kernel:** `7.2.11-zen1-1-zen`

**Result:** Turkish commentary worked in the game on Linux. On the DragonRise side, physical inputs were passed through to a virtual Xbox controller. A video showing the Turkish commentary in the game is at the end of the article.

## Table of Contents

1. Defining the problems
2. Structure of the Turkish commentary files
3. Comparing the Windows and Linux game files
4. Transferring the Turkish commentary files
5. If Turkish commentary does not appear
6. Diagnosing the gamepad on Linux
7. Steam Input and XInput compatibility
8. Installing DragonRise Gamepad Fix v2
9. Adapting the installation script for Arch Linux
10. Calibration and button mapping
11. Verifying the virtual controller
12. Steam and in-game tests
13. Troubleshooting
14. Security, rollback, and maintenance
15. Conclusion and checklist

---

# 1. Defining the problems
Not every issue encountered while running Windows games on Linux occurs at the same layer. I had two different issues in this case.

### Problem A: Turkish commentary did not appear in the Linux version

The Turkish commentary files from the Windows version did not initially appear in the full game installation on Linux. I first examined the audio archives and their `.toc` index files, then identified and transferred the missing files related to Turkish localization. After these steps, the Turkish commentary worked in the game. You can see the working result in the video at the end of the article.

### Problem B: The gamepad worked on the desktop but not in the game
The controller was detected by Linux as a USB device. Its buttons and analog sticks worked in KDE's controller test screen. Nevertheless, the game did not recognize the gamepad.

This distinction is critical:

- **USB detection:** Is the physical device connected to the system?
- **Linux input system:** Are button and axis events being generated?
- **Controller API:** Can Steam and the game see the gamepad interface they expect?
- **Game:** Can the controller actually be used in the game?

The fact that the first two layers work does not mean the last two will work as well.

# 2. Structure of the Turkish commentary files
The files associated with Turkish commentary in the game's data directory were:

```text
Data/Win32/
├── commentaryfull_tur_tr.toc
├── commentarylaunch_tur_tr.toc
├── loc/
│   └── tr.toc
└── superbundlelayout/
    ├── commentaryfull_tur_tr/
    │   ├── cas_01.cas
    │   └── cas_02.cas
    ├── commentarylaunch_tur_tr/
    │   └── cas_01.cas
    ├── installpackage_00/
    │   └── tr/
    │       ├── cas_01.cas
    │       └── loc/
    │           └── tr.toc
    └── installpackage_05/
        └── tr/
            ├── cas_01.cas
            └── loc/
                └── tr.toc
```

The general roles of these files can be understood as follows:

- **`.cas`:** The game's packaged data archives. They may contain audio, language, or other game assets.
- **`.toc`:** Table files associated with locating and indexing content.
- **`loc/tr.toc`:** An index file associated with Turkish localization.
- **`commentaryfull_tur_tr`:** A data group associated with the full Turkish commentary content.
- **`commentarylaunch_tur_tr`:** May be a data group associated with opening or launch commentary.

File names alone do not prove exactly what the files contain. However, file sizes and the game's data layout provide useful clues when investigating which files need to be transferred.


Example sizes:

| File | Approximate size |
| --- | --- |
| `commentaryfull_tur_tr.toc` | 202 KiB |
| `commentarylaunch_tur_tr.toc` | 923 bytes |
| `commentaryfull_tur_tr/cas_01.cas` | 1.0 GiB |
| `commentaryfull_tur_tr/cas_02.cas` | 383 MiB |
| `commentarylaunch_tur_tr/cas_01.cas` | 4 KiB |
| `installpackage_00/tr/cas_01.cas` | 12 KiB |
| `installpackage_05/tr/cas_01.cas` | 4.27 MiB |


These sizes show that the Turkish commentary archives contain a significant amount of data. Copying only the small index files may not be enough.

# 3. Comparing the Windows and Linux game files

First, I confirmed that the Turkish commentary files were present in the Windows Demo installation.

Windows source directory:

```bash
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
```
Linux destination directory:

```bash
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
```
These paths will differ on another computer. Use your own installation directories.

## 3.1. Checking which files are present on Linux
```bash
cd "/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
ls -lh commentary*tur_tr.toc
```
The expected files were:

```text
commentaryfull_tur_tr.toc
commentarylaunch_tur_tr.toc
```
Even though these two files had been transferred, the game still did not offer Turkish commentary at this point.

The conclusion was that the two `.toc` files alone were not sufficient. The related `.cas` archives and localization files also had to be considered together.

## 3.2. Identifying missing files systematically
To check each file individually:

```bash
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
for f in \
  "loc/tr.toc" \
  "superbundlelayout/installpackage_00/tr/cas_01.cas" \
  "superbundlelayout/installpackage_00/tr/loc/tr.toc" \
  "superbundlelayout/installpackage_05/tr/cas_01.cas" \
  "superbundlelayout/installpackage_05/tr/loc/tr.toc"
do
  echo
  echo "=== $f ==="
  if [[ -f "$SRC/$f" ]]; then
    stat -c 'Windows: %s bayt' "$SRC/$f"
  else
    echo "Windows: BULUNAMADI"
  fi
  if [[ -f "$DST/$f" ]]; then
    stat -c 'Linux:   %s bayt' "$DST/$f"
  else
    echo "Linux:   EKSİK"
  fi
done
```
This check showed that five files present on the Windows side were missing on Linux.

Comparing file sizes is a simple way to determine whether copying actually took place.

# 4. Transferring the Turkish commentary files
The following files were copied in the first transfer:

- `commentaryfull_tur_tr.toc`
- `commentarylaunch_tur_tr.toc`
- `superbundlelayout/commentaryfull_tur_tr/cas_01.cas`
- `superbundlelayout/commentaryfull_tur_tr/cas_02.cas`
- `superbundlelayout/commentarylaunch_tur_tr/cas_01.cas`

Later, the five missing localization files were transferred as well.

## 4.1. Safe transfer script
The following script is designed to copy specific files from the Windows source directory to the Linux destination directory. If a file already exists at the destination, it first makes a backup.

It can be saved as `~/turkce-dil-tamamla.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
FILES=(
  "loc/tr.toc"
  "superbundlelayout/installpackage_00/tr/cas_01.cas"
  "superbundlelayout/installpackage_00/tr/loc/tr.toc"
  "superbundlelayout/installpackage_05/tr/cas_01.cas"
  "superbundlelayout/installpackage_05/tr/loc/tr.toc"
)
# Kaynakların tamamını kopyalamadan önce doğrula.
for f in "${FILES[@]}"; do
  if [[ ! -f "$SRC/$f" ]]; then
    echo "Kaynak dosya bulunamadı: $SRC/$f"
    exit 1
  fi
done
echo "Kaynak: FC 27 Demo"
echo "Hedef:  FC 27"
echo "Sürümler farklıysa dosyalar uyumsuz olabilir."
read -r -p "Devam etmek için evet yaz: " answer
[[ "$answer" == "evet" ]] || exit 0
BACKUP="$DST/turkce-locale-backup-$(date +%Y%m%d-%H%M%S)"
backup_needed=0
for f in "${FILES[@]}"; do
  if [[ -e "$DST/$f" ]]; then
    backup_needed=1
  fi
done
if (( backup_needed )); then
  mkdir -p "$BACKUP"
  for f in "${FILES[@]}"; do
    if [[ -e "$DST/$f" ]]; then
      mkdir -p "$BACKUP/$(dirname "$f")"
      cp -a "$DST/$f" "$BACKUP/$f"
    fi
  done
  echo "Yedek: $BACKUP"
fi
for f in "${FILES[@]}"; do
  mkdir -p "$DST/$(dirname "$f")"
  cp -av "$SRC/$f" "$DST/$f"
done
echo "Türkçe yerelleştirme dosyaları kopyalandı."
```
Çalıştırmak için:

```bash
chmod +x ~/turkce-dil-tamamla.sh
bash ~/turkce-dil-tamamla.sh
```
This script copies only the five specified files. The initial transfer of the large commentary archives must be done separately.

## 4.2. Important limitation: The Demo and full game may not be the same version
There was a version difference in the configuration files I examined:

**Game on Linux:**

```text
Name       EA SPORTS FC 27
Version    1.0.140.52122
ContentId  16425884
```
**Windows Demo:**

```text
Name       EA SPORTS FC 27 Lite
Version    1.0.141.12554
ContentId  16425884_sc
```
It is important to note this difference. The Demo and full release used different version numbers and package IDs. Nevertheless, Turkish commentary worked after the transfer in this setup. That does not mean files from different versions will always work without issues; before repeating the process with another version, make a backup and verify the result in the game.

Therefore:

- Copying the files may succeed, but the game may not use them.
- The `.toc` indexes and `.cas` archives must be compatible with each other.
- Files taken from another version may stop working after a game update.
- Keep backups of the source and destination files.

## 4.3. Is it a good idea to copy the entire `Win32` directory?
After identifying the missing files, I also tried transferring the entire `Win32` directory from Windows. The working Turkish commentary result was achieved after this transfer process. However, copying the entire directory is not a safe first step on every system, because:

- The data packages belonging to the full Linux game may be overwritten.
- Files specific to the Demo or incompatible with a different version may be copied to the destination.
- Hundreds of megabytes or gigabytes of data may be copied unnecessarily.
- Game updates or file verification may revert the changes.

A more controlled approach is to identify the missing files first and, if possible, back up and transfer only the necessary files. Copying the entire directory in this article is what worked in my setup; make a backup before using the same method with different game versions.

If the game no longer launches or behaves incorrectly after copying the entire `Win32` directory, you may need to restore the original files using Steam's file verification feature.

# 5. If Turkish commentary still does not appear
The presence of files and the game's ability to recognize them are different things.

Perform these checks in order:

1. Recheck the commentary language settings in the game.

2. Fully close and restart the game, then see whether the language option has changed.

3. Make a backup before running Steam's game file verification.

4. Compare the sizes of the Windows source files and Linux destination files.

5. Check whether the `.toc` files and related `.cas` archives belong to the same version.

6. Inspect the language options in the game's configuration file.

In this setup, `tr_TR` was already present in the configuration files' language list. The presence of Turkish in the language list does not mean the Turkish audio package is complete.

Using a value such as `all` in a game's language options may help enable all available languages, but it does not create missing or incompatible audio archives by itself.

Turkish commentary worked in the setup described in this guide. If you do not get the same result with another installation, follow the checks above in order. I show the successful in-game result in the video at the end of the article.

---

# 6. Diagnosing the DragonRise gamepad on Linux
In the second issue, the controller appeared on Linux with the following USB ID:

```text
0079:0006 DragonRise Inc. PC TWIN SHOCK Gamepad
```
The controller appeared in the `lsusb` output. The following links were present in `/dev/input/by-id/`:

```text
usb-DragonRise_Inc._Generic_USB_Joystick-event-joystick
usb-DragonRise_Inc._Generic_USB_Joystick-joystick
```
This indicated that the Linux kernel recognized the controller.

## 6.1. Checking the USB connection
```bash
lsusb
```
Look for this line:

```text
ID 0079:0006 DragonRise Inc. PC TWIN SHOCK Gamepad
```
Here, `0079` is the vendor ID and `0006` is the product ID.

Because this ID may also be used by different physical controllers, you should not assume that every controller with the same USB ID has the same button layout.

## 6.2. Checking input devices
```bash
ls -l /dev/input/by-id/
```
Then:

```bash
cat /proc/bus/input/devices
```
A section similar to the following was shown for the physical device:

```text
N: Name="DragonRise Inc.   Generic   USB  Joystick"
H: Handlers=event9 js0
```
Here:

- `event9` is the Linux evdev interface.
- `js0` is the older Linux joystick API.

Buttons working in KDE's controller test screen confirmed that the physical device was generating input events.

For this reason, a USB connection issue or a completely missing kernel driver did not seem likely to be the direct cause.

## 6.3. Testing the physical controller with `evtest`
```bash
sudo evtest
```
Select the physical DragonRise device from the list.

When pressing buttons and moving the analog sticks, `EV_KEY` or `EV_ABS` events should appear.

Example:

```text
Event: type 3 (EV_ABS), code 0 (ABS_X), value -16384
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 1
```
These show an analog axis movement and a button press, respectively.

This test is used to confirm that the physical controller works through the Linux input system. It does not, by itself, prove that the game recognizes the controller.

# 7. Steam Input, XInput, and Linux controller interfaces
Programs similar to XOutput on Windows can convert some controllers into the Xbox/XInput format that games expect.

A similar need can arise on Linux.

The `evdev` events Linux provides for a physical controller may differ from the controller interface expected by a game or Steam. Steam Input is one compatibility layer. Another solution is to create a virtual Xbox controller through `uinput`.

The basic distinction:

- **Physical device:** DragonRise USB gamepad.
- **Input source:** Linux `evdev` events.
- **Mapping:** Convert physical buttons and axes to virtual Xbox buttons and axes.
- **Virtual device:** A new input device presented to Linux as an Xbox 360 controller.
- **Consumer:** Steam or the game.

The goal of this approach is to present the game with the more common Xbox controller layout, rather than the physical device itself.

# 8. Installing DragonRise Gamepad Fix v2
The repository used in this setup:

`https://github.com/linsaftw/dragonrise-gamepad-fix`

The repository contained a mapping service for certain generic USB controllers with the `0079:0006` ID.

First, the source code was downloaded:

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone https://github.com/linsaftw/dragonrise-gamepad-fix.git
cd dragonrise-gamepad-fix
```
Check the files:

```bash
ls
```
The repository contained the following files and directories:

```text
bin/
config/
diagnose.sh
install.sh
src/
systemd/
udev/
uninstall.sh
VERSION
```
## 8.1. Why did the repository's Ubuntu installation script need to be changed?
The original `install.sh` in the repository used Ubuntu/Debian package-management commands:

```bash
dpkg-query
apt-get
apt-cache
```
These are not the standard package-management tools on Arch Linux.

The corresponding tools on Arch Linux are:

- Package check: `pacman -Q`
- Package installation: `pacman -S`
- Python evdev package: `python-evdev`
- Test utility: `evtest`

For that reason, the installation script needed to be adapted for Arch Linux.

## 8.2. Enabling the `uinput` module
To create a virtual controller:

```bash
sudo modprobe uinput
```
Then:

```bash
ls -l /dev/uinput
```
The device should appear in the output.

In this setup, the following result was returned:

```text
crw-rw----+ 1 root root 10, 223 ... /dev/uinput
```
`uinput` allows a userspace program to create virtual input devices. The mapping service here reads physical controller events and sends new events to a virtual Xbox device.

To load it persistently:

```bash
echo uinput | sudo tee /etc/modules-load.d/dragonrise-gamepad-fix.conf
```
## 8.3. Checking the Python dependency
```bash
python -c 'import evdev; print(evdev.__file__)'
```
On the working system, a path like this was returned:

```text
/usr/lib/python3.14/site-packages/evdev/__init__.py
```
This shows that the Python `evdev` module is available.

To install the required packages on Arch Linux:

```bash
sudo pacman -S --needed python-evdev evtest
```
If the packages are already installed, `--needed` helps avoid unnecessary reinstallation.

---

# 9. Adapting the installation script for Arch Linux
The adapted `install.sh` was modified to do the following:

1. Check that it is running with root privileges.

2. Check whether the `python-evdev` and `evtest` packages are available.

3. Load the `uinput` module.

4. Back up important files from the previous installation.

5. Stop old mapping services.

6. Place the Python files in `/usr/local/lib/dragonrise-gamepad-fix/`.

7. Install the scripts in `/usr/local/bin/`.

8. Copy the mapping profile to `/etc/dragonrise-gamepad-fix/profile.json`.

9. Install the systemd service and udev rule.

10. Calibrate the controller.

11. Enable the service and verify that the virtual Xbox controller is created.

## 9.1. Checking the script before installation
Check the script's syntax:

```bash
bash -n install.sh
```
Run the Python source files through a compile check:

```bash
python -m py_compile src/*.py
```
Both checks completed without errors.

However, these checks verify only syntax and Python compilation. They do not, on their own, guarantee that the service will run successfully.

## 9.2. Running the installation
```bash
sudo ./install.sh
```
During setup, the device was detected automatically:

```text
Found: DragonRise Inc.   Generic   USB  Joystick   at /dev/input/event9
```
However, the program could not select an exact known hardware fingerprint:

```text
No exact built-in fingerprint selected; starting verified pair calibration.
```
Therefore, interactive calibration started instead of an automatic profile.

This was not an installation error. It showed that although the controller used the same USB ID, it did not exactly match the specific automatic profile included in the repository.

## 9.3. Be aware of the changes made by the installer
The installation script does not only add new files. It may also stop some previously installed services:

```bash
pkill -x xboxdrv
systemctl disable --now ng2131-gamepad.service
systemctl disable --now dragonrise-gamepad-fix.service
```
It also installs a udev rule intended to hide the physical device from game APIs.

Therefore, before installation:

- Close Steam.
- Close the game.
- Make sure no other mapping software, such as `xboxdrv`, AntiMicroX, or Input Remapper, is using the same controller.
- Back up any existing services and configurations.

If multiple mapping layers are used at once, buttons may be sent twice or the controller may be detected incorrectly.

---

# 10. Calibration and button mapping

During setup, the directions and face buttons on the physical controller were tested one by one.

Calibration confirmed the following mappings:

| Physical control | Source event | Virtual Xbox control |
| --- | --- | --- |
| D-pad up/down | `ABS_HAT0Y` | D-pad up/down |
| D-pad left/right | `ABS_HAT0X` | D-pad left/right |
| Right analog up/down | `ABS_RZ` | `ABS_RY` |
| Right analog left/right | `ABS_RX` | `ABS_RX` |
| Cross / bottom | `BTN_THUMB2` | A |
| Circle / right | `BTN_THUMB` | B |
| Square / left | `BTN_TOP` | X |
| Triangle / top | `BTN_TRIGGER` | Y |

This table shows the physical events observed during calibration and the mapping applied by the profile to the virtual controller.

## 10.1. What happened during calibration?
The program first verified the D-pad directions:

```text
Captured ABS_HAT0Y (negative direction).
Captured ABS_HAT0Y (positive direction).
Verified D-PAD UP/D-PAD DOWN on ABS_HAT0Y.
```
Then the left and right directions, all four directions of the right analog stick, and the four face buttons were verified.

Result:

```text
Calibration saved. Every axis pair and all four face buttons were verified.
```
This message shows that the mapping profile was saved and calibration completed successfully.

**Note:** Calibration shows that the physical sources of the buttons were captured correctly. You should separately test whether every additional button or every input expected by each game works properly.

---

# 11. Verifying the virtual controller
At the end of setup, this command was run:

```bash
systemctl is-active dragonrise-gamepad-fix.service
```
Result:

```text
active
```
This shows that the service is running.

To check whether it is configured to start automatically:

```bash
systemctl is-enabled dragonrise-gamepad-fix.service
```
Expected result:

```text
enabled
```
Then:

```bash
./diagnose.sh
```
The diagnostic output showed the virtual controller as follows:

```text
I: Bus=0003 Vendor=045e Product=028e Version=0200
N: Name="Xbox 360 Controller (DragonRise Fixed)"
P: Phys=dragonrise-gamepad-fix/input0
H: Handlers=event21 js1
```
Here:

- `045e:028e` is the USB ID used to represent an Xbox 360 controller.
- `event21` is the virtual device's evdev input interface.
- `js1` is the virtual device's joystick interface.

It is normal for the virtual controller to be `js1` while the physical controller is `js0`; these numbers may vary according to the order of devices on the system.

## 11.1. Testing the virtual controller with `evtest`
The following command was used:

```bash
sudo evtest /dev/input/event21
```
The supported events in the output included the following:

```text
BTN_SOUTH
BTN_EAST
BTN_NORTH
BTN_WEST
BTN_TL
BTN_TR
BTN_SELECT
BTN_START
BTN_THUMBL
BTN_THUMBR
```
Analog axes were also visible:

```text
ABS_X
ABS_Y
ABS_Z
ABS_RX
ABS_RY
ABS_RZ
ABS_HAT0X
ABS_HAT0Y
```
During the actual test, events showing analog movement and button presses appeared:

```text
Event: type 3 (EV_ABS), code 0 (ABS_X), value -16384
```
and:

```text
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 1
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 0
```
`value 1` indicates that the button was pressed; `value 0` indicates that it was released.

This confirmed that events from the physical controller were being passed to the virtual Xbox device.

**At this point, the basic mapping on the Linux side was working.** The next test was to determine whether Steam and the game used this virtual device.

---

# 12. Steam and in-game tests
Even if a virtual Xbox controller has been created, you still need to verify separately whether Steam or the game uses it.

Recommended test sequence:

1. Completely close Steam.

2. Verify that the `dragonrise-gamepad-fix.service` service is running.

3. Reopen Steam.

4. Check whether the Xbox controller appears in Steam's controller settings.

5. Try disabling Steam Input in the game's controller properties.

6. Test the menu buttons, directions, and analog sticks in the game.

Since the virtual Xbox device is already available, do not use another mapping program on the first attempt.

Steam Input may provide additional compatibility in some games; in others, it may add a second mapping layer on top of a controller already presented in Xbox format. Therefore, test the enabled and disabled options separately when needed.

A controller not working in a game is not always caused by a driver. Game launch parameters, the Proton version, the Steam Input profile, or the game's controller detection behavior may also have an effect.

---

# 13. Troubleshooting
## 13.1. The physical controller is not visible
```bash
lsusb
ls -l /dev/input/by-id/
```
If `0079:0006` does not appear, check the USB port, cable, and physical connection.

## 13.2. The physical controller works, but there is no virtual device
```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
journalctl -u dragonrise-gamepad-fix.service -b -n 100 --no-pager
```
Also:

```bash
ls -l /dev/uinput
```
If the virtual device cannot be created, check the service logs, uinput access, and Python dependencies.

## 13.3. The service is running, but the game does not see the controller
```bash
grep -A 8 -B 2 'Xbox 360 Controller (DragonRise Fixed)' \
  /proc/bus/input/devices
```
If the virtual controller is visible:

```bash
sudo evtest /dev/input/event21
```
`event21` here is only an example from this setup. The device number may change after a reboot or reconnection. Find the correct number in the output from `diagnose.sh` or `/proc/bus/input/devices`.

If events appear on the virtual controller, focus on Steam and the game.

## 13.4. Buttons are mapped incorrectly
First, test the physical controller's own events. Then compare them with the virtual controller's events.

A button's physical name may differ from its Xbox equivalent. For example, Linux's `BTN_SOUTH` symbol is used as the A button in the Xbox layout.

If you need to repeat calibration, check what the repository's `--force-calibration` option does. Calibration makes sense for an unknown physical board, but do not change a working profile unnecessarily.

## 13.5. Buttons are being pressed twice
If Steam Input, `xboxdrv`, another mapping program, and this service are all being used at the same time, inputs may be sent through multiple paths.

First, close the other mapping programs. Use the virtual Xbox controller as the only input source and test again.

## 13.6. A problem appeared after a game update
The game files may have changed, or the language package indexes may have been refreshed. Compare the source and destination versions before copying the Turkish commentary files again.

For the gamepad:

```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
./diagnose.sh
```
Use these commands to check the service and virtual controller status.

---

# 14. Security, rollback, and maintenance
## 14.1. The importance of backups
The installation script backs up some files from the previous installation to a directory like:

```text
/var/backups/dragonrise-gamepad-fix-v2-YYYYMMDD-HHMMSS
```
The actual backup directory is shown in the installation output.

Make sure the new version is working properly before deleting these backups.

## 14.2. Restarting the service
```bash
sudo systemctl restart dragonrise-gamepad-fix.service
```
To see its status:

```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
```
To follow the logs live:

```bash
journalctl -u dragonrise-gamepad-fix.service -f
```
## 14.3. Uninstallation
The repository includes `uninstall.sh`, so first inspect its contents before uninstalling:

```bash
cat uninstall.sh
```
Then, after understanding what it deletes and which devices it affects, run:

```bash
sudo ./uninstall.sh
```
After uninstallation, you may need to unplug and reconnect the physical controller. Removing the service does not undo the Turkish commentary changes in the game files; those are a separate operation.

## 14.4. Configuration and license information
Do not publish user IDs, Denuvo tokens, license keys, or other session data when sharing game configurations.

For a configuration comparison, fields such as `Name`, `Version`, `ContentId`, and `Languages` are usually sufficient. Remove secret or personal values before sharing.

---

# 15. Conclusion
The most important takeaway from this work is how important it is to diagnose gaming issues on Linux at the correct layer.

For Turkish commentary, I compared the Turkish commentary and localization files from the Windows Demo installation with the full game on Linux. Transferring only the `.toc` files was not enough at first; the related data files also had to be transferred. After these steps, Turkish commentary worked in the game. I got this result despite the version difference between the Demo and full game, but file compatibility should still be checked separately for different versions.

As for the gamepad, the physical device had been recognized by Linux from the start. The KDE test and physical `evtest` output confirmed this. The issue concerned the controller interface expected by the game. The `uinput`-based mapping service passed DragonRise input to a virtual device named `Xbox 360 Controller (DragonRise Fixed)`.

The creation of the virtual device, the service being `active`, and button/analog events appearing in `evtest` confirmed that the mapping layer was working. In the final step, you should separately check whether Steam and the game use this virtual device.

## Post-installation checklist
- [ ] Version compatibility of the Turkish commentary source and destination files was checked.
- [ ] A backup was made before copying files.
- [ ] The `uinput` module is available.
- [ ] `python-evdev` and `evtest` are installed.
- [ ] The DragonRise physical device is recognized by Linux.
- [ ] The calibration profile was saved successfully.
- [ ] `dragonrise-gamepad-fix.service` is enabled and running.
- [ ] The virtual Xbox controller is visible in `/proc/bus/input/devices`.
- [ ] Button and analog events from the virtual controller appear in `evtest`.
- [ ] The device was checked in Steam's controller settings.
- [ ] The controller was also tested in the game.

**The Turkish commentary working in the game:**



<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="_Q4KK6kE1M4"></lite-youtube>
