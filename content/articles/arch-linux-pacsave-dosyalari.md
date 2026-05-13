Title: Arch Linux'ta .pacsave Dosyaları Nedir? (Güvenli Kullanım)
Date: 2025-11-15 17:13
Category: Linux
Tags: pacsave, pacman, arch linux, sorun giderme
Slug: arch-linux-pacsave-dosyalari
Authors: yuceltoluyag
Summary: Arch Linux'te .pacsave dosyaları nedir? Bir paketi kaldırınca ayarlarınızın neden silinmediğini ve bu yedekleri nasıl güvenle yöneteceğinizi anlatıyorum.
Image: images/arch-linux-pacsave-dosyalari-xl.webp
Lang: tr
Translation: false
Status: published
toot: https://mastodon.social/@yuceltoluyag/115553534312259706
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6psml5kks2e

Daha önceki bir yazıda `.pacnew` dosyalarının ne kadar baş ağrıtabileceğini konuşmuştuk, değil mi? O dosyalar genelde "Dikkat et, yeni ayar geldi" diye bağırır. Ama bu `.pacsave` dosyaları? Onlar tam tersi bir durumda ortaya çıkıyor ve genelde iyi ki oradalar.

Bir paketi kaldırıyorsun, sonra "Tüh, bütün ayarlarım gitti\!" diye hayıflanıyorsun. İşte `.pacsave`, Arch Linux'te Pacman'in seni bu durumdan kurtaran küçük sigortasıdır. Bu dosyalar, `.pacnew` ile çok yakından ilişkili, ama tamamen zıt bir senaryoda beliriyorlar.

## .pacsave Dosyası Tam Olarak Nedir?

Kısacası, `.pacsave` dosyası, sen bir paketi **kaldırdığında**, Pacman'in o pakete ait _değiştirilmiş_ yapılandırma dosyalarını çöpe atmak yerine yedekleme yöntemidir. Bu, Pacman'in "Emin ol, bu sana lazım olur" deme şekli.

Bir örnek üzerinden gidelim:

Diyelim ki `apache` kurdun ve `/etc/httpd/conf/httpd.conf` dosyasını binbir emekle düzenledin. Sonra bir gün `apache`'yi kaldırmaya karar verdin: `sudo pacman -R apache`.

Pacman o dosyaya bakar ve "Vay, bu adam bunu değiştirmiş" der. Onu silmek yerine, adını şöyle değiştirir:

`/etc/httpd/conf/httpd.conf.pacsave`

İşte bu dosya, senin o eski, değerli yapılandırmanı içerir. Peki ya o dosyaya hiç dokunmasaydın, yani olduğu gibi bıraksaydın? O zaman Pacman "Bu zaten standart, çöpe gitsin" der ve silerdi. 🚮

## Pacman Neden .pacsave Oluşturuyor?

Pacman'in işi sistemi tutarlı tutmak, evet, ama aynı zamanda senin emeğini de korumak. Yapılandırma dosyaları genellikle kişisel veya sisteme özel değişiklikler içerir.

Bir paketi kaldırırken kendine şu basit soruyu sorar: "Bu config dosyasına dokunulmuş mu?"

- Cevap **'Hayır'** ise? Siler.
- Cevap **'Evet'** ise? `.pacsave` yapar.

Bu kadar basit. Bu mantık, yazılımı geçici olarak kaldırdığında değerli ayarlarını kaybetmeni engeller. `pacman -Rns` gibi komutlarla, yani artık ihtiyaç duyulmayan bağımlılıkları temizlerken bile, Pacman değiştirilmiş dosyalarını güvenlik için `.pacsave` olarak korur.

## Sistemimdeki Tüm .pacsave Dosyalarını Nasıl Bulurum?

Peki, sistemim bu 'sigorta' dosyalarıyla doldu mu? Bunu öğrenmek çok kolay.

`find` komutu bu işin klasik yoludur:

```bash
sudo find /etc -type f -name "*.pacsave"
```

Ama benim gibi hem `.pacnew` hem de `.pacsave`'leri tek yerden yönetmek isteyen biraz daha 'düzenli' 🤓 biriysen, `pacman-contrib` paketini kurmanı tavsiye ederim.

```bash
sudo pacman -S pacman-contrib
```

Bu paket kurulduktan sonra, terminale sadece şunu yazman yeterli:

```bash
sudo pacdiff
```

Bu harika araç, sana hem yeni yapılandırma dosyalarını (`.pacnew`) hem de bu yedeklenmiş eski dosyaları (`.pacsave`) tek bir arayüzde gösterir, mis gibi.

## Eski Ayarları Geri Yükleme (Rehber)

Diyelim ki o `apache`'yi geri yükledin ve "Ah, benim eski ayarlarım neredeydi?" dedin. `.pacsave` dosyasını geri yüklemek için onu yeniden adlandırman yeterli.

```bash
sudo mv /etc/httpd/conf/httpd.conf.pacsave /etc/httpd/conf/httpd.conf
```

Tabii, dosyayı geri getirdikten sonra ilgili servisi yeniden başlatmayı unutma:

```bash
sudo systemctl restart httpd
```

İşte bu kadar. Eski ayarların saniyeler içinde geri döndü.

## .pacsave Dosyalarını Ne Zaman Silmeliyim?

İşte burası önemli.

!!! danger "Kritik Uyarı 🛑 Bir `.pacsave` dosyasını silmeden önce iki kez düşün. Sadece şu durumlarda güvenle silebilirsin:"

1. O paketi bir daha _asla_ kurmayacağına eminsen.
2. Dosyanın içine (`cat` veya `nano` ile) baktın ve 'Burada önemli hiçbir şey yokmuş' dediysen.

Eğer eminsen, silme komutu basit:

```bash
sudo rm /etc/httpd/conf/httpd.conf.pacsave
```

Ben genelde silmek yerine `~/yedekler/` diye bir yere taşıyorum. Ne olur ne olmaz... Sanırım biraz istifçiyim. 😅

```bash
sudo mv /etc/httpd/conf/httpd.conf.pacsave ~/yedekler/
```

## Hızlı Soru-Cevap (Kafa Karışıklığı Giderici)

Hızlıca birkaç klasik soruyu da cevaplayalım:

- **S: `.pacnew` ile `.pacsave` arasındaki fark ne?**

  - **C:** `.pacnew` **güncelleme** yaparken gelir (Sistem: "Bak, bu yeni sürümün ayar dosyası, seninkinden farklı"). `.pacsave` ise **kaldırma** yaparken gelir (Sistem: "Sen bu dosyayı değiştirmiştin, ben bunu siliyorum ama yedeği burada").

- **S: `.pacsave` dosyalarını hemen silebilir miyim?**

  - **C:** Yapabilirsin, ama yapma. İçine bir bak. Belki o paketi 3 ay sonra tekrar kuracaksın ve o ayarlara ihtiyacın olacak.

- **S: Her paket `.pacsave` oluşturur mu?**

  - **C:** Hayır. Sadece (1) yapılandırma dosyası içeren VE (2) senin o dosyayı değiştirmiş olduğun paketler kaldırılırken oluşur.

- **S: İkisini birden nasıl yönetirim?**

  - **C:** `pacman-contrib` kur ve `sudo pacdiff` kullan. Hayatını kolaylaştırır.

### İşin Özü...

Kısacası, `.pacsave` dosyaları Pacman'in en akıllı özelliklerinden biri. Senin için bir güvenlik ağı 🕸️. Her paket kaldırdıktan sonra bir `pacdiff` komutu çalıştırmak (veya `find` komutu) ve bu dosyalara bir göz atmak, `/etc` dizinini temiz tutar ve değerli yapılandırmalarını kaybetmemeni sağlar.



