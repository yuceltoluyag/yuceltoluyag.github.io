Title: Using Laravel IDE Helper
Date: 2020-07-03 14:00 10:00
Modified: 2025-08-11 22:59
Category: Laravel Geliştirme
Tags: phpstorm, cmder
Slug: laravel-ide-helper-kullanimi
Authors: yuceltoluyag
Series: phpstorm
Series_index: 3
Summary: How to improve auto-completion and code assistance in PHPStorm with Laravel IDE Helper package?
Status: published
Template: article
Image: images/laravel_7x_ide_helper-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114984850205763176
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrkyu6vyk2k

## What is Laravel IDE Helper? 🚀

An **IDE (Integrated Development Environment)** is a software that facilitates the software development process and brings together many development tools. Popular IDEs include Eclipse, Microsoft Visual Studio, Code Blocks, Dev-C++, NetBeans, and JetBrains products.

When developing Laravel projects, **PHPStorm** is frequently preferred as an IDE. However, **PHPStorm** may not automatically detect some model, class and route information. At this point, the **Laravel IDE Helper** package comes into play to improve the development experience.

If this package didn't exist, it would be necessary to manually add this information using **PHPDoc**. For more information on the subject, you can access explanations by **Abdulkadir Dılo Sürücü** here:

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="0NZHzmAgH-M"></lite-youtube>

## How to Install Laravel IDE Helper? 🛠️

You can follow these steps to install the **Laravel IDE Helper** package in Laravel projects.

### 1. Install the Package

Run the following command in your terminal or command line:

```bash
composer require --dev barryvdh/laravel-ide-helper
```

### 2. Enable Code Completion

You can create the **\_ide_helper.php** file in your project directory by running the following command:

```bash
php artisan ide-helper:generate
```

### 3. Publish Configuration File

You can use the following command to publish the configuration:

```bash
php artisan vendor:publish --provider="Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider" --tag=config
```

### 4. Generate Documentation for Models 📌

In some models, you may encounter a **"function not found"** warning. To solve this, you can use the following command:

```bash
php artisan ide-helper:models User
```

If your model files are in a different folder, you should specify the full path:

```bash
php artisan ide-helper:models Model\User
```

At the end of this process, a PHPDoc block like the following will be created at the beginning of model files like **User.php**:

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

### 5. Add Automatic Commands to Composer 🔄

By adding the following scripts to your `composer.json` file, you can ensure that documentation files are automatically updated when the **composer update** command is executed:

```json
"scripts": {
    "post-update-cmd": [
        "Illuminate\\Foundation\\ComposerScripts::postUpdate",
        "@php artisan ide-helper:generate",
        "@php artisan ide-helper:meta"
    ]
}
```

## Conclusion 🎯

**Laravel IDE Helper** significantly improves the development experience by enhancing code completion and auto-suggestions in IDEs like **PHPStorm**. For more information, you can visit the [Laravel IDE Helper Wiki](https://github.com/barryvdh/laravel-ide-helper/blob/master/README.md){: target="\_blank" rel="noopener noreferrer"} page.

You can access more articles about PhpStorm [from here](/etiket/phpstorm/). 🚀

[responsive_img src="/images/laravel_7x_ide_helper-xl.webp" alt="Laravel IDE Helper" /]
