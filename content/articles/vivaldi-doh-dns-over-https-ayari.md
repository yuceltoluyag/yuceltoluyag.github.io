Title: Vivaldi'de DoH Ayarı Nasıl Yapılır? (Cloudflare ile Özgürlük)
Date: 2025-11-30 16:30
Category: Ağ ve İnternet
Tags: vivaldi, doh, dns over https, cloudflare, gizlilik, sansür
Slug: vivaldi-doh-dns-over-https-ayari
Authors: yuceltoluyag
Summary: Vivaldi tarayıcısında internet trafiğinizi şifrelemek ve yasakları aşmak için DoH ayarını nasıl yaparsınız? İşte Cloudflare ile en hızlı yöntem.
Image: images/vivaldi-doh-dns-over-https-ayari-xl.webp
Lang: tr
toot: https://mastodon.social/@yuceltoluyag/116592163653877414
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3mm3ebyhgbs2j
Translation: false
Status: published


İnternet servis sağlayıcılarının (ISS) "hangi siteye girdin bakayım sen?" diye DNS trafiğimizi dikizlemesinden bıktım usandım. Sırf bu yüzden Vivaldi gibi "power user" (bizim gibi kurcalamayı sevenler) dostu bir tarayıcı kullanıyoruz (ki Vivaldi'ye olan sevgimi ve tüm Linux tecrübelerimi [Vivaldi'yi Neden Seviyorum](/vivaldi-linux-deneyimi/) yazımda da uzun uzun anlatmıştım) ama varsayılan ayarlar bazen yetersiz kalıyor.

Bugün Vivaldi'ye şu meşhur **DoH (DNS over HTTPS)** ayarını yapacağız. Yani DNS sorgularımızı şifreleyip, ISS'lerin göremeyeceği bir tünelden geçireceğiz. Hem de **Cloudflare** kullanarak. (Neden Cloudflare? Çünkü 1.1.1.1 altyapısıyla piyasanın en hızlısı ve en kararlısı).

Hadi şu ayarı yapalım da internetimiz biraz nefes alsın.

## Adım 1: Güncellik Şart (Ya da Değil mi?)

Önce Vivaldi'nin güncel olduğundan emin olmak gerekiyor. Yani mantıklı tabii; eski sürümlerde bu menülerin yeri farklı olabilir.

Sol üstteki Vivaldi logosuna tıklayın, **Yardım > Güncellemeleri Kontrol Et** deyin. "Sen zaten en iyisisin" diyorsa devam edelim.

## Adım 2: Labirentte Kaybolmadan Ayarları Bulmak

Şimdi, burası biraz karışık. Eski rehberlerde ayarın `vivaldi://settings/network/` altında olduğu yazar. Ama Vivaldi geliştiricileri menülerin yerini değiştirmeyi çok seviyor.

En garantisi şu:

1.  Klavyeden `Ctrl + F12` tuşuna basın (Ayarlar açılır).
2.  Sol taraftaki arama çubuğuna direkt **"Güvenli DNS"** veya İngilizce kullanıyorsanız **"Secure DNS"** yazın.
3.  Uğraşmak istemeyenler için adres çubuğuna şunu yapıştırıp Enter'a basmak da işe yarar (Tabii Vivaldi bu komutu kaldırmadıysa):
    `vivaldi://settings/privacy/`

!!! tip "Kısa Yol ⚡ Menülerde kaybolmayın. Ayarlar penceresindeki arama kutusu sizin en iyi dostunuzdur. 'DNS' yazın, ayar karşınızda biter."


## Adım 3: Cloudflare Sunucusunu Girmek

Ayar yerini bulduk, genelde **"Gizlilik ve Güvenlik"** sekmesinin en altlarına doğru saklanıyor.

Orada **"Güvenli DNS Kullan"** (Use Secure DNS) seçeneğini göreceksiniz. Varsayılan olarak "Mevcut servis sağlayıcınızla" seçilidir (ki biz bundan kaçmaya çalışıyoruz).

Yapmanız gerekenler sırasıyla:

1.  Cloudflare seçeneğini işaretleyin. Eğer özel ayar yapacaksanız **"Özel"** (With Custom) seçeneğini işaretleyin.
2.  Yanındaki veya altındaki kutucuğa şu Cloudflare seçeneğini seçin:
[responsive_img src="/images/vivaldi-doh-dns-over-https-ayari-xl.webp" alt="Vivaldi DoH ayarı" /]
3. Alternatif olarak, adres çubuğuna şu adresi yapıştırabilirsiniz: `https://doh.dns.sb/dns-query` fakat bu adres için risk size ait. Ben Cloudflare kullanıyorum.

Enter'a basmanıza veya "Kaydet" demenize gerek yok, Vivaldi (Chromium altyapısı sağ olsun) anında kapıyor ayarı.

## Sonuç: Çalışıyor mu?

Ayarı yaptık ama "Ya çalışmıyorsa?" şüphesi içimizi kemirmesin.
Hemen yeni bir sekme açın ve [Cloudflare Yardım](https://1.1.1.1/help){: target="_blank" rel="noopener noreferrer"} sayfasına girin.

Eğer **"Using DNS over HTTPS (DoH)"** kısmında **"Yes"** yazıyorsa, tebrikler! Artık DNS sorgularınız şifreli gidiyor. ISS'niz hangi siteye girdiğinizi DNS üzerinden göremiyor (IP üzerinden görebilir ama o başka bir makalenin konusu; hatta benzer bir gizlilik ve sızıntı konusunu [AWS EC2 OpenVPN Kurulumu ve DNS Leak Düzeltilmesi](/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/) makalemde ele almıştım 😅).

Bazen bu ayar şirket içi ağlarda veya bazı kafe wifi'larında interneti kesebilir. Öyle bir durumda "Güvenli DNS" kutucuğunu kapatıp tekrar deneyin. Teknoloji işte, bazen aç-kapa yapmak gerekiyor.

Güle güle, özgürce kullanın!


