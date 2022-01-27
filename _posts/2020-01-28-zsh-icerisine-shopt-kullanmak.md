---
layout: post
title: Zsh içerisinde shopt kullanmak
description: Zsh içerisinde shopt kullanmak
comments: false
edit_url: true
category: linux
tags: [linux, terminal, zsh]
---

Merhaba, Shopt komutu nedir ? Shopt komutu shell(kabuk) bazı eylemlerini değiştirmenize yarar. Bir nevi alias komutu gibi işlev görür Bir örnek verip daha fazla açmak gerekirse : Bir dizine

<!-- excerpt separator -->

```shell
cd dizin

```

komutuyla girerken,bashrc içerisine ekleyeceğiniz shopt komutuyla direkt olarak **dizin** ismini yazıp girebilirsiniz. Tabi ki shopt bunlarlada sınırlı değil. [Detaylar](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html)

# Zsh İçerisinde Kullanım

Shopt bash temelli çalıştığı için zsh shelli içerisinde doğal olarak **'shopt' command not found** hatasını veriyor.

## Çözüm

```shell
touch shopt
```

içerisine şunu yapıştırın.

```shell
#!/bin/bash
args='';
for item in $@
do
args="$args $item";
done
shopt $args;

```

daha sonra bu dosyayı

```shell
sudo mv shopt /usr/bin/
```

daha sonra .zshrc içerisine

```shell
alias shopt='/usr/bin/shopt'

```

komutunu ekleyelim. Afiyet olsun 😊

## Ek Bilgiler

Yedek alırken, BIN kısmına oluşturduğunuz scriptleri shelleri unutuyorsanız(sistem taşırken ben unutuyorum 🤣 )

- [Oto Script Oluşturucuyu](https://github.com/yuceltoluyag/otoscript) deneyebilirsiniz.

```shell
alias shopt='ScriptDizinim/shopt'
```

Yararlanılan Kaynak : [larz258](https://github.com/larz258/Zshopt)

Benim Shopt ayarlarım zsh yada bashrc içerisine ekleyerek test edebilirsiniz.

```shell
#shell opts
shopt -s autocd
shopt -s cdspell
shopt -s cmdhist
shopt -s histappend
shopt -s expand_aliases
shopt -s checkwinsize
shopt -s globstar 2> /dev/null
shopt -s nocaseglob
shopt -s autocd 2> /dev/null
shopt -s dirspell 2> /dev/null
shopt -s cdspell 2> /dev/null

```

{% include info.html content=' [zsh ayarlarım!](https://github.com/yuceltoluyag/dotfiles/blob/master/dotfiles/zshrc){:target="_blank"}{:rel="noopener noreferrer"} +  [Script Oluşturucu!](https://github.com/yuceltoluyag/otoscript){:target="_blank"}{:rel="noopener noreferrer"}' title="Güncelleme" icon="tip" fai="icon-diamonds" %}
