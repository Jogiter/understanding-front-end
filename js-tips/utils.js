var URL = {
    set(key, value, url) {
        var reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
        var url = url ? url : location.href;
        var result = reg.exec(url);
        if (result) {
            return url.replace(result[0], key + '=' + value);
        } else {
            var reg = /\?(.*)#?(.*)/gi;
            var search = reg.exec(url);
            if (search !== null) {
                return url.replace(search[1], search[1] + '&' + key + '=' + value);;
            } else {
                return '';
            }
        }
    },
    get(key, url) {
        var reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
        var url = url ? url : location.href;
        var result = reg.exec(url);
        if (result) {
            return result[2];
        } else {
            return '';
        }
    }
}

var Is = {
    android() {
        return window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1;
    },
    ios() {
        return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    mobile() {
        return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
    },
    wechat() {
        return navigator.userAgent.indexOf('MicroMessenger') > -1;
    },
    qq() {
        return navigator.userAgent.match(/\sQQ/i) == " qq";
    }
}

var Cookie = {
    get(key) {
        var arr,
            reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    set(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    delete(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.get(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    },
    clear() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
}


// 弹窗辅助
var Tools = {
    maskEvent(x, y, rect, callback) {
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            // console.log('in element');
        } else {
            callback && typeof callback === 'function' && callback();
        }
    },
    getStyle (el, name) {
        return window.getComputedStyle(el).getPropertyValue(name);
    },
    /**
     * 将数字千分化
     * 到万的显示'xxxx万'
     * 到亿的显示'xxxx亿'
     * 到万亿的显示'xxxx万亿'
     */
    formatCoin (num, digits = 2) {
        digits = Math.pow(10, digits) // 保留小数位数

        // 千分化
        function toThousands(num) {
            let itg = parseInt(num) // 取整数部分
            let itg_length = itg.toString().length
            let length = num.toString().length
            let dec = num.toString().slice(itg_length, length)// 取小数部分
            // 整数部分千分，小数部分保留2位附加
            return (itg || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + (parseInt(dec * digits) / digits).toString().slice(1);
        }

        num = parseFloat(num)
        if (isNaN(num)) {
            throw new TypeError('parameter must be a number')
        }
        if (num < 1e4) {
            return toThousands(num)
        } else if (num >= 1e4 && num < 1e8) {
            return toThousands(num / 1e4) + '万'
        } else if (num >= 1e8 && num < 1e12) {
            return toThousands(num / 1e8) + '亿'
        } else {
            return toThousands(num / 1e12) + '万亿'
        }
    },
    // 在某个(同步或异步)事件执行后，delay秒后执行。依赖jquery的deferred对象
    wait: function wait(waitFunction, delay, callback) {
        var startTime,
            endTime,
            wait = delay || 0;
        startTime = new Date().getTime();
        // ajax等异步操作 promise|await
        $.when(waitFunction()).done(function(res) {
            endTime = new Date().getTime();
            if (endTime - startTime >= wait) {
                callback(res);
            } else {
                setTimeout(function() {
                    callback(res);
                }, wait + startTime - endTime);
            }
        });
    },
}

// 时间函数
var Time = {
    // 根据秒来获取倒计时的时间[天, 时, 分, 秒]
    countdown (seconds, callback) {
        var timer;

        function getTime(seconds) {
            var day = 0, hour = 0, min = 0, sec = 0, time = [];
            var Day = 24 * 60 * 60,
                Hour = 60 * 60,
                Min = 60,
                Sec = 1;
            if (seconds > Day) {
                day = Math.floor(seconds / Day);
                seconds = seconds % Day;
            }
            hour = Math.floor(seconds / Hour);
            seconds = seconds % Hour;
            min = Math.floor(seconds / Min);
            sec = seconds % Min;

            function prefix(n) {
                if (typeof n !== 'number' || n < 0) {
                    throw Error('n必须是大于等于0的数字')
                }
                return n < 10 ? '0' + n : n;
            }
            return time.concat(prefix(day), prefix(hour), prefix(min), prefix(sec));
        }
        if (seconds) {
	        callback(getTime(seconds));
	        seconds--;
	    }
        timer = setInterval(function() {
            if (seconds) {
                callback(getTime(seconds));
                seconds--;
            } else {
                callback(getTime(seconds));
                clearInterval(timer);
            }
        }, 1000);
    },

}

// unicode转码
var GB2312UnicodeConverter = {
    ToUnicode: function (str) {
        return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
    },
    ToGB2312: function (str) {
        return unescape(str.replace(/\\u/gi, '%u'));
    }
};

export { URL, Is, Tools, Cookie, GUC: GB2312UnicodeConverter, }
