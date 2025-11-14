/**
 * Federated Comments System
 * Handles loading and displaying comments from the Fediverse
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Initialize dialog elements if they exist
  const dialog = document.querySelector('dialog.mastodon');
  const replyButton = document.getElementById('replyButton');
  const copyButton = document.getElementById('copyButton');
  const cancelButton = document.getElementById('cancelButton');
  const commentsList = document.getElementById('mastodon-comments-list');
  
  // Initialize the dialog event listeners if the dialog exists
  if (dialog) {
    if (replyButton) {
      replyButton.addEventListener('click', () => {
        dialog.showModal();
      });
    }
    
    if (copyButton) {
      copyButton.addEventListener('click', () => {
        const input = copyButton.closest('.copypaste').querySelector('input');
        const url = input.value;
        navigator.clipboard.writeText(url);
        
        // Visual feedback that the URL was copied
        const originalText = copyButton.textContent;
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      });
    }
    
    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        dialog.close();
      });
    }
    
    dialog.addEventListener('keydown', e => {
      if (e.key === 'Escape') dialog.close();
    });
  }
  
  // Helper function to escape HTML
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  // Load comments if there's a comments list element
  if (commentsList) {
    // Get the toot domain and ID from the data attributes
    const tootDomain = commentsList.getAttribute('data-domain');
    const tootId = commentsList.getAttribute('data-id');
    
    if (tootDomain && tootId) {
      commentsList.innerHTML = "Loading comments...";
      
      fetch(`https://${tootDomain}/api/v1/statuses/${tootId}/context`)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log('API response:', data);
          
          if (data && 
              data['descendants'] && 
              Array.isArray(data['descendants']) && 
              data['descendants'].length > 0) {
            
            commentsList.innerHTML = "";
            
            // Build a map of comments by ID for quick lookup
            const commentsById = {};
            
            // First pass: create all comment objects and store in the map
            data['descendants'].forEach(function(reply) {
              // Process emojis in display name
              reply.account.display_name = escapeHtml(reply.account.display_name);
              reply.account.emojis.forEach(emoji => {
                reply.account.display_name = reply.account.display_name.replace(`:${emoji.shortcode}:`, 
                  `<img src="${escapeHtml(emoji.static_url)}" alt="Emoji ${emoji.shortcode}" height="20" width="20" />`);
              });
              
              // Create the comment element
              const commentEl = document.createElement('div');
              commentEl.className = 'mastodon-comment post-comment';
              commentEl.dataset.id = reply.id;
              
              // Add debug information and ensure element is visible
              commentEl.setAttribute('title', `Comment ID: ${reply.id}, Reply to: ${reply.in_reply_to_id || 'none'}`);
              commentEl.style.marginBottom = '10px';
              
              // Create the comment HTML
              commentEl.innerHTML = `
                <div class="avatar">
                  <img src="${escapeHtml(reply.account.avatar_static)}" height=60 width=60 alt="">
                </div>
                <div class="content">
                  <div class="author">
                    <a href="${reply.account.url}" rel="nofollow">
                      <span>${reply.account.display_name}</span>
                      <span class="disabled">${escapeHtml(reply.account.acct)}</span>
                    </a>
                    <a class="date" href="${reply.uri}" rel="nofollow">
                      ${reply.created_at.substr(0, 10)}
                    </a>
                  </div>
                  <div class="mastodon-comment-content">${reply.content}</div>
                  <div class="mastodon-comment-replies" style="margin-left: 10px; border-left: 1px solid rgba(128, 128, 128, 0.3); padding-left: 8px;"></div>
                </div>`;
              
              // Store in our map
              commentsById[reply.id] = {
                element: commentEl,
                data: reply
              };
            });
            
            // Create a thread tree structure
            const rootComments = [];
            
            // Sort comments by date for chronological order
            data['descendants'].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            
            // Debug info
            console.log("Loaded comments:", data['descendants'].length);
            console.log("Original post ID:", tootId);
            
            // Log the first comment to understand structure
            if (data['descendants'][0]) {
              console.log("Sample comment structure:", data['descendants'][0]);
            }
            
            // Second pass: organize comments into threads
            data['descendants'].forEach(function(reply) {
              // If this is a reply to another comment in our thread
              if (reply.in_reply_to_id && commentsById[reply.in_reply_to_id]) {
                // Find the parent
                const parent = commentsById[reply.in_reply_to_id];
                
                // Add this comment to the parent's replies
                const repliesContainer = parent.element.querySelector('.mastodon-comment-replies');
                repliesContainer.appendChild(commentsById[reply.id].element);
                
                console.log(`Nested comment ${reply.id} under parent ${reply.in_reply_to_id}`);
              } 
              // Check if this is a reply to the original post
              else if (reply.in_reply_to_id && reply.in_reply_to_id.toString() === tootId.toString()) {
                // This is a direct reply to the original post
                rootComments.push(commentsById[reply.id].element);
                console.log(`Added comment ${reply.id} as root (reply to original post ${reply.in_reply_to_id})`);
              }
              // Otherwise, add to root level if we can't determine the parent
              else {
                rootComments.push(commentsById[reply.id].element);
                console.log(`Added comment ${reply.id} as root (can't find parent ${reply.in_reply_to_id || 'none'})`);
              }
            });
            
            // Append all root comments to the comments list
            rootComments.forEach(function(rootComment) {
              try {
                if (typeof DOMPurify !== 'undefined') {
                  // There's an issue with DOMPurify.sanitize returning a non-Node object
                  // Let's create a wrapper for the sanitized content
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = DOMPurify.sanitize(rootComment.outerHTML);
                  commentsList.appendChild(tempDiv.firstChild);
                } else {
                  // Directly append the element
                  commentsList.appendChild(rootComment);
                  console.warn('DOMPurify not available, using unsafe content');
                }
                console.log('Successfully appended comment to list');
              } catch (error) {
                console.error('Error appending comment:', error);
                // Fallback: Just add the HTML directly
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = rootComment.outerHTML || '';
                if (tempDiv.firstChild) {
                  commentsList.appendChild(tempDiv.firstChild);
                }
              }
            });
            
            // Add inline styles to ensure the nesting is visible (as a fallback)
            const inlineStyles = document.createElement('style');
            inlineStyles.textContent = `
              .mastodon-comment-replies {
                margin-left: 10px !important;
                border-left: 1px solid rgba(128, 128, 128, 0.3) !important;
                padding-left: 8px !important;
              }
              .mastodon-comment-replies .mastodon-comment {
                margin-top: 8px !important;
              }
            `;
            document.head.appendChild(inlineStyles);
            
          } else {
            commentsList.innerHTML = "<p>No comments found. I'd love to hear from you!</p>";
          }
        })
        .catch(function(error) {
          commentsList.innerHTML = "<p>Error loading comments. Please try again later.</p>";
          console.error("Error fetching comments:", error);
        });
    }
  }
});