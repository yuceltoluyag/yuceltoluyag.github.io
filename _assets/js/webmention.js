// Webmention.io verilerini çek ve göster
(function () {
    const apiToken = "-WNw5YpxvCMIj8LDM0bScg";
    const webmentionsContainer = document.querySelector(".webmentions-content");

    if (!webmentionsContainer) return;

    // Geçerli URL'yi al
    const currentPageUrl = window.location.href.split("#")[0].split("?")[0];

    // Webmention API endpoint'i
    const apiEndpoint = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(
        currentPageUrl
    )}&token=${apiToken}`;

    // Webmention verilerini çek
    fetch(apiEndpoint)
        .then((response) => response.json())
        .then((data) => {
            if (data.children && data.children.length > 0) {
                displayWebmentions(data.children);
            } else {
                displayEmptyState();
            }
        })
        .catch((error) => {
            console.error("Webmention verileri alınırken hata oluştu:", error);
            displayEmptyState();
        });

    // Webmention'ları göster
    function displayWebmentions(mentions) {
        const webmentionsListEl = document.createElement("div");
        webmentionsListEl.className = "webmentions-list";

        mentions.forEach((mention) => {
            // Basit webmention doğrulama
            if (!mention.author || !mention.author.name) return;

            const mentionItem = document.createElement("div");
            mentionItem.className = "webmention-item";

            // Yazar bilgisi
            const authorEl = document.createElement("div");
            authorEl.className = "webmention-author";

            // Avatar
            if (mention.author.photo) {
                const avatarEl = document.createElement("img");
                avatarEl.className = "webmention-avatar";
                avatarEl.src = mention.author.photo;
                avatarEl.alt = mention.author.name;
                authorEl.appendChild(avatarEl);
            } else {
                const placeholderEl = document.createElement("div");
                placeholderEl.className = "webmention-avatar-placeholder";
                placeholderEl.innerHTML = '<iconify-icon icon="tabler:user"></iconify-icon>';
                authorEl.appendChild(placeholderEl);
            }

            // Yazar bilgileri
            const authorInfoEl = document.createElement("div");
            authorInfoEl.className = "webmention-author-info";

            // Yazar adı ve bağlantısı
            const authorNameEl = document.createElement("a");
            authorNameEl.className = "webmention-author-name";
            authorNameEl.href = mention.author.url || "#";
            authorNameEl.target = "_blank";
            authorNameEl.rel = "noopener";
            authorNameEl.textContent = mention.author.name;
            authorInfoEl.appendChild(authorNameEl);

            // Tarih
            if (mention.published) {
                const dateEl = document.createElement("div");
                dateEl.className = "webmention-date";

                const timeEl = document.createElement("time");
                timeEl.dateTime = mention.published;

                // Tarihi formatla
                const date = new Date(mention.published);
                const options = { year: "numeric", month: "long", day: "numeric" };
                timeEl.textContent = date.toLocaleDateString("tr-TR", options);

                dateEl.appendChild(timeEl);
                authorInfoEl.appendChild(dateEl);
            }

            authorEl.appendChild(authorInfoEl);
            mentionItem.appendChild(authorEl);

            // İçerik
            if (mention.content && mention.content.text) {
                const contentEl = document.createElement("div");
                contentEl.className = "webmention-content";
                contentEl.textContent = mention.content.text;
                mentionItem.appendChild(contentEl);
            }

            // Kaynak
            const sourceEl = document.createElement("div");
            sourceEl.className = "webmention-source";

            const sourceLink = document.createElement("a");
            sourceLink.href = mention.url;
            sourceLink.target = "_blank";
            sourceLink.rel = "noopener";
            sourceLink.innerHTML = '<iconify-icon icon="tabler:external-link"></iconify-icon> Kaynağa git';

            sourceEl.appendChild(sourceLink);
            mentionItem.appendChild(sourceEl);

            webmentionsListEl.appendChild(mentionItem);
        });

        webmentionsContainer.innerHTML = "";
        webmentionsContainer.appendChild(webmentionsListEl);
    }

    // Boş durum göster
    function displayEmptyState() {
        const emptyStateEl = document.createElement("div");
        emptyStateEl.className = "webmentions-empty";
        emptyStateEl.innerHTML =
            "<p>Henüz webmention yok. Bu makaleye yanıt vermek için kendi web sitenizden bir bağlantı oluşturun.</p>";

        webmentionsContainer.innerHTML = "";
        webmentionsContainer.appendChild(emptyStateEl);
    }
})();
