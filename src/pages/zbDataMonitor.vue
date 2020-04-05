<template>
  <div>
    <el-header height="auto" style="padding:0">
      <body-top></body-top>
      <div>
        <!-- 导航栏 -->
        <!-- <head-menu :index="'/zhongbiao_data'"></head-menu> -->
      </div>
      <div style="text-align:center;font-size:30px">
        <span>四川省中标信息数据可视化监控系统</span>
      </div>
    </el-header>
    <el-main style="padding:0" class="container">
      <!-- 表格列 -->
      <div class="table">
        <!-- 数据搜索框 -->
        <el-form ref="tableForm">
          <div class="tableSearchRow">
            <div class="searchZD">
              <span class="zdName">项目名称</span>
              <el-input v-model="table.search.xmmc" clearable size="mini" style="width:320px;" placeholder="请输入项目名称" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">项目类别</span>
              <el-select v-model="table.search.xmlb" clearable @clear="searchLeft" placeholder="请选择项目类别" @change="searchLeft" size="mini" style="width:130px;">
                <el-option v-for="(item,key) in typeLBList" :label="item.name" :value="item.value" :key="key"></el-option>
              </el-select>
            </div>
            <div class="searchZD">
              <span class="zdName">项目类型</span>
              <el-select v-model="table.search.zblx" clearable @clear="searchLeft" placeholder="请选择项目类型" @change="searchLeft" size="mini" style="width:130px;">
                <el-option v-for="(item,key) in typeLXList" :label="item.label" :value="item.value" :key="key"></el-option>
              </el-select>
            </div>
            <div class="searchZD">
              <span class="zdName">所属地区</span>
              <el-select v-model="table.search.area" clearable @clear="searchLeft" placeholder="请选择地区" @change="searchLeft" size="mini" style="width:160px;">
                <el-option v-for="item in areaTypeList" :key="item.value" :label="item.value" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="searchZD">
              <span class="zdName">中标日期</span>
              <el-date-picker v-model="table.search.date" size="mini" @clear="searchLeft" value-format="yyyy-MM-dd" @change="dateChange" style="width:250px;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
          <div class="tableSearchRow">
            <div class="searchZD">
              <span class="zdName">最高限价(万元)</span>
              <el-input v-model="table.search.min_money" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_money" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">中标下浮</span>
              <el-input v-model="table.search.min_zbxf" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_zbxf" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">最低下浮</span>
              <el-input v-model="table.search.min_zdxf" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_zdxf" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">平均下浮</span>
              <el-input v-model="table.search.min_average" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_average" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">有效投标(家)</span>
              <el-input v-model="table.search.min_effect" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_effect" clearable size="mini" style="width:63px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
            <div class="searchZD">
              <span class="zdName">总投标(家)</span>
              <el-input v-model="table.search.min_count" clearable size="mini" style="width:64px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="table.search.max_count" clearable size="mini" style="width:64px;" @keyup.enter.native="searchLeft" @clear="searchLeft"></el-input>
            </div>
          </div>
          <div class="searchZD" style="width:135px;margin:20px auto 0 auto">
            <el-button size="mini" type="primary" @click="searchLeft">搜索</el-button>
            <el-button style="width:67px" size="mini" @click="resetTableData">重置</el-button>
          </div>
        </el-form>
        <!-- 数据栏 -->
        <div style="width:1400px;">
          <!-- 单选分栏按钮 -->
          <div class="tableChangeRow">
            <el-radio-group v-model="tableType" @change="tableChange">
              <el-radio-button label="已审核"></el-radio-button>
              <el-radio-button label="回收站"></el-radio-button>
            </el-radio-group>
            <div v-show="tableType=='已审核'">
              <transition name="el-zoom-in-top">
                <div v-if="checkSelections.length!==0">
                  <el-button type="danger" size="small" @click="handleDelete('','','many')">批量删除</el-button>
                </div>
              </transition>
            </div>
            <div v-show="tableType=='回收站'">
              <transition name="el-zoom-in-top">
                <div v-if="delSelections.length!==0">
                  <el-button type="success" size="small" @click="handleRecovery('','','many')">批量还原</el-button>
                </div>
              </transition>
            </div>
          </div>
          <!-- 已审核表格 -->
          <el-container v-show="tableType=='已审核'" v-loading="table.loading" class="tableData">
            <div>
              <el-table :data="table.tableData" border @sort-change="changeSort" @selection-change="tableSelChange" ref="filterTable" width="1360" style="font-size: 14px;">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column label="序号" width="55" align="center">
                  <template slot-scope="scope">
                    {{(table.page-1)*10+scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column label="项目名称" width="155" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <p style="color:#409EFF;cursor:pointer" @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="kbsj" label="中标时间" width="105" align="center" sortable>
                </el-table-column>
                <el-table-column prop="zgxjw" label="最高限价(万元)" width="139" align="center" sortable>
                </el-table-column>
                <el-table-column prop="tbbjw" label="投标报价(万元)" width="139" align="center" sortable>
                </el-table-column>
                <el-table-column prop="is_zq" label="准确性" width="90" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.is_zq == '准'" style="color:red">准</span>
                    <span v-if="scope.row.is_zq == '约'" style="color:blue">约</span>
                  </template>
                </el-table-column>
                <el-table-column prop="zbxf" label="中标下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.zbxf" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.zbxf}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="zdxf" label="最低下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.zdxf" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.zdxf}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="average" label="平均下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.average" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.average}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="有效投标(家)" prop="effective" width="125" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.effective==0">
                      {{scope.row.effective}}
                    </span>
                    <span v-if="scope.row.effective!=0" style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row,'effective')">
                      {{scope.row.effective}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="总投标(家)" width="115" prop="tbgs_count" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.tbgs_count==0">
                      {{scope.row.tbgs_count}}
                    </span>
                    <span v-if="scope.row.tbgs_count!=0" style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row)">
                      {{scope.row.tbgs_count}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column width="80" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-row type="flex" justify="end">
              <el-col :span="10" :offset="10">
                <el-pagination background :current-page.sync='table.nowPage' @current-change="tableChangePage" :page-size="10" layout="total, prev, pager, next" :total="table.total"></el-pagination>
              </el-col>
            </el-row> -->
              <el-pagination background layout="total,prev, pager, next" :total="table.total" @current-change="tableChangePage" :current-page.sync="table.nowPage">
              </el-pagination>
            </div>
          </el-container>
          <!-- 回收站表格 -->
          <el-container v-show="tableType=='回收站'" v-loading="recovery.loading" class="tableData">
            <div>
              <el-table :data="recovery.tableData" border @sort-change="changeSort" @selection-change="recSelChange" ref="filterTable" width="1360">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column label="序号" width="55" align="center">
                  <template slot-scope="scope">
                    {{(recovery.page-1)*10+scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column label="项目名称" width="155" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <p style="color:#409EFF;cursor:pointer" @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="kbsj" label="中标时间" width="105" align="center" sortable>
                </el-table-column>
                <el-table-column prop="zgxjw" label="最高限价(万元)" width="139" align="center" sortable>
                </el-table-column>
                <el-table-column prop="tbbjw" label="投标报价(万元)" width="139" align="center" sortable>
                </el-table-column>
                <el-table-column prop="is_zq" label="准确性" width="90" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.is_zq == '准'" style="color:red">准</span>
                    <span v-if="scope.row.is_zq == '约'" style="color:blue">约</span>
                  </template>
                </el-table-column>
                <el-table-column prop="zbxf" label="中标下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.zbxf" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.zbxf}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="zdxf" label="最低下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.zdxf" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.zdxf}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="average" label="平均下浮" align="center" width="105" sortable>
                  <template slot-scope="scope">
                    <img v-if="scope.row.average" class="xfIcon" src="../assets/u418.png" alt="">
                    <span>
                      {{scope.row.average}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="有效投标(家)" prop="effective" width="125" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.effective==0">
                      {{scope.row.effective}}
                    </span>
                    <span v-if="scope.row.effective!=0" style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row,'effective')">
                      {{scope.row.effective}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="总投标(家)" width="115" prop="tbgs_count" align="center" sortable>
                  <template slot-scope="scope">
                    <span v-if="scope.row.tbgs_count==0">
                      {{scope.row.tbgs_count}}
                    </span>
                    <span v-if="scope.row.tbgs_count!=0" style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row)">
                      {{scope.row.tbgs_count}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column width="80" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleRecovery(scope.$index, scope.row)" type="success">还原</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination background layout="total,prev, pager, next" :total="recovery.total" @current-change="recoveryChangePage" :current-page="recovery.nowPage">
              </el-pagination>
            </div>
          </el-container>
        </div>
      </div>
      <!-- 图表列 -->
      <div class="charts">
        <!-- 单选分栏按钮 -->
        <el-radio-group v-model="botton_type" @change="changeType" style="margin:8px 0 10px 180px;">
          <el-radio-button label="投标"></el-radio-button>
          <el-radio-button label="中标"></el-radio-button>
        </el-radio-group>
        <!-- 图表搜索框 -->
        <div class="chartSearchCon">
          <!-- 投标图表搜索框 -->
          <el-form v-show="botton_type=='投标'" ref="tableForm" class="chartSearch">
            <div class="searchZD">
              <span class="zdName">投标个数</span>
              <el-input v-model="chart.search.tb_min_count" clearable size="mini" style="width:130px;" placeholder="请输入最低投标数" @keyup.enter.native="searchRight" @clear="searchRight"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="chart.search.tb_max_count" clearable size="mini" style="width:130px;" placeholder="请输入最高投标数" @keyup.enter.native="searchRight" @clear="searchRight"></el-input>
            </div>
            <div class="searchZD">
              <el-button size="mini" type="primary" @click="searchRight">搜索</el-button>
              <el-button style="width:67px" size="mini" @click="resetChartData">重置</el-button>
            </div>
          </el-form>
          <!-- 中标图表搜索框 -->
          <el-form v-show="botton_type=='中标'" ref="tableForm" class="chartSearch">
            <div class="searchZD">
              <span class="zdName">中标个数</span>
              <el-input v-model="chart.search.zb_min_count" clearable size="mini" style="width:130px;" placeholder="请输入最低中标数" @keyup.enter.native="searchRight" @clear="searchRight"></el-input>
              <span>&nbsp;-&nbsp;</span>
              <el-input v-model="chart.search.zb_max_count" clearable size="mini" style="width:130px;" placeholder="请输入最高中标数" @keyup.enter.native="searchRight" @clear="searchRight"></el-input>
            </div>
            <div class="searchZD">
              <el-button size="mini" type="primary" @click="searchRight">搜索</el-button>
              <el-button style="width:67px" size="mini" @click="resetChartData">重置</el-button>
            </div>
          </el-form>
        </div>
        <!-- 图表栏 -->
        <div style="width:500px;">

          <div>
            <!-- 投标 -->
            <el-container v-loading="right_loading" v-show="botton_type == '投标'">
              <div :style="{height:'780px',width:'500px'}" id="tb"></div>
            </el-container>
            <!-- 中标 -->
            <el-container v-loading="right_loading2" v-show="botton_type == '中标'">
              <div :style="{height:'780px',width:'500px'}" id="zb"></div>
            </el-container>
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
/* eslint-disable */

export default {
  data() {
    let oriToday = new Date();
    let todayYear = oriToday.getFullYear();
    let todayMonth = oriToday.getMonth() + 1;
    let todayDay = oriToday.getDate();
    let lastMonth = todayMonth - 1;
    if (todayMonth < 10) {
      todayMonth = "0" + todayMonth;
    }
    if (lastMonth < 10) {
      lastMonth = "0" + lastMonth;
    }
    let today = `${todayYear}-${todayMonth}-${todayDay}`;
    let last = `${todayYear}-${lastMonth}-${todayDay}`;
    return {
      ruleForm: {},
      rules: {
        num: [
          {
            type: "number", //要检验的类型（number，email，date等）
            message: "请输入数字",
            trigger: ["blur", "change"]
          },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      areaType: "",
      areaTypeList: [],
      typeLBList: [
        { name: "建筑工程", value: "建筑工程" },
        { name: "公路", value: "公路" },
        { name: "市政", value: "市政" },
        { name: "水利", value: "水利" },
        { name: "其他", value: "其他" }
      ],
      typeLXList: [
        { value: "施工招标", label: "施工招标" },
        { value: "代理招标", label: "代理招标" },
        { value: "监理招标", label: "监理招标" },
        { value: "勘察设计招标", label: "勘察设计招标" },
        { value: "造价招标", label: "造价招标" },
        { value: "采购招标", label: "采购招标" },
        { value: "其他招标", label: "其他招标" }
      ],
      area_list: [],
      left_loading: false,
      right_loading: false,
      right_loading2: false,
      botton_type: "投标",
      tableType: "已审核",
      table: {
        search: {
          zb_del: "",
          zb_undo: "",
          xmmc: "",
          xmlb: "",
          zblx: "",
          area: "",
          date: [last, today],
          min_date: last,
          max_date: today,
          min_money: "",
          max_money: "",
          min_zbxf: "",
          max_zbxf: "",
          min_zdxf: "",
          max_zdxf: "",
          min_average: "",
          max_average: "",
          min_effect: "",
          max_effect: "",
          min_count: "",
          max_count: ""
        },
        tableData: [],
        total: 0,
        loading: false,
        sort: "kbsj",
        order: "desc",
        fx_id: "",
        // area: "",
        nowPage: 1,
        page: 1
        // date: ""
      },
      recovery: {
        // search: {
        //   xmmc: "",
        //   xmlb: "",
        //   zblx: "",
        //   area: "",
        //   date: [last, today],
        //   min_date: last,
        //   max_date: today,
        //   min_money: "",
        //   max_money: "",
        //   min_zbxf: "",
        //   max_zbxf: "",
        //   min_zdxf: "",
        //   max_zdxf: "",
        //   min_average: "",
        //   max_average: "",
        //   min_effect: "",
        //   max_effect: "",
        //   min_count: "",
        //   max_count: ""
        // },
        tableData: [],
        total: 0,
        // page: 1,
        loading: false,
        sort: "kbsj",
        order: "desc",
        fx_id: "",
        // area: "",
        nowPage: 1,
        page: 1
        // date: ""
      },
      input: "",
      // ceshi: [],
      // winBidTitle: {
      //   start_time: "",
      //   end_time: ""
      // },
      checkSelections: [],
      delSelections: [],
      chart: {
        search: {
          tb_min_count: "",
          tb_max_count: "",
          zb_min_count: "",
          zb_max_count: ""
        },
        tbTotal: 0,
        zbTotal: 0
      },
      //投标
      tb_option: {
        title: {
          // textAlign: "center",
          left: "center",
          text: "市场行为分析",
          subtext: ""
        },
        tooltip: {},
        dataZoom: {
          type: "slider",
          show: true,
          zoomOnMouseWheel: false, //鼠标滚动缩放
          zoomLock: true,
          left: "94%",
          startValue: 0,
          endValue: 20,
          orient: "vertical",
          filterMode: "filter"
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          max: 100
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            // name: "中标数量",
            barWidth: 15,
            barCategoryGap: "10%",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          }
        ]
      },
      //中标
      zb_option: {
        title: {
          // textAlign: "left",
          left: "center",
          text: "市场行为分析",
          subtext: ""
        },
        tooltip: {},
        dataZoom: {
          type: "slider",
          show: true,
          zoomOnMouseWheel: false, //鼠标滚动缩放
          zoomLock: true,
          left: "94%",
          startValue: 0,
          endValue: 20,
          orient: "vertical",
          filterMode: "filter"
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          max: 100
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            // name: "中标数量",
            barWidth: 15,
            barCategoryGap: "10%",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          }
        ]
      },
      tb_all_list: [],
      zb_all_list: []
    };
  },
  mounted() {
    // this.changeType();
  },
  created() {
    document.title = "四川中标数据监控系统";
    this.getArea();
    this.getTableData("search");
    this.getTbData();
    // this.getZbData();
  },
  methods: {
    //请求主列表数据
    getTableData(type) {
      this.table.loading = true;
      this.recovery.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidMonitor",
        {
          fx_type: type,
          fx_id: this.table.fx_id,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count,
          page: this.table.page,
          rows: 10
        },
        data => {
          if (this.tableType == "已审核") {
            this.table.tableData = data.rows || [];
            this.table.total = data.total || 0;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
          } else if (data.status == "failed" && this.table.page > 1) {
            this.table.page -= 1;
            this.getTableData("search");
          } else {
            this.recovery.tableData = data.rows || [];
            this.recovery.total = data.total || 0;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
          }
          this.table.loading = false;
          // this.recovery.loading = false;
        }
      );
    },
    //请求回收站列表数据
    getTableData2() {
      this.table.loading = true;
      this.recovery.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidMonitor",
        {
          fx_type: "del",
          fx_id: this.table.fx_id,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count,
          page: this.recovery.page,
          rows: 10
        },
        data => {
          if (this.tableType == "已审核") {
            this.table.tableData = data.rows || [];
            this.table.total = data.total || 0;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
          } else if (data.status == "failed" && this.recovery.page > 1) {
            this.recovery.page -= 1;
            this.getTableData2();
          } else {
            this.recovery.tableData = data.rows || [];
            this.recovery.total = data.total || 0;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
          }
          // this.table.loading = false;
          this.recovery.loading = false;
        }
      );
    },
    //获取地区选项
    getArea() {
      this.axios.post(
        "/firm/Firm_Search/getAreaType",
        {
          type: "招中标",
          login_user_id: this.$store.state.userInfo.user_id
        },
        data => {
          this.areaTypeList = data;
        }
      );
    },
    // 中标日期选择
    dateChange(val) {
      if (val) {
        this.table.search.min_date = this.table.search.date[0];
        this.table.search.max_date = this.table.search.date[1];
      } else {
        this.table.search.min_date = "";
        this.table.search.max_date = "";
      }
      this.searchLeft();
    },
    // 主列表搜索
    searchLeft() {
      if (this.tableType == "回收站") {
        this.tableType = "已审核";
      }
      this.getTableData("search");
      // console.log(this.tableType)
      if (this.botton_type == "投标") {
        this.getTbData();
      } else {
        this.getZbData();
      }
    },
    //重置表格搜索
    resetTableData() {
      this.table.search.xmmc = "";
      this.table.search.xmlb = "";
      this.table.search.zblx = "";
      this.table.search.area = "";
      this.table.search.date = [];
      this.table.search.min_date = "";
      this.table.search.max_date = "";
      this.table.search.min_money = "";
      this.table.search.max_money = "";
      this.table.search.min_zbxf = "";
      this.table.search.max_zbxf = "";
      this.table.search.min_zdxf = "";
      this.table.search.max_zdxf = "";
      this.table.search.min_average = "";
      this.table.search.max_average = "";
      this.table.search.min_effect = "";
      this.table.search.max_effect = "";
      this.table.search.min_count = "";
      this.table.search.max_count = "";
      this.table.sort = "kbsj";
      this.table.order = "desc";
      this.table.page = 1;
      this.table.nowPage = 1;
      this.$refs.filterTable.clearSort();
      this.getTableData("search");
    },
    // 点击主表格项目名称
    handleClickProjectName(row) {
      // 跳转路由
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
          row.id
        }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
      });
      window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
    },
    //点击有效投标和总投标
    openMsg(row, type) {
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
      if (this.tableType == "已审核") {
        this.getTableData("check");
      } else {
        this.getTableData2();
      }
    },
    //主列表切换页数
    tableChangePage(val) {
      this.table.page = val;
      this.table.nowPage = val;
      this.getTableData("check");
    },
    //主列表批量选择
    tableSelChange(val) {
      this.checkSelections = val; //保存所选内容
    },
    //点击删除(回收)
    handleDelete(index, row, many) {
      // 批量操作
      if (many) {
        let ids = "";
        this.checkSelections.forEach((item, index) => {
          if (index === 0) {
            ids += item.id;
          } else {
            ids += "," + item.id;
          }
        });
        this.table.zb_del = ids;
      } else {
        this.table.zb_del = row.id;
      }
      this.table.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidMonitor",
        {
          fx_type: "check",
          fx_id: this.table.fx_id,
          zb_del: this.table.zb_del,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count,
          page: this.table.page,
          rows: 10
        },
        data => {
          this.table.tableData = data.rows || [];
          this.table.total = data.total || 0;
          this.table.fx_id = data.fx_id || "";
          this.table.date = data.date;
          if (data.status == "success") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
          this.table.loading = false;
        }
      );
    },
    // 切换表格
    tableChange(val) {
      if (val == "已审核") {
        this.getTableData("check");
      } else if (val == "回收站") {
        this.getTableData2();
      }
    },
    // 回收站切换页数
    recoveryChangePage(val) {
      this.recovery.page = val;
      this.recovery.nowPage = val;
      this.getTableData2();
    },
    //回收站批量选择
    recSelChange(val) {
      this.delSelections = val; //保存所选内容
    },
    // 点击还原
    handleRecovery(index, row, many) {
      // 批量操作
      if (many) {
        let ids = "";
        this.delSelections.forEach((item, index) => {
          if (index === 0) {
            ids += item.id;
          } else {
            ids += "," + item.id;
          }
        });
        this.table.zb_undo = ids;
      } else {
        this.table.zb_undo = row.id;
      }
      this.recovery.loading = true;
      this.axios.post(
        "/index/statistics_Bid/winBidMonitor",
        {
          fx_type: "del",
          fx_id: this.table.fx_id,
          zb_undo: this.table.zb_undo,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count,
          page: this.recovery.page,
          rows: 10
        },
        data => {
          if (data.status == "success") {
            this.recovery.tableData = data.rows;
            this.recovery.total = data.total;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
            this.$message({
              message: "已还原",
              type: "success"
            });
          } else if (data.status == "failed" && this.recovery.page > 1) {
            this.recovery.page -= 1;
            this.getTableData2();
            // console.log(this.recovery.page);
          } else {
            this.recovery.tableData = [];
            this.recovery.total = 0;
            this.table.fx_id = data.fx_id || "";
            this.table.date = data.date;
          }
          this.recovery.loading = false;
        }
      );
    },

    //获取投标图表数据
    getTbData() {
      this.right_loading = true;
      this.axios.post(
        "/index/statistics_Bid/behavior",
        {
          count_type: "投标",
          min_zbgs: this.chart.search.tb_min_count,
          max_zbgs: this.chart.search.tb_max_count,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count
        },
        data => {
          if (data.status == "success") {
            var gs_idArr = [];
            var nameArr = [];
            for (let i = data.rows.length - 1; i >= 0; i--) {
              gs_idArr.push(data.rows[i].value);
              nameArr.push(data.rows[i].name);
            }
            this.tb_all_list = data.rows;
            // data.rows.forEach(element => {
            //   gs_idArr.push(element.value)
            //   nameArr.push(element.name)
            // })
            // this.chart.tbTotal=data.total;
            this.tb_option.title.subtext = "总计" + data.total;
            this.tb_option.series[0].data = gs_idArr;
            this.tb_option.yAxis.data = nameArr;
            this.tb_option.dataZoom.startValue = data.total - 20;
            this.tb_option.dataZoom.endValue = data.total;
            if (data.rows[0].value > 4) {
              this.tb_option.xAxis.max = (data.rows[0].value - 1) * 1.5;
            } else {
              this.tb_option.xAxis.max = data.rows[0].value * 1.2;
            }
            this.loadChatTb();
          } else {
            this.tb_option.title.subtext = "总计" + "0";
            this.tb_option.series[0].data = [];
            this.tb_option.yAxis.data = [];
            this.loadChatTb();
          }
        }
      );
    },
    //获取中标图表数据
    getZbData() {
      this.right_loading2 = true;
      this.axios.post(
        "/index/statistics_Bid/behavior",
        {
          count_type: "中标",
          min_zbgs: this.chart.search.zb_min_count,
          max_zbgs: this.chart.search.zb_max_count,
          sort: this.table.sort,
          order: this.table.order,
          xmmc: this.table.search.xmmc,
          user_id: this.$store.state.userInfo.user_id,
          login_user_id: this.$store.state.userInfo.user_id,
          xmlb: this.table.search.xmlb,
          zblx: this.table.search.zblx,
          area: this.table.search.area,
          min_date: this.table.search.min_date,
          max_date: this.table.search.max_date,
          min_money: this.table.search.min_money,
          max_money: this.table.search.max_money,
          min_zbxf: this.table.search.min_zbxf,
          max_zbxf: this.table.search.max_zbxf,
          min_zdxf: this.table.search.min_zdxf,
          max_zdxf: this.table.search.max_zdxf,
          min_average: this.table.search.min_average,
          max_average: this.table.search.max_average,
          min_effect: this.table.search.min_effect,
          max_effect: this.table.search.max_effect,
          min_count: this.table.search.min_count,
          max_count: this.table.search.max_count
        },
        data => {
          if (data.status == "success") {
            var gs_idArr = [];
            var nameArr = [];
            // if (data.total > 3000) {
            //   for (let i = 100; i >= 0; i--) {
            //     gs_idArr.push(data.rows[i].value);
            //     nameArr.push(data.rows[i].name);
            //   }
            // } else {
            //   for (let i = data.rows.length - 1; i >= 0; i--) {
            //     gs_idArr.push(data.rows[i].value);
            //     nameArr.push(data.rows[i].name);
            //   }
            // }
            for (let i = data.rows.length - 1; i >= 0; i--) {
              gs_idArr.push(data.rows[i].value);
              nameArr.push(data.rows[i].name);
            }
            this.zb_all_list = data.rows;
            this.zb_option.title.subtext = "总计" + data.total;
            this.zb_option.series[0].data = gs_idArr;
            this.zb_option.yAxis.data = nameArr;
            this.zb_option.dataZoom.startValue = data.total - 20;
            this.zb_option.dataZoom.endValue = data.total;
            if (data.rows[0].value > 4) {
              this.zb_option.xAxis.max = (data.rows[0].value - 1) * 1.5;
            } else {
              this.zb_option.xAxis.max = data.rows[0].value * 1.2;
            }
            this.loadChatZb();
          } else {
            this.zb_option.title.subtext = "总计" + "0";
            this.zb_option.series[0].data = [];
            this.zb_option.yAxis.data = [];
            this.loadChatZb();
          }
        }
      );
    },
    // 加载图表投标&点击跳转
    loadChatTb() {
      var new_data = this.tb_all_list;
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("tb"));
      myChart.setOption(this.tb_option);
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
      this.right_loading = false;
    },
    // 加载图表中标&点击跳转
    loadChatZb() {
      // console.log(222);
      // var myChart2 = this.$echarts.init(document.getElementById("zb"));
      // myChart2.setOption(this.zb_option);
      var new_data = this.zb_all_list;
      var that = this;
      var myChart = this.$echarts.init(document.getElementById("zb"));
      myChart.setOption(this.zb_option);
      this.right_loading2 = false;
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
    // 图表搜索
    searchRight() {
      if (this.botton_type == "投标") {
        this.getTbData();
        // this.loadChatTb();
      } else {
        this.getZbData();
        // this.loadChatZb();
      }
    },
    // 重置图表搜索
    resetChartData() {
      this.chart.search.tb_min_count = "";
      this.chart.search.tb_max_count = "";
      this.chart.search.zb_min_count = "";
      this.chart.search.zb_max_count = "";
      if (this.botton_type == "投标") {
        this.getTbData();
        // this.loadChatTb();
      } else {
        this.getZbData();
        // this.loadChatZb();
      }
    },
    //改变图表类型
    changeType() {
      // console.log(this.botton_type)
      if (this.botton_type == "投标") {
        this.getTbData();
        // this.loadChatTb();
      } else {
        this.getZbData();
        // this.loadChatZb();
      }
    }
  },
  watch: {
    "table.search.min_money": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_money=oldV
        }
      }
    },
    "table.search.max_money": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_money=oldV
        }
      }
    },
    "table.search.min_zbxf": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_zbxf =oldV
        }
      }
    },
    "table.search.max_zbxf": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_zbxf=oldV
        }
      }
    },
    "table.search.min_zdxf": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_zdxf=oldV
        }
      }
    },
    "table.search.max_zdxf": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_zdxf=oldV
        }
      }
    },
    "table.search.min_average": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_average=oldV
        }
      }
    },
    "table.search.max_average": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_average=oldV
        }
      }
    },
    "table.search.min_effect": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_effect=oldV
        }
      }
    },
    "table.search.max_effect": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_effect=oldV
        }
      }
    },
    "table.search.min_count": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.min_count=oldV
        }
      }
    },
    "table.search.max_count": {
      handler: function(newV, oldV) {
        if (!/^(0|[1-9]\d*)\b/.test(newV)&&newV!=""){
          this.$message.warning("请输入数字");
          this.table.search.max_count=oldV
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  // flex-wrap: wrap;
}
.table {
  width: 1400px;
}
.tableSearchRow {
  display: flex;
  align-items: center;
}
.searchZD {
  margin-top: 10px;
  margin-left: 13px;
  display: flex;
  align-items: center;
  span {
    line-height: 28px;
  }
  .zdName {
    margin-right: 8px;
    font-size: 14px;
  }
}
.tableChangeRow {
  margin: 0 20px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tableData {
  width: 1400px;
  padding: 0 20px;
  .xfIcon {
    width: 13px;
    height: 13px;
    position: relative;
    top: 2px;
  }
}

.charts {
  width: 500px;
}
.chartSearch {
  width: 500px;
  margin-left: 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .searchZD {
    margin-left: 0;
    .zdName {
      margin-right: 7px;
      font-size: 14px;
    }
  }
}
</style>

