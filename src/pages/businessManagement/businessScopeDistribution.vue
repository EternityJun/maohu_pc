<template>
    <div>
        <!-- <body-top></body-top>
        <headMenu :index="'/businessScopeDistribution'"></headMenu> -->
        <el-row>
            <h3 class="title">企业经营业务范畴分布</h3>
        </el-row>
        <el-row class="content">
             <p class="company-name">{{gsmc}}</p>
            <div class="echart-wrapper" id="echart-wrapper" v-show="dataList.length > 0"></div>
            <p class="no-data" v-if="dataList.length === 0">暂无数据</p>
            <div class="clearfix"></div>
            <ul class="desc">
                <li>我们无法保证数据的完全准确性，以及对提供的内容或信息负责，也不对您因使用或参考该内容或信息而造成的损失负责。</li>
            </ul>
        </el-row>
        <div v-if="isShow">
            <el-dialog width="90%" :title="typeName + '—项目详情'" :visible.sync="isShow" top="50px">
                <project-brief-with-money :name="typeName" :gsId="gsId" />
            </el-dialog>
        </div>
    </div>
</template>

<script>
import projectBriefWithMoney from './businessComponents/projectBriefWithMoney'
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
      typeName: '',
      loading: false,
      isShow: false,
      gsId: '0', // 应该从上一个页面获取
      dataList: [],
      titleList: [],
      loadingInstance: null
    }
  },
  mounted() {
    this.gsId = this.$route.query.gs_id || this.$store.state.userInfo.gs_id
    this.source = this.$route.query.source
    // 获取企业经营业务范畴分布数据
    let contentDiv = document.getElementsByClassName('content')[0]
    this.loadingInstance = Loading.service({
      target: contentDiv
    })
    this.handleCatgory()
    this.getCompBase() //基本信息
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
    // 获取企业经营业务范畴分布数据
    handleCatgory() {
      this.axios.post(
        '/firm/statistics_manage/category',
        { gs_id: this.gsId },
        data => {
          if (data.status === 'success') {
            this.dataList = data.list
            if (data.list.length > 0) {
              this.titleList = data.list.map((item, index) => {
                return item.name
              })
            }
            this.loadingInstance.close()
            // 渲染饼图
            this.handleShowEchart()
          } else {
            // this.$message.error(data.message);
            this.dataList = []
            this.loadingInstance.close()
          }
        }
      )
    },
    // 饼图
    handleShowEchart() {
      let that = this
      var my_echart = this.$echarts.init(
        document.getElementById('echart-wrapper')
      )

      let option = {
        title: {
          text: '业务分布',
          left: 'center'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        color: [
          '#f6da22',
          '#bbe2e8',
          '#E0959A',
          '#2AC8CA',
          '#B7A3DF',
          '#639FA9',
          '#C4CBD1'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        legend: {
          orient: 'vertical',
          left: 'left',
          data: that.titleList // 接口获取
        },
        series: [
          {
            name: '业务分布',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: that.dataList,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      my_echart.setOption(option)

      that.loadingInstance.close()

      my_echart.on('click', function(params) {
        that.typeName = params.name
        that.isShow = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
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

  .echart-wrapper {
    height: 400px;
    min-width: 600px;
    width: 650px;
    margin: 50px auto;
    float: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    background: transparent;
  }
  .desc {
    // margin: 20px auto;
    width: 733px;
    // margin: 0 auto;
     position: absolute;
  bottom: 0px;
    left: 50%;
    margin-left: -367px;
    li {
      list-style: disc inside;
      line-height: 20px;
      font-size: 13px;
      color: #a6a6a6;
    }
  }
}
</style>


