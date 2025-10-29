Title: Creating Git SSH-Key (Windows & Linux)
Date: 2018-09-21 12:00 10:00
Modified: 2025-08-11 22:59
Category: Git
Tags: git,github, ssh
Slug: git-ssh-key-olusturma
Authors: yuceltoluyag
Series: Git
Series_index: 1
Summary: In this guide, we explain step by step how to create SSH keys on Windows and Linux platforms to solve problems encountered when creating SSH keys while working with Git.
Translation: true
Status: published
Template: article
Image: images/git_bash-xl.webp
Lang: en

In this guide for those experiencing problems creating SSH keys while working with Git, we'll cover the SSH key creation process step by step for both Windows and Linux users. 🛠️


### Creating SSH-Key for Windows

1. Download and install Git Bash application from [https://git-scm.com/downloads](https://git-scm.com/downloads){: target="_blank" rel="noopener noreferrer"}.
2. Open the terminal and run the following commands in order:

```bash
git config --global user.name "Your User Name"
git config --global user.email "your-email-address.com"
ssh-keygen
```

3. After running the commands, press `Enter` key for all options that appear.
4. After the key is created, go to `C:\Users\yourusername\.ssh` directory and open the `id_rsa.pub` file with Notepad.
5. Copy the key codes inside the file.
6. Go to [GitHub SSH Keys Settings](https://github.com/settings/keys){: target="_blank" rel="noopener noreferrer"} page, click the **New SSH Key** button, paste the codes you copied and save.

[responsive_img src="/images/git_bash-xl.webp" alt="gitbash" /]
### Creating SSH-Key for Linux

1. Open Git Bash or terminal and run the following commands:

```bash
git config --global user.name "Your User Name"
git config --global user.email "your-email-address.com"
ssh-keygen -t rsa -b 4096 -C "your-email-address.com"
ssh-add ~/.ssh/id_rsa
```

2. After running the commands, press `Enter` key for all options that appear.
3. After the key is created, copy the content of `~/.ssh/id_rsa.pub` file.
4. Go to [GitHub SSH Keys Settings](https://github.com/settings/keys){: target="_blank" rel="noopener noreferrer"} page, click the **New SSH Key** button, paste the codes you copied and save.

✅ Now you can securely perform operations on GitHub using your SSH key!



With this guide, you can easily complete the SSH key creation process for both Windows and Linux users. 🚀