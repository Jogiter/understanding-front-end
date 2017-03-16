## issues

+   [npm-throws-error-without-sudo](http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo)

window下某些node包安装失败，相关解决办法:

+   [https://github.com/nodejs/node-gyp#installation](https://github.com/nodejs/node-gyp#installation)
+   [npm 权限](https://docs.npmjs.com/getting-started/fixing-npm-permissions)


### 环境变量

环境变量不属于 Node.js 的知识范畴，只不过我们在开发 Node.js 应用时经常与环境变量打交道，所以这里简单介绍下。

环境变量（environment variables）一般是指在操作系统中用来指定操作系统运行环境的一些参数。在 Mac 和 Linux 的终端直接输入 env，会列出当前的环境变量，如：USER=xxx。简单来讲，环境变量就是传递参数给运行程序的。

在 Node.js 中，我们经常这么用:

>NODE_ENV=test node app

通过以上命令启动程序，指定当前环境变量 NODE_ENV 的值为 test，那么在 app.js 中可通过 process.env 来获取环境变量:

>console.log(process.env.NODE_ENV) //test

另一个常见的例子是使用 debug 模块时:

>DEBUG=* node app

Windows 用户需要首先设置环境变量，然后再执行程序：

```js
set DEBUG=*
set NODE_ENV=test
node app
```

或者使用 [cross-env](https://www.npmjs.com/package/cross-env)：

>npm i cross-env -g

使用方式：

>cross-env NODE_ENV=test node app




### [semver](http://semver.org/lang/zh-CN/)

语义化版本（semver）即 dependencies、devDependencies 和 peerDependencies 里的如：`"co"`: `"^4.6.0"`。

semver 格式：`主版本号`.`次版本号`.`修订号`。版本号递增规则如下：

+   主版本号：做了不兼容的 API 修改
+   次版本号：做了向下兼容的功能性新增
+   修订号：做了向下兼容的 bug 修正

更多阅读：

1.[http://semver.org/lang/zh-CN/](http://semver.org/lang/zh-CN/)
2.[http://taobaofed.org/blog/2016/08/04/instructions-of-semver/](http://taobaofed.org/blog/2016/08/04/instructions-of-semver/)

作为 Node.js 的开发者，我们在发布 npm 模块的时候一定要遵守语义化版本的命名规则，即：有 breaking change 发大版本，有新增的功能发小版本，有小的 bug 修复或优化则发修订版本。
