# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.6] - 2026-06-25
### Added
- **Content & Translations:** Added a step-by-step crDroid Custom ROM installation guide for the Redmi Note 12 Pro 5G (`ruby/rubyx`), including critical warnings about baseband spoofing and IMEI/EFS restoration on imported devices.
- **Content:** Added new articles on AI authorship policy, Git file ignoring levels, Nginx reverse proxy, Docker Node.js container security, Bash /dev/tcp HTTP requests, using Nvidia VRAM as swap (nbd-vram), local AI, local coding assistants, VMware, Unbound, and Instagram bulk delete processes.
- **Translations:** Translated 6 missing Turkish articles to English and resolved language switcher relationships.

### Fixed
- **Security:** Enabled strict path validation (`ENFORCE=True`) for NLTK in the stats plugin (`plugins/baba_stats.py`) to block potential URL-encoded path traversal attacks.
- **SEO & Search Indexing:** Optimized crawler budget in `robots.txt` and updated article tags for the `google-indexing-tool` CLI.
- **Translations:** Fixed 404 rendering errors in English translations by correctly setting metadata attributes.

### Changed
- **Dependency Upgrades:** Bumped multiple dependencies including `lxml`, `shell-quote`, `tar`, `@babel/core`, and GitHub Actions checkout.


## [2.3.5] - 2026-05-18
### Added
- **Metadata:** Integrated `toot` (Mastodon) and `bluesky` social links in the front matter of numerous Turkish and English articles to enable direct social media references.
- **Git Config:** Added `social-share-humanity.md` to `.gitignore` to prevent temporary social sharing helper assets from being tracked.

### Changed
- **Content & Tone:** Extensively revised dozens of Turkish and English article files, rewriting dry technical sections into highly engaging, warm, and friendly conversational content ("humanity" rewrites) to build a better connection with readers.

## [2.3.4] - 2026-05-17 14:52
### Added
- **Content & Translations:** Added a new deep-dive troubleshooting article (`lutris-installed-file-impact-ttf-not-found-cozumu.md`) detailing the Lutris "impact.ttf not found" font error and return code 256 crash, along with its English translation under `content/articles/en/`.
- **Translations:** Fully translated 16 key Turkish articles into English under `content/articles/en/` with aligned slugs to maintain robust language switcher functionality.
- **Guidelines:** Documented strict multi-language metadata rules (requiring `Lang: tr` and `Translation: false` for originals, and `Lang: en` for translations) in `translaterules.md` to guarantee conflict-free site builds.
- **Media Assets:** Designed and generated responsive cover assets (WebP in xl, lg, md, sm sizes, and high-performance AVIF) for 16 articles, correctly mapping them in their respective metadata headers.
- **Git Config:** Added `.opencode` configuration directory to `.gitignore` to keep local development environments clean and secure.

### Fixed
- **Theme (AliBaba):** Fixed a duplicate Telegram sharing button in `article.html` template under the social sharing block.
- **Plugins (TOC):** Completely refactored `plugins/pelican-toc/toc.py` by converting collapsible `<button>` elements into consistent, accessible `<a>` anchors. Standardized class mappings (e.g. `toc-href h{}-btn`), integrated arrow icons, and stripped duplicate `#` and `¶` symbols from parsed header strings to ensure pristine TOC renders.
- **SEO & File Naming:** Resolved file system pathing issues and boosted SEO by converting non-ASCII Turkish characters in cover filenames (e.g. `rtx-4060-sıvı-metal.avif` -> `rtx-4060-sivi-metal.avif`).
- **Pelican Build:** Resolved a critical compilation path conflict (`FileOverwriteFailedError`) by explicitly declaring `Lang: tr` and `Translation: false` in `2025-veraset-intikal-vergisi-bilgilendirme.md`.
- **Verification:** Verified complete English translation coverage using automated script checks and achieved a flawless, clean production-ready Pelican build.

## [2.3.3] - 2026-05-10
### Added
- **Plugins:** Migrated from remote `pelican-sitemap` to a local, multi-language optimized version in `plugins/sitemap` to better handle TR/EN content relationships.
### Fixed
- **SEO:** Optimized `sitemap.xml` by excluding pagination pages (`/page/`) using refined regex patterns to improve crawl budget and indexing quality.
- **Plugins:** Resolved a critical `AttributeError: module 'plugins.sitemap' has no attribute 'register'` by implementing a proper `__init__.py` for the local sitemap plugin.
- **Sitemap:** Enhanced multi-language discovery by correctly linking Turkish and English article versions via `xhtml:link` (alternate) tags.

## [2.3.2] - 2026-05-09
### Added
- **SEO:** Implemented `hreflang` attributes in `metadata.html` to improve search engine discovery for multi-language content (Turkish and English).
- **SEO:** Added `x-default` support, pointing to the Turkish version as the primary fallback for search engines.
### Fixed
- **SEO:** Resolved a "double prefix" bug where English links were incorrectly generated as `/en/en/` by switching to standard Pelican `SITEURL` pathing.
- **UI/Accessibility:** Fixed low contrast issues in dark mode for `lang-switcher` and `mobile-header` by adjusting the dark mode color palette and component styles.
- **UI:** Extensively refined dark mode colors for headings (H1-H6) and text to provide a "low-glare" experience, using matte silver-grey tones (`#b8bec9`) for maximum visual comfort.
- **Security:** Resolved a DOM-based XSS vulnerability in the search functionality (CodeQL alert #18) by implementing HTML escaping for user-controlled input.

## [2.3.1] - 2026-05-08
### Fixed
- **CI/CD:** Resolved `locale.Error: unsupported locale setting` in GitHub Actions and `act` by standardizing Linux-compatible locale names (`tr_TR.UTF-8`, `en_US.UTF-8`) in `pelicanconf.py`.
- **Subsites:** Fixed a bug where English subsite links incorrectly pointed to `localhost:8080` by explicitly setting `SITEURL` and improving `PUBLISH` mode detection.
- **Plugins:** Improved `pelican_redirect` plugin robustness with a better locale-aware initialization fallback.
- **Ads:** Resolved AdSense `TagError: availableWidth=0` by ensuring ad containers have `width: 100%` and `min-height`.
- **Content:** Added a new deep-dive article about `act` (nektos/act) for local GitHub Actions testing.
- **Theme:** Fixed broken footer links for Privacy Policy and Terms of Use by updating slugs in `base.html`.
- **Documentation:** Restored and updated the Integrations section in `README.md` with repository links.
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
