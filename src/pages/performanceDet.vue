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
        <el-form :inline="true" label-width="68px" @submit.native.prevent>
          <el-form-item label="数据来源">
            <el-select style="width:312px" v-model="leftAjaxData.source" placeholder="选择项目类型" @change="changeType(1)">
              <el-option v-for="item in sourceList" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select style="width:312px" v-model="leftAjaxData.projectType" placeholder="选择数据来源" @change="changeType(2)">
              <el-option v-for="item in gsyjXmlx" :key="item.label" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称">
            <el-input style="width:312px" v-model="leftAjaxData.xmmc" placeholder="请输入项目名称" @keydown.enter.native="searchYj()"></el-input>
          </el-form-item>
          <el-form-item label="资金范围">
            <el-input style="width:150px" v-model="leftAjaxData.minMoney" placeholder="金额" @keydown.enter.native="searchYj()">
              <template slot="append">万元</template>
            </el-input>
            <span>-</span>
            <el-input style="width:150px" v-model="leftAjaxData.maxMoney" placeholder="金额" @keydown.enter.native="searchYj()">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="开工日期">
            <el-date-picker style="width:150px" v-model="leftAjaxData.minKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
            <span>-</span>
            <el-date-picker style="width:150px" v-model="leftAjaxData.maxKgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          </el-form-item>
          <el-form-item label="竣工日期">
            <el-date-picker style="width:150px" v-model="leftAjaxData.minJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
            <span>-</span>
            <el-date-picker style="width:150px" v-model="leftAjaxData.maxJgsjTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          </el-form-item>
          <el-form-item label="中标日期">
            <el-date-picker style="width:150px" v-model="leftAjaxData.minZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
            <span>-</span>
            <el-date-picker style="width:150px" v-model="leftAjaxData.maxZbgsTime" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          </el-form-item>
          <el-form-item label="从业人员">
            <el-input style="width:312px" v-model="leftAjaxData.name" placeholder="人员名称" @keydown.enter.native="searchYj()"></el-input>
          </el-form-item>
        </el-form>

        <div style="text-align:center;padding:0 20px 10px 0">
          <el-button type="primary" @click="searchYj()">搜索</el-button>
          <el-button @click="resetYj()">重置</el-button>
        </div>
      </div>
      <div style="width:1200px;margin:0 auto">
        <el-table :data="tableData" style="width: 100%" v-loading="table.loading" border>
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(leftAjaxData.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="项目名称" align="center">
            <template slot-scope="scope">
              <span type="text" style="cursor:pointer;color:#409EFF" @click="openYjDet(scope.row,2)">{{scope.row.proj_name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="proj_type" label="项目类型" width="120" align="center"></el-table-column>
          <el-table-column prop="money" label="金额(万元)" width="120" align="center"></el-table-column>
          <el-table-column prop="proj_date" label="日期" width="120" align="center"></el-table-column>
          <el-table-column prop="remark" label="数据来源" align="center" width="150"></el-table-column>
          <!-- <el-table-column label="所投项目" align="center">
            <template slot-scope="scope">
              <span
                type="text"
                style="cursor:pointer;color:#409EFF"
                @click="openYjDet(scope.row,2)"
              >{{scope.row.proj_name}}</span>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination style="margin-top:10px" align="right" @current-change="tableChangePage" :current-page.sync="table.nowPage" :page-size="10" background layout="total,prev, pager, next" :total="table.total"></el-pagination>
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
                // gs_id: "7583",
                page: 1,
                loading: false,
                total: 0,
                nowPage: 1
            },
            leftAjaxData: {
                gs_id: localStorage.getItem("gs_id"),
                // gs_id: "7583",
                xmmc: "", // 项目名称
                name: "", // 从业人员
                minMoney: "", // 资金范围-小的
                maxMoney: "", // 资金范围-大的
                minZbgsTime: "", // 中标日期-小的
                maxZbgsTime: "", // 中标日期-大的
                minKgsjTime: "", // 开工日期-小的
                maxKgsjTime: "", // 开工日期-大的
                minJgsjTime: "", // 竣工日期-小的
                maxJgsjTime: "", // 竣工日期-大的
                projectType: this.$route.query.type || "全部", // 项目类型
                source: this.$route.query.source || "全部", // 数据来源
                page: 1,
                cate: 1,
                rows: 10
            },
            proArea: [], // 项目属地列表
            proStatus: [], // 项目状态列表
            gsyjXmlx: [
                { label: "全部", value: "全部" },
                { label: "建筑工程", value: "建筑工程" },
                { label: "市政工程", value: "市政工程" },
                { label: "水利工程", value: "水利工程" },
                { label: "公路工程", value: "公路工程" },
                { label: "其他工程", value: "其他工程" }
            ],
            sourceList: [
                { label: "全部", value: "全部" },
                { label: "全国建筑市场", value: "全国建筑市场" },
                { label: "四川省建设厅", value: "四川省建设厅" },
                { label: "全国公路市场", value: "全国公路市场" },
                { label: "全国水利市场", value: "全国水利市场" },
                { label: "中标公示", value: "中标公示" },
                { label: "投标使用", value: "投标使用" }
            ],
            xialaList: []
        };
    },
    mounted() {
        this.getProjectTypeList();
    },
    created() {
        document.title = "业绩";
        this.getTableData();
    },
    watch : {
        '$route': function(newVal) {
            window.location.reload();
        }
    },
    methods: {
        //请求下拉列表的数据
        getProjectTypeList() {
            this.axios.post("/firm/performance/projectType", {}, data => {
                var str = this.leftAjaxData.source;
                var str2 = this.leftAjaxData.projectType;
                this.gsyjXmlx = data.rows[0][str];
                this.sourceList = data.rows[1][str2];
                this.xialaList = data.rows;
            });
        },
        //请求左边列表接口
        getTableData() {
            this.table.loading = true;
            this.axios.post(
                "/firm/performance/projectLists",
                this.leftAjaxData,
                data => {
                    if (data.status == "success") {
                        this.tableData = data.rows || [];
                    } else {
                        this.tableData = [];
                    }
                    this.table.total = data.total || 0;
                    this.table.loading = false;
                }
            );
        },
        //左表翻页
        tableChangePage(val) {
            this.leftAjaxData.page = val;
            this.getTableData();
        },
        // 切换数据来源、项目类型
        changeType(type) {
            if (type == 1) { // 数据来源
              this.leftAjaxData.projectType = "全部";
            }
            if (type == 1) {
                var str = this.leftAjaxData.source;
                this.gsyjXmlx = this.xialaList[0][str];
                if (this.leftAjaxData.source == "全部") {
                    this.sourceList = [
                        { label: "全部", value: "全部" },
                        { label: "全国建筑市场", value: "全国建筑市场" },
                        { label: "四川省建设厅", value: "四川省建设厅" },
                        { label: "全国公路市场", value: "全国公路市场" },
                        { label: "全国水利市场", value: "全国水利市场" },
                        { label: "中标公示", value: "中标公示" },
                        { label: "投标使用", value: "投标使用" }
                    ];
                    // this.gsyjXmlx = [
                    //   { label: "全部", value: "全部" },
                    //   { label: "建筑工程", value: "建筑工程" },
                    //   { label: "市政工程", value: "市政工程" },
                    //   { label: "水利工程", value: "水利工程" },
                    //   { label: "公路工程", value: "公路工程" },
                    //   { label: "其他工程", value: "其他工程" }
                    // ];
                }
            } else {
                // 项目类型
                var str1 = this.leftAjaxData.projectType;
                console.log(str1, str1 === "全部", "1111");
                this.sourceList = this.xialaList[1][str1];
                console.log(this.sourceList, "quanbu=============");
                if (this.leftAjaxData.projectType == "全部") {
                    this.gsyjXmlx = [
                        { label: "全部", value: "全部" },
                        { label: "建筑工程", value: "建筑工程" },
                        { label: "市政工程", value: "市政工程" },
                        { label: "水利工程", value: "水利工程" },
                        { label: "公路工程", value: "公路工程" },
                        { label: "其他工程", value: "其他工程" }
                    ];
                    // this.sourceList = [
                    //   { label: "全部", value: "全部" },
                    //   { label: "全国建筑市场", value: "全国建筑市场" },
                    //   { label: "四川省建设厅", value: "四川省建设厅" },
                    //   { label: "全国公路市场", value: "全国公路市场" },
                    //   { label: "全国水利市场", value: "全国水利市场" },
                    //   { label: "中标公示", value: "中标公示" },
                    //   { label: "投标使用", value: "投标使用" }
                    // ];
                }
            }
            this.searchYj(type);
        },
        searchYj(type) {
            this.table.page = 1;
            this.table.nowPage = 1;
            this.getTableData();
        },
        resetYj() {
            this.table.page = 1;
            this.table.nowPage = 1;
            this.leftAjaxData = {
                gs_id: localStorage.getItem("gs_id"),
                // gs_id: '7583',
                xmmc: "",
                name: "",
                minMoney: "",
                maxMoney: "",
                minZbgsTime: "",
                maxZbgsTime: "",
                minKgsjTime: "",
                maxKgsjTime: "",
                minJgsjTime: "",
                maxJgsjTime: "",
                projectType: "全部",
                source: "全部",
                page: 1,
                cate: 1,
                rows: 10
            };
            this.sourceList = [
                { label: "全部", value: "全部" },
                { label: "全国建筑市场", value: "全国建筑市场" },
                { label: "四川省建设厅", value: "四川省建设厅" },
                { label: "全国公路市场", value: "全国公路市场" },
                { label: "全国水利市场", value: "全国水利市场" },
                { label: "中标公示", value: "中标公示" },
                { label: "投标使用", value: "投标使用" }
            ];
            let str = this.leftAjaxData.source;
            this.gsyjXmlx = this.xialaList[0][str];
            // this.gsyjXmlx = [
            //   { label: "全部", value: "全部" },
            //   { label: "建筑工程", value: "建筑工程" },
            //   { label: "市政工程", value: "市政工程" },
            //   { label: "水利工程", value: "水利工程" },
            //   { label: "公路工程", value: "公路工程" },
            //   { label: "其他工程", value: "其他工程" }
            // ];
            this.getTableData();
        },
        //打开业绩详情窗口
        openYjDet(row, type) {
            var source = "";
            if (row.remark == "全国建筑市场") {
                source = "jzsc";
                let { href } = this.$router.resolve({
                    path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
                });
                window.open(href, "业绩详情" + row.id);
            } else if (row.remark == "四川省建设厅") {
                source = "jst";
                let { href } = this.$router.resolve({
                    path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
                });
                window.open(href, "业绩详情" + row.id);
            } else if (row.remark == "全国公路市场") {
                source = "gl";
                let { href } = this.$router.resolve({
                    path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
                });
                window.open(
                    href,
                    "业绩详情" + row.proj_name + row.proj_id + source
                );
            } else if (row.remark == "全国水利市场") {
                source = "sl";
                let { href } = this.$router.resolve({
                    path: `/yjDet?proj_id=${row.proj_id}&source=${source}
          `
                });
                window.open(
                    href,
                    "业绩详情" + row.proj_name + row.proj_id + source
                );
            } else {
                // 跳转路由
                let { href } = this.$router.resolve({
                    path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
                        row.proj_id
                    }&xmmc=${row.proj_name}&type=zbgs&source=${row.source}`
                });
                window.open(
                    href,
                    "中标公示" + row.proj_id + row.zbxx_id + row.proj_name
                );
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
