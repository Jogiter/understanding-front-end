## gulp安装及构建前端开发一体化

**全局安装Gulp**
`npm install gulp -g #全局安装`

**局部安装Gulp**
`npm install gulp --save-dev #局部安装`

### 选择gulp组件

前端项目需要的功能：
1、 图片（压缩图片支持jpg、png、gif）
2、 样式 （支持sass 同时支持合并、压缩、重命名）
3、 javascript （检查、合并、压缩、重命名）
4、 html （压缩）
5、 客户端同步刷新显示修改
6、 构建项目前清除发布环境下的文件（保持发布环境的清洁）

通过[gulp plugins](http://gulpjs.com/plugins/)，寻找对于的gulp组件

+   [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin): 压缩图片
+   [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass): 支持sass
+   [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css): 压缩css
+   [gulp-jshint](https://github.com/wearefractal/gulp-jshint): 检查js
+   [gulp-uglify](https://github.com/terinjokes/gulp-uglify): 压缩js
+   [gulp-concat](https://github.com/wearefractal/gulp-concat): 合并文件
+   [gulp-rename](https://github.com/hparra/gulp-rename): 重命名文件
+   [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin): 压缩html
+   [gulp-clean](https://github.com/peter-vilja/gulp-clean): 清空文件夹
+   [gulp-livereload](https://github.com/vohof/gulp-livereload): 服务器控制客户端同步刷新（需配合chrome插件[LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)及[tiny-lr](https://github.com/mklabs/tiny-lr)）
+   [gulp-rev](https://www.npmjs.com/package/gulp-rev/) 静态资源版本控制
+   [gulp-rev-replace](https://github.com/jamesknelson/gulp-rev-replace) 替换html文件中的静态资源路径

### 安装Gulp组件

安装组件项目目录，通过cd project 进入目录，执行下边的npm安装组件。

```
npm install gulp-util gulp-imagemin gulp-ruby-sass gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean gulp-livereload tiny-lr --save-dev
```

项目目录结构

```js
project(项目名称)
|–.git 通过git管理项目会生成这个文件夹
|–node_modules 组件目录
|–dist 发布环境
    |–css 样式文件(style.css style.min.css)
    |–images 图片文件(压缩图片)
    |–js js文件(main.js main.min.js)
    |–index.html 静态文件(压缩html)
|–src 生产环境
    |–sass sass文件
    |–images 图片文件
    |–js js文件
    |–index.html 静态文件
|–.jshintrc jshint配置文件
|–gulpfile.js gulp任务文件
```

### gulp基础语法

gulp通过gulpfile文件来完成相关任务，因此项目中必须包含`gulpfile.js`

gulp有五个方法：src、dest、task、run、watch
src和dest：指定源文件和处理后文件的路径
watch：用来监听文件的变化
task：指定任务
run：执行任务

### 编写gulp任务

```js
/**
 * 初始化
 * npm install gulp-util gulp-imagemin gulp-sass gulp-minify-css gulp-uglify gulp-rename gulp-concat gulp-clean gulp-clean tiny-lr --save-dev
 */

// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    sass = require('gulp-ruby-sass'),          //sass
    minifycss = require('gulp-minify-css'),    //css压缩
    //jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'),          //合并文件
    clean = require('gulp-clean'),             //清空文件夹
    tinylr = require('tiny-lr'),               //livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload');   //livereload

// HTML处理
gulp.task('html', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './dist/';

    gulp.src(htmlSrc)
        .pipe(livereload(server))
        .pipe(gulp.dest(htmlDst))
});

// 样式处理
gulp.task('css', function () {
    var cssSrc = './src/scss/*.scss',
        cssDst = './dist/css';

    gulp.src(cssSrc)
        .pipe(sass({ style: 'expanded'}))
        .pipe(gulp.dest(cssDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(livereload(server))
        .pipe(gulp.dest(cssDst));
});

// 图片处理
gulp.task('images', function(){
    var imgSrc = './src/images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(livereload(server))
        .pipe(gulp.dest(imgDst));
})

// js处理
gulp.task('js', function () {
    var mainSrc = './src/js/main.js',
        mainDst = './dist/js/',
        appSrc = './src/js/vendor/*.js',
        appDst = './dist/js/vendor/';

    gulp.src(mainSrc)
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        //.pipe(concat('main.js'))
        //.pipe(gulp.dest(jsDst))
        //.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(mainDst))
        .pipe(livereload(server));

    gulp.src(appSrc)
        .pipe(uglify())
        //.pipe(concat("vendor.js"))
        .pipe(gulp.dest(appDst))
        .pipe(livereload(server));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/css', './dist/js/main.js','./dist/js/vendor', './dist/images'], {read: false})
        .pipe(clean());
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
    gulp.start('html','css','images','js');
});

// 监听任务 运行语句 gulp watch
gulp.task('watch',function(){

    server.listen(port, function(err){
        if (err) {
            return console.log(err);
        }

        // 监听html
        gulp.watch('./src/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/scss/*.scss', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/images/**/*', function(){
            gulp.run('images');
        });

        // 监听js
        gulp.watch(['./src/js/main.js','./src/js/vendor/*.js'], function(){
            gulp.run('js');
        });

    });
});
```


### LiveReload配置
1)  安装Chrome [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

2)  通过npm安装[http-server](https://www.npmjs.org/package/http-server) ，快速建立http服务

```
npm install http-server -g
```

3)  通过cd找到发布环境目录dist

4)  运行http-server，默认端口是8080

5)  访问路径localhost:8080

6)  再打开一个cmd，通过cd找到项目路径执行gulp，清空发布环境并初始化

7)  执行监控 gulp

8)  点击chrome上的LiveReload插件，空心变成实心即关联上，你可以修改css、js、html即时会显示到页面中。


视频教材youtube（需要翻墙）：[http://www.youtube.com/watch?v=OKVE6wE9CW4](http://www.youtube.com/watch?v=OKVE6wE9CW4)

-----
- [Gulp安装及配合组件构建前端开发一体化](http://www.dbpoo.com/getting-started-with-gulp/)
- [Gulp入门教程](https://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/)
- [gulp详细入门教程](http://www.ydcss.com/archives/18)
- [JavaScript参考标准](http://javascript.ruanyifeng.com/tool/sourcemap.html)
