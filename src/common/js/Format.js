/**
 * Created by mac on 2018/2/5.
 */
export function Format(time) {
    if (time) {
        time = new Date(time)
    } else {
        time = new Date()
    }
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    var hour = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    return year + '-' + (month > 9 ? month : '0' + month) + '-' + (date > 9 ? date : '0' + date) +' '+ (hour > 9 ? hour : '0' + hour) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
}