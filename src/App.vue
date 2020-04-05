<template>
  <div id="app">
    <div class="content">
      <p v-if="isShowChromeTip && $route.path != '/appNavigatorPage'" style="color: red;font-size: 15px; margin: 30px 0;text-align:center">系统暂不支持当前浏览器，推荐使用谷歌Chrome【
        <a target="_blank" href="https://www.google.cn/intl/zh-CN/chrome/">点击下载</a>】或者360浏览器【
        <a target="_blank" href="https://browser.360.cn/ee/">点击下载</a>】打开
      </p>
      <div class="AppBox" :style="{minHeight:positionH}">
        <router-view>
        </router-view>
      </div>
      <homeFooter v-if="$route.path === '/homepage'"></homeFooter>
      <v-footer v-else-if="$route.path != '/homepage' && $route.path != '/appNavigatorPage'"></v-footer>
    </div>
  </div>
</template>
<script>
import vFooter from './pages/template/footer'
import homeFooter from './pages/template/home-footer'
/* eslint-disable */
export default {
  name: 'App',
  data() {
    return {
      userH: ''
    }
  },
  components: {
    vFooter,
    homeFooter
  },
  mounted() {
    this.userH = window.innerHeight
    window.onresize = () => {
      return (() => {
        this.userH = window.innerHeight
      })()
    }
  },
  computed: {
    positionH: function() {
      return this.userH - 100 + 'px'
    },
    isShowChromeTip() {
      const USER_AGENT = navigator.userAgent.toLowerCase()
      const isChrome = /.*(chrome)\/([\w.]+).*/
      return !isChrome.test(USER_AGENT)
    }
  }
}
</script>

<style>
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  width: 100%;
  height: 100%;
  min-width: 1349px;
}

.bt {
  padding: 14px 0 14px 0;
  font-size: 32px;
  text-align: center;
}
* {
  margin: 0;
  padding: 0;
}
.el-popover.user_list {
  margin-top: 1px;
  padding: 6px 0;
}
.link_text {
  color: #3a8ee6;
  cursor: pointer;
}

.clearfix:after {
  content: '';
  height: 0;
  clear: both;
  display: block;
}
.el-select-dropdown .el-scrollbar .el-select-dropdown__wrap {
  max-height: 310px;
}
/* 首页轮播 dot 样式 */
.banner-list .el-carousel__indicators.el-carousel__indicators--horizontal {
  bottom: 55px;
  z-index: 15;
}
.banner-list .el-carousel__indicator.el-carousel__indicator--horizontal {
  width: 16px;
  height: 16px;
  background: #ccc;
  border-radius: 50%;
  margin-right: 15px;
  padding: 0;
}
.banner-list
  .el-carousel__indicator.el-carousel__indicator--horizontal:last-child {
  margin-right: 0;
}
.banner-list
  .el-carousel__indicator.el-carousel__indicator--horizontal.is-active {
  background: #fff;
}
.banner-list .el-carousel__indicator.is-active button {
  opacity: 0;
}
.banner-list .el-carousel__indicator button {
  opacity: 0;
}
/* 猫糊首页卡牌轮播样式 */
.service-car .el-carousel__mask {
  z-index: 100;
  right: 0;
  margin: auto;
  width: 70%;
  opacity: 0.6;
}
.service-car
  .el-carousel__item.el-carousel__item--card.is-in-stage.is-active
  i {
  color: #3295fa;
}
</style>
