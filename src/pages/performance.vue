<!--项目列表-->
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
<template>
  <div>
    <div>
      <body-top></body-top>
      <!-- 导航栏 -->
      <head-menu :index="'/performance'"></head-menu>
      <div style="width:1200px;margin:0 auto;margin-top:20px;">
        <el-table
          :data="tableData"
          border
          style="width: 100%;font-size:14px"
          v-loading="table.loading"
          :span-method="arraySpanMethod"
          key="aaa"
        >
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(table.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="source" label="数据来源" align="center">
            <template slot-scope="scope">
              <span
                style="color:#409EFF;cursor:pointer"
                @click="openSource(scope.row)"
              >{{scope.row.source}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proj_type" label="类别" width="400" align="center"></el-table-column>
          <el-table-column prop="count" label="条数" align="center" width="340">
            <template slot-scope="scope">
              <span
                style="color:#409EFF;cursor:pointer"
                @click="openYjDet(scope.row)"
              >{{scope.row.count}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { valid } from "semver";
import Cookie from "./../cookie";
import head_menu from "./template/head_menu.vue";
import tableMregeFn from "./../tableMrege";

export default {
  components: {
    headMenu: head_menu
  },
  data() {
    return {
      tableData: [],
      table: {
        gs_id: localStorage.getItem("gs_id"),
        // gs_id: '7583',
        page: 1,
        loading: false
      }
    };
  },
  mounted() {},
  created() {
    document.title = "业绩管理";
    this.getTableData();
  },
  watch: {},
  methods: {
    getTableData() {
      this.axios.post(
        "/firm/performance/externalStatistics", //类似业绩table
        {
          gs_id: this.table.gs_id
        },
        data => {
          // 合并行
          if (data.status == "success") {
            this.merge_array = tableMregeFn.tableMrege(data.rows);
          } else {
            this.merge_array = [];
          }
          this.tableData = data.rows;
        }
      );
    },
    // 合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property;
      if (prop) {
        //如果存在prop
        const _row = this.merge_array[rowIndex][prop];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //打开该业绩列表
    openYjDet(row) {
      console.log(1)
      if (row.source.indexOf("全国建筑市场") > -1) {
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国建筑市场&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }else if(row.source.indexOf("四川省建设厅")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=四川省建设厅&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }else if(row.source.indexOf("全国公路市场")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国公路市场&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("全国水利市场")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国水利市场&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("中标公示")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=中标公示&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("投标使用")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=投标使用&type=${row.proj_type}
          `
        });
        window.open(href, 'performanceDet');
      }
    },
    openSource(row){
      if (row.source.indexOf("全国建筑市场") > -1) {
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国建筑市场
          `
        });
        window.open(href, 'performanceDet');
      }else if(row.source.indexOf("四川省建设厅")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=四川省建设厅
          `
        });
        window.open(href, 'performanceDet');
      }else if(row.source.indexOf("全国公路市场")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国公路市场
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("全国水利市场")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=全国水利市场
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("中标公示")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=中标公示
          `
        });
        window.open(href, 'performanceDet');
      }
      else if(row.source.indexOf("投标使用")>-1){
        let { href } = this.$router.resolve({
          path: `/performance_det?source=投标使用
          `
        });
        window.open(href, 'performanceDet');
      }
    }
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0 20px 20px 20px;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

.el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.top-position {
  padding-bottom: 10px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background: #ffffff;
}

.bt2 {
  font-size: 18px;
  line-height: 40px;
}

.jd-bj {
  color: #ffffff;
  text-align: center;
  background-image: url("../assets/jd.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.el-header {
  padding: 0;
}

.btdiv {
  color: #ffffff;
  margin-bottom: 20px;
  background-color: #324157;
  display: flex;
  padding: 0 50px;
}

.border-b {
  margin: 0 40px;
}

.liu {
  margin: 0 auto;
  width: 1200px;
}

.liu li {
  position: relative;
  cursor: pointer;
  height: 58px;
  float: left;
  list-style: none;
  width: 235px;
}
.liu li img {
  position: absolute;
}

.liu2 li {
  height: 22px;
  float: left;
  position: absolute;
  list-style: none;
}
.add-text {
  font-size: 26px;
  text-align: center;
  margin: 10px 0;
}
.add-ban {
  border-top: 1px solid #cccccc;
}
.add-input {
  width: 400px;
}
.add-form {
  margin: 10px 0;
  overflow: hidden;
}
.add-form .add-form-item1:nth-child(even) {
  float: right;
}
.add-form .add-form-item2:nth-child(even) {
  float: right;
}
.table_footer {
  width: 1200px;
  height: 1000px;
  margin-left: 25px;
  display: block;
  margin-right: 25px;
  margin: 0 auto;
}
</style>
