/**
 * Created by mac on 2017/12/23.
 */

var express = require('express');
var app = express();
var db = require('./config/db');

var  addSql = 'INSERT INTO cpj.questionList(id,caption,content,date) VALUES(0,?,?,sysdate())';
var  addSqlParams = ['js', 'js的内容博大精深'];
var  sql = 'SELECT * FROM cpj.questionList';

app.post('/questionList', function (req, res, next) {
    db.query(addSql, addSqlParams, function (error, result) {
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

var server = app.listen(3333,function () {
    var host = server.address().address
    var port = server.address().port

    console.log("http://", host, port)
})


