document.addEventListener("DOMContentLoaded", () => {
    const webmentionsContainer = document.getElementById("webmentions");
    if (!webmentionsContainer) return;

    const targetUrl = webmentionsContainer.getAttribute("data-url");
    if (!targetUrl) return;

    const apiUrl = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(targetUrl)}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const likesContainer = document.getElementById("webmentions-likes");
            const commentsContainer = document.getElementById("webmentions-comments");

            const likes = [];
            const comments = [];

            data.children.forEach((mention) => {
                switch (mention["wm-property"]) {
                    case "like-of":
                        likes.push(mention);
                        break;
                    case "in-reply-to":
                    case "mention-of":
                    case "bookmark-of":
                        comments.push(mention);
                        break;
                }
            });

            renderLikes(likes, likesContainer);
            renderComments(comments, commentsContainer);

            if (likes.length === 0) {
                document.getElementById("webmentions-likes-container").style.display = "none";
            }
            if (comments.length === 0) {
                document.getElementById("webmentions-comments-container").style.display = "none";
            }
            if (likes.length === 0 && comments.length === 0) {
                webmentionsContainer.style.display = "none";
            }
        })
        .catch((error) => {
            console.error("Error fetching webmentions:", error);
            webmentionsContainer.style.display = "none";
        });

    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[m]);
    }

    function renderLikes(mentions, container) {
        if (mentions.length === 0) return;
        container.innerHTML = "";
        mentions.forEach((mention) => {
            const li = document.createElement("li");
            li.className = "webmention-like-item";
            li.innerHTML = `
                <a href="${mention.url}" title="${mention.author.name}" target="_blank" rel="noopener noreferrer nofollow">
                    <img src="${mention.author.photo}" alt="${mention.author.name}" loading="lazy">
                </a>
            `;
            container.appendChild(li);
        });
    }

    function renderComments(mentions, container) {
        if (mentions.length === 0) return;
        container.innerHTML = "";
        mentions.forEach((mention) => {
            const li = document.createElement("li");
            li.className = "webmention-comment-item";
            const date = new Date(mention.published || mention['wm-received']);
            const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            
            li.innerHTML = `
                <div class="webmention-comment-avatar">
                    <img src="${mention.author.photo}" alt="${mention.author.name}" loading="lazy">
                </div>
                <div class="webmention-comment-body">
                    <div class="webmention-comment-header">
                        <strong class="webmention-author-name">${mention.author.name}</strong>
                        <span class="webmention-date">${formattedDate}</span>
                    </div>
                    <div class="webmention-content">
                        ${mention.content ? (mention.content.html || escapeHTML(mention.content.text)) : ''}
                    </div>
                    <a href="${mention.url}" class="webmention-source-link" target="_blank" rel="noopener noreferrer nofollow">${webmentionsContainer.dataset.originalPostText}</a>
                </div>
            `;
            container.appendChild(li);
        });
    }
});
