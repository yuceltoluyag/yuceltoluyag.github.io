Title: Rise of Kingdoms Installation on Arch Linux (with Lutris)
Date: 2025-05-10 21:00
Modified: 2025-08-11 22:59
Category: Oyun
Tags: arch linux, rise of kingdoms, lutris, linux oyun, wine, çözümler, grafik hatası, çözünürlük
Slug: arch-linux-rise-of-kingdoms-kurulumu
Authors: yuceltoluyag
Status: published
Summary: It's possible to play Rise of Kingdoms on Arch Linux! In this guide, we explain step-by-step how to install it with Lutris and how to solve graphics issues you might encounter.
Template: article
Image: images/rok-lutris-fps-test-xl.webp
Lang: en

## 🧐 Introduction: Why Should You Play Rise of Kingdoms on Linux?

Rise of Kingdoms is a popular strategy game that started on mobile but can also be played on PC via Windows. However, it doesn't offer native support for Linux users. In this guide, we'll show you how to install Rise of Kingdoms on Arch Linux using **Lutris**, how to solve graphics issues, and what settings you need to make for a smooth experience.

## 🔧 1. Installing Required Dependencies

```bash
sudo pacman -S lutris wine winetricks
```

Recommended:

```bash
yay -S wine-ge lutris winetricks
```

**Notes:**

- The `wine-ge` version may be more stable for games.
- If Lutris is not installed on your system, you can install it from AUR.

## 📀 2. Setup.exe Installation via Lutris

[responsive_img src="/images/rok-lutris-add-game-xl.webp" alt="lutris-add-game-local" /]

1. Open Lutris.
2. Click the "+" button in the lower left corner, then "Add a new game".
3. Select the Wine runner.
4. Set the `setup.exe` file in the "Executable" field.
5. Follow the installation wizard.

## ⚙️ 3. Optimizing Wine Settings

### Settings to Make:

- Set Windows version to "Windows 10".
- Add `d3dcompiler_47` and `vcrun2019` to DLL overrides.
- If necessary, via `winetricks`:

```bash
winetricks corefonts vcrun2019 d3dcompiler_47
```

!!! note "<strong>Lutris does these settings for you. If you encounter an error with another game, you can make these settings yourself.</strong>"

## 🗅️ 4. Fixing Graphics Glitch and Flickering Issues

### Problem:

- Black screens
- Mouse ghosting
- Screen flickering

### Solution:

- Enable DXVK in Lutris runner options.
- Enable dgvoodoo2 in Lutris runner options.
- Your settings should look like in the image.

[responsive_img src="/images/rok-lutris-enable-dxvk-xl.webp" alt="lutris-winecfg" /]

- If the problem continues with the above solution, follow the steps below.

* Turn off overlay by setting `DXVK_HUD=0`.
* Create or edit the following file inside the Wine prefix where the game runs:

```bash
nano ~/.config/lutris/runners/wine/default/user_settings.cfg
```

And add this inside:

```ini
[DXVK]
dxgi.customDeviceDesc = NVIDIA GeForce GTX 1050
dxgi.numBackBuffers = 2
```

## 🗄️ 5. Special Settings for Resolution Problems

[responsive_img src="/images/rok-lutris-glitch-problem-xl.webp" alt="lutris-enable-Glitch-problem" /]

You may experience issues like screen distortions, flickering, or inability to change resolution when running the game **without** `dgvoodoo2`. Make sure `dgvoodoo2` is enabled. If the problem is not resolved even if you've enabled it, follow these steps to solve the problem.

### Steps:

- Check the "Run in a virtual desktop" box in Lutris game settings.
- Match the resolution with your desktop resolution.
- Set the DPI value to 100 from `winecfg > Graphics`.

## 🥺 6. Testing and Stability Check

[responsive_img src="/images/rok-lutris-fps-test-xl.webp" alt="lutris-fps-overlay" /] Now the game runs just like on Windows. We tested everything in a live stream.

---

If the problem is not solved, follow the steps below.

- Play the game for a few minutes after starting.
- Test audio, video, and controls.
- Check Lutris logs (`Right Click > Show Logs`).

## 💡 Extra Tips and Recommendations

- You can track FPS and temperature with MangoHud.
- If you want to test Proton GE versions, change the runner in Lutris.
- You can install the game in an external folder to make backup easier.

## 📌 Conclusion

Lutris is a great blessing for Linux users. Although running a non-native game like Rise of Kingdoms might seem complex at first, following these steps will get you a smooth gaming experience in no time. Most importantly, this process repeatedly shows the power and flexibility of Linux.

## 📣 Frequently Asked Questions

- **The game doesn't open, what should I do?**
  Check Lutris logs, it might be a missing DLL or DXVK issue.

- **No audio?**
  Check your PulseAudio or PipeWire setup. Test via `winecfg`.

- **Low FPS?**
  Check if DXVK and your Vulkan drivers are up to date. NVIDIA users should use `nvidia-dkms`.

## Video guide available at:

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="u-_21BAuPlc"></lite-youtube>

-- Tested in a live stream.

-- Working at 1080p resolution.

-- Working smoothly at 60 FPS or higher.

-- [/rise-of-kingdom-bot ](/veda-rise-of-kingdom-bot)

Live Stream Replay: [Click to watch live stream replay](https://kick.com/babapy/videos/2063d6f8-eba5-44af-8877-2ba34dd2d9c9){: target="\_blank" rel="noopener noreferrer"}
