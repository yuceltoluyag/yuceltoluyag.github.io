Title: Using CS Fixer in PhpStorm
Date: 2020-02-06 14:30 10:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: phpstorm, cmder
Slug: phpstorm-icinde-cs-fixer-kullanmak
Authors: yuceltoluyag
Series: phpstorm
Series_index: 2
Summary: Step-by-step guide on using CS Fixer in PhpStorm.
Status: published
Template: article
Image: images/php_phpstorm_csfixer-xl.webp
Lang: en

## What is PSR Standard?

PSR stands for "PHP Standards Recommendations" and are standards that ensure PHP code is written in a specific format. Since today's IDEs make this process **automatic** under **code refactor**, most developers may be unaware of these standards (this situation is generally valid for freelancers). Initially, IDEs could leave the automatic process to the user as standards changed.

!!! note "Deprecated <b>Deprecated</b> - As of August 10, 2019, PSR-2 standards have been deprecated. <a href="https://www.php-fig.org/psr/psr-12/" rel="noopener noreferrer" target="_blank">PSR-12 </a> is currently recommended as an alternative."

[PSR-2](https://www.php-fig.org/psr/psr-2/){: target="\_blank" rel="noopener noreferrer"} code standards are no longer recommended for use. However, if you're doing this process with an IDE, I don't recommend directly switching to [PSR-12](https://www.php-fig.org/psr/psr-12/){: target="\_blank" rel="noopener noreferrer"} standards, as some problems still seem to exist. You can get more information about PSR-12 [here](https://github.com/FriendsOfPHP/PHP-CS-Fixer/issues/4502){: target="\_blank" rel="noopener noreferrer"}.

## Using CS Fixer in PhpStorm

- Although you previously needed to make extra settings, this feature has been added by default since PhpStorm version 2018.3. [PHP CS Fixer Support](https://blog.jetbrains.com/phpstorm/2018/09/phpstorm-2018-3-early-access-program-is-open/){: target="\_blank" rel="noopener noreferrer"}.
- Install [Composer](https://getcomposer.org/download/){: target="\_blank" rel="noopener noreferrer"}.
- Install Php CS Fixer with Composer:

```bash
composer global require friendsofphp/php-cs-fixer
```

- In PhpStorm settings, go to `Settings -> Languages & Frameworks -> PHP -> Quality Tools -> PHP CS Fixer` menu and specify where CS Fixer is installed.

```bash
C:\Users\yourusername\AppData\Roaming\Composer\vendor\bin\php-cs-fixer.bat # For Windows
/home/yourusername/.composer/vendor/bin/php-cs-fixer # For Linux
```

After writing these paths, you can check the CS Fixer version information by pressing the `Validate` button.

[responsive_img src="/images/php_phpstorm_csfixer-xl.webp" alt="phpstorm_inside_phpcsfixer" /]
[responsive_img src="/images/php_phpstorm_csfixer2-xl.webp" alt="phpstorm_inside_phpcsfixer" /]
[responsive_img src="/images/php_phpstorm_csfixer3-xl.webp" alt="phpstorm_inside_phpcsfixer" /]

- Press the `+` button in `Settings -> Tools -> ` to add a new tool.
- `Name`: You can write any name you want in this section.
- `Description`: You can add a description in this section.
- `Program`: Write the path where CS Fixer is installed here. I had given the path above.
- `Arguments`: Write the arguments you use here. You can learn what the arguments do from [Cs Fixer Usage](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){: target="\_blank" rel="noopener noreferrer"} section. Here, instead of writing all arguments, you can show the path of the config file and make all your settings in this file.

```bash
fix --verbose --config=C:\xampp\htdocs\urunsat\.php_cs.dist --path-mode=intersection "$FileDir$/$FileName$"
```

- `Working Directory`: To use this process not only in this file but also in other projects, from the **insert macro** section

```bash
$ProjectFileDir$
```

You can use the option. This way, you can easily use the CS Fixer process in other projects as well.

[responsive_img src="/images/php_phpstorm_csfixer4-xl.webp" alt="phpstorm_inside_phpcsfixer" /]

You can examine the sample `.php_cs` file [here](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/master/.php_cs.dist){: target="\_blank" rel="noopener noreferrer"}. For more information, you can check the [Cs Fixer Usage](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){: target="\_blank" rel="noopener noreferrer"} section. Also, for another example, you can check [Doctrine coding style](https://gist.github.com/azdanov/8f637142115feebf4b44e11a0971e5cb){: target="\_blank" rel="noopener noreferrer"}.

Restart PhpStorm. In the `Tools -> External Tools` menu, you will see the tool name you added. If you want to add a shortcut, you can add the shortcut you want from the `Settings -> Keymap -> External Tools` menu. I added the `Alt + F` shortcut, you can add whichever you like.

[responsive_img src="/images/php_phpstorm_csfixer5-xl.webp" alt="phpstorm_inside_phpcsfixer" /]
