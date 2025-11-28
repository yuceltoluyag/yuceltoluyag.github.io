Title: Using HTTrack on Linux
Date: 2018-12-01 12:00 10:00
Modified: 2025-08-11 22:59
Category: Ağ ve İnternet
Tags: httrack, linux
Slug: linux-ta-httrack-kullanimi
Authors: yuceltoluyag
Summary: In this article, I explain step by step how to download websites offline using HTTrack on Linux.
Status: published
Template: article
Image: images/httrack-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114982912012327637
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqpgkmt3s27

Hello! HTTrack is a software that allows you to use websites even when you don't have an internet connection. I wanted to prepare a document explaining how to use this software, which I frequently use on Windows, through the Linux terminal.

Step 1: Installing HTTrack

First, we need to install HTTrack. You can install the software with the following command:

```bash
sudo apt-get install httrack  # Installing the program
```

Step 2: Enter Project Information

After HTTrack is installed, you will be asked to enter the following information:

```bash
project name :  # Name of the project
Base path (return=/home/baba/websites/):  # Directory where the project will be downloaded
Enter URLs (separated by commas or blank spaces) :  # Address of the website you will save
```

Step 3: Action Selection

The following menus will appear during the process:

- Copy website
- Copy website with wizard manager
- Pull only files
- Pull a copy of all links (I'm not sure about this option as I haven't used it)
- Apply bookmark test
- Exit

I usually use the 1st option, as I haven't needed the other options. Some websites may have taken measures against HTTrack, so there's no rule that you'll be able to download every URL. It would be useful to examine the offline downloaded site by right-clicking and using "Inspect Element" menu. If you see error messages written in red color, you may need to fix them.

Step 4: [My YouTube Channel](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){: target="\_blank" rel="noopener noreferrer"}

You can visit my channel for more guides and videos.

- Did you read this? Now you can check out the [wget website downloading guide](/en/wget-ile-web-sitesi-indirme).

[responsive_img src="/images/httrack-xl.webp" alt="httrack" /]
