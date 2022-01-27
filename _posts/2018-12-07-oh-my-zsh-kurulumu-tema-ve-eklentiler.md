---
layout: post
title: Oh My ZSH Kurulumu (tema ve eklentiler dahil)
description: Oh My ZSH Kurulumu (tema ve eklentiler dahil)
image: "/assets/images/oh_my_zsh.webp"
category: linux
tags: [linux, terminal, zsh]
comments: false
edit_url: true
toc: true
---

Merhaba, uzun süredir fish shell kullanıyordum. Oh my zsh deneyimlemek istedim. Kurulumda ve kullanımda bir kaç hata(bug) gibi şeylerle karşılaştım. Maalesef yeterince açıklayıcı Türkçe kaynak bulamadım. Resmi ve reposundan arakladığım bilgiler ile tertemiz bir kurulum gerçekleştirdim.

<!-- excerpt separator -->

```shell
sudo apt-get install zsh #debian
sudo pacman -S zsh #arch based

```

Şimdi resmi sitesinde ki ister **curl** ister **wget** li kısmını indirebiliriz. Ben **curl** kullandım.

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"chsh -s /usr/bin/zsh
```

# Bilgilendirme

Bu işlem default shellimizi değiştirecek. Yani varsayılan olarak zsh çalışacak-> Sonraki adımda Şifrenizi yazınız, ve **bilgisayarı yeniden** başlatınız.
Bu adımda ne yapsanızda shelliniz değişmiyor ise izlemeniz gereken iki yol var.

-> Öncelikle daha önce **fish** vb terminal eklentilerini kurduysanız genelde bu sorun bundan kaynaklanıyor. Ben **fish** yerine farklı bir plugin kullanmak istediğimden ötürü bu hata ile karşılaşıyordum.

chsh — s /usr/bla/blashell shelinizi değiştirmeye çalıştığınızda saçma bu hatayı verecektir,Terminal için kabuğu değiştirmemelisiniz

1.  sudo subl /etc/passwd (subl yerine nano gedit vs de kullanabilirsiniz )
2.  /bin/zsh veya değiştirmek istediğiniz pluginin kısa adı ne ise onu yazıyorsunuz. resimde gördüğünüz 1 ve 40 satırdaki kodları zsh olarak değiştiriniz. Sizde farklı yerde olabilir. ![oh-my-zsh](/assets/images/oh_my_zsh.webp)

<font color="orange"> manuel olarak işlemi gerçekleştirdik. Pek sağlıklı bir yöntem değildir lakin fazla bilgi göz çıkarmaz 😅 </font>

<font color="red"> Geçiş işlemlerinde kullandığınız uygulamayı direkt silmeye yeltenmeyin. Örneğin sistemde zsh veya fish kullanıyorsunuz diyelim, bunları kaldırayım başa döneyim istediniz kesinlikle direkt silip nasılsa başlangıca döner mantığıyla düşünmeyin. Son kullanıcıysanız veya temel bilgiye sahipseniz bu durum sizi sıkıntıya sokabilir.😅 Bu sizden eğer shell uygulaması değiştirilecekse önce **chsh — s** bash(örnek) komutuyla değiştirilir. Sistem yeniden başlatılır ve daha sonra zsh,fish kaldırılır. </font>

Yada ev dizininde .bashrc dosyasını açın en alt satıra (yada .bash_profile)

```shell
if [[$- == *i*]]; then export SHELL=zsh exec zsh -l afi

```

yazarak kaydedin terminalizi yeniden başlatın.

## Oh My ZSH tema kurulumu

```shell
subl ~/.zshrc # subl yerine nano gedit vs kullanabilirsiniz.
```

10 satırdaki ZSH_THEME=”robbyrussell” tırnak işareti yerine [ZSH temaları](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes){:target="\_blank"}{:rel="noopener noreferrer"} bu adresteki beğendiğimiz temanın kısa adını yazıyoruz. Örneğin ZSH_THEME=”agnoster”

### Oh My ZSH eklenti kurulumu

```shell
subl ~/.zshrc # subl yerine nano gedit vs kullanabilirsiniz.

```

54 satırdaki plugins=(git) varsayılan olarak gelir. [ZSH eklentileri](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins){:target="\_blank"}{:rel="noopener noreferrer"} buradan beğendiğiniz eklentinin ismini boşluk bırakarak dosyaya yazmanız yeterli örneğin

```shell
plugins=(git extract)
```

burada dosya çıkartma eklentisini aktif etmiş oldum. Kaydedip çıktıktan sonra

```shell
source ~/.zshrc

```

komutunu terminalde çalıştırın tamamdır. Yada terminali kapatıp açabilirsiniz.

Aklınıza takılan soru ve sorunlar için yorum bırakmanız yeterlidir. Sağlıcakla 🤗
