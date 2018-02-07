/**
 * Created by mac on 2018/1/25.
 */
exports.redistestpost = function (app) {
    app.post('/test',(req,res)=>{
        let session = req.session;
        console.log(session)
        console.log(req.sessionID);
        session.a = 1;
        var ifAddSkimNum = false
        if (session.pageList) {
            if (session.pageList['c67e5530']==='71593240') {
                ifAddSkimNum = false
            } else {
                session.pageList['c67e5530']='71593240'
                ifAddSkimNum = true
            }
        } else {
            session.pageList = {}
            session.pageList['c67e5530']='71593240'
            console.log(session.pageList)
            ifAddSkimNum = true
        }
        res.json({'a':session.a});
    });
}