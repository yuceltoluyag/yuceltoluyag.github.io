Title: Arch Linux Laravel Valet Kurulumu
Date: 2020-06-15 14:00 10:00
Modified: 2025-08-11 22:59
Category: Laravel
Tags: linux, laravel
Slug: arch-linux-laravel-valet-kurulumu
Authors: yuceltoluyag
Series: ArchLampp
Series_index: 4
Summary: Valet Linux, minimalist geliştirme ortamını sevenler için ideal bir Laravel geliştirme ortamıdır. Vagrant veya /etc/hosts ayarlamaya gerek kalmadan, yerel tünelleri kullanarak sitelerinizi kolayca paylaşabilirsiniz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/laravel-valet-kurulumu-linux-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984831738660096
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrkqgach22k

## Merhaba 👋

Valet Linux, minimalist bir geliştirme ortamını tercih edenler için Laravel geliştirme ortamıdır. [Vagrant](/archlinux-virtualbox-vagrant-laravel-phpmyadmin-kurulumu){: target="\_blank" rel="noopener noreferrer"} veya `/etc/hosts` ayarlamaya gerek yoktur. Yerel tünelleri (Ngrok vb.) kullanarak sitelerinizi herkese açık olarak paylaşabilirsiniz. 🚀

Valet, sisteminizi makine açıldığında **Nginx'i arka planda çalıştıracak şekilde yapılandırır**. Ardından, **DnsMasq** kullanarak `*.test` uzantılı domainlerinizi ilgili dizinlere yönlendirir. **Sadece 7MB RAM kullanarak çalışan, hızlı ve hafif bir Laravel geliştirme ortamı sunar.** 🎯

!!! warning "Önceki Kurulumlar Daha önce <a href='https://yuceltoluyag.github.io/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/' rel='noopener noreferrer' target='_blank'>Arch Linux Lampp Kurulumu (PHP7x + MariaDB + MySQL + PhpMyAdmin)</a> veya benzeri kurulumlar yaptıysanız, devre dışı bırakmalı ya da kaldırmalısınız. Aksi takdirde çakışmalar yaşanabilir."

## 🛠 Kurulum

Terminali açın ve aşağıdaki komutları sırasıyla çalıştırın:

```bash
pacman -S nss jq xsel networkmanager
```

PHP'nin kurulu ve 5.6'dan yüksek bir sürüm olduğundan emin olun:

```bash
pacman -S php # Kurulum sonrası kontrol için: php -v
```

Gerekli ek PHP paketlerini yükleyin:

```bash
yay -S php71-mcrypt
```

İsteğe bağlı paketler:

```bash
yay -S php php-dblib php-fpm php-gd php-odbc php-pgsql php-sqlite
```

Composer kurun:

```bash
yay -S composer
```

Daha sonra `.bashrc` içerisine şu satırı ekleyin:

```bash
PATH="$HOME/.config/composer/vendor/bin:$PATH"
```

Composer'ı hazır hale getirin ve Valet Linux'u yükleyin:

```bash
composer global require cpriego/valet-linux
```

## 🎉 Valet ile Çalışma

Ana dizine gidip `Sites` adında bir klasör oluşturun:

```bash
mkdir ~/Sites
```

Bu klasör içinde her alt klasör bir domain adı gibi çalışacaktır. Örneğin, `blog` isimli bir Laravel projesi oluşturup park edelim:

```bash
cd ~/Sites
php valet park
laravel new blog
```

Tarayıcıdan **http://blog.test** adresine girerek projenizi görüntüleyebilirsiniz! 🎊

## 🌍 Valet Link Komutu

Belirli bir proje için özel link oluşturabilirsiniz:

```bash
valet link projeadi
```

Bağlantıları listelemek için:

```bash
valet links
```

[responsive_img src="/images/laravel-valet-link-archlinux-xl.webp" alt="Laravel Valet Link Arch Linux" /]

## 🔧 Domain Uzantısını Değiştirme

Varsayılan `.test` uzantısını değiştirmek isterseniz:

```bash
valet domain .app
```

Mevcut domain uzantısını öğrenmek için:

```bash
valet domain
```

Valet'in kullandığı portu değiştirmek için:

```bash
valet port xxxx # xxxx yerine yeni port numarasını yazın
```

## 🔒 SSL Hatalarını Giderme

Özellikle `.app` veya `.dev` gibi uzantılar kullanıldığında SSL hatası alabilirsiniz. Bunu önlemek için:

```bash
valet secure projeadi
```

SSL'yi devre dışı bırakmak için:

```bash
valet unsecure projeadi
```

## 📺 Video Anlatım

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="-Qdxa0XjkgQ"></lite-youtube>

## 📚 Kaynaklar

- [Valet Linux Resmi Belgeleri](https://cpriego.github.io/valet-linux/index#installation){: target="\_blank" rel="noopener noreferrer"}
- [Valet Linux Gereksinimler](https://cpriego.github.io/valet-linux/requirements.html#arch){: target="\_blank" rel="noopener noreferrer"}

🎯 Artık Valet ile Laravel projelerinizi hızla geliştirebilir ve yerel ortamınızı optimize edebilirsiniz! 🚀

[responsive_img src="/images/laravel-valet-kurulumu-linux-xl.webp" alt="Laravel Valet Kurulumu" /]



