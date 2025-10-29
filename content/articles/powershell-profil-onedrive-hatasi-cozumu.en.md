Title: PowerShell Profile Issues and Directory Error Solution After Removing OneDrive
Date: 2025-03-02 10:00
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: PowerShell, OneDrive, Execution Policy, Modül Kurulumu
Slug: powershell-profil-onedrive-hatasi-cozumu
Authors: yuceltoluyag
Summary: Solution to error messages related to PowerShell profile file, directories still appearing after OneDrive removal, and errors due to missing modules.
Status: published
Template: article
Image: images/windows11-onedrive-sorunu-xl.webp
Lang: en

## A Windows 11 User's Story

I installed a fresh Windows 11 on my computer for a new start. Everything seemed quite fast and smooth, but I decided to remove **OneDrive**, a tool I wasn't using. I didn't have much use for cloud storage services and wanted my files to be stored locally instead of being automatically synchronized.

However, after removing OneDrive, I noticed that **my Documents folder path still appeared as C:\Users\Username\OneDrive\Documents.** Moreover, when I opened PowerShell, I realized that my profile file couldn't be loaded and many modules were missing. At this point, I understood that Windows continued to keep some settings in their old state and I needed to correct them manually. If you're experiencing a similar problem, you can get rid of these errors by following the steps below.

---

## Problem of Documents Directory Still Appearing After Removing OneDrive

If you've removed OneDrive but applications like PowerShell are still using the **C:\Users\Username\OneDrive\Documents** path, your system's default **Documents** directory may be defined at the old location.

### Solution 1: Correcting Directory Path via Registry

1. Press **Windows + R** and type **regedit** and press **Enter**.
2. Open the following path:

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

3. Double-click on the **"Personal"** key and change the value as follows:

```powershell
C:\Users\Username\Documents
```

4. **Restart your computer.**

### Solution 2: Updating PowerShell Profile Path

PowerShell may be using the old **OneDrive** path. To create a new profile, run the following commands:

```powershell
$newProfilePath = "C:\Users\Username\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
New-Item -ItemType File -Path $newProfilePath -Force
```

Then redirect the `$PROFILE` variable to the new location:

```powershell
[System.Environment]::SetEnvironmentVariable("PROFILE", $newProfilePath, "User")
```

Close and reopen PowerShell and check the `$PROFILE` variable:

```powershell
echo $PROFILE
```

---

## PowerShell Profile File Cannot Be Run Error

If you're getting an error that your **PowerShell profile file cannot be run because it's not signed**, you can try the following methods.

### Solution 1: Changing Execution Policy

Open PowerShell **as Administrator** and run the following command:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

If you don't want to release all scripts for security reasons, you can allow only unsigned scripts:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**Temporary solution** for current session only:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Solution 2: Removing File Block

If the file was downloaded from the internet, PowerShell may block it. To remove the block:

```powershell
Unblock-File -Path $PROFILE
```

Alternatively, right-click on the file, go to **Properties > General** tab and check **Unblock** option.

---

## Fixing PowerShell Module Deficiencies

If **modules like Oh My Posh, Terminal-Icons or PSFzf are missing** in your PowerShell profile, you need to install them manually.

### 1. Installing Oh My Posh

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

After installation, verify with:

```powershell
oh-my-posh --version
```

If `oh-my-posh` is still not recognized, manually add the following path to your `$PATH` variable:

```powershell
$env:Path += ";C:\Program Files\oh-my-posh\bin"
```

### 2. Installing Terminal-Icons Module

```powershell
Install-Module -Name Terminal-Icons -Scope CurrentUser -Force
Import-Module Terminal-Icons
```

### 3. Installing PSFzf Module

```powershell
Install-Module -Name PSFzf -Scope CurrentUser -Force
Import-Module PSFzf
```

If you get a **NuGet error** during installation, first install the NuGet provider:

```powershell
Install-PackageProvider -Name NuGet -Force
Set-PSRepository -Name "PSGallery" -InstallationPolicy Trusted
```

Then run the `Install-Module` command again.

---

## Updating PowerShell Profile

If the modules are installed but still don't work automatically, add the following lines to your `$PROFILE` file:

```powershell
# Install Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/amro.omp.json" | Invoke-Expression

# Load Terminal-Icons module
Import-Module Terminal-Icons

# Load PSFzf module
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'
```

Then run your `$PROFILE` file to test the changes:

```powershell
. $PROFILE
```

Close and reopen PowerShell to check if the errors are fixed. 🚀

---

## 📌 Solution: Manually Correcting Folder Paths

## 1️⃣ Updating Paths via Registry

Windows manages special folder paths through the Registry. To change old OneDrive paths:

### 📌 Step 1: Open Registry

- Press Windows + R
- Type `regedit` and press Enter

### 📌 Step 2: Open the Following Path

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

Here you will see the following keys. You should correct paths starting with OneDrive:

| Key Name | Default Path                  |
| ----------- | ------------------------------- |
| Desktop     | C:\Users\Username\Desktop   |
| Personal    | C:\Users\Username\Documents |
| My Pictures | C:\Users\Username\Pictures  |
| My Video    | C:\Users\Username\Videos    |
| My Music    | C:\Users\Username\Music     |

### 📌 Step 3: Correct Wrong Paths

- Find paths containing OneDrive. (For example: `C:\Users\Username\OneDrive\Documents`)
- Double-click and change to `C:\Users\Username` format.
- Restart your computer.

## 2️⃣ Move Folders Manually and Change Location

If the above method doesn't solve the problem, try the following manual method:

### 📌 Step 1: Change Default Locations

- Right-click on your Documents, Desktop, Pictures etc. folders.
- Go to Properties > Location tab.
- Click "Move" button and select appropriate directory (`C:\Users\Username\Documents` etc.).
- Apply and click OK.
- Repeat these steps for Desktop, Documents, Music, Videos and Pictures.

## 3️⃣ Repairing Folder Paths with PowerShell (Automatic)

If you don't want to do the above steps manually, you can automatically correct the paths by running the following PowerShell script:

```powershell
$folders = @("Desktop", "Documents", "Pictures", "Videos", "Music")
foreach ($folder in $folders) {
    $path = "C:\Users\$env:USERNAME\$folder"
    if (!(Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force }
    New-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name $folder -Value $path -PropertyType ExpandString -Force
}
```

This command:

- Assigns correct paths for Desktop, Documents, Pictures, Videos and Music.
- Creates missing folders.
- Corrects wrong paths in Windows registry.

Restart your computer and check if it's corrected. 🚀
![Editing Hosts File](/images/windows11-onedrive-sorunu-xl.webp)