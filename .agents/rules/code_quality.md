---
trigger: 
  - file_extensions: [".py"]
description: Python kod kalitesi ve Ruff standartları.
---

# Kod Kalitesi Kuralları

Bu kurallar, projedeki Python kodlarının okunabilirliğini ve sürdürülebilirliğini sağlamak içindir.

## Python Standartları
- **Linter & Formatter:** Projedeki tüm Python kodları için her zaman **Ruff** kullanılmalıdır.
- **Sürüm Uyumluluğu:** Python 3.12+ özelliklerinden (f-strings, modern type annotations) yararlanılmalıdır.
- **Tip Belirleme (Type Hinting):** Yeni eklenen veya revize edilen fonksiyonlarda parametre ve dönüş tipleri mutlaka belirtilmelidir.
- **İsimlendirme:** Değişken ve fonksiyon isimleri PEP 8 standartlarına (snake_case) uygun olmalıdır.
