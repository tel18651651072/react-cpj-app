/**
 * Created by mac on 2017/12/21.
 */

var express = require('express');
var app = express();
var allowCrossDomain = require('./config/allowCrossDomain');
const session = require('express-session');
var bodyParser = require('body-parser');
// let Store = new session.MemoryStore();
// var redis = require("redis"),
//     client = redis.createClient();
const RedisStore = require('connect-redis')(session);
// var sessionStore = new RedisStore();

// 设置公共文件夹
app.use(express.static('public'));
// application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// 允许跨域
app.use(allowCrossDomain.allowCrossDomain)
//会话
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'chenxm',
//     store:Store,
//     cookie: {
//         maxAge: 1000 * 60 * 30
//     }
// }));
var Store = new RedisStore({
    "host": "127.0.0.1",
    "port" : "6379",
    "ttl" : 1800,
    "logErrors" : true
})
app.use(session({
    secret: 'keyboard cat',
    cookie: ('name', 'value', { path: '/', httpOnly: false,secure: false, maxAge:  600000 }),
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    //强制“未初始化”的会话保存到存储。
    saveUninitialized: true,
    store : Store
}));
// 路由
//app.use('/',router)

var ccap=require('./user/ccap').ccap(app)
var IdentifyCode = require('./user/ccap').IdentifyCode(app)
var emailTest = require('./user/emailTest').emailTest(app)
var register = require('./user/register').register(app,Store)
var submitUserData = require('./user/register').submitUserData(app)
var verifyEmail = require('./user/register').verifyEmail(app)
var verifyLogin = require('./user/login').verifyLogin(app)
var modifyInfo = require('./user/modifyInfo').modifyInfo(app)
var submitContent = require('./content/content').submitContent(app)
var fetchContent = require('./content/content').fetchContent(app)
var searchResult = require('./content/content').searchResult(app)
var fetchDetail = require('./content/content').fetchDetail(app)
var getSkim = require('./content/getSkim').getSkim(app)
var reply = require('./reply/replay').reply(app)
var fetchReply = require('./reply/replay').fetchReply(app)
var getSessionEmail = require('./user/login').getSessionEmail(app)
var removeSessionEmail = require('./user/login').removeSessionEmail(app)
var addFollow = require('./follow/follow').addFollow(app)
var getFollow = require('./follow/follow').getFollow(app)
var getFollowList = require('./follow/follow').getFollowList(app)
var resaveImg = require('./myCenter/myInfo').resaveImg(app)
var myInfo = require('./myCenter/myInfo').myInfo(app)
var fetchMyContent = require('./content/content').fetchMyContent(app)
var fetchMyReply = require('./reply/replay').fetchMyReply(app)
var updateContent = require('./content/content').updateContent(app)
//  测试
var redistestpost = require('./redisTestpost').redistestpost(app)

var server = app.listen(8124, function () {
    console.log('链接成功')
})




