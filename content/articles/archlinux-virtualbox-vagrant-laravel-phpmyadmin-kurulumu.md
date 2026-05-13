Title: Arch Linux Üzerinde VirtualBox + Vagrant + Laravel + PhpMyAdmin Kurulumu (Homestead)
Date: 2019-09-16 00:00 10:00
Modified: 2025-08-11 22:59
Category: Laravel
Tags: linux, laravel
Slug: archlinux-virtualbox-vagrant-laravel-phpmyadmin-kurulumu
Series: ArchLampp
Series_index: 3
Authors: yuceltoluyag
Summary: Arch Linux üzerinde VirtualBox, Vagrant, Laravel ve PhpMyAdmin kurulumunu adım adım anlatan detaylı rehber.
Status: published
Template: article
Image: images/pic-selected-190916-0747-49-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114984353173118702
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrdwpytls2g

## VirtualBox Kurulumu 🚀

Öncelikle VirtualBox'ı yükleyelim:

```bash
sudo pacman -S virtualbox
```

Kurulum sırasında aşağıdaki seçenekler karşınıza çıkacaktır:

1. **virtualbox-host-dkms**
2. **virtualbox-host-modules-arch**

Hangi seçeneği kullanacağınızı bilmiyorsanız:

- Eğer **Linux kerneli** kullanıyorsanız **2. seçeneği** (**virtualbox-host-modules-arch**) seçmelisiniz.
- **Farklı bir kernel** kullanıyorsanız **1. seçeneği** (**virtualbox-host-dkms**) tercih etmelisiniz.

Ben **2. seçeneği** seçerek devam ediyorum.

Kurulum tamamlandıktan sonra VirtualBox'ı başlatmadan önce modülü etkinleştirelim:

```bash
sudo modprobe vboxdrv
```

VirtualBox'ı bir kez çalıştırarak **hata olup olmadığını kontrol edin**. Eğer hata alırsanız, hata mesajını paylaşarak destek alabilirsiniz.

Modülün her açılışta otomatik yüklenmesi için:

```bash
sudo nano /etc/modules-load.d/virtualbox.conf
```

Dosyaya **vboxdrv** ekleyin ve kaydedip çıkın (**F3** -> **Enter** -> **F2**).

Son olarak, kullanıcınızı **vboxusers** grubuna ekleyin:

```bash
sudo usermod -aG vboxusers KULLANICI_ADINIZ
```

Bilgisayarınızı yeniden başlattıktan sonra aşağıdaki komutla modülün yüklü olup olmadığını doğrulayabilirsiniz:

```bash
sudo lsmod | grep vboxdrv
```

## Vagrant Kurulumu 🏗️

Vagrant'ı yüklemek için:

```bash
yay -S vagrant
```

Eğer **Vagrant plugin** ve **plugin manager** yüklemek isterseniz:

```bash
vagrant plugin install vagrant-vbguest vagrant-share
```

Şimdi, Vagrant tarafından sağlanan hazır imajı indirelim:

```bash
vagrant box add laravel/homestead
```

Başarıyla eklendiğini belirten mesajı gördüğünüzde, sanal makine imajı oluşturulmuş olacaktır.

## Homestead Kurulumu 🏡

Ev dizininizde **www** adında bir klasör oluşturup, içine Homestead dosyalarını çekelim:

```bash
mkdir ~/www
cd ~/www
git clone https://github.com/laravel/homestead.git Homestead
```

Homestead'i başlatmak için:

```bash
cd ~/www/Homestead
bash init.sh
```

**"Homestead initialized!"** mesajını gördüğünüzde başarıyla kurulmuş demektir.

Şimdi **Homestead.yaml** dosyasını düzenlememiz gerekiyor:

```bash
sudo nano ~/www/Homestead/Homestead.yaml
```

```yaml
ip: "192.168.10.10"
memory: 2048
cpus: 2
provider: virtualbox

authorize: ~/.ssh/id_rsa.pub

keys:
  - ~/.ssh/id_rsa

folders:
  - map: ~/www
    to: /home/vagrant/www

sites:
  - map: laravel6.test
    to: /home/vagrant/www/laravel6/public

databases:
  - homestead

features:
  - mariadb: false
  - ohmyzsh: false
  - webdriver: false
# ports:
#     - send: 50000
#       to: 5000
#     - send: 7777
#       to: 777
#       protocol: udp
```

Dosyanın başında **ip: \"192.168.10.10\"** adresini göreceksiniz. Laravel projemizi bu IP üzerinden çalıştırmak için **hosts** dosyamıza ekleme yapalım:

```bash
sudo nano /etc/hosts
```

Dosyanın içine şunu ekleyin:

```bash
192.168.10.10 laravel6.test
```

Kaydedip çıkın (**F3** -> **Enter** -> **F2**).

Sonrasında sanal makineyi başlatalım:

```bash
cd ~/www/Homestead
vagrant up
```

İlk açılış biraz uzun sürebilir. Eğer hata alırsanız yorum bırakabilirsiniz.

Bağlanmak için:

```bash
vagrant ssh
```

[responsive_img src="/images/pic-selected-190916-0818-54-xl.webp" alt="SSH Bağlantısı" /]

## Laravel Kurulumu 🌐

SSH ile sanal makineye bağlandıktan sonra Laravel'i kurmak için:

```bash
cd www
composer create-project --prefer-dist laravel/laravel
```

Bu işlem tamamlandığında **www** klasörünüzün içinde **laravel** adında bir klasör oluşacaktır.

[responsive_img src="/images/pic-full-190916-0808-36-xl.webp" alt="Laravel Kurulumu" /]

## PhpMyAdmin Kurulumu 🛠️

SSH ile bağlı olduğunuzdan emin olun ve **www** dizininde çalıştığınızdan emin olun:

```bash
curl -sS https://raw.githubusercontent.com/grrnikos/pma/master/pma.sh | sh
```

PhpMyAdmin'e erişim için hosts dosyanıza yeni bir satır ekleyelim:

```bash
sudo nano /etc/hosts
```

İçerisine şunu ekleyin:

```bash
192.168.10.10 phpmyadmin.test
```

Kaydedip çıkın (**F3** -> **Enter** -> **F2**).

Şimdi **Homestead.yaml** dosyamızı düzenleyelim ve yeni bir site ekleyelim:

```yaml
sites:
  - map: laravel6.test
    to: /home/vagrant/www/laravel6/public
  - map: phpmyadmin.test
    to: /home/vagrant/www/phpmyadmin
```

Tüm ayarlamalar tamamlandı! 🚀 **PhpMyAdmin'e erişmek için:**

[http://phpmyadmin.test/](http://phpmyadmin.test/){: target="\_blank" rel="noopener noreferrer"}

Kullanıcı adı: **homestead**
Şifre: **secret**

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="d9ITbD5Mn3w"></lite-youtube>
[responsive_img src="/images/pic-selected-190916-0747-49-xl.webp" alt="Kurulum Görseli" /]



