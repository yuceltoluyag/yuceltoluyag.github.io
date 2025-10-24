Title: Git ile GPG İmzalı Etiket Oluşturma ve Sorun Giderme  
Date: 2025-03-03 10:00 10:00
Modified: 2025-08-11 22:59
Category: Git  
Tags: git, gpg, imzalama, etiketleme, güvenlik  
Slug: git-gpg-imzali-etiket  
Authors: yuceltoluyag  
Series: Git
Series_index: 4
Summary: Git ile GPG imzalı etiket oluşturmayı ve karşılaşılabilecek sorunları nasıl çözeceğinizi öğrenin.  
Translation: false  
Status: published  
Template: article  
Image: images/git-gpg-imzali-etiket-xl.webp

# Git ile GPG İmzalı Etiket Oluşturma ve Sorun Giderme 🔐

Geliştirme sürecinde **Git etiketleri**, belirli versiyonları işaretlemek için kullanılan önemli bir özelliktir. Ancak, bu etiketleri **GPG ile imzalamak**, sürümünüzün güvenilirliğini artırır ve yetkisiz değişikliklerin önüne geçer. Bu makalede, **Git ile GPG imzalı etiket oluşturma** sürecini ve karşılaşılabilecek olası hataları nasıl giderebileceğinizi anlatacağız. 🚀

## 1️⃣ GPG Anahtarınızı Oluşturun

Eğer daha önce bir GPG anahtarınız yoksa, aşağıdaki komut ile yeni bir anahtar oluşturabilirsiniz:

```bash
gpg --full-generate-key
```

Anahtar oluşturulduktan sonra, ID’nizi öğrenmek için şu komutu kullanabilirsiniz:

```bash
gpg --list-secret-keys --keyid-format LONG
```

Bu komut, anahtarınızın detaylarını gösterecektir. Çıktıda **sec** etiketi altında bulunan uzun anahtar ID'sini not edin. Örneğin:

```plaintext
sec   rsa4096/8416A43957C19627 2022-04-25 [SC] [expires: 2025-08-23]
```

Burada **8416A43957C19627** kısmı sizin **anahtar ID'nizdir**.

## 2️⃣ Git’i GPG ile Yapılandırın

Git’in **GPG anahtarınızı** kullanmasını sağlamak için aşağıdaki komutu çalıştırın:

```bash
git config --global user.signingkey 8416A43957C19627
```

Ayrıca, Git commit'lerinizi varsayılan olarak imzalamak isterseniz şu komutu çalıştırabilirsiniz:

```bash
git config --global commit.gpgsign true
```

## 3️⃣ İmzalı Git Etiketi Oluşturun ✍️

GPG anahtarınızı Git'e tanıttıktan sonra, aşağıdaki komut ile imzalı bir etiket oluşturabilirsiniz:

```bash
git tag -s 0.0.3 -m "Versiyon 0.0.3' by Jekyll"
```

**Mevcut etiketleri görmek için:**

```bash
git tag
```

**Bir etiketi doğrulamak için:**

```bash
git tag -v 0.0.3
```

## 4️⃣ Etiketi Uzak Depoya Gönderin ☁️

İmzalı etiketinizi GitHub veya başka bir uzak depoya göndermek için şu komutu kullanabilirsiniz:

```bash
git push origin 0.0.3
```

Tüm etiketleri birden göndermek isterseniz:

```bash
git push --tags
```

## 5️⃣ Windows Terminal ve Git Bash GPG Sorunları 🔍

Eğer **Windows Terminal** veya **Git Bash** kullanıyorsanız ve GPG anahtarınız birinde çalışırken diğerinde görünmüyorsa, bu ortam değişkenleri ile ilgili olabilir.

### 🔧 Çözüm:

1. Git Bash'de **ev dizininizi** kontrol edin:

```bash
  echo $HOME
```

2. Windows Terminal'de kullanıcı profilinizi kontrol edin:

```bash
  echo %USERPROFILE%
```

**İki dizinin aynı olduğundan emin olun!**

3. Windows Terminal’de şu ortam değişkenini ayarlayın:

```bash
  set GNUPGHOME=C:\Users\yucel\.gnupg
```

4. GPG anahtarınızı içe aktarın:

```bash
  gpg --import C:\Users\yucel\.gnupg\my-private-key.asc
```

5. Anahtarınızı Git’e tekrar tanıtın:

```bash
  git config --global user.signingkey 8416A43957C19627
```

6. Şimdi tekrar kontrol edin:

```bash
  gpg --list-secret-keys --keyid-format LONG
```

Eğer çıktı boş geliyorsa, **GPG'nin sistem genelinde kurulu olup olmadığını** kontrol edin.

## 🎯 Sonuç

Bu adımları takip ederek **GPG ile imzalı Git etiketleri oluşturabilir**, etiketlerinizi güvenle paylaşabilir ve **Windows Terminal & Git Bash arasındaki GPG sorunlarını çözebilirsiniz**. 🔥

GPG imzaları, **açık kaynak projelerinde, güvenlik gerektiren kurumsal projelerde ve hassas geliştirme süreçlerinde** büyük önem taşır. Kullanmayı alışkanlık haline getirin! ✅

---

📌 **Ekstra Bilgi**: Eğer GPG anahtarınızı kaybederseniz, yeni bir anahtar oluşturmanız ve projelerde bu yeni anahtarı kullanmaya başlamanız gerekir. **Eski anahtarınızı iptal etmeyi unutmayın!** 🚨

[responsive_img src="/images/git-gpg-imzali-etiket-xl.webp" alt="git-gpg-imzali-etiket" /]
