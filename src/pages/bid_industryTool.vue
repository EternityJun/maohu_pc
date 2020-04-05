<template>
  <div id="bid_industryTool">
    <el-row style="margin-bottom:20px">
      <el-col :span="24">
        <h1>{{xmmc}}</h1>
        <p class="little_title">{{little_title}}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <bid-jbxx :jbxxId="jbxx_id"></bid-jbxx>
      </el-col>
      <el-col :span="15" :offset="1">
        <div v-show="zb_tb_show">
          <el-form
            :inline="true"
            :model="form_zbtb"
            class="demo-form-inline"
            style="text-align:right"
            @submit.native.prevent
          >
            <el-form-item label="公司名称">
              <el-input v-model="form_zbtb.gsmc" placeholder="公司名称"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="form_zbtb.num" placeholder="数量"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="companyRangeByXmyz()">确认</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="zbtb.data"
            style="width: 100%"
            border
            @sort-change="fn_sortable"
            v-loading="loading"
          >
            <el-table-column label="序号" header-align="center" align="center" width="80">
              <template slot-scope="scope">{{scope.$index+(zbtb.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="company" label="公司名称" align="center"></el-table-column>
            <el-table-column prop="num" label="数量" width="180" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="address" label="细节" align="center"></el-table-column>
            <el-table-column prop="address" label="添加" align="center"></el-table-column>
          </el-table>
        </div>
        <div v-show="xf_show">
          <el-table :data="xf_data.rows" style="width: 100%" border v-loading="loading">
            <el-table-column label="序号" header-align="center" align="center" width="80">
              <template slot-scope="scope">{{scope.$index+(xf_data.page-1)*10+1}}</template>
            </el-table-column>
            <el-table-column prop="xmmc" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="sub" label="下浮" width="180" align="center"></el-table-column>
          </el-table>
        </div>
        <div v-show="dq_show">
          <el-row>
            <el-col :span="24">
              <span style="visibility:hidden">1</span>
              <div style="position:absolute;left:3%;">
                <el-button
                  type="primary"
                  icon="el-icon-d-arrow-left"
                  @click="checkTableButton('left')"
                ></el-button>
              </div>
              <div style="position:absolute;right:3%;">
                <el-button
                  type="primary"
                  icon="el-icon-d-arrow-right"
                  @click="checkTableButton('right')"
                ></el-button>
              </div>
              <div
                :style="{width:'800px',height:'664px',position:'absolute',top:'81px',left:'637px',zIndex:'9',display:tableIndex==1?'block':'none'}"
                @click="checkTable(2)"
              ></div>
              <div
                :style="{width:'1000px',height:'664px',position:'absolute',top:'81px',left:'0',zIndex:'9',display:tableIndex!=1?'block':'none'}"
                @click="checkTable(1)"
              ></div>
              <div :style="tableStyleL" @click="checkTable(1)">
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==1?'center':'left',fontSize:'20px',color:'#67C23a'}"
                >
                  工具生成集合&nbsp;
                  <i class="el-icon-success"></i>
                </p>
                <el-table :data="gj_gs.data" v-loading="loading" border @sort-change="fn_sortable">
                  <el-table-column label="序号" header-align="center" align="center" width="100">
                    <template slot-scope="scope">{{scope.$index+(gj_gs.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="company" label="企业名称" min-width="40%" align="center">
                    <template slot-scope="scope">
                      <el-button
                        @click="open_gs(scope.row)"
                        type="text"
                        :style="{'color':scope.row.color ? 'red' : ''}"
                      >{{scope.row.company}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="count"
                    label="数量"
                    width="200"
                    align="center"
                    sortable="custom"
                  ></el-table-column>
                </el-table>
                <el-pagination
                  align="right"
                  style="margin-top:10px"
                  @current-change="changePage"
                  background
                  layout="total,prev, pager, next"
                  :total="gj_gs.total"
                ></el-pagination>
              </div>
              <div :style="tableStyleC" @click="checkTable(2)">
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==2?'center':'left',fontSize:'20px',color:'#67C23a'}"
                >
                  已拿到公司&nbsp;
                  <i class="el-icon-success"></i>
                </p>
                <el-table :data="tableDataFirst.rows" v-loading="loading" border>
                  <el-table-column label="序号" header-align="center" align="center" width="80">
                    <template slot-scope="scope">{{scope.$index+(tableDataFirst.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                    <template slot-scope="scope">
                      <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sort" label="企业排名" width="200" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.sort ? scope.row.sort : '0'}}名</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="80" label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" @click="auditing(scope.row)" type="primary">未审核</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  align="right"
                  style="margin-top:10px"
                  @current-change="changePage"
                  background
                  layout="total,prev, pager, next"
                  :total="totalL"
                ></el-pagination>
              </div>
              <div :style="tableStyleR" @click="checkTable(3)">
                <p
                  :style="{marginBottom:'20px',width:'100%',textAlign:tableIndex==3?'center':'right',fontSize:'20px',color:'#f56c6c'}"
                >
                  未拿到公司
                  <i class="el-icon-error"></i>
                </p>
                <el-table :data="noTableDataFirst.rows" v-loading="loading" border>
                  <el-table-column label="序号" header-align="center" align="center" width="80">
                    <template slot-scope="scope">{{scope.$index+(noTableDataFirst.page-1)*10+1}}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="企业名称" min-width="40%" align="center">
                    <template slot-scope="scope">
                      <el-button @click="open_gs(scope.row)" type="text">{{scope.row.gsmc}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sort" label="企业排名" width="200" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.sort ? scope.row.sort : '0'}}名</span>
                    </template>
                  </el-table-column>
                  <el-table-column width="80" label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="small" @click="auditing(scope.row)" type="primary">审核</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  align="right"
                  style="margin-top:10px"
                  @current-change="changePage"
                  background
                  layout="total,prev, pager, next"
                  :total="totalR"
                ></el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-card class="box-card" id="fzfx_card">
          <div slot="header" class="clearfix">
            <span>辅助分析工具</span>
          </div>
          <div class="box">
            <p class="title">业主项目</p>
            <p @click="switchYz(1,'业主项目——中标单位的次数排序')">中标单位的次数排序</p>
            <p @click="switchYz(2,'业主项目——投标单位的次数排序')">投标单位的次数排序</p>
            <p @click="switchYz('','业主项目——中标价的下浮区间集中区')">中标价的下浮区间集中区</p>
          </div>
          <div class="box">
            <p class="title">
              类似项目
              <span class="set_tj" @click="set_tj">设置条件</span>
            </p>
            <p @click="switchXm(1,'类似项目——中标单位的次数排序')">中标单位的次数排序</p>
            <p @click="switchXm(2,'类似项目——投标单位的次数排序')">投标单位的次数排序</p>
            <p @click="switchXm('','类似项目——中标价的下浮区间集中区')">中标价的下浮区间集中区</p>
          </div>
          <div class="box">
            <p class="title">地区</p>
            <p @click="switchDq('地区——在该地区参与项目频次的排序')">在该地区参与项目频次的排序</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="条件设置" :visible.sync="yjCondition.dialogVisible" width="60%">
      <bid-yj-condition v-on:onYjCondition="onYjCondition"></bid-yj-condition>
    </el-dialog>
  </div>
</template>

<script>
import bidJbxx from './template/bid_jbxx.vue'
import bidYjCondition from './template/bid_yj_condition.vue'

export default {
  data () {
    return {
      jbxx_id: '',
      ls_key: 1,
      tab: 1,
      little_title: '业主项目——中标单位的次数排序',
      yz_xm_type: 1,
      xmmc: '',
      xmyz: '',
      area: '',
      thread_id: '',
      zb_tb_show: true,
      xf_show: false,
      dq_show: false,
      form_zbtb: {
        gsmc: '',
        num: ''
      },
      zbtb: {
        data: [],
        total: 0,
        page: 1
      },
      xf_data: {
        rows: [],
        page: 1
      },
      yjCondition: {
        dialogVisible: false,
        is_set: false,
        xmCondition: {
          table: []
        }
      },
      formYsh: {
        type: 1,
        page: 1
      },
      formWsh: {
        type: 0,
        page: 1
      },
      yz: {
        order: '',
        ordername: ''
      },
      ls: {
        order: '',
        ordername: ''
      },
      gj_gs: {
        // 工具生成集合
        page: 1,
        data: [],
        total: 0,
        order: '',
        ordername: ''
      },
      tableDataFirst: {
        rows: [],
        total: 0,
        page: 1
      },
      noTableDataFirst: {
        page: 1,
        total: 0,
        rows: []
      },
      loading: false,
      totalL: 0,
      totalR: 0,
      // 公司切换
      tableIndex: 1,
      tableStyleL:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);min-height:810px;position:absolute;width:80%;z-index:10;',
      tableStyleC:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(20%) scale(0.89);min-height:810px;position:absolute;width:80%;z-index:9;',

      tableStyleR:
        'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);min-height:810px;position:absolute;width:80%;z-index:8;',
      role: {}
    }
  },
  created () {
    this.xmmc = this.$route.query.xmmc
    document.title = '行业工具：' + this.$route.query.xmmc
  },
  mounted () {
    this.xmyz =
      this.$route.query.xmyzdw == 'null' ? '' : this.$route.query.xmyzdw
    this.area =
      this.$route.query.area == 'null' ? '' : this.$route.query.area
    this.thread_id = this.$route.query.thread_id
    this.jbxx_id = this.$route.query.jbxx_id
    this.companyRangeByXmyz(this.yz_xm_type)
    this.fn_role()
  },
  components: {
    bidJbxx,
    bidYjCondition
  },
  methods: {
    // 权限控制 点击公司名称时
    fn_role () {
      let self = this
      self.axios.post(
        '/index/mine/role',
        {
          user_id: this.$store.state.userInfo.user_id,
          company_id: localStorage.getItem('company_id')
        },
        data => {
          this.role = data
        }
      )
    },
    // 已审核 未审核
    auditing (row) {
      let gs_id = ''
      gs_id = row.gs_id
      let params = {
        id: this.thread_id, // 点击的节点的id
        gs_id: gs_id,
        type: this.tableIndex == 2 ? 1 : 0 // 1:已审核到未审核
      }
      this.axios.post('/index/thread/Auditing', params, data => {
        this.audited()
      })
    },
    fn_sortable (param) {
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      if (this.tab == 1) {
        this.yz = {
          order: order,
          ordername: param.prop
        }
        this.companyRangeByXmyz()
      } else if (this.tab == 2) {
        this.yz = {
          order: order,
          ordername: param.prop
        }
        this.sameProjectCompanyRange()
      } else if (this.tab == 3) {
        // 工具数量
        this.gj_gs.order = order
        this.gj_gs.ordername = param.prop
        this.bidArea()
      }
    },
    open_gs (row) {
      let gsmc = row.gsmc ? row.gsmc : row.company
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${gsmc}`
        })
        window.open(href, '公司详情' + row.gs_id)
      } else {
        this.axios.post('/index/mine/roleCompSource', { gs_id: row.gs_id }, res => {
          // 获取跳转页面结果
          //   console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_scjst' + row.gs_id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?gs_id=${row.gs_id}`
            })
            window.open(href, '/gs_building' + row.gs_id)
          }
        })
      }
    },
    // 改变页面
    changePage (val) {
      if (this.tableIndex == 1) {
        this.gj_gs.page = val
      } else if (this.tableIndex == 2) {
        this.tableDataFirst.page = val
      } else {
        this.noTableDataFirst.page = val
      }
      this.fn_audited()
    },
    // 按钮无限切换切换
    checkTableButton (type) {
      if (type == 'left') {
        if (this.tableIndex == 1) {
          this.checkTable(3)
        } else {
          this.checkTable(this.tableIndex - 1)
        }
      } else {
        if (this.tableIndex == 3) {
          this.checkTable(1)
        } else {
          this.checkTable(this.tableIndex + 1)
        }
      }
    },
    // 切换表格
    checkTable (type) {
      this.tableIndex = type
      if (type == 1) {
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(33%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleC =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(20%) scale(0.89);position:absolute;width:80%;z-index:9;min-height:810px;transition: .3s;'
      } else if (type == 2) {
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(28%) scale(0.89);position:absolute;width:80%;z-index:9;min-height:810px;transition: .3s;'
        this.tableStyleC =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;transition: .3s;'
      } else {
        // 3
        this.tableStyleL =
          'box-shadow:0px 0px 5px #e0e0e0 inset;background-color:#fff;padding:10px;transform: translateX(-10%) scale(0.8);position:absolute;width:80%;z-index:8;min-height:810px;transition: .3s;'
        this.tableStyleR =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(11%) scale(1);position:absolute;width:80%;z-index:10;min-height:810px;transition: .3s;'
        this.tableStyleC =
          'box-shadow:0px 0px 5px #e0e0e0;background-color:#fff;padding:10px;transform: translateX(0%) scale(0.89);position:absolute;width:80%;z-index:9;min-height:810px;transition: .3s;'
      }
      this.fn_audited()
    },
    bidArea () {
      let params = {
        id: this.thread_id,
        area: this.area,
        page: this.gj_gs.page,
        order: this.gj_gs.order,
        ordername: this.gj_gs.ordername
      }
      this.axios.post('/index/others/bidArea', params, data => {
        this.loading = false
        if (data.status == 'success') {
          this.gj_gs.data = data.rows
          this.gj_gs.total = data.total
        } else {
          this.gj_gs.data = []
          this.gj_gs.total = 0
        }
      })
    },
    fn_audited () {
      this.loading = true
      if (this.tableIndex == 1) {
        this.bidArea()
      } else {
        this.audited()
      }
    },
    audited () {
      let params = {
        id: this.thread_id,
        area: this.area
      }
      if (this.tableIndex == 2) {
        // 已审核
        params.type = this.formYsh.type
        params.page = this.tableDataFirst.page
      } else {
        // 未审核
        params.type = this.formWsh.type
        params.page = this.noTableDataFirst.page
      }
      this.axios.post('/index/others/audited', params, data => {
        this.loading = false
        if (data.status == 'success') {
          if (params.type == 1) {
            this.tableDataFirst.rows = data.rows
            this.totalL = data.total
          } else {
            this.noTableDataFirst.rows = data.rows
            this.totalR = data.total
          }
        } else {
          if (params.type == 1) {
            this.tableDataFirst.rows = []
            this.totalL = 0
          } else {
            this.noTableDataFirst.rows = []
            this.totalR = 0
          }
        }
      })
    },
    saveYj () {
      let params = {
        type: '2',
        table: ['zbgs_jbxxs_his'],
        condition: this.yjCondition.xmCondition.condition,
        minMoney: this.yjCondition.xmCondition.minMoney,
        maxMoney: this.yjCondition.xmCondition.maxMoney,
        minZbgsTime: this.yjCondition.xmCondition.minZbgsTime,
        maxZbgsTime: this.yjCondition.xmCondition.maxZbgsTime
      }
      this.axios.post('/index/Search_yj/saveYj', params, data => {
        if (data.status == 'success') {
          this.yjCondition.id = data.message
          this.yjCondition.dialogVisible = false
          this.yjCondition.set_tj = true
          // if(this.zb_tb_show){
          this.sameProjectCompanyRange(this.ls_key)
          // }else{
          this.sameProjectBidDown()
          // }
        } else {
          this.$message.error('保存失败,请稍后重试！')
        }
      })
    },
    set_tj () {
      this.yjCondition.dialogVisible = true
      if (this.dq_show) {
        this.zb_tb_show = true
        this.dq_show = false
      }
    },
    onYjCondition (data) {
      if (data != 'cancel') {
        this.yjCondition.xmCondition = data
        this.saveYj()
      } else {
        this.yjCondition.dialogVisible = false
      }
    },
    companyRangeByXmyz (type) {
      let params = {
        xmyz: this.xmyz,
        thread_id: this.thread_id,
        type: this.yz_xm_type,
        gsmc: this.form_zbtb.gsmc,
        num: this.form_zbtb.gsmc,
        order: this.yz.order,
        ordername: this.yz.ordername
      }
      this.loading = true
      this.axios.post(
        '/index/Analysis_report/companyRangeByXmyz',
        params,
        data => {
          this.loading = false
          if (data.status == 'success') {
            this.zbtb.data = data.rows
            this.zbtb.total = data.total
          } else {
            this.zbtb.data = []
            this.zbtb.total = 0
          }
        }
      )
    },
    bidDownByXmyz () {
      let params = {
        xmyz: '南部县人民医院'
      }
      this.loading = true
      this.axios.post(
        '/index/Analysis_report/bidDownByXmyz',
        params,
        data => {
          this.loading = false
          if (data.status == 'success') {
            this.xf_data.rows = data.rows
            this.xf_data.total = data.total
          } else {
            this.xf_data.rows = []
            this.xf_data.total = 0
          }
        }
      )
    },
    sameProjectCompanyRange (key) {
      let params = {
        type: key,
        thread_id: this.thread_id,
        id: this.yjCondition.id,
        jbxx_id: this.jbxx_id,
        order: this.ls.order,
        ordername: this.ls.ordername
      }
      this.loading = true
      this.axios.post(
        '/index/Analysis_report/sameProjectCompanyRange',
        params,
        data => {
          this.loading = false
          if (data.status == 'success') {
            this.zbtb = data.rows
          }
        }
      )
    },
    sameProjectBidDown () {
      let params = {
        table: ['zbgs_jbxxs_his'],
        condition: this.yjCondition.xmCondition.condition,
        minMoney: this.yjCondition.xmCondition.minMoney,
        maxMoney: this.yjCondition.xmCondition.maxMoney,
        minZbgsTime: this.yjCondition.xmCondition.minZbgsTime,
        maxZbgsTime: this.yjCondition.xmCondition.maxZbgsTime,
        id: this.yjCondition.id,
        jbxx_id: this.jbxx_id
      }
      this.loading = true
      this.axios.post(
        '/index/Analysis_report/sameProjectBidDown',
        params,
        data => {
          this.loading = false
          if (data.status == 'success') {
            this.xf_data.rows = data.rows
            this.xf_data.total = data.total
          } else {
            this.xf_data.rows = []
            this.xf_data.total = 0
          }
        }
      )
    },
    switchYz (key, name) {
      this.yz_xm_type = key
      this.little_title = name
      this.tab = '1'
      if (!key) {
        this.bidDownByXmyz()
        this.xf_show = true
        this.zb_tb_show = false
        this.dq_show = false
      } else {
        this.companyRangeByXmyz(key)
        this.xf_show = false
        this.zb_tb_show = true
        this.dq_show = false
      }
    },
    switchDq (name) {
      this.tab = '3'
      this.xf_show = false
      this.zb_tb_show = false
      this.dq_show = true
      this.little_title = name
      this.tableIndex = 1
      this.fn_audited()
    },
    switchXm (key, name) {
      this.ls_key = key
      this.tab = '2'
      this.little_title = name
      if (!this.yjCondition.set_tj) {
        this.yjCondition.dialogVisible = true
        // return;
      }
      if (!key) {
        this.sameProjectBidDown()
        this.xf_show = true
        this.zb_tb_show = false
        this.dq_show = false
      } else {
        this.sameProjectCompanyRange(key)
        this.xf_show = false
        this.zb_tb_show = true
        this.dq_show = false
      }
    }
  }
}
</script>
<style>
#bid_industryTool .el-card__header {
  padding: 7px 20px;
}
#fzfx_card .el-card__body {
  padding-top: 5px;
}
</style>

<style lang="less" scoped>
#bid_industryTool {
  padding: 20px;
  h1 {
    text-align: center;
  }
  .little_title {
    text-align: center;
    padding: 10px 0;
    color: #409eff;
  }
  .box-card {
    .box {
      font-size: 13px;
      margin: 7px 0;
      p {
        color: #409eff;
        padding: 5px 0;
        cursor: pointer;
      }
      .title {
        color: #e6a23c;
        margin-top: 20px;
        position: relative;
        .set_tj {
          position: absolute;
          right: 0;
          color: #409eff;
        }
      }
    }
  }
}
</style>
