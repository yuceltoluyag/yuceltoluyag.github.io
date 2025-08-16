Title: Arch Linux'ta Conda Kurulumu ve Yönetimi
Date: 2025-02-28 10:00 10:00
Modified: 2025-08-11 22:59
Category: Yazılım Geliştirme
Tags: archlinux, python, conda, miniconda, yazılım
Slug: arch-linux-conda-kurulumu
Authors: yuceltoluyag
Summary: Arch Linux üzerinde Conda kurulumunu yaparken dikkat edilmesi gereken adımlar ve en iyi uygulamalar.
Translation: false
Status: published
Template: article
Image: images/conda-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114985320597394764

# Arch Linux'ta Conda Kurulumu ve Yönetimi



Conda, yazılım paketlerini ve ortamlarını yönetmek için kullanılan popüler bir açık kaynaklı araçtır. Python geliştirme ortamlarında özellikle kullanılır, ancak başka diller için de destek sunar. Bu makalede, Conda'nın kurulumu ve temel kullanımı adım adım açıklanacak, ayrıca Arch Linux üzerinde en verimli şekilde Conda nasıl kurulmalı ve yönetilmeli, en iyi uygulamalarla birlikte ele alınacaktır.

## 1. Conda Kurulumu

Conda, Anaconda veya Miniconda dağıtımlarını kullanarak kurulabilir. Miniconda, Anaconda'nın daha hafif bir versiyonudur ve yalnızca Conda yönetici aracını içerir. Arch Linux gibi sistemlerde Conda'yı kurarken dikkat edilmesi gereken bazı iyi uygulamalar vardır. İşte başlangıç noktası:

### 1.1 Miniconda Kurulumu

Miniconda, Conda'nın temel kurulumunu sağlar ve başlangıçta gereksiz paketlerden kaçınmak için tercih edilebilir. Miniconda'yı kurmak için şu adımları izleyebilirsiniz:

1. Miniconda'yı [resmi web sitesinden](https://docs.conda.io/en/latest/miniconda.html){: target="_blank" rel="noopener noreferrer"} indirin.
2. Terminali açın ve Miniconda kurulum dosyasını çalıştırın:
   ```bash
   bash Miniconda3-latest-Linux-x86_64.sh
   ```
3. Kurulum sırasında size bir lisans sözleşmesi sunulacaktır. Kabul etmek için `yes` yazın.
4. Kurulum klasörünü seçin. Varsayılan olarak, Miniconda `~/miniconda3` dizinine kurulacaktır. Eğer bu dizini değiştirmek isterseniz, kurulum sırasında farklı bir dizin belirtmeniz yeterlidir.

   **Öneri**: Miniconda'yı varsayılan dizinden farklı bir dizine kurmak istiyorsanız, kurulum sırasında şu komutu kullanabilirsiniz:

   ```bash
   bash Miniconda3-latest-Linux-x86_64.sh -p /yeni/dizin/miniconda3
   ```

5. Kurulum tamamlandığında, Conda'yı etkinleştirmek için terminali yeniden başlatın veya aşağıdaki komutu çalıştırın:

   ```bash
   source ~/.bashrc
   ```

### 1.2 Conda'nın Versiyonunu Kontrol Etme

Kurulumdan sonra Conda'nın doğru şekilde yüklendiğinden emin olmak için şu komutu kullanabilirsiniz:

```bash
conda --version

```

Eğer doğru şekilde kurulduysa, Conda versiyonunu görebilirsiniz.

## 2. Conda'yı Güncelleme

Conda'yı güncellemek için şu komutu kullanabilirsiniz:

```bash
conda update -n base -c defaults conda

```

Bu komut, `base` ortamında Conda'yı günceller ve en son sürümü indirir.

## 3. Conda Ortamları Yönetme

Conda, farklı projeler için bağımsız ortamlar oluşturmanıza olanak tanır. Bu sayede, projelerinizde farklı Python sürümleri veya paketler kullanabilirsiniz.

### 3.1 Yeni Bir Ortam Oluşturma

Yeni bir Conda ortamı oluşturmak için şu komutu kullanabilirsiniz:

```bash
conda create -n myenv python=3.10

```

Burada `myenv`, ortamın adıdır ve `python=3.10` ifadesi Python 3.10 sürümünü içerir.

### 3.2 Ortamı Etkinleştirme

Oluşturduğunuz ortamı etkinleştirmek için şu komutu kullanabilirsiniz:

```bash
conda activate myenv

```

### 3.3 Ortamı Listeleme

Tüm Conda ortamlarını listelemek için şu komutu kullanabilirsiniz:

```bash
conda env list

```

Bu komut, mevcut ortamların bir listesini döndürecektir.

## 4. Paket Yönetimi

Conda, yazılım paketlerini kolayca yönetmek için kullanılır. Yeni paketler yükleyebilir, güncelleyebilir veya silebilirsiniz.

### 4.1 Paket Yükleme

Bir paketi yüklemek için şu komutu kullanabilirsiniz:

```bash
conda install numpy

```

Bu komut, NumPy paketini yükleyecektir.

### 4.2 Paket Güncelleme

Mevcut bir paketi güncellemek için şu komutu kullanabilirsiniz:

```bash
conda update numpy

```

### 4.3 Paket Kaldırma

Bir paketi kaldırmak için şu komutu kullanabilirsiniz:

```bash
conda remove numpy

```

## 5. En İyi Kurulum Uygulamaları

Arch Linux gibi bir sistemde Conda'nın kurulumunu yaparken bazı iyi uygulamalara dikkat etmek gerekir. İşte bu konuda dikkat edilmesi gereken bazı önemli noktalar:

### 5.1 Sistem Genelinde Kurulumdan Kaçının

**Neden Sistem Genelinde Kurulumdan Kaçınmalıyız?**

Anaconda'yı sistem genelinde kurmak, sisteminizin düzenini bozabilir. Bunun yerine, Anaconda'yı kendi `~/.anaconda` dizininize kurarak sadece gerektiğinde etkinleştirmeniz çok daha sağlıklıdır. Sistem genelinde kurulum, genellikle karışıklık yaratabilir ve farklı Python sürümleri veya paketleri arasında uyumsuzluklara yol açabilir. Sistemdeki diğer araçlarla da çakışmalar yaşanabilir.

**Önerilen Yöntem**: Conda'yı kullanıcı dizininize kurarak, sadece gerekli olduğunda kullanmak en iyi yaklaşımdır. Bu yöntem, sistemi temiz tutmanıza yardımcı olur ve paket yönetimini daha kontrollü hale getirir.

Kurulum sırasında "Conda'yı başlatmak ister misiniz?" sorusuna **hayır** demek önemlidir. Bu, `.bashrc` veya `.zshrc` gibi dosyalarınıza dokunmaz ve Conda'yı yalnızca gerektiğinde şu komutla etkinleştirirsiniz:

```bash
source <path_to_conda>/bin/activate

```

Bu, Conda'nın sisteminizde izole bir şekilde çalışmasını sağlar, böylece düzeninizi korur.

### 5.2 AUR Üzerinden Kurulum (Approach 2)

Eğer her şeyinizi AUR (Arch User Repository) üzerinden kuruyorsanız, pacman ile kurulum yaparak her şeyin düzgün bir şekilde takip edilmesini sağlarsınız. Ancak, bu yöntemle Conda sistem genelinde kurulur ve `/usr/opt/bin` veya `/usr/opt/lib` gibi dizinlere yerleşir. Bu, Conda'yı doğru şekilde kullanmayı zorlaştırabilir.

**Yine de Arch Linux'ta her şeyin kolayca geri alınabilmesi sayesinde, sisteminizde herhangi bir karmaşa oluşursa, hızlıca kaldırıp tekrar kurabilirsiniz. Ancak, her zaman daha kontrollü bir kurulum önerilir.**

### 5.3 Conda Base Ortamını Yönetmek

Conda'yı kurduktan sonra, terminalde otomatik olarak base ortamının etkinleşmesi bazen kafa karıştırıcı olabilir. Bu, terminalde çalıştığınızda bazen beklenmeyen sonuçlar doğurabilir. Eğer `base` ortamının otomatik olarak etkinleşmesini istemiyorsanız, şu komutla devre dışı bırakabilirsiniz:

```bash
conda deactivate

```

Ya da `.bashrc` dosyanıza `conda deactivate` ekleyerek her terminal açıldığında otomatik olarak `base` ortamının devre dışı olmasını sağlayabilirsiniz.

## 6. Sonuç

Bu makalede Conda'nın kurulumu, güncellenmesi, ortam yönetimi ve paket yönetimi hakkında temel bilgiler paylaşıldı. Arch Linux'ta Conda kurulumunda en iyi uygulamaları benimsemek, sisteminizin düzenini korumaya yardımcı olur ve yazılım geliştirme sürecinizi daha verimli hale getirir. Conda'yı etkili bir şekilde kullanarak projelerinizde bağımsız ortamlar oluşturabilir ve Python geliştirme deneyiminizi bir üst seviyeye taşıyabilirsiniz.

Unutmayın, Conda'yı düzgün kurmak ve kullanmak, uzun vadede başınızı ağrıtacak büyük sorunlardan kaçınmanıza yardımcı olacaktır!

## Output

```bash
[friday13@archlinux ~]$ curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:  6  140M    6 8942k    0     0  9113k      0  0:00:15 --: 14  140M   14 20.6M    0     0  10.4M      0  0:00:13  0: 22  140M   22 32.2M    0     0  10.8M      0  0:00:13  0: 30  140M   30 43.6M    0     0  10.9M      0  0:00:12  0: 38  140M   38 54.9M    0     0  11.0M      0  0:00:12  0: 46  140M   46 66.2M    0     0  11.0M      0  0:00:12  0: 54  140M   54 77.5M    0     0  11.1M      0  0:00:12  0: 63  140M   63 88.7M    0     0  11.1M      0  0:00:12  0: 70  140M   70  100M    0     0  11.1M      0  0:00:12  0: 78  140M   78  111M    0     0  11.1M      0  0:00:12  0: 84  140M   84  119M    0     0  10.8M      0  0:00:12  0: 92  140M   92  130M    0     0  10.9M      0  0:00:12  0:100  140M  100  140M    0     0  10.9M      0  0:00:12  0:00:12 --:--:-- 10.6M

Welcome to Miniconda3 py312_24.11.1-0

In order to continue the installation process, please review the license
agreement.
Please, press ENTER to continue
>>>
ANACONDA TERMS OF SERVICE

Please read these Terms of Service carefully before purcha
sing, using, accessing, or downloading any Anaconda Offeri
ngs (the "Offerings"). These Anaconda Terms of Service ("T
OS") are between Anaconda, Inc. ("Anaconda") and you ("You
"), the individual or entity acquiring and/or providing ac
cess to the Offerings. These TOS govern Your access, downl
oad, installation, or use of the Anaconda Offerings, which
 are provided to You in combination with the terms set for
th in the applicable Offering Description, and are hereby
incorporated into these TOS. Except where indicated otherw
ise, references to "You" shall include Your Users. You her
eby acknowledge that these TOS are binding, and You affirm
 and signify your consent to these TOS by registering to,
using, installing, downloading, or accessing the Anaconda
Offerings effective as of the date of first registration,
use, install, download or access, as applicable (the "Effe
ctive Date"). Capitalized definitions not otherwise define
d herein are set forth in Section 15 (Definitions). If You
 do not agree to these Terms of Service, You must not regi

Do you accept the license terms? [yes|no]
>>> yes

Miniconda3 will now be installed into this location:
/home/friday13/miniconda3

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

[/home/friday13/miniconda3] >>> ~/.miniconda3
PREFIX=/home/friday13/.miniconda3
Unpacking payload ...

Installing base environment...


Downloading and Extracting Packages:


## Package Plan ##

  environment location: /home/friday13/.miniconda3

  added / updated specs:
    - defaults/linux-64::_libgcc_mutex==0.1=main[md5=c3473ff8bdb3d124ed5ff11ec380d6f9]
    - defaults/linux-64::_openmp_mutex==5.1=1_gnu[md5=71d281e9c2192cb3fa425655a8defb85]
    - defaults/linux-64::anaconda-anon-usage==0.5.0=py312hfc0e8ea_100[md5=d47669c8f312a5d2be0a5e095bb8e896]
    - defaults/linux-64::boltons==23.0.0=py312h06a4308_0[md5=36d464442713fc92897b7da029a08fb6]
    - defaults/linux-64::brotli-python==1.0.9=py312h6a678d5_8[md5=e6bdf1f9e8e1ad3543aaec7e9ecea7e7]
    - defaults/linux-64::bzip2==1.0.8=h5eee18b_6[md5=f21a3ff51c1b271977f53ce956a69297]
    - defaults/linux-64::c-ares==1.19.1=h5eee18b_0[md5=6cfbce52273a1cb888821f18ceaa83c4]
    - defaults/linux-64::ca-certificates==2024.11.26=h06a4308_0[md5=cebd61e6520159a1315d679321620f6c]
    - defaults/linux-64::certifi==2024.8.30=py312h06a4308_0[md5=42ef53b6872f15913c0d7d702ec7475e]
    - defaults/linux-64::cffi==1.17.1=py312h1fdaa30_0[md5=8472aea146fecf25898d67adea2ddbf8]
    - defaults/linux-64::conda-anaconda-telemetry==0.1.1=py312h06a4308_0[md5=7b3f838270a69f22b366f74dab6e6f64]
    - defaults/linux-64::conda-content-trust==0.2.0=py312h06a4308_1[md5=fdcf7a04d9cc833ea3f397a414010206]
    - defaults/linux-64::conda-package-handling==2.4.0=py312h06a4308_0[md5=20af9c2597fae0494f5d5a256dae433a]
    - defaults/linux-64::conda-package-streaming==0.11.0=py312h06a4308_0[md5=d5ffa1f42c41b7cdad0cf9ac68f83772]
    - defaults/linux-64::conda==24.11.1=py312h06a4308_0[md5=1124d7f759c3a610b10c2e21dec55ebe]
    - defaults/linux-64::cryptography==43.0.3=py312h7825ff9_1[md5=1c255fd1f8a79304f4a316fb5304e07b]
    - defaults/linux-64::distro==1.9.0=py312h06a4308_0[md5=71b90a563af005b336c976cc9466221c]
    - defaults/linux-64::expat==2.6.4=h6a678d5_0[md5=3ec804f5b85a66e64b262cc2341dd004]
    - defaults/linux-64::fmt==9.1.0=hdb19cb5_1[md5=4f12930203ff2d84df5d287af9b29858]
    - defaults/linux-64::frozendict==2.4.2=py312h06a4308_0[md5=76ae0259102a2156cc0e1ff9ada0f2c6]
    - defaults/linux-64::icu==73.1=h6a678d5_0[md5=6d09df641fc23f7d277a04dc7ea32dd4]
    - defaults/linux-64::idna==3.7=py312h06a4308_0[md5=03cc59cdabff44c47be0fadffcef003c]
    - defaults/linux-64::jsonpatch==1.33=py312h06a4308_1[md5=c3de52aaf670064f85106ddb32d720d9]
    - defaults/linux-64::krb5==1.20.1=h143b758_1[md5=cf1accc86321fa25d6b978cc748039ae]
    - defaults/linux-64::ld_impl_linux-64==2.40=h12ee557_0[md5=ee672b5f635340734f58d618b7bca024]
    - defaults/linux-64::libarchive==3.7.4=hfab0078_0[md5=fcc6a63f95a80a5d2ff9d3e208e9a638]
    - defaults/linux-64::libcurl==8.9.1=h251f7ec_0[md5=8133d8f19e8136a10f9f81180026c859]
    - defaults/linux-64::libedit==3.1.20230828=h5eee18b_0[md5=850eb5a9d2d7d3c66cce12e84406ca08]
    - defaults/linux-64::libev==4.33=h7f8727e_1[md5=5065620db4393fb549f30114a33897d1]
    - defaults/linux-64::libffi==3.4.4=h6a678d5_1[md5=70646cc713f0c43926cfdcfe9b695fe0]
    - defaults/linux-64::libgcc-ng==11.2.0=h1234567_1[md5=a87728dabf3151fb9cfa990bd2eb0464]
    - defaults/linux-64::libgomp==11.2.0=h1234567_1[md5=b372c0eea9b60732fdae4b817a63c8cd]
    - defaults/linux-64::libmamba==1.5.11=hfe524e5_0[md5=c6cd365c4e32d3fa01daca8d1beb151b]
    - defaults/linux-64::libmambapy==1.5.11=py312haf1ee3a_0[md5=256e6f590082a1cba3601be900ea2e81]
    - defaults/linux-64::libnghttp2==1.57.0=h2d74bed_0[md5=674871621300f54e7ffcf93e6e341638]
    - defaults/linux-64::libsolv==0.7.24=he621ea3_1[md5=c22067963515e7a8d27a5a222a48d870]
    - defaults/linux-64::libssh2==1.11.1=h251f7ec_0[md5=dd68c24355431c0543339dda1404129d]
    - defaults/linux-64::libstdcxx-ng==11.2.0=h1234567_1[md5=57623d10a70e09e1d048c2b2b6f4e2dd]
    - defaults/linux-64::libuuid==1.41.5=h5eee18b_0[md5=4a6a2354414c9080327274aa514e5299]
    - defaults/linux-64::libxml2==2.13.5=hfdd30dd_0[md5=491a355fbc51e30d42c76e1cb6716b8a]
    - defaults/linux-64::lz4-c==1.9.4=h6a678d5_1[md5=2ee58861f2b92b868ce761abb831819d]
    - defaults/linux-64::menuinst==2.2.0=py312h06a4308_0[md5=2f79985b318b96f1a79d9ca27b350bde]
    - defaults/linux-64::ncurses==6.4=h6a678d5_0[md5=5558eec6e2191741a92f832ea826251c]
    - defaults/linux-64::openssl==3.0.15=h5eee18b_0[md5=019e501b69841c6d4aeaef3b8619a678]
    - defaults/linux-64::packaging==24.1=py312h06a4308_0[md5=756ec42d4f934b642b8476689af2781f]
    - defaults/linux-64::pcre2==10.42=hebb0a14_1[md5=727e15c3cfa02b032da4eb0c1123e977]
    - defaults/linux-64::pip==24.2=py312h06a4308_0[md5=798cbea8112672434d0cd7551f8fc4b9]
    - defaults/linux-64::platformdirs==3.10.0=py312h06a4308_0[md5=39dc9eb538e73250dadcdec7a8ed6595]
    - defaults/linux-64::pluggy==1.5.0=py312h06a4308_0[md5=1287a7b660a041fbbb8931defb9111d6]
    - defaults/linux-64::pycosat==0.6.6=py312h5eee18b_1[md5=4ccf6371e1ccb1ccbecac26ab4fd1607]
    - defaults/linux-64::pysocks==1.7.1=py312h06a4308_0[md5=8efb8494277b7f0faedf9d437b23cbe1]
    - defaults/linux-64::python==3.12.8=h5148396_0[md5=30e7668cd39635e3b72f86b9053540b1]
    - defaults/linux-64::readline==8.2=h5eee18b_0[md5=be42180685cce6e6b0329201d9f48efb]
    - defaults/linux-64::reproc-cpp==14.2.4=h6a678d5_2[md5=b03aa4903158279f003e7032ab9f5601]
    - defaults/linux-64::reproc==14.2.4=h6a678d5_2[md5=3c6dbc6c60b3897222d79359343e90fa]
    - defaults/linux-64::requests==2.32.3=py312h06a4308_1[md5=8cc2fc3e2198c2efe6cd890a7684a16a]
    - defaults/linux-64::ruamel.yaml.clib==0.2.8=py312h5eee18b_0[md5=4e151915d3acb78754b5cd1be029fcd2]
    - defaults/linux-64::ruamel.yaml==0.18.6=py312h5eee18b_0[md5=b4817fd05fdab4ce718bf1e7aab55f75]
    - defaults/linux-64::setuptools==75.1.0=py312h06a4308_0[md5=c96d08a405d335f2b0200c0f281b1fdc]
    - defaults/linux-64::sqlite==3.45.3=h5eee18b_0[md5=acf93d6aceb74d6110e20b44cc45939e]
    - defaults/linux-64::tk==8.6.14=h39e8969_0[md5=78dbc5e3c69143ebc037fc5d5b22e597]
    - defaults/linux-64::tqdm==4.66.5=py312he106c6f_0[md5=099959333950bef1a3d7d12133cbfafc]
    - defaults/linux-64::truststore==0.8.0=py312h06a4308_0[md5=ad93bd626fc17c1606394fe258b4ed18]
    - defaults/linux-64::urllib3==2.2.3=py312h06a4308_0[md5=08b5f80f188ed801e9f463124a481289]
    - defaults/linux-64::wheel==0.44.0=py312h06a4308_0[md5=6d495438dd44e8f16b1a05d0a8648644]
    - defaults/linux-64::xz==5.4.6=h5eee18b_1[md5=1562802f843297ee776a50b9329597ed]
    - defaults/linux-64::yaml-cpp==0.8.0=h6a678d5_1[md5=015d2d74ad3c8e53eec3358637433718]
    - defaults/linux-64::zlib==1.2.13=h5eee18b_1[md5=92e42d8310108b0a440fb2e60b2b2a25]
    - defaults/linux-64::zstandard==0.23.0=py312h2c38b39_1[md5=2cbafae57b8b4ec11666119d44ad4d71]
    - defaults/linux-64::zstd==1.5.6=hc292b87_0[md5=78ae7abd3020b41f827b35085845e1b8]
    - defaults/noarch::archspec==0.2.3=pyhd3eb1b0_0[md5=13d01ee2d343d8539bb47055a6c0b5b2]
    - defaults/noarch::charset-normalizer==3.3.2=pyhd3eb1b0_0[md5=c6fea3691e85cf7f568b0618ec29fc4f]
    - defaults/noarch::conda-libmamba-solver==24.9.0=pyhd3eb1b0_0[md5=251a69a5bf578ef59fdf8255c7c25c5d]
    - defaults/noarch::jsonpointer==2.1=pyhd3eb1b0_0[md5=298ff809e733cb04366e4e629c65aa8d]
    - defaults/noarch::pybind11-abi==5=hd3eb1b0_0[md5=7f0df6639fdf60ccd3045ee6faedd32f]
    - defaults/noarch::pycparser==2.21=pyhd3eb1b0_0[md5=135a72ff2a31150a3a3ff0b1edd41ca9]
    - defaults/noarch::tzdata==2024b=h04d1e81_0[md5=9be694715c6a65f9631bb1b242125e9d]


The following NEW packages will be INSTALLED:

  _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main
  _openmp_mutex      pkgs/main/linux-64::_openmp_mutex-5.1-1_gnu
  anaconda-anon-usa~ pkgs/main/linux-64::anaconda-anon-usage-0.5.0-py312hfc0e8ea_100
  archspec           pkgs/main/noarch::archspec-0.2.3-pyhd3eb1b0_0
  boltons            pkgs/main/linux-64::boltons-23.0.0-py312h06a4308_0
  brotli-python      pkgs/main/linux-64::brotli-python-1.0.9-py312h6a678d5_8
  bzip2              pkgs/main/linux-64::bzip2-1.0.8-h5eee18b_6
  c-ares             pkgs/main/linux-64::c-ares-1.19.1-h5eee18b_0
  ca-certificates    pkgs/main/linux-64::ca-certificates-2024.11.26-h06a4308_0
  certifi            pkgs/main/linux-64::certifi-2024.8.30-py312h06a4308_0
  cffi               pkgs/main/linux-64::cffi-1.17.1-py312h1fdaa30_0
  charset-normalizer pkgs/main/noarch::charset-normalizer-3.3.2-pyhd3eb1b0_0
  conda              pkgs/main/linux-64::conda-24.11.1-py312h06a4308_0
  conda-anaconda-te~ pkgs/main/linux-64::conda-anaconda-telemetry-0.1.1-py312h06a4308_0
  conda-content-tru~ pkgs/main/linux-64::conda-content-trust-0.2.0-py312h06a4308_1
  conda-libmamba-so~ pkgs/main/noarch::conda-libmamba-solver-24.9.0-pyhd3eb1b0_0
  conda-package-han~ pkgs/main/linux-64::conda-package-handling-2.4.0-py312h06a4308_0
  conda-package-str~ pkgs/main/linux-64::conda-package-streaming-0.11.0-py312h06a4308_0
  cryptography       pkgs/main/linux-64::cryptography-43.0.3-py312h7825ff9_1
  distro             pkgs/main/linux-64::distro-1.9.0-py312h06a4308_0
  expat              pkgs/main/linux-64::expat-2.6.4-h6a678d5_0
  fmt                pkgs/main/linux-64::fmt-9.1.0-hdb19cb5_1
  frozendict         pkgs/main/linux-64::frozendict-2.4.2-py312h06a4308_0
  icu                pkgs/main/linux-64::icu-73.1-h6a678d5_0
  idna               pkgs/main/linux-64::idna-3.7-py312h06a4308_0
  jsonpatch          pkgs/main/linux-64::jsonpatch-1.33-py312h06a4308_1
  jsonpointer        pkgs/main/noarch::jsonpointer-2.1-pyhd3eb1b0_0
  krb5               pkgs/main/linux-64::krb5-1.20.1-h143b758_1
  ld_impl_linux-64   pkgs/main/linux-64::ld_impl_linux-64-2.40-h12ee557_0
  libarchive         pkgs/main/linux-64::libarchive-3.7.4-hfab0078_0
  libcurl            pkgs/main/linux-64::libcurl-8.9.1-h251f7ec_0
  libedit            pkgs/main/linux-64::libedit-3.1.20230828-h5eee18b_0
  libev              pkgs/main/linux-64::libev-4.33-h7f8727e_1
  libffi             pkgs/main/linux-64::libffi-3.4.4-h6a678d5_1
  libgcc-ng          pkgs/main/linux-64::libgcc-ng-11.2.0-h1234567_1
  libgomp            pkgs/main/linux-64::libgomp-11.2.0-h1234567_1
  libmamba           pkgs/main/linux-64::libmamba-1.5.11-hfe524e5_0
  libmambapy         pkgs/main/linux-64::libmambapy-1.5.11-py312haf1ee3a_0
  libnghttp2         pkgs/main/linux-64::libnghttp2-1.57.0-h2d74bed_0
  libsolv            pkgs/main/linux-64::libsolv-0.7.24-he621ea3_1
  libssh2            pkgs/main/linux-64::libssh2-1.11.1-h251f7ec_0
  libstdcxx-ng       pkgs/main/linux-64::libstdcxx-ng-11.2.0-h1234567_1
  libuuid            pkgs/main/linux-64::libuuid-1.41.5-h5eee18b_0
  libxml2            pkgs/main/linux-64::libxml2-2.13.5-hfdd30dd_0
  lz4-c              pkgs/main/linux-64::lz4-c-1.9.4-h6a678d5_1
  menuinst           pkgs/main/linux-64::menuinst-2.2.0-py312h06a4308_0
  ncurses            pkgs/main/linux-64::ncurses-6.4-h6a678d5_0
  openssl            pkgs/main/linux-64::openssl-3.0.15-h5eee18b_0
  packaging          pkgs/main/linux-64::packaging-24.1-py312h06a4308_0
  pcre2              pkgs/main/linux-64::pcre2-10.42-hebb0a14_1
  pip                pkgs/main/linux-64::pip-24.2-py312h06a4308_0
  platformdirs       pkgs/main/linux-64::platformdirs-3.10.0-py312h06a4308_0
  pluggy             pkgs/main/linux-64::pluggy-1.5.0-py312h06a4308_0
  pybind11-abi       pkgs/main/noarch::pybind11-abi-5-hd3eb1b0_0
  pycosat            pkgs/main/linux-64::pycosat-0.6.6-py312h5eee18b_1
  pycparser          pkgs/main/noarch::pycparser-2.21-pyhd3eb1b0_0
  pysocks            pkgs/main/linux-64::pysocks-1.7.1-py312h06a4308_0
  python             pkgs/main/linux-64::python-3.12.8-h5148396_0
  readline           pkgs/main/linux-64::readline-8.2-h5eee18b_0
  reproc             pkgs/main/linux-64::reproc-14.2.4-h6a678d5_2
  reproc-cpp         pkgs/main/linux-64::reproc-cpp-14.2.4-h6a678d5_2
  requests           pkgs/main/linux-64::requests-2.32.3-py312h06a4308_1
  ruamel.yaml        pkgs/main/linux-64::ruamel.yaml-0.18.6-py312h5eee18b_0
  ruamel.yaml.clib   pkgs/main/linux-64::ruamel.yaml.clib-0.2.8-py312h5eee18b_0
  setuptools         pkgs/main/linux-64::setuptools-75.1.0-py312h06a4308_0
  sqlite             pkgs/main/linux-64::sqlite-3.45.3-h5eee18b_0
  tk                 pkgs/main/linux-64::tk-8.6.14-h39e8969_0
  tqdm               pkgs/main/linux-64::tqdm-4.66.5-py312he106c6f_0
  truststore         pkgs/main/linux-64::truststore-0.8.0-py312h06a4308_0
  tzdata             pkgs/main/noarch::tzdata-2024b-h04d1e81_0
  urllib3            pkgs/main/linux-64::urllib3-2.2.3-py312h06a4308_0
  wheel              pkgs/main/linux-64::wheel-0.44.0-py312h06a4308_0
  xz                 pkgs/main/linux-64::xz-5.4.6-h5eee18b_1
  yaml-cpp           pkgs/main/linux-64::yaml-cpp-0.8.0-h6a678d5_1
  zlib               pkgs/main/linux-64::zlib-1.2.13-h5eee18b_1
  zstandard          pkgs/main/linux-64::zstandard-0.23.0-py312h2c38b39_1
  zstd               pkgs/main/linux-64::zstd-1.5.6-hc292b87_0



Downloading and Extracting Packages:

Preparing transaction: done
Executing transaction: done
installation finished.
Do you wish to update your shell profile to automatically initialize conda?
This will activate conda on startup and change the command prompt when activated.
If you'd prefer that conda's base environment not be activated on startup,
   run the following command when conda is activated:

conda config --set auto_activate_base false

You can undo this by running `conda init --reverse $SHELL`? [yes|no]
[no] >>> no

You have chosen to not have conda modify your shell scripts at all.
To activate conda's base environment in your current shell session:

eval "$(/home/friday13/.miniconda3/bin/conda shell.YOUR_SHELL_NAME hook)"

To install conda's shell functions for easier access, first activate, then:

conda init

Thank you for installing Miniconda3!
```
[responsive_img src="/images/conda-xl.webp" alt="arch-linux-conda-kurulumu" /]