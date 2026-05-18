Title: Zsh İçerisinde Shopt Kullanmak
Date: 2020-01-28 12:00 10:00
Modified: 2025-08-11 22:59
Category: Terminal
Tags: linux, terminal, zsh
Slug: zsh-icerisinde-shopt-kullanmak
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 2
Summary: Zsh içerisinde shopt komutunun nasıl kullanılacağını ve bash uyumsuzluklarını çözme yöntemlerini adım adım açıklıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/shopt-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114984474656779593
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrfm53rx22k


Selamlar yoldaşlar! 🚀

Serinin ikinci bölümünde, Bash'ten Zsh'e göç ettikten sonra karşımıza çıkan o meşhur, can sıkıcı uyumluluk problemlerinden birini bizzat kendi sistemimde çözdüğüm yöntemle ele alıyoruz: **shopt** komutu ve Bash uyumsuzluğu!

Eğer daha önce Bash kullanırken `shopt` nimetlerinden faydalandıysanız, ne kadar pratik bir araç olduğunu çok iyi bilirsiniz. Kısaca bahsetmek gerekirse `shopt` (shell options), kabuk içerisindeki bazı temel davranışları değiştirip özelleştirmenizi sağlar. En basitinden, bir dizine girmek için `cd klasor-adi` yazmak yerine sadece `klasor-adi` yazıp Enter'a basarak dizinin içine uçmanızı sağlayan `autocd` özelliği buna harika bir örnektir! Sanki her gün gittiğin mahalle kahvesine girdiğinde *"Usta her zamankinden"* deyip masana kurulmak gibi bir samimiyettir bu.

Ancak Zsh'e göç ettiğimizde, o acı gerçekle yüzleşiriz. Zsh kendi içinde farklı bir mimari olduğu için, Bash uyumlu bu komutu koşturmaya çalıştığınızda terminal suratınıza o soğuk hatayı fırlatır: **"shopt: command not found"**.

Peki benim gibi Arch Linux kullanan ve sisteminde hata toleransı sıfır olan titiz bir geek bu sorunu nasıl çözer? Gelin bu uyumsuzluğu kökünden halledelim! 🛠️

---

## 🛠️ Zsh İçerisinde shopt Çözümü

Bash temelli `shopt` komutunun eksikliğini Zsh altında gidermek aslında sandığınızdan çok daha basit. Yazacağımız ufak bir wrapper script sayesinde Zsh'i kandıracağız ve arka planda Bash'e işi yaptıracağız.

### Adım 1: Wrapper Script Oluşturma

Öncelikle terminalimizi açıp ev dizinimizde veya herhangi bir yerde geçici olarak `shopt` adında boş bir dosya oluşturuyoruz:

```bash
touch shopt
```

Oluşturduğumuz bu dosyayı favori editörümüzle açıp içine Zsh'ten gelen argümanları Bash'e paslayacak şu kod bloğunu yapıştırıyoruz:

```bash
#!/bin/bash
args='';
for item in $@
do
args="$args $item";
done
shopt $args;
```

### Adım 2: Script'i Sistem Yoluna Taşıma

Bu script'in sistemin her yerinden çalışabilmesi için dosyayı `/usr/bin` altına taşımamız gerekiyor. İşleri şansa bırakmamak için root yetkileriyle bu işi hallediyoruz:

```bash
sudo mv shopt /usr/bin/
```

!!! tip "İpucu ⚡ /usr/bin altına taşıdığımız bu script'in çalıştırılabilir olması gerekiyor. Terminalden `sudo chmod +x /usr/bin/shopt` komutunu vermeyi unutmayın, yoksa 'Permission Denied' hatasıyla karşılaşırsınız!"

### Adım 3: .zshrc Dosyasına Alias Tanımlama

Şimdi tek yapmamız gereken Zsh'e `shopt` yazıldığında bizim yazdığımız wrapper script'i çalıştırmasını söylemek. Kutsal dosyamız `.zshrc`'yi açıp şu satırı en alta ekliyoruz:

```bash
alias shopt='/usr/bin/shopt'
```

Artık Zsh içerisinde `shopt` komutunu sorunsuz şekilde koşturabilirsiniz. Sisteminizde Bash uyumluluğu geri geldi, afiyet olsun! 😄

---

## 💾 Yedekleme ve Otofobi (Scriptleri Unutma Korkusu)

Hacı bura çok kritik. Temiz bir Arch Linux kurulumu yaparken ya da sistemi başka bir bilgisayara taşırken, `/usr/bin` altına kendi ellerimizle yazdığımız bu özel script'leri yedeklemeyi unutmak tam bir klasik! Ben de zamanında bu hataya çok düştüm, sistemi kurduktan sonra *"Ulan benim shopt neden çalışmıyor?"* diyerek paronoyakça hata aradım. 🤣

Eğer sistem taşıma sırasında bu tarz özel script'leri unutmaktan korkuyorsanız, bizzat yazdığım [Oto Script Oluşturucuyu (otoscript)](https://github.com/yuceltoluyag/otoscript){: target="\_blank" rel="noopener noreferrer"} kullanabilirsiniz. Bu araç sayesinde script'lerinizi tek bir dizinde tutup `.zshrc` içinde şu şekilde çağırabilirsiniz:

```bash
alias shopt='ScriptDizinim/shopt'
```

*   Wrapper Script için yararlandığım kaynak: [larz258](https://github.com/larz258/Zshopt){: target="\_blank" rel="noopener noreferrer"}

---

## 🧪 Test Edebileceğiniz shopt Ayarları

Wrapper kurulumunu tamamladıktan sonra, yeni shopt gücümüzü test etmek için `.zshrc` dosyanızın en altına şu popüler Bash seçeneklerini ekleyip deneyebilirsiniz:

```bash
# Bash opts Zsh wrapper test
shopt -s autocd
shopt -s cdspell
shopt -s cmdhist
shopt -s histappend
shopt -s expand_aliases
shopt -s checkwinsize
shopt -s globstar 2> /dev/null
shopt -s nocaseglob
shopt -s autocd 2> /dev/null
shopt -s dirspell 2> /dev/null
shopt -s cdspell 2> /dev/null
```

!!! note "Not: Bu ayarlar sayesinde yazım hataları otomatik düzeltilecek (`cdspell`), sadece dizin ismi yazarak o dizine geçilebilecek (`autocd`) ve terminaliniz çok daha akıllı davranacaktır."

Eğer benim tam olarak nasıl bir terminal konfigürasyonu kullandığımı merak ediyorsanız [Windows Terminal / WSL Ayarlarım](https://github.com/yuceltoluyag/WindowsTerminal/blob/main/WSL/.zshrc){: target="\_blank" rel="noopener noreferrer"} deposuna ve bu script'leri yönettiğim [Script Oluşturucu](https://github.com/yuceltoluyag/otoscript){: target="\_blank" rel="noopener noreferrer"} aracına göz atabilirsiniz.

[responsive_img src="/images/shopt-xl.webp" alt="shopt" /]

