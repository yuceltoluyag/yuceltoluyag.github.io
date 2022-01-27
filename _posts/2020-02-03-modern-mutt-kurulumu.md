---
layout: post
title: Modern bir mutt kurulumu 1.bölüm
description: Neomutt, mbsync, msmtp ve mu - modern bir mutt kurulumu
image: "/assets/images/neomutt_senkron.webp"
category: linux
tags: [linux, e-mail]
series: "mutt"
comments: false
edit_url: true
toc: true
---

Merhaba bu yazımızın ilk bölümünde,muhteşem bir e-posta istemcisi olan mutt ayarlarımızı yapılandıracağız.

<!-- excerpt separator -->

{% include series.html %}

## Gerekli Yazılımlar

1.  [Mbsync/isync](https://wiki.archlinux.org/index.php/Isync#Installing)
2.  [Msmtp](https://wiki.archlinux.org/index.php/Msmtp)
3.  [Mu](https://aur.archlinux.org/packages/mu/)
4.  Vim yada türevleri
5.  [NeoMutt](https://www.archlinux.org/packages/community/x86_64/neomutt/)
6.  [Vdirsyncer](https://aur.archlinux.org/packages/vdirsyncer-git/)
7.  [Khard](https://www.archlinux.org/packages/community/any/khard/)
8.  [Ripmime](https://aur.archlinux.org/packages/ripmime/)
9.  [UrlScan](https://www.archlinux.org/packages/community/any/urlscan/)
10. [W3m](https://www.archlinux.org/packages/extra/x86_64/w3m/)
11. [Gpgme](https://www.archlinux.org/packages/core/x86_64/gpgme/)

## Yukarıda programlar ne işe yarar ?

- **mbsync** : birden çok IMAP hesaplarını yerel makine (local) de senkronize eder.
- **msmtp** : e-posta göndermenizi sağlar 😁
- **mu** : e-postanızlarınızı indexler ve tüm e-postalarınız için bir arama arayüzü sağlar
- **vim** : Eposta yazmak için editör,türevlerinide kullanabilirsiniz. Ben neovim kullanıyorum.
- ve son olarak: **neomutt** mail clientimiz. 😇

Yukarıda ki programlar mail alıp gönderebilmemiz için gerekli uygulamalardır. Mail içerisinde eklere bakmak, kişileri görmek vb gibi işlevleri ise aşağıda ki uygulamalarla yapıyoruz.

- **vdirsyncer** : Kişilerinizi senkronize eder.
- **khard** : vdirsyncer'den senkronize edilmiş kişileri neomutt içerisinde kullanılabilir hale getirir.
- **ripmime** : E-posta eklerini kaydetmeye yarar
- **urlscan** : Tercih ettiğiniz tarayıcıda url(adresleri) açar
- **w3m** : HTML e-postalarını mutt içinde okunabilir hale getirmek için kullanılır
- **gpgme** : E-postaları şifrelemek için kullanılır.

## Kurulum

Yukarıda ki paketleri kendi dağıtımına göre kurun. Arch Linux Kullananlar için kolaylık sağlayalım 🤣

```shell
yay -S msmtp msmtp-mta isync mu-git neovim neomutt-git vdirsyncer-git khard ripmime urlscan w3m gpgme

```

Klasör yapımızı oluşturalım. Ben anadizinde klasör kalabağılını sevmediğim için gizli dosya olarak oluşturuyorum. Burası keyfinize kalmış 😀 Dikkat etmeniz gereken klasör isimlerine **Türkçe** karekterler koymamaya çalışın.(ç, ı, ü, ğ, ö, ş, İ, Ğ, Ü, Ö, Ş, Ç)

- Bu süreçte bizi en çok uğraştıracak olan gmail dir. Aldığı güvenlik önlemleri çeşitli ayarlar yaparak geçmeye çalışacağız. Gmail konusunda sorun yaşarsanız yorumlayın çözmeye çalışalım.

```shell
mkdir .Contacts
mkdir .Mail
mkdir .Mail/ytoluyagmail
mkdir .Mail/ytoluyagyandex
mkdir .Mail/yuceltoluyaghotmail
```

Ana dizinimize bir dosya daha oluşturuyoruz.

```shell
touch ~/.mbsyncrc

```

- Bu dosyada e-posta hesaplarımızı IMAP üzerinden senkronize edilecek şekilde yapılandıracağız. Örnek olarak :

```shell
#################################
######## Gmail Hesabım ########
#################################

IMAPAccount gmail
Host imap.gmail.com
User ytoluyag@gmail.com
#PassCmd "security find-internet-password -s 'imap.gmail.com' -a 'ytoluyag@gmail.com' -w"
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

#################################
######## Hotmail Hesabım ############
#################################

IMAPAccount yuceltoluyag
Host outlook.office365.com
User yuceltoluyag@hotmail.com.tr
Pass ""
SSLType IMAPS
SSLVersions TLSv1.2
AuthMechs PLAIN
CertificateFile /etc/ssl/certs/ca-certificates.crt

# Remote storage

IMAPStore yuceltoluyag-remote
Account yuceltoluyag

# Local storage

MaildirStore yuceltoluyag-local
Path ~/.Mail/yuceltoluyaghotmail/
Inbox ~/.Mail/yuceltoluyaghotmail/INBOX

Channel yuceltoluyag-inbox
Master :yuceltoluyag-remote:"+INBOX"
Slave :yuceltoluyag-local:INBOX
Create Both
Expunge Both

Channel yuceltoluyag-drafts
Master :yuceltoluyag-remote:"Drafts"
Slave :yuceltoluyag-local:drafts
Create Both
Expunge Both

Channel yuceltoluyag-sent
Master :yuceltoluyag-remote:"Sent"
Slave :yuceltoluyag-local:sent
Create Both
Expunge Both

Channel yuceltoluyag-trash
Master :yuceltoluyag-remote:"deleted"
Slave :yuceltoluyag-local:trash
Create Both
Expunge Both

Channel yuceltoluyag-junk
Master :yuceltoluyag-remote:"Junk"
Slave :yuceltoluyag-local:junk
Create Both
Expunge Both

Group yuceltoluyag
Channel yuceltoluyag-inbox
Channel yuceltoluyag-drafts
Channel yuceltoluyag-sent
Channel yuceltoluyag-trash
Channel yuceltoluyag-junk
```

Burada ilgili mailleri oluşturduğunuz klasörlere yönlendirdik. Remote ve local olayı ise ; Mail içerisinde ki kategorilerin uzantıları, örneğin gmail içerisinde spam kategorisine tıkladığınızda **trash** linkine yönlendirir. Remote kısmına farklı birşey yazarsanız spam mailleri **çekmeyecektir**. Bu yüzden **remote** kısmı **önemlidir**.

PassCmd kısmı ise şifreleri yazdığımız alandır.

```shell
#PassCmd "security find-internet-password -s 'imap.gmail.com' -a 'ytoluyag@gmail.com' -w"
PassCmd "/usr/bin/gpg2 -q --for-your-eyes-only --no-tty -d ~/.password-store/ytoluyag.gpg"

```

'#' ile yorum satırı içerisine aldığım kısmıda kullanabilirsiniz. Güvenli olması açısından gpg ile şifreleyip açıyorum. (Seçim sizin)

Ana dizine bir dosya daha oluşturuyoruz.

```shell
touch ~/.msmtprc
```

Bu dosya içerisinde ise mail bağlantı ayarlarını yapıyoruz. Kullandığınız mail bağlantısınız imap,port,ssl vb gibi adreslemelerinin ne olduğunu bilmiyorsanız :

- [Gmail İMAP](https://support.google.com/mail/answer/7126229?hl=tr)
- [Yandex İMAP](https://yandex.com.tr/support/mail/mail-clients.html)
- [Hotmail İMAP](https://support.office.com/tr-tr/article/outlook-com-i%C3%A7in-pop-imap-ve-smtp-ayarlar%C4%B1-d088b986-291d-42b8-9564-9c414e2aa040)

```shell
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

Bu ayarları test edelim.

```shell
echo "Mail Test Ediyoruz" | msmtp -a ytoluyagmail ytoluyag@gmail.com
```

ytoluyagmail : yukarıda oluşturduğumuz dizin ismi ve account ismimiz. Eğer ki bir hata oluşursa çözümde sunuyor :) En çok karşılaşılan problem, google'nin iki faktörlü uygulamasını kullanmayanlarda ve kullananlarda ortaya çıkıyor 😕

## Nasıl yani ?

Şöyle ki üçüncü parti uygulamalara izin verseniz dahi , güvenlik zaafiyeti oluşturacağından dolayı google amca bu olaya sıcak bakmıyor. Önce iki faktörlü doğrulamayı aç daha sonra uygulama şifresi kullan diyor. Bu kombinasyonda uygulamalarını kullanman daha sağlıklı olur diyor 😃 Bunlardan birisini yapmadığında sürekli telefona yada mailinize "zaafiyet bulundu zaafiyet bulundu" gibi bildirimler yapmakta 🤣 [Google ile uygulama şifresi oluşturma](https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637163232570699931-2394244056&rd=1) adımlarını takip edin. Artık şifre kısmına oluşturduğunuz **uygulama şifresini yazacaksınız.**

![Test Sonucu](/assets/images/uygulama_sifresi_gmail.webp)

Bu işlemden sonra yapmamız gereken

```shell
mbsync -a

```

tüm epostalarımızı senkronize etmek. Bu işlem eposta sayınıza göre biraz zaman alabilir.

![neomutt_senkron](/assets/images/neomutt_senkron.webp)

[2.Bölüm](https://yuceltoluyag.github.io/imap-openssl-terminalde-kullanim/)
