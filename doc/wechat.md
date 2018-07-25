## [wechat-js-sdk](https://mp.weixin.qq.com/)

+   [vux-demo](https://vux.li/demos/v2/?x-page=v2-doc-home#/component/toast)
+   [VUX文档](https://vux.li/#/zh-CN/components?id=tabbar)
+   [wechat-demo](http://203.195.235.76/jssdk/#menu-pay)
+   [接口文档](http://doc.padmom.com/) app
+   [原型地址](http://ifqbn1.axshare.com/#g=1&p=认证)
+   [公众号](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1)
+   [微信内H5调起支付](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7)

## 微信授权

- [授权](https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc23de76aa052b996&redirect_uri=http%3A%2F%2Fhooli.padmom.com%2Fredirect&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect)
- [重定向页面](http://hooli.padmom.com/#/login?code=08183V7J05F1Dj2lH86J0HOK7J083V7T&state=STATE#/)
- [online-demo](http://203.195.235.76/jssdk/)
- [access_token](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183)
- [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug/)


## 微信配置&支付

```js
// 使用vux
that.$wechat.config({
	debug: true,
	appId: 'wxc23de76aa052b996',
	timestamp: resToken.timestamp,
	nonceStr: resToken.noncestr,
	signature: resToken.signature,
	jsApiList: [
		'checkJsApi',
		'chooseWXPay'
	]
})

// 调用支付
that.$wechat.ready(() => {
	that.$wechat.chooseWXPay({
		timestamp: res.timeStamp,
		nonceStr: res.nonceStr,
		package: res.package,
		signType: res.signType,
		paySign: res.paySign,
		success: res => {
			if(res.err_msg == 'chooseWXPay:ok' ) {
				that.is_certification = 1
				localStorage.isAuthed = 1
			}
			if(res.err_msg == 'chooseWXPay:cancel' ) {
				// 用户取消支付
			}
		}
	})
})
```


## 获取微信授权url

```js
function getURL(data) {
	let base = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
	let CONFIG = {
		appid: '',
		redirect_uri: '',
		response_type: 'code',
		scope: '',
		state: ''
	}
	data = Object.assign({}, CONFIG, data)
	for (let key in data) {
		base += `${key}=${data[key]}&`
	}
	return base.slice(0, -1) + '#wechat_redirect'
}

getURL({
	appid: 'wx0d84a5fb2b85a178',
	redirect_uri: encodeURIComponent('http://127.0.0.1/#/'),
	response_type: 'code',
	scope: 'snsapi_userinfo',
	state: '123'
})

// https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0d84a5fb2b85a178&redirect_uri=http%3A%2F%2F127.0.0.1%2F%23%2F&response_type=code&scope=snsapi_userinfo&state=123&uin=MjE5MjEzNjQxNA%3D%3D&key=404ed2e603d9fa6e074c9c69d547223f395dec40945aad69f2f6e1874daaf78dcdf952a77c9a800e5068917d4b7f3fef&pass_ticket=QLtl4+AY/QdStFDGYO7wPoMY425LkKIsHIIakyX1ExP/EVYDC1weK7JmS13W2MvyV5DvkzY3EKxdwoF9z+Trnw==
```

## 微信内分享其他页面的链接

+ 需要用当前页面的 url 来获取签名 `encodeURIComponent(location.href.split('#')[0])`
+ 分享的链接自定义，[该链接域名或路径必须与当前页面对应的公众号JS安全域名一致](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
