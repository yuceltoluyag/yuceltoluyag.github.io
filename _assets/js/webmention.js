// Webmention.io verilerini çek ve göster
(function () {
    const apiToken = "-WNw5YpxvCMIj8LDM0bScg";
    const webmentionsContainer = document.querySelector(".webmentions-content");

    if (!webmentionsContainer) return;

    // Geçerli URL'yi al ve düzenle
    let currentPageUrl = window.location.href.split("#")[0].split("?")[0];

    // Eğer localhost ise, production URL'ine çevir
    if (currentPageUrl.includes("localhost:8000")) {
        currentPageUrl = currentPageUrl.replace("http://localhost:8000", "https://yuceltoluyag.dev");
    }

    // Webmention API endpoint'i
    const apiEndpoint = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(
        currentPageUrl
    )}&token=${apiToken}`;

    // Debug bilgisi
    if (window.WEBMENTION_TEST_MODE) {
        console.log("Current URL:", currentPageUrl);
        console.log("API Endpoint:", apiEndpoint);
    }

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

        // Etkileşimleri grupla
        const interactions = {
            likes: [],
            reposts: [],
            replies: [],
        };

        mentions.forEach((mention) => {
            // Basit webmention doğrulama
            if (!mention.author || !mention.author.name) return;

            // Etkileşim tipine göre grupla
            if (mention.url && mention.url.includes("#favorited-by-")) {
                interactions.likes.push(mention);
            } else if (mention.url && mention.url.includes("#reblogged-by-")) {
                interactions.reposts.push(mention);
            } else {
                interactions.replies.push(mention);
            }
        });

        // Beğenileri göster
        if (interactions.likes.length > 0) {
            const likesSection = document.createElement("div");
            likesSection.className = "webmention-section likes";

            const likesTitle = document.createElement("h3");
            likesTitle.textContent = `Beğenenler (${interactions.likes.length})`;
            likesSection.appendChild(likesTitle);

            const likesGrid = document.createElement("div");
            likesGrid.className = "webmention-likes-grid";

            interactions.likes.forEach((like) => {
                const likeItem = document.createElement("div");
                likeItem.className = "webmention-like-item";

                // Orijinal post URL'ini oluştur
                const postUrl = like.url.split("#")[0];

                const authorLink = document.createElement("a");
                authorLink.href = postUrl; // Profil yerine post linkini kullan
                authorLink.target = "_blank";
                authorLink.rel = "noopener";
                authorLink.title = `${like.author.name} tarafından beğenildi`;

                if (like.author.photo) {
                    const avatarEl = document.createElement("img");
                    avatarEl.className = "webmention-like-avatar";
                    avatarEl.src = like.author.photo;
                    avatarEl.alt = like.author.name;
                    authorLink.appendChild(avatarEl);
                } else {
                    const placeholderEl = document.createElement("div");
                    placeholderEl.className = "webmention-avatar-placeholder";
                    placeholderEl.innerHTML = '<iconify-icon icon="tabler:user"></iconify-icon>';
                    authorLink.appendChild(placeholderEl);
                }

                likeItem.appendChild(authorLink);
                likesGrid.appendChild(likeItem);
            });

            likesSection.appendChild(likesGrid);
            webmentionsListEl.appendChild(likesSection);
        }

        // Repostları göster
        if (interactions.reposts.length > 0) {
            const repostsSection = document.createElement("div");
            repostsSection.className = "webmention-section reposts";

            const repostsTitle = document.createElement("h3");
            repostsTitle.textContent = `Paylaşanlar (${interactions.reposts.length})`;
            repostsSection.appendChild(repostsTitle);

            interactions.reposts.forEach((repost) => {
                const repostItem = createInteractionItem(repost);
                repostsSection.appendChild(repostItem);
            });

            webmentionsListEl.appendChild(repostsSection);
        }

        // Yanıtları göster
        if (interactions.replies.length > 0) {
            const repliesSection = document.createElement("div");
            repliesSection.className = "webmention-section replies";

            const repliesTitle = document.createElement("h3");
            repliesTitle.textContent = `Yanıtlar (${interactions.replies.length})`;
            repliesSection.appendChild(repliesTitle);

            interactions.replies.forEach((reply) => {
                const replyItem = createInteractionItem(reply);
                repliesSection.appendChild(replyItem);
            });

            webmentionsListEl.appendChild(repliesSection);
        }

        webmentionsContainer.innerHTML = "";
        webmentionsContainer.appendChild(webmentionsListEl);

        // Debug bilgisi
        if (window.WEBMENTION_TEST_MODE) {
            console.log("Interactions:", interactions);
        }
    }

    // Etkileşim öğesi oluştur
    function createInteractionItem(mention) {
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

        return mentionItem;
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

    function formatEmoji(content) {
        // Mastodon emoji formatını HTML'e dönüştür
        return content.replace(/:([a-z0-9_]+):/g, (match, code) => {
            const emojiUrl = `https://files.mastodon.social/custom_emojis/images/${code}.png`;
            return `<img src="${emojiUrl}" alt=":${code}:" class="emoji" loading="lazy">`;
        });
    }

    function createWebmentionItem(mention) {
        const item = document.createElement("div");
        item.className = "webmention-item";

        // Avatar ve yazar bilgisi
        const author = document.createElement("div");
        author.className = "webmention-author";

        const avatar = document.createElement("img");
        avatar.src = mention.data.author.photo;
        avatar.alt = mention.data.author.name;
        avatar.className = "webmention-avatar";

        const authorLink = document.createElement("a");
        authorLink.href = mention.data.url;
        authorLink.title = `${mention.data.author.name} tarafından ${
            mention.data.published ? new Date(mention.data.published).toLocaleDateString("tr-TR") : ""
        }`;
        authorLink.appendChild(avatar);

        const authorName = document.createElement("span");
        authorName.className = "webmention-author-name";
        authorName.textContent = mention.data.author.name;

        author.appendChild(authorLink);
        author.appendChild(authorName);

        // İçerik
        if (mention.data.content) {
            const content = document.createElement("div");
            content.className = "webmention-content";
            content.innerHTML = formatEmoji(mention.data.content.html || mention.data.content.text);
            item.appendChild(content);
        }

        // Etkileşim bilgisi
        const meta = document.createElement("div");
        meta.className = "webmention-meta";

        if (mention.activity.type === "like") {
            meta.innerHTML = `❤️ Beğendi`;
        } else if (mention.activity.type === "repost") {
            meta.innerHTML = `🔁 Boost etti`;
        }

        const date = document.createElement("span");
        date.className = "webmention-date";
        date.textContent = mention.data.published ? new Date(mention.data.published).toLocaleDateString("tr-TR") : "";

        meta.appendChild(date);

        item.appendChild(author);
        item.appendChild(meta);

        return item;
    }
})();
