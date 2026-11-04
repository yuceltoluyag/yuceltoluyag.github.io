Title: Backing Up and Restoring SSH and GPG Keys
Date: 2025-03-04 10:00
Modified: 2026-11-05 00:52
Category: Git
Tags: ssh, gpg, ed25519, git, key management, backup, security
Slug: ssh-gpg-yedekleme-geri-yukleme
Authors: yuceltoluyag
Series: Git
Series_index: 3
Summary: Learn how to back up and restore SSH and GPG keys when migrating to a new Linux system. This practical guide covers Ed25519, SSH Agent, GPG commit signing, key expiration, and GitHub verification.
Status: published
Template: article
Image: images/ssh-gpg-yedekleme-geri-yukleme-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/114985374923504182
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrshibzbk27

## Backing Up and Restoring SSH and GPG Keys 🔑

Reinstalling Linux or moving to a new computer involves more than just transferring your Git repositories. You also need to restore the keys you use to authenticate with services like GitHub over SSH and sign your Git commits with GPG.

In this guide, we'll walk through backing up SSH and GPG keys, restoring them on a new Linux system, and getting your GitHub development environment working again.

First, it's important to understand the difference between these two key types:

- **SSH:** Used to authenticate with services such as GitHub and establish secure connections to Git repositories.
- **GPG:** Used to sign Git commits and allow others to verify that a signature was created using the corresponding private key.

These are two independent mechanisms. Having a working SSH connection does not mean your GPG commit signing is configured correctly.

## 1. Backing Up SSH and GPG Keys 💾

Before creating a backup, let's identify the keys currently available on your system.

### Backing up SSH keys

SSH keys are usually stored in the `~/.ssh/` directory.

List its contents with:

```bash
ls -la ~/.ssh/
```

A typical directory may contain files like these:

```text
id_ed25519
id_ed25519.pub
known_hosts
known_hosts.old
config
```

Here's what these files do:

- `id_ed25519`: Your private SSH key. Never share it with anyone.
- `id_ed25519.pub`: Your public SSH key. This is the key you add to GitHub.
- `known_hosts`: Stores host identity information for servers you have previously connected to.
- `config`: Contains your custom SSH connection settings.

You can back up the entire directory to a secure location:

```bash
cp -a ~/.ssh /mnt/usb/
```

This copies the `.ssh` directory, including its files and subdirectories.

**Important:** Store backups containing private keys in an encrypted location. You don't want your private keys to fall into the wrong hands if your USB drive is lost or accessed by someone else.

### Backing up your GPG private key

First, list the GPG keys available on your system:

```bash
gpg --list-secret-keys --keyid-format=long
```

Example output:

```text
sec   rsa4096/8416A43957C19627 2022-04-25 [SC]
      EA8B0CD56D5A2C4FB60CABDF8416A43957C19627
uid   yucel-arch <ytoluyag@gmail.com>
```

The `sec` entry represents your secret key, while the `uid` entry contains the associated user identity.

Use the key ID to export your private key:

```bash
gpg --armor --export-secret-keys 8416A43957C19627 > my-private-key.asc
```

You can also export the public key separately:

```bash
gpg --armor --export 8416A43957C19627 > my-public-key.asc
```

If you want to preserve your GPG ownertrust settings as well, export them:

```bash
gpg --export-ownertrust > ownertrust.txt
```

Set appropriate file permissions:

```bash
chmod 600 my-private-key.asc
chmod 644 my-public-key.asc
chmod 600 ownertrust.txt
```

You now have separate backup files for your private key, public key, and GPG trust settings.

**Note:** `ownertrust.txt` does not contain your keys. It stores your trust assessments for other keys and can optionally be restored later.

## 2. Restoring Keys on a New Linux System 🛠️

Start by creating the SSH directory on your new system:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

### Restoring SSH keys

Copy the files from your backup into the `.ssh` directory.

For example:

```bash
cp /mnt/usb/.ssh/id_ed25519 ~/.ssh/
cp /mnt/usb/.ssh/id_ed25519.pub ~/.ssh/
cp /mnt/usb/.ssh/known_hosts ~/.ssh/
```

If you use a custom SSH configuration, restore that too:

```bash
cp /mnt/usb/.ssh/config ~/.ssh/
```

Set the correct file permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 644 ~/.ssh/known_hosts
```

SSH may refuse to use a private key if its permissions allow other users to read it. That's why setting the correct permissions is important.

Now start the SSH Agent:

```bash
eval "$(ssh-agent -s)"
```

Add your private key to the agent:

```bash
ssh-add ~/.ssh/id_ed25519
```

To verify that the key was added successfully:

```bash
ssh-add -l
```

### Testing your SSH connection

Test your connection to GitHub:

```bash
ssh -T git@github.com
```

If authentication succeeds, you should see a message similar to this:

```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

This message confirms that SSH authentication is working.

Remember that your public key must also be registered in your GitHub account.

[GitHub SSH and GPG Keys](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} 

### Restoring GPG keys

Once SSH is configured, import your GPG private key.

From the directory containing your backup:

```bash
gpg --import my-private-key.asc
```

GPG should report that your secret key was successfully imported.

Verify the imported key:

```bash
gpg --list-secret-keys --keyid-format=long
```

You can also import your public key and ownertrust settings:

```bash
gpg --import my-public-key.asc
gpg --import-ownertrust ownertrust.txt
```

If your public key was already imported together with the private key, importing it again is unnecessary.

## 3. Restoring Git Commit Signing Configuration ✍️

Importing your GPG key alone is not enough. You also need to tell Git which key to use when signing commits.

First, check your Git identity:

```bash
git config --global --get user.name
git config --global --get user.email
```

Make sure your email address matches the identity associated with your GPG key and GitHub account.

Configure Git to use your GPG key:

```bash
git config --global user.signingkey 8416A43957C19627
```

Enable commit signing by default:

```bash
git config --global commit.gpgsign true
```

You can also explicitly configure Git to use OpenPGP:

```bash
git config --global gpg.format openpgp
```

From now on, Git will use your GPG key when creating commits.

To create a test commit in any Git repository:

```bash
git commit --allow-empty -S -m "Test GPG signing"
```

Verify the signature locally:

```bash
git log -1 --show-signature
```

A successful local verification confirms that your key and signature are working. However, GitHub's `Verified` status must be checked separately.

## 4. Handling Expired GPG Keys ⏳

GPG keys can have expiration dates. Even if you successfully import your private key after moving to a new system, the key itself may already be expired.

Check your key's status:

```bash
gpg --list-secret-keys --keyid-format=long
```

For example:

```text
sec   rsa4096/8416A43957C19627 2022-04-25 [SC] [expired: 2025-08-23]
```

In this situation, your private key is available, but its expiration date has passed.

### Extending the GPG key's expiration date

Open the key editor:

```bash
gpg --edit-key 8416A43957C19627
```

At the GPG prompt, enter:

```text
gpg> expire
```

Specify a new expiration period. For example, to extend it by two years:

```text
Key is valid for? (0) 2y
```

Confirm the new expiration date and save your changes:

```text
gpg> save
```

Check the updated key information:

```bash
gpg --list-secret-keys --keyid-format=long
```

**Important:** This example extends the expiration date of the primary key. If your key has subkeys, check their expiration dates separately. You can use the `list` and `key` commands in the GPG key editor to inspect and select subkeys before changing their expiration dates.

### Updating your GPG key on GitHub

Extending your GPG key's expiration date locally does not automatically update the public key registered on GitHub.

Export the updated public key:

```bash
gpg --armor --export 8416A43957C19627
```

Then check the registered key under **Settings → SSH and GPG keys** in your GitHub account.

[GitHub GPG Keys](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} 

If GitHub still marks the registered key as expired, you may need to manage the existing key entry. Trying to add the same key again can result in messages such as `Key already exists` or `Public key already exists`.

In that case, removing the old entry and adding the updated public key may be necessary. However, before deleting an existing entry, check GitHub's current GPG key management and signature verification behavior, as this may affect how previously signed commits are verified.

## 5. Verifying Commit Signatures on GitHub (Verified) ✅

Finally, let's verify that GitHub recognizes your GPG signatures.

Create a new signed commit in a Git repository:

```bash
git commit --allow-empty -S -m "Test GPG signing"
```

Push it to GitHub:

```bash
git push
```

Open the commit on GitHub.

If GitHub recognizes and successfully verifies the signature, you should see the **Verified** label next to the commit.

Keep in mind that these are two separate checks:

- `git log -1 --show-signature`: Verifies the signature locally.
- GitHub `Verified`: Indicates that GitHub recognizes and verifies the signature.

If local verification succeeds but GitHub displays `Unverified`, check your registered GPG key, its expiration date, and the email address associated with your commit.

## 🎯 Conclusion

You don't have to lose your SSH and GPG keys when reinstalling Linux or moving to a new computer.

In this guide, we've covered:

- Backing up and restoring Ed25519 SSH keys.
- Using SSH Agent to make your keys available.
- Exporting and importing GPG public and private keys.
- Restoring Git commit signing configuration.
- Extending expired GPG keys.
- Verifying SSH connections and GPG signatures on GitHub.

**One final reminder:** Never store your private SSH or GPG keys in public Git repositories, unencrypted cloud storage, or unsecured backup locations. Keep your backups in a secure, preferably encrypted environment. 🔐

A few minutes spent creating a proper backup can save you hours of rebuilding your development environment after a fresh Linux installation.

[responsive_img src="/images/ssh-gpg-yedekleme-geri-yukleme-xl.webp" alt="Backing up and restoring SSH and GPG keys" /]