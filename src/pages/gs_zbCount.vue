<template>
  <div>
    <!-- 中标统计 -->
    <el-row style="margin-top:20px;min-height:550px;">
      <el-col :span="24" class="no_more" v-show="yearTabs.length==0">暂无数据</el-col>
      <el-col :span="1" :offset="2"  v-show="yearTabs.length>0">
        <div class="axis">
          <div class="year_dot" v-for="(item,index) in yearTabs" :key="index">
            <div class="year" :class="item==yearTab ?  'active_year': ''" @click="switchYear(item)" :style="{'top': index*110+30+'px' }">{{item}}年</div>
            <div class="dot" :class="item==yearTab ?  'active_dot': ''" @click="switchYear(item)" :style="{'top': index*110+30+'px' }">
              <div></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="21"  v-show="yearTabs.length>0" v-loading="echartLoading">
        <div v-show="no_more" class="no_more">暂无数据</div>
        <div v-show="!no_more">
          <el-row class="tab" style="margin-bottom:20px">
            <el-col :span="24" style="text-align:center">
              <span class="markText">{{echartsData.title.year}}</span>
              <span>年中标总金额为</span>
              <span class="markText">{{echartsData.title.money}}</span>
            </el-col>
          </el-row>
          <div class="box">
            <div class="echart" id="city" v-show="echartsData.data[0].data.length>0">
            </div>
            <div class="echart" id="yjlx" v-show="echartsData.data[1].data.length>0">
            </div>
            <div class="echart" id="money" v-show="echartsData.data[2].data.length>0">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="dialogVisible">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="90%" top="50px">
        <template>
          <el-table :data="tableData" style="width: 100%" border @sort-change="fn_sortable" v-loading="tableLoading">
            <el-table-column width="60" type="index" label="序号" align="center">
              <template slot-scope="scope">
                <div>{{(scope.$index+1)+(page-1)*10}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="xmmc" label="项目名称">
              <template slot-scope="scope">
                <div class="link_color" @click="open_detail(scope.row)">{{scope.row.xmmc}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="tbbjw" label="投标报价(万元)" width="180" align="center">
            </el-table-column>
            <el-table-column prop="psbjw" label="经评审的投标价(万元)" width="180" align="center">
            </el-table-column>
            <el-table-column prop="zhpf" label="综合评分" align="center" width="180">
            </el-table-column>
            <el-table-column prop="kbsj" label="开标日期" align="center" sortable="custom" width="180">
            </el-table-column>

          </el-table>
          <el-pagination style="margin-top:20px" @current-change="pageSizeChange" align="right" background layout="total,prev, pager, next" :total="total"></el-pagination>

        </template>
        <el-row>
          <el-col :span="24" style="text-align:center">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
  props: ['params'],
  data() {
    return {
      dialogVisible: false,
      tableLoading: true,
      echartLoading: true,
      tableData: [],
      page: 1,
      total: 0,
      no_more: false,
      yearTab: '2019',
      yearTabs: ['2019', '2018', '2017', '2016', '2015'],
      money: '10亿2830万',
      echartsData: {
        data: [
          {
            title: '年中标区域分布：区域所占金额(万元)',
            data: [],
            id: 'city'
          },
          {
            title: '年业绩类型分布：类型所占金额(万元)',
            data: [],
            id: 'money'
          },
          {
            title: '年中标金额',
            data: [],
            id: 'yjlx'
          }
        ],
        title: {
          year: '',
          money: ''
        }
      },
      title: '',
      query_id: '',
      query_value: '',
      sort: '',
      order: ''
    }
  },
  created() {},
  mounted() {},
  watch: {
    params: function() {
      this.getYear()
    }
  },
  methods: {
    switchYear(year) {
      this.yearTab = year
      this.bidStat()
    },
    bidStat() {
      this.echartLoading = true
      this.axios.post(
        '/firm/statistics_manage/bidStat',
        {
          gs_id: this.params.gs_id,
          year: this.yearTab
        },
        data => {
          this.echartLoading = false
          if (data.status == 'success') {
            this.no_more = false
            this.echartsData = data.rows
            this.echartsData.data.forEach(ele => {
              this.fn_myEchart(ele.id, ele.title, ele.data)
            })
          } else {
            this.no_more = true
          }
        }
      )
    },
    getYear() {
      this.axios.post(
        '/firm/statistics_manage/years',
        {
          num: 5,
          gs_id: this.params.gs_id
        },
        data => {
          this.yearTabs = data
          if(data.length>0){
            this.yearTab=data[0]
            this.bidStat();

          }
        }
      )
    },
    fn_myEchart(id, title, data) {
      let that = this
      // 请求数据
      var my_echart = this.$echarts.init(document.getElementById(id))
      let text = ''
      let option = (option = {
        title: {
          text: title,
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: '55%',
            selectedMode: 'single',
            center: ['50%', '60%'],
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })

      my_echart.setOption(option)

      my_echart.on('click', function(params) {
        that.dialogVisible = true
        that.title = title
        that.page = 1
        that.sort = ''
        that.order = ''
        that.query_id = id
        that.query_value = params.data.name
        that.getDetailScale()
      })
    },
    getDetailScale() {
      let that = this
      let id = that.query_id
      let value = that.query_value
      let params = {
        gs_id: this.params.gs_id,
        year: this.yearTab,
        page: this.page,
        rows: 10,
        sort: that.sort,
        order: that.order
      }
      if (id == 'city') {
        params.area = value
      } else if (id == 'money') {
        params.money = value
      } else if (id == 'yjlx') {
        params.yjlx = value
      }
      this.tableLoading = true
      this.axios.post('/firm/statistics_manage/statDetail', params, data => {
        this.tableData = data.rows || []
        this.total = data.total || 0
        this.tableLoading = false
      })
    },
    pageSizeChange(page) {
      this.page = page
      this.getDetailScale()
    },
    fn_sortable(param) {
      let order = ''
      if (param.order == 'ascending') {
        order = 'asc'
      } else if (param.order == 'descending') {
        order = 'desc'
      }
      this.sort = order
      this.order = param.prop
      this.getDetailScale()
    },
    open_detail(row) {
      let { href } = this.$router.resolve({
        path: `/enterpriseDetails?login_service_id=${
          this.$route.query.login_service_id
        }&gsmc=${this.$route.query.gsmc}&zbxx_id=${row.zbxx_id ||
          ''}&zbgs_id=${row.zb_id || ''}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
      })
      window.open(href, '中标公示' + row.zb_id + row.xmmc)
      return
    }
  }
}
</script>

<style lang="less" scoped>
.markText {
  font-size: 25px;
  color: #409eff;
}
.tab {
  display: flex;
  align-items: center;
}
.echart {
  width: 495px;
  margin-right: 15px;
  margin-bottom: 15px;
  height: 250px;
  display: inline-block;
  background-color: #f5f5f5;
}
.axis {
  width: 0px;
  height: 570px;
  position: relative;
  border-right: 1px dotted #999;
}
.year_dot {
  width: 100px;
}
.year {
  position: absolute;
  left: -100px;
  font-size: 22px;
  cursor: pointer;
  color: #999;
}
.active_year {
  color: #409eff;
}
.active_dot {
  border-color: #409eff !important;
  div {
    background-color: #70b1f1 !important;
    box-shadow: 0 0 2px 2px #70b1f1 !important;
  }
}
.dot {
  position: absolute;
  right: -14px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #d3d3d3;
  cursor: pointer;

  div {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: absolute;
    left: 8.5px;
    top: 8px;
    background-color: rgb(182, 180, 180);
    box-shadow: 0 0 2px 2px rgb(182, 180, 180);
  }
}

.box {
  // margin-left:30px;
  width: 100%;
  height: 500px;
  background: white;
  position: relative;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  //    border: 1px solid #d3d3d3;
}
// .box:before {
//    content:"";
//    position: absolute;
//    right: 100%;
//    top: 26px;
//    width: 0;
//    height: 0;
//    border-top: 13px solid transparent;
//    border-right: 26px solid #d3d3d3;
//    border-bottom: 13px solid transparent;
// }
.no_more {
  text-align: center;
  line-height: 500px;
}
</style>


