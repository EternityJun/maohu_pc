<template>
  <div id="modelBid2">
    <el-row class="title">
      <el-col :span="2">
        <div>
          <h1>模型二</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-form ref="form" :model="model" label-width="115px" @submit.native.prevent>
            <el-form-item label="模型名称">
              <el-input @blur="saveOffer2" v-model="model.name" style="width:302px"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

    </el-row>
    <!-- <el-row>
            <el-col :span="24" class="title">
                <el-input v-model="name" placeholder="请输入模型名称"></el-input>
            </el-col>
        </el-row> -->
    <el-row>
      <el-col :span="16">
        <div class="cardBox">
          <el-card class="box-card" v-for="(item,index) in cards" :key="index">

            <div slot="header" class="clearfix">
              <span>{{item.title}}</span>
              <el-button v-if="index>0" @click="delCard(index)" style="float: right; padding: 0px 0 3px 0" type="text">删除</el-button>
            </div>
            <div class="cardContent">
              <el-row v-for="(item1,index1) in item.group" :key="index1" class="item">
                <el-col :span="4" style="line-height:40px;text-align:center;font-size:13px  ">{{item1.name}}</el-col>
                <el-col :span="16">
                  <el-input v-model="item1.value" placeholder="请输入值" @input="count_average('average',item1)"></el-input>
                </el-col>
                <el-col :span="4" style="line-height:40px;text-align:center;cursor:pointer;display:inline-block;height:100%;">
                  <span v-if="index1==(item.group.length-1)" @click="addRow(item1,index1)" style="display:inline-block;height:100%;width:100%;">+</span>
                  <span v-else @click="delRow(item1,index1)" style="display:inline-block;height:100%;width:100%;">-</span>
                </el-col>

              </el-row>
              <el-row v-if="item.group.length==0" style="text-align:center;line-height:300px;font-size:30px;cursor:pointer;color:gray;">
                <el-col :span="24">
                  <span @click="addRow(item,-1,'new')">+</span>
                </el-col>
              </el-row>
            </div>
            <div class="cardBottom">
              <el-row>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8" class="count_average">家数</el-col>
                    <el-col :span="14">
                      <el-input class="count_average_input" @input="fn_count_average(item,'count')" v-model="item.count" placeholder></el-input>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="8" class="count_average">均值</el-col>
                    <el-col :span="16">
                      <el-input v-model="item.average" class="count_average_input" placeholder @input="fn_average(item,'average')"></el-input>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card default-card">
            <div class="flex" @click="addCard">
              <div>
                <p>+</p>
                <p>添加数组</p>
              </div>
            </div>
          </el-card>
          <el-card class="box-card default-card">
            <div slot="header" class="clearfix">
              <span>点位</span>
            </div>
            <div class="flex">
              <div>
                <p class="avg_dianwei">平均值：{{form.allAvg}}</p>
                <p class="avg_dianwei">双低值：{{form.allXf}}</p>
              </div>
            </div>
          </el-card>
        </div>
        <!-- <el-row class="dianwei">
          <el-col :span="24">
            <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="区间">
                <el-input style="width:213px;" v-model="form.min_range" placeholder></el-input>
              </el-form-item>
              <el-form-item>-</el-form-item>
              <el-form-item label>
                <el-input style="width:213px;" v-model="form.max_range" placeholder></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="fn_average">确定</el-button>
                <el-button @click="fn_average('cancel')">清除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row> -->
        <el-row class="dianwei">
          <el-col :span="24">
            <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="点位">
                <el-input style="width:213px;" v-model="form.min_xf" placeholder></el-input>
              </el-form-item>
              <el-form-item>-</el-form-item>
              <el-form-item label>
                <el-input style="width:213px;" v-model="form.max_xf" placeholder></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="fn_countXf()">计算</el-button>
                <el-button @click="fn_countXf('cancel')">清除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row class="dianwei">
          <el-col :span="24">
            <el-form :inline="true" :model="form" class="demo-form-inline" @submit.native.prevent>
              <el-form-item label="总家数">
                <el-input style="width:130px;" v-model="form.all_count" readonly></el-input>
              </el-form-item>
              <el-form-item label="平均值">
                <el-input style="width:130px;" v-model="form.all_average" readonly></el-input>
              </el-form-item>
              <el-form-item label="双低值">
                <el-input style="width:130px;" v-model="form.all_xf" readonly></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getEchart">打点</el-button>
                <el-button @click="onSubmit">清除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:10px;">
          <el-col>点位矩阵</el-col>
        </el-row>
        <div>
          <el-row v-for="(item,index) in matrix" :key="index" style="margin-bottom:10px;">
            <el-col :span="1">
              <span style="line-height:29px;">{{index+1}}.</span>
            </el-col>
            <el-col :span="21" class="yc">
              <div @click="resetData(item)">
                <span v-for="(item1,index1) in item.value" :key="index1" class="span">{{item1.name}}({{item1.count}}、{{item1.average}})</span>
                <span style="margin-left:15px;">{{item.total.name}}({{item.total.count}}、{{item.total.value}})</span>
                <span class style="margin-left:15px;">{{item.twoLwo.name}}: {{item.twoLwo.value}}</span>
              </div>

            </el-col>
            <el-col :span="2">
              <el-button type="danger" size="mini" @click="delMatrix(item)">删除</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div id="myChart" style="height:500px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/scatter')
require('echarts/lib/component/markLine')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { formatNum } from '../store/formatter.js'
import { getCompanyNumber } from '../store/getnumber.js'
export default {
  data() {
    return {
      model: {
        name: ''
      },
      name: '',
      offer_id: this.$route.query.offerid,
      one_id: 1,
      cards: [
        {
          icon: 'A',
          title: '数组A',
          // group: [{ icon: 'A', name: 'A1', value: 0 }],
          group: [],
          // count: 1,
          count: 0,
          average: 0
        }
      ],
      form: {
        all_count: 0, //总家数
        all_average: 0, //总平均值
        all_xf: 0, //总双低
        allXf: 0, //点位 不计算区间
        allAvg: 0, //平均值 不计算区间
        min_xf: '', //点位最小值
        max_xf: '', //点位最大值
        min_range: '', //区间最小值
        max_range: '' //区间最大值
      },
      echartData: [], //echarts
      matrix: [
        {
          value: [
            { name: '预测A', count: 1, average: 15 },
            { name: '预测B', count: 1, average: 98 }
          ],
          total: { name: '总计', count: 2, value: 90 },
          twoLwo: { name: '双低值', value: 90 }
        }
      ],
      random_arr: []
    }
  },
  created() {
    document.title = '投标模型2'
    this.getOffer2(1)
    this.getOffer2(3)
    // console.log(getCompanyNumber(80.56, 80, 81, 5));
  },
  mounted() {
    // console.log(this.$store.state.userInfo,233)
  },
  methods: {
    // 计算随机数
    computeRandom(num, avg, min, max) {
      if (arguments.length < 4) {
        alert('参数格式不正确')
        return []
      }
      let fudong = formatNum((avg - min) * num, 2)
      let sum = 0
      for (let i = 0; i < num; i++) {
        this.random_arr.push(this.randomNum(0, 1,min,max) - 0+min)
      }
      this.random_arr.forEach(element => {
        sum += element - 0
      })
      if (sum != num * avg) {
        this.random_arr = []
        this.computeRandom(num, avg, min, max)
      }
    },
    randomNum(minFudong, maxFudong, min,max) {
      // console.log(minFudong, maxFudong, min,max)
      let num = Math.random() * (maxFudong - minFudong) 
      // console.log(num) 
      num = formatNum(num,2)
      return num
    },
    resetData(item) {
      this.cards = []
      item.value.forEach(element => {
        let groups = {
          icon: 'A',
          name: 'A1',
          value: 0
        }
        let item1 = {
          icon: element.name.charAt(element.name.length - 1),
          title: element.name,
          group: [],
          count: element.count,
          average: element.average
        }
        for (let i = 0; i < item1.count; i++) {
          item1.group.push({
            icon: item1.icon,
            name: item1.icon + (i + 1),
            value: 0
          })
        }
        this.cards.push(item1)
      })
      this.cards.forEach(element => {
        this.fn_average(element)
      })
    },
    saveOffer2() {
      let self = this
      let params = {
        'main[id]': self.offer_id,
        'main[user_id]': self.$store.state.userInfo.user_id,
        'main[name]': self.model.name
      }
      self.axios.post(`/index/Offer_Model/saveOffer2`, params, data => {})
    },
    getOffer2(cate) {
      let self = this
      let params = {
        cate,
        offer_id: self.offer_id
      }

      self.axios.post(`/index/Offer_Model/getOffer2`, params, data => {
        if (cate == 1) {
          self.model.name = data.rows.name
        } else if (cate == 3) {
          //矩阵数据
          if (data.status == 'success') {
            self.one_id = data.max_arr_id + 1
            let matrix = []
            let echartData = []
            data.rows.forEach((el1, i1) => {
              let obj = {
                arr_id: el1.arr_id,
                value: [],
                total: {},
                twoLwo: {}
              }
              el1.point.forEach((el2, i2) => {
                let obj2 = {
                  name: '预测' + String.fromCharCode(65 + i2),
                  count: el2[0],
                  average: el2[1]
                }
                obj.value.push(obj2)
              })
              obj.total = {
                name: '总计',
                count: el1.total[0][0],
                value: el1.total[0][1]
              }
              obj.twoLwo = {
                name: '双低值',
                value: el1.low
              }
              matrix.push(obj)
              let array_total = [el1.total[0][0], el1.low, el1.total[0][1]]
              echartData.push(array_total)
            })
            self.matrix = matrix
            self.echartData = echartData
            self.fn_mycharts()
          } else {
            self.matrix = []
          }
        }
      })
    },
    onSubmit() {},
    fn_countXf(type) {
      if (type == 'cancel') {
        this.form.min_xf = ''
        this.form.max_xf = ''
      }
      let a_number = this.form.min_xf - 0
      let b_number = this.form.max_xf - 0

      if (a_number && b_number) {
        if (a_number > b_number) {
          let a = a_number
          a_number = b_number
          b_number = a
        }
      } else {
        if (a_number) {
          b_number = Infinity
        } else if (b_number) {
          a_number = -Infinity
        } else {
          b_number = Infinity
          a_number = -Infinity
        }
      }
      //拿满足的数据
      let cards = this.cards
      let all_jia = 0 //总家数
      let all_jia2 = 0 //总家数
      let allmean = 0 //和
      let allmean2 = 0 //和
      cards.forEach((el, i) => {
        let obj = {
          offer_id: this.offer_id,
          arr_id: this.one_id //????
        }
        let quote_ = [],
          quote2_ = []
        el.group.forEach((el2, i2) => {
          let val = el2.value
          if (val) {
            if (a_number <= val && val <= b_number) {
              quote_.push(val - 0)
              allmean += formatNum(val - 0, 2) - 0
            }

            quote2_.push(val - 0)
            allmean2 += formatNum(val - 0, 2) - 0
          }
        })
        if (quote_.length > 0) {
          //满足条件
          let sum = quote_.reduce(function(prev, cur, index, array) {
            return prev + cur
          })
          obj.total = quote_.length
          obj.avg = formatNum(sum / quote_.length, 2)
          obj.quote = quote_.join(',')
          all_jia += quote_.length
        }
        if (quote2_.length > 0) {
          //满足条件
          all_jia2 += quote2_.length
        }
      })
      this.form.all_count = all_jia
      this.form.all_average = all_jia ? formatNum(allmean / all_jia, 2) : 0
      this.form.all_xf = all_jia ? formatNum(0.95 * allmean / all_jia, 2) : 0
      this.form.allXf = allmean2 ? formatNum(0.95 * allmean2 / all_jia2, 2) : 0
      this.form.allAvg = allmean2 ? formatNum(allmean2 / all_jia2, 2) : 0
    },
    delCard(index) {
      // console.log("能不能删除数组");
      let cards = this.cards
      cards.splice(index, 1)
      this.cards = cards
      this.count_average('addCard')
    },
    addCard() {
      let length = this.cards.length + 1
      if (length > 26) {
        return
      }
      let letters = String.fromCharCode(64 + parseInt(length))
      let obj = {
        icon: letters,
        title: `数组${letters}`,
        group: [],
        // group: [{ icon: `${letters}`, name: `${letters}1`, value: 0 }],
        // count: 1,
        count: 0,
        average: 0
      }
      this.cards.push(obj)
      // this.count_average("addCard");
    },
    addRow(item, index, type) {
      console.log(item)
      let obj = {}
      if (type == 'new') {
        obj = {
          icon: `${item.icon}`,
          name: `${item.icon}${index + 2}`,
          value: 0
        }
      } else {
        obj = {
          icon: `${item.icon}`,
          name: `${item.icon}${index + 2}`,
          value: 0
        }
      }

      let cards = this.cards
      cards.forEach(element => {
        if (element.icon == item.icon) {
          element.group.push(obj)
        }
      })
      this.cards = cards
      this.count_average('count', item)
    },
    delRow(item, index) {
      let cards = this.cards
      let ele_index = ''
      cards.forEach(element => {
        if (element.icon == item.icon) {
          element.group.forEach((element1, index1) => {
            if (element1.name == item.name) {
              ele_index = index1
            }
          })
          element.group.splice(ele_index, 1)
        }
      })
      this.cards = cards
      this.re_formatter_row(item, index)
      this.count_average('count', item)
    },
    re_formatter_row(item, index) {
      let cards = this.cards
      cards.forEach(element => {
        if (element.icon == item.icon) {
          element.group.forEach((element1, index1) => {
            element1.name = element1.icon + (index1 + 1)
          })
        }
      })
      this.cards = cards
    },
    count_average(type, item) {
      let cards = this.cards
      let all_count = 0,
        all_count2 = 0
      let all_value = 0,
        all_value2 = 0
      let min_xf = this.form.min_xf || -Infinity
      let max_xf = this.form.max_xf || Infinity
      cards.forEach(element => {
        if (type != 'addCard') {
          if (element.icon == item.icon) {
            element.count = element.group.length
            let count = 0
            for (let i = 0; i < element.group.length; i++) {
              count += formatNum(element.group[i].value - 0, 2) - 0
            }
            if (type != 'count') {
              let average = formatNum(count / element.count, 2)
              element.average = average
            }
          }
        }
        // 计算打点的总家数，平均值，双低值
        let quote_ = []
        let quote2_ = []

        for (let i = 0; i < element.group.length; i++) {
          if (
            element.group[i].value >= min_xf &&
            element.group[i].value <= max_xf
          ) {
            quote_.push(element.group[i].value - 0)
            all_value += element.group[i].value - 0
          }
          quote2_.push(element.group[i].value - 0)
          all_value2 += element.group[i].value - 0
        }
        if (quote_.length > 0) {
          //满足条件
          all_count += quote_.length
        }
        if (quote2_.length > 0) {
          //满足条件
          all_count2 += quote2_.length
        }
        this.form.all_count = all_count
      })
      // console.log('count:'+all_count,'value:'+all_value)
      // console.log(all_value/all_count)
      this.form.all_average = all_count
        ? formatNum(all_value / all_count, 2)
        : 0
      this.form.all_xf = all_count
        ? formatNum(0.95 * all_value / all_count, 2)
        : 0
      this.form.allXf = all_count2
        ? formatNum(0.95 * all_value2 / all_count2, 2)
        : 0
      this.form.allAvg = all_count2 ? formatNum(all_value2 / all_count2, 2) : 0
      // console.log('平均值：'+(formatNum(all_value / all_count),2))
      // console.log('count:'+this.form.all_average,'value:'+this.form.all_xf)

      this.cards = cards
    },
    // 修改家数和均值
    fn_count_average(item, type) {
      // console.log("修改家数和均值");
      let cards = this.cards
      let group_length = 0
      let pass = true
      cards.forEach(element => {
        if (element.icon == item.icon) {
          // if (element.count > 0 && element.count < 1000) {
          if (element.count < 1000) {
            pass = true
            group_length = element.group.length
          } else {
            this.$message.error('请数入0-1000的数字')
            pass = false
          }
        }
      })
      if (!pass) return
      cards.forEach(element => {
        if (element.icon == item.icon) {
          if (element.count > group_length) {
            //添加数据
            for (let index = 0; index < element.count - group_length; index++) {
              element.group.push({
                icon: element.icon,
                name: element.icon + (element.group.length + 1),
                value: 0
              })
            }
          } else {
            //删除数据
            let differ = group_length - element.count
            element.group.splice(element.count, differ)
          }
        }
      })
      // console.log(JSON.stringify(item), type);
      this.cards = cards
      this.fn_average(item)
    },
    fn_average(item) {
      let self = this
      if (item == 'cancel') {
        // console.log("清除之后要重新算input的值？");
        this.form.min_range = ''
        this.form.max_range = ''
        return
      }
      console.log('修改均值')
      //修改均值 计算card每个input的值
      let min_range = this.form.min_range || 0
      let max_range = this.form.max_range || 0
      if (isNaN(min_range) || isNaN(max_range)) {
        this.$message.error('随机区间应该是数字，请修改')
        return
      }
      let cards = this.cards
      // if (max_range < min_range) {
      //   this.$message.error('随机区间最小值应该小于最大值，请修改')
      //   return
      // }
      cards.forEach(element => {
        let number = []
        if (element.average == min_range || element.average == max_range) {
          element.group.forEach((element2, i2) => {
            element2.value = element.average
          })
        } else {
          if (
            element.average.toString().charAt(element.average.length - 1) == '.'
          ) {
            return
          }
          let min_ = 0
          let max_ = 0
          let is_decimal = (element.average + '').indexOf('.') //小数
          let floor_value = Math.floor(element.average) //向下取整
          if (parseInt(element.average) == element.average) {
            //整数
            min_ = formatNum(element.average - 0.5, 2)
            max_ = formatNum(element.average - 0 + 0.5, 2)
          } else {
            //小数
            min_ = formatNum(floor_value, 2)
            max_ = formatNum(floor_value - 0 + 1, 2)
          }
          if (min_range) {
            //有最小区间
            min_ = min_range
          }
          if (max_range) {
            //有最小区间
            max_ = max_range
          }

          console.log(
            '=======',
            element.average,
            formatNum(element.average - 0, 2),
            min_ - 0,
            max_ - 0,
            element.group.length
          )
          let number = getCompanyNumber(
            formatNum(element.average - 0, 2),
            min_ - 0,
            max_ - 0,
            element.group.length
          )
          // this.computeRandom(
          //   element.group.length,
          //   formatNum(element.average - 0, 2),
          //   min_ - 0,
          //   max_ - 0
          // )
          if (element.icon == item.icon) {
            element.group.forEach((element2, i2) => {
              // element2.value = this.random_arr[i2]
              element2.value = number[i2]
            })
          }
        }
      })
      this.cards = cards
      this.count_average('addCard', item)
    },
    delMatrix(item) {
      //删除点位矩阵
      // console.log(JSON.stringify(item));
      this.axios.post(
        `/index/Offer_Model/delOffer2`,
        { arr_id: item.arr_id, offer_id: this.offer_id },
        data => {
          if (data.status == 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getOffer2(3)
          } else {
            this.$message.error('删除失败,稍后重试')
          }
        }
      )
    },
    getEchart() {
      //点击打点 得到点位矩阵
      let self = this
      let cards = this.cards
      let min_xf = this.form.min_xf || 0
      let max_xf = this.form.max_xf || Infinity
      let matrix = []
      let matrix_save = []
      // console.log(JSON.stringify(cards));
      // 计算出值在点位之间的数据，平均值，双低值
      cards.forEach((element, i) => {
        let count = 0 //满足的家数
        let value = 0 //满足的总和
        let quote = [] //满足的值数组
        let avg = 0 //满足的平均值
        element.group.forEach(element2 => {
          if (element2.value >= min_xf && element2.value <= max_xf) {
            //输入框的值在点位之间
            count += 1
            value += element2.value - 0
            quote.push(element2.value)
          }
        })
        if (value > 0) {
          let average = formatNum(value / count, 2)
          matrix.push({
            name: '预测' + element.icon,
            count: count,
            average: average
          })
          matrix_save.push({
            offer_id: self.offer_id,
            arr_id: self.one_id,
            total: count,
            avg: element.average,
            quote: quote.join(',')
          })
        }
      })
      let obj = {
        value: matrix,
        total: {
          name: '总计',
          count: this.form.all_count,
          value: this.form.all_average
        },
        twoLwo: { name: '双低值', value: this.form.all_xf }
      }
      // console.log(JSON.stringify(matrix));
      this.matrix.push(obj)
      this.save_dianwei(matrix_save)
    },

    //保存点位
    save_dianwei(matrix_save) {
      //在点位范围内的公司数组+平均值，双低值数组
      let cards = this.cards
      let self = this
      let array_one = []
      if (matrix_save.length > 0) {
        array_one = matrix_save
      }
      let obj2 = {
        offer_id: this.offer_id,
        arr_id: this.one_id,
        total: this.form.all_count,
        avg: this.form.all_average,
        low: this.form.all_xf,
        cate: '总计'
      }
      array_one.push(obj2)
      let data_ajax = {
        sub: array_one
      }
      self.axios.post('/index/Offer_Model/saveOffer2', data_ajax, function(
        data
      ) {
        self.getOffer2(3)
        self.one_id += 1
      })
    },
    fn_mycharts() {
      // console.log(JSON.stringify(this.echartData), "echart---");
      let myChart = echarts.init(document.getElementById('myChart'))
      let self = this
      myChart.setOption({
        title: {
          text: '计算结果分布图',
          subtext: ''
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return (
                '家：' +
                params.value[0] +
                '<br/>' +
                '双低：' +
                params.value[1] +
                '<br/>' +
                '均值：' +
                params.value[2]
              )
            } else {
              return (
                params.name +
                '<br/>' +
                '双低：' +
                params.data.coord[1] +
                '<br/>'
              )
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        xAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            },
            min: 0
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value}'
            },
            splitLine: {
              show: false
            },
            min: 80,
            max: 100
          }
        ],
        series: [
          {
            type: 'scatter',
            data: self.echartData,
            markLine: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }
        ]
      })
    }
  }
}
</script>
<style>
.el-card__header {
  padding: 5px 20px;
  font-size: 13px;
}
.title .el-input__inner {
  /* border: none; */
}
.count_average_input input {
  padding: 0 3px;
  text-align: center;
}
.yc {
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
  cursor: pointer;
}
</style>

<style lang="less" scoped>
#modelBid2 {
  min-width: 1300px;
  padding: 30px 60px;
  //   .title {
  //     text-align: center;
  //     padding-bottom: 10px;
  //     margin-bottom: 20px;
  //     border-bottom: 1px solid #eee;
  //     .el-input {
  //       width: 300px;
  //       font-size: 30px;
  //     }
  //   }
  .title {
    // background-color: gainsboro;
    border-bottom: 1px solid gainsboro;
    margin-bottom: 20px;
    line-height: 40px;
    h1 {
      font-weight: lighter;
    }
  }
  .cardBox {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    .box-card {
      width: 250px;
      //   height: 400px;
      position: relative;
      margin: 0 10px 10px 0;
      .cardContent {
        // background-color: red;
        height: 319px;
        overflow: auto;
        margin-bottom: 20px;
      }
      .item {
        margin: 10px 0;
      }
      .cardBottom {
        // background-color: gray;
        border-top: 1px solid #eee;
        padding-top: 10px;
        .count_average {
          font-size: 13px;
        }
        .el-col-12 {
          line-height: 50px;
        }
      }
      .cardContent::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .cardContent::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: gainsboro;
      }
      .cardContent::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
      }
    }
    .default-card {
      cursor: pointer;
      .flex {
        display: flex;
        height: 400px;
        div {
          margin: auto;
          font-size: 15px;
          text-align: center;
          color: gray;
          .avg_dianwei {
            font-size: 25px;
            margin: 100px 0;
          }
        }
      }
    }
    .dianwei {
      margin-top: 20px;
    }
  }
  .span {
    display: inline-block;
    padding: 0 15px;
    margin-bottom: 5px;
    border-right: 1px solid #409eff;
  }
  //   color: grey;
}
</style>
