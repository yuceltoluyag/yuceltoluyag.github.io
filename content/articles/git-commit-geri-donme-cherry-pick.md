Title: Git'te Belirli Bir Commit'e Geri Dönme ve Cherry-Pick Kullanımı
Date: 2025-03-28 18:00
Modified: 2025-08-11 22:59
Category: Git
Tags: git, version-control, commit, rollback, cherry-pick
Slug: git-commit-geri-donme-cherry-pick
Authors: yuceltoluyag
Series: Git
Series_index: 5
Summary: Git'te belirli bir commit'e geri dönmek ve git cherry-pick komutuyla seçili değişiklikleri farklı bir branch'e taşımak için kullanabileceğiniz yöntemleri anlatıyoruz. 🚀
Lang: tr
Status: published
Template: article
Image: images/git-chery-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114987704187596338
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvstjdqpsk25

## Git'te Belirli Bir Commit'e Geri Dönme ve Cherry-Pick Kullanımı 🎯

Version kontrol sistemleri, özellikle Git, projelerinizdeki değişiklikleri yönetmek için oldukça güçlü araçlar sunar. **Bazen bir commit'e geri dönmek veya belirli bir commit'in içeriğini farklı bir branch'e taşımak isteyebilirsiniz.** Bu makalede, `git reset`, `git checkout` ve `git cherry-pick` komutlarının nasıl kullanılacağını anlatacağız. 🛠️

## Commit'e Geri Dönme Yöntemleri 🔄

### **1. Geçici Olarak Geri Dönmek (Detached HEAD Modu)**

Eğer sadece belirli bir commit'in içeriğini incelemek istiyorsanız, şu komutu kullanabilirsiniz:

```bash
git checkout 86d538b
```

Bu komut **projenizi o commit'in olduğu duruma getirir** ancak **detached HEAD** modunda çalışırsınız. Eğer bu commit üzerinde çalışmak istiyorsanız yeni bir branch oluşturabilirsiniz:

```bash
git checkout -b eski-versiyon 86d538b
```

### **2. Kalıcı Olarak Geri Dönmek (`git reset`)**

Eğer **geçmişi değiştirerek** tamamen eski bir commit'e geri dönmek istiyorsanız şu komutu kullanabilirsiniz:

```bash
git reset --hard 86d538b
```

Bu komut tüm değişiklikleri **kalıcı olarak** siler ve projeyi o commit'e döndürür. **Dikkat:** Eğer değişiklikleri uzak depoya (`git push`) gönderdiyseniz, bunu zorla güncellemeniz gerekir:

```bash
git push --force
```

⚠️ **Uyarı:** `--force` parametresi, ekibinizle çalışıyorsanız dikkatli kullanılmalıdır.

### **3. Belirli Bir Commit'i Geri Alma (`git revert`)**

Eğer sadece bir commit'in yaptığı değişiklikleri geri almak istiyorsanız:

```bash
git revert 86d538b
```

Bu komut, belirtilen commit'in yaptığı değişiklikleri **tersine çeviren yeni bir commit** oluşturur. **Mevcut geçmiş korunur**, böylece ekip çalışmasında daha güvenlidir. 🤝

---

## `git cherry-pick` Kullanımı 🍒

Bazen, bir branch'teki belirli bir commit'i başka bir branch'e taşımak isteyebilirsiniz. Bunun için `git cherry-pick` komutu kullanılır.

### **1. Tek Bir Commit'i Başka Bir Branch'e Taşımak**

Diyelim ki `feature` branch'indesiniz ve `main` branch'inde bulunan `86d538b` commit'ini almak istiyorsunuz:

```bash
git cherry-pick 86d538b
```

Bu işlem, belirtilen commit'i **şu an bulunduğunuz branch'e ekler**.

### **2. Birden Fazla Commit'i Seçerek Taşımak**

Eğer birden fazla commit'i almak istiyorsanız, aralarına boşluk koyarak şu komutu çalıştırabilirsiniz:

```bash
git cherry-pick 86d538b 12a4ef9 f45c8d7
```

### **3. Belirli Bir Commit Aralığını Seçmek**

Eğer bir commit aralığını almak istiyorsanız:

```bash
git cherry-pick 86d538b..f45c8d7
```

Bu komut, `86d538b` ile `f45c8d7` arasındaki tüm commit'leri alıp mevcut branch'e uygular. 🚀

### **4. Çatışma (Conflict) Durumunda Ne Yapmalıyım?**

Eğer `git cherry-pick` sırasında bir **çakışma (merge conflict)** oluşursa:

1. `git status` komutuyla hangi dosyalarda çakışma olduğunu kontrol edin.
2. Çakışmaları manuel olarak çözün.
3. Çözüm bittikten sonra commit'i tamamlamak için şu komutu çalıştırın:

```bash
  git cherry-pick --continue
```

Eğer işlemi iptal etmek isterseniz:

```bash
git cherry-pick --abort
```

Bu komut, cherry-pick işlemini geri alarak eski haline döndürür.

---

## **Sonuç ✅**

Git'te belirli bir commit'e geri dönmek veya belirli commit'leri farklı branch'lere taşımak için kullanabileceğiniz birçok yöntem vardır. Hangi yöntemin sizin için en uygun olduğunu belirleyerek işlem yapabilirsiniz.

🚀 **Özetle:**

- `git checkout` ile geçici olarak geçmiş commit'e dönebilirsiniz.
- `git reset --hard` ile tamamen geri dönebilirsiniz.
- `git revert` ile sadece belirli bir commit'i geri alabilirsiniz.
- `git cherry-pick` ile belirli commit'leri seçerek farklı bir branch'e taşıyabilirsiniz.

Eğer Git ile ilgili başka sorularınız varsa yorum bırakabilirsiniz! Happy coding! 🎉

[responsive_img src="/images/git-chery-xl.webp" alt="git-commit-geri-donme-cherry-pick" /]



