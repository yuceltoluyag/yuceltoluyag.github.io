---
layout: post
title: Facebook Toplu Arkadaş Ekleme(Gruba + Süreli)
description: Facebook Toplu Arkadaş Ekleme(Gruba + Süreli)
category: facebook
tags: [facebook]
series: "facebook"
comments: false
edit_url: true
---

Merhaba, Facebook **Grup Kasma Hilesi** adı altında size bir takım **javascript** kodları verilir, bu kodu konsola yapıştırıp arkadaşlarınızı davet ederdiniz. Bu durum facebook çalışanlarını rahatsız etmiş ki günlük arkadaş ekleme sınırını **1000** , toplu mesaj gönderme sınırını **50** gibi rakamlarla sınırlamıştır.

<!-- excerpt separator -->

{% include series.html %}
Bu işlemi elinizle sıkılmadan yapsanız dahi, yapma hızınız macro kullanıp kullanmadığınızı algılayabiliyor. Bu durumda yapılacak tek şey kalıyor süreli ekleme yani insan ol ..

Ekleme işlemini belirli süreler içerisinde yapılırsa zakirbörk abinin adamları durumu farketmiyor. Test sürecinde **1K,2K ve 5K** hesaplar üzerinde testler yaptım, en doğru süreyi bulmaya çalıştım. Çizelgem şu şekilde :

- 500 ve altı arkadaşı olanlar => 7–10 sn
- 1 K ve 2K => 13–20 sn
- 2K ve üstü => 20–60 sn

[Group Invite All](#facebook) eklentisini tarayıcınıza ekleyip bu süreler arasında bir seçim yapın. Diğer sekmede işlemlerinize devam edebilirsiniz.

{% include youtubePlayer.html id="G_oDPhADUso" title="Facebook Toplu Arkadaş Ekleme" %}
