"use strict";
var addComment = (function () {
  var e = function (e) {
      return document.querySelector(e);
    },
    n = function (e) {
      return document.getElementById(e);
    },
    t = e("#comment-form-submit"),
    o = e(".js-form");
  function i(n, t) {
    (e(".js-modal-title").innerText = n),
      (e(".js-modal-text").innerHTML = t),
      e("body").classList.add("show-modal");
  }
  return (
    (o.doReset = function () {
      (t.innerHTML = "Submit"),
        this.classList.remove("disabled"),
        window.grecaptcha && grecaptcha.reset();
    }),
    o.addEventListener("submit", function (e) {
      e.preventDefault(),
        (t.innerHTML =
          '<svg class="icon spin"><use xlink:href="#icon-loading"></use></svg> Gönderiliyor...');
      var n = function (e, n) {
        console.log(n),
          i(
            e,
            "Bilinmeyen Bir Hata Oluştu.<br>[" + (n.errorCode || "Hata") + "]"
          ),
          o.doReset();
      };
      o.classList.add("disabled"),
        fetch(this.getAttribute("action"), {
          method: "POST",
          body: new URLSearchParams(new FormData(this)),
          headers: new Headers({
            "content-type": "application/x-www-form-urlencoded",
          }),
        })
          .then(function (e) {
            e.ok
              ? (i(
                  "Yorum gönderildi",
                  'Teşekkürler! Yorumunuz <a href="https://github.com/yuceltoluyag/yuceltoluyag.github.io/pulls">beklemede</a>. Onaylandığında görünecektir.'
                ),
                o.reset(),
                o.doReset())
              : e.json().then(function (e) {
                  n("Sunucu Hatası", e);
                });
          })
          .catch(function (e) {
            console.error(e), n("Beklenmedik hata", e);
          });
    }),
    e(".js-close-modal").addEventListener("click", function () {
      e("body").classList.remove("show-modal");
    }),
    {
      moveForm: function (e, t, o) {
        var i = this,
          r = n(e),
          s = n(t),
          a = n("cancel-comment-reply-link"),
          d = n("comment-replying-to-uid");
        if (r && s && a && d) {
          if (((i.respondId = t), !n("sm-temp-form-div"))) {
            var l = document.createElement("div");
            (l.id = "sm-temp-form-div"),
              (l.style.display = "none"),
              s.parentNode.insertBefore(l, s);
          }
          return (
            r.parentNode.insertBefore(s, r.nextSibling),
            (d.value = o),
            (a.style.display = ""),
            (a.onclick = function () {
              var e = n("sm-temp-form-div"),
                t = n(i.respondId);
              if (e && t)
                return (
                  (n("comment-replying-to-uid").value = null),
                  e.parentNode.insertBefore(t, e),
                  e.parentNode.removeChild(e),
                  (this.style.display = "none"),
                  (this.onclick = null),
                  !1
                );
            }),
            !1
          );
        }
      },
    }
  );
})();
//# sourceMappingURL=main.js.map
