---
Title: GitHub Actions'ı Yerelde Koşturmak: act ile "Deneme-Yanılma" Devrini Kapatıyoruz
Date: 2026-05-08 22:45
Category: Geliştirme Araçları
Tags: github actions, act, docker, devops, git
Slug: github-actions-yerelde-test-etme-act
Authors: yuceltoluyag
Summary: GitHub Actions yazarken her seferinde "test" diye commit atmaktan bıktınız mı? act ile yerelde Docker üzerinden workflow'larınızı nasıl test edeceğinizi anlatan derinlemesine bir rehber. (Rehber)
Image: /images/github-actions-yerelde-test-etme-act.webp
Lang: tr
Translation: false
Status: published
---

Mahalle baskısı mı dersiniz, yoksa o sinir bozucu "test 1", "test 2", "lütfen çalış artık" diye giden commit mesajları mı? Bazen kendime soruyorum, neden kolayı varken zoru seçiyoruz? Bir yaml dosyası yazıyorsun, ufacık bir syntax hatası var mı yok mu anlamak için illa ki o `git push` komutuna basman gerekiyor. Sonra ne oluyor? GitHub amca orada dönüyor, dönüyor, hop "Failed". Hadi baştan... Resmen teknolojik bir işkence bu.

Neyse ki geçen gün bu işkenceye bir son verdim. Hani şu meşhur **act** (nektos/act) olayı var ya, meğer kurtarıcımız oymuş. Meğer biz boşuna GitHub'ın sunucularını yoruyormuşuz (ve kendi commit geçmişimizi çöp ediyormuşuz).

## Nedir Bu "act" ve Neden Şimdiye Kadar Kullanmadım?

İşin ilginç yanı, bu araç aslında çok basit bir mantıkla çalışıyor: GitHub Actions'ın kullandığı ortamı Docker üzerinden senin bilgisayarına getiriyor. Yani o `.github/workflows` klasöründeki dosyalarını alıyor, bir Docker konteyneri ayağa kaldırıyor ve sanki GitHub'daymışsın gibi her şeyi orada koşturuyor.

Şimdi dürüst olalım, çoğumuz GitHub Actions yazarken biraz "karanlıkta el yordamıyla" ilerliyoruz. [GitHub commit atma rehberi](/github-commit-atma-rehberi/) yazımda bahsettiğim o düzenli commit yapısı, Actions denemeleri sırasında resmen can çekişiyor. İşte `act` tam burada devreye giriyor. "Pushlamadan önce bir bakayım, düzgün çalışıyor mu?" diyebiliyorsun.

## Başlamadan Önce: Docker Şart (Mahalle Baskısı Yine Geldi)

Bakın burası çok önemli: `act` tek başına bir sihirbaz değil. Arkada bir Docker motoruna ihtiyaç duyuyor. Eğer sisteminizde Docker yüklü değilse, `act` size sadece hüzünlü bir hata mesajı verir.

Eğer Arch Linux kullanıyorsanız (ki benim gibi bir Arch aşığıysanız muhtemelen öyledir), [Arch Linux Docker kurulumu](/arch-linux-docker-kurulumu/) yazıma bir göz atın derim. Orada her şeyi detaylıca anlattım, eksiksiz kurun ki `act` naz yapmasın.

### Kurulum: Terminalle Yardırma Vakti

Kurulum kısmı aslında oldukça acısız. Ben genelde her şeyi terminalden halletmeyi sevdiğim için size de o yolu göstereceğim.

*   **Linux (Arch):** `yay -S act` veya `pacman -S act`
*   **MacOS:** `brew install act`
*   **Windows:** `choco install act-cli` veya `winget install nektos.act`

Kurulum bittikten sonra bir `act --version` yazın da kendinize gelin. O çıktıyı ekranda görünce insan bir rahatlıyor, "Tamam, en azından bir şeyi doğru yaptık" diyorsun.

## İlk Koşu: "act" ile Tanışma

Kurulum bitti, Docker hazır. Şimdi projenizin kök dizinine gidin ve şu büyülü komutu yazın:

`act`

Eğer hiçbir parametre vermezseniz, `act` gidip `push` event'ine bağlı olan tüm işleri (job) sırayla çalıştırmaya başlar. İlk çalıştırdığınızda size hangi Docker imajını kullanmak istediğinizi soracak. Ben genelde "Medium" olanı seçiyorum, ne çok hantal ne de çok eksik. Ama disk alanınız darsa "Light" da işinizi görür, tabii bazı bağımlılıkları kendiniz kurmak zorunda kalabilirsiniz.

!!! tip "İpucu ⚡"
### İmaj Seçimi: Büyük mü, Orta mı, Yoksa Minicik mi?

İlk çalıştırdığınızda `act` size bir soru soracak: "Hangi imajı kullanmak istersin?" İşte burası tam bir "kırmızı hap, mavi hap" anı.

*   **Large (Büyük):** Yaklaşık 17GB indirme, 53GB depolama... Toplamda 75GB boş alan istiyor! GitHub'daki orijinal makinelerin kopyası gibi ama SSD'nizde yer bırakmaz.
*   **Medium (Orta):** Yaklaşık 500MB. Çoğu iş için yeterli araçları barındırıyor. Ben işimi bununla gördüm, size de tavsiyem budur. Tam kararında.
*   **Micro (Mikro):** 200MB altı. Sadece NodeJS var. Çok kısıtlı, her Actions'da yemez.

!!! warning "Docker Soket Uyarısı"
    Eğer `Couldn't get a valid docker connection` gibi bir uyarı alırsanız korkmayın. Bu genelde `DOCKER_HOST` değişkeninin veya soket erişiminin tam oturmamasından olur. Docker'ın çalıştığından emin olun, gerisi hallolur.

!!! tip "İpucu ⚡"
    Bu seçimlerinizi sonradan değiştirmek isterseniz Windows'ta `C:\Users\KullanıcıAdı\AppData\Local\act\actrc` dosyasını (Linux'ta `~/.actrc`) açıp elle müdahale edebilirsiniz.

### Belirli Bir Job'ı Çalıştırmak

Bazen koca bir workflow'u değil de sadece tek bir işi test etmek istersiniz. Sonuçta vakit nakit, değil mi? Şöyle yapıyoruz:

`act -j build`

Buradaki `build`, sizin yaml dosyanızdaki `jobs` altındaki isimlendirmedir. Yani gidip sadece o kısmı test eder, gerisini umursamaz.

## Benim Başıma Gelenler: Sık Karşılaşılan Sorunlar

Emin değilim ama sanırım `act` kullanırken en çok "Secrets" (Sırlar) konusunda takılacaksınız. GitHub'da o güvenli alana sakladığınız API anahtarları, şifreler yerelde yok haliyle. `act` bunları göremeyince de patlıyor.

Ben ilk denediğimde "Neden env hatası alıyorum?" diye yarım saat tırmaladım. Meğer `.env` dosyası gibi bir şey bekliyormuş.

!!! warning "Dikkat! ⚠️"
    Secrets kullanıyorsanız, bir `.secrets` dosyası oluşturun ve içine `MY_TOKEN=asdasd` şeklinde ekleyin. Sonra da şu komutla çalıştırın:
    `act --secret-file .secrets`
    Sakın ha bu `.secrets` dosyasını yanlışlıkla git'e pushlamayın, sonra [git ssh key oluşturma](/git-ssh-key-olusturma/) yazımda anlattığım o güvenlik önlemleri boşa gider.

### availableWidth=0 Hatası Gibi... (Hani Şu AdSense Meselesi)

Geçenlerde blogda AdSense reklamlarıyla uğraşırken bir "availableWidth=0" hatası almıştım, hani o sinir bozucu olan. `act` içinde de bazen konteynerlerin genişliği veya ortam değişkenleri yüzünden garip çıktılar alabilirsiniz. Eğer loglar birbirine girerse `-v` (verbose) flag'ini kullanın. Evet, terminal yazıyla dolup taşacak ama en azından nerede patladığını görürsünüz.

## act vs GitHub: Hangisi Daha Hızlı?

Şimdi eğri oturalım doğru konuşalım. `act` bazen yavaş gelebilir çünkü Docker konteynerini her seferinde baştan ayağa kaldırıyor (eğer cache ayarlarını yapmadıysanız). Ama GitHub'a pushlayıp Actions'ın sıraya girmesini beklemekten her türlü daha hızlı.

| Özellik | act (Yerel) | GitHub Actions (Bulut) |
| :--- | :--- | :--- |
| **Hız** | İmaj yüklüyse çok hızlı | Sıra bekleyebilirsiniz |
| **Geri Bildirim** | Anında, terminalde | Web arayüzünde |
| **Maliyet** | Bedava (Kendi elektriğin!) | Free tier limitli |
| **Doğruluk** | %95 (Bazı servisler eksik) | %100 Orijinal Ortam |

İşin özü şu; `act` bir mermi değil, bir kalkan. Sizi gereksiz commitlerden ve vakit kaybından koruyor.

## Sonuç: Artık "Test" Diye Commit Atmayacaksınız!

OpenSSL 3.x sürümünü kurduğumdaki o rahatlama gibi, `act`'i düzgünce konfigüre edince gelen huzur bambaşka. Artık projenizi pushlamadan önce yerelde her şeyin "Yeşil" yandığından emin olabilirsiniz. 🚀

Yani bazen çözüm, buluta güvenmek değil, o gücü kendi bilgisayarına indirmekmiş. Şimdi gidip o yarım kalan workflow'larınızı yerelde bir tokatlayın bakalım! 😎

---

### İlgili Yazılar:
- [GitHub Commit Atma Rehberi](/github-commit-atma-rehberi/)
- [Arch Linux Docker Kurulumu](/arch-linux-docker-kurulumu/)
- [Git SSH Key Oluşturma](/git-ssh-key-olusturma/)

[^1]: Nektos act projesinin orijinal dokümanlarına [buradan](https://nektosact.com/usage/index.html){: target="_blank" rel="noopener noreferrer"} ulaşabilirsiniz.
[^2]: Eğer konteyner içinde "Permission Denied" hatası alıyorsanız, docker grubuna dahil olup olmadığınızı kontrol edin.
