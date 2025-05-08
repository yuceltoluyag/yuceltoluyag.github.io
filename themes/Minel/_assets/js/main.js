/**
 * Main JavaScript file for the Minel theme
 */
document.addEventListener("DOMContentLoaded", function () {
    // Otomatik karanlık mod
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Scroll olduğunda header'ı değiştir
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                header.classList.add("shadow-md");
            } else {
                header.classList.remove("shadow-md");
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

    // Arama modalı kontrolü - Tüm arama elemanlarını burada birleştirdik
    const searchLink = document.querySelector(".search-trigger");
    const searchTriggers = document.querySelectorAll(".search-trigger");
    const searchModal = document.querySelector("#search-modal") || document.getElementById("search-modal");
    const searchInput = document.querySelector("#search-input") || document.getElementById("search-input");
    const closeSearchModal = document.getElementById("close-search-modal");

    // Dialog elementi kullanan arama modalı
    if (searchLink && searchModal && searchModal.showModal) {
        searchLink.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Arama modalı açılıyor (main.js)");
            searchModal.showModal();
            if (searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        });
    }
    // Normal div elementi kullanan arama modalı
    else if (searchTriggers.length > 0 && searchModal && closeSearchModal) {
        searchTriggers.forEach((trigger) => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault();
                searchModal.classList.remove("hidden");
                searchModal.classList.add("flex");
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            });
        });

        closeSearchModal.addEventListener("click", function () {
            searchModal.classList.add("hidden");
            searchModal.classList.remove("flex");
        });

        // ESC tuşu ile modalı kapatma
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !searchModal.classList.contains("hidden")) {
                searchModal.classList.add("hidden");
                searchModal.classList.remove("flex");
            }
        });

        // Modal dışına tıklama ile kapatma
        searchModal.addEventListener("click", function (e) {
            if (e.target === searchModal) {
                searchModal.classList.add("hidden");
                searchModal.classList.remove("flex");
            }
        });
    }

    // Kod bloklarına kopyalama butonu ekle
    document.querySelectorAll("pre").forEach((pre) => {
        // Sadece içinde code etiketi olan pre'leri işle
        const codeElement = pre.querySelector("code");
        if (!codeElement) return;

        // Eğer zaten bir kopyalama butonu varsa, yeni buton ekleme
        if (pre.querySelector(".btn-copy")) {
            return;
        }

        const copyButton = document.createElement("button");
        copyButton.className = "btn btn-xs btn-ghost btn-copy absolute top-2 right-2";
        copyButton.setAttribute("type", "button");
        copyButton.setAttribute("aria-label", "Kodu kopyala");
        copyButton.setAttribute("role", "button");
        copyButton.innerHTML = '<span class="iconify" data-icon="tabler:copy"></span>';

        // Butonu pre elementinin içine ekle
        pre.style.position = "relative";
        pre.appendChild(copyButton);

        copyButton.addEventListener("click", () => {
            const code = pre.querySelector("code").textContent;
            navigator.clipboard
                .writeText(code)
                .then(() => {
                    copyButton.classList.add("btn-success");
                    copyButton.setAttribute("aria-label", "Kod kopyalandı");
                    copyButton.innerHTML = '<span class="iconify" data-icon="tabler:check"></span>';

                    setTimeout(() => {
                        copyButton.classList.remove("btn-success");
                        copyButton.setAttribute("aria-label", "Kodu kopyala");
                        copyButton.innerHTML = '<span class="iconify" data-icon="tabler:copy"></span>';
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
                        copyButton.classList.add("btn-success");
                        copyButton.setAttribute("aria-label", "Kod kopyalandı");
                        copyButton.innerHTML = '<span class="iconify" data-icon="tabler:check"></span>';

                        setTimeout(() => {
                            copyButton.classList.remove("btn-success");
                            copyButton.setAttribute("aria-label", "Kodu kopyala");
                            copyButton.innerHTML = '<span class="iconify" data-icon="tabler:copy"></span>';
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
            languageLabel.className = "badge badge-sm absolute top-2 left-2 bg-primary/10 text-primary";
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
                    image.classList.add("opacity-100");
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
            image.classList.add("opacity-100");
        });
    }

    // Arama fonksiyonları
    const performSearch = (query) => {
        // Bu fonksiyon search.js dosyasında tanımlanmıştır
        // Buraya sadece bağlantı amacıyla bırakıldı
    };

    // Tema değiştirici için tema tercihini LocalStorage'a kaydetme
    const themeControllers = document.querySelectorAll(".theme-controller");

    // Kaydedilmiş tema varsa yükle
    const savedTheme = localStorage.getItem("theme") || "dark"; // varsayılan olarak koyu tema

    // Sayfa yüklendiğinde tema ayarını kontrol et
    if (savedTheme === "light" || savedTheme === "autumn") {
        // Açık tema için tüm kontrolleri işaretle
        themeControllers.forEach((controller) => {
            controller.checked = true;
        });
        document.documentElement.setAttribute("data-theme", "autumn");
    } else {
        // Koyu tema için kontrolleri işaretleme
        themeControllers.forEach((controller) => {
            controller.checked = false;
        });
        document.documentElement.setAttribute("data-theme", "dim");
    }

    // Tema değişikliği için event listener ekle
    themeControllers.forEach((controller) => {
        controller.addEventListener("change", function () {
            if (this.checked) {
                // Açık tema
                document.documentElement.setAttribute("data-theme", "autumn");
                localStorage.setItem("theme", "light");
                // Diğer kontrolleri de senkronize et
                themeControllers.forEach((c) => {
                    c.checked = true;
                });
            } else {
                // Koyu tema
                document.documentElement.setAttribute("data-theme", "dim");
                localStorage.setItem("theme", "dark");
                // Diğer kontrolleri de senkronize et
                themeControllers.forEach((c) => {
                    c.checked = false;
                });
            }
        });
    });
});
