# Pelican Makale Çeviri Kuralları (Translation Rules)

Bu belge, Türkçe yazılmış Pelican makalelerinin İngilizce'ye çevrilmesi sırasında uyulması gereken yapısal ve içeriksel kuralları içerir. Bu kurallar bir yapay zeka (AI) için sistem yönergesi (prompt) olarak tasarlanmıştır.

---

## 🚀 Genel Görev
Sana verilen Türkçe Markdown (.md) dosyasını, aşağıdaki kurallara harfiyen uyarak İngilizce'ye çevir. Amacımız, web sitesinin çok dilli yapısını bozmadan içeriği küresel bir kitleye ulaştırmaktır.

## 📂 1. Dosya Yapısı ve İsimlendirme
- **Dizin:** Çevrilen dosyayı her zaman `content/articles/en/` dizinine kaydet.
- **Dosya Adı:** Orijinal dosya adının sonuna `.en` takısı ekle.
  - *Örnek:* `makale-adi.md` -> `en/makale-adi.en.md`

## 📋 2. Metadata (Front Matter) Kuralları
Dosyanın en başındaki metadata bloğunda şu kuralları uygula:

| Alan | Kural | Açıklama |
| :--- | :--- | :--- |
| **Title** | **ÇEVİR** | Başlığı doğal ve ilgi çekici bir İngilizce ile çevir. |
| **Slug** | **SABİT TUT** | **KRİTİK:** Orijinal Türkçe slug neyse aynısını bırak. Değiştirme! |
| **Lang** | **DEĞİŞTİR** | Değeri `en` olarak ayarla. |
| **Date** | **SABİT TUT** | Tarih ve saat formatını birebir koru. |
| **Modified** | **SABİT TUT** | Varsa düzenleme tarihini koru. |
| **Category** | **SABİT TUT** | Sitedeki kategori yapısı için Türkçe kategoriyi aynen bırak (Örn: `Sunucu`). |
| **Tags** | **SABİT TUT** | Etiketleri olduğu gibi bırak. |
| **Summary** | **ÇEVİR** | Özeti İngilizce'ye çevir. |
| **Image** | **SABİT TUT** | Görsel yolunu değiştirme. |
| **Status** | **SABİT TUT** | `published` veya `draft` durumunu koru. |
| **toot/bluesky**| **SABİT TUT** | Sosyal medya linklerini koru. |

## ✍️ 3. İçerik Çeviri Kuralları
- **Başlıklar (`#`, `##`, `###`):** Hepsini İngilizce'ye çevir.
- **Metin:** Orijinal Türkçe metne sadık kalarak, içeriği akıcı ve profesyonel bir İngilizce'ye çevir. Kendi yorumunu ekleme, içeriği genişletme veya anlamı değiştirme.
- **Kod Blokları:**
  - Kod bloklarının içindeki komutları (bash, python vb.) **DEĞİŞTİRME**.
  - Kod içindeki yorum satırları (Comment) varsa onları İngilizce'ye çevir.
- **Özel Bileşenler (Shortcodes):**
  - `[responsive_img ... /]` gibi yapıları bozma.
  - Sadece içindeki `alt="..."` gibi açıklama parametrelerini çevir.
- **Vurgular:** `**Kalın**` ve `*İtalik*` vurguları orijinal yerlerinde koru.
- **Bağlantılar:** Linkleri koru, ancak link metinlerini (anchor text) çevir.
- **Dahili Bağlantılar (Internal Links):** Site içi linklerin başına mutlaka `/en/` ekle.
  - *Örnek:* `(/makale-linki/)` -> `(/en/makale-linki/)`
  - Bu kural, İngilizce makaledeki bir okuyucunun Türkçe sayfaya yönlenmesini engeller.

## ⚠️ Önemli Hatırlatma
- **Slug tutarlılığı**, iki dildeki makalenin birbirine bağlanmasını sağlayan tek köprüdür. Eğer slug'ı değiştirirsen site üzerinde "Language Switcher" (Dil Değiştirici) çalışmayacaktır.
