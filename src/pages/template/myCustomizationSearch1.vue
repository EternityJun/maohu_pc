<template>
  <!-- // 招标定制搜索框 -->

  <div id="myCustomizationSearch" v-loading='loading_saveDz'>
    <el-form ref="form" :model="form" label-width="70px" @submit.native.prevent :size="options.size" class="form">
      <el-row>
        <el-col :span="options.from=='personal' ? 11 : 12" :offset="options.from=='personal' ? 1 : 0">
          <el-form-item label="项目名称">
            <el-input v-model="form.xmmc" placeholder="请输入招标项目名称关键词 例：水库、河道(回车添加)" clearable @keyup.enter.native="addTag('xmmc')"></el-input>
          </el-form-item>
          <el-row>
            <el-col :offset="options.from=='personal' ? 6 : 3" :span="18">
              <el-tag style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmmcs" :key="tag" closable @close="onDelete_yjTag(index,'xmmcs')">{{tag}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="options.from=='personal' ? 0 :1">
          <el-form-item label="项目业主" label-width="100px">
            <el-input v-model="form.xmyz" placeholder="请输入项目业主关键词 例：城投、水务局(回车添加)" clearable @keyup.enter.native="addTag('xmyz')"></el-input>
          </el-form-item>
          <el-row>
            <el-col :offset="options.from=='personal' ? 8 : 4" :span="18" :class="options.from!='personal' ? 'tag' : ''">
              <el-tag style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmyzs" :key="tag" closable @close="onDelete_yjTag(index,'xmyzs')">{{tag}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="options.from=='personal' ? 11 : 12" :offset="options.from=='personal' ? 1 : 0">
          <el-form-item label="交易类型">
            <div v-if="options.from=='searchZbgg' || options.from=='wddz'">
              <el-row>
                <el-col :span="4">
                  <span style="color:#606266">工程建设：</span>
                </el-col>
                <el-col :span="20">
                  <span @click="add_jylx('jylx_gcjs',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_gcjs" :label="item.label" :key="i">{{item.label}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <span style="color:#606266">政府采购：</span>
                </el-col>
                <el-col :span="20">
                  <span @click="add_jylx('jylx_zfcg',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_zfcg" :label="item.label" :key="i">{{item.label}}</span>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="工程建设:" label-width="73px" v-if="options.from=='personal'">
            <el-row>
              <el-col :span="24">
                <span @click="add_jylx('jylx_gcjs',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_gcjs" :label="item.label" :key="i">{{item.label}}</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="政府采购:" label-width="73px" v-if="options.from=='personal'">
            <el-row>
              <el-col :span="24">
                <span @click="add_jylx('jylx_zfcg',item)" :class="['check_span' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_zfcg" :label="item.label" :key="i">{{item.label}}</span>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="options.from=='personal' ? 0 :1">
          <el-row>
            <el-col :span="options.from=='personal' ? 18 : 19">
              <el-form-item label="所在地区" label-width="100px">
                <el-cascader style="width:100%" @change="changeArea" v-model="form.area" :options="provinceCity" :props="props" clearable :collapse-tags='collapseTags'></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-button type="primary" :size="options.from=='personal' ? 'mini' : 'middle'" @click="openMap">地图选择</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-form-item style="text-align:center" v-if="options.from=='wddz'">
        <el-button v-if="options.type=='edit'" type="" @click="submit(false)">取消</el-button>
        <el-button type="primary" @click="submit(true)">定制</el-button>
        <el-button @click="onSubmit(false)">重置</el-button>
      </el-form-item> -->
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="onSubmit(true)">搜索</el-button>
        <el-button @click="onSubmit(false)">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="6">
        <div>
          <el-radio-group v-model="form2.dateRadio" @change="changeDateRadio">
            <el-radio-button :label="item" v-for="(item,i) in dateRadios" :key='i'></el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="16">
        <div>
          <el-date-picker v-model="form2.min_date" type="date" class="dateInput" placeholder="选择日期" clearable value-format="yyyy-MM-dd" :picker-options="pickerOptionsStartzbrqMin" @change="changeDate" @focus='focusDate'>
          </el-date-picker>
          <span>-</span>
          <el-date-picker v-model="form2.max_date" type="date" class="dateInput" placeholder="选择日期" clearable value-format="yyyy-MM-dd" :picker-options="pickerOptionsEndzbrqMax" @change="changeDate" @focus='focusDate'>
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-button type="primary" style="margin-left:30px" @click="saveDz">定制</el-button>
        </div>
      </el-col>
    </el-row>
    <div v-if="mapDialogVisable">
      <el-dialog top="10px" title="查看结果" :visible.sync="mapDialogVisable" width="97%" class="dialogVisibleResult" :close-on-click-modal="close_on_click_modal">
        <province-city-district-map @onAddMap='onAddMap'></province-city-district-map>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPassFormatDate, getDate } from '../../store/formatter.js'
import provinceCityDistrictMap from './provinceCityDistrictMap' //地图选择框

export default {
  props: ['options'],
  components: {
    provinceCityDistrictMap
  },
  data() {
    return {
      pickerOptionsStartzbrqMin: {
        disabledDate: time => {
          let endDateVal = this.form2.max_date
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEndzbrqMax: {
        disabledDate: time => {
          let beginDateVal = this.form2.min_date
          if (beginDateVal) {
            if (this.form2.dateRadio) {
              //近期日期有选
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              )
            } else {
              //只能选三年前的日期
              return (
                time.getTime() >
                new Date(getPassFormatDate(3, 'year')).getTime() -
                  1 * 24 * 60 * 60 * 1000
              )
            }
          }
        }
      },
      form: {
        xmmc: '',
        xmmcs: [],
        xmyz: '',
        xmyzs: [],
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
      props: { multiple: true },
      gcjs: ['施工', '代理', '监理', '勘察设计', '造价', '其他招标'],
      zfcg: ['政府采购'],
      areas: [],
      dateRadios: ['近一月', '近一年', '近三年','三年前'],
      form2: {
        dateRadio: '近一月',
        min_date: '',
        max_date: ''
      },
      loading_saveDz: false,
      provinceCity: [],
      collapseTags: true,
      mapDialogVisable: false,
      close_on_click_modal: false
    }
  },
  created() {
    if (this.options.searchZbgg) {
      this.form = JSON.parse(JSON.stringify(this.options.searchZbgg))
      this.areas = this.form.area
    }
    this.fn_cate()
    this.setFormatDate()
  },
  watch: {
    options() {
      console.log(this.options)
      if (this.options.searchZbgg) {
        this.form = JSON.parse(JSON.stringify(this.options.searchZbgg))
        this.areas = this.form.area
      }
    }
  },

  methods: {
    onAddMap(obj) {
      this.mapDialogVisable = false
      // this.$emit('onSearch', {})
      this.$emit('onAddMap', obj)
    },
    openMap() {
      // this.$emit('onOpenMap', {})
      this.mapDialogVisable = true
    },
    fn_cate() {
      this.axios.post('/index/common/getProvinceCityDistrict', {}, data => {
        this.provinceCity = data
      })
    },
    changeArea(value) {
      //只能选择一个省
      console.log('只能选择一个省')
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
      console.log(this.form.area)
    },
    saveDz() {
      let jylx = this.form.jylx_gcjs.concat(this.form.jylx_zfcg)
      let jylxs = []
      jylx.forEach(ele => {
        if (ele.status) {
          jylxs.push(ele.label)
        }
      })
      let params = {
        user_id: this.$store.state.userInfo.user_id,
        xmmc: this.form.xmmcs.join(','),
        xmyz: this.form.xmyzs.join(','),
        area: [],
        jylx: jylxs.join(','),
        type: 1 //type 添加1 编辑2 删除3
      }
      this.loading_saveDz = true
      this.axios.post('/index/Tendering/saveDz', params, data => {
        this.loading_saveDz = false
        if (data.status == 'success') {
          this.$message.success('保存成功,请在首页查看招标定制详情！')
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
    focusDate() {
      this.form2.dateRadio = ''
      this.form2.min_date = getPassFormatDate(3, 'year')
      this.form2.max_date = getPassFormatDate(3, 'year')
    },
    changeDate() {
      this.form2.dateRadio = ''
      this.$emit('updateDate', this.form2)
    },
    changeDateRadio() {
      this.setFormatDate()
      this.$emit('updateDate', this.form2)
    },
    setFormatDate() {
      let min_date = '',
        max_date = getDate('new')
      if (this.form2.dateRadio == '近一月') {
        min_date = getPassFormatDate(1, 'month')
      } else if (this.form2.dateRadio == '近一年') {
        min_date = getPassFormatDate(1, 'year')
      } else if (this.form2.dateRadio == '近三年') {
        min_date = getPassFormatDate(3, 'year')
      }
      this.form2.min_date = min_date
      this.form2.max_date = max_date
      let formatArea = this.formatArea()
      this.form.area = formatArea
      this.$emit('updateDate', this.form2)
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
      if (keys.length > 10) {
        this.$message.error('关键词总数控制在十个以内')
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
    handleCheckedChange(value) {
      // console.log(this.form.jylx_gcjs)
    },
    formatArea() {
      let form = JSON.parse(JSON.stringify(this.form))
      let area = form.area,
        formatArea = [],
        data1 = [],
        provinceCity = this.provinceCity
      for (let i = 0; i < area.length; i++) {
        let item = { province: '', city: '', local: '' }
        for (let i2 = 0; i2 < area[i].length; i2++) {
          item.province = area[i][0]
          item.province_status = 0
          for (let i3 = 0; i3 < provinceCity.length; i3++) {
            if (provinceCity[i3].label == area[i][0]) {
              item.province_index = i3
              for (let i4 = 0; i4 < provinceCity[i3].children.length; i4++) {
                if (provinceCity[i3].children[i4].label == area[i][1]) {
                  item.city_index = i4
                }
              }
            }
          }
          item.city = area[i][1]
          item.city_status = 0
          item.local = area[i][2]
        }
        formatArea.push(item)
      }
      return formatArea
    },
    submit(type) {
      // console.log(this.options)
      // let form = JSON.parse(JSON.stringify(this.form))
      // let params = {
      //   url: '/searchZbgg',
      //   form: form
      // }
      // if (type) {
      // } else {
      //   params.type = 'close'
      // }
      // this.$emit('onSearch', params)

      let form = JSON.parse(JSON.stringify(this.form))
      let area = form.area,
        formatArea = this.formatArea(),
        data1 = [],
        provinceCity = this.provinceCity
      // for (let i = 0; i < area.length; i++) {
      //   let item = { province: '', city: '', local: '' }
      //   for (let i2 = 0; i2 < area[i].length; i2++) {
      //     item.province = area[i][0]
      //     item.province_status = 0
      //     for (let i3 = 0; i3 < provinceCity.length; i3++) {
      //       if (provinceCity[i3].label == area[i][0]) {
      //         item.province_index = i3
      //         for (let i4 = 0; i4 < provinceCity[i3].children.length; i4++) {
      //           if (provinceCity[i3].children[i4].label == area[i][1]) {
      //             item.city_index = i4
      //           }
      //         }
      //       }
      //     }
      //     item.city = area[i][1]
      //     item.city_status = 0
      //     item.local = area[i][2]
      //   }
      //   formatArea.push(item)
      // }
      
      // 获取省市索引
      form.area = formatArea
      let params = {
        url: '/searchZbgg',
        form: form
      }
      if (type) {
        //  if(form.xmmcs.length==0 && form.xmyzs.length==0 && form.jylx_gcjs.length==0 && form.jylx_zfcg.length==0 && form.area.length==0 ){
        //    this.$message.error('请至少填写交易类型或所在地区');
        //    return
        //  }
      } else {
        params.type = 'close'
      }
      this.$emit('onSearch', params)
    },
    onSubmit(type) {
      if (type) {
        // let form = JSON.parse(JSON.stringify(this.form))
        // let params = {
        //   url: '/searchZbgg',
        //   form: form
        // }

        let form = JSON.parse(JSON.stringify(this.form))
        let area = form.area,
          formatArea = [],
          data1 = [],
          provinceCity = this.provinceCity
        for (let i = 0; i < area.length; i++) {
          let item = { province: '', city: '', local: '' }
          for (let i2 = 0; i2 < area[i].length; i2++) {
            item.province = area[i][0]
            item.province_status = 0
            for (let i3 = 0; i3 < provinceCity.length; i3++) {
              if (provinceCity[i3].label == area[i][0]) {
                item.province_index = i3
                for (let i4 = 0; i4 < provinceCity[i3].children.length; i4++) {
                  if (provinceCity[i3].children[i4].label == area[i][1]) {
                    item.city_index = i4
                  }
                }
              }
            }
            item.city = area[i][1]
            item.city_status = 0
            item.local = area[i][2]
          }
          formatArea.push(item)
        }
        // 获取省市索引
        form.area = formatArea
        let params = {
          url: '/searchZbgg',
          form: form
        }
        localStorage.setItem('searchZbgg', JSON.stringify(form))
        this.$emit('onSearch', params)
      } else {
        this.form = {
          xmmc: '',
          xmmcs: [],
          xmyz: '',
          xmyzs: [],
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
        }
      }
    }
  }
}
</script>
<style>
#myCustomizationSearch .el-form-item {
  margin-bottom: 10px !important;
}
</style>

<style lang="less" scoped>
#myCustomizationSearch {
  //   padding: 0 20px;
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
}
</style>


