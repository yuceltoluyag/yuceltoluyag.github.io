Title: GitHub’ta Bir Projeye Nasıl Commit Atılır? – Adım Adım Rehber 🚀
Date: 2025-08-15 09:15
Category: Git
Tags: git commit, github, versiyon kontrol, ssh, gpg, açık kaynak
Slug: github-commit-atma-rehberi
Authors: yuceltoluyag
Status: published
Summary: Git ve GitHub kullanmaya yeni başlayanlar için, adım adım bir projeye commit atma rehberi. SSH anahtarı ve GPG imzası önbilgisi gerektirir.
Template: article
Series: Git
Series_index: 7
Image: images/github-commit-atma-rehberi-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115036480228308801
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lwil5efmgs2x

> “Git commit atmak" yazılımcı dünyasının ekmek-su ikilisi gibi bir şeydir. Eğer kod yazıyorsan, değişikliklerini versiyon kontrol sistemine kaydetmeyi bilmek zorundasın. Bu rehberde sana, **GitHub** üzerinde bir projeye **commit atma** sürecini sıfırdan, adım adım ve bol örnekle anlatacağım.
> **Önemli güncelleme:** Ana repoya doğrudan değil, **kendi branch’inde** çalışıp her zaman **Pull Request (PR)** ile gönderiyoruz. Ayrıca projeyi lokalde görüp test etmek için **virtualenv + duty** ile nasıl ayağa kaldıracağını da anlatıyorum.

## 1️⃣ Bu Yazıya Başlamadan Önce Okuman Gerekenler

Eğer daha önce Git ile SSH anahtarı eklemediysen veya GPG imzalı commit/etiket konusuna göz atmadıysan, önce şu iki makaleyi mutlaka oku:

- [Git SSH-Key Oluşturma (Windows & Linux)](/git-ssh-key-olusturma/) 🔑
- [Git ile GPG İmzalı Etiket Oluşturma](/git-gpg-imzali-etiket/) ✍️

!!! note "Bu rehberin sorunsuz ilerlemesi için Git kurulu olmalı, GitHub hesabına SSH anahtarın ekli olmalı, commit imzası için GPG anahtarın tanımlı olmalı ve Python kurulu olmalıdır (virtualenv ve <code>duty</code> kullanacağız)."

---

## 2️⃣ Ön Hazırlıklar

### Git Kurulumunu Kontrol Et

Terminalini aç ve şu komutu çalıştır:

```bash
git --version
```

Örnek çıktı:

```
git version 2.50.1
```

Git yoksa [git-scm.com/downloads](https://git-scm.com/downloads){: target="\_blank" rel="noopener noreferrer"} üzerinden kurabilirsin.

### GitHub Hesabına Giriş Yap

GitHub hesabın yoksa [github.com](https://github.com){: target="\_blank" rel="noopener noreferrer"} üzerinden hızlıca oluştur. Varsa tarayıcıdan giriş yap.

### SSH Bağlantısını Test Et

```bash
ssh -T git@github.com
```

Başarılıysa şöyle bir mesaj gelir:

```
Hi yuceltoluyag! You've successfully authenticated, but GitHub does not provide shell access.
```

### GPG Anahtarını Kontrol Et

```bash
git config --global user.signingkey
```

Anahtar görünmüyorsa GPG yazımı takip ederek ayarla.

---

## 3️⃣ Repoyu Klonlama

Örnek repo: **yuceltoluyag.github.io**
[responsive_img src="/images/github-commit-atma-rehberi-xl.webp" alt="GitHub Repo Klonlama" /]

```bash
git clone git@github.com:yuceltoluyag/yuceltoluyag.github.io.git
cd yuceltoluyag.github.io
```

!!! tip "HTTPS ile klonlamak istersen: <code>git clone https://github.com/yuceltoluyag/yuceltoluyag.github.io.git</code>. Ancak HTTPS push sırasında kullanıcı adı/parola ister; SSH genellikle daha rahattır."

---

## 4️⃣ Kendi Branch’inde Çalış: Neden ve Nasıl?

Ana branch’e (genellikle <code>main</code>) <b>doğrudan commit/push yapmıyoruz</b>. Bunun yerine kendimize bir branch açıp orada çalışıyoruz. Böylece ana repo düzeni bozulmuyor, tüm katkılar <b>Pull Request (PR)</b> ile geliyor.

Yeni branch aç:

```bash
git checkout -b benim-branchim
```

Örnek:

```bash
git checkout -b arkadas-landing-duzenleme
```

!!! tip "Branch isimlerini kısa, açıklayıcı ve tireli seç: <code>bugfix-typo-footer</code>, <code>feature-yeni-makale-sablonu</code> gibi."

---

## 5️⃣ Projeyi İlk Kez Lokalde Ayağa Kaldır (virtualenv + duty)

Değişikliklerini görüp test edebilmek için projeyi lokalde çalıştırman çok önemli. Aşağıdaki adımlar <b>ilk kurulum</b> içindir:

```bash
# 1) Sanal ortam oluştur
python -m venv venv

# 2) Sanal ortamı aktif et
source venv/bin/activate     # Linux/Mac
# Windows PowerShell: .\venv\Scripts\Activate.ps1

# 3) Bağımlılıkları kur
pip install -r requirements.txt

# 4) Proje görevlerini/bağımlılıkları güncelle
duty update

# 5) Editörde aç (isteğe bağlı ama önerilir)
code .

# 6) Canlı yenileme ile lokal sunucuyu başlat
duty livereload
```

Terminal çıktısında <b>lokal URL</b> görürsün (çoğunlukla <code>[http://127.0.0.1:8000](http://127.0.0.1:8000)</code> veya <code>[http://localhost:8000](http://localhost:8000)</code>). Tarayıcıda bu adrese giderek yaptığın değişiklikleri anlık görebilirsin. Sunucuyu durdurmak için terminalde <code>ctrl c</code> tuşlarına bas.

!!! warning "Sanal ortam (<code>venv</code>) <b>aktif edilmeden</b> <code>duty</code> komutlarını çalıştırırsan uygulama açılmayacaktır. Doğru komut: <code>source venv/bin/activate</code> (Linux/Mac). Yanlış: <code>source venv/bin/active</code> (sonu “activate" olmalı)."

---

## 6️⃣ Değişiklik Yapma (Örnek)

Örneğin <code>README.md</code> dosyasına ufak bir satır ekleyelim:

```markdown
Bu satır, branch üzerinden yapılan commit örneğidir. 🚀
```

VS Code’da açmak için:

```bash
code .
```

Dosyayı düzenleyip kaydetmeyi unutma. Lokal sunucu açıksa (livereload), sayfa otomatik yenilenecektir.

---

## 7️⃣ Değişiklikleri Kontrol Et

Neler değişmiş?

```bash
git status
```

Satır bazında farkı görmek için:

```bash
git diff
```

Yeşil yeni eklenenleri, kırmızı kaldırılanları gösterir.

---

## 8️⃣ Commit Hazırlama ve İmzalama (GPG -S)

Değişikliklerini stage’e al:

```bash
git add .
# veya tek dosya için: git add README.md
```

İmzalı commit at:

```bash
git commit -S -m "README.md: örnek satır eklendi"
```

!!! tip "İyi commit mesajı kısa ve nettir. Kötü: <code>update</code>. İyi: <code>docs: README.md'ye katkı akışı eklendi</code>."

---

## 9️⃣ Branch’ini Remote’a Gönder (push)

Artık branch’ini GitHub’a gönderebilirsin:

```bash
git push -u origin benim-branchim
```

Örnek:

```bash
git push -u origin arkadas-landing-duzenleme
```

<code>-u</code> parametresi, sonraki push/pull komutlarında branch izlemeyi kolaylaştırır.

---

## 🔟 Pull Request (PR) Aç: Her Zaman PR!

Tarayıcıdan repo sayfasına git: <code>[https://github.com/yuceltoluyag/yuceltoluyag.github.io](https://github.com/yuceltoluyag/yuceltoluyag.github.io)</code>

GitHub genelde “Compare & pull request" butonunu gösterir. Tıkla ve PR’ını oluştur. Açıklama alanında:

- <b>Ne</b> yaptığını
- <b>Neden</b> yaptığını
- Nasıl <b>test</b> ettiğini

kısaca anlat. Bu repo için <b>2. ve sonraki çalışmalarda her zaman PR</b> açıyoruz; böylece repo sahibiyle karışıklık olmaz, kod inceleme akışı korunur.

!!! note "Bu projede ana branch’e doğrudan push yapma. Tüm katkılar <b>branch → PR</b> akışıyla gelmelidir."

---

## 1️⃣1️⃣ GitHub Üzerinden Kontrol

PR açıldıktan sonra commit’lerini ve değişikliklerini GitHub arayüzünde görebilirsin.
GPG imzası doğruysa commit yanında <b>Verified</b> etiketi görünür.

!!! note "GPG imzası, commit’in gerçekten sana ait olduğunu doğrular ve takım çalışmasında güven sağlar."

---

## 1️⃣2️⃣ İkinci ve Sonraki Çalışma Oturumları (Tekrarlanan Akış)

Projeyi tekrar açtığında şu adımları <b>her zaman uygula</b>:

```bash
cd yuceltoluyag.github.io

# 1) Sanal ortamı aktif et
source venv/bin/activate      # Windows: .\venv\Scripts\Activate.ps1

# 2) Proje görevlerini/bağımlılıkları güncelle
duty update

# 3) Editörde aç (opsiyonel)
code .

# 4) Lokal sunucuyu başlat (canlı yenileme)
duty livereload
```

> Neden tekrar tekrar? Çünkü sanal ortam aktif edilmeden başlatılırsa **uygulama açılmayacaktır**. Ayrıca <code>duty update</code>, görevlerin/bağımlılıkların güncel kalmasını sağlar.

**Yeni bir iş/özellik** için önerilen akış:

```bash
# Ana branch'i güncelle:
git checkout main
git pull origin main

# Yeni branch oluştur:
git checkout -b task-kisa-adi

# Çalış, commit'le, push et:
git add .
git commit -S -m "feat: X özelliği eklendi"
git push -u origin task-kisa-adi

# Her zaman PR aç:
# GitHub -> Compare & pull request
```

---

## 1️⃣3️⃣ Sık Yapılan Hatalar ve Çözümleri

| Hata/Belirti                           | Neden                                                 | Çözüm                                                                           |
| -------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| `command not found: duty`              | Sanal ortam aktif değil veya bağımlılıklar kurulmamış | `source venv/bin/activate` → `pip install -r requirements.txt` → `duty update`  |
| Uygulama açılmıyor                     | venv aktif edilmeden komut çalıştırıldı               | Her oturumda önce `source venv/bin/activate`                                    |
| Yanlış komut: `source venv/bin/active` | Dosya adı hatalı (`activate` olmalı)                  | Doğru komut: `source venv/bin/activate`                                         |
| `Permission denied (publickey)`        | SSH anahtarı yok/agent’e ekli değil                   | SSH anahtarını GitHub’a ekle, ardından `ssh-add` ile agent’a ekle               |
| `gpg: signing failed`                  | GPG anahtarı tanımsız/parola girilmedi                | `git config --global user.signingkey` ile ayarla; pinentry kurulu mu kontrol et |
| PR’da “conflict" uyarısı               | Ana branch’te yeni commit’ler var                     | PR açmadan önce `git checkout main && git pull origin main` ile güncelle        |
| PR açılmadı, doğrudan main’e pushlandı | Süreç ihlali                                          | Değişiklikleri geri al, akışı takip et: branch → push → PR                      |

!!! tip "Lokal sunucuyu durdurmak için terminalde <code>ctrl c</code> tuşlarına bas. Yeniden başlatmak için yine <code>duty livereload</code> kullan."

---

## 1️⃣4️⃣ Örnek Tam Akış (Kısa Özet)

```bash
# İlk kez:
git clone git@github.com:yuceltoluyag/yuceltoluyag.github.io.git
cd yuceltoluyag.github.io
git checkout -b arkadas-landing-duzenleme
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
duty update
code .
duty livereload   # Lokal URL'de değişiklikleri gör

# Çalış, düzenle, sonra:
git add .
git commit -S -m "docs: README'ye katkı akışı eklendi"
git push -u origin arkadas-landing-duzenleme
# GitHub'da: Compare & pull request → Açıklamayı yaz → PR gönder
```

**Sonraki oturumlarda:**

```bash
cd yuceltoluyag.github.io
source venv/bin/activate
duty update
code .
duty livereload
# Yeni iş için:
git checkout main && git pull origin main
git checkout -b yeni-gorev
# değiştir → commit → push → PR
```

---

## 🎯 Sonuç

Artık “GitHub’ta bir projeye nasıl commit atılır?" sorusunun cevabını sadece öğrenmekle kalmadın; <b>doğru akış</b> olan <b>branch üzerinde çalış + PR ile gönder</b> sürecini, ayrıca projeyi <b>lokalde ayağa kaldırma</b> adımlarını da biliyorsun. Bu yaklaşım:

- Ana branch’i temiz ve stabil tutar,
- İnceleme (code review) sürecini mümkün kılar,
- Ekip içi karışıklıkları engeller,
- Değişikliklerini güvenle test edip doğrulamanı sağlar.

Kısacası, profesyonel bir katılım için ihtiyaç duyduğun tüm yapı taşları bu rehberde. Şimdi sıra sende: Kendi branch’ini aç, lokalde çalıştır, açıklayıcı commit mesajları yaz ve <b>her zaman PR</b> ile gönder. 🚀
