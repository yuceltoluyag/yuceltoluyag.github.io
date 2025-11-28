Title: Making Vagrant Compatible with VirtualBox 6.1
Date: 2020-01-04 12:00 10:00
Modified: 2025-08-11 22:59
Category: Sorun Giderme
Tags: linux, vagrant, windows10
Slug: vagrant-virtualbox-6-1-uyumluluk
Authors: yuceltoluyag
Summary: We explain step by step how to fix the compatibility issue between Vagrant and VirtualBox 6.1.
Status: published
Template: article
Image: images/ol_vbox_vagrant-min-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114984431326966294
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrez76yk22n

On December 11, 2019, the new version of VirtualBox was released. However, with this update, an incompatibility issue arose between Vagrant and VirtualBox. When you run Vagrant, you may receive the following error message:

```bash
The provider 'virtualbox' that was requested to back the machine 'homestead' is reporting that it isn't usable on this system.
The reason is shown below:
Vagrant has detected that you have a version of VirtualBox installed that is not supported by this version of Vagrant. Please install one of the supported versions listed below to use Vagrant:
4.0, 4.1, 4.2, 4.3, 5.0, 5.1, 5.2, 6.0
A Vagrant update may also be available that adds support for the version you specified. Please check www.vagrantup.com/downloads.html to download the latest version.
```

The necessary adjustments for versions after VirtualBox 6.0 had not been made yet. However, Oracle soon published an article offering a solution to this problem. Here are the steps to be taken:

## Step 1: Edit the meta.rb File

Follow the path below to open the `meta.rb` file:

- **Linux/Mac**: `/opt/vagrant/embedded/gems/2.2.6/gems/vagrant-2.2.6/plugins/providers/virtualbox/driver/meta.rb`
- **Windows**: `C:\HashiCorp\Vagrant\embedded\gems\2.2.6\gems\vagrant-2.2.6\plugins\providers\virtualbox\driver\meta.rb`

Add the following line to the file:

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

!!! note "For Windows Users <b>Note:</b> Windows users should run a text editor such as <b>Notepad++</b> or <b>Visual Studio Code</b> as <b>administrator</b> when editing the file."

## Step 2: Create the version_6_1.rb File

Create a file named `version_6_1.rb` in the same directory. If you don't want to bother, you can download the ready-made file from the links below:

- [version_6_1.rb (Alternative 1)](http://www.coter.net/upload/version_6_1.rb){: target="\_blank" rel="noopener noreferrer"}
- [version_6_1.rb (Alternative 2)](http://www.mediafire.com/file/wzq4l2xe6ul2dnw/version_6_1.rb/file){: target="\_blank" rel="noopener noreferrer"}

## Step 3: Add the Required Line to plugin.rb File

Go to the parent directory and open the `plugin.rb` file. Add the following line:

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

## Result

After completing the above operations, run Vagrant again. It should now work compatibly with VirtualBox 6.1. If you're still getting an error, don't hesitate to share it in the comments! 👍💗

[responsive_img src="/images/ol_vbox_vagrant-min-xl.webp" alt="Vagrant VirtualBox Windows Linux Update" /]
