/**
 * Created by mac on 2017/12/24.
 */

var allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X_Requested_With, Content-Type, X_FILENAME");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header('Access-Control-Allow-Credentials',true);
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
};

exports.allowCrossDomain = allowCrossDomain;
