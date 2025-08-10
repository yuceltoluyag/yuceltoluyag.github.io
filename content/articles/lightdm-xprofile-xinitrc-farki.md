Title: Linux’ta Oturum Ayarları: .xinitrc mi .xprofile mı?
Date: 2025-05-09 16:30
Modified: 2025-08-08 01:17
Category: Masaüstü Ortamları
Tags: lightdm, xinitrc, xprofile, arch linux, oturum ayarları
Slug: lightdm-xprofile-xinitrc-farki
Authors: yuceltoluyag
Status: published
Summary: LightDM gibi bir display manager kullanıyorsanız `.xinitrc` dosyanız neden çalışmaz? Doğru başlangıç dosyasının `.xprofile` olduğunu anlatan bu rehber, kafa karışıklığını ortadan kaldırıyor.
Template: article
Image: images/xinitvsxprofile-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114989004771704509


# LightDM Kullanıyorsan Neden `.xprofile` Kullanmalısın?

Arch Linux ya da diğer Linux dağıtımlarında masaüstü ortamını başlatmak için `~/.xinitrc` dosyasını mı düzenliyorsun ama hiçbir şey çalışmıyor mu? 🤔  
Bu durumun tek bir sebebi olabilir: **LightDM veya benzeri bir Display Manager kullanıyorsun ve `.xinitrc` dosyan hiçbir işe yaramıyor!** Bu yazıda, `.xinitrc` ile `.xprofile` farkını detaylıca inceleyecek ve neden `.xprofile` kullanman gerektiğini adım adım göstereceğiz.

---
[responsive_img src="/images/xinitvsxprofile-lg.webp" alt="xinitrc ve xprofile farkı" /]
## `.xinitrc` ve `.xprofile` Nedir?

### `.xinitrc` Dosyası Ne Yapar?

`.xinitrc`, klasik olarak **`startx` komutu** kullanılarak masaüstü ortamı başlatıldığında devreye girer. Genellikle şu durumlarda kullanılır:

- Oturumu `tty` üzerinden manuel başlatanlar
- Hafif sistemler (Display Manager kullanmayanlar)
- Tam kontrol isteyen minimalist kullanıcılar

Örnek bir `.xinitrc` içeriği:

```bash
#!/bin/bash
xsetroot -cursor_name left_ptr &
exec i3
```

### `.xprofile` Dosyası Ne İçin Kullanılır?

`.xprofile`, GUI oturumlarını **otomatik olarak başlatan Display Manager’lar** tarafından çalıştırılır. Özellikle şu durumlar için kullanılır:

* `lightdm`, `gdm`, `sddm` gibi display manager kullanan sistemler
* Ortam değişkenleri (`PATH`, `XCURSOR_PATH`), oturum başlangıç uygulamaları (`numlockx`, `dunst` vs.)
* Arka plan servisleri (`mpd`, `ssh-agent` gibi)

---

## LightDM `.xinitrc`'yi Neden Yoksayar?

Display Manager'lar (özellikle LightDM):

* Oturumu kendi başına başlatır
* `~/.xinitrc`'yi **çalıştırmaz**
* Sadece `~/.xprofile`, `~/.xsession`, `~/.pam_environment` gibi dosyalara bakar

Yani, `.xinitrc` dosyasına ne yazarsan yaz, **LightDM onu okumaz**.
Bu nedenle başlangıçta çalışmasını istediğin tüm komutları `.xprofile` içine taşımalısın.

---

## Uygulamalı Senaryo: `.xprofile` ile Doğru Başlatma

Aşağıdaki örnek `.xprofile` dosyası:

```bash
#!/bin/bash
# Ortam değişkenleri
export XCURSOR_PATH="$HOME/.local/share/icons:$HOME/.icons:/usr/share/icons"

# Arkaplan servisleri
pgrep -x "mpd" > /dev/null || setsid mpd &
setsid xscreensaver &
setsid dunst &

# SSH agent
eval "$(ssh-agent -s)" 2>/dev/null || true

# Nvidia ayarları
nvidia-settings --load-config-only --config "$HOME/.config/.nvidia-settings-rc" &

# i3 pencere yöneticisi
exec dbus-launch --sh-syntax --exit-with-session i3
```

Yukarıdaki komutları `.xinitrc` içinde tuttuğun sürece hiçbir şey olmayacak. Ama `.xprofile` içine koyarsan her şey sihir gibi çalışacak! 🪄

---

## Adım Adım Geçiş: `.xinitrc` → `.xprofile`

1. `.xinitrc` içeriğini analiz et
2. Ortam değişkenlerini ve servis başlatmalarını `.xprofile` içine taşı
3. `exec` komutlarını yalnızca bir kere yaz (iç içe çağırma yapma)
4. `.xinitrc` dosyasını temizle veya sil (isteğe bağlı)

---

## Sık Yapılan Hatalar

* `.xprofile` içinde `source ~/.xinitrc` yapmak ve `xinitrc` içinde tekrar `exec i3` yazmak → **Çift başlatma hatası**
* `.xinitrc`'ye sadece `export` komutları yazmak → **Hiçbir şey çalışmaz**
* `.xprofile`'ı çalıştırılabilir yapmamak → `chmod +x ~/.xprofile`

---

## Özet: Hangi Dosyayı Ne Zaman Kullanmalısın?

| Durum                           | Doğru Dosya        |
| ------------------------------- | ------------------ |
| `startx` ile oturum açıyorsan   | `.xinitrc`         |
| LightDM gibi bir DM varsa       | `.xprofile`        |
| Sistem genel ortam değişkenleri | `/etc/environment` |

---

## Sonuç ve Çağrı: Hangisini Kullanacağını Biliyor musun?

Artık `.xinitrc` ile `.xprofile` arasındaki farkları biliyorsun. Display Manager kullanıyorsan, tüm başlangıç komutlarını **`.xprofile`** dosyana taşı.
Bu sayede başlatılamayan servisler, çalışmayan tema ayarları, eksik ikonlar gibi dertlerden kurtul!

👇
**Sen de `.xinitrc` mi yoksa `.xprofile` mi kullanıyorsun? Deneyimlerini yorum olarak paylaş!**
Soruların varsa da çekinmeden yaz! 💬




