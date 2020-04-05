<!--  -->
<template>
  <div class="Enterprise_map">
    <div id="siSchuanMap" style="width:400px; height: 400px;">
      
    </div>
    <button @click="aaaaa">11</button>
  </div>
</template>

<script>
  // require("../../../dist/static/js/china.js");
  require("../../../node_modules/echarts/map/js/province/sichuan.js");
export default {
  
  name:"Enterprise_map",
  data () {
    return {
      myChart:""
    };
  },
  props:{
     //父组件需要传递的参数：id，width，height，option
     option:{
         type:Object,
        default(){
            return {
              title : {
                  text: '四川省公开招标项目中标区域分布图',
              },
              //这个对象是有数据的颜色
              visualMap: {
                  show : false,//不显示右下的颜色条
                  color: ['yellow'] 
              },
              series : [
                  {
                      name: '四川省公开招标项目中标区域分布图',
                      type: 'map',
                      mapType: '四川',
                      // roam: true,  //这个是地图缩放
                      itemStyle:{
                          emphasis:{label:{show:true}}
                      },
                      //下面显示地区名字
                      label: {
                        normal: {
                          show: true
                        },
                        emphasis: {
                          show: true
                        }
                      },
                      //显示的数据
                      data:[]
                  }
              ],
            }
        }
     }
  },
  watch:{
    option:{
      handler:(val,old)=>{
        console.log("更新了")
      },
      deep: true
    }
  },
  methods:{
      init(myData){
      this.myChart = this.$echarts.init(document.getElementById("siSchuanMap"))
       this.myChart.setOption(myData)
    },
    aaaaa(){
      console.log(this.option)
    }
  },
  mounted:function(){
      console.log(this.option)
    this.init(this.option)
  },
}

</script>
<style lang='less' scoped>
</style>