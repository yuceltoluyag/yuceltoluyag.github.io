# AliBaba Teması Geliştirme Planı

Bu belge, yuceltoluyag.github.io sitesi için tasarlanan yeni **AliBaba** temasının teknik ve tasarımsal yol haritasını içerir.

## 🎯 Temel Felsefe
- **Sadelik ve Hız:** Karmaşık framework'lerden (Pico.css, Bootstrap vb.) arındırılmış, %100 vanilla (saf) kodlama.
- **Modern CSS:** 2025 standartlarında yerel CSS özellikleri (Nesting, Grid, Layers, :has) kullanımı.
- **Mobile-First:** Tasarımın önce en küçük ekranlar için optimize edilmesi, ardından masaüstüne genişlemesi.
- **Sıfır Bağımlılık:** Minimum JavaScript ve harici kütüphane kullanımı.

## 🎨 Tasarım ve Estetik
- **İskelet (Skeleton):** Mevcut "baba" temasının sevilen sol sabit menü (sidebar) yapısının korunması.
- **Renk Paleti:**
  - **Light Mode:** Gruvbox Light (Krem/Kum tonları, retro estetik).
  - **Dark Mode:** Mevcut temanın "Deep Dark" (Derin Koyu) tonları.
- **Geçişler:** Temalar arası yumuşak geçiş efektleri ve mikro-animasyonlar.

## 🛠️ Teknik Özellikler

### HTML5 & Şablonlama
- **Semantik Yapı:** SEO ve erişilebilirlik için tam semantik HTML5 etiketleri.
- **Jinja2:** Pelican'ın şablon motoruyla temiz ve mantıksal olarak ayrıştırılmış (modular) şablonlar.

### Modern CSS3 (No-Framework)
- **CSS Grid & Flexbox:** Yerleşim için `fixed` pozisyonlar yerine modern grid sistemleri.
- **@layer:** CSS önceliklerini yönetmek için katmanlı yapı (`reset`, `base`, `layout`, `components`).
- **CSS Nesting:** Daha okunabilir ve hiyerarşik stil kodlaması.
- **clamp():** Her ekrana uyum sağlayan akışkan tipografi ve boşluklar.
- **:has() Selector:** Ebeveyn elementleri içeriğine göre stilize eden modern seçiciler.

### JavaScript
- Sadece mobil menü tetikleyici ve tema değiştirici (light/dark switch) için sınırlı, saf JavaScript.

## ⚠️ Güvenlik ve Kısıtlamalar
- **pelicanconf.py:** Sitenin bel kemiği olan bu dosyadaki değişkenlere asla dokunulmayacak.
- **Klasör Sınırı:** Tüm tema geliştirme işlemleri sadece `themes/AliBaba` klasörü altında gerçekleştirilecek.
- **Varlık Yönetimi:** Mevcut karmaşık CSS yapısı yerine, derli toplu ve merkezi bir stil yönetimi kurulacak.

## 🚀 Uygulama Adımları
1. `themes/AliBaba` klasör yapısının oluşturulması.
2. Temel CSS değişkenlerinin (Gruvbox & Dark) tanımlanması.
3. `base.html` ve ana iskeletin (Sidebar + Main) kurulması.
4. Yazı detayları (`article.html`) ve ana sayfa (`index.html`) şablonlarının kodlanması.
5. Mobil uyumluluk ve son görsel dokunuşların yapılması.
