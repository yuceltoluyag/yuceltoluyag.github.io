---
layout: post
title: Newsboat RSS Feeds Kullanımı
description: Muhteşem Rss Okuyucusu ile tanışın
image: "/assets/images/newsboat.webp"
category: linux
tags: [linux, newsboat]
comments: false
edit_url: true
toc: true
---

# Merhaba

Uzunca bir süre **Feedly** servisini kullandım,Bildirimleri terminal ekranından takip etmek işime daha çok geldiği için newsboat'a geçiş yaptım. Feedly bu süreçte spam mail,premium alsana koçum vs gibi rahatsız edici bildirimlerde bulunmadı.Dileyen feedly servisinide kullanabilir. Windows için QuiteRSS yi kullanabilirsiniz.

<!-- excerpt separator -->

# Newsboat nedir ?

![Newsboat](/assets/images/newsboaticerik.webp)
Newsboat bir RSS / Atom besleme okuyucusudur. RSS ve Atom, haber, blog makalesi gibi makaleleri iletmek, yayınlamak ve bir araya getirmek için yaygın olarak kullanılan bir dizi XML biçimidir. Newsboat, Unix veya GNU / Linux, FreeBSD veya Mac OS X gibi Unix benzeri sistemlerde metin terminallerinde kullanılmak üzere tasarlanmıştır.

## Newsboat Kurulumu

```shell
yay -S newsboat mpv youtube-dl dunst

```

- **Mpv** , medya oynatıcıdır.(müzik,video vs) dilerseniz başka medya oynatıcılarda kullanabilirsiniz
- **youtube-dl** Eğer Rss içerisinde video varsa diye kullanacağız.
- **Dunst**, masaüstünde bildirimlerimiz görünsün diye kullanacağız. (i3-wm kullandığım için kuruyorum,eğer siz DE yani xfce gnome,kde vs kullanıyorsanız kurmanız gerek yoktur.)

Yapılandırma,esnek olduğu için,çok farklı kullanımlar görebilirsiniz.
-- Kullanırken şu şekilde ayrım yapıyorum :

- Haber siteleri
- Youtube kanalları
  Burada hem haber siteleri,hem youtube kanalları için istersem tek config dosyası ve url dosya oluşturabilirim yada hepsini ayrıabilirim. Bu sayede her takip etmek istediğim Feed 'lere ayrı ayrı konfigurasyonlar yapabiliyorum. Config dosyası ana dizinde .config klasörü içerisinde newsboat adlı klasörde bulunur. Yoksa oluşturursunuz.

Yapılandırmam dosyam :

```shell
browser "xdg-open"

macro o set browser "/usr/bin/mpv %u > /dev/null 2>&1 &" ; open-in-browser ; set browser "xdg-open"

macro y set browser "youtube-dl %u"; open-in-browser ; set browser "xdg-open"

#general stuff

show-read-articles yes

show-read-feeds yes

auto-reload yes

cleanup-on-quit no

max-items 100

feed-sort-order title-desc

mark-as-read-on-hover yes

display-article-progress yes

max-browser-tabs 10

show-keymap-hint no

feedlist-format "%4i %9u %t" #"%t %d %u %U %c %S %n"

articlelist-format "%4i %D %?T? %-10T ?%t"

feedlist-title-format ""

articlelist-title-format ""

# reload-threads 4

# reload-time 90

# reload-only-visible-feeds yes

cache-file "~/.config/newsboat/cache.db"

# notifications

notify-format "Newsboat: %d new"

notify-program "/usr/bin/notify-send"

#keybinds

bind-key j down

bind-key k up

bind-key l open

bind-key h quit

unbind-key g # bound to `sort` by default

bind-key g home

bind-key s sort

unbind-key G # bound to `rev-sort` by default

bind-key G end

bind-key O open-all-unread-in-browser-and-mark-read

unbind-key r

bind-key r reload-all

color background default default

color listnormal default default

color listnormal_unread green default

color listfocus yellow default bold

color listfocus_unread yellow default bold

color info default default

color article magenta default

# highlights

highlight article "^(Title):.\*$" red default

highlight article "https?://[^ ]+" blue default

highlight article "\\[image\\ [0-9]+\\]" green default

# Killfiles

#ignore-article "\*" "title =~ \"Väder\""

#ignore-article "\*" "title =~ \"Rugby\""

#ignore-article "\*" "title =~ \"Uutiset\""

#ignore-article "\*" "title =~ \"Kulturnyheterna\""

#ignore-article "\*" "title =~ \"från dagen\""
```

- Browser kısmına, firefox,chrome,chromium ne kullanıyorsanız onu yazabilirsiniz. Ama xdg open yakabileceği için zaten varsayılan tarayıcınızla açıcaktır : )
- Macro kısımlar ise videoları youtube-dl ile yakalayıp mpv playerime göndermek için .
- Ben kullanıma alıştığım için klavye kısa yollarını gösteren kısımları kapattım.
- Yinede merak edenler [Döküman Sayfası](https://newsboat.org/releases/2.19/docs/newsboat.html){:target="\_blank"}{:rel="noopener noreferrer"} ndan gerekli bilgileri alabilirler.

# Kısayollar

<table class="container">
	<thead>
		<tr>
			<th><h1 class="no_toc">Kısayol</h1></th>
			<th><h1 class="no_toc">İşlevi</h1></th>
		</tr>
	</thead>
	<tbody>
    <tr>
      <td>A</td>
      <td>Tümünü Okundu yap</td>
    </tr>
    <tr>
      <td>O</td>
      <td>Web tarayıcıda aç</td>
    </tr>
    <tr>
      <td>Yön tuşları</td>
      <td>Sağa sola aşağı yukarı git</td>
    </tr>
     <tr>
      <td>Q</td>
      <td>Çıkış</td>
    </tr>

  </tbody>
</table>

Bu ayarları #keybinds kısmında tanımlamışım yukarıda görüldüğü üzere : )

Yine bu tuşları değiştirebilirsiniz. Kısacası herşey sizin keyfinize kalmış.

- **Color** kısımları ise,bir rss okunmuş okunmamış,yeni,listede ki görünümü için kullandığım kısımlar.
- **İgnore** ise bazı makaleleri indexleyip göstermesini istemiyorum. Şu kelimeleri içeriyorsa gösterme diyorum. (Ayar kapalıdır) Ayarı açmak için başında ki # işareti kaldırmanız yeterlidir.

Gelelim url kısmına :
Feed adresleri, **urls** adlı dosyada saklanır. **\$HOME/.config/newsboat/urls**
İçerisine alt alta feed adreslerini yazarsınız, evet bu kadar : )
Örnek :

```shell

# Blog

http://feeds.feedburner.com/kushellig
https://sunaku.github.io/index.atom
https://lukesmith.xyz/rss.xml
https://feeds2.feedburner.com/9lesson
https://tewarid.github.io/feed.xml
https://sushankpokharel.com.np/feed/
http://ciftklik.blogspot.com/feeds/posts/default
http://www.emrebuyukkurkcu.com/feed/
https://itsalljs.com/rss.xml
http://www.kurumsaljava.com/feed/
https://www.larashout.com/feed
https://laraveldaily.com/feed/
https://gokmengorgen.net/tr/index.xml
http://oguzkaganeren.com.tr/index.php/feed/
https://omercitak.com/feed/
https://ogunal.com/feed/
http://selcukcelik.org/feed/
https://simpleit.rocks/index.xml
https://twitteinfo.com/feed/
http://feeds.feedburner.com/TammerSaleh

# deactive

# https://www.datafloyd.com/tr/feed/

```

Dilerseniz bu alta istediğiniz kadar urle yazabilirsiniz. Ancak youtube,haber kanalları,bloglar vs çok yoğun bir takip durumunuz var ise , yapılandırma dosyalarınızı ayırmanızı tavsiye ederim. Beni Takip etmek isterseniz [Yücel Toluyağ Feed](https://yuceltoluyag.github.io/feed.xml) linkini kullanabilirsiniz. E-posta ile abone olmak isterseniz [Hakkımda](https://yuceltoluyag.github.io/about/) sayfasının en altında ki bildirim sistemi kısmına, eposta adresinizi yazıp doğrulamanız yeterlidir.

# Örnek Youtube

- [https://www.youtube.com/subscription_manager](https://www.youtube.com/subscription_manager){:target="\_blank"}{:rel="noopener noreferrer"} linkine gidin. Sayfanın en altında "RSS okuyuculara dışa aktarım" yazısını göreceksiniz. Aboneliklerimi dışarı aktar diyip dosyayı indirin.

Haberler için diyelimki $HOME/.config/newsboat/haberconfig diye bir dosya oluşturduğumuzu, youtube içinde $HOME/.config/newsboat/youtubeconfig diye bir dosya oluşturduğumuzu varsayalım.(Dosya yollarıyla birlikte yazıyorum ki kafanız karışmasın)
Şimdi ben bunlara ulaşabilmek için, alias oluşturuyorum. Alias'larınızı .bashrc .zshrc içerisine kaydedebilirsiniz.

Haber

```shell
alias haberbotu="newsboat -u ~/.config/newsboat/haberurls -C ~/.config/newsboat/config"
```

Youtube

```shell
alias youtubebotu="newsboat -u ~/.config/newsboat/yturls -C ~/.config/newsboat/ytconfig"

```

İndirdiğimiz **subscription_manager** isimli dosyayı içeri aktaralım.

```shell
youtubebotu -i subscription_manager
```

~/.config/newsboat/yturls dosyasını açtığınızda,içerisinde tüm abone olduğunuz kanalların feed adreslerini görebileceksiniz.

Terminalden **haberbotu**,**youtubebotu** nu çalıştırarak son güncellemeleri alabilirsiniz. Umarım faydalı olur.

{% include info.html content="[NewsBoat Ayarlarım!](https://github.com/yuceltoluyag/dotfiles/tree/master/dotfiles/config/newsboat){:target='_blank'}{:rel='noopener noreferrer'}" title="Güncelleme" icon="tip" fai="icon-diamonds" %}
