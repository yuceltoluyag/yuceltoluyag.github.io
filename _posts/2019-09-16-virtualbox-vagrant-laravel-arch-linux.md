---
layout: post
title: Archlinux üzerinde Virtualbox + Vagrant + Laravel + Phpmyadmin Kurulumu(Homestead)
description: Archlinux üzerinde Virtualbox + Vagrant + Laravel + Phpmyadmin Kurulumu(Homestead)
image: "/assets/images/pic-selected-190916-0747-49.webp"
category: linux
tags: [linux, laravel]
series: "archlampp"
comments: false
edit_url: true
toc: true
---

{% include series.html %}

## Virtualbox Kurulumu

```shell
sudo pacman -S virtualbox

```

yükle ekranında karşımıza

1. virtualbox-host-dkms
2. virtualbox-host-modules-arch
   <!-- excerpt separator -->
   seçenekleri gelecektir. Hangisini seçeceğinizi bilmiyorsanız

- Eğer **linux kerneli** kullanıyorsanız 2 numarayı yani virtualbox-host-modules-arch seçmelisiniz
- **farklı bir kernel** kullanıyorsanız 1 numarayı yani virtualbox-host-dkms seçmelisiniz.

2 yi seçip işleme devam ediyorum. Kurulum bittikten sonra

```shell
sudo modprobe vboxdrv
```

bu işlemden sonra virtualboxu bir kez çalıştırın **hata** var mı yok mu **kontrol** edin. Hata var ise , aldıgınız hata ile birlikte yorum bırakın yardımcı olmaya çalışırım.

```shell
sudo nano /etc/modules-load.d/virtualbox.conf

```

dosyamızı açıp içerisine **vboxdrv** yazın ardından F3 enter F2 diyerek çıkış yapın. Bu işlemden sonra

Şimdi **Arch Linux** ' a giriş yaptığınız kullanıcıyı '**vboxusers**' sistem grubuna eklemelisiniz. Bunu yaparak normal bir kullanıcının VirtualBox'ı ve tüm özelliklerini kullanmasını sağlayabilirsiniz. Aksi takdirde, VirtualBox'u çalıştırdığınızda birçok kısıtlama göreceksiniz.
Giriş kullanıcınızı 'vboxusers' grubuna eklemek için aşağıdaki komutu çalıştırın:

```shell
sudo usermod -aG vboxusers KULLANICI_ADINIZ
```

Şimdi bilgisayarınızı yeniden başlatın. Bilgisayarınız başlatıldığında, vboxdrv çekirdek modülünün sistem önyüklemesine otomatik olarak yüklenip yüklenmediğini kontrol etmek için aşağıdaki komutu çalıştırın:

```shell
sudo lsmod | grep vboxdrv

```

## Vagrant kurulumu

```shell
yay -S vagrant
```

dilerseniz vagrant plugin & plugin managerlerinide yükleyebilirsiniz

```shell
vagrant plugin install vagrant-vbguest vagrant-share

```

daha sonra vagrant tarafından bize sağlanan hazır imajı indiriyoruz.

```shell
vagrant box add laravel/homestead
```

```shell
==> box: Successfully added box 'laravel/homestead' (güncel sürüm no) for 'virtualbox'!

```

Mesajını gördükten sonra virtualboxa sanal bir makina imajı oluşturuldu.

HomeStead 'ı yükleyelim

Bunun için ev dizinimde www diye klasör oluşturuyorum. Bu oluşturulan klasöre gidip homestead dosyalarını çekiyorum.

```shell
mkdir www
cd www
git clone https://github.com/laravel/homestead.git Homestead
```

sırasıyla bu komutları uygularsanız home klasörünüzün altında **www** altında **homestead** adında bir klasör oluşacaktır. [**home/kullaniciadiniz/www/homestead**]

```shell
cd ~/www/homestead
bash init.sh

```

**Homestead initialized!** yazısını göreceksiniz : )
Bu adımdan sonra Homestead.yaml dosyamızı düzenleyeceğiz. /home/kadi/www/Homestead/Homestead.yaml

<script src="https://gist.github.com/yuceltoluyag/5e0dac9ef4c2da7c27cd278cac7140e4.js"></script>

bu dosyayı açtığınızda **Code** yazan kısımları **www** ile değiştirdim. Çünkü biz www isminde klasör oluşturduk. Aşağıda ki to yazan kısım ise virtualboxta ki sanal sunucumuzla bağlantı kuracağı adrestir. Dosyanın başında gördüğünüz üzere ip: "192.168.10.10" **adresini yönlendirme ip'si olarak kullanacağız.** Oluşturduğum **laravel6.test** domainine ulaşabilmek için host dosyamızı düzenlemeliyiz.

```shell
sudo nano /etc/hosts
```

içerisine ekleyin.

```shell
192.168.10.10 laravel6.test

```

F3 ardından enter ve F2 ile çıkın

```shell
cd /home/kullaniciadin/www/Homestead
vagrant up
```

komutunu verin, ilk açılışta biraz uzun sürebilir. Hata alırsanız yorum bırakmayı unutmayınız : )

```shell
vagrant ssh

```

![vagrant_ssh](/assets/images/pic-selected-190916-0747-49.webp)

resimde görüldüğü üzere makinemize ssh ile bağlandık. Daha sonra

```shell
cd www
composer create-project --prefer-dist laravel/laravel
```

laraveli makinemize kuruyoruz. bu işlemden sonra otomatik olarak www klasörünüzün içerisine laravel isminde klasör oluşacaktır.

![vagrant_laravel_windows10_installed](/assets/images/pic-full-190916-0808-36.webp)

## phpmyadmin kurulumu

SSH'ta bağlı veya değilseniz bile www klasöründe olmalısınız. Aksi taktirde yaptığınız tüm işlemler o anki bulunduğunuz dizinde gerçekleşir. 😲

![vagrant_phpmyadmin_installed](/assets/images/pic-selected-190916-0818-54.webp)

```shell
curl -sS https://raw.githubusercontent.com/grrnikos/pma/master/pma.sh | sh

```

şimdi bu dizine ulaşabilmek için yukarıda yaptığımız gibi host dosyası aracılığıyla yönlendirme yapalım.

```shell
sudo nano /etc/hosts
```

içerisine ekleyin.

```shell
192.168.10.10 laravel6.test #bunu daha önce eklemiştik altına ekliyoruz.
192.168.10.10 phpmyadmin.test

```

F3 ardından enter ve F2 ile çıkın

homestead.yaml dosyamızı düzenleyelim. Heryeri proje eklediğinizde sadece sites yazan kısmın altına ekleyeceksiniz. Bu bir uygulama(phpmyadmin,eklenti,yeni bir proje vs vs vs)

```shell
sites:
-- map: laravel6.test
to: /home/vagrant/www/laravel6/public
-- map: phpmyadmin.test
to: /home/vagrant/www/phpmyadmin
```

[http://phpmyadmin.test/](http://phpmyadmin.test/) girdiğinizde kullanıcı adı **homestead** şifre **secret**

{% include youtubePlayer.html id="d9ITbD5Mn3w" title="Archlinux üzerinde Virtualbox" %}
