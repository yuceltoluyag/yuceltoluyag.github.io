Title: WinePrefix Nedir ve Nasıl Kullanılır?
Date: 2025-07-29
Modified: 2025-08-11 22:59
Category: Oyun
Tags: wine, wineprefix, linux, oyun, uyumluluk, rehber
Slug: wineprefix-nedir-nasil-kullanilir
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: WinePrefix nedir, nasıl oluşturulur ve farklı oyunlar için nasıl kullanılır? Bu rehberde, Wine ile Windows oyunlarını Linux'ta sorunsuz çalıştırmak için gerekli adımları öğrenin.
Image: images/wineprefix-nedir-nasil-kullanilir-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114989615830305083
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtolvnmpc26

## 🍷 WinePrefix Nedir ve Neden Önemlidir?

Linux üzerinde Windows oyunları ve uygulamaları çalıştırmak için Wine kullanıyorsanız, karşınıza mutlaka `WINEPREFIX` kavramı çıkmıştır. Bu ortam değişkeni sayesinde farklı programlar için izole sanal Windows ortamları oluşturabilir, sorun yaşamadan çalıştırabilirsiniz.

Bu rehberde:

- `WINEPREFIX` nedir?
- Nasıl oluşturulur?
- Farklı prefix'lerle oyun kurulumları nasıl yapılır?
- Pratik örneklerle nasıl kullanılır?
- `winecfg`, `winetricks`, `regedit` ve hata ayıklama ipuçları
- Lutris ve Steam/Proton ile entegrasyon 🎯

Hepsini adım adım gösteriyoruz. 🎯
[responsive_img src="/images/wineprefix-nedir-nasil-kullanilir-xl.webp" alt="wineprefix-nedir-nasil-kullanilir" /]

---

## 🧠 1. WinePrefix Nedir?

`WINEPREFIX`, Wine’ın Windows benzeri dosya sistemini **hangi klasörde oluşturacağını ve çalıştıracağını** belirten bir ortam değişkenidir.

Her prefix aslında bağımsız bir “sanal Windows" klasörüdür.
Bu sayede bir oyun için 32 bit, bir başkası için 64 bit uyumlu, biri için DirectX9, biri için DirectX11 içeren farklı ortamlar oluşturabilirsiniz.

> 🎮 **Oyunlarda neden önemli?**
> Çünkü bir oyunun ihtiyaç duyduğu DLL dosyaları, sistem ayarları, kayıt defteri girdileri diğer oyunlarla çakışabilir. `WINEPREFIX` bu sorunları tamamen izole eder.

---

## 🧱 2. WinePrefix Dizini Nasıl Görünür?

Bir `WINEPREFIX` dizini genellikle şu yapıya sahiptir:

```text
~/.wine/ (veya özel belirlenen klasör)
├── drive_c/         → Sanal C:\ sürücüsü
├── system.reg       → Sistem kayıt defteri
├── user.reg         → Kullanıcı kayıt defteri
├── userdef.reg      → Varsayılan kullanıcı kayıtları
```

Bu yapıda `drive_c` içine kurduğunuz her program, Windows sisteminde olduğu gibi çalışır.

> 💡 Varsayılan Wine dizini: `~/.wine`
> Ama biz her oyun için farklı klasör kullanmanızı öneriyoruz: `~/wineprefixes/oyunadi` gibi.

---

## 🛠️ 3. WinePrefix Nasıl Oluşturulur?

### 🎯 Örnek: PES 2017 için yeni bir `WINEPREFIX` oluşturmak

```bash
export WINEPREFIX=~/wineprefixes/pes2017
wineboot -u
```

Bu iki komut:

1. Yeni bir klasör tanımlar (`~/wineprefixes/pes2017`).
2. `wineboot -u` ile prefix içinde sanal Windows ortamı kurar.

> 🛡️ Bu işlem, gerçek bir Windows kurulumu gibi temel dosyaları oluşturur: `C:\`, kayıt defteri, config dosyaları vb.

---

## ▶️ 4. Prefix Üzerinden Uygulama Çalıştırmak

### Örnek: `.exe` dosyasını özel bir prefix içinde başlatmak

```bash
export WINEPREFIX=~/wineprefixes/pes2017
wine ~/Downloads/Settings.exe
```

Bu komutla:

- `Settings.exe` uygulaması sadece `~/wineprefixes/pes2017` içindeki Windows ortamında çalışır.
- Kayıt defteri ve yüklü DLL’ler bu prefix’e özeldir.

> 🔄 Bu şekilde her oyunu farklı sistemlerde çalıştırmak mümkün olur.

---

## 🎮 5. Uygulamalı Senaryo: PES 2017 Kurulumu

### Adım 1: Prefix oluştur

```bash
export WINEPREFIX=~/peswine
wineboot -u
```

### Adım 2: Yapılandırmaları isteğe göre düzenle

```bash
winecfg        # Wine ayarlarını yapılandır
winetricks     # DLL yükleme aracı (örn. d3dx9)
```

### Adım 3: Oyunu kur

```bash
wine setup.exe
```

> Eğer kurulum dosyası Windows’ta çalışıyorsa, burada da aynen çalışmalıdır.

---

## ▶️ Oyunu Başlatmak

```bash
export WINEPREFIX=~/peswine
wine "C:\Program Files\PES2017\pes2017.exe"
```

> 🗂️ Wine bu dizini otomatik olarak şuna eşler:
> `"C:\Program Files"` → `~/peswine/drive_c/Program Files`

---

## 🧩 6. Regedit ve Kayıt Defteri Düzenleme

Wine içindeki kayıt defteri ayarlarını şu komutla düzenleyebilirsiniz:

```bash
WINEPREFIX=~/peswine wine regedit
```

Burada birçok Windows programında olduğu gibi HKEY_LOCAL_MACHINE ve HKEY_CURRENT_USER yapılarını görebilir, elle anahtar ekleyip silebilirsiniz.

> ⚠️ Dikkat: Yanlış kayıt defteri düzenlemeleri programın çalışmasını bozabilir.

---

## 💡 7. Faydalı İpuçları

| İpucu                                                     | Açıklama                            |
| --------------------------------------------------------- | ----------------------------------- |
| Her oyun için ayrı `WINEPREFIX` kullan                    | Çakışmaları ve karışıklığı önler    |
| Varsayılan prefix `~/.wine`'dır                           | Hiç tanımlamazsanız burayı kullanır |
| `winetricks` ile DLL kurulumu yaparken de prefix’i belirt | `WINEPREFIX=... winetricks ...`     |

### 🎯 DLL Yükleme Örneği:

```bash
WINEPREFIX=~/peswine winetricks d3dx9
```

---

## 🧪 8. Hata Ayıklama ve Log Takibi

Wine uygulamaları çalıştırırken oluşabilecek hataları görmek için `WINEDEBUG` kullanabilirsiniz:

```bash
WINEPREFIX=~/peswine WINEDEBUG=+seh wine pes2017.exe
```

Ayrıca `winecfg` aracı ile:

- DirectX sürümünü
- Windows sürümünü
- Ses sürücüsünü

gibi ayarları değiştirebilirsiniz.

---

## 💾 9. Prefix Yedekleme ve Kopyalama

Her `WINEPREFIX` bir klasör olduğundan kolayca yedeklenebilir:

```bash
tar czvf peswine-backup.tar.gz ~/peswine
```

Başka bir sistemde bu yedeği açarak oyunu direkt kullanabilirsiniz:

```bash
tar xzvf peswine-backup.tar.gz -C ~/
```

---

## 🔄 10. Lutris ile Prefix Yönetimi

Oyunları Lutris üzerinden kurarken de `WINEPREFIX` her oyun için otomatik oluşturulur.
İlgili prefix genellikle şurada bulunur:

```
~/.local/share/lutris/runners/wine/prefix/
```

Ama özelleştirilebilir. Lutris bu işlemleri arka planda otomatik yönetir.

---

## 🛠️ 11. Steam/Proton ile Prefix Kullanımı

Steam'de Proton ile çalışan oyunlar da benzer şekilde prefix kullanır. Bu prefix’ler genellikle şurada yer alır:

```
~/.steam/steam/steamapps/compatdata/APPID/pfx/
```

Buradaki `APPID`, oyunun Steam App ID’sidir. `regedit`, `winetricks`, `winecfg` gibi araçlarla bu prefix’e müdahale edebilirsiniz:

```bash
WINEPREFIX=~/.steam/steam/steamapps/compatdata/APPID/pfx winetricks corefonts
```

---

## ✅ 12. Kısaca Komut Tablosu

| Komut                   | Görevi                  |
| ----------------------- | ----------------------- |
| `export WINEPREFIX=...` | Prefix belirler         |
| `wineboot -u`           | Yeni prefix oluşturur   |
| `wine dosya.exe`        | Uygulamayı çalıştırır   |
| `winetricks dll`        | DLL yükler (örn: d3dx9) |
| `winecfg`               | Ayarları yapılandırır   |
| `wine regedit`          | Kayıt defteri düzenler  |
| `WINEDEBUG=...`         | Hata loglarını gösterir |

---

## 📌 13. Neden Prefix Kullanmalısın?

✅ Avantajları:

- 🧩 Uyumsuz oyunları izole etmek
- 🔧 Özel yapılandırmalar yapabilmek
- 💣 Sorunlu oyunların sistem genelini etkilemesini önlemek
- 🗂️ Her prefix'i ayrı klasörde yedeklemek

---

## 🔚 Sonuç

`WINEPREFIX`, Linux üzerinde oyun ve uygulama çalıştıran herkesin öğrenmesi gereken temel bir kavramdır.
Bu rehberle artık:

- Kendi prefix’lerinizi oluşturabilir,
- DLL kurabilir,
- Kayıt defteri düzenleyebilir,
- Lutris ve Steam ile entegre kullanabilir,
- Farklı oyunları sorunsuz şekilde çalıştırabilirsiniz. ✅



