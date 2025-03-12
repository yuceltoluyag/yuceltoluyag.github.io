Title: Arch Linux Laravel Valet Kurulumu
Date: 2020-06-15 14:00 10:00
Modified: 2025-03-08 12:00
Category: linux
Tags: linux, laravel
Slug: arch-linux-laravel-valet-kurulumu
Authors: yuceltoluyag
Series: ArchLampp
Series_index: 4
Summary: Valet Linux, minimalist geliştirme ortamını sevenler için ideal bir Laravel geliştirme ortamıdır. Vagrant veya /etc/hosts ayarlamaya gerek kalmadan, yerel tünelleri kullanarak sitelerinizi kolayca paylaşabilirsiniz.
Translation: false
Status: published
Template: article

![Laravel Valet Kurulumu](/images/laravel-valet-kurulumu-linux.webp)

# Merhaba 👋

Valet Linux, minimalist bir geliştirme ortamını tercih edenler için Laravel geliştirme ortamıdır. [Vagrant](/archlinux-virtualbox-vagrant-laravel-phpmyadmin-kurulumu){: target="_blank" rel="noopener noreferrer"} veya `/etc/hosts` ayarlamaya gerek yoktur. Yerel tünelleri (Ngrok vb.) kullanarak sitelerinizi herkese açık olarak paylaşabilirsiniz. 🚀

Valet, sisteminizi makine açıldığında **Nginx'i arka planda çalıştıracak şekilde yapılandırır**. Ardından, **DnsMasq** kullanarak `*.test` uzantılı domainlerinizi ilgili dizinlere yönlendirir. **Sadece 7MB RAM kullanarak çalışan, hızlı ve hafif bir Laravel geliştirme ortamı sunar.** 🎯

<div class="info-box error">
<b>Not:</b> Daha önce 
<a href="https://yuceltoluyag.github.io/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/" target="_blank" rel="noopener noreferrer"> Arch Linux Lampp Kurulumu (PHP7x + MariaDB + MySQL + PhpMyAdmin) </a>veya benzeri kurulumlar yaptıysanız, devre dışı bırakmalı ya da kaldırmalısınız. Aksi takdirde çakışmalar yaşanabilir.
</div>
## 🛠 Kurulum

Terminali açın ve aşağıdaki komutları sırasıyla çalıştırın:

```shell
pacman -S nss jq xsel networkmanager
```

PHP'nin kurulu ve 5.6'dan yüksek bir sürüm olduğundan emin olun:

```shell
pacman -S php # Kurulum sonrası kontrol için: php -v
```

Gerekli ek PHP paketlerini yükleyin:

```shell
yay -S php71-mcrypt
```

İsteğe bağlı paketler:

```shell
yay -S php php-dblib php-fpm php-gd php-odbc php-pgsql php-sqlite
```

Composer kurun:

```shell
yay -S composer
```

Daha sonra `.bashrc` içerisine şu satırı ekleyin:

```shell
PATH="$HOME/.config/composer/vendor/bin:$PATH"
```

Composer'ı hazır hale getirin ve Valet Linux'u yükleyin:

```shell
composer global require cpriego/valet-linux
```

## 🎉 Valet ile Çalışma

Ana dizine gidip `Sites` adında bir klasör oluşturun:

```shell
mkdir ~/Sites
```

Bu klasör içinde her alt klasör bir domain adı gibi çalışacaktır. Örneğin, `blog` isimli bir Laravel projesi oluşturup park edelim:

```shell
cd ~/Sites
php valet park
laravel new blog
```

Tarayıcıdan **http://blog.test** adresine girerek projenizi görüntüleyebilirsiniz! 🎊

## 🌍 Valet Link Komutu

Belirli bir proje için özel link oluşturabilirsiniz:

```shell
valet link projeadi
```

Bağlantıları listelemek için:

```shell
valet links
```

![Laravel Valet Link Arch Linux](/images/laravel-valet-link-archlinux.webp)

## 🔧 Domain Uzantısını Değiştirme

Varsayılan `.test` uzantısını değiştirmek isterseniz:

```shell
valet domain .app
```

Mevcut domain uzantısını öğrenmek için:

```shell
valet domain
```

Valet'in kullandığı portu değiştirmek için:

```shell
valet port xxxx # xxxx yerine yeni port numarasını yazın
```

## 🔒 SSL Hatalarını Giderme

Özellikle `.app` veya `.dev` gibi uzantılar kullanıldığında SSL hatası alabilirsiniz. Bunu önlemek için:

```shell
valet secure projeadi
```

SSL'yi devre dışı bırakmak için:

```shell
valet unsecure projeadi
```

## 📺 Video Anlatım

<iframe width="560" height="315" src="https://www.youtube.com/embed/-Qdxa0XjkgQ?si=VA6YUYm0A3q2lciz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 📚 Kaynaklar

- [Valet Linux Resmi Belgeleri](https://cpriego.github.io/valet-linux/index#installation){: target="_blank" rel="noopener noreferrer"}
- [Valet Linux Gereksinimler](https://cpriego.github.io/valet-linux/requirements.html#arch){: target="_blank" rel="noopener noreferrer"}

🎯 Artık Valet ile Laravel projelerinizi hızla geliştirebilir ve yerel ortamınızı optimize edebilirsiniz! 🚀

