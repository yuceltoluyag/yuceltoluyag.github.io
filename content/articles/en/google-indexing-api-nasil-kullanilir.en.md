Title: Guide: Using Google Indexing API
Date: 2025-11-05 20:45
Category: Web Geliştirme
Tags: google indexing api, seo, python, google search console, url indexleme
Slug: google-indexing-api-nasil-kullanilir
Authors: yuceltoluyag
Status: published
Summary: Quickly notify Google about new or deleted pages with Google Indexing API. A step-by-step guide with example Python code to speed up your SEO process.
Template: article
Image: images/google-indexing-api-python-kullanim-rehberi-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/115520725904142412
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57kcm5ses2g


## 🚀 What is Google Indexing API?

Did you write a new blog post, publish it with excitement, but Google hasn't crawled your site in days? 😤 This is exactly where the Google Indexing API comes to the rescue. This API allows you to instantly whisper content updates, new pages, or deleted links to Google bots.

Think of it like a hot Turkish simit fresh out of the oven, but its aroma hasn't spread to the street yet. Waiting for Google bots to crawl and discover your site on their own requires as much patience as playing Space Cadet Pinball in a cold morning wearing your school uniform. The Indexing API is that secret force that spreads the smell of that warm simit to the street (meaning Google index) in a matter of seconds.

!!! note "Note: API Limits and Official Support"
    Google claims that it officially supports this API only for `JobPosting` and `BroadcastEvent` structured data types. But off the record, it works like a charm for blogs and news portals, getting pages indexed at the speed of light.

✍️ My Personal Experience

I've changed my blog system so many times that I lost count. Sometimes I used Jekyll, sometimes I switched to Pelican, and I even dabbled with WordPress for a while. With every system and domain change, my link structures became a total mess. The result? 😩 My beloved articles that once ranked on the first page of Google were deleted, as if they had never existed on the internet. I was terrified of my hard work going to waste. This paranoia and disappointment drove my research and led me to the Google Indexing API. Even in this era where AI technologies dominate and people's blog-reading habits are declining, reaching a "small but dedicated" audience is priceless to me. This system became my lifesaver.

---

## 🧩 Necessary preparations

Before using the Google Indexing API, we need to put some keys in our pockets to knock on Google's door.

### 1. Create a Google Cloud Project

First, we need a Google Cloud project:
- Go to [Google Cloud Console](https://console.cloud.google.com/){: target="\_blank" rel="noopener noreferrer"} and create a new project.
- Search for the "**Web Search Indexing API**" service and enable it for your project.

[responsive_img src="/images/google-indexing-api-nasil-kullanilir-xl.webp" alt="Guide on how to use Google Indexing API with Python" /]

### 2. Configure a Service Account

We need to create a virtual identity to call the API via our code:
- Go to Cloud Console > "APIs & Services" > "Credentials" menu.
- Click "Create credentials" > "Service account."

[responsive_img src="/images/google-indexing-api-service-account-xl.webp" alt="Creating Google Indexing API Credentials" /]

- Give the account a memorable name and click "Create and continue." You can skip the subsequent steps.
- Once completed, you will see an email address in the format `indexer@project-id.iam.gserviceaccount.com`. Copy this email address; we'll need it for Search Console authorization.

[responsive_img src="/images/google-indexing-api-add-key-xl.webp" alt="Creating Google Indexing API Key" /]

- Click on the service account you created, go to the "Keys" tab, and click "Add Key" > "Create new key."
- Select **JSON** format and download it. Rename this file to `service-account.json`. This file is your private key, keep it secure.

### 3. Grant Google Search Console Permission

To prevent Google from asking, "Wait, are you trying to index someone else's site?", we must authorize our service account:
- Go to the Google [Search Console](https://search.google.com/search-console/users){: target="\_blank" rel="noopener noreferrer"} page.
- Navigate to Settings > Users and Permissions > Add User.
- Enter the service account email address you copied and select the role as **Owner**. If you grant lesser permissions, the script will throw errors.

!!! warning "Warning! Search Console API Authorization"
    Just enabling the Indexing API is not enough! For our smart tool to inspect URL status, you also need to enable the [Google Search Console API](https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview){: target="\_blank" rel="noopener noreferrer"} service in the same Cloud project.

---

## 💻 Using Google Indexing API with Python

If you want to try everything from scratch with bare code, the simple Python script below reads URLs from a CSV file and submits them to Google.

```python
from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
import csv

SERVICE_ACCOUNT_FILE = 'service-account.json'
SCOPES = ['https://www.googleapis.com/auth/indexing']
API_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish'

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
session = AuthorizedSession(credentials)

with open('urls.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        url = row[0]
        body = {'url': url, 'type': 'URL_UPDATED'}
        response = session.post(API_URL, json=body)
        print(f"{url} -> {response.status_code}")
```

!!! tip "Tip ⚡ Quick solutions or shortcuts."
    The `URL_UPDATED` parameter indicates the page was added or updated. If you want to remove an obsolete URL from Google's index, you should send `URL_DELETED` instead.

---

## 🔧 Modern Solution for Multi-Project Setup: Google & Bing Indexing Tool

Wrestling with basic scripts and executing them manually every day is like eating plain instant noodles. If we want a professional approach, we should manage it cleanly.

To resolve the indexing issues across all my blogs, I developed the open-source [Google Indexing Tool](https://github.com/yuceltoluyag/google-indexing-tool){: target="\_blank" rel="noopener noreferrer"}. It automates the entire workflow and even includes Bing IndexNow integration.

The best part? You can install it **globally** and run it in any blog project folder with a single command.

### 📦 Global Installation and Setup

Open your terminal and install the tool directly from GitHub:

```bash
pip install git+https://github.com/yuceltoluyag/google-indexing-tool.git
```

This registers a global `google-indexer` CLI command on your system. Now you can run it inside any blog directory.

Create a `config.ini` file in your blog project's root folder and fill it:

```ini
[PELICAN]
ARTICLES_PATH = content/articles
SITE_URL = https://yuceltoluyag.github.io/

[DEFAULT]
CSV_FILE = article_links.csv
SERVICE_ACCOUNT_FILE = service-account.json
LOG_FILE = indexing.log

[API]
URL = https://indexing.googleapis.com/v3/urlNotifications:publish
REQUEST_DELAY_SECONDS = 10
COOLDOWN_DAYS = 3

[BING]
API_KEY = your_bing_indexnow_api_key
KEY_LOCATION = https://yuceltoluyag.github.io/your_bing_indexnow_api_key.txt
```

!!! note "Note: Cooldown & Request Delays"
    Thanks to the `COOLDOWN_DAYS = 3` setting, any URLs that aren't indexed yet but have been submitted are protected from re-submission for 3 days. This prevents us from spamming Google and getting penalized. The `REQUEST_DELAY_SECONDS = 10` adds a delay between API requests to respect rate limits.

---

### ⚙️ Step-by-Step Smart Workflow

Once your setup is ready, navigate to your blog directory and run these commands:

#### Step 1: Export Pelican Posts to the CSV Database

Scan your blog and append all active article links to the tracking list (`article_links.csv`):
```bash
google-indexer export
```

#### Step 2: Submit to Bing IndexNow in Batches

Bing accepts all new links in a single payload, which is incredibly efficient:
```bash
# Preview what will be sent (dry run):
google-indexer bing --dry-run

# Live submit to Bing:
google-indexer bing
```

#### Step 3: Smart Google Inspection and Submission (Smart Mode)

Pay close attention, this is the most critical step. This command inspects the current indexing status of pending URLs in our list using the Google Search Console API[^1]. If a page is already indexed, its status updates to `PASS`. If it is not indexed and the cooldown period has expired, it gets submitted to the Google Indexing API, and a 3-day cooldown timer starts.

```bash
# Perform a safe simulation run:
google-indexer smart --dry-run --limit 10

# Execute live inspection and submission:
google-indexer smart --limit 50
```

If you only want to check the status of a specific URL without wasting your API quota, use:
```bash
google-indexer inspect --url https://yuceltoluyag.github.io/my-article-link/
```

---

## ⏳ SEO Insights and Quota Policies

When using search engine APIs, we need to manage our limits as strictly as a tight household budget. The boundaries are clear:
- **Google Indexing API:** Daily quota is capped at **200 URLs**. Setting the smart command limit to 50 or 100 is a smart move.
- **Bing IndexNow API:** Allows up to **10,000 URLs** in a single batch request.
- **Spam Prevention:** Repeatedly submitting the same URLs ruins your site's reputation. Never disable the built-in cooldown mechanism.

---

## 📋 Summary of Key Takeaways

- The Google Indexing API allows us to notify search bots instantly instead of waiting days.
- Creating a service account and granting it "Owner" permission in Search Console is a hard prerequisite.
- The `google-indexer` tool manages this process safely via a local CSV database to prevent spam.
- Bing IndexNow integration keeps our Bing index updated with a single batch command.

---

## 🎯 Final Words

Long story short, instead of passively waiting for Google bots to crawl your site, you can take control. You can bind this tool to a daily cron job or task scheduler on your server or machine, sit back, and relax.

**Explore More:**
- [Git sparse-checkout guide](/en/github-sadece-bir-klasor-indirme/)
- [Bing IndexNow usage guide](/en/otomatik-bing-indexnow-kullanimi)

---

[^1]: The Google Search Console API is the official interface that allows you to programmatically inspect your URLs' live indexation status and coverage issues.
