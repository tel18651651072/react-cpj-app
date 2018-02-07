/**
 * Created by mac on 2018/1/15.
 */
var mysql      = require('mysql');
var db = require('./../config/db');
var uuid = require('node-uuid');
var getIp = require('./../config/getIp')

var  sql = 'select count(*) from cpj.contentData where headerline=? and content=? and classify=? LIMIT 1';
var  addSql = 'INSERT INTO cpj.contentData(headerline,content,classify,author,create_time,uid,skimnum) VALUES(?,?,?,?,sysdate(),?,0)';
exports.submitContent = function (app) {
    app.post('/submitContent',function (req,res) {
        var uid = uuid.v1().substring(0,8)
        console.log(uid)
        var contentDataArr = [
            req.body.contentData.headerline,
            req.body.contentData.content,
            req.body.contentData.classify.toString()
        ];
        db.query(sql,contentDataArr,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            if (result[0]['count(*)']>0) {
                res.json({flag:false,message:'重复提交'})
                return
            } else {
                contentDataArr.push(req.session.email);
                contentDataArr.push(uid)
                db.query(addSql,contentDataArr,function (error, result){
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

var classifySql = 'select * from cpj.contentData where instr(classify,?)>0 order by create_time desc'
exports.fetchContent = function (app) {
    app.post('/fetchContent',function (req,res) {
        db.query(classifySql,req.body.classify,function (error,result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            res.json(result)
        })
    })
}

var mixupSql = 'select * from cpj.contentData where instr(headerline,?)>0'
exports.searchResult = function (app) {
    app.post('/searchResult',function (req, res) {
        // var mixupSql = `select * from cpj.contentData where headerline like '%${req.body.searchData}%'`
        db.query(mixupSql,req.body.searchData,function (error,result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            console.log(result)
            res.json(result)
        })
    })
}

var uidSql = 'select * from cpj.contentData where instr(uid,?)>0'
exports.fetchDetail = function (app) {
    app.post('/fetchDetail', function (req, res) {
        console.log('ip:')
        console.log(getIp.getIpcode(req))
        db.query(uidSql,req.body.uidcode,function (error,result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            res.json(result)
        })
    })
}

var authorSql = 'select * from cpj.contentData where instr(author,?)>0'
exports.fetchMyContent = function (app) {
    app.post('/fetchMyContent',function (req, res) {
        let author = req.body.email
        db.query(authorSql,author,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            res.json(result)
        })
    })
}

// 修改和编辑接口
var updateContentSql = 'update cpj.contentData set headerline=？and classify=? and content=? where email=? and uid=?'
exports.updateContent = function (app) {
    app.post('/updateContent',function (req, res) {
        db.query(updateContentSql,req.body.contentInfo,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            res.json(result)
        })
    })
}