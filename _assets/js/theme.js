"use strict";
function _objectDestructuringEmpty(e) {
  if (null == e) throw new TypeError("Cannot destructure undefined");
}
function _createForOfIteratorHelper(e) {
  if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (e = _unsupportedIterableToArray(e))) {
      var t = 0,
        n = function () {};
      return {
        s: n,
        n: function () {
          return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
        },
        e: function (e) {
          throw e;
        },
        f: n,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var i,
    a = !1;
  return {
    s: function () {
      i = e[Symbol.iterator]();
    },
    n: function () {
      var e = i.next();
      return e.done, e;
    },
    e: function (e) {
      (a = !0), e;
    },
    f: function e() {
      try {
        e || null == i.return || i.return();
      } finally {
        if (a) throw undefined;
      }
    },
  };
}
function _toConsumableArray(e) {
  return (
    _arrayWithoutHoles(e) ||
    _iterableToArray(e) ||
    _unsupportedIterableToArray(e) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(e, t) {
  if (e) {
    if ("string" == typeof e) return _arrayLikeToArray(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return (
      "Object" === n && e.constructor && (n = e.constructor.name),
      "Map" === n || "Set" === n
        ? Array.from(n)
        : "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ? _arrayLikeToArray(e, t)
        : void 0
    );
  }
}
function _iterableToArray(e) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
    return Array.from(e);
}
function _arrayWithoutHoles(e) {
  if (Array.isArray(e)) return _arrayLikeToArray(e);
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
  return i;
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var n, i = 0; i < t.length; i++)
    ((n = t[i]).enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
}
function _createClass(e, t, n) {
  return (
    t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
  );
}
var Util = (function () {
    function e() {
      _classCallCheck(this, e);
    }
    return (
      _createClass(e, [
        {
          key: "forEach",
          value: function (e, t) {
            e = e || [];
            for (var n = 0; n < e.length; n++) t(e[n]);
          },
        },
        {
          key: "getScrollTop",
          value: function () {
            return (
              (document.documentElement &&
                document.documentElement.scrollTop) ||
              document.body.scrollTop
            );
          },
        },
        {
          key: "isMobile",
          value: function () {
            return window.matchMedia("only screen and (max-width: 680px)")
              .matches;
          },
        },
        {
          key: "isTocStatic",
          value: function () {
            return window.matchMedia("only screen and (max-width: 960px)")
              .matches;
          },
        },
        {
          key: "animateCSS",
          value: function (e, t, n, i) {
            var a;
            Array.isArray(t) || (t = [t]),
              (a = e.classList).add.apply(
                a,
                ["animate__animated"].concat(_toConsumableArray(t))
              );
            var o = function () {
              var n;
              (n = e.classList).remove.apply(
                n,
                ["animate__animated"].concat(_toConsumableArray(t))
              ),
                e.removeEventListener("animationend", o),
                "function" == typeof i && i();
            };
            n || e.addEventListener("animationend", o, !1);
          },
        },
      ]),
      e
    );
  })(),
  Theme = (function () {
    function e() {
      _classCallCheck(this, e),
        (this.config = window.config),
        (this.data = this.config.data),
        (this.isDark = "dark" === document.body.getAttribute("theme")),
        (this.util = new Util()),
        (this.newScrollTop = this.util.getScrollTop()),
        (this.oldScrollTop = this.newScrollTop),
        (this.scrollEventSet = new Set()),
        (this.resizeEventSet = new Set()),
        (this.switchThemeEventSet = new Set()),
        (this.clickMaskEventSet = new Set()),
        window.objectFitImages && objectFitImages();
    }
    return (
      _createClass(e, [
        {
          key: "initSVGIcon",
          value: function () {
            this.util.forEach(
              document.querySelectorAll("[data-svg-src]"),
              function (e) {
                fetch(e.getAttribute("data-svg-src"))
                  .then(function (e) {
                    return e.text();
                  })
                  .then(function (t) {
                    var n = document.createElement("div");
                    n.insertAdjacentHTML("afterbegin", t);
                    var i = n.firstChild;
                    i.setAttribute(
                      "data-svg-src",
                      e.getAttribute("data-svg-src")
                    ),
                      i.classList.add("icon");
                    var a = i.getElementsByTagName("title");
                    a.length && i.removeChild(a[0]),
                      e.parentElement.replaceChild(i, e);
                  })
                  .catch(function (e) {
                    console.error(e);
                  });
              }
            );
          },
        },

        {
          key: "initMenuMobile",
          value: function () {
            var e = document.getElementById("menu-toggle-mobile"),
              t = document.getElementById("menu-mobile");
            e.addEventListener(
              "click",
              function () {
                document.body.classList.toggle("blur"),
                  e.classList.toggle("active"),
                  t.classList.toggle("active");
              },
              !1
            ),
              (this._menuMobileOnClickMask =
                this._menuMobileOnClickMask ||
                function () {
                  e.classList.remove("active"), t.classList.remove("active");
                }),
              this.clickMaskEventSet.add(this._menuMobileOnClickMask);
          },
        },
        {
          key: "initSwitchTheme",
          value: function () {
            var e = this;
            this.util.forEach(
              document.getElementsByClassName("theme-switch"),
              function (t) {
                t.addEventListener(
                  "click",
                  function () {
                    "dark" === document.body.getAttribute("theme")
                      ? document.body.setAttribute("theme", "light")
                      : document.body.setAttribute("theme", "dark"),
                      (e.isDark = !e.isDark),
                      window.localStorage &&
                        localStorage.setItem(
                          "theme",
                          e.isDark ? "dark" : "light"
                        );
                    var t,
                      n = _createForOfIteratorHelper(e.switchThemeEventSet);
                    try {
                      for (n.s(); !(t = n.n()).done; ) {
                        (0, t.value)();
                      }
                    } catch (e) {
                      n.e(e);
                    } finally {
                      n.f();
                    }
                  },
                  !1
                );
              }
            );
          },
        },
        {
          key: "initSearch",
          value: function () {
            var e = this,
              t = this.config.search,
              n = this.util.isMobile();
            if (
              !(
                !t ||
                (n && this._searchMobileOnce) ||
                (!n && this._searchDesktopOnce)
              )
            ) {
              var i = t.maxResultLength ? t.maxResultLength : 10,
                a = t.snippetLength ? t.snippetLength : 50,
                o = t.highlightTag ? t.highlightTag : "em",
                r = n ? "mobile" : "desktop",
                c = document.getElementById("header-".concat(r)),
                s = document.getElementById("search-input-".concat(r)),
                l = document.getElementById("search-toggle-".concat(r)),
                d = document.getElementById("search-loading-".concat(r)),
                u = document.getElementById("search-clear-".concat(r));
              n
                ? ((this._searchMobileOnce = !0),
                  s.addEventListener(
                    "focus",
                    function () {
                      document.body.classList.add("blur"),
                        c.classList.add("open");
                    },
                    !1
                  ),
                  document
                    .getElementById("search-cancel-mobile")
                    .addEventListener(
                      "click",
                      function () {
                        c.classList.remove("open"),
                          document.body.classList.remove("blur"),
                          document
                            .getElementById("menu-toggle-mobile")
                            .classList.remove("active"),
                          document
                            .getElementById("menu-mobile")
                            .classList.remove("active"),
                          (d.style.display = "none"),
                          (u.style.display = "none"),
                          e._searchMobile &&
                            e._searchMobile.autocomplete.setVal("");
                      },
                      !1
                    ),
                  u.addEventListener(
                    "click",
                    function () {
                      (u.style.display = "none"),
                        e._searchMobile &&
                          e._searchMobile.autocomplete.setVal("");
                    },
                    !1
                  ),
                  (this._searchMobileOnClickMask =
                    this._searchMobileOnClickMask ||
                    function () {
                      c.classList.remove("open"),
                        (d.style.display = "none"),
                        (u.style.display = "none"),
                        e._searchMobile &&
                          e._searchMobile.autocomplete.setVal("");
                    }),
                  this.clickMaskEventSet.add(this._searchMobileOnClickMask))
                : ((this._searchDesktopOnce = !0),
                  l.addEventListener(
                    "click",
                    function () {
                      document.body.classList.add("blur"),
                        c.classList.add("open"),
                        s.focus();
                    },
                    !1
                  ),
                  u.addEventListener(
                    "click",
                    function () {
                      (u.style.display = "none"),
                        e._searchDesktop &&
                          e._searchDesktop.autocomplete.setVal("");
                    },
                    !1
                  ),
                  (this._searchDesktopOnClickMask =
                    this._searchDesktopOnClickMask ||
                    function () {
                      c.classList.remove("open"),
                        (d.style.display = "none"),
                        (u.style.display = "none"),
                        e._searchDesktop &&
                          e._searchDesktop.autocomplete.setVal("");
                    }),
                  this.clickMaskEventSet.add(this._searchDesktopOnClickMask)),
                s.addEventListener(
                  "input",
                  function () {
                    u.style.display = "" === s.value ? "none" : "inline";
                  },
                  !1
                );
              var h = function () {
                var c = autocomplete(
                  "#search-input-".concat(r),
                  {
                    hint: !1,
                    autoselect: !0,
                    dropdownMenuContainer: "#search-dropdown-".concat(r),
                    clearOnSelected: !0,
                    cssClasses: { noPrefix: !0 },
                    debug: !0,
                  },
                  {
                    name: "search",
                    source: function (n, r) {
                      (d.style.display = "inline"), (u.style.display = "none");
                      var c = function (e) {
                        (d.style.display = "none"),
                          (u.style.display = "inline"),
                          r(e);
                      };
                      if ("lunr" === t.type) {
                        var s = function () {
                          lunr.queryHandler && (n = lunr.queryHandler(n));
                          var t = {};
                          return (
                            e._index.search(n).forEach(function (n) {
                              var i = n.ref,
                                r = n.matchData.metadata,
                                c = e._indexData[i],
                                s = c.uri,
                                l = c.title,
                                d = c.content;
                              if (!t[s]) {
                                var u = 0;
                                Object.values(r).forEach(function (e) {
                                  var t = e.content;
                                  if (t) {
                                    var n = t.position[0][0];
                                    (n < u || 0 === u) && (u = n);
                                  }
                                }),
                                  0 < (u -= a / 5)
                                    ? ((u +=
                                        d.substr(u, 20).lastIndexOf(" ") + 1),
                                      (d = "..." + d.substr(u, a)))
                                    : (d = d.substr(0, a)),
                                  Object.keys(r).forEach(function (e) {
                                    (l = l.replace(
                                      new RegExp("(".concat(e, ")"), "gi"),
                                      "<".concat(o, ">$1</").concat(o, ">")
                                    )),
                                      (d = d.replace(
                                        new RegExp("(".concat(e, ")"), "gi"),
                                        "<".concat(o, ">$1</").concat(o, ">")
                                      ));
                                  }),
                                  (t[s] = {
                                    uri: s,
                                    title: l,
                                    date: c.date,
                                    context: d,
                                  });
                              }
                            }),
                            Object.values(t).slice(0, i)
                          );
                        };
                        e._index
                          ? c(s())
                          : fetch(t.lunrIndexURL)
                              .then(function (e) {
                                return e.json();
                              })
                              .then(function (n) {
                                var i = {};
                                (e._index = lunr(function () {
                                  var e = this;
                                  t.lunrLanguageCode &&
                                    this.use(lunr[t.lunrLanguageCode]),
                                    this.ref("objectID"),
                                    this.field("title", { boost: 50 }),
                                    this.field("tags", { boost: 20 }),
                                    this.field("categories", { boost: 20 }),
                                    this.field("content", { boost: 10 }),
                                    (this.metadataWhitelist = ["position"]),
                                    n.forEach(function (t) {
                                      (i[t.objectID] = t), e.add(t);
                                    });
                                })),
                                  (e._indexData = i),
                                  c(s());
                              })
                              .catch(function (e) {
                                console.error(e), c([]);
                              });
                      } else
                        "algolia" === t.type &&
                          ((e._algoliaIndex =
                            e._algoliaIndex ||
                            algoliasearch(
                              t.algoliaAppID,
                              t.algoliaSearchKey
                            ).initIndex(t.algoliaIndex)),
                          e._algoliaIndex
                            .search(n, {
                              offset: 0,
                              length: 8 * i,
                              attributesToHighlight: ["title"],
                              attributesToSnippet: ["content:".concat(a)],
                              highlightPreTag: "<".concat(o, ">"),
                              highlightPostTag: "</".concat(o, ">"),
                            })
                            .then(function (e) {
                              var t = e.hits,
                                n = {};
                              t.forEach(function (e) {
                                var t = e.uri,
                                  i = e.date,
                                  a = e._highlightResult.title,
                                  o = e._snippetResult.content;
                                (n[t] && n[t].context.length > o.value) ||
                                  (n[t] = {
                                    uri: t,
                                    title: a.value,
                                    date: i,
                                    context: o.value,
                                  });
                              }),
                                c(Object.values(n).slice(0, i));
                            })
                            .catch(function (e) {
                              console.error(e), c([]);
                            }));
                    },
                    templates: {
                      suggestion: function (e) {
                        var t = e.title,
                          n = e.date,
                          i = e.context;
                        return '<div><span class="suggestion-title">'
                          .concat(t, '</span><span class="suggestion-date">')
                          .concat(
                            n,
                            '</span></div><div class="suggestion-context">'
                          )
                          .concat(i, "</div>");
                      },
                      empty: function (e) {
                        var n = e.query;
                        return '<div class="search-empty">'
                          .concat(
                            t.noResultsFound,
                            ': <span class="search-query">"'
                          )
                          .concat(n, '"</span></div>');
                      },
                      footer: function (e) {
                        _objectDestructuringEmpty(e);
                        var n =
                            "algolia" === t.type
                              ? {
                                  searchType: "algolia",
                                  icon: '<svg class="icon icon-binoculars"><use xlink:href="#icon-binoculars"></use></svg>',
                                  href: "#",
                                }
                              : {
                                  searchType: "Lunr.js",
                                  icon: "",
                                  href: "#",
                                },
                          i = n.searchType,
                          a = n.icon;
                        return '<div class="search-footer">Search by <a href="'
                          .concat(
                            n.href,
                            '" rel="noopener noreffer" target="_blank">'
                          )
                          .concat(a, " ")
                          .concat(i, "</a></div>");
                      },
                    },
                  }
                );
                c.on("autocomplete:selected", function (e, t) {
                  window.location.assign(t.uri);
                }),
                  n ? (e._searchMobile = c) : (e._searchDesktop = c);
              };
              if (
                t.lunrSegmentitURL &&
                !document.getElementById("lunr-segmentit")
              ) {
                var m = document.createElement("script");
                (m.id = "lunr-segmentit"),
                  (m.type = "text/javascript"),
                  (m.src = t.lunrSegmentitURL),
                  (m.async = !0),
                  m.readyState
                    ? (m.onreadystatechange = function () {
                        ("loaded" == m.readyState ||
                          "complete" == m.readyState) &&
                          ((m.onreadystatechange = null), h());
                      })
                    : (m.onload = function () {
                        h();
                      }),
                  document.body.appendChild(m);
              } else h();
            }
          },
        },
        {
          key: "initDetails",
          value: function () {
            this.util.forEach(
              document.getElementsByClassName("details"),
              function (e) {
                e.getElementsByClassName("details-summary")[0].addEventListener(
                  "click",
                  function () {
                    e.classList.toggle("open");
                  },
                  !1
                );
              }
            );
          },
        },

        {
          key: "initHighlight",
          value: function () {
            var e = this;
            this.util.forEach(
              document.querySelectorAll(".highlight > pre.chroma"),
              function (e) {
                var t = document.createElement("div");
                t.className = e.className;
                var n = document.createElement("table");
                t.appendChild(n);
                var i = document.createElement("tbody");
                n.appendChild(i);
                var a = document.createElement("tr");
                i.appendChild(a);
                var o = document.createElement("td");
                a.appendChild(o),
                  e.parentElement.replaceChild(t, e),
                  o.appendChild(e);
              }
            ),
              this.util.forEach(
                document.querySelectorAll(".highlight > .chroma"),
                function (t) {
                  var n = t.querySelectorAll("pre.chroma > code");
                  if (n.length) {
                    var i = n[n.length - 1],
                      a = document.createElement("div");
                    a.className = "code-header " + i.className.toLowerCase();
                    var o = document.createElement("span");
                    o.classList.add("code-title"),
                      o.insertAdjacentHTML(
                        "afterbegin",
                        '<svg class="arrow icon icon-circle-right"><use xlink:href="#icon-circle-right"></use></svg>'
                      ),
                      o.addEventListener(
                        "click",
                        function () {
                          t.classList.toggle("open");
                        },
                        !1
                      ),
                      a.appendChild(o);
                    var r = document.createElement("span");
                    r.insertAdjacentHTML(
                      "afterbegin",
                      '<svg class="icon icon-circle-down"><use xlink:href="#icon-circle-down"></use></svg>'
                    ),
                      r.classList.add("ellipses"),
                      r.addEventListener(
                        "click",
                        function () {
                          t.classList.add("open");
                        },
                        !1
                      ),
                      a.appendChild(r);
                    var c = document.createElement("span");
                    c.insertAdjacentHTML(
                      "afterbegin",
                      '<svg class="icon icon-copy"><use xlink:href="#icon-copy"></use></svg>'
                    ),
                      c.classList.add("copy");
                    var s = i.innerText;
                    if (
                      ((0 > e.config.code.maxShownLines ||
                        s.split("\n").length <
                          e.config.code.maxShownLines + 2) &&
                        t.classList.add("open"),
                      e.config.code.copyTitle)
                    )
                      c.setAttribute("data-clipboard-text", s),
                        (c.title = e.config.code.copyTitle),
                        new ClipboardJS(c).on("success", function () {
                          e.util.animateCSS(i, "animate__rubberBand");
                        }),
                        a.appendChild(c);
                    t.insertBefore(a, t.firstChild);
                  }
                }
              );
          },
        },
        {
          key: "initTable",
          value: function () {
            this.util.forEach(
              document.querySelectorAll(".content table"),
              function (e) {
                var t = document.createElement("div");
                (t.className = "table-wrapper"),
                  e.parentElement.replaceChild(t, e),
                  t.appendChild(e);
              }
            );
          },
        },
        {
          key: "initHeaderLink",
          value: function () {
            for (var e = 1; 6 >= e; e++)
              this.util.forEach(
                document.querySelectorAll(".single .content > h" + e),
                function (e) {
                  e.classList.add("headerLink"),
                    e.insertAdjacentHTML(
                      "afterbegin",
                      //  <a href="#figure" aria-label="figure" class="header-mark"></a>
                      '<a href="#'.concat(
                        e.id,
                        '" class="header-mark" aria-label="#'.concat(
                          e.id,
                          '"></a>'
                        )
                      )
                    );
                }
              );
          },
        },
        {
          key: "initToc",
          value: function () {
            var e = this,
              t = document.getElementById("TableOfContents");
            if (null !== t)
              if (
                document.getElementById("toc-static").getAttribute("kept") ||
                this.util.isTocStatic()
              ) {
                var n = document.getElementById("toc-content-static");
                t.parentElement !== n &&
                  (t.parentElement.removeChild(t), n.appendChild(t)),
                  this._tocOnScroll &&
                    this.scrollEventSet.delete(this._tocOnScroll);
              } else {
                var i = document.getElementById("toc-content-auto");
                t.parentElement !== i &&
                  (t.parentElement.removeChild(t), i.appendChild(t));
                var a = document.getElementById("toc-auto"),
                  o = document.getElementsByClassName("page")[0],
                  r = o.getBoundingClientRect();
                (a.style.left = "".concat(r.left + r.width + 20, "px")),
                  (a.style.maxWidth = "".concat(
                    o.getBoundingClientRect().left - 20,
                    "px"
                  )),
                  (a.style.visibility = "visible");
                var c = t.querySelectorAll("a:first-child"),
                  s = t.getElementsByTagName("li"),
                  l = document.getElementsByClassName("headerLink"),
                  d = "normal" !== document.body.getAttribute("header-desktop"),
                  u = document.getElementById("header-desktop").offsetHeight,
                  h = 20 + (d ? u : 0),
                  m = a.offsetTop,
                  f = m - h + (d ? 0 : u);
                (this._tocOnScroll =
                  this._tocOnScroll ||
                  function () {
                    var n =
                        document.getElementById("post-footer").offsetTop -
                        a.getBoundingClientRect().height,
                      i = n - h + (d ? 0 : u);
                    e.newScrollTop < f
                      ? ((a.style.position = "absolute"),
                        (a.style.top = "".concat(m, "px")))
                      : e.newScrollTop > i
                      ? ((a.style.position = "absolute"),
                        (a.style.top = "".concat(n, "px")))
                      : ((a.style.position = "fixed"),
                        (a.style.top = "".concat(h, "px"))),
                      e.util.forEach(c, function (e) {
                        e.classList.remove("active");
                      }),
                      e.util.forEach(s, function (e) {
                        e.classList.remove("has-active");
                      });
                    for (
                      var o = 20 + (d ? u : 0), r = l.length - 1, p = 0;
                      p < l.length - 1;
                      p++
                    ) {
                      var g = l[p].getBoundingClientRect().top,
                        y = l[p + 1].getBoundingClientRect().top;
                      if ((0 == p && g > o) || (g <= o && y > o)) {
                        r = p;
                        break;
                      }
                    }
                    if (-1 !== r) {
                      c[r].classList.add("active");
                      for (var v = c[r].parentElement; v !== t; )
                        v.classList.add("has-active"),
                          (v = v.parentElement.parentElement);
                    }
                  }),
                  this._tocOnScroll(),
                  this.scrollEventSet.add(this._tocOnScroll);
              }
          },
        },

        {
          key: "initSmoothScroll",
          value: function () {
            SmoothScroll &&
              new SmoothScroll('[href^="#"]', {
                speed: 300,
                speedAsDuration: !0,
                header: "#header-desktop",
              });
          },
        },

        {
          key: "onScroll",
          value: function () {
            var e = this,
              t = [];
            if (
              ("auto" === document.body.getAttribute("header-desktop") &&
                t.push(document.getElementById("header-desktop")),
              "auto" === document.body.getAttribute("header-mobile") &&
                t.push(document.getElementById("header-mobile")),
              document.getElementById("comments"))
            ) {
              var n = document.getElementById("view-comments");
              (n.href = "#comments"), (n.style.display = "block");
            }
            var i = document.getElementById("fixed-buttons");
            window.addEventListener(
              "scroll",
              function () {
                e.newScrollTop = e.util.getScrollTop();
                var n = e.newScrollTop - e.oldScrollTop,
                  a = e.util.isMobile();
                e.util.forEach(t, function (t) {
                  n > 20
                    ? (t.classList.remove("animate__fadeInDown"),
                      e.util.animateCSS(t, ["animate__backInUp", "faster"], !0))
                    : n < -20 &&
                      (t.classList.remove("animate__fadeOutUp"),
                      e.util.animateCSS(
                        t,
                        ["animate__fadeInDown", "faster"],
                        !0
                      ));
                }),
                  e.newScrollTop > 100
                    ? a && n > 20
                      ? (i.classList.remove("animate__fadeIn"),
                        e.util.animateCSS(
                          i,
                          ["animate__fadeOut", "faster"],
                          !0
                        ))
                      : (!a || n < -20) &&
                        ((i.style.display = "block"),
                        i.classList.remove("animate__fadeOut"),
                        e.util.animateCSS(i, ["animate__fadeIn", "faster"], !0))
                    : (!a &&
                        (i.classList.remove("animate__fadeIn"),
                        e.util.animateCSS(
                          i,
                          ["animate__fadeOut", "faster"],
                          !0
                        )),
                      (i.style.display = "none"));
                var o,
                  r = _createForOfIteratorHelper(e.scrollEventSet);
                try {
                  for (r.s(); !(o = r.n()).done; ) {
                    (0, o.value)();
                  }
                } catch (e) {
                  r.e(e);
                } finally {
                  r.f();
                }
                e.oldScrollTop = e.newScrollTop;
              },
              !1
            );
          },
        },
        {
          key: "onResize",
          value: function () {
            var e = this;
            window.addEventListener(
              "resize",
              function () {
                e._resizeTimeout ||
                  (e._resizeTimeout = window.setTimeout(function () {
                    e._resizeTimeout = null;
                    var t,
                      n = _createForOfIteratorHelper(e.resizeEventSet);
                    try {
                      for (n.s(); !(t = n.n()).done; ) {
                        (0, t.value)();
                      }
                    } catch (e) {
                      n.e(e);
                    } finally {
                      n.f();
                    }
                    e.initToc(), e.initSearch();
                  }, 100));
              },
              !1
            );
          },
        },
        {
          key: "onClickMask",
          value: function () {
            var e = this;
            document.getElementById("mask").addEventListener(
              "click",
              function () {
                var t,
                  n = _createForOfIteratorHelper(e.clickMaskEventSet);
                try {
                  for (n.s(); !(t = n.n()).done; ) {
                    (0, t.value)();
                  }
                } catch (e) {
                  n.e(e);
                } finally {
                  n.f();
                }
                document.body.classList.remove("blur");
              },
              !1
            );
          },
        },
        {
          key: "init",
          value: function () {
            var e = this;
            try {
              this.initSVGIcon(),
                this.initMenuMobile(),
                this.initSwitchTheme(),
                this.initSearch(),
                this.initDetails(),
                this.initHighlight(),
                this.initTable(),
                this.initHeaderLink(),
                this.initSmoothScroll();
            } catch (e) {
              console.error(e);
            }
            window.setTimeout(function () {
              e.initToc(), e.onScroll(), e.onResize(), e.onClickMask();
            }, 100);
          },
        },
      ]),
      e
    );
  })(),
  themeInit = function () {
    new Theme().init();
  };
"loading" === document.readyState
  ? document.addEventListener("DOMContentLoaded", themeInit, !1)
  : themeInit();
//# sourceMappingURL=theme.js.map
