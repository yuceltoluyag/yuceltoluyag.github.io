// Global utilities
window.debugLog = (module, message) => {
  console.log(`[${module}] ${message}`);
};

// Global site ayarları
window.SITE_CONFIG = {
  SITEURL: document.querySelector('meta[name="siteurl"]').getAttribute('content'),
  THEME_STATIC_DIR: document.querySelector('meta[name="theme-static-dir"]').getAttribute('content'),
  IS_HOMEPAGE: document.querySelector('meta[name="is-homepage"]').getAttribute('content') === 'true'
};

// Tema değiştirme fonksiyonu
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  // Tema değiştir
  if (isDark) {
    html.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    html.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

// Navbar scroll efekti
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            navbar.classList.add('bg-site-card-95', 'backdrop-blur-sm', 'border-b', 'border-border-card');
          } else {
            if (window.SITE_CONFIG.IS_HOMEPAGE) {
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

// Sayfa geçiş efektleri
const initPageTransitions = () => {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.href.startsWith(window.location.origin) && !e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = link.href;
      }, 300);
    }
  });
};

// Sayfa yüklendiğinde tema ayarını kontrol et
document.addEventListener('DOMContentLoaded', () => {
  // Sistem temasını veya localStorage'daki tercihi kontrol et
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}); 