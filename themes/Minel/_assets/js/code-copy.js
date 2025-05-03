/**
 * Kod Kopyalama İşlevi
 * DaisyUI'nin mockup-code bileşeniyle uyumlu kod bloğu stillemesi
 */
document.addEventListener("DOMContentLoaded", function () {
    // Tüm kod bloklarını seç
    const codeBlocks = document.querySelectorAll(
        '.highlight pre, .mockup-code, pre[data-lang], pre[class*="language-"]'
    );

    // Her kod bloğunu düzenle
    codeBlocks.forEach((block) => {
        // Dil etiketini düzenle ve kopyalama butonu ekle
        setupCodeBlock(block);
    });

    /**
     * Kod bloğunu düzenle
     * @param {HTMLElement} element - Kod bloğu elementi
     */
    function setupCodeBlock(element) {
        // Etiket düzenlemesi
        const langAttr = getLang(element);
        if (langAttr && !element.hasAttribute("data-lang")) {
            element.setAttribute("data-lang", langAttr.toUpperCase());
        }

        // Kopyalama butonu ekle (yoksa)
        if (!element.querySelector(".btn-copy")) {
            addCopyButton(element);
        }

        // Style niteliğini tamamen kaldır - bu işi CSS yapacak
        element.removeAttribute("style");
    }

    /**
     * Dil bilgisini al
     * @param {HTMLElement} element - Kod bloğu elementi
     * @returns {string} - Dil bilgisi
     */
    function getLang(element) {
        // Zaten tanımlı data-lang varsa onu kullan
        if (element.hasAttribute("data-lang")) {
            return element.getAttribute("data-lang");
        }

        // Sınıflardan dil bilgisini çıkarmaya çalış
        const codeElement = element.querySelector("code");
        const classes = codeElement ? codeElement.className : element.className;

        const langMatch = classes.match(/language-(\w+)/);
        if (langMatch && langMatch[1]) {
            return langMatch[1];
        }

        // Ebeveynden almaya çalış
        const highlightParent = element.closest(".highlight");
        if (highlightParent) {
            const filenameElem = highlightParent.querySelector(".filename");
            if (filenameElem) {
                return filenameElem.textContent.trim();
            }
        }

        // Varsayılan olarak "BASH" döndür
        return "BASH";
    }

    /**
     * Kopyalama butonu ekle
     * @param {HTMLElement} element - Kod bloğu elementi
     */
    function addCopyButton(element) {
        const copyButton = document.createElement("button");
        // Daha belirgin bir kopyalama butonu
        copyButton.className = "btn-copy"; // CSS'te daha detaylı stillendirilecek
        copyButton.setAttribute("type", "button");
        copyButton.setAttribute("aria-label", "Kodu kopyala");
        copyButton.setAttribute("role", "button");
        copyButton.setAttribute("title", "Kodu kopyala");

        // Iconify-icon elementini kullan - daha büyük boyutta
        copyButton.innerHTML = '<iconify-icon icon="tabler:copy" width="20" height="20"></iconify-icon>';

        // Butonu elemana ekle
        element.appendChild(copyButton);

        // Kopyalama işlevselliği ekle
        copyButton.addEventListener("click", async function () {
            try {
                // Kod içeriğini al
                const codeElement = element.querySelector("code") || element;
                const text = codeElement.textContent.trim();

                // Kopyala
                await navigator.clipboard.writeText(text);

                // Başarılı gösterge
                this.classList.add("copied");
                this.innerHTML = '<iconify-icon icon="tabler:check" width="20" height="20"></iconify-icon>';

                // 2 saniye sonra sıfırla
                setTimeout(() => {
                    this.classList.remove("copied");
                    this.innerHTML = '<iconify-icon icon="tabler:copy" width="20" height="20"></iconify-icon>';
                }, 2000);
            } catch (err) {
                console.error("Kopyalama hatası:", err);
            }
        });
    }
});
