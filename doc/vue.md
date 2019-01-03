# Vue学习+实践


## 参考链接

+ [Vue cli3](https://cli.vuejs.org/zh/config)
+ [vue](https://cn.vuejs.org/v2/guide/)
+ [vuex](https://vuex.vuejs.org/zh/guide/)
+ [vue-router](https://router.vuejs.org/zh/)
+ [Object.defineProperty 实现视图和数据的联动](https://jsfiddle.net/sckcnh4s/4/)，参考链接[http://www.cnblogs.com/oceanxing/p/3938443.html](http://www.cnblogs.com/oceanxing/p/3938443.html)

## FAQ

1. Axios doesn't send cookies with POST and data ？

参考 [#876](https://github.com/axios/axios/issues/876)


```js
let data = {
  key: 'value'
}
let formdata = new FormData()
formdata.append('updateinfo', JSON.stringify(data))

Vue.axios.post(url, formdata).then(({ data }) => {
  // do something with data
})
```

2. 为什么要在请求上添加 `url?timestamp=${new Date().getTime()}`

fix：添加时间戳，解决客户端会缓存请求的 bug

3. vue [深拷贝的原始数据对象](https://cn.vuejs.org/v2/api/#data)

使用 `JSON.parse(JSON.stringify(Object))`



