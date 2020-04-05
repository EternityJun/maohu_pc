<!--  -->
<template>
  <div class="zbMonitoringDetails">
    <el-container>
      <el-header style="height:60px">
        <div>
          <div class="mytitle">
            <p>{{qymc}}{{myName}}招标公告</p>
          </div>
        </div>
      </el-header>
      <el-main>
        <div id="myYear">
          <span>筛选</span>
          <!-- <div v-if="year == 'lastYear'&&myName != '招标公告'" @click="getDetailZB" class="myTitleYear">近一年</div>
          <div v-else-if="myName == '招标公告'" @click="getAllDetailMonth" class="myTitleYear">点击查看近期全部数据</div>
          <div v-else @click="getDetailZB" class="myTitleYear">{{year}}</div>-->
          <div v-if="xmlx" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{xmlx}}
              <span class="el-icon-close deletaType" @click="delateXmlx"></span>
            </p>
          </div>
          <div v-if="area" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{area}}
              <span class="el-icon-close deletaType" @click="delateArea"></span>
            </p>
          </div>
          <div v-if="source" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{source}}
              <span class="el-icon-close deletaType" @click="delateSource"></span>
            </p>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="15" :offset="2" id="bigEcharts">
            <el-table
              :data="echartsData4"
              border
              @sort-change='sortTable'
              v-loading="echartsData4Loading"
              style="width: 100%"
            >
              <el-table-column type="index" align="center" label="序号" width="60">
                <template slot-scope="scope">{{scope.$index+(echartsData4Page-1)*10+1}}</template>
              </el-table-column>
              <el-table-column prop="bt" align="center" label="项目名称" min-width="300">
                <template slot-scope="scope">
                  <span @click="openDetails(scope.row)" style="cursor: pointer;color: #66b1ff">{{scope.row.bt}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="cs" align="center" label="建设地点" width="180"></el-table-column>
              <el-table-column prop="zblb" align="center" label="	招标类别"></el-table-column>
              <el-table-column prop="fbsj" align="center" label="	发布日期" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.fbsj">{{scope.row.fbsj}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jzrq" align="center" label="	报名截止日期" width="150" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.jzrq">{{scope.row.jzrq}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="tb_jzrq" align="center" label="	投标截止日期" width="150" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tb_jzrq">{{scope.row.tb_jzrq}}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              layout="total,prev, pager, next"
              @current-change="handleCurrentChange"
              :current-page.sync="echartsData4Page"
              :total="echartsData4Count"
            ></el-pagination>
            <!-- <div v-if=" this.myName != '招标公告'">
              <div v-show="this.myName != '投标(废标)'" id="garden" @click="getDetailZB">
                <p>查看数据</p>
                <span v-if="year == 'lastYear'">近一年</span>
                <span v-else>{{year}}</span>
              </div>
              <div id="myFooter">
                <span class="el-icon-arrow-left mySpan" @click="proYear"></span>
                <div id="myChooseYear">
                  <div v-for="(item,index) in footerYear" :key="index">
                    <div
                      class="myYuan"
                      :id="yearState == index ?myYuanHover:''"
                      @click="changeYear(item,index)"
                    ></div>
                    <p>{{item}}</p>
                  </div>
                </div>
                <span class="el-icon-arrow-right mySpan" @click="nextYear"></span>
                <span class="myLine"></span>
              </div>
            </div>-->
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <EnterpriseEcharts
                  v-if="myName == '建筑施工'"
                  :id="id1"
                  :height="height"
                  :width="width"
                  :option="option1"
                  v-loading="loading1"
                  @changeData="changeData"
                ></EnterpriseEcharts>
              </el-col>
              <el-col :span="24">
                <EnterpriseEcharts
                  :id="id2"
                  :height="height"
                  :width="width"
                  :option="option2"
                  v-loading="loading2"
                  @changeData="changeData"
                ></EnterpriseEcharts>
              </el-col>
              <el-col :span="24">
                <EnterpriseEcharts
                  :id="id3"
                  :height="height"
                  :width="width"
                  :option="option3"
                  v-loading="loading3"
                  @changeData="changeData"
                ></EnterpriseEcharts>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-dialog :title="myName" :visible.sync="centerDialogVisible" width="80%" center>
          <EnterpriseTable
            :tableData="tableData"
            :pageName="pageName"
            :pageNum="pageNum"
            :rows="rows"
            @changeListData="changeListData"
            :time="timeData"
          ></EnterpriseTable>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import EnterpriseEcharts from "./template/Enterprise_echarts";
import EnterpriseTable from "./template/Enterprise_table";
export default {
  name: "zbMonitoringDetails",
  data() {
    return {
      echartsData4: [],
      echartsData4Count: 0,
      echartsData4Page: 1,
      echartsData4Loading: true,
      qymc: "",
      myPageName: "",
      height: "240px",
      width: "420px",
      //3个echarts公用的样式
      id1: "1",
      myClick1: "myClick1",
      option1: {
        title: {
          text: "项目类型分类"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} "
        },
        
        xAxis: [
          {
            type: "category",
            // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
            data: [],
            axisPointer: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            // name: "金额(千万元)",
            type: "bar",
            barWidth: 20,
            // data:[2.15, 4.58, 0,0, 1.22, 5.222],
            data: [],
            itemStyle: {
              normal: {
                color: "#4bb2ff"
              }
            }
          }
        ]
      },
      //右边表1
      id2: "2",
      myClick2: "myClick2",
      id2: "2",
      myClick2: "myClick2",
      option2: {
        title: {
          text: "项目地区分类"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            // name: "第二名",
            type: "pie",
            // data:[2, 4,7, 2, 2, 7]
            data: [],
            radius: "55%",
            cneter: ["50%", "60%"]
          }
        ]
      },
      //右边表2
      id3: "3",
      myClick3: "myClick3",
      option3: {
        title: {
          text: "数据源分类"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            // name: "第二名",
            type: "pie",
            // data:[2, 4,7, 2, 2, 7]
            data: [],
            radius: "55%",
            cneter: ["50%", "60%"]
          }
        ]
      },
      //右边表3
      echartsData1: {},
      echartsData2: {},
      echartsData3: {},
      //右边三个小的
      //大echarts的数据
      year: "lastYear",
      //默认为近一年   年份
      area: "",
      // 地区
      yjlx: "",
      //类型
      money: "",
      //金额
      myName: "",
      allYear: [],
      //所有的年份
      footerYear: [],
      //详情页的年份
      chooseYearList: [],
      centerDialogVisible: false,
      //模态框的状态
      pageNum: 1,
      //模态框 table的 页数
      rows: 10,
      //这个是模态框  每页最多显示几条
      tableData: [],
      //模态框的 数据
      chooseYear: [],
      yearState: 0,
      //改变小圆点的css
      myYuanHover: "myYuanHover",
      echartsVal: "",
      zblb: "",
      xmlx: "",
      timeData: "",
      //data 点击的是echarts          year点击的是查看所有数据
      loading4: true,
      loading1: true,
      loading2: true,
      loading3: true,
      gsId: "",
      sort: "",
      order: "",
      source: "",
     
    };
  },
  // beforeCreate(){
  //   this.changeTitle()
  // },
  components: {
    EnterpriseEcharts,
    EnterpriseTable
  },
  computed: {
    pageName() {
      return this.myName;
    }
  },
  created() {
    this.changeTitle();
    this.getTenderMonitorList();
    // this.getEchartsData4();
    this.getEchartsData1();
    this.getEchartsData2();
    this.getEchartsData3();
    // this.getChooseYear();
    // this.deepCopy(this.allYear)
    // this.getGsid()
  },
  methods: {
   
    sortTable({column, prop, order}){
      this.echartsData4Loading= true
      this.echartsData4Page = 1
      if(order == 'ascending'){
        this.order = 'asc'
      }else{
        this.order = "desc"
      }
      this.sort = prop
      this.getTenderMonitorList()
    },
     openDetails(i) {
     
       let gsmc = localStorage.getItem("qymc")
      let xmmc = i.bt
       this.type = "zbxx";
      let routeData = this.$router.resolve({
        name: "enterpriseDetails",
        query: {
          zbxx_id: i.id,
          type: this.type,
          gsmc:gsmc,
          xmmc:xmmc
        }
      });
      window.open(routeData.href, "_blank");
    },
    deepCopy(obj) {
      this.footerYear = obj;
      console.log(this.footerYear);
    },
    getGsid() {
      let gsid = localStorage.getItem("gs_id");
      let qymc = localStorage.getItem("qymc");
      this.gsId = gsid;
      this.qymc = qymc;
      console.log("gsid========" + gsid);
    },
    changeTitle() {
      if (Number(this.$router.currentRoute.query.page) == 1) {
        this.myPageName = "四川佳和建设工程有限公司中标公示记录";
        this.myName = "建筑施工";
      } else if (Number(this.$router.currentRoute.query.page) == 2) {
        this.myPageName = "四川佳和建设工程有限公司入围记录";
        this.myName = "建筑监理";
      } else if (Number(this.$router.currentRoute.query.page) == 3) {
        this.myPageName = "四川佳和建设工程有限公司废标记录";
        this.myName = "勘察设计";
      } else if (Number(this.$router.currentRoute.query.page) == 4) {
        this.myPageName = "四川佳和建设工程有限公司招标公告记录";
        this.myName = "代理、造价咨询";
      }
      document.title = this.myName
    },
    getTenderMonitorList() {
      this.loading4 = true;
      this.allYear = [];
      // console.log(this.myName)
      if (this.myName == "建筑施工") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/tenderMonitorList",
          {
            xmmc: this.xmmc,
            source: this.source,
            xmlx: this.xmlx,
            area: this.area,
            type: this.myName,
            sort: this.sort,
            order: this.order,
            page: this.echartsData4Page
          },
          data => {
            (this.echartsData4Loading = false), (this.echartsData4 = data.rows);
            this.echartsData4Count = data.total || 0;
          }
        );
      } else if (this.myName == "建筑监理") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/tenderMonitorList",
          {
            xmmc: this.xmmc,
            source: this.source,
            xmlx: this.xmlx,
            area: this.area,
            type: this.myName,
            sort: this.sort,
            order: this.order,
            page: this.echartsData4Page
          },
          data => {
            (this.echartsData4Loading = false), (this.echartsData4 = data.rows);
            this.echartsData4Count = data.total || 0;
          }
        );
      } else if (this.myName == "勘察设计") {
        this.loading1 = false;
        this.loading2 = false;
        this.loading3 = false;
        let gsid = localStorage.getItem("gs_id");
         this.axios.post(
          "/index/Statistics_Tender/tenderMonitorList",
          {
            xmmc: this.xmmc,
            source: this.source,
            xmlx: this.xmlx,
            area: this.area,
            type: this.myName,
            sort: this.sort,
            order: this.order,
            page: this.echartsData4Page
          },
          data => {
            (this.echartsData4Loading = false), (this.echartsData4 = data.rows);
            this.echartsData4Count = data.total || 0;
          }
        );
      } else if (this.myName === "代理、造价咨询") {
        let mygsid = JSON.parse(localStorage.getItem("gs_id"));
        console.log(mygsid);
        this.axios.post(
          "/index/Statistics_Tender/tenderMonitorList",
          {
            xmmc: this.xmmc,
            source: this.source,
            xmlx: this.xmlx,
            area: this.area,
            type: this.myName,
            sort: this.sort,
            order: this.order,
            page: this.echartsData4Page
          },
          data => {
            (this.echartsData4Loading = false), (this.echartsData4 = data.rows);
            this.echartsData4Count = data.total || 0;
          }
        );
      }
    },
    getEchartsData1() {
      this.loading1 = true;
      if (this.myName == "建筑施工") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/stackProjectType",
          {
            type: this.myName,
            source: this.source,
            area: this.area
          },
          data => {
            this.loading1 = false;
            this.echartsData1 = data.rows;
            let allXmlx = [];
            let allValue = [];
            // console.log(this.construction.xmlx)
            for (let i = 0; i < this.echartsData1.xmlx.length; i++) {
              allXmlx.push(this.echartsData1.xmlx[i].name);
              allValue.push(this.echartsData1.xmlx[i].value);
            }
            this.option1.xAxis[0].data = allXmlx;
            this.option1.series[0].data = allValue;
          }
        );
      } 
    },
    getEchartsData2() {
      this.loading2 = true;
      if (this.myName == "建筑施工") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/stackArea",
          {
            type: this.myName,
            xmlx: this.xmlx,
            source: this.source
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            this.option2.series[0].data = this.echartsData2.area;
            this.loading2 = false;
          }
        );
      } else if (this.myName == "建筑监理") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/stackArea",
          {
            type: this.myName,
            xmlx: this.xmlx,
            source: this.source
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            this.option2.series[0].data = this.echartsData2.area;
            this.loading2 = false;
          }
        );
      } else if (this.myName == "勘察设计") {
         this.loading2 = false;
         this.axios.post(
          "/index/Statistics_Tender/stackArea",
          {
            type: this.myName,
            xmlx: this.xmlx,
            source: this.source
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            this.option2.series[0].data = this.echartsData2.area;
            this.loading2 = false;
          })
      } else if (this.myName == "代理、造价咨询") {
        let gsid = localStorage.getItem("gs_id");
          this.axios.post(
          "/index/Statistics_Tender/stackArea",
          {
            type: this.myName,
            xmlx: this.xmlx,
            source: this.source
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            this.option2.series[0].data = this.echartsData2.area;
            this.loading2 = false;
          }
        );
      }
    },
    getEchartsData3() {
      this.loading3 = true;
      if (this.myName == "建筑施工") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/index/Statistics_Tender/stackSource",
          {
            type: this.myName,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            this.option3.series[0].data = this.echartsData3.source;
            this.loading3 = false;
          }
        );
      } else if (this.myName == "建筑监理") {
        let gsid = localStorage.getItem("gs_id");
         this.axios.post(
          "/index/Statistics_Tender/stackSource",
          {
            type: this.myName,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            this.option3.series[0].data = this.echartsData3.source;
            this.loading3 = false;
          }
        );
      } else if (this.myName == "勘察设计") {
        this.loading3 = false;
         this.axios.post(
          "/index/Statistics_Tender/stackSource",
          {
            type: this.myName,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            this.option3.series[0].data = this.echartsData3.source;
            this.loading3 = false;
          }
        );
      } else if (this.myName == "代理、造价咨询") {
        let gsid = localStorage.getItem("gs_id");
          this.axios.post(
          "/index/Statistics_Tender/stackSource",
          {
            type: this.myName,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            this.option3.series[0].data = this.echartsData3.source;
            this.loading3 = false;
          }
        );
      }
    },
    changeData(val, id) {
      // console.log(val)
      this.echartsVal = "";
      if (id == 1) {
        (this.echartsData4Loading = true), (this.xmlx = val.name);
        this.echartsData4Page = 1;
        this.echartsData4Count = 0;
        this.getTenderMonitorList();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 2) {
        let name = val.name;
        (this.echartsData4Loading = true), (this.area = val.name);
        this.echartsData4Page = 1;
        this.echartsData4Count = 0;
        // this.xmlx = this.echartsData2[name].xmlx;
        this.getTenderMonitorList();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 3) {
        (this.echartsData4Loading = true), (this.echartsData4Page = 1);
        this.echartsData4Count = 0;
        this.source = val.name;
        // this.zblb = val.name;
        this.getTenderMonitorList();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 4) {
        this.pageNum = 1;
        // console.log( val.name)
        this.timeData = "data";
        this.echartsVal = val;
        this.centerDialogVisible = true;
        let name = val.name;
        name = name.split("月")[0];
        // console.log(this.year)
        // console.log(this.yearState)
        if (this.year == "lastYear") {
          // console.log( name
          this.getDetailMonth(name, this.pageNum, this.rows, val);
        } else {
          // console.log("看看你在搞什么")
          let i = this.yearState;
          name = this.allYear[i] + "-" + name;
          // console.log(name)
          this.getDetailMonth(name, this.pageNum, this.rows, val);
        }
        // console.log(val.name)
      }
      //  console.log(this.area,this.yjlx,this.money)
    },
    delateArea() {
      this.echartsData4Page = 1;
      // this.echartsData4Count = 0
      this.area = "";
      this.getTenderMonitorList();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    delateXmlx() {
      this.xmlx = "";
      this.echartsData4Page = 1;
      //  this.echartsData4Count = 0
      this.getTenderMonitorList();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    delateSource() {
      this.source = "";
      this.echartsData4Page = 1;
      this.echartsData4Count = 0;
      this.getTenderMonitorList();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    handleCurrentChange(val) {
      this.echartsData4Loading = true
      this.echartsData4Page = val;
      this.getTenderMonitorList();
    },
    getDetailMonth(data, num, rows, val) {
      this.timeData = "data";
      let name = val.name;
      name = name.split("月")[0];
      if (this.year == "lastYear") {
        // console.log( name
      } else {
        let i = this.yearState;
        name = this.allYear[i] + "-" + name;
      }
      this.tableData = [];
      // console.log(this.myName)
      if (this.myName == "中标公示") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailMonth",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: "1",
            area: "",
            year: "",
            yjlx: "",
            money: "",
            page: num,
            rows: rows,
            date: name
          },
          data => {
            // console.log(data);
            this.tableData = data.result;
          }
        );
      } else if (this.myName == "入围") {
        let state;
        if (val.color == "#ff0000") {
          state = 2;
        } else {
          state = 3;
        }
        //判断点击的是第二还是第三
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailWinner",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: state,
            area: "",
            yjlx: "",
            money: "",
            year: "",
            page: num,
            rows: rows,
            date: name
          },
          data => {
            console.log(data);
            this.tableData = data;
          }
        );
      } else if (this.myName == "投标(废标)") {
        let state;
        if (val.color == "#ff0000") {
          state = 10;
        } else {
          state = 4;
        }
        //判断点击的是投标还是废标
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailFeiBMonth",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: state,
            area: "",
            year: "",
            yjlx: "",
            money: "",
            page: num,
            rows: rows,
            date: data
          },
          data => {
            console.log(data);
            this.tableData = data;
          }
        );
      } else if (this.myName == "招标公告") {
        let state;
        if (val.name == "正在报名") {
          state = 1;
        } else if (val.name == "正在投标") {
          state = 2;
        } else if (val.name == "今日开标") {
          state = 3;
        }
        let name = val.name;
        let myId = this.echartsData4[name].id;
        // let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailInvitecount",
          {
            id: myId,
            type: state,
            page: num,
            rows: rows
          },
          data => {
            console.log(data);
            this.tableData = data;
          }
        );
      }
    },
    getDetailZB(data, num, rows) {
      this.timeData = "year";
      // console.log(this.myName)
      //  this.tableData = []
      this.centerDialogVisible = true;
      if (this.myName == "中标公示") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailMonth",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: "1",
            area: "",
            yjlx: "",
            money: "",
            page: this.pageNum,
            rows: this.rows,
            year: this.year
          },
          data => {
            console.log(data);
            this.tableData = data.result;
          }
        );
      } else if (this.myName == "入围") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailWinner",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: "2,3",
            area: "",
            yjlx: "",
            money: "",
            date: "",
            page: this.pageNum,
            rows: this.rows,
            year: this.year
          },
          data => {
            this.tableData = data;
            console.log(this.tableData);
          }
        );
      } else if (this.myName == "投标(废标)") {
        let gsid = localStorage.getItem("gs_id");
        this.axios.post(
          "/firm/Statistics_comp/detailFeiBMonth",
          {
            gsid: this.gsId ? this.gsId : gsid,
            type: "2,3",
            area: "",
            yjlx: "",
            money: "",
            date: "",
            page: this.pageNum,
            rows: this.rows,
            year: this.year
          },
          data => {
            this.tableData = data;
            console.log(this.tableData);
          }
        );
      }
    },
    changeYear(newTime, index) {
      this.yearState = index;
      console.log(index);
      if (newTime == "近一年") {
        newTime = "lastYear";
      }
      this.year = newTime;
      this.area = "";
      this.yjlx = "";
      this.money = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    proYear() {
      if (this.yearState == 0) {
        this.yearState = this.allYear.length - 1;
      } else {
        this.yearState--;
      }

      let i = this.yearState;
      let a;
      if (this.allYear[i] == "近一年") {
        a = "lastYear";
      } else {
        a = this.allYear[i];
      }
      this.year = a;
      this.area = "";
      this.yjlx = "";
      this.money = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    nextYear() {
      if (this.yearState == this.allYear.length - 1) {
        this.yearState = 0;
      } else {
        this.yearState++;
      }
      let i = this.yearState;
      let a;
      if (this.allYear[i] == "近一年") {
        a = "lastYear";
      } else {
        a = this.allYear[i];
      }
      this.year = a;
      this.area = "";
      this.yjlx = "";
      this.money = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    changeListData(val, newTime) {
      if (newTime == "data") {
        this.pageNum = val;
        this.getDetailMonth(
          this.echartsVal.name,
          this.pageNum,
          this.rows,
          this.echartsVal
        );
      } else if (newTime == "year") {
        this.pageNum = val;
        this.getDetailZB(this.pageNum, this.rows, this.year);
      }
    },
    getAllDetailMonth() {
      this.centerDialogVisible = true;
      let gsid = localStorage.getItem("gs_id");
      this.axios.post(
        "/firm/Statistics_comp/detailInvitecount",
        {
          gsid: this.gsId ? this.gsId : gsid,
          area: this.area,
          zblb: this.zblb,
          xmlx: this.zblb,
          page: this.pageNum,
          rows: this.rows
        },
        data => {
          console.log(data);
          this.tableData = data;
        }
      );
    }
  }
};
</script>
<style lang='less' scoped>
.mytitle {
  text-align: center;
  height: 40px;
  padding: 10px 0;
  line-height: 40px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
#myYear {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  padding-left: 200px;
  display: flex;
  margin: 20px 0;
}
.deletaType {
  cursor: pointer;
}
.divider {
  border-left: 1px solid black;
  margin-left: 30px;
  padding-left: 20px;
}
.chooseDetails {
  border: 1px solid #52c3ff;
  padding: 0 10px;
  display: inline-block;
}
#bigEcharts {
  text-align: center;
}
#garden {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0 auto;
  // padding: 10px;
  // border: 1px solid blue;
  cursor: pointer;
  border-radius: 50px;
  font-size: 15px;
  color: #45a4fc;
  box-shadow: 0 0 10px #45a4fc;
}
#garden p:first-child {
  margin-top: 35px;
}
#garden p {
  text-decoration: underline;
}
#myChooseYear {
  display: flex;
}
#myFooter {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  position: relative;
}
.mySpan {
  height: 40px;
  line-height: 40px;
  color: #45a4fc;
  font-size: 40px;
  cursor: pointer;
}

#myYuanHover {
  // border: #46a4fc solid 2px;
  background: radial-gradient(#ffffff, #45a4fc);
  background-color: #45a4fc;
  box-shadow: 0 0 6px #45a4fc;
}
#myChooseYear p {
  width: 150px;
  text-align: center;
}
.myYuan {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #999;
  margin: 0 auto;
  cursor: pointer;
}
.myTitleYear {
  color: #4bb2ff;
  cursor: pointer;
}
.myLine {
  position: absolute;
  width: 780px;
  border-top: 1px solid #b4dafd;
  top: 20px;
  // left: 270px;
  z-index: -1;
}
</style>