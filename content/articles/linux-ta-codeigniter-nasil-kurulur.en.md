Title: Installing CodeIgniter on Linux: Step-by-Step Guide
Date: 2018-12-01 12:00 10:00
Modified: 2025-08-11 22:59
Category: Web Geliştirme
Tags: codeigniter, linux, php, framework kurulumu, web geliştirme
Slug: linux-ta-codeigniter-nasil-kurulur
Authors: yuceltoluyag
Status: published
Summary: Looking to install CodeIgniter on your Linux server? Learn CodeIgniter installation step by step with this guide and start your project right away!
Template: article
Image: images/codeigniter-xl.webp
Lang: en

## First Step When Starting a New Project: Installing CodeIgniter 💻

Excited about starting a great web project? If the framework you've chosen is CodeIgniter, you're in the right place! CodeIgniter is a wonderful PHP framework loved for its lightness and flexibility, especially for beginners.

So, how will we install this beautiful framework on our Linux system? Don't worry, the process is much simpler than you think. In this guide, I'll guide you step by step to complete CodeIgniter installation on Linux smoothly.

## Preparation Before Starting Installation

Before moving on to the actual installation steps, let's make sure our ingredients are ready in the kitchen. For CodeIgniter to run, you need a web server and PHP installed on your computer. This is generally called the LAMP (Linux, Apache, MySQL, PHP) stack.

!!! note "Note: If Apache and PHP are not installed on your computer, you first need to install these components that form the basis of your project. For installing Apache, MySQL and phpMyAdmin on Linux, you can [access my detailed guide here](/linux-apache2-mysql-phpmyadmin-kurulumu/). For Arch Linux users, [this guide](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/) will do the job. "

## Step-by-Step CodeIgniter Installation

If you're ready, let's start coding time! Follow the steps below in order.

### Step 1: Downloading CodeIgniter

Let's start by downloading the latest CodeIgniter version. To do this, open your terminal and use the following `wget` command. This command directly downloads the file from CodeIgniter's official GitHub repository to your computer.

```bash
wget https://github.com/bcit-ci/CodeIgniter/archive/refs/tags/v3.1.13.zip
```

_(Note: At the time of writing this article, the latest stable version is 3.1.13. Don't forget to check the [CodeIgniter download page](https://codeigniter.com/download) for the latest version!)_

### Step 2: Extracting the Downloaded Archive and Managing the Folder

After the download is complete, let's extract the `.zip` archive file and give it a more manageable name.

```bash
# Extract the archive
unzip v3.1.13.zip

# Rename the created folder
mv CodeIgniter-3.1.13 codeigniter
```

Now we have a clean folder named `codeigniter`.

### Step 3: Moving Files to Web Server Directory

Now we need to move this folder to the main directory where the web server serves files. This directory is generally `/var/www/html/`.

```bash
# Copy the codeigniter folder to web server directory
sudo cp -R codeigniter /var/www/html/
```

!!! danger "Critical Warning! Permissions It's very important to set the folder ownership and permissions so the web server can correctly access the files. Otherwise, you may encounter "Permission Denied" errors. Don't forget to replace `your_username` in the command below with your own Linux username!"

```bash
sudo chown -R your_username:www-data /var/www/html/codeigniter
sudo chmod -R 755 /var/www/html/codeigniter
```

### Step 4: Testing the Installation 🎉

If everything went well, we've reached the testing phase which is the last step! Let's restart the web server to activate all changes.

```bash
# For Apache
sudo systemctl restart apache2

# Or if you're using Nginx
sudo systemctl restart nginx
```

Now open your favorite web browser and type `http://localhost/codeigniter` in the address bar. If you did everything correctly, you should see CodeIgniter's welcome screen! Congratulations, you've successfully completed the first step! 🚀

## Summary of What We Did

Let's quickly summarize what we did together in this guide:

- We learned the importance of web server and PHP environment needed for CodeIgniter installation.
- We downloaded CodeIgniter from the official source with `wget`.
- We extracted the downloaded files and moved them to the web server's main directory.
- We correctly set file permissions which is one of the most critical steps.
- Finally, we tested our installation through the browser and verified its successful completion.

## Next Step and Conclusion

Your CodeIgniter development environment is now ready! So, what will you do now? It's up to you to transform this blank canvas into a great project. Create your controllers, write your models and make your first database query.

Remember, this guide is for CodeIgniter 3. If you want to examine the newer version CodeIgniter 4, you can benefit from its official documentation or resources prepared by the community.

Did you encounter a problem during installation or do you have a question in mind? Share with me in the comments, let's solve together! Good luck

- You can access my tests related to [Codeigniter 4](https://github.com/Baba-Project/ci4){: target="\_blank" rel="noopener noreferrer"} version from here.

!!!note "Note: After installation is complete, you can access CodeIgniter from [http://localhost/codeigniter](http://localhost/codeigniter){: target="\_blank" rel="noopener noreferrer"} address."

- [My YouTube Channel](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){: target="\_blank" rel="noopener noreferrer"}
  You can find more videos and guides here.

[responsive_img src="/images/codeigniter-xl.webp" alt="codeigniter" /]