/**
 * Minel Tema - Sayfa Geçiş Animasyonları
 *
 * Bu dosya, Swup kütüphanesini kullanarak sayfa geçişlerini
 * daha akıcı hale getiren animasyonları yönetir.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Swup'ı yükle
    if (typeof Swup === "undefined") {
        console.warn("Swup kütüphanesi yüklenmemiş!");
        return;
    }

    // Swup eklentilerini yapılandır
    let plugins = [];

    // Scroll eklentisi
    if (typeof SwupScrollPlugin !== "undefined") {
        plugins.push(
            new SwupScrollPlugin({
                doScrollingRightAway: false,
                animateScroll: true,
                scrollFriction: 0.3,
                scrollAcceleration: 0.04,
            })
        );
    }

    // JavaScript eklentisi
    if (typeof SwupJsPlugin !== "undefined") {
        plugins.push(new SwupJsPlugin());
    }

    // İlerleme çubuğu eklentisi
    if (typeof SwupProgressPlugin !== "undefined") {
        plugins.push(
            new SwupProgressPlugin({
                className: "swup-progress-bar",
                transition: 300,
                delay: 300,
                initialValue: 0.25,
                finishAnimation: true,
            })
        );
    }

    // Swup'ı yapılandır
    const swup = new Swup({
        containers: ["#main-content"],
        animationSelector: '[class*="swup-transition-"]',
        linkSelector: 'a[href^="/"]:not([data-no-swup]), a[href^="' + window.location.origin + '"]:not([data-no-swup])',
        plugins: plugins,
    });

    // Sayfa değiştiğinde çalışacak fonksiyonlar
    const handlePageChange = () => {
        // Sayfa başına kaydır
        window.scrollTo(0, 0);

        // Yükleme animasyonunu başlat
        const elements = document.querySelectorAll(".onload-animation");
        elements.forEach((element) => {
            element.classList.remove("onload-animation");
            void element.offsetWidth; // Reflow tetikle
            element.classList.add("onload-animation");
        });

        // İçindekiler tablosunu yeniden başlat (eğer sayfada varsa)
        if (typeof initTOC === "function" && document.getElementById("toc")) {
            initTOC();
        }

        // Kod kopyalama butonlarını yeniden başlat
        if (typeof initCodeCopy === "function") {
            initCodeCopy();
        }
    };

    // Sayfa değişim olaylarını dinle
    swup.hooks.on("content:replace", handlePageChange);

    // Bağlantı durumlarını yönet
    swup.hooks.on("link:click", () => {
        // Bağlantıya tıklandığında yükleme göstergesi ekle
        document.body.classList.add("is-loading");
    });

    swup.hooks.on("page:view", () => {
        // Yükleme tamamlandığında göstergeyi kaldır
        document.body.classList.remove("is-loading");
    });

    // İlk sayfa yüklendiğinde de işlevleri çağır
    handlePageChange();
});
