importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/index.json","revision":"377344ffe439f174f8eb67a3ff8ac1b7"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/sw-register.js","revision":"a16496ddc28203db3041e1e2f2c03756"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/404.html","revision":"720490523e93c1e1b0d5a88d82860fa4"},{"url":"/:title/index.html","revision":"b6b09b2023d80ff5d797432f91d6d893"},{"url":"/about/index.html","revision":"fc067be4f0fd9bae741449db1b09787d"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"f6461eb7fc921332d65526f658c39a7a"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"6ee79ce7e0fb0f27b91fb261109eeced"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"0949e26b9ad80c7ff15c367578c0bbbb"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"e74ee7eda5d4f908608ea1c5d75be1ae"},{"url":"/categories/editor/index.html","revision":"a2b1c32081e7cb5a278788d3ad7b877c"},{"url":"/categories/facebook/index.html","revision":"0e356351b4f81a7b5a5bb1d25897f6fe"},{"url":"/categories/index.html","revision":"133a3254934a08137257d29284c5c5dc"},{"url":"/categories/kutuphane/index.html","revision":"19dae0c0c429f73c8101241c41cebaed"},{"url":"/categories/linux/index.html","revision":"dbdb453ea84f995b30ceced893102a88"},{"url":"/categories/para-kazanma/index.html","revision":"a649681d2e60f94a8242859bb542076e"},{"url":"/categories/program/index.html","revision":"7e08e27adc1f9df5809c05da974f3029"},{"url":"/categories/site/index.html","revision":"7ac4229ea74c65d031a5ecf03822ecd6"},{"url":"/categories/tanitim/index.html","revision":"36d83a71f02c43006e35c604baf4b7c7"},{"url":"/categories/tavsiye/index.html","revision":"d9ce6487a0ae65fbd5e4767f07532418"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"00753bbcb33fba04366962bf696c215e"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"9e7fb3ff3847845e1534bb9ed027dd67"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"86e14ff3cace77e2fd63fdc9b7e43311"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"7670773348db0898a681b83555b3868b"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"b17fb67ba457f5b95a49a0e6dbbda72e"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"a7edefcf72e10cff1e3c6830ad6136da"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"4c29dbac2875380f9324ad0f588b504a"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"2a111779d1c77f1f3c897634fa21779e"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"cac995cefdae022da809b9416ad7375d"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"17833a872264c70bbe9133c8101f3b8a"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"8ae633abe8c2ff62c2d01d3c986d710b"},{"url":"/index.html","revision":"11d872c0396b027c4ed4a8e81f09bbcc"},{"url":"/jekyll-google-superproxy/index.html","revision":"2a83a0a312e218ee5ba086fd1fc5d457"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"ec9893cedf4a58f2b899372c902cebfd"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"cfa86db48224f219d14ea5301c587f44"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"527318c3ae47eaab2bdf72e73ffe616e"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"1700a7151c80f6a245d5c8a3e1caedbd"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"60d70bc842429de9ae858a6601c8745f"},{"url":"/linux-httrack-kullanm/index.html","revision":"6cedfa307954ae2ddf6d42b7e87d9ed0"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"4c7d873561abdab8647093e7e1c79d83"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"ff1509cafcf98bb5fdfe27c9c0a12018"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"3457f47f88813eb6f651e21430944b8e"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"29e8e8a974abc487c3ca0ab00cd28e22"},{"url":"/modern-mutt-kurulumu/index.html","revision":"246b2fb0c9addcd2e933ddc21df66cde"},{"url":"/newsboat-kullanimi/index.html","revision":"e805a0da9d85ebc54b8c0c04a146b528"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"7c555434e41bf08d7128ca56a1ec8d05"},{"url":"/offline.html","revision":"259fffba74fd1f7e215a4957f9098540"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"b39647de5641fecea70c12974cfe7108"},{"url":"/onemli-gelismeler/index.html","revision":"9a3d7f7bb17fb07101c4dcb69c568e9b"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"c2389fd4dfc026eb4fb8d1ccf3cf9ed0"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"f5fb47e72768f33d7ddcb2c183333e66"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"9fb7f6d94ecea12df1ec1bf152af4cfe"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"8cd8a3fda3e242f150ca8266c7219d77"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"38bf771c7f1d6471b9e8201948afe831"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"191fdf43eec9170cf86c58583f00dc83"},{"url":"/tags/apache/index.html","revision":"a3a05893f140b7a4ed8974117f82f942"},{"url":"/tags/belgesel/index.html","revision":"d49474967233263c0c3fc642578554cb"},{"url":"/tags/cmder/index.html","revision":"b9bdfa141b98ab242c091a34f70a4522"},{"url":"/tags/codeigniter/index.html","revision":"fb29dfbd65934affadef3d5ff55375b9"},{"url":"/tags/composer/index.html","revision":"c24b490647526f52aa893b26859a9f4f"},{"url":"/tags/discord/index.html","revision":"614e9ca808feb30100e4bd2399ea1d48"},{"url":"/tags/e-mail/index.html","revision":"656b7d46ad22fa7a337f9a8574fbbc29"},{"url":"/tags/earn/index.html","revision":"f83d73354adbfe6eda41fbb49585e950"},{"url":"/tags/facebook/index.html","revision":"8d5ee614ef0aca8af7958eae608fd0e8"},{"url":"/tags/film/index.html","revision":"3a16d4bcad386a6b0a417c84748a1ce1"},{"url":"/tags/github/index.html","revision":"28d9a2affb390bbbcd4d5293ac787fda"},{"url":"/tags/httrack/index.html","revision":"0e26785776cc9cd029f7776e4631013a"},{"url":"/tags/imap/index.html","revision":"2f6178c94bc241d0eaae772cdd3041cd"},{"url":"/tags/index.html","revision":"f4582e4351fc1bc76ef557ed8754811f"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"0edb586d02ffe29ffd7cb947e211998d"},{"url":"/tags/ipucu/index.html","revision":"5e7a6bcf8cb2da1ad63a59aa086e082d"},{"url":"/tags/jekyll/index.html","revision":"ead4805b050854157d578fa3f16dbd55"},{"url":"/tags/laptop/index.html","revision":"365d9ee3755bf6fca7d4b4631ea7a652"},{"url":"/tags/laravel/index.html","revision":"5e7aeb1457c3acee135491d64ef1446a"},{"url":"/tags/linux/index.html","revision":"f6c3c65f4b6c0ed45a496cd6008d4f3a"},{"url":"/tags/mp3/index.html","revision":"eeba49afdb960647fcd7587ecd70b23e"},{"url":"/tags/newsboat/index.html","revision":"a2c4d9e29106b82acc6c3733667bcd59"},{"url":"/tags/ntfs/index.html","revision":"e5fc0dab1f532be893c2b9d52702e48f"},{"url":"/tags/nvidia/index.html","revision":"7fb5761025a9cd85ffff908fc2718cf8"},{"url":"/tags/obs/index.html","revision":"741effb47114dd93bdde3fad44c0f3b9"},{"url":"/tags/pdo/index.html","revision":"8c069fce8836858cbbe0dbe24f3f3210"},{"url":"/tags/php/index.html","revision":"55dd5465a972fddfcbfd079982ebc24e"},{"url":"/tags/phpstorm/index.html","revision":"56876b4d78386a3d43a66b86d5d723ae"},{"url":"/tags/program/index.html","revision":"62b40bc4fed78ef1bb38c5fdc8a79362"},{"url":"/tags/site/index.html","revision":"d585b9def90b8f247d030538fe7a027b"},{"url":"/tags/spotify/index.html","revision":"0b9dff026a57b283be3bf591113c9ca4"},{"url":"/tags/ssh/index.html","revision":"244632366fc4091636d2300af565fa65"},{"url":"/tags/staticman/index.html","revision":"3e8b4a331ef257c60cc9da02776afe06"},{"url":"/tags/steam/index.html","revision":"84828d1d457e853f6b3167818c9a2b3d"},{"url":"/tags/sublime/index.html","revision":"73a24aa8e59af29a20b04b321ae66928"},{"url":"/tags/superproxy/index.html","revision":"c9407ab8c284e85e2e1b507c6d4f46b5"},{"url":"/tags/sweetalert/index.html","revision":"2adbc9c7993f98cde5698727dbebe345"},{"url":"/tags/tanitim/index.html","revision":"db21968da0322f0d1e7b6890a27b1992"},{"url":"/tags/terminal/index.html","revision":"388378911bfd49afed19e848f5b5fa47"},{"url":"/tags/unixporn/index.html","revision":"49cd8ccbd34f037031e7bf3e432ce16b"},{"url":"/tags/vagrant/index.html","revision":"c33465c04be03d7372d08e280f30504d"},{"url":"/tags/vlc/index.html","revision":"eaabf59f42169734f2980eeb783ffe04"},{"url":"/tags/vpn/index.html","revision":"0ac791d2c605dfc6d84311174844a2ce"},{"url":"/tags/windows10/index.html","revision":"817f8e7b0cc8f22dad31da0e0732efff"},{"url":"/tags/yazılım/index.html","revision":"00150e42ee8ee85bf3264bdd9a9eb66f"},{"url":"/tags/zsh/index.html","revision":"8608ba9018a2023740055d865d8b0393"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"7a64bb8808a71b2346e4fff4f28973a6"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"2df4b55da4a085c4a56741938b25b520"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"358d476f4d52fac6e5a0b9b377806ff7"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"62f9f245de08275e329af0f0bddde495"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"679ce484397ea9af185cf86c003be317"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"14d2430e1836e4e29ad1b877e421556a"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"2bf88e6766278c4716fbdc0ee721ee99"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"afa7f3ff752f769e5deecf5ce9ddd542"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"462a76963b62728dd00a21560b247aea"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"7b7147c600a46f59525ca9bc801f6f07"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"1ae9965003635306864a34f11f6a6378"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"3d66d265473d2c30a6e33b12868eed85"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */

// CACHE_NAMESPACE
// CacheStorage is shared between all sites under same domain.
// A namespace can prevent potential name conflicts and mis-deletion.
const CACHE_NAMESPACE = "main-";

const CACHE = CACHE_NAMESPACE + "precache-then-runtime";
const PRECACHE_LIST = [
  "./",
  "./offline.html",
  "./assets/js/theme.js",
  "./assets/js/snackbar.js",
  "./assets/css/style.min.css",
  "//cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css",
  "//cdn.jsdelivr.net/npm/smooth-scroll@16.1.3/dist/smooth-scroll.min.js",
  "//cdn.jsdelivr.net/npm/autocomplete.js@0.38.0/dist/autocomplete.min.js",
  "//cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js",
  "//cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js",
  "//cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js",
  "//cdn.jsdelivr.net/npm/sharer.js@0.4.2/sharer.min.js",
];
const HOSTNAME_WHITELIST = [
  self.location.hostname,
  "yuceltoluyag.github.io",
  "cdn.jsdelivr.net",
  "www.googletagmanager.com",
  "www.google-analytics.com",
  "fonts.gstatic.com",
  "fonts.googleapis.com",
  "polyfill.io",
];
const DEPRECATED_CACHES = [
  "precache-v1",
  "runtime",
  "main-precache-v1",
  "main-runtime",
];

// The Util Function to hack URLs of intercepted requests
const getCacheBustingUrl = (req) => {
  var now = Date.now();
  url = new URL(req.url);

  // 1. fixed http URL
  // Just keep syncing with location.protocol
  // fetch(httpURL) belongs to active mixed content.
  // And fetch(httpRequest) is not supported yet.
  url.protocol = self.location.protocol;

  // 2. add query for caching-busting.
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  url.search += (url.search ? "&" : "?") + "cache-bust=" + now;
  return url.href;
};

// The Util Function to detect and polyfill req.mode="navigate"
// request.mode of 'navigate' is unfortunately not supported in Chrome
// versions older than 49, so we need to include a less precise fallback,
// which checks for a GET request with an Accept: text/html header.
const isNavigationReq = (req) =>
  req.mode === "navigate" ||
  (req.method === "GET" && req.headers.get("accept").includes("text/html"));

// The Util Function to detect if a req is end with extension
// Accordin to Fetch API spec <https://fetch.spec.whatwg.org/#concept-request-destination>
// Any HTML's navigation has consistently mode="navigate" type="" and destination="document"
// including requesting an img (or any static resources) from URL Bar directly.
// So It ends up with that regExp is still the king of URL routing ;)
// P.S. An url.pathname has no '.' can not indicate it ends with extension (e.g. /api/version/1.2/)
const endWithExtension = (req) =>
  Boolean(new URL(req.url).pathname.match(/\.\w+$/));

// Redirect in SW manually fixed github pages arbitray 404s on things?blah
// what we want:
//    repo?blah -> !(gh 404) -> sw 302 -> repo/?blah
//    .ext?blah -> !(sw 302 -> .ext/?blah -> gh 404) -> .ext?blah
// If It's a navigation req and it's url.pathname isn't end with '/' or '.ext'
// it should be a dir/repo request and need to be fixed (a.k.a be redirected)
// Tracking https://twitter.com/Huxpro/status/798816417097224193
const shouldRedirect = (req) =>
  isNavigationReq(req) &&
  new URL(req.url).pathname.substr(-1) !== "/" &&
  !endWithExtension(req);

// The Util Function to get redirect URL
// `${url}/` would mis-add "/" in the end of query, so we use URL object.
// P.P.S. Always trust url.pathname instead of the whole url string.
const getRedirectUrl = (req) => {
  url = new URL(req.url);
  url.pathname += "/";
  return url.href;
};

/**
 *  @Lifecycle Install
 *  Precache anything static to this version of your app.
 *  e.g. App Shell, 404, JS/CSS dependencies...
 *
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache
        .addAll(PRECACHE_LIST)
        .then(self.skipWaiting())
        .catch((err) => console.log(err));
    })
  );
});

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener("activate", (event) => {
  // delete old deprecated caches.
  caches
    .keys()
    .then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => DEPRECATED_CACHES.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      )
    );
  console.log("SW Etkinleştirildi.");
  event.waitUntil(self.clients.claim());
});

var fetchHelper = {
  fetchThenCache: function (request) {
    // Requests with mode "no-cors" can result in Opaque Response,
    // Requests to Allow-Control-Cross-Origin: * can't include credentials.
    const init = { mode: "cors", credentials: "omit" };

    const fetched = fetch(request, init);
    const fetchedCopy = fetched.then((resp) => resp.clone());

    // NOTE: Opaque Responses have no hedaders so [[ok]] make no sense to them
    //       so Opaque Resp will not be cached in this case.
    Promise.all([fetchedCopy, caches.open(CACHE)])
      .then(([response, cache]) => response.ok && cache.put(request, response))
      .catch((_) => {
        /* eat any errors */
      });

    return fetched;
  },

  cacheFirst: function (url) {
    return caches
      .match(url)
      .then((resp) => resp || this.fetchThenCache(url))
      .catch((_) => {
        /* eat any errors */
      });
  },
};

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r);
 */
self.addEventListener("fetch", (event) => {
  // logs for debugging
  //console.log(`fetch ${event.request.url}`)
  //console.log(` - type: ${event.request.type}; destination: ${event.request.destination}`)
  //console.log(` - mode: ${event.request.mode}, accept: ${event.request.headers.get('accept')}`)

  // Skip some of cross-origin requests, like those for Google Analytics.
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {
    // Redirect in SW manually fixed github pages 404s on repo?blah
    if (shouldRedirect(event.request)) {
      event.respondWith(Response.redirect(getRedirectUrl(event.request)));
      return;
    }

    // Cache-only Startgies for ys.static resources
    if (event.request.url.indexOf("ys.static") > -1) {
      event.respondWith(fetchHelper.cacheFirst(event.request.url));
      return;
    }

    // Stale-while-revalidate for possiblily dynamic content
    // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
    const cached = caches.match(event.request);
    const fetched = fetch(getCacheBustingUrl(event.request), {
      cache: "no-store",
    });
    const fetchedCopy = fetched.then((resp) => resp.clone());

    // Call respondWith() with whatever we get first.
    // Promise.race() resolves with first one settled (even rejected)
    // If the fetch fails (e.g disconnected), wait for the cache.
    // If there’s nothing in cache, wait for the fetch.
    // If neither yields a response, return offline pages.
    event.respondWith(
      Promise.race([fetched.catch((_) => cached), cached])
        .then((resp) => resp || fetched)
        .catch((_) => caches.match("offline.html"))
    );

    // Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(CACHE)])
        .then(
          ([response, cache]) =>
            response.ok && cache.put(event.request, response)
        )
        .catch((_) => {
          /* eat any errors */
        })
    );

    // If one request is a HTML naviagtion, checking update!
    if (isNavigationReq(event.request)) {
      // you need "preserve logs" to see this log
      // cuz it happened before navigating
      console.log(`fetch ${event.request.url}`);
      event.waitUntil(revalidateContent(cached, fetchedCopy));
    }
  }
});

/**
 * Broadcasting all clients with MessageChannel API
 */
function sendMessageToAllClients(msg) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      console.log(client);
      client.postMessage(msg);
    });
  });
}

/**
 * Broadcasting all clients async
 */
function sendMessageToClientsAsync(msg) {
  // waiting for new client alive with "async" setTimeout hacking
  // https://twitter.com/Huxpro/status/799265578443751424
  // https://jakearchibald.com/2016/service-worker-meeting-notes/#fetch-event-clients
  setTimeout(() => {
    sendMessageToAllClients(msg);
  }, 1000);
}

/**
 * if content modified, we can notify clients to refresh
 * TODO: Gh-pages rebuild everything in each release. should find a workaround (e.g. ETag with cloudflare)
 *
 * @param  {Promise<response>} cachedResp  [description]
 * @param  {Promise<response>} fetchedResp [description]
 * @return {Promise}
 */
function revalidateContent(cachedResp, fetchedResp) {
  // revalidate when both promise resolved
  return Promise.all([cachedResp, fetchedResp])
    .then(([cached, fetched]) => {
      const cachedVer = cached.headers.get("last-modified");
      const fetchedVer = fetched.headers.get("last-modified");
      console.log(`"${cachedVer}" vs. "${fetchedVer}"`);
      if (cachedVer !== fetchedVer) {
        sendMessageToClientsAsync({
          command: "UPDATE_FOUND",
          url: fetched.url,
        });
      }
    })
    .catch((err) => console.log(err));
}

