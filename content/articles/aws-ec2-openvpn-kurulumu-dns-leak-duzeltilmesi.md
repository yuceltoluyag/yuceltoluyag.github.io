Title: AWS EC2'de OpenVPN Nasıl Kurulur ve DNS Leak Nasıl Düzeltilir
Date: 2022-01-28 12:00 10:00
Modified: 2025-08-11 22:59
Category: Ağ ve İnternet
Tags: linux, vpn
Slug: aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi
Authors: yuceltoluyag
Summary: AWS EC2 üzerinde OpenVPN kurulumunun nasıl yapılacağı ve DNS leak probleminin nasıl çözüleceği hakkında adım adım rehber.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/amazon-openvpn-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985150173003019
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrpblsntc27

## Merhaba

Aylarca önce yazmam gereken bir konu daha bugün nasip oldu 😌

## VPN Nedir?

**Finlandiya**'da amcanızın oğlu _her web sitesine, uygulamaya, oyuna, müziğe, filme_ kısacası internete bulunan her şeye **özgürce ulaşabiliyor**. Ülkenizde ise her gün yeni bir siteye **erişim engeli** konuluyor diyelim 😔 Keşke ben de amcamın oğlunun yanında olsam, onun internetinden bağlansam ne güzel olurdu diyorsunuz.🥺 Amcanızın oğlu size diyor ki, **"Böyle bir şey yapabiliriz. Sanal ağ üzerinden bana bağlanırsın, tıpkı yanındaymışsın gibi, internetimi kullanabilirsin"** ve siz nasıl mutlusunuz 🥳 Yani sanallaştırılmış bir ağa uzaktan bağlantı yoluyla fiziksel olarak bağlanmış oluyorsunuz.🐒

## Neden Ücretli VPN Kullanmıyoruz?

Paranız çok, zamanınız azsa, kullan tabii ki sevgili okurum 🐸 Bazı VPN'ler ucuz gibi görünsede veri güvenliği açısından pek güvenilir değiller. Verilerinizi satmıyoruz deseler de, **"Satarız efendim, satarız, gayet rahat satarız"** politikası işliyor. 😅 Gizlilik paranoyası olan bir adam değilim, ancak **"Hem paranızı hem verilerinizi kaptırmayın."**

## Kurulum

1.  Hesabınız yoksa bir Amazon hesabı açın.
2.  [OpenVPN Access Server](https://aws.amazon.com/marketplace/pp/prodview-y3m73u6jd5srk){: target="\_blank" rel="noopener noreferrer"} **Continue to Subscribe** tıklayın

[responsive_img src="/images/amazon-openvpn-kurulumu-xl.webp" alt="amazon-openvpn-kurulumu" /]

3.  Lisans Sözleşmesini kabul edin

    [responsive_img src="/images/amazon-openvpn-kurulumu-2-xl.webp" alt="amazon-openvpn-kurulumu-2" /]

4.  Lisans bilgisi resimdeki gibi görünecektir. **Continue to Configuration** tıklayıp devam edin

    [responsive_img src="/images/amazon-openvpn-kurulumu-3-xl.webp" alt="amazon-openvpn-kurulumu-3" /]

5.  Yazılım versiyonunu seçin ve lokasyon olarak **Almanya Frankfurt** bölgesini seçin. Ardından **Continue to Launch** tıklayın.

    [responsive_img src="/images/amazon-openvpn-kurulumu-4-xl.webp" alt="amazon-openvpn-kurulumu-4" /]

6.  Yeni formdaki seçimlerimiz şöyle olmalı:

    [responsive_img src="/images/amazon-openvpn-kurulumu-5-xl.webp" alt="amazon-openvpn-kurulumu-5" /]

7.  Security Group Settings ve Key Pair Settings ayarlarını oluşturmanız gerekiyor. Ben kızımın adını verdim 🏌️‍♂️

    [responsive_img src="/images/amazon-openvpn-kurulumu-6-xl.webp" alt="amazon-openvpn-kurulumu-6" /]

    Key oluşturma işlemine dair örneği de göstereyim

    [responsive_img src="/images/amazon-openvpn-kurulumu-7-xl.webp" alt="amazon-openvpn-kurulumu-7" /]

    **"ED25519"** anahtarları yalnızca Linux ve Mac'te kullanılabilir. Bu yüzden RSA seçtik. Kaydettikten sonra pem uzantılı dosyanız indirilecektir. Kaybetmeyiniz, saklayınız, kimseye göstermeyiniz 😉

8.  Security kısmı ise şöyle:

    [responsive_img src="/images/amazon-openvpn-kurulumu-8-xl.webp" alt="amazon-openvpn-kurulumu-8" /]

    İsme ve açıklamaya dilediğiniz gibi yazabilirsiniz. VPN güvenliğini artırmak için bu bağlantı noktalarına erişimi belirli bir IP adresiyle veya adres bloğuyla (kendi ISS'nizinki gibi) kısıtlamak isteyebilirsiniz. Ancak IP adresiniz sık sık değişiyorsa, bağlantı noktalarını kısıtlamak yeterli olmayabilir. VPN'iniz bağlanmak için SSH anahtarlarına ihtiyaç duyacak ve OpenVPN sunucusu da parola korumalı olacaktır. Başka belirli güvenlik hedefleriniz yoksa, şimdilik varsayılan ayarları kabul etmenizde bir sakınca yoktur. **Launch** yolumuza devam edelim.

9.  Ta ta, makine kurulumu bitti

    [responsive_img src="/images/amazon-openvpn-kurulumu-9-xl.webp" alt="amazon-openvpn-kurulumu-9" /]

## DNS LEAK

Amcaoğlunun ağına bağlandıkta, bir siteye istek attığımızda, DNS adreslerimiz halen kendi ISS'mizden istek atıyor. Saldırganlar genelde sahte web siteleri oluşturur, analiz servisleriyle IP adresinizi, konumunuzu, işletim sisteminizi vb. birçok bilgiyi toplayabilirler. IP adresinizi aldıktan sonra karşı taraf hiçbir şey yapamasa bile saldırı yapıp rahatınızı bozabiliyor. VPN açıkken DNS Leak testini otomatik yapabileceğiniz bir adres veriyorum şimdi 😁 [dnsleaktest.com](https://www.dnsleaktest.com/){: target="\_blank" rel="noopener noreferrer"} Siteye girip Extended test yapmanız yeterli. Bu resimdeki ucuz, ücretsiz bir VPN'in testi 😆 ![Extended-test](/images/Extended-test-xl.webp) **Peki bunla neler mi yapıyorlar? Dilerseniz bonus bölümünden okuyabilirsiniz 😁** Çözüme devam edelim...

### EC2 Elastik IP

1.  **Network & Security** menüsü altındaki **Elastic IPs** menüsüne tıklıyoruz.

    [responsive_img src="/images/amazon-openvpn-kurulumu-10-xl.webp" alt="amazon-openvpn-kurulumu-10" /]

2.  Daha sonra **Allocate Elastic IP address** menüsüne tıklayıp, Amazon havuzlarından bir adet IPv4 adresi talep edin. Oluşturduktan sonra aynı sayfadan **Associate address** e tıklayıp, aktif VPN sunucunuzu seçin. Eğer her şeyi doğru şekilde yaptıysanız, instance kısmında elastik IP kısmına IP adresiniz atanmış olmalı.

    [responsive_img src="/images/amazon-openvpn-kurulumu-11-xl.webp" alt="amazon-openvpn-kurulumu-11" /]

## Sunucu Ayarları

Terminalinizi açın.

```bash
sudo chmod 400 <dosyaisminiz>.pem
```

`-r--------` Bu, dosya izinlerini yalnızca kullanıcı (siz) tarafından okunabilecek şekilde ayarlar. Özel anahtarın diğer kullanıcılar tarafından yapılan okuma ve yazma işlemlerinden korunmasına yardımcı olabilir, ancak daha da önemlisi, bulut sunucunuza bağlanmaya çalıştığınızda AWS'nin hata vermesini önleyecektir.

Şimdi sunucumuza bağlanalım:

```bash
ssh -i <dosyaisminiz>.pem openvpnas@<elastic ip adresiniz>
```

Kullanıcı `openvpnas`, örneğinize bağlanmanıza izin vermek için OpenVPN Erişim Sunucusu tarafından ayarlanır. Bağlandıktan sonra istediğiniz gibi ayarları yapabilirsiniz. Yanlış bir şey yaparsanız, panel üzerinden ayarları değiştirebilirsiniz. Ayrıca, kurulumu yeniden yapmak isterseniz şu komutu kullanabilirsiniz:

```bash
sudo ovpn-init –ec2
```

**Kurulum Sihirbazı** ile ilgili daha fazla detaylı yapılandırma adımları:

```bash
          OpenVPN Access Server
          Initial Configuration Tool
------------------------------------------------------
Please enter 'yes' to indicate your agreement [no]: yes
...
```

Daha sonra **openvpn** adlı kullanıcının şifresini değiştirin:

```bash
sudo passwd openvpn
```

SSH bağlantısını kapatmak için `exit` yazın. Ardından **https://elastic-ip-adresiniz:943/** adresinden web paneline bağlanabilirsiniz. SSL hatası alırsanız, gelişmiş menüsüne tıklayıp devam edin.

[responsive_img src="/images/amazon-openvpn-kurulumu-12-xl.webp" alt="amazon-openvpn-kurulumu-12" /]

## Sonuçlar

[responsive_img src="/images/amazon-openvpn-kurulumu-13-xl.webp" alt="amazon-openvpn-kurulumu-13" /]

[responsive_img src="/images/amazon-openvpn-kurulumu-14-xl.webp" alt="amazon-openvpn-kurulumu-14" /]

## Bonus: Cool Story Bro 🧿

Arkadaşım hep ücretli VPN'ler kullanırdı.😍 Bir gün kendisinden denemek için VPN aldım: NORDVPN 🤶🏼. Başlarda Telekom'un bölgesel bir arızası var sandım... Ancak bir gün modem ayarlarını kurcalarken ne göreyim 🤐 Modemin üstünden tüm ülkeler port tarama saldırısı gerçekleştiriyor.

```text
[Kernel][Alert] firewall security alert! [Fragment Flooding] attack, possible.
```

Hemen Türk Telekom'daki arkadaşlara ulaştım, ancak derdimi bir türlü anlatamadım. Neyse ki saldırı başladığında modemi kapatarak sorunu çözdüm. Bu olaydan sonra şunu öğrendim: Ücretli veya ücretsiz VPN kullanın, DNS Leak'e yakalanmayın. Bol VPN'siz günler!



