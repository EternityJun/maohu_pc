<template>
  <!-- // 招标定制搜索框 -->

  <div id="myCustomizationSearch" v-loading="loading">
    <el-form ref="form" :model="form" label-width="70px" @submit.native.prevent :size="options.size" class="form">
      <el-row>
        <el-col :span="options.from=='personal' ? 11 : 12" :offset="options.from=='personal' ? 1 : 0">
          <el-form-item label="项目名称">
            <!-- <el-input v-model="form.xmmc" placeholder="请输入关键词 例：水库、河道(回车添加,最多十个关键词,每个关键词十个字以内)" clearable @keyup.enter.native="addTag('xmmc')"></el-input> -->
            <el-autocomplete style="width:100%" v-model="form.xmmc" :fetch-suggestions="querySearchAsyncXmmc" placeholder="请输入关键词 例：水库、河道(回车添加)" @select="handleSelectXmmc" @keyup.enter.native="addTag('xmmc')"></el-autocomplete>
          </el-form-item>
          <el-row>
            <el-col :offset="options.from=='personal' ? 5 : 3" :span="21">
              <el-tag :size="options.from=='personal' ? 'small' : 'medium'" style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmmcs" :key="tag" closable @close="onDelete_yjTag(index,'xmmcs')">{{tag}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="options.from=='personal' ? 12 : 11" :offset="options.from=='personal' ? 0 :1">
          <el-form-item label="项目业主" label-width="100px">
            <!-- <el-input v-model="form.xmyz" :class="options.from=='personal' ? 'personalInput' : ''" placeholder="请输入关键词 例：城投、水务局(回车添加,最多十个关键词, 每个关键字十个字以内)" clearable @keyup.enter.native="addTag('xmyz')"></el-input> -->
            <el-autocomplete style="width:100%" v-model="form.xmyz" :fetch-suggestions="querySearchAsyncXmyz" placeholder="请输入关键词 例：城投、水务局(回车添加)" @select="handleSelectXmyz" @keyup.enter.native="addTag('xmyz')"></el-autocomplete>
          </el-form-item>
          <el-row>
            <el-col :offset="options.from=='personal' ? 6 : 4" :span="21" :class="options.from!='personal' ? 'tag' : ''">
              <el-tag :size="options.from=='personal' ? 'small' : 'medium'" style="margin:0 5px 10px 0px" v-for="(tag,index) in form.xmyzs" :key="tag" closable @close="onDelete_yjTag(index,'xmyzs')">{{tag}}</el-tag>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="options.from=='personal' ? 11 : 12" :offset="options.from=='personal' ? 1 : 0">
          <el-form-item label="交易类型">
            <div v-if="options.from=='searchZbgg' || options.from=='wddz'">
              <el-row>
                <el-col :span="24">
                  <el-select v-model="form.jylx" multiple placeholder="请选择交易类型" style="width:100%;" @change="changeJylx" collapse-tags>
                    <el-option v-for="item in jylxs" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-popover placement="bottom" width="300" trigger="click">
                    <div>
                      <ul class="ul">
                        <li v-for="item in jylxs" :key="item.value" :label="item.label" :value="item.value">{{item.label}}
                          <i class="el-icon-check"></i>
                        </li>
                      </ul>
                      <ul class="ul">
                        <li v-for="item in jylxs" :key="item.value" :label="item.label" :value="item.value">{{item.label}}
                          <i class="el-icon-check"></i>
                        </li>
                      </ul>
                    </div>
                    <el-button slot="reference" style="width:100%" >请选择交易类型</el-button>
                  </el-popover> -->
                </el-col>
              </el-row>

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
          <!-- <el-form-item label="工程建设:" label-width="73px" v-if="options.from=='personal'">
            <el-row>
              <el-col :span="24">
                {{form.jylx_gcjs}}

                <span @click="add_jylx('jylx_gcjs',item)" :class="['check_span',options.from=='personal' ? 'check_span_mini' : '' ,item.status ? 'active' : '']" v-for="(item,i) in form.jylx_gcjs" :label="item.label" :key="i">{{item.label}}</span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="政府采购:" label-width="73px" v-if="options.from=='personal'">
            <el-row>
              <el-col :span="24">
                <span @click="add_jylx('jylx_zfcg',item)" :class="['check_span',options.from=='personal' ? 'check_span_mini' : '',item.status ? 'active' : '']" v-for="(item,i) in form.jylx_zfcg" :label="item.label" :key="i">{{item.label}}</span>
              </el-col>
            </el-row>
          </el-form-item> -->
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
      <el-form-item style="text-align:center" v-if="options.from=='wddz'">
        <el-button v-if="options.type=='edit'" type="" @click="submit(false)">取消</el-button>
        <el-button type="primary" @click="submit(true)">定制</el-button>
        <el-button @click="onSubmit(false)">重置</el-button>
      </el-form-item>
      <el-form-item style="text-align:center" v-else>
        <el-button type="primary" @click="onSubmit(true)">搜索</el-button>
        <el-button @click="onSubmit(false)">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="mapDialogVisable">
      <el-dialog top="10px" title="地区选择（只能选择一个省份）" :visible.sync="mapDialogVisable" width="97%" class="dialogVisibleResult" :close-on-click-modal="close_on_click_modal">
        <province-city-district-map @onAddMap='onAddMap' :provinceCity='provinceCity' :selectedArea='changeAreaArr'></province-city-district-map>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import provinceCityDistrictMap from './provinceCityDistrictMap' //地图选择框
//定制：地区必填
export default {
  props: ['options'],
  components: {
    provinceCityDistrictMap
  },
  data() {
    return {
      loading: false,
      mapDialogVisable: false,
      close_on_click_modal: false,
      jylxs: [],
      oldOptions: ['全部'], //用来存储上一次的值
      form: {
        xmmc: '',
        xmmcs: [],
        xmyz: '',
        xmyzs: [],
        jylx: [],
        // jylx_gcjs: [
        //   { label: '工程施工', status: false },
        //   { label: '工程代理', status: false },
        //   { label: '工程监理', status: false },
        //   { label: '勘察设计', status: false },
        //   { label: '工程造价', status: false },
        //   { label: '其他招标', status: false }
        // ],
        // jylx_zfcg: [{ label: '政府采购', status: false }],
        area: []
      },
      // gcjs: ['施工', '代理', '监理', '勘察设计', '造价', '其他招标'],
      noneProvince: ['台湾省', '香港特别行政区', '澳门特别行政区'],
      zfcg: ['政府采购'],
      areas: [],
      provinceCity: [],
      props: { multiple: true },
      collapseTags: true,
      changeAreaArr: [],
      gcjs: [],
      zfcg: []
    }
  },
  created() {
    console.log('上一级传下的数据', JSON.stringify(this.options.searchZbgg))
    if (this.options.searchZbgg) {
      this.form = JSON.parse(JSON.stringify(this.options.searchZbgg))
      if (this.form.jylx) {
        this.oldOptions[1] = this.form.jylx
      }
    }
    this.fn_cate()
    this.getJylx()
  },
  watch: {
    options() {
      if (this.options.searchZbgg) {
        this.form = JSON.parse(JSON.stringify(this.options.searchZbgg))
        if (this.form.jylx) {
          this.oldOptions[1] = this.form.jylx
        }
      }
    }
  },
  mounted() {
    //点击文本就让它自动点击前面的input就可以触发选择。但是因组件阻止了冒泡，暂时想不到好方法来触发。
    //这种比较耗性能，暂时想不到其他的，能实现效果了。
    // setInterval(function() {
    //   document.querySelectorAll('.el-cascader-node__label').forEach(el => {
    //     el.onclick = function() {
    //       if (this.previousElementSibling) this.previousElementSibling.click()
    //     }
    //   })
    // }, 1000)
  },
  methods: {
    // 请求交易类型
    getJylx() {
      this.axios.post('/index/Tendering/getJylx', {}, data => {
        // let gcjs = data.gcjs,
        //   zfcg = data.zfcg
        // gcjs.forEach(v => {
        //   v.status = false
        // })
        // zfcg.forEach(v => {
        //   v.status = false
        // })
        // this.form.jylx_gcjs = gcjs
        // this.form.jylx_zfcg = zfcg
        // this.gcjs = JSON.parse(JSON.stringify(gcjs))
        // this.zfcg = JSON.parse(JSON.stringify(zfcg))

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
    handleSelectXmmc(item) {
      this.addTag('xmmc')
    },
    querySearchAsyncXmmc(word, cb) {
      if (word !== '') {
        let params = {
          word,
          type: 'xmmc',
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
    onAddMap(obj) {
      // this.mapDialogVisable = false
      // this.$emit('onAddMap', obj)
      // console.log('地图返回的数据')
      // console.log(JSON.stringify(obj))
      this.mapDialogVisable = false
      this.fnChangeAreaArr(obj, 'mapToSelect')
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
      // console.log(JSON.stringify(val))
    },
    fn_cate() {
      this.axios.post('/index/common/getProvinceCityDistrict', {}, data => {
        this.provinceCity = data
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
            city: [{ name: city, status: 0, index: 0, local: [] }]
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
          console.log(111)
          this.fnChangeAreaArr(this.form.area, 'mapToSelect', '')
        } else {
          console.log(222)
          this.fnChangeAreaArr(this.form.area, 'mapToSelect', '')
        }
      })
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
      if(key.match(/^[ ]*$/)){
        return 
      }
      if (key.length == 1 || key.length > 10) {
        this.$message.error('关键字控制在2~10个字之内')
        return
      }
      if (!key) return
      if (keys.length > 9) {
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
    handleCheckedChange(value) {},
    submit(type) {
      let form = JSON.parse(JSON.stringify(this.form))
      // let area = form.area,
      //   formatArea = [],
      //   data1 = [],
      //   provinceCity = this.provinceCity
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
      // form.area = formatArea
      // let params = {
      //   url: '/searchZbgg',
      //   form: form
      // }
      if (type) {
        this.fnChangeAreaArr(this.form.area, 'selectToMap', 'saveDz')
      } else {
        let params = {
          url: '/searchZbgg',
          form: form,
          type: 'close'
        }
        this.$emit('onSearch', params)
      }
      // let params = {
      //   url: '/searchZbgg',
      //   form: form
      // }
      // this.$emit('onSearch', params)
    },
    openMap() {
      // this.mapDialogVisable = true
      if (this.form.area.length == 0) {
        this.mapDialogVisable = true
        this.changeAreaArr = []
      } else {
        this.fnChangeAreaArr(this.form.area, 'selectToMap', 'map')
      }
    },
    fnChangeAreaArr(area, type, from) {
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
      localStorage.setItem('searchZbgg', JSON.stringify(this.form))

      let newArea = area
      let form = JSON.parse(JSON.stringify(this.form))

      if (type == 'selectToMap') {
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
                if (el.children) {
                  el.children.forEach(ele => {
                    count++
                  })
                } else {
                  count++
                }
              })
            }
          }
        })
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
                      //没有下一级
                      v.city_status = 1
                    }
                  }
                })
              })
            }
          }
        })
        // console.log(JSON.stringify(formatArea))
        newArea = formatArea
        this.area_pc = newArea
      }
      this.loading = false
      this.axios.post(
        '/index/Tendering/changeArea',
        { area: newArea, type },
        data => {
          this.loading = false
          // console.log(type, from)
          if (type == 'selectToMap') {
            this.changeAreaArr = data.save //包含数组
            if (from == 'saveDz') {
              form.changeAreaArr = data.save
              let params = {
                url: '/searchZbgg',
                form: form
              }

              this.$emit('onSearch', params)
            } else if (from == 'map') {
              this.mapDialogVisable = true
            }
          } else {
            //地图转换为下拉
            // console.log('地图转换为下拉')
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
          }
        }
      )
    },
    onSubmit(type) {
      if (type) {
        let form = JSON.parse(JSON.stringify(this.form))
        // 处理地区
        let area = form.area
        if (area.length == 0) {
          this.$confirm('地区必选！', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
            .then(() => {})
            .catch(() => {})
          return
        }
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
          jylx_gcjs: JSON.parse(JSON.stringify(this.gcjs)),
          jylx_zfcg: JSON.parse(JSON.stringify(this.zfcg)),
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
.v-modal {
  z-index: 98 !important;
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
  .check_span_mini {
    padding: 2px 5px !important;
    font-size: 12px;
    border-radius: 2px;
  }
  .check_span.active {
    border: 1px solid #45a4fc;
    color: #45a4fc;
  }
  .personalInput {
    width: 90%;
  }
}
ul.ul {
  li {
    list-style: none;
  }
}
</style>


