(function (window) {
  var svgSprite = '<svg><symbol id="icon-cart" viewBox="0 0 1024 1024"><path d="M714.535321 896.049886c-48.928363 0-88.73395-39.656185-88.73395-88.399329s39.804565-88.399329 88.73395-88.399329c48.927339 0 88.731904 39.656185 88.731904 88.399329S763.461637 896.049886 714.535321 896.049886zM714.535321 742.649124c-36.027541 0-65.338101 29.160133-65.338101 65.001433 0 35.842323 29.310559 65.002456 65.338101 65.002456 36.025495 0 65.336054-29.160133 65.336054-65.002456C779.870352 771.809257 750.560816 742.649124 714.535321 742.649124z"  ></path><path d="M383.902018 896.049886c-48.941666 0-88.759533-39.656185-88.759533-88.399329s39.817867-88.399329 88.759533-88.399329c48.944735 0 88.763626 39.656185 88.763626 88.399329S432.846754 896.049886 383.902018 896.049886zM383.902018 742.649124c-36.041868 0-65.36266 29.160133-65.36266 65.001433 0 35.842323 29.320793 65.002456 65.36266 65.002456 36.042891 0 65.366753-29.160133 65.366753-65.002456C449.269795 771.809257 419.944909 742.649124 383.902018 742.649124z"  ></path><path d="M199.138968 283.018865c-5.610788 0-10.565636-4.049223-11.522428-9.768481l-20.407796-121.904421L77.910952 151.345963c-6.461155 0-11.698436-5.237281-11.698436-11.698436 0-6.461155 5.237281-11.698436 11.698436-11.698436l99.199303 0c5.715165 0 10.594289 4.129041 11.537777 9.766434l22.043039 131.670855c1.066285 6.373151-3.233648 12.402471-9.605775 13.469779C200.431404 282.9677 199.781604 283.018865 199.138968 283.018865z"  ></path><path d="M769.743714 678.331259 339.901899 678.331259c-20.549012 0-37.813211-7.54893-51.311643-22.438035-10.989285-12.120039-19.514449-29.084409-26.061562-51.864228-0.064468-0.226151-0.122797-0.453325-0.173962-0.683569l-66.020646-295.7754c-9.631358-30.806633-9.43386-52.43728 0.599657-66.118883 4.833075-6.588045 14.436804-14.44192 32.750915-14.44192 0.792039 0 1.582031 0.080841 2.358721 0.240477 0.443092 0.090051 45.446052 9.215896 116.157533 13.727653 65.151859 4.157693 166.103062 5.136997 277.035594-13.801331 6.370081-1.087774 12.411681 3.193739 13.498432 9.562796s-3.193739 12.412704-9.561773 13.499455c-113.369024 19.355837-216.454844 18.328437-282.969747 14.055111-66.403363-4.264117-109.639073-12.310374-117.606535-13.875009-9.4093 0.24764-11.94403 3.704368-12.798491 4.868891-2.980891 4.063549-6.553253 15.407921 3.001357 45.737694 0.100284 0.318248 0.187265 0.639566 0.258896 0.964978l66.049299 295.90843c11.403724 39.442314 28.310789 57.036018 54.791907 57.036018l429.841815 0c30.391171 0 52.624545-19.491936 66.085114-57.928341l98.531084-294.28342c-0.967024-29.011754-25.001417-52.318576-54.403051-52.318576L842.266447 250.40405c-6.460132 0-11.698436-5.237281-11.698436-11.698436s5.238304-11.698436 11.698436-11.698436l37.692461 0c42.913369 0 77.827553 34.779108 77.827553 77.531817 0 1.261737-0.205685 2.51631-0.605797 3.713578l-99.191116 296.257377c-0.016373 0.049119-0.033769 0.098237-0.050142 0.147356-8.074909 23.089881-19.422352 41.114396-33.729196 53.573149C808.893362 671.569252 790.569018 678.331259 769.743714 678.331259z"  ></path></symbol></svg>';
  var script = function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1]
  }();
  var shouldInjectCss = script.getAttribute("data-injectcss");
  var ready = function (fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function () {
          document.removeEventListener("DOMContentLoaded", loadFn, false);
          fn()
        };
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function () {
          if (!done) {
            done = true;
            fn()
          }
        };
      var polling = function () {
        try {
          d.documentElement.doScroll("left")
        } catch (e) {
          setTimeout(polling, 50);
          return
        }
        init()
      };
      polling();
      d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;
          init()
        }
      }
    }
  };
  var before = function (el, target) {
    target.parentNode.insertBefore(el, target)
  };
  var prepend = function (el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement("div");
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName("svg")[0];
    if (svg) {
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = "hidden";
      prepend(svg, document.body)
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
    } catch (e) {
      console && console.log(e)
    }
  }
  ready(appendSvg)
})(window)