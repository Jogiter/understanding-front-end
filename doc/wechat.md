## 阅读链接

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


## 微信支付

```js
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
