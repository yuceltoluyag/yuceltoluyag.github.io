Title: Proxmox + ZFS Üzerinde Home Assistant (HAOS) Kurulumu
Date: 2025-11-30 14:15
Category: Sunucu
Tags: proxmox, home assistant, haos, zfs, tteck, vm,linux,disk
Slug: proxmox-zfs-home-assistant
Authors: yuceltoluyag
Summary: Hazır scriptlerin arkasına sığınmadan, Proxmox üzerinde ZFS ve SSD optimizasyonlarıyla (q35, ssd=1) manuel Home Assistant kurulum rehberi.
Image: /images/proxmox-zfs-home-assistant-xl.webp
Lang: tr
Translation: false
Status: published


Bazen kendime soruyorum, "Neden kolayı varken zoru seçiyorsun?" diye. İnternet "tek satır kodla Home Assistant kur" scriptleriyle dolu. Tteck'in scriptleri mesela, efsanedir, laf yok. Ama işte o içimdeki kontrol manyağı rahat durmuyor. "Ya bu script benim diskimi yanlış yere bağlarsa?", "Arka planda ne çeviriyor bu?" diye düşünmekten uyuyamıyorum.

Geçen gün sunucuyu güncellerken (biraz da kahveyi klavyeye dökme korkusuyla) dedim ki; gel şunun en optimize, en temiz kurulumunu script kullanmadan, ama scriptlerin kullandığı o ince performans ayarlarını (Q35, SSD flagleri falan) çalarak elle yapayım.

Eğer siz de benim gibi "Kaputun altında ne var bilmem lazım" diyenlerdenseniz, doğru yerdesiniz. Proxmox 9 ve ZFS ikilisini, Home Assistant ile dans ettireceğiz.

## 1. İmajı Yakalamak (En Günceli Hangisiydi?)

Önce Proxmox sunucusuna bir SSH atalım. Web konsolundan da yazarsınız ama kopyala-yapıştır yaparken o konsol penceresi bazen saçmalıyor, harfler kayıyor falan... Hiç gerek yok.

```bash
ssh root@vhost01
```

Şimdi, gidip Home Assistant sitesinde "son sürüm kaçtı ya?" diye dolanmaya gerek yok. Şu komut seti, GitHub'a gidip "Bana en son stabil sürümü ver kardeşim" diyor ve indiriyor.

```bash
# Otomatik sürümü bul ve indir
ha_version=$(curl -s https://raw.githubusercontent.com/home-assistant/version/master/stable.json | grep "ova" | cut -d '"' -f 4)

wget -q --show-progress https://github.com/home-assistant/operating-system/releases/download/${ha_version}/haos_ova-${ha_version}.qcow2.xz
```

İndi mi? Güzel. Şimdi paketi açalım.

```bash
unxz haos_ova-${ha_version}.qcow2.xz
```

Bu arada dosya ismini kopyalamakla uğraşmayın, `tab` tuşuna basınca tamamlıyor zaten. (Bunu bilmeyen yoktur ama aklıma geldi işte).

## 2. VM'i Yaratmak (Ama Öyle Dümdüz Değil)

Bakın burası çok önemli. Eskiden `i440fx` kullanırdık, işimizi görürdü. Ama devir değişti. Eğer yarın öbür gün bu Home Assistant'a bir Zigbee USB takacaksanız veya ekran kartı passthrough yapacaksanız, **Q35** çipseti şart. Scriptler bunu varsayılan yapıyor, biz niye yapmayalım?

Ben VM ID olarak `206` seçtim, 106 da olur 300 de, keyfinize kalmış.

```bash
qm create 206 \
  --name hass01 \
  --pool PROD \
  --tags prod \
  --ostype l26 \
  --machine q35 \
  --agent 1 \
  --bios ovmf \
  --cpu host,flags=+aes \
  --cores 4 \
  --memory 4096 \
  --numa 0 \
  --scsihw virtio-scsi-pci \
  --net0 virtio=AA:BB:CC:DD:E2:06,bridge=vmbr00,firewall=1,tag=50
```

!!! warning "Kopyala-Yapıştır Yaparken Dikkat! 💣"
Yukarıdaki komutta benim kendi sunucuma özel ayarlar var, direkt yapıştırırsan patlar:
* `--pool PROD`: Sende "PROD" diye bir havuz yoksa bu satırı sil.
* `--net0 ...`: Ben `vmbr00` ve `tag=50` (VLAN) kullanıyorum. Sende muhtemelen `vmbr0` vardır ve VLAN yoktur. Kendine göre düzelt!

!!! note "Q35 Detayı"
`--machine q35` parametresi modern PCIe donanımları için kritik. Bir de işlemciyi `host` moduna aldık ki, sanallaştırma katmanında vakit kaybetmesin, ana makinenin tüm özelliklerini kullansın.

## 3. Diski ZFS Havuzuna Fırlatmak

Depolama alanınızın adını biliyorsunuz değil mi? Ben `pve_vdisks` kullanıyorum ama sizde %90 ihtimalle `local-zfs` yazar.

```bash
pvesm status
```

Hadi şu indirdiğimiz imajı havuza atalım:

```bash
qm importdisk 206 haos_ova-${ha_version}.qcow2 pve_vdisks
```

Bu işlem diskin hızına göre biraz sürebilir. O arada gidip bir su için, sandalyeden kalkın. Bel fıtığı şakaya gelmez.

## 4. Olayın Koptuğu Yer: Disk Ayarları

İşte tteck scriptinin "sihri" burada. Eğer diski dümdüz bağlarsanız çalışır mı? Çalışır. Ama Home Assistant onu eski tip dönen bir hard disk sanar. Biz ona "Hey, sen bir SSD üzerindesin, rahat ol" diyeceğiz (`ssd=1`).

Ayrıca Proxmox 9 ve Secure Boot uyumu için EFI diskini de özel ayarlamamız lazım.

```bash
# Önce minik bir EFI diski
pvesm alloc pve_vdisks 206 vm-206-disk-0 4M

# Şimdi asıl bombayı patlatıyoruz
qm set 206 
  --efidisk0 pve_vdisks:vm-206-disk-0,efitype=4m \
  --scsi0 pve_vdisks:vm-206-disk-1,ssd=1,discard=on,iothread=1 \
  --boot order=scsi0
```

Buradaki `discard=on` komutu, ZFS için hayati önem taşıyor. TRIM desteği olmazsa o disk şişer de şişer, sonra "Disk doldu" uyarısıyla uğraşırsınız. Tecrübeyle sabit.[^1]

Bir de diski biraz büyütelim, 32GB standarttır, yetmez derseniz 64 yapın.

```bash
qm resize 206 scsi0 32G
```

## 5. Doğrulama (Paranoyaklık İyidir)

Her şeyi yaptık ama bakalım diskler gerçekten orada mı?

```bash
pvesm list pve_vdisks --vmid 206
```

Çıktı aşağı yukarı şöyle olmalı (Biri 4MB, diğeri 32GB):

```
Volid                    Format  Type             Size VMID
pve_vdisks:vm-206-disk-0 raw     images        4194304 206
pve_vdisks:vm-206-disk-1 raw     images    34359738368 206
```

Eğer ZFS datasetlerini de görmek istersen:

```bash
zfs list | grep 206
```

## 6. Hadi Bismillah: Başlatıyoruz

Her şey yerli yerindeyse marşa basabiliriz.

```bash
qm start 206
```

VM açıldıktan sonra IP adresini bulun (modemden veya konsoldan), tarayıcıya `http://IP_ADRESI:8123` yazın. O meşhur "Home Assistant hazırlanıyor" ekranını gördüyseniz işlem tamamdır.

Yani, script kullanmak kötü değil ama elle kurunca insan kendini bir "Mr. Robot" hissetmiyor da değil hani. Hem artık sistemin her vidasını siz sıktınız, bir sorun çıkarsa neresine bakacağınızı biliyorsunuz. Güle güle kullanın! 👋

[^1]:
    Bir keresinde discard açmayı unuttuğum bir VM, 100GB verisi olmamasına rağmen ZFS üzerinde 500GB yer kaplamıştı. Temizlemesi tam bir işkenceydi.