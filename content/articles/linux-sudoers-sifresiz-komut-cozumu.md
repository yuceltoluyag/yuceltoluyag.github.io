Title: Linux’ta Sudoers ile Şifresiz Komut Çalıştırma
Date: 2025-11-09 16:30
Modified: 2025-11-09 16:45
Category: Linux
Tags: sudoers, linux güvenlik, sudo, otomasyon
Slug: linux-sudoers-sifresiz-komut-cozumu
Authors: yuceltoluyag
Summary: Sudoers yapılandırması yüzünden 'sudo: a password is required' hatası alıyorsan, bu rehber hatanın nedenini açıklar ve güvenli, adım adım çözümler sunar.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/linux-sudoers-sifresiz-komut-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115520919386793284
bluesky:https://bsky.app/profile/yuceltoluyag.github.io/post/3m57n2hvd6c2y

## Giriş

Bazen bir script yazarsın ve her seferinde parola girmek zorunda kalırsın — sinir bozucu, değil mi? 😅  
Bu yazıda **sudoers şifresiz komut çalıştırma** sorununu sade, dostane bir dille ele alıyorum; adım adım ilerleyip hatanın kaynağını ve güvenli çözümlerini göstereceğim.

## Sorunun Kaynağı

Wayland gibi modern masaüstü ortamlarında `xset` işe yaramayabilir; bunun yerine klavye ışıklarını değiştirmek için `/sys/class/leds/inputX::scrolllock/brightness` dosyasına yazman gerekir.  
Bu dosyaya yazmak root yetkisi[^1] ister. script'inde `sudo tee` kullandıysan sistem sürekli şifre isteyebilir. Bunun tipik hatırlatması:

```bash
sudo: a password is required
```

Çoğu zaman neden, `sudoers` dosyasında yanlış veya eksik izin tanımıdır.

## Neden Doğru İzin Tanımı Önemli?

- `sudoers` satırında programın **tam yolunu** belirtmezsen sistem izinleri eşleştiremez.
- Komuta verilen argümanlar izin tanımına uymuyorsa işlem yine şifre ister.
- `/etc/sudoers` veya `/etc/sudoers.d/` içinde sözdizimi hatası olabilir — bu da beklenmeyen davranışlara yol açar.

!!! warning "Dikkat! `sudoers` dosyasını hatalı düzenlemek sistemi etkileyebilir; mutlaka `visudo` ile değişiklik yap ⚠️"

## Çözüm: Adım Adım

### 1. Programın Tam Yolunu Kullan

`sudoers` dosyasına, komutun tam yolunu yazmak en temel kuraldır. Örneğin `tee` için:

```sudoers
friday13 ALL=(ALL) NOPASSWD: /usr/bin/tee
```

Bu satır, `/usr/bin/tee` komutunu tüm argümanlarla şifresiz çalıştırma izni verir. ✅

### 2. Birden Fazla Komut için Alias Kullan

Birden fazla araca izin vermek istiyorsan grup oluşturmak daha düzenli olur:

```sudoers
Cmnd_Alias MYTOOLS = /usr/bin/tee, /usr/bin/pacman, /usr/bin/aurman
friday13 ALL=(ALL) NOPASSWD: MYTOOLS
```

!!! tip "İpucu ⚡ Cmnd_Alias kullanarak izinleri gruplandırırsın; bu yönetimi kolaylaştırır."

### 3. Değişiklikleri `/etc/sudoers.d/` Altında Tut

Ana `sudoers` dosyasını doğrudan düzenlemek yerine ayrı bir dosya oluştur:

```bash
sudo visudo -f /etc/sudoers.d/10_mytools
```

Dosya içeriği örneği:

```sudoers
Cmnd_Alias MYTOOLS = /usr/bin/tee, /usr/bin/pacman, /usr/bin/aurman
friday13 ALL=(ALL) NOPASSWD: MYTOOLS
```

Bu yöntem hem düzeni korur hem de yönetimi kolaylaştırır.

### 4. Test Etme Yöntemleri

Değişiklikleri doğrulamak için şu adımları uygula:

```bash
sudo -k  # Sudo önbelleğini temizle
sudo -n /usr/bin/tee /sys/class/leds/input4::scrolllock/brightness <<< 1
sudo -l  # Kullanıcının sudo izinlerini listele
```

`sudo -n` komutu parola istemeden deneme yapar; eğer hata vermezse ayarın doğru çalışıyor demektir. ✅

## Yaygın Tuzaklar ve Dikkat Edilmesi Gerekenler

!!! warning "Dikkat! `NOPASSWD` iznini geniş tutmak ciddi güvenlik açıklarına yol açabilir ⚠️"

!!! note "Not: `sudo -l` ile hangi komutlara izin verildiğini düzenli aralıklarla kontrol et."

## Özet

- `sudoers` içinde **tam yol** belirtmek zorunludur.
- `Cmnd_Alias` kullanarak izinleri grupla; yönetim kolaylaşır.
- Değişiklikleri `/etc/sudoers.d/` içinde tut ve `visudo` ile düzenle.
- `sudo -n` ve `sudo -l` ile test ederek doğrula.

## Faydalı Komutlar

```bash
sudo visudo -f /etc/sudoers.d/10_mytools
sudo -k
sudo -n /usr/bin/tee /sys/class/leds/input4::scrolllock/brightness <<< 1
sudo -l
```

## Kaynaklar

ArchWiki: [Sudo - Root erişimi](https://wiki.archlinux.org/title/Sudo){: target="\_blank" rel="noopener noreferrer"}
`man sudoers`

## Sonuç

Bu adımlarla `sudoers şifresiz komut çalıştırma` sorununu güvenli ve kalıcı şekilde çözebilirsin.
Denediğinde sonucu veya hangi komutlara izin verdiğini yorumlara yaz — beraber daha güvenli ayarlar kuralım! 🎉

[^1]: Sistem üzerindeki kritik dosya ve ayarlara erişim izni anlamına gelir.

[responsive_img src="/images/linux-sudoers-sifresiz-komut-xl.webp" alt="Linux Sudoers Şifre istemeden işlem yapma" /]



