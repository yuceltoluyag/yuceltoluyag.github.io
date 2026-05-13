Title: GPU Soğutmasında Sıvı Metal Kullanımı ve Dikkat Edilmesi Gerekenler
Date: 2025-05-07 12:00
Modified: 2025-08-11 22:59
Category: Donanım
Tags: sıvı metal, gpu soğutma, alüminyum reaksiyonu, thermal macun, gpu modifikasyonu
Slug: gpu-sogutmasinda-sivi-metal-kullanimi-ve-dikkat-edilmesi-gerekenler
Authors: yuceltoluyag
Status: published
Summary: GPU soğutmasında sıvı metal kullanımı hakkında bilmeniz gereken her şey. Alüminyum reaksiyonları, doğru yüzey seçimi, malzeme önerileri ve detaylı uygulama rehberi.
Template: article
Image: images/rtx-4060-sivi-metal-xl.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/114988983481909917
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtfq25nrk2o

!!! warning "<strong>Dikkat:</strong> Sıvı metal kullanımı doğru yapılırsa GPU'nuzda %10-20'ye kadar sıcaklık iyileştirmesi sağlayabilirsiniz. Ancak yanlış bir adım tüm kartınızı geri dönüşümsüz şekilde bozabilir. Riski yüksek bir işlem,buna göre düşünün.Sorumluluk size aittir."

## GPU Soğutmasında Sıvı Metal Kullanımı ve Dikkat Edilmesi Gerekenler

GPU'ların daha serin ve verimli çalışması için sıvı metal kullanımı oldukça popüler hale geldi. Ancak yanlış uygulama, özellikle alüminyum yüzeylerde ciddi sorunlara yol açabiliyor. Bu rehberde, **sıvı metal ile GPU soğutma blokları üzerinde nasıl güvenli ve etkili çalışabileceğinizi** adım adım anlatacağım.

## Alüminyum ile Sıvı Metalin Tehlikeli Etkileşimi

Eğer sıvı metal alüminyum ile temas ederse (örneğin bir GPU soğutma bloğunda), içerisindeki **galyum** elementi nedeniyle alüminyum yüzey hızlıca **tortu haline gelir, parçalanır ve toz olur**.
Bu **galyum-alüminyum reaksiyonu** ciddi hasara neden olabilir!

- 🔗 Reaksiyon Parçalanma Videosu
<script type="module" src="https://cdn.jsdelivr.net/npm/@justinribeiro/lite-youtube@1/lite-youtube.min.js"></script>

<lite-youtube videoid="z3Fm30T9kJ8"></lite-youtube>

Bu yüzden sıvı metal uygularken kesinlikle yüzeyin **alüminyum olmadığından** emin olun.

## Doğru Yüzey Seçimi: Nikel ve Bakır

- **Nikel** ve **Bakır** yüzeylerde sıvı metal sorunsuz kullanılabilir.
- Birçok GPU'da çekirdek bloğu bakır veya nikel kaplamalı olur.

### Yüzey Malzemesini Nasıl Anlarsınız?

- **Alüminyum** resmi:
  [responsive_img src="/images/alimunyum-xl.webp" alt="Alüminyum" /]

- **Nikel** resmi:

  [responsive_img src="/images/hurda-nikel-bursada-xl.webp" alt="Nikel Resmi" /]

### Pratik Yöntem: Mıknatıs Testi

- **Mıknatıs nikeli çeker**.
- **Alüminyum ve bakır** mıknatısla çekilmez.

Bu basit testle hangi malzeme üzerinde çalıştığınızı anlayabilirsiniz.

---

## Kullanılacak Malzemeler ve Özellikleri

| Ürün                             | Isı İletkenliği (W/m-K) | Yoğunluk (g/cm³) | Maks. Isı Direnci (°C) | Viskozite  |
| :------------------------------- | :---------------------- | :--------------- | :--------------------- | :--------- |
| **Thermal Grizzly Hydronaut**    | 11.8                    | 2.6              | 350°C                  | 1900 puaz  |
| **Thermal Grizzly Conductonaut** | 73                      | 6.24             | 140°C                  | 0.021 puaz |

🔗 Hydronaut (26gr - xxx TL): [Ürün Linki](https://www.pazarama.com/thermal-grizzly-hydronaut-26gr-yuksek-performansli-termal-macun-p-4260711990328?magaza=think24&utm_source){: target="\_blank" rel="noopener noreferrer"}
🔗 Conductonaut (1gr - xxx TL): [Ürün Linki](https://www.teknobiyotik.com/thermal-grizzly-1gr-conductonaut-liquid-metal-termal-macun-tg-c-001-r.html?ref){: target="\_blank" rel="noopener noreferrer"}

### Isı İletkenlik Değerleri

- **Bakır**: 413 W/m-K
- **Çinko**: 116 W/m-K
- **Pirinç** (Bakır + Çinko karışımı): Arasında bir değer.

ℹ️ **Isı iletim** W/m-K birimiyle ifade edilir. **Viskozite** ise akışkanlığa karşı dirençtir.

---

## Gerekli Ekstra Malzemeler

- **1.5 MM Kalın Pul**:

  - Materyal: Bakır alaşımlı sarı (pirinç)
  - 100 gramda yaklaşık 51 adet → 180 TL
  - [Ürün Linki](https://www.erturkmetalaksesuar.com/15x12-mm-yuvarlak-tek-delik-duz-kalin-pul-ham-pirinc){: target="\_blank" rel="noopener noreferrer"}

- **0.5 MM Kaplamasız Bakır Tel (20 Metre)**:

---

## Malzeme Toplam Maliyeti(Fiyatlar ve Stok Tarihe Göre Değişebilir)

| Ürün                        | Fiyat   |
| :-------------------------- | :------ |
| 26gr Hydronaut Macun        | 1200 TL |
| 1gr Conductonaut Sıvı Metal | 439 TL  |
| 51 Adet Pul                 | 180 TL  |
| 20 Metre Bakır Tel          | 125 TL  |

**Toplam:** 1.944 TL

---

## Adım Adım GPU'ya Sıvı Metal Uygulama Rehberi

Bu bölümde işlemleri tek tek numaralandırıyoruz:

## 1. GPU Blok Demontajı

- PC üzerinde GPU bloğunu kaldırın.
- Fan pinlerini, varsa ARGB pinlerini çıkarın.
- PCB'yi, VRAM padlerini ve çip üzerindeki eski termal macunu dikkatlice temizleyin.
- Soğutma bloğunu sökün ve diş fırçasıyla temizleyin.
- Fanların plastik cover'ını hava ile temizleyin.

## 2. Kenar Bantlama

- GPU çip kenarına ve tüm VRAM çiplerinin dışına şeffaf sarı bant çekin.
- Amaç: Sıvı metal taşması veya dökülmesi olursa kısa devreyi önlemek.

## 3. Sıvı Metal ve Termal Macun Uygulaması

- Çipe az miktarda sıvı metal damlatın ve üzerine Hydronaut macun sıkın.
- Bir spatula ile çip üzerinde karıştırarak ince bir katman oluşturun.

## 4. VRAM Üzerine Pul Montajı

- VRAM'lere az sıvı metal + Hydronaut karışımı sürün.
- Her VRAM'in üzerine 1.5 MM kalınlıkta pul yerleştirin.
- Pulların üzerine yine az sıvı metal ve Hydronaut karışımı uygulayın.

## 5. VRM ve Diğer Alanlar İçin Ekstra Destek

- Fabrika çıkışındaki VRM, mosfet, kapasitör gibi bölgelere Hydronaut sürün.
- Üzerine uygun boyutta pad yerleştirin.
  **Sakın sıvı metal kullanmayın!**

## 6. Yeniden Montaj

- Fanları plastik kalıba takın.
- Soğutma bloğunu plastik cover'a vidalayın.
- GPU bloğunu PCB'ye dikkatlice yerleştirip fan ve ARGB pinlerini takın.
- Çarpraz şekilde bloğu sıkıca vidalayın.
- Soğutma bloğunun çekirdeğe ve VRAM'lere tam temas ettiğinden gözle kontrol edin.

## [responsive_img src="/images/rtx-4060-sivi-metal-xl.webp" alt="4060 sıvı metal" /]

## Sonuç

Sıvı metal kullanımı doğru yapılırsa GPU'nuzda **%10-20'ye kadar sıcaklık iyileştirmesi** sağlayabilirsiniz. Ancak yanlış bir adım tüm kartınızı **geri dönüşümsüz şekilde bozabilir**.

Bu rehberi adım adım uygularsanız, en yüksek performansı güvenli bir şekilde elde edebilirsiniz.
Unutmayın: **Alüminyum yüzeylerde sıvı metal kullanmayın!**

---



