importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js");

// Workbox'ın kullanılabilir olup olmadığını kontrol edelim
if (workbox) {
    console.log(`Workbox yüklendi!`);

    // Cache'leme stratejilerini belirleyelim
    const { registerRoute } = workbox.routing;
    const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
    const { ExpirationPlugin } = workbox.expiration;
    const { CacheableResponsePlugin } = workbox.cacheableResponse;

    // HTML sayfaları için NetworkFirst stratejisi (sayfa navigasyonları)
    registerRoute(
        ({ request }) => request.mode === "navigate",
        new NetworkFirst({
            cacheName: "pages",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // 1 hafta
                    purgeOnQuotaError: true,
                }),
                new CacheableResponsePlugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // CSS, JS ve Worker için StaleWhileRevalidate stratejisi
    registerRoute(
        ({ request }) =>
            request.destination === "style" || request.destination === "script" || request.destination === "worker",
        new StaleWhileRevalidate({
            cacheName: "assets",
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

    // Görseller için CacheFirst stratejisi
    registerRoute(
        ({ request }) => request.destination === "image",
        new CacheFirst({
            cacheName: "images",
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
            cacheName: "fonts",
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

    // Offline sayfası için fallback
    const networkWithOfflineFallback = async ({ event }) => {
        try {
            return await fetch(event.request);
        } catch (error) {
            return caches.match(workbox.precaching.getCacheKeyForURL("/offline.html"));
        }
    };

    // Diğer istekler için offline fallback ekleyelim
    registerRoute(({ request }) => request.mode === "navigate", networkWithOfflineFallback);

    // Önceden önbelleğe alınacak sayfaları belirleyelim
    workbox.precaching.precacheAndRoute([
        { url: "/index.html", revision: "1" },
        { url: "/offline.html", revision: "1" },
        { url: "/404.html", revision: "1" },
    ]);
} else {
    console.log(`Workbox yüklenemedi!`);
}
