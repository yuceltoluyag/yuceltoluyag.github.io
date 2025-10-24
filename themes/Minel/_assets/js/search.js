/**
 * Arama fonksiyonalitesi
 */


// HTML escaping utility to prevent XSS
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
}

// Arama verileri ve index için global değişkenler
let searchData = [];
let searchIndex = null;

// DOM elementleri
const searchModal = document.getElementById("search-modal");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchTriggers = document.querySelectorAll(".search-trigger");
const searchModalClose = document.querySelector(".btn-circle[aria-label='Aramayı kapat']");

// Hata ayıklama - Geliştirme ortamı kontrolü
const isDebugMode =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.includes("192.168.");

// Global debugLog fonksiyonunu kullan veya yoksa oluştur
const debugLog =
    window.debugLog ||
    function (message, ...args) {
        if (isDebugMode) {
            console.log(message, ...args);
        }
    };

// Başlangıçta debug bilgilerini göster
debugLog("Search.js yükleniyor");
debugLog("Search modal element:", searchModal);
debugLog("Search triggers:", searchTriggers.length);
debugLog("Search modal close button:", searchModalClose);

// Arama verilerini yükle
async function loadSearchData() {
    try {
        const response = await fetch("/search.json");
        if (!response.ok) {
            throw new Error("Arama verileri yüklenemedi");
        }
        searchData = await response.json();
        // Arama verileri önbelleğe alınabilir
        initSearchIndex();
    } catch (error) {
        // Hata durumunda sessizce devam et
        debugLog("Arama verileri yükleme hatası:", error);
    }
}

// Arama indeksini başlat
function initSearchIndex() {
    // Sonraki aramaları hızlandırmak için veri önişleme
    searchData.forEach((item) => {
        // Arama için gereken alanları küçük harfe çevir
        item._searchTitle = item.title?.toLowerCase() || "";
        item._searchCategory = item.category?.toLowerCase() || "";
        item._searchTags = item.tags?.join(" ").toLowerCase() || "";
    });
}

// Arama modalını aç
function openSearchModal() {
    debugLog("Modalı açma girişimi");
    if (!searchModal) {
        if (isDebugMode) {
            console.error("Search modal bulunamadı!");
        }
        return;
    }

    debugLog("Modal açılıyor:", searchModal);
    // DaisyUI v4 dialog elementini kullan
    searchModal.showModal();

    setTimeout(() => {
        if (searchInput) {
            searchInput.focus();
        }
    }, 100);
}

// Arama modalını kapat
function closeSearchModal() {
    debugLog("Modalı kapatma girişimi");
    if (!searchModal) {
        if (isDebugMode) {
            console.error("Search modal bulunamadı!");
        }
        return;
    }

    debugLog("Modal kapatılıyor");
    // DaisyUI v4 dialog elementini kapat
    searchModal.close();

    if (searchInput) {
        searchInput.value = "";
    }

    if (searchResults) {
        searchResults.innerHTML = "";
    }
}

// Arama gecikmesi için değişken
let searchTimeout = null;

// Arama işlemi
function performSearch(query) {
    // Boş sorgu kontrolü
    if (!query.trim()) {
        searchResults.innerHTML = '<p class="text-center text-base-content/60 py-8">Arama sorgusu giriniz</p>';
        return;
    }

    // Optimize edilmiş arama
    const queryLower = query.toLowerCase();

    // Arama algoritması - önişlenmiş verileri kullan
    const results = searchData.filter((item) => {
        return (
            item._searchTitle.includes(queryLower) ||
            item._searchCategory.includes(queryLower) ||
            item._searchTags.includes(queryLower)
        );
    });

    // Sonuçları görüntüle
    displayResults(results, query);
}

// Sonuçları göster
function displayResults(results, query) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
        searchResults.innerHTML = `<p class="text-center text-base-content/60 py-8">"${escapeHTML(query)}" için sonuç bulunamadı</p>`;
        return;
    }

    const resultsFragment = document.createDocumentFragment();
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "space-y-4";

    results.forEach((result) => {
        const resultItem = document.createElement("article");
        resultItem.className = "card bg-base-200 hover:shadow-md transition-all duration-200";

        // Sonuç içeriği oluştur
        const date = new Date(result.date);
        const formattedDate = date.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        // URL yolunu düzgün şekilde oluştur
        const baseUrl = window.location.origin;
        // URL'nin ana siteye göre olduğundan emin ol
        let resultUrl = result.url;

        // Eğer URL / ile başlamıyorsa, başına ekle
        if (!resultUrl.startsWith("/")) {
            resultUrl = "/" + resultUrl;
        }

        // Tam URL'yi oluştur
        const fullUrl = baseUrl + resultUrl;

        resultItem.innerHTML = `
            <div class="card-body p-4">
                <h3 class="font-bold text-xl mb-1">
                    <a href="${fullUrl}" class="hover:text-primary transition-colors result-link">${highlightText(
            result.title,
            query
        )}</a>
                </h3>
                <div class="flex flex-wrap gap-2 text-sm text-base-content/70 mb-2">
                    <span class="flex items-center gap-1">
                        <span class="iconify" data-icon="tabler:calendar" width="16" height="16"></span>
                        ${formattedDate}
                    </span>
                    ${
                        result.category
                            ? `<span class="flex items-center gap-1">
                        <span class="iconify" data-icon="tabler:folder" width="16" height="16"></span>
                        ${result.category}
                    </span>`
                            : ""
                    }
                </div>
                ${
                    result.tags && result.tags.length > 0
                        ? `<div class="flex flex-wrap gap-1 mt-2">
                        ${result.tags.map((tag) => `<span class="badge badge-sm badge-outline">${tag}</span>`).join("")}
                    </div>`
                        : ""
                }
            </div>
        `;

        resultsContainer.appendChild(resultItem);
    });

    resultsFragment.appendChild(resultsContainer);
    searchResults.appendChild(resultsFragment);

    // Arama sonuç linkleri için olay dinleyicileri ekle
    addResultLinksEventListeners();
}

// Sonuç linklerine tıklayınca modalı kapat
function addResultLinksEventListeners() {
    const resultLinks = document.querySelectorAll(".result-link");
    resultLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            // Modalı kapat
            closeSearchModal();

            // Normal link davranışı devam etsin, sayfaya gitsin
            // e.preventDefault(); yapmıyoruz, doğal link davranışı korunsun
        });
    });
}

// Metinde sorgu terimini vurgula
function highlightText(text, query) {
    if (!text) return "";

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return text.replace(regex, "<mark class='bg-primary/20 text-primary px-1 rounded-xs'>$1</mark>");
}

// Regex için özel karakterleri escape et
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Olay dinleyicileri
document.addEventListener("DOMContentLoaded", () => {
    debugLog("Search DOM yüklendi");

    // DOM elementlerini tekrar kontrol et
    debugLog("Search modal (DOMContentLoaded içinde):", document.getElementById("search-modal"));
    debugLog("Search triggers (DOMContentLoaded içinde):", document.querySelectorAll(".search-trigger").length);

    // Arama verilerini yükle
    loadSearchData();

    // Arama butonları
    searchTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            debugLog("Arama tetiği tıklandı");
            e.preventDefault();
            openSearchModal();
        });
    });

    // Kapat butonu - DaisyUI v4 ile dialog kullandığımız için artık gerekli değil
    // Bu fonksiyonlar dialog elementi tarafından otomatik olarak yönetiliyor

    // Form gönderimi
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            debugLog("Form gönderildi");
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }

    // Debounce ile anlık arama
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 200); // 200ms gecikme ekle
        });
    }
});
