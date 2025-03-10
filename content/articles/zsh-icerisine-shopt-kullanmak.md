Title: Zsh İçerisinde Shopt Kullanmak
Date: 2020-01-28 12:00 10:00
Modified: 2025-03-08 12:00
Category: linux
Tags: linux, terminal, zsh
Slug: zsh-icerisinde-shopt-kullanmak
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 2
Summary: Zsh içerisinde shopt komutunun nasıl kullanılacağını ve bash uyumsuzluklarını çözme yöntemlerini adım adım açıklıyoruz.
Translation: false
Status: published
Template: article

Merhaba! 😊

Shopt komutu nedir? `shopt` komutu, shell (kabuk) içerisindeki bazı eylemleri değiştirmenize olanak tanır. Bir bakıma alias komutuna benzer işlev görür. Şimdi bir örnek üzerinden açıklayalım.

Bir dizine `cd dizin` komutuyla girerken, bashrc dosyasına ekleyeceğiniz `shopt` komutuyla direkt olarak **dizin** ismini yazıp bu dizine girebilirsiniz. Tabi ki `shopt` komutunun kullanım alanları bunlarla sınırlı değildir. Daha fazla bilgi için [Detaylar](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html) adresini ziyaret edebilirsiniz.

# Zsh İçerisinde Kullanım

Shopt, bash temelli çalıştığı için zsh shell'inde doğal olarak **'shopt command not found'** hatası alırsınız. Bunun çözümü ise oldukça basittir.

## Çözüm

Öncelikle, terminalinizde aşağıdaki komutu girin:

```shell
touch shopt
```

Sonrasında oluşturduğunuz dosyayı şu kodla güncelleyin:

```shell
#!/bin/bash
args='';
for item in $@
do
args="$args $item";
done
shopt $args;
```

Daha sonra bu dosyayı aşağıdaki komutla sisteme taşıyın:

```shell
sudo mv shopt /usr/bin/
```

Son olarak `.zshrc` dosyanıza şu komutu ekleyin:

```shell
alias shopt='/usr/bin/shopt'
```

Bu kadar! Artık Zsh içerisinde `shopt` komutunu sorunsuz şekilde kullanabilirsiniz. Afiyet olsun! 😄

## Ek Bilgiler

Yedek alırken, oluşturduğunuz script'leri unutmamanız oldukça önemli. Özellikle sistem taşımaları sırasında ben bazen unutabiliyorum. 🤣

Eğer script'leri unutmamak istiyorsanız, [Oto Script Oluşturucuyu](https://github.com/yuceltoluyag/otoscript) kullanabilirsiniz.

```shell
alias shopt='ScriptDizinim/shopt'
```

Yararlanılan Kaynak: [larz258](https://github.com/larz258/Zshopt)

Aşağıdaki `shopt` ayarlarını `.zshrc` veya `.bashrc` dosyanıza ekleyerek test edebilirsiniz:

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

[Zsh Ayarlarım!](https://github.com/yuceltoluyag/WindowsTerminal/blob/main/WSL/.zshrc) +  [Script Oluşturucu!](https://github.com/yuceltoluyag/otoscript)
