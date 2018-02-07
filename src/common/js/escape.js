/**
 * Created by mac on 2018/1/17.
 */
export function escape(str) {
    return str.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}