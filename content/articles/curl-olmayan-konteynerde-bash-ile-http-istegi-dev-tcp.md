Title: Curl Olmayan Konteynerde Bash ile HTTP İsteği Yapmak (/dev/tcp)
Date: 2026-06-26 03:10
Category: Sunucu
Tags: Docker, Bash, HTTP, Linux, Sunucu, Hata Ayıklama
Slug: curl-olmayan-konteynerde-bash-ile-http-istegi-dev-tcp
Authors: yuceltoluyag
Status: published
Summary: Docker konteynerlerinde curl veya wget bulunmadığında, Bash'in kendi /dev/tcp yönlendirmesini kullanarak nasıl ham HTTP istekleri gönderebileceğimizi inceliyoruz.
Template: article
Lang: tr
Translation: false

Geçen gece saat tam üç sularında, canlı ortamdaki (production) mikroservislerden birinin sağlık durumunu (healthcheck) kontrol etmek için konteynere `exec` ile bağlandım. Kafamda hemen o klasik `curl http://localhost:8080/health` komutunu çalıştırmak vardı. Fakat o da ne? İmajı o kadar kırpıp küçültmüştük ki, içeride ne `curl` var, ne `wget`, ne de soket açabileceğim başka bir teknik araç! Çıplak bir sunucu odasında elleri kolları bağlanmış bir teknisyen gibi hissettim. İşte o an, yıllar önce okuduğum ama pratikte hiç kullanmadığım o meşhur Bash numarasını hatırladım: `/dev/tcp` yönlendirmesi. Bu yöntem sayesinde hiçbir harici araca ihtiyaç duymadan, sadece Bash kullanarak konteyner içinden HTTP istekleri fırlatıp bağlantıyı saniyeler içinde test ettim.

İçinde hiçbir alet çantası olmayan, sadece kuru bir kabuktan ibaret olan minimal bir konteynerde debelenmek, elinde tornavida bile olmadan bir motoru tamir etmeye çalışmaya benzer. İşte bu yüzden dostum, bugün bu çaresizlik anlarında imdadımıza yetişecek olan, Bash'in kendi yetenekleriyle ham HTTP isteklerini nasıl ayağa kaldıracağımızı detaylıca konuşacağız.

---

## 🔌 Bash ile TCP Soketi Açmak

Normalde bir sunucuyla TCP üzerinden konuşmak için `nc` (netcat), `telnet` veya `curl` gibi araçlar kullanırız. Ancak Bash, işletim sistemi düzeyinde bir TCP/UDP soketi açma yeteneğine yerleşik olarak sahiptir. 

Sadece aşağıdaki üç satırlık komut dizisini kullanarak bir hedefe HTTP GET isteği gönderebiliriz:

```bash
$ exec 3<>/dev/tcp/service/8642
$ printf 'GET /health HTTP/1.1\r\nHost: service\r\nConnection: close\r\n\r\n' >&3
$ cat <&3
```

Burada neler olduğunu adım adım inceleyelim:

1.  `exec 3<>/dev/tcp/service/8642`: Bash'e, `service` ana makinesinin `8642` portuna hem okuma hem yazma yönünde bir TCP soketi açmasını ve bu soketi `3` numaralı dosya tanımlayıcısına (file descriptor) bağlamasını söylyoruz.
2.  `printf '...' >&3`: Hazırladığımız ham HTTP/1.1 isteğini bu `3` numaralı dosya tanımlayıcısına (yani açtığımız sokete) yazıyoruz.
3.  `cat <&3`: Soketten gelen yanıtı okuyup ekrana (stdout) basıyoruz.

Bu komutları çalıştırdığınızda karşınıza sunucudan dönen HTTP durum kodu, HTTP başlıkları (headers) ve yanıt gövdesi (body) eksiksiz olarak gelecektir.

---

## 🔒 Yetkilendirme Başlıkları Eklemek

Eğer test etmek istediğiniz servis anonim isteklere kapalıysa ve bir `Authorization` başlığına ihtiyaç duyuyorsa, `printf` komutunun içine satır sonu karakterlerine (`\r\n`) dikkat ederek bu başlığı da ekleyebilirsiniz:

```bash
$ exec 3<>/dev/tcp/service/8642
$ printf 'GET /v1/models HTTP/1.1\r\nHost: service\r\nAuthorization: Bearer %s\r\nConnection: close\r\n\r\n' "$API_KEY" >&3
$ cat <&3
```

Dikkat etmeniz gereken en kritik nokta, her HTTP başlığının sonunun `\r\n` (satır başı ve yeni satır) ile bitmesi ve istek gövdesinin bittiğini sunucuya bildirmek için en sonda çift `\r\n\r\n` bırakılmasıdır.

---

## 🧠 /dev/tcp Nedir, Nasıl Çalışır?

Burada dikkatli gözlerden kaçmayacak bir detay var: Linux dosya sisteminde `/dev/tcp` diye bir dizin ya da dosya bulunmaz. Terminalde `ls /dev/tcp` yazarsanız sistem size dosya bulunamadı hatası verecektir. 

Çünkü `/dev/tcp/host/port` yolu gerçek bir dosya değil, Bash'in kendi içinde tanıdığı ve özel olarak yakaladığı sanal bir yönlendirmedir.[^1] Bash bu özel dizgeyi gördüğünde diskte bir dosya aramak yerine arka planda `connect(2)` sistem çağrısını tetikleyerek ilgili IP ve porta doğrudan TCP bağlantısı kurar.

!!! warning "Kritik Detay: Connection: close Başlığı Şarttır! ⚠️"
    HTTP/1.1 protokolünde varsayılan olarak bağlantılar açık tutulur (keep-alive).[^2] Eğer isteğe `Connection: close` başlığını eklemezseniz, karşıdaki sunucu yanıtı gönderdikten sonra bağlantıyı kapatmaz. Bu durumda `cat <&3` komutu sonsuza kadar yeni veri bekleyerek terminali kilitleyecektir. Bunu önlemek için bağlantının kapanmasını açıkça istemeliyiz.

!!! note "Sınırlandırma: TLS (HTTPS) Desteği Yoktur 🔒"
    Bu sanal aygıt sadece ham (plaintext) TCP soketleri açar. Yani `https://` ile başlayan SSL/TLS şifreli bağlantıları bu yöntemle doğrudan test edemezsiniz; çünkü el sıkışma (handshake) işlemlerini gerçekleştirecek bir kriptografi katmanı bulunmaz.

!!! note "POSIX Standardı Değildir ⚙️"
    Bu özellik Bash'e özeldir. Debian'ın varsayılan kabuğu olan `dash` (`/bin/sh`) veya `zsh` üzerinde çalışmaz. Bu yüzden yazdığınız scriptlerin en başına `#!/bin/bash` koyduğunuzdan emin olmalısınız dostum.

Konteynerleri güvenli kılmak ve boyutlarını küçültmek için gereksiz tüm araçları dışarıda bırakmak harika bir DevOps pratiğidir. Ancak bu minimal ortamlarda sıkışıp kaldığınızda, Bash'in bu gizli yeteneği sayesinde hiçbir paket yüklemeden servislerinizin durumunu hızlıca test edebilirsiniz.

## 🔗 İlgili Yazılar
- [Docker'da Node.js Konteynerlerini Root Olmadan Çalıştırmak](/docker-node-js-root-olmadan-calistirmak/)
- [Şişko Docker İmajlarına Diyet: 1.2 GB'tan 78 MB'a Yolculuk](/docker-imaj-boyutu-kucultme-rehberi/)

[^1]: Bash'in derleme aşamasında `--enable-net-redirections` parametresi ile aktif edilen ağ yönlendirme özelliğidir.
[^2]: HTTP/1.1 protokolünde TCP bağlantısının her istekten sonra kapatılmayıp açık tutulması kuralıdır.
