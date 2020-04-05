<!--项目详情-->
<template>
  <div class="ItemInfo_content">
    <!-- 一级页面头部开始 -->
    <div class="content_header">
      <div class="tittle">{{itemInfo.gsmc}}</div>
    </div>
    <!-- 一级页面头部结束 -->
    <!-- 一级页面身体开始 -->
    <div class="content_body">
      <div class="body_header">
        <div style="font-size:24px;margin-left:25px;margin-top:20px;">{{itemInfo.xmmc}}</div>
        <div class="evryone" style="border-bottom:1px solid #e1e1e1">
          <div class="each">
            项目业主：
            <span style="font-size:16px">{{itemInfo.xmyzdw}}</span>
          </div>
          <div class="each">
            项目地区：
            <span style="font-size:16px">{{itemInfo.xmdq}}</span>
          </div>
          <div class="each">
            项目类型：
            <span style="font-size:16px">{{itemInfo.xmlxB}}</span>
          </div>
        </div>
        <div class="evryone">
          <div class="evryone_one">项目进度：</div>
          <div class="evryone_two">
            <!--流程横排-->
            <div style="width: 100%;height:100px;">
              <ul style="height: 100px;position: relative;margin:0 auto;width:1370px;" class="liu">
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg1+')',width:'270px',left:'0',zIndex:'100'}"
                >
                  <span
                    :style="{textAlign:'center',fontSize:'14px',color:itemInfo.status == '预定'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='预定'?itemInfo.stage1:'预定'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg2+')',width:'270px',left:'238px',zIndex:'99'}"
                >
                  <span
                    :style="{fontSize:'14px',color:itemInfo.status == '报名'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='报名'?itemInfo.stage2:'报名'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg3+')',width:'270px',left:'475px',zIndex:'98'}"
                >
                  <span
                    :style="{fontSize: '14px',color:itemInfo.status == '标书'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='标书'?itemInfo.stage3:'标书'}}</span>
                </li>
                <li
                  :style="{backgroundRepeat:'no-repeat',backgroundSize: '100% 100%',backgroundImage:'url('+li.bg4+')',width:'270px',left:'711px',zIndex:'97'}"
                >
                  <span
                    :style="{fontSize: '14px',color:itemInfo.status == '开标'?'#ffffff':'#606266'}"
                  >{{itemInfo.status=='开标'?itemInfo.stage4:'开标'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="body_content">
        <div class="information">
          <div class="informatin_header">公司信息</div>
          <div style="padding-left:50px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="taps[0].txt" v-if="taps[0].show" name="xmxx">
                <div class="xmxx_class">
                  <div class="myrow">
                    <div>资质要求</div>
                    <div class="mycol_1">{{itemInfo.zzyq}}</div>
                  </div>
                  <div class="myrow">
                    <div>人员要求</div>
                    <div class="mycol_1">{{itemInfo.ryyq}}</div>
                  </div>
                  <div class="myrow">
                    <div>业绩要求</div>
                    <div class="mycol_1">{{itemInfo.yjyq}}</div>
                  </div>
                  <div class="myrow">
                    <div>其它要求</div>
                    <div class="mycol_1">{{itemInfo.qtyq}}</div>
                  </div>
                  <div class="myrow">
                    <div>招标公告</div>
                    <div class="mycol_1">
                      <a
                        class="right_each_two"
                        v-if="itemInfo.zbxx_id"
                        style="color: #409EFF;"
                        :href="'http://www.520coc.cn/CompanyRounds/getMassage?zbgsid=&type=0&zbwj=undefined&zbqd=undefined&zbxxid='+itemInfo.zbxx_id"
                        target="_blank"
                      >点击查看</a>
                      <!-- <a class="right_each_two" v-else style="color: #409EFF;" :disabled="$route.query.jbxx_id!='预定'" > 点击上传</a> -->
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="taps[1].txt" v-if="taps[1].show" name="qynr">
                <el-form :inline="true" @submit.native.prevent>
                  <el-form-item label="阶段">
                    <el-select v-model="qynr.optionsSelect" placeholder="请选择">
                      <el-option
                        v-for="item in qynr.options"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="原因" v-show="qynr.optionsSelect == 'difficult_txt'">
                    <el-select v-model="qynr.noOptionsSelect" placeholder="请选择">
                      <el-option
                        v-for="item in qynr.noOptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input placeholder="备注信息" v-model="qynr.inputValue"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" @click="qynrFn().add()">添加</el-button>
                  </el-form-item>
                </el-form>
                <template>
                  <el-table
                    :data="qynr.tableLists"
                    style="width: 100%"
                    align="center"
                    v-loading="qynr.loading"
                  >
                    <el-table-column prop="phase" label="阶段"></el-table-column>
                    <el-table-column prop="txt" label="备注"></el-table-column>
                    <el-table-column prop="time" label="时间"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button type="text" size="small" @click="qynrFn().del(scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane :label="taps[2].txt" v-if="taps[2].show" name="ry">
                <transition name="fade">
                  <div v-show="activeName == 'ry'">
                    <ry-list :needData="needData"></ry-list>
                  </div>
                </transition>
              </el-tab-pane>
              <el-tab-pane :label="taps[3].txt" v-if="taps[3].show" name="yj">
                <transition name="fade">
                  <div v-show="activeName == 'yj'">
                    <yj-list :needData="needData"></yj-list>
                  </div>
                </transition>
              </el-tab-pane>
              <el-tab-pane :label="taps[4].txt" v-if="taps[4].show" name="jf">
                <transition name="fade">
                  <div v-show="activeName == 'jf'">
                    <jf-list :needData="JfNeedData" :onChangeData="onChangeData"></jf-list>
                  </div>
                </transition>
              </el-tab-pane>
              <el-tab-pane :label="taps[5].txt" v-if="taps[5].show" name="ly">
                <leave-word :needData="leaveNeedData" :onChangeData="onChangeData"></leave-word>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import firstImgUrl from "../assets/h1.png";
import centerImgUrl from "../assets/h1.png";
import lastImgUrl from "../assets/h4.png";
//高亮组
import prifirstImgUrl from "../assets/l1u.png";
import pricenterImgUrl from "../assets/l1u.png";
import prilastImgUrl from "../assets/l5u.png";
//引入图片
import l1u from "../assets/l1u.png";
import l1d from "../assets/l2d.png";
import l2u from "../assets/l1u.png";
import l2d from "../assets/l2d.png";
import l5u from "../assets/l5u.png";
import l5d from "../assets/l5d.png";

import ryList from "./sonPage/ryList";
import yjList from "./sonPage/yjList";
import leaveWord from "./template/leaveWord";
import jfList from "./sonPage/jfList";

export default {
  components: {
    ryList,
    yjList,
    leaveWord,
    jfList
  },
  data() {
    return {
      leaveNeedData: {
        gs_id: this.$route.query.gs_id,
        cate:'分配'
      },
      taps: [
        {
          txt: "项目信息",
          show: true
        },
        {
          txt: "企业内容",
          show: false
        },
        {
          txt: "人员",
          show: false
        },
        {
          txt: "业绩",
          show: false
        },
        {
          txt: "积分",
          show: false
        },
        {
          txt: "留言",
          show: true
        }
      ],
      yj_id: "",
      ry_id: "",
      JfNeedData: {
        gs_id: this.$route.query.gs_id
      },
      needData: {},
      //流程用图
      button_radio: {
        l1: l1u,
        l2: l2u,
        l3: l2u,
        l4: l2u,
        l5: l5u,
        l6: l1d,
        l7: l2d,
        l8: l5d
      },
      li: {
        bg1: "",
        bg2: "",
        bg3: "",
        bg4: ""
      },
      user_id: this.$store.state.userInfo.user_id,
      jbxx_id: this.$route.query.jbxx_id,
      gs_id: this.$route.query.gs_id,
      itemInfo: {
        xmmc: ""
      },
      qynr: {
        loading: false,
        optionsSelect: "",
        noOptionsSelect: "",
        inputValue: "",
        options: [
          {
            label: "预定",
            value: "reserve_txt",
            disabled: false
          },
          {
            label: "报名",
            value: "bmxx_txt",
            disabled: false
          },
          {
            label: "拿公司有困难",
            value: "difficult_txt",
            disabled: false
          }
        ],
        noOptions: [
          {
            label: "不好合作",
            value: "1"
          },
          {
            label: "其他人已拿",
            value: "2"
          },
          {
            label: "其他情况",
            value: "3"
          }
        ],
        tableLists: []
      },
      activeName: "xmxx" //默认选中的name
    };
  },
  created() {
    //获取业绩数据
    this.getItemInfo();
    //获取完成情况
    this.isDisplay();
  },
  methods: {
    // 获取人员业绩节点
    isDisplay() {
      this.axios.post(
        "/Index/project/isDisplay",
        {
          gs_id: this.gs_id,
          jbxx_id: this.jbxx_id
        },
        data => {
          this.ry_id = data.rows.ry_id;
          this.taps.map(v => {
            if (v.txt == "企业内容" || v.txt == "积分") {
              if (data.rows.user_id == this.user_id) {
                v.show = true;
              } else {
                v.show = false;
              }
            } else if (v.txt == "业绩") {
              data.rows.yj_id ? (v.show = true) : (v.show = false);
            } else if (v.txt == "人员") {
              data.rows.ry_id ? (v.show = true) : (v.show = false);
            }
            return v;
          });
          this.needData = {
            ry_id: data.rows.ry_id,
            yj_id: data.rows.yj_id
          };
          this.yj_id = data.rows.yj_id;
          //获取企业内容
          this.qynrFn().getLiset();
        }
      );
    },
    onClickPassFirst() {
      //招标公告上传按钮
      this.biddingAnnouncement = true;
    },
    //渲染进度横条
    jindu() {
      this.li.bg1 =
        this.itemInfo.status == "预定"
          ? this.button_radio.l1
          : this.button_radio.l6;
      this.li.bg2 =
        this.itemInfo.status == "报名"
          ? this.button_radio.l2
          : this.button_radio.l7;
      this.li.bg3 =
        this.itemInfo.status == "标书"
          ? this.button_radio.l3
          : this.button_radio.l7;
      this.li.bg4 =
        this.itemInfo.status == "开标"
          ? this.button_radio.l4
          : this.button_radio.l8;
    },
    //获取业绩信息
    getItemInfo() {
      let obj = {
        jbxx_id: this.$route.query.jbxx_id,
        user_id: this.user_id,
        gs_id: this.$route.query.gs_id
      };
      this.axios.post("/index/project/re_detail", obj, data => {
        if (data.status == "success") {
          this.itemInfo = data.rows;
          this.jindu();
          document.title = "招投标:" + this.itemInfo.gsmc;
        }
      });
    },
    qynrFn() {
      let getLiset = () => {
        if (!this.taps[1].show) {
          return;
        }
        this.qynr.loading = true;
        let query_data = {
          gs_id: this.gs_id,
          jbxx_id: this.jbxx_id
        };
        this.axios.post("/Index/element_set/execPhaseTxt", query_data, data => {
          this.qynr.loading = false;
          this.qynr.tableLists = data.rows || [];
          if (data.rows) {
            this.qynr.options.map(v => {
              let obj = data.rows.filter(v2 => v.value == v2.column);
            });
          }
        });
      };
      //添加
      let add = () => {
        let type = this.qynr.optionsSelect;
        let query_data = {
          gs_id: this.gs_id,
          jbxx_id: this.jbxx_id
        };
        if (type == "") {
          this.$message.error("请选择阶段");
          return;
        } else if (type == "reserve_txt") {
          //预定
          query_data.reserve = 1;
          query_data.reserve_txt = this.qynr.inputValue;
        } else if (type == "bmxx_txt") {
          //报名
          query_data.bmxx = 1;
          query_data.bmxx_txt = this.qynr.inputValue;
        } else if (type == "difficult_txt") {
          //有问题
          if (!this.qynr.noOptionsSelect) {
            this.$message.error("请选择原因");
            return;
          }
          query_data.difficult = this.qynr.noOptionsSelect;
          query_data.difficult_txt = this.qynr.inputValue;
        }
        this.axios.post(
          "/Index/element_set/editCompanyExecPhase",
          query_data,
          data => {
            this.qynr.inputValue = "";
            this.qynr.optionsSelect = "";
            this.qynr.noOptionsSelect = "";
            this.qynrFn().getLiset();
            window.opener.postMessage("公司刷新", "*");
          }
        );
      };
      //删除
      let del = row => {
        let query_data = {
          gs_id: this.gs_id,
          jbxx_id: this.jbxx_id,
          column: row.column
        };
        this.axios.post("/Index/element_set/delTxt", query_data, data => {
          this.qynrFn().getLiset();
          window.opener.postMessage("公司刷新", "*");
        });
      };
      return {
        getLiset,
        del,
        add
      };
    },
    //点击切换tab
    handleClick(r) {},
    //刷新上个页面
    onChangeData(){
      window.opener.postMessage("公司刷新", "*");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.xmxx_class {
  font-size: 14px;
}
.myrow {
  margin: 20px 0;
  display: flex;
}
.myrow > div:first-child {
  width: 120px;
}
.mycol_1 {
  flex: 1;
}
a:link {
  color: #409eff;
  text-decoration: none;
}

.ItemInfo_content {
  // 一级页面头部开始
  .content_header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .tittle {
      // line-height: 60px;
      padding: 14px 0;
      -moz-box-shadow: 0px 0px 0px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      width: 100%;
      font-size: 32px;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
  // 一级页面头部结束

  // 一级页面身体开始
  .content_body {
    display: flex;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~"100% - 60px");
    background: #f9f9f9;
    .body_header {
      background: #ffffff;
      margin-bottom: 20px;
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .evryone {
        display: flex;
        flex-direction: row;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        .each {
          min-width: 150px;
          margin-left: 25px;
          height: 60px;
          justify-content: center;
          span {
            color: #606266;
          }
        }
        .each_button {
          width: 49%;
          height: 60px;
          text-align: right;
          padding-right: 25px;
        }
        .evryone_one {
          width: 125px;
          height: 60px;
          margin-left: 25px;
        }
        .evryone_two {
          height: 28px;
          display: flex;
          flex-direction: row;
          // width: 740px;
          // height: 20px;
          margin-top: 20px;
          font-size: 14px;
          color: #000000;
          .eachOne {
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            position: relative;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            z-index: 9;
            left: -30px;
          }
          .eachOne:nth-child(3) {
            z-index: 8;
            left: -55px;
          }
          .eachOne:nth-child(4) {
            z-index: 7;
            left: -82px;
          }
          .active {
            background-image: url("../assets/jd.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 250px;
            height: 28px;
            text-align: center;
            color: #ffffff;
          }
        }
      }
      .evryone:nth-child(3),
      .evryone:nth-child(2) {
        border: none;
      }
    }
    .body_content {
      background: #ffffff;
      // height: calc(~"100% - 270px");
      -moz-box-shadow: 0px 0px 5px #e0e0e0;
      -webkit-box-shadow: 0px 0px 5px #e0e0e0;
      box-shadow: 0px 0px 5px #e0e0e0;
      .information {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        .informatin_header {
          display: flex;
          margin-left: 25px;
          font-size: 20px;
          height: 70px;
          line-height: 70px;
        }
        .infromation_body {
          font-size: 14px;
          display: flex;
          flex-direction: row;
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
<style scoped>
.liu li {
  width: 250px;
  height: 28px;
  float: left;
  list-style: none;
  position: absolute;
  text-align: center;
  line-height: 28px;
}
</style>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>