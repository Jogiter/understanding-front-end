## Hacks

### browser feature detect

+   [modernizr](https://modernizr.com/)



### [shim && polyfill](http://www.2ality.com/2011/12/shim-vs-polyfill.html)

**Shim**

+   [es5-shim](https://github.com/es-shims/es5-shim/blob/master/es5-shim.js)
+   [html5shiv](https://github.com/aFarkas/html5shiv)

*一个shim就是一个库，它将一个新的API引入到一个旧的环境中*，而且仅靠旧环境中已有的手段实现，Shim有时候也称为shiv，比如著名的HTML5兼容库[html5shiv](http://www.uedsc.com/use-html5-for-ie.html)，Github地址：[https://github.com/aFarkas/html5shiv](https://github.com/aFarkas/html5shiv)。

**Polyfill**

在2010年10月份的时候，Remy Sharp在博客上发表了一篇关于术语”polyfill”的文章，一个polyfill是一段代码(或者插件)，提供了那些开发者们希望浏览器原生提供支持的功能。

因此*一个polyfill就是一个用在浏览器API上的shim*，我们通常的做法是先检查当前浏览器是否支持某个API，如果不支持的话就加载对应的polyfill，然后新旧浏览器就都可以使用这个API了，术语polyfill来自于一个家装产品Polyfilla。记住这一点就行：把旧的浏览器想象成为一面有了裂缝的墙，这些polyfill会帮助我们把这面墙的裂缝抹平，还我们一个更好的光滑的墙壁(浏览器)

>polyfill是专门兼容浏览器API的shim,shim的范围更大些

**Modernizr 网站的说法**

根据 Modernizr 网站的说法，polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”。“标准API”指的是 HTML5 技术或功能，例如 Canvas。“JavaScript补充”指的是可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。

例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，所有这些都是 W3C 地理位置 API 定义的对象和函数。

因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，最终目标是：一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。




### a browser detector

+   [bowser](https://github.com/ded/bowser)
+   [html5test])(https://github.com/NielsLeenheer/html5test)
+   [html5test](http://html5test.com/results/desktop.html)