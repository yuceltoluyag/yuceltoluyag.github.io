/**
 * JavaScript işleme görevleri
 */

const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const config = require("./config");
const terser = require("gulp-terser");
const fs = require("fs");

// Dizinin var olduğundan emin ol
function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log(`Dizin oluşturuldu: ${directory}`);
    }
}

// Bireysel JS dosyalarını işleme
function processJs() {
    // Çıktı dizininin var olduğundan emin ol
    ensureDirectoryExists(config.dist.js);

    return src(config.src.js, { allowEmpty: true })
        .pipe(
            gulpIf(
                config.isProd,
                terser({
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true,
                    },
                    mangle: {
                        toplevel: true,
                    },
                    output: {
                        comments: false,
                    },
                })
            )
        )
        .pipe(gulpIf(!config.isProd, uglify()))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(config.dist.js));
}

// Ana JS dosyası oluşturma
function buildMainJs() {
    // Çıktı dizininin var olduğundan emin ol
    ensureDirectoryExists(config.dist.js);

    return src(config.src.js, { allowEmpty: true })
        .pipe(concat("main.js"))
        .pipe(
            gulpIf(
                config.isProd,
                terser({
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true,
                    },
                    mangle: {
                        toplevel: true,
                    },
                    output: {
                        comments: false,
                    },
                })
            )
        )
        .pipe(gulpIf(!config.isProd, uglify()))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(config.dist.js));
}

// Bir adet main.js oluştur ve geriye her dosyayı ayrı ayrı oluştur
exports.build = function () {
    // Önce ana JS dosyasını oluştur
    buildMainJs();

    // Sonra diğer JS dosyalarını işle
    return processJs();
};

module.exports = {
    build: exports.build,
};
