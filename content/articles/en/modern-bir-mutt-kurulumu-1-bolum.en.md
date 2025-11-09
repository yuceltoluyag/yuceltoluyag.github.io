Title: Modern Mutt Setup Part 1
Date: 2020-02-03 12:00 10:00
Modified: 2025-08-11 22:59
Category: Linux
Tags: linux, e-mail
Slug: modern-bir-mutt-kurulumu-1-bolum
Authors: yuceltoluyag
Series: mutt
Series_index: 1
Summary: We explain step by step how to set up a modern mutt with Neomutt, mbsync, msmtp and mu.
Status: published
Template: article
Image: images/neomutt_senkron-xl.webp
Lang: en

Hello! In the first part of this article, we will configure our Mutt settings, which is a great email client. 😊

## Required Software

The following software is required to use mutt:

1. [Mbsync/isync](https://wiki.archlinux.org/index.php/Isync#Installing){: target="\_blank" rel="noopener noreferrer"}
2. [Msmtp](https://wiki.archlinux.org/index.php/Msmtp){: target="\_blank" rel="noopener noreferrer"}
3. [Mu](https://aur.archlinux.org/packages/mu/){: target="\_blank" rel="noopener noreferrer"}
4. Vim or derivatives
5. [NeoMutt](https://www.archlinux.org/packages/community/x86_64/neomutt/){: target="\_blank" rel="noopener noreferrer"}
6. [Vdirsyncer](https://aur.archlinux.org/packages/vdirsyncer-git/){: target="\_blank" rel="noopener noreferrer"}
7. [Khard](https://www.archlinux.org/packages/community/any/khard/){: target="\_blank" rel="noopener noreferrer"}
8. [Ripmime](https://aur.archlinux.org/packages/ripmime/){: target="\_blank" rel="noopener noreferrer"}
9. [UrlScan](https://www.archlinux.org/packages/community/any/urlscan/){: target="\_blank" rel="noopener noreferrer"}
10. [W3m](https://www.archlinux.org/packages/extra/x86_64/w3m/){: target="\_blank" rel="noopener noreferrer"}
11. [Gpgme](https://www.archlinux.org/packages/core/x86_64/gpgme/){: target="\_blank" rel="noopener noreferrer"}

## What Do the Above Programs Do?

- **mbsync**: Synchronizes multiple IMAP accounts on your local machine.
- **msmtp**: Allows you to send emails. 😁
- **mu**: Indexes your emails and provides a search interface for all your emails.
- **vim**: Editor used for writing emails. I use Neovim.
- **neomutt**: Our email client. 😇

The above software are the tools required for us to receive and send emails. For operations such as viewing attachments in emails, examining contacts, we use the following tools:

- **vdirsyncer**: Synchronizes your contacts.
- **khard**: Makes contacts synchronized with Vdirsyncer available in neomutt.
- **ripmime**: Used to save email attachments.
- **urlscan**: Opens URLs in your preferred browser.
- **w3m**: Makes HTML emails readable within mutt.
- **gpgme**: Used to encrypt emails.

## Installation

You can install the above packages according to your own distribution. For the convenience of Arch Linux users, you can install all packages with the following command. 🤣

```bash
yay -S msmtp msmtp-mta isync mu-git neovim neomutt-git vdirsyncer-git khard ripmime urlscan w3m gpgme
```

Let's create our folder structure. Since I don't like the folder structure in the home directory, I create it as hidden files. This is completely up to your preference. 😀 The point you need to pay attention to: **Avoid using Turkish characters** (ç, ı, ü, ğ, ö, ş, İ, Ğ, Ü, Ö, Ş, Ç).

We should also pay attention to potential problems with Gmail. Due to the security measures taken by Gmail, we may need to make some settings. If you encounter a problem with Gmail, let's try to find a solution by specifying it in the comments.

```bash
mkdir .Contacts
mkdir .Mail
mkdir .Mail/ytoluyagmail
mkdir .Mail/ytoluyagyandex
mkdir .Mail/yuceltoluyaghotmail
```

Let's create another file in the home directory:

```bash
touch ~/.mbsyncrc
```

In this file, we will configure our email accounts to be synchronized via IMAP. For example, for our Gmail account:

```bash
#################################
######## My Gmail Account ########
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

Here, we directed the relevant emails to the folders you created. **Remote** and **local** concepts: They are the extensions of your emails. For example, when you click on the Spam folder in Gmail, it redirects to the **trash** link. The remote part is very important.

You can configure the password part as follows:

```bash
#PassCmd "security find-internet-password -s 'imap.gmail.com' -a 'ytoluyag@gmail.com' -w"
PassCmd "/usr/bin/gpg2 -q --for-your-eyes-only --no-tty -d ~/.password-store/ytoluyag.gpg"
```

Now, let's create another file:

```bash
touch ~/.msmtprc
```

In this file, we make mail connection settings. If you don't know the information such as imap, port, ssl of your mail connection, you can look at the following resources:

- [Gmail IMAP Settings](https://support.google.com/mail/answer/7126229?hl=en){: target="\_blank" rel="noopener noreferrer"}
- [Yandex IMAP Settings](https://yandex.com/support/mail/mail-clients.html){: target="\_blank" rel="noopener noreferrer"}
- [Hotmail IMAP Settings](https://support.office.com/en-us/article/pop-and-imap-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040){: target="\_blank" rel="noopener noreferrer"}

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

Let's test these settings:

```bash
echo "Testing Mail" | msmtp -a ytoluyagmail ytoluyag@gmail.com
```

[responsive_img src="/images/uygulama_sifresi_gmail-xl.webp" alt="Test Result" /]
If you get an error, you can review again for the solution. You should especially consider Gmail's two-factor authentication requirements.

If your connection is successful, let's start Muttr.

```bash
neomutt
```

Here, you may need to correct the error logs you will see. If you are getting an error, you can review your file again.

```bash
mbsync -a
```

[responsive_img src="/images/neomutt_senkron-xl.webp" alt="neomutt_senkron" /]
In [Part 2](/imap-sunucusuna-openssl-kullanarak-terminal-ile-erisin){: target="\_blank" rel="noopener noreferrer"} of this article series, we will continue configuring your email client in more detail. 🙂
