<!--  -->
<template>
  <div class="zbMonitoringSystem">
    <el-container>
      <el-header style="height:120px">
        <div>
          <div class="mytitle">
            <p>{{qymc}}数据可视化监控系统</p>
          </div>
          <div>
            <el-row class="headerFooter">
              <el-col :span="10" :offset="2">
                <el-row>
                  <el-col class="smallTitle" @click.native="openSearch('公共资源交易网')">公共资源交易网</el-col>
                  <el-col class="smallTitle"  @click.native="openSearch('四川建设网')">四川建设网</el-col>
                  <el-col class="smallTitle"  @click.native="openSearch('政府采购网')">政府采购网</el-col>
                  <el-col class="smallTitle"  @click.native="openSearch('招标比选网')">招标比选网</el-col>
                </el-row>
              </el-col>
              <el-col :span="8" :offset="2">
                <el-input placeholder="请输入内容" v-model="searchInput">
                  <el-button slot="append" icon="el-icon-search" @click="openSearch()"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-main>
        <header>
          <p id="enterpriseIndexTitle" v-if="titleNum.time">
            <span>{{titleNum.time}}</span>
            招标数据共：
            <span class="mySpan">{{titleNum.total}}</span>
            条
          </p>
        </header>
        <section>
          <el-row :gutter="20">
            <el-col :span="12" :offset="1" style="margin-top:20px;">
              <el-row :gutter="20" v-loading="loading5">
                <el-col :span="12">
                  <!-- <EnterpriseMap ></EnterpriseMap> -->
                  <EnterpriseEcharts :option="option5" :id="id5" :height="height1" :width="width1"></EnterpriseEcharts>
                </el-col>
                <el-col :span="12" style="margin-top:20px;">
                  <EnterpriseAnnouncement :data="mapAnnouncement" @changeData="changeTableData"></EnterpriseAnnouncement>
                  <div id="myBtn">
                    <el-button @click="allTableData(pageNum,rows)">查看所有>></el-button>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-row>
                <el-col :span="11" :offset="1 " class="echartsBacCol">
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
        <el-dialog title="列表详情" :visible.sync="centerDialogVisible" width="80%" center>
          <EnterpriseTable
             v-loading = 'tableLoading'
            :tableData="tableData"
            :pageName="pageName"
            :pageNum="pageNum"
            :rows="rows"
            @changeListData="changeListData"
          ></EnterpriseTable>
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
  name: "zbMonitoringSystem",
  data() {
    return {
      //搜索input
      searchInput: "",
      //第一个请求的模拟数据
      // company_list: [
      //   {
      //     user_id: "5235",
      //     gs_id: "7583",
      //     company: "四川佳和建设工程有限公司",
      //     flag: "1"
      //   }
      // ],
      company_list: [],
      //标题信息模拟
      titleNum: {},
      // 地图 公告 模拟信息
      homeMonitor: [],
      //建筑施工 模拟
      construction: {},
      //建筑监理 模拟
      investigate: {},
      //勘察设计 模拟
      consulting: {},
      //代理造价咨询 模拟
      countInvite: {},
      height: "280px",
      width: "320px",
      //4个echarts公用的样式
      id1: "1",
      myClick1: "myClick1",
      option1: {
        title: {
          text: "建筑施工"
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
      //建筑施工
      id2: "2",
      myClick2: "myClick2",
      option2: {
        title: {
          text: "建筑监理"
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
            cneter: ["50%", "60%"],
           
          }
        ]
      },
      //建筑监理
      id3: "3",
      myClick3: "myClick3",
      option3: {
        title: {
          text: "勘察设计"
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
            cneter: ["50%", "60%"],
          }
        ]
      },
      //勘察设计
      id4: "4",
      myClick4: "myClick4",
      option4: {
        title: {
          text: "代理、造价咨询"
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
            cneter: ["50%", "60%"],
          }
        ]
      },
      //代理造价咨询
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
      centerDialogVisible: false,
      pageName: "招标首页",
      pageNum: 1,
      rows: 10,
      tableData: "",
      loading5: true,
      loading4: true,
      loading3: true,
      loading2: true,
      loading1: true,
      tableLoading:true,
      gsId: "",
      qymc: ""
    };
  },

  components: {
    EnterpriseAnnouncement,
    EnterpriseEcharts,
    EnterpriseTable
    // EnterpriseMap
  },
  created() {
    document.title = '数据可视化监控系统'
    this.getGsid();
    this.getTitleNum();
    this.getStatisticMonitor("建筑施工");
    this.getStatisticMonitor("建筑监理");
    this.getStatisticMonitor('勘察设计')
    this.getStatisticMonitor('代理、造价咨询')
  },
  methods: {
    openSearch(val){
      if(val){
          let routeData = this.$router.resolve({
          name: "zbMonitoringSearch",
          query: {
            page: val
          }
        });
        window.open(routeData.href, val);
      }else{
           let routeData = this.$router.resolve({
          name: "zbMonitoringSearch",
          query: {
            search: this.searchInput
          }
        });
        window.open(routeData.href, this.searchInput);
      }
      
    },
    getGsid() {
      let gsid = JSON.parse(localStorage.getItem("gs_id"));
      let qymc = localStorage.getItem("qymc");
      this.gsId = gsid;
      this.qymc = qymc;
      console.log("gsid========" + gsid);
    },
    getTitleNum() {
      this.axios.post("/index/Statistics_Tender/titleNum", {}, data => {
        this.titleNum = data;
        this.homeMonitor = data.rows;
        this.play();
        this.loading5 = false;
      });
    },
    getStatisticMonitor(type) {
      this.axios.post(
        "/index/Statistics_Tender/statisticMonitor",
        { type: type },
        data => {
          if (data.status == "success") {
            if (type == "建筑施工") {
              this.construction = data.rows;
              let allXmlx = [];
              let allValue = [];
              // console.log(this.construction.xmlx)
              for (let i = 0; i < this.construction.xmlx.length; i++) {
                allXmlx.push(this.construction.xmlx[i].name);
                allValue.push(this.construction.xmlx[i].value);
              }
              console.log(this.option1);
              this.option1.xAxis[0].data = allXmlx;
              this.option1.series[0].data = allValue;
              this.loading1 = false;
            }
            if (type == "建筑监理") {
              this.supervision = data.rows;
              this.option2.series[0].data =this.supervision.area;
              this.loading2 = false;
            }
            if (type == "勘察设计") {
              this.investigate = data.rows;
              this.option3.series[0].data =this.investigate.area;
              this.loading3 = false;
            }
            if (type == "代理、造价咨询") {
              this.consulting = data.rows;
              this.option4.series[0].data =this.consulting.area;
              this.loading4 = false;
            }
          } else {
            this.$message({
              message: data.message,
              type: "warning"
            });
             this.loading1 = false;
             this.loading2 = false;
             this.loading3 = false;
             this.loading4 = false;
          }
        }
      );
    },
    changeMap() {
      if (this.mapLength < this.homeMonitor.length) {
        this.mapAnnouncement = this.homeMonitor[this.mapLength];
        this.mapLength++;
        //  console.log( this.mapLength)
        let data = {};
        data = JSON.parse(JSON.stringify(this.mapAnnouncement.map));
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
        name: "zbMonitoringDetails",
        query: {
          page: val
        }
      });
      window.open(routeData.href, val);
    },
    allTableData(page, rows) {
      this.tableLoading = true
      this.pageNum = 1;
      this.centerDialogVisible = true;
      this.axios.post(
        "/index/Statistics_Tender/titleNum",
        {
          page: page,
          rows: rows
        },
        data => {
           this.tableLoading = false
          // console.log(data)
          this.tableData = data;
        }
      );
    },
    changeTableData() {
      this.axios.post(
        "index/Tendering/tendBidDetail ",
        {
          zbxx_id: 7583,
          zbgs_id: page,
          type: rows
        },
        data => {
          // console.log(data)
        }
      );
    },
    changeListData(val, newTime) {
       this.tableLoading = true
      this.pageNum = val;
      this.axios.post(
        "/index/Statistics_Tender/titleNum",
        {
          page: this.pageNum,
          rows: this.rows
        },
        data => {
           this.tableLoading = false
          // console.log(data)
          this.tableData = data;
        }
      );
    }
  }
};
</script>
<style lang='less' scoped>
.zbMonitoringSystem {
  background-color: #fafafa;
  min-height: 100vmin;
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
  cursor: pointer;
  background-color: #2f80d1;
  border-radius: 5px;
  height: 40px;
  color: white;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
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
.echartsBacCol {
  background-color: #fff;
  padding: 10px 0;
  margin-top: 20px;
}
</style>