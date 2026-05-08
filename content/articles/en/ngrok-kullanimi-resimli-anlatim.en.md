Title: Ngrok Usage Illustrated Guide
Date: 2017-02-22
Category: Web Development
Author: yuceltoluyag
Slug: ngrok-kullanimi-resimli-anlatim
Summary: Share your local projects easily on the internet with Ngrok and share live demos. Updated installation and usage guide for Linux.
Tags: ngrok, localhost, xampp, linux, web development
Lang: en
Translation: false
Image: images/ngroknasilkullanilir-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601341245788252
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6ddz5wsfk2z

## Ngrok Usage Illustrated Guide

!!! note "Since the old images in the post were deleted, the explanation has been updated for Linux. (March 08, 2017)"
Hello, it used to take various complex procedures to show the project you coded locally to your friends or customers live.  
Thanks to **Ngrok**, you can now easily perform these operations. The software is quite simple to use and install.

## Downloading Ngrok

Download the version suitable for your operating system from the [official Ngrok website](https://ngrok.com/download){: target="\_blank" rel="noopener noreferrer"}.  
You can use the “Docs” section for other systems.

Open your terminal and go to the folder where you downloaded the file.  
Since I use a single disk, I downloaded it to the **Downloads** folder.

```bash
cd Downloads
./ngrok help
```

This way you can get information about **Ngrok's usage options**.

!!! tip "Tip ⚡ The Ngrok help command is ideal for quickly remembering command parameters."

## Starting the Local Server

Then we start the local server you are using (e.g., XAMPP).

```bash
cd /opt/lampp
sudo ./manager-linux.run
```

The command above opens the XAMPP interface.
If you want to start without using the interface, type this command:

```bash
sudo /opt/lampp/lampp start
```

!!! note "Note: Running without an interface is generally faster, but you'll need to deal with error outputs directly via the terminal."

## Opening Your Project for Publication with Ngrok

After starting your local server, type the following command:

```bash
./ngrok http 80
```

!!! warning "Caution! You should write the command as `http`, not `htpp`, otherwise you will get an error."

[responsive_img src="/images/ngroknasilkullanilir-xl.webp" alt="Ngrok usage example" /]

After this command runs, you will see an address like this in the terminal:

```
http://bb10ad8c.ngrok.io
```

You can send this address to the people you will show your project to.
However, if you send it this way, the person will see your **root directory**.
If you only want to show a specific folder, you need to share it by adding the project folder:

```
http://bb10ad8c.ngrok.io/projectfolder
```

For example:

```
http://bb10ad8c.ngrok.io/socialnetworkproject
```

!!! tip "Tip ⚡ If you share a specific folder, only the files under that directory will be accessible."

Good luck with your work! 😊
