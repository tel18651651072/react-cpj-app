/**
 * Created by mac on 2018/1/24.
 */
const express = require('express');
const session = require('express-session');
var allowCrossDomain = require('./config/allowCrossDomain');
const RedisStore = require('connect-redis')(session);
let app = express();
// 允许跨域
app.use(allowCrossDomain.allowCrossDomain)
app.use(session({
    secret: 'keyboard cat',
    cookie: ('name', 'value', { path: '/', httpOnly: false,secure: false, maxAge:  600000 }),
    //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
    resave: true,
    //强制“未初始化”的会话保存到存储。
    saveUninitialized: true,
    store : new RedisStore({
        "host": "127.0.0.1",
        "port" : "6379",
        "ttl" : 1800,
        "logErrors" : true
    })
}));
var redistestpost = require('./redisTestpost').redistestpost(app)
app.listen(4000,()=>{
    console.log('start');
});