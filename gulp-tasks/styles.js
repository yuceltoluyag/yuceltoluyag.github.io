/**
 * CSS işleme görevleri
 */

const { src, dest } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const config = require("./config");

// Ana CSS dosyası oluşturma (tüm CSS'ler tek bir dosyada birleştirilecek)
function buildMainCss() {
    return src(config.src.css)
        .pipe(concat("main.css")) // Tüm CSS dosyalarını birleştir
        .pipe(postcss([autoprefixer()]))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([cssnano()]))
        .pipe(dest(config.dist.css));
}

// CSS görevini dışa aktar
exports.build = buildMainCss;

module.exports = {
    build: exports.build,
};
