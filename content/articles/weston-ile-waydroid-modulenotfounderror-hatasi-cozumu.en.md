Title: Installing Waydroid with Weston: ModuleNotFoundError Error and Solution
Date: 2025-10-25 03:00
Category: Linux
Tags: linux, waydroid, python, pyenv, arch-linux, troubleshooting
Slug: weston-ile-waydroid-modulenotfounderror-hatasi-cozumu
Authors: yuceltoluyag
Status: published
Summary: Learn the reasons and step-by-step solution for the frequently encountered "ModuleNotFoundError" error during Waydroid installation. Run smoothly on Weston! ⚡
Template: article
Series: Waydroid
Series_index: 3
Lang: en

---

## Introduction

Waydroid is an excellent tool that allows you to run Android applications on Linux.
However, when installing on the Weston desktop environment, many users encounter the **Python "ModuleNotFoundError" error**.
In this guide, I will explain the reasons and solution for this error step by step, especially for systems using **pyenv**.

This error usually appears as follows:

- `ModuleNotFoundError: No module named 'gbinder'`
- `ModuleNotFoundError: No module named 'tools'`

If you also received one of these errors, you're in the right place 💡
Now let's see the root cause of the problem and how to solve it together.

---

## Encountered Errors

### Error 1: `ModuleNotFoundError: No module named 'gbinder'`

When you try to start the Waydroid session, you may encounter the following error:

```bash
$ waydroid session start
Traceback (most recent call last):
  File "/usr/bin/waydroid", line 7, in <module>
    import tools
  File "/usr/lib/waydroid/tools/__init__.py", line 12, in <module>
    from . import actions
  ...
  File "/usr/lib/waydroid/tools/interfaces/IPlatform.py", line 1, in <module>
    import gbinder
ModuleNotFoundError: No module named 'gbinder'
```

### Error 2: `ModuleNotFoundError: No module named 'tools'`

After solving the first error, sometimes a second error appears:

```bash
$ waydroid session start
Traceback (most recent call last):
  File "/usr/bin/waydroid", line 7, in <module>
    import tools
ModuleNotFoundError: No module named 'tools'
```

These two errors are caused by incompatibility between the Python interpreter and Waydroid's runtime environment on the system.

---

## Root Cause of the Problem

The main reasons for these errors are as follows:

1. **Pyenv PATH priority:**
   The `/usr/bin/python3` symlink may have been pointed to pyenv's own Python version.

2. **Wrong Shebang:**
   The Waydroid script uses the `#!/usr/bin/env python3` line.
   This line calls the first Python interpreter in the PATH - which is usually the pyenv version.

3. **Missing module path:**
   Waydroid's own module directory (`/usr/lib/waydroid`) is not included in the Python path.

!!! note "These errors are usually caused by conflicts between pyenv and system Python ⚡"

---

## Step-by-Step Solution

### 1. Check Which Python Is Being Used

First, let's check which Python interpreter is running on the system:

```bash
which python3
# Sample output: /home/user/.pyenv/shims/python3
```

To see where the system Python is located:

```bash
ls -la /usr/bin/python3*
```

Here you will see the real system Python (for example `python3.13`).

!!! tip "Pyenv shadows the system Python by changing the PATH order. Therefore, it is very important to identify the correct interpreter 💡"

---

### 2. Check Required Packages

Make sure the Python modules required for Waydroid are installed:

```bash
pacman -Qs gbinder
```

The following packages must be installed:

- `libgbinder`
- `python-gbinder`

If missing, you can install with the following command:

```bash
sudo pacman -S libgbinder python-gbinder
```

---

### 3. Fix Python Symlink

If `/usr/bin/python3` points to the wrong version, you should redirect it to the correct version:

```bash
sudo rm /usr/bin/python3
sudo ln -sf python3.13 /usr/bin/python3
```

!!! warning "This operation affects the entire system ⚠️ Connecting to the wrong Python version can cause errors in other applications."

To verify:

```bash
/usr/bin/python3 -c "import gbinder; print('✓ gbinder is working')"
```

---

### 4. Edit Waydroid Script

Open the Waydroid script file:

```bash
sudo nano /usr/bin/waydroid
```

Edit the file as follows:

```python
#!/usr/bin/python3
# SPDX-License-Identifier: GPL-3.0-or-later
import os
import sys

# Add waydroid library path
sys.path.insert(0, "/usr/lib/waydroid")

import tools

if __name__ == "__main__":
    os.umask(0o0022)
    sys.exit(tools.main())
```

!!! tip "These two changes are very critical 💡 1️⃣ Shebang line corrected to `/usr/bin/python3`. 2️⃣ `/usr/lib/waydroid` path added to Python path."

---

### 5. Test Waydroid

After the edits, check that Waydroid is working:

```bash
waydroid status
```

Sample output:

```
Session:	STOPPED
Vendor type:	MAINLINE
```

If everything is on track, you have now overcome the errors 🎉

---

## Using Waydroid in Weston Environment

To start Waydroid on the Weston desktop:

```bash
waydroid session start
waydroid show-full-ui
```

Or as a shortcut:

```bash
waydroid first-launch
```

### Starting Applications

```bash
waydroid app list
waydroid app launch com.android.settings
```

### Stopping Waydroid

```bash
waydroid session stop
```

!!! note "Properly terminating the session before shutting down Waydroid ensures that system resources are released ⚙️"

---

## Alternative Method: Solution via PATH

If you don't want to change the symlink, you can temporarily disable pyenv:

```bash
env PATH="/usr/local/sbin:/usr/local/bin:/usr/bin" waydroid session start
```

!!! tip "With this method, pyenv is temporarily disabled and system Python is used 💡"

---

## Additional Troubleshooting

### gbinder still not found

```bash
pacman -Ql python-gbinder | grep -E "\.so$"
```

If the output is empty, the module may not have been installed in the correct directory. Try reinstalling.

### Permanent Solution for Pyenv Conflict

```bash
echo 'alias waydroid="env PATH=\"/usr/local/sbin:/usr/local/bin:/usr/bin\" waydroid"' >> ~/.bashrc
source ~/.bashrc
```

!!! tip "Thanks to this alias, Waydroid always uses system Python 💪"

---

## Conclusion

In this guide, we examined the reasons and solutions for the
**ModuleNotFoundError: No module named 'gbinder' / 'tools'** errors encountered when installing Waydroid on the Weston desktop environment.

To solve the problem:

1. We identified the correct Python interpreter
2. We edited the Waydroid script
3. We provided an alternative solution with PATH manipulation

After these steps, you can run Waydroid smoothly 🚀
Enjoy the Android experience on Linux! 🎯

---

## Resources

- [Waydroid Documentation](https://docs.waydro.id/){: target="\_blank" rel="noopener noreferrer"}
- [Arch Linux Wiki - Waydroid](https://wiki.archlinux.org/title/Waydroid){: target="\_blank" rel="noopener noreferrer"}
- [Python Docs - ModuleNotFoundError](https://docs.python.org/3/library/exceptions.html#ModuleNotFoundError){: target="\_blank" rel="noopener noreferrer"}

---

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="HVQBmWN5ZaU"></lite-youtube>
