Title: Arch Linux Nvidia Ekran Kartı Kurulumu
Date: 2020-04-18 10:00
Modified: 2025-08-07 06:45
Category: Donanım
Tags: linux, nvidia, laptop
Slug: arch-linux-nvidia-ekran-karti-kurulumu
Authors: yuceltoluyag
Summary: Arch Linux'ta Nvidia ekran kartı kurulumunu, sürücü uyumsuzluklarını, performans ayarlarını ve optimizasyonları adım adım açıklıyorum.
Translation: false
Status: published
Template: article
Image: images/nvidia-linux-performans-ayari-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114984688481336401


# Merhaba

Merhaba! Uzun zamandır yazmak istediğim konulardan biri de **Nvidia** ekran kartlarının kurulumu. 😊 Linux'ta **Nvidia** kartlarının kurulumu ile ilgili Türkçe kaynaklar mevcut ancak çoğu zaman kurduğunuz sürücünün performansından memnun kalmayabilirsiniz. Bu durumda, " **Linux'ta Nvidia tam verimli çalışmıyor galiba**" gibi yorumlarla karşılaşmak oldukça yaygın. Aslında burada sorun, çoğu kaynağın **3D render, oyun** gibi uygulamalarla ilgilenmemesi olabilir. Benim amacım, burada size performans sıralaması yaparak **Nvidia** kartınızın nasıl en verimli şekilde çalıştığını göstermek olacak. 😁 Hadi, fazla vakit kaybetmeden kurulumlara geçelim!


## Kartınızın Durumunu öğrenme ?

- Terminalinizi açıp şu komutu yapıştırın.

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

Bende ki sonuçlar ise şöyle : Nvidia Quadro 2000M kullanıyorum.

```bash
00:02.0 VGA compatible controller: Intel Corporation 2nd Generation Core Processor Family Integrated Graphics Controller (rev 09)
Subsystem: Lenovo 2nd Generation Core Processor Family Integrated Graphics Controller
Kernel driver in use: i915
--
01:00.0 VGA compatible controller: NVIDIA Corporation **GF106GLM** [Quadro 2000M] (rev a1)
Subsystem: Lenovo **GF106GLM** [Quadro 2000M]
Kernel driver in use: nvidia
```

GF106 olarak işaretlediğim kısım kartınıızn ailesini(kod adı) belirtiyor. [Nvidia Grafik Kartı Kod Adı Öğrenme](https://nouveau.freedesktop.org/wiki/CodeNames/){: target="_blank" rel="noopener noreferrer"} Siteye göre benim kartım Fermi ailesindenmiş.

## Kartın Desteklendiğini sürümü öğrenmek

[Nvdia Eski Kartlar](https://www.nvidia.com/en-us/drivers/unix/legacy-gpu/){: target="_blank" rel="noopener noreferrer"} Bu listede kartınız varsa muhtemelen artık yeni nesil sürücüleri kuramayacaksınız. Kursanız dahi kullanım aşamasında hatalarla boğuşmaya hazır olun. Belki de kullanıcıların en çok yanlış yaptığı yer burasıdır. Sizin grafik sürücünüz 340xx sürümünde desteğini kesmiştir ama siz gidip en son grafik sürücünü kurmaya çalışıyorsunuz. Örneğin archlinux ta **nvidia** paketiyle **nvidia-xxx** paketi arasında dağlar kadar fark vardır. Site üzerinde benim kartımın **Quadro 2000M 0DDA** bilgileri verilmiş. Şimdi sırada en son hangi driveri yayımlanmışşa o paketi bulmakta, bunun için nvdia sürücü indirme kısmından yararlabiliriz.

- [Nvidia Sürücü İndirme](https://www.nvidia.com/Download/index.aspx){: target="_blank" rel="noopener noreferrer"} Adresine gidip,doğru şekilde seçimlerinizi yaptıktan sonra arama kısmına basın size en son yayımlanan sürücüyü getirecektir. Çıkan sonuca göre benim sürücüm 390.1320 dır. Benim aurda nvidia-390xx paketlerine bakmam gerektiğini gösteriyor. [Archlinux Nvidia Belge](https://wiki.archlinux.org/index.php/NVIDIA#Installation){: target="_blank" rel="noopener noreferrer"} sine baktığınızda 390xx ve 340xx için sürücüleri için ayrı paketler var.




[responsive_img src="/images/nvidia-grafik-karti-indirme-lg.webp" alt="Nvidia_Sürücü_Seçme" /]
[responsive_img src="/images/nvidia-grafik-karti-indirme2-lg.webp" alt="Nvidia_Sürücü_Bilgisi" /]

## Hangisi Nouveau,Optimus,Prime,Bumblebee

**Dipnot** : Geçiş durumlarında kullanmasanız dahi bbswitch,nouveau kullanılması gerekebiliyor.

- **Nouveau** : Açık kaynak sürücülerdir. Eğer ki grafik tarafında çok fazla işlemleriniz yoksa kullanabilirsiniz. (Prime veya optimus kullanırken gerektiği durumlar olabiliyor)

```bash
yay -Syyu xf86-video-intel mesa xf86-video-nouveau opengl-man-pages lib32-mesa-vdpau lib32-libva-mesa-driver  # paketlerini kurabilirsiniz
```

**Optimus** : Bilgisayarınızda hem intel hemde harici bir ekran kartı varsa optimus teknolojisi var demektir. Bu tekonolojinin amacı pil ömrü,performans gerektiren uygulamalarda harici karta geçiş yapmak için kullanılır. Nouveau göre daha performanslıdır(2D-3D) uygulamalar açabilirsiniz. Geçiş için aşağıda ki methodlar kullanılmaktadır.

- PRIME (Tavsiyem)
- nouveau
- Bumblebee]
- nvidia-xrun
- optimus-manager (tavsiyem yardımcı program)

**Prime** : Oyun,render,gpu gerektiren işlemlerde tam performans çalışabileceğiniz sürücüdür.

Benim kartım gibi 390 sürümüne sahip olanlar var ise şu paketleri kurmalıdır.

```bash
yay -Syyu nvidia-390xx-dkms nvidia-390xx-utils opencl-nvidia-390xx nvidia-390xx-settings lib32-opencl-nvidia-390xx lib32-nvidia-390xx-utils
```

daha sonra

```bash
yay -S optimus-manager optimus-manager-qt
```

Kurulum tamamlandıktan sonra

```bash
sudo systemctl enable optimus-manager.service
```

Sistemi yeniden başlatıyorsunuz. Sistem yeniden başladıktan sonra ister optimus-manager-qt programı çalıştırıp elle geçiş yapın,isterseniz terminal aracılığıyla geçiş yapın.

```bash
$ optimus-manager --switch intel # Intel Grafik Kartı
$ optimus-manager --switch nvidia # NVIDIA Grafik kartı
$ optimus-manager --switch hybrid # Hibrit Grafik (xorg-server paketi gereklidir)
$ optimus-manager --switch auto # Otomatik Geçiş)
```

Dilerseniz sistem başlangıcında hangi kartın seçileceğini belirtebilirsiniz.Seçtiğiniz kart otomatik olarak aktif edilebilir.Bu ayarı yine optimus-manager-qt içerisindende yapabilirsiniz. Terminal den yapmak içinse

```bash
$ optimus-manager --set-startup intel # Intel Grafik Kartıyla açılır
$ optimus-manager --set-startup nvidia # NVIDIA Grafik kartıyla açılır
$ optimus-manager --set-startup hybrid # Hibrit Grafik seçeneği ile başlar (xorg-server paketi gereklidir)
```

Opsiyonel olarak

```bash
yay -S nvdock
```

paketini kuralabilirsiniz. Tavsiyede ederim. Kartın çalışıp çalışmadığını,gerekli ayarları alternatif olarak buradanda görebilirsiniz.

## Unutmadan

Geçişler esnasında oturup kapatılır ve yeniden giriş yaparsınız. Eğer Prime kullanmak istiyorsanız öncedende farklı kurulumlar yaptıysanız(bumble) gibi prime ile çakışabilir. Bu yüzden önce ki ayarları ve programları silmeniz gerekmektedir. Her hangi birisinin konfigurasyon dosyası kalsa dahi sorunlara yol açabiliyor. Üçüncü parti uygulamlarda bu sorunlara yol açabiliyor, nvdock tarzı bir uygulama sistem başlangıcında aktif olarak başlıyorsa buda geçişler esnasında sorunlar yaratabiliyor. Bize yukarda önerdin ama hata veriyor diyorsun ?! Evet kuracaksın ancak sistem başlangıcında otomatik olarak açılmayacak ,geçişlerini yaptıktan sonra elle açıcaksın. Bu sebeble temiz bir kurulum çok önemlidir. Sistemi kurduktan sonra ilk işiniz sisteminize uygun nvidia sürücülerinizi kurun, daha sonra yukarıda anlattığım gibi optimus-manageri kurun,keyfinize bakın :)

## Performans Ayarlarım

Eğer nvidia ekran kartına geçtiğinizde ekran yırtılması,obs ile ilgili sorunlar,taşıma problemleri yaşıyorsanız. Compton,picom,xcompgr gibi paketleri kapatın.

```bash
killall picom compton xcompmgr
```

daha sonra


[responsive_img src="/images/nvidia-linux-performans-ayari-lg.webp" alt="Nvidia_Performans_Ayari" /]
tiklerini kaldırın. Daha sonra powermizer altında ki auto ayarını resimde ki gibi değiştirin. "Preferer maxium performance seçili"


[responsive_img src="/images/nvidia-grafik-ayari-maximum-performans-lg.webp" alt="Nvidia_Performans_Ayari" /]

buda verdiği performans bir de en altaki görselde bumblebee performansına bakın :D


[responsive_img src="/images/primeperformansi-lg.webp" alt="Nvidia_optirun_performansı" /]

**Bumblebee** : Yerli yabancı tüm kaynaklardan [Bumblebee Kurulumu](https://wiki.archlinux.org/index.php/Bumblebee){: target="_blank" rel="noopener noreferrer"} anlatılır. 26 Nisan 2013 son commitini almış [Bumblebee Github](https://github.com/Bumblebee-Project/Bumblebee){: target="_blank" rel="noopener noreferrer"}. Yıla göre bakarsak en stabil buymuş gibi görünebilir fakat oyun oynayan,render yapan kısacası GPU'yu tam anlamıyla kullanmak isteyen arkadaşlar için verdiği performans tatmin edici gelmeyecektir.Benim ekran kartım için Bumblebee verdiği performans **Windows 'un yarısı kadardı**, bu kimileri için yeterli olabilir ancak benim için değil :)

390xx sürümüne sahip olanlar için

```bash
sudo pacman -S bumblebee mesa xf86-video-intel nvidia-390xx lib32-nvidia-390xx-utils bbswitch nvidia-390xx-utils
```

daha yeni bir sürücünüz var ise

```bash
sudo pacman -S bumblebee mesa xf86-video-intel nvidia lib32-nvidia-utils bbswitch nvidia-utils
```

paketleri kurduktan sonra kendimizi bumblebee grubuna dahil ediyoruz

```bash
sudo gpasswd -a $USER bumblebee
```

Daha osnra bumblebee servisini aktif ediyoruz.

```bash
sudo systemctl enable bumblebeed.service
```

daha sonra sistemi yeniden başlatıyoruz.

```bash
shutdown -r now
```

**Bumblebee** performans vermesiniz istediğimiz uygulamalarda **optirun uygulamaadi** gibi başlatıyoruz. Örneğin **optirun gputest**
- Dahili Gpu Performansı

[responsive_img src="/images/optirun-dahili-gpu-lg.webp" alt="Dahili Gpu Performansı" /]
- Harici Gpu Performansı
[responsive_img src="/images/optirun-performansi-lg.webp" alt="Harici Gpu Performansı" /]

# Videolu Anlatım 

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="DhCUPntoKSg"></lite-youtube>
