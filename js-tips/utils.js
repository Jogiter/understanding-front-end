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

const Cookie = {
  get(key) {
    var arr,
      reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  set(name, value, hour, domain) {
    var domain = domain ? domain : document.location.host;
    if (hour) {
      var expireDate = new Date(new Date().getTime() + hour * 3600 * 1000);
      document.cookie = name + "=" + escape(value) + "; path=/; domain=" + domain + "; expires=" + expireDate.toGMTString();
    } else {
      document.cookie = name + "=" + escape(value) + "; path=/; domain=" + domain;
    }
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
};


// 弹窗辅助
var Tools = {
  maskEvent(x, y, rect, callback) {
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      // console.log('in element');
    } else {
      callback && typeof callback === 'function' && callback();
    }
  },
  getStyle(el, name) {
    return window.getComputedStyle(el).getPropertyValue(name);
  },
  /**
   * 将数字千分化
   * 到万的显示'xxxx万'
   * 到亿的显示'xxxx亿'
   * 到万亿的显示'xxxx万亿'
   */
  formatCoin(num, digits = 2) {
    digits = Math.pow(10, digits) // 保留小数位数

    // 千分化
    function toThousands(num) {
      let itg = parseInt(num) // 取整数部分
      let itg_length = itg.toString().length
      let length = num.toString().length
      let dec = num.toString().slice(itg_length, length) // 取小数部分
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
  /**
   * 字符编码数值对应的存储长度：
   * UCS-2编码(16进制) UTF-8 字节流(二进制)
   * 0000 - 007F       0xxxxxxx （1字节）
   * 0080 - 07FF       110xxxxx 10xxxxxx （2字节）
   * 0800 - FFFF       1110xxxx 10xxxxxx 10xxxxxx （3字节）
   */
  getBytesLength: function(string) {
    var totalLength = 0;
    var charCode;
    for (var i = 0; i < string.length; i++) {
      charCode = string.charCodeAt(i);
      if (charCode < 0x007f) {
        totalLength++;
      } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
        totalLength += 2;
      } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
        totalLength += 3;
      } else {
        totalLength += 4;
      }
    }
    return totalLength;
  },
  /**
   * Determine the mobile operating system.
   * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
   *
   * @returns {String}
   */
  getMobileOperatingSystem: function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }
}

// 时间函数
  // 根据秒来获取倒计时的时间[天, 时, 分, 秒]
function countdown(seconds, callback) {
  var timer
  // fix floating seconds
  seconds = Math.round(seconds)

  function prefix(n) {
    return n > 9 ? `${n}` : `0${n}`
  }

  function format(seconds, callback) {
    let day = 0
    let hour = 0
    let min = 0
    let sec = 0
    let Day = 24 * 60 * 60
    let Hour = 60 * 60
    let Min = 60
    if (seconds > Day) {
      day = Math.floor(seconds / Day)
      seconds = seconds % Day
    }
    hour = Math.floor(seconds / Hour)
    seconds = seconds % Hour
    min = Math.floor(seconds / Min)
    sec = seconds % Min
    return callback(prefix(day), prefix(hour), prefix(min), prefix(sec))
  }

  function down() {
    seconds--
    format(seconds, callback)
    if (!seconds) {
      clearInterval(timer)
    }
  }
  if (seconds > 0) {
    timer = setInterval(down, 1000)
    down()
  } else {
    format(0, callback)
  }
}

// unicode转码
var GB2312UnicodeConverter = {
  ToUnicode: function(str) {
    return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
  },
  ToGB2312: function(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
  }
};

// 将对象转换为url的query参数
function formatParam(obj) {
  let str = ''
  for (let i in obj) {
    str += `${i}=${obj[i]}&`
  }
  return str.slice(0, -1)
}

// 替换一个字符串中，前start位，后end位中间的字符串，替换为'*'。常用语手机号转星，身份证号转星
function string2star(string = '', start = 0, end = 0) {
  if (!string) {
    return '';
  }
  if (start + end > string.length) {
    throw new Error('字符串长度小于start和end之和，请检查参数。')
  }
  let matches = string.match(new RegExp('^(.{' + start + '})(.*)(.{' + end + '})$'))
  let middle = matches[2].replace(/./g, s => '*')
  let ret = matches[1] + middle + matches[3]
  return `${matches[1]}${middle}${matches[3]}`
}

/* 格林威治时间修正为本地时间。
 * [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 */
function getLocaleDate(date) {
  return new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000)
}

module.exports = {
  countdown,
  string2star,
  getLocaleDate,
  formatParam,
  URL,
  Is,
  Tools,
  Cookie,
  GUC: GB2312UnicodeConverter,
}
