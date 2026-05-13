Title: Arch Linux’ta PostgreSQL ve pgAdmin4 Kurulumu ve Kullanımı – Adım Adım Rehber
Date: 2025-08-15 00:30
Category: Linux
Tags: archlinux, postgresql, pgadmin4, veritabanı, kurulum, rehber
Slug: arch-linux-postgresql-pgadmin4-kurulum-rehber
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde PostgreSQL veritabanını kurma, yapılandırma ve pgAdmin4 GUI aracıyla kullanma sürecini baştan sona anlatan samimi ve yeni başlayanlar için anlaşılır rehber.
Template: article
Image: images/arch-linux-postgresql-pgadmin4-kurulum-rehber-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/115036508906982668
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lwikaknsa22l



🚀 **Giriş**

PostgreSQL, güçlü bir ilişkisel veritabanı sistemi olarak veri güvenliği, JSON desteği ve esnek yapısıyla bilinir. Arch Linux ise minimal yapısı ve güncel paketleri sayesinde PostgreSQL kurulumu için mükemmel bir ortam sunar.

Bu rehberde adım adım:

- PostgreSQL’in kurulumu
- Veritabanı ve kullanıcı oluşturma
- `pgAdmin4` ile görsel yönetim
- Karşılaşabileceğiniz yaygın hatalar ve çözümler

…konularını işleyeceğiz. Hazırsanız başlayalım! 🔧

---

## 📌 1. PostgreSQL Kurulumu

Arch Linux’ta `pacman` paket yöneticisi ile kurulum çok basittir. Hadi başlayalım.

### ✅ Adım 1: Paketi İndirme ve Kurulum

Terminali açıp aşağıdaki komutu çalıştırın:

```bash
sudo pacman -S postgresql
```

Onaylamak için `y` tuşuna basmanız yeterlidir.

!!! note "Arch Linux’un rolling release yapısı sayesinde PostgreSQL her zaman güncel gelir. Bu, güvenlik açısından büyük bir avantajdır."

### ✅ Adım 2: Servisi Başlatma ve Enable Etme

Kurulum tamamlandıktan sonra servisi başlatalım ve sistem açılışında otomatik çalışmasını sağlayalım:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Durumu kontrol etmek için:

```bash
systemctl status postgresql
```

!!! note "Servis durumu: <code>active (running)</code> ise her şey yolunda demektir. 👍"

örnek çıktı:

```bash
[friday13@baba ~]$ systemctl status postgresql
● postgresql.service - PostgreSQL database server
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; preset: disabled)
     Active: active (running) since Fri 2025-08-15 00:38:54 +03; 3h 17min ago
 Invocation: 38373934efff4bf99d54aa90fadb77da
       Docs: man:postgres(1)
    Process: 399869 ExecStartPre=/usr/bin/postgresql-check-db-dir ${PGROOT}/data (code=exited, status=0/SUCCESS)
   Main PID: 399872 (postgres)
      Tasks: 9 (limit: 18626)
     Memory: 36.7M (peak: 92.2M, swap: 31.9M, swap peak: 31.9M)
        CPU: 2.873s
     CGroup: /system.slice/postgresql.service
             ├─399872 /usr/bin/postgres -D /var/lib/postgres/data
             ├─399875 "postgres: checkpointer "
             ├─399876 "postgres: background writer "
             ├─399879 "postgres: walwriter "
             ├─399880 "postgres: autovacuum launcher "
             ├─399881 "postgres: logical replication launcher "
             ├─479979 "postgres: crm_user crm_db ::1(55162) idle"
             ├─479980 "postgres: crm_user postgres ::1(55176) idle"
             └─479981 "postgres: crm_user servis_crm_db ::1(55182) idle"

Ağu 15 00:58:54 baba postgres[399875]: 2025-08-15 00:58:54.656 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 00:59:07 baba postgres[399875]: 2025-08-15 00:59:07.122 +03 [399875] LOG:  checkpoint complete: wrote 125 buffers (0.8%); 0 WAL file(s) added, 0 removed, 0 recycled; write=12.439 s, sync=0.019 s, total=12.467 s; sync files=125, longest=0.004 s, average=0.001 s; distance=705 kB, estimate=3540 kB; lsn=0/1EC>
Ağu 15 01:53:54 baba postgres[399875]: 2025-08-15 01:53:54.983 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 01:53:55 baba postgres[399875]: 2025-08-15 01:53:55.297 +03 [399875] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.302 s, sync=0.005 s, total=0.314 s; sync files=2, longest=0.005 s, average=0.003 s; distance=15 kB, estimate=3188 kB; lsn=0/1ECC7D0, r>
Ağu 15 02:03:54 baba postgres[399875]: 2025-08-15 02:03:54.447 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 02:03:58 baba postgres[399875]: 2025-08-15 02:03:58.975 +03 [399875] LOG:  checkpoint complete: wrote 46 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.513 s, sync=0.009 s, total=4.529 s; sync files=30, longest=0.005 s, average=0.001 s; distance=27 kB, estimate=2871 kB; lsn=0/1ED3580,>
Ağu 15 02:28:55 baba postgres[399875]: 2025-08-15 02:28:55.350 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 02:28:55 baba postgres[399875]: 2025-08-15 02:28:55.562 +03 [399875] LOG:  checkpoint complete: wrote 2 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.201 s, sync=0.005 s, total=0.213 s; sync files=2, longest=0.005 s, average=0.003 s; distance=6 kB, estimate=2585 kB; lsn=0/1ED4F08, re>
Ağu 15 03:03:55 baba postgres[399875]: 2025-08-15 03:03:55.741 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 03:03:56 baba postgres[399875]: 2025-08-15 03:03:56.153 +03 [399875] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.402 s, sync=0.004 s, total=0.412 s; sync files=2, longest=0.004 s, average=0.002 s; distance=12 kB, estimate=2328 kB; lsn=0/1ED8100, r>
```

!!! note "PostgreSQL servisi çalışıyor ve durumu aşağıdaki gibi gözlemlenebilir:"

```bash
[friday13@baba ~]$ systemctl status postgresql
● postgresql.service - PostgreSQL database server
Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; preset: disabled)
Active: active (running) since Fri 2025-08-15 00:38:54 +03; 3h 17min ago
Main PID: 399872 (postgres)
Tasks: 9 (limit: 18626)
```

### ✅ Adım 3: Varsayılan Kullanıcıyı Şifreleme

PostgreSQL, `postgres` adlı bir kullanıcıyla birlikte gelir. Bu kullanıcıya güçlü bir şifre vermek kritik önemdedir:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'sizin_sifreniz';"
```

!!! tip "💡 Ben genellikle test ortamları için `postgres_test` gibi geçici kullanıcılar oluşturuyorum; böylece üretim ve test karışmıyor."

### ✅ Adım 4: Veritabanı ve Kullanıcı Oluşturma

Örnek olarak bir CRM uygulaması için veritabanı ve kullanıcı oluşturalım:

```bash
sudo -u postgres createdb crm_db
sudo -u postgres createuser --superuser crm_user
sudo -u postgres psql -c "ALTER USER crm_user WITH PASSWORD 'crm_sifresi';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE crm_db TO crm_user;"
```

!!! tip "Veritabanı ve kullanıcı adlarını proje isimlendirmesine uygun seçmek ileride karışıklıkları önler. Örneğin <code>crm_user_dev</code> veya <code>crm_user_prod</code> gibi adlar kullanabilirsiniz."

---

## 🛠️ 2. PostgreSQL Yapılandırması

PostgreSQL’in yapılandırma dosyaları genellikle `/var/lib/postgres/data/` dizininde bulunur. Bu dizin içinde `postgresql.conf` ve `pg_hba.conf` dosyaları yer alır ve veritabanınızın davranışını belirler.

### ✅ Adım 1: Dosya Konumlarını Kontrol Etme

```bash
sudo -u postgres ls /var/lib/postgres/data/
```

### ✅ Adım 2: `pg_hba.conf` Düzenleme

Bağlantı izinlerini ayarlamak için dosyayı açın:

```bash
sudo nano /var/lib/postgres/data/pg_hba.conf
```

Örnek ayar:

```conf
# Yerel bağlantılar
host    all             all             127.0.0.1/32            trust

# Ağ bağlantıları
host    all             all             192.168.1.0/24          md5
```

!!! warning "Üretim ortamında 'trust' yerine 'md5' veya 'scram-sha-256' kullanmanız güvenlik açısından kritik öneme sahiptir."

### ✅ Adım 3: `postgresql.conf` Ayarları

```bash
sudo nano /var/lib/postgres/data/postgresql.conf
```

Performans için önerilen parametreler:

```conf
listen_addresses = '*'
port = 5432
max_connections = 100
shared_buffers = 128MB
```

### ✅ Adım 4: Servisi Yeniden Başlatma

```bash
sudo systemctl restart postgresql
```

!!! note "🔧 Not: Değişiklikleri hemen test etmek için <code>psql</code> ile bağlanıp <code>\l</code> komutu ile veritabanlarını listeleyebilirsiniz."

---

## 🖥️ 3. pgAdmin4 Kurulumu

### ✅ Adım 1: Gerekli Dizinleri Oluşturma

```bash
sudo mkdir /var/lib/pgadmin
sudo mkdir /var/log/pgadmin
sudo chown $USER /var/lib/pgadmin
sudo chown $USER /var/log/pgadmin
```

### ✅ Adım 2: Python Sanal Ortamı

```bash
python3 -m venv pgadmin-env
source pgadmin-env/bin/activate
```

### ✅ Adım 3: pgAdmin4 Kurulumu

```bash
pip install pgadmin4
```

### ✅ Adım 4: pgAdmin4’ü Çalıştırma

```bash
pgadmin4
```

Tarayıcıda: `http://127.0.0.1:5050`

!!! tip "İlk kullanıcıyı oluştururken basit bir test e-posta ve şifre kullanabilirsiniz, sonra dilediğiniz gibi değiştirebilirsiniz."

---

## ⚙️ 4. Otomasyon Script’i

Manuel çalıştırmayı kolaylaştırmak için:

```bash
nano ~/bin/pgadmin-start.sh
```

İçerik:

```bash
#!/bin/bash
source ~/pgadmin-env/bin/activate
pgadmin4
```

```bash
chmod +x ~/bin/pgadmin-start.sh
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
echo "alias pgadmin='~/bin/pgadmin-start.sh'" >> ~/.bashrc
source ~/.bashrc
```

!!! tip "💡 Alias isimlerini kısa ve akılda kalıcı seçmek işleri kolaylaştırır. Örneğin <code>pgadmin</code>."

---

## 🔗 5. pgAdmin4 ile PostgreSQL’e Bağlantı

Sunucu eklemek için:

| Alan           | Değer          |
| -------------- | -------------- |
| Name           | `CRM Database` |
| Host           | `localhost`    |
| Port           | `5432`         |
| Maintenance DB | `postgres`     |
| Username       | `crm_user`     |
| Password       | `crm_sifresi`  |

Bağlantı sorunları için:

```bash
systemctl status postgresql
```

```bash
sudo firewall-cmd --add-port=5432/tcp --permanent
sudo firewall-cmd --reload
```

---

## ❌ 6. Sık Karşılaşılan Hatalar

!!! warning "Her zaman önce servisin çalıştığından emin olun. Çoğu bağlantı hatası buradan kaynaklanır."

### Hata 1: No module named ‘pgadmin4.**main**’

- Çözüm: Sanal ortamı silip yeniden kurun.

### Hata 2: FATAL: database “crm_db" does not exist

- Çözüm: Veritabanını yeniden oluşturun:

```bash
sudo -u postgres createdb crm_db
```

---

## 💡 7. İpuçları ve Öneriler

- `work_mem` ve `maintenance_work_mem` değerlerini artırarak performansı iyileştirin.
- SSD kullanımı disk I/O’yu hızlandırır.
- Haftalık yedekleme için cron job kullanabilirsiniz.
- Üretim ortamında şifreleme yöntemlerini güncel tutun.

---

## 🔄 8. PostgreSQL Sürüm Yükseltmeleri

PostgreSQL’i yeni bir sürüme yükseltmek bazen gerekli olabilir. Arch Linux’ta rolling release yapısı sayesinde paketler genellikle güncel gelir, ancak veritabanınızı manuel olarak yükseltmeniz gerekebilir.

!!! tip "pg_upgrade aracı kullanılabilir, ancak bazı kullanıcılar için karmaşık olabilir. Daha güvenli ve basit bir yöntem, veritabanınızı <code>pg_dump</code> ile yedekleyip yeni sürümde <code>pg_restore</code> ile geri yüklemektir."

Örnek:

```bash
# Veritabanını yedekleme
sudo -u postgres pg_dump crm_db > crm_db_backup.sql

# Yeni sürümde geri yükleme
sudo -u postgres createdb crm_db
sudo -u postgres psql crm_db < crm_db_backup.sql
```

Bu yöntem, olası uyumsuzluk sorunlarını önlemeye yardımcı olur.

---

## 📦 9. phpPgAdmin Kurulumu (Opsiyonel)

Bazı kullanıcılar pgAdmin4 yerine phpPgAdmin kullanmayı tercih edebilir. phpPgAdmin, web tabanlı bir arayüzdür ve çalışabilmesi için PHP’nin pgsql uzantısı etkin olmalıdır.

!!! tip "Apache web sunucusu ve PHP kurulumu yaparken <code>php-pgsql</code> paketinin yüklü ve etkin olduğundan emin olun."

Kurulum örneği:

```bash
sudo pacman -S php-apache php-pgsql phppgadmin
sudo systemctl enable --now httpd
```

Apache konfigürasyonunu yaptıktan sonra tarayıcınızdan phpPgAdmin’e erişebilirsiniz.

- phpPgAdmin için Apache ve PHP kurulumu yaparken detaylı bir rehbere ihtiyacınız varsa [Arch Linux Apache (LAMPP) Sanal Sunucu Kurulumu](/arch-linux-apache-lampp-sanal-sunucu-kurulumu/) sayfasına göz atabilirsiniz.

---

## 🧹 10. Veri Yedekleme ve Geri Yükleme

Veri güvenliği için yedekleme şarttır. Makalemizde daha önce cron job ile otomatik yedekleme örneği verdik. Şimdi **geri yükleme** örneğini de ekleyelim.

### ✅ Yedek Alma

```bash
sudo -u postgres pg_dump crm_db > ~/backups/crm_db_$(date +%F).sql
```

### ✅ Yedekten Geri Yükleme

```bash
sudo -u postgres createdb crm_db_restore
sudo -u postgres psql crm_db_restore < ~/backups/crm_db_2025-08-15.sql
```

!!! tip "Farklı ortamlar için ayrı veritabanı isimleri kullanmak (ör. <code>crm_db_dev</code>, <code>crm_db_prod</code>) karışıklığı önler."

- Eğer MySQL veya MariaDB ile çalışıyorsanız, benzer yedekleme ve geri yükleme işlemleri için [Arch Linux Lampp Kurulumu (PHP7x + MariaDB + MySQL + PhpMyAdmin)](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/) rehberine bakabilirsiniz.

---

## 🎯 Sonuç

Artık Arch Linux’ta PostgreSQL ve pgAdmin4’ü kurmayı, yapılandırmayı ve yönetmeyi öğrendiniz. Kod örnekleri, ipuçları ve adım adım rehber ile veritabanı projelerinizi güvenle yönetebilirsiniz. 💻

!!! note "Herhangi bir sorunuz olursa yorum bırakın; memnuniyetle yardımcı olurum! 😊"

## [responsive_img src="/images/arch-linux-postgresql-pgadmin4-kurulum-rehber-xl.webp" alt="Arch Linux PostgreSQL pgAdmin4 Kurulumu" /]



