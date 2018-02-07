/**
 * Created by mac on 2018/1/24.
 */
var mysql      = require('mysql');
var db = require('./../config/db');
// var  sql = 'select count(*) from cpj.contentData where headerline=? and content=? and classify=? LIMIT 1';
var sql = 'select count(*) from cpj.reply where replyer=? and content=? and uid=? LIMIT 1';
var replySql = 'INSERT INTO cpj.reply(replyer,content,time,uid) VALUES(?,?,sysdate(),?)';
exports.reply = function (app) {
    app.post('/reply',function (req,res) {
        var replyDataArr = [
            req.body.replyData.replyer,
            req.body.replyData.content,
            req.body.replyData.uid
        ]
        db.query(sql,replyDataArr,function (error,result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            if (result[0]['count(*)']>0) {
                res.json({flag:false,message:'重复提交'})
                return
            } else {
                db.query(replySql,replyDataArr,function (error, result) {
                    if (error) {
                        console.log(error);
                        res.render('无')
                    }
                    console.log(result)
                    res.json({flag:true,status:1,message:'提交成功'})
                })
            }
        })
    })
}

// var classifySql = 'select * from cpj.contentData where instr(classify,?)>0 order by create_time desc'
var fetchSql = 'select * from cpj.reply where instr(uid,?)>0 order by time'
exports.fetchReply = function (app) {
    app.post('/fetchReply',function (req,res) {
        db.query(fetchSql,req.body.uid,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            res.json(result)
        })
    })
}

var fetchReplySql = 'select headerline from cpj.contentData where uid in (select distinct uid from cpj.reply where instr(replyer,?)>0) limit 10'
exports.fetchMyReply = function (app) {
    app.post('/fetchMyReply',function (req, res) {
        let replyer = req.body.email
        db.query(fetchReplySql,replyer,function(error, result){
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            res.json(result)
        })
    })
}
