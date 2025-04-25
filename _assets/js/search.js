/**
 * Arama fonksiyonalitesi
 */

// Arama verileri ve index için global değişkenler
let searchData = [];
let searchIndex = null;

// DOM elementleri
const searchModal = document.getElementById("search-modal");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const searchTriggers = document.querySelectorAll(".search-trigger");
const searchModalClose = document.querySelector(".search-modal-close");

// Arama verilerini yükle
async function loadSearchData() {
    try {
        const response = await fetch("/search.json");
        if (!response.ok) {
            throw new Error("Arama verileri yüklenemedi");
        }
        searchData = await response.json();
        console.log("Arama verileri yüklendi:", searchData.length + " öğe");
    } catch (error) {
        console.error("Arama verilerini yükleme hatası:", error);
    }
}

// Arama modalını aç
function openSearchModal() {
    searchModal.classList.add("show");
    document.body.classList.add("search-modal-open");
    setTimeout(() => {
        searchInput.focus();
    }, 100);
}

// Arama modalını kapat
function closeSearchModal() {
    searchModal.classList.remove("show");
    document.body.classList.remove("search-modal-open");
    searchInput.value = "";
    searchResults.innerHTML = "";
}

// Modalın dışına tıklandığında kapat
function handleOutsideClick(event) {
    if (event.target === searchModal) {
        closeSearchModal();
    }
}

// Arama işlemi
function performSearch(query) {
    // Boş sorgu kontrolü
    if (!query.trim()) {
        searchResults.innerHTML = '<p class="search-no-results">Arama sorgusu giriniz</p>';
        return;
    }

    // Arama algoritması
    const results = searchData.filter((item) => {
        // Başlıklarda, kategorilerde ve etiketlerde ara
        const searchableTitle = item.title.toLowerCase();
        const searchableCategory = (item.category || "").toLowerCase();
        const searchableTags = (item.tags || []).join(" ").toLowerCase();

        const queryLower = query.toLowerCase();

        return (
            searchableTitle.includes(queryLower) ||
            searchableCategory.includes(queryLower) ||
            searchableTags.includes(queryLower)
        );
    });

    // Sonuçları görüntüle
    displayResults(results, query);
}

// Sonuçları göster
function displayResults(results, query) {
    searchResults.innerHTML = "";

    if (results.length === 0) {
        searchResults.innerHTML = `<p class="search-no-results">"${query}" için sonuç bulunamadı</p>`;
        return;
    }

    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results-container";

    results.forEach((result) => {
        const resultItem = document.createElement("article");
        resultItem.className = "search-result-item";

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
            <h3 class="search-result-title">
                <a href="${fullUrl}" class="search-result-link">${highlightText(result.title, query)}</a>
            </h3>
            <div class="search-result-meta">
                <span class="search-result-date">${formattedDate}</span>
                ${result.category ? `<span class="search-result-category">${result.category}</span>` : ""}
            </div>
            ${
                result.tags && result.tags.length > 0
                    ? `<div class="search-result-tags">
                    ${result.tags.map((tag) => `<span class="search-result-tag">${tag}</span>`).join("")}
                </div>`
                    : ""
            }
        `;

        resultsContainer.appendChild(resultItem);
    });

    searchResults.appendChild(resultsContainer);
}

// Metinde sorgu terimini vurgula
function highlightText(text, query) {
    if (!text) return "";

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

// Regex için özel karakterleri escape et
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Olay dinleyicileri
document.addEventListener("DOMContentLoaded", () => {
    // Arama verilerini yükle
    loadSearchData();

    // Arama butonları
    searchTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openSearchModal();
        });
    });

    // Kapat butonu
    if (searchModalClose) {
        searchModalClose.addEventListener("click", closeSearchModal);
    }

    // Modalın dışına tıklama
    searchModal.addEventListener("click", handleOutsideClick);

    // Form gönderimi
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        performSearch(searchInput.value);
    });

    // Anlık arama
    searchInput.addEventListener("input", (e) => {
        performSearch(e.target.value);
    });

    // ESC tuşu ile kapatma
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchModal.classList.contains("show")) {
            closeSearchModal();
        }
    });
});
