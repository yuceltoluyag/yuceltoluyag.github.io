Title: Image Optimization with Node.js on Arch Linux: From Gulp to Sharp
Date: 2026-11-06 04:25
Modified: 2026-11-06 04:25
Authors: yuceltoluyag
Slug: arch-linux-nodejs-gorsel-optimizasyonu-sharp
Tags: Arch Linux, Node.js, npm, Sharp, WebP, Görsel Optimizasyonu
Category: Linux
Summary: Installing Node.js and npm on Arch Linux, missing binaries, and npm security vulnerabilities I encountered while optimizing images with Gulp. I removed the old Gulp plugins and built a simpler, up-to-date, and safer WebP conversion system with Sharp.
Lang: en
Status: published

Preparing images for different screen sizes, reducing file sizes, and converting them to WebP format are all very important in a web project. I was also using Gulp in a small Node.js project I had put together for this purpose.

At first, everything was quite simple: I placed the source images in the `src` directory, and Gulp resized them to four different widths, optimized them, and converted them to WebP format.

But things got a little complicated when I ran the project on Arch Linux. First I had to deal with missing binaries, then I ran into installation scripts blocked by npm. Finally, when dozens of security vulnerabilities appeared in the `npm audit` output, I decided to reassess the tools I was using.

In this article, I’ll describe the problems I encountered, starting with installing Node.js, and how I eventually simplified the Gulp-based system by using Sharp.

## Installing Node.js and npm on Arch Linux

First, I installed the Node.js and npm packages from Arch Linux’s official repositories:

```bash
sudo pacman -S nodejs npm
```

After installation, I checked the versions:

```bash
node --version
npm --version
```

The versions I used in my tests for this project:

- Node.js: `v26.13.0`
- npm: `12.2.1`

After installing Node.js and npm, I switched to the existing project:

```bash
cd ~/Projects/image-responsive
```

## The initial setup: image optimization with Gulp

In the initial version of the project, different Gulp plugins handled different tasks.

These were the packages I used:

- `gulp`: To manage tasks.
- `gulp-rezzy`: To generate images at different widths.
- `gulp-imagemin`: To optimize images.
- `gulp-webp`: For WebP conversion.
- `del`: To clean up the old output directory.

The main dependencies in my initial `package.json` looked like this:

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

In the Gulp configuration, I prepared images in four different sizes:

```javascript
rezzy([
  { width: 320, suffix: "-sm" },
  { width: 640, suffix: "-md" },
  { width: 1024, suffix: "-lg" },
  { width: 1920, suffix: "-xl" },
])
```

For each source image, I expected these files to be generated:

| Suffix | Width |
|---|---:|
| `-sm` | 320 px |
| `-md` | 640 px |
| `-lg` | 1024 px |
| `-xl` | 1920 px |

At first glance, it was a quite useful system. However, I ran into a problem during the first build attempt.

## First problem: optipng-bin ENOENT error

I ran the first build command:

```bash
npm run build
```

Although the Gulp tasks started, I got the following error during image optimization:

```text
Error in plugin "gulp-imagemin"
Error: spawn .../node_modules/optipng-bin/vendor/optipng ENOENT
```

The `ENOENT` error here indicated that the file it was trying to run could not be found.

The first place I checked was the `vendor` directory inside the `optipng-bin` package. Sure enough, the executable OptiPNG file was missing.

When I inspected the package’s `package.json` file, I found this installation script:

```json
{
  "scripts": {
    "postinstall": "node lib/install.js"
  }
}
```

In other words, the OptiPNG binary was supposed to be prepared when the package was installed.

The cause of the problem was that npm was blocking the installation scripts of some dependencies for security reasons.

## npm install-scripts and blocked installation scripts

When I reinstalled the packages, npm showed this warning:

```text
npm warn install-scripts
5 packages had install scripts blocked
because they are not covered by allowScripts:
```

The blocked packages were:

```text
cwebp-bin
gifsicle
mozjpeg
optipng-bin
sharp
```

These packages needed installation scripts to prepare the binaries for image processing tools or complete the related installation steps.

Blocking these scripts was a security measure to prevent npm from running them automatically. However, in this project, it meant the required binaries could not be prepared.

I reviewed the packages and approved the necessary installation scripts:

```bash
npm install-scripts approve cwebp-bin
npm install-scripts approve gifsicle
npm install-scripts approve mozjpeg
npm install-scripts approve optipng-bin
npm install-scripts approve sharp
```

Then I rebuilt the OptiPNG package:

```bash
npm rebuild optipng-bin --foreground-scripts
```

Check:

```bash
node_modules/optipng-bin/vendor/optipng -v
```

Since I could now get the OptiPNG version information, I had resolved the first missing-binary issue.

But then I ran into another missing file.

## Second problem: cwebp-bin ENOENT

After resolving the OptiPNG issue, I ran the build again:

```bash
npm run build
```

This time the error came from `gulp-webp`:

```text
Error in plugin "gulp-webp"
Error: spawn .../node_modules/cwebp-bin/vendor/cwebp ENOENT
```

This indicated that the `cwebp` binary used for WebP conversion could not be found.

As with the previous issue, the installation scripts needed to be run here, too. After approving and reinstalling, the build succeeded.

```text
gulp-imagemin: Minified 4 images
(saved 1.82 MB - 30.3%)

Finished 'images'
İşlem tamamlandı! Resimler dist klasörüne kaydedildi.
```

I had saved a total of 1.82 MB across four images. The Gulp system was now working.

But the real problem had not yet appeared.

## npm audit: 41 vulnerabilities

Once again, I saw that a working project is not necessarily a secure one.

I ran this command to check the dependencies:

```bash
npm audit
```

The initial result was quite striking:

```text
41 vulnerabilities
15 moderate
24 high
2 critical
```

These packages especially caught my attention:

- `decompress`: Vulnerabilities that could allow files to be written outside the target directory during archive extraction.
- `cross-spawn`: A Regular Expression Denial of Service (ReDoS) vulnerability.
- `decode-uri-component`: Denial-of-service vulnerabilities involving malformed encoded input.
- `fast-xml-parser`: Security issues related to XML processing.
- `sharp`: Security advisories involving its underlying `libvips`, `libheif`, and `librsvg` dependencies.
- `svgo`, `uuid`, `minimatch`, and other transitive dependencies.

First, I tried the updates npm could apply safely:

```bash
npm audit fix
```

After this operation, the result changed to:

```text
37 vulnerabilities
16 moderate
20 high
1 critical
```

Four vulnerabilities had been fixed. But the remaining issues were still significant.

npm suggested the following command to resolve all the issues:

```bash
npm audit fix --force
```

However, this command suggested installing `gulp-imagemin@7.1.0` instead of `gulp-imagemin@9.2.0`. That would have been a breaking version change.

I didn’t want to downgrade a working project just to lower the audit count.

Instead, I investigated which packages were bringing in which dependencies.

## Finding problematic dependencies with npm explain

First, I checked the packages I used directly and their versions:

```bash
npm ls gulp-imagemin gulp-webp gulp-rezzy sharp
```

Then I looked into why the vulnerable packages were being installed:

```bash
npm explain decompress
npm explain sharp
```

Two important dependency chains emerged.

### Old image optimization tools

The `decompress` package was not a direct dependency of the project.

It was brought in through this chain:

```text
gulp-webp
└── imagemin-webp
    └── cwebp-bin
        └── bin-build
            └── decompress
```

Similar chains also existed for the `gifsicle`, `mozjpeg`, and `optipng-bin` packages.

In other words, I had installed quite a few transitive dependencies for a WebP conversion process.

### Sharp version and gulp-rezzy

The other issue was the Sharp dependency brought in by `gulp-rezzy`:

```text
gulp-rezzy@3.0.0
└── sharp@0.33.5
```

The audit output also included security advisories for Sharp.

At this point, it seemed more sensible to change the architecture I was using rather than just update versions.

## Switching from Gulp to Sharp

The project’s basic requirements weren’t particularly complex:

1. Find the source images.
2. Resize the images to four different widths.
3. Convert them to WebP format.
4. Save the outputs to the `dist` directory.
5. Clean up the previous outputs.

I didn’t have to use separate Gulp plugins for all of this.

So I moved the image processing directly to Sharp.

First, I removed the old dependencies:

```bash
npm uninstall del gulp gulp-imagemin gulp-rename gulp-webp gulp-rezzy
```

Then I installed the current version of Sharp:

```bash
npm install sharp@^0.35.5
```

That left us with just one main dependency for image processing.

The new `package.json`:

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

Instead of a Gulp configuration, we now had a `build.mjs` file that runs directly with Node.js.

## The new build.mjs file

In the new system, I use Sharp to resize images and save them as WebP.

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

This file performs the following operations:

- Scans the `src` directory and its subdirectories.
- Finds JPG, JPEG, PNG, and GIF files.
- Cleans up the old `dist` directory.
- Generates each image at four different widths.
- Converts the images to WebP format.
- Preserves the source directory’s subdirectory structure in the output directory.

There’s one important detail here: We want all four sizes to be generated. For that reason, we don’t filter the sizes based on the source image’s width. A small image is also enlarged and saved at 1920 pixels when needed. Of course, enlarging it doesn’t add new detail to the image; it only produces an output at the requested size.

## The result: fewer dependencies, a cleaner project

When I ran the new system:

```bash
npm run build
```

The image was processed successfully in the first test, and WebP outputs were generated.

Then I checked the dependencies:

```bash
npm ls
```

The result:

```text
image-responsive@1.0.0
└── sharp@0.35.5
```

Most importantly, the security check:

```bash
npm audit
```

Output:

```text
found 0 vulnerabilities
```

We reduced our project—which initially had 41 security vulnerabilities and depended on multiple image-processing plugins—to a single image-processing engine.

| Feature | Old system | New system |
|---|---|---|
| Task management | Gulp 5 | Node.js |
| Resizing | gulp-rezzy | Sharp |
| Optimization | gulp-imagemin | Sharp |
| WebP conversion | gulp-webp | Sharp |
| Image processing dependencies | Multiple packages | Sharp |
| Security audit | 41 vulnerabilities | 0 vulnerabilities |

## Final thoughts

This small project reminded me once again that we don’t always need a large number of plugins to get a job done.

I didn’t leave Gulp because it was a bad tool. For my use case, the task management and separate image-processing plugins Gulp provided had become unnecessary complexity.

With Sharp, I can do the same work with fewer dependencies. What’s more, I got a clean result from npm’s security audit.

Rather than leaving a project as it is just because it works, we need to review the dependency tree from time to time and remove parts that we don’t actually need.

Source code: [The image-responsive repository on GitHub](https://github.com/yuceltoluyag/image-responsive){: target="\_blank" rel="noopener noreferrer"}

**Note:** This work was carried out on Arch Linux with Node.js 26.13.0 and npm 12.2.1.

- [C++17 Compilation Error When Installing the Sharp Module in Node.js and How to Fix It](/en/nodejs-sharp-cpp17-derleme-hatasi-cozumu/)
