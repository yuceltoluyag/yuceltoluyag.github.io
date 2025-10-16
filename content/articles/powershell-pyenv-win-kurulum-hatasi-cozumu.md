Title: PowerShell 7.5.0'da Pyenv-Win Kurulum Hatası ve Çözümü
Date: 2025-03-28 17:30
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: pyenv-win, powershell, python, hata çözümü
Slug: powershell-pyenv-win-kurulum-hatasi-cozumu
Authors: yuceltoluyag
Summary: PowerShell 7.5.0 sürümünde Pyenv-Win kurulumu sırasında karşılaşılan Microsoft.PowerShell.Archive hatasını ve çözüm yöntemini adım adım anlatıyoruz. 🚀
Translation: false
Status: published
Template: article
Image: images/Microsoft-PowerShell-Archive-xl.webp



## PowerShell 7.5.0'da Pyenv-Win Kurulum Hatası ve Çözümü 🎯  
Python sürümlerini yönetmek için kullanılan **Pyenv-Win**, PowerShell 7.5.0 sürümünde bazı kullanıcılar için kurulum hatası verebilir. Özellikle `Microsoft.PowerShell.Archive` modülü eksik olduğunda aşağıdaki hata ile karşılaşabilirsiniz:  

```powershell  
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"

        Directory: C:\Users\yucel


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d----        28.03.2025     17:10                  .pyenv
Microsoft.PowerShell.Archive\Expand-Archive : The module 'Microsoft.PowerShell.Archive' could not be loaded. For more information, run 'Import-Module Microsoft.PowerShell
.Archive'.
At line:1 char:1
+ Microsoft.PowerShell.Archive\Expand-Archive -Path "C:\Users\yucel\.py ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (Microsoft.Power...\Expand-Archive:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CouldNotAutoLoadModule

Move-Item: C:\Users\yucel\install-pyenv-win.ps1:126
Line |
 126 |      Move-Item -Path "$PyEnvDir\pyenv-win-master\*" -Destination "$PyE …
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Cannot find path 'C:\Users\yucel\.pyenv\pyenv-win-master' because it does not exist.
Remove-Item: C:\Users\yucel\install-pyenv-win.ps1:127
Line |
 127 |      Remove-Item -Path "$PyEnvDir\pyenv-win-master" -Recurse
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Cannot find path 'C:\Users\yucel\.pyenv\pyenv-win-master' because it does not exist.
pyenv-win is successfully installed. You may need to close and reopen your terminal before using it.
```  

Bu hata nedeniyle **Expand-Archive çalışmıyor**, dolayısıyla Pyenv-Win düzgün kurulmamış oluyor. Neyse ki, bu sorunun basit bir çözümü var! 🚀  

## Hata Sebebi 🤔  
PowerShell 7.5.0, bazı sistemlerde **Microsoft.PowerShell.Archive modülünü otomatik olarak yükleyemiyor**. Pyenv-Win kurulum betiği (`install-pyenv-win.ps1`), `Expand-Archive` komutunu çağırdığı için hata alıyorsunuz.  

## Çözüm: Kurulum Betiğini Düzenleyin 🛠️  
Bu hatayı gidermek için `install-pyenv-win.ps1` dosyanızı açın ve aşağıdaki satırı bulun:  

```powershell  
Start-Process -FilePath "powershell.exe" -ArgumentList @(
        "-NoProfile",
        "-Command `"Microsoft.PowerShell.Archive\Expand-Archive -Path \`"$DownloadPath\`" -DestinationPath \`"$PyEnvDir\`"`""
    ) -NoNewWindow -Wait  
```  

Bunu şu şekilde değiştirin:  

```powershell  
Start-Process -FilePath "pwsh.exe" -ArgumentList @(  
    "-NoProfile",  
    "-Command \"Expand-Archive -Path \`"$DownloadPath\`" -DestinationPath \`"$PyEnvDir\`"\""  
) -NoNewWindow -Wait  
```  

### **Bu Değişiklik Ne Yapıyor?**  
- `Expand-Archive` komutunu **yeni bir PowerShell sürecinde (`pwsh.exe`) çalıştırarak** modül eksikliğini bypass ediyor.  
- Böylece **arşiv açma işlemi** sorunsuz tamamlanıyor ve Pyenv-Win kurulabiliyor. 🎉  

## Alternatif Çözüm 🏗️  
Eğer yukarıdaki yöntem size karmaşık geldiyse, **PowerShell modülünü manuel yükleyerek** de sorunu çözebilirsiniz:  

1. **PowerShell'i yönetici olarak açın** ve şu komutu çalıştırın:  
   ```powershell  
   Install-Module -Name Microsoft.PowerShell.Archive -Force -Scope CurrentUser  
   ```  

2. **Modülü içe aktarın:**  
   ```powershell  
   Import-Module Microsoft.PowerShell.Archive  
   ```  

3. **Pyenv-Win kurulumunu tekrar deneyin.**  

## Sonuç ✅  
PowerShell 7.5.0'da Pyenv-Win kurulumu sırasında `Expand-Archive` hatası alıyorsanız, yukarıdaki çözüm yöntemlerinden birini kullanarak sorunu giderebilirsiniz. Kurulum sonrasında terminalinizi yeniden başlatmayı unutmayın! 🔄  

Başka hata veya sorularınız olursa yorum bırakabilirsiniz. Happy coding! 🚀

[responsive_img src="/images/Microsoft-PowerShell-Archive-xl.webp" alt="Microsoft-PowerShell-Archive" /]
