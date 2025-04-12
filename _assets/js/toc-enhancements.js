// İçindekiler tablosu geliştirmeleri için JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Yalnızca makale sayfalarında çalıştır
    const tocContainer = document.querySelector(".toc-container");
    if (!tocContainer) return;

    const headings = document.querySelectorAll(".article-content h2, .article-content h3, .article-content h4");
    if (!headings.length) return;

    // TOC bağlantılarını seç
    const tocLinks = document.querySelectorAll(".toc a");

    // TOC işaretleyicisi oluştur
    const tocMarker = document.createElement("div");
    tocMarker.className = "toc-marker";
    tocContainer.appendChild(tocMarker);

    // Mevcut görünen başlıkları izle
    let lastActiveLink = null;

    // Kaydırma pozisyonuna göre aktif başlıkları güncelle
    function updateTOC() {
        // Tüm başlıkların pozisyonlarını al
        const headingPositions = Array.from(headings).map((heading) => {
            return {
                id: heading.id,
                top: heading.getBoundingClientRect().top,
            };
        });

        // Görünür alanın üstüne en yakın başlığı bul
        // En üstteki görünür başlık için -10 piksel bir eşik değeri kullanıyoruz
        const visibleHeadings = headingPositions.filter((heading) => heading.top < 100);
        let activeHeadingId =
            visibleHeadings.length > 0 ? visibleHeadings[visibleHeadings.length - 1].id : headingPositions[0].id;

        // Aktif bağlantıyı güncelle
        const newActiveLink = document.querySelector(`.toc a[href="#${activeHeadingId}"]`);

        if (newActiveLink && lastActiveLink !== newActiveLink) {
            // Önceki aktif bağlantının sınıfını kaldır
            if (lastActiveLink) {
                lastActiveLink.classList.remove("active");
            }

            // Yeni aktif bağlantı için sınıf ekle
            newActiveLink.classList.add("active");

            // TOC işaretleyicisini güncelle
            updateTocMarker(newActiveLink);

            // Eğer TOC mobil görünümdeyse ve aktif bağlantı görünür durumda değilse, görünür hale getir
            const tocElement = document.querySelector(".toc");
            if (tocElement && window.innerWidth < 768) {
                const linkRect = newActiveLink.getBoundingClientRect();
                const tocRect = tocElement.getBoundingClientRect();

                if (linkRect.top < tocRect.top || linkRect.bottom > tocRect.bottom) {
                    newActiveLink.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }

            lastActiveLink = newActiveLink;
        }
    }

    // TOC işaretleyicisini güncelle
    function updateTocMarker(activeLink) {
        if (!activeLink) return;

        const linkRect = activeLink.getBoundingClientRect();
        const tocRect = tocContainer.getBoundingClientRect();

        // İşaretleyicinin pozisyonunu ve boyutunu hesapla
        const top = linkRect.top - tocRect.top;

        // İşaretleyicinin stilini güncelle
        tocMarker.style.transform = `translateY(${top}px)`;
        tocMarker.style.height = `${linkRect.height}px`;
    }

    // TOC bağlantılarına tıklama olayları ekle
    tocLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll ile hedef başlığa git
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Navbar yüksekliği için offset
                    behavior: "smooth",
                });

                // URL'yi güncelle
                history.pushState(null, null, targetId);
            }
        });
    });

    // Sayfa kaydırıldığında TOC'u güncelle
    window.addEventListener("scroll", function () {
        requestAnimationFrame(updateTOC);
    });

    // Sayfa yüklendiğinde ilk kez güncelle
    requestAnimationFrame(updateTOC);

    // Sayfa boyutu değiştiğinde de güncelle
    window.addEventListener("resize", function () {
        requestAnimationFrame(updateTOC);
    });
});
