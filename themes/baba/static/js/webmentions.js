document.addEventListener("DOMContentLoaded", () => {
    const webmentionsContainer = document.getElementById("webmentions");
    if (!webmentionsContainer) {
        return;
    }

    const targetUrl = webmentionsContainer.getAttribute("data-url");
    if (!targetUrl) {
        return;
    }

    const apiUrl = `https://webmention.io/api/mentions.jf2?target=${targetUrl}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const likesContainer = document.getElementById("webmentions-likes");
            const repostsContainer = document.getElementById("webmentions-reposts");
            const commentsContainer = document.getElementById("webmentions-comments");

            const likes = [];
            const comments = [];

            data.children.forEach((mention) => {
                switch (mention["wm-property"]) {
                    case "like-of":
                        likes.push(mention);
                        break;
                    case "in-reply-to":
                        comments.push(mention);
                        break;
                    case "repost-of":
                        comments.push(mention); // Add reposts to comments section
                        break;
                    case "mention-of":
                        comments.push(mention); // Add mentions to comments section
                        break;
                }
            });

            renderLikes(likes, likesContainer);
            renderComments(comments, commentsContainer);

            // Hide sections if no mentions
            if (likes.length === 0) {
                document.getElementById("webmentions-likes-container").style.display = "none";
            }
            if (comments.length === 0) {
                document.getElementById("webmentions-comments-container").style.display = "none";
            }

            // Hide entire webmentions container if no likes and no comments
            if (likes.length === 0 && comments.length === 0) {
                webmentionsContainer.style.display = "none";
            }
        })
        .catch((error) => {
            console.error("Error fetching webmentions:", error);
            // Hide container on error as well
            webmentionsContainer.style.display = "none";
        });

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderLikes(mentions, container) {
        if (mentions.length === 0) {
            container.innerHTML = "<li class='webmentions__empty'>No likes yet.</li>";
            return;
        }
        container.innerHTML = "";
        mentions.forEach((mention) => {
            const li = document.createElement("li");
            li.classList.add("webmention", "webmention--like");
            li.innerHTML = `
                <a href="${mention.url}" title="${mention.author.name}" class="webmention__author" target="_blank" rel="noopener noreferrer nofollow">
                    <img src="${mention.author.photo}" alt="${mention.author.name}" class="webmention__author-photo">
                </a>
            `;
            container.appendChild(li);
        });
    }

    function renderComments(mentions, container) {
        if (mentions.length === 0) {
            container.innerHTML = "<li class='webmentions__empty'>No comments yet.</li>";
            return;
        }
        container.innerHTML = "";
        mentions.forEach((mention) => {
            const li = document.createElement("li");
            li.classList.add("webmention", "webmention--comment");
            li.innerHTML = `
                <a href="${mention.author.url}" target="_blank" rel="noopener noreferrer nofollow">
                    <img src="${mention.author.photo}" alt="${mention.author.name}" class="webmention__author-photo">
                </a>
                <div class="webmention__content-wrapper">
                    <div class="webmention__author-info">
                        <a href="${mention.author.url}" target="_blank" rel="noopener noreferrer nofollow">
                            <strong class="webmention__author-name">${mention.author.name}</strong>
                        </a>
                        <span class="webmention__meta">
                            <a href="${mention.url}" target="_blank" rel="noopener noreferrer nofollow">
                                ${escapeHTML(webmentionsContainer.getAttribute("data-original-post-text") || "")}
                            </a>
                        </span>
                    </div>
                    <div class="webmention__content">
                        ${mention.content.html || mention.content.text}
                    </div>
                </div>
            `;
            container.appendChild(li);
        });
    }
});
