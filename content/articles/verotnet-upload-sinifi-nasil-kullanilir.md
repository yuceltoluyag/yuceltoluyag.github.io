Title: Verot.net Upload Sınıfı Nasıl Kullanılır
Date: 2017-02-15
Category: PHP Geliştirme
Author: yuceltoluyag
Slug: verotnet-upload-sinifi-nasil-kullanilir
Summary: Verot.net tarafından geliştirilen class.upload.php dosyası ile PHP projelerinde dosya ve resim yüklemeyi kolayca gerçekleştirebilirsiniz.
Tags: php, upload, verot, file upload, resim yükleme
Lang: tr
Translation: false
Image: images/verotnetsinifikullanimi-xl.webp

## Verot.net Upload Sınıfı Nasıl Kullanılır

Projemde kullanmak üzere çoklu yükleme sınıflarına göz atarken denk geldiğim harika bir yükleme sınıfını sizlerle paylaşmak istiyorum.  
Kurulumu ve kullanımı oldukça **basit** olan bu sınıf, özellikle resim yükleme işlemlerinde büyük kolaylık sağlar.

## Kurulum

Öncelikle [Verot.net class.upload.php](https://www.verot.net/php_class_upload.htm){: target="\_blank" rel="noopener noreferrer"} adresinden ZIP dosyasını indiriyoruz.  
ZIP’in içindeki **SRC** klasörüne giriyoruz ve:

- `class.upload.php` dosyasını
- `lang` klasörünü

projemizin bulunduğu dizine kopyalıyoruz.

Daha sonra PHP dosyamıza sınıfı dahil ediyoruz:

```php
require_once 'class.upload.php';
```

## Form Alanının Oluşturulması

HTML formumuzu şu şekilde hazırlıyoruz:

```html
<form enctype="multipart/form-data" method="post" action="upload.php">
  <input type="file" size="32" name="image_field" value="" />
  <input type="submit" name="Submit" value="upload" />
</form>
```

Burada `name` kısmı önemlidir.
Resim yükleyeceğimiz için `image_field` veya `image` olarak adlandırabiliriz.
Form `upload.php` sayfasına POST yöntemiyle gönderilecektir.

## PHP Tarafında Dosya Yükleme İşlemi

`upload.php` dosyasına aşağıdaki kodları yazıyoruz:

```php
$handle = new upload($_FILES['image_field']); // name kısmında yazan yeri buraya yazdık
if ($handle->uploaded) {
  $handle->file_new_name_body   = 'image_resized';
  $handle->image_resize         = true; // Resmi boyutlandırmak istediğimizi onaylıyoruz
  $handle->image_x              = 100;  // X ekseni üzerinde 100 olarak küçültme yapacak
  $handle->image_ratio_y        = true; // Oran koruma
  $handle->process('/home/user/files/'); // Dosyanın yükleneceği klasör
  if ($handle->processed) {  // Başarılıysa
    echo 'image resized';
    $handle->clean();
  } else { // Başarısız ise
    echo 'error : ' . $handle->error;
  }
}
```

!!! tip "İpucu ⚡ Bu örnek, resmin otomatik olarak küçük boyutlu bir kopyasını (thumbnail) oluşturur."

## Thumb (Küçük Görsel) Oluşturmayı Kaldırmak

Thumb istemiyorsanız aşağıdaki satırları kaldırmanız yeterlidir:

```php
$handle->file_new_name_body   = 'image_resized';
$handle->image_resize         = true;
$handle->image_x              = 100;
$handle->image_ratio_y        = true;
```

## Dil Dosyası Dahil Etme

Eğer Türkçe hata mesajları ve sistem çıktıları istiyorsanız şu şekilde dil dosyasını dahil edebilirsiniz:

```php
$handle = new upload($_FILES['image_field'], 'tr_TR');
```

Eğer bunu yazmazsanız, varsayılan dil İngilizce olacaktır.

!!! note "Not: Dil dosyaları `lang` klasöründe bulunur ve farklı diller için dosya ekleyerek destek genişletebilirsiniz."

## Kullanışlı Ayar ve Metodlar

Aşağıda sıkça kullanılan bazı özellikler ve açıklamaları yer alıyor:

```php
$handle->file_overwrite = true;
```

Dosyaların üzerine yazılmasını sağlar.
Örneğin aynı isimde (`ahmet.jpg`) bir dosya varsa, hata yerine üzerine yazar.

```php
$handle->file_new_name_body = 'new_name';
```

Yüklenen dosyanın ismini belirler. Örneğin “abuzer” yazarsanız tüm resimler bu isimle yüklenir.

```php
$handle->file_auto_rename = true;
```

Aynı isimli dosya varsa otomatik olarak farklı bir isim verir. (Varsayılan: false)

```php
$handle->file_max_size = '1024';
```

Yüklenecek dosya boyutunu sınırlar (örnek: 1 KB).

```php
$handle->allowed = array('application/pdf','application/msword','image/*');
```

Yüklenmesine izin verilen dosya türlerini belirtir.

```php
$handle->image_convert = 'jpg';
```

Yüklenen resimleri istenen formata dönüştürür. (Desteklenen formatlar: png, jpeg, gif, bmp)

```php
$handle->jpeg_quality = 50;
```

Resim kalitesini belirler. Değer küçüldükçe dosya boyutu azalır, kalite düşer.

```php
$handle->image_max_width = 200;
$handle->image_max_height = 100;
$handle->image_min_width = 100;
$handle->image_min_height = 500;
```

Resimlerin minimum ve maksimum boyutlarını kontrol eder.

!!! warning "Dikkat! Boyut limitlerini aşan veya desteklenmeyen dosya türleri hata verecektir."

Daha fazla bilgi için resmi dökümantasyonu inceleyebilirsiniz:
👉 [https://github.com/verot/class.upload.php/blob/master/README.md](https://github.com/verot/class.upload.php/blob/master/README.md){: target="\_blank" rel="noopener noreferrer"}

[responsive_img src="/images/verotnetsinifikullanimi-xl.webp" alt="Verotnet Nasıl Kullanılır." /]
