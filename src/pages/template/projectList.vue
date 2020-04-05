<!--业绩列表-->
<template>
  <div>
    <el-table :data="tableData"  style="width: 100%;" v-loading="loading">
      <el-table-column type="index" label="序号" header-align="center" align="center"></el-table-column>
      <el-table-column align="center" prop="xmmc" label="项目名称">
        <template slot-scope="scope">
          <el-button type="text" @click="open_tk(scope.row)">{{scope.row.xmmc}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="je" label="金额(万元)"></el-table-column>
      <el-table-column align="center" prop="source" label="数据源"></el-table-column>
    </el-table>
    <el-dialog append-to-body title="业绩标段列表" :visible.sync="checkyjtk" width="80%">
      <bd-list :nowRow="childrow"></bd-list>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import bdList from "./projectBdList.vue";
export default {
  props: {
    nowRow: null
  },
  components: {
    bdList
  },
  watch: {
    nowRow() {
      this.getTableList();
    }
  },
  data() {
    return {
      checkyjtk: false,
      tableData: [],
      loading: false,
      childrow: null
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //项目标段
    open_tk(row) {
      this.checkyjtk = true;
      var obj = this.nowRow;
      obj.proj_id = row.proj_id;
      this.childrow = obj;
    },
    //获取列表
    getTableList() {
      console.log(this.nowRow)
      this.loading = true;
      let ajax_data = {
        gs_id: this.nowRow.gs_id,
        proj_id: this.nowRow.proj_id,
        yj_id: this.nowRow.yj_id,
        jgbabh: 0,
        name: this.nowRow.name
      };
      this.axios.post("/index/search_ry/checkSimilarProject", ajax_data, data => {
        this.tableData = data.rows || [];
        this.loading = false;
      });
    }
  }
};
</script>


