---
layout: post
title: AWS EC2'de OpenVPN nasıl kurulur ve DNS Leak nasıl düzeltilir
description: How to set up OpenVPN on AWS EC2 and fix DNS leaks
image: "/assets/images/amazon-openvpn-kurulumu-14.webp"
category: linux
tags: [linux, vpn]
comments: false
edit_url: true
toc: true
---

**Merhaba**

Aylarca önce yazmam gereken bir konu daha bugüne nasip oldu 😌

# VPN Nedir ?

**Finlandiya**'da amcanızın oğlu _her web sitesine,uygulamaya,oyuna,müziğe,filme_ kısacası internete bulunan herşeyi **özgürce ulaşabiliyor**. Ülkenizdede, hergün yeni bir siteye **erişim engeli** konuluyor diyelim 😔 Keşke bende amcamın oğlunun yanında olsam,onun internetinden bağlansam ne güzel olurdu diyorsunuz.🥺 Amcanın oğluda size diyor ki, **"Böyle birşey yapabiliriz. Sanal ağ üzerinden bana bağlanırsın,tıpkı yanındaymışşın gibi,internetimi kulllanabilirsin"** diyor ve siz nasıl mutlusunuz 🥳 Yani sanallaştırılmış bir ağa uzaktan bağlantı yoluyla fiziksel olarak bağlanmış oluyorsunuz.🐒

## Neden Ücretli VPN Kullanmıyoruz.

Paran çok,zamanın azsa kullan tabikide sevgili okurum 🐸 Bazı VPN'ler sudan ucuz gibi görünsede veri güvenliği açısından pek yanaşılacak gibi değil... Verilerinizi satmıyoruz deselerde **"Satarız efendim satarız gayette rahat satarız"** politikası cıncık gibi işliyor. 😅 Gizlilik paronayası olan bir adam değilim, lakin **" Hem paranızı hem verilerinizi kaptırmayın".** .

# Kurulum

1.  Hesabınız yoksa bir amazon hesabı açın.
2.  [# OpenVPN Access Server](https://aws.amazon.com/marketplace/pp/prodview-y3m73u6jd5srk){:target="\_blank"}{:rel="noopener noreferrer"} **Continue to Subscribe** tıklayın

    ![amazon-openvpn-kurulumu](/assets/images/amazon-openvpn-kurulumu.webp)

3.  Lisans Sözleşmesini kabul edin

    ![amazon-openvpn-kurulumu-2](/assets/images/amazon-openvpn-kurulumu-2.webp)

4.  Lisans bilginiz resimdeki gibi görünecektir.**Continue to Configuration** tıklayıp devam edin

    ![amazon-openvpn-kurulumu-3](/assets/images/amazon-openvpn-kurulumu-3.webp)

5.  Yazılım Versiyonu olarak güncel olanı seçiyorum. Lokasyon olarakta **Almanya Frankfurt** bölgesini seçiyorum. Ardından **Continue to Launch** tıklayın.

![amazon-openvpn-kurulumu-4](/assets/images/amazon-openvpn-kurulumu-4.webp)

6.  Yeni formdaki seçimlerimiz ise şöyle

    ![amazon-openvpn-kurulumu-5](/assets/images/amazon-openvpn-kurulumu-5.webp)

7.  Security Group Settings ve Key Pair Settings ayarlarını oluşturmamız gerekiyor. Ben kızımın adını verdim 🏌️‍♂️

    ![amazon-openvpn-kurulumu-6](/assets/images/amazon-openvpn-kurulumu-6.webp)

    Ben daha önceden Key oluşturmuştum ama nasıl oluşturduğumu sizede göstereyim

    ![amazon-openvpn-kurulumu-7](/assets/images/amazon-openvpn-kurulumu-7.webp)

    **"ED25519"** anahtarlarını yalnızca Linux ve Mac 'te kullanabilirsiniz. Bu yüzden RSA seçtik. Kaydettikten sonra pem uzantılı dosyanız inecektir. Kaybetmeyiniz,saklayınız,kimselere göstermeyiniz 😉

8.  Security kısmı ise şöyle

    ![amazon-openvpn-kurulumu-8](/assets/images/amazon-openvpn-kurulumu-8.webp)

    İsme ve açıklamaya dilediğinizi yazabilirsiniz. Vpn güvenliğini artırmak için bu bağlantı noktalarına erişimi belirli bir IP adresiyle veya adres bloğuyla (kendi ISS'nizinki gibi) kısıtlamak isteyebilirsiniz. Ancak IP adresiniz sık sık değişiyorsa, bağlantı noktalarını kısıtlamak umduğunuz kadar yardımcı olmayabilir. Vpniniz bağlanmak için SSH anahtarlarına ihtiyaç duyacak ve OpenVPN sunucusuda parola korumalı olacaktır. Başka belirli güvenlik hedefleriniz yoksa, şimdilik varsayılan ayarları kabul etmenizde bir sakınca yoktur. **Launch** yolumuza devam edelim

9.  Ta ta makine kurulumu bitti

    ![amazon-openvpn-kurulumu-9](/assets/images/amazon-openvpn-kurulumu-9.webp)

## DNS LEAK

Amcaoğlunun ağına bağlandıkta, bir siteye istek attığımızda, dns adreslerimiz halen kendi ISS mizden istek atıyor. Saldırganlar genelde fake web siteleri oluşturur,analiz servisleriyle ip adresiniz,konumuz,işletim sisteminiz vb bir çok bilgiyi toplayabiliyor. İp adresinizi aldıktan sonra karşı taraf hiçbir şey yapamasa bile, saldırı yapıp,rahatınızı bozuyor... Vpn açıkken DNS Leak testini otamatik yapabileceğiniz bir adres veriyorum şimdi 😁 [dnsleaktest.com](https://www.dnsleaktest.com/){:target="\_blank"}{:rel="noopener noreferrer"} Siteye girip Extended test atmanız yeterli. Bu resimdeki upucuz, beleşmi beleş bir vpnin testi 😆 ![Extended- test](/assets/images/Extended- test.webp) **Peki bunla neler mi yapıyorlar,dilersen bonus bölümünden okuyabilirsin 😁** Çözüme devam edelim....

### EC2 Elastik İp

1.  **Network & Security** menüsü altındaki **Elastic IPs** menüsüne tıklıyoruz.

    ![amazon-openvpn-kurulumu-10](/assets/images/amazon-openvpn-kurulumu-10.webp)

2.  Daha sonra **Allocate Elastic IP address** menüsüne tıklayıp , amazon havuzlarından 1 adet ipv4 adres talep edin. Oluşturduktan sonra yine aynı sayfadan **Associate address** e tıklayıp,aktif vpn sunucunuzu seçin. Eğer herşeyi doğru şekilde yaptıysanız instance kısmında elastik ip kısmına ip adresinizin atanmış olması gerekli.

    ![amazon-openvpn-kurulumu-11](/assets/images/amazon-openvpn-kurulumu-11.webp)

## Sunucu Ayarları

Terminalinizi açın.

```bash
sudo chmod 400 <dosyaisminiz>.pem
```

`-r--------` Bu, dosya izinlerini yalnızca kullanıcı (siz) tarafından okunabilecek şekilde ayarlar . Özel anahtarın diğer kullanıcılar tarafından yapılan okuma ve yazma işlemlerinden korunmasına yardımcı olabilir, ancak daha da önemlisi, bulut sunucunuza bağlanmaya çalıştığınızda AWS'nin hata vermesini önleyecektir.

Şimdi sunucumuza bağlanalım:

```bash
ssh -i <dosyaisminiz>.pem openvpnas@<elastic ip adresiniz>
```

Kullanıcı `openvpnas`, örneğinize bağlanmanıza izin vermek için OpenVPN Erişim Sunucusu tarafından ayarlanır. Bağlandıktan sonra windozort vari next nuxt geçiştirebilirsiniz. Ayarları daha sonra panel üzerindende değiştirebilirsiniz. Olurya tam ayar yaparken yanlış birşey yaptınız.

```bash
sudo ovpn-init –ec2
```

komutuyla kurulum sihirbazını tekrar çalıştırabilirsiniz.

```bash
          OpenVPN Access Server
          Initial Configuration Tool
------------------------------------------------------
Please enter 'yes' to indicate your agreement [no]: yes

Once you provide a few initial configuration settings,
OpenVPN Access Server can be configured by accessing
its Admin Web UI using your Web browser.

Will this be the primary Access Server node?
(enter 'no' to configure as a backup or standby node)
> Press ENTER for default [yes]:

Please specify the network interface and IP address to be
used by the Admin Web UI:
(1) all interfaces: 0.0.0.0
(2) eth0: ipadresiçıkıcak
Please enter the option number from the list above (1-2).
> Press Enter for default [1]:

Please specify the port number for the Admin Web UI.
> Press ENTER for default [943]:

Please specify the TCP port number for the OpenVPN Daemon
> Press ENTER for default [443]:

Should client traffic be routed by default through the VPN?
> Press ENTER for default [no]:

Should client DNS traffic be routed by default through the VPN?
> Press ENTER for default [no]:

Use local authentication via internal DB?
> Press ENTER for default [yes]:

Private subnets detected: ['1111111']

Should private subnets be accessible to clients by default?
> Press ENTER for EC2 default [yes]:

To initially login to the Admin Web UI, you must use a
username and password that successfully authenticates you
with the host UNIX system (you can later modify the settings
so that RADIUS or LDAP is used for authentication instead).

You can login to the Admin Web UI as "openvpn" or specify
a different user account to use for this purpose.

Do you wish to login to the Admin UI as "openvpn"?
> Press ENTER for default [yes]:

> Please specify your Activation key (or leave blank to specify later):



Initializing OpenVPN...
Removing Cluster Admin user login...
userdel "admin_c"
Adding new user login...
useradd -s /sbin/nologin "openvpn"
Writing as configuration file...
Perform sa init...
Wiping any previous userdb...
Creating default profile...
Modifying default profile...
Adding new user to userdb...
Modifying new user as superuser in userdb...
Getting hostname...
Hostname: elastikip01123
Preparing web certificates...
Getting web user account...
Adding web group account...
Adding web group...
Adjusting license directory ownership...
Initializing confdb...
Generating PAM config...
Enabling service
Starting openvpnas...

NOTE: Your system clock must be correct for OpenVPN Access Server
to perform correctly.  Please ensure that your time and date
are correct on this system.

Initial Configuration Complete!

You can now continue configuring OpenVPN Access Server by
directing your Web browser to this URL:

https://elastikip:943/admin
Login as "openvpn" with the same password used to authenticate
to this UNIX host.

During normal operation, OpenVPN AS can be accessed via these URLs:
Admin  UI: https://elastikip:943/admin
Client UI: https://elastikip:943/

See the Release Notes for this release at:
   https://openvpn.net/vpn-server-resources/release-notes/

openvpnas@ip-128392183:~$ içerdeyiz XD
```

Daha sonra **openvpn** adlı abimizin şifresini değiştiriyoruz.

```bash
sudo passwd openvpn
```

SSH bağlantısını kapatmak için `exit` yazın. Daha sonra **https://elastic ipadresiniz:943/** tarayıcınız üzerinden bağlanın. SSL hatası verebilir,gelişmiş menüsüne tıklayıp devam et diyin. Önünüze gelen ekranda kullanıcı adı openvpn,şifreniz yukarıdaki yaptığınız şifre : ) Daha sonra eğer önünüze gelmez ise [vpn-client](https://openvpn.net/vpn-client/){:target="\_blank"}{:rel="noopener noreferrer"} adresinden işletim sisteminize göre indirme yapabilirsiniz.

![amazon-openvpn-kurulumu-12](/assets/images/amazon-openvpn-kurulumu-12.webp)

openvpn kendi makinemize yükleyelim.

```bash
yay -S openvpn
```

daha sonra

```bash
sudo openvpn --config client.ovpn
```

# Sonuçlar

![amazon-openvpn-kurulumu-13](/assets/images/amazon-openvpn-kurulumu-13.webp)
![amazon-openvpn-kurulumu-14](/assets/images/amazon-openvpn-kurulumu-14.webp)

# Bonus Cool Story Bro 🧿

Arkadaşım hep ücretli vpnler kullanırdı.😍 Birgün kendisinden denemek için vpn aldım. NORDVPN 🤶🏼 Neyse efendim,gezdik,dolaştık her gece internetim gidiyor. Başlarda Telekomun bölgesel bir arızası var sandım... Telekomu ne zaman arayacak olsam şanstan kendi kendine düzeliyordu. İnternet gittidemi 1-2 saat gelmiyordu. Birgün modem ayarlarını kurcalarken ne göreyim 🤐 Modemin üstünden tüm ülkeler port tarama saldırısı gerçekleştiriyor.

```text
[Kernel][Alert] firewall security alert! [Fragment Flooding] attack,possoble.
```

Hemen Turktelekomda ki arkadaşlara ulaştım. Personel 'e derdimi bir türlü anlatamadım. Anlamadılarda... Sonra çareyi saldırı ne zaman başlasa modemi kapatarak çözdüm. Daha sonra oradan taşındık, oda bana bir ders oldu. Bu ücretli satılan vpni ister beleş kullanın ister paralı ip adresleriniz belirli kişilerin eline geçiyor,onlarda ne amaçla bunu yapıyorlar bilmiyorum ama bana bir rahatsızlık vermişlerdi. Eski twitter hesabım kapanmasaydı,sizlere görsel göstermek isterdim 🤬

## Sonuç

Arkadaşlar ücretli ücretsiz,hangi vpn kullanırsanız kullanın dns leak olayına yakalanmayın. Bol vpnsiz günler.
