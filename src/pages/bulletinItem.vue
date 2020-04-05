<template>
  <div class="bulletin-item">
    <main class="main">
      <HomeHeader></HomeHeader>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/newbrowser' }" class="breadcrumb-item">网站首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/bulletinlist' }">某某列表</el-breadcrumb-item>
        <el-breadcrumb-item>详细名称</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bulletin-wrap">
        <p class="h1-title">关于开展核实清理虚假备案专项工作的通知</p>
        <div class="info-wrap">
          <span class="info-type">公告类型：<b>备案公告</b></span>
          <span class="info-date">发布时间：<b>2019-06-10 14:28:43</b></span>
        </div>
      </div>
    </main>
    <HomeFixedAside :asideType="'contact'"></HomeFixedAside>
  </div>
</template>

<script>
import HomeHeader from './template/HomeHeader'
import HomeFixedAside from './template/HomeFixedAside.vue'

export default {
  name: 'bulletinItem',
  data() {
    return {

    }
  },
  components: {
    HomeHeader,
    HomeFixedAside
  }
}
</script>

<style lang="less" scoped>
.justfy{
  width: 1300px;
  margin: 0 auto; 
}
.bulletin-item{
  font-family: '微软雅黑';
  background: #f4f4f4;
}
.header{
  height: 36px;
  line-height: 40px;
  background: rgba(250, 250, 250, 1);
  padding: 0 353px;
  display: flex;
  justify-content: space-between;
  .label{
    font-size: 14px;
    color: #666666;
    &:last-child{
      margin-right: 15px;
    }
  }
}
.main{
  &-top-wrap{
    background: #fff;
  }
  &-top{
    height: 110px;
    display: flex;
    justify-content: space-between;
    .logo{
      height: 65px;
      width: 168px;
      margin: 22px 0 0 51px;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .link-list{
      display: flex;
      line-height: 110px;
      padding-right: 45px;
      .link-item{
        cursor: pointer;
        &:hover{
          color: #0c81e0;
        }
        span{
          margin-right: 30px;
        }
      }
    }
  }
  .breadcrumb{
    width: 1200px;
    margin: 0 auto;
    line-height: 50px;
    height: 50px;
    &-item{
      span{
        font-weight: 400;
      }
    }
  }
  .bulletin-wrap{
    width: 1200px;
    background: #fff;
    margin: 0 auto;
    padding: 25px 40px 40px 40px;
    box-shadow: 0 0 2px #f0f0f0;
    .h1-title{
      border-left: 5px solid #26abe2;
      line-height: 30px;
      margin: 5px 0 15px 0;
      padding-left: 15px;
      color: #666;
      font-size: 20px;
      font-weight: 700;
    }
    .info-wrap{
      height: 36px;
      line-height: 36px;
      border: 1px solid #f0f0f0;
      box-sizing: border-box;
      background: #f9f9f9;
      font-size: 12px;
      color: #999;
      margin-bottom: 25px;
      span{
        padding: 0 8px;
        b{
          font-weight: normal;
          color: #666;
        }
      }
    }
  }
}
</style>
