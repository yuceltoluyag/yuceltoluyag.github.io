Title: Arch Linux Üzerinde FireCut 4.3.2 Kurulumu (DaVinci Resolve)
Date: 2026-11-05 09:00
Category: Linux
Tags: Arch Linux, DaVinci Resolve, FireCut, Debtap, Video Düzenleme
Slug: arch-linux-firecut-davinci-resolve-kurulumu
Authors: yuceltoluyag
Summary: FireCut 4.3.2'yi Arch Linux üzerinde DaVinci Resolve ile kullanmak için DEB paketini Debtap ile dönüştürüp pacman üzerinden kuruyoruz. Kurulum sırasında karşılaştığım pkgfile uyumluluk sorununu ve çözümünü anlatıyorum.
Lang: tr
Image: images/archlinux-drs-firecut-lg.webp
Status: published


[responsive_img src="/images/archlinux-drs-firecut-lg.webp" alt="Arch Linux DaVinci Resolve Kurulumu" /]

DaVinci Resolve, Linux tarafında güçlü video düzenleme araçlarından biri. Ancak kullandığımız bazı yardımcı eklentiler Linux için doğrudan Arch Linux paketi olarak sunulmuyor. FireCut da bunlardan biri.

FireCut, DaVinci Resolve içerisinde video düzenleme sürecini kolaylaştıran yapay zekâ destekli bir araç. Sessizlikleri temizleme, altyazı işlemleri ve tekrar eden düzenleme işlerini otomatikleştirme gibi özellikler sunuyor.

FireCut'ın Linux sürümü Debian paket biçiminde (`.deb`) dağıtılıyor. Debian ve Ubuntu tabanlı dağıtımlarda bu paketi doğrudan kurmak mümkün. Arch Linux tarafında ise Debtap kullanarak DEB paketini pacman ile kurulabilir bir pakete dönüştürebiliyoruz.

Bu rehberde FireCut 4.3.2 sürümünü Arch Linux üzerinde kurarken izlediğim adımları ve karşılaştığım Debtap sorununu nasıl aştığımı anlatacağım.

## Gereksinimler

Kuruluma başlamadan önce aşağıdakilerin sisteminizde bulunması gerekiyor:

- Arch Linux veya Arch tabanlı bir dağıtım
- Çalışır durumda DaVinci Resolve
- AUR paketlerini kurabilmek için bir AUR yardımcısı (örneğin yay)
- DEB paketini Arch Linux paket biçimine dönüştürmek için Debtap

FireCut'ın resmi belgelerine göre DaVinci Resolve 20 veya üzeri sürümler gerekiyor. Hem ücretsiz hem de Studio sürümü destekleniyor.

## 1. Debtap kurulumu

Öncelikle AUR üzerinden Debtap paketini kuruyoruz:

```bash
yay -S debtap
```

Kurulum tamamlandıktan sonra Debtap'ın paket veritabanlarını güncellemesi gerekiyor:

```bash
sudo debtap -u
```

Bu işlem biraz zaman alabilir. Debtap, Debian ve Ubuntu paketleriyle ilgili bilgileri indirerek dönüştürme sırasında kullanacağı veritabanlarını hazırlıyor.

Benim sistemimde güncelleme işlemi tamamlanmasına rağmen sonraki aşamada Debtap, veritabanının güncel olmadığını belirten bir uyarı vermeye devam etti.

## 2. Debtap ve pkgfile uyumluluk sorunu

Sorunu araştırırken kullandığım sürümleri kontrol ettim:

```bash
debtap -v
pkgfile --version
```

Sistemimde Debtap 3.6.3 ve pkgfile v27 bulunuyordu.

`sudo debtap -u` komutu veritabanlarını başarıyla oluşturmasına rağmen Debtap, bu dosyaları kontrol ederken güncelleme yapılması gerektiğini söylemeye devam ediyordu.

Kontrol ettiğim dosya `/usr/bin/debtap` oldu. İlgili kontrolün yapıldığı 154. satırdaki ifadeyi inceledim:

```bash
sudo nano /usr/bin/debtap
```

Dosyanın orijinal halini değiştirmeden önce yedek aldım:

```bash
sudo cp /usr/bin/debtap /usr/bin/debtap.bak
```

Ardından 154. satırdaki sürüm eki kontrolünü yerel olarak düzenledim:

```bash
sudo sed -i '154s/{3}/{0,3}/' /usr/bin/debtap
```

Bu değişiklikten sonra Debtap, oluşturulmuş veritabanlarını kabul etti ve DEB paketini dönüştürme işlemine devam edebildim.

**Önemli:** Bu düzenleme Debtap'ın sistemimdeki kontrolünü geçebilmek için uyguladığım yerel bir çözümdür. Her Debtap sürümünde aynı satırın veya aynı sorunun bulunacağını varsaymayın. Kendi sisteminizde önce ilgili satırı kontrol edin:

```bash
sed -n '154p' /usr/bin/debtap
```

Eğer düzenlemeyi geri almak isterseniz aldığımız yedeği geri yükleyebilirsiniz:

```bash
sudo cp /usr/bin/debtap.bak /usr/bin/debtap
```

## 3. FireCut DEB paketini indirme

FireCut'ın Linux sürümünü resmi indirme sayfasından edinebilirsiniz.

İndirme sayfasında eski sürümler de bulunuyor. Bu rehberde kullandığım sürüm **FireCut 4.3.2**.

Dosya adı:

```text
firecut-davinci.v4_3_2.x64.deb
```

İndirdiğiniz dosyanın bulunduğu dizine terminal üzerinden geçin.

Örneğin:

```bash
cd ~/Downloads
```

Dosya adının sisteminizdekiyle aynı olduğundan emin olun.

## 4. DEB paketini Arch Linux paketine dönüştürme

Şimdi Debtap ile indirdiğimiz paketi dönüştürüyoruz:

```bash
debtap firecut-davinci.v4_3_2.x64.deb
```

Debtap dönüştürme sırasında bazı paket bilgilerini soracaktır.

Benim kullandığım değerler:

- Packager: `friday13`
- License: Boş bıraktım.
- PKGINFO düzenleme: Varsayılan seçenekle devam ettim.
- INSTALL betiği düzenleme: Varsayılan seçenekle devam ettim.

İşlem tamamlandığında aşağıdaki paket oluşturuldu:

```text
firecut-davinci-4.3.2-1-x86_64.pkg.tar.zst
```

Bu noktada artık elimizde pacman ile kurulabilecek bir Arch Linux paketi bulunuyor.

## 5. Paket bilgilerini ve bağımlılıkları kontrol etme

Oluşturulan paketi hemen kurmak yerine önce içeriğini ve bağımlılıklarını kontrol ettim.

Paket bilgileri:

```bash
pacman -Qip firecut-davinci-4.3.2-1-x86_64.pkg.tar.zst
```

Kontrol sonucunda şu bilgiler yer aldı:

| Bilgi | Değer |
|---|---|
| Paket adı | firecut-davinci |
| Sürüm | 4.3.2-1 |
| Mimari | x86_64 |
| Kurulum boyutu | 355.67 MiB |
| Paketleyici | friday13 |

Paketin bağımlılıklarını kontrol etmek için:

```bash
pacman -T alsa-lib at-spi2-core cairo ffmpeg gtk3 libcups libx11 libxcb libxcomposite libxdamage libxext libxfixes libxkbcommon libxrandr mesa nspr nss pango
```

Bu komut eksik bağımlılıkları listeler. Benim sistemimde herhangi bir çıktı dönmedi. Yani paketin bildirdiği bağımlılıklar zaten kuruluydu.

Paketin içeriğine göz atmak için:

```bash
pacman -Qlp firecut-davinci-4.3.2-1-x86_64.pkg.tar.zst
```

Paket içerisinde uygulamanın `/opt/FireCut for DaVinci Resolve/` dizinine yerleştirildiğini, ayrıca masaüstü kısayolu ve simge dosyalarının bulunduğunu gördüm.

## 6. FireCut kurulumu

Kontroller tamamlandıktan sonra paketi pacman ile kuruyoruz:

```bash
sudo pacman -U ./firecut-davinci-4.3.2-1-x86_64.pkg.tar.zst
```

Kurulum tamamlandığında FireCut sistemimize eklenmiş oluyor.

Kurulum betiği uygulamanın çalıştırılabilir bağlantısını ve masaüstü girişini hazırlıyor. Uygulamayı terminalden başlatmak için:

```bash
firecut-davinci
```

Uygulamayı masaüstü uygulama menüsünde de bulabilirsiniz.

## 7. DaVinci Resolve ile FireCut bağlantısı (Wayland)

FireCut'ı Arch Linux üzerinde kurduktan sonra DaVinci Resolve ile bağlantısını yapılandırmamız gerekiyor.

Öncelikle DaVinci Resolve içerisinden:

1. `Preferences → General` bölümünü açın.
2. `External scripting` ayarını bulun.
3. Bu seçeneği **Local** olarak ayarlayın.
4. Ayarları kaydedin.

Ardından FireCut uygulamasını açıp DaVinci Resolve içerisinden FireCut script'ini başlatın.

Bu yapılandırmayla FireCut, DaVinci Resolve'un script host'una bağlanabiliyor. Ben Arch Linux üzerinde Wayland oturumunda bu bağlantıyı başarıyla gerçekleştirdim.

**Wayland hakkında önemli not:** FireCut açılırken `UI automation requires an X11 session. Wayland is not supported.` uyarısı görülebilir. Bu uyarı, FireCut'ın UI Automation bileşeninin Wayland desteği olmadığını belirtiyor. Ancak bu durum DaVinci Resolve ile yerel script host bağlantısının da çalışmayacağı anlamına gelmiyor. `External scripting` ayarını `Local` yaptığınızda Resolve bağlantısı kurulabiliyor.

Dolayısıyla FireCut'ı Wayland üzerinde kullanmak isteyenlerin bu iki özelliği birbirinden ayırması gerekiyor.

## 8. Güncelleme ve dikkat edilmesi gerekenler

FireCut'ın Linux sürümünde otomatik güncelleme desteği bulunmuyor. Yeni sürümleri FireCut'ın resmi indirme sayfasından takip etmeniz gerekiyor.

Yeni bir sürüm çıktığında DEB paketini indirip Debtap ile yeniden dönüştürerek pacman üzerinden kurabilirsiniz.

Arch Linux sürekli güncellenen bir dağıtım olduğu için üçüncü taraf paketlerin sistem kütüphaneleriyle uyumluluğunu da göz önünde bulundurmak gerekiyor. Ayrıca DaVinci Resolve'un Arch Linux desteği Blackmagic Design tarafından resmi olarak sunulmuyor; bu taraftaki kurulum ve uyumluluk topluluk paketlerine ve sistem yapılandırmasına bağlı.

Bu nedenle çalışan bir kurulumunuz varsa büyük güncellemelerden önce mevcut paket sürümünü ve yapılandırmanızı not etmenizde fayda var.

## Sonuç

FireCut'ın Linux için yalnızca DEB paketi sunması Arch Linux kullanıcıları için ilk bakışta küçük bir engel gibi görünebilir. Ancak Debtap sayesinde bu paketi pacman ile yönetilebilir hale getirmek mümkün.

Benim kurulum sürecimde asıl zaman kaybettiren bölüm FireCut değil, Debtap'ın pkgfile veritabanı kontrolü oldu. Yerel bir düzenlemeyle bu kontrolü geçtikten sonra paket sorunsuz şekilde oluşturuldu ve pacman ile kuruldu.

Sonuç olarak FireCut 4.3.2'yi Arch Linux üzerinde DaVinci Resolve ile birlikte çalıştırmayı başardım.

**Kullandığım ortamda doğruladığım kurulum adımlarını bu rehberde paylaştım.** Farklı Arch tabanlı dağıtımlarda veya ileride çıkacak Debtap sürümlerinde küçük farklılıklar yaşanabileceğini unutmayın.

---

### Kaynaklar

- [FireCut – DaVinci Resolve Kurulum Rehberi](https://learn.firecut.ai/overview-davinci-resolve/installing-firecut){: target="\_blank" rel="noopener noreferrer"} 
- [FireCut – Eski Sürümler ve İndirme Sayfası](https://firecut.ai/downloads/davinci-resolve/old/){: target="\_blank" rel="noopener noreferrer"} 
- [FireCut – Sorun Giderme](https://learn.firecut.ai/overview-davinci-resolve/troubleshooting){: target="\_blank" rel="noopener noreferrer"} 
- [ArchWiki – DaVinci Resolve](https://wiki.archlinux.org/title/DaVinci_Resolve){: target="\_blank" rel="noopener noreferrer"} 


