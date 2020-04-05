<!--  -->
<template>
  <div class="enterpriseZb">
    <el-container>
      <el-header style="height:60px">
        <div>
          <div class="mytitle">
            <p>{{qymc}}{{myName}}</p>
          </div>
        </div>
      </el-header>
      <el-main>
        <div id="myYear">
          <div v-if="year == 'lastYear'&&myName != '招标公告'" @click="getDetailZB" class="myTitleYear">近一年</div>
          <div v-else-if="myName == '招标公告'" @click="getAllDetailMonth" class="myTitleYear">点击查看近期全部数据</div>
          <div v-else @click="getDetailZB" class="myTitleYear">{{year}}</div>
          <div v-if="area" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{area}}
              <span class="el-icon-close deletaType" @click="delateArea"></span>
            </p>
          </div>
          <div v-if="yjlx" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{yjlx}}
              <span class="el-icon-close deletaType" @click="delateYjlx"></span>
            </p>
          </div>
          <div v-if="money" class="chooseType">
            <span class="divider"></span>
            <p class="chooseDetails">
              {{money}}
              <span class="el-icon-close deletaType" @click="delateMoney"></span>
            </p>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="17" id="bigEcharts">
            <EnterpriseEcharts
              :id="id4"
              :height="height1"
              :width="width1"
              :option="option4"
               v-loading="loading4"
              @changeData="changeData"
            ></EnterpriseEcharts>
            <div v-if=" this.myName != '招标公告'">
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
            </div>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24">
                <EnterpriseEcharts
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
  name: "enterpriseZb",
  data() {  
    return {
      qymc:"",
      myPageName: "",
      height: "240px",
      width: "420px",
      //3个echarts公用的样式
      id1: "1",
      myClick1: "myClick1",
      option1: {
        title: {
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: "14"
          }
        },
        tooltip: {
          trigger: "item",
          // formatter: "{b} : {c} "
          formatter: ""
        },
        legend: {
          show: false,
          bottom: 50,
          left: "center",
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            selected: "",
            data: []
          }
        ]
      },
      //右边表1
      id2: "2",
      myClick2: "myClick2",
      option2: {
        title: {
          // text: "天气情况统计"
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: "14"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: ""
        },
        legend: {
          show: false,
          bottom: 50,
          left: "center",
          // data: ["西凉", "益州", "兖州", "荆州", "幽州"]
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            // data: [
            //   { value: 1548, name: "幽州" ,ratio:"18%"},
            //   { value: 535, name: "荆州" ,ratio:"18%"},
            //   { value: 510, name: "兖州" ,ratio:"18%"},
            //   { value: 634, name: "益州" ,ratio:"18%"},
            //   { value: 735, name: "西凉" ,ratio:"18%"}
            // ]
            data: []
          }
        ]
      },
      //右边表2
      id3: "3",
      myClick3: "myClick3",
      option3: {
        title: {
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: "14"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: ""
        },
        legend: {
          show: false,
          bottom: 50,
          left: "center",
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              // { value: 1548, name: "幽州" },
              // { value: 535, name: "荆州" },
              // { value: 510, name: "兖州" },
              // { value: 634, name: "益州" },
              // { value: 735, name: "西凉" }
            ]
          }
        ]
      },
      //右边表3
      id4: "4",
      myClick4: "myClick4",
      option4: {},
      //招标公告表的数据
      height1: "400px",
      width1: "1000px",
      echartsData1: {},
      echartsData2: {},
      echartsData3: {},
      //右边三个小的
      echartsData4: {},
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
      footerYear:[],
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
      loading4:true,
      loading1:true,
      loading2:true,
      loading3:true,
      gsId :""
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
    this.getEchartsData4();
    // this.getEchartsData1();
    // this.getEchartsData2();
    // this.getEchartsData3();
    // this.getChooseYear();
    this.deepCopy(this.allYear)
    this.getGsid()
  },
  methods: {
    deepCopy(obj) {
      this.footerYear = obj
     console.log( this.footerYear)
    },
     getGsid(){
      let gsid = localStorage.getItem('gs_id')
       let qymc = localStorage.getItem('qymc')
      this.gsId = gsid
      this.qymc = qymc
      console.log("gsid========"+ gsid)
    },
    changeTitle() {
      if (Number(this.$router.currentRoute.query.page) == 1) {
        this.myPageName = "四川佳和建设工程有限公司中标公示记录";
        this.myName = "中标公示";
      } else if (Number(this.$router.currentRoute.query.page) == 2) {
        this.myPageName = "四川佳和建设工程有限公司入围记录";
        this.myName = "入围";
      } else if (Number(this.$router.currentRoute.query.page) == 3) {
        this.myPageName = "四川佳和建设工程有限公司废标记录";
        this.myName = "投标(废标)";
      } else if (Number(this.$router.currentRoute.query.page) == 4) {
        this.myPageName = "四川佳和建设工程有限公司招标公告记录";
        this.myName = "招标公告";
      }
    },
    getEchartsData4() {
      this.loading4 = true
      this.allYear = [];
      console.log(this.myName)
      if (this.myName == "中标公示") {
        let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailZhongB",
          {
            gsid: gsid,
            type: "1",
            area: this.area,
            yjlx: this.yjlx,
            money: this.money
          },
          data => {
            console.log(data);
            this.echartsData4 = data.rows;
            let timeYear = [];
            let allMoney = [];
            let allNum = [];
            let arr = [];
            //操作数组得到echarts需要的数据
            for (let i in this.echartsData4) {
              arr.push(i);
              // console.log(i);
              if (i == this.year) {
                for (let item in this.echartsData4[i]) {
                  allMoney.push(this.echartsData4[i][item].money);
                  allNum.push(this.echartsData4[i][item].count);
                  item = item + "月";
                  timeYear.push(item);
                }
              }
            }
            //数组倒叙  改成我想要 的数据
            for (let j = arr.length - 1; j >= 0; j--) {
              if (arr[j] == "lastYear") {
                arr[j] = "近一年";
              }
              this.allYear.push(arr[j]);
            }
            // console.log(this.allYear);
            this.option4 = {
              title: {
                // text:"近半年中标公示记录"
                text: this.myName + "记录",
                textStyle: {
                  fontSize: 16,
                  fontStyle: "normal"
                }
              },
              tooltip: {},
              legend: {
                // data: ["金额(万元)", "个数(个)"],
                top: 0,
                right: 100
              },
              xAxis: [
                {
                  type: "category",
                  // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
                  data: timeYear,
                  axisPointer: {
                    type: "shadow"
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: "金额(万元)",
                  // interval: 3000,

                  axisLabel: {
                    formatter: "{value}"
                  }
                },
                {
                  type: "value",
                  name: "个数(个)",
                  // interval: 1,

                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "金额(千万元)",
                  type: "bar",
                  barWidth: 20,
                  // data:[2.15, 4.58, 0,0, 1.22, 5.222]
                  data: allMoney,
                  itemStyle: {
                    normal: {
                      color: "#4bb2ff"
                    }
                  }
                },
                {
                  name: "个数(个)",
                  type: "line",
                  yAxisIndex: 1,
                  // data:[3, 2,0,0, 4, 2]
                  data: allNum,
                  itemStyle: {
                    normal: {
                      color: "#ff0000"
                    }
                  }
                }
              ]
            };
              this.loading4 = false
              this.getEchartsData1();
          }
        );
      } else if (this.myName == "入围") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailWin",
          {
            gsid:  gsid,
            type: "2,3",
            area: this.area,
            yjlx: this.yjlx,
            money: this.money
          },
          data => {
            // console.log(data);
            this.echartsData4 = data.rows;
            let timeYear = [];
            let allMoney = [];
            let allNum = [];
            let arr = [];
            //操作数组得到echarts需要的数据
            for (let i in this.echartsData4) {
              arr.push(i);
              // console.log(i);
              if (i == this.year) {
                for (let item in this.echartsData4[i]) {
                  allMoney.push(this.echartsData4[i][item][2].count);
                  allNum.push(this.echartsData4[i][item][3].count);
                  item = item + "月";
                  timeYear.push(item);
                }
              }
            }
            //数组倒叙  改成我想要 的数据
            for (let j = arr.length - 1; j >= 0; j--) {
              if (arr[j] == "lastYear") {
                arr[j] = "近一年";
              }
              this.allYear.push(arr[j]);
            }
            // console.log(this.allYear)
            this.option4 = {
              title: {
                // text:"近半年中标公示记录"
                text: this.myName + "记录",
                textStyle: {
                  fontSize: 16,
                  fontStyle: "normal"
                }
              },
              tooltip: {},
              legend: {
                // data: ["金额(万元)", "个数(个)"],
                top: 0,
                right: 100
              },
              xAxis: [
                {
                  type: "category",
                  // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
                  data: timeYear,
                  axisPointer: {
                    type: "shadow"
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: "个数(个)",
                  // interval: 1,
                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "第二名",
                  type: "bar",
                  // data:[2, 4,7, 2, 2, 7]
                  data: allMoney,
                  barWidth: 20,
                  itemStyle: {
                    normal: {
                      color: "#ff0000"
                    }
                  }
                },
                {
                  name: "第三名",
                  type: "bar",
                  // data:[2, 5, 9, 2, 2, 7]
                  data: allNum,
                  barWidth: 20,
                  itemStyle: {
                    normal: {
                      color: "#4bb2ff"
                    }
                  }
                }
              ]
            };
              this.loading4 = false
              this.getEchartsData1();
          }
        );
      } else if (this.myName == "投标(废标)") {
        this.loading1 = false
        this.loading2 = false
        this.loading3 = false
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailFeiB",
          {
            gsid:  gsid,
            type: "1,2,3,4,10"
          },
          data => {
            // console.log(data);
            this.echartsData4 = data;
            let timeYear = [];
            let allMoney = [];
            let allNum = [];
            let arr = [];
            //操作数组得到echarts需要的数据
            for (let i in this.echartsData4) {
              arr.push(i);
              // console.log(i);
              if (i == this.year) {
                for (let item in this.echartsData4[i]) {
                  allMoney.push(this.echartsData4[i][item][4].count);
                  allNum.push(this.echartsData4[i][item][10].count);
                  item = item + "月";
                  timeYear.push(item);
                }
              }
            }
            //数组倒叙  改成我想要 的数据
            for (let j = arr.length - 1; j >= 0; j--) {
              if (arr[j] == "lastYear") {
                arr[j] = "近一年";
              }
              this.allYear.push(arr[j]);
            }
            // console.log(this.allYear)
            this.option4 = {
              title: {
                // text:"近半年中标公示记录"
                text: this.myName + "记录",
                textStyle: {
                  fontSize: 16,
                  fontStyle: "normal"
                }
              },
              tooltip: {},
              legend: {
                // data: ["金额(万元)", "个数(个)"],
                top: 0,
                right: 100
              },
              xAxis: [
                {
                  type: "category",
                  // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
                  data: timeYear,
                  axisPointer: {
                    type: "shadow"
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: "个数(个)",
                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "废标",
                  type: "bar",
                  stack: "广告",
                  // data:[2, 5, 9, 2, 2, 7]
                  data: allNum,
                  barWidth: 20,
                  itemStyle: {
                    normal: {
                      color: "#4bb2ff"
                    }
                  }
                },
                {
                  name: "投标",
                  type: "bar",
                  stack: "广告",
                  // data:[2, 4,7, 2, 2, 7]
                  data: allMoney,
                  barWidth: 20,
                  itemStyle: {
                    normal: {
                      color: "#ff0000"
                    }
                  }
                }
              ]
            };
              this.loading4 = false
              this.getEchartsData1();
          }
        );
      } else if (this.myName === "招标公告") {
      
          let mygsid = JSON.parse(localStorage.getItem('gs_id'))
          console.log(mygsid)
        this.axios.post(
           
          "/firm/Statistics_comp/countInvite",
          {
            gsid: mygsid,
            zblb: this.zblb,
            xmlx: this.xmlx,
            area: this.area,
        
          },
          data => {
            this.echartsData4 = data.rows;
            let timeYear = [];
            let allMoney = [];
            let allNum = [];
            let arr = [];
            //操作数组得到echarts需要的数据
            for (let i in this.echartsData4) {
              // console.log(i);
              arr.push(i);

              allNum.push(this.echartsData4[i].count);
              timeYear.push(i);
            }

            //数组倒叙  改成我想要 的数据
            for (let j = arr.length - 1; j >= 0; j--) {
              if (arr[j] == "lastYear") {
                arr[j] = "近一年";
              }
              this.allYear.push(arr[j]);
            }
            // console.log(this.allYear)
            this.option4 = {
              title: {
                // text:"近半年中标公示记录"
                text: this.myName + "记录",
                textStyle: {
                  fontSize: 16,
                  fontStyle: "normal"
                }
              },
              tooltip: {},
              legend: {
                // data: ["金额(万元)", "个数(个)"],
                top: 0,
                right: 100
              },
              xAxis: [
                {
                  type: "category",
                  // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
                  data: timeYear,
                  axisPointer: {
                    type: "shadow"
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  name: "个数(个)",
                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "个数(个)",
                  type: "bar",
                  barWidth: 100,
                  // data:[2, 4,7, 2, 2, 7]
                  data: allNum,
                  barWidth: 30,
                  itemStyle: {
                    normal: {
                      color: "#ff0000"
                    }
                  }
                }
              ]
            };
            // console.log(allNum)
              this.loading4 = false
              this.getEchartsData1();
          }
        );
       
      }
      
    },
    getEchartsData1() {
       this.loading1 = true
      if (this.myName == "中标公示") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/stackArea",
          {
            gsid:  gsid,
            type: "1",
            area: this.area,
            yjlx: this.yjlx,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData1 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData1) {
              myArea.push(i);
              myData.push({
                name: i,
                value: this.echartsData1[i].money
              });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            // for (let j = 0; j < myData.length; j++) {
            //   myData[j].name = myArea[j];
            // }
            this.option1.title.text =
              newYear + "四川省" + this.myName + "区域分布：区域所占金额(万元)";
            this.option1.tooltip.formatter =
              this.option1.title.text + "<br/> {b} : {c} ";
            this.option1.legend.data = myArea;
            this.option1.series[0].data = myData;
             this.loading1 = false
             this.getEchartsData2();
          }
        );
      } else if (this.myName == "入围") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/stackArea",
          {
            gsid:  gsid,
            type: "2,3",
            money: this.money,
            yjlx: this.yjlx,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData1 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData1) {
              myArea.push(i);
              myData.push(this.echartsData1[i]);
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myArea)
            // console.log(myData)
            this.option1.title.text =
              newYear + "四川省" + this.myName + "项目区域分布";
            this.option1.legend.data = myArea;
            this.option1.tooltip.formatter =
              this.option1.title.text + "<br/> {b} : {c} ";
            this.option1.series[0].data = myData;
            this.option1.series[0].selected = this.area;
                   this.loading1 = false
                    this.getEchartsData2();
          }
        );
      } else if (this.myName == "投标(废标)") {
         this.loading1 = false
      } else if (this.myName == "招标公告") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/areaCtegory",
          {
            gsid:  gsid,
            zblb: this.zblb,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            console.log(data);
            this.echartsData1 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in data.rows) {
              myArea.push(i);
              myData.push({
                name: i,
                value: data.rows[i]
              });
            }
            console.log(myArea);
            console.log(myData);
            this.option1.title.text =
              newYear + "四川省" + this.myName + "区域分布：区域所占金额(万元)";
            this.option1.tooltip.formatter =
              this.option1.title.text + "<br/> {b} : {c} ";
            this.option1.legend.data = myArea;
            this.option1.series[0].data = myData;
                   this.loading1 = false
                    this.getEchartsData2();
          }
        );
      }
    },
    getEchartsData2() {
             this.loading2 = true
      if (this.myName == "中标公示") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/stackYjlx",
          {
            gsid:  gsid,
            type: "1",
            area: this.area,
            money: this.money,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData2) {
              myArea.push(i);
              myData.push({ value: this.echartsData2[i].money });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myData)
            this.option2.title.text =
              newYear + "四川省业绩类型分布：类型所占金额(万元)";
            this.option2.tooltip.formatter =
              this.option2.title.text + "<br/> {b} : {c} ";
            this.option2.legend.data = myArea;
            this.option2.series[0].data = myData;
                  this.loading2 = false
                   this.getEchartsData3();
          }
        );
      } else if (this.myName == "入围") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          
          "/firm/Statistics_comp/winYjlx",
          {
            gsid:  gsid,
            type: "2,3",
            area: this.area,
            money: this.money,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData2) {
              myArea.push(i);
              myData.push({ value: this.echartsData2[i] });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myArea)
            // console.log(myData)
            this.option2.title.text =
              newYear + "四川省业绩类型分布：类型所占金额(万元)";
            this.option2.tooltip.formatter =
              this.option2.title.text + "<br/> {b} : {c} ";
            this.option2.legend.data = myArea;
            this.option2.series[0].data = myData;
                 this.loading2 = false
                  this.getEchartsData3();
          }
        );
      } else if (this.myName == "投标(废标)") {
         this.loading2 = false
      } else if (this.myName == "招标公告") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/projectCtegory",
          {
            gsid:  gsid,
            zblb: this.zblb,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData2 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData2) {
              myArea.push(i);
              // console.log(i)
              myData.push({ value: this.echartsData2[i].count });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myData)
            this.option2.title.text =
              newYear + "四川省业绩类型分布：类型所占金额(万元)";
            this.option2.tooltip.formatter =
              this.option2.title.text + "<br/> {b} : {c} ";
            this.option2.legend.data = myArea;
            this.option2.series[0].data = myData;
                 this.loading2 = false
                  this.getEchartsData3();
          }
        );
      }
    },
    getEchartsData3() {
      this.loading3 = true
      if (this.myName == "中标公示") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/getMoneyStack",
          {
            gsid:  gsid,
            type: "1",
            area: this.area,
            yjlx: this.yjlx,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData3) {
              myArea.push(i);
              myData.push({ value: this.echartsData3[i].money });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myData)
            this.option3.title.text = newYear + "中标金额";
            this.option3.tooltip.formatter =
              this.option3.title.text + "<br/> {b} : {c} ";
            this.option3.legend.data = myArea;
            this.option3.series[0].data = myData;
            this.loading3 = false
          }
        );
      } else if (this.myName == "入围") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/winMoneyStack",
          {
            gsid:  gsid,
            type: "2,3",
            area: this.area,
            yjlx: this.yjlx,
            year: this.year
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData3) {
              myArea.push(i);
              myData.push({ value: this.echartsData3[i] });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myArea);
            // console.log(myData);
            this.option3.title.text = newYear + "中标金额";
            this.option3.tooltip.formatter =
              this.option3.title.text + "<br/> {b} : {c} ";
            this.option3.legend.data = myArea;
            this.option3.series[0].data = myData;
                this.loading3 = false
          }
        );
      } else if (this.myName == "投标(废标)") {
         this.loading3 = false
      } else if (this.myName == "招标公告") {
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/biddingCtegory",
          {
            gsid:  this.gsId?this.gsId:gsid,
            zblb: this.zblb,
            xmlx: this.xmlx,
            area: this.area
          },
          data => {
            // console.log(data);
            this.echartsData3 = data.rows;
            let myArea = [];
            let myData = [];
            let newYear = "";
            for (let i in this.echartsData3) {
              myArea.push(i);
              myData.push({ value: this.echartsData3[i] });
            }
            if (this.year == "lastYear") {
              newYear = "近一年";
            } else {
              newYear = this.year;
            }
            for (let j = 0; j < myData.length; j++) {
              myData[j].name = myArea[j];
            }
            // console.log(myData)
            this.option3.title.text = newYear + "中标金额";
            this.option3.tooltip.formatter =
              this.option3.title.text + "<br/> {b} : {c} ";
            this.option3.legend.data = myArea;
            this.option3.series[0].data = myData;
            this.loading3 = false
          }
        );
      }
    },
    changeData(val, id) {
      // console.log(val)
      this.echartsVal = "";
      if (id == 1) {
        this.area = val.name;
        this.getEchartsData4();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 2) {
        let name = val.name;
        this.yjlx = val.name;
        this.xmlx = this.echartsData2[name].xmlx;
        this.getEchartsData4();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 3) {
        this.money = val.name;
        this.zblb = val.name;
        this.getEchartsData4();
        this.getEchartsData1();
        this.getEchartsData2();
        this.getEchartsData3();
      } else if (id == 4) {
         this.pageNum = 1
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
      this.area = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    delateYjlx() {
      this.yjlx = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
    },
    delateMoney() {
      this.money = "";
      this.getEchartsData4();
      this.getEchartsData1();
      this.getEchartsData2();
      this.getEchartsData3();
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
         let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailMonth",
          {
            gsid:  this.gsId? this.gsId:gsid,
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
          let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailWinner",
          {
            gsid:  this.gsId?this.gsId:gsid,
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
          let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailFeiBMonth",
          {
            gsid:  this.gsId?this.gsId:gsid,
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
          let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailMonth",
          {
            gsid:  this.gsId?this.gsId:gsid,
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
          let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailWinner",
          {
            gsid:  this.gsId?this.gsId:gsid,
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
        else if (this.myName == "投标(废标)") {
            let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailFeiBMonth",
          {
            gsid:  this.gsId?this.gsId:gsid,
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
    getAllDetailMonth(){
         this.centerDialogVisible = true;
           let gsid = localStorage.getItem('gs_id')
        this.axios.post(
          "/firm/Statistics_comp/detailInvitecount",
          {
            gsid:  this.gsId?this.gsId:gsid,
            area: this.area,
            zblb: this.zblb,
            xmlx: this.zblb,
            page: this.pageNum,
            rows: this.rows,
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