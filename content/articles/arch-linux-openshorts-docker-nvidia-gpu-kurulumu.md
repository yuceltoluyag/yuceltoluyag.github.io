Title: Arch Linux'ta OpenShorts Kurulumu: Docker ve NVIDIA GPU
Date: 2026-11-13 23:23
Category: Linux
Tags: Arch Linux, OpenShorts, Docker, Docker Compose, NVIDIA, CUDA, Whisper, Gemini API, Video Düzenleme
Slug: arch-linux-openshorts-docker-nvidia-gpu-kurulumu
Authors: yuceltoluyag
Summary: OpenShorts'u Arch Linux üzerinde Docker Compose ve NVIDIA GPU ile kurarken yaşadığım depolama, model önbelleği, Whisper, Gemini ve dosya izin sorunlarını gerçek terminal çıktılarıyla anlatıyorum.
Template: article
Lang: tr
Translation: false
Status: published


Uzun ekran kayıtlarından, eğitim videolarından ve konuşmalı içeriklerden kısa videolar çıkarmak için OpenShorts'u denemek istedim. Özellikle benim kullanımımda kaynak videonun içindeki terminal, uygulama pencereleri ve anlatım önemli. Yalnızca yüzü takip edip görüntüyü dikey kırpmak yeterli değil; ekrandaki içeriğin de mümkün olduğunca okunabilir kalması gerekiyor.

OpenShorts'u Arch Linux üzerinde Docker ile ayağa kaldırırken işin yalnızca `docker compose up` komutundan ibaret olmadığını gördüm. NVIDIA Container Toolkit, GPU erişimi, Docker'ın bağladığı dizinlerin sahipliği, YOLO ve Whisper model önbellekleri derken birkaç ayrı noktaya müdahale ettim.

Bu yazı, OpenShorts'un bütün özelliklerini anlatan genel bir ürün incelemesi değil. Kendi Arch Linux sistemimde yaptığım kurulumu, karşılaştığım hataları ve gerçekten doğrulayabildiğim sonuçları kayda geçiriyorum.

Sürecinin kısa bir video özetini de YouTube'da yayınladım:

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube
    videoid="jdHJ-d-esx8"
    title="OpenShorts Kurulumu: Arch Linux + Docker + NVIDIA GPU">
</lite-youtube>

## Kullandığım sistem

Kurulumu şu donanım ve yazılım ortamında yaptım:

| Bileşen | Değer |
|---|---|
| Dağıtım | Arch Linux |
| Kernel | `7.2.15-zen1-1-zen` |
| İşlemci | Intel Core i5-13400F |
| Ekran kartı | Palit GeForce RTX 4060 Ti JetStream 16 GB |
| RAM | 16 GB DDR5 |
| NVIDIA sürücüsü | `615.78.08` |
| NVIDIA Container Toolkit | `1.20.1-1` |
| Docker Compose | `5.7.0` |
| OpenShorts | `2e56378e27f45ea29a1d092eb7422f2ac3f89557` commit'i |

OpenShorts deposunu bu commit'te klonlayıp denedim. Proje geliştikçe dosyalar, varsayılanlar ve kurulum adımları değişebilir. Bu nedenle aşağıdaki yapılandırma, özellikle belirttiğim commit ve benim yerel disk düzenim için geçerlidir.

- [OpenShorts deposu – kullandığım commit](https://github.com/mutonby/openshorts/tree/2e56378e27f45ea29a1d092eb7422f2ac3f89557){: target="_blank" rel="noopener noreferrer"}
- [OpenShorts README – aynı commit](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/README.md){: target="_blank" rel="noopener noreferrer"}

## OpenShorts ne yapıyor, hangi kısımlar yerel çalışıyor?

OpenShorts'un Clip Generator bölümü uzun videolardan dikey kısa klipler çıkarmak için tasarlanmış. Transkript üzerinden ilgi çekici anları seçiyor; ardından videoyu 9:16 biçiminde yeniden çerçeveliyor, altyazı ekliyor ve istenirse videonun üzerine kısa bir hook başlığı yerleştiriyor.

Burada önemli bir ayrım var: İşleme zincirinin tamamı yerel değil. Benim kullandığım konuşmalı video akışında transkripsiyonu `faster-whisper` ile yerelde yaptım. Klip seçimi içinse transkript Gemini API'ye gönderiliyor. Dolayısıyla Gemini API anahtarı ve internet bağlantısı gerekiyor. Proje, metin tabanlı klip seçimi için yerel LLM kullanma seçeneği de sunuyor; ancak bu alternatifi kendi kurulumumda test etmedim.

Türkçe içerik kullandığım için transkripsiyon tarafında doğrudan Whisper'ı seçtim. Bu commit'teki Parakeet yapılandırması 25 Avrupa dili içeriyor ve Türkçe bu listenin içinde değil. Kod, desteklenmeyen dil tespit edilirse Whisper'a geri dönebiliyor; yine de Türkçe videolarda Parakeet'i önce başlatıp sonra geri düşmesini beklemek yerine `TRANSCRIBE_BACKEND=whisper` ayarını kullandım.

Kaynak: [OpenShorts transkripsiyon arka uçları](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/transcribe_backends.py){: target="_blank" rel="noopener noreferrer"}

## 1. NVIDIA Container Toolkit'i Arch Linux'a kurmak

Önce ana sistemde NVIDIA sürücüsünün çalıştığını `nvidia-smi` ile kontrol ettim. Docker konteynerinin ekran kartını kullanabilmesi için NVIDIA Container Toolkit'i kurdum:

```bash
sudo pacman -Syu nvidia-container-toolkit
```

Kurulumdan sonra Docker'ın NVIDIA runtime yapılandırmasını oluşturdum:

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

`nvidia-ctk runtime configure` komutu Docker'ın `/etc/docker/daemon.json` dosyasını NVIDIA Container Runtime'ı kullanabilecek şekilde güncelliyor. Benim sistemimde Docker'ın veri dizini daha önce `/mnt/steam_depo/Docker/docker` olarak ayarlanmıştı. Bu ayarı korudum; NVIDIA yapılandırmasını eklerken mevcut `data-root` değerini silmedim.

!!! warning "Mevcut daemon.json dosyasını gelişigüzel değiştirmeyin"
    Docker için daha önce tanımladığınız `data-root`, registry veya başka runtime ayarları varsa dosyanın tamamını örnek bir JSON ile değiştirmeyin. Önce mevcut içeriği kontrol edin. `nvidia-ctk runtime configure` komutu var olan Docker ayarına NVIDIA runtime tanımını eklemek için kullanılır.

Bu adımlar NVIDIA'nın Docker yapılandırma rehberindeki yöntemle aynı. Arch Linux deposunda da `nvidia-container-toolkit` paketi bulunuyor.

- [Arch Linux – nvidia-container-toolkit paketi](https://archlinux.org/packages/extra/x86_64/nvidia-container-toolkit/){: target="_blank" rel="noopener noreferrer"}
- [NVIDIA Container Toolkit – Docker yapılandırması](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html){: target="_blank" rel="noopener noreferrer"}

## 2. GPU'nun Docker içinden görüldüğünü doğrulamak

OpenShorts'u kurmadan önce GPU erişimini küçük bir CUDA konteyneriyle denedim:

```bash
docker run --rm --gpus all \
  nvidia/cuda:12.4.0-base-ubuntu22.04 \
  nvidia-smi
```

Komutun çıktısında RTX 4060 Ti, NVIDIA sürücüsü `615.78.08` ve CUDA UMD `13.4` bilgileri göründü. Bu test, GPU'nun yalnızca ana sistemde değil, `--gpus all` ile başlatılan konteynerin içinde de erişilebilir olduğunu doğruladı.

Bu kontrolü atlamamakta fayda var. OpenShorts'u derleyip çalıştırdıktan sonra GPU erişimiyle ilgili bir sorun çıkarsa problemin Docker/NVIDIA katmanında mı yoksa uygulamanın kendi yapılandırmasında mı olduğunu ayırmak çok daha zor oluyor.

## 3. OpenShorts deposunu klonlamak

Projeyi kendi `Projects` klasörüm altında tuttum:

```bash
mkdir -p ~/Projects
cd ~/Projects

git clone https://github.com/mutonby/openshorts.git
cd openshorts
```

Bu yazıdaki testleri belirli bir sürüm üzerinde tekrarlanabilir kılmak için kullandığım commit'e geçtim:

```bash
git checkout 2e56378e27f45ea29a1d092eb7422f2ac3f89557
```

OpenShorts'un temel kurulumunda Docker Compose kullanılıyor. NVIDIA hızlandırması için ayrıca `docker-compose.override.yml` dosyasıyla GPU build argümanını ve GPU aygıt rezervasyonunu ekledim.

## 4. Büyük dosyaları sistem diskinden ayrı tutmak

Benim sistemimde Docker'ın kendi verileri zaten `/mnt/steam_depo/Docker/docker` altında duruyordu. OpenShorts'un video yüklemelerini, ürettiği klipleri ve model dosyalarını da aynı harici diskte ama ayrı bir dizin ağacında topladım:

```text
/mnt/steam_depo/OpenShorts/
├── uploads/
├── output/
└── models/
```

Dizinleri oluşturdum:

```bash
sudo mkdir -p /mnt/steam_depo/OpenShorts/{uploads,output,models}
```

Burada önemli bir ayrıntı var. OpenShorts konteyneri `appuser` isimli root olmayan bir kullanıcıyla çalışıyor. Kullandığım commit'te bu kullanıcının UID ve GID değeri `999`. Bunu konteyner içinde kontrol ettim:

```bash
docker compose exec -T backend id
```

Çıktı:

```text
uid=999(appuser) gid=999(appuser) groups=999(appuser)
```

Bu nedenle OpenShorts'un yazacağı harici klasörlerin sahipliğini bu UID/GID'ye verdim:

```bash
sudo chown 999:999 \
  /mnt/steam_depo/OpenShorts/uploads \
  /mnt/steam_depo/OpenShorts/output \
  /mnt/steam_depo/OpenShorts/models
```

Burada özellikle proje klasörünün sahipliğini değiştirmedim ve `chmod 777` kullanmadım. Yalnızca konteynerin yazması gereken veri klasörlerini `appuser` kullanıcısına açtım.

## 5. NVIDIA hızlandırması ve kalıcı dizinler için Compose override

Ana `docker-compose.yml` dosyasını değiştirmek yerine yerel ayarları `docker-compose.override.yml` dosyasında tuttum. Compose, varsayılan dosya adlandırma düzeninde override dosyasını ana yapılandırmayla birlikte okuyor.

Benim kullandığım override dosyasının ilgili içeriği şöyle:

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

Burada birkaç tercihim var:

- `GPU: "1"` GPU'lu imajın derlenmesini sağlıyor.
- `capabilities: [gpu, video]` ile CUDA işlemleri için GPU, video kodlama tarafında da NVENC erişimi isteniyor.
- `uploads`, `output` ve `models` klasörleri harici diske bağlanıyor.
- Frontend, backend ve renderer portlarını `127.0.0.1` üzerine bağladım. Böylece servisler yerel makineden erişilebilir; ağdaki diğer cihazlara doğrudan açılmıyor.
- `ports: !override` ve `volumes: !override` kullandım. Bunlar ana Compose dosyasındaki listeleri birleştirmek yerine tamamen değiştirmek için var. `!override` etiketi Docker Compose 2.24.4 ve sonrasında destekleniyor; benim kurulumumda Compose `5.7.0` idi.

Kaynak: [Docker Compose – dosyaları birleştirme ve `!override`](https://docs.docker.com/reference/compose-file/merge/){: target="_blank" rel="noopener noreferrer"}

## 6. Whisper ve YOLO model yolları

Türkçe videolar için `.env` dosyamda şu transkripsiyon ayarlarını kullandım:

```ini
TRANSCRIBE_BACKEND=whisper
WHISPER_MODEL=large-v3-turbo
WHISPER_DEVICE=cuda
WHISPER_COMPUTE=float16
ASR_GPU_CONCURRENCY=1
YOLO_MODEL_PATH=/models/yolov8n.pt
```

`large-v3-turbo` modelini CUDA ve `float16` ile çalışacak şekilde seçtim. `ASR_GPU_CONCURRENCY=1` ayarı da transkripsiyon tarafında aynı anda tek GPU işi yürütmek için kullandığım sınır.

YOLO için ayrıca `YOLO_MODEL_PATH` belirledim. İlk denemede model varsayılan olarak `/app` altında `yolov8n.pt` dosyasını oluşturmaya çalıştı. Fakat proje klasörü hosttan `/app` konumuna bağlandığı için konteyner içindeki `appuser`, bu dizine yazamıyordu.

Modeli yazılabilir ve kalıcı olan `/models` dizinine taşıdım. İlk başarılı indirmede `yolov8n.pt` dosyası burada oluştu ve boyutu yaklaşık 6,3 MB olarak göründü.

## 7. Hugging Face, Matplotlib ve Fontconfig önbelleklerini taşımak

İlk transkripsiyon denemesinde Whisper modelinin Hugging Face önbelleğini şu konumda tutmaya çalıştığını gördüm:

```text
/app/.cache/huggingface
```

Ancak `/app` proje dizini olduğu için `appuser` bu klasörü oluşturamıyordu. `HF_HOME` değişkenini Compose ortamına ekleyerek önbelleği harici diske taşıdım:

```yaml
environment:
  HF_HOME: /models/huggingface
```

İlk indirme sonrasında bu dizinin boyutu yaklaşık 1,6 GB oldu. Böylece Whisper modeli proje dizinine değil, kalıcı `models` alanına yazıldı.

İşleme sırasında iki uyarı daha vardı:

```text
mkdir -p failed for path /app/.config/matplotlib
Permission denied: '/app/.config'
```

ve:

```text
Fontconfig error: No writable cache directories
```

Matplotlib ve Fontconfig için de yazılabilir önbellek konumları tanımladım:

```yaml
environment:
  MPLCONFIGDIR: /models/matplotlib
  XDG_CACHE_HOME: /models/cache
```

Son durumda ilgili dizinler şöyle oldu:

```text
/mnt/steam_depo/OpenShorts/models/
├── yolov8n.pt
├── huggingface/
├── matplotlib/
└── cache/
    └── fontconfig/
```

Bu ayarları yalnızca eklemekle bırakmadım; konteyner içinde Matplotlib'in gerçekten dosya oluşturabildiğini test ettim:

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

Testte Matplotlib config ve cache yolları `/models/matplotlib` olarak göründü. Grafik dosyası 21.887 byte boyutunda oluştu. `fc-cache -f` komutu da çalıştı ve Fontconfig dosyaları `/models/cache/fontconfig` altında oluştu.

Bu şekilde `/app/.config` izin hatasını yalnızca geçici olarak susturmak yerine, iki önbelleği de kalıcı ve yazılabilir bir konuma taşımış oldum.

## 8. Compose yapılandırmasını doğrulayıp servisleri başlatmak

İlk çalıştırmadan önce Compose dosyalarını kontrol ettim:

```bash
docker compose config --quiet
```

Komut hata vermeden tamamlandı. Ardından GPU imajını derleyip servisleri başlattım:

```bash
docker compose up -d --build
```

Benim sistemimde ilk Docker build işlemi yaklaşık `1425.8` saniye sürdü ve 34/34 adım tamamlandı. Bu süre donanım, ağ hızı, Docker önbelleği ve indirilen bağımlılıklara göre değişecektir.

Arayüzü yerel tarayıcıdan şu adreste açtım:

```text
http://127.0.0.1:5175
```

Gemini API anahtarını OpenShorts ayarlarına girdim. Doğrudan sosyal ağlara gönderim gibi ek özellikler için Upload-Post gibi ayrı servis anahtarları gerekebilir; benim burada odaklandığım kısım video klip üretimiydi.

## 9. GPU ve transkripsiyon doğrulaması

Docker içindeki GPU erişimini daha önce CUDA test konteyneriyle doğrulamıştım. OpenShorts backend'inde ise FFmpeg'in NVENC kodlayıcısını kontrol ettim:

```bash
docker compose exec -T backend sh -c \
  'ffmpeg -hide_banner -encoders | grep -E "h264_nvenc|hevc_nvenc"'
```

CTranslate2'nin CUDA aygıtını görüp görmediğini kontrol ettim:

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

Çıktıda şu yapılandırma vardı:

```text
{'model_size': 'large-v3-turbo', 'device': 'cuda', 'compute_type': 'float16'}
TRANSCRIBE_BACKEND: whisper
ASR_GPU_CONCURRENCY: 1
CTranslate2 CUDA cihaz sayısı: 1
```

İlk video işinde transkripsiyon ilerlemesi `25%`, `50%`, `75%` ve `100%` olarak loglandı. Tamamlanma satırında geçen süre 65 saniyeydi. Bu, kullandığım video ve o anki sistem yükü için gördüğüm sonuç; farklı videolar için genel bir hız garantisi değil.

## 10. İlk gerçek çıktı: Altyazılı altı klip

İlk başarılı üretim denemesinde OpenShorts altı klip oluşturdu. Çıktı klasöründe:

- Altı adet yeniden çerçevelenmiş MP4,
- Altı adet altyazı işlenmiş MP4,
- Kliplerin yerleşim bilgilerini tutan layout JSON dosyaları,
- İşin metadata dosyası,
- Altyazı için ASS dosyaları

oluştu. İlgili iş klasörünün toplam boyutu yaklaşık 76 MB olarak görünüyordu.

GPU render logunda şu sonucu gördüm:

```text
⚡ GPU render: 2891 frames in 9.7s
✅ Clip saved to ..._clip_6.mp4
⏱ Reframe v2 total: 56.1s
```

Buradaki `2891 frames in 9.7s` değeri tek bir klibin render aşamasına ait. Bunu tüm videolar için geçerli bir benchmark gibi değerlendirmiyorum. Yine de NVENC'in gerçekten kullanıldığını ve klip render işleminin GPU üzerinden ilerlediğini gösteren somut bir çıktıydı.

## Kurulum sırasında karşılaştığım diğer sorunlar

### YOLO modelinin `/app` içine yazılamaması

İlk işte YOLO modeli varsayılan `yolov8n.pt` yoluna indirilmeye çalışıldı ve izin hatası oluştu. Sebep, projenin `.:/app` olarak bind mount edilmesi ve konteynerin `appuser` kullanıcısının hosttaki proje klasörüne yazamamasıydı.

Çözüm olarak:

```ini
YOLO_MODEL_PATH=/models/yolov8n.pt
```

ayarını kullandım ve `/mnt/steam_depo/OpenShorts/models` dizinini `/models` olarak bağladım. Model bu konuma indirildi.

### Whisper modelinin Hugging Face önbelleğine yazılamaması

Whisper modelinin varsayılan önbelleği `/app/.cache/huggingface` altında oluşturulmak isteniyordu. `/app` yazılabilir olmadığı için `HF_HOME` değerini `/models/huggingface` yaptım. Sonrasında model dosyaları harici diske indirildi ve transkripsiyon yüzde 100'e ulaştı.

### Otomatik hook görselinin oluşturulamaması

İlk kliplerde otomatik hook başlığı üretilirken şu hata geldi:

```text
Permission denied: 'temp_hook_....png'
```

`hooks.py` dosyasını incelediğimde geçici PNG'nin yalnızca dosya adıyla oluşturulduğunu gördüm. İş süreci `/app` çalışma dizininde olduğu için dosya proje klasörüne yazılmaya çalışılıyordu.

Yerel `hooks.py` değişikliğimde geçici görselin yolunu, işlenen klibin bulunduğu klasörden türettim:

```python
stem = os.path.splitext(os.path.basename(video_path))[0]
hook_dir = os.path.dirname(os.path.abspath(video_path))
hook_filename = os.path.join(
    hook_dir,
    f"temp_hook_{uuid.uuid4().hex[:8]}_{_truncate_bytes(stem, 80)}.png",
)
```

Ardından Python sözdizimini kontrol ettim:

```bash
python -m py_compile hooks.py
```

İlk dosya yolu düzeltmesinden sonra yaptığımız son düzenlemeyle hook üretimini yeniden denedim. Artık geçici görseller doğru konumda oluşturuluyor ve hook'lar kliplere sorunsuz ekleniyor. Böylece ilk denemede karşılaştığım `/app` yazma izni kaynaklı hook problemi de kapanmış oldu.

Bu değişiklik yerel bir kaynak kodu düzeltmesi. Kullandığım commit'in upstream dosyasına kendiliğinden eklenmiş değil; depoyu yeniden klonlarsam veya ilgili dosyayı güncellersem kendi yama değişikliğimi tekrar uygulamam gerekebilir.

### Gemini API 503 hatası

Transkripsiyon tamamlandıktan sonra OpenShorts, klip seçimi için Gemini'ye geçti. İlk denemede 62 scoring window oluşturuldu. Başka bir denemede 110 pencere oluşturuldu ancak Gemini şu yanıtı verdi:

```text
503 UNAVAILABLE
This model is currently experiencing high demand.
```

OpenShorts birkaç kez yeniden denedi; sonraki işte denemeler tamamlandıktan sonra klip seçimi başarısız oldu.

`.env` dosyamda `GEMINI_MODEL` tanımlı değildi. Bu commit'te kodun varsayılanı `gemini-3.1-flash-lite`; iş logunda da bu modeli gördüm.

O sırada Google AI Studio kullanım ekranında gördüğüm anlık değerler şunlardı:

| Limit | Kullanım / sınır |
|---|---:|
| RPM | 4 / 15 |
| TPM | 12.27K / 250K |
| RPD | 11 / 500 |

Bu anlık tablo, o kontrol sırasında gösterilen istek ve token sınırlarının dolmadığını gösteriyordu. Sonraki denemeler ve gözlemlerimde de 503 hatasının OpenShorts yapılandırmasından veya yerel GPU/Whisper kurulumundan değil, Gemini API tarafındaki geçici yoğunluktan kaynaklandığını gördüm. Google'ın hata dokümantasyonunda `503 UNAVAILABLE` hizmetin geçici olarak aşırı yüklenmesi veya kullanılamamasıyla; `429` ise istek, token veya günlük kota sınırlarının aşılmasıyla ilişkilendiriliyor. Yani bu iki yanıtı birbirine karıştırmamak gerekiyor.

- [Gemini API hata kodları](https://ai.google.dev/gemini-api/docs/api-errors){: target="_blank" rel="noopener noreferrer"}
- [Gemini API hız limitleri](https://ai.google.dev/gemini-api/docs/rate-limits){: target="_blank" rel="noopener noreferrer"}

Bu tür bir hatada önce AI Studio'daki proje ve kullanım ekranını kontrol etmek, ardından servis tarafındaki yoğunluk azaldığında işi yeniden denemek daha doğru. Benim kurulumumda bu durum kalıcı bir OpenShorts arızası değildi; şu an klip seçimi dahil üretim akışı normal çalışıyor. `503` ile `429` aynı anlama gelmiyor.

## İleride geliştirmek istediğim noktalar

Kurulum ve mevcut video üretim akışı artık istediğim gibi çalışıyor. Bundan sonraki planım, OpenShorts'u yalnızca kullanmak değil, ihtiyaç duyduğum bazı özellikleri projeye kazandırmak. Bunlar şu an tamamlanmış özellikler değil; ilerleyen süreçte ele almak istediğim geliştirme başlıkları:

- **Özel font yükleme:** Altyazı ve ekrandaki metinlerde kendi font dosyalarımızı kullanabilmek istiyorum. Böylece her projede aynı sınırlı font seçeneklerine bağlı kalmadan görsel dili kendime göre düzenleyebilirim.
- **Proje geçmişi:** Arayüzde eski çalışmalarımı yeniden açıp görebileceğim kalıcı bir proje geçmişi/arsiv alanı eksik kalıyor. Şu an son projenin yedi günlük süre içinde görünmesi, daha önce üzerinde çalıştığım projelere dönmek için yeterli değil. Burada sözünü ettiğim eksiklik arayüzden geçmiş projeleri görüntüleme ihtiyacı; dosyaların diskten otomatik silindiği anlamına gelmiyor.
- **Dublaj için Voice Studio entegrasyonu:** Mevcut dublaj akışı ElevenLabs API'sine bağımlı. Bunu ileride kendi kullandığım Voice Studio ile birleştirerek alternatif bir ses üretim/dublaj yolu eklemek istiyorum.

Bunları tek seferde yapmayı planlamıyorum. Önce mevcut akışı kullanmaya devam edip hangi geliştirmelerin gerçekten gerekli olduğunu netleştireceğim; ardından uygun gördüklerimi aşama aşama ele alacağım.

## Sonuç

OpenShorts'un bu commit'indeki yükleme akışında dosya boyutu sınırı da bulunuyor: `app.py` içindeki `MAX_FILE_SIZE_MB` değeri 2048 MB. Bu değer ortam değişkeni olarak değil, kaynak kodda tanımlı. Uzun ve yüksek bit oranlı ekran kayıtlarında yükleme öncesi dosya boyutunu kontrol etmek gerekiyor.

Ekran kaydı ve terminal anlatımı gibi içeriklerde bir başka nokta da çıktıların yalnızca dosya olarak oluşmasına bakmamak. Kliplerin gerçekten okunabilir olup olmadığını, özellikle terminal yazılarının dikey kadrajda ne kadar yer kapladığını gözle kontrol etmek gerekiyor. Benim burada doğruladığım bölüm üretim hattının çalışması ve dosyaların oluşması; bütün kliplerin ekran yazısı okunabilirliği açısından tek tek görsel kalite değerlendirmesini bu kurulum kaydına dahil etmedim.

OpenShorts'u Arch Linux üzerinde Docker Compose ile NVIDIA GPU kullanacak şekilde ayağa kaldırdım. NVIDIA Container Toolkit konteyner içinden RTX 4060 Ti'ı görünür hale getirdi; FFmpeg tarafında `h264_nvenc` bulundu ve gerçek üretimde GPU render logu aldım.

Whisper transkripsiyonu tamamlandı, Gemini klip seçimini gerçekleştirdi ve videodan altyazılı klipler üretildi. Son hook düzeltmesinden sonra otomatik hook görselleri de sorunsuz oluşturulup kliplere ekleniyor. Kurulumun en çok uğraştıran tarafı Docker'ın kendisinden çok, `/app` bind mount'u nedeniyle root olmayan `appuser` kullanıcısının yazamadığı önbellek ve geçici dosya yolları oldu. YOLO, Hugging Face, Matplotlib, Fontconfig ve hook dosyalarının yazılacağı konumları uygun hale getirerek bu sorunları çözdüm.

Gemini tarafında gördüğüm `503 UNAVAILABLE` yanıtı ise API'nin geçici yoğunluğundan kaynaklandı; kota aşımı veya yerel kurulum hatası değildi. Şu an proje, hook üretimi ve klip seçimi dahil, benim kullanımımda sorunsuz çalışıyor.

Benim açımdan en önemli kazanım, OpenShorts'un yalnızca açılması değil; kaynak kodu proje klasöründe kalırken yüklemelerin, çıktıların ve büyük model önbelleklerinin ayrı diskte tutulduğu, GPU hızlandırması doğrulanmış ve günlük kullanımda istediğim gibi çalışan bir yerel çalışma düzenine kavuşması oldu. Bundan sonraki aşama kurulum sorunlarını çözmek değil, özel font, proje geçmişi ve Voice Studio entegrasyonu gibi eksik gördüğüm özellikleri geliştirmek.

---

## Kaynaklar

- [OpenShorts – kullandığım commit'in README dosyası](https://github.com/mutonby/openshorts/blob/2e56378e27f45ea29a1d092eb7422f2ac3f89557/README.md){: target="_blank" rel="noopener noreferrer"}
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