<template>
  <div class="search-zz-new-page">
    <div class="title">全国建筑企业“ZRY”模型统计分析</div>
    <div class="content_div">
      <div class="row-cond">
        <div>
          <span class="cond-name">资质条件</span>
          <el-input class="cond-input" size="medium" readonly placeholder="请选择资质条件" @focus="onOpentk('apt')"></el-input>
        </div>
        <div>
          <span class="cond-name">人员条件</span>
          <el-input class="cond-input" size="medium" readonly placeholder="请选择资质条件" @focus="onOpentk('per')"></el-input>
        </div>
        <div>
          <span class="cond-name">业绩条件</span>
          <el-input class="cond-input" size="medium" readonly placeholder="请选择资质条件" @focus="onOpentk('pro')"></el-input>
        </div>
      </div>
      <div class="row-count">
        <div class="detailCountAll" @click="toList('','all','',countAll1,countSc1,countRc1,'','')">
          <div class="count">{{countAll1}}</div>
          <div class="countName">全部</div>
        </div>
        <div class="detailCountSc" @click="toList('','prov','',countAll1,countSc1,countRc1,'','')">
          <div class="count">{{countSc1}}</div>
          <div class="countName">{{prov}}</div>
        </div>
        <div class="detailCountRc" @click="toList('','r_prov','',countAll1,countSc1,countRc1,'','')">
          <div class="count">{{countRc1}}</div>
          <div class="countName">{{r_prov}}</div>
        </div>
      </div>
      <div class="row-map">
        <el-container>
          <zz-map :style="{width:'600px'}" mapRef="pieChart1" v-if="updateMap"  canvasId="piecanvas1" :mapData="mapData1" :province="full_prov" @clickMap="clickMap($event)" @mapFinish="mapFinish"></zz-map>
        </el-container>
        
      </div>
      <div class="row-bar">
        <div class="bar-item">
          <zzBar barref="barChart1"  :barOption="barCurData1" title="资质" :prov="prov" :rProv="r_prov" />
          <!-- <view class="scroll-x-w">
            <scroll-view scroll-x="true" class="scroll-x">
              <view class="scroll-item-con">
                <view class="scroll-item" v-for="(item,index) in barTypeList1" :key="index" @click="changeZzBar('one',index)">
                  <view v-if="item.focus" class="scroll-item-focus">
                    {{item.name}}
                  </view>
                  <view v-else class="scroll-item-normal">
                    {{item.name}}
                  </view>
                </view>
              </view>
            </scroll-view>
          </view> -->
        </div>
        <div class="bar-item" v-if="searchTitle2">
          <zzBar barref="barChart2" barOption="" :title="searchTitle2" :prov="prov" :rProv="r_prov" />
          <!-- <view class="scroll-x-w">
            <scroll-view scroll-x="true" class="scroll-x">
              <view class="scroll-item-con">
                <view class="scroll-item" v-for="(item,index) in barTypeList1" :key="index" @click="changeZzBar('one',index)">
                  <view v-if="item.focus" class="scroll-item-focus">
                    {{item.name}}
                  </view>
                  <view v-else class="scroll-item-normal">
                    {{item.name}}
                  </view>
                </view>
              </view>
            </scroll-view>
          </view> -->
        </div>
        <div class="bar-item" v-if="searchTitle3">
          <zzBar barref="barChart3" barOption="" :title="searchTitle3" :prov="prov" :rProv="r_prov" />
          <!-- <view class="scroll-x-w">
            <scroll-view scroll-x="true" class="scroll-x">
              <view class="scroll-item-con">
                <view class="scroll-item" v-for="(item,index) in barTypeList1" :key="index" @click="changeZzBar('one',index)">
                  <view v-if="item.focus" class="scroll-item-focus">
                    {{item.name}}
                  </view>
                  <view v-else class="scroll-item-normal">
                    {{item.name}}
                  </view>
                </view>
              </view>
            </scroll-view>
          </view> -->
        </div>
      </div>
    </div>
    <el-dialog title="选择资质" width="80%" :visible.sync="dialogVisible1">
      <zz-search  @onSearch="onSearch" ref='ch'  v-if="dialogVisible1" ></zz-search>
      <!-- <zz-search v-if="dialogVisible1"></zz-search> -->
    </el-dialog>
    <el-dialog title="选择人员" width="80%" :visible.sync="dialogVisible2">
      <!-- <zz-search @onSearch="onSearch" v-if="dialogVisible2"></zz-search> -->
    </el-dialog>
    <el-dialog title="选择业绩" width="80%" :visible.sync="dialogVisible3">
      <!-- <zz-search @onSearch="onSearch" v-if="dialogVisible3"></zz-search> -->
    </el-dialog>
  </div>
</template>
<script>
import zzSearch from "./template/zzSearch";
import zzBar from "./template/zzBar";
import zzMap from "./template/zgmap";

export default {
  components: {
    zzSearch,
    zzBar,
    zzMap
  },
  data() {
    return {
      menuKey: 1,

      showTxt: true,
      value: null,
      refresh: false,
      page: 1,
      row: 20,
      selected_item: {}, // 选中的条数对象
      sc_areaArray: [], // 四川地区
      rc_areaArray: [], // 入川地区
      all_areaArray: [],

      selected_area: {
        value_sc: "四川",
        value_rc: "入川",
        type: "全部"
      },
      tableData: [],
      loading: false,
      zz_total_array: [], // 左边资质统计结果
      sc_zz_total: 0,
      rc_zz_total: 0,
      search_total: 0,
      search_count: 0,
      all_total: 0,
      role: {},
      sortType: "默认排序", //默认排序/关系排序
      checked_area: {}, //选择的地区属地
      selectValAll: "",

      prov: "", //选的省
      r_prov: "", //入X省
      full_prov: "", //选的省的全称

      apt_id: "",
      fromShare: false,
      per_dict: "", //staff_dict
      // 数量
      countAll1: 0, //第一块 所有条数
      countSc1: 0, //第一块 四川条数
      countRc1: 0, //第一块 入川条数
      // 地图
      updateMap: true, //编辑条件返回后重新加载地图
      mapData1: null, //第一块 地图数据
      ifMapFinish1: false, //地图加载完毕
      // 柱状图
      barTypeList1: [],
      barCurData1: null,
      ifBarData1: false, //柱状图是否有数据
      ifBarFinish1: false, //柱状图加载完毕
      dialogVisible1: false,
      // condStr1: "", //第一块 条件展示

      searchTitle2: "", //第一个附加的搜索条件名称，业绩/人员
      barTypeList2: [],
      barCurData2: null,
      ifBarData2: false,
      dialogVisible2: false,
      // condStr2: "",

      searchTitle3: "",
      barTypeList3: [],
      barCurData3: null,
      ifBarData3: false,
      dialogVisible3: false,
      checked_area: {}, //选择的地区属地
      // condStr3: "",

      apt_cond: {},
      condition_top: [],
      aptitude: null
    };
  },
  created() {
    document.title = "资质搜索";
    let checked_area = JSON.parse(localStorage.getItem("setzzSearchArea"));

    this.prov = checked_area.prov;
    this.r_prov = checked_area.r_prov;
    this.full_prov = checked_area.full_prov;
    console.log(checked_area,2);
    this.searchZz();
    this.onSearch();
    this.getData();
    // this.getArea('prov')
    // this.getArea('r_prov')
  },
  computed: {
    lastCond() {
      let cate = "";
      let cate2 = this.searchTitle3
        ? this.searchTitle3
        : this.searchTitle2 ? this.searchTitle2 : "资质";
      if (cate2 == "资质") {
        cate = "apt";
      } else if (cate2 == "人员") {
        cate = "per";
      } else if (cate2 == "业绩") {
        cate = "pro";
      }
      return cate;
    }
  },
  watch: {
    
    $route: function() {
      window.location.reload();
    },
    // dialogVisible: function(val) {
    //   if (val === true) {
    //     // 当对话框打开时重置选择内容
    //     this.selected_item = {};
    //   }
    // }
    ifMapFinish1(val) {
      if (val) {
        // console.log("ifMapFinish1", val);
        this.isShowLoad = false;
      }
    }
  },
  methods: {
    // 资质搜索
    searchZz() {
      // this.$api(
      //   "firm/Apt_Per_Pro_Search/mapStats",
      //   {
      //     apt_id: this.apt_id,
      //     query_cate: type
      //   },
      //   data => {
      //     if (data.status == "success") {
      //       this.handleMapData(data, type);
      //     } else {
      //       // uni.showToast({
      //       //   title: "地图数据请求失败",
      //       //   duration: 2000,
      //       //   icon: "none"
      //       // });
      //     }
      //   }
      // );
    },
    // 获取条件
    getCond(type) {
      this.axios.post(
        "/firm/Apt_Per_Pro_Search/getCond",
        {
          apt_id: localStorage.getItem("apt_id"),
          query_cate: type
        },
        data => {
          if (data.status === "success") {
            if (type == "pro") {
              this.condYjObj = {};
              let cond = data.rows;
              let money = "";
              let zbTime = "";
              let kgTime = "";
              let jgTime = "";
              if (cond.projectType) {
                this.condYjObj["类别"] = `${cond.projectType}`;
              }
              if (cond.xmmc) {
                this.condYjObj["项目名称"] = `${cond.xmmc}`;
              }
              if (!cond.minMoney && !cond.maxMoney) {
              } else {
                if (cond.minMoney && cond.maxMoney) {
                  money = `${cond.minMoney}至${cond.maxMoney}`;
                } else if (cond.minMoney && !cond.maxMoney) {
                  money = `大于${cond.minMoney}`;
                } else if (cond.minMoney && !cond.maxMoney) {
                  money = `小于${cond.maxMoney}`;
                }
                this.condYjObj["金额"] = `${money}万元`;
              }
              this.condYjObj["日期"] = "";
              if (!cond.minZbgsTime && !cond.maxZbgsTime) {
              } else {
                if (cond.minZbgsTime && cond.maxZbgsTime) {
                  zbTime = `${cond.minZbgsTime}至${cond.maxZbgsTime}`;
                } else if (cond.minZbgsTime && !cond.maxZbgsTime) {
                  zbTime = `${cond.minZbgsTime}至今`;
                } else if (cond.minZbgsTime && !cond.maxZbgsTime) {
                  zbTime = `${cond.maxZbgsTime}之前`;
                }
                this.condYjObj["日期"] = `【中标】${zbTime};`;
              }
              if (!cond.minKgsjTime && !cond.maxKgsjTime) {
              } else {
                if (cond.minKgsjTime && cond.maxKgsjTime) {
                  kgTime = `${cond.minKgsjTime}至${cond.maxKgsjTime}`;
                } else if (cond.minKgsjTime && !cond.maxKgsjTime) {
                  kgTime = `${cond.minKgsjTime}至今`;
                } else if (cond.minKgsjTime && !cond.maxKgsjTime) {
                  kgTime = `${cond.maxKgsjTime}之前`;
                }
                this.condYjObj["日期"] = `${
                  this.condYjObj["日期"]
                }【开工】${kgTime}`;
              }
              if (!cond.minJgsjTime && !cond.maxJgsjTime) {
              } else {
                if (cond.minJgsjTime && cond.maxJgsjTime) {
                  jgTime = `${cond.minJgsjTime}至${cond.maxJgsjTime}`;
                } else if (cond.minJgsjTime && !cond.maxJgsjTime) {
                  jgTime = `${cond.minJgsjTime}至今`;
                } else if (cond.minJgsjTime && !cond.maxJgsjTime) {
                  jgTime = `${cond.maxJgsjTime}之前`;
                }
                this.condYjObj["日期"] = `${
                  this.condYjObj["日期"]
                }【竣工】${kgTime}`;
              }
              if (cond.source) {
                this.condYjObj["来源"] = `${cond.source}`;
              }
              if (!this.condYjObj["日期"]) {
                delete this.condYjObj["日期"];
              }
            } else {
              let cond = data.rows.topList;
              let items = [];
              cond.forEach(v => {
                let last = "";
                v.last.forEach((v2, i2) => {
                  let abbr = "";
                  if (v2.abbr) {
                    abbr = v2.abbr;
                  } else {
                    abbr = v2.dname;
                  }
                  if (i2 == 0) {
                    last = abbr;
                  } else {
                    last = last + "、" + abbr;
                  }
                });
                last = `(${last})`;
                // console.log(v.abbr);
                // v.next.push(last);
                if (type == "apt") {
                  this.condZz = [];
                  v.abbr[v.abbr.length - 1] = v.abbr[v.abbr.length - 1] + last;
                  let oneItem = v.abbr.join(">");
                  this.condZz.push(oneItem);
                  this.condZz =
                    this.condZz.length > 2
                      ? this.condZz.slice(0, 2)
                      : this.condZz;
                } else if (type == "per") {
                  this.condRy = [];
                  v.next[v.next.length - 1] = v.next[v.next.length - 1] + last;
                  let oneItem = v.next.join(">");
                  this.condRy.push(oneItem);
                  this.condRy =
                    this.condRy.length > 2
                      ? this.condRy.slice(0, 2)
                      : this.condRy;
                }
              });
            }
          }
        }
      );
    },
    //点击搜索
    onSearch() {
      this.refresh = !this.refresh;
      return new Promise((resolve, reject) => {
        // console.log({ checked_area })
        // let r_prov =
        //   this.r_prov === "入川" ? this.r_prov : this.r_prov.substring(2);
        let checked_area = JSON.parse(localStorage.getItem("setzzSearchArea"));
// console.log(checked_area,3);

        let aptitude = localStorage.getItem("setzzSearchValue");
        this.full_prov = checked_area.full_prov;
        this.prov = checked_area.prov;
        this.r_prov =
          checked_area.r_prov === "入川" ? checked_area.r_prov : checked_area.r_prov.substring(2);
        if (!aptitude) {
          return;
        }
        console.log(this.r_prov,4)
        aptitude = JSON.parse(aptitude);
        let params = {
          aptitude,
          prov: this.full_prov,
          prov_cate: checked_area.prov + "_" + this.r_prov + "_全部",
          user_id: this.$store.state.userInfo.user_id,
          apt_cond: JSON.stringify(this.apt_cond)
        };
        // console.log(params);
        this.dialogVisible1 = false;
        this.axios.post("/firm/Apt_Per_Pro_Search/aptSearch", params, data => {
          if (data.status === "success") {
            this.apt_id = data.apt_id;
            // uni.setStorageSync("apt_id", this.apt_id);
            localStorage.setItem("apt_id", this.apt_id);
            resolve(data);

            this.getAptBar();
            this.getMapData();
          }
        });
      });
    },

    // √判断获取各个数据
    getData(data) {
      // console.log(data);
      // 请求地图数据
      if (this.fromShare) {
        this.getCond("apt");
        this.getAptBar();
        if (this.ifRyCond) {
          // this.getCond("per");
          this.getPerBarCond();
        }
        if (this.ifYjCond) {
          // this.getCond("pro");
          this.getProBar();
        }
        this.getMapData(this.lastCond);
      } else {
        if (data == "zzRySearch") {
          // this.getCond("per");
          this.getMapData("per");
          this.getAptBar();
          this.getPerBarCond();
          if (this.ifYjCond) {
            this.getProBar();
          }
        } else if (data == "zzYjSearch") {
          // this.getCond("pro");
          this.getMapData("pro");
          this.getAptBar("apt");
          this.getProBar();
          if (this.ifRyCond) {
            this.getPerBarCond();
          }
        } else {
          this.getCond("apt");
          this.getMapData("apt");
          this.getAptBar();
        }
      }
      this.fromShare = false;
    },
    // 点击地图
    clickMap(data) {
      // console.log(data);
      // console.log(part);
      if (!data.name) {
        uni.showToast({
          title: "本地区无数据",
          duration: 2000,
          icon: "none"
        });
      } else {
        let area = data.name;
        let type = "";
        if (data.name == this.full_prov) {
          type = "prov";
          area = "";
        } else {
          type = "r_prov";
        }
        // console.log(type);
        this.toList(
          type,
          this.countAll1,
          this.countSc1,
          this.countRc1,
          area,
          ""
        );
      }
    },
    mapFinish(data) {
      // console.log("datamapFinish", data);
      this.ifMapFinish1 = true;
    },
    // 请求地图数据
    getMapData(type) {
      let params = {
        apt_id: localStorage.getItem("apt_id"),
        query_cate: this.lastCond
      }
      // console.log("999999999"+JSON.stringify(params))
      this.axios.post(
        "/firm/Apt_Per_Pro_Search/mapStats",
        params,
        data => {
          if (data.status == "success") {
            // console.log("66666666"+JSON.stringify(data));
            this.handleMapData(data, type);
            // console.log(JSON.stringify( data))
          } else {
            console.log('地图数据请求失败')
            // uni.showToast({
            //   title: "地图数据请求失败",
            //   duration: 2000,
            //   icon: "none"
            // });
          }
        }
      );
    },
    handleMapData(data, type) {
      // console.log("handleMapData");
      // console.log(data);
      // console.log(type);
      this.updateMap = true;
      this.countAll1 = data.total.all_cnt;
      this.countSc1 = data.total.prov_cnt;
      this.countRc1 = data.total.r_prov_cnt;
      if (data.total.all_cnt == 0) {
        this.ifMapFinish1 = true;
        return;
      }
      this.mapData1 = data.rows;
    },
    // 请求资质柱状图数据
    getAptBar() {
      //  let aptitude = localStorage.getItem("setzzSearchValue");

      let checked_area = JSON.parse(localStorage.getItem("setzzSearchArea"));
      
       this.full_prov = checked_area.full_prov;
        let aptitude = localStorage.getItem("setzzSearchValue");
         aptitude = JSON.parse(aptitude);
         this.r_prov =
          checked_area.r_prov === "入川" ? checked_area.r_prov : checked_area.r_prov.substring(2);
      let params = {
        // aptitude: JSON.parse(localStorage.getItem("setzzSearchValue")),
        aptitude,
        prov: this.full_prov,
        // r_prov: this.r_prov === "入川" ? this.r_prov : this.r_prov.substring(2),
        r_prov:this.r_prov,
        apt_id: localStorage.getItem("apt_id"),
        query_cate: this.lastCond
      };
      // console.log("222+"+JSON.stringify( params))
      this.axios.post("/firm/Apt_Per_Pro_Search/aptBarChart", params, data => {
        if (data.status == "success") {
          // console.log("mmmmm1+" + JSON.stringify(data));
          this.handleBarData(data, "apt");
        } else {
          console.log("失败");
          // let cla = "";
          // if (type == "apt") {
          //   cla = "资质";
          // } else if (type == "per") {
          //   cla = "人员";
          // }
          // uni.showToast({
          //   title: cla + "柱状图数据请求失败",
          //   duration: 2000,
          //   icon: "none"
          // });
        }
      });
    },
    // 请求人员柱状图底部数据
    getPerBarCond(type) {
      this.axios.post(
        "firm/Apt_Per_Pro_Search/peopleCond",
        {
          apt_id: this.apt_id
        },
        data => {
          if (data.status == "success") {
            if (this.personSearch.index == 1) {
              this.barTypeList2 = data.rows;
              this.barTypeList2.forEach(v => {
                v.focus = false;
              });
              this.barTypeList2[0].focus = true;
              this.per_dict = data.rows[0].staff_dict;
            } else if (this.personSearch.index == 2) {
              this.barTypeList3 = data.rows;
              this.barTypeList3.forEach(v => {
                v.focus = false;
              });
              this.barTypeList3[0].focus = true;
              this.per_dict = data.rows[0].staff_dict;
            }
            this.getPerBar();
          } else {
          }
        }
      );
    },
    // 请求人员柱状图数据
    getPerBar() {
      this.axios.post(
        "firm/Apt_Per_Pro_Search/perBarChart",
        {
          staff_dict: this.per_dict,
          prov: this.prov,
          r_prov:
            this.r_prov === "入川" ? this.r_prov : this.r_prov.substring(2),
          apt_id: this.apt_id,
          query_cate: this.lastCond
        },
        data => {
          if (data.status == "success") {
            this.handlePerBar(data);
          } else {
            // let cla = "";
            // if (type == "apt") {
            //   cla = "资质";
            // } else if (type == "per") {
            //   cla = "人员";
            // }
            // uni.showToast({
            //   title: cla + "柱状图数据请求失败",
            //   duration: 2000,
            //   icon: "none"
            // });
          }
        }
      );
    },
    // 处理人员柱状图数据
    handlePerBar(data) {
      let dictList = [];
      let list = [];
      list = JSON.parse(JSON.stringify(data.rows));
      let typeIndex = this.personSearch.index;
      if (typeIndex == 1) {
        this.barCurData2 = {
          value: list,
          dictList: dictList
        };
        // this.barCurData2 = JSON.parse(
        //   JSON.stringify(this.barTypeList2[0].value)
        // );
        if (data.max > 0) {
          this.ifBarData2 = true;
        }
      } else if (typeIndex == "2") {
        this.barCurData3 = {
          value: list,
          dictList: dictList
        };
        // this.barCurData2 = JSON.parse(
        //   JSON.stringify(this.barTypeList2[0].value)
        // );
        if (data.max > 0) {
          this.ifBarData3 = true;
        }
      }
      this.isShowLoad = false;
    },
    // 切换人员bar tab
    changeRyBar(type, index) {
      this.isShowLoad = true;
      // console.log(type);
      // console.log(index);
      let dict = "";
      if (type == "two") {
        // console.log(this.barTypeList2);
        this.barTypeList2.forEach(v => {
          v.focus = false;
        });
        this.barTypeList2[index].focus = true;
        this.per_dict = this.barTypeList2[index].staff_dict;
      } else if (type == "three") {
        this.barTypeList3.forEach(v => {
          v.focus = false;
        });
        this.barTypeList3[index].focus = true;
        this.per_dict = this.barTypeList3[index].staff_dict;
      }
      this.getPerBar();
    },
    // 业绩请求柱状图数据
    getProBar() {
      this.axios.post(
        "firm/Apt_Per_Pro_Search/proBarChart",
        {
          prov: this.prov,
          r_prov:
            this.r_prov === "入川" ? this.r_prov : this.r_prov.substring(2),
          apt_id: this.apt_id,
          query_cate: this.lastCond
        },
        data => {
          if (data.status == "success") {
            this.handleBarData(data, "pro");
          } else {
            // uni.showToast({
            //   title: "业绩柱状图数据请求失败",
            //   duration: 2000,
            //   icon: "none"
            // });
          }
        }
      );
    },
    // 处理资质&业绩柱状图数据
    handleBarData(data, type) {
      if (type != "pro") {
        if (data.total.prov_all == 0) {
          this.ifBarData1 = false;
          this.ifBarFinish1 = true;
          return;
        }
      }
      let dictList = [];
      let list = [];
      if (type != "pro") {
        list = JSON.parse(JSON.stringify(data.rows[0].value));
        // console.log(list);
        list.forEach(v => {
          dictList.push(v.dict);
          delete v.dict;
        });
      } else {
        list = JSON.parse(JSON.stringify(data.rows));
      }
      if (type == "apt") {
        this.barCurData1 = {
          value: list,
          dictList: dictList
        };
        // console.log("barCurData1", this.barCurData1);
        this.barTypeList1 = data.rows;
        // this.barCurData1 = JSON.parse(
        //   JSON.stringify(this.barTypeList1[0].value)
        // );
        this.barTypeList1.forEach(v => {
          v.focus = false;
        });
        this.barTypeList1[0].focus = true;
        if (data.total.prov_all > 0) {
          this.ifBarData1 = true;
        }
      } else {
        let typeIndex = 0;
        // console.log(type);
        // console.log("personSearch", this.personSearch);
        // console.log("achiSearch", this.achiSearch);
        if (type == "per") {
          typeIndex = this.personSearch.index;
        } else if (type == "pro") {
          typeIndex = this.achiSearch.index;
        }
        if (typeIndex == 1) {
          this.barCurData2 = {
            value: list,
            dictList: dictList
          };
          if (type != "pro") {
            this.barTypeList2 = data.rows;
            // this.barCurData2 = JSON.parse(
            //   JSON.stringify(this.barTypeList2[0].value)
            // );
            this.barTypeList2.forEach(v => {
              v.focus = false;
            });
            this.barTypeList2[0].focus = true;
            if (data.total.prov_all > 0) {
              this.ifBarData2 = true;
            }
          } else {
            this.ifBarData2 = true;
          }
        } else if (typeIndex == "2") {
          this.barCurData3 = {
            value: list,
            dictList: dictList
          };
          if (type != "pro") {
            this.barTypeList3 = data.rows;
            // this.barCurData2 = JSON.parse(
            //   JSON.stringify(this.barTypeList2[0].value)
            // );
            this.barTypeList3.forEach(v => {
              v.focus = false;
            });
            this.barTypeList3[0].focus = true;
            if (data.total.prov_all > 0) {
              this.ifBarData3 = true;
            }
          } else {
            this.ifBarData3 = true;
          }
        }
      }
    },
    // 跳转至列表
    toList(row) {},
    // 打开资质弹框
    onOpentk(type) {
      if (type == "apt") {
        this.dialogVisible1 = true;
      } else if (type == "per") {
        this.dialogVisible2 = true;
      } else if (type == "pro") {
        this.dialogVisible3 = true;
      }
    }
  }
};
</script>
<style>
.el-dropdown-menu::-webkit-scrollbar-track-piece {
  background-color: #f8f8f8;
}
.el-dropdown-menu::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}
.el-dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
.el-dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
</style>

<style lang="less">
.search-zz-new-page {
  color: #333333;
  .el-dropdown-link {
    cursor: pointer;
  }
  .title {
    text-align: center;
    line-height: 70px;
    box-shadow: 0px 0px 5px #e0e0e0;
    font-size: 32px;
  }
  .content_div {
    max-width: 1280px;
    margin: 0 auto;
    //条件
    .row-cond {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1280px;
      margin: 20px auto 0;
      font-size: 14px;
      .cond-name {
        font-size: 14px;
        margin-right: 15px;
      }
      .cond-input {
        width: 280px;
        .el-input__inner {
          // border-color: #f3f3f3;
          // margin: 20px !important;
          border: 1px solid #f3f3f3;
        }
      }
    }
    .row-count {
      display: flex;
      justify-content: space-between;
      width: 950px;
      margin: 60px auto 0;
      text-align: center;
      .count {
        font-size: 36px;
        margin-bottom: 20px;
      }
      .countName {
        width: 132px;
        height: 40px;
        line-height: 40px;
        background: #f3f3f3;
      }
    }
    .row-map {
      width: 600px;
      height: 520px;
      margin: 60px auto 90px;
    }
    .row-bar {
      display: flex;
      justify-content: center;
      height: 314px;
      // text-align: center
    }
  }
}
</style>
