/**
 * Created by mac on 2017/12/28.
 */
// var express = require('express');
// var app = express();
// var allowCrossDomain = require('../config/allowCrossDomain');
// var session = require('express-session');
// var bodyParser = require('body-parser');
//
// // var router = express.Router();
//
// // application/json
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
//
// // 允许跨域
// app.use(allowCrossDomain.allowCrossDomain)
// //会话
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'chenxm',
//     cookie: {
//         maxAge: 1000 * 60 * 30
//     }
// }));

// var ccap = require('ccap')();
// const strArr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m',
//     'n','o','p','q','r','s','t','u','v','w','x','y','z']


 exports.ccap= function(app) {
     var captcha3 = require('ccap')({

         width:90,//set width,default is 256

         height:35,//set height,default is 60

         offset:20,//set text spacing,default is 40

         quality:100,//set pic quality,default is 50

         fontsize:33, //set font size,default is 57

         generate:function(){
             // return strArr.map(() => {
             //     return strArr[parseInt(strArr.length*Math.random())];
             // }).slice(0,4).join('')

             // 最佳算法
             return Math.random().toString(36).slice(-4)
         }

     });

     // 验证码图片的接口
     app.get('/ccap', function (req, res) {
         if (req.url == '/favicon.ico') return res.send('');//Intercept request favicon.ico
         var ary = captcha3.get();
         var buf = ary[1];
         // console.log(req.session.name);
         var session = req.session
         session.IdentifyCode = ary[0];
         console.log(session.IdentifyCode);
         // res.write(buf);
         //  console.log(txt);
         //  console.log(buf.toString('base64'));
         var data = {
             ccapUrl: buf.toString('base64'),
             // text:txt
         }
         res.json(data)
     })
 }

 exports.IdentifyCode = function (app) {

    // 验证码验证的接口
     app.post('/IdentifyCode',function (req, res) {
        console.log(req.body.code)
        var session = req.session
        console.log(session.IdentifyCode);
        var txt = session.IdentifyCode;
        // var data = {
        //     code:txt
        // }
        var feedback = false;
        if (txt === req.body.code) {
            feedback = true
        } else {
            feedback = false
        }
        res.json({
            feedback:feedback
        })
    })
}

// var server = app.listen(8124, function () {
//     console.log('链接成功')
// })




