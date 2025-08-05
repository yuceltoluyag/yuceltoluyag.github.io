Title: 🎮 Cyberpunk 2077 Linux'ta Mod Kurulum Rehberi: Cyber Engine Tweaks ve Daha Fazlası
Date: 2025-08-01 10:30  
Modified: 2025-08-01 10:48
Category: Oyun
Tags: cyberpunk-2077, linux, mod, cyber-engine-tweaks, wine, proton, gaming  
Slug: cyberpunk-2077-linux-mod-kurulum-rehberi  
Authors: yuceltoluyag  
Status: published  
Summary: Cyberpunk 2077'yi Linux'ta modlayın! Paketlenmiş ve paketlenmemiş sürümler için detaylı Cyber Engine Tweaks kurulum rehberi.  
Template: article

---

## 🚀 Giriş

Cyberpunk 2077, Linux platformunda da harika bir deneyim sunuyor, ancak modlarla bu deneyimi bir üst seviyeye taşıyabilirsiniz! Bu rehberde, hem paketlenmiş hem de paketlenmemiş sürümler için mod kurulumunu detaylıca anlatacağım. Özellikle Cyber Engine Tweaks modunu kurarak oyununuzu nasıl geliştireceğinizi öğreneceksiniz. 🎯

## 📋 Gereksinimler

Mod kurulumuna başlamadan önce sisteminizde bulunması gerekenler:

- ✅ Cyberpunk 2077 (Steam, GOG veya Epic Games versiyonu)
- ✅ Wine 7.0+ veya Proton 7.0+
- ✅ Winetricks
- ✅ İnternet bağlantısı
- ✅ Temel terminal bilgisi

## 🎯 Paketlenmiş Sürümler İçin Kurulum (Kron4ek Yöntemi)

### Adım 1: Cyber Engine Tweaks İndirme 📥

1. [Cyber Engine Tweaks GitHub sayfasına](https://github.com/yamashi/CyberEngineTweaks) gidin
2. En son sürümü indirin
3. ZIP dosyasını oyun dizininize çıkarın

### Adım 2: Wine Konfigürasyonu ⚙️

Paketlenmiş sürüm için winecfg'yi şu komutla açın:

```bash
./start.sh --cfg
```

Wine Configuration penceresinde:

1. **Libraries** sekmesine geçin
2. **New override for library** alanına `version` yazın (tırnak işareti olmadan)
3. **Add** butonuna tıklayın
4. Listeden `version` seçin ve **Edit** tıklayın
5. **Native then Builtin** seçeneğini seçin (varsayılan olarak zaten seçili olmalı)
6. **OK** ile kaydedin

### Adım 3: DirectX Bileşenleri Kurulumu 🔧

Gerekli DirectX bileşenlerini kurmak için:

```bash
./start.sh --tricks d3dcompiler_43 d3dcompiler_47
```

### Adım 4: Oyunu Başlatma ve Test 🎮

1. Oyunu normal şekilde başlatın
2. Cyber Engine Tweaks overlay'i için klavye kısayolu belirleme penceresi görünmeli
3. İstediğiniz tuş kombinasyonunu ayarlayın (örneğin: `F4`)

## 🛠️ Paketlenmemiş Sürümler İçin Kurulum

### Adım 1: Steam/Proton Kurulumu 🎲

Steam'de Cyberpunk 2077 için Proton ayarları:

1. Steam Library'de Cyberpunk 2077'ye sağ tıklayın
2. **Properties** > **Compatibility** sekmesi
3. **Force the use of a specific Steam Play compatibility tool** işaretleyin
4. **Proton 7.0+** seçin

### Adım 2: Prefix Konumunu Bulma 📍

Steam Proton prefix'inizi bulun:

```bash
cd ~/.steam/steam/steamapps/compatdata/1091500
ls -la
```

### Adım 3: Cyber Engine Tweaks Kurulumu 📦

1. Cyber Engine Tweaks'i indirin
2. Oyun dizinine çıkarın:

```bash
# Oyun dizini genellikle şurada:
cd ~/.steam/steam/steamapps/common/Cyberpunk\ 2077/
# CET dosyalarını buraya çıkarın
```

### Adım 4: Winecfg Ayarları (Manuel) ⚡

Prefix'e özel winecfg açmak için:

```bash
WINEPREFIX=~/.steam/steam/steamapps/compatdata/1091500/pfx winecfg
```

Daha sonra Adım 2'deki aynı `version` library ayarlarını yapın.

### Adım 5: Winetricks ile DirectX Kurulumu 🎯

```bash
WINEPREFIX=~/.steam/steam/steamapps/compatdata/1091500/pfx winetricks d3dcompiler_43 d3dcompiler_47
```

## 🔍 Alternatif Kurulum Yöntemleri

### Lutris Kullanıcıları İçin 🎮

1. Lutris'te oyunu seçin
2. **Configure** > **Runner options**'a gidin
3. **Wine version**: Wine-GE veya Lutris-Wine seçin
4. **System options** > **Prefix architecture**: `win64`
5. Terminal'de prefix yolunu bulun ve yukarıdaki adımları uygulayın

### Bottles Kullanıcıları İçin 🍷

1. Bottles'da yeni bir şişe oluşturun
2. **Gaming** template'ini seçin
3. Dependencies'e `d3dcompiler_43` ve `d3dcompiler_47` ekleyin
4. Cyber Engine Tweaks'i şişenin program dizinine kurun

## ⚠️ Yaygın Sorunlar ve Çözümleri

### Sorun 1: Overlay Açılmıyor 🚫

**Çözüm:**
```bash
# Oyun dizininde CET loglarını kontrol edin
cat cyber_engine_tweaks.log
```

### Sorun 2: Crash on Startup 💥

**Çözüm:**
- Proton versiyonunu değiştirin (GE-Proton önerilir)
- Steam launch options: `PROTON_LOG=1 %command%`

### Sorun 3: Mods Yüklenmiyor 📁

**Çözüm:**
1. Mod dosyalarının doğru dizinde olduğunu kontrol edin
2. `bin/x64/plugins/cyber_engine_tweaks/mods/` dizini yapısını doğrulayın

## 🎨 Popüler Modlar ve Kurulumları

### 1. Better Vehicle Handling 🚗

```bash
# Mods dizinine çıkarın
~/.steam/steam/steamapps/common/Cyberpunk\ 2077/bin/x64/plugins/cyber_engine_tweaks/mods/
```

### 2. Enhanced Police System 👮‍♂️

- NexusMods'dan indirin
- Mod manager kullanın veya manuel olarak kurun
- Game directory/archive/pc/mod/ dizinine yerleştirin

### 3. Visual Improvements 🎨

- ReShade for Linux kurulumu
- DXVK ile uyumluluk ayarları

## 🔧 İleri Seviye Ayarlar

### Performance Optimizasyonu ⚡

Launch parametreleri:
```bash
DXVK_LOG_LEVEL=none DXVK_HUD=fps %command%
```

### Memory Management 💾

`user.ini` dosyasında:
```ini
[Engine]
MemoryPoolBudgets.PoolCPU=3GB
MemoryPoolBudgets.PoolGPU=6GB
```

## 📊 Benchmark ve Test

Mod kurulumu sonrası performans testi:

1. **Vanilla oyun**: FPS ortalaması kaydedin
2. **Modlu oyun**: Karşılaştırmalı test yapın
3. **Stability test**: 30 dakika oynayın

## 🎯 Sonuç ve Öneriler

Cyberpunk 2077'yi Linux'ta modlamak başlangıçta karmaşık görünse de, doğru adımları takip ederek harika sonuçlar elde edebilirsiniz! 🚀

**En İyi Uygulamalar:**
- 💾 Oyun dosyalarınızı yedekleyin
- 🔄 Modları tek tek test edin
- 📋 Kurulum notlarınızı tutun
- 🎮 Community forumlarını takip edin

**Güvenlik İpuçları:**
- ✅ Sadece güvenilir kaynaklardan mod indirin
- 🛡️ Antivirus taraması yapın
- 📝 Mod listesini güncel tutun

Linux gaming topluluğu sürekli büyüyor ve Cyberpunk 2077 gibi AAA oyunlar artık Linux'ta da mükemmel çalışıyor. Bu rehberle Night City'de daha iyi bir deneyim yaşayacağınızdan eminim! 🌃

## 🔗 Faydalı Kaynaklar

- [ProtonDB Cyberpunk Reports](https://www.protondb.com/app/1091500)
- [r/linux_gaming Community](https://reddit.com/r/linux_gaming)
- [NexusMods Cyberpunk Section](https://www.nexusmods.com/cyberpunk2077)

**Not:** Bu rehber sürekli güncellenmektedir. Yeni mod versiyonları ve Linux uyumluluğu değişiklikleri için takipte kalın! 🎮✨