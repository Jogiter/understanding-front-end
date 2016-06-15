## 阅读链接：

+   [es6](http://es6.ruanyifeng.com/#docs/object)
+   [javascript标准参考教程](http://javascript.ruanyifeng.com/)



## [Object](http://es6.ruanyifeng.com/#docs/object)

1.`Object.defineProperty(obj, prop, descriptor)`，参见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
2.`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。
3.ES5有三个操作会忽略`enumerable`为`false`的属性。

    -   for...in循环：只遍历对象自身的和继承的可枚举的属性
    -   Object.keys()：返回对象自身的所有可枚举的属性的键名
    -   JSON.stringify()：只串行化对象自身的可枚举的属性