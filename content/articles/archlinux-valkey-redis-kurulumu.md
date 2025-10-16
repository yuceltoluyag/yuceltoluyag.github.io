Title: Arch Linux Üzerinde Valkey (Redis Alternatifi) Kurulumu
Date: 2025-08-17 07:30
Category: Linux
Tags: redis, valkey, archlinux, cache, message broker
Slug: archlinux-valkey-redis-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Redis'in özgür alternatifi Valkey’in nasıl kurulacağını, yapılandırılacağını ve yaygın hataların nasıl çözüleceğini adım adım öğrenin.
Template: article
Image: images/archlinux-valkey-redis-kurulumu-xl.webp



## Giriş: Redis mi, Valkey mi? 🤔  

Son zamanlarda **Redis Inc. lisans değişikliği** yaptı ve bu da açık kaynak dünyasında tartışmalara yol açtı. Topluluk da boş durmadı ve **Valkey** adında özgür, topluluk odaklı bir fork oluşturdu.  

Valkey aslında Redis’in birebir alternatifi diyebileceğimiz bir yazılım:  

- **Bellek içi veritabanı** 🧠  
- **Dağıtık cache sistemi** ⚡  
- **Mesaj kuyruğu & broker** 📬  

Eğer daha önce Redis kullandıysanız, Valkey’i hiç zorlanmadan kullanabilirsiniz. Bu yazıda Arch Linux üzerinde Valkey kurulumu, yapılandırması ve yaygın sorunların çözümünü adım adım anlatacağım.  
[responsive_img src="/images/archlinux-valkey-redis-kurulumu-xl.webp" alt="Arch Linux Valkey Kurulumu" /]
---

## 1. Valkey Kurulumu 🚀  

Arch Linux kullanıyorsanız işiniz çok kolay çünkü Valkey resmi depolarda mevcut.  

### Adım 1: Paket kurulumu  

```bash
sudo pacman -S valkey
```

### Adım 2: Servisi başlatmak ve aktifleştirmek

```bash
sudo systemctl start valkey.service
sudo systemctl enable valkey.service
```

Durumu kontrol etmek için:

```bash
systemctl status valkey.service
```

Yeşil bir `active (running)` görüyorsanız, Valkey başarıyla çalışıyor demektir. 🎉

```bash
[friday13@baba ~]$ systemctl status valkey.service  
● valkey.service - Advanced key-value store
     Loaded: loaded (/usr/lib/systemd/system/valkey.service; enabled; preset: disabled)
     Active: active (running) since Fri 2025-08-15 15:49:17 +03; 1 day 15h ago
 Invocation: c53b3b13df024fc8ab004eaf48d3754a
   Main PID: 220586 (valkey-server)
     Status: "Ready to accept connections"
      Tasks: 6 (limit: 18627)
     Memory: 4.3M (peak: 7.5M, swap: 1.9M, swap peak: 2.2M)
        CPU: 2min 52.383s
     CGroup: /system.slice/valkey.service
             └─220586 "/usr/bin/valkey-server 127.0.0.1:6379"

Ağu 17 06:45:05 baba valkey-server[220586]: 220586:M 17 Aug 2025 06:45:05.283 * 100 changes in 300 seconds. Saving...
Ağu 17 06:45:05 baba valkey-server[220586]: 220586:M 17 Aug 2025 06:45:05.283 * Background saving started by pid 1097543
Ağu 17 06:45:05 baba valkey-server[1097543]: 1097543:C 17 Aug 2025 06:45:05.288 * DB saved on disk
Ağu 17 06:45:05 baba valkey-server[1097543]: 1097543:C 17 Aug 2025 06:45:05.288 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
Ağu 17 06:45:05 baba valkey-server[220586]: 220586:M 17 Aug 2025 06:45:05.384 * Background saving terminated with success
Ağu 17 07:20:02 baba valkey-server[220586]: 220586:M 17 Aug 2025 07:20:02.485 * 100 changes in 300 seconds. Saving...
Ağu 17 07:20:02 baba valkey-server[220586]: 220586:M 17 Aug 2025 07:20:02.485 * Background saving started by pid 1107674
Ağu 17 07:20:02 baba valkey-server[1107674]: 1107674:C 17 Aug 2025 07:20:02.488 * DB saved on disk
Ağu 17 07:20:02 baba valkey-server[1107674]: 1107674:C 17 Aug 2025 07:20:02.488 * Fork CoW for RDB: current 0 MB, peak 0 MB, average 0 MB
Ağu 17 07:20:02 baba valkey-server[220586]: 220586:M 17 Aug 2025 07:20:02.585 * Background saving terminated with success
```

---

## 2. Valkey İstemcileri 🔌

Valkey’i kullanacak uygulamalar için istemci kütüphaneleri gerekir. Öne çıkanlar:

* **Python:** `python-redis`
* **PHP:** `php-redis`
* **C:** `hiredis`

Örneğin Python için:

```bash
sudo pacman -S python-redis
```

CLI üzerinden test:

```bash
valkey-cli
127.0.0.1:6379> set foo "merhaba"
OK
127.0.0.1:6379> get foo
"merhaba"
```

---

## 3. Valkey Yapılandırması ⚙️

Ayar dosyası:

```
/etc/valkey/valkey.conf
```

### Port ayarı

```conf
port 6379
```

TCP bağlantısını kapatmak için:

```conf
port 0
```

---

### Unix Socket ile Çalıştırmak 🔒

```conf
unixsocket /run/valkey/valkey.sock
unixsocketperm 770
```

Sonrasında kullanıcı ekleme:

```bash
sudo usermod -aG valkey http
sudo usermod -aG valkey git
```

Servisi yeniden başlatın:

```bash
sudo systemctl restart valkey.service
```

---

## 4. Yaygın Sorunlar ve Çözümleri 🛠️

### Transparent Huge Pages (THP) Uyarısı

<div class="info-box warning">
    <div>
        <div class="alert-title">Uyarı</div>
        <p>THP açık kalırsa Valkey performans sorunlarına yol açabilir.</p>
    </div>
</div>

```bash
sudo nano /etc/tmpfiles.d/valkey.conf
```

İçerik:

```
w /sys/kernel/mm/transparent_hugepage/enabled - - - - never
w /sys/kernel/mm/transparent_hugepage/defrag - - - - never
```

---

### TCP Backlog Hatası

```bash
sudo nano /etc/sysctl.d/99-sysctl.conf
```

Ekle:

```
net.core.somaxconn=512
```

Uygula:

```bash
sudo sysctl --system
```

---

### Overcommit Memory Uyarısı

```
vm.overcommit_memory=1
```

Aynı şekilde `99-sysctl.conf` içine ekleyebilirsiniz.

---

## 5. Kullanışlı İpuçları ✨

### 5.1 Otomatik Tamamlama (Zsh)

```bash
compdef '_dispatch redis-cli_completion redis-cli' valkey-cli
```

Bunu `~/.zshrc` dosyanıza ekleyin.

Eğer zsh nedir bilmiyorsanız şu yazıya göz atabilirsiniz: [Oh My ZSH Kurulumu (Tema ve Eklentiler Dahil)](/oh-my-zsh-kurulumu-tema-ve-eklentiler/)

---

### 5.2 CLI’de Temel Komutlar

```bash
set key "value"   # Değer kaydet
get key           # Değeri al
del key           # Anahtarı sil
keys *            # Tüm anahtarları listele
flushall          # Tüm verileri sil
```

---

## 6. Gerçek Hayatta Kullanım Senaryoları 💡

* **Cache sistemi:** Veritabanı sorgularını hızlandırma.
* **Oturum yönetimi:** Kullanıcı oturumlarını tutma.
* **Mesaj kuyruğu:** Mikro servisler arasında iletişim.
* **Sayaçlar:** Ziyaretçi, beğeni vb. gerçek zamanlı sayaçlar.

---

## Sonuç 🎯

Bu yazıda Arch Linux üzerinde **Valkey (Redis alternatifi)** kurulumu, yapılandırması, istemci kütüphaneleri ve sık karşılaşılan sorunların çözümünü adım adım öğrendiniz.

Artık Valkey’i hem geliştirme ortamınızda hem de üretim sunucularınızda gönül rahatlığıyla kullanabilirsiniz. 💚



---


