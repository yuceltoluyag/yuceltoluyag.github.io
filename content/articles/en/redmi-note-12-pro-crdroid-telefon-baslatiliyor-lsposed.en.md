Title: Redmi Note 12 Pro 5G Stuck on “Phone is starting” in crDroid: Fixing It with LSPosed
Date: 2026-11-08 13:07 13:07
Modified: 2026-11-08 13:07
Category: Sorun Giderme
Tags: redmi-note-12-pro-5g, crdroid, android-16, folkpatch, rezygisk, lsposed, spoofmydevice, adb, fastboot
Slug: redmi-note-12-pro-crdroid-telefon-baslatiliyor-lsposed
Authors: yuceltoluyag
Summary: I investigated a startup issue I encountered while using crDroid 12.12 on a Redmi Note 12 Pro 5G with ADB logs. I describe the diagnosis and the fix that let the device boot normally again after I disabled LSPosed.
Status: published
Template: article
Lang: en
Series: 12 Pro 5G
Series_index: 5

Sometimes you don't need to install the wrong ROM or write a file to the wrong partition to break a phone. In my case, I didn't write to any partition at all. I only checked a few things through Fastboot and restarted the device. But the phone could not complete a normal startup.

I was using crDroid 12.12 (Android 16) on my Redmi Note 12 Pro 5G. I used FolkPatch for root management, ReZygisk for the Zygisk infrastructure, and LSPosed to change device information on an app-by-app basis.

I had also configured the SpoofMyDevice module to show the manufacturer as AOSP in the e-Devlet app. In LSPosed, I had added only the e-Devlet app to the scope and set the manufacturer information to AOSP.

When the phone restarted, the screen stayed on **"Phone is starting"**. At first glance, it looked as though Android was not starting. But the working ADB connection and the errors I found in the system logs pointed to a very different situation.

In the end, I got the phone to start normally by disabling LSPosed without uninstalling it.

In this article, I describe the process I went through, from Fastboot checks and Recovery inspection to ADB logs and the fix.

## Device and software configuration

The environment where I encountered the issue was as follows:

| Component | Information |
|---|---|
| Device | Redmi Note 12 Pro 5G |
| Model number | 22101316I |
| Recovery device codename | `rubyx` |
| ROM | crDroid 12.12 |
| Android | 16 |
| Root manager | FolkPatch |
| Zygisk infrastructure | ReZygisk |
| Xposed framework | LSPosed v2.2.1 (7912) |
| Device information module | SpoofMyDevice |
| Spoof profile | Manufacturer: AOSP |
| LSPosed scope | e-Devlet only |

The exact LSPosed version is particularly important. Later, while researching, I found reports of similar startup errors in another Zygisk/Xposed setup using the same 7912 version number.

You can also see my [Redmi Note 12 Pro 5G crDroid installation guide](/en/redmi-note-12-pro-5g-crdroid-kurulum-rehberi/) for the ROM installation and earlier steps for this device.

## 1. How did the problem start? Fastboot checks

While the phone was working normally, I wanted to check its A/B partition layout. First, I ran this command from the computer:

```bash
adb reboot bootloader
```

The phone switched to Fastboot mode. It is normal for the ADB connection to be lost at this point because the device has left the Android environment and entered the Bootloader environment. Fastboot, rather than ADB, is used in this mode.

I verified the connection:

```bash
fastboot devices
```

Then I queried just two pieces of information:

```bash
fastboot getvar current-slot
fastboot getvar has-slot:boot
```

Outputs:

```text
current-slot: a
Finished. Total time: 0.000s

has-slot:boot: yes
Finished. Total time: 0.000s
```

From this, I learned that slot `a` was active and that the boot partition used an A/B layout.

I also checked the slot states:

```bash
fastboot getvar current-slot

fastboot getvar slot-successful:a
fastboot getvar slot-unbootable:a

fastboot getvar slot-successful:b
fastboot getvar slot-unbootable:b
```

Outputs:

```text
current-slot: a

slot-successful:a: yes
slot-unbootable:a: no

slot-successful:b: no
slot-unbootable:b: no
```

According to this, slot A was marked as having booted successfully. Slot B had not yet been marked as a successful boot, but it was not unusable either.

!!! note "Note: Does Fastboot getvar change the phone?"
    `getvar` is used to read the value of a variable through the Bootloader. It does not write to or erase partitions like `fastboot flash` or `fastboot erase`. So the queries I ran did not change the phone's boot partition.[^1]

After the checks, I restarted the phone:

```bash
fastboot reboot
```

That is when the problem appeared. Instead of going to the normal startup screen, the phone remained on "Phone is starting."

One important detail: At first, I did not know whether this command had triggered the problem or whether the LSPosed configuration that was active at the time was causing trouble during startup.

## 2. Had Android started? Checking with ADB

Although the startup text remained on the phone's screen, I checked the ADB connection from the computer:

```bash
adb devices -l
```

Output:

```text
List of devices attached
79orfygmgecmw84t device usb:1-9 product:ruby_in model:22101316I device:ruby
```

The phone was accessible over ADB.

Then I checked Android's startup status:

```bash
adb shell getprop sys.boot_completed
adb shell getprop init.svc.bootanim
adb shell getprop dev.bootcomplete
```

Outputs:

```text
1
stopped
1
```

This result was quite important. Android's basic startup process had completed. So this was not a system stuck in a conventional boot loop or one that could not start at all.

However, the user interface still was not working properly.

## 3. Why was Android stuck on the FallbackHome screen?

As a next step, I checked which window was in the foreground:

```bash
adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
```

Output:

```text
mCurrentFocus=Window{82b7cdd u0 com.android.settings/com.android.settings.FallbackHome}
mFocusedApp=ActivityRecord{229381909 u0 com.android.settings/.FallbackHome t3}
```

`FallbackHome` caught my attention here.

In Android, FallbackHome is a fallback activity that takes over when the actual home screen app is not yet ready. When the user is unlocked, it tries to find the real HOME app and close itself.[^2]

So why was the user still locked?

I ran this command:

```bash
adb shell dumpsys user
```

Relevant output:

```text
UserInfo{0:null:4c13} serialNo=0 isPrimary=true

State: RUNNING_LOCKED

Unlock time: <unknown>

Started users state: [0=RUNNING_LOCKED]
```

Android had started the user, but the unlock process had not completed.

I also confirmed this through the Trust service:

```bash
adb shell dumpsys trust | grep -iE 'deviceLocked|strongAuthRequired'
```

Output:

```text
deviceLocked=1
strongAuthRequired=0x1
```

In other words, Android was waiting for the user session to be unlocked.

## 4. The key clue: The Keyguard service was not running

While investigating the lock-screen mechanism in Android, I used this command:

```bash
adb shell dumpsys window policy | grep -iE 'keyguard|showing|occluded'
```

The output contained:

```text
showing=true
occluded=false
deviceHasKeyguard=true
```

But there was a much more important error in the logs:

```text
W/KeyguardServiceDelegate:
onScreenTurningOn(): no keyguard service!
```

I checked whether the SystemUI process was running:

```bash
adb shell pidof com.android.systemui
```

The process was running at times. However, among the service connections I saw this state:

```text
ConnectionRecord{... CR DEAD com.android.systemui/.keyguard.KeyguardService}
```

In other words, the connection between SystemUI and Android's lock-screen service had dropped.

I now understood that the problem was not just Launcher-related.

## 5. Why was SystemUI stopping? Start timeout errors

To investigate further, I examined the system logs:

```bash
adb logcat -b events -d -v threadtime | grep -iE \
'am_crash|am_anr|am_proc_died|am_kill'
```

In the output, I saw that many Android system apps, not just SystemUI, were timing out during startup.

For example:

```text
am_kill:
[0,3130,com.android.systemui,-10000,start timeout,71480]
```

There were similar errors for these processes as well:

- `com.android.phone`
- `com.android.nfc`
- `com.android.se`
- `com.android.settings`
- `com.android.networkstack.process`
- `org.protonaosp.columbus`

In more detailed logs, I saw these entries:

```text
Process ... com.android.systemui failed to attach

am_process_start_timeout

Killing ... com.android.systemui: start timeout
```

Android's ActivityManager mechanism waits for a newly started app to attach to ActivityManager. When the allotted time expires, the process can be terminated. In the AOSP source code, the normal process startup timeout is defined as `PROC_START_TIMEOUT = 10*1000`.[^3]

My logs also showed that processes were being terminated about 10 seconds after they started.

With this information, my suspicion changed. Rather than a single broken app or Launcher, I now thought that app processes launched through Zygote might be getting blocked during startup.

## 6. Checking through Recovery without losing data

I booted Recovery through Fastboot:

```bash
fastboot reboot recovery
```

After Recovery started, the ADB connection was re-established:

```bash
adb devices
```

At first, the device appeared in an empty list, then as `unauthorized`, and finally as `recovery`.

I checked the device information:

```bash
adb shell getprop ro.product.device
adb shell getprop ro.boot.slot_suffix
adb shell id
```

Outputs:

```text
rubyx
_a
uid=2000(shell)
```

Recovery reported the device as `rubyx`.

I also wanted to inspect the Recovery logs. Since a normal `adb pull` returned a permission error, I enabled root access over the Recovery ADB connection and copied the file to the computer.

What mattered here was understanding the current state without wiping the `/data` partition.

The Recovery configuration contained these definitions:

```text
/dev/block/by-name/metadata /metadata ext4 ...

/dev/block/by-name/userdata /data f2fs ...
```

I also inspected the metadata encryption directory in read-only mode. These files were present:

```text
encrypted_key
keymaster_key_blob
secdiscardable
version
```

These are key records used by the metadata encryption mechanism. However, the presence of these files alone does not prove that hardware-backed key decryption succeeded.

In the Recovery environment, `/data` was not mounted automatically. So at first, I could not access `/data/media` or user directories.

When I restarted Android normally and checked again, I got:

```text
/dev/block/dm-43 /data f2fs rw,...
```

In other words, the `/data` partition mounted successfully as F2FS during normal Android startup.

This finding weakened the possibility that the filesystem was completely inaccessible or that the metadata keys had definitely been lost.

## 7. We also found a kernel panic record, but it was not the direct cause

During diagnosis, I also checked this property:

```bash
adb shell getprop ro.boot.bootreason
```

Output:

```text
kernel_panic
```

So I looked at the pstore records:

```bash
adb shell su -c 'ls -lah /sys/fs/pstore'
```

The files `console-ramoops-0` and `pmsg-ramoops-0` were present there.

There really was an Oops record in the kernel logs:

```text
Unable to handle kernel paging request

Internal error: Oops: 96000004 [#1] PREEMPT SMP
```

The function that crashed:

```text
__cgroup_bpf_run_filter_skb
```

The call chain was related to network traffic and sending TCP packets.

However, the time information in pstore showed August 13, 2026. The problem we were experiencing had appeared on November 8, 2026.

So I did not treat this old kernel record as the cause of the new startup problem.

This distinction matters: Finding an old kernel crash record in pstore does not show that the current problem was caused by the same crash.

## 8. The actual fix: Disabling LSPosed without deleting it

By now, we had an important suspect: LSPosed.

I thought the LSPosed module, which I had installed through FolkPatch for root management, might be affecting system startup.

First, I listed the installed modules:

```bash
adb shell su -c 'ls -1 /data/adb/modules'
```

Output:

```text
rezygisk
rootGrantToast
zygisk_lsposed
```

I wanted to test only LSPosed here. I did not want to touch ReZygisk or the other modules.

Instead of completely removing LSPosed, I created a `disable` marker file in the module directory:

```bash
adb shell su -c 'touch /data/adb/modules/zygisk_lsposed/disable'
```

I also verified that the file existed:

```bash
adb shell su -c 'test -e /data/adb/modules/zygisk_lsposed/disable && echo DISABLE_VAR || echo DISABLE_YOK'
```

Output:

```text
DISABLE_VAR
```

This confirmed that the disable marker had been created.

!!! warning "Warning! Make sure you identify the correct module directory."
    The `zygisk_lsposed` directory here is the actual module ID in my FolkPatch installation. Do not assume that the same directory exists on another device or with another root manager. First check the actual module name in `/data/adb/modules`. Disabling the wrong module can cause other problems.

Now I restarted the phone:

```bash
adb reboot
```

And the result...

The phone started normally!

It was no longer stuck on the "Phone is starting" screen. I could reach the PIN screen and use Android normally.

Later, I restarted the phone again with LSPosed disabled. The problem did not recur. I was also able to sign in to the e-Devlet app without any issues.

**So I did not need to delete LSPosed, reinstall the ROM, or format user data to fix the problem.**

## 9. I found a similar bug report for the same version

While researching the cause of the problem, I had also confirmed that the exact LSPosed version was `v2.2.1 (7912)`.

Another issue report I found for this version number caught my attention:

[Vector project Issue #1050 – lspd startup lock and app startup timeout](https://github.com/JingMatrix/Vector/issues/1050){: target="_blank" rel="noopener noreferrer"}

In this issue, opened on October 31, 2026, similar symptoms were reported on another device running Android 11 with Xposed infrastructure version `7912`.

The report described the following situation:

- `lspd` held a global lock for about 15 seconds during startup.
- App processes launched through Zygote were blocked.
- ActivityManager's 10-second process startup timeout expired.
- Processes such as SystemUI and phone services were terminated with `failed to attach` and `start timeout` errors.
- These errors disappeared when the relevant Zygisk/Xposed module was disabled.

The module version in the report was listed as `v2.2.1 (7912)`. This was the same version number I was using.

However, there is an important difference: The issue report came from a device running Android 11, Magisk, and Zygisk Next. My device was running Android 16, FolkPatch, and ReZygisk.

So the report does not prove that I encountered exactly the same bug. But it provides a useful comparison showing that a startup problem in the LSPosed family can produce symptoms resembling the `failed to attach` and `start timeout` entries in my logs.

Another interesting detail was that this issue was closed with a related PR on November 5, 2026. However, I have not verified whether that fix was applied to the LSPosed package I used or whether it is compatible with ReZygisk.

## 10. Was it SpoofMyDevice or LSPosed that caused the problem?

I do not want to make a definite claim here.

The configuration we used for e-Devlet was as follows:

- The SpoofMyDevice module was enabled in LSPosed.
- The manufacturer information was set to `AOSP`.
- Only the e-Devlet app was selected in the scope.
- No separate spoofing was applied to Android System Framework.

The [official SpoofMyDevice GitHub description](https://github.com/BuSung-dev/SpoofMyDevice/blob/main/README.md){: target="_blank" rel="noopener noreferrer"} explains how to assign profiles to individual apps and states that Android System Framework is excluded from the hook scope.

So it would not be right to directly attribute the problem to changing the manufacturer information to AOSP.

The test we ran shows something more limited, but still important:

| State | Result |
|---|---|
| LSPosed enabled | Phone got stuck during startup |
| LSPosed disabled | Phone started normally |
| Second restart with LSPosed off | Problem did not recur |
| e-Devlet with LSPosed off | Worked |

These results make LSPosed a strong suspect.

However, I did not test separately whether the cause was SpoofMyDevice alone, LSPosed's own startup mechanism, or an interaction between LSPosed and ReZygisk.

I did not want to risk the working phone again, so I stopped diagnosing at this point.

I also initially considered the Android setting that allows apps to be launched by NFC scans as a possible cause. But I was able to disable LSPosed and boot the phone without changing that setting. So I did not find evidence linking the NFC setting to the problem.

## 11. What I recommend if you encounter a similar problem

The most important lesson I learned from this incident is that when Android gets stuck on the startup screen, you should not immediately jump to reinstalling the ROM or performing a Factory Reset.

First, check through ADB whether the phone has actually started.

For example:

```bash
adb devices -l
```

Then:

```bash
adb shell getprop sys.boot_completed
```

If Android has completed startup but the user interface does not appear:

```bash
adb shell dumpsys user
```

and:

```bash
adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
```

These commands can help you understand which stage the problem is occurring at.

When `FallbackHome`, `RUNNING_LOCKED`, `KeyguardService`, and `start timeout` entries are considered together, it may become clear that the problem is not just Launcher-related.

!!! warning "Critical warning! Don't wipe or flash blindly."
    Especially if you have previously performed custom operations involving IMEI, modem, or network functionality on your device, Format Data, Factory Reset, or writing to the wrong partition can have serious consequences. None of those steps were necessary in my case.

Another important point was verifying that the `getvar` queries I ran through Fastboot did not damage the phone. In Android's Fastboot protocol, `getvar` is a read-only variable query. `flash` and `erase` are different operations. The [Android Fastboot protocol](https://android.googlesource.com/platform/system/core/+/a057057/fastboot/fastboot_protocol.txt){: target="_blank" rel="noopener noreferrer"} defines this distinction.

## Conclusion

While using crDroid 12.12 on my Redmi Note 12 Pro 5G, this problem initially looked as though it might be related to the bootloader or A/B slots. But our checks showed that Android had actually started and that the problem occurred while the user interface and system processes were starting.

In the end, instead of completely removing the LSPosed `v2.2.1 (7912)` module, I only disabled it. The phone started normally, and the problem did not recur on subsequent restarts. e-Devlet also continued to work with LSPosed disabled.

I have not yet determined exactly which of SpoofMyDevice, LSPosed, or ReZygisk caused this problem. But at least I was able to recover the device without erasing data or reinstalling the ROM.

Sometimes the best solution is not to make further changes to the system, but to carefully disable the component we suspect is causing the problem and try again.

## Sources

- [Android Open Source Project – Fastboot protocol](https://android.googlesource.com/platform/system/core/+/a057057/fastboot/fastboot_protocol.txt){: target="_blank" rel="noopener noreferrer"}
- [Android Open Source Project – FallbackHome](https://android.googlesource.com/platform/packages/apps/Settings/+/2db5ecc/src/com/android/settings/FallbackHome.java){: target="_blank" rel="noopener noreferrer"}
- [Android Open Source Project – ActivityManagerService](https://android.googlesource.com/platform/frameworks/base/+/3b58eff/services/core/java/com/android/server/am/ActivityManagerService.java){: target="_blank" rel="noopener noreferrer"}
- [BuSung-dev – SpoofMyDevice source code and usage description](https://github.com/BuSung-dev/SpoofMyDevice){: target="_blank" rel="noopener noreferrer"}
- [JingMatrix – Vector Issue #1050: lspd startup lock and process startup timeout](https://github.com/JingMatrix/Vector/issues/1050){: target="_blank" rel="noopener noreferrer"}
- [PerformanC – ReZygisk source code](https://github.com/PerformanC/ReZygisk){: target="_blank" rel="noopener noreferrer"}
- [LyraVoid – FolkPatch source code](https://github.com/LyraVoid/FolkPatch){: target="_blank" rel="noopener noreferrer"}

[^1]: In the Android Fastboot protocol, `getvar` is a variable-reading command. Commands such as `flash` and `erase` modify a partition.
[^2]: The AOSP FallbackHome app waits for the `ACTION_USER_UNLOCKED` event. After the user is unlocked, it tries to find the real HOME app.
