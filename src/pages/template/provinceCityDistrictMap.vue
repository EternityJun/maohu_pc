<template>
  <div id="mapBox">
    <div class="selectedArea" v-if="area[0].province.name">
      <span style="color:#45a4fc">已选地区: </span>
      <span v-if="(area[0].city.length>0 && noneProvince.indexOf(area[0].province.name)==-1) || noneProvince.indexOf(area[0].province.name)!=-1">{{area[0].province.name}} </span>
      <span v-if="area[0].province.status==1">(全部区域)</span>
      <span v-else>
        <span v-if="area[0].city.length>0"> ：</span>
        <span v-for="(item,i) in area[0].city" :key="i" style="margin-right:20px">
          <span v-if="item.local">
            <span v-if="item.local.length>0">
              <span>{{i-0+1}}.</span>
              {{item.name}}
              <span v-if="item.status==1">(全部区域)</span>
            </span>
            <span v-if="item.local.length>0 && item.status==0"> (</span>
            <span v-if="item.status==0">
              <span v-for="(local,i_local) in item.local" :key="i_local">
                <span v-if="i_local<3">{{local}}
                  <span v-if="item.local.length>i_local-0+1 && i_local!=2">,</span>
                </span>
              </span>
              <span v-if="item.local.length>3">......</span>
            </span>
            <span v-if="item.local.length>0 && item.status==0">)</span>
            <i v-if="item.local.length>0" class="el-icon-delete delIcon" @click="delArea(i)"></i>
          </span>
          <span v-if="item.noNext">

            {{i-0+1}}. {{item.name}}(全部区域)
          </span>
        </span>
      </span>

    </div>
    <div class="box">
      <div id="provinceMap" class="chart" v-loading='loadingProvince'></div>
      <div id="cityMap" class="chart" v-show="showCity" v-loading='loadingCity && showCity'></div>
      <div id="distinctMap" class="chart" v-show="showDistinct" v-loading='loadingDistinct && showDistinct'></div>
      <div class="otherDistinct">
        <el-checkbox-group v-model="otherDistinct" v-for="(item,i) in otherDistincts" :key="i">
          <el-checkbox :label="item" @change="changeOtherDistinct('other')"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="cityAll" v-if="showCity">
        <el-checkbox v-model="allProvinceCheck" label="全选" @change="changeProCity('province')"></el-checkbox>
      </div>
      <div class="distinctAll" v-if="showDistinct">
        <el-checkbox v-model="allCityCheck" label="全选" @change="changeProCity('city')"></el-checkbox>
      </div>
    </div>
    <div class="btns" v-show="area[0].province.name">
      <el-button type="primary" size="middle" class="button" @click="handle">确认</el-button>
    </div>
  </div>
</template>

<script>
import cityMap from '@/js/china-main-city-map.js'
import echarts from 'echarts'
import axios from 'axios'
import Vue from 'vue'
import { parse, parseExpression } from '@babel/parser'

//中华人民共和国地图（第一级地图）的ID、Name、Json数据
var chinaId = 100000
var chinaName = '中华人民共和国地图'
var chinaJson = null

//第二级地图 市
var cityId = ''
var cityName = ''
var cityJson = null

// 第三集地图 区县
var distinctId = ''
var distinctName = ''
var distinctJson = null

//记录父级ID、Name
var mapStack = []
var parentId = null
var parentName = null

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
var myChart = null,
  myChartCity = null,
  myChartDis = null,
  area_global = [
    {
      province: { name: '', status: 0, index: 0 },
      city: []
    }
  ],
  noneProvince = ['台湾省', '香港特别行政区', '澳门特别行政区'],
  noneCities = ['北京市', '天津市', '上海市', '重庆市'],
  current_province = '',
  current_city = ''

export default {
  name: 'chinaMap',
  props: ['provinceCity', 'selectedArea'],
  data() {
    return {
      loadingProvince: false,
      loadingCity: false,
      loadingDistinct: false,
      showCity: false,
      showDistinct: false,
      current_province: '',
      current_city: '',
      current_province_index: '',
      current_city_index: '',
      otherDistincts: {},
      otherDistinct: [],
      allProvinceCheck: '', //全省下的市
      allCityCheck: '', //全市下的区
      noneProvince: ['台湾省', '香港特别行政区', '澳门特别行政区'],
      noneCities: ['北京市', '天津市', '上海市', '重庆市'],
      area: [
        {
          province: { name: '', status: 0, index: 0 },
          city: []
        }
      ]
    }
  },
  mounted: function() {
    // console.log('上一个页面数据' + JSON.stringify(this.selectedArea))
    if (this.selectedArea.length > 0) {
      this.area = this.selectedArea
      if (this.noneProvince.indexOf(this.area[0].province.name) > -1) {
        //香港 澳门  台湾
        this.area[0].city = []
      }
    } else {
      this.area = [
        {
          province: { name: '', status: 0, index: 0 },
          city: []
        }
      ]
    }
    area_global = this.area
    this.getIpToArea()
  },
  methods: {
    getIpToArea() {
      let that = this
      this.mapChart('provinceMap', true)
      let province = '',
        city = ''
      let area = JSON.parse(JSON.stringify(this.area))
      if (this.selectedArea.length == 0) {
        //当没有选地区时，将地图定位到我当前的省市；否则显示之前的地区
        province = localStorage.getItem('local_province') || ''
        city = localStorage.getItem('local_city') || ''
      } else {
        province = area[0].province.name
      }

      this.current_province = province
      current_province = province
      this.current_city = city
      current_city = city
      this.provinceCity.forEach((e, i) => {
        if (e.label.indexOf(province) > -1) {
          this.current_province_index = i
          if (e.children) {
            e.children.forEach((el, ii) => {
              if (el.label.indexOf(city) > -1) {
                this.current_city_index = ii
              }
            })
          }
        }
      })
      if (province && this.noneProvince.indexOf(province) == -1) {
        this.showCity = true
        let param = {
          data: {
            adcode: cityMap[province],
            name: province,
            childrenNum: 1
          }
        }
        this.mapChartCity(param, chinaJson, chinaName, '至少一个省份', true)
      }
      if (city) {
        this.showDistinct = true
        cityId = cityMap[city]
        cityName = province
        let param = {
          data: {
            name: city,
            adcode: cityMap[city],
            childrenNum: 0
          }
        }
        this.mapChartDistinct(param, true)
      }
    },
    changeProCity(type) {
      let area = this.area
      let that = this
      let provinceCity = this.provinceCity
      // console.log(type)
      if (type == 'province') {
        //全省
        if (this.allProvinceCheck) {
          //全选
          that.allCityCheck = true
          area[0].province.name = this.current_province
          area[0].province.status = 1
          for (let i = 0; i < provinceCity.length; i++) {
            if (area[0].province.name == provinceCity[i].label) {
              area[0].province.index = i
              area[0].province.status = 1
              area[0].city = []
              for (let i2 = 0; i2 < provinceCity[i].children.length; i2++) {
                let a = provinceCity[i].children
                let arr = { name: a[i2].label, status: 1, index: i2, local: [] }
                if (a[i2].children) {
                  for (let i3 = 0; i3 < a[i2].children.length; i3++) {
                    arr.local.push(a[i2].children[i3].label)
                  }
                }
                // 不在地图内的区
                let len = that.otherDistincts.length
                if (len) {
                  arr.local.concat(that.otherDistincts)
                  that.otherDistinct = that.otherDistincts
                }
                area[0].city.push(arr)
              }
            }
          }
        } else {
          //取消全选
          this.area[0].province.status = 0
          this.area[0].city = []
          this.allCityCheck = false
          this.otherDistinct = []
        }
        area_global = this.area
        registerAndsetOption(
          myChart,
          chinaId,
          chinaName,
          chinaJson,
          true,
          '一个省份',
          'province'
        )
        registerAndsetOption(
          myChartCity,
          cityId,
          cityName,
          cityJson,
          true,
          '市',
          'city'
        )
        if (this.showDistinct) {
          registerAndsetOption(
            myChartDis,
            distinctId,
            distinctName,
            distinctJson,
            true,
            '区县',
            'distinct'
          )
        }
      } else {
        // console.log('city---')
        // console.log(JSON.stringify(area))

        //全市
        if (
          !area[0].province.name ||
          area[0].province.name !== that.current_province
        ) {
          //选第一个省、切换其他省
          area[0].province.name = that.current_province
          area[0].province.status = 0
          area[0].city = [{ name: that.current_city, status: 0, local: [] }]
        } else {
          if (area[0].city.length == 0) {
            area[0].city = [{ name: that.current_city, status: 0, local: [] }]
          } else {
            let num = 0,
              i = 0
            area[0].city.forEach((element, e_i) => {
              if (element.name == that.current_city) {
                num++
                i = e_i
              }
            })
            if (num == 0) {
              area[0].city.push({
                name: that.current_city,
                status: 0,
                local: []
              })
            } else {
              if (that.allCityCheck) {
                area[0].city[i].local = []
              } else {
                area[0].city.splice(i, 1)
              }
            }

            // console.log(area[0].city.length)
          }
        }
        // console.log(JSON.stringify(area))
        let local = [],
          status = 0
        let arr =
          provinceCity[this.current_province_index].children[
            this.current_city_index
          ].children
        arr.forEach(e => {
          local.push(e.label)
        })

        area[0].city.forEach((e, i) => {
          if (e.name == this.current_city) {
            //当前市
            if (that.allCityCheck) {
              //全选
              e.status = 1
              that.otherDistinct = that.otherDistincts
              local.concat(that.otherDistincts)
              e.local = local
            } else {
              //取消全选
              area[0].city.splice(i, 1)
              this.otherDistinct = []
            }
          }
        })
        area.forEach(e => {
          let num2 = 0
          e.city.forEach(el => {
            if (el.status == 1) {
              num2++
            }
          })
          // console.log(num2)
          // 判断省是否全选
          provinceCity.forEach(e2 => {
            if (e2.label == area[0].province.name && e.city.length > 0) {
              if (num2 == e2.children.length) {
                that.allProvinceCheck = true
                area[0].province.status = 1
              } else {
                that.allProvinceCheck = false
                area[0].province.status = 0
              }
            }
          })
        })
        that.area = area
        area_global = area
        // console.log(JSON.stringify(area))

        registerAndsetOption(
          myChart,
          chinaId,
          chinaName,
          chinaJson,
          true,
          '一个省份',
          'province'
        )
        registerAndsetOption(
          myChartCity,
          cityId,
          cityName,
          cityJson,
          true,
          '市',
          'city'
        )
        registerAndsetOption(
          myChartDis,
          distinctId,
          distinctName,
          distinctJson,
          true,
          '区县',
          'distinct'
        )
        return
        if (that.allCityCheck) {
          //全选
          let arr =
            provinceCity[this.current_province_index].children[
              this.current_city_index
            ].children
          arr.forEach(e => {
            local.push(e.label)
          })
          local.concat(this.otherDistincts)
          this.otherDistinct = this.otherDistincts
          status = 1
          area[0].city = [{ name: that.current_city, status: 0, local }]
        } else {
          //取消全选
          local = []
          status = 0
          this.otherDistinct = []
          area[0].city = [{ name: that.current_city, status: 0, local }]
        }
        that.area = area
        area_global = area
        registerAndsetOption(
          myChart,
          chinaId,
          chinaName,
          chinaJson,
          true,
          '一个省份',
          'province'
        )
        registerAndsetOption(
          myChartCity,
          cityId,
          cityName,
          cityJson,
          true,
          '市',
          'city'
        )
        registerAndsetOption(
          myChartDis,
          distinctId,
          distinctName,
          distinctJson,
          true,
          '区县',
          'distinct'
        )
      }
    },
    delArea(i) {
      //删除地区
      let area = this.area
      area[0].city.splice(i, 1)
      this.showDistinct=false
      this.otherDistincts=[]
      this.area = area
      area_global = area
      registerAndsetOption(
        myChart,
        chinaId,
        chinaName,
        chinaJson,
        true,
        '一个省份',
        'province'
      )
      registerAndsetOption(
        myChartCity,
        cityId,
        cityName,
        cityJson,
        true,
        '市',
        'city'
      )
      registerAndsetOption(
        myChartDis,
        distinctId,
        distinctName,
        distinctJson,
        true,
        '区县',
        'distinct'
      )
    },
    getIndex(province, city) {
      let provinceCity = this.provinceCity
      provinceCity.forEach((e, i) => {
        if (province) {
          if (province == e.label) {
            this.current_province_index = i
            if (city) {
              provinceCity[i].children.forEach((el, ii) => {
                if (el.label == city) {
                  this.current_city_index = ii
                }
              })
            }
          }
        }
      })
    },
    /**
     * 确认添加地区
     */
    handle() {
      let area = this.area
      let provinceCity = this.provinceCity
      if (
        this.noneProvince.indexOf(area[0].province.name) == -1 &&
        area[0].city.length == 0
      ) {
        this.$confirm('请选择地区', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
        return
        //全省 push
      } else {
      }
      for (let i = 0; i < provinceCity.length; i++) {
        if (area[0].province.name == provinceCity[i].label) {
          area[0].province.index = i
          if (provinceCity[i].children) {
            for (let i2 = 0; i2 < provinceCity[i].children.length; i2++) {
              let a = provinceCity[i].children
              area[0].city.forEach((element, i) => {
                // if(!element.noNext && element.local.length==0){
                //   area[0].city.splice(i,1)
                // }
                a.forEach((element1, i_1) => {
                  if (element.name == element1.label) {
                    element.index = i_1
                  }
                })
              })
            }
          }
        }
      }

      this.$emit('onAddMap', area)
    },

    /**
     * Echarts地图
     */
    mapChart(divid, isFirst) {
      const that = this
      chinaId = 100000
      this.loadingProvince = true
      this.axios.post(
        '/index/common/getAreaFile',
        { id: chinaId },
        response => {
          this.loadingProvince = false
          chinaJson = response
          myChart = echarts.init(document.getElementById(divid))
          myChart.off('click')
          registerAndsetOption(
            myChart,
            chinaId,
            chinaName,
            chinaJson,
            false,
            '一个省份',
            'province',
            isFirst
          )
          parentId = chinaId
          parentName = 'china'
          myChart.on('click', function(param) {
            // chinaId = cityMap[param.name]
            chinaId = param.data.adcode
            that.current_province = param.name
            current_province = param.name
            that.current_city = ''
            current_city = ''
            that.getIndex(that.current_province, that.current_city)
            that.otherDistincts = []
            that.allProvinceCheck = ''
            that.allCityCheck = ''

            //展示市
            area_global = that.area

            if (!chinaId) {
              that.showCity = false
              that.showDistinct = false
            } else {
              if (that.noneProvince.indexOf(that.current_province) == -1) {
                that.showCity = true
                that.showDistinct = false
                that.mapChartCity(
                  param,
                  chinaJson,
                  chinaName,
                  '至少一个省份',
                  isFirst
                )
              } else {
                //台湾 香港 澳门
                that.showCity = false
                that.showDistinct = false
                that.changeDirectlyProvince(param.name)
              }
            }
          })
        }
      )
    },
    mapChartCity(param, json1, name1, text1, isFirst) {
      let that = this
      // cityId = cityMap[param.name]
      cityId = param.data.adcode
      cityName = param.data.name
      let cityName1 = cityName
      myChartCity = echarts.init(document.getElementById('cityMap'))
      myChartCity.off('click')
      if (param.data.childrenNum) {
        //代表有下级地图
        that.loadingCity = true

        this.axios.post(
          '/index/common/getAreaFile',
          { id: cityId },
          response => {
            that.loadingCity = false
            cityJson = response
            registerAndsetOption(
              myChartCity,
              cityId,
              cityName1,
              cityJson,
              true,
              '市',
              'city',
              isFirst
            )
            if (
              area_global[0].province.name == that.current_province &&
              area_global[0].province.status == 1
            ) {
              that.allProvinceCheck = true
            } else {
              that.allProvinceCheck = false
            }
            myChartCity.on('click', function(param1) {
              that.current_city = param1.name
              current_city = param1.name
              that.getIndex(that.current_province, that.current_city)

              current_province = that.current_province
              if (that.noneCities.indexOf(that.current_province) == -1) {
                // if (cityMap[param1.name]) {
                // console.log('233----:'+param1.data.adcode)
                if (param1.data.adcode) {
                  //展示区
                  that.otherDistincts = []
                  that.allCityCheck = that.allProvinceCheck ? true : false
                  let area = that.area
                  if (area[0].province.name == that.current_province) {
                    area.forEach(function(e) {
                      // if (e.city.length == 0) {
                      //   e.city.push({ name: param1.name, status: 0, local: [] })
                      //   return
                      // }
                      let cities = []
                      e.city.forEach(e1 => {
                        cities.push(e1.name)
                      })
                      if (cities.indexOf(param1.name) == -1) {
                        // e.city.push({ name: param1.name, status: 0, local: [] })
                      }
                      e.city.forEach(el => {
                        if (el.name == that.current_city && el.status == 1) {
                          that.allCityCheck = true
                        } else {
                          that.allCityCheck = false
                        }
                      })
                    })
                    that.area = area
                    area_global = area
                  }
                  that.showDistinct = true
                  that.mapChartDistinct(param1, isFirst)
                } else {
                  that.changeNoDistinct(param1.name)
                }
              } else {
                //直辖市

                that.changeDirectlyCity('map', param1.name)
              }
            })
          }
        )
      } else {
        //直辖市 没有下一级
        that.showDistinct = false
        console.log('last--')
      }
    },
    mapChartDistinct(param, isFirst) {
      // console.log(cityName)
      let that = this
      // distinctId = cityMap[param.name]
      distinctId = param.data.adcode
      distinctName = param.data.name
      myChartDis = echarts.init(document.getElementById('distinctMap'))
      myChartDis.off('click')
      if (param.data.childrenNum) {
        //代表有下级地图
        that.loadingDistinct = true
        that.showDistinct = true
        this.axios.post(
          '/index/common/getAreaFile',
          { id: distinctId },
          response => {
            that.loadingDistinct = false
            distinctJson = response
            registerAndsetOption(
              myChartDis,
              distinctId,
              distinctName,
              distinctJson,
              true,
              '区县',
              'distinct',
              isFirst
            )
            // 请求地图上没有的地区
            that.getOtherDistinct(distinctJson)

            myChartDis.on('click', function(param1) {
              // that.current_city = that.current_province //?????????????????
              // console.log(param1.name)
              that.changeOtherDistinct('map', param1.name)
              //选择区
            })
          }
        )
      } else {
        console.log('last--')
        this.showDistinct = false
        // console.log(JSON.stringify(that.area))
        this.changeNoDistinct(param.name)
        //没有下级地图
      }
    },
    // 市没有下一级
    changeNoDistinct(param) {
      let area = this.area,
        provinceCity = this.provinceCity,
        that = this
      // console.log(param, that.current_city, JSON.stringify(area))
      if (
        !area[0].province.name ||
        area[0].province.name !== that.current_province
      ) {
        area[0].province.name = that.current_province
        area[0].city = [
          { name: that.current_city, status: 1, local: [], noNext: true }
        ]
      } else {
        if (area[0].city.length == 0) {
          area[0].city = [
            { name: that.current_city, status: 1, local: [], noNext: true }
          ]
        } else {
          let num = 0,
            ii = 0
          area[0].city.forEach((e, i) => {
            if (e.name == that.current_city) {
              num++
              ii = i
            }
          })
          if (num > 0) {
            area[0].city.splice(ii, 1)
            if (area[0].city.length == 0) {
              area[0].province.name = ''
              area[0].province.index = ''
            }
          } else {
            area[0].city.push({
              name: that.current_city,
              status: 1,
              local: [],
              noNext: true
            })
          }
        }
      }

      this.area = area
      area_global = area
      registerAndsetOption(
        myChart,
        chinaId,
        chinaName,
        chinaJson,
        true,
        '一个省份',
        'province'
      )
      registerAndsetOption(
        myChartCity,
        cityId,
        cityName,
        cityJson,
        true,
        '市',
        'city'
      )
    },
    // 台湾 香港 澳门
    changeDirectlyProvince(name) {
      let item = {
        province: { name, status: 1, index: this.current_province_index },
        city: []
      }
      this.area = [item]
      area_global = this.area
      registerAndsetOption(
        myChart,
        chinaId,
        chinaName,
        chinaJson,
        true,
        '一个省份',
        'province'
      )
    },
    // 直辖市
    changeDirectlyCity(type, name) {
      let area = JSON.parse(JSON.stringify(this.area)),
        provinceCity = this.provinceCity,
        that = this
      if (
        !area[0].province.name ||
        area[0].province.name !== that.current_province
      ) {
        area[0].province.name = that.current_province
        area[0].city = [{ name: that.current_province, status: 0, local: [] }]
      }

      area[0].city.forEach((e, i) => {
        if (e.name == that.current_province) {
          if (e.local.indexOf(name) == -1) {
            e.local.push(name)
          } else {
            e.local.splice(e.local.indexOf(name), 1)
          }
          // 判断该市下的区是否是全选，全选将status=1.checked=true
          provinceCity.forEach(e2 => {
            if (e2.label == area[0].province.name) {
              //省
              e2.children.forEach(el2 => {
                if (el2.label == that.current_province) {
                  //市
                  if (e.local.length == el2.children.length) {
                    e.status = 1
                    that.allProvinceCheck = true
                  } else {
                    e.status = 0
                    that.allProvinceCheck = false
                  }
                }
              })
            }
          })
        }
      })
      this.area = area
      area_global = area
      registerAndsetOption(
        myChart,
        chinaId,
        chinaName,
        chinaJson,
        true,
        '一个省份',
        'province'
      )
      registerAndsetOption(
        myChartCity,
        cityId,
        cityName,
        cityJson,
        true,
        '市',
        'city'
      )
    },
    // 选择区县
    changeOtherDistinct(type, name) {
      let area = this.area,
        provinceCity = this.provinceCity,
        that = this
      console.log(
        '选择区县',
        that.current_province_index,
        that.current_city,
        name,
        type
      )
      // 高亮的再点击，取消该地区，否则加入
      if (
        !area[0].province.name ||
        area[0].province.name !== that.current_province
      ) {
        area[0].province.name = that.current_province
        area[0].province.status = 0
        area[0].province.index = that.current_city_index
        area[0].city = [{ name: that.current_city, status: 0, local: [] }]
      }
      // console.log(JSON.stringify(area))
      area.forEach(function(e) {
        let c_index = -1
        if (e.city.length == 0) {
          let item = {
            name: that.current_city,
            status: 0,
            local: type == 'map' ? [name] : that.otherDistinct
          }
          e.city = [item]
        } else {
          let num1 = 0,
            num2 = 0
          e.city.forEach((el, c_index) => {
            if (el.name == that.current_city) {
              num1++
              if (type == 'map') {
                let i = el.local.indexOf(name)
                if (i == -1) {
                  el.status = 0
                  el.local.push(name)
                } else {
                  el.local.splice(i, 1)
                  el.status = 0
                  that.allCityCheck = false
                  if (el.local.length == 0) {
                    e.city.splice(c_index, 1)
                  }
                }
              } else {
                //其他选项
                for (let i = 0; i < that.otherDistincts.length; i++) {
                  for (let j = 0; j < el.local.length; j++) {
                    if (el.local[j] == that.otherDistincts[i]) {
                      el.local.splice(j, 1)
                      j = j - 1
                    }
                  }
                }
                el.local = el.local.concat(that.otherDistinct)
              }
              // 判断该市下的区是否是全选，全选将status=1.checked=true
              provinceCity.forEach(e2 => {
                if (e2.label == area[0].province.name && e.city.length > 0) {
                  let num = 0
                  e2.children.forEach(el2 => {
                    if (el2.label == that.current_city) {
                      //市
                      if (el.local.length == el2.children.length) {
                        el.status = 1
                        that.allCityCheck = true
                      } else {
                        el.status = 0
                        that.allCityCheck = false
                      }
                    }
                  })
                }
              })
            }
            if (el.status == 1) {
              num2++
            }
            // 判断省是否全选
            provinceCity.forEach(e2 => {
              if (e2.label == area[0].province.name && e.city.length > 0) {
                if (num2 == e2.children.length) {
                  that.allProvinceCheck = true
                  area[0].province.status = 1
                } else {
                  that.allProvinceCheck = false
                  area[0].province.status = 0
                }
              }
            })
          })
          if (num1 == 0) {
            e.city.push({ name: that.current_city, status: 0, local: [name] })
          }
        }
      })
      if (area[0].province.name && !area[0].city.length) {
        area[0].province.name = ''
      }
      // console.log(JSON.stringify(area))
      that.area = area
      area_global = area

      registerAndsetOption(
        myChart,
        chinaId,
        chinaName,
        chinaJson,
        true,
        '一个省份',
        'province'
      )
      // console.log(cityName)
      registerAndsetOption(
        myChartCity,
        cityId,
        cityName,
        cityJson,
        true,
        '市',
        'city'
      )
      registerAndsetOption(
        myChartDis,
        distinctId,
        distinctName,
        distinctJson,
        true,
        '区县',
        'distinct'
      )
    },
    getOtherDistinct(mapJson) {
      let area = this.area
      let data = initMapData(mapJson),
        arr = []
      let pass = []
      data.forEach(element => {
        pass.push(element.name)
      })
      let param = {
        province: this.current_province,
        city: this.current_city,
        local: pass
      }
      this.axios.post('/index/common/compareCity', param, data => {
        this.otherDistincts = data
        if (this.allCityCheck) {
          this.otherDistinct = data
        }
        area.forEach(e => {
          if (e.province.name == this.current_province) {
            e.city.forEach(el => {
              if (el.name == this.current_city) {
                el.local.forEach(ele => {
                  if (this.otherDistincts.indexOf(ele) > -1) {
                    arr.push(ele)
                  }
                })
                if (el.status == 1) {
                  this.allCityCheck = true
                }
              }
            })
          }
        })
        this.otherDistinct = arr
      })
    }
  }
}
/**
 *
 * @param {*} myChart
 * @param {*} id        省市县Id
 * @param {*} name      省市县名称
 * @param {*} mapJson   地图Json数据
 * @param {*} flag      是否往mapStack里添加parentId，parentName
 *
 */
//全选市 ：高亮该省，高亮全市下的所有区；全选一个市下的区：高亮该市，高亮该省
// 点击已经选中的省市区：去掉相应下面所有市区的高亮；删除已选地区里的值
function registerAndsetOption(
  myChart,
  id,
  name,
  mapJson,
  flag,
  subtext,
  from,
  isFirst
) {
  echarts.registerMap(name, mapJson)

  let that = this
  let data = initMapData(mapJson) //已选的加颜色
  // console.log('渲染地图:' + from, name)

  //自己选的地区才加颜色
  data.forEach(v => {
    if (from == 'province') {
      if (v.name == area_global[0].province.name) {
        if (noneProvince.indexOf(v.name) == -1) {
          //不是台湾 香港 澳门
          //省
          if (area_global[0].city.length > 0) {
            v.selected = true
            v.itemStyle = {
              emphasis: {
                color: '#f5f5dc'
              }
            }
          } else {
            v.selected = false
          }
        } else {
          //省
          v.selected = true
          v.itemStyle = {
            emphasis: {
              color: '#f5f5dc'
            }
          }
        }
      }
      if (
        v.name == area_global[0].province.name &&
        area_global[0].city.length > 0
      ) {
        //省
        v.selected = true
        v.itemStyle = {
          emphasis: {
            color: '#f5f5dc'
          }
        }
      }
    }
    if (from == 'city') {
      let city = []
      area_global[0].city.forEach(element => {
        if (noneCities.indexOf(current_province) > -1) {
          city = element.local //直辖市
        } else {
          city.push(element.name)
        }
      })
      if (city.indexOf(v.name) > -1) {
        v.selected = true
        v.itemStyle = {
          emphasis: {
            color: '#f5f5dc'
          }
        }
      }
    }
    if (from == 'distinct') {
      let distinct = []
      area_global[0].city.forEach(element => {
        if (element.name == current_city) {
          distinct = element.local
        }
      })
      if (distinct.indexOf(v.name) > -1) {
        v.selected = true
        v.itemStyle = {
          emphasis: {
            color: '#f5f5dc'
          }
        }
      }
    }
  })
  myChart.setOption(
    {
      title: {
        text: name + '地图',
        textStyle: {
          color: '#45a4fc',
          fontSize: 20
        },
        subtext: '请选择' + subtext + '(提示：可通过鼠标放大或拖动地图)',
        left: 'center',
        subtextStyle: {
          fontSize: 15,
          color: '#333'
        }
      },
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'red' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'blue' // 100% 处的颜色
          }
        ],
        global: true // 缺省为 false
      },
      tooltip: {
        trigger: 'item',
        formatter: function(param) {
          var name = param.name
          return name
        }
      },
      series: [
        {
          type: 'map',
          map: name,
          // selectedMode:  chinaName =='中华人民共和国' ? 'single' : 'multiple',
          // selectedMode: 'multiple',
          zoom: 1, //当前视角的缩放比例
          roam: true, //是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 5
          },

          label: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },

          itemStyle: {
            normal: {
              label: { show: true },
              areaColor: 'rgba(23, 27, 57,0)',
              borderColor: '#fff',
              color: '#9fd7dd',
              areaColor: '#9fd7dd',
              borderWidth: 1
            },
            emphasis: {
              label: { show: true }
            }
          },
          data: data
        }
      ]
    },
    true
  )

  if (flag) {
    //往mapStack里添加parentId，parentName,返回上一级使用
    mapStack.push({
      mapId: parentId,
      mapName: parentName
    })
    parentId = id
    parentName = name
  }
}

function initMapData(mapJson) {
  var mapData = []
  for (var i = 0; i < mapJson.features.length; i++) {
    mapData.push({
      name: mapJson.features[i].properties.name,
      adcode: mapJson.features[i].properties.adcode,
      childrenNum: mapJson.features[i].properties.childrenNum
    })
  }
  return mapData
}
</script>

<style lang="less" scoped>
#mapBox {
  height: 825px;
  position: relative;
}
.btns {
  position: absolute;
  bottom: 0;
  left: 50%;
}
.selectedArea {
  text-align: left;
  // font-size: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
  width: 100%;
  height: 10vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 10vh;
}
.box {
  position: absolute;
  width: 100%;
  height: 80vh;
  // top: 10%;
}

.cityAll {
  position: absolute;
  right: 40%;
  top: 3px;
}
.distinctAll {
  position: absolute;
  right: 8%;
  top: 3px;
}
.otherDistinct {
  position: absolute;
  right: 10px;
  top: 100px;
}
#provinceMap {
  display: inline-block;
  width: 650px;
  height: 700px;
}
#cityMap,
#distinctMap {
  display: inline-block;
  width: 550px;
  height: 700px;
}

.chart {
  position: relative;
  height: 90%;
  //   top: 10%;
}
.backBtn {
  position: absolute;
  top: 0;
  background-color: #00c298;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei;
  font-size: 1em;
  cursor: pointer;
}
.myBlog {
  position: absolute;
  top: 2px;
  right: 5%;
  display: block;
  border: 2px solid #262a53;
}
.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: -5px 5px auto auto;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 5%;
  line-height: 100%;
  left: 0;
  bottom: 0%;
  text-align: center;
}
.delIcon {
  color: red;
  cursor: pointer;
}
</style>
