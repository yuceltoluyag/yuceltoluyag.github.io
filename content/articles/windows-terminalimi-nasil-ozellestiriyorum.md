Title: Windows Terminalimi Nasıl Özelleştiriyorum
Date: 2022-06-26 10:00
Modified: 2025-08-11 22:59
Category: Windows
Tags: windows10, linux
Slug: windows-terminalimi-nasil-ozellestiriyorum
Authors: yuceltoluyag
Series: Git
Series_index: 2
Summary: Windows Terminal'inizi özelleştirmenin adım adım nasıl yapılacağını keşfedin.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/windows-terminal-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985306515279329
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrrio6wlc2s

## **Merhaba**

Instagram üzerinden **hikaye**lerimi takip edenler, **Windows Terminal**imi nasıl özelleştirdiğimi soruyordu. 🙄 Bu konu hakkında blog yazımı bekleyin dedim ve o beklenen an geldi 😂🥱

## Malzemeler 🥗

- Nerd Fonts
- Windows Terminal Preview
- Windows PowerShell
- Scoop
- Git
- Oh My Posh
- Terminal Icons
- PSReadLine
- Z
- PSFzf

## Font

Eğer terminalinizde **ikon**ların doğru şekilde **görüntülenmesini** istiyorsanız:

- [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts){: target="\_blank" rel="noopener noreferrer"} **kullanmalısınız**.
- Nerd Fonts'un tamamı 2 GB'dan daha fazladır. Hepsini indirmenize gerek yok; beğendiğiniz fontu seçip kurabilirsiniz. Keyfinize bakın! =)

## Microsoft Mağaza

- [Windows Terminal](https://www.microsoft.com/store/productId/9N0DX20HK701){: target="\_blank" rel="noopener noreferrer"}
- [PowerShell](https://www.microsoft.com/store/productId/9MZ1SNWT0N5D){: target="\_blank" rel="noopener noreferrer"}

Bu iki uygulamayı **kuruyoruz**. Kurduktan sonra **Windows Terminal** uygulamamızı **açıyoruz** ve **ayarlara** giriyoruz.

[responsive_img src="/images/windows-terminal-xl.webp" alt="windows-terminal" /]

Ayarlara girdikten sonra **görünüm** sekmesindeki ayarlarınız şu şekilde **olmalı**.

[responsive_img src="/images/windows-terminal2-xl.webp" alt="windows-terminal2" /]

Ayarları **kaydettikten** sonra **Startup** kısmına tıklayın. Yüklemiş olduğumuz **Powershell**'i **varsayılan** olarak ayarlayın.
[responsive_img src="/images/windows-terminal3-xl.webp" alt="windows-terminal3" /]
Ayarları **kaydedin** ve **Defaults** sekmesine gelin, oradan **Appearance** kısmından **Font** ayarlarınızı yapın.

[responsive_img src="/images/windows-terminal4-xl.webp" alt="windows-terminal4" /]
**Font** ayarlarınızı yaptıktan sonra aynı ekranda bulunan "**Enable Acrylic**"i **aktif** hale getirin ve ayarları **kaydedin**.

[responsive_img src="/images/windows-terminal5-xl.webp" alt="windows-terminal5" /]

Tüm bunları yaptıktan sonra **Terminal**inizi **kapatıp** yeniden **açın**.

## Scoop

Scoop'u kurmak için sırasıyla aşağıdaki komutları yazın:

```shell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

Scoop'u kurduktan sonra, paket **bulunamadı** gibi **hatalarla** karşılaşmamak için şu komutları çalıştırın:

```shell
scoop bucket add main
scoop bucket add extras
```

Veritabanını **güncelleyecektir**. Bu işlem biraz **zaman** alabilir.

Kurulum tamamlandıktan sonra:

```shell
scoop install curl sudo jq
```

output:

```shell

Installing '7zip'  (21.07)  [64bit]

7z2107-x64.msi (1,8 MB)  [=========================================] 100%

Checking hash of 7z2107-x64.msi ... ok.

Extracting 7z2107-x64.msi ... done.

Linking ~\scoop\apps\7zip\current =>  ~\scoop\apps\7zip\21.07

Creating shim for  '7z'.

Creating shortcut for 7-Zip (7zFM.exe)

Persisting Codecs

Persisting Formats

Running post-install script...

'7zip'  (21.07) was installed successfully!

Notes

-----

Add 7-Zip as a context menu option by running:

"C:\Users\Friday13\scoop\apps\7zip\current\install-context.reg"

Installing 'curl'  (7.83.1_1)  [64bit]

curl-7.83.1_1-win64-mingw.tar.xz (2,6 MB)  [=======================] 100%

Checking hash of curl-7.83.1_1-win64-mingw.tar.xz ... ok.

Extracting curl-7.83.1_1-win64-mingw.tar.xz ... done.

Linking ~\scoop\apps\curl\current =>  ~\scoop\apps\curl\7.83.1_1

Creating shim for  'curl'.

'curl'  (7.83.1_1) was installed successfully!

Installing 'jq'  (1.6)  [64bit]

jq-win64.exe (3,4 MB)  [===========================================] 100%

Checking hash of jq-win64.exe ... ok.

Linking ~\scoop\apps\jq\current =>  ~\scoop\apps\jq\1.6

Creating shim for  'jq'.

'jq'  (1.6) was installed successfully!

Installing 'sudo'  (0.2020.01.26)  [64bit]

sudo.ps1 (2,2 KB)  [===============================================] 100%

Checking hash of sudo.ps1 ... ok.

Linking ~\scoop\apps\sudo\current =>  ~\scoop\apps\sudo\0.2020.01.26

Creating shim for  'sudo'.

'sudo'  (0.2020.01.26) was installed successfully!

```

Daha sonra **neovim** ve **gcc** paketlerini kurun:

```shell
scoop install neovim gcc
```

output:

```shell

Installing 'gcc'  (11.2.0)  [64bit]

components-18.0.7z (96,4 MB)  [====================================] 100%

Checking hash of components-18.0.7z ... ok.

Extracting components-18.0.7z ... done.

Running pre-install script...

Linking ~\scoop\apps\gcc\current =>  ~\scoop\apps\gcc\11.2.0

'gcc'  (11.2.0) was installed successfully!

Installing 'neovim'  (0.7.0)  [64bit]

nvim-win64.zip (36,4 MB)  [========================================] 100%

Checking hash of nvim-win64.zip ... ok.

Extracting nvim-win64.zip ... done.

Linking ~\scoop\apps\neovim\current =>  ~\scoop\apps\neovim\0.7.0

Creating shim for  'nvim'.

Creating shim for  'nvim-qt'.

Creating shortcut for Neovim (nvim-qt.exe)

'neovim'  (0.7.0) was installed successfully!

'neovim' suggests installing 'extras/vcredist2022'.

```

## Git Kurulumu

```shell
winget install -e --id Git.Git
```

output:

```shell

winget install -e --id Git.Git

The `msstore`  source requires that you view the following agreements before using.

Terms of Transaction: https://aka.ms/microsoft-store-terms-of-transaction

The source requires the current machine's 2-letter geographic region to be sent to the backend service to function properly (ex. "US").



Do you agree to all the source agreements terms?

[Y] Yes [N] No: Y

Found Git [Git.Git] Version 2.36.1

This application is licensed to you by its owner.

Microsoft is not responsible for, nor does it grant any licenses to, third-party packages.

Downloading https://github.com/git-for-windows/git/releases/download/v2.36.1.windows.1/Git-2.36.1-64-bit.exe

██████████████████████████████ 47.3 MB / 47.3 MB

Successfully verified installer hash

Starting package install...

Successfully installed

```

Kurulum tamamlandıktan sonra **Git** ayarlarınızı yapınız. **Bilmiyorsanız**, [Git ssh-key oluşturma (windows&linux)](https://yuceltoluyag.github.io/git-ssh-key-olusturma-windows/) yazısını inceleyebilirsiniz.

## Powershell Config

**Kullanıcı dizininde** olduğunuzdan emin olun: `C:\Users\KullanıcıAdınız`. Bu dizindeyken işlemleri yapın. **Terminal**i açtığınızda varsayılan olarak bu dizin açılır, eğer **değiştirdiyseniz** diye söylüyorum. Sonra vay efendim bizde **olmuyor** **demeyin** :)

```shell
mkdir .config/powershell
```

Sonra oluşturduğumuz bu dizin altında **user_profile** adında dosya **oluşturuyoruz**.

```shell
nvim .\.config\powershell\user_profile.ps1
```

İçerisine şu satırları yazın:

```shell
# set PowerShell to UTF-8
[console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding

Import-Module posh-git
$omp_config = ".\material.omp.json"
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\$omp_config"  | Invoke-Expression

Import-Module -Name Terminal-Icons
Set-PSReadLineOption -EditMode Vi
...
```

Daha sonra bu ayarları yaptıktan sonra:

```shell
nvim $PROFILE.CurrentUserCurrentHost
```

İçerisine şunu yazın:

```shell
.  $env:USERPROFILE\.config\powershell\user_profile.ps1
```

Terminalinizi kapatıp açın. Test edelim:

```shell
ll
```

Yazın ve size renkli bir biçimde dizinin çıktısını verecektir.

## Paketler

**Oh My Posh** paketimizi kuralım. Sırasıyla iki komutla **terminal**e yapıştırıp entere basın 😏

```shell
Install-Module posh-git -Scope CurrentUser -Force
winget install oh-my-posh
```

Terminali kapatıp açın.

**NVM (NodeJS Version Manager)**

```shell
scoop install nvm # kurduktan sonra terminali kapatıp açın
nvm install lts
nvm use lts # Hata verirse
```

`nvm use lts` yazdığınızda şöyle bir uyarı alıyorsanız:

```shell
exit status 1: You do not have sufficient privilege to perform this operation.
```

Terminali kapatıp yönetici olarak çalıştırın. Tekrar `nvm use lts` yazın ve terminali normal olarak başlatın.

**Terminal Icons**

```shell
Install-Module -Name Terminal-Icons -Repository PSGallery -Force
```

Terminali kapatıp açın, **test** etmek için:

```shell
ll
```

Komutunu yazın ve **dosya** isimlerinin yanında **ikonlar** görmelisiniz.

**Z**

```shell
Install-Module -Name z -Force
```

**PSReadLine**

```shell
Install-Module -Name PSReadLine -AllowPrerelease -Scope CurrentUser -Force -SkipPublisherCheck
```

**FZF**

```shell
scoop install fzf
```

output:

```shell
Installing 'fzf'  (0.30.0)  [64bit]
...
```

**PSFzf**

```shell
Install-Module -Name PSFzf -Scope CurrentUser -Force
```

## Sonuç

[responsive_img src="/images/windows-terminal-son-xl.webp" alt="windows-terminal6" /]

## Bana Balık Tutmasını Öğretme, Bana Balık Ver

Bu yazımı okuyorsanız, muhtemelen **Git** nedir biliyorsunuzdur 👊 Linux tarafında sorunsuz çalışan araçlar **Windows**ta bazen sorunlu olabiliyor. Örneğin, **GPG** kullanırken sorun yaşamıyorsanız, kullanmaya devam edin 🧠 Ancak sorun yaşıyorsanız, "**gpg4win**" kullanmanızı tavsiye ederim.

```shell
scoop install gpg4win
```

[Windows Terminal DotFiles](https://github.com/yuceltoluyag/WindowsTerminal){: target="\_blank" rel="noopener noreferrer"} ayarlarıma buradan ulaşabilir ve kendinize göre düzenleyebilirsiniz.



