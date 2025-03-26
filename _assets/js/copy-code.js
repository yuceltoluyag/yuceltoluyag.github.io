document.addEventListener("DOMContentLoaded", function () {
    // Halihazırda işlenmiş kod bloklarını izlemek için
    const processedBlocks = new Set();

    // Tüm kod bloklarını bul
    const codeBlocks = document.querySelectorAll(".highlight");

    if (codeBlocks.length === 0) return;

    codeBlocks.forEach(function (block) {
        // Eğer blok daha önce işlendiyse atla
        if (processedBlocks.has(block)) return;
        processedBlocks.add(block);

        // Kod bloğunu wrapper ile sarmala
        const wrapper = document.createElement("div");
        wrapper.className = "code-block-wrapper";

        // Eğer halihazırda bir wrapper içinde değilse sarmalama işlemi yap
        if (!block.parentNode.classList.contains("code-block-wrapper")) {
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
        } else {
            // Halihazırda bir wrapper içindeyse, işlemi atla
            return;
        }

        // Pre elementini bul
        const preElement = block.querySelector("pre");
        if (!preElement) return;

        // Kopyalama butonu oluştur
        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyButton.title = "Kodu kopyala";
        wrapper.appendChild(copyButton);

        // Kodun uzunluğunu kontrol et, belirli bir satırdan fazlaysa daralt ve genişlet düğmesi ekle
        const codeElement = preElement.querySelector("code");
        if (codeElement) {
            const codeText = codeElement.textContent || "";
            const linesCount = codeText.split("\n").length;
            const MAX_VISIBLE_LINES = 10; // Görünür satır sayısı
            const MIN_LINES_TO_COLLAPSE = 50; // En az kaç satır olunca daraltılacak

            if (linesCount > MIN_LINES_TO_COLLAPSE) {
                // Code bloğuna yükseklik sınırı ekle (başlangıçta daraltılmış)
                preElement.style.maxHeight = `${MAX_VISIBLE_LINES * 1.5}em`;
                preElement.style.overflow = "hidden";

                // Wrapper'a collapsed sınıfını ekle (gölge efekti için)
                wrapper.classList.add("collapsed");

                // Genişlet/daralt düğmesi ekle (eğer daha önce eklenmemişse)
                if (!wrapper.querySelector(".code-toggle-button")) {
                    const toggleButton = document.createElement("button");
                    toggleButton.className = "code-toggle-button";
                    toggleButton.textContent = `Tamamını göster (${linesCount} satır)`;
                    toggleButton.setAttribute("aria-expanded", "false");
                    wrapper.appendChild(toggleButton);

                    // Genişlet/daralt düğmesi işlevi
                    toggleButton.addEventListener("click", function () {
                        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

                        if (isExpanded) {
                            // Daralt
                            preElement.style.maxHeight = `${MAX_VISIBLE_LINES * 1.5}em`;
                            toggleButton.textContent = `Tamamını göster (${linesCount} satır)`;
                            toggleButton.setAttribute("aria-expanded", "false");
                            wrapper.classList.add("collapsed");
                        } else {
                            // Genişlet
                            preElement.style.maxHeight = "none";
                            toggleButton.textContent = "Daralt";
                            toggleButton.setAttribute("aria-expanded", "true");
                            wrapper.classList.remove("collapsed");
                        }
                    });
                }
            }
        }

        // Kopyalama işlevi
        copyButton.addEventListener("click", function () {
            // Kod metnini al
            const code = block.querySelector("code");
            let text = "";

            if (code) {
                text = code.textContent;
            }

            // Metni panoya kopyala
            navigator.clipboard
                .writeText(text)
                .then(function () {
                    // Kopyalama başarılı olduğunda butonu güncelle
                    copyButton.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    copyButton.classList.add("copied");

                    // 2 saniye sonra butonu eski haline getir
                    setTimeout(function () {
                        copyButton.innerHTML =
                            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                        copyButton.classList.remove("copied");
                    }, 2000);
                })
                .catch(function (error) {
                    console.error("Kopyalama hatası:", error);
                });
        });
    });

    // Varsa çift butonları temizle
    document.querySelectorAll(".code-block-wrapper > .code-block-wrapper").forEach(function (nestedWrapper) {
        // İç wrapper'ın içindeki tüm öğeleri dış wrapper'a taşı ve iç wrapper'ı kaldır
        const parentWrapper = nestedWrapper.parentNode;
        while (nestedWrapper.firstChild) {
            parentWrapper.appendChild(nestedWrapper.firstChild);
        }
        parentWrapper.removeChild(nestedWrapper);
    });

    // Çift kopyalama butonlarını temizle
    document.querySelectorAll(".code-block-wrapper").forEach(function (wrapper) {
        const copyButtons = wrapper.querySelectorAll(".copy-button");
        if (copyButtons.length > 1) {
            // İlk buton dışındakileri kaldır
            for (let i = 1; i < copyButtons.length; i++) {
                copyButtons[i].remove();
            }
        }
    });
});
