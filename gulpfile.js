const gulp = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const path = require("path");
const fs = require("fs");

// Temel dizinler
const BASE_PATHS = {
    assets: path.join(__dirname, "_assets"),
    theme: path.join(__dirname, "themes", "Minel", "static"),
    content: path.join(__dirname, "content"),
};

// Kaynak ve hedef dizinleri
const paths = {
    styles: {
        src: path.join(BASE_PATHS.assets, "css", "**", "*.css"),
        dest: path.join(BASE_PATHS.theme, "css"),
    },
    scripts: {
        src: path.join(BASE_PATHS.assets, "js", "**", "*.js"),
        dest: path.join(BASE_PATHS.theme, "js"),
    },
    images: {
        src: path.join(BASE_PATHS.assets, "images", "**", "*"),
        dest: path.join(BASE_PATHS.content, "images"),
    },
};

// Çıktı klasörlerini temizle
function clean(cb) {
    console.log("Çıktı klasörleri temizleniyor...");

    // Temizlenecek klasörler
    const cleanPaths = [
        paths.styles.dest,
        paths.scripts.dest,
        paths.images.dest,
        paths.images.dest + "_temp", // Geçici klasörü de temizle
    ];

    // Her bir klasörü temizle
    cleanPaths.forEach((cleanPath) => {
        if (fs.existsSync(cleanPath)) {
            fs.readdirSync(cleanPath).forEach((file) => {
                const curPath = path.join(cleanPath, file);
                try {
                    if (fs.lstatSync(curPath).isDirectory()) {
                        // Klasör ise recursive olarak temizle
                        fs.rmdirSync(curPath, { recursive: true });
                        console.log(`Klasör silindi: ${curPath}`);
                    } else {
                        // Dosya ise direkt sil
                        fs.unlinkSync(curPath);
                        console.log(`Dosya silindi: ${curPath}`);
                    }
                } catch (err) {
                    console.error(`Hata: ${curPath} silinirken bir sorun oluştu:`, err);
                }
            });
        } else {
            console.log(`Klasör bulunamadı: ${cleanPath}`);
        }
    });

    cb();
}

// PostCSS eklentilerini önceden yükle
const postcssPlugins = [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("postcss-preset-env")({ features: { "nesting-rules": false } }),
    require("autoprefixer")({ grid: true, flexbox: true }),
];

if (process.env.NODE_ENV === "production") {
    postcssPlugins.push(
        require("cssnano")({
            preset: [
                "default",
                {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                    minifyFontValues: true,
                    colormin: true,
                },
            ],
        })
    );
}

// CSS işleme görevi
function styles() {
    // input.css -> style.min.css
    const styleTask = gulp
        .src(path.join(BASE_PATHS.assets, "css", "input.css"), { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(postcss(postcssPlugins))
        .pipe(cleanCSS({ compatibility: "ie11", level: { 1: { specialComments: 0 } } }))
        .pipe(rename({ basename: "style", suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.styles.dest));

    // pygments.css -> pygments.min.css
    const pygmentsTask = gulp
        .src(path.join(BASE_PATHS.assets, "css", "pygments.css"), { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({ compatibility: "ie11", level: { 1: { specialComments: 0 } } }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.styles.dest));

    // Her iki görevi de paralel olarak çalıştır
    return Promise.all([styleTask, pygmentsTask]);
}

// JavaScript işleme görevi
function scripts() {
    return gulp
        .src(paths.scripts.src, { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ["@babel/preset-env"], comments: false }))
        .pipe(terser({ compress: { drop_console: true } }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Resim optimizasyonu görevi
function optimizeImages() {
    return gulp
        .src(paths.images.src, { allowEmpty: true })
        .pipe(
            imagemin([
                mozjpeg({ quality: 80, progressive: true }),
                pngquant({ quality: [0.6, 0.8], speed: 1 }),
                imagemin.gifsicle({ interlaced: true, optimizationLevel: 3 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: false }, { cleanupIDs: false }, { removeUselessDefs: false }],
                }),
            ])
        )
        .pipe(gulp.dest(paths.images.dest + "_temp")); // Geçici klasöre kaydet
}

// WebP dönüşüm görevi
function convertToWebp() {
    return gulp
        .src(paths.images.src, { allowEmpty: true })
        .pipe(webp({ quality: 80, method: 6, metadata: "all" }))
        .pipe(gulp.dest(paths.images.dest));
}

// Başarısız WebP dönüşümlerini taşı
function moveFailedWebp(cb) {
    const fs = require("fs");
    const path = require("path");

    // Geçici klasördeki optimize edilmiş dosyaları kontrol et
    const tempDir = paths.images.dest + "_temp";
    const targetDir = paths.images.dest;

    if (!fs.existsSync(tempDir)) {
        cb();
        return;
    }

    fs.readdir(tempDir, (err, files) => {
        if (err) {
            cb(err);
            return;
        }

        files.forEach((file) => {
            const baseName = path.basename(file, path.extname(file));
            const webpFile = path.join(targetDir, baseName + ".webp");

            // Eğer WebP dönüşümü yoksa, optimize edilmiş dosyayı taşı
            if (!fs.existsSync(webpFile)) {
                const tempFile = path.join(tempDir, file);
                const targetFile = path.join(targetDir, file);
                fs.renameSync(tempFile, targetFile);
                console.log(`WebP dönüşümü başarısız: ${file} optimize edilmiş haliyle taşındı.`);
            }
        });

        // Geçici klasörü temizle
        fs.rmdirSync(tempDir, { recursive: true });
        cb();
    });
}

// Tüm resim işlemleri
const images = gulp.series(optimizeImages, convertToWebp, moveFailedWebp);

// Klasörleri oluştur
function createFolders(cb) {
    // Tüm gerekli klasörleri oluştur
    Object.values(BASE_PATHS).forEach((basePath) => {
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
            console.log(`Ana klasör oluşturuldu: ${basePath}`);
        }
    });

    // Alt klasörleri oluştur
    Object.values(paths).forEach((path) => {
        if (!fs.existsSync(path.dest)) {
            fs.mkdirSync(path.dest, { recursive: true });
            console.log(`Alt klasör oluşturuldu: ${path.dest}`);
        }
    });

    // _assets altındaki klasörleri oluştur
    ["css", "js", "images"].forEach((folder) => {
        const folderPath = path.join(BASE_PATHS.assets, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`Assets klasörü oluşturuldu: ${folderPath}`);
        }
    });

    cb();
}

// İzleme görevi
function watch() {
    console.log("İzlenen klasörler:");
    console.log("CSS:", paths.styles.src);
    console.log("JS:", paths.scripts.src);
    console.log("Images:", paths.images.src);

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

// Görevleri dışa aktar
exports.clean = clean;
exports.createFolders = createFolders;
exports.styles = gulp.series(clean, createFolders, styles);
exports.scripts = gulp.series(clean, createFolders, scripts);
exports.images = gulp.series(clean, createFolders, images);
exports.watch = gulp.series(clean, createFolders, watch);
exports.default = gulp.series(clean, createFolders, gulp.parallel(styles, scripts, images));
