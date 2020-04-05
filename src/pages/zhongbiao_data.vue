<template>
  <div>
    <el-header height="auto">
      <body-top></body-top>
      <div>
        <!-- 导航栏 -->
        <!-- <head-menu :index="'/zhongbiao_data'"></head-menu> -->
      </div>
      <div style="text-align:center;font-size:30px">
        <span>四川省近一年中标数据分析</span>
      </div>
    </el-header>
    <el-main style="padding:0">
      <!-- 标题区 -->
      <div style="font-size:24px;text-align:center">
        <span style="color:#449dd4">{{winBidTitle.start}}</span>
        至
        <span style="color:#449dd4">{{winBidTitle.end}}</span>中标数据共：
        <span style="color:#449dd4">{{winBidTitle.count}}</span> 条
      </div>
      <!-- 内容展示区 -->
      <div style="width:1800px;margin:0 auto">
        <!-- 左部内容区 -->
        <div style="width:950px;float:left">
          <!-- 左侧四川地图 -->
          <div id="zbArea" style="float:left"></div>
          <!-- 右侧中标公告 详情 -->
          <div style="float:right">
            <p style="font-size:42px;">中标公告 {{winBidTitle_data.time}}</p>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[项目名称]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.xmmc}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[中标时间]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.kvsj}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[项目属地]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.city}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[最高限价]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.zgxjw}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[中标下浮]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.zbxf}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;">
              <p style="width:120px;float:left">[平均下浮]</p>
              <p style="width:385px;margin-left:150px;">{{winBidTitle_data.average}}</p>
            </div>
            <div style="overflow:auto;margin-top:25px;font-size:16px;color:#409EFF;cursor:pointer" @click="handleClickProjectName">查看详情</div>
            <el-button type="primary" style="margin-top:20px;" @click="handleCkAll">查看全部</el-button>
          </div>
        </div>
        <!-- 右部数据统计区 -->
        <div>
          <div style="width:750px;float:right">
            <div style="height:300px;">
              <div style="width:370px;float:left;height:270px;" id="xmsd" v-loading="xmsd_loading"></div>
              <div style="width:370px;float:right;height:270px;" id="xmlb" v-loading="xmlb_loading"></div>
            </div>
            <div style="height:300px">
              <div style="width:370px;float:left;height:270px" id="zgxj" v-loading="zgxj_loading"></div>
              <div style="width:370px;float:right;height:270px" id="kbsj" v-loading="kbsj_loading"></div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
    <el-footer></el-footer>
    <!-- 查看全部的中标公告 -->
    <el-dialog :visible.sync="zbgg.visible" width="70%">
      <div class="title_header">列表详情</div>
      <div>
        <el-table :data="data_left" border style="width: 100%;margin-top:10px;" key="zbgg_table" v-loading="table.loading" @sort-change="changeSort">
          <el-table-column label="序号" width="60" align="center">
            <template slot-scope="scope">{{(table.page-1)*10+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="xmmc" label="项目名称" align="center">
            <template slot-scope="scope">
              <p style="color:#409EFF;cursor:pointer" @click="handleClickProjectName(scope.row)" class="hide blue-color">{{ scope.row.xmmc }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="kbsj" label="中标时间" align="center" width="130" sortable></el-table-column>
          <el-table-column prop="zgxjw" label="最高限价(万元)" width="120" align="center" sortable></el-table-column>
          <el-table-column prop="zbxf" label="中标下浮" align="center" width="80" sortable></el-table-column>
          <el-table-column prop="average" label="平均下浮" align="center" width="80" sortable></el-table-column>
          <el-table-column prop="zdxf" label="最低下浮" align="center" width="80" sortable></el-table-column>
          <el-table-column prop="effective" label="有效投标(家)" width="70" align="center" sortable>
            <template slot-scope="scope">
              <span style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row)">{{scope.row.effective}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tbgs_count" label="总投标(家)" width="70" align="center" sortable>
            <template slot-scope="scope">
              <span style="color:#409EFF;cursor:pointer" @click="openMsg(scope.row)">{{scope.row.effective}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="total,prev, pager, next" :total="table.total" @current-change="tableChangePage" :current-page.sync="table.nowPage"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import head_menu from "./template/head_menu.vue";
import { setInterval } from "timers";
require("echarts/map/js/province/sichuan");
/* eslint-disable */

export default {
    components: {
        headMenu: head_menu
    },
    data() {
        return {
            table: {
                total: 0,
                nowPage: 1,
                page: 1,
                loading: false,
                sort: "kbsj",
                order: "desc"
            },
            xmsd_loading: false,
            xmlb_loading: false,
            zgxj_loading: false,
            kbsj_loading: false,
            tableData: [],
            winBidTitle: {},
            winBidTitle_data: {},
            zbgg: {
                visible: false,
                loading: false,
                page: "",
                nowPage: "",
                total: 0
            },
            tableData: [],
            //中标公告 模拟数据
            data_left: [
                {
                    average: "",
                    city: "",
                    created: "",
                    effective: "",
                    id: "",
                    kbsj: "",
                    map: { name: "南充", value: 1, selected: "true" },
                    tbgs_count: "",
                    time: "",
                    xmmc: "",
                    zbxf: "",
                    zbxx_id: "",
                    zdxf: "",
                    zgxjw: ""
                }
            ],
            //右边四个图的图片配置
            xmsd_option: {
                title: {
                    text: "项目属地",
                    x: "left"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "地区",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            },
            xmlb_option: {
                title: {
                    text: "项目类别",
                    x: "left"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            },
            zgxj_option: {
                title: {
                    text: "最高限价",
                    x: "left"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series: [
                    {
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "50%"],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            },
            kbsj_option: {
                title: {
                    text: "开标时间",
                    x: "left"
                },
                color: ["#00a0e9"],
                xAxis: {
                    type: "category",
                    data: []
                },
                yAxis: {
                    type: "value"
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "bar"
                    }
                ]
            },
            //左边四川地图的配置
            scMap_option: {
                title: {
                    text: ""
                },
                series: [
                    {
                        type: "map",
                        map: "四川", //省份汉字
                        mapType: "china",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    //文字颜色设置
                                    textStyle: {
                                        color: "#333"
                                    }
                                }
                            },
                            emphasis: {
                                // 也是选中样式
                                borderWidth: 2,
                                borderColor: "#fff",
                                color: "#666",
                                label: {
                                    show: false,
                                    textStyle: {
                                        color: "#fff"
                                    }
                                }
                            }
                        },
                        data: [],
                        nameMap: {
                            成都市: "成都",
                            自贡市: "自贡",
                            攀枝花市: "攀枝花",
                            泸州市: "泸州",
                            德阳市: "德阳",
                            绵阳市: "绵阳",
                            广元市: "广元",
                            遂宁市: "遂宁",
                            内江市: "内江",
                            乐山市: "乐山",
                            南充市: "南充",
                            眉山市: "眉山",
                            宜宾市: "宜宾",
                            广安市: "广安",
                            达州市: "达州",
                            雅安市: "雅安",
                            巴中市: "巴中",
                            资阳市: "资阳",
                            阿坝藏族羌族自治州: "阿坝",
                            甘孜藏族自治州: "甘孜",
                            凉山彝族自治州: "凉山"
                        },
                        color: "#45a5fc"
                    }
                ],
                tooltip: {
                    trigger: "item",
                    formatter: function(params) {
                        var res = "";
                        return res;
                    }
                }
            },
            //计时用全局变量
            time_lip: 0
        };
    },
    watch: {},
    mounted() {
        this.getLeftChat();
        this.loadChatXmsd();
        this.lunbo();
    },
    created() {
        document.title = "四川中标数据图";
        this.getDataLeft();
        // this.getLeftChat()
    },
    methods: {
        //改变排序方式
        changeSort(val) {
            this.table.page = 1;
            this.table.nowPage = 1;
            if (val.prop) {
                this.table.sort = val.prop;
            } else {
                this.table.sort = "";
            }
            if (val.order == "descending") {
                this.table.order = "desc";
            } else if (val.order == "ascending") {
                this.table.order = "asc";
            } else {
                this.table.order = "desc";
                this.table.sort = "kbsj";
            }
            this.getDataLeft();
        },
        //点击项目名称
        openXmmc(row) {
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id ||
                    ""}&zbgs_id=${row.id || ""}&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "中标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        //点击有效投标和总投标
        openMsg(row) {
            let { href } = this.$router.resolve({
                path: `/zhaobiao_msg?zb_id=${row.id}&type=1`
            });
            window.open(href);
        },
        //查看全部招标公告 翻页
        zbggChangePage(val) {
            this.zbgg.page = val;
        },
        //列表翻页
        tableChangePage(val) {
            this.table.page = val;
            this.getDataLeft();
        },
        //填充四个图块的数据
        getChatData() {},
        //打开查看全部弹窗
        handleCkAll() {
            this.zbgg.visible = true;
        },
        loadChatXmsd() {
            this.getWinBidType();
            this.getWinBidArea();
            this.getWinBidMoney();
            this.getWinBidTime();
        },
        getWinBidTitle() {},
        //项目类型
        getWinBidType() {
            this.xmlb_loading = true;
            var that = this;
            this.axios.post("/index/statistics_Bid/winBidType", {}, data => {
                this.xmlb_option.series[0].data = data.rows;
                var myChart2 = this.$echarts.init(
                    document.getElementById("xmlb")
                );
                myChart2.setOption(this.xmlb_option);
                myChart2.on("click", function(e) {
                    let { href } = that.$router.resolve({
                        path: `/zhongbiao_data_det?name=${e.name}&type=xmlb`
                    });
                    window.open(href, e.name);
                });
                this.xmlb_loading = false;
            });
        },
        //项目属地
        getWinBidArea() {
            this.xmsd_loading = true;
            var that = this;
            this.axios.post("/index/statistics_Bid/winBidArea", {}, data => {
                this.xmsd_option.series[0].data = data.rows;
                var myChart = this.$echarts.init(
                    document.getElementById("xmsd")
                );
                myChart.setOption(this.xmsd_option);
                myChart.on("click", function(e) {
                    let { href } = that.$router.resolve({
                        path: `/zhongbiao_data_det?name=${e.name}&type=xmsd`
                    });
                    window.open(href, e.name);
                });
                this.xmsd_loading = false;
            });
        },
        //最高限价
        getWinBidMoney() {
            this.zgxj_loading = true;
            var that = this;
            this.axios.post("/index/statistics_Bid/winBidMoney", {}, data => {
                this.zgxj_option.series[0].data = data.rows;
                var myChart3 = this.$echarts.init(
                    document.getElementById("zgxj")
                );
                myChart3.setOption(this.zgxj_option);
                myChart3.on("click", function(e) {
                    let { href } = that.$router.resolve({
                        path: `/zhongbiao_data_det?name=${e.name}&type=zgxj`
                    });
                    window.open(href, e.name);
                });
                this.zgxj_loading = false;
            });
        },
        // 点击表格行 项目名称
        handleClickProjectName(row) {
            // 跳转路由
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${row.zbxx_id}&zbgs_id=${
                    row.id
                }&xmmc=${row.xmmc}&type=zbgs&source=${row.source}`
            });
            window.open(href, "招标公示" + row.id + row.zbxx_id + row.xmmc);
        },
        // 点击表格行 项目名称
        handleClickProjectName() {
            // 跳转路由
            let { href } = this.$router.resolve({
                path: `/enterpriseDetails?zbxx_id=${
                    this.winBidTitle_data.zbxx_id
                }&zbgs_id=${this.winBidTitle_data.id}&xmmc=${
                    this.winBidTitle_data.xmmc
                }&type=zbgs&source=${row.source}`
            });
            window.open(
                href,
                "中标公示" +
                    this.winBidTitle_data.id +
                    this.winBidTitle_data.zbxx_id +
                    this.winBidTitle_data.xmmc
            );
        },
        //开标时间
        getWinBidTime() {
            this.kbsj_loading = true;
            var that = this;
            this.axios.post("/index/statistics_Bid/winBidTime", {}, data => {
                var arr = [];
                data.rows.forEach(element => {
                    arr.push(element.name);
                });
                this.kbsj_option.xAxis.data = arr;
                this.kbsj_option.series[0].data = data.rows;
                var myChart4 = this.$echarts.init(
                    document.getElementById("kbsj")
                );
                myChart4.setOption(this.kbsj_option);
                myChart4.on("click", function(e) {
                    let { href } = that.$router.resolve({
                        path: `/zhongbiao_data_det?name=${e.name}&type=kbsj`
                    });
                    window.open(href, e.name);
                });
                this.kbsj_loading = false;
            });
        },
        getLeftChat() {
            this.SiChuanMap_E("zbArea", "四川省最近中标区域分布图", {
                name: "成都",
                selected: "true"
            });
        },
        //判断 左边四川地图的dom
        SiChuanMap_E(id, title, data) {
            if (!document.getElementById(id)) {
                return;
            }
            var fromData = data ? data : "";
            if (document.getElementById(id)) {
                this.InitMap(fromData, title, id);
            }
        },
        //获取左边的数据
        getDataLeft() {
            this.table.loading = true;
            this.axios.post(
                "/index/statistics_Bid/winBidTitle",
                {
                    sort: this.table.sort,
                    order: this.table.order,
                    page: this.table.page
                },
                data => {
                    this.winBidTitle = data;
                    this.data_left = data.rows;
                    this.table.total = data.total;
                    this.table.loading = false;
                }
            );
        },
        //加载 左边四川地图插件
        InitMap(fromData, title, id) {
            var dom = document.getElementById(id);
            var myChart = this.$echarts.init(document.getElementById(id));
            this.scMap_option.title.text = title;
            this.scMap_option.series[0].data = [fromData];
            myChart.setOption(this.scMap_option);
            myChart.hideLoading();
        },
        //轮播开始
        lunbo() {
            this.timer();
            this.lunbo_time = setInterval(this.timer, 5000);
        },
        //计时器 如何控制地图高亮改变 和 右侧数据变化
        timer() {
            this.InitMap(
                this.data_left[this.time_lip].map,
                "四川省最近中标区域分布图",
                "zbArea"
            );
            this.winBidTitle_data = JSON.parse(
                JSON.stringify(this.data_left[this.time_lip])
            );
            if (this.time_lip == this.data_left.length - 1) {
                this.time_lip = 0;
            } else {
                this.time_lip++;
            }
        }
    }
};
</script>
<style scoped lang="less">
#zbArea {
    width: 400px;
    height: 400px;
    margin: 50px 0 50px 0;
}
#fbArea {
    display: none;
    width: 400px;
    height: 400px;
    margin: 50px 0 50px 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
.title_header {
    font-size: 20px;
    margin-top: -20px;
    padding-bottom: 20px;
    border-bottom: 1px #e5e5e5 solid;
}
</style>

