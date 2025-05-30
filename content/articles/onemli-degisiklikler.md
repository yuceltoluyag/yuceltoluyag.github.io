Title: Önemli Değişiklikler
Date: 2025-02-27 12:00
Modified: 2025-02-27 12:00
Category: Duyurular
Tags: site,Haberler
Slug: onemli-degisiklikler
Authors: yuceltoluyag
Summary: Site hakkında önemli gelişmeleri ve yenilikleri bu sayfadan takip edebilirsiniz.
Translation: false
Status: published
Template: article
Image: images/duyuru-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114438941336923082




---
# Akıllı Semboller
* ==Word==
* ++"Word"++
* ++delete++
* ~~Word~~
* Inline code
     #!py3 import pymdownx; pymdownx.__version__  
     #!js var test = 0;
* Emoji testi :emoji_name: as in I have a :smile: here. and here is a :tada: :smile: :heart: :thumbsup:
* [Smart symbols are enabled by default](https://facelessuser.github.io/pymdown-extensions/extensions/smartsymbols/){: target="_blank" rel="noopener noreferrer"}

(tm)
(c)
(r)
c/o
+/-	
-->	
<--	
<-->
=/=	
1/4, etc.
1st 2nd etc.
++ctrl+alt+delete++

# Klavye Tuşları Örnekleri

PyMdown Extensions'da bulunan Keys uzantısı ile klavye tuşlarını kolayca gösterebilirsiniz. Tuş kombinasyonları `++` sembolleri arasına, tuşlar ise `+` ile ayrılarak yazılır.

## Temel Tuşlar

++a++ ++b++ ++c++

++1++ ++2++ ++3++

++space++

## Özel Karakterler

++colon++ ++comma++ ++dot++

++equal++ ++plus++ ++minus++

## Fonksiyon Tuşları

++f1++ ++f2++ ++f3++ ++f4++ ++f5++

## Yön Tuşları

++up++ ++down++ ++left++ ++right++

++page-up++ ++page-down++ ++home++ ++end++

## Düzenleme Tuşları

++insert++ ++delete++ ++backspace++ ++tab++

## Aksiyon Tuşları

++enter++ ++escape++ ++space++

## Değiştirici Tuşlar

++ctrl++ ++alt++ ++shift++ ++super++

++windows++ ++command++ ++option++

## Klavye Kısayolları Örnekleri

++ctrl+c++ (Kopyala)

++ctrl+v++ (Yapıştır)

++ctrl+alt+delete++ (Windows'ta Görev Yöneticisi)

++ctrl+shift+esc++ (Windows'ta doğrudan Görev Yöneticisi)

++alt+tab++ (Pencereler arası geçiş)

++windows+e++ (Dosya Gezgini açma)

++ctrl+alt+"Özel Tuş"++ (Özel tuş örneği)

++cmd+space++ (macOS Spotlight)

## Multimedya Tuşları

++volume-up++ ++volume-down++ ++volume-mute++

++media-play++ ++media-stop++ ++media-next-track++

<div class="info-box info">
    Bu bir bilgi kutusudur.
</div>

<div class="info-box warning">
    Bu bir uyarı kutusudur.
</div>

<div class="info-box important">
    Bu önemli bir bilgidir!
</div>

<div class="info-box tip">
    Faydalı bir ipucu.
</div>

# Kod Bloğu Dil Testi

Bu sayfada farklı programlama dillerinin kod bloklarını test ediyoruz. Aşağıda çeşitli dillerde örnekler bulabilirsiniz.

## Bash/Shell

```bash
#!/bin/bash
echo "Merhaba Dünya!"
cd /var/www/html
ls -la
sudo systemctl restart nginx
```

## Python

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

## JavaScript

```javascript
// JavaScript örneği
const merhabaDunya = () => {
  console.log("Merhaba Dünya!");
};

// DOM manipülasyonu
document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('test');
  if (element) {
    element.innerHTML = "JavaScript çalışıyor!";
  }
});
```

## HTML

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Sayfası</title>
</head>
<body>
    <h1>Merhaba Dünya!</h1>
    <p>Bu bir HTML test sayfasıdır.</p>
</body>
</html>
```

## CSS

```css
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
```

## SQL

```sql
-- Veritabanı oluşturma
CREATE DATABASE test_db;

-- Tablo oluşturma
CREATE TABLE kullanicilar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Veri ekleme
INSERT INTO kullanicilar (ad, soyad, email) 
VALUES ('Ali', 'Yılmaz', 'ali@ornek.com');

-- Veri sorgulama
SELECT * FROM kullanicilar WHERE ad = 'Ali';
```

## Java

```java
public class MerhabaDunya {
    public static void main(String[] args) {
        System.out.println("Merhaba Dünya!");
        
        // Nesne oluşturma
        Kisi kisi = new Kisi("Ahmet", 30);
        System.out.println(kisi.selamla());
    }
}

class Kisi {
    private String ad;
    private int yas;
    
    public Kisi(String ad, int yas) {
        this.ad = ad;
        this.yas = yas;
    }
    
    public String selamla() {
        return "Merhaba, ben " + ad + ". " + yas + " yaşındayım.";
    }
}
```

## C++

```cpp
#include <iostream>
#include <string>

class Kisi {
private:
    std::string ad;
    int yas;
    
public:
    Kisi(std::string ad, int yas) : ad(ad), yas(yas) {}
    
    std::string selamla() {
        return "Merhaba, ben " + ad + ". " + std::to_string(yas) + " yaşındayım.";
    }
};

int main() {
    std::cout << "Merhaba Dünya!" << std::endl;
    
    Kisi kisi("Mehmet", 25);
    std::cout << kisi.selamla() << std::endl;
    
    return 0;
}
```

## Go

```go
package main

import "fmt"

type Kisi struct {
    Ad  string
    Yas int
}

func (k Kisi) Selamla() string {
    return fmt.Sprintf("Merhaba, ben %s. %d yaşındayım.", k.Ad, k.Yas)
}

func main() {
    fmt.Println("Merhaba Dünya!")
    
    kisi := Kisi{Ad: "Ayşe", Yas: 28}
    fmt.Println(kisi.Selamla())
}
```

## Ruby

```ruby
# Ruby örneği
def merhaba_dunya
  puts "Merhaba Dünya!"
end

merhaba_dunya

# Sınıf örneği
class Kisi
  attr_reader :ad, :yas
  
  def initialize(ad, yas)
    @ad = ad
    @yas = yas
  end
  
  def selamla
    "Merhaba, ben #{@ad}. #{@yas} yaşındayım."
  end
end

kisi = Kisi.new("Zeynep", 22)
puts kisi.selamla
```

## PHP

```php
<?php
// PHP örneği
function merhabaDunya() {
    echo "Merhaba Dünya!";
}

merhabaDunya();

// Sınıf örneği
class Kisi {
    private $ad;
    private $yas;
    
    public function __construct($ad, $yas) {
        $this->ad = $ad;
        $this->yas = $yas;
    }
    
    public function selamla() {
        return "Merhaba, ben " . $this->ad . ". " . $this->yas . " yaşındayım.";
    }
}

$kisi = new Kisi("Mustafa", 35);
echo $kisi->selamla();
?>
```

## Rust

```rust
struct Kisi {
    ad: String,
    yas: u32,
}

impl Kisi {
    fn new(ad: &str, yas: u32) -> Self {
        Kisi {
            ad: ad.to_string(),
            yas,
        }
    }
    
    fn selamla(&self) -> String {
        format!("Merhaba, ben {}. {} yaşındayım.", self.ad, self.yas)
    }
}

fn main() {
    println!("Merhaba Dünya!");
    
    let kisi = Kisi::new("Fatma", 29);
    println!("{}", kisi.selamla());
}
```

## Swift

```swift
// Swift örneği
func merhabaDunya() {
    print("Merhaba Dünya!")
}

merhabaDunya()

// Sınıf örneği
class Kisi {
    let ad: String
    let yas: Int
    
    init(ad: String, yas: Int) {
        self.ad = ad
        self.yas = yas
    }
    
    func selamla() -> String {
        return "Merhaba, ben \(ad). \(yas) yaşındayım."
    }
}

let kisi = Kisi(ad: "Emre", yas: 31)
print(kisi.selamla())
```

## Kotlin

```kotlin
fun main() {
    println("Merhaba Dünya!")
    
    val kisi = Kisi("Selin", 27)
    println(kisi.selamla())
}

class Kisi(val ad: String, val yas: Int) {
    fun selamla(): String {
        return "Merhaba, ben $ad. $yas yaşındayım."
    }
}
```

## TypeScript

```typescript
// TypeScript örneği
interface Kisi {
    ad: string;
    yas: number;
    selamla(): string;
}

class KisiImpl implements Kisi {
    constructor(public ad: string, public yas: number) {}
    
    selamla(): string {
        return `Merhaba, ben ${this.ad}. ${this.yas} yaşındayım.`;
    }
}

function merhabaDunya(): void {
    console.log("Merhaba Dünya!");
}

merhabaDunya();

const kisi: Kisi = new KisiImpl("Burak", 33);
console.log(kisi.selamla());
```

## YAML

```yaml
# YAML örneği
site:
  baslik: "Test Sitesi"
  aciklama: "Bu bir test sitesidir"
  versiyon: 1.0
  
kullanicilar:
  - ad: Ali
    soyad: Yılmaz
    email: ali@ornek.com
    roller:
      - admin
      - editor
  
  - ad: Ayşe
    soyad: Kaya
    email: ayse@ornek.com
    roller:
      - yazar
```

## JSON

```json
{
  "site": {
    "baslik": "Test Sitesi",
    "aciklama": "Bu bir test sitesidir",
    "versiyon": 1.0
  },
  "kullanicilar": [
    {
      "ad": "Ali",
      "soyad": "Yılmaz",
      "email": "ali@ornek.com",
      "roller": ["admin", "editor"]
    },
    {
      "ad": "Ayşe",
      "soyad": "Kaya",
      "email": "ayse@ornek.com",
      "roller": ["yazar"]
    }
  ]
}
```

## Markdown

```markdown
# Başlık 1
## Başlık 2
### Başlık 3

**Kalın metin** ve *italik metin*

- Liste öğesi 1
- Liste öğesi 2
- Liste öğesi 3

1. Numaralı liste öğesi 1
2. Numaralı liste öğesi 2

[Bağlantı örneği](https://example.com)

![Resim açıklaması](resim.jpg)

> Alıntı örneği
```

Bu sayfada farklı programlama dillerinin kod bloklarını test ettik. Dil etiketlerinin doğru şekilde görüntülendiğinden emin olmak için bu örnekleri kullanabilirsiniz.

[responsive_img src="/images/duyuru-lg.webp" alt="Duyuru" /]