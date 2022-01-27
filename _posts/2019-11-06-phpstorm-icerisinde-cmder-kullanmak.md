---
layout: post
title: PHPStorm içerisinde cmder kullanmak
description: PHPStorm içerisinde cmder kullanmak
image: "/assets/images/ortam_degiskenleri1.webp"
category: program
tags: [phpstorm]
series: "phpstorm"
comments: false
edit_url: true
---

Phpstorm içerisinde terminali kullanabilmek için **ortam değişken**lerine yolu belirtmemiz gereklidir. Windows ortamında ortam değişkeni eklemek için :

 <!-- excerpt separator -->

{% include series.html %}

- Bilgisayarıma sağ tıklayıp **özellikler** ardından **gelişmiş sistem ayarları** na tıklayınız.
  **Başlangıç ve Kurtarma** nın hemen altında **ortam değişkenleri**ni göreceksiniz. Ortam değişkenlerine tıklayıp yeni 'ye tıklayın

  ![ortam_degiskenleri_windows10](/assets/images/ortam_degiskenleri1.webp)

- değişken adı kısmına : CMDER_ROOT
- yol kısmına : C:\cmder

![ortam_degiskenleri_windows10](/assets/images/ortam_degiskenleri3.webp)

Ben Cmder'in full sürümünü indirip c dizinine çıkarmıştım. Siz nereye kurduysanız o dizini gösterirsiniz.

![ortam_degiskenleri_windows10](/assets/images/ortam_degiskenleri2.webp)

Daha sonra phpstorm içerisinden ayarlara girin. **Tools** altında ki **Terminal** menüsüne tıklayın. **Shell Path** kısmına

```shell
"cmd" /k ""%CMDER_ROOT%\vendor\init.bat""

```

kodunu yapıştırın.

![phpstorm_cmder_full](/assets/images/phpstorm_terminal.webp)

Ayarları uyguladıktan sonra phpstormu yeniden başlatın. Phpstorm yeniden açıldıktan sonra terminal sekmesine tıklayın.

![phpstorm_cmder_full](/assets/images/phpstorm_terminal2.webp)

Cmder terminali windows kullanan arkadaşlara tavsiye ederim. [https://cmder.net/](https://cmder.net/){:target="\_blank"}{:rel="noopener noreferrer"} adresinden full sürümünü indirip istediğiniz dizine çıkartabilirsiniz.
