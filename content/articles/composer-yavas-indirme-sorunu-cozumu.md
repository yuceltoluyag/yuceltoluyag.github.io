Title: Composer Yavaş İndirme Sorunu Çözümü
Date: 2019-12-04 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: composer, hızlandırma, çözüm
Slug: composer-yavas-indirme-sorunu-cozumu
Authors: yuceltoluyag
Summary: Composer kullanırken yavaş indirme sorunu mu yaşıyorsunuz? Bu rehberde, hız sorunlarını çözmek için kullanabileceğiniz yöntemleri adım adım açıklıyoruz. 🚀
Lang: tr
Translation: false
Status: published
Template: article
Image: images/composer-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984413472275351
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvresit6uk2o

## Composer Yavaş İndirme Sorunu ve Çözümleri ⚡

Selamlar güzel insanlar, klavye başındaki değerli yoldaşlar! ⚡

Eğer PHP dünyasında geliştirme yapıyorsanız ve Laravel, Symfony gibi framework'lerle haşır neşirseniz, o meşhur **Composer** paket yöneticisini her gün defalarca koşturuyorsunuz demektir. Ancak bazen öyle bir an gelir ki, terminalde `composer install` veya `require` yazdığınızda paketlerin inme hızı adeta asgari ücretle çalışan memurun ay sonunu bekleme hızına düşer. Ekrana boş gözlerle bakıp, *"Ulan altı üstü bir paket indireceksin, sanki uzaya roket fırlatıyoruz!"* diye sitem etmeye başlarsınız. 

Özellikle benim gibi sisteminde en ufak yavaşlığa tahammülü olmayan bir Arch Linux paronoyağı için bu yavaşlık tam bir sinir krizidir. 

Merak etmeyin kardaşlar! Bu yazıda, Composer'ın o sinir bozucu yavaşlığını bizzat kendi sistemimde çözdüğüm en etkili yöntemlerle adım adım tarihe gömüyoruz. Çayınızı alın, terminali açın; Composer'a hak ettiği hızı kazandırıyoruz! 💨

---

### 1️⃣ Sorun Teşhisi: `composer diagnose`

İlk olarak, mevcut sorunları tespit etmek için aşağıdaki komutu çalıştırın:

```bash
composer diagnose
```

Bu komutu koşturduğunuzda arkada tüm ağ bağlantılarını ve sistem ayarlarını test eder. Çıktıda eğer şöyle bir hata veya fail satırı görüyorsanız:

```bash
Checking pubkeys: FAIL Missing pubkey for tags verification
Missing pubkey for dev verification
Run composer self-update --update-keys to set them up
```

Bu, Composer'ın elindeki doğrulama anahtarlarının (public keys) eskidiği veya eksik olduğu anlamına gelir. Bunu çözmek için terminale şu can alıcı komutu veriyoruz:

```bash
composer self-update --update-keys
```

!!! tip "İpucu ⚡"
    Eğer yukarıdaki komutla hata çözülmezse, ev dizininizdeki `~/.config/composer/` klasörüne gidip elle `keys.dev.pub` ve `keys.tags.pub` dosyalarını oluşturun. Ardından [Composer Resmi Pubkeys](https://composer.github.io/pubkeys.html){: target="_blank" rel="noopener noreferrer"} sayfasından güncel anahtarları kopyalayıp bu dosyaların içine yapıştırın. Sorun anında çözülecektir.


---

### 2️⃣ IPv6 Sorunu ve Çözümü 🌍

Çoğu zaman yavaşlığın arkasındaki gizli suçlu, ISS'lerin (İnternet Servis Geçitleri) IPv6'yı tam olarak düzgün yapılandramamasıdır. Composer arkada IPv6 üzerinden bağlanmaya çalışır, zaman aşımına (timeout) uğrar ve ancak ondan sonra IPv4'e düşer. Bu bekleme süresi de ömrümüzden ömür götürür.

Eğer işlemleriniz çok hımbıl ilerliyorsa, sistem genelinde IPv4 önceliğini artırmak için terminalden şu komutu koşturun:

```bash
sudo sh -c "echo 'precedence ::ffff:0:0/96 100' >> /etc/gai.conf"
```

Bu basit ayar, sistemin tüm ağ isteklerinde IPv4'ü baş tacı yapmasını sağlar ve bağlantı sürelerini inanılmaz hızlandırır.

---

### 3️⃣ Composer Paket Kaynağını Güncelleme 🔄

Varsayılan olarak Composer, tüm paketleri `packagist.org` üzerinden çeker. Ancak bu sunucu coğrafi olarak bize uzak olduğunda veya aşırı yük altında kaldığında yavaşlık kaçınılmaz olur. 

Packagist bağlantınızı tazelemek ve küresel aynaları aktif etmek için `.zshrc` veya doğrudan terminale şu komutu verin:

```bash
composer config --global repo.packagist composer https://packagist.org
```

!!! note "Not: Eğer Çin gibi bazı özel konumlarda geliştirme yapıyorsanız yerel aynaları (mirrors) kullanmak hız kazandırır. Ancak ülkemiz sınırları içerisinde global packagist adresini yukarıdaki gibi temizce global konfigürasyona kaydetmek bağlantıyı stabil kılacaktır."

---

### 4️⃣ Paralel İndirme Kullanımı ⏩

Eski günleri hatırlayanlar bilir; Composer 1.x sürümündeyken paketleri tek tek sırayla indirirdi. Sıradaki paket inmeden diğerine geçmezdi. Bu eziyeti çözmek için `prestissimo` adında paralel indirme sağlayan eklenti kurtarıcımız olurdu:

```bash
composer global require hirak/prestissimo
```

!!! warning "Önemli Uyarımız ⚠️ Eğer sisteminizde Composer 2.0 ve üzeri bir sürüm kuruluysa (ki artık kurulu olmalı!), bu eklentiye ihtiyacınız yoktur. Composer 2 zaten dahili olarak çoklu iş parçacığı (multi-threading) ve paralel indirme desteğiyle geliyor hacı!"

Sürümünüzü öğrenmek için `composer --version` yazıp kontrol edin. Eğer hala 1.x sürümündeyseniz, asgari ücret zammı bekler gibi beklememek için hemen `composer self-update` yazarak 2.x sürümüne terfi edin.

---

### 5️⃣ Derinlemesine Hata Ayıklama 🕵️‍♂️

Composer'ın ne yaptığını ayrıntılı görmek için aşağıdaki komutları kullanabilirsiniz:

```bash
composer -vvv require phpunit/phpunit
```

Bu komut, indirilen dosyaları ve ağ bağlantılarını detaylı bir şekilde gösterecektir. Eğer bir sorun fark ederseniz, hata mesajlarına göre yukarıdaki çözümleri uygulayabilirsiniz. 🛠️

---

## Sonuç 🎯

Composer yavaşlığı kader değildir dostlar! Ufak birkaç ayarla o hımbıl yapıyı adeta şahlandırabilirsiniz. Kısaca özetlemek gerekirse:

✅ `composer diagnose` ile hataları kontrol edin
✅ IPv6 bağlantısını kapatın
✅ Packagist adresini güncelleyin
✅ Paralel indirme eklentisini kullanın
✅ Ayrıntılı hata ayıklama yapın

Kafanıza takılan bir yer olursa veya Arch Linux üzerinde Composer koştururken garip bir hatayla karşılaşırsanız yorumlara yazın yoldaşlar, beraber çözeriz! 😉

[responsive_img src="/images/composer-xl.webp" alt="Composer Hızlandırma" /]




