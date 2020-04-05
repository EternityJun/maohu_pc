/* eslint-disable */
function setCookie (name, value, day, host) {
    let domain = host ? `;domain=${host}` : `;domain=${window.location.hostname}` // 设置归属域
    if (day !== 0) {     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000
        var date = new Date(+new Date() + expires)
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString() + domain
    } else {
        document.cookie = name + "=" + escape(value) + domain
    }
}
// function setCookie (c_name, value, expire) {
//     var date = new Date()
//     date.setSeconds(date.getSeconds() + expire)
//     document.cookie = c_name + "=" + escape(value) + ";expires=" + date.toGMTString() + domain
// }
/*获取cookie*/
function getCookie (c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
/*删除cookie*/
function delCookie (c_name) {
    setCookie(c_name, "", -1)
}
export default {
    setCookie,
    getCookie,
    delCookie
}