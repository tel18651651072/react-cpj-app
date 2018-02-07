/**
 * Created by mac on 2018/1/31.
 */
var mysql      = require('mysql');
var db = require('./../config/db');
var fs = require("fs");

var Sql = 'select count(*) from cpj.user where instr(email,?)>0 limit 1';
var myInfoSql = 'select * from cpj.personal where instr(email,?)>0 limit 1'
exports.myInfo = function (app) {
    app.post('/myInfo',function (req, res) {
        db.query(Sql,req.body.email,function (error, result) {
            if (error) {
                console.log(error);
                res.render('无')
            }
            if(result[0]['count(*)']>0) {
                db.query(myInfoSql,req.body.email,function (error,result) {
                    if (error) {
                        console.log(error);
                        res.render('无')
                    }
                    res.json({flag:true,message:'成功获取',myInfo:result[0]})
                })
            }
        })
    })
}


exports.resaveImg = function (app) {
    app.post('/resaveImg',function (req, res) {
        var data = req.body.base;
        var base64 = data.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
        console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
        var path = '/images/headPortrait/'+ Date.now() +'.png';
        fs.writeFile('public'+path,dataBuffer,function(err){//用fs写入文件
            if(err){
                console.log(err);
            }else{
                console.log(path)
                console.log('写入成功！');
                let myInfoInsertSql = `update cpj.personal set personalUrl='${path}' where email=?`
                db.query(myInfoInsertSql,req.body.email,function (error, result) {
                    if (error) {
                        console.log(error);
                        res.render('无')
                    }
                    console.log(path)
                    console.log(result)
                    res.json({flag:true, message:'图片上传成功',avatarImg:path})
                })
            }
        })
    })
}
