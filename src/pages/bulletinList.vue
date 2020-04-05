<template>
  <div class="bulletin-list">
    <HomeHeader></HomeHeader>
    <main class="main">
      <div class="main-box">
        <div class="bulletin-wrap">
          <p class="h1-title">公告列表</p>
          <el-tabs v-model="tabIndex">
            <el-tab-pane label="全部"></el-tab-pane>
            <el-tab-pane label="升级公告"></el-tab-pane>
            <el-tab-pane label="安全公告"></el-tab-pane>
            <el-tab-pane label="备案公告"></el-tab-pane>
            <el-tab-pane label="其他"></el-tab-pane>
          </el-tabs>
          <div class="bulletin-list-wrap">
            <p class="bulletin-head bulletin">
              <span>公告标题</span>
              <span>公告时间</span>
            </p>
            <div class="bulletin-info-body" v-if="bulletinList.length">
              <P class="bulletin-item bulletin" v-for="item in bulletinList" :key="item.title + Math.random()">
                <router-link tag="span" class="bullention-info" to="/bulletin/item/123">{{item.title}}</router-link>
                <span>{{item.date}}</span>
              </P>
              <el-pagination
                background
                layout="prev, pager, next, sizes"
                :current-page="currentInfoPage"
                :total="totalInfo"
                :page-size="pageSize"
                :page-sizes="pageSizes">
              </el-pagination>
            </div>
            <div class="empty-body" v-else>暂无信息</div>
          </div>
        </div>
      </div>
    </main>
    <HomeFixedAside :asideType="'contact'"></HomeFixedAside>
  </div>
</template>

<script>
import HomeFixedAside from './template/HomeFixedAside.vue'
import HomeHeader from './template/HomeHeader'

export default {
  name: 'bulletinList',
  components: {
    HomeFixedAside,
    HomeHeader
  },
  data() {
    return {
      bulletinList: [{
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }, {
        title: '【升级】管控系统升级通知',
        date: '2019-06-10 14:28:43'
      }],
      currentInfoPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      tabIndex: 0,
      totalInfo: 100
    }
  }
}
</script>

<style lang="less" scoped>
.justfy{
  width: 1300px;
  margin: 0 auto; 
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
.bulletin-list{
  font-family: '微软雅黑';
  background: #f4f4f4;
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
  &-box{
    padding-top: 10px;
    padding-bottom: 30px;
    .h1-title{
      font-weight: 700;
      font-size: 20px;
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      color: #333;
    }
    .bulletin-wrap{
      width: 1200px;
      background: #fff;
      margin: 0 auto;
      padding: 25px 40px 25px 40px;
      box-shadow: 0 0 2px #f0f0f0;
      .bulletin-list-wrap{
        width: 100%;
        .bulletin-head{
          line-height: 40px;
          background: #f5f5f5;
          span{
            color: #999;
          }
        }
        .bulletin{
          padding: 0 12px;
          display: flex;
          justify-content: space-between;
          span{
            font-size: 12px;
          }
        }
        .bulletin-item{
          line-height: 46px;
          border-bottom: 1px solid #F2F2F2;
          .bullention-info{
            color: #666;
            cursor: pointer;
            &:hover{
              color: #00C1DE;
            }
          }
        }
        .empty-body{
          padding: 50px;
          text-align: center;
          color: #999;
        }
      }
    }
  }
}
</style>
