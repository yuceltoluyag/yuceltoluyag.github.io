Title: Fortnite Linux'a Geliyor: EAC Linux v2 Güvenlik ve Özgürlük Tartışması
Date: 2026-11-17 08:17
Category: Linux
Tags: Linux, Fortnite, Epic Games, Easy Anti-Cheat, EAC Linux v2, eBPF, Secure Boot, Linux Güvenliği, Oyun
Slug: fortnite-linux-eac-linux-v2-guvenlik-ozgurluk
Authors: yuceltoluyag
Summary: Epic Games'in EAC Linux v2 hamlesi Fortnite'ı Linux'a yaklaştırıyor. Ancak imzalı kernel, Secure Boot, TPM 2.0 ve eBPF gereksinimleri; sistem yetkileri, veri güvenliği ve Linux özgürlüğü açısından önemli soruları beraberinde getiriyor.
Status: published
Template: article
Lang: tr
Translation: false

Linux kullanıcılarının yıllardır beklediği haber sonunda geldi: Epic Games, Fortnite'ı Linux'a getirmek için çalışıyor. Üstelik yeni Epic Games Launcher Preview sürümünü de ilk kez yerel Linux desteğiyle yayımladı.

İlk bakışta oldukça güzel bir gelişme. Özellikle rekabetçi oyunlarda anti-cheat desteği yüzünden yıllardır sorun yaşayan Linux kullanıcıları için önemli bir kapı açılıyor.

Ancak bu gelişmenin benim açımdan farklı bir tarafı var.

Epic Games, Fortnite'ı Linux'a getirmek için Easy Anti-Cheat sistemini yeniden geliştiriyor. EAC Linux v2 adı verilen bu yeni mimari, Windows'taki gibi özel bir anti-cheat kernel modülü yüklemiyor. Bunun yerine Linux'un mevcut güvenlik mekanizmalarından, eBPF programlarından ve systemd servisinden yararlanıyor.

Buraya kadar kulağa oldukça makul geliyor.

Fakat sistemin çalışabilmesi için Secure Boot, TPM 2.0, imzalı kernel, Kernel Lockdown, IOMMU ve BPF LSM gibi oldukça sıkı gereksinimlerin karşılanması gerekiyor.

Peki bir oyun oynayabilmek için işletim sistemimizi bu kadar kısıtlamamız gerçekten gerekli mi? Daha da önemlisi, bilgisayarımızda yüksek yetkilerle çalışabilecek bir güvenlik yazılımına ne kadar güvenmeliyiz?

Ben Fortnite'ın Linux'a gelmesini istiyorum. Ancak bu gelişmenin karşılığında kullanıcıların bilgisayarları üzerindeki kontrolünü ne ölçüde koruyabileceği konusunda ciddi soru işaretlerim var.
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube
    videoid="AWThhOtscS8"
    title="Fortnite Linux'a Geliyor: EAC Linux v2 Güvenlik ve Düşünceler">
</lite-youtube>
Bu yazıda Epic Games'in yeni anti-cheat yaklaşımını, teknik gereksinimlerini, güvenlik modelini ve Linux topluluğundaki tartışmaları birlikte inceleyeceğiz.

## Epic Games Launcher Linux'a geldi, peki Fortnite oynanabiliyor mu?

Öncelikle iki gelişmeyi birbirinden ayırmak gerekiyor.

Epic Games, 14 Ekim 2026 tarihinde yeni Epic Games Launcher Preview sürümünü yayımladı. Bu sürüm, şirketin ilk yerel Linux istemcisi olma özelliğini taşıyor.

Linux kullanıcıları uygulamayı AppImage veya `.deb` paketi üzerinden edinebiliyor. Ancak uygulamanın hâlâ Preview aşamasında olduğunu ve bazı özelliklerinin geliştirilmekte olduğunu unutmamak gerekiyor.

Resmî duyurular:

- [Epic Games Launcher Preview duyurusu](https://store.epicgames.com/news/epic-games-launcher-preview){: target="_blank" rel="noopener noreferrer"}
- [Epic Games Launcher Linux kurulum ve destek bilgileri](https://www.epicgames.com/help/c-32735058/c-Trending_0/a12104725){: target="_blank" rel="noopener noreferrer"}

Fortnite tarafında ise durum farklı.

Epic, oyunun Linux'a geleceğini açıkladı ancak henüz herkesin kullanabileceği bir Linux sürümü yayımlamadı. Şirketin planı, öncelikle yeni EAC Linux v2 sistemini Fortnite üzerinde gerçek oyun ortamında test etmek ve elde edilen sonuçlara göre diğer oyun geliştiricilerine sunmak.

Dolayısıyla şu anda Fortnite'ın Linux'ta oynanabildiğini söylemek doğru değil. Ayrıca açıklanmış kesin bir çıkış tarihi de bulunmuyor.

Bu gelişmenin önemli tarafı, Epic'in yalnızca oyun mağazasını Linux'a getirmekle kalmayıp anti-cheat altyapısını da yeniden ele alması.

Peki neden böyle bir değişikliğe ihtiyaç duyuldu?

## Easy Anti-Cheat Linux v2 neden geliştiriliyor?

Easy Anti-Cheat'in Linux geçmişi aslında oldukça eski.

Epic'in açıklamasına göre EAC, 2014 yılından beri yerel Linux oyunlarını destekliyor. 2021 yılında ise Wine ve Proton üzerinden çalışan Windows oyunları için de destek eklendi.

Fakat önemli bir sorun vardı.

Bu desteğin her oyun için geliştirici tarafından ayrıca etkinleştirilmesi gerekiyordu. Ayrıca Epic, eski Linux uygulamasının Windows tarafındaki koruma seviyesini sağlayamadığını belirtiyordu.

Şirketin açıklamasına göre Linux dağıtımlarındaki farklı çekirdek yapılandırmaları ve modifiye edilebilir sistem bileşenleri hileyle mücadeleyi zorlaştırıyordu.

EAC Linux v2 tam olarak bu sorunu çözmek için geliştiriliyor.

Epic'in hedefi, Windows tarafındaki koruma seviyesine Linux üzerinde daha fazla yaklaşmak. Bunun için kendi özel kernel modülünü geliştirmek yerine Linux'un mevcut güvenlik altyapısından yararlanmayı tercih ediyor.

Burada şirketin yaklaşımını tamamen anlamsız bulduğumu söyleyemem. Rekabetçi oyunlarda hileyle mücadele gerçekten zor bir konu. Özellikle donanım seviyesinde çalışan hileler ve oyun belleğine müdahale eden yazılımlar, geliştiricilerin karşısına ciddi sorunlar çıkarabiliyor.

Ancak bir güvenlik problemini çözmeye çalışmak, kullanıcıların bilgisayarlarında uygulanacak her yöntemin sorgulanmadan kabul edilmesi gerektiği anlamına gelmiyor.

## EAC Linux v2 nasıl çalışıyor?

İnternet üzerindeki tartışmalarda sıkça karşılaştığımız sorulardan biri şu:

**Epic Games Linux'a kernel-level anti-cheat mi getiriyor?**

Bu soruya cevap verirken teknik olarak iki farklı kavramı ayırmak gerekiyor.

Epic, EAC Linux v2'nin Windows'taki gibi özel bir anti-cheat kernel modülü yüklemediğini açıkça belirtiyor.

Bunun yerine üç temel bileşen kullanılıyor:

1. **systemd servisi:** Korunan oyun ilk kez başlatıldığında yüklenen ve yalnızca oyun çalışırken aktif kalan servis.
2. **eBPF programları:** Linux çekirdeği içerisinde çalışan ve güvenlik kontrollerini gerçekleştiren programlar.
3. **BPF LSM:** Linux Security Module altyapısının eBPF üzerinden genişletilmesini sağlayan mekanizma.

Epic'in açıklamasına göre bu yapı, başka süreçlerin korunan oyunun belleğini okumasını veya değiştirmesini engellemeyi ve farklı yöntemlerle çalışan hileleri takip etmeyi amaçlıyor.

Burada özellikle eBPF üzerinde durmak gerekiyor.

eBPF, Linux çekirdeği içerisinde belirli işlemleri kontrollü şekilde gerçekleştirmeye yarayan bir teknoloji. Ağ trafiğinin incelenmesinden performans analizine, sistem gözlemlenmesinden güvenlik politikalarının uygulanmasına kadar farklı alanlarda kullanılıyor.

BPF LSM ise eBPF programlarının Linux çekirdeğindeki güvenlik kontrol noktalarına bağlanmasına olanak tanıyor.

Linux Kernel belgelerinde BPF LSM programlarının ayrıcalıklı kullanıcılar tarafından sistem genelindeki erişim kontrolü ve denetim politikalarını uygulamak için kullanılabildiği açıklanıyor.

Kaynaklar:

- [Linux Kernel – LSM BPF Programs](https://docs.kernel.org/next/bpf/prog_lsm.html){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – eBPF Verifier](https://docs.kernel.org/bpf/verifier.html){: target="_blank" rel="noopener noreferrer"}

Önemli bir ayrıntı daha var.

eBPF, çekirdeğe rastgele kod yükleyip sınırsız işlem yapılmasına izin veren bir mekanizma değil. Verifier adı verilen doğrulama sistemi, programların erişebileceği bellek alanlarını, işaretçileri ve gerçekleştirebileceği işlemleri kontrol ediyor.

Bu nedenle EAC Linux v2'yi Windows'taki klasik kapalı kernel sürücüleriyle birebir aynı olarak değerlendirmek doğru olmaz.

Ancak sistemin çekirdekle ilişkisi bulunmadığını veya tamamen sıradan bir kullanıcı uygulaması gibi çalıştığını söylemek de doğru değil.

Bence önemli olan, kullanılan teknolojinin isminden çok o teknolojinin hangi yetkilerle ve hangi sınırlar içerisinde çalıştığı.

## EAC Linux v2 için gereken sekiz güvenlik şartı

Epic, yeni anti-cheat sisteminin çalışabilmesi için sekiz temel gereksinim belirlemiş durumda.

Bunlar yalnızca oyunun kurulmasıyla ilgili şartlar değil. Bilgisayarın açılış zincirinden kullanılan kernel'e kadar uzanan bir güvenlik yapılandırması gerekiyor.

| Gereksinim | Ne işe yarıyor? |
|---|---|
| İmzalı kernel ve modüller | Çalışan çekirdeğin ve harici sürücülerin güvenilir anahtarlarla imzalanmasını sağlıyor. |
| TPM 2.0 | Açılış sırasında elde edilen ölçümlerin donanım tabanlı güvenlik yazmaçlarında tutulmasını sağlıyor. |
| Secure Boot | Açılış zincirindeki bileşenlerin güvenilir imzalara sahip olmasını kontrol ediyor. |
| Measured Boot | Firmware, önyükleyici ve kernel gibi bileşenlerin ölçümlerini TPM'e kaydediyor. |
| IOMMU | DMA yapabilen donanımların fiziksel belleğe erişimini sınırlandırıyor. |
| Kernel Lockdown Integrity Mode | Root kullanıcısının çekirdek bütünlüğünü bozabilecek bazı işlemlerini engelliyor. |
| Kexec devre dışı | Çalışan sistemin normal açılış zincirini atlayarak başka bir kernel ile değiştirilmesini önlüyor. |
| BPF LSM | Epic'in eBPF tabanlı güvenlik kontrollerini çalıştırabilmesini sağlıyor. |

Özellikle ilk madde üzerinde durmak istiyorum.

Epic, kendi derlediğimiz veya kendi imza anahtarımızla imzaladığımız herhangi bir çekirdeğin otomatik olarak kabul edilmesini sağlamıyor. Kullanılacak imzaların şirketin güvenilir kabul ettiği anahtar listesinde bulunması gerekiyor.

Bu listeye Canonical, Fedora, Universal Blue, Debian, openSUSE, SUSE, Rocky Linux, AlmaLinux ve Microsoft UEFI CA gibi anahtarlar dahil edilmiş durumda.

Epic, bu listeyi ilerleyen dönemde genişletmeyi ve topluluk katkılarına açmayı planladığını da belirtiyor.

Burada dikkat edilmesi gereken başka bir konu daha var.

Kendi Secure Boot anahtarlarınızı kullanmaya devam etmek isterseniz, Epic bazı yapılandırmalarda ayrı bir önyükleme profili oluşturabileceğinizi söylüyor. Ancak shim üzerinden kullanılan sistemlerde kayıtlı MOK anahtarlarının da güvenilir listede bulunması gerekiyor.

Yani yalnızca oyunu açtığınız sırada kullandığınız kernel'e bakılmıyor. Firmware ve anahtar kayıtlarıyla ilgili koşullar da bulunuyor.

### Bazzite 45 ve dağıtım desteği

Bu gelişmelere hazırlık yapan dağıtımların başında Bazzite geliyor.

Universal Blue ekibinin 3 Kasım 2026 tarihinde yayımladığı Bazzite 45 ile birlikte Epic'in güvenilir kabul ettiği Universal Blue imza anahtarı desteklenmeye başladı.

Ayrıca kullanıcıların sistemlerinin EAC Linux v2 gereksinimlerini karşılayıp karşılamadığını kontrol edebilmesi için şu komut eklendi:

```bash
ujust check-anticheat
```

Bu komut kernel ve modül imzalarından Secure Boot'a, TPM 2.0'dan Kernel Lockdown'a kadar ilgili koşulları kontrol ediyor.

Önemli bir ayrıntı: Bu komut sisteminizi otomatik olarak EAC uyumlu hâle getirmiyor. Yalnızca mevcut durumunuzu raporluyor.

Bazzite geliştiricileri, el konsollarında bazı güvenlik ayarlarının henüz hazır olmadığını da belirtiyor.

Kaynak: [Universal Blue – Bazzite 45 duyurusu](https://universal-blue.discourse.group/t/bazzite-45-is-here/12702){: target="_blank" rel="noopener noreferrer"}

### Peki Steam Deck?

İşin ilginç taraflarından biri de burada başlıyor.

Steam Deck, Linux oyun dünyasının büyümesinde önemli rol oynayan cihazlardan biri. Ancak Epic'in açıklamasına göre Steam Deck şu anda EAC Linux v2'nin gerektirdiği özellikleri karşılamıyor.

Epic, Valve ile görüşmelerin devam ettiğini ve gelecekte Steam donanımlarını mümkün olan en geniş ölçüde desteklemek istediğini belirtiyor.

Burada bir ayrım daha yapalım: Epic Games Launcher'ın SteamOS için desteklenmesinin planlanması, Fortnite'ın Steam Deck üzerinde oynanabileceği anlamına gelmiyor.

Launcher desteğiyle anti-cheat uyumluluğu iki ayrı konu.

Kaynak: [Epic Games – EAC Linux v2 teknik açıklaması](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2){: target="_blank" rel="noopener noreferrer"}

## Asıl mesele: EAC Linux v2 hangi yetkilerle çalışacak?

Şimdi konunun benim açımdan en önemli tarafına gelelim.

Epic'in yeni sisteminde özel bir kernel modülü bulunmaması olumlu bir teknik tercih olabilir.

Ancak bu durum, yazılımın sistem üzerindeki yetkilerinin otomatik olarak sınırlı olduğu anlamına gelmiyor.

Çünkü bir yazılımın güvenliğini değerlendirirken yalnızca hangi teknolojiyi kullandığına değil, hangi izinlerle çalıştığına ve erişebildiği kaynaklara da bakmamız gerekiyor.

Örneğin systemd üzerinden çalışan bir servisin hangi kullanıcıyla çalıştırıldığı, hangi Linux capabilities izinlerine sahip olduğu ve hangi dosya sistemlerine erişebildiği oldukça önemli.

Systemd bu konuda birçok güvenlik seçeneği sunuyor.

Bunlardan bazıları:

- `User=` ve `Group=`: Servisin hangi kullanıcı ve grupla çalışacağını belirler.
- `CapabilityBoundingSet=`: Servisin kullanabileceği Linux capabilities izinlerini sınırlar.
- `NoNewPrivileges=`: Sürecin yeni ayrıcalıklar kazanmasını sınırlar.
- `ProtectHome=`: Kullanıcıların ev dizinlerine erişimi kısıtlayabilir.
- `ProtectSystem=`: Dosya sisteminin belirli bölümlerini servise karşı salt okunur hâle getirebilir.
- `SystemCallFilter=`: Servisin kullanabileceği sistem çağrılarını sınırlandırabilir.

Bunlar yalnızca teorik seçenekler değil. systemd'nin resmî belgelerinde servislerin saldırı yüzeyini azaltmak için kullanılmaları öneriliyor.

Kaynak: [systemd – Execution Environment Configuration](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html){: target="_blank" rel="noopener noreferrer"}

Ancak Epic'in EAC Linux v2 duyurusunda servisin gerçek çalışma kimliği, `CapabilityBoundingSet` ayarları, dosya sistemi kısıtlamaları ve diğer sandbox seçeneklerinin ayrıntılı bir listesi bulunmuyor.

Bu nedenle servisin kesinlikle root olarak çalıştığını veya bilgisayardaki bütün dosyalara erişebildiğini söyleyemeyiz.

Fakat tam da bu yüzden bunları sormamız gerekiyor.

Systemd'de sistem servislerinde `User=` belirtilmediğinde varsayılan kullanıcı root'tur. Bunun yanında BPF LSM programlarının yüklenmesi ve çekirdek kancalarına bağlanması ayrıcalıklı işlemlerdir.

Ancak bu bilgiler tek başına Epic'in servisinin nasıl yapılandırıldığını göstermez. Bunun için gerçek servis dosyasını, yetki modelini ve ilgili bileşenleri incelememiz gerekir.

Benim görmek istediğim şey tam olarak bu.

Epic, EAC Linux v2'nin nasıl çalışacağını genel hatlarıyla anlatıyor. Ancak kullanıcıların sistemlerinde çalışacak servislerin gerçek yetki sınırlarını değerlendirebilecekleri ayrıntılı teknik belgeler de yayımlanmalı.

## Bir güvenlik açığı bulunursa ne olacak?

Bence bu konu yalnızca Fortnite ile ilgilenenlerin değil, bilgisayarında üçüncü taraf güvenlik yazılımları kullanan herkesin düşünmesi gereken bir mesele.

Bir yazılımın geliştiricisi kötü niyetli olmak zorunda değil.

Bir gün güvenlik açığı bulunabilir. Güncelleme mekanizması ele geçirilebilir. Yazılımın iletişim kurduğu bir bileşen saldırıya uğrayabilir.

Bunların hepsi gerçek dünyada karşılaşabileceğimiz güvenlik senaryoları.

Şimdi bilgisayarımızda çalışan ayrıcalıklı bir güvenlik servisinin saldırgan tarafından ele geçirildiğini düşünelim.

Saldırganın yapabilecekleri, ele geçirdiği sürecin gerçek yetkilerine bağlı olacaktır.

Servis geniş root yetkileriyle çalışıyorsa veya kritik Linux capabilities izinlerine sahipse saldırının etkisi çok daha ciddi olabilir. Kullanıcı dosyaları, tarayıcı oturumları, yerel kimlik bilgileri ve diğer sistem kaynakları hedef hâline gelebilir.

Buna karşılık iyi sınırlandırılmış, ayrı bir kullanıcıyla çalışan ve dosya sistemi erişimi kısıtlanmış bir servis daha dar bir saldırı yüzeyi oluşturabilir.

İşte bu nedenle servis mimarisinin ayrıntıları önemli.

Burada Kernel Lockdown konusunda da bir yanlış anlaşılma olabiliyor.

Kernel Lockdown, root kullanıcısının çekirdeğin bütünlüğünü bozabilecek bazı işlemlerini engellemeye yönelik bir güvenlik özelliği. Ancak bu, sistemdeki kişisel dosyaları ayrıcalıklı servislerden gizleyen genel amaçlı bir sandbox değil.

Çekirdeğin bütünlüğünü korumakla kullanıcı verilerini korumak birbirinden farklı güvenlik hedefleri.

Bu iki konuyu birbirine karıştırmamak gerekiyor.

Benim endişem de tam olarak bu.

Bir yazılımın e-postalarımızı okuduğunu, kredi kartı bilgilerimizi topladığını veya kişisel dosyalarımızı bir sunucuya gönderdiğini iddia etmiyorum. Böyle bir iddia için elimizde somut kanıt olması gerekir.

Ancak bir saldırganın bu yazılımın kontrolünü ele geçirmesi durumunda hangi yetkileri kullanabileceğini bilmek istiyorum.

**Bir yazılımın kötüye kullanılabilmesi için onu geliştiren şirketin kötü niyetli olması gerekmez.**

Bu yüzden güvenlik değerlendirmesini yalnızca şirketin bugün açıkladığı niyetlere göre yapamayız.

## Epic Games kullanıcı verileri konusunda neler açıklıyor?

Epic Games'in genel gizlilik politikası, kullanıcıların uygulama ve oyun kullanım bilgileri, cihaz kimlikleri, donanım ve yazılım özellikleri gibi teknik bilgilerin toplanabileceğini açıklıyor.

Ayrıca şirket bu verileri hile, hesap hırsızlığı, dolandırıcılık ve diğer yetkisiz faaliyetlerle mücadele gibi amaçlarla kullanabileceğini belirtiyor.

Kaynak: [Epic Games – Gizlilik Politikası](https://legal.epicgames.com/epicgames/privacy-policy){: target="_blank" rel="noopener noreferrer"}

Burada önemli bir ayrım var.

Genel gizlilik politikası, EAC Linux v2 servisinin bilgisayarda hangi dosyaları okuyabildiğini veya hangi sistem süreçlerine erişebildiğini açıklamıyor.

Bunlar farklı konular.

Bir şirketin oyun kullanım verilerini toplamasıyla bilgisayarda çalışan ayrıcalıklı bir servisin yerel dosya erişim yetkileri aynı şey değil.

Bence Epic'in Linux tarafında ayrıca açıklaması gereken konulardan biri bu.

Örneğin:

- EAC Linux v2 tam olarak hangi sistem verilerini topluyor?
- Hangi süreçleri gözlemliyor?
- Hangi eBPF LSM kancalarını kullanıyor?
- Hangi veriler bilgisayarda kalıyor, hangileri sunucuya gönderiliyor?
- Toplanan veriler ne kadar süre saklanıyor?
- Servisin çalışma yetkileri hangi mekanizmalarla sınırlandırılıyor?

Bunlar cevaplanması gereken sorular.

### Bağımsız güvenlik denetimi yeterli mi?

Burada da tek başına bir denetim raporuna güvenmek istemiyorum.

Easy Anti-Cheat'in genel bilgi sayfasında üçüncü taraf sağlayıcılar tarafından düzenli denetim yapıldığı belirtiliyor. Ancak bu genel açıklama, denetimi yapan kuruluşları, inceleme kapsamını, kullanılan sürümü ve elde edilen sonuçları tek başına değerlendirmemize yetmiyor.

Üstelik genel EAC denetimlerinin doğrudan Linux v2'nin bütün bileşenlerini kapsadığını da buradan çıkaramayız.

Kaynak: [Easy Anti-Cheat – Genel teknik bilgiler](https://www.easy.ac/ai-info){: target="_blank" rel="noopener noreferrer"}

Bağımsız denetim elbette değerli. Fakat hangi kodun, hangi sürümün, hangi saldırı senaryolarına karşı incelendiğini bilmeden yalnızca denetim yapıldı denmesi benim için yeterli değil.

Hiçbir denetim yazılımın gelecekte güvenlik açığı yaşamayacağını garanti edemez.

Önemli olan incelemenin kapsamı, şeffaflığı ve devamlılığı.

## Kernel seviyesinde anti-cheat hileleri gerçekten bitiriyor mu?

Şimdi biraz da sistemin amacına bakalım.

Epic'in EAC Linux v2 geliştirmesindeki temel hedefi, hile yazılımlarının oyuna müdahale etmesini zorlaştırmak.

Ancak kernel seviyesinde koruma kullanmak, hileleri tamamen ortadan kaldırmak anlamına gelmiyor.

Fortnite gibi büyük çevrimiçi oyunlarda bugün bile farklı hile yöntemleriyle karşılaşabiliyoruz.

YouTube'a girdiğinizde Fortnite hileleriyle ilgili içeriklere ulaşmak mümkün.

Tabii bu görüntüler tek başına anti-cheat sisteminin hiçbir işe yaramadığını kanıtlamıyor. Ayrıca henüz yayımlanmamış EAC Linux v2'nin performansını değerlendirmek için de kullanılamaz.

Ancak bize önemli bir gerçeği hatırlatıyor: Hileyle mücadele sürekli devam eden bir süreç.

Epic de kendi açıklamasında anti-cheat sistemlerinin düzenli güncelleme gerektirdiğini belirtiyor. Şirketin amacı bütün hileleri sonsuza kadar ortadan kaldırmak değil, hile geliştirme ve sürdürme maliyetini yükseltmek ve sıradan oyuncunun hileciyle karşılaşma ihtimalini azaltmak.

Ayrıca Epic, sunucu tarafındaki verilerle hile tespit ettiklerini ancak bunun tek başına yeterli olmadığını söylüyor.

Burada benim farklı bir yaklaşımım var.

Bence iyi bir oyunun hileyle mücadele sistemi yalnızca bilgisayarımıza yüklenen yazılımlardan oluşmamalı.

Sunucu tarafındaki kontroller, oyuncu raporları, davranış analizi ve insan moderasyonu birlikte çalışmalı.

Geçmişte oynadığım bazı oyunlarda sunucu yöneticilerinin ne kadar önemli olduğunu bizzat gördüm.

Oyuncuları tanıyan, şüpheli hareketleri değerlendiren, gerektiğinde müdahale eden ve kuralları herkese eşit uygulayan yöneticiler, oyun topluluklarının sağlığı açısından oldukça önemli.

Elbette burada yöneticilerin de adil olması gerekiyor. Arkadaşına başka, tanımadığı oyuncuya başka karar veren bir yönetici de sorunun parçasıdır.

Benim savunduğum şey anti-cheat yazılımlarının tamamen kaldırılması değil.

Sadece hileyle mücadelenin bütün yükünün kullanıcı bilgisayarında çalışan ayrıcalıklı yazılımlara bırakılmasını doğru bulmuyorum.

## EAC Linux v2 geldiğinde hangi oyunları oynayabileceğiz?

Bu konu da oldukça önemli.

Epic'in yeni sisteminin başarılı olması durumunda diğer oyun geliştiricilerine de sunulması planlanıyor.

Ancak EAC Linux v2'nin yayımlanması, Easy Anti-Cheat kullanan bütün oyunların otomatik olarak Linux'ta çalışacağı anlamına gelmiyor.

Her oyun geliştiricisinin bu desteği ayrıca etkinleştirmesi gerekiyor.

Üstelik eski Linux EAC desteğini zaten kullanan oyunların geliştiricileri, mevcut sistemi kullanmaya devam edebilecek veya daha yüksek koruma seviyesi hedefleyen EAC Linux v2'ye geçebilecek.

Bu durumda hangi oyunların hangi sürümü kullanacağı geliştiricilerin kararına bağlı olacak.

Bir başka önemli nokta da diğer anti-cheat sistemleri.

Örneğin EA SPORTS FC 26 ve Battlefield 6, EA'nın kendi Javelin AntiCheat sistemini kullanıyor.

EA, FC 26 için Javelin'in kernel seviyesinde çalıştığını açıklıyor. Battlefield 6 tarafında da Secure Boot zorunluluğu bulunuyor.

Dolayısıyla Epic'in geliştirdiği EAC Linux v2, bu oyunlara doğrudan Linux desteği kazandırmayacak.

Kaynaklar:

- [EA SPORTS FC 26 – PC Deep Dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-pc-deep-dive){: target="_blank" rel="noopener noreferrer"}
- [Battlefield 6 – Secure Boot Information](https://www.ea.com/games/battlefield/battlefield-6/news/secure-boot-information){: target="_blank" rel="noopener noreferrer"}

Yani kullanıcıdan sekiz farklı güvenlik şartını karşılaması istenirken karşılığında hangi oyunların destekleneceğinin de açıkça belirtilmesi gerekiyor.

Benim merak ettiğim şeylerden biri de tam olarak bu.

## Linux topluluğu EAC Linux v2 hakkında ne düşünüyor?

Bu konu hakkında yaptığım araştırmada Linux topluluğunun tek bir görüş etrafında birleşmediğini gördüm.

Reddit'teki Linux Gaming tartışmalarında farklı yaklaşımlar bulunuyor.

Bazı kullanıcılar özel bir kernel modülü yüklenmemesini olumlu karşılıyor. Windows'taki kapalı kaynaklı kernel sürücülerine kıyasla mevcut Linux güvenlik altyapısının kullanılmasını daha makul buluyorlar.

Diğer tarafta ise özellikle aşağıdaki konularda endişelerini dile getirenler var:

- Dağıtım geliştiricilerinin ve imza anahtarlarının şirket tarafından onaylanması.
- Kendi derledikleri kernel'leri kullanamama ihtimali.
- NVIDIA DKMS gibi harici sürücülerde imzalama sorunları.
- Secure Boot ve MOK anahtarlarıyla ilgili kısıtlamalar.
- eBPF programlarının yetki ve erişim sınırları.
- EAC v1'den v2'ye geçiş yapılması durumunda eski oyun desteğinin kaybedilmesi.

Bunların hepsi aynı ölçüde doğrulanmış sorunlar değil. Bazıları teknik uyumluluk problemleri, bazıları ise kullanıcıların geleceğe yönelik endişeleri.

Ancak toplulukta tartışılan temel konu oldukça açık:

Linux kullanıcısı kendi bilgisayarının nasıl çalışacağına karar verebilmeli mi, yoksa rekabetçi bir oyun oynayabilmek için dağıtım geliştiricisinin ve oyun şirketinin belirlediği güvenlik yapılandırmasına mı uymalı?

Farklı görüşleri görebileceğiniz bazı tartışmalar:

- [EAC Linux v2 does NOT install a kernel anti-cheat module](https://www.reddit.com/r/linux_gaming/comments/1x69tby/eac_linux_v2_does_not_install_a_kernel_anticheat/){: target="_blank" rel="noopener noreferrer"}
- [EAC Linux v2: dağıtımların imza anahtarları ve güvenlik gereksinimleri](https://www.reddit.com/r/linux_gaming/comments/1x9ntgy/for_epics_eac_linux_v2_to_work_fedora_debian_suse/){: target="_blank" rel="noopener noreferrer"}

Bu yorumlar bütün Linux kullanıcılarının görüşünü temsil etmiyor. Ancak sistemin neden yalnızca teknik bir uyumluluk meselesi olmadığını anlamak açısından önemli örnekler sunuyor.

## Sonuç: Fortnite Linux'a gelsin, ama ne pahasına?

Ben Fortnite'ın Linux'a gelmesini istiyorum.

Daha fazla rekabetçi oyunun Linux üzerinde çalışmasını da istiyorum.

Ancak bir oyunun çalışabilmesi için bilgisayarımızdaki güvenlik sınırlarının ne ölçüde değiştirileceğini bilmek zorundayız.

Epic Games'in EAC Linux v2 çalışması teknik açıdan önemli bir gelişme. Özel bir anti-cheat kernel modülü yüklemeden Linux'un mevcut güvenlik mekanizmalarından yararlanılması da üzerinde durulması gereken bir yaklaşım.

Fakat bu sistemin hangi yetkilerle çalışacağı, ne kadar veri toplayacağı, eBPF programlarının hangi sınırlar içerisinde faaliyet göstereceği ve olası bir güvenlik açığının kullanıcıya etkisi yeterince açıklanmalı.

Ben bir şirketin kötü niyetli olduğunu iddia etmek zorunda değilim. Bir yazılımı değerlendirebilmek için önce onun güvenlik sınırlarını anlamak istiyorum.

Çünkü bir yazılımı geliştiren şirketin iyi niyetli olması, o yazılımın hiçbir zaman güvenlik açığı yaşamayacağı anlamına gelmiyor.

Bir güvenlik bileşeninin kendisi de saldırı yüzeyinin parçası olabilir.

Üstelik burada kaybedilebilecek şey yalnızca bir oyun hesabı değil. Aynı bilgisayarda kullandığımız kişisel hesaplarımız, tarayıcı oturumlarımız, dosyalarımız ve dijital hayatımız da söz konusu.

Bir oyun şirketinin bu kadar önemli bir güvenlik alanına müdahale eden çözümü hakkında sorular sormak paranoya değil. Kullanıcının kendi sistemini korumak istemesi.

Benim Epic Games'ten beklediğim şey daha fazla şeffaflık.

Gerçek servis yetkileri açıklansın. Güvenlik sınırları belgelenebilsin. Veri toplama kapsamı netleşsin. Bağımsız denetimlerin hangi sürümleri ve hangi bileşenleri kapsadığı ortaya konsun. Sistemin hileyle mücadelede gerçekten ne kadar etkili olduğu da ölçülebilir sonuçlarla gösterilsin.

Çünkü Linux'a daha fazla oyun gelmesini istiyoruz. Ama bunun karşılığında bilgisayarımızın kontrolünü sorgulamadan bir oyun şirketine bırakmak istemiyoruz.

**Fortnite Linux'a gelsin. Ama bunu yapabilmek için Linux'un bize sunduğu kontrol ve özgürlükten ne kadar vazgeçmek zorunda kaldığımızı da konuşalım.**

Siz EAC Linux v2 hakkında ne düşünüyorsunuz? Bir oyun oynayabilmek için bu kadar katı güvenlik koşullarını kabul eder miydiniz? Yoksa öncelikle sistemin gerçek yetkilerinin ve veri erişim sınırlarının açıklanmasını mı beklersiniz?

Yorumlarda konuşalım.

## Kaynaklar

- [Epic Games – Introducing Easy Anti-Cheat Linux v2](https://onlineservices.epicgames.com/news/introducing-easy-anti-cheat-linux-v2){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Launcher Preview](https://store.epicgames.com/news/epic-games-launcher-preview){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Launcher Preview Destek Sayfası](https://www.epicgames.com/help/c-32735058/c-Trending_0/a12104725){: target="_blank" rel="noopener noreferrer"}
- [Valve – Steam Hardware & Software Survey](https://store.steampowered.com/hwsurvey/){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – LSM BPF Programs](https://docs.kernel.org/next/bpf/prog_lsm.html){: target="_blank" rel="noopener noreferrer"}
- [Linux Kernel – eBPF Verifier](https://docs.kernel.org/bpf/verifier.html){: target="_blank" rel="noopener noreferrer"}
- [systemd – systemd.exec](https://www.freedesktop.org/software/systemd/man/latest/systemd.exec.html){: target="_blank" rel="noopener noreferrer"}
- [Epic Games – Privacy Policy](https://legal.epicgames.com/epicgames/privacy-policy){: target="_blank" rel="noopener noreferrer"}
- [Easy Anti-Cheat – Technical Information](https://www.easy.ac/ai-info){: target="_blank" rel="noopener noreferrer"}
- [Universal Blue – Bazzite 45](https://universal-blue.discourse.group/t/bazzite-45-is-here/12702){: target="_blank" rel="noopener noreferrer"}
- [EA – EA SPORTS FC 26 PC Deep Dive](https://www.ea.com/games/ea-sports-fc/fc-26/news/pitch-notes-fc26-pc-deep-dive){: target="_blank" rel="noopener noreferrer"}
- [EA – Battlefield 6 Secure Boot](https://www.ea.com/games/battlefield/battlefield-6/news/secure-boot-information){: target="_blank" rel="noopener noreferrer"}