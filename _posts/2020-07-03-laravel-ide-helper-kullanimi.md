---
layout: post
title: Laravel ide helper kullanımı
description: laravel ide helper nasıl kullanılır
image: "/assets/images/laravel_7x_ide_helper.webp"
category: kutuphane
tags: [phpstorm, cmder]
series: "phpstorm"
comments: false
edit_url: true
toc: true
---

![Laravel İde Helper](/assets/images/laravel_7x_ide_helper.webp)

## Nedir ?

İDE: Rahat bir şekilde geliştirme yapmanızı sağlayan,içerisinde birçok tool(araçlar) barındıran ve geliştirme sürecini organize eden yazılımlara denir.Örnek vericek olursam : Eclipse, Microsoft Visual Studio, Code Blocks, Dev-C++, Anjuta, KDevelop, NetBeans,Jetbrains ürünleri

<!-- excerpt separator -->

{% include series.html %}

## Laravel ide helper Nedir ?

PHP geliştiricilerinin en çok kullandığı ide : **PHPStorm** dur. Şu sitede en çok kullanılan ide ve kod editörleri listenmiş [Top Code Editors and IDE for PHP Development of 2020](https://www.cloudways.com/blog/top-ide-and-code-editors-php-development/#phpstorm){:target="\_blank"}{:rel="noopener noreferrer"} **PHPStorm** kodları otomatik olarak algılayabilsede,bazı model,class,route vb verilerini göremeyebiliyor. Bu çalışması için bir sorun teşkil etmesede,benim gibi takıntısı olan insanlar için üretilmiş bir pakettir. Eğer laravel ide paketi olmasa idi , **PHPDoc** yardımıyla bu verileri elinizle girmeniz gerekecekti. PHPDoc nedir, bilmiyorsanız. **Abdulkadir Dılo Sürücü**'nün anlatımına şuradan ulaşabilirsiniz :

{% include youtubePlayer.html id="0NZHzmAgH-M" title="Laravel ide helper kullanımı" %}

Bu sayede laravel ide paketinin temelini anlayabilirsiniz.

## Laravel ide helper kullanımı

- Composer yardımıyla projenize şu paketi kuruyorsunuz.

```php
composer require --dev barryvdh/laravel-ide-helper

```

Daha sonra

```php
php artisan ide-helper:generate
```

Komutunu çalıştırıyorsunuz. Bu komutla birlikte proje dizinizde . **\_ide_helper.php** isminde dosya oluşuyor.

Bu dosyayı configure etmek isterseniz

```php
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config

```

Komutundan sonra **Config** klasörünüzün altına **ide-helper.php** adlı dosya oluşacaktır.

Diyelim ki

```php
user::create()
```

create üzerine geldiğinizde sanki bu fonksiyon yokmuş gibi altı çizili bir uyarı gösterir.(Bu uyarı temanıza göre üstünü renklendirebilir,altını çizebilir yada sağ kolonda sarı bir uyarı gösterebilir) Normalde bu uyarının projenin çalışıp çalışmamasına bir etkisi yoktur, ancak yukarıda dediğim gibi kişisel bir takıntı =) Bu sorunsalı aşmak için

```php
php artisan ide-helper:models User

```

eğer model dosyalarınızı ayrı bir dizinde tutuyorsanız

```php
php artisan ide-helper:models Model\User
```

Bu sayede verdiğiniz model dosyasıyla ilgili tüm model,class,view,routeleri tarar ona göre bir docblock oluşturur. Komutun işlemini tamamlamasıyla Post model dosyasını açarsanız başında şöyle açıklamalar göreceksiniz.

UserModel

```php
/\*\*

- App\User \* \* @property int $id
- @property string $name
- @property string $email
- @property \Illuminate\Support\Carbon|null $email_verified_at
- @property string $password
- @property int $branch_id
- @property int $role_id
- @property string|null $remember_token
- @property \Illuminate\Support\Carbon|null $created_at
- @property \Illuminate\Support\Carbon|null $updated_at
- @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
- @property-read int|null $notifications_count
- @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
- @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
- @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereBranchId($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRoleId($value)
- @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
- @mixin \Eloquent
  \*/

```

Composer.json dosyanıza, şu script komutlarını eklerseniz

```php
"scripts": {
"post-update-cmd": [
"Illuminate\\Foundation\\ComposerScripts::postUpdate",
"@php artisan ide-helper:generate",
"@php artisan ide-helper:meta"
]
}
```

Bu komutla birlikte, composeri her güncellediğinizde,yeni DOC larınız otamatik olarak konfigurasyon dosyanıza yazılacaktır.

Bu şekilde bu tip uyarılardan kurtulmuş oluyoruz. Daha fazlası için [laravel ide helper wiki](https://github.com/barryvdh/laravel-ide-helper/blob/master/README.md){:target="\_blank"}{:rel="noopener noreferrer"} sayfasına bakabilirsiniz. Phpstorm ile ilgili daha fazla yazıya [buradan ulaşabilirsiniz](https://yuceltoluyag.github.io/tag/phpstorm/){:target="\_blank"}{:rel="noopener noreferrer"}
