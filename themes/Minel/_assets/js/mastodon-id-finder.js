/**
 * Mastodon ID Finder - Mastodon toot URL'lerinden ID çıkarma aracı
 *
 * Bu script, yönetici panelinde toot URL'lerinden ID çıkarmak için kullanılır.
 */

(function () {
    // DOM yüklendiğinde çalıştır
    document.addEventListener("DOMContentLoaded", function () {
        // Zaten yüklüyse tekrar ekleme
        if (document.querySelector("#mastodon-id-finder")) return;

        // Metaboksa ekleyelim (Pelican admin paneli veya makale sayfasında)
        const metabox = document.querySelector("#mastodon-metabox");
        if (!metabox) return;

        // Mastodon ID Finder oluştur
        const idFinder = document.createElement("div");
        idFinder.id = "mastodon-id-finder";
        idFinder.className = "card bg-base-100 shadow-xs mt-4";
        idFinder.innerHTML = `
            <div class="card-body p-4">
                <h3 class="text-xl font-bold mb-3 flex items-center">
                    <iconify-icon icon="tabler:puzzle" class="mr-2"></iconify-icon>
                    Mastodon ID Bulucu
                </h3>
                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Mastodon URL'si</span>
                        </label>
                        <input type="text" id="mastodon-url-input" placeholder="https://mastodon.social/@user/123456789" class="input input-bordered w-full">
                    </div>
                    <div class="flex gap-2">
                        <button id="extract-mastodon-id" class="btn btn-primary flex-1">
                            <iconify-icon icon="tabler:code" class="mr-2"></iconify-icon>
                            ID Çıkar
                        </button>
                        <button id="copy-mastodon-id" class="btn btn-outline" disabled>
                            <iconify-icon icon="tabler:copy" class="mr-2"></iconify-icon>
                            Kopyala
                        </button>
                    </div>
                    <div id="mastodon-result" class="hidden">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Toot ID</span>
                            </label>
                            <input type="text" id="mastodon-id-result" readonly class="input input-bordered w-full bg-base-200">
                        </div>
                        <div class="form-control mt-2">
                            <label class="label">
                                <span class="label-text">Makale Meta Verisi İçin</span>
                            </label>
                            <input type="text" id="mastodon-meta-result" readonly class="input input-bordered w-full bg-base-200">
                        </div>
                    </div>
                </div>
            </div>
        `;

        metabox.appendChild(idFinder);

        // ID çıkartma butonuna olay ekle
        const extractButton = document.getElementById("extract-mastodon-id");
        const copyButton = document.getElementById("copy-mastodon-id");
        const urlInput = document.getElementById("mastodon-url-input");
        const resultDiv = document.getElementById("mastodon-result");
        const idResult = document.getElementById("mastodon-id-result");
        const metaResult = document.getElementById("mastodon-meta-result");

        extractButton.addEventListener("click", function () {
            const url = urlInput.value.trim();

            if (!url) {
                alert("Lütfen bir Mastodon URL'si girin");
                return;
            }

            try {
                // URL'yi parçala
                const urlObj = new URL(url);
                const pathParts = urlObj.pathname.split("/").filter(Boolean);

                // Mastodon URL formatını kontrol et (örn: /@user/123456789)
                if (pathParts.length < 2) {
                    throw new Error("Geçersiz Mastodon URL formatı");
                }

                // Son parça toot ID'sidir
                const tootId = pathParts[pathParts.length - 1];
                const user = pathParts[pathParts.length - 2].replace("@", "");
                const host = urlObj.hostname;

                // Sonuçları göster
                idResult.value = tootId;
                metaResult.value = `Mastodon_Link: ${url}`;
                resultDiv.classList.remove("hidden");
                copyButton.removeAttribute("disabled");
            } catch (error) {
                alert("Geçersiz URL: " + error.message);
            }
        });

        // Kopyalama butonuna olay ekle
        copyButton.addEventListener("click", function () {
            const textToCopy = metaResult.value;

            navigator.clipboard
                .writeText(textToCopy)
                .then(function () {
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<iconify-icon icon="tabler:check" class="mr-2"></iconify-icon> Kopyalandı!';

                    setTimeout(function () {
                        copyButton.innerHTML = originalText;
                    }, 2000);
                })
                .catch(function (err) {
                    alert("Kopyalama hatası: " + err);
                });
        });
    });
})();
