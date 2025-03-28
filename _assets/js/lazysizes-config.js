window.lazySizesConfig = window.lazySizesConfig || {};

// Genel yapılandırma ayarları
lazySizesConfig.preloadAfterLoad = true; // Sayfa yüklendikten sonra preload işlemini başlat
lazySizesConfig.loadMode = 1; // Yüklendikten 1 saniye sonra başla (performans için)
lazySizesConfig.expand = 150; // Görünür hale gelmeden önce 150px mesafede yüklemeye başla
lazySizesConfig.expFactor = 2; // Kullanıcı hızlı kaydırıyorsa, daha erken yüklemeye başla
lazySizesConfig.hFac = 0.8; // Yükseklik faktörü (daha erken yüklenmeye başlar)
lazySizesConfig.throttleDelay = 125; // İşlem gecikmesi (milisaniye)
lazySizesConfig.fastLoadedClass = "ls-is-cached"; // Hızlı yüklenen resimler için sınıf

// Ek özellikler
lazySizesConfig.srcAttr = "data-src"; // Kaynak özniteliği
lazySizesConfig.srcsetAttr = "data-srcset"; // Srcset özniteliği (duyarlı resimler için)
lazySizesConfig.sizesAttr = "data-sizes"; // Sizes özniteliği
lazySizesConfig.minSize = 40; // Minimum boyut (px) - bundan küçük resimleri yükleme önceliğini düşür

// iframe için özel ayarlar
lazySizesConfig.iframeLoadMode = 1; // iframe'ler için yükleme modu

// Debug modu (geliştirme aşamasında açık tutabilirsiniz)
lazySizesConfig.debug = true;
