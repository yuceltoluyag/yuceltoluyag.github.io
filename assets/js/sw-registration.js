"use strict";

/* ===========================================================
 * sw-registration.js
 * ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

// SW Version Upgrade Ref: <https://youtu.be/Gb9uI67tqV0>

function handleRegistration(registration) {
  console.log("SW Başarıyla Kayıt Edildi. ", registration);
  /**
   * ServiceWorkerRegistration.onupdatefound
   * The service worker registration's installing worker changes.
   */
  registration.onupdatefound = function (e) {
    var installingWorker = registration.installing;
    installingWorker.onstatechange = function (e) {
      if (installingWorker.state !== "installed") return;
      if (navigator.serviceWorker.controller) {
        console.log("SW Güncellendi");
      } else {
        console.log("Yepisyeni SW");
        createSnackbar({
          message: "Çevrimdışı kullanıma hazır.",
          duration: 3000
        });
      }
    };
  };
}
if (navigator.serviceWorker) {
  // For security reasons, a service worker can only control the pages
  // that are in the same directory level or below it. That's why we put sw.js at ROOT level.
  navigator.serviceWorker.register("/sw.js").then(function (registration) {
    return handleRegistration(registration);
  }).catch(function (error) {
    console.log("ServiceWorker kaydı başarısız oldu: ", error);
  });

  // register message receiver
  // https://dbwriteups.wordpress.com/2015/11/16/service-workers-part-3-communication-between-sw-and-pages/
  navigator.serviceWorker.onmessage = function (e) {
    console.log("SW: Yayında:", event);
    var data = e.data;
    if (data.command == "UPDATE_FOUND") {
      console.log("UPDATE_FOUND_BY_SW", data);
      createSnackbar({
        message: "İçerik güncellendi.",
        actionText: "refresh",
        action: function action(e) {
          location.reload();
        }
      });
    }
  };
}
//# sourceMappingURL=sw-registration.js.map
