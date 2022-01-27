---
layout: post
title: Linux Tema Nasıl Yüklenir (Gnome Shell ve Eklentileri)
description: Linux Tema Nasıl Yüklenir (Gnome Shell ve Eklentileri)
category: linux
tags: [linux, unixporn]
comments: false
edit_url: true
toc: true
---

Merhaba, uzun süredir bloga bir şeyler karalamıyorum. Unity kullanırken video çekmiştim, fakat hardiskin son çayını içmesi, bunaltan sıcaklar derken günler geçip gitti 😀 Linux’ta tema yükleme işlemi oldukça basittir. Dağıtım ve masaüstü farketmeksizin üç aşşağı beş yukarı aynıdır. Örneğin Unity’de unity-tweak-tool kullanılırken Gnome’de gnome-tweak-toolkullanılmaktadır. XFCE bir ara kullandım sanıyorum onda bir araç olmadan özelleştirmelerimizi yapabiliyorduk(yanlış hatırlıyor olabilirim.)

<!-- excerpt separator -->

### # Arka Plan(Wallpaper) için Kullandığım Siteler

1.  [Alpha](https://alpha.wallhaven.cc/latest){:target="\_blank"}{:rel="noopener noreferrer"}
2.  [interfacelift](https://interfacelift.com/wallpaper/downloads/date/any/){:target="\_blank"}{:rel="noopener noreferrer"}
3.  [deviantart(çok sık kullanmıyorum)](https://www.deviantart.com/customization/wallpaper/popular-24-hours/){:target="\_blank"}{:rel="noopener noreferrer"}

### # Tema,ikon,imleç,shell ve daha için kullandığım siteler

1.  [Deviantart](https://www.deviantart.com/customization/skins/linuxutil/desktopenv/gnome/gtk3/newest/?offset=0){:target="\_blank"}{:rel="noopener noreferrer"}
2.  [Gnome-Look](https://www.gnome-look.org/){:target="\_blank"}{:rel="noopener noreferrer"}
3.  [XFCE Masaüstü İçin](https://www.xfce-look.org/){:target="\_blank"}{:rel="noopener noreferrer"}

Özellikle Deviantart sitesinde doğru arama yapılarak yada menüleri kullanarak istediğiniz içeriğe ulaşabilirsiniz. Yukarıda ki verdiğim siteler daha derli toplu güncel sitelerdir. Şimdi gelelim asıl mevzuya.. 💣 Ubuntu 17.10 beta süreciyle birlikte kullanmaya başladım. Bu sebeple anlatımım gnome 3x üzerinde tema yükleme olarak devam edilecek, konuyu ve videoyu takip ederseniz aynı mantıkla tüm sistemlerde rahatlıkla uygulayabilirsiniz.

Gnome’de ek olarak eklenti sistemi mevcuttur. [Gnome Eklentileri](https://extensions.gnome.org/){:target="\_blank"}{:rel="noopener noreferrer"} sitesinin nasıl kullanıldığını,eklentileri nasıl aktif hale getirebileceğimize videoda değindim.

#### => Kurulumla ilgili notlar

- Dash to Dock yerine plank’ta kullanabilirsiniz.Pek tavsiye etmem.
- Her tema install.sh yöntemiyle yüklenecek diye bir kaide yok. Tema yapımcısı nasıl yükleneceği konusunda açıklama satırlarında bilgi vermektedir.
- İnce ayar araçları sadece winzorttan gelen kullanıcıların işini kolaylaştırır. Linux dosya yapısını öğrendikten sonra bu araçlara ihtiyacınız kalmayacaktır. Videoda indirilen dosyaları bilerek açıyorum ki nereye yüklendiğini görün diye.
- Fontlar -> Ev dizini altında -> .fonts
  İkon — İmleç -> Ev dizini altında -> .icons
  Tema -> Ev dizini altında -> .themes
  vb klasörlere yüklenir. İndirdiğiniz her dosyaya bakın nereye gidiyor diye 😏

```shell
cat /etc/\*release #bu komutla sürüm çıktısınız alabilirsiniz apt-cache show gnome-shell | grep -i version #gnome sürümünüzü öğrenirsiniz.

```

- Birşeyi küçültüğünüzde tekrardan üzerine bastığınızda büyümüyorsa alta ki kodu terminalde çalıştırmanız yeterlidir.

```shell
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
```

Buda unityde ki temamdı senpai unity 😞

<font color="red">Konu geçerli olup,konuya ait görseller önceki blogumdan silindiği için, özelleştirme yaptığım dağıtım resimleride silindi </font>
