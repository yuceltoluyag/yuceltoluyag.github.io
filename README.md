# My Personal Blog & Pelican Theme

Welcome to the repository for my personal blog, built with [Pelican](https://docs.getpelican.com/en/latest/). This project features a custom-built, premium theme named **AliBaba**.

The live site is hosted on GitHub Pages and is available at [yuceltoluyag.github.io](https://yuceltoluyag.github.io).

---

## ✨ Features

The **AliBaba** theme is a state-of-the-art, high-performance theme built from the ground up using **Vanilla CSS**. It avoids heavy frameworks in favor of modern CSS features like CSS Grid, Flexbox, and advanced selectors for maximum speed and flexibility.

### Content & SEO
- **Full i18n Support**: Complete multi-language capabilities (Turkish & English) powered by `i18n_subsites`.
- **SEO Optimized**: Advanced meta tags, structured data (JSON-LD), and semantic HTML5 for superior search engine visibility.
- **Related Posts**: AI-driven suggestions to keep readers engaged.
- **Article Statistics**: Real-time word count and estimated reading time calculation.

### User Experience
- **Premium Aesthetics**: Vibrant colors, sleek dark mode, and smooth glassmorphism effects.
- **Dynamic Interactions**: Micro-animations and hover effects that make the interface feel alive.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **Search**: Blazing fast, client-side search functionality.
- **Code Highlighting**: Professional syntax highlighting for developers.
- **Table of Contents (TOC)**: Automatically generated, smart TOC for deep dives.

### Technical Stack
- **Core**: Pelican (Python 3.12)
- **Styling**: Vanilla CSS (no-framework approach)
- **Automation**: GitHub Actions (CI/CD) with custom locale support.
- **Optimization**: WebP image delivery and CSS bundling.

---

## 🚀 Getting Started

To run this project locally, you will need `Python 3.12+` and `make`.

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/yuceltoluyag/yuceltoluyag.github.io.git
    cd yuceltoluyag.github.io
    pip install -r requirements.txt
    ```

2.  **Run Development Server:**
    ```bash
    make dev
    ```
    View the site at **[http://localhost:8000](http://localhost:8000)**.

3.  **Create a New Post:**
    ```bash
    make post
    ```

---

## 📚 Documentation & History

For more detailed information about the theme architecture and project evolution:

- **Theme Details**: [Tema.md](file:///c:/Users/baba/Desktop/Work/yuceltoluyag.github.io/Tema.md) - Deep dive into AliBaba's design system.
- **Changelog**: [changelog.md](file:///c:/Users/baba/Desktop/Work/yuceltoluyag.github.io/changelog.md) - Full version history and release notes.
- **Translation Rules**: [translaterules.md](file:///c:/Users/baba/Desktop/Work/yuceltoluyag.github.io/translaterules.md) - Guidelines for localized content.

---

## 🎨 Asset Management

CSS management is handled natively to ensure zero dependencies on external builders where possible, prioritizing performance and maintainability.

- **Source CSS**: Located in `themes/baba/static/css/`
- **Build Process**: Managed via `Makefile` for deployment.