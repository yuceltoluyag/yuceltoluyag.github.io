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

Selamlar güzel insanlar, terminal başındaki değerli yoldaşlar! ⚡

Yazılım geliştirirken hepimizin başına gelmiştir: Bazen gecenin bir yarısı kahve-sigara eşliğinde kod yazarken, bazen de panik halinde production bug'ı çözmeye çalışırken öyle bir commit atarız ki, saniyeler sonra *"Ben ne yaptım hacı, sistem gitti!"* diye soğuk terler dökmeye başlarız. İşte tam bu anlarda, Git bizim için sadece bir versiyon kontrol aracı değil, adeta hayat kurtaran bir zaman makinesidir.

Özellikle sisteminde hata toleransı sıfır olan ve her şeyi bizzat terminalden yönetmeyi seven bir Arch Linux paronoyağı olarak, Git'in geri alma mekanizmaları benim en güvenli limanımdır. 

Bu yazıda, yaptığınız hatalardan tereyağından kıl çeker gibi sıyrılmanızı sağlayacak o meşhur zaman yolculuğu komutlarını (`git reset`, `git checkout`, `git revert`) ve sepetteki en güzel çileği seçer gibi sadece istediğimiz commit'i almaya yarayan o gizli silahı, yani `git cherry-pick` komutunu bizzat tecrübe ettiğim pratik senaryolarla anlatıyorum. Çayları tazeleyin, terminali açın; zamanda geriye gidiyoruz! 🕰️

---

## Commit'e Geri Dönme Yöntemleri 🔄

Hatalı bir yola saptığımızda, Git bize durumun ciddiyetine göre üç farklı geri dönüş kapısı aralar. Hangi kapıdan gireceğinizi iyi seçin, çünkü bazılarının geri dönüşü yoktur!

### 1. Geçici Olarak Geri Dönmek (Detached HEAD Modu)

Eğer projenin geçmişindeki belirli bir commit'e gidip *"Ulan o gün ne yazmıştım ben?"* diye sadece göz atmak istiyorsanız, bu zararsız yöntemi kullanabilirsiniz:

```bash
git checkout 86d538b
```

Bu komut projeyi o commit'in olduğu zamana götürür ama sizi **detached HEAD** moduna sokar. Yani burada yapacağınız değişiklikler havada asılı kalır.

!!! tip "İpucu ⚡ Eğer o eski commit'in üzerinden yeni bir şeyler geliştirmek isterseniz, detached HEAD modundayken hemen yeni bir branch açarak yolunuza devam edebilirsiniz: `git checkout -b eski-versiyon-kurtarma`"

---

### 2. Kalıcı Olarak Geri Dönmek (`git reset --hard`)

İşte burası en tehlikeli, en keskin viraj. Sanki yanlış minibüse bindiğini fark edip panikle şoföre *"Kaptan, müsait yerde dur, her şeyi iptal et!"* diye bağırmak gibidir. Geçmişi tamamen siler ve projeyi o commit'e geri döndürür:

```bash
git reset --hard 86d538b
```

!!! danger "Kritik Uyarı! `git reset --hard` komutunu çalıştırdığınız an, o commit'ten sonra yazdığınız tüm kodlar, kaydedilmeyen tüm değişiklikler kalıcı olarak tarihe gömülür. Eğer bu değişiklikleri uzak sunucuya (`git push`) gönderdiyseniz, sunucuyu da zorlamak zorunda kalırsınız: `git push --force`."

Ekip çalışması yapıyorsanız, `git push --force` komutunu atmadan önce mutlaka çalışma arkadaşlarınızı uyarın hacı, yoksa sabah ofise geldiğinizde çay ocağında sizi bekleyen gergin bakışlarla karşılaşabilirsiniz.

---

### 3. Tarihi Bozmadan Hata Düzeltmek (`git revert`)

Eğer ekip halinde ortak bir depoda çalışıyorsanız ve geçmişi silmeden, sadece belirli bir hatalı commit'in yaptığı değişiklikleri tersine çevirmek istiyorsanız en medeni yöntem budur:

```bash
git revert 86d538b
```

Bu komut, o hatalı commit'in yaptığı işlerin tam tersini yapan **yeni bir düzeltme commit'i** oluşturur. Geçmiş bozulmaz, çakışma yaşanmaz ve herkes huzur içinde kodlamaya devam eder. Makarna-yoğurt samimiyetinde, en güvenli yoldur. ✅

---

## `git cherry-pick` Kullanımı (Cazip Meyve Seçimi) 🍒

Geldik Git'in en estetik, en keyifli komutuna. `git cherry-pick`, adından da anlaşılacağı gibi, koca bir branch'in tamamını birleştirmek yerine, oradaki en güzel, en cazip tek bir commit'i (kirazı) cımbızla çekip kendi bulunduğunuz branch'e eklemenizi sağlar.

Örneğin, `development` branch'inde yazdığınız 5 commit'lik bir özelliğin sadece 1 commit'lik kritik bug fix kısmını acilen `main` (production) branch'ine taşımanız gerektiğinde bu komut tam bir can kurtarandır.

### 1. Tek Bir Commit'i Taşımak

Diyelim ki `main` branch'indesiniz ve başka bir branch'teki `86d538b` hash'li commit'i buraya kopyalamak istiyorsunuz:

```bash
git cherry-pick 86d538b
```

Bu işlem, o spesifik commit'i adeta kopyalayıp şu anki branch'inizin en tepesine yepyeni bir commit olarak ekler.

### 2. Birden Fazla Commit'i Seçerek Taşımak

Eğer birden fazla bağımsız commit'i taşımak istiyorsanız, hash değerlerini aralarında boşluk bırakarak sıralayabilirsiniz:

```bash
git cherry-pick 86d538b 12a4ef9 f45c8d7
```

### 3. Belirli Bir Commit Aralığını Taşımak

Belirli bir tarihsel aralıktaki tüm commit'leri peş peşe taşımak istiyorsanız:

```bash
git cherry-pick 86d538b..f45c8d7
```

Bu komut, `86d538b` commit'inden sonraki tüm commit'leri (dahil değil) `f45c8d7` commit'ine kadar (dahil) sırayla mevcut branch'e uygular.

---

## 💥 Çatışma (Conflict) Durumunda Ne Yapmalıyım?

Tabii ki her zaman işler tereyağından kıl çeker gibi gitmez. Bazen cherry-pick yaparken dosyalar çakışır ve Git size *"Hacı bura çok karıştı, bi el at"* diyerek işlemi durdurur. Panik yok!

1. `git status` yazarak hangi dosyalarda çakışma olduğunu görün.
2. Editörünüzle dosyaları açıp çakışmaları manuel olarak temizleyin.
3. Çakışan dosyaları `git add <dosya>` ile tekrar sahneye ekleyin.
4. cherry-pick işlemini tamamlamak için şu komutla devam edin:

```bash
git cherry-pick --continue
```

Eğer işler içinden çıkılmaz bir hal alırsa ve *"Bırak kalsın usta, eski haline dönsün"* demek isterseniz, şu komutla işlemi tamamen iptal edip güvenli limana dönebilirsiniz:

```bash
git cherry-pick --abort
```

---

## 🎯 Sonuç ve Friday13 Özeti

Git üzerinde zamanda yolculuk yapmak göründüğü kadar korkutucu değildir dostlar. Özetle:

- Sadece incelemek için `git checkout`
- Geçmişi tamamen yakıp küle çevirmek için `git reset --hard` (dikkatli olun!)
- Medenice hatayı düzeltmek için `git revert`
- Branch'leri birleştirmeden cımbızla commit çekmek için `git cherry-pick`

Kafanıza takılan bir çakışma hatası veya Git üzerinde yaşadığınız garip bir durum olursa yorumlarda buluşalım, terminalin gücü adına beraber çözeriz! 😉

[responsive_img src="/images/git-chery-xl.webp" alt="git-commit-geri-donme-cherry-pick" /]




