Title: SSH ve GPG Anahtarlarını Yedekleme ve Geri Yükleme
Date: 2025-03-04 10:00
Modified: 2026-11-05 00:52
Category: Git
Tags: ssh, gpg, ed25519, git, anahtar yönetimi, yedekleme, güvenlik
Slug: ssh-gpg-yedekleme-geri-yukleme
Authors: yuceltoluyag
Series: Git
Series_index: 3
Summary: Linux sisteminizi yeniden kurarken veya başka bir bilgisayara geçerken GitHub SSH ve GPG anahtarlarınızı nasıl yedekleyip geri yükleyebileceğinizi öğrenin. Ed25519, SSH Agent, GPG commit imzalama ve GitHub doğrulama işlemlerini gerçek terminal örnekleriyle inceleyin.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/ssh-gpg-yedekleme-geri-yukleme-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114985374923504182
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvrshibzbk27

## SSH ve GPG Anahtarlarını Yedekleme ve Geri Yükleme 🔑

Linux sisteminizi yeniden kurduğunuzda veya yeni bir bilgisayara geçtiğinizde yalnızca Git depolarınızı taşımak yeterli olmayabilir. GitHub ile SSH üzerinden bağlantı kurmak ve Git commit'lerinizi imzalamaya devam etmek için kullandığınız anahtarları da geri yüklemeniz gerekir.

Bu rehberde SSH ve GPG anahtarlarını güvenli şekilde yedeklemeyi, yeni bir Linux sistemine aktarmayı ve GitHub bağlantısını yeniden çalışır hâle getirmeyi inceleyeceğiz.

İki anahtar türünün görevini birbirinden ayırmakta fayda var:

- **SSH:** GitHub gibi servislerde kimlik doğrulamak ve depolara güvenli bağlantı kurmak için kullanılır.
- **GPG:** Git commit'lerini imzalamak ve imzanın ilgili özel anahtarla oluşturulduğunu doğrulamak için kullanılır.

Bu iki mekanizma birbirinden bağımsızdır. SSH anahtarınızın çalışması, GPG imzalama işleminizin de çalışacağı anlamına gelmez.

## 1. SSH ve GPG Anahtarlarını Yedekleme 💾

Yedekleme işlemine başlamadan önce mevcut anahtarlarımızı tespit edelim.

### SSH anahtarlarını yedekleme

SSH anahtarları genellikle `~/.ssh/` dizininde bulunur.

Mevcut dosyaları listelemek için:

```bash
ls -la ~/.ssh/
```

Yeni sistemlerde yaygın olarak kullanılan anahtar türlerinden biri Ed25519'dur. Örneğin:

```text
id_ed25519
id_ed25519.pub
known_hosts
known_hosts.old
config
```

Burada:

- `id_ed25519`: Özel anahtardır. Kesinlikle gizli tutulmalıdır.
- `id_ed25519.pub`: Açık anahtardır. GitHub'a eklenen dosya budur.
- `known_hosts`: Daha önce bağlantı kurulan sunucuların kimlik bilgilerini tutar.
- `config`: SSH bağlantılarına ait kullanıcı tanımlı ayarları içerir.

Dosyalarınızın tamamını güvenli bir yedekleme konumuna kopyalayabilirsiniz:

```bash
cp -a ~/.ssh /mnt/usb/
```

Bu işlem `.ssh` dizinindeki dosyaları ve alt dizinleriyle birlikte kopyalar.

**Önemli:** Özel anahtarınızı içeren yedeği şifrelenmiş bir ortamda saklayın. USB belleğin kaybolması veya yetkisiz kişilerin eline geçmesi durumunda özel anahtarınızın ele geçirilmesini istemezsiniz.

### GPG özel anahtarını yedekleme

Öncelikle sisteminizde kayıtlı GPG anahtarlarını listeleyin:

```bash
gpg --list-secret-keys --keyid-format=long
```

Örnek çıktı:

```text
sec   rsa4096/8416A43957C19627 2022-04-25 [SC]
      EA8B0CD56D5A2C4FB60CABDF8416A43957C19627
uid   yucel-arch <ytoluyag@gmail.com>
```

Burada `sec` satırı özel anahtarınızı, `uid` satırı ise anahtara bağlı kullanıcı bilgilerini gösterir.

Anahtar kimliğini kullanarak özel anahtarınızı dışa aktarın:

```bash
gpg --armor --export-secret-keys 8416A43957C19627 > my-private-key.asc
```

Açık anahtarı da ayrıca yedekleyebilirsiniz:

```bash
gpg --armor --export 8416A43957C19627 > my-public-key.asc
```

GPG anahtarının güven ayarlarını da korumak istiyorsanız:

```bash
gpg --export-ownertrust > ownertrust.txt
```

Yedekleme dosyalarının izinlerini sınırlandırın:

```bash
chmod 600 my-private-key.asc
chmod 644 my-public-key.asc
chmod 600 ownertrust.txt
```

Böylece özel anahtarınızı, açık anahtarınızı ve GPG güven ayarlarınızı ayrı dosyalarda saklamış olursunuz.

**Not:** `ownertrust.txt`, anahtarın kendisi değildir. GPG'nin diğer anahtarlara ilişkin güven değerlendirmelerini saklar. Geri yükleme sırasında isteğe bağlı olarak kullanılabilir.

## 2. Yeni Linux Sisteminde Anahtarları Geri Yükleme 🛠️

Yeni sisteminizde önce SSH dizinini oluşturalım:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

### SSH anahtarlarını geri yükleme

Yedeklediğiniz `.ssh` dizinindeki dosyaları geri kopyalayın.

Örneğin:

```bash
cp /mnt/usb/.ssh/id_ed25519 ~/.ssh/
cp /mnt/usb/.ssh/id_ed25519.pub ~/.ssh/
cp /mnt/usb/.ssh/known_hosts ~/.ssh/
```

Kullanıyorsanız `config` dosyasını da geri yükleyebilirsiniz:

```bash
cp /mnt/usb/.ssh/config ~/.ssh/
```

Dosya izinlerini doğru şekilde ayarlayın:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub
chmod 644 ~/.ssh/known_hosts
```

SSH özel anahtarının başkaları tarafından okunabilir olması SSH bağlantısının reddedilmesine neden olabilir. Bu nedenle izinleri doğru ayarlamak önemlidir.

Şimdi SSH Agent'ı başlatın:

```bash
eval "$(ssh-agent -s)"
```

Özel anahtarınızı Agent'a ekleyin:

```bash
ssh-add ~/.ssh/id_ed25519
```

Anahtarın başarıyla eklendiğini kontrol etmek için:

```bash
ssh-add -l
```

### SSH bağlantısını test etme

GitHub ile bağlantıyı doğrulamak için:

```bash
ssh -T git@github.com
```

Başarılı bağlantıda aşağıdaki gibi bir mesaj görürsünüz:

```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

Bu mesaj, SSH kimlik doğrulamasının başarılı olduğunu gösterir.

GitHub hesabınızda ilgili açık anahtarın kayıtlı olması gerektiğini unutmayın.

[GitHub SSH and GPG Keys](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} 

### GPG anahtarlarını geri yükleme

SSH işlemini tamamladıktan sonra GPG özel anahtarımızı içe aktarabiliriz.

Yedek dosyanızın bulunduğu dizinde:

```bash
gpg --import my-private-key.asc
```

Başarılı işlemde özel anahtarın içe aktarıldığını belirten bir mesaj görürsünüz.

GPG anahtarlarını kontrol edin:

```bash
gpg --list-secret-keys --keyid-format=long
```

Ayrıca açık anahtarı ve güven ayarlarını da geri yükleyebilirsiniz:

```bash
gpg --import my-public-key.asc
gpg --import-ownertrust ownertrust.txt
```

Açık anahtar daha önce özel anahtarla birlikte içe aktarıldıysa ikinci içe aktarma gerekli değildir.

## 3. Git Commit İmzalama Ayarlarını Geri Yükleme ✍️

GPG anahtarını içe aktarmak tek başına yeterli değildir. Git'in commit imzalamak için hangi anahtarı kullanacağını da belirtmeniz gerekir.

Öncelikle Git kullanıcı bilgilerinizi kontrol edin:

```bash
git config --global --get user.name
git config --global --get user.email
```

E-posta adresinizin GPG anahtarınızla ve GitHub hesabınızla uyumlu olduğundan emin olun.

GPG anahtar kimliğini Git'e tanıtın:

```bash
git config --global user.signingkey 8416A43957C19627
```

Commit imzalamayı varsayılan olarak etkinleştirin:

```bash
git config --global commit.gpgsign true
```

GPG imzalama biçimini açıkça belirtmek isterseniz:

```bash
git config --global gpg.format openpgp
```

Bundan sonra Git commit oluştururken GPG anahtarınızı kullanacaktır.

Bir test commit'i oluşturmak için herhangi bir Git deposunda:

```bash
git commit --allow-empty -S -m "Test GPG signing"
```

Commit imzasını kontrol edin:

```bash
git log -1 --show-signature
```

GPG imzasının yerel olarak doğrulanması, anahtarın ve imzanın teknik olarak çalıştığını gösterir. GitHub üzerindeki `Verified` durumu ise ayrıca kontrol edilmelidir.

## 4. GPG Anahtarının Süresinin Dolması ve Yenilenmesi ⏳

Anahtarlarınızı yıllarca kullanabilirsiniz ancak GPG anahtarlarının bir son kullanma tarihi bulunabilir.

Sistem değişikliği sonrasında karşılaşabileceğiniz sorunlardan biri, özel anahtarın başarıyla içe aktarılmasına rağmen anahtarın süresinin dolmuş olmasıdır.

Anahtarın durumunu kontrol etmek için:

```bash
gpg --list-secret-keys --keyid-format=long
```

Örneğin:

```text
sec   rsa4096/8416A43957C19627 2022-04-25 [SC] [expired: 2025-08-23]
```

Bu durumda özel anahtarınız mevcut olsa bile süresi dolmuştur.

### GPG anahtarının süresini uzatma

Anahtarınızı düzenlemek için:

```bash
gpg --edit-key 8416A43957C19627
```

GPG komut satırında:

```text
gpg> expire
```

Yeni süreyi belirtin. Örneğin iki yıl:

```text
Key is valid for? (0) 2y
```

Onayladıktan sonra değişiklikleri kaydedin:

```text
gpg> save
```

Son durumu kontrol edin:

```bash
gpg --list-secret-keys --keyid-format=long
```

**Dikkat:** Bu örnek birincil anahtarın süresini uzatır. Anahtarınızın alt anahtarları da varsa bunların sürelerini ayrıca kontrol etmelisiniz. GPG düzenleme ekranındaki `list` ve `key` komutlarıyla alt anahtarları seçip gerekli süre değişikliklerini yapabilirsiniz.

### GitHub üzerindeki GPG anahtarını güncelleme

Yerel bilgisayarınızda GPG anahtarının süresini uzatmanız, GitHub'da kayıtlı açık anahtarın otomatik olarak güncellendiği anlamına gelmez.

Güncel açık anahtarı yeniden dışa aktarın:

```bash
gpg --armor --export 8416A43957C19627
```

GitHub hesabınızın **Settings → SSH and GPG keys** bölümünde kayıtlı anahtarın durumunu kontrol edin.

[GitHub GPG Keys](https://github.com/settings/keys){: target="\_blank" rel="noopener noreferrer"} 

GitHub eski anahtarı süresi dolmuş gösteriyorsa mevcut kaydın yönetilmesi gerekir. Aynı anahtarı ikinci kez eklemeye çalıştığınızda `Key already exists` veya `Public key already exists` mesajı alabilirsiniz.

Bu durumda eski kaydın kaldırılması ve güncel açık anahtarın yeniden eklenmesi gerekebilir. Ancak eski imzalı commit'lerin doğrulama durumunu etkileyebileceğinden, mevcut kaydı silmeden önce GitHub'ın güncel GPG anahtarı yönetimi ve imza doğrulama davranışını kontrol edin.

## 5. GitHub Üzerinde İmza Doğrulama (Verified) ✅

Son olarak GitHub tarafındaki imzalama işlemini kontrol edelim.

Bir Git deposunda yeni bir imzalı commit oluşturun:

```bash
git commit --allow-empty -S -m "Test GPG signing"
```

Ardından GitHub'a gönderin:

```bash
git push
```

GitHub üzerinde ilgili commit'i açın.

İmza doğru şekilde tanınıyor ve doğrulanıyorsa commit'in yanında **Verified** etiketi görünür.

Burada iki ayrı kontrol olduğunu unutmayın:

- `git log -1 --show-signature`: İmzanın yerel olarak doğrulanmasını sağlar.
- GitHub `Verified`: GitHub'ın imzayı tanıdığını ve doğruladığını gösterir.

Yerel test başarılı olsa bile GitHub'da `Unverified` görünüyorsa kayıtlı GPG anahtarını, anahtarın geçerlilik süresini ve commit e-posta adresini kontrol edin.

## 🎯 Sonuç

Linux sisteminizi yeniden kurarken SSH ve GPG anahtarlarınızı kaybetmek zorunda değilsiniz.

Bu rehberde:

- Ed25519 SSH anahtarlarını yedeklemeyi ve geri yüklemeyi,
- SSH Agent ile anahtarları kullanıma hazırlamayı,
- GPG özel ve açık anahtarlarını dışa aktarmayı ve içe aktarmayı,
- Git commit imzalama ayarlarını yeniden yapılandırmayı,
- Süresi dolan GPG anahtarlarını yenilemeyi,
- GitHub üzerinde SSH bağlantısını ve GPG imzalarını doğrulamayı inceledik.

**Son bir hatırlatma:** Özel SSH ve GPG anahtarlarınızı herkese açık Git depolarına, bulut depolama alanlarına veya şifrelenmemiş yedekleme ortamlarına koymayın. Yedeklerinizi güvenli ve mümkünse şifrelenmiş bir ortamda saklayın.

Birkaç dakikalık doğru bir yedekleme işlemi, yeni bir Linux kurulumundan sonra geliştirme ortamınızı yeniden hazırlamak için harcayacağınız saatleri kurtarabilir. 🔐

[responsive_img src="/images/ssh-gpg-yedekleme-geri-yukleme-xl.webp" alt="SSH ve GPG anahtarlarını yedekleme ve geri yükleme rehberi" /]