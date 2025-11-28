Title: Ongoing DDoS Attack on Arch Linux and Quick Solutions
Date: 2025-08-28 10:00
Category: Haberler
Tags: Arch Linux, DDoS, AUR, hizmet kesintisi, yansılar, Arch Haberleri
Slug: arch-linux-ddos-hizmet-kesintisi
Authors: yuceltoluyag
Status: published
Summary: Arch Linux has been struggling with an ongoing DDoS attack since August 12. Access to the main site, AUR, and forums is experiencing problems. This article provides alternative access methods and mirrors for users.
Template: article
Image: images/arch-linux-ddos-hizmet-kesintisi-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/115091936430498581
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lxb6cglea22c



### 1. Introduction

Arch Linux has been facing a **Distributed Denial of Service (DDoS)** attack since August 12, 2025. As a result of this attack, Arch Linux's main website, Arch User Repository (AUR), and forums are experiencing serious access problems.

This blog post aims to summarize the situation for Turkish Arch users and offer alternative solutions against the outage.

<blockquote class="reddit-embed-bq" style="height:316px" data-embed-theme="dark" data-embed-height="240"><a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mo1rws/arch_linux_depolar%c4%b1na_t%c3%bcrkiye_saatiyle_sabah_800/">Arch linux repositories are unreachable from 8:00 AM Turkish time. Don't worry, it will be fixed.</a><br> by<a href="https://www.reddit.com/user/dolorisback/">u/dolorisback</a> in<a href="https://www.reddit.com/r/Kanunsuzlar/">Kanunsuzlar</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

---

### 2. Main Content

#### 2.1 Scope of the Attack and What the Project Team is Doing

- **Attack Details**: The DDoS attack, ongoing since August 12, is severely damaging Arch Linux's main website, AUR, and forums. ([SecurityWeek][1], [Tom's Hardware][2], [Arch Linux][3])
- **Response and Strategy**: Developers are working closely with the hosting provider. They are also evaluating services that can provide DDoS protection for long-term solutions.
- **Update Source**: The project has started keeping its service status page active for regular information sharing.

---

#### 2.2 Alternative Access Methods for Users

- **Website Access**:

  - If access to the mirror list endpoint used by tools like `reflector` is cut off, mirrors located in the `pacman-mirrorlist` package should be used.
  - I do not recommend using Reflector. Instead, [Use Ghost Mirror](/ghostmirror-arch-linux-kullanimi/)

  <blockquote class="reddit-embed-bq" data-embed-theme="dark" data-embed-height="548"><a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mxfde9/comment/na8fh8q/">Comment</a><br> by<a href="https://www.reddit.com/user/dolorisback/">u/dolorisback</a> from discussion<a href="https://www.reddit.com/r/Kanunsuzlar/comments/1mxfde9/son_hizmet_kesintileri_aur_arch_linux/"></a><br> in<a href="https://www.reddit.com/r/Kanunsuzlar/">Kanunsuzlar</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>

  - Installation ISOs can be downloaded from alternative mirrors. It is important to verify integrity and signature before downloading (e.g., `0x54449A5C`).

- **AUR Access**:

  - When AUR package access is not possible, packages can be manually cloned from the official AUR mirror repository on GitHub:

```bash
    git clone --branch <package_name> --single-branch https://github.com/archlinux/aur.git <package_name>
```

[responsive_img src="/images/arch-linux-ddos-hizmet-kesintisi-xl.webp" alt="Arch Linux DDoS" /]

- After cloning the packages, you can perform the installation with the `makepkg -si` command.

- **Wiki Access**:

  - For those who cannot reach Wiki pages, mirrors like `arch-wiki-docs` and `arch-wiki-lite` can be used.

---

#### 2.3 Technical Details and Privacy Policy

- During initial connection requests, connections may be rejected at first due to TCP SYN authentication; however, persistent attempts usually work.
- Technical details and the source of the attack are kept confidential as long as the attack continues.

---

### 3. Conclusion and Summary

Although the current situation faced by Arch Linux users is frustrating, thanks to the active intervention of the development team and the temporary solutions provided, you can meet your basic needs.

AUR clones for AUR access, and mirrors for ISOs and packages are still accessible. Also, do not neglect security signature verification during all operations.

- You can follow Arch Linux server statuses [here](https://status.archlinux.org/){: target="\_blank" rel="noopener noreferrer"}.

---

[1]: https://www.securityweek.com/arch-linux-project-responding-to-week-long-ddos-attack/?utm_source=yuceltoluyag.github.io "Arch Linux Project Responding to Week-Long DDoS Attack"
[2]: https://www.tomshardware.com/software/linux/arch-linux-continues-to-feel-the-force-of-a-ddos-attack-after-two-brutal-weeks-attackers-yet-to-be-identified-as-project-struggles-to-restore-full-service?utm_source=yuceltoluyag.github.io "Arch Linux continues to feel the force of a DDoS attack after two brutal weeks - attackers yet to be identified as project struggles to restore full service"
[3]: https://archlinux.org/news/recent-services-outages/?utm_source=yuceltoluyag.github.io "News: Recent service outages - Arch Linux"
