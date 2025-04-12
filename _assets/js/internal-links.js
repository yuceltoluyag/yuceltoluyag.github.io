// İç bağlantıları güçlendirmek için JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // 1. İç bağlantıları seç
    const internalLinks = document.querySelectorAll('a[href^="' + window.location.origin + '"], a[href^="/"]');

    // 2. İç bağlantılar için iyileştirmeler
    internalLinks.forEach((link) => {
        // Henüz ziyaret edilmemiş iç bağlantılar için vurgu ekle
        if (!sessionStorage.getItem("visited_" + link.href)) {
            link.classList.add("unvisited-link");
        }

        // Bağlantı tıklamasını izle
        link.addEventListener("click", () => {
            // Bağlantıyı ziyaret edildi olarak işaretle
            sessionStorage.setItem("visited_" + link.href, "true");
            link.classList.remove("unvisited-link");
        });

        // Bağlantı başlıklarını (title) kontrol et ve yoksa ekle
        if (!link.title && link.textContent) {
            link.title = link.textContent;
        }

        // Harici bağlantı değilse preconnect ekle (yerel bağlantılar için)
        if (link.hostname === window.location.hostname) {
            // Preconnect eklemek için bağlantının hedefini önceden yükleme ipucu ekle
            const linkPreconnect = document.createElement("link");
            linkPreconnect.rel = "preconnect";
            linkPreconnect.href = link.href;
            document.head.appendChild(linkPreconnect);
        }
    });

    // 3. Sayfa içi bağlantılar için smooth scroll ekle
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            // # değilse (boş değilse)
            if (targetId !== "#") {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Sayfa içi bağlantıya smooth scroll ile geç
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Navbar yüksekliği için offset
                        behavior: "smooth",
                    });

                    // URL'yi güncelle
                    window.history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 4. İlgili içerik önerileri oluştur
    function buildRelatedContentSuggestions() {
        // Yalnızca makale sayfalarında çalıştır
        const articleElement = document.querySelector("article.single-article");
        if (!articleElement) return;

        // İlgili içerik bölümünü bul
        const relatedContent = document.querySelector(".related-posts");
        if (!relatedContent) return;

        // Mevcut makale bilgilerini al
        const currentTitle = document.title;
        const currentUrl = window.location.pathname;
        const currentTags = [];

        // Etiketleri topla
        document.querySelectorAll(".article-tags a").forEach((tag) => {
            currentTags.push(tag.textContent.trim());
        });

        // İlgili içerikleri ağırlıkla puanla
        const relatedPosts = Array.from(relatedContent.querySelectorAll(".related-post-item"))
            .map((item) => {
                // İlgili yazı bilgilerini al
                const titleElement = item.querySelector(".related-post-title");
                const title = titleElement ? titleElement.textContent.trim() : "";
                const url = titleElement ? titleElement.getAttribute("href") : "";

                // Eğer mevcut makale ise atla
                if (url === currentUrl) return null;

                // Etiketleri al
                const tags = [];
                item.querySelectorAll(".related-post-tags span").forEach((tag) => {
                    tags.push(tag.textContent.trim());
                });

                // Benzerlik puanı hesapla
                let score = 0;

                // Ortak etiket sayısına göre puan ver
                currentTags.forEach((tag) => {
                    if (tags.includes(tag)) score += 2;
                });

                return {
                    element: item,
                    title,
                    url,
                    tags,
                    score,
                };
            })
            .filter((item) => item !== null)
            .sort((a, b) => b.score - a.score);

        // İlgili içerikleri yeniden düzenle
        if (relatedPosts.length > 0) {
            const relatedPostsContainer = relatedContent.querySelector(".related-posts-container");
            if (relatedPostsContainer) {
                // Mevcut içeriği temizle
                relatedPostsContainer.innerHTML = "";

                // En alakalı içerikleri ekle (en fazla 3 tane)
                relatedPosts.slice(0, 3).forEach((post) => {
                    relatedPostsContainer.appendChild(post.element);
                });
            }
        }
    }

    // İlgili içerik önerilerini oluştur
    buildRelatedContentSuggestions();
});
