## 前端模板引擎比较分析

### 1. [doT](https://github.com/olado/doT)

最简洁的JavaScript模板引擎。支持Nodejs和浏览器。快速，小巧，无依赖。

**特性**

+   自定义分隔符
+   运行时评估
+   运行时内插
+   编译时评估
+   泛音的支持
+   条件支持
+   数组迭代器
+   编码
+   控制空白地带或保存
+   流媒体友好
+   可作为轻逻辑(logic-less)或带逻辑的,由你自己决定

[文档，在线操作和示例](http://olado.github.io/doT/)

+   [demo](https://jsfiddle.net/g09rqrgn/4/)

```js
/**
 * el:页面上装载dot模板的容器选择器
 * data: 用来渲染模板的数据
 * container: 装载渲染后的html的容器
 */
function rendered(el, data, container) {
    container = container || this.container;
    var htm = $(el).html();
    var temp = doT.template(htm);
    $(container).append(temp(data));
}
```

doT的模板设置-默认编译设置：
可以通过改变编译设置来进行自定义设置。下面是默认设置：

```js
doT.templateSettings = {
    evaluate:    /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    encode:      /\{\{!([\s\S]+?)\}\}/g,
    use:         /\{\{#([\s\S]+?)\}\}/g,
    define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    strip: true,
    append: true,
    selfcontained: false
};
```

如果你想使用自己的分隔符，可以将doT.templateSettings中的正则表达式修改成你自己喜欢的。

下面是默认的分隔符：

+   {{}}: 求值
+   {{= }}: 插值
+   {{! }}: 带编码求值
+   {{# }}: for compile-time evaluation/includes and partials
+   {{## #}}: 编译时定义
+   {{?}}: 条件选择式
+   {{~ }}: 数组迭代

默认状态下，模板中的数据必须用`it`来引用，可以通过修改`varname`的值来改变默认的变量名。如果将`varname`值设置为`foo,bar`，那么你可以传递`foo`和`bar`两个数据实例到模板中进行引用。

使用`strip`来控制空格，`false`表示保留控制，`true`表示剥离空格。

`append`用来设置性能最优化，根据JavaScript引擎和模板文件的大小它可以性能全开，把它设置为false可能会产生更好的结果。

`selfcontained`设置为`true`，doT会生成一些依赖doT的函数。一般来说，它只有在`encoding`被使用的时候才会被添加，产生的函数不依赖doT，除了`encodeHTML`。如果`selfcontained`设置为`true`并且模板需要编码，`encodeHTML`函数会被包含在生成模板的函数中。

>Node模式的内容，目前暂不涉及，有需要的请查阅[官网](http://olado.github.io/doT/)



### 2. [mustache](https://github.com/janl/mustache.js)

Mustache是一个logic-less（无逻辑或轻逻辑）语法模板。可以用于组织HTML、配置文件、源代码在内的任何东西。Mustache使用JavaScript对象的值，用来扩展模板代码中的大括号标签。

+   [demo](https://jsfiddle.net/aLmv8vpv/1/)


### 3. [pug](https://github.com/pugjs/pug)

+   [pug.git](https://github.com/pugjs/pug)
+   [demo](http://jade-lang.com/)

Pug是一个有着完善API和惊艳特性的JavaScript模板引擎。使用空白与缩进敏感的代码格式编写HTML页面。基于Node.js，运行在服务器端。