Title: Fixing Documents and PowerShell Profile Issues After Removing OneDrive
Date: 2025-03-02 10:00
Modified: 2026-11-14 18:05
Category: Sorun Giderme
Tags: PowerShell, OneDrive, Windows 11, Execution Policy,oh my posh, terminal-icons, psfzf
Slug: powershell-profil-onedrive-hatasi-cozumu
Authors: yuceltoluyag
Summary: A guide to diagnosing and fixing a Documents folder that remains in its old location after removing OneDrive, and PowerShell profiles that fail to load, using registry and PowerShell commands.
Lang: en
Status: published
Template: article
Image: images/windows11-onedrive-sorunu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985346729844921
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrs2mxzok2q

When I was using Windows 11, I ran into an unexpected problem after removing OneDrive from my system. The app was no longer on my computer, but Windows was still trying to open the Documents folder through the OneDrive directory.

At first, it looked like a simple folder location problem. But every time I opened PowerShell, I started seeing errors saying that the profile file could not be loaded. My Oh My Posh theme was not loading correctly, and some of the modules I used in the terminal were not working as expected.

I realized that a significant part of the problem was related to old locations Windows had stored for user folders. Since the PowerShell profile that runs at startup is also connected to these folders, several seemingly unrelated errors appeared around the same time.

In this guide, I cover folder redirection that can remain after removing OneDrive, how to fix the Documents directory, and how to recreate the PowerShell profile. I also discuss errors caused by the Execution Policy separately.

> **Update note:** This article is based on a problem I personally encountered while using Windows 11. I no longer use Windows daily, so I am not claiming to have retested these steps on a current Windows installation. I reviewed the technical explanations and commands against Microsoft's current documentation before publication. I especially recommend making a backup before changing the registry.

## Why Does the Documents Folder Still Point to OneDrive After OneDrive Is Removed?

OneDrive can back up known Windows user folders such as Desktop, Documents, and Pictures through its cloud directory. When this feature is enabled, the locations of those folders are redirected to the OneDrive directory.

Removing the OneDrive app does not always automatically restore folder redirection to its previous state. Windows may continue to use the old location it has stored for user folders.

For example, the expected location of your Documents folder should be:

```text
C:\Users\Username\Documents
```

but it may still be set to:

```text
C:\Users\Username\OneDrive\Documents
```

In this situation, even after removing the app, Windows may try to access the Documents folder using a location that no longer exists or cannot be accessed.

### If OneDrive has not been removed yet

If OneDrive is still installed on your computer, it is better to stop folder backup before uninstalling the app.

1. Open the OneDrive cloud icon in the notification area.
2. Go to Settings.
3. Open **Sync and backup**.
4. Click **Manage backup**.
5. Select the folder whose backup you want to stop.
6. Choose the option to keep the files on your computer.

If some files are only in the cloud, they need to be downloaded to your computer first. After stopping OneDrive backup, files may not automatically move to the local Documents folder. Check and move the necessary files separately.

This process is explained in Microsoft's [guide to managing OneDrive folder backup](https://support.microsoft.com/en-us/onedrive/back-up-your-folders-with-onedrive?country=us&culture=en-us){: target="_blank" rel="noopener noreferrer"}.

If you have already removed OneDrive, you can check the current folder location with the steps below.

## Check the Old Location of the Documents Folder

First, let's find out which Documents directory Windows is currently using.

Open PowerShell and run the following command:

```powershell
[Environment]::GetFolderPath('MyDocuments')
```

This command shows the location of the Documents folder Windows is using.

Next, check the path to the PowerShell profile file:

```powershell
$PROFILE
```

Finally, find out whether the profile file actually exists:

```powershell
Test-Path -LiteralPath $PROFILE
```

If the last command returns `False`, the profile file for the current PowerShell session is not present at the specified location. This alone does not prove that the problem is caused by OneDrive, but it is an important clue when checking for old folder redirection.

## Fix the Documents Folder Through the Windows Registry

Windows stores the locations of known user folders in the registry. If the old location remains there after OneDrive is removed, Windows needs to be pointed to the correct folder.

For this, we will use the following registry key:

```text
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

### Back up the registry first

Create a backup of the current values before making changes to the registry.

You can run this command in PowerShell:

```powershell
reg.exe export "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" "$env:TEMP\User-Shell-Folders-backup.reg" /y
```

This command exports the relevant registry key to the temporary folder.

### Check the folder locations

1. Press `Windows + R`.
2. Type `regedit` in the window that opens, then press Enter.
3. Go to the registry location above.
4. Check the values on the right.

The values Windows uses for the default user folders are:

| Folder | Registry value | Default location |
|---|---|---|
| Desktop | `Desktop` | `%USERPROFILE%\Desktop` |
| Documents | `Personal` | `%USERPROFILE%\Documents` |
| Pictures | `My Pictures` | `%USERPROFILE%\Pictures` |
| Videos | `My Video` | `%USERPROFILE%\Videos` |
| Music | `My Music` | `%USERPROFILE%\Music` |

For example, if the `Personal` value for the Documents folder still points to the OneDrive directory, it needs to be changed back to the default location.

Double-click the `Personal` value and change its data to:

```text
%USERPROFILE%\Documents
```

If other folders are also redirected to the OneDrive directory, correct only the affected values using the corresponding entries in the table. Do not unnecessarily change folder locations that are already working.

Microsoft explains these values in detail in its [document on changing personal folder locations and troubleshooting registry issues](https://learn.microsoft.com/tr-tr/troubleshoot/windows-client/shell-experience/change-personal-folder-location-fails){: target="_blank" rel="noopener noreferrer"}.

### Automatically fix the Documents folder with PowerShell

If you do not want to make the change manually in the registry, you can perform the same operation through PowerShell.

Make sure you created a registry backup in the previous section. Then open PowerShell in your regular user session and run:

```powershell
$registryPath = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders'

$documentsPath = Join-Path $env:USERPROFILE 'Documents'

New-Item -ItemType Directory -Path $documentsPath -Force | Out-Null

New-ItemProperty `
    -Path $registryPath `
    -Name 'Personal' `
    -Value '%USERPROFILE%\Documents' `
    -PropertyType ExpandString `
    -Force | Out-Null
```

This script:

- Creates the `Documents` folder in the user profile.
- Points the registry's `Personal` value to the correct location.
- Does not tie the path to a fixed username or profile directory.

**Important:** This does not automatically move or delete old files in the OneDrive folder. You need to check the files in your Documents folder separately.

When the operation is complete, sign out of your Windows session and sign back in. Alternatively, you can restart File Explorer through Task Manager.

## Why Is the PowerShell Profile File Not Loading?

After fixing the folder location, we need to check the PowerShell profile file.

PowerShell can automatically run a profile script when it starts. This file loads user-specific commands, aliases, modules, and terminal customizations.

For example, if an Oh My Posh configuration or modules such as Terminal-Icons are started through the profile file, the file being unavailable can affect your terminal appearance and startup settings.

The location of the PowerShell profile file can vary depending on the version in use and the terminal environment.

| PowerShell version | Default user profile path |
|---|---|
| Windows PowerShell 5.1 | `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` |
| PowerShell 7 | `Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |

These are default locations. If the Documents folder has been redirected elsewhere, the actual profile path may also be different.

For this reason, we should use the `$PROFILE` variable rather than a fixed directory.

To see the profile path and other profile locations for the current session:

```powershell
$PROFILE | Select-Object *
```

### Recreate a missing PowerShell profile file

After correcting the Documents folder location, check whether the `$PROFILE` file exists.

If the file or its parent directory does not exist, you can create them with these commands:

```powershell
$profileDirectory = Split-Path -Parent $PROFILE

New-Item -ItemType Directory -Path $profileDirectory -Force | Out-Null

if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
```

Then open the profile file in Notepad:

```powershell
notepad $PROFILE
```

If you had profile settings before, you can restore them from your backup. For example, Oh My Posh startup lines and module import commands may be in this file.

Creating the profile file does not automatically restore customizations you saved before. You need to configure them separately.

## Fix a PowerShell Execution Policy Error

Even when the PowerShell profile file is in the correct location, some scripts may not run because of the security policy.

For example, you may see an error like:

```text
File cannot be loaded because running scripts is disabled on this system.
```

or:

```text
The file is not digitally signed.
You cannot run this script on the current system.
```

These messages do not always indicate the same cause. First, let's view the current Execution Policy settings:

```powershell
Get-ExecutionPolicy -List
```

### The RemoteSigned policy

If you want to run scripts you created locally on your personal computer, `RemoteSigned` is generally a suitable choice.

To change the setting for the current user only:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

You do not need to open PowerShell as an administrator for this.

The `RemoteSigned` policy allows locally created scripts to run without a signature. Scripts downloaded from the internet and marked by Windows may require a valid digital signature.

If a downloaded script is blocked even though you trust its source and have checked its contents, you can unblock that file with `Unblock-File`:

```powershell
Unblock-File -LiteralPath 'C:\Scripts\script.ps1'
```

Use this command only on files whose source you have verified.

**Why don't I recommend Unrestricted?**

`Unrestricted` allows unsigned scripts to run more broadly. Such a wide permission is not necessary just to load a profile file.

Also, if your computer has `MachinePolicy` or `UserPolicy` settings defined by Group Policy, changes you make at the user level cannot override them.

For more details, see Microsoft's [PowerShell Execution Policy documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5){: target="_blank" rel="noopener noreferrer"}.

## Why Aren't Oh My Posh and Terminal Modules Working?

One problem I encountered was that the appearance of my PowerShell terminal was broken. The Oh My Posh theme was not loading correctly, and the terminal modules I used were not working as expected.

The important thing to remember is that the PowerShell profile runs during startup.

For example, your profile file may contain commands like these:

```powershell
oh-my-posh init pwsh --config amro | Invoke-Expression

Import-Module Terminal-Icons

Import-Module PSFzf
```

If the profile file does not load, these commands may not run either. As a result, it may look as though your Oh My Posh theme, terminal icons, and other customizations have disappeared.

For this reason, I do not recommend immediately uninstalling and reinstalling all modules just because the profile is not loading.

First:

1. Verify that the Documents folder is in the correct location.
2. Check that the file referenced by the `$PROFILE` variable exists.
3. Review the contents of the profile file.
4. Check whether an Execution Policy restriction is blocking it.
5. Only after these steps, investigate any missing modules separately.

Microsoft's [PowerShell Profiles documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.5){: target="_blank" rel="noopener noreferrer"} is useful for learning about the profile execution order and the purpose of different profiles.

## Conclusion: Properly Diagnose PowerShell Problems After Removing OneDrive

Do not assume that every PowerShell error you encounter after removing OneDrive is directly caused by OneDrive.

Several separate issues may arise during this process:

- Windows may still try to open the Documents folder through OneDrive.
- The PowerShell profile file may remain at an old or inaccessible location.
- Module import commands inside the profile file may not run.
- Execution Policy may block a script or the profile file.

The best way to resolve these problems is to first verify the folder location, then check the profile file, and finally review the security policies.

In my case, the terminal problems that initially seemed unrelated were also connected to folder locations and the PowerShell startup configuration.

**Keep in mind:** Back up the registry before making changes, check your files in the old OneDrive directory, and identify the actual location of a profile file that is not working before unnecessarily rebuilding it from scratch.

The best way to prevent one problem from causing another is to identify the cause step by step instead of changing everything at once.
