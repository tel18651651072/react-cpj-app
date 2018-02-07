/**
 * Created by mac on 2018/1/6.
 */
var mysql      = require('mysql');
var db = require('./../config/db');

exports.register = function (app,Store) {
    app.post('/register',function (req, res){
        console.log(req.body)
        let token = req.body.token
        Store.get(token,function(error, session) {
            if(session) {
                console.log(1)
                console.log(session.email);
                res.json(session.email)
            }
            console.log(session);
        });
    })
}
var  sql = 'select count(*) from cpj.user where email=?';
var  addSql = 'INSERT INTO cpj.user(email,password,create_time) VALUES(?,?,sysdate())';
var addMyInfoSql = 'INSERT INTO cpj.personal(nickname,email,rank,illustration,personalUrl) VALUES(?,?,1,?,?)'
exports.submitUserData = function (app) {
    app.post('/submitUserData',function (req, res, next) {
        db.query(sql,req.body.userdata[0],function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            if (result[0]['count(*)']>0) {
                res.json({flag:false,message:'重复提交'})
                return
            } else {
                var  addSqlParams = req.body.userdata
                db.query(addSql,addSqlParams,function (error, result) {
                    if (error) {
                        console.log('[SELECT ERROR] - ',error);
                        res.render('无')
                    }
                    var defaultMyInfoData = ['',req.body.userdata.email,1,'','']
                    db.query(addMyInfoSql,defaultMyInfoData,function (error, result) {
                        if (error) {
                            console.log('[SELECT ERROR] - ',error);
                            res.render('无')
                        }

                    })
                    console.log(result)
                    res.json({flag:true,status:1,message:'提交成功'})
                });
            }
        })

    })
}

exports.verifyEmail = function (app) {
    app.post('/verifyEmail',function (req, res, next) {
        db.query(sql,req.body.email,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            if (result[0]['count(*)']>0) {
                res.json({flag:false,message:'邮箱信息重复'})
            } else {
                res.json({flag:true,message:'邮箱信息不存在'})
            }
        })
    })
}