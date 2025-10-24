/**
 * Main JavaScript file for the Minel theme
 */
document.addEventListener("DOMContentLoaded", function () {
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
                        console.error("Kopyalama işlemi başarısız oldu: ", err);
                    }

                    document.body.removeChild(textArea);
                });
        });
    });

    // Kodu kopyalama butonlarına dil bilgisi ekleme
    document.querySelectorAll("pre").forEach((pre) => {
        const code = pre.querySelector("code");
        if (!code) return;

        // class'lardan dil bilgisini çıkar (örn. language-python)
        const classes = code.className.split(" ");
        let language = "";

        for (const cls of classes) {
            if (cls.startsWith("language-")) {
                language = cls.replace("language-", "");
                break;
            }
        }

        if (language) {
            // Etiket oluştur
            const languageLabel = document.createElement("div");
            languageLabel.className = "code-language";
            languageLabel.textContent = language;
            pre.appendChild(languageLabel);
        }
    });

    // Karanlık / Aydınlık mod geçişi
    let darkMode = localStorage.getItem("dark-mode") === "true" || false;

    if (prefersDarkScheme.matches) {
        darkMode = true;
    }

    // Resimleri lazyload etme
    const lazyImages = document.querySelectorAll("img[data-src]");
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    if (image.dataset.srcset) {
                        image.srcset = image.dataset.srcset;
                    }
                    image.classList.add("loaded");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(function (image) {
            image.src = image.dataset.src;
            if (image.dataset.srcset) {
                image.srcset = image.dataset.srcset;
            }
            image.classList.add("loaded");
        });
    }

    // Arama fonksiyonları
    const performSearch = (query) => {
        // Bu fonksiyon search.js dosyasında tanımlanmıştır
        // Buraya sadece bağlantı amacıyla bırakıldı
    };
});
