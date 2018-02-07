/**
 * Created by mac on 2017/12/22.
 */
var mysql      = require('mysql');
var db = require('./config/db');

var  addSql = 'INSERT INTO cpj.questionList(id,caption,content,date) VALUES(0,?,?,sysdate())';
var  addSqlParams = ['node', '你好how node express mysql'];

db.query(addSql,addSqlParams,function (err, result) {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log('INSERT ID:',result);
})
