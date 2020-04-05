<template>
  <div class="affiliated-wrapper">
    <body-top></body-top>
    <div class="title_bar">
      <el-row type="flex" style="width:500px;" justify="space-between">
        <el-col class="title_bar_font" :span="8">
          <span>中标关联公司</span>
        </el-col>
        <el-col :span="16">
          <el-input
            class="input"
            placeholder="点击选择公司"
            readonly
            @focus="handleClickInput"
            v-model="selInput"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="input-wrapper">
            <el-row>
                <el-col :span="6">
                    <el-input class="input" placeholder="点击选择公司" readonly @focus="handleClickInput" v-model="selInput"></el-input>
                </el-col>
            </el-row>
    </div>-->
    <!-- <el-row>
            <el-col :span="24">
                <div class="top">
                    <span>中标关联公司</span>
                    <input readonly @click="handleClickInput" v-model="selInput" placeholder="点击选择公司" />
                </div>
            </el-col>
    </el-row>-->
    <div v-if="isClick" class="affiliated-content">
      <el-dialog width="90%" title="选择公司" :visible.sync="isClick">
        <dialog-company-list @handleGiveChildData="giveChild" />
      </el-dialog>
    </div>
    <div class="affiliated-content aff-content">
      <el-row type="flex" justify="center" style="margin-top: 100px;" v-show="!companyId">
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <p class="color-common one-tip">请点击左上角选择企业</p>
            </el-col>
            <el-col :span="24">
              <p class="color-common two-tip">查看对应关联的企业</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-show="companyId && companyList.length > 0" type="flex" justify="space-between">
        <div style="width: 500px;">
          <el-table :data="companyList" border height="600" v-loading="loading">
            <el-table-column label="序号" width="60" align="center">
              <template slot-scope="scope">
                <p style="text-align: center;">{{scope.row.sort}}</p>
              </template>
            </el-table-column>
            <el-table-column property="company_name" label="公司名称" align="center"></el-table-column>
            <el-table-column property="counts" label="相遇次数" width="120" align="center"></el-table-column>
            <el-table-column label="查看数据" width="120" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="width: 600px;margin-left: 50px;">
          <div id="countShow" style="width:600px;height:600px;"></div>
        </div>
      </el-row>
      <el-row
        type="flex"
        justify="center"
        style="margin-top: 100px;"
        v-show="companyId && companyList.length === 0"
      >
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <p class="color-common one-tip">请重新选择</p>
            </el-col>
            <el-col :span="24">
              <p class="color-common two-tip">该企业暂无关联公司</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dialogCompanyList from './affiliatedCompany/dialogCompanyList'
import { Loading } from 'element-ui'
export default {
  components: {
    dialogCompanyList
  },
  data () {
    return {
      selInput: '',
      isClick: false,
      companyId: '',
      companyList: [],
      loading: false,
      companyName: [],
      counts: [],
      loadingInstance: null,
      role: {}
    }
  },
  created () {
    document.title = '中标关联公司'
    this.fn_role()
  },
  mounted () {
    // this.handleAffiliatedCompany()
    // this.handleShowEcharts()
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
    // 查询中标关联公司列表
    handleAffiliatedCompany () {
      this.axios.post(
        '/index/statistics_bid/bidList',
        { gs_id: this.companyId },
        data => {
          if (data.status === 'success') {
            this.companyList = data.list.map((item, index) => {
              return {
                ...item,
                sort: index + 1
              }
            })

            this.companyName = data.list.map((item, index) => {
              return item.company_name
            })

            this.counts = data.list.map((item, index) => {
              return item.counts
            })

            // 渲染echarts图表
            this.handleShowEcharts()
          } else {
            this.companyList = []
            this.counts = []
            this.loadingInstance.close()
          }

          this.loading = false
        }
      )
    },
    //  点击input框 弹出dialog窗
    handleClickInput () {
      console.log('11111111111')
      this.isClick = true
    },
    // 点击弹出窗表格 选择按钮 与子组件通信函数 取得子组件公司id
    giveChild (data) {
      // 关闭弹窗
      this.isClick = false

      this.loading = true
      let contentDiv = document.getElementsByClassName('aff-content')[0]
      this.loadingInstance = Loading.service({
        target: contentDiv
      })

      // 子组件得来的id
      this.companyId = data.gs_id
      this.selInput = data.gsmc

      // 查询中标关联公司列表
      this.handleAffiliatedCompany()
      //
    },
    // 点击表格操作按钮 查看
    handleClick (row) {
      // 跳转页面
      if (this.role.company_role !== 'C') {
        let { href } = this.$router.resolve({
          path: `/gsDetail?gs_id=${row.gs_id}&gsmc=${
            row.company_name
          }`
        })
        window.open(href, '公司详情' + row.gs_id)
      } else {
        this.axios.post('/index/mine/roleCompSource', { gs_id: row.gs_id }, res => {
          // 获取跳转页面结果
          console.log(res)
          if (res === '四川省建设厅') {
            let { href } = this.$router.resolve({
              path: `/gs_scjst?gs_id=${row.id}`
            })
            window.open(href, '/gs_scjst' + row.id)
          } else {
            let { href } = this.$router.resolve({
              path: `/gs_building?gs_id=${row.id}`
            })
            window.open(href, '/gs_building' + row.id)
          }
        })
      }
    },
    // 渲染页面右侧柱状图
    handleShowEcharts () {
      let that = this
      let myChart = this.$echarts.init(
        document.getElementById('countShow')
      )
      let option = {
        title: {
          text: '公司相遇次数',
          subtext: '',
          textStyle: {
            fontSize: '15'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          // 坐标系位置、坐标系内网格等操作
          bottom: 150,
          right: 30,
          containLabel: true
        },
        legend: {
          data: ['关联业绩数量'],
          textStyle: {
            color: '#2EC7C9'
          },
          selectedMode: false
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          },
          right: 20
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            data: that.companyName,
            axisLabel: {
              textStyle: {
                color: '#000000'
              },
              interval: 0, // 间隔为0，防止下标隔一个显示一个
              rotate: 60
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#000000'
              }
            }
          }
        ],
        series: [
          {
            name: '关联业绩数量',
            type: 'bar',
            data: that.counts, // 相同业绩个数
            itemStyle: {
              normal: {
                label: { show: true, position: 'outside' }, // 柱状图上数字位置
                color: ' #2EC7C9' // 刚才说的图例颜色设置
              }
            }
          }
        ]
      }
      // 指定图标的配置项和数据
      myChart.setOption(option)

      that.loadingInstance.close()

      // 点击柱状图切换事件
      myChart.on('click', function (params) {
        let index = params.dataIndex
        let companyName = params.name ? params.name : '暂无公司名称'
        let curCompanyId = that.companyList[index].gs_id
        let curCompareId = that.companyList[index].compare_id
        let { href } = that.$router.resolve({
          path: `/companyProject?company_name=${companyName}&company_id=${curCompanyId}&compare_id=${curCompareId}`
        })
        window.open(href, '公司项目' + curCompanyId)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.affiliated-wrapper {
  min-width: 1000px;
  padding: 20rpx;
  box-sizing: border-box;
  cursor: default;

  .title_bar {
    width: 1200px;
    margin: 0 auto;
    height: 38px;
    padding-top: 30px;
    .title_bar_font {
      font-size: 20px;
    }
  }

  .input-wrapper {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
  }

  .top {
    padding: 0 0 5px 10px;
    font-size: 16px;
    font-weight: bold;
    margin: 30px 30px 10px;
    line-height: 28px;
    border-bottom: 1px dotted #df4744;

    span {
      color: #df4744;
    }

    input {
      border-radius: 4px;
      height: 24px;
      display: inline-block;
      padding: 0 6px;
      width: 300px;
      border: 1px solid #95b8e7;
    }
  }

  .affiliated-content {
    width: 1200px;
    margin: 20px auto;
    box-sizing: border-box;
  }

  .color-common {
    color: #ccc;
    text-align: center;
  }

  .one-tip {
    font-size: 18px;
  }

  .two-tip {
    font-size: 22px;
  }
}
</style>
