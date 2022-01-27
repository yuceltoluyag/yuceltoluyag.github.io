---
layout: post
title: Kullandığım Enfes Sublime Text Eklentileri
description: Kullandığım Enfes Sublime Text Eklentileri
category: editor
tags: [ipucu, sublime]
comments: false
edit_url: true
toc: true
---

Merhaba, sublime text editörü üzerinde kullandığım eklenti ve temaları siz değerli takipçilerimle paylaşıyorum 🥳

## Sublime Text Eklenti Kurulumu

Öncelikle Sublime Text **3** versiyonunu kullanmaktayım. Editörümüze paket yükleyebilmek için ; ~~**view-> show console** açıp sürümünüze göre gerekli kodları yapıştırıp entere basmanız gerekli [Kodları buradan alabilirsiniz ](https://packagecontrol.io/installation){:target="\_blank"}{:rel="noopener noreferrer"} ,eklentiyi yükledikten sonra ctrl + shift + p kombinasyonuyla paket menajerimizi açabiliriz. İnstall yazıp entere basın önünüze bir sekme daha gelecek kuracağınız paketin ismini yazın bu kadar : )~~

{% include info.html content="ctrl+shift+ p basın `install package manager` seçin,koda gerek olmadan paket yöneticisini yükleyebilirsiniz." title="Güncelleme" icon="tip" fai="icon-diamonds" %}

<!-- excerpt separator -->

Ayarlarımı github repomdan kopyalayabilirsiniz [Sublime Repom](https://github.com/yuceltoluyag/sublime-text-3){:target="\_blank"}{:rel="noopener noreferrer"} + [Alternatif Ayarlarım](https://gist.github.com/yuceltoluyag/51b4391d44cfc353aad0d1731b56c39f){:target="\_blank"}{:rel="noopener noreferrer"}

## EMMET

Emmet kod yazma hızınızı artıracak mükemmel bir eklentidir. Kod yazmaya yeni başlayan arkadaşlara **tavsiye etmiyorum**.

```html
#page>div.logo+ul#navigation>li*5>a{Item $} #çıktısı şu şekilde olacaktır.
```

```html
<div id="page">
  <div class="logo"></div>
  <ul id="navigation">
    <li><a href="">Item 1</a></li>
    <li><a href="">Item 2</a></li>
    <li><a href="">Item 3</a></li>
    <li><a href="">Item 4</a></li>
    <li><a href="">Item 5</a></li>
  </ul>
</div>
```

## Alignment

Bu eklentiyle benim gibi düzen takıntısı olan için 😁 Bu eklenti kodlarınızı hizalamaya ve düzenlemeye yarıyor. **Ctrl + alt + a** ya basarak düzene sokabilirsiniz.

## SublimeGit

Sublime Text için Git paketi,dökümanı için [Sublimegit Dökümantasyon](https://sublimegit.readthedocs.io/en/latest/){:target="\_blank"}{:rel="noopener noreferrer"} adresini inceleyebilirsiniz.

## GitGutter

Sidebar'da projeniz üzerinde yaptığınız değişiklikleri gösteriyor. `git status` komutunun sublimedeki hali olarak düşünebilirsiniz.

![GitGutter](/assets/images/GitGutter.gif)

## GitHubinator

Bu eklenti sublimetext içerisinde seçtiğiniz alanı github reponuzda aramaya yarıyor, acaba bunu nerede yazmışım derdine son

![GitHubinator](/assets/images/GitHubinator.webp)

## GitOpenChangedFiles

Bu eklentinin gitgutter den farkı sadece değişiklik yapılmış satırları gösterip repo da aratıp toplama yapabilmesi :D **ctrl+shift+o** kısayol tuşunu kullanabilirsiniz.

![GitOpenChangedFiles](/assets/images/GitOpenChangedFiles.gif)

## SublimeLinter

Sublime içerisinde kod hatalarını,uyarılarını gösteren harika bir eklentidir. [http://www.sublimelinter.com](http://www.sublimelinter.com/){:target="\_blank"}{:rel="noopener noreferrer"} Belgelerini mutlaka okuyun. Projede çalıştığınız dile göre ayrı ayrı paketleri bulunmaktadır. Örneğin ( **SublimeLinter-jshint, SublimeLinter-php** paketleri )

![SublimeLinter](/assets/images/SublimeLinter.webp)

## ChangeQuotes

Bu en çok kullandığım eklentidir. Özellikle satır içerisinde ki çift tırnakları tek tırnak yapmak, PDO'da işimi kolaylaştırıyor.Eringeçlik değil hız hız 🙃 Bunun haricinde paket sisteminde **SASS BABEL Siteleaf Liquid Syntax** aratarak renklendirme sınıf ve eklentilerini kullanabilirsiniz.

## SidebarEnhancements

Normalde sol taraftaki sidebarda sağ tıkladığınızda açılan menüde çok fazla fonksiyon yoktur. Bu eklentiyle birlikte sidebar'a bir çok özellik eklenir.
![SidebarEnhancements](/assets/images/Side​Bar​Enhancements.webp)

## BracketHighlighter

Bu eklenti seçtiğiniz tagın nerede başlayıp nerede kapandığını gösterir.

![BracketHighlighter](/assets/images/BracketHighlighter.webp)

## Gutter Color

Bu eklenti sayesinde renk seçimlerinizi ekstra bir program olmadan rahatça seçebileceksiniz. Ayrıca **Color Highlighter** kullanarak renk kodlarınızı renkli görebilirsiniz.

![GutterColor](/assets/images/GutterColor.webp)

## AlignTab

VIM editörün tabular eklentisinden ilham alırak yapılmıştır.

- Normal ifadeyi kullanarak hizala

- Özel boşluk, dolgu ve gerekçelendirme.

- Herhangi bir çizgi seçilmezse hizalama için akıllı algılama

- Çoklu imleç desteği

- Tablo modu ve Canlı önizleme modu özellikleri mevcuttur

- Daha fazlası için [Github](https://github.com/randy3k/AlignTab){:target="\_blank"}{:rel="noopener noreferrer"} sayfasına göz atın.

![AlignTab](/assets/images/AlignTab.webp)

## AutoFileName

Dosya yollarınızı otamatik olarak önünüze çıkartır. Olmayan bir dizin yazdığınızda öneriler çıkmaz. Css Js vb gibi dosyaları çağırırken ki yaptığımız hataları bir nebze olsada azaltır.

## HTML-CSS-JS Prettify

HTML, CSS, JavaScript ve JSON kod biçimlendiricisi

## DocBlockr

Kod bloklarımızın üzerine açıklamalar yazarız ya işte buda o işe yarıyor /\*\* Açıklama tab şeklinde kullanımı var diğer kullanımlar için [github](https://github.com/spadgos/sublime-jsdocs){:target="\_blank"}{:rel="noopener noreferrer"} sayfasına bakınız

![DocBlockr](/assets/images/DocBlockr.gif)

## A File Icon

Dosyaların uzantılarına göre simgeler atıyor sidebarın daha şık görünmesini ayrıca dosyaların karışmasında engelliyor.Küçük pencerelerde çalışanlar için ideal.

![AFileIcon](/assets/images/AFileIcon.webp)

## Tema ?

Material Tema Kullanıyorum [https://github.com/equinusocio/material-theme](https://github.com/equinusocio/material-theme){:target="\_blank"}{:rel="noopener noreferrer"}

![DocBlockr](/assets/images/material-theme.gif)

{% include info.html content="Yeni kullandığım temalar ve pluginler (Özellikle PHP kodlayan arkadaşlar içindir) [https://github.com/yuceltoluyag/sublime-text-3](https://github.com/yuceltoluyag/sublime-text-3){:target='_blank'}{:rel='noopener noreferrer'}" title="Ek Bilgi" icon="abstract" fai="icon-diamonds" %}

Ayarlarım

```conf
{
"always_show_minimap_viewport": true,
"bold_folder_labels": true,
"color_scheme": "Packages/MaterialTheme/schemes/Material-Theme.tmTheme",
"font_face":"Hack",
"font_options": ["gray_antialias",
"subpixel_antialias"],
"font_size": 18,
"ignored_packages": ["Vintage"],
"indent_guide_options": ["draw_normal",
"draw_active"],
"line_padding_bottom": 3,
"line_padding_top": 3,
"material_theme_accent_acid-lime": true,
"material_theme_accent_blue": true,
"material_theme_accent_brba": true,
"material_theme_accent_bright-teal": true,
"material_theme_accent_cyan": true,
"material_theme_accent_graphite": true,
"material_theme_accent_indigo": true,
"material_theme_accent_lime": true,
"material_theme_accent_orange": true,
"material_theme_accent_pink": true,
"material_theme_accent_purple": true,
"material_theme_accent_red": true,
"material_theme_accent_scrollbars": true,
"material_theme_accent_sky": true,
"material_theme_accent_titlebar": true,
"material_theme_accent_tomato": true,
"material_theme_accent_yellow": true,
"material_theme_arrow_folders": true,
"material_theme_big_fileicons": true,
"material_theme_bold_tab": true,
"material_theme_bright_scrollbars": true,
"material_theme_bullet_tree_indicator": true,
"material_theme_compact_panel": true,
"material_theme_compact_sidebar": true,
"material_theme_contrast_mode": true,
"material_theme_disable_fileicons": true,
"material_theme_disable_folder_animation": true,
"material_theme_disable_tree_indicator": true,
"material_theme_panel_separator": true,
"material_theme_small_statusbar": true,
"material_theme_small_tab": true,
"material_theme_tabs_autowidth": true,
"material_theme_tabs_separator": true,
"material_theme_titlebar": true,
"material_theme_tree_headings": true,
"overlay_scroll_bars": "enabled",
"theme": "Material-Theme.sublime-theme"
}
```
