---
layout: post
title: Vagrant VirtualBox 6.1 ile uyumlu hale getirmek
description: Vagrant VirtualBox 6.1 ile uyumlu hale getirmek
image: "/assets/images/ol_vbox_vagrant-min.webp"
category: program
tags: [linux, vagrant, windows10]
comments: false
edit_url: true
---

![Vagrant VirtualBox Windows Linux Güncelleme](/assets/images/ol_vbox_vagrant-min.webp)11 Aralık 2019 tarihinde Virtualbox'un yeni sürümü yayınlandı. Bu yayınlama ile birlikte vagrant ile virtualbox arasında bir uyumsuzluk sorunu oldu. Vagrant'ı çalıştırdığınızda karşınıza şu ileti gelmekteydi :

<!-- excerpt separator -->

```shell
<The provider 'virtualbox' that was requested to back the machine
'homestead' is reporting that it isn't usable on this system.
Thereason is shown below:Vagrant has detected that you have a version of VirtualBox installed
that is not supported by this version of Vagrant. Please install one of
the supported versions listed below to use Vagrant:
4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 6.0
A Vagrant update may also be available that adds support for the version
br />you specified. Please check www.vagrantup.com/downloads.html to download the latest version.

```

6.0 dan sonrası için henüz gerekli işlemler yapılmamıştı. Bende bu uyarıyı güncellemeden sonra aldım. Güncellemeden sonra O**racle** gerekli makaleyi **yayınlamıştı**,bu sayede beni bir dertten kurtardılar.

1.  /opt/vagrant/embedded/gems/2.2.6/gems/vagrant-2.2.6/plugins/providers/virtualbox/driver/meta.rb dosyasına açalım ve şu satırı ekleyelim

```ruby
<@logger.debug("Finding driver for VirtualBox version: #{@@version}")
driver_map = {"4.0" =&gt; Version_4_0,"4.1" =&gt; Version_4_1,"4.2" =&gt; Version_4_2,"4.3" =&gt; Version_4_3,"5.0" =&gt; Version_5_0,"5.1" =&gt; Version_5_1,"5.2" =&gt; Version_5_2,<br />"6.0" =&gt; Version_6_0,
"6.1" =&gt; Version_6_1,}

```

yeşil renkle belirtiğim satırıcı ekleyin. Eğer windows kullanıyorsanız bu dosya **C:\HashiCorp\Vagrant\embedded\gems\2.2.6\gems\vagrant-2.2.6\plugins\providers\virtualbox\driver** içerisindedir.(Kaydetme sorunları yaşamamak için kullandığınız not defteri yada editoru yönetici olarak açın.)

- Yine aynı dizinin içerisinde **version_6_1.rb** adlı dosya oluşturmalıyız. Cem Yılmaz'ın dediği gibi burada oluşturulmuşu var = > Bu dosyaya [buradan ulaşabilirsiniz](http://www.coter.net/upload/version_6_1.rb) + [Alternatif](http://www.mediafire.com/file/wzq4l2xe6ul2dnw/version_6_1.rb/file)
- Bu işlemden sonra bir üst dizinde ki
- **plugin.rb** dosyasını açıyoruz. Ve şu satırı ekliyoruz :

```ruby
  <# Drop some autoloads in here to optimize the performance of loading
# our drivers only when they are needed.
module Driver
autoload :Meta, File.expand_path("../driver/meta", **FILE**)
autoload :Version_4_0, File.expand_path("../driver/version_4_0", **FILE**)
autoload :Version_4_1, File.expand_path("../driver/version_4_1", **FILE**)
autoload :Version_4_2, File.expand_path("../driver/version_4_2", **FILE**)
autoload :Version_4_3, File.expand_path("../driver/version_4_3", **FILE**)
autoload :Version_5_0, File.expand_path("../driver/version_5_0", **FILE**)
autoload :Version_5_1, File.expand_path("../driver/version_5_1", **FILE**)
autoload :Version_5_2, File.expand_path("../driver/version_5_2", **FILE**)
autoload :Version_6_0, File.expand_path("../driver/version_6_0", **FILE**)
autoload :Version_6_1, File.expand_path("../driver/version_6_1", **FILE**)

```

Bu işlemlerden sonra vagrant ınızı çalışması gerekli :) Eğer hata alırsanız yorumlamaktan çekinmeyin 👍💗
