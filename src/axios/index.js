import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import Qs from 'qs'
import Cookie from "../cookie";
import store from '../store'

//取消ajax请求
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

//请求之前拼接地址 root + 路径
const root = process.env.API_ROOT; //开发环境
let count = 0;
let self = this;

Vue.prototype.axios = {
    //post请求   url 地址（路径） data  传入的数据 
    //successfn  成功的回调函数   errfn 失败的回调函数
    post(url, data, successfn, errfn = () => { }) {
        let http_url;
        if (url.indexOf('/') == '0') {
            http_url = root + url // 开发环境地址配置
        } else {
            http_url = url //路径
        }
        //获取传入的token
        data.token = localStorage.getItem('token') || Cookie.getCookie('token')
        //拿到本页面的导航栏地址
        let nowUrl = window.location.href.split('?')[window.location.href.split('?').length - 1].split('&')
        if (store.state.userInfo) {
            data.login_company_id = store.state.userInfo.company_id;
            data.login_user_id = store.state.userInfo.user_id;
            nowUrl.forEach(item => {
                let myTxt = item.split('=')[0]
                if (myTxt == 'login_service_id') {
                    data.login_service_id = item.split('=')[1]
                }
            })
            nowUrl.forEach(item => {
                if (item.split("=")[0] == 'share' && item.split("=")[1] != '') {
                    data.share = item.split("=")[1]
                }
            })
        }
        //axios post请求封装
        axios.post(http_url, Qs.stringify(data), {
            // cancelToken: source.token, //取消请求
            headers: { //请求头
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then(
            function (res) {
                if (res.data.status == 'failed') { //状态失败
                    count += 1;
                    // nowUrl.forEach(item=>{
                    //     let myTxt = item.split('=')[0]
                    //     if(myTxt == 'login_service_id'){
                    //         data.login_service_id = item.split('=')[1]
                    //     }
                    // })
                    // nowUrl.forEach(item=>{
                    //     if( item.split("=")[0] =='share' && item.split("=")[1] !=''){
                    //         data.share = item.split("=")[1]
                    //     }
                    // })
                    // alert(JSON.stringify(res.data))
                    if (res.data.message == 'token值有误') {//没有权限
                        localStorage.removeItem('token')
                        Cookie.delCookie('token')
                        router.push('/login?')  // token值有误   需要登录
                        // window.open(`http://login.520coc.cn?company_id=${localStorage.getItem('my_company_id')}&source=${window.location.host}`, '_self');//跳转到登录系统
                        } else if (res.data.message == '权限受限') {//权限受限
                            if (count == 1) {
                                localStorage.removeItem('token')
                                Cookie.delCookie('token')
                                alert('你没有权限登录该系统，请输入正确的网址或联系管理员')
                                // window.open(`http://login.520coc.cn?company_id=${localStorage.getItem('my_company_id')}&source=${window.location.host}`, '_self');//跳转到登录系统
                                router.push('/login') // 权限受限需要登录
                            }
                        } else {
                            successfn(res.data)
                          }
              } else {
                  successfn(res.data)
              }
            }).catch( //失败的回调
                function (err) {
                    if (err.response) {
                        errfn(err.response);
                    }
                }
            )
    },
    //get请求
    get(url, successfn, errfn = () => { }) {
        let http_url;
        if (url.indexOf('/') == '0') {
            http_url = root + url
        } else {
            http_url = url
        }
        axios.get(http_url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res=>successfn(res.data))
          .catch(err=>{
                if (err.response) {
                    errfn(err.response);
                }
            })
    },
    //主要是为了执行多个并发请求 (高并发)
    all: axios.all,
    spread: axios.spread
}
