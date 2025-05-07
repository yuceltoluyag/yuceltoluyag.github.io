Title: Arch Linux'ta Transmission Nasıl Kurulur ve Kullanılır?
Date: 2025-05-08 12:00
Category: linux
Tags: Arch Linux, Transmission, BitTorrent, İndirme, Yükleme, Komut Satırı, Web Arayüzü
Slug: arch-linux-transmission-kurulum
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Transmission'ı nasıl kurar ve kullanırsınız? Bu rehberde, Transmission'ın kurulumunu, yapılandırmasını ve en verimli şekilde nasıl kullanabileceğinizi adım adım keşfedeceksiniz.
Template: article
Image: images/Transmission-lg.webp


# Arch Linux'ta Transmission Nasıl Kurulur ve Kullanılır?

Transmission, açık kaynaklı bir BitTorrent istemcisidir. Hızlı, hafif ve kullanımı kolay olmasıyla tanınır. Bu yazıda, Arch Linux üzerinde Transmission'ı nasıl kurup yapılandırabileceğinizi detaylı adımlar ile açıklayacağız. Ayrıca, Transmission'ı hem komut satırı (CLI) hem de grafiksel kullanıcı arayüzü (GUI) üzerinden nasıl kullanabileceğinizi de göstereceğiz. İster torrent dosyaları indiriyor olun, ister torrent paylaşımı yapıyor olun, bu rehber size yardımcı olacaktır.

## 1. Adım: Transmission’ı Yüklemek

Arch Linux'ta Transmission'ı yüklemek oldukça basittir. `pacman` paket yöneticisi ile kolayca kurulum yapabilirsiniz. İhtiyacınıza göre iki sürümden birini tercih edebilirsiniz: komut satırı sürümü ya da grafiksel kullanıcı arayüzü (GUI) sürümü.

### 1.1 Komut Satırı (CLI) Sürümü Yüklemek

Transmission'ın komut satırı sürümünü yüklemek için terminalinizi açın ve şu komutu çalıştırın:

```bash
sudo pacman -S transmission-cli
```

Bu komut, sadece komut satırından çalıştırabileceğiniz Transmission'ı yükler.

### 1.2 Grafiksel (GUI) Sürümü Yüklemek

Eğer bir masaüstü ortamı kullanıyorsanız ve daha kullanıcı dostu bir arayüz tercih ediyorsanız, grafiksel sürümü yüklemek için şu komutu kullanabilirsiniz:

```bash
sudo pacman -S transmission-gtk
```

Bu sürüm, görsel bir arayüz sunar ve torrentlerinizi daha kolay yönetmenizi sağlar.

---

## 2. Adım: Transmission’ı Başlatmak

Transmission’ı yükledikten sonra, hemen kullanmaya başlayabilirsiniz. Burada, Transmission’ı komut satırı (CLI) ve grafiksel arayüz (GUI) üzerinden başlatma yöntemlerini inceleyeceğiz.

### 2.1 Transmission Daemon'ı Başlatmak (Komut Satırı)

Transmission'ı arka planda çalıştırmak için daemon olarak başlatmak gerekir. Bunu yapmak için şu komutu kullanabilirsiniz:

```bash
transmission-daemon
```

Bu komut, Transmission'ı bir servis olarak başlatır. Artık web arayüzü üzerinden ya da komut satırından Torrent dosyalarını yönetebilirsiniz.

### 2.2 Web Arayüzü Kullanarak Transmission’a Erişmek

Transmission’ı başlattıktan sonra, web arayüzüne de erişebilirsiniz. Web arayüzü, internet tarayıcınızda şu URL üzerinden çalışır:

```
http://localhost:9091
```

Varsayılan olarak, Transmission web arayüzü sadece localhost üzerinden erişilebilir. Bunu dışarıdan erişilebilir hale getirmek için yapılandırma dosyasını düzenlemeniz gerekebilir.

---

## 3. Adım: Transmission Yapılandırması

Transmission’ı kullanmaya başlamak için yapılandırma dosyasını düzenlemeniz gerekebilir. Yapılandırma dosyası genellikle `settings.json` olarak kaydedilir ve şu dizinde bulunur:

```bash
~/.config/transmission-daemon/settings.json
```

### 3.1 Web Arayüzünü Etkinleştirme

Eğer web arayüzüne erişmek istiyorsanız, `settings.json` dosyasını düzenlemeniz gerekecek. Aşağıdaki parametreleri `true` yaparak web arayüzünü etkinleştirebilirsiniz:

```json
"rpc-enabled": true,
"rpc-bind-address": "0.0.0.0",  // dış erişim için 0.0.0.0
"rpc-port": 9091,  // Web arayüzüne bağlanmak için port
"rpc-whitelist": "127.0.0.1",  // Yerel ağ erişimi için
"rpc-whitelist-enabled": true
```

### 3.2 Hız Sınırlamaları ve Diğer Ayarlar

Transmission üzerinden indirme ve yükleme hızını sınırlamak için de yapılandırma dosyasını kullanabilirsiniz. Örneğin:

```json
"download-limit": 1000000,  // 1 MB/s indirme hızı
"upload-limit": 1000000,    // 1 MB/s yükleme hızı
```

---

## 4. Adım: Transmission’ı Sistem Servisi Olarak Çalıştırmak

Eğer Transmission’ı her açılışta otomatik olarak başlatmak istiyorsanız, bunu bir sistem servisi olarak yapılandırabilirsiniz.

### 4.1 Systemd Servisi Oluşturmak

Aşağıdaki adımları izleyerek Transmission'ı systemd servisi olarak başlatabilirsiniz.

1. **Servis Dosyası Oluşturun:**

   ```bash
   sudo nano /etc/systemd/system/transmission-daemon.service
   ```

2. **Servis Dosyasını Düzenleyin:**
   Servis dosyasının içeriği şu şekilde olmalıdır:

   ```ini
   [Unit]
   Description=Transmission Daemon
   After=network.target

   [Service]
   User=yourusername
   ExecStart=/usr/bin/transmission-daemon --foreground --no-daemon
   ExecStop=/usr/bin/transmission-daemon --stop
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

3. **Servisi Başlatmak ve Etkinleştirmek:**
   Bu servis dosyasını kaydettikten sonra, aşağıdaki komutlarla servisi başlatabilir ve etkinleştirebilirsiniz:

   ```bash
   sudo systemctl enable transmission-daemon
   sudo systemctl start transmission-daemon
   ```

---

## 5. Adım: Torrent Dosyalarını Yönetmek

Transmission üzerinde torrent dosyalarınızı yönetmek oldukça basittir. İster komut satırı ister web arayüzü kullanarak torrentleri ekleyebilir, indirebilir ve paylaşabilirsiniz.

### 5.1 Web Arayüzü Üzerinden Torrent Ekleme

Web arayüzü üzerinden torrent eklemek için:

1. Tarayıcınızda `http://localhost:9091` adresine gidin.
2. “Ekle” butonuna tıklayın ve torrent dosyasını yükleyin.
3. İndirme işlemini başlatın.
[responsive_img src="/images/Transmission-lg.webp" alt="Transmission Web Arayüzü" /]
### 5.2 Komut Satırı Üzerinden Torrent Ekleme

Komut satırından bir torrent dosyası eklemek için:

```bash
transmission-remote -a /path/to/your/torrent/file
```

---

## Sonuç

Arch Linux üzerinde Transmission'ı kurmak ve yapılandırmak oldukça basit bir işlemdir. Bu rehberde, Transmission'ın hem komut satırı (CLI) hem de grafiksel kullanıcı arayüzü (GUI) ile nasıl çalıştırılacağını ve yapılandırılacağını detaylı bir şekilde öğrendiniz. Artık Transmission ile torrent dosyalarınızı kolayca indirebilir ve paylaşabilirsiniz.



Eğer başka bir sorunuz varsa veya adımlarda takıldığınız bir nokta olduysa, yorum kısmında sorularınızı sorabilirsiniz!

---
