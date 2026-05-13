Title: Vagrant'ı VirtualBox 6.1 ile Uyumlu Hale Getirmek
Date: 2020-01-04 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: linux, vagrant, windows10
Slug: vagrant-virtualbox-6-1-uyumluluk
Authors: yuceltoluyag
Summary: Vagrant'ın VirtualBox 6.1 ile yaşadığı uyumsuzluk sorununu nasıl gidereceğinizi adım adım anlatıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/ol_vbox_vagrant-min-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984431326966294
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrez76yk22n


2019-12-11'da VirtualBox'un yeni sürümü yayınlandı. Ancak bu güncellemeyle birlikte Vagrant ile VirtualBox arasında bir uyumsuzluk sorunu ortaya çıktı. Vagrant'ı çalıştırdığınızda aşağıdaki hata mesajını alabilirsiniz:

```bash
The provider 'virtualbox' that was requested to back the machine 'homestead' is reporting that it isn't usable on this system.
The reason is shown below:
Vagrant has detected that you have a version of VirtualBox installed that is not supported by this version of Vagrant. Please install one of the supported versions listed below to use Vagrant:
4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 6.0
A Vagrant update may also be available that adds support for the version you specified. Please check www.vagrantup.com/downloads.html to download the latest version.
```

VirtualBox 6.0'dan sonraki sürümler için gerekli düzenlemeler henüz yapılmamıştı. Ancak Oracle kısa süre içinde bir makale yayınlayarak bu soruna çözüm sundu. İşte adım adım yapılması gerekenler:

## Adım 1: meta.rb Dosyasını Düzenleyin

Aşağıdaki yolu izleyerek `meta.rb` dosyasını açın:

- **Linux/Mac**: `/opt/vagrant/embedded/gems/2.2.6/gems/vagrant-2.2.6/plugins/providers/virtualbox/driver/meta.rb`
- **Windows**: `C:\HashiCorp\Vagrant\embedded\gems\2.2.6\gems\vagrant-2.2.6\plugins\providers\virtualbox\driver\meta.rb`

Dosyaya aşağıdaki satırı ekleyin:

```ruby
@logger.debug("Finding driver for VirtualBox version: #{@@version}")
driver_map = {
  "4.0" => Version_4_0,
  "4.1" => Version_4_1,
  "4.2" => Version_4_2,
  "4.3" => Version_4_3,
  "5.0" => Version_5_0,
  "5.1" => Version_5_1,
  "5.2" => Version_5_2,
  "6.0" => Version_6_0,
  "6.1" => Version_6_1,
}
```

!!! note "Windows Kullanıcıları İçin <b>Not:</b> Windows kullanıcıları dosyayı düzenlerken <b>Notepad++</b> veya <b>Visual Studio Code</b> gibi bir metin editörünü <b>yönetici </b>olarak çalıştırmalıdır."

## Adım 2: version_6_1.rb Dosyasını Oluşturun

Aynı dizinde `version_6_1.rb` adında bir dosya oluşturun. Eğer uğraşmak istemiyorsanız, hazır dosyayı aşağıdaki bağlantılardan indirebilirsiniz:

- [version_6_1.rb (Alternatif 1)](http://www.coter.net/upload/version_6_1.rb){: target="\_blank" rel="noopener noreferrer"}
- [version_6_1.rb (Alternatif 2)](http://www.mediafire.com/file/wzq4l2xe6ul2dnw/version_6_1.rb/file){: target="\_blank" rel="noopener noreferrer"}

## Adım 3: plugin.rb Dosyasına Gerekli Satırı Ekleyin

Bir üst dizine çıkın ve `plugin.rb` dosyasını açın. Aşağıdaki satırı ekleyin:

```ruby
module Driver
  autoload :Meta, File.expand_path("../driver/meta", __FILE__)
  autoload :Version_4_0, File.expand_path("../driver/version_4_0", __FILE__)
  autoload :Version_4_1, File.expand_path("../driver/version_4_1", __FILE__)
  autoload :Version_4_2, File.expand_path("../driver/version_4_2", __FILE__)
  autoload :Version_4_3, File.expand_path("../driver/version_4_3", __FILE__)
  autoload :Version_5_0, File.expand_path("../driver/version_5_0", __FILE__)
  autoload :Version_5_1, File.expand_path("../driver/version_5_1", __FILE__)
  autoload :Version_5_2, File.expand_path("../driver/version_5_2", __FILE__)
  autoload :Version_6_0, File.expand_path("../driver/version_6_0", __FILE__)
  autoload :Version_6_1, File.expand_path("../driver/version_6_1", __FILE__)
end
```

## Sonuç

Yukarıdaki işlemleri tamamladıktan sonra Vagrant'ı tekrar çalıştırın. Artık VirtualBox 6.1 ile uyumlu bir şekilde çalışması gerekiyor. Eğer hala hata alıyorsanız, yorumlarda paylaşmaktan çekinmeyin! 👍💗

[responsive_img src="/images/ol_vbox_vagrant-min-xl.webp" alt="Vagrant VirtualBox Windows Linux Güncelleme" /]



