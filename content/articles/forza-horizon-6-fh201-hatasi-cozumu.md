Title: Forza Horizon 6'yı Emektar RX 480 İle Oynamak (FH201 Hatası Kesin Çözüm)
Date: 2026-05-29 03:30
Category: Oyun
Tags: forza horizon 6, linux gaming, steamos, amd rx 480, proton, vkd3d, hata çözümü
Slug: forza-horizon-6-fh201-hatasi-cozumu
Authors: yuceltoluyag
Status: published
Summary: Forza Horizon 6'nın desteklenmeyen eski AMD ekran kartlarında (RX 400/500 serisi) FH201 ve FH205 hatası vermesini Proton ve VKD3D parametreleriyle nasıl aştığımı anlatıyorum.
Template: article
Lang: tr
Translation: false

Kendi evimdeki lab ortamımda (homelab) kurduğum DIY Steam Machine'in başına geçip akşamın bir saati Forza Horizon 6'ya dalayım dedim. Ama Microsoft sağ olsun, benim emektar AMD RX 480'e bakar bakmaz yüzüme o malum tokadı çarptı: **FH201 Hatası**.

Neymiş efendim, Polaris veya Vega mimarili Radeon 400 ve 500 serisi ekran kartları artık "minimum desteklenen donanım" listesinde değilmiş. Steam'den "İade Et" butonuna basıp gidip makarna-yoğurt yiyerek geceyi kapatmak en kolay yoldu. Ama biz bir kere o terminalin tozunu yutmuşuz hacı, kolay pes eder miyiz? Asla. [Reddit'teki şu harika rehberi](https://www.reddit.com/r/linux_gaming/comments/1ti2xpd/fixes_for_forza_horizon_6_fh101_cpu_cores_or/){: target="\_blank" rel="noopener noreferrer"} de arkama alıp kolları sıvadım.

## Neden Desteklenmiyor Bu Zımbırtı?

Mevzu aslında tamamen DirectX 12 özellikleriyle alakalı. Oyun, ekran kartının donanımsal olarak bazı DirectX seviyelerine sahip olmasını bekliyor. Bizim eski nesil kartlarda bu özellikler donanımsal olarak yok. Fakat burada imdadımıza Linux'un oyun dünyasına armağanı **Proton** ve **Vulkan** yetişiyor.

Proton çeviri katmanı sayesinde, oyunun beklediği o eksik DirectX özelliklerini "varmış gibi" taklit edebiliyoruz. Ekran kartımız Vulkan'ı çatır çatır desteklediği için, bu sahte bildirim oyun motorunu kandırmaya yetiyor[^1].

## Hatanın Çözümü: Başlatma Parametreleri

Eğer işlemciniz Forza Horizon 6 için yeterliyse (benim sistemde i5-10500 var ve gayet rahat yetiyor), yapmanız gereken tek şey Steam üzerinden oyunun başlatma seçeneklerine (launch options) şu parametreleri girmek.

!!! warning "Dikkat! Hacı bura çok kritik."
    Aşağıdaki komutu kopyalarken sonundaki `%command%` kısmını atlamadığınızdan emin olun. Yoksa oyun Steam üzerinden tetiklenmez.

```bash
VKD3D_FEATURE_LEVEL=12_1 VKD3D_CONFIG=descriptor_heap,no_upload_h_vram RADV_EXPERIMENTAL=heap,sync2 radv_wait_for_vm_map_updates=true %command% 
```

Bu komutu girdikten sonra oyunu başlattığınızda o sinir bozucu FH201 ekranı gidiyor ve yarışa doğrudan dalıyorsunuz.

## FPS ve Performans Gerçekleri

1080p çözünürlükte düşük (Low) veya orta (Medium) ayarlarda gayet oynanabilir bir deneyim sunuyor. Düşük ayarlarda sabit 60 FPS alırken, orta ayarlarda özellikle Tokyo gibi yoğun bölgelere girdiğinizde FPS 40'lara kadar düşebiliyor. Ama inanın bana, yeni bir kasa, PSU ve ekran kartı üçlüsüne asgari ücretin bilmem kaç katını gömmektense, 40 FPS'de yanlamak çok daha tatlı geliyor.


Hadi kalın sağlıcakla, ben Tokyo sokaklarında RX 480'i biraz daha terletmeye gidiyorum.

---

### 🔗 Laboratuvardan Diğer Notlar
Linux'ta oyun mevzusu tek yazıyla kapanmaz. Sistemi kurcalarken işine yarayacak diğer tecrübelerim de şurada:

* [MangoHud ile Oyun Performansı İzleme](/mangohud-ile-oyun-performansi-izleme/)
* [Linux GPU Sürücü Rehberi](/linux-gpu-driver-rehberi/)
* [Steam "Wrong ELF Class" Hatası ve Çözümü](/steam-debian-oyun-acilmiyor-wrong-elf-class-libgamemodeauto-hatasi-cozumu/)
* [Linux'ta Oyunlara Türkçe Yama Kurulumu](/linux-oyunlara-turkce-yama-kurulumu/)

[^1]: Bu taklit işlemi VKD3D (Vulkan tabanlı D3D12 implementasyonu) üzerinden yapılıyor. `VKD3D_FEATURE_LEVEL=12_1` komutu tam olarak bu işe yarıyor.
