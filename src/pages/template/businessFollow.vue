<template>
  <div>
    <!--第一排 搜索框和添加按钮-->
    <el-row>
      <el-row style="line-height:30px;">
        <div>
          <span style="font-size: 20px">我的关注</span>
        </div>
      </el-row>
      <el-row style="margin-top:-15px;">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <el-form-item label="人员名称">
            <el-input v-model="searchName4" clearable placeholder="请输入人员名称" @keyup.enter.native="searchFollow" @clear="searchFollow"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchFollow">搜索</el-button>
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
      <el-table :data="tableData" style="width: 100%" v-loading="isloading" border :row-style="rowH">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index+(followPage-1)*10+1}}</template>
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
    <el-pagination style="margin-top:20px" align="right" @current-change="servicehandleCurrentChange2" :current-page.sync="followPage" :page-size="10" background layout="total,prev, pager, next" :total="followTotal"></el-pagination>
  </div>
</template>
 <script>
export default {
  name: "businessFollow",
  // props: ["data"],
  data() {
    return {
      tableData: [],
      isloading: false,
      followPage: 1,
      followTotal: 0,
      searchName4: ""
    };
  },
  created() {
    this.getFollowList();
  },
  methods: {
    // 我的关注 列表数据
    getFollowList() {
      this.isloading = true;
      this.axios.post(
        "/relation/User_Card/concernList",
        {
          user_id: this.$store.state.userInfo.user_id,
          name: this.searchName4,
          cate: "my",
          page: this.followPage,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.tableData = data.rows;
            this.followTotal = data.total;
          } else if (data.status == "failed" && this.followPage != 1) {
            this.followPage -= 1;
            this.getFollowList();
          } else {
            if (this.followPage == 1) {
              this.tableData = [];
              this.followTotal = 0;
            }
          }
          this.isloading = false;
        }
      );
    },
    // 搜索
    searchFollow(type) {
      this.followPage = 1;
      this.getFollowList();
    },
    // 重置
    onreset(type) {
      this.followPage = 1;
      this.searchName4 = "";
      this.getFollowList();
    },
    // 翻页
    servicehandleCurrentChange2(val) {
      this.followPage = val;
      this.getFollowList();
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("是否确定删除该关注？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios.post(
            "/relation/User_Card/delConcern",
            {
              user_id: this.$store.state.userInfo.user_id,
              target_id: row.target_id
            },
            data => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getFollowList();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
 
 