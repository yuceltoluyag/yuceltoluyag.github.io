document.addEventListener('DOMContentLoaded', () => {
    const highlights = document.querySelectorAll('.highlight');
    const copyButton = document.querySelector('script[src*="copy.js"]');
    const copyText = copyButton.dataset.copy || 'Copy';
    const copiedText = copyButton.dataset.copied || 'Copied!';

    highlights.forEach(highlight => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = copyText;
        highlight.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            const code = highlight.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = copiedText;
                setTimeout(() => {
                    copyButton.textContent = copyText;
                }, 2000);
            });
        });
    });
});