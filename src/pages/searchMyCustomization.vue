<template>
  <!-- 招标公告搜索 -->
  <div id="searchMyCustomization">
    <header v-show="currentRoute=='/searchZbgg'">
      <p class="title">招标公告</p>
    </header>
    <div :class="['content' , currentRoute=='/searchZbgg' ? 'content_' : '']">
      <!-- <zbgg :options="zbgg_options" @onSearch="onSearch" @updateDate='updateDate' class="searchBox"></zbgg> -->
      <el-form ref="form" :model="form" label-width="70px" @submit.native.prevent size="middle" class="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目名称">
              <el-input v-model="form.xmmc" placeholder="请输入招标项目名称关键词 例：水库、河道" clearable @keyup.enter.native="onSubmit(true)"></el-input>
              <!-- <el-autocomplete style="width:100%" v-model="form.xmmc" :fetch-suggestions="querySearchAsyncXmmc" placeholder="请输入关键词 例：水库、河道(回车添加)" @select="handleSelectXmmc" @keyup.enter.native="addTag('xmmc')"></el-autocomplete> -->
            </el-form-item>
            <!-- <el-row>
              <el-col :offset="3" :span="21">
                <el-tag style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmmcs" :key="tag" closable @close="onDelete_yjTag(index,'xmmcs')">{{tag}}</el-tag>
              </el-col>
            </el-row> -->
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="项目业主" label-width="100px">
              <el-input v-model="form.xmyz" placeholder="请输入项目业主关键词 例：城投、水务局" clearable @keyup.enter.native="onSubmit(true)"></el-input>
              <!-- <el-autocomplete style="width:100%" v-model="form.xmyz" :fetch-suggestions="querySearchAsyncXmyz" placeholder="请输入关键词 例：城投、水务局(回车添加)" @select="handleSelectXmyz" @keyup.enter.native="addTag('xmyz')"></el-autocomplete> -->
            </el-form-item>
            <!-- <el-row>
              <el-col :offset="5" :span="19">
                <el-tag style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmyzs" :key="tag" closable @close="onDelete_yjTag(index,'xmyzs')">{{tag}}</el-tag>
              </el-col>
            </el-row> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="交易类型">
              <div>
                <el-select v-model="form.jylx" multiple placeholder="请选择交易类型" style="width:100%;" @change="changeJylx" collapse-tags>
                  <el-option v-for="item in jylxs" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-row>
                  <el-col :span="3">
                    <span style="color:#606266">工程建设：</span>
                  </el-col>
                  <el-col :span="21">
                    <span @click="add_jylx('jylx_gcjs',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_gcjs" :label="item.label" :key="i">{{item.label}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="3">
                    <span style="color:#606266">政府采购：</span>
                  </el-col>
                  <el-col :span="21">
                    <span @click="add_jylx('jylx_zfcg',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_zfcg" :label="item.label" :key="i">{{item.label}}</span>
                  </el-col>
                </el-row> -->
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-row>
              <el-col :span="19">
                <el-form-item label="所在地区" label-width="100px">
                  <el-cascader style="width:100%" @change="changeArea" v-model="form.area" v-loading="areaLoading" :options="provinceCity" :props="props" clearable :collapse-tags='collapseTags'></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-button type="primary" size="middle" @click="openMap">地图选择</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit(true)">搜索</el-button>
          <el-button @click="onSubmit(false)">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="8">
          <div>
            <el-radio-group v-model="form_date.dateRadio" @change="changeDateRadio">
              <el-radio-button :label="item" v-for="(item,i) in dateRadios" :key='i'></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <el-date-picker v-model="form_date.min_date" type="date" class="dateInput" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsStartzbrqMin" @change="changeDate" @focus='focusDate'>
            </el-date-picker>
            <span>-</span>
            <el-date-picker v-model="form_date.max_date" type="date" class="dateInput" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptionsEndzbrqMax" @change="changeDate" @focus='focusDate'>
            </el-date-picker>
            <span class="tips">(可自选三年{{recentlyDate.indexOf(form_date.dateRadio)==-1 ? '前' : '内'}}的日期)</span>
          </div>
        </el-col>
        <el-col :span="2" v-show="currentRoute=='/searchZbgg'">
          <div>
            <el-button type="primary" style="margin-left:30px" @click="fnChangeAreaArr(form.area,'selectToMap','saveDz')">定制</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="list">
        <el-row style="margin-top:20px">
          <el-col :span="24">
            <div>
              <el-table :data="tableData" style="width: 100%" border v-loading='loading'>
                <el-table-column label="序号" width="60" align="center">
                  <template slot-scope="scope">
                    {{(page-1)*10+scope.$index+1}}
                  </template>
                </el-table-column>
                <el-table-column prop="bt" label="项目名称" align="center">
                  <template slot-scope="scope">
                    <span class="link_text" @click="openXm(scope.row)">{{scope.row.bt}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="xmyz" label="项目业主" width="180" align="center">
                </el-table-column>
                <el-table-column prop="jylx" label="交易类型" width="120" align="center">
                </el-table-column>
                <el-table-column prop="area" label="项目地区" width="150" align="center">
                </el-table-column>
                <el-table-column prop="fbsj" label="日期" align="center" width="120">
                </el-table-column>
                <el-table-column label="导入" width="100" align="center" v-if="isShowImport">
                  <template slot-scope="scope">
                    <el-button disabled v-if="scope.row.import == 1" style="color:#d1d1d1" size="mini">{{scope.row.is_import}}</el-button>
                    <el-button v-else title="点击导入" size="mini" @click="onClick_import(scope)" type="primary">导入</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-pagination background layout="total,prev, pager, next" :total="total" @current-change="tableChangePage" :current-page.sync="page">
              </el-pagination> -->
              <p class="allTotal" v-if="allTotal>0">共计找到符合条件的记录数：
                <span>{{allTotal}}</span> 条,请输入更多信息进行查询</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <back-to-top></back-to-top>
    <div v-if="mapDialogVisable">
      <el-dialog top="10px" title="地区选择（只能选择一个省份）" :visible.sync="mapDialogVisable" width="97%" class="dialogVisibleResult" :close-on-click-modal="close_on_click_modal">
        <province-city-district-map @onAddMap='onAddMap' :provinceCity='provinceCity' :selectedArea='changeAreaArr'></province-city-district-map>
      </el-dialog>
    </div>
  </div>

</template>

<script>
// import zbgg from './template/myCustomizationSearch1' //招标公告搜索框
import { getPassFormatDate, getDate } from '../store/formatter.js'
import backToTop from './template/backToTop'
import provinceCityDistrictMap from './template/provinceCityDistrictMap' //地图选择框
//搜索：项目名称+地区必填
export default {
  props: ['addXmData'], //添加项目页传下的数据
  components: {
    // zbgg,
    backToTop,
    provinceCityDistrictMap
  },
  data() {
    return {
      pickerOptionsStartzbrqMin: {
        disabledDate: time => {
          let endDateVal = this.form_date.max_date
          if (endDateVal) {
            if (this.recentlyDate.indexOf(this.form_date.dateRadio) > -1) {
              //近三年 min在三年内
              return (
                time.getTime() <
                new Date(getPassFormatDate(3, 'year')).getTime() -
                  0 * 24 * 60 * 60 * 1000
              )
            } else {
              return time.getTime() > new Date(endDateVal).getTime()
            }
          }
        }
      },
      pickerOptionsEndzbrqMax: {
        disabledDate: time => {
          let beginDateVal = this.form_date.min_date
          if (this.recentlyDate.indexOf(this.form_date.dateRadio) == -1) {
            return (
              time.getTime() >
              new Date(getPassFormatDate(3, 'year')).getTime() -
                0 * 24 * 60 * 60 * 1000
            )
          }
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      addXmPage: ['/qyZtbPage', '/qyfwqPage'],
      noneProvince: ['台湾省', '香港特别行政区', '澳门特别行政区'],
      provinceCity: [],
      collapseTags: true,
      mapDialogVisable: false,
      close_on_click_modal: false,
      props: { multiple: true },
      dateRadios: ['近一月', '近一年', '近三年', '三年前'],
      recentlyDate: ['近一月', '近一年', '近三年'],
      changeAreaArr: [],
      areas: [],
      area_pc: [],
      form: {
        xmmc: '',
        xmmcs: [],
        xmyz: '',
        xmyzs: [],
        jylx: [],
        jylx_gcjs: [
          { label: '施工', status: false },
          { label: '代理', status: false },
          { label: '监理', status: false },
          { label: '勘察设计', status: false },
          { label: '造价', status: false },
          { label: '其他招标', status: false }
        ],
        jylx_zfcg: [{ label: '政府采购', status: false }],
        area: []
      },
      oldOptions: ['全部'], //用来存储上一次的值
      jylxs: [],
      form_date: {
        dateRadio: '近一月',
        min_date: '',
        max_date: ''
      },
      loading: false,
      tableData: [],
      total: 0,
      allTotal: 0,
      page: 1,
      edit_id: '',
      gcjs: [],
      zfcg: [],
      currentRoute: '',
      isShowImport:false,
      areaLoading:false
    }
  },
  created() {
    console.log('created')
    // this.getZbCondition()
    this.form.area = []
    this.fn_cate()
    // localStorage.setItem('searchZbgg',null)
    let data = localStorage.getItem('searchZbgg')
    this.form.xmmc = JSON.parse(data).xmmcs[0]
    // this.form = JSON.parse(data)
    // this.areas = this.form.area
    this.setFormatDate()
    this.getJylx()
    this.judgeRoute()
  },
  watch: {
    $route: function() {
      console.log('watch')
      let data = localStorage.getItem('searchZbgg')
      // this.form = JSON.parse(data)
      this.form.xmmc = JSON.parse(data).xmmcs[0]
      this.form.area = []
      // this.checkArea()
      this.getZbCondition()
      this.setFormatDate()
      this.getJylx()
      this.judgeRoute()
    }
  },
  methods: {
    // 判断是哪个页面引用该组件
    judgeRoute() {
      let route = this.$route.path
      this.currentRoute = this.$route.path
      if(this.addXmPage.indexOf(this.currentRoute)==-1){
        this.isShowImport=false
      }else{
        this.isShowImport=true
      }
      console.log(this.addXmPage.indexOf(this.currentRoute))
    },
    // 导入
    onClick_import(data) {
      data.row.cs = `四川省/${data.row.cs}`
      let types = this.types
      let obj = {
        zbxx_id: data.row.id,
        user_id: this.$store.state.userInfo.user_id,
        area: data.row.cs,
        fbsj: data.row.fbsj,
        bm_jzrq: data.row.jzrq,
        tb_jzrq: data.row.tb_jzrq,
        xmyz: data.row.xmyz,
        xmmc: data.row.bt,
        type: 'import',
        company_id: localStorage.getItem('company_id'),
        username: localStorage.getItem('username'),
        gsmc: localStorage.getItem('qymc'),
        gs_id: localStorage.getItem('gs_id'),
        xmlx: data.row.xmlx
      }
      // this.proNotOnline.newObj = obj
      this.axios.post(
        '/index/project/projectSave',
        {
          jbxx_id: '',
          service_id: this.addXmData.service_id,
          company_id: obj.company_id,
          user_id: this.$store.state.userInfo.user_id,
          xmmc: obj.xmmc,
          area: obj.area,
          zbxx_id: obj.zbxx_id,
          fbsj: obj.fbsj,
          tb_jzrq: obj.tb_jzrq,
          bm_jzrq: obj.bm_jzrq,
          xmyz: data.row.xmyz
        },
        data => {
          if (data.status == 'success') {
            this.$message.success('导入成功')
          } else {
            this.$message.error(data.message)
          }
          this.getTableData()
        }
      )
    },
    // 请求交易类型
    getJylx() {
      this.axios.post('/index/Tendering/getJylx', {}, data => {
        // let gcjs=data.gcjs,zfcg=data.zfcg
        // gcjs.forEach(v=>{
        //   v.status=false
        // })
        // zfcg.forEach(v=>{
        //   v.status=false
        // })
        // this.form.jylx_gcjs=gcjs
        // this.form.jylx_zfcg=zfcg
        // this.gcjs=JSON.parse(JSON.stringify(this.form.jylx_gcjs))
        // this.zfcg=JSON.parse(JSON.stringify(this.form.jylx_zfcg))

        this.jylxs = data
        this.jylxs[0].value = '全部'
      })
    },
    changeJylx(val) {
      // console.log(val)
      let allValues = []
      //保留所有值
      for (let item of this.jylxs) {
        allValues.push(item.value)
      }
      // 用来储存上一次的值，可以进行对比
      // console.log(this.oldOptions)
      const oldVal = this.oldOptions.length === 1 ? [] : this.oldOptions[1]
      // console.log('old' + JSON.stringify(oldVal))
      // console.log('new'+JSON.stringify(val))
      // 若是全部选择
      if (val.includes('全部')) this.form.jylx = allValues

      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes('全部') && !val.includes('全部')) this.form.jylx = []

      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('全部') && val.includes('全部')) {
        const index = val.indexOf('全部')
        val.splice(index, 1) // 排除全选选项
        this.form.jylx = val
      }

      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('全部') && !val.includes('全部')) {
        if (val.length === allValues.length - 1)
          this.form.jylx = ['全部'].concat(val)
      }
      //储存当前最后的结果 作为下次的老数据
      this.oldOptions[1] = this.form.jylx
      let jylx = JSON.parse(JSON.stringify(this.form.jylx))
    },
    displayDz() {
      //定制清单
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        page: 1,
        rows: 100
      }
      this.axios.post('/index/Tendering/dzList', params, data => {
        this.loading = false
        let rows = data.rows || []
        if (rows.length > 0) {
          this.edit_id = rows[0].id
        }
      })
    },
    handleSelectXmmc(item) {
      this.addTag('xmmc')
    },
    querySearchAsyncXmmc(word, cb) {
      if (word !== '') {
        let params = {
          word,
          type: 'xmmc',
          area_type:
            this.form.area.length > 0
              ? this.form.area[0][0] == '四川省' ? '四川' : '全国'
              : ''
        }
        this.axios.post('/index/Tendering/keyGuide', params, data => {
          let rows = data.rows || []
          let cbData = []
          rows.forEach(e => {
            cbData.push({ value: e })
          })
          cb(cbData)
        })
      }
    },
    handleSelectXmyz(item) {
      this.addTag('xmyz')
    },
    querySearchAsyncXmyz(word, cb) {
      if (word !== '') {
        let params = {
          word,
          type: 'xmyz',
          area_type: this.form.area[0][0] == '四川省' ? '四川' : '全国'
        }
        this.axios.post('/index/Tendering/keyGuide', params, data => {
          let rows = data.rows || []
          let cbData = []
          rows.forEach(e => {
            cbData.push({ value: e })
          })
          cb(cbData)
        })
      }
    },

    onSubmit(type) {
      if (type) {
        // console.log(this.form.area)
        this.fnChangeAreaArr(this.form.area, 'selectToMap')
      } else {
        this.form = {
          xmmc: '',
          xmmcs: [],
          xmyz: '',
          xmyzs: [],
          jylx_gcjs: this.gcjs,
          jylx_zfcg: this.zfcg,
          area: []
        }
      }
    },
    // 获取招标定制条件
    getZbCondition() {
      let param = {
        user_id: this.$store.state.userInfo.user_id
      }
      if (this.addXmData) {
        param.login_service_id = this.addXmData.service_id
      }
      if (this.addXmPage.indexOf(this.currentRoute) > -1) {
        param.cate = '已上网'
      }
      this.axios.post('/index/Tendering/zbCondition', param, data => {
        if (data.status == 'success') {
          if (data.rows.area.length > 0) {
            this.changeAreaArr = data.rows.area
            this.fnChangeAreaArr(data.rows.area, 'mapToSelect', '')
          }
          if (data.rows.jylx) {
            this.form.jylx = data.rows.jylx.split(',')
            if (this.form.jylx.length == this.jylxs.length - 1) {
              this.form.jylx.unshift('全部')
            }
            this.oldOptions[1] = this.form.jylx
            // this.form.jylx_gcjs.forEach(v => {
            //   if (data.rows.jylx.indexOf(v.value) > -1) {
            //     v.status = true
            //   } else {
            //     v.status = false
            //   }
            // })
            // this.form.jylx_zfcg.forEach(v => {
            //   if (data.rows.jylx.indexOf(v.value) > -1) {
            //     v.status = true
            //   } else {
            //     v.status = false
            //   }
            // })
          } else if (data.rows.area.length == 0 && !data.rows.jylx) {
            // console.log(3)
            // this.fn_cate()
            this.formatArea()
          }
        } else {
          // this.fn_cate()
          this.formatArea()
        }
      })
    },
    formatArea() {
      if (this.form.area.length == 0) {
        let province = localStorage.getItem('local_province')
        let city = localStorage.getItem('local_city')
        let local = []
        let item = {
          province: {
            name: province,
            status: 1,
            index: 0
          },
          city: [{ name: city, status: 1, index: 0, local: [] }]
        }
        this.provinceCity.forEach((e, i) => {
          if (e.label == province) {
            item.province.index = i
            if (e.children) {
              e.children.forEach((el, ii) => {
                if (el.label == city) {
                  item.city[0].index = ii
                  el.children.forEach((ele, iii) => {
                    item.city[0].local.push(ele.label)
                  })
                }
              })
            }
          }
        })
        this.form.area = [item]
        // console.log(this.form.area)
        this.fnChangeAreaArr(this.form.area, 'mapToSelect', '')
      } else {
        this.fnChangeAreaArr(this.form.area, 'selectToMap', '')
      }
    },
    // 保存用户在定制搜索时的最新条件--交易类型、地区
    saveDZCondition(params) {
      let param = params
      if (this.addXmPage.indexOf(this.currentRoute) > -1) {
        param.cate = '已上网'
        param.login_service_id = this.addXmData.service_id
      }
      this.axios.post('/index/Tendering/saveDZCondition', param, data => {})
    },
    handleSaveDz(type, edit_id) {
      let jylx = this.form.jylx_gcjs.concat(this.form.jylx_zfcg)
      let jylxs = []
      jylx.forEach(ele => {
        if (ele.status) {
          jylxs.push(ele.label)
        }
      })
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.form.xmmc,
        xmyz: this.form.xmyz,
        area_type:
          this.changeAreaArr[0].province.name == '四川省' ? '四川' : '全国',
        area: this.changeAreaArr, //包含
        area_pc: this.area_pc, //分散
        jylx: jylxs.join(','),
        id: edit_id,
        type: type ////type 添加1 编辑2 删除3
      }

      this.loading_saveDz = true
      this.axios.post('/index/Tendering/saveDz', params, data => {
        this.loading_saveDz = false
        if (data.status == 'success') {
          this.saveDZCondition(params)
          this.$confirm('定制成功，请在首页招标定制中查看', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'success'
          })
            .then(() => {})
            .catch(() => {})
        } else {
          this.$confirm('保存失败！' + data.message, '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
        }
      })
    },
    saveDz() {
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        page: 1,
        rows: 100
      }
      this.axios.post('/index/Tendering/dzList', params, data => {
        let rows = data.rows || []
        if (rows.length > 0) {
          this.edit_id = rows[0].id
        } else {
          this.edit_id = ''
        }
        if (this.edit_id) {
          this.$confirm('已有定制,是否覆盖之前的定制？', '提示', {
            confirmButtonText: '覆盖',
            type: 'warning'
          })
            .then(() => {
              this.handleSaveDz(2, this.edit_id)
            })
            .catch(() => {
              return
            })
        } else {
          this.handleSaveDz(1, '')
        }
      })

      // console.log(this.edit_id)
    },
    add_jylx(type, row) {
      this.form[type].map(v => {
        if (v.label == row.label) {
          v.status = !row.status
        }
      })
    },
    addTag(type) {
      let key = this.form[type]
      let keys = this.form[type + 's']
      if (key.length == 1 || key.length > 10) {
        this.$message.error('关键字控制在2~10个字之内')
        return
      }
      if (!key) return
      let num = 10
      if (type == 'xmyz') {
        num = 5
      }
      if (keys.length >= num) {
        this.$message.error(`关键词总数控制在${num}个以内`)
        return
      }
      var filterArray = keys.filter((v, i) => {
        if (v == key) {
          return v
        }
      })
      if (filterArray.length) {
        this.$message({
          showClose: true,
          message: '已经存在该关键词',
          type: 'error'
        })
      } else {
        keys.push(key)
        key = ''
      }
      this.form[type] = key
      this.form[type + 's'] = keys
    },
    // 删除对应的业绩标签
    onDelete_yjTag(index, type) {
      this.form[type] = this.form[type].filter((v, i) => {
        if (i != index) {
          return v
        }
      })
    },
    onAddMap(obj) {
      // console.log('地图返回的数据')
      // console.log(JSON.stringify(obj))
      this.mapDialogVisable = false
      this.fnChangeAreaArr(obj, 'mapToSelect')
    },
    openMap() {
      // console.log(this.form.area)
      if (this.form.area.length == 0) {
        this.mapDialogVisable = true
        this.changeAreaArr = []
      } else {
        this.fnChangeAreaArr(this.form.area, 'selectToMap', 'map')
      }
    },
    openXm(item) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?zbgs_id=&zbxx_id=${item.id}&source=${
          item.type
        }&type=zbxx&xmmc=${item.bt}`
      })
      window.open(href, '招标公告' + item.id + item.bt)
    },
    focusDate() {
      // this.form_date.dateRadio = ''
      let dateRadio = this.form_date.dateRadio
      if (this.recentlyDate.indexOf(dateRadio) > -1) {
        //近三年 最小值为三年
        if (this.form_date.min_date < getPassFormatDate(3, 'year')) {
          //不在三年前
          this.form_date.min_date = getPassFormatDate(3, 'year')
          this.getTableData()
        }
      } else {
        //三年前
        if (this.form_date.max_date > getPassFormatDate(3, 'year')) {
          //不在三年前
          this.form_date.max_date = getPassFormatDate(3, 'year')
          this.getTableData()
        }
      }
    },
    changeDate() {
      // this.form_date.dateRadio = ''
      this.getTableData()
    },
    setFormatDate() {
      let min_date = '',
        max_date = getDate('new')
      if (this.form_date.dateRadio == '近一月') {
        min_date = getPassFormatDate(1, 'month')
      } else if (this.form_date.dateRadio == '近一年') {
        min_date = getPassFormatDate(1, 'year')
      } else if (this.form_date.dateRadio == '近三年') {
        min_date = getPassFormatDate(3, 'year')
      } else if (this.form_date.dateRadio == '三年前') {
        max_date = getPassFormatDate(3, 'year')
      }
      this.form_date.min_date = min_date
      this.form_date.max_date = max_date
    },
    changeDateRadio() {
      this.setFormatDate()
      this.fnChangeAreaArr(this.form.area, 'selectToMap', '')
      // this.getTableData()
    },
    updateDate(obj) {
      this.form = obj
      this.checkArea()
    },
    changeArea(value) {
      //只能选择一个省
      let val = []
      if (this.areas.length == 0) {
        val = value
      } else {
        let allPro = 0
        let pro = this.areas[0][0]
        value.forEach(e => {
          if (pro == e[0]) {
            allPro++
          }
        })
        if (allPro == value.length) {
          //选的同一个省
          val = value
        } else {
          let pass = value.filter(e => {
            if (e[0] != pro) {
              return e
            }
          })
          val = pass
        }
      }
      this.areas = val
      this.form.area = val
      // this.fnChangeAreaArr(this.form.area, 'selectToMap')
    },
    fnChangeAreaArr(area, type, from) {
      // console.log(JSON.stringify(area), type, from)
      if (area.length == 0) {
        this.$confirm('请选择所在地区', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
        return false
      }
      // localStorage.setItem('searchZbgg', JSON.stringify(this.form))

      let newArea = area
      if (type == 'selectToMap') {
        let form = JSON.parse(JSON.stringify(this.form))
        let area = form.area,
          formatArea = [],
          data1 = [],
          provinceCity = this.provinceCity
        for (let i = 0; i < area.length; i++) {
          let item = { province: '' }
          for (let i2 = 0; i2 < area[i].length; i2++) {
            item.province = area[i][0]
            item.province_status =
              this.noneProvince.indexOf(area[i][0]) == -1 ? 0 : 1
            for (let i3 = 0; i3 < provinceCity.length; i3++) {
              let count = 0
              if (provinceCity[i3].label == area[i][0]) {
                //省
                item.province_index = i3
                if (this.noneProvince.indexOf(area[i][0]) == -1) {
                  let count2 = 0
                  for (
                    let i4 = 0;
                    i4 < provinceCity[i3].children.length;
                    i4++
                  ) {
                    if (provinceCity[i3].children[i4].label == area[i][1]) {
                      item.city_index = i4
                    }
                  }
                }
              }
            }

            if (this.noneProvince.indexOf(area[i][0]) == -1) {
              //不是台湾 香港 澳门
              item.city = area[i][1]
              item.local = area[i][2]
            }
          }
          formatArea.push(item)
        }
        let count = 0
        provinceCity.forEach(e => {
          if (e.label == formatArea[0].province) {
            if (e.children) {
              e.children.forEach(el => {
                // count++
                if (el.children) {
                  el.children.forEach(ele => {
                    count++
                  })
                }
              })
            }
          }
        })
        // console.log(formatArea.length,count)
        if (formatArea.length == count) {
          formatArea.map(v => {
            v.province_status = 1
          })
        }
        let cities = [],
          nums = []

        formatArea.forEach(e => {
          if (cities.indexOf(e.city) == -1) {
            cities.push(e.city)
          }
        })
        let item = {}
        formatArea.forEach(e => {
          if (item[e.city]) {
            item[e.city] += 1
          } else {
            item[e.city] = 1
          }
        })
        provinceCity.forEach(e => {
          if (e.label == formatArea[0].province) {
            if (e.children) {
              e.children.forEach(el => {
                formatArea.map(v => {
                  if (el.label == v.city) {
                    if (el.children) {
                      if (el.children.length == item[v.city]) {
                        v.city_status = 1
                      } else {
                        v.city_status = 0
                      }
                    } else {
                      v.city_status = 1
                      v.local = []
                    }
                  }
                })
              })
            }
          }
        })
        newArea = formatArea
        this.area_pc = newArea
      }
      //  console.log(newArea)
      // return
      // console.log(JSON.stringify(newArea))
      this.axios.post(
        '/index/Tendering/changeArea',
        { area: newArea, type },
        data => {
          if (type == 'selectToMap') {
            this.changeAreaArr = data.save //包含数组
            if (from == 'saveDz') {
              this.saveDz()
            } else if (from == 'map') {
              this.mapDialogVisable = true
              // console.log(this.changeAreaArr)
            } else {
              this.getTableData()
            }
          } else {
            //地图转换为下拉
            console.log('地图转换为下拉')
            this.changeAreaArr = data.save //包含数组
            let area = data.display
            let arr = []
            area.forEach(e => {
              let item = [e.province]
              if (e.city) {
                item.push(e.city)
              }
              if (e.local) {
                item.push(e.local)
              }
              arr.push(item)
            })
            this.areas = arr
            this.form.area = arr
            // this.fn_cate()
            this.getTableData()
          }
        }
      )
    },
    fn_cate() {
      this.areaLoading=true
      this.axios.post('/index/common/getProvinceCityDistrict', {}, data => {
        this.provinceCity = data
        this.areaLoading=false
        // alert(1)
        // console.log('地图长度：' + this.form.area.length)
        this.getZbCondition()
        //  if (this.form.area.length == 0) {
        //   let province = localStorage.getItem('local_province')
        //   let city = localStorage.getItem('local_city')
        //   let local = []
        //   let item = {
        //     province: {
        //       name: province,
        //       status: 1,
        //       index: 0
        //     },
        //     city: [{ name: city, status: 1, index: 0, local: [] }]
        //   }
        //   this.provinceCity.forEach((e, i) => {
        //     if (e.label == province) {
        //       item.province.index = i
        //       if (e.children) {
        //         e.children.forEach((el, ii) => {
        //           if (el.label == city) {
        //             item.city[0].index = ii
        //             el.children.forEach((ele, iii) => {
        //               item.city[0].local.push(ele.label)
        //             })
        //           }
        //         })
        //       }
        //     }
        //   })
        //   this.form.area = [item]
        //   // console.log(this.form.area)
        //   this.fnChangeAreaArr(this.form.area, 'mapToSelect', '')
        // } else {
        //   this.fnChangeAreaArr(this.form.area, 'selectToMap', '')
        // }
      })
    },
    checkArea() {
      // if (this.form.area.length == 0) {
      //   this.$confirm('请选择所在地区', '提示', {
      //     confirmButtonText: '确定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //     .then(() => {})
      //     .catch(() => {})
      // } else {
      // }
    },
    onSearch(obj) {
      this.form = JSON.parse(JSON.stringify(obj.form))
      this.getTableData(4)
    },
    getTableData(a) {
      // if (!this.form.xmmc) {
      //   this.$confirm('请输入项目名称关键词', '提示', {
      //     confirmButtonText: '确定',
      //     showCancelButton: false,
      //     type: 'warning'
      //   })
      //     .then(() => {})
      //     .catch(() => {})
      //   return
      // }
      let jylx = this.form.jylx
      let jylxs = []
      jylxs = jylx.filter(v => {
        return v != '全部'
      })
      // let jylx = this.form.jylx_gcjs.concat(this.form.jylx_zfcg)
      // let jylxs = []
      // jylx.forEach(ele => {
      //   if (ele.status) {
      //     jylxs.push(ele.value)
      //   }
      // })

      let params = {
        user_id: this.$store.state.userInfo.user_id,
        minFbsj: this.form_date.min_date,
        maxFbsj: this.form_date.max_date,
        fbsj_type: this.form_date.dateRadio,
        xmmc: this.form.xmmc,
        xmyz: this.form.xmyz,
        jylx: jylxs.join(','),
        area: this.changeAreaArr, //包含
        area_pc: this.area_pc, //分散
        area_type:
          this.changeAreaArr[0].province.name == '四川省' ? '四川' : '全国',
        rows: 20,
        page: this.page
      }
      if (this.addXmPage.indexOf(this.currentRoute) > -1) {
        params.import = 1
      }
      this.loading = true
      this.saveDZCondition(params)
      this.axios.post('/index/Tendering/searchTenderList', params, data => {
        this.loading = false
        this.tableData = data.rows || []
        this.total = data.status == 'success' ? data.rows.length : 0
        this.allTotal = data.total || 0
        let params1 = {
          xmmcs: [params.xmmc]
        }
        localStorage.setItem('searchZbgg', JSON.stringify(params1))
      })
    },
    //主列表切换页数
    tableChangePage(val) {
      this.page = val
      this.getTableData()
    }
  }
}
</script>
<style>
.dialogVisibleResult .el-dialog__body {
  padding-top: 0 !important;
}
</style>

<style lang="less" scoped>
#searchMyCustomization {
  header {
    box-shadow: 2px 2px 2px rgb(241, 240, 240);
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 30px;
  }
  .link_text {
    cursor: pointer;
    color: #45a4fc;
  }
  .allTotal {
    text-align: right;
    margin: 15px 0 0 0;
    color: gray;
    span {
      color: #45a4fc;
    }
  }
  .searchBox {
    // border: 1px solid #45a4fc;
    // margin-top: 20px;
  }
  .content_ {
    width: 1300px;
  }
  .content {
    // width: 1300px;
    margin: 0 auto;
    .dateInput {
      width: 200px;
    }
    .list {
      margin: 20px 0;
    }
  }
  .form {
    margin: 20px 0;
  }
  .tag {
    padding-left: 2%;
  }
  .check_span {
    display: inline-block;
    padding: 5px 10px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ddd;
    color: #999;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .check_span.active {
    border: 1px solid #45a4fc;
    color: #45a4fc;
  }
  .tips {
    color: #999;
    font-size: 13px;
  }
}
</style>


