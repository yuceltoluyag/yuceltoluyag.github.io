Title: Modern Bir Mutt Kurulumu 1. Bölüm
Date: 2020-02-03 12:00 10:00
Modified: 2025-08-11 22:59
Category:  Linux
Tags: linux, e-mail
Slug: modern-bir-mutt-kurulumu-1-bolum
Authors: yuceltoluyag
Series: mutt
Series_index: 1
Summary: Neomutt, mbsync, msmtp ve mu ile modern bir mutt kurulumu yapmayı adım adım anlatıyoruz.
Translation: false
Status: published
Template: article
Image: images/neomutt_senkron-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114984516082310221


Merhaba! Bu yazımızın ilk bölümünde, harika bir e-posta istemcisi olan Mutt ayarlarımızı yapılandıracağız. 😊

## Gerekli Yazılımlar

Aşağıdaki yazılımlar, mutt'ı kullanabilmek için gereklidir:

1. [Mbsync/isync](https://wiki.archlinux.org/index.php/Isync#Installing){: target="_blank" rel="noopener noreferrer"}
2. [Msmtp](https://wiki.archlinux.org/index.php/Msmtp){: target="_blank" rel="noopener noreferrer"}
3. [Mu](https://aur.archlinux.org/packages/mu/){: target="_blank" rel="noopener noreferrer"}
4. Vim ya da türevleri
5. [NeoMutt](https://www.archlinux.org/packages/community/x86_64/neomutt/){: target="_blank" rel="noopener noreferrer"}
6. [Vdirsyncer](https://aur.archlinux.org/packages/vdirsyncer-git/){: target="_blank" rel="noopener noreferrer"}
7. [Khard](https://www.archlinux.org/packages/community/any/khard/){: target="_blank" rel="noopener noreferrer"}
8. [Ripmime](https://aur.archlinux.org/packages/ripmime/){: target="_blank" rel="noopener noreferrer"}
9. [UrlScan](https://www.archlinux.org/packages/community/any/urlscan/){: target="_blank" rel="noopener noreferrer"}
10. [W3m](https://www.archlinux.org/packages/extra/x86_64/w3m/){: target="_blank" rel="noopener noreferrer"}
11. [Gpgme](https://www.archlinux.org/packages/core/x86_64/gpgme/){: target="_blank" rel="noopener noreferrer"}

## Yukarıdaki Programlar Ne İşe Yarar?

- **mbsync**: Birden fazla IMAP hesabını yerel makinenizde senkronize eder.
- **msmtp**: E-posta göndermenizi sağlar. 😁
- **mu**: E-postalarınızı indexler ve tüm e-postalarınız için bir arama arayüzü sağlar.
- **vim**: E-posta yazmak için kullanılan editör. Ben Neovim kullanıyorum.
- **neomutt**: E-posta istemcimiz. 😇

Yukarıdaki yazılımlar, mail alıp gönderebilmemiz için gerekli araçlardır. E-postalar içindeki ekleri görmek, kişileri incelemek gibi işlemleri ise aşağıdaki araçlarla yapıyoruz:

- **vdirsyncer**: Kişilerinizi senkronize eder.
- **khard**: Vdirsyncer ile senkronize edilen kişileri neomutt'ta kullanılabilir hale getirir.
- **ripmime**: E-posta eklerini kaydetmeye yarar.
- **urlscan**: Tercih ettiğiniz tarayıcıda URL'leri açar.
- **w3m**: HTML e-postalarını mutt içinde okunabilir hale getirir.
- **gpgme**: E-postaları şifrelemek için kullanılır.

## Kurulum

Yukarıdaki paketleri kendi dağıtımınıza göre kurabilirsiniz. Arch Linux kullanıcıları için kolaylık olması adına, aşağıdaki komutla tüm paketleri kurabilirsiniz. 🤣

```bash
yay -S msmtp msmtp-mta isync mu-git neovim neomutt-git vdirsyncer-git khard ripmime urlscan w3m gpgme
```

Klasör yapımızı oluşturalım. Ben, ana dizinde klasör yapısını sevmediğim için gizli dosyalar olarak oluşturuyorum. Burası tamamen sizin tercihinize bağlı. 😀 Dikkat etmeniz gereken bir nokta: **Türkçe karakter kullanmamaya özen gösterin** (ç, ı, ü, ğ, ö, ş, İ, Ğ, Ü, Ö, Ş, Ç).

Ayrıca, Gmail ile yaşanabilecek sorunlara da dikkat etmeliyiz. Gmail'in aldığı güvenlik önlemleri nedeniyle bazı ayarlar yapmamız gerekebilir. Eğer Gmail ile ilgili bir sorun yaşarsanız, yorumda belirterek çözüm bulmaya çalışalım.

```bash
mkdir .Contacts
mkdir .Mail
mkdir .Mail/ytoluyagmail
mkdir .Mail/ytoluyagyandex
mkdir .Mail/yuceltoluyaghotmail
```

Ana dizine bir dosya daha oluşturalım:

```bash
touch ~/.mbsyncrc
```

Bu dosyada, e-posta hesaplarımızı IMAP üzerinden senkronize edilecek şekilde yapılandıracağız. Örnek olarak Gmail hesabımız için:

```bash
#################################
######## Gmail Hesabım ########
#################################

IMAPAccount gmail
Host imap.gmail.com
User ytoluyag@gmail.com
PassCmd "/usr/bin/gpg2 -q --for-your-eyes-only --no-tty -d ~/.password-store/ytoluyag.gpg"
SSLType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt
SSLVersions SSLv3
AuthMechs LOGIN

# Remote storage

IMAPStore ytoluyag-remote
Account gmail

# Local storage

MaildirStore ytoluyag-local
Path ~/.Mail/ytoluyagmail/
Inbox ~/.Mail/ytoluyagmail/INBOX

Channel ytoluyag-inbox
Master :ytoluyag-remote:"[Gmail]/All Mail"
Slave :ytoluyag-local:INBOX
Create Both
Expunge Both

Channel ytoluyag-archive
Master :ytoluyag-remote:"[Gmail]/Starred"
Slave :ytoluyag-local:archive
Create Both
Expunge Both

Channel ytoluyag-drafts
Master :ytoluyag-remote:"[Gmail]/Drafts"
Slave :ytoluyag-local:drafts
Create Both
Expunge Both

Channel ytoluyag-sent
Master :ytoluyag-remote:"[Gmail]/Sent Mail"
Slave :ytoluyag-local:sent
Create Both
Expunge Both

Channel ytoluyag-trash
Master :ytoluyag-remote:"[Gmail]/Trash"
Slave :ytoluyag-local:trash
Create Both
Expunge Both

Channel ytoluyag-junk
Master :ytoluyag-remote:"[Gmail]/Spam"
Slave :ytoluyag-local:junk
Create Both
Expunge Both

Group ytoluyag
Channel ytoluyag-inbox
Channel ytoluyag-archive
Channel ytoluyag-drafts
Channel ytoluyag-sent
Channel ytoluyag-trash
Channel ytoluyag-junk
```

Burada, ilgili e-postaları oluşturduğunuz klasörlere yönlendirdik. **Remote** ve **local** kavramları: E-postalarınızın uzantılarıdır. Örneğin, Gmail’de Spam klasörüne tıkladığınızda **trash** linkine yönlendirir. Remote kısmı çok önemlidir. 

Şifre kısmını ise şu şekilde yapılandırabilirsiniz:

```bash
#PassCmd "security find-internet-password -s 'imap.gmail.com' -a 'ytoluyag@gmail.com' -w"
PassCmd "/usr/bin/gpg2 -q --for-your-eyes-only --no-tty -d ~/.password-store/ytoluyag.gpg"
```

Şimdi, bir dosya daha oluşturalım:

```bash
touch ~/.msmtprc
```

Bu dosyada ise mail bağlantı ayarlarını yapıyoruz. Eğer mail bağlantınızın imap, port, ssl gibi bilgilerini bilmiyorsanız, aşağıdaki kaynaklara göz atabilirsiniz:

- [Gmail İMAP Ayarları](https://support.google.com/mail/answer/7126229?hl=tr){: target="_blank" rel="noopener noreferrer"}
- [Yandex İMAP Ayarları](https://yandex.com.tr/support/mail/mail-clients.html){: target="_blank" rel="noopener noreferrer"}
- [Hotmail İMAP Ayarları](https://support.office.com/tr-tr/article/outlook-com-i%C3%A7in-pop-imap-ve-smtp-ayarlar%C4%B1-d088b986-291d-42b8-9564-9c414e2aa040){: target="_blank" rel="noopener noreferrer"}

```bash
account ytoluyagmail
host smtp.gmail.com
port 465
protocol smtp
auth on
user ytoluyag@gmail.com
from ytoluyag@gmail.com
tls on
tls_starttls off
tls_trust_file /etc/ssl/certs/ca-certificates.crt

account yuceltoluyaghotmail
host smtp.office365.com
port 587
protocol smtp
auth on
user yuceltoluyag@hotmail.com.tr
from yuceltoluyag@hotmail.com.tr
tls on
tls_starttls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
```

Bu ayarları test edelim:

```bash
echo "Mail Test Ediyoruz" | msmtp -a ytoluyagmail ytoluyag@gmail.com
```

[responsive_img src="/images/uygulama_sifresi_gmail-xl.webp" alt="Test Sonucu" /]
Eğer hata alırsanız, çözüm için tekrar gözden geçirebilirsiniz. Özellikle Gmail'in iki

 faktörlü doğrulama gereksinimlerini göz önünde bulundurmalısınız.

Eğer bağlantınız başarılı olduysa, Muttr'ı başlatalım.

```bash
neomutt
```

Burada göreceğiniz hata loglarını da düzeltmek gerekebilir. Eğer hata alıyorsanız, dosyanızı tekrar gözden geçirebilirsiniz. 
```bash
mbsync -a
```

[responsive_img src="/images/neomutt_senkron-xl.webp" alt="neomutt_senkron" /]
Bu yazı dizisinin [2.Bölüm](/imap-sunucusuna-openssl-kullanarak-terminal-ile-erisin){: target="_blank" rel="noopener noreferrer"}'ünde, e-posta istemcinizi daha ayrıntılı olarak yapılandırmaya devam edeceğiz. 🙂


