<template>
  <div>
    <el-header height="auto">
      <body-top></body-top>
      <div>
        <!-- 导航栏 -->
        <head-menu :index="'/itemBsList?cate=筑标'"></head-menu>
      </div>
      <el-row class="border-b">
        <el-col :xs="0" :span="4" class="bt2">
          <span>我的标书</span>
        </el-col>
        <el-col :xs="24" :span="20">
          <el-form :inline="true" class="demo-form-inline" align="right" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="searchxmmc" placeholder="请输入项目名称" @keyup.enter.native="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding:0;margin:0 auto;width:95%">
      <el-table border :data="tableData"  style="width: 100%;height:100%" v-loading="loading">
        <el-table-column width="50" label="序号" align="center">
          <template slot-scope="scope">
            {{scope.$index+(page-1)*10+1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="date1" label="项目名称" width="700">
          <template slot-scope="scope">
            <div v-html="scope.row.xmmc"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="xmdq" label="项目地区" >
        </el-table-column>
        <el-table-column align="center" prop="jd" label="进度" width="720">
          <template slot-scope="scope">
            <ul class="tableXm_ul">
              <li v-bind:class="scope.row.stage1 ? 'activeLi' : ''">
                <span>{{scope.row.stage1 ? scope.row.stage1 :'预定' }}</span><img :src="scope.row.stage1 ? table_xm.images.l1u : table_xm.images.l2d" alt=""></li>
              <li v-bind:class="scope.row.stage2 ? 'activeLi' : ''">
                <span>{{scope.row.stage2 ? scope.row.stage2 :'报名' }}</span><img :src="scope.row.stage2 ? table_xm.images.l1u : table_xm.images.l2d" alt=""></li>
              <li v-bind:class="scope.row.stage3 ? 'activeLi' : ''">
                <span>{{scope.row.stage3 ? scope.row.stage3 :'标书' }}</span><img :src="scope.row.stage3 ? table_xm.images.l1u : table_xm.images.l2d" alt=""></li>
              <li v-bind:class="scope.row.stage4 ? 'activeLi' : ''">
                <span>{{scope.row.stage4 ? scope.row.stage4 :'开标' }}</span><img :src="scope.row.stage4 ? table_xm.images.l5u : table_xm.images.l5d" alt=""></li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="table_click(scope.row)" type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination ref="fenye" @current-change="pageSizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>
    </el-footer>
  </div>
</template>
<script>
import head_menu from './template/head_menu.vue'
import l1u from '../assets/l1u.png'
import l11u from '../assets/l11u.png'
import l1d from '../assets/l1d.png'
import l2u from '../assets/l1u.png'
import l2d from '../assets/l2d.png'
import l22d from '../assets/l22d.png'
import l5u from '../assets/l5u.png'
import l55u from '../assets/l55u.png'
import l5d from '../assets/l5d.png'
import l55d from '../assets/l55d.png'
import h1 from '../assets/h1.png'
import h2 from '../assets/h1.png'
import h3 from '../assets/h1.png'
import h4 from '../assets/h4.png'
/* eslint-disable */
export default {
  components: {
    headMenu: head_menu
  },
  data() {
    return {
      total: 0,
      page: 1,
      searchxmmc: '',
      loading: false,
      tableData: [],
      table_xm: {
        activeBtn: '预定',
        input: '',
        xmdq: '',
        data: [],
        page: 1,
        total: 0,
        images: {
          h1: h1,
          h2: h2,
          h3: h3,
          h4: h4,
          l1u: l1u,
          l2u: l2u,
          l5u: l5u,
          l1d: l1d,
          l2d: l2d,
          l5d: l5d,
          l11u: l11u,
          l22d: l22d,
          l55d: l55d,
          l55u: l55u
        },
        input: '',
        dialogVisible: false,
        form: {}
      }
    }
  },
  created() {
    document.title = '标书检查'
    this.getItemList()
  },
  methods: {
    //首页
    onChangeUser() {
      this.$router.push('/')
    },
    //搜索公司
    onSearch() {
      this.page = 1
      this.total = 0
      this.getItemList()
    },
    //重置
    onReset() {
      this.searchxmmc = ''
      this.page = 1
      this.total = 0
      this.getItemList()
    },
    //改变页数
    pageSizeChange(val) {
      this.page = val
      this.getItemList()
    },
    //获取项目列表
    getItemList() {
      this.loading = true
      let obj = {
        user_id: this.$store.state.userInfo.user_id,
        page: this.page,
        xmmc: this.searchxmmc,
        rows: 10,
        user_cate: '标书制作',
        type:'筑标成都'
      }
      this.axios.post('/index/project/re_lists', obj, data => {
        this.loading = false
        if (data.status == 'success') {
          this.tableData = data.rows
          this.total = data.total
        } else {
          this.total = 0
          this.tableData = []
        }
      })
    },
    table_click(row) {
      let { href } = this.$router.resolve({
        path: `/itemBsInfo?jbxx_id=${row.id}`
      })
      window.open(href, 'f' + row.id)
    }
  }
}
</script>
<style scoped lang="less">
@activeColor: #409eff;
@stage_left: 198px;
@stage_left2: 170px;
@stage_zIndex: 11;
.el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-header {
  padding: 0;
}
.btdiv {
  color: #ffffff;
  margin-bottom: 20px;
  background-color: #324157;
  display: flex;
  padding: 0 50px;
}
.border-b {
  margin: 20px 40px;
  margin-bottom: 0px;
  .bt2 {
    font-size: 20px;
  }
}
.jd-bj {
  color: #ffffff;
  text-align: center;
  background-image: url('../assets/jd.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.activeLi {
  color: white;
}
.tableXm_ul {
  position: relative;
  height: 25px;
  li:nth-child(1) {
    left: @stage_left2 * 0;
    z-index: @stage_zIndex;
  }
  li:nth-child(2) {
    left: @stage_left2;
    z-index: 10;
  }
  li:nth-child(3) {
    left: @stage_left2 * 2;
    z-index: 9;
  }
  li:nth-child(4) {
    left: @stage_left2 * 3;
    z-index: 8;
  }
  li:nth-child(5) {
    left: @stage_left2 * 4;
    z-index: 7;
  }
  li:nth-child(6) {
    left: @stage_left2 * 5;
    z-index: 6;
  }
  li {
    display: inline-block;
    margin: 0;
    list-style: none;
    width: 190px;
    height: 25px;
    text-align: right;
    font-size: 12px;
    position: absolute;
    z-index: 999;
    img {
      width: 100%;
      height: 100%;
    }
    span {
      display: inline-block;
      text-align: center;
      position: absolute;
      left: 0;
      top: 1px;
      width: 100%;
    }
  }
}
</style>

