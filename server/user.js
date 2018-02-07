/**
 * Created by mac on 2017/12/23.
 */

var express = require('express');
var app = express();
var db = require('./config/db');
var allowCrossDomain = require('./config/allowCrossDomain');

var  addUser = 'INSERT INTO cpj.user(username,email,password,create_time) VALUES(?,?,?,sysdate())';
var  addUserParams = ['chenxm', '222@qq.com','123456'];
var  sql = 'SELECT * FROM cpj.user';

app.use(allowCrossDomain.allowCrossDomain)
//  POST 请求
app.post('/user', function (req, res) {
    console.log(req.body)
    db.query(addUser, addUserParams, function (error, result) {
        if (error) {
            console.log('[SELECT ERROR] - ',error);
            res.render('无')
        }
        console.log(result)
    });

    db.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.render('无')
        }
        res.json({data:result})
    })
})

var server = app.listen(8083, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
