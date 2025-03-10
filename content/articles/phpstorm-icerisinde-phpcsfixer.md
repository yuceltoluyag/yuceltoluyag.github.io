Title: Phpstorm içerisinde CS Fixer Kullanmak
Date: 2020-02-06 14:30 10:00
Modified: 2025-03-08 12:00
Category: program
Tags: [phpstorm, cmder]
Slug: phpstorm-icinde-cs-fixer-kullanmak
Authors: yuceltoluyag
Series: phpstorm
Series_index: 2
Summary: PhpStorm içerisinde CS Fixer kullanımını adım adım anlatan rehber.
Translation: false
Status: published
Template: article

# PSR Standartı Nedir?

PSR, "PHP Standards Recommendations" anlamına gelir ve PHP ile yazılan kodların belirli bir formatta yazılmasını sağlayan standartlardır. Günümüz IDE'leri **code refactor** adı altında bu işlemi **otomatik** hale getirdiği için çoğu yazılımcı bu standartlardan habersiz olabilir (bu durum genelde freelance çalışanlar için geçerlidir). Başlangıçta, IDE'ler standartlar değiştikçe otomatik işlemi kullanıcıya bırakabiliyor.

<div class="info-box note">
<b>Deprecated</b> - 2019-08-10 tarihi itibariyle PSR-2 standartları kullanım dışı bırakılmıştır. <a href="https://www.php-fig.org/psr/psr-12/">PSR-12 </a> şu anda alternatif olarak tavsiye edilmektedir.</div>

[PSR-2](https://www.php-fig.org/psr/psr-2/) kod standartlarının kullanımı artık tavsiye edilmemektedir. Ancak bu işlemi IDE ile yapıyorsanız, doğrudan PSR-12'ye geçmenizi tavsiye etmiyorum, çünkü hala bazı problemleri mevcut gibi görünüyor. PSR-12 hakkında daha fazla bilgiye [buradan](https://github.com/FriendsOfPHP/PHP-CS-Fixer/issues/4502) ulaşabilirsiniz.

# PhpStorm İçerisinde CS Fixer Kullanmak

- Daha önce ekstra ayarlar yapmanız gerekse de, PhpStorm 2018.3 versiyonundan itibaren bu özellik varsayılan olarak eklenmiştir. [PHP CS Fixer Desteği](https://blog.jetbrains.com/phpstorm/2018/09/phpstorm-2018-3-early-access-program-is-open/).
- [Composer](https://getcomposer.org/download/){:target="_blank"}'ı kurunuz.
- Php CS Fixer'ı Composer yardımıyla kurun:

```shell
composer global require friendsofphp/php-cs-fixer
```

- PhpStorm ayarlarında, `Settings -> Languages & Frameworks -> PHP -> Quality Tools -> PHP CS Fixer` menüsüne gidin ve CS Fixer'ın kurulu olduğu yeri belirtin.

```shell
C:\Users\kullaniciadiniz\AppData\Roaming\Composer\vendor\bin\php-cs-fixer.bat # Windows için
/home/kullaniciadiniz/.composer/vendor/bin/php-cs-fixer # Linux için
```

Bu yolları yazdıktan sonra, `Validate` (Doğrulama) butonuna basarak CS Fixer'ın sürüm bilgisini kontrol edebilirsiniz.

![phpstorm_inside_phpcsfixer](/images/php_phpstorm_csfixer.png)
![phpstorm_inside_phpcsfixer](/images/php_phpstorm_csfixer2.png)
![phpstorm_inside_phpcsfixer](/images/php_phpstorm_csfixer3.png)

- `Settings -> Tools -> +` butonuna basarak yeni bir araç ekleyin.
- `Name`: Bu kısma istediğiniz ismi yazabilirsiniz.
- `Description`: Bu kısma açıklama ekleyebilirsiniz.
- `Program`: CS Fixer'ın kurulu olduğu yolu buraya yazın. Yolu üstte vermiştim.
- `Arguments`: Kullandığınız argümanları buraya yazın. Argümanların ne işe yaradığını öğrenmek için [Cs Fixer Kullanımı](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){:target="_blank"} kısmından bilgi edinebilirsiniz. Burada tüm argümanları yazmak yerine, config dosyasının yolunu göstererek tüm ayarlarınızı bu dosya içinde yapabilirsiniz.

```shell
fix --verbose --config=C:\xampp\htdocs\urunsat\.php_cs.dist --path-mode=intersection "$FileDir$/$FileName$"
```

- `Working Directory`: Bu işlemi sadece bu dosyada çalıştırmak yerine, diğer projelerde de kullanabilmek için **insert macro** kısmından

```shell
$ProjectFileDir$
```

Seçeneğini kullanabilirsiniz. Bu sayede, diğer projelerde de CS Fixer işlemini kolayca kullanabilirsiniz.

![phpstorm_inside_phpcsfixer](/images/php_phpstorm_csfixer4.png)

Örnek `.php_cs` dosyasını [buradan](https://github.com/FriendsOfPHP/PHP-CS-Fixer/blob/master/.php_cs.dist){:target="_blank"} inceleyebilirsiniz. Daha fazla bilgi için [Cs Fixer Kullanımı](https://github.com/FriendsOfPHP/PHP-CS-Fixer#usage){:target="_blank"} kısmına göz atabilirsiniz. Ayrıca başka bir örnek için [Doctrine coding style](https://gist.github.com/azdanov/8f637142115feebf4b44e11a0971e5cb){:target="_blank"}'ı kontrol edebilirsiniz.

PhpStorm'u yeniden başlatın. `Tools -> External Tools` menüsünde, eklediğiniz araç ismini göreceksiniz. Kısayol eklemek isterseniz, `Settings -> Keymap -> External Tools` menüsünden istediğiniz kısayolu ekleyebilirsiniz. Ben `Alt + F` kısayolunu ekledim, siz dilediğinizi ekleyebilirsiniz.

![phpstorm_inside_phpcsfixer](/images/php_phpstorm_csfixer5.png)
