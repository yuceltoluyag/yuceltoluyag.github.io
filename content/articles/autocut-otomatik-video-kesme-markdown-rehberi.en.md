Title: Guide to Automatic Video Cutting with Autocut
Date: 2025-09-08 14:00
Category: Medya
Tags: Autocut, MoviePy, Python video kesme, SRT, Markdown video edit, otomatik video düzenleme
Slug: autocut-otomatik-video-kesme-markdown-rehberi
Authors: yuceltoluyag
Status: published
Summary: Step-by-step guide to automatically cut your videos using Python-based Autocut with SRT and Markdown markings.
Status: published
Template: article
Image: images/autocut-otomatik-video-kesme-markdown-rehberi-xl.webp
Lang: en

---

## Automatic Video Cutting with Autocut 🎬

## Introduction 📝

Video content creation becomes more intense and competitive day by day. Especially on YouTube and social media platforms, removing unnecessary parts from long recordings is critical to improve content quality and viewer experience. However, manual video editing is a time-consuming process with a high risk of errors.

In this guide, you'll learn step-by-step how to automatically cut your videos with the **Python-based Autocut tool**, and how to manage them with SRT subtitles and Markdown-based markings. We'll also explain the video and audio merging process with **MoviePy** in detail. Throughout the guide, you'll be able to easily follow the process with example commands, tips, and information boxes.

---

## 1️⃣ What is Autocut? 🛠️

Autocut is a video editing tool written in Python and offers the following features:

- **Automatic video cutting** and removing unnecessary scenes
- SRT subtitles for **transcription** and editing
- **Markup system** based on Markdown to determine which sentences to keep
- **Automatic video and audio merging** with MoviePy
- Fast processing with GPU (CUDA) support

!!! tip "Autocut is especially ideal for saving time and improving content quality in long videos."

[responsive_img src="/images/autocut-otomatik-video-kesme-markdown-rehberi-xl.webp" alt="Automatic noise cancellation with AutoCut "/]

---

## 2️⃣ Installation and Preparation ⚙️

First, create a **Python virtual environment** and install the necessary packages:

```bash
python -m venv venv
source venv/bin/activate
pip install moviepy autocut
```

To check:

```bash
which python
which pip
which autocut
```

Your system should have **FFmpeg** installed:

```bash
which ffmpeg
```

---

## 3️⃣ Video Transcription and Markdown Creation ✍️

With Autocut, you can first transcribe your video and generate a Markdown output:

```bash
autocut -t -c -m --lang Turkish --device cuda /home/friday13/Videos/editle.mp4
```

- `-t` → Transcription
- `-c` → Cutting
- `-m` → Create Markdown
- `--lang Turkish` → Language selection
- `--device cuda` → Process with GPU

!!! note "The Markdown output allows you to mark which sentences to keep. This way, unnecessary parts are skipped during cutting."

---

## 4️⃣ Markdown Editing

Each line in the Markdown file should be in the following format:

```
- [x] [index,time] sentence
- [ ] [index,time] <No Speech>
```

- `[x]` → Sentence to remain in video
- `[ ]` → Section to be deleted

Example:

```markdown
- [x] [1,00:00] Yes, dear friends...
- [ ] [6,00:23] <No Speech>
```

---

## 5️⃣ Cutting Video and Getting Output 🎬

Once Markdown and SRT are ready, you can cut your video:

```bash
autocut -c /home/friday13/Videos/editle.mp4 /home/friday13/Videos/editle.srt /home/friday13/Videos/editle.md
```

- MoviePy combines video and audio into a new file.
- Example output: `/home/friday13/Videos/editle_cut.mp4`
- Original duration: 317.8 sec → Cut duration: 181 sec

!!! note "The cut video contains only the marked sentences. Unnecessary spaces and "No Speech" parts are removed."

---

## 6️⃣ Autocut Workflow Diagram

<ul class="steps">
  <li class="step step-info">Start: Original video</li>
  <li class="step step-info">Transcription and cutting command with Autocut</li>
  <li class="step step-info">Create Markdown and SRT</li>
  <li class="step step-info">Mark "to keep" sentences on Markdown</li>
  <li class="step step-info">Cut with Autocut</li>
  <li class="step step-info">Combine video and audio with MoviePy</li>
  <li class="step step-info">Result: editle_cut.mp4</li>
</ul>

---

## 7️⃣ Markdown Example

## Autocut Video Cutting Flow

## 1️⃣ Original Video

- Video file:

`/home/friday13/Videos/editle.mp4`

## 2️⃣ Transcription and Cutting Process

```bash
autocut -t -c -m --lang Turkish --device cuda /home/friday13/Videos/editle.mp4
```

## 3️⃣ Cutting via Markdown and SRT

```bash
autocut -c /home/friday13/Videos/editle.mp4 /home/friday13/Videos/editle.srt /home/friday13/Videos/editle.md
```

## 4️⃣ Result

- Video duration 317.8 sec → 181 sec
- Cut video: `/home/friday13/Videos/editle_cut.mp4`

---

## 8️⃣ Conclusion and Summary ✅

Autocut is a powerful tool that **saves time and accelerates workflow** for video creators. Thanks to its Markdown-based marking system, you can easily manage which parts should remain. With MoviePy integration, the cut video and audio are seamlessly merged.

🎯 **Download and try this tool:** Test your own videos right away and automatically clean up unnecessary parts!

You can download from this link https://github.com/mli/autocut

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

## <lite-youtube videoid="tS3Iw2WhCJI"></lite-youtube>
