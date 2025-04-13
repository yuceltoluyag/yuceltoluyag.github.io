// Service Worker kodumuz - Workbox ile güçlendirilmiş
// Versiyon: 1.9.0 - Son güncellenme: 2024-05-22
const CACHE_VERSION = "1.9.2";

// Kullanıcının belirttiği çalışan CDN adresi
importScripts("https://cdn.jsdelivr.net/npm/workbox-sw@7.0.0/build/workbox-sw.min.js");

// Workbox'ın kullanılabilir olup olmadığını kontrol edelim
if (typeof workbox !== "undefined") {
    console.log(`Workbox ${CACHE_VERSION} yüklendi ve hazır!`);

    // İhtiyaç duyulan Workbox modüllerini manuel olarak yükleyelim
    importScripts(
        "https://cdn.jsdelivr.net/npm/workbox-routing@7.3.0/build/workbox-routing.prod.min.js",
        "https://cdn.jsdelivr.net/npm/workbox-strategies@7.3.0/build/workbox-strategies.prod.min.js",
        "https://cdn.jsdelivr.net/npm/workbox-expiration@7.3.0/build/workbox-expiration.prod.min.js",
        "https://cdn.jsdelivr.net/npm/workbox-cacheable-response@7.3.0/build/workbox-cacheable-response.prod.min.js",
        "https://cdn.jsdelivr.net/npm/workbox-broadcast-update@7.3.0/build/workbox-broadcast-update.prod.min.js",
        "https://cdn.jsdelivr.net/npm/workbox-precaching@7.3.0/build/workbox-precaching.prod.min.js"
    );

    // Workbox modüllerini tanımlayalım
    const { registerRoute, setCatchHandler, setDefaultHandler } = workbox.routing;
    const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
    const { ExpirationPlugin } = workbox.expiration;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;
    const { BroadcastUpdatePlugin } = workbox.broadcastUpdate;

    // Ön belleğe alınacak sayfalar
    workbox.precaching.precacheAndRoute([
        { url: "/index.html", revision: CACHE_VERSION },
        { url: "/offline.html", revision: CACHE_VERSION },
        { url: "/404.html", revision: CACHE_VERSION },
    ]);

    // HTML sayfaları için NetworkFirst stratejisi
    registerRoute(
        ({ request }) => request.mode === "navigate",
        new NetworkFirst({
            cacheName: "pages-v" + CACHE_VERSION,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60, // 24 saat
                    purgeOnQuotaError: true,
                }),
                // Sayfadaki güncellemeleri bildir
                new BroadcastUpdatePlugin({
                    channelName: "workbox-broadcast-update",
                    headersToCheck: ["ETag", "Last-Modified"],
                }),
            ],
        })
    );

    // CSS, JS ve Web Worker için StaleWhileRevalidate stratejisi
    registerRoute(
        ({ request }) =>
            request.destination === "style" || request.destination === "script" || request.destination === "worker",
        new StaleWhileRevalidate({
            cacheName: "assets-v" + CACHE_VERSION,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 gün
                }),
                // Asset güncellemelerini bildir
                new BroadcastUpdatePlugin({
                    channelName: "workbox-broadcast-update",
                }),
            ],
        })
    );

    // Görseller için CacheFirst stratejisi
    registerRoute(
        ({ request }) => request.destination === "image",
        new CacheFirst({
            cacheName: "images-v" + CACHE_VERSION,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 gün
                }),
            ],
        })
    );

    // Fontlar için CacheFirst stratejisi
    registerRoute(
        ({ request }) => request.destination === "font",
        new CacheFirst({
            cacheName: "fonts-v" + CACHE_VERSION,
            plugins: [
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
                new ExpirationPlugin({
                    maxEntries: 30,
                    maxAgeSeconds: 60 * 24 * 60 * 60, // 60 gün
                }),
            ],
        })
    );

    // Varsayılan davranış - çevrimdışıysa cache'ten dön
    setDefaultHandler(
        new NetworkFirst({
            cacheName: "default-v" + CACHE_VERSION,
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 7 gün
                }),
            ],
        })
    );

    // Hata durumunda offline sayfasına yönlendir
    setCatchHandler(({ event }) => {
        if (event.request.destination === "document") {
            return caches.match("/offline.html");
        }
        return Response.error();
    });

    // İletişim: Service Worker → Sayfa
    // Yeni bir sürüm olduğunda veya önemli bir güncelleme olduğunda sayfaya bildirim gönder
    self.addEventListener("message", (event) => {
        if (event.data && event.data.type === "GET_VERSION") {
            // Tüm istemcilere versiyon numarasını gönder
            self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({
                        type: "VERSION",
                        version: CACHE_VERSION,
                    });
                });
            });
        } else if (event.data && event.data.type === "SKIP_WAITING") {
            // Bekleyen service worker'ı aktifleştir
            self.skipWaiting();
        } else if (event.data && event.data.type === "FORCE_UPDATE_NOTIFICATION") {
            // Test amaçlı komut, sadece geliştirme sırasında kullanılır
            // Forced parametresi kaldırıldı - gerçek güncellemelerde olduğu gibi davranır
            console.log("Manuel güncelleme bildirimi test edildi - gerçek güncelleme gibi davranacak");
            self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({
                        type: "SW_ACTIVATED",
                        version: CACHE_VERSION,
                    });
                });
            });
        }
    });

    // Service Worker yüklendiğinde çalışır (ilk kurulum)
    self.addEventListener("install", (event) => {
        console.log(`Yeni Service Worker sürümü (${CACHE_VERSION}) yükleniyor...`);
        // Hemen aktifleşmesini sağlar
        self.skipWaiting();
        console.log("Service Worker kuruldu (skipWaiting)");
    });

    // Service Worker aktifleştiğinde çalışır
    self.addEventListener("activate", (event) => {
        console.log(`Service Worker sürüm ${CACHE_VERSION} aktifleşiyor...`);
        // Tüm istemcilerin kontrolünü hemen al
        event.waitUntil(
            Promise.all([
                // İstemcilerin kontrolünü al
                self.clients.claim(),

                // Eski önbellekleri temizle
                caches.keys().then((cacheNames) => {
                    return Promise.all(
                        cacheNames.map((cacheName) => {
                            // Eğer versiyonu eski olan cache'leri sil
                            if (cacheName.includes("-v") && !cacheName.includes("-v" + CACHE_VERSION)) {
                                console.log("Eski cache siliniyor:", cacheName);
                                return caches.delete(cacheName);
                            }
                        })
                    );
                }),
            ])
        );

        // Tüm aktif sekmelere bildirim gönder
        self.clients.matchAll().then((clients) => {
            if (clients && clients.length > 0) {
                console.log(`${clients.length} istemciye güncelleme bildirimi gönderiliyor...`);
                clients.forEach((client) => {
                    client.postMessage({
                        type: "SW_ACTIVATED",
                        version: CACHE_VERSION,
                    });
                });
            } else {
                console.log("Aktif istemci bulunamadı, bildirim gönderilemiyor.");
            }
        });

        console.log("Service Worker aktifleştirildi ve istemcileri devraldı");
    });
} else {
    console.log(`Workbox yüklenemedi! Offline özellikleri çalışmayacak.`);
}
