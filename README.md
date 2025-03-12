
#  Minel - Minimal Pelican Theme

  

Minel, Pelican blog motoru için Tailwind CSS ile geliştirilmiş minimal bir temadır.

  

##  Özellikler

  

- Tailwind CSS ile modern tasarım

- Karanlık/Aydınlık mod desteği

- Mobil uyumlu (responsive) tasarım

- İçindekiler tablosu

- Kod vurgulama (syntax highlighting)

- SEO optimizasyonu

- Yapısal veri (Schema.org) desteği

- Arama özelliği

- İstatistik özellikleri

- Resim optimizasyonu

- Minify desteği

- PWA desteği

- Çoklu dil desteği

- Öne çıkan makale desteği

- RSS ve Atom feed desteği

  

##  Kurulum

  

1. Tema dosyalarını Pelican projenizin `themes/Minel` dizinine kopyalayın
2. Kaynak Dosyalarınızı **_assets** klasörüne atınız. (css,js,images) Nodejs betiği dosyaları işlemden geçirdikten sonra gerekli yerlere kendisi otomatik çıkartacaktır.

3.  `pelicanconf.py` dosyanızda temayı etkinleştirin:

  

```python

THEME  =  'themes/Minel'

```

  

3. Gerekli npm paketlerini yükleyin:

  

```bash

npm  install

```

  

4. Gerekli Python paketlerini yükleyin:

  

```bash

pip  install  -r  requirements.txt

```

  

##  Geliştirme

  Bu temayı kodladığımda Tailwind köklü bir değişikliğe giderek 4.0 sürümünü çıkardı.Henüz yeni sürümle uyumlu değildir.

###  Geliştirme Modu

  

Dosyaları izlemek ve değişiklikleri otomatik derlemek için:

  

```bash

npm  run  dev

```

  

veya

  

```bash

duty  watch

```

  

###  Üretim için Derleme

  

Tüm dosyaları optimize edilmiş şekilde derlemek için:

  

```bash

npm  run  build # dev
npm run publish # production
# Üretimden sonra
duty livereload # dev
```

  

veya

  

```bash

duty  build

```

  

Bu komut aşağıdaki işlemleri yapar:

- CSS dosyalarını minimize eder

- JavaScript dosyalarını minimize eder

- Resimleri optimize eder

- WebP formatına dönüştürür

- Service Worker dosyasını oluşturur

- Manifest dosyasını oluşturur

  

###  Temizleme

  

Derlenen dosyaları temizlemek için:

  

```bash

npm  run  clean

```

  

veya

  

```bash

duty  clean

```

  

##  Yapılandırma

  

Tema için `pelicanconf.py` dosyanızda aşağıdaki ayarları kullanabilirsiniz:

  

##  Yeni makale oluşturmak için

```bash

# Create a new post

duty new "My New Post"`

```

##  Lisans

MIT