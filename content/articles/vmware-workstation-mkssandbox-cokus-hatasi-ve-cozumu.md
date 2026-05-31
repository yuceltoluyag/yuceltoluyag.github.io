Title: VMware Workstation mksSandbox Çöküş Hatası ve Çözümü
Date: 2026-05-24 07:45
Modified: 2026-05-24 20:40
Category: Sorun Giderme
Tags: vmware, mkssandbox, isbrenderercomm, sanal-makine, linux, windows, gpu, nvidia
Slug: vmware-workstation-mkssandbox-cokus-hatasi-ve-cozumu
Authors: yuceltoluyag
Status: published
Summary: VMware Workstation üzerinde çalışırken aniden karşınıza çıkan mksSandbox veya ISBRendererComm bağlantı kaybı hatasının nedenlerini inceliyor ve adım adım çözüm yollarını anlatıyoruz.
Template: article
Image: images/vmware-workstation-mkssandbox-cokus-hatasi-ve-cozumu-lg.webp
Lang: tr
Translation: false
toot: https://mastodon.social/@yuceltoluyag/116668648379106647
bluesky: https://bsky.app/profile/did:plc:lu4xdq66ovwpakyavsmdvqbc/post/3mn5d6kktdk2a

Geçen gün bilgisayar başında, arkada simit-ayran eşliğinde Docker konteynerleriyle boğuşuyorum. Windows 11 kurulu ana makinede (Ryzen işlemci, altında Nvidia RTX kart canavar gibi çalışıyor) Laravel projesi için ayağa kaldırdığım Ubuntu sanal makinesinde veritabanı taşımalarını (migrations) yazıyorum. Tam terminale uzunca bir komut yapıştırdım, "Enter"a basacağım, o da ne? Ekran dondu. Ardından karşımda şu meşhur, insanın asabını bozan kutucuk belirdi:

> **VMware Workstation unrecoverable error: (mks)**
> ISBRendererComm: Lost connection to mksSandbox (3796)

Hacı bura çok kritik, çünkü o an ne yapıyorsan hepsi çöp oldu. Sanal makine pat diye kapandı.

İlk refleks olarak, tipik bir Arch/Linux kullanıcısı paranoyasıyla hemen suçluyu misafir işletim sisteminde aradım. Kesin dedik, `systemd` kafayı yedi ya da çekirdek paniği (kernel panic) yaşadık. Gittim saatlerce misafir sistemin `journalctl` loglarını taradım. Ama loglar ayna gibi temiz! Meğer misafir Ubuntu'nun günahı yokmuş. Sorun tamamen ana makinenin (host) grafik işleyicisinde (renderer) kopan bir fırtınadan ibaretmiş.

## Nedir bu mksSandbox ve Neden Çöküyor?

`mksSandbox.exe` (Windows üzerinde) veya Linux tarafındaki karşılığı, VMware'in grafik işleme motorudur. Misafir işletim sisteminin ekranını, ana makinenin ekran kartını (GPU) kullanarak çizer. Bu süreç koptuğunda VMware güvenliği sağlamak adına tüm sanal makineyi kapatır.

Bu hatayı çözmeden önce bilmeniz gereken birkaç detay var:

*   **Misafir sisteminiz sapasağlam:** Sanal makinenin içinde hiçbir çökme yok. Loglar temiz.
*   **Hata ekran kartıyla ilgili:** Host tarafındaki Nvidia/AMD sürücüleri, Vulkan/OpenGL katmanları ya da Windows güvenlik mekanizmaları bu çökmeyi tetikliyor.
*   **PID numarası önemsiz:** Hatadaki sayı (3796, 2878 vb.) o an çöken işlemin kimliğidir (Process ID). Her seferinde değişir, kafaya takmaya gerek yok.

Daha önce yazdığım [AWS EC2'de OpenVPN Nasıl Kurulur ve DNS Leak Nasıl Düzeltilir](/aws-ec2-openvpn-kurulumu-dns-leak-duzeltilmesi/) makalesinde olduğu gibi, bazen sanallaştırma ve VPN katmanları ana makinedeki ağ ve grafik servisleriyle böyle çakışmalar yaşayabiliyor. Şimdi gelin bu grafik canavarını adım adım nasıl uysallaştıracağımıza bakalım.

## 1. Sanal Makineyi Arka Planda (Headless) Çalıştırmak

Eğer bu sanal makineye sadece SSH üzerinden bağlanıyor, terminalde kod yazıyorsanız ve arayüze ihtiyacınız yoksa konsol penceresini hiç açmayarak bu sorundan tamamen kurtulabilirsiniz. Konsol açılmazsa `mksSandbox` çalışmaz ve çökecek bir şey kalmaz.

VMware Workstation arayüzünde sanal makinenin sekmesindeki **X** tuşuna basın ve çıkan kutucuktan **Run in Background** (Arka Planda Çalıştır) seçeneğini seçin.

Eğer makineyi doğrudan bu şekilde başlatmak isterseniz, PowerShell veya terminal üzerinden `vmrun` aracını kullanabilirsiniz:

Windows için:
```powershell
"C:\Program Files (x86)\VMware\VMware Workstation\vmrun.exe" start "C:\Kullanicilar\Yucel\Documents\VMs\Ubuntu\Ubuntu.vmx" nogui
```

Linux için:
```bash
vmrun -T ws start "/home/yucel/VMs/Ubuntu/Ubuntu.vmx" nogui
```

!!! warning "Dikkat! 🚨 Arayüzü açınca risk başlar"
    Eğer daha sonra makineye arayüzden çift tıklayıp ekranı izlemeye kalkarsanız, grafik işleyici tekrar tetiklenir ve çökme riskiyle yeniden karşı karşıya kalırsınız.

## 2. 3D Grafik Hızlandırmayı Kapatmak

Eğer konsolu aktif olarak kullanıyorsanız, en kesin ve pratik çözüm 3D grafik hızlandırmayı kapatıp yazılımsal işlemeye geçmektir.

Sanal makineyi tamamen kapatın. Arayüzden **Settings > Display** yolunu izleyin ve **Accelerate 3D graphics** seçeneğindeki işareti kaldırın. Ayarları kaydedip makineyi başlatın.

VMware artık ana makinenizin ekran kartı sürücüleriyle doğrudan konuşmak yerine tamamen güvenli yazılımsal işlemeye geri dönecektir.

## 3. `.vmx` Dosyasından Yazılımsal İşlemeyi Zorlamak

Arayüzdeki seçeneğin kazara tekrar açılmasını önlemek veya ayarı doğrudan konfigürasyondan sabitlemek için `.vmx` dosyasını düzenleyebilirsiniz.

Sanal makine kapalıyken `.vmx` uzantılı dosyayı metin editöründe açın ve dosyanın en altına şu satırı ekleyin:

```ini
mks.enableGLRenderer = "FALSE"
```

!!! tip "İpucu ⚡ Performans ipucu"
    Daha yüksek sanal makine performansı elde etmek için uyguladığımız **side-channel korumalarını kapatma** (side-channel mitigations) yöntemine aşinaysanız, bu parametreyi de `.vmx` dosyanıza ekleyebilirsiniz.

## 4. Linux Hostlarda Vulkan Grafik Motorunu Kapatmak

Eğer ana makineniz Linux ise (örneğin Arch Linux) ve Nvidia ekran kartı kullanıyorsanız, grafik kartının sürücüleriyle Vulkan arasında bir uyuşmazlık olabilir. Bu durumda Vulkan grafik motorunu devre dışı bırakabilirsiniz.

Ana makinedeki `~/.config/vmware/config` dosyasını (yoksa oluşturarak) açın veya doğrudan VM'in `.vmx` dosyasına şu satırı ekleyin:

```ini
mks.enableVulkanPresentation = "FALSE"
```

## 5. Sistem ve Sürücü Düzeyinde Müdahaleler

Eğer sorun grafik hızlandırma kapalıyken bile devam ediyorsa, şu adımları gözden geçirebilirsiniz:

*   **Nvidia Sürücülerini Düzenlemek:** Özellikle Nvidia grafik kartlarında yeni gelen sürücü güncellemeleri mksSandbox'ı tetikleyebilir. Sürücüyü temiz bir şekilde güncelleyin veya sorunsuz çalıştığından emin olduğunuz bir önceki sürüme geri dönün.
*   **Core Isolation (Bellek Bütünlüğü) Kapatmak:** Windows 11 ana makinesi üzerinde Core Isolation (Bellek Bütünlüğü) özelliğini kapatmak bu çökmeleri engelleyebilir (*Ayarlar > Gizlilik ve Güvenlik > Cihaz Güvenliği > Çekirdek Yalıtım Detayları*).
*   **VMware Sürümünü Düşürmek:** VMware Workstation 17.6.x sürümlerinde bu hata çok sık raporlanmaktadır[^1]. Pek manyak bir çözüm olsa da Broadcom topluluk forumlarında sürümü 17.5.2'ye düşürerek sorundan tamamen kurtulduğunu belirtenlerin sayısı oldukça fazla.

## Sadede Gelirsek

Sanal makinenin aniden kapanması can sıkıcı olsa da, misafir işletim sistemini yeniden kurmak gibi zaman alıcı maceralara atılmanıza gerek yok. Sorun tamamen ana makine ile VMware grafik katmanı arasındaki iletişimden ibaret. İşlerinizi kurtarmak için sanal makineyi arka planda (headless) çalıştırmak veya 3D hızlandırmayı kapatmak en zahmetsiz çıkış yoludur.



[^1]: Geniş bilgi ve tartışmalar için Broadcom topluluk forumlarındaki [ilgili başlığa](https://community.broadcom.com/vmware-cloud-foundation/question/isbrenderercomm-lost-connection-to-mkssandbox-3796){: target="\_blank" rel="noopener noreferrer"} göz atabilirsiniz.
