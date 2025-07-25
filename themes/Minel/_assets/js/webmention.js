// Webmention.io verilerini çek ve göster
(function () {
    const apiToken = "-WNw5YpxvCMIj8LDM0bScg";
    const webmentionsContainer = document.querySelector(".webmentions-content");

    if (!webmentionsContainer) return;

    // Geçerli URL'yi al ve düzenle
    let currentPageUrl = window.location.href.split("#")[0].split("?")[0];

    // Eğer localhost ise, production URL'ine çevir
    if (currentPageUrl.includes("localhost:8000")) {
        currentPageUrl = currentPageUrl.replace("http://localhost:8000", "https://yuceltoluyag.github.io");
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
        webmentionsListEl.className = "space-y-6";

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
            likesSection.className = "card bg-base-100 shadow-xs";

            const likesBody = document.createElement("div");
            likesBody.className = "card-body p-4";

            const likesTitle = document.createElement("h3");
            likesTitle.className = "card-title text-lg flex items-center mb-3";
            likesTitle.innerHTML = `<iconify-icon icon="tabler:heart" class="mr-2"></iconify-icon> Beğenenler (${interactions.likes.length})`;
            likesBody.appendChild(likesTitle);

            const likesGrid = document.createElement("div");
            likesGrid.className = "flex flex-wrap gap-2";

            interactions.likes.forEach((like) => {
                const likeItem = document.createElement("div");

                // Orijinal post URL'ini oluştur
                const postUrl = like.url.split("#")[0];

                const authorLink = document.createElement("a");
                authorLink.href = postUrl; // Profil yerine post linkini kullan
                authorLink.target = "_blank";
                authorLink.rel = "noopener";
                authorLink.title = `${like.author.name} tarafından beğenildi`;
                authorLink.className = "avatar tooltip";
                authorLink.setAttribute("data-tip", like.author.name);

                const avatarContainer = document.createElement("div");
                avatarContainer.className = "w-10 rounded-full";

                if (like.author.photo) {
                    const avatarEl = document.createElement("img");
                    avatarEl.src = like.author.photo;
                    avatarEl.alt = like.author.name;
                    avatarContainer.appendChild(avatarEl);
                } else {
                    avatarContainer.innerHTML =
                        '<iconify-icon icon="tabler:user" class="w-full h-full p-2 bg-base-200"></iconify-icon>';
                }

                authorLink.appendChild(avatarContainer);
                likeItem.appendChild(authorLink);
                likesGrid.appendChild(likeItem);
            });

            likesBody.appendChild(likesGrid);
            likesSection.appendChild(likesBody);
            webmentionsListEl.appendChild(likesSection);
        }

        // Repostları göster
        if (interactions.reposts.length > 0) {
            const repostsSection = document.createElement("div");
            repostsSection.className = "card bg-base-100 shadow-xs";

            const repostsBody = document.createElement("div");
            repostsBody.className = "card-body p-4";

            const repostsTitle = document.createElement("h3");
            repostsTitle.className = "card-title text-lg flex items-center mb-3";
            repostsTitle.innerHTML = `<iconify-icon icon="tabler:repeat" class="mr-2"></iconify-icon> Paylaşanlar (${interactions.reposts.length})`;
            repostsBody.appendChild(repostsTitle);

            const repostsWrapper = document.createElement("div");
            repostsWrapper.className = "space-y-4";

            interactions.reposts.forEach((repost) => {
                const repostItem = createInteractionItem(repost);
                repostsWrapper.appendChild(repostItem);
            });

            repostsBody.appendChild(repostsWrapper);
            repostsSection.appendChild(repostsBody);
            webmentionsListEl.appendChild(repostsSection);
        }

        // Yanıtları göster
        if (interactions.replies.length > 0) {
            const repliesSection = document.createElement("div");
            repliesSection.className = "card bg-base-100 shadow-xs";

            const repliesBody = document.createElement("div");
            repliesBody.className = "card-body p-4";

            const repliesTitle = document.createElement("h3");
            repliesTitle.className = "card-title text-lg flex items-center mb-3";
            repliesTitle.innerHTML = `<iconify-icon icon="tabler:message-circle" class="mr-2"></iconify-icon> Yanıtlar (${interactions.replies.length})`;
            repliesBody.appendChild(repliesTitle);

            const repliesWrapper = document.createElement("div");
            repliesWrapper.className = "space-y-4";

            interactions.replies.forEach((reply) => {
                const replyItem = createInteractionItem(reply);
                repliesWrapper.appendChild(replyItem);
            });

            repliesBody.appendChild(repliesWrapper);
            repliesSection.appendChild(repliesBody);
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
        mentionItem.className = "chat chat-start bg-base-100 rounded-md p-3";

        // Yazar bilgisi - chat-header olarak
        const authorEl = document.createElement("div");
        authorEl.className = "chat-header flex items-center gap-2";

        // Avatar
        if (mention.author.photo) {
            const avatarEl = document.createElement("div");
            avatarEl.className = "avatar";

            const avatarImgContainer = document.createElement("div");
            avatarImgContainer.className = "w-8 h-8 rounded-full";

            const img = document.createElement("img");
            img.src = mention.author.photo;
            img.alt = mention.author.name;

            avatarImgContainer.appendChild(img);
            avatarEl.appendChild(avatarImgContainer);
            authorEl.appendChild(avatarEl);
        } else {
            const placeholderEl = document.createElement("div");
            placeholderEl.className = "avatar placeholder";

            const avatarPlaceholder = document.createElement("div");
            avatarPlaceholder.className = "w-8 h-8 rounded-full bg-base-200";
            avatarPlaceholder.innerHTML = '<iconify-icon icon="tabler:user" class="w-5 h-5"></iconify-icon>';

            placeholderEl.appendChild(avatarPlaceholder);
            authorEl.appendChild(placeholderEl);
        }

        // Yazar bilgileri - flex içinde
        const authorNameEl = document.createElement("a");
        authorNameEl.className = "font-medium";
        authorNameEl.href = mention.author.url || "#";
        authorNameEl.target = "_blank";
        authorNameEl.rel = "noopener";
        authorNameEl.textContent = mention.author.name;
        authorEl.appendChild(authorNameEl);

        // Tarih - belirteç olarak sağda
        if (mention.published) {
            const dateEl = document.createElement("time");
            dateEl.className = "text-xs opacity-60 ml-auto";
            dateEl.dateTime = mention.published;

            // Tarihi formatla
            const date = new Date(mention.published);
            const options = { year: "numeric", month: "long", day: "numeric" };
            dateEl.textContent = date.toLocaleDateString("tr-TR", options);
            authorEl.appendChild(dateEl);
        }

        mentionItem.appendChild(authorEl);

        // İçerik - chat-bubble olarak
        if (mention.content && mention.content.text) {
            const contentEl = document.createElement("div");
            contentEl.className = "chat-bubble chat-bubble-primary bg-opacity-10 text-base-content mt-2";
            contentEl.textContent = mention.content.text;
            mentionItem.appendChild(contentEl);
        }

        // Kaynak - chat-footer olarak
        const sourceEl = document.createElement("div");
        sourceEl.className = "chat-footer mt-1 opacity-70 text-xs flex justify-between items-center";

        const sourceLink = document.createElement("a");
        sourceLink.href = mention.url;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener";
        sourceLink.className = "flex items-center gap-1 link link-hover";
        sourceLink.innerHTML = '<iconify-icon icon="tabler:external-link"></iconify-icon> Kaynağa git';

        sourceEl.appendChild(sourceLink);
        mentionItem.appendChild(sourceEl);

        return mentionItem;
    }

    // Boş durum göster
    function displayEmptyState() {
        const emptyStateEl = document.createElement("div");
        emptyStateEl.className = "card bg-base-200 shadow-sm p-5 my-4";

        // İçerik konteyner
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "flex items-center gap-4";

        // İkon (animasyonlu)
        const icon = document.createElement("div");
        icon.className = "text-primary bg-primary/10 p-3 rounded-full animate-pulse";
        icon.innerHTML = '<iconify-icon icon="tabler:message-circle-off" width="28" height="28"></iconify-icon>';

        // Metin
        const textWrapper = document.createElement("div");

        const message = document.createElement("div");
        message.className = "font-medium text-lg";
        message.textContent = "Henüz webmention yok";

        const description = document.createElement("div");
        description.className = "text-sm opacity-70";
        description.textContent = "Bu makaleye yanıt vermek için kendi web sitenizden bir bağlantı oluşturun.";

        textWrapper.appendChild(message);
        textWrapper.appendChild(description);

        // Ek ikonlar - süsleme amaçlı
        const decorativeBubbles = document.createElement("div");
        decorativeBubbles.className = "absolute bottom-2 right-2 opacity-10";
        decorativeBubbles.innerHTML = `
            <iconify-icon icon="tabler:message-circle-2" width="16" height="16" class="inline-block mr-1"></iconify-icon>
            <iconify-icon icon="tabler:message-circle" width="20" height="20" class="inline-block mr-1"></iconify-icon>
            <iconify-icon icon="tabler:message-dots" width="14" height="14" class="inline-block"></iconify-icon>
        `;

        // Elementleri bir araya getir
        contentWrapper.appendChild(icon);
        contentWrapper.appendChild(textWrapper);
        emptyStateEl.appendChild(contentWrapper);
        emptyStateEl.appendChild(decorativeBubbles);

        // Animasyon stil tanımı
        const style = document.createElement("style");
        style.textContent = `
            @keyframes subtle-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .7; }
            }
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 3s linear infinite;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-25%); }
            }
            .animate-bounce {
                animation: bounce 1s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);

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
