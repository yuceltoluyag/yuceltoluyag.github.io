---
layout: post
title: Phpstorm içerisinde CS Fixer Kullanmak
description: Phpstorm içerisinde CS Fixer Kullanmak
image: "/assets/images/php_phpstorm_csfixer.webp"
category: program
tags: [phpstorm, cmder]
series: "phpstorm"
comments: false
edit_url: true
toc: true
---

# PSR standartı nedir ?

PSR kısaca kod yazım standartıdır. Günümüz IDE 'leri **code refactor** adı altında bu işlemi **otamatik** hale getirdiği için,çoğu yazılımcı'nın bu standarttan haberi olmaz(Freelancer için geçerli genelde). Başlarda otamatik işlemi otomatik yapan IDE ler standartlar değiştikçe bu işlemi extra olarak kullanıcıya bırakabiliyor.

<!-- excerpt separator -->

{% include series.html %}

> **Deprecated** - As of 2019-08-10 PSR-2 has been marked as deprecated. [PSR-12](https://www.php-fig.org/psr/psr-12/){:target="\_blank"}{:rel="noopener noreferrer"} is now recommended as an
> alternative.

[PSR-2](https://www.php-fig.org/psr/psr-2/){:target="\_blank"}{:rel="noopener noreferrer"} kod standartının kullanımı artık tavsiye edilmiyor. Lakin bu işlemi IDE ile yapıyorsanız direkt olarak psr-12 ye geçmenizi tavsiye etmem,bug değilde problemleri var gibi.(Henüz tam oturmadı gibi) [psr-12 hakkında](https://github.com/FriendsOfPHP/PHP-CS-Fixer/issues/4502){:target="\_blank"}{:rel="noopener noreferrer"}

# PHPSTORM içerisinde kullanmak

- Daha önceleri ekstra ayarlar yaparken,phpstorm 2018.3 versiyonundan itibaren varsayılan özellik olarak eklenmiştir. [PHP CS Fixer Support ](https://blog.jetbrains.com/phpstorm/2018/09/phpstorm-2018-3-early-access-program-is-open/){:target="\_blank"}{:rel="noopener noreferrer"}
- [Composer](https://getcomposer.org/download/){:target="\_blank"}{:rel="noopener noreferrer"} kurunuz.
- php-cs-fixer 'i composer yardımıyla kurun.

```shell
composer global require friendsofphp/php-cs-fixer

```

- Settings->Languages & Frameworks->PHP->Quality Tools->PHP Cs Fixer-> Configuration menüsü altından csfixerin kurulu olduğu yeri gösteriyoruz.

```shell
C:\Users\kullaniciadiniz\AppData\Roaming\Composer\vendor\bin\php-cs-fixer.bat #windows için
/home/kullaniciadiniz/.composer/vendor/bin/php-cs-fixer #linux için
```

Yollarını yazmalısınız. Validate(Doğrulama) butonuna basıp alta cs fixerin sürüm bilgilerinin geldiğini görün.

![phpstorm_inside_phpcsfixer](/assets/images/php_phpstorm_csfixer.webp)
![phpstorm_inside_phpcsfixer](/assets/images/php_phpstorm_csfixer2.webp)
![phpstorm_inside_phpcsfixer](/assets/images/php_phpstorm_csfixer3.webp)

- Settings->Tools->+ Butonuna basıp yeni ekleyin->
- Name : Kısmına istediğinizi yazabilirsiniz
- Description : Kısmına istediğiniz açıklama yazabilirsiniz
- Program : Kısmına CSFixer in kurulu olduğu yol,üste vermiştim
- Arguments : Kısmına Kullanmak istediğiniz argümanlar [Cs Fixer Kullanımı](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){:target="\_blank"}{:rel="noopener noreferrer"} kısmından hangi argümanın ne işe yaradığını okuyabilirsiniz. Burada tüm argümanları buraya yazmak yerine config dosyasının yolunu göstererek, tüm ayarlarımı bu dosya içerisinde yapıyorum.

```shell
fix --verbose --config=C:\xampp\htdocs\urunsat\.php_cs.dist --path-mode=intersection "$FileDir$/$FileName$"

```

- Working Directory : Kısmına ise, bu işlemi sadece bu dosyada çalıştırmayabiliriz. Diğer projelerimize geçtiğimizde elle girmek yerine **insert macro** kısmından

```shell
$ProjectFileDir$
```

Seçiyoruz. Bu sayede ,diğer projelerimiz içerisindede cs fixer işlemini kullanabiliyoruz.

![phpstorm_inside_phpcsfixer](/assets/images/php_phpstorm_csfixer4.webp)

Örnek php_cs dosyası [.php_cs_dist](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/master/.php_cs.dist){:target="\_blank"}{:rel="noopener noreferrer"} linkinden verilmiştir. [Cs Fixer Kullanımı](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){:target="\_blank"}{:rel="noopener noreferrer"} kısmından edindiğiniz bilgilere göre düzenleyin. Diğer bir örnek [Doctrine coding style](https://gist.github.com/azdanov/8f637142115feebf4b44e11a0971e5cb){:target="\_blank"}{:rel="noopener noreferrer"}

Phpstorm'u yeniden başlatın. Tools -> External Tools-> Menüsü altında Verdiğiniz isimde görünecektir. Kısayol eklemek isterseniz Settings->Keymap->External Tools-> Verdiğiniz isim adında görünecektir. Ben alt+f eklediğim,siz dilediğinizi ekleyebilirsiniz.

![phpstorm_inside_phpcsfixer](/assets/images/php_phpstorm_csfixer5.webp)
