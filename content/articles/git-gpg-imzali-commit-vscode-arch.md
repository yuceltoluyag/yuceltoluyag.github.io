Title: VSCode’da GPG Şifre Ekranı Çalışmıyor mu? İşte Çözümü 🚀
Date: 2025-08-27 21:30
Category: Git
Tags: git, gpg, vscode, archlinux, i3wm, ssh, commit, imzalı commit
Slug: git-gpg-imzali-commit-vscode-arch
Authors: yuceltoluyag
Status: published
Summary: VSCode terminalinde GPG anahtarıyla imzalı commit atarken yaşanan tuş algılama sorunlarını nasıl çözeceğinizi, Arch Linux ve i3wm üzerinde adım adım açıklıyoruz. Özellikle AI eklentileriyle birlikte çalışırken yaşanan pinentry problemlerine odaklanıyoruz.
Series: Git
Series_index: 8
Template: article
Image: images/git-gpg-imzali-commit-vscode-arch-xl.webp

# VSCode ve Arch Linux Üzerinde GPG İmzalı Commit Sorunlarını Çözme Rehberi

GPG anahtarıyla commit imzalamak, Git dünyasında güvenliğinizi ve güvenilirliğinizi artırmanın en önemli yollarından biri. Ancak Arch Linux üzerinde i3wm gibi minimalist bir pencere yöneticisi kullanırken ve işi VSCode terminalinden yürütmeye çalışırken bazı özel sorunlarla karşılaşabilirsiniz. Özellikle de VSCode içinde herhangi bir AI eklentisi aktifken commit atmak istediğinizde şifre ekranı doğru çalışmayabiliyor. Rakamlar veya bazı tuşlar basılmıyor gibi davranıyor; defalarca bastığınız halde algılanmıyor. 🙄

Bu yazıda, tam da bu senaryoda yaşanan sorunu nasıl çözdüğümü, neden kaynaklandığını ve en iyi çözümü adım adım anlatacağım. Amacım, "ya bu şifre neden girmiyor!" sinir krizinden çıkıp güvenle imzalı commit atabildiğiniz bir sürece ulaşmanıza yardımcı olmak. 🚀

---

## 1. İmzalı Commit Neden Önemli?

Git commit’lerinizi GPG ile imzalamak, yaptığınız değişikliklerin gerçekten size ait olduğunu kanıtlar. Projelerde güvenilirlik sağlar ve özellikle açık kaynak dünyasında "kim yazdı bu kodu?" sorusunu ortadan kaldırır.

!!! note "Önemli : GitHub ve GitLab gibi platformlar, imzalı commit’leri otomatik olarak doğrular ve “Verified" etiketiyle işaretler. Bu, güvenilirliğinizi artırır."

---

## 2. Sorun Nereden Kaynaklanıyor?

Normalde `pinentry-curses` ya da `pinentry-tty` gibi terminal tabanlı giriş yöntemleri şifre sorarken düzgün çalışır. Ama işin içine VSCode’un entegre terminali ve özellikle AI eklentileri (örneğin kod tamamlama veya yardımcı asistanlar) girince işler karışıyor. Terminalin tuş yakalama mekanizması bozuluyor, bazı rakamlar defalarca basmanıza rağmen algılanmıyor. Sonuç: şifreyi bir türlü doğru giremiyorsunuz.

### Örnek durum

```bash
$ git commit -S -m "Fix bug"
gpg: signing failed: No pinentry
error: gpg failed to sign the data
```

Ya da daha sinir bozucu olanı: Şifre ekranı açılıyor ama tuşlar eksik çalışıyor.

---

## 3. Mevcut Pinentry Programlarını Kontrol Etmek

Arch Linux’ta `pinentry` paketini kurduğunuzda aslında birçok farklı sürüm gelir:

```bash
pacman -Ql pinentry | grep bin/
```

Çıktısı genellikle şu şekildedir:

```
/usr/bin/pinentry
/usr/bin/pinentry-curses
/usr/bin/pinentry-emacs
/usr/bin/pinentry-gnome3
/usr/bin/pinentry-gtk
/usr/bin/pinentry-qt
/usr/bin/pinentry-qt5
/usr/bin/pinentry-tty
```

Yani elimizde terminal tabanlı (`curses`, `tty`), GUI tabanlı (`gtk`, `qt`, `gnome3`) birçok seçenek var.

---

## 4. Çözüm: GUI Pinentry Kullanmak

İşte kritik nokta: Benim sorunum yalnızca VSCode içinde AI çalışırken oluyordu. Normal terminalde her şey yolunda iken, VSCode içinde şifre ekranı resmen bozuluyordu. Bunu aşmanın tek yolu, terminal tabanlı pinentry yerine GUI tabanlı bir çözüm kullanmak oldu.

### Doğru yapılandırma (GUI önerilir):

```ini
# ~/.gnupg/gpg-agent.conf
pinentry-program /usr/bin/pinentry-gtk
default-cache-ttl 43200
max-cache-ttl 43200
```

Sonra agent’i yeniden başlatın:

```bash
gpgconf --kill gpg-agent
```

!!! tip "VSCode + AI kombinasyonunda terminal tabanlı giriş bozuluyorsa, `pinentry-gtk` hayat kurtarıyor. Artık şifreyi eksiksiz ve sorunsuz girebilirsiniz."

---

## 5. Git Config Ayarları

`.gitconfig` dosyanızda aşağıdaki satırların bulunduğundan emin olun:

```ini
[user]
    name = KullanıcıAdınız
    email = mail@example.com
    signingkey = ANAHTAR_ID

[gpg]
    program = gpg

[commit]
    gpgSign = true
```

Anahtar ID’nizi görmek için:

```bash
gpg --list-secret-keys --keyid-format LONG
```

Çıktıdan `sec` satırındaki uzun hex değeri `signingkey` olarak ekleyin.

---

## 6. Commit Atmak ve Push Etmek

Commit aşaması sorunsuz geçtiyse GUI penceresi açılacak ve sizden şifre isteyecektir. Şifreyi girdikten sonra commit başarıyla imzalanır.

Ama unutmayın: commit **lokal** depoya kaydedilir. GitHub’da görünmesi için `push` yapmak gerekir.

```bash
git commit -S -m "Yeni özellik eklendi"
git push origin main
```

!!! warning "Sık yapılan hata: Commit’i attıktan sonra GitHub’da görememek. Bunun nedeni push yapmayı unutmanızdır."

---

## 7. Workflow Önerisi

1. Dosyaları düzenle

```bash
  git add .
```

2. İmzalı commit at

```bash
  git commit -S -m "Fix typo"
```

3. Değişiklikleri GitHub’a gönder

```bash
  git push origin main
```

!!! note "`default-cache-ttl` ayarı sayesinde aynı gün içinde defalarca commit atsanız bile şifreyi her seferinde sormaz."

---

## 8. Sonuç

Artık VSCode üzerinde, Arch Linux + i3wm ortamında GPG imzalı commit atarken karşılaşılan "tuş basmıyor, rakam algılanmıyor" sorununu çözdünüz ✅. Özellikle AI eklentileriyle birlikte çalışırken terminal tabanlı `pinentry` çuvallıyorsa, `pinentry-gtk` sizin için en güvenilir çözüm.

Bundan sonra GitHub’da commitlerinizin yanında gururla duran "Verified" etiketini göreceksiniz. 🎉

[responsive_img src="/images/git-gpg-imzali-commit-vscode-arch-xl.webp" alt="Vscode Şifre Sorunu" /]
