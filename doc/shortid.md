# 短链接实现方式

根据长链接获取短链接：http://d.cn/index.php?url=http://www.php.net/，返回内容为：http://d.cn/C。在浏览器中访问http://d.cn/C,即会跳转到http://www.php.net/。

## 相关链接

+	[URL短链接的实现原理和方法](http://blog.sina.com.cn/s/blog_a602def501031ksu.html)
+	[Short id generator](https://github.com/dylang/shortid)
+	js进制转换：[Number.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) && [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)


## 短链接的好处

1. 节省网址长度，便于社交化传播。(短信或者微博，字数长度受限制时。这样的短链接制作二维码也是易于识别。)
2. 方便后台跟踪点击量、地域分布等用户统计。（统计流量访问，延伸可以做网址举报屏蔽。只屏蔽短链接即可，控制输出。）
3. 规避关键词、域名屏蔽手段。
4. 隐藏真实地址，适合做付费推广链接。
5. 有现成技术方案让你搭建专用短地址服务，看起来很cool。


## method from network(search)

```js
function shortid(str) {
    var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    var ret = '';
    str = str.split('');
    for (i of str) {
        ret += ORIGINAL.indexOf(i) + 1;
    }
    ret = string10to64(ret - 0);
    return ret;
}

function string10to64(number) {
    var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'.split(''),
        radix = chars.length,
        qutient = +number,
        arr = [];
    do {
        mod = qutient % radix;
        qutient = (qutient - mod) / radix;
        arr.unshift(chars[mod]);
    } while (qutient);
    return arr.join('');
}


var code = shortid('jogiter')
console.log(code) // 4CIUyfCo
```


## javascript 10进制和64进制的转换

```js
function string10to64(number) {
	var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'.split(''),
		radix = chars.length,
		qutient = +number,
		arr = [];
	do {
		mod = qutient % radix;
		qutient = (qutient - mod) / radix;
		arr.unshift(chars[mod]);
	} while (qutient);
	return arr.join('');
}

function string64to10(number_code) {
	var chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~',
		radix = chars.length,
		number_code = String(number_code),
		len = number_code.length,
		i = 0,
		origin_number = 0;
	while (i < len) {
		origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
	}
	return origin_number;
}
```
