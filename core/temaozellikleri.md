
# Baba Teması Özellikleri

Bu belge, `baba` temasının temel özelliklerini ve yapısını özetlemektedir.

## 1. Tasarım ve Düzen

- **Sabit Kenar Çubuğu (Sidebar):** Masaüstü görünümünde, ekranın sol tarafında sabit bir kenar çubuğu bulunur. Bu çubuk, ana gezinme menüsünü ve sosyal medya bağlantılarını içerir.
- **Duyarlı (Responsive) Tasarım:** Tema, mobil cihazlarla tamamen uyumludur. Kenar çubuğu, mobil görünümlerde ekranın üst kısmında yatay bir gezinme menüsüne dönüşür.
- **Karanlık/Aydınlık Mod:** Kullanıcıların tercihine göre açık ve koyu tema arasında geçiş yapabilen bir tema değiştirici içerir.
- **PicoCSS Çatısı:** Hafif ve modern bir CSS çatısı olan PicoCSS üzerine kurulmuştur. Bu, temiz ve okunabilir bir arayüz sağlar.

## 2. Bileşenler ve Öğeler

- **Makale Başlığı (Hero Section):** Makale sayfalarının en üstünde, makale başlığını, yazarını ve yayınlanma tarihini büyük ve dikkat çekici bir şekilde gösteren bir "hero" bölümü bulunur.
- **Kod Blokları:** Kod blokları, özellikle karanlık modda, bir terminal penceresi gibi görünür. Başlık çubuğunda macOS benzeri "trafik ışığı" düğmeleri bulunur ve kod kopyalama işlevselliği mevcuttur.
- **Bilgi Kutuları (Admonitions):** `Not`, `İpucu`, `Uyarı` ve `Tehlike` gibi farklı amaçlar için tasarlanmış, renkli ve ikonlu bilgi kutuları içerir.
- **Arama Modalı:** Site içi arama işlevselliği, ekranı kaplayan bir modal pencere içinde sunulur.

## 3. Teknik Özellikler

- **Jinja2 Şablon Motoru:** Pelican statik site oluşturucusu ile uyumlu olarak Jinja2 şablon dilini kullanır.
- **Modüler JavaScript:** Tema değiştirici, arama, kod kopyalama gibi işlevler için ayrı JavaScript dosyaları kullanır.
- **Webmentions ve IndieWeb Desteği:** Modern web standartlarına uygun olarak Webmentions ve diğer IndieWeb protokollerini destekler.
