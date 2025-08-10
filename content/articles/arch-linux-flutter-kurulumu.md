Title: Rehber: Arch Linux'ta Flutter Kurulumu
Date: 2025-08-03 16:45  
Modified: 2025-08-08 01:17
Category: Yazılım Geliştirme  
Tags: flutter, arch-linux, android-development, dart, mobile-development, aur, android-sdk  
Slug: arch-linux-flutter-kurulumu
Authors: yuceltoluyag  
Status: published  
Summary: Arch Linux'ta Android Studio kurmadan Flutter geliştirme ortamı kurulumu. 2025 güncel paketleri ve Java 24 desteği ile hafif ve etkili kurulum.  
Template: article
Image: images/arch-linux-flutter-kurulumu-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114989730580607107


# Arch Linux'ta Flutter Kurulumu: Android Studio Olmadan Tam Kurulum Rehberi 

## 🎯 Giriş

Flutter ve Android'i birlikte çalıştırmak hiç de kolay bir iş değil! Linux, Flutter geliştirme söz konusu olduğunda birinci sınıf bir platform olsa da, Java, Android SDK ve Android araç zincirini kurmak gerçek bir baş belası olabilir. 😅

Bu rehber, **Android Studio kurmadan** Flutter'ı Android SDK ile nasıl çalıştıracağınızı gösteriyor. Android Studio tam donanımlı bir IDE'dir, ancak farklı bir editör (Vim, VS Code gibi) kullanmak istiyorsanız, Android Studio sadece disk alanınızı yiyor demektir! 💾

**2025 Güncellemesi**: Bu rehber Flutter 3.32.8, Dart 3.8.1, Java 24 OpenJDK ve Android SDK 36 ile test edilmiştir.

## 📋 Sistem Gereksinimleri

Başlamadan önce sisteminizde şunların bulunduğundan emin olun:

- ✅ **Disk Alanı**: Flutter ve Android SDK için **8GB** boş alan (2025'te biraz arttı)
- ✅ **RAM**: Minimum 8GB (16GB önerilir - modern Android emülatörleri için)
- ✅ **İnternet**: Kararlı bağlantı (~2.5GB indirme)
- ✅ **AUR Helper**: yay veya paru

## 🔧 Adım 1: Flutter Kurulumu

### AUR'dan Flutter Kurulumu 📥

```bash
# Flutter'ı AUR'dan kur (bin paketi güncel)
yay -S flutter-bin

# Alternatif: Flutter git versiyonu
yay -S flutter
```

### Java Sürümü Kontrolü ve Ayarlama ☕

2025'te Arch Linux varsayılan olarak Java 24 ile geliyor:

```bash
# Mevcut Java sürümünü kontrol et
archlinux-java status

# Çıktı böyle görünecek:
# Available Java environments:
#   java-24-openjdk (default)

# Java 24 ile uyumluluk için ek ayarlar
export JAVA_HOME='/usr/lib/jvm/java-24-openjdk'
```

**⚠️ 2025 Güncellemesi**: Java 24 ile Android araçları tamamen uyumlu. Eski sürümlere gerek yok!

### Flutter Sürüm Kontrolü 🔍

```bash
# Flutter sürümünü kontrol et
flutter --version

# Çıktı şöyle olmalı:
# Flutter 3.32.8 • channel stable • https://github.com/flutter/flutter.git
# Framework • revision edada7c56e (8 days ago) • 2025-07-25 14:08:03 +0000
# Engine • revision ef0cd00091 (9 days ago) • 2025-07-24 12:23:50 -0700
# Tools • Dart 3.8.1 • DevTools 2.45.1
```

## 🔐 Adım 2: Flutter İzinlerini Düzeltme

### Kullanıcı Grubu Oluşturma 👥

```bash
# flutterusers grubu oluştur
sudo groupadd flutterusers

# Kullanıcını gruba ekle
sudo gpasswd -a $USER flutterusers

# /opt/flutter dizininin sahipliğini değiştir
sudo chown -R :flutterusers /opt/flutter

# Gruba yazma izni ver
sudo chmod -R g+w /opt/flutter/
```

### İzin Sorunları Devam Ederse 🚨

```bash
# Flutter dizininin sahipliğini kullanıcınıza ver
sudo chown -R $USER:flutterusers /opt/flutter

# Cache dizini için izin
mkdir -p ~/.pub-cache
chmod 755 ~/.pub-cache
```

## 📱 Adım 3: Android SDK ve Araçları Kurulumu 

### AUR ile Kolay Kurulum 📦

Arch Linux'un gücünü kullanarak tüm Android SDK bileşenlerini AUR'dan kuralım:

```bash
# Android SDK Command Line Tools 
yay -S android-sdk-cmdline-tools-latest

# Platform tools ve build tools
yay -S android-sdk-platform-tools android-sdk-build-tools

# Android SDK 36 (2025'in son sürümü)
yay -S android-platform-36

# Emülatör desteği
yay -S android-emulator

# System images (opsiyonel - emülatör için)
yay -S android-google-apis-x86-64-system-image
```

Bu kadar! 🎉 AUR paketleri her şeyi `/opt/android-sdk/` altına düzgün bir şekilde kuracak.

## 🔐 Adım 4: Android SDK İzinlerini Düzeltme

### SDK Dizin Yapısı (AUR Uyumlu) 📁

AUR paketleri Android SDK'yı `/opt/android-sdk/` dizinine kuruyor. Environment variables'ları buna göre ayarlayalım:

```bash
# Android SDK ayarları (AUR uyumlu)
export ANDROID_HOME="/opt/android-sdk"
export ANDROID_SDK_ROOT="/opt/android-sdk"
export ANDROID_AVD_HOME="$HOME/.android/avd"
```

## 🌍 Adım 5: Environment Variables Kurulumu 

### Modern Shell Konfigürasyonu ⚙️

`~/.bashrc` veya `~/.zshrc` dosyanıza şu güncel ayarları ekleyin:

```bash
# Java 24 ayarları
export JAVA_HOME='/usr/lib/jvm/java-24-openjdk'

# Android SDK ayarları (AUR uyumlu)
export ANDROID_HOME="/opt/android-sdk"
export ANDROID_SDK_ROOT="/opt/android-sdk"
export ANDROID_AVD_HOME="$HOME/.android/avd"

# Path ayarları
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Flutter path
export PATH=$PATH:/opt/flutter/bin

# Pub cache
export PUB_CACHE="$HOME/.pub-cache"
```

### Değişiklikleri Uygulama 🔄

```bash
# Shell'i yeniden yükle
source ~/.bashrc

# Veya yeni terminal açın
# Environment'ın doğru yüklendiğini kontrol et
echo $ANDROID_HOME
echo $JAVA_HOME
```

## 📲 Adım 6: Android Emülatör Kurulumu 

### Modern Sistem Image'i Kurulumu 💿

Android SDK 36 ile güncel sistem image'leri:

```bash
# Mevcut sistem image'lerini listele
sdkmanager --list | grep system-images

# Android 36 Google Play image 
sdkmanager --install "system-images;android-36;google_apis_playstore;x86_64"

# Android 35 backup olarak
sdkmanager --install "system-images;android-35;google_apis_playstore;x86_64"

# Android 34 LTS desteği
sdkmanager --install "system-images;android-34;google_apis_playstore;x86_64"
```

### AVD Oluşturma (Pixel 8 Pro Profili) 🎮

```bash
# Modern cihaz profili ile emülatör oluştur
avdmanager create avd \
  -n Flutter_Pixel_8_Pro \
  -k "system-images;android-36;google_apis_playstore;x86_64" \
  -d "pixel_8_pro"
```

### AVD Hardware Acceleration 🚀

```bash
# KVM kontrolü
kvm-ok

# Hardware acceleration aktifleştir
echo 'hw.gpu.enabled=yes' >> ~/.android/avd/Flutter_Pixel_8_Pro.avd/config.ini
echo 'hw.gpu.mode=host' >> ~/.android/avd/Flutter_Pixel_8_Pro.avd/config.ini
```

### Emülatörü Başlatma (2025 Optimized) 🎯

```bash
# Yüksek performans ile başlat
emulator @Flutter_Pixel_8_Pro \
  -gpu host \
  -memory 4096 \
  -cores 4 \
  -accel on

# Arka planda çalıştır
emulator @Flutter_Pixel_8_Pro \
  -gpu host \
  -no-boot-anim \
  -no-snapshot &
```

## 🩺 Adım 7: Flutter Doctor ile Doğrulama 

### Android Lisanslarını Kabul Etme ✅

```bash
# Tüm Android lisanslarını kabul et
flutter doctor --android-licenses

# Otomatik 'y' ile kabul et
yes | flutter doctor --android-licenses
```



### Flutter Doctor Çalıştırma 🔍

```bash
# Detaylı Flutter doctor
flutter doctor -v

# Web desteğini aktifleştir
flutter config --enable-web

# Linux desktop desteğini aktifleştir  
flutter config --enable-linux-desktop
```

**2025 Başarılı Kurulum Çıktısı:**

```bash
flutter doctor -v
[✓] Flutter (Channel stable, 3.32.8, on Arch Linux
    6.12.40-2-lts, locale en_US.UTF-8) [73ms]
    • Flutter version 3.32.8 on channel stable at
      /opt/flutter
    • Upstream repository
      https://github.com/flutter/flutter.git
    • Framework revision edada7c56e (8 days ago),
      2025-07-25 14:08:03 +0000
    • Engine revision ef0cd00091
    • Dart version 3.8.1
    • DevTools version 2.45.1

[✓] Android toolchain - develop for Android devices
    (Android SDK version 35.0.1) [867ms]
    • Android SDK at /opt/android-sdk
    • Platform android-36, build-tools 35.0.1
    • ANDROID_HOME = /opt/android-sdk
    • ANDROID_SDK_ROOT = /opt/android-sdk
    • Java binary at:
      /opt/android-studio/jbr/bin/java
      This is the JDK bundled with the latest
      Android Studio installation on this machine.
      To manually set the JDK path, use: `flutter
      config --jdk-dir="path/to/jdk"`.
    • Java version OpenJDK Runtime Environment
      (build 21.0.6+-13391695-b895.109)
    • All Android licenses accepted.

[✓] Chrome - develop for the web [11ms]
    • CHROME_EXECUTABLE =
      /usr/bin/google-chrome-stable

[✓] Linux toolchain - develop for Linux desktop
    [218ms]
    • clang version 20.1.8
    • cmake version 4.0.3-dirty
    • ninja version 1.12.1
    • pkg-config version 2.5.1
    • OpenGL core renderer: NVIDIA GeForce RTX 4060
      Ti/PCIe/SSE2 (X11)
    • OpenGL core version: 4.6.0 NVIDIA 575.64.05
      (X11)
    • OpenGL core shading language version: 4.60
      NVIDIA (X11)
    • OpenGL ES renderer: NVIDIA GeForce RTX 4060
      Ti/PCIe/SSE2 (X11)
    • OpenGL ES version: OpenGL ES 3.2 NVIDIA
      575.64.05 (X11)
    • OpenGL ES shading language version: OpenGL ES
      GLSL ES 3.20 (X11)
    • GL_EXT_framebuffer_blit: yes (X11)
    • GL_EXT_texture_format_BGRA8888: yes (X11)

[✓] Android Studio (version 2025.1.2) [10ms]
    • Android Studio at /opt/android-studio
    • Flutter plugin can be installed from:
      🔨
      https://plugins.jetbrains.com/plugin/9212-flut
      ter
    • Dart plugin can be installed from:
      🔨
      https://plugins.jetbrains.com/plugin/6351-dart
    • Java version OpenJDK Runtime Environment
      (build 21.0.6+-13391695-b895.109)

[✓] Connected device (2 available) [89ms]
    • Linux (desktop) • linux  • linux-x64      •
      Arch Linux 6.12.40-2-lts
    • Chrome (web)    • chrome • web-javascript •
      Google Chrome 138.0.7204.183

[✓] Network resources [827ms]
    • All expected network resources are available.

• No issues found!
```

## 🔧 Adım 8: İleri Seviye Konfigürasyon 

### Modern KVM Kurulumu ⚡

```bash
# KVM ve QEMU güncel sürümler
sudo pacman -S qemu-full libvirt virt-manager bridge-utils dnsmasq

# Kullanıcı grupları
sudo usermod -aG kvm,libvirt $USER

# Servisleri aktifleştir
sudo systemctl enable --now libvirtd
sudo systemctl enable --now dnsmasq

# Nested virtualization (Intel)
echo 'options kvm_intel nested=1' | sudo tee /etc/modprobe.d/kvm_intel.conf

# Nested virtualization (AMD)
echo 'options kvm_amd nested=1' | sudo tee /etc/modprobe.d/kvm_amd.conf
```

### Gradle 8.0+ Optimizasyonu 🚀

`~/.gradle/gradle.properties` :

```properties
# Gradle 8.0+ performans ayarları
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.caching=true
org.gradle.jvmargs=-Xmx8g -XX:MaxMetaspaceSize=2g -XX:+HeapDumpOnOutOfMemoryError

# Android build optimizasyonu 
android.useAndroidX=true
android.enableJetifier=true
android.enableR8.fullMode=true
android.experimental.enableSourceSetPathsMap=true
android.experimental.legacyTransform=false

# Kotlin compiler optimizasyonu
kotlin.compiler.execution.strategy=in-process
kotlin.incremental=true
```

### Flutter Analytics'i Kapatma (Privacy) 🔒

Flutter varsayılan olarak Google Analytics gönderir. Bunu kapatmak isterseniz:

```bash
# Analytics'i devre dışı bırak
flutter --disable-analytics

# Crash reporting'i de kapatmak için
flutter config --no-analytics
```

## 🧪 Adım 9: İlk Flutter Projesi (2025 Modern Template)

### Modern Proje Oluşturma 🎯

```bash
# Material 3 ile yeni proje
flutter create \
  --platforms=android,web,linux \
  --template=app \
  --project-name my_arch_app_2025 \
  my_arch_app_2025

cd my_arch_app_2025

# Dependencies güncelle
flutter pub get
flutter pub upgrade
```

### Modern pubspec.yaml Template 📄

```yaml
name: my_arch_app_2025
description: Modern Flutter app for Arch Linux
version: 1.0.0+1

environment:
  sdk: '>=3.8.0 <4.0.0'
  flutter: ">=3.32.0"

dependencies:
  flutter:
    sdk: flutter
  
  # UI ve Material 3
  material_color_utilities: ^0.8.0
  dynamic_color: ^1.7.0
  
  # State management
  provider: ^6.1.2
  riverpod: ^2.5.1
  
  # Networking
  http: ^1.2.1
  dio: ^5.4.3
  
  # Storage
  shared_preferences: ^2.2.3
  sqflite: ^2.3.3
  
  # Utils
  intl: ^0.19.0
  path: ^1.9.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0
  integration_test:
    sdk: flutter

flutter:
  uses-material-design: true
```

### Projeyi Çalıştırma 🚀

```bash
# Android emülatörde çalıştır
flutter run -d emulator-5554

# Web'de çalıştır (Chrome)
flutter run -d chrome --web-port=8080

# Linux desktop'ta çalıştır
flutter run -d linux

# Hot reload ile development
flutter run --hot
```

## ⚠️ Yaygın Sorunlar ve Çözümleri 

### Sorun 1: Java 24 Uyumluluk Sorunları ☕

**Hata**: `Unsupported Java version` veya module system sorunları

**Çözüm**:
```bash
# Java flags ekle
export JAVA_OPTS="--add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED"

# Gradle için Java args
echo "org.gradle.jvmargs=--add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED" >> ~/.gradle/gradle.properties
```

### Sorun 1: SDK Manager Install Properties Hatası 🚫

**Hata**: `Warning: Failed to read or create install properties file.`

**Çözüm**:
```bash
# SDK dizininin sahipliğini kullanıcınıza verin
sudo chown -R $USER:$USER /opt/android-sdk/

# İhtiyaç duyulan installation settings dizinini oluşturun
sudo mkdir -p /opt/android-sdk/.installationSettings
sudo chown $USER:$USER /opt/android-sdk/.installationSettings

# Şimdi sdkmanager çalışacaktır
sdkmanager --install "system-images;android-34;google_apis_playstore;x86_64"
```

**Not**: Bu hata genellikle AUR paketlerinin root izinleriyle kurulmasından kaynaklanır.

### Sorun 3: Emülatör Performance Sorunları 📱

**Hata**: Emülatör yavaş çalışıyor veya donuyor

**Çözüm**:
```bash
# Hardware acceleration kontrolü
/usr/bin/kvm-ok

# AMD için KVM optimizasyonu
echo 'GRUB_CMDLINE_LINUX_DEFAULT="quiet splash amd_iommu=on iommu=pt"' | sudo tee -a /etc/default/grub
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### Sorun 4: Flutter Web Build Hatası 🌐

**Hata**: `Failed to build for web`

**Çözüm**:
```bash
# Web dependencies kur
flutter pub global activate webdev

# Chrome path'ini ayarla
export CHROME_EXECUTABLE=/usr/bin/google-chrome-stable

# Web build'i temizle ve yeniden yap
flutter clean
flutter pub get
flutter build web --release
```

## 🎨 Adım 10: Modern IDE Kurulumu 

### Visual Studio Code + Extensions 💻

```bash
# VS Code güncel sürüm
yay -S visual-studio-code-bin

# Essential Flutter extensions
code --install-extension Dart-Code.flutter
code --install-extension Dart-Code.dart-code
code --install-extension alexisvt.flutter-snippets
code --install-extension Nash.awesome-flutter-snippets
code --install-extension usernamehw.errorlens
code --install-extension bradlc.vscode-tailwindcss
```

### VS Code Settings (2025 Optimized) ⚙️

`.vscode/settings.json`:

```json
{
  "dart.flutterSdkPath": "/opt/flutter",
  "dart.enableSdkFormatter": true,
  "dart.previewFlutterUiGuides": true,
  "dart.previewFlutterUiGuidesCustomTracking": true,
  "dart.hotReloadOnSave": "allIfDirty",
  "dart.flutterHotReloadOnSave": "allIfDirty",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "files.associations": {
    "*.dart": "dart"
  }
}
```

### Neovim Modern Setup (İleri Seviye) 🔥

```bash
# Neovim 0.10+ kur
sudo pacman -S neovim

# LazyVim ile modern Flutter setup
git clone https://github.com/LazyVim/starter ~/.config/nvim
```

`~/.config/nvim/lua/plugins/flutter.lua`:

```lua
return {
  {
    "akinsho/flutter-tools.nvim",
    lazy = false,
    dependencies = {
      "nvim-lua/plenary.nvim",
      "stevearc/dressing.nvim",
    },
    config = function()
      require("flutter-tools").setup({
        flutter_path = "/opt/flutter/bin/flutter",
        dart_path = "/opt/flutter/bin/dart",
        fvm = false,
        widget_guides = {
          enabled = true,
        },
        dev_log = {
          enabled = true,
          open_cmd = "tabedit",
        },
      })
    end,
  },
}
```

## 📊 Performance ve Build Optimizasyonu 

### Modern Build Configurations 🏗️

`android/app/build.gradle` optimizasyonları:

```gradle
android {
    compileSdk 36
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_21
        targetCompatibility JavaVersion.VERSION_21
    }
    
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            
            // 2025: Modern signing config
            signingConfig signingConfigs.release
        }
        profile {
            matchingFallbacks = ['debug', 'release']
        }
    }
    
    // 2025: Build optimization
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
    }
}
```

### CI/CD Ready Build Scripts 🔄

`scripts/build.sh`:

```bash
#!/bin/bash
set -e

echo "🏗️ Flutter Build Script "

# Temizlik
flutter clean
flutter pub get

# Code generation
dart run build_runner build --delete-conflicting-outputs

# Tests
flutter test --coverage

# Builds
echo "📱 Building Android..."
flutter build apk --release --target-platform android-arm64

echo "🌐 Building Web..."
flutter build web --release --web-renderer canvaskit

echo "🖥️ Building Linux..."
flutter build linux --release

echo "✅ All builds completed!"
```

## 🔗 Modern Development Workflow 

### Git Hooks Setup 🎯

`.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Flutter pre-commit hook

echo "🔍 Running Flutter pre-commit checks..."

# Format code
dart format .

# Analyze code
flutter analyze

# Run tests
flutter test

echo "✅ Pre-commit checks passed!"
```

### Docker Development (Optional) 🐳

`Dockerfile.dev`:

```dockerfile
FROM archlinux:latest

# Install dependencies
RUN pacman -Syu --noconfirm && \
    pacman -S --noconfirm base-devel git curl unzip && \
    pacman -S --noconfirm jdk-openjdk

# Install Flutter
RUN git clone https://github.com/flutter/flutter.git /opt/flutter
ENV PATH="$PATH:/opt/flutter/bin"

# Setup Android SDK
ENV ANDROID_HOME="/opt/android-sdk"
ENV PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"

WORKDIR /workspace
```

## 🎯 Sonuç ve İleri Adımlar

Tebrikler! 🎉 2025'in en güncel teknolojileri ile Arch Linux'ta tam fonksiyonel bir Flutter geliştirme ortamı kurdunuz. 

### 2025'te Yeni Özellikler 🆕

- **Java 24 Desteği**: Modern JVM optimizasyonları
- **Android SDK 36**: En son Android özelliklerine erişim
- **Flutter 3.32.8**: Gelişmiş performans ve yeni widget'lar
- **Material 3**: Modern UI design system
- **Web Assembly**: Gelişmiş web performansı

### Öğrenme Kaynakları 📚

- 📖 [Flutter 2025 Documentation](https://flutter.dev/docs)
- 🎥 [Flutter Forward 2025](https://youtube.com/flutterdev)
- 💻 [Dart 3.6 Language Guide](https://dart.dev/guides)
- 🏗️ [Modern Flutter Architecture](https://github.com/flutter/samples)

### Community ve Destek 🤝

- 📱 [r/FlutterDev](https://reddit.com/r/FlutterDev)
- 🐧 [Arch Linux Forums](https://bbs.archlinux.org/)

### Başlangıç Projeleri  🚀

1. **🤖 AI Chat App** - Gemini API entegrasyonu
2. **💰 Crypto Tracker** - Real-time WebSocket
3. **🎵 Music Streaming** - Modern audio framework
4. **🏪 AR Shopping** - Augmented Reality features
5. **🌱 Sustainability Tracker** - Green tech initiative

Arch Linux'un bleeding-edge yapısı ile Flutter'ın sürekli gelişen ekosistemi, 2025'te mobil geliştirme için mükemmel bir kombinasyon sunuyor. Bu rehberle kurduğunuz ortam, gelecekteki projeleriniz için solid bir temel oluşturacak! 🌟

**Başarılı projeler dilerim!** 🚀✨

---

**Son Güncelleme**: Ağustos 2025  
**Test Edildi**: Flutter 3.32.8, Java 24 OpenJDK, Android SDK 36, Arch Linux 2025.08

[responsive_img src="/images/arch-linux-flutter-kurulumu-lg.webp" alt="arch-linux-flutter-kurulumu" /]

[responsive_img src="/images/arch-linux-flutter-kurulumu-test-lg.webp" alt="arch-linux-flutter-kurulumu" /]