---
layout: post
title: Git ssh-key oluşturma (windows&linux)
description: Git ssh-key oluşturma (windows&linux)
image: "/assets/images/git_bash.webp"
category: kutuphane
tags: [github, ssh]
comments: false
edit_url: true
toc: true
---

Merhaba git üzerinde çalışırken ssh-key’gen oluşturma ile ilgili sorun yaşayan fatih arkadaşımız nasıl yapılacağı konusunda yardım istemiş 💭 Linux ve Windows Kullanıcıları için ayrı ayrı anlatacağım.

<!-- excerpt separator -->

### Windows İçin

1.  [https://git-scm.com/downloads](https://git-scm.com/downloads){:target="\_blank"}{:rel="noopener noreferrer"} adresinden bash-arayüz programımızı indiriyoruz.

```shell
git config --global user.name "Kullanıcı Adınız"
git config --global user.email email@adresiniz.com
ssh-keygen

```

(kullanıcı adınızı yazdıktan sonra entere basın,mail adresinizi girdikten sonrada entere basın, ssh-key komutundan sonra karşınıza çıkan tüm seçeneklere enter enter diyerek geçin)
![git_bash](/assets/images/git_bash.webp)

Bu şekilde görüntü geldikten sonra C:\Users\kullanıcıadiniz\.ssh dosyasına girip id_rsa.pub isimli dosyayı not defteri yardımıyla açın içerisindeki tüm kodları kopyalayıp, [https://github.com/settings/keys](https://github.com/settings/keys){:target="\_blank"}{:rel="noopener noreferrer"} adresine New SSH Keys butonuna tıklayarak kodları yapıştırın ve kaydedin.

#### Linux İçin

1.  [https://git-scm.com/downloads](https://git-scm.com/downloads){:target="\_blank"}{:rel="noopener noreferrer"} adresinden bash-arayüz programımızı indiriyoruz.

```shell
git config --global user.name "Kullanıcı Adınız"
git config --global user.email email@adresiniz.com
ssh-keygen -t rsa -b 4096 -C"email@adresiniz" #sonra karşınıza çıkan tüm seçeneklere enter enter diyerek geçin
ssh-add ~/.ssh/id_rsa
```

[https://github.com/settings/keys](https://github.com/settings/keys){:target="\_blank"}{:rel="noopener noreferrer"} adresine New SSH Keys butonuna tıklayarak kodları yapıştırın ve kaydedin.
