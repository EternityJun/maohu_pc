<template>
    <div id="gs_building">
        <header>
            <div>
                <span class="gsmc">{{gsmc}}</span>
                <!-- <span class="info">更新时间：{{updateTime}}</span> -->
            </div>
        </header>
        <div class="build-jbxx">
            <tableinfo :tableData="jbxx"></tableinfo>
        </div>
        <headNav v-bind:data="headNav" @switchNav="switchNav"></headNav>
        <div class="container">
            <transition name="slide-fade">
                <div class="jbxx pos_top" v-show="tab=='企业资质资格' || tab==''">
                    <template>
                        <el-table :data="zzzg.tableData" style="width: 100%" border :span-method="arraySpanMethod">
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(zzzg.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="zzlb" label="资质类别" align="center">
                            </el-table-column>
                            <el-table-column prop="zzzsh" label="资质证书号" align="center">
                            </el-table-column>
                            <el-table-column prop="zzmc" label="资质名称" align="center">
                            </el-table-column>
                            <el-table-column prop="fzrq" label="发证日期" align="center">
                            </el-table-column>
                            <el-table-column prop="zsyxq" label="证书有效期" align="center">
                            </el-table-column>
                            <el-table-column prop="fzjg" label="发证机关" align="center">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="zcry pos_top" v-show="tab=='注册人员'">
                    <el-row class="zcry_head">
                        <div class="total" @click="switch_zcry('全部')">
                            <span :class="zcry.zjlx=='全部' ? 'active' : ''">全部
                                <a class="num">({{zcry.all_type.total}}本) </a>:</span>
                        </div>
                        <ul>
                            <li v-for="(item,index) in zcry.all_type.data" :key="index" :class="zcry.zjlx==item.rylb ? 'active' :''" @click="switch_zcry(item.rylb)">
                                {{item.rylb}}
                                <span class="num">({{item.counts}}本)</span>
                            </li>
                        </ul>
                    </el-row>
                    <el-form :inline="true" :model="zcry.form" class="demo-form-inline zcry-form" @submit.native.prevent>
                        <el-form-item label="人员名称">
                            <el-input v-model="zcry.form.name" placeholder="人员名称" @keyup.enter.native="onSubmitRy"></el-input>
                        </el-form-item>
                        <el-form-item label="证书编号">
                            <el-input v-model="zcry.form.zsbh" placeholder="证书编号" @keyup.enter.native="onSubmitRy"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmitRy">搜索</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <template>
                        <el-table :data="zcry.tableData" style="width: 100%" border v-loading="loading">
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(zcry.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="xm" label="姓名" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="go_ry(scope.row)">{{scope.row.xm}}</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sfzh" label="身份证号" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="zclb" label="注册类别" align="center">
                            </el-table-column>
                            <el-table-column prop="zch" label="注册号(执业印章号)" align="center">
                            </el-table-column>
                            <el-table-column prop="zczy" label="注册专业" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="zcry.page" background layout="total,prev, pager, next" :total="zcry.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="gcyj pos_top" v-show="tab=='工程业绩'">
                    <el-form :inline="true" :model="gcyj.form" class="demo-form-inline" @submit.native.prevent>
                        <el-form-item label="项目名称" style="width:398px">
                            <el-input v-model="gcyj.form.xmmc" placeholder="项目名称" style="width:328px" @keyup.enter.native="onSubmitYj"></el-input>
                        </el-form-item>
                        <el-form-item label="资金范围" style="width:383px">
                            <el-row class="flex">
                                <div>
                                    <el-input v-model="gcyj.form.min_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                                        <el-button style="width:65px" slot="append">万元</el-button>
                                    </el-input>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-input v-model="gcyj.form.max_money" placeholder="金额" style="width:150px" @keyup.enter.native="onSubmitYj">
                                        <el-button style="width:65px" slot="append">万元</el-button>
                                    </el-input>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="开工日期" style="width:380px">
                            <el-row class="flex">
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.min_date_kg" style="width: 149px;"></el-date-picker>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.max_date_kg" style="width: 148px  ;"></el-date-picker>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="竣工日期" style="width:398px">
                            <el-row class="flex">
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.min_date_jg" style="width: 156px;"></el-date-picker>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.max_date_jg" style="width: 157px  ;"></el-date-picker>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="从业人员" style="width:383px">
                            <el-input v-model="gcyj.form.cyry" placeholder="从业人员" style="width:315px" @keyup.enter.native="onSubmitYj"></el-input>
                        </el-form-item>
                        <el-form-item label="中标日期" style="width:380px">
                            <el-row class="flex">
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.min_date_zb" style="width: 149px;"></el-date-picker>
                                </div>
                                <div class="newline">-</div>
                                <div>
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="年/月/日" v-model="gcyj.form.max_date_zb" style="width: 148px  ;"></el-date-picker>
                                </div>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="项目类型" style="width:398px">
                            <el-select v-model="gcyj.form.xmlx" placeholder="选择项目类型" style="width:330px" clearable>
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="房屋建筑工程" value="房屋建筑工程"></el-option>
                                <el-option label="市政工程" value="市政工程"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目属地" style="width:385px">
                            <el-select v-model="gcyj.form.area" placeholder="选择项目属地" style="width:315px" clearable>
                                <el-option v-for="item in province" :key="item.label" :label="item.label" :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="btns">
                            <el-button type="primary" @click="onSubmitYj">搜索</el-button>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <template>
                        <el-table :data="gcyj.tableData" style="width: 100%" border v-loading="loading">
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(gcyj.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="xmbm" label="项目编码" align="center">
                            </el-table-column>
                            <el-table-column prop="xmmc" label="项目名称" align="center" width="300">
                                <template slot-scope="scope">
                                    <span @click="go_xm(scope.row)" class="xmmc">{{scope.row.xmmc}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="xmsd" label="项目归属" align="center">
                            </el-table-column>
                            <el-table-column prop="xmlb" label="项目类别" align="center" width="150">
                            </el-table-column>
                            <el-table-column prop="jsdw" label="建设单位" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="gcyj.page" background layout="total,prev, pager, next" :total="gcyj.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="bad pos_top" v-show="tab=='不良行为'">
                    <template>
                        <el-table :data="bad.tableData" style="width: 100%" border>
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(bad.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="cxjlbh" label="诚信记录编号" align="center">
                            </el-table-column>
                            <el-table-column prop="cxjlzt" label="诚信记录主体" align="center">
                            </el-table-column>
                            <el-table-column prop="jdnr" label="决定内容" align="center">
                            </el-table-column>
                            <el-table-column prop="ssbm" label="实施部门(文号)" align="center">
                            </el-table-column>
                            <el-table-column prop="fbyxq" label="发布有效期" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="bad.page" background layout="total,prev, pager, next" :total="bad.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="good pos_top" v-show="tab=='良好行为'">
                    <template>
                        <el-table :data="good.tableData" style="width: 100%;" border>
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(good.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="诚信记录编号" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="诚信记录主体" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="决定内容" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="实施部门(文号)" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="发布有效期" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="good.page" background layout="total,prev, pager, next" :total="good.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="blacklist pos_top" v-show="tab=='黑名单记录'">
                    <template>
                        <el-table :data="blacklist.tableData" style="width: 100%;" border>
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(blacklist.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="hmdjlzt" label="黑名单记录主体" align="center">
                            </el-table-column>
                            <el-table-column prop="hmdrdyj" label="黑名单认定依据" align="center">
                            </el-table-column>
                            <el-table-column prop="rdbm" label="认定部门" align="center">
                            </el-table-column>
                            <el-table-column prop="lrhmdrq" label="列入黑名单日期" align="center">
                            </el-table-column>
                            <el-table-column prop="ychmdrq" label="移出黑名单日期" align="center">
                            </el-table-column>
                        </el-table>
                        <el-pagination align="right" @current-change="changePage" :current-page.sync="blacklist.page" background layout="total,prev, pager, next" :total="blacklist.total" class="pagination"></el-pagination>
                    </template>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="changeRecord pos_top" v-show="tab=='变更记录'">
                    <template>
                        <el-table :data="changeRecord.tableData" style="width: 100%;" border>
                            <el-table-column type="index" width="60" label="序号" align="center">
                                <template slot-scope="scope">
                                    {{scope.$index+(changeRecord.page-1)*10+1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="变更日期" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="变更内容" align="center">
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </transition>
        </div>
        <back-to-top></back-to-top>
    </div>
</template>

<script>
import gs_jz from '../assets/gs_jz.png'
import headNav from './template/head_nav'
import tableinfo from './template/tableInfo'
import tableMerge from '../tableMrege/index'
import backToTop from './template/backToTop'

export default {
  data() {
    return {
      loading: true,
      gsmc: '',
      updateTime: '',
      gs_id: this.$route.query.gs_id,
      source: '全国建筑市场',
      tab: '企业资质资格',
      province: [],
      merge_array: [],
      headNav: {
        gsmc: '中国五治集团有限公司1',
        updateTime: '2018-12-29 12:23:09',
        nav: [
          { text: '企业资质资格', num: 0 },
          { text: '注册人员', num: 0 },
          { text: '工程业绩', num: 0 },
          { text: '不良行为', num: 0 },
          { text: '良好行为', num: 0 },
          { text: '黑名单记录', num: 0 },
          { text: '变更记录', num: 0 }
        ],
        source: {
          name: '全国建筑市场',
          link: 'www.baidu.com',
          img: gs_jz
        }
      },
      jbxx: {
        col: '',
        rows: []
      },
      zzzg: {
        tableData: [],
        total: 0,
        page: 1
      },
      zcry: {
        page: 1,
        rows: 10,
        total: 23,
        zjlx: '全部',
        form: {
          name: '',
          zsbh: ''
        },
        all_type: {
          total: 0,
          data: []
        },
        tableData: []
      },
      bad: {
        tableData: [],
        total: 0,
        page: 1
      },
      good: {
        tableData: [],
        total: 0,
        page: 1
      },
      gcyj: {
        form: {
          xmmc: '',
          min_money: '',
          max_money: '',
          min_date_kg: '',
          max_date_kg: '',
          min_date_jg: '',
          max_date_jg: '',
          min_date_zb: '',
          max_date_zb: '',
          cyry: '',
          xmlx: '',
          area: ''
        },
        tableData: [],
        page: 1,
        total: 0
      },
      blacklist: {
        tableData: [],
        total: 0,
        page: 1
      },
      changeRecord: {
        tableData: [],
        total: 0,
        page: 1
      }
    }
  },
  components: {
    headNav,
    tableinfo,
    backToTop
  },
  created() {
    this.getComBase()
    this.getProvince()
  },
  watch: {
    $route: function(newVal) {
      window.location.reload()
    }
  },
  mounted() {},
  methods: {
    go_ry(row) {
      let { href } = this.$router.resolve({
        path: `/ryDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&gs_id=${this.gs_id}&name=${
          row.xm
        }&source=jzsc&staff_base_id=${
          row.staff_base_id ? row.staff_base_id : ''
        }`
      })
      window.open(href, '人员详情' + this.gs_id + row.xm)
    },
    go_xm(row) {
      let { href } = this.$router.resolve({
        path: `/yjDet?login_service_id=${this.$route.query.login_service_id}&qymc=${this.$route.query.qymc}&proj_id=${row.xmbm}&source=jzsc`
      })
      window.open(href, '业绩详情' + row.xmmc + row.xmbm + 'jzsc')
    },
    getProvince() {
      let self = this
      this.axios.post('/firm/Firm_detail/getProvince', {}, data => {
        self.province = data.rows
      })
    },
    switchNav(tab) {
      let self = this
      self.tab = tab
      if (tab == '注册人员' || tab == '工程业绩') {
        self.reset()
      } else if (tab == '不良行为') {
        this.bad.page = 1
        this.firmCredit('不良行为')
      } else if (tab == '良好行为') {
        this.good.page = 1
        this.firmCredit('良好行为')
      } else if (tab == '黑名单记录') {
        this.blacklist.page = 1
        this.firmCredit('黑名单记录')
      }
    },
    openFullScreen() {
      this.loading = true
    },
    closeFullScreen() {
      this.loading = false
    },
    changePage: function(val) {
      let tab = this.tab
      switch (tab) {
        case '注册人员':
          this.zcry.page = val
          this.firmStaff()
          break
        case '工程业绩':
          this.gcyj.page = val
          this.firmProj()
          break
        case '不良行为':
          this.bad.page = val
          this.firmCredit('不良行为')
          break
        case '良好行为':
          this.good.page = val
          this.firmCredit('良好行为')
          break
        case '黑名单记录':
          this.blacklist.page = val
          this.firmCredit('黑名单记录')
          break
      }
    },
    onSubmitYj: function() {
      this.gcyj.page = 1
      this.firmProj()
    },
    onSubmitRy: function() {
      this.zcry.zjlx = '全部'
      this.zcry.page = 1
      this.firmStaff()
    },
    reset: function() {
      let tab = this.tab
      switch (tab) {
        case '注册人员':
          this.zcry.zjlx = '全部'
          this.zcry.form.name = ''
          this.zcry.form.zsbh = ''
          this.zcry.page = 1
          this.firmStaff()
          break
        case '工程业绩':
          this.gcyj.form.xmmc = ''
          this.gcyj.form.min_money = ''
          this.gcyj.form.max_money = ''
          this.gcyj.form.min_date_kg = ''
          this.gcyj.form.max_date_kg = ''
          this.gcyj.form.min_date_jg = ''
          this.gcyj.form.max_date_jg = ''
          this.gcyj.form.min_date_zb = ''
          this.gcyj.form.max_date_zb = ''
          this.gcyj.form.cyry = ''
          this.gcyj.form.xmlx = ''
          this.gcyj.form.area = ''
          this.gcyj.page = 1
          this.firmProj()
          break
      }
    },
    switch_zcry: function(name) {
      this.zcry.zjlx = name
      this.zcry.form.name = ''
      this.zcry.form.zsbh = ''
      this.zcry.page = 1
      this.firmStaff()
    },
    getComBase: function() {
      //基本信息
      let self = this
      let params = {
        gs_id: self.gs_id,
        source: self.source
      }
      this.axios.post('/firm/Firm_detail/getCompBase', params, data => {
        if (data.status == 'success') {
          let rows = data.rows
          self.gsmc = rows.qymc
          self.updateTime = rows.modified
          self.headNav.source.link = rows.source_link
          self.headNav.source.name = rows.source
          self.comp_id = rows.comp_id
          self.firmBasic({
            comp_id: rows.comp_id,
            source: self.source
          })
          self.getStaffCate()
          self.getCompCate()
          document.title = '全 | ' + self.gsmc
        }
      })
    },
    firmBasic: function(params) {
      let self = this
      this.axios.post('/firm/Firm_detail/firmBasic', params, data => {
        if (data.status == 'success') {
          let rows = data.rows.comp_jbxx
          let comp_zz = data.rows.comp_zz
          let tableData = {
            col: 2,
            rows: rows
          }
          self.jbxx = tableData
          self.zzzg.tableData = comp_zz
          self.merge_array = tableMerge.tableMrege(comp_zz)
        }
      })
    },
    firmStaff: function() {
      let self = this
      let params = {
        gs_id: this.gs_id,
        comp_id: self.comp_id,
        source: self.source,
        zjlx: self.zcry.zjlx == '全部' ? '' : self.zcry.zjlx,
        rymc: self.zcry.form.name,
        zsbh: self.zcry.form.zsbh,
        page: self.zcry.page,
        rows: self.zcry.rows
      }
      self.openFullScreen()
      this.axios.post('/firm/Firm_detail/firmStaff', params, data => {
        if (data.status == 'success') {
          self.zcry.tableData = data.rows
          self.zcry.total = data.total
        } else {
          self.zcry.tableData = []
          self.zcry.total = 0
        }
        self.closeFullScreen()
      })
    },
    getStaffCate: function() {
      let self = this
      let params = {
        comp_id: self.comp_id,
        source: self.source
      }
      this.axios.post('/firm/Firm_detail/getStaffCate', params, data => {
        if (data.status == 'success') {
          let pass1 = data.rows.filter(function(element) {
            return element.rylb == '全部'
          })
          let pass2 = data.rows.filter(function(element) {
            return element.rylb != '全部'
          })
          self.zcry.all_type.total = pass1[0].counts
          self.zcry.all_type.data = pass2
        }
      })
    },
    firmCredit(cate) {
      //良好 信用
      let self = this
      let page
      if (cate == '不良行为') {
        page = self.bad.page
      } else if (cate == '良好行为') {
        page = self.good.page
      } else if (cate == '黑名单记录') {
        page = self.blacklist.page
      }
      let params = {
        page: page,
        comp_id: self.comp_id,
        source: self.source,
        cate: cate
      }
      this.axios.post('/firm/Firm_detail/firmCredit', params, data => {
        if (data.status == 'success') {
          if (params.cate == '不良行为') {
            self.bad.tableData = data.rows
            self.bad.total = data.total
          } else if (params.cate == '良好行为') {
            self.good.tableData = data.rows
            self.good.total = data.total
          } else if (params.cate == '黑名单记录') {
            self.blacklist.tableData = data.rows
            self.blacklist.total = data.total
          }
        }
      })
    },
    getCompCate() {
      let self = this
      let params = {
        comp_id: self.comp_id,
        source: self.source
      }
      this.axios.post('/firm/Firm_detail/getCompCate', params, data => {
        if (data.status == 'success') {
          self.headNav.nav = data.rows
        }
      })
    },
    // 业绩
    firmProj() {
      let self = this
      let form = self.gcyj.form
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
        minZbrq: form.min_date_zb,
        maxZbrq: form.max_date_zb,
        rymc: form.cyry,
        xmlx: form.xmlx == '全部' ? '' : form.xmlx,
        xmsd: form.area == '全部' ? '' : form.area,
        page: self.gcyj.page,
        rows: 10
      }
      self.openFullScreen()
      this.axios.post('/firm/Firm_detail/firmProj', params, data => {
        if (data.status == 'success') {
          self.gcyj.tableData = data.rows
          self.gcyj.total = data.total
        } else {
          self.gcyj.tableData = []
          self.gcyj.total = 0
        }
        self.closeFullScreen()
      })
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      let prop = column.property
      if (prop) {
        //如果存在prop
        const _row = this.merge_array[rowIndex][prop]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
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
.cursor {
  cursor: pointer;
}
.xmmc {
  color: @active-color;
  cursor: pointer;
}
#gs_building {
  padding-bottom: 30px;
  .input {
    width: 200px;
  }
  .normalForm {
    float: right;
  }
  .pagination {
    margin-top: 20px;
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
  .build-jbxx {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .pos_top {
      // position: absolute;
      // top: 0;
      width: 100%;
      margin-bottom: 20px;
    }
    .flex {
      display: flex;
    }
    .newline {
      width: 15px;
      text-align: center;
    }
    .btns {
      margin-left: 43%;
      width: 165px;
    }
    .zcry {
      .zcry_head {
        display: flex;
        margin-bottom: 20px;
        .active {
          color: white;
          border-radius: 3px;
          background-color: #348bda;
          .num {
            color: white;
          }
        }
        .num {
          color: #348bda;
        }
        .total {
          cursor: pointer;
          margin-right: 10px;
          span {
            width: 100%;
            text-align: center;
            display: inline-block;
            height: 28px;
            line-height: 28px;
            padding: 0 5px;
            font-size: 14px;
          }
        }
        ul {
          margin-left: 10px;
          flex: 1;
        }
        li {
          cursor: pointer;
          list-style: none;
          float: left;
          padding: 4px 5px;
          font-size: 14px;
          margin-bottom: 5px;
          margin-right: 7px;
        }
        li:hover {
          color: white;
          border-radius: 4px;
          background-color: #348bda;
          .num {
            color: white;
          }
        }
      }
      .zcry-form {
        position: absolute;
        right: 0;
      }
      .el-table {
        margin-top: 70px;
      }
    }
  }
}
</style>

