Title: Composer Yavaş İndirme Sorunu Çözümü
Date: 2019-12-04 12:00 10:00
Modified: 2025-03-08 12:00
Category: program
Tags: composer, hızlandırma, çözüm
Slug: composer-yavas-indirme-sorunu-cozumu
Authors: yuceltoluyag
Summary: Composer kullanırken yavaş indirme sorunu mu yaşıyorsunuz? Bu rehberde, hız sorunlarını çözmek için kullanabileceğiniz yöntemleri adım adım açıklıyoruz. 🚀
Translation: false
Status: published
Template: article

![Composer Hızlandırma](/images/composer.jpeg)

## Composer Yavaş İndirme Sorunu ve Çözümleri ⚡

Composer kullanırken paketlerin yavaş indirildiğini mi fark ettiniz? Endişelenmeyin! Aşağıdaki yöntemleri kullanarak hızınızı artırabilirsiniz. 💨

```shell
composer diagnose
Checking platform settings: OK
Checking git settings: OK
Checking http connectivity to packagist: OK
Checking https connectivity to packagist: OK
Checking github.com rate limit: 1 OK
Checking disk free space: OK
Checking pubkeys: FAIL Missing pubkey for tags verification
Missing pubkey for dev verification
Run composer self-update --update-keys to set them up Checking composer version: OK
Composer version: 1.9.1 PHP version: 7.4.0 PHP binary path: /usr/bin/php
```


### 1️⃣ Sorun Teşhisi: `composer diagnose`

İlk olarak, mevcut sorunları tespit etmek için aşağıdaki komutu çalıştırın:

```shell
composer diagnose
```

Eğer aşağıdaki gibi bir hata mesajı alıyorsanız, Composer'ın güncel `public key`'lere ihtiyacı olabilir:

```shell
Checking pubkeys: FAIL Missing pubkey for tags verification
Missing pubkey for dev verification
Run composer self-update --update-keys to set them up
```

Bu sorunu çözmek için:

```shell
composer self-update --update-keys
```

Alternatif olarak, `~/.config/composer/` dizinine gidip aşağıdaki iki dosyayı oluşturun ve [Composer Public Key](https://composer.github.io/pubkeys.html) sayfasından aldığınız güncel anahtarları ekleyin:

- `keys.dev.pub`
- `keys.tags.pub`

Ardından terminalinizi kapatıp tekrar açın ve `composer diagnose` komutunu yeniden çalıştırın. ✅



### 2️⃣ IPv6 Sorunu ve Çözümü 🌍

Bazı ağlarda IPv6 bağlantısı zaman aşımına neden olabilir. Eğer Composer işlemleriniz beklenenden uzun sürüyorsa, IPv6'yı devre dışı bırakmayı deneyin:

```shell
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf"
```

Bu işlemi yaptıktan sonra Composer'ı tekrar test edin. 🚀



### 3️⃣ Composer Paket Kaynağını Güncelleme 🔄

Varsayılan olarak Composer, `packagist.org` üzerinden çalışır. Eğer bağlantınız yavaşsa, aşağıdaki komut ile `packagist` adresini güncelleyebilirsiniz:

```shell
composer config --global repo.packagist composer https://packagist.org
```

Bu işlem, paketlerin daha hızlı yüklenmesini sağlayabilir. 🔥



### 4️⃣ Paralel İndirme Kullanımı ⏩

Composer işlemlerini hızlandırmak için `prestissimo` eklentisini yükleyebilirsiniz. Bu eklenti, paketlerin eşzamanlı indirilmesini sağlar:

```shell
composer global require hirak/prestissimo
```

Ancak unutmayın, `prestissimo` Composer 2.0 ve üzeri sürümlerde gereksiz hale gelmiştir. Eğer Composer 1.x kullanıyorsanız bu yöntemi deneyebilirsiniz. 😉



### 5️⃣ Derinlemesine Hata Ayıklama 🕵️‍♂️

Composer'ın ne yaptığını ayrıntılı görmek için aşağıdaki komutları kullanabilirsiniz:

```shell
composer -vvv require phpunit/phpunit
```

Bu komut, indirilen dosyaları ve ağ bağlantılarını detaylı bir şekilde gösterecektir. Eğer bir sorun fark ederseniz, hata mesajlarına göre yukarıdaki çözümleri uygulayabilirsiniz. 🛠️



## Sonuç 🎯

Composer ile yavaş indirme sorunları can sıkıcı olabilir, ancak yukarıdaki yöntemleri uygulayarak büyük ölçüde hız kazanabilirsiniz. Özetle:

✅ `composer diagnose` ile hataları kontrol edin
✅ IPv6 bağlantısını kapatın
✅ Packagist adresini güncelleyin
✅ Paralel indirme eklentisini kullanın
✅ Ayrıntılı hata ayıklama yapın

Umarım bu rehber Composer kullanımınızı daha keyifli hale getirir! 🎉
Herhangi bir hata alırsanız yorum bırakmayı unutmayın! 👇