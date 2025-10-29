Title: Tracking Page Views with Google Analytics on Jekyll
Date: 2022-01-30 09:00 10:00
Modified: 2025-10-12 18:28
Category: Web Geliştirme
Tags: superproxy, jekyll, google analytics
Slug: jekyll-google-analytics-sayfa-goruntuleme
Authors: yuceltoluyag
Summary: A guide explaining how to track page view counts with Google Analytics on your Jekyll site.
Translation: true
Status: published
Template: article
Image: images/superproxy-xl.webp
Lang: en

## **Hello!** 🌟

While researching how to display page views on your static websites, I learned that we can use the **Super Proxy** library through **Google Analytics** to expose data externally. I found an old video from the Google team about this topic: [Google Analytics Super Proxy](https://developers.google.com/analytics/solutions/google-analytics-super-proxy){: target="\_blank" rel="noopener noreferrer"}. I found my solution by following this video. 🥰

## Ingredients 🥗

- Google Analytics Account
- Google Console Account

## First Step

After opening your Google Analytics account, don't forget to make this setting when adding your site: Open "Create a Universal Analytics property" and check as shown in the image.

[responsive_img src="/images/superproxy.webp" alt="GA-superproxy-setup" /]

## Google App Engine Setup

1. Go to [Appengine](https://console.cloud.google.com/appengine){: target="\_blank" rel="noopener noreferrer"} site.
2. Click "Create Project" option.
3. Give your project a name and continue.
4. Choose Python as language and "standard" as environment.
5. Enable your billing account. You'll need to link your credit card, but you won't be charged as long as you don't exceed the free quota. This quota is more than sufficient for a simple blog.
6. From the left menu, select **APIs and Services** and then click **Enable APIs and Services**.

[responsive_img src="/images/superproxy2-xl.webp" alt="GA-superproxy-setup" /]

- Select `Google Analytics API` and enable the API.
- In `APIs & Services` menu, click `OAuth consent Screen` and in the popup window, check **External** option and continue.

[responsive_img src="/images/superproxy3-xl.webp" alt="GA-superproxy-setup" /]

!!! tip " Don't add a logo when creating your project, otherwise you'll enter the approval process. There's no logo requirement anyway :)"

- **Publish** your project.

* Activate `OAuth 2.0 Client IDs` from `Credentials` section.

[responsive_img src="/images/superproxy4-xl.webp" alt="GA-superproxy-setup" /]

- Note down the codes created as `Client ID` and `Client Secret`.
- Click again on `Client ID` and fill the following fields:
  - Enter the URL given after creating your project in `Authorized JavaScript origins` section.
  - Include only **`/admin/auth`** extension in `Authorized redirect URIs` section.

[responsive_img src="/images/superproxy5-xl.webp" alt="GA-superproxy-setup" /]

## Cloud SDK

1. First, go to [Google Cloud CLI](https://cloud.google.com/sdk/docs/quickstart){: target="\_blank" rel="noopener noreferrer"} and download the software suitable for your operating system.
2. Then open the terminal and enter the following command:

```bash
gcloud init
```

Your browser will open, after the approval process you'll successfully log in. Then you can check your project information with the following command:

```bash
gcloud info
```

Your selected project information should be displayed here.

3. Now go to [google-analytics-super-proxy](https://github.com/googleanalytics/google-analytics-super-proxy){: target="\_blank" rel="noopener noreferrer"} repository and download the files.
4. Open **`src/app.yaml`** file with an editor and delete the following two lines at the beginning:

```yaml
application: your-application-id
version: 1
```

Save the file.

5. Open **`src/config.py`** file. Fill `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` sections with the Client ID and Secret you created above.

[responsive_img src="/images/superproxy6-xl.webp" alt="GA-superproxy-setup" /]

6. Write a random strong password in the `XSRF_KEY` section.
7. Open terminal in the **src** folder and run the following command:

```bash
gcloud app deploy
```

After the process is completed, you can follow logs with the following command:

```bash
gcloud app logs tail -s default
```

To open your project in your browser:

```bash
gcloud app browse
```

Add `/admin` to the end of the opened link and log in to your connected Analytics account. If everything went well, you should encounter the following screen:

[responsive_img src="/images/superproxy7-xl.webp" alt="GA-superproxy-setup" /]

## Google Analytics Query

1. Click `Create Query` button and wait there.
2. Open [UA Query Explorer](https://ga-dev-tools.web.app/query-explorer/){: target="\_blank" rel="noopener noreferrer"}. If you're using ad blocker extensions, don't forget to turn them off while working on this site.
3. **Start Date** => Enter the date of your oldest post.
4. **End Date** => Select "Today" option.
5. **Metrics** => Select "Pageviews".
6. **Dimensions** => Select "PagePath".
7. **Filters** => Fill as `ga:pagePath=~^.\*/$;ga:pagePath!@=`.

[responsive_img src="/images/superproxy8-xl.webp" alt="GA-superproxy-setup" /]

8. Click `Run Query` button and note down the generated URL.
9. Fill `Create Query` section as below.

[responsive_img src="/images/superproxy9-xl.webp" alt="GA-superproxy-setup" /]

10. Then click `Manage` option from project section, press `Enable Endpoint` and `Start Scheduling` buttons. Process complete! 🎉

11. Finally, after all this process is finished, the view should be as follows:

[responsive_img src="/images/superproxy10-xl.webp" alt="GA-superproxy-setup" /]

12. Open your `_config.yml` file and add the following codes:

```yaml
google_analytics:
  id: "G-V6XXXXXXX" # Enter your Google Analytics ID
  pv:
    proxy_endpoint: "https://YOUR_PROJECT_ID.appspot.com/query?id=<YOUR SUPER PROXY ID>"
    cache_path: # Can be left empty due to being regional.
```

## Filtering

You can examine filtering variables from [Core Reporting API Filters](https://developers.google.com/analytics/devguides/reporting/core/v3/reference#filters){: target="\_blank" rel="noopener noreferrer"} page.

## Example Files

- [My \_Config.yml File](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/c95d1676917ad36cdb479d81718d07b575bcfafd/_config.yml#L39){: target="\_blank" rel="noopener noreferrer}
- [My Script.html File](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/c95d1676917ad36cdb479d81718d07b575bcfafd/_includes/script.html#L35){: target="\_blank" rel="noopener noreferrer}
- [My Post.html File](https://github.com/yuceltoluyag/yuceltoluyag.github.io/blob/c95d1676917ad36cdb479d81718d07b575bcfafd/_layouts/post.html#L46){: target="\_blank" rel="noopener noreferrer}

## Conclusion

I'm using this solution on my blog. **Google Console** service doesn't try to charge from your card at the end of the month like **Amazon** which says it's free, I've been using it problem-free for **seven months**. Still, you can set up a payment alarm for precaution. You can go to alarms from payments section and set alarm when it exceeds **1 TL** to warn me. 😉

[responsive_img src="/images/superproxy11-xl.webp" alt="GA-superproxy-setup" /]