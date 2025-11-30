# My Personal Blog & Pelican Theme

Welcome to the repository for my personal blog, built with [Pelican](https://docs.getpelican.com/en/latest/). This project not only hosts my content but also features a custom theme I designed, named **Minel**.

The live site is hosted on GitHub Pages and is available at [yuceltoluyag.github.io](https://yuceltoluyag.github.io).

---

## ✨ Features

The custom **Minel** theme is built with responsiveness and user experience in mind, using [Pico.css](https://picocss.com/) as a lightweight foundation.

### Content & SEO
- **Full i18n Support**: Utilizes Pelican's `i18n_subsites` for complete multi-language capabilities (Turkish & English).
- **SEO Optimized**: Advanced meta tags and structured data for better search engine visibility.
- **Related Posts**: Suggests similar articles to keep readers engaged.
- **Article Statistics**: Displays word count and estimated reading time for each article.

### User Experience
- **Responsive Design**: Mobile-first design that looks great on all devices.
- **Dark/Light Mode**: A theme switcher allows users to choose their preferred mode.
- **Search**: Built-in, client-side search functionality.
- **Code Highlighting**: Syntax highlighting for code blocks using Pygments.
- **Social Sharing**: Easily share articles on various social media platforms.
- **Table of Contents (TOC)**: Automatically generated, collapsible TOC for long-form articles.
- **Reading Progress Bar**: A visual indicator of reading progress on articles.
- **Back to Top Button**: Smoothly scroll back to the top of the page.

### Integrations
- **Google Indexing Tool**: Integrates with [Google Indexing Tool](https://github.com/yuceltoluyag/google-indexing-tool) for efficient content indexing.
- **Image Responsive**: Uses [Image Responsive](https://github.com/yuceltoluyag/image-responsive) for optimized image delivery.
- **Markdown IG Story**: Leverages [Markdown IG Story](https://github.com/yuceltoluyag/markdown-ig-story) for creating engaging content.

---

## 🚀 Getting Started

To run this project locally, you will need `make` and a container engine like [Podman](https://podman.io/) or [Docker](https://www.docker.com/).

1.  **Build the Container Image:**
    This command will build the container image that runs the Pelican development server.
    ```bash
    make build
    ```

2.  **Run the Container:**
    This command starts the container and serves the site.
    ```bash
    make run
    ```
    You can now view the site at **[http://localhost:8000](http://localhost:8000)**. The server will automatically reload when you make changes to the content or theme.

3.  **Create a New Post:**
    Use the following command to scaffold a new article using a template.
    ```bash
    make post
    ```

---

## 🎨 Asset Management

This project uses [LightningCSS](https://lightningcss.dev/) to bundle and minify CSS files for optimal performance.

### Setup
First, install the necessary CLI tool via `npm`:
```bash
npm install lightningcss-cli
```

### Usage
The bundling process is a two-step procedure:

1.  **Combine CSS Files:**
    Concatenate all source CSS files into a single `combined.css` file.
    ```bash
    cat themes/baba/static/css/pico.indigo.min.css \
        themes/baba/static/css/gruvbox-light.css \
        themes/baba/static/css/custom.css \
        themes/baba/static/css/footnotes.css \
        themes/baba/static/css/modern-styles.css \
        themes/baba/static/css/pygments.css \
        themes/baba/static/css/copy.css \
        themes/baba/static/css/toc.css \
        themes/baba/static/css/language-switcher.css \
        themes/baba/static/css/social-share.css \
        themes/baba/static/css/back-to-top.css \
        themes/baba/static/css/donate.css \
        themes/baba/static/css/tags.css \
        themes/baba/static/css/video.css \
        themes/baba/static/css/scroll-progress.css \
        themes/baba/static/css/webmentions.css \
        themes/baba/static/css/author.css \
        themes/baba/static/css/unified-comments.css \
        themes/baba/static/css/footer.css > themes/baba/static/css/combined.css
    ```

2.  **Minify the Bundle:**
    Use LightningCSS to minify the combined file into the final `bundle.min.css`.
    ```bash
    npx lightningcss-cli --minify themes/baba/static/css/combined.css -o themes/baba/static/css/bundle.min.css
    ```
This process should be run whenever you make changes to the source CSS files.