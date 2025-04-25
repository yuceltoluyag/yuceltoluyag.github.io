/**
 * Temizleme görevleri
 */

const { src } = require("gulp");
const clean = require("gulp-clean");
const config = require("./config");
const fs = require("fs");
const path = require("path");

// Dizinin var olduğundan emin ol
function ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log(`Dizin oluşturuldu: ${directory}`);
    }
}

// CSS çıktı dizinini temizleme
function cleanCss() {
    // Dizinin var olduğundan emin ol
    ensureDirectoryExists(config.dist.css);

    // Dosyaları temizle
    return src(`${config.dist.css}/**/*.css*`, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
}

// JS çıktı dizinini temizleme
function cleanJs() {
    // Dizinin var olduğundan emin ol
    ensureDirectoryExists(config.dist.js);

    return src(`${config.dist.js}/**/*.js*`, { read: false, allowEmpty: true }).pipe(clean({ force: true }));
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
