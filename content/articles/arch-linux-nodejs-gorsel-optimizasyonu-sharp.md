Title: Arch Linux'ta Node.js ile Resim Optimizasyonu: Gulp'tan Sharp'a Geçiş
Date: 2026-11-06 04:25
Modified: 2026-11-06 04:25
Authors: yuceltoluyag
Slug: arch-linux-nodejs-gorsel-optimizasyonu-sharp
Tags: Arch Linux, Node.js, npm, Sharp, WebP, Görsel Optimizasyonu
Category: Linux
Summary: Arch Linux üzerinde Node.js ve npm kurulumu, Gulp ile görsel optimizasyonu sırasında karşılaştığım eksik ikili dosyalar ve npm güvenlik açıkları. Eski Gulp eklentilerini kaldırıp Sharp ile daha sade, güncel ve güvenli bir WebP dönüştürme sistemi oluşturdum.
Lang: tr
Status: published

Bir web projesinde görselleri farklı ekran boyutlarına göre hazırlamak, dosya boyutlarını küçültmek ve WebP formatına dönüştürmek oldukça önemli. Ben de bu iş için hazırladığım küçük bir Node.js projesinde Gulp kullanıyordum.

Başlangıçta her şey gayet basitti: Kaynak görselleri `src` klasörüne koyuyordum, Gulp bunları dört farklı genişlikte yeniden boyutlandırıyor, optimize ediyor ve WebP formatına dönüştürüyordu.

Fakat Arch Linux üzerinde projeyi çalıştırdığımda işler biraz karıştı. Önce eksik ikili dosyalarla uğraştım, ardından npm'in engellediği kurulum betikleriyle karşılaştım. En sonunda `npm audit` çıktısında onlarca güvenlik açığı görünce kullandığım araçları yeniden değerlendirmeye karar verdim.

Bu yazıda Node.js kurulumundan başlayarak yaşadığım sorunları ve sonunda Gulp tabanlı sistemi Sharp kullanarak nasıl sadeleştirdiğimi anlatacağım.

## Arch Linux üzerinde Node.js ve npm kurulumu

Öncelikle Arch Linux'un resmi depolarından Node.js ve npm paketlerini kurdum:

```bash
sudo pacman -S nodejs npm
```

Kurulumun ardından sürümleri kontrol ettim:

```bash
node --version
npm --version
```

Bu projedeki testlerimde kullandığım sürümler:

- Node.js: `v26.13.0`
- npm: `12.2.1`

Node.js ve npm kurulduktan sonra mevcut projeye geçtim:

```bash
cd ~/Projects/image-responsive
```

## İlk sistem: Gulp ile görsel optimizasyonu

Projenin ilk halinde farklı görevleri farklı Gulp eklentileri üstleniyordu.

Kullandığım paketler şunlardı:

- `gulp`: Görevleri yönetmek için.
- `gulp-rezzy`: Görselleri farklı genişliklerde üretmek için.
- `gulp-imagemin`: Görselleri optimize etmek için.
- `gulp-webp`: WebP dönüşümü için.
- `del`: Eski çıktı klasörünü temizlemek için.

İlk `package.json` dosyamın temel bağımlılıkları şöyleydi:

```json
{
  "dependencies": {
    "del": "^8.0.1",
    "gulp": "^5.0.1",
    "gulp-imagemin": "^9.2.0",
    "gulp-rename": "^2.1.0",
    "gulp-webp": "^5.1.0"
  },
  "devDependencies": {
    "gulp-rezzy": "^3.0.0"
  }
}
```

Gulp yapılandırmasında görselleri dört farklı boyutta hazırlıyordum:

```javascript
rezzy([
  { width: 320, suffix: "-sm" },
  { width: 640, suffix: "-md" },
  { width: 1024, suffix: "-lg" },
  { width: 1920, suffix: "-xl" },
])
```

Böylece her kaynak görsel için şu dosyaların oluşmasını bekliyordum:

| Dosya eki | Genişlik |
|---|---:|
| `-sm` | 320 px |
| `-md` | 640 px |
| `-lg` | 1024 px |
| `-xl` | 1920 px |

İlk bakışta gayet kullanışlı bir sistemdi. Ancak ilk build denemesinde bir sorunla karşılaştım.

## İlk sorun: optipng-bin ENOENT hatası

İlk build komutunu çalıştırdım:

```bash
npm run build
```

Gulp görevleri başlamasına rağmen görsel optimizasyonu sırasında şu hatayı aldım:

```text
Error in plugin "gulp-imagemin"
Error: spawn .../node_modules/optipng-bin/vendor/optipng ENOENT
```

Buradaki `ENOENT` hatası, çalıştırılmak istenen dosyanın bulunamadığını gösteriyordu.

İlk kontrol ettiğim yer `optipng-bin` paketinin içindeki `vendor` klasörü oldu. Gerçekten de çalıştırılabilir OptiPNG dosyası bulunmuyordu.

Paketin `package.json` dosyasını incelediğimde şu kurulum betiğini gördüm:

```json
{
  "scripts": {
    "postinstall": "node lib/install.js"
  }
}
```

Yani paket kurulurken OptiPNG ikili dosyasının hazırlanması gerekiyordu.

Sorunun nedeni npm'in bazı bağımlılıkların kurulum betiklerini güvenlik politikası nedeniyle engellemesiydi.

## npm install-scripts ve engellenen kurulum betikleri

Paketleri yeniden kurduğumda npm şu uyarıyı verdi:

```text
npm warn install-scripts
5 packages had install scripts blocked
because they are not covered by allowScripts:
```

Engellenen paketler şunlardı:

```text
cwebp-bin
gifsicle
mozjpeg
optipng-bin
sharp
```

Bu paketler görsel işleme araçlarının ikili dosyalarını hazırlamak veya ilgili kurulum işlemlerini tamamlamak için kurulum betiklerine ihtiyaç duyuyordu.

npm'in bu betikleri engellemesi, paketlerin otomatik olarak çalıştırılmasını önleyen bir güvenlik önlemiydi. Ancak bu projede gerekli ikili dosyaların hazırlanamamasına neden olmuştu.

Paketleri inceleyip gerekli kurulum betiklerini onayladım:

```bash
npm install-scripts approve cwebp-bin
npm install-scripts approve gifsicle
npm install-scripts approve mozjpeg
npm install-scripts approve optipng-bin
npm install-scripts approve sharp
```

Ardından OptiPNG paketini yeniden oluşturdum:

```bash
npm rebuild optipng-bin --foreground-scripts
```

Kontrol:

```bash
node_modules/optipng-bin/vendor/optipng -v
```

OptiPNG sürüm bilgisini artık alabildiğim için ilk eksik ikili dosya sorununu çözmüştüm.

Ancak bu kez başka bir eksik dosyayla karşılaştım.

## İkinci sorun: cwebp-bin ENOENT

OptiPNG sorunu çözüldükten sonra yeniden build aldım:

```bash
npm run build
```

Bu kez hata `gulp-webp` tarafından geldi:

```text
Error in plugin "gulp-webp"
Error: spawn .../node_modules/cwebp-bin/vendor/cwebp ENOENT
```

Bu da WebP dönüşümünde kullanılan `cwebp` ikili dosyasının bulunamadığını gösteriyordu.

Önceki sorundaki gibi burada da kurulum betiklerinin çalıştırılması gerekiyordu. Onay ve yeniden kurulum işlemlerinin ardından build başarılı oldu.

```text
gulp-imagemin: Minified 4 images
(saved 1.82 MB - 30.3%)

Finished 'images'
İşlem tamamlandı! Resimler dist klasörüne kaydedildi.
```

Dört görselde toplam 1,82 MB tasarruf elde etmiştim. Gulp sistemi artık çalışıyordu.

Ancak asıl sorun henüz karşıma çıkmamıştı.

## npm audit: 41 güvenlik açığı

Çalışan bir projenin güvenli olduğu anlamına gelmediğini bir kez daha görmüş oldum.

Bağımlılıkları kontrol etmek için şu komutu çalıştırdım:

```bash
npm audit
```

İlk sonuç oldukça dikkat çekiciydi:

```text
41 vulnerabilities
15 moderate
24 high
2 critical
```

Özellikle şu paketler dikkatimi çekti:

- `decompress`: Arşiv çıkarma sırasında hedef klasör dışına dosya yazılmasına neden olabilen güvenlik açıkları.
- `cross-spawn`: Regular Expression Denial of Service (ReDoS) açığı.
- `decode-uri-component`: Hatalı kodlanmış girdilerle hizmet engelleme açıkları.
- `fast-xml-parser`: XML işleme kaynaklı güvenlik sorunları.
- `sharp`: Altındaki libvips, libheif ve librsvg bağımlılıklarıyla ilişkili güvenlik bildirimleri.
- `svgo`, `uuid`, `minimatch` ve diğer dolaylı bağımlılıklar.

İlk olarak npm'in güvenli şekilde uygulayabildiği güncellemeleri denedim:

```bash
npm audit fix
```

Bu işlemden sonra sonuç şöyle değişti:

```text
37 vulnerabilities
16 moderate
20 high
1 critical
```

Dört açık kapanmıştı. Fakat kalan sorunlar hâlâ önemliydi.

npm, bütün sorunları çözmek için şu komutu öneriyordu:

```bash
npm audit fix --force
```

Ancak bu komut `gulp-imagemin@9.2.0` yerine `gulp-imagemin@7.1.0` kurmayı öneriyordu. Bu da kırıcı bir sürüm değişikliğiydi.

Sırf audit sayısını düşürmek için çalışan bir projeyi geriye götürmek istemedim.

Bunun yerine hangi paketin hangi bağımlılığı getirdiğini araştırdım.

## npm explain ile sorunlu bağımlılıkları bulmak

Önce doğrudan kullandığım paketleri ve sürümlerini kontrol ettim:

```bash
npm ls gulp-imagemin gulp-webp gulp-rezzy sharp
```

Ardından güvenlik açığı bulunan paketlerin neden kurulduğunu inceledim:

```bash
npm explain decompress
npm explain sharp
```

Burada iki önemli bağımlılık zinciri ortaya çıktı.

### Eski görüntü optimizasyon araçları

`decompress` paketi tek başına projenin doğrudan bağımlılığı değildi.

Şu zincir üzerinden geliyordu:

```text
gulp-webp
└── imagemin-webp
    └── cwebp-bin
        └── bin-build
            └── decompress
```

Benzer zincirler `gifsicle`, `mozjpeg` ve `optipng-bin` paketlerinde de bulunuyordu.

Yani bir WebP dönüştürme işlemi için oldukça fazla dolaylı bağımlılık yüklemiştim.

### Sharp sürümü ve gulp-rezzy

Diğer sorun `gulp-rezzy` tarafından getirilen Sharp bağımlılığıydı:

```text
gulp-rezzy@3.0.0
└── sharp@0.33.5
```

Audit çıktısında Sharp için de güvenlik bildirimleri bulunuyordu.

Burada artık yalnızca sürüm güncellemesi yapmak yerine kullandığım mimariyi değiştirmek daha mantıklı görünüyordu.

## Gulp'tan Sharp'a geçiş

Aslında projenin temel ihtiyaçları çok karmaşık değildi:

1. Kaynak görselleri bulmak.
2. Görselleri dört farklı genişlikte yeniden boyutlandırmak.
3. WebP formatına dönüştürmek.
4. Çıktıları `dist` klasörüne kaydetmek.
5. Önceki çıktıları temizlemek.

Bütün bunlar için ayrı ayrı Gulp eklentileri kullanmak zorunda değildim.

Bu nedenle görüntü işleme işini doğrudan Sharp'a taşıdım.

Önce eski bağımlılıkları kaldırdım:

```bash
npm uninstall del gulp gulp-imagemin gulp-rename gulp-webp gulp-rezzy
```

Ardından Sharp'ın güncel sürümünü kurdum:

```bash
npm install sharp@^0.35.5
```

Böylece görüntü işleme tarafında tek bir ana bağımlılığımız kaldı.

Yeni `package.json`:

```json
{
  "name": "image-responsive",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Resimleri farklı boyutlarda WebP formatına dönüştürme ve optimizasyon",
  "scripts": {
    "build": "node build.mjs"
  },
  "dependencies": {
    "sharp": "^0.35.5"
  }
}
```

Artık Gulp yapılandırması yerine doğrudan Node.js ile çalışan bir `build.mjs` dosyamız vardı.

## Yeni build.mjs dosyası

Yeni sistemde Sharp ile görselleri yeniden boyutlandırıyor ve WebP olarak kaydediyorum.

```javascript
import sharp from 'sharp';
import {
  readdir,
  mkdir,
  rm,
} from 'node:fs/promises';
import path from 'node:path';

const INPUT_DIR = 'src';
const OUTPUT_DIR = 'dist';

const SIZES = [
  { width: 320, suffix: '-sm' },
  { width: 640, suffix: '-md' },
  { width: 1024, suffix: '-lg' },
  { width: 1920, suffix: '-xl' },
];

const WEBP_OPTIONS = {
  quality: 82,
  effort: 5,
};

const SUPPORTED_FORMATS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
]);

async function findImages(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
    } else if (
      entry.isFile() &&
      SUPPORTED_FORMATS.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function processImage(inputPath) {
  const relativePath = path.relative(INPUT_DIR, inputPath);
  const outputDirectory = path.join(
    OUTPUT_DIR,
    path.dirname(relativePath),
  );

  const extension = path.extname(inputPath);
  const filename = path.basename(inputPath, extension);

  await mkdir(outputDirectory, { recursive: true });

  for (const size of SIZES) {
    const outputPath = path.join(
      outputDirectory,
      `${filename}${size.suffix}.webp`,
    );

    await sharp(inputPath, {
      animated: true,
    })
      .rotate()
      .resize({
        width: size.width,
      })
      .webp(WEBP_OPTIONS)
      .toFile(outputPath);

    console.log(`✓ ${outputPath} (${size.width}px)`);
  }
}

async function build() {
  console.log('Eski dist klasörü temizleniyor...');

  await rm(OUTPUT_DIR, {
    recursive: true,
    force: true,
  });

  const images = await findImages(INPUT_DIR);

  if (images.length === 0) {
    console.log('İşlenecek görsel bulunamadı.');
    return;
  }

  console.log(`${images.length} görsel bulundu.\n`);

  for (const image of images) {
    await processImage(image);
  }

  console.log(
    `\nİşlem tamamlandı! ${images.length * SIZES.length} WebP dosyası oluşturuldu.`,
  );
}

build().catch((error) => {
  console.error('\nBuild hatası:', error);
  process.exitCode = 1;
});
```

Bu dosyanın yaptığı işlemler:

- `src` klasörünü ve alt klasörlerini tarar.
- JPG, JPEG, PNG ve GIF dosyalarını bulur.
- Eski `dist` klasörünü temizler.
- Her görseli dört farklı genişlikte üretir.
- Görselleri WebP formatına dönüştürür.
- Kaynak klasörün alt klasör yapısını çıktı klasöründe korur.

Burada önemli bir ayrıntı var: Dört boyutun da üretilmesini istiyoruz. Bu nedenle kaynak görselin genişliğine göre boyutları filtrelemiyoruz. Küçük bir görsel de gerektiğinde 1920 piksele büyütülerek kaydediliyor. Elbette büyütme, görsele yeni ayrıntı kazandırmıyor; yalnızca istenen boyutta çıktı üretiyor.

## Sonuç: Daha az bağımlılık, daha temiz bir proje

Yeni sistemi çalıştırdığımda:

```bash
npm run build
```

İlk testte görsel başarıyla işlendi ve WebP çıktıları üretildi.

Ardından bağımlılıkları kontrol ettim:

```bash
npm ls
```

Sonuç:

```text
image-responsive@1.0.0
└── sharp@0.35.5
```

En önemlisi güvenlik denetimi:

```bash
npm audit
```

Çıktı:

```text
found 0 vulnerabilities
```

Başlangıçta 41 güvenlik açığı bulunan, birden fazla görüntü işleme eklentisine bağımlı olan projemizi tek bir görüntü işleme motoruna indirdik.

| Özellik | Eski sistem | Yeni sistem |
|---|---|---|
| Görev yönetimi | Gulp 5 | Node.js |
| Boyutlandırma | gulp-rezzy | Sharp |
| Optimizasyon | gulp-imagemin | Sharp |
| WebP dönüşümü | gulp-webp | Sharp |
| Görüntü işleme bağımlılığı | Birden fazla paket | Sharp |
| Güvenlik denetimi | 41 açık | 0 açık |

## Son söz

Bu küçük proje bana bir kez daha şunu gösterdi: Bir işi yapabilmek için her zaman çok sayıda eklentiye ihtiyacımız yok.

Gulp kötü bir araç olduğu için bırakmadım. Benim kullanım senaryomda Gulp'ın sunduğu görev yönetimi ve ayrı görüntü işleme eklentileri artık gereksiz bir karmaşıklık oluşturuyordu.

Sharp ile aynı işi daha az bağımlılıkla yapabiliyorum. Üstelik npm güvenlik denetiminde de temiz bir sonuç elde ettim.

Bir projeyi yalnızca çalışıyor diye olduğu gibi bırakmak yerine, zaman zaman bağımlılık ağacını incelemek ve gerçekten ihtiyaç duyulmayan parçaları kaldırmak gerekiyor.

Kaynak kod: [GitHub'daki image-responsive deposu](https://github.com/yuceltoluyag/image-responsive){: target="\_blank" rel="noopener noreferrer"} 

**Not:** Bu çalışma Arch Linux üzerinde Node.js 26.13.0 ve npm 12.2.1 ile gerçekleştirildi.

- [Node.js'de Sharp Modülünü Kurarken Karşılaşılan C++17 Derleme Hatası ve Çözümü](/nodejs-sharp-cpp17-derleme-hatasi-cozumu/)