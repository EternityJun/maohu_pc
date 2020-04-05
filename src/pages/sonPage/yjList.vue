<template>
  <div>
    <el-table :data="lsyjRows" style="width: 100%;" v-loading="loading">
      <el-table-column type="index" header-align="center" align="center">
        <template slot-scope="scope">{{scope.$index+1+(lsyjpage-1)*10}}</template>
      </el-table-column>
      <el-table-column prop="xmmc" label="项目名称" min-width="55%">
        <template slot-scope="scope">
          <div style="color:#3a8ee6;cursor:pointer" @click="onShowTk(scope.row)">{{scope.row.xmmc}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="money" label="金额(万元)" min-width="20%">
        <template slot-scope="scope">
          <span>{{scope.row.money}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="source" label="数据源" :filters="lsyjFilter" :filter-method="filterTag" filter-placement="bottom-end" min-width="20%">
        <template slot-scope="scope">{{scope.row.source}}</template>
      </el-table-column>
      <el-table-column label="数据状态" prop="flag" align="center" width="100"></el-table-column>
    </el-table>
    <el-pagination @current-change="changePage" background align="right" layout="total,prev, pager, next" :total="lsyjTotal"></el-pagination>
    <el-dialog title="业绩标段列表" :visible.sync="checkyjtk" width="80%">
      <bd-list :nowRow="childrow"></bd-list>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import bdList from "../template/projectBdList.vue";
export default {
    props: {
        needData: null
    },
    components: {
        bdList
    },
    watch: {
        needData() {
            this.getLsyj();
            this.getLsyjFilter();
        }
    },
    data() {
        return {
            checkyjtk: false,
            loading: false,
            gs_id: this.$route.query.gs_id,
            lsyjpage: 1,
            lsyjRows: [],
            lsyjTotal: 0,
            lsyjFilter: [],
            childrow: [],
            jbxx_id: this.$route.query.jbxx_id
        };
    },
    created() {
        this.getLsyj();
        this.getLsyjFilter();
    },
    methods: {
        // 获取类似业绩
        getLsyj() {
            this.loading = true;
            this.axios.post(
                "/index/search_yj/companyToYj", //类似业绩table
                {
                    yj_id: this.needData.yj_id,
                    gs_id: this.gs_id,
                    page: this.lsyjpage,
                    jbxx_id: this.jbxx_id,
                    type: 1,
                    row: 10
                },
                data => {
                    this.loading = false;
                    if (data.status == "success") {
                        this.lsyjRows = data.rows;
                        this.lsyjTotal = data.total;
                    }
                }
            );
        },
        //类似业绩数据源下拉筛选列表
        getLsyjFilter() {
            this.axios.post(
                "/index/search_yj/tableSource",
                {
                    yj_id: this.needData.yj_id
                },
                data => {
                    this.lsyjFilter = data.rows.map(v => {
                        let obj = {
                            text: v.source,
                            value: v.source
                        };
                        return obj;
                    });
                }
            );
        },
        filterTag(value, row) {
            //数据源事件
            return row.source === value;
        },
        onShowTk(row) {
            if (row.source == "全国建筑市场" || row.source == "四川建设厅") {
                this.checkyjtk = true;
                row.yj_id = this.needData.yj_id;
                this.childrow = row;
            } else if (row.source == "中标公示") {
                let { href } = this.$router.resolve({
                    path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                        ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
                });
                window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
            } else if (row.source == "投标使用") {
                let { href } = this.$router.resolve({
                    path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                        ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
                });
                window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
            } else {
                row.link
                    ? window.open(row.link)
                    : this.$message.error("没有原网址连接");
            }
        },
        // 业绩切换
        changePage(val) {
            this.lsyjpage = val;
            this.getLsyj();
        }
    }
};
</script>

