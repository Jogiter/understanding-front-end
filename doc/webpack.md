# webpack

## webpack兼容ie8问题

```js
plugins: [
    /** [uglify#1179](https://github.com/mishoo/UglifyJS2/pull/1179)
     * [Webpack构建兼容IE8](https://segmentfault.com/a/1190000007699918?winzoom=1)
     */
    new webpack.optimize.UglifyJsPlugin({
        compress: { screw_ie8: false },
        mangle: false,
        output: { screw_ie8: false },
    })
]
```

使用webpack打包后，代码没有兼容问题，uglifyjs压缩后才会不兼容ie8。因此在压缩时配置兼容ie8；

## [webpack-plugins](https://github.com/webpack/webpack/tree/master/examples)

+ [AggressiveMergingPlugin](https://github.com/webpack/webpack/tree/master/examples/aggressive-merging) -- 多个入口引用公共文件，可以优化版块
+ [CommonsChunkPlugin](https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk) -- 同一个入口打包，多次引用的依赖可以提取一起
+ [DefinePlugin](https://github.com/webpack/webpack/tree/master/examples/multi-compiler) -- 定义全局变量
+ [webpack-jarvis](https://github.com/zouhir/jarvis) -- 一个非常智能的基于浏览器的webpack仪表板

## tree-shaking

- [Tree Shaking](https://doc.webpack-china.org/guides/tree-shaking/)

为了学会使用 tree shaking，你必须……

+	使用 ES2015 模块语法（即 import 和 export）。
+	引入一个能够删除未引用代码(dead code)的压缩工具(minifier)（例如 UglifyJSPlugin）。
