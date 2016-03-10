### Controller使用过程中的注意点：

- 不要试图去复用Controller,一个控制器一般只控制一小块视图
- 不要在Controller中操作DOM，这不是控制器的职责  【速度低，使用指令directive来完成】
- 不要在Controller里面做数据格式化，ng有很好用的表单控件
- 不用再Controller里面做数据过滤，ng用$filter服务
- 一般来说，Controller是不会互相调用的，控制器之间的交互会通过事件来进行

[angularjs学习网站](https://angularjs.org/)
