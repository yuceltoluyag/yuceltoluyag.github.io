Title: Installing Clair Obscur: Expedition 33 Mods with Vortex on Linux
Date: 2025-10-14 19:00
Category: Oyun
Tags: linux, vortex, nexusmods, clairobscur, proton, wine, modding
Slug: linux-vortex-clair-obscur-expedition-33-mod-kurulumu
Authors: yuceltoluyag
Status: published
Summary: A step-by-step guide to safely installing Clair Obscur: Expedition 33 mods using Vortex and Proton on Linux environments.
Template: article
Lang: en
toot: https://mastodon.social/@yuceltoluyag/115364084679074024
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m2zyajubwc2h

Linux gaming modding is often a more challenging process compared to Windows users, especially for games running through Proton or Wine. Due to differences in file paths, mod managers like **Vortex** can encounter errors such as **ENOTDIR**.
In this guide, we'll show you step-by-step how to install mods using **Vortex** and **Nexus Mods** for the game **Clair Obscur: Expedition 33** in a **smooth manner on Linux**.

---

## 1️⃣ The Source of the Problem: ENOTDIR and File Path Mismatches

Vortex is designed according to Windows file system logic. Normally it uses the following path:

```bash
C:\users\steamuser\AppData\Local\Sandfall
```

However, on Linux in the Proton or Wine environment, the equivalent path is:

```bash
/home/user/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/users/steamuser/AppData/Local/Sandfall
```

💥 If instead of this folder, there's a **file** in its place, you'll receive this error:

```bash
ENOTDIR: not a directory
```

!!! note "This error indicates that the directory structure Vortex expects conflicts with a file. Usually caused by incorrect binding (symlink) or missing directory structure."

In this case, you can use **symlink (symbolic link)** or **bind mount**. However, since some mods perform physical file checks through IO-Store, **moving the files for real** is a safer solution.

---

## 2️⃣ Safe Step: Backing Up Your Game

Before starting the modding process, backup your game files and saves:

```bash
cp -r "/mnt/steam_depo/BaBaGames/Clair Obscur Expedition 33" "/home/friday13/backup/Clair Obscur Expedition 33"
```

!!! danger "Changes made without backups can become unrecoverable. Especially .sav save files are of critical importance."

---

## 3️⃣ Moving the Game to Vortex's PFX "C Drive" Folder

On Linux, Vortex manages games within its own Proton/Wine pfx environment. This folder is usually located at:

```bash
~/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/
```

By moving the game here, you can ensure Vortex recognizes it correctly:

```bash
mv "/mnt/steam_depo/BaBaGames/Clair Obscur Expedition 33" \
   "/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/"
```

!!! tip "If you encounter permission errors, you can add <code>sudo</code> to the beginning of the command. However, when possible, avoid changing user permissions and instead work with your own account."

---

## 4️⃣ Manually Setting the Game Path in Vortex

After moving the game, update the game path in Vortex:

**Windows view:**

```bash
C:\Games\Clair Obscur Expedition 33\game\game.exe
```

**Linux equivalent:**

```bash
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Clair Obscur Expedition 33/game/game.exe
```

---

## 5️⃣ Placing Mods to the Correct Location

Vortex stores mods in a temporary folder called "staging folder". The correct directory structure should be:

**On Windows:**

```bash
C:\Games\Vortex Mods\clairobscurexpedition33
```

**On Linux:**

```bash
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Vortex Mods/clairobscurexpedition33
```

> You can create a symbolic link to connect this folder to where Vortex expects it. However, for a safe installation, it's recommended to copy the mods directly to this directory.

---

## 6️⃣ Final Checks and Testing

1. Restart Vortex.
2. Launch the game with "Mods enabled".
3. If you don't see the "ENOTDIR" error, the installation was successful.

!!! note "If mods aren't loading, check the staging folder and game directories. Incorrect file permissions or missing directories can cause problems."

---

## 🧩 Sandfall Folder Not Found Error

In some cases, Vortex might not find the "Sandfall" folder. To fix this, create a symbolic link:

```bash
ln -sf /home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/Games/Clair\ Obscur\ Expedition\ 33/game/prefix/drive_c/users/steamuser/Local\ Settings/Application\ Data/Sandfall/ \
/home/friday13/.config/steamtinkerlaunch/vortex/compatdata/pfx/drive_c/users/steamuser/AppData/Local
```

---

## 🧰 Console (Dev Console) Won't Open Issue

Some mods or Unreal Engine games map the console to the `~` (tilde) key.
On Linux, this key's keycode is usually **35**.

```bash
setxkbmap -query
```

If you see `layout: tr` in the output, `keycode 35` is likely the `asciitilde` key.
To register this, enter the following command:

```bash
xmodmap -e "keycode 35 = grave asciitilde"
```

If you want this change to be permanent, add it to your `~/.profile` file:

```bash
# Permanent Tilde Fix
xmodmap -e "keycode 35 = grave asciitilde"
```

Now you can open the game console with `AltGr + ö` or directly with `~`. ✅

---

## 🔚 Conclusion

- **ENOTDIR** error generally stems from file path confusion.
- Move game files to Vortex's **pfx environment**.
- Place mod folders in the correct staging directory.
- Define the console key with `xmodmap` if necessary.

When you follow these steps, you can have a smooth mod experience in the game **Clair Obscur: Expedition 33** on Linux. 🧠🎮

---

## 📎 Helpful Articles

- [How to Install Turkish Patches for Games on Linux?](/linux-oyunlara-turkce-yama-kurulumu/)
- [Cyberpunk 2077 Linux Mod Installation Guide](/cyberpunk-2077-linux-mod-kurulum-rehberi)
- [What is WinePrefix and How to Use It?](/wineprefix-nedir-nasil-kullanilir)

---

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="23E4RxRsG_o"></lite-youtube>

---

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="9-V718wNWXU"></lite-youtube>
