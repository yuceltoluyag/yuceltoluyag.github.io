Title: OneDrive Kaldırıldıktan Sonra Belgeler ve PowerShell Profil Hatası
Date: 2025-03-02 10:00
Modified: 2026-11-14 18:05
Category: Sorun Giderme
Tags: PowerShell, OneDrive, Windows 11, Execution Policy,oh my posh, terminal-icons, psfzf
Slug: powershell-profil-onedrive-hatasi-cozumu
Authors: yuceltoluyag
Summary: OneDrive kaldırıldıktan sonra Belgeler klasörünün eski konumda kalması ve PowerShell profilinin yüklenmemesi sorunlarını kayıt defteri ve PowerShell komutlarıyla teşhis edip düzeltme rehberi.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/windows11-onedrive-sorunu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985346729844921
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrs2mxzok2q


Windows 11 kullandığım dönemde OneDrive'ı sistemimden kaldırdıktan sonra beklemediğim bir sorunla karşılaştım. Uygulama artık bilgisayarımda bulunmuyordu ancak Windows, Belgeler klasörünü hâlâ OneDrive dizini üzerinden açmaya çalışıyordu.

İlk başta yalnızca bir klasör konumu problemi gibi görünüyordu. Fakat PowerShell'i her açtığımda profil dosyasının yüklenemediğine ilişkin hatalarla karşılaşmaya başladım. Oh My Posh temam düzgün yüklenmiyor, terminalde kullandığım bazı modüller de beklediğim gibi çalışmıyordu.

Sorunun önemli bir kısmının Windows'un kullanıcı klasörleri için tuttuğu eski konumlarla ilişkili olduğunu fark ettim. PowerShell'in başlangıçta çalıştırdığı profil dosyası da bu klasörlerle bağlantılı olduğundan, birbirinden bağımsız görünen bazı hatalar aynı dönemde ortaya çıkmıştı.

Bu rehberde OneDrive kaldırıldıktan sonra geride kalabilen klasör yönlendirmesini, Belgeler dizininin nasıl düzeltileceğini ve PowerShell profilinin nasıl yeniden oluşturulacağını ele alıyorum. Ayrıca Execution Policy kaynaklı hataları ayrı bir başlıkta inceliyorum.

> **Güncelleme notu:** Bu yazı, Windows 11 kullandığım dönemde bizzat karşılaştığım bir sorundan yola çıkarak hazırlanmıştır. Windows'u artık günlük kullanmadığım için işlemleri güncel bir Windows kurulumunda yeniden test ettiğimi iddia etmiyorum. Teknik açıklamaları ve komutları yayın öncesinde Microsoft'un güncel belgeleriyle karşılaştırarak düzenledim. Özellikle kayıt defterinde değişiklik yapmadan önce yedek almanızı öneririm.

## OneDrive Kaldırıldıktan Sonra Belgeler Klasörü Neden Hâlâ OneDrive'ı Gösteriyor?

OneDrive, Windows'taki Masaüstü, Belgeler ve Resimler gibi bilinen kullanıcı klasörlerini kendi bulut dizini üzerinden yedekleyebilir. Bu özellik etkinleştirildiğinde ilgili klasörlerin konumu OneDrive dizinine yönlendirilir.

OneDrive uygulamasını kaldırmak, daha önce gerçekleştirilen klasör yönlendirmesinin her durumda kendiliğinden eski hâline döneceği anlamına gelmez. Windows'un kullanıcı klasörleri için tuttuğu konum bilgileri eski yolu göstermeye devam edebilir.

Örneğin Belgeler klasörünüzün beklenen konumu:

```text
C:\Users\KullanıcıAdı\Documents
```

olması gerekirken şu şekilde kalmış olabilir:

```text
C:\Users\KullanıcıAdı\OneDrive\Documents
```

Bu durumda uygulamayı kaldırmış olsanız bile Windows, Belgeler klasörüne erişmeye çalışırken artık mevcut olmayan veya erişilemeyen bir konumu kullanabilir.

### OneDrive henüz kaldırılmadıysa

OneDrive bilgisayarınızda hâlâ yüklüyse, uygulamayı kaldırmadan önce klasör yedeklemesini durdurmak daha sağlıklı bir yöntemdir.

1. Bildirim alanındaki OneDrive bulut simgesini açın.
2. Ayarlar bölümüne girin.
3. **Eşitleme ve yedekleme (Sync and backup)** bölümünü açın.
4. **Yedeklemeyi yönet (Manage backup)** seçeneğine tıklayın.
5. Yedeklemesini durdurmak istediğiniz klasörü seçin.
6. Dosyaları bilgisayarınızda tutma seçeneğini tercih edin.

Yalnızca bulutta bulunan dosyalar varsa önce bunların bilgisayara indirilmesi gerekir. OneDrive yedeklemesini durdurduktan sonra dosyalar otomatik olarak yerel Belgeler klasörüne taşınmayabilir. Gerekli dosyaları ayrıca kontrol ederek taşımalısınız.

Microsoft'un [OneDrive klasör yedeklemesini yönetme rehberinde](https://support.microsoft.com/en-us/onedrive/back-up-your-folders-with-onedrive?country=us&culture=en-us){: target="_blank" rel="noopener noreferrer} bu işlemin ayrıntıları açıklanıyor.

OneDrive'ı zaten kaldırdıysanız aşağıdaki adımlarla mevcut klasör konumunu kontrol edebilirsiniz.

## Belgeler Klasörünün Eski Konumunu Kontrol Etme

Öncelikle Windows'un şu anda hangi Belgeler dizinini kullandığını öğrenelim.

PowerShell'i açarak aşağıdaki komutları çalıştırın:

```powershell
[Environment]::GetFolderPath('MyDocuments')
```

Bu komut, Windows tarafından kullanılan Belgeler klasörünün konumunu gösterir.

Ardından PowerShell profil dosyasının bulunduğu yolu kontrol edin:

```powershell
$PROFILE
```

Son olarak profil dosyasının gerçekten mevcut olup olmadığını öğrenin:

```powershell
Test-Path -LiteralPath $PROFILE
```

Son komut `False` döndürüyorsa mevcut PowerShell oturumunun profil dosyası belirtilen konumda bulunmuyor demektir. Bu durum tek başına OneDrive kaynaklı bir problem olduğunu kanıtlamaz; ancak eski klasör yönlendirmesini kontrol etmek için önemli bir ipucudur.

## Windows Kayıt Defterinden Belgeler Klasörünü Düzeltme

Windows, kullanıcıya ait bilinen klasörlerin konumlarını kayıt defterinde saklar. OneDrive kaldırıldıktan sonra eski konum burada kalmışsa Windows'un doğru klasöre yönlendirilmesi gerekir.

Bu işlem için aşağıdaki kayıt defteri bölümünü kullanacağız:

```text
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders
```

### Önce kayıt defterinin yedeğini alın

Kayıt defterinde değişiklik yapmadan önce mevcut değerlerin yedeğini oluşturun.

PowerShell içerisinde şu komutu çalıştırabilirsiniz:

```powershell
reg.exe export "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" "$env:TEMP\User-Shell-Folders-backup.reg" /y
```

Bu komut, ilgili kayıt defteri bölümünü geçici klasöre dışa aktarır.

### Klasör konumlarını kontrol edin

1. `Windows + R` tuşlarına basın.
2. Açılan pencereye `regedit` yazın ve Enter tuşuna basın.
3. Yukarıdaki kayıt defteri konumuna gidin.
4. Sağ taraftaki değerleri kontrol edin.

Windows'un varsayılan kullanıcı klasörleri için kullandığı değerler şöyledir:

| Klasör | Kayıt defteri değeri | Varsayılan konum |
|---|---|---|
| Masaüstü | `Desktop` | `%USERPROFILE%\Desktop` |
| Belgeler | `Personal` | `%USERPROFILE%\Documents` |
| Resimler | `My Pictures` | `%USERPROFILE%\Pictures` |
| Videolar | `My Video` | `%USERPROFILE%\Videos` |
| Müzik | `My Music` | `%USERPROFILE%\Music` |

Örneğin Belgeler klasörünün `Personal` değeri hâlâ OneDrive dizinini gösteriyorsa bu değerin varsayılan konuma çevrilmesi gerekir.

`Personal` değerine çift tıklayın ve değer verisini şu şekilde düzenleyin:

```text
%USERPROFILE%\Documents
```

Diğer klasörler de OneDrive dizinine yönlendirilmişse yalnızca etkilenen değerleri aynı tablodaki karşılıklarıyla düzeltin. Çalışan klasör konumlarını gereksiz yere değiştirmeyin.

Microsoft'un [kişisel klasör konumunu değiştirme ve kayıt defteri sorunlarını giderme belgesi](https://learn.microsoft.com/tr-tr/troubleshoot/windows-client/shell-experience/change-personal-folder-location-fails){: target="_blank" rel="noopener noreferrer} bu değerleri ayrıntılı olarak açıklıyor.

### PowerShell ile Belgeler klasörünü otomatik düzeltme

Kayıt defterinde elle değişiklik yapmak istemiyorsanız aynı işlemi PowerShell üzerinden gerçekleştirebilirsiniz.

Önceki bölümde kayıt defteri yedeğini oluşturduğunuzdan emin olun. Ardından normal kullanıcı oturumunuzda PowerShell'i açarak şu komutları çalıştırın:

```powershell
$registryPath = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders'

$documentsPath = Join-Path $env:USERPROFILE 'Documents'

New-Item -ItemType Directory -Path $documentsPath -Force | Out-Null

New-ItemProperty `
    -Path $registryPath `
    -Name 'Personal' `
    -Value '%USERPROFILE%\Documents' `
    -PropertyType ExpandString `
    -Force | Out-Null
```

Bu betik:

- Kullanıcı profilindeki `Documents` klasörünü oluşturur.
- Kayıt defterindeki `Personal` değerini doğru konuma yönlendirir.
- Kullanıcı adını veya profil dizinini sabit bir yola bağlamaz.

**Önemli:** Bu işlem OneDrive klasöründeki eski dosyaları otomatik olarak taşımaz veya silmez. Belgeler klasörünüzdeki dosyaları ayrıca kontrol etmeniz gerekir.

İşlem tamamlandıktan sonra Windows oturumunuzu kapatıp yeniden açın. Alternatif olarak Dosya Gezgini işlemini Görev Yöneticisi üzerinden yeniden başlatabilirsiniz.

## PowerShell Profil Dosyası Neden Yüklenmiyor?

Klasör konumunu düzelttikten sonra PowerShell profil dosyasını kontrol etmemiz gerekiyor.

PowerShell açıldığında otomatik olarak çalıştırabildiği bir profil betiği bulunur. Bu dosya, kullanıcıya özel komutların, takma adların, modüllerin ve terminal özelleştirmelerinin yüklenmesini sağlar.

Örneğin Oh My Posh yapılandırması veya Terminal-Icons gibi modüller profil dosyası üzerinden başlatılıyorsa, bu dosyanın bulunamaması terminal görünümünüzü ve başlangıç ayarlarınızı etkileyebilir.

PowerShell'in profil dosyası konumu kullanılan sürüme ve terminal ortamına göre değişebilir.

| PowerShell sürümü | Varsayılan kullanıcı profil yolu |
|---|---|
| Windows PowerShell 5.1 | `Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` |
| PowerShell 7 | `Documents\PowerShell\Microsoft.PowerShell_profile.ps1` |

Bu yollar varsayılan konumlardır. Belgeler klasörü başka bir konuma yönlendirilmişse gerçek profil yolu da farklı olabilir.

Bu nedenle sabit bir dizin kullanmak yerine `$PROFILE` değişkenini esas almalıyız.

Mevcut oturumdaki profil yolunu ve diğer profil konumlarını görmek için:

```powershell
$PROFILE | Select-Object *
```

### Eksik PowerShell profil dosyasını yeniden oluşturma

Belgeler klasörünün konumunu düzelttikten sonra `$PROFILE` dosyasının bulunup bulunmadığını kontrol edin.

Dosya veya üst dizini mevcut değilse aşağıdaki komutlarla oluşturabilirsiniz:

```powershell
$profileDirectory = Split-Path -Parent $PROFILE

New-Item -ItemType Directory -Path $profileDirectory -Force | Out-Null

if (-not (Test-Path -LiteralPath $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
```

Ardından profil dosyasını Not Defteri ile açın:

```powershell
notepad $PROFILE
```

Daha önce kullandığınız profil ayarları varsa bunları yedeğinizden geri yükleyebilirsiniz. Örneğin Oh My Posh başlatma satırları ve modül yükleme komutları bu dosyada bulunuyor olabilir.

Profil dosyasını oluşturmak, daha önce kaydettiğiniz özelleştirmeleri otomatik olarak geri getirmez. Bunları ayrıca yapılandırmanız gerekir.

## PowerShell Execution Policy Hatasını Düzeltme

PowerShell profil dosyasının konumu doğru olsa bile bazı betikler güvenlik politikası nedeniyle çalıştırılamayabilir.

Örneğin aşağıdaki gibi bir hata görebilirsiniz:

```text
File cannot be loaded because running scripts is disabled on this system.
```

veya:

```text
The file is not digitally signed.
You cannot run this script on the current system.
```

Bu mesajlar her zaman aynı nedene işaret etmez. Öncelikle mevcut Execution Policy ayarlarını görüntüleyelim:

```powershell
Get-ExecutionPolicy -List
```

### RemoteSigned politikası

Kişisel bilgisayarınızda yerel olarak hazırladığınız betikleri çalıştırmak istiyorsanız `RemoteSigned` genellikle uygun bir tercihtir.

Ayarı yalnızca mevcut kullanıcı için değiştirmek üzere:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Bu işlem için PowerShell'i yönetici olarak açmanız gerekmez.

`RemoteSigned` politikası yerel betiklerin imzasız çalıştırılmasına izin verir. İnternetten indirilmiş ve Windows tarafından işaretlenmiş betiklerde ise geçerli bir dijital imza gerekebilir.

Kaynağına güvendiğiniz, içeriğini kontrol ettiğiniz bir indirilmiş betik engelleniyorsa ilgili dosyanın engelini kaldırmak için `Unblock-File` kullanılabilir:

```powershell
Unblock-File -LiteralPath 'C:\Scripts\script.ps1'
```

Bu komutu yalnızca kaynağını doğruladığınız dosyalarda kullanın.

**Neden Unrestricted önermiyorum?**

`Unrestricted`, imzasız betiklerin çalıştırılmasına daha geniş izin verir. Sadece profil dosyasını yüklemek için bu kadar geniş bir izin vermeye gerek yoktur.

Ayrıca bilgisayarınızda Grup İlkesi tarafından belirlenmiş `MachinePolicy` veya `UserPolicy` ayarları bulunuyorsa kullanıcı düzeyinde yaptığınız değişiklikler bunları geçersiz kılamaz.

Daha ayrıntılı bilgi için Microsoft'un [PowerShell Execution Policy belgelerini](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5){: target="_blank" rel="noopener noreferrer} inceleyebilirsiniz.

## Oh My Posh ve Terminal Modülleri Neden Çalışmıyor?

Benim karşılaştığım sorunlardan biri de PowerShell terminalimin görünümünün bozulmasıydı. Oh My Posh teması düzgün yüklenmiyor, kullandığım terminal modülleri de beklediğim gibi çalışmıyordu.

Burada dikkat edilmesi gereken nokta, PowerShell profilinin başlangıç sırasında çalıştırılmasıdır.

Örneğin profil dosyanızda şu tür komutlar bulunabilir:

```powershell
oh-my-posh init pwsh --config amro | Invoke-Expression

Import-Module Terminal-Icons

Import-Module PSFzf
```

Profil dosyası yüklenemediğinde bu komutlar da çalışmayabilir. Böylece Oh My Posh temanız, terminal simgeleriniz ve diğer özelleştirmeleriniz kaybolmuş gibi görünebilir.

Bu nedenle profil yüklenmiyor diye doğrudan bütün modülleri kaldırıp yeniden kurmanızı önermiyorum.

Önce:

1. Belgeler klasörünün doğru konumda olduğunu doğrulayın.
2. `$PROFILE` değişkeninin gösterdiği dosyanın mevcut olduğunu kontrol edin.
3. Profil dosyasının içeriğini inceleyin.
4. Execution Policy kaynaklı bir engel olup olmadığını kontrol edin.
5. Ancak bunlardan sonra eksik modülleri ayrıca değerlendirin.

PowerShell profilinin çalışma sırası ve farklı profillerin görevleri hakkında Microsoft'un [PowerShell Profiles belgesi](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.5){: target="_blank" rel="noopener noreferrer} faydalı olacaktır.

## Sonuç: OneDrive Sonrası PowerShell Sorunlarını Doğru Teşhis Etmek

OneDrive'ı kaldırdıktan sonra karşılaştığınız her PowerShell hatasının doğrudan OneDrive'dan kaynaklandığını düşünmemek gerekiyor.

Bu süreçte birbirinden ayrı birkaç durum ortaya çıkabilir:

- Windows'un Belgeler klasörünü hâlâ OneDrive üzerinden açmaya çalışması.
- PowerShell profil dosyasının eski veya erişilemeyen konumda kalması.
- Profil dosyasının içindeki modül yükleme komutlarının çalışmaması.
- Execution Policy nedeniyle bir betiğin veya profil dosyasının engellenmesi.

Bu sorunları çözmenin en sağlıklı yolu, önce klasör konumunu doğrulamak, ardından profil dosyasını kontrol etmek ve son olarak güvenlik politikalarını incelemektir.

Benim yaşadığım sorunda da ilk bakışta birbirinden bağımsız görünen terminal problemlerinin arkasında klasör konumları ve PowerShell başlangıç yapılandırmasıyla ilgili sorunlar bulunuyordu.

**Aklınızda bulunsun:** Kayıt defterinde değişiklik yapmadan önce yedek alın, eski OneDrive dizinindeki dosyalarınızı kontrol edin ve çalışmayan bir profil dosyasını gereksiz yere sıfırdan kurmak yerine önce gerçek konumunu tespit edin.

Bir sorunu çözerken başka bir sorunun ortaya çıkmasını önlemenin en iyi yolu, her şeyi topluca değiştirmek yerine hatanın kaynağını adım adım bulmaktır.