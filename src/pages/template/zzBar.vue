<template>
  <div class="echarts-bar">
    <!--  :id="barref" -->
    <div :id="barref"></div>
  </div>
</template>

<script>
export default {
  props: ["barOption", "barref", "title", "prov", "rProv"],
  data() {
    return {
      barChart: null,
      line: {
        legend: {
          //   show: false
          top: -4,
          right: 0,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
          // itemWidth: 30,
          // data: [
          //   {
          //     name: "系列1",
          //     textStyle: {
          //       color: "red"
          //     }
          //   },{
          //     name: "系列2",
          //     textStyle: {
          //       color: "red"
          //     }
          //   }
          // ]
        },
        grid: {
          top: 41,
          bottom: 35,
          left: 50,
          right: 10
        },
        tooltip: {
          trigger: "none"
        },
        dataset: {
          source: [
            { product: "特级", 重庆: 6, 入渝: 47, dict: "1_5_0" },
            { product: "一级", 重庆: 262, 入渝: 151, dict: "1_5_1" },
            { product: "二级", 重庆: 800, 入渝: 144, dict: "1_5_2" }
          ]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          axisLabel: {
            fontSize: 14
          }
        },
        yAxis: {
          color: "#45A4FC",
          fontSize: 20,
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          },
          name: "条",
          nameGap: 24,
          nameTextStyle: {
            color: "#333",
            fontFamily: "Arial",
            fontSize: 16
          },
          axisLabel: {
            fontSize: 14
          }
        },
        series: [
          {
            name: this.prov,
            // name: "bar1" + this.barref,
            type: "bar",
            itemStyle: {
              normal: {
                color: "#e7b972"
              },
              barWidth: 24
            },
            barGap: 0,
            label: {
              show: true,
              position: "top"
            },
            barMinHeight: 10
          },
          {
            name: this.rProv,
            // name: "bar2" + this.barref,
            type: "bar",
            itemStyle: {
              normal: {
                color: "#8c9bda"
              },
              barWidth: 24
            },
            label: {
              show: true,
              position: "top"
            },
            barMinHeight: 10
          }
        ]
      },
      dictList: []
    };
  },
  mounted() {
    this.drawBar();
  },
  methods: {
    drawBar() {
      let id = this.barref;
      let that = this;
      this.barChart = this.$echarts.init(document.getElementById(id));
      this.barChart.setOption(that.line);
      
    }
  },
  watch: {
    barOption: {
      immediate: true,
      handler: function(val, oldVal) {
        console.log("barval", val);
        console.log("oldVal", oldVal);
        console.log("this.barref", this.barref);
        console.log("this.title", this.title);
        this.line.yAxis.name = this.title + "统计";
        if (!oldVal && val) {
          this.dictList = JSON.parse(JSON.stringify(val.dictList));
          this.line.dataset.source = [];
          this.line.dataset.source = val.value;
          let that = this;
          console.log(this.line.dataset.source)
          this.$nextTick(function() {
            that.barChart.setOption(that.line);
          });
        } else if (val) {
          this.dictList = JSON.parse(JSON.stringify(val.dictList));
          console.log(this.dictList)
          this.line.dataset.source = [];
          this.line.dataset.source = val.value;
          // this.line.series[0].name 
          console.log(this.line.series[0].name)
           console.log(this.line.series[1].name)
          console.log(this.line.dataset.source)
          this.barChart.setOption(this.line);
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
#barChart1,
#barChart2,
#barChart3 {
  width: 424px;
  height: 314px;
}
</style>
