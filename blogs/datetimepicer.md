## [datetimepicker](https://github.com/Eonasdan/bootstrap-datetimepicker)插件使用

**具体使用**

对应的`<input type="date">`需要修改为`<input type="text">`

在页面头部添加依赖(已在require.config.js中配置好)

```js
require(['datetimepicker'], function(datetimepicker) {
    // 在DOM元素插入页面之后初始化插件，一般在Vue的ready中添加即可
    Vue.extend({
        ready: function() {
            /** 初始化日期选择控件
                element: (String) 实例的id名
                format: (String) 日期的格式化格式。默认'YYYY-MM-DD HH:mm:ss'，可不填
            */
            datetimepicker.format('element', 'format');
        }    
    })
})
```

>日期的格式化格式，具体格式可参见[moment.js](http://momentjs.com/docs/#/displaying/)

目前已经在`order-list.js`中配置好，可参考。

**相关链接**

+   [datetimepicker](http://eonasdan.github.io/bootstrap-datetimepicker/Options/)
+   [moment.js](http://momentjs.com/docs/#/displaying/)


**require配置**

```js
define(['jquery', 'bootstrap', 'datetimePicker', 'moment'], 
    function($, bootstrap, datetimePicker, moment) {
    return {
        format: function(el, format) {
            format = format || 'YYYY-MM-DD HH:mm:ss';
            $(el).datetimepicker({
                    locale: moment.locale('zh-cn', {
                        months: '01_02_03_04_05_06_07_08_09_10_11_12'.split('_'),
                        monthsShort: '01_02_03_04_05_06_07_08_09_10_11_12'.split('_'),
                        weekdays : '日_一_二_三_四_五_六'.split('_'),
                        weekdaysShort : '日_一_二_三_四_五_六'.split('_'),
                        weekdaysMin : '日_一_二_三_四_五_六'.split('_')
                    }),
                    format: format, // 具体格式可参见[moment.js](http://momentjs.com/docs/#/displaying/)
                    minDate: '2000-01-01 00:00:00',
                    icons: {
                        time: 'glyphicon glyphicon-time fa-seller',
                        date: 'glyphicon glyphicon-calendar fa-seller',
                        up: 'glyphicon glyphicon-chevron-up fa-seller',
                        down: 'glyphicon glyphicon-chevron-down fa-seller',
                        previous: 'glyphicon glyphicon-chevron-left fa-seller',
                        next: 'glyphicon glyphicon-chevron-right fa-seller',
                        today: 'glyphicon glyphicon-screenshot fa-seller',
                        clear: 'glyphicon glyphicon-trash fa-seller',
                        close: 'glyphicon glyphicon-remove fa-seller'
                    },
                    tooltips: {
                        today: '今天',
                        clear: '清除',
                        close: '关闭',
                        selectMonth: '选择月份',
                        selectTime: '选择今天',
                        prevMonth: '上个月',
                        nextMonth: '下个月',
                        selectYear: '选择年份',
                        prevYear: '上一年',
                        nextYear: '下一年',
                        selectDecade: '选择10年',
                        prevDecade: '前十年',
                        nextDecade: '下十年',
                        prevCentury: '上世纪',
                        nextCentury: '下世纪'
                    },
                    focusOnShow: true,
                    showClear: true,
                    showTodayButton: true
                });
        }
    }
});

```
