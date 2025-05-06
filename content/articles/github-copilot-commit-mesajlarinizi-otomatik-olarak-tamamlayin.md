Title: GitHub Copilot ile Commit Mesajlarınızı Otomatik Olarak Tamamlayın: Adım Adım Rehber
Date: 2025-05-03 14:00
Category: kutuphane
Tags: GitHub Copilot, Commit Mesajları, Git, Yazılım Geliştirme, Otomasyon, VS Code, GitHub
Slug: github-copilot-commit-mesajlarinizi-otomatik-olarak-tamamlayin
Authors: yuceltoluyag
Status: Published
Summary: Bu yazıda, GitHub Copilot'ı kullanarak commit mesajlarınızı otomatik olarak nasıl tamamlayabileceğinizi ve yazılım geliştirme sürecini nasıl daha verimli hale getirebileceğinizi adım adım öğreneceksiniz.
Template: article
Image: images/copilot-commit-lg.webp
Series: Git
Series_index: 6




Yazılım geliştirmede sürekli karşılaştığımız bir zorluk var: **anlamlı commit mesajları yazmak**. Hiç düşündünüz mü, bu rutini otomatikleştirebilir misiniz? İyi haber: **GitHub Copilot** artık yaptığınız değişiklikleri analiz edip anlamlı commit mesajları önerebiliyor! 🚀

Bu rehberde, **GitHub Copilot'ın commit mesajlarınızı otomatik tamamlama** özelliğini nasıl en verimli şekilde kullanacağınızı adım adım göstereceğiz. Ekip arkadaşlarınızın gözünde kahraman olacak ve git tarihçeniz hiç olmadığı kadar düzenli olacak!



## Neden GitHub Copilot ile Commit Mesajları Yazmalıyım?

Hiç bir projede dolaşırken "Bu değişiklik neden yapılmış?" diye düşündünüz mü? Ya da kendi yazdığınız commit mesajlarına bakıp "Bu ne anlama geliyor?" diye kafa yordunuz mu? İşte tam burada **GitHub Copilot** devreye giriyor.

**GitHub Copilot ile commit mesajları yazmanın avantajları:**

- ⏱️ **Zaman Tasarrufu**: Değişiklikleri manuel olarak açıklamak yerine yapay zeka bunu sizin için yapıyor
- 🔄 **Tutarlılık**: Tüm ekip üyeleri benzer formatta mesajlar oluşturuyor
- 📝 **Detay**: Yapılan değişikliklerin kapsamlı ve anlaşılır açıklamaları
- 🧠 **Daha Az Zihinsel Yük**: "Ne yazdığımı nasıl açıklasam?" stresinden kurtulun

Ayrıca, yapay zeka destekli bu özellik sayesinde, commit mesajlarınız sadece "değişiklikler yapıldı" gibi anlamsız ifadelerden çok daha profesyonel hale gelecek.

## Kurulum: GitHub Copilot'ı VS Code'a Entegre Etme

GitHub Copilot'ın commit mesajlarınızı tamamlamasını istiyorsanız, önce sisteminize düzgün şekilde kurulması gerekir. İşte VS Code'a GitHub Copilot kurmanın adımları:

### 1. GitHub Copilot Eklentisini Yükleme

1. **VS Code'u açın**
2. Klavyenizden <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> tuşlarına basarak **Extensions** bölümünü açın
3. Arama kutusuna "**GitHub Copilot**" yazın
4. Çıkan sonuçlardan "GitHub Copilot" eklentisini bulun ve "**Install**" butonuna tıklayın
5. İndirme tamamlandıktan sonra yeniden başlatma gerekebilir

### 2. GitHub Hesabınızla Bağlantı Kurun

Kurulum tamamlandıktan sonra:

1. VS Code size bir bildirim gösterecek - "**Sign in to GitHub**" seçeneğine tıklayın
2. Tarayıcınızda GitHub hesabınıza giriş yapın
3. Gerekli izinleri onaylayın
4. VS Code'a geri döndüğünüzde, Copilot'ın aktif olduğunu bildiren bir mesaj göreceksiniz

> **Not**: GitHub Copilot'un ücretsiz sürümü de bulunmaktadır! Ücretsiz sürümde ayda 2,000 tamamlama ve 50 sohbet isteği hakkınız var. Daha fazla kullanım için ücretli plana geçebilirsiniz. Öğrenciyseniz ücretsiz erişim için [GitHub Student Developer Pack](https://education.github.com/pack) başvurusu yapabilirsiniz.



## Özel Kodlama ve Commit Talimatları Oluşturma

GitHub Copilot'ın **sizin stilinize uygun** commit mesajları oluşturması için özel talimatlar tanımlayabilirsiniz. Bu adım isteğe bağlıdır ancak **Copilot'ın verimliliğini önemli ölçüde artırır**.

### 1. Proje Yapılandırma Dosyalarını Oluşturma

İlk olarak, proje klasörünüzde gerekli dizin ve dosyaları oluşturun:

```bash
mkdir -p .vscode docs
touch .vscode/settings.json docs/code-style.md docs/commit-style.md
```

### 2. Kod Üslubunuzu Tanımlayın

`docs/code-style.md` dosyasını açın ve kodlama tercihlerinizi belirtin:

```markdown
# Kod Stili Rehberi

## Genel Kurallar
- Kodu basit ve okunabilir tutun
- Kod biçimlendirmesi için Prettier kullanın

## CSS
- Açıklayıcı ve tutarlı sınıf adları kullanın
- ID yerine class kullanımını tercih edin
- CSS özelliklerini mantıklı gruplar halinde düzenleyin

## JavaScript
- `var` yerine `const` ve `let` kullanın
- Arrow functions tercih edin
- String birleştirmede template literal kullanın
- Her zaman noktalı virgül ekleyin
```

### 3. Commit Mesajı Formatınızı Belirleyin

`docs/commit-style.md` dosyasında tercih ettiğiniz commit mesajı stilini tanımlayın. [Conventional Commits](https://www.conventionalcommits.org/) formatı önerilir:

```markdown
## Commit Mesajı Rehberi

Tüm commit mesajlarımız Conventional Commits formatına uymalıdır:

- `feat: <açıklama>` - Yeni bir özellik eklendiğinde
- `fix: <açıklama>` - Hata düzeltmelerinde
- `docs: <açıklama>` - Dokümantasyon değişikliklerinde
- `style: <açıklama>` - Kod formatı değişikliklerinde
- `refactor: <açıklama>` - Kod yeniden düzenlemelerinde
- `test: <açıklama>` - Test eklemeleri veya güncellemelerinde
- `chore: <açıklama>` - Rutin bakım işlemlerinde

Mesajlar:
- İmperatif (emir) kipinde olmalı
- 50 karakterden kısa olmalı
- Büyük harfle başlamamalı
- Sonunda nokta olmamalı
```

### 4. Ayarları VS Code'a Tanıtın

`.vscode/settings.json` dosyasını açın ve aşağıdaki kod bloğunu ekleyin:

```json
{
    "github.copilot.chat.codeGeneration.instructions": [
        {
            "file": "docs/code-style.md"
        }
    ],
    "github.copilot.chat.commitMessageGeneration.instructions": [
        {
            "file": "docs/commit-style.md"
        }
    ]
}
```

Bu yapılandırma, GitHub Copilot'a kodlama stilinizi ve commit mesajı formatınızı öğretecektir. 🎯 Detaylı incelemek için [GitHub Copilot'ın resmi belgelerine](https://code.visualstudio.com/docs/copilot/copilot-customization) bakın.

## Verbose Modu Etkinleştirme

GitHub Copilot'ın **commit mesajlarınızı daha iyi analiz etmesi** için, Git'in verbose modunu etkinleştirmeniz gerekiyor. Bu mod, Copilot'a yaptığınız değişiklikleri daha detaylı göstererek daha doğru öneriler yapmasını sağlar.

Terminali açın ve şu komutu çalıştırın:

```bash
git config --global commit.verbose true
```

Bu ayar sayesinde, commit yaparken tüm değişiklikler commit editörünüzde görünecek ve GitHub Copilot bu bilgileri kullanarak daha doğru commit mesajları önerecektir.

## Commit Mesajları İçin Copilot'ı Kullanma

Artık her şey hazır! GitHub Copilot'ı commit mesajlarınızı oluşturmak için şu adımları izleyin:

### 1. Değişikliklerinizi Stage'leyin

Öncelikle, commit etmek istediğiniz tüm değişiklikleri stage'leyin:

```bash
git add .  # Tüm değişiklikleri ekler
# VEYA
git add dosya_adı  # Belirli bir dosyayı ekler
```

### 2. Commit Editörünü Açın

Aşağıdaki komutu çalıştırarak commit editörünü açın:

```bash
git commit
```

### 3. Copilot'ın Önerilerini Kullanın

VS Code'da commit editörü açıldığında:

1. Editörün üst kısmında bir **"Generate Commit Message"** (Commit Mesajı Oluştur) butonu göreceksiniz
2. Bu butona tıklayın
3. GitHub Copilot, yaptığınız değişiklikleri analiz edecek ve uygun bir commit mesajı önerecektir
4. Önerilen mesajı gözden geçirin ve gerekirse düzenleyin
5. <kbd>Ctrl</kbd> + <kbd>S</kbd> tuşlarına basarak kaydedin ve editörü kapatın



[responsive_img src="/images/copilot-commit-lg.webp" alt="GitHub Copilot Commit Mesajı Önerisi" /]

> **İpucu**: Copilot'ın önerisi istediğiniz gibi değilse, düzenlemekten çekinmeyin. Copilot size sadece bir başlangıç noktası sunar.

## İleri Düzey İpuçları ve En İyi Uygulamalar

GitHub Copilot ile commit mesajlarınızı daha da etkili hale getirmek için bazı ileri düzey ipuçları:

### 1. Mantıklı Commit Grupları Oluşturun

**Tek bir commit'te çok fazla değişiklik yapmayın**. Her commit, mantıksal olarak birbiriyle ilişkili değişiklikleri içermelidir. Bu, Copilot'ın değişiklikleri daha iyi analiz etmesini sağlar.

```bash
# İyi bir yaklaşım
git add src/authentication/
git commit  # "feat: kullanıcı kimlik doğrulama sistemi eklendi" 

git add src/ui/components/
git commit  # "style: giriş formu görünümü iyileştirildi"
```

### 2. Copilot'ın Yanılgılarını Düzeltin

Copilot her zaman mükemmel değildir. Önerdiği commit mesajlarını her zaman **gözden geçirin ve gerekirse düzeltin**. Özellikle:

- **Yazım hataları** olabilir
- **Değişikliklerin kapsamını** yanlış anlayabilir
- Nadiren tamamen **alakasız mesajlar** önerebilir

### 3. Özel Prompt İpuçları Kullanın

Commit editörüne özel notlar ekleyerek Copilot'a rehberlik edebilirsiniz:

```
# Copilot: Bu değişiklik performans iyileştirmesi için yapıldı
# Copilot: issue #123 ile ilgili
```

Bu notlar commit'e dahil edilmez, sadece Copilot'a yardımcı olur.

## Sık Karşılaşılan Sorunlar ve Çözümleri

### ❓ Copilot Commit Mesajı Önermiyorsa

1. **Copilot eklentisinin güncel olduğunu** kontrol edin
2. VS Code'u yeniden başlatın
3. GitHub hesabınızın aktif ve bağlı olduğundan emin olun
4. `--verbose` modunun etkin olduğunu doğrulayın

### ❓ Öneriler Çok Genel veya Alakasızsa

1. Daha küçük ve odaklanmış commit'ler yapın
2. Özel talimat dosyalarınızı düzenleyin ve daha spesifik hale getirin
3. Commit editöründe manuel ipuçları ekleyin

### ❓ VS Code'da "Generate Commit Message" Butonu Gözükmüyor

1. GitHub Copilot Chat eklentisini de yüklediğinizden emin olun
2. VS Code'u güncelleyin
3. Eklentiyi devre dışı bırakıp yeniden etkinleştirin

## Sonuç ve İleriye Bakış

**GitHub Copilot ile commit mesajları oluşturmak**, yazılım geliştirme sürecinizi önemli ölçüde hızlandırır ve projenizin git tarihçesini daha anlaşılır hale getirir. Bu rehberde öğrendiğiniz teknikler sayesinde:

- ⏱️ Her gün önemli miktarda zaman kazanacaksınız
- 📈 Projenizin bakımı ve takibi kolaylaşacak
- 🤝 Ekip üyeleri arasında tutarlı commit mesajları sağlayacaksınız

GitHub Copilot, yapay zeka teknolojisinin yazılım geliştirme süreçlerini nasıl iyileştirebileceğinin mükemmel bir örneğidir. Bu teknolojiyi benimseyip kendi iş akışınıza entegre ettiğinizde, verimliliğinizin nasıl arttığını göreceksiniz!

---

**Deneyimlerinizi Paylaşın!** 💬

GitHub Copilot ile commit mesajları oluşturma konusunda deneyimleriniz neler? Hangi özel talimatları kullanıyorsunuz? Yorumlarda paylaşın ve diğer geliştiricilere yardımcı olun!

**Bir sonraki yazımızda GitHub Copilot'ın kod incelemelerinde nasıl kullanılabileceğini keşfedeceğiz. Takipte kalın!** 🚀