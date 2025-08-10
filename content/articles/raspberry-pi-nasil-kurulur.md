Title: Raspberry Pi Nasıl Kurulur
Date: 2025-04-24 12:00
Modified: 2025-08-08 01:17
Category: Donanım
Tags: raspberry pi, raspberry pi kurulumu, microSD kart, ssh ayarları, statik ip
Slug: raspberry-pi-nasil-kurulur
Authors: yuceltoluyag
Status: published
Summary: Raspberry Pi kurulumu adım adım nasıl yapılır? microSD kartı hazırlamaktan SSH ile uzaktan bağlantıya kadar tüm detayları bu rehberde bulabilirsiniz.
Template: article
Image: images/raspberry-pi-nasil-kurulur-lg.webp
Mastodon_Link: https://mastodon.social/@yuceltoluyag/114987887086983086

# Raspberry Pi Nasıl Kurulur? 🛠️

Güçlü, ucuz ve esnek bir mini bilgisayar olan **Raspberry Pi**, hobi projelerinden profesyonel uygulamalara kadar birçok alanda kullanılabiliyor. Peki, bu cihazı ilk kez elinize aldığınızda nasıl kurulum yaparsınız? 🤔

Bu rehberde, **Raspberry Pi kurulumu** adım adım anlatılıyor. microSD kart hazırlamadan SSH üzerinden uzaktan bağlantıya kadar ihtiyacınız olan her şeyi bulacaksınız.

---

## 📦 Gerekli Donanımlar

Raspberry Pi kurulumu için şu donanımlara ihtiyacınız olacak:

- Raspberry Pi (Bu rehberde Pi 3 Model B kullanıldı)
- microSD kart (en az 8GB, tercihen Class 10)
- microSD kart okuyucu (bilgisayarınızda yoksa adaptör gerekebilir)
- Bilgisayar (microSD kartı hazırlamak için)
- HDMI kablosu, ekran, klavye
- Ethernet kablosu (ya da Wi-Fi)
- microUSB güç kablosu (standart Android şarj cihazı)

Tüm bu donanımlar hazırsa başlayalım. 👇

---

## 💾 microSD Kartın Hazırlanması

Harika, şimdi **Adım 1: MicroSD Kartınızı Flash’layın** bölümüyle devam ediyorum:

---

## Adım 1: MicroSD Kartınızı Flash’layın

1. MicroSD kartınızı bilgisayarınıza takın.
2. [Etcher](https://www.balena.io/etcher/){: target="_blank" rel="noopener noreferrer"} uygulamasını indirin ve kurun.
3. [Raspbian Stretch Lite](https://downloads.raspberrypi.org/raspbian_lite_latest){: target="_blank" rel="noopener noreferrer"} sürümünü indirip zip dosyasını çıkarın. Bu sürüm, sadece komut satırı ile çalışan, masaüstü arayüzü bulunmayan oldukça hafif bir Raspbian versiyonudur. Dosya boyutu yaklaşık 351MB (Kasım 2018 sürümü), bu yüzden hızlıca indirilecektir.
4. Etcher’ı açın, çıkardığınız `.img` uzantılı Raspbian işletim sistemi dosyasını seçin ve hedef olarak MicroSD kartınızı gösterin. Ardından **Flash** butonuna tıklayın ve işlemin tamamlanmasını bekleyin. Windows kullanıyorsanız, işlem sırasında bazı Explorer pencereleri açılabilir, bunları görmezden gelebilirsiniz.
5. İşlem bittikten sonra MicroSD kartınızı **çıkarın** ve bilgisayarınızdan ayırın.
6. **Raspberry Pi’nizin kapalı olduğundan emin olun.** Flashladığınız MicroSD kartı Pi’nize takın.
7. Klavyenizi, ekranınızı (HDMI portu üzerinden) ve Ethernet kablosunu Raspberry Pi’ye bağlayın. Son olarak güç kablosunu takın. Raspberry Pi otomatik olarak açılacaktır.

---


## Adım 2: Raspberry Pi’yi Yapılandırma

1. Ekranın altında `raspberrypi login:` yazısı ve yanıp sönen bir imleç gördüğünüzde, kullanıcı adı olarak şunu yazın:

```bash
pi
```
Enter'a basın. Ardından varsayılan şifreyi girin:

```bash
raspberry
```
Bu şifreyi birazdan değiştireceğiz.

2. Şimdi sistem güncellemeleri için şu komutu yazın:

```bash
sudo apt update
```
Bu komut, Raspbian’ın güncellemeleri hangi kaynaklardan alacağını yeniler. `apt` bir paket yöneticisidir. `sudo` ise “super-user do” anlamına gelir; yani bu komutu yönetici yetkileriyle çalıştırıyorsunuz.  
Daha önce `apt-get` görmüş olabilirsiniz, ama `apt` daha yeni ve kullanıcı dostu bir sürümdür. Komutun tamamlanmasını bekleyin.

3. Ekranda tekrar `pi@raspberrypi:~ $` çıktısını gördüğünüzde, güncelleme işlemi tamamlanmıştır. Şimdi şu komutu girin:

```bash
sudo apt full-upgrade
```
Size sorulduğunda
```bash
y
```
yazıp Enter’a basın. Bu işlem biraz sürebilir ama ekranın altındaki ilerleme çubuğunu izleyebilirsiniz.

4. Güncellemeler tamamlandığında, şu temizlik komutlarını çalıştırın:

```bash
sudo apt autoremove && sudo apt clean
```
Bu komutlar gereksiz paketleri kaldırır ve bellekte yer açar. `&&` işareti, birden fazla komutu tek satırda birleştirmenizi sağlar.

5. Şimdi yapılandırma ekranını açmak için şu komutu yazın:

```bash
sudo raspi-config
```
Mavi bir grafik ekran açılacak. Ok tuşlarıyla menüde gezinebilir, Enter tuşuyla seçim yapabilirsiniz. `8 Update` seçeneğini seçin ve Enter’a basarak yapılandırma aracını güncelleyin.

6. Birkaç saniye bekledikten sonra aşağı inerek `4. Localisation Options` seçeneğine gelin ve Enter’a basın. Ardından yerel ayarları değiştirmek için tekrar Enter’a basın.  
Aşağı inerek `en_GB.UTF-8 UTF-8` seçeneğini bulun, seçiliyse boşluk tuşuyla işareti kaldırın.  
Devam edip `en_US.UTF-8 UTF-8` seçeneğini bulun ve boşluk tuşuyla işaretleyin. Sonra Enter’a basarak işlemi tamamlayın. `en_US.UTF-8` seçeneğini varsayılan yapmak için tekrar Enter’a basın. Ardından sizi tekrar `raspi-config` ekranına döndürecektir.

7. Yeniden `4. Localisation Options` menüsüne girin. Bu kez `I2 Change Timezone` seçeneğine gelin.  
Önce kıtanızı, sonra şehrinizi seçin. Örneğin ben `America/Toronto` seçiyorum. ABD'deyseniz `US` altından bulunduğunuz bölgeyi seçebilirsiniz.

8. Yine `Localisation Options` menüsüne girin ve bu kez klavye düzenini ayarlamak için `I3 Change Keyboard Layout` seçeneğini seçin.  
Ben `Dell USB Multimedia Keyboard` kullanıyorum. Siz de kendi klavyenizi seçin. İngiltere’deyseniz varsayılan düzeni seçebilirsiniz. Değilseniz `Other` seçeneğine inip kendi klavye dilinizi seçin.  
Ardından klavye düzeninin versiyonunu seçin. Emin değilseniz ilk seçeneği tercih edin. Alt-Gr tuşu ve Compose Key seçeneklerini de Enter ile geçin — şu anda ihtiyacınız olmayacak.

9. Son olarak `Localisation Options` menüsüne tekrar girip `I4 Change Wi-fi Country` seçeneğini seçin.  
Bu **çok önemli**, çünkü bulunduğunuz ülkeye uygun olmayan kablosuz ayarları kullanmak yasal sorunlara yol açabilir. Ülkenizi seçin ve Enter’a basın. `<Ok>` mesajı geldiğinde tekrar Enter’a basın.

10. Şimdi aşağı inerek `7. Advanced Options` menüsüne girin ve `A1 Expand Filesystem` seçeneğini seçin.  
Bu işlem, SD kartınızın tamamının Raspberry Pi tarafından kullanılmasını sağlar.

11. Kullanıcı şifresini değiştirmek için `1 Change User Password` seçeneğine girin. Ekrandaki yönergeleri izleyerek yeni şifrenizi belirleyin.  
Son olarak sağ ok tuşuna iki kez basarak `<Finish>` seçeneğine gelin ve Enter’a basın.

12. Şimdi `2 Network Options` menüsüne gidin ve `N1 Hostname` seçeneğini seçin. Raspberry Pi’nize bir ad verin. Ayarları yaptıktan sonra sistem yeniden başlatılacak. Yeniden başlatma işleminin tamamlanmasını bekleyin.

---


## Adım 3: Raspberry Pi’yi Özelleştirme

1. Raspberry Pi’niz yeniden başlatıldığında, tekrar giriş yapın:

```bash
pi
```
Ardından az önce belirlediğiniz şifreyi yazın ve Enter’a basın.

2. Başlangıçta çıkan gökkuşağı ekranını kaldırmak için şu komutu girin:

```bash
sudo nano /boot/config.txt
```
Nano, Linux’ta kullanımı kolay bir metin düzenleyicisidir. Ok tuşlarıyla en alta inin ve şu satırı ekleyin:

```bash
disable_splash=1
```
Ctrl+X tuşlarına basarak çıkın, ardından `y` tuşuna basarak değişiklikleri kaydedin.

3. Raspberry Pi’nizi yeniden başlatın. Artık başlangıç ekranında gökkuşağı efekti görünmeyecek.  
Eğer ileride tekrar görmek isterseniz, `/boot/config.txt` dosyasına geri dönüp bu satırı silebilirsiniz.

4. Az önce `nano` ile bir dosyayı düzenlediniz. Şimdi de `/etc/motd` dosyasını düzenleyeceğiz. Bu dosya, her giriş yaptığınızda ekranda gözüken “günün mesajını” belirler:

```bash
sudo nano /etc/motd
```
Sadece `nano` yazarsanız dosyayı düzenleyemezsiniz, `sudo` şart.  
İmleç dosyanın başındayken `Ctrl+^` tuşlarına basın, ok tuşlarıyla en alta kadar inin. Bu tüm metni seçer. Ardından `Ctrl+K` ile seçimi silin.  
Dosya boş kaldığında, girişte görmek istediğiniz mesajı yazın. Kaydedip çıkmak için `Ctrl+X` ardından `y` tuşuna basın.

5. Artık oturumdan çıkmak için `Ctrl+D` tuşlarına basın.  
Tekrar giriş yaptığınızda, az önce yazdığınız mesajı göreceksiniz.

6. Son olarak, root kullanıcısı için de bir şifre belirleyin:

```bash
sudo passwd
```


---


## Adım 4: SSH Kurulumu

SSH, Raspberry Pi’ye başka bir cihazdan uzaktan terminal (komut satırı) üzerinden bağlanmanı sağlar. Öncelikle Pi’ye statik bir IP adresi ataman gerekiyor.

1. Raspberry Pi’nin yerel IP adresini öğren:

```bash
ip -4 a | grep global
```
Aşağıdaki gibi bir çıktı alabilirsin:

```bash
inet 192.168.2.10/24 brd 10.1.1.255 scope global eth0
```
Buradaki `192.168.2.10` Pi’nin yerel IP adresi. `/24` ağın büyüklüğünü gösteriyor, çoğu ev ağı için bu 24’tür. IP adresini bir yere not al.

2. Modeminin (router) yerel IP adresini öğren:

```bash
ip route | grep default
```
Şöyle bir şey göreceksin:

```bash
default via 192.168.2.1 dev eth0 src 192.168.2.10 metric 202
```
Benim örneğimde `192.168.2.1` modem IP’si. Seninki farklı olabilir, bunu da not et.

3. DNS sunucu adresini bul:

```bash
cat /etc/resolv.conf
```
Örnek çıktı:

```bash
# Generated by resolvconf
domain home
nameserver 192.168.2.1
nameserver XXX.XXX.XXX.XXX
```
İlk `nameserver` satırındaki adres genellikle router IP’siyle aynıdır. Eğer farklıysa, onu da not et.

4. IP adresini sabitlemek için `dhcpcd.conf` dosyasını düzenle:

```bash
sudo nano /etc/dhcpcd.conf
```
Açılan dosyada `# Example static IP configuration` satırına gel ve şu şekilde düzenle:

```bash
interface eth0
static ip_address=192.168.2.10/24
static routers=192.168.2.1
static domain_name_servers=192.168.2.1
```
Buradaki adresleri kendi ağ bilgilerine göre güncelle.  
Ctrl+X → `y` → Enter ile kaydedip çık, ardından Raspberry Pi’ni yeniden başlat.

5. SSH servisini etkinleştir:

```bash
sudo systemctl enable ssh
sudo systemctl start ssh
```
Şimdi tekrar yeniden başlat:

```bash
sudo reboot
```

6. Raspberry Pi'ne başka bir bilgisayardan bağlanmak için, o bilgisayarda terminal aç:  
(Linux/Mac’te terminal, Windows'ta `cmd`)

7. Aşağıdaki komutla SSH bağlantısı kur:

```bash
ssh pi@192.168.2.10
```
Burada `192.168.2.10` senin Pi’nin IP adresi. İlk bağlantıda `yes` yazarak devam et.

8. Pi’nin şifresini yaz ve Enter’a bas.  
Başarılı olursa, giriş mesajı (MOTD) karşına çıkacak ve artık kendi bilgisayarından Raspberry Pi’yi komut satırı üzerinden kontrol edebileceksin.  
Bundan sonra ekran ve klavyeyi Raspberry Pi’den çıkarabilirsin, uzaktan yönetebilirsin!

---


## 📌 Sonuç ve Özet
- microSD kart hazırlığı
- Raspberry Pi ilk yapılandırma
- Yerelleştirme ve kullanıcı ayarları
- SSH ile uzaktan bağlantı kurma

Bu yazıda, **Raspberry Pi kurulumu** için ihtiyacınız olan tüm adımları detaylıca ele aldık:
 💡

 [responsive_img src="/images/raspberry-pi-nasil-kurulur-lg.webp" alt="raspberry-pi-nasil-kurulur" /]