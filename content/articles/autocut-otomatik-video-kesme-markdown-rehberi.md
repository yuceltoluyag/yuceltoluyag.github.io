Title: Autocut ile Otomatik Video Kesme Rehberi
Date: 2025-09-08 14:00
Category: Medya
Tags: Autocut, MoviePy, Python video kesme, SRT, Markdown video edit, otomatik video düzenleme
Slug: autocut-otomatik-video-kesme-markdown-rehberi
Authors: yuceltoluyag
Status: published
Summary: Python tabanlı Autocut ile videolarınızı SRT ve Markdown işaretlemeleri kullanarak otomatik kesmenin adım adım rehberi.
Template: article
Image: images/autocut-otomatik-video-kesme-markdown-rehberi-xl.webp
Bluesky_Link: https://bsky.app/profile/yuceltoluyag.bsky.social/post/3lyh3gmmjn223

---

# Autocut ile Otomatik Video Kesme  🎬

## Giriş 📝

Video içerik üretimi gün geçtikçe daha yoğun ve rekabetçi hale geliyor. Özellikle YouTube ve sosyal medya platformlarında uzun çekimlerden gereksiz kısımları temizlemek, içerik kalitesini artırmak ve izleyici deneyimini iyileştirmek kritik bir öneme sahip. Ancak manuel video düzenleme, zaman alıcı ve hata yapma riski yüksek bir süreçtir.

Bu rehberde, **Python tabanlı Autocut aracı** ile videolarınızı nasıl otomatik olarak kesebileceğinizi, SRT altyazı ve Markdown tabanlı işaretlemelerle nasıl yönetebileceğinizi adım adım öğreneceksiniz. Ayrıca **MoviePy** ile video ve ses birleştirme sürecini de detaylı olarak açıklayacağız. Rehber boyunca örnek komutlar, ipuçları ve bilgi kutuları ile süreci kolayca takip edebileceksiniz.

---

## 1️⃣ Autocut Nedir? 🛠️

Autocut, Python ile yazılmış bir video düzenleme aracıdır ve şu özellikleri sunar:

* Videoları **otomatik kesme** ve gereksiz sahneleri çıkarma
* SRT altyazıları ile **transkripsiyon** ve düzenleme
* Markdown tabanlı **işaretleme sistemi** ile hangi cümleleri tutacağınızı belirleme
* MoviePy ile **otomatik video ve ses birleştirme**
* GPU (CUDA) desteği ile hızlı işlem yapabilme

<div class="info-box tip">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <div>
        <div class="alert-title">İpucu</div>
        <p>Autocut, özellikle uzun videolarda zamandan tasarruf etmek ve içerik kalitesini artırmak için idealdir.</p>
    </div>
</div>
[responsive_img src="/images/autocut-otomatik-video-kesme-markdown-rehberi-xl.webp" alt="AutoCut ile otomatik gürültü engelleme" /]

---

## 2️⃣ Kurulum ve Hazırlık ⚙️

Öncelikle bir **Python sanal ortamı** oluşturun ve gerekli paketleri yükleyin:

```bash
python -m venv venv
source venv/bin/activate
pip install moviepy autocut
```

Kontrol etmek için:

```bash
which python
which pip
which autocut
```

Sisteminizde **FFmpeg** yüklü olmalı:

```bash
which ffmpeg
```

---

## 3️⃣ Video Transkripsiyonu ve Markdown Oluşturma ✍️

Autocut ile videonuzu önce transkribe edip Markdown çıktısı oluşturabilirsiniz:

```bash
autocut -t -c -m --lang Turkish --device cuda /home/friday13/Videos/editle.mp4
```

* `-t` → Transkripsiyon
* `-c` → Kesim
* `-m` → Markdown oluştur
* `--lang Turkish` → Dil seçimi
* `--device cuda` → GPU ile işlem

<div class="info-box note">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Bilgi</div>
        <p>Markdown çıktısı, hangi cümleleri tutacağınızı işaretlemenizi sağlar. Bu sayede kesim sırasında gereksiz kısımlar atılır.</p>
    </div>
</div>

---

## 4️⃣ Markdown Düzenleme

Markdown dosyasındaki her satır şu formatta olmalıdır:

```
- [x] [index,süre] cümle
- [ ] [index,süre] <No Speech>
```

* `[x]` → Videoda kalacak cümle
* `[ ]` → Silinecek kısım

Örnek:

```markdown
- [x] [1,00:00] Evet sevgili arkadaşlar...
- [ ] [6,00:23] <No Speech>
```

---

## 5️⃣ Videoyu Kesme ve Çıktı Alma 🎬

Markdown ve SRT hazır olduktan sonra videonuzu kesebilirsiniz:

```bash
autocut -c /home/friday13/Videos/editle.mp4 /home/friday13/Videos/editle.srt /home/friday13/Videos/editle.md
```

* MoviePy, video ve sesi birleştirerek yeni bir dosya oluşturur.
* Örnek çıktı: `/home/friday13/Videos/editle_cut.mp4`
* Orijinal süre: 317.8 sn → Kesilmiş süre: 181 sn

<div class="info-box important">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
        <div class="alert-title">Önemli</div>
        <p>Kesilen video, sadece işaretlenen cümleleri içerir. Gereksiz boşluklar ve "No Speech" kısımları atılmış olur.</p>
    </div>
</div>

---

## 6️⃣ Autocut İş Akışı Diyagramı

<ul class="steps">
  <li class="step step-info">Başlangıç: Orijinal video</li>
  <li class="step step-info">Autocut ile transkripsiyon ve kesim komutu</li>
  <li class="step step-info">Markdown ve SRT oluştur</li>
  <li class="step step-info">Markdown üzerinde "tutulacak" cümleleri işaretleme</li>
  <li class="step step-info">Autocut ile kesim</li>
  <li class="step step-info">MoviePy ile video ve ses birleştirme</li>
  <li class="step step-info">Sonuç: editle_cut.mp4</li>
</ul>

---

## 7️⃣ Markdown Örneği


# Autocut Video Kesim Akışı

## 1️⃣ Orijinal Video

* Video dosyası:

`/home/friday13/Videos/editle.mp4`

## 2️⃣ Transkripsiyon ve Kesim İşlemi


```bash
autocut -t -c -m --lang Turkish --device cuda /home/friday13/Videos/editle.mp4
```

## 3️⃣ Markdown ve SRT Üzerinden Kesim

```bash
autocut -c /home/friday13/Videos/editle.mp4 /home/friday13/Videos/editle.srt /home/friday13/Videos/editle.md
```

## 4️⃣ Sonuç

* Video süresi 317.8 sn → 181 sn
* Kesilmiş video: `/home/friday13/Videos/editle_cut.mp4`



---

## 8️⃣ Sonuç ve Özet ✅

Autocut, video üreticileri için **zamandan tasarruf sağlayan ve iş akışını hızlandıran** güçlü bir araçtır. Markdown tabanlı işaretleme sistemi sayesinde hangi kısımların kalacağını kolayca yönetebilirsiniz. MoviePy



entegrasyonu ile kesilen video ve ses sorunsuz bir şekilde birleştirilir.

🎯 **Bu aracı indirip deneyin:** Hemen kendi videolarınızı test edin ve gereksiz kısımları otomatik olarak temizleyin!

Bu linkten indirebilirsiniz https://github.com/mli/autocut

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="tS3Iw2WhCJI"></lite-youtube>
---

