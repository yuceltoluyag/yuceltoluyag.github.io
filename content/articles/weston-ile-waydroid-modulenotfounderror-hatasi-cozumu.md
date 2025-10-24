Title: Weston ile Waydroid Kurulumu: ModuleNotFoundError Hatası ve Çözümü
Date: 2025-10-25 03:00
Category: Linux
Tags: linux, waydroid, python, pyenv, arch-linux, troubleshooting
Slug: weston-ile-waydroid-modulenotfounderror-hatasi-cozumu
Authors: yuceltoluyag
Status: published
Summary: Waydroid kurulumu sırasında sıkça görülen “ModuleNotFoundError” hatasının nedenlerini ve adım adım çözümünü öğren. Weston üzerinde sorunsuz çalıştır! ⚡
Template: article

---

## Giriş

Waydroid, Android uygulamalarını Linux üzerinde çalıştırmayı sağlayan harika bir araç.
Ancak Weston masaüstü ortamında kurulum yaparken birçok kullanıcı, **Python “ModuleNotFoundError” hatasıyla** karşılaşıyor.
Bu rehberde, özellikle **pyenv** kullanan sistemlerde bu hatanın nedenlerini ve çözümünü adım adım anlatacağım.

Bu hata genellikle şu şekilde ortaya çıkar:

- `ModuleNotFoundError: No module named 'gbinder'`
- `ModuleNotFoundError: No module named 'tools'`

Eğer sen de bu hatalardan birini aldıysan, doğru yerdesin 💡
Şimdi sorunun kaynağını ve nasıl çözüleceğini birlikte görelim.

---

## Karşılaşılan Hatalar

### Hata 1: `ModuleNotFoundError: No module named 'gbinder'`

Waydroid oturumunu başlatmaya çalıştığında şu hata karşına çıkabilir:

```bash
$ waydroid session start
Traceback (most recent call last):
  File "/usr/bin/waydroid", line 7, in <module>
    import tools
  File "/usr/lib/waydroid/tools/__init__.py", line 12, in <module>
    from . import actions
  ...
  File "/usr/lib/waydroid/tools/interfaces/IPlatform.py", line 1, in <module>
    import gbinder
ModuleNotFoundError: No module named 'gbinder'
```

### Hata 2: `ModuleNotFoundError: No module named 'tools'`

İlk hatayı çözdükten sonra, bazen ikinci bir hata karşına çıkar:

```bash
$ waydroid session start
Traceback (most recent call last):
  File "/usr/bin/waydroid", line 7, in <module>
    import tools
ModuleNotFoundError: No module named 'tools'
```

Bu iki hata, sistemdeki Python yorumlayıcısı ve Waydroid’in çalışma ortamı arasındaki uyumsuzluktan kaynaklanır.

---

## Sorunun Kök Nedeni

Bu hataların temel nedenleri şunlardır:

1. **Pyenv PATH önceliği:**
   `/usr/bin/python3` symlink’i, pyenv’in kendi Python sürümüne yönlenmiş olabilir.

2. **Yanlış Shebang:**
   Waydroid script’i `#!/usr/bin/env python3` satırını kullanır.
   Bu satır, PATH’teki ilk Python yorumlayıcısını çağırır — bu da genellikle pyenv sürümüdür.

3. **Eksik modül yolu:**
   Waydroid’in kendi modül dizini (`/usr/lib/waydroid`) Python path’ine dahil değildir.

!!! note "Bu hatalar genellikle pyenv ile sistem Python'unun çakışmasından kaynaklanır ⚡"

---

## Adım Adım Çözüm

### 1. Hangi Python’un Kullanıldığını Kontrol Et

Öncelikle sistemde hangi Python yorumlayıcısının çalıştığını kontrol edelim:

```bash
which python3
# Örnek çıktı: /home/kullanici/.pyenv/shims/python3
```

Sistem Python’unun nerede olduğunu görmek için:

```bash
ls -la /usr/bin/python3*
```

Burada gerçek sistem Python’unu (örneğin `python3.13`) göreceksin.

!!! tip "Pyenv, PATH sırasını değiştirerek sistem Python’unu gölgeler. Bu yüzden doğru yorumlayıcıyı tespit etmek çok önemlidir 💡"

---

### 2. Gerekli Paketleri Kontrol Et

Waydroid için gereken Python modüllerinin yüklü olduğundan emin ol:

```bash
pacman -Qs gbinder
```

Aşağıdaki paketlerin kurulu olması gerekir:

- `libgbinder`
- `python-gbinder`

Eksikse şu komutla kurabilirsin:

```bash
sudo pacman -S libgbinder python-gbinder
```

---

### 3. Python Symlink’ini Düzelt

Eğer `/usr/bin/python3` yanlış bir sürüme işaret ediyorsa, doğru sürüme yönlendirmelisin:

```bash
sudo rm /usr/bin/python3
sudo ln -sf python3.13 /usr/bin/python3
```

!!! warning "Bu işlem sistem genelini etkiler ⚠️ Yanlış Python sürümüne bağlamak diğer uygulamalarda hataya yol açabilir."

Doğrulamak için:

```bash
/usr/bin/python3 -c "import gbinder; print('✓ gbinder çalışıyor')"
```

---

### 4. Waydroid Script’ini Düzenle

Waydroid’in script dosyasını aç:

```bash
sudo nano /usr/bin/waydroid
```

Dosyayı aşağıdaki gibi düzenle:

```python
#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
import os
import sys

# Add waydroid library path
sys.path.insert(0, "/usr/lib/waydroid")

import tools

if __name__ == "__main__":
    os.umask(0o0022)
    sys.exit(tools.main())
```

!!! tip "Buradaki iki değişiklik çok kritik 💡 1️⃣ Shebang satırı `/usr/bin/python3` olarak düzeltildi. 2️⃣ `/usr/lib/waydroid` yolu Python path’ine eklendi."

---

### 5. Waydroid’i Test Et

Düzenlemelerden sonra Waydroid’in çalıştığını kontrol et:

```bash
waydroid status
```

Örnek çıktı:

```
Session:	STOPPED
Vendor type:	MAINLINE
```

Her şey yolundaysa artık hatalardan kurtuldun 🎉

---

## Weston Ortamında Waydroid Kullanımı

Weston masaüstünde Waydroid’i başlatmak için:

```bash
waydroid session start
waydroid show-full-ui
```

Ya da kısayol olarak:

```bash
waydroid first-launch
```

### Uygulama Başlatma

```bash
waydroid app list
waydroid app launch com.android.settings
```

### Waydroid’i Durdurma

```bash
waydroid session stop
```

!!! note "Waydroid’i kapatmadan önce oturumu düzgün sonlandırmak, sistem kaynaklarının serbest kalmasını sağlar ⚙️"

---

## Alternatif Yöntem: PATH Üzerinden Çözüm

Eğer symlink değiştirmek istemiyorsan, pyenv’i geçici olarak devre dışı bırakabilirsin:

```bash
env PATH="/usr/local/sbin:/usr/local/bin:/usr/bin" waydroid session start
```

!!! tip "Bu yöntemle pyenv geçici olarak devre dışı kalır ve sistem Python’u kullanılır 💡"

---

## Ek Sorun Giderme

### gbinder hâlâ bulunamıyor

```bash
pacman -Ql python-gbinder | grep -E "\.so$"
```

Eğer çıktı boşsa, modül doğru dizinde kurulmamış olabilir. Yeniden yüklemeyi dene.

### Pyenv Çakışmasını Kalıcı Çözme

```bash
echo 'alias waydroid="env PATH=\"/usr/local/sbin:/usr/local/bin:/usr/bin\" waydroid"' >> ~/.bashrc
source ~/.bashrc
```

!!! tip "Bu alias sayesinde Waydroid her zaman sistem Python’unu kullanır 💪"

---

## Sonuç

Bu rehberde Weston masaüstü ortamında Waydroid kurarken karşılaşılan
**ModuleNotFoundError: No module named 'gbinder' / 'tools'** hatalarının nedenlerini ve çözümlerini inceledik.

Sorunu çözmek için:

1. Doğru Python yorumlayıcısını belirledik
2. Waydroid script’ini düzenledik
3. PATH manipülasyonu ile alternatif çözüm sunduk

Bu adımların ardından Waydroid’i sorunsuz şekilde çalıştırabilirsin 🚀
Linux üzerinde Android deneyimin keyfini çıkar! 🎯

---

## Kaynaklar

- [Waydroid Documentation](https://docs.waydro.id/)
- [Arch Linux Wiki - Waydroid](https://wiki.archlinux.org/title/Waydroid)
- [Python Docs - ModuleNotFoundError](https://docs.python.org/3/library/exceptions.html#ModuleNotFoundError)

---
