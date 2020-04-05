<template>
  <div>
    <!-- <el-header height="auto">
      <p style="font-size: 30px;width: 100%;color: black;overflow: hidden;margin-top: 20px;margin-bottom: 20px;text-align:center">{{jbxx.gsmc}}</p>
    </el-header> -->
    <div class="tittle">
      <p>{{jbxx.gsmc}}</p>
    </div>
    <el-main style="padding:0;width:1200px;margin:0 auto">
      <el-table :data="tableData" border style="width: 100%;font-size:14px" v-loading="table.loading" @sort-change="changeSort">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            {{(table.page-1)*10+scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <p style="color:#409EFF;cursor:pointer" @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="zbr" label="项目业主" width="330" align="center"></el-table-column>
        <el-table-column prop="kbsj" label="开标时间" width="110" align="center" sortable>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total,prev, pager, next" :total="table.total" @current-change="tableChangePage" :current-page.sync="table.nowPage">
      </el-pagination>
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>
<script>
/* eslint-disable */
export default {
    components: {},
    data() {
        return {
            jbxx: {
                gsmc: localStorage.getItem("xm_gsmc")
            },
            tableData: [],
            table: {
                total: 0,
                page: 1,
                nowPage: 1,
                loading: false,
                sort: "",
                order: "desc"
            }
        };
    },
    mounted() {},
    created() {
        document.title = this.jbxx.gsmc;
        this.getTableData();
    },
    methods: {
        tableChangePage(val) {
            this.table.page = val;
            this.getTableData();
        },
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
                this.table.sort = "kbsj";
            }
            this.getTableData();
        },
        //点击项目名称
        openXmmc(row) {
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                    ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        // 点击表格行 项目名称
        handleClickProjectName(row) {
            // 跳转路由
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
                    row.id
                }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        getTableData() {
            this.table.loading = true;
            this.axios.post(
                "/index/statistics_Bid/winBidCompProj",
                {
                    zb_id: localStorage.getItem("xm_zb_id"),
                    page: this.table.page,
                    sort: this.table.sort,
                    order: this.table.order,
                    rows: 10
                },
                data => {
                    this.tableData = data.rows;
                    this.table.total = data.total;
                    this.table.loading = false;
                }
            );
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
  margin-bottom: 30px;
  p {
    width: 1680px;
    margin: 0 auto;
    font-size: 32px;
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

