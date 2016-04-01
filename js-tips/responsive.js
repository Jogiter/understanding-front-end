! function(window) {
    function setFontSize() {
        var d = dom.getBoundingClientRect().width;
        var e = (d / 7.5 > 100 * B ? 100 * B : (d / 7.5 < 42 ? 42 : d / 7.5));
        dom.style.fontSize = e + "px";
        window.rem = e;
    }
    var timer,
        document = window.document,
        dom = document.documentElement,
        viewport = document.querySelector('meta[name="viewport"]'),
        B = 0,
        A = 0;
    if (viewport) {
        var y = viewport.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
        y && (A = parseFloat(y[1]), B = parseInt(1 / A))
    }
    if (!B && !A) {
        var u = (window.navigator.appVersion.match(/android/gi), window.navigator.appVersion.match(/iphone/gi)),
            t = window.devicePixelRatio;
        B = u ? t >= 3 && (!B || B >= 3) ? 3 : t >= 2 && (!B || B >= 2) ? 2 : 1 : 1, A = 1 / B
    }
    if (dom.setAttribute("data-dpr", B), !dom) {
        if (viewport = document.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + A + ", maximum-scale=" + A + ", minimum-scale=" + A + ", user-scalable=no"), dom.firstElementChild) {
            dom.firstElementChild.appendChild(viewport)
        } else {
            var s = document.createElement("div");
            s.appendChild(viewport),
            document.write(s.innerHTML);
        }
    }
    window.addEventListener("resize", function() {
        clearTimeout(timer),
        timer = setTimeout(setFontSize, 300)
    }, !1),
    window.addEventListener("pageshow", function(b) {
        b.persisted && (clearTimeout(timer), timer = setTimeout(setFontSize, 300))
    }, !1),
    setFontSize()
}(window);
