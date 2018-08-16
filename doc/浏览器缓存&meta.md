# 浏览器缓存&meta

+ [MDN:meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)
+ [MDN:Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
+ [Blog:浏览器缓存机制剖析](http://louiszhai.github.io/2017/04/07/http-cache/)


`filename.ext?v=version` 与 `filename-version.ext` 的区别？

前者指向同一个文件，后者指向的是不同的文件。
每次访问前者，浏览器会根据 version 来判断是否需要重新获取文件。缺点是不便于 cdn 缓存。每次访问后者，都是新的文件，但是便于 cdn 缓存。
