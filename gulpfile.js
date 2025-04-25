/**
 * Minel Tema için Gulp Ana Görev Dosyası
 */

const { series, parallel, watch } = require("gulp");
const config = require("./gulp-tasks/config");

// Görevleri içe aktarma
const styles = require("./gulp-tasks/styles");
const scripts = require("./gulp-tasks/scripts");
const clean = require("./gulp-tasks/clean");

// İzleme görevi
function watchFiles() {
    // CSS değişikliklerini izle
    watch(
        config.watch.css,
        series(function (done) {
            console.log("CSS dosyalarında değişiklik algılandı");
            done();
        }, styles.build)
    );

    // JS değişikliklerini izle
    watch(
        config.watch.js,
        series(function (done) {
            console.log("JS dosyalarında değişiklik algılandı");
            done();
        }, scripts.build)
    );
}

// Dışa aktarma görevleri
exports.styles = styles.build;
exports.scripts = scripts.build;
exports.clean = clean.all;
exports.cleanEverything = clean.everything;

// Yapı görevleri
const buildAssets = parallel(styles.build, scripts.build);

// Varsayılan görev
exports.default = series(clean.all, buildAssets);

// Geliştirme görevi - Sadece CSS ve JS temizleme
exports.dev = series(clean.all, buildAssets, watchFiles);

// Yapı görevi
exports.build = series(clean.all, buildAssets);

// Her şeyi temizleyerek yapı görevi
exports.cleanBuild = series(clean.everything, buildAssets);
