Title: Reverting to a Specific Commit in Git and Using Cherry-Pick
Date: 2025-03-28 18:00
Modified: 2025-08-11 22:59
Category: Git
Tags: git, version-control, commit, rollback, cherry-pick
Slug: git-commit-geri-donme-cherry-pick
Authors: yuceltoluyag
Series: Git
Series_index: 5
Summary: We explain the methods you can use to revert to a specific commit in Git and move selected changes to a different branch with git cherry-pick command. 🚀
Translation: true
Status: published
Template: article
Image: images/git-chery-xl.webp
Lang: en

## Reverting to a Specific Commit in Git and Using Cherry-Pick 🎯

Version control systems, especially Git, provide quite powerful tools for managing changes in your projects. **Sometimes you may want to go back to a specific commit or move the content of a specific commit to a different branch.** In this article, we will explain how to use `git reset`, `git checkout` and `git cherry-pick` commands. 🛠️

## Commit Reversion Methods 🔄

### **1. Temporarily Going Back (Detached HEAD Mode)**

If you only want to examine the content of a specific commit, you can use the following command:

```bash
git checkout 86d538b
```

This command **brings your project to the state of that commit** but you work in **detached HEAD** mode. If you want to work on this commit, you can create a new branch:

```bash
git checkout -b old-version 86d538b
```

### **2. Permanently Going Back (`git reset`)**

If you want to go back to an old commit by **changing the history**, you can use the following command:

```bash
git reset --hard 86d538b
```

This command **permanently** deletes all changes and reverts the project to that commit. **Caution:** If you have sent the changes to the remote repository (`git push`), you need to update it forcefully:

```bash
git push --force
```

⚠️ **Warning:** The `--force` parameter should be used carefully if you are working with a team.

### **3. Reverting a Specific Commit (`git revert`)**

If you only want to undo the changes made by a single commit:

```bash
git revert 86d538b
```

This command creates a **new commit that reverses the changes** made by the specified commit. **The existing history is preserved**, making it safer for team collaboration. 🤝

---

## Using `git cherry-pick` 🍒

Sometimes, you may want to move a specific commit from one branch to another. For this purpose, the `git cherry-pick` command is used.

### **1. Moving a Single Commit to Another Branch**

Let's say you are in the `feature` branch and want to take the commit `86d538b` that is in the `main` branch:

```bash
git cherry-pick 86d538b
```

This operation **adds the specified commit to your current branch**.

### **2. Moving Multiple Commits by Selection**

If you want to take multiple commits, you can run the command with spaces between them:

```bash
git cherry-pick 86d538b 12a4ef9 f45c8d7
```

### **3. Selecting a Specific Commit Range**

If you want to take a commit range:

```bash
git cherry-pick 86d538b..f45c8d7
```

This command applies all commits between `86d538b` and `f45c8d7` to the current branch. 🚀

### **4. What Should I Do in Case of Conflict?**

If a **conflict (merge conflict)** occurs during `git cherry-pick`:

1. Check which files have conflicts with the `git status` command.
2. Resolve the conflicts manually.
3. After finishing the resolution, run the following command to complete the commit:

```bash
  git cherry-pick --continue
```

If you want to abort the operation:

```bash
git cherry-pick --abort
```

This command aborts the cherry-pick operation and reverts to the previous state.

---

## **Conclusion ✅**

There are many methods you can use to revert to a specific commit in Git or move specific commits to different branches. You can perform operations by determining which method is most suitable for you.

🚀 **In summary:**

- You can temporarily go back to a previous commit with `git checkout`.
- You can completely go back with `git reset --hard`.
- You can revert only a specific commit with `git revert`.
- You can move specific commits to a different branch by selecting them with `git cherry-pick`.

If you have other questions about Git, you can leave a comment! Happy coding! 🎉

[responsive_img src="/images/git-chery-xl.webp" alt="git-commit-geri-donme-cherry-pick" /]