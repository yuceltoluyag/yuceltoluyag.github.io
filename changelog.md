# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.1] - 2026-05-08
### Fixed
- **CI/CD:** Resolved `locale.Error: unsupported locale setting` in GitHub Actions and `act` by standardizing Linux-compatible locale names (`tr_TR.UTF-8`, `en_US.UTF-8`) in `pelicanconf.py`.
- **Plugins:** Improved `pelican_redirect` plugin robustness with a better locale-aware initialization fallback.
- **Documentation:** Fixed broken absolute file paths and outdated build process references in `README.md`.

### Changed
- **Workflow:** Added English language pack installation and `en_US` locale generation to `pelican.yml`.
- **Local Dev:** Updated `README.md` to prioritize `duty` commands over legacy `make` commands.


## [2.3.0] - 2026-05-08 20:21
### Added
- **Dependency Management:** Created `pipupdate.py` for automated Python dependency upgrades, featuring venv-aware execution and `requirements.txt` sanitization.
- **Documentation:** Implemented a granular, 900+ commit-backed historical `changelog.md`. Added `Tema.md` for theme structure and `translaterules.md` for translation guidelines.
- **Content & Translations:** Integrated multiple new English article translations (AnyDesk, ntsync, Jekyll blog, etc.) and standardized sub-directory routing.
- **Theme Assets:** Added new `AliBaba` theme templates, localized message catalogs (`.po`/`.mo`), and updated SVG icon sprites.

## [2.2.0] - 2026-05-03
### Added
- **Pelican Core:** Upgraded to **Pelican 4.12.0** for enhanced site generation performance.
- **Dependency Maintenance:** Updated `markdown`, `nltk`, `beautifulsoup4`, `lxml`, and `pyyaml` via automated Dependabot workflows.
- **Workflow Security:** Enabled hidden files upload and corrected indentation in GitHub Pages deployment workflow.
- **Theme Assets:** Updated `postcss`, `tar`, `yaml`, and `minimatch` within the Minel theme.

## [2.1.0] - 2025-11-23
### Added
- **Social Web Federation:**
  - Integrated **Federated Comments** (Mastodon/ActivityPub) with Mastodon-based reply support.
  - Implemented **Bridgy Fed** configuration for cross-platform interaction.
  - Added **atproto-did** for Bluesky identity verification.
  - Configured **WebFinger** and **host-meta** for decentralized discovery.
- **SEO & Automation:**
  - Implemented **Author SEO** and standardized article status reporting.
  - Added multi-language SEO-friendly meta descriptions for categories and tags.
  - Added canonical link support to the redirect template.

### Fixed
- **Security:** Resolved DOM-based XSS vulnerabilities and client-side scripting alerts in the comment system.
- **UX:** Modernized footnote styles and improved mobile responsiveness for footer and article pages.
- **Deployment:** Resolved persistent `.well-known` path 404 errors on GitHub Pages through `.nojekyll` and rsync path updates.

## [2.0.0] - 2025-03-10
### Added
- **Core Engine Migration:**
  - **Major Transition:** Migrated from **Jekyll** to **Pelican**.
  - Integrated **uv** for deterministic Python environment and dependency management.
  - Implemented `duties.py` for automated task execution.
- **SEO & Search Indexing:**
  - Integrated **Google Indexing API** and **Bing IndexNow** for real-time indexing.
  - Implemented automated sitemap generation with `lxml`.
- **Theme & Performance:**
  - Integrated **LightningCSS** for high-performance CSS bundling and minification.
  - Implemented **Lazy Loading** for all media assets.
  - Modernized categories and tags pages with enhanced grid layouts.
  - Added integrated **TOC sidebar** with animations and toggle functionality.
- **Security:**
  - Integrated **CodeQL** analysis for automated vulnerability scanning in CI/CD.

## [1.5.0] - 2024-07-27
### Added
- **Asset Pipeline:** Upgraded to **Gulp 5.0** and modernized the entire build process.
- **Media Optimization:** Added support for **AVIF** and **WebP** image formats.
- **UX:** Added a dedicated **Scroll Progress Bar** and redesigned the "Back to Top" functionality.
- **SEO:** Optimized robots.txt and humans.txt for better bot crawling and author attribution.

## [1.1.0] - 2022-11-21
### Added
- **Core Experience:** Redesigned "About" and "Donation" pages.
- **Functionality:** Added copy-to-clipboard buttons for code blocks and vertical timeline for archives.
- **CMS:** Integrated and then migrated from Forestry.io configuration.

## [1.0.0] - 2022-01-27
### Added
- Initial project release using **Jekyll**.
- Base **Minel** theme implementation.
- Basic RSS and blog functionality.

---
*Generated based on 919 commits of project history.*
