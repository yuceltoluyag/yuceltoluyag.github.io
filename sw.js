importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/eslint.config.js","revision":"6c9a3534c9fa24232f4534fd8d8b1840"},{"url":"/index.json","revision":"83c73152e5bf181c4304f8df4839e5da"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/prettier.config.js","revision":"2816abe8eff2ac6f325b3e0eebe8b7fa"},{"url":"/sw-register.js","revision":"41e6df963eccce8efefe5c51755854cf"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/404.html","revision":"8d022f5121c6e629d4165f7b5dfc02f4"},{"url":"/about/index.html","revision":"fa2dca4a9eab61f32bcb70a0ef1e221c"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"ae71591185ea2cc009defb2379c224a8"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"ce0dea1a84aed024e69a9c251dcb2d41"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"9351ecd71c0ca78ec5864e9a665db6db"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"a74c03350c5fbd170d419ec2d75b7567"},{"url":"/categories/editor/index.html","revision":"bc54e376d203d389b24c8c3e6dc152f0"},{"url":"/categories/facebook/index.html","revision":"1432013280745336eb393f8bd8b1e21b"},{"url":"/categories/kutuphane/index.html","revision":"b4c008d6b633957272f6e17e52e8c965"},{"url":"/categories/linux/index.html","revision":"c26bca7b2e792c10cf2d31dc817d206d"},{"url":"/categories/para-kazanma/index.html","revision":"d7a115a39ac617565315773cad6df0e6"},{"url":"/categories/program/index.html","revision":"e751b6e84d3f6f88b2dfeb6c768d5f5f"},{"url":"/categories/site/index.html","revision":"a940e87c9f1f947070809d1caa7603fb"},{"url":"/categories/tanitim/index.html","revision":"8fdd1a534b0aafdaf3e1cf1ea7948348"},{"url":"/categories/tavsiye/index.html","revision":"a9adf4948b3e6434408d7d0536fcd464"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"075c1407399f0714156cc084c84726fa"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"040c7daeca88ec08c5d4547a1e778a0b"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"53f81cf13d7cb8dc7f3e886097ca4703"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"be9cd8d69b4eb53707863627d8aba0ce"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"e39134d8f5a20400abbec3faf313eff5"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"10756f652bad8fc5ae7b714b28e60c32"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"df6dc62e2f243ae11e3bf213ec17771a"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"e4e4971bb24d45546b55c2fd089ef716"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"08e767a9a68c78b1ac0c10fd98f7618a"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"0bbe5f74946110127b164224b8b19932"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"30fa506a3d0c77bd534460e876dacb49"},{"url":"/index.html","revision":"fbe37be296daa4b25271f41e8b12a423"},{"url":"/jekyll-google-superproxy/index.html","revision":"a6b241097e6296ad3f5dbfa9420a79e2"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"4f15b16db2cba3a73b2b56485b486b67"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"6f674723a3b7690cc5553aa2555fd3fc"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"a4e00dd8e788c18a176a45174179ec33"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"e64d89c27698727f9550766a57ad34cd"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"c292fc5388f702b430956662179535b0"},{"url":"/linux-httrack-kullanm/index.html","revision":"42e48f72d7eb382e218ffb9509d76b19"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"fb66664481eeef505a6d2a8ddf2dafe4"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"129df0bb95bf28267d4b870374908184"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"98a17dabb670a12749b4120e742670f1"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"8308a98281c3b3180867d96eaae756c6"},{"url":"/modern-mutt-kurulumu/index.html","revision":"2e3ab1d7d06e8935d18043b8db420f8f"},{"url":"/newsboat-kullanimi/index.html","revision":"a5601e6054affd374a3a2767fd1a4ab7"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"0c5480c5d2bf407d5a2707a17b46bf05"},{"url":"/offline.html","revision":"f5ce84c5cc8a44f6dc368f7c4d081ba8"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"91419eb6ac2c52cfcffe6c56b989f6ec"},{"url":"/onemli-gelismeler/index.html","revision":"6ea9d3e41c4293d976ac472f868fd764"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"bbd65f797444246836c043ba40420d8b"},{"url":"/pages/categories/index.html","revision":"4dbd74618d754c032e6187f0e5deb1e8"},{"url":"/pages/tags/index.html","revision":"6e8c5af1bdda9bc46f0d42ffd1d9a089"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"fb972268478e690d696f09823930d323"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"e276eb0c14f378dbb99da07ec17ed99a"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"09c1fe4738878828191fed42770a0cd6"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"40b45d07bf5554a995534d5d80350da1"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"fb86bf5b26b05b6d37a2ea364390ea6b"},{"url":"/tags/apache/index.html","revision":"6e5c0bb212dd82cd9d3bf6ccb8cac4b0"},{"url":"/tags/belgesel/index.html","revision":"e6755192aada52c064cdbb9c83f68a84"},{"url":"/tags/cmder/index.html","revision":"969729253de5f8b73355d78e684294c3"},{"url":"/tags/codeigniter/index.html","revision":"6b9d4d0a2d89588b95a80cb6c363b4ec"},{"url":"/tags/composer/index.html","revision":"830e47945dd53b7fdcc05772aa9ef30d"},{"url":"/tags/discord/index.html","revision":"b350e8cefd744ed3a5b417211a3ca521"},{"url":"/tags/e-mail/index.html","revision":"b50495c43e9334d829a221ecd8fb973c"},{"url":"/tags/earn/index.html","revision":"997c93fec5a2cad2157a241225d4a705"},{"url":"/tags/facebook/index.html","revision":"4c6b8b037b68cd86a8b9a426ab26fcfd"},{"url":"/tags/film/index.html","revision":"95a8a93eea4e8df41349e5f68e394357"},{"url":"/tags/github/index.html","revision":"8dd8fbb1c099313a153fa510cd88543b"},{"url":"/tags/httrack/index.html","revision":"71680a753ecf2ae51727dc9683be73d6"},{"url":"/tags/imap/index.html","revision":"39cdd65cca3884d0575d32e5839201d8"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"a59968c9310daa65fa844fecb621522f"},{"url":"/tags/ipucu/index.html","revision":"d177df96dc60967b237f22dae262cbba"},{"url":"/tags/jekyll/index.html","revision":"cf28b4551aae6d4d8f455cea6111520b"},{"url":"/tags/laptop/index.html","revision":"211ce51e71eecf7c43b6228c46882b77"},{"url":"/tags/laravel/index.html","revision":"84fc7d660e24e3579d91741addb57575"},{"url":"/tags/linux/index.html","revision":"4a21c0479521685ca7ca745c329f190d"},{"url":"/tags/mp3/index.html","revision":"2fdd1c4e974610b5b03318ac9fdbbf10"},{"url":"/tags/newsboat/index.html","revision":"d588f8fb0f009b1a5ca448565dec863a"},{"url":"/tags/ntfs/index.html","revision":"961b0db271f9bcd18d49a6255d3c0796"},{"url":"/tags/nvidia/index.html","revision":"eb6cab5b16df64e56e595219dbf46af4"},{"url":"/tags/obs/index.html","revision":"308d80c81e01965c381e76ca77728f99"},{"url":"/tags/pdo/index.html","revision":"7f5d1da9934d3d3b03005ad4184e623b"},{"url":"/tags/php/index.html","revision":"5202ce7763dd34e9f89038abeb66e12c"},{"url":"/tags/phpstorm/index.html","revision":"4f30d83a791be6944519fbc567dcd243"},{"url":"/tags/program/index.html","revision":"48787ab25b62120d045c90fecda0e4e4"},{"url":"/tags/site/index.html","revision":"9e263978d01d07719217fc7f5b64968f"},{"url":"/tags/spotify/index.html","revision":"03984f6d234b266df4e6314483e4fa8b"},{"url":"/tags/ssh/index.html","revision":"7e4b0a01855a6b4355bc696c5feb30d3"},{"url":"/tags/staticman/index.html","revision":"42589f57c9c932ec686eb040a46ec6c1"},{"url":"/tags/steam/index.html","revision":"1f542f8243a9d9df369ad3e4c880e3aa"},{"url":"/tags/sublime/index.html","revision":"59973cb88090f2a29fc4e5a7c9361957"},{"url":"/tags/superproxy/index.html","revision":"2be54b046c182b12a998bda944fa3ab5"},{"url":"/tags/sweetalert/index.html","revision":"35c56a19b123d36f0d4f66b43dd73b62"},{"url":"/tags/tanitim/index.html","revision":"1a39f2a4793975158ec6b775002766b0"},{"url":"/tags/terminal/index.html","revision":"f46d43053b91e01b040d40c34bd588f4"},{"url":"/tags/unixporn/index.html","revision":"7d1bd5735b90d1d79fdcd07bae3f17b8"},{"url":"/tags/vagrant/index.html","revision":"f8ce644dcebd0ee1190ae113382280d6"},{"url":"/tags/vlc/index.html","revision":"6b7d4c18daecfd98ddc0fe02904246a7"},{"url":"/tags/vpn/index.html","revision":"73d175cc21dff1e6beaec64bd376b0fb"},{"url":"/tags/windows10/index.html","revision":"b6664db6fdc61bb65fbea641956eb276"},{"url":"/tags/yazılım/index.html","revision":"1a83916d4700cc9b4ab5c058d94e2e94"},{"url":"/tags/zsh/index.html","revision":"9ba7c26eb63ebf42f86b99c22b686477"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"4ed315d8ae4a348d589fefea01614b63"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"55edeb15e714f5874ef9cb40f55af239"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"d74f2d4aef78fd856b752968ddeefafa"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"723a357459238370450ceca50825bd81"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"7b6df07e2f4e137ac48a2c1c404c1128"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"359b7d59bbcf0da5b276931354590000"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"680cf6ccd8d81e588ecedf34a67b1b12"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"58b19645e706e56ad5a0cf231c4ffe66"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"142ec06f55d5b5c0c5cdef0fdf347005"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"e1b1bc6308ddaadd3aef54938049299e"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"3ef66f54cec7246e84b29fdf0b447380"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"5ee781471d680aaf099da5e248dc6699"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

