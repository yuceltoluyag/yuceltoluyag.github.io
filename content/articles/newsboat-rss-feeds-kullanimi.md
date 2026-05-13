Title: Newsboat RSS Feeds Kullanımı
Date: 2020-07-17 12:00 10:00
Modified: 2025-08-11 22:59
Category: Terminal
Tags: linux, newsboat
Slug: newsboat-rss-feeds-kullanimi
Authors: yuceltoluyag
Summary: Terminal tabanlı güçlü bir RSS okuyucu olan Newsboat'u nasıl yapılandıracağınızı ve verimli bir şekilde nasıl kullanacağınızı öğrenin.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/newsboat-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984877153539510
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrley45ms2n

[responsive_img src="/images/newsboat-xl.webp" alt="Newsboat" /]

## Newsboat Nedir? 📰

Newsboat, terminal tabanlı güçlü bir RSS / Atom besleme okuyucusudur. Blog yazıları, haberler ve diğer içerikleri takip etmek için idealdir. Unix benzeri sistemlerde çalışır ve esnek yapılandırma seçenekleri sunar.

## Newsboat Kurulumu 🛠️

Aşağıdaki komutlarla Newsboat ve ek araçları kurabilirsiniz:

```bash
yay -S newsboat mpv youtube-dl dunst
```

- **Mpv**: Medya oynatıcı (videoları oynatmak için kullanılır).
- **youtube-dl**: RSS içindeki video içeriklerini indirmek için kullanılır.
- **Dunst**: Masaüstü bildirimleri için (i3-wm kullanıcıları için gereklidir, diğer masaüstü ortamları için zorunlu değildir).

## Yapılandırma 🛠️

Newsboat'un yapılandırma dosyası `~/.config/newsboat/config` içinde yer alır. Örnek bir yapılandırma:

```bash
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

### URL Listesi 🌐

RSS besleme adresleri `~/.config/newsboat/urls` dosyasına eklenir. Örnek:

```bash

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

## Kullanışlı Kısayollar ⌨️

| Kısayol | İşlevi                   |
| ------- | ------------------------ |
| A       | Tümünü okundu işaretle   |
| O       | Web tarayıcıda aç        |
| J/K     | Aşağı/Yukarı hareket et  |
| Q       | Çıkış yap                |
| R       | RSS beslemelerini yenile |

## YouTube RSS 📺

Abone olduğunuz YouTube kanallarını Newsboat'a eklemek için:

1. [YouTube Abonelikler Sayfası](https://www.youtube.com/subscription_manager){: target="\_blank" rel="noopener noreferrer"}'na gidin.
2. "RSS okuyuculara dışa aktar" seçeneğiyle dosyanızı indirin.
3. Aşağıdaki komutla RSS adreslerini içeri aktarın:

```bash
youtubebotu -i subscription_manager
```

## Newsboat'u Daha Verimli Kullanmak 🎯

Yoğun RSS kullanımı için alias tanımlayabilirsiniz. Örneğin:

```bash
alias haberbotu="newsboat -u ~/.config/newsboat/haberurls -C ~/.config/newsboat/config"
alias youtubebotu="newsboat -u ~/.config/newsboat/yturls -C ~/.config/newsboat/ytconfig"
```

Bu şekilde terminalde `haberbotu` veya `youtubebotu` komutlarını kullanarak doğrudan belirli RSS beslemelerine erişebilirsiniz.

Daha fazla bilgi için [Newsboat Belgeleri](https://newsboat.org/releases/2.19/docs/newsboat.html){: target="\_blank" rel="noopener noreferrer"} sayfasına göz atabilirsiniz. 📖



