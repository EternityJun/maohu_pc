<template>
  <div id="login2">
    <div>
      <div v-for="(url, index) in urls" :key="index">
        <iframe height="300" width="500" v-show="false" :ref="'iframe'+index" :src="`${url}/#/tokenRes`"></iframe>
      </div>
    </div>
    <div class="body" :style="{backgroundImage: 'url(' + img + ')' }" v-loading='loading1'>
      <el-row class="center">
        <el-row class="title">{{pageTitle}}</el-row>
        <el-card class="login">
          <el-row class="tips">手机登录 / User Login</el-row>
          <el-form :model="forms" :hidden="!show_code" :rules="rules" ref="login_form">
            <el-form-item prop="phone">
              <el-input placeholder="手机号" v-model.number="forms.phone"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input placeholder="验证码" v-model.number="forms.code" @keyup.enter.native="onLogin">
                <el-button slot="append" @click="onGet_code">{{second===0?'发送验证码':second+'s'}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:0">
              <el-button style="width:100%" type="primary" :disabled="loading" :icon="loading?'el-icon-loading':''" @click="onLogin">{{loading?"登录中":'登录'}}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </div>
  </div>
</template>
<script>
import Cookie from './../cookie'
import router from '@/router'
import bjpng from '../assets/dlbj.png'
import { decode } from 'punycode'
import { setTimeout, clearInterval } from 'timers'
import { Promise, reject } from 'q'
import { resolve } from 'url'
export default {
  data() {
    // 手机号验证规则
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // let href_d ='http://www.520maohu.com'
    // let href_d ='http://www.520maohu.cn'
    // let href_d ='http://www.520maofu.com'
    // let href_d ='http://www.520maofu.cn'
    // let href_d ='http://www.maohu520.com'
    // let href_d ='http://www.maohu520.cn'
    // let href_d ='http://www.maofu520.com'
    // let href_d ='http://www.maofu520.cn'
    return {
      loading1: true,
      img: bjpng,
      urls: [
        'http://' + location.host,
        'http://maohu.520coc.cn',
        'http://laipi.520coc.cn',
        'http://bid_new.520coc.cn',
        'http://bid.520coc.cn',
        'http://114.215.223.123/bid_personal',
        'http://114.215.223.123/bid_new'
      ], // 需要共享的域名集
      loading: false,
      rules: {
        phone: [{ validator: checkPhone, trigger: 'change' }],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { type: 'number', message: '验证码为数字值', trigger: 'change' }
        ]
      },
      get_code_text: '获取验证码',
      show_code: true, //隐藏扫码登陆
      forms: {
        phone: '',
        code: ''
      },
      second: 0,
      select_text: '账号登陆',
      pageTitle: '猫糊',
      sendMseStatus: true
    }
  },
  created() {
    let url = window.location.host
    if (
      url.indexOf('maohu.520coc.cn') > -1 ||
      url.indexOf('www.520maohu.com') > -1 ||
      url.indexOf('www.520maohu.cn') > -1 ||
      url.indexOf('www.520maofu.com') > -1 ||
      url.indexOf('www.520maofu.cn') > -1 ||
      url.indexOf('www.maohu520.com') > -1 ||
      url.indexOf('www.maohu520.cn') > -1 ||
      url.indexOf('www.maofu520.com') > -1 ||
      url.indexOf('www.maofu520.cn') > -1
    ) {
      document.title = '猫糊'
      this.pageTitle = '猫糊'
    } else if (url.indexOf('laipi.520coc.cn') > -1) {
      document.title = '赖皮'
      this.pageTitle = '赖皮'
    } else if (url.indexOf('bid.520coc.cn') > -1) {
      document.title = '筑标(成都)'
      this.pageTitle = '筑标(成都)'
    }
    this.loginStatus()
  },
  methods: {
    loginStatus() {
      let CompInfoData = {
        token: localStorage.getItem('token') || Cookie.getCookie('token')
      }
      this.axios.post('/index/login/loginStatus', CompInfoData, data => {
        this.loading1 = false
        //  this.loginData = data.message
        if (data.status == 'success') {
          this.$router.push('/')
        }
      })
    },
    onClick_change(text, v) {
      this.select_text = text
      this.show_code = v
    },
    //获取验证码
    onGet_code() {
      // 用户有权限  下发验证码

      this.$refs['login_form'].validateField('phone', err => {
        if (!err) {
          // 查询用户是否有权限
          this.axios.post(
            '/index/Login/isLogin',
            {
              cellphone: this.forms.phone,
              url: window.location.host
            },
            data => {
              if (data.status == 'failed') {
                if (data.message == '手机号非法') {
                  return this.$notify.error({
                    title: '手机号非法',
                    message: '请确认您的手机号无误后，再次尝试登录'
                  })
                } else {
                  return this.$notify.error({
                    title: '验证失败',
                    message:
                      '抱歉，您没有登录该系统的权限，请输入正确的系统网址或联系管理员'
                  })
                }
              }
            }
          )
          // 当second =0 大于0时不能继续发送
          if (this.second > 0) {
            return
          }
          // 发送验证码
          if (this.sendMseStatus) {
            this.sendMseStatus = false
            this.axios.post(
              '/index/Login/sendMsg',
              { cellphone: this.forms.phone, system: '猫糊' },
              data => {
                this.second = 60
                const time = setInterval(() => {
                  this.second -= 1
                  if (this.second === 0) {
                    this.sendMseStatus = true
                    window.clearInterval(time)
                  }
                }, 1000)
                if (data.status == 'failed') {
                  this.$message.error(data.message)
                }
              }
            )
          }
        }
      })
    },
    //登录
    onLogin() {
      this.$refs['login_form'].validate(valid => {
        if (valid) {
          //验证通过
          // 用户有权限请求验证码
          this.axios.post(
            '/index/Login/login',
            { cellphone: this.forms.phone, verify: this.forms.code },
            data => {
              if (data.status == 'success') {
                this.loading = true
                // 处理token 实现跨域共享
                this.urls.forEach((url, index) => {
                  this.$refs['iframe' + index][0].contentWindow.postMessage(
                    data.token,
                    url
                  ) // 分发token到多个域名
                })
                // Cookie.setCookie('token', data.token, 7, '.520.coc.cn') // 设置token所有域为 520.coc.cn
                let path = localStorage.getItem('path')
                let query = JSON.parse(localStorage.getItem('query'))
                setTimeout(() => {
                  localStorage.setItem('token',data.token)
                  if (path) {
                    //如果存在上一页
                    this.$router.push('/personal')
                    // this.$router.push({ path, query }) // 返回之前的页面
                  } else {
                    this.$router.push('/personal') // 默认页面
                  }
                  this.$notify.success('登录成功')
                  this.loading = false
                }, 2000)
              } else {
                this.$message.error(data.message)
              }
            }
          )
        }
      })
    }
  }
}
</script>
<style lang="less">
#login2 {
  width: 100%;
  height: 720px;
  .body {
    position: relative;
    width: 100%;
    height: 760px;
    background-size: 100% 100%;
  }
  .center {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    height: 550px;
    margin: auto;
    .title {
      font-size: 50px;
      text-shadow: 2px 4px 2px #222;
      text-align: center;
      color: #ffffff;
    }
    .login {
      .tips {
        margin-top: -20px;
        height: 20px;
        margin-bottom: 20px;
        color: #66b1ff;
        text-align: center;
      }
      width: 300px;
      //   height: 200px;
      margin-top: 100px;
      border-radius: 4px;
      background-color: #ffffff;
      padding: 20px;
    }
  }
}
</style>

