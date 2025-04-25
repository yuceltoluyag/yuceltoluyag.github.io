/**
 * Temizleme görevleri
 */

const { src } = require("gulp");
const clean = require("gulp-clean");
const config = require("./config");
const exec = require("child_process").execSync;

// CSS çıktı dizinini temizleme
function cleanCss() {
    // Önce dosyaları temizle
    src(`${config.dist.css}/**/*.css*`, { read: false }).pipe(clean({ force: true }));

    // Sonra alt klasörleri temizle (sadece Windows için)
    try {
        exec(`if exist "${config.dist.css}\\base" rmdir /s /q "${config.dist.css}\\base"`);
        exec(`if exist "${config.dist.css}\\components" rmdir /s /q "${config.dist.css}\\components"`);
        exec(`if exist "${config.dist.css}\\layouts" rmdir /s /q "${config.dist.css}\\layouts"`);
        exec(`if exist "${config.dist.css}\\pages" rmdir /s /q "${config.dist.css}\\pages"`);
        exec(`if exist "${config.dist.css}\\utils" rmdir /s /q "${config.dist.css}\\utils"`);
    } catch (e) {
        console.log("Alt klasör temizleme hatası (önemsiz olabilir):", e.message);
    }

    return Promise.resolve();
}

// JS çıktı dizinini temizleme
function cleanJs() {
    return src(`${config.dist.js}/**/*.js*`, { read: false }).pipe(clean({ force: true }));
}

// Tüm çıktı dizinlerini temizleme
function cleanAll() {
    cleanCss();
    cleanJs();
    return Promise.resolve();
}

// CSS ve JS temizleme (tam temizlik)
function cleanEverything() {
    cleanCss();
    cleanJs();
    return Promise.resolve();
}

module.exports = {
    css: cleanCss,
    js: cleanJs,
    all: cleanAll,
    everything: cleanEverything,
};
