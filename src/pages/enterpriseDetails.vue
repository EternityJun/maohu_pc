<!--  -->
<template>
  <div class="enterpriseDetails">
    <div id="myDetails">
      <el-row type="flex">
        <el-col :span="4" class="left-side-bar">
          <div class="sticky-line">
            <div class="myBox" @click="toZbxx">
              <span :class="this.data.type == 'zbxx'?activeBorder:normalBorder" @click="toZbxx">1</span>
              <span style=" margin-left: 20px;font-size:16px;" :class="this.data.type == 'zbxx'?activeName:normalName">招标信息</span>
            </div>
            <span class="myLine"></span>
            <div class="myBox" @click="toZbgs">
              <span :class="this.data.type == 'zbgs'?activeBorder:normalBorder" @click="toZbgs">2</span>
              <span style=" margin-left: 20px;font-size:16px;" :class="this.data.type == 'zbgs'?activeName:normalName">中标公示</span>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div v-if="this.data.type == 'zbxx'" class="myCountent">
            <p @click="toOpenZbxx" v-if="this.detailData.zbxx_link" class="myLink">查看原网页</p>
            <div v-if="detailData.zbxx_txt" v-loading="loading1" v-html="detailData.zbxx_txt" class="myTable">{{detailData.zbxx_txt}}</div>
            <div v-else class="myTable noData">页面数据被偷走了</div>
          </div>
          <div v-if="this.data.type == 'zbgs'" class="myCountent">
            <p @click="toOpenZbgs" v-if="this.detailData.zbgs_link" class="myLink">查看原网页</p>
            <div v-if="detailData.zbgs_txt" v-loading="loading2" v-html="detailData.zbgs_txt" class="myTable">{{detailData.zbgs_txt}}</div>
            <div v-else class="myTable noData">页面数据被偷走了</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <backToTop style="z-index: 500"/>
  </div>
</template>

<script>
import backToTop from '@/pages/template/backToTop';

export default {
  name: "enterpriseDetails",
  components: {
    backToTop
  },
  data() {
    return {
      loading1: true,
      data: {},
      detailData: "",
      activeName: "colorBule myText ",
      normalName: "colorGray myText ",
      normalBorder: "normalNumColor myYuan nolBorder",
      activeBorder: "activeNumColor myYuan actBorder",
      activeState: true,
      noDataPage: "",
      titleList: {
        list: [
          { name: "招标信息", show: false },
          { name: "中标公示", show: true }
        ],
        acticv: 1
      }
    };
  },
  created() {
    document.title = "详情";
    this.data = this.$route.query;
    // console.log( this.data)
    this.getData();
    // 这一条代码不知道什么用，先注释
    // this.data = this.$router.currentRoute.query.name
    if (this.data.zbxx_id == "" && this.data.zbgs_id == "") {
      this.noDataPage = ture;
    }
  },
  methods: {
    getData() {
      let source=this.data.source
      // console.log(this.data)
      if(source=='qg'){
        source='全国招标公告'
      }else if(source=='sc'){
        source='四川招标公告'
      }
      this.axios.post(
        "/index/Tendering/tendBidDetail",
        {
          zbxx_id: this.data.zbxx_id,
          zbgs_id: this.data.zbgs_id,
          type: this.data.type,
          source,
        },
        data => {
          this.loading2 = false;
          this.loading1 = false;
          if (data.zbgs_txt == "" && data.zbxx_txt == "") {
            this.noDataPage = ture;
          }
          this.detailData = data;
          if (this.data.type == "zbgs") {
            this.activeState = true;
          } else {
            this.activeState = false;
          }
          let xmmc = this.data.xmmc;
          let name = this.data.name;
          let gsmc = this.data.gsmc;
          // console.log(this.data.name.indexOf(name))
          this.changeColor(xmmc);
          this.changeColor(name);
          this.changeColor(gsmc);
        }
      );
    },
    toZbxx() {
      this.data.type = "zbxx";
      this.getData();
    },
    toZbgs() {
      this.data.type = "zbgs";
      this.getData();
    },
    changeColor(str) {
      this.detailData.zbgs_txt = this.detailData.zbgs_txt.replace(
        str,
        `<span style="color:red;">${str}</span>`
      );
      this.detailData.zbxx_txt = this.detailData.zbxx_txt.replace(
        str,
        `<span style="color:red;">${str}</span>`
      );
    },
    toOpenZbxx() {
      window.open(this.detailData.zbxx_link);
    },
    toOpenZbgs() {
      window.open(this.detailData.zbgs_link);
    },
    // changePage(i){
    //   // console.log(i)
    //   this.activeState = !this.activeState
    // },
    zbxxPage() {
      if (this.detailData.zbxx_txt) {
        this.activeState = false;
      }
    },
    zbgsPage() {
      if (this.detailData.zbgs_txt) {
        this.activeState = true;
      }
    }
  }
};
</script>
<style lang='less' >
// #myHeader{
//   height: 60px;
//   width: 100%;
// }
.colorGray {
  color: #909da5;
}
.colorBule {
  color: #ff8801;
}
.activeNumColor {
  color: #fff;
}
.normalNumColor {
  color: #909da5;
}
.nolBorder {
  background-color: #fff;
  border: 2px solid #909da5;
}
.actBorder {
  background-color: #ff8801;
  border: 2px solid #ff8801;
  color: #fff;
}

.myText {
  cursor: pointer;
}
.myBox {
  display: flex;
}
.myYuan {
  display: block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 12px;
  line-height: 20px;
  text-align: center;
  border: 2px solid #909da5;
  font-size: 16px;
}
.myLine {
  display: block;
  width: 0;
  margin-left: 12px;
  height: 100px;
  border: 1px solid #909da5;
}
.enterpriseDetails {
  background-color: #fbfbfb;
  overflow: hidden;
}
#myDetails {
  max-width: 1300px;

  margin: 50px auto;
}
.myLink {
  color: #0000ff;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
}
.myTable {
  background-color: #fff;
  padding: 50px 20px 0;
  // width: 900px;
  // float: left;
  min-width: 840px;
  max-width: 900px;
  margin: 0 auto;
  // text-align: center;
  overflow: hidden;
  table {
    width: 898px;
    border: 1px solid black;
    td {
      border: 1px solid black;
    }
    th {
      border: 1px solid black;
    }
  }
}
#myDetails .el-col,.el-row{
  overflow:visible;
}
.myCountent {
  width: 940px;
  min-width: 840px;
  max-width: 960px;
  margin: 0 auto;
  border: 1px black dotted;
  // border-top: 0px black dotted;
  // padding: 0 10px;
}
#noneData {
  text-align: center;
  height: 500px;
  line-height: 500px;
  font-size: 18px;
  font-style: italic;
  color: rgba(150, 135, 135, 0.925);
}
.myTitle {
  height: 55px;
  width: 200px;
  list-style: none;
  text-align: center;
  cursor: pointer;
  line-height: 50px;
  // margin-left: 30px;
  position: relative;
  background-color: #f2f2f2;
}
.muUL {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  height: 50px;
}
.noData {
  height: 500px;
  line-height: 500px;
  text-align: center;
}
.left-side-bar {
  position: relative;
  display: flex;
  justify-content: flex-end;
}
.sticky-line {
  position: fixed;
  top: 200px;
}

// .mySpan {
//   position: absolute;
//   top: 0;
//   right: -55px;
//   width: 0;
//   height: 0;
//   border-width: 27.5px;
//   border-style: solid;
//   border-color: transparent #f2f2f2 transparent transparent;
//   z-index: 10;
//   transform: rotate(180deg);
// }
// .normalBcol{
//    background-color: #f2f2f2
// }
// .seleclBcol{
//    background-color: #66b1ff
// }
// .normalColor {

//     background-color: #66b1ff;
//     border-color: transparent #f2f2f2 transparent transparent;
// }
// .selectColor {
//    background-color: #f2f2f2;
//     border-color: transparent #66b1ff transparent transparent;
// }
</style>
