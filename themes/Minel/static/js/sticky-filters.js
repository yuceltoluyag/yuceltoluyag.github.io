document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const filters = document.getElementById('category-filters');
  let lastScrollY = window.scrollY;
  let ticking = false;

  if (navbar && filters) {
    const updateFiltersPosition = () => {
      const navbarHeight = navbar.offsetHeight;
      const currentScrollY = window.scrollY;

      // Navbar yüksekliğine göre sticky pozisyonu güncelle
      filters.style.top = `${navbarHeight}px`;

      // Scroll yönüne göre opaklığı ayarla
      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        filters.style.opacity = '0.95';
      } else {
        filters.style.opacity = '1';
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    // Scroll performansı için requestAnimationFrame kullan
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateFiltersPosition);
        ticking = true;
      }
    };

    // İlk yüklemede pozisyonu ayarla
    updateFiltersPosition();

    // Event listener'ları ekle
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateFiltersPosition);
  }
}); 