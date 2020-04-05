<template>
    <div class="company-people">
        <body-top></body-top>
        <div class="company-content">
            <el-row style="margin:20px 0;">
                <el-col :span='22' class="company-title">企业人员</el-col>
                <el-col :span='2'>
                    <el-button type="primary" @click="handleClickAddPeople">添加人员</el-button>
                </el-col>
                <!-- 点击添加人员按钮弹出窗 -->
                <div v-if="isShow1">
                    <el-dialog width="90%" title="添加人员" :visible.sync="isShow1">
                        <add-person />
                    </el-dialog>
                </div>
            </el-row>
            <div class="search-wrapper">
                <el-form :inline="true" @submit.native.prevent>
                    <el-form-item label="数据来源">
                        <el-select @change="handleRequestList('source')" v-model="dataSourceVal">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option v-for="item in dataSource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件类型">
                        <el-select @change="handleRequestList('type')" v-model="certificateTypeVal">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option v-for="item in certificateType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证书级别" v-if="isChange">
                        <el-select @change="handleRequestList('level')" v-model="certificateLevelVal">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option v-for="item in certificateLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册专业">
                        <el-select @change="handleRequestList('major')" v-model="registerMajorVal">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option v-for="item in registerMajor" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证书级别" v-if="!isChange">
                        <el-select @change="handleRequestList('level')" v-model="certificateLevelVal">
                            <el-option label="全部" value="全部"></el-option>
                            <el-option v-for="item in certificateLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员名称">
                        <el-input @keyup.enter.native="handleRequestList" style="width: 217px;" v-model="nameVal" placeholder="人员名称"></el-input>
                    </el-form-item>
                    <el-form-item label="证书编号">
                        <el-input @keyup.enter.native="handleRequestList" style="width: 217px;" v-model="numberVal" placeholder="证书编号"></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button @click="handleRequestList" type="primary">搜索</el-button>
                        <el-button @click="handleResetBtn">重置</el-button>
                    </el-form-item> -->
                </el-form>
                <div style="text-align:center;padding:0 20px 10px 0">
                    <el-button @click="handleRequestList" type="primary">搜索</el-button>
                    <el-button @click="handleResetBtn">重置</el-button>
                </div>
            </div>
            <el-row>
                <el-table :data="tableData" v-loading="loading" border style="width: 100%; margin-top: 20px">
                    <el-table-column align="center" prop="sort" label="序号" width="60">
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="姓名" width="120px">
                        <template slot-scope="scope">
                            <div @click="handleClickName(scope.row)" style="color: #409eff;cursor:pointer;">{{scope.row.name}}{{scope.row.total}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="certificate_type" label="证件类型">
                    </el-table-column>
                    <el-table-column align="center" prop="certificate_number" label="证书编号">
                    </el-table-column>
                    <el-table-column align="center" prop="major" label="注册专业/专业/职称">
                    </el-table-column>
                    <el-table-column align="center" prop="certificate_level" label="证书级别/等级/岗位">
                    </el-table-column>
                    <el-table-column align="center" prop="valid_date" label="有效期" width="120px">
                    </el-table-column>
                    <el-table-column align="center" prop="is_build" label="提醒" width="120px">
                        <template slot-scope="scope">
                            <div style="color: #409eff;cursor:pointer;" @click="handleClickTip(scope.row)">{{scope.row.is_build}}</div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @current-change="handleChangePage" :total="total" :current-page.sync="currentPage" :page-size.sync="pageSize" align="right" style="margin-top:10px" background layout="total,prev, pager, next"></el-pagination>
            </el-row>
        </div>
        <div v-if="isShow">
            <el-dialog width="90%" :title="typeName + '业绩列表'" :visible.sync="isShow">
                <tip-dialog :staffId="staff_id" :staffBaseId="staff_base_id" />
            </el-dialog>
        </div>

    </div>
</template>

<script>
import tipDialog from "./tipDialog";
import addPerson from "./addPerson";
export default {
    components: {
        tipDialog,
        addPerson
    },
    data() {
        return {
            gs_id: localStorage.getItem("gs_id"),
            // gs_id: "7583",
            dataSource: [], // 数据来源
            dataSourceVal: "全部",
            certificateType: [], // 证件类型
            certificateTypeVal: "全部",
            registerMajor: [], // 注册专业
            registerMajorVal: "全部",
            certificateLevel: [], // 证书级别
            certificateLevelVal: "全部",
            nameVal: "", // 人员名称
            numberVal: "", // 证书编号
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            isShow: false, // 点击表格行 提醒字段 弹出窗显示或隐藏
            isShow1: false, // 点击添加人员按钮

            addDate: "",
            startTime: "", // 有效期 开始
            endTime: "", // 有效期 结束
            loading: false,
            source: "", // 来源
            certList: [],
            typeName: "", // 点击提醒字段 弹出弹窗标题
            staff_id: "",
            staff_base_id: "",
            isChange: false // 专业和证书级别是否调换位置
        };
    },
    created() {
        document.title = "证件";
        let query = this.$route.query;
        this.dataSourceVal = query.source ? query.source : "全部";
        this.certificateTypeVal = query.type ? query.type : "全部";
        this.registerMajorVal = query.major ? query.major : "全部";
        this.certificateLevelVal = query.level ? query.level : "全部";

        // // 查询sourceList
        this.handleSourceList();

        if (this.dataSourceVal === "全部") {
            // 为全部时 后面的选项都置空
            this.certificateTypeVal = "全部";
            this.registerMajorVal = "全部";
            this.certificateLevelVal = "全部";
            // 查询 人员列表
            this.loading = true;
            this.handlePeopleListNew();
        } else {
            if (this.certificateTypeVal === "全部") {
                this.registerMajorVal = "全部";
                this.certificateLevelVal = "全部";

                // 查询 类型、等级、专业list
                this.handleCertList();
            } else {
                // 查询 类型、等级、专业list
                if (
                    this.dataSourceVal === "四川省建设厅" &&
                    this.certificateTypeVal === "造价人员"
                ) {
                    this.isChange = true;
                }
                this.handleCertList();
            }
        }

        // if (this.registerMajorVal === '全部') {
        //     this.certificateLevelVal = '全部';
        // }
    },
    watch : {
        '$route': function(newVal) {
            window.location.reload();
        }
    },
    methods: {
        // 查询数据来源list
        handleSourceList() {
            this.axios.post(
                "/firm/people/searchSource",
                { gs_id: this.gs_id },
                data => {
                    if (data.status === "success") {
                        this.dataSource = data.rows.map((item, index) => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                    } else {
                        // this.$message.error(data.message);
                    }
                }
            );
        },
        // 请求页面头部搜索条件列表 类型、专业、级别
        handleCertList() {
            this.axios.post(
                "/firm/people/certList",
                {
                    source:
                        this.dataSourceVal === "全部" ? "" : this.dataSourceVal,
                    gs_id: this.gs_id
                },
                data => {
                    if (data.status === "success") {
                        this.certList = data.rows;
                        // 证件类型
                        let certificateType = [];
                        data.rows.map((item, index) => {
                            if (item !== "") {
                                certificateType.push({
                                    value: item.name,
                                    label: item.name
                                });
                            }
                        });
                        this.certificateType = certificateType;

                        // 根据证件类型 动态改变注册专业、证书级别选择类表
                        this.handleChangeSelectList();
                    } else {
                        this.$message.error(data.message);
                        // this.handleChangeSelectList();
                        this.loading = false;
                        this.tableData = [];
                        this.total = 0;
                    }
                }
            );
        },
        // 请求证件管理 人员列表
        handlePeopleListNew() {
            this.axios.post(
                "/firm/people/peopleListNew",
                {
                    gs_id: this.gs_id,
                    name: this.nameVal,
                    number: this.numberVal,
                    source:
                        this.dataSourceVal === "全部" ? "" : this.dataSourceVal,
                    type:
                        this.certificateTypeVal === "全部"
                            ? ""
                            : this.certificateTypeVal,
                    major:
                        this.registerMajorVal === "全部"
                            ? ""
                            : this.registerMajorVal,
                    level:
                        this.certificateLevelVal === "全部"
                            ? ""
                            : this.certificateLevelVal,
                    page: this.currentPage,
                    rows: this.pageSize
                },
                data => {
                    if (data.status === "success") {
                        this.tableData = data.rows.map((item, index) => {
                            return {
                                sort:
                                    (this.currentPage - 1) * this.pageSize +
                                    index +
                                    1,
                                ...item
                            };
                        });
                        this.total = data.total;
                    } else {
                        // this.$message.error(data.message);
                        this.tableData = [];
                        this.total = 0;
                    }

                    this.loading = false;
                }
            );
        },
        // 切换证件类型时 动态改变注册专业、证书级别选择类表
        handleChangeSelectList() {
            if (this.certificateTypeVal !== "全部") {
                // 注册专业列表
                this.registerMajor = this.certList
                    .filter((item, index) => {
                        return item.name === this.certificateTypeVal;
                    })[0]
                    .major.map((item, index) => {
                        return {
                            value: item,
                            label: item
                        };
                    });

                // 证书级别列表
                this.certificateLevel = this.certList
                    .filter((item, index) => {
                        return item.name === this.certificateTypeVal;
                    })[0]
                    .level.map((item, index) => {
                        return {
                            value: item,
                            label: item
                        };
                    });
            }

            // 请求人员列表
            // this.loading = true;
            this.handlePeopleListNew();
        },
        // 点击搜索按钮/查询条件回车/查询条件选择改变 查询数据列表
        handleRequestList(btnType) {
            switch (btnType) {
                case "source": // 改变数据来源下拉框
                    this.currentPage = 1;
                    this.certificateTypeVal = "全部";
                    this.registerMajorVal = "全部";
                    this.certificateLevelVal = "全部";
                    this.certificateType = [];
                    this.registerMajor = [];
                    this.certificateLevel = [];

                    // 请求证件类型列表
                    this.loading = true;
                    this.handleCertList();
                    break;
                case "type": // 改变证件类型下拉框
                    // 改变注册专业、证书级别列表
                    if (
                        this.dataSourceVal === "四川省建设厅" &&
                        this.certificateTypeVal === "造价人员"
                    ) {
                        this.isChange = true;
                    } else {
                        this.isChange = false;
                    }
                    this.currentPage = 1;
                    this.registerMajorVal = "全部";
                    this.certificateLevelVal = "全部";
                    this.registerMajor = [];
                    this.certificateLevel = [];

                    // 切换证件类型时，动态改变注册专业和等级
                    this.loading = true;
                    this.handleChangeSelectList();
                    break;
                default:
                    this.loading = true;
                    this.currentPage = 1;
                    this.handlePeopleListNew();
                    break;
            }
        },
        // 点击重置按钮
        handleResetBtn() {
            this.nameVal = "";
            this.numberVal = "";
            this.dataSourceVal = "全部";
            this.certificateTypeVal = "全部";
            this.registerMajorVal = "全部";
            this.certificateLevelVal = "全部";
            this.currentPage = 1;
            this.loading = true;
            this.handlePeopleListNew();
        },
        // 点击分页
        handleChangePage(val) {
            this.currentPage = val;
            this.loading = true;
            this.handlePeopleListNew();
        },
        // 点击表格行 提醒字段
        handleClickTip(row) {
            this.isShow = true;
            this.typeName = row.is_build;
            this.staff_id = row.staff_id;
            this.staff_base_id = row.staff_base_id;
        },
        // 点击表格行 人员名称字段
        handleClickName(row) {
            // 跳转页面
            let { href } = this.$router.resolve({
                path: `/ryDet?gs_id=${this.gs_id}&name=${
                    row.name
                }&staff_base_id=${row.staff_base_id}`
            });
            window.open(href, "人员详情" + this.gs_id + row.name);
        },
        // 点击添加人员按钮
        handleClickAddPeople() {
            this.isShow1 = true;
        }
    }
};
</script>

<style lang="less" scoped>
.company-people {
    .company-content {
        width: 1200px;
        margin: 0 auto;
        .company-title {
            font-size: 20px;
            line-height: 40px;
        }
    }
}
</style>


