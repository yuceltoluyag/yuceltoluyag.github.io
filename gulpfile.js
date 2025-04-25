/**
 * Minel Tema için Gulp Ana Görev Dosyası
 */

const gulp = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
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
};

// Çıktı klasörlerini temizle
function cleanAll(cb) {
    console.log("Çıktı klasörleri temizleniyor...");

    // Temizlenecek klasörler
    const cleanPaths = [paths.styles.dest, paths.scripts.dest];

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
            // Klasör yoksa oluştur
            fs.mkdirSync(cleanPath, { recursive: true });
            console.log(`Klasör oluşturuldu: ${cleanPath}`);
        }
    });

    cb();
}

// Klasörleri oluştur
function createFolders(cb) {
    // _assets altındaki klasörleri ve alt klasörleri oluştur
    const folders = [
        path.join(BASE_PATHS.assets, "css"),
        path.join(BASE_PATHS.assets, "css", "base"),
        path.join(BASE_PATHS.assets, "css", "components"),
        path.join(BASE_PATHS.assets, "css", "layouts"),
        path.join(BASE_PATHS.assets, "css", "pages"),
        path.join(BASE_PATHS.assets, "css", "utils"),
        path.join(BASE_PATHS.assets, "js"),
        path.join(BASE_PATHS.theme, "css"),
        path.join(BASE_PATHS.theme, "js"),
    ];

    folders.forEach((folder) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Klasör oluşturuldu: ${folder}`);

            // Utils dizini boş kalmasın diye .gitkeep dosyası ekle
            if (folder.endsWith("utils")) {
                const keepFile = path.join(folder, ".gitkeep");
                fs.writeFileSync(keepFile, "");
                console.log(`Dosya oluşturuldu: ${keepFile}`);
            }
        }
    });

    cb();
}

// PostCSS eklentilerini önceden yükle
const postcssPlugins = [
    require("postcss-import"), // Önce @import ifadelerini işle
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
function buildMainCss() {
    // Ana CSS dosyası - @import ifadeleri ile tüm dosyaları içinde barındırır
    return gulp
        .src(path.join(BASE_PATHS.assets, "css", "main.css"), { allowEmpty: true })
        .pipe(postcss(postcssPlugins))
        .pipe(cleanCSS({ compatibility: "ie11", level: { 1: { specialComments: 0 } } }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.styles.dest));
}

// JavaScript işleme görevi
function buildScripts() {
    return gulp
        .src(paths.scripts.src, { allowEmpty: true })
        .pipe(babel({ presets: ["@babel/preset-env"], comments: false }))
        .pipe(terser({ compress: { drop_console: true } }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// İzleme görevi
function watchFiles() {
    console.log("İzlenen klasörler:");
    console.log("CSS:", paths.styles.src);
    console.log("JS:", paths.scripts.src);

    gulp.watch(paths.styles.src, buildMainCss);
    gulp.watch(paths.scripts.src, buildScripts);
}

// Her şeyi temizle
function cleanEverything(cb) {
    cleanAll(cb);
}

// Dışa aktarma görevleri
exports.styles = buildMainCss;
exports.scripts = buildScripts;
exports.clean = cleanAll;
exports.cleanEverything = cleanEverything;
exports.createFolders = createFolders;

// Yapı görevleri
const buildAssets = gulp.parallel(buildMainCss, buildScripts);

// Varsayılan görev
exports.default = gulp.series(cleanAll, createFolders, buildAssets);

// Geliştirme görevi
exports.dev = gulp.series(cleanAll, createFolders, buildAssets, watchFiles);

// Yapı görevi
exports.build = gulp.series(cleanAll, createFolders, buildAssets);

// Her şeyi temizleyerek yapı görevi
exports.cleanBuild = gulp.series(cleanEverything, createFolders, buildAssets);
