/**
 * 设置 url 的 query 中参数的键值
 * @param {String} key   query 中的键
 * @param {String} value query 中的值
 * @param {String} url   url 字符串，默认 location.href
 */
export function setParam(key, value, url = location.href) {
  let reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
  let result = reg.exec(url);
  if (result) {
    return url.replace(result[0], `${key}=${value}`);
  } else {
    reg = /\?(.*)#?(.*)/gi;
    let search = reg.exec(url);
    if (search !== null) {
      return url.replace(search[1], `${search[1]}&${key}=${value}`);
    } else {
      return '';
    }
  }
}

/**
 * 获取 url 的 query 中参数 key 的值
 * @param  {String} key query 中的键
 * @param  {String} url url 字符串，默认 location.href
 * @return {String}     key 对应的值
 */
export function getParam(key, url = location.href) {
  let reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
  let result = reg.exec(url);
  return result ? result[2] : ''
}

/**
 * html 转义，预防 xss
 * @param  {String} htm htm 字符串
 * @return {String}     转义后的字符串
 */
function encodeHTML (htm) {
  return String(htm)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isAndroid() {
  return window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1;
}

export function isIOS() {
  return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function isWechat() {
  return navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isMobile() {
  return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
}


export const Cookie = {
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

/**
 * 获取元素的实际样式
 * @param  {String} $e   元素的 DOM
 * @param  {String} name 样式键名
 * @return {String}      样式值
 */
export function getRealStyle($e, name) {
  return window.getComputedStyle($e).getPropertyValue(name);
}

/**
* 将数字千分化
* 到万的显示'xxxx万'
* 到亿的显示'xxxx亿'
* 到万亿的显示'xxxx万亿'
*/
export function formatCoin(num, digits = 2) {
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
}

/**
 * 字符编码数值对应的存储长度：
 * UCS-2编码(16进制) UTF-8 字节流(二进制)
 * 0000 - 007F       0xxxxxxx （1字节）
 * 0080 - 07FF       110xxxxx 10xxxxxx （2字节）
 * 0800 - FFFF       1110xxxx 10xxxxxx 10xxxxxx （3字节）
 */
export function getBytesLength: function(string) {
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
}

/**
 * 倒计时
 * @param  {Number}   seconds  倒计时时间
 * @param  {Function} callback(times) 倒计时的 loop
 * @param  {times}  day   倒计时的天数
 * @param  {times}  hour  倒计时的小时数
 * @param  {times}  min   倒计时的分钟数
 * @param  {times}  sec   倒计时的秒数
 */
export function countdown(seconds, callback) {
  var timer
  // fix floating seconds
  seconds = Math.round(seconds)

  function prefix(n) {
    return n > 9 ? `${n}` : `0${n}`
  }

  function format(seconds) {
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
    return { day: prefix(day), hour: prefix(hour), min: prefix(min), sec: prefix(sec) }
  }

  function down() {
    seconds--;
    callback(format(seconds))
    !seconds && clearInterval(timer)
  }
  if (seconds > 0) {
    timer = setInterval(down, 1000)
    down()
  } else {
    callback(format(0))
  }
}

// unicode & 汉字 转换
export const converter = {
  ToUnicode: function(str) {
    return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
  },
  ToGB2312: function(str) {
    return unescape(str.replace(/\\u/gi, '%u'));
  }
};

/**
 * 常用语手机号转星，身份证号转星
 * 前 start 位，后 end 位中间的字符串，替换为'*'
 * @param  {String} [string=''] 字符串
 * @param  {Number} [start=0]   不需要被替换的位数，从前开始计算
 * @param  {Number} [end=0]     不需要被替换的位数，从后开始计算
 * @return {String}             替换后的字符串
 */
export function string2star(string = '', start = 0, end = 0) {
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
