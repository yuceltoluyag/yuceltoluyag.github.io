importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/index.json","revision":"83c73152e5bf181c4304f8df4839e5da"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/sw-register.js","revision":"ed81e53e5b607e12d0768da4d67ab92f"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/404.html","revision":"e1316a6306c0e9fc89250bd1924a4f2f"},{"url":"/:title/index.html","revision":"7b400475fa579c80566bd16db5ecba49"},{"url":"/about/index.html","revision":"eee32ff0c3adab9ad96bb534f85ea8f7"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"35ae59f6c198252063e1510251e2841f"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"9a3eb7355797eb2b86f4f556af77c252"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"586f52aec07d4ee5db8450a0334e0bad"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"0f57a92929e8a3ba6fcf3b671ddebdfb"},{"url":"/categories/editor/index.html","revision":"08efa8954d2cc09f9342c6f9feec5cef"},{"url":"/categories/facebook/index.html","revision":"57f59ef2a55fdd43b7ce2de6e0c91e14"},{"url":"/categories/index.html","revision":"898c24119d551d04a35aea48a06e776a"},{"url":"/categories/kutuphane/index.html","revision":"e9047b170206bb3242e3148e6b99ea0f"},{"url":"/categories/linux/index.html","revision":"57cc278022c605ca47b8f87d025a6504"},{"url":"/categories/para-kazanma/index.html","revision":"d0f6d95ab3ce20fe0a16d451917b44cb"},{"url":"/categories/program/index.html","revision":"5f28ed83052aa60ecefe11d668b0c13c"},{"url":"/categories/site/index.html","revision":"c2514ae4ef02e1de020f0767936e5013"},{"url":"/categories/tanitim/index.html","revision":"1c01dd48130114598352c0d0ff591a95"},{"url":"/categories/tavsiye/index.html","revision":"baba351a2b4da9be2ba5c2f42cd179f9"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"a9e58fe9f3b76b1de420d708308485bc"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"6528360677dfbfcd98114f8480e19940"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"a5cab5067fa2a8122e012043c2709eaa"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"726353a149232f9a28963dde2a53a8dc"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"2a6870abd8c66bfba4cab5ef4095e5c6"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"f73c5d60da6080038de29cb00c208cb6"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"da3abae79818c33efc6eb3ce641b16e5"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"ca406aab57555bb39fd7057bcb8c3f84"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"ee7e9e85ac9d3667675484342c388758"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"61350ca0a138adf9088a46ea58d547ba"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"9f0a90b4f493d026646dbb21a9af5667"},{"url":"/index.html","revision":"dd7fd4d92eb7971bb49ce5f5a7fcef7a"},{"url":"/jekyll-google-superproxy/index.html","revision":"b88fda854e8ff2692c411d1272e7dd88"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"46f00203a381cce9f4932187ceface63"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"672b9acf32d700b5e0d33b7aab37a881"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"df4773a17ced0acda2fa8c9aef8bff17"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"478f07e9da78b33070d7bc743976ad64"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"65aa270b0b8f918128bba3cf985da455"},{"url":"/linux-httrack-kullanm/index.html","revision":"ae1c14337256067af6194fdc6e4ea02c"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"acd359890d34069dbc116d56893241ae"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"2b821498f68f711bcbca32d4b136d2bd"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"493305eff5fbe3102df72d83552098ac"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"7203f0fec96a747f0fd62d654619a98c"},{"url":"/modern-mutt-kurulumu/index.html","revision":"39da944d4767bf96dc374bd873f053cf"},{"url":"/newsboat-kullanimi/index.html","revision":"d4e3c385029a82260728c469848dd786"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"5b368e4aba752e41668d3cd048f9132a"},{"url":"/offline.html","revision":"c7217cb9e04b5ed1a0294b5cb6c81b82"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"122737808c68253734416a0870e62581"},{"url":"/onemli-gelismeler/index.html","revision":"6b6a7a9c85734c5ae0d7cefa8147f6e5"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"b5ca52626d26122d5e07fc3788a779ec"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"7894dc8ace9e2b8a4679221bef2a36fc"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"b74ec14dd9de7ed07f122855cfd26a06"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"714088ecdcd20f64af4c344ba198d6a0"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"93890489d275aa029ad9a1099a18480b"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"a165b9dd35465c3c030fcbc70c197629"},{"url":"/tags/apache/index.html","revision":"1925089af37a01d8060c65541c216af9"},{"url":"/tags/belgesel/index.html","revision":"ede7aea9900439b71958e67454c4054d"},{"url":"/tags/cmder/index.html","revision":"8ac894dc0aaf9cee95c69889eb9aa8a6"},{"url":"/tags/codeigniter/index.html","revision":"2a1dc560e3447afadb06939d2dd28c19"},{"url":"/tags/composer/index.html","revision":"38c02296baa111ff2b194be104df22d6"},{"url":"/tags/discord/index.html","revision":"ee7c331f1d969e2d38c5481c9f5de87a"},{"url":"/tags/e-mail/index.html","revision":"b0edce86e998f5d7b728c12d416d6649"},{"url":"/tags/earn/index.html","revision":"1cf570f224ef86067fcf9f2249f144b0"},{"url":"/tags/facebook/index.html","revision":"895cf6bb15b83cc842069c007584ef9a"},{"url":"/tags/film/index.html","revision":"bfe33ce76687f958043d12a8edd3f9b4"},{"url":"/tags/github/index.html","revision":"431acb2db79886c0beb823f5896cfd39"},{"url":"/tags/httrack/index.html","revision":"5b2142a4ae9f762b7d211594e373bfc3"},{"url":"/tags/imap/index.html","revision":"8833bc56f2dfb618b4a1bc15b09853aa"},{"url":"/tags/index.html","revision":"4efe316ad83f3526c507930789ca1d68"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"9c8e9724f4206d5c3d061df6027c5625"},{"url":"/tags/ipucu/index.html","revision":"84523ee34e4be9dbdbb8821517891394"},{"url":"/tags/jekyll/index.html","revision":"2f91bfee417767e1c3a074f57e45c3ba"},{"url":"/tags/laptop/index.html","revision":"aba047804cab619a459d5aa4fc6fc745"},{"url":"/tags/laravel/index.html","revision":"9e83fc4fbebb1e2c1854621b67a4de63"},{"url":"/tags/linux/index.html","revision":"e63b7e75e92cf95d2b94e5b1bcf4bcdd"},{"url":"/tags/mp3/index.html","revision":"04badd8a9dcdc64b8eb013eefadc83a5"},{"url":"/tags/newsboat/index.html","revision":"88a059486fab78a0d654398433f95582"},{"url":"/tags/ntfs/index.html","revision":"f3f914e7b773d0cdc6202a6c581e9101"},{"url":"/tags/nvidia/index.html","revision":"bea9e7f594b8ca98014cdd68858180fc"},{"url":"/tags/obs/index.html","revision":"d146e77451b4efd5817b2714ef3e8604"},{"url":"/tags/pdo/index.html","revision":"7f726be8af7372b1a8c445f1b4a317f7"},{"url":"/tags/php/index.html","revision":"5c0b8da2bfe36dd7bb07c056a5d1ad39"},{"url":"/tags/phpstorm/index.html","revision":"c6cd4db34508ba4f19cb18ebbe9ac091"},{"url":"/tags/program/index.html","revision":"f98dc4a3c1510733c1b9bc44bee72801"},{"url":"/tags/site/index.html","revision":"7bcd05e2bbd00dd48b23dbaf959b4eba"},{"url":"/tags/spotify/index.html","revision":"b9264686bca977e165dbad5b95182c3e"},{"url":"/tags/ssh/index.html","revision":"be2ea3aeee5c374af1aac160f35a971d"},{"url":"/tags/staticman/index.html","revision":"f8277b37ee53efa80cf3545de9df68d3"},{"url":"/tags/steam/index.html","revision":"7dbbefbfc4b6fce8f62ac21e057d6cb5"},{"url":"/tags/sublime/index.html","revision":"981e4d8415c715aa20ce1ba4a34b9fac"},{"url":"/tags/superproxy/index.html","revision":"2856dad1d89078174b386e336755dd47"},{"url":"/tags/sweetalert/index.html","revision":"6058ccc07bae82e81d2e68a66a502175"},{"url":"/tags/tanitim/index.html","revision":"a59a82adf1686951349fb63be210dd10"},{"url":"/tags/terminal/index.html","revision":"b8e6a6f0a173d420679151c0aee574df"},{"url":"/tags/unixporn/index.html","revision":"9e251f0dd342d8560398439314b1f47d"},{"url":"/tags/vagrant/index.html","revision":"120e21ff7feb1e6a09b962f7781bd740"},{"url":"/tags/vlc/index.html","revision":"acbc6ef1e2a1d86d38039e41ba577a63"},{"url":"/tags/vpn/index.html","revision":"8ce2a5871a4912be2a9ada36a4b9e23b"},{"url":"/tags/windows10/index.html","revision":"a8b772587266c9015aa7058b800c16e6"},{"url":"/tags/yazılım/index.html","revision":"eff64a68f0b43ccaf73d6450e86a29f8"},{"url":"/tags/zsh/index.html","revision":"08b7f2a56b394b5f5aeca5fd4feb0bef"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"d00b2ec5e1f08350be59ff2d813ce037"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"b653d8ef4289e8cd900f0d545220e453"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"c979b9c0ad8b2c6d8ebe863d6c865191"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"d418a3d617493bdefde04a2571c5a736"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"a71a61f2aad0dac96e0a9c1bcd4654df"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"a094ea352dc866c6eb27bf3220bb69e5"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"3028eef5462592b01302392ff43710df"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"bcbb7519b865c78bb7402d30c7ef3ae4"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"b556c824cff663e1973ce602e252b830"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"4cd49dde65ff5d6694a09d3efce44f9a"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"e7e6d12dc0b8cc53a1da16bbde15364f"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"4250c430ed05c09eebd78c940709a2f9"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

