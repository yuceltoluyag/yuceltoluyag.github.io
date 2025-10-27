# Project Overview

This is a personal blog built with [Pelican](https://docs.getpelican.com/en/latest/), a static site generator written in Python. The site is hosted on GitHub Pages.

The theme is custom-designed and uses [pico.css](https://picocss.com/) and [font-awesome](https://fontawesome.com/).

The project uses a `Makefile` and a `Justfile` to automate common tasks. It also has a `duties.py` file that defines a set of tasks for the project, such as building, cleaning, and publishing the site.

Python dependencies are managed with `pip` and are listed in `requirements.txt`. Node.js is used for CSS bundling and minification with `lightningcss-cli`.

---

# Building and Running

## Local Development

To run the site locally, you can use either `make` or `just`. These commands utilize a containerized environment (Podman or Docker) to serve the website.

- **Run the development server:**
  ```bash
  make run
  # or
  just run
  ```

This will start a development server at `http://localhost:8000`.

- **Create a new post:**

  ```bash
  make post
  # or
  just post
  ```

  This script will prompt you for a title, summary, category, and tags, and then create a new Markdown file in the `content/articles` directory.

## Building for Production

- **Publish the site:**

  ```bash
  make publish-docs
  ```

  This command, found in the `Makefile`, generates the static files for production using the `publishconf.py` settings.

---

# CSS Management

The project uses `lightningcss-cli` to bundle and minify CSS files.

- **Bundle and minify CSS:**

  ```bash
  # Combine CSS files
  cat themes/baba/static/css/pico.indigo.min.css \
      themes/baba/static/css/custom.css \
      themes/baba/static/css/modern-styles.css \
      themes/baba/static/css/pygments.css \
      themes/baba/static/css/copy.css \
      themes/baba/static/css/toc.css > themes/baba/static/css/combined.css

  # Minify the combined CSS
  npx lightningcss-cli --minify themes/baba/static/css/combined.css -o themes/baba/static/css/bundle.min.css

  # Remove the combined file (optional)
  rm themes/baba/static/css/combined.css
  ```

---

# AI-Assisted CSS Refactoring

This project includes an AI-assisted process to modularize large CSS files without changing their functionality or breaking the cascade order.

## Purpose

The goal is to split a large monolithic CSS file (over 3000 lines) into logical modules, while:

- Preserving cascade and specificity.
- Keeping all selectors, properties, and comments intact.
- Using modern native CSS features (`:root` variables, `@layer`, `@container`, nesting, etc.).
- Avoiding any SCSS or syntax transformation.
- Maintaining compatibility with `lightningcss-cli` and the existing Pelican theme structure.

## AI Instructions

The following prompt guides the AI in performing a **safe and structured CSS split**:

> You are given a single CSS file (~3326 lines).
> Split it into smaller modular files **without altering or renaming any selectors, properties, or comments**.
> Preserve cascade order and dependency relationships between rules.
>
> **Rules:**
>
> 1. Do not edit, rename, or reformat any code.
> 2. Maintain the correct execution order — dependent rules must remain together or appear later in the sequence.
> 3. Keep modern CSS features intact (`@layer`, `@container`, `@supports`, `:root`, custom properties, etc.).
> 4. Organize output files logically (examples below).
> 5. Validate final CSS with `stylelint` to ensure no syntax errors or missing dependencies.
> 6. If unsure where to place a rule, keep it in its original order and mark it as “unmoved” in comments.

### Example file structure:

```
themes/baba/static/css/
├── 00-variables.css      # :root variables, theme colors
├── 01-fonts.css          # @font-face definitions
├── 02-base.css           # resets, typography, base elements
├── 03-layout.css         # grid, container, and layout rules
├── 04-components/
│   ├── buttons.css
│   ├── nav.css
│   ├── cards.css
│   └── forms.css
├── 05-utils.css          # helper classes (.u-, .is-, etc.)
├── 06-responsive.css     # global @media queries
├── 07-keyframes.css      # animations
```

### Validation

After splitting, run:

```bash
npx stylelint "themes/baba/static/css/**/*.css"
```

to confirm that the modularized files contain no syntax or cascade issues.

---

# Development Conventions

- **Content:** Blog posts are written in Markdown and stored in `content/articles`. Pages are in `content/pages`.
- **Configuration:** Main configuration lives in `pelicanconf.py`, with production overrides in `publishconf.py`.
- **Task Automation:** Project tasks are managed in `duties.py` using the `duty` library.
- **Post Creation:** Use `make post` or `just post` for consistent post templates.
- **CSS Refactoring:** The `gemini.md` file defines AI instructions for modularizing large CSS files without altering functionality.

---
