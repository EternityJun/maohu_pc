<!--  -->
<template>
  <div class="Enterprise_echarts">  
        <div  :id="id" :style="style" :ref="id" @click="openDetails" class="myEchart"></div>
  </div>
</template>

<script>
  require("../../../node_modules/echarts/map/js/province/sichuan.js");
export default {
    name:"Enterprise_echarts",
  data () {
    return {
        mychart:""
    };
  },
  props:{
     //父组件需要传递的参数：id，width，height，option
     id:{
         type:String
     },
     width:{
         type:String,
         default:"320px"
     },
     height:{
         type:String,
         default:"280px"
     },
     myFunName:{
          type:String,
          default:""
     },
     option:{
         type:Object,
        default(){
            return {
                title:{},
                 tooltip: {},
                    legend: {
                        data:['金额(千万元)','个数(个)'],
                        bottom : 0
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '金额(千万元)',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                    ],
                    visualMap:{

                    },
                    series: [
                        {
                            name:'金额(千万元)',
                            type:'bar',
                            data:[]
                        },
                    ]
            }
        }
     }
  },
  computed:{
      style(){
          return {
              height:this.height,
              width:this.width
          }
      }
  },
  watch:{
      option:{
          handler:function(newVal,old){
              if(this.mychart){
                  if(newVal){
                      this.mychart.setOption(newVal)
                  }
              }
          },
          deep: true //对象内部属性的监听，关键。
      }
  },
  methods:{
      drowEcharts(val){
        //   console.log(val)
          var id = document.getElementById(this.id)
          if(id){
            this.mychart = this.$echarts.init(id)
            this.mychart.setOption(val)

          }  
          let _this = this
           this.mychart.off("click")
          this.mychart.on("click",function(params){
              _this.$emit("changeData",params,_this.id)
          })
      },
      openDetails(){
          this.$emit("myClick",this.id)
      },
  },
  mounted(){
      this.drowEcharts(this.option)
  },
}   

</script>
<style lang='less' scoped>
    .myEchart{
        margin:  0 auto;
    }
</style>