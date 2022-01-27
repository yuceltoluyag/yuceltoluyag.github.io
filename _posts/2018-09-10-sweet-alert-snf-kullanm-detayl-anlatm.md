---
layout: post
title: Sweet Alert Sınıfı Kullanımı Detaylı Anlatım Tüm Argümanları ile birlikte
description: Sweet Alert Sınıfı Kullanımı Detaylı Anlatım Tüm Argümanları ile birlikte
image: "/uploads/sweetalert.webp"
category: kutuphane
tags: [yazılım, sweetalert]
comments: false
edit_url: true
toc: true
---

# Nedir

Merhaba klasik uyarı pencerelerinden sıkılanlar için, mobil uyumlu sweetalert sınıfından bahsedeceğim.. Sweetalert i PHP içerisinde nasıl kullanırım diye meraklanan var ise [PHP Morris Js](https://yuceltoluyag.github.io/pdo-sum-fonksiyonu-kullanmmorrisjs/){:target="\_blank"}{:rel="noopener noreferrer"} konusunu incelesin, en azından kafanızda birşeyler patlar :D
Öncelikle dosyaları projemize dahil ediyoruz.

<!-- excerpt separator -->

# Dahil Etme

```javascript

<script src="dist/sweetalert.min.js"></script>
<link rel="stylesheet" type="text/css" href="dist/sweetalert.css">
```

Uyarı verdirmek istediğimiz yeri seçiyoruz.Butona tıklayınca çıksın istedim.

```html
<button>Tıkla Bana</button>
```

Daha sonra jquery kodlarımızı yazıyoruz.

## Örnek Kod

```javascript
<script type="text/javascript">
  $(function(){" "}
  {$("button").click(function () {
    sweetAlert({
      title: "Bu Bir Başlıktır",
      text: "Burası <b>Açıklama</b> Kısmıdır adamcoder.net",
      allowEscapeKey: "true", // false değeri alırsa esc kapatmaz
      customClass: ".sınıf", // <button class="sınıf"> gibi :)
      allowOutsideClick: "false", // true yaparsak nereye tıklarsak uyarı kapanır
      showCancelButton: "false", // true yaparsak cancel butonu görünür
      showConfirmButton: "true", // Ok butonunu gösterir false yaparsanız görünmez
      confirmButtonText: "Tamamdır", // ok butonunun yerine istediğnizi yazarsınız
      confirmButtonColor: "#AEDEF4", // Ok butonunu rengini değiştirebilirsiniz
      cancelButtonText: "Geri Git", // Cancel Butonun yerine istediğimizi yazabiliriz.
      closeOnConfirm: "true", // Okeye basıldıysa burayı göster şurayı göster gibi
      closeOnCancel: "true", // cancele basılırsa şurayı göster gibi(if else gibi)
      imageUrl:
        "https://a2-images.myspacecdn.com/images03/21/026f6a3d1a084b95bcda8e277a7cb743/300x300.webp", // pencere resmini değiştirir
      imageSize: "100x100", // resmin boyutunu ayarlar
      timer: "10000", // 4 saniyede uyarı penceresini kapatır
      html: "true",
      // diğer ayarları bu şekilde test ederek öğrenebilirsiniz. Bu işler kurcalamadan olmaz : )
    });
  })}
  )
</script>
```

### Yapılandırma

<table class="container">
	<thead>
		<tr>
			<th><h1 class="no_toc">Argüman</h1></th>
			<th><h1 class="no_toc">Ne İş Yapar</h1></th>
		</tr>
	</thead>
	<tbody>
    <tr>
      <td>title</td>
      <td>Uyarının başlık kısmıdır.</td>
    </tr>
    <tr>
      <td>text</td>
      <td>Uyarının Mesaj Kısmıdır.</td>
    </tr>
    <tr>
      <td>type</td>
      <td>warning, “error”, “success” “info” ve dilerseniz input değeride verebilirsiniz. Uyarı mesajlarınızda işinize yarar</td>
    </tr>
    <tr>
      <td>allowEscapeKey</td>
      <td>Bu değer ESC tuşuyla uyarı penceresini kapatabiliyoruz. False değeri vererek bu kuralı uygulamayabilirsiniz</td>
    </tr>
    <tr>
      <td>customClass</td>
      <td>Bu değer uyarınıza bir sınıf atayarak özelleştirmenize yarar.</td>
    </tr>
    <tr>
      <td>allowOutsideClick</td>
      <td>Bu değer uyarı pencerenin dışına tıklanırsa pencereyi kapatmanıza yarar, varsayılan değer olarak false gelir true yaparsanız nereye tıklarsanız tıklayın pencere kapanır.</td>
    </tr>
    <tr>
      <td>showCancelButton</td>
      <td>showCancelButton -&gt; Türkçe’siyle geri butonunu göstereyim mi abi diyor 🤡</td>
    </tr>
    <tr>
      <td>showConfirmButton</td>
      <td>showConfirmButton -&gt; Türkçesiyle Tamam butonunu göstereyim mi abi diyor 🤡</td>
    </tr>
    <tr>
      <td>confirmButtonText</td>
      <td>confirmButtonText -&gt; Tamam butonu yerine istediğinizi yazabilirsiniz “Kabul Ediyorum” vs gibi</td>
    </tr>
    <tr>
      <td>confirmButtonColor</td>
      <td>confirmButtonColor -&gt; Tamam Butonu rengini değiştirebilirsiniz. HEX renk kodları seçmeniz öneriliyor. #DDDFFF gibi</td>
    </tr>
    <tr>
      <td>cancelButtonText</td>
      <td>Geri(iptal) butonu yerine istediğinizi yazabilirsiniz “Kabul Etmiyorumm” vs gibi</td>
    </tr>
    <tr>
      <td>imageUrl</td>
      <td>Bu değer uyarıya varsayılan olarak gelen resimleri kendi isteğimize göre değiştirmemize yarıyor.</td>
    </tr>
    <tr>
      <td>imageSize</td>
      <td>Bu değer uyarıya verdiğimiz resimlerin genişlik ve yüksekliğini ayarlamamıza yarıyor. 100x100 gibi.</td>
    </tr>
    <tr>
      <td>timer</td>
      <td>Bu değer uyarı milisaniye cinsinden uyarıyı otamatik olarak kapatmaya yarıyor 1000 yani 1 saniyede kapatır</td>
    </tr>
    <tr>
      <td>html</td>
      <td>Bu değer uyarı HTML kodları kullanmamıza yarıyor</td>
    </tr>
    <tr>
      <td>animation</td>
      <td>Bu değer uyarı Animasyon açılış ekranını değiştiriyor.</td>
    </tr>
    <tr>
      <td>inputType</td>
      <td>Bu değer İnput lara yazdığımız değerleri girebiliyoruz. Text,Password,Submit vs gibi</td>
    </tr>
    <tr>
      <td>inputPlaceholder</td>
      <td>Bu değer İnput ların içerisine açıklama yazısı girebilmemize yarıyor.</td>
    </tr>
    <tr>
      <td>inputValue</td>
      <td>Bu değer İnput lara değer vermek için kullanılıyor.</td>
    </tr>
    <tr>
      <td>closeOnConfirm closeOnCancel</td>
      <td>Bu değerler Uyarı Penceresinde ikinci bir pencere açmaya yarar</td>
    </tr>
  </tbody>
</table>

![sweetalert](/assets/images/sweetalert.webp)

# İndir

[Örnek Dosyayı İndirebilirsiniz](http://www.mediafire.com/file/aelw1zkhwcv17b7/sweetalertadamcoder.zip){:target="\_blank"}{:rel="noopener noreferrer"}
