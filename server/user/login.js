/**
 * Created by mac on 2018/1/9.
 */
var mysql      = require('mysql');
var db = require('./../config/db');

var  sql = 'select count(*) from cpj.user where email=? and password=? LIMIT 1';

exports.verifyLogin = function (app) {
    app.post('/verifyLogin',function (req, res, next) {
        console.log(req.body.userdata)
        var session = req.session;
        db.query(sql,req.body.userdata,function (err,result) {
            if (err) {
                console.log(err);
                res.render('无')
            }
            console.log(result)
            if (result[0]['count(*)']>0) {
                session.email = req.body.userdata[0];
                res.json({flag:true,message:'登录成功',email:session.email})
            } else {
                res.json({flag:false,message:'密码错误'})
            }
        })
    })
}
exports.getSessionEmail = function (app) {
    app.post('/getSessionEmail',function (req,res) {
        var email = req.session.email;
        console.log(email)
        res.json(email)
    })
}

exports.removeSessionEmail = function (app) {
    app.post('/removeSessionEmail',function (req,res) {
        delete req.session.email
        res.json('删除成功')
    })
}