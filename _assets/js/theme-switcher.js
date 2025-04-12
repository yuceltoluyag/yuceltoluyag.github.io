// Gelişmiş tema geçişi için JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // DOM elemanlarını seç
    const html = document.documentElement;
    const themeSwitch = document.getElementById("theme-switch");
    const themeLabel = document.getElementById("theme-mode-label");

    // Sayfa yüklendiğinde mevcut temayı kontrol et
    if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        html.classList.add("dark");
        if (themeSwitch) themeSwitch.checked = true;
        if (themeLabel) themeLabel.textContent = "Karanlık";
    } else {
        html.classList.remove("dark");
        if (themeSwitch) themeSwitch.checked = false;
        if (themeLabel) themeLabel.textContent = "Aydınlık";
    }

    // Tema animasyon elemanını oluştur
    const themeAnimation = document.createElement("div");
    themeAnimation.className = "theme-switch-animation";
    document.body.appendChild(themeAnimation);

    // Tema değiştirme işlevi
    function toggleTheme(event) {
        // Tıklama konumunu al (animasyon için)
        let x, y;
        if (event) {
            x = event.clientX || window.innerWidth / 2;
            y = event.clientY || window.innerHeight / 2;
        } else {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
        }

        // Animasyon için CSS değişkenlerini ayarla
        themeAnimation.style.setProperty("--x", `${x}px`);
        themeAnimation.style.setProperty("--y", `${y}px`);

        // Animasyonu başlat
        themeAnimation.classList.add("animate");

        // Mevcut temayı kontrol et ve değiştir
        const isDark = html.classList.contains("dark");

        setTimeout(() => {
            if (isDark) {
                html.classList.remove("dark");
                localStorage.theme = "light";
                if (themeLabel) themeLabel.textContent = "Aydınlık";
            } else {
                html.classList.add("dark");
                localStorage.theme = "dark";
                if (themeLabel) themeLabel.textContent = "Karanlık";
            }
        }, 300); // Tema geçişini animasyonla eşleştir

        // Animasyonu temizle
        setTimeout(() => {
            themeAnimation.classList.remove("animate");
        }, 1500);
    }

    // Tema değiştirme düğmesini dinle
    if (themeSwitch) {
        themeSwitch.addEventListener("change", toggleTheme);
    }

    // Eski tema düğmesini de dinle (uyumluluk için)
    const oldThemeToggle = document.getElementById("theme-toggle");
    if (oldThemeToggle) {
        oldThemeToggle.addEventListener("click", toggleTheme);
    }

    // Global toggleTheme fonksiyonu tanımla
    window.toggleTheme = toggleTheme;
});
