---
layout: post
title: vlsub ile altyazı aramaya son (resimli anlatım)
description: vlsub ile altyazı aramaya son (resimli anlatım)
image: "/assets/images/vlsub0.webp"
category: program
tags: [vlc, film]
comments: false
edit_url: true
toc: true
---

Merhaba, yıllar yıllar önce keşfettiğim, halen aktif olarak kullandığım bir eklentiden bahsedeceğim. Her **dizi & film** izlediğimde bundan mutlaka bahsetmeliyim diyorum ama hep unutuyorum :) **Film** ve **dizileri ingilizceye** aşina olmak(**kulak**), **orjinal ses tonları** **filmin** veya **dizinin** içerisine daha çok çektiği için **alt yazılı** izlemeyi seviyorum. O yıllarda Türkçe alt yazı servisleri vardı oradan bakıp uyumlu olan içeriği bulmaya çalışırdık.(Bilmeyenler için çok zahmetli bir durumdu). O zamanlar hizmet veren siteler aktif olduğu için bu eklenti benim için alternatif yöntemdi. Son yıllarda hizmet veren sitelerin kapanması üzerine bu eklentiyi sıkça kullanıyorum.

<!-- excerpt separator -->

{% include info.html content="Yeni Sürümlerde eklenti yüklemeden bu özellik geliyor. Görünüm Sekmesinde VLSUB menüsü varsa,eklentiyi kurmanıza gerek yoktur. " title="Bilgi" icon="tip" fai="icon-diamonds" %}

# Kurulum

1.  [VLC media player](https://www.videolan.org/vlc/index.tr.html){:target="\_blank"}{:rel="noopener noreferrer"} indirin.(ücretsiz ve açık kaynak kodlu bir programdır.)
2.  Eğer Görünüm menüsü altında vlsub eklentisi görünmüyorsa şu işlemleri uygulayın:

![vlsub](/assets/images/vlsub0.webp)

Eklentiyi [buradan](https://addons.videolan.org/p/1154045/){:target="\_blank"}{:rel="noopener noreferrer"} indirdikten sonra **C:\Program Files\VideoLAN\VLC\lua\extensions içerisine kopyalıyoruz.** Bu kopyala esnasında vlc açık **olmamalıdır**.

# Eklenti Dizinleri

- Windows (Tüm kullanıcılar): %ProgramFiles%VideoLANVLCluaextensions
- Windows (Geçerli kullanıcı): %APPDATA%vlcluaextensions
- Linux (Tüm kullanıcılar): /usr/lib/vlc/lua/extensions/
- Linux (Geçerli kullanıcı): ~/.local/share/vlc/lua/extensions/
- Mac OS X (Tüm kulla): /Applications/VLC.app/Contents/MacOS/share/lua/extensions/
- Mac OS X (Geçerli kullanıcı): /Users/%your_name%/Library/Application Support/org.videolan.vlc/lua/extensions/

diğer işletim sistemleri için yukarıda ki gibidir. 3. İzleyeceğimiz dosyayı açtıktan sonra menülerden **Görünüm->VLsub** basıyoruz.![vlsub_altyazi_bulma](/assets/images/vlbsub.webp)

# Altyazı Bulma

4. Aktif pencerede direk izlediğiniz ismi aratacak, dilerseniz silip kendinizde isim girebilirsiniz. Gelen sonuçlardan üzerine tıklayıp **download section** a tıklarsanız alt yazıyı indirip aktif eder. İnen alt yazıda aynı **klasör** dedir.

![vlsub_altyazi_bulma](/assets/images/vlsub1.webp)

# Bilgi

indirmiş olduğum **9 GB dı. İndirmiş olduğum** site(Türkiye'ninde en bilinen sitelerinden birisi) içinde alt yazı var olarak bilgi verilmişti. Evet içerisinde alt yazı var ama ingilizce ydi hem de tüm sezonlar 😁 Bu yöntemi bilmeyen kullanıcılar şimdi amdin kardeşimizin kulaklarını çınlatıyordur 🤣
