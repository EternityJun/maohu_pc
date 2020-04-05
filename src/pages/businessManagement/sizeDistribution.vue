<template>
    <div>
        <!-- <body-top></body-top>
        <headMenu :index="'/sizeDistribution'"></headMenu> -->
        <el-row>
            <h3 class="title">企业经营业务规模分布</h3>
        </el-row>
        <el-row class="content">
            <p class="company-name">{{gsmc}}</p>
            <el-row v-show="sizeList.length > 0" style="margin: 50px 0 150px;" class="clearfix">
                <div class="left-echart" id="left-echart">

                </div>
                <div class="right-table">
                    <el-table :data="sizeList" stripe border>
                        <el-table-column property="range" label="范围" align="center"></el-table-column>
                        <el-table-column property="num" label="个数" align="center"></el-table-column>
                        <el-table-column property="money" label="金额" align="center"></el-table-column>
                    </el-table>
                </div>

            </el-row>
            <div v-show="sizeList.length === 0" class="no-data">暂无数据</div>
            <!-- <div v-show="sizeList.length > 0">
                <div id="garden">
                    <p>查看数据</p>
                    <span>2017</span>
                </div>
                <div id="myFooter">
                    <span class="el-icon-arrow-left mySpan"></span>
                    <div id="myChooseYear">
                        <div v-for="(item,index) in dataList" :key="index">
                            <div class="myYuan" :id="yearState == index ?myYuanHover:''" @click="changeYear(item,index)"></div>
                            <p>{{item}}</p>
                        </div>
                    </div>
                    <span class="el-icon-arrow-right mySpan" @click="nextYear"></span>
                    <span class="myLine"></span>
                </div>
            </div> -->
            <div class="switch-list">
                <ul class="clearfix">
                    <li v-for="(item, index) in dateList" :key="index">
                        <span :class="curData == item ? 'diamond active' : 'diamond'" @click="handleClick(item)"></span>
                        <p class="date" @click="handleClick(item)">{{item}}</p>
                        <div :class="curData == item ? 'hover_wrap dis' : 'hover_wrap hover_wrap1'" @click="handleClickLookData(item)">
                            <div class="hover_box">
                                <p>查看数据</p>
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="btn-list">
                    <div class="back-left" @click="handleClickLeftBtn">
                        <i class="el-icon-arrow-left"></i>
                    </div>
                    <div class="back-right" @click="handleClickRightBtn">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
            </div>
            <!-- <div class="switch-list" v-show="sizeList.length > 0">
                <ul class="clearfix">
                    <li v-for="(item, index) in dataList" :key="index">
                        <span :class="curData == item ? 'diamond active' : 'diamond'" @click="handleClick(item)"></span>
                        <p class="date" @click="handleClick(item)">{{item}}</p>
                        <div :class="curData == item ? 'hover_wrap dis' : 'hover_wrap hover_wrap1'" @click="handleClickLookData(item)">
                            <div class="hover_box">
                                <p>查看数据</p>
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="btn-list">
                    <div class="back-left" @click="handleClickLeftBtn"></div>
                    <div class="back-right" @click="handleClickRightBtn"></div>
                </div>
            </div> -->
            <ul class="desc">
                <li>我们无法保证数据的完全准确性，以及对提供的内容或信息负责，也不对您因使用或参考该内容或信息而造成的损失负责。</li>
            </ul>
        </el-row>
        <div v-if="isShow">
            <el-dialog width="90%" :title="typeName + '—项目详情'" :visible.sync="isShow" top="50px">
                <project-brief-with-money :money="money" :gsId="gsId" :curData="curData" :hoverData="hoverData" :type="type" />
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
      graph: [], // 左侧饼图数据
      sizeList: [], // 右侧表格数据
      dataList: [], // 年份列表
      curData: '', // 当前点击的时间
      loading: false,
      typeName: '',
      isShow: false,
      gsId: '0', // 应该从上一个页面获取
      test: '',
      money: '',
      loadingInstance: null,
      hoverData: '',
      type: 0, // 1-点击饼图 2-点击下方时间轴查看数据
      dateList: ['2016', '2017', '2018', '2019', '全部']
    }
  },
  created() {},
  mounted() {
    this.gsId = this.$route.query.gs_id || this.$store.state.userInfo.gs_id
    this.source = this.$route.query.source
    // 获取年份
    let contentDiv = document.getElementsByClassName('content')[0]
    this.loadingInstance = Loading.service({
      target: contentDiv
    })
    this.handleGetYear()
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
    // 获取年份
    handleGetYear() {
      this.axios.post('/firm/statistics_manage/getYear', { num: 4 }, data => {
        if (data.status === 'success') {
          this.dataList = data.list
          if (data.list.length > 0) {
            this.curData = data.list[data.list.length - 1]
          }
          // 请求企业经营业务规模分布数据
          this.loading = true
          this.handleGetScale()
        } else {
          this.$message.error(data.message)
          this.dataList = []
          this.curData = ''
          this.loadingInstance.close()
        }
      })
    },
    // 请求企业经营业务规模分布数据
    handleGetScale() {
      this.axios.post(
        '/firm/statistics_manage/scale',
        {
          gs_id: this.gsId,
          year: this.curData === '全部' ? '' : this.curData
        },
        data => {
          if (data.status === 'success') {
            this.sizeList = data.list
            this.graph = data.graph

            // 渲染左侧饼图
            this.handleShowEchart()
          } else {
            // this.$message.error(data.message);
            this.sizeList = []
            this.graph = []
            this.handleShowEchart()
          }

          this.loading = false
        }
      )
    },
    // 左侧饼图
    handleShowEchart() {
      let that = this
      // 请求数据
      var my_echart = this.$echarts.init(document.getElementById('left-echart'))
      let text = ''
      if (this.curData === '全部') {
        text = this.dataList[0] + '~' + this.dataList[this.dataList.length - 2]
      } else {
        text = this.curData
      }
      let option = {
        title: {
          text: text + '金额分布', // 年分范围 通过接口计算
          left: 'center',
          textStyle: {
            color: 'black',
            fontWeight: 'lighter',
            fontSize: 15
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          },
          right: 20
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
        series: [
          {
            name: '金额分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            selectedMode: 'single',
            data: that.graph,
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
        that.isShow = true
        that.money = params.name
        that.type = 1
        that.typeName = that.curData
      })
    },
    // 点击下方的时间轴 节点
    handleClick(item) {
      this.curData = item
      this.loading = true
      let contentDiv = document.getElementsByClassName('content')[0]
      this.loadingInstance = Loading.service({
        target: contentDiv
      })
      this.handleGetScale()
    },
    // 点击下方时间轴 向前按钮
    handleClickLeftBtn() {
      let index = this.dataList.indexOf(this.curData)
      if (index === 0) {
        // 在第一个时 移动到最后一个
        this.curData = this.dataList[this.dataList.length - 1]
      } else {
        this.curData = this.dataList[index - 1]
      }
      this.loading = true
      let contentDiv = document.getElementsByClassName('content')[0]
      this.loadingInstance = Loading.service({
        target: contentDiv
      })
      this.handleGetScale()
    },
    // 点击下方时间轴 向后按钮
    handleClickRightBtn() {
      let index = this.dataList.indexOf(this.curData)
      if (index === this.dataList.length - 1) {
        // 在最后一个时 移动到第一个
        this.curData = this.dataList[0]
      } else {
        this.curData = this.dataList[index + 1]
      }
      this.loading = true
      let contentDiv = document.getElementsByClassName('content')[0]
      this.loadingInstance = Loading.service({
        target: contentDiv
      })
      this.handleGetScale()
    },
    // 点击下方时间轴 查看数据区域
    handleClickLookData(item) {
      this.isShow = true
      this.hoverData = item
      this.money = ''
      this.type = 2
      this.typeName = item
    }
  }
}
</script>

<style lang="less" scoped>
#garden {
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin: 0 auto;
  // padding: 10px;
  // border: 1px solid blue;
  cursor: pointer;
  border-radius: 50px;
  font-size: 15px;
  color: #45a4fc;
  box-shadow: 0 0 10px #45a4fc;
}
#garden p:first-child {
  margin-top: 35px;
  text-align: center;
}
#garden p {
  text-decoration: underline;
}
#myChooseYear {
  display: flex;
}
#myFooter {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  position: relative;
}
.mySpan {
  height: 40px;
  line-height: 40px;
  color: #45a4fc;
  font-size: 40px;
  cursor: pointer;
}

#myYuanHover {
  // border: #46a4fc solid 2px;
  background: radial-gradient(#ffffff, #45a4fc);
  background-color: #45a4fc;
  box-shadow: 0 0 6px #45a4fc;
}
#myChooseYear p {
  width: 150px;
  text-align: center;
}
.myYuan {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #999;
  margin: 0 auto;
  cursor: pointer;
}
.myTitleYear {
  color: #4bb2ff;
  cursor: pointer;
}
.myLine {
  position: absolute;
  width: 780px;
  border-top: 1px solid #b4dafd;
  top: 20px;
  // left: 270px;
  z-index: -1;
}
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
  .left-echart {
    // margin-left: 50px;
    float: left;
    // min-width: 500px;
    width: 550px;
    // margin-top: 50px;
    display: block;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    position: relative;
    background: transparent;
    height: 400px;
  }
  .right-table {
    // margin: 50px 110px 0px 50px;
    float: right;
    width: 600px;
    // min-width: 600px;
    // height: 350px;
    display: block;
    overflow-y: auto;
  }
  .clear {
    clear: both;
  }

  .switch-list {
    height: 60px;
    margin-top: 0px;
    display: block;

    ul {
      position: relative;
      width: 60%;
      margin: 50px auto 0;

      &:before {
        position: absolute;
        content: '';
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #45a4fc;
        bottom: 48px;
      }

      li {
        float: left;
        width: 20%;
        position: relative;
        font-size: 16px;
        cursor: pointer;
        padding-top: 20px;
        list-style: none;
        box-sizing: border-box;

        .diamond {
          display: block;
          // left: 47.5%;
          // bottom: 30px;
          position: absolute;
          width: 40px;
          height: 40px;
          left: 50%;
          margin-left: -20px;
          top: 50%;
          margin-top: -20px;
          // width: 10px;
          // height: 10px;
          border-radius: 50%;
          background-color: #fff;
          box-sizing: border-box;
          border: 1px solid #999;

          &.active {
            background-color: #fff;
            border: 1px solid #45a4fc;
          }
        }

        .date {
          text-align: center;
          // padding-top: 15px;
          padding-top: 50px;
          line-height: 36px;
          box-sizing: border-box;
        }

        // &.selected>.hover_wrap {
        //     display: block;
        // }

        &:hover .hover_wrap1 {
          display: block;
          animation: sildeUp linear 0.3s 1;
          -webkit-animation: sildeUp linear 0.3s 1;
          -moz-animation: sildeUp linear 0.3s 1;
          -o-animation: sildeUp linear 0.3s 1;
        }

        .hover_wrap {
          position: absolute;
          top: -75px;
          width: 100%;
          height: 100px;
          display: none;

          &.dis {
            display: block;
          }

          // transition: all .3s ease;

          .hover_box {
            width: 100px;
            height: 100px;
            margin: 0 auto;
            border-radius: 50%;
            -webkit-box-shadow: 0 0 10px #45a4fc;
            -moz-box-shadow: 0 0 10px #45a4fc;
            box-shadow: 0 0 10px #45a4fc;

            p {
              font-size: 15px;
              text-align: center;
              color: #45a4fc;
              // text-decoration: underline;
              text-decoration: none;
              padding-top: 30px;
            }
          }
        }

        @keyframes sildeUp {
          from {
            transform: translate(0px, -30px);
            -ms-transform: translate(0px, -30px); /* IE 9 */
            -webkit-transform: translate(0px, -30px); /* Safari and Chrome */
            -o-transform: translate(0px, -30px);
            /* Opera */
            -moz-transform: translate(0px, -30px);
            /* Firefox */
          }
          to {
            transform: translate(0px, 0px);
            -ms-transform: translate(0px, 0px);
            /* IE 9 */
            -webkit-transform: translate(0px, 0px); /* Safari and Chrome */
            -o-transform: translate(0px, 0px);
            /* Opera */
            -moz-transform: translate(0px, 0px);
            /* Firefox */
          }
        }
        @-webkit-keyframes sildeUp {
          from {
            transform: translate(0px, -40px);
            -ms-transform: translate(0px, -40px);
            /* IE 9 */
            -webkit-transform: translate(0px, -40px); /* Safari and Chrome */
            -o-transform: translate(0px, -40px); /* Opera */
            -moz-transform: translate(0px, -40px);
            /* Firefox */
          }
          to {
            transform: translate(0px, 0px);
            -ms-transform: translate(0px, 0px);
            /* IE 9 */
            -webkit-transform: translate(0px, 0px);
            /* Safari and Chrome */
            -o-transform: translate(0px, 0px); /* Opera */
            -moz-transform: translate(0px, 0px);
            /* Firefox */
          }
        }
        @-moz-keyframes sildeUp {
          from {
            transform: translate(0px, -40px);
            -ms-transform: translate(0px, -40px);
            /* IE 9 */
            -webkit-transform: translate(0px, -40px); /* Safari and Chrome */
            -o-transform: translate(0px, -40px);
            /* Opera */
            -moz-transform: translate(0px, -40px);
            /* Firefox */
          }
          to {
            transform: translate(0px, 0px);
            -ms-transform: translate(0px, 0px);
            /* IE 9 */
            -webkit-transform: translate(0px, 0px);
            /* Safari and Chrome */
            -o-transform: translate(0px, 0px);
            /* Opera */
            -moz-transform: translate(0px, 0px);
            /* Firefox */
          }
        }
        @-o-keyframes sildeUp {
          from {
            transform: translate(0px, -40px);
            -ms-transform: translate(0px, -40px);
            /* IE 9 */
            -webkit-transform: translate(0px, -40px); /* Safari and Chrome */
            -o-transform: translate(0px, -40px);
            /* Opera */
            -moz-transform: translate(0px, -40px);
            /* Firefox */
          }
          to {
            transform: translate(0px, 0px);
            -ms-transform: translate(0px, 0px);
            /* IE 9 */
            -webkit-transform: translate(0px, 0px);
            /* Safari and Chrome */
            -o-transform: translate(0px, 0px);
            /* Opera */
            -moz-transform: translate(0px, 0px);
            /* Firefox */
          }
        }
      }
    }
    .btn-list {
      position: relative;
      div {
        position: absolute;
        // width: 2%;
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #45a4fc;
        top: -71px;
        font-size: 40px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        text-align: center;
      }
      .back-left {
        left: 16%;
        // background-image: url("../../assets/goLeft.png");
      }
      .back-right {
        right: 16%;
        text-align: right;
        // background-image: url("../../assets/goRight.png");
      }
    }
  }
  .desc {
    width: 733px;
    height: 150px;
    text-align: center;
    position: relative;
    li {
        width: 100%;
      list-style: disc inside;
      line-height: 20px;
      font-size: 13px;
      color: #a6a6a6;
      position: absolute;
      bottom: 0px;
      left: 50%;
      margin-bottom: 20px;
    //   margin-left: -367px;
    }
  }
}
</style>



