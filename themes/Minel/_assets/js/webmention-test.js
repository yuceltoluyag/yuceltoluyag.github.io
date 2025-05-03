// Webmention.io API test aracı
(function () {
    // Token ve API endpoint
    const apiToken = "-WNw5YpxvCMIj8LDM0bScg";
    const apiEndpoint = `https://webmention.io/api/mentions.jf2?token=${apiToken}&per-page=20`;

    console.log("Webmention API Test Aracı");
    console.log("-------------------------");
    console.log("API Endpoint:", apiEndpoint);

    // DOM elementlerini oluştur
    function createTestUI() {
        // Test container oluştur
        const container = document.createElement("div");
        container.className =
            "fixed bottom-5 right-5 w-11/12 max-w-md max-h-[80vh] overflow-y-auto bg-base-100 rounded-lg shadow-xl p-5 z-50";

        // URL düzenleme fonksiyonu
        function formatTestUrl(url) {
            if (url.includes("localhost:8000")) {
                return url.replace("http://localhost:8000", "https://yuceltoluyag.dev");
            }
            return url;
        }

        // Başlık
        const title = document.createElement("h3");
        title.textContent = "Webmention Test Aracı";
        title.className = "text-lg font-semibold mb-4 pb-2 border-b border-base-200 text-primary";
        container.appendChild(title);

        // URL giriş alanı
        const inputWrapper = document.createElement("div");
        inputWrapper.className = "mb-5";

        const urlLabel = document.createElement("label");
        urlLabel.textContent = "Test edilecek URL:";
        urlLabel.className = "block mb-2 text-sm font-medium opacity-70";
        inputWrapper.appendChild(urlLabel);

        const urlInput = document.createElement("input");
        urlInput.type = "text";
        urlInput.value = formatTestUrl(window.location.href.split("#")[0].split("?")[0]);
        urlInput.className = "input input-bordered w-full mb-3";
        inputWrapper.appendChild(urlInput);

        // URL bilgi metni
        const urlInfo = document.createElement("div");
        urlInfo.className = "mb-4 text-xs opacity-70";
        if (window.location.href.includes("localhost")) {
            urlInfo.innerHTML = `
                <div class="alert alert-warning alert-xs p-2">
                    <div>
                        <iconify-icon icon="tabler:info-circle" class="mr-1"></iconify-icon>
                        <span>Localhost ortamında test yapıyorsunuz. URL otomatik olarak production adresine çevrildi.</span>
                    </div>
                </div>
                <div class="mt-1 text-xs">Production URL: <span class="text-primary">${formatTestUrl(
                    window.location.href
                )}</span></div>
            `;
        }
        inputWrapper.appendChild(urlInfo);

        // Buton konteyner
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "flex gap-2 flex-wrap mb-5";

        // Butonlar
        const testButton = document.createElement("button");
        testButton.textContent = "Bu URL için Göster";
        testButton.className = "btn btn-primary btn-sm flex-1";
        buttonContainer.appendChild(testButton);

        const allButton = document.createElement("button");
        allButton.textContent = "Tüm Webmention'lar";
        allButton.className = "btn btn-success btn-sm flex-1";
        buttonContainer.appendChild(allButton);

        inputWrapper.appendChild(buttonContainer);
        container.appendChild(inputWrapper);

        // Sonuçlar alanı
        const resultsContainer = document.createElement("div");
        resultsContainer.className = "bg-base-200 rounded-md p-3 max-h-[50vh] overflow-y-auto";
        container.appendChild(resultsContainer);

        // Kapatma butonu
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.className =
            "btn btn-circle btn-ghost btn-xs absolute right-2 top-2 opacity-70 hover:bg-error hover:text-white";
        closeButton.addEventListener("click", () => container.remove());
        container.appendChild(closeButton);

        // Event listeners
        testButton.addEventListener("click", () => {
            fetchWebmentions(urlInput.value, resultsContainer);
        });

        allButton.addEventListener("click", () => {
            fetchAllWebmentions(resultsContainer);
        });

        document.body.appendChild(container);
    }

    // Belirli URL için webmention'ları getir
    function fetchWebmentions(url, resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-8 text-center">
                <div class="relative w-16 h-16 mb-4">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <iconify-icon icon="tabler:messages" width="32" height="32" class="text-primary"></iconify-icon>
                    </div>
                    <svg class="animate-spin-slow absolute inset-0 w-16 h-16" viewBox="0 0 100 100">
                        <circle class="opacity-25" cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none"></circle>
                        <circle class="text-primary" cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none" stroke-dasharray="60 160"></circle>
                    </svg>
                </div>
                <p class="text-primary font-medium mb-1">Webmention'lar Yükleniyor</p>
                <p class="text-xs opacity-70">Lütfen bekleyin...</p>
            </div>
        `;

        const endpoint = `https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(url)}&token=${apiToken}`;

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data, resultsContainer);
            })
            .catch((error) => {
                resultsContainer.innerHTML = `
                    <div class="alert alert-error shadow-sm">
                        <div class="flex gap-2 items-center">
                            <iconify-icon icon="tabler:alert-triangle" width="24" height="24" class="animate-pulse"></iconify-icon>
                            <div>
                                <div class="font-medium">İşlem Başarısız</div>
                                <div class="text-xs opacity-80">Hata: ${error.message}</div>
                            </div>
                        </div>
                    </div>
                `;
                console.error("Webmention API hatası:", error);
            });
    }

    // Tüm webmention'ları getir
    function fetchAllWebmentions(resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center p-8 text-center">
                <div class="relative w-16 h-16 mb-4">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <iconify-icon icon="tabler:messages" width="32" height="32" class="text-primary"></iconify-icon>
                    </div>
                    <svg class="animate-spin-slow absolute inset-0 w-16 h-16" viewBox="0 0 100 100">
                        <circle class="opacity-25" cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none"></circle>
                        <circle class="text-primary" cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="none" stroke-dasharray="60 160"></circle>
                    </svg>
                </div>
                <p class="text-primary font-medium mb-1">Tüm Webmention'lar Yükleniyor</p>
                <p class="text-xs opacity-70">Lütfen bekleyin...</p>
            </div>
        `;

        fetch(apiEndpoint)
            .then((response) => response.json())
            .then((data) => {
                displayResults(data, resultsContainer);
            })
            .catch((error) => {
                resultsContainer.innerHTML = `
                    <div class="alert alert-error shadow-sm">
                        <div class="flex gap-2 items-center">
                            <iconify-icon icon="tabler:alert-triangle" width="24" height="24" class="animate-pulse"></iconify-icon>
                            <div>
                                <div class="font-medium">İşlem Başarısız</div>
                                <div class="text-xs opacity-80">Hata: ${error.message}</div>
                            </div>
                        </div>
                    </div>
                `;
                console.error("Webmention API hatası:", error);
            });
    }

    // Sonuçları göster
    function displayResults(data, resultsContainer) {
        if (!data.children || data.children.length === 0) {
            resultsContainer.innerHTML = `
                <div class="card bg-base-200 shadow-sm p-5 relative overflow-hidden">
                    <div class="flex items-center gap-4">
                        <div class="text-primary bg-primary/10 p-3 rounded-full animate-pulse">
                            <iconify-icon icon="tabler:message-circle-off" width="28" height="28"></iconify-icon>
                        </div>
                        <div>
                            <div class="font-medium text-lg">Hiç webmention bulunamadı</div>
                            <div class="text-xs opacity-70">
                                Webmention göndermek için bu sayfaya bağlantı veren bir blog yazısı yayınlayın.
                            </div>
                        </div>
                    </div>
                    <div class="absolute -bottom-2 -right-2 opacity-10 transform rotate-12">
                        <iconify-icon icon="tabler:message-circle-2" width="32" height="32" class="inline-block"></iconify-icon>
                    </div>
                    <div class="absolute bottom-6 right-6 opacity-5 transform -rotate-12">
                        <iconify-icon icon="tabler:message-dots" width="24" height="24" class="inline-block"></iconify-icon>
                    </div>
                </div>
            `;
            return;
        }

        const mentions = data.children;

        let html = `
            <div class="alert alert-info mb-4">
                <div class="flex items-center gap-2">
                    <div class="animate-bounce">
                        <iconify-icon icon="tabler:confetti" class="mr-2" width="20" height="20"></iconify-icon>
                    </div>
                    <span class="font-medium">${mentions.length} webmention bulundu</span>
                </div>
            </div>
            <div class="space-y-4">
        `;

        mentions.forEach((mention) => {
            html += `
                <div class="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <div class="card-body p-4">
                        <div class="flex items-center gap-3">
                            ${
                                mention.author && mention.author.photo
                                    ? `
                                    <div class="avatar">
                                        <div class="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="${mention.author.photo}" alt="${mention.author.name || "Yazar"}">
                                        </div>
                                    </div>`
                                    : `
                                    <div class="avatar placeholder">
                                        <div class="w-10 h-10 rounded-full bg-primary text-primary-content">
                                            <iconify-icon icon="tabler:user" class="w-6 h-6"></iconify-icon>
                                        </div>
                                    </div>`
                            }
                            <div class="flex-1">
                                ${
                                    mention.author && mention.author.name
                                        ? `<div class="font-medium">${mention.author.name}</div>`
                                        : `<div class="font-medium">Anonim</div>`
                                }
                                ${
                                    mention.published
                                        ? `<div class="text-xs opacity-60">${new Date(mention.published).toLocaleString(
                                              "tr-TR",
                                              {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                              }
                                          )}</div>`
                                        : ``
                                }
                            </div>
                        </div>
                        ${
                            mention.content && mention.content.text
                                ? `<div class="mt-3 p-3 bg-base-200 rounded-md text-sm">${mention.content.text}</div>`
                                : ``
                        }
                        <div class="flex justify-between items-center mt-2 text-xs">
                            <a href="${
                                mention.url
                            }" target="_blank" class="btn btn-xs btn-ghost gap-1 hover:bg-primary/10">
                                <iconify-icon icon="tabler:external-link" class="text-primary"></iconify-icon> Kaynağa git
                            </a>
                            <div class="opacity-60 flex items-center gap-1">
                                <iconify-icon icon="tabler:link"></iconify-icon>
                                ${mention.target.split("//")[1].split("/")[0]}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;

        resultsContainer.innerHTML = html;

        // Animasyon stil tanımı
        const style = document.createElement("style");
        style.textContent = `
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: .7; }
            }
            .animate-pulse {
                animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-25%); }
            }
            .animate-bounce {
                animation: bounce 1s ease-in-out infinite;
            }
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
                animation: spin-slow 3s linear infinite;
            }
        `;
        document.head.appendChild(style);
    }

    // Sayfaya eklenmesi için bir bağlantı oluştur
    function createTestLauncher() {
        const launcher = document.createElement("div");
        launcher.className = "fixed bottom-5 right-5 z-50";

        const button = document.createElement("button");
        button.className = "btn btn-primary btn-sm gap-2 shadow-md";
        button.innerHTML =
            '<iconify-icon icon="tabler:messages" width="18" height="18"></iconify-icon> Webmention Test';

        launcher.appendChild(button);

        button.addEventListener("click", () => {
            launcher.remove();
            createTestUI();
        });

        document.body.appendChild(launcher);
    }

    // Sayfa tamamen yüklendikten sonra test aracını başlat
    window.addEventListener("load", createTestLauncher);
})();
