Title: XAMPP Üzerinde .htaccess Dosyasını Aktif Etmek (Resimli Anlatım)
Date: 2017-01-19
Category: Web Geliştirme
Author: yuceltoluyag
Slug: xampp-htaccess-aktif-etmek
Summary: XAMPP kullanırken SEO, yönlendirme veya özel hata sayfaları gibi ayarlar için .htaccess dosyasını nasıl aktif edeceğinizi adım adım (ve resimli) öğrenin.
Tags: xampp, apache, htaccess, seo, localhost
Lang: tr
Translation: false
Image: images/xampp-config-httpconf-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115600621290151146
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6czu4n3tc26

## XAMPP .htaccess Aktif Etmek (Resimli Anlatım)

Localhost üzerinde çalışırken `.htaccess` dosyası **SEO ayarları**, **hotlink engelleme**, **özel hata sayfaları**, **trafik kontrolü** gibi birçok konuda büyük kolaylık sağlar.  
Bu yazıda, XAMPP kullanarak `.htaccess` dosyasını nasıl aktif edeceğinizi adım adım göstereceğim.

---

## 1️⃣ Apache Mod Rewrite Modülünü Etkinleştirme

1. XAMPP Kontrol Panelini açın.
2. **Apache** satırının sağında bulunan **Config** butonuna tıklayın.
3. Açılan menüden **httpd.conf** dosyasını seçin.
   [responsive_img src="/images/xampp-config-httpconf-xl.webp" alt="Xampp Httpconf" /]

   🧩 Ardından şu satırı bulun:

```apache
#LoadModule rewrite_module modules/mod_rewrite.so
```

> Başındaki `#` (diez) işaretini kaldırın:

```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

Bu işlem, **URL yönlendirme** ve **yeniden yazma** işlemlerinin çalışmasını sağlar.

---

[responsive_img src="/images/xampp-load-module-rewrite-xl.webp" alt="Xampp Httpconf Config" /]

## 2️⃣ AllowOverride Ayarını Değiştirme

Aynı dosya içinde aşağıdaki satırları bulun:

```apache
AllowOverride None
```

ve bunları şu şekilde değiştirin:

```apache
AllowOverride All
```

> Bu değişiklik, `.htaccess` dosyasının **aktif olarak çalışmasına** izin verir.

---

## 3️⃣ Apache ve MySQL Servislerini Yeniden Başlatın

Yaptığınız değişikliklerin geçerli olması için:
XAMPP paneline dönüp **Stop → Start** yaparak **Apache** ve **MySQL** servislerini yeniden başlatın.

---

## 4️⃣ Örnek .htaccess Dosyası

Artık `.htaccess` dosyanız aktif!
Denemek için kök dizine bir `.htaccess` dosyası oluşturup aşağıdaki kodu ekleyin:

```apache
# Yönlendirmeleri aktif eder
RewriteEngine On

# Örnek: www olmayanları www'li hale çevir
RewriteCond %{HTTP_HOST} ^example\.com [NC]
RewriteRule ^(.*)$ http://www.example.com/$1 [L,R=301]
```

---

## 🧠 Ek Bilgi

- `.htaccess` dosyası **Apache sunucularında** çalışır.
- Dosya adının başında nokta (.) olmalı ve **dosya uzantısı olmamalıdır**.
- Dosyayı düzenledikten sonra **tarayıcı önbelleğini temizlemeyi unutmayın.**

---

Kolay gelsin 😉
Artık XAMPP üzerinde `.htaccess` dosyanız **tam fonksiyonlu şekilde** çalışıyor.



