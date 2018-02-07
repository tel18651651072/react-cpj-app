/**
 * Created by mac on 2018/1/3.
 */

export function isValidEmail(email) {
    var r = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return r.test(email);
}

export function isValidPassword(password) {
    var r = /^[^\s]{6,16}$/;
    return r.test(password)
}
