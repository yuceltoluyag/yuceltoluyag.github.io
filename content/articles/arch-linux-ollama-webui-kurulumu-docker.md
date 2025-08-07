Title: Arch Linux'ta Ollama ve WebUI Kurulumu
Date: 2025-08-07 05:10
Modified: 2025-08-06 16:05
Category: Sunucu
Tags: arch linux, docker, ollama, webui, yapay zeka, gpu, rocm, cuda, websocket, watchtower
Slug: arch-linux-ollama-webui-kurulumu-docker
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Docker kullanarak Ollama ve WebUI kurulumunu, GPU hızlandırma, tek container bundle seçenekleri ve otomatik güncellemeler dahil adım adım anlatan kapsamlı rehber.
Template: article
Image: images/arch-linux-ollama-webui-kurulumu-docker-lg.webp


# Arch Linux'ta Ollama ve WebUI Kurulumu (Docker ile) 🤖

**Ollama**, yerel olarak çalışan büyük dil modellerini (LLM) yönetmenizi sağlayan modern bir platformdur.
**Open WebUI** ise bu modelleri tarayıcı üzerinden kolayca kullanabilmeniz için görsel bir arayüz sunar.
Bu yazıda, **Arch Linux’ta Docker kullanarak Ollama ve Open WebUI kurulumunu**, GPU hızlandırma, tek container bundle kurulum ve otomatik güncellemeler dahil olmak üzere tüm yöntemleri adım adım öğreneceksiniz.

> 💡 Eğer sisteminizde Docker kurulu değilse önce [Arch Linux’ta Docker Kurulumu](/arch-linux-docker-kurulumu) rehberimize göz atın.

---

## 🔑 WebSocket Desteği

Open WebUI’nin çalışabilmesi için **WebSocket bağlantı desteği gereklidir**.
Ağ yapılandırmanızın WebSocket bağlantılarını engellemediğinden emin olun.

---

## 1️⃣ Kurulum Ön Koşulları

* **Arch Linux** (güncel)
* **Docker** kurulu ve çalışır durumda
* İnternet bağlantısı
* Minimum **8 GB RAM** (daha büyük modeller için 16 GB+ önerilir)
* **Ollama uygulaması**:

  * Eğer Ollama **sisteminizde yüklü** değilse şu komutla yükleyin:

    ```bash
    yay -Syyu ollama
    ```
  * Eğer Ollama’yı da Docker içinde çalıştırmak istiyorsanız, **tek container bundle kurulum** bölümüne bakın.

---

## 2️⃣ Senaryo 1: Bilgisayarda Ollama Yüklü + WebUI Docker Üzerinden

Bu senaryoda Ollama bilgisayarınıza kurulu olur, WebUI ise Docker içinde çalışır.

### CPU Kurulumu

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

### NVIDIA GPU Desteği ile Kurulum

```bash
docker run -d \
  -p 3000:8080 \
  --gpus all \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:cuda
```

---

## 3️⃣ Senaryo 2: Ollama + WebUI Tek Container (Bundle Kurulum)

Bu yöntemle **tek komutla** hem Ollama hem Open WebUI kurulmuş olur.

### GPU Destekli Kurulum

```bash
docker run -d \
  -p 3000:8080 \
  --gpus=all \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

### CPU ile Kurulum

```bash
docker run -d \
  -p 3000:8080 \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

> ✅ Bu yöntem, **bağımlılık ve yapılandırma derdi olmadan** her iki uygulamayı da tek seferde çalıştırır.

---

## 4️⃣ NVIDIA GPU Desteği (Detaylı)

NVIDIA GPU ile yüksek performans almak için:

```bash
sudo pacman -S nvidia nvidia-utils nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

Kurulumu test etmek için:

```bash
nvidia-smi
```

---

## 5️⃣ AMD GPU (ROCm) Desteği

AMD GPU kullanıcıları ROCm ile hızlandırma sağlayabilir:

```bash
sudo pacman -S rocm-opencl-runtime rocm-hip-runtime
```

Docker çalıştırırken:

```bash
--device=/dev/kfd --device=/dev/dri
```

parametrelerini ekleyin.

---

## 6️⃣ WebUI’ye Erişim

Kurulum tamamlandığında tarayıcıdan:

```
http://localhost:3000
```

adresine giderek giriş yapabilirsiniz.
İlk açılışta kullanıcı hesabı oluşturmanız istenir.

---

## 7️⃣ Güncellemeler

### Manuel Güncelleme

```bash
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --run-once open-webui
```

### Otomatik Güncelleme (Her 5 Dakikada Bir)

```bash
docker run -d \
  --name watchtower \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 300 open-webui
```

> 🔧 Not: `open-webui` yerine kendi container adınızı yazın.

---

## 8️⃣ Yaygın Sorunlar

* **WebUI Ollama’ya bağlanamıyor:**
  Tek container bundle kullanın veya host bağlantısında `--add-host` parametresini unutmayın.
* **Model indirme yavaş:**
  İnternet hızınıza bağlı. Önceden indirilmiş modelleri `ollama-data` volume içine kopyalayabilirsiniz.
* **Port çakışması:**
  `-p 3000:8080` gibi portları değiştirin.

---

## 🔚 Sonuç

Bu rehberde:

* Arch Linux’ta Ollama ve Open WebUI kurulumunu
* CPU, GPU ve tek container bundle senaryolarını
* Güncelleme yöntemlerini
* WebSocket gereksinimini

öğrendiniz.

💬 **Siz hangi kurulum yöntemini tercih ettiniz?** Deneyimlerinizi paylaşın!

---

[responsive_img src="/images/arch-linux-ollama-webui-kurulumu-docker-lg.webp" alt="rch-linux-ollama-webui-kurulumu-docker" /]
