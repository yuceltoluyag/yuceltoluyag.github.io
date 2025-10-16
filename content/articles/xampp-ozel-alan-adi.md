Title: XAMPP Kullanarak Localhost'a Özel Alan Adı Oluşturma
Date: 2019-03-06 12:00 10:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: windows10, apache
Slug: xampp-ozel-alan-adi
Authors: yuceltoluyag
Summary: XAMPP kullanarak localhost ortamında özel bir alan adı nasıl oluşturulur? Adım adım rehber.
Translation: false
Status: published
Template: article
Image: images/hosts-xl.webp



Linux tarafında kullanmak isteyenleri böyle alalım: [Arch Linux](/arch-linux-apache-lampp-sanal-sunucu-kurulumu/){: target="_blank" rel="noopener noreferrer"} + [Debian](/linux-apache2-mysql-phpmyadmin-kurulumu/){: target="_blank" rel="noopener noreferrer"}

## Adım 1: Hosts Dosyasını Düzenleme

Aşağıdaki dizine gidin ve `hosts` dosyasını Not Defteri veya herhangi bir metin editörü ile açın:

**Dosya Konumu:**
```powershell
C:\Windows\System32\Drivers\etc\hosts
```

Açılan dosyanın en alt satırına şu formatta ekleme yapın:
```conf
127.0.0.1 eticaret.test
```


[responsive_img src="/images/hosts-xl.webp" alt="Hosts Dosyası Düzenleme" /]
## Adım 2: Apache Virtual Hosts Yapılandırması

XAMPP dizinine gidin ve `httpd-vhosts.conf` dosyasını bir editörle açın:

**Dosya Konumu:**
```powershell
C:\xampp\apache\conf\extra\httpd-vhosts.conf
```

Aşağıdaki ayarları kendinize göre düzenleyerek dosyanın en altına ekleyin:
```apache
<VirtualHost *:80>
    ServerAdmin webmaster@eticaret.test
    DocumentRoot "C:/xampp/htdocs/eticaret/"
    ServerName eticaret.test
    ServerAlias www.eticaret.test
    ErrorLog "logs/eticaret.test-error.log"
    CustomLog "logs/eticaret.test-access.log" common
</VirtualHost>
```

## Adım 3: XAMPP'yi Yeniden Başlatma

Yaptığınız değişikliklerin aktif olması için XAMPP'yi yeniden başlatın:

1. XAMPP Kontrol Panelini açın.
2. Apache servisini durdurup tekrar başlatın.
3. Tarayıcınızda `http://eticaret.test` adresine giderek ayarlarınızı test edin.

Artık kendi lokal alan adınız ile projelerinizi çalıştırabilirsiniz! 🚀

