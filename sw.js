importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/sw-register.js","revision":"eed9fa077738250da08932a4c8ec4b54"},{"url":"/index.json","revision":"8a733f052a537b4a80db412c5cccc043"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"e755b26a84604bf06fe9cb529dbf4fbf"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"758c3873e65868de843d6e52f5f5120b"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"1a620f766cd9dbc04cf73d82c450b5b6"},{"url":"/categories/para-kazanma/index.html","revision":"47ff0289d1fb6068cbe0347cce493f73"},{"url":"/categories/facebook/index.html","revision":"6a7e98f3ec8d7924348636d3f59bfe1d"},{"url":"/categories/kutuphane/index.html","revision":"9e9d42710654b30a410a1226ae093cf8"},{"url":"/categories/site/index.html","revision":"234c6f03e748aa077e2f44c4b4c98d00"},{"url":"/categories/program/index.html","revision":"4bde7a3af6089188d38fc172a43259f3"},{"url":"/categories/editor/index.html","revision":"d724f4d4732e99bf8e4912b89abc4b41"},{"url":"/categories/index.html","revision":"d5ececbea6bc3f6f55303437b2eacf2d"},{"url":"/categories/tanitim/index.html","revision":"2f7645973084f880d484f517432e422d"},{"url":"/categories/tavsiye/index.html","revision":"c923650cd8ba7b55853693a1858f8c2f"},{"url":"/categories/linux/index.html","revision":"079ae745977400d42c76d84c09b7f80f"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"bc61e43d34bc11f94abca98fffb65a64"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"ebd33d7e0e9458a305c8f7c4753de416"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"c19c1b1e3f1b870d840df3504ef783e0"},{"url":"/tags/e-mail/index.html","revision":"d93d9c2fb9e717fb32b6327ce0985f92"},{"url":"/tags/newsboat/index.html","revision":"7ae286c21679438c58464f7e21cc6b22"},{"url":"/tags/sublime/index.html","revision":"8a91c8a989b9f963fbe8830c89386448"},{"url":"/tags/laptop/index.html","revision":"e02a2545abb2cb707d34aecc01863305"},{"url":"/tags/vpn/index.html","revision":"5d24c8db2b699868733fb7f174ce4023"},{"url":"/tags/facebook/index.html","revision":"9703abb6880f529d300dce96f9685520"},{"url":"/tags/php/index.html","revision":"dc86ff9bb4beaff44181d2f3e63424dc"},{"url":"/tags/httrack/index.html","revision":"e9888dbdf1abbf57bc92f4af1aeb40d2"},{"url":"/tags/apache/index.html","revision":"ed1dfcf7c17d9c3252445294e7c20bde"},{"url":"/tags/phpstorm/index.html","revision":"4a7831f52fefad864a341c562d60be29"},{"url":"/tags/terminal/index.html","revision":"39febaab8059c141b12530337d1b9e32"},{"url":"/tags/superproxy/index.html","revision":"5f8ad1f5d98364a5c64c4493662a3057"},{"url":"/tags/ntfs/index.html","revision":"fe3b61cd40b73bad001620422b35712b"},{"url":"/tags/site/index.html","revision":"068d6307304342e10040f8382aea347f"},{"url":"/tags/yazılım/index.html","revision":"d216be0b359339b43326f3520c0f715b"},{"url":"/tags/nvidia/index.html","revision":"00469ce197053386543e5b94707dfcdc"},{"url":"/tags/belgesel/index.html","revision":"aa04c5c578474a93b966e635473de9f6"},{"url":"/tags/program/index.html","revision":"aa7d7f7278bfd50f0c5df896059225ca"},{"url":"/tags/github/index.html","revision":"133d18ad6730d4a0cc6ccedab3abede8"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"45a75fb57e11684ae10a1bd998ead366"},{"url":"/tags/windows10/index.html","revision":"da3ed018e9d4df1cf9f6f315121c9215"},{"url":"/tags/mp3/index.html","revision":"e4bfc64b270dcea7b338310f7f24fc6f"},{"url":"/tags/film/index.html","revision":"4c82077a801628a1928bdb4b6a28b7de"},{"url":"/tags/pdo/index.html","revision":"476c533f9e930931b9ab40292bc7d20e"},{"url":"/tags/earn/index.html","revision":"10c203730effb3cce9e5617205497708"},{"url":"/tags/staticman/index.html","revision":"659cb4025523eb08528948c72dd6a598"},{"url":"/tags/obs/index.html","revision":"81591cc89c8e88b2f5c4d4c06f10c882"},{"url":"/tags/index.html","revision":"5dff9cafc2d8880f8e8b3b0c43ec3678"},{"url":"/tags/tanitim/index.html","revision":"98b28ae0e8c8ee28247bfe7903c9d919"},{"url":"/tags/ipucu/index.html","revision":"3a2d09a454b7ebded63dba99168c1f53"},{"url":"/tags/imap/index.html","revision":"8c851de73cf1754588dd87168d82fbd3"},{"url":"/tags/unixporn/index.html","revision":"e68f9b079b3a38bb02d6eee09a98d44c"},{"url":"/tags/discord/index.html","revision":"e35659211990cece57699a9f75997e3f"},{"url":"/tags/vagrant/index.html","revision":"0c8bcc136a83182ae30a2c271d21d646"},{"url":"/tags/steam/index.html","revision":"f0999d495a0c5fa7e7cd587a9a2c0f0a"},{"url":"/tags/laravel/index.html","revision":"fe65e8a69781525c03ea81a2ec9d9d72"},{"url":"/tags/codeigniter/index.html","revision":"728635bd3915804f58487e300b32d2e4"},{"url":"/tags/linux/index.html","revision":"337efb3a689542cb38dd185a709a9276"},{"url":"/tags/spotify/index.html","revision":"73dc9ae97a22e5167371b3c3eec90a25"},{"url":"/tags/jekyll/index.html","revision":"b5c5a3bd8e141a7b7321e4721fd852f7"},{"url":"/tags/cmder/index.html","revision":"601680493d9552db0e713c03539f6ab8"},{"url":"/tags/vlc/index.html","revision":"007d6f495052dcc0ed4106366bd6865a"},{"url":"/tags/zsh/index.html","revision":"44012bca617b8db660bef36f482662bc"},{"url":"/tags/ssh/index.html","revision":"2cb2cf6738c26e1ed4c92216879fcfbd"},{"url":"/tags/sweetalert/index.html","revision":"798bdb54a1cb3d5dadd19ba2c268b691"},{"url":"/tags/composer/index.html","revision":"f4ae7b4eea92d7f2a8594966f35c917c"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"b53e0a5506b58b0a532986d043d6d755"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"ca64a3e73f79fe41d8912ac40b3bd62d"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"3fcbf1e1be268e54b86ff2532029c8c7"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"2bb6b0e7c805c2125327a4b37b70edc4"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"7594911b4a66f7f73a6fb57e8c3089b4"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"92e99ac51425d510d967e5491094e3df"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"53f6b6565d299f1de53b09955dcd25b8"},{"url":"/newsboat-kullanimi/index.html","revision":"d710b298012ed467c35c71c17e578847"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"c02defae0db61cc05ee5f02fe3a90ea1"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"54d6f30c76e4dc704bd358a8e47a07a2"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"8cf090db5c24af555fecf639a0bf39a1"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"105db7050ca91fd181a4c275932d243f"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"c33d9043b7898e19d71ccbce3f9c3bab"},{"url":"/jekyll-google-superproxy/index.html","revision":"29de3b11274cdccc9a0732f9e9697075"},{"url":"/:title/index.html","revision":"3e42abd2f2765d54602220b8ba5d35ed"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"5edb2185a3af4f67d9321468b1488598"},{"url":"/modern-mutt-kurulumu/index.html","revision":"05232cc6a84044e1f6ecdd928566e040"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"801923c7e32bd3b11fb799ab880b9160"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"0ef19a9fc30af7c412f52e70135d3ac6"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"1134ff949592965a6ecae494aad937c6"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"e4a0d9fe89c2e62640b7739c00693e4d"},{"url":"/linux-httrack-kullanm/index.html","revision":"f3a5d846369174e39d34fc5ea9af00ae"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"e97de9554ba3849bf63ee04d1cac9f38"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"a621412a7ea00d008acbb56eebd51ba8"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"617a73f1793ab263aa42e01af00f288d"},{"url":"/index.html","revision":"92e7c6b271c0e863d5c3fb174426af15"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"0764967adee9222027f27024486ab440"},{"url":"/404.html","revision":"334e2a57523df9cfccb50fd7f14dde66"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"cf126114427ae85a7143ff0d71c8a3b6"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"abd3525333d745410e09303583b321d0"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"97d471f22a5cdf48288360d773358cc2"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"16244de1cbb543dcb0b996899e94757d"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"5355574de771a4674f955522896773c0"},{"url":"/offline.html","revision":"1a84d8c8c0f38a3d6aa3d77226bce91f"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"7fae75fe0112b2a7aa87bf997470d2c3"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"891ffa89a936e5e4f89d8532c4e2d978"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"4fd418fd845fbb048255523a477ccf91"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"8814f2ab56b7429d569157b23d6de11a"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"5e1a73a9c599fcfcea0d770dbc28ba11"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"5238484222c45033bf9dae408225a241"},{"url":"/about/index.html","revision":"156e50394000a8e00b3d552a0eec902f"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"920a2b8e809d7ff7b9ed4aecc95563e6"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"9b7857caf21a8cb036d52ea3c61accc8"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"e482e960e0f49f14069febbfdc7c0837"},{"url":"/onemli-gelismeler/index.html","revision":"29caf35beb842e2be2ca7ce0714c494d"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"fffacd5477c0fa46377bd89bae1bbb15"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"53fb9d893de9452c7df14f2b6dfc9c34"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"52667f2591d02aaea50d9eab653102ee"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

