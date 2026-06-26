Title: Boşta Yatan Ekran Kartını Değerlendirmek: Nvidia VRAM'i Linux'ta Swap Yapmak (nbd-vram)
Date: 2026-06-26 03:32
Category: Donanım
Tags: Nvidia, VRAM, Swap, Linux, Donanım, Cuda, NBD
Slug: nvidia-vram-swap-alani-nbd-vram
Authors: yuceltoluyag
Status: published
Summary: Nvidia ekran kartınızın boşta yatan VRAM belleğini, NBD (Network Block Device) ve CUDA yardımıyla Linux üzerinde nasıl yüksek öncelikli takas (swap) alanı olarak yapılandırabileceğinizi inceliyoruz.
Template: article
Lang: tr
Translation: false

Geçen gün gece yarısı çalışma masamda, bizim emektar hibrit grafik kartlı laptopun (AMD işlemci + Nvidia GPU) kaynak tüketimini inceliyordum. Ekranı AMD kartı sürdüğü için, o canım Nvidia GPU orada öylece melül melül yatıyor, VRAM'i bomboş duruyordu. Laptopta RAM anakarta lehimli olduğu için donanım yükseltme şansım da yok. Kendi kendime "Ulan şu boşta duran ekran kartı belleğini swap (takas) alanı olarak kullanabilsek ne güzel olurdu" diye düşünürken, GitHub'ın o karanlık dehlizlerinde önüme dumanı üstünde taptaze bir proje düştü: **nbd-vram**.

!!! warning "Kritik Uyarı: Sorumluluk Tamamen Sende! ⚠️"
    Hemen en baştan kalın harflerle uyarayım dostum: Bu proje henüz çok yeni ve tamamen deneysel. Sisteminize kurup denemeden önce mutlaka kritik verilerinizi yedekleyin. Sorumluluk tamamen sende! Ben sadece bu çılgın repoyu keşfettim ve nasıl çalıştığını kurcaladım.

Boşta yatan ekran kartı belleğini takas alanı olarak kullanmak, evde hiç kullanılmayan o süslü misafir odasını kiler yapıp ana odalardaki yükü hafifletmeye benzer. Eğer böyle deneysel bir maceraya hazırsan dostum, gelin bu sistemin arkasındaki o kurnaz mühendislik detaylarına ve kurulumuna yakından bakalım.

---

## 🛠️ NBD-VRAM Nasıl Çalışır?

Nvidia ekran kartının belleğini doğrudan CPU'nun kullanımına açmak için normalde Nvidia P2P API'si (fiziksel bellek sayfalarını ioremap aracılığıyla haritalama) denenir. Ancak Nvidia, son tüketiciye satılan GeForce ekran kartlarında bu API'yi sürücü düzeyinde kısıtlıyor. Çözüm sadece profesyonel Quadro veya veri merkezi kartlarında çalışıyor. 

İşte `nbd-vram` bu engeli aşmak için çok akıllıca bir yöntem kullanıyor:

1.  Arka planda çalışan küçük bir servis (daemon), standart CUDA sürücü API'sini kullanarak VRAM üzerinde bir alan ayırır (CUDA kısıtlamasız her kartta çalışır).
2.  Bu servis, ayırdığı VRAM alanını NBD (Network Block Device)[^1] protokolünü kullanarak yerel bir Unix soketi üzerinden sanal bir disk olarak sunar.
3.  Linux çekirdeğinin içinde hazır bulunan `nbd` modülü bu sokete bağlanır ve işletim sistemine `/dev/nbd0` adında normal bir disk gibi tanıtır.
4.  Geriye sadece bu diski standart `mkswap` ve `swapon` komutlarıyla takas alanı olarak aktif etmek kalır.

Tüm bu süreç boyunca hiçbir özel çekirdek modülü yazmaya gerek kalmaz. Çekirdek güncellense bile kodun yeniden derlenmesi gerekmez.

---

## 🏗️ Adım Adım Kurulum

Tekrar hatırlatıyorum; bu işlem deneyseldir. Denemek istiyorsanız gerekli paketleri (Nvidia sürücüsü, `nbd-client`, `gcc` ve `make`) kurduktan sonra şu komutları çalıştırabilirsiniz:

```bash
$ git clone https://github.com/c0dejedi/nbd-vram
$ cd nbd-vram
$ sudo ./install.sh
```

Kurulum betiği (`install.sh`), işlemci çekirdek sayınıza göre servis dosyalarını ve bağlantı iş parçacıklarını otomatik yapılandıracaktır. Servisi başlatmak için:

```bash
$ sudo systemctl start vram-swap-nbd
```

Kurulumun başarılı olduğunu doğrulamak için aktif swap alanlarını sorgulayabilirsiniz:

```bash
$ swapon --show
```

Eğer çıktıda `/dev/nbd0` adında, belirlediğiniz boyutta bir takas alanı görüyorsanız işlem tamamdır.

---

## 🔒 Güvenlik ve Kilitlenme (Deadlock) Koruması

Bir sistemi tamamen takas alanı üzerinden koştururken, RAM sıfıra indiğinde arka plandaki NBD servisinin de işletim sistemi tarafından diske yazılmaya çalışılması (paging) tam bir kilitlenme (deadlock) kısırdöngüsü oluşturur. 

`nbd-vram` bu durumu önlemek için iki önemli Linux güvenlik ve bellek mekanizmasını kullanıyor:

*   **mlockall:[^2]** Servis kendi kullandığı belleği `mlockall` çağrısıyla fiziksel RAM'e kilitler. Böylece çekirdek, servisin kendi kodunu asla diskteki takas alanına yazmaya çalışamaz.
*   **PR_SET_IO_FLUSHER:** Servis, kendisini çekirdeğe bir "G/Ç temizleyici" (IO Flusher) olarak kaydeder. Bu sayede RAM tamamen bittiğinde bile sistemin kilitlenmesini engeller.
*   **OOMScoreAdjust=-1000:** Çekirdeğin RAM bittiğinde servisi sonlandırmasını (OOM Killer) önlemek için servisin önceliği en üst düzeye çekilir.

---

## ⚡ Güç Yönetimi ve Oyun Oynarken Ne Olacak?

Servis kurulurken size AC gücünden çıkıldığında (pil modunda) swap alanını otomatik devreden çıkarıp çıkarmayacağını sorar. Pil tasarrufu için bunu aktif etmek mantıklıdır.

Ekran kartını oyun oynamak veya yapay zeka modelleri koşturmak için kullanacağınızda ise iki seçeneğiniz var: ya `/etc/systemd/system/vram-swap-nbd.service` dosyasından `VRAM_SETUP_SIZE_MB` değerini düşürerek ekran kartına pay bırakacaksınız, ya da ağır bir işe girmeden önce servisi manuel olarak durduracaksınız:

```bash
$ sudo systemctl stop vram-swap-nbd
```

Servis durdurulduğunda, VRAM içindeki veriler güvenli bir şekilde normal RAM'e veya diske geri taşınır.

## 🔗 İlgili Yazılar
- [Yerel LLM'ler İçin En İyi Ekran Kartları (2026)](/yerel-llmler-icin-en-iyi-gpu-2026/)
- [Docker'da Node.js Konteynerlerini Root Olmadan Çalıştırmak](/docker-node-js-root-olmadan-calistirmak/)

[^1]: Network Block Device; bir depolama alanını ağ üzerinden veya yerel unix soketleriyle blok cihazı olarak sunan Linux çekirdek protokolüdür.
[^2]: Fiziksel bellek sayfalarını RAM'e kilitleyerek, çekirdeğin o sayfaları takas alanına (swap) yazmasını engelleyen Linux sistem çağrısıdır.
