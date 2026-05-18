Title: Test Your Pelican Static Site with Playwright: Goodbye to Errors
Date: 2026-05-11 01:48
Category: Geliştirme Araçları
Tags: playwright, python, pelican, testing, static-site, uv
Slug: pelican-statik-site-playwright-test
Authors: yuceltoluyag
Summary: I explain how to put your static site produced with Pelican through automatic tests using Playwright and Python before taking it live.
Image: images/pelican-playwright-test-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/116592437621738522
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3i6th2h227
Status: published

In my previous [Playwright Arch Linux Installation](/en/playwright-arch-linux-kurulum/) post, I explained how to install this beast on our system. Now it's time to put that power into action to debug errors on our own blog (Pelican).

Creating a static site is easy, but as complex themes and JavaScript plugins increase, the fear of "did something break?" begins. Let's take a closer look at how we can automate testing of our Pelican site with the `uv` and `playwright` duo.

## 🛠️ Why Playwright? (Pelican Perspective)

When you compile your Pelican site with `pelican content -o output`, you are left with a bunch of HTML files. However:
1. Is your "Dark Mode" button working with JavaScript?
2. Is there a hidden `404` or `Uncaught TypeError` in the console?
3. Does that animation you love so much break during transitions between pages?

We can only understand these by programming a browser (headless browser).

## 📦 Preparing the Test Environment with uv

You're still not using standard `pip`, right? Let's set up the test environment in seconds with `uv`:

```bash
yuceltoluyag@archlinux:~$ uv add --dev pytest playwright
yuceltoluyag@archlinux:~$ uv run playwright install webkit
```

## 🧠 The Fixture That Catches Insidious Errors

This is the expert part of the job. We're not just looking at whether the page opened; we're setting up a "strict" test fixture that catches every error that drops into the console in the background. Let's bury this inside `tests/conftest.py`:

```python
import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser():
    with sync_playwright() as p:
        browser = p.webkit.launch()
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    context = browser.new_context()
    page = context.new_page()
    
    # Let's accumulate console errors
    errors = []
    page.on("pageerror", lambda exc: errors.append(exc))
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    
    yield page
    
    # Explode if there are errors when the test is done!
    assert not errors, f"JavaScript errors found on page: {errors}"
    context.close()
```

## 🧪 Basic and Advanced Test Scenarios

We will test the files in the `output` folder produced by Pelican directly using the `file:///` protocol. Here are a few "lifesaving" test examples:

### 1. Page Loading and Title Check
```python
from pathlib import Path
from urllib.request import pathname2url
from playwright.sync_api import expect

def test_home_page_loads(page):
    index_path = Path("output/index.html").absolute()
    page.goto(f"file://{pathname2url(str(index_path))}")
    expect(page).to_have_title("Yücel Toluyag")
```

### 2. Testing When JavaScript is Disabled (Expert Tip)
Your site should be readable even when JS is turned off. It's very easy to test this with Playwright:
```python
def test_no_js_fallback(browser):
    # Open a new context, turn off JS
    context = browser.new_context(java_script_enabled=False)
    page = context.new_page()
    
    page.goto(f"file://{pathname2url(str(Path('output/index.html').absolute()))}")
    
    # If you display an error message in <noscript>, check it
    # Or verify that the critical content is still there
    expect(page.get_by_text("Yücel Toluyag")).to_be_visible()
    context.close()
```

### 3. Redirect and Link Check
If you redirected an old page of yours to a new URL, you can verify whether it works correctly via the status code:
```python
def test_internal_redirect(page):
    response = page.goto("https://yuceltoluyag.com/eski-yazi/")
    assert response.status == 200
    assert response.url == "https://yuceltoluyag.com/yeni-yazi/"
```

### 4. Relational DOM Checks with XPath
Sometimes CSS selectors are not enough. For example, you can use XPath to select the button immediately next to or below a specific heading:
```python
def test_article_sibling_button(page):
    # Find the 'Read more' button immediately following the 'Articles' header
    button = page.locator("xpath=//h2[contains(text(), 'Makaleler')]/following-sibling::a[1]")
    expect(button).to_have_attribute("href", "/makaleler/")
```

## 🚀 Running the Tests

When you type this command from the terminal, Playwright secretly opens the browser, scans the site produced by Pelican, and reports to you if there is a JS error or a broken structure:

```bash
yuceltoluyag@archlinux:~$ uv run pytest tests/
```

### Why Are We Going to This Trouble?

Because static sites are not "simple." Especially if you are writing your own theme or using complex CSS/JS structures, you always have the risk of breaking the entire site structure when updating an article. With Playwright, we reduce this risk to zero.

Remember; writing tests is not a waste of time, it is insurance stolen from future sleepless nights. On this path you started with my [Playwright Arch Linux Installation](/en/playwright-arch-linux-kurulum/) guide, your site now stands strong like a real engineering product, kardaş.

Alright then, goodbye!

---

## 🔗 Related Posts
- [Playwright Arch Linux Installation](/en/playwright-arch-linux-kurulum/)
- [Arch Linux CPU Performance Settings](/en/arch-linux-cpu-performans-ayarlari/)
- [Throw Away the Disks: Hosting a Website on RAM with Raspberry Pi Zero](/en/raspberry-pi-zero-ram-diskless-web-server/)
