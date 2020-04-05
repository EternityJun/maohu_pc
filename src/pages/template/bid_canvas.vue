<template>
    <div>
        <div id="myChart" @click="click_myChart"></div>
        <div v-bind:style="styleObject" class="right_menu" v-show="menu_show">
            <a class="del" @click="menu_show=false">x</a>
            <!-- 右键菜单 -->
            <!-- <el-row>
                <a @click="fn_menu('zb')">添加1.4.1</a>
            </el-row>
            <el-row>
                <a @click="fn_menu('gs')">添加公司工具</a>
            </el-row> -->

            <el-row v-show="del_show">
                <a @click="fn_menu('dataset')">查看公司集</a>
            </el-row>
            <el-row v-show="del_show">
                <a @click="fn_menu('pick')">{{text}}</a>
            </el-row>

            <el-row v-show="del_show">
                <a @click="fn_menu('condition')">查看条件</a>
            </el-row>
            <el-row v-show="del_show">
                <a @click="fn_menu('rename')">重命名</a>
            </el-row>
            <el-row v-show="pick_show && del_show">
                <a @click="fn_menu('del')">删除</a>
            </el-row>
        </div>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
let ecConfig = echarts.config

// 引入柱状图组件
require('echarts/lib/chart/tree')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  props: ['tree'],
  data() {
    return {
      styleObject: {
        left: '500px',
        top: '100px'
      },
      node_detail: null,
      del_show: false,
      pick_show: false,
      menu_show: false,
      text: '选中公司集',
      count: 0
    }
  },
  watch: {
    tree: function() {
      this.menu_show = false
      this.drawLine(this.tree.tree)
    }
  },
  mounted() {
    this.drawLine(this.tree.tree)
  },
  methods: {
    click_myChart(e) {},
    fn_menu(key) {
      let key1 = key
      if (key == 'pick' && this.text == '取消公司集') {
        key1 = 'noPick'
      }
      this.$emit('listenMenuClick', {
        key: key1,
        node_detail: this.node_detail
      })
    },
    drawLine(tree) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      let self = this
      // 绘制图表
      myChart.setOption({
        title: {
          show: false
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        //那个右上角的工具栏
        toolbox: {
          show: false
        },
        calculable: false,
        series: [
          {
            name: '树图',
            type: 'tree',
            //排列方式，横向、纵向
            orient: 'vertical',
            //根节点的位置
            rootLocation: { x: 'center', y: '0' },
            //连接线长度
            layerPadding: 10,
            //结点间距
            nodePadding: 20,
            //图形形状
            symbol: 'circle',
            //尺寸大小
            symbolSize: 15,
            expandAndCollapse: false,
            tooltip: {
              trigger: 'item',
              position: 'top',
              formatter: function(params) {
                return '总数 : ' + params.data.value + '条 '
              }
            },
            //图的一些样式设置
            itemStyle: {
              //正常情况显示
              normal: {
                label: {
                  show: true,
                  position: 'left',
                  textStyle: {
                    // 字体颜色、大小、加粗
                    color: '#000',
                    fontSize: 13,
                    fontWeight: 'lighter'
                  }
                },
                color: '#fff',
                lineStyle: {
                  color: '#000',
                  width: 1,
                  type: 'solid'
                }
              },
              //鼠标移上去样式
              emphasis: {
                label: {
                  show: true,
                  position: 'left',
                  textStyle: {
                    //字体颜色、大小、加粗
                    color: '#428bca',
                    fontSize: 13,
                    fontWeight: 'lighter'
                  }
                },
                lineStyle: {
                  color: '#000',
                  width: 1,
                  type: 'solid'
                }
              }
            },
            data: tree
          }
        ]
      })
      //去除默认的鼠标事件
      document.oncontextmenu = function() {
        return false
      }
      myChart.off('mousedown');
      myChart.on('mousedown', function(e) {
        let which = e.event.which
        self.node_detail = e
        if (which == 1) {
          self.$message.success('已选中该节点')
          self.fn_menu('keyRight')
        } else if (which == 3) {
          let clientX = e.event.offsetX + 340 + 'px'
          let clientY = e.event.offsetY - 0 + 'px'
          self.styleObject.left = clientX
          self.styleObject.top = clientY
          // self.menu_show = true;
          if (e.data.id == self.tree.status_id) {
            self.text = '取消公司集'
          } else {
            self.text = '选中公司集'
          }
          self.del_show = self.node_detail.name == '公司像' ? false : true
          self.menu_show = self.node_detail.name == '公司像' ? false : true
          self.pick_show = self.node_detail.data.children ? false : true
        }
      })
    }
  }
}
</script>
<style scoped>
.right_menu .el-row {
  margin-bottom: 5px;
}
.right_menu {
  position: absolute;
  border: 1px solid gainsboro;
  border-radius: 3px;
  background-color: white;
  padding: 30px 20px 20px 20px;
  padding-right: 15px;
  z-index: 999;
}
.right_menu a {
  cursor: pointer;
  font-size: 12px;
}
.del {
  position: absolute;
  top: 0;
  right: 5px;
  color: gray;
  font-weight: bolder;
  font-size: 20px !important;
}
</style>

<style lang="less" scoped>
#myChart {
  width: 1240px;
  height: 700px;
  min-width: 1000px;
}
</style>
