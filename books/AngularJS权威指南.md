[AngularJS开发人员最常犯的10个错误](http://blog.jobbole.com/78946/)


## AngularJS 权威指南

### 第四章 作用域

在AngularJS应用的模板中使用多种标记，包括下面这些。

+   指令：将DOM元素增强为可复用的DOM组件的属性或元素
+   值绑定：模板语法{{ }}可以将表达式绑定到视图上
+   过滤器：可以在视图中使用的函数，用来进行格式化
+   表单控件：用来检验用户输入的控件

**作用域基本功能**

+   提供观察者已监视数据模型的变化
+   可以将数据模型的变化通知给整个应用，甚至是系统外的组件
+   可以进行嵌套，隔离业务功能和数据
+   给表达式提供运算时所需的执行环境

***$scope的生命周期*

*创建*

在创建控制器或指令时，AngularJS会用`$injector`创建一个新的作用域，并在这个新建的控制器或指令运行时将作用域传递进去。

*链接*

当AngularJS开始运行时，所有的`$scope`对象都会附加或者链接到视图中。所有创建`$scope`对象的函数也会将自身附加到视图中。这些作用域将会注册当AngularJS应用上下文中发生变化时需要运行的函数。

*更新*

当事件循环运行时，它通常执行在顶层`$scope`对象上(被称作`$rootScope`)，每个子作用域都执行自己的脏检查。每个监控函数都会检查变化。如果检测到任意变化，`$scope`对象就会触发指定的回调函数。

*销毁*

当一个`$scope`在视图中不再需要时，这个作用域将会清理和销毁自己。

尽管永远不会需要清理作用域(因为AngularJS会为你处理)，但是知道是谁创建了这个作用域还是有用的，因为你可以使用`$scope`上的`$desctory()`的方法来清理这个作用域。




### 控制器

>将控制器命名为[Name]Controller而不是[Name]Ctrl是一个最佳实践
>有一个例外：在指令内部创建的作用域被称作孤立作用域

*设计良好的应用会将复杂的逻辑放到指令和服务中，通过指令和服务，我们可以将控制器构建成一个轻量而且更易维护的形式*



### 表达式

尽管AngularJS会在运行`$digest`循环的过程中自动解析表达式，但有时手动解析表达式也是非常有用的。AngularJS通过`$parse`这个内部服务来进行表达式的运算，这个服务能够访问当前所处的作用域。这个过程允许我们访问定义在`$scope`上的原始JavaScript数据和函数。

`$interpolate`服务是一个可以接受三个参数的函数。其中第一个参数是必须的。

|参数名|类型|解释|
|:---:|:---:|:---|
|text|string|一个包含字符插值标记的字符串|
|mustHaveExpression|boolean|如果设为`true`,当传入的字符串中不含有表达式时，返回`null`|
|trustedContext|string|AngularJS会对已经进行过字符插值操作的字符串通过`$src.getTrusted()`方法进行严格的上下文转义。|


**Return**

`$interpolate`服务返回一个函数，用来在特定的上下文中运算表达式。









