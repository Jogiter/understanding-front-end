# note:

    第八章：发布-订阅模式
    第十五章装饰着模式

# 目录

    +   [基础知识](#基础知识)
        +   [面向对象的JavaScript](#面向对象的JavaScript)
        +   [this、call和apply](#this、call和apply)
        +   [闭包和高阶函数](#闭包和高阶函数)
    +   [设计模式](#设计模式)
        +   [单例模式](#单例模式)
        +   [策略模式](#策略模式)
        +   [代理模式](#代理模式)
        +   [迭代器模式](#迭代器模式)
        +   [发布-订阅模式](#发布-订阅模式)
        +   [命令模式](#命令模式)
        +   [组合模式](#组合模式)
        +   [模板方法模式](#模板方法模式)
        +   [享元模式](#享元模式)
        +   [职责链模式](#职责链模式)
        +   [中介者模式](#中介者模式)
        +   [装饰者模式](#装饰者模式)
        +   [状态模式](#状态模式)
        +   [适配器模式](#适配器模式)
    +   [设计原则和编程技巧](#设计原则和编程技巧)
        +   [单一职责原则](#单一职责原则)
        +   [最少知识原则](#最少知识原则)
        +   [开放-封闭原则](#开放-封闭原则)
        +   [接口和面向接口编程](#接口和面向接口编程)
        +   [代码重构](#代码重构)



#基础知识

1、编程语法按照数据类型可以分为两类，一类是静态类型的语言，另一类是动态类型的语言。
2、静态类型语言在编译时便已经确定变量的类型，而动态类型语言的变量类型要到程序运行时，待变量被赋予某个值之后，才会具有某种类型。
JavaScript是一门典型的动态类型语言。
3、多态的实际含义：同一操作作用于不用的对象时，会产生不同的解释和不同的执行结果。

Martin Flower在《重构：改善既有代码的设计》
>多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答案调用对象的某个行为--你只管调用该行为就是了，其他的一切多态鸡智都会为你安排妥当。

```js
var googleMap = {
    show: function() {
        console.log('开始渲染谷歌地图');
    }
};

var renderMap = function() {
    googleMap.show();
};

renderMap(); // "开始渲染谷歌地图"
```

因为某些原因，需要将谷歌换成百度

```js
var baiduMap = {
    show: function() {
        console.log('开始渲染百度地图');
    }
};

var renderMap = function(type) {
    if (type === 'google') {
        googleMap.show();
    } else if (type === 'baidu') {
        baiduMap.show();
    }
};

renderMap('baidu'); // "开始渲染百度地图"
```

如果继续替换，将会不停的堆砌条件分支语句，如果将程序中相同的部分抽离

```js
// 将逻辑和实现分离开来，更优雅
var renderMap = function(map) {
    if (typeof map.show === 'function') {
        map.show();
    }
};

var sosoMap = {
    show: function() {
        console.log('开始渲染搜搜地图');
    }
};

renderMap(sosoMap); // "开始渲染搜搜地图"
```


# 闭包和高阶函数

## 闭包的更多作用

简单的计算乘积的函数

```js
var mult = function() {
    var a = 1;
    for (var i = 0, length = arguments.length; i < length; i++) {
        a *= arguments[i];
    }
    return a;
};
```

如果参数相同，每次进行计算是一种浪费，可以加入缓存机制来提高函数的性能

```js
var cache = {};
var mult = function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
        return cache[args];
    }
    var a = 1;
    for (var i = 0, length = arguments.length; i < length; i++) {
        a *= arguments[i];
    }
    return cache[args] = a;
};
```

cache这个变量仅仅在函数中被使用，因此可以把它封闭在mult函数内部来减少全局变量

```js
var mult = function() {
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        var a = 1;
        for (var i = 0, length = arguments.length; i < length; i++) {
            a *= arguments[i];
        }
        return cache[args] = a;
    };
};
```

**提炼函数是代码重构中的一种常见技巧**

```js
var mult = (function() {
    var cache = {};

    var calculate = function() { // 封闭的函数
        var a = 1;
        for (var i = 0, length = arguments.length; i < length; i++) {
            a *= arguments[i];
        }
        return a;
    };

    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    };
})();
```


## 高阶函数

高阶函数是指至少满足下列条件之一的函数：

+   函数可以作为参数被传递
+   函数可以作为返回值输出

1.函数可以作为参数被传递

回调函数:

```js
var getUserInfo = function(userId, callback) {
    $.ajax('http://xx.com/getUserInfo?' + userId, function(res) {
        if (callback && typeof callback === 'function') {
            callback(data);
        }
    });
};

getUserInfo(123, function(userInfo) {
    alert(userInfo.name);
});
```

Array.prototype.sort:

```js
// 从小到大排序
var arr = [3,1,2];
arr.sort(function(a, b) {
    return a - b;
});
// [1,2,3]
```

2.函数可以作为返回值输出

判断数据的类型

```js
var isType = function(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
};

var isString = isType('String');
var isNumber = isType('Number');
var isArray = isType('Array');

console.log(isArray([1,2,3]));
// true
```

singleton(单例模式)

```js
var getSingle = function(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments));
    };
};
```

3.高阶函数实现AOP

AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能模块抽离处理，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。这样做的好处是能够保持业务逻辑模块的纯净和高内聚，其次可以很方便的复用日志统计等功能模块。

通常，在JavaScript中实现AOP，都是指把一个函数“动态织入”到另一个函数之中。具体的实现技术有很多。

```js
Function.prototype.before = function(beforeFn) {
    var _self = this; // 保存原函数的引用
    return function() { // 返回包含了原函数和新函数的代理函数
        beforeFn.apply(this, arguments); // 执行新函数，修正 this
        return _self.apply(this, arguments); // 执行原函数
    };
};

Function.prototype.after = function(afterFn) {
    var _self = this;
    return function() {
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    };
};

var func = function() {
    console.log(2);
};

func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});

func();
// 1 2 3
```

４.高阶函数的其他应用

1.curring

`curring`又称部分求值。一个curring函数会接受一些参数，接受参数后并不会立即求值，而是继续返回一个函数，刚才传入的参数在函数形成的闭包中被保存了起来。等到函数需要真正求值的时候，之前传入的参数都会被一次性用于求值。

2.uncurring

```js
Function.prototype.uncurring = function() {
	var self = this;
	return function() {
		var obj = Array.prototype.shift.call(arguments);
		return self.apply(obj, arguments);
	};
}
```

3.函数节流

**函数被频繁调用的场景**

+	window.onsize事件。
+	mousemove事件
+	上传进度

**函数节流原理**

在一段时间内可以忽略掉一些事件请求，因此可以借助setTimeout来完成事情。

**函数节流的代码实现**

```js
var throttle = function(fn, interval) {
	var _self = fn, // 保存需要被延迟执行的函数引用
		timer, // 定时器
		firstTime = true; // 是否是第一次调用
	return function() {
		var args = arguments,
			_this = this;
		if (firstTime) { // 如果是第一次调用，不需要延迟执行
			_self.apply(_this, args);
			return firstTime = false;
		}
		if (timer) { // 如果定时器还在，说明上一次还没有执行完
			return false;
		}
		timer = setTimeout(function() {
			clearTimeout(timer);
			timer = null;
			_self.apply(_this, args);
		}, interval || 500);
	};
};

window.onresize = throttle(function() {
	console.log(1);
}, 500);
```

4.分时函数

```js
var timechunk = function(arr, fn, count) {
	var obj,
		t;
	var len = arr.length;
	var start = function() {
		for (var i = 0; i < Math.min(count ||1, len); i++) {
			var obj = arr.shift();
			fn(obj);
		}
	};

	return function() {
		t = setInterval(function() {
			if (arr.length === 0) {
				return clearInterval();
			}
			start();
		}, 200); // 分批执行间隔，可以用参数的形式传入
	};
}
```
