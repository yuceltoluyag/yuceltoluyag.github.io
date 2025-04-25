/**
 * İçindekiler Tablosu (TOC) - Birleştirilmiş Sürüm
 * toc.js ve toc-enhancements.js'nin en iyi özelliklerini birleştirir
 */

document.addEventListener("DOMContentLoaded", function () {
    // TOC container'ı bul
    const tocContainer = document.querySelector(".toc-container");
    if (!tocContainer) return;

    const tocContent = document.querySelector(".toc-content");
    if (!tocContent) return;

    // Başlama işlevleri
    setupHeadings();
    setupTocMarker();
    setupTocLinks();

    // Scroll değişkenlerini tanımla
    let lastScrollTop = 0;
    let scrollDirection = "down";
    let isManualScroll = false;
    let scrollTimeout;

    // Scroll olayını dinle (performans için requestAnimationFrame kullanarak)
    window.addEventListener(
        "scroll",
        () => {
            // Yalnızca manuel scroll değilse işlem yap
            if (!isManualScroll) {
                // Scroll yönünü belirle
                const st = window.scrollY;
                scrollDirection = st > lastScrollTop ? "down" : "up";
                lastScrollTop = st;

                if (scrollTimeout) {
                    window.cancelAnimationFrame(scrollTimeout);
                }
                scrollTimeout = requestAnimationFrame(() => {
                    updateToc();
                });
            }
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

    // İlk yüklemede TOC'u güncelle
    updateToc();

    /**
     * Başlıkları ayarla (ID'leri yoksa otomatik oluştur)
     */
    function setupHeadings() {
        const headings = document.querySelectorAll(".article-content h2, .article-content h3, .article-content h4");

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
            heading.classList.add("scroll-target");

            // Başlıklara IntersectionObserver ekle
            observeHeading(heading);
        });
    }

    // IntersectionObserver ile başlıkları izle
    let headingObserver;
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
                                updateTocItems(entry.target, null, window.scrollY);
                            }
                        }
                    });
                },
                {
                    rootMargin: "-100px 0px -80% 0px", // Üstten 100px, alttan %80 görünürlük
                    threshold: 0,
                }
            );
        }

        headingObserver.observe(heading);
    }

    /**
     * TOC marker'ı oluştur (aktif başlığın yanındaki çizgi)
     */
    function setupTocMarker() {
        const marker = document.createElement("div");
        marker.className = "toc-marker";
        tocContent.appendChild(marker);
    }

    /**
     * TOC linklerine SVG ikon ekle ve sınıfları düzenle
     */
    function setupTocLinks() {
        // Tüm TOC linklerini bul
        const tocLinks = tocContainer.querySelectorAll(".toc-list-item a");
        if (tocLinks.length === 0) return;

        tocLinks.forEach((link) => {
            // Link sınıflarını düzenle
            link.classList.remove("toc-link");
            link.classList.add("toc-href");

            // SVG ikonu ekle
            link.insertAdjacentHTML("afterbegin", createSvgTemplate());

            // Link tıklama olayı
            link.addEventListener("click", handleTocLinkClick);
        });

        // Başlık eşleştirmelerini hazırla
        return setupHeaderMappings();
    }

    /**
     * SVG şablonu oluştur - daha minimal tasarım
     */
    function createSvgTemplate() {
        return `
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="12" x2="8" y2="12" class="toc-line"></line>
            <circle cx="14" cy="12" r="4" class="toc-dot"></circle>
        </svg>
        `;
    }

    /**
     * Başlık eşleştirmelerini hazırla
     */
    function setupHeaderMappings() {
        const tocLinks = tocContainer.querySelectorAll("a.toc-href");

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
            allTocLinks.forEach((link) => link.classList.remove("toc-reading"));
            this.classList.add("toc-reading");

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
        const headings = Array.from(
            document.querySelectorAll(".article-content h2, .article-content h3, .article-content h4")
        );
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
        const marker = document.querySelector(".toc-marker");

        // Önce tüm aktif sınıfları kaldır
        allTocLinks.forEach((link) => {
            link.classList.remove("toc-reading");
        });

        // ID'ye göre aktif linki bul
        const activeLink = document.querySelector(`.toc-href[href="#${currentHeader.id}"]`);
        if (!activeLink) return;

        // Aktif linke sınıf ekle
        activeLink.classList.add("toc-reading");

        // Okunan başlıkları işaretle ve ilerleme çubuğunu güncelle
        markReadLinks(activeLink, allTocLinks, scrollPosition);

        // Marker pozisyonunu güncelle
        if (marker) {
            const linkTop = activeLink.offsetTop;
            marker.style.transform = `translateY(${linkTop}px)`;
        }

        // TOC'u aktif öğeye scroll et (manuel scroll değilse)
        if (!isManualScroll) {
            scrollTocToActiveLink(activeLink, previousHeader);
        }
    }

    /**
     * Okunan linkleri işaretle ve ilerleme çubuğunu güncelle
     */
    function markReadLinks(activeLink, allTocLinks, scrollPosition) {
        const allLinks = Array.from(allTocLinks);
        const activeIndex = allLinks.indexOf(activeLink);

        // Tüm linkleri kontrol et
        allLinks.forEach((link, index) => {
            const targetId = link.getAttribute("href").slice(1);
            const header = document.getElementById(targetId);

            if (!header) return;

            // Aktif linkten önceki tüm linkleri "okundu" olarak işaretle
            if (index < activeIndex) {
                link.classList.add("toc-already-read");

                // İlerleme durumunu göster
                const circle = link.querySelector("circle");
                if (circle) {
                    circle.setAttribute("stroke-dashoffset", "0"); // Tamamen tamamlandı
                }
            }
            // Aktif linki işaretle, kısmi ilerleme göster
            else if (index === activeIndex) {
                link.classList.add("toc-already-read");

                // Kısmi ilerleme hesapla
                const nextHeader = document.getElementById(allLinks[index + 1]?.getAttribute("href").slice(1));
                if (nextHeader) {
                    const progress = Math.min(
                        100,
                        ((scrollPosition - header.offsetTop) / (nextHeader.offsetTop - header.offsetTop)) * 100
                    );

                    const circle = link.querySelector("circle");
                    if (circle) {
                        circle.setAttribute("stroke-dashoffset", Math.round(100 - progress));
                    }
                }
            }
            // Diğer linkleri temizle
            else {
                link.classList.remove("toc-already-read");
            }
        });
    }

    /**
     * TOC'u aktif öğeye scroll et
     */
    function scrollTocToActiveLink(activeLink, previousHeader) {
        // Manuel scroll durumunda bu işlevi çalıştırma
        if (isManualScroll) return;

        const liElement = activeLink.closest("li"); // Daha güvenli seçici
        if (!liElement) return;

        const tocContentRect = tocContent.getBoundingClientRect();
        const liRect = liElement.getBoundingClientRect();

        // Görüntülenmesi gereken pozisyonu hesapla
        const targetPosition = liElement.offsetTop - tocContent.offsetTop;
        const visibleStart = tocContent.scrollTop;
        const visibleEnd = visibleStart + tocContent.clientHeight;

        // Link görünür değilse scroll
        if (targetPosition < visibleStart || targetPosition > visibleEnd - liElement.clientHeight) {
            // Scroll yönüne göre pozisyonu ayarla
            let scrollOffset;

            if (scrollDirection === "down") {
                // Aşağı doğru scroll için pozisyon (TOC'un üst kısmına daha yakın)
                scrollOffset = targetPosition - tocContent.clientHeight * 0.3;
            } else {
                // Yukarı doğru scroll için pozisyon (TOC'un alt kısmına daha yakın)
                scrollOffset = targetPosition - tocContent.clientHeight * 0.7;
            }

            // Scroll pozisyonunun sınırları aşmamasını sağla
            scrollOffset = Math.max(0, Math.min(scrollOffset, tocContent.scrollHeight - tocContent.clientHeight));

            // Yumuşak scroll yap
            tocContent.scrollTo({
                top: scrollOffset,
                behavior: "smooth",
            });
        }
    }
});
