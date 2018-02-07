/**
 * Created by mac on 2018/1/29.
 */
var mysql      = require('mysql');
var db = require('./../config/db');

var selectSql = 'select count(*) from cpj.follow where email=? and uid=?'
var insertSql = 'INSERT INTO cpj.follow(email,uid,time,headerline) VALUE(?,?,sysdate(),?)'
exports.addFollow = function (app) {
    app.post('/addFollow',function (req, res) {
        if (!req.body.followData[0]||!req.body.followData[1]) {
            res.json({flag:false,message:'字段缺省'})
            return
        }
        db.query(selectSql,req.body.followData,function (error,result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            if (result[0]['count(*)']>0) {
                res.json({flag:false,message:'重复提交'})
            } else {
                db.query(insertSql,req.body.followData,function (error,result) {
                    if (error) {
                        console.log(error);
                        res.render('无')
                    }
                    res.json({flag:true,status:1,message:'提交成功'})
                })
            }
        })
    })
}

exports.getFollow = function (app) {
    app.post('/getFollow',function (req, res) {
        db.query(selectSql,req.body.followData,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            if (result[0]['count(*)']>0) {
                res.json({flag:true,message:'已关注'})
            } else {
                res.json({flag:false,message:'未关注'})
            }
        })
    })
}


var selectListSql = 'select * from cpj.follow where email=?'
exports.getFollowList = function (app) {
    app.post('/getFollowList',function (req, res) {
        db.query(selectListSql,req.body.email,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            res.json({flag:true,message:'请求成功',data:result})
        })
    })
}