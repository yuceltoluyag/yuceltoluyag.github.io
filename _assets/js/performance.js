// Sayfa performansını optimize etmek için
document.addEventListener("DOMContentLoaded", () => {
    // 1. Resimleri lazy load et
    lazyLoadImages();

    // 2. Kritik olmayan JS'leri ertele
    deferNonCriticalJS();

    // 3. Gözlemci tabanlı lazy loading işlemlerini başlat
    initIntersectionObserver();

    // 4. İçerik yükleme sonrası preload
    preloadAfterPageLoad();
});

// Görsel lazy loading
function lazyLoadImages() {
    // Native lazy loading desteği var mı kontrol et
    if ("loading" in HTMLImageElement.prototype) {
        // Sayfa içindeki tüm resimleri bul ve lazy load uygula
        const images = document.querySelectorAll("img:not([loading])");
        images.forEach((img) => {
            img.setAttribute("loading", "lazy");
        });
    } else {
        // Tarayıcı lazy loading desteklemiyorsa, IntersectionObserver API'si ile uygula
        // (Bu durumda initIntersectionObserver fonksiyonu kullanılacak)
    }

    // iframe'lere lazy loading ekle
    const iframes = document.querySelectorAll("iframe:not([loading])");
    iframes.forEach((iframe) => {
        iframe.setAttribute("loading", "lazy");
    });
}

// Kritik olmayan scriptleri gecikmeli yükle
function deferNonCriticalJS() {
    const nonCriticalScripts = [
        // Örnek kritik olmayan script'ler
        "/assets/js/analytics.min.js",
        "/assets/js/social-share.min.js",
        "/assets/js/comments.min.js",
    ];

    setTimeout(() => {
        nonCriticalScripts.forEach((scriptSrc) => {
            if (!document.querySelector(`script[src*="${scriptSrc}"]`)) {
                const script = document.createElement("script");
                script.src = scriptSrc;
                script.defer = true;
                document.body.appendChild(script);
            }
        });
    }, 3000); // 3 saniye sonra yükle
}

// Intersection Observer ile lazy loading
function initIntersectionObserver() {
    if (!("IntersectionObserver" in window)) return;

    // Görünürlük gözlemcisi oluştur
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;

                    // Lazysizes ile yüklenen görsel bir data-src'ye sahipse
                    if (element.tagName === "IMG" && element.dataset.src) {
                        element.src = element.dataset.src;
                        element.classList.remove("lazyload");
                        element.classList.add("lazyloaded");
                    }

                    // iframe ise
                    if (element.tagName === "IFRAME" && element.dataset.src) {
                        element.src = element.dataset.src;
                        element.classList.remove("lazyload");
                        element.classList.add("lazyloaded");
                    }

                    // Animasyon sınıfları varsa
                    if (element.classList.contains("animate-on-scroll")) {
                        element.classList.add("animate-visible");
                    }

                    // Gözlemlemeyi durdur
                    observer.unobserve(element);
                }
            });
        },
        {
            rootMargin: "0px 0px 200px 0px", // 200px eşiği ile önceden yüklemeye başla
            threshold: 0.1, // %10 görünürlükte tetikle
        }
    );

    // Gözlemlenecek tüm öğeleri seç
    const lazyElements = document.querySelectorAll(".lazyload, .animate-on-scroll");
    lazyElements.forEach((element) => {
        observer.observe(element);
    });
}

// Sayfa yüklendikten sonra diğer sayfalar için ön yükleme yap
function preloadAfterPageLoad() {
    // Sayfa tamamen yüklendikten 5 saniye sonra çalış
    setTimeout(() => {
        // Sayfa içindeki tüm bağlantıları bul
        const links = Array.from(document.querySelectorAll("a"))
            .filter((link) => {
                // Sadece aynı domain'deki bağlantıları al
                return (
                    link.hostname === window.location.hostname &&
                    !link.href.includes("#") && // Anchor bağlantıları hariç tut
                    link.href !== window.location.href
                ); // Mevcut sayfa hariç
            })
            .map((link) => link.href);

        // Tekrarlanan bağlantıları kaldır
        const uniqueLinks = [...new Set(links)];

        // En çok tıklanan ilk 3 bağlantıyı preload et
        // Gerçek bir uygulamada burada analytics verilerine göre en popüler
        // sayfaları seçebilirsiniz
        uniqueLinks.slice(0, 3).forEach((url) => {
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = url;
            document.head.appendChild(link);
        });
    }, 5000);
}

// Tarayıcı idle olduğunda çalıştırılacak görevler
if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
        // DOM'u temizle - kullanılmayan attribute'ları kaldır
        cleanDOM();
    });
}

// DOM temizliği
function cleanDOM() {
    // Gereksiz data attribute'larını temizle
    document.querySelectorAll("[data-temp]").forEach((el) => {
        el.removeAttribute("data-temp");
    });

    // Boş sınıfları temizle
    document.querySelectorAll('[class=""]').forEach((el) => {
        el.removeAttribute("class");
    });
}
