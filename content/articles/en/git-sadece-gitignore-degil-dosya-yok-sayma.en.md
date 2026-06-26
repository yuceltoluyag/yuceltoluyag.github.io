Title: You're Not Locked into .gitignore in Git: 3 Different Ways to Ignore Files
Date: 2026-06-26 02:50
Category: Git
Tags: Git, Version Control, Yazılım, Geliştirme Araçları, DevOps
Slug: git-sadece-gitignore-degil-dosya-yok-sayma
Authors: yuceltoluyag
Status: published
Summary: Did you know that ignoring files in Git isn't limited to just .gitignore? We discuss project-specific and global file ignoring methods.
Template: article
Lang: en

Over the weekend, while cleaning up the commit history of my old open-source projects, I felt my face turn red. Years ago, I had accidentally pushed scratch notes, temporary files like 'todo.txt', and local debug scripts that only run on my computer. I hadn't wanted to litter the shared `.gitignore` file of the project with my personal notes just to avoid bothering other developers in the team, but at the end of the day, everything was exposed. I am sure this has happened to most of us.

If you've been coding with Git for years and think the only way to ignore files is throwing a `.gitignore` file into the root directory of your project, you're not alone. However, Git offers three different levels for ignoring files[^1]:

1. Shared level with the project: `.gitignore`
2. Project-specific but local (unshared) level: `.git/info/exclude`
3. Machine-wide (global) level: `~/.config/git/ignore`

Polluting a shared `.gitignore` file with temporary files that only exist on your machine is like putting your personal shoe rack right at the building's common entrance door. That's why, my friend, today we will talk about these secret chambers of Git and where we should store which files.

---

## 📂 1. The Classic Method: `.gitignore`

That famous file living in the root directory of the project, which we all know. This file is included in Git history, committed, and shared with everyone cloning the repo.

* **When to use:** For files common to all developers in the project. For example: `node_modules/`, Python's `__pycache__/` directory, compiled outputs (`dist/`, `build/`), or IDE config directories (`.vscode/`, `.idea/`).

!!! note "Important Note: Tracked Files ⚠️"
    Git's ignore rules only apply to files that are not yet tracked (untracked).[^1] If you committed a file before, Git will continue to track it even if you add it to `.gitignore` or the `exclude` file. To untrack these files, you need to use the `git rm --cached <file_path>` command.

---

## 🔒 2. Project-Specific Secret Ignore: `.git/info/exclude`

Inside every Git repository, there is a hidden `.git` folder. The `info/exclude` file under this directory is a local ignore list that is specific to that project but is **never included** in Git history.

* **When to use:** For files that are unique to your own workflow and do not concern other members of the team. For example: temporary development notes (`notes.txt`), scratch scripts you write to test things but don't want to commit (`try.py`), or analysis files used only in your local environment.
* **How to use:** Open `.git/info/exclude` with any text editor and write the file names you want to ignore line by line, just like you would write in a standard `.gitignore`.

---

## 🌍 3. Machine-Wide Ignore: `~/.config/git/ignore`

Located under your user home directory in your operating system (`~/.config/git/ignore`), this file is a global ignore list that applies to **all Git projects** opened on your computer.

* **When to use:** For garbage files created in every project by the OS or the editors you use. For example: `.DS_Store` files if you are on macOS, `Thumbs.db` on Windows, or OS-level temp directories. Instead of writing these in every single project's `.gitignore` file, you can write them here once and be done with it for life.
* **Defining a Custom Path:** If you want to keep this global file in another location (for instance, directly in your home directory as `.gitignore_global`), you can update Git's configuration parameter[^2] with the following command:

```bash
$ git config --global core.excludesFile ~/.gitignore_global
```

* If you want to return to default settings:

```bash
$ git config --global --unset core.excludesFile
```

---

## 🔍 Finding Out Where a File is Blocked From

When we distribute ignored files to these three different places, after a while, you might ask, "Hey, why isn't this file showing up in Git, which rule is blocking it?" Git offers a fantastic command to clear up this confusion: `git check-ignore -v <file_path>`

For example, let's query why `.DS_Store` is not appearing in your project:

### Scenario A: If the project's `.gitignore` is blocking it:
```bash
$ git check-ignore -v .DS_Store
.gitignore:1:.DS_Store  .DS_Store
```
*(The output clearly states it's blocked due to line 1 of `.gitignore`).*

### Scenario B: If the project's local `.git/info/exclude` is blocking it:
```bash
$ git check-ignore -v .DS_Store
.git/info/exclude:7:.DS_Store   .DS_Store
```

### Scenario C: If the global `~/.config/git/ignore` is blocking it:
```bash
$ git check-ignore -v .DS_Store
/home/yucel/.config/git/ignore:2:.DS_Store  .DS_Store
```

If the file name you enter is not blocked by any rules, the command will return no output.

All in all, using these three levels properly to avoid polluting shared repos with personal files and to prevent "accidentally pushed" mishaps is a professional developer reflex.

## 🔗 Related Posts
- [Git Undo Commit and Cherry-Pick](/en/git-commit-geri-donme-cherry-pick/)
- [Git GPG Signed Commits, VS Code & Arch Linux](/en/git-gpg-imzali-commit-vscode-arch/)

[^1]: Applies to files that Git is not tracking yet (untracked). Tracked files continue to be watched even if added to the ignore list.
[^2]: The configuration parameter that sets the file path Git will use as the global ignore list.
