<template>
  <div id="bigData">
    <body-top></body-top>
    <headMenu :index="'/bigData'"></headMenu>
    <div class="toolBlock" id="cellall">
      <div class="tool_row" v-if="cate=='筑标'">
        <div v-for="(item,index ) in bid_arr" :class="item.class" class="cell" @click="onclick(item.path,item.name)">
        </div>
        <!-- <div class="cell zdgl" @click="onclick('/dictionary','字典管理')">
        </div>
        <div class="cell bjmx" @click="onclick('/model','报价模型')">
        </div>
        <div class="cell zbjkxt" @click="onclick('/dictionary','招标监控系统')">
        </div>
        <div class="cell zbsjfx" @click="onclick('/model','中标数据分析')">
        </div>
        <div class="cell zbglgs" @click="onclick('/affiliatedCompany','中标关联公司')">
        </div>
        <div class="cell qygzq" @click="onclick('/enterpriseWork','企业工作区')">
        </div>
        <div class="cell qydsj" @click="onclick('/regionDistribution','企业大数据')">
        </div>
        <div class="cell qyjkzx" @click="onclick('/model','企业监控中心')">
        </div>
        <div class="cell zbjk" @click="onclick('/zhongbiao_data','中标监控系统')">
        </div> -->
      </div>
      <div class="tool_row" v-if="cate=='企业'">
        <div v-for="(item,index ) in browser_arr" :class="item.class" class="cell" @click="onclick(item.path,item.name)">
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import headMenu from './template/head_menu.vue'
export default {
  data() {
    return {
      cate: '',
      bid_arr: [
        { class: 'zdgl', path: '/dictionary', name: '字典管理' },
        { class: 'bjmx', path: '/model', name: '报价模型' },
        // { class: 'zbjkxt', path: '/dictionary', name: '招标监控系统' },
        // { class: 'zbsjfx', path: '/dictionary', name: '中标数据分析' },
        { class: 'zbglgs', path: '/affiliatedCompany', name: '中标关联公司' },
        // { class: 'qyjkzx', path: '/regionDistribution', name: '企业监控中心' },
        { class: 'zbjk', path: '/zbDataMonitor', name: '中标监控系统' },
        { class: 'zbsj', path: '/zhongbiao_data', name: '中标数据分析' }        
      ],
      browser_arr: [
        { class: 'qygzq', path: '/enterpriseWork', name: '企业工作区' },
        { class: 'qydsj', path: '/regionDistribution', name: '企业大数据' }
      ]
    }
  },
  created() {
    this.setCate()
    document.title = '大数据中心'
  },
  components: {
    headMenu
  },
  methods: {
    setCate() {
      if (this.$store.state.userInfo.href.indexOf('bid.520coc.cn') > -1) {
        this.cate = '筑标'
      } else if (
        this.$store.state.userInfo.href.indexOf('laipi.520coc.cn') > -1
      ) {
        this.cate = '企业'
      }
    },
    //跳转
    onclick(url, title) {
      let { href } = this.$router.resolve({
        path: `${url}`
      })
      window.open(href, title)
    },
    onOver(e) {
      var w = e.target.offsetWidth
      var h = e.target.offsetHeight
      var x = e.pageX - e.target.getBoundingClientRect().left - w / 2
      var y = e.pageY - e.target.getBoundingClientRect().top - h / 2
      var direction =
        Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90 + 3) % 4
      var dirName = new Array('上', '右', '下', '左')
      if (e.type == 'mouseenter') {
        this.animationIn(dirName[direction], e.target)
      } else {
        this.animationOut(dirName[direction], e.target)
      }
    },
    //进入
    animationIn(direction, el) {
      var settime = '0.3s'
      var img = el.querySelector('img')
      clearTimeout(this.timeName)
      if (direction == '左') {
        img.style.left = '-160px'
        img.style.top = '0'
        setTimeout(() => {
          img.style.transition = 'all ' + settime
          img.style.left = '0'
          this.timeName = 0
        }, 1)
      } else if (direction == '右') {
        img.style.left = '160px'
        img.style.top = '0'
        setTimeout(() => {
          img.style.transition = 'all ' + settime
          img.style.left = '0'
        }, 1)
      } else if (direction == '上') {
        img.style.top = '-160px'
        img.style.left = '0'
        setTimeout(() => {
          img.style.transition = 'all ' + settime
          img.style.top = '0'
        }, 1)
      } else if (direction == '下') {
        img.style.top = '160px'
        img.style.left = '0'
        setTimeout(() => {
          img.style.transition = 'all ' + settime
          img.style.top = '0'
        }, 100)
      }
    },
    //出来
    animationOut(direction, el) {
      var settime = 300
      var px = 160
      var img = el.querySelector('img')
      if (direction == '左') {
        img.style.left = '300px'
        img.style.top = '0'
      } else if (direction == '右') {
        img.style.left = '300px'
        img.style.top = '0'
      } else if (direction == '上') {
        img.style.top = '-160px'
        img.style.left = '0'
      } else if (direction == '下') {
        img.style.top = '160px'
        img.style.left = '0'
      }
      this.timeName = setTimeout(() => {
        if (document.getElementById('cellall')) {
          document
            .getElementById('cellall')
            .querySelectorAll('img')
            .forEach(element => {
              element.style.transition = ''
            })
        }
      }, settime)
    }
  }
}
</script>

<style lang="less" scoped>
#bigData {
}
.toolBlock {
  margin-top: 10px;
}
.tool_row {
  width: 1200px;
  margin: 0 auto;
  // text-align: center;
  // margin: 20px;
}
.tool_row > div {
  position: relative;
  display: inline-block;
  width: 260px;
  height: 67px;
  margin: 12px;
  box-shadow: 0 0 1px 1px #f2f2f2;
  overflow: hidden;
  cursor: pointer;
  background-repeat: no-repeat;
}
.tool_row > div > img {
  position: absolute;
  left: 320px;
}
.tool_row > div.zdgl {
  background-image: url('../assets/DSJZD.svg');
}
.tool_row > div.bjmx {
  background-image: url('../assets/DSJBJ.svg');
}
.tool_row > div.zbjkxt {
  background-image: url('../assets/DSJZB.svg');
}
.tool_row > div.zbsjfx {
  background-image: url('../assets/DSJFX.svg');
}
.tool_row > div.zbglgs {
  background-image: url('../assets/DSJGL.svg');
}
.tool_row > div.qygzq {
  background-image: url('../assets/DSJGZ.svg');
}
.tool_row > div.qydsj {
  background-image: url('../assets/DSJQY.svg');
}
.tool_row > div.qyjkzx {
  background-image: url('../assets/DSJJK.svg');
}
.tool_row > div.zbjk {
  background-image: url('../assets/DSJZBJK.svg');
}
.tool_row > div.zbsj {
  background-image: url('../assets/DSJFX.svg');
}
</style>
