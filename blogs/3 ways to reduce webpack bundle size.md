## [3 ways to reduce webpack bundle size](http://blog.jakoblind.no/2017/05/18/3-ways-to-reduce-webpack-bundle-size/)

在你的Webpack配置中，性能是主要的关注点吗？你还在担心打包后的文件太大了吗？那么这篇文章专门为你准备的！

通过这三个步骤来快速了解如何优化打包后的文件大小。我根据上手的难易程度对它们进行了排序，方便你轻易的上手，然后根据你的需要来选择一种方式。

### 简单：在生产模式下运行`webpack`

确保你在生产环境下运行`webpack`，你只需要在运行`webpack`的时候加上`-p`标志，如下：

>webpack -p

这个小标志做了两件事情来优化打包文件的大小：

1.使用[UglifyJs](http://lisperator.net/uglifyjs/)对代码进行压缩。它删除不必要的空格，空白行，不会执行的代码等等
2.设置`NODE_ENV`的值未`production`。它会告诉一些模块，比如[React](https://facebook.github.io/react/docs/optimizing-performance.html#webpack)，不包含调试代码。

### 中等：使用分析工具

有很多好的工具可以分析打包文件，这里推荐两个我用过的最好的工具：

+	[https://github.com/th0r/webpack-bundle-analyzer](https://github.com/th0r/webpack-bundle-analyzer)
+	[https://github.com/danvk/source-map-explorer](https://github.com/danvk/source-map-explorer)

它们的工作方式有所不同，但输出结果是一样的：为打包文件中包含的所有模块提供很好的可视化展示。从`source-map-explorer`得到的输出如下所示：

![source-map-explorer](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif)

这种可视化展示让你可以非常好的观察你打包文件中所包含的模块。你还可以对比组件的大小和依赖关系。

如何分析输出的结果：

+	是否有一些依赖比你想象的大？是否可以用一个简洁或者更加转义的模块来替换它，或者自己来重写它？
+	你是否在打包文件中使用了包含所有时区的[moment.js](https://momentjs.com/)，但是却只用到了其中的一个或者两个？[如何修复看这里](https://twitter.com/karljakoblind/status/836913323602030594)
+	你是否在用[lodash]()？如果用了，那么可以考虑使用[lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin)和(或者)[babel-plugin-lodash](https://www.npmjs.com/package/babel-plugin-lodash)
+	代码分割会不会更好？这样每个组件和依赖就不用在每个页面都去加载。

然后继续往下看

### 困难：使用代码分割

代码分割意味着把你的打包文件拆分成交较小的文件。

现在你可能问自己“为什么有人会这么做？这对移动端来说不是很糟糕吗？”。的确，你希望减少新的HTTP请求的数量，以提高移动设备的性能。但是，使用代码分割的优势是可以使用更多的浏览器缓存并拥有更多的专属的打包文件。

#### 将公共库拆分打包

在项目中的依赖库一般不会经常更换。通过代码分割，可以把项目依赖的库打包成单独的文件。这个文件可以在浏览器设置更久的缓存时间。

[这里](https://webpack.js.org/guides/code-splitting-libraries/)提供一份不错的实现指南。我的这篇文章[如何处理打包文件](http://blog.jakoblind.no/2017/02/23/webpack-code-splitting-libraries-what-to-do-with-the-files/)也许对你有帮助。

#### CSS代码拆分

你是否在JavaScript中使用了CSS？
那么，你可以将CSS提取到单独的JavaScript包或CSS文件中。
这样做的优点和单独打包公共库一样：浏览器可以缓存较长时间。

如果你有兴趣了解更多信息，请参阅本[指南](https://webpack.js.org/guides/code-splitting-async/)。

#### 总结

有很多种方式都可以来优化打包文件的大小。有一些比较简单，还有一些比较复杂的。

绝对值得研究更多简洁的方式来优化webpack。在这篇文章中，除了花费30分钟的时间来处理前两个问题，你还可以学到更多。
