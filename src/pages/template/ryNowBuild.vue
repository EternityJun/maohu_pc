<!--人员在建业绩列表-->
<template>
  <div>
    <el-table
      :data="tableData"
      
      style="width: 100%;"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="xmmc"
        label="项目名称"
      >
         <template slot-scope="scope">
          <el-button type="text">
              <a style="color:#3a8ee6;text-decoration:none" :href="scope.row.http" target="_blank">{{scope.row.xmmc}}</a>
          </el-button>
      </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="qymc"
        label="企业名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="xm"
        label="姓名"
      >
      <template slot-scope="scope">
          <el-button type="text">
              <a style="color:#3a8ee6;text-decoration:none" :href="scope.row.ry_http" target="_blank">{{scope.row.xm}}</a>
          </el-button>
      </template>
      </el-table-column>
       <el-table-column
        align="center"
        prop="drjs"
        label="担任角色"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* eslint-disable */
import bdList from "./projectBdList.vue";
export default {
  props: {
    ry_row: null
  },
  components: {
    bdList
  },
  watch:{
    ry_row(){
      this.getTableList()
    }
  },
  data() {
    return {
      tableData: [],
      loading: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //获取列表
    getTableList() {
      this.loading = true;
      let ajax_data = {
       ryid:this.ry_row.ryid
      };
      if(this.ry_row.rylb == '注册安全工程师'){
        ajax_data.type = '注册安全工程师';
        ajax_data.gs_id = this.ry_row.gs_id;
        ajax_data.name = this.ry_row.name
      }
      if(this.ry_row.zw == '水利人员'){
        ajax_data.type = '水利人员';
        ajax_data.gs_id = this.ry_row.gs_id;
        ajax_data.name = this.ry_row.name
      }
      this.axios.post("/index/search_ry/checkOnBuild", ajax_data, data => {
        this.tableData = data.rows || [];
        this.loading = false;
      });
    }
  }
};
</script>