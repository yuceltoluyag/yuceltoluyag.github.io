---
Title: Running GitHub Actions Locally: Closing the "Trial and Error" Era with act
Date: 2026-05-08 22:45
Category: Geliştirme Araçları
Tags: github actions, act, docker, devops, git
Slug: github-actions-yerelde-test-etme-act
Authors: yuceltoluyag
Summary: Tired of committing with "test" every time you write GitHub Actions? An in-depth guide on how to test your workflows locally via Docker using act. (Guide)
Image: /images/github-actions-yerelde-test-etme-act.webp
Lang: en
Status: published
---

Is it peer pressure or those annoying commit messages like "test 1", "test 2", "please work already"? Sometimes I ask myself, why do we choose the hard way when there's an easier one? You write a yaml file, and you have to hit that `git push` command just to see if there's a tiny syntax error. Then what happens? Uncle GitHub spins and spins, then boom "Failed". Start over... It's literally technological torture.

Fortunately, I put an end to this torture the other day. You know that famous **act** (nektos/act) thing? It turns out that was our savior. It turns out we were tiring out GitHub's servers (and trashing our own commit history) for nothing.

## What is this "act" and Why Haven't I Used it Until Now?

Interestingly, this tool works with a very simple logic: it brings the environment used by GitHub Actions to your computer via Docker. So, it takes your files in the `.github/workflows` folder, spins up a Docker container, and runs everything there as if you were on GitHub.

Let's be honest, most of us go "groping in the dark" while writing GitHub Actions. The organized commit structure I mentioned in my [GitHub commit guide](/en/github-commit-atma-rehberi/) literally gasps for air during Actions trials. This is where `act` comes in. You can say, "Let me see if it works correctly before pushing."

## Before You Start: Docker is a Must (Peer Pressure is Back)

This is very important: `act` is not a magician on its own. It needs a Docker engine in the background. If Docker is not installed on your system, `act` will only give you a sad error message.

If you are using Arch Linux (which you probably are if you are an Arch lover like me), I suggest you take a look at my [Arch Linux Docker installation](/en/arch-linux-docker-kurulumu/) post. I explained everything in detail there; install it completely so that `act` doesn't give you a hard time.

### Installation: Time to Fire Up the Terminal

The installation part is actually quite painless. Since I usually like to handle everything from the terminal, I will show you that way too.

*   **Linux (Arch):** `yay -S act` or `pacman -S act`
*   **MacOS:** `brew install act`
*   **Windows:** `choco install act-cli` or `winget install nektos.act`

After the installation is finished, type `act --version` to come to your senses. Seeing that output on the screen makes you feel relieved, you say "Okay, at least we did something right."

## First Run: Meeting "act"

Installation is done, Docker is ready. Now go to the root directory of your project and type this magical command:

`act`

If you don't give any parameters, `act` starts running all jobs linked to the `push` event in order. When you run it for the first time, it will ask you which Docker image you want to use.

### Image Selection: Large, Medium, or Tiny?

When you first run it, `act` will ask you a question: "Which image do you want to use?" This is exactly a "red pill, blue pill" moment.

*   **Large:** About 17GB download, 53GB storage... It wants 75GB of free space in total! It's like a copy of the original machines on GitHub, but it leaves no room on your SSD.
*   **Medium:** About 500MB. It contains enough tools for most jobs. This is what I used, and it's my recommendation to you. Just right.
*   **Micro:** Under 200MB. It only has NodeJS. It's very limited and won't work for every Actions.

!!! warning "Docker Socket Warning"
    Don't be afraid if you get a warning like `Couldn't get a valid docker connection`. This usually happens because the `DOCKER_HOST` variable or socket access is not fully set. Make sure Docker is running, the rest will be fine.

!!! tip "Tip ⚡"
    If you want to change these choices later, you can open and manually intervene in the `C:\Users\Username\AppData\Local\act\actrc` file on Windows (or `~/.actrc` on Linux).

### Running a Specific Job

Sometimes you want to test a single job, not an entire workflow. After all, time is money, right? Here's how we do it:

`act -j build`

The `build` here is the naming under `jobs` in your yaml file. So it goes and only tests that part, it doesn't care about the rest.

## What Happened to Me: Common Problems

I'm not sure, but I think you'll get stuck the most on "Secrets" while using `act`. Those API keys and passwords you hide in that secure area on GitHub are naturally not available locally. When `act` can't see them, it crashes.

When I first tried it, I struggled for half an hour wondering "Why am I getting an env error?". It turns out it was expecting something like a `.env` file.

!!! warning "Warning! ⚠️"
    If you are using Secrets, create a `.secrets` file and add it as `MY_TOKEN=asdasd`. Then run it with this command:
    `act --secret-file .secrets`
    Don't you dare push this `.secrets` file to git by mistake, then those security measures I explained in my [git ssh key creation](/en/git-ssh-key-olusturma/) post will be in vain.

### Like the availableWidth=0 Error... (That AdSense Issue)

Recently, while dealing with AdSense ads on the blog, I got an "availableWidth=0" error, you know, the annoying one. You might get weird outputs in `act` too because of the width of containers or environment variables. If the logs get mixed up, use the `-v` (verbose) flag. Yes, the terminal will overflow with text, but at least you'll see where it crashed.

## act vs GitHub: Which One is Faster?

Let's be honest. `act` can sometimes feel slow because it spins up the Docker container from scratch every time (unless you've done the cache settings). But it's faster than pushing to GitHub and waiting for Actions to get in line anyway.

| Feature | act (Local) | GitHub Actions (Cloud) |
| :--- | :--- | :--- |
| **Speed** | Very fast if image is loaded | You might wait in line |
| **Feedback** | Instant, in terminal | In web interface |
| **Cost** | Free (Your own electricity!) | Free tier is limited |
| **Accuracy** | 95% (Some services missing) | 100% Original Environment |

The bottom line is; `act` is not a bullet, it's a shield. It protects you from unnecessary commits and time loss.

## Conclusion: You Won't Commit with "Test" Anymore!

Like the relief when I installed OpenSSL 3.x, the peace that comes when you configure `act` properly is something else. Now you can make sure everything is "Green" locally before pushing your project. 🚀

So sometimes the solution isn't trusting the cloud, but bringing that power down to your own computer. Now go and slap those unfinished workflows locally! 😎

---

### Related Posts:
- [GitHub Commit Guide](/en/github-commit-atma-rehberi/)
- [Arch Linux Docker Installation](/en/arch-linux-docker-kurulumu/)
- [Git SSH Key Creation](/en/git-ssh-key-olusturma/)

[^1]: You can reach the original documentation of the Nektos act project [here](https://nektosact.com/usage/index.html){: target="_blank" rel="noopener noreferrer"}.
[^2]: If you are getting a "Permission Denied" error inside the container, check if you are included in the docker group.
