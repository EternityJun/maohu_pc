<template>
    <div class="home-foot">
      <p class="nav-link">
        <router-link tag="span" to="/bulletinlist" class="link-item">系统公告</router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link tag="span" to="/maohufaq" class="link-item">常见问题</router-link>
        <el-divider direction="vertical"></el-divider>
        <router-link tag="span" to="/maohuinstruction" class="link-item">资料专区</router-link>
      </p>
      <div class="info-list">
        <p>© 2016成都中建科联网络科技有限公司  蜀ICP备 16014763号</p>
        <p>答疑客服：028-68731622    客服微信：18140108520    客服QQ：824322520</p>
        <p>工作时间：周一至周五9：00-18：00</p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'homeFoot'
};
</script>

<style lang="less" scoped>
.home-foot{
  background: #181818;
  padding: 45px 0 30px 0;
  p{
    text-align: center;
  }
}
.nav-link{
  .link-item{
    color: #eee;
    font-size: 14px;
    cursor: pointer;
    &:hover{
      color: #fff;
    }
  }
}
.info-list{
  padding-top: 40px;
  p{
    font-size: 12px;
    color: rgb(93, 93, 96);
    line-height: 25px;
  }
}
</style>


