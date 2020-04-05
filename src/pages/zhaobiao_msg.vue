<template>
  <div>
    <!-- <el-header height="auto">
      <p style="font-size: 30px;width: 100%;color: black;overflow: hidden;margin-top: 20px;margin-bottom: 20px;text-align:center">{{jbxx.项目名称}}</p>
    </el-header> -->
    <div class="tittle">
      <p>{{jbxx.项目名称}}</p>
    </div>
    <el-main style="padding:0">
      <table border="1">
        <tr>
          <td rowspan="2" class="key">项目业主</td>
          <td rowspan="2" class="val">{{jbxx.项目业主?jbxx.项目业主:"-"}}</td>
          <td class="key">项目业主联系电话</td>
          <td class="val">{{jbxx.项目业主联系电话?jbxx.项目业主联系电话:"-"}}</td>
          <td class="key">招标人</td>
          <td class="val">{{jbxx.招标人?jbxx.招标人:"-"}}</td>
          <td class="key">招标人联系电话</td>
          <td class="val">{{jbxx.招标人联系电话?jbxx.招标人联系电话:"-"}}</td>
        </tr>
        <tr>
          <td class="key">招标代理机构</td>
          <td class="val">{{jbxx.招标代理机构?jbxx.招标代理机构:"-"}}</td>
          <td class="key">招标代理机构联系电话</td>
          <td class="val">{{jbxx.招标代理机构联系电话?jbxx.招标代理机构联系电话:"-"}}</td>
          <td class="key">开标地点</td>
          <td class="val">{{jbxx.开标地点?jbxx.开标地点:"-"}}</td>
        </tr>
        <tr>
          <td class="key">开标时间</td>
          <td class="val">{{jbxx.开标时间?jbxx.开标时间:"-"}}</td>
          <td class="key">公示期</td>
          <td class="val">{{jbxx.公示期?jbxx.公示期:"-"}}</td>
          <td class="key">投标最高限价（元）</td>
          <td class="val">{{jbxx['投标最高限价(元)']?jbxx['投标最高限价(元)']:"-"}}</td>
          <td class="key">投标最高限价（万元）</td>
          <td class="val">{{jbxx['投标最高限价(万元)']?jbxx['投标最高限价(万元)']:"-"}}</td>
        </tr>
      </table>
      <el-container width="1200">
        <div style="width:1200px;margin:0 auto;font-size:14px" >
          <el-table :data="tableData" border v-loading="table.loading" @sort-change="changeSort">
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{(table.page-1)*10+scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="公司名称" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="openGs(scope.row)">{{scope.row.company}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="zbmc" label="中标名次" width="120" align="center" sortable>
              <template slot-scope="scope">{{scope.row.zbmc_txt}}</template>
            </el-table-column>
            <el-table-column prop="tbbjw" label="投标报价(万元)" width="150" align="center" sortable></el-table-column>
            <el-table-column prop="psbjw" label="经评审的投标报价(万元)" width="200" align="center" sortable></el-table-column>
            <el-table-column prop="zhpf" label="综合评分" align="center" width="110" sortable></el-table-column>
            <el-table-column prop="is_zq" label="准确性" align="center" width="110" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.is_zq == '准'" style="color:red">准</span>
                <span v-if="scope.row.is_zq == '约'" style="color:blue">约</span>
              </template>
            </el-table-column>
            <el-table-column prop label="下浮" align="center" width="110" sortable>
              <template slot-scope="scope">{{scope.row.zdxf}}</template>
            </el-table-column>
          </el-table>
          <el-pagination background layout="total,prev, pager, next" :total="table.total" @current-change="tableChangePage" :current-page.sync="table.nowPage"></el-pagination>
        </div>
      </el-container>
    </el-main>
    <el-footer></el-footer>
  </div>
</template>
<script>
require("echarts/map/js/province/sichuan");
/* eslint-disable */
import tableInfo from "./template/tableInfo.vue";

export default {
  components: {
    tableInfo
  },
  data() {
    return {
      zb_id: this.$route.query.zb_id,
      type: this.$route.query.type, //0为总投标，1为有效投标
      // effective: this.$route.query.effective||0, //有效投标时的条数
      jbxx: {},
      table: {
        page: 1,
        total: 1,
        nowPage: 1,
        sort: "zbmc",
        order: "asc",
        loading: false
      },
      tableData: [],
      role: {}
    };
  },
  mounted() {},
  created() {
    document.title = "项目中标详情";
    this.fn_role();
    this.getWinBidDetail();
    this.getTableData();
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role() {
      let self = this;
      self.axios.post(
        "/index/mine/role",
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem("company_id")
        },
        data => {
          this.role = data;
        }
      );
    },
    getWinBidDetail() {
      this.axios.post(
        "/index/statistics_Bid/winBidDetail",
        {
          zb_id: this.zb_id
        },
        data => {
          this.jbxx = data.rows;
        }
      );
    },
    // 跳转
    openGs(row) {
      if (this.role.company_role !== "C") {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${row.company}`
        });
        window.open(href, "公司详情" + row.gs_id);
      } else {
        this.axios.post(
          "/index/mine/roleCompSource",
          { gs_id: row.gs_id },
          res => {
            // 获取跳转页面结果
            //   console.log(res)
            if (res === "四川省建设厅") {
              let { href } = this.$router.resolve({
                path: `/gs_scjst?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_scjst" + row.gs_id);
            } else {
              let { href } = this.$router.resolve({
                path: `/gs_building?gs_id=${row.gs_id}`
              });
              window.open(href, "/gs_building" + row.gs_id);
            }
          }
        );
      }
    },
    //获取表格内容
    getTableData() {
      this.table.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidCompany",
        {
          zb_id: this.zb_id,
          type: this.type,
          rows: 10,
          sort: this.table.sort,
          order: this.table.order,
          page: this.table.page
        },
        data => {
          this.tableData = data.rows;
          this.table.total = data.total;
          this.table.loading = false;
        }
      );
    },
    //改变排序方式
    changeSort(val) {
      if (val.prop) {
        this.table.sort = val.prop;
      } else {
        this.table.sort = "";
      }
      if (val.order == "descending") {
        this.table.order = "desc";
      } else if (val.order == "ascending") {
        this.table.order = "asc";
      } else {
        this.table.order = "desc";
        this.table.sort = "tbbjw";
      }
      this.getTableData();
    },
    //表格翻页
    tableChangePage(val) {
      this.table.page = val;
      this.getTableData();
    }
  }
};
</script>
<style scoped lang="less">
// 项目名称
.tittle {
  padding: 14px 0;
  -moz-box-shadow: 0px 0px 0px #e0e0e0;
  -webkit-box-shadow: 0px 0px 5px #e0e0e0;
  box-shadow: 0px 0px 5px #e0e0e0;
  width: 100%;
  text-align: center;
  p {
    width: 1680px;
    margin: 0 auto;
    font-size: 32px;
  }
}
// 基本信息表格
table {
  border-collapse: collapse;
  width: 1200px;
  margin: 30px auto;
  text-align: center;
  font-size: 14px;
  border-color: #c0c0c0;
  border: 1px solid #c0c0c0;
  tr {
    height: 60px;
  }
  .key {
    width: 130px;
    background: #f5f5f5;
  }
  .val {
    width: 160px;
    padding: 10px;
  }
}
#zbArea {
  width: 400px;
  height: 400px;
  margin: 50px 0 50px 0;
}

#fbArea {
  display: none;
  width: 400px;
  height: 400px;
  margin: 50px 0 50px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.main_ul {
  margin-left: 100px;
  margin-bottom: 10px;
}
.ul_li {
  float: left;
  width: 450px;
  margin-top: 5px;
  margin-bottom: 5px;
  list-style: none;
  font-size: 14px;
}
</style>

