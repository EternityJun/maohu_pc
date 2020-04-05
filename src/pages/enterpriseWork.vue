<!--  -->
<template>
  <div class="enterpriseWork">
    <el-container>
      <el-header style="height:120px">
        <div>
          <div class="mytitle" >
          <p>{{qymc}}数据可视化监控系统</p>
          </div>
            <!-- <div>
            <el-row :gutter="20" class="headerFooter">
              <el-col :span="22" :offset="2">
                <el-row :gutter="20">
                  <el-col class="smallTitle">公共资源交易</el-col>
                  <el-col class="smallTitle">四川建设网</el-col>
                  <el-col class="smallTitle">政府采购网</el-col>
                  <el-col class="smallTitle">招标比选网</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div> -->
        </div>
      </el-header>
      <el-main>
        <header>
          <p id="enterpriseIndexTitle" v-if="titleNum.money">
            <span class="mySpan">{{titleNum.year}}</span>
            年中标总额:
            <span v-if="titleNum.money.亿">
              <span class="mySpan">{{titleNum.money.亿}}</span>亿
            </span>
            <span v-if="titleNum.money.万">
              <span class="mySpan">{{titleNum.money.万}}</span>万
            </span>
            <span v-if="titleNum.money.元">
              <span class="mySpan">{{titleNum.money.元}}</span>元
            </span>
            <span>中标个数:</span>
            <span class="mySpan">{{titleNum.count}}</span>
            个
          </p>
        </header>
        <section>
          <el-row :gutter="20">
            <el-col :span="12" :offset="1" style="margin-top:20px;">
              <el-row :gutter="20"  v-loading="loading5">
                <el-col :span="12">
                  <!-- <EnterpriseMap ></EnterpriseMap> -->
                  <EnterpriseEcharts :option="option5" :id="id5" :height="height1" :width="width1"></EnterpriseEcharts>
                </el-col>
                <el-col :span="12" style="margin-top:20px;">
                  <EnterpriseAnnouncement :data="mapAnnouncement" @changeData = changeTableData></EnterpriseAnnouncement>
                  <div id="myBtn">
                    <el-button @click="allTableData(pageNum,rows)">查看所有>></el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="11"  :offset="1 " class="echartsBacCol">
                  <EnterpriseEcharts
                    :option="option1"
                    :id="id1"
                    :height="height"
                    @myClick="openDetails"
                     v-loading="loading1"
                    :width="width"
                  ></EnterpriseEcharts>
                </el-col>
                <el-col :span="11" :offset="1 " class="echartsBacCol">
                  <EnterpriseEcharts
                    :option="option2"
                    :id="id2"
                    :height="height"
                    @myClick="openDetails"
                     v-loading="loading2"
                    :width="width"
                  ></EnterpriseEcharts>
                </el-col>
                <el-col :span="11" :offset="1 " class="echartsBacCol">
                  <EnterpriseEcharts
                    :option="option3"
                    :id="id3"
                    :height="height"
                    @myClick="openDetails"
                     v-loading="loading3"
                    :width="width"
                  ></EnterpriseEcharts>
                </el-col>
                <el-col :span="11" :offset="1" class="echartsBacCol">
                  <EnterpriseEcharts
                    :option="option4"
                    :id="id4"
                    :height="height"
                    @myClick="openDetails"
                    v-loading="loading4"
                    :width="width"
                  ></EnterpriseEcharts>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </section>
         <el-dialog
            title="列表详情"
            :visible.sync="centerDialogVisible"
            width="80%"
            center>
            <EnterpriseTable :tableData="tableData" :pageName = "pageName" :pageNum = "pageNum" :rows = "rows" @changeListData ="changeListData" ></EnterpriseTable>
          </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import EnterpriseEcharts from "./template/Enterprise_echarts";
import EnterpriseAnnouncement from "./template/Enterprise_announcement";
import EnterpriseTable from "./template/Enterprise_table";
// import EnterpriseMap from "./template/Enterprise_map"
export default {
  name: "enterpriseWork",
  data() {
    return {
      //第一个请求的模拟数据
      // company_list: [
      //   {
      //     user_id: "5235",
      //     gs_id: "7583",
      //     company: "四川佳和建设工程有限公司",
      //     flag: "1"
      //   }
      // ],
      company_list:[],
      //标题信息模拟
      titleNum: {},
      // 地图 公告 模拟信息
      homeMonitor: [],
      //近半年中标公示记录 模拟
      countZhongB: {},
      //近半年入围记录 模拟
      countWIN: {},
      //近半年废标记录 模拟
      countFeiB: {},
      //招标公高记录 模拟
      countInvite: {},
      height: "280px",
      width: "320px",
      //4个echarts公用的样式
      id1: "1",
      myClick1: "myClick1",
      option1: {
        title: {
          text: "近半年中标公示记录"
        },
         grid:{
                    x:50,
                    y:60,
                    x2:50,
                    y2:50,
             
                },
        tooltip: {},
        legend: {
          data: ["金额(千万元)", "个数(个)"],
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
            data: [],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "金额(千万元)",
        
            
            axisLabel: {
              formatter: "{value}"
            }
          },
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
            name: "金额(千万元)",
            type: "bar",
            barWidth: 20,
            // data:[2.15, 4.58, 0,0, 1.22, 5.222]
            data: [],
            itemStyle:{
                normal:{
                color:'#4bb2ff'
                }
              }
          },
          {
            name: "个数(个)",
            type: "line",
            yAxisIndex: 1,
            // data:[3, 2,0,0, 4, 2]
              itemStyle:{
                normal:{
              color:'#ff0000'
                }
              },
            data: [],
          }
        ]
      },
      //中标记录表的数据
      id2: "2",
      myClick2: "myClick2",
      option2: {
        title: {
          text: "近半年入围记录"
        },
         grid:{
                    x:50,
                    y:60,
                    x2:50,
                    y2:50,
             
                },
        tooltip: {},
        legend: {
          data: ["第二名", "第三名"],
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
            data: [],
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
            name: "第二名",
            type: "bar",
            // data:[2, 4,7, 2, 2, 7]
            data: [],
             itemStyle:{
                normal:{
              color:'#ff0000'
                }
              }
          },
          {
            name: "第三名",
            type: "bar",
            // data:[2, 5, 9, 2, 2, 7]
            data: [],
             itemStyle:{
                normal:{
                
                  color:'#4bb2ff'
                }
              }
          }
        ]
      },
      //入围记录表的数据
      id3: "3",
      myClick3: "myClick3",
      option3: {
        title: {
          text: "近半年投标(废标)记录"
        },
         grid:{
                    x:50,
                    y:60,
                    x2:50,
                    y2:50,
             
                },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["投标", "废标"],
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            // data: ['2018-12','2019-01','2019-02','2019-03','2019-04','2019-05'],
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "个数(个)"
          }
        ],
        series: [
          {
            name: "投标",
            type: "bar",
            stack: "广告",
            barWidth: 20,
            // data:[8, 9, 4, 5, 6, 7]
            data: [],
             itemStyle:{
                normal:{
                color:'#ff0000'
                }
              }
          },
          {
            name: "废标",
            type: "bar",
            stack: "广告",
            barWidth: 20,
            // data:[9, 13, 9, 8, 2, 0]
            data: [],
             itemStyle:{
                normal:{
                color:'#4bb2ff'
                }
              }
          }
        ]
      },
      //投标（废标）表的数据
      id4: "4",
      myClick4: "myClick4",
      option4: {
        title: {
          text: "近期符合公司的招标公告"
        },
         grid:{
                    x:50,
                    y:60,
                    x2:50,
                    y2:50,
             
                },
        tooltip: {},
        legend: {
          bottom: 0
        },
        xAxis: [
          {
            type: "category",
            // data: ["正在报名","正在投标","今日开标"],
            data: [],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "个数(个)",
            interval: 200,
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        itemStyle: {},
        series: [
          {
            name: "个数(个)",
            type: "bar",
            barWidth: 20,
            // data:[255, 854,682],
            data: [],
            itemStyle:{
                normal:{
                color:'#ff0000'
                }
              }
          }
        ]
      },
      //招标公告表的数据
      id5: "echarts5",
      height1: "400px",
      width1: "400px",
      option5: {
        title: {
          text: "四川省公开招标项目中标区域分布图"
        },
        //这个对象是有数据的颜色
        visualMap: {
          show: false, //不显示右下的颜色条
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
      //四川地图要的数据
      mapAnnouncement: {},
      //这个是地图胖公告数据
      mapLength: 0,
      //地图展示第几个 轮播的变量
      centerDialogVisible:false,
      pageName:"企业首页",
      pageNum:1,
      rows:10,
      tableData:"",
       loading5:true,
       loading4:true,
       loading3:true,
       loading2:true,
       loading1:true,
       gsId:"",
       qymc:''
    };
  },

  components: {
    EnterpriseAnnouncement,
    EnterpriseEcharts,
    EnterpriseTable
    // EnterpriseMap
  },
  created() {
    this.getGsid()
    // this.getCompany_list()
    this.getTitleNum();
    this.getHomeMonitor();
    this.getCountZhongB();
    this.getCountWIN();
    this.getCountFeiB();
    this.getCountInvite();
  },
  methods: {
    getGsid(){
      let gsid = JSON.parse(localStorage.getItem('gs_id'))
      let qymc = localStorage.getItem('qymc')
      this.gsId = gsid
      this.qymc = qymc
      console.log("gsid========"+ gsid)
    },
    getTitleNum() {
      this.axios.post("/firm/Statistics_comp/titleNum", {}, data => {
        this.titleNum = data;
      });
    },
    getHomeMonitor() {
      this.axios.post("/firm/Statistics_comp/homeMonitor", {}, data => {
        this.homeMonitor = data.rows;
       
        // console.log( data)
         this.play();
          this.loading5 = false
      });
    },
    getCountZhongB() {
      this.axios.post(
        "/firm/Statistics_comp/countZhongB",
        { gsid: this.gsId, type: 1 },
        data => {
          if (data.status == "success") {
            this.countZhongB = data.result.rows;
              // console.log(data)
            let timeYear = [];
            let allMoney = [];
            let allNum = [];
            for (let i in this.countZhongB) {
              if (i != "year") {
                timeYear.push(i);
                allMoney.push(this.countZhongB[i].money);
                allNum.push(this.countZhongB[i].count);
              }
            }
       
            // console.log(timeYear)
            // console.log(allMoney)
            // console.log(allNum)
            this.option1.xAxis[0].data = timeYear;
            this.option1.series[0].data = allMoney;
            this.option1.series[1].data = allNum;
            this.loading1 = false
          }
        }
      );
      //X轴的数据
    },
    getCountWIN() {
      // console.log(this.$store.state)
      this.axios.post(
        "/firm/Statistics_comp/countWIN",
        { gsid:this.gsId,type:"2,3"},
        data => {
          this.countWIN = data.result.rows
          // console.log(data)
            let timeYear = [];
            let twoNum = [];
            let threeNum = [];
            for (let i in data.result.rows) {
              timeYear.push(i)
              twoNum.push(data.result.rows[i][2].count)
              threeNum.push(data.result.rows[i][3].count)
            }
          this.option2.xAxis[0].data = timeYear;
          // console.log(timeYear)
          this.option2.series[0].data = twoNum;
          // console.log(twoNum)
          this.option2.series[1].data = threeNum;
          // console.log(threeNum)
           this.loading2 = false
        })
    },
    getCountFeiB() {
        this.axios.post(
        "/firm/Statistics_comp/countFeiB",
        {gsid: this.gsId,type: "1,2,3,4,10" },
        data => {
          // console.log(data)
           this.countFeiB = data.result
             let timeYear = [];
      let fourNum = [];
      let tenNum = [];
      for (let i in this.countFeiB) {
        if (i != "year") {
          timeYear.push(i);
          fourNum.push(this.countFeiB[i][4].count);
          tenNum.push(this.countFeiB[i][10].count);
        }
      }
      this.option3.xAxis[0].data = timeYear;
      // console.log(timeYear)
      this.option3.series[0].data = fourNum;
      // console.log(fourNum)
      this.option3.series[1].data = tenNum;
      //  console.log(tenNum)
      this.loading3 = false
        })
    },
    getCountInvite() {
         this.axios.post(
        "/firm/Statistics_comp/countInvite",
        {gsid: this.gsId,type:"" },
        data => {
          // console.log(data)
          this.countInvite = data.rows
            let timeYear = [];
      let fourNum = [];
      let myNum = [];
      for (let i in this.countInvite) {
        if (i != "year") {
          timeYear.push(i);
          myNum.push(this.countInvite[i].count);
        }
      }
      this.option4.xAxis[0].data = timeYear;
      // console.log(timeYear)
      this.option4.series[0].data = myNum;
      // console.log(myNum)
      this.loading4 = false
        })  
    },
    changeMap() {
      if (this.mapLength < this.homeMonitor.length) {
        this.mapAnnouncement = this.homeMonitor[this.mapLength];
        this.mapLength++;
        //  console.log( this.mapLength)
        let data = {};
        data = JSON.parse(JSON.stringify(this.mapAnnouncement.地图数据));
        if (data.name == "甘孜") {
          data.name = "甘孜藏族自治州";
        } else if (data.name == "阿坝") {
          data.name = "阿坝藏族羌族自治州";
        } else if (data.name == "凉山") {
          data.name = "凉山彝族自治州";
        } else {
          data.name = data.name + "市";
        }
        let myData = [];
        myData.push(data);
        this.option5.series[0].data = myData;
      } else {
        this.mapLength = 0;
      }
    },
    play() {
      setInterval(this.changeMap, 2000);
    },
    openDetails(val) {
      let routeData = this.$router.resolve({
          name: "enterpriseZb",
          query: {
          page: val
          }
        });
        window.open(routeData.href, '_blank');
    },
    allTableData(page,rows){
      this.pageNum = 1
      this.centerDialogVisible =true;
       this.axios.post(
        "/firm/Statistics_comp/monitorDetail",
        { 
          gsid: this.gsId, 
          page:page,
          rows:rows 
        },
        data => {
          // console.log(data)
          this.tableData = data
        })
    },
    changeTableData(){
       this.axios.post(
        "index/Tendering/tendBidDetail ",
        { 
          zbxx_id: 7583, 
          zbgs_id:page,
          type:rows 
        },
        data => {
          // console.log(data)
        })
    },
     changeListData(val,newTime){
         this.pageNum = val 
         this.axios.post(
        "/firm/Statistics_comp/monitorDetail",
        { 
          gsid: this.gsId, 
          page:this.pageNum,
          rows:this.rows 
        },
        data => {
          // console.log(data)
          this.tableData = data
        })
    }

  },
  // mounted: function() {
  //   this.play();
  // }
};
</script>
<style lang='less' scoped>
.enterpriseWork{
  background-color: #fafafa;
  min-height: 100vmin
}
.clear:after {
  height: 0;
  display: block;
  content: "";
  visibility: hidden;
  clear: both;
}
.mytitle {
  text-align: center;
  height: 40px;
  padding: 10px 0;
  line-height: 40px;
  font-size: 30px;
  border-bottom: 1px solid black;
}
.smallTitle {
  background-color: brown;
  height: 40px;
  width: 120px;
  margin-left: 20px;
}
.headerFooter {
  height: 80px;
  padding: 20px;
}
.enterpriseSelect {
  text-align: right;
}
#enterpriseIndexTitle {
  padding: 20px 0 40px;
  font-size: 30px;
  letter-spacing: 8px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.mySpan {
  color: #449dd4;
}
#myBtn {
  text-align: center;
  margin-top: 50px;
}
.echartsBacCol{
  background-color: #FFF;
  padding: 10px 0;
  margin-top: 20px 
}
</style>