import 'babel-polyfill'
import Promise from 'es6-promise'
Promise.polyfill()

import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './axios'
import Cookie from './cookie'
import normal from './store/normal.css'
import iconfont from './font/iconfont.css'
import { webUrl, getQueryVariable } from './store/formatter'
import App from './App'
//社交分享组件
import Share from 'vue-social-share'
import 'social-share.js/dist/css/share.min.css'
import 'social-share.js/dist/js/social-share.min.js'
import _ from 'lodash';
import { add } from 'lodash/fp';

import echarts from 'echarts'
import china from 'echarts/map/json/china.json'

Vue.use(Share)
Vue.use(echarts)
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
echarts.registerMap('china', china)
/* 关闭生产模式下给出的提示 */
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    if (to.path) {//百度统计
        if (window._hmt) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }
    // localStorage.setItem('token', 'd9a4FvxSuIXCcxn59Btr_SJwxWp6Vy_yJzPMa6gUJgW8eMs8uQeySrkOrko8nEDzfVPFForGReJxJDtcnbv8mJOd15MC9uzFRWo')
    let toPaths = ['/login', '/homepage', '/tokenRes', '/appNavigatorPage']
    if (toPaths.indexOf(to.path) > -1) {
        // 页面直接放行
        next()
    } else {
        localStorage.setItem('path', to.path)  // 保存原来想要去的地址path
        localStorage.setItem('query', JSON.stringify(to.query))  // 保存原来想要去的地址query
        // localStorage.setItem('token', 'f582rov960z_Uv--AfUtz6J2hNnt8gb8exXjYYHlcHs7OhL-JszaKlYP-nlJzOYoIkUhU650921bTveVUBM8eDF9Wmjxbzpaqo8')
        let token = localStorage.getItem('token') || Cookie.getCookie('token'); // 从localStorage/cookie获取token 优先获取本地从localStorage 跨域名时获取cookie共享token   共享token在login2.vue里面登录时进行保存共享
        if (token) {
            // let href_d = window.location.href;
            // let href_d = ' http://114.215.223.123/bid_new/#/'
            // let href_d = 'http://bid.520coc.cn'//bid
            let href_d = 'http://maohu.520coc.cn'//personal
            // http://www.520maohu.com
            // http://www.520maohu.cn
            // http://www.520maofu.com
            // http://www.520maofu.cn
            // http://www.maohu520.com
            // http://www.maohu520.cn
            // http://www.maofu520.com
            // http://www.maofu520.cn
            // let href_d = 'http://www.520maohu.com'//personal

            // let href_d = 'http://laipi.520coc.cn/' // browser
            // //这个是猫糊修改的
            let CompInfoData = {
                url: href_d,
                token: token,
                // company_id: localStorage.getItem('my_company_id')
            }
            let nowUrl = to.query.login_service_id
            if (nowUrl) {
                CompInfoData.service_id = nowUrl
            }
            if (localStorage.getItem('share') == 1) {
                CompInfoData.share = localStorage.getItem('share')
            }
            Vue.prototype.axios.post('/index/company/getCompInfo', CompInfoData, data => {
                if (data.status == 'success') {
                    store.state.userInfo = {
                        user_img: data.rows.avatar,
                        username: data.rows.username,
                        user_id: data.rows.user_id,
                        company_id: data.rows.company_id,
                        gs_id: data.rows.gs_id,
                        qymc: data.rows.qymc,
                        gs_logo: data.rows.headimg,
                        href: href_d,
                    }
                    //判断页面是否 是分享页面

                    let roleObj = {
                        // company_id: store.state.userInfo.company_id,
                        user_id: store.state.userInfo.user_id,
                    }
                    if (nowUrl == 'login_service_id') {
                        roleObj.service_id = window.location.href.split('?')[window.location.href.split('?').length - 1].split('&')[0].split("=")[1]
                    }
                    Vue.prototype.axios.post('/index/mine/getUserRole', roleObj, data1 => {
                        store.state.menu = {
                            role: data1.role,
                            text: data1.text
                        }
                        let sharePermissions = ''  //页面没有分享的状态
                        if (to.query.login_user_id) {
                            if (to.query.login_user_id != data.rows.user_id) {
                                sharePermissions = 1//页面分享后打开的状态
                            }
                        }
                        localStorage.setItem('user_img', data.rows.avatar)
                        localStorage.setItem('share', sharePermissions)
                        localStorage.setItem('username', data.rows.username)
                        localStorage.setItem('user_id', data.rows.user_id)
                        localStorage.setItem('company_id', data.rows.company_id)
                        localStorage.setItem('gs_id', data.rows.gs_id)
                        localStorage.setItem('qymc', data.rows.qymc)
                        localStorage.setItem('gs_logo', data.rows.headimg)
                        localStorage.setItem('menu', JSON.stringify(data1.role))
                        next()
                    })
                }
            })
        } else {
            next('/login') // token不存在   需要登录  
        }
    }


})

Vue.component('body-top', {
    data: function () {
        return {
            count: 0,
            gs_info: {}
        }
    },
    created() {
        if (store.state.userInfo) {
            this.gs_info = {
                logo: 'https://wechat.cdzjkl.com/files/options/' + store.state.userInfo.gs_logo,
                gsmc: store.state.userInfo.qymc
            }
        }
    },
    template: `<div style="background-color:#4999e0;">
               <div style="color:#fff;width:1200px;height:90px;margin:0 auto;display:flex;align-items:center;justify-content:space-between">
                <div style='display:flex;align-items:center'>
                        <img style="height:50px;width:50px;border-radius:50%;margin-right:10px" :src="'https://wechat.cdzjkl.com/files/options/'+this.$store.state.userInfo.gs_logo" alt="头像">
                        <span style="font-size:34px;cursor:pointer;color:#fff;text-decoration:none" >{{this.$store.state.userInfo.qymc}}</span>
                </div>
                <div style='display:flex;align-items:center'>
                        <span style="cursor:pointer" class='el-icon-s-home'></span>
                        <span style="cursor:pointer"  @click="goBack">回到首页</span>
                </div>
               </div>
            </div>`,
    methods: {
        goBack() {
            if (this.$route.query.login_service_id) {
                this.$router.push({
                    path: `/browser?login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}`
                });
            } else {
                this.$router.push({
                    path: `/personal`
                });
            }
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
