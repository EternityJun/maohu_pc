<!--  -->
<template>
  <div class="qyProjectTable">
      <el-form inline ref="form1" :model="searchData" @submit.native.prevent>
            <el-form-item label="项目名称" prop="xmmc">
              <el-input
                style="width:400px"
                @keyup.enter.native="onSearch"
                @clear='onSearch'
                v-model="searchData.xmmc"
                placeholder="输入项目名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="招标类别" prop="zblb">
              <el-select v-model="searchData.zblb" clearable style="width:400px"  @change="onSearch">
                <el-option v-for="one in zblblist" :key="one" :value="one" :label="one"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类别" prop="xmlb">
              <el-select
                v-model="searchData.xmlb"
                clearable
                @change="onSearch"
                style="width:400px"
              >
                <el-option
                  v-for="one in xmlblist"
                  :key="one.label"
                  :value="one.value"
                  :label="one.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form inline ref="form2" :model="searchData" @submit.native.prevent>
            <el-form-item label="所属地区" prop="area" >
              <el-select v-model="searchData.area"  style="width:400px"  @change="onSearch">
                <el-option
                  v-for="one in this.ssdqList"
                  :key="one.value"
                  :value="one.value"
                  :label="one.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期" prop="date">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="searchData.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:400px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tablaData" v-loading="searchData.loading" border>
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">{{scope.$index+(searchData.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="bt" label="项目名称" align="center">
              <template slot-scope="scope">
                <div
                  v-html="scope.row.bt"
                  class="link_color"
                  @click="openGs(scope.row)"
                >{{scope.row.bt}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ssd" label="建设地点" align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.ssd"></div>
              </template>
            </el-table-column>
            <el-table-column prop="zblb" label="招标类别" align="center" width="90">
              <template slot-scope="scope">
                <div v-html="scope.row.zblb"></div>
              </template>
            </el-table-column>
            <el-table-column prop="fbsj" align="center" label="发布日期" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.fbsj"></div>
              </template>
            </el-table-column>
            <el-table-column prop="jzrq" label="报名截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tb_jzrq" label="投标截止日期" align="center" width="120">
              <template slot-scope="scope">
                <div v-html="scope.row.tb_jzrq"></div>
              </template>
            </el-table-column>
            <el-table-column label="导入" width="100" align="center">
              <template slot-scope="scope">
                <el-button
                  disabled
                  v-if="scope.row.selectName == '已关联'||scope.row.is_relation == 1"
                  style="color:#d1d1d1"
                  size="mini"
                >已关联</el-button>
                <el-button
                  v-else-if="scope.row.selectName == '关联'"
                  size="mini"
                  @click="onClick_import(scope)"
                >关联</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            ref="fenye"
            style="margin-top:20px"
            @current-change="handleSizeChange"
            align="right"
            background
            layout="total,prev, pager, next"
            :total="searchData.count||0"
          ></el-pagination>
  </div>
</template>

<script>
export default {
    name:"qyProjectTable",
  data () {
    return {
         zblblist: ["全部", "公招", "比选", "采购"],
      // xmlblist: ["全部","建筑工程", "公路", "市政", "水利", "其他"],
      xmlblist: [
        { value: "", label: "全部" },
        { value: "建筑工程", label: "建筑工程" },
        { value: "公路", label: "公路" },
        { value: "市政", label: "市政" },
        { value: "其他", label: "其他" }
      ],
      ssdqList:[],
        searchData: {
        xmmc: "",
        zblb: "",
        xmlb: "",
        area: "",
        date: "",
        page: 1,
        rows: 10,
        conut:0,
        loading:true
      },
       upDataForm: {
       
        zbxx_bt: "",
        zbxx_id: "",
      },
      role:{}
    };
  },
  props:['qyProjectRowData'],
  created(){
      this.fn_role()
      this.getAreaType()
      this.ajax_list()
  },
  methods: {
      fn_role () {
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
    openGs(row) {
      let myPath 
      if(this.thisPageName == "qyfwqPage"){
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.bt ? row.bt : row.xmmc}&login_service_id=${this.$route.query.login_service_id}&gsmc=${this.$route.query.gsmc}&source=${row.source}`
      } else{
        myPath = `/enterpriseDetails?zbxx_id=${
          row.id ? row.id : row.zbxx_id
        }&zbgs_id=&type=zbxx&xmmc=${row.bt ? row.bt : row.xmmc}&source=${row.source}`
      }
      let { href } = this.$router.resolve({
        path: myPath
      });
      window.open(
        href,
        "招标信息" + row.id ? row.id : row.zbxx_id + row.bt ? row.bt : row.xmmc
      );
    },
    onReset () {
        this.searchData.loading = true
        this.searchData.page = 1;
        this.total = 0;
        this.$refs.form1.resetFields();
        this.$refs.form2.resetFields();
        this.ajax_list();
      },
    getAreaType () {
      let obj = {
        type: "招中标"
      };
      this.axios.post("/firm/Firm_Search/getAreaType", obj, data => {
        this.ssdqList = data;
      });
    },
    onClick_import (data) {
      for (let i = 0; i < this.tablaData.length; i++) {
        this.tablaData[i].is_relation = 0
        this.$set(this.tablaData[i], "selectName", "关联");
         if(this.tablaData[i].id == data.row.id){
            this.tablaData[i].is_relation = 1
          } 
      }
      data.row.selectName = "已关联";
      this.upDataForm.zbxx_id = data.row.id;
      this.upDataForm.zbxx_bt = data.row.bt;
      this.$emit('getGuanLianData',this.upDataForm)
    },
    handleSizeChange (val) {
      this.searchData.page = val;
      this.ajax_list();
    },
     onSearch () {
      this.searchData.loading = true
      this.searchData.page = 1;
      this.total = 0;
      this.ajax_list();
    },  
     ajax_list (tag) {
          this.searchData.loading = true
      if (tag != "导入") {
        // 为了页面保持高度
        this.tablaData = [];
      }
      let ajax_data = JSON.parse(JSON.stringify(this.searchData));
      ajax_data.service_id = localStorage.getItem("service_id");
      if (ajax_data.zblb == "全部") {
        ajax_data.zblb = "";
      }
      if (ajax_data.date) {
        ajax_data.min_date = ajax_data.date[0] || "";
        ajax_data.max_date = ajax_data.date[1] || "";
      } else {
        ajax_data.min_date = "";
        ajax_data.max_date = "";
      }
      delete ajax_data.date;
      if (ajax_data.area == "不限制") {
        ajax_data.area = "";
      }
      if(this.qyProjectRowData.id != ''){
        ajax_data.relation_id = this.qyProjectRowData.id
      }
      this.axios.post("/index/Project/tenderNotice", ajax_data, data => {
        this.tablaData = data.rows;
        this.searchData.loading = false
          this.searchData.count = data.total || 0;
        for (let i = 0; i < this.tablaData.length; i++) {
          this.$set(this.tablaData[i], "selectName", "关联");
          if(this.tablaData[i].id == this.qyProjectRowData.zbxx_id){
            // console.log(this.tablaData[i].id)
            // console.log(this.qyProjectRowData.zbxx_id)
            this.tablaData[i].is_relation = 1
          } 
        }
      });
    },
  }
}

</script>
<style lang='less' scoped>
</style>