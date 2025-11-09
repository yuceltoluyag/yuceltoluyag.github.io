Title: Installing Jekyll Staticman Plugin
Date: 2022-01-29 00:00 10:00
Modified: 2025-10-12 18:28
Category: Web Geliştirme
Tags: staticman, jekyll
Slug: jekyll-staticman-eklentisi-kurulumu
Authors: yuceltoluyag
Summary: Detailed guide about installing Staticman plugin for comments on Jekyll blog sites.
Status: published
Template: article
Image: images/staticman-xl.webp
Lang: en

## **Hello** 😄

I was previously using the **Disqus** comment plugin on my blog. But I finally got acquainted with **Staticman**, which I wanted to try for a long time but never had the chance. In this article, I'll give you detailed information about Staticman installation and usage. Although the installation process is a bit challenging, I'll explain it step by step and hope you'll benefit from this process. 😌

## What is Staticman?

**Staticman** is a fantastic library developed for **static** sites that is completely under your control. It can be used for various functions such as **comment section**, **guestbook** or **contact form**. 🐒 However, since the documents in the repo are not updated according to newer versions, you may experience difficulties if you follow those documents. Don't worry, I'm here to prevent you from hitting the wall! 🥰

## Required Materials 🥗

Firstly, we'll need the following tools:

- Heroku Membership
- Creating Github Application
- Github Tokens
- A Second Github Account

## First Step: Create a Different Github Account

Create a new Github account. You can create this account with a name like `mycoolyname-bot` for example. [Babanın Botu](https://github.com/babayorum-bot){: target="\_blank" rel="noopener noreferrer"}

## Deploy on Heroku

1. Go to [Heroku](https://herokuapp.com/){: target="\_blank" rel="noopener noreferrer"} site and create a membership.
2. Then, go to [Staticman Repo](https://github.com/eduardoboucas/staticman/tree/dev){: target="\_blank" rel="noopener noreferrer"} and select the **dev** branch here. Because some updates in the main branch are not yet merged. Click the **Deploy Heroku** button at the bottom of this section.

[responsive_img src="/images/staticman8-xl.webp" alt="heroku-installation]" /]

3. Deploy your application by making the relevant settings.

[responsive_img src="/images/staticman9-xl.webp" alt="heroku-installation]" /]

For now, that's enough for the process, we'll configure the settings in detail in the following steps.

## Github Applications

1. First, create an application from [Github Apps](https://github.com/settings/apps){: target="\_blank" rel="noopener noreferrer"}. Don't forget to customize the application name, description and Heroku address according to yourself.

[responsive_img src="/images/staticman-xl.webp" alt="heroku-installation]" /]
[responsive_img src="/images/staticman2-xl.webp" alt="heroku-installation]" /]

## Private Keys

Click the **Generate a private key** button in the Private keys section and save the generated file. We'll use the information in this file in Heroku environment variables.

[responsive_img src="/images/staticman11-xl.webp" alt="heroku-installation]" /]

## Github Tokens

1. Go to [Github Tokens](https://github.com/settings/tokens/){: target="\_blank" rel="noopener noreferrer"} page and create a new token. Give the following permissions to your token:

[responsive_img src="/images/staticman3-xl.webp" alt="staticman-installation]" /]
[responsive_img src="/images/staticman4-xl.webp" alt="staticman-installation]" /]

After creating, you'll be given a code. Save this code as we'll use it in the following steps. Then click your created application and click **Install** from **Install App** section.

[responsive_img src="/images/staticman5-xl.webp" alt="staticman-installation]" /]

In this step, you can select whether to use the token in all your repos or only in a specific repo. I prefer to use it only in a single repo.

[responsive_img src="/images/staticman6-xl.webp" alt="staticman-installation]" /]

Then click the **Install** button.

## Github Bot

We'll invite our newly created Github account to our repo. Go to our repo, click the **Settings** tab. Then click **add people** from **Collaborators** section and add your bot account you created. Accept the invitation by logging in with your other account.

[responsive_img src="/images/staticman7-xl.webp" alt="staticman-installation]" /]

Github settings are completed here! 🤯

## Heroku Settings

Go to the Heroku panel and click your created application. Go to **Config Vars** section from **Settings** and click **Reveal Config Vars**.

## Environment Variables

You should create the following variables here:

- GITHUB_APP_ID
- GITHUB_PRIVATE_KEY
- GITHUB_TOKEN
- RSA_PRIVATE_KEY

Fill these values with the tokens and private keys we created before.

## Creating RSA Key

```bash
ssh-keygen -m PEM -t rsa -b 4096 -C "writeyourmailhere" -f ~/.ssh/staticman_key
```

Then to see the key you created:

```bash
head -2 ~/.ssh/staticman_key
```

Output should be as follows:

```bash
-----BEGIN RSA PRIVATE KEY-----
MIDIGOMEDAGLARIBLA12930219312
```

Alternatively, you can create RSA key using **openssl**:

```bash
openssl genrsa -out key.pem
```

If you can't use terminal, you can use online RSA key generators. You can visit [Online RSA Key Generator](https://travistidwell.com/jsencrypt/demo/){: target="\_blank" rel="noopener noreferrer"} site to create your key.

!!! note "RSA Key from Github <code>GITHUB_PRIVATE_KEY</code> and our <code>RSA Key</code> can be the same. So you can skip the RSA Key creation step."

## Staticman Settings

Staticman settings are stored in YAML format. The `staticman.yml` file should have the following content:

```yaml
comments:
  allowedFields: ["name", "email", "website", "message", "reply_id"]
  allowedOrigins: ["localhost", "www.yuceltoluyag.github.io"]
  branch: "master"
  commitMessage: "Comment from {fields.name} on {options.slug}"
  filename: "entry-{@timestamp}"
  format: "yaml"
  generatedFields:
    date:
      type: "date"
      options:
        format: "timestamp-seconds"
  moderation: true
  name: "Yücel Toluyağ"
  notifications:
    enabled: false
  path: "_data/comments/{options.slug}"
  requiredFields: ["name", "email", "message"]
  transforms:
    email: md5
  reCaptcha:
    enabled: false
    siteKey: "12321321"
    secret: "123213213213"
```

## Staticman Form Elements

To send your form data, you can use the `fields` tag in the **value** sections. A sample form element would be as follows:

```html
<input
  class="textfield__input"
  name="fields[name]"
  type="text"
  id="comment-form-name"
  placeholder="Your Name"
  required
/>
```

## Staticman Encryption

To ensure security in static sites, using encryption is quite important. For encryption, you can use the following structure:

```html
https://{YOUR_HEROKU_ADDRESS}/v3/encrypt/thingtoencrypt
```

## Staticman Postman Tests

To make tests via Postman, you'll need to make the correct settings. You should configure the `field` and `options` settings in the Form elements section correctly.

[responsive_img src="/images/staticman-postman-xl.webp" alt="staticman-installation]" /]

[Live Test](https://github.com/Baba-Project/jekyll-staticman/pull/1){: target="\_blank" rel="noopener noreferrer"}

## Staticman Sample Codes

Take a look at these files friends, I'm sure your mind will light up 🎃

- [comments.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comments.html){: target="\_blank" rel="noopener noreferrer"}
- [comment.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comment.html){: target="\_blank" rel="noopener noreferrer"}
- [comment_form.html](https://github.com/Baba-Project/jekyll-staticman/blob/main/_includes/comment_form.html){: target="\_blank" rel="noopener noreferrer"}
- [main.js](https://github.com/Baba-Project/jekyll-staticman/blob/main/assets/js/main.js){: target="\_blank" rel="noopener noreferrer"}

- [\_comment.scss](https://github.com/Baba-Project/jekyll-staticman/blob/558016f1c2b3aaf9c69d8b8483e63f0933c6d9ab/css/main.scss#L305){: target="\_blank" rel="noopener noreferrer"}

* Live Test => [Comment](https://baba-project.github.io/jekyll-staticman/){: target="\_blank" rel="noopener noreferrer"}
* Source Files => [Free Download](https://github.com/Baba-Project/jekyll-staticman){: target="\_blank" rel="noopener noreferrer"}

## Conclusion

Now you don't have to use Disqus anymore! Staticman is quite useful and customizable even though it has some flaws. Although there are areas that need to be improved, you can easily manage comments on your static sites for now. ✨

[Source Files](https://github.com/yuceltoluyag/jekyll-staticman){: target="\_blank" rel="noopener noreferrer"}
