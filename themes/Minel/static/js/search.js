function toggleSearch() {
    // Arama modalını göster/gizle
    const searchModal = document.getElementById("search-modal");
    if (!searchModal) {
        createSearchModal();
    } else {
        searchModal.classList.toggle("hidden");
        if (!searchModal.classList.contains("hidden")) {
            setTimeout(() => {
                searchModal.querySelector("input").focus();
            }, 100);
        }
    }
}

function createSearchModal() {
    // Arama modalını oluştur
    const modal = document.createElement("div");
    modal.id = "search-modal";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm";

    // Modal dışına tıklamayı dinle
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            toggleSearch();
        }
    });

    modal.innerHTML = `
    <div class="bg-site-card w-full max-w-2xl rounded-lg shadow-lg p-6 transform transition-all" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Ara</h3>
        <button onclick="toggleSearch()" class="text-text-secondary hover:text-primary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="relative mb-4">
        <input
          id="search-input"
          type="search"
          placeholder="Aramak istediğiniz kelimeyi yazın..."
          class="w-full px-4 py-2 bg-site-card-alt rounded-lg border border-border-card focus:outline-none focus:border-primary"
        />
      </div>
      <div id="search-results" class="mt-4 max-h-[60vh] overflow-y-auto">
        <div class="text-center text-text-secondary py-8">
          Arama yapmak için yukarıdaki kutuya bir şeyler yazın
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(modal);

    // Arama inputunu dinle
    const searchInput = modal.querySelector("#search-input");
    const searchResults = modal.querySelector("#search-results");

    // Modal görünür olduğunda input'a odaklan
    setTimeout(() => {
        searchInput.focus();
    }, 100);

    // Debounce fonksiyonu
    let debounceTimeout;

    searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length < 2) {
                searchResults.innerHTML = `
          <div class="text-center text-text-secondary py-8">
            En az 2 karakter girin
          </div>
        `;
                return;
            }

            performSearch(query, searchResults);
        }, 300);
    });

    // ESC tuşunu dinle
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            toggleSearch();
        }
    });
}

// Arama işlemi
async function performSearch(query, resultsContainer) {
    resultsContainer.innerHTML = `
    <div class="text-center text-text-secondary py-8">
      <svg class="animate-spin h-8 w-8 mx-auto mb-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Aranıyor...
    </div>
  `;

    try {
        // Arama indeksini yükle
        const siteUrl = document.querySelector('meta[name="siteurl"]').getAttribute("content");
        const feedUrl = `${siteUrl}/feed.json`;
        console.log("Feed URL:", feedUrl);

        let feedData;
        try {
            // Önce localStorage'dan yüklemeyi dene
            const cachedFeed = localStorage.getItem("feedData");
            if (cachedFeed) {
                try {
                    feedData = JSON.parse(cachedFeed);
                    console.log("Cache'den yüklendi:", feedData);
                } catch (parseError) {
                    console.error("Cache parse hatası:", parseError);
                    throw new Error("Cache parse hatası");
                }
            } else {
                throw new Error("Cache miss");
            }
        } catch (e) {
            // Cache yoksa veya geçersizse, fetch ile al
            console.log("Cache bulunamadı, fetch ile alınıyor...");
            const response = await fetch(feedUrl);
            if (!response.ok) {
                throw new Error(`Feed verisi yüklenemedi: ${response.status} ${response.statusText}`);
            }

            const responseText = await response.text();
            console.log("Alınan ham veri:", responseText.substring(0, 200) + "...");

            try {
                feedData = JSON.parse(responseText);
                console.log("Feed verisi yüklendi:", feedData);

                // Cache'e kaydet
                try {
                    localStorage.setItem("feedData", responseText);
                } catch (cacheError) {
                    console.warn("Feed verisi cache'e kaydedilemedi", cacheError);
                }
            } catch (jsonError) {
                console.error("JSON parse hatası:", jsonError);
                console.error("Hatalı JSON:", responseText.substring(0, 500) + "...");
                throw new Error(`JSON parse hatası: ${jsonError.message}`);
            }
        }

        // Arama yap
        console.log("Arama yapılıyor:", query);
        const results = searchInFeed(query, feedData);
        console.log("Arama sonuçları:", results);

        // Sonuçları göster
        if (results.length === 0) {
            resultsContainer.innerHTML = `
        <div class="text-center text-text-secondary py-8">
          "${query}" için sonuç bulunamadı
        </div>
      `;
        } else {
            resultsContainer.innerHTML = `
        <div class="mb-4 text-sm text-text-secondary">
          "${query}" için ${results.length} sonuç bulundu
        </div>
        <div class="space-y-4">
          ${results
              .map(
                  (result) => `
            <a href="${
                result.url
            }" class="block p-4 rounded-lg border border-border-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:bg-site-card-alt">
              <h4 class="text-lg font-semibold mb-1 text-primary">${highlightText(result.title, query)}</h4>
              
              <div class="flex flex-wrap items-center gap-2 mb-2 text-sm">
                <span class="text-text-secondary">${formatDate(result.date_published)}</span>
                
                ${
                    result.category
                        ? `
                <span class="text-text-secondary">•</span>
                <span class="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  ${result.category}
                </span>
                `
                        : ""
                }
                
                ${
                    result.tags && result.tags.length > 0
                        ? `
                <span class="text-text-secondary">•</span>
                <div class="flex flex-wrap gap-1">
                  ${result.tags
                      .slice(0, 3)
                      .map(
                          (tag) => `
                    <span class="px-2 py-0.5 rounded-full bg-site-card-alt text-text-secondary text-xs">
                      ${tag}
                    </span>
                  `
                      )
                      .join("")}
                  ${
                      result.tags.length > 3
                          ? `<span class="text-text-secondary text-xs">+${result.tags.length - 3}</span>`
                          : ""
                  }
                </div>
                `
                        : ""
                }
              </div>
              
              <p class="text-text-secondary line-clamp-2">${highlightText(result.summary, query)}</p>
            </a>
          `
              )
              .join("")}
        </div>
      `;
        }
    } catch (error) {
        console.error("Arama hatası:", error);
        resultsContainer.innerHTML = `
      <div class="text-center text-red-500 py-8">
        Arama yapılırken bir hata oluştu: ${error.message}
      </div>
    `;
    }
}

// Feed verilerinde arama yap
function searchInFeed(query, feedData) {
    try {
        query = query.toLowerCase();
        const queryTerms = query.split(/\s+/).filter((term) => term.length > 0);

        if (!feedData || !feedData.items || !Array.isArray(feedData.items)) {
            console.error("Feed verisi geçersiz format:", feedData);
            return [];
        }

        return feedData.items
            .filter((item) => {
                try {
                    const title = item.title ? item.title.toLowerCase() : "";
                    const content = item.content_html ? item.content_html.toLowerCase() : "";
                    const summary = item.summary ? item.summary.toLowerCase() : "";
                    const category = item.category ? item.category.toLowerCase() : "";
                    const tags = item.tags ? item.tags.join(" ").toLowerCase() : "";

                    // Her terimin en az birinde geçmesi gerekiyor
                    return queryTerms.every(
                        (term) =>
                            title.includes(term) ||
                            content.includes(term) ||
                            summary.includes(term) ||
                            category.includes(term) ||
                            tags.includes(term)
                    );
                } catch (itemError) {
                    console.error("Öğe işlenirken hata:", itemError, item);
                    return false;
                }
            })
            .sort((a, b) => {
                // Başlıkta geçenler önce
                const aInTitle = queryTerms.some((term) => a.title.toLowerCase().includes(term));
                const bInTitle = queryTerms.some((term) => b.title.toLowerCase().includes(term));

                if (aInTitle && !bInTitle) return -1;
                if (!aInTitle && bInTitle) return 1;

                // Sonra kategoride geçenler
                const aInCategory = a.category && queryTerms.some((term) => a.category.toLowerCase().includes(term));
                const bInCategory = b.category && queryTerms.some((term) => b.category.toLowerCase().includes(term));

                if (aInCategory && !bInCategory) return -1;
                if (!aInCategory && bInCategory) return 1;

                // Sonra etiketlerde geçenler
                const aInTags =
                    a.tags && a.tags.some((tag) => queryTerms.some((term) => tag.toLowerCase().includes(term)));
                const bInTags =
                    b.tags && b.tags.some((tag) => queryTerms.some((term) => tag.toLowerCase().includes(term)));

                if (aInTags && !bInTags) return -1;
                if (!aInTags && bInTags) return 1;

                // Sonra tarihe göre sırala
                return new Date(b.date_published) - new Date(a.date_published);
            })
            .slice(0, 20); // En fazla 20 sonuç
    } catch (error) {
        console.error("Arama işlemi sırasında hata:", error);
        return [];
    }
}

// Metinde arama terimini vurgula
function highlightText(text, query) {
    if (!text) return "";

    const queryTerms = query
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 0);
    let result = text;

    queryTerms.forEach((term) => {
        const regex = new RegExp(`(${term})`, "gi");
        result = result.replace(regex, '<span class="bg-primary/20 text-primary font-medium">$1</span>');
    });

    return result;
}

// Tarihi formatla
function formatDate(dateStr) {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
