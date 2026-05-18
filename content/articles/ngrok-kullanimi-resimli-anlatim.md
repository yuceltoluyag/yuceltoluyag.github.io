Title: Ngrok Kullanımı Resimli Anlatım
Date: 2017-02-22
Category: Web Geliştirme
Author: yuceltoluyag
Slug: ngrok-kullanimi-resimli-anlatim
Summary: Ngrok ile lokal projelerinizi kolayca internete açarak canlı demo paylaşımı yapabilirsiniz. Linux için güncellenmiş kurulum ve kullanım rehberi.
Tags: ngrok, localhost, xampp, linux, web geliştirme
Lang: tr
Translation: false
Image: images/ngroknasilkullanilir-xl.webp
Status: published
toot: https://mastodon.social/@yuceltoluyag/115601341245788252
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3m6ddz5wsfk2z

## Ngrok Kullanımı Resimli Anlatım

!!! note "Yazıdaki eski görseller silindiği için anlatım Linux için güncellenmiştir. (08 Mart 2017)"
Merhaba, localde kodladığınız projenizi arkadaşlarınıza veya müşterinize canlı olarak gösterebilmek için eskiden çeşitli karmaşık işlemler yapmak gerekirdi.  
**Ngrok** sayesinde artık bu işlemleri kolayca gerçekleştirebilirsiniz. Programın kullanımı ve kurulumu oldukça basittir.

## Ngrok’u İndirme

[Ngrok’un resmi web sitesinden](https://ngrok.com/download){: target="\_blank" rel="noopener noreferrer"} işletim sisteminize uygun sürümü indirin.  
Diğer sistemler için “Docs” kısmından yararlanabilirsiniz.

Terminalimizi açıyoruz ve dosyayı indirdiğimiz klasöre gidiyoruz.  
Tek disk kullandığım için ben **İndirilenler** klasörüne indirdim.

```bash
cd İndirilenler
./ngrok help
```

Bu şekilde **Ngrok’un kullanım seçenekleri** hakkında bilgi alabilirsiniz.

!!! tip "İpucu ⚡ Ngrok help komutu, komut parametrelerini hızlıca hatırlamak için idealdir."

## Local Sunucuyu Başlatmak

Daha sonra kullandığınız local sunucuyu (örneğin XAMPP) başlatıyoruz.

```bash
cd /opt/lampp
sudo ./manager-linux.run
```

Yukarıdaki komut XAMPP arayüzünü açar.
Eğer arayüzü kullanmadan başlatmak isterseniz şu komutu yazın:

```bash
sudo /opt/lampp/lampp start
```

!!! note "Not: Arayüzsüz çalıştırmak genelde daha hızlıdır, ancak hata çıktılarıyla doğrudan terminal üzerinden ilgilenmeniz gerekir."

## Ngrok ile Projenizi Yayına Açmak

Local sunucunuzu başlattıktan sonra aşağıdaki komutu yazın:

```bash
./ngrok http 80
```

!!! warning "Dikkat! Komutu `htpp` değil `http` olarak yazmalısınız, aksi halde hata alırsınız."

[responsive_img src="/images/ngroknasilkullanilir-xl.webp" alt="Ngrok kullanımı örneği" /]

Bu komut çalıştıktan sonra terminalde şöyle bir adres göreceksiniz:

```
http://bb10ad8c.ngrok.io
```

Bu adresi projenizi göstereceğiniz kişilere gönderebilirsiniz.
Ancak bu şekilde gönderirseniz kişi **ana dizininizi** görür.
Eğer yalnızca belirli bir klasörü göstermek istiyorsanız, proje klasörünü ekleyerek paylaşmanız gerekir:

```
http://bb10ad8c.ngrok.io/projeklasoru
```

Örneğin:

```
http://bb10ad8c.ngrok.io/sosyalagprojesi
```

!!! tip "İpucu ⚡ Belirli bir klasör paylaşırsanız, yalnızca o dizin altındaki dosyalar erişilebilir olur."

Eğer yerel geliştirme ortamınızda IP adresleri ve klasör yolları yerine şık, özel yerel alan adları kullanmak isterseniz, [XAMPP Özel Alan Adı Tanımlama](/xampp-ozel-alan-adi/) rehberim tam aradığınız şey!

İyi çalışmalar! 😊



