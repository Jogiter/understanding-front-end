###XSS

[http://heideri.ch/jso/]()

[http://fex.baidu.com/blog/2014/06/xss-frontend-firewall-1/]()

[https://en.wikipedia.org/wiki/Cross-site_scripting]()


###国内cdn
[百度CDN](http://openapi.baidu.com/wiki/index.php?title=docs/cplat/libs#jQuery)
[新浪CDN](http://lib.sinaapp.com/?path=angular.js)

### 前端面试题
[csdn前端面试题]()
http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html

### TODOS

+   Sass
+   nodejs
+   前端seo
+   虚拟机


1.搭建虚拟机
2.搭建自己的gitLab服务器
3.安装git node环境 ngix


前端优化：

1.dns-prefetch
2.srcset  仅webkit支持
3.webp格式(svg/webGL等H5新特性)
4.postcss对css进行处理（庞大的插件库）

视频、音频资源访问权限控制(防盗链)


## 开发模式(模块化+新语法)
webpack打包(代码兼容ie8，打包的也会兼容ie8)+es6语法(.babelrc配置)

优势：利于模块化开发，es6语法更简洁
不足：学习成本 【webpack && es6】

-- vue不兼容ie8，考虑做兼容处理？？实现难度，vue的底层实现Object.defineProperty仅支持到ie9以上的现代浏览器，兼容则需要实现该api的shim