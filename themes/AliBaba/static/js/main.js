/**
 * AliBaba Theme - Main JS
 * Includes: Theme Toggle, Search, Scroll Progress, Back to Top, and Mobile Menu
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Switcher ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    const html = document.documentElement;
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const themeText = document.querySelector('.theme-text');

    const updateThemeUI = (theme) => {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    };

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    themeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Circular expansion animation
        const x = e.clientX || window.innerWidth / 2;
        const y = e.clientY || window.innerHeight / 2;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        if (!document.startViewTransition) {
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
            return;
        }

        const transition = document.startViewTransition(() => {
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: newTheme === 'dark' ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: newTheme === 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
                }
            );
        });
    });

    // --- 2. Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress-bar');
    let ticking = false;
    let docHeight = 0;

    const calculateDocHeight = () => {
        docHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        ticking = false;
    };

    window.addEventListener('resize', calculateDocHeight);
    calculateDocHeight();

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
    
    updateProgress();

    // --- 3. Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    let bttTicking = false;

    window.addEventListener('scroll', () => {
        if (!bttTicking) {
            window.requestAnimationFrame(() => {
                const offset = window.pageYOffset || document.documentElement.scrollTop;
                if (offset > 400) {
                    backToTopBtn?.classList.add('show');
                } else {
                    backToTopBtn?.classList.remove('show');
                }
                bttTicking = false;
            });
            bttTicking = true;
        }
    }, { passive: true });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Mobile Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle?.addEventListener('click', () => sidebar.classList.toggle('active'));
    
    document.addEventListener('click', (e) => {
        if (sidebar?.classList.contains('active') && !sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // --- 5. Search Functionality ---
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchClose = document.querySelector('.search-modal-close');
    
    let searchData = [];
    let searchTimeout = null;

    const loadSearchData = async () => {
        try {
            const lang = html.lang || 'tr';
            const path = lang === 'tr' ? '/search.tr.json' : `/${lang}/search.${lang}.json`;
            const response = await fetch(path);
            if (response.ok) searchData = await response.json();
        } catch (err) { console.error('Search data load failed:', err); }
    };

    const openSearch = () => {
        searchModal?.classList.add('show');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput?.focus(), 100);
        if (searchData.length === 0) loadSearchData();
    };

    const closeSearch = () => {
        searchModal?.classList.remove('show');
        document.body.style.overflow = '';
    };

    searchTriggers.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openSearch(); }));
    searchClose?.addEventListener('click', closeSearch);
    searchModal?.addEventListener('click', (e) => { if (e.target === searchModal) closeSearch(); });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    });

    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                searchResults.innerHTML = '';
                return;
            }

            const results = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                (item.category && item.category.toLowerCase().includes(query)) ||
                (item.tags && item.tags.some(t => t.toLowerCase().includes(query)))
            );

            displaySearchResults(results, query);
        }, 250);
    });

    const displaySearchResults = (results, query) => {
        if (results.length === 0) {
            searchResults.innerHTML = '';
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = `${searchModal.dataset.searchNoResults} "${query}"`;
            searchResults.appendChild(noResults);
            return;
        }

        searchResults.innerHTML = results.map(item => `
            <article class="search-item">
                <a href="${item.url}">
                    <span class="search-item-cat">${item.category || ''}</span>
                    <h4 class="search-item-title">${highlight(item.title, query)}</h4>
                </a>
            </article>
        `).join('');
    };

    const highlight = (text, query) => {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    };

    // --- 6. Code Block Enhancements (Copy & Expand) ---
    const initCodeBlocks = () => {
        const highlights = document.querySelectorAll('.highlight');
        if (highlights.length === 0) return;

        const isTurkish = document.documentElement.lang === 'tr';
        const copyText = isTurkish ? 'Kopyala' : 'Copy';
        const copiedText = isTurkish ? 'Kopyalandı!' : 'Copied!';
        const expandText = isTurkish ? 'Devamını Göster' : 'Show More';
        const collapseText = isTurkish ? 'Kısalt' : 'Show Less';

        // Use requestIdleCallback or a very short timeout to avoid blocking main thread
        const process = () => {
            highlights.forEach(block => {
                // 1. Copy Button
                const code = block.querySelector('code');
                if (code && !block.querySelector('.copy-button')) {
                    const copyBtn = document.createElement('button');
                    copyBtn.className = 'copy-button';
                    copyBtn.textContent = copyText;
                    copyBtn.setAttribute('aria-label', copyText);
                    block.appendChild(copyBtn);

                    copyBtn.addEventListener('click', () => {
                        navigator.clipboard.writeText(code.innerText).then(() => {
                            copyBtn.textContent = copiedText;
                            copyBtn.classList.add('copied');
                            setTimeout(() => {
                                copyBtn.textContent = copyText;
                                copyBtn.classList.remove('copied');
                            }, 2000);
                        });
                    });
                }

                // 2. Expand/Collapse - Use a class for height check to avoid immediate scrollHeight read if possible
                // but if we must read it, do it in a way that minimizes impact
                if (block.offsetHeight > 400 && !block.querySelector('.code-expand-btn')) {
                    block.classList.add('long-highlight');
                    const expandBtn = document.createElement('button');
                    expandBtn.className = 'code-expand-btn';
                    expandBtn.textContent = expandText;
                    block.appendChild(expandBtn);

                    expandBtn.addEventListener('click', () => {
                        const isExpanded = block.classList.toggle('expanded');
                        expandBtn.textContent = isExpanded ? collapseText : expandText;
                        
                        if (!isExpanded) {
                            block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    });
                }
            });
        };

        if (window.requestIdleCallback) {
            window.requestIdleCallback(process);
        } else {
            setTimeout(process, 100);
        }
    };

    // Initialize code blocks
    initCodeBlocks();
});
