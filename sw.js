importScripts("/assets/js/workbox-v5.1.4/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v5.1.4"});

self.__precacheManifest = [{"url":"/gyedek.js","revision":"ba17c0a0d358815baeda612c041fb14b"},{"url":"/index.json","revision":"83c73152e5bf181c4304f8df4839e5da"},{"url":"/lighthouserc.json","revision":"c098b22f3567d468beab551436f2c8f6"},{"url":"/manifest.json","revision":"221984d6e1aadbc4c76cf14e080efc6a"},{"url":"/sw-register.js","revision":"da3879844e9c57fdeb4ba64dacd1c2d5"},{"url":"/favicon.ico","revision":"21620055c8f33fd16aaf550f58d4c67c"},{"url":"/404.html","revision":"86a04d88124153d614d3432602a2e23d"},{"url":"/:title/index.html","revision":"65dad0f6c6f31769c0ef43b380301808"},{"url":"/about/index.html","revision":"3e4bbd599348685ec1bf38c2b83411dc"},{"url":"/arch-linux-apachelampp-sanal-sunucu/index.html","revision":"bc65f8e0054524023b746dae0cbd32d5"},{"url":"/arch-linux-lampp-kurulumuphp7xmariadbmy/index.html","revision":"d738965afb05a43cd220ef596812e0c8"},{"url":"/archlinux-ntfs-nasil-yapilandirilir/index.html","revision":"520caabf46430fbffc2554b379e67f0e"},{"url":"/archlinux-valet-kurulumu/index.html","revision":"ce7761fef91d27328d4682bd13ba6faf"},{"url":"/categories/editor/index.html","revision":"ded3530b3a7d5516f23f2959d9cda6c4"},{"url":"/categories/facebook/index.html","revision":"3910acaab1793715bda00d3ca63aa834"},{"url":"/categories/index.html","revision":"4ef285d563ffa4554396285fe195a495"},{"url":"/categories/kutuphane/index.html","revision":"a4eee24a6700641cbf4f9346981dea8b"},{"url":"/categories/linux/index.html","revision":"bab44363b76720485f755fefc0f0ca03"},{"url":"/categories/para-kazanma/index.html","revision":"cf0dd13e24137564e4be9662a868ab31"},{"url":"/categories/program/index.html","revision":"6e21ed0ed10b722d06add6a8495f9880"},{"url":"/categories/site/index.html","revision":"5f156a0625afdb3658ed21975002c7c2"},{"url":"/categories/tanitim/index.html","revision":"8a889b54e976e15638f6ada1d3da4b2d"},{"url":"/categories/tavsiye/index.html","revision":"fea66fa89766b3e95a1d15665bdec012"},{"url":"/composer-yavas-indirme-sorunu-cozumu/index.html","revision":"f1c257da17df3d7dccbe27ca6ffc0229"},{"url":"/earncom-nedir-nasl-kullanlr/index.html","revision":"44664ff16545c9edde604e6f88e021fc"},{"url":"/elektronik-sigara-zararlimi-faydalimi/index.html","revision":"1d924e64c8b215e32c8a81052e82eb89"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/index.html","revision":"e9b57ee2560d2981f86ccfbfda924944"},{"url":"/facebook-otomatik-arkadas-ekleme-sureli/index.html","revision":"21ad47343892f6957053879a9b998d7f"},{"url":"/facebook-toplu-arkadas-eklemegruba/index.html","revision":"74ed99fc59a03b84a0a68f7882782f1a"},{"url":"/facebook-toplu-grup-2021/index.html","revision":"4f6a70316c39640a65b6e47599be3275"},{"url":"/git-ssh-key-olusturma-windows/index.html","revision":"1a97bc38e4ddc877484fda557251f9ae"},{"url":"/guncel-ucretsiz-steam-gog-epic-oyunlari/index.html","revision":"d1e96e647299855a932fa985d1607a1b"},{"url":"/her-turk-gencinin-izlemesi-gereken/index.html","revision":"75c743ba185f2df7b5bae4754e695487"},{"url":"/imap-openssl-terminalde-kullanim/index.html","revision":"84ffdef77bf35c6c83165cff2aa4284c"},{"url":"/index.html","revision":"c06f8ac6d25bbf3817a31e2022ed2487"},{"url":"/jekyll-google-superproxy/index.html","revision":"7c4229e212c241c173980df3b2beccae"},{"url":"/jekyll-staticman-eklentisi/index.html","revision":"012389d53a9c0b5726ae3dce93bb306f"},{"url":"/kullandgm-enfes-sublime-text-eklentileri/index.html","revision":"c884525c96211edb38349ff111f2c259"},{"url":"/laravel-ide-helper-kullanimi/index.html","revision":"7303d69a14f8b16ecbba1308c4259cc3"},{"url":"/linux-codeigniter-son-surum-nasl/index.html","revision":"500bd4df6b9fdad9d7d7f775847b26d8"},{"url":"/linux-ekran-karti-kurulumu/index.html","revision":"3e9c660797cf886fed57cbbceea054a8"},{"url":"/linux-httrack-kullanm/index.html","revision":"e5afeab7f5d71f7c09d8a0eb7dd5e558"},{"url":"/linux-ozellestirebilir-mp3-oynatcs/index.html","revision":"dff36c2620239100a78cf484edb94da3"},{"url":"/linux-tema-nasl-yuklenir-gnome-shell-ve/index.html","revision":"cc98f7c100de395e8886ef01f28c2ebf"},{"url":"/linux-uzerinde-apache2-mysql-phpmyadmin/index.html","revision":"1d69430a9bda66f2c99afcfa1e4dabe3"},{"url":"/linuxta-uefi-windows-10-format-usb/index.html","revision":"814620e858295f395595eee9f7343e15"},{"url":"/modern-mutt-kurulumu/index.html","revision":"3d000b37227b7ceb212824568db159c1"},{"url":"/newsboat-kullanimi/index.html","revision":"3faacb0eb5ad160b8b177541346ac0da"},{"url":"/obs-linux-browser-eklentisi-kurulumu/index.html","revision":"01696a4a3194d05e0f42d9cffc2b1a5d"},{"url":"/offline.html","revision":"a7b6e2eea80893609af34755724d1c17"},{"url":"/oh-my-zsh-kurulumu-tema-ve-eklentiler/index.html","revision":"c9f7e3ace1500411e5ce1cfec3b8e0e1"},{"url":"/onemli-gelismeler/index.html","revision":"e495169459eb8e0737a297ce9cca90a9"},{"url":"/openvpn-nasil-kurulur/index.html","revision":"4f85bdd246c0231417b8ff1dc9cfeefc"},{"url":"/pdo-sum-fonksiyonu-kullanmmorrisjs/index.html","revision":"e621706d0d59dc3600a067a79bf41fba"},{"url":"/phpstorm-icerisinde-cmder-kullanmak/index.html","revision":"29d5527e7eecb538c426609ff8fb185a"},{"url":"/phpstorm-icerisinde-phpcsfixer/index.html","revision":"2543f6e23469e7e718e078171a08c9a6"},{"url":"/spotifydan-muzik-nasl-indirilir-resimli/index.html","revision":"8995e00ee7cd9846170f7666d880862f"},{"url":"/sweet-alert-snf-kullanm-detayl-anlatm/index.html","revision":"4edb5c8cce0b7e792686b0b8dee722c1"},{"url":"/tags/apache/index.html","revision":"e70567f05a1407ad492d85b254d5ddef"},{"url":"/tags/belgesel/index.html","revision":"560ac102f7e0495e787507298deeda91"},{"url":"/tags/cmder/index.html","revision":"fc9caf97465e72ad44e971712432a0ac"},{"url":"/tags/codeigniter/index.html","revision":"f87c8a7790da752f84835ce6d17f2538"},{"url":"/tags/composer/index.html","revision":"55916b2024b1d73fb8ac285dc1545f7b"},{"url":"/tags/discord/index.html","revision":"ac9e39a871dfb8c4ba51c912741f0d22"},{"url":"/tags/e-mail/index.html","revision":"d743553191896f24b8c9c8f8e983a01e"},{"url":"/tags/earn/index.html","revision":"fc9ef71f2af80bc98781a1b414779364"},{"url":"/tags/facebook/index.html","revision":"686a02c6d455f5aece0d70a86f028ba6"},{"url":"/tags/film/index.html","revision":"0d0d00f5c25c68e2eb08d6e4550e6729"},{"url":"/tags/github/index.html","revision":"ce3720b75bcb50db3110a98692c19e5c"},{"url":"/tags/httrack/index.html","revision":"f96c18399c113d83a354cbd8c349fecd"},{"url":"/tags/imap/index.html","revision":"3a094b60d34bc5254bddd363c7f9486d"},{"url":"/tags/index.html","revision":"93e8353661392953a03bb9148f1c0bc3"},{"url":"/tags/internetten-para-kazanma/index.html","revision":"e3c0304c18d5b924ecb1fe4ff5834c6c"},{"url":"/tags/ipucu/index.html","revision":"b85a743b9ede722a5fa77fcaabe92c83"},{"url":"/tags/jekyll/index.html","revision":"d6d07c7d291d50bcf8ef44f75ababd64"},{"url":"/tags/laptop/index.html","revision":"f23da272ba9333b2d9694814502414fe"},{"url":"/tags/laravel/index.html","revision":"bb3a354d037ec4fd9ce63b368494164b"},{"url":"/tags/linux/index.html","revision":"213509663c0c9e80e742f3f8277b9595"},{"url":"/tags/mp3/index.html","revision":"59a5559eb89b0dff88a90c1c4ba45419"},{"url":"/tags/newsboat/index.html","revision":"a5623c87eb7ede4852e7d8dad62fdbbb"},{"url":"/tags/ntfs/index.html","revision":"ca9df9c46e86ab4f89983b2489e33e45"},{"url":"/tags/nvidia/index.html","revision":"39c42d330b520451ec58604cb8583afe"},{"url":"/tags/obs/index.html","revision":"f0e0d22316bfc273ace1fc6b66a957ba"},{"url":"/tags/pdo/index.html","revision":"d882818fb7cd765fe0e911092bd610d1"},{"url":"/tags/php/index.html","revision":"d6158468cb1948b29da5e0ea0c5d1f57"},{"url":"/tags/phpstorm/index.html","revision":"e375c0c0168f9d26d078204da1a21afb"},{"url":"/tags/program/index.html","revision":"e03ceda40d1e571e96f7aa591382c188"},{"url":"/tags/site/index.html","revision":"3b3f437a416cf4c768f01e10a2e60b33"},{"url":"/tags/spotify/index.html","revision":"a328b23271663fca3f36de32f384a443"},{"url":"/tags/ssh/index.html","revision":"9baaed5f2e87e19cd9a3b64e6a8929e8"},{"url":"/tags/staticman/index.html","revision":"480d4d9660e033f0a889851ff148d4b9"},{"url":"/tags/steam/index.html","revision":"d08bb3b7cb6f39e2945ba166d1030f71"},{"url":"/tags/sublime/index.html","revision":"f8fc53ac71bf1b5b8cd84937c6c938ec"},{"url":"/tags/superproxy/index.html","revision":"53a581aec8de027418b71eccc7dd27e4"},{"url":"/tags/sweetalert/index.html","revision":"81b0d4cc9b89ab319493efbd1dacac23"},{"url":"/tags/tanitim/index.html","revision":"529871d6ad978f928312b384cf720748"},{"url":"/tags/terminal/index.html","revision":"4b9c2b0de4b82fb1bbbdab5224116455"},{"url":"/tags/unixporn/index.html","revision":"8b7224af6c7dd45a1be92cf0ce29a903"},{"url":"/tags/vagrant/index.html","revision":"cac5eb8fce792fb1bab66650673a6581"},{"url":"/tags/vlc/index.html","revision":"3aa6ed539a199b17e407bb2faade9636"},{"url":"/tags/vpn/index.html","revision":"2d2cf740b3219e1e060216dc92e9c598"},{"url":"/tags/windows10/index.html","revision":"f98597c8dcd3741dcbbff98cb81ba304"},{"url":"/tags/yazılım/index.html","revision":"935ba1953925ff47764b1b15e65a0f37"},{"url":"/tags/zsh/index.html","revision":"332a44f17734e9e732a5f2181b0d6d0b"},{"url":"/tavsiye-ettigim-programlar-ve-uygulamalar/index.html","revision":"be87ede5a186618d77feda6a1e6945ed"},{"url":"/terminatorgitcurlfish-yukleme/index.html","revision":"4a311937eab84f6a61d7685cec3b808a"},{"url":"/vagrant-virtualbox-61-ile-uyumlu-hale/index.html","revision":"f9745ad74a3d65a7f54ed6a835c276f8"},{"url":"/virtualbox-vagrant-laravel-arch-linux/index.html","revision":"c1c9b246b8c8106ba682fb934780ba5f"},{"url":"/vlsub-ile-altyaz-aramaya-son-resimli/index.html","revision":"75ffa26469aa462a9a894b7df7a11263"},{"url":"/windows-terminal-ozellestirme/index.html","revision":"caa732003f9c3dc9eb884345a09de537"},{"url":"/windows-uzerinde-redshift-kullanm/index.html","revision":"d3eeedb792b8db7c6ae4b2403f92727c"},{"url":"/windows-uzerinden-paylaslan-dosya-ve/index.html","revision":"d3a35371486e35020d31749280194b1a"},{"url":"/wsl-archlinux-kurulumu/index.html","revision":"5362e79a1dcdd1dc9c67af590a44f90a"},{"url":"/xampp-kullanarak-localhosta-ozel-alan/index.html","revision":"0bc4d95f84f415295f20165841168304"},{"url":"/yeni-baslayanlar-hangi-linux-surumunu/index.html","revision":"f79cd451fb1af8da5df8d2b05ac0fbb6"},{"url":"/zsh-icerisine-shopt-kullanmak/index.html","revision":"51cb34ad33e513d342f8da48c39d65dc"},{"url":"/wsl-archlinux-kurulumu/","revision":"05e2e98647cc19cc7ccc7edb8141b765"},{"url":"/windows-terminal-ozellestirme/","revision":"55327b56a3b755d821235a0ae9945890"},{"url":"/jekyll-google-superproxy/","revision":"1521819fb8625fd030e7f12bb0d30c54"},{"url":"/jekyll-staticman-eklentisi/","revision":"07846aad8a547f83a1e83466d2f0f1b3"},{"url":"/openvpn-nasil-kurulur/","revision":"e2c8e06471fce3f9aca211bec8712469"},{"url":"/onemli-gelismeler/","revision":"48d5aa5d209346a3aae61c2d2cb7c815"},{"url":"/facebook-5000-arkadas-ekleme-sureli-v2/","revision":"b805b3fd46e6c1322e7fa0cc2b0a3c5c"},{"url":"/facebook-toplu-grup-2021/","revision":"695ac341bdd7ed043e7f3fd1896ddbc3"}];

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

