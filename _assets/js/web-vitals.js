// Web Vitals metriklerini izleme ve raporlama
(function () {
    // Sadece performans API varsa çalış
    if (!("performance" in window) || !("PerformanceObserver" in window)) return;

    // LCP (Largest Contentful Paint) ölçümü
    const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        // Sadece LCP metrikleri için
        if (lastEntry.entryType === "largest-contentful-paint") {
            // LCP değerini konsola yazdır
            const lcp = lastEntry.startTime;
            logVitals("LCP", lcp);

            // Google Analytics varsa bilgiyi gönder
            if (typeof gtag === "function") {
                gtag("event", "web_vitals", {
                    event_category: "Web Vitals",
                    event_label: "LCP",
                    value: Math.round(lcp),
                    non_interaction: true,
                });
            }
        }
    });

    // FID (First Input Delay) ölçümü
    const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
            // Sadece ilk etkileşim gecikmesi için
            if (entry.entryType === "first-input") {
                // Gecikme değerini konsola yazdır
                const fid = entry.processingStart - entry.startTime;
                logVitals("FID", fid);

                // Google Analytics varsa bilgiyi gönder
                if (typeof gtag === "function") {
                    gtag("event", "web_vitals", {
                        event_category: "Web Vitals",
                        event_label: "FID",
                        value: Math.round(fid),
                        non_interaction: true,
                    });
                }
            }
        });
    });

    // CLS (Cumulative Layout Shift) ölçümü
    let cumulativeLayoutShift = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
            // Layout shift değeri ekleniyor
            if (!entry.hadRecentInput) {
                cumulativeLayoutShift += entry.value;
            }
        });

        // CLS değerini konsola yazdır (300ms aralıklarla)
        logVitals("CLS", cumulativeLayoutShift);

        // Google Analytics varsa bilgiyi gönder
        if (typeof gtag === "function") {
            gtag("event", "web_vitals", {
                event_category: "Web Vitals",
                event_label: "CLS",
                value: Math.round(cumulativeLayoutShift * 1000),
                non_interaction: true,
            });
        }
    });

    // Web Vitals değerlerini konsola yazdır
    function logVitals(metric, value) {
        console.log(`[Web Vitals] ${metric}: ${value.toFixed(2)}`);
    }

    // Sayfa tamamen yüklendiğinde
    window.addEventListener("load", () => {
        // LCP gözlemcisini başlat
        lcpObserver.observe({
            entryTypes: ["largest-contentful-paint"],
            buffered: true,
        });

        // FID gözlemcisini başlat
        fidObserver.observe({
            entryTypes: ["first-input"],
            buffered: true,
        });

        // CLS gözlemcisini başlat
        clsObserver.observe({
            entryTypes: ["layout-shift"],
            buffered: true,
        });

        // 10 saniye sonra CLS değerini son kez raporla
        setTimeout(() => {
            logVitals("Final CLS", cumulativeLayoutShift);

            // Google Analytics varsa final değeri gönder
            if (typeof gtag === "function") {
                gtag("event", "web_vitals", {
                    event_category: "Web Vitals",
                    event_label: "Final CLS",
                    value: Math.round(cumulativeLayoutShift * 1000),
                    non_interaction: true,
                });
            }
        }, 10000);

        // Sayfa yüklenme zamanını ölç
        const pageLoadTime = performance.now();
        logVitals("Page Load Time", pageLoadTime);

        // Google Analytics varsa sayfa yüklenme zamanını gönder
        if (typeof gtag === "function") {
            gtag("event", "web_vitals", {
                event_category: "Web Vitals",
                event_label: "Page Load Time",
                value: Math.round(pageLoadTime),
                non_interaction: true,
            });
        }
    });
})();
