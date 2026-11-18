Title: Fortnite Is Coming to Linux: EAC Linux v2, Security, and the Freedom Debate
Date: 2026-11-17 08:17
Category: Linux
Tags: Linux, Fortnite, Epic Games, Easy Anti-Cheat, EAC Linux v2, eBPF, Secure Boot, Linux Güvenliği, Oyun
Slug: fortnite-linux-eac-linux-v2-guvenlik-ozgurluk
Authors: yuceltoluyag
Summary: Epic Games’ EAC Linux v2 initiative is bringing Fortnite closer to Linux. However, signed kernel, Secure Boot, TPM 2.0, and eBPF requirements raise important questions about system privileges, data security, and Linux freedom.
Status: published
Template: article
Lang: en

Linux users have finally received news they have awaited for years: Epic Games is working to bring Fortnite to Linux. It has also released a new Epic Games Launcher Preview with native Linux support for the first time.

At first glance, this is a very welcome development. It could open an important door for Linux users who have long faced problems because of anti-cheat support in competitive games.

However, this development has another side as far as I am concerned.

Epic Games is redesigning Easy Anti-Cheat to bring Fortnite to Linux. This new architecture, called EAC Linux v2, does not load a custom anti-cheat kernel module as Windows does. Instead, it uses Linux’s existing security mechanisms, eBPF programs, and a systemd service.

So far, that sounds quite reasonable.

But to make the system work, several strict requirements must be met, including Secure Boot, TPM 2.0, a signed kernel, Kernel Lockdown, IOMMU, and BPF LSM.

Do we really need to restrict our operating system this heavily just to play one game? More importantly, how much trust should we place in security software that can run with high privileges on our computers?

I want Fortnite to come to Linux. However, I have serious concerns about how much control users may be able to retain over their computers in exchange for this development.
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube
    videoid="AWThhOtscS8"
    title="Fortnite Is Coming to Linux: EAC Linux v2 Security and Concerns">
</lite-youtube>
In this article, we will examine Epic Games’ new anti-cheat approach, its technical requirements, security model, and discussions within the Linux community.

## Epic Games Launcher Has Come to Linux — but Can Fortnite Be Played?

First, these are two different developments.

Epic Games released the new Epic Games Launcher Preview on October 14, 2026. This is the company’s first native Linux client.

Linux users can obtain the application through an AppImage or `.deb` package. It is worth noting that the application is still in preview and some features are under development.

Official announcements:

- [Epic Games Launcher Preview announcement](https://store.epicgames.com/news/epic-games-launcher-preview){: target="_blank" rel="noopener noreferrer"}
- [Epic Games Launcher Linux installation and support information](https://www.epicgames.com/help/c-32735058/c-Trending_0/a12104725){: target="_blank" rel="noopener noreferrer"}

The situation is different for Fortnite.

Epic has announced that the game will come to Linux, but it has not yet released a Linux version available to everyone. The company plans to test the new EAC Linux v2 system first in a real Fortnite game environment and then offer it to other game developers based on the results.

It would therefore not be accurate to say that Fortnite can currently be played on Linux. No firm release date has been announced either.

An important aspect of this development is that Epic is not only bringing its store to Linux but also redesigning its anti-cheat infrastructure.

So why was such a change needed?

## Why Is Easy Anti-Cheat Linux v2 Being Developed?

Easy Anti-Cheat has a fairly long history on Linux.

According to Epic’s explanation, EAC has supported native Linux games since 2014. In 2021, support was also added for Windows games running through Wine and Proton.

However, there was an important problem.

This support had to be enabled separately by developers for each game. Epic also stated that the older Linux implementation could not provide the same level of protection as on Windows.

According to the company, differing kernel configurations across Linux distributions and modifiable system components made cheating harder to combat.

EAC Linux v2 is being developed specifically to address this problem.

Epic’s goal is to come closer to the protection level of Windows on Linux. To achieve this, it has chosen to use Linux’s existing security infrastructure rather than developing a proprietary kernel module.

I cannot say that I find the company’s approach entirely meaningless. Combating cheats in competitive games is genuinely difficult. Cheats operating at the hardware level and software that interferes with game memory can create serious problems for developers.

However, trying to solve a security problem does not mean that every method applied to users’ computers should be accepted without question.

## How Does EAC Linux v2 Work?

One of the questions frequently encountered in discussions on the internet is:

**Is Epic Games bringing kernel-level anti-cheat to Linux?**

To answer this question, two technical concepts need to be distinguished.

Epic explicitly states that EAC Linux v2 does not load a custom anti-cheat kernel module, unlike in Windows.

Instead, it uses three main components:

1. **systemd service:** A service loaded the first time a protected game is started and active only while the game is running.
2. **eBPF programs:** Programs that run inside the Linux kernel and perform security checks.
3. **BPF LSM:** A mechanism that extends the Linux Security Module infrastructure through eBPF.

According to Epic’s explanation, this architecture is intended to prevent other processes from reading or modifying protected game memory and to detect cheats using different methods.

It is especially worth taking a closer look at eBPF.

eBPF is a technology used to perform certain operations inside the Linux kernel in a controlled manner. It is used in areas ranging from network traffic inspection and performance analysis to system observation and security policy enforcement.

BPF LSM allows eBPF programs to attach to security control points in the Linux kernel.

The Linux kernel documentation explains that BPF LSM programs can be used by privileged users to enforce system-wide access-control and auditing policies.

Sources:

- [Linux Kernel – LSM BPF Programs](https://docs.kernel.org/next/bpf/prog_lsm.html){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – eBPF Verifier](https://docs.kernel.org/bpf/verifier.html){: target="_blank" rel="noopener noreferrer"}

There is another important detail.

eBPF is not a mechanism that permits arbitrary code to be loaded into the kernel and unlimited operations to be performed. A verification system called the verifier checks the memory areas, pointers, and operations to which a program has access.

It would therefore be inaccurate to treat EAC Linux v2 as exactly the same as the classic closed-source kernel drivers used on Windows.

Nor is it accurate to say that the system has no relationship with the kernel or that it works entirely like a regular user application.

I believe the key issue is not the name of the technology used, but the privileges and limits within which that technology operates.

## The Eight Security Requirements for EAC Linux v2

Epic has defined eight basic requirements for the new anti-cheat system to work.

These are not merely requirements for installing the game. They require a security configuration extending from the computer’s boot chain to the kernel in use.

| Requirement | What it does |
|---|---|
| Signed kernel and modules | Ensures that the running kernel and external drivers are signed with trusted keys. |
| TPM 2.0 | Stores measurements obtained during boot in hardware-based security registers. |
| Secure Boot | Checks that components in the boot chain have trusted signatures. |
| Measured Boot | Records measurements of components such as firmware, the bootloader, and the kernel in the TPM. |
| IOMMU | Restricts the physical-memory access of hardware capable of DMA. |
| Kernel Lockdown Integrity Mode | Prevents the root user from performing certain operations that could compromise kernel integrity. |
| Kexec disabled | Prevents the running system from replacing the kernel while bypassing the normal boot chain. |
| BPF LSM | Enables Epic’s eBPF-based security controls to run. |

I would especially like to discuss the first item.

Epic does not automatically accept any kernel that we compile ourselves or sign with our own signing key. The signatures must belong to a key list that the company considers trusted.

This list includes keys such as those from Canonical, Fedora, Universal Blue, Debian, openSUSE, SUSE, Rocky Linux, AlmaLinux, and the Microsoft UEFI CA.

Epic also states that it plans to expand this list later and open it to community contributions.

There is another point that deserves attention.

If you want to continue using your own Secure Boot keys, Epic says that a separate boot profile may be created in some configurations. However, on systems using shim, enrolled MOK keys must also appear in the trusted list.

In other words, the review is not limited to the kernel used when launching the game. Conditions also apply to firmware and key enrollment records.

### Bazzite 45 and Distribution Support

Bazzite is one of the distributions preparing for these developments.

With Bazzite 45, released by the Universal Blue team on November 3, 2026, Epic’s trusted Universal Blue signing key began to be supported.

In addition, the following command was added so users can check whether their systems meet the EAC Linux v2 requirements:

```bash
ujust check-anticheat
```

This command checks the relevant conditions, from kernel and module signatures to Secure Boot and from TPM 2.0 to Kernel Lockdown.

Important detail: this command does not automatically make your system EAC-compatible. It only reports your current status.

Bazzite developers also state that some security settings are not yet ready on handheld consoles.

Source: [Universal Blue – Bazzite 45 announcement](https://universal-blue.discourse.group/t/bazzite-45-is-here/12702){: target="_blank" rel="noopener noreferrer"}

### What About the Steam Deck?

This is where one of the interesting aspects begins.

The Steam Deck is one of the devices that has played an important role in the growth of Linux gaming. However, according to Epic’s explanation, the Steam Deck does not currently meet the features required by EAC Linux v2.

Epic states that discussions with Valve are ongoing and that it wants to support Steam hardware as broadly as possible in the future.

Here is another distinction: planning support for the Epic Games Launcher on SteamOS does not mean that Fortnite can be played on the Steam Deck.

Launcher support and anti-cheat compatibility are two separate issues.

Source: [Epic Games – EAC Linux v2 technical announcement](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2){: target="_blank" rel="noopener noreferrer"}

## The Real Issue: With Which Privileges Will EAC Linux v2 Run?

Now we reach what I consider the most important part of the subject.

The absence of a custom kernel module in Epic’s new system may be a positive technical choice.

However, this does not mean that the software’s privileges on the system are automatically limited.

When evaluating a piece of software’s security, we need to look not only at the technology it uses, but also at the permissions under which it runs and the resources it can access.

For example, it is very important to know which user runs a service managed by systemd, which Linux capability permissions it has, and which filesystems it can access.

Systemd offers many security options in this regard.

Some of them are:

- `User=` and `Group=`: Determine which user and group the service runs as.
- `CapabilityBoundingSet=`: Limits the Linux capability permissions the service can use.
- `NoNewPrivileges=`: Prevents the process from gaining new privileges.
- `ProtectHome=`: Can restrict access to users’ home directories.
- `ProtectSystem=`: Can make specific parts of the filesystem read-only to the service.
- `SystemCallFilter=`: Can limit the system calls the service may use.

These are not merely theoretical options. The systemd documentation recommends using them to reduce a service’s attack surface.

Source: [systemd – Execution Environment Configuration](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html){: target="_blank" rel="noopener noreferrer"}

However, Epic’s EAC Linux v2 announcement does not provide a detailed list of the service’s actual runtime identity, `CapabilityBoundingSet` settings, filesystem restrictions, and other sandbox options.

We therefore cannot say that the service unquestionably runs as root or has access to every file on the computer.

But for precisely that reason, these are the questions we need to ask.

In systemd, if `User=` is not specified for a system service, the default user is root. In addition, loading BPF LSM programs and attaching them to kernel hooks are privileged operations.

However, these facts alone do not show how Epic configures the service. To establish that, we would need to inspect the actual service file, privilege model, and related components.

That is exactly what I would like to see.

Epic describes generally how EAC Linux v2 will work. It should also publish detailed technical documentation that allows users to assess the real privilege boundaries of the services running on their systems.

## What Happens if a Security Vulnerability Is Found?

I believe this is a concern not only for people interested in Fortnite, but for anyone who uses third-party security software on their computer.

The developer of a piece of software does not have to have malicious intent.

One day, a vulnerability may be discovered. An update mechanism may be compromised. A component with which the software communicates may be attacked.

These are all security scenarios that can occur in the real world.

Now imagine that an attacker has taken control of a privileged security service running on our computer.

What an attacker could do would depend on the actual privileges of the process they compromised.

If the service runs with extensive root privileges or has critical Linux capability permissions, the impact could be much more serious. User files, browser sessions, local credentials, and other system resources could become targets.

By contrast, a well-confined service that runs as a separate user and has restricted filesystem access would present a smaller attack surface.

This is why the details of the service architecture matter.

A misunderstanding is also possible concerning Kernel Lockdown.

Kernel Lockdown is a security feature intended to prevent the root user from performing certain operations that could compromise kernel integrity. It is not a general-purpose sandbox that hides personal files on the system from privileged services.

Protecting kernel integrity and protecting user data are different security goals.

These two issues should not be confused.

That is precisely the source of my concern.

I am not claiming that a piece of software reads our email, collects our credit-card information, or sends our personal files to a server. Concrete evidence would be required for such a claim.

However, I want to know which privileges an attacker could use if they gained control of this software.

**A software vendor does not need to act with malicious intent for its software to be abused.**

We therefore cannot evaluate security solely according to the intentions the company states today.

## What Does Epic Games Explain About User Data?

Epic Games’ general privacy policy explains that technical information may be collected, including application and game usage data, device identifiers, and hardware and software characteristics.

The company also states that it may use this data for purposes such as combating cheating, account theft, fraud, and other unauthorized activity.

Source: [Epic Games – Privacy Policy](https://legal.epicgames.com/epicgames/privacy-policy){: target="_blank" rel="noopener noreferrer"}

There is an important distinction here.

The general privacy policy does not explain which files the EAC Linux v2 service can read on the computer or which system processes it can access.

These are different matters.

A company collecting game usage data is not the same as the local file-access permissions of a privileged service running on a computer.

I believe this is one of the points Epic should explain separately for its Linux implementation.

For example:

- Exactly what system data does EAC Linux v2 collect?
- Which processes does it monitor?
- Which eBPF LSM hooks does it use?
- Which data remains on the computer, and which data is sent to a server?
- How long is the collected data retained?
- By which mechanisms are the service’s runtime privileges restricted?

These are questions that need answers.

### Is an Independent Security Audit Enough?

Here, too, I do not want to rely solely on an audit report.

Easy Anti-Cheat’s general information page states that regular audits are conducted by third-party providers. However, this general statement does not provide enough information to evaluate the audit firms, scope of review, version tested, or results obtained.

Furthermore, we cannot infer from this that the general EAC audits directly cover every component of Linux v2.

Source: [Easy Anti-Cheat – General Technical Information](https://www.easy.ac/ai-info){: target="_blank" rel="noopener noreferrer"}

Independent auditing is, of course, valuable. But without knowing which code and version were reviewed or against which attack scenarios, a statement that an audit occurred is not enough for me.

No audit can guarantee that the software will never contain a vulnerability in the future.

What matters is the scope, transparency, and continuity of the review.

## Does Kernel-Level Anti-Cheat Really Stop Cheating?

Now let us look a little closer at the purpose of the system.

A fundamental goal of Epic’s EAC Linux v2 development is to make it harder for cheat software to interfere with the game.

However, using kernel-level protection does not mean that cheating will be eliminated completely.

Even today, major online games such as Fortnite encounter many different cheating methods.

If you go to YouTube, it is possible to find content about Fortnite cheats.

Of course, these examples alone do not prove that anti-cheat systems are useless. Nor can they be used to assess the performance of EAC Linux v2 before it is released.

However, they remind us of an important fact: the fight against cheating is an ongoing process.

Epic also states in its own explanation that anti-cheat systems require regular updates. The company’s goal is not to eliminate every cheat forever, but to increase the cost of developing and maintaining cheats and reduce the likelihood that an ordinary player will encounter a cheater.

Epic also says that it detects cheats using server-side data, but that this is not sufficient on its own.

I have a different perspective here.

I believe that a good game’s anti-cheat system should not consist solely of software installed on our computers.

Server-side checks, player reports, behavioral analysis, and human moderation should work together.

In some games I have played in the past, I have personally seen how important server administrators can be.

Administrators who know the players, assess suspicious behavior, intervene when necessary, and apply the rules equally to everyone are extremely important to the health of gaming communities.

Of course, administrators must also be fair. An administrator who makes one decision for a friend and another for a player they do not know is part of the problem.

I am not arguing for anti-cheat software to be removed completely.

I simply do not believe it is right to place the entire burden of fighting cheats on privileged software running on users’ computers.

## Which Games Will We Be Able to Play When EAC Linux v2 Arrives?

This is also a very important issue.

If Epic’s new system proves successful, it is planned to be offered to other game developers.

However, the release of EAC Linux v2 does not mean that every game using Easy Anti-Cheat will automatically run on Linux.

Every game developer will need to enable this support separately.

Moreover, developers of games that already use older Linux EAC support may continue using the existing system or move to EAC Linux v2 for a higher level of protection.

In that case, whether a game uses the older or newer version will depend on the developer’s decision.

Another important point concerns other anti-cheat systems.

For example, EA SPORTS FC 26 and Battlefield 6 use EA’s own Javelin AntiCheat system.

EA explains that Javelin runs at the kernel level for FC 26. Battlefield 6 also has a Secure Boot requirement.

Consequently, Epic’s EAC Linux v2 will not directly add Linux support to those games.

Sources:

- [EA SPORTS FC 26 – PC Deep Dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-pc-deep-dive){: target="_blank" rel="noopener noreferrer"}
- [Battlefield 6 – Secure Boot Information](https://www.ea.com/games/battlefield/battlefield-6/news/secure-boot-information){: target="_blank" rel="noopener noreferrer"}

Therefore, while users are asked to meet eight separate security requirements, it should also be made clear which games will be supported in return.

That is precisely one of the things I am curious about.

## What Does the Linux Community Think About EAC Linux v2?

In my research on this topic, I found that the Linux community has not unified around a single view.

Reddit discussions in Linux Gaming feature a range of perspectives.

Some users welcome the fact that no custom kernel module is loaded. Compared with closed-source kernel drivers on Windows, they consider using the existing Linux security infrastructure more reasonable.

On the other hand, some users have concerns, particularly about:

- Distribution developers and signing keys being approved by the company.
- The possibility of being unable to use self-compiled kernels.
- Signing problems with external drivers such as NVIDIA DKMS.
- Restrictions involving Secure Boot and MOK keys.
- The privilege and access limits of eBPF programs.
- The loss of older game support if the transition is made from EAC v1 to v2.

These are not all equally well-established problems. Some are technical compatibility issues, while others are users’ concerns about the future.

However, the central issue being discussed in the community is clear:

Should a Linux user decide how their own computer operates, or should they have to follow a security configuration defined by a distribution developer and a game company in order to play a competitive game?

Some discussions where different views can be seen:

- [EAC Linux v2 does NOT install a kernel anti-cheat module](https://www.reddit.com/r/linux_gaming/comments/1x69tby/eac_linux_v2_does_not_install_a_kernel_anticheat/){: target="_blank" rel="noopener noreferrer"}
- [EAC Linux v2: distribution signing keys and security requirements](https://www.reddit.com/r/linux_gaming/comments/1x9ntgy/for_epics_eac_linux_v2_to_work_fedora_debian_suse/){: target="_blank" rel="noopener noreferrer"}

These comments do not represent the views of all Linux users. However, they offer important examples for understanding why this is not merely a technical compatibility issue.

## Conclusion: Let Fortnite Come to Linux — but at What Cost?

I want Fortnite to come to Linux.

I also want more competitive games to run on Linux.

But we need to know how far the security boundaries on our computers may be changed for a game to run.

Epic Games’ EAC Linux v2 work is technically significant. Using Linux’s existing security mechanisms without loading a custom anti-cheat kernel module is also an approach worth examining.

However, the privileges under which this system will operate, how much data it will collect, the limits within which eBPF programs will operate, and the impact of a possible vulnerability on users should be explained adequately.

I do not need to claim that a company is malicious. To evaluate software, I first want to understand its security boundaries.

A company’s good intentions do not guarantee that the software it develops will never contain a vulnerability.

A security component can itself become part of the attack surface.

Moreover, what may be at stake is not merely a game account. The personal accounts, browser sessions, files, and digital lives we use on the same computer are also involved.

Asking questions about a game company’s solution that interferes with such an important security area is not paranoia. It is a user wanting to protect their own system.

What I expect from Epic Games is greater transparency.

The real service privileges should be explained. Security boundaries should be documented. The scope of data collection should be clarified. It should be clear which versions and components independent audits cover. The system’s actual effectiveness against cheating should be shown through measurable results.

We want more games to come to Linux. But we do not want to hand control of our computers over to a game company without question in exchange for that.

**Let Fortnite come to Linux—but let us also discuss how much of the control and freedom Linux gives us we have to give up to make that possible.**

What do you think about EAC Linux v2? Would you accept such strict security conditions to play a game, or would you first expect explanations of the system’s real privileges and data-access limits?

Let us discuss this in the comments.

## Sources

- [Epic Games – Introducing Easy Anti-Cheat Linux v2](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Launcher Preview](https://store.epicgames.com/news/epic-games-launcher-preview){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Launcher Preview Support Page](https://www.epicgames.com/help/c-32735058/c-Trending_0/a12104725){: target="_blank" rel="noopener noreferrer"}
- [Valve – Steam Hardware & Software Survey](https://store.steampowered.com/hwsurvey/){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – LSM BPF Programs](https://docs.kernel.org/next/bpf/prog_lsm.html){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – eBPF Verifier](https://docs.kernel.org/bpf/verifier.html){: target="_blank" rel="noopener noreferrer"}
- [systemd – systemd.exec](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Privacy Policy](https://legal.epicgames.com/epicgames/privacy-policy){: target="_blank" rel="noopener noreferrer"}
- [Easy Anti-Cheat – Technical Information](https://www.easy.ac/ai-info){: target="_blank" rel="noopener noreferrer"}
- [Universal Blue – Bazzite 45](https://universal-blue.discourse.group/t/bazzite-45-is-here/12702){: target="_blank" rel="noopener noreferrer"}
- [EA – EA SPORTS FC 26 PC Deep Dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-pc-deep-dive){: target="_blank" rel="noopener noreferrer"}
- [EA – Battlefield 6 Secure Boot](https://www.ea.com/games/battlefield/battlefield-6/news/secure-boot-information){: target="_blank" rel="noopener noreferrer"}