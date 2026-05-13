Title: Jekyll Blog Kurulumu
Date: 2017-03-12
Category: Web Geliştirme
Author: yuceltoluyag
Slug: jekyll-blog-kurulumu
Summary: Jekyll ile hızlı ve veritabanı gerektirmeyen bir blog oluşturma rehberi. Terminal üzerinden kurulum ve GitHub Pages'e entegrasyon adımları.
Tags: jekyll, github pages, ruby, blog, web geliştirme
Lang: tr
Translation: false
Image: images/bundleexecjekyllserve-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601400903399600
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6des5yyvs26

## Jekyll Blog Kurulumu

Merhaba, Jekyll blogu nasıl kurduğuma dair mesaj gelmiş. Öncelikle kurulumu ve kullanımı oldukça basittir. Veritabanı gibi karmaşık yapılandırmalar gerektirmez. Statik bir site oluşturduğu için doğru ayarları yapıp sabırlı olduğunuzda blogunuz kısa sürede erişilebilir olacaktır.

## Kurulum

Terminalimizi açıyoruz ve aşağıdaki adımları sırasıyla uyguluyoruz:

```bash
sudo apt-get install ruby ruby-dev make gcc
```

» Enter’a basın

```bash
sudo apt-get install ruby ruby-full ruby-bundler
```

» Enter’a basın

```bash
sudo gem install jekyll
```

» Enter’a basın

```bash
jekyll -v
```

» Bu şekilde Jekyll sürümünüzü görebilirsiniz. Şu an Jekyll **3.4.2** sürümünde.
Buraya kadar işlemlerinizde bir problem yoksa şimdi sıra geldi blogumuzu kurmaya:

```bash
jekyll new blog
```

» Enter’a basın — _Ev_ klasörünüzde **blog** isminde bir dizin oluşturulacaktır.

```bash
cd blog
bundle install
bundle exec jekyll serve
```

» Localinizde **4000 portu** üzerinde kurduğunuz blogu görebileceksiniz.
Son olarak:

```bash
jekyll serve
```

!!! tip "İpucu ⚡ Eğer Bash çıktısı resimdeki gibi olursa sıkıntı yok."
[responsive_img src="/images/bundleexecjekyllserve-xl.webp" alt="Bundle Exec Jekyll" /]

» [http://127.0.0.1:4000/](http://127.0.0.1:4000/){: target="\_blank" rel="noopener noreferrer"} adresine girdiğinizde blogunuzu görebileceksiniz.

## Github Pages Üzerinde Jekyll Blogu Barındırma

Şöyle sesler duyar gibiyim: “Ee, GitHub’da nasıl olacak?”
Buradaki mantık şu şekilde: Eğer bir eklenti veya tema kuracaksanız, önce lokalde denemeli, ardından repoya göndermelisiniz. Aşağıdaki yöntem daha basit olacaktır ancak dersin sonunda vereceğim bağlantıları da incelemenizde fayda var. Benim yaptığım gibi öğrenirseniz mantığını da kavrarsınız.

### Çok Basit GitHub Pages Üzerinde Jekyll Kurulumu

1. GitHub hesabınıza giriş yapın.

2. [Jekyll GitHub sayfası](https://github.com/jekyll/jekyll){: target="\_blank" rel="noopener noreferrer"}’na gidip **Fork** işlemi yapın.
   Forkladıktan sonra kendi profilinizde **jekyll** isminde bir repo oluşacaktır.
   (GitHub repo fork menüsünü sağ üstte gördünüz umarım 😄)

3. Fork işlemi bittikten sonra profilinize dönün ve reponuza tıklayın.
   Ardından **Settings** menüsüne girin.
   Repo ismini oluşturmak istediğiniz blog adresine göre değiştirin.

```bash
githubreponame (resim görseli kayboldu)
```

Biraz bekledikten sonra, **Settings** kısmının en altındaki “Pages” alanından blogunuzun durumunu görebilirsiniz.
Onayın daha hızlı gerçekleşmesi için **theme** kısmından rastgele bir tema seçip kaydetmeniz tavsiye edilir.

```bash
muhtesemjekyll (resim görseli kayboldu)
```

## İşin Mantığını Anlamak

Git kullanımı oldukça basittir; öyle saatlerinizi ayırmanız gerekmez.
Markdown formatında yazdığımız için başta garip gelebilir ama alıştıkça çok kolaylaşır.
Ben **Sublime Text** pluginini ve zaman zaman **Remarkable** uygulamasını kullanıyorum.
Ancak Markdown yazmayı öğrendikten sonra bunlara pek gerek kalmıyor.

!!! note "Not: Markdown öğrenmek Jekyll ile çalışırken uzun vadede en büyük kolaylığı sağlar."

## Alternatifler ve Ek Araçlar

“Abi ben WordPress’çiyim, yok mu bize bir şeyler?” diyenler için güzel bir haber var:
**Mert Kahyaoğlu’nun geliştirmiş olduğu Jekyll Admin eklentisini** kullanabilirsiniz.
Ayrıca **Ngrok** kullanarak lokalden yayın yapmanız da mümkündür.



