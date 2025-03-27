Title: Laravel IDE Helper Kullanımı
Date: 2020-07-03 14:00 10:00
Modified: 2025-03-08 12:00
Category: kutuphane
Tags: phpstorm, cmder
Slug: laravel-ide-helper-kullanimi
Authors: yuceltoluyag
Series: phpstorm
Series_index: 3
Summary: Laravel IDE Helper paketi ile PHPStorm'da otomatik tamamlama ve kod yardımcısı nasıl geliştirilir?
Translation: false
Status: published
Template: article
Image: images/laravel_7x_ide_helper.webp


![Laravel IDE Helper](/images/laravel_7x_ide_helper.webp)

## Laravel IDE Helper Nedir? 🚀

Bir **IDE (Entegre Geliştirme Ortamı)**, yazılım geliştirme sürecini kolaylaştıran ve birçok geliştirme aracını bir araya getiren yazılımdır. Popüler IDE'ler arasında Eclipse, Microsoft Visual Studio, Code Blocks, Dev-C++, NetBeans ve JetBrains ürünleri bulunur.

Laravel projeleri geliştirirken **PHPStorm** sıkça tercih edilen bir IDE'dir. Ancak, **PHPStorm** bazı model, class ve route bilgilerini otomatik olarak algılayamayabilir. Bu noktada, **Laravel IDE Helper** paketi devreye girerek geliştirme deneyimini iyileştirir.

Eğer bu paket olmasaydı, **PHPDoc** kullanarak bu bilgileri elle eklemek gerekecekti. Konu hakkında daha fazla bilgi almak için **Abdulkadir Dılo Sürücü**'nün açıklamalarına şuradan ulaşabilirsiniz:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0NZHzmAgH-M?si=F9ZXp2n7Qq_Wzvkv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Laravel IDE Helper Nasıl Kurulur? 🛠️

Laravel projelerinde **Laravel IDE Helper** paketini kurmak için aşağıdaki adımları takip edebilirsiniz.

### 1. Paketi Kurun

Terminal veya komut satırınızda aşağıdaki komutu çalıştırın:

```sh
composer require --dev barryvdh/laravel-ide-helper
```

### 2. Kod Tamamlamayı Etkinleştirin

Aşağıdaki komutu çalıştırarak proje dizininize **_ide_helper.php** dosyasını oluşturabilirsiniz:

```sh
php artisan ide-helper:generate
```

### 3. Konfigürasyon Dosyasını Yayımlayın

Konfigürasyonu yayınlamak için aşağıdaki komutu kullanabilirsiniz:

```sh
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

### 4. Modeller İçin Dokümantasyon Oluşturun 📌

Bazı modellerde **"fonksiyon bulunamadı"** uyarısı ile karşılaşabilirsiniz. Bunu çözmek için aşağıdaki komutu kullanabilirsiniz:

```sh
php artisan ide-helper:models User
```

Eğer model dosyalarınız farklı bir klasördeyse, tam yolu belirtmelisiniz:

```sh
php artisan ide-helper:models Model\User
```

Bu işlemin sonunda, **User.php** gibi model dosyalarının başında şu şekilde bir PHPDoc blok oluşturulur:

```php
/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @mixin \Eloquent
 */
```

### 5. Composer'a Otomatik Komutlar Ekleyin 🔄

`composer.json` dosyanıza aşağıdaki scriptleri ekleyerek, **composer update** komutu çalıştırıldığında dokümantasyon dosyalarının otomatik olarak güncellenmesini sağlayabilirsiniz:

```json
"scripts": {
    "post-update-cmd": [
        "Illuminate\\Foundation\\ComposerScripts::postUpdate",
        "@php artisan ide-helper:generate",
        "@php artisan ide-helper:meta"
    ]
}
```

## Sonuç 🎯

**Laravel IDE Helper**, **PHPStorm** gibi IDE'lerde kod tamamlama ve otomatik önerileri iyileştirerek geliştirme deneyimini çok daha verimli hale getirir. Daha fazla bilgi için [Laravel IDE Helper Wiki](https://github.com/barryvdh/laravel-ide-helper/blob/master/README.md){: target="_blank" rel="noopener noreferrer"} sayfasını ziyaret edebilirsiniz.

PhpStorm ile ilgili daha fazla yazıya [buradan ulaşabilirsiniz](/etiket/phpstorm/). 🚀

