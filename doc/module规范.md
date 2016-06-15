## JS模块化规范

+   node依赖CommonJS Modules/1.0 规范。
+   AMD(异步模块定义)，主要为前端的模块化制定规范。[Require.js](http://www.requirejs.cn/)
+   CMD(sea.js)，CMD规范，与AMD蛮相近的。[Sea.js](http://seajs.org/docs/)
+   Meteor, Package 管理系统


```js
(function (factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    }
    else if (typeof Package !== "undefined") {
        moduleName = factory();  // export for Meteor.js
    }
    else {
        /* jshint sub:true */
        this["moduleName"] = factory();
    }
})(function() {
    // module code here    
});
```
