/**
 * İçindekiler Tablosu (TOC) - Birleştirilmiş Sürüm
 * toc.js ve toc-enhancements.js'nin en iyi özelliklerini birleştirir
 */

document.addEventListener("DOMContentLoaded", function () {
    // Hata ayıklama - Sadece localhost'ta çalışacak
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const debugLog = (message, ...args) => {
        if (isLocalhost) {
            console.log(message, ...args);
        }
    };

    // TOC container'ı bul
    const tocContainer = document.querySelector(".toc-container");
    if (!tocContainer) {
        debugLog("TOC container bulunamadı");
        return;
    }

    const tocContent = document.querySelector(".toc-content");
    if (!tocContent) {
        debugLog("TOC content bulunamadı");
        return;
    }

    // TOC içeriğini bul
    const tocDiv = document.getElementById("toc");
    if (!tocDiv) {
        debugLog("TOC div bulunamadı");
        return;
    }

    debugLog("TOC başlatılıyor...");

    // Scroll değişkenlerini tanımla
    let lastScrollTop = 0;
    let scrollDirection = "down";
    let isManualScroll = false;
    let scrollTimeout;

    // IntersectionObserver tanımla
    let headingObserver = null;

    // TOC ve sidebar kaydırma sorunlarını düzelt
    tocContent.style.overflow = "auto";
    tocContent.style.maxHeight = "250px"; // HTML'de tanımlanan yükseklik ile aynı

    // Başlama işlevleri
    setupHeadings();
    setupTocMarker();
    setupTocLinks();

    // Sayfa scroll olayını izle - başlık takibi için önemli
    window.addEventListener(
        "scroll",
        function () {
            // Scroll yönünü belirle
            const st = window.scrollY;
            scrollDirection = st > lastScrollTop ? "down" : "up";
            lastScrollTop = st;

            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            // Performans için requestAnimationFrame kullanarak TOC güncellemesi
            scrollTimeout = requestAnimationFrame(() => {
                if (!isManualScroll) {
                    updateToc();
                }
            });
        },
        { passive: true }
    );

    // TOC içindeki scroll olayını dinle
    tocContent.addEventListener(
        "scroll",
        function () {
            // TOC içinde scroll yapıldığında manuel scroll olarak işaretle
            isManualScroll = true;

            // Belirli bir süre sonra manuel scroll'u sıfırla
            clearTimeout(tocContent.scrollTimeout);
            tocContent.scrollTimeout = setTimeout(() => {
                isManualScroll = false;
            }, 1000); // 1 saniye sonra normal duruma dön
        },
        { passive: true }
    );

    // İlk yükleme işleminden sonra TOC'u bir kez güncelle
    setTimeout(() => {
        updateToc();
    }, 100);

    /**
     * Başlıkları ayarla (ID'leri yoksa otomatik oluştur)
     */
    function setupHeadings() {
        const headings = document.querySelectorAll(".prose h2, .prose h3, .prose h4");
        debugLog("Bulunan başlık sayısı:", headings.length);

        headings.forEach((heading, index) => {
            if (!heading.id) {
                // ID yoksa, başlık metninden ID oluştur
                const id = heading.textContent
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");

                heading.id = `heading-${id}-${index}`;
            }

            // Görünür hale gelmesi için başlıklara sınıf ekle
            heading.classList.add("scroll-mt-24");

            // Başlıklara IntersectionObserver ekle
            observeHeading(heading);
        });
    }

    // IntersectionObserver ile başlıkları izle
    function observeHeading(heading) {
        if (!("IntersectionObserver" in window)) return; // Tarayıcı desteği kontrolü

        if (!headingObserver) {
            headingObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Başlık görünür olduğunda TOC'u güncelle
                            const id = entry.target.id;
                            const link = document.querySelector(`.toc-href[href="#${id}"]`);
                            if (link && !isManualScroll) {
                                // Aktif tüm linkleri kaldır
                                document.querySelectorAll(".toc-href").forEach((l) => {
                                    l.classList.remove("active", "text-primary", "font-medium");
                                });

                                // Aktif linki işaretle
                                link.classList.add("active", "text-primary", "font-medium");

                                // Tam TOC güncellemesi
                                updateTocItems(entry.target, null, window.scrollY);
                            }
                        }
                    });
                },
                {
                    rootMargin: "-80px 0px -70% 0px", // Üstten 80px, alttan %70 görünürlük - daha hassas takip için
                    threshold: [0, 0.1, 0.2, 0.5], // Farklı görünürlük seviyelerinde tetikle
                }
            );
        }

        headingObserver.observe(heading);
    }

    /**
     * TOC linklerine sınıfları düzenle - SVG'leri kaldır
     */
    function setupTocLinks() {
        // Tüm TOC linklerini bul
        const tocLinks = tocDiv.querySelectorAll("a");
        if (tocLinks.length === 0) {
            debugLog("TOC linkleri bulunamadı");
            return;
        }

        debugLog("TOC linkleri bulundu:", tocLinks.length);

        tocLinks.forEach((link) => {
            // Link sınıflarını düzenle
            link.classList.remove("toc-link");
            link.classList.add(
                "toc-href",
                "text-base-content/70",
                "hover:text-primary",
                "transition-colors",
                "relative"
            );

            // SVG ikonu eklemeyi kaldırdık

            // Link tıklama olayı
            link.addEventListener("click", handleTocLinkClick);
        });

        // Başlık eşleştirmelerini hazırla
        return setupHeaderMappings();
    }

    /**
     * TOC marker'ı oluştur - SVG olmadan sadece işaretleyici
     */
    function setupTocMarker() {
        // Eski marker'ı kaldır (varsa)
        const existingMarker = tocContent.querySelector(".toc-marker");
        if (existingMarker) {
            existingMarker.remove();
        }
    }

    /**
     * Başlık eşleştirmelerini hazırla
     */
    function setupHeaderMappings() {
        const tocLinks = tocDiv.querySelectorAll("a.toc-href");

        // Başlıkları ve bağlantılarını eşleştir
        return Array.from(tocLinks)
            .map((link) => {
                const id = link.getAttribute("href").slice(1);
                const header = document.getElementById(id);
                return { id, header, link };
            })
            .filter((item) => item.header); // Sadece mevcut başlıkları al
    }

    /**
     * TOC link tıklama olayını işle
     */
    function handleTocLinkClick(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").slice(1);
        const targetHeader = document.getElementById(targetId);

        if (targetHeader) {
            // Sayfa geçiş animasyonunu engelle
            e.stopPropagation();

            // Manuel scroll bayrağını etkinleştir
            isManualScroll = true;

            // Smooth scroll
            window.scrollTo({
                top: targetHeader.offsetTop - 100, // Üstten ofset
                behavior: "smooth",
            });

            // URL'i güncelle ama sayfayı yenileme
            if (history.pushState) {
                history.pushState(null, null, `#${targetId}`);
            } else {
                location.hash = `#${targetId}`;
            }

            // Aktif link sınıfını güncelle
            const allTocLinks = document.querySelectorAll(".toc-href");
            allTocLinks.forEach((link) => link.classList.remove("text-primary", "font-medium"));
            this.classList.add("text-primary", "font-medium");

            // 1 saniye sonra manuel scroll bayrağını kaldır
            setTimeout(() => {
                isManualScroll = false;
            }, 1000);
        }
    }

    /**
     * TOC'u güncelle - hem toc.js hem de toc-enhancements.js'den en iyi özellikleri kullanır
     */
    function updateToc() {
        // Manuel scroll yapılıyorsa güncelleme yapma
        if (isManualScroll) return;

        const scrollPosition = window.scrollY + 150;
        const headings = Array.from(document.querySelectorAll(".prose h2, .prose h3, .prose h4"));
        if (headings.length === 0) return;

        // Aktif başlığı bul
        let currentHeader = null;
        let previousHeader = null;

        // Hangi başlığın görünür olduğunu belirle
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const nextHeading = headings[i + 1];
            const headingTop = heading.offsetTop;
            const nextHeadingTop = nextHeading ? nextHeading.offsetTop : document.body.scrollHeight;

            if (scrollPosition >= headingTop && scrollPosition < nextHeadingTop) {
                previousHeader = currentHeader;
                currentHeader = heading;
                break;
            }
        }

        // Eğer görünür başlık bulunamadıysa, son görünür başlığı bul
        if (!currentHeader && headings.length > 0) {
            for (const heading of headings) {
                if (heading.offsetTop > scrollPosition) {
                    currentHeader = heading;
                    break;
                }
            }

            // Hala bulunamadıysa, son başlığı seç
            if (!currentHeader) {
                currentHeader = headings[headings.length - 1];
            }
        }

        // Eğer bir başlık bulunduysa, TOC öğelerini güncelle
        updateTocItems(currentHeader, previousHeader, scrollPosition);
    }

    /**
     * TOC öğelerini aktif başlığa göre güncelle
     */
    function updateTocItems(currentHeader, previousHeader, scrollPosition) {
        if (!currentHeader) return;

        const allTocLinks = document.querySelectorAll(".toc-href");

        // Önce tüm aktif sınıfları kaldır
        allTocLinks.forEach((link) => {
            link.classList.remove("text-primary", "font-medium", "active");
        });

        // ID'ye göre aktif linki bul
        const activeLink = document.querySelector(`.toc-href[href="#${currentHeader.id}"]`);
        if (!activeLink) return;

        // Aktif linke sınıf ekle
        activeLink.classList.add("text-primary", "font-medium", "active");

        // Okunan başlıkları işaretle
        markReadLinks(activeLink, allTocLinks, scrollPosition);

        // TOC'u aktif öğeye scroll et (manuel scroll değilse)
        if (!isManualScroll) {
            scrollTocToActiveLink(activeLink, previousHeader);
        }
    }

    /**
     * Okunan linkleri işaretle - SVG olmadan
     */
    function markReadLinks(activeLink, allTocLinks, scrollPosition) {
        const allLinks = Array.from(allTocLinks);
        const activeIndex = allLinks.indexOf(activeLink);

        // Tüm linkleri kontrol et
        allLinks.forEach((link, index) => {
            // Aktif linkten önceki tüm linkleri "okundu" olarak işaretle
            if (index < activeIndex) {
                link.classList.add("text-base-content/50");
            }
            // Aktif linki işaretle
            else if (index === activeIndex) {
                link.classList.add("text-base-content/90");
            }
            // Diğer linkleri temizle
            else {
                link.classList.remove("text-base-content/50", "text-base-content/90");
            }
        });
    }

    /**
     * TOC'u güncel başlığa göre otomatik olarak kaydırır
     * @param {HTMLElement} activeLink - Aktif TOC linki
     * @param {HTMLElement} previousHeader - Bir önceki aktif başlık
     */
    function scrollTocToActiveLink(activeLink, previousHeader) {
        // Manuel scroll durumunda bu işlevi çalıştırma
        if (isManualScroll) return;

        const liElement = activeLink.closest("li"); // Daha güvenli seçici
        if (!liElement) return;

        // TOC içeriğinin boyutlarını al
        const tocContentRect = tocContent.getBoundingClientRect();

        // Link elemanının pozisyonunu hesapla
        const linkRect = activeLink.getBoundingClientRect();
        const linkTop = linkRect.top - tocContentRect.top + tocContent.scrollTop;
        const linkBottom = linkTop + linkRect.height;

        // TOC'un görünür bölgesi
        const visibleStart = tocContent.scrollTop;
        const visibleEnd = visibleStart + tocContent.clientHeight;

        // Link görünür bölgenin dışındaysa scroll yap
        if (linkTop < visibleStart || linkBottom > visibleEnd) {
            // Scroll yönüne göre farklı pozisyonlama
            let scrollTarget;

            if (scrollDirection === "down") {
                // Aşağı scroll için link'i üstte tut
                scrollTarget = linkTop - tocContent.clientHeight * 0.2;
            } else {
                // Yukarı scroll için link'i altta tut
                scrollTarget = linkTop - tocContent.clientHeight * 0.8;
            }

            // Sınırları kontrol et
            scrollTarget = Math.max(0, Math.min(scrollTarget, tocContent.scrollHeight - tocContent.clientHeight));

            // Yumuşak scroll
            tocContent.scrollTo({
                top: scrollTarget,
                behavior: "smooth",
            });
        }
    }
});
