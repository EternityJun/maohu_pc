<template>
  <div>
    <!--第一排 搜索框和添加按钮-->
    <el-row>
      <el-row style="line-height:30px;">
        <div>
          <span style="font-size: 20px">浏览记录</span>
        </div>
      </el-row>
      <el-row style="margin-top:-15px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item label="人员名称">
            <el-input v-model="searchName" clearable placeholder="请输入人员名称" @keyup.enter.native="searchHistory" @clear="searchHistory"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchHistory">搜索</el-button>
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
      <el-table :data="historyList" style="width: 100%" v-loading="isloading" border :row-style="rowH">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+(historyPage-1)*10+1}}</template>
        </el-table-column>
        <el-table-column prop="card_name" label="人员名称" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickRyList(scope.row)">{{scope.row.card_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="phone_one" label="电话号码" width="200" align="center"></el-table-column>
        <el-table-column prop="comp_name" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="comp_duty" label="职位" width="200" align="center"></el-table-column>
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="historyPage" :page-size="10" background layout="total,prev, pager, next" :total="historyTotal"></el-pagination>
  </div>
</template>
 <script>
export default {
  name: "businessHistory",
  // props: ["data"],
  data() {
    return {
      historyList: [],
      isloading: false,
      historyPage: 1,
      historyTotal: 0,
      searchName: ""
    };
  },
  created() {
    this.getHistoryList();
  },
  methods: {
    // 列表数据
    getHistoryList() {
      this.isloading = true;
      this.axios.post(
        "/relation/User_Card/browseList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName,
          cate: "my",
          page: this.historyPage,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.historyList = data.rows;
            this.historyTotal = data.total;
          } else if (data.status == "failed" && this.historyPage != 1) {
            this.historyPage -= 1;
            this.getHistoryList();
          } else {
            if (this.historyPage == 1) {
              this.historyList = [];
              this.historyTotal = 0;
            }
          }
          this.isloading = false;
        }
      );
    },
    // 搜索
    searchHistory(type) {
      this.historyPage = 1;
      this.getHistoryList();
    },
    // 重置
    onreset(type) {
      this.historyPage = 1;
      this.searchName = "";
      this.getHistoryList();
    },
    // 翻页
    servicehandleCurrentChange2(val) {
      this.historyPage = val;
      this.getHistoryList();
    },
    // 删除
    handleDelete(index, row) {
      this.axios.post(
        "/relation/User_Card/delBrowse",
        {
          user_id: this.$store.state.userInfo.user_id,
          target_id: row.target_id
        },
        data => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getHistoryList();
        }
      );
    },
    // 点击列表跳转至人员名片
    handleClickRyList(item) {
      let { href } = this.$router.resolve({
        path: "/personalCard",
        query: {
          target_id: item.target_id,
          card_name: item.card_name
        }
      });
      window.open(href, item.card_name + item.target_id);
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
 
 