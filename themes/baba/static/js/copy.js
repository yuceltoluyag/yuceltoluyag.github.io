document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure all content is loaded and rendered
    setTimeout(() => {
        const highlights = document.querySelectorAll('.highlight');
        const copyButton = document.querySelector('script[src*="copy.js"]');
        const copyText = copyButton?.dataset.copy || 'Copy';
        const copiedText = copyButton?.dataset.copied || 'Copied!';

        highlights.forEach(highlight => {
            const codeElement = highlight.querySelector('code');
            if (!codeElement) return;

            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = copyText;
            highlight.appendChild(copyButton);

            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeElement.innerText).then(() => {
                    copyButton.textContent = copiedText;
                    setTimeout(() => {
                        copyButton.textContent = copyText;
                    }, 2000);
                });
            });

            // Add expand/collapse functionality for long code blocks
            // Check if the code block height exceeds our threshold
            // Force reflow to ensure scrollHeight is calculated correctly
            const actualHeight = highlight.scrollHeight;
            
            if (actualHeight > 300) {
                // Mark this highlight as long for CSS to handle
                highlight.classList.add('long-highlight');
                
                // Add expand button
                const expandButton = document.createElement('button');
                expandButton.className = 'code-expand-btn';
                expandButton.textContent = 'Devamını Göster';
                highlight.appendChild(expandButton);

                expandButton.addEventListener('click', () => {
                    highlight.classList.toggle('expanded');
                    expandButton.textContent = highlight.classList.contains('expanded') ? 
                        'Kısalt' : 'Devamını Göster';
                });
            }
        });

        // Add functionality for social share copy button
        const socialCopyButton = document.querySelector('#copy-url-btn');
        if (socialCopyButton) {
            socialCopyButton.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalHTML = socialCopyButton.innerHTML;
                    socialCopyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                    socialCopyButton.classList.add('copied');
                    
                    setTimeout(() => {
                        socialCopyButton.innerHTML = originalHTML;
                        socialCopyButton.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy URL: ', err);
                });
            });
        }
    }, 100); // 100ms delay to ensure content is loaded
});