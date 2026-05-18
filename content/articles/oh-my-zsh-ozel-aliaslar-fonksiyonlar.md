Title: Oh My Zsh Özel Alias'lar ve Fonksiyonlar
Date: 2020-02-05 12:00
Modified: 2025-10-26
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh, alias, customization
Slug: oh-my-zsh-ozel-aliaslar-fonksiyonlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 3
Summary: Oh My Zsh'de özel alias'lar ve fonksiyonlar oluşturarak terminalinizi özelleştirin ve günlük işlerinizi hızlandırın.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/zsh-alias-xl.webp
toot: https://mastodon.social/@yuceltoluyag/116592774069232627
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3my7dzr22s

Selamlar tayfa! 🚀

Serinin üçüncü bölümüyle terminali parmaklarımızın ucunda uçurmaya kaldığımız yerden devam ediyoruz! 

Dürüst olalım; her gün terminali açıp aynı komutları, o upuzun git, docker ya da sistem yönetim dizilimlerini tekrar tekrar yazmaktan parmakları yorulan, içten içe isyan eden kim var? Hepimiz! Tıpkı her gün aynı yoldan işe gidip gelmek gibi, bir süre sonra rutin işkenceye dönüşüyor. 

İşte bu yazıda, terminale hükmetmenin iki harika formülünü ele alıyoruz: **Özel alias'lar (kısayollar)** ve **akıllı fonksiyonlar (komut grupları)**. Kendi Arch Linux sistemimde komut yazma hızımı adeta 5 katına çıkaran, parmaklarımı nasır tutmaktan kurtaran tüm o gizli hazineleri, alias ve fonksiyon anayasamı makarna-yoğurt samimiyetinde paylaşıyorum. Çaylar tazelendiyse, terminalin sınırlarını zorlamaya başlayalım! 🔥

---

## 🔹 Alias Nedir?

Basitçe söylemek gerekirse alias, upuzun ve yazması işkence olan komutları kendi belirlediğimiz kısacık takma isimlerle çağırmamızı sağlayan can dostumuzdur.  

Örneğin her defasında gizli dosyaları da göstererek detaylı liste almak için `ls -la` yazmak yerine sadece `ll` yazıp geçebilmemizi sağlar. 

Alias'lar sayesinde zamandan deli gibi tasarruf eder, uzun komutları yanlış yazıp Return Code hatalarıyla monitörü yumruklama olasılığınızı sıfıra indirirsiniz.

---

## 🧩 Alias ve Fonksiyon Arasındaki Fark

Çok sorulan o meşhur soru: *"Hocam, ne zaman alias, ne zaman fonksiyon kullanmalıyız?"*

Hacı, mantık çok basit:
*   **Alias:** Genellikle parametre almayan, tek satırlık basit kısayollar içindir. (Örn: `gs` yazınca `git status` çalışması).
*   **Fonksiyon:** İşin içine parametreler, mantıksal sorgular (if-else), döngüler veya birden fazla komut zinciri girdiğinde devreye giren akıllı yapılardır.

| Kullanım Durumu                            | Önerilen Yapı |
| ------------------------------------------ | ------------- |
| Basit, parametresiz ve tekrar eden komutlar | `alias`       |
| Parametre alan veya mantık içeren işlemler | `function`    |

---

## ⚙️ Kendi Sistemimde Kullandığım Temel Alias'lar

Mabedimiz olan `.zshrc` dosyasını açalım ve o hayatı kolaylaştıran kısayolları dosyanın en altına eklemeye başlayalım:

```bash
# 🧭 Mabedimizi düzenlemek için açıyoruz
nano ~/.zshrc
```

Aşağıdaki alias blokları, benim sistemimde olmazsa olmaz dediğim, eli ayağı hızlandıran kısayollardır. Aynen yapıştırabilirsiniz:

```bash
# 📁 Dosya ve Dizin İşlemleri
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# 🧩 Git Kısayolları (Dahili Git eklentisiyle çakışmaz, hayat kurtarır)
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias gl='git pull'
alias gd='git diff'
alias gb='git branch'
alias gco='git checkout'

# ⚙️ Sistem İzleme ve Bilgi (htop favorimizdir)
alias df='df -h'
alias du='du -h'
alias free='free -h'
alias ps='ps aux'
alias top='htop'

# 📝 Editör Kısayolları
alias v='vim'
alias n='nano'
alias c='code'
```

!!! tip "İpucu ⚡ Kendi özel alias'larınızı oluştururken mevcut sistem komutlarıyla çakışmamasına dikkat edin. Örneğin `tar` adında bir alias oluşturursanız, orijinal sıkıştırma aracını bozarsınız!"

---

## 🧠 Sınırları Zorlayan Özel Fonksiyonlar

Şimdi işi bir adım öteye taşıyalım. Sadece kısayol değil, adeta terminale zeka katacak o akıllı fonksiyonlarımızı `.zshrc` dosyamızın içine tanımlayalım.

### 1. Dizin Oluşturup İçine Girme (`mkcd`)
Bir klasör oluşturup ardından içine girmek için önce `mkdir klasor` sonra `cd klasor` yazmaktan bıkanlar için tek hamlede çözüm:

```bash
# 📂 Dizin oluştur ve anında içine gir
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

**Kullanım:**
```bash
mkcd yeni-projem
```

### 2. Dosya Arama ve Düzenleme (`findedit`)
Sistemde aradığınız bir dosyayı bulup anında Vim veya seçtiğiniz editörle açmak için harika bir fonksiyon:

```bash
# 🔍 Dosyayı bul ve editörle aç
findedit() {
    find . -name "*$1*" -type f | head -1 | xargs vim
}
```

**Kullanım:**
```bash
findedit config
```

### 3. Git Commit Mesajı ile Dosya Ekleme (`gac`)
Değişiklikleri hızlıca ekleyip commit mesajı girmek için harika bir pratik kısayol:

```bash
# 💬 Git add ve commit tek komutta
gac() {
    git add .
    git commit -m "$1"
}
```

**Kullanım:**
```bash
gac "Zsh konfigürasyonu güncellendi"
```

### 4. Sistem Bilgilerini Şık Gösterme (`sysinfo`)
Sisteminizin ne durumda olduğunu hızlıca görebilmek için temiz bir fonksiyon:

```bash
# 🖥️ Detaylı sistem özeti
sysinfo() {
    echo "=== Sistem Bilgileri ==="
    echo "İşletim Sistemi: $(uname -s)"
    echo "Çekirdek: $(uname -r)"
    echo "Mimari: $(uname -m)"
    echo "Hostname: $(hostname)"
    echo "Kullanıcı: $(whoami)"
    echo "Shell: $SHELL"
    echo "Zsh Versiyonu: $ZSH_VERSION"
}
```

---

## 🔌 Oh My Zsh Eklentileri ile Gelen Hazır Alias'lar

Oh My Zsh kullanmanın en güzel yanı, popüler eklentileri aktif ettiğinizde yüzlerce hazır alias'ın otomatik olarak tanımlanmasıdır. İşte en popüler iki eklentinin sunduğu nimetler:

### 1. Git Eklentisi Kısayolları (En Sık Kullanılanlar)

```bash
g=git
gaa=git add --all
gcmsg=git commit -m
gco=git checkout
gcb=git checkout -b
gcm=git checkout main
gcp=git cherry-pick
gd=git diff
gfa=git fetch --all --prune
gl=git pull
glg=git log --oneline --decorate --graph
gst=git status
```

### 2. Docker Eklentisi Kısayolları

```bash
d=docker
dbl=docker build
dc=docker-compose
dco=docker-compose
dcb=docker-compose build
dce=docker-compose exec
dcps=docker-compose ps
dcr=docker-compose run
dcu=docker-compose up
dcud=docker-compose up -d
```

---

## 🎨 Temalar ve Dizin Kısaltma (Powerlevel10k)

Eğer terminalde dizin yollarının çok uzun olup ekranı kaplamasından rahatsız oluyorsanız, `.zshrc` dosyanıza şu satırları ekleyerek terminali tertemiz yapabilirsiniz:

```bash
# Uzun dizin yollarını ortadan kısaltır
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_DIR_LENGTH=3
```

---

## 🧰 Alias Yönetimi ve İpuçları

### Mevcut Alias'ları Görme
Sisteminizde o an aktif olan tüm alias'ları listelemek veya belirli bir alias'ın neye karşılık geldiğini öğrenmek için:

```bash
alias       # Tüm alias'ları listeler
alias ll    # Sadece ll alias'ını kontrol eder
```

### Alias'ı Geçici Olarak Kaldırma
Tanımlı bir alias'ı o anki terminal oturumu için iptal etmek isterseniz:

```bash
unalias ll  # ll alias'ını geçici olarak siler
```

---

## 🧪 İleri Seviye Teknikler ve Performans

### 1. İşletim Sistemine Göre Koşullu Alias Tanımlama
Hem Linux hem macOS kullanan dostlar için harika bir yöntem:

```bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    alias open='xdg-open'
elif [[ "$OSTYPE" == "darwin"* ]]; then
    alias open='open'
fi
```

### 2. Lazy Loading (Performans Canavarı)
Eğer sisteminizde NVM (Node Version Manager) gibi yavaş açılan araçlar varsa, terminal açılışını geciktirmemek için onları lazy load yapabilirsiniz:

```bash
alias nvm='unalias nvm && source /usr/share/nvm/nvm.sh && nvm'
```

### 3. Zsh Profiler ile Açılış Süresini Ölçme
Terminalinizin ne kadar sürede açıldığını ve hangi eklentinin terminali yavaşlattığını milisaniye cinsinden ölçmek için şu muazzam aracı kullanın:

```bash
# Başlangıç süresini analiz et
zmodload zsh/zprof
zprof
```

!!! warning "Dikkat! `zprof` analiz aracı işiniz bittiğinde `.zshrc` dosyasından kaldırılmalıdır, aksi halde her terminal açılışında karşınıza devasa bir rapor dökerek sinirlerinizi bozabilir."

---

## 🎯 Sonraki Adımlar

Kendi özel alias ve fonksiyonlarınızı tanımlayarak terminali tamamen kendinize ait, profesyonel bir çalışma alanına dönüştürdünüz. Artık klavyede yazarken zaman kaybetmek yok!

👉 Serinin sıradaki yazısı: _“Oh My Zsh ile Plugin Yönetimi ve Tema Özelleştirme”_

---

## 📚 Seri İçindekiler

1. [Oh My Zsh Kurulumu ve Temel Ayarlar](/oh-my-zsh-kurulumu-temel-ayarlar/)
2. [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/)
3. **Oh My Zsh Özel Alias'lar ve Fonksiyonlar** (Bu makale)

---

## 🔗 Kaynaklar

- [Oh My Zsh Alias Wiki Cheatsheet](https://github.com/ohmyzsh/ohmyzsh/wiki/Cheatsheet){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Resmi Fonksiyon Kılavuzu](https://zsh.sourceforge.io/Doc/Release/Functions.html){: target="\_blank" rel="noopener noreferrer"}
- [Git Resmi Alias Dokümantasyonu](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases){: target="\_blank" rel="noopener noreferrer"}

---

Bu makale **Oh My Zsh** serisinin üçüncü bölümüydü. Siz de kendi kullandığınız, hayat kurtaran özel fonksiyonlarınızı yorumlarda paylaşın, listeyi beraber büyütelim! Sorunuz veya Arch Linux üzerinde takıldığınız bir nokta olursa çekinmeden sorun kardaşlar! 😉



