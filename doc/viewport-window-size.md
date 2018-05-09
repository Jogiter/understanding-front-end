## [使用 javascript 获取视口/窗口大小（宽度和高度）](https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript)

### 阅读链接

* [stackoverflow: get-the-size-of-the-screen-current-web-page-and-browser-window](https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window)
* [Get viewport/window size (width and height) with javascript](https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript)
* [How to get height of entire document with JavaScript?
  ](https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript)

### 使用 jQuery 方法获取窗口或文档的大小

```js
$(window).height() // returns height of browser viewport
$(document).height() // returns height of HTML document (same as pageHeight in screenshot)
$(window).width() // returns width of browser viewport
$(document).width() // returns width of HTML document (same as pageWidth in screenshot)
```

### [使用原生 js 方法获取窗口的大小](http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/)

**长版本**

```html
<script type="text/javascript">
  var viewportwidth
  var viewportheight
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewportwidth = window.innerWidth
    viewportheight = window.innerHeight
  } else if (
    typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' &&
    document.documentElement.clientWidth != 0
  ) {
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    viewportwidth = document.documentElement.clientWidth
    viewportheight = document.documentElement.clientHeight
  } else {
    // older versions of IE
    viewportwidth = document.getElementsByTagName('body')[0].clientWidth
    viewportheight = document.getElementsByTagName('body')[0].clientHeight
  }
  document.write(
    '<p>Your viewport width is ' + viewportwidth + 'x' + viewportheight + '</p>'
  )
</script>
```

**短版本**

返回对象

```js
function viewport() {
  var e = window,
    a = 'inner'
  if (!('innerWidth' in window)) {
    a = 'client'
    e = document.documentElement || document.body
  }
  return { width: e[a + 'Width'], height: e[a + 'Height'] }
}
```

返回变量

```js
var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = w.innerWidth || e.clientWidth || g.clientWidth,
  y = w.innerHeight || e.clientHeight || g.clientHeight
console.log(x + ' × ' + y)
```

### [使用原生 js 方法获取文档的大小](http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/)

```js
const body = document.body
const html = document.documentElement

let height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
)
```

### 获取页面可滚动区域高度

```js
function getScrollHeight() {
  let body = document.body
  let html = document.documentElement
  let height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )
  let viewportHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight

  return height > viewportHeight ? height - viewportHeight : 0
}
```
