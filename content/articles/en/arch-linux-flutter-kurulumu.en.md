Title: Flutter Installation on Arch Linux: Complete Installation Guide Without Android Studio
Date: 2025-08-03 16:45  
Modified: 2025-08-11 22:59
Category: Yazılım Geliştirme  
Tags: flutter, arch-linux, android-development, dart, mobile-development, aur, android-sdk  
Slug: arch-linux-flutter-kurulumu
Authors: yuceltoluyag  
Status: published  
Summary: Flutter development environment setup on Arch Linux without Android Studio. Lightweight and effective installation with 2025 updated packages and Java 24 support.  
Template: article
Image: images/arch-linux-flutter-kurulumu-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114989730580607107
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtqdlvgbs2y



## Flutter Installation on Arch Linux: Complete Installation Guide Without Android Studio

## 🎯 Introduction

Working with Flutter and Android together is not an easy task! While Linux is a first-class platform when it comes to Flutter development, setting up Java, Android SDK, and the Android toolchain can be a real pain. 😅

This guide shows you how to run Flutter with Android SDK **without installing Android Studio**. Android Studio is a full-featured IDE, but if you want to use a different editor (like Vim, VS Code), Android Studio is just eating up your disk space! 💾

**2025 Update**: This guide has been tested with Flutter 3.32.8, Dart 3.8.1, Java 24 OpenJDK, and Android SDK 36.

## 📋 System Requirements

Before you begin, make sure your system has the following:

- ✅ **Disk Space**: **8GB** free space for Flutter and Android SDK (increased slightly in 2025)
- ✅ **RAM**: Minimum 8GB (16GB recommended - for modern Android emulators)
- ✅ **Internet**: Stable connection (~2.5GB download)
- ✅ **AUR Helper**: yay or paru

## 🔧 Step 1: Flutter Installation

### Flutter Installation from AUR 📥

```bash
# Install Flutter from AUR (bin package is up-to-date)
yay -S flutter-bin

# Alternative: Flutter git version
yay -S flutter
```

### Java Version Check and Setup ☕

In 2025, Arch Linux comes with Java 24 by default:

```bash
# Check current Java version
archlinux-java status

# Output will look like this:
# Available Java environments:
#   java-24-openjdk (default)

# Additional settings for Java 24 compatibility
export JAVA_HOME='/usr/lib/jvm/java-24-openjdk'
```

**⚠️ 2025 Update**: Android tools are fully compatible with Java 24. No need for older versions!

### Flutter Version Check 🔍

```bash
# Check Flutter version
flutter --version

# Output should be like this:
# Flutter 3.32.8 • channel stable • https://github.com/flutter/flutter.git
# Framework • revision edada7c56e (8 days ago) • 2025-07-25 14:08:03 +0000
# Engine • revision ef0cd00091 (9 days ago) • 2025-07-24 12:23:50 -0700
# Tools • Dart 3.8.1 • DevTools 2.45.1
```

## 🔐 Step 2: Fixing Flutter Permissions

### Creating User Group 👥

```bash
# Create flutterusers group
sudo groupadd flutterusers

# Add your user to the group
sudo gpasswd -a $USER flutterusers

# Change ownership of /opt/flutter directory
sudo chown -R :flutterusers /opt/flutter

# Grant write permission to the group
sudo chmod -R g+w /opt/flutter/
```

### If Permission Issues Persist 🚨

```bash
# Grant ownership of Flutter directory to your user
sudo chown -R $USER:flutterusers /opt/flutter

# Permission for cache directory
mkdir -p ~/.pub-cache
chmod 755 ~/.pub-cache
```

## 📱 Step 3: Android SDK and Tools Installation

### Easy Installation with AUR 📦

Let's install all Android SDK components from AUR using the power of Arch Linux:

```bash
# Android SDK Command Line Tools
yay -S android-sdk-cmdline-tools-latest

# Platform tools and build tools
yay -S android-sdk-platform-tools android-sdk-build-tools

# Android SDK 36 (latest version of 2025)
yay -S android-platform-36

# Emulator support
yay -S android-emulator

# System images (optional - for emulator)
yay -S android-google-apis-x86-64-system-image
```

That's it! 🎉 AUR packages will install everything neatly under `/opt/android-sdk/`.

## 🔐 Step 4: Fixing Android SDK Permissions

### SDK Directory Structure (AUR Compatible) 📁

AUR packages install Android SDK to the `/opt/android-sdk/` directory. Let's set environment variables accordingly:

```bash
# Android SDK settings (AUR compatible)
export ANDROID_HOME="/opt/android-sdk"
export ANDROID_SDK_ROOT="/opt/android-sdk"
export ANDROID_AVD_HOME="$HOME/.android/avd"
```

## 🌍 Step 5: Environment Variables Setup

### Modern Shell Configuration ⚙️

Add the following updated settings to your `~/.bashrc` or `~/.zshrc` file:

```bash
# Java 24 settings
export JAVA_HOME='/usr/lib/jvm/java-24-openjdk'

# Android SDK settings (AUR compatible)
export ANDROID_HOME="/opt/android-sdk"
export ANDROID_SDK_ROOT="/opt/android-sdk"
export ANDROID_AVD_HOME="$HOME/.android/avd"

# Path settings
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Flutter path
export PATH=$PATH:/opt/flutter/bin

# Pub cache
export PUB_CACHE="$HOME/.pub-cache"
```

### Apply Changes 🔄

```bash
# Reload shell
source ~/.bashrc

# Or open a new terminal
# Check if environment is loaded correctly
echo $ANDROID_HOME
echo $JAVA_HOME
```

## 📲 Step 6: Android Emulator Setup

### Modern System Image Installation 💿

Updated system images with Android SDK 36:

```bash
# List available system images
 sdkmanager --list | grep system-images

# Android 36 Google Play image
sdkmanager --install "system-images;android-36;google_apis_playstore;x86_64"

# Android 35 as backup
sdkmanager --install "system-images;android-35;google_apis_playstore;x86_64"

# Android 34 LTS support
sdkmanager --install "system-images;android-34;google_apis_playstore;x86_64"
```

### Creating AVD (Pixel 8 Pro Profile) 🎮

```bash
# Create emulator with modern device profile
avdmanager create avd \
  -n Flutter_Pixel_8_Pro \
  -k "system-images;android-36;google_apis_playstore;x86_64" \
  -d "pixel_8_pro"
```

### AVD Hardware Acceleration 🚀

```bash
# KVM check
kvm-ok

# Enable hardware acceleration
echo 'hw.gpu.enabled=yes' >> ~/.android/avd/Flutter_Pixel_8_Pro.avd/config.ini
echo 'hw.gpu.mode=host' >> ~/.android/avd/Flutter_Pixel_8_Pro.avd/config.ini
```

### Launching Emulator (2025 Optimized) 🎯

```bash
# Launch with high performance
emulator @Flutter_Pixel_8_Pro \
  -gpu host \
  -memory 4096 \
  -cores 4 \
  -accel on

# Run in background
emulator @Flutter_Pixel_8_Pro \
  -gpu host \
  -no-boot-anim \
  -no-snapshot &
```

## 🩺 Step 7: Verification with Flutter Doctor

### Accepting Android Licenses ✅

```bash
# Accept all Android licenses
flutter doctor --android-licenses

# Accept automatically with 'y'
yes | flutter doctor --android-licenses
```

### Running Flutter Doctor 🔍

```bash
# Detailed Flutter doctor
flutter doctor -v

# Enable web support
flutter config --enable-web

# Enable Linux desktop support
flutter config --enable-linux-desktop
```

**2025 Successful Installation Output:**

```bash
flutter doctor -v
[✓] Flutter (Channel stable, 3.32.8, on Arch Linux
    6.12.40-2-lts, locale en_US.UTF-8) [73ms]    • Flutter version 3.32.8 on channel stable at
      /opt/flutter    • Upstream repository
      https://github.com/flutter/flutter.git    • Framework revision edada7c56e (8 days ago),
      2025-07-25 14:08:03 +0000    • Engine revision ef0cd00091    • Dart version 3.8.1    • DevTools version 2.45.1

[✓] Android toolchain - develop for Android devices
    (Android SDK version 35.0.1) [867ms]    • Android SDK at /opt/android-sdk    • Platform android-36, build-tools 35.0.1    • ANDROID_HOME = /opt/android-sdk    • ANDROID_SDK_ROOT = /opt/android-sdk    • Java binary at:
      /opt/android-studio/jbr/bin/java
      This is the JDK bundled with the latest
      Android Studio installation on this machine.
      To manually set the JDK path, use: `flutter
      config --jdk-dir="path/to/jdk"`.
    • Java version OpenJDK Runtime Environment
      (build 21.0.6+-13391695-b895.109)
    • All Android licenses accepted.

[✓] Chrome - develop for the web [11ms]    • CHROME_EXECUTABLE =
      /usr/bin/google-chrome-stable

[✓] Linux toolchain - develop for Linux desktop
    [218ms]    • clang version 20.1.8    • cmake version 4.0.3-dirty    • ninja version 1.12.1    • pkg-config version 2.5.1    • OpenGL core renderer: NVIDIA GeForce RTX 4060
      Ti/PCIe/SSE2 (X11)    • OpenGL core version: 4.6.0 NVIDIA 575.64.05
      (X11)    • OpenGL core shading language version: 4.60
      NVIDIA (X11)    • OpenGL ES renderer: NVIDIA GeForce RTX 4060
      Ti/PCIe/SSE2 (X11)    • OpenGL ES version: OpenGL ES 3.2 NVIDIA
      575.64.05 (X11)    • OpenGL ES shading language version: OpenGL ES
      GLSL ES 3.20 (X11)    • GL_EXT_framebuffer_blit: yes (X11)    • GL_EXT_texture_format_BGRA8888: yes (X11)

[✓] Android Studio (version 2025.1.2) [10ms]    • Android Studio at /opt/android-studio    • Flutter plugin can be installed from:
      🔨
      https://plugins.jetbrains.com/plugin/9212-flut
      ter    • Dart plugin can be installed from:
      🔨
      https://plugins.jetbrains.com/plugin/6351-dart    • Java version OpenJDK Runtime Environment
      (build 21.0.6+-13391695-b895.109)

[✓] Connected device (2 available) [89ms]    • Linux (desktop) • linux  • linux-x64      •
      Arch Linux 6.12.40-2-lts    • Chrome (web)    • chrome • web-javascript •
      Google Chrome 138.0.7204.183

[✓] Network resources [827ms]    • All expected network resources are available.

• No issues found!
```

## 🔧 Step 8: Advanced Configuration

### Modern KVM Installation ⚡

```bash
# KVM and QEMU updated versions
sudo pacman -S qemu-full libvirt virt-manager bridge-utils dnsmasq

# User groups
sudo usermod -aG kvm,libvirt $USER

# Enable services
sudo systemctl enable --now libvirtd
sudo systemctl enable --now dnsmasq

# Nested virtualization (Intel)
echo 'options kvm_intel nested=1' | sudo tee /etc/modprobe.d/kvm_intel.conf

# Nested virtualization (AMD)
echo 'options kvm_amd nested=1' | sudo tee /etc/modprobe.d/kvm_amd.conf
```

### Gradle 8.0+ Optimization 🚀

`~/.gradle/gradle.properties` :

```properties
# Gradle 8.0+ performance settings
org.gradle.daemon=true
org.gradle.parallel=true
org.gradle.configureondemand=true
org.gradle.caching=true
org.gradle.jvmargs=-Xmx8g -XX:MaxMetaspaceSize=2g -XX:+HeapDumpOnOutOfMemoryError

# Android build optimization
android.useAndroidX=true
android.enableJetifier=true
android.enableR8.fullMode=true
android.experimental.enableSourceSetPathsMap=true
android.experimental.legacyTransform=false

# Kotlin compiler optimization
kotlin.compiler.execution.strategy=in-process
kotlin.incremental=true
```

### Disabling Flutter Analytics (Privacy) 🔒

Flutter sends Google Analytics by default. If you want to disable this:

```bash
# Disable analytics
flutter --disable-analytics

# Also disable crash reporting
flutter config --no-analytics
```

## 🧪 Step 9: First Flutter Project (2025 Modern Template)

### Creating Modern Project 🎯

```bash
# New project with Material 3
flutter create \
  --platforms=android,web,linux \
  --template=app \
  --project-name my_arch_app_2025 \
  my_arch_app_2025

cd my_arch_app_2025

# Update dependencies
flutter pub get
flutter pub upgrade
```

### Modern pubspec.yaml Template 📄

```yaml
name: my_arch_app_2025
description: Modern Flutter app for Arch Linux
version: 1.0.0+1

environment:
  sdk: ">=3.8.0 <4.0.0"
  flutter: ">=3.32.0"

dependencies:
  flutter:
    sdk: flutter

  # UI and Material 3
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

### Running the Project 🚀

```bash
# Run on Android emulator
flutter run -d emulator-5554

# Run on web (Chrome)
flutter run -d chrome --web-port=8080

# Run on Linux desktop
flutter run -d linux

# Development with hot reload
flutter run --hot
```

## ⚠️ Common Issues and Solutions

### Issue 1: Java 24 Compatibility Issues ☕

**Error**: `Unsupported Java version` or module system issues

**Solution**:

```bash
# Add Java flags
export JAVA_OPTS="--add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED"

# Java args for Gradle
echo "org.gradle.jvmargs=--add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED" >> ~/.gradle/gradle.properties
```

### Issue 1: SDK Manager Install Properties Error 🚫

**Error**: `Warning: Failed to read or create install properties file.`

**Solution**:

```bash
# Grant ownership of SDK directory to your user
sudo chown -R $USER:$USER /opt/android-sdk/

# Create required installation settings directory
sudo mkdir -p /opt/android-sdk/.installationSettings
sudo chown $USER:$USER /opt/android-sdk/.installationSettings

# Now sdkmanager will work
 sdkmanager --install "system-images;android-34;google_apis_playstore;x86_64"
```

**Note**: This error usually occurs due to AUR packages being installed with root permissions.

### Issue 3: Emulator Performance Issues 📱

**Error**: Emulator runs slowly or freezes

**Solution**:

```bash
# Hardware acceleration check
/usr/bin/kvm-ok

# KVM optimization for AMD
echo 'GRUB_CMDLINE_LINUX_DEFAULT="quiet splash amd_iommu=on iommu=pt"' | sudo tee -a /etc/default/grub
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### Issue 4: Flutter Web Build Error 🌐

**Error**: `Failed to build for web`

**Solution**:

```bash
# Install web dependencies
flutter pub global activate webdev

# Set Chrome path
export CHROME_EXECUTABLE=/usr/bin/google-chrome-stable

# Clean and rebuild web build
flutter clean
flutter pub get
flutter build web --release
```

## 🎨 Step 10: Modern IDE Setup

### Visual Studio Code + Extensions 💻

```bash
# VS Code updated version
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

### Neovim Modern Setup (Advanced) 🔥

```bash
# Install Neovim 0.10+
sudo pacman -S neovim

# Modern Flutter setup with LazyVim
git clone https://github.com/LazyVim/starter ~/.config/nvim
```

`~/.config/nvim/lua/plugins/flutter.lua`:

```lua
return {
  {
    "akinsho/flutter-tools.nvim",
    lazy = false,
    dependencies: {
      "nvim-lua/plenary.nvim",
      "stevearc/dressing.nvim",
    },
    config: function()
      require("flutter-tools").setup({
        flutter_path: "/opt/flutter/bin/flutter",
        dart_path: "/opt/flutter/bin/dart",
        fvm: false,
        widget_guides: {
          enabled: true,
        },
        dev_log: {
          enabled: true,
          open_cmd: "tabedit",
        },
      })
    end,
  },
}
```

## 📊 Performance and Build Optimization

### Modern Build Configurations 🏗️

`android/app/build.gradle` optimizations:

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

# Cleanup
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

## 🎯 Conclusion and Next Steps

Congratulations! 🎉 You have set up a fully functional Flutter development environment on Arch Linux with the latest technologies of 2025.

### New Features in 2025 🆕

- **Java 24 Support**: Modern JVM optimizations
- **Android SDK 36**: Access to the latest Android features
- **Flutter 3.32.8**: Improved performance and new widgets
- **Material 3**: Modern UI design system
- **Web Assembly**: Improved web performance

### Learning Resources 📚

- 📖 [Flutter 2025 Documentation](https://flutter.dev/docs){: target="\_blank" rel="noopener noreferrer"}
- 🎥 [Flutter Forward 2025](https://youtube.com/flutterdev){: target="\_blank" rel="noopener noreferrer"}
- 💻 [Dart 3.6 Language Guide](https://dart.dev/guides){: target="\_blank" rel="noopener noreferrer"}
- 🏗️ [Modern Flutter Architecture](https://github.com/flutter/samples){: target="\_blank" rel="noopener noreferrer"}

### Community and Support 🤝

- 📱 [r/FlutterDev](https://reddit.com/r/FlutterDev){: target="\_blank" rel="noopener noreferrer"}
- 🐧 [Arch Linux Forums](https://bbs.archlinux.org/){: target="\_blank" rel="noopener noreferrer"}

### Starter Projects 🚀

1. **🤖 AI Chat App** - Gemini API integration
2. **💰 Crypto Tracker** - Real-time WebSocket
3. **🎵 Music Streaming** - Modern audio framework
4. **🏪 AR Shopping** - Augmented Reality features
5. **🌱 Sustainability Tracker** - Green tech initiative

The bleeding-edge nature of Arch Linux and the constantly evolving Flutter ecosystem offer a perfect combination for mobile development in 2025. The environment you set up with this guide will form a solid foundation for your future projects! 🌟

**I wish you successful projects!** 🚀✨

---

**Last Update**: August 2025
**Tested With**: Flutter 3.32.8, Java 24 OpenJDK, Android SDK 36, Arch Linux 2025.08

[responsive_img src="/images/arch-linux-flutter-kurulumu-xl.webp" alt="arch-linux-flutter-kurulumu" /]

[responsive_img src="/images/arch-linux-flutter-kurulumu-test-xl.webp" alt="arch-linux-flutter-kurulumu" /]
