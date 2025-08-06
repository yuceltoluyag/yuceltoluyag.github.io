Title: Arch Linux'ta Docker Kurulumu – Adım Adım Rehber
Date: 2025-08-06 04:30
Modified: 2025-08-05 22:38
Category: Sunucu
Tags: arch linux, docker, container, kurulum, linux
Slug: arch-linux-docker-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Arch Linux üzerinde Docker kurulumu, yapılandırması ve temel kullanım adımlarını adım adım anlatan kapsamlı rehber.
Template: article




**Docker**, modern yazılım geliştirme ve dağıtım dünyasının vazgeçilmez araçlarından biri.
Peki, **Arch Linux’ta Docker nasıl kurulur ve yapılandırılır?** Bu rehberde hem **kurulum adımlarını** hem de **temel kullanım ipuçlarını** adım adım öğreneceksiniz.

Docker sayesinde uygulamalarınızı izole edilmiş **container** ortamlarında çalıştırabilir, bağımlılık karmaşasını ortadan kaldırabilir ve geliştirme süreçlerinizi hızlandırabilirsiniz.

---

## 1️⃣ Docker Nedir ve Neden Kullanılır?

Docker, yazılımları **container** adı verilen izole ortamlar içinde çalıştırmanıza olanak tanır. Bu sayede:

* Farklı sistemlerde **aynı şekilde çalışan** yazılım paketleri oluşturabilirsiniz.
* **Bağımlılık sorunlarını** ortadan kaldırırsınız.
* Geliştirme, test ve üretim ortamlarında **tutarlılık** sağlarsınız.
* Hızlı kurulum ve dağıtım imkânı elde edersiniz.

Örneğin, PHP ile geliştirdiğiniz bir web uygulamasını, Docker kullanarak hem kendi bilgisayarınızda hem de sunucuda **tek komutla** çalıştırabilirsiniz.

---

## 2️⃣ Arch Linux’ta Docker Kurulumu

Arch Linux, **rolling release** yapısı sayesinde her zaman en güncel Docker sürümünü AUR’a veya resmi depolarına ekler.
Kurulum için aşağıdaki adımları takip edin:

### 2.1 Gerekli Paketleri Güncelleyin

Terminalinizi açın ve sistem paketlerinizi güncelleyin:

```bash
sudo pacman -Syu
```

> 💡 *Sistemi güncel tutmak, olası bağımlılık sorunlarının önüne geçer.*

### 2.2 Docker Paketini Yükleyin

Arch Linux’un resmi deposunda `docker` paketi mevcut:

```bash
sudo pacman -S docker docker-compose docker-buildx
```

### 2.3 Docker Servisini Etkinleştirin

Kurulumdan sonra Docker’ın otomatik olarak başlatılması için:

```bash
sudo systemctl enable --now docker.service
sudo systemctl status docker.service
sudo systemctl is-active docker.service

```

> 🚦 *`enable` komutu sistemi her açtığınızda Docker’ı otomatik başlatır.*

---

## 3️⃣ Kullanıcı Yetkilendirmesi (Sudo’suz Docker Kullanımı)

Varsayılan olarak Docker komutlarını çalıştırmak için `sudo` gerekir.
Kendi kullanıcı hesabınızla Docker komutlarını çalıştırabilmek için:

```bash
sudo usermod -aG docker $USER
```

Ardından çıkış yapıp tekrar giriş yapın veya:

```bash
newgrp docker
```

Bu sayede:

```bash
docker ps
```

komutunu **sudo** yazmadan kullanabilirsiniz.

---

## 4️⃣ Docker Kurulumunu Doğrulama

Kurulumun başarılı olduğunu test etmek için:

```bash
docker run hello-world
```

Bu komut:

* İnternetten küçük bir test imajı indirir.
* Container içinde çalıştırır.
* Kurulumun başarılı olup olmadığını terminal çıktısıyla gösterir.

Başarılı bir kurulumda şu şekilde bir çıktı görmelisiniz:

```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## 5️⃣ Temel Docker Komutları 🛠

Docker’ı kullanmaya başlamak için bilmeniz gereken temel komutlar:

| Komut                | Açıklama                        |
| -------------------- | ------------------------------- |
| `docker ps`          | Çalışan container’ları listeler |
| `docker images`      | Mevcut imajları listeler        |
| `docker pull <imaj>` | Docker Hub’dan imaj indirir     |
| `docker run <imaj>`  | Yeni bir container çalıştırır   |
| `docker stop <id>`   | Container’ı durdurur            |
| `docker rm <id>`     | Container’ı siler               |
| `docker rmi <imaj>`  | İmajı siler                     |

---

## 6️⃣ Arch Linux’ta Docker ile İlgili Yaygın Sorunlar ve Çözümleri

### 6.1 "Permission Denied" Hatası

* **Sebep:** Kullanıcı `docker` grubunda değil.
* **Çözüm:** `usermod -aG docker $USER` komutunu uygulayın.

### 6.2 Servis Başlamıyor

* **Sebep:** `docker` servisi etkin değil.
* **Çözüm:**

  ```bash
  sudo systemctl enable docker
  sudo systemctl start docker
  ```

### 6.3 Ağ Sorunları

* **Sebep:** Docker’ın oluşturduğu `bridge` ağı bozuk.
* **Çözüm:** Docker servisini yeniden başlatın:

  ```bash
  sudo systemctl restart docker
  ```

---

## 7️⃣ Sonuç ve Öneriler 🎯

Bu rehberde **Arch Linux’ta Docker kurulumu** ve temel kullanım adımlarını öğrendiniz.
Artık uygulamalarınızı izole ortamlarda güvenle çalıştırabilir, geliştirme süreçlerinizi daha verimli hale getirebilirsiniz.

Docker öğrenmeye devam etmek için şu konulara göz atabilirsiniz:

* Docker Compose ile çoklu container yönetimi
* Özel Docker imajı oluşturma
* Volume ve Network yönetimi

💬 **Siz Docker’ı hangi projelerinizde kullanıyorsunuz?** Deneyimlerinizi yorumlarda paylaşabilirsiniz!

---

✅ **Özet:**

* Arch Linux’ta Docker kurulumu kolaydır ve resmi depodan yapılabilir.
* Kullanıcı grubuna ekleme ile `sudo` kullanmadan komut çalıştırabilirsiniz.
* `docker run hello-world` testiyle kurulum doğrulanır.

---
