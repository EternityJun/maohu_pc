<!--人员详情-->
<template>
  <div class="ItemInfo_content">
    <div class="content_header">
      <div class="tittle">{{jbxx.staff_name}}</div>
    </div>
    <div class="content_body" v-loading='loadingBase || loadingZj'>
      <div class="body_header">
        <!-- 人员基本信息 -->
        <el-row>
          <!-- 性别、证件类型、证件号码 -->
          <el-col :span="11">
            <!-- 性别 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-top: #d5d5d5 1px solid;border-right:none">性别</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light" style="border-top: #d5d5d5 1px solid;">{{jbxx.sex}}</div>
              </el-col>
            </el-row>
            <!-- 证件类型 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-right:none">证件类型</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light">{{jbxx.certificate_type}}</div>
              </el-col>
            </el-row>
            <!-- 证件号码 -->
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-right:none">证件号码</div>
              </el-col>
              <el-col :span="17">
                <div class="grid-content bg-purple-light">{{jbxx.certificate_number}}</div>
              </el-col>
            </el-row>
          </el-col>
          <!-- 关联企业 -->
          <el-col :span="11">
            <el-row>
              <el-col :span="7">
                <div class="grid-content bg-purple" style="border-top: #d5d5d5 1px solid;height:128px;line-height:128px;border-right:none">关联企业</div>
              </el-col>
              <el-col :span="17" v-if="this.$route.query.cate==1">
                <div class="grid-content bg-purple-light" style="border-top: #d5d5d5 1px solid;height:128px;line-height:128px;">{{jbxx.company.length>0?jbxx.company[0]:''}}</div>
              </el-col>
              <el-col :span="17" v-else>
                <div class="grid-content bg-purple-light" style="border-top: #d5d5d5 1px solid;">{{jbxx.company.length>0?jbxx.company[0]:''}}</div>
                <div class="grid-content bg-purple-light">{{jbxx.company.length>1?jbxx.company[1]:''}}</div>
                <div class="grid-content bg-purple-light">{{jbxx.company.length>2?jbxx.company[2]:''}}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <div style="height:128px;width:98%;border: #d5d5d5 1px solid;text-align:center">
              <img :src="jbxx.img" style="width:100%;height:128px">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="body_content">
        <div>
          <head-nav :data="navData" @switchNav="switchNav"></head-nav>
        </div>
        <!-- 证书信息 -->
        <div v-if="zsxx">
          <div class="item_zs" v-for="(item1,key2) in itemInfo" :key="key2">
            <!-- 标题 -->
            <div class="title">
              {{key2}}
            </div>
            <!-- 内容 -->
            <div class="itemInfo">
              <!-- 内容中的每一个小项 -->
              <div class="itemInfoLi" v-for="(item,key) in item1" :key="key">
                <div class="itemInfoLi_title">
                  <span style="float:left">
                    {{item.not_each[0]?item.not_each[0]:''}}
                  </span>
                  <span style="float:right;font-size:14px;">
                    {{item.not_each[1]?item.not_each[1]:''}}
                  </span>
                </div>
                <div class="itemInfoLi_content">
                  <el-row>
                    <!-- 左边的内容 -->
                    <el-col :span="12">
                      <div>
                        <!-- 第一排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[0]?item.each[0].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[0]?item.each[0].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第二排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[2]?item.each[2].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[2]?item.each[2].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第三排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[4]?item.each[4].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[4]?item.each[4].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第四排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[6]?item.each[6].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[6]?item.each[6].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[8]?item.each[8].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[8]?item.each[8].value:''">
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <!-- 右边的内容 -->
                    <el-col :span="12">
                      <!-- 右边的内容 -->
                      <div>
                        <!-- 第一排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[1]?item.each[1].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[1]?item.each[1].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第二排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[3]?item.each[3].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[3]?item.each[3].value:''" style="overflow:hiden">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第三排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[5]?item.each[5].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[5]?item.each[5].value:''">
                            </div>
                          </el-col>
                        </el-row>
                        <!-- 第四排 -->
                        <el-row>
                          <el-col :span="10">
                            <div class="content_left" v-html="item.each[7]?item.each[7].name+'：':''">
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="content_right" v-html="item.each[7]?item.each[7].value:''">
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="itemInfoLi_footer" style="height:15px">
                  <img v-if="key2=='四川省建设厅'" src="../assets/gs_jst&gl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国建筑市场'" src="../assets/gs_jz.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国水利市场'" src="../assets/gs_sl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2=='全国公路市场'" src="../assets/gs_jst&gl.png" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <img v-if="key2!='四川省建设厅'&&key2!='全国建筑市场' && key2!='全国水利市场' && key2!='全国公路市场'" src="../assets/ie.jpg" alt="" :style="{width:'15px',verticalAlign:'middle'}">
                  <a :href="item.http" target="_blank" :style="{color:'#999',textDecoration:'underline',verticalAlign:'middle'}">
                    数据源网
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 在建项目 -->
        <div v-if="zjxm">
          <PersonnelInfoTable :tableData="zjxmList" :tableName="tableName" @changeData="changePageData" :key="tableName"></PersonnelInfoTable>
        </div>
        <!-- 中标项目 -->
        <div v-if="zbxm">
          <PersonnelInfoTable :tableData="zbxmList" :tableName="tableName" @changeData="changePageData" :key="tableName"></PersonnelInfoTable>
        </div>
        <!-- 人员与项目 -->
        <div v-if="ryyxm">
          <div class="tl-content" v-for="(val,key,index) in ryyxmData" :key="index">
            <div class="left ryLeft"></div>
            <div class="right">
              <p class="myDate today" v-if="key=='ten_years_ago'">最近五年</p>
              <p class="myDate ago" v-if="key=='all'">五年以前</p>
              <div class="oneDay" v-for="(val2,key2,index2) in val" :key="index2">
                <!-- {{index2}} -->
                <span class="lineDate">{{key2}}</span>
                <div class="border-down"></div>
                <div class="border-up"></div>
                <div class="dotOut"></div>
                <div class="dotIn"></div>
                <div class="myData">
                  <div class="oneData" v-for="(item3,index3) in val2" :key="index3">
                    <p v-if="item3.stxm==undefined" class="xmmc link_color" @click="openXm" :data-id="item3.proj_id" :data-xmmc="item3.proj_name" :data-zbxxid="item3.zbxx_id" :data-remark="item3.remark">{{item3.proj_name}}</p>
                    <p v-if="item3.stxm!=undefined" class="xmmc">{{item3.proj_name}}</p>
                    <p v-if="item3.stxm!=undefined" class="stxm">所投项目：
                      <span class="link_color" @click="openXm" :data-id="item3.proj_id" :data-xmmc="item3.proj_name" :data-zbxxid="item3.zbxx_id" :data-remark="item3.remark">{{item3.stxm}}</span>
                    </p>
                    <div class="detail">
                      <p class="type detailText">项目类型：{{item3.proj_type}}</p>
                      <p class="money detailText">金额(万元)：{{item3.money}}</p>
                      <p class="date detailText">日期：{{item3.proj_date}}</p>
                      <p class="date detailText">数据来源：{{item3.remark}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div>sth</div>； -->

            </div>

          </div>
          <div v-if="ryyxmNone.status=='failed'" class="noData">暂无数据</div>
        </div>
        <!-- 工程业绩 -->
        <div class="item_yj" v-if="gcyj">
          <ry-proj :staff_base_id="staff_base_id"></ry-proj>
        </div>
        <!-- 投标使用业绩 -->
        <div v-if="tbsyyj">
          <PersonnelInfoTable :tableData="tbsyyjList" :tableName="tableName" @changeData="changePageData" :key="tableName"></PersonnelInfoTable>
        </div>
        <!-- 其他 -->
        <div class="item_qt" v-if="qt">

          <div class="tl-content" v-if="qtData.status=='success'">
            <div class="left qtLeft"></div>
            <div class="right">
              <!-- <p class="myDate">{{myDate[0]}}</p> -->
              <div class="oneDay" v-for="(val,key,index) in qtData.rows" :key="index">
                <span class="lineDate">{{key}}</span>
                <div class="border-down"></div>
                <div class="border-up"></div>
                <div class="dotOut"></div>
                <div class="dotIn"></div>
                <div class="myData">
                  <div class="oneData" v-for="(item2,index2) in val" :key="index2">
                    <div v-if="item2.决定内容!=undefined">
                      <p class="link_color qtnr">{{item2.决定内容}}</p>
                      <div class="detail">
                        <!-- <div class="detailText" v-if="key3!='决定内容'" v-for="(val3,key3,index3) in item2" :key="index3">{{key3}}：{{val3}}
                        </div> -->
                        <p class="num detailText">诚信记录编号：{{item2.诚信记录编号}}</p>
                        <p class="mainBody detailText">诚信记录主体：{{item2.诚信记录主体}}</p>
                        <p class="date detailText">发布有效期：{{item2.发布有效期}}</p>
                        <p class="depart detailText">实施部门（文号）：{{item2.实施部门}}</p>
                      </div>
                    </div>
                    <div v-if="item2.变更内容!=undefined">
                      <p class="link_color qtnr">{{item2.变更内容}}</p>
                      <div class="detail">
                        <!-- <div class="detailText" v-if="key3!='变更内容'" v-for="(val3,key3,index3) in item2" :key="index3">{{key3}}：{{val3}}
                        </div> -->
                        <p class="type detailText">变更日期：{{item2.proj_type}}</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="qtNone.status=='failed'" class="noData">暂无数据</div>
          <!-- <div class="test" v-for="(item,index) in test" :key="index">
            <div v-if="item.决定内容!=undefined" v-for="(val,key,index2) in item" :key="index2">
              <p>{{key}}</p>
              <p>{{val}}</p>
            </div>
            <p>————————————————————————————————</p>
            <div v-if="item.变更内容!=undefined" v-for="(val,key,index2) in item" :key="index2">
              <p>{{key}}</p>
              <p>{{val}}</p>
            </div>

          </div> -->
          <!-- title -->
          <!-- <div style="margin-bottom:20px;margin-top:4px">
            <span :style="{borderRadius:'4px',padding:'5px',backgroundColor:lh?'#409EFF':'#fff',cursor:'pointer',color:lh?'#fff':'#000'}" @click="chechLh('lh')">良好/不良
              <span :style="{color:lh?'#fff':'#348bda'}">({{BlLhCount[0].num}})</span>
            </span>
            <span :style="{borderRadius:'4px',padding:'5px',backgroundColor:bg?'#409EFF':'#fff',cursor:'pointer',color:bg?'#fff':'#000'}" @click="chechLh('bg')">变更记录
              <span :style="{color:bg?'#fff':'#348bda'}">({{BlLhCount[0].num}})</span>
            </span>
          </div>
          <div> -->
          <!-- 良好/不良 -->
          <!-- <div v-if="lh">
              <el-table :data="tableDataLh" style="width: 100%;margin-top:5px" border>
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="cxjlbh" label="诚信记录编号" width="180" align="center">
                </el-table-column>
                <el-table-column prop="cxjlzt" label="诚信记录主体" width="180" align="center">
                </el-table-column>
                <el-table-column prop="jdnr" label="决定内容" align="center">
                </el-table-column>
                <el-table-column label="实施部门(文号)" align="center">
                  <template slot-scope="scope">
                    {{getSsbmWh(scope.row.ssbm,scope.row.wh)}}
                  </template>
                </el-table-column>
                <el-table-column prop="fbyxq" label="发布有效期" align="center">
                </el-table-column>
              </el-table>
            </div> -->
          <!-- 变更记录 -->
          <!-- <div v-if="bg">
              <el-table :data="tableData" style="width: 100%;margin-top:5px" border>
                <el-table-column type="index" label="序号" width="60" align="center">
                </el-table-column>
                <el-table-column prop="date" label="变更日期" align="center">
                </el-table-column>
                <el-table-column prop="name" label="变更内容" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import ryProj from "./template/ryProj.vue";
import headNav from "./template/head_nav.vue";
import PersonnelInfoTable from "./template/PersonnelInfoTable.vue";
export default {
  components: {
    ryProj,
    headNav,
    PersonnelInfoTable
  },
  created() {
    this.getStaffInfo();
    // this.getCompInfo();
    document.title =
      "人员详情:" + this.$route.query.name + "_" + this.$route.query.gs_id;
    // this.getLh();
    this.getZjxmList();
    this.getZbxmList();
    this.getTbsyyjList();
    // this.getDate();
  },
  data() {
    return {
      itemInfo: {},
      jbxx: {
        company: [],
        staff_name: ""
      },
      navData: {
        // nav: [
        //   { text: '证书信息', num: 0 },
        //   { text: '工程业绩', num: 0 },
        //   { text: '其他', num: 0 }
        // ],
        nav: [
          { text: "证书信息", num: 0 },
          { text: "在建项目", num: 0 },
          { text: "中标项目", num: 0 },
          { text: "人员与项目", num: 0 },
          { text: "工程业绩", num: 0 },
          { text: "投标使用业绩", num: 0 },
          { text: "其他", num: 0 }
        ],
        source: {
          link: "",
          name: ""
        }
      },
      //切换按钮
      zsxx: true,
      zjxm: false,
      zbxm: false,
      ryyxm: false,
      gcyj: false,
      tbsyyj: false,
      qt: false,
      lh: true,
      bg: false,
      //模拟数据
      tableData: [],
      staff_base_id: "",
      staff_id: "",
      tableDataLh: [],
      tableDataBg: [],
      BlLhCount: [],
      zjxmList: [],
      zbxmList: [],
      tbsyyjList: [],
      tableName: "",
      pageNum: 1,
      rows: 10,
      qtTableList: [],
      qtTableObj: [],
      ryyxmData: [],
      // allLength: "",
      // agoLength: "",
      ryyxmNone: [],
      qtData: [],
      qtNone: [],
      loadingBase:false,
      loadingZj:false,
      // myDate: []
    };
  },
  watch: {
    $route: function(newVal) {
      window.location.reload();
    }
  },
  methods: {
    getStaffInfo() {
      this.axios.post(
        "/firm/people/getStaffInfo",
        {
          name: this.$route.query.name,
          gs_id: this.$route.query.gs_id
        },
        data => {
          if (data.status == "success") {
            this.staff_base_id = data.rows.staff_base_id;
            this.staff_id = data.rows.staff_id;
            this.getRyyxm();
            this.getJbxx();
            this.getData();
            this.getNavNumber();
            this.getTableData();
            // this.getLh();
            // this.getBl();
            this.getBlLhCount();
            this.getQt();
          } else {
          }
        }
      );
    },
    // //获得良好信息记录
    // getLh() {
    //   this.axios.post(
    //     "/firm/people/peopleCredit",
    //     { staff_id: this.staff_id, type: "良好/不良" },
    //     data => {
    //       if (data.status == "success") {
    //         this.tableDataLh = data.rows;
    //       } else {
    //       }
    //     }
    //   );
    // },
    // //获得变更记录信息记录
    // getBl() {
    //   this.axios.post(
    //     "/firm/people/peopleCredit",
    //     { staff_id: this.staff_id, type: "变更记录" },
    //     data => {
    //       if (data.status == "success") {
    //         // this.tableDataBg = data.rows;
    //       } else {
    //       }
    //     }
    //   );
    // },
    //获取其他信息
    getQt() {
      this.axios.post(
        "/firm/people/peopleCreditNew",
        { staff_id: this.staff_id },
        data => {
          if (data.status == "success") {
            this.qtData = data;
          } else {
            this.qtNone = data;
          }
        }
      );
    },
    //获得变更记录信息记录数目
    getBlLhCount() {
      this.axios.post(
        "/firm/people/peopleCreditCount",
        { staff_id: this.staff_id },
        data => {
          if (data.status == "success") {
            this.BlLhCount = data.rows;
          } else {
          }
        }
      );
    },
    //返回实施部门(文号)
    getSsbmWh(a, b) {
      return a + "(" + b + ")";
    },
    getData() {
      this.loadingZj=true
      this.axios.post(
        "/firm/people/peopleDetail",
        { staff_id: this.staff_id },
        data => {
          this.loadingZj=false
          if (data.status == "success") {
            this.itemInfo = data.rows;
          } else {
          }
        }
      );
    },
    getJbxx() {
      this.loadingBase=true
      this.axios.post(
        "/firm/people/peopleBase",
        { staff_base_id: this.staff_base_id },
        data => {
          this.loadingBase=false
          if (data.status == "success") {
            this.jbxx = data.rows;
            this.jbxx.company = data.rows.company;
          } else {
          }
        }
      );
    },
    //工程业绩数据
    getTableData() {
      this.axios.post(
        "/firm/Performance/projectLists",
        { staff_base_id: this.staff_base_id },
        data => {}
      );
    },
    //导航栏数据
    getNavNumber() {
      let name = this.$route.query.name;
      let gs_id = this.$route.query.gs_id;
      let company_id = localStorage.company_id;
      this.axios.post(
        "/firm/people/countNav",
        {
          staff_id: this.staff_id,
          staff_base_id: this.staff_base_id,
          staff_name: name,
          gs_id: gs_id,
          company_id: company_id
        },
        data => {
          this.navData = {
            nav: data,
            source: {
              link: "",
              name: ""
            }
          };
        }
      );
    },
    switchNav(name) {
      this.pageNum = 1;
      this.tableName = name;
      this.zsxx = false;
      this.zjxm = false;
      this.zbxm = false;
      this.ryyxm = false;
      this.gcyj = false;
      this.tbsyyj = false;
      this.qt = false;
      if (name == "证书信息") {
        this.zsxx = true;
      }
      if (name == "工程业绩") {
        this.gcyj = true;
      }
      if (name == "其他") {
        this.qt = true;
      }
      if (name == "在建项目") {
        this.zjxm = true;
      }
      if (name == "中标项目") {
        this.zbxm = true;
      }
      if (name == "投标使用业绩") {
        this.tbsyyj = true;
      }
      if (name == "人员与项目") {
        this.ryyxm = true;
      }
    },
    chechLh(name) {
      this.lh = false;
      this.bg = false;
      if (name == "lh") {
        this.lh = true;
      }
      if (name == "bg") {
        this.bg = true;
      }
    },
    //获取在建项目的数据
    getZjxmList() {
      // let staff_base_id = this.$route.query.staff_base_id;
      this.axios.post(
        "/firm/people/onBuilding",
        {
          staff_base_id: this.$route.query.staff_base_id,
          page: this.pageNum,
          rows: this.rows
        },
        data => {
          this.zjxmList = data;
        }
      );
    },
    //获取中标项目的数据
    getZbxmList() {
      let name = this.$route.query.name;
      let gs_id = this.$route.query.gs_id;

      this.axios.post(
        "/firm/people/winBid",
        {
          gs_id: gs_id,
          name: name,
          page: this.pageNum,
          rows: this.rows
        },
        data => {
          this.zbxmList = data;
        }
      );
    },
    //获取人员与项目的数据
    getRyyxm() {
      this.axios.post(
        "/firm/people/peoplePro",
        {
          staff_base_id: this.staff_base_id,
          gs_id: this.$route.query.gs_id,
          name: this.$route.query.name
        },
        data => {
          if (data.status == "success") {
            this.ryyxmData = data.rows;
            // this.allLength = Object.keys(this.ryyxmData.ten_years_ago).length;
            // this.agoLength = Object.keys(this.ryyxmData.all).length;
          } else {
            this.ryyxmNone = data;
          }
        }
      );
    },
    // 打开项目详情
    openXm(e) {
      if (e.srcElement.dataset.zbxxid != undefined) {
        let { href } = this.$router.resolve({
          path: `/enterpriseDetails?zbxx_id=${
            e.srcElement.dataset.zbxxid
          }&zbgs_id=${e.srcElement.dataset.id}&xmmc=${
            e.srcElement.dataset.xmmc
          }&type=zbgs&source=${e.srcElement.dataset.source}`
        });
        window.open(href);
      } else if (e.srcElement.dataset.remark != undefined) {
        let source = "";
        if (e.srcElement.dataset.remark == "四川省建设厅") {
          source = "jst";
        } else if (e.srcElement.dataset.remark == "全国公路市场") {
          source = "gl";
        } else if (e.srcElement.dataset.remark == "全国水利市场") {
          source = "sl";
        } else if (e.srcElement.dataset.remark == "全国建筑市场") {
          source = "jzsc";
        }
        let { href } = this.$router.resolve({
          path: `yjDet?proj_id=${e.srcElement.dataset.id}&source=${source}`
        });
        window.open(href);
      }
    },
    //获取投标使用业绩的数据
    getTbsyyjList() {
      let name = this.$route.query.name;
      let gs_id = this.$route.query.gs_id;

      this.axios.post(
        "/firm/people/usedPerformance",
        {
          gs_id: gs_id,
          name: name,
          page: this.pageNum,
          rows: this.rows
        },
        data => {
          this.tbsyyjList = data;
        }
      );
    },
    changePageData(val, name) {
      if (name == "投标使用业绩") {
        this.pageNum = val;
        this.getTbsyyjList();
      } else if (name == "中标项目") {
        this.pageNum = val;
        this.getZbxmList();
      } else if (name == "在建项目") {
        this.pageNum = val;
        this.getZjxmList();
      }
    },
    //获取时间轴中今日与五年前的日期
    // getDate() {
    //   let date = new Date();
    //   let seperator1 = "-";
    //   let year = date.getFullYear();
    //   let agoYear = year - 5;
    //   let month = date.getMonth() + 1;
    //   let strDate = date.getDate();
    //   if (month >= 1 && month <= 9) {
    //     month = "0" + month;
    //   }
    //   if (strDate >= 0 && strDate <= 9) {
    //     strDate = "0" + strDate;
    //   }
    //   let today = year + seperator1 + month + seperator1 + strDate;
    //   let ago = agoYear + seperator1 + month + seperator1 + strDate;
    //   this.myDate.push(today, ago);
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.xmxx_class {
  margin-left: 50px;
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
    width: 1200px;
    display: flex;
    margin: 0 auto;
    padding: 25px;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    // height: calc(~"100% - 60px");
    background: #fff;
    .body_header {
      box-shadow: none;
      background: #ffffff;
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
            position: relative;
            background-size: 100% 100%;
            width: 250px;
            line-height: 28px;
            height: 28px;
            text-align: center;
            z-index: 10;
          }
          .eachOne:nth-child(2) {
            left: -30px;
            z-index: 9;
          }
          .eachOne:nth-child(3) {
            left: -55px;
            z-index: 8;
          }

          .eachOne:nth-child(4) {
            left: -82px;
            z-index: 7;
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
      box-shadow: none;
      .item_zs {
        position: relative;
        border: 1px #d5d5d5 solid;
        margin-bottom: 20px;
        .title {
          position: absolute;
          top: -20px;
          left: 5px;
          background-color: #ffffff;
          height: 40px;
          line-height: 40px;
          color: #409eff;
        }
        .itemInfo {
          overflow: hidden;
          padding: 20px 0 0 0;
          .itemInfoLi {
            position: relative;
            .el-row {
              margin-bottom: 10px;
            }
            .itemInfoLi_title {
              width: 560px;
              height: 32px;
              border-bottom: 1px #d5d5d5 solid;
              margin: auto;
              line-height: 32px;
            }
            .itemInfoLi_content {
              padding: 20px;
              .content_left {
                font-size: 14px;
                color: #999;
                text-align: right;
              }
              .content_right {
                font-size: 14px;
              }
            }
            .itemInfoLi_footer {
              position: absolute;
              bottom: 10px;
              right: 20px;
              font-size: 13px;
            }
            width: 591px;
            height: 230px;
            margin-top: 2px;
            margin-left: 4px;
            margin-bottom: 2px;
            border: 1px #d5d5d5 solid;
            float: left;
          }
          .itemInfoLi:hover {
            border: 1px #409eff solid;
          }
        }
      }
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
          .each_left {
            display: flex;
            width: 100px;
            flex-direction: column;
            margin-right: 25px;
            .left_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
          }
          .each_right {
            display: flex;
            flex-direction: column;
            .right_each {
              height: 45px;
              align-content: center;
              display: flex;
            }
            // .right_each_two {
            //   margin-bottom: 20px;
            //   color: #06b6ff;
            // }
            .right_botton {
              display: flex;
              flex-direction: row;
              color: #409eff;
              .button_left {
                display: flex;
                flex-direction: column;
                margin-right: 115px;
                .right_each_two {
                  cursor: pointer;
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
              }
              .button_right {
                border: 1px solid #9d9d9d;
                padding-left: 20px;
                padding-right: 80px;
                display: flex;
                flex-direction: column;
                align-content: center;
                display: flex;
                .right_each_two {
                  height: 45px;
                  align-content: center;
                  display: flex;
                }
                .right_each_two:last-child {
                  margin-bottom: 0px;
                }
              }
            }
          }
        }
      }
      .table {
        display: flex;
        flex-direction: column;
        .table_header {
          font-size: 20px;
          margin: 25px;
        }
        .table_footer {
          margin: 25px;
          display: block;
        }
      }
    }
  }
}
// 时间轴
.tl-content {
  position: relative;
  left: 30px;
  top: 0;
  margin-bottom: 40px;
  display: flex;
  overflow: hidden;
  .left {
    width: 2px;
    margin-bottom: -3000px;
    padding-bottom: 3000px;
    background: #d3d3d3;
    position: relative;
    left: 112px;
    top: 41px;
  }
  .qtLeft {
    top: 21px;
  }
  .right {
    margin-left: 150px;
    .myDate {
      position: relative;
      left: -145px;
      top: 0;
      color: #696969;
      font-size: 16px;
    }
    .today {
    }
    .ago {
    }
    .myData {
      width: 980px;
      // height: 200px;
      position: relative;
      border: 1px solid #d3d3d3;
      background: white;
      box-sizing: border-box;
      padding: 15px;
      z-index: 1;

      .oneData {
        width: 980px;
        display: inline-block;
        margin-bottom: 35px;
        overflow: hidden;
        .xmmc,
        .qtnr {
          width: calc(100% - 40px);
          padding-bottom: 5px;
          border-bottom: 1px dotted #a9a9a9;
        }
        .xmmc {
          color: #696969;
        }
        .link_color {
          color: rgb(58, 142, 230);
          cursor: pointer;
        }
        .qtnr {
          cursor: auto;
        }
        .stxm {
          margin-top: 13px;
          font-size: 14px;
          color: #696969;
          width: calc(100% - 40px);
        }
        .detail {
          display: flex;
          flex-wrap: wrap;
          padding-top: 3px;
        }
        .detailText {
          margin-top: 10px;
          font-size: 14px;
          width: 33%;
          color: #696969;
        }
        .depart {
          width: 100%;
        }
      }
      .oneData:last-child {
        margin-bottom: 0;
      }
    }
    .lineDate {
      position: relative;
      left: -145px;
      top: 37px;
      color: #696969;
      font-size: 15px;
    }
    .border-down {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 15px solid #d3d3d3;
      position: relative;
      left: -96px;
      top: 45px;
      z-index: 0;
    }
    .border-up {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 13px solid transparent;
      border-right: 13px solid transparent;
      border-top: 13px solid white;
      position: relative;
      left: -128px;
      top: 44px;
      z-index: 10;
    }
    .dotOut {
      display: inline-block;
      width: 17px;
      height: 17px;
      background: #1e90ff;
      border-radius: 50%;
      position: relative;
      left: -193px;
      top: 40px;
    }
    .dotIn {
      display: inline-block;
      width: 7px;
      height: 7px;
      background: white;
      border-radius: 50%;
      position: relative;
      left: -209px;
      top: 35px;
    }
  }
}
.noData {
  margin-top: 30px;
  text-align: center;
  color: #696969;
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
.bg-purple {
  background: #f9f9f9;
  text-align: center;
  height: 42px;
  border: #d5d5d5 1px solid;
  border-top: none;
  line-height: 42px;
  font-size: 14px;
}
.bg-purple-light {
  background: #fff;
  text-align: center;
  height: 42px;
  border: #d5d5d5 1px solid;
  border-top: none;
  line-height: 42px;
  font-size: 14px;
}
</style>