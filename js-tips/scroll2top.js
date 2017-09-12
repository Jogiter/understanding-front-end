(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/**pos可能小于可滚动高度，需自己兼容*/
function scroll(pos, time) {
    pos = pos || 0;
    time = time || 1000;
    var i = 0,
        raf,
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        speed = (pos - scrollTop) / 60 / time * 1000;
    function _scroll() {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        window.scrollTo(0, scrollTop += speed)
        if (speed < 0) {
            if (scrollTop <= pos) {
                window.cancelAnimationFrame(raf)
            } else {
                raf = window.requestAnimationFrame(_scroll);
            }
        } else {
            if (scrollTop >= pos) {
                window.cancelAnimationFrame(raf)
            } else {
                raf = window.requestAnimationFrame(_scroll);
            }
        }
    }
    window.requestAnimationFrame(_scroll);
}

module.exports = scroll;
