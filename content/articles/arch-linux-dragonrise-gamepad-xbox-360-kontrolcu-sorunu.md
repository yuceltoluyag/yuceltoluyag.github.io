Title: Arch Linux'ta EA SPORTS FC 27: Türkçe Spiker ve DragonRise Gamepad Rehberi
Date: 2026-11-05 01:15
Modified: 2026-11-05 01:21
Category: Oyun
Tags: arch linux, linux oyunları, EA SPORTS FC 27, Türkçe spiker, Türkçe anlatım, dragonrise gamepad, 0079:0006, steam input, xbox 360 controller, evdev, uinput, python-evdev, steam, proton
Slug: arch-linux-dragonrise-gamepad-xbox-360-kontrolcu-sorunu
Authors: yuceltoluyag
Lang: tr
Translation: false
Status: published
Summary: Arch Linux'ta EA SPORTS FC 27 için Windows Demo dosyalarından Türkçe spikeri Linux'taki tam oyuna aktarma ve DragonRise 0079:0006 gamepad'i uinput ile sanal Xbox 360 kontrolcüsüne dönüştürme deneyimi. Dosya aktarımı, Python-evdev, kalibrasyon ve systemd kurulumu adım adım anlatılıyor.
Template: article


Arch Linux, Steam ve Proton üzerinde EA SPORTS FC 27 oynarken karşılaştığım iki ayrı sorunu ve uyguladığım çözümleri bu rehberde bir araya getirdim.

İlk bölümde, Windows sürümündeki Türkçe spiker ve yerelleştirme dosyalarını Linux'taki oyun kurulumuna aktararak Türkçe anlatımı çalıştırma sürecini anlatıyorum. İkinci bölümde ise Linux tarafından tanınmasına rağmen oyunda kullanılmayan DragonRise USB gamepad'i `uinput` üzerinden sanal Xbox 360 kontrolcüsü olarak tanıtıyorum.

Burada yalnızca sonuç adımlarını değil, ilk denemelerde karşılaştığım eksikleri, yaptığım kontrolleri ve kurulum sırasında aldığım çıktıları da korudum. Böylece hangi aşamanın neyi doğruladığı ve hangi noktaların ayrıca test edilmesi gerektiği açık kalıyor.

- **Platform:** Arch Linux, Steam ve Proton
- **Oyun:** EA SPORTS FC 27
- **Kontrolcü:** DragonRise USB PC Twin Shock / PS2 tipi çift analoglu gamepad
- **Çekirdek:** `7.2.11-zen1-1-zen`

**Sonuç:** Türkçe spiker Linux'taki oyunda çalıştı. DragonRise tarafında da fiziksel girişler, sanal Xbox kontrolcüsüne aktarıldı. Türkçe spikerin oyun içindeki hâlini gösteren video makalenin sonunda yer alıyor.

## İçindekiler

1. Sorunların tanımı
2. Türkçe spiker dosyalarının yapısı
3. Windows ve Linux oyun dosyalarını karşılaştırma
4. Türkçe spiker dosyalarını aktarma
5. Türkçe spiker görünmüyorsa
6. Linux'ta gamepad teşhisi
7. Steam Input ve XInput uyumluluğu
8. DragonRise Gamepad Fix v2 kurulumu
9. Arch Linux için kurulum betiğinin uyarlanması
10. Kalibrasyon ve tuş eşlemesi
11. Sanal kontrolcüyü doğrulama
12. Steam ve oyun içi testler
13. Hata giderme
14. Güvenlik, geri alma ve bakım
15. Sonuç ve kontrol listesi

---

# 1. Sorunların tanımı
Linux üzerinde Windows oyunları çalıştırırken her sorun aynı katmanda oluşmaz. Bu çalışmada iki farklı sorun vardı.

### Sorun A: Türkçe spiker Linux sürümünde görünmüyordu

Windows sürümündeki Türkçe spiker dosyaları Linux'taki tam oyun kurulumunda başlangıçta görünmüyordu. Önce ses arşivleri ve bunların `.toc` indeks dosyaları incelendi; ardından Türkçe yerelleştirmeyle ilişkili eksik dosyalar belirlendi ve aktarıldı. Bu işlemlerin sonunda Türkçe anlatım oyun içinde çalıştı. Çalışan sonucu makalenin sonundaki videoda görebilirsiniz.

### Sorun B: Gamepad masaüstünde çalışıyor ama oyunda çalışmıyordu
Kontrolcü Linux tarafından USB aygıtı olarak algılanıyordu. KDE'nin kontrolcü test ekranında tuşlar ve analoglar çalışıyordu. Buna rağmen oyun gamepad'i tanımıyordu.

Bu ayrım kritik öneme sahiptir:

- **USB tanıma:** Fiziksel cihaz sisteme bağlanmış mı?
- **Linux giriş sistemi:** Tuş ve eksen olayları üretiliyor mu?
- **Kontrolcü API'si:** Steam ve oyun, bekledikleri gamepad arayüzünü görüyor mu?
- **Oyun:** Kontrolcü gerçekten oyun içinde kullanılabiliyor mu?

İlk iki aşamanın çalışması, son iki aşamanın da çalışacağı anlamına gelmez.

# 2. Türkçe spiker dosyalarının yapısı
Oyunun veri dizininde Türkçe anlatımla ilişkili dosyalar şunlardı:

```text
Data/Win32/
├── commentaryfull_tur_tr.toc
├── commentarylaunch_tur_tr.toc
├── loc/
│   └── tr.toc
└── superbundlelayout/
    ├── commentaryfull_tur_tr/
    │   ├── cas_01.cas
    │   └── cas_02.cas
    ├── commentarylaunch_tur_tr/
    │   └── cas_01.cas
    ├── installpackage_00/
    │   └── tr/
    │       ├── cas_01.cas
    │       └── loc/
    │           └── tr.toc
    └── installpackage_05/
        └── tr/
            ├── cas_01.cas
            └── loc/
                └── tr.toc
```

Bu dosyaların işlevleri genel olarak şöyle düşünülebilir:

- **`.cas`:** Oyunun paketlenmiş veri arşivleri. Ses, dil veya başka oyun varlıklarını içerebilir.
- **`.toc`:** İçeriklerin bulunması ve indekslenmesiyle ilişkili tablo dosyaları.
- **`loc/tr.toc`:** Türkçe yerelleştirme ile ilişkili indeks dosyası.
- **`commentaryfull_tur_tr`:** Tam Türkçe anlatım içeriğiyle ilişkili veri grubu.
- **`commentarylaunch_tur_tr`:** Açılış veya başlangıç anlatımıyla ilişkili veri grubu olabilir.

Dosya adları, içeriklerin kesin olarak ne içerdiğini tek başına kanıtlamaz. Ancak dosya boyutları ve oyunun veri düzeni, hangi dosyaların aktarılması gerektiğini araştırırken yararlı ipuçları sağlar.


Örnek boyutlar:

| Dosya | Yaklaşık boyut |
| --- | --- |
| `commentaryfull_tur_tr.toc` | 202 KiB |
| `commentarylaunch_tur_tr.toc` | 923 bayt |
| `commentaryfull_tur_tr/cas_01.cas` | 1,0 GiB |
| `commentaryfull_tur_tr/cas_02.cas` | 383 MiB |
| `commentarylaunch_tur_tr/cas_01.cas` | 4 KiB |
| `installpackage_00/tr/cas_01.cas` | 12 KiB |
| `installpackage_05/tr/cas_01.cas` | 4,27 MiB |


Bu boyutlar, Türkçe anlatım arşivlerinin önemli miktarda veri içerdiğini gösterir. Sadece küçük indeks dosyalarını kopyalamak yeterli olmayabilir.

# 3. Windows ve Linux oyun dosyalarını karşılaştırma
Önce Windows'taki Demo kurulumunda Türkçe anlatım dosyalarının mevcut olduğu doğrulandı.

Windows kaynak dizini:

```bash
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
```
Linux hedef dizini:

```bash
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
```
Bu yollar başka bir bilgisayarda farklı olacaktır. Kendi kurulum dizinlerinizi kullanın.

## 3.1. Linux'ta hangi dosyaların bulunduğunu kontrol etme
```bash
cd "/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
ls -lh commentary*tur_tr.toc
```
Beklenen dosyalar şunlardı:

```text
commentaryfull_tur_tr.toc
commentarylaunch_tur_tr.toc
```
Bu iki dosya aktarılmış olmasına rağmen bu aşamada oyun hâlâ Türkçe anlatımı sunmuyordu.

Buradan çıkan sonuç, iki `.toc` dosyasının tek başına yeterli olmadığıydı. İlgili `.cas` arşivleri ve yerelleştirme dosyaları da birlikte değerlendirilmeliydi.

## 3.2. Eksik dosyaları sistematik olarak belirleme
Her dosyayı tek tek kontrol etmek için:

```bash
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
for f in \
  "loc/tr.toc" \
  "superbundlelayout/installpackage_00/tr/cas_01.cas" \
  "superbundlelayout/installpackage_00/tr/loc/tr.toc" \
  "superbundlelayout/installpackage_05/tr/cas_01.cas" \
  "superbundlelayout/installpackage_05/tr/loc/tr.toc"
do
  echo
  echo "=== $f ==="
  if [[ -f "$SRC/$f" ]]; then
    stat -c 'Windows: %s bayt' "$SRC/$f"
  else
    echo "Windows: BULUNAMADI"
  fi
  if [[ -f "$DST/$f" ]]; then
    stat -c 'Linux:   %s bayt' "$DST/$f"
  else
    echo "Linux:   EKSİK"
  fi
done
```
Bu kontrol, Windows tarafında bulunan beş dosyanın Linux tarafında eksik olduğunu gösterdi.

Dosya boyutlarını karşılaştırmak, kopyalama işleminin gerçekten yapılıp yapılmadığını belirlemenin basit bir yoludur.

# 4. Türkçe spiker dosyalarını aktarma
İlk aktarımda şu dosyalar kopyalandı:

- `commentaryfull_tur_tr.toc`
- `commentarylaunch_tur_tr.toc`
- `superbundlelayout/commentaryfull_tur_tr/cas_01.cas`
- `superbundlelayout/commentaryfull_tur_tr/cas_02.cas`
- `superbundlelayout/commentarylaunch_tur_tr/cas_01.cas`

Daha sonra eksik bulunan beş yerelleştirme dosyası da aktarıldı.

## 4.1. Güvenli aktarım betiği
Aşağıdaki betik, belirli dosyaları Windows kaynak dizininden Linux hedef dizinine kopyalamak için hazırlanmıştır. Hedefte dosya varsa önce yedek alır.

`~/turkce-dil-tamamla.sh` adlı dosyaya kaydedilebilir:

```bash
#!/usr/bin/env bash
set -euo pipefail
SRC="/home/friday13/Desktop/EA SPORTS FC 27 Demo/Data/Win32"
DST="/mnt/steam_depo/EA SPORTS FC 27/game/game/Data/Win32"
FILES=(
  "loc/tr.toc"
  "superbundlelayout/installpackage_00/tr/cas_01.cas"
  "superbundlelayout/installpackage_00/tr/loc/tr.toc"
  "superbundlelayout/installpackage_05/tr/cas_01.cas"
  "superbundlelayout/installpackage_05/tr/loc/tr.toc"
)
# Kaynakların tamamını kopyalamadan önce doğrula.
for f in "${FILES[@]}"; do
  if [[ ! -f "$SRC/$f" ]]; then
    echo "Kaynak dosya bulunamadı: $SRC/$f"
    exit 1
  fi
done
echo "Kaynak: FC 27 Demo"
echo "Hedef:  FC 27"
echo "Sürümler farklıysa dosyalar uyumsuz olabilir."
read -r -p "Devam etmek için evet yaz: " answer
[[ "$answer" == "evet" ]] || exit 0
BACKUP="$DST/turkce-locale-backup-$(date +%Y%m%d-%H%M%S)"
backup_needed=0
for f in "${FILES[@]}"; do
  if [[ -e "$DST/$f" ]]; then
    backup_needed=1
  fi
done
if (( backup_needed )); then
  mkdir -p "$BACKUP"
  for f in "${FILES[@]}"; do
    if [[ -e "$DST/$f" ]]; then
      mkdir -p "$BACKUP/$(dirname "$f")"
      cp -a "$DST/$f" "$BACKUP/$f"
    fi
  done
  echo "Yedek: $BACKUP"
fi
for f in "${FILES[@]}"; do
  mkdir -p "$DST/$(dirname "$f")"
  cp -av "$SRC/$f" "$DST/$f"
done
echo "Türkçe yerelleştirme dosyaları kopyalandı."
```
Çalıştırmak için:

```bash
chmod +x ~/turkce-dil-tamamla.sh
bash ~/turkce-dil-tamamla.sh
```
Bu betik yalnızca tanımlanmış beş dosyayı kopyalar. Büyük anlatım arşivleri için ilk aktarımın ayrıca yapılmış olması gerekir.

## 4.2. Önemli sınırlama: Demo ile tam oyun aynı sürüm olmayabilir
İncelenen yapılandırma dosyalarında sürüm farkı vardı:

**Linux'taki oyun:**

```text
Name       EA SPORTS FC 27
Version    1.0.140.52122
ContentId  16425884
```
**Windows'taki Demo:**

```text
Name       EA SPORTS FC 27 Lite
Version    1.0.141.12554
ContentId  16425884_sc
```
Bu farkı not etmek önemli. Demo ve tam sürüm farklı sürüm numaraları ve paket kimlikleri kullanıyordu. Buna rağmen bu kurulumda yapılan aktarımın sonunda Türkçe spiker çalıştı. Bu deneyim, farklı sürümlere ait dosyaların her kurulumda sorunsuz çalışacağı anlamına gelmez; başka bir sürümde aynı işlemi yapmadan önce yedek almak ve sonucu oyun içinde doğrulamak gerekir.

Bu nedenle:

- Dosyaların kopyalanması başarılı olabilir, fakat oyun bunları kullanmayabilir.
- `.toc` indeksleri ile `.cas` arşivleri birbirleriyle uyumlu olmalıdır.
- Başka sürümden alınan dosyalar oyun güncellemesinden sonra çalışmaz hâle gelebilir.
- Kaynak ve hedef dosyaların yedeği tutulmalıdır.

## 4.3. Bütün `Win32` dizinini kopyalamak doğru mu?
Eksik dosyaları belirledikten sonra Windows'taki `Win32` dizininin tamamını aktarma yöntemi de denendi. Türkçe spikerin çalıştığı sonuç bu aktarım sürecinin ardından elde edildi. Bununla birlikte, bütün dizini kopyalamak her sistem için güvenli bir ilk adım değildir. Çünkü:

- Linux'taki tam oyunun kendine ait veri paketleri üzerine yazılabilir.
- Demo sürümüne özel veya farklı sürümle uyumsuz dosyalar hedefe taşınabilir.
- Yüzlerce megabayt veya gigabaytlık veri gereksiz yere kopyalanabilir.
- Oyun güncellemeleri veya dosya doğrulaması değişiklikleri geri alabilir.

Daha kontrollü yaklaşım, önce eksik dosyaları belirlemek ve mümkünse yalnızca gerekli dosyaları yedek alarak aktarmaktır. Bu makaledeki tam dizin aktarımı, benim kullandığım kurulumda işe yarayan deneyimdir; farklı oyun sürümlerinde aynı yöntemi uygulamadan önce yedek alın.

Tam `Win32` kopyalamasından sonra oyun açılmıyor veya hatalı çalışıyorsa Steam'in dosya doğrulama özelliğiyle orijinal dosyaları geri yüklemek gerekebilir.

# 5. Türkçe spiker hâlâ görünmüyorsa
Dosyaların varlığı ile oyunun bunları tanıması farklı şeylerdir.

Şu kontrolleri sırayla yapın:

1. Oyunun içindeki anlatım dili ayarlarını yeniden kontrol edin.

2. Oyun tamamen kapatılıp yeniden başlatıldıktan sonra dil seçeneğinin değişip değişmediğine bakın.

3. Steam'in oyun dosyası doğrulaması yapılmadan önce yedek alın.

4. Windows kaynak ve Linux hedef dosyalarının boyutlarını karşılaştırın.

5. `.toc` dosyalarının ilgili `.cas` arşivleriyle aynı sürüme ait olup olmadığını kontrol edin.

6. Oyunun yapılandırma dosyasındaki dil seçeneklerini inceleyin.

Bu çalışmada yapılandırma dosyalarında `tr_TR` zaten dil listesinde bulunuyordu. Dil listesinde Türkçenin bulunması, Türkçe ses paketinin eksiksiz olduğu anlamına gelmez.

Bir oyunun dil seçeneklerinde `all` gibi bir değer kullanılması, mevcut bütün dilleri etkinleştirmeye yardımcı olabilir; fakat bu, eksik veya uyumsuz ses arşivlerini kendiliğinden oluşturmaz.

Bu rehberdeki kurulumda Türkçe spiker çalıştı. Başka bir kurulumda aynı sonucu alamazsanız yukarıdaki kontrolleri sırayla uygulayın. Oyun içindeki başarılı sonucu makalenin sonundaki videoda gösteriyorum.

---

# 6. Linux'ta DragonRise gamepad teşhisi
İkinci sorunda kullanılan kontrolcü, Linux'ta şu USB kimliğiyle görünüyordu:

```text
0079:0006 DragonRise Inc. PC TWIN SHOCK Gamepad
```
`lsusb` çıktısında kontrolcü görünüyordu. `/dev/input/by-id/` dizininde ise şu bağlantılar mevcuttu:

```text
usb-DragonRise_Inc._Generic_USB_Joystick-event-joystick
usb-DragonRise_Inc._Generic_USB_Joystick-joystick
```
Bu, Linux çekirdeğinin kontrolcüyü tanıdığını gösteriyordu.

## 6.1. USB bağlantısını kontrol etme
```bash
lsusb
```
Şu satırı arayın:

```text
ID 0079:0006 DragonRise Inc. PC TWIN SHOCK Gamepad
```
Burada `0079` üretici kimliği, `0006` ürün kimliğidir.

Bu kimlik farklı fiziksel kontrolcülerde de kullanılabildiğinden, aynı USB kimliğine sahip her kontrolcünün aynı tuş düzenini kullandığı varsayılmamalıdır.

## 6.2. Giriş aygıtlarını kontrol etme
```bash
ls -l /dev/input/by-id/
```
Ardından:

```bash
cat /proc/bus/input/devices
```
Fiziksel cihaz için aşağıdakine benzer bir bölüm görülmüştü:

```text
N: Name="DragonRise Inc.   Generic   USB  Joystick"
H: Handlers=event9 js0
```
Burada:

- `event9`, Linux'un evdev arayüzüdür.
- `js0`, eski Linux joystick API'sidir.

KDE'nin kontrolcü test ekranında tuşların çalışması, fiziksel cihazın giriş olaylarını ürettiğini doğruladı.

Bu nedenle sorunun doğrudan USB bağlantısı veya tamamen eksik bir çekirdek sürücüsü olması olası görünmüyordu.

## 6.3. `evtest` ile fiziksel kontrolcüyü test etme
```bash
sudo evtest
```
Listeden fiziksel DragonRise cihazını seçin.

Tuşlara ve analoglara basıldığında `EV_KEY` veya `EV_ABS` olaylarının görünmesi gerekir.

Örnek:

```text
Event: type 3 (EV_ABS), code 0 (ABS_X), value -16384
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 1
```
Bunlar sırasıyla bir analog eksen hareketi ve bir tuş basışını gösterir.

Bu test, fiziksel kontrolcünün Linux giriş sistemi üzerinden çalıştığını doğrulamak için kullanılır. Ancak oyunun kontrolcüyü tanıdığını tek başına kanıtlamaz.

# 7. Steam Input, XInput ve Linux kontrolcü arayüzleri
Windows'ta kullanılan XOutput benzeri yazılımlar, bazı kontrolcüleri oyunların beklediği Xbox/XInput biçimine dönüştürebilir.

Linux'ta da benzer bir ihtiyaç ortaya çıkabilir.

Linux'un fiziksel kontrolcü için sunduğu `evdev` olayları ile oyunun veya Steam'in beklediği kontrolcü arayüzü farklı olabilir. Steam Input bu uyumluluk katmanlarından biridir. Başka bir çözüm, `uinput` üzerinden sanal bir Xbox kontrolcüsü oluşturmaktır.

Temel fark:

- **Fiziksel cihaz:** DragonRise USB gamepad.
- **Giriş kaynağı:** Linux `evdev` olayları.
- **Eşleme:** Fiziksel tuş ve eksenleri sanal Xbox tuş ve eksenlerine dönüştürme.
- **Sanal cihaz:** Linux'a Xbox 360 kontrolcüsü olarak sunulan yeni giriş aygıtı.
- **Tüketici:** Steam veya oyun.

Bu yaklaşımın amacı, oyuna fiziksel cihazın kendisini değil, daha yaygın Xbox kontrolcü düzenini sunmaktır.

# 8. DragonRise Gamepad Fix v2 kurulumu
Bu çalışmada kullanılan depo:

`https://github.com/linsaftw/dragonrise-gamepad-fix`

Depo, `0079:0006` kimliğine sahip belirli genel USB kontrolcüler için bir eşleme hizmeti içeriyordu.

İlk olarak kaynak kod indirildi:

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone https://github.com/linsaftw/dragonrise-gamepad-fix.git
cd dragonrise-gamepad-fix
```
Dosyaları kontrol edin:

```bash
ls
```
Depoda şu dosya ve dizinler bulunuyordu:

```text
bin/
config/
diagnose.sh
install.sh
src/
systemd/
udev/
uninstall.sh
VERSION
```
## 8.1. Depodaki Ubuntu kurulum betiği neden değiştirilmeliydi?
Depodaki orijinal `install.sh`, paket yönetimi için Ubuntu/Debian komutları kullanıyordu:

```bash
dpkg-query
apt-get
apt-cache
```
Arch Linux'ta bu komutlar standart paket yönetimi yöntemi değildir.

Arch Linux'ta karşılık gelen araçlar:

- Paket kontrolü: `pacman -Q`
- Paket kurulumu: `pacman -S`
- Python evdev paketi: `python-evdev`
- Test aracı: `evtest`

Bu yüzden kurulum betiği Arch Linux'a uyarlanmalıydı.

## 8.2. `uinput` modülünü etkinleştirme
Sanal kontrolcü oluşturmak için:

```bash
sudo modprobe uinput
```
Ardından:

```bash
ls -l /dev/uinput
```
Çıktıda aygıtın görünmesi gerekir.

Bu çalışmada:

```text
crw-rw----+ 1 root root 10, 223 ... /dev/uinput
```
sonucu alındı.

`uinput`, kullanıcı alanındaki bir programın sanal giriş aygıtı oluşturmasını sağlar. Buradaki eşleme hizmeti, fiziksel kontrolcü olaylarını okuyup sanal Xbox cihazına yeni olaylar gönderir.

Kalıcı olarak yüklenmesi için:

```bash
echo uinput | sudo tee /etc/modules-load.d/dragonrise-gamepad-fix.conf
```
## 8.3. Python bağımlılığını kontrol etme
```bash
python -c 'import evdev; print(evdev.__file__)'
```
Çalışan sistemde şu tür bir yol döndü:

```text
/usr/lib/python3.14/site-packages/evdev/__init__.py
```
Bu, `evdev` Python modülünün mevcut olduğunu gösterir.

Arch Linux'ta gerekli paketleri kurmak için:

```bash
sudo pacman -S --needed python-evdev evtest
```
Paketler zaten kuruluysa `--needed` gereksiz yeniden kurulumları önlemeye yardımcı olur.

---

# 9. Arch Linux için kurulum betiğinin uyarlanması
Uyarlanan `install.sh` şu işleri yapacak şekilde düzenlendi:

1. Root yetkisiyle çalıştığını kontrol eder.

2. `python-evdev` ve `evtest` paketlerinin mevcut olup olmadığını denetler.

3. `uinput` modülünü yükler.

4. Önceki kurulumun önemli dosyalarını yedekler.

5. Eski eşleme hizmetlerini durdurur.

6. Python dosyalarını `/usr/local/lib/dragonrise-gamepad-fix/` dizinine yerleştirir.

7. Komut dosyalarını `/usr/local/bin/` dizinine yükler.

8. Eşleme profilini `/etc/dragonrise-gamepad-fix/profile.json` dizinine kopyalar.

9. systemd hizmetini ve udev kuralını yükler.

10. Kontrolcüyü kalibre eder.

11. Hizmeti etkinleştirip sanal Xbox kontrolcüsünün oluştuğunu doğrular.

## 9.1. Betiği kurmadan önce kontrol etme
Betiğin sözdizimini kontrol edin:

```bash
bash -n install.sh
```
Python kaynak dosyalarını derleme kontrolünden geçirin:

```bash
python -m py_compile src/*.py
```
Bu iki kontrol de hata vermeden tamamlandı.

Ancak bu kontroller yalnızca sözdizimi ve Python derleme düzeyinde doğrulama sağlar. Hizmetin çalışma zamanında başarılı olacağını tek başlarına garanti etmezler.

## 9.2. Kurulumu çalıştırma
```bash
sudo ./install.sh
```
Bu çalışmada kurulum sırasında cihaz otomatik olarak algılandı:

```text
Found: DragonRise Inc.   Generic   USB  Joystick   at /dev/input/event9
```
Ancak program tam olarak bilinen bir donanım parmak izini seçemedi:

```text
No exact built-in fingerprint selected; starting verified pair calibration.
```
Bu nedenle otomatik profil yerine etkileşimli kalibrasyon başlatıldı.

Bu bir kurulum hatası değildi. Kontrolcünün aynı USB kimliğini kullanmasına rağmen depo içindeki belirli otomatik profil ile tam eşleşmediğini gösteriyordu.

## 9.3. Kurulumun yaptığı değişikliklere dikkat edin
Kurulum betiği yalnızca yeni dosyalar eklemez. Önceden kurulmuş bazı hizmetleri de durdurabilir:

```bash
pkill -x xboxdrv
systemctl disable --now ng2131-gamepad.service
systemctl disable --now dragonrise-gamepad-fix.service
```
Ayrıca fiziksel cihazı udev üzerinden oyun API'lerinden gizlemeye yönelik bir kural yükler.

Bu nedenle kurulumdan önce:

- Steam'i kapatın.
- Oyunu kapatın.
- `xboxdrv`, AntiMicroX veya Input Remapper gibi başka bir eşleme yazılımının aynı kontrolcüyü kullanmadığından emin olun.
- Varsa eski hizmet ve yapılandırmalarınızın yedeğini alın.

Birden fazla eşleme katmanı aynı anda kullanılırsa tuşlar iki kere gönderilebilir veya kontrolcü yanlış algılanabilir.

---

# 10. Kalibrasyon ve tuş eşlemesi

Kurulum sırasında fiziksel kontrolcüdeki yönler ve yüz tuşları tek tek test edildi.

Kalibrasyon şu eşlemeleri doğruladı:

| Fiziksel kontrol | Kaynak olay | Sanal Xbox kontrolü |
| --- | --- | --- |
| D-pad yukarı/aşağı | `ABS_HAT0Y` | D-pad yukarı/aşağı |
| D-pad sol/sağ | `ABS_HAT0X` | D-pad sol/sağ |
| Sağ analog yukarı/aşağı | `ABS_RZ` | `ABS_RY` |
| Sağ analog sol/sağ | `ABS_RX` | `ABS_RX` |
| Çarpı / alt | `BTN_THUMB2` | A |
| Daire / sağ | `BTN_THUMB` | B |
| Kare / sol | `BTN_TOP` | X |
| Üçgen / üst | `BTN_TRIGGER` | Y |

Bu tablo, kalibrasyon sırasında elde edilen fiziksel olaylarla profilin sanal kontrolcüye uyguladığı eşlemeyi gösterir.

## 10.1. Kalibrasyon sırasında neler oldu?
Program önce D-pad yönlerini doğruladı:

```text
Captured ABS_HAT0Y (negative direction).
Captured ABS_HAT0Y (positive direction).
Verified D-PAD UP/D-PAD DOWN on ABS_HAT0Y.
```
Ardından sol ve sağ yönler, sağ analogun dört yönü ve dört yüz tuşu doğrulandı.

Sonuç:

```text
Calibration saved. Every axis pair and all four face buttons were verified.
```
Bu mesaj, eşleme profilinin kaydedildiğini ve kalibrasyonun başarıyla tamamlandığını gösterir.

**Not:** Kalibrasyon, tuşların fiziksel kaynaklarını doğru yakaladığını gösterir. Her ek tuşun veya her oyunun beklediği bütün girişlerin kusursuz çalıştığını ayrıca test etmek gerekir.

---

# 11. Sanal kontrolcüyü doğrulama
Kurulumun sonunda şu komut çalıştırıldı:

```bash
systemctl is-active dragonrise-gamepad-fix.service
```
Sonuç:

```text
active
```
Bu, hizmetin çalışır durumda olduğunu gösterir.

Kalıcı otomatik başlatma durumunu görmek için:

```bash
systemctl is-enabled dragonrise-gamepad-fix.service
```
Beklenen sonuç:

```text
enabled
```
Ardından:

```bash
./diagnose.sh
```
Tanılama çıktısında sanal kontrolcü şu şekilde görünüyordu:

```text
I: Bus=0003 Vendor=045e Product=028e Version=0200
N: Name="Xbox 360 Controller (DragonRise Fixed)"
P: Phys=dragonrise-gamepad-fix/input0
H: Handlers=event21 js1
```
Burada:

- `045e:028e`, Xbox 360 kontrolcüsünü temsil etmek üzere kullanılan USB kimliğidir.
- `event21`, sanal cihazın evdev giriş arayüzüdür.
- `js1`, sanal cihazın joystick arayüzüdür.

Fiziksel kontrolcü `js0` iken sanal kontrolcünün `js1` olması normaldir; bu numaralar sistemdeki aygıtların sıralamasına göre değişebilir.

## 11.1. Sanal kontrolcüyü `evtest` ile test etme
Şu komut kullanıldı:

```bash
sudo evtest /dev/input/event21
```
Çıktıdaki desteklenen olaylar arasında şu girişler vardı:

```text
BTN_SOUTH
BTN_EAST
BTN_NORTH
BTN_WEST
BTN_TL
BTN_TR
BTN_SELECT
BTN_START
BTN_THUMBL
BTN_THUMBR
```
Analog eksenler de görünüyordu:

```text
ABS_X
ABS_Y
ABS_Z
ABS_RX
ABS_RY
ABS_RZ
ABS_HAT0X
ABS_HAT0Y
```
Gerçek testte analog hareketleri ve tuş basışlarını gösteren olaylar geldi:

```text
Event: type 3 (EV_ABS), code 0 (ABS_X), value -16384
```
ve:

```text
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 1
Event: type 1 (EV_KEY), code 304 (BTN_SOUTH), value 0
```
`value 1`, tuşun basıldığını; `value 0`, tuşun bırakıldığını gösterir.

Bu sonuç, fiziksel kontrolcüden gelen olayların sanal Xbox cihazına aktarıldığını doğruladı.

**Bu noktada Linux tarafındaki temel eşleme çalışıyordu.** Bundan sonraki test, Steam'in ve oyunun bu sanal cihazı kullanıp kullanmadığını belirlemekti.

---

# 12. Steam ve oyun içi testler
Sanal Xbox kontrolcüsü oluşturulmuş olsa bile Steam'in veya oyunun bunu kullanması ayrıca doğrulanmalıdır.

Önerilen test sırası:

1. Steam'i tamamen kapatın.

2. `dragonrise-gamepad-fix.service` hizmetinin çalıştığını doğrulayın.

3. Steam'i yeniden açın.

4. Steam'in kontrolcü ayarlarından Xbox kontrolcüsünün görünüp görünmediğine bakın.

5. Oyunun kontrolcü özelliklerinde Steam Input'u devre dışı bırakarak deneyin.

6. Oyun içinde menü tuşlarını, yönleri ve analogları test edin.

Sanal Xbox cihazı zaten mevcut olduğundan ilk denemede ayrıca bir eşleme yazılımı kullanmayın.

Steam Input bazı oyunlarda ek uyumluluk sağlayabilir; bazılarında ise zaten Xbox biçiminde sunulan kontrolcünün üzerine ikinci bir eşleme katmanı ekleyebilir. Bu nedenle devre dışı bırakma ve etkinleştirme seçenekleri gerektiğinde ayrı ayrı test edilmelidir.

Bir oyunda çalışmayan kontrolcünün nedeni her zaman sürücü değildir. Oyun başlatma parametreleri, Proton sürümü, Steam Input profili veya oyunun kontrolcü algılama davranışı da etkili olabilir.

---

# 13. Hata giderme
## 13.1. Fiziksel kontrolcü görünmüyor
```bash
lsusb
ls -l /dev/input/by-id/
```
`0079:0006` görünmüyorsa USB portunu, kabloyu ve fiziksel bağlantıyı kontrol edin.

## 13.2. Fiziksel kontrolcü çalışıyor ama sanal cihaz yok
```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
journalctl -u dragonrise-gamepad-fix.service -b -n 100 --no-pager
```
Ayrıca:

```bash
ls -l /dev/uinput
```
Sanal cihazın oluşturulamadığı durumlarda hizmet günlükleri, uinput erişimi ve Python bağımlılıkları incelenmelidir.

## 13.3. Hizmet çalışıyor ama oyun kontrolcüyü görmüyor
```bash
grep -A 8 -B 2 'Xbox 360 Controller (DragonRise Fixed)' \
  /proc/bus/input/devices
```
Sanal kontrolcü görünüyorsa:

```bash
sudo evtest /dev/input/event21
```
Buradaki `event21` yalnızca bu kurulumdaki örnektir. Aygıt numarası yeniden başlatma veya yeniden bağlama sonrasında değişebilir. Doğru numarayı `diagnose.sh` veya `/proc/bus/input/devices` çıktısından belirleyin.

Sanal kontrolcüde olaylar görünüyorsa Steam ve oyun tarafına odaklanın.

## 13.4. Tuşlar yanlış eşlenmiş
Önce fiziksel kontrolcünün kendi olaylarını test edin. Ardından sanal kontrolcünün olaylarıyla karşılaştırın.

Bir tuşun fiziksel adıyla Xbox'taki karşılığı farklı olabilir. Örneğin Linux'un `BTN_SOUTH` sembolü Xbox düzeninde A tuşu olarak kullanılır.

Kalibrasyonu tekrar yapmak gerekirse depodaki `--force-calibration` seçeneğinin ne yaptığını kontrol edin. Bilinmeyen bir fiziksel kart için kalibrasyon yapmak anlamlıdır; ancak çalışan bir profili gereksiz yere değiştirmeyin.

## 13.5. İki kez tuş basılıyor
Aynı anda Steam Input, `xboxdrv`, başka bir eşleme programı ve bu hizmet kullanılıyorsa girişler birden fazla yoldan iletilebilir.

Önce diğer eşleme programlarını kapatın. Sanal Xbox kontrolcüsünü tek giriş kaynağı olarak kullanıp tekrar test edin.

## 13.6. Oyun güncellemesinden sonra sorun çıktı
Oyun dosyaları değişmiş veya dil paketlerinin indeksleri yenilenmiş olabilir. Türkçe spiker dosyalarını tekrar kopyalamadan önce kaynak ve hedef sürümleri karşılaştırın.

Gamepad tarafında ise:

```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
./diagnose.sh
```
komutlarıyla hizmet ve sanal kontrolcünün durumunu kontrol edin.

---

# 14. Güvenlik, geri alma ve bakım
## 14.1. Yedeklerin önemi
Kurulum betiği önceki kurulumun bazı dosyalarını şu tür bir dizine yedekler:

```text
/var/backups/dragonrise-gamepad-fix-v2-YYYYMMDD-HHMMSS
```
Gerçek yedek dizini kurulum çıktısında gösterilir.

Bu yedekleri silmeden önce yeni sürümün sorunsuz çalıştığından emin olun.

## 14.2. Hizmeti yeniden başlatma
```bash
sudo systemctl restart dragonrise-gamepad-fix.service
```
Durumunu görmek için:

```bash
systemctl status dragonrise-gamepad-fix.service --no-pager
```
Günlükleri canlı izlemek için:

```bash
journalctl -u dragonrise-gamepad-fix.service -f
```
## 14.3. Kaldırma
Depoda `uninstall.sh` bulunduğundan, kaldırma işlemi için önce betiğin içeriğini inceleyin:

```bash
cat uninstall.sh
```
Ardından neyi sildiğini ve hangi aygıtları etkilediğini anladıktan sonra çalıştırın:

```bash
sudo ./uninstall.sh
```
Kaldırma sonrasında fiziksel kontrolcüyü çıkarıp yeniden bağlamak gerekebilir. Hizmetin kaldırılması, oyun dosyalarındaki Türkçe spiker değişikliklerini geri almaz; bunlar ayrı bir işlemdir.

## 14.4. Yapılandırma ve lisans bilgileri
Oyun yapılandırmalarını paylaşırken kullanıcı kimliklerini, Denuvo token'larını, lisans anahtarlarını veya diğer oturum verilerini yayımlamayın.

Bir yapılandırma karşılaştırması için çoğunlukla `Name`, `Version`, `ContentId` ve `Languages` gibi alanlar yeterlidir. Gizli veya kişisel değerleri paylaşmadan önce çıkarın.

---

# 15. Sonuç
Bu çalışmanın en önemli sonucu, Linux'ta oyun sorunlarını doğru katmanda teşhis etmenin ne kadar önemli olduğudur.

Türkçe spiker için Windows Demo kurulumundaki Türkçe anlatım ve yerelleştirme dosyalarını Linux'taki tam oyunla karşılaştırdım. İlk aşamada yalnızca `.toc` dosyalarını aktarmak yeterli olmadı; ilgili veri dosyalarının da aktarılması gerekti. Bu işlemlerin ardından Türkçe spiker oyun içinde çalıştı. Demo ile tam oyun arasındaki sürüm farkına rağmen bu kurulumda sonuç alabildim; yine de farklı sürümlerde dosya uyumluluğu ayrıca kontrol edilmeli.

Gamepad konusunda fiziksel cihaz baştan beri Linux tarafından tanınıyordu. KDE testi ve fiziksel `evtest` çıktısı bunu gösterdi. Sorun, oyunun beklediği kontrolcü arayüzüyle ilgiliydi. `uinput` tabanlı eşleme hizmeti, DragonRise girişlerini `Xbox 360 Controller (DragonRise Fixed)` adlı sanal aygıta aktardı.

Sanal cihazın oluşturulması, hizmetin `active` olması ve `evtest` üzerinde tuş/analog olaylarının görülmesi, eşleme katmanının çalıştığını doğruladı. Son aşamada Steam ve oyunun bu sanal cihazı kullanması ayrıca kontrol edilmelidir.

## Kurulum sonrası kontrol listesi
- [ ] Türkçe spiker kaynak ve hedef dosyalarının sürüm uyumluluğu kontrol edildi.
- [ ] Dosyalar kopyalanmadan önce yedek alındı.
- [ ] `uinput` modülü mevcut.
- [ ] `python-evdev` ve `evtest` kurulu.
- [ ] DragonRise fiziksel cihazı Linux tarafından tanınıyor.
- [ ] Kalibrasyon profili başarıyla kaydedildi.
- [ ] `dragonrise-gamepad-fix.service` etkin ve çalışır durumda.
- [ ] Sanal Xbox kontrolcüsü `/proc/bus/input/devices` içinde görünüyor.
- [ ] `evtest` üzerinde sanal kontrolcüden tuş ve analog olayları geliyor.
- [ ] Steam kontrolcü ayarlarında cihaz kontrol edildi.
- [ ] Oyun içinde kontrolcü ayrıca test edildi.

**Türkçe spikerin oyun içindeki çalışır hâli:**



<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="_Q4KK6kE1M4"></lite-youtube>