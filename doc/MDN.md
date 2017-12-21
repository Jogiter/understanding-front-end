## MDN

### EventTarget.addEventListener(type, listener[, options][, useCapture])

options 可选
一个指定有关 listener 属性的可选参数对象。可用的选项如下：

+	capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
+	once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
+	passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
+	 mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。


**option支持的安全检测**

```js
var passiveSupported = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });
  window.addEventListener("test", null, options);
} catch(err) {}
```

然后，当你想实际创建一个是否支持options的事件侦听器时，你可以这样做：

```js
someElement.addEventListener("mouseup", handleMouseUp,
	passiveSupported ? { passive: true } : false
);
```

**使用 passive 改善的滚屏性能**

```js
var elem = document.getElementById('elem');
elem.addEventListener('touchmove', function listener() { /* do something */ }, { passive: true });
```

添加passive参数后，touchmove事件不会阻塞页面的滚动（同样适用于鼠标的滚轮事件）[demo](https://rbyers.github.io/scroll-latency.html)

>注意：那些不支持参数options的浏览器，会把第三个参数默认为useCapture，即设置useCapture为true

+	[Passive event listeners](https://www.chromestatus.com/feature/5745543795965952)
