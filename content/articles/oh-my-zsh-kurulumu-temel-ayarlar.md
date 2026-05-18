Title: Oh My Zsh Kurulumu ve Temel Ayarlar
Date: 2020-01-20 12:00
Modified: 2024-01-01
Category: Terminal
Tags: linux, terminal, zsh, oh-my-zsh
Slug: oh-my-zsh-kurulumu-temel-ayarlar
Authors: yuceltoluyag
Series: oh-my-zsh
Series_index: 1
Summary: Oh My Zsh'in kurulumu ve temel ayarlarının nasıl yapılacağını adım adım açıklıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/oh-my-zsh-setup-xl.webp
toot: https://mastodon.social/@yuceltoluyag/116592762057110477
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mm3mv6z2ic24

Selamlar güzel insanlar! ⚡

Eğer siz de benim gibi günün yarısını terminalin başında geçiren, sistemin her köşesini kurcalamaktan keyif alan bir Arch Linux aşığıysanız, o düz siyah beyaz Bash terminalinin bir süre sonra ruhunuzu nasıl daralttığını çok iyi bilirsiniz. Sanki sabah ayazında okul önünde simit-ayran sırası bekler gibi, ne bir renk var ne bir hayat belirtisi... İşte tam bu noktada, terminali adeta baştan yaratacak, hızımıza hız katacak o muazzam ikili devreye giriyor: **Zsh** ve **Oh My Zsh**!

Bu makale, terminali adeta kendi evimiz haline getireceğimiz **Oh My Zsh** serisinin ilk bölümüdür. Bu seride, dilsiz ve renksiz terminalden kurtulup Zsh shell'ini ve Oh My Zsh framework'ünü sistemimize nasıl kuracağımızı bizzat kendi sistemimde tecrübe ettiğim en temiz adımlarla anlatıyorum. 

---

## 🎨 Oh My Zsh Nedir?

Oh My Zsh, Zsh shell'i için geliştirilmiş açık kaynaklı ve topluluk odaklı harika bir framework'tür. Zsh'in o güçlü altyapısını kullanarak terminal deneyiminizi adeta çağ atlatır. 

Benim gibi titiz ve sistemi üzerinde tam kontrol isteyen geek tayfa için bu araç, makarna-yoğurt samimiyetinde bir zorunluluktur.

### Neden Kurmalıyız?

- 🎨 **Zengin Temalar**: 200'den fazla hazır tema ile terminalinizi görsel şölene çevirebilirsiniz.
- 🔌 **Hayat Kurtaran Eklentiler**: 500'den fazla eklenti ile git, docker, python gibi araçları terminale entegre edersiniz.
- ⚡ **Hızlı ve Akıllı**: Otomatik tamamlama, geçmiş komut önerileri ve akıllı arama ile klavyede uçarsınız.
- 🛠️ **Kolayca Özelleştirilebilir**: Karmaşık shell script dosyalarıyla uğraşmadan tek bir `.zshrc` dosyasından her şeyi yönetebilirsiniz.

---

## 🛠️ Kurulum Adımları

Hacı bura çok kritik. Adımları atlamadan sırayla takip edin ki sistemde herhangi bir shell çakışması veya yetki hatası yaşamayalım. İşleri şansa bırakmayı hiç sevmem, o yüzden adımları bizzat Arch Linux makinemde test ederek buraya döküyorum.

### 1. Zsh Kurulumu

Öncelikle sisteminizde Zsh'in kurulu olduğundan emin olun. Kurulu değilse, kullandığınız dağıtıma göre aşağıdaki komutla hemen paketi çekin:

```bash
# Ubuntu/Debian
sudo apt install zsh

# Arch Linux (Benim favorim, tertemiz kurar)
sudo pacman -S zsh

# Fedora
sudo dnf install zsh
```

### 2. Oh My Zsh Kurulumu

Zsh'i kurduktan sonra sıra framework'ü üstüne giydirmeye geldi. Aşağıdaki tek satırlık curl komutuyla kurulum script'ini çalıştırıyoruz:

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

!!! tip "İpucu ⚡ Kurulum bittiğinde script size varsayılan kabuğu (default shell) Zsh yapmak isteyip istemediğinizi soracak. Buna kesinlikle 'Y' (Yes) diyerek onay verin."

### 3. Varsayılan Kabuğu Ayarlama (Eğer otomatik olmadıysa)

Eğer yukarıdaki kurulumda varsayılan shell otomatik olarak Zsh'e dönmediyse, panik yapmayın. Aşağıdaki komutla sistemi zorlayıp varsayılanı Zsh yapıyoruz:

```bash
chsh -s $(which zsh)
```

!!! warning "Dikkat! `chsh` komutunu çalıştırırken kesinlikle başına `sudo` eklemeyin! Yoksa kendi kullanıcınız yerine root kullanıcısının shell'ini değiştirirsiniz, sonra sistemde oturum açarken başınız çok ağrır, benden söylemesi."

---

## ⚙️ Temel Ayarlar ve Konfigürasyon

Kurulum tamamlandıktan sonra ev dizininizde (`~/`) gizli bir `.zshrc` dosyası oluşacak. İşte bu dosya bizim kutsal mabedimiz. Terminalin tüm ayarlarını, alias'larını ve eklentilerini buradan yöneteceğiz.

```bash
# Mabedimizi düzenlemek için nano veya vim ile açıyoruz
nano ~/.zshrc
```

Açılan dosya içerisinde kendi sistemimde aktif olarak kullandığım ve kesinlikle tavsiye ettiğim temel konfigürasyon yapısı şudur:

```bash
# Varsayılan temamız (Klasik ama sağlamdır)
ZSH_THEME="robbyrussell"

# Aktif eklentilerimiz
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
)

# Haftalık otomatik güncelleme kontrollerini aktif tutalım
DISABLE_AUTO_UPDATE="false"
```

---

## 🎨 En Popüler Temalar

Terminalinizin nasıl görüneceği tamamen sizin zevkinize kalmış. İşte benim de zamanında severek kullandığım birkaç popüler tema seçeneği:

### 1. Robbyrussell (Varsayılan ve Stabil)
```bash
ZSH_THEME="robbyrussell"
```
Ekranı yormayan, sol tarafta basit bir ok işareti ve git branch bilgisini gösteren minimalistlerin ilacı.

### 2. Powerlevel10k (Geeklerin Göz Bebeği)
```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```
Eğer terminalde işlemci sıcaklığından tutun da AWS profiline kadar her şeyi görmek istiyorsanız, bu tema tam size göre. Ancak ekstra yazı tipi (font) kurulumu gerektirir.

### 3. Agnoster
```bash
ZSH_THEME="agnoster"
```
Terminali kutucuklu ve şık bir duruma getiren, özellikle kod yazarken dizin yollarını çok temiz gösteren bir başka efsane tema.

---

## 🔌 Hayat Kurtaran Eklentiler

Burası makarnanın yoğurtla buluştuğu, lezzetin zirveye çıktığı yer. Sadece Zsh kurmak yetmez, şu eklentileri mutlaka kurup `.zshrc` dosyanızdaki `plugins` satırına ekleyin.

### 1. Git Eklentisi (Dahili Gelir)
Dahili olarak gelir, ekstra kuruluma gerek yoktur. `gst` yazarak `git status` alabilir, yüzlerce git kısayolunu anında kullanabilirsiniz.

### 2. Zsh Autosuggestions (Geçmiş Önerileri)
Siz komutu yazmaya başladığınızda geçmişe bakarak soluk renkte otomatik tamamlama önerir. Sağa yön tuşuna bastığınızda komutu tamamlar. Parmaklarınızı yormaz:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### 3. Zsh Syntax Highlighting (Sözdizimi Vurgulama)
Yazdığınız komut doğruysa yeşil, hatalıysa kırmızı gösterir. Enter tuşuna basmadan önce hata yapıp yapmadığınızı anlarsınız. Zaman kazandırır:

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

!!! note "Not: Bu eklentileri `git clone` ile çektikten sonra `.zshrc` içindeki `plugins=(...)` parantezinin içine isimlerini eklemeyi ve dosyayı kaydetmeyi unutmayın."

---

## 🚀 Sonraki Adımlar ve Öneriler

Kurulum bitti, her şey hazır! Şimdi sistemi test etme zamanı.

- Terminali kapatıp açın veya doğrudan `source ~/.zshrc` yazarak yeni ayarların terminale yüklenmesini sağlayın.
- Zsh'in nimetlerinden daha fazla faydalanmak için serinin devamındaki [Zsh İçerisinde Shopt Kullanmak](/zsh-icerisinde-shopt-kullanmak/) makalesine mutlaka göz atın.
- Kendi özel kısayollarınızı tanımlamaya başlayın.

---

## 🛠️ Yaygın Sorunlar ve Çözümleri

### 1. Temadaki Karakterler veya Simgeler Bozuk Görünüyor (Kutu Kutu Oluyor)
*   **Çözüm:** Terminalinizde simge desteği olan bir yazı tipi (Powerline font veya Nerd Fonts) seçilmemiştir. Sisteminizde `ttf-nerd-fonts-symbols` paketinin veya benzer bir fontun kurulu olduğundan ve terminal ayarlarından seçildiğinden emin olun.

### 2. Eklentileri Kurdum Ama Çalışmıyor
*   **Çözüm:** `.zshrc` dosyasını güncelledikten sonra mevcut terminal oturumuna yüklememiş olabilirsiniz. Hemen `source ~/.zshrc` komutunu koşturarak ayarları tazeleyin.

### 3. Renkler Çok Sönük veya Hiç Yok
*   **Çözüm:** Kullandığınız terminal emülatörünün (örneğin Alacritty, Kitty veya GNOME Terminal) 256 renk desteğinin aktif olduğundan emin olun.

---

## 🔗 Yararlı Kaynaklar

- [Oh My Zsh Resmi Sitesi](https://ohmyz.sh/){: target="\_blank" rel="noopener noreferrer"}
- [Zsh Dokümantasyonu](https://zsh.sourceforge.io/Doc/){: target="\_blank" rel="noopener noreferrer"}
- [Oh My Zsh GitHub Deposu](https://github.com/ohmyzsh/ohmyzsh){: target="\_blank" rel="noopener noreferrer"}

---

Bu makale **Oh My Zsh** serisinin ilk adımıydı. Kafanıza takılan bir yer olursa veya Arch Linux üzerinde kurarken bir hatayla karşılaşırsanız yorumlarda buluşalım, sistemi beraber ayağa kaldırırız! 😉



