Title: i3lock ile Uyku Modundan Uyanırken Otomatik Kilit Ekranı Nasıl Ayarlanır?
Date: 2025-04-24 14:00
Modified: 2025-08-11 22:59
Category: Masaüstü Ortamları
Tags: i3lock, systemd, linux güvenlik, ekran kilidi, suspend
Slug: i3lock-uyku-modu-kilit-ekrani
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: i3lock kullanarak Linux sisteminiz uyku modundan uyandığında ekranın otomatik olarak kilitlenmesini sağlayın. Bu rehber, systemd servisleriyle nasıl yapılandırılacağını adım adım gösteriyor.
Template: article
Image: images/wake-up-lock-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114987898406460144
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvswclazsc2e

## i3lock ile Uyku Modundan Uyanırken Otomatik Kilit Ekranı Nasıl Ayarlanır?

Linux kullanıyorsanız ve bilgisayarınız uyku modundan uyandığında otomatik olarak ekranın kilitlenmesini istiyorsanız, doğru yerdesiniz. Bu rehberde, popüler ekran kilitleyici **i3lock** (özellikle `i3lock-color`) ile bu işlemi nasıl yapabileceğinizi anlatacağım.

Güvenlik önemli, özellikle bilgisayarınızı kısa süreliğine bile olsa başıboş bırakıyorsanız. İşte çözüm: `systemd` ile entegre çalışan otomatik bir ekran kilit sistemi. 👇

## 📦 Hazırlık: Gereksiz Ekran Kilitleyicileri Devre Dışı Bırakın

İlk adım, sisteminizdeki mevcut ekran kilitleyicilerin otomatik devreye girmesini engellemek. Ben **KDE** masaüstü ortamı kullanıyorum (Arch Linux üzerinde), bu yüzden **KScreenLocker** ayarlarını şu şekilde düzenledim:

[responsive_img src="/images/wake-up-lock-xl.webp" alt="RKScreenLocker ayarları" /]
⚠️ _"Otomatik olarak kilitle" ve "devam ettiğinde kilitle" gibi seçeneklerin işaretli olmadığından emin olun._

Ardından `i3lock`'un sisteminizde kurulu olduğundan emin olun. Tavsiyem: [i3lock-color](https://github.com/Raymo111/i3lock-color){: target="\_blank" rel="noopener noreferrer"}'u tercih etmeniz. Daha fazla özelleştirme seçeneği sunuyor.

## Arch tabanlılar için

```bash
yay -S i3lock-color # Arch tabanlılar için
```

## Debian tabanlılar için

```bash
sudo apt install autoconf gcc make pkg-config libpam0g-dev libcairo2-dev libfontconfig1-dev libxcb-composite0-dev libev-dev libx11-xcb-dev libxcb-xkb-dev libxcb-xinerama0-dev libxcb-randr0-dev libxcb-image0-dev libxcb-util0-dev libxcb-xrm-dev libxkbcommon-dev libxkbcommon-x11-dev libjpeg-dev libgif-dev
```

## Fedora

```bash
sudo dnf install -y autoconf automake cairo-devel fontconfig gcc libev-devel libjpeg-turbo-devel libXinerama libxkbcommon-devel libxkbcommon-x11-devel libXrandr pam-devel pkgconf xcb-util-image-devel xcb-util-xrm-devel
```

20.04 LTS$/20.04 LTS

```bash
sudo apt install autoconf gcc make pkg-config libpam0g-dev libcairo2-dev libfontconfig1-dev libxcb-composite0-dev libev-dev libx11-xcb-dev libxcb-xkb-dev libxcb-xinerama0-dev libxcb-randr0-dev libxcb-image0-dev libxcb-util-dev libxcb-xrm-dev libxkbcommon-dev libxkbcommon-x11-dev libjpeg-dev
```

## 🔐 Adım 1: Kilit Komut Dosyasını Oluşturun

İlk olarak, ekran kilitleme komutlarını içeren bir bash script oluşturalım:

```bash
mkdir -p ~/scripts
nano ~/scripts/i3lock.sh
```

İçeriği şöyle olacak:

```bash
#!/bin/bash
i3lock # Kullanmak istediğiniz parametrelerle birlikte. i3lock -h ile seçenekleri görüntüleyebilirsiniz.
```

Dosyayı kaydedin ve çalıştırılabilir yapın:

```bash
chmod +x ~/scripts/i3lock.sh
```

## ⚙️ Adım 2: systemd Servisini Tanımlayın

Şimdi, uyku modundan çıkıldığında yukarıdaki script’in otomatik çalışmasını sağlayacak bir `systemd` servisi oluşturacağız.

```bash
sudo nano /etc/systemd/system/wakelock@.service
```

Ve aşağıdaki içeriği yapıştırın:

```ini
[Unit]
Description=Uyku modundan çıkınca ekranı kilitle
Before=sleep.target suspend.target

[Service]
User=%i
Type=forking
Environment=DISPLAY=:0
ExecStart=/home/%i/scripts/i3lock.sh

[Install]
WantedBy=sleep.target suspend.target
```

Bu yapılandırma, `DISPLAY=:0` tanımı sayesinde X oturumunu tanımlar ve belirtilen kullanıcı için script’i çalıştırır.

## 🚀 Adım 3: Servisi Etkinleştirin

Servisi etkinleştirip anında başlatmak için aşağıdaki komutu kullanın:

```bash
sudo systemctl enable wakelock@<KULLANICI_ADINIZ> --now
```

> Yerine kendi kullanıcı adınızı yazmayı unutmayın. Örnek:
> `sudo systemctl enable wakelock@yucel --now`

Bundan sonra, sisteminiz her uyku modundan döndüğünde otomatik olarak `i3lock` ekran kilitleyicisi devreye girecek. 🔒

## 🔁 Yapılandırma Güncellemeleri Nasıl Uygulanır?

Script’te ya da servis dosyasında bir değişiklik yaptıysanız, tüm sistemi yeniden başlatmanıza gerek yok. Aşağıdaki komutla servisi yeniden başlatmanız yeterli:

```bash
sudo systemctl restart wakelock@<KULLANICI_ADINIZ>
```

## 📝 Sonuç

Bu yazıda, i3lock ve systemd kullanarak Linux sisteminizi daha güvenli hale getirmenin pratik bir yolunu öğrendiniz. Minimal ama etkili bir yapılandırma ile, bilgisayarınız uyku modundan uyandığında ekranın otomatik olarak kilitlenmesini sağlayabilirsiniz. Bu tür güvenlik önlemleri, özellikle taşınabilir cihazlarda büyük önem taşıyor.

💬 Eğer bu rehber işinize yaradıysa, yorum bırakarak bana destek olabilirsiniz. Sorularınız ya da önerileriniz varsa duymaktan memnuniyet duyarım!

---



