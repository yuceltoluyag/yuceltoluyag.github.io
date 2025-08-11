Title: Pyenv ile Arch Linux AUR Paketlerinde Python Modül Hataları ve Çözümleri  
Date: 2025-08-04 12:00  
Modified: 2025-08-11 22:48
Category: Sorun Giderme  
Tags: pyenv, arch-linux, aur, python, python-modülleri, hata-çözümü  
Slug: pyenv-arch-linux-aur-python-modul-hatalari-cozumleri  
Authors: yuceltoluyag  
Status: published  
Summary: Arch Linux’ta pyenv kullandığınızda AUR paketleri derlerken karşılaşılan Python modül hatalarını ve çözümlerini adım adım anlatıyoruz.  
Template: article
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114989740616828598


Python geliştirme ortamlarını kolaylaştıran **pyenv**, Arch Linux üzerinde AUR paketlerini kurarken bazı sorunlara yol açabiliyor. Özellikle `pyenv global` komutuyla sistem Python sürümünü değiştirdiğinizde, AUR’dan yüklemeye çalıştığınız Python paketlerinde eksik modül hataları almanız olasıdır.  

Peki bu hatalar neden ortaya çıkıyor? Ve nasıl hızlıca çözebilirsiniz? Gelin, pyenv ile AUR paketleri kurarken çıkan bu yaygın Python modül sorunlarını birlikte inceleyelim.

---

## ⚠️ Sorunun Kaynağı: Pyenv ve Sistem Python Çakışması

`yay` veya `paru` gibi AUR yardımcıları paket derlerken sistemde yüklü Python ortamını kullanır. Ancak:

- `pyenv global 3.11.x` gibi bir komutla Python sürümünü değiştirdiğinizde,
- Sistem Python ortamı devre dışı kalır,
- Paketlerin derlenmesi için gerekli bazı modüller (örneğin `build`, `installer`, `setuptools-scm`) pyenv’in aktif sürümünde olmayabilir.

Bunun sonucunda `build()`, `package()` aşamalarında eksik modül uyarıları ile karşılaşırsınız.

---

## 💥 En Yaygın Hatalar ve Çözüm Önerileri

### 🔹 Hata 1: `No module named build`

```bash
/home/user/.pyenv/versions/3.11.12/bin/python: No module named build
==> ERROR: A failure occurred in build().
```

**Çözüm:**
Eksik modülü yüklemek için terminalde şu komutu çalıştırın:

```bash
pip install build
```

---

### 🔹 Hata 2: `Missing dependencies: setuptools-scm`

```bash
ERROR Missing dependencies:
    setuptools-scm
```

**Çözüm:**
Gerekli modülü yükleyin:

```bash
pip install setuptools-scm
```

---

### 🔹 Hata 3: `No module named installer`

```bash
/home/user/.pyenv/versions/3.11.12/bin/python: No module named installer
==> ERROR: A failure occurred in package().
```

**Çözüm:**
Eksik olan `installer` modülünü kurun:

```bash
pip install installer
```

---

## 🧰 Tüm Gerekli Modülleri Birden Kurmak

Aşağıdaki komut, AUR’dan Python paketi kurarken ihtiyaç duyulan tüm temel paketleri hızlıca yükler:

```bash
pip install --upgrade build setuptools wheel setuptools-scm installer
```

---

## 🛠️ Alternatif Çözüm: Sistem Python’a Geçici Dönüş

Eğer pyenv’in değiştirdiği Python sürümü sorun çıkarıyorsa, AUR paketlerini derlerken geçici olarak sistem Python sürümünü kullanabilirsiniz:

```bash
PYENV_VERSION=system yay -S paket-adi
```

Bu sayede pyenv ayarları geçici olarak devre dışı kalır ve sistemde yüklü Python ortamı kullanılır.

---

## 🎯 Sonuç: Pyenv ve AUR Paket Kurulumunda Dikkat Edilmesi Gerekenler

`pyenv` ile Python sürümlerini yönetmek geliştirme için mükemmel olsa da, Arch Linux’ta AUR paket yöneticileri sistem Python ortamını beklediği için modül eksikliği hataları yaşanabilir.

Bu problemleri aşmak için:

* **Gerekli Python modüllerini pyenv aktif sürümünde kurmak**
* **Gerekirse AUR paketlerini sistem Python ile derlemek**

işe yarayacaktır. Böylece sorunsuz ve hızlı bir kurulum deneyimi elde edersiniz. 😊

---

## 📋 Özet: Gerekli Python Modüller

| Modül            | Açıklama                         |
| ---------------- | -------------------------------- |
| `build`          | Paketlerin derlenmesi için       |
| `setuptools`     | Paket yapılandırma işlemleri     |
| `wheel`          | `.whl` formatı ile paket üretimi |
| `setuptools-scm` | Versiyon bilgisi yönetimi        |
| `installer`      | Derlenen paketin kurulumu        |

---

Pyenv ile Python sürüm yönetiminde karşılaştığınız sorunları ve çözümlerini öğrendiniz. Siz de deneyimlerinizi ve sorularınızı yorumlarda paylaşabilirsiniz! 🚀

---


