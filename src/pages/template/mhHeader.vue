<template>
  <header class="mh-header">
    <div class="logo-wrap">
      <img src="../../assets/logo-maohu.png" alt="">
    </div>
  </header>
</template>

<script>
export default {
  name: 'mhHeader'
}
</script>

<style lang="less" scoped>
.mh-header{
  height: 110px;
  background: #57c5f7;
  font-family: '微软雅黑';
}
.logo-wrap{
  position: absolute;
  z-index: 20;
  width: 1200px;
  left: 0;
  right: 0;
  margin: auto;
  img{
    position: absolute;
    top: 21px;
    left: -8px;
    height: 47px;
    width: 99px;
  }
}
</style>
