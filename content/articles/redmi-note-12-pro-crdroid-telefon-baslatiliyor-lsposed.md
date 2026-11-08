Title: Redmi Note 12 Pro 5G crDroid'de Telefon Başlatılıyor Ekranında Kalma Sorunu ve LSPosed Çözümü
Date: 2026-11-08 13:07 13:07
Modified: 2026-11-08 13:07
Category: Sorun Giderme
Tags: redmi-note-12-pro-5g, crdroid, android-16, folkpatch, rezygisk, lsposed, spoofmydevice, adb, fastboot
Slug: redmi-note-12-pro-crdroid-telefon-baslatiliyor-lsposed
Authors: yuceltoluyag
Summary: Redmi Note 12 Pro 5G üzerinde crDroid 12.12 kullanırken yaşadığım açılış sorununu ADB kayıtlarıyla inceledim. LSPosed'i devre dışı bıraktığımda cihazın yeniden normal şekilde açılmasını sağlayan çözümü ve teşhis sürecini anlatıyorum.
Status: published
Template: article
Lang: tr
Translation: false
Series: 12 Pro 5G
Series_index: 5

Bazen telefonu bozmak için yanlış bir ROM yüklemeniz veya yanlış bir partition'a dosya yazmanız gerekmiyor. Hatta benim yaşadığım olayda herhangi bir bölüme yazma işlemi yapmadım. Sadece Fastboot üzerinden birkaç bilgi kontrol edip cihazı yeniden başlattım. Ancak telefon bir türlü normal açılışını tamamlayamadı.

Redmi Note 12 Pro 5G cihazımda crDroid 12.12 (Android 16) kullanıyordum. Root yönetimi için FolkPatch, Zygisk altyapısı için ReZygisk ve uygulama bazlı cihaz bilgisi değiştirmek için LSPosed kullanıyordum.

e-Devlet uygulamasında üretici bilgisini AOSP olarak göstermek amacıyla SpoofMyDevice modülünü de yapılandırmıştım. LSPosed içerisinde yalnızca e-Devlet uygulamasını scope'a eklemiş, üretici bilgisini AOSP olarak ayarlamıştım.

Telefon yeniden başladığında ekranda sürekli **"Telefon başlatılıyor"** yazısı kalıyordu. İlk bakışta Android açılmıyor gibi görünüyordu. Fakat ADB bağlantısının çalışması ve sistem günlüklerinde karşılaştığım hatalar bambaşka bir duruma işaret ediyordu.

Sonunda LSPosed'i kaldırmadan, yalnızca devre dışı bırakarak telefonu normal şekilde açmayı başardım.

Bu yazıda Fastboot kontrollerinden Recovery incelemesine, ADB günlüklerinden sorunun çözümüne kadar yaşadığım süreci anlatıyorum.

## Kullandığım cihaz ve yazılım yapısı

Sorun yaşadığım ortam şu şekildeydi:

| Bileşen | Bilgi |
|---|---|
| Cihaz | Redmi Note 12 Pro 5G |
| Model numarası | 22101316I |
| Recovery cihaz kodu | `rubyx` |
| ROM | crDroid 12.12 |
| Android | 16 |
| Root yöneticisi | FolkPatch |
| Zygisk altyapısı | ReZygisk |
| Xposed framework | LSPosed v2.2.1 (7912) |
| Cihaz bilgisi modülü | SpoofMyDevice |
| Spoof profili | Üretici: AOSP |
| LSPosed scope | Yalnızca e-Devlet |

LSPosed'in tam sürümü özellikle önemli. Çünkü daha sonra araştırma yaparken aynı 7912 sürüm numarasını kullanan bir başka Zygisk/Xposed kurulumunda da benzer açılış hatalarının rapor edildiğini gördüm.

Cihazın ROM kurulumu ve önceki işlemler için [Redmi Note 12 Pro 5G crDroid kurulum rehberime](/redmi-note-12-pro-5g-crdroid-kurulum-rehberi/) de göz atabilirsiniz.

## 1. Sorun nasıl başladı? Fastboot kontrolleri

Telefon normal çalışırken A/B bölüm yapısını kontrol etmek istedim. Bilgisayardan önce şu komutu çalıştırdım:

```bash
adb reboot bootloader
```

Telefon Fastboot moduna geçti. Bu sırada ADB bağlantısının kesilmesi normaldir. Çünkü Android ortamından çıkıp Bootloader ortamına geçmiş oluyorsunuz. Bu modda ADB yerine Fastboot kullanılır.

Bağlantıyı doğruladım:

```bash
fastboot devices
```

Ardından yalnızca iki bilgi sorguladım:

```bash
fastboot getvar current-slot
fastboot getvar has-slot:boot
```

Çıktılar:

```text
current-slot: a
Finished. Total time: 0.000s

has-slot:boot: yes
Finished. Total time: 0.000s
```

Buradan cihazın aktif slotunun `a` olduğunu ve boot bölümünün A/B yapısına sahip olduğunu öğrendim.

Ek olarak slot durumlarını da kontrol ettim:

```bash
fastboot getvar current-slot

fastboot getvar slot-successful:a
fastboot getvar slot-unbootable:a

fastboot getvar slot-successful:b
fastboot getvar slot-unbootable:b
```

Çıktılar:

```text
current-slot: a

slot-successful:a: yes
slot-unbootable:a: no

slot-successful:b: no
slot-unbootable:b: no
```

Buna göre A slotu başarılı açılış olarak işaretlenmişti. B slotu ise henüz başarılı açılış olarak işaretlenmemişti ancak kullanılamaz durumda da değildi.

!!! note "Not: Fastboot getvar telefonu değiştirir mi?"
    `getvar`, Bootloader üzerinden bir değişkenin değerini okumak için kullanılır. `fastboot flash` veya `fastboot erase` gibi bölümlere yazma ya da silme işlemi gerçekleştirmez. Dolayısıyla yaptığım sorgular telefonun boot bölümünü değiştirmedi.[^1]

Kontrollerin ardından telefonu yeniden başlattım:

```bash
fastboot reboot
```

İşte sorun bundan sonra ortaya çıktı. Telefon normal açılış ekranına geçmek yerine "Telefon başlatılıyor" yazısında kaldı.

Burada önemli bir ayrıntı var: Sorunun tam olarak bu komutla mı tetiklendiğini, yoksa o sırada etkin olan LSPosed yapılandırmasının mı açılışta sorun çıkardığını ilk başta bilmiyordum.

## 2. Android açılmış mıydı? ADB ile kontrol

Telefonun ekranında açılış yazısı kalmasına rağmen bilgisayardan ADB bağlantısını kontrol ettim:

```bash
adb devices -l
```

Çıktı:

```text
List of devices attached
79orfygmgecmw84t device usb:1-9 product:ruby_in model:22101316I device:ruby
```

Telefon ADB üzerinden erişilebilir durumdaydı.

Ardından Android'in açılış durumunu kontrol ettim:

```bash
adb shell getprop sys.boot_completed
adb shell getprop init.svc.bootanim
adb shell getprop dev.bootcomplete
```

Çıktılar:

```text
1
stopped
1
```

Bu sonuç oldukça önemliydi. Android'in temel açılış süreci tamamlanmıştı. Dolayısıyla klasik anlamda açılış döngüsüne giren veya tamamen başlayamayan bir sistemle karşı karşıya değildim.

Ancak kullanıcı arayüzü hâlâ düzgün çalışmıyordu.

## 3. Android neden FallbackHome ekranında kalıyordu?

Bir sonraki adımda hangi pencerenin ön planda olduğunu kontrol ettim:

```bash
adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
```

Çıktı:

```text
mCurrentFocus=Window{82b7cdd u0 com.android.settings/com.android.settings.FallbackHome}
mFocusedApp=ActivityRecord{229381909 u0 com.android.settings/.FallbackHome t3}
```

Burada `FallbackHome` dikkatimi çekti.

Android'de FallbackHome, gerçek ana ekran uygulaması henüz kullanıma hazır olmadığında devreye giren yedek etkinliktir. Kullanıcının kilidi açıldığında gerçek HOME uygulamasını bulup kendisini kapatmayı dener.[^2]

Peki kullanıcı neden hâlâ kilitliydi?

Şu komutu çalıştırdım:

```bash
adb shell dumpsys user
```

İlgili çıktı:

```text
UserInfo{0:null:4c13} serialNo=0 isPrimary=true

State: RUNNING_LOCKED

Unlock time: <unknown>

Started users state: [0=RUNNING_LOCKED]
```

Android kullanıcıyı başlatmıştı ancak kilit açma işlemi tamamlanmamıştı.

Bunu Trust servisi üzerinden de doğruladım:

```bash
adb shell dumpsys trust | grep -iE 'deviceLocked|strongAuthRequired'
```

Çıktı:

```text
deviceLocked=1
strongAuthRequired=0x1
```

Yani Android kullanıcı oturumunun kilidinin açılmasını bekliyordu.

## 4. Asıl ipucu: Keyguard servisi çalışmıyordu

Android'deki kilit ekranı mekanizmasını araştırırken şu komutu kullandım:

```bash
adb shell dumpsys window policy | grep -iE 'keyguard|showing|occluded'
```

Çıktıda:

```text
showing=true
occluded=false
deviceHasKeyguard=true
```

bulunuyordu.

Fakat loglarda çok daha önemli bir hata vardı:

```text
W/KeyguardServiceDelegate:
onScreenTurningOn(): no keyguard service!
```

SystemUI işleminin çalışıp çalışmadığını kontrol ettim:

```bash
adb shell pidof com.android.systemui
```

İşlem zaman zaman çalışıyordu. Ancak servis bağlantıları arasında şu durumu görüyordum:

```text
ConnectionRecord{... CR DEAD com.android.systemui/.keyguard.KeyguardService}
```

Yani SystemUI ile Android'in kilit ekranı servisi arasındaki bağlantı kopmuştu.

Sorunun yalnızca Launcher kaynaklı olmadığını artık anlamıştım.

## 5. SystemUI neden kapanıyordu? Start timeout hataları

Biraz daha derine inmek için sistem günlüklerini inceledim:

```bash
adb logcat -b events -d -v threadtime | grep -iE \
'am_crash|am_anr|am_proc_died|am_kill'
```

Çıktıda yalnızca SystemUI değil, birçok Android sistem uygulamasının başlatma zaman aşımına uğradığını gördüm.

Örneğin:

```text
am_kill:
[0,3130,com.android.systemui,-10000,start timeout,71480]
```

Benzer hatalar şu süreçlerde de vardı:

- `com.android.phone`
- `com.android.nfc`
- `com.android.se`
- `com.android.settings`
- `com.android.networkstack.process`
- `org.protonaosp.columbus`

Daha ayrıntılı günlüklerde ise:

```text
Process ... com.android.systemui failed to attach

am_process_start_timeout

Killing ... com.android.systemui: start timeout
```

kayıtlarını gördüm.

Android'in ActivityManager mekanizması, yeni başlatılan bir uygulamanın ActivityManager'a bağlanmasını bekler. İlgili süre dolduğunda işlem sonlandırılabilir. AOSP kaynak kodunda normal süreç başlatma zaman aşımı `PROC_START_TIMEOUT = 10*1000` olarak tanımlanmıştır.[^3]

Benim günlüklerimde de süreçlerin başlatılmasından yaklaşık 10 saniye sonra sonlandırıldığı görülüyordu.

Bu bilgiyle birlikte şüphem değişti. Artık tek bir uygulamanın veya Launcher'ın bozuk olmasından ziyade, Zygote üzerinden başlatılan uygulama süreçlerinin başlangıç aşamasında bloke olabileceğini düşünüyordum.

## 6. Recovery üzerinden veri kaybı yaşamadan kontrol

Telefonu Fastboot üzerinden Recovery moduna aldım:

```bash
fastboot reboot recovery
```

Recovery açıldıktan sonra ADB bağlantısı yeniden kuruldu:

```bash
adb devices
```

İlk başta cihaz boş listede görünüyordu, ardından `unauthorized` ve son olarak `recovery` durumuna geçti.

Cihaz bilgilerini kontrol ettim:

```bash
adb shell getprop ro.product.device
adb shell getprop ro.boot.slot_suffix
adb shell id
```

Çıktılar:

```text
rubyx
_a
uid=2000(shell)
```

Recovery cihazı `rubyx` olarak rapor ediyordu.

Recovery günlüklerini de incelemek istedim. Normal `adb pull` işlemi izin hatası verdiği için Recovery ADB bağlantısında root erişimini açtım ve dosyayı bilgisayara aktardım.

Burada önemli olan `/data` bölümünü silmeden mevcut durumunu anlamaktı.

Recovery yapılandırmasında şu tanımlar vardı:

```text
/dev/block/by-name/metadata /metadata ext4 ...

/dev/block/by-name/userdata /data f2fs ...
```

Metadata şifreleme dizinini de salt okunur biçimde inceledim. Şu dosyalar mevcuttu:

```text
encrypted_key
keymaster_key_blob
secdiscardable
version
```

Bunlar metadata encryption mekanizmasının kullandığı anahtar kayıtlarıdır. Ancak dosyaların bulunması, donanım destekli anahtar çözme işleminin kesinlikle başarılı olduğunu tek başına kanıtlamaz.

Recovery ortamında `/data` otomatik bağlı değildi. Bu nedenle başlangıçta `/data/media` veya kullanıcı dizinlerine erişemiyordum.

Android'i normal şekilde yeniden başlatıp tekrar kontrol ettiğimde ise:

```text
/dev/block/dm-43 /data f2fs rw,...
```

çıktısını aldım.

Yani normal Android açılışında `/data` bölümü F2FS olarak başarıyla bağlanıyordu.

Bu bulgu, dosya sisteminin tamamen erişilemez olduğu veya metadata anahtarlarının kesin olarak kaybolduğu yönündeki ihtimalleri zayıflattı.

## 7. Kernel panic kaydı da bulduk ama doğrudan neden değildi

Teşhis sırasında şu özelliği de kontrol ettim:

```bash
adb shell getprop ro.boot.bootreason
```

Çıktı:

```text
kernel_panic
```

Bu nedenle pstore kayıtlarına baktım:

```bash
adb shell su -c 'ls -lah /sys/fs/pstore'
```

Burada `console-ramoops-0` ve `pmsg-ramoops-0` dosyaları bulunuyordu.

Kernel günlüklerinde gerçekten bir Oops kaydı vardı:

```text
Unable to handle kernel paging request

Internal error: Oops: 96000004 [#1] PREEMPT SMP
```

Çöken fonksiyon:

```text
__cgroup_bpf_run_filter_skb
```

Çağrı zinciri ağ trafiği ve TCP paket gönderimiyle ilişkiliydi.

Ancak pstore içindeki zaman bilgisi 13 Ağustos 2026 tarihini gösteriyordu. Bizim yaşadığımız problem ise 8 Kasım 2026 tarihinde ortaya çıkmıştı.

Dolayısıyla bu eski kernel kaydını yeni açılış sorununun nedeni olarak kabul etmedim.

Bu ayrım önemli: Pstore'da eski bir kernel çökme kaydı bulunması, mevcut sorunun da aynı çökmeden kaynaklandığını göstermez.

## 8. Asıl çözüm: LSPosed'i silmeden devre dışı bırakmak

Artık elimizde önemli bir şüpheli vardı: LSPosed.

Kullandığım root yönetimi FolkPatch üzerinden yüklediğim LSPosed modülünün sistem başlangıcını etkiliyor olabileceğini düşündüm.

Öncelikle yüklü modülleri listeledim:

```bash
adb shell su -c 'ls -1 /data/adb/modules'
```

Çıktı:

```text
rezygisk
rootGrantToast
zygisk_lsposed
```

Burada yalnızca LSPosed'i test etmek istiyordum. ReZygisk ve diğer modüllere dokunmak istemedim.

LSPosed'i tamamen kaldırmak yerine modül dizinine `disable` işaret dosyası oluşturdum:

```bash
adb shell su -c 'touch /data/adb/modules/zygisk_lsposed/disable'
```

Dosyanın varlığını ayrıca doğruladım:

```bash
adb shell su -c 'test -e /data/adb/modules/zygisk_lsposed/disable && echo DISABLE_VAR || echo DISABLE_YOK'
```

Çıktı:

```text
DISABLE_VAR
```

Böylece devre dışı bırakma işaretinin oluşturulduğunu doğruladım.

!!! warning "Dikkat! Modül dizinini doğru belirleyin."
    Buradaki `zygisk_lsposed` dizini benim FolkPatch kurulumumdaki gerçek modül kimliğidir. Başka bir cihazda veya root yöneticisinde aynı dizinin bulunduğunu varsaymayın. Önce `/data/adb/modules` içindeki gerçek modül adını kontrol edin. Yanlış modülü devre dışı bırakmak farklı sorunlara yol açabilir.

Şimdi telefonu yeniden başlattım:

```bash
adb reboot
```

Ve sonuç...

Telefon normal şekilde açıldı!

Artık "Telefon başlatılıyor" ekranında takılmıyordu. PIN ekranına ulaşabiliyor, Android'i normal şekilde kullanabiliyordum.

Daha sonra LSPosed devre dışı durumdayken telefonu tekrar yeniden başlattım. Bu sefer de sorun tekrarlanmadı. Üstelik e-Devlet uygulamasına da sorunsuz giriş yapabildim.

**Yani çözüm için LSPosed'i silmem, ROM'u yeniden yüklemem veya kullanıcı verilerini formatlamam gerekmedi.**

## 9. Aynı sürümle benzer bir hata raporu buldum

Sorunun nedenini araştırırken LSPosed sürümünün tam olarak `v2.2.1 (7912)` olduğunu da netleştirmiştim.

Bu sürüm numarasıyla karşılaştığım bir başka hata bildirimi dikkatimi çekti:

[Vector projesi Issue #1050 – lspd başlangıç kilidi ve uygulama başlatma zaman aşımı](https://github.com/JingMatrix/Vector/issues/1050){: target="_blank" rel="noopener noreferrer"}

31 Ekim 2026 tarihinde açılan bu hata bildiriminde, Android 11 kullanan başka bir cihazda `7912` sürümlü Xposed altyapısıyla benzer belirtiler rapor edilmişti.

Raporda şu durum anlatılıyordu:

- `lspd` başlangıç sırasında yaklaşık 15 saniye boyunca global bir kilit tutuyordu.
- Zygote üzerinden başlatılan uygulama süreçleri beklemeye giriyordu.
- ActivityManager'ın 10 saniyelik süreç başlatma süresi doluyordu.
- SystemUI ve telefon hizmetleri gibi süreçler `failed to attach` ve `start timeout` hatalarıyla sonlandırılıyordu.
- İlgili Zygisk/Xposed modülü devre dışı bırakıldığında bu hatalar ortadan kalkıyordu.

Raporda modülün sürümü `v2.2.1 (7912)` olarak listelenmişti. Bu, benim kullandığım sürümle aynı sürüm numarasıydı.

Ancak önemli bir fark var: Hata bildirimi Android 11, Magisk ve Zygisk Next kullanan bir cihazdan geliyordu. Benim cihazım Android 16, FolkPatch ve ReZygisk kullanıyordu.

Dolayısıyla bu rapor yaşadığım sorunun kesin olarak aynı hata olduğunu kanıtlamıyor. Fakat LSPosed ailesindeki bir başlangıç probleminin benim günlüklerdeki `failed to attach` ve `start timeout` belirtilerine benzer sonuçlar oluşturabildiğini gösteren değerli bir karşılaştırma sağlıyor.

İlginç bir başka ayrıntı da bu bildirimin 5 Kasım 2026 tarihinde ilgili bir PR ile kapatılmış olmasıydı. Ancak bu düzeltmenin benim kullandığım LSPosed paketine uygulanıp uygulanmadığını veya ReZygisk ile uyumlu olup olmadığını doğrulamış değilim.

## 10. Peki SpoofMyDevice mi, LSPosed mi sorun çıkardı?

Burada kesin konuşmak istemiyorum.

e-Devlet için yaptığımız yapılandırma şu şekildeydi:

- SpoofMyDevice modülü LSPosed üzerinde etkinleştirildi.
- Üretici bilgisi `AOSP` olarak ayarlandı.
- Scope içerisinde yalnızca e-Devlet uygulaması seçildi.
- Android System Framework için ayrıca bir spoof işlemi yapılmadı.

SpoofMyDevice'in [resmî GitHub açıklamasında](https://github.com/BuSung-dev/SpoofMyDevice/blob/main/README.md){: target="_blank" rel="noopener noreferrer"} uygulama bazlı profil ataması anlatılıyor ve Android System Framework'ün hook kapsamı dışında tutulduğu belirtiliyor.

Bu nedenle sorunu doğrudan AOSP üretici bilgisinin değiştirilmesine bağlamak doğru olmaz.

Elimizdeki testin gösterdiği şey daha sınırlı ama önemli:

| Durum | Sonuç |
|---|---|
| LSPosed etkin | Telefon açılışta takıldı |
| LSPosed devre dışı | Telefon normal açıldı |
| LSPosed kapalıyken ikinci yeniden başlatma | Sorun tekrarlanmadı |
| LSPosed kapalıyken e-Devlet | Çalıştı |

Bunlar LSPosed tarafını güçlü bir şüpheli hâline getiriyor.

Ancak SpoofMyDevice'in tek başına mı, LSPosed'in kendi başlangıç mekanizmasının mı, yoksa LSPosed ile ReZygisk arasındaki etkileşimin mi soruna neden olduğunu ayrı ayrı test etmedim.

Çalışan telefonu tekrar riske atmak istemediğim için bu noktada teşhisi durdurdum.

NFC taramasıyla uygulama başlatılmasına izin veren Android ayarını da başlangıçta olası nedenlerden biri olarak düşündüm. Ancak bu ayarı değiştirmeden LSPosed'i devre dışı bırakıp telefonu açabildim. Bu nedenle NFC ayarını sorunla ilişkilendirecek bir kanıt elde etmedim.

## 11. Benzer sorun yaşayanlara önerim

Benim yaşadığım olaydan çıkardığım en önemli ders şu: Android açılış ekranında takıldığında hemen ROM yüklemeye veya Factory Reset yapmaya yönelmemek gerekiyor.

Önce telefonun gerçekten açılıp açılmadığını ADB üzerinden kontrol edin.

Örneğin:

```bash
adb devices -l
```

Ardından:

```bash
adb shell getprop sys.boot_completed
```

Android açılışını tamamladığı hâlde kullanıcı arayüzü gelmiyorsa:

```bash
adb shell dumpsys user
```

ve:

```bash
adb shell dumpsys window | grep -E 'mCurrentFocus|mFocusedApp'
```

komutları sorunun hangi aşamada olduğunu anlamanıza yardımcı olabilir.

`FallbackHome`, `RUNNING_LOCKED`, `KeyguardService` ve `start timeout` kayıtları birlikte değerlendirildiğinde sorunun yalnızca Launcher kaynaklı olmadığı anlaşılabilir.

!!! warning "Kritik Uyarı! Bilinçsizce wipe veya flash yapmayın."
    Özellikle cihazınızda IMEI, modem veya şebeke tarafında daha önceden özel işlemler yapıldıysa Format Data, Factory Reset ve yanlış partition'a yazma işlemleri ciddi sonuçlar doğurabilir. Benim yaşadığım olayda bunların hiçbirine gerek kalmadı.

Bir başka önemli nokta da Fastboot üzerinden yaptığım `getvar` sorgularının telefonu bozmadığını doğrulamamızdı. Android'in Fastboot protokolünde `getvar` salt okunur bir değişken sorgusudur. `flash` ve `erase` ise farklı işlemlerdir. [Android Fastboot protokolü](https://android.googlesource.com/platform/system/core/+/a057057/fastboot/fastboot_protocol.txt){: target="_blank" rel="noopener noreferrer"} bu ayrımı tanımlar.

## Sonuç

Redmi Note 12 Pro 5G cihazımda crDroid 12.12 kullanırken yaşadığım bu sorun ilk başta bootloader veya A/B slot kaynaklı gibi görünüyordu. Ancak yaptığımız kontroller, Android'in aslında açıldığını ve problemin kullanıcı arayüzü ile sistem süreçlerinin başlatılması aşamasında yaşandığını gösterdi.

Sonunda LSPosed `v2.2.1 (7912)` modülünü tamamen kaldırmak yerine yalnızca devre dışı bıraktım. Telefon normal şekilde açıldı ve sonraki yeniden başlatmalarda sorun tekrarlanmadı. e-Devlet de LSPosed kapalıyken çalışmaya devam etti.

SpoofMyDevice, LSPosed veya ReZygisk bileşenlerinden hangisinin bu probleme neden olduğunu henüz kesinleştirmedim. Fakat en azından verileri silmeden ve ROM'u yeniden yüklemeden cihazı kurtarmayı başardım.

Bazen en doğru çözüm, sisteme daha fazla müdahale etmek değil, sorun çıkardığından şüphelendiğimiz bileşeni kontrollü biçimde devre dışı bırakıp yeniden denemektir.

## Kaynaklar

- [Android Open Source Project – Fastboot protokolü](https://android.googlesource.com/platform/system/core/+/a057057/fastboot/fastboot_protocol.txt){: target="_blank" rel="noopener noreferrer"}
- [Android Open Source Project – FallbackHome](https://android.googlesource.com/platform/packages/apps/Settings/+/2db5ecc/src/com/android/settings/FallbackHome.java){: target="_blank" rel="noopener noreferrer"}
- [Android Open Source Project – ActivityManagerService](https://android.googlesource.com/platform/frameworks/base/+/3b58eff/services/core/java/com/android/server/am/ActivityManagerService.java){: target="_blank" rel="noopener noreferrer"}
- [BuSung-dev – SpoofMyDevice kaynak kodu ve kullanım açıklaması](https://github.com/BuSung-dev/SpoofMyDevice){: target="_blank" rel="noopener noreferrer"}
- [JingMatrix – Vector Issue #1050: lspd başlangıç kilidi ve süreç başlatma zaman aşımı](https://github.com/JingMatrix/Vector/issues/1050){: target="_blank" rel="noopener noreferrer"}
- [PerformanC – ReZygisk kaynak kodu](https://github.com/PerformanC/ReZygisk){: target="_blank" rel="noopener noreferrer"}
- [LyraVoid – FolkPatch kaynak kodu](https://github.com/LyraVoid/FolkPatch){: target="_blank" rel="noopener noreferrer"}

[^1]: Android Fastboot protokolünde `getvar` değişken okuma komutudur. `flash` ve `erase` gibi komutlar ise partition üzerinde değişiklik yapar.
[^2]: AOSP FallbackHome uygulaması `ACTION_USER_UNLOCKED` olayını bekler. Kullanıcı kilidi açıldıktan sonra gerçek HOME uygulamasını bulmaya çalışır.
[^3]: AOSP ActivityManagerService kaynak kodunda normal süreç başlatma zaman aşımı `PROC_START_TIMEOUT = 10*1000` olarak tanımlanır.