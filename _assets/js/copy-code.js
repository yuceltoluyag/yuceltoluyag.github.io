document.addEventListener("DOMContentLoaded", function () {
    // Tüm kod bloklarını bul
    const codeBlocks = document.querySelectorAll(".highlight");

    codeBlocks.forEach(function (block) {
        // Kopyalama butonu oluştur
        const copyButton = document.createElement("button");
        copyButton.className = "copy-button";
        copyButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        copyButton.title = "Kopyala";

        // Butonu kod bloğuna ekle
        block.appendChild(copyButton);

        // Kopyalama işlevi
        copyButton.addEventListener("click", function () {
            // Kod metnini al
            const code = block.querySelector("code");
            const text = code.innerText;

            // Metni panoya kopyala
            navigator.clipboard
                .writeText(text)
                .then(function () {
                    // Kopyalama başarılı olduğunda butonu güncelle
                    copyButton.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    copyButton.classList.add("copied");

                    // Kopyalandı bildirimi göster
                    const notification = document.createElement("div");
                    notification.className = "copy-notification";
                    notification.textContent = "Kopyalandı!";
                    block.appendChild(notification);

                    // 2 saniye sonra butonu ve bildirimi eski haline getir
                    setTimeout(function () {
                        copyButton.innerHTML =
                            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                        copyButton.classList.remove("copied");
                        notification.remove();
                    }, 2000);
                })
                .catch(function (error) {
                    console.error("Kopyalama hatası:", error);
                });
        });
    });
});
