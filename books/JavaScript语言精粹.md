## JavaScript语言精粹

**函数**

函数声明方式：`Function`构造函数(这种声明函数的方式非常不直观，几乎无人使用)
>var function_name = new function(arg1, arg2, ..., argN, function_body) 

```js
var add = Function('x', 'y', 'return x + y;');

// 等同于
function add(x, y) {
    return x + y;
}

var foo = new Function(
  'return "hello world"'
);

// 等同于

function foo() {
  return "hello world";
}
```

1. Function构造函数接受多个参数，除了最后一个参数是add函数的“函数体”，其他参数都是add函数的参数。如果只有一个参数，该参数就是函数体。
2. Function构造函数可以不使用new命令，返回结果完全一样。

+   [JavaScript标准参考教程](http://javascript.ruanyifeng.com/grammar/function.html)



**原型链继承**

参考[JavaScript权威指南]()

```
var Foo = function(option) {
    this.name = option.name || 'foo';
}

Foo.prototype.getName = function() {
    return this.name;
}

var obj = new Foo('hello javascript');
obj.getName();
```

+   关于[插件开发](http://i5ting.github.io/How-to-write-jQuery-plugin/build/jquery.plugin.html)以及函数链式调用([闭包原理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures))





**递归**
递归函数就是会直接或间接调用自身的一种函数。

递归是一种强大的编程技术，它把一个问题分解为一组相似的子问题，每一个都用一个寻常解去解决。一般来说，一个递归函数调用自身去解决它的子问题。

递归函数可以非常高效的操作树形结构，比如浏览器的文档对象模型(DOM)，每次递归调用时处理指定的树的一小段。

```javascript
/** 
 定义walk_the_dom 函数，它从某个指定的节点开始，按HTML源码中的顺序访问该树的每个节点，它会调用一个函数，并依次传递每个节点给它。walk_the_dom调用自身去处理每一个子节点
*/
var walk_the_dom = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while(node) {
        walk(node, func);
        node = node.nextSibling;
    }
};

/**
 定义getElementsByAttribute函数u，它以一个属性名称字符串和一个可选的匹配值作为参数。它调用walk_the_dom,传递一个用来查找节点属性名的函数作为参数。匹配的结点会累加到一个数组中。
*/
var getElementsByAttribute = function(attr, value) {
    var results = [];
    walk_the_dom(document.body, function(node) {
        var actual = node.nodeType === 1 && node.getAttribute(attr);
        if (typeof actual === 'string' && 
            (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
};
```

经典的斐波拉契函数

>斐波拉契数列是一个非常美丽、和谐的数列，即0、1、1、2、3、5、8、13、21……直至无穷大。这些数字从第三个开始，每一个都等于前面两个数之和。同时后一个数字和前一个数字的比值，无限接近于黄金(1260.10, 1.90, 0.15%)分割0.618

```javascript
function febonacci(n) {
    return n < 2 ? n : febonacci(n - 2) + febonacci(n - 1);
}
```




**闭包**
定义：即函数定义和函数表达式位于另一个函数的函数体内。而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。

也就是说，`内部函数会在外部函数返回后被执行，就会形成闭包`。

```javascript
// 糟糕的例子
var add_handles = function(nodes) {
    var i,len;
    for (i = 0, len = nodes.length; i < len; i++) {
        nodes[i].onclick = function(e) {
            alert(i);
        };
    }
};
/**函数的本意是传递给每个事件处理器一个唯一值(i)，但是事件处理器函数绑定了变量i本身，而不是函数在构造时的变量i的值*/

// === 正确的姿势
var add_handles = function(nodes) {
    // 辅助函数
    var helper = function(n) {
        return function(e) {
            alert(n);
        };
    };
    for (i = 0, len = nodes.length; i < len; i++) {
        nodes[i].onclick = helper(i);
    }
}
```

闭包的好处：
1. 不增加额外的全局变量，
2. 执行过程中所有变量都是在匿名函数内部。

闭包的缺点：
1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
2. 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public 
3. Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。





**柯里化**
柯里化允许我们把函数与传递给它的参数相结合，产生出一个新的函数。

函数的`arguments`数组并非一个正真的数组，所以它并没有`Array`的常用方法，如果我们要在`arguments`数组上应用数组的`slice`方法，如下:

```javascript
var foo = function() {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments);
    var type = function(o) {
        return Object.prototype.toString.call(o);
    };
    console.log(type(arguments), type(args));
    return;
}
// [object Arguments] [object Array]
```




**记忆**
函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化被称为记忆(用于加速程序计算的一种优化技术)。

下面是打印febonacci数列的前10个数字：

```javascript
var times = 0;
var febonacci = function(n) {
    times++;
    return n < 2 ? n : febonacci(n - 1) + febonacci(n - 2);
};

for (var i = 0; i <= 10; i++) {
    console.log('febonacci(' + i + ')的值为:' + febonacci(i));
}
console.log(times);
// 453
```

下面是利用记忆优化的算法：
>我们创建一个数组memo来保存先前的计算结果，存储结果可以隐藏在闭包中，当函数调用时，先检查结果是否存在，如果已存在，就立即返回该值。

```javascript
var times = 0;
var febonacci = function(n) {
    var memo = [];
    var fib = function(n) {
        times++;
        var result;
        if (n < 2) {
            result = memo[n] = n;
        } else {
            if (typeof memo[n] === 'undefined') {
                memo[n] = result = fib(n - 1) + fib(n - 2);
            } else {
                result = memo[n];
            }
        }
        return result;
    };
    return fib;
}();
for (var i = 0; i <= 10; i++) {
    console.log('febonacci(' + i + ')的值为:' + febonacci(i));
}
console.log(times);
// 29
```

从数据可以看出，优化后的算法大大减少了函数的调用次数。




**正则表达式**

可处理正则表达式的方法有：regexp.exec、regexp.test、string.match、string.replace、string.search、string.split。

正则表达式标志：

|标志|含义|
|:---:|:---|
|g|全局的(不同的方法对g标志的处理各不同)|
|i|大小写不敏感(忽略字符大小写)|
|m|多行(^和$能匹配行结束符)|

RegExp对象的属性

|属性|用法|
|:----|:----|
|global|如果标志g被使用，为true|
|ignoreCase|如果标志i被使用，为true|
|lastIndex|下一次exec匹配开始的索引|
|multiline|如果标志m被使用，为true|
|source|正则表达式源码文本|

```javascript
var reg1 = /^\d{1,3}[a-z]{1,2}$/g;
var reg2 = new RegExp('\\d{1,3}[a-z]{1,2}', 'g'); // 需要对'\d'的'\'进行转义
reg1 == reg2; // false
reg1.test('123js'); // true
reg2.test('123js'); // true
```

+   [正则表达式30分钟入门教程](http://www.jb51.net/tools/zhengze.html)



**Array**

*   array.concat(item...)
*   array.join(separator)
*   array.pop() 移除array中的最后一个元素并返回该元素，如果array是empty，返回undefined
*   array.push(item...)
*   array.sort() 对array中的内容进行排序，它不能正确的给一组数字排序。
*   array.reverse() 反转array里元素的顺序，并返回array的本身
*   array.shift() 移除array中的第一个元素并返回该元素，如果array是empty，返回undefined。(通常比pop慢很多)
*   array.unshift(item...) 把item插入到array的开始部分，返回新数组的length
*   array.slice(start, end)  返回一个新数组
*   array.splice(start, deleteCount, item...) 从array中移除一个或多个元素，并用新的item替换它们。返回一个包含被移除元素的数组。

```javascript
// pop用splice实现
Array.prototype.pop = function() {
    return this.splice(this.length - 1, 1)[0];
}

// push用splice实现
Array.prototype.push = function() {
    this.splice.apply(this, [this.length, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
}

// unshift用splice实现
Array.prototype.unshift = function() {
    return this.splice(0, 1)[0];
}

// sort给任何包含简单单值的数组排序
var arr = [4,61,5,51,6,41,'aa','bb','ab'];
arr.sort(function(a, b) {
    if (a === b) {
        return 0;
    }
    if (typeof a === typeof b) {
        return a < b ? -1 : 1;
    }
    return typeof a < typeof b ? -1 : 1;
});
// [4, 5, 6, 41, 51, 61, "aa", "ab", "bb"]

// unshift用splice实现
Array.prototype.unshift = function() {
    this.splice.apply(this, [0, 0].concat(Array.prototype.slice.apply(arguments)));
    return this.length;
}
```




**number**

*   `number.toExponential(fractionDigits)`把数字转换成指数形式的字符串，可选参数控制小数点后的位数，值在0~20
*   `number.toFixed(fractionDigits)`把数组转换为十进制形式的字符串，可选参数控制小数点后的位数，值在0~20
*   `number.toPrecision(precision)`把number转换成一个十进制形式的字符串。可选参数控制数字精度，值为0~21
*   `number.toString(radix)`把number转换成一个字符串。可选参数控制基数，值在2~36，默认基数10，可以是任意的数字

```javascript
var PI = Math.PI,
    big = 12345.6789;
var number = ['toExponential', 'toFixed', 'toPrecision', 'toString'];

for (i = 0, len = number.length; i < len; i++) {
    console.log(Number.prototype[number[i]].call(PI, 2));
    console.log(Number.prototype[number[i]].call(big, 2));
}
/**
3.14e+0
1.23e+4
3.14
12345.68
3.1
1.2e+4
11.001001000011111101101010100010001000010110100011
11000000111001.101011011100110001100011111100010100001
*/
```

补充：
`number.toString`相反的操作是`parseInt(string, radix)`

`parseInt`解析一个字符串并返回一个整数。可选参数radix表示要解析的数字的基数，值为2~36，默认基数10。




**Object**

object.hasOwnProperty(name)，如果object包含一个名为name的属性，那么`hasOwnProperty`方法返回`true`，原型链中的同名属性是不会被检查的，此时返回`false`。

```javascript
var a = {member: true}; 
// 相当于 var b; b.prototype = a;
var b = Object.create(a); // {} 
a.hasOwnProperty('member'); // true
b.hasOwnProperty('member'); // false
console.log(b.member); // true
```

补充：
[Object.create(prototype, descriptors)](https://msdn.microsoft.com/zh-cn/library/ff925952)

+   prototype。必需。要用作原型的对象。可以为 null。
+   descriptors。可选。包含一个或多个属性描述符的 JavaScript 对象。

返回一个具有指定的内部原型且包含指定的属性（如果有）的新对象。




**string**
*   `string.charAt(pos)`返回在string中pos位置处的字符
*   `string.charCodeAt(pos)`返回string中pos位置处字符的字符码位
*   `string.concat(string...)`构造一个新的字符串，很少被使用，用`+`更方便
*   `string.indexOf(searchString, position)`在string中查找searchString，如果被找到，返回第一个匹配字符的位置，否则返回-1；可选参数position可设置查找的起始位置。
*   `string.lastIndexOf(searchString, position)`和indexOf方法类似，不过从字符串的末尾开始查找。
*   `string.localeCompare(that)`比较两个字符串，比较规则没有详细说明
*   `string.match(regExp)`让字符串和正则表达式进行匹配。带有标志g和不带标志g的结果不同，返回包含所有匹配的数组。
*   `string.replace(searchValue, replaceValue)`查找string中的searchValue并用replaceValue来进行替换，返回新的字符串。
*   `string.search(regexp)`和indexOf类似
*   `string.slice(start, end)`复制string来构造一个新的字符串
*   `string.split(separator, limit)`把string分隔成片段来创建一个字符串数组，可选参数limit限制被分隔的片段数量。
*   `string.subString(start, end)`和slice方法一样，只是不能处理负数参数
*   `String.fromCharCode(char...)`根据一串数字编码返回一个字符串




**优美的特性**

>特性有规定成本、设计成本和开发成本，还有测试成本和可靠性成本。特性越多，某个特性出现问题，或者其他特性相互干扰的可能性就越大。



**附录A(毒瘤)**

*   全局变量：JavaScript允许使用全局变量，并且依赖全局变量。当程序较大时，会导致程序难以调试和维护
*   作用域：在大多数语言中，声明变量最好的地方是第一次使用它的地方，在JavaScript中这是个坏习惯，因为它没有块级作用域，更好的办法是在每个函数的头部声明所有变量
*   自动插入分号：JavaScript的自动插入分号机制。
    
```js
return 
{
    status: true
};
// undefined，实际执行会是return; {status: true};

return {
    status: true
};
// true
```

*   typeof：`typeof null`返回的不是`null`，而是`object`
*   parseInt:遇到非数字不会停止解析。`parseInt(16)`和`parseInt('16 tons')`产生的结果相同
*   +：可以用于加法运算或字符串连接。如果想做加法运算，请确保两个运算数都是整数
*   浮点数：二进制的浮点数不能正确的处理十进制的浮点数，因此`0.1+0.2`不等于0.3。这是JavaScript中最常报告的bug。不过浮点数中的整数运算是精确的。

```javascript
// 浮点数计算不精确
0.1 + 0.2; // 0.30000000000000004
// 整数计算是精确的
(0.1 * 10 + 0.2 * 10 ) / 10; // 0.3
```

*   NaN：表示不是一个数字(not a number)

```javascript
typeof NaN; // number
NaN + '0'; // NaN
NaN + 'oops'; // NaN
NaN === NaN; // false
NaN !== NaN; // true
```

*   伪数组：JavaScript中没有真正的数组，它们永远不会产生越界错误。

```javascript
var arr = [];
arr.length; // 0
arr[-1]; // undefined
arr[100]; // undefined
```

*   假值：

|值|类型|
|:---|:----|
|0|Number|
|NaN|Number|
|''|String|
|false|Boolean|
|null|Object|
|undefined|Undefined|

上面的值全都等同于假，但是它们是不可互换的

*   hasOwnProperty：该方法被用作一个过滤器去避开`for in`语句中的一个隐患。遗憾的是，这是一个方法而不是一个运算符，所以有可能会被修改

```javascript
// for in中的隐患
var foo = {member: true},
    bar = Object.create(foo);
for (var i in bar) {
    console.log(bar[i], bar.hasOwnProperty(i)); // true false
}

// 被修改的hasOwnProperty
var foo = {
    hasOwnProperty: 'changed function',
    name: 'foo'
};
foo.hasOwnProperty('name'); 
// Uncaught TypeError: foo.hasOwnProperty is not a function(…)
```



**附录B(糟粕)**

*   ==：JavaScript中有两组相等运算符：===&&!==和==&&!=。前一组会按照你的期望的方式工作，但后面的邪恶的孪生兄弟只有在两个运算符类型一致时才会做出正确判断；如果两个运算符的类型不同，它们会强制转换类型，导致下面的有趣问题:

```javascript
'' == '0'; // false
0 == ''; // true
0 == '0'; // true

false == 'false'; // false
false == '0'; // true

false == undefined; // false
false == null; // false
null == undefined; // true

' \t\r\n ' == 0; // true
```

>建议永远不要使用那对邪恶的孪生兄弟。请始终使用该===&&!==。

*   with：本意是想用它来快捷的访问对象的属性。不幸的是，它的结果有时不可预料；with本身严重过影响了JavaScript处理器的速度，因为它阻断了变量名的测发作用域绑定。

*   eval：该函数传递一个字符串给JavaScript编译器，并且执行结果。eval函数富裕了被求值文本太多的权利，减弱了应用程序的安全性，而且会降低语言的性能

>Function构造器是eval的另一种形式，同样也应该避免使用它。

*   continue：跳到循环的顶部。一段代码重构后移除continue语句后，性能会得到改善
*   switch：除非明确中断流程，否则每次条件判断后都会穿越到下一个case条件。
*   ++ --：会使得代码风格非常简洁，但是大多数缓冲区溢出错误所造成的安全漏洞，都是由像这样的编码导致的。据实践，会使代码复杂和隐晦。作为一条原则，不再使用它。
*   位运算符：

|运算符|含义|
|:---|:---|
|&|and 按位与|
|\||or 按位或|
|~|xor 按位非|
|>>|带符号的右位移|
|>>>|无符号的(用0补足的)右位移|
|<<|左位移|

在Java里，位运算符处理的都是整数。JavaScript没有整数类型，它只有双精度的浮点数。因此，位操作符把他们的数组运算数先转换成整数，接着执行运算，然后再转换回去，在大多数语言中，这些位运算接近硬件处理，所以非常快。但是在JavaScript的执行环境一般接触不到硬件，所以非常慢。JavaScript很少执行位操作。

*   void：在JavaScript中void是一个运算符，接受一个运算数并返回undefined。应避免使用它。
