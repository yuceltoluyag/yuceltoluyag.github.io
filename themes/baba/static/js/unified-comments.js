/**
 * Unified Comments System
 * Fetches and displays comments from Mastodon and Bluesky in a single thread.
 */
document.addEventListener("DOMContentLoaded", () => {
    const commentsList = document.getElementById("unified-comments-list");
    if (!commentsList) {
        return;
    }

    const feedbackContainer = document.getElementById("unified-main-post-feedback");
    const {
        mastodonDomain, mastodonId,
        blueskyDid, blueskyPostCid,
        locale, firstCommentPrompt, errorLoading, loadingText
    } = commentsList.dataset;

    if ((!mastodonDomain || !mastodonId) && (!blueskyDid || !blueskyPostCid)) {
        commentsList.innerHTML = "";
        return;
    }

    // --- MASTODON DIALOG LOGIC ---
    const replyButton = document.getElementById('replyButton');
    const tootReplyDialog = document.getElementById('toot-reply-dialog');

    if (replyButton && tootReplyDialog) {
        const dialogTitleFormat = replyButton.dataset.dialogTitleFormat; // Get format string from button
        const dialogUsername = replyButton.dataset.dialogUsername; // Get username from button
        const copyButton = tootReplyDialog.querySelector('#copyButton');
        const cancelButton = tootReplyDialog.querySelector('#cancelButton');
        const mastodonPostUrlInput = tootReplyDialog.querySelector('#mastodonPostUrl');
        const dialogTitleElement = tootReplyDialog.querySelector('#dialogTitle');
        const mastodonPostId = tootReplyDialog.dataset.mastodonId; // Get mastodon ID from dialog data
        const mastodonDomainFromDialog = tootReplyDialog.dataset.mastodonDomain; // Get mastodon domain from dialog data

        const fullTootUrl = `https://${mastodonDomainFromDialog}/${dialogUsername.startsWith('@') ? '' : '@'}${dialogUsername}/${mastodonPostId}`;
        mastodonPostUrlInput.value = fullTootUrl;
        
        // Format the dialog title
        if (dialogTitleFormat && dialogUsername) {
            dialogTitleElement.innerHTML = dialogTitleFormat.replace('%(username)s', dialogUsername);
        } else {
            dialogTitleElement.innerHTML = dialogTitleFormat || "Reply to post"; // Fallback
        }

        replyButton.addEventListener('click', () => {
            tootReplyDialog.showModal();
        });

        if (copyButton) {
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(mastodonPostUrlInput.value);
                const originalText = copyButton.textContent;
                copyButton.textContent = replyButton.dataset.copiedText; // Use data from button
                setTimeout(() => { copyButton.textContent = originalText; }, 2000);
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                tootReplyDialog.close();
            });
        }
        
        tootReplyDialog.addEventListener('keydown', e => {
            if (e.key === 'Escape') tootReplyDialog.close();
        });
        tootReplyDialog.addEventListener('click', (e) => {
            if (e.target === tootReplyDialog) {
                tootReplyDialog.close();
            }
        });
    }

    // --- UTILITY FUNCTIONS ---
    const escapeHtml = (unsafe) => (unsafe || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    const getBlueskyCdnLink = (imgDid, cid, ext) => `https://cdn.bsky.app/img/feed_fullsize/plain/${imgDid}/${cid}@${ext}`;

    const extractDidAndCidFromCdnUrl = (cdnUrl) => {
        try {
            const url = new URL(cdnUrl);
            const pathParts = url.pathname.split('/');
            if (pathParts.length >= 6 && pathParts[1] === 'img' && (pathParts[2] === 'feed_thumbnail' || pathParts[2] === 'feed_fullsize') && pathParts[3] === 'plain') {
                const did = pathParts[4];
                const cid = pathParts[5].split('@')[0].trim();
                return { did, cid };
            }
        } catch (e) { console.error("Error parsing CDN URL:", cdnUrl, e); }
        return { did: '', cid: '' };
    };

    const showImageModal = (imgDid, cid, altText) => {
        const existingModal = document.getElementById('bsky-modal');
        if (existingModal) existingModal.remove();
        const modal = document.createElement('div');
        modal.id = 'bsky-modal';
        modal.className = 'bsky-image-modal';
        modal.innerHTML = `
            <button class="bsky-image-modal-close">&times;</button>
            <img src="${getBlueskyCdnLink(imgDid, cid, 'png')}" alt="${escapeHtml(altText || '')}">
            ${altText ? `<div class="alt-text">${escapeHtml(altText)}</div>` : ''}
        `;
        document.body.appendChild(modal);
        modal.onclick = (e) => {
            if (e.target === modal || e.target.classList.contains('bsky-image-modal-close')) {
                modal.remove();
            }
        };
    };

    const createEmbedView = (embed, authorDid) => {
        if (!embed || !embed.$type) return document.createDocumentFragment();
        if (embed.$type === "app.bsky.embed.record_with_media#view" && embed.media) {
            return createEmbedView(embed.media, authorDid);
        }
        if (embed.$type === "app.bsky.embed.record#view" && embed.record?.embeds) {
            const container = document.createElement("div");
            container.className = "bsky-quoted-post-embeds";
            embed.record.embeds.forEach(nested => {
                container.appendChild(createEmbedView(nested, embed.record.author?.did || authorDid));
            });
            return container;
        }

        const embedDiv = document.createElement("div");
        embedDiv.className = 'bsky-embed';

        if (embed.$type === "app.bsky.embed.images#view") {
            embedDiv.classList.add('bsky-embed-images');
            const grid = document.createElement('div');
            const gridClass = {1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-2", 4: "grid-cols-2"}[Math.min(embed.images.length, 4)] || "grid-cols-2";
            grid.className = `image-grid ${gridClass}`;

            embed.images.forEach((image, i) => {
                let thumbCid = '', thumbDid = authorDid;
                if (typeof image.thumb === 'string') {
                    const parsed = extractDidAndCidFromCdnUrl(image.thumb);
                    thumbDid = parsed.did || authorDid;
                    thumbCid = parsed.cid;
                } else if (image.thumb?.ref?.$link) {
                    thumbCid = image.thumb.ref.$link;
                } else return;

                const container = document.createElement('div');
                container.className = 'image-container';
                if (embed.images.length === 3 && i === 0) container.classList.add('col-span-2');
                
                const img = document.createElement('img');
                img.src = getBlueskyCdnLink(thumbDid, thumbCid, 'jpeg');
                img.alt = image.alt || '';
                img.loading = 'lazy';
                container.appendChild(img);

                let fullsizeCid = '', fullsizeDid = authorDid;
                if (typeof image.fullsize === 'string') {
                    const parsed = extractDidAndCidFromCdnUrl(image.fullsize);
                    fullsizeDid = parsed.did || authorDid;
                    fullsizeCid = parsed.cid;
                } else if (image.fullsize?.ref?.$link) {
                    fullsizeCid = image.fullsize.ref.$link;
                }
                if(fullsizeCid) container.onclick = () => showImageModal(fullsizeDid, fullsizeCid, image.alt || '');
                
                grid.appendChild(container);
            });
            embedDiv.appendChild(grid);
            return embedDiv;
        } else if (embed.$type === "app.bsky.embed.external#view") {
            embedDiv.classList.add('bsky-embed-external');
            let thumbHtml = '';
            if (embed.external.thumb) {
                let thumbCid = '', thumbDid = authorDid;
                if (typeof embed.external.thumb === 'string') {
                    const parsed = extractDidAndCidFromCdnUrl(embed.external.thumb);
                    thumbDid = parsed.did || authorDid;
                    thumbCid = parsed.cid;
                } else if (embed.external.thumb.ref?.$link) {
                    thumbCid = embed.external.thumb.ref.$link;
                }
                if (thumbCid) thumbHtml = `<img src="${getBlueskyCdnLink(thumbDid, thumbCid, 'jpeg')}" alt="${escapeHtml(embed.external.description || embed.external.title || '')}">`;
            }
            
            try {
                const pathname = new URL(embed.external.uri).pathname;
                const isImageUri = pathname.match(/\.(gif|jpe?g|png|webp)$/i);
                embedDiv.innerHTML = `
                    <a href="${escapeHtml(embed.external.uri)}" target="_blank" rel="noopener noreferrer">
                        ${thumbHtml}
                        ${isImageUri ? '' : `<h3>${escapeHtml(embed.external.title || '')}</h3><p>${escapeHtml(embed.external.description || '')}</p>`}
                    </a>
                `;
            } catch (e) { /* ignore invalid URIs */ }
            return embedDiv;
        }
        return document.createDocumentFragment();
    };

    commentsList.innerHTML = `<p>${escapeHtml(loadingText)}</p>`;
    if(feedbackContainer) feedbackContainer.innerHTML = '';

    // --- DATA FETCHING ---
    const fetchMastodon = async () => {
        if (!mastodonDomain || !mastodonId) return [];
        console.log(`Fetching Mastodon comments from: https://${mastodonDomain}/api/v1/statuses/${mastodonId}/context`);
        const response = await fetch(`https://${mastodonDomain}/api/v1/statuses/${mastodonId}/context`);
        if (!response.ok) throw new Error(`Mastodon API error: ${response.status}`);
        const data = await response.json();
        return data.descendants || [];
    };

    const fetchBluesky = async () => {
        if (!blueskyDid || !blueskyPostCid) return null;
        const uri = `at://${blueskyDid}/app.bsky.feed.post/${blueskyPostCid}`;
        const params = new URLSearchParams({ uri, depth: "6" });
        const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?${params}`);
        if (!response.ok) throw new Error(`Bluesky API error: ${response.status}`);
        return await response.json();
    };

    // --- DATA NORMALIZATION ---
    const mapMastodonReply = (reply) => ({
        source: 'mastodon',
        id: reply.id,
        authorName: escapeHtml(reply.account.display_name),
        authorHandle: `@${escapeHtml(reply.account.acct)}`,
        authorAvatar: escapeHtml(reply.account.avatar_static),
        authorUrl: escapeHtml(reply.account.url),
        postUrl: escapeHtml(reply.uri),
        content: reply.content, // Mastodon content is already HTML
        createdAt: new Date(reply.created_at),
        parentId: reply.in_reply_to_id,
        likeCount: reply.favourites_count || 0,
        repostCount: reply.reblogs_count || 0,
    });

    const mapBlueskyReply = (post) => ({
        source: 'bluesky',
        id: post.uri,
        authorName: escapeHtml(post.author.displayName || post.author.handle),
        authorHandle: `@${escapeHtml(post.author.handle)}`,
        authorAvatar: escapeHtml(post.author.avatar),
        authorUrl: `https://bsky.app/profile/${escapeHtml(post.author.did)}`,
        postUrl: `https://bsky.app/profile/${escapeHtml(post.author.did)}/post/${post.uri.split('/').pop()}`,
        content: escapeHtml(post.record.text || '').replace(/\n/g, '<br>'), // Simple text-to-html
        createdAt: new Date(post.record.createdAt),
        parentId: post.record.reply?.parent.uri, // URI is the unique ID for Bluesky posts
        likeCount: post.likeCount || 0,
        repostCount: post.repostCount || 0,
        embed: post.embed // Keep the embed for rendering
    });

    // --- MAIN LOGIC ---
    const run = async () => {
        try {
            const [mastodonResult, blueskyResult] = await Promise.allSettled([fetchMastodon(), fetchBluesky()]);

            let mastodonReplies = mastodonResult.status === 'fulfilled' ? mastodonResult.value : [];
            const blueskyThread = blueskyResult.status === 'fulfilled' ? blueskyResult.value?.thread : null;

            let allReplies = [];

            // Process and normalize Mastodon replies
            if (mastodonReplies.length > 0) {
                allReplies.push(...mastodonReplies.map(mapMastodonReply));
            }

            // Process and normalize Bluesky replies
            let mainBlueskyPost = null;
            if (blueskyThread && blueskyThread.post) {
                mainBlueskyPost = blueskyThread.post;
                if (blueskyThread.replies) {
                    const flattenedReplies = (function flatten(replies) {
                        return replies.reduce((acc, reply) => {
                            if (reply.post) acc.push(reply.post);
                            if (reply.replies) acc.push(...flatten(reply.replies));
                            return acc;
                        }, []);
                    })(blueskyThread.replies);
                    allReplies.push(...flattenedReplies.map(mapBlueskyReply));
                }
            }
            
            commentsList.innerHTML = '';
            
            if (allReplies.length > 0) {
                // Thread the comments
                const commentsById = new Map(allReplies.map(c => [c.id, { ...c, children: [] }]));
                const rootComments = [];

                for (const comment of commentsById.values()) {
                    if (comment.parentId && commentsById.has(comment.parentId)) {
                        commentsById.get(comment.parentId).children.push(comment);
                    } else {
                        rootComments.push(comment);
                    }
                }
                
                // Sort root comments by date
                rootComments.sort((a, b) => a.createdAt - b.createdAt);

                // Render the threaded comments
                rootComments.forEach(comment => {
                    commentsList.appendChild(renderComment(comment));
                });

            } else { // No replies found
                 if (feedbackContainer) {
                    const postUrl = blueskyDid ? `https://bsky.app/profile/${blueskyDid}/post/${blueskyPostCid}` : `https://${mastodonDomain}/@${mastodonId.split('/')[0]}/${mastodonId.split('/').pop()}`;
                    feedbackContainer.innerHTML = `<p class="bsky-no-engagement-prompt"><a href="${postUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(firstCommentPrompt)}</a></p>`;
                 }
            }

        } catch (error) {
            console.error("Error fetching unified comments:", error);
            commentsList.innerHTML = `<p>${escapeHtml(errorLoading)}</p>`;
        }
    };

    // --- RENDERING FUNCTIONS ---
    const renderComment = (comment, depth = 0) => {
        const commentDiv = document.createElement("div");
        commentDiv.className = `unified-comment comment-depth-${depth}`; // Use class for indentation

        const sourceBadge = `<span class="comment-source-badge via-${comment.source}">${comment.source}</span>`;

        commentDiv.innerHTML = `
            <div class="comment-header">
                <img src="${comment.authorAvatar}" class="comment-avatar" alt="">
                <div class="comment-author">
                    <span class="author-name">${comment.authorName}</span>
                    <span class="author-handle">${comment.authorHandle}</span>
                </div>
                <a href="${comment.postUrl}" target="_blank" rel="noopener noreferrer" class="comment-date">
                    ${comment.createdAt.toLocaleDateString(locale || 'tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </a>
                ${sourceBadge}
            </div>
            <div class="comment-body">
                ${sanitizeAndProcessCommentContent(comment.content, comment.source)}
            </div>
        `;
        
        // Render Bluesky embeds if they exist
        if(comment.source === 'bluesky' && comment.embed) {
            const embedContainer = document.createElement('div');
            embedContainer.className = 'bsky-embed-container';
            // Extract the DID from the author's URL
            const authorDid = new URL(comment.authorUrl).pathname.split('/')[2]; // Correct DID extraction from profile URL
            embedContainer.appendChild(createEmbedView(comment.embed, authorDid));
            commentDiv.querySelector('.comment-body').appendChild(embedContainer);
        }

        // Render replies
        if (comment.children && comment.children.length > 0) {
            const repliesContainer = document.createElement("div");
            repliesContainer.className = "comment-replies";
            comment.children.sort((a,b) => a.createdAt - b.createdAt).forEach(child => {
                repliesContainer.appendChild(renderComment(child, depth + 1));
            });
            commentDiv.appendChild(repliesContainer);
        }
        
        return commentDiv;
    };

    // --- CONTENT PROCESSING ---
    const sanitizeAndProcessCommentContent = (content, source) => {
        if (!content) return '';

        // Create a temporary DOM element to process the content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        // Process all links in the content
        const links = tempDiv.querySelectorAll('a');
        links.forEach(link => {
            // Replace the link with just the text
            const text = link.textContent;
            const textNode = document.createTextNode(text);
            link.parentNode.replaceChild(textNode, link);
        });

        return tempDiv.innerHTML;
    };

    run();
});
