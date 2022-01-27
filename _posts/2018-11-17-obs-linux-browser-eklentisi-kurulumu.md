---
layout: post
title: OBS Linux Browser Eklentisi Kurulumu + Discord Chat Eklenmesi
description: OBS Linux Browser Eklentisi Kurulumu + Discord Chat Eklenmesi
image: "/assets/images/linux_browser.webp"
category: linux
tags: [linux, obs, discord]
comments: false
edit_url: true
toc: true
---

Merhaba, Open Broadcaster Software Video kaydetme ve canlı yayınyapma konusunda en iyi uygulamalardan bir tanesidir. Linux tarafında uygulamaya nasıl eklenti eklenip aktif edileceği hususunda Türkçe kaynak bulunmadığı için, bu rehberi hazırlamaya karar verdim. OBS nasıl kullanılır anlatmayacağım çünkü bu konuda yeterince Türkçe kaynak var..

<!-- excerpt separator -->

# Kurulum

OBS plugin ekleyip test olarak Discord StreamKit entegre edeceğiz.
{% include info.html content="Artık Linux Browser Eklentisi varsayılan olarak gelmektedir.Ayrıca Yüklemenize Gerek Yoktur !" title="Güncelleme" icon="tip" fai="icon-diamonds" %}

- ~~[obs-linuxbrowser](https://github.com/bazukas/obs-linuxbrowser/releases){:target="\_blank"}{:rel="noopener noreferrer"}~~
- [discordstreamkit](https://discordapp.com/streamkit){:target="\_blank"}{:rel="noopener noreferrer"}

Bu işlemleri ellede yapabilirsiniz. Ben terminal üzerinden yapmayı tercih ediyorum.

<font color="white">! Bu kısmı atlayın.</font>

```shell
wget https://github.com/bazukas/obs-linuxbrowser/releases/download/0.6.1/linuxbrowser0.6.1-obs23.0.2-64bit.tgz
mkdir -p $HOME/.config/obs-studio/plugins
tar xfvz linuxbrowser0.6.1-obs23.0.2-64bit.tgz -C $HOME/.config/obs-studio/plugins/
```

<font color="white">Bu kısmı atlayın!!</font>

![obs linux browser](/assets/images/linux_browser.webp)

## Ne Yaptık

Burada yaptığım işlem dosyayı indirdim. Ev dizinim altındaki .config dosyam içerisinde ki obs-studio içerisine plugins klasörü oluşturdum. Farklı bir eklenti ekleyeceksem bu dosyanın içerisine atmam yeterlidir.

# Kullanım

OBS açıyoruz Kaynaklar + tuşuna basıp Linux Browser i Seçiyoruz

![linux_browser_kaynaklar](/assets/images/linux_browser_kaynaklar.webp)

Stream Kits linki üzerinde sayfanın en altında bulunan obs->connect discorda basıyorum
![linux_browser_discord](/assets/images/linux_browser_discord.webp)

Install For OBS butonuna tıklıyoruz

![linux_browser_obs](/assets/images/linux_browser_obs.webp)

Gelen Ekranda Serverimi Seçip Ses - Yazı seçeneklerinde hangisini isterseniz eklersiniz
![linux_browser_obs_custom.webp](/assets/images/linux_browser_obs_custom.webp)

Açtığımız Linux Browser Url Kısmına Linkimizi Yapıştırıyoruz. İsterseniz yükseklik genişlik hatta css bilginizle dahada güzelleştirebilirsiniz
![linux_browser_settings](/assets/images/linux_browser_settings.webp)

![linux_browser_final](/assets/images/linux_browser_final.webp)

# Linux Discord Sunucumuz

Bu arada discord sunucumuza katılmak isterseniz [Discord Sunucuma Katıl](https://discordapp.com/invite/da3Su8s){:target="\_blank"}{:rel="noopener noreferrer"}
