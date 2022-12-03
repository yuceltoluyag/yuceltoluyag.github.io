importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/sw-register.js","revision":"a0e02c0783f5d1be3f27ee8aaa9b5564"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/index.json","revision":"377344ffe439f174f8eb67a3ff8ac1b7"},{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"de147f3259a06f7b4fe41fa9a9edc588"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"5b7ac9b3c731499b3bc2c7fcfafa6d65"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"c3634cdbef19cdaaad4d63d4c6fa90a7"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"71042e42016fb5903e45d4cd0a2e737e"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"2b7c56a5aa33215118657578747d623d"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"98bd7a3e3c983f4a8d414e23040c4e92"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"6f00fc502a3d73a7814d65b82ee00bf3"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"9aa34b89f0aa791e027821c12894ec93"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"388802b76fee7cfb6b1608223fed8e24"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"40d265add4f3299b9a915456fd308170"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"dbf7bf4508f20f870406182910f90448"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"cab128e8e35429c8f319db6d3ea1a2f8"},{"url":"/linux-httrack-kullanm/index.html","revision":"fad460fa4e0a68e0b31d256bdd248eff"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"5c20537676e86ff4405df8d40a257087"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"e729ae47bc0a7d86a3c9def4a9b8930b"},{"url":"/offline.html","revision":"fb9119d3256cb2e7c4498d391e1e2506"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"599181662c85a17a72262dd24003f992"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"b114e797b8e2c18c0015d69d0ab76598"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"a91282e75e21d1e1f5f512f8e6770ec4"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"a9b0ddeb1aaa8d997e7826348c07ed0c"},{"url":"/index.html","revision":"20c7fd2423e5e8c355fc6ae0daffaff6"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"2789544173753838fc0db24c0a8c42c0"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"8aa1ab6f80236652e0713f53348f6bcd"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"2d8dc5fff754e0700b8120144344a1c6"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"a3fa086cf7118f49ba3aee975355a16a"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"ef3d02f0c638347d251aa7810555d830"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"a2a3d768b69e33043fb3ec6ae472f63a"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"d296573cd1be89a56abfa09e6593dd85"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"2822f84a756e74650b21e74a1f59ff73"},{"url":"/categories/facebook/index.html","revision":"ccfeef0168cb0586b1e1d6d75ee73f35"},{"url":"/categories/tavsiye/index.html","revision":"e593d236abb6cac8fd6707e773eadfb6"},{"url":"/categories/index.html","revision":"ab38aa98b889cae093a92677e95cc7ae"},{"url":"/categories/site/index.html","revision":"7ff70b1e639012a1b9b0162f745c2561"},{"url":"/categories/tanitim/index.html","revision":"f6eff5512b75b8ec3ab423a16b0bd4b2"},{"url":"/categories/editor/index.html","revision":"89b9a8c3384bec14f2a45417171e89a4"},{"url":"/categories/para-kazanma/index.html","revision":"94084aa04f3de9e7d08ceecf03bf20c6"},{"url":"/categories/program/index.html","revision":"a6a95b2afa5b8c369f8459370fb01e41"},{"url":"/categories/linux/index.html","revision":"041f88acbdd045c65cc046731b116fed"},{"url":"/categories/kutuphane/index.html","revision":"52092964cb6de8124ac5190a0bc44253"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"e3a771b12230c9a38669b9e357bbc67f"},{"url":"/tags/spotify/index.html","revision":"9731047d6bf0a962cbd9a28ee001984f"},{"url":"/tags/sweetalert/index.html","revision":"6a493d3f246c5da06c60f0e0e50d983b"},{"url":"/tags/nvidia/index.html","revision":"9b2a339c6bdaedfc55500e661d387eb9"},{"url":"/tags/httrack/index.html","revision":"f407b5d422615fe176ad15afade33b0e"},{"url":"/tags/vagrant/index.html","revision":"dcec5a15c12de4a13eac56955aa38ae6"},{"url":"/tags/vpn/index.html","revision":"8c607de2562a1516d5f90df851494d7a"},{"url":"/tags/facebook/index.html","revision":"fc01ec87f4baab3d2d9eb2eedb7b53d0"},{"url":"/tags/steam/index.html","revision":"397469844bcc6d1047e085391d8db80a"},{"url":"/tags/belgesel/index.html","revision":"6e2e13be090593b4eb606cd71d5285e3"},{"url":"/tags/windows10/index.html","revision":"08dbc88e5718ddf9ea08691d5121227a"},{"url":"/tags/imap/index.html","revision":"43d300a4f7e07814678258fa906b1c21"},{"url":"/tags/codeigniter/index.html","revision":"b734f9606d1807aaec2fccefcf8c18e4"},{"url":"/tags/laravel/index.html","revision":"d6a8d6d41651c18300ca2b3f81d9338f"},{"url":"/tags/index.html","revision":"c8953b5c9aed28614ab66b71bbde661b"},{"url":"/tags/site/index.html","revision":"5f68572c58ba00e1ae831a92d7c08a1e"},{"url":"/tags/github/index.html","revision":"8379fd2ce3ee49e1d1fe3f22a83159a6"},{"url":"/tags/e-mail/index.html","revision":"5be3281ee41e1c4c695e517063ee2593"},{"url":"/tags/film/index.html","revision":"38334007f945b40a510cd79c2f28d040"},{"url":"/tags/tanitim/index.html","revision":"44a5a20641abf8bcc8bb84e93840ccc8"},{"url":"/tags/sublime/index.html","revision":"422db131a8341358046e9c5e81ff8b19"},{"url":"/tags/newsboat/index.html","revision":"6fbb2964365220b186622a6214dbe0e4"},{"url":"/tags/ssh/index.html","revision":"d3ec29fc6c64f73ade20f3817d330662"},{"url":"/tags/ntfs/index.html","revision":"fefdf5923d348a0f253e5837ef3d9db5"},{"url":"/tags/ipucu/index.html","revision":"6645660f2ef042d84ea6cc24ab1cd4df"},{"url":"/tags/staticman/index.html","revision":"098f3df6086dc2109d1c8d8e032cc364"},{"url":"/tags/superproxy/index.html","revision":"6ad4ed3aa34a81cc85ea75fc51bcf8c4"},{"url":"/tags/obs/index.html","revision":"8990d210fa6add4cd1a2532ff6d96435"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"913b30c891500885c275136826b22d58"},{"url":"/tags/terminal/index.html","revision":"f9cec00c07686a2ab51e22fef0fd54b6"},{"url":"/tags/pdo/index.html","revision":"8c7d4bef080b78d8584e11de8fcf6631"},{"url":"/tags/discord/index.html","revision":"32eaa19723a897e08aa540590a408504"},{"url":"/tags/program/index.html","revision":"4e1ee85535e08f8cfb328ac6623a9e7e"},{"url":"/tags/linux/index.html","revision":"006d9a330b1de670794549aa3a0dac3e"},{"url":"/tags/composer/index.html","revision":"760a26fd2615f2aa5f6173ff43874cec"},{"url":"/tags/mp3/index.html","revision":"0e80dd8daa75dd125547a8dd928964ed"},{"url":"/tags/vlc/index.html","revision":"d6b599d4859da584a842e65d8bd68b69"},{"url":"/tags/cmder/index.html","revision":"5e0656de768c59ea966855f76f08633d"},{"url":"/tags/jekyll/index.html","revision":"838bd507c350edb64b9720a87cb6ba7d"},{"url":"/tags/earn/index.html","revision":"635ae6222702673fb4ebdc7855a23805"},{"url":"/tags/unixporn/index.html","revision":"2bc08c15981629c35198f4c5f615a905"},{"url":"/tags/php/index.html","revision":"9502bd92bff840bebbb635f3767c9608"},{"url":"/tags/laptop/index.html","revision":"1006864d3580eb4f29bef36a9615a3e9"},{"url":"/tags/yazılım/index.html","revision":"edd17b5aa232a2954487d9dd61a5e54c"},{"url":"/tags/zsh/index.html","revision":"ce57d4ffc872d9eb178f3dcb52974ad8"},{"url":"/tags/apache/index.html","revision":"6a53126b21752456c19a52e63fc1ce60"},{"url":"/tags/phpstorm/index.html","revision":"0d067617a10844db1db218a235a85d11"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"10a2808403186095873b43866a669c0c"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"2085624cab9d01b414095c6f10c9ea24"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"e9f735ffd4c89a33dee79db7363aa997"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"bdbaee0187de047bb42f9a7d28f91254"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"685482b6fc3d96b3b2de9f5494664da6"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"07d0618dd07a73a0710baa4eae505393"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"f16c04f27a184229ef04d8bf763a52e0"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"51e70a934309d17b2da5fa694a0ce405"},{"url":"/404.html","revision":"9fdb629fd9e137840e17cb95b0d6940b"},{"url":"/onemli-gelismeler/index.html","revision":"de733ca958bf84d7c09af0915b572239"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"386a0fb781165b3938748fdf9fb80430"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"7b0af4f8394b73da5a71a4a2eeddbfc5"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"ed37c05bc225e625f3a09105dcad14a7"},{"url":"/:title/index.html","revision":"af5e65bfc5f88e5c9f05af065a27b63e"},{"url":"/about/index.html","revision":"d208d3129059aa33419bdb9100767f00"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"3ac389af7ca2c15ad1bce1d9af31ed7a"},{"url":"/jekyll-google-superproxy/index.html","revision":"28f8fa3db114379b6a3e5e753a7e2931"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"3ac17079b1f90ed4606b0572c0b9e333"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"3d8c4936c6525bba470f56c23c9cc88b"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"f7e05ba01fe8a5c01121b40238ea69c8"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"970c945bdc86b06bd7664d946861c4fc"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"5ab419811bf52d4a17e47972956e060a"},{"url":"/modern-mutt-kurulumu/index.html","revision":"c3fa8e681be139ee1a13557d42dbe47f"},{"url":"/newsboat-kullanimi/index.html","revision":"9458a259240d21d51d9c4c8488bbe839"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

