# Node.js实战

## 第六章 网络爬虫与数据操作

相关js包：

+   request: HTTP请求模块
+   cheerio: jQuery core的子集，实现了jQuery core中浏览器无关的DOM操作API
+   mysql: mysql操作模块
+   async: 简化异步流程控制
+   debug: 显示调试信息
+   pm2: 功能强大的进程管理器

**处理uncaughtException事件**

大多数情况下，异步I/O操作(如读写本地文件，网络连接等)所发生的的错误是无法被try{}catch{}捕捉到的。
如果抛出的异常并没有被捕捉到，将会导致Node.js进程直接退出。因此，我们可以添加`uncaughtException`事件的处理程序来避免进程异常退出。

```js
process.on('uncaughtException', function(err) {
    console.log('uncaughtException: %s', err.stack);
});
```

关于`uncaughtException`事件的详细说明，请参考Node.js的[API](http://nodejs.cn/api/process.html#process_event_uncaughtexception)的文档



