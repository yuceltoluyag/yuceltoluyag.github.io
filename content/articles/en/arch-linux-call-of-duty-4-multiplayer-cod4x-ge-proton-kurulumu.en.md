Title: Installing Call of Duty 4 Multiplayer on Arch Linux: CoD4x and GE-Proton
Date: 2026-11-18
Category: Oyun
Tags: Arch Linux, Call of Duty 4, CoD4x, GE-Proton, Proton, Steam, UMU, Wine, Multiplayer
Slug: arch-linux-call-of-duty-4-multiplayer-cod4x-ge-proton-kurulumu
Authors: yuceltoluyag
Summary: This article explains how to run the non-Steam Call of Duty 4 installation on Arch Linux with GE-Proton and connect the CoD4x multiplayer client to Steam's Proton prefix. It covers preserving an existing Wine installation, creating a separate prefix, transferring CoD4x files, and resolving the Steam validation error.
Status: published
Template: article
Lang: en


Call of Duty 4: Modern Warfare continues to be played on multiplayer servers even after all these years. However, running the multiplayer side of the game on Linux is not just a matter of opening the `iw3mp.exe` file. In particular, you need to establish the correct connection between the CoD4x client, the Wine/Proton environment, and the prefix Steam creates for the game.

In this guide, I explain step by step the installation process I encountered on Arch Linux. My game files were already on my disk. My goal was to run the game in a newer Proton environment without breaking the existing Wine installation and to connect to CoD4x servers.

Although the game opened on my first attempts, I encountered an error when connecting to a server stating that CoD4x required Steam to be running. While investigating the problem, I tried a prefix-transfer method shared by Linux users. After copying CoD4x's user data into the Proton prefix created by Steam, launching the game through Steam resolved the problem.

One important detail is that the copy of the game I used was not downloaded through Steam. I used Steam only to add the existing game files to the library and launch them with GE-Proton. Adding an external game to Steam does not convert the game into a Steam version or provide updates through Steam. This distinction is also clearly stated in [Steam's explanation of adding external games](https://help.steampowered.com/en/faqs/view/4B8B-9697-2338-40EC){: target="_blank" rel="noopener noreferrer"}.

## 1. System and software used

The installation was performed in the following environment:

| Component | Configuration used |
|---|---|
| Distribution | Arch Linux |
| Desktop environment | KDE Plasma (Wayland) |
| Processor | Intel Core i5-13400F |
| Graphics card | NVIDIA GeForce RTX 4060 Ti 16 GB |
| Game | Call of Duty 4: Modern Warfare |
| Multiplayer client | CoD4x |
| Compatibility layer | GE-Proton 10-27 |
| Game launcher | Steam |
| Prefix and installation operations | UMU (`umu-run`) |

In this guide, I specifically used GE-Proton 10-27. It is the version I used during installation; I am not claiming that it is the latest GE-Proton version. Behavior may differ in different Proton versions, so results may not be exactly the same if you use another version.

To add GE-Proton to Steam as an external compatibility tool, see [the GE-Proton project installation instructions](https://github.com/GloriousEggroll/proton-ge-custom){: target="_blank" rel="noopener noreferrer"}.

## 2. Creating a separate prefix without touching the existing Wine installation

First, I identified the directory containing the game files.

My existing game installation was at:

```text
/mnt/steam_depo/cod4/game/prefix/drive_c/game/
```

This directory contained core game files such as `iw3mp.exe`, `iw3sp.exe`, and `version.inf`.

First, I checked the game version information:

```bash
GAME="/mnt/steam_depo/cod4/game/prefix/drive_c/game"

printf '%s\n' '--- Oyun dosyaları ---'
ls -lh "$GAME"/iw3mp.exe "$GAME"/iw3sp.exe "$GAME"/version.inf

printf '\n%s\n' '--- Sürüm bilgisi ---'
cat "$GAME/version.inf"
```

The `version.inf` file I inspected contained the following values:

```ini
[Version Info]
ExtVersion=1.7
IntVersion=28.2
Language=255
Branch=0.0
QA=5112
```

The `ExtVersion=1.7` value showed the version information of the existing game files. However, it would not be correct to derive all patch/build details of the game from this file alone.

CoD4x's official installation documentation also states that the client is built on a Call of Duty 4 installation with version 1.7. That is why checking your own game files before installation is important.

Official documentation: [CoD4x client installation guide](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"}.

### Why did I not use the existing prefix?

My existing installation was tied to an older Wine environment. I did not want to delete this environment or overwrite it with new Proton files.

Instead, I created a new prefix:

```text
/mnt/steam_depo/cod4/game/prefix-ge/
```

This gave me two different environments:

```text
cod4/
└── game/
    ├── prefix/
    │   └── drive_c/
    │       └── game/
    │
    └── prefix-ge/
        └── drive_c/
            └── game/
```

`prefix` remained as the old installation. `prefix-ge` became the new environment I would use with GE-Proton.

This separation is important. If you want to try a game with different Wine or Proton versions, preserving the existing prefix makes it easier to revert if problems occur.

### Creating a new prefix with UMU

UMU is a launcher that can run Windows games in the Proton and Steam Linux Runtime environments. It allows us to select a specific Proton version and Wine prefix directory.

For UMU usage and environment variables on Arch Linux, see [UMU's official usage documentation](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"}.

To create the new prefix:

```bash
WINEPREFIX="/mnt/steam_depo/cod4/game/prefix-ge" \
PROTONPATH="/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
umu-run ""
```

The purpose of this command was not to start the game, but to create the Proton/Wine prefix structure in the specified directory. UMU's documentation also includes an example of creating a prefix with an empty executable file.

After the command completed, I checked that the `drive_c` directory had been created under the new prefix.

## 3. Copying the game files to the new prefix

After the new prefix was ready, I transferred the existing game files to it.

I did not copy the entire old Wine prefix here. It would also be inaccurate to say that I moved only the `game` directory containing the game's own files to the new prefix; the operation I performed was **copying**. The old directory remained in place.

The commands I used:

```bash
SOURCE="/mnt/steam_depo/cod4/game/prefix/drive_c/game"
DEST="/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game"

mkdir -p "$DEST"
cp -a "$SOURCE/." "$DEST/"
```

I used `cp -a` because it copies files and directories together with their attributes. The files in the source directory were not deleted.

After copying, I compared the sizes of the two directories:

```bash
du -sh \
  "/mnt/steam_depo/cod4/game/prefix/drive_c/game" \
  "/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game"
```

In my setup, both game directories were approximately 6.5 GB.

!!! warning "Warning! The copy operation uses disk space."
    This method does not delete the existing game folder; it creates a second copy. If your game directory is large, make sure the destination disk has enough free space. You do not need to remove the existing prefix or game files.

## 4. Installing the CoD4x client into the GE-Proton prefix

After copying the game files to the new prefix, I moved on to installing the CoD4x client.

CoD4x is the client-side component used to play Call of Duty 4 on CoD4x-enabled servers with version 1.8 or later. The official documentation explains installation through an automatic installation request when connecting to a server, as well as manual installation.

Project page: [CoD4x client installation documentation](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"}.

I downloaded the installation file from CoD4x's official website:

[CoD4x official website](https://cod4x.ovh/){: target="_blank" rel="noopener noreferrer"}

I placed the downloaded file at:

```text
/mnt/steam_depo/cod4/CoD4x-Setup.exe
```

I checked that the file was a Windows executable:

```bash
file "/mnt/steam_depo/cod4/CoD4x-Setup.exe"
```

Then I ran the installer through UMU using the new prefix:

```bash
WINEPREFIX="/mnt/steam_depo/cod4/game/prefix-ge" \
PROTONPATH="/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
GAMEID=0 \
STEAM_COMPAT_LIBRARY_PATHS="/mnt/steam_depo" \
umu-run "/mnt/steam_depo/cod4/CoD4x-Setup.exe"
```

The variables used in this command have the following purposes:

- `WINEPREFIX`: Specifies the new prefix directory to be used for the CoD4x installation.
- `PROTONPATH`: Points to the GE-Proton version to use.
- `GAMEID`: This is the game ID value on the UMU side. `0` here does not mean Steam's Call of Duty 4 application ID.
- `STEAM_COMPAT_LIBRARY_PATHS`: I used this to expose the `/mnt/steam_depo` directory to the Proton environment in this installation.

For details about UMU's `GAMEID`, `WINEPREFIX`, and `PROTONPATH` variables, see [the UMU usage documentation](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"}.

### Confusing detail in the installation path

During installation, I saw the following path in the installer screen:

```text
S:\cod4\game\prefix\drive_c\game
```

At first glance, this suggested that CoD4x had been installed into the old prefix. This is because the `S:` drive was mapped to the `/mnt/steam_depo` directory.

I did not make a decision based only on the path shown by the installer. After installation, I searched for CoD4x files in both the old and new prefixes.

The checks showed that the CoD4x files were under the new `prefix-ge`. There were no newly installed CoD4x files in the old prefix.

Therefore, despite the confusion caused by the path on the installation screen, I was able to verify through the file system that the old installation had not been overwritten.

Some of the files created under the new prefix were:

```text
drive_c/ProgramData/CallofDuty4MW/
drive_c/users/steamuser/AppData/Local/CallofDuty4MW/
```

The second directory, in particular, is important for the operation we will perform shortly.

### Verifying that the CoD4x files were created

To check an important client file:

```bash
find "/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW" \
  -type f \
  \( -name 'cod4x_*.dll' -o -name 'launcher.dll' -o -name 'iw3mp.exe' \) \
  -print
```

After installation, the `cod4x_021.dll` file had also been created.

This file name indicates that the client files belong to the `cod4x_021` family. However, because I do not have a separate record that verifies the exact subversion of the installed client, I am not identifying it as a specific version such as 21.1 or 21.3.

## 5. Registering GE-Proton in Steam

After the CoD4x files were installed in the new prefix, I made GE-Proton selectable through Steam.

I kept the GE-Proton archive in:

```text
/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27/
```

I created a symbolic link to this folder under Steam's compatibility tools directory:

```bash
mkdir -p "$HOME/.steam/root/compatibilitytools.d"

ln -s \
  "/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
  "$HOME/.steam/root/compatibilitytools.d/GE-Proton10-27"
```

This command does not copy the GE-Proton files again. It creates a link from Steam's own compatibility tools directory to the existing GE-Proton folder.

After completely closing and reopening Steam, I verified that `GE-Proton10-27` appeared among the compatibility tools in the settings.

## 6. Adding Call of Duty 4 to Steam as an external game

Now I added the game to the Steam library.

In Steam:

1. Open the **Games** menu.
2. Select **Add a Non-Steam Game to My Library**.
3. Locate and add the `iw3mp.exe` file.

The path to my game file was:

```text
/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game/iw3mp.exe
```

I opened the game's properties and made the following settings:

| Field | Value |
|---|---|
| Target | `/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game/iw3mp.exe` |
| Start in | `/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game` |
| Compatibility | Force the use of GE-Proton10-27 |

I also added the following value to the launch options:

```text
PROTON_LOG=1 %command%
```

This option is not a CoD4x-specific parameter for the game. It is used to create a Proton debugging log. I left it enabled so that I could inspect logs from the session in which the game was launched if a problem occurred later.

!!! note "Note: Adding an external game does not create a Steam version."
    What we add to Steam is a shortcut to the existing `iw3mp.exe` file. The game files remain under `/mnt/steam_depo/cod4`. This Steam feature does not convert the game into a purchased or downloaded Steam game.

At this stage, although I could run the game directly through UMU, when I tried to join a server I encountered the CoD4x error stating that Steam needed to be running.

Opening the game's menu did not mean that the multiplayer connection would work without problems.

## 7. Resolving the CoD4x Steam error: transferring the AppData folder

While investigating this error, I found a solution shared by Linux users on the CoD4x forum.

[CoD4x Steam needs to be running error on Linux – forum thread](https://cod4x.ovh/t/cod4x-steam-needs-to-be-running-error-on-linux-fix/5461){: target="_blank" rel="noopener noreferrer"}

The basic idea of the shared method was to transfer the `CallofDuty4MW` user folder created by CoD4x from the Wine prefix to Steam's Proton prefix and run the game through Steam.

There is an important detail here: the forum example used the `compatdata/7940` directory for the Call of Duty 4 copy obtained through Steam. Because my installation was not obtained through Steam, I did not use that path directly.

First, I launched the external game I had added through Steam once. I checked the Proton log to determine which prefix Steam created.

In my system, the log showed the following path:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/
```

Therefore, the prefix used by Steam was:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/pfx/
```

This path is the result I observed in my external-game shortcut setup. Do not assume that the same `compatdata/0` directory will be used on another computer or a different Steam installation. Everyone should find the correct prefix path from their own Steam log.

### Copying the CoD4x user folder

The user folder created by CoD4x in the new GE-Proton prefix was at:

```text
/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW
```

The destination in the prefix created by Steam was:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/pfx/drive_c/users/steamuser/AppData/Local/CallofDuty4MW
```

First, I assigned the source and destination paths to variables:

```bash
SOURCE="/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW"

DEST="$HOME/.local/share/Steam/steamapps/compatdata/0/pfx/drive_c/users/steamuser/AppData/Local/CallofDuty4MW"
```

I checked that the source really existed:

```bash
test -d "$SOURCE" && echo "CoD4x kaynak klasörü bulundu."
```

Because the destination folder did not already exist, I performed the copy:

```bash
mkdir -p "$DEST"
cp -a "$SOURCE/." "$DEST/"
```

Using `SOURCE/.` copies all files inside the `CallofDuty4MW` folder into the destination folder instead of creating the `CallofDuty4MW` folder itself as a nested folder.

For example, the following files were also transferred:

```text
CallofDuty4MW/
├── filter.txt
├── globalconfig.cfg
├── servercache.dat
├── bin/
│   ├── launcher.dll
│   ├── iw3mp.exe
│   └── cod4x_021/
│       └── cod4x_021.dll
├── main/
│   └── jcod4x_00.iwd
├── zone/
│   ├── cod4x_patch.ff
│   ├── cod4x_patchv2.ff
│   └── cod4x_ambfix.ff
├── updates/
└── players/
    └── profiles/
```

After this operation, the source folder remained in place. Only a copy of the `AppData/Local/CallofDuty4MW` folder containing the user data and the related CoD4x client files was transferred to the Steam prefix.

!!! warning "Warning! Do not use compatdata/0 on every computer."
    `compatdata/7940` is an example path belonging to Call of Duty 4 in Steam. The prefix created by Steam for an external-game shortcut may differ. Copying to the wrong prefix may not resolve the problem. First determine which prefix Steam is actually using.

### Verifying the copy

After copying, I checked that the CoD4x files were present at the destination:

```bash
find "$DEST" -maxdepth 4 -type f | sort
```

It was also possible to check specifically for the presence of the client DLL file at the destination:

```bash
test -f "$DEST/bin/cod4x_021/cod4x_021.dll" \
  && echo "CoD4x istemci dosyası hedefte mevcut."
```

I then launched the game again through the Call of Duty 4 shortcut in the Steam library.

This time, the Steam validation error I had encountered in multiplayer mode disappeared and the game ran.

The solution was the result of the community-shared method in my Arch Linux and GE-Proton installation. It does not guarantee the same result for every game copy, every CoD4x version, or every Steam prefix.

## 8. Inspecting the Proton log if the game freezes

After running the game, I encountered a freezing problem once. However, I have not yet determined the cause of the freeze conclusively.

The important point here is not to assume that the log of a successful session is a freeze log.

Because the following value was present in the Steam launch options, a Proton log was created:

```text
PROTON_LOG=1 %command%
```

The log for my external game shortcut was written to:

```text
~/steam-13678473494847815680.log
```

The long number here belongs to the shortcut ID created by Steam. The file name will be different for another user.

To view the most recently created logs:

```bash
ls -lt "$HOME"/steam-*.log | head
```

To filter important error and warning entries from a log:

```bash
LOG="$HOME/steam-13678473494847815680.log"

grep -Ein \
  'err:|warn:|error|failed|exception|unhandled|crash|fatal|device lost|DXVK|Vulkan' \
  "$LOG" | tail -n 100
```

This command shows only lines containing the relevant keywords. Seeing `error` or `warn` in the output does not mean that the game definitely froze for that reason.

### What did I see in the successful-session log?

The latest log I inspected belonged to a successful game session. In this record:

- DXVK and Vulkan startup entries were present.
- Some Fossilize warnings related to the graphics pipeline were visible.
- `Invalid window handle` errors were repeated.
- RPC-related warnings were also present on the Wine side.

However, because this log belonged to a session in which the game ran successfully, I cannot present those lines as the cause of the freeze.

In particular, seeing that DXVK/Vulkan had started indicates that the graphics infrastructure was activated at least during that session. It is not correct to conclude that the other warnings are critical errors on their own.

### Which records should I collect if the freeze occurs again?

If a freeze occurs, you need to inspect the system log as well as the Proton log.

Kernel records from the last few minutes:

```bash
journalctl -b -k --since "10 minutes ago" --no-pager
```

To filter records associated with Steam, Proton, Wine, and NVIDIA:

```bash
journalctl -b --since "10 minutes ago" --no-pager \
  | grep -Ei 'steam|proton|wine|iw3mp|segfault|killed|oom|nvidia|gpu|xid'
```

These records may help determine in which layer the freeze occurred. For example, we can examine possibilities such as whether a process was terminated, memory ran out, or the graphics card driver returned an error.

Changing a setting or blaming a specific driver without a real log from the freeze is not appropriate. Therefore, it is safer to keep the successful-session record for reference first and then compare it with records from a session in which a freeze occurs.

## 9. Final installation status

Here is a summary of the process I followed in this setup:

1. I checked the existing Call of Duty 4 game files.
2. I preserved the existing Wine prefix and created a new environment named `prefix-ge`.
3. I copied the game's `game` folder to the new prefix.
4. I registered GE-Proton 10-27 in Steam.
5. I installed the CoD4x client in the new prefix.
6. I added the `iw3mp.exe` file to Steam as an external game.
7. When I encountered the CoD4x Steam validation error, I copied the `CallofDuty4MW` user folder into the Proton prefix used by Steam.
8. I restarted the game through Steam and verified that multiplayer worked.
9. I left the `PROTON_LOG=1` option enabled for possible freezing issues.

As a result, I was able to run the Call of Duty 4 multiplayer client with GE-Proton on Arch Linux. I did not touch the existing Wine installation, and I resolved the CoD4x Steam validation error on my system.

However, the cause of the freeze has not been diagnosed. Although the game ran successfully in one session, I do not want to reach a definite conclusion about long-term stability. If the freeze occurs again, the actual error log needs to be inspected.

## Sources

- [CoD4x – Official client installation documentation](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"} — Installation of the CoD4x client and project documentation on Linux/Wine.
- [CoD4x – Frequently Asked Questions](https://cod4x.ovh/t/faq-commonly-asked-questions/4713){: target="_blank" rel="noopener noreferrer"} — CoD4x configuration and user profile directories.
- [CoD4x – Steam needs to be running error on Linux](https://cod4x.ovh/t/cod4x-steam-needs-to-be-running-error-on-linux-fix/5461){: target="_blank" rel="noopener noreferrer"} — The prefix-transfer method shared by Linux users.
- [ZAKII – CoD4x guide on Linux](https://zakii.de/lab/cod4xlinux/){: target="_blank" rel="noopener noreferrer"} — Community guide on non-Steam game installation and the Proton prefix.
- [UMU Launcher – Usage documentation](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"} — Explanations of `umu-run`, `WINEPREFIX`, `PROTONPATH`, and `GAMEID`.
- [GE-Proton – GitHub repository](https://github.com/GloriousEggroll/proton-ge-custom){: target="_blank" rel="noopener noreferrer"} — GE-Proton installation and Steam compatibility tools.
- [Arch Wiki – Steam](https://wiki.archlinux.org/title/Steam){: target="_blank" rel="noopener noreferrer"} — Using Steam and Proton on Arch Linux.
- [Steam Support – Adding non-Steam games to the library](https://help.steampowered.com/en/faqs/view/4B8B-9697-2338-40EC){: target="_blank" rel="noopener noreferrer"} — How external game shortcuts work.
