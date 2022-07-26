---
layout: post
title: WSL üzerinde Arch Linux Kurulumu
description: Arch Linux on Windows Subsystem for Linux (WSL)
image: "/assets/images/windows-terminal-son.webp"
category: program
tags: [windows10, linux]
comments: false
edit_url: true
toc: true
---

**Merhaba**

[İnstagram](https://www.instagram.com/yuceltoluyag/){:target="\_blank"}{:rel="noopener noreferrer"} üzerinden **hikaye**lerimi takip edenler **WSL**'ye nasıl **Arch Linux** Kurduğumu soruyorlardı. Kurulum yapabilenler ise **sürekli çöktüğünden** yakındılar. Uzun süredir kullanıyorum. Çökme patlama yanma yakılma gibi şeyler **yaşamadım**. 😎

# WSL Nedir (Windows Subsytem Linux) ?

Windows altında Üçüncü parti yazılım olmadan Linux çalıştırmamızı sağlar. **WSL 1** ve **WSL 2** arasında ne fark var ? **WSL 2** de **Hyper -V** teknolojisinin kullanıldığı için daha **performanslı** çalışıyor. Şu an resmi olarak grafik(**Desktop**) arabirimi desteklenmesede bir çok kullanıcı **DE** dahil kurulum yapıp kullanıyor. **Ömrünü** **Linux** camiasında geçiren arkadaşlara kesinlikle **tavsiye ediyorum** 🤩

| Özellik                                                   | WSL 1 | WSL 2 |
| --------------------------------------------------------- | ----- | ----- |
| Windows ve Linux arasında entegrasyon                     | ✅    | ✅    |
| Hızlı önyükleme süreleri                                  | ✅    | ✅    |
| Geleneksel Sanal Makinelere kıyasla küçük kaynak ayak izi | ✅    | ✅    |
| VMware ve VirtualBox'ın güncel sürümleriyle çalışır       | ✅    | ✅    |
| Sanal makine Yönetimi                                     | ❌    | ✅    |
| Tam Linux Çekirdeği                                       | ❌    | ✅    |
| Tam sistem çağrı uyumluluğu                               | ❌    | ✅    |
| OS dosya sistemlerinde performans                         | ✅    | ❌    |

# Malzemeler 🥗

- WSL 2 için Windows 10 versionunuz **2004** veya **daha üstü olmalı** (**19041**) yada **Windows 11** kullanıyor olmalısınız. Sürümünüzü şu şekilde hızlıca öğrenebilirsiniz. `Windows + R`, tuşuna basın gelen ekrana `winver` yazın size sürüm numaranızı gösterecektir.

![wsl2-archlinux-kurulumu](/assets/images/wls-archlinux-kurulumu.webp)

- Eğerki **sürümünüz eski** ise şuradaki adımları takip edebilirsiniz. [Install Linux on Windows with WSL](https://docs.microsoft.com/en-us/windows/wsl/install-manual){:target="\_blank"}{:rel="noopener noreferrer"}

- [Windows Terminal Özelleştirme](https://yuceltoluyag.github.io/windows-terminal-ozellestirme/){:target="\_blank"}{:rel="noopener noreferrer"}

- WSL

## WSL2 Kurulumu

Terminalinizi **Yönetici** olarak başlatın. Ve şu komutu girin.

```shell

wsl --install

```

output

```shell

Installing: Virtual Machine Platform

Virtual Machine Platform has been installed.

Installing: Windows Subsystem for Linux

Windows Subsystem for Linux has been installed.

Downloading: WSL Kernel

Installing: WSL Kernel

WSL Kernel has been installed.

Downloading: Ubuntu

İstenen işlem başarılı. Değişiklikler sistem yeniden önyükleninceye kadar etkili olmayacak.

```

Daha sonra **sistemi yeniden başlatın** 👀 Bilgisayarınız **yeniden başladıktan sonra** **WSL2** **kernel update** paketi ve **Ubuntu Linux** dağıtımı **otomatik** olarak yüklenecektir. Kurulum internet hızınıza göre değişiklik gösterecektir.Dondu kaldımı acaba diye şey edip **terminali kapatmayın** 🤡

Kurulum tamamlandıktan sonra sizden **kullanıcı adı** ve **şifre** oluşturmanızı isteyecek. O kısımları doldurun.

![wsl2-archlinux-kurulumu2](/assets/images/wls-archlinux-kurulumu2.webp)

```shell

Enter new UNIX username: kullanıcıadıgirin

New password:Şifre Girin

Retype new password: Şifrenizi Tekrar Girin

```

output

```shell

Installing, this may take a few minutes...

Please create a default UNIX user account. The username does not need to match your Windows username.

For more information visit: https://aka.ms/wslusers

Enter new UNIX username: friday13

New password:

Retype new password:

passwd: password updated successfully

Installation successful!

To run a command as administrator (user "root"), use "sudo <command>".

See "man sudo_root"  for details.



Welcome to Ubuntu 20.04 LTS (GNU/Linux 5.10.16.3-microsoft-standard-WSL2 x86_64)



* Documentation: https://help.ubuntu.com

* Management: https://landscape.canonical.com

* Support: https://ubuntu.com/advantage



System information as of Tue May 24 03:07:17 +03 2022



System load: 0.18 Processes: 8

Usage of /: 0.4% of 250.98GB Users logged in: 0

Memory usage: 0% IPv4 address for eth0: 172.30.160.142

Swap usage: 0%



0 updates can be installed immediately.

0 of these updates are security updates.




The list of available updates is more than a week old.

To check for new updates run: sudo apt update




This message is shown once once a day. To disable it please create the

/home/friday13/.hushlogin file.

```

WSL kurulumumuz buraya kadardı.Artık **terminal** sekmenizde **Ubuntu** dağıtımını görebilirsiniz.

![wsl2-archlinux-kurulumu3](/assets/images/wls-archlinux-kurulumu3.webp)

Adettendir diyerek ubuntumuzu bir güncelleyelim 🤭

```bash

sudo apt update && sudo apt upgrade

```

## Archlinux Kurulumu

- `wsl --set-default-version 2` komutunu çalıştırın. Bazı kullanıcılar yukarıdaki kısımları atlayarak yapabilir 😏 Sistemde hangi **WSL** sürümünü kullandığınızı merak ediyorsanız

```shell

wsl -l -v

```

output

```shell

NAME STATE VERSION

* Ubuntu Running 2

```

komutunu yazın hangi **distro**nun hangi sürümü kullandığını görebilirsiniz.

- [ArchWSL](https://github.com/yuk7/ArchWSL/releases){:target="\_blank"}{:rel="noopener noreferrer"} Reposuna gidip son sürümü indirin. (Arch.zip)

- `C` Dizini altında `archlinux` adında bir klasör oluşturun.

- İndirdiğiniz dosyayı zipten çıkartın. İçerisinde `Arch.exe` ve `rootfs.tar.gz` adlı iki dosyayı kopyalayın ve `C:\archlinux` klasörüne yapıştırın.

- Archlinux.exe yi çalıştırın.

![wsl2-archlinux-kurulumu4](/assets/images/wls-archlinux-kurulumu4.webp)

- Kurulum Bittikten sonra terminalinizden **Arch Linux**u başlatın.

![wsl2-archlinux-kurulumu5](/assets/images/wls-archlinux-kurulumu5.webp)

- Hemen kullanıcı oluşturalım ve kendimize sudo yetkisi verelim 🤖 **Friday13** benim yerli ve milli nickimdir. Siz oraya **ali** yazın **mehmet** yazın ne yazarsanız yazın ☠️

```bash

useradd -m -g users -G optical,storage,wheel,video,audio,users,power,network,log -s /bin/bash friday13 #OLUŞTACAĞINIZKULLANICIADINIGİRİN#

```

```bash

passwd friday13 #oluşturduğunuz kullanıcının şifresini belirleyin.#

```

```bash

groupadd sudo #sudo grubu ekleyelim#

```

```bash

nano /etc/sudoers

```

dosyamızı açıyoruz resimdeki gibi oluşturduğumuz kullanıcıyıda ekliyoruz.

```bash

%wheel ALL=(ALL) NOPASSWD:

%sudo ALL=(ALL) ALL

```

![wsl2-archlinux-kurulumu6](/assets/images/wls-archlinux-kurulumu6.webp)

Bu satırların başında bulunan **diez(#)** işaretlerini **kaldırıyoruz**. **F3** ardından **enter** ve **F2** ye basarak çıkıyoruz.

- Sistem açıldığında oluşturduğumuz kullanıcıyı varsayılan olarak aktif etmek için

(**Uyarı** burada ki komutları **Arch** terminaline **değil**,**normal terminal**e gireceksiniz. 🎃)

```bash

cd C:\archlinux #dizinine gidin

Arch.exe config --default-user friday13

```

![wsl2-archlinux-kurulumu7](/assets/images/wls-archlinux-kurulumu7.webp)

Daha sonra açık tüm terminalleri **kapatıp** yeniden **açın** ve **Arch** sekmesinden **Arch** seçin. Tada :)

![wsl2-archlinux-kurulumu8](/assets/images/wls-archlinux-kurulumu8.webp)

Bundan sonra içerisinde at mı koşturursunuz deveye hendek mi atlatırsınız bilmem : ) Keyfinize göre takılın.

## Yerel Dosyalarınızı Nasıl İçer aktarırsınız.

Hali hazırda bulunan dosyalarınızı **Arch** içine aktarmak istiyorsanız. `Windows + R `tuşuna basın `\\wsl$` yazın artık dosya dizinindesiniz 🤙

## Ram ve CPU Yönetimi

- Bu komutla sistemde **aktif** çalışan işletim sistemlerini listelersiniz. 👨‍💻

```shell

wsl --list --verbose

```

- Daha sonra **WSL** kapatıyoruz.

```shell

wsl --shutdown

```

- Kullanıcı dizinize gidin `C:\Users\<KullanıcıAdınız>` içerisine `.wslconfig` adında bir dosya **oluşturun**. Ve dosyanın içerisini şöyle **doldurun** :

```shell

# Ayarlar, WSL 2 üzerinde çalışan tüm Linux dağıtımlarında geçerlidir

# "free -m" ile wsl2'de Ram hafızasını görebilirsiniz.

[wsl2]



# VM belleğini en fazla 12 GB kullanacak şekilde sınırlar, varsayılan olarak RAM'in %50'si

memory=12GB



# VM'yi 8 sanal işlemci kullanacak şekilde ayarlar(Çekirdek sayınıza göre düzenleyin)

processors=4



# Takas depolama alanı miktarını 4 GB olarak ayarlar, varsayılan olarak kullanılabilir RAM'in %25'i

# Kullanmak istemiyorsanız 0 yazabilirsiniz.

swap=4GB



```

Bu ayarları sistem özelliklerinize göre **değiştirmeyi unutmayın**..

## Paketler ve Özelleştirme

- `/etc/pacman.conf` dosyamı düzenledim.

- `sudo pacman -S git openssh base base-devel wget htop neovim curl ruby nodejs python ` temel ihtiyaç paketlerini kurdum.

- Paket kurarken şu uyarıyı görürseniz

```bash
fakeroot is in IgnorePkg/IgnoreGroup. Install anyway? [Y/n] n\*\*
```

**kesinlikle kaldırmayın** aklınızda bulunsun. Ne zaman görseniz **n** yapin 🐧

- **YAY** paket yöneticisini kurdum

```bash

git clone https://aur.archlinux.org/yay-git.git

cd yay-git/

makepkg -sri

cd ..

rm -rf yay-git/

yay -Syyu

```

Ayarlarıma **Github** Sayfamdan ulaşabilirsiniz.
