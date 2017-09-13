## [wechat-js-sdk](https://mp.weixin.qq.com/)

## links

- [online-demo](http://203.195.235.76/jssdk/)
- [access_token](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183)
- [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug/)


appID: 'wx0d84a5fb2b85a178'
appsecret: '5ff5192415f9588048105d066dfe9ea0'

access_token: 'PwBU1SW1tnatSOnp06JWVz7yH2cVRa04pye0r3CpoCXrdT6C6ea6nQqrXHM3WCYoHcjczf8xcnXcrqbtJnrMTgQpRtleyn9ICbeBP34QAXdBEpjk7vtE0F6F7qEDcN9KQWRjACAGMH'


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


