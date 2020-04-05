<!--项目列表-->
<template>
  <el-container>
    <el-header height="auto">
      <div class="btdiv">
        <p class="bt" style="flex:1">{{bt}}</p>
      </div>
      <el-row class="border-b">
        <el-col :xs="0" :span="2" class="bt2">
          <p>我的项目</p>
        </el-col>
        <el-col :xs="0" :span="12" align="left">
          <el-button type="success" @click="onNewItem">新建项目</el-button>
          <el-button type="success" @click="dialogDrVisible = true">导入</el-button>
          <el-button type="success" @click="myreserveVisible = true">我的预定</el-button>
          <el-button type="warning" @click="onMidden">回收站</el-button>
        </el-col>
        <el-col :xs="24" :span="10">
          <el-form :inline="true" class="demo-form-inline" align="right" @submit.native.prevent>
            <el-form-item>
              <el-input v-model="searchxmmc" placeholder="请输入项目名称" @keyup.enter.native="onSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button type="primary" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table :data="tableData" :header-cell-style="{background:'#f5f7fa'}"  style="width: 100%;height:100%" v-loading="loading">
        <el-table-column type="index"></el-table-column>
        <el-table-column align="left" prop="date1" label="项目名称">
          <template slot-scope="scope">
            <div v-html="scope.row.xmmc"></div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="xmdq" label="项目地区">
        </el-table-column>
        <el-table-column align="center" prop="jd" label="进度" width="240">
          <template slot-scope="scope">
            <div class="jd-bj" v-html="scope.row.status"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="table_click(scope.row)" type="primary">查看</el-button>
            <el-button size="small" @click="onDelRow(scope.row,0)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination ref="fenye" @current-change="handleSizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>
    </el-footer>
    <el-dialog width="80%" title="招标公告" :visible.sync="dialogDrVisible">
      <item-import types="首页列表" @onChild_row="onChild_row"></item-import>
    </el-dialog>
    <el-dialog title="我的预定" :visible.sync="myreserveVisible">
      <my-reserve @onChild_row="onChild_row" :myreserveVisible="myreserveVisible"></my-reserve>
    </el-dialog>
    <el-dialog title="新建项目" :visible.sync="visibleNewItem">
      <nwe-item @onAddNewItem="onAddNewItem"></nwe-item>
    </el-dialog>
    <el-dialog title="回收站" :visible.sync="visibleMidden" width="70%">
      <el-table :data="middenTable" v-loading="loadingMidden">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="项目名称" prop="xmmc"></el-table-column>
        <el-table-column label="项目地区" align="center" prop="xmdq"></el-table-column>
        <el-table-column label="进度" prop="jd" align="center" width="240">
          <template slot-scope="scope">
            <div class="jd-bj" v-html="scope.row.status"></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="onDelRow(scope.row,1)">还原</el-button>
            <el-button type="danger" size="small" @click="onDelRow(scope.row,2)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px" ref="fenye" @current-change="middenhandleSizeChange" align="right" background layout="total,prev, pager, next" :total="middentotal"></el-pagination>
    </el-dialog>
  </el-container>
</template>

<script>
/* eslint-disable */
import ItemImport from "./ItemImport";
import nweItem from "./template/newItem";
import myReserve from "./template/myReserve";
import { valid } from "semver";
import Cookie from "./../cookie";
export default {
  name: "ItemList",
  components: {
    ItemImport,
    nweItem,
    myReserve
  },
  data() {
    return {
      newItem: {
        name: localStorage.getItem("username")
      },
      visibleNewItem: false, //新建项目弹框
      visibleMidden: false, //回收站
      loading: false,
      myreserveVisible:false,//我的预定弹框
      loadingMidden: false,
      //隐藏导入弹框
      dialogDrVisible: false,
      bt: "筑标",
      searchxmmc: "",
      nowPage: 1,
      listHeight: 0,
      total: 0,
      tableData: [],
      middenTable: [],
      middentotal:0,
      middennowPage:1
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //点击新建
    onNewItem() {
      this.visibleNewItem = true;
    },
    //回收站
    onMidden() {
      this.visibleMidden = true;
      this.getList(0);
    },
    //回调
    onAddNewItem() {
      this.visibleNewItem = false;
      this.getList();
    },
    //子级传父级导入数据
    onChild_row(row) {
      this.getList();
    },
    //请求列表valid==0为回收站
    getList(valid) {
      let ajax_data = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.searchxmmc
      };
      if (valid == 0) {
        //回收站
        ajax_data.xmmc = "";
        ajax_data.valid = valid;
        this.loadingMidden = true;
        ajax_data.page = this.middennowPage
      } else {
        this.loading = true;
        ajax_data.page = this.nowPage
      }
      this.axios.post("/index/Mine/lists", ajax_data, data => {
        if (valid == 0) {
          this.middenTable = data.rows;
          this.loadingMidden = false;
          this.middentotal = data.total || 0;
        } else {
          this.tableData = data.rows;
          this.loading = false;
          this.total = data.total || 0;
        }
      });
    },
    //获取页面高度
    getH() {
      let top_h = this.$refs.topH.clientHeight;
      let fenye_h = this.$refs.fenye.$el.clientHeight;
      let winH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      console.log(winH);
      this.listHeight = parseInt(winH - top_h - fenye_h);
      console.log(this.listHeight);
    },
    //列表分页
    handleSizeChange(val) {
      this.nowPage = val;
      this.getList();
    },
    // 垃圾箱分页
    middenhandleSizeChange(val){
      this.middennowPage = val
      this.getList(0);
    },
    // 搜索
    onSearch: function() {
      this.nowPage = 1;
      this.total = 0;
      this.getList();
    },
    onReset: function() {
      this.nowPage = 1;
      this.total = 0;
      this.searchxmmc = "";
      this.getList();
    },
    //点击列表
    table_click(row) {
      let { href } = this.$router.resolve({
        path: `/iteminfo?jbxx_id=${row.id}`
      });
      window.open(href, 'j'+row.id);
      // this.$router.push({ path: "/iteminfo", query: { jbxx_id: row.id } });
    },
    //删除还原
    onDelRow(row, valid) {
      if (valid == 2) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.myListCaozuo(row,valid)
          })
          .catch(() => {});
      }else{
        this.myListCaozuo(row,valid)
      }
    },
    //删除还原
    myListCaozuo(row, valid) {
      this.axios.post(
        "/index/Mine/del_recover",
        {
          jbxx_id: row.id,
          valid
        },
        data => {
          if ((data.status = "success")) {
            this.$message.success("成功");
            if (valid != 2) {
              if (valid == 1) {
                this.getList(0);
              }
              this.getList();
            } else {
              //删除回收站数据
              this.getList(0);
            }
          } else {
            this.$message.console.error("失败");
          }
        }
      );
    },
  }
};
</script>

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
  font-weight: 600;
}
.jd-bj {
  color: #ffffff;
  text-align: center;
  background-image: url("../assets/jd.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.el-header{
  padding: 0 
}
.btdiv{
  color: #ffffff;
  margin-bottom: 20px;
  background-color: #324157;
  display: flex;
  padding: 0 50px;
}
.border-b {
  margin: 0 40px;
  border-bottom: 2px solid #06b6ff;
}
</style>
