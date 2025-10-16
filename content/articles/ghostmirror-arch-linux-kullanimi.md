Title: Rehber: Arch Linux'ta GhostMirror Kullanımı
Date: 2025-08-13 09:30
Category: Linux
Tags: Arch Linux, mirror management, package synchronization, Python aracı, sistem optimizasyonu
Slug: ghostmirror-arch-linux-kullanimi
Authors: yuceltoluyag
Status: published
Summary: GhostMirror, Arch Linux kullanıcıları için geliştirilmiş akıllı mirror repository yönetim aracıdır. Manuel müdahale gerektirmeden mirror'ları analiz eder, hataları tespit eder ve optimum mirror listeleri oluşturur.
Template: article
Image: images/ghostmirror-arch-linux-kullanimi-xl.webp



## 1. Giriş 📌
Arch Linux kullanıcıları olarak, sistemimizi hızlı ve güvenilir paket aynaları (mirror) ile güncel tutmak çok önemlidir. Ancak, bazen paket güncellemeleri görünmez ve güncelleme sırasında “paket bulunamadı” gibi hatalarla karşılaşabiliriz. Bu durumun en yaygın sebeplerinden biri, yerel `mirrorlist` dosyamızın güncel olmayan veya senkronize olmayan aynaları içermesidir.

İşte bu noktada **GhostMirror** devreye giriyor. GhostMirror, Arch Linux kullanıcılarının ayna listelerini otomatik olarak yönetmelerini, güncel ve hızlı aynaları kolayca bulmalarını sağlayan güçlü bir araçtır. Aynı zamanda hatalı veya güncel olmayan aynaları tespit edip detaylı analiz sunar.

Bu rehberde, GhostMirror’ın ne olduğunu, nasıl kurulup kullanılacağını ve sisteminizde nasıl otomatik ayna optimizasyonu sağlayacağınızı adım adım öğreneceksiniz. Böylece Arch Linux deneyiminizi çok daha sorunsuz ve hızlı hale getirebilirsiniz.

[responsive_img src="/images/ghostmirror-arch-linux-kullanimi-xl.webp" alt="Linux'ta GhostMirror Kullanımı" /]

---

## 2. GhostMirror Nedir?

GhostMirror, Arch Linux kullanıcıları için geliştirilmiş bir ayna kontrol ve yönetim aracıdır. Temel görevi, sisteminizdeki `mirrorlist` dosyasındaki aynaları analiz edip güncel olmayanları ya da hatalı olanları tespit etmek ve size detaylı rapor sunmaktır.

Başlıca özellikleri:

* Aynaların paket veritabanlarını yerel veritabanı ile karşılaştırarak güncel olup olmadığını gösterir.
* Hangi aynaların senkronize olmadığını, hangi paketlerin eksik veya eski olduğunu detaylıca listeler.
* Aynaları hız, ping ve güncellik gibi kriterlere göre sıralayabilir.
* Otomatik olarak systemd servisi ile ayna listesini güncelleyebilir, sizin manuel müdahalenize gerek kalmaz.
* Hatalı aynalarla ilgili nedenleri araştırıp raporlayabilir (investigation modu).

💡 **İpucu:** GhostMirror, özellikle Arch Linux gibi hızlı değişen dağıtımlarda ayna sorunlarını önlemek için mükemmel bir yardımcıdır.

---

## 3. Kurulum

GhostMirror’u Arch Linux sisteminize kurmanın en kolay yolu AUR (Arch User Repository) kullanmaktır. Eğer yay gibi bir AUR yardımcı programınız varsa aşağıdaki komutla hızlıca kurabilirsiniz:

```bash
yay -S ghostmirror
```

Alternatif olarak, paket dosyasını indirip elle derleyebilirsiniz:

```bash
git clone https://aur.archlinux.org/ghostmirror.git
cd ghostmirror
makepkg -sirc
```

**Gerekli bağımlılıklar:**

- libcurl
- zlib veya zlib-ng
- systemd-libs

Bu bağımlılıklar genellikle Arch Linux’ta yüklü gelir, ancak eksikse pacman ile kurabilirsiniz.

---

## 4. Kullanım Modları

GhostMirror’u üç farklı şekilde kullanabilirsiniz: **Manuel**, **Otomatik** ve **İnceleme (Investigation)**.

---

### 4.1 Manuel Kullanım

Manuel modda tüm adımları kendiniz kontrol eder ve uygularsınız.

**1. Adım:** Büyük ve çeşitli bir ayna listesi oluşturun:

```bash
ghostmirror -PoclLS Italy,Germany,France ./mirrorlist.new 30 state,outofdate,morerecent,ping
```

Burada:

* `-P` ilerleme ve renkli çıktı sağlar,
* `-o` tablo formatında çıktı verir,
* `-c` ülkeleri seçer,
* `-l` çıktı dosyasını belirtir,
* `-L` maksimum ayna sayısını sınırlar,
* `-S` sıralama modunu belirtir (hata verenler çıkarılır, güncel olmayanlar öncelikli gösterilir, ping bazlı önceliklendirme yapılır).

**2. Adım:** Oluşturduğunuz listeyi daha detaylı test edin ve optimize edin:

```bash
ghostmirror -PmuolsS ./mirrorlist.new ./mirrorlist.new light state,outofdate,morerecent,extimated,speed
```

Burada:

* `-m` yerel listeyi kullanır,
* `-u` sadece aktif (yorum satırı olmayan) aynaları kullanır,
* `-s` hız testi yapar,
* `-S` sıralamayı değiştirir.

**3. Adım:** Eski mirrorlist dosyanızı yedekleyin ve yenisiyle değiştirin:

```bash
sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak
sudo cp ./mirrorlist.new /etc/pacman.d/mirrorlist
```

⚠️ **Uyarı:** Mirrorlist dosyasını değiştirmeden önce mutlaka yedeğini alın!

---

### 4.2 Otomatik Kullanım

GhostMirror’u otomatik modda kullanarak systemd timer ile ayna listenizin sürekli güncel kalmasını sağlayabilirsiniz.

**Hazırlık:**


Öncelikle konfigürasyon dizini oluşturun:


```bash
mkdir -p ~/.config/ghostmirror
```

Ardından `/etc/pacman.conf` dosyasını açın ve aşağıdaki gibi ayna listesinin konumunu değiştirin (kendi kullanıcı adınızla):

```
[core]
Include = /home/<kullanıcı_adı>/.config/ghostmirror/mirrorlist
[extra]
Include = /home/<kullanıcı_adı>/.config/ghostmirror/mirrorlist
```

**İlk ayna listesi oluşturma:**

```bash
ghostmirror -PoclLS Italy,Germany,France ~/.config/ghostmirror/mirrorlist 30 state,outofdate,morerecent,ping
```

**Otomatik güncelleme servisini etkinleştirme:**

```bash
ghostmirror -PoDumlsS ~/.config/ghostmirror/mirrorlist ~/.config/ghostmirror/mirrorlist light state,outofdate,morerecent,extimated,speed
```

`-D` seçeneği systemd timer’ını etkinleştirir ve loginctl linger ayarını yapar.

**Timer kontrolü:**

```bash
systemctl --user list-timers
```

**Servisi elle başlatma:**

```bash
systemctl --user start ghostmirror.service
```

Artık mirrorlist güncellemelerini otomatik olarak GhostMirror halledecek.

---

### 4.3 İnceleme (Investigation) Modu

Aynalarda sorun olup olmadığını hızlıca tespit etmek için şu komutu kullanabilirsiniz:

```bash
ghostmirror -i error,outofdate
```

Bu mod, hatalı aynaları listeler ve sorunun olası nedenlerini açıklar.

---

## 5. Önemli Parametreler ve Seçenekler

* `-c --country`: Ülke bazlı ayna seçimi yapar.
* `-m --mirrorfile`: Yerel mirrorlist dosyasını kullanır.
* `-u --uncommented`: Sadece aktif (yorum satırı olmayan) aynaları kullanır.
* `-S --sort`: Aynaları sıralama modlarını belirler. Örnek: `state,outofdate,ping`
* `-s --speed`: Hız testi türünü seçer. `light` (küçük paket), `normal`, `heavy` (büyük paket).
* `-l --list`: Yeni mirrorlist dosyasının kaydedileceği konumu belirtir.
* `-D --systemd`: Otomatik systemd timer modunu aktif eder.

💡 **İpucu:** Hız testi ve ping sonuçlarını birleştirerek en uygun aynaları kolayca seçebilirsiniz.

---

## 6. İpuçları ve En İyi Uygulamalar

* Düzenli olarak GhostMirror ile aynalarınızı kontrol edin, özellikle büyük güncellemelerden önce.
* Otomatik mod ile mirrorlist güncellemelerini arka planda çalıştırarak işinizi kolaylaştırın.
* Birden fazla ülke seçerek daha geniş ve hızlı ayna havuzu oluşturabilirsiniz.
* Systemd timer sayesinde her gün belli saatlerde otomatik kontrol yapabilirsiniz.

---

## 7. Sürüm Geçmişi (Changelog)

GhostMirror, düzenli olarak güncellenerek performans ve kararlılık açısından geliştirilmiştir. Önemli sürüm notlarından bazıları:

* v0.13.1: Versiyon hatası düzeltildi.
* v0.12.1: Otomatik sürüm güncelleme iyileştirmeleri.
* v0.10.0: İlk ayna zorunluluğu kaldırıldı, alternatif ayna araması eklendi.
* v0.9.21: PKGBUILD ve dokümantasyon güncellendi.
* v0.8.0: Stabilite ve hız iyileştirmeleri.

Daha ayrıntılı sürüm notları ve değişiklikler paket içinde mevcuttur.

---

## 8. Sonuç

Arch Linux’ta güncel ve senkronize bir ayna listesi yönetimi, sistem kararlılığı ve hız için kritik öneme sahiptir. GhostMirror, bu süreci otomatikleştirip size zaman kazandıran, hatalı aynaları tespit eden ve performansı artıran güçlü bir araçtır.

Manuel veya otomatik modları sayesinde ihtiyaçlarınıza göre kolayca uyarlayabilir, böylece paket yönetiminde yaşanan ayna sorunlarını kökten çözebilirsiniz.

Şimdi GhostMirror’u kurup kullanarak Arch Linux deneyiminizi bir üst seviyeye taşıyabilirsiniz!

Deneyimlerinizi paylaşmayı ve topluluğa katkıda bulunmayı unutmayın.

---

<div class="info-box tip">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
  <div>
    <div class="alert-title">İpucu</div>
    <p>GhostMirror ile otomatik ayna güncelleme işlemlerini systemd timer ile kolayca halledebilirsiniz. Bu sayede manuel işlemlerden kurtulursunuz.</p>
  </div>
</div>

## Örnek Çıktılar

```bash
[friday13@baba ~]$ ghostmirror -PoclLS Türkiye,Albania,Bulgaria,Moldova,Serbia,Ukraine,Azerbaijan,Georgia,Germany,Greece,Romania,Russia ~/.config/ghostmirror/mirrorlist 30 state,outofdate,morerecent,ping
[100.0%] mirrors updates
┌──────────┬─────────────────────────────────────────────────────┬─────┬─────────┬─────────┬─────────┬──────────┬───────┬────────────┬─────────┬─────────┐
│ country  │                       mirror                        │proxy│  state  │outofdate│uptodate │morerecent│ retry │   speed    │  ping   │extimated│
├──────────┼─────────────────────────────────────────────────────┼─────┼─────────┼─────────┼─────────┼──────────┼───────┼────────────┼─────────┼─────────┤
│Russia    │https://ru.mirrors.cicku.me/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  21.9ms │   1gg   │
│Russia    │http://ru.mirrors.cicku.me/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  24.3ms │   1gg   │
│Germany   │https://de.mirrors.cicku.me/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  27.3ms │   1gg   │
│Germany   │http://de.mirrors.cicku.me/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  28.0ms │   1gg   │
│Bulgaria  │https://mirror.telepoint.bg/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  34.8ms │   1gg   │
│Bulgaria  │https://mirrors.uni-plovdiv.net/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  36.9ms │   1gg   │
│Romania   │https://mirrors.pidginhost.com/arch                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  37.5ms │   1gg   │
│Romania   │http://mirrors.pidginhost.com/arch                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  42.5ms │   1gg   │
│Bulgaria  │http://mirror.telepoint.bg/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  45.7ms │   1gg   │
│Bulgaria  │http://mirrors.uni-plovdiv.net/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  46.0ms │   1gg   │
│Türkiye  │https://tr.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  53.0ms │   1gg   │
│Germany   │https://de.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  53.3ms │   1gg   │
│Germany   │http://mirror.23m.com/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  56.7ms │   1gg   │
│Germany   │http://de.arch.niranjan.co                           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  57.3ms │   1gg   │
│Germany   │https://mirror.23m.com/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  57.6ms │   1gg   │
│Germany   │http://ftp.fau.de/archlinux                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.0ms │   1gg   │
│Germany   │https://ftp.fau.de/archlinux                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.0ms │   1gg   │
│Germany   │https://mirrors.xtom.de/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.4ms │   1gg   │
│Germany   │http://mirrors.xtom.de/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.5ms │   1gg   │
│Azerbaijan│https://mirror.ourhost.az/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  62.9ms │   1gg   │
│Romania   │http://mirror.ro.cdn-perfprod.com/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  63.1ms │   1gg   │
│Germany   │http://arch.jensgutermuth.de                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.4ms │   1gg   │
│Germany   │http://mirror.fra10.de.leaseweb.net/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.5ms │   1gg   │
│Germany   │https://arch.jensgutermuth.de                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  69.7ms │   1gg   │
│Germany   │http://mirror.selfnet.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  70.1ms │   1gg   │
│Germany   │https://mirror.selfnet.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  70.3ms │   1gg   │
│Germany   │http://mirror.lcarilla.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  71.3ms │   1gg   │
│Germany   │https://mirror.moson.org/arch                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  73.3ms │   1gg   │
│Germany   │https://mirrors.n-ix.net/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  74.5ms │   1gg   │
│Germany   │https://ftp.halifax.rwth-aachen.de/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.2ms │   1gg   │
│Germany   │https://de.repo.c48.uk/arch                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.4ms │   1gg   │
│Germany   │http://ftp.halifax.rwth-aachen.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  75.6ms │   1gg   │
│Germany   │https://mirror.dogado.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  77.5ms │   1gg   │
│Germany   │https://mirror.metalgamer.eu/archlinux               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.3ms │   1gg   │
│Germany   │https://de.arch.mirror.kescher.at                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.6ms │   1gg   │
│Germany   │https://mirror.lcarilla.de/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  78.8ms │   1gg   │
│Moldova   │https://mirror.hosthink.net/arch                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.2ms │   1gg   │
│Germany   │https://mirrors.niyawe.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.9ms │   1gg   │
│Romania   │https://ro.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  81.9ms │   1gg   │
│Germany   │https://mirror.fra10.de.leaseweb.net/archlinux       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.0ms │   1gg   │
│Russia    │http://mirrors.powernet.com.ru/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.0ms │   1gg   │
│Romania   │http://ro.mirror.flokinet.net/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.2ms │   1gg   │
│Romania   │http://ro.arch.niranjan.co                           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  82.3ms │   1gg   │
│Germany   │http://mirror.moson.org/arch                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.3ms │   1gg   │
│Germany   │http://mirror.hugo-betrugo.de/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.4ms │   1gg   │
│Azerbaijan│http://mirror.ourhost.az/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.8ms │   1gg   │
│Russia    │https://web.sketserv.ru/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  83.9ms │   1gg   │
│Germany   │https://berlin.mirror.pkgbuild.com                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.3ms │   1gg   │
│Germany   │http://mirror.sunred.org/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.4ms │   1gg   │
│Russia    │http://web.sketserv.ru/archlinux                     │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │http://mirror.metalgamer.eu/archlinux                │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.8ms │   1gg   │
│Germany   │https://mirror.sunred.org/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  84.8ms │   1gg   │
│Germany   │https://mirror.hugo-betrugo.de/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.0ms │   1gg   │
│Germany   │http://mirrors.niyawe.de/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.0ms │   1gg   │
│Germany   │https://mirror.pseudoform.org                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.4ms │   1gg   │
│Germany   │https://archlinux.thaller.ws                         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.8ms │   1gg   │
│Romania   │http://archlinux.mirrors.linux.ro                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  85.9ms │   1gg   │
│Germany   │https://dist-mirror.fem.tu-ilmenau.de/archlinux      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.2ms │   1gg   │
│Germany   │https://mirror.cmt.de/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.6ms │   1gg   │
│Germany   │https://de-nue.soulharsh007.dev/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.6ms │   1gg   │
│Romania   │https://mirror.ro.cdn-perfprod.com/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  86.7ms │   1gg   │
│Romania   │https://ro.mirror.flokinet.net/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  87.2ms │   1gg   │
│Germany   │https://files.hadiko.de/pub/dists/arch               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.0ms │   1gg   │
│Germany   │http://mirror.ubrco.de/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.2ms │   1gg   │
│Germany   │https://mirror.ubrco.de/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  88.5ms │   1gg   │
│Romania   │http://mirrors.hosterion.ro/archlinux                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.1ms │   1gg   │
│Russia    │https://mirror3.sl-chat.ru/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.8ms │   1gg   │
│Germany   │http://mirror.cmt.de/archlinux                       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  89.9ms │   1gg   │
│Romania   │https://mirrors.hosterion.ro/archlinux               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.0ms │   1gg   │
│Russia    │https://mirror2.sl-chat.ru/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.1ms │   1gg   │
│Germany   │https://packages.oth-regensburg.de/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.7ms │   1gg   │
│Germany   │http://packages.oth-regensburg.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  90.9ms │   1gg   │
│Germany   │https://arch.unixpeople.org                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  91.2ms │   1gg   │
│Germany   │https://arch.kurdy.org                               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  95.0ms │   1gg   │
│Germany   │http://mirrors.purring.online/arch                   │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  96.4ms │   1gg   │
│Germany   │https://pkg.fef.moe/archlinux                        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.2ms │   1gg   │
│Russia    │http://mirror.nw-sys.ru/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.5ms │   1gg   │
│Moldova   │https://md.arch.niranjan.co                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  98.8ms │   1gg   │
│Russia    │https://mirror.nw-sys.ru/archlinux                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  99.1ms │   1gg   │
│Germany   │http://archlinux.thaller.ws                          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 103.0ms │   1gg   │
│Germany   │https://mirrors.purring.online/arch                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 107.0ms │   1gg   │
│Moldova   │http://mirror.hosthink.net/arch                      │true │success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Ukraine   │http://repo.hyron.dev/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 113.0ms │   1gg   │
│Ukraine   │https://mirror.hostiko.network/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 115.0ms │   1gg   │
│Ukraine   │https://repo.hyron.dev/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Moldova   │http://mirror.ihost.md/archlinux                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Russia    │http://repository.su/archlinux                       │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Russia    │https://repository.su/archlinux                      │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 122.0ms │   1gg   │
│Moldova   │https://mirror.ihost.md/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 123.0ms │   1gg   │
│Ukraine   │http://mirror.hostiko.network/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │ 124.0ms │   1gg   │
│Germany   │http://mirror.informatik.tu-freiberg.de/arch         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://mirror.informatik.tu-freiberg.de/arch        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://archlinux.mirror.iphh.net                     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://mirrors.n-ix.net/archlinux                    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://arch.phinau.de                                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://arch.phinau.de                               │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Türkiye  │http://mirror.nucc.tr/arch                           │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  27.9ms │   1gg   │
│Türkiye  │https://mirror.timtal.com.tr/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  29.4ms │   1gg   │
│Türkiye  │http://mirror.timtal.com.tr/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  30.3ms │   1gg   │
│Romania   │https://mirrors.nxthost.com/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  36.0ms │   1gg   │
│Türkiye  │https://mirror.nucc.tr/arch                          │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  36.5ms │   1gg   │
│Romania   │http://mirrors.nxthost.com/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  37.0ms │   1gg   │
│Romania   │http://mirrors.chroot.ro/archlinux                   │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  49.3ms │   1gg   │
│Germany   │https://mirror.netcologne.de/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  60.4ms │   1gg   │
│Germany   │http://mirror.as20647.net/archlinux                  │true │success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  66.4ms │   1gg   │
│Germany   │https://mirror.ipb.de/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  66.8ms │   1gg   │
│Germany   │http://mirror.ipb.de/archlinux                       │true │success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  67.1ms │   1gg   │
│Germany   │https://mirror.as20647.net/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  67.2ms │   1gg   │
│Romania   │https://mirrors.chroot.ro/archlinux                  │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  68.6ms │   1gg   │
│Germany   │http://ftp.spline.inf.fu-berlin.de/mirrors/archlinux │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  75.5ms │   1gg   │
│Germany   │https://ftp.spline.inf.fu-berlin.de/mirrors/archlinux│false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  75.6ms │   1gg   │
│Romania   │http://mirrors.nav.ro/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  77.1ms │   1gg   │
│Ukraine   │http://distrohub.kyiv.ua/archlinux                   │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  77.9ms │   1gg   │
│Ukraine   │https://distrohub.kyiv.ua/archlinux                  │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  79.3ms │   1gg   │
│Germany   │https://archlinux.richard-neumann.de                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.4ms │   1gg   │
│Germany   │http://linux.rz.rub.de/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │http://mirrors.aminvakil.com/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  84.7ms │   1gg   │
│Germany   │http://mirror.pagenotfound.de/archlinux              │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  86.4ms │   1gg   │
│Germany   │http://mirror.netcologne.de/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  87.7ms │   1gg   │
│Germany   │https://mirrors.aminvakil.com/archlinux              │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  90.9ms │   1gg   │
│Romania   │http://mirror.efect.ro/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  94.4ms │   1gg   │
│Germany   │http://ftp.gwdg.de/pub/linux/archlinux               │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  95.6ms │   1gg   │
│Romania   │https://mirror.efect.ro/archlinux                    │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  95.7ms │   1gg   │
│Germany   │https://mirror.bethselamin.de                        │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  99.0ms │   1gg   │
│Germany   │https://mirror.pagenotfound.de/archlinux             │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 103.0ms │   1gg   │
│Greece    │http://ftp.otenet.gr/linux/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 106.0ms │   1gg   │
│Russia    │http://archlinux.gay/archlinux                       │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 109.0ms │   1gg   │
│Ukraine   │http://mirror.mirohost.net/archlinux                 │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Azerbaijan│http://mirror.yer.az/archlinux                       │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Azerbaijan│https://mirror.yer.az/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 110.0ms │   1gg   │
│Russia    │https://archlinux.gay/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 111.0ms │   1gg   │
│Ukraine   │https://mirror.mirohost.net/archlinux                │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │ 132.0ms │   1gg   │
│Georgia   │http://archlinux.grena.ge                            │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Georgia   │https://archlinux.grena.ge                           │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Greece    │http://ftp.cc.uoc.gr/mirrors/linux/archlinux         │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Russia    │http://mirror.kpfu.ru/archlinux                      │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Russia    │https://mirror.kpfu.ru/archlinux                     │false│success  │   0.01% │  99.99% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://mirror.wtnet.de/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  69.2ms │   1gg   │
│Germany   │https://mirror.wtnet.de/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  69.8ms │   1gg   │
│Germany   │http://ftp.hosteurope.de/mirror/ftp.archlinux.org    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  77.2ms │   1gg   │
│Serbia    │https://mirror1.sox.rs/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  82.2ms │   1gg   │
│Serbia    │http://mirror1.sox.rs/archlinux                      │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  83.5ms │   1gg   │
│Ukraine   │http://archlinux.ip-connect.vn.ua                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  95.5ms │   1gg   │
│Ukraine   │https://archlinux.ip-connect.vn.ua                   │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  95.6ms │   1gg   │
│Russia    │http://mirror.yandex.ru/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Russia    │https://mirror.yandex.ru/archlinux                   │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 120.0ms │   1gg   │
│Moldova   │https://mirror.mangohost.net/archlinux               │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 126.0ms │   1gg   │
│Moldova   │http://mirror.mangohost.net/archlinux                │true │success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 130.0ms │   1gg   │
│Russia    │https://mirror.truenetwork.ru/archlinux              │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 131.0ms │   1gg   │
│Russia    │http://mirror.truenetwork.ru/archlinux               │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 132.0ms │   1gg   │
│Russia    │http://mirror.kamtv.ru/archlinux                     │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 224.0ms │   1gg   │
│Russia    │https://mirror.kamtv.ru/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │ 225.0ms │   1gg   │
│Türkiye  │http://ftp.linux.org.tr/archlinux                    │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://arch.owochle.app                              │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://arch.owochle.app                             │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://ftp.uni-hannover.de/archlinux                 │false│success  │   0.03% │  99.97% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Greece    │https://repo.greeklug.gr/data/pub/linux/archlinux    │false│success  │   0.05% │  99.95% │   0.00%  │   0   │   0.0MiB/s │ 104.0ms │   1gg   │
│Germany   │http://ftp-stud.hs-esslingen.de/pub/Mirrors/archlinux│false│success  │   0.07% │  99.93% │   0.00%  │   0   │   0.0MiB/s │  69.2ms │   1gg   │
│Serbia    │http://mirror.pmf.kg.ac.rs/archlinux                 │false│success  │   0.07% │  99.93% │   0.00%  │   0   │   0.0MiB/s │  76.8ms │   1gg   │
│Germany   │http://ftp.agdsn.de/pub/mirrors/archlinux            │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  68.3ms │   1gg   │
│Bulgaria  │http://mirror.host.ag/archlinux                      │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  74.7ms │   1gg   │
│Germany   │https://ftp.agdsn.de/pub/mirrors/archlinux           │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │  89.4ms │   1gg   │
│Romania   │https://mirrors.hostico.ro/archlinux                 │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │ 115.0ms │   1gg   │
│Romania   │http://mirrors.hostico.ro/archlinux                  │false│success  │   0.08% │  99.92% │   0.00%  │   0   │   0.0MiB/s │ 118.0ms │   1gg   │
│Germany   │http://ftp.uni-bayreuth.de/linux/archlinux           │false│success  │   0.19% │  99.81% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │https://mirrors.janbruckner.de/archlinux             │false│success  │   6.69% │  93.31% │   0.00%  │   0   │   0.0MiB/s │  83.8ms │   1gg   │
│Germany   │http://mirrors.janbruckner.de/archlinux              │false│success  │   6.69% │  93.31% │   0.00%  │   0   │   0.0MiB/s │  90.4ms │   1gg   │
│Germany   │http://ftp.uni-kl.de/pub/linux/archlinux             │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │  95.9ms │   1gg   │
│Germany   │http://mirror.clientvps.com/archlinux                │true │success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │ 106.0ms │   1gg   │
│Germany   │https://mirror.clientvps.com/archlinux               │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │ 117.0ms │   1gg   │
│Germany   │http://ftp.tu-chemnitz.de/pub/linux/archlinux        │false│success  │   6.70% │  93.30% │   0.00%  │   0   │   0.0MiB/s │  error  │   1gg   │
│Germany   │http://artfiles.org/archlinux.org                    │false│success  │   6.82% │  93.18% │   0.00%  │   0   │   0.0MiB/s │  84.5ms │   1gg   │
│Germany   │https://mirror.kumi.systems/archlinux                │false│success  │  29.57% │  70.28% │   0.00%  │   0   │   0.0MiB/s │  80.8ms │   1gg   │
│Germany   │http://mirror.kumi.systems/archlinux                 │false│success  │  29.57% │  70.28% │   0.00%  │   0   │   0.0MiB/s │  81.2ms │   1gg   │
│Germany   │http://os.codefionn.eu/archlinux                     │false│success  │  43.02% │  56.60% │   0.00%  │   0   │   0.0MiB/s │  72.2ms │   1gg   │
│Germany   │https://os.codefionn.eu/archlinux                    │false│success  │  43.02% │  56.60% │   0.00%  │   0   │   0.0MiB/s │  73.5ms │   1gg   │
│Germany   │https://archlinux.homeinfo.de                        │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  76.7ms │   1gg   │
│Albania   │http://al.arch.niranjan.co                           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  77.1ms │   1gg   │
│Albania   │https://al.arch.niranjan.co                          │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 101.0ms │   1gg   │
│Moldova   │http://md.mirrors.hacktegic.com/archlinux            │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 111.0ms │   1gg   │
│Moldova   │https://md.mirrors.hacktegic.com/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │ 139.0ms │   1gg   │
│Ukraine   │http://mirrors.nix.org.ua/linux/archlinux            │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │https://mirrors.nix.org.ua/linux/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │http://mirrors.reitarovskyi.tech/archlinux           │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
│Ukraine   │https://mirrors.reitarovskyi.tech/archlinux          │false│error    │   err   │   err   │   err    │   3   │   0.0MiB/s │  error  │   1gg   │
└──────────┴─────────────────────────────────────────────────────┴─────┴─────────┴─────────┴─────────┴──────────┴───────┴────────────┴─────────┴─────────┘
```

- Hız,Güncelleme,DB karşılaştırma

```bash
[friday13@baba ~]$ ghostmirror -PoDumlsS  ~/.config/ghostmirror/mirrorlist ~/.config/ghostmirror/mirrorlist light state,outofdate,morerecent,extimated,speed
[100.0%] mirrors updates
[100.0%] mirrors speed
┌──────────┬─────────────────────────────────────────────┬─────┬─────────┬─────────┬─────────┬──────────┬───────┬────────────┬─────────┬─────────┐
│ country  │                   mirror                    │proxy│  state  │outofdate│uptodate │morerecent│ retry │   speed    │  ping   │extimated│
├──────────┼─────────────────────────────────────────────┼─────┼─────────┼─────────┼─────────┼──────────┼───────┼────────────┼─────────┼─────────┤
│Germany   │https://ftp.halifax.rwth-aachen.de/archlinux │false│success  │   0.00% │  99.99% │   0.01%  │   0   │   2.1MiB/s │  75.4ms │   1gg   │
│Germany   │https://de.mirrors.cicku.me/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  24.4ms │  10gg   │
│Germany   │http://de.arch.niranjan.co                   │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  53.4ms │  10gg   │
│Germany   │http://mirrors.xtom.de/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  62.4ms │  10gg   │
│Germany   │http://mirror.23m.com/archlinux              │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  56.6ms │  10gg   │
│Germany   │https://de.arch.niranjan.co                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  69.4ms │  10gg   │
│Germany   │http://mirror.lcarilla.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  79.8ms │  10gg   │
│Germany   │https://mirrors.xtom.de/archlinux            │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  90.6ms │  10gg   │
│Russia    │http://ru.mirrors.cicku.me/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  21.6ms │  10gg   │
│Türkiye  │https://tr.arch.niranjan.co                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  53.9ms │  10gg   │
│Germany   │http://ftp.fau.de/archlinux                  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.4MiB/s │  62.0ms │  10gg   │
│Germany   │https://mirror.23m.com/archlinux             │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  56.3ms │  10gg   │
│Azerbaijan│https://mirror.ourhost.az/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  63.0ms │  10gg   │
│Romania   │http://mirrors.pidginhost.com/arch           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  37.1ms │  10gg   │
│Germany   │https://ftp.fau.de/archlinux                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  62.0ms │  10gg   │
│Germany   │https://mirror.selfnet.de/archlinux          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  70.3ms │  10gg   │
│Germany   │http://arch.jensgutermuth.de                 │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  68.9ms │  10gg   │
│Germany   │https://mirror.moson.org/arch                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  74.1ms │  10gg   │
│Germany   │https://arch.jensgutermuth.de                │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.3MiB/s │  69.2ms │  10gg   │
│Russia    │https://ru.mirrors.cicku.me/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.2MiB/s │  21.9ms │  10gg   │
│Germany   │http://mirror.selfnet.de/archlinux           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.2MiB/s │  94.7ms │  10gg   │
│Germany   │https://mirrors.n-ix.net/archlinux           │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.1MiB/s │  75.2ms │  10gg   │
│Bulgaria  │http://mirror.telepoint.bg/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.6MiB/s │  34.4ms │   9gg   │
│Bulgaria  │http://mirrors.uni-plovdiv.net/archlinux     │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.6MiB/s │  41.5ms │   9gg   │
│Germany   │http://de.mirrors.cicku.me/archlinux         │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  26.0ms │   9gg   │
│Bulgaria  │https://mirrors.uni-plovdiv.net/archlinux    │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  45.2ms │   9gg   │
│Bulgaria  │https://mirror.telepoint.bg/archlinux        │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.5MiB/s │  34.7ms │   9gg   │
│Romania   │http://mirror.ro.cdn-perfprod.com/archlinux  │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   2.1MiB/s │  73.9ms │   9gg   │
│Germany   │http://mirror.fra10.de.leaseweb.net/archlinux│false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   1.7MiB/s │  68.2ms │   5gg   │
│Romania   │https://mirrors.pidginhost.com/arch          │false│success  │   0.00% │ 100.00% │   0.00%  │   0   │   1.7MiB/s │  42.9ms │   5gg   │
└──────────┴─────────────────────────────────────────────┴─────┴─────────┴─────────┴─────────┴──────────┴───────┴────────────┴─────────┴─────────┘
```

- Systemd Zamanlayıcı

```bash
[friday13@baba ~]$ systemctl --user list-timers
NEXT LEFT LAST                         PASSED UNiT              ACTiVATES
-       - Wed 2025-08-13 01:41:07 +03 32s ago ghostmirror.timer ghostmirror.service

1 timers listed.
Pass --all to see loaded but inactive timers, too.
```
