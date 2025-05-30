/**
 * İçindekiler Tablosu (TOC) için Gelişmiş Özellikler
 * Geliştirilmiş okuma takibi ve navigasyon özellikleri
 */

document.addEventListener("DOMContentLoaded", function () {
    const tocContainer = document.querySelector(".toc-container");
    if (!tocContainer) return;

    // İçindekiler listesini seç
    const tocItems = document.querySelectorAll(".toc-list-item");
    if (tocItems.length === 0) return;

    // Tüm başlıkları seç ve ID'leri yoksa oluştur
    setupHeadings();

    // TOC marker'ı oluştur
    createTocMarker();

    // TOC linklerini geliştir
    enhanceTocLinks();

    // Scroll olayını dinle ve aktif başlığı güncelle
    window.addEventListener("scroll", debounce(updateActiveTocItem, 100));

    // Sayfa yüklendiğinde aktif başlığı belirle
    updateActiveTocItem();
});

/**
 * Başlıkları hazırla, ID'leri yoksa otomatik ekle
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
        heading.classList.add("scroll-mt-24");
    });
}

/**
 * İçindekiler marker'ı oluştur
 */
function createTocMarker() {
    const tocContent = document.querySelector(".toc-content");
    if (!tocContent) return;

    const marker = document.createElement("div");
    marker.className = "absolute w-0.5 h-5 bg-primary rounded-full transition-transform duration-200 left-2";
    tocContent.appendChild(marker);
}

/**
 * TOC linklerini geliştir
 * SVG icon ekle ve sınıfları düzenle
 */
function enhanceTocLinks() {
    const links = document.querySelectorAll(".toc-list-item a");

    links.forEach((link) => {
        // Link stillerini düzenle
        link.classList.remove("toc-link");
        link.classList.add(
            "flex",
            "items-center",
            "text-base-content/80",
            "hover:text-primary",
            "transition-colors",
            "py-1"
        );

        // SVG ikon ekle
        const dotIcon = createDotIcon();
        link.insertBefore(dotIcon, link.firstChild);
    });
}

/**
 * Scroll olayında aktif başlığı belirle
 */
function updateActiveTocItem() {
    const headings = Array.from(
        document.querySelectorAll(".article-content h2, .article-content h3, .article-content h4")
    );
    if (headings.length === 0) return;

    // Viewport'un üst kısmından 100px aşağısını eşik kabul et
    const scrollPosition = window.scrollY + 150;

    // Görünür olan başlıkları bul
    let currentHeading = null;

    // Hangi başlığın görünür olduğunu belirle
    for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const nextHeading = headings[i + 1];

        const headingTop = heading.offsetTop;
        const nextHeadingTop = nextHeading ? nextHeading.offsetTop : document.body.scrollHeight;

        // Eğer scroll pozisyonu, başlık ile bir sonraki başlık arasındaysa veya son başlıksa
        if (scrollPosition >= headingTop && scrollPosition < nextHeadingTop) {
            currentHeading = heading;
            break;
        }
    }

    // Eğer görünür başlık yoksa ilk görünür başlığı bul
    if (!currentHeading && headings.length > 0) {
        for (const heading of headings) {
            if (heading.offsetTop > scrollPosition) {
                currentHeading = heading;
                break;
            }
        }

        // Hala bulunamadıysa, son başlığı seç
        if (!currentHeading) {
            currentHeading = headings[headings.length - 1];
        }
    }

    // Aktif başlığı işaretle
    markActiveTocItem(currentHeading);
}

/**
 * Aktif başlık için TOC öğesini işaretle
 */
function markActiveTocItem(activeHeading) {
    if (!activeHeading) return;

    const allTocLinks = document.querySelectorAll(".flex.items-center.text-base-content\\/80");
    const marker = document.querySelector(".absolute.w-0\\.5.h-5.bg-primary");

    // Önce tüm aktif sınıfları kaldır
    allTocLinks.forEach((link) => {
        link.classList.remove("text-primary", "font-medium");
    });

    // ID'ye göre aktif linki bul
    const activeLink = document.querySelector(`.flex.items-center.text-base-content\\/80[href="#${activeHeading.id}"]`);
    if (!activeLink) return;

    // Aktif linke sınıf ekle
    activeLink.classList.add("text-primary", "font-medium");

    // Daha önce okunan başlıkları işaretle
    markReadItems(activeLink);

    // Marker pozisyonunu güncelle
    if (marker) {
        const linkTop = activeLink.offsetTop;
        marker.style.transform = `translateY(${linkTop}px)`;
    }
}

/**
 * Okunan başlıkları işaretle
 */
function markReadItems(activeLink) {
    const allLinks = Array.from(document.querySelectorAll(".flex.items-center.text-base-content\\/80"));
    const activeIndex = allLinks.indexOf(activeLink);

    // Aktif linkten önceki tüm linkleri "okundu" olarak işaretle
    allLinks.forEach((link, index) => {
        if (index < activeIndex) {
            link.classList.add("text-base-content/50");
        } else {
            link.classList.remove("text-base-content/50");
        }
    });
}

/**
 * Nokta şeklindeki SVG ikon oluştur
 */
function createDotIcon() {
    const iconContainer = document.createElement("span");
    iconContainer.className = "inline-flex mr-2";

    // SVG ikonu oluştur
    iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" class="text-primary">
            <line x1="0" y1="12" x2="8" y2="12" class="stroke-primary/30 stroke-1"></line>
            <circle cx="14" cy="12" r="4" class="fill-primary/10 stroke-primary"></circle>
        </svg>
    `;

    return iconContainer;
}

/**
 * Debounce fonksiyonu - scroll performansı için
 */
function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
