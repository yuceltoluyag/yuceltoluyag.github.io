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

Did you add a new blog post but Google still hasn't indexed it? 😤 This is exactly where the Google Indexing API comes in. This API allows you to instantly notify Google about content changes.
So, when you add, update, or delete a page, the "waiting for crawl" period is over.

!!! note "The Indexing API is officially supported by Google for JobPosting and BroadcastEvent types"

However, many developers are also getting successful results on blogs and news sites.

✍️ My Personal Experience

I've changed my blog system multiple times — sometimes Jekyll, sometimes Pelican, and even moved to WordPress. As I changed domains, my link structures also changed. The result? 😩 Some of my old posts were never indexed by Google, and some were completely deleted. My articles, which once ranked on the first page, now seemed like they "never existed." That's why I started researching and finally discovered the Google Indexing API. I hope this method will get my articles indexed again and my efforts won't be in vain. Today, AI technologies are transforming everything, and the number of people reading blogs has decreased. But I still believe: Quality over quantity. ✨

---

## 🧩 Necessary preparations

Before using the Google Indexing API, you need to complete a few steps:

### 1. Create a Google Cloud project

- Go to [Google Cloud Console](https://console.cloud.google.com/){: target="\_blank" rel="noopener noreferrer"}, create a new project, and enable the "**Web Search Indexing API**" service.

[responsive_img src="/images/google-indexing-api-nasil-kullanilir-xl.webp" alt="Guide on how to use Google Indexing API with Python" /]

### 2. Create a Service Account

A **service account** is required to call the API.

- Go to Cloud Console > "APIs & Services" > "Credentials" menu.

[responsive_img src="/images/google-indexing-api-service-account-xl.webp" alt="Creating Google Indexing API Credentials" /]

- In this step: Select "Service account" and create a new one. In the menu that appears, give it a memorable name and click "Create and continue." You can skip the other steps. Then, in the screen shown in the image (number 2), you will be given an email. Note this email address because you will need to add it as a user in Search Console later.

- Select "Create credentials" > "Service account."

  [responsive_img src="/images/google-indexing-api-add-key-xl.webp" alt="Creating Google Indexing API Key" /]

- In this step, on the screen that appears, click the "Add Key" button and select "Create new key."

- Then download the "JSON" key file for this account (example: `indexing-key.json`). Keep this file in a safe place because you will need it for API calls.

### 3. Verify authorization

Add this service account email address (example: `indexer@project-id.iam.gserviceaccount.com`) as a **user** to the **Search Console** property of your relevant website.

- You can do this as follows: Search Console > Settings > Users and permissions > Add new user. In this step, enter this email address and grant "owner" permission. In the English interface, it is referred to as "owner." If you skip this step, API calls will fail.

---

## 💻 Using Google Indexing API with Python

The example code below allows you to notify Google about all links in a CSV file as **"indexed"** or **"deleted"**:

```python
from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account
import csv

SERVICE_ACCOUNT_FILE = 'indexing-key.json'
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

!!! tip "Tip ⚡ The `URL_UPDATED` parameter means “page added or updated.” If you want to delete the page, use `URL_DELETED`."

---

## 🔍 How can you check the indexing status?

Google currently does not allow direct "is it indexed?" queries via the API.
However, there are two alternative ways:

1. Use the URL Inspection endpoint with the **Search Console API**.
2. Or quickly search on Google like `site:yourdomain.com/article-url`.

If the results appear after a few minutes — the API has successfully completed its task. 🚀 Sometimes it may be delayed, please do not send it repeatedly and spam your site. Google has taken strict measures on the API. Please be patient.

---

## 🔧 For Pelican users: Google Indexing Tool

If you are building your site with **Pelican**, you don't have to do these steps manually.
Thanks to the **[Google Indexing Tool](https://github.com/yuceltoluyag/google-indexing-tool)** I developed, you can automatically **notify Google about your new or updated posts.**

This tool retrieves article links from the Pelican blog system and sends them directly to the Google Indexing API.
This means that every time content is updated, the indexing process can be done with "one click." 🚀

---

### 🧩 Installation

1. Clone the repository:

```bash
   git clone https://github.com/yuceltoluyag/google-indexing-tool.git
   cd google-indexing-tool
```

2. Create a virtual environment:

```bash
   python -m venv .venv
   source .venv/bin/activate
```

3. Install necessary dependencies:

```bash
   pip install -r requirements.txt
```

4. Edit the `config.ini` file:

```ini
   [DEFAULT]
   SERVICE_ACCOUNT_FILE = service-account.json
   CSV_FILE = article_links.csv
   LOG_FILE = indexing.log

   [PELICAN]
   ARTICLES_PATH = ../content
   SITE_URL = https://yuceltoluyag.github.io
```

---

### ⚙️ Usage

The `export_article_links.py` file, specially prepared for Pelican users, automatically extracts article links from the content folder:

```bash
python export_article_links.py
```

As a result of this process, the `article_links.csv` file is created.
Then you can notify Google about all links with the following command:

```bash
python google_indexing_api_tool.py PUBLISH
```

If you have removed a page:

```bash
python google_indexing_api_tool.py DELETED
```

Operations are logged in the console and in the `indexing.log` file.

---

### ⏳ Limits and recommendations

The daily limit of Google Indexing API is **200 URLs**.
Therefore, it is ideal to set the tool as a **daily cron job** and send only new posts.

---

### 📎 Compatible systems

This tool can be used not only with Pelican, but also with **Hugo**, **Jekyll**, or similar static site generators.
All you have to do is create your own `article_links.csv` file.

---

## 📋 Summary

- Google Indexing API is the most effective way to quickly get new content indexed.
- Authentication is done with a service account.
- API calls can be made via Python or another language.
- For Pelican users, this process can be automated.
- If authorization is not done in Search Console, the API will not work.

---

## 🎯 Conclusion

Now you too can **notify Google about your new posts in minutes** and speed up your SEO process.
By combining this method with an **automatic cron script**, you can instantly announce your blog updates.

---

**Did you know?** [Git sparse-checkout guide](/github-sadece-bir-klasor-indirme/)

- [Bing IndexNow usage guide](/en/otomatik-bing-indexnow-kullanimi)

---
