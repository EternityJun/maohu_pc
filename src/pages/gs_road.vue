<template>
  <div id="gs_road">
    <header>
      <div>
        <span class="gsmc">{{gsmc}}</span>
        <!-- <span class="info">更新时间：{{updateTime}}</span> -->
      </div>
    </header>
    <head-nav v-bind:data="headNav" @switchNav="switchNav"></head-nav>
    <div class="container">
      <!-- 基本信息 -->
      <transition name="slide-fade">
        <div class="jbxx pos_top" style="margin-bottom:20px" v-show="tab=='基本信息' || tab==''">
          <table-info :tableData="jbxx"></table-info>
        </div>
      </transition>
      <!-- 人员信息 -->
      <transition name="slide-fade">
        <div class="ryxx pos_top" v-show="tab=='人员信息'">
          <el-form :inline="true" :model="ryxx.form" class="demo-form-inline normalForm" @submit.native.prevent>
            <el-form-item label="人员名称">
              <el-input v-model="ryxx.form.name" placeholder="人员名称" @keyup.enter.native="onSubmitRy"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmitRy">查询</el-button>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
          <template>
            <el-table :data="ryxx.tableData" style="width: 100%" border v-loading="loading">
              <el-table-column width="60" label="序号" align="center">
                <template slot-scope="scope">
                  {{scope.$index+(ryxx.page-1)*10+1}}
                </template>
              </el-table-column>
              <el-table-column prop="xm" label="姓名" width="180" align="center">
                <template slot-scope="scope">
                  <el-button @click="go_ry(scope.row)" type="text">{{scope.row.xm}}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="xb" label="性别" width="180" align="center">
              </el-table-column>
              <el-table-column prop="byyx" label="毕业学校" align="center">
              </el-table-column>
              <el-table-column prop="xl" label="学历" align="center">
              </el-table-column>
              <el-table-column prop="sxzy" label="专业" align="center">
              </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="ryxx.page" background layout="total,prev, pager, next" :total="ryxx.total" class="pagination"></el-pagination>
          </template>
        </div>
      </transition>
      <!-- 业绩信息 -->
      <transition name="slide-fade">
        <div class="yjxx pos_top" v-show="tab=='总包业绩已建' || tab=='总包业绩在建'  || tab=='分包业绩已建' || tab=='分包业绩在建'">
          <p class="title">{{tab}}</p>

          <div class="yj_switch">
            <el-radio-group v-model="yjxx.radio" size="mini" @change="switchSt()">
              <el-radio-button label="省厅审核"></el-radio-button>
              <el-radio-button label="省厅录入"></el-radio-button>
              <el-radio-button label="系统自动审核"></el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <!-- 搜索框 -->
            <el-form :inline="true" :model="yjxx.form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="项目名称" style="width:398px">
                <el-input v-model="yjxx.form.xmmc" placeholder="项目名称" style="width:328px" @keyup.enter.native="onSubmitYj"></el-input>
              </el-form-item>
              <el-form-item label="资金范围" style="width:383px">
                <el-row class="flex">
                  <div>
                    <el-input v-model="yjxx.form.min_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                      <el-button style="width:65px" slot="append">万元</el-button>
                    </el-input>
                  </div>
                  <div class="newline">-</div>
                  <div>
                    <el-input v-model="yjxx.form.max_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                      <el-button style="width:65px" slot="append">万元</el-button>
                    </el-input>
                  </div>
                </el-row>
              </el-form-item>
              <el-form-item label="开工日期" style="width:380px">
                <el-row class="flex">
                  <div>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="yjxx.form.min_date_kg" style="width: 149px;"></el-date-picker>
                  </div>
                  <div class="newline">-</div>
                  <div>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="yjxx.form.max_date_kg" style="width: 148px  ;"></el-date-picker>
                  </div>
                </el-row>
              </el-form-item>
              <el-form-item label="交工日期" style="width:398px">
                <el-row class="flex">
                  <div>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="yjxx.form.min_date_jg" style="width: 156px;"></el-date-picker>
                  </div>
                  <div class="newline">-</div>
                  <div>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="yjxx.form.max_date_jg" style="width: 157px  ;"></el-date-picker>
                  </div>
                </el-row>
              </el-form-item>
              <el-form-item label="人员名称" style="width:383px">
                <el-input v-model="yjxx.form.cyry" placeholder="人员名称" style="width:315px" @keyup.enter.native="onSubmitYj"></el-input>
              </el-form-item>
              <el-form-item label="所在省份" style="width:380px">
                <el-select v-model="yjxx.form.province" placeholder="选择所在省份" style="width:312px" clearable>
                  <el-option v-for="item in province" :key="item.label" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="btns">
                <el-button type="primary" @click="onSubmitYj">搜索</el-button>
                <el-button @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
            <!-- <template> -->
            <el-table :data="yjxx.tableData" style="width: 100%" border v-loading="loading">
              <el-table-column width="60" label="序号" align="center">
                <template slot-scope="scope">
                  {{scope.$index+(yjxx.page-1)*10+1}}
                </template>
              </el-table-column>
              <el-table-column prop="xmmc" label="项目名称" width="300" align="center">
                <template slot-scope="scope">
                  <span @click="go_xm(scope.row)" class="xmmc">{{scope.row.xmmc}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bdmc" label="标段名称" align="center">
              </el-table-column>
              <el-table-column prop="htj" label="合同金额(万元)" align="center">
              </el-table-column>
              <el-table-column prop="jsj" label="结算价(万元)" align="center">
              </el-table-column>
              <el-table-column prop="kgrq" label="开工日期" align="center">
              </el-table-column>
              <el-table-column prop="jiao_rq" label="交工日期" align="center">
              </el-table-column>
              <el-table-column prop="szsf" label="业绩所在省份" align="center">
              </el-table-column>
              <el-table-column prop="xxly" label="信息来源" align="center">
              </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="yjxx.page" background layout="total,prev, pager, next" :total="yjxx.total" class="pagination"></el-pagination>
            <!-- </template> -->
          </div>
        </div>
      </transition>
      <!-- 奖惩记录 -->
      <transition name="slide-fade">
        <div class="rewards pos_top " v-show="tab=='良好行为记录' || tab=='不良行为记录'">
          <template>
            <p class="title">{{tab}}</p>
            <el-table :data="rewards.tableData" style="width: 100%" border v-loading="loading" v-show="tab=='良好行为记录'">
              <el-table-column width="60" label="序号" align="center">
                <template slot-scope="scope">
                  {{scope.$index+(rewards.page-1)*10+1}}
                </template>
              </el-table-column>
              <el-table-column prop="bt" label="标题" width="180" align="center">
              </el-table-column>
              <el-table-column prop="xmmc" label="项目名称" width="300" align="center">
                <template slot-scope="scope">
                  <span @click="go_xm(scope.row)" class="xmmc">{{scope.row.xmmc}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jddw" label="企业名称" align="center">
              </el-table-column>
              <el-table-column prop="fwh" label="发文号" align="center">
              </el-table-column>
              <el-table-column prop="jdrq" label="决定日期" align="center">
              </el-table-column>
            </el-table>
            <el-table :data="rewards.tableData" style="width: 100%" border v-loading="loading" v-show="tab=='不良行为记录'">
              <el-table-column width="60" label="序号" align="center">
                <template slot-scope="scope">
                  {{scope.$index+(rewards.page-1)*10+1}}
                </template>
              </el-table-column>
              <el-table-column prop="bt" label="标题" width="180" align="center">
              </el-table-column>
              <el-table-column prop="wjbh" label="文件编号" width="180" align="center">
              </el-table-column>
              <el-table-column prop="gsmc" label="单位名称" align="center">
              </el-table-column>
              <el-table-column prop="xmmc" label="项目名称" width="180" align="center">
                <template slot-scope="scope">
                  <span @click="go_xm(scope.row)" class="xmmc">{{scope.row.xmmc}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="rddblxw" label="认定的不良行为" align="center">
              </el-table-column>
              <el-table-column prop="cfkssj" label="处罚开始时间" align="center">
              </el-table-column>
              <el-table-column prop="cfkssj" label="处罚结束时间" align="center">
              </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="rewards.page" background layout="total,prev, pager, next" :total="rewards.total" class="pagination"></el-pagination>
          </template>
        </div>
      </transition>
      <!-- 企业在各地的信用等级 -->
      <transition name="slide-fade">
        <div class="credit pos_top" v-show="tab=='企业在各地的信用等级'">
          <template>
            <el-table :data="credit.tableData" style="width: 100%" border v-loading="loading">
              <el-table-column width="60" label="序号" align="center">
                <template slot-scope="scope">
                  {{scope.$index+(rewards.page-1)*10+1}}
                </template>
              </el-table-column>
              <el-table-column prop="pjsf" label="评价省份" width="180" align="center">
              </el-table-column>
              <el-table-column prop="pjnf" label="评价年份" width="180" align="center">
              </el-table-column>
              <el-table-column prop="dj" label="等级" align="center">
              </el-table-column>
            </el-table>
            <el-pagination align="right" @current-change="changePage" :current-page.sync="credit.page" background layout="total,prev, pager, next" :total="credit.total" class="pagination"></el-pagination>
          </template>
        </div>
      </transition>
    </div>
    <back-to-top></back-to-top>
  </div>
</template>

<script>
import gs_jstGl from "../assets/gs_jst&gl.png";
import headNav from "./template/head_nav";
import tableInfo from "./template/tableInfo";
import backToTop from "./template/backToTop";

export default {
  data() {
    return {
      loading: true,
      gsmc: "",
      updateTime: "",
      gs_id: this.$route.query.gs_id,
      source: "全国公路市场",
      tab: "基本信息",
      yj_tab: ["总包业绩已建", "总包业绩在建", "分包业绩已建", "分包业绩在建"],
      jc_tab: ["不良行为记录", "良好行为记录"],
      province: [],
      headNav: {
        nav: [
          { text: "基本信息", num: 0 },
          { text: "人员信息", num: 0 },
          {
            text: "业绩信息",
            num: 0,
            child: [
              {
                text: "总包业绩",
                child: [{ text: "已建" }, { text: "在建" }]
              },
              {
                text: "分包业绩",
                child: [{ text: "已建" }, { text: "在建" }]
              }
            ]
          },
          {
            text: "奖惩记录",
            num: 0,
            child: [{ text: "良好行为记录" }, { text: "不良行为记录" }]
          },
          { text: "企业在各地的信用等级", num: 0 }
        ],
        source: { name: "全国公路市场", link: "www.baidu.com", img: gs_jstGl }
      },
      jbxx: {
        col: "",
        rows: []
      },
      ryxx: {
        form: {
          name: ""
        },
        page: 1,
        total: 0,
        tableData: []
      },
      yjxx: {
        radio: "省厅审核",
        form: {
          xmmc: "",
          min_money: "",
          max_money: "",
          // start_date: '',
          // end_date: '',
          min_date_kg: "",
          max_date_kg: "",
          min_date_jg: "",
          max_date_jg: "",
          cyry: "",
          province: ""
        },
        page: 1,
        total: 0,
        tableData: []
      },
      rewards: {
        page: 1,
        total: 0,
        tableData: []
      },
      credit: {
        page: 1,
        total: 0,
        tableData: []
      }
    };
  },
  components: {
    headNav,
    tableInfo,
    backToTop
  },
  created() {
    this.getComBase();
    this.getProvince();
  },
  watch: {
    $route: function(newVal) {
      console.log(newVal, "====");
      window.location.reload();
    }
  },
  mounted() {},
  methods: {
    go_ry(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&gs_id=${this.gs_id}&name=${
          row.xm
        }&source=gl&staff_base_id=${row.staff_base_id ? row.staff_base_id : ""}`
      });
      window.open(href, "人员详情" + this.gs_id + row.xm);
    },
    go_xm(row) {
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${
          this.$route.query.login_service_id
        }&qymc=${this.$route.query.qymc}&proj_id=${row.proj_id}&source=gl`
      });
      window.open(href, "业绩详情" + row.xmmc + row.proj_id + "gl");
    },
    openFullScreen() {
      this.loading = true;
    },
    closeFullScreen() {
      this.loading = false;
    },
    switchNav(data) {
      //切换导航 重置
      let self = this;
      self.tab = data;
      let jl = self.jc_tab;
      let yj = self.yj_tab;
      if (jl.indexOf(self.tab) > -1 || self.tab == "企业在各地的信用等级") {
        //奖惩 /信用
        this.credit.page = 1;
        self.firmCredit(self.tab);
      } else if (yj.indexOf(self.tab) > -1 || self.tab == "人员信息") {
        //业绩 人员信息
        self.reset();
      }
    },
    changePage: function(val) {
      let tab = this.tab;
      if (tab == "人员信息") {
        this.ryxx.page = val;
        this.firmStaff();
      } else if (this.yj_tab.indexOf(tab) > -1) {
        this.yjxx.page = val;
        this.firmProj();
      } else if (this.jc_tab.indexOf(tab) > -1) {
        this.rewards.page = val;
        this.firmCredit();
      } else if (tab == "企业在各地的信用等级") {
        this.credit.page = val;
        this.firmCredit();
      }
    },
    onSubmitRy: function() {
      this.ryxx.page = 1;
      this.firmStaff();
    },
    onSubmitYj: function() {
      this.yjxx.page = 1;
      this.firmProj();
    },
    reset: function() {
      let tab = this.tab;
      let yj = this.yj_tab;
      if (tab == "人员信息") {
        this.ryxx.form.name = "";
        this.ryxx.page = 1;
        this.firmStaff();
      } else if (yj.indexOf(tab) > -1) {
        this.yjxx.form.xmmc = "";
        this.yjxx.form.min_money = "";
        this.yjxx.form.max_money = "";
        this.yjxx.form.min_date_kg = "";
        this.yjxx.form.max_date_kg = "";
        this.yjxx.form.min_date_jg = "";
        this.yjxx.form.max_date_jg = "";
        this.yjxx.form.cyry = "";
        this.yjxx.form.province = "";
        this.yjxx.page = 1;
        this.firmProj();
      }
    },
    getComBase: function() {
      //基本信息
      let self = this;
      let params = {
        gs_id: self.gs_id,
        source: self.source
      };
      this.axios.post("/firm/Firm_detail/getCompBase", params, data => {
        if (data.status == "success") {
          let rows = data.rows;
          self.gsmc = rows.qymc;
          self.updateTime = rows.modified;
          self.headNav.source.link = rows.source_link;
          self.headNav.source.name = rows.source;
          self.comp_id = rows.comp_id;
          self.firmBasic({
            comp_id: rows.comp_id,
            source: rows.source
          });
          self.getCompCate();
          document.title = "公 | " + rows.qymc;
        }
      });
    },
    firmBasic: function(params) {
      let self = this;
      this.axios.post("/firm/Firm_detail/firmBasic", params, data => {
        if (data.status == "success") {
          let rows = data.rows.comp_jbxx;
          let tableData = {
            col: 2,
            rows: rows
          };
          self.jbxx = tableData;
        }
      });
    },

    firmStaff: function() {
      //人员
      let self = this;
      let params = {
        page: self.ryxx.page,
        comp_id: self.comp_id,
        source: self.source,
        rymc: self.ryxx.form.name,
        gs_id: this.gs_id
      };
      this.openFullScreen();
      this.axios.post("/firm/Firm_detail/firmStaff", params, data => {
        if (data.status == "success") {
          self.ryxx.tableData = data.rows;
          self.ryxx.total = data.total;
        } else {
          self.ryxx.tableData = [];
          self.ryxx.total = 0;
        }
        self.closeFullScreen();
      });
    },
    firmCredit(cate) {
      //良好 信用
      let self = this;
      let page =
        cate == "企业在各地的信用等级" ? self.credit.page : self.rewards.page;
      let params = {
        page: page,
        comp_id: self.comp_id,
        source: self.source,
        cate: cate
      };
      self.openFullScreen();
      this.axios.post("/firm/Firm_detail/firmCredit", params, data => {
        if (data.status == "success") {
          if (cate == "企业在各地的信用等级") {
            self.credit.tableData = data.rows;
            self.credit.total = data.total;
          } else {
            self.rewards.tableData = data.rows;
            self.rewards.total = data.total;
          }
        } else {
          if (cate == "企业在各地的信用等级") {
            self.credit.tableData = [];
            self.credit.total = 0;
          } else {
            self.rewards.tableData = [];
            self.rewards.total = 0;
          }
        }
        self.closeFullScreen();
      });
    },
    getCompCate() {
      let self = this;
      let params = {
        comp_id: self.comp_id,
        source: self.source
      };
      this.axios.post("/firm/Firm_detail/getCompCate", params, data => {
        if (data.status == "success") {
          let rows = data.rows;
          rows.forEach(element => {
            if (element.text == "业绩信息") {
              element.child = [
                {
                  text: "总包业绩",
                  child: [{ text: "已建" }, { text: "在建" }]
                },
                {
                  text: "分包业绩",
                  child: [{ text: "已建" }, { text: "在建" }]
                }
              ];
            } else if (element.text == "奖惩记录") {
              element.child = [
                { text: "良好行为记录" },
                { text: "不良行为记录" }
              ];
            }
          });
          self.headNav.nav = rows;
        }
      });
    },
    // 业绩
    firmProj() {
      let self = this;
      let form = self.yjxx.form;
      let yjType = 1;
      if (this.yjxx.radio == "省厅审核") {
        yjType = 1;
      } else if (this.yjxx.radio == "省厅录入") {
        yjType = 2;
      } else if (this.yjxx.radio == "系统自动审核") {
        yjType = 3;
      }
      let params = {
        comp_id: self.comp_id,
        source: self.source,
        xmmc: form.xmmc,
        minMoney: form.min_money,
        maxMoney: form.max_money,
        minKgrq: form.min_date_kg,
        maxKgrq: form.max_date_kg,
        minJgrq: form.min_date_jg,
        maxJgrq: form.max_date_jg,
        rymc: form.cyry,
        xmsd: form.province == "全部" ? "" : form.province,
        yjType: yjType,
        zfType: self.tab.indexOf("总包") > -1 ? 1 : 2,
        yzType: self.tab.indexOf("已建") > -1 ? 1 : 2,
        page: self.yjxx.page,
        rows: 10
      };
      self.openFullScreen();
      this.axios.post("/firm/Firm_detail/firmProj", params, data => {
        if (data.status == "success") {
          self.yjxx.tableData = data.rows;
          self.yjxx.total = data.total;
        } else {
          self.yjxx.tableData = [];
          self.yjxx.total = 0;
        }
        self.closeFullScreen();
      });
    },
    // 省厅审核录入
    switchSt() {
      this.yjxx.page = 1;
      this.firmProj();
    },
    getProvince() {
      let self = this;
      this.axios.post("/firm/Firm_detail/getProvince", {}, data => {
        self.province = data.rows;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@charset "utf-8";
@active-color: #348bda;
@num-color: #ff6a6a;
.slide-fade-enter-active {
  transition: all 0.2s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.1s ease-out;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.el-form-item {
  margin-bottom: 10px;
}
.xmmc {
  color: @active-color;
  cursor: pointer;
}
.my_table {
  width: 100%;
  text-align: center;
  font-size: 13px;
  border-collapse: collapse;
  td {
    border: 1px solid #d5d5d5;
    padding: 15px 0;
  }
  td:nth-child(odd) {
    background-color: #f9f9f9;
    width: 160px;
  }
}
.cursor {
  cursor: pointer;
}
#gs_road {
  padding-bottom: 30px;
  .input {
    width: 200px;
  }
  .normalForm {
    float: right;
  }
  .pagination {
    margin: 20px 0;
  }
  color: #333;
  header {
    box-shadow: 2px 2px 2px rgb(241, 240, 240);
    height: 70px;
    min-width: 1200px;
    line-height: 70px;
    margin-bottom: 2px;

    div {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .gsmc {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 32px;
      }
      .info {
        position: absolute;
        right: 0;
        bottom: -10px;
        font-size: 13px;
      }
    }
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .pos_top {
      // position: absolute;
      // top: 0;
      width: 100%;
    }
    .title {
      text-align: center;
      color: #348bda;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .flex {
      display: flex;
    }
    .yj_switch {
      margin-bottom: 20px;
    }
    .left_input {
      width: 300px;
    }
    .right_input {
      width: 210px;
    }
    .line {
      text-align: center;
    }
    .newline {
      width: 15px;
      text-align: center;
    }
    .newLine {
      width: 32px;
      text-align: center;
      display: inline-block;
    }
    .btns {
      margin-left: 43%;
      width: 165px;
    }
    .yj_switch {
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
      }
    }
  }
}
</style>

