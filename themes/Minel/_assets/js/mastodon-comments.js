const styles = ``;

class MastodonComments extends HTMLElement {
    constructor() {
        super();

        this.host = this.getAttribute("host");
        this.user = this.getAttribute("user");
        this.tootId = this.getAttribute("tootId");

        this.commentsLoaded = false;
    }

    connectedCallback() {
        this.innerHTML = `
      <div id="mastodon-stats" class="mb-4"></div>
      <h2 class="text-2xl font-bold mb-3 flex items-center">
        <iconify-icon icon="tabler:message-circle" class="mr-2"></iconify-icon>
        Yorumlar
      </h2>

      <div class="alert bg-base-200 mb-6">
        <div>
          <iconify-icon icon="tabler:info-circle" class="text-xl"></iconify-icon>
          <div>
            Bu <a class="link link-primary font-medium"
                href="https://${this.host}/@${this.user}/${this.tootId}" target="_blank" rel="noopener noreferrer">gönderi</a>ye yanıt vermek için 
                Fediverse (örn. Mastodon ve diğerleri) hesabınızı kullanabilirsiniz.
          </div>
        </div>
      </div>
      <div id="mastodon-comments-list"></div>
    `;

        const comments = document.getElementById("mastodon-comments-list");
        this.respondToVisibility(comments, this.loadComments.bind(this));
    }

    escapeHtml(unsafe) {
        return (unsafe || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    toot_active(toot, what) {
        var count = toot[what + "_count"];
        return count > 0 ? "active" : "";
    }

    toot_count(toot, what) {
        var count = toot[what + "_count"];
        return count > 0 ? count : "";
    }

    toot_stats(toot) {
        const replyCount = this.toot_count(toot, "replies");
        const reblogCount = this.toot_count(toot, "reblogs");
        const favouriteCount = this.toot_count(toot, "favourites");

        return `
      <div class="replies ${this.toot_active(toot, "replies")}">
        <a href="${toot.url}" rel="nofollow noopener noreferrer" target="_blank" title="Yanıtlar">${replyCount}</a>
      </div>
      <div class="reblogs ${this.toot_active(toot, "reblogs")}">
        <a href="${toot.url}" rel="nofollow noopener noreferrer" target="_blank" title="Boosts">${reblogCount}</a>
      </div>
      <div class="favourites ${this.toot_active(toot, "favourites")}">
        <a href="${toot.url}" rel="nofollow noopener noreferrer" target="_blank" title="Favoriler">${favouriteCount}</a>
      </div>
    `;
    }

    user_account(account) {
        var result = `@${account.acct}`;
        if (account.acct.indexOf("@") === -1) {
            var domain = new URL(account.url);
            result += `@${domain.hostname}`;
        }
        return result;
    }

    render_toots(toots, in_reply_to, depth) {
        var tootsToRender = toots
            .filter((toot) => toot.in_reply_to_id === in_reply_to)
            .sort((a, b) => a.created_at.localeCompare(b.created_at));

        console.log("Rendering toots for in_reply_to_id: " + in_reply_to + ", found:", tootsToRender.length);

        tootsToRender.forEach((toot) => {
            console.log("Rendering toot:", toot.id, "visibility:", toot.visibility);
            this.render_toot(toots, toot, depth);
        });
    }

    render_toot(toots, toot, depth) {
        toot.account.display_name = this.escapeHtml(toot.account.display_name);
        toot.account.emojis.forEach((emoji) => {
            toot.account.display_name = toot.account.display_name.replace(
                `:${emoji.shortcode}:`,
                `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                    emoji.shortcode
                }" height="20" width="20" />`
            );
        });

        // Process custom emojis in the content
        let processedContent = toot.content;
        if (toot.emojis && toot.emojis.length > 0) {
            console.log("Processing emojis in toot:", toot.id, "emojis:", toot.emojis.length);
            toot.emojis.forEach((emoji) => {
                const emojiCode = `:${emoji.shortcode}:`;
                const emojiImg = `<img src="${this.escapeHtml(emoji.static_url)}" alt="Emoji ${
                    emoji.shortcode
                }" height="20" width="20" />`;

                processedContent = processedContent.replace(new RegExp(emojiCode, "g"), emojiImg);
            });
        }

        // Mention bağlantılarına target ve rel özellikleri ekleme
        processedContent = processedContent.replace(
            /<a class="u-url mention" href="([^"]+)">(.+?)<\/a>/g,
            '<a class="u-url mention" href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
        );

        // Tüm diğer bağlantıları da güncelle
        processedContent = processedContent.replace(/<a\s+(?![^>]*target=)[^>]*>/gi, function (match) {
            return match.slice(0, -1) + ' target="_blank">';
        });

        const mastodonComment = `<div class="mastodon-comment" data-depth="${depth}">
        <div class="author">
          <div class="avatar">
            <div class="w-12 h-12 rounded-lg">
              <img src="${this.escapeHtml(
                  toot.account.avatar_static
              )}" class="w-full h-full object-cover" alt="${this.escapeHtml(toot.account.display_name)}">
            </div>
          </div>
          <div class="details">
            <a class="name" href="${toot.account.url}" target="_blank" rel="nofollow noopener noreferrer">${
            toot.account.display_name
        }</a>
            <a class="user badge badge-ghost" href="${
                toot.account.url
            }" target="_blank" rel="nofollow noopener noreferrer">${this.user_account(toot.account)}</a>
          </div>
          <a class="date" href="${toot.url}" target="_blank" rel="nofollow noopener noreferrer">
            <div class="badge badge-outline badge-sm">
              <iconify-icon icon="tabler:clock" class="mr-1"></iconify-icon>
              ${toot.created_at.substr(0, 10)} ${toot.created_at.substr(11, 8)}
            </div>
          </a>
        </div>
        <div class="content card-body p-0 py-3">${processedContent}</div>
        ${
            toot.media_attachments.length > 0
                ? `
        <div class="attachments card bg-base-200 rounded-lg overflow-hidden">
          ${toot.media_attachments
              .map((attachment) => {
                  if (attachment.type === "image") {
                      return `<figure><a href="${
                          attachment.url
                      }" target="_blank" rel="nofollow noopener noreferrer"><img src="${
                          attachment.preview_url
                      }" alt="${this.escapeHtml(attachment.description || "Görsel")}" /></a></figure>`;
                  } else if (attachment.type === "video") {
                      return `<figure><video controls class="w-full"><source src="${attachment.url}" type="${attachment.mime_type}"></video></figure>`;
                  } else if (attachment.type === "gifv") {
                      return `<figure><video autoplay loop muted playsinline class="w-full"><source src="${attachment.url}" type="${attachment.mime_type}"></video></figure>`;
                  } else if (attachment.type === "audio") {
                      return `<div class="card-body"><audio controls class="w-full"><source src="${attachment.url}" type="${attachment.mime_type}"></audio></div>`;
                  } else {
                      return `<div class="card-body"><a href="${attachment.url}" target="_blank" rel="nofollow noopener noreferrer" class="btn btn-outline btn-sm">${attachment.type} <iconify-icon icon="tabler:download"></iconify-icon></a></div>`;
                  }
              })
              .join("")}
        </div>`
                : ""
        }
        <div class="status">
          ${this.toot_stats(toot)}
        </div>
      </div>`;

        var div = document.createElement("div");

        // DOMPurify kullanılıyorsa
        if (typeof DOMPurify !== "undefined") {
            const purifyConfig = {
                ADD_ATTR: ["target"],
                ALLOW_UNKNOWN_PROTOCOLS: true,
                FORBID_ATTR: [],
            };
            div.innerHTML = DOMPurify.sanitize(mastodonComment.trim(), purifyConfig);

            // DOMPurify sonrasında hedef özelliğini eklemek için tüm bağlantıları yeniden işle
            const links = div.querySelectorAll("a");
            links.forEach((link) => {
                if (!link.hasAttribute("target")) {
                    link.setAttribute("target", "_blank");
                }
            });
        } else {
            div.innerHTML = mastodonComment.trim();
        }

        document.getElementById("mastodon-comments-list").appendChild(div.firstChild);

        this.render_toots(toots, toot.id, depth + 1);
    }

    loadComments() {
        if (this.commentsLoaded) return;

        document.getElementById("mastodon-comments-list").innerHTML = `
        <div class="flex justify-center my-8">
            <span class="loading loading-spinner loading-md text-primary"></span>
            <span class="ml-3">Fediverse'den yorumlar yükleniyor...</span>
        </div>`;

        let _this = this;

        console.log("Mastodon Comments: Trying to load comments for toot ID: " + this.tootId);

        // Toot veri kontrolü
        if (!this.tootId || this.tootId.trim() === "") {
            document.getElementById("mastodon-comments-list").innerHTML = `
            <div class="alert alert-warning">
                <div>
                    <iconify-icon icon="tabler:alert-circle" class="text-xl"></iconify-icon>
                    <div>Geçerli bir Mastodon toot ID'si belirtilmedi.</div>
                </div>
            </div>`;
            return;
        }

        fetch("https://" + this.host + "/api/v1/statuses/" + this.tootId)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP hata: ${response.status}`);
                }
                return response.json();
            })
            .then((toot) => {
                console.log("Mastodon Comments: Toot data loaded:", toot);
                document.getElementById("mastodon-stats").innerHTML = this.toot_stats(toot);
            })
            .catch((error) => {
                console.error("Mastodon Comments: Error loading toot:", error);
                // Ana gönderiyi getirirken hata olursa, yorumları getirmeyi denemeye devam et
            });

        fetch("https://" + this.host + "/api/v1/statuses/" + this.tootId + "/context")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Sunucu yanıt vermedi (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Mastodon Comments: Context data loaded:", data);
                if (data["descendants"] && Array.isArray(data["descendants"]) && data["descendants"].length > 0) {
                    console.log("Mastodon Comments: " + data["descendants"].length + " comments found.");
                    document.getElementById("mastodon-comments-list").innerHTML = "";
                    _this.render_toots(data["descendants"], _this.tootId, 0);
                } else {
                    console.log("Mastodon Comments: No comments found.");
                    document.getElementById("mastodon-comments-list").innerHTML = `
                    <div class="alert alert-info">
                        <div>
                            <iconify-icon icon="tabler:message-off" class="text-xl"></iconify-icon>
                            <div>Henüz yorum bulunamadı. İlk yorumu yapan siz olun!</div>
                        </div>
                        <a href="https://${this.host}/@${this.user}/${this.tootId}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                            <iconify-icon icon="tabler:message-plus" class="mr-2"></iconify-icon>
                            Yorum Yap
                        </a>
                    </div>`;
                }

                _this.commentsLoaded = true;
            })
            .catch((error) => {
                console.error("Mastodon Comments: Error loading context:", error);
                document.getElementById("mastodon-comments-list").innerHTML = `
                <div class="alert alert-error">
                    <div>
                        <iconify-icon icon="tabler:alert-triangle" class="text-xl"></iconify-icon>
                        <div>Yorumlar yüklenirken hata oluştu: ${error.message}</div>
                    </div>
                    <div>
                        <a href="https://${this.host}/@${this.user}/${this.tootId}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
                            <iconify-icon icon="tabler:external-link" class="mr-2"></iconify-icon>
                            Mastodon'da Görüntüle
                        </a>
                    </div>
                </div>`;
            });
    }

    respondToVisibility(element, callback) {
        var options = {
            root: null,
        };

        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    callback();
                }
            });
        }, options);

        observer.observe(element);
    }
}

customElements.define("mastodon-comments", MastodonComments);
