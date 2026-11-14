Title: Windows Terminal ve PowerShell Nasıl Özelleştirilir?
Date: 2022-06-26 10:00
Modified: 2026-11-14 18:05
Category: Windows
Tags: Windows Terminal, PowerShell, Oh My Posh, Nerd Fonts, Scoop, PSReadLine, PSFzf, Terminal-Icons
Slug: windows-terminalimi-nasil-ozellestiriyorum
Authors: yuceltoluyag
Summary: Windows Terminal ve PowerShell ortamınızı Nerd Fonts, Oh My Posh, PSReadLine, Terminal-Icons ve PSFzf ile kişisel çalışma düzeninize göre özelleştirin. Kendi PowerShell profilinizi oluşturun ve Scoop ile terminal araçlarını yönetin.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/windows-terminal-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985306515279329
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrrio6wlc2s

## Windows Terminal ve PowerShell'i Kişiselleştirelim

Windows Terminal, Windows üzerindeki komut satırı araçlarını tek bir arayüzde kullanmamızı sağlayan oldukça kullanışlı bir terminal uygulaması. Ancak benim için yalnızca komut çalıştırabildiğim bir pencere olması yeterli değil. Kullandığım araçları, kısayolları, yazı tipini ve terminal görünümünü kendi çalışma alışkanlıklarıma göre düzenlemeyi seviyorum.

Linux tarafında kullandığım terminal ortamına benzer bir düzeni Windows'ta da oluşturmak istediğimde Nerd Fonts, Oh My Posh, PSReadLine ve PSFzf gibi araçlardan yararlanmıştım.

Bu rehberde Windows Terminal'i PowerShell 7 ile yapılandıracak, terminal görünümünü değiştirecek ve günlük kullanımda işimizi kolaylaştıran modülleri ekleyeceğiz. Ayrıca kendi yapılandırmamı tek bir PowerShell profil dosyasında tutarak gerektiğinde kolayca düzenleyebileceğiz.

> **Not:** Bu makalenin ilk sürümü 2022 yılında kullandığım Windows yapılandırmasına dayanıyor. Eski kurulum adımlarını güncel resmi belgelerle karşılaştırarak yeniledim. Örnek yapılandırma, kullandığım araçların güncel kullanımına göre düzenlenmiştir. Farklı Windows sürümlerinde veya kurulum yöntemlerinde küçük farklılıklar görülebilir.

## Windows Terminal ve PowerShell Kurulumu

Öncelikle iki kavramı birbirinden ayıralım.

**Windows Terminal**, PowerShell, Komut İstemi (CMD) ve WSL gibi farklı komut satırı ortamlarını sekmeler ve paneller üzerinden kullanmamızı sağlayan terminal uygulamasıdır.

**PowerShell** ise komutları, betikleri ve sistem yönetimi işlemlerini çalıştırdığımız kabuktur.

Yani Windows Terminal tek başına PowerShell'in yerini tutmaz. İkisini birlikte kullanacağız.

### Windows Terminal kurulumu

İlk olarak kararlı Windows Terminal sürümünü yükleyelim. Windows Terminal Preview yerine normal sürümü tercih ediyoruz.

Windows Paket Yöneticisi (WinGet) üzerinden:

```powershell
winget install --id Microsoft.WindowsTerminal --exact
```

Microsoft Store üzerinden de Windows Terminal'i yükleyebilirsiniz.

Kurulum tamamlandığında Windows Terminal'i açın.

### PowerShell 7 kurulumu

Windows'un yerleşik Windows PowerShell 5.1 sürümü hâlâ kullanılabilir. Ancak bu rehberde güncel PowerShell 7 üzerinden ilerleyeceğiz.

PowerShell 7'yi kurmak için:

```powershell
winget install --id Microsoft.PowerShell --source winget
```

Kurulumdan sonra PowerShell 7'yi Windows Terminal içerisindeki profil listesinden açabilirsiniz.

Windows PowerShell 5.1 ile PowerShell 7 birbirinin yerine geçen tek bir sürüm değildir. İki sürüm aynı bilgisayarda bulunabilir ve Windows Terminal içerisinde ayrı profiller olarak kullanılabilir.

Microsoft'un [PowerShell 7 kurulum belgesi](https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows?view=powershell-7.6){: target="_blank" rel="noopener noreferrer"} farklı kurulum seçeneklerini açıklıyor.

### PowerShell'i varsayılan terminal profili yapma

Windows Terminal'i açtıktan sonra:

1. `Ctrl + ,` tuşlarıyla ayarları açın.
2. **Startup** bölümüne girin.
3. **Default profile** alanından PowerShell'i seçin.
4. Windows 11 kullanıyorsanız **Default terminal application** alanında Windows Terminal'i tercih edebilirsiniz.
5. Ayarları kaydedin.

Böylece Windows Terminal'i açtığınızda doğrudan PowerShell 7 başlayacaktır.

## Nerd Fonts Kurulumu

Terminal görünümünü özelleştirmeden önce yazı tipini halletmemiz gerekiyor.

Oh My Posh ve Terminal-Icons gibi araçlar, terminalde özel simgeler ve karakterler kullanır. Standart bir yazı tipinde bu karakterler düzgün görüntülenmeyebilir. Bunun sonucunda simgelerin yerine boş kutular veya anlamsız karakterler görebilirsiniz.

Bu sorunu çözmek için [Nerd Fonts](https://www.nerdfonts.com/font-downloads){: target="_blank" rel="noopener noreferrer"} kullanacağız.

Nerd Fonts, geliştirici odaklı yazı tiplerine çeşitli simge ve karakter kümeleri ekleyen bir projedir.

Bütün yazı tiplerini indirmenize gerek yok. Beğendiğiniz bir font ailesini seçmeniz yeterli.

Kurulum için:

1. Nerd Fonts indirme sayfasını açın.
2. Kullanmak istediğiniz font ailesini seçin.
3. İlgili font arşivini indirin.
4. Arşivi çıkartın.
5. Kullanacağınız `.ttf` dosyasını açarak Windows'a yükleyin.

Benim GitHub yapılandırmamda `Agave Nerd Font Propo` kullanılıyor. Farklı bir font tercih ederseniz Windows Terminal ayarlarında da seçtiğiniz fontun tam adını kullanmanız gerekiyor.

Fontunuzu yükledikten sonra Windows Terminal'i açın ve ayarlara girin.

**Profiles → PowerShell → Appearance → Font face** bölümünden yüklediğiniz Nerd Font'u seçin.

Terminal-Icons ve Oh My Posh'un simgeleri düzgün gösterebilmesi için bu adım önemli.

Daha fazla font seçeneği için [Nerd Fonts GitHub deposunu](https://github.com/ryanoasis/nerd-fonts){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

## Windows Terminal Görünümünü Özelleştirme

Şimdi terminalimizin görünümünü düzenleyelim.

Windows Terminal ayarlarında ilgili PowerShell profilinin **Appearance** bölümünü açın.

Burada yazı tipi, yazı boyutu, renk şeması, arka plan ve saydamlık gibi ayarları değiştirebilirsiniz.

Benim kullandığım yapılandırmanın önemli bir kısmını `settings.json` üzerinden yönetiyorum.

Windows Terminal'in ayar dosyasını bulmak için:

1. Windows Terminal'i açın.
2. Ayarlar menüsüne girin.
3. **Open JSON file** seçeneğini kullanın.

Mevcut ayarlarınızı değiştirmeden önce dosyanın yedeğini almanızı öneririm.

Aşağıdaki örnek, profil ayarlarının temel görünüm bölümünü gösteriyor:

```json
{
    "profiles": {
        "defaults": {
            "font": {
                "face": "Agave Nerd Font Propo",
                "size": 16
            },
            "opacity": 100,
            "useAcrylic": true
        }
    }
}
```

Bu örneği mevcut `profiles` nesnenizin içine uyarlamalısınız. Bütün `settings.json` dosyanızı bu küçük örnekle değiştirmeyin.

Burada dikkat etmeniz gereken iki ayar var:

- `font`: Terminalde kullanılacak yazı tipini ve boyutunu belirler.
- `useAcrylic`: Acrylic arka plan efektini etkinleştirir.

`opacity` değeri 100 olduğunda pencere tamamen opaktır. Arka planın daha saydam görünmesini istiyorsanız bu değeri örneğin 85 veya 90 seviyesine düşürebilirsiniz.

Microsoft'un [Windows Terminal profil görünümü ayarları](https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-appearance){: target="_blank" rel="noopener noreferrer"} belgesinde bu seçeneklerin tamamı açıklanıyor.

Renk şeması kullanmak istiyorsanız yine aynı dosyada `schemes` alanını düzenleyebilirsiniz. Kendi GitHub yapılandırmamda `Baba` adında özel bir renk şeması da bulunuyor.

## Scoop Kurulumu

Windows üzerinde komut satırı araçlarını yönetmek için Scoop kullanıyorum.

Scoop, uygulamaları çoğunlukla kullanıcı dizinine kurabilen ve paketlerin güncellenmesini kolaylaştıran bir komut satırı paket yöneticisi.

Öncelikle PowerShell'i normal kullanıcı olarak açın.

Gerekli yürütme politikasını ayarlayın:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ardından Scoop'u yükleyin:

```powershell
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

Kurulum tamamlandığında Scoop komutlarını kullanabilirsiniz.

Örneğin `fzf` aracını kurmak için:

```powershell
scoop install fzf
```

Scoop'un `main` paketi varsayılan olarak etkin gelir. Başka bir bucket içerisindeki uygulamaya ihtiyaç duyduğunuzda ilgili bucket'ı ayrıca ekleyebilirsiniz:

```powershell
scoop bucket add extras
```

Burada `main` ve `extras` ayrımına dikkat etmek gerekiyor. Her iki bucket'ı da kurulum sırasında tekrar tekrar eklemeniz gerekmez.

Scoop hakkında daha fazla bilgi için [resmî GitHub deposunu](https://github.com/ScoopInstaller/Scoop){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

## Oh My Posh Kurulumu

Terminal görünümünün en önemli parçalarından biri Oh My Posh.

Oh My Posh, PowerShell istemini (prompt) özelleştirmenizi sağlar. Kullanılan temaya bağlı olarak Git dalı, çalışma dizini, işlem durumu ve çeşitli sistem bilgilerini terminal isteminde gösterebilir.

Kurulum için WinGet kullanacağız:

```powershell
winget install JanDeDobbeleer.OhMyPosh --source winget
```

Kurulum tamamlandıktan sonra sürümü kontrol edin:

```powershell
oh-my-posh version
```

Artık Oh My Posh'u PowerShell profilimize ekleyebiliriz.

### Material temasını kullanma

Oh My Posh birçok hazır tema ile birlikte geliyor. Ben kendi yapılandırmamda Material temasını tercih ediyorum.

Temayı görüntülemek için öncelikle PowerShell profil dosyamızı oluşturacağız. Profil dosyasının hazırlanmasını bir sonraki bölümde anlatıyorum.

Profil dosyasına şu satırı ekleyebilirsiniz:

```powershell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\material.omp.json" | Invoke-Expression
```

Burada `material.omp.json` kullanılan tema dosyasını ifade ediyor. Farklı bir tema tercih ederseniz dosya adını değiştirebilirsiniz.

Oh My Posh temalarının listesini [resmî tema sayfasından](https://ohmyposh.dev/docs/themes){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

Kurulum, güncelleme ve tema yapılandırması için [Oh My Posh Windows belgeleri](https://ohmyposh.dev/docs/installation/windows){: target="_blank" rel="noopener noreferrer"} de oldukça faydalı.

## PowerShell Profil Dosyasını Hazırlama

Şimdi kurduğumuz araçları PowerShell her açıldığında otomatik yükleyecek bir profil oluşturacağız.

PowerShell profil dosyası, terminal başladığında çalıştırılan bir betiktir. Bu dosya üzerinden modülleri içeri aktarabilir, alias tanımlayabilir, özel fonksiyonlar ekleyebilir ve terminal ayarlarını yönetebilirsiniz.

Profil dosyasının konumunu öğrenmek için:

```powershell
$PROFILE
```

PowerShell 7 ve Windows PowerShell 5.1 farklı varsayılan profil dizinleri kullanır.

| Sürüm | Kullanıcı profil dizini |
|---|---|
| Windows PowerShell 5.1 | `Documents\WindowsPowerShell` |
| PowerShell 7 | `Documents\PowerShell` |

Bu nedenle sabit bir konum kullanmak yerine `$PROFILE` değişkenini kullanmak daha doğru.

### Kendi yapılandırma dizinimizi oluşturalım

Ben ayarlarımı kullanıcı dizini altında `.config/powershell` klasöründe toplamayı tercih ediyorum.

Öncelikle bu dizini oluşturalım:

```powershell
$configDirectory = Join-Path $HOME '.config\powershell'

New-Item -ItemType Directory -Path $configDirectory -Force
```

Şimdi ana yapılandırma dosyamızı hazırlayalım:

```powershell
notepad (Join-Path $configDirectory 'user_profile.ps1')
```

Bu dosyanın içine birazdan hazırlayacağımız komutları ekleyeceğiz.

### PowerShell'in ana profilini yapılandırma

Öncelikle PowerShell'in varsayılan profil dosyasının bulunduğu dizini oluşturalım:

```powershell
$profileDirectory = Split-Path -Parent $PROFILE

New-Item -ItemType Directory -Path $profileDirectory -Force

if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}
```

Ardından ana profil dosyasını açın:

```powershell
notepad $PROFILE
```

İçerisine aşağıdaki satırı ekleyin:

```powershell
. "$HOME\.config\powershell\user_profile.ps1"
```

Bu satır, daha önce oluşturduğumuz `user_profile.ps1` dosyasını PowerShell başlangıcında çalıştıracaktır.

Böylece ana profil dosyası yalnızca yapılandırmamızı çağıracak, asıl ayarlarımız ise `.config/powershell` altında kalacaktır.

Bu yaklaşımın güzel tarafı, birden fazla ayarı tek bir merkezden yönetebilmemizdir.

## PowerShell Modüllerini Kurma

Sıra terminalimizi günlük kullanımda daha işlevsel hâle getirecek modüllere geldi.

Bu rehberde üç temel modül kullanacağız: Terminal-Icons, PSReadLine ve PSFzf.

Modülleri PowerShell Gallery üzerinden kullanıcı kapsamına yükleyebiliriz.

### 1. Terminal-Icons

Terminal-Icons, dosya ve klasörleri listelerken türlerine göre simgeler gösteren bir PowerShell modülüdür.

Nerd Fonts ile birlikte kullanıldığında terminaldeki dosya listelerini daha anlaşılır hâle getirir.

Kurulum:

```powershell
Install-Module -Name Terminal-Icons -Repository PSGallery -Scope CurrentUser
```

Profil dosyamıza ekleyeceğimiz komut:

```powershell
Import-Module Terminal-Icons
```

Artık dosya ve klasörleri listelerken simgeler görüntülenebilir.

### 2. PSReadLine

PSReadLine, PowerShell komut satırındaki düzenleme, geçmiş ve klavye davranışlarını özelleştirmemizi sağlar.

Örneğin Vi tuş düzenini kullanabilir, daha önce çalıştırdığımız komutlardan öneriler alabilir ve klavye kısayollarını değiştirebiliriz.

PowerShell ile birlikte gelen PSReadLine sürümü ihtiyaçlarınızı karşılıyorsa ayrıca kurulum yapmanız gerekmez. Daha yeni bir sürüm kullanmak isterseniz:

```powershell
Install-Module -Name PSReadLine -Repository PSGallery -Scope CurrentUser
```

Profil dosyamıza şu ayarları ekleyelim:

```powershell
Import-Module PSReadLine

Set-PSReadLineOption -EditMode Vi

Set-PSReadLineOption -BellStyle None

Set-PSReadLineOption -PredictionSource History

Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar
```

Burada yaptığımız ayarlar:

- `Vi`: Komut satırında Vi düzenleme modunu etkinleştirir.
- `BellStyle None`: Gereksiz sesli veya görsel uyarıları kapatır.
- `PredictionSource History`: Komut geçmişinden öneriler sunar.
- `Ctrl+d`: İmlecin bulunduğu karakteri siler.

PSReadLine hakkında daha fazla bilgi için [Microsoft'un PSReadLine belgelerini](https://learn.microsoft.com/en-us/powershell/module/psreadline){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

### 3. fzf ve PSFzf

Terminalde arama işlemlerini kolaylaştırmak için fzf kullanacağız.

fzf, dosyalar, klasörler ve komut geçmişi gibi içerikler arasında bulanık arama (fuzzy search) yapmamızı sağlayan bağımsız bir komut satırı aracıdır.

Scoop üzerinden kurulum:

```powershell
scoop install fzf
```

PSFzf ise bu arama aracını PowerShell ile bütünleştiren modüldür.

Kurulum:

```powershell
Install-Module -Name PSFzf -Repository PSGallery -Scope CurrentUser
```

Burada önemli bir ayrıntı var: PSFzf, klavye kısayollarını PSReadLine üzerinden kaydeder. Bu nedenle PSReadLine modülünü PSFzf'den önce yüklemeliyiz.

Profil dosyamıza ekleyelim:

```powershell
Import-Module PSReadLine

Import-Module PSFzf

Set-PsFzfOption `
    -PSReadlineChordProvider 'Ctrl+f' `
    -PSReadlineChordReverseHistory 'Ctrl+r'
```

Böylece:

- `Ctrl+f`: Dosya ve klasör yollarını aramamızı sağlar.
- `Ctrl+r`: Komut geçmişinde arama yapmamızı sağlar.

Arama sonucunu seçtiğinizde komut satırına aktarılır. Böylece geçmişte kullandığınız uzun komutları yeniden yazmak zorunda kalmazsınız.

fzf'nin Windows kurulumu ve diğer özellikleri için [kendi GitHub deposunu](https://github.com/junegunn/fzf){: target="_blank" rel="noopener noreferrer"}, PSFzf yapılandırması için de [PSFzf belgelerini](https://github.com/kelleyma49/PSFzf){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

### 4. Z modülü (İsteğe bağlı)

Sık kullandığınız klasörler arasında daha hızlı geçiş yapmak için Z modülünü de kullanabilirsiniz.

Z, daha önce ziyaret ettiğiniz dizinleri takip ederek komut satırından hızlıca o konumlara geçmenizi sağlar.

Kurulum:

```powershell
Install-Module -Name z -Repository PSGallery -Scope CurrentUser
```

Yapılandırma dosyanıza ekleyin:

```powershell
Import-Module z
```

Modül, ziyaret ettiğiniz klasörlerin geçmişini oluşturur. Yeterli kullanım geçmişi oluştuktan sonra klasör adının bir kısmını kullanarak ilgili konuma geçebilirsiniz.

Bu modül temel terminal özelleştirmesi için zorunlu değildir. İhtiyacınıza göre kullanabilirsiniz.

## PowerShell Yapılandırma Dosyasının Son Hâli

Şimdiye kadar kurduğumuz araçları tek bir dosyada birleştirelim.

`C:\Users\KullanıcıAdınız\.config\powershell\user_profile.ps1` dosyasının temel içeriği şöyle olabilir:

```powershell
# UTF-8 encoding
[console]::InputEncoding = [console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Oh My Posh
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\material.omp.json" | Invoke-Expression

# Terminal Icons
Import-Module Terminal-Icons

# PSReadLine
Import-Module PSReadLine

Set-PSReadLineOption -EditMode Vi
Set-PSReadLineOption -BellStyle None
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineKeyHandler -Chord 'Ctrl+d' -Function DeleteChar

# PSFzf
Import-Module PSFzf

Set-PsFzfOption `
    -PSReadlineChordProvider 'Ctrl+f' `
    -PSReadlineChordReverseHistory 'Ctrl+r'

# Z - Optional
# Import-Module z
```

Dosyayı kaydedin ve PowerShell profilini yeniden yükleyin:

```powershell
. $PROFILE
```

Herhangi bir hata almıyorsanız terminalinizi kapatıp yeniden açarak ayarların otomatik yüklenip yüklenmediğini kontrol edebilirsiniz.

Kendi alias ve fonksiyonlarınızı da bu yapılandırma dosyasına ekleyebilirsiniz.

Örneğin Git için kısa bir alias:

```powershell
Set-Alias -Name g -Value git
```

Bu şekilde her yeni PowerShell oturumunda kendi komutlarınız ve tercihleriniz hazır olacaktır.

## GitHub Üzerinden Kendi Windows Terminal Ayarlarım

Yukarıdaki işlemleri tek tek yapmak yerine kendi yapılandırmamı incelemek isteyenler için GitHub üzerinde bir depo oluşturdum.

[Windows Terminal DotFiles](https://github.com/yuceltoluyag/WindowsTerminal){: target="_blank" rel="noopener noreferrer"}

Bu depoda Windows Terminal için kullandığım `settings.json` ve PowerShell yapılandırma dosyalarım bulunuyor.

Depodaki ayarlar arasında:

- Agave Nerd Font Propo yazı tipi.
- Baba renk şeması.
- Acrylic görünüm ayarları.
- Windows Terminal profil tanımları.
- PowerShell için Oh My Posh yapılandırması.
- PSReadLine ve PSFzf kısayolları.
- Kişisel alias ve yardımcı fonksiyonlar.

bulunuyor.

Dosyaları kullanmadan önce kendi bilgisayarınıza göre düzenlemenizi öneririm.

Özellikle `C:\Arch\Arch.png`, Git araçlarının kurulum dizinleri ve Oh My Posh tema yolu gibi konumlar her bilgisayarda aynı olmayacaktır. Depodaki `settings.json` dosyasını mevcut ayarlarınızın üzerine doğrudan yazmak yerine önce yedek alın ve gerekli bölümleri birleştirin.

## Sonuç

Windows Terminal'i kişiselleştirmek yalnızca renkleri veya yazı tipini değiştirmekten ibaret değil.

Oh My Posh ile terminal istemini düzenleyebilir, Nerd Fonts sayesinde özel simgeler kullanabilir, PSReadLine ile komut satırı deneyimini geliştirebilir ve PSFzf ile arama işlemlerini hızlandırabiliriz.

Benim için önemli olan, kullandığım terminalin çalışma alışkanlıklarıma uyum sağlaması. Bu nedenle ayarları farklı dosyalara dağıtmak yerine bir yapılandırma dizininde topluyorum. Böylece yeni bir Windows kurulumunda ayarlarımı tekrar oluşturmak ve kişisel tercihlerimi değiştirmek çok daha kolay oluyor.

Kendi terminalinizi oluştururken bütün araçları kurmanız gerekmiyor. İhtiyacınız olanları seçin, profil dosyanızı buna göre düzenleyin ve gereksiz modüllerle terminalinizi kalabalıklaştırmayın.

[responsive_img src="/images/windows-terminal-son-xl.webp" alt="Windows Terminal ve PowerShell kişisel terminal yapılandırmam" /]

