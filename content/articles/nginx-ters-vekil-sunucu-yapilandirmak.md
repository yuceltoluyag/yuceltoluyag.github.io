Title: Nginx'i Ters Vekil Sunucu (Reverse Proxy) Olarak Yapılandırmak
Date: 2026-06-26 02:40
Category: Sunucu
Tags: Nginx, Reverse Proxy, Linux, Web Geliştirme, Sunucu
Slug: nginx-ters-vekil-sunucu-yapilandirmak
Authors: yuceltoluyag
Status: published
Summary: Node.js ve diğer web uygulamalarınızın önüne Nginx ters vekil sunucusu konumlandırarak güvenlik, hız sınırlandırma ve performans artırma rehberi.
Template: article
Lang: tr
Translation: false

Geçen hafta eski bir projenin Nginx konfigürasyonunu düzenlerken o meşhur `proxy_pass http://127.0.0.1:3000/;` satırının sonundaki slaş (`/`) karakteri yüzünden tüm API rotalarının 404 verdiğini fark ettim. Nedenini anlamak için saatlerce saç baş yoldum. Hatta bir ara eşim içeriden seslenip "Yücel, yine o ufacık slaş karakteri yüzünden mi uyumuyorsun?" dedi. O an hem güldüm hem de web geliştirme dünyasındaki bu unglamorous (gösterişsiz ama hayati) detayların bizi nasıl uykusuz bıraktığını tekrar hatırladım.

Bilgisayarımızda çalışırken her şey basittir. Node.js uygulamamız 3000 portunu dinler, biz de tarayıcıdan `localhost:3000` yazıp işimize bakarız. Ancak canlıya çıkış (production) anı geldiğinde işin rengi tamamen değişir. Artık bir alan adımız, 443 portundan HTTPS trafiğimiz ve tüm internetten gelebilecek binlerce kullanıcı vardır. 

Uygulamanın kendisini doğrudan internete açmak, evinizin dış kapısını söküp sokaktaki herkesin doğrudan yatak odanıza kadar yürümesine izin vermeye benzer. İşte bu yüzden dostum, bugün internet trafiğiyle uygulama kodumuz arasına o aşılmaz Nginx duvarını nasıl öreceğimizi konuşacağız.

---

## 🛑 Nginx Hangi Sorunu Çözer?

Uygulama sunucuları (Node.js, Python, Go vb.) iş mantığını çalıştırmakta iyidir. Ancak internetten gelen vahşi trafiği doğrudan göğüslemek onların işi değildir. Nginx, uygulamanın üzerinden şu yükleri almak için vardır:

*   TLS (SSL) sertifikasını sonlandırmak ve süresi bitmeden yenilemek.
*   Statik dosyaları (resim, CSS, JS), uygulama sunucusunu hiç yormadan doğrudan diskten jet hızıyla sunmak.
*   Yavaş bağlantıya sahip istemcilerin soketlerini açık tutarak uygulamanın kilitlenmesini önlemek.
*   İstek boyutu limitlerini ve zaman aşımlarını (timeout) yönetmek.
*   İstek sınırlandırma (rate limiting) ile kötü niyetli taramaları engellemek.
*   Uygulama yeniden başlatılırken gelen istekleri kuyruğa alıp kesinti yaşatmamak.

Nginx tüm bu halka açık işleri üzerine alır, arkasındaki uygulama ise sadece kendi kodunu çalıştırmaya odaklanır. (Örneğin, Node.js uygulamanızı Docker konteynerlerinde güvenli bir şekilde çalıştırmak ve yapılandırmak için [Docker ve Node.js: Root Olmadan Çalıştırmak](/docker-node-js-root-olmadan-calistirmak/) rehberime göz atabilirsiniz.)

---

## 💡 Temel Fikir: Ters Vekil Sunucu (Reverse Proxy)

Nginx'i sistemin tek giriş kapısı haline getiririz. Dış dünya sadece Nginx ile konuşur (443 portu, TLS ile). Nginx ise aldığı istekleri arka planda, sadece yerel ağdan erişilebilen uygulamaya (3000 portu, şifresiz HTTP ile) iletir.

```
istemci -> nginx (443, TLS) -> uygulama (3000, plain http)
```

Bu yapıya ters vekil sunucu (reverse proxy)[^1] diyoruz. İstemciler arkadaki uygulamanın varlığından haberdar bile olmazlar.

---

## 🏗️ Nginx Nasıl Çalışır?

Nginx, bir adet **master** süreç ve çekirdek sayısına göre yapılandırılan **worker** süreçlerinden oluşur:

```
master process
   ├── worker process (çekirdek 1)
   ├── worker process (çekirdek 2)
   └── worker process (çekirdek 3)
```

Master süreç konfigürasyonu okur, portları bağlar ve işçi (worker) süreçleri yönetir. Asıl işi yapan işçiler ise olay döngüsü (event loop) mimarisiyle çalışır. Eski nesil web sunucuları (örneğin Apache'nin klasik modeli) her bağlantı için ayrı bir iş parçacığı (thread) açarken, Nginx tek bir işçi süreciyle Linux çekirdeğinin olay bildirim mekanizmasını (`epoll`)[^2] kullanarak binlerce bağlantıyı aynı anda yönetebilir.

Bu sayede, yavaş veya boşta bekleyen bir istemci Nginx için neredeyse sıfır maliyetlidir. Nginx bu yavaş bağlantıları sünger gibi emer ve arkadaki uygulamaya sadece tamamen hazır istekleri iletir.

---

## 📁 Server ve Location Blokları

Nginx konfigürasyonunun temeli `server` ve `location` bloklarına dayanır.

### Server Bloğu

Bir alan adı ve port için gelen trafiğin nasıl karşılanacağını belirler:

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

### Location Bloğu

Gelen isteğin yoluna (path) göre ne yapılacağına karar verir:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
}

location /static/ {
    root /var/www/app;
}
```

`/static/` altındaki dosyalar doğrudan diskten okunup gönderilir. Uygulama sunucusu bu isteklerden hiç haberdar olmaz.

---

## ⚡ proxy_pass ve Sondaki Slaş (/) Detayı

Beni gece uykusuz bırakan o meşhur slaş kuralı şudur:

```nginx
# Durum A: Slaş var
location /api/ {
    proxy_pass http://127.0.0.1:3000/;
}
```

```nginx
# Durum B: Slaş yok
location /api/ {
    proxy_pass http://127.0.0.1:3000;
}
```

!!! warning "Kritik Detay: proxy_pass Satırındaki Slaş (/) Ayrıntısı! ⚠️"
    Eğer `proxy_pass` satırının sonunda `/` varsa (Durum A), Nginx eşleşen `/api/` önekini kırpar ve `/api/users` isteği uygulamaya `/users` olarak iletilir.
    
    Eğer sonda `/` yoksa (Durum B), Nginx yolu değiştirmeden aynen iletir ve `/api/users` isteği uygulamaya yine `/api/users` olarak gider. Bu ufacık karakter farkı API rotalarınızın 404 vermesine neden olabilir!

---

## ℹ️ İstemci Bilgilerini Arkaya İletmek

Uygulama sadece Nginx ile konuştuğu için varsayılan olarak tüm isteklerin `127.0.0.1` adresinden geldiğini sanır. Bu durum loglama ve güvenlik kontrollerini bozar. Gerçek istemci bilgilerini başlıklar (headers) ile arkaya taşımalıyız:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;

    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

*   `Host`: İstemcinin asıl talep ettiği alan adını iletir.
*   `X-Real-IP`: İstemcinin doğrudan IP adresini taşır.
*   `X-Forwarded-For`: İsteğin geçtiği tüm vekil sunucu IP zincirini taşır.
*   `X-Forwarded-Proto`: Orijinal isteğin HTTP mi yoksa HTTPS mi olduğunu uygulamaya bildirir.

---

## 🔌 WebSocket Desteği

Standart HTTP yönlendirmesi WebSocket bağlantılarını taşıyamaz. WebSocket geçişi için bağlantıyı yükseltme (upgrade) başlıklarını eklememiz gerekir:

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:3000;

    proxy_http_version 1.1;
    proxy_set_header Upgrade    $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

---

## 🗄️ Tamponlama (Buffering) ve Zaman Aşımları (Timeouts)

Nginx, uygulamadan gelen yanıtları varsayılan olarak tampon belleğe (buffer) çeker. Uygulama yanıtı milisaniyeler içinde Nginx'e teslim edip yeni işlere dönerken, Nginx bu yanıtı yavaş yavaş istemciye damlatır.

Ancak anlık veri akışı gerektiren durumlarda (Server-Sent Events veya anlık sohbet hatları gibi) bu tamponlamayı kapatmak gerekir:

```nginx
location /events/ {
    proxy_pass http://app;
    proxy_buffering off;
}
```

Zaman aşımları ise sistemin kararlılığı için kritiktir:

```nginx
# Arka plan bağlantı süreleri
proxy_connect_timeout 5s;
proxy_send_timeout    60s;
proxy_read_timeout    60s;

# İstemci bağlantı süreleri
client_header_timeout 10s;
client_body_timeout   10s;
keepalive_timeout     65s;
```

`proxy_connect_timeout` süresini düşük tutarak (örneğin 5 saniye) çöken bir uygulamada hızlıca hata yanıtı (502) dönmesini sağlayabiliriz. (Eğer sunucunuzun genel ağ performansını ve TCP limitlerini daha da yukarı çekmek isterseniz [Linux TCP Tuning & Node.js Microservices](/linux-tcp-tuning-node-js-microservices/) yazıma göz atabilirsiniz.)

---

## 🚀 HTTP/2 ve Yanıt Sıkıştırma (gzip)

HTTP/2 protokolü, tek bir TCP bağlantısı üzerinden birden fazla isteğin eşzamanlı taşınmasını sağlar. Nginx üzerinde bunu aktifleştirmek tek satırdır:

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name example.com;
}
```

Ayrıca HTML, CSS, JS ve JSON gibi metin tabanlı yanıtları sıkıştırarak ağ yükünü azaltabiliriz:

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_min_length 1024;
gzip_comp_level 5;
```

---

## 🛡️ Güvenlik ve Hız Sınırlandırma (Rate Limiting)

Uygulama rotalarının (özellikle login veya arama gibi ağır rotaların) suistimal edilmesini önlemek için Nginx'in hız sınırlandırma özelliğini kullanırız:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
}

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://app;
    }
}
```

Burada kullanıcı IP'sine göre saniyede 10 istek sınırı koyduk, anlık patlamalar için ise 20 isteğe kadar tolerans tanıdık. Sınırı aşan istemcilere doğrudan `429 Too Many Requests` durum kodu dönecektir.

Ayrıca Nginx sürüm numarasını gizlemek güvenlik taramalarında elimizi güçlendirir:

```nginx
server_tokens off;
```

Sitenizin başka siteler içinde iframe olarak açılmasını (Clickjacking saldırıları) engellemek için ise şu başlıkları eklemeliyiz:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy "frame-ancestors 'self'" always;
```

---

## 🛠️ Üretime Hazır Örnek Nginx Yapılandırması

Tüm bu anlattığımız özellikleri barındıran, üretime hazır tam bir `nginx.conf` şablonu:

```nginx
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 16384;
}

http {
    server_tokens off;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    upstream app {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001; # Yük dengeleme için ikinci sunucu
    }

    # HTTP'den HTTPS'e yönlendirme
    server {
        listen 80;
        server_name example.com;
        return 301 https://$host$request_uri;
    }

    # Ana HTTPS Sunucusu
    server {
        listen 443 ssl;
        http2 on;
        server_name example.com;

        ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

        client_max_body_size 25m;

        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Content-Security-Policy "frame-ancestors 'self'" always;

        # Statik dosyaları doğrudan diskten sunuyoruz
        location /static/ {
            root /var/www/app;
            expires 30d;
        }

        # API istekleri hız sınırı ile vekile gidiyor
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_req_status 429;

            proxy_pass http://app;

            proxy_set_header Host              $host;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_read_timeout 60s;
        }

        # Diğer tüm istekler uygulamaya yönleniyor
        location / {
            proxy_pass http://app;

            proxy_set_header Host              $host;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## ⚙️ Nginx Yönetimi ve Komutlar

Yapılandırmada değişiklik yaptıktan sonra Nginx'i yeniden başlatmadan önce mutlaka test edin:

```bash
$ nginx -t
```

Eğer test başarılıysa, mevcut bağlantıları koparmadan konfigürasyonu sessizce yeniden yükleyebilirsiniz:

```bash
$ nginx -s reload
```

Hataları incelemek için ise hata günlüklerini (error log) canlı olarak takip etmek en pratik yoldur:

```bash
$ tail -f /var/log/nginx/error.log
```

Nginx'i uygulamanın önüne koymak, işleri birbirinden ayırmaktır. Uygulamanız sadece kodunu çalıştırır; geri kalan tüm ağır dış dünya işlerini Nginx sırtlanır ve sistemin nefes almasını sağlar.

## 🔗 İlgili Yazılar
- [Docker ve Node.js: Root Olmadan Çalıştırmak](/docker-node-js-root-olmadan-calistirmak/)
- [Linux TCP Tuning & Node.js Microservices](/linux-tcp-tuning-node-js-microservices/)

[^1]: İstemciler ile sunucular arasında durarak dışarıdan gelen istekleri karşılayan ve arka plandaki sunuculara yönlendiren aracı sunucudur.
[^2]: Linux çekirdeğinin giriş/çıkış (I/O) olaylarını izlemek için kullandığı yüksek performanslı olay bildirim mekanizmasıdır.
