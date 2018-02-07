/**
 * Created by mac on 2018/1/3.
 */

var nodemailer = require('nodemailer');

exports.emailTest = function (app) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '2578962719@qq.com',
            pass: 'kmqvvuhemssodifg' //授权码,通过QQ获取
        }
    });

    app.post('/emailTest',function (req, res) {
        try{
            console.log(req.body.userdata.email)
            var session = req.session
            session.email = req.body.userdata.email;
            console.log(req.sessionID)
            var mailOptions= {
                from: '2578962719@qq.com', // 发送者
                to: req.body.userdata.email, // 接受者,可以同时发送多个,以逗号隔开
                subject: '来自陈晓明的邮件', // 标题
                text: '看到请回复。。。', // 文本
                html: `<h2>点击一下链接进一步设置用户名，密码</h2><h3>
                <a href="http://localhost:3001/register?token=${req.sessionID}">
                http://localhost:3001/${req.body.userdata.to}?token=${req.sessionID}</a></h3>`
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(info)
                console.log('发送成功');
                res.json({ret:true,message:'fanhui'});
            });
        }catch(e){console.log(e)}
    })
}


