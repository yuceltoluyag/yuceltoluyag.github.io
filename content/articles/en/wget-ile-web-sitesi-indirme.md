Title: Downloading a Website Correctly with Wget
Date: 2025-11-14 11:59
Category: Linux
Tags: wget, komut satırı, linux, sorun giderme
Slug: wget-ile-web-sitesi-indirme
Authors: yuceltoluyag
Summary: Downloading a site with Wget is an art. With the wrong command, the site turns into a dump. I'm showing the right parameters to browse offline without broken links.
Image: images/wget-ile-web-sitesi-indirme-xl.webp
Lang: en
Status: published

Downloading a site on Linux... `wget` immediately comes to mind. Everyone recommends it, you know. But that command, when used with the wrong parameters, turns what you download into a complete mess. Broken links, empty images... it happened to me recently, and I got annoyed. 😤 That's why I'm here to explain that magical combination.

Our goal is simple: to be able to browse the downloaded site seamlessly on our computer, not to overload the server, and not to overwrite files.

Generally, there are two ways. One is "recursive traversal," which means downloading the site by branching out. The other is to pull all the addresses from the site's `sitemap.xml` file one by one. Both work, but for different situations.

## The Famous "Branching" Download Process

Of course, we'll use `wget`. GNU Wget is a free utility for non-interactively downloading files from the Web...

...Saying it like that sounds too formal to me. Wait, let me rephrase: `wget`, Linux's oldest, most robust soldiers. It's already available in most distributions.

So, let's use this soldier correctly, shall we?

### Magical Words and Their Meanings

I don't want to explain each parameter one by one like technical articles. That would be extremely boring. Instead, let's think of what each part of this command does, like the parts of a car.

**First, the "Being Polite" Part:**
I usually start with `--wait=2`. Why? Once, I downloaded too fast, and the site owner banned me. Since that day, I've been operating on the principle of "the politer you are, the better." This command tells wget to pause for 2 seconds before downloading each file. Sometimes I even extend it to 3 seconds, giving myself a chance to collect my thoughts.

It just occurred to me, is that site owner still blocking me? Anyway, back to the topic.

Similarly, there's `--limit-rate=20K`. This limits the download speed to 20 kilobytes per second. So you're telling wget, "don't be greedy, be slow and steady." Otherwise, you'll consume both the server's bandwidth and your own internet will get jammed. This command is a lifesaver, especially when downloading large sites.

**Now, the "Doing It Right" Part:**
The `--recursive` command is where the magic begins. This allows it to download all pages by jumping from one branch of the site to another. It's like going down a rabbit hole. 🐇 By default, it goes 5 levels deep; if the site is deeper, you can download indefinitely by saying `--level=inf` (but be careful, it can take a very long time!). I'm not sure, but I think `--level=0` might also work for infinite, worth checking.

What about the page's images, CSS? That's where `--page-requisites` comes in. This command ensures that the page brings "everything it needs" - images, CSS, JavaScript - along with it. If you don't do this, the site you download will look like an unfurnished, empty house, nothing will look right. 👻

**Final Touches:**
What if the links break after the download is complete? That's exactly what `--convert-links` is for. This command makes the downloaded site work on your own computer. It redirects the links to local files. Otherwise, the link you click will open to nothing.

`--adjust-extension` is also very useful. If the downloaded page's extension is not `.html`, wget adds `.html` to the end of it. This is very important for local browsing.

`--no-clobber` prevents duplicates. So if you download a file and then run it again, wget won't overwrite the old one, it will just say "this exists." Sometimes it's useful.

!!! note "Tip ⚡ Let me quickly drop a small note here: The `-e robots=off` parameter prevents wget from respecting the site's `robots.txt` file. This means you're saying, "I'm a bot, but I won't follow your rules." Use this carefully, some sites might not like it."

### So, What Should the Final Form of This Command Be?

Here's that magical command I put together after all my experiences. We can call it the "super download spell":

```bash
wget --wait=2 \
     --level=inf \
     --limit-rate=20K \
     --recursive \
     --page-requisites \
     --user-agent=Mozilla \
     --no-parent \
     --convert-links \
     --adjust-extension \
     --no-clobber \
     -e robots=off \
     https://example.com
```

### Example Try

Let's download `https://example.com` and see how "noisy" `wget` can be.

```bash
$ wget --wait=2 --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber https://example.com
--2017-06-30 19:48:46--  https://example.com/
Resolving example.com (example.com)... 93.184.216.34
Connecting to example.com (example.com)[93.184.216.34]:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1270 (1.2K) [text/html]
Saving to: ‘example.com/index.html’

example.com/index.html            100%[===========================================================>]   1.24K  --.-KB/s    in 0.003s

2017-06-30 19:48:46 (371 KB/s) - ‘example.com/index.html’ saved [1270/1270]

FINISHED --2017-06-30 19:48:46--
Total wall clock time: 0.6s
Downloaded: 1 file, 1.2K in 0.003s (371 KB/s)
Converting links in example.com/index.html... nothing to do.
Converted links in 1 file in 0 seconds.
$ tree example.com/
example.com/
└── index.html

0 directories, 1 file
```

See how detailed the report is, it tells every step. This is great for debugging.

!!! tip "Shortcut: Wget Mirror Now you might say, "Oh, writing all this is too long, isn't there a shortcut?" Of course there is. `wget` already comes with a useful `--mirror` parameter. This parameter means the same as using `-r -l inf -N`. That is, it performs recursive, infinite depth, and timestamped downloading."

## Method 2: Being Smarter (Using Sitemap)

Another approach is to avoid recursive traversal of the site and download all URLs from the site's `sitemap.xml` file. This is a much cleaner method, especially when you only want specific pages.

### Filtering URLs from Sitemap

A sitemap file usually looks like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://yuceltoluyag.github.io/</loc>
<lastmod>2014-09-15T00:00:00-03:00</lastmod>
</url>
<url>
<loc>https://yuceltoluyag.github.io/en</loc>
<lastmod>2014-09-15T00:00:00-03:00</lastmod>
</url>
</urlset>
```

Here we need to get all URLs within `sitemap.xml`. We can use `grep` for this: `grep "<loc>" sitemap.xml`.

### Removing Loc Tags

Now let's clean up the unnecessary tags: `sed -e 's/<[^>]*>//g'`

### All Together

After the previous two commands, we have a list of URLs, and this list is the parameter that `wget -i` reads.

```bash
wget -i $(grep "<loc>" sitemap.xml | sed -e 's/<[^>]*>//g')
```

And `wget` will start downloading them one by one. This method can be much more efficient for downloading only the pages we need.[^1]

## The Bottom Line...

So, the bottom line is, wget is truly a treasure. You won't need to use any other GUI tool; you can do everything you can imagine on the command line. You just need to take a look at its manual for the right parameters.

Thanks to the parameter combination above, you'll have a fully browsable, local copy.

!!! warning "Attention ⚠️ A warning: `.html` extensions might not always work. Sometimes you might want wget to generate extensions based on Content Type, and sometimes you might need to prevent wget from generating extensions when using "pretty URLs". You need to adjust this according to the situation."

I hope this article is useful to you, happy downloading!

[^1]: Actually, when I first discovered this method, I was very happy. Because I needed to download only specific pages in a very large site, and this saved me from a job that could have taken hours.
