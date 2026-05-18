Title: PowerShell Profil Sorunları ve OneDrive Kaldırma Sonrası Dizin Hatası Çözümü
Date: 2025-03-02 10:00
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: PowerShell, OneDrive, Execution Policy, Modül Kurulumu
Slug: powershell-profil-onedrive-hatasi-cozumu
Authors: yuceltoluyag
Summary: PowerShell profil dosyası ile ilgili yaşanan hata mesajları, OneDrive kaldırıldıktan sonra bile dizinlerin görünmeye devam etmesi ve eksik modüller nedeniyle alınan hataların çözümü.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/windows11-onedrive-sorunu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985346729844921
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrs2mxzok2q

## Microsoft'un Dayatması ve Bir "Temiz Kurulum" Kabusu 😠

Selamlar yoldaşlar, terminalin başında Windows'u yola getirmeye çalışan azimli geliştiriciler! ⚡

Geçen gün bizzat kendi sistemimde sıfırdan temiz bir Windows 11 kurulumu yaptım. Her şey jet gibi akıyor, sistem tereyağından kıl çeker gibi çalışıyordu. Ancak Windows kullanan her aklı başında insan gibi benim de ilk işim, Microsoft'un arka planda her şeyimizi gizlice dikizleyen ve sormadan masaüstümüzü buluta yedekleyen o sinsi **OneDrive** belasını denetim masasından tekme tokat fırlatıp atmak oldu. Bulut depolamayı kendi sunucularımda barındırmayı seven bir adam olarak OneDrive'a zerre tahammülüm yok!

Fakat OneDrive'ı sistemden tamamen kaldırdığımı sanırken, arka planda bıraktığı o pislikle karşılaştım. Belgeler (Documents) klasörümün yolu hâlâ inatla `C:\Users\KullanıcıAdı\OneDrive\Belgeler` olarak kalmıştı! 

Daha da kötüsü, terminal aşkıyla PowerShell'i her açtığımda karşıma profil dosyamın yüklenemediğine dair kırmızı kırmızı hata satırları fırlıyordu. Oh My Posh temam kırılmış, terminal ikonlarım uçmuş, sistem adeta can çekişiyordu. 

Eğer siz de OneDrive'ı kaldırma cesareti gösterip Windows'un bu intikamıyla karşılaştıysanız sakin olun hacı. Şimdi bu sinsi dizin hatasını ve PowerShell profil çökmelerini adım adım bizzat test edip çözdüğüm yöntemlerle kökten hallediyoruz!

---

## 📂 OneDrive Kaldırıldıktan Sonra Belgeler Dizininin Düzeltilmesi

OneDrive'ı silseniz bile Windows kayıt defteri inatla Belgeler ve Masaüstü konumlarını o silinen OneDrive klasörünün içinde aramaya devam eder. Bunu düzeltmek için iki harika yolumuz var.

### Yöntem 1: Kayıt Defteri (Registry) Üzerinden Düzeltme (Kesin Çözüm)

Windows'un beynine doğrudan müdahale ederek bu inatçı yolu düzelteceğiz:

1. **Windows + R** tuşlarına basın, açılan kutuya `regedit` yazıp Enter'layın.
2. Sol taraftaki ağaçtan şu konuma gidin:
   ```powershell
   HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
   ```
3. Sağ tarafta **Personal** (Belgeler) ve **Desktop** (Masaüstü) gibi anahtarları göreceksiniz. Bunların yollarında hâlâ OneDrive kelimesi geçiyorsa çift tıklayarak yolları şu şekilde güncelleyin:

| Anahtar Adı | Düzgün Değer (OneDrive Olmayan) |
| :--- | :--- |
| **Desktop** | `C:\Users\KullanıcıAdı\Desktop` |
| **Personal** | `C:\Users\KullanıcıAdı\Documents` |
| **My Pictures** | `C:\Users\KullanıcıAdı\Pictures` |
| **My Video** | `C:\Users\KullanıcıAdı\Videos` |
| **My Music** | `C:\Users\KullanıcıAdı\Music` |

4. Kaydettikten sonra **Bilgisayarı yeniden başlatın.**

---

### Yöntem 2: PowerShell ile Otomatik Yolları Onarma (Tembel İşi 🚀)

Kayıt defterinde tek tek satır değiştirmekle uğraşmak istemiyorsanız, yönetici olarak açtığınız bir PowerShell terminalinde şu tek satırlık mucizevi betiği çalıştırın:

```powershell
$folders = @("Desktop", "Documents", "Pictures", "Videos", "Music")
foreach ($folder in $folders) {
    $path = "C:\Users\$env:USERNAME\$folder"
    if (!(Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force }
    New-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name $folder -Value $path -PropertyType ExpandString -Force
}
```

!!! tip "İpucu: Bu script, eksik olan lokal klasörlerinizi (Masaüstü, Belgeler vb.) otomatik olarak oluşturur ve Kayıt Defterindeki tüm OneDrive kalıntılarını tek hamlede temizler."

---

## 🛠️ PowerShell Profil Dosyası Çalıştırılamıyor Hatası

OneDrive'ı temizledikten sonra PowerShell'i açtığınızda *"script.ps1 is not digitally signed"* tarzında kırmızı bir hata alabilirsiniz. Bu, Windows'un güvenlik paronoyasından kaynaklanır.

### Çözüm: Execution Policy'yi Serbest Bırakma

PowerShell'i **Yönetici Olarak** açın ve şu komutla betik çalıştırma iznini verin:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

Eğer sadece kendi yazdığınız lokal betikleri sıfır engel ile çalıştırmak isterseniz:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted -Force
```

---

## 🎨 PowerShell Modül Eksikliklerini Giderme (Oh My Posh & PSFzf)

Madem terminalimizi temizledik, o zaman powershell terminalimizi adeta Arch Linux'taki o havalı terminal gibi süslemenin vaktidir. Profil dosyanızda eksik olan popüler modülleri kuruyoruz:

### 1. Oh My Posh Kurulumu
Terminalinizi rengarenk yapacak o muazzam prompt motorunu yükleyelim:

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Kurulum bitince terminali kapatıp açıp kontrol edin: `oh-my-posh --version`.

---

### 2. Terminal-Icons (Şık Simgeler) Kurulumu
Klasör ve dosya tiplerine göre terminalde tatlı ikonlar görünmesini sağlarız:

```powershell
Install-Module -Name Terminal-Icons -Scope CurrentUser -Force
```

---

### 3. PSFzf (Terminal Hızlı Arama) Kurulumu
Terminal geçmişinde `Ctrl + R` ile jet hızında arama yapmak için PSFzf kuruyoruz:

```powershell
Install-Module -Name PSFzf -Scope CurrentUser -Force
```

!!! warning "NuGet Hatası Alırsanız Panik Yok! Paket yüklerken NuGet bulunamadı gibi hatalar alırsanız, önce şu sağlayıcıyı terminale yükleyin: `Install-PackageProvider -Name NuGet -Force` ardından `Set-PSRepository -Name 'PSGallery' -InstallationPolicy Trusted` komutunu çalıştırın."

---

## 🚀 PowerShell Profilini (`$PROFILE`) Güncelleme ve Sonuç

Tüm bu kurulumlardan sonra, yeni temiz Belgeler klasörünüzde profil dosyanızı oluşturup yapılandırmayı ekleyelim:

```powershell
# Eğer profil dosyası yoksa sıfırdan oluştur
if (!(Test-Path $PROFILE)) { New-Item -ItemType File -Path $PROFILE -Force }
notepad $PROFILE
```

Açılan not defterinin içine şu sihirli satırları yapıştırın ve kaydedin:

```powershell
# Oh My Posh Başlatma
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/amro.omp.json" | Invoke-Expression

# Terminal İkonlarını Aktif Et
Import-Module Terminal-Icons

# PSFzf (Hızlı Arama) Tuş Kombinasyonları
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'
```

Kaydedip kapattıktan sonra profilinizi yükleyin:

```powershell
. $PROFILE
```

Artık karşınızda OneDrive belasından tamamen arınmış, modülleri tıkır tıkır çalışan, jet hızında ve son derece şık bir PowerShell terminali var! 🚀

Kafanıza takılan veya kayıt defterinde patlayan bir yer olursa yorumlarda benimle paylaşın, terminalin gücü adına beraber çözeriz! 😉

![PowerShell OneDrive Sorun Giderme](/images/windows11-onedrive-sorunu-xl.webp)
