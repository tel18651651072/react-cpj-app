/**
 * Created by mac on 2017/12/29.
 */

var express = require('express');
var app = express();

app.disable('x-powered-by')     // 禁用头信息

app.get('/headers',function (req, res) {
    // res.set('Content-Type','text/plain');
    // res.type('text/plain')
    res.status(200)
    var s = '';
    for (var name in req.headers) {
        s += name + ': '+ req.headers[name] + '\n';
        res.send(s);
        res.end()
    }
})

app.listen(8111,function () {
    console.log('服务启动')
})
