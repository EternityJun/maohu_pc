<template>
  <div>
    <!--第一排 搜索框和添加按钮-->
    <el-row>
      <el-row style="line-height:30px;">
        <div>
          <span style="font-size: 20px">信任我的人</span>
        </div>
      </el-row>
      <el-row style="margin-top:-15px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item label="人员名称">
            <el-input v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchTrustMe" @clear="searchTrustMe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchTrustMe">搜索</el-button>
            <el-button type @click="onreset">重置</el-button>
          </el-form-item>
          <!-- <el-form-item style="float:right">
            <el-button type="success" @click="add.addVisible=true">添加</el-button>
            <el-button type="info" @click="openRecovery">回收站</el-button>
          </el-form-item> -->
        </el-form>
      </el-row>
    </el-row>
    <!--表格-->
    <div style="margin-top:-15px;">
      <el-table :data="dataList" style="width: 100%" v-loading="isloading" border :row-style="rowH">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="card_name" label="人员名称" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickRyList(scope.row)">{{scope.row.card_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phone_one" label="电话号码" width="200" align="center"></el-table-column>
        <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="comp_duty" label="职位" width="200" align="center"></el-table-column>
      </el-table>
    </div>
    <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="page" :page-size="10" background layout="total,prev, pager, next" :total="total"></el-pagination>
  </div>
</template>
 <script>
export default {
  name: "businessTrustMe",
  // props: ["data"],
  data() {
    return {
      isloading: false,
      searchName: "",
      dataList: [],
      total: 0,
      page: 1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 列表数据
    getList() {
      this.isloading = true;
      this.axios.post(
        "/relation/User_Card/trustList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "his",
          page: this.page,
          status: 1,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.dataList = data.rows;
            this.total = data.total;
          } else if (data.status == "failed" && this.page != 1) {
            this.page -= 1;
            this.getList();
          } else {
            if (this.page == 1) {
              this.dataList = [];
              this.total = 0;
            }
          }
          this.isloading = false;
        }
      );
    },
    // 搜索
    searchTrustMe(type) {
      this.page = 1;
      this.getList();
    },
    // 重置
    onreset() {
      this.page = 1;
      this.searchName = "";
      this.getList();
    },
    // 翻页
    servicehandleCurrentChange2(val) {
      this.page = val;
      this.getList();
    },
    // 点击列表跳转至人员名片
    handleClickRyList(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.source_id,
          card_name: item.card_name
        }
      });
      window.open(href, item.card_name + item.source_id);
    },
    // 个人服务号表格行高
    rowH() {
      return "height:65px;";
    }
  }
};
</script>
 <style lang="less" scoped>
</style>
 
 