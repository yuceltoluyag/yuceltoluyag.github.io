Title: Sweet Alert Sınıfı Kullanımı: Detaylı Anlatım ve Tüm Argümanları
Date: 2018-09-10 12:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: yazılım, sweetalert
Slug: sweet-alert-kullanimi
Authors: yuceltoluyag
Summary: Sweet Alert sınıfının kullanımını, tüm argümanlarıyla birlikte detaylı bir şekilde anlatıyoruz. Mobil uyumlu, şık uyarı pencereleri oluşturmak için rehberimizi inceleyin.
Translation: false
Status: published
Template: article
Image: images/sweetalert-xl.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114978582840667535

# Sweet Alert Nedir?

Klasik uyarı pencerelerinden sıkıldıysanız, modern ve mobil uyumlu bir alternatif olan **SweetAlert** kütüphanesini kullanabilirsiniz. Eğer PHP ile nasıl kullanabileceğinizi merak ediyorsanız, [PHP Morris Js](/pdo-sum-fonksiyonu-kullanimi-morris-js/){: target="_blank" rel="noopener noreferrer"} yazısını inceleyebilirsiniz.

Öncelikle, kütüphaneyi projenize dahil etmelisiniz.



## SweetAlert Kütüphanesini Dahil Etme

```html
<script src="dist/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
```

Bir butona tıklandığında uyarı penceresinin açılmasını sağlayalım:

```html
<button id="uyariButonu">Tıkla Bana</button>
```

Şimdi jQuery kodlarını ekleyelim:

## Örnek Kod

```javascript
<script type="text/javascript">
  $(function() {
    $("#uyariButonu").click(function () {
      sweetAlert({
        title: "Bu Bir Başlıktır",
        text: "Burası <b>Açıklama</b> Kısmıdır adamcoder.net",
        allowEscapeKey: true, // false yaparsanız ESC tuşu kapatmaz
        customClass: "ozel-sinif", // <button class="ozel-sinif"> gibi
        allowOutsideClick: false, // true yaparsanız dışarı tıklanınca kapanır
        showCancelButton: false, // Geri butonu görünmez
        showConfirmButton: true, // Onay butonu görünür
        confirmButtonText: "Tamamdır", // Buton yazısını özelleştirin
        confirmButtonColor: "#AEDEF4", // Onay butonunun rengini değiştirin
        cancelButtonText: "Geri Git", // İptal butonu metni
        closeOnConfirm: true, // Onaya basıldığında pencere kapanır
        closeOnCancel: true, // İptale basıldığında pencere kapanır
        imageUrl: "/images/sweetalert.webp", // Uyarı penceresinin resmi
        imageSize: "100x100", // Resim boyutu
        timer: 10000, // 10 saniye sonra otomatik kapanır
        html: true
      });
    });
  });
</script>
```

## SweetAlert Argümanları

| Argüman | Açıklama |
|---------|---------|
| **title** | Uyarının başlık kısmıdır. |
| **text** | Uyarı penceresindeki açıklama metnidir. |
| **type** | "warning", "error", "success", "info" gibi tipleri belirler. |
| **allowEscapeKey** | ESC tuşuyla pencerenin kapanmasını sağlar. |
| **customClass** | Özel CSS sınıfı eklemenize olanak tanır. |
| **allowOutsideClick** | Dışarı tıklanırsa pencerenin kapanmasını belirler. |
| **showCancelButton** | İptal butonunu gösterir. |
| **showConfirmButton** | Onay butonunu gösterir. |
| **confirmButtonText** | Onay butonu metnini belirler. |
| **confirmButtonColor** | Onay butonunun rengini değiştirir. |
| **cancelButtonText** | İptal butonunun metnini değiştirir. |
| **imageUrl** | Uyarı penceresine özel bir resim ekler. |
| **imageSize** | Resmin genişlik ve yükseklik değerlerini belirler. |
| **timer** | Belirtilen süre sonunda pencereyi otomatik olarak kapatır. |
| **html** | HTML etiketlerini kullanmanıza olanak tanır. |
| **animation** | Açılış animasyonunu değiştirir. |
| **inputType** | "text", "password", "submit" gibi giriş alanı türlerini belirler. |
| **inputPlaceholder** | Giriş alanına ipucu metni ekler. |
| **inputValue** | Giriş alanına varsayılan bir değer ekler. |
| **closeOnConfirm** | Onay butonuna basılınca pencerenin kapanmasını sağlar. |
| **closeOnCancel** | İptal butonuna basılınca pencerenin kapanmasını sağlar. |

## Örnek Görsel


[responsive_img src="/images/sweetalert-xl.webp" alt="SweetAlert Örneği" /]

## İndirme Bağlantısı

[Örnek Dosyayı İndirin](http://www.mediafire.com/file/aelw1zkhwcv17b7/sweetalertadamcoder.zip){: target="_blank" rel="noopener noreferrer"}

