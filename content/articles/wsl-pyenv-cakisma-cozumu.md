Title: WSL'de pyenv-win Çakışması ve PATH Kaosu Nasıl Çözüldü
Date: 2026-05-04 18:40
Category: Sorun Giderme
Tags: wsl, pyenv, windows, linux, path, python
Slug: wsl-pyenv-cakisma-cozumu
Authors: yuceltoluyag
Summary: WSL içinde Windows pyenv-win PATH çakışması yüzünden bozulan python ortamını kapattım, sistemi izole ederek temiz bir Linux dev setup kurdum.
Image: /images/wsl-pyenv-cakisma-cozumu.webp
Lang: tr
Translation: false
Status: published

## "neden python bozuldu ya?" anı

Şunu en baştan söyleyeyim: bu hata ilk bakışta "python bozulmuş" gibi duruyor ama değil. Asıl olay şu: WSL içinde `python` çalıştırıyorsun ve sana şunu fırlatıyor:

```bash
/mnt/c/Users/baba/.pyenv/pyenv-win/shims/python
bad interpreter: /bin/sh^M
```

Ve insanın aklına direkt şu geliyor: *"ben ne yaptım ya?"* İlk tepki: python'a ne oldu? İkinci tepki: `.zshrc`'yi bozdum mu? Üçüncü tepki: bilgisayarı duvara fırlatayım mı? Ben de tam bu sırayla gittim. Ve sonunda olayın python'la alakası olmadığını, tamamen bir **PATH çakışması** olduğunu fark ettim.

---

## WSL Interop: Sessiz Katil

Burada biraz teknikleşmem lazım ama sıkılmayın, anlatacağım. WSL'in Windows ile bir "interop" mekanizması var. Bu mekanizma sayesinde WSL içinden Windows uygulamalarını çalıştırabiliyorsun — mesela `explorer.exe .` yazınca dosya yöneticisi açılıyor, `notepad.exe` ile Not Defteri açılıyor. Güzel özellik. Ama bir sorun var. Bu interop mekanizması, Windows PATH'ini de sessizce WSL'in içine alıyor. Yani Windows'ta kurulu olan her şey — Python, Node.js, Java, ne varsa — WSL'in PATH'ine sızıyor. Bakın Microsoft'un kendi dokümantasyonunda ne diyor: [WSL Global Configuration Options](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#global-configuration-options-with-wslconfig){: target="_blank" rel="noopener noreferrer"} Orada `appendWindowsPath` diye bir ayar var. Varsayılan olarak `true`. Yani Windows PATH'i otomatik olarak ekleniyor. İnsan okuyunca "tamam ya bu opsiyonel, elleme" diyor. Sonra bir bakıyorsun sistem yarı Windows yarı Linux olmuş. Ne güzel hybrid di mi? Hayır. Değil.

---

## Benim Deneyimim: Debug Günlüğü

İlk olarak `.zshrc`'yi kurcaladım. PATH satırlarını tek tek inceledim. Temiz çıktı. `.profile`'a baktım. O da temiz. `printenv | grep -i pyenv` çalıştırdım. Çıktı:

```bash
PATH=...:/mnt/c/Users/baba/.pyenv/pyenv-win/bin:...
```

İşte orada gördüm. Linux tarafında pyenv kurulu değil ama Windows'taki pyenv-win, WSL'in PATH'ine sızıntı yapmış. Bu arada, pyenv-win'in nasıl çalıştığını bilmiyorsanız kısaca anlatayım: Windows'ta Python sürümlerini yöneten bir araç. Kendi `shims` klasöründe sahte python çalıştırıcıları oluşturuyor. WSL bu shims'leri görünce "ha tamam, python burada" diyor ama o shims Windows için yazılmış. Sonra da `bad interpreter: /bin/sh^M` hatası. `^M` gördünüz mü? Bu Windows satır sonu karakteri (`\r\n`). Linux'ta `\n` olması gerekiyor. Yani WLindows'tan gelen dosya, Linux tarafından okunamıyor.

---

## İnterop Nasıl Çalışıyor? (Teknik Detay)

Biraz daha derine ineyim. WSL açıldığında şu sırayla çalışıyor:

1. Linux kernel yükleniyor
2. init süreci başlıyor
3. `/etc/wsl.conf` ve `%UserProfile%\.wslconfig` okunuyor
4. Eğer `enabled=true` ise, Windows'tan bilgi çekiliyor
5. Eğer `appendWindowsPath=true` ise, Windows PATH'i Linux PATH'ine ekleniyor

Bu süreçte Windows tarafındaki `pyenv-win` klasörü de PATH'e düşüyor. Ve Linux'taki bash, o klasördeki shims dosyalarını çalıştırmaya çalışıyor. Sonuç: `bad interpreter` hatası. [StackOverflow'da aynı hatayı yaşayan insanlar](https://stackoverflow.com/questions/75883177/installing-pyenv-win-on-top-of-working-wsl2-ubuntu-instance-breaks-ubuntu-pyenv){: target="_blank" rel="noopener noreferrer"} var. Orada da herkes aynı şeyi söylüyor: "Windows pyenv kuruyor, WSL'e sızıyor, Python kırılıyor."

---

## Çözüm: Adım Adım İzolasyon

En basit ama en sert çözümü uyguladım. WSL'i Windows'tan tamamen izole ettim.

### Adım 1: wsl.conf Dosyasını Bul veya Oluştur

WSL içinde terminal açın:

```bash
sudo nano /etc/wsl.conf
```

Dosya yoksa sorun değil, nano zaten oluşturacak.

### Adım 2: İnterop Ayarlarını Değiştir

Dosyanın içine şunu yazın:

```ini
[interop]
enabled=false
appendWindowsPath=false
```

Bu iki satır ne yapıyor?

- `enabled=false`: Windows uygulamalarını WSL içinden çalıştırmayı kapatıyor
- `appendWindowsPath=false`: Windows PATH'inin WSL'e sızmasını engelliyor

Kaydedin: `Ctrl+X`, sonra `Y`, sonra `Enter`.

### Adım 3: WSL'i Yeniden Başlat

Terminal'den çıkın ve PowerShell'de:

```powershell
wsl --shutdown
```

Sonra tekrar WSL'i açın. Bu komut olmadan değişiklikler geçerli olmaz.

### Adım 4: Doğrulama

WSL'e tekrar girin ve kontrol edin:

```bash
echo $PATH
```

Artık `/mnt/c/...` ile başlayan Windows PATH'lerini görmüyor olmanız lazım.

```bash
python --version
```

Eğer python bulamıyorsa — bu normal. Linux tarafında python kurmanız gerekiyor. Ama en azından artık Windows'tan sızan bozuk python yok.

---

## Karşılaştırma: İnterop Açık mı Kapalı mı?

Bunu yapmadan önce bir düşünün. İnterop'u kapatmanın avantajları ve dezavantajları var:

| | İnterop Açık | İnterop Kapalı |
|---|---|---|
| **Windows uygulamaları** | WSL'den çalışır | Çalışmaz |
| **PATH güvenliği** | Riskli — Windows sızabilir | Güvenli — tam izolasyon |
| **Performans** | Hafif yavaş (Windows PATH taraması) | Daha hızlı |
| **Dosya erişimi** | `/mnt/c/` çalışır | `/mnt/c/` hâlâ çalışır[^1] |
| **VS Code entegrasyonu** | `code .` çalışır | Elle bağlamanız gerekir[^2] |
| **Python/Node güvenliği** | Karışabilir | Tamamen Linux kontrolünde |

[^1]: `appendWindowsPath=false` sadece PATH'i etkiler, dosya sistemini değil. `/mnt/c/` hâlâ erişilebilir.
[^2]: VS Code'un WSL eklentisi Remote - WSL ile bağlanabilirsiniz, interop gerektirmez.

---

## Yan Etkiler (Küçük Ama Önemli)

Bunu yapınca şunu fark ettim: WSL artık "Windows + Linux hibrit ortam" değil, direkt küçük bir Linux VM gibi davranıyor.Ve açık söyleyeyim… ben bunu daha çok sevdim. Ama bazı şeyler değişti:

- `explorer.exe .` çalışmıyor artık. Yerine `wslview .` kullanabilirsiniz (wslu paketi gerekli).
- Windows'taki `.exe` dosyalarını çağıramıyorsunuz. Ama zaten neden çağırasınız ki?
- Docker Desktop WSL backend'i etkilenebilir. Eğer Docker kullanıyorsanız, bu ayarı yapmadan önce Docker'ın WSL ile nasıl çalıştığını araştırın.

---

## Sık Karşılaşılan Sorunlar

### "appendWindowsPath=false yapınca VS Code çalışmıyor"

VS Code'un WSL eklentisi (Remote - WSL) zaten WSL'e SSH üzerinden bağlanıyor. İnterop kapalı olsa bile çalışır. Sadece `code .` komutu çalışmaz. Çözüm: VS Code'u Windows'tan açıp, sol alttaki "><" ikonuna tıklayıp "Connect to WSL" seçin.

### "wsl --shutdown gerekiyor mu?"

Evet. `wsl.conf` değişiklikleri sadece WSL yeniden başlatıldığında geçerli oluyor. `wsl --shutdown` tüm WSL实例larını kapatıyor. Sonra tekrar `wsl` yazınca yeni ayarlarla açılıyor.

### "Farklı dağıtımlarda aynı şey geçerli mi?"

Evet. Ubuntu, Debian, Fedora, Arch — hangi WSL dağıtımını kullanırsanız kullanın, `/etc/wsl.conf` aynı şekilde çalışır. Ama her dağıtım için ayrı ayrı düzenlemeniz gerekebilir.

### "Docker Desktop etkilenir mi?"

Eğer Docker Desktop'ı WSL backend ile kullanıyorsanız, evet etkilenebilir. Docker'ın kendi WSL instance'ı var (`docker-desktop`). Onun `/etc/wsl.conf`'unu ayrı düzenlemeniz gerekebilir. Ya da sadece development WSL instance'ınızı izole edin, Docker'ı dokunmayın.

### "Python'u nasıl kurarım şimdi?"

WSL içinde:

```bash
sudo apt update && sudo apt install python3 python3-pip
```

Eğer çoklu Python sürümü istiyorsanız, [Linux GPU sürücü rehberimde](/linux-gpu-driver-rehberi/){: target="_blank" rel="noopener noreferrer"} anlattığım gibi sistem paketleriyle değil, pyenv'in Linux versiyonuyla kurun. Ama bu sefer sadece Linux pyenv'i çalışacak, Windows'tan sızan shims olmayacak.

---

## Neden Sadece "appendWindowsPath=false" Yetmez?

Şimdi diyeceksiniz ki "tamam da sadece PATH'i engellesen olmaz mı?" Olmaz. Çünkü interop açıkken Windows'tan gelen bazı şeyler hâlâ sorun çıkarabiliyor. Mesela:

- Windows'taki `.bat` ve `.cmd` dosyaları WSL'den çağrılabiliyor
- Windows ortam değişkenleri (`%APPDATA%` gibi) WSL'e sızabiliyor
- Bazı araçlar (özellikle Java, .NET) Windows'tan gelen yolları kullanmaya çalışıyor

Ben tam izolasyonu tercih ettim. Siz isterseniz sadece `appendWindowsPath=false` yaparak daha hafif bir çözüm deneyebilirsiniz. Ama benim tecrübem, yarım çözümlerin sonradan baş ağrıtıyor olması.

---

## Alternatif Çözüm: Sadece Belirli PATH'leri Kaldırmak

Eğer interop'u tamamen kapatmak istemiyorsanız, sadece sorunlu PATH'leri kaldırabilirsiniz:

```bash
# WSL açıldığında otomatik çalışması için .zshrc veya .bashrc'ye ekleyin:
export PATH=$(echo "$PATH" | tr ':' '\n' | grep -v '/mnt/c' | tr '\n' ':' | sed 's/:$//')
```

Bu komut PATH'ten tüm `/mnt/c/...` yollarını kaldırıyor. Ama bu geçici bir çözüm — her WSL oturumunda çalıştırmanız gerekiyor.

Ben kalıcı çözümü tercih ettim: `wsl.conf` ile kökten çözdüm.

---

## Sonuç (Biraz Dürüst Konuşayım)

Bence burada asıl ders şu: WSL'i "Windows'a bağlı Linux" gibi kullanırsan, bir noktada Windows her şeye bulaşıyor. Bu sadece pyenv için değil, her şey için geçerli. Node.js, Java, Ruby, Go — Windows'ta kurulu olan herhangi bir araç, WSL'in PATH'ine sızabilir. Ben en sonunda şunu yaptım:

- Windows PATH'ini kestim
- İnterop'u kapattım
- Sistemi izole ettim

Ve garip bir şekilde… her şey düzeldi 😄 WSL güzel araç ama ya onu Linux gibi kullanırsın ya da Windows karmaşasında kaybolursun. Ben ikinci yolu bırakıp ilkine geçtim. Ve iyi ki de geçmişim.

---

!!! note "Küçük bir itiraf Bunu ilk çözerken baya "neden python bana düşman oldu" moduna girmiştim. Meğer olay python değilmiş, ortammış. İnterop denen şeyi o gün öğrendim. Ve o günden beri WSL'i hep izole kullanıyorum."


---

[^1]: `appendWindowsPath=false` sadece PATH'i etkiler, dosya sistemini değil. `/mnt/c/` hâlâ erişilebilir.
[^2]: VS Code'un WSL eklentisi Remote - WSL ile bağlanabilirsiniz, interop gerektirmez.

---

## İlgili Yazılar

- [Linux GPU Sürücü Rehberi: AMD, Intel ve Nvidia İçin Stabil ve Temiz Kurulum](/linux-gpu-driver-rehberi/){: target="_blank" rel="noopener noreferrer"}
- [Arch Linux'ta ntsync Nasıl Aktif Edilir?](/arch-linux-ntsync-aktif-etme-zen-kernel-rehberi/){: target="_blank" rel="noopener noreferrer"}
- [Vivaldi'de DoH Ayarı Nasıl Yapılır?](/vivaldi-doh-dns-over-https-ayari/){: target="_blank" rel="noopener noreferrer"}
- [Proxmox + ZFS Üzerinde Home Assistant Kurulumu](/proxmox-zfs-home-assistant/){: target="_blank" rel="noopener noreferrer"}

