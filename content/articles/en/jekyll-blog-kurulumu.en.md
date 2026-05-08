Title: Jekyll Blog Installation
Date: 2017-03-12
Category: Web Development
Author: yuceltoluyag
Slug: jekyll-blog-kurulumu
Summary: A guide to creating a fast and database-free blog with Jekyll. Setup steps via terminal and GitHub Pages integration.
Tags: jekyll, github pages, ruby, blog, web development
Lang: en
Translation: false
Image: images/bundleexecjekyllserve-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601400903399600
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6des5yyvs26

## Jekyll Blog Installation

Hello, I received a message asking how I set up my Jekyll blog. First of all, the installation and use are quite simple. It does not require complex configurations like databases. Since it creates a static site, your blog will be accessible in a short time if you make the right settings and be patient.

## Installation

Open your terminal and follow these steps in order:

```bash
sudo apt-get install ruby ruby-dev make gcc
```

» Press Enter

```bash
sudo apt-get install ruby ruby-full ruby-bundler
```

» Press Enter

```bash
sudo gem install jekyll
```

» Press Enter

```bash
jekyll -v
```

» This way you can see your Jekyll version. Jekyll is currently at version **3.4.2**.
If there are no problems with your actions so far, now it's time to set up our blog:

```bash
jekyll new blog
```

» Press Enter — A directory named **blog** will be created in your _Home_ folder.

```bash
cd blog
bundle install
bundle exec jekyll serve
```

» You will be able to see the blog you set up on **port 4000** locally.
Finally:

```bash
jekyll serve
```

!!! tip "Tip ⚡ If the Bash output looks like the image, everything is fine."
[responsive_img src="/images/bundleexecjekyllserve-xl.webp" alt="Bundle Exec Jekyll" /]

» You will be able to see your blog when you go to [http://127.0.0.1:4000/](http://127.0.0.1:4000/){: target="\_blank" rel="noopener noreferrer"}.

## Hosting Jekyll Blog on Github Pages

I can hear voices saying: “Wait, how will it be on GitHub?”
The logic here is as follows: If you are going to install a plugin or theme, you should first try it locally, then send it to the repo. The following method will be simpler, but it is useful to examine the links I will give at the end of the lesson. If you learn the way I do, you will grasp the logic.

### Very Simple Jekyll Installation on GitHub Pages

1. Log in to your GitHub account.

2. Go to the [Jekyll GitHub page](https://github.com/jekyll/jekyll){: target="\_blank" rel="noopener noreferrer"} and perform a **Fork** operation.
   After forking, a repo named **jekyll** will be created in your own profile.
   (I hope you saw the GitHub repo fork menu in the top right 😄)

3. After the fork operation is finished, return to your profile and click on your repo.
   Then enter the **Settings** menu.
   Change the repo name according to the blog address you want to create.

```bash
githubreponame (image visual lost)
```

After waiting a while, you can see the status of your blog from the “Pages” area at the bottom of the **Settings** section.
It is recommended to choose a random theme from the **theme** section and save it for faster approval.

```bash
muhtesemjekyll (image visual lost)
```

## Understanding the Logic

Git use is quite simple; you don't need to spend hours.
Since we write in Markdown format, it might feel strange at first, but it gets much easier as you get used to it.
I use the **Sublime Text** plugin and occasionally the **Remarkable** app.
However, once you learn to write Markdown, there's not much need for these.

!!! note "Note: Learning Markdown provides the greatest convenience in the long run when working with Jekyll."

## Alternatives and Additional Tools

For those who say “Bro, I'm a WordPress guy, isn't there anything for us?” there is good news:
You can use the **Jekyll Admin plugin developed by Mert Kahyaoğlu**.
It is also possible to publish locally using **Ngrok**.
