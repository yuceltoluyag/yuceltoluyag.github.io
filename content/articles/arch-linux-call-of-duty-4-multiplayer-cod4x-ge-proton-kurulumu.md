Title: Arch Linux'ta Call of Duty 4 Multiplayer: CoD4x ve GE-Proton Kurulumu
Date: 2026-11-18
Category: Oyun
Tags: Arch Linux, Call of Duty 4, CoD4x, GE-Proton, Proton, Steam, UMU, Wine, Multiplayer
Slug: arch-linux-call-of-duty-4-multiplayer-cod4x-ge-proton-kurulumu
Authors: yuceltoluyag
Summary: Arch Linux üzerinde Steam dışı Call of Duty 4 kurulumunu GE-Proton ile çalıştırıp CoD4x multiplayer istemcisini Steam'in Proton prefix'iyle eşleştirme sürecini anlatıyorum. Eski Wine kurulumunu koruma, ayrı prefix oluşturma, CoD4x dosyalarını aktarma ve Steam kontrolü hatasını giderme adımlarını ele alıyorum.
Status: published
Template: article
Lang: tr
Translation: false


Call of Duty 4: Modern Warfare, aradan geçen yıllara rağmen multiplayer sunucularında oynanmaya devam ediyor. Ancak Linux üzerinde oyunun çok oyunculu tarafını çalıştırmak, yalnızca `iw3mp.exe` dosyasını açmaktan ibaret değil. Özellikle CoD4x istemcisi, Wine/Proton ortamı ve Steam'in oyun için oluşturduğu prefix arasında doğru bağlantıyı kurmak gerekiyor.

Bu rehberde Arch Linux üzerinde karşılaştığım kurulum sürecini adım adım anlatıyorum. Oyun dosyalarım zaten diskimde bulunuyordu. Amacım eski Wine kurulumunu bozmadan oyunu daha güncel bir Proton ortamında çalıştırmak ve CoD4x sunucularına bağlanabilmekti.

İlk denemelerde oyun açılmasına rağmen sunucuya bağlanırken CoD4x'in Steam'in çalışıyor olmasını isteyen hatasıyla karşılaştım. Sorunu araştırırken Linux kullanıcılarının paylaştığı bir prefix aktarım yöntemini denedim. CoD4x'in kullanıcı verilerini Steam'in oluşturduğu Proton prefix'ine kopyaladıktan sonra oyunu Steam üzerinden başlatmak sorunu çözdü.

Buradaki önemli ayrıntı şu: Kullandığım oyun Steam üzerinden indirilmiş bir oyun değildi. Steam'i yalnızca mevcut oyun dosyasını kütüphaneye ekleyip GE-Proton ile başlatmak için kullandım. Steam'e harici oyun eklemek, oyunu Steam sürümüne dönüştürmez veya Steam üzerinden güncelleme sağlamaz. [Steam'in harici oyun ekleme açıklamasında](https://help.steampowered.com/en/faqs/view/4B8B-9697-2338-40EC){: target="_blank" rel="noopener noreferrer"} da bu ayrım açıkça belirtiliyor.

## 1. Kullandığım sistem ve yazılımlar

Kurulum aşağıdaki ortam üzerinde gerçekleştirildi:

| Bileşen | Kullanılan yapı |
|---|---|
| Dağıtım | Arch Linux |
| Masaüstü ortamı | KDE Plasma (Wayland) |
| İşlemci | Intel Core i5-13400F |
| Ekran kartı | NVIDIA GeForce RTX 4060 Ti 16 GB |
| Oyun | Call of Duty 4: Modern Warfare |
| Multiplayer istemcisi | CoD4x |
| Uyumluluk katmanı | GE-Proton 10-27 |
| Oyun başlatıcısı | Steam |
| Prefix ve kurulum işlemleri | UMU (`umu-run`) |

Bu rehberde özellikle GE-Proton 10-27 kullandım. Bu, kurulum sırasında kullandığım sürümdür; günümüzdeki en yeni GE-Proton sürümü olduğu iddiasında değilim. Farklı Proton sürümlerinde davranış değişebileceğinden başka bir sürüm kullanıyorsanız sonuçlar birebir aynı olmayabilir.

GE-Proton'un Steam'e harici bir uyumluluk aracı olarak eklenmesi için [GE-Proton projesinin kurulum açıklamasını](https://github.com/GloriousEggroll/proton-ge-custom){: target="_blank" rel="noopener noreferrer"} inceleyebilirsiniz.

## 2. Eski Wine kurulumuna dokunmadan ayrı bir prefix oluşturma

İlk olarak oyun dosyalarının bulunduğu dizini belirledim.

Mevcut oyun kurulumum şu konumdaydı:

```text
/mnt/steam_depo/cod4/game/prefix/drive_c/game/
```

Bu dizinde `iw3mp.exe`, `iw3sp.exe` ve `version.inf` gibi temel oyun dosyaları bulunuyordu.

Önce oyun sürüm bilgisini kontrol ettim:

```bash
GAME="/mnt/steam_depo/cod4/game/prefix/drive_c/game"

printf '%s\n' '--- Oyun dosyaları ---'
ls -lh "$GAME"/iw3mp.exe "$GAME"/iw3sp.exe "$GAME"/version.inf

printf '\n%s\n' '--- Sürüm bilgisi ---'
cat "$GAME/version.inf"
```

İncelediğim `version.inf` dosyasında şu değer yer alıyordu:

```ini
[Version Info]
ExtVersion=1.7
IntVersion=28.2
Language=255
Branch=0.0
QA=5112
```

Buradaki `ExtVersion=1.7` değeri, mevcut oyun dosyalarının sürüm bilgisini gösteriyordu. Ancak bu dosyadan tek başına oyunun bütün yama/build ayrıntılarını çıkarmak doğru olmaz.

CoD4x'in resmî kurulum belgeleri de istemcinin 1.7 sürümündeki Call of Duty 4 kurulumu üzerine kurulmasını anlatıyor. Kurulumdan önce kendi oyun dosyalarınızın sürümünü kontrol etmeniz bu yüzden önemli.

Resmî belgeler: [CoD4x istemci kurulum rehberi](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"}.

### Neden eski prefix'i kullanmadım?

Mevcut kurulumum eski bir Wine ortamına bağlıydı. Bu ortamı silmek veya üzerine yeni Proton dosyaları yazmak istemedim.

Bunun yerine yeni bir prefix oluşturdum:

```text
/mnt/steam_depo/cod4/game/prefix-ge/
```

Böylece iki farklı ortam elde ettim:

```text
cod4/
└── game/
    ├── prefix/
    │   └── drive_c/
    │       └── game/
    │
    └── prefix-ge/
        └── drive_c/
            └── game/
```

`prefix` eski kurulum olarak kaldı. `prefix-ge` ise GE-Proton ile kullanacağım yeni ortam oldu.

Bu ayrım önemli. Bir oyunu farklı Wine veya Proton sürümleriyle denemek istediğinizde eski prefix'i korumak, sorun yaşarsanız geri dönmenizi kolaylaştırır.

### UMU ile yeni prefix oluşturma

UMU, Windows oyunlarını Proton ve Steam Linux Runtime ortamında çalıştırabilen bir başlatıcıdır. Belirli bir Proton sürümünü ve Wine prefix dizinini seçmemize olanak tanır.

Arch Linux tarafında UMU'nun kullanımı ve ortam değişkenleri için [UMU'nun resmî kullanım belgelerine](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"} bakabilirsiniz.

Yeni prefix'i oluşturmak için:

```bash
WINEPREFIX="/mnt/steam_depo/cod4/game/prefix-ge" \
PROTONPATH="/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
umu-run ""
```

Bu komutun amacı oyunu başlatmak değil, belirtilen dizinde Proton/Wine prefix yapısını oluşturmaktı. UMU belgelerinde de boş çalıştırılabilir dosya ile prefix oluşturma örneği bulunuyor.

Komut tamamlandığında yeni prefix altında `drive_c` dizininin oluştuğunu kontrol ettim.

## 3. Oyun dosyalarını yeni prefix'e kopyalama

Yeni prefix hazır olduktan sonra mevcut oyun dosyalarını buraya aktardım.

Burada bütün eski Wine prefix'ini kopyalamadım. Yalnızca oyunun kendi dosyalarının bulunduğu `game` dizinini yeni prefix'e taşıdım demek de doğru olmaz; yaptığım işlem **kopyalamaydı**. Eski dizin yerinde kaldı.

Kullandığım komutlar:

```bash
SOURCE="/mnt/steam_depo/cod4/game/prefix/drive_c/game"
DEST="/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game"

mkdir -p "$DEST"
cp -a "$SOURCE/." "$DEST/"
```

Burada `cp -a` kullanmamın nedeni, dosyaları ve dizinleri öznitelikleriyle birlikte kopyalamaktı. Kaynak dizindeki dosyalar silinmedi.

Kopyalama tamamlandıktan sonra iki dizinin boyutlarını karşılaştırdım:

```bash
du -sh \
  "/mnt/steam_depo/cod4/game/prefix/drive_c/game" \
  "/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game"
```

Benim kurulumumda iki oyun dizini de yaklaşık 6,5 GB boyutundaydı.

!!! warning "Dikkat! Kopyalama işlemi disk alanı kullanır."
    Bu yöntem eski oyun klasörünü silmez; ikinci bir kopya oluşturur. Oyun dizininiz büyükse hedef diskte yeterli boş alan bulunduğundan emin olun. Eski prefix'i veya oyun dosyalarını kaldırmanız gerekmiyor.

## 4. CoD4x istemcisini GE-Proton prefix'ine kurma

Oyun dosyalarını yeni prefix'e kopyaladıktan sonra CoD4x istemcisini kurma aşamasına geçtim.

CoD4x, Call of Duty 4'ün 1.8 ve üzeri CoD4x etkin sunucularında oynamak için kullanılan istemci tarafıdır. Resmî belgelerde istemciyi sunucuya bağlanırken otomatik kurulum isteği üzerinden yükleme veya manuel kurulum yöntemiyle yükleme seçenekleri anlatılıyor.

Proje sayfası: [CoD4x istemci kurulum belgeleri](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"}.

Kurulum dosyasını CoD4x'in resmî sitesinden indirdim:

[CoD4x resmî sitesi](https://cod4x.ovh/){: target="_blank" rel="noopener noreferrer"}

İndirdiğim dosyayı şu konuma yerleştirdim:

```text
/mnt/steam_depo/cod4/CoD4x-Setup.exe
```

Dosyanın Windows çalıştırılabilir dosyası olduğunu kontrol ettim:

```bash
file "/mnt/steam_depo/cod4/CoD4x-Setup.exe"
```

Ardından kurulum dosyasını UMU üzerinden, yeni prefix'i kullanarak çalıştırdım:

```bash
WINEPREFIX="/mnt/steam_depo/cod4/game/prefix-ge" \
PROTONPATH="/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
GAMEID=0 \
STEAM_COMPAT_LIBRARY_PATHS="/mnt/steam_depo" \
umu-run "/mnt/steam_depo/cod4/CoD4x-Setup.exe"
```

Bu komutta kullanılan değişkenlerin görevleri şöyle:

- `WINEPREFIX`: CoD4x kurulumunun kullanacağı yeni prefix dizinini belirler.
- `PROTONPATH`: Kullanılacak GE-Proton sürümünü gösterir.
- `GAMEID`: UMU tarafındaki oyun kimliği değeridir. Buradaki `0`, Steam'in Call of Duty 4 uygulama kimliği anlamına gelmez.
- `STEAM_COMPAT_LIBRARY_PATHS`: Bu kurulumda `/mnt/steam_depo` dizinini Proton ortamına görünür hâle getirmek için kullandım.

UMU'nun `GAMEID`, `WINEPREFIX` ve `PROTONPATH` değişkenleri hakkında ayrıntılı bilgiye [UMU kullanım belgelerinden](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"} ulaşabilirsiniz.

### Kurulum yolunda kafa karıştıran ayrıntı

Kurulum sırasında yükleyici ekranında şu yolu gördüm:

```text
S:\cod4\game\prefix\drive_c\game
```

Bu görüntü ilk bakışta CoD4x'in eski prefix'e kurulduğunu düşündürdü. Çünkü `S:` sürücüsü `/mnt/steam_depo` dizinine eşlenmişti.

Burada yalnızca yükleyicinin gösterdiği yola bakarak karar vermedim. Kurulum sonrasında hem eski hem de yeni prefix içerisinde CoD4x dosyalarını aradım.

Kontrollerde CoD4x dosyaları yeni `prefix-ge` altında görünüyordu. Eski prefix içerisinde CoD4x'e ait yeni kurulum dosyaları bulunmuyordu.

Bu nedenle kurulum ekranındaki yolun kafa karıştırmasına rağmen eski kurulumun üzerine yazılmadığını dosya sistemi üzerinden doğrulayabildim.

Yeni prefix altında oluşan dosyalardan bazıları şunlardı:

```text
drive_c/ProgramData/CallofDuty4MW/
drive_c/users/steamuser/AppData/Local/CallofDuty4MW/
```

Özellikle ikinci dizin, birazdan yapacağımız işlem için önemli.

### CoD4x dosyalarının oluştuğunu kontrol etme

Önemli istemci dosyasını kontrol etmek için:

```bash
find "/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW" \
  -type f \
  \( -name 'cod4x_*.dll' -o -name 'launcher.dll' -o -name 'iw3mp.exe' \) \
  -print
```

Kurulumdan sonra `cod4x_021.dll` dosyası da oluşmuştu.

Bu dosya adı istemci dosyalarının `cod4x_021` ailesine ait olduğunu gösteriyor. Ancak elimde kurulan istemcinin tam alt sürümünü doğrulayacak ayrı bir kayıt bulunmadığından bunu 21.1 veya 21.3 gibi kesin bir sürüm olarak tanımlamıyorum.

## 5. GE-Proton'u Steam'e tanıtma

CoD4x dosyaları yeni prefix'e kurulduktan sonra GE-Proton'u Steam üzerinden seçilebilir hâle getirdim.

GE-Proton arşivini şu dizinde tutuyordum:

```text
/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27/
```

Steam'in uyumluluk araçları dizini altında bu klasöre sembolik bağlantı oluşturdum:

```bash
mkdir -p "$HOME/.steam/root/compatibilitytools.d"

ln -s \
  "/mnt/steam_depo/compatibilitytools.d/GE-Proton10-27" \
  "$HOME/.steam/root/compatibilitytools.d/GE-Proton10-27"
```

Bu komut GE-Proton dosyalarını yeniden kopyalamaz. Steam'in kendi uyumluluk araçları dizininden mevcut GE-Proton klasörüne bağlantı oluşturur.

Steam'i tamamen kapatıp yeniden açtıktan sonra ayarlardaki uyumluluk araçları arasında `GE-Proton10-27` sürümünün göründüğünü doğruladım.

## 6. Call of Duty 4'ü Steam'e harici oyun olarak ekleme

Şimdi oyunu Steam kütüphanesine ekledim.

Steam'de:

1. **Oyunlar** menüsünü açın.
2. **Steam Dışı Bir Oyunu Kütüphaneme Ekle** seçeneğine girin.
3. `iw3mp.exe` dosyasını bulun ve ekleyin.

Benim oyun dosyamın yolu:

```text
/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game/iw3mp.exe
```

Oyunun özelliklerini açarak şu ayarları yaptım:

| Alan | Değer |
|---|---|
| Hedef | `/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game/iw3mp.exe` |
| Başlangıç konumu | `/mnt/steam_depo/cod4/game/prefix-ge/drive_c/game` |
| Uyumluluk | GE-Proton10-27'yi zorla |

Başlangıç seçeneklerine de şu değeri ekledim:

```text
PROTON_LOG=1 %command%
```

Bu seçenek oyuna özel bir CoD4x parametresi değildir. Proton hata ayıklama günlüğü oluşturmak için kullanılır. İleride bir sorun yaşarsam oyunun başlatıldığı oturuma ait kayıtları inceleyebilmek için açık bıraktım.

!!! note "Not: Harici oyun eklemek Steam sürümü oluşturmaz."
    Steam'e eklediğimiz şey mevcut `iw3mp.exe` dosyasının bir kısayoludur. Oyun dosyaları hâlâ `/mnt/steam_depo/cod4` altındadır. Steam'in bu özelliği oyunu Steam üzerinden satın alınmış veya indirilmiş bir oyuna dönüştürmez.

Bu aşamada oyunu UMU üzerinden doğrudan çalıştırabildiğim hâlde sunucuya katılmaya çalışırken CoD4x'in Steam'in çalışıyor olması gerektiğini söyleyen hatasıyla karşılaştım.

Oyunun menüsünün açılması, multiplayer bağlantısının da sorunsuz olacağı anlamına gelmiyordu.

## 7. CoD4x'in Steam hatasını çözme: AppData klasörünü aktarma

Bu hatayı araştırırken CoD4x forumunda Linux kullanıcılarının paylaştığı bir çözümle karşılaştım.

[CoD4x Steam needs to be running error on Linux – forum konusu](https://cod4x.ovh/t/cod4x-steam-needs-to-be-running-error-on-linux-fix/5461){: target="_blank" rel="noopener noreferrer"}

Paylaşılan yöntemin temel fikri, CoD4x'in oluşturduğu `CallofDuty4MW` kullanıcı klasörünü Wine prefix'inden Steam'in Proton prefix'ine aktarmak ve oyunu Steam üzerinden çalıştırmaktı.

Burada önemli bir ayrıntı var: Forumdaki örnekte Steam'den alınmış Call of Duty 4 için `compatdata/7940` dizini kullanılıyordu. Benim kurulumum Steam'den edinilmiş bir oyun olmadığı için aynı yolu doğrudan kullanmadım.

Önce Steam üzerinden eklediğim harici oyunu bir kez başlattım. Steam'in hangi prefix'i oluşturduğunu Proton günlüğünden kontrol ettim.

Benim sistemimde günlükte şu yol görünüyordu:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/
```

Dolayısıyla Steam'in kullandığı prefix şu dizindi:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/pfx/
```

Bu yol benim harici oyun kısayoluma ait kurulumda gözlemlediğim sonuçtur. Başka bir bilgisayarda veya farklı bir Steam kurulumunda aynı `compatdata/0` dizininin kullanılacağını varsaymayın. Herkes kendi Steam günlüğünden doğru prefix yolunu bulmalı.

### CoD4x kullanıcı klasörünü kopyalama

CoD4x'in yeni GE-Proton prefix'inde oluşturduğu kullanıcı klasörü şuradaydı:

```text
/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW
```

Steam'in oluşturduğu prefix içerisindeki hedef ise:

```text
/home/friday13/.local/share/Steam/steamapps/compatdata/0/pfx/drive_c/users/steamuser/AppData/Local/CallofDuty4MW
```

Önce kaynak ve hedef yollarını değişkenlere atadım:

```bash
SOURCE="/mnt/steam_depo/cod4/game/prefix-ge/drive_c/users/steamuser/AppData/Local/CallofDuty4MW"

DEST="$HOME/.local/share/Steam/steamapps/compatdata/0/pfx/drive_c/users/steamuser/AppData/Local/CallofDuty4MW"
```

Kaynağın gerçekten bulunduğunu kontrol ettim:

```bash
test -d "$SOURCE" && echo "CoD4x kaynak klasörü bulundu."
```

Hedef klasör daha önce oluşmadığı için kopyalama işlemini gerçekleştirdim:

```bash
mkdir -p "$DEST"
cp -a "$SOURCE/." "$DEST/"
```

Burada `SOURCE/.` kullanılması, `CallofDuty4MW` klasörünün kendisini iç içe ikinci bir klasör olarak oluşturmak yerine **içindeki bütün dosyaları hedef klasöre kopyalar**.

Örneğin aşağıdaki dosyalar da birlikte aktarıldı:

```text
CallofDuty4MW/
├── filter.txt
├── globalconfig.cfg
├── servercache.dat
├── bin/
│   ├── launcher.dll
│   ├── iw3mp.exe
│   └── cod4x_021/
│       └── cod4x_021.dll
├── main/
│   └── jcod4x_00.iwd
├── zone/
│   ├── cod4x_patch.ff
│   ├── cod4x_patchv2.ff
│   └── cod4x_ambfix.ff
├── updates/
└── players/
    └── profiles/
```

Bu işlemin sonunda kaynak klasörü yerinde kaldı. Yalnızca kullanıcı verilerini ve CoD4x'in ilgili istemci dosyalarını içeren `AppData/Local/CallofDuty4MW` klasörünün bir kopyası Steam prefix'ine aktarıldı.

!!! warning "Dikkat! Her bilgisayarda compatdata/0 kullanmayın."
    `compatdata/7940`, Steam'deki Call of Duty 4 uygulamasına ait örnek yoldur. Harici oyun kısayolunun Steam tarafından oluşturulan prefix'i farklı olabilir. Yanlış prefix'e kopyalama yapmak sorunu çözmeyebilir. Önce Steam'in gerçekten hangi prefix'i kullandığını belirleyin.

### Kopyalamanın doğrulanması

Kopyalama sonrasında hedefte CoD4x dosyalarının bulunduğunu kontrol ettim:

```bash
find "$DEST" -maxdepth 4 -type f | sort
```

Özellikle istemci DLL dosyasının hedefte bulunduğunu kontrol etmek de mümkün:

```bash
test -f "$DEST/bin/cod4x_021/cod4x_021.dll" \
  && echo "CoD4x istemci dosyası hedefte mevcut."
```

Bundan sonra Steam kütüphanesindeki Call of Duty 4 kısayolunu kullanarak oyunu tekrar başlattım.

Bu kez multiplayer tarafında karşılaştığım Steam kontrolü hatası ortadan kalktı ve oyun çalıştı.

Buradaki çözüm, CoD4x topluluğunda paylaşılan yöntemin benim Arch Linux ve GE-Proton kurulumumdaki sonucudur. Her oyun kopyasında, her CoD4x sürümünde veya her Steam prefix'inde aynı sonucu garanti etmez.

## 8. Oyun donarsa Proton günlüğünü inceleme

Oyunu çalıştırdıktan sonra bir kez donma problemi de yaşadım. Ancak bu donmanın nedenini henüz kesin olarak belirleyemedim.

Bu noktada önemli olan, başarılı çalışan bir oturumun günlüğünü donma kaydıymış gibi değerlendirmemek.

Steam'deki başlatma seçeneklerinde şu değer bulunduğu için Proton günlüğü oluşturuluyordu:

```text
PROTON_LOG=1 %command%
```

Benim harici oyun kısayolumun günlüğü şu dosyaya yazılıyordu:

```text
~/steam-13678473494847815680.log
```

Buradaki uzun numara Steam'in oluşturduğu kısayol kimliğine aittir. Başka bir kullanıcıda dosya adı farklı olacaktır.

Son oluşturulan günlükleri görmek için:

```bash
ls -lt "$HOME"/steam-*.log | head
```

Bir günlüğün içindeki önemli hata ve uyarı kayıtlarını süzmek için:

```bash
LOG="$HOME/steam-13678473494847815680.log"

grep -Ein \
  'err:|warn:|error|failed|exception|unhandled|crash|fatal|device lost|DXVK|Vulkan' \
  "$LOG" | tail -n 100
```

Bu komut yalnızca ilgili kelimeleri içeren satırları gösterir. Çıktıda `error` veya `warn` kelimesi görülmesi, oyunun kesin olarak o nedenle donduğu anlamına gelmez.

### Başarılı oturum günlüğünde ne gördüm?

İncelediğim son günlük başarılı bir oyun oturumuna aitti. Bu kayıtta:

- DXVK ve Vulkan başlatma kayıtları bulunuyordu.
- Grafik pipeline ile ilgili bazı Fossilize uyarıları görülüyordu.
- `Invalid window handle` hataları tekrarlanıyordu.
- Wine tarafında RPC ile ilgili uyarılar da bulunuyordu.

Ancak bu günlük oyunun başarılı çalıştığı bir oturuma ait olduğundan, söz konusu satırları donmanın nedeni olarak gösteremem.

Özellikle DXVK/Vulkan tarafının başlatıldığını görmek, grafik altyapısının en azından bu oturumda devreye girdiğini gösteriyor. Diğer uyarıların da tek başına kritik hata olduğu sonucuna ulaşmak doğru değil.

### Donma tekrar yaşanırsa hangi kayıtları almalıyım?

Donma gerçekleştiğinde Proton günlüğünün yanında sistem günlüğünü de incelemek gerekir.

Son birkaç dakikadaki çekirdek kayıtları:

```bash
journalctl -b -k --since "10 minutes ago" --no-pager
```

Steam, Proton, Wine ve NVIDIA ile ilişkili kayıtları süzmek için:

```bash
journalctl -b --since "10 minutes ago" --no-pager \
  | grep -Ei 'steam|proton|wine|iw3mp|segfault|killed|oom|nvidia|gpu|xid'
```

Bu kayıtlar donmanın hangi katmanda gerçekleştiğini anlamaya yardımcı olabilir. Örneğin bir süreç sonlandırılmış mı, bellek yetersizliği yaşanmış mı veya ekran kartı sürücüsü hata vermiş mi gibi ihtimalleri inceleyebiliriz.

Donma anına ait gerçek günlük olmadan bir ayarı değiştirmek veya belirli bir sürücüyü suçlamak doğru olmaz. Bu nedenle önce başarılı oturumun kaydını referans olarak saklamak, ardından donma yaşanan oturumun kayıtlarıyla karşılaştırmak daha sağlıklı.

## 9. Kurulumun son durumu

Bu çalışmada izlediğim yolun özeti şöyle:

1. Mevcut Call of Duty 4 oyun dosyalarını kontrol ettim.
2. Eski Wine prefix'ini koruyarak `prefix-ge` adında yeni bir ortam oluşturdum.
3. Oyunun `game` klasörünü yeni prefix'e kopyaladım.
4. GE-Proton 10-27'yi Steam'e tanıttım.
5. CoD4x istemcisini yeni prefix'e kurdum.
6. `iw3mp.exe` dosyasını Steam'e harici oyun olarak ekledim.
7. CoD4x'in Steam kontrolü hatasıyla karşılaşınca `CallofDuty4MW` kullanıcı klasörünü Steam'in kullandığı Proton prefix'ine kopyaladım.
8. Oyunu Steam üzerinden yeniden başlattım ve multiplayer tarafında çalıştığını doğruladım.
9. Olası donma sorunları için `PROTON_LOG=1` seçeneğini açık bıraktım.

Sonuç olarak Call of Duty 4 multiplayer istemcisini Arch Linux üzerinde GE-Proton ile çalıştırabildim. Eski Wine kurulumuna dokunmamış oldum ve CoD4x'in Steam kontrolü hatasını kullandığım sistemde çözdüm.

Bununla birlikte donmanın nedeni henüz teşhis edilmiş değil. Oyun bir oturumda başarılı çalıştı diye uzun vadeli kararlılık konusunda kesin bir sonuca varmak istemiyorum. Donma tekrar yaşanırsa gerçek hata kaydını incelemek gerekiyor.

## Kaynaklar

- [CoD4x – Resmî istemci kurulum belgeleri](https://github.com/callofduty4x/cod4x-docs/blob/master/cod4x-client/installation.md){: target="_blank" rel="noopener noreferrer"} — CoD4x istemcisinin kurulumu ve Linux/Wine hakkındaki proje belgeleri.
- [CoD4x – Sık sorulan sorular](https://cod4x.ovh/t/faq-commonly-asked-questions/4713){: target="_blank" rel="noopener noreferrer"} — CoD4x yapılandırma ve kullanıcı profil dizinleri.
- [CoD4x – Linux'ta Steam çalışıyor olmalı hatası](https://cod4x.ovh/t/cod4x-steam-needs-to-be-running-error-on-linux-fix/5461){: target="_blank" rel="noopener noreferrer"} — Linux kullanıcılarının paylaştığı prefix aktarım yöntemi.
- [ZAKII – Linux üzerinde CoD4x rehberi](https://zakii.de/lab/cod4xlinux/){: target="_blank" rel="noopener noreferrer"} — Steam dışı oyun kurulumu ve Proton prefix'iyle ilgili topluluk rehberi.
- [UMU Launcher – Kullanım belgeleri](https://github.com/Open-Wine-Components/umu-launcher/blob/main/docs/umu.1.scd){: target="_blank" rel="noopener noreferrer"} — `umu-run`, `WINEPREFIX`, `PROTONPATH` ve `GAMEID` açıklamaları.
- [GE-Proton – GitHub deposu](https://github.com/GloriousEggroll/proton-ge-custom){: target="_blank" rel="noopener noreferrer"} — GE-Proton kurulumu ve Steam uyumluluk araçları.
- [Arch Wiki – Steam](https://wiki.archlinux.org/title/Steam){: target="_blank" rel="noopener noreferrer"} — Arch Linux üzerinde Steam ve Proton kullanımı.
- [Steam Destek – Steam dışı oyunları kütüphaneye ekleme](https://help.steampowered.com/en/faqs/view/4B8B-9697-2338-40EC){: target="_blank" rel="noopener noreferrer"} — Harici oyun kısayollarının çalışma şekli.