Title: Linux'ta CodeIgniter Kurulumu: Adım Adım Rehber
Date: 2018-12-01 12:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: codeigniter, linux, php, framework kurulumu, web geliştirme
Slug: linux-ta-codeigniter-nasil-kurulur
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Linux sunucuna CodeIgniter kurulumu mu arıyorsun? Bu rehberde adım adım, kolayca CodeIgniter kurulumunu öğrenerek projene hemen başla!
Template: article
Image: images/codeigniter-xl.webp

## Yeni Bir Projeye Başlarken İlk Adım: CodeIgniter'ı Kurmak 💻

Harika bir web projesine başlamak için heyecanlı mısın? Seçtiğin framework CodeIgniter ise, doğru yerdesin! CodeIgniter, hafifliği ve esnekliğiyle sevilen, özellikle yeni başlayanlar için harika bir PHP framework'ü.

Peki, bu güzide framework'ü Linux sistemimize nasıl kuracağız? Endişelenme, sürecin sandığından çok daha basit. Bu rehberde, seni adım adım rehber ederek Linux üzerinde CodeIgniter kurulumunu sorunsuz bir şekilde tamamlayacağım.

## Kuruluma Başlamadan Önce Hazırlık

Asıl kurulum adımlarına geçmeden önce, mutfakta malzemelerin hazır olduğundan emin olalım. CodeIgniter'ı çalıştırmak için bilgisayarında bir web sunucusu ve PHP'nin kurulu olması gerekiyor. Buna genellikle LAMP (Linux, Apache, MySQL, PHP) yığını denir.

!!! note "Not: Eğer bilgisayarında Apache ve PHP kurulu değilse, projenin temelini oluşturan bu bileşenleri önce kurman gerekir. Linux'a Apache, MySQL ve phpMyAdmin kurulumu için daha önce hazırladığım detaylı rehbere [buradan ulaşabilirsin](/linux-apache2-mysql-phpmyadmin-kurulumu/). Arch Linux kullanıcıları için ise [bu rehber](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/) işini görecektir. "

## Adım Adım CodeIgniter Kurulumu

Hazırsan, artık kodları yazma zamanı! Aşağıdaki adımları sırasıyla takip et.

### Adım 1: CodeIgniter'ı İndirme

İşe en güncel CodeIgniter sürümünü indirerek başlayalım. Bunun için terminali açıp aşağıdaki `wget` komutunu kullanabiliriz. Bu komut, CodeIgniter'ın resmi GitHub deposundan dosyayı doğrudan bilgisayarına indirir.

```bash
wget https://github.com/bcit-ci/CodeIgniter/archive/refs/tags/v3.1.13.zip
```

_(Not: Bu yazı yazıldığında en stabil sürüm 3.1.13'tür. [CodeIgniter'ın indirme sayfasını](https://codeigniter.com/download) ziyaret ederek en güncel sürümü kontrol etmeyi unutma!)_

### Adım 2: İndirilen Arşivi Çıkarma ve Klasörü Yönetme

İndirme işlemi bittikten sonra, `.zip` uzantılı arşiv dosyasını açalım ve daha yönetilebilir bir isim verelim.

```bash
# Arşivi çıkar
unzip v3.1.13.zip

# Oluşan klasörü yeniden adlandır
mv CodeIgniter-3.1.13 codeigniter
```

Artık elimizde `codeigniter` adında temiz bir klasör var.

### Adım 3: Dosyaları Web Sunucusu Dizinine Taşıma

Şimdi bu klasörü web sunucusunun dosyalarını sunduğu ana dizine taşımalıyız. Bu dizin genellikle `/var/www/html/` yoludur.

```bash
# codeigniter klasörünü web sunucu dizinine kopyala
sudo cp -R codeigniter /var/www/html/
```

!!! danger "Kritik Uyarı! İzinler Web sunucusunun dosyalarına doğru bir şekilde erişebilmesi için klasörün sahipliğini ve izinlerini ayarlamak çok önemlidir. Aksi takdirde "Permission Denied" (Erişim Reddedildi) hatalarıyla karşılaşabilirsin. Aşağıdaki komutta `kullanici_adin` yazan yeri kendi Linux kullanıcı adınla değiştirmeyi unutma!"

```bash
sudo chown -R kullanici_adin:www-data /var/www/html/codeigniter
sudo chmod -R 755 /var/www/html/codeigniter
```

### Adım 4: Kurulumu Test Etme 🎉

Her şey yolunda gittiyse, son adım olan test aşamasına geldik! Web sunucusunu yeniden başlatarak tüm değişikliklerin aktif olmasını sağlayalım.

```bash
# Apache için
sudo systemctl restart apache2

# Veya eğer Nginx kullanıyorsan
sudo systemctl restart nginx
```

Şimdi favori web tarayıcını aç ve adres çubuğuna `http://localhost/codeigniter` yaz. Eğer her şeyi doğru yaptıysan, CodeIgniter'ın karşılama ekranını görmelisin! Tebrikler, ilk adımı başarıyla tamamladın! 🚀

## Özetle Yapılanlar

Bu rehberde birlikte neler yaptığımızı hızlıca özetleyelim:

- CodeIgniter kurulumu için gerekli olan web sunucusu ve PHP ortamının önemini öğrendik.
- CodeIgniter'ı resmi kaynaktan `wget` ile indirdik.
- İndirdiğimiz dosyaları çıkartıp web sunucusunun ana dizinine taşıdık.
- En kritik adımlardan biri olan dosya izinlerini doğru bir şekilde ayarladık.
- Son olarak tarayıcıdan kurulumumuzu test ederek başarılı bir şekilde tamamlandığını doğruladık.

## Sıradaki Adım ve Sonuç

Artık CodeIgniter geliştirme ortamın hazır! Peki, şimdi ne yapacaksın? Bu boş tuvali harika bir projeye dönüştürme senin elinde. Controller'larını oluştur, modellerini yaz ve ilk veritabanı sorgunu yap.

Unutma, bu rehber CodeIgniter 3 için geçerli. Daha yeni bir sürüm olan CodeIgniter 4'ü de incelemek istersen, resmi dokümantasyonundan veya topluluk tarafından hazırlanan kaynaklardan faydalanabilirsin.

Kurulum sırasında bir sorunla mı karşılaştın veya aklına takılan bir soru mu var? Yorumlarda benimle paylaş, birlikte çözelim! Başarılar dilerim

- [Codeigniter 4](https://github.com/Baba-Project/ci4){: target="\_blank" rel="noopener noreferrer"} sürümüyle ilgili yaptığım testlere buradan ulaşabilirsiniz.

!!!note "Not: Kurulum tamamlandıktan sonra, [http://localhost/codeigniter](http://localhost/codeigniter){: target="\_blank" rel="noopener noreferrer"} adresinden CodeIgniter’a ulaşabilirsiniz."

- [YouTube Kanalım](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){: target="\_blank" rel="noopener noreferrer"}
  Burada daha fazla video ve rehber bulabilirsiniz.

[responsive_img src="/images/codeigniter-xl.webp" alt="codeigniter" /]
