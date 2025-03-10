Title: OBS Linux Browser Eklentisi Kurulumu ve Discord Chat Entegrasyonu
Date: 2018-11-17 12:00 10:00
Modified: 2025-03-08 12:00
Category: linux
Tags: linux, obs, discord
Slug: obs-linux-browser-eklentisi-kurulumu
Authors: yuceltoluyag
Summary: Linux ortamında OBS için browser eklentisinin nasıl kurulacağını ve Discord chat entegrasyonunun nasıl yapılacağını adım adım anlatıyoruz.
Translation: false
Status: published
Template: article


Merhaba! 🎥 Open Broadcaster Software (OBS), video kaydetme ve canlı yayın yapma konusunda en iyi uygulamalardan biridir. Ancak Linux ortamında eklenti ekleme süreci hakkında yeterince Türkçe kaynak bulunmadığı için bu rehberi hazırladım. OBS'nin nasıl kullanılacağını anlatmayacağım, çünkü bu konuda yeterince içerik mevcut. Bu yazıda, **OBS'e Linux Browser eklentisinin nasıl ekleneceğini ve Discord StreamKit entegrasyonunun nasıl yapılacağını** öğreneceğiz.



## Kurulum

OBS'e eklenti ekleyip test olarak **Discord StreamKit** entegrasyonu gerçekleştireceğiz. 🎤💬

<div class="info-box warning">
<b>Güncelleme: Artık Linux Browser Eklentisi varsayılan olarak gelmektedir. Ekstra yükleme yapmanıza gerek yoktur!</b> 🚀
</div>



- ~~[obs-linuxbrowser](https://github.com/bazukas/obs-linuxbrowser/releases)~~ (Eski yöntem, artık gerekli değil. Yüklemeyin!)
- [Discord StreamKit](https://discordapp.com/streamkit)

Bu işlemleri elle de yapabilirsiniz, ancak ben terminal üzerinden yapmayı tercih ediyorum.

### Terminal Üzerinden Kurulum (Eski Yöntem)

Eğer eklenti varsayılan olarak gelmiyorsa, manuel olarak şu komutları kullanabilirsiniz:

```shell
wget https://github.com/bazukas/obs-linuxbrowser/releases/download/0.6.1/linuxbrowser0.6.1-obs23.0.2-64bit.tgz
mkdir -p $HOME/.config/obs-studio/plugins
tar xfvz linuxbrowser0.6.1-obs23.0.2-64bit.tgz -C $HOME/.config/obs-studio/plugins/
```

## Kurulum Sonrası

Bu adımları tamamladıktan sonra eklenti, **OBS'in eklenti klasörüne** başarıyla eklenmiş olacaktır. **Başka bir eklenti yüklemek istediğinizde, aynı dizini kullanabilirsiniz.**

## Kullanım

### 1. OBS Üzerinde Linux Browser Eklentisini Açma

OBS'i açın ve **Kaynaklar (+) butonuna** basarak **Linux Browser** seçeneğini belirleyin.

![Linux Browser Kaynak Seçimi](/images/linux_browser_kaynaklar.png)

### 2. Discord StreamKit Entegrasyonu

**Discord StreamKit** sayfasına gidin ve en altta bulunan **OBS -> Connect to Discord** butonuna tıklayın.

![Discord Bağlantısı](/images/linux_browser_discord.png)

**Install For OBS** butonuna basın.

![OBS için Kurulum](/images/linux_browser_obs.png)

### 3. Sunucu Seçimi ve Ayarlar

Açılan ekranda **sunucunuzu seçin** ve **ses veya metin sohbeti** entegrasyonu için gerekli ayarları yapın.

![Discord OBS Özelleştirme](/images/linux_browser_obs_custom.png)

### 4. OBS İçerisinde URL Ekleme

OBS'te **Linux Browser** kaynağını açın ve **URL alanına Discord StreamKit tarafından sağlanan bağlantıyı yapıştırın**.

💡 **İpucu:** CSS bilginiz varsa, ekranda özelleştirmeler yaparak daha şık bir görünüm elde edebilirsiniz! 🎨

![OBS Ayarları](/images/linux_browser_settings.png)

🎉 İşte sonuç!

![Sonuç Görüntüsü](/images/linux_browser_final.png)

---

## Linux Discord Sunucumuz 🚀

Linux ile ilgili sohbet etmek ve destek almak için **Discord sunucumuza katılabilirsiniz!**

👉 [Discord Sunucumuza Katılın](https://discordapp.com/invite/da3Su8s)


Bu rehberin Linux kullanıcıları için faydalı olacağını umuyorum. Herhangi bir sorunuz varsa yorumlarda belirtebilirsiniz! 📢

