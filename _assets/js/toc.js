// TOC başlatma
(() => {
    // Debug log fonksiyonunu güvenli şekilde kullan
    const debugLog = (tag, message) => {
        if (typeof window.debugLog === "function") {
            window.debugLog(tag, message);
        } else {
            // console.log(`[${tag}] ${message}`); // İsteğe bağlı: konsola yazdırabilirsiniz
        }
    };

    debugLog("TOC", "TOC başlatılıyor...");

    const tocContainer = document.querySelector(".toc-container");
    if (!tocContainer) {
        debugLog("TOC", "TOC container bulunamadı");
        return;
    }

    const tocLinks = tocContainer.querySelectorAll("a.toc-href");
    debugLog("TOC", `TOC linkleri: ${tocLinks.length}`);
    if (!tocLinks.length) {
        debugLog("TOC", "TOC linkleri bulunamadı");
        return;
    }

    // SVG template - Minimal tasarım
    const svgTemplate = `
    <svg viewBox="0 0 24 24" class="toc-icon">
        <circle cx="4" cy="12" r="2" class="toc-dot"/>
        <line x1="6" y1="12" x2="18" y2="12" class="toc-line"/>
    </svg>
  `;

    // Her linke SVG ekle
    tocLinks.forEach((link, index) => {
        debugLog("TOC", `Link ${index}: ${link.href} - ${link.textContent}`);
        link.insertAdjacentHTML("afterbegin", svgTemplate);
    });

    // Başlıkları ve pozisyonlarını al
    const headers = Array.from(tocLinks)
        .map((link) => {
            const id = link.getAttribute("href").slice(1);
            const header = document.getElementById(id);
            debugLog("TOC", `Başlık ${id}: ${header ? "bulundu" : "bulunamadı"}`);
            return { id, header, link };
        })
        .filter((item) => item.header);

    debugLog("TOC", `Eşleşen başlık sayısı: ${headers.length}`);

    // TOC durumunu güncelle
    const updateTOC = () => {
        const scrollPos = window.scrollY + 200;
        let currentHeader = null;
        let previousHeader = null;

        // Aktif ve önceki başlığı bul
        for (const item of headers) {
            if (item.header.offsetTop <= scrollPos) {
                previousHeader = currentHeader;
                currentHeader = item;
            } else {
                break;
            }
        }

        if (currentHeader) {
            debugLog("TOC", `Aktif başlık: ${currentHeader.id}`);

            // TOC öğelerini güncelle
            headers.forEach(({ header, link }, index) => {
                // Önceki başlıkları işaretle
                if (header.offsetTop < scrollPos) {
                    link.classList.add("toc-already-read");

                    // Progress hesapla
                    const nextHeader = headers[index + 1]?.header;
                    const progress = nextHeader
                        ? Math.min(
                              100,
                              ((scrollPos - header.offsetTop) / (nextHeader.offsetTop - header.offsetTop)) * 100
                          )
                        : 100;

                    const circle = link.querySelector("circle");
                    if (circle) {
                        circle.setAttribute("stroke-dashoffset", Math.round(100 - progress));
                    }
                } else {
                    link.classList.remove("toc-already-read");
                }

                // Aktif başlığı işaretle
                if (header === currentHeader.header) {
                    link.classList.add("toc-reading");

                    // TOC'u aktif öğeye scroll et
                    const liElement = link.parentElement;
                    const tocRect = tocContainer.getBoundingClientRect();
                    const liRect = liElement.getBoundingClientRect();

                    // Scroll yönünü belirle
                    const scrollingUp =
                        previousHeader && previousHeader.header.offsetTop > currentHeader.header.offsetTop;

                    if (liRect.top < tocRect.top || liRect.bottom > tocRect.bottom) {
                        const offset = scrollingUp
                            ? tocContainer.clientHeight * 0.7 // Yukarı scroll için offset
                            : tocContainer.clientHeight * 0.3; // Aşağı scroll için offset

                        tocContainer.scrollTo({
                            top: liElement.offsetTop - offset,
                            behavior: "smooth",
                        });
                    }
                } else {
                    link.classList.remove("toc-reading");
                }
            });
        } else {
            debugLog("TOC", "Aktif başlık bulunamadı");
        }
    };

    // Scroll event listener
    let scrollTimeout;
    window.addEventListener(
        "scroll",
        () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(() => {
                debugLog("TOC", `Scroll pozisyonu: ${window.scrollY}`);
                updateTOC();
            });
        },
        { passive: true }
    );

    // TOC link tıklama
    tocLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetHeader = document.getElementById(targetId);

            if (targetHeader) {
                debugLog("TOC", `Tıklanan başlık: ${targetId}`);

                // Sayfa geçiş animasyonunu engelle
                e.stopPropagation();

                // Smooth scroll
                window.scrollTo({
                    top: targetHeader.offsetTop - 100,
                    behavior: "smooth",
                });

                // URL'i güncelle ama sayfayı yenileme
                if (history.pushState) {
                    history.pushState(null, null, `#${targetId}`);
                } else {
                    location.hash = `#${targetId}`;
                }
            }
        });
    });

    // İlk yüklemede güncelle
    debugLog("TOC", "TOC ilk güncelleme yapılıyor...");
    updateTOC();
})();
