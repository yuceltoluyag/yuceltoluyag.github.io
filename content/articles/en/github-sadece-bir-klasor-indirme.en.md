Title: Downloading Only a Specific Folder from GitHub: Sparse Checkout
Date: 2025-10-27 03:15
Category: Git
Tags: git, github, sparse-checkout, linux, rehber
Slug: github-sadece-bir-klasor-indirme
Authors: yuceltoluyag
Status: published
Summary: Don't download the entire GitHub repo, just download a specific folder. Save time and disk space with the sparse checkout method.
Template: article
Series: Git
Series_index: 9
Lang: en
Image: images/git-sparse-checkout-rehberi-xl.webp
toot: https://mastodon.social/@yuceltoluyag/115487292715622222
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m57k66a4fc2d


## Introduction

In some projects, instead of downloading the entire repository on GitHub, you may need **only a specific folder**.
For example, you might want to take only design files from a large project. In this guide, I'll show you step by step how to do this with the **Git Sparse Checkout** method ⚡

At the end of this guide:

- You'll be able to download only the folder you want,
- You'll save time and disk space by getting rid of unnecessary files,
- You'll be able to easily apply in Arch Linux and other Linux distributions.

---

## What is Sparse Checkout?

**Git Sparse Checkout** is a feature that allows you to pull only specific files or folders from a Git repository instead of the entire repository.

### Advantages

- Reduces download time in large repositories,
- Saves disk space,
- You don't have to deal with unnecessary files.

---

## Step by Step Implementation

### 1️⃣ Create a New Folder and Initialize Git

```bash
mkdir pico-v2 && cd pico-v2
git init
```

### 2️⃣ Add Remote Repository

```bash
git remote add origin https://github.com/picocss/examples.git
```

### 3️⃣ Enable Sparse Checkout

```bash
git config core.sparseCheckout true
```

### 4️⃣ Specify the Folder You Want to Download

```bash
echo "v2-sass-customized-design-system/" >> .git/info/sparse-checkout
```

!!! tip "Attention 💡 The folder path should be written according to the repository root directory."

### 5️⃣ Download Only the Relevant Folder

```bash
git pull origin master
```

!!! warning "Branch check ⚠️ If the repository uses the `main` branch, you should use `git pull origin main`."

---

## Result

Now only the folder you need has been downloaded:

```
pico-v2/v2-sass-customized-design-system/
```

### Summary

- You can pull only specific folders without downloading the entire GitHub repository.
- Sparse checkout saves time and disk in large projects.
- Can be easily applied on Linux ⚡

---

## Resources

- [GitHub Repository](https://github.com/picocss/examples){: target="\_blank" rel="noopener noreferrer"}
- [Git Sparse Checkout Documentation](https://git-scm.com/docs/git-sparse-checkout){: target="\_blank" rel="noopener noreferrer"}

This feature exists in GitLab UI, why doesn't GitHub UI have it? 🤔

[responsive_img src="/images/git-sparse-checkout-rehberi-xl.webp" alt="Git Sparse Kullanımı" /]
