Title: Pyenv-Win Installation Error and Solution in PowerShell 7.5.0
Date: 2025-03-28 17:30
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: pyenv-win, powershell, python, hata çözümü
Slug: powershell-pyenv-win-kurulum-hatasi-cozumu
Authors: yuceltoluyag
Summary: We explain step by step the Microsoft.PowerShell.Archive error encountered during Pyenv-Win installation in PowerShell 7.5.0 and the solution method. 🚀
Status: published
Template: article
Image: images/Microsoft-PowerShell-Archive-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114987643401547407
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvssmcklmk2t

## Pyenv-Win Installation Error and Solution in PowerShell 7.5.0 🎯

**Pyenv-Win**, used to manage Python versions, may give installation errors for some users in PowerShell 7.5.0 version. Especially when the `Microsoft.PowerShell.Archive` module is missing, you may encounter the following error:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"

        Directory: C:\Users\yucel


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d----        28.03.2025     17:10                  .pyenv
Microsoft.PowerShell.Archive\Expand-Archive : The module 'Microsoft.PowerShell.Archive' could not be loaded. For more information, run 'Import-Module Microsoft.PowerShell
.Archive'.
At line:1 char:1
+ Microsoft.PowerShell.Archive\Expand-Archive -Path "C:\Users\yucel\.py ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Microsoft.Power...\Expand-Archive:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CouldNotAutoLoadModule

Move-Item: C:\Users\yucel\install-pyenv-win.ps1:126
Line |
 126 |      Move-Item -Path "$PyEnvDir\pyenv-win-master\*" -Destination "$PyE …
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Cannot find path 'C:\Users\yucel\.pyenv\pyenv-win-master' because it does not exist.
Remove-Item: C:\Users\yucel\install-pyenv-win.ps1:127
Line |
 127 |      Remove-Item -Path "$PyEnvDir\pyenv-win-master" -Recurse
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Cannot find path 'C:\Users\yucel\.pyenv\pyenv-win-master' because it does not exist.
pyenv-win is successfully installed. You may need to close and reopen your terminal before using it.
```

Because of this error, **Expand-Archive is not working**, so Pyenv-Win is not installed properly. Fortunately, there is a simple solution for this problem! 🚀

## Cause of the Error 🤔

PowerShell 7.5.0, on some systems, **cannot automatically load the Microsoft.PowerShell.Archive module**. Since the Pyenv-Win installation script (`install-pyenv-win.ps1`) calls the `Expand-Archive` command, you get an error.

## Solution: Edit the Installation Script 🛠️

To fix this error, open your `install-pyenv-win.ps1` file and find the following line:

```powershell
Start-Process -FilePath "powershell.exe" -ArgumentList @(
        "-NoProfile",
        "-Command `"Microsoft.PowerShell.Archive\Expand-Archive -Path \`"$DownloadPath\`" -DestinationPath \`"$PyEnvDir\`"`""
    ) -NoNewWindow -Wait
```

Change it to the following:

```powershell
Start-Process -FilePath "pwsh.exe" -ArgumentList @(
    "-NoProfile",
    "-Command \"Expand-Archive -Path \`"$DownloadPath\`" -DestinationPath \`"$PyEnvDir\`"\""
) -NoNewWindow -Wait
```

### **What Does This Change Do?**

- It bypasses the module deficiency by running the `Expand-Archive` command **in a new PowerShell process (`pwsh.exe`)**.
- Thus, the **archive extraction process** is completed without problems and Pyenv-Win can be installed. 🎉

## Alternative Solution 🏗️

If the above method seems complicated to you, you can also solve the problem by **manually loading the PowerShell module**:

1. **Open PowerShell as administrator** and run the following command:

```powershell
  Install-Module -Name Microsoft.PowerShell.Archive -Force -Scope CurrentUser
```

2. **Import the module:**

```powershell
  Import-Module Microsoft.PowerShell.Archive
```

3. **Try Pyenv-Win installation again.**

## Conclusion ✅

If you're getting an `Expand-Archive` error during Pyenv-Win installation in PowerShell 7.5.0, you can fix the problem using one of the above solution methods. Don't forget to restart your terminal after installation! 🔄

You can leave a comment if you have other errors or questions. Happy coding! 🚀

[responsive_img src="/images/Microsoft-PowerShell-Archive-xl.webp" alt="Microsoft-PowerShell-Archive" /]
