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

## Bir Windows 11 Kullanıcısının Hikayesi

Yeni bir başlangıç yapmak için bilgisayarıma temiz bir Windows 11 yükledim. Her şey oldukça hızlı ve akıcı görünüyordu, ancak kullanmadığım araçlardan biri olan **OneDrive**'ı kaldırmaya karar verdim. Bulut depolama hizmetleriyle pek aram yoktu ve her dosyanın otomatik olarak senkronize edilmesi yerine yerel olarak saklanmasını istiyordum.

Ancak, OneDrive'ı kaldırdıktan sonra fark ettim ki, **Belgeler (Documents) klasörümün yolu hâlâ C:\Users\KullanıcıAdı\OneDrive\Belgeler olarak görünüyordu.** Üstelik PowerShell açtığımda, profil dosyamın yüklenemediğini ve birçok modülün eksik olduğunu fark ettim. Bu noktada, Windows'un bazı ayarları eski hâliyle tutmaya devam ettiğini ve bu yüzden manuel olarak düzeltmem gerektiğini anladım. Eğer siz de benzer bir sorun yaşıyorsanız, aşağıdaki adımları takip ederek bu hatalardan kurtulabilirsiniz.

---

## OneDrive Kaldırıldıktan Sonra Belgeler Dizininin Hâlâ Görünmesi Sorunu

Eğer OneDrive'ı kaldırmış olmanıza rağmen PowerShell gibi uygulamalar hâlâ **C:\Users\KullanıcıAdı\OneDrive\Belgeler** yolunu kullanıyorsa, sisteminizde varsayılan **Belgeler** dizini eski konumda tanımlı olabilir.

### Çözüm 1: Kayıt Defteri Üzerinden Dizin Yolunu Düzeltme

1. **Windows + R** tuşlarına basın ve **regedit** yazıp **Enter** tuşuna basın.
2. Aşağıdaki yolu açın:

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

3. **"Personal"** anahtarına çift tıklayın ve değeri şu şekilde değiştirin:

```powershell
C:\Users\KullanıcıAdı\Documents
```

4. **Bilgisayarı yeniden başlatın.**

### Çözüm 2: PowerShell Profil Yolunu Güncelleme

PowerShell, eski **OneDrive** yolunu kullanıyor olabilir. Yeni bir profil oluşturmak için şu komutları çalıştırın:

```powershell
$newProfilePath = "C:\Users\KullanıcıAdı\Documents\PowerShell\Microsoft.PowerShell_profile.ps1"
New-Item -ItemType File -Path $newProfilePath -Force
```

Ardından `$PROFILE` değişkenini yeni konuma yönlendirin:

```powershell
[System.Environment]::SetEnvironmentVariable("PROFILE", $newProfilePath, "User")
```

PowerShell'i kapatıp tekrar açarak `$PROFILE` değişkenini kontrol edin:

```powershell
echo $PROFILE
```

---

## PowerShell Profil Dosyası Çalıştırılamıyor Hatası

Eğer **PowerShell profil dosyanızın imzalanmadığı** için çalıştırılamadığına dair bir hata alıyorsanız, aşağıdaki yöntemleri deneyebilirsiniz.

### Çözüm 1: Execution Policy'yi Değiştirme

PowerShell'i **Yönetici olarak** açarak şu komutu çalıştırın:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

Eğer güvenlik nedeniyle tüm betikleri serbest bırakmak istemiyorsanız, yalnızca imzalanmamış betiklere izin vermek için:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

**Geçici çözüm** olarak sadece mevcut oturum için şu komut kullanılabilir:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Çözüm 2: Dosyanın Engellemesini Kaldırma

Eğer dosya internetten indirilmişse, PowerShell bunu engelleyebilir. Engeli kaldırmak için:

```powershell
Unblock-File -Path $PROFILE
```

Alternatif olarak, dosyaya sağ tıklayıp **Özellikler > Genel** sekmesinden **Engellemeyi Kaldır** seçeneğini işaretleyin.

---

## PowerShell Modül Eksikliklerini Giderme

PowerShell profilinizde **Oh My Posh, Terminal-Icons veya PSFzf gibi modüller eksikse**, bunları manuel olarak yüklemeniz gerekir.

### 1. Oh My Posh Kurulumu

```powershell
winget install JanDeDobbeleer.OhMyPosh -s winget
```

Kurulum tamamlandıktan sonra doğrulamak için:

```powershell
oh-my-posh --version
```

Eğer `oh-my-posh` hâlâ tanınmıyorsa, şu yolu manuel olarak `$PATH` değişkenine ekleyin:

```powershell
$env:Path += ";C:\Program Files\oh-my-posh\bin"
```

### 2. Terminal-Icons Modülünü Yükleme

```powershell
Install-Module -Name Terminal-Icons -Scope CurrentUser -Force
Import-Module Terminal-Icons
```

### 3. PSFzf Modülünü Yükleme

```powershell
Install-Module -Name PSFzf -Scope CurrentUser -Force
Import-Module PSFzf
```

Eğer yükleme sırasında **NuGet hatası** alırsanız, önce NuGet sağlayıcısını yükleyin:

```powershell
Install-PackageProvider -Name NuGet -Force
Set-PSRepository -Name "PSGallery" -InstallationPolicy Trusted
```

Sonrasında `Install-Module` komutunu tekrar çalıştırın.

---

## PowerShell Profilini Güncelleme

Eğer modüller yüklendiği halde hâlâ otomatik olarak çalışmıyorsa, `$PROFILE` dosyanıza aşağıdaki satırları ekleyin:

```powershell
# Oh My Posh yükleme
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/amro.omp.json" | Invoke-Expression

# Terminal-Icons modülünü yükle
Import-Module Terminal-Icons

# PSFzf modülünü yükle
Import-Module PSFzf
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+f' -PSReadlineChordReverseHistory 'Ctrl+r'
```

Sonrasında `$PROFILE` dosyanızı çalıştırarak değişiklikleri test edin:

```powershell
. $PROFILE
```

PowerShell'i kapatıp tekrar açarak hataların giderildiğini kontrol edin. 🚀

---

## 📌 Çözüm: Klasör Yollarını Manuel Olarak Düzeltme

## 1️⃣ Kayıt Defteri (Registry) Üzerinden Yolları Güncelleme

Windows, özel klasör yollarını Kayıt Defteri (Registry) üzerinden yönetir. Eski OneDrive yollarını değiştirmek için:

### 📌 Adım 1: Kayıt Defterini Aç

- Windows + R tuşlarına bas
- `regedit` yaz ve Enter tuşuna bas

### 📌 Adım 2: Aşağıdaki Yolu Aç

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

Burada, aşağıdaki anahtarları göreceksin. OneDrive ile başlayan yolları düzeltmelisin:

| Anahtar Adı | Varsayılan Yol                  |
| ----------- | ------------------------------- |
| Desktop     | C:\Users\KullanıcıAdı\Desktop   |
| Personal    | C:\Users\KullanıcıAdı\Documents |
| My Pictures | C:\Users\KullanıcıAdı\Pictures  |
| My Video    | C:\Users\KullanıcıAdı\Videos    |
| My Music    | C:\Users\KullanıcıAdı\Music     |

### 📌 Adım 3: Yanlış Olan Yolları Düzelt

- OneDrive içeren yolları bulun. (Örneğin: `C:\Users\KullanıcıAdı\OneDrive\Belgeler`)
- Çift tıklayın ve `C:\Users\KullanıcıAdı` şeklinde değiştirin.
- Bilgisayarı yeniden başlatın.

## 2️⃣ Klasörleri Elle Taşı ve Konumu Değiştir

Eğer yukarıdaki yöntem sorunu çözmezse, aşağıdaki manuel yöntemi dene:

### 📌 Adım 1: Varsayılan Konumları Değiştir

- Belgeler, Masaüstü, Resimler vb. klasörlerine sağ tıkla.
- Özellikler > Konum sekmesine gir.
- "Taşı" butonuna bas ve uygun dizini seç (`C:\Users\KullanıcıAdı\Documents` vb.).
- Uygula ve Tamam butonlarına bas.
- Bu adımları Masaüstü, Belgeler, Müzikler, Videolar ve Resimler için tekrar et.

## 3️⃣ PowerShell ile Klasör Yollarını Onarma (Otomatik)

Eğer yukarıdaki adımları elle yapmak istemiyorsan, aşağıdaki PowerShell betiğini çalıştırarak yolları otomatik düzeltebilirsin:

```powershell
$folders = @("Desktop", "Documents", "Pictures", "Videos", "Music")
foreach ($folder in $folders) {
    $path = "C:\Users\$env:USERNAME\$folder"
    if (!(Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force }
    New-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -Name $folder -Value $path -PropertyType ExpandString -Force
}
```

Bu komut:

- Masaüstü, Belgeler, Resimler, Videolar ve Müzik için doğru yolları atar.
- Eksik klasörleri oluşturur.
- Windows kayıt defterindeki yanlış yolları düzeltir.

Bilgisayarı yeniden başlattıktan sonra düzelip düzelmediğini kontrol et. 🚀
![Hosts Dosyası Düzenleme](/images/windows11-onedrive-sorunu-xl.webp)
