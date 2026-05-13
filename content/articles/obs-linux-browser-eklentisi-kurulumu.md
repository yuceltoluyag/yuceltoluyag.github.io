Title: OBS Linux Browser Eklentisi Kurulumu ve Discord Chat Entegrasyonu
Date: 2018-11-17 12:00 10:00
Modified: 2025-08-11 22:59
Category: Linux
Tags: linux, obs, discord
Slug: obs-linux-browser-eklentisi-kurulumu
Authors: yuceltoluyag
Summary: Linux ortamında OBS için browser eklentisinin nasıl kurulacağını ve Discord chat entegrasyonunun nasıl yapılacağını adım adım anlatıyoruz.
Lang: tr
Translation: false
Status: published
Template: article
Image: images/linux_browser_kaynaklar-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114982751660270155
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvqn5u3be22w


Merhaba! 🎥 Open Broadcaster Software (OBS), video kaydetme ve canlı yayın yapma konusunda en iyi uygulamalardan biridir. Ancak Linux ortamında eklenti ekleme süreci hakkında yeterince Türkçe kaynak bulunmadığı için bu rehberi hazırladım. OBS'nin nasıl kullanılacağını anlatmayacağım, çünkü bu konuda yeterince içerik mevcut. Bu yazıda, **OBS'e Linux Browser eklentisinin nasıl ekleneceğini ve Discord StreamKit entegrasyonunun nasıl yapılacağını** öğreneceğiz.

## Kurulum

OBS'e eklenti ekleyip test olarak **Discord StreamKit** entegrasyonu gerçekleştireceğiz. 🎤💬

!!! warning "<b>Güncelleme: Artık Linux Browser Eklentisi varsayılan olarak gelmektedir. Ekstra yükleme yapmanıza gerek yoktur!</b> 🚀"

- ~~[obs-linuxbrowser](https://github.com/bazukas/obs-linuxbrowser/releases){: target="\_blank" rel="noopener noreferrer"}~~ (Eski yöntem, artık gerekli değil. Yüklemeyin!)
- [Discord StreamKit](https://discordapp.com/streamkit){: target="\_blank" rel="noopener noreferrer"}

Bu işlemleri elle de yapabilirsiniz, ancak ben terminal üzerinden yapmayı tercih ediyorum.

### Terminal Üzerinden Kurulum (Eski Yöntem)

Eğer eklenti varsayılan olarak gelmiyorsa, manuel olarak şu komutları kullanabilirsiniz:

```bash
wget https://github.com/bazukas/obs-linuxbrowser/releases/download/0.6.1/linuxbrowser0.6.1-obs23.0.2-64bit.tgz
mkdir -p $HOME/.config/obs-studio/plugins
tar xfvz linuxbrowser0.6.1-obs23.0.2-64bit.tgz -C $HOME/.config/obs-studio/plugins/
```

## Kurulum Sonrası

Bu adımları tamamladıktan sonra eklenti, **OBS'in eklenti klasörüne** başarıyla eklenmiş olacaktır. **Başka bir eklenti yüklemek istediğinizde, aynı dizini kullanabilirsiniz.**

## Kullanım

### 1. OBS Üzerinde Linux Browser Eklentisini Açma

OBS'i açın ve **Kaynaklar (+) butonuna** basarak **Linux Browser** seçeneğini belirleyin.

[responsive_img src="/images/linux_browser_kaynaklar-xl.webp" alt="Linux Browser Kaynak Seçimi" /]

### 2. Discord StreamKit Entegrasyonu

**Discord StreamKit** sayfasına gidin ve en altta bulunan **OBS -> Connect to Discord** butonuna tıklayın.

[responsive_img src="/images/linux_browser_discord-xl.webp" alt="Discord Bağlantısı" /]

**Install For OBS** butonuna basın.

[responsive_img src="/images/linux_browser_obs-xl.webp" alt="OBS için Kurulum" /]

### 3. Sunucu Seçimi ve Ayarlar

Açılan ekranda **sunucunuzu seçin** ve **ses veya metin sohbeti** entegrasyonu için gerekli ayarları yapın.

[responsive_img src="/images/linux_browser_obs_custom-xl.webp" alt="Discord OBS Özelleştirme" /]

### 4. OBS İçerisinde URL Ekleme

OBS'te **Linux Browser** kaynağını açın ve **URL alanına Discord StreamKit tarafından sağlanan bağlantıyı yapıştırın**.

💡 **İpucu:** CSS bilginiz varsa, ekranda özelleştirmeler yaparak daha şık bir görünüm elde edebilirsiniz! 🎨

[responsive_img src="/images/linux_browser_settings.webp" alt="OBS Ayarları" /]

🎉 İşte sonuç!

## [responsive_img src="/images/linux_browser_final.webp" alt="Sonuç Görüntüsü" /]

## Linux Discord Sunucumuz 🚀

Linux ile ilgili sohbet etmek ve destek almak için **Discord sunucumuza katılabilirsiniz!**

👉 [Discord Sunucumuza Katılın](https://discordapp.com/invite/da3Su8s){: target="\_blank" rel="noopener noreferrer"}

Bu rehberin Linux kullanıcıları için faydalı olacağını umuyorum. Herhangi bir sorunuz varsa yorumlarda belirtebilirsiniz! 📢



