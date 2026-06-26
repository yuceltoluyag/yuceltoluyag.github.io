Title: Instagram Toplu Yorum ve Beğeni Silme Rehberi
Date: 2026-05-31 09:30
Category: Otomasyon
Tags: Instagram, JavaScript, Otomasyon, Tarayıcı Konsolu
Slug: instagram-toplu-yorum-ve-begeni-silme-rehberi
Authors: yuceltoluyag
Status: published
Summary: Instagram geçmişini temizlemek isteyenler için Bloks UI engelini aşan, tarayıcı konsolunda çalışan pratik JavaScript otomasyon rehberi.
Template: article
Lang: tr
Translation: false

Geçen gün bilgisayarımdaki eski arşivleri karıştırırken gözüm yıllar önce yazdığım o meşhur Instagram botunun kodlarına ve o dönem çektiğim demo videosuna [^1] takıldı. O zamanlar Instagram'ın toplam üye sayısı zaten topu topu 2 milyon falandı, bizim bot da sağ olsun 1.9 milyonuna bizzat dokundu 😂 İşin komik tarafı, o dönem bot kullanan herkes çatır çatır ban yerken bana merakla soruyordu: "Ulan herkes banlanırken sen nasıl ban yemiyorsun?" diye 😎 O dönem botu Selenium'dan çıkarıp mobil cihazlarda UI Automator ile çalışacak seviyeye getirmiştim. 📱


<script async src="//www.instagram.com/embed.js"></script>

Yıllar geçti ama Instagram'ın kullanıcıya eziyet etme politikası pek değişmedi. 🤦‍♂️ Yıl olmuş 2026, koca platformda toplu işlemlerin hiçbirini düzgün yapamıyorsunuz; her etkileşimi tek tek elle silmek ve düzenlemek zorundasınız. Sosyal medyayı ayda yılda bir kullanan, kenarda köşede üç beş etkileşimi olan biri gibi davranıyorlar bize. Instagram'ın kendi arayüzünde binlerce yorumu tek tek seçip silmeye çalışmak, kaşıkla okyanusu boşaltmaya benziyor. 🥄🌊

İnternette bu toplu silme işini gerçekleştiren tarayıcı eklentileri var ve bunları 20 euro gibi fiyatlardan satıyorlar. 💸 Ben ise bu rehberde aynı işi gören JavaScript kodlarını dostum, sana bedavadan biraz daha pahalıya (yani tamamen ücretsiz) sunuyorum 😂

Bu kod sayesinde neredeyse 1 günde kendi hesabımı tertemiz ettim. ✨ Aslında Instagram başta gözümü korkutmuştu. Eskiden profilimi temizlemeye yeltendiğimde "Çok fazla aynı şeyi yapıyorsun" diyerek 1 gün boyunca engel koyuyor, hesabın bazı temel işlevlerini bozuyordu. 🚫 Ancak bu yöntemle şu ana kadar on binlerce yorum ve beğeniyi sorunsuzca sildim, tek bir uyarı bile almadım. Bunun sırrı, silme ve beğeniyi geri çekme işlemlerinde tek seferde seçilecek adeti (`MAX` değerini) en fazla 20 seviyesinde tutmam oldu.

---

## 💡 Neden Standart Tıklama Yöntemleri Çalışmıyor?

Instagram, arayüzünde klasik HTML elementleri yerine **Bloks** adı verilen dinamik bir yapı kullanıyor. Bu yapı, doğrudan JavaScript'teki `element.click()` gibi standart tetikleyicileri güvenlik amacıyla görmezden gelir. 

Ben bu sorunu aşmak için `realClick` adında özel bir fonksiyon tasarladım. Bu fonksiyon, tarayıcıya "buraya gerçekten bir insan tıklıyor" sinyali göndermek için `mousedown`, `mouseup` ve `click` pointer event'lerini sırayla ve gerçekçi zamanlamalarla tetikliyor. Bu sayede platformun güvenlik mekanizmalarına takılmadan elemanları otomatik seçebiliyoruz.

---

## 🛠️ Hazırlık ve Dikkat Edilmesi Gerekenler

Betiği çalıştırmadan önce şu kritik kurallara dikkat etmemiz gerekiyor:

!!! warning
    **Dil Ayarı Zorunluluğu:** Instagram hesabınızın arayüz dili mutlaka **İngilizce (English)** olmalıdır. Betikler butondaki "Select", "Delete" ve "Unlike" metinlerini arayarak çalıştığı için Türkçe arayüzde butonları bulamaz ve durur.

Betiği çalıştırmak istediğiniz etkileşim türüne göre ilgili sayfaya gitmeniz son derece önemlidir. Hangi sekmede çalıştığınız bu kodların doğruluğunu belirler:

*   **Beğeniler (Likes) Sayfası:** [Likes](https://www.instagram.com/your_activity/interactions/likes){: target="_blank" rel="noopener noreferrer"}
*   **Yorumlar (Comments) Sayfası:** [Comments](https://www.instagram.com/your_activity/interactions/comments){: target="_blank" rel="noopener noreferrer"}
*   **Repostlar Sayfası:** [Reposts](https://www.instagram.com/your_activity/interactions/reposts){: target="_blank" rel="noopener noreferrer"}
*   **Hikaye Yanıtları Sayfası:** [Story Replies](https://www.instagram.com/your_activity/interactions/story_replies){: target="_blank" rel="noopener noreferrer"}
*   **Değerlendirmeler Sayfası:** [Reviews](https://www.instagram.com/your_activity/interactions/reviews){: target="_blank" rel="noopener noreferrer"} [^2]

1. Bilgisayarınızdan Instagram web sürümünü açın ve giriş yapın.
2. Silmek istediğiniz etkileşim türüne göre yukarıdaki bağlantılardan uygun sayfaya gidin.
3. Tarayıcınızda sağ tıklayıp **İncele (Inspect)** deyin veya `F12` tuşuyla geliştirici konsolunu (Console) açın.

!!! tip
    **Konsol Engeli Çözümü:** Eğer tarayıcınız konsola kod yapıştırmanızı engelliyorsa, konsol satırına `allow pasting` yazıp Enter tuşuna basın. Ardından betiği tekrar yapıştırmayı deneyin.

---

## 📝 1. Yorumlar, Paylaşımlar, Hikaye Yanıtları ve Değerlendirmeler İçin Silme Betiği

Aşağıdaki betik; yorumlarınızı, repostlarınızı, hikaye yanıtlarınızı ve değerlendirmelerinizi (reviews) toplu olarak silmek için kullanılır. Kodu kopyalayıp konsola yapıştırmanız ve Enter tuşuna basmanız yeterlidir.

```javascript
/**
 * Instagram Toplu Etkileşim Silme Betiği
 * Yorumlar, Repostlar, Hikaye Yanıtları ve Değerlendirmeler için.
 */
(async function instagramBulkDelete() {
  window.__STOP_IG_BULK_DELETE__ = false;

  // Güvenliğiniz için tek seferde silinecek adeti düşük tutun
  const MAX = 10; 
  const CYCLE_DELAY = 20000; // Çevrimler arası bekleme süresi (ms)
  const SELECT_DELAY = 1200;
  const ICON_DELAY = 700;
  const DELETE_DELAY = 1500;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Gerçek tıklama simülasyonu
  function realClick(element) {
    element.scrollIntoView({ block: "center" });

    ["mousedown", "mouseup", "click"].forEach((eventType) => {
      element.dispatchEvent(
        new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
    });
  }

  function findSelectButton() {
    return [
      ...document.querySelectorAll(
        'div[data-bloks-name="bk.components.Flexbox"]',
      ),
    ].find((el) => el.innerText?.trim() === "Select");
  }

  async function activateSelectMode() {
    const selectBtn = findSelectButton();
    if (!selectBtn) {
      throw new Error("Select butonu bulunamadı.");
    }
    realClick(selectBtn);
    await sleep(SELECT_DELAY);
  }

  function getSelectableIcons() {
    return document.querySelectorAll(
      'div[data-bloks-name="ig.components.Icon"][style*="circle__outline"]',
    );
  }

  async function selectComments(max) {
    const icons = getSelectableIcons();
    if (!icons.length) {
      return 0;
    }

    let selected = 0;
    for (const icon of icons) {
      if (selected >= max) break;

      icon.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(400);

      const button = icon.closest('[role="button"]');
      if (!button) continue;

      realClick(button);
      selected++;
      await sleep(ICON_DELAY);
    }
    return selected;
  }

  function findBloksDeleteButton() {
    const deleteText = [
      ...document.querySelectorAll(
        'span[data-bloks-name="bk.components.TextSpan"]',
      ),
    ].find((span) => span.innerText?.trim() === "Delete");

    if (!deleteText) return null;
    return deleteText.closest('div[style*="pointer-events: auto"]');
  }

  async function clickBloksDelete() {
    await sleep(SELECT_DELAY);
    const deleteBtn = findBloksDeleteButton();
    if (!deleteBtn) {
      throw new Error("Bloks Delete butonu bulunamadı.");
    }
    realClick(deleteBtn);
  }

  function findModalDeleteButton() {
    return [...document.querySelectorAll("button")].find(
      (btn) => btn.innerText?.trim() === "Delete",
    );
  }

  async function confirmFinalDelete() {
    await sleep(DELETE_DELAY);
    const modalDeleteBtn = findModalDeleteButton();
    if (!modalDeleteBtn) {
      throw new Error("Onaylama butonu bulunamadı.");
    }
    modalDeleteBtn.focus();
    await sleep(100);
    modalDeleteBtn.click();
  }

  let cycle = 1;
  while (!window.__STOP_IG_BULK_DELETE__) {
    try {
      await activateSelectMode();
      const deletedCount = await selectComments(MAX);

      if (!deletedCount) {
        console.log("Silinecek etkileşim kalmadı.");
        break;
      }

      await clickBloksDelete();
      await confirmFinalDelete();

      console.log(`Çevrim ${cycle}: ${deletedCount} adet öge silindi.`);
      cycle++;

      await sleep(CYCLE_DELAY);
    } catch (error) {
      console.warn("İşlem durduruldu:", error.message);
      break;
    }
  }
})();
```

---

## 🖤 2. Beğenileri Geri Çekme (Unlike) Betiği

Beğendiğiniz gönderileri toplu olarak beğenmekten vazgeçmek (unlike yapmak) istiyorsanız butonların isim yapısı değişiyor. Testlerimi yaparken buton isimlerinin "Unlike" olarak güncellenmesi gerektiğini fark ettim. Likes sekmesinde bu kodu kullanabilirsiniz:

```javascript
/**
 * Instagram Toplu Beğeni Kaldırma Betiği
 * Sadece Beğeniler (Likes) sekmesi için.
 */
(async function instagramBulkUnlike() {
  window.__STOP_IG_BULK_DELETE__ = false;

  const MAX = 20; 
  const CYCLE_DELAY = 20000; 
  const SELECT_DELAY = 1200;
  const ICON_DELAY = 700;
  const DELETE_DELAY = 1500;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function realClick(element) {
    element.scrollIntoView({ block: "center" });

    ["mousedown", "mouseup", "click"].forEach((eventType) => {
      element.dispatchEvent(
        new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
    });
  }

  function findSelectButton() {
    return [
      ...document.querySelectorAll(
        'div[data-bloks-name="bk.components.Flexbox"]',
      ),
    ].find((el) => el.innerText?.trim() === "Select");
  }

  async function activateSelectMode() {
    const selectBtn = findSelectButton();
    if (!selectBtn) {
      throw new Error("Select butonu bulunamadı.");
    }
    realClick(selectBtn);
    await sleep(SELECT_DELAY);
  }

  function getSelectableIcons() {
    return document.querySelectorAll(
      'div[data-bloks-name="ig.components.Icon"][style*="circle__outline"]',
    );
  }

  async function selectComments(max) {
    const icons = getSelectableIcons();
    if (!icons.length) {
      return 0;
    }

    let selected = 0;
    for (const icon of icons) {
      if (selected >= max) break;

      icon.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(400);

      const button = icon.closest('[role="button"]');
      if (!button) continue;

      realClick(button);
      selected++;
      await sleep(ICON_DELAY);
    }
    return selected;
  }

  function findBloksDeleteButton() {
    const deleteText = [
      ...document.querySelectorAll(
        'span[data-bloks-name="bk.components.TextSpan"]',
      ),
    ].find((span) => span.innerText?.trim() === "Unlike");

    if (!deleteText) return null;
    return deleteText.closest('div[style*="pointer-events: auto"]');
  }

  async function clickBloksDelete() {
    await sleep(SELECT_DELAY);
    const deleteBtn = findBloksDeleteButton();
    if (!deleteBtn) {
      throw new Error("Bloks Unlike butonu bulunamadı.");
    }
    realClick(deleteBtn);
  }

  function findModalDeleteButton() {
    return [...document.querySelectorAll("button")].find(
      (btn) => btn.innerText?.trim() === "Unlike",
    );
  }

  async function confirmFinalDelete() {
    await sleep(DELETE_DELAY);
    const modalDeleteBtn = findModalDeleteButton();
    if (!modalDeleteBtn) {
      throw new Error("Onaylama butonu bulunamadı.");
    }
    modalDeleteBtn.focus();
    await sleep(100);
    modalDeleteBtn.click();
  }

  let cycle = 1;
  while (!window.__STOP_IG_BULK_DELETE__) {
    try {
      await activateSelectMode();
      const deletedCount = await selectComments(MAX);

      if (!deletedCount) {
        console.log("Geri çekilecek beğeni kalmadı.");
        break;
      }

      await clickBloksDelete();
      await confirmFinalDelete();

      console.log(`Çevrim ${cycle}: ${deletedCount} adet beğeni kaldırıldı.`);
      cycle++;

      await sleep(CYCLE_DELAY);
    } catch (error) {
      console.warn("İşlem durduruldu:", error.message);
      break;
    }
  }
})();
```

---

## 🛠️ Olası Sorunlar ve Çözümleri

*   **Instagram Engeli (Action Limit):** Betik çalışırken Instagram geçici işlem engeli koyabilir. Bu durumda konsolda istek hataları görmeye başlarsınız. Çözüm olarak koddaki `CYCLE_DELAY` değerini `30000` (30 saniye) veya daha yukarısına çekin, `MAX` değerini ise `5` gibi küçük seviyelerde tutun. Eğer engel yediyseniz, ilk etapta bir 8 saat dinlenmeye çekilin. 8 saat sonra hâlâ engel devam ediyorsa, hesabın tamamen kendine gelmesi için 24 saat geçmesini beklemeniz gerekir.
*   **Buton Bulunamadı Hatası:** Sayfa henüz tam yüklenmemiş olabilir veya dil ayarınız İngilizce değildir. Sayfayı yenileyip dilin İngilizce olduğundan emin olduktan sonra kodu tekrar çalıştırın.
*   **Betiği Durdurmak İstiyorum:** Konsola aşağıdaki kodu yapıştırıp çalıştırabilirsiniz. Ya da hiç kodla uğraşmak istemiyorsanız, doğrudan tarayıcı sayfasını yenileyerek (F5 atarak) betiği anında durdurabilirsiniz :)
    ```javascript
    window.__STOP_IG_BULK_DELETE__ = true;
    ```

Eğer mobil uygulama tarafında klavye ile ilgili can sıkıcı bir görsel problem yaşıyorsanız, daha önce hazırladığım [Instagram’da Klavye Yorum Kutusunun Üzerini Kapatıyorsa Ne Yapmalısınız?](/instagram-klavye-yorum-kutusu-sorunu/) rehberime de göz atabilirsiniz.

Eğer sen de geçmişini temizlemek istiyorsan dostum, yukarıdaki betikleri tarayıcı konsolunda çalıştırarak bu dertten zahmetsizce kurtulabilirsin. Yorumlarda deneyimlerini paylaşmayı unutmayın!

[^1]: Bahsettiğim o eski demo videosunu merak edenler [Instagram gönderime](https://www.instagram.com/p/CEOCOVTjnLo/){: target="_blank" rel="noopener noreferrer"} göz atabilir.
[^2]: Tüm etkileşim sayfalarına Instagram web sürümünde sol menüdeki "Your activity" panelinden de ulaşabilirsiniz.
