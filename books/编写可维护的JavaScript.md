## 阅读《编写可维护的JavaScript》摘要


### 作者简介

>作者: Nicholas C.Zakas。著有《Javscript高级程序设计》《Ajax高级程序设计》《高性能JavaScript》

>博客地址:[http://www.nczonline.net/](http://www.nczonline.net/)

>Twitter:@slicknet

编码规范重要的几个重要原因：

+ 软件生命周期中80%的成本消耗在维护上
+ 几乎所哟逇软件维护者都不是他的最初作者
+ 编码规范提高了软件的可读性，让工程师可以快速充分的理解新的代码
+ 如果你将源码作为产品来发布，你需要确保它是可完整打包的，且想你创建的其他产品一样整洁


**语录**

1. 当你开始工作时，你不是在给你自己写代码，而是为后来人写代码
2. 程序是写给人读的，只是偶尔让计算机执行以下
3. 构建软件设计的方法有两种：一种是把软件做的很简单以至于明显找不到缺陷；另一种是把它做的很复杂以至于找不到明显的缺陷。



---------



### 基本的格式化

>缩进层级：4个空格字符为一个缩进层级

>不省略分号

>行长度限定在80个字符

>换行：当一行长度超过了单行最大字符限制时，需要手动换行，下一行会增加**两个层级**的缩进

>命名：小驼峰命名法

*变量和函数名*

|动词|含义|
|:----:|:----|
|can|函数返回一个布尔值|
|has|函数返回一个布尔值|
|is|函数返回一个布尔值|
|get|函数返回一个非布尔值|
|set|函数用来保存一个值|

**常量**：用大写字母和下划线来命名

**构造函数**：首字符大写

**字符串**：可以使用单引号或者双引号，但是，确保你的代码从头到尾保持一种风格

**数字**：不要省略小数点之前或者之后的数字

**null**
以下场景应当使用null

+   用来初始化一个变量，这个变量可能赋值为一个对象
+   用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象
+   当函数的参数期望是对象时，作为参数传入
+   当函数的返回值期望是对象时，用做返回值传出

以下场景不应当使用null

+   不要用null来检测是否传入了某个参数
+   不要用null来检测一个未初始化的变量

>理解null最好的方式是将它当做对象的占位符(placeholder)

**undefined**：

```js
typeof null -> 'object'
null == undefined //true
```

通过禁止使用特殊值`undefined`，可以有效的确保只在一种情况下typeof才会返回`undefined`。当你使用了一个可能（或者可能不会）赋值为一个对象的变量时，将其赋值为null。

```js
// 不好的写法
var person;
console.log(person === undefined); //true

// 好的做法
var person = null;
console.log(person === null);

```

**对象直接量**

```js
// 不好的写法
var book = new Object();
book.title = 'Maintainable Javascript';

// 好的做法
var book = {
    title: 'Maintainable Javascript'
};
```

**数组直接量**
```js
// 不好的写法
var colors = new Array('red', 'blue', 'green');

// 好的做法
var colors = ['red', 'blue', 'green'];
```



---------



### 注释



-------



### 语句和表达式



------



### UI层的松耦合

>推荐模板引擎：Handlebar && Mustache

```js
function addListener(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else if (target.attachEvent) { // 兼容IE8及其更早的版本
        target.attachEvent('on' + type, handler);
    } else {
        target['on' + type] = handler;
    }
}

```



------



### 避免使用全局变量



------



### 事件处理

**规则一：隔离应用逻辑**

```js
// 不好的写法
function handleClick(event) {
    var popup = document.getElementById('popup');
    popup.style.left = event.clientX + 'px';
    popup.style.top = event.clientY + 'px';
    popup.classname = 'reveal';
}

addListener(element, 'click', handleClick);

// 好的写法- 拆分应用逻辑
var MyApplication = {

    handleClick: function (event) {
        this.showPopup(event);
    },

    showPopup: function (event) {
        var popup = document.getElementById('popup');
        popup.style.left = event.clientX + 'px';
        popup.style.top = event.clientY + 'px';
        popup.classname = 'reveal';
    }

}

addListener(element, 'click', function (event) {
    MyApplication.handleClick(event);
});
```

**规则二：不要分发事件对象**

>好的API一定是对于期望和依赖都是透明的
>确切的知道方法使用了哪些信息，这样才能正确的写出测试代码

```js
// 好的写法
var MyApplication = {
    
    handleClick: function (event) {
        
        // 假设事件支持DOM Level2
        event.preventDefault();
        event.stopPropagation();
    
        // 传入应用逻辑
        this.showPopup(event.clientX, event.clientY);
    },

    showPopup: function (x, y) {
        var popup = document.getElementById('popup');
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        popup.classname = 'reveal';
    }

};

addListener(element, 'click', function (event) {
    MyApplication.handleClick(event);
});

```

*在测试或代码的任意位置。都可以轻易调用*

```js
// 这样的调用非常棒
MyApplication.showPopup(10, 10);
```



### 避免"空比较"

#### 检测原始值

在JavaScript中有5种原始类型：字符串，数字，布尔，null，undefined。

检测一个DOM元素是否存在时，比如：

```js
var element = document.getElementById('myId');
if (element !== null) {
    element.className = 'found';
}
```

#### 检测引用值

引用值也称对象。在JavaScript中除了原始值之外的值都是引用。有这样几种内置的引用类型：`Object`，`Array`，`Data`，`Error`

检测某个引用值类型的最好方法是使用`instanceof`运算符。基本语法如下：
>value instanceof constructor

`instanceof`不仅可以检测构造这个对象的构造器，还可以检测原型链。

```js
var now = new Date();
now instanceof Date; // true
now instanceof Object; // true
```


#### 检测函数

>从技术上讲，JavaScript中的函数是引用类型，同样存在着Function构造函数，每个函数都是一个实例。

```js
function myFun() {}

// 不好的写法
console.log(myFun instanceof Function); // true

// 好的写法
console.log(typeof myFun === 'function'); // true
```

**检测函数最好的方法是使用typeof，因为它可以跨帧(frame)使用。**

>用typeof检测函数有一个限制。在IE8以及更早的版本IE浏览器中，使用typeof来检测DOM节点（比如 document.getElementById）中的函数都返回`object`而不是`function`

```js
// IE8以及更早的IE浏览器
console.log(typeof document.getElementById); // 'object'
console.log(typeof document.createElement); // 'object'
```

因为DOM有明确定义，了解到对象成员如果存在则意味着它是一个方法，开发者往往通过`in`运算符来检测DOM的方法，比如：

```js
// 检测DOM的方法
if ('querySelector' in document) {
    images = document.querySelectorAll('img');
}

```

尽管不是最理想的方法，但是想在IE8以及更早的浏览器中检测DOM的方法是否存在，这是最安全的做法。在其他的所有情形中，typeof运算符是检测JavaScript函数的最佳选择。

#### 检测数组

Jurut Zaytsev给出了一种优雅的方案。
```js
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
```


ECMAScript5将`Array.isArray`正式引入了JavaScript，很多JavaScript类库都类似的实现了这个方法:

```js
function isArray(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === '[object Array]';
    }
}
```

#### 检测属性

```js
var object = {
    count: 0,
    related: null
};

// 好的写法
if ('count' in object) {
    doSomething();
}

// 不好的写法
if (object['count']) {
    doSomething();
}
```

```js
// 对于所有非DOM对象来说，这是好的写法
if (object.hasOwnProperty('related')) {
    doSomething();
}

// 如果不确定是否为DOM对象，则这样写
if ('hasOwnProperty' in object && object.hasOwnProperty('related')) {
    doSomething();
}
```

不管什么时候需要检测属性的存在性，请使用`in`运算符或者`hasOwnProperty()`。这样可以避免很多bug。



### 将配置数据从代码中分离出来

精心设计的应用应当将关键数据从主要的源码中国抽离出来，这样我们修改源码时才更加放心。

```js
// 不好的写法
function validate(value) {
    if (!value) {
        alert('Invalid value');
        location.href = '/errors/invalid.php';
    }
}

function toggleSelected(element) {
    if (element.hasClass('selected')) {
        element.removeClass('selected');
    } else {
        element.addClass('selected');
    }
}

// 将配置数据抽离
var config = {
    MSG_INVALID_VALUE: 'invalid value',
    URL_INVALID: '/errors/invalid.php',
    CSS_SELECTED: 'selected'
};

function validate(value) {
    if (!value) {
        alert(config.MSG_INVALID_VALUE);
        location.href = confog.URL_INVALID;
    }
}

function toggleSelected(element) {
    if (element.hasClass(config.CSS_SELECTED)) {
        element.removeClass(config.CSS_SELECTED);
    } else {
        element.addClass(config.CSS_SELECTED);
    }
}


```


#### 保存配置数据

有三种常见的格式可供采用。

+   JSON。
+   JSONP(JSON width padding)，是将JSON结构用一个函数包装起来。
+   JavaScript，将JSON对象赋值给一个变量

```js
// JSON
{
    "MSG_INVALID_VALUE": "invalid value",
    "URL_INVALID": "/errors/invalid.php",
    "CSS_SELECTED": "selected"
}

// JSONP
myFun({
    "MSG_INVALID_VALUE": "invalid value",
    "URL_INVALID": "/errors/invalid.php",
    "CSS_SELECTED": "selected"
});

//JavaScript
var config = {
    "MSG_INVALID_VALUE": "invalid value",
    "URL_INVALID": "/errors/invalid.php",
    "CSS_SELECTED": "selected"
};
```



### 抛出自定义错误

关于抛出错误很好的经验法则。

+   一旦修复了一个很难调试的错误，尝试增加一两个自定义错误。当再次放生错误时，这将有助于更容易的解决问题。
+   如果正在编写代码，思考一下：“我希望[某些事情]不会发生，如果发生，我的代码会一团糟糕”。这时，如果“某些事情”发生，就抛出一个错误
+   如果正在编写的代码别人(不知道是谁)也会使用，思考一下他们使用的方式，在特定的情况下抛出错误。

*请牢记，我们的目的不是防止错误，而是在错误发生时能更加容易的调试*

**使用`try-catch`还是`throw`**

通常，开发者很难敏锐的判断是抛出一个错误还是用try-catch来捕获一个错误。



#### 错误类型

+   Error: 所有错误的基本类型
+   EvalError: 通过`eval()`函数执行代码时发生错误时抛出
+   RangeError: 一个数字超过了它的边界时抛出，在正常代码执行中是非常罕见的。
+   ReferenceError: 期望的对象不存在时抛出
+   SyntaxError: 给`eval()`函数传递的代码中有语法错误时抛出
+   TypeError: 变量不是期望的类型时抛出
+   URIError: 给`encodeURI()`、`encodeURIComponent()`、`decodeURI()`、`+   decodeURIComponent()`等函数传递格式非法的URI字符串时抛出



### 不是你的对象不要动

请牢记，如果你的代码没有创建这些对象，不要修改它们，包括：

+   原生对象(Object,Array等等)
+   DOM对象(例如， document)
+   浏览器对象模型(BOM)对象(例如，window)
+   库类对象

#### 原则

**企业软件需要一致而可靠的执行环境使其方便维护。**

把已存在的JavaScript对象如一个工具函数库一样对待。

+   不覆盖方法
+   不新增方法
+   不删除方法

#### 更好的方法

**基于对象的继承**

```js
var person = {
    name: 'Nicholas',
    sayName: function () {
        alert(this.name);
    }
};

var myPerson = Object.create(person);
myPerson.sayName(); // 弹出'Nicholas'
```

通过`Object.create()`新建一个对象

```js
// 重新定义myPerson.sayName()会自动切断对person.sayName()的访问
myPerson.sayName = function () {
    alert('Anonymous');
};

myPerson.sayName(); // 弹出'Anonymous'
person.sayName(); // 弹出'Nicholas'
```

`Object.create()`方法可以指定第二个参数，该参数对象中的属性和方法将添加到新对象中，比如：

```js
var myPerson = Object.create(person, {
    name: {
        value: 'Greg'
    }
});

myPerson.sayName(); // 弹出'Greg'
person.sayName(); // 弹出'Nicholas'
```

**基于类型的继承**

基于类型的继承是通过构造函数实现的，而非对象。

```js
function MyError(message) {
    this.message = message;
}

MyError.prototype = new Error();

var error = new MyError('something bad happened');
console.log(error instanceof Error); // true
console.log(error instanceof MyError); // true
```

比起JavaScript中的原生的类型，在开发者定义了构造函数的情况下，基于类型的继承是最合适的。基于类型的继承一般需要两步：

+   原型继承
+   构造函数继承(是调用超类的构造函数时传入新建的对象作为其`this`的值)

```js
function Person(name) {
    this.name = name;
}

function Author(name) {
    Person.call(this, name); // 继承构造器
}

Author.prototype = new Person(); // 原型继承
```


#### 门面模式

门面模式是一种流行的设计模式，它为一个已存在的对象创建一个新的接口，门面是一个全新的对象，其背后有一个已存在的对象在工作。(门面有时也叫包装器，它们用不同的接口来包装已存在的对象)

```js
function DOMWrapper(element) {
    this.element = element;
}

DOMWrapper.prototype.addClass = function (className) {
    if (document.body.classList != null) {
        this.element.classList.add(className);
    } else {
        this.element.className += ' ' + className;
    }
};

DOMWrapper.prototype.remove = function () {
    this.element.parentNode.removeChild(this.element);
}

// 用法
var wrapper = new DOMWrapper(document.getElementById('#test'));
// 添加一个className
wrapper.addClass('selected');
// 删除元素
wrapper.remove();
```

DOMWrapper类型期望传递给其构造函数器的是一个DOM元素。该元素会保存起来一遍以后引用，它还定义了一些操作该元素的方法。

从JavaScript的可维护性而言，门面是非常合适的方式，自己可以完全控制这些接口，你可以允许访问任何底层对象的属性或者方法，反之亦然，可以有效的过滤对该对象的访问。


#### 关于[Polyfill](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)的注解

+   [HTML5就是现在：深入了解Polyfills](http://blog.csdn.net/wang16510/article/details/8960312)

#### 阻止修改

*防止扩展*
禁止为对象"添加"属性和方法，但已存在的属性和方法是可以被修改或删除。
*密封*
类似"防止扩展"，而且禁止为对象"删除"已存在的属性和方法。
*冻结*
类似"密封"，而且禁止为对象"修改"已存在的属性和方法(所有的字段均为只读)

每种锁定的类型都拥有两个方法：一个用来实施操作，另一个用来检测是否应用了相应的操作。

**防止扩展**：`Object.preventExtensions()`和`Object.isExtensible()`

>原文page122，书写错误：将`Object.preventExtensions()`误写`Object.preventExtension()`，缺少*s*

```js
var person = {
    name: 'Nicholas'
};

// 锁定对象
Object.preventExtensions(person);
console.log(Object.isExtensible(person)); // false
person.age = 25; 
console.log(person.age); // undefined
```

**密封**：`Object.seal()`和`Object.isSealed()`

```js
// 锁定对象
Object.seal(person);
console.log(Object.isExtensible(person)); // false
console.log(Object.isSealed(person)); // true
delete person.name;
console.log(person.name); // 'Nicholas'
```

**冻结**：`Object.freeze()`和`Object.isFrozen()`

```js
// 锁定对象
Object.freeze(person);
console.log(Object.isExtensible(person)); // false
console.log(Object.isSealed(person)); // true
console.log(Object.isFrozen(person)); // true
person.name = 'Greg';
person.age = 25;
console.log(person.name, person.age); // 'Nicholas' undefined
```

*如果决定将你的对象锁定修改，我强烈推荐使用严格模式。**



### 浏览器嗅探

#### User-Agent检测

+   浏览器的user-agent都可以被工具修改。
+   建议不要担心user-agent不准

#### 特性检测

特性检测的原理：为特定浏览器的特性进行测试，并仅当特性存在时即可应用特性检测。

```js
// 不好的写法
if (navigator.userAgent.indexOf('MSIE 7') > -1) {
    // 做些什么
}

// 好的做法
if (document.getElementById) {
    // 做些什么
}
```

优化后的写法:

```js
// 好的写法
function getById(id) {
    var element = null;
    if (document.getElementById) { // DOM
        element =  document.getElementById(id);
    } else if (document.all) { //IE
        element =  document.all[id];
    } else if (document.layers) { // Netscape < = 4
        element =  document.layers[id];
    }
    return element;
}
```

1. 探测标准的方法
2. 探测不同浏览器的特定方法
3. 当探测的方法均不存在时，提供一个合乎逻辑的备用方法。

合理的`requestAnimationFrame()`特性检测代码如下：

```js
function setAnimation(callback) {
    if (window.requestAnimationFrame) { // 标准
        return requestAnimationFrame(callback);
    } else if (window.mozRequestAnimationFrame) { // Firefox
        return mozRequestAnimationFrame(callback);
    } else if (window.webkitRequestAnimationFrame) { // Webkit
        return webkitRequestAnimationFrame(callback);
    } else if (window.oRequestAnimationFrame) { // Opera
        return oRequestAnimationFrame(callback);
    } else if (window.msRequestAnimationFrame) { // IE
        return msRequestAnimationFrame(callback);
    } else {
        return setTimeout(callback, 0);
    }
}
```

#### 避免特性推断


#### 避免浏览器推断




### 自动化



### 文件和目录结构


### 附录A

A.7.12 留白

两行空行仅限如下情况中使用：

+   在不同的源代码文件之间
+   在类和接口定义之间

单行空行仅限在如下情况中使用：

+   方法之间
+   方法中局部变量和第一行语句之间
+   多行或者单行注释之间
+   方法中逻辑代码块之间以提升代码的可读性

空格应当在如下情况中使用：

+   关键词后跟括号的情况应该用空格隔开
+   参数列表中都好一周应当保留一个空格
+   所有的出了点(.)之外的二元运算符，其操作符都应当用空格隔开(单目运算符的操作数之间不应该用空格隔开，如递增(++)、递减(--))
+   for语句中的表达式之间应当用空格隔开   




