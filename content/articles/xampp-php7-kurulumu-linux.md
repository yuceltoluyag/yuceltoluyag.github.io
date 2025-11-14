Title: Xampp PHP 7 Kurulumu [Linux]
Date: 2017-01-21
Category: Linux
Author: yuceltoluyag
Slug: xampp-php7-kurulumu-linux
Summary: Linux sistemlerde XAMPP (LAMPP) kullanarak PHP 7 kurulumu ve çalıştırma adımlarını adım adım öğrenin.
Tags: xampp, lampp, php7, linux, ubuntu, apache
Lang: tr
Translation: false
Image: images/php7-ubuntu-xampp-xl.webp
Status: published

## Xampp PHP 7 Kurulumu [Linux]

Merhaba, Windows’ta her ne kadar adı **XAMPP** olarak geçse de, Linux tarafında **LAMPP** ismiyle çalışmaktadır.  
AppServ geçmişte çok işimi görmüştü, ancak geliştirilmesinin gecikmesi ve son sürümlerde sıkça karşılaşılan hatalar beni AppServ’den soğuttu.  
XAMPP, Windows tarafında vazgeçilmez bir local sunucu programımdı. Linux’a geçince de insan bazı alışkanlıklarından kolay kolay vazgeçemiyor. 😊

Neyse, sözü fazla uzatmadan kuruluma geçelim.

## XAMPP İndirme

Öncelikle [Apache Friends Download](https://www.apachefriends.org/download.html){: target="\_blank" rel="noopener noreferrer"} adresinden PHP’nin son sürümünü indiriyoruz.  
Dosyanın **`.run`** uzantılı olması gözünüzü korkutmasın.  
Ubuntu ve türevlerinde aşağıdaki adımları izleyebilirsiniz.

```bash
cd İndirilenler
```

!!! tip "İpucu ⚡ Eğer farklı bir dizine indirdiyseniz `cd` komutunu o dizine göre düzenleyin."

## Kurulum Dosyasına İzin Verme

Dosyamıza gerekli çalıştırma iznini veriyoruz.
İsterseniz `777` de verebilirsiniz ama **güvenlik açısından önerilmez**.
Aşağıdaki örnekte `755` izni verilmiştir.

```bash
chmod 755 xampp-linux-x64-7.0.9-2-installer.run
```

!!! warning "Dikkat! `chmod 777` komutu tüm kullanıcılar için tam yetki verir, güvenlik riski oluşturabilir."

## Kurulumu Başlatma

Şimdi dosyamızı çalıştırıyoruz:

```bash
sudo ./xampp-linux-*-installer.run
```

Kurulum tamamlandıktan sonra XAMPP’ı başlatmak için aşağıdaki komutu kullanabilirsiniz:

```bash
sudo /opt/lampp/lampp start
```

Bu komut, XAMPP’ı **arayüz olmadan** başlatır.

!!! note "Not: Arayüz olmadan çalıştırmak, özellikle terminal odaklı sistemlerde daha hızlı bir yöntemdir."

## Arayüzle Çalıştırmak

Eğer arayüzü açarak kontrol etmek istiyorsanız şu komutu kullanın:

```bash
sudo ./manager-linux.run
```

veya sisteminize göre:

```bash
sudo ./manager-linux-x64.run
```

!!! tip "İpucu ⚡ Komutun tamamını yazmak yerine `m` harfini yazıp TAB tuşuna basarsanız terminal otomatik tamamlayacaktır."

Artık Linux üzerinde PHP 7 destekli XAMPP (LAMPP) kurulumunuz hazır! 🎉

[responsive_img src="/images/php7-ubuntu-xampp-xl.webp" alt="XAMPP PHP 7 Kurulumu Linux" /]
