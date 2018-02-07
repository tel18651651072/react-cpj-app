/**
 * Created by mac on 2018/1/11.
 */
var mysql      = require('mysql');
var db = require('./../config/db');

var sql = "update cpj.user set password=? where email=?";
exports.modifyInfo = function (app) {
    app.post('/modifyInfo',function (req,res,next) {
        db.query(sql,req.body.userdata,function (err,result) {
            if (err) {
                console.log(err);
                res.render('无')
            }
            console.log(result)
            res.json(result)
        })
    })
}
