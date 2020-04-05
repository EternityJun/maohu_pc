<template>
  <div>
    <!-- 搜索条件框 -->
    <div>
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="项目名称">
          <el-input style="width:285px" @keydown.enter.native="gcyjFn().onSearch()" v-model="gcyj.xmmc" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item label="资金范围">
          <el-input style="width:180px" v-model="gcyj.je_min" placeholder="金额">
            <template slot="append">万元</template>
          </el-input>
          <el-input style="width:180px" v-model="gcyj.je_max" placeholder="金额">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="开工日期">
          <el-date-picker style="width:150px" v-model="gcyj.kgrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          <el-date-picker style="width:150px" v-model="gcyj.kgrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="竣工日期">
          <el-date-picker style="width:140px" v-model="gcyj.jgrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          <el-date-picker style="width:140px" v-model="gcyj.jgrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-select style="width:154px" v-model="gcyj.xmlx" placeholder="选择项目类型" :style="{width:'366px'}">
            <el-option v-for="item in xmlxOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中标日期">
          <el-date-picker style="width:150px" v-model="gcyj.zbrq_min" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
          <el-date-picker style="width:150px" v-model="gcyj.zbrq_max" type="date" value-format="yyyy-MM-dd" placeholder="年/月/日"></el-date-picker>
        </el-form-item>
      </el-form>
      <div style="text-align:center;padding:0 10px 10px 0">
        <el-button type="primary" @click="gcyjFn().onSearch()">搜索</el-button>
        <el-button @click="gcyjFn().onReset()">重置</el-button>
      </div>
      <el-table :data="gcyj.tableData" border v-loading="gcyj.loading">
        <el-table-column type="index" label="编号" width="50"></el-table-column>
        <el-table-column align="left" prop="proj_name" label="项目名称">
          <template slot-scope="scope">
            <span style="color: #409eff;cursor:pointer" @click="openXqOne(scope.row.remark,scope.row.proj_id,scope.row.proj_name, scope.row.zbxx_id,scope.row.source)">{{scope.row.proj_name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="proj_type" label="项目类型"></el-table-column>
        <el-table-column align="center" prop="money" label="金额(万元)"></el-table-column>
        <el-table-column align="center" prop="proj_date" label="日期"></el-table-column>
        <el-table-column align="center" prop="remark" label="数据源"></el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px" @current-change="gcyjPageSizeChange" align="right" background layout="total,prev, pager, next" :total="gcyj.total"></el-pagination>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
    props: {
        staff_base_id: ""
    },
    data() {
        return {
            input: "",
            value6: "",
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value: "",
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            gcyj: {
                tableData: [],
                loading: false,
                xmmc: "",
                je_min: "",
                je_max: "",
                kgrq_min: "",
                kgrq_max: "",
                jgrq_min: "",
                jgrq_max: "",
                cyry: "",
                zbrq_min: "",
                zbrq_max: "",
                xmlx: ""
            },
            xmlxOptions: [
                "市政工程",
                "水利工程",
                "公路工程",
                "铁路工程",
                "矿山工程",
                "电力工程",
                "机电工程",
                "石化工程",
                "通信工程",
                "冶金工程",
                "港航工程",
                "其他工程"
            ]
        };
    },
    created() {
        //工程业绩
        this.gcyjFn().getList();
        this.getxmlx();
    },
    methods: {
        //工程业绩
        gcyjPageSizeChange(page) {
            this.gcyj.page = page;
            this.gcyjFn().getList();
        },
        //获取项目类型
        getxmlx() {
            this.axios.post("/firm/Bid_performance/projectType", {}, data => {
                this.xmlxOptions = data;
            });
        },
        //工程业绩
        gcyjFn() {
            let getList = () => {
                this.gcyj.loading = true;
                let query_data = {
                    staff_base_id: this.staff_base_id,
                    xmmc: this.gcyj.xmmc,
                    name: this.gcyj.cyry,
                    minMoney: this.gcyj.je_min,
                    maxMoney: this.gcyj.je_max,
                    minZbgsTime: this.gcyj.zbrq_min,
                    maxZbgsTime: this.gcyj.zbrq_max,
                    minKgsjTime: this.gcyj.kgrq_min,
                    maxKgsjTime: this.gcyj.kgrq_max,
                    minJgsjTime: this.gcyj.jgrq_min,
                    maxJgsjTime: this.gcyj.jgrq_max,
                    projectType: this.gcyj.xmlx,
                    page: this.gcyj.page,
                    rows: 10
                };
                this.axios.post(
                    "/firm/performance/projectLists",
                    query_data,
                    data => {
                        this.gcyj.loading = false;
                        this.gcyj.tableData = data.rows || [];
                        this.gcyj.total = data.total || 0;
                    }
                );
            };
            //搜索
            let onSearch = () => {
                this.gcyj.page = 1;
                this.gcyj.total = 0;
                getList();
            };
            //重置
            let onReset = () => {
                this.gcyj.xmmc = "";
                this.gcyj.je_min = "";
                this.gcyj.je_max = "";
                this.gcyj.kgrq_min = "";
                this.gcyj.kgrq_max = "";
                this.gcyj.jgrq_min = "";
                this.gcyj.jgrq_max = "";
                this.gcyj.cyry = "";
                this.gcyj.zbrq_min = "";
                this.gcyj.zbrq_max = "";
                this.gcyj.xmlx = "";
                getList();
            };
            return {
                getList,
                onSearch,
                onReset
            };
        },
        openXqOne(source, proj_id, proj_name,zbxx_id,source1) {
            var link = "";
            if (source == "全国建筑市场") {
                link = "jzsc";
            } else if (source == "四川省建设厅") {
                link = "jst";
            } else if (source == "全国公路市场") {
                link = "gl";
            } else if (source == "全国水利市场") {
                link = "sl";
            } else {
                let { href } = this.$router.resolve({
                    path: `/enterpriseDetails?zbxx_id=${zbxx_id ? zbxx_id : ''}&zbgs_id=${
                        proj_id
                    }&xmmc=${proj_name}&type=zbgs&source=${source1}`
                });
                window.open(href, '中标公示' + proj_id + zbxx_id + proj_name);
                return;
            }

            let { href } = this.$router.resolve({
                path: `/yjDet?proj_id=${proj_id}&source=${link}`
            });
            window.open(href, "业绩详情" + proj_name + proj_id + link);
        }
    }
};
</script>

<style  lang="less" scoped>
.title {
    width: 20%;
    float: left;
    font-size: 13px;
    line-height: 28px;
}
.wanyuan1 {
    position: absolute;
    right: 16px;
    top: 5px;
    font-size: 12px;
    color: #001100;
    z-index: 999;
}
.wanyuan2 {
    position: absolute;
    right: 154px;
    top: 5px;
    font-size: 12px;
    color: #001100;
    z-index: 999;
}
.el-input-group__append {
    padding: 0px;
}
.el-form-item {
    margin-bottom: 10px;
}
</style>
