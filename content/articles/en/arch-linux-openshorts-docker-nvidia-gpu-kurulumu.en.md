Title: Installing OpenShorts on Arch Linux with Docker and an NVIDIA GPU
Date: 2026-11-13 23:23
Category: Linux
Tags: Arch Linux, OpenShorts, Docker, Docker Compose, NVIDIA, CUDA, Whisper, Gemini API, Video Düzenleme
Slug: arch-linux-openshorts-docker-nvidia-gpu-kurulumu
Authors: yuceltoluyag
Summary: I explain how I installed OpenShorts on Arch Linux with Docker Compose and an NVIDIA GPU, including the storage, model cache, Whisper, Gemini, and file permission issues I encountered, with real terminal output.
Template: article
Lang: en
Status: published

I wanted to try OpenShorts to turn long screen recordings, tutorial videos, and spoken content into short videos. In my use case, the terminal, application windows, and narration in the source video are especially important. Following a face and cropping the footage vertically is not enough; the on-screen content also needs to remain as readable as possible.

I found that getting OpenShorts running on Arch Linux with Docker involved more than just running `docker compose up`. I had to work through several areas, including the NVIDIA Container Toolkit, GPU access, ownership of directories mounted by Docker, and the YOLO and Whisper model caches.

This is not a general product review covering every OpenShorts feature. It documents the installation I performed on my own Arch Linux system, the errors I encountered, and the results I was actually able to verify.

I also published a short video summary of the process on YouTube:

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube
    videoid="jdHJ-d-esx8"
    title="Installing OpenShorts: Arch Linux + Docker + NVIDIA GPU">
</lite-youtube>

## My system

I performed the installation in the following hardware and software environment:

| Component | Value |
|---|---|
| Distribution | Arch Linux |
| Kernel | `7.2.15-zen1-1-zen` |
| Processor | Intel Core i5-13400F |
| Graphics card | Palit GeForce RTX 4060 Ti JetStream 16 GB |
| RAM | 16 GB DDR5 |
| NVIDIA driver | `615.78.08` |
| NVIDIA Container Toolkit | `1.20.1-1` |
| Docker Compose | `5.7.0` |
| OpenShorts | Commit `2e56378e27f45ea29a1d092eb7422f2ac3f89557` |

I cloned and tested the OpenShorts repository at this commit. Files, defaults, and installation steps may change as the project develops. Therefore, the configuration below applies specifically to the commit I mention and my local disk layout.

- [OpenShorts repository – commit I used](https://github.com/mutonby/openshorts/tree/2e56378e27f45ea29a1d092eb7422f2ac3f89557){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts README – same commit](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/README.md){: target="_blank" rel="noopener noreferrer"}

## What does OpenShorts do, and which parts run locally?

OpenShorts' Clip Generator is designed to create vertical short clips from long videos. It selects interesting moments from a transcript, then reframes the video to a 9:16 format, adds subtitles, and can optionally place a short hook title over the video.

There is an important distinction here: the entire processing pipeline does not run locally. For the spoken-video workflow I used, I performed transcription locally with `faster-whisper`. Clip selection, however, sends the transcript to the Gemini API. This means you need a Gemini API key and an internet connection. The project also offers the option of using a local LLM for text-based clip selection, but I did not test that alternative in my setup.

Since I work with Turkish content, I selected Whisper directly for transcription. The Parakeet configuration in this commit includes 25 European languages, and Turkish is not among them. The code can fall back to Whisper if it detects an unsupported language; even so, for Turkish videos I set `TRANSCRIBE_BACKEND=whisper` rather than starting with Parakeet and waiting for it to fall back.

Source: [OpenShorts transcription backends](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/transcribe_backends.py){: target="_blank" rel="noopener noreferrer"}

## 1. Install the NVIDIA Container Toolkit on Arch Linux

First, I checked that the NVIDIA driver was working on the host system with `nvidia-smi`. I installed the NVIDIA Container Toolkit so that Docker containers could use the graphics card:

```bash
sudo pacman -Syu nvidia-container-toolkit
```

After installation, I created Docker's NVIDIA runtime configuration:

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

The `nvidia-ctk runtime configure` command updates Docker's `/etc/docker/daemon.json` file so that it can use the NVIDIA Container Runtime. On my system, Docker's data directory had already been set to `/mnt/steam_depo/Docker/docker`. I kept that setting and did not remove the existing `data-root` value when adding the NVIDIA configuration.

!!! warning "Don't carelessly replace your existing daemon.json"
    If you have already configured `data-root`, a registry, or other runtime settings for Docker, do not replace the entire file with an example JSON file. Check its current contents first. The `nvidia-ctk runtime configure` command is used to add the NVIDIA runtime configuration to the existing Docker settings.

These steps follow the method in NVIDIA's Docker configuration guide. The `nvidia-container-toolkit` package is also available in the Arch Linux repository.

- [Arch Linux – nvidia-container-toolkit package](https://archlinux.org/packages/extra/x86_64/nvidia-container-toolkit/){: target="_blank" rel="noopener noreferrer"}
- [NVIDIA Container Toolkit – Docker configuration](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html){: target="_blank" rel="noopener noreferrer"}

## 2. Verify that Docker can see the GPU

Before installing OpenShorts, I tested GPU access with a small CUDA container:

```bash
docker run --rm --gpus all \
  nvidia/cuda:12.4.0-base-ubuntu22.04 \
  nvidia-smi
```

The command output showed the RTX 4060 Ti, NVIDIA driver `615.78.08`, and CUDA UMD `13.4`. This test confirmed that the GPU was accessible not only on the host system, but also from inside a container launched with `--gpus all`.

It is worth doing this check first. If you encounter a GPU access problem after building and running OpenShorts, it is much harder to tell whether the issue is in the Docker/NVIDIA layer or in the application's own configuration.

## 3. Clone the OpenShorts repository

I kept the project under my `Projects` directory:

```bash
mkdir -p ~/Projects
cd ~/Projects

git clone https://github.com/mutonby/openshorts.git
cd openshorts
```

To make the tests in this article reproducible on a specific version, I checked out the commit I used:

```bash
git checkout 2e56378e27f45ea29a1d092eb7422f2ac3f89557
```

The basic OpenShorts setup uses Docker Compose. For NVIDIA acceleration, I added the GPU build argument and GPU device reservation in a separate `docker-compose.override.yml` file.

## 4. Keep large files off the system drive

On my system, Docker's own data was already under `/mnt/steam_depo/Docker/docker`. I also collected OpenShorts uploads, generated clips, and model files in a separate directory tree on the same external drive:

```text
/mnt/steam_depo/OpenShorts/
├── uploads/
├── output/
└── models/
```

I created the directories:

```bash
sudo mkdir -p /mnt/steam_depo/OpenShorts/{uploads,output,models}
```

There is an important detail here. The OpenShorts container runs as a non-root user named `appuser`. In the commit I used, this user's UID and GID are `999`. I checked this inside the container:

```bash
docker compose exec -T backend id
```

Output:

```text
uid=999(appuser) gid=999(appuser) groups=999(appuser)
```

For this reason, I assigned ownership of the external directories OpenShorts writes to this UID/GID:

```bash
sudo chown 999:999 \
  /mnt/steam_depo/OpenShorts/uploads \
  /mnt/steam_depo/OpenShorts/output \
  /mnt/steam_depo/OpenShorts/models
```

I deliberately did not change ownership of the project directory and did not use `chmod 777`. I gave the `appuser` account access only to the data directories the container needs to write to.

## 5. Compose override for NVIDIA acceleration and persistent directories

Instead of changing the main `docker-compose.yml` file, I kept my local settings in `docker-compose.override.yml`. With the default file naming convention, Compose reads the override file together with the main configuration.

The relevant contents of the override file I used:

```yaml
services:
  backend:
    build:
      context: .
      args:
        GPU: "1"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu, video]
    environment:
      YOLO_MODEL_PATH: ${YOLO_MODEL_PATH}
      HF_HOME: /models/huggingface
      MPLCONFIGDIR: /models/matplotlib
      XDG_CACHE_HOME: /models/cache
    ports: !override
      - "127.0.0.1:8000:8000"
    volumes: !override
      - .:/app
      - /app/__pycache__
      - /mnt/steam_depo/OpenShorts/uploads:/app/uploads
      - /mnt/steam_depo/OpenShorts/output:/app/output
      - /mnt/steam_depo/OpenShorts/models:/models

  frontend:
    ports: !override
      - "127.0.0.1:5175:5173"

  renderer:
    ports: !override
      - "127.0.0.1:3100:3100"
    volumes: !override
      - /mnt/steam_depo/OpenShorts/output:/output
```

I made a few choices here:

- `GPU: "1"` builds the GPU-enabled image.
- With `capabilities: [gpu, video]`, GPU access is requested for CUDA operations, as well as NVENC access for video encoding.
- The `uploads`, `output`, and `models` directories are mounted from the external drive.
- I bound the frontend, backend, and renderer ports to `127.0.0.1`. This makes the services accessible from the local machine without exposing them directly to other devices on the network.
- I used `ports: !override` and `volumes: !override`. These replace the lists in the main Compose file entirely instead of merging them. The `!override` tag is supported in Docker Compose 2.24.4 and later; my installation had Compose `5.7.0`.

Source: [Docker Compose – merging files and `!override`](https://docs.docker.com/reference/compose-file/merge/){: target="_blank" rel="noopener noreferrer"}

## 6. Whisper and YOLO model paths

For Turkish videos, I used the following transcription settings in my `.env` file:

```ini
TRANSCRIBE_BACKEND=whisper
WHISPER_MODEL=large-v3-turbo
WHISPER_DEVICE=cuda
WHISPER_COMPUTE=float16
ASR_GPU_CONCURRENCY=1
YOLO_MODEL_PATH=/models/yolov8n.pt
```

I selected the `large-v3-turbo` model to run with CUDA and `float16`. I used the `ASR_GPU_CONCURRENCY=1` setting to limit the transcription side to one GPU job at a time.

I also set `YOLO_MODEL_PATH` for YOLO. In my first attempt, the model tried to create the `yolov8n.pt` file under `/app` by default. But because the project directory was mounted from the host at `/app`, the container's `appuser` could not write to that directory.

I moved the model to the writable and persistent `/models` directory. After the first successful download, `yolov8n.pt` appeared there with a size of about 6.3 MB.

## 7. Move the Hugging Face, Matplotlib, and Fontconfig caches

During my first transcription attempt, I saw that Whisper was trying to keep the Hugging Face cache at:

```text
/app/.cache/huggingface
```

However, because `/app` is the project directory, `appuser` could not create this folder. I moved the cache to the external drive by adding the `HF_HOME` variable to the Compose environment:

```yaml
environment:
  HF_HOME: /models/huggingface
```

After the initial download, this directory was about 1.6 GB. This kept the Whisper model in the persistent `models` area rather than in the project directory.

I also saw two more warnings during processing:

```text
mkdir -p failed for path /app/.config/matplotlib
Permission denied: '/app/.config'
```

and:

```text
Fontconfig error: No writable cache directories
```

I also set writable cache locations for Matplotlib and Fontconfig:

```yaml
environment:
  MPLCONFIGDIR: /models/matplotlib
  XDG_CACHE_HOME: /models/cache
```

The directories ended up like this:

```text
/mnt/steam_depo/OpenShorts/models/
├── yolov8n.pt
├── huggingface/
├── matplotlib/
└── cache/
    └── fontconfig/
```

I did not stop at adding these settings; I tested that Matplotlib could actually create files inside the container:

```bash
docker compose exec -T backend sh -c '
mkdir -p "$MPLCONFIGDIR" "$XDG_CACHE_HOME/fontconfig"

MPLBACKEND=Agg python - <<'"'"'PY'"'"'
import os
import matplotlib
import matplotlib.pyplot as plt

print("Matplotlib config:", matplotlib.get_configdir())
print("Matplotlib cache:", matplotlib.get_cachedir())

plt.plot([0, 1, 2], [0, 1, 4])
plt.savefig("/tmp/matplotlib-test.png")
print("Grafik oluşturuldu:", os.path.getsize("/tmp/matplotlib-test.png"), "bytes")
PY

fc-cache -f
'
```

In the test, Matplotlib's config and cache paths appeared as `/models/matplotlib`. The graph file was created with a size of 21,887 bytes. The `fc-cache -f` command also ran, and Fontconfig files were created under `/models/cache/fontconfig`.

Rather than merely silencing the `/app/.config` permission error temporarily, this moved both caches to a persistent, writable location.

## 8. Validate the Compose configuration and start the services

Before the first run, I checked the Compose files:

```bash
docker compose config --quiet
```

The command completed without an error. Then I built the GPU image and started the services:

```bash
docker compose up -d --build
```

On my system, the first Docker build took about `1425.8` seconds and completed all 34/34 steps. This time will vary depending on hardware, network speed, the Docker cache, and the dependencies being downloaded.

I opened the interface in a local browser at:

```text
http://127.0.0.1:5175
```

I entered the Gemini API key in the OpenShorts settings. Additional features, such as posting directly to social networks, may require separate service keys like Upload-Post; my focus here was video clip generation.

## 9. Verify the GPU and transcription

I had already verified GPU access inside Docker with the CUDA test container. In the OpenShorts backend, I checked for FFmpeg's NVENC encoders:

```bash
docker compose exec -T backend sh -c \
  'ffmpeg -hide_banner -encoders | grep -E "h264_nvenc|hevc_nvenc"'
```

I checked whether CTranslate2 could see the CUDA device:

```bash
docker compose exec -T backend python - <<'PY'
from dotenv import load_dotenv
load_dotenv("/app/.env")

import os
import ctranslate2
from subtitles import get_whisper_config

print(get_whisper_config())
print("TRANSCRIBE_BACKEND:", os.getenv("TRANSCRIBE_BACKEND"))
print("ASR_GPU_CONCURRENCY:", os.getenv("ASR_GPU_CONCURRENCY"))
print("CTranslate2 CUDA cihaz sayısı:", ctranslate2.get_cuda_device_count())
PY
```

The output showed this configuration:

```text
{'model_size': 'large-v3-turbo', 'device': 'cuda', 'compute_type': 'float16'}
TRANSCRIBE_BACKEND: whisper
ASR_GPU_CONCURRENCY: 1
CTranslate2 CUDA cihaz sayısı: 1
```

During the first video job, transcription progress was logged at `25%`, `50%`, `75%`, and `100%`. The completion line showed an elapsed time of 65 seconds. This is the result I saw for the video I used and the system load at the time, not a general speed guarantee for other videos.

## 10. First real output: six subtitled clips

In my first successful generation attempt, OpenShorts created six clips. The output folder contained:

- Six reframed MP4 files,
- Six MP4 files with subtitles rendered,
- Layout JSON files containing the clips' positioning information,
- A job metadata file,
- ASS files for subtitles.

The total size of the relevant job folder was about 76 MB.

In the GPU render log, I saw the following result:

```text
⚡ GPU render: 2891 frames in 9.7s
✅ Clip saved to ..._clip_6.mp4
⏱ Reframe v2 total: 56.1s
```

The `2891 frames in 9.7s` figure is for the render stage of a single clip. I do not consider it a benchmark that applies to all videos. Still, it was concrete output showing that NVENC was actually being used and that the clip rendering process was running on the GPU.

## Other issues I encountered during setup

### YOLO model could not be written to `/app`

During the first job, YOLO tried to download the model to the default `yolov8n.pt` path and a permission error occurred. The reason was that the project was bind-mounted as `.:/app` and the container's `appuser` could not write to the project directory on the host.

As a fix:

```ini
YOLO_MODEL_PATH=/models/yolov8n.pt
```

I used this setting and mounted `/mnt/steam_depo/OpenShorts/models` as `/models`. The model was downloaded to this location.

### Whisper model could not be written to the Hugging Face cache

The default Whisper cache was supposed to be created under `/app/.cache/huggingface`. Because `/app` was not writable, I set `HF_HOME` to `/models/huggingface`. After that, the model files were downloaded to the external drive and transcription reached 100 percent.

### Automatic hook image could not be created

The following error appeared while generating automatic hook titles for the first clips:

```text
Permission denied: 'temp_hook_....png'
```

When I inspected `hooks.py`, I saw that the temporary PNG was created using only its filename. Since the job process was running in the `/app` working directory, it was trying to write the file to the project directory.

In my local change to `hooks.py`, I derived the temporary image path from the folder containing the clip being processed:

```python
stem = os.path.splitext(os.path.basename(video_path))[0]
hook_dir = os.path.dirname(os.path.abspath(video_path))
hook_filename = os.path.join(
    hook_dir,
    f"temp_hook_{uuid.uuid4().hex[:8]}_{_truncate_bytes(stem, 80)}.png",
)
```

Then I checked the Python syntax:

```bash
python -m py_compile hooks.py
```

After the initial file path fix, I tried generating hooks again following our final adjustment. Temporary images are now created in the correct location, and hooks are added to the clips without issues. This resolved the `/app` write permission problem I encountered with hook generation in my first attempt.

This is a local source code fix. It has not automatically been added to the upstream file in the commit I used; if I clone the repository again or update the relevant file, I may need to apply my patch again.

### Gemini API 503 error

After transcription finished, OpenShorts moved on to Gemini for clip selection. In the first attempt, it created 62 scoring windows. Another attempt created 110 windows, but Gemini returned:

```text
503 UNAVAILABLE
This model is currently experiencing high demand.
```

OpenShorts retried several times; after the retries were exhausted, clip selection failed for that job.

I did not have `GEMINI_MODEL` defined in my `.env` file. In this commit, the code's default is `gemini-3.1-flash-lite`, and I saw this model in the job log as well.

At that time, the instantaneous values I saw on the Google AI Studio usage page were:

| Limit | Usage / limit |
|---|---:|
| RPM | 4 / 15 |
| TPM | 12.27K / 250K |
| RPD | 11 / 500 |

This snapshot showed that the request and token limits displayed at the time of the check had not been reached. In my subsequent attempts and observations, I also found that the 503 error came from temporary load on the Gemini API side, not from the OpenShorts configuration or the local GPU/Whisper setup. Google's error documentation associates `503 UNAVAILABLE` with the service being temporarily overloaded or unavailable, and `429` with exceeding request, token, or daily quota limits. These two responses should not be confused.

- [Gemini API error codes](https://ai.google.dev/gemini-api/docs/api-errors){: target="_blank" rel="noopener noreferrer"}
- [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits){: target="_blank" rel="noopener noreferrer"}

For this kind of error, it is better to first check the project and usage pages in AI Studio, then retry the job when service-side demand has decreased. In my setup, this was not a persistent OpenShorts failure; the workflow, including clip selection, is now working normally. `503` and `429` do not mean the same thing.

## Improvements I would like to make in the future

The installation and current video generation workflow now work as I want. My next plan is not just to use OpenShorts, but to add some features I need to the project. These are not completed features yet; they are development items I would like to tackle later:

- **Custom font loading:** I want to be able to use my own font files for subtitles and on-screen text. That way, I can customize the visual style instead of being limited to the same small set of fonts in every project.
- **Project history:** A persistent project history/archive area where I can reopen and view previous work in the interface is missing. Seeing only the latest project for seven days is not enough to return to projects I worked on earlier. The missing feature I mean here is the ability to view past projects from the interface; it does not mean that files are automatically deleted from disk.
- **Voice Studio integration for dubbing:** The current dubbing workflow depends on the ElevenLabs API. In the future, I want to combine it with the Voice Studio I use to add an alternative voice generation/dubbing path.

I do not plan to do all of these at once. First, I will continue using the current workflow and determine which improvements are actually necessary; then I will address the ones I consider appropriate in stages.

## Conclusion

The upload flow in this commit of OpenShorts also has a file size limit: the `MAX_FILE_SIZE_MB` value in `app.py` is 2048 MB. This value is defined in the source code, not as an environment variable. For long, high-bitrate screen recordings, check the file size before uploading.

With content such as screen recordings and narrated terminal demos, another point is not to judge the result only by whether files were generated. You also need to visually check whether the clips are actually readable, especially how much space terminal text takes up in a vertical frame. What I verified here was that the production pipeline worked and the files were created; I did not include a separate visual quality review of every clip's on-screen text readability in this installation report.

I got OpenShorts running on Arch Linux with Docker Compose and NVIDIA GPU support. The NVIDIA Container Toolkit made the RTX 4060 Ti visible inside the container; `h264_nvenc` was available in FFmpeg, and I got GPU render logs during actual generation.

Whisper transcription completed, Gemini selected clips, and subtitled clips were generated from the video. After the final hook fix, automatic hook images are also created and added to clips without issues. The most time-consuming part of setup was not Docker itself, but the cache and temporary file paths that the non-root `appuser` could not write to because of the `/app` bind mount. I resolved these issues by setting suitable write locations for YOLO, Hugging Face, Matplotlib, Fontconfig, and hook files.

The `503 UNAVAILABLE` response I saw on the Gemini side came from temporary API load; it was not a quota overage or a local installation error. The project is now working reliably in my use, including hook generation and clip selection.

The most important result for me was not simply getting OpenShorts to launch, but having a local workflow that works as I want: the source code stays in the project directory, while uploads, outputs, and large model caches are stored on a separate drive, with GPU acceleration verified. The next step is no longer fixing installation problems, but developing features I find missing, such as custom fonts, project history, and Voice Studio integration.

---

## Resources

- [OpenShorts – README for the commit I used](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/README.md){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts – Dockerfile](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/Dockerfile){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts – transcribe_backends.py](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/transcribe_backends.py){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts – main.py](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/main.py){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts – hooks.py](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/hooks.py){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts – app.py](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/app.py){: target="_blank" rel="noopener noreferrer"}
- [Arch Linux – nvidia-container-toolkit](https://archlinux.org/packages/extra/x86_64/nvidia-container-toolkit/){: target="_blank" rel="noopener noreferrer"}
- [NVIDIA Container Toolkit – Installation Guide](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html){: target="_blank" rel="noopener noreferrer"}
- [Docker Compose – Merge](https://docs.docker.com/reference/compose-file/merge/){: target="_blank" rel="noopener noreferrer"}
- [Gemini API – API Errors](https://ai.google.dev/gemini-api/docs/api-errors){: target="_blank" rel="noopener noreferrer"}
- [Gemini API – Rate Limits](https://ai.google.dev/gemini-api/docs/rate-limits){: target="_blank" rel="noopener noreferrer"}
