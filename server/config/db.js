/**
 * Created by mac on 2017/12/21.
 */

var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'chenxm886',
    database:'cpj',
    charset:'UTF8'
});

function query(sql, options, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, options, function(err, rows){
            callback(err, rows);
            connection.release();
        });
    });
}

exports.query = query;
