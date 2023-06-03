importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/index.json","revision":"83c73152e5bf181c4304f8df4839e5da"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/sw-register.js","revision":"074e240b9aa21d3f0472d99e8d4a342a"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/404.html","revision":"20f6a8fc02c1d21592d642d0596b0576"},{"url":"/:title/index.html","revision":"394bcc77d891854d12c4111593ce66d7"},{"url":"/about/index.html","revision":"105c30c5dc6fd2faeeb3126583052fc0"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"f37bcfb62d964beb3687fb707ae7684c"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"38916f06839c8865b10d9bfdd9d5f025"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"2df229468111a47f1b59c5fe7226e455"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"9664435b9f7952ea9c968bd4f03a4283"},{"url":"/categories/editor/index.html","revision":"e4a447f1029d8a8beae93185a8acde54"},{"url":"/categories/facebook/index.html","revision":"6ee0edd99b81cb8e0c2a73d95a4ff292"},{"url":"/categories/index.html","revision":"2b24d77cc3f3df20ea538633cfad3f78"},{"url":"/categories/kutuphane/index.html","revision":"fdfc822a3972e2881a71c287dbb21ac8"},{"url":"/categories/linux/index.html","revision":"8dbbbdd999f0f5eeb0dead42f1d28133"},{"url":"/categories/para-kazanma/index.html","revision":"0c22f65d7c3a5d4389b1c0cea37e6719"},{"url":"/categories/program/index.html","revision":"e21d82096b1c43c2447cfb6227ade4fd"},{"url":"/categories/site/index.html","revision":"368cff30ef83be2caba4b4502d7d3c69"},{"url":"/categories/tanitim/index.html","revision":"ba980695952d61e08567080f8a222989"},{"url":"/categories/tavsiye/index.html","revision":"139986e0c13e764265cb3f71f8de24de"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"3e93824995609c6c94b1fcc62e06330b"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"43e919316082257afe45e18a2ba3a484"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"c3ec074babad0060fcaf134169beea80"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"2b8db72761b1d651ea6d601c80157fd0"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"be809ba594fe881b2730509f882a3603"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"23521a87d3c682e2a9afcb6a8de673c2"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"359cb28e3387a4311beb5316b46c77fd"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"73f7e8ef860287d438925000f19e5351"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"9790efd6cf9aa427e422113659f76b2b"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"77f5990300711c420b8f4eb89886e9d5"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"683cb1cc725879c10ff96cb937bcac76"},{"url":"/index.html","revision":"1f965c53a7ed5ba792f324e6a49d757a"},{"url":"/jekyll-google-superproxy/index.html","revision":"acb783afdbeaef210f014cdb6bfad6d0"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"df6582b5a6e5f24013264454b5fb40db"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"3c732a610b94e7206feb734af528b053"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"f11e343de8c0dc6b9b61693b14aea1cf"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"7abbf015373981abc8491372bc1f602b"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"7a1c69371a2d85aef44323b899aea165"},{"url":"/linux-httrack-kullanm/index.html","revision":"877a4cd65a185565c5f51d1b22726a66"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"db67f4129eaecec0aa771e7533c778ea"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"42a8c338a4317edab308ea8eda453b8d"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"a9169bfe097ad1827c404ccb5913e1e2"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"7791b93081c2ee9aac07f1660f27f612"},{"url":"/modern-mutt-kurulumu/index.html","revision":"c502e73801d112eb17a5d32905c8638b"},{"url":"/newsboat-kullanimi/index.html","revision":"dc03889d3a2bd30b5b5b5a4c506d2b69"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"92c25da08c2a0927ee0c2faefeca2408"},{"url":"/offline.html","revision":"a6a0590288a9f94a7d44c185360964bf"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"956e7ede638d109faf2092af9ae3b8ca"},{"url":"/onemli-gelismeler/index.html","revision":"46ea26b10f17c4522ad47a5d520296c2"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"79cdea80508c3eaaa39be6a76301860e"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"ecfaf1171b1816ed71a7c79a16be9810"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"a616b77f80e8d8ed7b072046acea0730"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"f45ca0a189211aa896d6c53be875c504"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"74c29dafb56982a067f15055681a6f1b"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"d69599cb02c67d16b474c34361276c16"},{"url":"/tags/apache/index.html","revision":"6a97ff1f447e2131f1a51928e14ea033"},{"url":"/tags/belgesel/index.html","revision":"23fe748bbc48be249c39d590ece5c8c4"},{"url":"/tags/cmder/index.html","revision":"95ab9120d6d26432d3731f7c97dd3e34"},{"url":"/tags/codeigniter/index.html","revision":"6276bda859dac241a7c67b3890d4ab94"},{"url":"/tags/composer/index.html","revision":"7e590a1741ebc0c7c1b4768cd51bfa2c"},{"url":"/tags/discord/index.html","revision":"1693266623428c681856105e4baf5d48"},{"url":"/tags/e-mail/index.html","revision":"62587e540694dd4c4574a3e7b4840a17"},{"url":"/tags/earn/index.html","revision":"3263d37f94426a554482841e5a2bbc3d"},{"url":"/tags/facebook/index.html","revision":"4e174a0fe407822bf8012b5185c2bd8f"},{"url":"/tags/film/index.html","revision":"62a82f67353d2f96afe647cc31db4f00"},{"url":"/tags/github/index.html","revision":"7a0f4a02b6f3f5c438f7713420e8c933"},{"url":"/tags/httrack/index.html","revision":"be468824e410bf07c49daa8be9fe96c4"},{"url":"/tags/imap/index.html","revision":"df46d670467172df3e744f28d67923ec"},{"url":"/tags/index.html","revision":"a8701eaa00e8957c157196e9619e395f"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"82c7f43ab94f87cac587fbf1190813b4"},{"url":"/tags/ipucu/index.html","revision":"41793b1f18052df6ec8675cc8f0800c4"},{"url":"/tags/jekyll/index.html","revision":"eaf7a9a4d1f25057efea76a7733667db"},{"url":"/tags/laptop/index.html","revision":"dbeaedd2160627bf0f58d03bbf40b8d1"},{"url":"/tags/laravel/index.html","revision":"b39a324043ce747d5b65def9b15d45a3"},{"url":"/tags/linux/index.html","revision":"5203f231d0668f2e82386e14819c2bcd"},{"url":"/tags/mp3/index.html","revision":"991a60841e972ca46c295c957e102079"},{"url":"/tags/newsboat/index.html","revision":"94207440c711310663bd96d1ecdba903"},{"url":"/tags/ntfs/index.html","revision":"2975333cf2184f3d09ae0559348111e7"},{"url":"/tags/nvidia/index.html","revision":"05f6c9ef4e161d54eb72e746da878d1f"},{"url":"/tags/obs/index.html","revision":"7f41de0f09237b950321954c8213391e"},{"url":"/tags/pdo/index.html","revision":"7fcf1ae4eec8cb581bc3d82c27dc698b"},{"url":"/tags/php/index.html","revision":"3fa70243ddbd729506806066a2ffe68d"},{"url":"/tags/phpstorm/index.html","revision":"a78c79a6a7745effd3db60e317037190"},{"url":"/tags/program/index.html","revision":"c5900f0b32bc3319098ebe3be8251244"},{"url":"/tags/site/index.html","revision":"dc00fff569248677aa378c69dc22eba3"},{"url":"/tags/spotify/index.html","revision":"49f087c86a30201a494ff5ce6e0a0b4c"},{"url":"/tags/ssh/index.html","revision":"0898d7076aafebb609f9d0857d580284"},{"url":"/tags/staticman/index.html","revision":"4741294a41f1a5e1f24cb1b43e8c3dcb"},{"url":"/tags/steam/index.html","revision":"317a107ea98e7702091a71c1d352f107"},{"url":"/tags/sublime/index.html","revision":"fd2ba957e73b38534ec9e564cbccdec7"},{"url":"/tags/superproxy/index.html","revision":"fbffe75a043a4de1c4a7f8f33737e89a"},{"url":"/tags/sweetalert/index.html","revision":"110b95d5e98a2d461513aedca4654b7d"},{"url":"/tags/tanitim/index.html","revision":"853d7c0f1bcd25eab40882566a99d5a2"},{"url":"/tags/terminal/index.html","revision":"288ebb908115c32b1b41f3943438b460"},{"url":"/tags/unixporn/index.html","revision":"24a5242e731079e0261bcc59266b436d"},{"url":"/tags/vagrant/index.html","revision":"52a2b3cd1ee8086673028d0989b1a8b2"},{"url":"/tags/vlc/index.html","revision":"ef9bbcd03538951288619ae161e901a9"},{"url":"/tags/vpn/index.html","revision":"e97a62338d7c5cf399dc530be4779b21"},{"url":"/tags/windows10/index.html","revision":"e3b9c0007d6193cffb5bc7fd509fba8c"},{"url":"/tags/yazılım/index.html","revision":"6b9d31ec104471275f849d6e187bcc31"},{"url":"/tags/zsh/index.html","revision":"bce925c312c718ec16a846605efe4d90"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"486eeeaa57dbf5416b6c1ec7fb1380a2"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"fe8213363db51a6d2f5a41020eea023a"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"10ac380259d4305d1cdaa2ef84298133"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"5cec68f96e5f80225cfdaf8b25d88f85"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"edd0d5d69c4e8eee2bfac2c0439681ba"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"4a27d55473c5a868af206b1fc7495ce1"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"1219adbe271aff6107376a0080646d9c"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"d86a029e44fe4af28458d6c7b065e73c"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"a2870843a7f2598b0db4992e3d8f03d4"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"f5664ce9a9a90acdef0a9e54538b6b3c"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"68018baedf6d73a97fda7d751ea4d876"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"7d02ef34ee0718fa9063c317fc530010"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

