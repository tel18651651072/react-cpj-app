/**
 * Created by mac on 2017/12/23.
 */

var express = require('express');
var app = express();

var db = require('./config/db');

var  sql = 'SELECT * FROM cpj.questionList';

app.get('/questionList', function (req, res, next) {
    db.query(sql, function (error, result) {
        if (error) {
            console.log('[SELECT ERROR] - ',error);
            res.render('无')
        }
        console.log(result)
        // res.send('hello world');
        res.json({data:result})
    });
})

var server = app.listen(3333,function () {
    var host = server.address().address
    var port = server.address().port

    console.log("http://", host, port)
})