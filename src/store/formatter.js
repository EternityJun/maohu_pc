import axios from 'axios'
import store from './index'
import router from '@/router'
import Cookie from "./../cookie";
import Qs from 'qs'


function getDate(type) {
    //得到今天的日期；
    let date = new Date();
    let year = date.getFullYear();
    let month =
        date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
    let day =
        date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    if (type == 'new') {
        return year.toString() + '-' + month.toString() + '-' + day.toString();
    } else {
        return year.toString() + month.toString() + day.toString();
    }
}
// 获得过去近一个月/一年/三年时间
/**
 * 
 * @param {*} num 
 * unit 单位 ：月还是年
 * 
 */
function getPassFormatDate(num, unit) {
    var nowDate = new Date();
    var date = new Date(nowDate);
    if (unit == 'month') {
        date.setMonth(date.getMonth() - 1);
    } else if (unit == 'year') {
        date.setDate(date.getDate()-365*num);
    }
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//计算属性
function formatNum(x, pos) {
    if (!pos) {
        pos = 2
    }
    // var m = Math.pow(10, pos);//x的y次幂
    // var num = new Number(x);
    // return num.toFixed(pos);
    // return parseInt(x * m, 10) / m;
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(x * Math.pow(10, pos)) / Math.pow(10, pos); // pow 幂   
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + pos) {
        s += '0';
    }
    return s;
}

function loginOut() {
    const root = process.env.API_ROOT;
    let params = {
        user_id: store.state.userInfo.user_id
    }
    axios.post(root + '/index/Login/loginOut', Qs.stringify(params), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(
        function (res) {
            localStorage.removeItem('token')
            Cookie.delCookie("token")
            router.push('/login') //跳转到登录系统
            // window.open(`http://login.520coc.cn?company_id=${localStorage.getItem('my_company_id')}&source=${window.location.host}`, '_self');//跳转到登录系统
        }
        ).catch(
        function (err) {
            if (err.response) {
                errfn(err.response);
            }
        }
        )
}
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
const fileUploadUrl = 'https://wechat.cdzjkl.com/index/Human_Review/uploadFile'
export { getDate, formatNum, loginOut, getQueryVariable, fileUploadUrl, getPassFormatDate }
