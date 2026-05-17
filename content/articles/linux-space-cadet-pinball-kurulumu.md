Title: Linux'ta Nostalji Rüzgarı: Space Cadet Pinball ve O Gizli Sabahlar
Date: 2026-05-11 19:12
Category: Oyun
Tags: linux, space cadet pinball, nostalji, windows xp, arch linux, flatpak, aur
Slug: linux-space-cadet-pinball-kurulumu
Authors: yuceltoluyag
Summary: Windows XP döneminin efsanesi Space Cadet Pinball'u Linux'a getiriyoruz. Hem duygusal bir yolculuk hem de 1024x768 çözünürlük artırma rehberi.
Image: images/space-cadet-pinball-linux-xl.webp
Lang: tr
Status: published

İnternetin Türkiye’de henüz bu kadar yaygın olmadığı, her sabah okula gitmeden önce ailenin "elektronik eşya" alerjisine rağmen gizli saklı bilgisayarı açtığımız o büyülü günleri hatırlar mısınız? CRT monitörün o hafif cızırtılı sesi eşliğinde, hoparlörün sesini en kısığa getirip, Windows XP’nin o meşhur `Space Cadet Pinball` oyununu başlatırdık. Solitaire çok sıkıcıydı, Mayın Tarlası ise o yaşlarda fazla karmaşıktı; ama o topun sesi, o ışıklar... İşte o gerçek bir kaçıştı.

"Old but gold" deyiminin tam karşılığı olan bu efsane, aslında tersine mühendislik sayesinde bugün Linux makinelerimizde her zamankinden daha canlı. Gelin bu nostaljiyi modern sistemlerimize nasıl taşırız, beraber bakalım.

## 🛠️ Kurulum: Arch Yolu ve Diğerleri

Arch Linux kullanıcısı olarak benim favorim tabii ki AUR üzerinden gitmek; ancak Flatpak’in de kendine has bir pratikliği var. Her iki yolu da buraya bırakıyorum.

### 1. Arch Linux (AUR) Yöntemi
Eğer bir Arch kurduysanız, Playwright yazımda bahsettiğim o `yuceltoluyag@archlinux` terminal disipliniyle devam edelim:

```bash
yuceltoluyag@archlinux:~$ yay -S space-cadet-pinball-git
```

### 2. Flatpak Yöntemi
Eğer sistemler arası taşınabilirlik isterseniz, Flathub imdadımıza yetişiyor:

```bash
yuceltoluyag@archlinux:~$ flatpak install com.github.k4zmu2a.spacecadetpinball
```

## 🚀 Teknik "Level Up": 1024x768 Çözünürlük (Full Tilt!)

Orijinal oyun 480p çözünürlükteydi ve modern monitörlerde biraz "çamur" gibi görünebilir. Ancak zamanında "Full Tilt! Pinball" adıyla satılan versiyonun veri dosyalarını kullanarak çözünürlüğü devasa (evet o zamanlar için devasaydı) **1024x768** seviyesine çıkarabiliriz.

### Nasıl Yapılır? (Flatpak için)
1.  Oyunu en az bir kere çalıştırın ki veri klasörü oluşsun.
2.  `Archive.org` üzerinden "Full Tilt Pinball" verilerini bulun ve `CADET.ZIP` içindekileri şu klasöre boşaltın:
    ```bash
    yuceltoluyag@archlinux:~$ cd ~/.var/app/com.github.k4zmu2a.spacecadetpinball/data/SpaceCadetPinball
    yuceltoluyag@archlinux:~$ unzip ~/Downloads/CADET.ZIP
    ```
3.  Eski düşük çözünürlüklü dosyaların oyun tarafından öncelikli görülmemesi için onları temizlememiz gerekebilir (Sudo gerekebilir):
    ```bash
    yuceltoluyag@archlinux:~$ sudo rm -r $(flatpak info --show-location com.github.k4zmu2a.spacecadetpinball)/files/extra/Pinball
    ```

## 🧠 Küçük Bir Not: Kurallar Değişiyor mu?
Full Tilt verilerini kullandığınızda ilginç bir detay fark edeceksiniz: Orijinal versiyonda fırlatma tünelindeki ışıklar top üzerinden geçtikçe yanıp sönerken (toggle), Full Tilt versiyonunda yanık kalıyor. Bu da bumper’ları (tamponları) geliştirmeyi bir nebze kolaylaştırıyor. Benim gibi bir "pinball nerd"üyseniz bu farkı hemen hissedeceksiniz.

---

## 🥊 Son Söz: Neden Hala Oynuyoruz?

Bugün 4K çözünürlükte, ışın izlemeli (ray tracing) oyunlar oynuyoruz ama hiçbirisi o sabah ayazında, okul formasıyla, aileye yakalanma korkusuyla oynanan Pinball’un yerini tutmuyor. Bu oyun bizim için sadece bir yazılım değil; çocukluğumuzun, teknolojiye olan o saf merakımızın ve "güzel günlerin" bir parçası.

Siz de kurun, bir el atın ve o topun sesini duyduğunuzda gözleriniz dolarsa bilin ki yalnız değilsiniz. `Friday13` skorunu geçmeyi denemeyi unutmayın!

Hadi eyvallah kardaş!

---

## 🔗 İlgili Yazılar
- [Pelican Statik Sitenizi Playwright ile Test Edin](/pelican-statik-site-playwright-test/)
- [Arch Linux CPU Performans Ayarları](/arch-linux-cpu-performans-ayarlari/)
- [Diskleri Çöpe Atın: Raspberry Pi Zero ile RAM Üstünde Site Barındırmak](/raspberry-pi-zero-ram-diskless-web-server/)



