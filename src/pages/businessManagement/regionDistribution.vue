<template>
  <div style="">
    <!-- <body-top></body-top>
        <headMenu :index="'/regionDistribution'"></headMenu> -->
    <el-row>
      <h3 class="title">企业经营区域分布</h3>
    </el-row>
    <el-row class="content">
      <p class="company-name">{{gsmc}}</p>
      <el-row v-show="provinceList.length > 0 || cityList.length > 0">
        <div v-show="provinceList.length > 0" style="width:700px;height:500px;" class="left-echart" id="left-echart">

        </div>
        <div v-show="cityList.length > 0" style="width:500px;height:500px;" class="right-echart" id="right-echart">

        </div>
      </el-row>
      <div v-show="provinceList.length === 0 && cityList.length === 0" class="no-data">暂无数据</div>
      <div class="clearfix"></div>
      <ul class="desc">
        <li>我们无法保证数据的完全准确性，以及对提供的内容或信息负责，也不对您因使用或参考该内容或信息而造成的损失负责。</li>
      </ul>
    </el-row>
    <div v-if="isShow">
      <el-dialog width="90%" :title="typeName + '—项目详情'" :visible.sync="isShow" top="50px">
        <project-brief-with-money :name="typeName" :gsId="gsId" :type="type" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import projectBriefWithMoney from './businessComponents/projectBriefWithMoney'
import '../../../node_modules/echarts/map/js/china.js'
import '../../../node_modules/echarts/map/js/province/sichuan.js'
import { Loading } from 'element-ui'
import headMenu from '../template/head_menu.vue'
export default {
  components: {
    projectBriefWithMoney,
    headMenu
  },
  data() {
    return {
      gsmc: '',
      source: '',
      isShow: false,
      typeName: '',
      gsId: '0', // 应该从上个页面获取
      provinceList: [], // 全国数据
      provinceValue: [],
      provinceMax: 0,
      cityList: [], // 入川数据
      cityValue: [],
      cityMax: 0,
      type: 0, // 1-全国 2-四川
      loadingInstance: null
    }
  },
  created() {},
  mounted() {
    this.gsId = this.$route.query.gs_id || this.$store.state.userInfo.gs_id
    this.source = this.$route.query.source
    let contentDiv = document.getElementsByClassName('content')[0]
    this.loadingInstance = Loading.service({
      target: contentDiv
    })
    this.getCompBase() //基本信息
    // 全国 请求企业经营区域分布数据
    this.handleRegionNational()

    // 四川 请求企业经营区域分布数据
    this.handleRegionSiChuan()
  },
  methods: {
    getCompBase() {
      let query_data = {
        gs_id: this.gsId,
        source: this.source
      }
      this.axios.post('/firm/Firm_detail/getCompBase', query_data, data => {
        this.gsmc = data.rows.qymc
      })
    },
    // 全国 请求企业经营区域分布数据
    handleRegionNational() {
      this.axios.post(
        '/firm/statistics_manage/region',
        { gs_id: this.gsId },
        data => {
          if (data.status === 'success') {
            this.provinceList = data.real
            this.provinceValue = data.fake
            this.provinceMax = data.max
            this.handleNationwideDistribution()
          } else {
            // this.$message.error(data.message);
            this.provinceList = []
            this.loadingInstance.close()
          }
        }
      )
    },
    // 四川 请求企业经营区域分布数据
    handleRegionSiChuan() {
      this.axios.post(
        '/firm/statistics_manage/regionCity',
        { gs_id: this.gsId },
        data => {
          if (data.status === 'success') {
            this.cityList = data.real
            this.cityValue = data.fake
            this.cityMax = data.max
            this.handleSiChuanDistribution()
          } else {
            // this.$message.error(data.message);
            this.cityList = []
            this.loadingInstance.close()
          }
        }
      )
    },
    // 全国 企业经营分布
    handleNationwideDistribution() {
      let that = this
      // var maxNum = Math.max.apply(null, this.provinceValue)
      var my_echart = this.$echarts.init(document.getElementById('left-echart'))

      var option = {
        title: {
          text: '企业经营区域分布',
          subtext: '全国',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function(param) {
            //地图: a(系列名称)，b(区域名称)，c(合并数值), d(无)
            var name = param.name
            var res = ''
            that.provinceList.map((item, index) => {
              if (name == item.name) {
                res = '<p>' + name + ' : ' + item.value + ' 个</p>'
              }
            })
            return res
          }
        },
        visualMap: {
          min: 0,
          max: that.provinceMax,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#fff', 'green', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: '地区',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: that.provinceValue
          }
        ]
      }
      my_echart.setOption(option)

      that.loadingInstance.close()

      my_echart.on('click', function(params) {
        that.isShow = true
        that.typeName = params.name
        that.type = 1
      })
    },
    // 四川 企业经营分布
    handleSiChuanDistribution() {
      let that = this
      // 请求接口
      // var maxNum = Math.max.apply(null, this.cityValue)
      var series_data = []
      var my_echart = this.$echarts.init(
        document.getElementById('right-echart')
      )
      var option = {
        title: {
          text: '企业经营区域分布',
          subtext: '四川',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: function(param) {
            //地图: a(系列名称)，b(区域名称)，c(合并数值), d(无)
            var name = param.name
            var res = ''
            that.cityList.map((item, index) => {
              if (name == item.name) {
                res = '<p>' + name + ' : ' + item.value + ' 个</p>'
              }
            })
            return res
          }
        },
        visualMap: {
          min: 0,
          max: that.cityMax,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#fff', 'green', 'yellow', 'orangered']
          }
        },
        series: [
          {
            name: '地区',
            type: 'map',
            map: '四川', //省份汉字
            mapType: 'sichuan',
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: that.cityValue,
            nameMap: {
              // 自定义名称映射
              成都市: '成都',
              自贡市: '自贡',
              攀枝花市: '攀枝花',
              泸州市: '泸州',
              德阳市: '德阳',
              绵阳市: '绵阳',
              广元市: '广元',
              遂宁市: '遂宁',
              内江市: '内江',
              乐山市: '乐山',
              南充市: '南充',
              眉山市: '眉山',
              宜宾市: '宜宾',
              广安市: '广安',
              达州市: '达州',
              雅安市: '雅安',
              巴中市: '巴中',
              资阳市: '资阳',
              阿坝藏族羌族自治州: '阿坝',
              甘孜藏族自治州: '甘孜',
              凉山彝族自治州: '凉山'
            }
          }
        ]
      }
      my_echart.setOption(option)

      // that.loadingInstance.close();

      my_echart.on('click', function(params) {
        that.isShow = true
        that.typeName = params.name
        that.type = 2
      })
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  color: #df4744;
  border-bottom: 1px dotted #df4744;
  width: 90%;
  height: 35px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-top: 30px;
}
.content {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
.no-data {
  width: 100%;
  text-align: center;
  margin: 200px 0;
  font-size: 22px;
  color: #ccc;
}
.company-name {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  font-size: 25px;
}
.left-echart {
  margin: 50px auto;
  width: 60%;
  min-width: 500px;
  height: 500px;
  float: left;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  position: relative;
  background: transparent;
}
.right-echart {
  margin: 50px auto;
  width: 40%;
  min-width: 500px;
  height: 500px;
  float: left;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  position: relative;
  background: transparent;
}
.desc {
  /* margin: 20px auto; */
  width: 733px;
  margin: 0 auto;
  position: absolute;
  bottom: 0px;
  left: 50%;
  margin-left: -367px;
}

.desc li {
  list-style: disc inside;
  line-height: 20px;
  font-size: 13px;
  color: #a6a6a6;
}
</style>


