## 利用ajax加载本地页面模板

### 背景

公司的电商后台管理系统需要重构，之前系统是由[requirejs](http://www.requirejs.cn/)框架搭配后台的java模板[usingthymeleaf](http://www.thymeleaf.org/)来生成页面。系统有很多优缺点，暂时先不做评论。总之，因为使用不太方便，因此考虑重构一个系统。

>在开发之前，上网找了很多的资料，想要和之前的系统一样，能够把页面上很多重复的组件独立成模板，在需要的页面引用，从而避免重复写代码的目的。

### 相关阅读资料

*github地址：*

- [PURE Unobtrusive Rendering Engine](https://github.com/pure/pure/tree/master/tutorial)
- [JADE.js](https://github.com/jadejs/jade)
- [doT.js](https://github.com/olado/doT)
- [jquery.load()](http://api.jquery.com/load/)
- [jquery.deferred()](http://api.jquery.com/category/deferred-object/)
- [jQuery的deferred对象详解](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)
- [React.js and How Does It Fit In With Everything Else](http://www.funnyant.com/reactjs-what-is-it/)


-----------------


1. 参考了网上和[JADE.js](https://github.com/jadejs/jade)和[doT.js](https://github.com/olado/doT)，都是`github`上很火的模板框架。但是既然是框架，肯定是也人写出来的，于是在接触之前我习惯自己瞎捣鼓一些东西...

1. 在写下面这些东西之前，看到了这篇牛文[JavaScript template engine in just 20 lines](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)

```js
var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir Tsonev",
    profile: { age: 29 }
}));
```

在`chrome`控制台，复制上述代码，最终得到`<p>Hello, my name is Krasimir Tsonev. I'm 29 years old.</p>`,相当炫酷，对不对？

**额外补充**

>关于正则表达式的exec和match的区别 

```js
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
var reg = /<%([^%>]+)?%>/g;

// 多次执行
reg.exec(template); // => ["<%this.name%>", "this.name"]
reg.exec(template); // => ["<%this.profile.age%>", "this.profile.age"]
reg.exec(template); // => null

template.match(reg) // => ["<%this.name%>", "<%this.profile.age%>"]
```



### 正文

目录结构：

```
- app
    - index.html
    - temp1.tpl
    - temp2.tpl
    - temp3.tpl
- css
    - temp.css
- js
    - temp.js
```


#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Templates</title>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.js"></script>
    <link rel="stylesheet" href="../css/temp.css">
    <script src="../js/tplEngine.js"></script>
    <script src="../js/temp.js"></script>
</head>
<body>
<section data-tpl="temp1.tpl"></section>
<section data-tpl="temp2.tpl"></section>
<section data-tpl="temp3.tpl"></section>
</body>
</html>
```

#### temp1.tpl & temp2.tpl & temp3.tpl

```html
<!-- temp1.tpl -->
<h2>this is a heading</h2>
<p>test-temp1</p>

<!-- temp2.tpl -->
<h2>this is a heading</h2>
<p>test-temp1</p>
<p>test-temp2</p>

<!-- temp3.tpl-->
<h2>this is a heading</h2>
<p>test-temp1</p>
<p>test-temp2</p>
<p>test-temp3</p>
```


**主要思路：利用`ajax`来读取同源文件，然后通过js渲染到`index.html`的页面中去**

查阅[jquery](http://api.jquery.com/jQuery.ajax/)文档，发现这样一段代码
```js
dataType (default: Intelligent Guess (xml, json, script, or html))
...
```

|dataType|meaning|
|:---:|:---|
|`html`|Returns HTML as plain text; included script tags are evaluated when inserted in the DOM.|


因此尝试依靠ajax来获取静态页面

`temp.js`

```js
utils.api.ajax = function (url, callback) {
    $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            success: function (data) {
                callback(data);
            },
            error: function (jqXHR, textStatus, errorThrown ) {
                alert('ajax error:' + errorThrown);
            }
        });
};
```

碰到的问题是：ajax异步调用，要保证所有`.tpl`页面都加载完成后，再来给DOM绑定事件，第一次的解决办法:

```js
var xhrs = 0, execs = 0, xhrsTimer, execTimes = 0;
    xhrs = $('html').find('section[data-tpl]').length;
    $('html').find('section[data-tpl]').each(function () {
        var url = $(this).attr('data-tpl');
        var $this = $(this);
        utils.api.ajax(url, function (data) {
            execs += 1;
            // html替换tpl的内容
            $this.get(0).outerHTML = data;
            /** $(this).html(data); // 这样会吧.tpl里的内容添加到section标签内，样式会有问题，因此不推荐
            */
        });
    });

    xhrsTimer = setInterval(function () {
        execTimes += 200;
        console.log(execTimes);
        if(execs && execs === xhrs){
            clearInterval(xhrsTimer);
            console.info('all xhrs done!');
            afterXhrs();
        }
    }, 200); // 多次在chrome中测试，平均时间在230ms

    function afterXhrs() {
        console.log('all done');
    }
```

后来在查阅jquery文档时，发现`$.load()`有这样的一段描述*Load data from the server and place the returned HTML into the matched element*，因此尝试利用该方法

```js
window.onload = function () {
    // 页面加载
    $('html').find('section[data-tpl]').each(function () {
        // 缺陷：加载data-tpl中的内容到innerHTML中，不能替换outerHTML
        $(this).load($(this).attr('data-tpl'));
    });
};
```

因为最终加载的内容没有办法替换当前的`section`标签，因此不予考虑

最终由于[jquery.deferred()](http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html)已实现了上面通过xhrs个数来判断的方法，因此有了下面的代码

```js
var wait = function () {
    var dtd = $.Deferred(); // 新建一个deferred对象
    tasks(); // 执行模板加载任务
    dtd.resolve();
    return dtd.promise();
};

var tasks = function () {
    $('html').find('section[data-tpl]').each(function () {
        var url = $(this).attr('data-tpl');
        var $this = $(this);
        utils.api.ajax(url, function (data) {
            // html替换tpl的内容
            $this.get(0).outerHTML = data;
        });
    });
};

$.when(wait())
 .done(function () {
    console.info('all xhrs done!');
    afterXhrs();
 })
 .fail(function () {
    console.log('something is wrong');
 })
```


上面的代码，由于对错误的处理不合理，因此又有了修改，见下面的`tplEngine.js`

```js
// 整合为jquery插件
$.tpls = function (selector, flag, done, fail) {
    if($.type(flag) === 'function'){
        done = flag;
        flag = false;
    }else if($.type(flag) === 'boolean'){
        flag = flag;
    }else{
        throw ('Type error, the second parameter must be a boolean or a function');
    }

    var counts = 0, size = $('html').find(selector).length;
    var fail = fail || function () {
        console.error('load templates failed');
    };

    // dom加载完后处理
    $(document).ready(function () {
        $('html').find(selector).each(function () {
            var url = $(this).attr('data-tpl');
            var $this = $(this);
            $.ajax(url).done(function (data) {
                counts += 1;
                if (flag) {
                    // html替换tpl的内容
                    $this.get(0).outerHTML = data;
                } else {
                    $this.html(data);
                }
            }).fail(function (jqXHR) {
                console.info('load ' + url + ' error:' + jqXHR.statusText);
                fail();
            });
        });
    });

    var timer = setInterval(function () {
        if(counts === size){
            clearInterval(timer);
            done();
        }
    }, 200);
    // 如果xhr报错，则强制在3000ms后关掉定时器
    setTimeout(function () {
        
        clearInterval(timer);
    }, 3000);
}

// 默认自动加载
$.tpls('section[data-tpl]', function () {
    console.info('load all templates!');
});
```

初步尝试是成功的，但是里面还有很多需要改进的地方，欢迎指正交流！