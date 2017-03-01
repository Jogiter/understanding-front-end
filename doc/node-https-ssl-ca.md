## [Node.js HTTPS – SSL Certificate](http://www.hacksparrow.com/node-js-https-ssl-certificate.html)

1.如何建立一个Node.js HTTPS服务器

如果你的项目中需要使用到HTTPS？或者只是想知道在Node.js中创建一个HTTPS服务器到底难不难。在这篇文章中，我将向你展示如何在您的本地系统建立一个HTTPS Node.js服务器。

首先，我们需要创建一个服务器的SSL证书。推荐的方法是从[证书颁发机构](http://en.wikipedia.org/wiki/Certificate_authority)来签署你的证书，但出于测试的目的，我们可以自己来签署它。

```js
$ openssl genrsa -out hacksparrow-key.pem 1024 
$ openssl req -new -key hacksparrow-key.pem -out certrequest.csr
... bunch of prompts
$ openssl x509 -req -in certrequest.csr -signkey hacksparrow-key.pem -out hacksparrow-cert.pem
```

**注意**：在第二个命令中，当提示`Common Name（例如，你的名字）`时，“不要填写你的名字。它实际上是域名字段，所以输入您的域名。不填写你的域名将导致“域名不匹配”错误。

有了SSL证书。就可以在线上服务器上使用，但是浏览器会向用户发出一个警告，提示用户证书是“不安全的”。如果你对自己的信誉很注重，最好不要使用自签名的证书。

现在我们获取到了签名的SSL证书，我们就可以搭建我们的HTTPS服务器。

```js
var https = require('https');
var fs = require('fs');

var hskey = fs.readFileSync('hacksparrow-key.pem');
var hscert = fs.readFileSync('hacksparrow-cert.pem')

var options = {
    key: hskey,
    cert: hscert
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Hi from HTTPS");
}).listen(8000);
```

建立一个HTTPS Node.js服务器很容易的。如果你使用的是[express.js](http://www.expressjs.com.cn/)Web框架，下面可以建立一个HTTPS Express服务器：

```js
var fs = require('fs');
var https = require('https');
var express = require('express');

var app = express();

var CONFIG = {
    port: 8888,
    host: 'localhost'
};

var hskey = fs.readFileSync('hacksparrow-key.pem');
var hscert = fs.readFileSync('hacksparrow-cert.pem')

var options = {
    key: hskey,
    cert: hscert
};
var server = https.createServer(options, app)
    .listen(CONFIG.port, CONFIG.host, function() {
        console.log('server listen at %s:%d', CONFIG.host, CONFIG.port);
    });
```

真的非常简单。

如果你是一个企业用户，我们强烈建议你从一个著名的证书管理机构来获取你的SSL证书。祝你祝你的项目/实验好运。
