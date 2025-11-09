Title: Running Commands Without a Password Using Sudoers in Linux
Date: 2025-11-09 16:30
Modified: 2025-11-09 16:45
Category: Linux
Tags: sudoers, linux security, sudo, automation
Slug: linux-sudoers-sifresiz-komut-cozumu
Authors: yuceltoluyag
Summary: If you're getting a 'sudo: a password is required' error due to sudoers configuration, this guide explains the cause and provides secure, step-by-step solutions.
Lang: en
Status: published
Template: article
Image: images/linux-sudoers-sifresiz-komut-xl.webp

## Introduction

Sometimes you write a script and have to enter a password every time—annoying, right? 😅
In this article, I'll address the **sudoers passwordless command execution** issue in a simple, friendly tone; I'll go step-by-step to show the source of the error and its secure solutions.

## Source of the Problem

In modern desktop environments like Wayland, `xset` may not work; instead, you need to write to the `/sys/class/leds/inputX::scrolllock/brightness` file to change keyboard lights.
Writing to this file requires root privileges[^1]. If you used `sudo tee` in your script, the system might constantly ask for a password. The typical reminder for this is:

```bash
sudo: a password is required
```

Often, the reason is an incorrect or missing permission definition in the `sudoers` file.

## Why is a Correct Permission Definition Important?

- If you don't specify the **full path** of the program in the `sudoers` line, the system can't match the permissions.
- If the arguments given to the command do not match the permission definition, the operation will still ask for a password.
- There might be a syntax error in `/etc/sudoers` or `/etc/sudoers.d/`—which can lead to unexpected behavior.

!!! warning "Caution! Editing the `sudoers` file incorrectly can affect the system; always make changes with `visudo` ⚠️"

## Solution: Step-by-Step

### 1. Use the Full Path of the Program

Writing the full path of the command in the `sudoers` file is the most basic rule. For example, for `tee`:

```sudoers
friday13 ALL=(ALL) NOPASSWD: /usr/bin/tee
```

This line grants permission to run the `/usr/bin/tee` command with all arguments without a password. ✅

### 2. Use an Alias for Multiple Commands

If you want to grant permission for multiple tools, creating a group is more organized:

```sudoers
Cmnd_Alias MYTOOLS = /usr/bin/tee, /usr/bin/pacman, /usr/bin/aurman
friday13 ALL=(ALL) NOPASSWD: MYTOOLS
```

!!! tip "Tip ⚡ By using Cmnd_Alias, you group permissions; this makes management easier."

### 3. Keep Changes Under `/etc/sudoers.d/`

Instead of directly editing the main `sudoers` file, create a separate file:

```bash
sudo visudo -f /etc/sudoers.d/10_mytools
```

Example file content:

```sudoers
Cmnd_Alias MYTOOLS = /usr/bin/tee, /usr/bin/pacman, /usr/bin/aurman
friday13 ALL=(ALL) NOPASSWD: MYTOOLS
```

This method both maintains order and simplifies management.

### 4. Testing Methods

To verify the changes, apply these steps:

```bash
sudo -k  # Clear the sudo cache
sudo -n /usr/bin/tee /sys/class/leds/input4::scrolllock/brightness <<< 1
sudo -l  # List the user's sudo permissions
```

The `sudo -n` command attempts to run without asking for a password; if it doesn't give an error, your setting is working correctly. ✅

## Common Pitfalls and Things to Watch Out For

!!! warning "Caution! Granting broad `NOPASSWD` permission can lead to serious security vulnerabilities ⚠️"

!!! note "Note: Regularly check which commands are permitted with `sudo -l`."

## Summary

- It is mandatory to specify the **full path** in `sudoers`.
- Group permissions using `Cmnd_Alias` for easier management.
- Keep changes in `/etc/sudoers.d/` and edit with `visudo`.
- Verify by testing with `sudo -n` and `sudo -l`.

## Useful Commands

```bash
sudo visudo -f /etc/sudoers.d/10_mytools
sudo -k
sudo -n /usr/bin/tee /sys/class/leds/input4::scrolllock/brightness <<< 1
sudo -l
```

## Resources

ArchWiki: [Sudo - Root access](https://wiki.archlinux.org/title/Sudo){: target="\_blank" rel="noopener noreferrer"}
`man sudoers`

## Conclusion

With these steps, you can solve the `sudoers passwordless command execution` problem securely and permanently.
When you try it, write the result or which commands you allowed in the comments—let's build more secure settings together! 🎉

[^1]: Refers to the permission to access critical files and settings on the system.

[responsive_img src="/images/linux-sudoers-sifresiz-komut-xl.webp" alt="Linux Sudoers passwordless operation" /]
