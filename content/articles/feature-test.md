Title: Tema Özellikleri Testi
Date: 2025-10-17 21:00
Category: Test
Tags: pelican, theme, test
Slug: tema-ozellikleri-testi
Author: babacan
Summary: Bu makale, yeni 'baba' temasının özelliklerini test etmek için oluşturulmuştur.
Status: draft
Bu makale, yeni "baba" temasının çeşitli Markdown özelliklerini ve stillerini test etmek için bir gösterimdir.

## Footnotes (Dipnotlar)

Bu metin içinde bir dipnot ekleyelim.[^1]

[^1]: Bu, dipnotun kendisidir. Dipnotlar, ek açıklamalar veya referanslar için kullanışlıdır.

## Alıntılar

> Bu, bir alıntıdır. Okunabilirliği artırmak için özel olarak biçimlendirilmelidir. İçinde **kalın** veya _italik_ metinler de olabilir.

## Admonitions (Not Kutuları)

Aşağıda farklı türde not kutuları bulunmaktadır.

!!! note "Bu bir nottur"
Bu, ek bilgi veya bir ipucu içeren bir not kutusudur.

!!! warning "Bu bir uyarıdır"
Bu, dikkat gerektiren önemli bir bilgiyi vurgulayan bir uyarı kutusudur.

!!! danger "Bu bir tehlike uyarısıdır"
Bu, bir tehlike veya kritik bir uyarıyı belirtir.

!!! tip "Bu bir ipucudur"
Bu, okuyucuya faydalı bir ipucu veya püf noktası sunar.

## Tablolar

| Başlık 1 | Başlık 2 | Başlık 3 |
| -------- | -------- | -------- |
| Hücre 1  | Hücre 2  | Hücre 3  |
| Hücre 4  | Hücre 5  | Hücre 6  |

## Kod Blokları

Aşağıda, sözdizimi vurgulaması etkinleştirilmiş bir Python kod bloğu bulunmaktadır.

```python
def hello_world():
    """Bu bir docstring."""
    message = "Merhaba, Dünya!"
    print(message)

# Fonksiyonu çağır
hello_world()
```

Ve burada da bir JavaScript kod bloğu var:

```javascript
function greet(name) {
  // Bu bir yorum satırıdır.
  const message = `Hello, ${name}!`;
  console.log(message);
}

greet("World");
```
