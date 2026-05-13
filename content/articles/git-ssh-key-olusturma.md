Title: Git SSH-Key Oluşturma (Windows & Linux)
Date: 2018-09-21 12:00 10:00
Modified: 2025-08-11 22:59
Category: Git
Tags: git,github, ssh
Slug: git-ssh-key-olusturma
Authors: yuceltoluyag
Series: Git
Series_index: 1
Summary: Git üzerinde çalışırken SSH anahtarı oluşturma konusunda yaşanan sorunları gidermek için adım adım Windows ve Linux platformlarında nasıl SSH anahtarı oluşturulacağını anlatıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/git_bash-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982170415333865
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqdwttkpk22

Git üzerinde çalışırken SSH anahtarı oluşturma konusunda sorun yaşayanlar için bu rehberde, Windows ve Linux kullanıcıları için adım adım SSH anahtarı oluşturma sürecini ele alacağız. 🛠️

### Windows İçin SSH-Key Oluşturma

1. Git Bash uygulamasını [https://git-scm.com/downloads](https://git-scm.com/downloads){: target="\_blank" rel="noopener noreferrer"} adresinden indirip yükleyin.
2. Terminali açarak aşağıdaki komutları sırasıyla çalıştırın:

```bash
git config --global user.name "Kullanıcı Adınız"
git config --global user.email "email@adresiniz.com"
ssh-keygen
```

3. Komutları çalıştırdıktan sonra karşınıza çıkan tüm seçeneklerde `Enter` tuşuna basarak devam edin.
4. Anahtar oluşturulduktan sonra `C:\Users\kullanıcıadiniz\.ssh` dizinine giderek `id_rsa.pub` dosyasını Not Defteri ile açın.
5. Dosya içindeki anahtar kodlarını kopyalayın.
6. [GitHub SSH Keys Ayarları](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} sayfasına giderek **New SSH Key** butonuna tıklayın ve kopyaladığınız kodları yapıştırıp kaydedin.

[responsive_img src="/images/git_bash-xl.webp" alt="gitbash" /]

### Linux İçin SSH-Key Oluşturma

1. Git Bash veya terminali açın ve aşağıdaki komutları çalıştırın:

```bash
git config --global user.name "Kullanıcı Adınız"
git config --global user.email "email@adresiniz.com"
ssh-keygen -t rsa -b 4096 -C "email@adresiniz.com"
ssh-add ~/.ssh/id_rsa
```

2. Komutları çalıştırdıktan sonra, gelen tüm seçeneklerde `Enter` tuşuna basarak devam edin.
3. Anahtar oluşturulduktan sonra `~/.ssh/id_rsa.pub` dosyasının içeriğini kopyalayın.
4. [GitHub SSH Keys Ayarları](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} sayfasına giderek **New SSH Key** butonuna tıklayın ve kopyaladığınız kodları yapıştırıp kaydedin.

✅ Artık GitHub üzerinde SSH anahtarınızı kullanarak güvenli bir şekilde işlem yapabilirsiniz!

Bu rehber sayesinde Windows ve Linux kullanıcıları için SSH anahtarı oluşturma sürecini kolayca tamamlayabilirsiniz. 🚀



