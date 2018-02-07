/**
 * Created by mac on 2018/1/22.
 */

var Redis = require('ioredis');
var redis = new Redis();

redis.set('test-reids-expire',1)

redis.expire('test-redis-expire',10)

redis.get('test-redis-expire', (err, value) => {
    console.log(value)
})

setTimeout(() => {
    redis.get('test-redis-expire', (err, value) => {
        console.log(value)
    })
}, 5000)