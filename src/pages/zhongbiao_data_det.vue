<template>
    <div>
        <el-header height="auto">
            <body-top></body-top>
            <div>
                <!-- 导航栏 -->
                <!-- <head-menu :index="'/zhongbiao_data'"></head-menu> -->
            </div>
            <div style="text-align:center;font-size:30px">
                <span>四川省近一年中标数据分析</span>
            </div>
        </el-header>
        <el-main style="padding:0">
            <!-- 搜索控制栏 -->
            <div>
                <el-form ref="tableForm" :inline="true">
                    <el-form-item label="项目类别">
                        <el-select v-model="table.type" placeholder="请选择项目类别" @change="typehandleChange" size="mini">
                            <el-option v-for="(item,key) in typeList" :label="item.name" :value="item.value" :key="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最高限价(万元)">
                        <el-select v-model="table.money" placeholder="请选择最高限价" @change="moneyhandleChange" size="mini">
                            <el-option v-for="(item,key) in moneyList" :label="item.name" :value="item.value" :key="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属地区">
                        <el-select v-model="table.area" placeholder="请选择地区" @change="areahandleChange" size="mini">
                            <el-option v-for="item in areaTypeList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="中标时间：">
                        {{table.date}}
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width:67px" size="mini" @click="resetTableData">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 数据 图表 栏 -->
            <div>
                <!-- 数据栏 -->
                <div style="width:1300px;float:left">
                    <el-table :data="tableData" border style="width: 100%;font-size:12px" v-loading="table.loading" @sort-change="changeSort" ref="filterTable">
                        <el-table-column label="序号" width="60" align="center">
                            <template slot-scope="scope">
                                {{(table.page-1)*10+scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column label="项目名称" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <p style="color:#409EFF;cursor:pointer" @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="kbsj" label="中标时间" width="120" align="center" sortable>
                        </el-table-column>
                        <el-table-column prop="zgxjw" label="最高限价(万元)" width="150" align="center" sortable>
                        </el-table-column>
                        <el-table-column prop="tbbjw" label="投标报价(万元)" width="150" align="center" sortable>
                        </el-table-column>
                        <el-table-column prop="zbxf" label="中标下浮" align="center" width="110" sortable>
                        </el-table-column>
                        <el-table-column prop="zdxf" label="最低下浮" align="center" width="110" sortable>
                        </el-table-column>
                        <el-table-column prop="average" label="平均下浮" align="center" width="110" sortable>
                        </el-table-column>
                        <el-table-column label="有效投标(家)" prop="effective" width="120" align="center" sortable>
                            <template slot-scope="scope">
                                <span style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row,'effective')">
                                    {{scope.row.effective}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="总投标(家)" width="120" prop="tbgs_count" align="center" sortable>
                            <template slot-scope="scope">
                                <span style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row)">
                                    {{scope.row.tbgs_count}}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="total,prev, pager, next" :total="table.total" @current-change="tableChangePage" :current-page.sync="table.nowPage">
                    </el-pagination>
                </div>
                <!-- 图标栏 -->
                <div style="width:600px;float:right">
                    <!-- 单选分栏按钮 -->
                    <el-radio-group v-model="botton_type" @change="changeType" style="margin-left:110px;">
                        <el-radio-button label="行为分析统计"></el-radio-button>
                        <el-radio-button label="下浮统计分析"></el-radio-button>
                    </el-radio-group>
                    <div>
                        <!-- 行为分析统计 -->
                        <div v-loading="left_loading" :style="{display:botton_type == '行为分析统计'?'block':'none',height :'500px',width:'500px'}" id="xwtj"></div>
                        <!-- 下浮分析统计 -->
                        <div v-loading="right_loading" :style="{display:botton_type == '下浮统计分析'?'block':'none',height:'500px',width:'500px'}" id="xf"></div>
                    </div>
                    <div></div>
                </div>
            </div>
        </el-main>
        <el-footer>
        </el-footer>
    </div>
</template>
<script>
import head_menu from "./template/head_menu.vue";
require("echarts/map/js/province/sichuan");
/* eslint-disable */

export default {
  components: {
    headMenu: head_menu
  },
  data() {
    return {
      areaType: "",
      areaTypeList: [],
      typeList: [
        { name: "建筑工程", value: "建筑工程" },
        { name: "公路", value: "公路" },
        { name: "市政", value: "市政" },
        { name: "水利", value: "水利" },
        { name: "其他", value: "其他" }
      ],
      moneyList: [
        { name: "1000万以下", value: "1000万以下" },
        { name: "1000万~3000万", value: "1000万~3000万" },
        { name: "3000万以上", value: "3000万以上" }
      ],
      area_list: [],
      left_loading: false,
      right_loading: false,
      botton_type: "行为分析统计",
      table: {
        total: 0,
        page: 1,
        loading: false,
        sort: "kbsj",
        order: "desc",
        area: "",
        nowPage: 1,
        date: ""
      },
      tableData: [],
      input: "",
      ceshi: [],
      winBidTitle: {
        start_time: "",
        end_time: ""
      },
      //市场行为分析
      xwtj_option: {
        title: {
          text: "市场行为分析",
          subtext: "排名前20的公司"
        },
        tooltip: {},
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            name: "中标数量",
            type: "bar",
            data: []
          }
        ]
      },
      //下浮分析统计
      xf_option: {
        title: {
          text: "下浮统计分析"
        },
        grid: {
          top: "20%",
          containLabel: true
        },
        xAxis: [
          {
            type: "time"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        legend: {
          top: "10%",
          data: ["中标下浮", "平均下浮"]
        },
        tooltip: {
          formatter: function(params) {
            if (params.value.length > 1 && params.value[1] < 0.5) {
              return (
                "中标时间：" +
                params.value[0] +
                " <br/>" +
                "平均下浮：" +
                +params.value[1] +
                "%"
              );
            } else {
              return (
                "中标时间：" +
                params.value[0] +
                " <br/>" +
                "平均下浮：" +
                +params.value[1] +
                "%"
              );
            }
          }
        },
        series: [
          {
            name: "中标下浮",
            symbolSize: 5,
            data: [],
            type: "scatter"
          },
          {
            name: "平均下浮",
            symbolSize: 5,
            data: [],
            type: "scatter"
          }
        ]
      },
      all_list: []
    };
  },
  mounted() {
    this.changeType();
  },
  created() {
    document.title = "四川中标数据分析";
    this.getDz();
  },
  methods: {
    //读取地址栏，决定加载项目
    getDz() {
      var c = this.$route.query.type;
      if (c == "xmlb") {
        this.table.type = this.$route.query.name;
      } else if (c == "xmsd") {
        this.table.area = this.$route.query.name;
      } else if (c == "zgxj") {
        this.table.money = this.$route.query.name;
      }
      this.getTableData();
      this.getBehavior();
      this.getLowerStack();
      this.getArea();
    },
    //选择属地
    areahandleChange() {
      this.table.sort = "kbsj";
      this.table.order = "desc";
      this.table.page = 1;
      this.table.nowPage = 1;
      this.getTableData();
    },
    //选择项目类型
    typehandleChange() {
      this.table.sort = "kbsj";
      this.table.order = "desc";
      this.table.page = 1;
      this.table.nowPage = 1;
      this.getTableData();
    },
    //选择最高限价
    moneyhandleChange() {
      this.table.sort = "kbsj";
      this.table.order = "desc";
      this.table.page = 1;
      this.table.nowPage = 1;
      this.getTableData();
    },
    //改变类型
    changeType() {
      if (this.botton_type == "行为分析统计") {
        this.loadChatXmsd();
      } else {
        this.loadChatXf();
      }
    },
    loadChatXmsd() {
      var new_data = this.all_list;
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("xwtj"));
      myChart.setOption(this.xwtj_option);
      myChart.on("click", function(params) {
        for (var i = 0; i < new_data.length; i++) {
          if (new_data[i].name == params.name) {
            localStorage.setItem("xm_zb_id", new_data[i].zb_id);
            localStorage.setItem("xm_gs_id", new_data[i].gs_id);
            localStorage.setItem("xm_gsmc", new_data[i].name);
            // localStorage.gs_id = new_data[i].gs_id
            // localStorage.gsmc = new_data[i].name
            if (new_data[i].gs_id && new_data[i].gs_id != "0") {
              let { href } = that.$router.resolve({
                path: `/xmlist`
              });
              window.open(href, new_data[i].gs_id);
            }
          }
        }
      });
    },
    loadChatXf() {
      var myChart2 = this.$echarts.init(document.getElementById("xf"));
      myChart2.setOption(this.xf_option);
    },
    getWinBidTitle() {},
    //重置条件 和表格数据
    resetTableData() {
      this.table.type = "";
      this.table.area = "";
      this.table.money = "";
      this.table.sort = "kbsj";
      this.table.order = "desc";
      this.table.page = 1;
      this.table.nowPage = 1;
      this.$refs.filterTable.clearSort();
      this.getTableData();
    },
    //请求列表数据
    getTableData() {
      this.table.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidMonitor",
        {
          xmlx: this.table.type,
          area: this.table.area,
          money: this.table.money,
          date: "",
          sort: this.table.sort,
          order: this.table.order,
          page: this.table.page,
          flag: 1,
          rows: 10
        },
        data => {
          this.tableData = data.rows || [];
          this.table.total = data.total || 0;
          this.table.loading = false;
          this.table.date = data.date;
          this.getBehavior();
          this.getLowerStack();
        }
      );
    },
    //列表切换页面
    tableChangePage(val) {
      this.table.page = val;
      this.getTableData();
      this.getLowerStack();
    },
    //点击项目名称
    openXmmc(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
          ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
      });
      window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
    },
    //点击有效投标和总投标
    openMsg(row,type) {
      if (type == "effective") {
        let { href } = this.$router.resolve({
          path: `/zhaobiao_msg?zb_id=${row.id}&type=1`
        });
        window.open(href);
      } else {
        let { href } = this.$router.resolve({
          path: `/zhaobiao_msg?zb_id=${row.id}&type=0`
        });
        window.open(href);
      }
    },
    //获得各种地区
    getArea() {
      this.axios.post(
        "/firm/Firm_Search/getAreaType",
        { type: "招中标" },
        data => {
          this.areaTypeList = data[1].children;
        }
      );
    },
    //改变排序方式
    changeSort(val) {
      if (val.prop) {
        this.table.sort = val.prop;
      } else {
        this.table.sort = "";
      }
      if (val.order == "descending") {
        this.table.order = "desc";
      } else if (val.order == "ascending") {
        this.table.order = "asc";
      } else {
        this.table.order = "desc";
        this.table.sort = "kbsj";
      }
      this.getTableData();
    },
    // 点击表格行 项目名称
    handleClickProjectName(row) {
      // 跳转路由
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
          row.id
        }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
      });
      window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
    },
    //获取行为分析统计图表
    getBehavior() {
      this.left_loading = true;
      this.axios.post(
        "/index/statistics_Bid/behavior",
        {
          xmlx: this.table.type,
          area: this.table.area,
          money: this.table.money,
          date: "",
          flag: 1
        },
        data => {
          var gs_idArr = [];
          var nameArr = [];
          for (let i = data.rows.length - 1; i >= 0; i--) {
            gs_idArr.push(data.rows[i].value);
            nameArr.push(data.rows[i].name);
          }
          this.all_list = data.rows;
          // data.rows.forEach(element => {
          //   gs_idArr.push(element.value)
          //   nameArr.push(element.name)
          // })
          this.xwtj_option.series[0].data = gs_idArr;
          this.xwtj_option.yAxis.data = nameArr;
          this.left_loading = false;
          this.loadChatXmsd();
        }
      );
    },
    //下浮分析统计
    getLowerStack() {
      this.left_loading = true;
      this.axios.post(
        "/index/statistics_Bid/lowerStack",
        {
          xmlx: this.table.type,
          area: this.table.area,
          money: this.table.money,
          date: "",
          flag: 1
        },
        data => {
          var arr1 = [];
          var arr2 = [];
          data.rows[0].forEach(element => {
            if (element[1] < 50) {
              arr1.push(element);
            }
          });
          this.xf_option.series[0].data = arr1;
          data.rows[1].forEach(element => {
            if (element[1] < 50) {
              arr2.push(element);
            }
          });
          this.xf_option.series[1].data = arr2;
          this.left_loading = false;
          this.loadChatXf();
        }
      );
    }
  }
};
</script>
<style scoped lang="less">
#zbArea {
  width: 400px;
  height: 400px;
  margin: 50px 0 50px 0;
}

#fbArea {
  display: none;
  width: 400px;
  height: 400px;
  margin: 50px 0 50px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>

