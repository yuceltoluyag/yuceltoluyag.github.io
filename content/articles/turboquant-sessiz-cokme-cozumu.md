---
Title: TurboQuant Sessiz Çökme Sorunu ve Çözümü
Date: 2026-05-03 01:46
Category: Sorun Giderme
Tags: llama.cpp, turboquant, openssl, cuda, ai
Slug: turboquant-sessiz-cokme-cozumu
Authors: yuceltoluyag
Summary: TurboQuant kullanırken llama-server sessizce mi kapanıyor? Meğer OpenSSL dosyaları unutulmuş. İşte o sinir bozucu sorunun basit çözümü.
Image: /images/turboquant-sessiz-cokme-cozumu.webp
Lang: tr
Translation: false
Status: published
---

## Hevesimiz Kursağımızda Kaldı: TurboQuant Neden Çalışmıyor?

Biliyorsun, yerel yapay zeka dünyası her gün yeni bir şey fırlatıyor önümüze. Dün akşam da şu meşhur **TurboQuant** olayına bir bakayım dedim. Hani şu Google DeepMind'ın KV cache olayını 3 bit'e kadar düşüren, VRAM'i resmen emcükleyen o teknoloji var ya... RTX 4060 Ti 16GB kartım var, "Ulan," dedim, "şimdi bununla devasa bağlam (context) pencerelerine yelken açarım." Ama gel gör ki, her şey öyle kağıt üzerinde durduğu gibi toz pembe değilmiş. 🤯

Kurulumu yaptım, her şey yerli yerinde duruyor. Ama o meşhur `llama-server.exe` dosyasına tıkladığımda (veya terminalden yardırdığımda) bir de ne göreyim? Hiçbir şey! Resmen sessiz bir direniş. Ne bir hata kodu, ne bir "şu dosya eksik" uyarısı... Basıyorum, anında kapanıyor. İnsanı sinir hastası eder bu durum, hani bilgisayarı camdan aşağı atasım geldi bir an. Neyse, konuya döneyim.

## Sessiz Çöküşün Perde Arkası: STATUS_DLL_NOT_FOUND

İşin ilginç yanı, terminalden çalıştırdığımda bile hiçbir çıktı vermiyordu. Sadece sessizce bir alt satıra geçiyor. "Acaba işlemci mi yemedi (AVX-512 mi istiyor acaba?)" diye düşünürken kendimi GitHub Issues sayfalarında buldum. Meğer bu bir "kusur" değil, resmen bir unutkanlık hikayesiymiş.

`TheTom/llama-cpp-turboquant` fork'unun Windows CUDA 12.4 sürümünde (tqp-v0.1.1) birileri çok kritik iki dosyayı paketlemeyi unutmuş. Hani bir evi inşa edersin de anahtarını içeride unutursun ya, tam olarak öyle bir durum. 🤦‍♂️

!!! warning "Dikkat! ⚠️"
    Eğer sizde de hiçbir hata vermeden program kapanıyorsa, muhtemelen sisteminizde OpenSSL dosyaları eksik demektir. Bu hata Windows'un komut satırında genelde sessizce gerçekleşir.

## İşin Çözümü: OpenSSL 3 (LTS) Kurtarıcı Oldu

Mesele şuymuş: Uygulama çalışmak için OpenSSL kütüphanelerine, yani `libssl-3-x64.dll` ve `libcrypto-3-x64.dll` dosyalarına ihtiyaç duyuyor. Bunlar bilgisayarınızda yüklü değilse (ki genelde olmaz), uygulama başlar başlamaz "Ben gidiyorum," diyor.

Ben de hemen `winget` ile daldım olaya. Önce en yeni sürümü denedim (OpenSSL 4.0), ama meğer bizim nazlı `llama-server` illa ki "3" versiyonunu istiyormuş. İşin yoksa sil baştan yap... Neyse ki LTS sürümü imdadımıza yetişti.

!!! tip "İpucu ⚡"
    Bu sorunu çözmek için şu komutu terminalinize yapıştırın:
    `winget install ShiningLight.OpenSSL.LTS.Light`
    Bu komut sisteminize ihtiyacı olan o kayıp DLL dosyalarını kazandıracak.

## Sonuç: Devasa Context Keyfi Başlasın!

OpenSSL 3.x sürümünü kurduktan sonra o sessizce kapanan terminal bir anda canlandı. RTX 4060 Ti kartımı bir gördü, bir selamlaştı ki sorma... Artık 128K context ile kod yazdırırken VRAM bitti derdi kalmadı. Yani bazen çözüm, saatlerce kod incelemek değil, sadece o kayıp iki tane dosyayı bulup yerine koymakmış. 😎

İşin özü; teknoloji bazen böyle küçük oyunlar oynuyor bize. Ama pes etmeyince, o son `--version` komutunun çıktısını ekranda görünce insan bir rahatlıyor, hani dünya varmış diyorsun. Şimdi bu TurboQuant'ın tadını çıkarma vakti! 🚀

[^1]: Github üzerinde açılan [109 numaralı issue](https://github.com/TheTom/llama-cpp-turboquant/issues/109){: target="_blank" rel="noopener noreferrer"} olmasa hala AVX-512 peşinde koşuyordum herhalde.
