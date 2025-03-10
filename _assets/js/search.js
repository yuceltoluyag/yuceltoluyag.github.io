function toggleSearch() {
  // Arama modalını göster/gizle
  const searchModal = document.getElementById('search-modal');
  if (!searchModal) {
    createSearchModal();
  } else {
    searchModal.classList.toggle('hidden');
  }
}

function createSearchModal() {
  // Arama modalını oluştur
  const modal = document.createElement('div');
  modal.id = 'search-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm';

  // Modal dışına tıklamayı dinle
  modal.addEventListener('click', (e) => {
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
      <div class="relative">
        <input
          type="search"
          placeholder="Aramak istediğiniz kelimeyi yazın..."
          class="w-full px-4 py-2 bg-site-card-alt rounded-lg border border-border-card focus:outline-none focus:border-primary"
          autofocus
        />
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // ESC tuşunu dinle
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      toggleSearch();
    }
  });
} 