---
layout: post
title: windows üzerinde Redshift Kullanımı
description: windows üzerinde Redshift Kullanımı
image: "/assets/images/redshift_windows.webp"
category: program
tags: [windows10]
comments: false
edit_url: true
toc: true
---

Blog yazılarımı medium üzerinde yazarken , linux üzerinde redshift kullanımı ile ilgili detaylı bir yazı yazmıştım.
Medium'dan taşınırken yedek almadığım için o yazı uçuvermiş.. 😭

<!-- excerpt separator -->

## Nedir ?

Redshift gibi programlar özellikle geceleri çalışanlar için tavsiye ettiğim bir programdır. Program gün doğumundan gün
batımına ,renk,gamma gibi bir çok ayarı içerisinde barındırıyor.

## Hangi Programları Denedim.

Windowsun Gece Işığı(Night Mode) ,flux gibi programları denedim. Flux ilk sürümlerde baya iyiydi, lakin yeni sürümler
çıktıkça sıvamaya başladılar.(Kişisel görüşüm) Linux tarafında sorunsuzca kullandığım, redshift i acaba windowsta
kullanabilir miyim diye düşündüm. Program açık kaynak ve cross platform olduğu için windows içinde uygundu. Bir kaç
ayarla birlikte sorunsuz bir şekilde kullanmaya başladım.

## Kullanım

1. [Redshift Son Sürüm](https://github.com/jonls/redshift/releases){:target="\_blank"}{:rel="noopener noreferrer"} indiriyoruz.
2. C:\Program Files (x86) içerisine Redshift adında bir klasör oluşturuyoruz.
3. Oluşturduğumuz bu klasörün içerisine indirdiğimiz dosyaları atıyoruz.
   ![Redshift Windows Klasör
Düzeni](/assets/images/redshift_windows.webp)
   Temel işlem bu kadar ancak, ico ve gamma sınırlarını kaldırmak için reg dosyasına ihtiyaç vardır. Gerekli dosyaları
   indirmek için [Tıklayın](http://www.mediafire.com/file/ylw89legwkyp04t/redshift.7z/file){:target="\_blank"}{:rel="noopener noreferrer"} (Klasör görünümü üsteki
   görselde ki gibi olmalıdır)

Programı çalıştırmadan önce yapılması gereken bir kaç ayar daha vardır.

1. Windows + R tuşuna basıp **%USERPROFILE%\AppData\Local\*\* yazıp enter ile konuma gidin. Açılan dizinde
   **redshift.conf** isminde dosya oluşturun. Bu dosyanın içerisine ne yazılıp yazılmayacağı wiki sayfasında yazdığı gibi,
   indirdiğiniz redshift programının içerisinde **redshift.conf.sample\*\* örnek dosyası vardır. Dosyayı inceleyerek
   kendinize uygun ayarları keşfedebilirsiniz.
2. [https://www.latlong.net/](https://www.latlong.net/){:target="\_blank"}{:rel="noopener noreferrer"} üzerinden adresinizin bulunduğu konumu alın.
3. redshift.conf dosyanıza gerekli düzenlemeyi yapın.
4. Redshift.exe yi çalıştırın
   İşlem bu kadar..
   Benim redshift.conf dosyam şu şekilde

```conf
[redshift]
; Set the day and night screen temperatures
temp-day=6500
temp-night=5500
transition=1
brightness-day=1
brightness-night=0.7
gamma-day=0.8:0.7:0.8
gamma-night=0.8
location-provider=manual
adjustment-method=wingdi [manual]
lat=xx lon=yy
```
