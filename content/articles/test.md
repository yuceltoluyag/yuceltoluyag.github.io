title: NetworkManager
layout: post
date: 2025-08-21
categories: network managers
tags: [networkmanager, dhcp]
lang: tr
status: draft
slug: networkmanager


NetworkManager, sistemlerin otomatik olarak ağlara bağlanabilmesi için tespit ve yapılandırma sağlayan bir programdır. Hem kablosuz hem de kablolu ağlar için kullanılabilir. Kablosuz ağlarda, NetworkManager daha önce bilinen ağlara öncelik verir ve en güvenilir ağa geçiş yapabilir. NetworkManager ile entegre çalışan uygulamalar çevrimiçi ve çevrimdışı mod arasında geçiş yapabilir. Ayrıca, kablosuz bağlantılara göre kablolu bağlantılara öncelik verir, modem bağlantılarını ve belirli türdeki VPN'leri destekler.

> **Uyarı:** Varsayılan olarak, gizli bilgiler (örneğin Wi-Fi şifreleri) dosya sisteminde kök kullanıcısı tarafından ve GUI üzerinden (örneğin [[#nm-applet]]) erişilebilir olan kullanıcılar tarafından erişilebilir. Daha fazla bilgi için [[#Şifrelenmiş Wi-Fi Şifreleri]] bölümüne bakın.

## Kurulum

NetworkManager, `networkmanager` paketi ile kurulabilir. Bu paket bir servis (daemon), bir komut satırı arayüzü (`nmcli`) ve bir curses tabanlı arayüz (`nmtui`) içerir.

### NetworkManager'ı Etkinleştirme

Kurulumdan sonra `NetworkManager.service` servisini başlatıp etkinleştirmeniz gerekir. NetworkManager servisi başladıktan sonra, daha önce yapılandırılmış olan tüm "sistem bağlantılarını" otomatik olarak bağlar. "Kullanıcı bağlantıları" veya yapılandırılmamış bağlantılar için `nmcli` veya bir applet kullanmanız gerekir.

> **Not:**
> * Her ağ arabirimi yalnızca bir DHCP istemcisi veya ağ yöneticisi tarafından yönetilmelidir. Bu yüzden sisteminizde yalnızca bir DHCP istemcisi veya ağ yöneticisi çalıştırmanız önerilir. Şu anda çalışan servislerin listesini `systemctl --type=service` komutuyla alabilir, ardından çakışanları durdurabilir veya yeniden yapılandırabilirsiniz.
> * Eğer `systemd-resolved` başlatılmamışsa, log dosyalarınızda sürekli hata mesajları görünecektir. Daha fazla bilgi için [[#Unit dbus-org.freedesktop.resolve1.service bulunamadı]] bölümüne bakın.

### Ek Arayüzler

* `nm-connection-editor` grafiksel kullanıcı arayüzü için,
* `network-manager-applet` sistem tepsisi applet'i için (daha fazla bilgi için [[#nm-applet]] bölümüne bakın).

### Mobil Genişbant Desteği

NetworkManager, mobil genişbant bağlantı desteği için ModemManager kullanır. `modemmanager` ve `usb_modeswitch` paketlerini kurun. Ardından `ModemManager.service` servisini etkinleştirin ve başlatın. NetworkManager'ın ModemManager'ı algılaması için `NetworkManager.service` servisini yeniden başlatmanız gerekebilir. Yeniden başlattıktan sonra, modemi tekrar takın ve tanınması sağlanmalıdır. Bağlantıları bir ön uçtan (örneğin `nm-connection-editor`) ekleyin ve bağlantı türü olarak mobil genişbantı seçin. ISP'nizi ve fatura planınızı seçtikten sonra, APN ve diğer ayarlar `mobile-broadband-provider-info` paketinden alınan bilgilerle otomatik olarak doldurulmalıdır.

### PPPoE / DSL Desteği

PPPoE / DSL bağlantı desteği için `ppp` paketini kurun. PPPoE bağlantısını eklemek için `nm-connection-editor` kullanın ve yeni DSL/PPPoE bağlantısı ekleyin.

### VPN Desteği

NetworkManager 1.16 sürümünden itibaren yerel olarak [[WireGuard]] destekler, sadece `wireguard` çekirdek modülüne ihtiyaç duyar. Ayrıntılar için [https://blogs.gnome.org/thaller/2019/03/15/wireguard-in-networkmanager/ WireGuard in NetworkManager blog yazısına] bakın.

Diğer VPN türleri için eklenti sistemi kullanılır. Aşağıdaki paketlerde sağlanır:
* `networkmanager-openconnect` - OpenConnect için
* `networkmanager-openvpn` - OpenVPN için
* `networkmanager-pptp` - PPTP İstemcisi için
* `networkmanager-strongswan` - strongSwan için
* `networkmanager-vpnc`
* `networkmanager-fortisslvpn` (AUR)
* `networkmanager-iodine-git` (AUR)
* `networkmanager-libreswan` (AUR)
* `networkmanager-l2tp`
* `networkmanager-ssh` (AUR)
* `network-manager-sstp`

> **Uyarı:** VPN desteğiyle ilgili birçok [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/issues?search=VPN&state=opened hata] vardır. GUI üzerinden ayarladığınız daemon süreçlerinin seçeneklerini kontrol edin ve her paket sürümünde tekrar kontrol edin.

> **Not:**
> * VPN kullanırken tam işlevsel DNS çözümü için [[#DNS Önbelleğe Alma ve Koşullu Yönlendirme|koşullu yönlendirmeyi]] ayarlamalısınız.
> * Bu eklentilerin komut satırı arayüzü olmayabilir veya bir applet çalışmadan çalışmaz. Bu, normal bir masaüstü ortamı kullanıyorsanız bir sorun değildir; değilse, bağlantı yapılandırırken veya etkinleştirirken gerekli iletişim kutularını almak için [[#nm-applet]] çalıştırmanız gerekir. [https://bbs.archlinux.org/viewtopic.php?id=246698]

## Kullanım

NetworkManager, `nmcli` ve `nmtui` ile birlikte gelir.

### nmcli Örnekleri

Yakındaki Wi-Fi ağlarını listele:
```bash
$ nmcli device wifi list
```

Bir Wi-Fi ağına bağlan:
```bash
$ nmcli device wifi connect 'SSID_or_BSSID' password 'password'
```

Gizli bir Wi-Fi ağına bağlan:
```bash
$ nmcli device wifi connect 'SSID_or_BSSID' password 'password' hidden yes
```

`wlan1` arayüzü üzerinden bir Wi-Fi ağına bağlan:
```bash
$ nmcli device wifi connect 'SSID_or_BSSID' password 'password' ifname wlan1 'profile_name'
```

Bir arayüzü kes:
```bash
$ nmcli device disconnect ifname eth0
```

Bağlantıların isimlerini, UUID'lerini, türlerini ve cihazlarını listeleyin:
```bash
$ nmcli connection show
```

Bir bağlantıyı etkinleştirin (yani, mevcut bir profille bir ağa bağlanın):
```bash
$ nmcli connection up 'name_or_uuid'
```

Bir bağlantıyı sil:
```bash
$ nmcli connection delete 'name_or_uuid'
```

Ağ cihazlarının ve durumlarının bir listesini görün:
```bash
$ nmcli device
```

Wi-Fi'yi kapat:
```bash
$ nmcli radio wifi off
```

### Bağlantı Düzenleme

Ayarların kapsamlı bir listesi için `man 5 nm-settings` sayfasına bakın.

İlk olarak, bağlantıların bir listesini alın:
```bash
$ nmcli connection
NAME                UUID                                  TYPE      DEVICE
Wired connection 2  e7054040-a421-3bef-965d-bb7d60b7cecf  ethernet  enp5s0
Wired connection 1  997f2782-f0fc-301d-bfba-15421a2735d8  ethernet  enp0s25
MY-HOME-WIFI-5G     92a0f7b3-2eba-49ab-a899-24d83978f308  wifi       --
```

Burada sonraki işlemlerde bağlantı kimliği olarak ilk sütunu kullanabilirsiniz. Bu örnekte, bağlantı kimliği olarak `Wired connection 2`'yi seçiyoruz.

Oluşturulduktan sonra bir bağlantı `Wired connection 2`'yi yapılandırmanın üç yönteminiz vardır:
* **nmcli etkileşimli düzenleyici:** `nmcli connection edit 'Wired connection 2'`. Kullanımı düzenleyiciden iyi bir şekilde belgelenmiştir.
* **nmcli komut satırı arayüzü:** `nmcli connection modify 'Wired connection 2' ayar.özelliği değer`. Kullanım için `man 1 nmcli` sayfasına bakın. Örneğin, IPv4 yol metriğini 200 yapmak için `nmcli connection modify 'Wired connection 2' ipv4.route-metric 200` komutunu kullanabilirsiniz.
  Bir ayarı kaldırmak için, boş bir alan ("") geçirin:
  `nmcli connection modify 'Wired connection 2' ayar.özelliği ""`
* **Bağlantı dosyası:** `/etc/NetworkManager/system-connections/` içinde ilgili `Wired connection 2.nmconnection` dosyasını değiştirin. Yapılandırma dosyasını yeniden yüklemeyi unutmayın: `nmcli connection reload`.

### nmtui

NetworkManager, bağlantıları, sistem ana bilgisayar adını ve radyo anahtarlarını yönetmek için bir metin kullanıcı arayüzü (TUI) sunar. `nmtui` komutunu çalıştırarak başlatılabilir.

## Ön Uçlar

Bir [[masaüstü ortamı]] ile entegrasyon sağlamak için, çoğu kullanıcı bir applet kurmak isteyecektir. Bu, yalnızca ağ seçimine ve yapılandırmaya kolay erişim sağlamakla kalmaz, aynı zamanda gizli bilgileri güvenli bir şekilde saklamak için gerekli aracı da sağlar. Çeşitli masaüstü ortamlarının kendi applet'leri vardır; aksi takdirde, [[#nm-applet]] kullanabilirsiniz.

### GNOME

[[GNOME]] yerleşik bir araça sahiptir, Ağ ayarlarından erişilebilir.

### KDE Plasma

`plasma-nm` paketini kurun. Ardından, panel seçenekleri > Widget ekle > Ağlar menüsünden KDE görev çubuğuna ekleyin.

### nm-applet

`network-manager-applet`, Xorg ortamlarında bir sistem tepsisi ile çalışan bir GTK 3 ön ucu. Gizli bilgileri saklamak için [https://specifications.freedesktop.org/secret-service-spec/latest/ Secret Service D-Bus API]'yi uygulayan bir uygulama kurun ve yapılandırın, örneğin [[GNOME/Keyring]], [[KDE Wallet]] veya [[KeePassXC]].

Bir bağlantı için `Diğer kullanıcılar için kullanılabilir yap` seçeneğinin işaretini kaldırırsanız, NetworkManager şifreyi düz metin olarak saklar, ancak ilgili dosyaya yalnızca kök (veya `nm-applet` aracılığıyla diğer kullanıcılar) erişebilir. Daha fazla bilgi için [[#Şifrelenmiş Wi-Fi Şifreleri]] bölümüne bakın.

`nm-applet`'i bir sistem tepsisi olmadan çalıştırmak için `trayer` veya `stalonetray` kullanabilirsiniz. Örneğin, yolunuza şu betiği ekleyebilirsiniz:
```bash
#!/bin/sh
nm-applet    2>&1 > /dev/null &
stalonetray  2>&1 > /dev/null
killall nm-applet
```

`stalonetray` penceresini kapattığınızda, `nm-applet`'i de kapatır, böylece ağ ayarlarıyla işiniz bittiğinde ekstra bellek kullanılmaz.

Applet, bir Wi-Fi ağına bağlanıldığında veya bağlantının kesildiğinde bildirimler gösterebilir. Bu bildirimlerin görüntülenmesi için, bir bildirim sunucusu kurduğunuzdan emin olun - [[Masaüstü Bildirimleri]] bölümüne bakın. Applet'i bir bildirim sunucusu olmadan kullanırsanız, stdout/stderr'de bazı mesajlar görebilir ve applet takılabilir. [https://bugzilla.gnome.org/show_bug.cgi?id=788313]

Applet'i bu bildirimler devre dışı bırakılmış olarak çalıştırmak için, applet'i şu komutla başlatın:
```bash
$ nm-applet --no-agent
```

> **İpucu:** `nm-applet`, bir [[XDG Otomatik Başlat|otomatik başlat masaüstü dosyasıyla]] otomatik olarak başlatılabilir. `--no-agent` seçeneğini eklemek için, Exec satırını burada değiştirin, yani:
> ```bash
> Exec=nm-applet --no-agent
> ```

> **Uyarı:** [[i3]] üzerinde, nm-applet `--no-agent` seçeneğiyle başlatılırsa, yeni bir şifreli Wi-Fi ağına tıklayarak bağlanmak mümkün değildir çünkü şifre giriş iletişim kutusu penceresi açılmaz. `journal`, `no secrets: No agents were available for this request` mesajını gösterecektir.

#### Appindicator

1.18.0 sürümünden itibaren, resmi `network-manager-applet` paketinde [https://gitlab.archlinux.org/archlinux/packaging/packages/network-manager-applet/-/commit/527448fb2a87d85055f504f463dfe961dccd75c3 Appindicator desteği] mevcuttur. nm-applet'i bir Appindicator ortamında kullanmak için applet'i şu komutla başlatın:
```bash
$ nm-applet --indicator
```

### networkmanager-dmenu

Alternatif olarak, `networkmanager-dmenu-git` (AUR) mevcuttur, bu küçük bir betiktir ve `nm-applet` yerine [[dmenu]] veya [[rofi]] ile NetworkManager bağlantılarını yönetir. Mevcut NetworkManager Wi-Fi veya kablolu bağlantılarına bağlanma, yeni Wi-Fi bağlantılarına bağlanma, gerekirse şifre isteme, mevcut VPN bağlantılarına bağlanma, ağ bağlantısını etkinleştirme/devre dışı bırakma, `nm-connection-editor` GUI'sini başlatma, Bluetooth ağlarına bağlanma gibi tüm temel özellikleri sağlar.

### switchboard

Pantheon'un `switchboard`, `switchboard-plug-network` ve `nm-connection-editor` ile birlikte kullanıldığında, masaüstü ortamına bağımsız bir şekilde NetworkManager'ı yapılandırmak için bir yol sunar. Aşağıdaki komutla çalıştırılabilir:
```bash
$ io.elementary.settings
```

## Yapılandırma

NetworkManager'ın düzgün çalışabilmesi için bazı ek adımlar gerekecektir. `Network yapılandırması#Ana bilgisayar adını ayarla` bölümünde açıklandığı gibi `hosts` dosyanızı yapılandırdığınızdan emin olun.

NetworkManager, `/etc/NetworkManager/NetworkManager.conf` adresinde genel bir yapılandırma dosyasına sahiptir. Ek yapılandırma dosyaları `/etc/NetworkManager/conf.d/` dizinine yerleştirilebilir. Genellikle varsayılanlara ek yapılandırma yapılması gerekmez.

Bir yapılandırma dosyasını düzenledikten sonra, değişiklikleri şu komutu çalıştırarak uygulayabilirsiniz:
```bash
# nmcli general reload
```

### NetworkManager-wait-online

`NetworkManager.service`'i etkinleştirmek, `NetworkManager-wait-online.service`'i de etkinleştirir, bu bir kez çalıştırılan bir sistem servisidir ve ağın yapılandırılması için bekler. İkincisi `WantedBy=network-online.target`'a sahiptir, bu yüzden yalnızca `network-online.target` etkinleştirildiğinde veya başka bir birim tarafından çağrıldığında tamamlanır. Ayrıca bkz. [[systemd#Ağ hazır olduğunda servisleri çalıştırma]].

Varsayılan olarak, `NetworkManager-wait-online.service`, özellikle ağ bağlantısının hazır olana kadar değil, NetworkManager'ın başlangıcının tamamlanmasını bekler (ayrıntılı bilgi için `man 1 nm-online` sayfasına bakın). `NetworkManager-wait-online.service` ağ gerçekten hazır olmadan önce bitiyorsa, bu durumda önyüklemede başarısız olan servislere neden olabilir, birimi [[genişletin]] ve `ExecStart` satırındaki `-s` bayrağını kaldırın:
```ini
[Service]
ExecStart=
ExecStart=/usr/bin/nm-online -q
```

Bunun diğer sorunlara neden olabileceğine dikkat edin. [https://lists.fedoraproject.org/archives/list/users@lists.fedoraproject.org/thread/EGC324JD3HJCGVN7J55WYPRLFDA3TP7N/]

Bazı durumlarda, servis hâlâ önyüklemede başarıyla başlatılamaz çünkü zaman aşımı ayarı çok kısa olabilir. Servisi [[düzenleyin]] ve `NM_ONLINE_TIMEOUT` değerini `60`'tan daha yüksek bir değere değiştirin.

### PolicyKit İzinlerini Ayarlama

Varsayılan olarak, tüm aktif yerel oturumdaki kullanıcılar şifresiz olarak çoğu ağ ayarını değiştirmeye izinlidir. Oturum türünüzü kontrol etmek için [[Genel Sorun Giderme#Oturum İzinleri]] bölümüne bakın. Çoğu durumda, her şey otomatik olarak çalışır.

Bazı eylemler (örneğin sistem ana bilgisayar adını değiştirme) yönetici şifresi gerektirir. Bu durumda, [[Kullanıcılar ve Gruplar#Grup Yönetimi|kendinizi]] `wheel` grubuna eklemeniz ve şifrenizi isteyecek bir [[Polkit#Kimlik Doğrulama Aracıları|Polkit kimlik doğrulama aracı]] çalıştırmanız gerekir.

Uzak oturumlarda (örneğin [[TigerVNC#Sanal (headless) oturumlar için vncserver çalıştırma|headless VNC]]), NetworkManager'ı kullanmak için gerekli izinleri elde etmenin birkaç seçeneğiniz vardır:
1. [[Kullanıcılar ve Gruplar#Grup Yönetimi|Kendinizi]] `wheel` grubuna ekleyin. Her eylem için şifrenizi girmeniz gerekecektir. Kullanıcı hesabınızın diğer izinlere de sahip olabileceğine dikkat edin, örneğin kök şifresini girmeden [[sudo]] kullanma yetkisi.
2. [[Kullanıcılar ve Gruplar#Grup Yönetimi|Kendinizi]] `network` grubuna ekleyin ve aşağıdaki içeriğe sahip `/etc/polkit-1/rules.d/50-org.freedesktop.NetworkManager.rules` dosyasını oluşturun:
```javascript
polkit.addRule(function(action, subject) {
  if (action.id.indexOf("org.freedesktop.NetworkManager.") == 0 && subject.isInGroup("network")) {
    return polkit.Result.YES;
  }
});
```
`network` grubundaki tüm kullanıcılar şifresiz olarak ağ ekleyip kaldırabilecektir (bu, bir Polkit kimlik doğrulama aracı çalıştırmak zorunda kalmayacağınız anlamına gelir, bu yüzden bu seçenek SSH oturumlarında da çalışır).

### Proxy Ayarları

NetworkManager bazı proxy ayarlarını destekler. Doğrudan `nmtui`, `nm-applet` ve `nmcli` ile bu ayarlar değiştirilebilir.

`man 5 nm-settings-nmcli` sayfasındaki proxy ayarlarına bakın.

Ayrıca, özel proxy komutları her zaman dağıtım betikleri kullanılarak çalıştırılabilir, bkz. [[#Dağıtım Betikleri Örnekleri]].
Ayrıca bkz. [[Proxy Ayarları]].

### Bağlantıyı Kontrol Etme

NetworkManager, bir ağa bağlandıktan sonra bir web sunucusuna ulaşmayı deneyerek, örneğin bir captive portal'ın arkasında olup olmadığını belirleyebilir. Varsayılan sunucu (`/usr/lib/NetworkManager/conf.d/20-connectivity.conf` içinde yapılandırılmıştır) `ping.archlinux.org` (redirect.archlinux.org'un bir CNAME takma adıdır). Farklı bir web sunucusu kullanmak veya bağlantı kontrolünü devre dışı bırakmak için `/etc/NetworkManager/conf.d/20-connectivity.conf` dosyası oluşturun, `man 5 NetworkManager.conf|CONNECTIVITY SECTION` bölümüne bakın. Aşağıda GNOME sunucularının kullanılmasına bir örnek verilmiştir (bunun için [[GNOME]] kullanılması gerekmez):
```ini
[connectivity]
uri=http://nmcheck.gnome.org/check_network_status.txt
```

NetworkManager'ın bağlantı kontrolünü devre dışı bırakmak için aşağıdaki yapılandırmayı kullanın. Bu, bağlantıları engelleyen bir VPN'ye bağlandığınızda yararlı olabilir.
```ini
[connectivity]
enabled=false
```

> **Not:** Otomatik bağlantı kontrolleri potansiyel bir gizlilik sızıntısı olabilir, ancak Arch Linux'un varsayılan bağlantı URL'si herhangi bir erişimi günlüğe kaydetmeyeceğine dair taahhütte bulunmuştur. [https://gitlab.archlinux.org/archlinux/infrastructure/-/commit/fabccd0f61e5dea3925e8a0c6a46d56d5750c121#a4f34381bbb18ea77bfb3dd11a8aeca707078fca_0_26] [https://gitlab.archlinux.org/archlinux/infrastructure/-/blob/master/roles/ping/templates/nginx.d.conf.j2] bölümüne bakın.

### Captive Portal'lar

> **Stil:** Karmaşık betikler vikide sürdürülmemelidir.

Bir [[Wikipedia:Captive portal|captive portal]]'ın arkasındaysanız, masaüstü yöneticiniz otomatik olarak kimlik bilgileri isteyen bir pencere açabilir. Masaüstünüz bunu yapmıyorsa, `capnet-assist` paketini kullanabilirsiniz (ancak şu anda bozuk bir NetworkManager dağıtım betiği vardır). Alternatif olarak, aşağıdaki içeriğe sahip bir NetworkManager dağıtım betiği oluşturabilirsiniz:
```bash
#!/bin/sh -e
# NetworkManager olaylarını dağıtmak için betik
#
# Duvarlı bahçe ağlarında bir oturum açma web sayfası gösterir.
# Dağıtıcı olaylar hakkında daha fazla belge için NetworkManager(8) sayfasına bakın.
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
if [ -x "/usr/bin/logger" ]; then
    logger="/usr/bin/logger -s -t captive-portal"
else
    logger=":"
fi
wait_for_process() {
    PNAME=$1
    while [ -z "$(/usr/bin/pgrep $PNAME)" ]; do
        sleep 3;
    done
}
#tarayıcıyı başlat, ancak önyüklemede nm-applet'in başlamasını beklememiz gerekir
start_browser() {
    local user="$1"
    local display="$2"
    export DISPLAY="$display"
    wait_for_process nm-applet
    export XAUTHORITY="/home/$user/.Xauthority"
    $logger "Kullanıcı '$user' ve ekran '$display' olarak tarayıcıyı çalıştırıyor, captive portal'da oturum açıyor"
    sudo -u "$user" --preserve-env=DISPLAY,XAUTHORITY -H xdg-open http://capnet.elementary.io 2>&1 > /dev/null
}
# Doğru betikleri çalıştır
case "$2" in
    connectivity-change)
    $logger -p user.debug "bağlantı değişikliğinde dağıtım betiği tetiklendi: $CONNECTIVITY_STATE"
    if [ "$CONNECTIVITY_STATE" = "PORTAL" ]; then
        # who'nun çıktısının son sütununu ' :[en az bir rakam] ' ile eşleştir
        who | awk '$NF ~ /\(:[0-9]+\)/ { print $1 " " substr($NF, 2, length($NF)-2) };' | \
        while read user display; do
            start_browser $user $display || $logger -p user.err "Kullanıcı için başarısız: '$user' ekran: '$display'"
        done
    fi
    ;;
    *)
    # Bir kapanış aşamasında
    exit 0
    ;;
esac
```

Betik [[çalıştırılabilir]] hale getirilmelidir. Ancak bu betik X kullandığınızı varsayar ve basitçe bir http sayfası açar. Herkes için işe yaramayabilir.
`NetworkManager.service`'i [[yeniden başlatın]] veya yeniden başlatın, böylece bu çalışır hale gelir. Bunu yaptıktan sonra, dağıtım betiği, bir captive portal'ın arkasında olduğunuzu algıladığında bir oturum açma penceresi açmalıdır.
Basit bir çözüm [https://github.com/Seme4eg/captive-portal-sh captive-portal-sh]'dir - captive portal URL'sini alır ve varsayılan tarayıcınızda açar (sadece Wayland kullanıcıları içindir).
Başka bir çözüm, Google Chrome tabanlı `captive-browser-git` (AUR)'dir.

#### Eski Donanımda Captive Portal Desteği için iwd

Bazı eski Wi-Fi çipleri (örneğin Broadcom BCM4360) OWE/Elliptic-Curve el sıkışmasını desteklemeyen özel `wl` sürücüsüne ihtiyaç duyar, bu da birçok captive-portal hotspot'un oturum açma sayfasını sunmadan önce kullanır. NetworkManager'ın Wi-Fi arka ucunu `iwd`'ye (bkz. [[#iwd'yi Wi-Fi arka ucu olarak kullanma]]) değiştirerek, var olan sürücü üzerinden kullanıcı alanındaki tam OWE anahtar değiş tokuşunu uygulayarak, DHCP kirası alabilir ve portal "PORTAL" durumunu tetikleyebilirsiniz. Bunu yaptıktan sonra, herhangi bir dağıtım betiği veya tarayıcı başlatıcı, aksi takdirde asla tam olarak bağlanamayacak donanımda oturum açma sayfasını güvenilir bir şekilde açacaktır.

### DHCP İstemcisi

Varsayılan olarak NetworkManager dahili DHCP istemcisini kullanır. Dahili DHCPv4 eklentisi [https://nettools.github.io/n-dhcp4/ nettools' n-dhcp4] kütüphanesine dayanırken, dahili DHCPv6 eklentisi systemd-networkd tabanlı koddan yapılır.

Farklı bir DHCP istemcisi kullanmak için aşağıdaki alternatiflerden birini [[kurun]]:
* `dhcpcd` - dhcpcd
* `dhclient` - dhclient

DHCP istemcisi arka ucunu değiştirmek için, `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile `main.dhcp='dhcp_client_name'` seçeneğini ayarlayın. Örneğin:
```ini
[main]
dhcp=dhcpcd
```

> **Not:** `dhclient` ve `dhcpcd` paketlerinin birlikte gelen systemd birimlerini etkinleştirmeyin. NetworkManager ile çakışacaklardır, ayrıntılar için [[#Kurulum]] bölümündeki notu görün.

### DNS Yönetimi

NetworkManager'ın DNS yönetimi GNOME projesinin wiki sayfasında açıklanmıştır—[https://wiki.gnome.org/Projects/NetworkManager/DNS Projects/NetworkManager/DNS].

#### DNS Önbelleğe Alma ve Koşullu Yönlendirme

NetworkManager, [[dnsmasq]] veya [[systemd-resolved]] kullanarak DNS önbelleğe alma ve koşullu yönlendirmeyi etkinleştirmek için bir eklentiye sahiptir ([https://gitlab.freedesktop.org/NetworkManager/NetworkManager/merge_requests/143 daha önce] NetworkManager belgelerinde "split DNS" olarak adlandırılmıştı). Bu kurulumun avantajları, DNS aramalarının önbelleğe alınması ve daha kısa çözümleme süreleri ile VPN sunucularının DNS aramalarının ilgili VPN'nin DNS sunucularına yönlendirilmesidir. Bu özellikle birden fazla VPN'ye bağlıysanız yararlıdır.

> **Not:** Eğer `/etc/resolv.conf` `/run/systemd/resolve/stub-resolv.conf`, `/run/systemd/resolve/resolv.conf`, `/lib/systemd/resolv.conf` veya `/usr/lib/systemd/resolv.conf` dosyalarına bir sembolik bağlantıdır, NetworkManager otomatik olarak systemd-resolved'ı seçer. dnsmasq kullanmak için, önce bu sembolik bağlantıyı kaldırmanız, ardından NetworkManager'ı yeniden başlatmanız gerekir.

##### dnsmasq

`dnsmasq` paketinin kurulduğundan emin olun. Ardından `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile `main.dns=dnsmasq` seçeneğini ayarlayın:
```ini
[main]
dns=dnsmasq
```

Şimdi `nmcli general reload` komutunu root olarak çalıştırın. NetworkManager otomatik olarak dnsmasq'ı başlatacak ve `/etc/resolv.conf` dosyasına `127.0.0.1` ekleyecektir. Orijinal DNS sunucuları `/run/NetworkManager/no-stub-resolv.conf` dosyasında bulunabilir. Aynı DNS aramasını iki kez `drill example.com` komutuyla yaparak ve sunucu ile sorgu sürelerini doğrulayarak dnsmasq'nın kullanıldığını doğrulayabilirsiniz.

> **Not:**
> * `dnsmasq.service`'i başlatmanız veya `dnsmasq`'ın varsayılan yapılandırma dosyasını (`/etc/dnsmasq.conf`) düzenlemeniz gerekmez. NetworkManager, systemd servisini kullanmadan ve dnsmasq'ın varsayılan yapılandırma dosyalarını okumadan dnsmasq'ı başlatacaktır.
> * NetworkManager tarafından başlatılan dnsmasq örneği `127.0.0.1:53` adresine bağlanır, aynı adres ve portta başka bir yazılımı (dahil olmak üzere `dnsmasq.service`) çalıştıramazsınız.

###### Özel dnsmasq Yapılandırması

`/etc/NetworkManager/dnsmasq.d/` dizininde yapılandırma dosyaları oluşturarak `dnsmasq` için özel yapılandırmalar oluşturabilirsiniz. Örneğin, DNS önbelleğinin boyutunu değiştirmek için (RAM'de saklanır):
```ini
cache-size=1000
```

Yapılandırma dosyası sözdizimini şu komutla kontrol edebilirsiniz:
```bash
$ dnsmasq --test --conf-file=/dev/null --conf-dir=/etc/NetworkManager/dnsmasq.d
```

Tüm mevcut seçenekler için `man 8 dnsmasq` sayfasına bakın.

###### IPv6

> **Doğruluk:** Bu, NetworkManager `/etc/resolv.conf` dosyasına `::1` eklemeyeceği için sorunu çözmez. `@::1` `drill` komutuna manuel olarak geçirilmediği sürece, hâlâ `Error: error sending query: No (valid) nameservers defined in the resolver` hatası alır.

NetworkManager'da `dnsmasq`'ı etkinleştirmek, aksi takdirde çalışabilecek IPv6-only DNS aramalarını (örneğin `drill -6 [hostname]`) bozabilir. Bunu çözmek için, aşağıdaki dosyayı oluşturarak `dnsmasq`'ın IPv6 döngü arabirimini de dinlemesini sağlayabilirsiniz:
```ini
listen-address=::1
```

Ayrıca, `dnsmasq` yukarıdaki IPv6 DNS'yi önceliklendirmez. Ne yazık ki NetworkManager bunu yapmaz ([https://bugs.launchpad.net/ubuntu/+source/network-manager/+bug/936712 Ubuntu Hatası]). Bir çözüm, bağlantıda IPv4 DNS'yi devre dışı bırakmaktır, varsayılan bir çözüm varsa.

###### DNSSEC

NetworkManager tarafından başlatılan `dnsmasq` örneği varsayılan olarak [[DNSSEC]] doğrulaması yapmaz. DNSSEC doğrulamasını etkinleştirmek için, bunu desteklemeyen ad sunucularıyla DNS çözümlemesini bozarak, aşağıdaki yapılandırma dosyasını oluşturun:
```ini
conf-file=/usr/share/dnsmasq/trust-anchors.conf
dnssec
```

##### systemd-resolved

> **Genişletme:** NetworkManager 1.16, yeni bir ayar `main.systemd-resolved`[https://gitlab.freedesktop.org/NetworkManager/NetworkManager/commit/d4eb4cb45f41b1751cacf71da558bf8f0988f383] (varsayılan olarak etkin) ekler. Bu, DNS yapılandırmasını unconditional olarak systemd-resolved'a gönderir. [[systemd-resolved#DNS]]'deki "resolv.conf'u koruma" ile ilgili mi?

NetworkManager, DNS çözücü ve önbellek olarak [[systemd-resolved]] kullanabilir. 'systemd-resolved' doğru yapılandırıldığından ve `systemd-resolved.service` [[başlatıldığından]] emin olun.

`/etc/resolv.conf` {{ic|/run/systemd/resolve/stub-resolv.conf}}, {{ic|/run/systemd/resolve/resolv.conf}} veya {{ic|/usr/lib/systemd/resolv.conf}} dosyalarına bir [[Systemd-resolved#DNS|sembolik bağlantıdır]], systemd-resolved otomatik olarak kullanılır.

`main.dns=systemd-resolved` seçeneğini `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile açıkça etkinleştirebilirsiniz:
```ini
[main]
dns=systemd-resolved
```

##### Bir openresolv abonesiyle DNS çözücü

[[openresolv]] yerel [[DNS çözücünüz]] için bir aboneye sahipse, aboneyi kurun ve [[#openresolv kullanma|NetworkManager'ı openresolv kullanacak şekilde yapılandırın]].

NetworkManager tek bir "arayüz"ü 'resolvconf'a duyurduğundan, iki NetworkManager bağlantısı arasında koşullu yönlendirmeyi uygulamak mümkün değildir. [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/issues/153 NetworkManager hatası 153] bölümüne bakın.

Bu, `/etc/resolvconf.conf` dosyasında `private_interfaces="*"` ayarlayarak kısmen hafifletilebilir [https://roy.marples.name/projects/openresolv/configuration/]. Arama alanları listesinde olmayan alanlar için yapılan sorgular iletilemez. Bunlar yerel çözücünün yapılandırmasına göre ele alınacaktır, örneğin başka bir DNS sunucusuna iletilecek veya DNS kökünden özyinelemeli olarak çözülecektir.

#### Özel DNS Sunucuları

##### Özel Genel DNS Sunucuları Ayarlama

Tüm bağlantılar için DNS sunucuları ayarlamak için, `servers='serveripaddress1','serveripaddress2','serveripaddress3'` sözdizimini kullanarak `NetworkManager.conf` dosyasında `global-dns-domain-*` adlı bir bölümde belirtin. Örneğin:
```ini
[global-dns-domain-*]
servers=::1,127.0.0.1
```

> **Not:**
> * [[#DNS Önbelleğe Alma ve Koşullu Yönlendirme|NetworkManager'ın dnsmasq veya systemd-resolved eklentisini]] veya [[#DNS çözücü ile bir openresolv abonesi|openresolv abonelerini]] kullanıyorsanız, `servers=` seçeneğiyle döngü adreslerini belirtmeyin, DNS çözümlemesini bozabilir.
> * Belirtilen sunucular [[systemd-resolved]]'a gönderilmez, bağlantının DNS sunucuları yerine kullanılır. [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/issues/1366 NetworkManager hatası 1366] ve [https://github.com/systemd/systemd/issues/33754 systemd hatası 33754] bölümüne bakın.

##### Bir Bağlantıda Özel DNS Sunucuları Ayarlama

###### Bir Bağlantıda Özel DNS Sunucuları Ayarlama (GUI)

Yapılandırma, kullanılan ön uç türüne bağlıdır; genellikle applet'e sağ tıklayıp, bir profili düzenlemek (veya oluşturmak) ve ardından DHCP türünü 'Otomatik (adresleri belirt)' olarak seçmek içerir. DNS adreslerini girmeniz gerekir ve genellikle şu formda olur: `127.0.0.1, 'DNS-server-one', ...`.

###### Bir Bağlantıda Özel DNS Sunucuları Ayarlama (nmcli / bağlantı dosyası)

Bağlantı başına DNS Sunucuları ayarlamak için, [[#Bağlantı Düzenleme|bağlantı ayarlarında]] `ipv4.dns` ve `ipv6.dns` ayarlarını (ve bunlara karşılık gelen `dns-search` ve `dns-options`) değiştirin.

`method` ayarı `auto` olarak ayarlanmışsa (DHCP/RA kullanıyorsanız), `ignore-auto-dns` ayarını `yes` olarak ayarlamanız gerekir.

DNS over TLS kullanmak için ([[#systemd-resolved|systemd-resolved gerektirir]]), DNS sunucularını `dns='ip.address'#'servername';` sözdizimini kullanarak belirtin ve ayrıca `connection.dns-over-tls` ayarını `2` olarak ayarlayın. Örneğin, Quad9 kullanmak için:
```ini
...
[connection]
...
dns-over-tls=2
[ipv4]
...
dns=9.9.9.9#dns.quad9.net;149.112.112.112#dns.quad9.net;
ignore-auto-dns=true
[ipv6]
...
dns=2620:fe::fe#dns.quad9.net;2620:fe::9#dns.quad9.net;
ignore-auto-dns=true
```

> **Not:** Bu örnek Quad9 kullanır. Güvendiğiniz bir DNS çözücüyle değiştirin. [[Alan Adı Çözümleme#Üçüncü taraf DNS hizmetleri]] bölümüne bakın.

#### /etc/resolv.conf

NetworkManager'ın `/etc/resolv.conf` yönetim modu `main.rc-manager` ayarı ile yapılandırılır. `networkmanager` paketi, upstream varsayılanı `auto` yerine `symlink` olarak ayarlar. Ayar ve değerleri `man 5 NetworkManager.conf` sayfasında belgelenmiştir.

> **İpucu:** openresolv kullanmak, NetworkManager'ın diğer 'resolvconf' destekleyen yazılımlarla birlikte çalışmasına veya örneğin, koşullu yönlendirme için yerel bir DNS önbellekleyici ve split-DNS çözücü çalıştırmasına olanak tanır, bunun için openresolv'ın bir [[openresolv#Aboneler|abonesi]] vardır. Ancak NetworkManager'ın openresolv ile birlikte kullanıldığında koşullu yönlendirme [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/issues/153 henüz tam olarak desteklenmediğine] dikkat edin.

NetworkManager ayrıca, ağ değişikliklerinden sonra `/etc/resolv.conf` dosyasını değiştirmek için olay tetikleyici betikler (dispatcher scripts) aracılığıyla kancalar sunar. Daha fazla bilgi için [[#NetworkManager Dağıtıcısı ile Ağ Hizmetleri]] ve `man 8 NetworkManager` sayfasına bakın.

> **Not:**
> * NetworkManager [[#dnsmasq|dnsmasq]] veya [[#systemd-resolved|systemd-resolved]] kullanacak şekilde yapılandırılmışsa, uygun döngü adresleri `/etc/resolv.conf` dosyasına yazılır.
> * NetworkManager'ın `/etc/resolv.conf` dosyasına yazdığı veya yazacağı `resolv.conf` dosyası `/run/NetworkManager/resolv.conf` adresinde bulunabilir.
> * Elde edilen ad sunucuları ve arama alanları ile bir `resolv.conf` dosyası `/run/NetworkManager/no-stub-resolv.conf` adresinde bulunabilir.

##### Yönetilmeyen /etc/resolv.conf

NetworkManager'ın `/etc/resolv.conf` dosyasına dokunmasını durdurmak için, `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile `main.dns=none` seçeneğini ayarlayın:
```ini
[main]
dns=none
```

> **İpucu:** Ayrıca `main.systemd-resolved=false` ayarlamak isteyebilirsiniz, böylece NetworkManager DNS yapılandırmasını [[systemd-resolved]]'a göndermez.

> **Not:** [[#DNS Önbelleğe Alma ve Koşullu Yönlendirme]] bölümüne bakın, {{ic|1=main.dns=none}} kullanmak yerine diğer DNS arka uçları gibi [[dnsmasq]] ve [[systemd-resolved]] kullanmak için NetworkManager'ı yapılandırmak için.

Bundan sonra `/etc/resolv.conf` bozuk bir sembolik bağlantı olabilir, bunu kaldırmanız gerekir. Ardından, yeni bir `/etc/resolv.conf` dosyası oluşturun.

##### openresolv Kullanma

> **Not:** NetworkManager, {{Pkg|systemd-resolvconf}} paketi tarafından sağlanan [[systemd-resolved]]'ın 'resolvconf' arayüzünü ({{man|1|resolvectl|COMPATIBILITY WITH RESOLVCONF(8)}}) desteklemez.
> * [[systemd-resolved]] kullanırken `main.rc-manager=resolvconf` ayarlamayın, bunun yerine [[systemd-resolved#DNS|/etc/resolv.conf sembolik bağlantısının doğru şekilde oluşturulduğundan]] veya [[#systemd-resolved|NetworkManager'ı açıkça systemd-resolved kullanacak şekilde yapılandırdığından]] emin olun.
> * systemd-resolved kullanılmadığında {{Pkg|systemd-resolvconf}} paketinin kurulmamış olduğundan emin olun. {{ic|systemd-resolved.service}} başlatılmadığı sürece, sadece NetworkManager'ı değil, resolvconf kullanan tüm ağ yazılımlarını bozar.

NetworkManager'ı [[openresolv]] kullanacak şekilde yapılandırmak için, `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile `main.rc-manager=resolvconf` seçeneğini ayarlayın:
```ini
[main]
rc-manager=resolvconf
```

### Güvenlik Duvarı

[[Firewalld#NetworkManager ile bölgeleri yönetme|Bağlantınıza göre bir firewalld bölgesi]] atayabilirsiniz. Örneğin, iş yerindeyken kısıtlayıcı bir güvenlik duvarı ve evdeyken daha az kısıtlayıcı bir tane.

Bu, [[#NetworkManager Dağıtıcısı ile Ağ Hizmetleri|NetworkManager dağıtıcısı]] ile de yapılabilir.

## NetworkManager Dağıtıcısı ile Ağ Hizmetleri

Bazı ağ hizmetlerini, NetworkManager bir arayüz getirdiğinde çalıştırmak istemezsiniz. NetworkManager, bir ağa bağlandığınızda hizmetleri başlatmanıza ve bağlantıyı kestiğinizde durdurmanıza olanak tanır (örneğin [[NFS]], [[SMB]] ve [[NTPd]] kullanırken).

Bu özelliği etkinleştirmek için `NetworkManager-dispatcher.service` servisini [[etkinleştirin]] ve [[başlatın]].

Servis etkinleştirildikten sonra, betikler `/etc/NetworkManager/dispatcher.d` dizinine eklenebilir.

Betiklerin sahibi '''root''' olmalıdır, aksi takdirde dağıtıcı bunları çalıştırmaz. Ek güvenlik için, grubu da kök olarak ayarlayın:
```bash
# chown root:root /etc/NetworkManager/dispatcher.d/10-script.sh
```

Dosyanın [[çalıştırılabilir]] olduğundan emin olun.
Betikler bağlantı zamanında alfabetik sırayla ve bağlantı kesildiğinde ters alfabetik sırayla çalıştırılır. Hangi sırada geldiklerini sağlamak için, betiğin adından önce sayısal karakterler kullanmak yaygındır (örneğin `10-portmap` veya `30-netfs` (bu, 'portmapper' NFS montajlarının denenmeden önce yukarıda olduğundan emin olur)).

Betikler aşağıdaki argümanları alır:
* '''Arayüz adı:''' örneğin `eth0`
* '''Eylem:''' `up`, `down`, `vpn-up`, `vpn-down`, ... (tam liste için `man 8 NetworkManager-dispatcher` sayfasına bakın)

> **Uyarı:** Yabancı veya kamuya açık ağlara bağlanyorsanız, başlattığınız hizmetlerin ve onlara bağlanmaları için beklediğiniz sunucuların ne olduğuna dikkat edin. Kamuya açık bir ağa bağlanırken yanlış hizmetleri başlatarak bir güvenlik açığı yaratabilirsiniz.

### Dağıtıcı Zaman Aşımından Kaçınma

Yukarıdakiler çalışıyorsa, bu bölüm ilgili değildir. Ancak, daha uzun süren dağıtım betiklerinin yürütülmesiyle ilgili genel bir sorun vardır. Başlangıçta yalnızca üç saniyelik bir iç zaman aşımı kullanılıyordu. Çağrılan betik zamanında tamamlanmazsa, öldürülürdü. Daha sonra zaman aşımı yaklaşık 20 saniyeye uzatıldı (daha fazla bilgi için [https://bugzilla.redhat.com/show_bug.cgi?id=982734 Hata Takipçisi] bölümüne bakın). Zaman aşımı hâlâ sorun yaratıyorsa, bir [[drop-in dosyası]] kullanarak `NetworkManager-dispatcher.service`'in çıkışından sonra aktif kalmasını sağlayabilirsiniz:
```ini
[Service]
RemainAfterExit=yes
```

Şimdi değiştirilen `NetworkManager-dispatcher` servisini başlatın ve etkinleştirin.

> **Uyarı:** `RemainAfterExit` satırını eklemek, dağıtıcının kapanmasını önler. Ne yazık ki, dağıtıcının '''kapanması''' gerekir, aksi takdirde betiklerinizi tekrar çalıştıramaz. Bu, dağıtıcının zaman aşımına uğramasını önler, ancak aynı zamanda kapanmaz, bu da betiklerin yalnızca önyükleme başına bir kez çalışacağı anlamına gelir. Bu yüzden, zaman aşımı kesinlikle bir sorun yaratmadığı sürece satırı eklemeyin.

### Dağıtıcı Örnekleri

#### Otomatik Olarak Saat Dilimini Ayarlama

Bir [[#NetworkManager Dağıtıcısı ile Ağ Hizmetleri|NetworkManager dağıtıcı betiği]] oluşturun ve [[çalıştırılabilir]] yapın:
```bash
#!/bin/sh
case "$2" in
    up)
        timedatectl set-timezone "$(curl --fail https://ipapi.co/timezone)"
    ;;
esac
```

> **İpucu:** `up` yerine `connectivity-change` kullanmak, [[OpenConnect]] gibi istemcilerle bir VPN'e bağlandığınızda saat dilimi değişikliklerini önleyebilir.

Alternatif olarak, `tzupdate` aracı IP adresinin coğrafi konumuna göre saat dilimini otomatik olarak ayarlar. Üretimde hangi API'yi kullanacağınızı karar vermenize yardımcı olabilir [https://medium.com/@ipdata_co/what-is-the-best-commercial-ip-geolocation-api-d8195cda7027 popüler IP coğrafi konumlandırma API'lerinin karşılaştırması].

#### sshfs ile Uzak Dizin Montajı

Betik çok kısıtlı bir ortamda çalıştırıldığından, SSH aracınıza bağlanmak için `SSH_AUTH_SOCK`'u dışa aktarmanız gerekir. Bunu başarmak için farklı yollar vardır, daha fazla bilgi için [https://bbs.archlinux.org/viewtopic.php?pid=1042030#p1042030 bu mesaj] bölümüne bakın. Aşağıdaki örnek [[GNOME Keyring]] ile çalışır ve kilidi açılmamışsa şifrenizi ister. NetworkManager otomatik olarak oturum açarken bağlanırsa, muhtemelen 'gnome-keyring' henüz başlamamıştır ve dışa aktarma başarısız olur (bu yüzden uyku). Eşleşecek {{ic|UUID}} `nmcli connection status` veya `nmcli connection list` komutuyla bulunabilir.
```bash
#!/bin/sh
USER='username'
REMOTE='user@host:/remote/path'
LOCAL='/local/path'
interface=$1 status=$2
if [ "$CONNECTION_UUID" = "uuid" ]; then
  case $status in
    up)
      # sleep 10
      SSH_AUTH_SOCK=$(find /tmp -maxdepth 1 -type s -user "$USER" -name 'ssh')
      export SSH_AUTH_SOCK
      su "$USER" -c "sshfs $REMOTE $LOCAL"
      ;;
    down)
      fusermount -u "$LOCAL"
      ;;
  esac
fi
```

#### SMB Paylaşımlarının Montajı

Bazı [[SMB]] paylaşımları yalnızca belirli ağlarda veya konumlarda (örneğin evde) kullanılabilir. Geçerli konumunuza göre yalnızca SMB paylaşımlarını montajlamak için dağıtıcıyı kullanabilirsiniz.

Aşağıdaki betik, belirli bir ağa bağlandığımızı kontrol eder ve buna göre paylaşımları montajlar:
```bash
#!/bin/sh
# Terminalde "nmcli connection show" komutuyla bağlantı UUID'sini bulun.
# Tüm NetworkManager bağlantı türleri desteklenir: kablosuz, VPN, kablolu...
if [ "$2" = "up" ]; then
  if [ "$CONNECTION_UUID" = "uuid" ]; then
    mount /your/mount/point & 
    # ihtiyaç duyduğunuz kadar fazla paylaşım ekleyin
  fi
fi
```

Aşağıdaki betik, belirli bir ağdan yazılım tarafından başlatılan bir bağlantıyı kesmeden önce tüm SMB paylaşımlarını montajdan çıkarır:
```bash
#!/bin/sh
if [ "$CONNECTION_UUID" = "uuid" ]; then
  umount -a -l -t cifs
fi
```

> **Not:** Bu betiğin yukarıda gösterildiği gibi `pre-down.d` alt dizininde olduğundan emin olun, aksi takdirde herhangi bir bağlantı durumu değişikliğinde tüm paylaşımları montajdan çıkarır.

Aşağıdaki betik, belirli bir ağdan beklenmedik bir şekilde bağlantıyı kestikten sonra tüm SMB paylaşımlarını montajdan çıkarmayı dener:
```bash
#!/bin/sh
if [ "$CONNECTION_UUID" = "uuid" ]; then
  if [ "$2" = "down" ]; then
    umount -a -l -t cifs
  fi
fi
```

> **Not:**
> * NetworkManager 0.9.8'den beri, 'pre-down' ve 'down' olayları kapatma veya yeniden başlatma sırasında yürütülmez, daha fazla bilgi için [https://bugzilla.gnome.org/show_bug.cgi?id=701242 bu hata raporu] bölümüne bakın.
> * Önceki 'umount' betikleri hâlâ montajı gerçekten kullanan uygulamaların 'asılı' kalmasına yatkındır.

Alternatif olarak, [[NFS#NetworkManager dağıtıcısı kullanma]] bölümünde görülen betiği kullanabilirsiniz:
```bash
#!/bin/sh
# Terminalde "nmcli con show" komutuyla bağlantı UUID'sini bulun.
# Tüm NetworkManager bağlantı türleri desteklenir: kablosuz, VPN, kablolu...
WANTED_CON_UUID="CHANGE-ME-NOW-9c7eff15-010a-4b1c-a786-9b4efa218ba9"
if [ "$CONNECTION_UUID" = "$WANTED_CON_UUID" ]; then
    # Betik parametresi $1: ağ arayüzü adı, kullanılmaz
    # Betik parametresi $2: dağıtılan olay
    case "$2" in
        "up")
            mount -a -t cifs
            ;;
        "down"|"pre-down"|"vpn-pre-down")
            umount -l -a -t cifs >/dev/null
            ;;
    esac
fi
```

> **Not:** Bu betik `noauto` seçeneği olan montajları yoksayar, dağıtıcının bu montajları yönetmesine izin vermek için bu montaj seçeneğini kaldırın veya `auto` kullanın.

`pre-down` olaylarını yakalamak için `/etc/NetworkManager/dispatcher.d/pre-down/` içine bir sembolik bağlantı oluşturun:
```bash
# ln -s ../30-smb.sh /etc/NetworkManager/dispatcher.d/pre-down.d/30-smb.sh
```

#### NFS Paylaşımlarının Montajı

[[NFS#NetworkManager dağıtıcısı kullanma]] bölümüne bakın.

#### Dağıtıcıyı Kullanarak Kablolu Bağlantı Takıldığında Kablosuzu Otomatik Olarak Kapatma

Fikir, yalnızca LAN kablosu çıkarıldığında (örneğin bir dizüstü bilgisayar dock'undan ayırdığınızda) Wi-Fi'yi açmak ve LAN kablosu tekrar takıldığında Wi-Fi'nin otomatik olarak devre dışı bırakılmasıdır.

Aşağıdaki dağıtıcı betiğini oluşturun [https://superuser.com/questions/233448/disable-wlan-if-wired-cable-network-is-available], {{ic|'Your_Ethernet_Interface'}} yerine ethernet arayüzünüzün cihaz adını koyun.

> **Not:** Arayüzlerin bir listesini [[#nmcli örnekleri|nmcli]] ile alabilirsiniz (`nmcli d | grep ethernet`). Ethernet arayüzleri {{ic|en}} veya {{ic|eth}} ile başlar, örneğin {{ic|enp0s5}} veya {{ic|eth0}}.

Betik [[çalıştırılabilir]] hale getirildiğinden emin olun. Çalıştığını doğrulamak için `NetworkManager.service`'i [[yeniden başlatın]], `ip a` komutunu çalıştırın ve {{ic|wlp3s0}} (veya Wi-Fi arayüzünüzün adı) durumunun {{ic|state DOWN}} olduğunu kontrol edin. Beklenmedik davranışlarla karşılaşırsanız, `NetworkManager-dispatcher.service`'in [[günlüğünü]] kontrol edin.
```bash
#!/bin/sh
LOG_PREFIX="WiFi Otomatik Aç/Kapa"
ETHERNET_INTERFACE="Your_Ethernet_Interface"
if [ "$1" = "$ETHERNET_INTERFACE" ]; then
    case "$2" in
        up)
            echo "$LOG_PREFIX ethernet up"
            nmcli radio wifi off
            ;;
        down)
            echo "$LOG_PREFIX ethernet down"
            nmcli radio wifi on
            ;;
    esac
elif [ "$(nmcli -g GENERAL.STATE device show $ETHERNET_INTERFACE)" = "20 (unavailable)" ]; then
    echo "$LOG_PREFIX fail-safe"
    nmcli radio wifi on
fi
```

> **Not:** LAN arayüzü bilgisayar son açıkken bağlıyken ve bilgisayar kapalıyken çıkarıldığında ortaya çıkan bir durum için bir fail-safe vardır. Bu, bilgisayar tekrar açıldığında radyonun hâlâ kapalı olacağı ve LAN arayüzü bağlantısı kesik olduğunda ağınız olmayacağı anlamına gelir.

#### Dağıtıcıyı Kullanarak Ağ Bağlantısı Kurulduktan Sonra Otomatik Olarak VPN'ye Bağlanma

Bu örnekte, belirli bir Wi-Fi ağına bağlandıktan sonra daha önce tanımlanmış bir VPN bağlantısına otomatik olarak bağlanmak istiyoruz. İlk adım, ağa bağlandığımızda ne yapılacağını tanımlayan bir dağıtım betiği oluşturmaktır.

> **Doğruluk:** {{ic|iwgetid}} olmadan betikleme de çalışır ve daha güvenilir olabilir?|bölüm=Otomatik VPN dağıtım betiği için düzeltmeler

> **Not:** Bu betik, {{ic|iwgetid}} kullanmak için {{Pkg|wireless_tools}} paketine ihtiyaç duyar.

```bash
#!/bin/sh
VPN_NAME="NetworkManager'da tanımlanan VPN bağlantısının adı"
ESSID="Wi-Fi ağı ESSID'si (bağlantı adı değil)"
interface=$1 status=$2
case $status in
  up|vpn-down)
    if iwgetid | grep -qs ":\"$ESSID\""; then
      nmcli connection up id "$VPN_NAME"
    fi
    ;;
  down)
    if iwgetid | grep -qs ":\"$ESSID\""; then
      if nmcli connection show --active | grep "$VPN_NAME"; then
        nmcli connection down id "$VPN_NAME"
      fi
    fi
    ;;
esac
```

Tüm Wi-Fi ağları için otomatik olarak VPN'ye bağlanmayı denemek istiyorsanız, ESSID tanımını şu şekilde kullanabilirsiniz: `ESSID=$(iwgetid -r)`. Betiğin izinlerini [[#NetworkManager Dağıtıcısı ile Ağ Hizmetleri|buna göre]] ayarlamayı unutmayın.

Yukarıdaki betikle bağlanmayı denemek hâlâ 'geçerli VPN gizli bilgileri yok' hatası vererek başarısız olabilir, çünkü [https://developer.gnome.org/NetworkManager/0.9/secrets-flags.html gizli bilgilerin nasıl saklandığına] bağlıdır. Neyse ki, yukarıdaki betiğe VPN şifrenize erişim sağlamak için farklı seçenekler vardır.
1: Bunlardan biri, gizli bilgileri anahtarlık yerine NetworkManager'ın kendisinin saklamasını sağlamak için VPN bağlantı yapılandırma dosyasını düzenlemektir [https://bugzilla.redhat.com/show_bug.cgi?id=710552 anahtarlık kök için erişilemez olur]: {{ic|/etc/NetworkManager/system-connections/'VPN bağlantınızın adı'.nmconnection}} dosyasını açın ve {{ic|password-flags}} ve {{ic|secret-flags}} değerlerini {{ic|1}}'den {{ic|0}}'a değiştirin.
Bunun tek başına işe yaramadığıysa, dağıtıcı betiğiyle aynı izinlere ve sahipliğe sahip güvenli bir konumda aşağıdaki içeriğe sahip bir {{ic|passwd-file}} oluşturmanız gerekebilir:
```bash
vpn.secrets.password:YOUR_PASSWORD
```

Betik buna göre değiştirilmelidir, böylece şifreyi dosyadan alır:
```bash
#!/bin/sh
VPN_NAME="NetworkManager'da tanımlanan VPN bağlantısının adı"
ESSID="Wi-Fi ağı ESSID'si (bağlantı adı değil)"
interface=$1 status=$2
case $status in
  up|vpn-down)
    if iwgetid | grep -qs ":\"$ESSID\""; then
      nmcli connection up id "$VPN_NAME" passwd-file /path/to/passwd-file
    fi
    ;;
  down)
    if iwgetid | grep -qs ":\"$ESSID\""; then
      if nmcli connection show --active | grep "$VPN_NAME"; then
        nmcli connection down id "$VPN_NAME"
      fi
    fi
    ;;
esac
```

2: Alternatif olarak, {{ic|password-flags}}'i değiştirin ve şifreyi doğrudan yapılandırma dosyasına ekleyerek {{ic|vpn-secrets}} bölümünü ekleyin:
```ini
[vpn]
....
password-flags=0
[vpn-secrets]
password='your_password'
```

> **Not:** Artık NetworkManager bağlantı düzenleyicisini yeniden açıp VPN şifrelerini/gizli bilgilerini tekrar kaydetmeniz gerekebilir.

#### Dağıtıcıyı Kullanarak VPN Sağlayıcı Bağlantılarında IPv6'yı Devre Dışı Bırakma

Birçok [[:Category:VPN sağlayıcılar|ticari VPN sağlayıcısı]] yalnızca IPv4'ü destekler. Bu, tüm IPv6 trafiğinin VPN'yi atlayacağı ve etkili olarak işe yaramaz hale geleceği anlamına gelir. Bunu önlemek için, dağıtım betiği kullanılarak bir VPN bağlantısı etkin olduğu sürece tüm IPv6 trafiği devre dışı bırakılabilir.
```bash
#!/bin/sh
case "$2" in
	vpn-up)
		echo 1 > /proc/sys/net/ipv6/conf/all/disable_ipv6
		;;
	vpn-down)
		echo 0 > /proc/sys/net/ipv6/conf/all/disable_ipv6
		;;
esac
```

Alternatif olarak, dağıtıcı, cihazın IPv6 modunu geçici olarak {{ic|link-local}} olarak ayarlamak için kullanılabilir. Bu, NetworkManager log spam'ını IPv6 devre dışı bırakıldığında önlemeye yardımcı olur. Bu betik, birden fazla cihaz veya bağlantı IPv6 bağlantısı sağlıyorsa çalışmaz, ancak birden fazla cihaza yinelemek için uyarlanabilir. Herhangi bir bağlantı değişikliğinin ({{man|1|nmcli}} veya bir [[masaüstü ortamı]] kullanarak) cihaza tüm bağlantıyı yeniden uygulayacağını ve IPv6'yı yeniden etkinleştireceğini (eğer bağlantıda etkinse) unutmayın.
```bash
#!/bin/sh
case "$2" in
	vpn-up)
		nmcli device modify "${DEVICE_IFACE}" ipv6.method link-local
		;;
	vpn-down)
		nmcli device reapply "${DEVICE_IFACE}"
		;;
esac
```

#### OpenNTPD

[[OpenNTPD#NetworkManager dağıtıcısı kullanma]] bölümüne bakın.

#### DHCP ile Alınan NTP Sunucularını systemd-timesyncd ile Dinamik Olarak Ayarlama

Farklı ağlar arasında (örneğin bir şirketin LAN'ı, evdeki Wi-Fi, çeşitli diğer Wi-Fi'ler) dolaşırken, timesyncd tarafından kullanılan NTP sunucusunu DHCP tarafından sağlananlara ayarlamak isteyebilirsiniz. Ancak, NetworkManager kendisi, systemd-timesyncd ile NTP sunucularını ayarlamak için iletişim kuramaz.

Dağıtıcı bunu aşabilir.
[[Oluşturun]] systemd-timesyncd yapılandırmanız için geçersiz kılma dizini {{ic|/etc/systemd/timesyncd.conf.d}} zaten mevcut değilse. {{ic|/etc/NetworkManager/dispatcher.d}} içine aşağıdakileri koyun:
```bash
#!/bin/sh
[ -z "$CONNECTION_UUID" ] && exit 0
INTERFACE="$1"
ACTION="$2"
case $ACTION in
up | dhcp4-change | dhcp6-change)
	[ -n "$DHCP4_NTP_SERVERS" ] || exit 0
	mkdir -p /etc/systemd/timesyncd.conf.d
	cat <<-THE_END >"/etc/systemd/timesyncd.conf.d/${CONNECTION_UUID}.conf"
		[Time]
		NTP=$DHCP4_NTP_SERVERS
	THE_END
	systemctl restart systemd-timesyncd.service
	;;
down)
	rm -f "/etc/systemd/timesyncd.conf.d/${CONNECTION_UUID}.conf"
	systemctl restart systemd-timesyncd.service
	;;
esac
```

NetworkManager yeni bir ağ bağlantısı kurduğunda ({{ic|ACTION=up}}) veya mevcut bir bağlantı için bazı güncellemeler aldığında ({{ic|ACTION=dhcp4-change}} veya {{ic|ACTION=dhcp6-change}}) ve sağlanan bağlantı verileri NTP sunucusu(ları) hakkında bilgi içerdiğinde ({{ic|DHCP4_NTP_SERVERS}}), bağlantıya özel bir geçersiz kılma yapılandırma dosyası {{ic|/etc/systemd/timesyncd.conf.d}} dizinine yazılır, sağlanan NTP sunucusu(ları) içerir. Bir bağlantı kesildiğinde ({{ic|ACTION=down}}) bağlantıya özel geçersiz kılma dosyası kaldırılır. systemd-timesyncd yapılandırmasında her değişiklikten sonra bu hizmet, güncellenmiş yapılandırmayı almak için yeniden başlatılır. Farklı NTP sunucu adlarının yapılandırmada üzerine yazılmaması için bağlantıya özel yapılandırma dosyalarının kullanılması kasıtlıdır çünkü {{ic|up}}, {{ic|dhcp4-change}}, {{ic|dhcp6-change}} ve {{ic|down}} eylemleri rastgele bir sırayla gelebilir.

## Test Etme

NetworkManager applet'leri oturum açarken yüklenmek üzere tasarlanmıştır, bu yüzden çoğu kullanıcı için daha fazla yapılandırma gerekmez. Daha önceki ağ ayarlarınızı devre dışı bıraktıysanız ve ağa bağlantınızı kestiyse, NetworkManager'ın çalışıp çalışmayacağını test edebilirsiniz. İlk adım, `NetworkManager.service` servisini [[başlatmak]]tir.

Bazı applet'ler, NetworkManager applet'inin uygulama menüsünden yüklenmesini sağlayan bir {{ic|.desktop}} dosyası sağlar. Eğer sağlamıyorsa, kullanacağınız komutu keşfetmeniz veya oturumu kapatıp tekrar oturum açmanız gerekebilir. Applet başladıktan sonra, muhtemelen bir DHCP sunucusuyla otomatik yapılandırma için ağ bağlantılarını yoklamaya başlayacaktır.

XDG uyumlu olmayan pencere yöneticilerinde GNOME applet'ini başlatmak için (örneğin [[awesome]]):
```bash
nm-applet --sm-disable &
```

Statik IP adresleri için, NetworkManager'ın bunları anlamasını yapılandırmanız gerekir. Süreç genellikle applet'e sağ tıklayıp 'Bağlantıları Düzenle' gibi bir şey seçmeyi içerir.

## İpuçları ve Püf Noktaları

### Şifrelenmiş Wi-Fi Şifreleri

Varsayılan olarak, NetworkManager şifreleri `/etc/NetworkManager/system-connections/` adresindeki bağlantı dosyalarında düz metin olarak saklar. Saklanan şifreleri yazdırmak için aşağıdaki komutu kullanın:
```bash
# grep -r '^psk=' /etc/NetworkManager/system-connections/
```

Şifreler dosya sisteminde kök kullanıcısı tarafından ve GUI üzerinden ayarlara erişebilen kullanıcılar tarafından erişilebilir.

Bağlantıları her kullanıcı için ayarlamak zorunda kalmadan şifreleri anahtarlıkta şifrelenmiş formda kaydetmek tercih edilir.

Şifreleri okumak ve yazmak için bir gizli bilgi aracının (secret agent) başlatılması gerekir. Bunlardan biri olabilir:
* `nmcli` komutu ile `--ask` seçeneği
* [[#Ön Uçlar]] bölümündeki grafiksel arayüzlerden biri

Bunlardan hiçbirini mevcut hale getirmezseniz, `no secrets: No agents were available for this request.` hatasıyla kimlik doğrulama başarısız olur.

#### GNOME Keyring Kullanma

Anahtarlık daemon'unun başlatılması ve anahtarlık kilidinin açılması gerekir.

Ayrıca, NetworkManager'ın şifreyi tüm kullanıcılar için saklamaması için yapılandırılması gerekir. GNOME'un `network-manager-applet` paketini kullanarak bir terminalden `nm-connection-editor` komutunu çalıştırın, bir ağ bağlantısını seçin, 'Düzenle'ye tıklayın, 'Wi-Fi Güvenliği' sekmesini seçin ve şifre simgesinin sağ tarafındaki simgeye tıklayıp 'Şifreyi yalnızca bu kullanıcı için sakla' seçeneğini işaretleyin.

#### KDE Wallet Kullanma

KDE'nin `plasma-nm` paketini kullanarak applet'e tıklayın, sağ üstteki 'Ayarlar' simgesine tıklayın, bir ağ bağlantısına tıklayın, 'Genel yapılandırma' sekmesinde 'Tüm kullanıcılar bu ağa bağlanabilir' seçeneğini işareti kaldırın. Seçenek işaretliyse, anahtarlık daemon'u çalışsa bile şifreler hâlâ düz metin olarak saklanır.

Seçenek daha önce seçilmişti ve işareti kaldırırsanız, şifrenin dosyadan kaybolması için 'sıfırla' seçeneğini kullanmanız gerekebilir. Alternatif olarak, bağlantıyı önce silin ve yeniden ayarlayın.

### İnternet Bağlantısını Wi-Fi Üzerinden Paylaşma

Birkaç tıkla internet bağlantınızı (örneğin 3G veya kablolu) paylaşabilirsiniz. Lütfen bir [[güvenlik duvarı]]'nın internet paylaşımını etkileyebileceğini unutmayın.

Bir [[Yazılım Erişim Noktası#Wi-Fi cihazının AP modunu desteklemesi gerekir]] bölümünde ayrıntılar için AP modunu destekleyen bir Wi-Fi kartına ihtiyacınız vardır.

Bağlantıyı gerçekten paylaşmak için `dnsmasq` paketini [[kurun]]. NetworkManager, DHCP sunucusu olarak `dnsmasq.service`'den bağımsız olarak kendi dnsmasq örneğini başlatır. Ayrıntılar için [[#dnsmasq]] bölümüne bakın.

Paylaşılan bağlantıyı oluşturun:
* Applet'e tıklayın ve 'Yeni kablosuz ağ oluştur' seçeneğini seçin.
* Sihirbazı izleyin (WPA2 veya daha yüksek seçin, en az 8 karakter uzunluğunda bir şifre kullanın, daha düşük uzunluklar başarısız olur).
  * Wi-Fi modu olarak [[Fedora:Features/RealHotspot|Hotspot]] veya Ad-hoc seçin.

Bağlantı kaydedilir ve bir sonraki ihtiyacınız olduğunda saklanır.

> **Not:** Android Ad-hoc ağlara bağlanmayı desteklemez. Android ile bir bağlantı paylaşmak için altyapı modunu kullanın (yani Wi-Fi modunu "Hotspot" olarak ayarlayın).

### İnternet Bağlantısını Ethernet Üzerinden Paylaşma

Senaryo: Cihazınızın internet bağlantısı Wi-Fi üzerinden ve diğer cihazlara Ethernet üzerinden internet bağlantısını paylaşmak istiyorsunuz.

Gereksinimler:
* Bağlantıyı gerçekten paylaşmak için `dnsmasq` ve `nm-connection-editor` paketlerini [[kurun]]. NetworkManager, DHCP sunucusu olarak `dnsmasq.service`'den bağımsız olarak kendi dnsmasq örneğini başlatır. Ayrıntılar için [[#dnsmasq]] bölümüne bakın.
* İnternet bağlantılı cihazınız ve diğer cihazlar uygun bir Ethernet kablosuyla (bu genellikle çapraz kablo veya aralarında bir anahtar anlamına gelir) bağlıdır.
* İnternet paylaşımı bir [[güvenlik duvarı]] tarafından engellenmemiştir.

Adımlar:
* Terminalden `nm-connection-editor` komutunu çalıştırın.
* Yeni bir Ethernet bağlantısı ekleyin.
* Anlamlı bir ad verin. Örneğin "Paylaşılan İnternet"
* "IPv4 Ayarları" bölümüne gidin.
* "Yöntem:" için "Diğer bilgisayarlara paylaşılan" seçeneğini seçin.
* Kaydet

Artık NetworkManager'da "Paylaşılan İnternet" altında Yerel Bağlantılar için yeni bir seçenek olmalıdır.

### Bir cron işi veya betik içinde ağın açık olup olmadığını kontrol etme

> **Güncel Değil:** `nm-tool`, NetworkManager'dan uzun süredir kaldırıldı [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/commit/bb8c75bd536d4f8fb80a4366025a279078f0ec81]. `nmcli` kullanılmalıdır.

Bazı `cron` işleri ağın açık olmasına ihtiyaç duyar. Ağ kapalıyken bu işleri çalıştırmaktan kaçınmak isteyebilirsiniz. Bunu başarmak için, NetworkManager'ın `nm-tool`'unu sorgulayan ve ağ durumunu kontrol eden bir '''if''' testi ekleyin. Burada gösterilen test, herhangi bir arayüz açık olduğunda başarılı olur ve hepsi kapalı olduğunda başarısız olur. Bu, kabloluya takılı olabilen, kablosuz olabilen veya ağdan kopuk olabilen dizüstü bilgisayarlar için uygundur.
```bash
if [ $(nm-tool|grep State|cut -f2 -d' ') == "connected" ]; then
    #Ağ çevrimiçi olduğunda yapmak istediğiniz her şey
else
    #Ağ çevrimdışı olduğunda yapmak istediğiniz her şey - ayrıca yukarıdaki bu ve else isteğe bağlıdır
fi
```

Bu, F-Prot virüs tarayıcısı imza güncellemesi için `fpupdate` çalıştıran bir `cron.hourly` betiği için yararlıdır, bir örnek olarak. Biraz değiştirmeyle başka bir şekilde yararlı olabilir, `nm-tool` çıktısının çeşitli bölümlerini kullanarak ağları ayırt etmek; örneğin, etkin kablosuz ağ bir yıldızla gösterildiğinden, ağ adını ve ardından değişmez bir yıldızı arayabilirsiniz.

### Önyüklemede Şifreli Ağa Bağlanma

Varsayılan olarak, NetworkManager önyüklemede şifre gerektiren ağlara otomatik olarak bağlanmaz. Bunun nedeni, bu bağlantıları varsayılan olarak kullanıcıya kilitlemesi ve yalnızca oturum açtıktan sonra bağlanmasıdır. Bunu değiştirmek için aşağıdakileri yapın:
1. Panelinizdeki `nm-applet` simgesine sağ tıklayın ve Bağlantıları Düzenle seçeneğini seçin, Kablosuz sekmesini açın.
2. kullanmak istediğiniz bağlantıyı seçin ve Düzenle düğmesine tıklayın.
3. "Otomatik Bağlan" ve "Tüm kullanıcılar için kullanılabilir" kutularını işaretleyin.
4. Ek olarak, "Wi-Fi Güvenliği" altında "Tüm kullanıcılar için şifreyi sakla (şifrelenmemiş)" seçeneğinin seçildiğinden emin olun.

Tamamlamak için oturumu kapatıp tekrar oturum açın.

### KWallet ile OpenConnect Şifresi

Bağlantı zamanında her iki değeri de girebilirsiniz, {{Pkg|plasma-nm}} 0.9.3.2-1 ve üzeri doğrudan [[KWallet]]'den OpenConnect kullanıcı adı ve şifresini alabilir.

"KDE Wallet Manager"ı açın ve "Network Management|Maps" altında OpenConnect VPN bağlantınızı arayın. "Değerleri göster"e tıklayın ve anahtar "VpnSecrets" içinde kimlik bilgilerinizi şu formatta girin (kullanıcı adı ve şifreyi buna göre değiştirin):
```
form:main:username%SEP%kullanıcı_adı%SEP%form:main:password%SEP%şifre
```

Bir sonraki bağlantı kurduğunuzda, kullanıcı adı ve şifre "VPN gizli bilgileri" iletişim kutusunda görünmelidir.

### Belirli Cihazları Yoksayma

Bazen NetworkManager'ın belirli cihazları yoksaymasını ve adresler ve yollar için yapılandırma yapmaya çalışmasını isteyebilirsiniz. MAC veya arayüz adına göre cihazları hızlı ve kolayca yoksayabilirsiniz. `/etc/NetworkManager/conf.d/unmanaged.conf` içinde aşağıdakileri kullanın:
```ini
[keyfile]
unmanaged-devices=mac:00:22:68:1c:59:b1;mac:00:1E:65:30:D1:C4;interface-name:eth0
```

Dosyayı düzenledikten sonra `nmcli general reload` komutunu root olarak çalıştırın. Bundan sonra, NetworkManager ayarladığınız şeyleri değiştirmeden arayüzleri yapılandırabileceksiniz.

### MAC Adresi Rastgeleleştirme Yapılandırma

> **Birleştir:** NetworkManager/Gizlilik#MAC Rastgeleleştirme|Şimdi Gizlilik için adanmış bir alt sayfa var.

> **Not:** Bağlantıya (kararlı) ulaşmak [https://bbs.archlinux.org/viewtopic.php?id=220101] ve/veya MAC Adresine dayalı cihazları kısıtlayan veya ağ kapasitesini sınırlayan ağlara sahip olmak için MAC adresi rastgeleleştirmeyi devre dışı bırakmak gerekebilir.

MAC rastgeleleştirme, ağınızda gerçek MAC adresinizi açığa çıkarmayarak artırılmış gizlilik için kullanılabilir.

NetworkManager, tarama sırasında rastgeleleştirme ve ağ bağlantıları için iki tür MAC Adresi Rastgeleleştirme destekler. Her iki mod da `NetworkManager.conf` dosyasını değiştirmek veya `conf.d` dizininde ayrı bir yapılandırma dosyası oluşturmak yoluyla yapılandırılabilir, çünkü yukarıdaki yapılandırma dosyası NetworkManager tarafından üzerine yazılabilir.

Wi-Fi taraması sırasında rastgeleleştirme varsayılan olarak etkindir, ancak aşağıdaki satırları `NetworkManager.conf` dosyasına veya `conf.d` dizininde adanmış bir yapılandırma dosyasına ekleyerek devre dışı bırakılabilir:
```ini
[device]
wifi.scan-rand-mac-address=no
```

Ağ bağlantıları için MAC rastgeleleştirme, hem kablosuz hem de ethernet arayüzleri için farklı modlara ayarlanabilir. Farklı modlar hakkında daha fazla bilgi için [https://blogs.gnome.org/thaller/2016/08/26/mac-address-spoofing-in-networkmanager-1-4-0/ GNOME blog yazısına] bakın.
MAC rastgeleleştirme açısından en önemli modlar {{ic|stable}} ve {{ic|random}}'dir. {{ic|stable}}, yeni bir ağa bağlandığınızda rastgele bir MAC adresi oluşturur ve ikisini kalıcı olarak ilişkilendirir. Bu, her seferinde o ağa bağlandığınızda aynı MAC adresini kullanacağınız anlamına gelir. Buna karşılık, {{ic|random}} her seferinde yeni bir MAC adresi oluşturur, yeni veya daha önce bilinen bir ağ olsun. MAC rastgeleleştirmeyi `conf.d` dizininde istenen yapılandırmayı ekleyerek yapılandırabilirsiniz:
```ini
[device-mac-randomization]
# "yes" tarama için varsayılan zaten
wifi.scan-rand-mac-address=yes
[connection-mac-randomization]
# Her ethernet bağlantısı için MAC'ı rastgeleleştir
ethernet.cloned-mac-address=random
# Her Wi-Fi için rastgele bir MAC oluştur ve ikisini kalıcı olarak ilişkilendir.
wifi.cloned-mac-address=stable
```

Ağ MAC adresi rastgeleleştirmeyi istemiyorsa (örneğin, ağ rastgele MAC adreslerini beğenmiyorsa), MAC rastgeleleştirmeyi belirli bir bağlantı için yapılandırmak için [[#Bağlantı Düzenleme|bağlantıyı düzenleyin]] ve {{ic|802-11-wireless.cloned-mac-address}}'i modlardan birine (örneğin {{ic|stable}} veya {{ic|random}}) ayarlayın.

Daha fazla ayrıntı için aşağıdaki [https://blogs.gnome.org/thaller/2016/08/26/mac-address-spoofing-in-networkmanager-1-4-0/ GNOME blog yazısına] bakın.

### IPv6 Gizlilik Uzantılarını Etkinleştirme

[[IPv6#NetworkManager]] bölümüne bakın.

### Bağlantı Başına Benzersiz DUID Yapılandırma

DHCPv6 Benzersiz Tanımlayıcısı (DUID), DHCPv6 istemcisinin kendisini DHCPv6 sunucularına tanımlamak için kullandığı bir değerdir. NetworkManager 3 tür DUID destekler:
* DUID-UUID ([[RFC:6355|RFC 6355]]): Evrensel Benzersiz Tanımlayıcı (UUID) değerinden oluşturulur.
* DUID-LL ([[RFC:3315|RFC 3315]]): Bağlantı Katmanı adresinden (MAC adresi olarak da bilinir) oluşturulur.
* DUID-LLT ([[RFC:3315|RFC 3315]]): Bağlantı Katmanı adresi artı bir zaman damgasından oluşturulur.

Dahili NetworkManager DHCP istemcisi kullanılıyorsa (varsayılan), makine kimliğinden ({{ic|/etc/machine-id}}) oluşturulan küresel ve kalıcı bir DUID-UUID ile kendisini tanımlar. Bu, tüm bağlantıların aynı UUID'yi paylaşacağı anlamına gelir, bu bir gizlilik ihlali olabilir.

Neyse ki, NetworkManager bağlantı başına benzersiz DUID'ler sağlayabilir, bağlantıların sabit kimliği ve ana bilgisayara özgü benzersiz bir anahtardan türetilir. Bunu `conf.d` dizininde aşağıdaki yapılandırmayı ekleyerek etkinleştirebilirsiniz:
```ini
[connection]
ipv6.dhcp-duid=stable-uuid
```

`stable-ll` ve `stable-llt` değerleri de desteklenir. Daha fazla bilgi için `man 5 nm-settings|ipv6 setting` sayfasındaki `dhcp-duid` açıklamasını okuyun.

### Kablolu Bağlantılarla Çalışma

Varsayılan olarak, NetworkManager bulduğu her kablolu ethernet bağlantısı için bir bağlantı profili oluşturur. Bağlantı oluştururken, daha fazla Ethernet adaptörünün olup olmayacağını bilmez. Bu nedenle, ilk kablolu bağlantıyı "Kablolu bağlantı 1" olarak adlandırır. `no-auto-default` yapılandırarak (bkz. `man 5 NetworkManager.conf`) bu bağlantının oluşturulmasını önleyebilir veya basitçe silebilirsiniz. Ardından NetworkManager bu arayüz için yeniden bağlantı oluşturmayacağını hatırlar.

Bağlantıyı düzenleyebilir (ve diske kalıcı hale getirebilir) veya silebilirsiniz. NetworkManager yeni bir bağlantı oluşturmayacaktır. Ardından adını istediğiniz gibi değiştirebilirsiniz. Bu görev için `nm-connection-editor` gibi bir araç kullanabilirsiniz.

### iwd'yi Wi-Fi Arka Ucu Olarak Kullanma

> **Not:**
> * {{ic|iwd.service}}'i etkinleştirmeyin veya [[iwd]]'yi manuel olarak yapılandırmayın. NetworkManager kendisi başlatacak ve yönetecektir.
> * {{ic|iwd}}'ye geçmeden önce [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/-/issues?scope=all&utf8=%E2%9C%93&state=opened&search=iwd mevcut sorunları] göz önünde bulundurun.

[https://archive.kernel.org/oldwiki/iwd.wiki.kernel.org/networkmanager.html deneysel iwd arka ucunu] etkinleştirmek için önce `iwd` paketini [[kurun]] ve ardından aşağıdaki yapılandırma dosyasını oluşturun:
```ini
[device]
wifi.backend=iwd
```

Alternatif olarak, yalnızca `iwd` ile çalışan `NetworkManager`'ı derlemek için yapılandırılmış, ana fark `iwd`'nin gerekli olması ve `wpa_supplicant`'in derlemeden sonra kaldırılabileceği değiştirilmiş bir paket olan `networkmanager-iwd` (AUR) paketini kurabilirsiniz.

> **Not:** {{ic|iwd}}'ye geçtikten sonra [https://archive.kernel.org/oldwiki/iwd.wiki.kernel.org/networkmanager.html#converting_network_profiles mevcut NetworkManager ağ profillerini dönüştürmeniz] gerekebilir.

### Bir Ağ Ad Alanında Çalıştırma

NetworkManager'ı belirli bir cihazın (seçili uygulamalar tarafından kullanılması gereken) yönetilmesi için bir ağ ad alanında çalıştırmak istiyorsanız, cihazı ad alanına taşımadan önce aşağı alarak taşıyın:
```bash
$ ip link set dev 'MY_DEVICE' down
$ ip link set dev 'MY_DEVICE' netns 'MY_NAMESPACE'
$ ip netns exec 'MY_NAMESPACE' NetworkManager
 ...
$ ip netns exec 'MY_NAMESPACE' killall NetworkManager
```

aksi takdirde, NetworkManager daha sonra bağlantı kurmayı `device is strictly unmanaged` hatasıyla başaramaz.

### Otomatik Olarak VPN'ye Bağlanma

NetworkManager, internete bağlanıldığında, ağ bazında otomatik olarak bir VPN'ye bağlanmak üzere ayarlanabilir. VPN bağlantısı GNOME'un NetworkManager ön ucunda eklenebilir, ancak VPN'yi otomatik olarak kullanmak için `nmcli` kullanılmalıdır. Diğer ön uçların bu sınırlamaya sahip olmayabileceğine dikkat edin.

İlk olarak, VPN bağlantısının tüm kullanıcılar için kullanılabilir olduğundan emin olun. GNOME'da, bu {{ic|ayrıntılar}} sekmesinde bir kutuyu işaretlemektir. {{ic|Kimlik}} sekmesinde, şifre alanındaki sağdaki simgeye tıklayın ve {{ic|Tüm kullanıcılar için şifreyi sakla}} olarak ayarlayın.

Ardından, UUID'yi bulun ve internet bağlantısının `connection.secondaries` alanına ekleyin:
```bash
# UUID=$(nmcli --get-values connection.uuid connection show 'VPN-connection-name')
# nmcli connection modify 'Internet-connection-name' connection.secondaries "$UUID"
```

Artık NetworkManager'ı yeniden başlattığınızda ve yapılandırdığınız internet bağlantısına bağlandığınızda, otomatik olarak VPN'ye bağlanmalısınız.

## Sorun Giderme

### Şifreli Wi-Fi Ağlarına Bağlanırken Şifre İsteği Yok

Şifreli bir Wi-Fi ağına bağlanmaya çalışırken, şifre isteği gösterilmez ve bağlantı kurulmaz. Bu, anahtarlık paketi kurulmamışsa olur. Kolay bir çözüm `gnome-keyring` paketini kurmaktır. Şifrelerin şifrelenmiş formda saklanmasını istiyorsanız, `gnome-keyring-daemon`'u ayarlamak için [[GNOME Keyring]] bölümüne bakın.

### Ağ Yönetimi Devre Dışı

NetworkManager kapatıldığında ancak pid (durum) dosyası kaldırılmadığında, `Ağ yönetimi devre dışı` mesajını görürsünüz. Bu olursa, dosyayı manuel olarak kaldırın:
```bash
# rm /var/lib/NetworkManager/NetworkManager.state
```

### Dahili DHCP İstemcisiyle İlgili Sorunlar

Dahili DHCP istemcisi kullanarak bir IP adresi almakta sorun yaşıyorsanız, başka bir DHCP istemcisi kullanmayı düşünün, talimatlar için [[#DHCP İstemcisi]] bölümüne bakın. Bu geçici çözüm, eduroam gibi büyük kablosuz ağlarda sorunları çözebilir.

### dhclient ile DHCP Sorunları

DHCP üzerinden bir IP adresi almakta sorun yaşıyorsanız, `etc/dhclient.conf` dosyanıza aşağıdakileri eklemeyi deneyin:
```conf
interface "eth0" {
  send dhcp-client-identifier 01:aa:bb:cc:dd:ee:ff;
}
```

Burada {{ic|aa:bb:cc:dd:ee:ff}}, bu NIC'nin MAC adresidir. MAC adresi, `ip link show 'interface'` komutuyla `iproute2` paketinden bulunabilir.

### 3G Modem Algılanmıyor

[[Mobil Genişbant Modem#NetworkManager]] bölümüne bakın.

### Dizüstü Bilgisayarlarda WLAN'ı Kapatma

Bazen, Wi-Fi adaptörünüzü dizüstü bilgisayarınızda bir anahtarla devre dışı bıraktığınızda ve daha sonra tekrar etkinleştirmeye çalıştığınızda NetworkManager çalışmaz. Bu genellikle `rfkill` ile bir sorundur. Sürücünün `rfkill`'e kablosuz adaptörün durumu hakkında bildirim gönderip göndermediğini kontrol etmek için kullanın:
```bash
$ watch -n1 rfkill list all
```

Bir tanımlayıcı adaptörü açtıktan sonra hâlâ engelli kalırsa, manuel olarak şu komutla engeli kaldırabilirsiniz (yukarıdaki çıktının sağladığı X numarası):
```bash
# rfkill event unblock X
```

### Statik IP Adresi Ayarları DHCP'ye Dönüyor

> **Güncel Değil:** Bu bölüm [[Special:Diff/119236|2010'da]] eklendi ve eski bir `nm-applet` sürümünü tanımlıyor. 2024'te hâlâ geçerli mi?

Bilinmeyen bir hataya bağlı olarak, varsayılan bağlantıları statik IP adresine değiştirirken, `nm-applet` yapılandırma değişikliğini düzgünce saklayamaz ve otomatik DHCP'ye döner.

Bu sorunu aşmak için varsayılan bağlantıyı (`nm-applet` içinde "Auto eth0" gibi) düzenlemeniz, bağlantı adını değiştirmeniz (örneğin "my eth0"), "Tüm kullanıcılar için kullanılabilir" kutusunun işaretini kaldırmanız, istediğiniz statik IP adresi ayarlarını yapmanız ve 'Uygula'ya tıklamanız gerekir. Bu, verilen adla yeni bir bağlantı kaydeder.

Ardından, varsayılan bağlantının otomatik olarak bağlanmamasını sağlamak isteyeceksiniz. Bunu yapmak için `nm-connection-editor` komutunu çalıştırın ('root' olarak değil). Bağlantı düzenleyicisinde, varsayılan bağlantıyı (örneğin "Auto eth0") düzenleyin ve "Otomatik bağlan" seçeneğinin işaretini kaldırın. 'Uygula'ya tıklayın ve bağlantı düzenleyiciyi kapatın.

### Normal Kullanıcı Olarak Bağlantıları Düzenleyememe

[[#PolicyKit İzinlerini Ayarlama]] bölümüne bakın.

### Gizli Kablosuz Ağı Unutma

Gizli ağlar Kablosuz görünümünde seçim listesinde gösterilmediği için, GUI ile "unutulamaz" (kaldırılamaz). Aşağıdaki komutla birini silebilirsiniz:
```bash
# rm /etc/NetworkManager/system-connections/'SSID'.nmconnection
```

Bu, diğer herhangi bir bağlantı için de çalışır.

### GNOME'da VPN Çalışmıyor

NetworkManager kullanarak GNOME ile OpenConnect veya vpnc bağlantılarını ayarlarken, bazen hiçbir zaman iletişim kutusunun açılmadığını görürsünüz ve aşağıdaki hata `/var/log/errors.log` dosyasında görünür:
```log
localhost NetworkManager[399]: <error> [1361719690.10506] [nm-vpn-connection.c:1405] get_secrets_cb(): Failed to request VPN secrets #3: (6) No agents were available for this request.
```

Bu, GNOME NetworkManager Applet'in dialog betiklerinin `nm-applet` paketlerinin `usr/lib/networkmanager` dizinindeki yerine `usr/lib/gnome-shell` dizininde olmasını beklemesinden kaynaklanır.

Geçici bir çözüm olarak (bu hata uzun süredir devam ediyor), aşağıdaki sembolik bağlantı(ları) oluşturun:
* OpenConnect için: `ln -s /usr/lib/networkmanager/nm-openconnect-auth-dialog /usr/lib/gnome-shell/`
* VPNC (yani Cisco VPN) için: `ln -s /usr/lib/networkmanager/nm-vpnc-auth-dialog /usr/lib/gnome-shell/`

Bu, diğer NetworkManager VPN eklentileri için de gerekebilir, ancak bunlar en yaygın ikisidir.

### Görünen Avrupa Kablosuz Ağlarına Bağlanılamıyor

WLAN çipleri varsayılan bir [[Kablosuz Ağ Yapılandırması#Düzenleyici Alanına Saygı]] ile sevk edilir. Erişim noktanız bu sınırlamalar içinde çalışmıyorsa, ağa bağlanamazsınız. Bunu düzeltmek kolaydır:
1. `wireless-regdb` paketini [[kurun]].
2. `/etc/conf.d/wireless-regdom` dosyasında doğru ülke kodunun yorumunu kaldırın.
3. Ayarın yalnızca önyüklemede okunduğunu unutmayın, sistemi yeniden başlatın.

### Önyüklemede Otomatik VPN Bağlantısı Çalışmıyor

Sistem (yani kök kullanıcısı olarak çalışan NetworkManager) bir VPN bağlantısı kurmaya çalıştığında, şifre GNOME Keyring'de belirli bir kullanıcıya ait olduğundan erişilemediğinde sorun ortaya çıkar.

Çözüm, VPN şifrenizi düz metin olarak tutmaktır, [[#Dağıtıcıyı Kullanarak Ağ Bağlantısı Kurulduktan Sonra Otomatik Olarak VPN'ye Bağlanma]] bölümünün 2. adımında açıklandığı gibi.
`nm-applet` GUI'sinden yeni "otomatik bağlan VPN" seçeneğini kullanıyorsanız, artık otomatik bağlanmak için 1. adımda açıklanan dağıtıcıyı kullanmanıza gerek yoktur.

### Systemd Bottleneck

Zamanla günlük dosyaları (`/var/log/journal`) çok büyük olabilir. Bu, NetworkManager kullanıldığında önyükleme performansını büyük ölçüde etkileyebilir, bkz: [[Systemd#Zamanla önyükleme süresi artar]].

### Düzenli Ağ Bağlantı Kesintileri, Gecikme ve Kayıp Paketler (Wi-Fi)

NetworkManager her 2 dakikada bir tarama yapar.
Bazı Wi-Fi sürücülerinin bağlı/ilişkiliyken baz istasyonları için tarama yaparken sorunları vardır. Belirtiler arasında VPN bağlantılarının kesilmesi/yeniden bağlanması ve kayıp paketler, web sayfalarının yüklenememesi ve ardından düzgün yenilenmesi bulunur.
`journalctl -f` komutunu root olarak çalıştırarak bunun gerçekleştiğini gösterebilirsiniz, günlüklerde düzenli aralıklarla aşağıdaki gibi mesajlar olacaktır.
```log
NetworkManager[410]: <info>  (wlp3s0): roamed from BSSID 00:14:48:11:20:CF (my-wifi-name) to (none) ((none))
```

Roaming önemli değilse, kablosuz bağlantı profiline erişim noktasının BSSID'sini kilitleyerek periyodik tarama davranışını devre dışı bırakabilirsiniz.

### Lenovo Dizüstü Bilgisayarda Wi-Fi Açmak Başarısız Oluyor (IdeaPad, Legion, vb.)

Bazı Lenovo modellerinde `ideapad_laptop` modülü ile ilgili bir sorun vardır, çünkü Wi-Fi sürücüsü yanlışlıkla bir yazılım engeli bildirir. Cihaz hâlâ `netctl` ile manipüle edilebilir, ancak NetworkManager gibi yöneticiler bozulur. Donanım anahtarını açıp kapattıktan sonra `rfkill list` komutunun çıktısını kontrol ederek bu sorunun olup olmadığını doğrulayabilirsiniz ve yazılım engelinin devam ettiğini görürsünüz.

> **Doğruluk:** rfkill sorununu çözmek için `rfkill.default_state` ve `rfkill.master_switch_mode` (bkz. [https://docs.kernel.org/admin-guide/kernel-parameters.html kernel-parameters.html]) kullanmayı deneyin.

`ideapad_laptop` modülünü [[modprobe|kaldırmak]] sorunu çözmelidir. (''uyarı'': bu, dizüstü bilgisayar klavyenizi ve dokunmatik padinizi de devre dışı bırakabilir!).

### Ana Bilgisayar Adı Göndermeyi Kapatma

NetworkManager varsayılan olarak ana bilgisayar adını DHCP sunucusuna gönderir.
Tüm ağlarda DHCP sunucusuna ana bilgisayar adınızı göndermeyi devre dışı bırakmak için, `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile `ipv4.dhcp-send-hostname=0` ve `ipv6.dhcp-send-hostname=0` seçeneklerini ayarlayın. Örneğin:
```ini
[connection]
ipv4.dhcp-send-hostname=0
ipv6.dhcp-send-hostname=0
```

Belirli bir bağlantı için DHCP sunucusuna ana bilgisayar adınızı göndermeyi devre dışı bırakmak (veya genel olarak devre dışı bırakılmışsa etkinleştirmek), ağ bağlantı dosyanıza aşağıdakileri ekleyin:
```ini
...
[ipv4]
dhcp-send-hostname=false
...
[ipv6]
dhcp-send-hostname=false
...
```

> **Not:** Bu seçenekler yalnızca varsayılan [[#DHCP İstemcisi|dahili DHCP istemcisi]] tarafından dikkate alınır. dhcpcd ile NetworkManager kullanırken ana bilgisayar adını göndermemek için `etc/dhcpcd.conf` dosyasını düzenleyin ve son satıra `anonymous` ekleyin.

### i3wm'de nm-applet Kayboluyor

`xfce4-notifyd.service`'i bildirimler için kullanıyorsanız, birimi [[düzenleyin]] ve aşağıdakileri ekleyin:
```ini
[Service]
Environment="DISPLAY=:0.0"
```

Servisleri yeniden yükledikten sonra `xfce4-notifyd.service`'i [[yeniden başlatın]]. i3'ten çıkın ve tekrar başlatın, applet sistem tepsisinde görünmelidir.

### Unit dbus-org.freedesktop.resolve1.service Bulunamadı

`systemd-resolved.service` başlatılmamışsa, NetworkManager onu D-Bus ile başlatmaya çalışır ve başarısız olur:
```log
dbus-daemon[991]: [system] Activating via systemd: service name='org.freedesktop.resolve1' unit='dbus-org.freedesktop.resolve1.service' requested by ':1.23' (uid=0 pid=1012 comm="/usr/bin/NetworkManager --no-daemon ")
dbus-daemon[991]: [system] Activation via systemd failed for unit 'dbus-org.freedesktop.resolve1.service': Unit dbus-org.freedesktop.resolve1.service not found.
dbus-daemon[991]: [system] Activating via systemd: service name='org.freedesktop.resolve1' unit='dbus-org.freedesktop.resolve1.service' requested by ':1.23' (uid=0 pid=1012 comm="/usr/bin/NetworkManager --no-daemon ")
```

Bunun nedeni, NetworkManager'ın `NetworkManager.conf` dosyasındaki `main.dns=` ayarından bağımsız olarak DNS bilgilerini [[systemd-resolved]]'a göndermeye çalışmasıdır. [https://gitlab.freedesktop.org/NetworkManager/NetworkManager/commit/d4eb4cb45f41b1751cacf71da558bf8f0988f383]

Bunu `/etc/NetworkManager/conf.d/` dizininde bir yapılandırma dosyası ile devre dışı bırakabilirsiniz:
```ini
[main]
systemd-resolved=false
```

{{Bug|62138}} numaralı hata raporuna bakın.

### Gizli Bilgiler Gerekliydi, Ancak Sağlanmadı

Bir ağa bağlanmaya çalışırken aşağıdaki hatayı aldıysanız:
```bash
$ nmcli device wifi connect 'SSID' password 'password'
Hata: Bağlantı etkinleştirme başarısız oldu: (7) Gizli bilgiler gerekliydi, ancak sağlanmadı
```

Bu hatanın birçok nedeni olabilir ve [[günlüğü]] incelemelisiniz (NetworkManager ile filtreleyin: `-u NetworkManager`). Örneğin, NetworkManager bağlantıyı kurmak için çok uzun süre aldıysa, şifrenin yanlış olduğunu düşünür:
```log
NetworkManager[1372]: <warn>  [1643991888.3808] device (wlan0): Activation: (wifi) association took too long
NetworkManager[1372]: <info>  [1643991888.3809] device (wlan0): state change: config -> need-auth (reason 'none', sys-iface-state: 'managed')
NetworkManager[1372]: <warn>  [1643991888.3838] device (wlan0): Activation: (wifi) asking for new secrets
```

Bağlantı profilini silip yeni bir tane oluşturmayı deneyebilirsiniz:
```bash
$ nmcli connection delete 'SSID'
$ nmcli device wifi connect 'SSID' password 'password'
```

MAC adresi rastgeleleştirmeyi devre dışı bırakmayı da deneyebilirsiniz:
```ini
[device]
wifi.scan-rand-mac-address=no
```

### iwd ile WPA Kurumsal Bağlantısı

[[#iwd'yi Wi-Fi arka ucu olarak kullanma|iwd arka ucu]] ile NetworkManager kullanarak 'eduroam' gibi bir WPA Kurumsal ağına bağlanmaya çalışırsanız, NetworkManager'dan aşağıdaki hatayı alırsınız:
```log
Connection 'eduroam' is not avialable on device wlan0 because profile is not compatible with device (802.1x connections must have IWD provisioning files)
```

Bunun nedeni, NetworkManager'ın bir WPA Kurumsal ağını yapılandıramamasıdır. Bu yüzden, [[iwd#WPA Kurumsal]] bölümünde açıklandığı gibi bir iwd yapılandırma dosyası `var/lib/iwd/'essid'.8021x` kullanarak yapılandırmanız gerekir.

### VPN Gizli Bilgileri İstenemedi

Aşağıdaki hatayı alırsanız:
```log
Failed to request VPN secrets #1: No agents were available for this request.
```

Ya şifre boşsa ya da [[#PolicyKit İzinlerini Ayarlama|PolicyKit izinlerini ayarlamanız]] gerekir.

### OpenVPN Bağlantıları "gizli bilgiler: VPN gizli bilgileri istenemedi" uyarısıyla başarısız oluyor

> **Kaldır:** Bu, sorun giderme bölümü için hak kazanmaz. İsteğe bağlı bağımlılıklar pacman tarafından işaretlenir, bu yeterince açık değilse [[#VPN Desteği]] bölümünde ele alınmalıdır.|bölüm=Gereksiz bölüm 8.22'yi kaldır

`networkmanager-openvpn` paketi, GNOME-Shell içinde entegre edildiğinde `libnma-gtk4` ve isteğe bağlı olarak `libnma` (Gtk3) gerektirir. `libnma` gerekliyse ancak kurulmamışsa, sistem günlüğüne bir mesaj yazdırılır:
```log
NetworkManager[642]: <warn>  [...] vpn[..."name_of_vpn_profile VPN"]: secrets: failed to request VPN secrets #3: No agents were available for this request.
```

### OpenVPN Bağlantıları OpenSSL "ca md too weak" hatasıyla başarısız oluyor

{{Pkg|openssl}} paketi 3. sürüme güncellendiğinden beri, eski kriptografik algoritmalarla oluşturulan sertifikalar varsayılan olarak reddedilir. Bu yapıyla `networkmanager-openvpn` kullanmaya çalışmak, günlüklerde aşağıdaki hataya neden olabilir:
```log
nm-openvpn[14359]: OpenSSL: error:0A00018E:SSL routines::ca md too weak
nm-openvpn[14359]: Cannot load certificate file /home/archie/.local/share/networkmanagement/certificates/my_issued_cert.crt
nm-openvpn[14359]: Exiting due to fatal error
```

Doğru yaklaşım, OpenVPN sunucusu yöneticisinin daha güvenli sertifikalar oluşturup yeniden vermesidir. Ancak, geçici bir çözüm olarak, OpenVPN `tls-cipher "DEFAULT:@SECLEVEL=0"` gerektirir. Bu, eklenti GUI'si üzerinden mümkün olmayabilir, ancak `nmcli` ile mümkündür. Ayrıca, OpenSSL'de 'legacy' sağlayıcıyı etkinleştirmeniz gerekir.

İlk olarak, aşağıdaki çıktının çıktısından sorun olan VPN bağlantısının adını alın:
```bash
$ nmcli connection show
```

Bağlantı adının `vpn.example.com` olduğunu varsayarsak, `nmcli`'yi şu şekilde kullanın:
```bash
$ nmcli connection modify vpn.example.com +vpn.data tls-cipher=DEFAULT:@SECLEVEL=0
```

Değişiklik, `etc/NetworkManager/system-connections/vpn.example.com.nmconnection` dosyasında anında yansıtılmış olmalıdır.

OpenSSL için, [https://wiki.openssl.org/index.php/OpenSSL_3.0#Providers OpenSSL wiki]'sinde açıklandığı gibi `etc/ssl/openssl.cnf` dosyasını düzenleyin.
Özellikle, `provider_sect` bölümünün sonuna `legacy = legacy_sect` ekleyin. `default_sect` altında `activate = 1` satırının yorumunu kaldırın. Son olarak, `activate = 1` satırını da içeren yeni bir `legacy_sect` bölümü ekleyin. Diğer çoğu önceden var olan yapılandırma bölümünü hariç tutarak, sonuç şu şekilde olur:
```ini
openssl_conf = openssl_init
[openssl_init]
providers = provider_sect
[provider_sect]
default = default_sect
legacy = legacy_sect
[default_sect]
activate = 1
[legacy_sect]
activate = 1
```

Son olarak, yeni OpenSSL yapılandırmasının etkili olması için `NetworkManager.service`'i [[yeniden başlatın]].

### WPA Kurumsal Bağlantıları OpenSSL "desteklenmeyen protokol" hatasıyla kimlik doğrulaması başarısız oluyor

{{Pkg|openssl}} paketi 3. sürüme güncellendiğinden beri, "SSL 3, TLS 1.0, TLS 1.1 ve DTLS 1.0 yalnızca güvenlik seviyesi 0'da çalışır" [https://www.openssl.org/news/openssl-3.0-notes.html varsayılan olarak]. Yalnızca eski standartları destekleyen bir Wi-Fi ağına kimlik doğrulaması yapmaya çalışmak, günlüklerde aşağıdaki hataya neden olur:
```log
wpa_supplicant[3320]: SSL: SSL3 alert: write (local SSL3 detected an error):fatal:protocol version
wpa_supplicant[3320]: OpenSSL: openssl_handshake - SSL_connect error:0A000102:SSL routines::unsupported protocol
wpa_supplicant[3320]: wlp3s0: CTRL-EVENT-EAP-FAILURE EAP authentication failed
```

Doğru yaklaşım, kurumun yöneticisini şifrelenmiş ağ tüneli protokolünü TLS 1.3'e yükseltmeye ve isteğe bağlı olarak TLS 1.0/1.1, DTLS 1.0 ve SSL 1-3 gibi kullanım dışı güvenlik standartlarını bırakmaya ikna etmektir. Ancak, geçici bir çözüm olarak, TLS 1.0 ve/veya 1.1'i varsayılan olarak etkinleştirmenin birden fazla yolu vardır. Bir yol, OpenSSL'deki bozucu değişiklikleri manuel olarak düzeltmek ([https://github.com/openssl/openssl/commit/7bf2e4d7f0c7ae19b7a8c416910886a7171e9820]). Bu aynı zamanda TLS 1.0/1.1 ve SSL 1-3 gibi kullanım dışı güvenlik standartlarını bırakmaya da olanak tanır. Ancak, bu aynı zamanda diğer tüm OpenSSL kullanan programlar için de güvenlik seviyesini düşürdüğü için önerilmez. Bunun yerine, wpa_supplicant tarafından kullanılan seviyeyi doğrudan ayarlayabilirsiniz, [https://bbs.archlinux.org/viewtopic.php?id=286417#p2104492 BBS#286417] bölümünde açıklandığı gibi. Etkilenen bağlantıyı yalnızca değiştirmek için, bağlantının yapılandırma dosyasının `802-1x` bölümünde `phase1-auth-flags=32` veya `phase1-auth-flags=64` ayarlayabilirsiniz. Bu, GUI'ler aracılığıyla mümkün olmayabilir, ancak `nmcli` ile mümkündür.

İlk olarak, aşağıdaki çıktının çıktısından sorun olan Wi-Fi bağlantısının adını alın:
```bash
$ nmcli connection show
```

Bağlantı TLS 1.0 kullanıyorsa ve adı `Example Wi-Fi` ise, `nmcli`'yi şu şekilde kullanın:
```bash
$ nmcli connection modify 'Example Wi-Fi' 802-1x.phase1-auth-flags 32
```

Ve TLS 1.1 bağlantısı için, "64" yazın:
```bash
$ nmcli connection modify 'Example Wi-Fi' 802-1x.phase1-auth-flags 64
```

> **Not:** Girdiğiniz sayı, sağdan sola okunan ağ kimlik doğrulama bit sekizlisi'nin indeksinin 2'nin kuvveti olarak elde edilen sayıdır. Beşinci biti çevirmek TLS 1.0'ı etkinleştirir '''[log(2) 32]''' ve altıncı biti çevirmek TLS 1.1'i etkinleştirir '''[log(2) 64]'''.

Değişiklik, `etc/NetworkManager/system-connections/Example Wi-Fi.nmconnection` dosyasında anında yansıtılmış olmalıdır.

Son olarak, yeni OpenSSL yapılandırmasının etkili olması için `NetworkManager.service`'i [[yeniden başlatın]].

## Ayrıca Bakınız
* [https://blogs.gnome.org/dcbw/2015/02/16/networkmanager-for-administrators-part-1/ NetworkManager for Administrators Part 1]
```