Title: PHPStorm içerisinde Cmder Kullanmak
Date: 2019-11-06 12:00 10:00
Modified: 2025-03-08 12:00
Category: program
Tags: phpstorm
Slug: phpstorm-icinde-cmder-kullanmak
Authors: yuceltoluyag
Series: phpstorm
Series_index: 1
Summary: PHPStorm içerisinde terminal olarak Cmder kullanmak için ortam değişkenlerini ayarlama ve gerekli konfigürasyonları yapma adımları.
Translation: false
Status: published
Template: article

## PHPStorm İçerisinde Cmder Kullanmak 🚀

PHPStorm içerisinde terminali kullanabilmek için **ortam değişkenleri**ne yolu belirtmemiz gereklidir. Windows ortamında ortam değişkeni eklemek için şu adımları izleyebilirsiniz:

### Ortam Değişkenlerini Ayarlama ⚙️

1. Bilgisayarıma sağ tıklayın ve **Özellikler** seçeneğine gidin.
2. **Gelişmiş Sistem Ayarları**na tıklayın.
3. **Başlangıç ve Kurtarma** bölümünün hemen altında **Ortam Değişkenleri**ni göreceksiniz.
4. **Ortam Değişkenleri**ne tıklayın ve **Yeni** butonuna basın.

📌 **Değişken Adı:** `CMDER_ROOT`  
📌 **Yol:** `C:\cmder`

![Ortam Değişkenleri](/images/ortam_degiskenleri1.webp)

Ben Cmder'in full sürümünü indirip `C:` dizinine çıkarmıştım. Siz nereye kurduysanız, o dizini gösterin.

![Ortam Değişkenleri Ayarı](/images/ortam_degiskenleri3.webp)

### PHPStorm İçin Terminal Ayarı 🛠️

1. PHPStorm içerisinden **Ayarlar (Settings)** sekmesine girin.
2. **Tools** menüsü altında **Terminal** sekmesine tıklayın.
3. **Shell Path** kısmına aşağıdaki komutu yazın:

```bash
"cmd" /k ""%CMDER_ROOT%\vendor\init.bat""
```

![PHPStorm Cmder Ayarı](/images/phpstorm_terminal.webp)

### PHPStorm'u Yeniden Başlatma 🔄

Ayarları uyguladıktan sonra PHPStorm'u yeniden başlatın. Yeniden açıldığında **Terminal** sekmesine tıklayarak Cmder’in çalıştığını görebilirsiniz. 🎉

![PHPStorm Cmder Terminal](/images/phpstorm_terminal2.webp)

Cmder terminali, Windows kullanıcıları için oldukça pratik bir araçtır. Full sürümünü [buradan](https://cmder.app/){: target="_blank" rel="noopener noreferrer"} indirerek istediğiniz dizine çıkarabilirsiniz. 😊

Bir sonraki rehberde görüşmek üzere! 🚀


