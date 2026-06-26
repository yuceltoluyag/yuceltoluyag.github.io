Title: Git'te Sadece .gitignore'a Mahkum Değilsiniz: Dosya Yok Saymanın 3 Farklı Yolu
Date: 2026-06-26 02:50
Category: Git
Tags: Git, Version Control, Yazılım, Geliştirme Araçları, DevOps
Slug: git-sadece-gitignore-degil-dosya-yok-sayma
Authors: yuceltoluyag
Status: published
Summary: Git'te dosyaları yok saymanın sadece .gitignore ile sınırlı olmadığını biliyor muydunuz? Proje özelinde ve küresel düzeyde dosya yok sayma yöntemleri.
Template: article
Lang: tr
Translation: false

Hafta sonu eski açık kaynaklı projelerimin commit geçmişini temizlerken birden yüzümün kızardığını hissettim. Yıllar önce projede aldığım karalama notlarını, "todo.txt" gibi geçici dosyaları ve sadece kendi bilgisayarımda çalışan debug scriptlerini yanlışlıkla pushlamışım. Takımdaki diğer geliştiricileri rahatsız etmemek adına projenin ortak `.gitignore` dosyasını kendi kişisel notlarımla doldurmak istememiştim ama gün sonunda her şey kabak gibi ortada kalmıştı. Bu durum eminim çoğumuzun başına gelmiştir.

Git ile yıllardır kod yazıp, dosyaları yok saymanın tek yolunun projenin kök dizinine bir `.gitignore` dosyası fırlatmak olduğunu düşünüyorsanız yalnız değilsiniz. Ancak Git bize dosyaları yok saymak[^1] için üç farklı seviye sunuyor:

1.  Proje ile paylaşılan seviye: `.gitignore`
2.  Proje özelinde ama yerel (paylaşılmayan) seviye: `.git/info/exclude`
3.  Bilgisayar genelinde (küresel) seviye: `~/.config/git/ignore`

Ortak bir `.gitignore` dosyasını sadece kendi bilgisayarımızdaki geçici dosyalarla kirletmek, apartmanın ortak giriş kapısına kendi özel ayakkabılığımızı kurmaya benzer. İşte bu yüzden dostum, bugün Git'in sunduğu bu gizli bölmeleri ve hangi dosyayı nerede saklamamız gerektiğini konuşacağız.

---

## 📂 1. Klasik Yöntem: `.gitignore`

Hepimizin bildiği, projenin kök dizininde yaşayan o meşhur dosya. Bu dosya Git geçmişine dahil edilir, commit edilir ve repoyu klonlayan herkesle paylaşılır.

*   **Ne zaman kullanılmalı?** Projedeki tüm geliştiriciler için ortak olan dosyalar için. Örneğin; `node_modules/`, Python'ın `__pycache__/` klasörü, derlenmiş çıktılar (`dist/`, `build/`) veya IDE yapılandırma klasörleri (`.vscode/`, `.idea/`).

!!! note "Önemli Not: Takip Edilen (Tracked) Dosyalar ⚠️"
    Git'in yok sayma kuralları sadece henüz takip edilmeyen (untracked) dosyalar için geçerlidir.[^1] Eğer bir dosyayı daha önce commit ettiyseniz, o dosyayı `.gitignore` veya `exclude` dosyasına ekleseniz bile Git onu izlemeye devam eder. Bu dosyaları takipten çıkarmak için `git rm --cached <dosya_yolu>` komutunu kullanmanız gerekir.

---

## 🔒 2. Proje Özelinde Gizli Yok Sayma: `.git/info/exclude`

Her Git deposunun içinde gizli bir `.git` klasörü yer alır. Bu klasörün altındaki `info/exclude` dosyası, tam olarak o projeye özel ama Git geçmişine **asla dahil edilmeyen** yerel bir yok sayma listesidir.

*   **Ne zaman kullanılmalı?** Sadece sizin kendi iş akışınıza özel olan ve takımdaki diğer insanları ilgilendirmeyen dosyalar için. Örneğin; aldığınız geçici geliştirme notları (`notlar.txt`), test etmek için yazdığınız ama commit etmek istemediğiniz geçici scriptler (`deneme.py`) veya sadece yerel ortamınızda kullandığınız analiz dosyaları.
*   **Nasıl kullanılır?** `.git/info/exclude` dosyasını herhangi bir metin düzenleyiciyle açıp, standart `.gitignore` yazar gibi yok saymak istediğiniz dosya adlarını satır satır eklemeniz yeterlidir.

---

## 🌍 3. Bilgisayar Genelinde Yok Sayma: `~/.config/git/ignore`

İşletim sisteminizde kullanıcı ana dizininin altında (`~/.config/git/ignore`) bulunan bu dosya, bilgisayarınızda açtığınız **tüm Git projelerinde** geçerli olan küresel (global) yok sayma listesidir.

*   **Ne zaman kullanılmalı?** İşletim sisteminin veya kullandığınız editörlerin her projede oluşturduğu çöp dosyalar için. Örneğin; macOS kullanıyorsanız `.DS_Store` dosyaları, Windows'taki `Thumbs.db` dosyaları ya da işletim sistemi düzeyindeki geçici klasörler. Bunları her projenin kendi `.gitignore` dosyasına tek tek yazmak yerine buraya bir kez yazarak ömür boyu kurtulabilirsiniz.
*   **Özel Yol Tanımlama:** Eğer bu küresel dosyayı başka bir konumda (örneğin ana dizinde direkt `.gitignore_global` adıyla) tutmak isterseniz, Git yapılandırma parametresini[^2] şu komutla güncelleyebilirsiniz:

```bash
$ git config --global core.excludesFile ~/.gitignore_global
```

*   Varsayılan ayarlara geri dönmek isterseniz:

```bash
$ git config --global --unset core.excludesFile
```

---

## 🔍 Hangi Dosyanın Nereden Engellendiğini Bulmak

Dosyaları bu üç farklı yere dağıttığımızda, bir süre sonra "Yahu bu dosya neden Git tarafından görünmüyor, hangisi engelliyor?" sorusu akla gelebilir. Git bu kafa karışıklığını gidermek için bize harika bir komut sunuyor: `git check-ignore -v <dosya_yolu>`

Örneğin, projenizde `.DS_Store` dosyasının neden görünmediğini sorgulayalım:

### Senaryo A: Projenin `.gitignore` dosyası engelliyorsa:
```bash
$ git check-ignore -v .DS_Store
.gitignore:1:.DS_Store  .DS_Store
```
*(Çıktıda `.gitignore` dosyasının 1. satırından ötürü engellendiği açıkça yazar).*

### Senaryo B: Projenin yerel `.git/info/exclude` dosyası engelliyorsa:
```bash
$ git check-ignore -v .DS_Store
.git/info/exclude:7:.DS_Store   .DS_Store
```

### Senaryo C: Küresel `~/.config/git/ignore` dosyası engelliyorsa:
```bash
$ git check-ignore -v .DS_Store
/home/yucel/.config/git/ignore:2:.DS_Store  .DS_Store
```

Eğer yazdığınız dosya adı hiçbir kural tarafından engellenmiyorsa, komut geriye hiçbir çıktı dönmez.

Netice itibariyle, Git kullanırken ortak repoları kişisel dosyalarımızla kirletmemek ve "yanlışlıkla pushladım" kazalarının önüne geçmek için bu üç seviyeyi yerli yerinde kullanmak profesyonel bir geliştirici refleksidir.

## 🔗 İlgili Yazılar
- [Git Commit Geri Dönme ve Cherry-Pick](/git-commit-geri-donme-cherry-pick/)
- [Git GPG İmzalı Commit VS Code & Arch Linux](/git-gpg-imzali-commit-vscode-arch/)

[^1]: Git'in henüz takip etmediği (untracked) dosyalar için geçerlidir. Takip edilen (tracked) dosyalar yok sayma listesine eklense bile izlenmeye devam eder.
[^2]: Git'in küresel yok sayma listesi olarak kullanacağı dosya yolunu belirleyen yapılandırma parametresidir.
