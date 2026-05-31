Title: Şişko Docker İmajlarına Diyet: 1.2 GB'tan 78 MB'a Yolculuk
Date: 2026-05-29 04:10
Category: Sunucu
Tags: docker, nodejs, typescript, container, devops, sorun-giderme, sunucu
Slug: docker-imaj-boyutu-kucultme-rehberi
Authors: yuceltoluyag
Status: published
Summary: Şişmiş Docker imajları CI/CD süreçlerini yavaşlatır ve depolama maliyetlerini artırır. Node.js + TypeScript uygulamasının imajını adım adım 78 MB'a nasıl düşürdüğümü paylaşıyorum.
Template: article
Lang: tr
Translation: false
Image: images/docker-slim.png

Kendi ev laboratuvarımda (homelab) koşturduğum servislerin imajlarını kurcalarken fark ettim hacı: Bizim emektar Node.js + TypeScript uygulamasının Docker imajı diskte tam 1.21 GB yer kaplıyor. Şaka gibi, derlenmiş hali topu topu 4 MB eden bir JavaScript projesi için sunucuda devasa bir alan harcıyoruz.

Şişko Docker imajları, konteyner dağıtan her ekibin sessiz sedasız ödediği gizli bir vergidir aslında. Yavaşlayan CI/CD süreçleri, hantallaşan deploy süreleri, artan güvenlik açıkları ve günün sonunda kabaran depolama (registry) faturaları... Çoğu geliştirici bu duruma "yapacak bir şey yok, Node.js ekosistemi böyle hantal" deyip geçiyor. Ama biz o terminalin tozunu yutmuşuz kardaş, pes etmek bize yakışmaz.

Birkaç saatlik bir çalışmayla, production ortamına gönderdiğimiz bu canavarı, uygulamanın çalışmasını zerre bozmadan adım adım 78 MB'a nasıl düşürdüğümü tüm ölçümleriyle birlikte şuraya bırakıyorum.

![Docker İmaj Boyutunu Küçültmek](/images/docker-slim.png)

## Çıkış Noktası: Naif Dockerfile (1.21 GB)

Çoğu ekibin yazdığı ilk Dockerfile budur. Çalışır mı? Çalışır. Ama neredeyse her satırı israftan ibaret.

```dockerfile
FROM node:22

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Bunu build edip boyutuna baktığımızda durum içler acısı:

```bash
yuceltoluyag@archlinux:~$ docker build -t app:naive .
yuceltoluyag@archlinux:~$ docker images app:naive
REPOSITORY   TAG     SIZE
app          naive   1.21GB
```

Kollarımızı sıvayıp işe koyulalım.

## 1. Adım: Taban İmajını Değiştirmek (1.21 GB -> 412 MB)

Orijinal `node:22` etiketli imaj, Debian tabanlıdır ve derleme aşamasında lazım olan ancak çalışma zamanında (runtime) yüzüne bile bakmayacağımız tonla derleyici aracı içerir. `slim` etiketli imaj ise bu kalabalığın büyük kısmını tırpanlar.

| İmaj Sürümü | Boyut |
| :--- | :--- |
| node:22 | 1.21 GB |
| node:22-slim | 412 MB |
| node:22-alpine | 178 MB |

Alpine sürümü çok daha küçük görünse de musl libc kullanır. Saf JavaScript projeleri Alpine üzerinde tıkır tıkır çalışır. Ancak bağımlılıklarınız arasında `bcrypt`, `sharp` gibi C/C++ ile derlenen (native) modüller varsa musl libc başınızı ağrıtabilir[^1]. Bu yüzden gerçekçi bir production ortamı için `slim` imajıyla yola devam etmek en güvenli limandır.

## 2. Adım: Gereksiz Dosyaları Kapıda Bırakmak (`.dockerignore`) (412 MB -> 388 MB)

Docker dosya kopyalarken filtre uygulamazsa yerel bilgisayarınızdaki `node_modules` klasörünü, `.git` geçmişini, test dosyalarını ve hatta lokal geliştirme aşamasındaki hassas `.env` dosyalarını doğrudan imajın katmanlarına yazar.

Hemen projenin kök dizinine bir `.dockerignore` dosyası oluşturup gereksiz ağırlıklardan kurtuluyoruz:

```
node_modules
npm-debug.log
.git
.gitignore
.env*
.vscode
.idea
coverage
dist
build
*.md
test
__tests__
Dockerfile*
.dockerignore
```

Bu ufak dosya hem boyutu düşürüyor hem de lokal `.env.development` gibi kritik dosyaların yanlışlıkla public registry'lere sızmasının önüne geçiyor.

## 3. Adım: Multi-Stage Build Sihri (388 MB -> 198 MB)

TypeScript'i derlemek, linter koşturmak ve testleri çalıştırmak için tonla geliştirici bağımlılığına (dev dependencies) ihtiyacımız var. Ama uygulamayı sunucuda ayağa kaldırırken bunların hiçbirine ihtiyacımız yok.

İşte burada devreye **Multi-Stage Build** (Çok aşamalı derleme) giriyor. İlk aşamada (builder) uygulamayı derleyip, ikinci aşamada (runtime) sadece derlenmiş dosyaları ve temiz kütüphaneleri kopyalıyoruz:

```dockerfile
# ---- Derleme Aşaması (Builder) ----
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---- Çalışma Aşaması (Runtime) ----
FROM node:22-slim
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Burada iki kritik hareket yaptık:
* `npm install` yerine `npm ci` kullandık. Bu komut `package-lock.json` dosyasını baz alır ve çok daha hızlı, tutarlı bir kurulum sağlar.
* `npm prune --omit=dev` komutuyla derleme bittikten sonra geliştirici kütüphanelerini ayıkladık. Sadece bu komut bile `node_modules` boyutunu yarı yarıya düşürdü.

## 4. Adım: Katman Önbelleğini Doğru Tetiklemek (Aynı boyut, 5 kat hızlı build)

Bu adım imaj boyutunu küçültmüyor ama CI/CD süreçlerimizi uçuracak en kritik taktik budur hacı. Docker imajı katmanlar (layers) halinde inşa edilir. Eğer `COPY . .` komutunu `npm ci` komutundan önce yazarsanız, kodunuzdaki tek bir satır değişiklik bile Docker önbelleğini (cache) geçersiz kılar ve Docker her seferinde yüzlerce paketi baştan indirmeye çalışır.

Bunu önlemek için yukarıdaki adımda yaptığımız gibi önce sadece `package*.json` dosyalarını kopyalayıp kütüphaneleri kurmalı, ardından kodları kopyalamalıyız:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

Yaklaşık 600 bağımlılığı olan projemizde cold build (soğuk derleme) süresi 94 saniyeyken, bu ufak yer değişikliği sayesinde sadece uygulama kodunu değiştirdiğimizde build süresi 18 saniyeye düştü. Her PR'da, her deployda kazanılan bu süreyi hesap edin!

## 5. Adım: Çalışma Zamanında Alpine Limanına Yanaşmak (198 MB -> 96 MB)

Derleme aşamasında uyumluluk sorunları yaşamamak için Debian tabanlı `slim` imajını kullandık. Peki çalışma (runtime) aşamasında neden Alpine'e geçmiyoruz? Derlenmiş saf JavaScript kodumuz, arkada glibc'ye özel kütüphaneler çağıran C/C++ binary'leri yoksa, işletim sisteminin ne olduğuna zerre önem vermez.

```dockerfile
# ---- builder ----
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---- runtime ----
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Eğer yerel modüller (native modules) kullanıyorsanız ve runtime'da Alpine kullanmak istiyorsanız, builder aşamasında da `node:22-alpine` taban imajını seçip `apk add --no-cache python3 make g++` komutlarıyla derleme yapmanız gerekir.

## 6. Adım: Sunucuyu Kapatmak: Distroless Geçişi (96 MB -> 78 MB)

Geldik işin nirvanasına. Google'ın **Distroless** imajları, içinde sadece Node.js çalıştırıcısını ve SSL sertifikalarını barındırır. Ne bir kabuk (shell - bash/sh) ne paket yöneticisi ne de curl gibi araçlar vardır. Bu sayede olası bir siber saldırıda konteynerin içine sızılsa bile çalıştırılacak bir terminal bulunamaz. Boyut da haliyle 78 MB'a kadar geriler.

```dockerfile
# ---- runtime ----
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["dist/index.js"]
```

!!! warning "Dikkat! Distroless Kullanırken Shell Olmaz"
    Distroless imajlarında kabuk (shell) bulunmadığı için `docker exec -it konteyner sh` komutuyla içeriye bağlanıp inceleme yapamazsınız. Hata ayıklama (debugging) yapmanız gerektiğinde, aynı imajın `:debug` tag'ini içeren versiyonunu kullanabilirsiniz (bu sürümde Busybox kabuğu bulunur). Production ortamında ise güvenlik kurallarına sadık kalarak standart distroless ile devam etmelisiniz. Ayrıca shell olmadığı için `CMD` alanında exec formunu kullanmak ve `node` yazmadan doğrudan script yolunu vermek zorunludur.

## Genel Değerlendirme Tablosu

Yaptığımız iyileştirmelerin imaj boyutuna etkisini topluca görelim:

| Aşama | Taban İmajı | İmaj Boyutu | Tasarruf Oranı |
| :--- | :--- | :--- | :--- |
| Başlangıç (Naive) | node:22 | 1.21 GB | - |
| 1. Slim Base Image | node:22-slim | 412 MB | %67 |
| 2. .dockerignore | node:22-slim | 388 MB | %6 |
| 3. Multi-Stage + Prune | node:22-slim | 198 MB | %49 |
| 4. Katman Önbellekleme | node:22-slim | 198 MB | (Hız Kazanımı) |
| 5. Alpine Runtime | node:22-alpine | 96 MB | %52 |
| 6. Distroless Geçişi | distroless/nodejs22 | 78 MB | %19 |

Günün sonunda **%94 oranında bir hafifleme** elde ettik hacı. İmaj tam 15 kat küçüldü.

## Neleri Tercih Etmedik?

Bazı platformlarda sıklıkla önerilen ancak karmaşıklığı artırdığı için bizim listeye almadığımız yöntemler de var:

* **docker-slim:** İmajı dinamik olarak analiz edip küçülten harika bir araçtır. Ancak production ortamında uygulamanın nadiren uğradığı bir kod bloğundaki bağımlılığı gereksiz görüp silebilir. Canlıda hata ayıklamak hiç keyifli olmuyor.
* **pkg veya nexe:** Uygulamayı tek bir binary haline getirir. Ancak Node.js sürümünü dondurur ve dinamik import yapılarını bozar. Eğer static binary esnekliği istiyorsanız Node.js yerine Go veya Rust yazmalısınız.
* **scratch:** Teoride harika ama pratikte SSL sertifikaları, zaman dilimi verileri (tzdata) ve DNS çözümleyicileriyle bir hafta savaşmanıza sebep olur. Distroless tüm bu zahmeti ortadan kaldırıyor.

Siz de kendi projelerinizde bu adımları uygulayarak sunucuları rahatlatabilir, CI/CD boru hatlarını hızlandırabilirsiniz.

Hadi kalın sağlıcakla!

---

### 🔗 Laboratuvardan Diğer Notlar

Sistemleri kurcalarken, sunucu performansını artırırken ve konteynerleri hafifletirken işinize yarayacak diğer yazılarım da şurada:

* [Arch Linux'ta Docker Kurulumu – Adım Adım Rehber](/arch-linux-docker-kurulumu/)
* [Node.js Mikroservisleri İçin Linux TCP Tuning ve Kernel Ayarları](/linux-tcp-tuning-node-js-microservices/)
* [Diskleri Çöpe Atın: Raspberry Pi Zero ile RAM Üstünde Site Barındırmak](/raspberry-pi-zero-ram-diskless-web-server/)
* [Pelican Statik Sitenizi Playwright ile Test Edin](/pelican-statik-site-playwright-test/)

[^1]: Musl libc ile glibc arasındaki mimari farklar, özellikle C/C++ bağımlılığı olan Node.js paketlerinin derleme aşamasında veya çalışma zamanında (runtime) beklenmedik hatalar vermesine yol açabilir.
