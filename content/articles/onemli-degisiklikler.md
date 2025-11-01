Title: Önemli Değişiklikler
Date: 2025-02-27 12:00
Modified: 2025-08-11 22:59
Category: Haberler
Tags: site,Haberler
Slug: onemli-degisiklikler
Authors: yuceltoluyag
Summary: Site hakkında önemli gelişmeleri ve yenilikleri bu sayfadan takip edebilirsiniz.

Lang: tr
Translation: false
Status: published
Template: article
Image: images/duyuru-lg.webp

Burada, Markdown formatında çeşitli öğeleri test eden bir makale bulunmaktadır. Aşağıda başlıklar, paragraflar, listeler, dipnotlar, alıntılar, not kutuları (admonitions), tablolar ve kod blokları gibi farklı bileşenler yer almaktadır.

## Footnotes (Dipnotlar)

Bu metin içinde bir dipnot ekleyelim.[^1]

[^1]: Bu, dipnotun kendisidir. Dipnotlar, ek açıklamalar veya referanslar için kullanışlıdır.

## Alıntılar

> Bu, bir alıntıdır. Okunabilirliği artırmak için özel olarak biçimlendirilmelidir. İçinde **kalın** veya _italik_ metinler de olabilir.

## Admonitions (Not Kutuları)

!!! note "Tema içinde bulunan alert kutularını görmektesiniz. Bu bir bilgi kutusudur ve önemli bilgileri vurgulamak için kullanılır."

!!! warning "Dikkat edilmesi gereken durumlarda bu uyarı kutusu kullanılır. Kullanıcıları potansiyel sorunlar hakkında bilgilendirmek için idealdir.arı"

!!! important "Kritik bilgiler ve önemli duyurular için bu kutu kullanılır. Gözden kaçırılmaması gereken bilgileri vurgular."

!!! tip "Yararlı ipuçları ve öneriler için bu kutu kullanılır. Kullanıcılara ek bilgi ve kolaylaştırıcı öneriler sunar."

## Tablolar

| Başlık 1 | Başlık 2 | Başlık 3 |
| -------- | -------- | -------- |
| Hücre 1  | Hücre 2  | Hücre 3  |
| Hücre 4  | Hücre 5  | Hücre 6  |

## Kod Blokları

Bu sayfada farklı programlama dillerinin kod bloklarını test ediyoruz. Aşağıda çeşitli dillerde örnekler bulabilirsiniz.

### Bash/Shell

```bash
#!/bin/bash
echo "Merhaba Dünya!"
cd /var/www/html
ls -la
sudo systemctl restart nginx
```

Aşağıda, sözdizimi vurgulaması etkinleştirilmiş bir Python kod bloğu bulunmaktadır.

#### Python

```python
def merhaba_dunya():
    print("Merhaba Dünya!")

if __name__ == "__main__":
    merhaba_dunya()

# Sınıf örneği
class Kisi:
    def __init__(self, ad, yas):
        self.ad = ad
        self.yas = yas

    def selamla(self):
        return f"Merhaba, ben {self.ad}. {self.yas} yaşındayım."
```

[responsive_img src="/images/duyuru-lg.webp" alt="Duyuru" /]
