Title: What are .pacsave Files in Arch Linux? (Safe Usage)
Date: 2025-11-15 17:13
Category: Linux
Tags: pacsave, pacman, arch linux, sorun giderme
Slug: arch-linux-pacsave-dosyalari
Authors: yuceltoluyag
Summary: What are .pacsave files in Arch Linux? I explain why your settings aren't deleted when you remove a package and how to safely manage these backups.
Image: images/arch-linux-pacsave-dosyalari-xl.webp
Lang: en
Status: published
toot: https://mastodon.social/@yuceltoluyag/115553534312259706
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6psml5kks2e

In a previous post, we talked about how much of a headache `.pacnew` files can be, right? Those files usually scream, "Watch out, new settings are here!" But what about these `.pacsave` files? They appear in the opposite situation and are usually a good thing.

You remove a package, and then you lament, "Oh no, all my settings are gone!" Well, `.pacsave` is Pacman's little safety net in Arch Linux that saves you from this situation. These files are closely related to `.pacnew`, but they appear in a completely opposite scenario.

## What Exactly is a .pacsave File?

In short, a `.pacsave` file is Pacman's method of backing up _modified_ configuration files belonging to a package **when you remove it**, instead of throwing them away. This is Pacman's way of saying, "Trust me, you'll need this."

Let's go through an example:

Suppose you installed `apache` and meticulously edited the `/etc/httpd/conf/httpd.conf` file. Then one day you decide to remove `apache`: `sudo pacman -R apache`.

Pacman looks at that file and says, "Wow, this person modified this." Instead of deleting it, it renames it like this:

`/etc/httpd/conf/httpd.conf.pacsave`

This file contains your old, valuable configuration. But what if you hadn't touched that file at all, meaning you left it as is? Then Pacman would say, "This is already standard, let it go to trash," and delete it. 🚮

## Why Does Pacman Create .pacsave Files?

Pacman's job is to keep the system consistent, yes, but also to protect your work. Configuration files often contain personal or system-specific changes.

When removing a package, it asks itself a simple question: "Has this config file been touched?"

- If the answer is **'No'**? It deletes it.
- If the answer is **'Yes'**? It creates a `.pacsave`.

It's that simple. This logic prevents you from losing valuable settings when you temporarily remove software. Even with commands like `pacman -Rns`, which clean up no-longer-needed dependencies, Pacman protects your modified files as `.pacsave` for safety.

## How Do I Find All .pacsave Files on My System?

So, is my system full of these 'safety net' files? It's very easy to find out.

The `find` command is the classic way to do this:

```bash
sudo find /etc -type f -name "*.pacsave"
```

But if you're a bit more 'organized' 🤓 like me, who wants to manage both `.pacnew` and `.pacsave` from one place, I recommend installing the `pacman-contrib` package.

```bash
sudo pacman -S pacman-contrib
```

Once this package is installed, all you need to type in the terminal is:

```bash
sudo pacdiff
```

This great tool shows you both new configuration files (`.pacnew`) and these backed-up old files (`.pacsave`) in a single interface, perfectly.

## Restoring Old Settings (Guide)

Let's say you reinstalled `apache` and thought, "Oh, where were my old settings?" To restore a `.pacsave` file, you just need to rename it.

```bash
sudo mv /etc/httpd/conf/httpd.conf.pacsave /etc/httpd/conf/httpd.conf
```

Of course, after bringing the file back, don't forget to restart the relevant service:

```bash
sudo systemctl restart httpd
```

That's it. Your old settings are back in seconds.

## When Should I Delete .pacsave Files?

This is important.

!!! danger "Critical Warning 🛑 Think twice before deleting a `.pacsave` file. You can safely delete it only in these situations:"

1. If you are sure you will _never_ install that package again.
2. If you looked inside the file (with `cat` or `nano`) and said, 'There's nothing important here.'

If you are sure, the delete command is simple:

```bash
sudo rm /etc/httpd/conf/httpd.conf.pacsave
```

I usually move them to a place like `~/backups/` instead of deleting them. Just in case... I guess I'm a bit of a hoarder. 😅

```bash
sudo mv /etc/httpd/conf/httpd.conf.pacsave ~/backups/
```

## Quick Q&A (Confusion Reducer)

Let's quickly answer a few classic questions:

- **Q: What's the difference between `.pacnew` and `.pacsave`?**

  - **A:** `.pacnew` comes during an **update** (System: "Look, this is the config file for the new version, different from yours"). `.pacsave` comes during a **removal** (System: "You modified this file, I'm deleting it but here's a backup").

- **Q: Can I delete `.pacsave` files immediately?**

  - **C:** You can, but don't. Take a look inside. Maybe you'll reinstall that package in 3 months and need those settings.

- **Q: Does every package create a `.pacsave`?**

  - **C:** No. It only occurs when packages that (1) contain a configuration file AND (2) you have modified that file are removed.

- **Q: How do I manage both?**

  - **C:** Install `pacman-contrib` and use `sudo pacdiff`. It makes your life easier.

### The Bottom Line...

In short, `.pacsave` files are one of Pacman's smartest features. They are a safety net 🕸️ for you. Running a `pacdiff` command (or `find` command) after every package removal and taking a look at these files keeps your `/etc` directory clean and ensures you don't lose valuable configurations.