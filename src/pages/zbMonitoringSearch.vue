<!--  -->
<template>
  <div class="zbMonitoringSearch">
    <el-header style="margin-bottom:20px">
      <div>
        <div class="mytitle">
          <p>{{qymc}}数据可视化监控系统</p>
        </div>
      </div>
    </el-header>
    <el-row>
          <el-col :span="16" :offset="2">
              <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
          <el-form-item label="项目名称">
            <el-input v-model="form.xmmc" maxlength="40"  clearable placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item v-if="tableObj.source ==''" label="招标类别">
            <el-select v-model="form.zblb"  placeholder="请选择">
              <el-option
                v-for="item in zblbList"
                :key="item.lable"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型">
            <el-select v-model="form.xmlx" clearable placeholder="请选择">
              <el-option
                v-for="item in xmlbList"
                :key="item.lable"
                :label="item.lable"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属地区">
            <el-select v-model="form.area" clearable placeholder="请选择">
              <el-option
                v-for="item in areaList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开标日期">
            <div class="block">
              <el-date-picker
                v-model="form.kbsj"
                type="daterange"
                value-format='yyyy/MM/dd'
                @change='changeDate'
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="resetData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
   
    <el-row>
      <el-col :span="20" :offset="2">
          <el-table :data="tableData"   @sort-change='sortTable' v-loading='loading' border style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="60">
              <template slot-scope="scope">{{scope.$index+(tableObj.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="bt" label="项目名称"  align="center" min-width="300">
              <template slot-scope="scope">
                <span v-html="scope.row.bt">{{scope.row.bt}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cs" label="建设地点" align="center" width="80"></el-table-column>
            <el-table-column prop="zblb" label="招标类别" align="center"></el-table-column>
            <el-table-column prop="fbsj" label="发布日期" align="center" sortable>
              <template slot-scope="scope">
                <span v-html="scope.row.fbsj">{{scope.row.fbsj}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jzrq" label="报名截止日期" align="center" sortable>
              <template slot-scope="scope">
                <span v-html="scope.row.jzrq">{{scope.row.jzrq}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tb_jzrq" label="投标截止日期" align="center" sortable>
              <template slot-scope="scope">
                <span v-html="scope.row.tb_jzrq">{{scope.row.tb_jzrq}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          background
          layout="total,prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page.sync="tableObj.page"
          :total="tableObj.count">
        </el-pagination>
      </el-col>
      <!-- <el-col :span="4" >
          <EnterpriseEcharts :option="option5" :id="id5" :height="height1" :width="width1"></EnterpriseEcharts>
      </el-col> -->
    </el-row>
  
  </div>
</template>

<script>
import EnterpriseEcharts from "./template/Enterprise_echarts";
export default {
  data() {
    name: "zbMonitoringSearch";
    return {
      zblbList: [
        { lable: "全部", value: "" },
        { lable: "公招", value: "公招" },
        { lable: "比选", value: "比选" },
        { lable: "采购", value: "采购" }
      ],
      xmlbList: [
        { lable: "建筑工程", value: "建筑工程" },
        { lable: "公路", value: "公路" },
        { lable: "市政", value: "市政" },
        { lable: "水利", value: "水利" },
        { lable: "其他", value: "其他" }
      ],
      areaList: [],
      form: {
        xmmc: "",
        zblb: "全部",
        xmlx: "",
        area: "",
        kbsj: ""
      },
      tableObj: {
        page: 1,
        order: "",
        sort: "",
        minDate: "",
        maxDate: "",
        count: 0,
        source: "",
       
      },
       loading:true,
      tableData:[],
      qymc: "",
      areaList:[],
       id5: "echarts5",
      height1: "300px",
      width1: "300px",
      option5: {
        title: {
          text: "四川省公开招标分布图"
        },
        //这个对象是有数据的颜色
        visualMap: {
          show: true, //不显示右下的颜色条
          color: ["yellow"]
        },
        series: [
          {
            name: "四川省公开招标项目中标区域分布图",
            type: "map",
            mapType: "四川",
            // roam: true,  //这个是地图缩放
            itemStyle: {
              emphasis: { label: { show: true } }
            },
            //下面显示地区名字
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            //显示的数据
            data: [{ name: "成都市", value: 1 }]
          }
        ]
      },
    };
  },
  components:{
    EnterpriseEcharts
  },
  created() {
    document.title='数据可视化监控系统'
    this.qymc = localStorage.getItem("qymc");
    this.tableObj.source = this.$route.query.page?this.$route.query.page:'';
    this.form.xmmc = this.$route.query.search?this.$route.query.search:'';
    this.getTenderMonitorList();
    this.getAreaType()
  },
  methods: {
    changeDate(val){
      if(val){
        this.tableObj.minDate= val[0]
        this.tableObj.maxDate= val[1]
      }
    },
    resetData(){
       this.loading= true
      this.tableObj.page = 1
      this.form.xmmc = ''
      this.form.zblb  = '全部'
      this.form.xmlx = ''
      this.form.area = ''
      this.tableObj.minDate = ''
      this.tableObj.maxDate = ''
      this.tableObj.sort = ''
      this.tableObj.order = ''
      this.form.kbsj = ''
      this.getTenderMonitorList()
    },
    getAreaType(){
      this.axios.post("/firm/Firm_Search/getAreaType",{
        type:'招中标'
      },data=>{
        this.areaList = data
      
      })
    },
      sortTable({column, prop, order}){
      this.loading= true
      this.tableObj.page = 1
      if(order == 'ascending'){
        this.tableObj.order = 'asc'
      }else{
        this.tableObj.order = "desc"
      }
      this.tableObj.sort = prop
      this.getTenderMonitorList()
    },
    handleCurrentChange(val){
      this.loading= true
      this.tableObj.page = val
      this.getTenderMonitorList()
    },
    getTenderMonitorList() {
      this.axios.post(
        "/index/Tendering/tenderList",
        {
          xmmc: this.form.xmmc,
          zblb: this.form.zblb != "全部" ? this.form.zblb : "",
          xmlb: this.form.xmlx,
          area: this.form.area,
          min_date: this.tableObj.minDate,
          max_date: this.tableObj.maxDate,
          source: this.tableObj.source,
          sort: this.tableObj.sort,
          order: this.tableObj.order
          // page: this.tableObj.page
        },
        data => {
          this.loading = false
          this.tableData = data.rows;
          this.tableObj.count = data.total
        }
      );
    },
    onSubmit() {
        this.loading= true
      this.tableObj.page = 1
       this.getTenderMonitorList()
    }
  }
};
</script>
<style lang='less' scoped>
.zbMonitoringSearch {
  background-color: #fafafa;
  min-height: 100vmin;
}
.mytitle {
  text-align: center;
  height: 40px;
  padding: 10px 0;
  line-height: 40px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
</style>