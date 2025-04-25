/**
 * Gulp görevleri için genel yapılandırma
 */

module.exports = {
    // Üretim modu kontrolü
    isProd: process.env.NODE_ENV === "production",

    // Kaynak dizinleri
    src: {
        // CSS dosyaları belirli bir sırada yüklenmeli
        css: [
            "_assets/css/base/reset.css",
            "_assets/css/base/variables.css",
            "_assets/css/base/typography.css",
            "_assets/css/base/base.css",
            "_assets/css/components/**/*.css",
            "_assets/css/layouts/**/*.css",
            "_assets/css/pages/**/*.css",
            "_assets/css/utils/**/*.css",
        ],
        js: "_assets/js/**/*.js",
    },

    // Çıktı dizinleri
    dist: {
        css: "themes/Minel/static/css",
        js: "themes/Minel/static/js",
    },

    // İzleme seçenekleri
    watch: {
        css: "_assets/css/**/*.css",
        js: "_assets/js/**/*.js",
    },
};
