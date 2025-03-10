// Navbar işlemleri
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  const parallaxBg = document.querySelector('.parallax-bg');

  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('bg-site-card-95', 'backdrop-blur-sm', 'border-b', 'border-border-card');
          } else {
            if (window.location.pathname === '/') {
              navbar.classList.remove('bg-site-card-95', 'backdrop-blur-sm', 'border-b', 'border-border-card');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
};

// Sayfa geçişleri
const initPageTransitions = () => {
  const links = document.querySelectorAll('a[href^="/"]');
  links.forEach(link => {
    link.addEventListener('click', e => {
      if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(() => {
          window.location.href = e.currentTarget.href;
        }, 300);
      }
    });
  });
};

// Lazy loading
const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPageTransitions();
  initLazyLoading();
}); 