<template>
  <div>
    <div v-if="token">{{token?'登录成功':'未登录'}}</div>
    <div>接收到token:{{token}}</div>
  </div>
</template>
<script>
import Cookie from './../cookie'
export default {
  data () {
    return {
      token: ''
    }
  },
  mounted () {
    // 添加监听事件 接收分发token
    window.addEventListener('message', (e) => {
      if (typeof e.data === 'string') {
        this.token = e.data
        window.localStorage.setItem('token', e.data)
        Cookie.setCookie('token', e.data) // 存入Cookie
      }
    })
  }
}
</script>
