## 前端性能优化

### 资源预加载预加载

+	[DNS 预读取](https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching)
+	[prefetch](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Link_prefetching_FAQ)
+	[preload](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content)
+	[前端性能优化 - 资源预加载](http://bubkoo.com/2015/11/19/prefetching-preloading-prebrowsing/)
+	[Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

**preload**

>对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

用法：

```html
<link rel="preload" href="style.css" as="style">
<link rel="preload" href="main.js" as="script">
<link rel="preload" href="sintel-short.mp4" as="video" type="video/mp4">
<!-- 字体文件，那么即是是非跨域的情况下，也需要应用crossorigin="anonymous" -->
<link rel="preload" href="fonts/cicle_fina-webfont.eot" as="font" type="application/vnd.ms-fontobject" crossorigin="anonymous">
<link rel="preload" href="bg-image-narrow.png" as="image" media="(max-width: 600px)">
```

脚本化与预加载:

```js
var preloadLink = document.createElement("link");
preloadLink.href = "myscript.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);
```

浏览器将预加载这个JavaScript文件，但并不实际执行它。
如果要对其加以执行，在需要的时候，你可以执行：

```js
var preloadedScript = document.createElement("script");
preloadedScript.src = "myscript.js";
document.body.appendChild(preloadedScript);
```


优化点：

1. 更精确地优化资源加载优先级。
2. 匹配未来的加载需求，在适当的情况下，重复利用同一资源。
3. 为资源应用正确的[内容安全策略](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)。
4. 为资源设置正确的 [Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept) 请求头。

`as`属性值：

- audio: 音频文件。
- document: 一个将要被嵌入到`<frame>`或`<iframe>`内部的HTML文档。
- embed: 一个将要被嵌入到<embed>元素内部的资源。
- fetch: 那些将要通过fetch和XHR请求来获取的资源，比如一个ArrayBuffer或JSON文件。
- font: 字体文件。
- image: 图片文件。
- object: 一个将会被嵌入到<embed>元素内的文件。
- script: JavaScript文件。
- style: 样式表。
- track: WebVTT文件。
- worker: 一个JavaScript的web worker或shared worker。
- video: 视频文件。

>你可以通过进一步阅读[link element extensions](https://w3c.github.io/preload/#link-element-extensions)来了解关于这些属性值以及其他在Preload方案中预期将采纳的特性的细节。同样需要注意的是，关于as属性的有效值得完整列表是由Fetch方案来制定的，可以查看[request destinations](https://fetch.spec.whatwg.org/#concept-request-destination)来进行了解。

**DNS-Prefetch**

>通过简单的一行代码就可以告知那些兼容的浏览器进行 DNS 预解析，这意味着当浏览器真正请求该域中的某个资源时，DNS 的解析就已经完成了。

用法：

```html
<link rel="dns-prefetch" href="//example.com">
```

这似乎是一个非常微小的性能优化，显得也并非那么重要，但事实并非如此 – [Chrome 一直都做了类似的优化](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present?slide=id.g120f70e9a_041)。当在浏览器的地址栏中输入 URL 的一小段时，Chrome 就自动完成了 DNS 预解析（甚至页面预渲染），从而为每个请求节省了至关重要的时间。

**Tips**

>更多问题参见[Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

Q: 什么时候应该使用`<link rel="preload">`和`<link rel="prefetch">`?
A: 对于确认一定会在当前页面中使用的资源使用`preload`。对于可能会用来跳转的多个跨域资源使用`prefetch`。


