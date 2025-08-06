Title: Arch Linux Üzerinde USB Güç Yönetimi ve Kernel Modül Analizi
Date: 2025-07-30 21:15
Modified: 2025-08-05 22:38
Category: Donanım
Tags: usb, güç yönetimi, kernel modülleri, linux, arch linux, aygıt analizi, bash
Slug: arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi
Authors: yuceltoluyag
Status: published
Summary: Bu rehberde, bir Bash scripti yardımıyla Linux sisteminizdeki USB cihazların güç yönetimi ayarlarını ve aktif kernel modüllerinin parametrelerini nasıl analiz edebileceğinizi adım adım anlatıyoruz.
Template: article
Image: images/arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi-lg.webp

---

# 🖥️ Arch Linux Üzerinde USB Güç Yönetimi ve Kernel Modül Analizi Rehberi

Linux sistemlerde donanım kaynaklarını verimli kullanmak, güç tüketimini azaltmak ve uyumluluk sorunlarını gidermek için **USB güç yönetimi** ve **çekirdek modül ayarları** oldukça önemlidir. Bu rehberde, bir Bash scripti yardımıyla sisteminizdeki USB aygıtlarının durumunu ve modül parametrelerini nasıl inceleyebileceğinizi öğreneceksiniz. 🚀
[responsive_img src="/images/arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi-lg.webp" alt="arch-linux-usb-guc-yonetimi-ve-kernel-modul-analizi-lg" /]
---

## 🧠 Bu Rehber Kimler İçin?

* ⚙️ Teknik bilgiye sahip Linux kullanıcıları
* 🐧 Arch Linux veya benzeri minimalist dağıtımları kullananlar
* 🧪 USB cihazlarla ilgili uyku/uyanma sorunları yaşayanlar
* 🔋 Dizüstü bilgisayarlarında güç tasarrufu sağlamak isteyenler
* 🎧 Ses aygıtları, kablosuz adaptörler, klavye/fare gibi donanımların yönetimini incelemek isteyenler

---

## 🔍 Bu Script Ne Yapar?

Script iki temel işlemi gerçekleştirir:

1. **Tüm USB aygıtlarının güç yönetimi ayarlarını okur ve listeler.**
2. **Sistemde aktif olarak kullanılan kernel modüllerini ve parametrelerini gösterir.**

---

## 🛠️ Script’in Adım Adım İncelemesi

### 1. Script İçeriği

```bash
#!/bin/bash

for i in $(find /sys/devices -name "bMaxPower")
do
	busdir=${i%/*}
	busnum=$(<$busdir/busnum)
	devnum=$(<$busdir/devnum)
	title=$(lsusb -s $busnum:$devnum)

	printf "\n\n+++ %s\n  -%s\n" "$title" "$busdir"

	for ff in $(find $busdir/power -type f ! -empty 2>/dev/null)
	do
		v=$(cat $ff 2>/dev/null|tr -d "\n")
		[[ ${#v} -gt 0 ]] && echo -e " ${ff##*/}=$v";
	done | sort -g;
done;

printf "\n\n\n+++ %s\n" "Kernel Modules"
for mod in $(lspci -k | sed -n '/in use:/s,^.*: ,,p' | sort -u)
do
	echo "+ $mod";
	systool -v -m $mod 2> /dev/null | sed -n "/Parameters:/,/^$/p";
done
```

---

## 🧪 Uygulamalı Kullanım ve Örnek Çıktı

### 2. Komutu Çalıştır

```bash
chmod +x usb-kernel-analyzer.sh
./usb-kernel-analyzer.sh
```

Çalıştırdığınızda aşağıdaki gibi bir çıktı alırsınız:

```
+++ Bus 001 Device 005: ID 10c4:8108 Silicon Labs USB OPTICAL MOUSE
 -/sys/devices/.../usb1/1-9
 autosuspend=2
 autosuspend_delay_ms=2000
 control=on
 runtime_status=active
 wakeup=disabled
```

---

## 📊 Çıktıdaki Anahtar Alanlar

| Alan                   | Anlamı                                            |
| ---------------------- | ------------------------------------------------- |
| `autosuspend`          | 2 ise cihaz uykuya geçebilir.                     |
| `autosuspend_delay_ms` | Uykuya geçmeden önceki bekleme süresi.            |
| `control`              | `auto`: sistem yönetir, `on`: kullanıcı belirler. |
| `runtime_status`       | `active`: çalışıyor, `suspended`: uyku modunda.   |
| `wakeup`               | Cihaz sistem uykudayken uyandırabilir mi.         |

---

## 🔎 3. Öne Çıkan Cihaz Analizleri

### 🖱️ USB Mouse (Silicon Labs)

* **Durum:** Aktif, `autosuspend=2` olmasına rağmen uyumamış.
* **Güç Tüketimi:** Devam ediyor.
* **Wakeup:** Kapalı, bu yüzden sistem uykudan mouse ile uyanmayabilir.

### ⌨️ USB Klavye (CASUE)

* **Wakeup:** Açık. Bu cihaz sistem uykudayken uyanma tetikleyebilir.
* **runtime\_status=active** olduğundan uyumamış.

### 📶 Kablosuz Ağ Adaptörü (Realtek RTL8188RU)

* **Uyku destekleniyor** ama **runtime\_status=active** → uyumuyor.
* **wakeup=disabled** → Ağdan uyanma tetikleyemez.

---

## 🧩 4. Kernel Modül Parametreleri

Çıktıdaki modül örneği:

```
+++ Kernel Modules
+ nvme
  Parameters:
    io_queue_depth = 1024
    use_threaded_interrupts = 0
```

### 🎯 Neden Önemli?

Bu parametreler sistemin performansı, güç yönetimi ve donanım uyumluluğu üzerinde doğrudan etkilidir.

| Modül           | Kritik Parametreler                    |
| --------------- | -------------------------------------- |
| `snd_hda_intel` | power\_save, enable\_msi, jackpoll\_ms |
| `nvme`          | io\_queue\_depth, use\_cmb\_sqes       |
| `xhci_hcd`      | quirks, link\_quirk                    |

---

## 🧰 5. Uykuya Geçmeyen Cihazları Bulmak

Script dışında şu komutları da kullanabilirsiniz:

### 🔍 Uykuya geçmeyen cihazları listele

```bash
grep . /sys/bus/usb/devices/*/power/runtime_status | grep -v suspended
```

### 🔋 Uyuyabilir ama aktif olan cihazları bul

```bash
find /sys/bus/usb/devices/*/power -name runtime_status -exec grep -H active {} \;
```

---

## ✅ 6. İyileştirme Önerileri

* `autosuspend=2` olan ama sürekli **`active`** durumda kalan cihazlar için `control=auto` yapılabilir.
* `wakeup=disabled` olan klavye gibi aygıtlar için:

```bash
echo enabled | sudo tee /sys/bus/usb/devices/1-3/power/wakeup
```

* Sürücü parametrelerini kalıcı yapmak için `/etc/modprobe.d` altına `.conf` dosyası ekleyebilirsiniz.

---

## 📌 Sonuç: Bu Script Neden Faydalı?

✅ USB güç yönetimini sistemsel düzeyde görebilirsiniz.
✅ Uyku/uyanma sorunlarını tespit edebilirsiniz.
✅ Kernel modül parametrelerini analiz ederek performans veya uyumluluk artırabilirsiniz.

---
