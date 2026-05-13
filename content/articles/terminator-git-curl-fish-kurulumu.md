Title: Terminator, Git, Curl ve Fish Kurulumu (Terminali Özelleştirme)
Date: 2018-12-01 14:00 10:00
Modified: 2025-08-11 22:59
Category: Terminal
Tags: terminal, linux, fish, git, curl
Slug: terminator-git-curl-fish-kurulumu
Authors: yuceltoluyag
Summary: Linux terminalinizi daha işlevsel ve estetik hale getirmek için Terminator, Git, Curl ve Fish kurulumu ve özelleştirme rehberi.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/terminator-git-curl-fish-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982841774461789
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqog6hfyc2i

Merhaba! Linux’ta en çok vakit geçirdiğimiz alanlardan biri terminaldir. Peki terminalimizi nasıl daha işlevsel ve estetik hale getirebiliriz? İşte bu rehber tam size göre! 💪🚀

Terminali daha verimli ve keyifli hale getirmek için **Terminator** ve **Fish Shell** kombinasyonunu kullanacağız. Bu sayede:

- Terminalinizi yatay ve dikey olarak bölebilirsiniz.
- Kod renklendirme ve otomatik tamamlama gibi gelişmiş özelliklere sahip olabilirsiniz.
- Önceden kullanılan komutları daha kolay görüntüleyebilirsiniz.
- Tema ve eklentilerle terminalinize yepyeni bir hava katabilirsiniz. 🎨

---

## 🛠 Kurulum Adımları

Öncelikle, aşağıdaki komutları kullanarak gerekli araçları yükleyelim:

### Terminator Kurulumu

```bash
sudo apt-get install terminator
```

**Terminator**, birden fazla terminal penceresini aynı ekranda kullanmanıza olanak tanır. Özellikle geliştiriciler için büyük bir kolaylık sağlar.

### Fish Shell Kurulumu

```bash
sudo apt-get install fish
fish
```

Fish’e geçtiğinizde, simgenin değiştiğini görebilirsiniz. Varsayılan shell olarak Fish'i ayarlamak için:

```bash
chsh -s /usr/bin/fish
```

Bu işlemden sonra çıkış yapıp tekrar giriş yaptığınızda Fish varsayılan shell olarak kullanılacaktır. 🐟

---

## 🎨 Terminal Temaları

Görselliğe önem veriyorsanız, aşağıdaki adımları takip ederek terminalinizin temasını değiştirebilirsiniz.

1. **İterm2 Color Schemes** sitesinden [beğendiğiniz bir temayı seçin](http://iterm2colorschemes.com/){: target="\_blank" rel="noopener noreferrer"}.
2. Terminator yapılandırma dosyasına erişmek için şu komutu çalıştırın:

```bash
sudo gedit ~/.config/terminator/config
```

3. Seçtiğiniz tema kodlarını **profile** kısmının altına yapıştırın.
4. Terminator'u yeniden başlatın.

---

## 🎩 Oh My Fish ile Gelişmiş Özelleştirme

Fish’i daha da özelleştirmek için **Oh My Fish** kullanabilirsiniz:

```bash
curl -L https://get.oh-my.fish | fish
```

### 🎭 Tema Seçimi

[Oh My Fish temalarına](https://github.com/oh-my-fish/oh-my-fish/blob/master/docs/Themes.md){: target="\_blank" rel="noopener noreferrer"} göz atarak beğendiğiniz bir temayı yükleyebilirsiniz. Örneğin:

```bash
omf install bobthefish
```

### 🛠 Eklenti Yükleme

Oh My Fish, çeşitli eklentiler sunmaktadır. Beğendiğiniz bir eklentiyi yüklemek için:

```bash
omf install eklenti-adı
```

[Eklentileri keşfetmek için buraya göz atabilirsiniz](https://github.com/oh-my-fish){: target="\_blank" rel="noopener noreferrer"}. 🤩

---

## 📺 Video Anlatım

<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="h78f3V4p09E"></lite-youtube>

[responsive_img src="/images/terminator-git-curl-fish-kurulumu-xl.webp" alt="terminator-git-curl-fish-kurulumu" /]



