document.addEventListener('DOMContentLoaded', function () {
  const progressBar = document.getElementById('progress-bar');
  let ticking = false;

  const updateProgressBar = () => {
    // Sayfanın toplam yüksekliği
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Mevcut scroll pozisyonu
    const scrollPosition = window.pageYOffset;

    // İlerleme yüzdesini hesapla (0-1 arası)
    const scrollPercentage = Math.min(scrollPosition / totalHeight, 1);

    // Progress bar'ı güncelle
    progressBar.style.transform = `scaleX(${scrollPercentage})`;
    progressBar.style.opacity = scrollPosition > 50 ? '1' : '0';

    ticking = false;
  };

  // Scroll event listener
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgressBar);
      ticking = true;
    }
  }, { passive: true });

  // Sayfa yüklendiğinde ilk pozisyonu ayarla
  updateProgressBar();

  // Sayfa içeriği değiştiğinde (resimler yüklendiğinde vb.) tekrar hesapla
  window.addEventListener('load', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
}); 