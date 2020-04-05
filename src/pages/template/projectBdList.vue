<!--业绩标段列表-->
<template>
  <div>
    <el-table :data="tableData" style="width: 100%;" v-loading="loading" border>
      <el-table-column type="index" label="序号" header-align="center" align="center" width="60"></el-table-column>
      <el-table-column align="center" prop="xmmc" label="项目名称" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="open_tk(scope.row)">{{scope.row.xmmc}}</el-button>
          <!-- <el-button type="text">
            <a style="color:#3a8ee6" :href="scope.row.link" target="_blank">{{scope.row.xmmc}}</a>
          </el-button> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="jgbabh" label="竣工备案编号"></el-table-column>
      <el-table-column align="center" prop="je" label="实际造价(万元)"></el-table-column>
      <el-table-column align="center" prop="mj" label="实际面积(平方米)"></el-table-column>
      <el-table-column align="center" prop="sjkgrq" label="实际开工日期"></el-table-column>
      <el-table-column align="center" prop="sjjgrq" label="实际竣工验收日期"></el-table-column>
      <el-table-column align="center" prop="have_bafinish" label="竣工验收">
        <template slot-scope="scope">
          <i v-if="scope.row.have_bafinish" class="el-icon-check have"></i>
          <i v-else class="el-icon-close nohave"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="have_buildlise" label="施工许可">
        <template slot-scope="scope">
          <i v-if="scope.row.have_buildlise" class="el-icon-check have"></i>
          <i v-else class="el-icon-close nohave"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="have_contract" label="合同备案">
        <template slot-scope="scope">
          <i v-if="scope.row.have_contract" class="el-icon-check have"></i>
          <i v-else class="el-icon-close nohave"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="have_censor" label="施工图审查">
        <template slot-scope="scope">
          <i v-if="scope.row.have_censor" class="el-icon-check have"></i>
          <i v-else class="el-icon-close nohave"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="have_tender" label="招投标">
        <template slot-scope="scope">
          <i v-if="scope.row.have_tender" class="el-icon-check have"></i>
          <i v-else class="el-icon-close nohave"></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  props: {
    nowRow: null
  },
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  watch: {
    nowRow() {
      this.getTableList()
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    open_tk(row) {
      let { href } = this.$router.resolve({
        path: `/yjDet?proj_id=${row.proj_id}&source=jzsc`
      })
      window.open(href, '业绩详情' + row.xmmc + row.proj_id)
    },
    //获取列表
    getTableList() {
      this.loading = true
      let ajax_data = {}
      let url = '/index/search_ry/checkSimilarProject'
      if (this.nowRow.name) {
        ajax_data = {
          gs_id: this.nowRow.gs_id,
          proj_id: this.nowRow.proj_id,
          jgbabh: 1,
          yj_id: this.nowRow.yj_id,
          name: this.nowRow.name
        }
      } else {
        ajax_data = {
          gs_id: this.nowRow.gs_id,
          proj_id: this.nowRow.proj_id,
          jgbabh: this.nowRow.jgbabh,
          yj_id: this.nowRow.yj_id,
          tableName: this.nowRow.model
        }
        url = '/index/search_yj/secondYj'
      }
      this.axios.post(url, ajax_data, data => {
        this.tableData = data.rows || []
        this.loading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.have {
  color: #06cd3e;
  font-size: 16px;
  font-weight: 600;
}
.nohave {
  color: red;
  font-size: 16px;
  font-weight: 600;
}
</style>



