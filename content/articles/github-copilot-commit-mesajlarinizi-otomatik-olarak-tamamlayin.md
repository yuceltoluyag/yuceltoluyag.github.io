Title: GitHub Copilot ile Commit Mesajlarınızı Otomatik Olarak Tamamlayın: Adım Adım Rehber
Date: 2025-05-03 14:00
Modified: 2025-08-11 22:59
Category: Git
Tags: GitHub Copilot, Commit Mesajları, Git, Yazılım Geliştirme, Otomasyon, VS Code, GitHub
Slug: github-copilot-commit-mesajlarinizi-otomatik-olarak-tamamlayin
Authors: yuceltoluyag
Status: Published
Summary: Bu yazıda, GitHub Copilot'ı kullanarak commit mesajlarınızı otomatik olarak nasıl tamamlayabileceğinizi ve yazılım geliştirme sürecini nasıl daha verimli hale getirebileceğinizi adım adım öğreneceksiniz.
Template: article
Image: images/copilot-commit-xl.webp
Series: Git
Series_index: 6
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114987992573967805
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvswrrlrmc27

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

> **Not**: GitHub Copilot'un ücretsiz sürümü de bulunmaktadır! Ücretsiz sürümde ayda 2,000 tamamlama ve 50 sohbet isteği hakkınız var. Daha fazla kullanım için ücretli plana geçebilirsiniz. Öğrenciyseniz ücretsiz erişim için [GitHub Student Developer Pack](https://education.github.com/pack){: target="\_blank" rel="noopener noreferrer"} başvurusu yapabilirsiniz.

## Özel Kodlama ve Commit Talimatları Oluşturma (Güncel Yöntem)

GitHub Copilot'ın **sizin stilinize uygun** commit mesajları oluşturması için özel talimatlar tanımlayabilirsiniz. Bu adım isteğe bağlıdır ancak **Copilot'ın verimliliğini önemli ölçüde artırır**.

> **ÖNEMLİ GÜNCELLEME**: GitHub Copilot, özel talimatları yönetmek için yeni bir sistem kullanıyor. Artık talimatlarınızı tek bir `.github/copilot-instructions.md` dosyasında toplamanız gerekiyor.

### 1. Proje Yapılandırma Dosyalarını Oluşturma

İlk olarak, proje klasörünüzde gerekli dizin ve dosyaları oluşturun:

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

### 2. Kod Üslubunuzu ve Commit Mesajı Formatınızı Tanımlayın

`.github/copilot-instructions.md` dosyasını açın ve kodlama tercihlerinizi ile commit mesajı formatınızı belirtin:

```markdown
## Project Instructions

## Code Style Guide

### General Guidelines

- Keep the code simple and readable.
- Use Prettier for code formatting.

### CSS

- Use class names that are descriptive and follow a consistent naming convention.
- Avoid using IDs for styling.
- Organize CSS properties in a logical order.

### Tailwind CSS V4

- Use utility-first classes to build components.
- Avoid using custom CSS when possible.
- Group related classes together for better readability.
- Use DaisyUI classes for components.

### JavaScript

- Use `const` and `let` instead of `var`.
- Prefer arrow functions for anonymous functions.
- Use template literals for string concatenation.
- Always use semicolons.
- Follow the Prettier configuration for formatting.

---

## Commit Style Guide

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/){: target="\_blank" rel="noopener noreferrer"} style for our commit messages. Here are some examples:

- `feat: add new user authentication module`
- `fix: resolve issue with data fetching.`
- `docs: update README with installation instructions`
- `style: format code with Prettier`
- `refactor: improve performance of data processing`
- `test: add unit tests for user service`
- `chore: update dependencies`

### Commit Message Rules

- Use imperative mood (e.g., "add feature" not "added feature")
- Keep the subject line under 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Separate subject from body with a blank line
- Use the body to explain what and why vs. how
```

### 3. VS Code Ayarlarını Güncelleyin

`.vscode/settings.json` dosyasını açın ve aşağıdaki kod bloğunu ekleyin:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

> **NOT**: Eski yöntemde kullanılan `github.copilot.chat.codeGeneration.instructions` ve `github.copilot.chat.commitMessageGeneration.instructions` ayarları artık kullanılmıyor. Bu ayarları kaldırmanız gerekiyor.

Bu yapılandırma, GitHub Copilot'a kodlama stilinizi ve commit mesajı formatınızı öğretecektir. 🎯 Detaylı incelemek için [GitHub Copilot'ın resmi belgelerine](https://aka.ms/vscode-ghcp-custom-instructions){: target="\_blank" rel="noopener noreferrer"} bakın.

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

[responsive_img src="/images/copilot-commit-xl.webp" alt="GitHub Copilot Commit Mesajı Önerisi" /]

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

### ❓ "Use instructions files instead" Hatası Alıyorum

Bu hata, eski talimat yöntemini kullandığınızda ortaya çıkar. Çözüm için:

1. `.vscode/settings.json` dosyanızı açın
2. Eski talimat ayarlarını kaldırın:

```json
  // Bu satırları silin
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
```

3. Yeni ayarı ekleyin:

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

4. `.github/copilot-instructions.md` dosyası oluşturun ve talimatlarınızı buraya taşıyın

### ❓ Öneriler Çok Genel veya Alakasızsa

1. Daha küçük ve odaklanmış commit'ler yapın
2. `.github/copilot-instructions.md` dosyanızı düzenleyin ve daha spesifik hale getirin
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



