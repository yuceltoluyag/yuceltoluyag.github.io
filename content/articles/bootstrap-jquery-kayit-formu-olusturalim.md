Title: Bootstrap Kullanarak jQuery Kayıt Formu Oluşturalım (Responsive)
Date: 2017-01-20
Category: Web Geliştirme
Author: yuceltoluyag
Slug: bootstrap-jquery-kayit-formu-olusturalim
Summary: Bootstrap ve jQuery kullanarak duyarlı (responsive) bir kayıt formu oluşturma ve form doğrulama işlemlerini adım adım öğrenin.
Tags: bootstrap, jquery, form, responsive, web geliştirme
Lang: tr
Translation: false
Image: images/bootstrap-jquery-kayit-formu-xl.webp

## Bootstrap Kullanarak jQuery Kayıt Formu Oluşturalım (Responsive)

Merhaba, bu dersimizde **jQuery** ve **Bootstrap** kullanarak formu kontrol ettirip düzgünce doldurulmuşsa kayıt işlemini başarıyla gerçekleştirmeyi göstereceğim.

## Gerekli Dosyalar

### Bootstrap

Bootstrap dosyalarını [buradan](https://getbootstrap.com){: target="\_blank" rel="noopener noreferrer"} edinebilirsiniz.  
Eğer henüz Bootstrap hakkında bilginiz yoksa, modern ve mobil uyumlu arayüzler oluşturmak için bir an önce öğrenmenizi tavsiye ederim.

!!! tip "İpucu ⚡ Bootstrap, formların responsive yani mobil uyumlu hale getirilmesinde en hızlı çözümlerden biridir."

## Adımlar

1. **Responsive kayıt formumuzu oluşturacağız.**
2. **jQuery dosyalarımızı dahil edeceğiz.**
3. **jQuery kullanarak formu kontrol ettirip kullanıcıya mesajlar göstereceğiz.**

## Örnek HTML Yapısı

```html
<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bootstrap jQuery Kayıt Formu</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  </head>
  <body>
    <div class="container mt-5">
      <h2 class="mb-4 text-center">Kayıt Formu</h2>
      <form id="registerForm">
        <div class="form-group">
          <label for="name">Ad Soyad</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Adınızı girin"
          />
        </div>
        <div class="form-group">
          <label for="email">E-posta</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="E-postanızı girin"
          />
        </div>
        <div class="form-group">
          <label for="password">Şifre</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Şifrenizi girin"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          Kayıt Ol
        </button>
      </form>
      <div id="message" class="mt-3"></div>
    </div>

    <script>
      $(document).ready(function () {
        $("#registerForm").on("submit", function (e) {
          e.preventDefault();
          let name = $("#name").val().trim();
          let email = $("#email").val().trim();
          let password = $("#password").val().trim();

          if (name === "" || email === "" || password === "") {
            $("#message").html(
              '<div class="alert alert-danger">Lütfen tüm alanları doldurun.</div>',
            );
          } else {
            $("#message").html(
              '<div class="alert alert-success">Kayıt işlemi başarılı!</div>',
            );
            // Burada AJAX veya backend işlemleri yapılabilir
          }
        });
      });
    </script>
  </body>
</html>
```

!!! note "Not: Form doğrulamasını sadece jQuery tarafında yapmak yeterli değildir. Güvenlik açısından sunucu tarafında da kontrol yapılmalıdır."

## Dersin Kaynak Dosyaları

Dersin kaynak dosyalarını indirebilirsiniz:
👉 **Dersin Kaynak Dosyalarını İndir**

[responsive_img src="/images/bootstrap-jquery-kayit-formu-xl.webp" alt="Responsive Kayıt Formu" /]
