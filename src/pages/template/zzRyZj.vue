<template>
    <div style="width:100%;">
        <div>
            <div class="staff-type" style="float: left;">
                <span @click="handleClickItem(item, index)" :class="curIndex === index ? 'item item-ac' : 'item item-de'" v-for="(item, index) in staffName" :key="index">{{item}}</span>
            </div>
            <!-- <el-radio-group v-model="staffNameVal" @change="handleChangeTab">
                <el-radio-button v-for="(item, index) in staffName" :key="index" :label="item"></el-radio-button>
            </el-radio-group> -->
            <div style="float:right;">
                <el-form align="right" :inline="true" class="demo-form-inline" @submit.native.prevent>
                    <el-form-item label="姓名">
                        <el-input v-model="name" placeholder="请输入姓名" @keyup.enter.native="handleClickSearch"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleClickSearch">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="clearfix"></div>
        </div>
        <el-row>
            <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                <el-table-column align="center" type="index" label="序号" width="60">
                    <template slot-scope="scope">
                        {{(page - 1)*pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="xm" label="姓名">
                    <template slot-scope="scope">
                        <span @click="handleClickName(scope.row)" style="color:#409eff;cursor:pointer;">{{scope.row.xm}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="zclb" label="注册类别">
                </el-table-column>
                <el-table-column align="center" prop="zczy" label="注册专业">
                </el-table-column>
                <el-table-column align="center" prop="zsdj" label="证书等级">
                </el-table-column>
                <el-table-column align="center" prop="zsbh" label="证书编号">
                </el-table-column>
            </el-table>
            <el-pagination background :current-page="page" :page-size="pageSize" @current-change="handleChangePage" layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ["gsId", "dict", "zsmc"],
    data() {
        return {
            loading: false,
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
            page: 1,
            pageSize: 10,
            total: 0,
            staff: [],
            staffName: [],
            name: "",
            staffNameVal: "", // tab选项值
            curIndex: 0
        };
    },
    created() {
        this.staff = this.dict;
        this.staffName = this.zsmc;
        this.staffNameVal = this.staffName[0];
        // 请求数据列表
        this.handleGetDocDetail();
    },
    methods: {
        // 请求人员证件列表
        handleGetDocDetail() {
            this.loading = true;
            this.axios.post(
                "/firm/firm_search/getDocDetail",
                {
                    ry: this.staff[this.curIndex],
                    gs_id: this.gsId,
                    doc_type: this.staffNameVal,
                    name: this.name,
                    page: this.page,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows;
                        this.total = data.total;
                    } else {
                        this.tableData = [];
                        this.total = 0;
                    }

                    this.loading = false;
                }
            );
        },
        // 点击分页
        handleChangePage(val) {
            this.page = val;
            this.handleGetDocDetail();
        },
        // 点击查询按钮
        handleClickSearch() {
            this.page = 1;
            this.handleGetDocDetail();
        },
        // 点击切换选项卡tab
        handleChangeTab(val) {
            this.staffNameVal = val;
            this.staffName.map((item, index) => {
                if (item === this.staffNameVal) {
                    this.curIndex = index;
                }
            });
            this.page = 1;
            this.handleGetDocDetail();
        },
        handleClickItem(item, index) {
            this.curIndex = index;
            this.staffNameVal = item;
            this.page = 1;
            this.handleGetDocDetail();
        },
        // 点击表格行 姓名字段
        handleClickName(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/ryDet?gs_id=${this.gsId}&name=${row.xm}&staff_base_id=`
            });
            window.open(href, "人员详情" + this.gsId + row.xm);
        }
    }
};
</script>

<style lang="less" scoped>
.staff-type {
    margin-top: 5px;

    // width: clac(100% - 336px);

    .item {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: default;
        margin-bottom: 20px;
    }
    .item-ac {
        background-color: #348bda;
        color: #fff;
    }
    .item-de {
        background-color: #fff;
        color: #348bda;
    }
}
</style>


