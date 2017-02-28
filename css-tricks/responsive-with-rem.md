### links

+   [Responsive typography with REMs](http://blog.bugsnag.com/responsive-typography-with-rems)
+   [Font Size Idea: px at the Root, rem for Components, em for Text Elements](https://css-tricks.com/rems-ems/)
+   [ems-media-queries](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/)

+   [handle font-size with js](../js-tips/Rem-responsive.js)
+   [可伸缩布局方案](https://github.com/amfe/lib-flexible)
+   [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)
+   [A JavaScript polyfill for Flexbox](https://github.com/jonathantneal/flexibility)
+   [Grid based on CSS3 flexbox](https://github.com/kristoferjoseph/flexboxgrid)



+   [developer.apple.com#iPhoneURLScheme_Reference](https://developer.apple.com/library/ios/featuredarticles/iPhoneURLScheme_Reference/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007899-CH1-SW1_)
+   [URL Schemes](http://handleopenurl.com/scheme)
+   [wiki#IPhone_URL_Schemes](http://wiki.akosma.com/IPhone_URL_Schemes)
+   [URL schemes, 通过超链接打开App应用](http://ju.outofmemory.cn/entry/48506)


## 设置不同大小屏幕的font-size，使用rem布局

```css
/*home page*/
html,body{font-size:20px;}

/* for 1080 px width screen */
@media only screen and (max-device-width:1080px),only screen and (max-width:1080px){
html,body{font-size:20px;}
}
/* for 960 px width screen */
@media only screen and (max-device-width:960px),only screen and (max-width:960px){
html,body{font-size:40px;}
}
/* for 800 px width screen */
@media only screen and (max-device-width:800px),only screen and (max-width:800px){
html,body{font-size:33.34px;}
}
/* for 720 px width screen */
@media only screen and (max-device-width:720px),only screen and (max-width:720px){
html,body{font-size:30px;}
}
/* for 640 px width screen */
@media only screen and (max-device-width:640px),only screen and (max-width:640px){
html,body{font-size:26.67px;}
}
/* for 540 px width screen */
@media only screen and (max-device-width:540px),only screen and (max-width:540px){
html,body{font-size:22.5px;}
}
/* for 480 px width screen */
@media only screen and (max-device-width:480px),only screen and (max-width:480px){
html,body{font-size:20px;}
}
/* for 400 px width screen */
@media only screen and (max-width:400px),only screen and (max-device-width:400px){
html,body{font-size:16.67px;}
}
/* for 360 px width screen */
@media only screen and (max-width:360px),only screen and (max-device-width:360px){
html,body{font-size:15px;}
}
/* for 320 px width screen */
@media only screen and (max-width:320px),only screen and (max-device-width:320px){
html,body{font-size:13.33px;}
}
```

## 通过css的方法属性，缩放页面

如下，页面布局的基准是`320px`

```css
@media only screen and (min-width: 1024px){
    .wrap{zoom:3.2;}
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
    .wrap{zoom:2.4;}
}
@media only screen and (min-width: 640px) and (max-width: 767px) {
    .wrap{zoom:2;}
}
@media only screen and (min-width: 540px) and (max-width: 639px) {
    .wrap{zoom:1.68;}
}
@media only screen and (min-width: 480px) and (max-width: 539px) {
    .wrap{zoom:1.5;}
}
@media only screen and (min-width: 414px) and (max-width: 479px) {
    .wrap{zoom:1.29;}
}
@media only screen and (min-width: 400px) and (max-width: 413px) {
    .wrap{zoom:1.25;}
}
@media only screen and (min-width: 393px) and (max-width: 399px) {
    .wrap{zoom:1.228;}
}
@media only screen and (min-width: 384px) and (max-width: 392px) {
    .wrap{zoom:1.2;}
}
@media only screen and (min-width: 375px) and (max-width: 383px) {
    .wrap{zoom:1.17;}
}
@media only screen and (min-width: 360px) and (max-width:374px) {
    .wrap{zoom:1.125;}
}
```


