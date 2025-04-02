document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("back-to-top");
    let lastScrollTop = 0;

    const updateBackToTop = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Scroll yönünü kontrol et
        const isScrollingDown = scrollTop > lastScrollTop;

        // 200px'den fazla scroll yapıldıysa butonu göster
        if (scrollTop > 200) {
            backToTop.classList.remove("-translate-y-2", "opacity-0");
            backToTop.classList.add("translate-y-0", "opacity-100");

            // Aşağı scroll yaparken butonu hafifçe küçült
            if (isScrollingDown) {
                backToTop.classList.add("scale-90");
            } else {
                backToTop.classList.remove("scale-90");
            }
        } else {
            backToTop.classList.add("-translate-y-2", "opacity-0");
            backToTop.classList.remove("translate-y-0", "opacity-100");
        }

        lastScrollTop = scrollTop;
    };

    // Yukarı git butonuna tıklandığında
    backToTop.addEventListener("click", (e) => {
        e.preventDefault();

        // Smooth scroll animasyonu
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Scroll event listener
    window.addEventListener(
        "scroll",
        () => {
            requestAnimationFrame(updateBackToTop);
        },
        { passive: true }
    );
});
