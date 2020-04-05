<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border v-loading="loading">
      <el-table-column label="序号" header-align="center" align="center" width="80">
        <template slot-scope="scope">{{scope.$index+(page-1)*10+1}}</template>
      </el-table-column>
      <el-table-column prop="xmmc" label="项目名称" align="center">
        <template slot-scope="scope">
          <el-button @click="open_gs(scope.row)" type="text">{{scope.row.xmmc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="zgxjw" label="最高限价(万元)" width="180" align="center">
      </el-table-column>
      <el-table-column prop="kbsj" label="开标日期" width="180" align="center">
      </el-table-column>
      <el-table-column prop="area" label="项目所在地" width="180" align="center">
      </el-table-column>
    </el-table>
    <el-pagination align="right" :current-page.sync="page" style="margin-top:10px" @current-change="changePage" background layout="total,prev, pager, next" :total="total"></el-pagination>

  </div>
</template>

<script>
export default {
    props: ["xm"],
    data() {
        return {
            loading: false,
            tableData: [],
            page: 1,
            total: 0
        };
    },
    mounted() {
        console.log(this.xm);
        this.companyBehaviorDetail();
    },
    watch: {
        xm: function() {
            this.page = 1;
            this.companyBehaviorDetail();
        }
    },
    methods: {
        open_gs(row) {
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                    ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        //改变页面
        changePage(val) {
            this.page = val;
            this.companyBehaviorDetail();
        },
        companyBehaviorDetail() {
            let params = {
                thread_id: this.xm.thread_id,
                jbxx_id: this.xm.jbxx_id,
                type: this.xm.type,
                page: this.page,
                gs_id: this.xm.gs_id,
                sortField: this.xm.sortField
            };
            let self = this;
            this.loading = true;
            this.axios.post(
                "/index/Analysis_report/companyBehaviorDetail",
                params,
                data => {
                    this.loading = false;
                    if (data.status == "success") {
                        this.tableData = data.rows;
                        this.total = data.total;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                        this.page = 1;
                        if (
                            data.message ==
                                "尚无该方案信息,请检查该方案是否存在并确保已运行" ||
                            data.message == "还未操作公司行为数据分析"
                        ) {
                            self.$message.error(data.message);
                        }
                    }
                }
            );
        }
    }
};
</script>
<style lang="less" scoped>
</style>
