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