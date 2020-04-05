<!-- 公司定制 -->
<template>
  <div>
    <body-top></body-top>
    <div class="body">
      <div class="search_div">
        <p>项目定制</p>
        <div style="widht:500px">
          <el-input clearable v-model="iptval" @keydown.enter.native="searchFn" placeholder="请输入项目名称">
            <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" border  v-loading="loading">
        <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="xmmc" label="项目名称" width="500"></el-table-column>
        <el-table-column align="center" prop="xmyz" label="项目业主" width="200"></el-table-column>
        <el-table-column align="center" prop="xmdq" label="项目地区"></el-table-column>
        <el-table-column align="center" prop="area" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="add(scope.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="right"
        style="margin-top:10px"
        @current-change="changePage"
        background
        layout="total,prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iptval: "",
      loading: false,
      tableData: [],
      total: 0,
      page: 1
    };
  },
  created() {
    document.title = "公司定制"
    this.ajaxGetList();
  },
  methods: {
    //搜索变
    searchFn() {
      this.ajaxGetList();
      this.page = 1;
    },
    changePage(e) {
      this.page = e.value;
      this.ajaxGetList();
    },
    add(row) {
      this.axios.post(
        "/index/project/addProject",
        {
          xmmc: row.xmmc,
          area: row.xmdq,
          xmyz: row.xmyz,
          company_id: row.gs_id
        },
        data => {
          this.ajaxGetList();
        }
      );
    },
    //获取定制数据
    ajaxGetList() {
      this.loading = true;
      this.axios.post(
        "/index/company/customProject",
        {
          company_id: localStorage.getItem("company_id"),
          xmmc: this.iptval,
          page: this.page
        },
        data => {
          this.loading = false;
          this.tableData = data.rows;
          this.total = data.total;
        }
      );
    }
  }
};
</script>

<style>
.search_div .el-input-group__append {
  background-color: #409eff;
  border-color: #409eff;
  color: #ffffff;
}
</style>

<style scoped lang="less">
.body {
  padding-top: 20px;
  width: 1200px;
  margin: 0 auto;
}
.search_div {
  align-items: center;
  padding-bottom: 10px;
  display: flex;
  p {
    flex: 1;
    font-size: 20px;
  }
}
</style>
