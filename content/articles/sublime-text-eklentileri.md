Title: Kullandığım Enfes Sublime Text Eklentileri
Date: 2018-09-10 10:00 10:00
Modified: 2025-03-08 12:00
Category: Geliştirme Araçları
Tags: ipucu, sublime
Slug: sublime-text-eklentileri
Authors: yuceltoluyag
Summary: Kullandığım en faydalı Sublime Text eklentilerini ve temalarını tanıtıyorum.
Translation: false
Status: published
Template: article
Image: images/AFileIcon.webp

Merhaba! Bugün, Sublime Text editörü üzerinde kullandığım bazı harika eklenti ve temaları sizlerle paylaşacağım. 🥳

## Sublime Text Eklenti Kurulumu

Öncelikle Sublime Text 3 sürümünü kullandığımı belirtmek isterim. Editöre paket yüklemek için şu adımları izleyebilirsiniz: **view -> show console** menüsünü açın ve sürümünüze uygun gerekli kodları yapıştırarak Enter tuşuna basın. Paket yüklendikten sonra `Ctrl + Shift + P` kombinasyonu ile paket yöneticisini açabilir ve `Install` yazıp Enter’a basarak kurmak istediğiniz paketi seçebilirsiniz.  

<div class="info-box important">
    <strong>Güncelleme:</strong> <code>Ctrl + Shift + P</code> tuşlarına basarak 'Install Package Manager' seçeneğiyle paket yöneticisini kolayca yükleyebilirsiniz.
</div>




Ayarlarımı GitHub'dan alabilirsiniz: [Sublime Repom](https://github.com/yuceltoluyag/sublime-text-3){: target="_blank" rel="noopener noreferrer"} ve **Alternatif Ayarlarım**
<script src="https://gist.github.com/yuceltoluyag/51b4391d44cfc353aad0d1731b56c39f.js"></script>
## EMMET

Emmet, kod yazma hızınızı önemli ölçüde artırabilecek harika bir eklentidir. Ancak, kod yazmaya yeni başlayanlara önerilmez.

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

Düzen takıntınız varsa, bu eklenti tam size göre! Kodlarınızı hizalamak ve düzenlemek için kullanabilirsiniz. `Ctrl + Alt + A` tuşlarına basarak düzenlemeleri kolayca yapabilirsiniz.

## SublimeGit

Sublime Text için Git entegrasyonu sağlayan harika bir eklentidir. Dökümantasyon için [SublimeGit Dökümantasyon](https://sublimegit.readthedocs.io/en/latest/){: target="_blank" rel="noopener noreferrer"} sayfasını ziyaret edebilirsiniz.

## GitGutter

GitGutter, projenizde yaptığınız değişiklikleri gösteren bir eklentidir. `git status` komutunun Sublime'deki halini düşünebilirsiniz.



## GitHubinator

Bu eklenti, seçtiğiniz alanı doğrudan GitHub reposunda aramanıza yardımcı olur. Artık "Acaba bunu nerede yazmışım?" sorusu ortadan kalkıyor.

![GitHubinator](/images/GitHubinator.webp)

## GitOpenChangedFiles

GitGutter'dan farkı, yalnızca değişiklik yapılan satırları gösterip, repo içinde arama yapabilmesidir. `Ctrl + Shift + O` tuşlarına basarak hızlıca kullanabilirsiniz.



## SublimeLinter

SublimeLinter, kod hatalarını ve uyarılarını göstermek için harika bir araçtır. [SublimeLinter Dökümantasyonu](http://www.sublimelinter.com){: target="_blank" rel="noopener noreferrer"} adresini mutlaka inceleyin.

![SublimeLinter](/images/SublimeLinter.webp)

## ChangeQuotes

Bu eklenti, özellikle çift tırnakları tek tırnakla değiştirme işini çok kolaylaştırıyor. Hızlı bir işlem için mükemmel bir yardımcıdır.

## SidebarEnhancements

Bu eklentiyle birlikte, sol taraftaki sidebarda sağ tıkladığınızda pek çok ek özellik eklenir.

![SidebarEnhancements](/images/Side​Bar​Enhancements.webp)

## BracketHighlighter

Bu eklenti, seçtiğiniz etiketi veya parantezi nerede açıp nerede kapandığını görmenizi sağlar.

![BracketHighlighter](/images/BracketHighlighter.webp)

## Gutter Color

Renk seçimlerinizi ekstra bir program kullanmadan rahatça yapabilirsiniz. Ayrıca **Color Highlighter** kullanarak renklerinizi doğrudan görmek mümkündür.

![GutterColor](/images/GutterColor.webp)

## AlignTab

Vim editöründeki tabuler hizalamayı taklit eden bu eklenti, çok sayıda özellik sunuyor.

![AlignTab](/images/AlignTab.webp)

## AutoFileName

Dosya yollarınızı otomatik olarak tamamlar. Eksik dosya yolları yazıldığında öneri gelmez, böylece hataları azaltabilirsiniz.

## HTML-CSS-JS Prettify

HTML, CSS, JavaScript ve JSON kodlarını formatlamak için kullanılan bir eklentidir.

## DocBlockr

Bu eklenti, kod bloklarınızın üzerine açıklamalar eklemenizi sağlar.



## A File Icon

Dosya uzantılarına göre simgeler ekler, böylece dosyalarınız daha düzenli görünür.

![AFileIcon](/images/AFileIcon.webp)

## Tema

Material Tema kullanıyorum: [Material Theme GitHub Sayfası](https://github.com/equinusocio/material-theme){: target="_blank" rel="noopener noreferrer"}.



Yeni kullandığım temalar ve pluginler hakkında bilgi almak için [GitHub Repo](https://github.com/yuceltoluyag/sublime-text-3){: target="_blank" rel="noopener noreferrer"}

### Ayarlarım

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
