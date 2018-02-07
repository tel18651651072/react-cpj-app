/**
 * Created by mac on 2018/1/19.
 */
/**
 * 第一段判断是否有反向代理IP(头信息：x-forwarded-for)，在判断connection的远程IP，以及后端的socket的IP
 ***/
exports.getIpcode = function (req) {
    return req.headers['x-forwarded-for']||
            req.connection.remoteAddress||
            req.socket.remoteAddress||
            req.connection.socket.remoteAddress;
}
