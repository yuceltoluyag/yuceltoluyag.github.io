Title: Ollama and WebUI Installation on Arch Linux (Docker)
Date: 2025-08-07 05:10
Modified: 2025-08-11 22:59
Category: Sunucu
Tags: arch linux, docker, ollama, webui, yapay zeka, gpu, rocm, cuda, websocket, watchtower
Slug: arch-linux-ollama-webui-kurulumu-docker
Authors: yuceltoluyag
Status: published
Summary: A comprehensive guide explaining step-by-step Ollama and WebUI installation using Docker on Arch Linux, including GPU acceleration, single container bundle options, and automatic updates.
Template: article
Image: images/arch-linux-ollama-webui-kurulumu-docker-xl.webp
Series: Docker
Series_index: 2
Lang: en

## Ollama and WebUI Installation on Arch Linux (with Docker) 🤖

**Ollama** is a modern platform that allows you to manage large language models (LLM) running locally.
**Open WebUI** provides a visual interface to easily use these models through your browser.
In this article, you will learn step-by-step **Ollama and Open WebUI installation using Docker on Arch Linux**, including all methods including GPU acceleration, single container bundle installation, and automatic updates.

> 💡 If Docker is not installed on your system, first check our [Docker Installation on Arch Linux](/arch-linux-docker-kurulumu) guide.

---

## 🔑 WebSocket Support

**WebSocket connection support is required** for Open WebUI to function properly.
Make sure your network configuration does not block WebSocket connections.

---

## 1️⃣ Installation Prerequisites

- **Arch Linux** (up-to-date)
- **Docker** installed and running
- Internet connection
- Minimum **8 GB RAM** (16 GB+ recommended for larger models)
- **Ollama application**:

  - If Ollama is **not installed on your system**, install it with the following command:

  ```bash
    yay -Syyu ollama
  ```

  - If you want to run Ollama inside Docker as well, see the **single container bundle installation** section.

---

## 2️⃣ Scenario 1: Ollama Installed on Computer + WebUI via Docker

In this scenario, Ollama is installed on your computer, and WebUI runs inside Docker.

### CPU Installation

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

### Installation with NVIDIA GPU Support

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

## 3️⃣ Scenario 2: Ollama + WebUI Single Container (Bundle Installation)

With this method, both **Ollama and Open WebUI are installed with a single command**.

### GPU Supported Installation

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

### CPU Installation

```bash
docker run -d \
  -p 3000:8080 \
  -v ollama:/root/.ollama \
  -v open-webui:/app/backend/data \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:ollama
```

> ✅ This method runs both applications at once without **dependency and configuration concerns**.

---

## 4️⃣ NVIDIA GPU Support (Detailed)

To achieve high performance with NVIDIA GPU:

```bash
sudo pacman -S nvidia nvidia-utils nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

To test the installation:

```bash
nvidia-smi
```

---

## 5️⃣ AMD GPU (ROCm) Support

AMD GPU users can enable acceleration with ROCm:

```bash
sudo pacman -S rocm-opencl-runtime rocm-hip-runtime
```

When running Docker:

```bash
--device=/dev/kfd --device=/dev/dri
```

add these parameters.

---

## 6️⃣ Accessing WebUI

After installation, access from your browser:

```
http://localhost:3000
```

You will be asked to create a user account on first startup.

---

## 7️⃣ Updates

### Manual Update

```bash
docker run --rm \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --run-once open-webui
```

### Automatic Update (Every 5 Minutes)

```bash
docker run -d \
  --name watchtower \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower \
  --interval 300 open-webui
```

> 🔧 Note: Write your own container name instead of `open-webui`.

---

## 8️⃣ Common Issues

- **WebUI cannot connect to Ollama:**
  Use the single container bundle or don't forget the `--add-host` parameter in host connection.
- **Slow model download:**
  Depends on your internet speed. You can copy previously downloaded models into the `ollama-data` volume.
- **Port conflict:**
  Change ports like `-p 3000:8080`.

---

## 🔚 Conclusion

In this guide, you learned:

- Ollama and Open WebUI installation on Arch Linux
- CPU, GPU, and single container bundle scenarios
- Update methods
- WebSocket requirements

💬 **Which installation method did you prefer?** Share your experiences!

---

[responsive_img src="/images/arch-linux-ollama-webui-kurulumu-docker-xl.webp" alt="rch-linux-ollama-webui-kurulumu-docker" /]
