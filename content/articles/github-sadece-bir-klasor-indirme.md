Title: GitHub'dan Sadece Belirli Bir Klasörü İndirme: Sparse Checkout
Date: 2025-10-27 03:15
Category: Git
Tags: git, github, sparse-checkout, linux, rehber
Slug: github-sadece-bir-klasor-indirme
Authors: yuceltoluyag
Status: published
Summary: GitHub reposunun tamamını değil, sadece belirli bir klasörünü indir. Sparse checkout yöntemi ile zaman ve disk alanı tasarrufu sağla.
Template: article
Series: Git
Series_index: 9
Lang: tr
Translation: false
Image: images/git-sparse-checkout-rehberi-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115487292715622222
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57k66a4fc2d


## Giriş

Bazı projelerde GitHub’daki bir repository’nin tamamını indirmek yerine **sadece belirli bir klasöre** ihtiyaç duyarsınız.
Örneğin büyük bir proje içinden sadece tasarım dosyalarını almak isteyebilirsiniz. Bu rehberde **Git Sparse Checkout** yöntemi ile bunu nasıl yapacağını adım adım göstereceğiz ⚡

Bu rehberin sonunda:

- Sadece istediğiniz klasörü indirebileceksiniz,
- Gereksiz dosyalardan kurtulup zaman ve disk alanı tasarrufu sağlayacaksınız,
- Arch Linux ve diğer Linux dağıtımlarında kolayca uygulayabileceksiniz.

---

## Sparse Checkout Nedir?

**Git Sparse Checkout**, bir Git deposunun tamamını değil sadece belirli dosya veya klasörlerini çalışma dizinine çekmeye yarayan bir özelliktir.

### Avantajları

- Büyük repolarda indirme süresini azaltır,
- Disk alanı tasarrufu sağlar,
- Gereksiz dosyalarla uğraşmak zorunda kalmazsınız.

---

## Adım Adım Uygulama

### 1️⃣ Yeni Bir Klasör Oluştur ve Git Başlat

```bash
mkdir pico-v2 && cd pico-v2
git init
```

### 2️⃣ Uzak Repo’yu Ekleyin

```bash
git remote add origin https://github.com/picocss/examples.git
```

### 3️⃣ Sparse Checkout'u Etkinleştir

```bash
git config core.sparseCheckout true
```

### 4️⃣ İndirmek İstediğiniz Klasörü Belirtin

```bash
echo "v2-sass-customized-design-system/" >> .git/info/sparse-checkout
```

!!! tip "Dikkat 💡 Klasör yolu repository kök dizinine göre yazılmalıdır."

### 5️⃣ Sadece İlgili Klasörü İndir

```bash
git pull origin master
```

!!! warning "Branch kontrolü ⚠️ Eğer repo `main` branch kullanıyorsa `git pull origin main` kullanmalısınız."

---

## Sonuç

Artık sadece ihtiyacınız olan klasör indirildi:

```
pico-v2/v2-sass-customized-design-system/
```

### Özet

- GitHub reposunun tamamını indirmeden sadece belirli klasörleri çekebilirsiniz.
- Sparse checkout, büyük projelerde zaman ve disk tasarrufu sağlar.
- Linux üzerinde kolayca uygulanabilir ⚡

---

## Kaynaklar

- [GitHub Repository](https://github.com/picocss/examples){: target="\_blank" rel="noopener noreferrer"}
- [Git Sparse Checkout Documentation](https://git-scm.com/docs/git-sparse-checkout){: target="\_blank" rel="noopener noreferrer"}

Bu özellik gitlab ui'inde var,github ui'inde neden yok acaba? 🤔

[responsive_img src="/images/git-sparse-checkout-rehberi-xl.webp" alt="Git Sparse Kullanımı" /]



