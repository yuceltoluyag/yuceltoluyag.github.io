Title: Linux'ta HTTrack Kullanımı
Date: 2018-12-01 12:00 10:00
Modified: 2025-08-11 22:59
Category: Ağ ve İnternet
Tags: httrack, linux
Slug: linux-ta-httrack-kullanimi
Authors: yuceltoluyag
Summary: Linux üzerinde HTTrack kullanarak web sitelerini çevrimdışı olarak nasıl indirebileceğinizi adım adım öğrenin. İnternet bağlantınız olmasa bile favori sitelerinize erişin ve web arşivleri oluşturun.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/httrack-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982912012327637
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqpgkmt3s27

Merhaba! HTTrack, internet bağlantınız olmadığında bile web sitelerini kullanabilmenizi sağlayan bir yazılımdır. Windows tarafında sıkça kullandığım bu yazılımı, Linux terminali üzerinden nasıl kullanabileceğinizi anlatan bir döküman hazırlamak istedim.

Adım 1: HTTrack Kurulumu

Öncelikle HTTrack’i kurmamız gerekiyor. Aşağıdaki komutla yazılımı kurabilirsiniz:

```bash
sudo apt-get install httrack  # Programı kuruyoruz
```

Adım 2: Proje Bilgilerini Girin

HTTrack kurulduktan sonra, aşağıdaki bilgileri girmeniz istenecektir:

```bash
project name :  # Projenin ismi
Base path (return=/home/baba/websites/):  # Projenin indirileceği dizin
Enter URLs (separated by commas or blank spaces) :  # Kaydedeceğiniz websitesinin adresi
```

Adım 3: Aksiyon Seçimi

İşlem sırasında karşınıza şu menüler çıkacaktır:

- Siteyi kopyala
- Siteyi sihirbaz yöneticisi ile kopyala
- Sadece dosyaları çek
- Tüm linklerin bir kopyasını çek (Bu seçenek hakkında emin değilim çünkü kullanmadım)
- Bookmark testi uygula
- Çıkış

Genellikle 1. seçeneği kullanıyorum, çünkü diğer seçeneklere ihtiyaç duymadım. Bazı web siteleri HTTrack karşı önlem almış olabilir, dolayısıyla her URL'yi indireceksiniz diye bir kural yok. Çevrimdışı olarak indirdiğiniz siteyi sağ tıklayıp "Öğeyi İncele" menüsünden incelemeniz faydalı olacaktır. Eğer kırmızı renk ile yazılmış hata mesajları görürseniz, bunları düzeltmeniz gerekebilir.

Adım 4: [YouTube Kanalım](https://www.youtube.com/channel/UCJyK4D5BcoPXjV5T8N8-liA?view_as=subscriber){: target="\_blank" rel="noopener noreferrer"}

Daha fazla rehber ve video için kanalımı ziyaret edebilirsiniz.

Bunu okudunuz mu? Şimdi [wget ile web sitesi indirme rehberi](/wget-ile-web-sitesi-indirme)'de göz atabilirsiniz.

[responsive_img src="/images/httrack-xl.webp" alt="httrack" /]
