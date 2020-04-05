<template>
  <header class="home-header">
    <div class="logo-wrap">
      <img src="../../assets/logo-maohu.png" alt="" class="logo">
      <div class="link-list">
        <router-link tag="span" to="/" class="link-item">网站首页</router-link>
        <router-link tag="div" to="/personal" class="avatar-wrap" v-show="avatar">
          <img :src="avatar" alt="" srcset="" class="avatar">
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
  data() {
    return {
      avatar: localStorage.getItem('user_img') || ''
    }
  }
}
</script>

<style lang="less" scoped>
.home-header{
  position: relative;
  height: 100px;
  background: #57c5f7;
}
.link-list{
  display: flex;
  align-items: center;
  .link-item{
    margin-right: 10px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
}
.logo-wrap{
  position: absolute;
  z-index: 20;
  width: 1200px;
  height: 100px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  .logo{
    margin-top: 21px;
    margin-left: -8px;
    height: 47px;
    width: 99px;
  }
  .avatar-wrap{
    margin-left: 20px;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    .avatar{
      height: 100%;
    }
  }
}
</style>
