Title: crDroid'de e-Devlet NFC Sorunu: MIUI İzin Kontrolünü İncelemek
Date: 2026-11-08 00:00
Modified: 2026-11-08
Category: Sorun Giderme
Tags: Android, crDroid, e-Devlet, NFC, FolkPatch, LSPosed, SpoofMyDevice, Xiaomi
Slug: crdroid-e-devlet-nfc-miui-izin-sorunu
Author: yuceltoluyag
Lang: tr
Translation: false
Status: published
Template: article
Summary: Redmi Note 12 Pro / Pro Plus 5G cihazımda crDroid 12 (Android 16) kullanırken e-Devlet'in MIUI'ye özel NFC izin ekranını açmaya çalışması nedeniyle yaşadığım sorunu ADB ile inceledim. NFC donanımını ve Android iznini kontrol ettikten sonra FolkPatch APM ile global üretici bilgisi değişikliğini denedim. Ardından SpoofMyDevice ve LSPosed kullanarak değişikliği yalnızca e-Devlet uygulamasına uyguladım. Sonuçta e-Devlet'e başarıyla giriş yaptım.
Series: 12 Pro 5G
Series_index: 4
Image: images/edevlet-uygulama-izinleri-xl.webp

crDroid kullandığım Redmi telefonumda e-Devlet'in iki aşamalı giriş için istediği telefon numarası doğrulamasını NFC üzerinden tamamlayamıyordum. İlk karşılaştığım uyarı, telefonun Xiaomi markalı cihazlarda bulunan bir izin ekranına yönlendirilmesiyle ilgiliydi. Fakat işe doğrudan yazılımdan başlamadım; önce NFC donanımında bir problem olup olmadığından şüphelendim.

Sonuçta custom ROM kullanıyoruz. Bazen donanım özellikleri ROM tarafında düzgün çalışmayabiliyor. Böyle bir problem olsaydı ROM geliştiricisinin veya kullanıcıların bundan bahsetmesini beklerdim. Yine de varsayımlarla hareket etmek istemedim. Google Play Store üzerinden [NFC Tools](https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=tr) uygulamasını indirdim ve NFC okuma testi yaptım. **Şaaaaak!** NFC tarafı sorunsuz çalıştı.

Kullandığım ROM da şu:

- **Cihaz:** Redmi Note 12 Pro / Pro Plus 5G
- **ROM:** crDroid 12.12
- **Android:** 16
- **ROM cihaz kod adı:** `rubyx`
- **Maintainer:** `YagizErdemir06`
- **Build tarihi:** 16 Eylül 2026

ROM'un [resmî crDroid indirme sayfası](https://crdroid.net/rubyx/12) üzerinden sürüm ve cihaz bilgilerine ulaşabilirsiniz. Geliştiricinin Türk olması da ayrıca hoşuma giden bir detay. :)

Redmi Note 12 Pro 5G cihazıma crDroid kurulumunu nasıl yaptığımı merak ediyorsanız, daha önce hazırladığım [Redmi Note 12 Pro 5G (ruby) için crDroid Kurulum Rehberi](https://yuceltoluyag.github.io/redmi-note-12-pro-5g-crdroid-kurulum-rehberi/) yazısına göz atabilirsiniz. Kurulum sürecini kendi deneyimim üzerinden adım adım anlattım.

NFC donanımının çalıştığını gördükten sonra sorunun nereden kaynaklandığını araştırmaya başladım. ADB ile Android'in izin durumunu ve cihaz özelliklerini inceledim. Ardından FolkPatch'in APM modül sistemiyle üretici bilgisini geçici olarak değiştirmeyi denedim. Bu global değişikliğin günlük kullanım için uygun olmayacağını düşünerek daha sonra SpoofMyDevice ve LSPosed ile yalnızca e-Devlet uygulamasını etkileyen bir çözüm hazırladım.

Yaptığım son testte e-Devlet'e başarıyla giriş yaptım. Nasıl ilerlediğimi ve hangi kontrollerle sonucu doğruladığımı adım adım anlatayım.

## Sorun nasıl ortaya çıktı?

NFC Tools ile yaptığım ilk denemede donanım tarafında bir sorun görünmüyordu. Ancak e-Devlet üzerinden iki aşamalı giriş işlemini başlattığımda karşıma şu uyarı çıktı:

> NFC ile kimlik doğrulama işlemini yapabilmek için, Xiaomi markalı cihazlarda e-Devlet uygulamasının ayarlarında yer alan Diğer İzinler kısmından NFC iznini açmanız gerekmektedir.

[responsive_img src="/images/edevlet-nfc-hatasi-xl.webp" alt="edevlet-nfc-hatasi" /]
İşin garip tarafı, crDroid'in uygulama izinleri ekranında böyle bir NFC anahtarı bulunmuyordu. Çünkü kullandığım ROM MIUI değildi; e-Devlet'in yönlendirdiği Xiaomi izin yönetimi de sistemde mevcut değildi.
[responsive_img src="/images/edevlet-uygulama-izinleri-xl.webp" alt="edevlet-uygulama-izinleri" /]
Uygulamanın tarif ettiği yol kabaca **Ayarlar → Diğer ayarlar → Diğer izinler → NFC** şeklindeydi. Bu ekrana ulaşamayınca sorunun yalnızca NFC donanımıyla ilgili olmadığını düşünmeye başladım.

Logcat çıktısında uygulamanın açmaya çalıştığı MIUI bileşenleri de görünüyordu:

```text
START ... com.miui.securitycenter/
com.miui.permcenter.permissions.PermissionsEditorActivity
result code=-92

START ... miui.intent.action.APP_PERM_EDITOR
com.miui.securitycenter/
com.miui.permcenter.permissions.AppPermissionsEditorActivity
result code=-92
```

Burada `com.miui.securitycenter` ve `miui.intent.action.APP_PERM_EDITOR` ifadeleri MIUI'nin izin yönetimiyle ilişkili. crDroid üzerinde bu bileşenler bulunmadığından uygulamanın açmaya çalıştığı MIUI ekranına ulaşamıyordum.

Logdaki `result code=-92` değerinin tam olarak hangi iç hata durumunu ifade ettiğini ayrıca doğrulayamadım. Bu nedenle yalnızca bileşen ve Intent adlarından hareketle kesin bir anlam yüklemiyorum.

## NFC izni gerçekten eksik miydi?

İlk şüphelerimden biri, crDroid'in e-Devlet için NFC erişimini kapatmış olmasıydı. Android'in standart uygulama izinleri ekranında NFC seçeneğini bulamayınca bunu ADB ile kontrol ettim.

Önce şu komutu denedim:

```bash
adb shell pm check-permission android.permission.NFC tr.gov.turkiye.edevlet.kapisi
```

Kullandığım ROM'da `pm` bu alt komutu tanımadı ve `Unknown command: check-permission` çıktısını verdi. Bunun yerine paket ayrıntılarını `dumpsys` üzerinden inceledim:

```bash
adb shell dumpsys package tr.gov.turkiye.edevlet.kapisi \
  | grep -i -C 4 'android.permission.NFC'
```

Çıktıda NFC izni şu şekilde görünüyordu:

```text
android.permission.NFC: granted=true
```

Bu bulgu önemliydi: Android'in uygulamaya verdiği standart NFC izni zaten tanımlı ve verilmişti.

Bunun nedeni Android'deki `android.permission.NFC` izninin `normal` koruma seviyesinde olması. Bu izin, kamera veya konum gibi kullanıcının Ayarlar ekranından ayrıca onayladığı tehlikeli çalışma zamanı izinlerinden değil. Android geliştirici belgelerinde NFC izni bu şekilde listeleniyor: [Android Manifest.permission — NFC](https://developer.android.com/reference/android.Manifest.permission#NFC).

Dolayısıyla Ayarlar'da NFC için ayrı bir anahtar görmemem, tek başına NFC izninin verilmediği anlamına gelmiyordu. Ekranda bulunan **Yakındaki cihazlar** izni de NFC izninin karşılığı değildi; bunlar farklı izinler ve kullanım alanları.

## Cihazın MIUI değil, Xiaomi olarak tanınması

Bir sonraki adımda Android'in cihaz özelliklerini kontrol ettim:

```bash
adb shell getprop ro.product.manufacturer
```

Çıktı:

```text
Xiaomi
```

MIUI sürüm özelliğini de kontrol ettim:

```bash
adb shell getprop ro.miui.ui.version.name
```

Bu komut boş çıktı verdi. Yani cihaz üretici olarak Xiaomi şeklinde tanımlanırken MIUI sürüm özelliği mevcut değildi.

Diğer cihaz özelliklerini de listeledim:

```text
ro.product.brand: Redmi
ro.product.device: ruby
ro.product.manufacturer: Xiaomi
ro.product.model: 22101316I
ro.product.name: ruby_in
```

Burada küçük bir ayrıntı var: crDroid'in indirme sayfasında ROM hedefinin kod adı `rubyx` olarak listeleniyor. Yukarıdaki değerler ise cihazda ADB ile okuduğum Android ürün özellikleri. Bunlar farklı amaçlarla kullanılan tanımlamalar; bu nedenle ROM indirme sayfasındaki cihaz kod adıyla sistem özelliklerini birbirine karıştırmamak gerekiyor.

Bu aşamada elimdeki veriler şu tabloyu ortaya çıkardı:

- NFC Tools ile yaptığım ilk okuma testi başarılıydı.
- Telefonun NFC izni Android tarafında verilmişti.
- MIUI izin yöneticisini açmaya çalışan Intent'ler loglarda görünüyordu.
- Sistem, cihaz üreticisini `Xiaomi` olarak bildiriyordu.
- MIUI sürüm özelliği boştu ve ROM crDroid idi.

Bu bulgular, e-Devlet uygulamasının Xiaomi üreticisini görüp MIUI'ye özel izin akışına girmiş olabileceği ihtimalini güçlendirdi. Ancak uygulamanın kaynak koduna erişmeden veya geliştiriciden doğrulama almadan bunun kesin kontrol mekanizması olduğunu söylemek mümkün değil.

Android'in `Build.MANUFACTURER` alanı üretici bilgisini temsil ediyor. AOSP kaynak kodunda bu alanın `ro.product.manufacturer` sistem özelliğinden okunduğu görülebiliyor: [Android Open Source Project — Build.java](https://android.googlesource.com/platform/frameworks/base/+/main/core/java/android/os/Build.java).

## Root yöneticisini ve FolkPatch araçlarını belirlemek

Bu noktada üretici özelliğini geçici olarak değiştirme fikrini değerlendirdim. Önce telefondaki root altyapısını netleştirmem gerekiyordu.

Bu cihazda root işlemini nasıl gerçekleştirdiğimi ayrı bir rehberde anlattım. Redmi Note 12 Pro 5G üzerinde MTKClient ve FolkTool kullanarak yaptığım işlemlerin ayrıntılarına [Redmi Note 12 Pro 5G Root İşlemi: MTKClient ve FolkTool](https://yuceltoluyag.github.io/redmi-note-12-pro-5g-mtkclient-folktool-root/) yazısından ulaşabilirsiniz. Bu yazıda ise root kurulumunu tekrarlamak yerine, mevcut FolkPatch altyapısını kullanarak e-Devlet sorununu nasıl çözdüğüme odaklanacağım.

İlk kontrol:

```bash
adb shell su -c id
```

Çıktı:

```text
uid=0(root) gid=0(root) groups=0(root) context=u:r:magisk:s0
```

İlk bakışta SELinux bağlamındaki `magisk` ifadesi kafa karıştırıcı olabilir. Ancak bu satır tek başına telefonda Magisk uygulamasının kurulu olduğunu kanıtlamıyor; burada görünen ifade sürecin SELinux bağlamı.

Kurulu paketleri aradığımda şu paketi buldum:

```text
package:me.yuki.folk
```

Kullandığım root yöneticisi FolkPatch'ti. FolkPatch'in araç dizinini de kontrol ettim:

```bash
adb shell su -c 'ls -la /data/adb/ap/bin/'
```

Bu dizinde `resetprop` aracı bulunuyordu ve `/data/adb/apd` dosyasına sembolik bağlantı olarak görünüyordu:

```text
resetprop -> /data/adb/apd
```

Aracın yardım çıktısında kendisini "Magisk-compatible system property tool" olarak tanımlaması da tek başına Magisk kurulu olduğu anlamına gelmiyor. FolkPatch kendi APM modül mekanizmasını ve bu mekanizmada sistem özelliklerini uygulamak için `resetprop` aracını kullanıyor. [FolkPatch APM belgelerinde](https://fp.mysqil.com/en/modules/APM/) `system.prop` dosyasının sistem özelliklerini `resetprop` üzerinden uyguladığı ve dosyanın `build.prop` ile aynı `anahtar=değer` biçimini kullandığı açıklanıyor.

## FolkPatch APM ile üretici bilgisini değiştirme testi

İlk denemede cihazın bütün tanımlamasını değiştirmek yerine yalnızca `ro.product.manufacturer` özelliğine müdahale ettim. Redmi markasını, modelini, cihaz kod adını veya ürün adını değiştirmedim.

APM modülü için iki dosya yeterliydi: `module.prop` ve `system.prop`. ZIP paketini Arch Linux bilgisayarımda Python ile oluşturdum:

```bash
python - <<'PY'
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

output = Path.home() / "edevlet-miui-check.zip"

files = {
    "module.prop": """id=edevlet_miui_check
name=e-Devlet MIUI Check Test
version=1.0
versionCode=1
author=friday13
description=Temporary manufacturer property compatibility test
""",
    "system.prop": """ro.product.manufacturer=AOSP
""",
}

with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for filename, content in files.items():
        archive.writestr(filename, content)

print(f"Module created: {output}")
PY
```

Bu komut, ev dizinimde `edevlet-miui-check.zip` dosyasını oluşturdu. Ardından ADB ile telefonun İndirilenler dizinine gönderdim:

```bash
adb push ~/edevlet-miui-check.zip /sdcard/Download/
```

ZIP paketini FolkPatch'in APM modül sistemi üzerinden uyguladım. Modülün içerdiği `system.prop` dosyasındaki tek özellik şuydu:

```ini
ro.product.manufacturer=AOSP
```

## İlk testin sonucu

Değişikliğin sistem özelliğine yansıyıp yansımadığını şu komutla kontrol ettim:

```bash
adb shell getprop ro.product.manufacturer
```

Bu kez çıktı `Xiaomi` değil, şöyleydi:

```text
AOSP
```

Böylece APM üzerinden üretici özelliğinin değiştirilebildiğini doğrulamış oldum. Fakat bu test yalnızca sistem özelliğinin değiştiğini gösteriyordu. e-Devlet'in bu bilgiyi nasıl kullandığını ve NFC doğrulama akışının düzelip düzelmediğini henüz bilmiyordum.

## Bu değişiklik bankacılık uygulamalarını etkileyebilir mi?

Evet, etkileyebilir; ancak hangi uygulamanın nasıl davranacağını yalnızca bu özellik değişikliğine bakarak söyleyemem.

`ro.product.manufacturer` cihaz genelinde bir sistem özelliği. Bu nedenle yalnızca e-Devlet'e özel bir değişiklik değil. Android'in `Build.MANUFACTURER` değerini kullanan uygulamalar üretici bilgisini `AOSP` olarak görebilir. Uygulamaların cihaz uyumluluğu veya üreticiye özgü davranışları bu alana bağlıysa beklenmedik sonuçlar ortaya çıkabilir. Bazı uygulamalar bu değeri hiç kullanmayabilir; bazıları ise başka cihaz bilgilerini ve güvenlik sinyallerini birlikte değerlendirebilir.

Bu nedenle bankacılık uygulamalarının kesinlikle bozulacağını da, hiçbir sorun çıkmayacağını da iddia etmiyorum. Üretici bilgisini global olarak değiştirmek, root veya cihaz bütünlüğü kontrollerini ortadan kaldıran bir yöntem de değil. Sadece Android'in uygulamalara sunduğu üretici alanlarından birini değiştiriyor.

Bu sebeple global APM test modülünü kalıcı çözüm olarak kullanmamaya karar verdim. Modülü devre dışı bıraktım ve yeniden başlatma sonrasında üretici bilgisinin tekrar `Xiaomi` olduğunu kontrol ettim:

```bash
adb shell getprop ro.product.manufacturer
```

Çıktı yeniden:

```text
Xiaomi
```

Böylece cihaz genelindeki değişikliği geri almış oldum. Artık yalnızca e-Devlet uygulamasını etkileyecek bir yöntem arıyordum.

## SpoofMyDevice ile uygulama bazlı üretici bilgisi

Global sistem özelliğini değiştirmek yerine, uygulamanın kendi sürecinde gördüğü cihaz bilgisine müdahale etmek daha mantıklıydı. Bunun için Xposed/LSPosed modülü olarak çalışan [SpoofMyDevice](https://github.com/BuSung-dev/SpoofMyDevice) projesini kullandım.

SpoofMyDevice, farklı uygulamalara ayrı cihaz profilleri atamaya ve profil içindeki cihaz alanlarını bağımsız olarak etkinleştirmeye izin veriyor. Benim ihtiyacım olan da tam olarak buydu: Üretici bilgisini yalnızca e-Devlet için değiştirmek.

Kurulum ve yapılandırma tarafında izlediğim yol şöyleydi:

1. SpoofMyDevice APK'sını telefona kurup uygulamayı bir kez açtım.
2. LSPosed yöneticisinde SpoofMyDevice modülünü etkinleştirdim.
3. Modülün kapsamına yalnızca e-Devlet uygulamasını ekledim.
4. SpoofMyDevice içinde bir profil oluşturdum.
5. Profilde yalnızca **Manufacturer** alanını etkinleştirip değerini `AOSP` yaptım.
6. Oluşturduğum profili e-Devlet uygulamasına atadım.

Burada özellikle dikkat ettiğim nokta, diğer cihaz alanlarını değiştirmemekti. Marka `Redmi`, model `22101316I` ve cihaz kod adı `ruby` olarak kaldı. Ayrıca Android System Framework'ü LSPosed kapsamına eklemedim; müdahalenin sistem geneline yayılmasını istemiyordum.

Bu yapılandırmadan sonra global sistem özelliğini tekrar kontrol ettim:

```bash
adb shell getprop ro.product.manufacturer
```

Çıktı hâlâ:

```text
Xiaomi
```

Bu beklediğim sonuçtu. Çünkü artık sistem genelindeki `ro.product.manufacturer` değerini değiştirmiyordum. SpoofMyDevice, LSPosed üzerinden yalnızca kapsamına alınan uygulamanın sürecinde çalışacaktı.

## LSPosed ve SpoofMyDevice gerçekten çalışıyor mu?

Yalnızca uygulamanın açılması veya profilin atanmış görünmesi benim için yeterli değildi. Değişikliğin e-Devlet sürecine gerçekten yüklendiğini görmek istedim.

Önce e-Devlet'i tamamen kapattım:

```bash
adb shell am force-stop tr.gov.turkiye.edevlet.kapisi
```

Ardından uygulamayı telefondan yeniden açtım ve logcat çıktısını kontrol ettim:

```bash
adb logcat -d -v time | grep -iE \
'SpoofMyDevice|LSPosed|lspd|edevlet'
```

Loglarda ilk olarak LSPosed'in e-Devlet sürecine bağlandığını gördüm:

```text
I/LSPosedFramework:
(tr.gov.turkiye.edevlet.kapisi)
SpoofMyDevice: Loading hooks for tr.gov.turkiye.edevlet.kapisi
```

Bu satır, modülün e-Devlet uygulamasının kendi sürecinde çalışmaya başladığını gösteriyordu.

Ardından yapılandırmanın başarıyla okunduğu bildirildi:

```text
SpoofMyDevice: Config initialized successfully
```

Bir sonraki önemli satır ise şuydu:

```text
SpoofMyDevice: Profile loaded after Application.attach for tr.gov.turkiye.edevlet.kapisi
```

Yani profil, e-Devlet'in uygulama süreci oluşturulurken yüklenmişti.

Üretici ve Build alanlarıyla ilgili hook'lar da loglarda görünüyordu:

```text
DeviceSpoofLab-Build: Build fields and getSerial hooked
SpoofMyDevice: BuildHooks loaded
```

Son olarak modülün bütün hook'ları başlattığını belirten satır geldi:

```text
SpoofMyDevice: All hooks initialized for tr.gov.turkiye.edevlet.kapisi
```

Bu çıktı benim için önemliydi. Artık yalnızca LSPosed'in kurulu olduğunu değil, SpoofMyDevice'ın e-Devlet sürecinde yapılandırmayı yüklediğini ve Build hook'larını başlattığını da görüyordum.

Burada teknik bir ayrıntıyı ayırmak gerekiyor: Loglar hook'ların yüklendiğini doğruluyor; e-Devlet'in okuduğu `Build.MANUFACTURER` değerini doğrudan `AOSP` olarak yazdırmıyor. Dolayısıyla yalnızca log çıktısına bakarak uygulamanın gördüğü değeri kesin olarak ölçtüğümü söylemiyorum. Bunun için asıl önemli kontrol, uygulamanın gerçek kullanım akışını tekrar denemekti.

## Son test: e-Devlet'e başarılı giriş

Yapılandırmayı tamamladıktan sonra e-Devlet uygulamasını yeniden açıp daha önce sorun yaşadığım giriş akışını tekrar denedim.

Bu kez giriş işlemi başarıyla tamamlandı. Önceki denemelerde karşıma çıkan MIUI izin ekranına yönlendirme sorunu artık giriş yapmamı engellemedi.

Böylece elimizde üç ayrı doğrulama bulunuyor:

- **Global sistem özelliği:** `getprop ro.product.manufacturer` çıktısı `Xiaomi` olarak kaldı.
- **Uygulama bazlı hook:** Logcat, SpoofMyDevice profilinin e-Devlet sürecinde yüklendiğini ve Build hook'larının başlatıldığını gösterdi.
- **Gerçek kullanım testi:** Yapılandırma sonrasında e-Devlet'e başarıyla giriş yaptım.

Bu sonuç, benim cihazımda ve kullandığım crDroid yapılandırmasında uygulama bazlı üretici bilgisi değişikliğinin sorunu aşmamı sağladığını gösteriyor. Ancak farklı ROM sürümlerinde, e-Devlet uygulama sürümlerinde veya farklı cihazlarda aynı sonucun alınacağını garanti edemem.

## Sonuç

Başlangıçta NFC donanımından şüphelenmiştim. NFC Tools ile yaptığım ilk okuma testi donanımın çalıştığını gösterdi. Ardından ADB ile yaptığım incelemede Android'in standart NFC izninin zaten `granted=true` olduğunu gördüm. Asıl dikkat çeken nokta, e-Devlet'in crDroid üzerinde bulunmayan MIUI izin yöneticisini açmaya çalışmasıydı.

FolkPatch APM ile üretici bilgisini global olarak `AOSP` yapmak ilk denememdi. Ancak bu değişiklik tüm uygulamaları etkileyebileceği için günlük kullanımda bırakmak istemedim. SpoofMyDevice ve LSPosed sayesinde aynı müdahaleyi yalnızca e-Devlet uygulamasına uygulayabildim.

Benim açımdan en iyi tarafı, sistemin geri kalanını değiştirmek zorunda kalmamaktı. Diğer uygulamalar cihazın gerçek üretici bilgisini görmeye devam ederken e-Devlet için ayrı bir profil kullanabildim.

Bu yazıdaki yöntem, MIUI izin yöneticisini crDroid'e kurmuyor veya NFC donanımını değiştirmiyor. Yalnızca uygulamanın gördüğü cihaz bilgisini uygulama bazında değiştiriyor. Benim yaşadığım sorunda işe yarayan yaklaşım bu oldu.
[responsive_img src="/images/edevlet-kimlikle-dogrulama-xl.webp" alt="edevlet-nfc-cozumu" /]
## Kaynaklar

- [e-Devlet — İki Aşamalı Giriş ve NFC ile Kimlik Doğrulama](https://www.turkiye.gov.tr/bilgilendirme?altKonu=nfc&konu=ikiAsamaliGiris)
- [Android Developers — Manifest.permission.NFC](https://developer.android.com/reference/android.Manifest.permission#NFC)
- [Android Open Source Project — Build.java](https://android.googlesource.com/platform/frameworks/base/+/main/core/java/android/os/Build.java)
- [FolkPatch — AndroidPatch Module (APM) belgeleri](https://fp.mysqil.com/en/modules/APM/)
- [SpoofMyDevice — GitHub deposu](https://github.com/BuSung-dev/SpoofMyDevice)
- [crDroid — Redmi Note 12 Pro / Pro Plus 5G (rubyx)](https://crdroid.net/rubyx/12)