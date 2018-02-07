/**
 * Created by mac on 2018/1/20.
 */
var db = require('./../config/db');

// var getSql = 'select skimnum from cpj.contentData where uid=?'
var updataSql = 'update cpj.contentData set skimnum=skimnum+1 where uid=?'
exports.getSkim = function (app) {

    app.post('/getSkim',function (req, res) {
        var session = req.session
        console.log(req.sessionID);
        console.log(session.pageList)
        session.a = 1
        console.log(session)
        var ifAddSkimNum = false
        if (session.pageList) {
                if (session.pageList[req.body.pageInfo.uid]===req.body.pageInfo.canvascode) {
                    ifAddSkimNum = false
                } else {
                    session.pageList[req.body.pageInfo.uid]=req.body.pageInfo.canvascode
                    ifAddSkimNum = true
                }
        } else {
            session.pageList = {}
            session.pageList[req.body.pageInfo.uid]=req.body.pageInfo.canvascode
            console.log(session.pageList)
            ifAddSkimNum = true
        }
        if (ifAddSkimNum) {
            db.query(updataSql,req.body.pageInfo.uid,function (error,result) {
                if(error) {
                    console.log(error);
                    res.render('无')
                }
                console.log(result)

            })
        }
        res.json(ifAddSkimNum)
    })
}
