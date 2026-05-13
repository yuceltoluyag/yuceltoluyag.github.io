Title: Arch Linux Üzerinde CPU Güç Yönetimi ve Performans Ayarları
Date: 2025-07-28 09:30
Modified: 2025-08-11 22:59
Category: Donanım
Tags: arch linux, cpupower, intel_pstate, cpu frekansı, güç yönetimi, i3wm, performans ayarı
Series: ArchLinuxCPU
Series_index: 1
Slug: arch-linux-cpu-performans-ayarlari
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde modern Intel işlemcilerle nasıl CPU frekansı kontrol edilir ve güç yönetimi optimize edilir? cpupower ve intel_pstate ile adım adım yapılandırma rehberi.
Template: article
Image: images/arch-linux-cpu-performans-ayarlari-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114989591406409896
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtoeddyik2j

Arch Linux kullanıyorsan ve özellikle GNOME ya da KDE gibi masaüstü ortamlarından uzak durup i3wm gibi hafif çözümler tercih ediyorsan, sistem performansını kontrol etmek tamamen senin elinde! 💪

Bu yazıda, **Intel i5-13400F işlemcili, RTX 4060 Ti ekran kartlı ve i3wm kullanan** bir sistemde CPU güç yönetimini nasıl yapılandırdığımı detaylıca paylaşıyorum. Hedefimiz:
👉 Maksimum performans
👉 Düşük güç tüketimi
👉 Anlık frekans takibi
👉 Masaüstü ortamı bağımsız tam kontrol

---

## 🔍 Neden CPU Güç Yönetimi Önemlidir?

Modern CPU'lar olağanüstü güçlere sahiptir, ancak bu gücü kontrolsüz kullanmak hem ısı artışına hem de gereksiz enerji tüketimine yol açar. İşte bu yüzden;

- Sistem fanlarının sesi artar 😤
- Batarya süresi düşer (laptop’ta) 🔋
- Gereksiz ısınmalar yaşanır 🔥
- Throttling nedeniyle performans düşer 🐌

Özellikle Intel işlemcili sistemlerde `intel_pstate` sürücüsünün davranışı, doğru yapılandırılmazsa ya işlemciyi sürekli en yüksek hızda tutar ya da çok yavaş davranır.

[responsive_img src="/images/arch-linux-cpu-performans-ayarlari-xl.webp" alt="linux-cpu-performans-ayarlari" /]

---

## 🧰 1. Sistem Donanımım

Yapılandırmayı gerçekleştirdiğim sistemin bileşenleri şunlar:

- 💻 **Intel i5-13400F** (10 çekirdek: 6P+4E)
- 🎮 **Palit GeForce RTX 4060 Ti JetStream 16GB**
- 🧠 **16GB DDR5 6000MHz Team T-Force Vulcan RAM**
- 🔌 **Asus PRIME H610M-K DDR5 Anakart**
- ❄️ **Thermalright Peerless Assassin 120 SE**
- 🖥️ **MSI G244PF E2 165Hz Monitör**

Bu donanımla yüksek performans alırken aynı zamanda gereksiz güç tüketimini önlemek istedim.

---

## 🛑 2. `power-profiles-daemon` Servisinin Durumu

Arch Linux’un bazı kurulumlarında (özellikle GNOME veya KDE ile) `power-profiles-daemon` varsayılan olarak etkindir. Bu servis, sistemin enerji profillerini otomatik yönetir.

Durumunu kontrol etmek için:

```bash
systemctl status power-profiles-daemon.service
```

Eğer bu servis çalışıyorsa ve hafif bir pencere yöneticisi (örneğin i3wm) kullanıyorsan, gereksiz olabilir. Devre dışı bırakmak için:

```bash
sudo systemctl disable --now power-profiles-daemon.service
```

---

## ⚙️ 3. `cpupower` Kurulumu ve Yapılandırılması

Artık CPU frekanslarını elle yönetebileceğimiz `cpupower` aracını kurmamız gerekiyor.

### Kurulum:

```bash
sudo pacman -S cpupower
```

### Yapılandırma:

```bash
sudo nano /etc/default/cpupower
```

Dosyadaki şu satırların başındaki `#` işaretini kaldırın ve değerleri aşağıdaki gibi düzenleyin:

```bash
governor='performance'
min_freq="800MHz"
max_freq="3.3GHz"
```

> 💡 **Not:** Frekans sınırları sistemine göre değişebilir. `cpupower frequency-info` komutu ile kontrol edebilirsin.

### Servisi etkinleştir:

```bash
sudo systemctl enable --now cpupower
sudo systemctl restart cpupower
```

---

## 📊 4. Frekans Bilgisi ve Anlık İzleme

Yapılandırmanın çalıştığını teyit etmek için:

```bash
cpupower frequency-info
```

Örnek çıktı:

```
driver: intel_pstate
available cpufreq governors: performance powersave
current policy: frequency should be within 800 MHz and 3.30 GHz.
```

Her 10 saniyede bir çekirdek hızlarını görmek için:

```bash
watch -n 10 "grep 'cpu MHz' /proc/cpuinfo"
```

🧠 **Bu ne işe yarar?**
Bazı çekirdeklerin düşük, bazılarının yüksek frekansta çalıştığını görürsün. Bu, `intel_pstate` sürücüsünün dinamik güç yönetiminden kaynaklanır.

---

## 🔍 5. `intel_pstate` Sürücüsünü Anlamak

Modern Intel işlemcilerde varsayılan sürücü genellikle `intel_pstate`'tir. Bu sürücü sayesinde;

- İşlemci kendi frekansını anlık ayarlayabilir 🔄
- "performance" modunda bile çekirdekler gerektiğinde düşebilir
- Boost frekansları desteklenir ⚡

### Alternatif Sürücüler?

Bazı kullanıcılar `acpi-cpufreq` sürücüsüne geçerek `schedutil`, `ondemand`, `conservative` gibi yöneticileri kullanmak isteyebilir. Fakat 12. nesil ve üzeri işlemciler için **`intel_pstate` en iyi seçimdir.**

---

## 🧱 6. i3wm Kullanıcıları için Ekstra Tavsiyeler

Eğer masaüstü ortamı yerine i3wm kullanıyorsan, startup işlemlerini elle yapılandırmalısın. `cpupower` komutunu her açılışta otomatik çalıştırmak için:

### `.xprofile` Dosyasına Ekle:

```bash
echo 'cpupower frequency-set -g performance' >> ~/.xprofile
```

veya

### Systemd user servisi oluştur:

```ini
~/.config/systemd/user/cpupower.service
```

```ini
[Unit]
Description=Set cpupower governor
After=graphical.target

[Service]
Type=oneshot
ExecStart=/usr/bin/cpupower frequency-set -g performance

[Install]
WantedBy=default.target
```

Aktifleştir:

```bash
systemctl --user enable --now cpupower.service
```

---

## 🚀 7. İleri Düzey İnce Ayar ve Analiz Araçları

### 7.1 Boost Frekansının Durumu ve Kontrolü

Boost özelliğinin açık mı kapalı mı olduğunu kontrol etmek için:

```bash
cat /sys/devices/system/cpu/cpufreq/boost
```

- `1` ise boost açık
- `0` ise boost kapalı

Gerekirse kapatmak için:

```bash
echo 0 | sudo tee /sys/devices/system/cpu/cpufreq/boost
```

> ⚠️ Oyun veya ağır iş yüklerinde boost açık kalmalı, aksi takdirde performans düşebilir.

---

### 7.2 `turbostat` ile Detaylı İzleme

`Turbostat`, CPU çekirdeklerinin frekansı, sıcaklığı ve güç durumlarını gerçek zamanlı gösterir.

Kurulum:

```bash
sudo pacman -S linux-tools
```

Çalıştırma:

```bash
sudo turbostat
```

---

### 7.3 Güç Tüketim Analizi: `powertop` ve `powerstat`

- `powertop` sistemde en çok enerji tüketen bileşenleri tespit eder ve optimizasyon önerileri sunar.

```bash
sudo pacman -S powertop
sudo powertop
```

- `powerstat` ise anlık watt tüketimini ölçmek için kullanılır, özellikle dizüstü kullanıcıları için faydalıdır.

---

### 7.4 Dinamik Güç Yönetimi: `auto-cpufreq`

Yük ve pil durumuna göre otomatik olarak CPU governor’ını ayarlar.

Kurulum (AUR veya yay kullanarak):

```bash
yay -S auto-cpufreq
sudo auto-cpufreq --install
```

---

### 7.5 Grub Ayarlarıyla `intel_pstate` Sürücüsünü Zorlamak

Eğer `intel_pstate` sürücüsü sistemde aktif değilse, aşağıdaki adımları uygulayarak etkinleştirebilirsiniz:

```bash
sudo nano /etc/default/grub
```

`GRUB_CMDLINE_LINUX_DEFAULT` satırına aşağıdaki parametreyi ekleyin:

```
intel_pstate=active
```

Değişiklikleri kaydettikten sonra:

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
sudo reboot
```

---

### 7.6 Governor Modları Karşılaştırması

| Governor    | Açıklama                     | Kullanım Senaryosu              |
| ----------- | ---------------------------- | ------------------------------- |
| performance | Sabit yüksek frekans         | Oyun, render, yüksek performans |
| powersave   | Sabit düşük frekans          | Batarya tasarrufu               |
| schedutil   | Kernel zamanlayıcısına bağlı | Dengeli, modern                 |
| ondemand    | Yüke göre frekans artışı     | Eski sistemlerde                |

> `intel_pstate` sürücüsünde genellikle sadece `performance` ve `powersave` modları aktiftir.

---

### 7.7 Laptoplar İçin TLP ile Güç Tasarrufu

Laptop kullanıcıları için `tlp`, Wi-Fi, USB, disk gibi bileşenlerin güç tüketimini optimize eder.

Kurulum ve başlatma:

```bash
sudo pacman -S tlp
sudo systemctl enable --now tlp
```

---

## 🔗 8. Devam Etmek İsteyenler İçin

- **`turbostat`**: CPU çekirdeklerinin frekansı, sıcaklığı, güç durumu gibi verileri gerçek zamanlı izler. Performans sorunları veya ısınma problemlerini tespit etmek için faydalıdır.

- **`powertop`**: Sistem genelinde hangi bileşenlerin ne kadar enerji tükettiğini gösterir ve güç tasarrufu için öneriler sunar.

- **`auto-cpufreq`**: Yük ve pil durumuna göre CPU frekans yöneticisini otomatik olarak ayarlayarak enerji verimliliği sağlar.

---

İstersen, turbostat çıktısından küçük bir ekran görüntüsü veya örnek komut çıktısı da ekleyebiliriz. Yazının görsel olarak da desteklenmesi kullanıcı deneyimini artırır.
Başka düzenleme veya ekleme talebin varsa memnuniyetle yardımcı olurum!

## 📌 9. Yaygın Sorunlar ve Çözümler

| Sorun                                             | Çözüm                                                |                                   |
| ------------------------------------------------- | ---------------------------------------------------- | --------------------------------- |
| `cpupower: command not found`                     | `sudo pacman -S cpupower` ile kur                    |                                   |
| `intel_pstate` yerine başka sürücü kullanılıyor   | \`dmesg                                              | grep pstate\` ile sürücü kontrolü |
| Frekanslar değişmiyor gibi görünüyor              | `watch -n 1 "grep MHz /proc/cpuinfo"` ile anlık izle |                                   |
| Laptop kullanıcıları için batarya hızla tükeniyor | `governor='powersave'` olarak değiştir               |                                   |

---

## ✅ Sonuç

Bu rehberde, masaüstü ortamı kullanmadan, sadece terminal ve `cpupower` aracıyla nasıl etkili bir CPU güç yönetimi yapılandırılabileceğini adım adım gösterdim. Modern bir sistemde:

- Performansı elle yönetmek 🎯
- Frekansları anlık izlemek 🔬
- `intel_pstate` sürücüsünü doğru kullanmak 🛠️
  gibi adımlarla sisteminiz daha verimli çalışacaktır.

---



