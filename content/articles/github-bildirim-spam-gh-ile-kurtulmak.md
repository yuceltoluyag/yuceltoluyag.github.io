Title: GitHub Bildirim Spam'inden 'gh' ile Nasıl Kurtulunur?
Date: 2025-11-21 16:30
Category: Git
Tags: github, gh, cli, bildirim, terminal
Slug: github-bildirim-spam-gh-ile-kurtulmak
Authors: yuceltoluyag
Summary: GitHub'daki o bitmek bilmeyen spam bildirimler canınızı mı sıkıyor? Gelin, 'gh' adlı komut satırı aracıyla bu bildirimleri nasıl 'okundu' yapıp kurtuluruz, ona bakalım.
Image: images/github-bildirim-spam-gh-ile-kurtulmak-xl.webp
Lang: tr
Translation: false
Status: published
Series: Git
Series_index: 10
toot: https://mastodon.social/@yuceltoluyag/115629659438859595
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3m6pwf7kn5s2o

Yine o sabahlardan biri... Bir kalkıyorsun, kahveni almışsın, güne hazırsın sanıyorsun. Sonra bir bakıyorsun GitHub'da kıpkırmızı bir bildirim noktası parlıyor. Tıklıyorsun. Ve evet, 30 yeni bildirim. Şöyle bir göz gezdirince anlıyorsun ki bunların belki sadece biri önemli, geri kalan 29'u ise alakasız bir projede adının geçtiği, artık hiçbir ilgin olmayan bir "issue" takibi. Tam bir baş ağrısı. 🤯

Bu bildirimleri web arayüzünden tek tek bulup, "Done" demek de bir seçenek tabii. Ama kimin var o kadar vakti? Hele ki o arayüzde doğru bildirimi bulmak bazen samanlıkta iğne aramaya dönüyor. Kısacası, daha iyi bir yol olmalı.

İşin ilginç yanı, var.

## `git` Değil, `gh`! Bu Ne Ola ki?

Şimdi, burada bir karışıklık olmasın. Herkesin bildiği, kullandığı `git` komutları (`push`, `pull`, `commit` falan) ayrı bir dünya. O, versiyon kontrolünün kendisi. Ama bir de GitHub'ın kendi geliştirdiği `gh` diye bir komut satırı aracı (CLI) var.

Bu `gh` denen şey, doğrudan GitHub özellikleriyle konuşuyor. Pull Request açmak, Issue'ları listelemek... ve evet, bildirimleri yönetmek gibi işler yapıyor. Bunu ilk duyduğumda "Ne gerek vardı ki?" dediğimi hatırlıyorum ama bazı durumlarda hayat kurtarıyor cidden.

!!! note "Küçük Bir Yanlış Anlama Aslında az önce de bahsettik ya, bazıları bu 'gh' denen şeyi 'grafik arayüzü' zannediyor. Halbuki alakası yok. Bu tamamen terminalden çalışan bir araç. Yani klavye delikanlılığına devam! ⌨️"

Eğer sisteminizde kurulu değilse, `gh` komutunu çalıştırdığınızda "command not found" gibi bir hata alırsınız. Kurulumu basit. Eğer Arch Linux gibi bir şey kullanıyorsanız `sudo pacman -S github-cli` ile, macOS kullanıyorsanız `brew install gh` ile halledebilirsiniz. Diğer sistemler için de [resmi sitesinde](https://cli.github.com/){: target="\_blank" rel="noopener noreferrer"} gayet net anlatmışlar.

!!! tip "Unutma! `gh` aracını kullanmadan önce terminalde `gh auth login` komutuyla hesabınıza bir kere giriş yapmanız gerekiyor. Yoksa 'Git abim beni tanımıyor' diye ağlamayın."

## Hadi Şu Spam'i Temizleyelim: Adım Adım `gh` Kullanımı

Neyse, geyiği bırakalım da işe dönelim. Amacımız belli: o istenmeyen, spam bildirimden kurtulmak. Sadece iki adıma bakıyor her şey.

### Adım 1: Bütün Bildirimleri Dökelim Ortaya

İlk yapacağımız şey, okunmamış tüm bildirimleri bir listelemek. Bunun için komutumuz şu:

```bash
gh api notifications
```

Bu komutu bir çalıştırıyorsun... Karşına böyle acayip, karman çorman, JSON formatında bir metin yığını çıkacak. Sakın korkma. Gözünü korkutmasın. Bize oradan lazım olan tek bir şey var: kurtulmak istediğimiz bildirimin kimlik numarası, yani `id`'si.

Çıktı aşağı yukarı şuna benzeyecektir:

```json
[
  {
    "id": "19105015689",
    "repository": {
      "full_name": "notifier-mail/gitcoin.com"
    },
    "subject": {
      "title": "Buralarda bir yerlerde bildirimin başlığı yazar",
      "url": "..."
    },
    "reason": "mention",
    "unread": true,
    "url": "https://api.github.com/notifications/threads/19105015689"
  }
]
```

Genelde `url` alanının en sonundaki o upuzun sayı oluyor aradığımız `id`. Sanırım... Ben hep oradan buldum en azından. Başlıktan (`title`) doğru bildirimi bulduğundan emin ol yeter. O ID'yi bir kenara kopyalayın. Sonraki adımda lazım olacak.

### Adım 2: Oku ve Kurtul! DELETE Emri

ID'yi kaptık mı? Tamamdır. Şimdi o bildirimi "okundu" olarak işaretleyip ortadan kaldırma zamanı.

!!! warning "Dikkat! ☢️ Emin ol doğru ID'yi kopyaladın. Yanlışlıkla önemli bir bildirimi okundu olarak işaretlersen haberin olmaz, arada kaynar gider. İki kere, hatta üç kere kontrol et! Ben uyardım."

Komutumuz şu şekilde:

```bash
gh api -X DELETE notifications/threads/ID_BURAYA_GELECEK
```

`ID_BURAYA_GELECEK` yazan yere, az önce kopyaladığınız o uzun sayıyı yapıştıracaksınız. Mesela bizim örnekteki ID için komut şöyle olurdu:

```bash
gh api -X DELETE notifications/threads/19105015689
```

Bu komutu çalıştırdığınızda hiçbir şey olmayacak gibi görünür. Çıktı falan vermez genelde. Ama arka planda o bildirim artık "okunmuş" olarak işaretlendi. GitHub'a gidip baktığınızda o kırmızı noktanın kaybolduğunu göreceksiniz. Ya da en azından sayının bir azaldığını. Büyük zafer! 😎

API dünyası da bir garip yani. Bir şeyi "okundu" yapmak için `DELETE` (Sil) fiilini kullanmak... Böyle demek çok resmi kaçtı, dur şöyle düzelteyim: Adamlar "okundu olarak işaretle" diye ayrı bir komut yapmak yerine "listeden silinsin gitsin" mantığıyla `DELETE` demişler herhalde. Neyse, çalışıyor mu? Çalışıyor. Gerisi teferruat.

## Sonuç? Yani, Şimdilik...

İşte böyle. Tek bir komutla o sinir bozucu bildirimden kurtulduk. Büyük bir zafer mi? Hayır. Ama gün içinde kazandığımız küçük zaferler bunlar işte. Bu, bana kalırsa en az 5-10 saniye kazandırdı, belki daha fazla! O saniyelerde ne yaparsın? Bilgisayarın başında esnersin, kahve yudumlarsın... Neyse.

Tabii bu, o projenin size bir daha bildirim göndermeyeceği anlamına gelmiyor. Bu döngü maalesef hiç bitmiyor. Ama en azından artık o anlık sinir bozukluğunu terminalden hızlıca çözmek için bir silahımız var. Aklıma geldi de, bunu toplu yapmak için küçük bir `bash` script'i yazılabilir aslında... Neyse, o da başka bir günün konusu.

!!! tip "Daha Fazlası İçin GitHub API'sinin diğer nimetlerini merak ediyorsanız, GitHub'ın [REST API dokümanları](https://docs.github.com/en/rest){: target='\_blank' rel='noopener noreferrer'} derya deniz. Ama dikkat, içinde kaybolabilirsiniz."

---

[responsive_img src="/images/github-bildirim-spam-gh-ile-kurtulmak-xl.webp" alt="Github Görünmeyen bildirim" /]



