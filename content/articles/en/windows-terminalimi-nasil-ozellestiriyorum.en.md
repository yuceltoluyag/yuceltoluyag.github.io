Title: How to Customize Windows Terminal and PowerShell
Date: 2022-06-26 10:00
Modified: 2026-11-14 18:05
Category: Windows
Tags: Windows Terminal, PowerShell, Oh My Posh, Nerd Fonts, Scoop, PSReadLine, PSFzf, Terminal-Icons
Slug: windows-terminalimi-nasil-ozellestiriyorum
Authors: yuceltoluyag
Summary: Customize your Windows Terminal and PowerShell environment to suit your workflow with Nerd Fonts, Oh My Posh, PSReadLine, Terminal-Icons, and PSFzf. Create your own PowerShell profile and manage terminal tools with Scoop.
Lang: en
Status: published
Template: article
Image: images/windows-terminal-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985306515279329
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrrio6wlc2s

## Let's Personalize Windows Terminal and PowerShell

Windows Terminal is a useful terminal application that lets us use command-line tools on Windows through a single interface. But for me, being a window where I can only run commands is not enough. I like to customize the tools I use, shortcuts, font, and terminal appearance to match my workflow.

When I wanted to create a Windows setup similar to the terminal environment I use on Linux, I used tools such as Nerd Fonts, Oh My Posh, PSReadLine, and PSFzf.

In this guide, we'll configure Windows Terminal with PowerShell 7, change the terminal's appearance, and add modules that make everyday use easier. We'll also keep our configuration in a single PowerShell profile file so it can be edited easily when needed.

> **Note:** The first version of this article was based on the Windows configuration I used in 2022. I updated it by comparing the old installation steps with current official documentation. The example configuration reflects the current usage of the tools I use. Minor differences may occur with different Windows versions or installation methods.

## Install Windows Terminal and PowerShell

First, let's distinguish between two concepts.

**Windows Terminal** is a terminal application that lets us use different command-line environments, such as PowerShell, Command Prompt (CMD), and WSL, through tabs and panes.

**PowerShell** is the shell where we run commands, scripts, and system administration tasks.

In other words, Windows Terminal does not replace PowerShell by itself. We'll use them together.

### Install Windows Terminal

First, let's install the stable release of Windows Terminal. We will use the regular version rather than Windows Terminal Preview.

Using the Windows Package Manager (WinGet):

```powershell
winget install --id Microsoft.WindowsTerminal --exact
```

You can also install Windows Terminal from the Microsoft Store.

When the installation is complete, open Windows Terminal.

### Install PowerShell 7

Windows PowerShell 5.1, which is built into Windows, is still available. However, this guide uses the current PowerShell 7.

To install PowerShell 7:

```powershell
winget install --id Microsoft.PowerShell --source winget
```

After installation, you can open PowerShell 7 from the profile list in Windows Terminal.

Windows PowerShell 5.1 and PowerShell 7 are not simply two names for the same version. They can both be installed on the same computer and used as separate profiles in Windows Terminal.

Microsoft's [PowerShell 7 installation documentation](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6){: target="_blank" rel="noopener noreferrer"} describes the different installation options.

### Set PowerShell as the default terminal profile

After opening Windows Terminal:

1. Open Settings with `Ctrl + ,`.
2. Go to the **Startup** section.
3. Select PowerShell in the **Default profile** field.
4. If you are using Windows 11, you can select Windows Terminal in the **Default terminal application** field.
5. Save your settings.

Now PowerShell 7 will start directly when you open Windows Terminal.

## Install Nerd Fonts

We need to take care of the font before customizing the terminal's appearance.

Tools such as Oh My Posh and Terminal-Icons use special icons and characters in the terminal. These characters may not display correctly in a standard font. You may see empty boxes or nonsensical characters instead of icons.

To address this, we'll use [Nerd Fonts](https://www.nerdfonts.com/font-downloads){: target="_blank" rel="noopener noreferrer"}.

Nerd Fonts is a project that adds various icon and character sets to developer-focused fonts.

You do not need to download every font. Just choose a font family you like.

To install one:

1. Open the Nerd Fonts download page.
2. Choose the font family you want to use.
3. Download the relevant font archive.
4. Extract the archive.
5. Open the `.ttf` file you want to use and install it in Windows.

My GitHub configuration uses `Agave Nerd Font Propo`. If you choose a different font, you also need to use its exact name in the Windows Terminal settings.

After installing your font, open Windows Terminal and go to Settings.

Select the Nerd Font you installed under **Profiles → PowerShell → Appearance → Font face**.

This step is important so that Terminal-Icons and Oh My Posh can display their icons correctly.

For more font options, see the [Nerd Fonts GitHub repository](https://github.com/ryanoasis/nerd-fonts){: target="_blank" rel="noopener noreferrer"}.

## Customize the Windows Terminal Appearance

Now let's customize the appearance of our terminal.

In Windows Terminal settings, open the **Appearance** section for the relevant PowerShell profile.

Here you can change settings such as the font, font size, color scheme, background, and opacity.

I manage an important part of my configuration through `settings.json`.

To find the Windows Terminal settings file:

1. Open Windows Terminal.
2. Go to Settings.
3. Select **Open JSON file**.

I recommend backing up your current settings before changing the file.

The following example shows the basic appearance section of a profile:

```json
{
    "profiles": {
        "defaults": {
            "font": {
                "face": "Agave Nerd Font Propo",
                "size": 16
            },
            "opacity": 100,
            "useAcrylic": true
        }
    }
}
```

You should adapt this example inside your existing `profiles` object. Do not replace your entire `settings.json` file with this small example.

There are two settings to pay attention to here:

- `font`: Sets the font and font size used in the terminal.
- `useAcrylic`: Enables the acrylic background effect.

When `opacity` is set to 100, the window is fully opaque. If you want the background to look more transparent, you can lower this value to, for example, 85 or 90.

Microsoft explains all of these options in its [Windows Terminal profile appearance settings](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-appearance){: target="_blank" rel="noopener noreferrer"}.

If you want to use a color scheme, you can edit the `schemes` field in the same file. My GitHub configuration also includes a custom color scheme named `Baba`.

## Install Scoop

I use Scoop to manage command-line tools on Windows.

Scoop is a command-line package manager that can install applications mostly in the user's directory and makes it easier to update packages.

First, open PowerShell as a regular user.

Set the required execution policy:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then install Scoop:

```powershell
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

When installation is complete, you can use Scoop commands.

For example, to install `fzf`:

```powershell
scoop install fzf
```

The Scoop `main` bucket is enabled by default. If you need an application from another bucket, you can add that bucket separately:

```powershell
scoop bucket add extras
```

It is important to distinguish between `main` and `extras`. You do not need to add both buckets repeatedly during installation.

For more information about Scoop, see its [official GitHub repository](https://github.com/ScoopInstaller/Scoop){: target="_blank" rel="noopener noreferrer"}.

## Install Oh My Posh

One of the most important parts of the terminal's appearance is Oh My Posh.

Oh My Posh lets you customize the PowerShell prompt. Depending on the theme, it can show the Git branch, working directory, process status, and various system details in the terminal prompt.

We'll use WinGet for installation:

```powershell
winget install JanDeDobbeleer.OhMyPosh --source winget
```

After installation, check the version:

```powershell
oh-my-posh version
```

Now we can add Oh My Posh to our PowerShell profile.

### Use the Material theme

Oh My Posh comes with many ready-to-use themes. I prefer the Material theme in my own configuration.

To display the theme, first we'll create our PowerShell profile file. I'll explain how to prepare the profile in the next section.

You can add this line to the profile file:

```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\material.omp.json" | Invoke-Expression
```

Here, `material.omp.json` refers to the theme file being used. If you prefer a different theme, you can change the filename.

You can browse the Oh My Posh themes on the [official themes page](https://ohmyposh.dev/docs/themes){: target="_blank" rel="noopener noreferrer"}.

The [Oh My Posh Windows documentation](https://ohmyposh.dev/docs/installation/windows){: target="_blank" rel="noopener noreferrer"} is also useful for installation, updates, and theme configuration.

## Prepare the PowerShell Profile File

Now we'll create a profile that automatically loads the tools we installed whenever PowerShell starts.

The PowerShell profile file is a script that runs when the terminal starts. You can use this file to import modules, define aliases, add custom functions, and manage terminal settings.

To find the profile file location:

```powershell
$PROFILE
```

PowerShell 7 and Windows PowerShell 5.1 use different default profile directories.

| Version | User profile directory |
|---|---|
| Windows PowerShell 5.1 | `Documents\WindowsPowerShell` |
| PowerShell 7 | `Documents\PowerShell` |

For this reason, it is better to use the `$PROFILE` variable rather than a fixed location.

### Create our own configuration directory

I prefer to keep my settings in a `.config/powershell` directory under the user directory.

First, let's create this directory:

```powershell
$configDirectory = Join-Path $HOME '.config\powershell'

New-Item -ItemType Directory -Path $configDirectory -Force
```

Now let's prepare our main configuration file:

```powershell
notepad (Join-Path $configDirectory 'user_profile.ps1')
```

We'll add the commands we prepare in a moment to this file.

### Configure the main PowerShell profile

First, let's create the directory that contains PowerShell's default profile file:

```powershell
$profileDirectory = Split-Path -Parent $PROFILE

New-Item -ItemType Directory -Path $profileDirectory -Force

if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}
```

Then open the main profile file:

```powershell
notepad $PROFILE
```

Add the following line to it:

```powershell
. "$HOME\.config\powershell\user_profile.ps1"
```

This line runs the `user_profile.ps1` file we created earlier when PowerShell starts.

This way, the main profile file only calls our configuration, while the actual settings stay under `.config/powershell`.

The nice thing about this approach is that we can manage multiple settings from one place.

## Install PowerShell Modules

Now let's add modules that make our terminal more useful for everyday work.

This guide uses three basic modules: Terminal-Icons, PSReadLine, and PSFzf.

We can install modules from the PowerShell Gallery in the current user's scope.

### 1. Terminal-Icons

Terminal-Icons is a PowerShell module that displays icons for files and folders when listing them.

Used with Nerd Fonts, it makes file listings in the terminal easier to understand.

Install it:

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery -Scope CurrentUser
```

Add this command to the profile file:

```powershell
Import-Module Terminal-Icons
```

Icons can now be displayed when listing files and folders.

### 2. PSReadLine

PSReadLine lets us customize editing, history, and keyboard behavior in the PowerShell command line.

For example, we can use Vi key bindings, get suggestions from previously run commands, and change keyboard shortcuts.

If the version of PSReadLine included with PowerShell meets your needs, you do not need to install it separately. If you want to use a newer version:

```powershell
Install-Module -Name PSReadLine -Repository PSGallery -Scope CurrentUser
```

Let's add these settings to our profile file:

```powershell
Import-Module PSReadLine

Set-PSReadLineOption -EditMode Vi

Set-PSReadLineOption -BellStyle None

Set-PSReadLineOption -PredictionSource History

Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar
```

These settings:

- `Vi`: Enables Vi editing mode in the command line.
- `BellStyle None`: Disables unnecessary audio or visual alerts.
- `PredictionSource History`: Provides suggestions from command history.
- `Ctrl+d`: Deletes the character at the cursor.

For more information about PSReadLine, see [Microsoft's PSReadLine documentation](https://learn.microsoft.com/en-us/powershell/module/psreadline){: target="_blank" rel="noopener noreferrer"}.

### 3. fzf and PSFzf

We'll use fzf to make searching in the terminal easier.

fzf is a standalone command-line tool that lets us perform fuzzy searches through content such as files, directories, and command history.

Install it through Scoop:

```powershell
scoop install fzf
```

PSFzf is a module that integrates this search tool with PowerShell.

Install it:

```powershell
Install-Module -Name PSFzf -Repository PSGallery -Scope CurrentUser
```

There is an important detail here: PSFzf registers keyboard shortcuts through PSReadLine. Therefore, we need to load the PSReadLine module before PSFzf.

Add the following to the profile file:

```powershell
Import-Module PSReadLine

Import-Module PSFzf

Set-PsFzfOption `
    -PSReadlineChordProvider 'Ctrl+f' `
    -PSReadlineChordReverseHistory 'Ctrl+r'
```

This way:

- `Ctrl+f`: Lets us search file and directory paths.
- `Ctrl+r`: Lets us search command history.

When you select a search result, it is inserted into the command line. This saves you from having to retype long commands you used previously.

For fzf's Windows installation and other features, see its [GitHub repository](https://github.com/junegunn/fzf){: target="_blank" rel="noopener noreferrer"}. For PSFzf configuration, see the [PSFzf documentation](https://github.com/kelleyma49/PSFzf){: target="_blank" rel="noopener noreferrer"}.

### 4. Z module (optional)

You can also use the Z module to move more quickly between frequently used directories.

Z tracks directories you have visited before and lets you jump to them quickly from the command line.

Install it:

```powershell
Install-Module -Name z -Repository PSGallery -Scope CurrentUser
```

Add this to your configuration file:

```powershell
Import-Module z
```

The module builds a history of the directories you visit. Once it has enough usage history, you can use part of a directory name to jump to the relevant location.

This module is not required for basic terminal customization. Use it if it suits your needs.

## The Completed PowerShell Configuration File

Now let's combine the tools we've installed into one file.

The basic contents of `C:\Users\YourUsername\.config\powershell\user_profile.ps1` could look like this:

```powershell
# UTF-8 encoding
[console]::InputEncoding = [console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\material.omp.json" | Invoke-Expression

# Terminal Icons
Import-Module Terminal-Icons

# PSReadLine
Import-Module PSReadLine

Set-PSReadLineOption -EditMode Vi
Set-PSReadLineOption -BellStyle None
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar

# PSFzf
Import-Module PSFzf

Set-PsFzfOption `
    -PSReadlineChordProvider 'Ctrl+f' `
    -PSReadlineChordReverseHistory 'Ctrl+r'

# Z - Optional
# Import-Module z
```

Save the file and reload the PowerShell profile:

```powershell
. $PROFILE
```

If you do not see any errors, you can close and reopen the terminal to check whether the settings load automatically.

You can also add your own aliases and functions to this configuration file.

For example, a short alias for Git:

```powershell
Set-Alias -Name g -Value git
```

This way, your commands and preferences will be ready in every new PowerShell session.

## My Windows Terminal Settings on GitHub

I created a GitHub repository for anyone who wants to look at my configuration instead of setting everything up one by one.

[Windows Terminal DotFiles](https://github.com/yuceltoluyag/WindowsTerminal){: target="_blank" rel="noopener noreferrer"}

The repository contains the `settings.json` and PowerShell configuration files I use for Windows Terminal.

The settings in the repository include:

- Agave Nerd Font Propo font.
- Baba color scheme.
- Acrylic appearance settings.
- Windows Terminal profile definitions.
- Oh My Posh configuration for PowerShell.
- PSReadLine and PSFzf shortcuts.
- Personal aliases and helper functions.

I recommend adapting the files to your own computer before using them.

In particular, locations such as `C:\Arch\Arch.png`, Git tool installation directories, and the Oh My Posh theme path will not be the same on every computer. Instead of directly overwriting your existing settings with the repository's `settings.json`, make a backup first and merge the necessary sections.

## Conclusion

Personalizing Windows Terminal is about more than changing colors or fonts.

We can customize the terminal prompt with Oh My Posh, use special icons with Nerd Fonts, improve the command-line experience with PSReadLine, and speed up searches with PSFzf.

What matters to me is that the terminal I use fits my workflow. For this reason, I collect the settings in one configuration directory instead of scattering them across different files. This makes it much easier to recreate my settings and change personal preferences after a new Windows installation.

You do not need to install every tool when building your own terminal setup. Choose what you need, configure your profile accordingly, and avoid cluttering your terminal with unnecessary modules.

[responsive_img src="/images/windows-terminal-son-xl.webp" alt="My personalized Windows Terminal and PowerShell setup" /]
