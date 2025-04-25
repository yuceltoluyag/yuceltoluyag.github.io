/**
 * Main JavaScript file for the Minel theme
 */
document.addEventListener("DOMContentLoaded", function () {
    // Responsive menu
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNavigation = document.querySelector(".site-navigation");
    const body = document.body;

    // Mobil menü için overlay oluştur
    const menuOverlay = document.createElement("div");
    menuOverlay.className = "menu-overlay";
    document.body.appendChild(menuOverlay);

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            this.setAttribute("aria-expanded", !isExpanded);
            siteNavigation.classList.toggle("toggled");
            body.classList.toggle("menu-open");
        });

        // Overlay'e tıklama ile menüyü kapat
        menuOverlay.addEventListener("click", function () {
            if (siteNavigation.classList.contains("toggled")) {
                menuToggle.setAttribute("aria-expanded", "false");
                siteNavigation.classList.remove("toggled");
                body.classList.remove("menu-open");
            }
        });

        // Alt menüler için işlemler
        const subMenuParents = document.querySelectorAll(".menu-item-has-children");

        subMenuParents.forEach((item) => {
            // Mobil görünümde alt menüleri açıp kapamak için tıklama işlevi
            const link = item.querySelector(".menu-link");

            if (link && window.innerWidth <= 768) {
                link.addEventListener("click", function (e) {
                    if (window.innerWidth <= 768) {
                        // Sadece mobilde çalışsın
                        e.preventDefault();
                        item.classList.toggle("submenu-open");
                    }
                });
            }
        });

        // Pencere boyutu değiştiğinde menü durumunu sıfırla
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                body.classList.remove("menu-open");
                if (siteNavigation.classList.contains("toggled")) {
                    siteNavigation.classList.remove("toggled");
                    menuToggle.setAttribute("aria-expanded", "false");
                }
            }
        });

        // ESC tuşu ile mobil menüyü kapat
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && siteNavigation.classList.contains("toggled")) {
                menuToggle.setAttribute("aria-expanded", "false");
                siteNavigation.classList.remove("toggled");
                body.classList.remove("menu-open");
            }
        });
    }

    // Otomatik karanlık mod
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Scroll olduğunda header'ı değiştir
    const header = document.querySelector(".site-header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Dış bağlantılar için yeni sekme
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    externalLinks.forEach((link) => {
        if (!link.hasAttribute("target")) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });

    // Sayfa içi bağlantılar için düzgün kaydırma
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Header yüksekliği için ofset
                    behavior: "smooth",
                });

                // URL'yi güncelle ama sayfayı yeniden yükleme
                window.history.pushState(null, null, "#" + targetId);
            }
        });
    });

    // Arama modalı
    const searchLink = document.querySelector(".search-link");
    const searchModal = document.querySelector(".search-modal");
    const searchClose = document.querySelector(".search-modal-close");
    const searchInput = document.querySelector(".search-input");

    if (searchLink && searchModal) {
        searchLink.addEventListener("click", function (e) {
            e.preventDefault();
            searchModal.classList.add("active");
            document.body.classList.add("search-modal-open");
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        });
    }

    if (searchClose && searchModal) {
        searchClose.addEventListener("click", function () {
            searchModal.classList.remove("active");
            document.body.classList.remove("search-modal-open");
        });

        // Modal dışına tıklama
        searchModal.addEventListener("click", function (e) {
            if (e.target === this) {
                searchModal.classList.remove("active");
                document.body.classList.remove("search-modal-open");
            }
        });

        // ESC tuşu ile kapatma
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && searchModal.classList.contains("active")) {
                searchModal.classList.remove("active");
                document.body.classList.remove("search-modal-open");
            }
        });
    }

    // Kod bloklarına kopyalama butonu ekle
    document.querySelectorAll("pre").forEach((pre) => {
        // Sadece içinde code etiketi olan pre'leri işle
        const codeElement = pre.querySelector("code");
        if (!codeElement) return;

        // Eğer zaten bir kopyalama butonu varsa, yeni buton ekleme
        if (pre.querySelector(".copy-button")) {
            return;
        }

        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.setAttribute("type", "button");
        copyButton.setAttribute("aria-label", "Kodu kopyala");
        copyButton.setAttribute("role", "button");

        // Butonu pre elementinin içine ekle
        pre.appendChild(copyButton);

        copyButton.addEventListener("click", () => {
            const code = pre.querySelector("code").textContent;
            navigator.clipboard
                .writeText(code)
                .then(() => {
                    copyButton.classList.add("copied");
                    copyButton.setAttribute("aria-label", "Kod kopyalandı");

                    setTimeout(() => {
                        copyButton.classList.remove("copied");
                        copyButton.setAttribute("aria-label", "Kodu kopyala");
                    }, 2000);
                })
                .catch(() => {
                    // Fallback if clipboard fails
                    const textArea = document.createElement("textarea");
                    textArea.value = code;
                    textArea.style.position = "fixed";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();

                    try {
                        document.execCommand("copy");
                        copyButton.classList.add("copied");
                        copyButton.setAttribute("aria-label", "Kod kopyalandı");

                        setTimeout(() => {
                            copyButton.classList.remove("copied");
                            copyButton.setAttribute("aria-label", "Kodu kopyala");
                        }, 2000);
                    } catch (err) {
                        copyButton.classList.add("error");
                        copyButton.setAttribute("aria-label", "Kopyalanamadı");

                        setTimeout(() => {
                            copyButton.classList.remove("error");
                            copyButton.setAttribute("aria-label", "Kodu kopyala");
                        }, 2000);
                    }

                    document.body.removeChild(textArea);
                });
        });

        // Butonun görünürlüğünü kontrol et
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    copyButton.style.opacity = "1";
                }
            });
        });

        observer.observe(pre);

        // Kod dilini tespit et
        let language = "";
        if (codeElement.className) {
            const classMatch = codeElement.className.match(/language-(\w+)/);
            if (classMatch && classMatch[1]) {
                language = classMatch[1];

                // Dil etiketi ekle (eğer zaten yoksa)
                if (!pre.querySelector(".filename")) {
                    const langLabel = document.createElement("span");
                    langLabel.className = "filename";
                    langLabel.textContent = language.toUpperCase();

                    // Dil etiketini pre'nin en başına ekle (ilk çocuk olarak)
                    pre.insertBefore(langLabel, pre.firstChild);
                }
            }
        }

        // Karakter sayısını hesapla
        const charCount = codeElement.textContent.length;
        const lineHeight = parseInt(window.getComputedStyle(codeElement).lineHeight) || 20;

        // 500 karakterden fazla olan kod blokları için daha fazla göster/daha az göster butonu ekle
        if (charCount > 500) {
            // Başlangıçta max-height ayarla ve taşan içeriği gizle
            pre.style.maxHeight = lineHeight * 10 + "px";
            pre.style.overflow = "hidden";

            // Buton container oluştur (daha iyi konumlandırma için)
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "show-more-button-container";

            const showMoreButton = document.createElement("button");
            showMoreButton.className = "show-more-button";
            showMoreButton.textContent = "Daha Fazla Göster";
            showMoreButton.setAttribute("aria-expanded", "false");

            // Buton container'a ekle ve sonra pre'nin yanına yerleştir
            buttonContainer.appendChild(showMoreButton);
            pre.parentNode.insertBefore(buttonContainer, pre.nextSibling);

            showMoreButton.addEventListener("click", function () {
                const isExpanded = this.getAttribute("aria-expanded") === "true";

                if (isExpanded) {
                    pre.style.maxHeight = lineHeight * 10 + "px";
                    pre.classList.remove("expanded");
                    this.textContent = "Daha Fazla Göster";
                    this.setAttribute("aria-expanded", "false");
                } else {
                    pre.style.maxHeight = pre.scrollHeight + "px";
                    pre.classList.add("expanded");
                    this.textContent = "Daha Az Göster";
                    this.setAttribute("aria-expanded", "true");
                }
            });
        }
    });

    // TOC ve Arama özelliklerini global scope'a fonksiyon olarak tanımlayalım
    window.initializeTOC = function () {
        const toc = document.querySelector(".toc");
        if (!toc) return;

        // Başlık bağlantılarını seç
        const tocLinks = toc.querySelectorAll("a");

        // Görünür başlıkları takip et
        const headers = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6")).filter((header) => header.id);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Aktif olmayan tüm linkleri temizle
                        tocLinks.forEach((link) => link.classList.remove("active"));

                        // Görünür başlığa karşılık gelen linki bul ve aktif et
                        const activeLink = Array.from(tocLinks).find(
                            (link) => link.getAttribute("href") === `#${entry.target.id}`
                        );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }
                    }
                });
            },
            {
                rootMargin: "-100px 0px -66%",
                threshold: 0,
            }
        );

        headers.forEach((header) => observer.observe(header));

        // Düzgün kaydırma
        tocLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: "smooth",
                    });

                    history.pushState(null, null, `#${targetId}`);
                }
            });
        });
    };

    window.initializeSearch = function () {
        const searchForm = document.querySelector(".search-form");
        const searchInputField = document.querySelector(".search-input");
        const searchResults = document.querySelector(".search-results");
        const searchResultsList = document.querySelector(".search-results-list");

        if (!searchForm || !searchInputField) return;

        // URL'den arama parametresini al
        const urlParams = new URLSearchParams(window.location.search);
        const initialQuery = urlParams.get("q");

        // Arama işlemi fonksiyonu
        const performSearch = (query) => {
            if (!query || query.trim() === "") return;

            fetch("/search-data.json")
                .then((response) => response.json())
                .then((data) => {
                    const results = data.filter(
                        (item) =>
                            item.title.toLowerCase().includes(query.toLowerCase()) ||
                            (item.content && item.content.toLowerCase().includes(query.toLowerCase()))
                    );

                    if (searchResultsList) {
                        searchResultsList.innerHTML = "";

                        if (results.length === 0) {
                            const noResults = document.createElement("li");
                            noResults.className = "search-no-results";
                            noResults.textContent = "Sonuç bulunamadı";
                            searchResultsList.appendChild(noResults);
                        } else {
                            results.forEach((result) => {
                                const item = document.createElement("li");
                                item.className = "search-result-item";

                                const link = document.createElement("a");
                                link.href = result.url;
                                link.className = "search-result-link";

                                const title = document.createElement("h3");
                                title.className = "search-result-title";
                                title.textContent = result.title;

                                const snippet = document.createElement("p");
                                snippet.className = "search-result-snippet";
                                snippet.textContent = result.snippet || "İçerik önizlemesi mevcut değil";

                                link.appendChild(title);
                                link.appendChild(snippet);
                                item.appendChild(link);
                                searchResultsList.appendChild(item);
                            });
                        }

                        if (searchResults) {
                            searchResults.classList.add("active");
                        }
                    }
                })
                .catch((error) => {
                    console.error("Arama sırasında hata oluştu:", error);
                });
        };

        // URL'deki aramayı yap
        if (initialQuery) {
            searchInputField.value = initialQuery;
            performSearch(initialQuery);
        }

        // Arama formu gönderildiğinde
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = searchInputField.value.trim();

            if (query) {
                // URL'i güncelle
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("q", query);
                window.history.pushState({}, "", newUrl);

                performSearch(query);
            }
        });
    };

    // İçindekiler tablosu kontrolü
    if (document.querySelector(".toc")) {
        // İçindekiler tablosu fonksiyonlarını çalıştır
        window.initializeTOC();
    }

    // Arama fonksiyonunu çalıştır
    window.initializeSearch();
});
